---
title: "Architektura wielowarstwowych aplikacji"
description: "Projektowanie skalowalnej architektury aplikacji z Claude Code: od monolitu do mikroserwisów"
duration: 35
difficulty: advanced
tags: [architektura, backend, frontend, scalability, design-patterns]
---

# Architektura wielowarstwowych aplikacji

## Wprowadzenie

Projektowanie architektury aplikacji to jedno z najważniejszych zadań w software development. Claude Code może być Twoim architektem, pomagając zaprojektować skalowalną, maintainable i testable architekturę od podstaw.

## Dlaczego to ważne?

Zła architektura prowadzi do:
- **Technical debt** - coraz trudniejszy maintenance
- **Spaghetti code** - wszystko ze wszystkim powiązane
- **Scaling problems** - nie da się skalować
- **Testing difficulties** - niemożliwe do przetestowania
- **Team bottlenecks** - trudna współpraca

Dobra architektura to fundament sukcesu projektu.

## Część 1: Layered Architecture (Classic MVC)

### Struktura

```
src/
├── controllers/       # HTTP request handling
├── services/          # Business logic
├── repositories/      # Data access
├── models/            # Data models
├── middlewares/       # Express middlewares
├── utils/             # Helpers
└── config/            # Configuration
```

### Przykład: User Management

```
user: Zaprojektuj architekturę dla user management z registration, login, profile
assistant: [Tworzy layered architecture:]
```

**Controller (HTTP Layer):**
```typescript
// controllers/user.controller.ts
import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
  constructor(private userService: UserService) {}

  async register(req: Request, res: Response) {
    try {
      const user = await this.userService.register(req.body);
      res.status(201).json({ user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { token, user } = await this.userService.login(
        req.body.email,
        req.body.password
      );
      res.json({ token, user });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      const user = await this.userService.getProfile(req.user.id);
      res.json({ user });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}
```

**Service (Business Logic):**
```typescript
// services/user.service.ts
import { UserRepository } from '../repositories/user.repository';
import { hashPassword, comparePassword, generateToken } from '../utils/auth';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async register(data: RegisterDTO) {
    // Validation
    if (!this.isValidEmail(data.email)) {
      throw new Error('Invalid email');
    }

    // Check if exists
    const existing = await this.userRepository.findByEmail(data.email);
    if (existing) {
      throw new Error('User already exists');
    }

    // Hash password
    const passwordHash = await hashPassword(data.password);

    // Create user
    const user = await this.userRepository.create({
      ...data,
      passwordHash,
    });

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValid = await comparePassword(password, user.passwordHash);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    const token = generateToken(user.id);
    return { token, user };
  }

  async getProfile(userId: number) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
```

**Repository (Data Access):**
```typescript
// repositories/user.repository.ts
import { PrismaClient } from '@prisma/client';

export class UserRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: CreateUserData) {
    return await this.prisma.user.create({
      data,
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });
  }

  async update(id: number, data: UpdateUserData) {
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }
}
```

**Dependency Injection Setup:**
```typescript
// app.ts
import { PrismaClient } from '@prisma/client';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';

// Initialize dependencies
const prisma = new PrismaClient();
const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// Routes
app.post('/register', (req, res) => userController.register(req, res));
app.post('/login', (req, res) => userController.login(req, res));
app.get('/profile', authMiddleware, (req, res) =>
  userController.getProfile(req, res)
);
```

## Część 2: Clean Architecture (Hexagonal)

### Struktura

```
src/
├── domain/            # Business logic (core)
│   ├── entities/
│   ├── value-objects/
│   └── interfaces/
├── application/       # Use cases
│   └── use-cases/
├── infrastructure/    # External dependencies
│   ├── database/
│   ├── email/
│   └── cache/
└── presentation/      # API layer
    ├── http/
    └── graphql/
```

### Przykład: Order Processing

```
user: Zaprojektuj clean architecture dla order processing system
assistant:
```

**Domain Entity:**
```typescript
// domain/entities/order.entity.ts
export class Order {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    private _items: OrderItem[],
    private _status: OrderStatus,
    public readonly createdAt: Date
  ) {}

  get items(): ReadonlyArray<OrderItem> {
    return this._items;
  }

  get status(): OrderStatus {
    return this._status;
  }

  get totalAmount(): number {
    return this._items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  addItem(item: OrderItem): void {
    if (this._status !== 'draft') {
      throw new Error('Cannot modify non-draft order');
    }
    this._items.push(item);
  }

  confirm(): void {
    if (this._items.length === 0) {
      throw new Error('Cannot confirm empty order');
    }
    if (this._status !== 'draft') {
      throw new Error('Order already confirmed');
    }
    this._status = 'confirmed';
  }

  cancel(): void {
    if (this._status === 'shipped') {
      throw new Error('Cannot cancel shipped order');
    }
    this._status = 'cancelled';
  }
}
```

