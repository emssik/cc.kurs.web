---
title: "Glob Tool"
description: "Opanuj Glob do szybkiego znajdowania plików według wzorców"
duration: 12
difficulty: beginner
tags: [glob, pliki, wzorce, wyszukiwanie]
---

# Glob Tool

## Wprowadzenie

Glob to narzędzie do wyszukiwania plików po nazwach i wzorcach. Podczas gdy Grep szuka w zawartości, Glob szuka samych plików. To Twój kompas w nawigacji po strukturze projektu.

## Podstawy

### Składnia

```javascript
Glob(pattern, path?)
```

- **pattern:** Wzorzec plików (wymagany)
- **path:** Katalog do przeszukania (opcjonalny, domyślnie CWD)

### Wildcards

```
*        Dowolny ciąg znaków (nie obejmuje /)
**       Dowolny ciąg znaków (obejmuje /)
?        Jeden dowolny znak
[abc]    a, b, lub c
{js,ts}  js lub ts
```

## Praktyczne przykłady

### Przykład 1: Wszystkie pliki typu

```
Ty: Znajdź wszystkie pliki JavaScript
```

Claude Code:
```
Pattern: **/*.js
```

### Przykład 2: W konkretnym katalogu

```
Ty: Pokaż wszystkie komponenty React
```

Claude Code:
```
Pattern: src/components/**/*.{jsx,tsx}
```

### Przykład 3: Pliki konfiguracyjne

```
Ty: Znajdź pliki konfiguracyjne
```

Claude Code:
```
Pattern: *.config.{js,json}, **/*rc, **/*rc.json
```

### Przykład 4: Testy

```
Ty: Pokaż wszystkie pliki testowe
```

Claude Code:
```
Pattern: **/*.{test,spec}.{js,jsx,ts,tsx}
```

## Wzorce dla różnych typów projektów

### React

```bash
src/components/**/*.jsx        # Komponenty
src/**/*.module.css            # CSS Modules
src/**/*.stories.jsx           # Storybook stories
public/**/*.{png,jpg,svg}      # Assets
```

### Node.js API

```bash
src/controllers/**/*.js        # Kontrolery
src/models/**/*.js             # Modele
src/routes/**/*.js             # Routes
src/middleware/**/*.js         # Middleware
```

### Python

```bash
**/*.py                        # Wszystkie pliki Python
**/test_*.py                   # Testy pytest
**/__init__.py                 # Package indicators
```

### Dokumentacja

```bash
**/*.md                        # Wszystkie Markdown
docs/**/*.md                   # Tylko docs
**/README.md                   # Wszystkie README
```

## Przykłady zaawansowane

### Wykluczanie

```bash
**/*.js
!**/node_modules/**
!**/dist/**
```

**Uwaga:** Glob automatycznie respektuje .gitignore!

### Wiele rozszerzeń

```bash
**/*.{js,jsx,ts,tsx,vue}      # Wszystkie JS frameworks
**/*.{css,scss,sass,less}     # Wszystkie style
**/*.{jpg,jpeg,png,gif,svg}   # Wszystkie obrazy
```

### Głębokość

```bash
*                             # Tylko w bieżącym katalogu
*/*                           # Jeden poziom w głąb
**/*                          # Wszystkie poziomy
src/*/*                       # Dokładnie 2 poziomy w src/
```

## Praktyczne zastosowania

### 1. Inwentaryzacja projektu

```
Ty: Policz, ile jest plików każdego typu w projekcie
```

Claude Code użyje Glob dla każdego typu i policzy.

### 2. Znajdowanie plików bez testów

```
Ty: Znajdź komponenty, które nie mają plików .test
```

Claude Code:
1. Glob: Wszystkie .jsx
2. Dla każdego sprawdza, czy istnieje .test.jsx
3. Listuje te bez testów

### 3. Struktura projektu

```
Ty: Pokaż strukturę katalogów src/
```

Claude Code użyje Glob z różnymi wzorcami.

### 4. Analiza rozmiaru

```
Ty: Które katalogi mają najwięcej plików JS?
```

### 5. Migracje

```
Ty: Znajdź wszystkie pliki .js i zamień je na .ts (pokaż plan)
```

## Zadanie praktyczne

### Przygotowanie

```
Ty: Stwórz przykładową strukturę projektu React z komponentami, testami, stylami i dokumentacją
```

### Zadanie 1: Podstawowe

```
Ty: Znajdź wszystkie pliki .jsx
```

### Zadanie 2: Z wieloma rozszerzeniami

```
Ty: Znajdź wszystkie pliki stylów (css, scss, sass)
```

### Zadanie 3: Konkretny katalog

```
Ty: Pokaż tylko pliki w src/components (nie w podkatalogach)
```

### Zadanie 4: Głębokie zagnieżdżenie

```
Ty: Znajdź wszystkie index.js na dowolnym poziomie
```

### Zadanie 5: Analiza

