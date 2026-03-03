---
lesson: "03.02"
title: "Skalowanie wiedzy — references, scripts i dynamiczny kontekst"
description: "Jak dodać skillowi bazę wiedzy, skrypty wykonawcze i dynamiczny kontekst bez zapychania okna modelu"
module: "03-skille"
---

# Skalowanie wiedzy -- references, scripts i dynamiczny kontekst

Minął tydzień od pierwszej lekcji. Karina i Olek wreszcie mieli czas przetestować swoje skille w praktyce. Spotkali się z Pawłem na porannej kawie, ale zamiast small talku od razu przeszli do rzeczy.

-- Paweł, mam problem -- zaczyna Karina. -- Mój code-review skill działa, ale... rozrasta się. Zaczęłam dopisywać do SKILL.md nasze konwencje TypeScript, potem zasady Next.js, potem checklistę bezpieczeństwa, potem standardy nazewnictwa. Jest już 300 linii. I wiesz co? Claude zaczyna gubić szczegóły. Kilka razy pominął regułę bezpieczeństwa, bo skupił się na nazewnictwie.

Olek kiwa głową.

-- Mam dokładnie to samo. Wrzuciłem cały brand guide do jednego pliku. Kolory, typografia, ton komunikacji, szablony slajdów... Claude "zapomina" o kolorach firmy gdy skupia się na treści prezentacji. Jakby nie ogarniał wszystkiego naraz.

Paweł odstawia kawę.

-- I to jest dokładnie ten moment, o którym myślałem. Pamiętacie z poprzedniej lekcji Progressive Disclosure? Że Claude ładuje skilla warstwami? No to teraz pora skorzystać z trzeciej warstwy -- zasobów na żądanie. Pokażę wam trzy narzędzia, które rozwiążą ten problem: references, scripts i dynamiczny kontekst.

---

## Co wyniesiesz z tej lekcji

Po tej lekcji:

- Rozbijesz przeładowany SKILL.md na mniejsze pliki referencyjne, po które Claude sięgnie samodzielnie, gdy będzie ich potrzebował.
- Dodasz do skilla skrypty wykonawcze -- gotowe komendy Bash, które Claude uruchomi zamiast wymyślać je sam.
- Użyjesz mechanizmu shell injection do wstrzykiwania aktualnych danych (np. listy zmienionych plików) prosto do instrukcji skilla.
- Zbudujesz strukturę katalogów, w której wiedza skilla jest podzielona tematycznie i łatwa do aktualizacji.
- Zrozumiesz dlaczego "mniej w głównym pliku" oznacza "lepsze wyniki od modelu".

---

## references/ -- baza wiedzy na żądanie

### Problem: wszystko w jednym pliku

Gdy SKILL.md ma 300 linii, Claude musi przeczytać je wszystkie naraz. Każda linia zajmuje tokeny w oknie kontekstowym. Im więcej tekstu, tym trudniej modelowi skupić się na tym, co w danej chwili naprawdę istotne. To jak czytanie encyklopedii od deski do deski, żeby znaleźć jeden przepis.

### Rozwiązanie: folder references/

Folder `references/` to osobna "biblioteczka" skilla. Zasada jest prosta:

- Każdy plik w `references/` to jeden temat (np. konwencje TypeScript, zasady bezpieczeństwa, brand guide).
- W SKILL.md linkujesz do tych plików i opisujesz, kiedy Claude ma po nie sięgnąć.
- Claude widzi ścieżki do plików referencyjnych, ale **czyta je dopiero wtedy, gdy ich potrzebuje**.

To jest właśnie trzeci poziom Progressive Disclosure -- zasoby ładowane na żądanie. Claude nie wczytuje całej biblioteczki na start. Sięga po konkretny plik dopiero w momencie, gdy wykonuje zadanie, które tego wymaga.

Jeden temat = jeden plik. Dzięki temu:

