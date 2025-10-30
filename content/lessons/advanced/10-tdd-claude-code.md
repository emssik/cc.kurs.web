---
title: "Test-Driven Development z Claude Code"
description: "Praktyczne TDD: pisanie testów przed kodem, red-green-refactor cycle z pomocą Claude Code"
duration: 30
difficulty: advanced
tags: [tdd, testing, jest, vitest, unit-tests, integration-tests]
---

# Test-Driven Development z Claude Code

## Wprowadzenie

Test-Driven Development (TDD) to methodology gdzie piszemy testy PRZED kodem. Claude Code jest idealnym partnerem do TDD - pomaga pisać testy, implementować kod i refaktorować, zawsze zachowując test coverage.

## Dlaczego TDD z Claude Code?

**Korzyści TDD:**
- **Better design** - testy wymuszają testable code
- **Confidence** - każda zmiana jest zweryfikowana
- **Documentation** - testy jako living documentation
- **Fewer bugs** - catch issues wcześniej

**Claude Code usprawnia TDD:**
- Szybkie pisanie testów
- Implementacja spełniająca specs
- Refactoring z pewnością że testy przechodzą
- Analiza coverage gaps

## TDD Cycle: Red-Green-Refactor

```
1. RED   → Napisz failing test
2. GREEN → Napisz minimal code żeby test przechodził
3. REFACTOR → Improve code keeping tests passing
4. REPEAT
```

## Przykład 1: Shopping Cart

### Krok 1: RED - Napisz failing test

```
user: Zacznijmy TDD dla shopping cart. Pierwszy test: dodawanie produktu
assistant:
```

```typescript
// shopping-cart.test.ts
import { ShoppingCart } from './shopping-cart';

describe('ShoppingCart', () => {
  describe('addItem', () => {
    it('should add item to empty cart', () => {
      const cart = new ShoppingCart();
      const item = { id: '1', name: 'Product', price: 10 };

      cart.addItem(item);

      expect(cart.getItems()).toHaveLength(1);
      expect(cart.getItems()[0]).toEqual(item);
    });
  });
});
```

Uruchom test:
```bash
npm test
# ❌ FAILS - ShoppingCart doesn't exist
```

### Krok 2: GREEN - Minimal implementation

```
user: Zaimplementuj ShoppingCart żeby ten test przechodził
assistant:
```

```typescript
// shopping-cart.ts
export interface CartItem {
  id: string;
  name: string;
  price: number;
}

export class ShoppingCart {
  private items: CartItem[] = [];

  addItem(item: CartItem): void {
    this.items.push(item);
  }

  getItems(): CartItem[] {
    return [...this.items];
  }
}
```

```bash
npm test
# ✅ PASSES
```

### Krok 3: Dodaj więcej testów

```
user: Dodaj test: zwiększenie ilości jeśli ten sam produkt dodany dwa razy
assistant:
```

```typescript
it('should increase quantity when same item added twice', () => {
  const cart = new ShoppingCart();
  const item = { id: '1', name: 'Product', price: 10, quantity: 1 };

  cart.addItem(item);
  cart.addItem(item);

  expect(cart.getItems()).toHaveLength(1);
  expect(cart.getItems()[0].quantity).toBe(2);
});
```

```bash
npm test
# ❌ FAILS - quantity not handled
```

### Krok 4: GREEN - Update implementation

```typescript
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export class ShoppingCart {
  private items: Map<string, CartItem> = new Map();

  addItem(item: CartItem): void {
    const existing = this.items.get(item.id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      this.items.set(item.id, { ...item });
    }
  }

  getItems(): CartItem[] {
    return Array.from(this.items.values());
  }

  getTotalPrice(): number {
    return Array.from(this.items.values()).reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }
}
```

### Krok 5: REFACTOR

```
user: Refaktoruj ten kod - wydziel logikę do osobnych metod
assistant:
```

```typescript
export class ShoppingCart {
  private items: Map<string, CartItem> = new Map();

  addItem(item: CartItem): void {
    if (this.hasItem(item.id)) {
      this.increaseQuantity(item.id, item.quantity);
    } else {
      this.addNewItem(item);
    }
  }

  removeItem(itemId: string): void {
    this.items.delete(itemId);
  }

  updateQuantity(itemId: string, quantity: number): void {
    const item = this.items.get(itemId);
    if (!item) throw new Error('Item not found');
    if (quantity <= 0) throw new Error('Quantity must be positive');
    item.quantity = quantity;
  }

  clear(): void {
    this.items.clear();
  }

  getItems(): CartItem[] {
    return Array.from(this.items.values());
  }

  getTotalPrice(): number {
    return this.getItems().reduce(
      (sum, item) => sum + this.getItemTotal(item),
      0
    );
  }

  private hasItem(itemId: string): boolean {
    return this.items.has(itemId);
  }

  private increaseQuantity(itemId: string, amount: number): void {
    const item = this.items.get(itemId)!;
    item.quantity += amount;
  }

  private addNewItem(item: CartItem): void {
    this.items.set(item.id, { ...item });
  }

  private getItemTotal(item: CartItem): number {
    return item.price * item.quantity;
  }
}
```

