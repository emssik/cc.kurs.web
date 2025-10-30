---
title: "Refactoring legacy code"
description: "Bezpieczne refaktorowanie starego kodu: strategie, wzorce i automatyzacja z Claude Code"
duration: 30
difficulty: advanced
tags: [refactoring, legacy-code, code-quality, technical-debt]
---

# Refactoring legacy code z Claude Code

## Wprowadzenie

Legacy code to każdy kod bez testów (Michael Feathers). Claude Code może być Twoim przewodnikiem w bezpiecznym refactorowaniu - od analizy istniejącego kodu, przez dodanie testów, po stopniową modernizację.

## Dlaczego legacy code jest trudny?

- **Brak testów** - strach przed zmianami
- **Brak dokumentacji** - nikt nie wie jak to działa
- **Tightly coupled** - zmiana w jednym miejscu破坏 wiele innych
- **Przestarzałe technologie** - stare biblioteki, deprecated APIs
- **Code smells** - god objects, long methods, duplicacja

## Strategia refactoringu

### 1. Understand (Zrozum)

```
user: Przeanalizuj ten legacy kod i wyjaśnij co robi
```

Claude Code:
- Czyta kod
- Identyfikuje główne komponenty
- Tworzy diagram flow
- Wylistuje dependencies
- Dokumentuje business logic

### 2. Add Tests (Dodaj testy)

```
user: Dodaj characterization tests dla tego modułu
```

**Characterization test** = test dokumentujący obecne zachowanie (nawet jeśli buggy).

```typescript
// Legacy code
function calculatePrice(items, customer) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price * items[i].qty;
  }
  if (customer.type == 'premium') {
    total = total * 0.9;
  }
  if (total > 1000) {
    total = total - 50;
  }
  return total;
}

// Characterization tests
describe('calculatePrice (legacy behavior)', () => {
  it('calculates basic price', () => {
    const items = [{ price: 10, qty: 2 }];
    const customer = { type: 'regular' };
    expect(calculatePrice(items, customer)).toBe(20);
  });

  it('applies premium discount', () => {
    const items = [{ price: 100, qty: 1 }];
    const customer = { type: 'premium' };
    expect(calculatePrice(items, customer)).toBe(90); // 10% off
  });

  it('applies bulk discount', () => {
    const items = [{ price: 600, qty: 2 }];
    const customer = { type: 'regular' };
    expect(calculatePrice(items, customer)).toBe(1150); // 1200 - 50
  });

  it('applies both discounts', () => {
    const items = [{ price: 600, qty: 2 }];
    const customer = { type: 'premium' };
    // 1200 * 0.9 = 1080, then 1080 - 50 = 1030
    expect(calculatePrice(items, customer)).toBe(1030);
  });
});
```

### 3. Refactor (Refaktoruj)

```
user: Refaktoruj tę funkcję zachowując testy passing
```

```typescript
// Refactored - TypeScript, proper types, smaller functions
interface CartItem {
  price: number;
  quantity: number;
}

interface Customer {
  type: 'regular' | 'premium';
}

class PriceCalculator {
  calculate(items: CartItem[], customer: Customer): number {
    const subtotal = this.calculateSubtotal(items);
    const afterMemberDiscount = this.applyMemberDiscount(subtotal, customer);
    const final = this.applyBulkDiscount(afterMemberDiscount);
    return final;
  }

  private calculateSubtotal(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  private applyMemberDiscount(amount: number, customer: Customer): number {
    return customer.type === 'premium' ? amount * 0.9 : amount;
  }

  private applyBulkDiscount(amount: number): number {
    return amount > 1000 ? amount - 50 : amount;
  }
}

// Adapter dla backwards compatibility
function calculatePrice(items: any[], customer: any): number {
  const calculator = new PriceCalculator();
  const mappedItems = items.map((item) => ({
    price: item.price,
    quantity: item.qty,
  }));
  return calculator.calculate(mappedItems, customer);
}
```

```bash
npm test
# ✅ All tests pass - refactoring successful!
```

## Refactoring Patterns

### Pattern 1: Extract Method

