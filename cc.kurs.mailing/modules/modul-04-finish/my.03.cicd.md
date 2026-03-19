---
lesson: "04.03"
title: "Tryb nieinteraktywny i CI/CD"
description: "Jak uruchamiać Claude Code bez sesji interaktywnej — w skryptach, potokach Unix, GitHub Actions i zadaniach cyklicznych"
module: "04-finish"
---

# Tryb nieinteraktywny i CI/CD

Olek przychodzi do biura rano i widzi: dwa pull requesty czekają na review, changelog z ostatniego tygodnia nie istnieje, a skrypt migracyjny ma buga. Wszystko do zrobienia ręcznie.

— Wczoraj siedziałem z Claude Code godzinę, żeby przejrzeć jednego PR-a — mówi. — Muszę to jakoś zautomatyzować.

Marta dodaje:

— Ja mam gorzej. Codziennie rano uruchamiam Claude Code, żeby sprawdził, czy dane w CSV się zgadzają. Robię to od trzech tygodni. Za każdym razem ten sam prompt.

Paweł kiwa głową.

— Claude Code to nie tylko interaktywna sesja w terminalu. Możesz go wywoływać ze skryptów, wrzucać do potoków Unix i integrować z GitHub Actions. Dziś nauczysz się, jak wyjąć Claude'a z terminala i wprzęgnąć w automatyzację.

Karina pyta:

— W lekcji 08 modułu 01 mówiliśmy o `claude -p`. Czym to się różni?

— Tam pokazaliśmy, że to istnieje. Dziś zbudujemy na tym realne workflow.

> **Moduł:** Finał
> **Poziom:** Średniozaawansowany
> **Czas:** 30--40 minut

## Co wyniesiesz z tej lekcji

- Potrafisz uruchamiać Claude Code jednorazowo ze skryptów (`claude -p`).
- Wiesz, jak karmić Claude'a danymi przez stdin i przetwarzać output przez stdout.
- Umiesz dodawać kontekst z pliku (`--append-system-prompt-file`).
- Budujesz workflow w GitHub Actions z Claude Code.
- Konfigurujesz zadania cykliczne i wiesz, jak je kontrolować.

---

## 1. `claude -p` — jednorazowe wywołania

Flaga `-p` (albo `--print`) uruchamia Claude Code bez interaktywnej sesji. Wysyłasz prompt, dostajesz odpowiedź, koniec.

```bash
claude -p "What does the auth module do?"
```

Claude przeczyta Twój projekt (jeśli uruchomisz komendę w katalogu z repozytorium), odpowie na pytanie i zakończy pracę. Żadnych pytań o uprawnienia, żadnej interakcji.

### Auto-zatwierdzanie narzędzi

W trybie nieinteraktywnym Claude nie może Cię pytać o zgodę. Musisz z góry powiedzieć, jakich narzędzi może użyć:

```bash
claude -p "Run tests and fix failures" \
  --allowedTools "Bash,Read,Edit"
```

Flaga `--allowedTools` akceptuje składnię reguł uprawnień — tę samą co w `settings.json`:

```bash
claude -p "Create a commit for staged changes" \
  --allowedTools "Bash(git diff *),Bash(git log *),Bash(git status *),Bash(git commit *)"
```

Spacja przed `*` jest istotna. `Bash(git diff *)` dopasuje każdą komendę zaczynającą się od `git diff `. Bez spacji `Bash(git diff*)` dopasuje też `git diff-index`.

### Formaty wyjścia

Domyślnie `claude -p` drukuje czysty tekst. Ale masz trzy opcje:

```bash
# Czysty tekst (domyślnie)
claude -p "Summarize this project" --output-format text

# JSON ze strukturą (session_id, result, metadata)
claude -p "Summarize this project" --output-format json

# Streaming JSON (linia po linii, w czasie rzeczywistym)
claude -p "Summarize this project" --output-format stream-json
```

Format `json` jest przydatny do przetwarzania maszynowego. Wynik jest w polu `result`:

```bash
claude -p "Summarize this project" --output-format json | jq -r '.result'
```

### Structured output z JSON Schema

Chcesz, żeby Claude zwrócił dane w konkretnej strukturze? Użyj `--json-schema`:

```bash
claude -p "Extract function names from auth.py" \
  --output-format json \
  --json-schema '{"type":"object","properties":{"functions":{"type":"array","items":{"type":"string"}}},"required":["functions"]}'
```

Wynik trafia do pola `structured_output` w JSON. Idealne do budowania pipeline'ów danych.

---

## 2. Potoki Unix — stdin/stdout

Claude Code świetnie wpasowuje się w filozofię Unix: jedno narzędzie robi jedną rzecz, dane płyną przez potoki.

### Dane na wejściu

```bash
cat report.csv | claude -p "Analyze this CSV data and find anomalies"
```

Albo diff z PR-a:

```bash
gh pr diff 42 | claude -p "Review this diff for security issues" --output-format json
```

### Łańcuchy przetwarzania

```bash
# Wyciągnij nazwy funkcji → przefiltruj → zapisz
claude -p "List all exported functions in src/" \
  --output-format json | jq -r '.result' | grep "export" > functions.txt
```

### Przetwarzanie wielu plików

```bash
for file in src/*.ts; do
  claude -p "Review $file for TypeScript best practices" \
    --allowedTools "Read" \
    --output-format json | jq -r '.result' >> review-report.md
done
```

Marta:

— Czyli mogę wrzucić cały pipeline danych: pobranie CSV, analiza przez Claude'a, zapis wyników?

— Tak — mówi Paweł. — Claude staje się jednym z ogniw łańcucha. Pobierasz dane curlem, przetwarzasz Claude'em, wynik wrzucasz do bazy albo do Slacka.

---

## 3. Dodatkowy kontekst — `--append-system-prompt`

Często chcesz, żeby Claude miał dodatkowe instrukcje — ale nie chcesz ich wpisywać w prompt za każdym razem.

### Inline

```bash
gh pr diff 42 | claude -p "Review this PR" \
  --append-system-prompt "You are a security engineer. Focus on authentication, authorization, and input validation."
```

`--append-system-prompt` dodaje tekst do system promptu Claude Code — zachowując domyślne zachowanie (dostęp do narzędzi, znajomość projektu).

### Z pliku

Jeśli masz plik z instrukcjami:

```bash
claude -p "Review this codebase" \
  --append-system-prompt-file ./review-guidelines.md
```

Przydatne, gdy instrukcje są długie — np. firmowe standardy bezpieczeństwa, wytyczne code review, checklist compliance.

### Pełna zamiana system promptu

Jeśli chcesz całkowicie zastąpić domyślny system prompt (rzadki przypadek):

```bash
claude -p "Analyze this code" \
  --system-prompt "You are a minimalist code analyzer. Return only JSON with findings."
```

Uwaga: `--system-prompt` wyłącza domyślne zachowanie Claude Code (CLAUDE.md, skille, narzędzia wbudowane). Używaj tylko gdy wiesz, co robisz.

---

## 4. Kontynuacja konwersacji

Czasem potrzebujesz kilku kroków — ale nadal bez interaktywnej sesji.

```bash
# Pierwszy krok
claude -p "Review this codebase for performance issues"

# Kontynuacja ostatniej konwersacji
claude -p "Now focus on database queries" --continue

# Trzeci krok
claude -p "Generate a summary of all findings" --continue
```

Flaga `--continue` dołącza nowy prompt do ostatniej konwersacji. Claude ma pełny kontekst z poprzednich kroków.

Jeśli prowadzisz wiele konwersacji równolegle, zapisz session ID:

```bash
session_id=$(claude -p "Start a review" --output-format json | jq -r '.session_id')
claude -p "Continue that review" --resume "$session_id"
```

---

## 5. GitHub Actions — Claude w CI/CD

Claude Code ma oficjalną GitHub Action: `anthropics/claude-code-action`.

### Szybka konfiguracja

Najszybszy sposób: w Claude Code wpisz `/install-github-app`. Kreator przeprowadzi Cię przez instalację GitHub App i konfigurację sekretów.

### Podstawowy workflow — reagowanie na @claude

```yaml
name: Claude Code
on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]

jobs:
  claude:
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
```

Ten workflow reaguje na komentarze z `@claude` w issues i PR-ach. Napisz `@claude fix the TypeError in this component` — Claude przeanalizuje kontekst i zaproponuje rozwiązanie.

### Automatyczny code review na PR

