# Mail 8: Zarządzanie sesjami i workflow

## Przypomnienie z lekcji 7

W poprzedniej lekcji poznałeś **CLAUDE.md** - pamięć projektu działającą jak dokument onboardingowy dla Claude. Nauczyłeś się tworzyć hierarchię plików (globalny, projektowy, lokalny) oraz używać komendy `/init` do automatycznego generowania szkieletu.

---

## Sprawdź swoją wiedzę z lekcji 7

1. **Która komenda automatycznie generuje szkielet CLAUDE.md?** (`/init`, `/memory`, `/help`)
2. **W jakiej kolejności Claude ładuje pliki CLAUDE.md?** (od najwyższego do najniższego priorytetu)

---

## TLDR

Ta lekcja to **4 scenariusze z życia wzięte** - każdy z konkretnym problemem i zestawem narzędzi do jego rozwiązania.

**Najważniejsze skróty:**
- `/resume` - odzyskaj poprzednią sesję
- `Shift+Tab` - przełączaj tryby pracy (Normal → Plan → Auto-Accept)
- `Ctrl+B` - przenieś zadanie do tła
- `& prompt` - wyślij zadanie do chmury

**Checkpoint Pattern:** Nazywaj sesje, eksportuj postępy, używaj Plan Mode do planowania.

---

Zamiast suchej listy komend - historie użytkowników z konkretnymi problemami i rozwiązaniami.

---

## Scenariusz 1: "Straciłem całą pracę!"

### Problem

Kasia pracowała 2 godziny nad refaktoryzacją systemu autentykacji. Zamknęła terminal przez przypadek. Cała praca zniknęła.

*Brzmi znajomo?*

### Rozwiązania

#### 1. Odzyskiwanie sesji: `/resume`

```bash
# Po ponownym uruchomieniu Claude Code:
> /resume
```

Zobaczysz **interaktywny picker sesji**:
- `↑/↓` - nawigacja między sesjami
- `P` - podgląd zawartości sesji
- `R` - zmień nazwę sesji
- `Enter` - wznów wybraną sesję

Claude przechowuje historię sesji lokalnie. Nawet po zamknięciu terminala możesz wrócić do poprzedniej rozmowy.

#### 2. Nazywanie sesji: `/rename`

```bash
# Nadaj sesji czytelną nazwę
> /rename auth-refactor

# Teraz w /resume zobaczysz "auth-refactor" zamiast timestampa
```

**Pro tip:** Nazywaj sesje od razu po rozpoczęciu pracy nad konkretnym zadaniem.

#### 3. Checkpoint Pattern: `/export`

```bash
# Przed ryzykownymi operacjami - zapisz postęp
> /export backup-przed-refactor.md

# Plik Markdown z całą rozmową
# Możesz go później wczytać: @backup-przed-refactor.md
```

**Kiedy eksportować:**
- Przed dużymi zmianami w kodzie
- Co 30-60 minut przy długich sesjach
- Przed zakończeniem dnia pracy
- Gdy przekazujesz pracę komuś innemu

#### 4. Plan Mode: `Shift+Tab`

Zanim zaczniesz implementację - zaplanuj:

```bash
# Przełącz na Plan Mode
<Shift+Tab>

> Zaplanuj refaktoryzację systemu auth do nowej architektury

# Claude tworzy szczegółowy plan:
# - Które pliki zmienić
# - W jakiej kolejności
# - Jakie ryzyka
#
# ALE NIE MODYFIKUJE ŻADNYCH PLIKÓW!
```

W Plan Mode możesz eksplorować różne podejścia bez ryzyka.

### Tryby pracy - przełączanie

Claude Code ma **3 tryby uprawnień**, przełączane skrótem `Shift+Tab`:

| Tryb | Zachowanie | Kiedy używać |
|------|------------|--------------|
| **Normal** (domyślny) | Pyta przed każdą zmianą | Standardowa praca |
| **Plan** | Tylko planuje, nie zmienia plików | Złożone zadania, architektura |
| **Auto-Accept** | Automatycznie wykonuje zmiany | Zaufane, powtarzalne operacje |

```bash
# Cykl przełączania:
Normal → <Shift+Tab> → Plan → <Shift+Tab> → Auto-Accept → <Shift+Tab> → Normal
```

