---
lesson: "02.04"
title: "Subagenty w Claude Code cz. 1: Autonomia i 'Czysty Kontekst'"
description: "Jak subagenty rozwiązują problem 'context pollution' i jak stworzyć pierwszego agenta"
module: "02-wbudowane-narzedzia"
---

# Subagenty w Claude Code cz. 1: Autonomia i "Czysty Kontekst"

Paweł (senior dev) kończy call z zespołem i zerka na Karinę.

— Ile masz teraz otwartych wątków w Claude Code?

Karina wzdycha.

— Jeden. Tylko… on ma już wszystko: dokumentację OAuth, log z błędu, 3 podejścia do cache, fragmenty dwóch plików i moje notatki z review. I mam wrażenie, że im dłużej gadam, tym gorzej mnie rozumie.

Paweł kiwa głową.

— Klasyk. Masz dwie opcje pracy:

1. Jeden czat, jeden agent, wszystko w jednym worku.
2. Ty jako kierownik, a obok mały zespół subagentów, którzy robią swoje i przynoszą Ci wynik.

Ta lekcja jest o opcji nr 2.

## Co zrobisz po tej lekcji (praktycznie)

- Zrozumiesz, czemu długie rozmowy degradują jakość (i podbijają koszty).
- Wiesz gdzie trzymać subagenty: globalnie vs w repo.
- Napiszesz swojego pierwszego subagenta w `.claude/agents/`.
- Nauczysz się 3 prostych zasad: `description`, minimalne `tools`, format wyjścia.

## 1. Problem: "Context Pollution" (Zanieczyszczenie Kontekstu)

### Scena z życia: kiedy czat zaczyna przeszkadzać

Jest końcówka dnia. Przez godzinę:

- czytasz z AI dokumentację,
- porównujesz 3 podejścia,
- robisz 2 nieudane wersje,
- a na koniec chcesz dopiąć to jednym, czystym wyjściem: decyzją albo finalnym raportem.

Karina pokazuje Pawłowi ekran:

- w historii są dwie wersje rozwiązania (jedna porzucona),
- jest dyskusja o edge-case’ach (część już nieaktualna),
- są fragmenty plików sprzed zmian.

I wtedy widzisz klasyczne objawy:

- model zaczyna wracać do starych wątków,
- miesza ustalenia,
- podaje oczywistości,
- a czasem nie pamięta tego, co było ważne na początku.

Oto co się dzieje:
- Analizy nieudanych prób pozostają w pamięci
- Treść starych plików blokuje miejsce na nowe informacje
- Dyskusje o różnych tematach mieszają się ze sobą
- Model staje się "głupszy", bo gubi początkowe ustalenia
- Koszty rosną – każdy token w kontekście to większy rachunek

To nie jest "wina modelu". To koszt uboczny pracy w jednym, rosnącym kontekście.

### Jak to naprawić: delegowanie do subagentów

**Subagenty to wyspecjalizowane instancje Claude'a, które działają w odizolowanym oknie kontekstowym.**

Główny Claude (tzw. **Main Agent**) działa jak kierownik:
- Deleguje zadania do specjalistów z wirtualnego zespołu
- Otrzymuje z powrotem tylko gotowy wynik
- Nie widzi całego procesu myślowego subagenta
- "Brudnopis" subagenta znika po zakończeniu – nie zaśmieca głównej rozmowy

Porównaj to do:

- freelancer: wszystko w jednym wątku, pamiętasz każdy detal,
- firma: różni ludzie robią różne rzeczy, a do Ciebie wraca wynik.

To daje Ci dwie rzeczy naraz: czystszy kontekst i lepszą kontrolę nad tym, co zostaje w głównym wątku (trzymasz wynik, nie cały brudnopis).

Kosztowo to nie jest „zawsze taniej”: subagent, żeby zacząć pracę, też dostaje kontekst (często bez korzyści z cache głównej rozmowy), więc bywa, że jest drożej. Zysk jest przede wszystkim jakościowy i organizacyjny: główny wątek pozostaje czytelny i możesz z nim pracować dłużej bez degradacji.

