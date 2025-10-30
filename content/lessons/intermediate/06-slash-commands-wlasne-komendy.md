---
title: "Slash Commands - tworzenie własnych komend"
description: "Jak tworzyć własne slash commands aby automatyzować powtarzalne zadania i workflows"
duration: 25
difficulty: intermediate
tags: [slash-commands, komendy, customizacja, automatyzacja, workflow]
---

# Slash Commands - tworzenie własnych komend

## Wprowadzenie

Slash Commands to jedna z najpotężniejszych funkcji customizacji w Claude Code. Pozwalają one tworzyć własne komendy zaczynające się od `/`, które automatyzują powtarzalne zadania i workflows. Zamiast opisywać Claude Code każdorazowo to samo zadanie, możesz utworzyć komendę, która robi to jednym kliknięciem.

Wyobraź sobie, że często prosisz Claude Code o "przejrzenie kodu, sprawdzenie testów i utworzenie pull requesta". Zamiast pisać to za każdym razem, możesz stworzyć komendę `/ship`, która zrobi to wszystko automatycznie.

## Dlaczego to ważne?

**Efektywność:** Automatyzuj powtarzalne workflows - jedno wywołanie zamiast wieloliniowych instrukcji.

**Konsystencja:** Każde wywołanie komendy działa identycznie - nie ma ryzyka, że zapomnisz o kroku.

**Współdzielenie:** Slash commands można commitować do repozytorium i dzielić się nimi z zespołem.

**Standaryzacja:** Zespół używa tych samych komend, co prowadzi do spójnych praktyk.

## Kiedy tworzyć Slash Commands?

✅ **Twórz slash command, gdy:**
- Wykonujesz to samo zadanie regularnie (3+ razy)
- Workflow wymaga wielu kroków w określonej kolejności
- Chcesz standaryzować proces w zespole
- Zadanie ma jasno określone kroki
- Instrukcja jest długa i złożona

❌ **Nie twórz slash command, gdy:**
- Zadanie jest jednorazowe
- Workflow zmienia się za każdym razem
- Instrukcja to jedno proste zdanie
- Nikt oprócz Ciebie nie będzie tego używać regularnie

## Struktura Slash Commands

### Lokalizacja

Slash commands przechowywane są w folderze `.claude/commands/`:

```
projekt/
├── .claude/
│   └── commands/
│       ├── review.md          # /review
│       ├── test.md            # /test
│       ├── ship.md            # /ship
│       └── docs.md            # /docs
```

### Format pliku

Każdy slash command to plik Markdown z instrukcjami dla Claude Code:

```markdown
---
description: "Krótki opis komendy (opcjonalny)"
---

# Treść komendy

To jest instrukcja dla Claude Code.
Może zawierać wiele linii i szczegółów.
```

## Przykłady Slash Commands

### Przykład 1: /review - Code Review

**Plik:** `.claude/commands/review.md`

```markdown
---
description: "Przeprowadź code review zmian"
---

Przeprowadź szczegółowy code review obecnych zmian (git diff):

1. **Analiza kodu:**
   - Sprawdź czy kod jest czytelny i zrozumiały
   - Zidentyfikuj potencjalne bugi
   - Sprawdź czy są testy
   - Oceń performance

2. **Best practices:**
   - Czy kod przestrzega konwencji projektu?
   - Czy są DRY violations?
   - Czy są zbędne komentarze?

3. **Security:**
   - Czy są potencjalne security issues?
   - Czy dane wrażliwe są zabezpieczone?

4. **Podsumowanie:**
   Przedstaw:
   - Lista znalezionych problemów (priorytet: wysoki/średni/niski)
   - Sugestie poprawek
   - Ocena ogólna (1-10)

Skoncentruj się na konstruktywnej krytyce.
```

**Użycie:**
```
Ty: /review

Claude Code: [Wykonuje code review według instrukcji]

## Code Review - Podsumowanie

### 🔴 Wysokie priorytety:
1. `UserService.ts:45` - Brak walidacji input
2. `api.ts:12` - API key hardcoded w kodzie

### 🟡 Średnie priorytety:
1. `helpers.ts:23` - Funkcja za długa (80+ linii)
2. Brak testów dla nowej funkcjonalności

### 🟢 Niskie priorytety:
1. Można wydzielić wspólny helper
2. Kilka console.log do usunięcia

**Ocena:** 7/10 - Dobry kod, ale wymaga poprawek security
```

### Przykład 2: /test - Uruchom testy

**Plik:** `.claude/commands/test.md`

```markdown
---
description: "Uruchom testy i napraw błędy"
---

Wykonaj pełny workflow testowania:

1. Uruchom wszystkie testy: `npm test`

2. Jeśli testy przechodzą:
   - Wyświetl podsumowanie
   - Sprawdź coverage (jeśli dostępne)

3. Jeśli testy failują:
   - Przeanalizuj błędy
   - Zidentyfikuj przyczyny
   - Napraw kod lub testy
   - Uruchom ponownie

4. Po naprawieniu wszystkich testów:
   - Potwierdź że wszystko działa
   - Pokaż jakie zmiany zostały wprowadzone

Kontynuuj aż wszystkie testy przejdą.
```

