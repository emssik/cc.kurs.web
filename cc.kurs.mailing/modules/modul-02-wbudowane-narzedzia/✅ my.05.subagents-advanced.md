---
lesson: "02.05"
title: "Subagenty w Claude Code cz. 2: Architektura Zespołów AI i Orkiestracja"
description: "Zaawansowane workflow: Research → Spec → Implementacja → QA, dobór modeli, uprawnienia i hooki"
module: "02-wbudowane-narzedzia"
---

# Subagenty w Claude Code cz. 2: Architektura Zespołów AI i orkiestracja

W cz. 1 chodziło o "czysty kontekst". W cz. 2 chodzi o dowożenie wyniku.

Karina wraca po weekendzie z jednym celem: „zrobić OAuth logowanie porządnie”.

Widzi Pawła przy tablicy. Zamiast jednego wielkiego prompta ma rozpisany proces jak mini-pipeline.

— To wygląda jak plan projektu, a nie prompt — mówi Karina.

— Bo to jest plan projektu — odpowiada Paweł. — Najprostsza zmiana myślenia:

- nie prosisz jednego agenta: „zrób wszystko”,
- układasz proces,
- pilnujesz kontraktów (specyfikacja i format wyjścia).

## Co wyniesiesz z tej lekcji

- Masz gotowy workflow: Research → Spec → Implementacja → QA.
- Wiesz jak podzielić role między agentami (i kiedy nie ma sensu).
- Umiesz dobrać model do zadania: tani do „objazdówki”, mocny do decyzji.
- Ustawiasz bezpieczne uprawnienia i automaty (hooki).

## 1. Proces, który działa: Research → Spec → Implementacja → QA

Wyobraź sobie, że masz zrobić logowanie OAuth. Da się to zrobić „w jednym czacie”, ale często kończy się tak:

- agent miesza dwa różne flow,
- gubi detale z dokumentacji,
- a Ty debugujesz rozmowę zamiast kodu.

Zamiast tego ustawiasz linię produkcyjną. Główny agent orkiestruje, subagenty robią swoje, a „źródłem prawdy” jest plik `SPEC.md`.

### Etap 1: Research (równolegle)

Paweł zaczyna od delegacji:

— Zanim dotkniemy kodu, chcę trzy krótkie raporty. Bez wklejania dokumentacji. Tylko: co jest ważne + ryzyka + gdzie w repo to wpinamy.

Odpalasz 3–5 subagentów do wąskich tematów. Każdy wraca z krótkim raportem, a nie z kopią dokumentacji.

Przykład polecenia:

```
Run parallel research (separate subagents):
1) OAuth docs for provider X: required endpoints, parameters, edge cases
2) Our codebase: where auth lives today and what the current session flow is (point to files)
3) Security: token storage, refresh, rate limiting, CSRF

Return only a report: 10-15 bullets + risks + list of files to touch.
```

Karina pyta:

— Czemu tak uparcie „tylko raport”?

— Bo raport jest wynikiem. Dokumentacja jest surowcem. A surowiec ma nie lądować w głównym wątku — odpowiada Paweł.

### Etap 2: Specyfikacja (jeden plik, zero domysłów)

To jest moment, w którym AI najbardziej się opłaca: spisujesz decyzje zanim ktoś napisze kod.

`SPEC.md` powinien odpowiadać na 5 pytań:

1. Co dowozimy (wymagania)?
2. Jak to wpinamy (architektura, pliki)?
3. Co z danymi (schema, migracje)?
4. Co z bezpieczeństwem (konkretne zasady)?
5. Jak sprawdzamy (testy/QA)?

Minimalny przykład:

```markdown
# Feature: OAuth2 Login

## Requirements
- Provider: Google + GitHub
- Session: JWT + refresh
- Rate limiting: 5 attempts / 15 min

## Files
- `src/auth/oauth.ts` (provider)
- `src/auth/jwt.ts` (tokens)
- `src/middleware/rate-limit.ts`

## Security
- Secrets in ENV only
- Tokens must not be logged

## Tests
- Unit: JWT validation
- Integration: OAuth callback
```

Paweł dopina zasadę, która oszczędza najwięcej czasu:

— `SPEC.md` jest kontraktem. Jeśli czegoś tam nie ma, to tego nie wymyślamy w trakcie implementacji. Najpierw doprecyzowanie, potem kod.

### Etap 3: Implementacja (z kontraktem)

Implementer ma proste zadanie: „zrób to jak w specyfikacji”.

Dwie praktyczne zasady:

- implementer nie ma prawa wymyślać brakujących wymagań,
- jeśli spec ma dziurę, wracasz do etapu 2 zamiast poprawiać kod na ślepo.

Karina notuje to w swoim stylu:

— „Nie debuguj kodu, debuguj spec”?

