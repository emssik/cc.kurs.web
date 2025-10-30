---
title: "Czytanie i edycja plików"
description: "Naucz się, jak Claude Code czyta i edytuje pliki w Twoim projekcie"
duration: 15
difficulty: beginner
tags: [pliki, read, edit, podstawy]
---

# Czytanie i edycja plików

## Wprowadzenie

Jedną z najważniejszych funkcji Claude Code jest możliwość bezpośredniego czytania i edytowania plików w Twoim projekcie. W tej lekcji nauczysz się, jak Claude Code pracuje z plikami, jakie ma narzędzia i jak je efektywnie wykorzystać.

## Dlaczego to ważne?

Możliwość bezpośredniej edycji plików przez AI to przełom w programowaniu:
- **Oszczędność czasu:** Nie musisz kopiować i wklejać kodu
- **Kontekst:** Claude Code widzi cały plik, nie tylko fragment
- **Atomowe zmiany:** Edycje są precyzyjne i bezpieczne
- **Historia:** Wszystkie zmiany są śledzone (przez Git)

## Podstawowe narzędzia do pracy z plikami

Claude Code ma dostęp do trzech kluczowych narzędzi:

### 1. Read - Czytanie plików

Służy do odczytu zawartości plików.

**Kiedy używane:**
- Gdy Claude Code potrzebuje zobaczyć kod
- Przed dokonaniem edycji
- Przy analizie projektu
- Do zrozumienia kontekstu

**Przykład:**
```
Ty: Przeczytaj plik src/utils.js
```

Claude Code automatycznie użyje narzędzia Read i pokaże Ci zawartość.

### 2. Edit - Edycja plików

Służy do precyzyjnej edycji istniejących plików.

**Jak działa:**
- Znajduje dokładny ciąg znaków (old_string)
- Zastępuje go nowym (new_string)
- Wymaga dokładnego dopasowania

**Przykład:**
```
Ty: W pliku utils.js zmień funkcję add, aby obsługiwała więcej niż 2 argumenty
```

Claude Code:
1. Przeczyta plik (Read)
2. Znajdzie funkcję add
3. Użyje Edit do zastąpienia jej nową wersją

### 3. Write - Tworzenie nowych plików

Służy do tworzenia nowych plików lub nadpisywania całego istniejącego pliku.

**Uwaga:** Claude Code zawsze preferuje Edit nad Write dla istniejących plików!

## Praktyczny przepływ pracy

### Scenariusz 1: Prosta edycja funkcji

**Cel:** Zmień funkcję `calculateTotal` w pliku `cart.js`

```
Ty: W pliku src/cart.js zmień funkcję calculateTotal, aby dodawała 10% podatku do sumy
```

**Co się dzieje w tle:**

1. **Claude Code używa Read:**
   ```javascript
   // Odczytuje src/cart.js
   function calculateTotal(items) {
     return items.reduce((sum, item) => sum + item.price, 0);
   }
   ```

2. **Claude Code analizuje kod:**
   - Rozumie logikę funkcji
   - Planuje zmianę

3. **Claude Code używa Edit:**
   ```javascript
   // old_string:
   function calculateTotal(items) {
     return items.reduce((sum, item) => sum + item.price, 0);
   }

   // new_string:
   function calculateTotal(items) {
     const subtotal = items.reduce((sum, item) => sum + item.price, 0);
     const tax = subtotal * 0.10;
     return subtotal + tax;
   }
   ```

4. **Claude Code potwierdza:**
   ```
   ✓ Zaktualizowałem funkcję calculateTotal w src/cart.js
   Dodałem obliczanie 10% podatku do sumy.
   ```

### Scenariusz 2: Edycja w wielu miejscach

**Cel:** Zmień nazwę zmiennej w całym pliku

```
Ty: W pliku user.js zmień wszystkie wystąpienia zmiennej userName na username
```

**Claude Code:**
1. Przeczyta plik
2. Użyje Edit z flagą `replace_all: true`
3. Zamieni wszystkie wystąpienia naraz

### Scenariusz 3: Dodanie nowej funkcji

**Cel:** Dodaj nową funkcję na końcu pliku

```
Ty: Dodaj funkcję validateEmail do pliku validators.js
```

