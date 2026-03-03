---
lesson: "03.01"
title: "Skille — anatomia i pierwszy przepis"
description: "Czym są skille w Claude Code, jak wygląda SKILL.md i dlaczego warto je znać"
module: "03-skille"
---

# Skille -- anatomia i pierwszy przepis

Karina ma dość kopiowania.

Tydzień temu stworzyła custom command `/review` -- ładny prompt, który sprawdza kod pod kątem ich firmowych standardów. Działa, ale za każdym razem musi doklejać do konwersacji ich style guide, konwencje nazewnictwa i listę zakazanych wzorców. Sto linii kontekstu. Przy każdym wywołaniu.

-- To tak jakbym za każdym razem, gdy robię ciasto, szła do biblioteki po przepis, ksero z przyprawami i spis miar -- mówi do Olka.

Olek ma identyczny problem. Zrobił prompta do generowania raportów Q1, ale za każdym razem wkleja brand guide (tony, kolory, format nagłówków) i szablon slajdów. Czterdzieści minut przygotowań, pięć minut właściwej pracy.

-- Mnie to wygląda jak gotowanie bez kuchni -- mówi. -- Wszystko noszę w torbie, a lodówki nie mam.

Paweł słucha, kiwa głową.

-- Wasze custom commands to instrukcja: "zrób X". A skill to instrukcja plus lodówka, plus szuflada z nożami, plus kolekcja przepisów. Jedno miejsce, z którego Claude bierze wszystko, czego potrzebuje.

Ta lekcja pokaże Ci, czym dokładnie są skille i jak zbudować swój pierwszy.

> **Moduł:** Skille (Agent Skills)
> **Poziom:** Średniozaawansowany (wystarczy znać custom commands)
> **Czas:** 25--35 minut

## Co wyniesiesz z tej lekcji

- Rozumiesz, czym skille różnią się od custom commands i dlaczego to ważna różnica.
- Wiesz, jak wygląda struktura katalogu skilla: `SKILL.md`, `references/`, `scripts/`.
- Tworzysz własny `SKILL.md` z poprawnym frontmatterem i instrukcjami.
- Rozumiesz Progressive Disclosure -- trzy poziomy ładowania kontekstu.
- Budujesz dwa działające skille: jeden do code review, drugi do prezentacji.

---

## 1. Od custom commands do skilli -- dlaczego to następny krok

### Co już masz (i co Ci brakuje)

Custom commands (pliki `.md` w katalogu `.claude/commands/`) dobrze służą do prostych, powtarzalnych poleceń. Wpisujesz `/review`, Claude czyta prompt z pliku, wykonuje. Szybko i wygodnie.

Ale po kilku tygodniach używania zauważysz ograniczenia:

- **Brak bazy wiedzy.** Chcesz, żeby Claude znał Twój style guide? Musisz go wkleić do prompta albo liczyć na to, że Claude sam przeczyta właściwy plik.
- **Brak skryptów.** Command to tekst. Nie dołączysz do niego skryptu walidującego, który Claude ma uruchomić.
- **Brak izolacji.** Wszystkie instrukcje z `CLAUDE.md` i komend lecą do jednego worka. Przy 15 komendach i długim `CLAUDE.md` kontekst pęka w szwach.

Karina podsumowuje to tak:

-- Custom commands to kartka z przepisem. Skill to cała szuflada: przepis, składniki, naczynia i notatka "Olu, nie zapomnij posolić wody".

### Skille -- co nowego

Skill to folder. W środku jest plik `SKILL.md` (serce skilla) i opcjonalne podkatalogi z zasobami. Taka struktura:

```
.claude/skills/code-review/
├── SKILL.md           # Serce: kto, co, kiedy
├── references/        # Baza wiedzy (ładowana na żądanie)
│   ├── style-guide.md
│   └── forbidden-patterns.md
├── scripts/           # Skrypty wykonawcze
│   └── run-lint.sh
└── assets/            # Szablony, dane statyczne
    └── report-template.md
```

Minimum to jeden plik: `SKILL.md`. Reszta jest opcjonalna i doładowujesz ją stopniowo.

### Dobra wiadomość: Twoje komendy dalej działają

W nowych wersjach Claude Code custom commands i skille to ten sam system. Plik `.claude/commands/review.md` i skill `.claude/skills/review/SKILL.md` oba tworzą komendę `/review` i działają identycznie. Twoje istniejące komendy nie wymagają migracji.