- Łatwiej aktualizujesz wiedzę (zmieniły się zasady nazewnictwa? Edytujesz jeden plik, nie przeszukujesz 300-liniowego moloch).
- Claude ładuje tylko to, co potrzebne (review pliku z bazą danych? Czyta security-checklist.md. Review komponentu React? Czyta nextjs-patterns.md. Nie oba naraz).
- SKILL.md pozostaje krótki i czytelny -- to mapa, nie encyklopedia.

---

## Projekt 1: references/ dla code-review

Karina otwiera laptop.

-- Okej, to co mam zrobić?

-- Rozbij swoją wiedzę na osobne pliki -- mówi Paweł. -- Zacznij od trzech tematów, które teraz trzymasz w jednym SKILL.md.

Po kilku minutach struktura wygląda tak:

```
.claude/skills/code-review/
├── SKILL.md
└── references/
    ├── typescript-conventions.md
    ├── nextjs-patterns.md
    └── security-checklist.md
```

### Zaktualizowany SKILL.md

Karina wyrzuca z SKILL.md 250 linii szczegółowych reguł i zastępuje je linkami:

```yaml
---
name: code-review
description: "TypeScript/Next.js code quality reviewer. Use when reviewing code changes, before commits, or when asked to check code quality."
argument-hint: "[file-or-directory-path]"
---
```

```markdown
You are a code reviewer for a TypeScript/Next.js project.

## Your knowledge base

When reviewing code, consult these references as needed:
- For TypeScript naming, types, and style rules, see [typescript-conventions.md](references/typescript-conventions.md)
- For Next.js routing, data fetching, and component patterns, see [nextjs-patterns.md](references/nextjs-patterns.md)
- For security issues (injection, auth, secrets), see [security-checklist.md](references/security-checklist.md)

## Review process

1. Read the target files specified by the user
2. Identify what kind of code you are reviewing (component, API route, utility, etc.)
3. Load the relevant reference files based on what you find
4. Check against the conventions in those references
5. Generate a structured report with sections: Critical, Warning, Suggestion
6. For each finding, include: file path, line number, rule violated, and a fix

## Output format

Use this structure for your report:

### Critical (must fix before merge)
- [file:line] Description of the issue

### Warning (should fix)
- [file:line] Description of the issue

### Suggestions (nice to have)
- [file:line] Description of the suggestion

If no issues found in a category, write "None found."
```

Zwróć uwagę: SKILL.md ma teraz jakieś 30 linii zamiast 300. Zawiera strategię pracy i linki do wiedzy. Szczegóły żyją w osobnych plikach.

### Przykładowy plik referencyjny

Oto jak wygląda `references/typescript-conventions.md`:

```markdown
# TypeScript Conventions

## Naming

- Interfaces: PascalCase with `I` prefix — `IUserProfile`, `IApiResponse`
- Types: PascalCase without prefix — `UserRole`, `PaymentStatus`
- Enums: PascalCase, members UPPER_SNAKE_CASE — `enum Status { ACTIVE, INACTIVE }`
- Functions: camelCase, verb-first — `getUserById`, `validateInput`
- Constants: UPPER_SNAKE_CASE — `MAX_RETRY_COUNT`, `API_BASE_URL`
- Boolean variables: prefix with `is`, `has`, `should` — `isActive`, `hasPermission`

## Types and safety

- Never use `any` — use `unknown` and narrow with type guards
- Prefer `interface` for object shapes, `type` for unions and intersections
- All function parameters and return types must be explicitly typed
- Use `readonly` for arrays and objects that should not be mutated

## Error handling

- Always type catch clause: `catch (error: unknown)`
- Never swallow errors with empty catch blocks
- Async functions must have try/catch or propagate errors

## Imports

- Group imports: external packages, then internal modules, then relative imports
- No circular imports — if detected, flag as Critical
```