**Claude Code:**
1. Przeczyta validators.js
2. Znajdzie odpowiednie miejsce (zazwyczaj koniec pliku)
3. Użyje Edit, aby dodać nową funkcję

```javascript
// old_string (ostatnia linia pliku):
module.exports = { validatePassword };

// new_string:
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

module.exports = { validatePassword, validateEmail };
```

## Kiedy używać poszczególnych narzędzi?

### Read

✅ **Używaj, gdy:**
- Chcesz zobaczyć zawartość pliku
- Potrzebujesz zrozumieć kod przed edycją
- Analizujesz projekt
- Szukasz konkretnego fragmentu kodu

❌ **Nie używaj, gdy:**
- Chcesz od razu edytować (Claude Code przeczyta automatycznie)
- Plik jest bardzo duży (użyj Grep do wyszukania)

### Edit

✅ **Używaj, gdy:**
- Modyfikujesz istniejący kod
- Zmieniasz nazwę zmiennej/funkcji
- Refaktoryujesz
- Dodajesz nową funkcjonalność do istniejącego pliku

❌ **Nie używaj, gdy:**
- Tworzysz nowy plik (użyj Write)
- Chcesz całkowicie przepisać plik (użyj Write)

### Write

✅ **Używaj, gdy:**
- Tworzysz nowy plik od zera
- Chcesz całkowicie nadpisać istniejący plik
- Generujesz pliki konfiguracyjne

❌ **Nie używaj, gdy:**
- Modyfikujesz tylko część pliku (użyj Edit)

## Zadanie praktyczne

**Cel:** Przećwicz czytanie i edycję plików w praktycznym scenariuszu

### Przygotowanie

Stwórz testowy plik:

```
Ty: Stwórz plik test-edit.js z następującą zawartością:

function greet(name) {
  console.log("Hello " + name);
}

function add(a, b) {
  return a + b;
}

module.exports = { greet, add };
```

### Zadanie 1: Prosta edycja

```
Ty: Zmień funkcję greet, aby używała template literals zamiast konkatenacji
```

**Oczekiwany rezultat:**
```javascript
function greet(name) {
  console.log(`Hello ${name}`);
}
```

**Sprawdź:**
```
Ty: Pokaż zawartość test-edit.js
```

### Zadanie 2: Dodanie nowej funkcji

```
Ty: Dodaj funkcję subtract(a, b) po funkcji add
```

**Oczekiwany rezultat:**
```javascript
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}
```

### Zadanie 3: Aktualizacja eksportu

```
Ty: Zaktualizuj module.exports, aby eksportował także subtract
```

**Oczekiwany rezultat:**
```javascript
module.exports = { greet, add, subtract };
```

### Zadanie 4: Zmiana nazwy zmiennej

```
Ty: Zmień parametr 'name' na 'userName' w funkcji greet
```

**Oczekiwany rezultat:**
```javascript
function greet(userName) {
  console.log(`Hello ${userName}`);
}
```

### Zadanie 5: Weryfikacja

```
Ty: Przeczytaj cały plik test-edit.js i pokaż mi końcową wersję
```

**Powinien wyglądać tak:**
```javascript
function greet(userName) {
  console.log(`Hello ${userName}`);
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = { greet, add, subtract };
```

## Częste problemy i rozwiązania

### Problem 1: "old_string not found"

**Co to znaczy:**
Edit nie znalazł dokładnego ciągu znaków do zastąpienia.

**Przyczyny:**
- Różnice w białych znakach (spacje vs tabulatory)
- Plik został zmieniony od ostatniego odczytu
- String występuje wielokrotnie

**Rozwiązanie:**
```
Ty: Przeczytaj plik ponownie i spróbuj jeszcze raz
```

Claude Code ponownie przeczyta plik i użyje dokładnego ciągu znaków.

### Problem 2: Edycja w złym miejscu

**Co się stało:**
Claude Code edytował inną część pliku niż zamierzałeś.

**Przyczyna:**
Nieprecyzyjna instrukcja.

**Rozwiązanie:**
Bądź bardziej konkretny:

❌ "Zmień funkcję"
✅ "Zmień funkcję calculateTotal w linii 45"
✅ "Zmień pierwszą funkcję o nazwie helper"

### Problem 3: Zmiany są za duże

