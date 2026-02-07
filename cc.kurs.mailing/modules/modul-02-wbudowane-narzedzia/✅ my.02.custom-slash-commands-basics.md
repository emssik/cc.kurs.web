# Lekcja 11: Custom Slash Commands - Twoja pierwsza automatyzacja

Sara siedzi przy biurku z kawą. Jest 8:45, rano jak co rano. Otwiera trzy pliki CSV z danymi kampanii, Excel do przeliczenia konwersji, Notes do napisania raportu dla CEO. 45 minut później ma gotowe 3 zdania podsumowania. Codziennie.

Dziś Sara odkryje, że można inaczej.

---

## Mała powtórka - built-in commands

Pamiętasz z poprzednich lekcji komendy wbudowane w Claude Code? `/help`, `/compact`, `/clear`, `/context`, `/init`, `/config` - działają od razu, bez konfiguracji.

Sara wpisuje `/help` i widzi listę. W sekcji "Custom" jest pusto. "Custom commands" - brzmi jak coś, co można dodać. Zastanawia się: "Czy mogę zautomatyzować swój poranek?"

Może.

---

## Część 1: Pierwszy krok - prosta komenda

Sara tworzy plik:

```bash
mkdir -p ~/.claude/commands
nano ~/.claude/commands/morning-check.md
```

Zawartość to prosty opis w naturalnym języku:

```markdown
Przeczytaj pliki w katalogu ~/campaigns/daily/:
- facebook-metrics.csv
- google-ads.csv
- newsletter-opens.csv

Dla każdego wyciągnij:
- Liczba konwersji
- CTR
- Koszt na konwersję

Podsumuj w 3 bullet points dla CEO.
Format: "Facebook: 47 konwersji, CTR 3.2%, 23zł/konwersja"
```

Zapisuje. Wraca do Claude Code.

```bash
Sara: /morning-check

Claude:
Czytam dane z kampanii...

Facebook: 47 konwersji, CTR 3.2%, 23zł/konwersja
Google Ads: 62 konwersji, CTR 2.8%, 31zł/konwersja
Newsletter: 12 konwersji, OR 24%, 8zł/konwersja

Gotowe! Potrzebujesz szczegółów?
```

15 sekund zamiast 45 minut.

Sara patrzy na ekran. To działa.

---

## Jak to działa?

**Custom slash command** to:
- Prosty plik `.md` (markdown)
- Instrukcje w naturalnym języku
- Nie musisz pisać kodu
- Claude wykonuje workflow automatycznie

**Lokalizacja:**
- `~/.claude/commands/` - tylko dla Ciebie, wszystkie projekty
- `.claude/commands/` - dla całego teamu, commitowane do git

**Mechanizm:**
- Nazwa pliku = nazwa komendy
- `morning-check.md` → `/morning-check`
- Hot reload - edytujesz plik, komenda działa od razu

Sara właśnie oszczędziła 15 minut dziennie. 5 godzin miesięcznie. 60 godzin rocznie.

---

## Część 2: Nagłówki (Frontmatter) - konfiguruj swoją komendę

Tydzień później Sara odkrywa, że komendy można konfigurować przez nagłówki.

### Co to są nagłówki?

**Nagłówki (frontmatter)** to opcjonalna sekcja na początku pliku `.md`, otoczona trzema myślnikami `---`, zawierająca parametry komendy: model, hinty, limity.

**Przykład:**

```markdown
---
description: Analiza danych z pliku CSV
argument-hint: [filename.csv]
model: haiku
---

Przeczytaj plik: $ARGUMENTS
Wyciągnij metryki i podsumuj w 3 punkty.
```

### Dostępne parametry

**description** - Opis komendy:
```markdown
---
description: Generuje tygodniowy raport z CSV
---
```

**argument-hint** - Wskazówka o argumentach:
```markdown
---
argument-hint: [filename.csv]
---
```

**model** - Który model użyć:
```markdown
---
model: haiku
---
```
- `sonnet` - domyślny, najlepszy balans (Sonnet 4.5)
- `opus` - najsilniejszy, dla złożonych zadań (Opus 4.5)
- `haiku` - najszybszy i najtańszy (Haiku 4)

