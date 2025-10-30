---
title: "Praktyczne przykłady Agents"
description: "Rzeczywiste scenariusze użycia agents w codziennej pracy"
duration: 15
difficulty: beginner
tags: [agents, examples, workflow, praktyka]
---

# Praktyczne przykłady Agents

## Wprowadzenie

Najlepszy sposób nauki to praktyka. W tej lekcji zobaczysz rzeczywiste scenariusze użycia agents w codziennych zadaniach programistycznych - od prostych po zaawansowane.

## Scenariusz 1: Dodawanie nowej funkcji z TDD

### Zadanie
Dodaj funkcję walidacji email z testami używając TDD.

### Rozwiązanie z test-first-developer

```
Ty: Użyj test-first-developer do dodania funkcji validateEmail(email) w src/utils/validators.js

Funkcja powinna:
- Sprawdzać poprawność formatu email
- Zwracać true/false
- Obsługiwać edge cases
```

**Co robi agent:**

1. **Pisze testy najpierw:**
```javascript
// tests/validators.test.js
describe('validateEmail', () => {
  test('valid email returns true', () => {
    expect(validateEmail('test@example.com')).toBe(true);
  });

  test('invalid email returns false', () => {
    expect(validateEmail('invalid')).toBe(false);
  });

  test('empty string returns false', () => {
    expect(validateEmail('')).toBe(false);
  });

  test('null returns false', () => {
    expect(validateEmail(null)).toBe(false);
  });
});
```

2. **Implementuje funkcję:**
```javascript
// src/utils/validators.js
function validateEmail(email) {
  if (!email) return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
```

3. **Uruchamia testy:**
```
✓ All tests pass (4/4)
```

4. **Refaktoruje jeśli potrzeba**

**Output:** Funkcja + Testy + Dokumentacja JSDoc

---

## Scenariusz 2: Znajdowanie deprecated API

### Zadanie
Projekt używa starego API. Znajdź wszystkie miejsca używające `oldFetch()`.

### Rozwiązanie z Explore Agent

```
Ty: Użyj Explore (medium) do znalezienia wszystkich użyć funkcji oldFetch
```

**Co robi agent:**

1. Przeszukuje cały projekt
2. Znajduje wszystkie wystąpienia `oldFetch`
3. Grupuje według plików i kontekstu

**Output:**
```
Found oldFetch() in 12 locations:

src/api/users.js:23
  const data = await oldFetch('/users');

src/api/products.js:45
  oldFetch('/products').then(data => ...)

src/components/Dashboard.jsx:67
  useEffect(() => {
    oldFetch('/dashboard').then(...)
  })

[... pozostałe 9 lokalizacji]

Recommendations:
- Migracja do newFetch() API
- Wszystkie wystąpienia używają tego samego wzorca
- Można zautomatyzować zamianę
```

**Następny krok:**
```
Ty: Zamień wszystkie oldFetch na newFetch używając MultiEdit
```

---

## Scenariusz 3: Code Review przed PR

### Zadanie
Napisałeś nową funkcjonalność user profile. Przed PR chcesz review.

### Rozwiązanie z code-reviewer

```
Ty: Użyj code-reviewer do przeglądu src/features/user-profile/
```

**Co robi agent:**