Najważniejsze: subagent może mieć osobne instrukcje, inny model i ograniczone uprawnienia.

## 2. Infrastruktura: Jak to działa w Claude Code?

### Lokalizacja i budowa

Subagenty to **proste pliki Markdown (`.md`) z nagłówkiem YAML**. Umieszczasz je w:

**Globalni agenci** (dostępni w każdym projekcie):
```
~/.claude/agents/
```

**Agenci specyficzni dla projektu** (możesz je wrzucić do repozytorium):
```
.claude/agents/
```

Przykład struktury:
```
~/.claude/agents/
├── invoice-processor.md
├── competitor-analyst.md
└── code-reviewer.md

.claude/agents/
├── security-auditor.md
└── api-tester.md
```

### Mechanika działania

**Automatyczne skanowanie:**
- Claude Code przy starcie skanuje te foldery
- Wczytuje opisy (`description`) wszystkich agentów
- Gdy wydasz polecenie, Claude decyduje którego agenta "zatrudnić"

### Najważniejsze pola (i jedna zasada)

Zasada jest prosta: `description` ma pomagać Claude'owi zdecydować, kiedy użyć subagenta.

````markdown
---
name: invoice-processor
description: VAT invoice processing specialist. Use when you need to extract key fields from invoice PDFs.
tools: Read, Glob
model: haiku
---

You are a specialist in processing Polish VAT invoices.

When you receive a task:
1. Read all PDF files in the given folder
2. Extract: NIP (tax ID), issue date, gross amount
3. Return the result as JSON

Output format:
```json
{
  "invoices": [
    {"file": "faktura-01.pdf", "nip": "123-456-78-90", "date": "2025-01-15", "amount": 1230.00}
  ]
}
```
````

Co oznaczają pola:
- `name`: unikalna nazwa agenta (lowercase, hyphens)
- `description`: opis, który Claude używa do decyzji o użyciu agenta
- `tools`: uprawnienia (allowlist). Jeśli pominiesz, agent zwykle odziedziczy narzędzia z głównej rozmowy.
- `disallowedTools`: blokady (denylist) — przydatne, gdy dziedziczysz narzędzia, ale chcesz coś wyciąć (np. `Write`, `Edit`, `Bash`).
- `model`: `haiku`, `sonnet`, `opus`, lub `inherit`
- `permissionMode`: jak agent ma traktować prośby o uprawnienia (np. czy ma pytać, auto-akceptować edycje, czy być read-only).
- Treść markdown: szczegółowa instrukcja definiująca rolę i zachowanie

Paweł patrzy na Karinę i dorzuca zasadę „po ludzku”:

- Jeśli `description` jest ostre i konkretne → Main Agent wie, kiedy zawołać subagenta.
- Jeśli `tools` są minimalne → agent jest bezpieczny i przewidywalny.
- Jeśli format wyjścia jest kontraktem (JSON/tabela) → łatwo to dalej przetwarzać.

Karina dopytuje:

— A te wszystkie „dodatkowe bajery” typu kolor, pamięć, maksymalna liczba tur…?

— Są, ale to już część 2: orkiestracja i dopinanie procesu. Tu w cz. 1 ogarniamy fundamenty: kiedy delegować, jakie narzędzia, jaki kontrakt wyjścia — ucina Paweł.

### Priorytet i nadpisywanie

Gdy masz agentów o tej samej nazwie w różnych lokalizacjach:

| Lokalizacja | Priorytet | Zasięg |
|------------|-----------|--------|
| `--agents` (CLI flag) | 1 (najwyższy) | Tylko bieżąca sesja |
| `.claude/agents/` | 2 | Projekt |
| `~/.claude/agents/` | 3 | Wszystkie projekty użytkownika |
| Plugin | 4 (najniższy) | Gdzie plugin zainstalowany |

## 3. Mini-lab: agent do faktur (15 minut zamiast kilku godzin)

Masz folder z 50 plikami PDF (faktury VAT). Chcesz wyciągnąć: daty, kwoty brutto, numery NIP. Ręcznie to spokojnie pół dnia.