**allowed-tools** - Uprawnienia do narzędzi:
```markdown
---
allowed-tools:
  - Bash(git *)
  - Read(*.csv)
---
```

**disable-model-invocation** - Claude nie uruchomi tej komendy automatycznie. Musisz ją wywołać ręcznie.
```markdown
---
disable-model-invocation: true
---
```
Użyj dla komend, które zmieniają dane: git commit, deployment, usuwanie plików.

**Przykład praktyczny - szybka analiza:**

```markdown
---
description: Szybka analiza CSV - podstawowe statystyki
argument-hint: [filename.csv]
model: haiku
---

Quick analysis: $ARGUMENTS

1. Dataset overview (rows, columns)
2. Missing values
3. Top 5 insights

Keep it brief, use tables.
```

Sara testuje:
```bash
Sara: /quick-analysis data.csv

Claude (haiku):
Dataset: 1,250 rows × 8 columns
Missing: 2.3%
Top insight: Sales trend ↑ 15% vs last month

[Szybko, tanie, wystarczające dla quick check]
```

**Przykład - kompleksowa analiza:**

```markdown
---
description: Głęboka analiza z rekomendacjami strategicznymi
argument-hint: [dataset.csv]
model: opus
---

Deep analysis: $ARGUMENTS

1. Comprehensive EDA
2. Statistical tests
3. Segment analysis
4. Predictive insights
5. Strategic recommendations

Use all available tools, be thorough.
```

**Kiedy używać którego modelu?**

- **haiku** → Proste, powtarzalne taski (format CSV, check syntax, list files)
- **sonnet** → Standard, większość komend (analyze, generate report, review code)
- **opus** → Złożone problemy (architecture decisions, complex refactoring, deep analysis)

Sara tworzy dwie komendy:
- `/quick-check` (haiku) - codzienne sprawdzenie danych (5s, tanie)
- `/deep-analysis` (opus) - miesięczna analiza strategiczna (2 min, dokładne)

Domyślnie wszystkie komendy używają modelu głównego (sonnet). Nagłówki potrzebne tylko gdy chcesz zmienić ustawienia.

---

## Część 3: Argumenty - dodajemy elastyczność

Tydzień później. Sara chce raport nie tylko poranny - czasem potrzebuje sprawdzić dane z wczoraj, z zeszłego tygodnia, z konkretnej kampanii.

Edytuje plik:

```markdown
Przeczytaj dane z pliku: $ARGUMENTS

Wyciągnij:
- Liczba konwersji
- CTR
- Koszt na konwersję

Podsumuj w 3 bullet points.
```

Teraz może:

```bash
Sara: /morning-check facebook-metrics.csv
Claude: Facebook: 47 konwersji...

Sara: /morning-check google-ads-last-week.csv
Claude: Google Ads (ostatni tydzień): 312 konwersji...
```

**$ARGUMENTS explained:**
- Wszystko po nazwie komendy → wstawia się w `$ARGUMENTS`
- `/morning-check plik.csv` → `$ARGUMENTS` = "plik.csv"
- Nie musisz quotować, spacje działają: `/morning-check dane z wczoraj.csv`

---

## Część 4: Pozycyjne argumenty - dla bardziej złożonych przypadków

Sara chce więcej - teraz potrzebuje porównać dwie kampanie i zdecydować którą kontynuować.

**`~/.claude/commands/compare-campaigns.md`**
```markdown
Compare two campaigns: $0 vs $1

Read both files, then provide:

1. Side-by-side metrics (conversions, CTR, cost)
2. Winner in each category
3. Recommendation: which to continue and why

Format as comparison table.
```

Użycie:
```bash
Sara: /compare-campaigns facebook-jan.csv google-jan.csv

Claude:
| Metric | Facebook | Google Ads | Winner |
|--------|----------|------------|--------|
| Conversions | 47 | 62 | Google |
| CTR | 3.2% | 2.8% | Facebook |
| Cost/conv | 23zł | 31zł | Facebook |

Recommendation: Continue Facebook campaign.
Reasoning: Lower cost per conversion (23zł vs 31zł) with higher CTR.
```