**Użycie:**
```
Ty: /test

Claude Code: Uruchamiam testy...
             [npm test]

❌ 2 testy nie przeszły:

1. UserService.test.ts - "should validate email"
   Przyczyna: Walidacja email nie obsługuje + w adresie

2. api.test.ts - "should handle errors"
   Przyczyna: Mock zwraca niewłaściwą strukturę

Naprawiam...
[Wprowadza poprawki]

Uruchamiam ponownie...
✅ Wszystkie testy przeszły!

Wprowadzone zmiany:
- Poprawiono regex walidacji email
- Zaktualizowano mock w teście API
```

### Przykład 3: /ship - Przygotuj do deploymentu

**Plik:** `.claude/commands/ship.md`

```markdown
---
description: "Kompletny workflow przed deploymentem"
---

Przygotuj kod do deploymentu:

## Pre-flight checks:

1. **Testy:** Uruchom `npm test` - wszystkie muszą przechodzić
2. **Build:** Uruchom `npm run build` - musi się skompilować
3. **Lint:** Uruchom `npm run lint` - napraw błędy jeśli są
4. **Type check:** Uruchom `tsc --noEmit` (jeśli TypeScript)

## Cleanup:

5. Usuń wszystkie `console.log` z produkcyjnego kodu
6. Usuń zakomentowany kod
7. Sprawdź czy brak TODO w krytycznych miejscach

## Git:

8. Sprawdź `git status`
9. Pokaż `git diff` do przeglądu
10. Jeśli wszystko OK, wykonaj commit z opisowym message

## Podsumowanie:

11. Lista zmian w tym commicie
12. Potwierdzenie że wszystkie checks przeszły
13. Czy stworzyć Pull Request? (zapytaj)

STOP na każdym kroku jeśli coś failuje!
```

**Użycie:**
```
Ty: /ship

Claude Code:
## Pre-flight checks:

✅ npm test - 45 testów przeszło
✅ npm run build - sukces
✅ npm run lint - brak błędów
✅ tsc --noEmit - brak błędów typów

## Cleanup:

🧹 Usunięto 3 console.log z src/
🧹 Usunięto zakomentowany kod (5 linii)
⚠️  Znalazłem 2 TODO - nie w krytycznych miejscach

## Git:

[git status i diff]

Zmiany wygladają dobrze. Commitować?
```

### Przykład 4: /docs - Generuj dokumentację

**Plik:** `.claude/commands/docs.md`

```markdown
---
description: "Wygeneruj dokumentację dla funkcji/klasy"
---

Wygeneruj profesjonalną dokumentację:

1. Znajdź plik lub funkcję o którą pytam
2. Przeanalizuj kod
3. Wygeneruj:
   - JSDoc/TSDoc komentarze
   - Opis parametrów i return type
   - Przykłady użycia
   - Edge cases jeśli istnieją

4. Jeśli to API:
   - HTTP method, endpoint
   - Request/Response schema
   - Error codes

Format: użyj standardu JSDoc/TSDoc
Język: polski
Styl: profesjonalny, zwięzły
```

## Zaawansowane techniki

### 1. Slash Commands z argumentami

**Plik:** `.claude/commands/analyze.md`

```markdown
---
description: "Analizuj plik lub moduł [nazwa]"
---

Wykonaj głęboką analizę dla: {args}

1. Znajdź wszystkie pliki związane z {args}
2. Przeanalizuj:
   - Strukture kodu
   - Zależności
   - Potencjalne problemy
   - Możliwości optymalizacji

3. Przedstaw raport z rekomendacjami
```

**Użycie:**
```
Ty: /analyze auth

Claude Code: Analizuję moduł "auth"...
             [Znajduje src/auth/*.ts]
             [Przygotowuje raport]
```

### 2. Łańcuchowe Slash Commands

```markdown
# W .claude/commands/prepare-pr.md

1. Uruchom /test
2. Uruchom /lint
3. Uruchom /docs
4. Stwórz PR summary
```

### 3. Context-aware Commands

```markdown
# W .claude/commands/fix.md

Na podstawie ostatniego błędu lub warni:

1. Zidentyfikuj przyczynę
2. Zaproponuj 2-3 rozwiązania
3. Zaimplementuj najlepsze rozwiązanie
4. Zweryfikuj że problem został naprawiony
```

## Slash Commands dla zespołu

### Przykładowe commands dla team workflows:

**1. /onboarding** - Dla nowych developerów
```markdown
Witaj w projekcie! Przeprowadzę Cię przez setup:

1. Sprawdzam czy masz zainstalowane: Node, npm, git
2. Klonoowanie repozytorium (jeśli trzeba)
3. `npm install`
4. Konfiguracja env variables
5. Setup bazy danych (dev)
6. Uruchomienie projektu
7. Tour po architekturze
```