Różnica? Skille dają Ci więcej możliwości: katalog na pliki pomocnicze, frontmatter do kontrolowania wywoływania i zdolność Claude'a do automatycznego ładowania skilla, gdy kontekst rozmowy na to wskazuje.

### Gdzie żyją skille

Masz trzy lokalizacje:

- **Projektowe:** `.claude/skills/` w katalogu projektu -- dzielisz z zespołem przez Git.
- **Globalne:** `~/.claude/skills/` -- Twoje osobiste skille, działają w każdym projekcie.
- **Z pluginów:** instalowane przez `/plugin install` -- gotowe rozwiązania od innych.

Olek pyta:

-- To jak mam coś do raportów i używam tego w każdym projekcie, to daję do globalnych?

-- Tak -- odpowiada Paweł. -- Globalne to Twój osobisty zestaw narzędzi. Projektowe to narzędzia wspólne dla całego zespołu w danym repo.

---

## 2. SKILL.md -- przepis na skilla

Każdy skill zaczyna się od jednego pliku: `SKILL.md`. Ma dwie części: frontmatter (metadane w formacie YAML) i treść (instrukcje w markdownie).

### Frontmatter -- wizytówka skilla

Frontmatter to blok na samej górze pliku, otoczony znacznikami `---`. Zawiera metadane:

```yaml
---
name: code-review
description: "TypeScript/Next.js code quality reviewer. Use when reviewing
  code changes, before commits, or when asked to check code quality."
argument-hint: "[file-or-directory-path]"
---
```

Najważniejsze pola:

**`name`** -- nazwa skilla, małe litery i myślniki. Staje się komendą `/name`. Jeśli nie podasz, Claude użyje nazwy katalogu.

**`description`** -- to pole Claude widzi od razu, na starcie sesji. Na jego podstawie decyduje, czy załadować pełny skill. To jedyne pole, które naprawdę musisz napisać dobrze. Więcej o tym za chwilę.

**`argument-hint`** -- podpowiedź, co podać jako argument. Wyświetla się przy autouzupełnianiu. Na przykład `[file-or-directory-path]` albo `[topic-or-brief]`.

Inne pola (użyjemy w następnych lekcjach):

- `disable-model-invocation` -- Claude nie może użyć skilla sam; wymaga ręcznego `/name`
- `user-invocable` -- jeśli `false`, skill znika z menu `/`, ale Claude może go użyć w tle
- `allowed-tools` -- jakie narzędzia skill może używać bez pytania o pozwolenie
- `context` -- czy uruchomić skill w oddzielnym subagencie (`fork`)

Na razie wystarczy Ci `name`, `description` i opcjonalnie `argument-hint`.

### Treść -- instrukcje dla Claude'a

Pod frontmatterem piszesz zwykły markdown. To instrukcje, które Claude przeczyta, gdy skill zostanie wywołany. Piszesz je po angielsku (bo Claude lepiej rozumie instrukcje techniczne w tym języku).

```markdown
# Code Review

Review the provided code for quality issues.

## Steps

1. Read the target files
2. Check TypeScript best practices
3. Review naming conventions (camelCase for variables, PascalCase for types)
4. Look for common Next.js pitfalls
5. Generate a structured report

## Report format

Use this structure:
- **Summary**: one-sentence verdict
- **Issues found**: list with severity (critical/warning/info)
- **Suggestions**: actionable improvements
```

-- Poczekaj -- mówi Olek. -- To wygląda jak zwykły prompt. Jaka różnica?

-- Różnica jest w tym, *kiedy* Claude to czyta -- odpowiada Paweł. -- I to prowadzi nas do najważniejszej idei skilli.

---

## 3. Progressive Disclosure -- trzy poziomy ładowania

To jest serce całej koncepcji. Zrozumiesz to i będziesz wiedzieć, dlaczego skille są lepsze od wrzucania wszystkiego do `CLAUDE.md`.

### Problem: kontekst nie jest z gumy

Claude ma okno kontekstowe -- określoną ilość tekstu, którą może "trzymać w głowie" naraz. Mierzy się to w tokenach (z grubsza: 1 token to około 4 znaki po angielsku, trochę mniej po polsku).

Wyobraź sobie, że masz:
- `CLAUDE.md` z ogólnymi zasadami (200 linii)
- 10 custom commands (każdy po 50 linii)
- Style guide (300 linii)
- Konwencje API (150 linii)

To razem ponad 800 linii tekstu ładowanego na starcie. A Claude jeszcze nie zaczął czytać Twojego kodu.

Karina:

-- Dlatego po dłuższej sesji Claude "zapomina" wcześniejsze ustalenia? Bo kontekst się przepełnia?

-- Dokładnie -- mówi Paweł. -- Wrzucenie wszystkiego na raz to jak wchodzenie do restauracji i czytanie każdego przepisu w kuchni, zanim zamówisz jedno danie.

### Trzy poziomy (jak w restauracji)

Skille rozwiązują to trzema poziomami ładowania:

**Poziom 1: Metadane (na starcie sesji)**

Gdy otwierasz Claude Code, ładuje on TYLKO `name` i `description` każdego skilla. To około 30-50 tokenów na skill. Przy 10 skillach to 300-500 tokenów -- nic.

To jak menu w restauracji: widzisz nazwę dania i krótki opis. Nie czytasz całego przepisu.

**Poziom 2: Instrukcje (po wywołaniu)**

Gdy wpiszesz `/code-review` albo gdy Claude sam stwierdzi, że potrzebuje tego skilla (bo opis pasuje do rozmowy) -- dopiero wtedy ładuje pełny `SKILL.md`. Całe instrukcje, kroki, format raportu.

To jak zamówienie dania: kelner przynosi Ci pełny opis, składniki, uwagi o alergenach.

**Poziom 3: Zasoby (gdy potrzebne)**

Pliki z katalogu `references/` i `scripts/` ładują się najpóźniej -- dopiero gdy instrukcje w `SKILL.md` każą Claude'owi po nie sięgnąć. Na przykład: "jeśli sprawdzasz bezpieczeństwo, przeczytaj `references/security-rules.md`".

To jak sytuacja, w której kelner wraca do kuchni po dodatkowy sos, bo poprosiłeś o coś ekstra.

### Dlaczego to działa

Porównaj dwa podejścia:

**Podejście A: wszystko w CLAUDE.md**
- 800+ linii ładowanych na starcie każdej sesji
- Claude ma mniej miejsca na Twój kod
- Długie sesje = utrata kontekstu

**Podejście B: skille z Progressive Disclosure**
- Na starcie: 300 tokenów (same metadane)
- Po wywołaniu `/code-review`: dodatkowe 200 tokenów (instrukcje)
- Gdy trzeba sprawdzić bezpieczeństwo: jeszcze 150 tokenów (security-rules.md)
- Pozostałe 7 skilli? Nie załadowane. Zero kosztów.

Olek:

-- Czyli zamiast nosić cały office w plecaku, noszę wizytówkę. A teczkę biorę tylko gdy idę na spotkanie.

-- Nieźle analogia -- mówi Karina.

### Praktyczna wskazówka: jak pisać dobre opisy

Pole `description` to filtr. Claude czyta je na starcie i decyduje: "czy ten skill pasuje do tego, o co pyta użytkownik?". Dobry opis zawiera:

- **Co** skill robi (nie jak, tylko co)
- **Kiedy** go użyć (słowa-klucze, które pasują do pytań użytkownika)

Przykład dobrego opisu:

```
"TypeScript/Next.js code quality reviewer. Use when reviewing code changes,
before commits, or when asked to check code quality. Analyzes patterns,
naming, types, and common pitfalls."
```

Claude przeczyta to i będzie wiedział: jeśli użytkownik powie "review this code", "check quality", "before I commit" -- to jest ten skill.

Przykład złego opisu:

```
"A useful tool for developers."
```

Claude nie wie, kiedy to załadować. Zbyt ogólnikowe. Żaden trigger.

---

## 4. Projekt 1: Code Review Skill

Czas na praktykę. Karina buduje swój pierwszy skill do sprawdzania jakości kodu TypeScript/Next.js.

### Krok 1: Stwórz katalog

```bash
mkdir -p .claude/skills/code-review
```

### Krok 2: Napisz SKILL.md

Karina tworzy plik `.claude/skills/code-review/SKILL.md`:

```yaml
---
name: code-review
description: "TypeScript/Next.js code quality reviewer. Use when reviewing
  code changes, before commits, or when asked to check code quality.
  Analyzes patterns, naming, types, and common pitfalls."
argument-hint: "[file-or-directory-path]"
---
```

