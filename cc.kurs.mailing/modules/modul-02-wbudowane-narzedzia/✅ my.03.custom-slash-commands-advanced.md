# Custom Slash Commands - Advanced Workflow

> **📋 Uwaga terminologiczna:** Od Claude Code v2.1.3 terminy "custom slash commands" i "skills" są równoważne. Ta lekcja używa terminu "komenda", ale wszystko dotyczy również "skills". Pliki w `.claude/commands/*.md` działają identycznie jak skills. Natomiast, skile, są bardziej rozbudowane od slash commands i na ich temat porozmawiamy w kolejnych lekcjach.

## Od prostego skryptu do produkcyjnego narzędzia

Sara, project manager w średnim teamie developerskim, miała problem.

Każdy piątek o 15:00 robiła to samo:
1. Zbierała dane z różnych plików CSV (zadania, PR-y, metryki)
2. Kopiowała do Excela
3. Spędzała godzinę łącząc dane, segregując, tworząc podsumowanie
4. Wysyłała raport do zarządu

45 minut każdego piątku. Nie licząc frustracji, gdy jakiś plik miał inny format.

Po lekcji 11 Sara stworzyła komendę `/morning-check` dla porannych raportów. Działała świetnie. Zainspirowała ją to do stworzenia drugiej komendy: `/weekly-report` dla piątkowych raportów do zarządu. Claude czytał CSV, liczył podstawowe statystyki, generował raport. 10 minut zamiast 45.

To był świetny start. Ale to dopiero początek historii.

---

## Część 1: Wszystko działa... aż przestaje

Trzy tygodnie później Sara używała `/weekly-report` automatycznie. Wpisała komendę, wypiła kawę, raport gotowy.

Piątek, 14:50. Sara wpisuje:

```
/weekly-report sprint-data.csv
```

Claude odpowiada komunikatem błędu:

```
Error: [Errno 2] No such file or directory: 'sprint-data.csv'

Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
FileNotFoundError: [Errno 2] No such file or directory: 'sprint-data.csv'
```

(Ten komunikat oznacza, że plik nie został znaleziony - "Errno 2" to kod błędu systemu, "Traceback" to ślad wykonania pokazujący gdzie nastąpił problem, a "FileNotFoundError" to nazwa błędu)

Problem: Plik nazywał się `sprint_data.csv` (podkreślnik zamiast myślnika). Prosta literówka. Ale komenda po prostu... przestała działać.

Sara musiała:
1. Zgadnąć co poszło źle (5 min)
2. Znaleźć właściwą nazwę pliku (3 min)
3. Uruchomić ponownie

Stracone 8 minut + frustracja.

A tydzień później - gorzej. Kolega z zespołu zapisał plik w niewłaściwym katalogu. Claude wywala błąd. Znowu trzeba szukać przyczyny problemu.

### Optymalizacja przez nagłówki

Zanim Sara zacznie dodawać error handling, chce ograniczyć koszty - plik może być duży, a błędy mogą zużyć dużo tokenów.

Sara dodaje nagłówki (pamiętasz z lekcji 11?):

```markdown
---
model: haiku
allowed-tools:
  - Read
  - Bash(ls *)    # Pozwala na komendę "ls" z dowolnymi argumentami (* = wszystko)
---
```

**Dlaczego?** `model: haiku` używa prostszego modelu - podstawowa analiza nie wymaga Opus (10x tańsze), a `allowed-tools` daje uprawnienia bez pytania użytkownika (oszczędza czas).

**Wyjaśnienie składni:** `Bash(ls *)` oznacza "zezwól na użycie komendy bash `ls` z dowolnymi parametrami". Gwiazdka (`*`) to znak specjalny (wildcard), który oznacza "wszystko" lub "dowolny".

Szczegóły wszystkich opcji nagłówków znajdziesz w lekcji 11.

### Rozwiązanie: Obsługa błędów (Error Handling)

Sara otworzyła `.claude/commands/weekly-report.md` i przepisała komendę:

Przed:
```markdown
Generate weekly report from CSV: $ARGUMENTS

Steps:
1. Read $ARGUMENTS
2. Calculate metrics
3. Generate summary
4. Save as weekly-report.md
```

Po:
```markdown
Generate weekly report from CSV: $ARGUMENTS

## Step 1: Validation
1. Check if $ARGUMENTS is provided
   - If empty: "Error: Please provide CSV filename"
   - STOP execution

2. Try to Read $ARGUMENTS
   - If file not found:
     * Show: "Error: File not found: $ARGUMENTS"
     * Suggest: Search for similar filenames using Glob pattern: *.csv
     * List all CSV files in current directory
     * STOP execution
   - If file found: Continue

## Step 2: Data Processing
Try:
  - Read CSV
  - Calculate metrics (tasks completed, velocity, etc.)
Catch error:
  - Show: "Error reading CSV: [error message]"
  - Explain: "Check if file is valid CSV format"
  - STOP execution

## Step 3: Generate Report
- Create summary markdown
- Save as weekly-report-[date].md
- Show: "Report saved: weekly-report-2026-02-02.md"
```

