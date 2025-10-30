---
title: "Interface CLI - podstawowe komendy"
description: "Poznaj interfejs wiersza poleceń Claude Code i najważniejsze komendy"
duration: 12
difficulty: beginner
tags: [CLI, komendy, interface, nawigacja]
---

# Interface CLI - podstawowe komendy

## Wprowadzenie

Claude Code działa w terminalu, ale oferuje znacznie więcej niż zwykła linia komend. Ma bogaty zestaw specjalnych komend i funkcji, które przyspieszają pracę. W tej lekcji poznasz interfejs CLI Claude Code, jego możliwości i najważniejsze komendy.

## Dlaczego to ważne?

Znajomość interfejsu i komend CLI to klucz do efektywnej pracy z Claude Code. Komendy pozwalają na:
- Szybsze wykonywanie typowych operacji
- Lepszą kontrolę nad sesją
- Dostęp do zaawansowanych funkcji
- Efektywniejszą nawigację i organizację pracy

## Anatomia interfejsu Claude Code

### Ekran powitalny

Po uruchomieniu `claude-code` zobaczysz:

```
╔════════════════════════════════════════════╗
║         Welcome to Claude Code!            ║
║                                            ║
║  Type /help for available commands         ║
║  Type your question or task to begin       ║
╚════════════════════════════════════════════╝

Working directory: /Users/daniel/project
Model: claude-sonnet-4
Session ID: abc123xyz

>
```

**Elementy interfejsu:**
- **Banner powitalny:** Informacje o wersji i dostępnych komendach
- **Working directory:** Aktualny katalog roboczy
- **Model:** Używany model AI
- **Session ID:** Unikalny identyfikator sesji (przydatny przy raportowaniu błędów)
- **Prompt (>):** Miejsce, gdzie wpisujesz polecenia i pytania

### Rodzaje wejścia

Claude Code rozpoznaje trzy typy wejścia:

1. **Komendy systemowe** (zaczynają się od `/`):
   ```
   /help
   /clear
   /exit
   ```

2. **Naturalne pytania i polecenia**:
   ```
   Stwórz plik hello.js z funkcją hello world
   Jakie pliki są w tym projekcie?
   Wytłumacz, co robi funkcja calculateTotal
   ```

3. **Wieloliniowe wejście** (zakończone Ctrl+D lub Enter dwukrotnie):
   ```
   Zrefaktoryzuj następujący kod:
   function foo() {
     // długi kod...
   }
   ```

## Podstawowe komendy systemowe

### `/help` - System pomocy

Wyświetla listę wszystkich dostępnych komend:

```
> /help
```

**Wyjście:**
```
Available commands:
  /help              Show this help message
  /clear             Clear the conversation history
  /exit              Exit Claude Code
  /history           Show conversation history
  /save [filename]   Save conversation to file
  /load [filename]   Load conversation from file
  /model [name]      Switch AI model
  /pwd               Show current working directory
  /cd [path]         Change working directory
  /ls [path]         List files in directory
  /tokens            Show token usage for current session
```

### `/clear` - Czyszczenie historii

Czyści historię konwersacji, ale NIE resetuje kontekstu projektu:

```
> /clear
Conversation history cleared.
```

**Kiedy używać:**
- Gdy chcesz rozpocząć nowy temat
- Gdy historia jest zbyt długa
- Gdy chcesz zaoszczędzić tokeny

**Uwaga:** Kontekst plików i projektu pozostaje!

### `/exit` - Wyjście z Claude Code

Bezpiecznie kończy sesję:

```
> /exit
Goodbye! 👋
```

**Skróty klawiszowe alternatywne:**
- `Ctrl+D` (Unix/Mac)
- `Ctrl+C` dwukrotnie

### `/history` - Historia konwersacji

Pokazuje historię interakcji w bieżącej sesji:

```
> /history
```

**Przykładowe wyjście:**
```
1. User: Stwórz plik test.js
   Claude: [Created test.js]

2. User: Dodaj funkcję hello
   Claude: [Modified test.js]

3. User: Uruchom testy
   Claude: [Ran: npm test]
```

### `/save` i `/load` - Zapis i odczyt sesji

Zapisz bieżącą konwersację do pliku:

```
> /save my-session.json
Session saved to my-session.json
```

Wczytaj wcześniejszą sesję:

```
> /load my-session.json
Session loaded from my-session.json
```

**Kiedy używać:**
- Chcesz kontynuować pracę później
- Chcesz podzielić się sesją z zespołem
- Chcesz archiwizować ważne konwersacje

### `/model` - Zmiana modelu AI

Przełącz między różnymi modelami Claude:

```
> /model claude-opus-4
Switched to model: claude-opus-4
```

**Dostępne modele:**
- `claude-sonnet-4` - Zalecany, balans jakości i szybkości
- `claude-opus-4` - Najlepszy, wolniejszy, droższy
- `claude-haiku-4` - Najszybszy, prostsze zadania

### `/pwd`, `/cd`, `/ls` - Nawigacja w systemie plików

Sprawdź bieżący katalog:
```
> /pwd
/Users/daniel/projects/myapp
```

Zmień katalog:
```
> /cd ../other-project
Changed directory to: /Users/daniel/projects/other-project
```

Wyświetl zawartość katalogu:
```
> /ls
src/
tests/
package.json
README.md
```

**Uwaga:** Te komendy zmieniają kontekst roboczych Claude Code, ale nie wpływają na Twój terminal!

### `/tokens` - Monitorowanie użycia tokenów

Sprawdź, ile tokenów zostało użytych:

```
> /tokens
```

**Wyjście:**
```
Token usage for current session:
  Input tokens:  12,450
  Output tokens: 8,320
  Total:         20,770
  Remaining:     179,230 (out of 200,000)
```

**Dlaczego to ważne:**
- Możesz śledzić koszty
- Widzisz, kiedy zbliżasz się do limitu
- Możesz optymalizować użycie (np. przez `/clear`)

## Kiedy używać poszczególnych komend?

### Codzienne użycie

✅ `/help` - Gdy zapomniałeś komendy
✅ `/pwd` - Gdy nie jesteś pewien kontekstu katalogowego
✅ `/tokens` - Na końcu sesji, aby sprawdzić użycie
✅ `/exit` - Na zakończenie pracy

### Długie sesje

✅ `/clear` - Co godzinę lub przy zmianie tematów
✅ `/save` - Przed przerwami w pracy
✅ `/history` - Gdy chcesz przypomnieć sobie, co było zrobione

### Zaawansowane

✅ `/model` - Gdy potrzebujesz lepszej jakości lub szybkości
✅ `/load` - Przy kontynuowaniu złożonych projektów
✅ `/cd` - Przy pracy z wieloma projektami równocześnie

## Zadanie praktyczne

**Cel:** Przećwicz używanie komend CLI w praktycznej sesji

### Zadanie 1: Podstawowa nawigacja

1. Uruchom Claude Code
2. Sprawdź bieżący katalog: `/pwd`
3. Wyświetl pliki w katalogu: `/ls`
4. Zmień katalog na nadrzędny: `/cd ..`
5. Wróć do oryginalnego katalogu

### Zadanie 2: Praca z sesją

1. Poproś Claude Code o stworzenie prostego pliku:
   ```
   Stwórz plik notes.txt z tekstem "Claude Code CLI notes"
   ```

2. Sprawdź historię: `/history`

3. Zapisz sesję: `/save cli-practice.json`

4. Wyczyść historię: `/clear`

5. Wczytaj sesję: `/load cli-practice.json`

6. Sprawdź, czy historia została przywrócona: `/history`

### Zadanie 3: Monitorowanie zasobów

1. Wykonaj kilka zapytań do Claude Code (np. poproś o wyjaśnienie 3 koncepcji)

2. Sprawdź użycie tokenów: `/tokens`

3. Wyczyść historię: `/clear`

4. Ponownie sprawdź tokeny: `/tokens`

5. Zauważ różnicę w liczbie tokenów

### Zadanie 4: Eksperyment z modelami (opcjonalnie)

**Uwaga:** Wymaga dostępu do różnych modeli (może wiązać się z kosztami)

1. Sprawdź obecny model w bannerze powitalnym

2. Zadaj pytanie: "Wyjaśnij rekurencję w programowaniu"

3. Zmień model na szybszy: `/model claude-haiku-4`

4. Zadaj to samo pytanie ponownie