— Tak — śmieje się Paweł. — I to działa w 80% przypadków.

### Etap 4: QA (bez dopisywania nowych feature’ów)

QA agent nie implementuje. On sprawdza:

- czy spec został spełniony,
- czy są regresje,
- czy testy przechodzą,
- czy w diffach nie ma „przypadkowych zmian”.

## 2. Wzorzec: role i modele (marketing)

Wyobraź sobie kampanię marketingową. W jednym wątku da się to zrobić, ale dużo łatwiej, gdy masz role:

- strateg: robi decyzje i kierunek,
- analityk konkurencji: zbiera dane,
- copywriter: generuje warianty,
- redaktor: tnie i dopasowuje.

Nie musisz odpalać najmocniejszego modelu do każdej czynności. Ustawienie, które zwykle działa:

- model mocniejszy: strategia, decyzje, architektura,
- model pośrodku: analiza, synteza,
- model szybki/tani: warianty treści, korekta.

Jeśli chcesz mieć to „na stałe”, trzymaj agentów w repo, np. `.claude/agents/marketing-strategist.md`, `.claude/agents/competitor-analyst.md`, `.claude/agents/content-generator.md`.

Karina zauważa analogię:

— Czyli to jest jak z zespołem: nie dajesz seniora do przepisywania tekstu.

— Dokładnie. Model to koszt. Rola to odpowiedzialność. A proces to przewidywalność — odpowiada Paweł.

## 3. Wzorzec: pipeline do dokumentów (biznes)

Firma ma faktury, umowy i paragony. Jedno polecenie do jednego agenta zwykle kończy się tym, że robi wszystko „jakoś”.

Pipeline działa lepiej, bo każdy agent robi jedną rzecz:

1. `document-classifier` (tani): co to jest?
2. `invoice-extractor` (dokładny): wyciągnij pola → JSON
3. `invoice-validator` (kontrakt): sprawdź sumy i anomalie
4. `document-archiver` (operacyjny): nazwij, odłóż, zapisz metadane

Paweł dodaje praktyczny detail:

— Im krótszy kontrakt między etapami, tym lepiej. Najczęściej JSON albo jedno słowo.

Przykładowa konfiguracja (skrócona):

````markdown
---
name: document-classifier
description: Classifies a document as invoice/contract/receipt. Use as the first step in a document pipeline.
model: haiku
tools: Read
permissionMode: plan
---

Read the document and return a single word only: Invoice / Contract / Receipt / Other.
````

Klucz: `permissionMode: plan` i brak narzędzi do edycji chronią Cię przed przypadkową „kreatywnością” agenta.

## 4. Permission hygiene: minimum narzędzi, maksimum kontroli

Zasada najmniejszych uprawnień:

- agent do analizy: `Read, Grep, Glob` (bez `Write/Edit/Bash`),
- agent do zmian: dostaje `Edit/Write`, ale tylko gdy naprawdę musi,
- agent „audyt”: `permissionMode: plan`.

Skrócony przykład audytora:

````markdown
---
name: security-auditor
description: Security audit for code (read-only). Use after significant changes.
model: sonnet
tools: Read, Grep, Glob
permissionMode: plan
---

Review diffs and changed files for: injection, XSS, leaked secrets, missing input validation.
Return a report: CRITICAL/WARN + file and line + recommendation.
````

Karina łapie sedno:

— Czyli „narzędzia” to nie są bajery, tylko granice.

— Tak. Granice, które Cię chronią. I sprawiają, że wynik jest powtarzalny — mówi Paweł.

### Frontmatter subagenta: kompletna ściąga pól

Karina otwiera plik agenta i mówi:

— Okej, ale jak mam nie zgubić tych wszystkich opcji w YAML?

Paweł podsuwa jej „ściągę” — pełny nagłówek frontmatter, z którego potem wycinasz to, czego nie potrzebujesz:

````yaml
---
# Wymagane
name: security-auditor
description: Use this agent to review code for security vulnerabilities and OWASP compliance.

# Konfiguracja
model: opus               # inherit | sonnet | opus | haiku
color: red                # np. red/blue/gold/purple/cyan/yellow

# Narzędzia
tools:
  - Read
  - Glob
  - Grep
  # Specjalne:
  # - Task                # pozwala uruchamiać innych subagentów (np. Task(worker, researcher))
disallowedTools:
  - Write
  - Edit
  - Bash

# Uprawnienia
permissionMode: dontAsk   # default | acceptEdits | dontAsk | delegate | plan | bypassPermissions

# Kontekst i „pakiety” zachowań
skills:
  - security-best-practices
memory: project           # user | project | local

# Integracje
mcpServers: ["github", "postgres"]

# Bezpieczniki
maxTurns: 15