**Use Case:**
```typescript
// application/use-cases/create-order.use-case.ts
export interface IOrderRepository {
  save(order: Order): Promise<void>;
  findById(id: string): Promise<Order | null>;
}

export interface IInventoryService {
  checkAvailability(productId: string, quantity: number): Promise<boolean>;
  reserve(productId: string, quantity: number): Promise<void>;
}

export class CreateOrderUseCase {
  constructor(
    private orderRepository: IOrderRepository,
    private inventoryService: IInventoryService
  ) {}

  async execute(userId: string, items: OrderItemDTO[]): Promise<Order> {
    // Validate inventory
    for (const item of items) {
      const available = await this.inventoryService.checkAvailability(
        item.productId,
        item.quantity
      );
      if (!available) {
        throw new Error(`Product ${item.productId} not available`);
      }
    }

    // Create order
    const order = new Order(
      generateId(),
      userId,
      items.map((item) => new OrderItem(item.productId, item.quantity, item.price)),
      'draft',
      new Date()
    );

    // Reserve inventory
    for (const item of items) {
      await this.inventoryService.reserve(item.productId, item.quantity);
    }

    // Confirm order
    order.confirm();

    // Save
    await this.orderRepository.save(order);

    return order;
  }
}
```

**Infrastructure Implementation:**
```typescript
// infrastructure/database/order.repository.ts
export class PrismaOrderRepository implements IOrderRepository {
  constructor(private prisma: PrismaClient) {}

  async save(order: Order): Promise<void> {
    await this.prisma.order.upsert({
      where: { id: order.id },
      create: {
        id: order.id,
        userId: order.userId,
        status: order.status,
        totalAmount: order.totalAmount,
        items: {
          create: order.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      update: {
        status: order.status,
      },
    });
  }

  async findById(id: string): Promise<Order | null> {
    const data = await this.prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!data) return null;

    return new Order(
      data.id,
      data.userId,
      data.items.map((item) => new OrderItem(item.productId, item.quantity, item.price)),
      data.status as OrderStatus,
      data.createdAt
    );
  }
}
```

## Część 3: Microservices Architecture

### Struktura

```
project/
├── services/
│   ├── user-service/
│   ├── order-service/
│   ├── product-service/
│   └── notification-service/
├── api-gateway/
├── shared/
│   ├── types/
│   └── utils/
└── infrastructure/
    ├── docker-compose.yml
    └── k8s/
```

### Event-Driven Communication

```
user: Zaprojektuj event-driven architecture dla e-commerce
assistant:
```

**Event Bus Interface:**
```typescript
// shared/events/event-bus.interface.ts
export interface IEventBus {
  publish<T>(event: DomainEvent<T>): Promise<void>;
  subscribe<T>(eventType: string, handler: EventHandler<T>): void;
}

export interface DomainEvent<T> {
  type: string;
  aggregateId: string;
  payload: T;
  timestamp: Date;
}
```

**Order Service (Producer):**
```typescript
// order-service/events/order-confirmed.event.ts
export class OrderConfirmedEvent implements DomainEvent<OrderConfirmedPayload> {
  type = 'order.confirmed';

  constructor(
    public aggregateId: string,
    public payload: OrderConfirmedPayload,
    public timestamp: Date = new Date()
  ) {}
}

// order-service/use-cases/confirm-order.use-case.ts
export class ConfirmOrderUseCase {
  constructor(
    private orderRepository: IOrderRepository,
    private eventBus: IEventBus
  ) {}

  async execute(orderId: string): Promise<void> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) throw new Error('Order not found');

    order.confirm();
    await this.orderRepository.save(order);

    // Publish event
    await this.eventBus.publish(
      new OrderConfirmedEvent(order.id, {
        userId: order.userId,
        items: order.items,
        totalAmount: order.totalAmount,
      })
    );
  }
}
```

**Notification Service (Consumer):**
```typescript
// notification-service/handlers/order-confirmed.handler.ts
export class OrderConfirmedHandler implements EventHandler<OrderConfirmedPayload> {
  constructor(private emailService: IEmailService) {}

  async handle(event: DomainEvent<OrderConfirmedPayload>): Promise<void> {
    const { userId, totalAmount } = event.payload;

    // Send confirmation email
    await this.emailService.send({
      to: await this.getUserEmail(userId),
      subject: 'Order Confirmed',
      template: 'order-confirmed',
      data: {
        orderId: event.aggregateId,
        totalAmount,
      },
    });
  }
}

// notification-service/app.ts
eventBus.subscribe('order.confirmed', new OrderConfirmedHandler(emailService));
```

