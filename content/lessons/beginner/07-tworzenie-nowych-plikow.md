---
title: "Tworzenie nowych plików"
description: "Naucz się, jak Claude Code tworzy nowe pliki i organizuje strukturę projektu"
duration: 12
difficulty: beginner
tags: [pliki, write, struktura, organizacja]
---

# Tworzenie nowych plików

## Wprowadzenie

Tworzenie nowych plików to codzienna czynność w programowaniu. Claude Code nie tylko może tworzyć pliki, ale także pomaga w organizacji projektu, sugerując odpowiednią strukturę katalogów i nazewnictwo. W tej lekcji nauczysz się, jak efektywnie tworzyć nowe pliki i struktury projektów z pomocą Claude Code.

## Dlaczego to ważne?

Właściwa organizacja plików to fundament każdego projektu:
- **Skalowalność:** Dobrze zorganizowany projekt łatwiej się rozrasta
- **Czytelność:** Łatwiej znaleźć potrzebne pliki
- **Współpraca:** Zespół szybciej odnajduje się w projekcie
- **Standardy:** Claude Code zna best practices dla różnych frameworków

## Narzędzie Write

### Podstawy

Narzędzie Write służy do:
- Tworzenia nowych plików
- Nadpisywania całych plików (rzadko używane)

**Składnia (wewnętrzna, używana przez Claude Code):**
```
Write(file_path, content)
```

**Jako użytkownik, po prostu opisujesz, co chcesz:**
```
Stwórz plik config.js z podstawową konfiguracją
```

### Kiedy Claude Code używa Write?

1. **Tworzenie nowego pliku:**
   ```
   Ty: Stwórz plik logger.js z prostą funkcją logowania
   ```

2. **Tworzenie plików konfiguracyjnych:**
   ```
   Ty: Dodaj plik .eslintrc.json z moją konfiguracją ESLint
   ```

3. **Generowanie boilerplate:**
   ```
   Ty: Stwórz podstawowy komponent React Button.jsx
   ```

4. **Tworzenie dokumentacji:**
   ```
   Ty: Wygeneruj README.md z opisem projektu
   ```

## Praktyczne scenariusze

### Scenariusz 1: Pojedynczy plik

**Cel:** Stworzyć prosty moduł utilities

```
Ty: Stwórz plik src/utils/helpers.js z funkcjami formatDate i formatCurrency
```

**Co robi Claude Code:**

1. **Sprawdza strukturę:** Czy katalog `src/utils/` istnieje?
2. **Tworzy katalogi jeśli potrzeba:** `mkdir -p src/utils`
3. **Tworzy plik z zawartością:**

```javascript
/**
 * Format date to readable string
 * @param {Date} date - Date object to format
 * @returns {string} Formatted date string
 */
function formatDate(date) {
  return new Intl.DateTimeFormat('pl-PL').format(date);
}

/**
 * Format number as currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: PLN)
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount, currency = 'PLN') {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: currency
  }).format(amount);
}

module.exports = {
  formatDate,
  formatCurrency
};
```

4. **Potwierdza:** "✓ Utworzyłem plik src/utils/helpers.js z funkcjami formatDate i formatCurrency"

### Scenariusz 2: Wiele plików naraz

**Cel:** Stworzyć strukturę modułu z testami

```
Ty: Stwórz moduł authentication z następującymi plikami:
- src/auth/login.js (funkcja login)
- src/auth/logout.js (funkcja logout)
- src/auth/index.js (eksport obu funkcji)
- tests/auth/login.test.js (testy dla login)
- tests/auth/logout.test.js (testy dla logout)
```

**Claude Code:**
1. Tworzy całą strukturę katalogów
2. Generuje każdy plik z odpowiednią zawartością
3. Upewnia się, że pliki są ze sobą połączone (imports/exports)
4. Tworzy sensowne testy

**Rezultat:**
```
src/
  auth/
    ├── login.js
    ├── logout.js
    └── index.js
tests/
  auth/
    ├── login.test.js
    └── logout.test.js
```

### Scenariusz 3: Szablony i boilerplate

**Cel:** Stworzyć komponent React ze wszystkimi plikami

```
Ty: Stwórz komponent React UserCard z plikami:
- Component
- Styles (CSS modules)
- Tests
- Storybook story
```

**Claude Code wygeneruje:**

**components/UserCard/UserCard.jsx:**
```jsx
import React from 'react';
import styles from './UserCard.module.css';

/**
 * UserCard component displays user information
 */
export const UserCard = ({ user }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.name}>{user.name}</h3>
      <p className={styles.email}>{user.email}</p>
    </div>
  );
};
```

**components/UserCard/UserCard.module.css:**
```css
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
}

.name {
  margin: 0 0 8px 0;
  font-size: 18px;
}

.email {
  margin: 0;
  color: #666;
}
```