# Hooki per-agent (cykl życia agenta)
hooks:
  PreToolUse: []
  PostToolUse: []
  Stop: []
---
````

Paweł dopina zasady użycia (żeby nie zrobić sobie krzywdy):

- `name` i `description` są kluczowe: `name` identyfikuje agenta, a `description` steruje automatyczną delegacją.
- `tools` to allowlist. Jeśli je pominiesz, agent zwykle odziedziczy narzędzia z głównej rozmowy (co bywa zbyt szerokie).
- `disallowedTools` to denylist — idealne, gdy dziedziczysz narzędzia, ale chcesz zablokować destrukcyjne akcje.
- `permissionMode` reguluje „temperaturę” proszenia o zgodę: od bezpiecznego `default`, przez automaty (`acceptEdits`), po read-only (`plan`) i tryby „bez pytania” (`dontAsk`, `bypassPermissions`).
- `skills` nie dziedziczą się automatycznie — subagent ładuje tylko te, które mu wskażesz.
- `hooks` to hooki cyklu życia: `PreToolUse`, `PostToolUse`, `Stop` (w konfiguracjach globalnych często spotkasz też event `SubagentStop`).
- `maxTurns` jest hamulcem ręcznym na pętle.

## 5. Hooki: automaty po pracy agenta

Hooki to prosta rzecz: agent kończy robotę, a Ty automatycznie odpalasz narzędzie.

Przykłady:

- formatowanie po implementacji,
- testy po zmianach,
- szybki lint po edycji.

```json
{
  "hooks": {
    "SubagentStop": [
      {
        "matcher": "feature-developer",
        "hooks": [
          { "type": "command", "command": "npm test -- --changed --bail" }
        ]
      }
    ]
  }
}
```

Paweł dorzuca zdroworozsądkową zasadę:

— Hooki mają być szybkie. Jeśli coś trwa 20 minut, to nie rób tego na każdym `SubagentStop`. Zrób szybki smoke-test, a pełne testy wrzuć w CI.

## 6. MCP: subagent z dostępem do systemów zewnętrznych

Jeśli masz MCP, subagent może pobierać dane z narzędzi typu helpdesk czy repo.

````markdown
---
name: support-agent
description: Helps reply to a support ticket: pulls context via MCP and drafts a response.
model: sonnet
tools: Read, mcp__zendesk__*
---

Fetch the ticket, review customer history, and draft a response. Return only the draft + KB links.
````

W praktyce główny wątek dostaje krótką propozycję odpowiedzi zamiast surowej historii.

Karina dodaje:

— Czyli zamiast wklejać trzy ekrany ticketa do czatu, zlecam to agentowi i dostaję draft.

— Dokładnie. I jeszcze masz powtarzalny format: draft + linki — mówi Paweł.

Jeśli chcesz ograniczyć integracje tylko do wybranych źródeł, używasz `mcpServers` (np. tylko `["zendesk"]` albo `["github", "postgres"]`) — wtedy agent nie ma „przypadkowego” dostępu do innych serwerów MCP.

## 7. Kiedy subagenty nie mają sensu

- Jedno krótkie pytanie: prościej odpowiedzieć w głównym wątku.
- Bardzo małe zadania, gdzie narzut uruchomienia agenta dominuje czas pracy.
- Gdy nie masz kontraktu (spec/format wyjścia) i agent ma za dużo swobody.

## 8. Zadanie domowe (realne i przydatne)

Zbuduj mini-zespół do raportów z PDF:

1. `data-analyst` (model pośrodku): czyta PDF i zwraca JSON z liczbami/danymi.
2. `report-writer` (model pośrodku): pisze raport w Markdown na podstawie JSON.
3. `proofreader` (model szybki/tani): poprawia język i format.

W `description` dopisz, w jakiej kolejności mają być użyci (np. „Użyj jako pierwszy/ostatni krok”).

Jeśli chcesz, możesz dopisać jeden detal, który robi ogromną różnicę: „Zwracaj wyłącznie wynik w ustalonym formacie. Zero komentarzy.” To jest mała rzecz, a w praktyce ratuje pipeline.

## Słowniczek (krótko)

**SDD (Spec-Driven Development)** – najpierw spec, potem kod. Oddziela decyzje od implementacji.

**Pipeline** – łańcuch etapów, gdzie każdy agent robi jedną rzecz i przekazuje wynik dalej.

**MCP** – integracja z zewnętrznymi narzędziami przez ustandaryzowany protokół.

**Permission hygiene** – daj agentowi tylko te narzędzia, których potrzebuje.

## Dalsze materiały

1. Subagents: https://code.claude.com/docs/en/sub-agents
2. Hooks: https://code.claude.com/docs/en/hooks
3. MCP: https://code.claude.com/docs/en/mcp