```bash
npm test
# ✅ All tests still pass after refactoring!
```

## Przykład 2: API Endpoint TDD

### Test pierwszy - happy path

```typescript
// users.api.test.ts
import request from 'supertest';
import { app } from '../app';
import { prismaMock } from '../test-utils/prisma-mock';

describe('POST /users', () => {
  it('should create user with valid data', async () => {
    const userData = {
      email: 'test@example.com',
      name: 'Test User',
    };

    prismaMock.user.create.mockResolvedValue({
      id: 1,
      ...userData,
      createdAt: new Date(),
    });

    const response = await request(app)
      .post('/users')
      .send(userData)
      .expect(201);

    expect(response.body).toMatchObject({
      id: 1,
      email: userData.email,
      name: userData.name,
    });
    expect(prismaMock.user.create).toHaveBeenCalledWith({
      data: userData,
    });
  });

  it('should return 400 for invalid email', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        email: 'invalid-email',
        name: 'Test',
      })
      .expect(400);

    expect(response.body.error).toBe('Invalid email format');
  });

  it('should return 409 if user already exists', async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      id: 1,
      email: 'existing@example.com',
      name: 'Existing',
      createdAt: new Date(),
    });

    const response = await request(app)
      .post('/users')
      .send({
        email: 'existing@example.com',
        name: 'Test',
      })
      .expect(409);

    expect(response.body.error).toBe('User already exists');
  });
});
```

### Implementation

```
user: Zaimplementuj endpoint POST /users według tych testów
assistant:
```

```typescript
// routes/users.routes.ts
import { Router } from 'express';
import { body } from 'express-validator';
import { createUserHandler } from '../handlers/users.handlers';
import { validate } from '../middleware/validate';

export const usersRouter = Router();

usersRouter.post(
  '/',
  [
    body('email').isEmail().withMessage('Invalid email format'),
    body('name').trim().notEmpty().withMessage('Name is required'),
    validate,
  ],
  createUserHandler
);

// handlers/users.handlers.ts
import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

const userService = new UserService();

export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    if (error.message === 'User already exists') {
      res.status(409).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

// services/user.service.ts
import { PrismaClient } from '@prisma/client';

export class UserService {
  constructor(private prisma: PrismaClient = new PrismaClient()) {}

  async createUser(data: { email: string; name: string }) {
    const existing = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      throw new Error('User already exists');
    }

    return await this.prisma.user.create({ data });
  }
}
```

## TDD Best Practices z Claude Code

### 1. Test Naming Convention

```typescript
describe('[Unit/Function Name]', () => {
  describe('[Method/Feature]', () => {
    it('should [expected behavior] when [condition]', () => {
      // Arrange
      const input = ...;

      // Act
      const result = functionUnderTest(input);

      // Assert
      expect(result).toBe(expected);
    });
  });
});
```

### 2. AAA Pattern (Arrange-Act-Assert)

```typescript
it('should calculate discount for premium users', () => {
  // Arrange
  const user = { id: 1, isPremium: true };
  const product = { price: 100 };
  const calculator = new PriceCalculator();

  // Act
  const finalPrice = calculator.calculate(user, product);

  // Assert
  expect(finalPrice).toBe(80); // 20% discount
});
```

### 3. Test Doubles (Mocks, Stubs, Spies)

```typescript
// Mock external service
const mockEmailService = {
  send: jest.fn().mockResolvedValue({ success: true }),
};

// Spy on method
const calculateSpy = jest.spyOn(calculator, 'calculate');

// Stub return value
jest.spyOn(database, 'getUser').mockResolvedValue(mockUser);
```

### 4. Test Coverage

```
user: Sprawdź coverage i dodaj brakujące testy
assistant: [Uruchamia coverage i analizuje gaps]
```

```bash
npm test -- --coverage

# Analiza wyników:
# File: shopping-cart.ts
# Lines: 85% (missing: error handling in updateQuantity)
# Branches: 75% (missing: edge cases)
```

```
user: Dodaj testy dla brakujących przypadków
assistant:
```

```typescript
describe('updateQuantity', () => {
  it('should throw error for non-existent item', () => {
    const cart = new ShoppingCart();
    expect(() => cart.updateQuantity('999', 5)).toThrow('Item not found');
  });

  it('should throw error for zero quantity', () => {
    const cart = new ShoppingCart();
    cart.addItem({ id: '1', name: 'Product', price: 10, quantity: 1 });
    expect(() => cart.updateQuantity('1', 0)).toThrow('Quantity must be positive');
  });

  it('should throw error for negative quantity', () => {
    const cart = new ShoppingCart();
    cart.addItem({ id: '1', name: 'Product', price: 10, quantity: 1 });
    expect(() => cart.updateQuantity('1', -5)).toThrow('Quantity must be positive');
  });
});
```