```typescript
// ❌ Before - Long method
function processOrder(order) {
  // Validate (10 lines)
  if (!order.items || order.items.length === 0) {
    throw new Error('Empty order');
  }
  // ... more validation

  // Calculate (15 lines)
  let total = 0;
  for (const item of order.items) {
    // ... complex calculation
  }

  // Save (20 lines)
  const connection = await db.connect();
  // ... database operations

  // Send email (10 lines)
  const email = generateEmail(order);
  // ... email sending

  return order;
}

// ✅ After - Extracted methods
async function processOrder(order: Order): Promise<Order> {
  this.validateOrder(order);
  const total = this.calculateTotal(order);
  const savedOrder = await this.saveOrder(order, total);
  await this.sendConfirmationEmail(savedOrder);
  return savedOrder;
}
```

### Pattern 2: Replace Conditional with Polymorphism

```typescript
// ❌ Before - Type checking
class Animal {
  constructor(public type: string) {}

  makeSound() {
    if (this.type === 'dog') {
      return 'Woof!';
    } else if (this.type === 'cat') {
      return 'Meow!';
    } else if (this.type === 'cow') {
      return 'Moo!';
    }
    return 'Unknown sound';
  }
}

// ✅ After - Polymorphism
abstract class Animal {
  abstract makeSound(): string;
}

class Dog extends Animal {
  makeSound() {
    return 'Woof!';
  }
}

class Cat extends Animal {
  makeSound() {
    return 'Meow!';
  }
}

class Cow extends Animal {
  makeSound() {
    return 'Moo!';
  }
}
```

### Pattern 3: Introduce Parameter Object

```typescript
// ❌ Before - Too many parameters
function createUser(
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  address: string,
  city: string,
  country: string,
  zipCode: string
) {
  // ...
}

// ✅ After - Parameter object
interface CreateUserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: Address;
}

interface Address {
  street: string;
  city: string;
  country: string;
  zipCode: string;
}

function createUser(data: CreateUserData) {
  // ...
}
```

### Pattern 4: Replace Magic Numbers with Constants

```typescript
// ❌ Before
function calculateDiscount(price: number) {
  if (price > 1000) {
    return price * 0.15;
  } else if (price > 500) {
    return price * 0.1;
  }
  return price * 0.05;
}

// ✅ After
const DISCOUNT_TIERS = {
  PREMIUM: { threshold: 1000, rate: 0.15 },
  STANDARD: { threshold: 500, rate: 0.1 },
  BASIC: { threshold: 0, rate: 0.05 },
} as const;

function calculateDiscount(price: number): number {
  if (price > DISCOUNT_TIERS.PREMIUM.threshold) {
    return price * DISCOUNT_TIERS.PREMIUM.rate;
  } else if (price > DISCOUNT_TIERS.STANDARD.threshold) {
    return price * DISCOUNT_TIERS.STANDARD.rate;
  }
  return price * DISCOUNT_TIERS.BASIC.rate;
}
```

## Dealing with God Objects

```
user: Ten class ma 2000 linii i robi wszystko. Refaktoruj
```

### Strategia:

1. **Identify responsibilities**
```typescript
// God Object - UserManager robi WSZYSTKO
class UserManager {
  createUser() {}
  updateUser() {}
  deleteUser() {}
  sendEmail() {}
  validateEmail() {}
  hashPassword() {}
  generateToken() {}
  logActivity() {}
  calculateStatistics() {}
  // ... 50 more methods
}
```

2. **Extract services**
```typescript
// ✅ Refactored - Single Responsibility
class UserService {
  constructor(
    private userRepository: UserRepository,
    private emailService: EmailService,
    private authService: AuthService
  ) {}

  async createUser(data: CreateUserDTO): Promise<User> {
    const user = await this.userRepository.create(data);
    await this.emailService.sendWelcome(user.email);
    return user;
  }
}

class EmailService {
  async sendWelcome(email: string) {}
  async sendPasswordReset(email: string) {}
}

class AuthService {
  hashPassword(password: string): string {}
  generateToken(userId: number): string {}
}

class UserAnalytics {
  calculateStatistics(userId: number) {}
}
```

## Strangler Fig Pattern (dla dużych systemów)

```
user: Mamy legacy monolith. Jak stopniowo migrować do mikroserw isów?
```

### Strategia:

1. **Identify seam** - znajdź granicę do wydzielenia
2. **Create facade** - adapter layer
3. **Implement new service** - nowa funkcjonalność
4. **Route traffic** - stopniowo przekierowuj
5. **Remove old code** - usuń legacy po migracji