1. Walidacja (sprawdzanie poprawności) argumentów:
```markdown
If empty: STOP + clear message
```

2. Sprawdzanie błędów (try-catch) dla każdej operacji:
```markdown
Try: Read file
Catch: Explain what broke + suggest fix
```

3. Pomocne komunikaty błędów:
```markdown
"Error: File not found"
vs
"Error: File not found: sprint-data.csv
Did you mean one of these?
- sprint_data.csv
- sprint-metrics.csv"
```

Następny piątek Sara pomyliła nazwę pliku. Claude powiedział:

```
Error: File not found: sprint-data.csv

Found similar files:
- sprint_data.csv
- sprint-metrics.csv
- tasks_data.csv

Which one did you mean?
```

30 sekund zamiast 8 minut szukania problemu. Zero frustracji.

---

## Część 2: Chaos w zespole - wszyscy używają inaczej

Sara podzieliła się komendą z zespołem. Dodała do `.claude/commands/` (projekt), wszyscy po `git pull` dostali `/weekly-report`.

Problem pojawił się szybko.

Janek (programista):
```
/weekly-report wszystkie-dane.txt
```
Claude próbował czytać `.txt` jako CSV. Błąd.

Marta (testerka):
```
/weekly-report dane.xlsx
```
Format Excel. Claude nie ma odpowiednich narzędzi do odczytu. Błąd.

Tomek (projektant):
```
/weekly-report
```
Brak argumentu. Błąd z niezrozumiałym komunikatem.

Każdy używał komendy po swojemu. Sara spędzała czas pomagając innym zamiast oszczędzać swój.

### Rozwiązanie: Walidacja + komunikat pomocy

Sara rozbudowała walidację:
```markdown
## Argument Validation

1. Check if $ARGUMENTS provided:
   - If empty:
     * Show help message:

       Usage: /weekly-report <filename.csv>

       Example:
         /weekly-report sprint-data.csv
         /weekly-report tasks/weekly-tasks.csv

       Supported format: CSV only
       Required columns: task_id, status, completed_date

     * STOP execution

2. Check file extension:
   - Extract extension from $ARGUMENTS
   - If NOT .csv:
     * Show: "Error: Only CSV files supported"
     * Show: "Your file: $ARGUMENTS (extension: [extension])"
     * Show: "Convert to CSV first or use /analyze-excel for Excel files"
     * STOP execution

3. Check file exists (previous step)

4. Validate CSV structure:
   - Read first row (headers)
   - Check for required columns: task_id, status, completed_date
   - If missing:
     * Show: "Error: Missing required columns"
     * Show: "Found columns: [list]"
     * Show: "Required columns: task_id, status, completed_date"
     * STOP execution
```

Kaskadowa walidacja (validation cascade): Każdy poziom sprawdzania dodaje pewność, że wszystko jest w porządku. Wczesne wyjścia (gdy coś nie tak) oszczędzają czas.

Tomek (designer) próbuje ponownie:
```
/weekly-report
```

Claude odpowiada:
```
Error: Please provide CSV filename

Usage: /weekly-report <filename.csv>

Example:
  /weekly-report sprint-data.csv
  /weekly-report tasks/weekly-tasks.csv

Supported format: CSV only
Required columns: task_id, status, completed_date
```

Tomek wie dokładnie co zrobić. Brak pytań do Sary.

Janek próbuje z .txt:
```
/weekly-report wszystkie-dane.txt
```

Claude odpowiada:
```
Error: Only CSV files supported
Your file: wszystkie-dane.txt (extension: .txt)

Convert to CSV first or use /analyze-excel for Excel files
```

Jasny komunikat, jasne rozwiązanie.

Metrics:
- Pytania do Sary: 5-7/tydzień → 0-1/tydzień
- Błędy użytkowników: spadek o 80%
- Sara oszczędza: 20 minut/tydzień na supportowaniu teamu

---

## Wzorce z przemysłu: Jak robią to najlepsi

Wiodące narzędzia CLI stosują sprawdzone wzorce error handling, które Sara może wykorzystać w swoich komendach:

### Git - Inteligentne sugestie

```bash
$ git comit
git: 'comit' is not a git command. See 'git --help'.

Did you mean this?
    commit
```

Git używa algorytmu **Damerau-Levenshtein** do sugerowania podobnych komend - jeden błąd literowy nie zatrzymuje pracy. Odległość edycyjna między słowami pozwala znaleźć najbliższe dopasowanie.