```
Ty: Znajdź wszystkie komponenty i sprawdź, które nie mają odpowiadających testów
```

### Zadanie 6: Konfiguracje

```
Ty: Pokaż wszystkie pliki konfiguracyjne w projekcie
```

## Glob vs Grep

| | Glob | Grep |
|---|---|---|
| **Szuka** | Nazw plików | Zawartości plików |
| **Wynik** | Lista plików | Linie kodu |
| **Wzorce** | Wildcards | Regex |
| **Szybkość** | Bardzo szybki | Szybki |
| **Użycie** | "Gdzie jest plik X?" | "Gdzie użyto Y?" |

### Kiedy który?

**Użyj Glob:**
```
Znajdź wszystkie komponenty Button
Pokaż pliki testowe
Lista wszystkich plików config
```

**Użyj Grep:**
```
Gdzie używany jest Button?
Znajdź TODO komentarze
Które pliki importują React?
```

**Użyj obydwa:**
```
Ty: Znajdź wszystkie pliki .jsx (Glob), a następnie sprawdź, które importują useState (Grep w znalezionych plikach)
```

## Best Practices

### 1. Specyficzne wzorce

❌ `**/*`
✅ `src/**/*.jsx`

### 2. Używaj typów rozszerzeń

```
**/*.{js,jsx} zamiast **/*.js + **/*.jsx
```

### 3. Zwróć uwagę na .gitignore

Glob automatycznie pomija pliki w .gitignore.

### 4. Testuj wzorce

```
Ty: Pokaż, co znajdzie wzorzec "src/**/*.test.js"
```

### 5. Kombinuj z innymi narzędziami

```
Ty: Znajdź pliki (Glob) → Przeczytaj (Read) → Analizuj
```

## Zaawansowane wzorce

### Negacja (wykluczanie)

```bash
**/*.js         # Wszystkie .js
!**/*.min.js    # Ale nie minified
```

### Character classes

```bash
[0-9]*.js       # Pliki zaczynające się od cyfry
[A-Z]*.jsx      # Pliki zaczynające się od wielkiej litery
```

### Brace expansion

```bash
src/{components,pages,layouts}/**/*.jsx
```

Znajduje .jsx w components/, pages/ i layouts/

## Częste problemy

### "No files found"

Sprawdź:
1. Czy wzorzec jest poprawny?
2. Czy pliki istnieją?
3. Czy nie są w .gitignore?

```
Ty: Sprawdź, czy istnieją pliki .jsx w projekcie
```

### Za dużo wyników

Zawęź wzorzec:
```
❌ **/*.js
✅ src/components/**/*.js
```

### Nie znajduje plików w podkatalogach

```
❌ src/*.js        # Tylko w src/
✅ src/**/*.js      # W src/ i podkatalogach
```

## Glob w workflow

### 1. Rozpoczęcie pracy

```
Ty: Pokaż strukturę projektu - wszystkie główne katalogi i typy plików
```

### 2. Analiza przed zmianami

```
Ty: Jakie pliki będę musiał zmodyfikować, żeby zmienić X na Y?
```

### 3. Code review

```
Ty: Pokaż wszystkie nowe pliki dodane w ostatnim commicie
```

### 4. Refactoring

```
Ty: Znajdź wszystkie pliki używające starej konwencji nazewnictwa
```

## Integracja z innymi narzędziami

### Glob + Read

```
Ty: Znajdź wszystkie modele i pokaż mi ich strukturę
```

### Glob + Grep

```
Ty: Znajdź wszystkie komponenty (Glob), które używają useState (Grep)
```

### Glob + Edit

```
Ty: Znajdź wszystkie pliki .js i dodaj 'use strict' na początku
```

### Glob + Bash

```
Ty: Znajdź wszystkie testy i uruchom je
```

## Jak Claude Code może Ci pomóc?

```
Jak napisać wzorzec dla plików w konkretnym katalogu?
Wyjaśnij różnicę między * a **
Jak wykluczyć katalog z wyszukiwania?
Pokaż przykłady wzorców dla projektu React
```

## Dodatkowe materiały

### Dokumentacja
- [Glob Tool Reference](https://docs.claude.com/en/docs/claude-code/tools/glob)
- [Fast-glob Pattern Syntax](https://github.com/mrmlnc/fast-glob#pattern-syntax)

### Narzędzia online
- [Globster - Test Glob Patterns](https://globster.xyz/)
- [Glob Pattern Tester](https://www.digitalocean.com/community/tools/glob)

## Podsumowanie

Nauczyłeś się:
- Jak używać Glob do znajdowania plików
- Składni wildcards i wzorców
- Różnic między Glob a Grep
- Praktycznych wzorców dla różnych projektów
- Best practices i zaawansowanych technik

W następnej lekcji poznasz Multi-Edit - potężne narzędzie do edycji wielu plików naraz!

---

**Ilustracje:** (do dodania)
- Cheat sheet: Glob wildcards
- Infografika: Glob vs Grep
- Diagram przykładowych wzorców