Plik jest konkretny, ma jasną strukturę i ogranicza się do jednego tematu. Claude przeczyta go tylko wtedy, gdy w analizowanym kodzie zobaczy kwestie związane z TypeScriptem.

-- To jest oczywiste, jak się na to patrzy -- mówi Karina. -- Ale wcześniej nie przyszło mi do głowy, że mogę podzielić instrukcje na pliki.

-- Bo myślimy "prompt to jeden tekst" -- odpowiada Paweł. -- A skill to katalog.

---

## Projekt 2: references/ dla create-presentation

Olek też zabiera się do roboty. Jego SKILL.md był równie przeładowany -- brand guide, szablony slajdów, zasady storytellingu, wszystko w jednym pliku.

Nowa struktura:

```
.claude/skills/create-presentation/
├── SKILL.md
└── references/
    ├── brand-guidelines.md
    ├── slide-templates.md
    └── storytelling-framework.md
```

### Zaktualizowany SKILL.md

```yaml
---
name: create-presentation
description: "Create slide-deck outlines and speaker notes. Use when the user asks to prepare a presentation, pitch deck, or slide outline for any topic."
argument-hint: "[topic-or-brief]"
---
```

```markdown
You create presentation outlines with speaker notes.

## Your knowledge base

Use these references to match our company standards:
- For colors, fonts, and logo usage, see [brand-guidelines.md](references/brand-guidelines.md)
- For slide layouts and structure rules, see [slide-templates.md](references/slide-templates.md)
- For narrative arc and audience engagement, see [storytelling-framework.md](references/storytelling-framework.md)

## Creation process

1. Ask the user about: topic, audience, time limit, and goal of the presentation
2. Load brand-guidelines.md to know the visual identity
3. Load storytelling-framework.md to structure the narrative
4. Create outline: title slide, agenda, main sections, summary, CTA
5. For each slide, provide: title, 3-5 bullet points, and speaker notes
6. Load slide-templates.md to suggest which template fits each slide type

## Rules

- Maximum 7 words per bullet point
- Maximum 5 bullet points per slide
- Every 3rd slide should be visual (chart, image placeholder, or quote)
- Speaker notes: 2-3 sentences per slide, conversational tone
- End with clear Call to Action
```

### Przykładowy plik referencyjny

Oto `references/brand-guidelines.md`:

```markdown
# Brand Guidelines — NovaTech

## Colors

- Primary: #1A73E8 (Nova Blue) — headings, CTA buttons
- Secondary: #34A853 (Growth Green) — accents, success states
- Background: #F8F9FA (Cloud Gray) — slide backgrounds
- Text: #202124 (Deep Charcoal) — body text
- Never use pure black (#000000) or pure white (#FFFFFF)

## Typography

- Headings: Inter Bold, 32-44pt
- Body: Inter Regular, 18-24pt
- Code/data: JetBrains Mono, 16-20pt

## Logo usage

- Always place logo in bottom-right corner of first and last slide
- Never stretch, rotate, or recolor the logo

## Tone of voice

- Professional but approachable
- Active voice, short sentences
- Avoid jargon unless audience is technical
```

-- Teraz Claude przeczyta brand-guidelines.md gdy będzie dobierał kolory -- mówi Olek. -- A storytelling-framework.md gdy będzie budował narrację. I jak zmienimy branding za pół roku, edytuję jeden plik zamiast przeszukiwać cały SKILL.md.

---

## scripts/ -- od słów do czynów

Paweł patrzy na Karinę.

-- Twój code-review skill już ma wiedzę rozbitą na pliki. Ale jest jeszcze jeden problem. Powiedz mi -- jak teraz wygląda review?

-- Claude czyta moje pliki, porównuje z konwencjami i pisze raport.

-- A linter? ESLint? Prettier?

Karina zastanawia się.

-- No... Claude czasem sam próbuje uruchomić eslint, ale raz użył złej flagi, raz nie znalazł configu. Trochę losowo.

-- I tu wchodzą scripts.