### Przykład dla marketera

Te same techniki działają przy tworzeniu contentu:

```bash
# Nazywasz sesję od razu
> /rename kampania-letnia-2025

# Pracujesz nad strategią kampanii...

# Przed przerwą - eksportujesz
> /export kampania-draft.md

# Następnego dnia - wracasz gdzie skończyłeś
> /resume
# Wybierasz "kampania-letnia-2025"
```

### Morał scenariusza 1

> "Nazywaj sesje, eksportuj postępy, używaj Plan Mode do planowania."

---

## Scenariusz 2: "Muszę pracować nad 3 projektami naraz"

### Problem

Marcin ma:
- Bugfix do zrobienia na produkcji (pilne!)
- Nową funkcję do napisania (deadline za 2 dni)
- Code review dla kolegi (obiecał na dzisiaj)

Jeden terminal to za mało. Przełączanie między projektami to koszmar.

### Rozwiązania

#### 1. Wysłanie zadania do chmury: `& prefix`

```bash
# Prefix & wysyła zadanie do claude.ai/code
> & Fix the auth bug in login.ts - users can't login with special characters in password

# Claude odpowiada:
# "Task sent to cloud. View at claude.ai/code or use /tasks"
```

Zadanie wykonuje się w chmurze. Ty możesz kontynuować pracę lokalnie.

**Alternatywnie** - możesz po prostu poprosić naturalnym językiem:
```bash
> Wykonaj to zadanie zdalnie w tle: napraw błąd auth w login.ts
```
Claude zrozumie intencję i wyśle zadanie do chmury.

#### 2. Monitorowanie zadań: `/tasks`

```bash
> /tasks

# Lista zadań w chmurze:
# 1. [IN PROGRESS] Fix auth bug in login.ts
# 2. [COMPLETED] Refactor user validation
#
# Opcje:
# - Enter: szczegóły zadania
# - t: teleportuj do CLI (ściągnij sesję)
# - r: refresh listy
```

#### 3. Teleportacja sesji: `/teleport` lub `--teleport`

```bash
# Z poziomu Claude Code (komenda slash):
> /teleport

# Z terminala (flaga CLI):
$ claude --teleport

# Bezpośrednio po ID sesji:
$ claude --teleport abc123
```

**Teleportacja** pozwala Ci przenieść sesję z chmury (WEB) do CLI - z pełnym kontekstem.

#### 4. Praca w WEB: claude.ai/code

Otwórz `claude.ai/code` w przeglądarce:
- Pełny interfejs webowy
- Podgląd wszystkich zadań
- Możliwość sterowania zadaniami z GUI
- Synchronizacja z CLI

### Workflow dla wielu projektów

```bash
# Terminal 1: Praca lokalna nad feature
$ cd ~/projects/main-app
$ claude
> Implementuj nowy dashboard...

# W międzyczasie - wyślij bugfix do chmury:
> & Fix the production bug in @src/auth/login.ts

# Terminal pozostaje wolny dla bieżącej pracy

# Sprawdź status zadań w chmurze:
> /tasks

# Gdy bugfix gotowy - ściągnij do CLI:
> /tasks → t (teleport)

# Lub z przeglądarki: claude.ai/code
```

### Alternatywna składnia

```bash
# Zamiast & prefix możesz użyć flagi:
$ claude --remote "Fix the auth bug in login.ts"

# Lub z pliku:
$ claude --remote "$(cat task-description.txt)"
```

### Przykład dla project managera

PM może równolegle pracować nad wieloma dokumentami:

```bash
# Wyślij research do chmury
> & Przeanalizuj @backlog.md i zaproponuj priorytety na Q2

# Kontynuuj lokalnie nad retrospektywą
> Pomóż mi napisać podsumowanie sprintu 14

# Sprawdź czy analiza backlogu gotowa
> /tasks
```

### Morał scenariusza 2

> "CLI do interakcji, WEB do równoległych zadań, teleport do przenoszenia."

**Więcej o pracy z WEB** (claude.ai/code, teleportacja, zdalne sesje) poznasz w **następnej lekcji**.

---

## Scenariusz 3: "Build trwa 15 minut i blokuje terminal"

### Problem

Ania uruchomiła `npm run build`. Trwa to wieczność. Nie może nic robić - terminal zajęty.