1. Czyta wszystkie pliki w module
2. Sprawdza KISS (Keep It Simple)
3. Sprawdza DRY (Don't Repeat Yourself)
4. Sprawdza best practices

**Output:**
```
Code Review Report: src/features/user-profile/

✓ POSITIVE:
- Good separation of concerns
- Clear naming conventions
- Proper error handling

⚠ SUGGESTIONS:

1. ProfileForm.jsx:45-78 (34 lines)
   Function handleSubmit() is too long
   Recommendation: Extract validation into separate function

2. userService.js:23, 45, 67
   Similar fetch pattern repeated 3 times (DRY violation)
   Recommendation: Create shared fetchUser() helper

3. ProfileCard.jsx
   Missing PropTypes validation
   Recommendation: Add PropTypes for better type safety

4. userService.js:89
   Error is logged but not handled
   Recommendation: Add proper error handling or propagation

Overall Score: 7.5/10
Ready for PR after addressing suggestions #1 and #2
```

**Następny krok:**
```
Ty: Napraw sugestie #1 i #2, potem ponownie użyj code-reviewer
```

---

## Scenariusz 4: Debugging trudnego buga

### Zadanie
Login działa dla większości użytkowników, ale niektórzy nie mogą się zalogować. Nie ma oczywistego powodu.

### Rozwiązanie z debugger-detective

```
Ty: Użyj debugger-detective do znalezienia, dlaczego login nie działa dla niektórych użytkowników

Symptomy:
- 90% użytkowników OK
- 10% dostaje error "Authentication failed"
- Dzieje się losowo
```

**Co robi agent:**

1. **Analizuje kod login:**
```javascript
// src/auth/login.js
async function login(email, password) {
  const user = await User.findByEmail(email);
  const isValid = await bcrypt.compare(password, user.password);
  // ...
}
```

2. **Tworzy failing test:**
```javascript
test('login fails for emails with uppercase', async () => {
  // User in DB: test@example.com
  // Login attempt: Test@example.com
  const result = await login('Test@example.com', 'password123');
  expect(result.success).toBe(true); // FAILS!
});
```

3. **Identyfikuje problem:**
```
Found issue:
- findByEmail() is case-sensitive
- Some users registered with Test@example.com
- Login tries Test@example.com but DB has test@example.com
- Comparison fails
```

4. **Naprawia:**
```javascript
async function login(email, password) {
  const normalizedEmail = email.toLowerCase();
  const user = await User.findByEmail(normalizedEmail);
  // ...
}
```

5. **Weryfikuje:**
```
✓ All tests pass including new test
```

**Output:** Bug znaleziony + Fix + Test

---

## Scenariusz 5: Refactoring legacy code

### Zadanie
Stary moduł payments jest trudny w utrzymaniu. Trzeba zrefaktoryzować z gwarancją, że nic się nie zepsuje.

### Rozwiązanie z refactoring-master

```
Ty: Użyj refactoring-master do refactoringu src/payments/

Focus na:
- Redukcja kompleksności
- Wydzielenie business logic
- Poprawa testability
```

**Co robi agent:**

1. **Czyta obecny kod**
2. **Uruchamia istniejące testy** (przed refactoringiem)
```
Running tests... ✓ 15/15 passed
```

3. **Refaktoryzuje:**

**Before:**
```javascript
// 150 linii w jednej funkcji processPayment()
function processPayment(order) {
  // walidacja
  if (!order.amount || order.amount <= 0) throw new Error('Invalid amount');
  // obliczenia
  const tax = order.amount * 0.23;
  const total = order.amount + tax;
  // payment processing
  const stripe = require('stripe')(process.env.STRIPE_KEY);
  const charge = await stripe.charges.create({...});
  // email notification
  await sendEmail(order.user.email, 'Payment receipt', ...);
  // database update
  await Order.updateOne({_id: order._id}, {status: 'paid'});
  // ...
}
```

**After:**
```javascript
// Wydzielone funkcje
function validateOrder(order) {
  if (!order.amount || order.amount <= 0) {
    throw new OrderValidationError('Invalid amount');
  }
}

function calculateTotal(amount, taxRate = 0.23) {
  const tax = amount * taxRate;
  return amount + tax;
}

async function chargePayment(amount, paymentMethod) {
  const stripe = getStripeClient();
  return await stripe.charges.create({
    amount,
    payment_method: paymentMethod
  });
}

async function notifyPaymentSuccess(order) {
  await emailService.send({
    to: order.user.email,
    template: 'payment-success',
    data: order
  });
}

// Główna funkcja jest teraz czytelna
async function processPayment(order) {
  validateOrder(order);
  const total = calculateTotal(order.amount);
  const charge = await chargePayment(total, order.paymentMethod);
  await Order.markAsPaid(order._id, charge.id);
  await notifyPaymentSuccess(order);
  return { success: true, charge };
}
```

4. **Uruchamia testy ponownie:**
```
Running tests... ✓ 15/15 passed
```

5. **Raport:**
```
Refactoring completed successfully:

Changes:
- Reduced complexity: 150 lines → 5 functions (avg 15 lines each)
- Extracted 4 reusable functions
- Improved testability (each function can be tested independently)
- Better error handling with custom errors
- Separated concerns (validation, calculation, payment, notification)

Tests: ✓ All 15 tests still passing
```

**Output:** Zrefaktoryzowany kod + Gwarancja działania

---

## Scenariusz 6: Kompletny workflow z wieloma agents

### Zadanie
Dodaj nową funkcję "User Notifications System" od zera do produkcji.

### Rozwiązanie: Multi-Agent Workflow

**Krok 1: Architektura**
```
Ty: Użyj chief-architect do zaprojektowania architektury User Notifications System

Requirements:
- Email i SMS notifications
- Templates
- Scheduling
- Delivery tracking
```

**Output:** Dokument architektury + Risks + Plan implementacji

**Krok 2: Implementation**
```
Ty: Użyj test-first-developer do implementacji NotificationService według planu
```

**Output:** Kod + Testy

**Krok 3: Tests**
```
Ty: Użyj uni-tester do dodania edge case tests dla NotificationService
```

**Output:** Dodatkowe testy (email failures, SMS rate limits, etc.)

**Krok 4: Security Review**
```
Ty: Użyj security-guardian do audytu NotificationService
```

**Output:** Security report (check for data exposure, injection, etc.)

**Krok 5: Code Review**
```
Ty: Użyj code-reviewer dla całego modułu notifications
```

**Output:** Sugestie poprawy (KISS, DRY)

**Krok 6: Apply Improvements**
```
Ty: Zastosuj sugestie z code review
```

**Krok 7: Quality Gate**
```
Ty: Użyj quality-gate-tester przed PR
```

**Output:** ✓ All checks passed - ready for PR

**Krok 8: Documentation**
```
Ty: Użyj documentation-writer do stworzenia docs dla NotificationService
```

**Output:** API.md + README.md

**Krok 9: Pull Request**
```
Ty: Stwórz PR dla notification system
```

**Rezultat:** Kompletna, przetestowana, udokumentowana funkcjonalność!

---

## Scenariusz 7: Performance Issues

### Zadanie
Dashboard ładuje się wolno. Użytkownicy narzekają.

### Rozwiązanie z performance-optimizer

```
Ty: Użyj performance-optimizer do analizy i poprawy wydajności src/components/Dashboard.jsx
```

**Co robi agent:**

1. **Profilowanie:**
```
Performance Analysis:
- Component renders 15 times on mount
- Fetches data 5 times (unnecessary)
- Large list without virtualization (1000 items)
- No memoization for expensive calculations
```

2. **Optymalizacja:**

**Before:**
```jsx
function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchUsers().then(setData);
    fetchProducts().then(setData);
    fetchOrders().then(setData);
    // ... 3 more fetches
  }, []);

  const stats = calculateStats(data); // Expensive, runs on every render

  return (
    <div>
      {data.map(item => <Item key={item.id} data={item} />)}
    </div>
  );
}
```

**After:**
```jsx
function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Combined fetch - single request
    fetchDashboardData().then(setData);
  }, []);

  // Memoized expensive calculation
  const stats = useMemo(() => calculateStats(data), [data]);

  return (
    <div>
      <VirtualList
        items={data}
        renderItem={(item) => <Item key={item.id} data={item} />}
      />
    </div>
  );
}

// Item is now memoized
const Item = memo(({ data }) => {
  return <div>{data.name}</div>;
});
```

3. **Benchmarks:**
```
Results:
- Renders: 15 → 2 (87% reduction)
- API calls: 5 → 1 (80% reduction)
- Initial load: 3.5s → 0.8s (77% faster)
- Memory usage: 150MB → 45MB (70% reduction)
```

**Output:** Zoptymalizowany kod + Benchmarks

---

## Zadanie praktyczne końcowe

### Comprehensive Project

Stwórz kompletny mini-projekt używając agents:

**Projekt:** Simple Todo App API

**Krok 1:**
```
Użyj chief-architect do zaprojektowania REST API dla Todo App
```

**Krok 2:**
```
Użyj test-first-developer do implementacji CRUD endpoints
```

**Krok 3:**
```
Użyj code-reviewer do review kodu
```

**Krok 4:**
```
Zastosuj sugestie code-reviewer
```

**Krok 5:**
```
Użyj security-guardian do audytu security
```

**Krok 6:**
```
Użyj quality-gate-tester przed finalizacją
```

**Krok 7:**
```
Użyj documentation-writer do stworzenia API docs
```

**Rezultat:** Production-ready API z testami, security i dokumentacją

---

## Best Practices z przykładów

### 1. Zawsze zacznij od planu
```
chief-architect → test-first-developer → code-reviewer
```

### 2. Test, refactor, test
```
uni-tester → refactoring-master → uni-tester again
```

### 3. Security is not optional
```
security-guardian before every deployment
```

### 4. Quality gates
```
quality-gate-tester before PR - always
```

### 5. Document as you go
```
documentation-writer after implementation
```

## Jak Claude Code może Ci pomóc?

```
Pokaż mi więcej przykładów workflow z agents
Jak połączyć agents A i B?
Jaki agent najlepszy dla mojego use case?
```

## Podsumowanie

Nauczyłeś się:
- Rzeczywistych scenariuszy użycia agents
- Kompleksowych workflow z wieloma agents
- Jak rozwiązywać typowe problemy z agents
- Best practices z praktycznych przykładów

**Gratulacje!** 🎉 Ukończyłeś Moduł 4: Agents i Task. Teraz znasz system agents i potrafisz efektywnie delegować zadania. W ostatnim Module 5 połączysz wszystko w praktyczny projekt!

---

**Ilustracje:** (do dodania)
- Diagram: Multi-agent workflow
- Screenshot: przed/po optymalizacji
- Flowchart: Complete feature lifecycle
