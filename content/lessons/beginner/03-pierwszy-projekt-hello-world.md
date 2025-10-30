---
title: "Pierwszy projekt - Hello World"
description: "Stwórz swój pierwszy projekt z pomocą Claude Code - prosty program Hello World"
duration: 15
difficulty: beginner
tags: [projekt, hello-world, praktyka, podstawy]
---

# Pierwszy projekt - "Hello World"

## Wprowadzenie

Najlepszym sposobem nauki jest praktyka! W tej lekcji stworzymy razem pierwszy prawdziwy projekt z pomocą Claude Code. Będzie to klasyczny program "Hello World", ale nie tylko go napiszemy - zobaczymy też, jak Claude Code może pomóc w strukturyzacji projektu, pisaniu testów i dokumentacji.

## Dlaczego to ważne?

Pierwsze praktyczne doświadczenie z narzędziem jest kluczowe dla zrozumienia, jak z niego korzystać. Ten projekt, choć prosty, pokaże Ci fundamentalne możliwości Claude Code:
- Tworzenie struktury projektu
- Pisanie kodu
- Tworzenie testów
- Generowanie dokumentacji
- Praca z Git

## Kiedy stosować taki workflow?

✅ **Używaj tego podejścia, gdy:**
- Rozpoczynasz nowy projekt od zera
- Potrzebujesz szybko prototypować pomysł
- Chcesz, aby struktura projektu była spójna i profesjonalna
- Potrzebujesz pomocy w ustawieniu testów od początku

❌ **Nie jest idealne, gdy:**
- Dołączasz do istniejącego projektu (wymaga innego podejścia)
- Masz bardzo specyficzne wymagania strukturalne
- Projekt wymaga nietypowej konfiguracji

## Przykład praktyczny - Krok po kroku

### Krok 1: Przygotowanie środowiska

Najpierw utwórz katalog dla projektu i przejdź do niego:

```bash
mkdir hello-claude-world
cd hello-claude-world
```

### Krok 2: Uruchom Claude Code

```bash
claude-code
```

### Krok 3: Inicjalizacja projektu

W Claude Code wpisz:

```
Zainicjuj nowy projekt Node.js z następującymi elementami:
1. package.json z podstawowymi informacjami
2. .gitignore dla Node.js
3. README.md z opisem projektu
4. Katalog src/ dla kodu źródłowego
5. Katalog tests/ dla testów
```

**Claude Code automatycznie:**
- Utworzy plik `package.json`
- Doda odpowiedni `.gitignore`
- Wygeneruje `README.md` z podstawowym opisem
- Utworzy strukturę katalogów

**Przykładowa struktura, którą otrzymasz:**
```
hello-claude-world/
├── src/
├── tests/
├── .gitignore
├── package.json
└── README.md
```

### Krok 4: Napisz główną funkcjonalność

Teraz poproś Claude Code:

```
W katalogu src/ utwórz plik index.js z funkcją greet(name), która:
1. Przyjmuje imię jako parametr
2. Zwraca string "Hello, {name}! Welcome to Claude Code."
3. Obsługuje przypadek, gdy name jest puste (zwróć "Hello, World!")
```

**Claude Code utworzy:**

**src/index.js:**
```javascript
/**
 * Greets a person by name
 * @param {string} name - The name of the person to greet
 * @returns {string} A greeting message
 */
function greet(name) {
  if (!name || name.trim() === '') {
    return 'Hello, World!';
  }
  return `Hello, ${name}! Welcome to Claude Code.`;
}

module.exports = { greet };
```

### Krok 5: Dodaj testy

Poproś Claude Code:

```
Utwórz testy dla funkcji greet używając Jest. Przetestuj:
1. Zwykłe wywołanie z imieniem
2. Wywołanie z pustym stringiem
3. Wywołanie z null
4. Wywołanie z samymi spacjami
```

**Claude Code:**
1. Doda Jest do `package.json`
2. Skonfiguruje skrypt testowy
3. Utworzy plik testowy

**tests/greet.test.js:**
```javascript
const { greet } = require('../src/index');

describe('greet function', () => {
  test('should greet person by name', () => {
    expect(greet('Alice')).toBe('Hello, Alice! Welcome to Claude Code.');
  });

  test('should return default greeting for empty string', () => {
    expect(greet('')).toBe('Hello, World!');
  });

  test('should return default greeting for null', () => {
    expect(greet(null)).toBe('Hello, World!');
  });

  test('should return default greeting for whitespace', () => {
    expect(greet('   ')).toBe('Hello, World!');
  });
});
```

### Krok 6: Uruchom testy

Poproś Claude Code:

```
Zainstaluj zależności i uruchom testy
```

Claude Code wykona:
```bash
npm install
npm test
```

**Oczekiwane wyjście:**
```
PASS  tests/greet.test.js
  greet function
    ✓ should greet person by name (2 ms)
    ✓ should return default greeting for empty string (1 ms)
    ✓ should return default greeting for null
    ✓ should return default greeting for whitespace (1 ms)

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
```

### Krok 7: Dodaj skrypt uruchamiający

Poproś Claude Code:

```
Dodaj skrypt CLI, który pozwoli uruchomić program z linii komend:
node src/cli.js "Twoje Imię"
```

**Claude Code utworzy:**

**src/cli.js:**
```javascript
#!/usr/bin/env node

const { greet } = require('./index');

// Pobierz argument z linii komend (pomijając node i nazwę pliku)
const name = process.argv[2];

// Wyświetl powitanie
console.log(greet(name));
```