**components/UserCard/UserCard.test.jsx:**
```jsx
import { render, screen } from '@testing-library/react';
import { UserCard } from './UserCard';

describe('UserCard', () => {
  const mockUser = {
    name: 'Jan Kowalski',
    email: 'jan@example.com'
  };

  test('renders user name', () => {
    render(<UserCard user={mockUser} />);
    expect(screen.getByText('Jan Kowalski')).toBeInTheDocument();
  });

  test('renders user email', () => {
    render(<UserCard user={mockUser} />);
    expect(screen.getByText('jan@example.com')).toBeInTheDocument();
  });
});
```

**components/UserCard/UserCard.stories.jsx:**
```jsx
import { UserCard } from './UserCard';

export default {
  title: 'Components/UserCard',
  component: UserCard,
};

export const Default = {
  args: {
    user: {
      name: 'Jan Kowalski',
      email: 'jan@example.com'
    }
  }
};
```

**components/UserCard/index.js:**
```javascript
export { UserCard } from './UserCard';
```

## Organizacja struktury projektu

### Claude Code zna best practices

Claude Code automatycznie stosuje odpowiednią organizację dla różnych typów projektów:

#### React Project
```
src/
  components/
    Button/
      Button.jsx
      Button.module.css
      Button.test.jsx
      index.js
  hooks/
    useAuth.js
    useLocalStorage.js
  utils/
    helpers.js
  App.jsx
  index.js
```

#### Node.js API
```
src/
  controllers/
    userController.js
    productController.js
  models/
    User.js
    Product.js
  routes/
    userRoutes.js
    productRoutes.js
  middleware/
    auth.js
    errorHandler.js
  config/
    database.js
  app.js
  server.js
```

#### Express + MongoDB
```
src/
  models/
  controllers/
  routes/
  middleware/
  utils/
  config/
tests/
  unit/
  integration/
```

### Pytaj Claude Code o strukturę

```
Ty: Jaką strukturę katalogów powinienem użyć dla projektu Express API z MongoDB?

Claude Code: [wyjaśnia strukturę i tworzy ją dla Ciebie]
```

## Zadanie praktyczne

**Cel:** Stwórz kompletny moduł z testami i dokumentacją

### Zadanie 1: Prosty moduł

Stwórz moduł `calculator` z następującymi plikami:

```
Ty: Stwórz moduł calculator w katalogu src/ z funkcjami:
- add(a, b)
- subtract(a, b)
- multiply(a, b)
- divide(a, b)

Dodaj także:
- Testy w tests/calculator.test.js
- Dokumentację w docs/calculator.md
```

**Sprawdź rezultat:**
1. Czy katalogi zostały utworzone?
2. Czy funkcje mają dokumentację JSDoc?
3. Czy testy pokrywają wszystkie funkcje?
4. Czy dokumentacja jest kompletna?

### Zadanie 2: Struktura komponentu

Stwórz komponent z pełną strukturą:

```
Ty: Stwórz komponent React ProductCard, który wyświetla:
- Zdjęcie produktu
- Nazwę
- Cenę
- Przycisk "Dodaj do koszyka"

Struktura:
- components/ProductCard/
  - ProductCard.jsx (komponent)
  - ProductCard.module.css (style)
  - ProductCard.test.jsx (testy)
  - ProductCard.stories.jsx (storybook)
  - index.js (eksport)
```

**Sprawdź:**
1. Czy wszystkie pliki są ze sobą poprawnie połączone?
2. Czy testy działają? (uruchom `npm test`)
3. Czy Storybook story jest kompletny?

### Zadanie 3: API Endpoint

Stwórz kompletny endpoint API:

```
Ty: Stwórz endpoint REST API dla zarządzania książkami (books):
- Model w src/models/Book.js (Mongoose schema)
- Kontroler w src/controllers/bookController.js (CRUD operations)
- Routes w src/routes/bookRoutes.js (Express router)
- Testy w tests/api/books.test.js (supertest)
```

**Sprawdź:**
1. Czy pliki są poprawnie zaimportowane?
2. Czy endpoint jest kompletny (GET, POST, PUT, DELETE)?
3. Czy testy pokrywają wszystkie operacje?

### Zadanie 4: Konfiguracja projektu

Dodaj pliki konfiguracyjne do projektu:

```
Ty: Dodaj pliki konfiguracyjne:
- .eslintrc.json (z moją preferowaną konfiguracją)
- .prettierrc.json (format width 80, 2 spacje)
- .gitignore (dla Node.js)
- .env.example (z przykładowymi zmiennymi dla MongoDB i PORT)
```

**Sprawdź:**
1. Czy konfiguracje są sensowne?
2. Czy .gitignore zawiera wszystkie potrzebne wpisy?
3. Czy .env.example jest kompletny?

## Best practices

### 1. Jasne nazewnictwo

✅ **Dobre:**
```
userController.js
ProductCard.jsx
auth.middleware.js
```

❌ **Złe:**
```
uc.js
card.jsx
mid.js
```

