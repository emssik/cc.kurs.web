---
title: "Grep i wyszukiwanie w kodzie"
description: "Opanuj narzędzie Grep do zaawansowanego wyszukiwania w plikach projektu"
duration: 15
difficulty: beginner
tags: [grep, wyszukiwanie, regex, ripgrep]
---

# Grep i wyszukiwanie w kodzie

## Wprowadzenie

Grep to najpotężniejsze narzędzie wyszukiwania w Claude Code. Pozwala znaleźć dowolny tekst, wzorzec lub wyrażenie regularne w całym projekcie w ułamku sekundy. W tej lekcji nauczysz się efektywnie wyszukiwać kod, niezależnie od rozmiaru projektu.

## Dlaczego to ważne?

Grep to podstawa produktywnej pracy:
- **Szybkość:** Przeszukaj tysiące plików w sekundę
- **Precyzja:** Znajdź dokładnie to, czego szukasz
- **Kontekst:** Zobacz otoczenie znalezionych fragmentów
- **Analiza:** Zrozum, jak kod jest używany w projekcie

## Podstawy Grep

Grep w Claude Code używa [ripgrep](https://github.com/BurntSushi/ripgrep) - ultraszybkiego narzędzia wyszukiwania.

### Tryby wyszukiwania

**1. files_with_matches (domyślny):**
Pokazuje tylko nazwy plików z dopasowaniami.

**2. content:**
Pokazuje linie z dopasowaniami i opcjonalny kontekst.

**3. count:**
Pokazuje liczbę dopasowań w każdym pliku.

## Praktyczne przykłady

### Przykład 1: Znajdź funkcję

```
Ty: Gdzie jest zdefiniowana funkcja calculateTotal?
```

**Claude Code użyje:**
```
Pattern: function calculateTotal|const calculateTotal
Output: content
```

### Przykład 2: Znajdź wszystkie użycia

```
Ty: Pokaż wszystkie miejsca, gdzie używany jest calculateTotal
```

**Claude Code użyje:**
```
Pattern: calculateTotal
Output: content
-n: true (pokazuje numery linii)
```

### Przykład 3: Znajdź w określonych plikach

```
Ty: Znajdź słowo "error" tylko w plikach JavaScript
```

**Claude Code użyje:**
```
Pattern: error
Type: js
```

### Przykład 4: Case insensitive

```
Ty: Znajdź "TODO" (ignoruj wielkość liter)
```

**Claude Code użyje:**
```
Pattern: TODO
-i: true
```

### Przykład 5: Z kontekstem

```
Ty: Znajdź funkcję login i pokaż 3 linie przed i po
```

**Claude Code użyje:**
```
Pattern: function login
-C: 3
```

## Wzorce wyszukiwania

### Proste teksty

```
import React     # Znajdź dokładny tekst
console.log      # Znajdź console.log
@deprecated      # Znajdź deprecated kod
```

### Wyrażenia regularne

```javascript
// Znajdź wszystkie funkcje async
async\s+function|\s+async\s+\w+\s*=

// Znajdź importy React
import.*from\s+['"]react['"]

// Znajdź definicje klas
class\s+\w+(\s+extends\s+\w+)?

// Znajdź wszystkie TODO/FIXME
TODO:|FIXME:|HACK:|XXX:

// Znajdź adresy email
[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}

// Znajdź funkcje ze słowem "user"
function\s+\w*[Uu]ser\w*
```

## Filtrowanie

### Według typu pliku

```bash
type: js          # JavaScript (.js, .jsx, .mjs)
type: ts          # TypeScript (.ts, .tsx)
type: py          # Python
type: css         # CSS
type: json        # JSON
```

### Według wzorca plików (glob)

```bash
glob: "src/**/*.test.js"     # Tylko testy
glob: "*.config.{js,json}"   # Pliki konfiguracyjne
glob: "!**/node_modules/**"  # Wykluczenie
```

## Zadanie praktyczne

### Przygotowanie

```
Ty: Stwórz projekt testowy z kilkoma plikami JavaScript zawierającymi funkcje, klasy i importy
```

### Zadanie 1: Podstawowe wyszukiwanie

```
Ty: Znajdź wszystkie wystąpienia słowa "function"
```

### Zadanie 2: Case insensitive

```
Ty: Znajdź "error" ignorując wielkość liter
```

### Zadanie 3: W określonych plikach

```
Ty: Znajdź "import" tylko w plikach .jsx
```

### Zadanie 4: Z kontekstem

```
Ty: Znajdź "export" i pokaż 2 linie kontekstu
```

### Zadanie 5: Regex

```
Ty: Znajdź wszystkie funkcje async używając wyrażenia regularnego
```

### Zadanie 6: Zliczanie

```
Ty: Policz, ile razy występuje słowo "const" w każdym pliku
```

## Best Practices

### 1. Bądź specyficzny

❌ `Znajdź "user"`
✅ `Znajdź definicję klasy User`
✅ `Znajdź funkcje zawierające "user" w nazwie`

### 2. Używaj typów plików

```
Znajdź "API_KEY" tylko w plikach .env i .config.js
```

### 3. Kontekst dla zrozumienia

```
Znajdź validateEmail i pokaż 5 linii kontekstu, żeby zobaczyć, jak jest używana
```

### 4. Łącz z innymi narzędziami

```
Ty: Znajdź wszystkie pliki testowe z TODO, a następnie pokaż mi pierwszy z nich
```

Claude Code:
1. Grep: TODO w *.test.js
2. Read: Pierwszy znaleziony plik

## Częste zastosowania

### 1. Znajdowanie definicji

```
Gdzie zdefiniowana jest klasa UserController?
Znajdź definicję funkcji processPayment
```

### 2. Znajdowanie użyć

```
Pokaż wszystkie miejsca używające API_ENDPOINT
Gdzie jest importowany komponent Button?
```

### 3. Code review

```
Znajdź wszystkie console.log (do usunięcia przed produkcją)
Znajdź wszystkie TODO komentarze
Znajdź funcje bez dokumentacji JSDoc
```

### 4. Analiza zależności

```
Jakie komponenty importują React?
Które pliki używają biblioteki axios?
```

### 5. Refaktoring

```
Znajdź wszystkie wystąpienia starej nazwy funkcji
Gdzie używana jest deprecated metoda?
```

## Zaawansowane techniki

### 1. Multiline search

Dla wzorców rozciągających się na wiele linii:

```
Pattern: interface\s+User\s*\{[^}]+\}
multiline: true
```

### 2. Negatywne wyszukiwanie

```
Znajdź pliki .js, które NIE zawierają "use strict"
```

### 3. Kombinowanie warunków

```
Znajdź funkcje o nazwie "handle*" które zawierają "async"
```

## Limity i optymalizacja

### head_limit

Ogranicz wyniki dla szybszego przetwarzania:

```
Pattern: import
head_limit: 20  # Pokaż tylko 20 pierwszych
```

### Wykluczanie katalogów

```
Nie szukaj w node_modules ani dist
```

Grep automatycznie pomija `.gitignore`.

## Jak Claude Code może Ci pomóc?

```
Jak napisać regex do znajdowania adresów email?
Jak wyszukać funkcje async w projekcie?
Znajdź przykłady użycia Grep z kontekstem
```

## Dodatkowe materiały

### Dokumentacja
- [Grep Tool Reference](https://docs.claude.com/en/docs/claude-code/tools/grep)
- [ripgrep Guide](https://github.com/BurntSushi/ripgrep/blob/master/GUIDE.md)

### Regex Resources
- [Regex101](https://regex101.com/) - Testuj wyrażenia regularne
- [RegexLearn](https://regexlearn.com/) - Interaktywny tutorial

### Video
- [Advanced Code Search](https://www.youtube.com/results?search_query=ripgrep+tutorial)

## Podsumowanie

Nauczyłeś się:
- Jak używać Grep do wyszukiwania w kodzie
- Różne tryby wyszukiwania i kiedy ich używać
- Jak pisać wzorce regex dla typowych zadań
- Jak filtrować wyniki według typu i lokalizacji
- Best practices dla efektywnego wyszukiwania

W następnej lekcji szczegółowo poznasz narzędzia Read i Write!

---

**Ilustracje:** (do dodania)
- Cheat sheet: Grep patterns
- Infografika: Grep modes comparison
- Screenshot przykładowych wyników