## Integration Tests

```
user: Dodaj integration test dla pełnego flow tworzenia zamówienia
assistant:
```

```typescript
// orders.integration.test.ts
describe('Order Creation Flow', () => {
  beforeAll(async () => {
    await setupTestDatabase();
  });

  afterAll(async () => {
    await cleanupTestDatabase();
  });

  it('should create order from cart to payment', async () => {
    // 1. Create user
    const user = await request(app)
      .post('/users')
      .send({ email: 'test@example.com', name: 'Test' })
      .expect(201);

    // 2. Add products to cart
    const cart = await request(app)
      .post('/cart')
      .set('Authorization', `Bearer ${user.body.token}`)
      .send({ productId: '1', quantity: 2 })
      .expect(200);

    // 3. Create order
    const order = await request(app)
      .post('/orders')
      .set('Authorization', `Bearer ${user.body.token}`)
      .send({ cartId: cart.body.id })
      .expect(201);

    expect(order.body.status).toBe('pending');
    expect(order.body.items).toHaveLength(1);

    // 4. Process payment
    const payment = await request(app)
      .post(`/orders/${order.body.id}/pay`)
      .set('Authorization', `Bearer ${user.body.token}`)
      .send({ paymentMethod: 'credit_card' })
      .expect(200);

    expect(payment.body.status).toBe('paid');

    // 5. Verify order status updated
    const updatedOrder = await request(app)
      .get(`/orders/${order.body.id}`)
      .set('Authorization', `Bearer ${user.body.token}`)
      .expect(200);

    expect(updatedOrder.body.status).toBe('confirmed');
  });
});
```

## Zadanie praktyczne

**Cel**: Implement Calculator with TDD

### Część 1: Basic Operations (10 min)

```
user: Zacznijmy TDD dla Calculator. Napisz testy dla:
     - add(a, b)
     - subtract(a, b)
     - multiply(a, b)
     - divide(a, b)
```

Wymagania:
- divide by zero powinno rzucić błąd
- operacje na dużych liczbach (Number.MAX_SAFE_INTEGER)

### Część 2: Advanced Operations (10 min)

```
user: Rozszerz Calculator o:
     - power(base, exponent)
     - sqrt(n)
     - percentage(value, percent)
```

### Część 3: History (10 min)

```
user: Dodaj history tracking:
     - getHistory() zwraca ostatnie 10 operacji
     - clearHistory()
     - undo() cofa ostatnią operację
```

### Jak Claude Code może Ci pomóc?

```
user: Napisz testy dla tego modułu używając TDD
user: Zaimplementuj funkcję według tych testów
user: Refaktoruj ten kod zachowując testy passing
user: Dodaj edge case testy dla [funkcja]
user: Sprawdź coverage i dodaj brakujące testy
```

## Best Practices Checklist

- [ ] **Write test first** - zawsze przed implementacją
- [ ] **One assertion per test** - lub related assertions
- [ ] **Fast tests** - unit testy < 10ms
- [ ] **Independent tests** - żaden test nie zależy od innego
- [ ] **Repeatable** - ten sam wynik za każdym razem
- [ ] **Self-validating** - pass/fail, no manual verification
- [ ] **Timely** - testy zaraz po/przed kodem
- [ ] **Coverage > 80%** - ale quality > quantity
- [ ] **Test naming** - descriptive, czytelne
- [ ] **AAA pattern** - Arrange, Act, Assert

## Podsumowanie

TDD z Claude Code to powerful combination:
- **Szybsze pisanie testów** - AI generuje test templates
- **Better code design** - testable architecture
- **Higher confidence** - refactoring bez strachu
- **Living documentation** - testy jako specs

Kluczowe umiejętności:
1. Red-Green-Refactor cycle
2. Unit vs Integration tests
3. Mocking i test doubles
4. Coverage analysis
5. Test naming i organization

## Dodatkowe materiały

### Książki
- Test Driven Development by Example (Kent Beck)
- Growing Object-Oriented Software, Guided by Tests

### Testing Frameworks
- [Jest](https://jestjs.io/) - JavaScript testing
- [Vitest](https://vitest.dev/) - Vite-native testing
- [Pytest](https://pytest.org/) - Python testing

### Artykuły
- [TDD Best Practices](https://www.testim.io/blog/test-driven-development-best-practices/)
- [Common TDD Mistakes](https://medium.com/@fagnerbrack/common-mistakes-in-test-driven-development)

---

**Czas trwania**: ~30 minut
**Poziom**: Zaawansowany
**Wymagania**: Testing basics, Jest/Vitest experience