**Co się stało:**
Claude Code zmienił więcej niż chciałeś.

**Rozwiązanie:**
Podziel na mniejsze kroki:

❌ "Zrefaktoryzuj cały plik"
✅ "Najpierw zmień funkcję A, potem przejdziemy do B"

## Zaawansowane techniki

### 1. Edycja z kontekstem

Podaj więcej kontekstu dla precyzyjniejszych edycji:

```
Ty: W pliku src/api/users.js zmień metodę POST w kontrolerze UserController, aby walidowała email przed zapisem
```

### 2. Edycje warunkowe

```
Ty: Jeśli funkcja validateInput istnieje w utils.js, dodaj do niej obsługę email. Jeśli nie istnieje, stwórz ją.
```

### 3. Edycje z weryfikacją

```
Ty: Zmień funkcję parseDate w utils.js, aby obsługiwała format ISO. Po zmianie uruchom testy, aby sprawdzić, czy nic się nie zepsuło.
```

### 4. Pokazywanie zmian przed zastosowaniem (Plan Mode)

```
Ty: Zaplanuj, jakie zmiany trzeba wprowadzić w user.js, ale jeszcze ich nie wykonuj
```

Claude Code pokaże plan, a Ty zatwierdzisz lub poprawisz.

## Best practices

### 1. Zawsze weryfikuj zmiany

Po edycji sprawdź, czy wszystko jest w porządku:

```
Ty: Pokaż mi zmieniony fragment kodu
# lub
Ty: Przeczytaj zaktualizowany plik
```

### 2. Rób małe, atomowe zmiany

❌ "Zrefaktoryzuj cały moduł"
✅ "Zmień funkcję X, potem Y, potem Z"

### 3. Używaj Git

Przed dużymi zmianami:

```
Ty: Stwórz nowy branch git i commitnij obecny stan przed zmianami
```

### 4. Testuj po zmianach

```
Ty: Po każdej zmianie uruchom testy
```

### 5. Bądź konkretny

Im bardziej precyzyjne instrukcje, tym lepszy rezultat:

❌ "Popraw ten kod"
✅ "Zmień pętlę for na forEach w funkcji processItems"

## Jak Claude Code może Ci pomóc?

Możesz pytać:
- "Jak działa narzędzie Edit?"
- "Dlaczego moja edycja się nie powiodła?"
- "Pokaż mi różne sposoby edycji pliku"
- "Jak mogę cofnąć ostatnią edycję?"

## Dodatkowe materiały

### Oficjalna dokumentacja
- [Read Tool Reference](https://docs.claude.com/en/docs/claude-code/tools/read)
- [Edit Tool Reference](https://docs.claude.com/en/docs/claude-code/tools/edit)
- [Write Tool Reference](https://docs.claude.com/en/docs/claude-code/tools/write)
- [File Operations Best Practices](https://docs.claude.com/en/docs/claude-code/best-practices/files)

### Video tutoriale
- [File Editing with Claude Code](https://www.youtube.com/results?search_query=claude+code+file+editing)
- [Read, Edit, Write Explained](https://www.youtube.com/results?search_query=claude+code+read+edit+write)

### Artykuły
- [Mastering File Operations in Claude Code](https://www.anthropic.com/news)
- [Common File Editing Mistakes and How to Avoid Them](https://www.anthropic.com/news)

### Społeczność
- [GitHub Discussions - File Operations](https://github.com/anthropics/claude-code/discussions)
- [Discord - #file-operations](https://discord.gg/anthropic)

## Podsumowanie

W tej lekcji nauczyłeś się:
- Jakie narzędzia Claude Code używa do pracy z plikami (Read, Edit, Write)
- Jak działa proces czytania i edycji plików
- Kiedy używać poszczególnych narzędzi
- Jak rozwiązywać typowe problemy z edycją
- Jakie są best practices dla pracy z plikami

W następnej lekcji nauczysz się, jak Claude Code tworzy nowe pliki i organizuje strukturę projektu!

---

**Ilustracje:** (do dodania)
- Diagram flow Read → Edit → Verify
- Screenshot przykładowej edycji z before/after
- Infografika narzędzi (Read, Edit, Write)
- Flowchart rozwiązywania problemów z edycją