**$0, $1, $2 - positional arguments:**
```bash
/command arg1 arg2 arg3
→ $0 = "arg1"
→ $1 = "arg2"
→ $2 = "arg3"
```

Zasada wyboru:
- Jeden input → `$ARGUMENTS`
- Kilka konkretnych części → `$0, $1, $2`

---

## Część 5: Skalowanie - team adoptuje Sarę

Tydzień później. Marek z zespołu pyta Sarę: "Widziałem Twój raport o 8:50. Jak robisz to tak szybko?"

Sara pokazuje `/morning-check`. Marek: "Czy mogę też?"

Sara przenosi komendę do projektu:

```bash
cd ~/marketing-team/
mkdir -p .claude/commands
cp ~/.claude/commands/morning-check.md .claude/commands/

# Commit do git
git add .claude/commands/
git commit -m "Add /morning-check command for team"
git push
```

Marek robi `git pull` → automatycznie dostaje `/morning-check`.

**Zespół teraz ma:**
- Wspólne komendy w `.claude/commands/` (dla wszystkich)
- Osobiste w `~/.claude/commands/` (tylko dla siebie)

---

### Organizacja komend w subdirectories

Za miesiąc team ma 15 komend. Zaczyna być bałagan. Sara organizuje:

```
.claude/commands/
├── marketing/
│   ├── report.md
│   ├── campaign.md
│   └── social.md
├── analytics/
│   ├── quick-csv.md
│   ├── compare.md
│   └── monthly.md
└── content/
    ├── blog.md
    └── email.md
```

**Ważne:** Katalogi służą tylko do organizacji plików. Nazwa komendy pochodzi z nazwy pliku, nie ze ścieżki.

**Jak to faktycznie działa:**
- `marketing/report.md` → komenda `/report` (nie `/marketing:report`!)
- `analytics/report.md` → też `/report` (konflikt nazw!)

**Rozwiązywanie konfliktów:**
Gdy masz dwa pliki o tej samej nazwie w różnych katalogach, Claude rozróżnia je w `/help`:
```
/report (project:marketing)
/report (project:analytics)
```

**Lepsze podejście - namespace w nazwie pliku:**
Zamiast polegać na strukturze katalogów, użyj nazw z prefiksem:

```
.claude/commands/
├── marketing-report.md      → /marketing-report
├── marketing-campaign.md    → /marketing-campaign
├── analytics-quick-csv.md   → /analytics-quick-csv
├── analytics-compare.md     → /analytics-compare
└── content-blog.md          → /content-blog
```

Teraz łatwiej zapamiętać i nie ma konfliktów:
```bash
Sara: /marketing-report
Kasia: /analytics-quick-csv
Tom: /content-blog
```

**Nota o składni z dwukropkiem:**
Składnia `/nazwa:komenda` (np. `/claude-dashboard:setup`) jest charakterystyczna dla **pluginów** instalowanych z marketplace, nie dla lokalnych custom commands. Jeśli bardzo zależy Ci na takiej składni, musisz spakować komendy jako lokalny plugin z plikiem `plugin.json`.

---

### Priority hierarchy

Co jeśli masz `/morning` w obu lokalizacjach?

```
Personal (~/.claude/commands/morning.md)
vs
Project (.claude/commands/morning.md)
```

**Claude wybiera:** Project > Personal

**Pełna hierarchia:**
1. Enterprise (managed settings) - najwyższy priorytet
2. Project (`.claude/commands/`) - team
3. Personal (`~/.claude/commands/`) - Ty

Konflikt tylko gdy ta sama nazwa. Różne komendy współistnieją spokojnie.

**Przykład:**
```
Enterprise: /security-check (wymuszony przez firmę)
Project: /morning (team workflow)
Personal: /quick-break (Twoje przypomnienie o przerwie)
```