Karina od razu widzi zastosowanie:

— Czyli mogę zrobić „maszynkę” do dokumentów, ale bez zaśmiecania głównego czatu?

— Dokładnie — mówi Paweł. — I jeszcze ograniczasz narzędzia, żeby nic nie zepsuł.

Z subagentem:

- w głównym wątku zostaje tylko wynik,
- subagent może mieć `Read, Glob` (bez edycji),
- wymuszasz format (JSON), więc łatwo to potem przetworzyć.

### Agent `invoice-processor`

Stwórz plik `.claude/agents/invoice-processor.md` (albo globalnie w `~/.claude/agents/`):

````markdown
---
name: invoice-processor
description: VAT invoice processing specialist. Use when you need to extract NIP, dates, and gross amounts from invoice PDFs.
tools: Read, Glob
model: haiku
---

You are an expert at extracting data from Polish VAT invoices.

When you receive a folder with invoices:

1. Use `Glob` to find all PDFs and report the count.
2. For each file, use `Read` and extract:
   - vendor NIP (tax ID),
   - issue date,
   - gross amount.
3. Return JSON only. Do not add commentary.

```json
{
  "summary": {
    "total_invoices": 50,
    "total_amount": 125430.50,
    "processed": 48,
    "errors": 2
  },
  "invoices": [
    {
      "file": "faktura-001.pdf",
      "nip": "123-456-78-90",
      "date": "2025-01-15",
      "gross_amount": 1230.00
    }
  ],
  "errors": [
    {
      "file": "faktura-042.pdf",
      "reason": "NIP not found in document"
    }
  ]
}
```
````

### Jak to wygląda w praktyce

Paweł robi szybkie demo na sucho (żeby Karina zobaczyła przepływ, a nie tylko definicję):

```
Karina: Analyze invoices in the folder ./invoices
Claude (Main): [reads invoice-processor description]
Claude (Main): Delegating to invoice-processor agent...

[Subagent invoice-processor:]
- Uses Glob: finds 50 PDF files
- Uses Read: reads each PDF in its own context
- Extracts the fields
- Produces JSON only

Claude (Main): [receives only the JSON result, ~500 tokens]
Claude (Main): Here are the results:
- Total gross sum: 125,430.50 PLN
- 48 processed successfully
- 2 errors (details below)
```

Wynik: masz dane w ustrukturyzowanej formie i możesz od razu:

- zsumować kwoty,
- wkleić to do arkusza,
- wygenerować raport.

## 4. Przykład Praktyczny 2 (Marketingowy): "Researcher Konkurencji"

Agencja marketingowa analizuje 5 stron konkurencji. Potrzebne: cenniki, pozycjonowanie, USP, customer reviews. Ręcznie: **10 godzin pracy analityka**.

Karina uśmiecha się pod nosem:

— To brzmi jak „wrzucę pięć linków, a ty mi zrób tabelę”. Idealne na subagenta.

— Tak, tylko pamiętaj: kontrakt wyjścia i źródła. Inaczej masz ładny esej bez dowodów — odpowiada Paweł.

### Konfiguracja Subagenta

Stwórz `.claude/agents/competitor-analyst.md`:

````markdown
---
name: competitor-analyst
description: Competitor research specialist. Use when you need to analyze competitor websites, pricing, and positioning.
tools: Read, WebFetch
model: sonnet
---

You are a competitive intelligence specialist.

## Your mission

When analyzing competitors:

**Phase 1: Data Collection**
- Use WebFetch to fetch competitor websites
- Focus on: pricing pages, about us, product features
- Extract key value propositions

**Phase 2: Analysis**
For each competitor identify:
- Pricing tiers and models
- Target audience
- Unique selling points (USPs)
- Product/service features
- Customer testimonials or case studies

**Phase 3: Competitive Matrix**
Create a comparison table:

| Competitor | Pricing | Target | USP | Strengths | Weaknesses |
|-----------|---------|--------|-----|-----------|------------|
| ...       | ...     | ...    | ... | ...       | ...        |