```yaml
name: Code Review
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: "Review this PR for code quality, security, and correctness. Post findings as review comments."
          claude_args: "--max-turns 5 --model sonnet"
```

Każdy nowy PR albo push do istniejącego PR-a triggeruje code review. Claude analizuje diff, czyta powiązany kod i zostawia komentarze.

### Generowanie changelogu na schedule

```yaml
name: Weekly Changelog
on:
  schedule:
    - cron: "0 9 * * 1"  # Poniedziałek o 9:00

jobs:
  changelog:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: "Generate a changelog from last week's commits. Group by feature, fix, and chore."
          claude_args: "--allowedTools Read,Bash(git log *)"
```

### Parametry claude_args

Wszystkie flagi CLI działają w `claude_args`:

```yaml
claude_args: |
  --max-turns 10
  --model claude-sonnet-4-6
  --allowedTools Read,Edit,Bash
  --append-system-prompt "Follow our coding standards in CLAUDE.md"
```

Olek:

— Czyli mogę mieć workflow, który automatycznie robi review każdego PR-a i generuje changelog co tydzień?

— Tak — mówi Paweł. — I to bez żadnej interakcji. Claude uruchamia się w runnerze GitHub, robi robotę i kończy.

---

## 6. Bezpieczeństwo w CI/CD

Kilka zasad, gdy uruchamiasz Claude Code w automatyzacji:

**API key w sekretach** — nigdy nie commituj klucza. Zawsze `${{ secrets.ANTHROPIC_API_KEY }}`.

**Ograniczone narzędzia** — dawaj Claude'owi tylko te narzędzia, których potrzebuje. `--allowedTools "Read,Grep"` do review. `--allowedTools "Read,Edit,Bash(npm test *)"` do fixowania testów.

**Max turns** — ustaw `--max-turns`, żeby Claude nie kręcił się w nieskończoność. 5-10 turnów na review, 15-20 na implementację.

**Koszty** — każde uruchomienie zużywa tokeny. Ustaw `--max-turns` i monitoruj zużycie w Console. Rozważ użycie `--model sonnet` (tańszy) zamiast opus w automatyzacji.

---

## 7. Zadania cykliczne i kontrola

### Cron w Claude Code

Claude Code obsługuje zadania cykliczne. Możesz zaprogramować Claude'a, żeby co godzinę sprawdzał stan projektu, codziennie generował raport, albo co tydzień robił przegląd zależności.

Zadania cykliczne możesz konfigurować w sesji interaktywnej — Claude zapyta o szczegóły i ustawi cron job, który uruchamia Claude Code w trybie nieinteraktywnym.

### Kontrola zadań cyklicznych

Jeśli nie chcesz, żeby użytkownicy (albo Claude) tworzyli zadania cron:

```json
{
  "env": {
    "CLAUDE_CODE_DISABLE_CRON": "1"
  }
}
```

To ustawienie (w `settings.json` lub managed settings) wyłącza funkcjonalność cron. Przydatne w środowiskach, gdzie automatyczne uruchamianie Claude'a jest niepożądane.

### Kontrola zadań w tle

Podobnie, jeśli chcesz wyłączyć background tasks:

```json
{
  "env": {
    "CLAUDE_CODE_DISABLE_BACKGROUND_TASKS": "1"
  }
}
```

---

## 8. Obsługa błędów i exit codes

W skryptach ważne jest, żeby wiedzieć, czy Claude zakończył pracę sukcesem.

### Exit codes

`claude -p` zwraca exit code 0 przy sukcesie. Przy błędzie — niezerowy. Możesz to wykorzystać w skryptach:

```bash
if claude -p "Run tests" --allowedTools "Bash(npm test *)"; then
  echo "Tests passed"
else
  echo "Tests failed or Claude encountered an error"
  exit 1
fi
```

### Timeout

Dodaj `--max-turns`, żeby Claude nie pracował w nieskończoność:

```bash
claude -p "Fix all lint errors" \
  --allowedTools "Read,Edit,Bash(npx eslint *)" \
  --max-turns 15
```

Jeśli Claude nie skończy w 15 turnach, zakończy pracę z informacją o tym.

### Łączenie z innymi narzędziami

Claude Code dobrze współpracuje z narzędziami, które już masz:

```bash
# Slack notification po review
result=$(claude -p "Review the latest commit" --output-format json | jq -r '.result')
curl -X POST "$SLACK_WEBHOOK" -d "{\"text\": \"$result\"}"

# Zapis do bazy
claude -p "Extract metrics from logs/app.log" \
  --output-format json \
  --json-schema '{"type":"object","properties":{"errors":{"type":"number"},"warnings":{"type":"number"}}}' \
  | jq '.structured_output' \
  | psql -c "COPY metrics FROM STDIN WITH (FORMAT json)"
```

Karina:

— Czyli mogę zbudować cały pipeline: Claude robi review, wynik idzie na Slacka, a metryki do bazy?

— Tak — mówi Paweł. — Claude to jedno ogniwo w łańcuchu. Wejście przez stdin, wyjście przez stdout. Reszta to standardowe narzędzia Unix.

---

## 9. Praktyczne przykłady

### Automatyczny commit z odpowiednim message

```bash
claude -p "Look at my staged changes and create an appropriate commit" \
  --allowedTools "Bash(git diff *),Bash(git log *),Bash(git status *),Bash(git commit *)"
```

### Analiza danych z CSV (Marta)

```bash
cat sales_q1.csv | claude -p "Analyze this sales data. Find top 3 products by revenue and any anomalies in the trend." \
  --output-format json | jq -r '.result' > analysis.md
```

### Monitoring zmian w repozytorium

```bash
#!/bin/bash
# Uruchamiany co godzinę przez cron

cd /path/to/project
changes=$(git log --oneline --since="1 hour ago")

if [ -n "$changes" ]; then
  echo "$changes" | claude -p "Summarize these recent commits and flag any that might need review" \
    --append-system-prompt-file ./review-criteria.md \
    --output-format json | jq -r '.result' >> /var/log/repo-monitor.log
fi
```

### Bulk processing dokumentów (Olek)

```bash
for doc in docs/*.md; do
  claude -p "Check this document for broken links, outdated information, and formatting issues. File: $doc" \
    --allowedTools "Read" \
    --output-format json | jq -r '.result' >> docs-review.md
  echo "---" >> docs-review.md
done
```

---

## Słowniczek

**Tryb nieinteraktywny (headless mode)** — uruchamianie Claude Code bez sesji interaktywnej, za pomocą flagi `-p`. Claude otrzymuje prompt, wykonuje zadanie i kończy. W dokumentacji opisywany też jako "SDK usage".

**`--allowedTools`** — flaga CLI określająca, jakie narzędzia Claude może używać bez pytania o zgodę w trybie nieinteraktywnym. Akceptuje składnię reguł uprawnień (np. `"Bash(git diff *)"`) ze spacją przed `*`.

**`--append-system-prompt`** — flaga CLI dodająca tekst do domyślnego system promptu Claude Code. Zachowuje oryginalne zachowanie (CLAUDE.md, skille, narzędzia) i dorzuca dodatkowy kontekst.

**`--output-format`** — flaga CLI kontrolująca format wyjścia: `text` (domyślnie), `json` (strukturalny), `stream-json` (streaming w czasie rzeczywistym).

**GitHub Action** — mechanizm automatyzacji w GitHub. Claude Code ma oficjalną akcję `anthropics/claude-code-action`, która pozwala uruchamiać Claude'a w odpowiedzi na eventy (PR, issue, schedule).

**CI/CD (Continuous Integration / Continuous Deployment)** — praktyka automatycznego budowania, testowania i wdrażania kodu. Claude Code integruje się z CI/CD przez tryb nieinteraktywny i GitHub Actions.

**Session ID** — unikalny identyfikator konwersacji. Pozwala kontynuować lub wznowić konkretną rozmowę za pomocą flagi `--resume`.

---

## Dokumentacja

- Tryb programistyczny (Agent SDK CLI): https://code.claude.com/docs/en/headless
- GitHub Actions: https://code.claude.com/docs/en/github-actions
- GitLab CI/CD: https://code.claude.com/docs/en/gitlab-ci-cd
- Referencja CLI: https://code.claude.com/docs/en/cli-reference

---

*W następnej lekcji: poznasz Agent Teams — sposób na koordynację wielu instancji Claude Code pracujących równolegle nad tym samym projektem.*