Wszystkie działają. `/security-check` nadpisuje ewentualną komendę project/personal o tej samej nazwie.

---

## Część 6: Przykłady dla różnych ról

**Marketing Manager:**
```markdown
---
description: Generuj tygodniowy raport kampanii
model: sonnet
allowed-tools:
  - Read(~/campaigns/**/*)
---

Generate weekly marketing report.
Read: ~/campaigns/this-week/*.csv
Include: conversions, top campaign, recommendations
Format: 1-page markdown
```

**Developer:**
```markdown
---
description: Szybki commit workflow
argument-hint: [commit-message]
model: haiku
allowed-tools:
  - Bash(git *)
---

Review changes, create logical commits, generate PR description.
Use Conventional Commits format.
```

**Data Analyst:**
```markdown
---
description: Kompleksowa eksploracja danych
argument-hint: [dataset.csv]
model: opus
---

Exploratory data analysis: $ARGUMENTS
Stats, distributions, correlations, outliers
Generate: 5 insights + 3 visualizations
```

**HR Manager:**
```markdown
---
description: Screen CV dla pozycji
argument-hint: [cv-filename.pdf]
model: sonnet
---

Screen CV: $ARGUMENTS
Evaluate: skills, experience, education, red flags
Score (0-10) with reasoning and recommendation
```

---

## Autocomplete i Hot Reload

### Autocomplete

Wpisz `/` → widzisz menu:
```
/
├── help
├── compact
├── clear
├── morning          ← twój custom
├── marketing:report ← twój custom
└── analytics:eda    ← twój custom
```

Zacznij pisać → filtruje:
```
/mor
└── morning
```

Nawigacja:
- `↑↓` arrows: wybór
- `Enter`: wykonaj
- `Tab`: autocomplete name

Działa nawet w środku zdania:
```
✓ /morning-check
✓ First /quick-csv then send report
✓ Can you /marketing:report this week?
```

---

### Hot Reload

Edytujesz plik → działa od razu. Bez restartu, bez czekania. Zmieniasz, testujesz, poprawiasz natychmiast.

**Iterative development:**
```bash
# Edit
nano ~/.claude/commands/test.md

# Test immediately
/test

# Tweak
nano ~/.claude/commands/test.md

# Test again
/test

# Perfect!
```

Sara rozwija komendy na żywo. Widzi rezultat, poprawia, testuje znowu. W 5 minut ma działającą komendę.

---

## Część 7: Best Practices - czego nauczyła się Sara

### DO

**1. Descriptive names**
```
✓ /review-security
✓ /generate-monthly-report
✓ /screen-candidates

✗ /rs
✗ /gmr
✗ /sc
```

**2. Clear instructions**
```markdown
✓ Good:
1. Read the file
2. Analyze for X, Y, Z
3. Generate report with format A
4. Save as output.md

✗ Bad:
Do stuff with the file
```

**3. Use $ARGUMENTS for flexibility**
```markdown
✓ Analyze $ARGUMENTS
✗ Analyze sales-data.csv (hardcoded!)
```

**4. Include examples**
```markdown
Process data: $ARGUMENTS

Example usage:
  /process-data sales.csv
  /process-data inventory-2025.xlsx
```

**5. Specify output format**
```markdown
Generate report with:
- Markdown tables
- Section headers
- Bullet points for key findings

Save as: report-[date].md
```

---

### DON'T

**1. Vague names**
```
✗ /do-stuff
✗ /x
✗ /thing
```

**2. Too complex - split it!**
```markdown
✗ One command that:
- Analyzes data
- Creates charts
- Generates report
- Sends email
- Updates database

Split into:
/analyze-data
/create-charts
/generate-report
/send-report
```

**3. Hardcoded values**
```markdown
✗ Analyze sales-2025.csv
✓ Analyze $ARGUMENTS
```

**4. Destructive without confirmation**
```markdown
✗ Clean up: remove all .tmp files

✓ Clean up temporary files.
First show what will be removed.
Ask for confirmation.
```