**Phase 4: Insights**
Provide strategic recommendations:
- Market gaps we can exploit
- Pricing positioning suggestions
- Feature differentiation opportunities

## Output format

Structure your analysis:
1. Executive Summary (3-5 bullet points)
2. Detailed Competitor Profiles
3. Competitive Matrix (table)
4. Strategic Recommendations
5. Sources (list all URLs analyzed)

Keep analysis actionable and focused on opportunities.
````

### W praktyce

```
You: Analyze these 5 competitors: competitor1.com, competitor2.com...

Claude (Main): Delegating to competitor-analyst agent...

[Subagent competitor-analyst:]
- WebFetch competitor1.com/pricing
- WebFetch competitor1.com/about
- Analyzes content in its own context
- Repeats for the other 4 competitors
- Produces a comparison table and recommendations

Claude (Main): [receives only clean output: executive summary + table + recommendations]
```

Efekt: w głównym wątku zostaje tabela i rekomendacje, a nie surowa treść 5 stron.

## 5. Przykład Praktyczny 3 (Techniczny): "Code Reviewer / Audytor Bezpieczeństwa"

Ten agent sprawdza kod pod kątem bezpieczeństwa **bez wprowadzania zmian**, tylko raportowanie.

Paweł robi pauzę i dopina najważniejsze:

— Tu wchodzi temat bezpieczeństwa. Taki agent ma być „czytający”, nie „naprawiający”. Chcesz raport, nie niespodzianki w kodzie.

### Konfiguracja

Stwórz `.claude/agents/security-auditor.md`:

````markdown
---
name: security-auditor
description: Expert code security reviewer. Use proactively after code changes or when security review needed. OWASP Top 10 specialist.
tools: Read, Grep, Glob, Bash
model: sonnet
permissionMode: plan
---

You are a senior security auditor specializing in OWASP Top 10 vulnerabilities.

## Your role: READ ONLY

You CANNOT modify code. Only analyze and report.

## Review process

**Step 1: Reconnaissance**
- Use Bash: `git diff --name-only` to see recent changes
- Focus review on modified files

**Step 2: Security scan**
Check for OWASP Top 10 issues:

1. **Injection** (SQL, NoSQL, Command)
   - Use Grep: search for patterns like `exec(`, `eval(`, raw SQL concatenation

2. **Broken Authentication**
   - Grep for: hardcoded passwords, weak session management

3. **Sensitive Data Exposure**
   - Grep for: API keys, tokens, credentials in code
   - Patterns: `API_KEY`, `SECRET`, `PASSWORD`, `.env` files committed

4. **XML External Entities (XXE)**
   - Check XML parsers configuration

5. **Broken Access Control**
   - Review authorization checks

6. **Security Misconfiguration**
   - Check for debug mode in production

7. **Cross-Site Scripting (XSS)**
   - Grep for: unescaped user input in HTML

8. **Insecure Deserialization**
   - Check serialization libraries usage

9. **Using Components with Known Vulnerabilities**
   - Read package.json/requirements.txt, flag outdated packages

10. **Insufficient Logging & Monitoring**
    - Check error handling and logging

**Step 3: Report**

Format findings:

### CRITICAL Issues (fix immediately)
- **File**: `src/auth.ts:42`
- **Issue**: SQL Injection vulnerability
- **Evidence**: Direct string concatenation in query
- **Risk**: Attacker can execute arbitrary SQL
- **Recommendation**: Use parameterized queries

### WARNINGS (should fix)
...

### Good Practices Found
...

## Output guidelines

- Provide specific line numbers
- Include code snippets showing the issue
- Explain the risk in business terms
- Suggest concrete fixes
- Do NOT fix issues yourself (read-only agent)
````

```
You: Review the code for security issues

Claude (Main): Delegating to security-auditor agent...

[Subagent security-auditor:]
- Bash: git diff --name-only
- Read: modified files
- Grep: searches for vulnerability patterns
- Analyzes in its own context (does not pollute the main thread)
- Generates a report

Claude (Main): [receives only the findings report]
Found 3 critical issues:
1. SQL injection in src/db.ts:156
2. Hardcoded API key in config/app.ts:23
...
```