**2. /pr-template** - Szablon PR
```markdown
Wygeneruj description Pull Requesta:

## Co zostało zmienione?
[Analiza git diff]

## Dlaczego?
[Na podstawie commit messages lub TODO]

## Jak testować?
[Instrukcje dla reviewera]

## Screenshots (jeśli UI):
[Wskazówki gdzie zrobić]

## Checklist:
- [ ] Testy przechodzą
- [ ] Dokumentacja zaktualizowana
- [ ] Brak console.log
```

**3. /refactor** - Bezpieczny refaktoring
```markdown
Przeprowadź refaktoring z TDD:

1. Upewnij się że są testy (jeśli nie - dodaj)
2. Uruchom testy - wszytkie muszą przechodzić (baseline)
3. Wykonaj refaktoring
4. Uruchom testy ponownie
5. Jeśli failują - debuguj
6. Powtarzaj aż wszystko działa
7. Code review własnego refactoringu
```

## Najlepsze praktyki

### ✅ Dobre praktyki

1. **Opisowe nazwy**
   - ✅ `/test-and-fix` - jasne co robi
   - ❌ `/taf` - niejasne skróty

2. **Dodawaj description**
   ```markdown
   ---
   description: "Opis wyświetlany w /help"
   ---
   ```

3. **Numeruj kroki**
   - Ułatwia śledzenie postępu
   - Claude Code może raportować "Krok 3 z 7"

4. **Jasne instrukcje**
   - Używaj konkretnych komend
   - Określ co robić gdy coś failuje

5. **Commituj do repo**
   ```bash
   git add .claude/commands/
   git commit -m "Add team slash commands"
   ```

### ❌ Anty-wzorce

1. **Za ogólne instrukcje**
   - ❌ "Zrób review"
   - ✅ "Sprawdź X, Y, Z i przedstaw raport w formacie A"

2. **Za dużo kroków**
   - Jeden command nie powinien mieć 20+ kroków
   - Rozdziel na mniejsze commands

3. **Brak error handling**
   - Określ co robić gdy testy failują
   - "STOP jeśli..." instrukcje

## Zadanie praktyczne

**Cel:** Stwórz własne slash commands dla swojego workflow

### Zadanie 1: Prosty command

1. Stwórz folder `.claude/commands/`
2. Stwórz plik `hello.md`:
   ```markdown
   ---
   description: "Test slash command"
   ---

   Powiedz "Hello from slash command!" i pokaż datę.
   ```
3. Wywołaj: `/hello`

### Zadanie 2: Command z workflow

1. Stwórz `/check` command który:
   - Uruchamia testy
   - Sprawdza lint
   - Pokazuje git status
   - Podsumowuje wyniki

### Zadanie 3: Team command

1. Stwórz `/pr-ready` command który:
   - Sprawdza czy branch jest aktualny z main
   - Uruchamia testy
   - Sprawdza czy commit message jest OK
   - Generuje PR description

**Oczekiwany rezultat:**
- Własne slash commands działają poprawnie
- Automatyzacja powtarzalnych workflows
- Oszczędność czasu przy rutynowych zadaniach

## Jak Claude Code może Ci pomóc?

Możesz zapytać Claude Code:
- "Stwórz slash command który [robi X, Y, Z]"
- "Pokaż przykłady slash commands dla [type of project]"
- "Jak dodać argumenty do slash command?"
- "Zoptymalizuj mój command: [zawartość]"

## Dodatkowe materiały

### Oficjalna dokumentacja
- [Slash Commands Guide](https://docs.claude.com/en/docs/claude-code/slash-commands)
- [Creating Custom Commands](https://docs.claude.com/en/docs/claude-code/custom-commands)
- [Command Best Practices](https://docs.claude.com/en/docs/claude-code/command-best-practices)

### Video tutoriale
- [Slash Commands Tutorial](https://www.youtube.com/results?search_query=claude+code+slash+commands)
- [Automating Workflows](https://www.youtube.com/results?search_query=claude+code+automation)

### Artykuły
- [10 Must-Have Slash Commands](https://dev.to/search?q=claude%20code%20commands)
- [Team Workflows with Slash Commands](https://medium.com/search?q=claude%20code%20workflow)

### Przykłady z community
- [GitHub - Command Collections](https://github.com/search?q=claude+commands+path:.claude)
- [Awesome Claude Code Commands](https://github.com/topics/claude-code-commands)

## Podsumowanie

W tej lekcji nauczyłeś się:
- Czym są slash commands i jak działają
- Jak tworzyć własne commands w `.claude/commands/`
- Przykładów popularnych commands (/review, /test, /ship)
- Jak używać commands do automatyzacji workflows
- Najlepszych praktyk tworzenia commands dla zespołu

Slash commands to fundament produktywności w Claude Code. Inwestuj czas w tworzenie dobrych commands - zwróci się to wielokrotnie w zaoszczędzonym czasie.

W następnej lekcji poznasz zaawansowaną konfigurację Claude Code i jak dostosować go do swoich potrzeb!

---

**Ilustracje:** (do dodania)
- Screenshot struktury folderu .claude/commands/
- Diagram flow: Command → Parsing → Execution → Result
- Przykład outputu z /review command