I zaktualizuje `package.json`:
```json
{
  "name": "hello-claude-world",
  "version": "1.0.0",
  "bin": {
    "hello": "./src/cli.js"
  }
}
```

### Krok 8: Testuj CLI

```bash
# Bezpośrednie uruchomienie
node src/cli.js Alice
# Output: Hello, Alice! Welcome to Claude Code.

node src/cli.js
# Output: Hello, World!

# Lub zainstaluj globalnie i używaj jako komendy
npm link
hello Alice
# Output: Hello, Alice! Welcome to Claude Code.
```

### Krok 9: Inicjalizacja Git i pierwszy commit

Poproś Claude Code:

```
Zainicjuj repozytorium Git i stwórz pierwszy commit z obecną strukturą projektu
```

Claude Code wykona:
```bash
git init
git add .
git commit -m "Initial commit: Hello World project with tests"
```

## Zadanie praktyczne

**Cel:** Rozszerz projekt o nowe funkcjonalności

### Zadanie 1: Dodaj personalizację

Rozszerz funkcję `greet`, aby przyjmowała opcjonalny drugi parametr `language` i potrafiła powitać w różnych językach:
- `greet('Alice', 'pl')` → "Cześć, Alice! Witaj w Claude Code."
- `greet('Alice', 'es')` → "¡Hola, Alice! Bienvenido a Claude Code."
- `greet('Alice', 'en')` lub bez języka → "Hello, Alice! Welcome to Claude Code."

**Kroki:**
1. Poproś Claude Code o modyfikację funkcji `greet`
2. Poproś o aktualizację testów
3. Uruchom testy i upewnij się, że przechodzą
4. Zaktualizuj CLI, aby przyjmował parametr języka

### Zadanie 2: Dodaj dokumentację

1. Poproś Claude Code o wygenerowanie dokumentacji API używając JSDoc
2. Zainstaluj i skonfiguruj narzędzie do generowania HTML z JSDoc
3. Wygeneruj dokumentację HTML
4. Dodaj skrypt do `package.json`: `"docs": "jsdoc src/ -d docs/"`

### Zadanie 3: Dodaj więcej testów

Napisz testy dla nowej funkcjonalności językowej:
1. Test dla języka polskiego
2. Test dla języka hiszpańskiego
3. Test dla nieobsługiwanego języka (powinien defaultować do angielskiego)

**Wskazówka:** W każdym kroku po prostu opisz Claude Code, co chcesz osiągnąć. Nie musisz pisać kodu samodzielnie!

## Co właśnie osiągnąłeś?

🎉 Gratulacje! Właśnie stworzyłeś pełnoprawny projekt z:
- ✅ Strukturą katalogów
- ✅ Działającym kodem
- ✅ Testami jednostkowymi
- ✅ Interfejsem CLI
- ✅ Dokumentacją
- ✅ Kontrolą wersji (Git)

I wszystko to z pomocą naturalnej konwersacji z Claude Code!

## Kluczowe wnioski

### 1. Claude Code rozumie kontekst
Nie musiałeś za każdym razem wyjaśniać struktury projektu - Claude Code pamiętał, co zostało już stworzone.

### 2. Iteracyjny workflow
Mogłeś budować projekt krok po kroku, dodając nowe funkcjonalności i poprawki w naturalny sposób.

### 3. Automatyzacja rutynowych zadań
Tworzenie testów, konfiguracja narzędzi, pisanie boilerplate - wszystko to Claude Code może zrobić za Ciebie.

### 4. Best practices out of the box
Claude Code domyślnie stosuje dobre praktyki (JSDoc, testy, .gitignore, itp.)

## Jak Claude Code może Ci pomóc?

Podczas pracy nad projektami możesz pytać Claude Code:
- "Jak zorganizować strukturę projektu dla aplikacji React?"
- "Dodaj testy integracyjne dla tego modułu"
- "Zrefaktoryzuj ten kod, aby był bardziej czytelny"
- "Wygeneruj dokumentację dla wszystkich funkcji publicznych"

## Dodatkowe materiały

### Oficjalna dokumentacja
- [Quick Start Guide](https://docs.claude.com/en/docs/claude-code/quickstart)
- [Project Structure Best Practices](https://docs.claude.com/en/docs/claude-code/project-structure)
- [Testing with Claude Code](https://docs.claude.com/en/docs/claude-code/testing)

### Video tutoriale
- [Building Your First Project with Claude Code](https://www.youtube.com/results?search_query=claude+code+first+project)
- [Claude Code Project Setup Tutorial](https://www.youtube.com/results?search_query=claude+code+project+setup)

### Przykładowe projekty
- [GitHub - Claude Code Examples](https://github.com/search?q=claude-code+examples)
- [Awesome Claude Code Projects](https://github.com/topics/claude-code)

### Artykuły
- [From Zero to Hero: Building Apps with Claude Code](https://www.anthropic.com/news)
- [Best Practices for Project Structure](https://www.anthropic.com/news)

## Podsumowanie

W tej lekcji nauczyłeś się:
- Jak rozpocząć nowy projekt z Claude Code od zera
- Jak iteracyjnie budować funkcjonalności
- Jak Claude Code automatyzuje tworzenie testów i dokumentacji
- Jak używać naturalnego języka do programowania
- Jak Claude Code pomaga w utrzymaniu dobrych praktyk

W następnej lekcji poznasz interfejs CLI Claude Code i podstawowe komendy, które przyspieszą Twoją pracę!

---

**Ilustracje:** (do dodania)
- Screenshot struktury projektu
- Screenshot działającego CLI
- Screenshot wyników testów
- Diagram workflow tworzenia projektu