```typescript
// Legacy monolith
app.post('/orders', legacyOrderHandler);

// Step 1: Facade
class OrderFacade {
  constructor(
    private legacyOrderService: LegacyOrderService,
    private newOrderService: NewOrderService
  ) {}

  async createOrder(data: any) {
    // Feature flag
    if (this.shouldUseNewService()) {
      return await this.newOrderService.create(data);
    } else {
      return await this.legacyOrderService.create(data);
    }
  }

  private shouldUseNewService(): boolean {
    // Gradual rollout: 10% of traffic
    return Math.random() < 0.1;
  }
}

// Step 2: Replace handler
app.post('/orders', (req, res) => {
  const facade = new OrderFacade(legacyService, newService);
  const order = await facade.createOrder(req.body);
  res.json(order);
});

// Step 3: Monitor, increase percentage, eventually remove legacy
```

## Working with Dependencies

### Dependency Injection for testability

```typescript
// ❌ Before - Hard-coded dependencies
class OrderService {
  async createOrder(data: any) {
    const db = new Database(); // ❌ Can't test without real DB
    const email = new EmailClient(); // ❌ Can't test without sending emails

    const order = await db.save(data);
    await email.send(order.userEmail, 'Order created');
    return order;
  }
}

// ✅ After - Dependency Injection
interface IDatabase {
  save(data: any): Promise<any>;
}

interface IEmailClient {
  send(to: string, subject: string): Promise<void>;
}

class OrderService {
  constructor(
    private db: IDatabase,
    private emailClient: IEmailClient
  ) {}

  async createOrder(data: any) {
    const order = await this.db.save(data);
    await this.emailClient.send(order.userEmail, 'Order created');
    return order;
  }
}

// Now testable with mocks!
const mockDb = { save: jest.fn() };
const mockEmail = { send: jest.fn() };
const service = new OrderService(mockDb, mockEmail);
```

## Code Quality Tools

```
user: Znajdź wszystkie code smells i zasugeruj refactoring
assistant: [Używa ESLint, SonarQube, etc.]
```

### Setup automated checks:

```javascript
// .eslintrc.js
module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    'complexity': ['error', 10], // Max cyclomatic complexity
    'max-lines-per-function': ['warn', 50],
    'max-depth': ['error', 3],
    'no-magic-numbers': 'warn',
  },
};
```

## Zadanie praktyczne

**Cel**: Refactor legacy shopping cart

### Kod do refaktoringu:

```javascript
// legacy-cart.js
var cart = {
  items: [],
  total: 0,
  addItem: function (id, name, price, qty) {
    var found = false;
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].id == id) {
        this.items[i].qty += qty;
        found = true;
        break;
      }
    }
    if (!found) {
      this.items.push({ id: id, name: name, price: price, qty: qty });
    }
    this.calculateTotal();
  },
  calculateTotal: function () {
    this.total = 0;
    for (var i = 0; i < this.items.length; i++) {
      this.total += this.items[i].price * this.items[i].qty;
    }
    if (this.total > 1000) this.total = this.total * 0.9;
  },
  // ... więcej metod
};
```

### Zadanie:

1. Dodaj characterization tests
2. Convert do TypeScript
3. Extract do klasy z proper encapsulation
4. Add input validation
5. Use modern JS (map, reduce)
6. Add error handling
7. Verify tests still pass

```
user: Refaktoruj ten legacy cart do nowoczesnego TypeScript
```

## Best Practices

- [ ] **Tests first** - zawsze dodaj testy przed refactoringiem
- [ ] **Small steps** - małe, incremental changes
- [ ] **Run tests often** - after każdej zmiany
- [ ] **One refactoring at a time** - nie mix z features
- [ ] **Use automated tools** - linters, formatters
- [ ] **Code review** - peer review refactorings
- [ ] **Document decisions** - ADRs (Architecture Decision Records)

## Podsumowanie

Refactoring legacy code z Claude Code:
- **Bezpieczny** - testy gwarantują zachowanie behavior
- **Stopniowy** - small steps, ciągła integracja
- **Automatyczny** - AI sugeruje improvements
- **Dokumentowany** - AI wyjaśnia zmiany

## Dodatkowe materiały

### Książki
- Working Effectively with Legacy Code (Michael Feathers)
- Refactoring (Martin Fowler)
- Clean Code (Robert C. Martin)

### Narzędzia
- [ESLint](https://eslint.org/) - JavaScript linter
- [SonarQube](https://www.sonarqube.org/) - Code quality
- [CodeScene](https://codescene.com/) - Technical debt analysis

---

**Czas trwania**: ~30 minut
**Poziom**: Zaawansowany