### Czym są scripts?

Folder `scripts/` w katalogu skilla zawiera pliki wykonywalne -- skrypty Bash, Python, Node. Claude nie musi "wymyślać" komendy. Zamiast tego uruchamia gotowy, przetestowany skrypt.

Skrypt daje ci **determinizm**. Model językowy jest z natury niedeterministyczny -- ten sam prompt może dać różne wyniki za każdym razem. Ale skrypt Bash zawsze robi to samo. Zawsze w tej samej kolejności. Zawsze z tymi samymi flagami.

Jest tu jeszcze zasada, którą Paweł powtarza jak mantrę:

**"Solve, don't punt."** Dobry skrypt sam obsługuje błędy. Jeśli nie znajdzie pliku konfiguracyjnego, tworzy domyślny. Nie zrzuca problemów na model -- sam je rozwiązuje albo daje czytelny komunikat.

### Prawa wykonania

Żeby Claude mógł uruchomić skrypt, plik musi mieć prawa wykonania:

```bash
chmod +x scripts/run-lint.sh
```

Bez tego system odmówi uruchomienia skryptu. Ustawiasz to raz na plik.

---

## Projekt 1: scripts/ dla code-review

Karina dodaje skrypt lintujący. Struktura rośnie:

```
.claude/skills/code-review/
├── SKILL.md
├── references/
│   ├── typescript-conventions.md
│   ├── nextjs-patterns.md
│   └── security-checklist.md
└── scripts/
    └── run-lint.sh
```

### Skrypt run-lint.sh

```bash
#!/usr/bin/env bash
set -euo pipefail

# Run ESLint on target path and return structured results
# Usage: ./run-lint.sh [path]
# Exit codes: 0 = no issues, 1 = issues found, 2 = tool error

TARGET="${1:-.}"

# Check if ESLint config exists
if [ ! -f "eslint.config.js" ] && [ ! -f ".eslintrc.json" ] && [ ! -f ".eslintrc.js" ]; then
  echo "WARNING: No ESLint config found in project root."
  echo "Skipping lint. Proceed with manual review only."
  exit 0
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "ERROR: node_modules not found. Run 'npm install' first."
  exit 2
fi

# Run ESLint with JSON output for easy parsing
# Capture exit code manually — eslint returns 1 when it finds issues,
# but set -e would kill the script before we can report results.
LINT_EXIT=0
npx eslint "$TARGET" \
  --format json \
  --no-error-on-unmatched-pattern \
  2>/dev/null || LINT_EXIT=$?

echo ""
echo "--- Lint complete ---"

# Pass through eslint's exit code: 0 = clean, 1 = issues found, 2+ = tool error
exit "$LINT_EXIT"
```

> To jest początkowa, pełna wersja skryptu. W kolejnych lekcjach zobaczysz, jak uprościć go do użycia w hookach -- tam wystarczy okrojona wersja, która tylko zwraca kod wyjścia.

Po zapisaniu pliku nadaj mu prawa wykonania:

```bash
chmod +x .claude/skills/code-review/scripts/run-lint.sh
```

Kilka rzeczy do zauważenia:

- `set -euo pipefail` -- standardowa "siatka bezpieczeństwa" w Bashu. Skrypt zatrzyma się przy pierwszym błędzie.
- Skrypt sprawdza, czy istnieje config ESLinta i czy zainstalowano zależności. To jest "solve, don't punt" -- skrypt diagnozuje problem zamiast zrzucać go na Claude'a.
- `|| LINT_EXIT=$?` -- przechwytuje kod wyjścia eslinta zamiast go połykać. Dzięki temu skrypt zwraca `0` gdy kod jest czysty, `1` gdy eslint znajdzie problemy, a `2+` gdy wystąpi błąd narzędzia. Bez tego `set -e` zabiłoby skrypt przy pierwszym znalezionym problemie.

### Zaktualizowany SKILL.md