### NPM - Kontekst + rozwiązanie

```bash
$ npm install package
npm ERR! code EACCES
npm ERR! Error: EACCES: permission denied, access '/usr/local/lib'

This is usually caused by running npm without administrator privileges.
Fix: Run with sudo or configure npm to use a different directory.
See: https://docs.npmjs.com/resolving-eacces-permissions-errors
```

NPM wyjaśnia w strukturze: **co poszło źle** + **dlaczego** + **jak naprawić** + **link do dokumentacji**.

### Zastosowanie w `/weekly-report`

Sara wdraża te same zasady:

```markdown
## Enhanced Error Messages

When file not found:
1. Show what went wrong: "File not found: sprint-data.csv"
2. Suggest similar files (fuzzy match):
   - sprint_data.csv (1 char difference)
   - sprint-metrics.csv (similar pattern)
3. Provide actionable fix: "Check filename or run: ls *.csv"
4. Link to help: "See naming conventions: /help weekly-report"
```

**Twoja komenda powinna:**
- Sugerować alternatywy przy błędach (podobne pliki, poprawiona składnia)
- Dawać kontekst (nie tylko "błąd", ale "dlaczego" i "jak naprawić")
- Linkować do pomocy gdy błąd jest złożony
- Używać fuzzy matching dla nazw plików/argumentów

**Efekt:** Użytkownik naprawia problem w 30 sekund zamiast 5 minut szukania w dokumentacji.

---

## Część 3: Performance Problem - duże pliki spowalniają

Trzy miesiące później team rośnie. Z 5 osób do 15. Dane rosną:

Przed: `sprint-data.csv` = 200 rzędów, 50KB
Teraz: `sprint-data.csv` = 5000 rzędów, 500KB

Problem: `/weekly-report` zajmuje teraz 3 minuty zamiast 10 sekund.

Sara czeka, Claude "myśli"... Okazuje się: Claude ładuje cały plik do swojej pamięci roboczej zwanej kontekstem (context) - ograniczona przestrzeń, w której model przechowuje i przetwarza informacje. 500KB tekstu to około 120 tysięcy tokenów - małych jednostek tekstu, które model analizuje. To spowalnia wszystko.

### Rozwiązanie: Optymalizacja narzędzi - strategia dzielenia na fragmenty

Sara przepisała część przetwarzania z uwzględnieniem rozmiaru pliku:
```markdown
## Step 1.5: Size Detection and Strategy Selection

1. Check file size using Bash:
   ```
   ls -lh $ARGUMENTS
   ```

2. Based on size, select strategy:

   Strategy A: Small file (<1MB)
   - Read entire file at once
   - Process normally
   - Fast and simple

   Strategy B: Medium file (1-10MB)
   - Read in chunks (offset/limit)
   - Process in chunks of 1000 rows
   - Show progress: "Processing chunk 1/5..."
   - Combine results at the end

   Strategy C: Large file (>10MB)
   - Read first 100 lines (sample)
   - Read last 1000 lines (latest data)
   - Calculate metrics on sample
   - Mark in report: "Based on sample (first 100 + last 1000 rows)"

3. Inform user about selected strategy:
   - "File size: 500KB - using chunking strategy"
```

Dzielenie na fragmenty (chunking) dla średnich plików:
```markdown
## Step 2: Data Processing (medium files - chunked)

1. Count total rows:
   ```bash
   wc -l $ARGUMENTS
   ```

2. Calculate chunks:
   - Total rows: N
   - Chunk size: 1000
   - Number of chunks: N / 1000 rounded up

3. Process each chunk:

   FOR EACH chunk (FOR chunk_num IN 1 to num_chunks):
     a. Read chunk using offset/limit:
        - offset = (chunk_num - 1) * 1000
        - limit = 1000

     b. Extract metrics from chunk:
        - Tasks completed
        - Tasks in progress
        - Blockers

     c. Collect chunk results

     d. Show progress:
        "Processing chunk 3/5... (60% complete)"

4. Combine all chunks:
   - Sum completed tasks
   - Merge all blockers
   - Calculate averages

5. Generate final report
```

Piątek, 14:55. Sara uruchamia:
```
/weekly-report sprint-data.csv
```

Claude odpowiada:
```
File size: 500KB - using chunking strategy

Processing chunk 1/5... (20% complete)
Processing chunk 2/5... (40% complete)
Processing chunk 3/5... (60% complete)
Processing chunk 4/5... (80% complete)
Processing chunk 5/5... (100% complete)

Combining results...

Report saved: weekly-report-2026-02-02.md
Total time: 45 seconds
```