*Klasyka.*

### Rozwiązania

#### 1. Przeniesienie do tła: `Ctrl+B`

```bash
# Uruchom długi proces
> ! npm run build

# Zanim się skończy - przenieś do tła:
<Ctrl+B>

# Claude: "Process moved to background. Use /tasks to check status."
```

**Uwaga dla użytkowników tmux:** W tmux prefix to też `Ctrl+B`, więc musisz nacisnąć dwukrotnie: `Ctrl+B Ctrl+B`.

#### 2. Lista zadań: `/tasks`

```bash
> /tasks

# Zadania w tle (lokalne i zdalne):
# ID    | Status      | Command/Task
# ------+-------------+---------------------------
# bg-1  | RUNNING     | npm run build
# bg-2  | COMPLETED   | npm test
#
# Opcje: Enter=szczegóły, t=teleport (dla zdalnych)
```

#### 3. Automatyczne sprawdzanie statusu

Nie musisz ręcznie sprawdzać - wystarczy zapytać:

```bash
> Sprawdź status buildu

# Claude automatycznie pobierze output z tła
# i powie Ci, jak poszło
```

#### 4. Auto-Accept Mode dla szybkich zmian

Gdy pracujesz nad czymś prostym i zaufanym:

```bash
# Przełącz na Auto-Accept (Shift+Tab dwukrotnie)
<Shift+Tab><Shift+Tab>

> Popraw wszystkie błędy ESLint w @src/components/

# Claude automatycznie naprawia bez pytania - szybko i sprawnie

# Po skończeniu - wróć do Normal Mode:
<Shift+Tab>
```

### Workflow z procesami w tle

```bash
# 1. Uruchom testy w tle
> ! npm test
<Ctrl+B>

# 2. Pracuj nad czymś innym
> Zaimplementuj funkcję walidacji email w @src/utils/

# 3. Sprawdź testy gdy skończysz
> Jak poszły testy?

# Claude pobierze output i powie Ci, jak poszły testy
```

### Tryb bash: `!` prefix

```bash
# Prefix ! wykonuje komendę bezpośrednio (bez analizy Claude):
> ! git status
> ! npm run dev
> ! docker-compose up -d

# Przydatne dla szybkich komend systemowych
```

### Przykład dla analityka danych

Analiza dużego pliku CSV nie musi blokować pracy:

```bash
# Uruchom przetwarzanie danych
> ! python analyze_sales.py data/sales-2025.csv
<Ctrl+B>

# Pracuj nad prezentacją w międzyczasie
> Pomóż mi napisać executive summary do raportu Q4

# Sprawdź wyniki analizy
> Jak poszła analiza danych sprzedażowych?
```

### Morał scenariusza 3

> "Nie czekaj na długie procesy - przenieś do tła i pracuj dalej."

---

## Scenariusz 4: "Chcę zautomatyzować code review"

### Problem

Tomek robi code review codziennie. Zawsze te same kroki:
1. Pobierz diff z PR
2. Sprawdź bugi i security issues
3. Sprawdź performance
4. Napisz komentarz

Chce to zautomatyzować skryptem.

### Rozwiązania

#### 1. Tryb nieinteraktywny: `-p`

```bash
# Zamiast interaktywnego REPL - jednorazowy prompt:
$ claude -p "Explain what this function does" < code.js

# Dostajesz odpowiedź i koniec - bez sesji interaktywnej
```

#### 2. Output jako JSON: `--output-format json`

```bash
$ claude -p "List all bugs in this code" --output-format json < buggy.js

# Output:
# {
#   "result": "Found 3 potential bugs:\n1. ...",
#   "cost": 0.0023,
#   "tokens_used": 1250
# }
```

Parsowalne dane dla skryptów.

#### 3. Wznawianie sesji: `--continue` i `--resume`

```bash
# Wznów ostatnią sesję (tryb interaktywny):
$ claude --continue

# Wznów konkretną sesję po nazwie:
$ claude --resume auth-review

# Wznów po ID sesji:
$ claude --resume abc123
```

**Uwaga:** Flagi `--continue` i `--resume` uruchamiają tryb interaktywny. Nie łączą się z flagą `-p`.

#### 4. Piping danych

