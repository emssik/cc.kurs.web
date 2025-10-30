---
title: "Nawigacja po projekcie"
description: "Naucz się, jak Claude Code wyszukuje i nawiguje po plikach w projekcie"
duration: 15
difficulty: beginner
tags: [nawigacja, glob, grep, wyszukiwanie]
---

# Nawigacja po projekcie

## Wprowadzenie

W każdym projekcie programistycznym kluczowa jest umiejętność szybkiego znajdowania potrzebnych plików i fragmentów kodu. Claude Code ma potężne narzędzia do wyszukiwania i nawigacji, które pozwalają mu (i Tobie!) szybko poruszać się po całym projekcie - bez względu na jego rozmiar.

## Dlaczego to ważne?

Efektywna nawigacja to:
- **Oszczędność czasu:** Sekundy vs minuty szukania
- **Lepsza kontekst:** Szybkie zrozumienie struktury projektu
- **Precyzja:** Znajdowanie dokładnie tego, czego szukasz
- **Skalowanie:** Działa nawet w bardzo dużych projektach

## Główne narzędzia nawigacji

Claude Code ma dwa kluczowe narzędzia do wyszukiwania:

### 1. Glob - Wyszukiwanie plików po nazwie/wzorcu

**Do czego służy:**
- Znajdowanie plików po nazwach
- Wyszukiwanie według wzorców (wildcards)
- Listowanie plików określonego typu

**Przykłady wzorców:**
```bash
**/*.js          # Wszystkie pliki .js w projekcie
src/**/*.test.js # Wszystkie testy w src/
*.json           # Wszystkie pliki .json w bieżącym katalogu
components/**    # Wszystko w katalogu components/
```

### 2. Grep - Wyszukiwanie w zawartości plików

**Do czego służy:**
- Znajdowanie tekstu w plikach
- Wyszukiwanie według wyrażeń regularnych
- Znajdowanie definicji funkcji, klas, zmiennych

**Możliwości:**
- Wyszukiwanie z uwzględnieniem wielkości liter lub bez
- Pokazywanie kontekstu (linie przed i po)
- Filtrowanie po typie pliku
- Liczenie wystąpień

## Praktyczne scenariusze

### Scenariusz 1: Znajdź wszystkie pliki testowe

```
Ty: Pokaż mi wszystkie pliki testowe w projekcie
```

**Claude Code użyje Glob:**
```
Pattern: **/*.test.js, **/*.test.jsx, **/*.spec.js
```

**Rezultat:**
```
Found 23 test files:
- src/utils/helpers.test.js
- src/components/Button/Button.test.jsx
- src/api/users.test.js
- ...
```

### Scenariusz 2: Znajdź definicję funkcji

```
Ty: Gdzie jest zdefiniowana funkcja calculateTotal?
```

**Claude Code użyje Grep:**
```
Pattern: function calculateTotal|const calculateTotal|calculateTotal.*=
```

**Rezultat:**
```
Found in src/cart/utils.js:15
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

### Scenariusz 3: Znajdź wszystkie użycia

```
Ty: Pokaż mi wszystkie miejsca, gdzie używana jest funkcja calculateTotal
```

**Claude Code użyje Grep:**
```
Pattern: calculateTotal
Output: content (pokazuje linie z kodem)
```

**Rezultat:**
```
Found 8 matches:

src/cart/utils.js:15
function calculateTotal(items) {

src/cart/Cart.jsx:23
const total = calculateTotal(cartItems);

src/checkout/Summary.jsx:45
<div>Total: {calculateTotal(items)}</div>

...
```

### Scenariusz 4: Znajdź komponenty React

```
Ty: Pokaż mi wszystkie komponenty React w projekcie
```

**Claude Code łączy Glob i Grep:**
1. **Glob:** `src/components/**/*.{jsx,tsx}`
2. **Grep:** Szuka eksportów komponentów

**Rezultat:**
```
Found 17 React components:
- Button (src/components/Button/Button.jsx)
- Card (src/components/Card/Card.jsx)
- Header (src/components/Header/Header.jsx)
...
```

### Scenariusz 5: Znajdź konfiguracje

```
Ty: Pokaż wszystkie pliki konfiguracyjne w projekcie
```

**Claude Code użyje Glob:**
```
Pattern: **/*config*.{js,json}, **/*.config.{js,json}, .*rc, .*rc.json
```

**Rezultat:**
```
Found 8 configuration files:
- package.json
- .eslintrc.json
- jest.config.js
- webpack.config.js
- babel.config.js
- .prettierrc
...
```

## Zaawansowane wzorce Glob

### Podstawowe wildcardy

```bash
*           # Dowolny ciąg znaków (nie obejmuje /)
**          # Dowolny ciąg znaków (obejmuje /)
?           # Jeden dowolny znak
[abc]       # Jeden znak: a, b, lub c
[a-z]       # Jeden znak z zakresu a-z
{js,ts}     # Albo js, albo ts
```

### Praktyczne przykłady

```bash
# Wszystkie pliki JavaScript i TypeScript
**/*.{js,ts,jsx,tsx}

# Wszystkie pliki w src/ oprócz testów
src/**/*.js
!src/**/*.test.js

# Wszystkie komponenty React
src/components/**/*.jsx

# Pliki styles (css, scss, sass)
**/*.{css,scss,sass}

# Wszystkie pliki markdown
**/*.md

# Pliki konfiguracyjne w głównym katalogu
*.config.{js,json}
```

## Zaawansowane wzorce Grep

### Wyrażenia regularne

```javascript
// Znajdź wszystkie funkcje async
async\s+function

// Znajdź wszystkie importy z React
import.*from\s+['"]react['"]

// Znajdź wszystkie definicje klas
class\s+\w+

// Znajdź wszystkie console.log (do usunięcia przed produkcją!)
console\.log

// Znajdź TODO komentarze
TODO:|FIXME:|HACK:
```

### Opcje wyszukiwania

**Case insensitive (ignoruj wielkość liter):**
```
Grep z flagą -i
```

**Pokazywanie kontekstu:**
```
-B 3  # 3 linie przed
-A 3  # 3 linie po
-C 3  # 3 linie przed i po
```

**Liczenie wystąpień:**
```
output_mode: "count"
```

## Zadanie praktyczne

**Cel:** Przećwicz nawigację po projekcie w różnych scenariuszach

### Przygotowanie: Utwórz testowy projekt

```
Ty: Stwórz testowy projekt z następującą strukturą:

src/
  components/
    Button/
      Button.jsx
      Button.test.jsx
      Button.module.css
    Card/
      Card.jsx
      Card.test.jsx
  utils/
    helpers.js
    helpers.test.js
  api/
    users.js
    products.js
package.json
README.md

Każdy plik powinien mieć przynajmniej kilka linii sensownego kodu.
```

### Zadanie 1: Znajdź wszystkie pliki CSS

```
Ty: Znajdź wszystkie pliki CSS i SCSS w projekcie
```

**Oczekiwany rezultat:**
- Lista wszystkich plików .css, .scss, .module.css

**Sprawdź:**
- Czy znalazło Button.module.css i Card.module.css?

### Zadanie 2: Znajdź wszystkie testy

```
Ty: Pokaż mi wszystkie pliki testowe
```

**Oczekiwany rezultat:**
- Button.test.jsx
- Card.test.jsx
- helpers.test.js

### Zadanie 3: Znajdź definicję funkcji

Najpierw dodaj funkcję:
```
Ty: W pliku src/utils/helpers.js dodaj funkcję formatPrice(amount)
```

Potem wyszukaj:
```
Ty: Gdzie jest zdefiniowana funkcja formatPrice?
```

**Oczekiwany rezultat:**
- Powinien znaleźć funkcję w src/utils/helpers.js z numerem linii

### Zadanie 4: Znajdź wszystkie importy

```
Ty: Znajdź wszystkie miejsca, gdzie importowany jest React
```

**Oczekiwany rezultat:**
- Lista plików z linijkami, gdzie jest `import React` lub `import { } from 'react'`

### Zadanie 5: Znajdź komponenty bez testów

To trudniejsze zadanie łączące kilka kroków:

```
Ty: Znajdź wszystkie komponenty .jsx i sprawdź, które nie mają odpowiadających plików .test.jsx
```

**Claude Code powinien:**
1. Znaleźć wszystkie pliki .jsx
2. Sprawdzić, czy istnieją odpowiadające .test.jsx
3. Pokazać listę komponentów bez testów

### Zadanie 6: Znajdź TODO komentarze

Najpierw dodaj kilka TODO:
```
Ty: Dodaj TODO komentarze w 3 różnych plikach
```

Potem wyszukaj:
```
Ty: Znajdź wszystkie komentarze TODO w projekcie
```

**Oczekiwany rezultat:**
- Lista wszystkich TODO z lokalizacją (plik:linia)

## Best practices dla nawigacji

### 1. Używaj konkretnych wzorców

❌ **Zbyt ogólne:**
```
Ty: Znajdź wszystkie pliki
```

✅ **Konkretne:**
```
Ty: Znajdź wszystkie komponenty React w katalogu components
```

### 2. Łącz narzędzia dla lepszych rezultatów

```
Ty: Znajdź wszystkie pliki .js, a następnie pokaż mi, które używają funkcji fetch
```

Claude Code:
1. Glob: `**/*.js`
2. Grep: `fetch\(`

### 3. Używaj kontekstu

```
Ty: Znajdź definicję funkcji handleSubmit i pokaż 5 linii kontekstu przed i po
```

### 4. Filtruj według typu

```
Ty: Znajdź słowo "error" tylko w plikach JavaScript, nie w plikach log
```

### 5. Weryfikuj rezultaty

```
Ty: Znajdź funkcję X i pokaż mi jej pełną definicję
```

Lepiej niż tylko lokalizacja.

## Częste pytania i problemy

### "Nie znaleziono żadnych plików"

**Możliwe przyczyny:**
1. Wzorzec jest zbyt restrykcyjny
2. Katalog nie istnieje
3. Pliki są w .gitignore (Claude Code ich nie widzi)

**Rozwiązanie:**
```
Ty: Sprawdź strukturę katalogów w projekcie
Ty: Użyj szerszego wzorca
```

### "Znaleziono za dużo wyników"

**Rozwiązanie:**
- Zawęź wzorzec
- Dodaj więcej filtrów
- Użyj head_limit do ograniczenia wyników

```
Ty: Znajdź tylko pierwsze 10 plików .js w src/components
```

### "Wyszukiwanie jest za wolne"

**Dla bardzo dużych projektów:**
- Używaj Task tool z agent Explore
- Zawężaj zakres wyszukiwania (konkretne katalogi)
- Używaj bardziej specyficznych wzorców

## Zaawansowane techniki

### 1. Analiza zależności

```
Ty: Znajdź wszystkie pliki, które importują komponent Button
```

### 2. Znajdowanie nieużywanych plików

```
Ty: Które pliki w src/utils/ nie są nigdzie importowane?
```

### 3. Analiza struktury

```
Ty: Pokaż strukturę katalogów projektu i policz pliki w każdym katalogu
```

### 4. Znajdowanie duplikatów

```
Ty: Czy są dwie funkcje o tej samej nazwie w różnych plikach?
```

### 5. Code smell detection

```
Ty: Znajdź wszystkie console.log w kodzie produkcyjnym (nie w testach)
Ty: Znajdź wszystkie funkcje dłuższe niż 50 linii
```

## Integracja z innymi narzędziami

### Z Git

```
Ty: Pokaż pliki, które zostały zmienione w ostatnim commicie i sprawdź, czy mają testy
```

### Z testami

```
Ty: Znajdź wszystkie testy i uruchom je
```

### Z linterem

```
Ty: Znajdź pliki JavaScript i uruchom na nich ESLint
```

## Jak Claude Code może Ci pomóc?

Możesz pytać:
- "Jak znaleźć wszystkie pliki określonego typu?"
- "Jaka jest składnia Glob patterns?"
- "Jak wyszukać tekst z użyciem wyrażeń regularnych?"
- "Pokaż mi przykłady zaawansowanych wzorców wyszukiwania"

## Dodatkowe materiały

### Oficjalna dokumentacja
- [Glob Tool Reference](https://docs.claude.com/en/docs/claude-code/tools/glob)
- [Grep Tool Reference](https://docs.claude.com/en/docs/claude-code/tools/grep)
- [Navigation Best Practices](https://docs.claude.com/en/docs/claude-code/navigation)

### Video tutoriale
- [Mastering Code Search in Claude Code](https://www.youtube.com/results?search_query=claude+code+search)
- [Glob and Grep Explained](https://www.youtube.com/results?search_query=claude+code+glob+grep)

### Artykuły
- [Effective Code Navigation Strategies](https://www.anthropic.com/news)
- [Glob Patterns Cheat Sheet](https://github.com/mrmlnc/fast-glob#pattern-syntax)

### Narzędzia online
- [Glob Pattern Tester](https://globster.xyz/)
- [Regex101 - Regex Tester](https://regex101.com/)

### Społeczność
- [GitHub Discussions - Search & Navigation](https://github.com/anthropics/claude-code/discussions)
- [Discord - #navigation](https://discord.gg/anthropic)

## Podsumowanie

W tej lekcji nauczyłeś się:
- Jak używać Glob do wyszukiwania plików po nazwach i wzorcach
- Jak używać Grep do wyszukiwania w zawartości plików
- Jakie są praktyczne wzorce dla codziennych zadań
- Jak łączyć narzędzia dla lepszych rezultatów
- Jak rozwiązywać typowe problemy z wyszukiwaniem

W następnej lekcji nauczysz się, jak Claude Code pracuje z Git do zarządzania kodem!

---

**Ilustracje:** (do dodania)
- Infografika: Glob vs Grep - kiedy używać którego
- Cheat sheet z najczęstszymi wzorcami Glob
- Diagram flow wyszukiwania w projekcie
- Screenshot przykładowej sesji wyszukiwania z rezultatami