Karina dodaje sekcję o skrypcie do SKILL.md:

```markdown
## Review process

1. Run the lint script first: execute `scripts/run-lint.sh` on the target path
2. Read the lint results — they cover formatting and basic rule violations
3. Then do manual review: read the target files
4. Load relevant reference files based on what you find
5. Focus manual review on things linters CANNOT catch: architecture, logic, naming intent, security patterns
6. Generate structured report combining lint results and manual findings
```

-- Claude teraz ma jasną instrukcję: najpierw skrypt, potem ręczny przegląd -- mówi Paweł. -- Nie musi się zastanawiać "czy powinienem uruchomić eslint?". Robi to zawsze, bo tak mówi przepis.

---

## Projekt 2: scripts/ dla create-presentation

Olek podchodzi do tematu ze swojej strony. Chce walidować strukturę prezentacji.

```
.claude/skills/create-presentation/
├── SKILL.md
├── references/
│   ├── brand-guidelines.md
│   ├── slide-templates.md
│   └── storytelling-framework.md
└── scripts/
    └── validate-structure.sh
```

### Skrypt validate-structure.sh

```bash
#!/usr/bin/env bash
set -euo pipefail

# Validate presentation structure
# Usage: ./validate-structure.sh <outline-file>

FILE="${1:?Usage: validate-structure.sh <outline-file>}"

if [ ! -f "$FILE" ]; then
  echo "ERROR: File not found: $FILE"
  exit 2
fi

echo "Validating: $FILE"
echo "========================"

# Count slides (lines starting with ## )
SLIDES=$(grep -c "^## " "$FILE" 2>/dev/null || true)
echo "Slides found: $SLIDES"

if [ "$SLIDES" -lt 5 ]; then
  echo "WARNING: Too few slides ($SLIDES). Minimum recommended: 5"
elif [ "$SLIDES" -gt 20 ]; then
  echo "WARNING: Too many slides ($SLIDES). Maximum recommended: 20"
else
  echo "OK: Slide count within range"
fi

# Check for required sections
for SECTION in "Agenda" "Summary" "Call to Action"; do
  if grep -qi "$SECTION" "$FILE" 2>/dev/null; then
    echo "OK: Found '$SECTION' section"
  else
    echo "MISSING: No '$SECTION' section found"
  fi
done

echo "========================"
echo "Validation complete."
```

Olek aktualizuje SKILL.md:

```markdown
## Creation process

1. Ask the user about: topic, audience, time limit, and goal
2. Load references as needed and create the outline
3. After creating the outline, run `scripts/validate-structure.sh` on the output file
4. If validation finds warnings, fix them before presenting the result to the user
```

-- Widzisz ten wzorzec? -- mówi Paweł. -- Wygeneruj, zwaliduj, popraw. Claude nie oddaje ci niedokończonej roboty. Sam sprawdza swoją pracę i naprawia ją zanim ci ją pokaże.

---

## Shell injection -- dynamiczny kontekst

Paweł podnosi rękę.

-- Ostatnia rzecz. Dotychczas skill miał stałą wiedzę i stałe narzędzia. Ale co, jeśli potrzebuje aktualnych danych? Na przykład listy plików zmienionych od ostatniego commitu?

### Składnia !`command`

W pliku SKILL.md możesz użyć specjalnej składni: wykrzyknik i backticki.

```
!`command`
```

System wykonuje tę komendę **zanim** wysyła treść skilla do Claude'a. Wynik komendy zastępuje placeholder. Claude nigdy nie widzi szablonu ``!`command` `` -- dostaje gotowe dane.

Claude dostaje zawsze gotowe dane. Nie wie nawet, że coś zostało podmienione.

### Jak Karina dodaje dynamiczny kontekst do code-review

Karina edytuje SKILL.md. Przed sekcją "Review process" dodaje:

```markdown
## Current staged changes

Files changed:
!`git diff --cached --stat`

Detailed diff:
!`git diff --cached`
```