```bash
# Przekaż dane przez pipe:
$ cat large-file.js | claude -p "Summarize this code"

# Lub z wielu plików:
$ find src -name "*.ts" -exec cat {} \; | claude -p "Find security issues"
```

### Przykładowy skrypt: auto-review.sh

```bash
#!/bin/bash
# auto-review.sh - automatyczny code review

PR_NUMBER=$1

echo "Reviewing PR #$PR_NUMBER..."

# Pobierz diff i wyślij do analizy
gh pr diff "$PR_NUMBER" | claude -p \
  "Review this code for:
   1. Bugs and logic errors
   2. Security vulnerabilities
   3. Performance issues

   Format: markdown list with severity (HIGH/MEDIUM/LOW)" \
  --output-format json \
  | jq -r '.result'
```

**Użycie:**
```bash
$ chmod +x auto-review.sh
$ ./auto-review.sh 123
```

### Przykład dla content writera

Automatyzacja analizy tekstów:

```bash
# Sprawdź czytelność artykułu
$ cat article.md | claude -p "Oceń czytelność tego tekstu. \
  Zaproponuj 3 konkretne poprawki."

# Batch processing wielu artykułów
$ for f in drafts/*.md; do
    echo "=== $f ==="
    cat "$f" | claude -p "Podsumuj w 2 zdaniach"
  done
```

### Flagi dla skryptów

| Flaga | Opis |
|-------|------|
| `-p "prompt"` | Tryb nieinteraktywny (jednorazowy prompt) |
| `--output-format json` | Output w formacie JSON (parsowalne dane) |
| `--continue` / `-c` | Kontynuuj ostatnią sesję interaktywnie |
| `--resume nazwa` | Wznów sesję po nazwie |

### Morał scenariusza 4

> "Claude Code świetnie nadaje się do automatyzacji skryptami."

---

## Tabela podsumowująca

### Zarządzanie sesjami

| Komenda | Opis |
|---------|------|
| `/resume` | Interaktywny picker sesji |
| `/rename nazwa` | Nazwij bieżącą sesję |
| `/export plik.md` | Eksportuj rozmowę do pliku |
| `claude --continue` | Wznów ostatnią sesję z terminala |
| `claude --resume nazwa` | Wznów konkretną sesję z terminala |

### Praca z chmurą (WEB)

| Komenda | Opis |
|---------|------|
| `& prompt` | Wyślij zadanie do chmury |
| `--remote "prompt"` | Alternatywna składnia (z terminala) |
| `/tasks` | Lista zadań w chmurze |
| `/teleport` | Ściągnij sesję z WEB (komenda slash) |
| `claude --teleport` | Ściągnij sesję z WEB (flaga CLI) |

### Praca w tle

| Komenda | Opis |
|---------|------|
| `Ctrl+B` | Przenieś bieżący proces do tła |
| `/tasks` | Lista zadań (lokalne i zdalne) |
| `! komenda` | Tryb bash (bezpośrednie wykonanie) |

### Tryby pracy

| Tryb | Skrót | Opis |
|------|-------|------|
| Normal | (domyślny) | Pyta przed każdą zmianą |
| Plan | `Shift+Tab` | Tylko planuje, nie zmienia plików |
| Auto-Accept | `Shift+Tab` x2 | Automatycznie wykonuje zmiany |

### Tryb nieinteraktywny (dla skryptów)

| Flaga | Opis |
|-------|------|
| `-p "prompt"` | Jednorazowy prompt bez REPL |
| `--output-format json` | Output w formacie JSON |
| `cat file \| claude -p` | Piping danych do analizy |

---

## Typowe błędy i jak ich unikać

| Błąd | Objaw | Rozwiązanie |
|------|-------|-------------|
| Zamknięcie terminala bez eksportu | Utrata kontekstu pracy | Używaj `/rename` i `/export` regularnie |
| Auto-Accept bez git | Niemożliwe cofnięcie zmian | Zawsze `git commit` przed Auto-Accept |
| Blokowanie terminala długimi procesami | Brak możliwości pracy | Używaj `Ctrl+B` do przenoszenia w tło |
| Ręczne powtarzanie code review | Strata czasu | Zautomatyzuj skryptem z `-p` |
| Praca nad wieloma zadaniami w jednej sesji | Chaos w kontekście | Używaj `& prefix` i `/tasks` |