Wyniki:
- Czas przetwarzania: 3 minuty → 45 sekund (4x szybciej)
- Zużycie tokenów (pamięci roboczej): 120 tysięcy → ~15 tysięcy (8x mniej)
- Doświadczenie użytkownika: Widzi postęp, wie co się dzieje

Podobne wzorce dla przeszukiwania kodu przy użyciu narzędzia Grep (narzędzie do szukania tekstu w plikach):

```markdown
Search code for pattern: $ARGUMENTS

## Progressive refinement strategy:

1. First: counting mode
   - Grep with output_mode: count
   - See how many matches exist

2. Decision based on count:
   - If <50: output_mode: content (show all)
   - If 50-200: output_mode: files_with_matches (list files only)
   - If >200: Refine search pattern (too many results!)

3. Always use head_limit to constrain results:
   - head_limit: 100 (maximum)

Saves tokens (memory), never overloads context.
```

### Badania pokazują: Optymalne rozmiary fragmentów

Badania **NVIDIA** (2024-2025) nad strategiami chunking dla AI weryfikują podejście Sary:

**Kluczowe wyniki:**
- **Page-level chunking** osiąga najwyższą dokładność (0.648) z najmniejszą wariancją
- **256-512 tokenów** optymalnie dla zapytań wymagających konkretnych faktów
- **1024 tokeny** dla analiz wymagających szerszego kontekstu
- **Ekstrema (128 lub 2048 tokenów)** dają gorsze wyniki - za mało lub za dużo kontekstu

**Dla przetwarzania plików w chmurze (AWS S3 Best Practices):**
- **8-16MB** dla byte-range requests (optimum wydajności)
- **10-100MB** dla operacji na dużych dataset'ach
- **Tiered storage:** hot (SSD) dla nowych danych, cold (S3 Glacier) dla archiwum

**Zastosowanie w `/weekly-report` Sary:**
- Pliki **<1MB:** czytaj całość (szybko, proste, ~250K tokenów)
- **1-10MB:** chunking po 1000 rzędów (~200-500KB/chunk, ~50-125K tokenów)
- **>10MB:** sampling (pierwsze 100 + ostatnie 1000 rzędów dla trendów)

**Kluczowa zasada:** Chunk size zależy od typu operacji:
- Analiza szczegółowa → mniejsze chunki (większa precyzja)
- Trend analysis → większe chunki (więcej kontekstu)
- Search operations → adaptive (count → decide → constrain)