**Wynik:** Główny kontekst nie zawiera treści setek linii kodu, tylko czysty raport z zagrożeniami. Agent nie może wprowadzać zmian (tylko Read tools). Repeatable – możesz uruchomić w CI/CD.

## Najczęstsze wpadki (i jak ich uniknąć)

- `description` jest zbyt ogólne: agent odpala się w losowych momentach.
- Za dużo `tools`: agent "może wszystko", a Ty tracisz kontrolę i bezpieczeństwo.
- Brak kontraktu wyjścia: bez JSON/tabeli agent oddaje esej, którego nie da się automatycznie przerobić.
- Zbyt długi prompt agenta: potem płacisz za niego przy każdym uruchomieniu.

Karina podsumowuje to swoim zdaniem:

— Czyli subagent to nie „jeszcze jeden prompt”, tylko rola + uprawnienia + kontrakt.

— Dokładnie. I dlatego działa — odpowiada Paweł.

## Co dalej (cz. 2)

W kolejnej lekcji przechodzimy na poziom "zespół":

- proces: Research → Spec → Implementacja → QA,
- dobór modeli do zadań (żeby było i dobrze, i tanio),
- pipeline'y (dokumenty, support, marketing),
- uprawnienia i hooki.

## Słowniczek

**Kontekst / Okno kontekstowe** – Pamięć rozmowy dostępna dla AI. Każdy token w kontekście wpływa na koszt i jakość odpowiedzi. Claude Code używa okien kontekstowych od ~100k do 200k tokenów w zależności od modelu.

**Token** – Podstawowa jednostka tekstu dla AI (zazwyczaj 3-4 znaki w języku angielskim, 1-2 znaki w polskim). Używana do mierzenia długości kontekstu i kosztów.

**Context pollution** – Zanieczyszczenie kontekstu niepotrzebną informacją z poprzednich kroków analizy, prowadzące do degradacji jakości odpowiedzi i wzrostu kosztów.

**Main Agent** – Główna instancja Claude w Twojej rozmowie. Deleguje zadania do subagentów i otrzymuje wyniki.

**Subagent** – Wyspecjalizowana instancja Claude działająca w oddzielnym oknie kontekstowym. Ma własne narzędzia, uprawnienia i instrukcje.

**Delegacja** – Proces przekazywania zadania przez Main Agent do subagenta. Claude automatycznie wybiera odpowiedniego subagenta na podstawie `description`.

**YAML frontmatter** – Sekcja metadanych na początku pliku markdown, zawarta między `---`. Definiuje konfigurację subagenta (name, description, tools, model).

**Tools** – Narzędzia dostępne dla subagenta (Read, Write, Edit, Bash, Grep, Glob, WebFetch). Można ograniczać dostęp dla bezpieczeństwa.

**Permission mode** – Tryb uprawnień subagenta: `default` (pyta o zgodę), `acceptEdits` (auto-akceptuje edycje), `dontAsk` (nie prosi o uprawnienia; działa tylko w ramach dozwolonych narzędzi), `delegate` (tryb koordynacyjny), `plan` (tryb planowania / eksploracji), `bypassPermissions` (pomija sprawdzenia — ostrożnie).

**OWASP Top 10** – Lista 10 najważniejszych zagrożeń bezpieczeństwa aplikacji webowych, publikowana przez Open Web Application Security Project.

**CLI (Command Line Interface)** – Interfejs wiersza poleceń, terminal. W kontekście Claude Code: `claude` to główna komenda CLI.

**Git worktree** – Mechanizm Git pozwalający mieć wiele working directories dla tego samego repozytorium.

**MCP (Model Context Protocol)** – Protokół pozwalający Claude Code łączyć się z zewnętrznymi źródłami danych i narzędziami.

## Dokumentacja

1. Subagents overview: https://code.claude.com/docs/en/sub-agents
2. Hooks: https://code.claude.com/docs/en/hooks
3. MCP: https://code.claude.com/docs/en/mcp