Gdy Karina wywoła skill, system wykonuje obie komendy git, podmienia placeholdery na wyniki i przekazuje Claude'owi SKILL.md z już wklejonymi danymi. Claude widzi konkretne pliki i konkretne zmiany -- nie musi sam uruchamiać `git diff`. Review zaczyna się natychmiast.

-- Ale czekaj -- mówi Karina. -- A co jeśli nie mam nic w staging area? `git diff --cached` zwróci pusty wynik?

-- Dobra uwaga -- odpowiada Paweł. -- Wtedy Claude zobaczy pustą sekcję i powinien powiedzieć, że nie ma zmian do review. Możesz to obsłużyć w instrukcji:

```markdown
## Current staged changes

Files changed:
!`git diff --cached --stat`

Detailed diff:
!`git diff --cached`

If the sections above are empty, tell the user: "No staged changes found. Stage your changes with git add first, or specify files to review manually."
```

### Jak Olek dodaje dynamiczny kontekst do create-presentation

Olek ma inny przypadek. Nie używa gita, ale chce, żeby skill wiedział o istniejących prezentacjach w projekcie (żeby unikać powtórzeń i zachować spójność).

```markdown
## Existing presentations in this project

!`ls -1 presentations/*.md 2>/dev/null || echo "No existing presentations found."`
```

Dzięki temu Claude widzi, jakie prezentacje już istnieją i może zachować spójność nazewnictwa, tematyki czy formatu.

---

## Pełna struktura -- podsumowanie

Paweł rysuje na tablicy finalną strukturę obu projektów.

### Projekt 1: code-review

```
.claude/skills/code-review/
├── SKILL.md                        # Instrukcje + linki + dynamiczny kontekst
├── references/                     # Wiedza (czytana na żądanie)
│   ├── typescript-conventions.md
│   ├── nextjs-patterns.md
│   └── security-checklist.md
└── scripts/                        # Narzędzia (uruchamiane deterministycznie)
    └── run-lint.sh
```

### Projekt 2: create-presentation

```
.claude/skills/create-presentation/
├── SKILL.md
├── references/
│   ├── brand-guidelines.md
│   ├── slide-templates.md
│   └── storytelling-framework.md
└── scripts/
    └── validate-structure.sh
```

-- SKILL.md to mapa -- podsumowuje Karina. -- References to encyklopedia. Scripts to narzędzia. Shell injection to aktualne wiadomości.

-- Nie mogłem tego lepiej ująć -- mówi Paweł.

---

## Typowe błędy

Zanim przejdziesz do praktyki, kilka pułapek, na które trafili inni:

**Zbyt duże pliki referencyjne.** Jeśli plik ma 500 linii, rozbij go dalej. Mniejsze pliki = Claude czyta tylko to, czego naprawdę potrzebuje.

**Brak `set -euo pipefail` w skryptach.** Bez tego skrypt "po cichu" kontynuuje po błędzie.

**Shell injection z wolnymi komendami.** ``!`npm test` `` to zły pomysł -- testy mogą trwać minuty, a system wykonuje te komendy przed załadowaniem skilla. Hooki i shell injection powinny kończyć się w ciągu 5-10 sekund -- dłuższe operacje blokują flow pracy. Używaj szybkich komend: `git diff`, `ls`, `date`. Wolne operacje zostaw dla `scripts/`.

**Zapominanie o `chmod +x`.** Claude raportuje "Permission denied"? Rozwiązanie: `chmod +x scripts/twoj-skrypt.sh`.

---

## Słowniczek

**references/** -- Folder w katalogu skilla zawierający pliki z wiedzą tematyczną (konwencje, checklisty, wytyczne). Claude czyta te pliki na żądanie, nie wszystkie naraz. To trzeci poziom Progressive Disclosure.

**scripts/** -- Folder w katalogu skilla zawierający pliki wykonywalne (Bash, Python, Node). Claude uruchamia te skrypty jako gotowe narzędzia zamiast samodzielnie wymyślać komendy.

**Shell injection** -- Mechanizm dynamicznego wstrzykiwania kontekstu do SKILL.md za pomocą składni ``!`command` ``. System wykonuje komendę przed przekazaniem treści do Claude'a i podmienia placeholder na wynik.

**chmod** -- Komenda systemowa "change mode". `chmod +x plik` nadaje plikowi prawo do bycia uruchamianym jako program. Bez tego system traktuje plik jako zwykły tekst.

**Lint / Linter** -- Narzędzie do statycznej analizy kodu, które sprawdza styl, konwencje i potencjalne błędy bez uruchamiania programu. Przykłady: ESLint (JavaScript/TypeScript), Pylint (Python), RuboCop (Ruby). "Lintowanie" to proces takiego sprawdzania.

**Determinizm** -- Właściwość systemu, który dla tych samych danych wejściowych zawsze daje ten sam wynik. Skrypt Bash jest deterministyczny (zawsze robi to samo). Model językowy jest niedeterministyczny (ten sam prompt może dać różne odpowiedzi). Skrypty w skillach dodają determinizm tam, gdzie go potrzebujesz.

**set -euo pipefail** -- Standardowy nagłówek bezpieczeństwa w skryptach Bash. `-e` zatrzymuje skrypt przy pierwszym błędzie. `-u` traktuje niezdefiniowane zmienne jako błąd. `-o pipefail` sprawia, że potok (pipe) zwraca błąd, jeśli którykolwiek element zawiódł.

**Staging area (git)** -- Poczekalnia dla zmian w gicie. Pliki dodane komendą `git add` trafiają do staging area i czekają na commit. Komenda `git diff --cached` pokazuje różnice między staging area a ostatnim commitem -- czyli dokładnie to, co zamierzasz commitować.

---

## Dokumentacja

1. **Claude Code Skills -- oficjalna dokumentacja:** https://code.claude.com/docs/en/skills
2. **Agent Skills -- otwarty standard:** https://agentskills.io/specification
3. **Agent Skills -- otwarty standard:** https://agentskills.io/
4. **Bash scripting best practices:** https://google.github.io/styleguide/shellguide.html
5. **ESLint -- linter dla JavaScript/TypeScript:** https://eslint.org/

---

## Co dalej?

Paweł zbiera kubki po kawie.

-- Macie teraz skille z wiedzą, narzędziami i aktualnym kontekstem. Ale jest jeszcze pytanie, którego nie poruszyliśmy: kto kontroluje, kiedy skill się uruchamia? Czy Claude może sam zdecydować? Czy tylko ty? Czy może zależy to od sytuacji?

Karina patrzy na Olka.

-- Bo mój code-review skill chciałabym wywoływać sama, przed commitem. Ale wyobrażam sobie skill, który powinien działać automatycznie w tle, bez mojej interwencji.

-- A ja -- dodaje Olek -- chciałbym, żeby nikt przypadkiem nie wywołał mojego skilla prezentacyjnego w środku pisania kodu. To narzędzie do konkretnego zadania.

Paweł kiwa głową.

-- O tym porozmawiamy następnym razem. Kontrola wywołań, flagi frontmattera, zmienne i argumenty. Zobaczycie, że skill może być zarówno cicho pracującym asystentem, jak i komendą wywoływaną z palca.

**Twój action item:** Wróć do skilla, którego stworzyłeś w lekcji 01. Sprawdź, ile linii ma twój SKILL.md. Jeśli więcej niż 50 -- wydziel wiedzę tematyczną do folderu `references/`. Jeśli twój skill uruchamia jakiekolwiek komendy -- zastanów się, czy nie warto zamknąć ich w skrypcie w folderze `scripts/`. Nawet jeden skrypt i jeden plik referencyjny to dobry początek.