**5. No error handling**
```markdown
✗ Run tests

✓ Run tests.
If any test fails:
- Show failed test names
- Show error messages
- Suggest fixes if obvious
- Do NOT proceed with deployment
```

---

## Troubleshooting

### Problem: "Command not found"

**Symptom:** `/my-command` → Claude nie widzi

**Check:**
```bash
/help
→ Czy command jest na liście?

# Check file location
ls ~/.claude/commands/my-command.md
ls .claude/commands/my-command.md
```

**Rozwiązania:**
1. Check file name - must be `.md`, no spaces
2. Wait 1-2 seconds for hot reload
3. Try `/help` to refresh
4. Restart Claude Code (rzadko potrzebne)

---

### Problem: "$ARGUMENTS not working"

**Symptom:** Shows literal "$ARGUMENTS" instead of value

**Solutions:**
1. Check placement - use in markdown body, NOT in YAML frontmatter
2. No special formatting - `$ARGUMENTS` not `\$ARGUMENTS`
3. Test: `/my-command test123` → should see "test123" in output

---

### Problem: "Command unexpected behavior"

**Solution:** Be more explicit

```markdown
✗ Vague:
Review the code

✓ Explicit:
Review the code for:
1. Security (SQL injection, XSS)
2. Performance (N+1 queries, inefficient loops)
3. Code style (project conventions)

Output: markdown list with severity levels
```

Add examples of good output:
```markdown
Example:

## Security Issues
- [HIGH] SQL injection risk at line 45
- [MEDIUM] Missing input validation at line 67
```

---

### Problem: "Works for me, not for team"

**Symptom:** Command w `~/.claude/commands/` → tylko Ty widzisz

**Solution:**
```bash
# Move from personal to project
mv ~/.claude/commands/test.md .claude/commands/

# Commit to git
git add .claude/commands/test.md
git commit -m "Add /test command for team"
git push

# Team pulls and gets it
```

---

### Problem: "Too many commands"

**Symptom:** `/help` shows 50+ commands, overwhelming

**Solution:** Użyj prefiksów w nazwach plików

```
.claude/commands/
├── dev-test.md        → /dev-test
├── dev-build.md       → /dev-build
├── dev-deploy.md      → /dev-deploy
├── qa-smoke.md        → /qa-smoke
├── qa-regression.md   → /qa-regression
├── ops-logs.md        → /ops-logs
└── ops-metrics.md     → /ops-metrics
```

Możesz dodatkowo organizować w katalogach (dla porządku w plikach), ale nazwy komend pochodzą z nazw plików:

```
.claude/commands/
├── dev/
│   ├── dev-test.md        → /dev-test
│   ├── dev-build.md       → /dev-build
│   └── dev-deploy.md      → /dev-deploy
└── qa/
    ├── qa-smoke.md        → /qa-smoke
    └── qa-regression.md   → /qa-regression
```

Teraz: `/dev-test`, `/qa-smoke`, `/ops-logs` - kategorie jasne!

---

## Zadanie praktyczne

**Challenge:** Stwórz 2-3 custom commands dla swojej roli

**Requirements:**
- Minimum 1 używa `$ARGUMENTS` lub pozycyjne argumenty
- Minimum 1 ma nagłówki (description/model/allowed-tools)
- Zapisz w `.claude/commands/` lub `~/.claude/commands/`
- Przetestuj każdy

**Przykłady startowe:**

**Programista:**
```markdown
---
description: Szybki morning setup
argument-hint: [feature-name]
model: haiku
allowed-tools:
  - Bash(git *)
---
Morning dev routine: git status → pull → create branch feature/[date]-$ARGUMENTS
```

**Marketer:**
```markdown
---
description: Brief kampanii marketingowej
argument-hint: [campaign-name]
model: sonnet
---
Create campaign brief: $ARGUMENTS
Include: goals, audience, channels, timeline, KPIs
```

**Analityk:**
```markdown
---
description: Głęboka eksploracja danych
argument-hint: [dataset.csv]
model: opus
---
Exploratory data analysis: $ARGUMENTS
Stats, distributions, correlations, outliers, 5 insights + 3 visualizations
```