Źródła: [NVIDIA Research](https://developer.nvidia.com/blog/finding-the-best-chunking-strategy-for-accurate-ai-responses/), [Weaviate Guide](https://weaviate.io/blog/chunking-strategies-for-rag)

---

## Część 4: Wieloetapowy proces - równolegle zamiast po kolei

Sara chce rozbudować raport. Nie tylko tekst, ale też:
1. Wykresy (velocity trend, task distribution)
2. Export do PDF

Obecny przepływ pracy (po kolei):
```
1. Przetwórz CSV (45s)
2. Wygeneruj wykresy (60s)
3. Utwórz PDF (30s)
Razem: 2min 15s
```

Wszystko po kolei. Claude czeka na zakończenie każdego kroku.

### Rozwiązanie: Zadania równoległe + logika warunkowa

Sara przepisała komendę z fazami:
```markdown
## Phase 1: Validation and Preparation (sequential)
[Previous validation unchanged]

## Phase 2: Data Processing (sequential)
[Chunking strategy unchanged]

## Phase 3: Output Generation (parallel)

Now run these tasks SIMULTANEOUSLY (DO NOT wait for each to complete):

Task A: Generate Markdown Report
1. Create summary section
2. Add metrics tables
3. Add insights
4. Save: weekly-report-[date].md

Task B: Generate Charts
Run in parallel with Task A:
1. Create velocity chart
2. Create task distribution chart
3. Save charts: charts/velocity.png, charts/distribution.png

Task C: Prepare Stakeholder Data
Run in parallel with A and B:
1. Filter top 10 completed tasks
2. Extract blocker list
3. Save: stakeholders-summary.md

Wait for ALL tasks (A, B, C) to complete.

## Phase 4: Finalization (sequential)

After all parallel tasks complete:
1. Combine markdown report + charts
2. If user wants PDF:
   - Ask: "Generate PDF? (y/n)"
   - If yes: Use pandoc or similar tool
3. Final summary:
   - Report: weekly-report-2026-02-02.md
   - Charts: 2 files in charts/
   - Stakeholder summary: stakeholders-summary.md
   - PDF: weekly-report-2026-02-02.pdf (if requested)
```

Logika warunkowa (reagowanie na różne sytuacje):
```markdown
## Phase 4: Finalization

1. Combine report + charts

2. Ask user: "Generate PDF version? (y/n)"

   IF user responds "y":
     a. Check if pandoc is available:
        ```bash
        which pandoc
        ```
     b. If NOT found:
        - Show: "pandoc is not installed"
        - Show: "Install: brew install pandoc (macOS)"
        - Skip PDF generation
     c. If found:
        - Generate PDF
        - Show: "PDF saved: weekly-report.pdf"

   IF user responds "n":
     - Skip PDF
     - Show: "Skipping PDF generation"
```

Piątek, 14:55. Sara uruchamia:
```
/weekly-report sprint-data.csv
```

Claude odpowiada:
```
File size: 500KB - using chunking strategy
[Processing chunks... 45s]

Generating outputs (parallel):
- Markdown report... ✓ (30s)
- Charts (velocity + distribution)... ✓ (60s)
- Stakeholder summary... ✓ (25s)

All outputs ready in 60 seconds (limited by longest task)

Generate PDF version? (y/n)
```

Sara: `y`

```
PDF generated: weekly-report-2026-02-02.pdf

Summary:
✓ Report: weekly-report-2026-02-02.md
✓ Charts: charts/velocity.png, charts/distribution.png
✓ Stakeholder summary: stakeholders-summary.md
✓ PDF: weekly-report-2026-02-02.pdf

Total time: 2 minutes
```

Wyniki:
- Po kolei: 2min 15s
- Równolegle: 2min (uwzględniając najdłuższe zadanie = 60s wykresy + 45s przetwarzanie + 30s PDF)
- Przyśpieszenie: ~15% (w tym przypadku; dla bardziej zrównoważonych zadań może być 2-3x)

Inne wzorce:

```markdown
## Example 1: Conditional branching (switch-case)

Deploy to environment: $ARGUMENTS

Based on $ARGUMENTS value, select appropriate path:

CASE "dev":
  - Skip tests (fast iteration)
  - Deploy immediately
  - No approval needed

CASE "staging":
  - Run basic tests
  - Deploy if tests pass
  - Notify QA team

CASE "prod":
  - Full test suite (MUST PASS)
  - Ask for approval
  - Create release tag
  - Prepare rollback plan

DEFAULT (when no value matches):
  Error: Unknown environment
  Allowed: dev, staging, prod
```

```markdown
## Example 2: Loops with progress tracking

Process multiple files: $ARGUMENTS (comma-separated)

1. Split $ARGUMENTS by comma → array

2. FOR EACH file IN array:
   a. Check if file exists
   b. IF exists:
      - Process file
      - Collect result
   c. IF NOT exists:
      - Log warning
      - Continue to next
   d. Show progress: "Processed 3/7 files"

3. Summary:
   - Total: 7
   - Success: 6
   - Errors: 1
```

---

## Część 5: Production Ready - ostatnie szlify

Sara używa `/weekly-report` od 6 miesięcy. Team (teraz 20 osób) też. Komenda działa świetnie.

Ale Sara chce dodać ostatnie elementy:
1. Logging - śledzenie użycia (kto, kiedy, jaki plik)
2. Idempotency - safe do uruchomienia wielokrotnie
3. Better UX - helpful progress indicators

### Production Checklist

Sara dodała ostatnie elementy:

```markdown
## Production Features

1. Logging (Audit Trail)

After successful completion:
1. Log to file: .claude/logs/weekly-report.log
2. Format: [timestamp] [session_id] [user] [filename] [duration] [status]
3. Example:
   2026-02-02T14:55:30 abc123 sara sprint-data.csv 2m15s SUCCESS

Tip (v2.1.9+): Użyj `${CLAUDE_SESSION_ID}` w nazwie pliku logu dla korelacji sesji.

2. Idempotency Check

Before starting Phase 2:
1. Check if report already exists:
   - weekly-report-[today].md
2. If exists:
   - Ask: "Report for today already exists. Regenerate? (y/n)"
   - If no: STOP (safe, won't overwrite)
   - If yes: Continue (explicit consent)

3. Progress Indicators

During long operations:
- Show current step: "Step 2/4: Processing data..."
- Show estimated time: "(est. 45s remaining)"
- Show what's happening: "Reading chunk 3/5..."

4. Error Recovery

If ANY step fails:
1. Don't leave partial files
2. Show clear error with context
3. Suggest recovery action
4. Log error for debugging
```

Kompletna komenda produkcyjna:

```markdown
---
description: Production weekly report - comprehensive, validated, logged
argument-hint: [filename.csv]
model: sonnet
allowed-tools:
  - Read                           # Can read any files
  - Bash(ls *)                     # Can execute ls command with any parameters
  - Bash(wc *)                     # Can count lines in files
  - Write(weekly-report-*.md)      # Can write files weekly-report-[anything].md
  - Write(.claude/logs/*)          # Can write logs in .claude/logs/ directory
---

# /weekly-report - Production Version
# Purpose: Generate comprehensive weekly report from CSV data
# Usage: /weekly-report <filename.csv>
# Owner: Sara (PM team)
# Version: 5.0
# Last updated: 2026-02-02

Generate weekly report from CSV: $ARGUMENTS

## Phase 1: Validation and Preparation

1. Check if $ARGUMENTS provided:
   - If empty: Show help + examples, STOP

2. Check file extension:
   - If NOT .csv: Show error + suggestions, STOP

3. Check file exists:
   - If NOT found: Suggest similar files, STOP

4. Validate CSV structure:
   - Check required columns
   - If missing: Show what's needed, STOP

5. Idempotency check:
   - If report for today exists:
     * Ask: "Regenerate? (y/n)"
     * If no: STOP

## Phase 2: Size Detection & Data Processing

1. Check file size (ls -lh)

2. Choose strategy:
   - <1MB: Read at once
   - 1-10MB: Chunking
   - >10MB: Sampling

3. Process data:
   - Show progress for each chunk
   - Collect metrics
   - Handle errors gracefully

## Phase 3: Outputs (Parallel)

Run SIMULTANEOUSLY:

Task A: Markdown Report
- Summary, metrics, insights
- Save: weekly-report-[date].md

Task B: Charts
- Velocity trend
- Task distribution
- Save: charts/*.png

Task C: Stakeholder Summary
- Top 10 tasks
- Blockers
- Save: stakeholders-summary.md

Wait for all tasks.

## Phase 4: Finalization

1. Combine outputs

2. Ask: "Generate PDF? (y/n)"
   - If yes + pandoc available: Create PDF
   - If yes + no pandoc: Show install instructions
   - If no: Skip

3. Logging:
   - Write to .claude/logs/weekly-report.log
   - Format: [timestamp] [session_id] [user] [file] [duration] [status]
   - Optional: Use ${CLAUDE_SESSION_ID} for session correlation

4. Final summary:
   - List all generated files
   - Show total time
   - Success message

## Error Handling

If ANY error occurs:
- Don't leave partial files
- Log error details
- Show helpful message
- Suggest fix
```

---

## Część 6: Zadanie i Podsumowanie

### Zadanie: Rozbuduj swoją komendę z lekcji 11

Challenge: Weź jedną z komend, które stworzyłeś w lekcji 11, i dodaj:

1. Error handling:
   - Validation argumentów
   - Try-catch dla operacji
   - Helpful error messages

2. Performance optimization:
   - Size detection (dla plików)
   - Chunking strategy lub sampling
   - Progress indicators

Requirements:
- Minimum 2 poziomy walidacji
- Minimum 1 optimization
- Clear error messages z suggested fixes

Przykład:

Jeśli miałeś `/analyze-csv data.csv`, rozbuduj o:
- Walidację: plik istnieje? to CSV? ma wymagane kolumny?
- Wydajność: dzielenie na fragmenty dla plików >1MB
- Doświadczenie użytkownika: "Przetwarzanie fragmentu 2/5 (40% ukończone)"

Dostarcz:
- Pełną komendę (różnica przed/po)
- Test z różnymi scenariuszami (scenariusz bez błędów + scenariusze błędów)
- Wyniki: ile czasu oszczędzasz? jak poprawiło się doświadczenie użytkownika?

---

## Inne przykłady produkcyjnych komend

Advanced patterns z tej lekcji działają dla każdego białego kołnierzyka. Oto jak marketerzy i HR stosują te same techniki:

### Marketing: Campaign Performance Analyzer

**Problem:** Ania (marketing manager) analizuje 5 kampanii reklamowych co tydzień. Pobiera dane z Google Ads, Facebook Ads, LinkedIn - ręcznie łączy w Excel, tworzy pivot tables, wysyła raport. 2 godziny każdego poniedziałku.

**Komenda:** `/analyze-campaigns campaign-data.json`

**Advanced patterns zastosowane:**

```markdown
---
model: haiku
allowed-tools:
  - Read(*.json)
  - Bash(jq *)
  - Write(reports/*.md)
---

## Phase 1: Validation Cascade

1. Check if $ARGUMENTS provided
   - If empty: Show usage + examples of JSON structure

2. Validate JSON format
   - Use: jq . $ARGUMENTS
   - If invalid: Show parsing error + fix suggestions

3. Check required fields
   - Required: campaign_name, platform, spend, conversions, CTR
   - If missing: List what's needed + example

4. Cross-field validation
   - IF spend > 0 AND conversions = 0:
     * Warning: "Campaign {name}: $5,000 spent, 0 conversions"
     * Flag for review
   - IF CTR < 0.5%:
     * Warning: "Low CTR on {platform}: {CTR}% (industry avg: 2-3%)"

## Phase 2: Size-Based Strategy

1. Count campaigns: jq '. | length' $ARGUMENTS

2. Strategy selection:
   - <10 campaigns: Full analysis
   - 10-50: Batch processing (chunks of 10)
   - >50: Top/bottom performers only (sampling)

## Phase 3: Parallel Analysis

Run SIMULTANEOUSLY:

Task A: Calculate ROI metrics
- Cost per conversion
- ROAS (Return on Ad Spend)
- Best/worst performers

Task B: Generate trend charts
- Spend over time
- CTR trends
- Platform comparison

Task C: Create recommendations
- Budget reallocation suggestions
- Underperforming campaigns to pause
- Top performers to scale

## Phase 4: Error Recovery

IF API data missing for platform:
- Use cached data from previous week
- Mark in report: "[Facebook] Using cached data (API unavailable)"
- Continue with other platforms
```

**Wyniki:**
- 2 godziny → 15 minut (8x szybciej)
- Zero błędów w obliczeniach (wcześniej: 2-3 literówki/tydzień)
- Rekomendacje automatyczne (wcześniej: manual guesswork)

---

### HR: Interview Feedback Compiler

**Problem:** Bartek (HR manager) kompiluje feedback z 5-8 rozmów rekrutacyjnych tygodniowo. Każda rozmowa = 3-4 interviewerów = 15-30 notatek do przejrzenia, zsumowania, wyciągnięcia konsensusu. 3 godziny każdego piątku.

**Komenda:** `/compile-feedback candidate-name`

**Advanced patterns zastosowane:**

```markdown
---
model: sonnet
allowed-tools:
  - Glob(interviews/**/*.md)
  - Read
  - Write(feedback-reports/*.md)
---

## Phase 1: Smart Discovery + Validation

1. Find feedback files for candidate
   - Pattern: interviews/**/{candidate-name}*.md
   - Use Glob with fuzzy matching

2. Validate found files:
   - If 0 files: "No feedback found for {name}"
     * Suggest similar names: Did you mean: "Jan Kowalski" or "Jana Kowal"?
   - If <3 files: Warning: "Only {count} feedback files (expected 3-4)"
     * Ask: "Continue with partial data? (y/n)"

3. Check file structure:
   - Required sections: Technical Skills, Cultural Fit, Red Flags, Recommendation
   - If missing: Log warning, continue with available sections

## Phase 2: Idempotency Check

Before processing:
1. Check if report exists: feedback-reports/{candidate-name}-compiled.md
2. If exists + created today:
   - Ask: "Report for {name} already exists (created {time}). Regenerate? (y/n)"
   - If no: STOP (safe, won't overwrite)

## Phase 3: Parallel Aggregation

Run SIMULTANEOUSLY:

Task A: Score aggregation
- Average technical score (1-5 scale)
- Cultural fit consensus
- Identify outliers (one person rated 5, others 2)

Task B: Extract key quotes
- Top 3 positive comments
- All red flags (critical)
- Unique insights

Task C: Generate recommendation
- Hire/No-hire consensus
- Concerns to address
- Next steps

## Phase 4: Graceful Degradation

IF interviewer feedback incomplete:
- Mark: "[Interviewer: Jane] - Partial feedback (missing Cultural Fit)"
- Continue with available data
- Final report shows: "Based on 4/5 complete feedbacks"

IF conflicting recommendations (2 hire, 2 no-hire):
- Highlight conflict prominently
- Show reasoning from both sides
- Suggest: "Schedule discussion meeting"
```

**Wyniki:**
- 3 godziny → 20 minut (9x szybciej)
- Zero pominiętych red flags (wcześniej: 1-2/miesiąc przez manual oversight)
- Spójny format raportów (wcześniej: każdy raport inny)
- Archiwum z logami: `.claude/logs/feedback-compiler.log` dla compliance

**Metryki po 3 miesiącach:**
- 156 raportów wygenerowanych
- 468 godzin oszczędności (156 × 3h)
- 95% accuracy (5% wymaga ręcznych poprawek przy edge cases)

---

## Słowniczek

**Frontmatter (nagłówki)** - Opcjonalna sekcja na początku pliku `.md` (między `---`), definiuje parametry komendy. Podstawowe pola dla custom commands: description (opis w `/help`), argument-hint (wskazówka w autocomplete), model (haiku/sonnet/opus), allowed-tools (uprawnienia), disable-model-invocation (blokada auto-wywołania). Zaawansowane opcje dostępne tylko dla Skills (`.claude/skills/*/SKILL.md`, nie dla `.claude/commands/*.md`): context: fork (uruchamia skill w izolowanym subagent context), agent: [typ] (wybiera typ subagenta), hooks: (lifecycle hooks). Szczegóły Skills w module 9. Zobacz lekcję 11 dla szczegółów podstawowych pól.

**Multi-step workflow (wieloetapowy przepływ pracy)** - Komenda składająca się z wielu kroków wykonywanych po kolei (sekwencyjnie) lub równocześnie (równolegle), często z walidacją między fazami.

**Error handling (obsługa błędów)** - Wzorzec try-catch (spróbuj-przechwyć) w komendzie - sprawdzanie czy operacja się powiodła i obsługa błędów z czytelnym komunikatem oraz sugerowanym rozwiązaniem.

**Validation cascade (kaskadowa walidacja)** - Wielopoziomowe sprawdzanie poprawności (argumenty → plik → struktura → dane). Każdy poziom dodaje pewność, wczesne wyjścia przy błędzie oszczędzają czas.

**Chunking (dzielenie na fragmenty)** - Przetwarzanie dużych plików/danych w kawałkach zamiast wszystkiego na raz (all-at-once). Oszczędza pamięć (memory) i tokeny.

**Idempotency (idempotentność)** - Właściwość komendy, którą można uruchomić wiele razy bez efektów ubocznych (side effects). Sprawdza co już istnieje, tworzy tylko brakujące elementy, nie nadpisuje bez potwierdzenia.

**Progressive refinement (stopniowe doprecyzowywanie)** - Strategia dla wyszukiwania (Grep): najpierw policz wyniki (count), potem na podstawie liczby zdecyduj czy pokazać całą zawartość (content) czy tylko nazwy plików (files). Oszczędza tokeny.

**Graceful degradation (łagodna degradacja)** - Strategie awaryjne (fallback) gdy główne podejście zawiedzie: pełna analiza → próbka → podstawowa → błąd. Zawsze dostarcz COKOLWIEK, nawet jeśli nie jest to idealne rozwiązanie.

**Parallel execution (wykonywanie równoległe)** - Uruchomienie wielu zadań równocześnie (nie po kolei/sekwencyjnie). Całkowity czas = czas najdłuższego zadania. Przyśpieszenie 2-3x.

**Audit trail (ślad audytu)** - Rejestrowanie (logging) wszystkich kluczowych operacji do pliku (znacznik czasu, użytkownik, komenda, wynik). Przydatne do debugowania (znajdowania błędów), zgodności z przepisami i analityki.

**Helpful error messages (pomocne komunikaty błędów)** - Nie tylko "Błąd", ale: co poszło źle + dlaczego + jak naprawić + przykład. Konkretne (specific) i możliwe do wykonania (actionable).

**Size-based strategy (strategia oparta na rozmiarze)** - Wybór metody przetwarzania na podstawie rozmiaru danych: <1MB czytaj od razu (at once), 1-10MB dziel na fragmenty (chunking), >10MB próbkuj (sampling).

**Progress indicators (wskaźniki postępu)** - Pokazywanie postępu podczas długich operacji ("Step 3/5", "60% complete", "estimated 30s remaining"). Użytkownik wie co się dzieje.

**Conditional logic (logika warunkowa)** - Instrukcje IF-THEN-ELSE (JEŚLI-TO-W_PRZECIWNYM_RAZIE) w komendzie. Dostosowuje się do sytuacji: plik duży? → dziel na fragmenty; mały? → czytaj od razu.

**Sequential vs Parallel (sekwencyjne vs równoległe)** - Sekwencyjne: zadanie 1 → zadanie 2 → zadanie 3 (całkowity czas = suma). Równoległe: wszystkie naraz (całkowity czas = maksimum, czyli najdłuższe zadanie).

**Shorthand arguments (v2.1.19+)** - Uproszczona składnia dostępu do argumentów: `$0`, `$1`, `$2` jako skrót od pełnej składni bracket `$ARGUMENTS[0]`, `$ARGUMENTS[1]`, `$ARGUMENTS[2]`. Przykład: `/command arg1 arg2` → `$0` = "arg1", `$1` = "arg2". Obie składnie działają identycznie, shorthand jest zwięzły, bracket jawny. Szczegóły w lekcji 11.

---

Źródła:
- [Best practices](https://code.claude.com/docs/en/best-practices)
- [Common workflows](https://code.claude.com/docs/en/common-workflows)
- [Production commands](https://github.com/wshobson/commands)
- [Real-world automation](https://www.eesel.ai/blog/claude-code-workflow-automation)
- [Builder.io best practices](https://www.builder.io/blog/claude-code)
- [Custom commands guide](https://www.aiengineering.report/p/claude-code-custom-commands-3-practical)
- [Boris Cherny workflow](https://medium.com/vibe-coding/claude-codes-creator-100-prs-a-week-his-setup-will-surprise-you-7d6939c99f2b)