```markdown
# Code Review

You are a code reviewer for a TypeScript/Next.js project. Analyze the
provided files or directory and generate a structured quality report.

## What to check

### TypeScript best practices
- Proper use of types (avoid `any`, prefer interfaces over type aliases
  for objects)
- Null safety (optional chaining, nullish coalescing)
- No unused imports or variables

### Naming conventions
- Variables and functions: camelCase
- Types and interfaces: PascalCase
- Constants: UPPER_SNAKE_CASE
- Files: kebab-case for utilities, PascalCase for components

### Next.js patterns
- Server vs Client components (is 'use client' used correctly?)
- Data fetching (are server actions used where appropriate?)
- Image optimization (next/image instead of plain img tags)
- Metadata exports for SEO

### Component structure
- Single responsibility (one main purpose per component)
- Props interface defined and exported
- No business logic in presentation components

## Output format

Structure your report as:

### Summary
One sentence: overall code quality verdict.

### Issues found
List each issue with:
- **File**: path
- **Line**: approximate location
- **Severity**: critical / warning / info
- **Description**: what is wrong and why

### Suggestions
Actionable improvements, ordered by impact.

### Verdict
PASS / PASS WITH WARNINGS / NEEDS CHANGES
```

### Krok 3: Testuj

Karina wpisuje w Claude Code:

```
/code-review src/components/
```

Claude ładuje pełny `SKILL.md`, czyta pliki z `src/components/` i generuje raport ze strukturą, którą zdefiniowała.

-- Widzę -- mówi Karina. -- Bez skilla Claude też by sprawdził kod, ale nie wiedziałby o naszych konwencjach nazewnictwa ani o tym, że używamy server actions. Teraz to jest wbudowane.

Paweł dodaje:

-- I co najważniejsze: ten opis w `description` sprawia, że jeśli powiesz Claude'owi "look at this component before I commit" -- nawet bez wpisywania `/code-review` -- Claude sam załaduje ten skill, bo opis pasuje do kontekstu.

### Krok 4: Sprawdź, co się załadowało

Chcesz zobaczyć, które skille Claude ma "w pamięci"? W trakcie sesji wpisz:

```
/context
```

Zobaczysz informacje o załadowanym kontekście, w tym o skillach. Jeśli któryś skill został pominięty (np. z powodu limitu tokenów), dostaniesz ostrzeżenie.

---

## 5. Projekt 2: Presentation Skill

Teraz Olek. Nie jest programistą, ale codziennie przygotowuje prezentacje i raporty. Chce, żeby Claude znał firmowy styl i od razu generował slajdy w odpowiednim formacie.

### Krok 1: Stwórz katalog

```bash
mkdir -p .claude/skills/create-presentation
```

### Krok 2: Napisz SKILL.md

Olek tworzy plik `.claude/skills/create-presentation/SKILL.md`:

```yaml
---
name: create-presentation
description: "Professional presentation creator. Use when asked to create
  slides, build presentations, prepare pitch decks, or make slide decks.
  Follows structured storytelling and brand guidelines."
argument-hint: "[topic-or-brief]"
---
```

```markdown
# Create Presentation

You are a presentation specialist. Create professional, well-structured
slide decks based on the provided topic or brief.

## Process

1. **Understand the brief**: Ask clarifying questions if the topic is
   vague. Identify the audience, goal, and key message.
2. **Structure the narrative**: Follow the problem-solution-benefit arc:
   - Slide 1-2: Context and problem statement
   - Slide 3-5: Solution and how it works
   - Slide 6-7: Benefits and evidence (data, quotes, examples)
   - Slide 8: Call to action or next steps
3. **Write slide content**: Each slide gets:
   - A clear headline (max 8 words)
   - 3-5 bullet points or one key visual description
   - Speaker notes (2-3 sentences of what to say)
4. **Follow brand tone**: Professional but approachable. No jargon
   unless the audience is technical. Active voice. Short sentences.

## Output format

For each slide, use this structure:

### Slide [number]: [headline]

**Content:**
- Bullet points or description

**Speaker notes:**
What to say when presenting this slide.

**Visual suggestion:**
What image, chart, or diagram would support this slide.

## Constraints

- Maximum 12 slides (unless explicitly asked for more)
- No slide should have more than 5 bullet points
- Every claim needs a source or data point
- End with a clear call to action
```

### Krok 3: Testuj

Olek wpisuje:

```
/create-presentation Q1 Sales Report for the board meeting
```

Claude generuje pełny zestaw slajdów z nagłówkami, treścią, notatkami prezentera i sugestiami wizualnymi.

-- To jest dokładnie to, co potrzebowałem -- mówi Olek. -- Nie muszę za każdym razem tłumaczyć, że chcę "problem-solution-benefit", że maksymalnie 5 punktów na slajdzie, że potrzebuję speaker notes. To jest w przepisie.

Karina:

-- I nie musisz wklejać brand guide do każdej rozmowy. Claude ładuje go sam, gdy powiesz "make a presentation".

Paweł:

-- W następnej lekcji dodamy do tego folderu `references/brand-guidelines.md` z pełnym opisem marki. Wtedy skill załaduje go automatycznie -- ale dopiero gdy będzie potrzebny. Progressive Disclosure w akcji.

---

## 6. Pełny obraz -- co dalej z Twoimi skillami

Zbudowałeś dziś dwa szkieletowe skille. Oba mają `SKILL.md` z instrukcjami, ale jeszcze nie wykorzystują pełnej mocy: folderów `references/` i `scripts/`.

Oto co będziesz dodawać w następnych lekcjach:

**Lekcja 2: Skalowanie wiedzy**
- Dodasz pliki referencyjne (np. `references/style-guide.md`)
- Nauczysz się dynamicznego wstrzykiwania kontekstu (shell injection)
- Dodasz skrypty wykonawcze do katalogu `scripts/`

**Lekcja 3: Kontrola wywołań**
- `disable-model-invocation` -- kiedy chcesz, żeby tylko Ty mógł wywołać skill
- `user-invocable: false` -- skille "w tle", które Claude ładuje sam
- Zmienne: `$ARGUMENTS`, `$0`, `$1`

**Lekcja 4: Integracja z MCP i hookami**
- Skill, który korzysta z serwerów MCP (np. GitHub, Slack)
- Hooki na poziomie skilla -- deterministyczne reguły
- Feedback loops: generuj, waliduj, popraw

**Lekcja 5: Dystrybucja**
- Agent Skills jako otwarty standard
- Tworzenie pluginów
- Bezpieczeństwo: co sprawdzać w cudzych skillach

---

## Czego nauczyła Cię ta lekcja (podsumowanie)

Trzy sprawy do zapamiętania:

**1. Skill to folder, nie plik.** Minimum to `SKILL.md`, ale możesz dołożyć `references/`, `scripts/`, `assets/`. Każdy z tych elementów ładuje się wtedy, gdy jest potrzebny.

**2. `description` to najważniejsze pole.** To ono decyduje, czy Claude w ogóle załaduje Twój skill. Napisz konkretnie: co robi, kiedy użyć, jakie słowa powinny triggerować ładowanie.

**3. Progressive Disclosure oszczędza kontekst.** Zamiast ładować wszystko na raz (jak w `CLAUDE.md`), skille działają na trzech poziomach: metadane na starcie, instrukcje po wywołaniu, zasoby na żądanie. Efekt: mniej zużycia tokenów, dłuższe sesje, lepsze wyniki.

---

## Słowniczek

**Skill** -- pakiet instrukcji i zasobów dla Claude'a, zorganizowany jako folder z plikiem `SKILL.md` i opcjonalnymi podkatalogami.

**SKILL.md** -- plik w formacie markdown z frontmatterem YAML, który stanowi serce każdego skilla. Zawiera metadane (name, description) i instrukcje.

**Progressive Disclosure** -- wzorzec ładowania informacji na żądanie: najpierw minimum (metadane), potem więcej (instrukcje), na końcu szczegóły (pliki referencyjne). Oszczędza okno kontekstowe.

**Frontmatter** -- blok metadanych na początku pliku, otoczony znacznikami `---`. W SKILL.md pisany w formacie YAML (pary klucz-wartość).

**Token** -- jednostka tekstu, którą model AI przetwarza. W uproszczeniu: 1 token to około 4 znaki w języku angielskim. Dłuższe teksty = więcej tokenów = mniej miejsca w oknie kontekstowym.

**Description (w kontekście skilli)** -- pole we frontmatterze SKILL.md, które Claude czyta na starcie sesji. Na jego podstawie decyduje, czy i kiedy załadować pełny skill.

**Custom command** -- starsza forma instrukcji dla Claude'a: pojedynczy plik `.md` w katalogu `.claude/commands/`. Nadal działa, ale skille oferują więcej możliwości (folder z zasobami, frontmatter, automatyczne ładowanie).

---

## Dokumentacja

- Skille w Claude Code: https://code.claude.com/docs/en/skills
- Slash commands (połączone ze skillami): https://code.claude.com/docs/en/slash-commands
- Specyfikacja Agent Skills (otwarty standard): https://agentskills.io/specification

---

*W następnej lekcji: dodasz pliki referencyjne, skrypty wykonawcze i dynamiczny kontekst. Twoje skille przestaną być "przepisami" -- staną się "kuchniami".*