---

## Co Sara osiągnęła

6 miesięcy po pierwszym `/morning-check`:

**Sara oszczędza:**
- 4h/tydzień na raportach
- 2h/tydzień na analizach kampanii
- 1h/tydzień na brief'ach

**Zespół adoptował:**
- 12 komend Sary
- Każdy dodał swoje (Tom 8, Kasia 6)
- 25 komend w `.claude/commands/`

**Rezultat:**
- Szybsze reakcje na dane
- Więcej czasu na strategię
- Mniej powtarzalnej pracy

Sara nie spędza już 45 minut na porannym raporcie. Teraz planuje nowe kampanie. Claude zajmuje się rutyną.

---

## Słowniczek

**Custom slash command** - Twój własny skrót dla Claude: plik `.md` z instrukcjami. Wpiszesz `/nazwa`, Claude wykonuje workflow.

**Built-in commands** - Komendy wbudowane w Claude Code (/help, /compact, /clear). Działają od razu, bez konfiguracji.

**Frontmatter (nagłówki)** - Sekcja na początku pliku `.md` (między `---`) z parametrami komendy. Opcjonalne ustawienia: description, argument-hint, model, allowed-tools, disable-model-invocation.

**$ARGUMENTS** - Placeholder w komendzie, zastępowany tym co wpiszesz po nazwie. `/command hello` → `$ARGUMENTS` = "hello".

**$0, $1, $2** - Positional arguments. `/command arg1 arg2 arg3` → `$0` = "arg1", `$1` = "arg2", `$2` = "arg3".

**Personal commands** - Komendy w `~/.claude/commands/`. Tylko dla Ciebie, działają we wszystkich projektach.

**Project commands** - Komendy w `.claude/commands/`. Dla całego teamu, commitowane do git, dzielone automatycznie.

**Hot reload** - Feature pozwalający edytować command file i używać od razu, bez restartu Claude Code.

**Autocomplete** - Menu pokazujące dostępne komendy po wpisaniu `/`. Nawigacja strzałkami, tab do uzupełnienia.

**Subdirectories** - Organizacja plików komend w foldery dla porządku. Nie wpływają na nazwę komendy - komenda pochodzi z nazwy pliku. `marketing/report.md` → `/report` (nie `/marketing:report`). Aby uzyskać efekt namespace, użyj prefiksu w nazwie pliku: `marketing-report.md` → `/marketing-report`.

**Priority hierarchy** - Kolejność nadpisywania komend: Enterprise > Project > Personal. Konflikt tylko przy tej samej nazwie.

---

## Co dalej?

W następnej lekcji poznasz zaawansowane workflow z custom slash commands:

- Multi-step workflows (sekwencyjne i równoległe)
- Conditional logic (if-then-else w komendach)
- Error handling i rollbacks
- Tool-specific optimizations
- Real-world production examples
- Team collaboration patterns

Do zobaczenia w **Lekcji 12: Custom Slash Commands - Zaawansowane Workflow**!

---

## Źródła

- [Interactive mode - built-in commands](https://code.claude.com/docs/en/interactive-mode)
- [CLI reference](https://code.claude.com/docs/en/cli-reference)
- [eesel.ai slash commands guide](https://www.eesel.ai/blog/claude-code-slash-commands)
- [Complete guide to slash commands](https://www.eesel.ai/blog/slash-commands-claude-code)
- [Shipyard cheat sheet](https://shipyard.build/blog/claude-code-cheat-sheet/)
- [alexop.dev guide](https://alexop.dev/posts/claude-code-slash-commands-guide/)
- [Production-ready commands](https://github.com/wshobson/commands)
- [Awesome Claude Code](https://github.com/hesreallyhim/awesome-claude-code)
- [Custom commands examples](https://www.aiengineering.report/p/claude-code-custom-commands-3-practical)
- [Builder.io tips](https://www.builder.io/blog/claude-code)
- [Best practices](https://htdocs.dev/posts/claude-code-best-practices-and-pro-tips/)