---

## Słowniczek

**Teleportacja** - przeniesienie sesji z chmury (claude.ai/code) do lokalnego CLI z zachowaniem pełnego kontekstu.

**Plan Mode** - tryb pracy, w którym Claude tylko planuje bez wykonywania zmian w plikach. Bezpieczny do eksploracji podejść.

**Auto-Accept Mode** - tryb pracy, w którym Claude automatycznie wykonuje wszystkie zmiany bez pytania. Wymaga zaufania i backupu (git).

**Checkpoint Pattern** - strategia regularnego zapisywania postępów: nazywaj sesje → eksportuj co 30-60 min → używaj Plan Mode dla ryzykownych operacji.

---

## Podsumowanie

1. **"Straciłem pracę"** → `/resume`, `/rename`, `/export`, Plan Mode
2. **"Wiele projektów naraz"** → `& prefix`, `/tasks`, `--teleport`
3. **"Build blokuje terminal"** → `Ctrl+B`, Auto-Accept Mode
4. **"Automatyzacja code review"** → `-p`, `--output-format json`, piping

**Najważniejsze skróty do zapamiętania:**
- `Shift+Tab` - przełączaj tryby
- `Ctrl+B` - przenieś do tła
- `& prompt` - wyślij do chmury

---

## Pytania kontrolne

1. **Jak odzyskać sesję po przypadkowym zamknięciu terminala?**

2. **Jaka jest różnica między Plan Mode a Normal Mode?**

3. **Jak wysłać zadanie do chmury i monitorować jego postęp?**

4. **Jak zautomatyzować powtarzalne zadanie (np. code review) skryptem?**

---

## Zadania praktyczne

### Zadanie 1: Checkpoint Pattern

1. Rozpocznij nową sesję Claude Code
2. Nazwij ją: `/rename moje-zadanie`
3. Pracuj przez 10 minut nad dowolnym zadaniem
4. Wyeksportuj postęp: `/export checkpoint-1.md`
5. Zamknij terminal (symulacja awarii)
6. Uruchom Claude Code i użyj `/resume`
7. Czy Twoja sesja została zachowana?

### Zadanie 2: Tryby pracy

1. Przełącz na Plan Mode: `Shift+Tab`
2. Poproś Claude o zaplanowanie dowolnej zmiany
3. Zauważ, że **żadne pliki nie zostały zmienione**
4. Przełącz na Normal Mode: `Shift+Tab`
5. Poproś o wykonanie pierwszego kroku planu
6. Zauważ, że teraz Claude **pyta przed każdą zmianą**

### Zadanie 3: Praca w tle

1. Uruchom długi proces: `> ! sleep 30 && echo "Done!"`
2. Przenieś do tła: `Ctrl+B`
3. Sprawdź status: `> /tasks`
4. Pracuj nad czymś innym w międzyczasie
5. Zapytaj Claude: `> Jak poszedł ten proces sleep?`

### Zadanie 4: Skrypt automatyzacji (zaawansowane)

1. Stwórz plik `analyze.sh`:
```bash
#!/bin/bash
cat "$1" | claude -p "List all functions in this file with one-line descriptions" --output-format json | jq -r '.result'
```
2. Nadaj uprawnienia: `chmod +x analyze.sh`
3. Przetestuj: `./analyze.sh src/utils.js`

---

## Linki do dokumentacji

1. **Interactive Mode** (sesje, skróty klawiszowe, tryby pracy)
   https://code.claude.com/docs/en/interactive-mode

2. **CLI Reference** (flagi, komendy, tryb nieinteraktywny)
   https://code.claude.com/docs/en/cli-reference

3. **Claude Code on the Web** (zadania zdalne, teleportacja)
   https://code.claude.com/docs/en/claude-code-on-the-web

4. **Checkpointing** (cofanie zmian, zarządzanie sesjami)
   https://code.claude.com/docs/en/checkpointing

---

**W następnej lekcji:** Zagłębimy się w **pracę z WEB** (claude.ai/code) - pełny interfejs webowy, zdalne sesje, teleportacja między CLI a przeglądarką, oraz zaawansowane workflow łączące oba środowiska.

Do zobaczenia!