## Część 4: Frontend Architecture

### React + TypeScript Architecture

```
frontend/
├── src/
│   ├── features/           # Feature-based modules
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   ├── types/
│   │   │   └── index.ts
│   │   └── orders/
│   ├── shared/
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── types/
│   ├── layouts/
│   ├── pages/
│   └── app/
│       ├── store/          # Redux/Zustand
│       ├── routes/
│       └── App.tsx
```

### Feature Module Example

```typescript
// features/orders/services/orders.service.ts
export class OrdersService {
  async getOrders(userId: string): Promise<Order[]> {
    const response = await api.get(`/users/${userId}/orders`);
    return response.data;
  }

  async createOrder(data: CreateOrderDTO): Promise<Order> {
    const response = await api.post('/orders', data);
    return response.data;
  }
}

// features/orders/hooks/useOrders.ts
export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const service = useMemo(() => new OrdersService(), []);

  const fetchOrders = useCallback(async (userId: string) => {
    setLoading(true);
    try {
      const data = await service.getOrders(userId);
      setOrders(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [service]);

  return { orders, loading, error, fetchOrders };
}

// features/orders/components/OrdersList.tsx
export function OrdersList({ userId }: { userId: string }) {
  const { orders, loading, error, fetchOrders } = useOrders();

  useEffect(() => {
    fetchOrders(userId);
  }, [userId, fetchOrders]);

  if (loading) return <Spinner />;
  if (error) return <Error message={error} />;

  return (
    <div>
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
```

## Zadanie praktyczne

**Cel**: Zaprojektuj full-stack architecture dla blog platform

### Część 1: Backend Architecture (15 min)

```
user: Zaprojektuj layered architecture dla blog platform z:
     - Users (authentication)
     - Posts (CRUD, publishing)
     - Comments (nested)
     - Tags i Categories
```

Claude Code utworzy:
- Folder structure
- Controllers, Services, Repositories
- DTOs i validation
- Error handling strategy

### Część 2: Database Design (5 min)

```
user: Zaprojektuj database schema dla tego bloga
assistant: [Tworzy ERD i Prisma schema]
```

### Część 3: API Design (10 min)

```
user: Zaprojektuj RESTful API endpoints
assistant: [Tworzy OpenAPI/Swagger spec]
```

### Część 4: Frontend Architecture (5 min)

```
user: Zaprojektuj feature-based React architecture
assistant: [Tworzy folder structure i przykładowe komponenty]
```

### Jak Claude Code może Ci pomóc?

```
user: Jaką architekturę polecasz dla [opis projektu]?
user: Refaktoruj ten kod do clean architecture
user: Jak zaimplementować CQRS pattern?
user: Zaprojektuj communication między microservices
```

## Best Practices Checklist

### Layered Architecture
- [ ] **Separation of concerns** - każda warstwa ma jasną odpowiedzialność
- [ ] **Dependency injection** - łatwe testowanie
- [ ] **DTOs** - walidacja na границах systemu
- [ ] **Error handling** - centralized error handling

### Clean Architecture
- [ ] **Domain independence** - core nie zależy od infrastruktury
- [ ] **Use case per operation** - single responsibility
- [ ] **Interfaces** - dependency inversion
- [ ] **Value objects** - immutable domain primitives

### Microservices
- [ ] **Single responsibility** - każdy service robi jedno
- [ ] **Event-driven** - asynchronous communication
- [ ] **Database per service** - data independence
- [ ] **API Gateway** - unified entry point
- [ ] **Service discovery** - dynamic service location

## Podsumowanie

Architecture z Claude Code:
- **Rapid prototyping** - od pomysłu do struktury w minutach
- **Best practices** - sprawdzone wzorce automatycznie
- **Scalability** - architecture gotowa na wzrost
- **Maintainability** - clean, testable code

Kluczowe umiejętności:
1. Wybór odpowiedniej architektury dla projektu
2. Layered vs Clean vs Microservices
3. Dependency injection i testability
4. Event-driven communication
5. Frontend architecture patterns

## Dodatkowe materiały

### Książki
- Clean Architecture (Robert C. Martin)
- Domain-Driven Design (Eric Evans)
- Building Microservices (Sam Newman)

### Wzorce projektowe
- [Refactoring Guru - Design Patterns](https://refactoring.guru/design-patterns)
- [Microsoft Architecture Patterns](https://docs.microsoft.com/en-us/azure/architecture/patterns/)

### Artykuły
- [The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Microservices Pattern](https://microservices.io/patterns/)

---

**Czas trwania**: ~35 minut
**Poziom**: Zaawansowany
**Wymagania**: OOP, Design Patterns, doświadczenie z full-stack development