5. Porównaj jakość i szybkość odpowiedzi

6. Wróć do modelu domyślnego: `/model claude-sonnet-4`

## Porady i triki

### 1. Skróty klawiszowe

- **↑/↓** - Nawiguj po historii komend
- **Tab** - Autouzupełnianie ścieżek plików
- **Ctrl+C** - Przerwij bieżącą operację
- **Ctrl+D** - Zakończ sesję
- **Ctrl+L** - Wyczyść ekran (w większości terminali)

### 2. Łączenie komend z naturalnymi pytaniami

Możesz używać komend w trakcie naturalnej konwersacji:

```
> Przeanalizuj strukturę tego projektu
[Claude Code analizuje...]

> /ls src/
[Wyświetla zawartość src/]

> Teraz wytłumacz, co robią pliki w src/components
[Claude Code wyjaśnia...]
```

### 3. Aliasy w terminalu

Możesz stworzyć aliasy dla szybszego dostępu:

```bash
# Dodaj do ~/.bashrc lub ~/.zshrc
alias cc="claude-code"
alias cch="claude-code && /help"
```

Teraz możesz uruchomić Claude Code przez `cc` zamiast `claude-code`!

## Częste błędy i ich rozwiązania

### Błąd: "Command not recognized"

**Problem:** Próbujesz użyć komendy, która nie istnieje
```
> /foo
Command not recognized: /foo
```

**Rozwiązanie:** Sprawdź `/help`, aby zobaczyć dostępne komendy

### Błąd: "Invalid path"

**Problem:** Podałeś nieprawidłową ścieżkę w `/cd` lub `/ls`
```
> /cd /invalid/path
Invalid path: /invalid/path
```

**Rozwiązanie:** Sprawdź ścieżkę komendą `/pwd` i użyj prawidłowej

### Session się "zawiesza"

**Problem:** Claude Code nie odpowiada po wpisaniu komendy

**Rozwiązanie:**
1. Naciśnij `Ctrl+C`, aby przerwać operację
2. Jeśli to nie pomoże, użyj `Ctrl+D` lub `/exit`
3. Uruchom ponownie Claude Code

## Jak Claude Code może Ci pomóc?

Jeśli masz pytania o CLI, możesz zapytać:
- "Jakie komendy mogę użyć w Claude Code?"
- "Jak zapisać moją sesję?"
- "Jak zmienić katalog roboczy?"
- "Wyjaśnij różnicę między modelami Claude"

## Dodatkowe materiały

### Oficjalna dokumentacja
- [CLI Reference](https://docs.claude.com/en/docs/claude-code/cli-reference)
- [Keyboard Shortcuts](https://docs.claude.com/en/docs/claude-code/shortcuts)
- [Session Management](https://docs.claude.com/en/docs/claude-code/sessions)

### Video tutoriale
- [Claude Code CLI Basics](https://www.youtube.com/results?search_query=claude+code+cli+tutorial)
- [Advanced CLI Techniques](https://www.youtube.com/results?search_query=claude+code+advanced+cli)

### Artykuły
- [Mastering the Claude Code CLI](https://www.anthropic.com/news)
- [10 Tips for Efficient CLI Usage](https://www.anthropic.com/news)

### Cheat sheets
- [Claude Code CLI Cheat Sheet (PDF)](https://docs.claude.com/claude-code-cheatsheet.pdf)
- [Command Reference Quick Guide](https://docs.claude.com/claude-code-commands.pdf)

## Podsumowanie

W tej lekcji nauczyłeś się:
- Jak wygląda interfejs CLI Claude Code
- Jakie są najważniejsze komendy systemowe
- Kiedy używać poszczególnych komend
- Jak nawigować po systemie plików
- Jak zarządzać sesjami i monitorować zasoby
- Jak unikać typowych błędów

W następnej lekcji poznasz system pomocy i dokumentacji Claude Code, który pozwoli Ci znaleźć odpowiedzi na pytania bez opuszczania narzędzia!

---

**Ilustracje:** (do dodania)
- Screenshot interfejsu CLI z opisanymi elementami
- Diagram flow użycia komend
- Cheat sheet z najważniejszymi komendami
- Screenshot przykładowej sesji z wieloma komendami