### 2. Konsystentna struktura

Trzymaj się jednej konwencji w całym projekcie:

```
components/
  Button/
    Button.jsx
    Button.test.jsx
  Card/
    Card.jsx
    Card.test.jsx
```

### 3. Grupowanie po funkcjonalności

Dla dużych projektów grupuj po features:

```
features/
  auth/
    components/
    hooks/
    utils/
  products/
    components/
    hooks/
    utils/
```

### 4. Index files dla eksportów

```javascript
// components/Button/index.js
export { Button } from './Button';
export { ButtonGroup } from './ButtonGroup';
```

Pozwala to na:
```javascript
import { Button, ButtonGroup } from './components/Button';
```

### 5. Kolocacja testów

Trzymaj testy blisko kodu:

✅ **Zalecane:**
```
Button/
  Button.jsx
  Button.test.jsx
```

vs

❌ **Mniej wygodne:**
```
src/Button.jsx
tests/Button.test.jsx
```

## Częste pytania

### Czy mogę tworzyć pliki w katalogach, które nie istnieją?

**Tak!** Claude Code automatycznie utworzy potrzebne katalogi:

```
Ty: Stwórz plik src/features/auth/components/LoginForm.jsx
```

Claude Code wykona:
```bash
mkdir -p src/features/auth/components
# Potem utworzy plik
```

### Jak Claude Code decyduje o strukturze pliku?

Claude Code bierze pod uwagę:
1. **Typ projektu:** React, Node, Vue, etc.
2. **Istniejącą strukturę:** Kontynuuje obecną konwencję
3. **Best practices:** Stosuje standardy branżowe
4. **Twoje instrukcje:** Jeśli je podasz, mają pierwszeństwo

### Czy mogę prosić o konkretny styl kodu?

**Tak!** Możesz określić preferencje:

```
Ty: Stwórz komponent używając React Hooks, styled-components i TypeScript
```

### Co jeśli plik już istnieje?

Claude Code:
1. Poinformuje Cię, że plik istnieje
2. Zapyta, czy nadpisać
3. Zasugeruje użycie Edit zamiast Write

## Zaawansowane techniki

### 1. Generowanie z szablonów

```
Ty: Użyj tego samego wzorca co w components/Button/ i stwórz komponent Input
```

Claude Code:
- Przeanalizuje strukturę Button
- Stworzy analogiczną dla Input

### 2. Masowe tworzenie

```
Ty: Stwórz komponenty dla: Header, Footer, Sidebar, MainContent - wszystkie z tą samą strukturą (JSX, CSS modules, tests)
```

### 3. Migracje i refaktoringi

```
Ty: Przenieś wszystkie utils z src/ do src/utils/, zachowując strukturę podkatalogów
```

### 4. Scaffolding

```
Ty: Wygeneruj pełną strukturę projektu Express API z:
- MVC pattern
- Mongoose models
- JWT auth
- Error handling
- Logging
- Tests
```

## Jak Claude Code może Ci pomóc?

Możesz pytać:
- "Jaka jest najlepsza struktura dla projektu React?"
- "Jak powinienem zorganizować API endpoints?"
- "Stwórz mi kompletny boilerplate dla Node.js API"
- "Jakie pliki konfiguracyjne powinienem dodać do projektu?"

## Dodatkowe materiały

### Oficjalna dokumentacja
- [Write Tool Reference](https://docs.claude.com/en/docs/claude-code/tools/write)
- [Project Structure Best Practices](https://docs.claude.com/en/docs/claude-code/project-structure)
- [File Organization Patterns](https://docs.claude.com/en/docs/claude-code/patterns/file-organization)

### Video tutoriale
- [Creating Files with Claude Code](https://www.youtube.com/results?search_query=claude+code+creating+files)
- [Project Scaffolding Tutorial](https://www.youtube.com/results?search_query=claude+code+project+structure)

### Artykuły
- [Best Practices for File Organization](https://www.anthropic.com/news)
- [From Zero to Full Project with Claude Code](https://www.anthropic.com/news)

### Przykłady struktur
- [React Project Structures](https://github.com/search?q=react+project+structure)
- [Node.js API Best Practices](https://github.com/goldbergyoni/nodebestpractices)

## Podsumowanie

W tej lekcji nauczyłeś się:
- Jak Claude Code tworzy nowe pliki używając narzędzia Write
- Jak organizować strukturę projektu zgodnie z best practices
- Jak tworzyć wiele powiązanych plików naraz
- Jak generować boilerplate i szablony
- Jakie są dobre praktyki nazewnictwa i organizacji plików

W następnej lekcji nauczysz się nawigacji po projekcie i wyszukiwania w kodzie!

---

**Ilustracje:** (do dodania)
- Diagram przykładowych struktur projektów
- Screenshot tworzenia wieloplikowej struktury
- Infografika best practices dla organizacji plików
- Flowchart decyzyjny: Edit vs Write
