# Mail 7: CLAUDE.md - zbuduj pamięć projektu

---

## Przypomnienie z poprzedniej lekcji

W lekcji 6 poznaliśmy system uprawnień i bezpieczeństwa w Claude Code. Pamiętaj, że:

- **Sandbox mode** chroni Twój system, izolując Claude do katalogu projektu
- **Tryby uprawnień** dają Ci kontrolę nad tym, co Claude może zrobić (normal, accept edits, plan, bypass)
- **Allow/deny lists** pozwalają precyzyjnie określić, które operacje są dozwolone
- **Ochrona wrażliwych plików** (`.env`, `.aws/`, `.ssh/`) to podstawa bezpiecznej pracy

Dziś przejdziemy o krok dalej - nauczysz się budować pamięć projektu, która pozwoli Claude lepiej rozumieć Twoją aplikację i pracować bardziej efektywnie.

---

## Pytania kontrolne z lekcji 6

Zanim przejdziemy dalej, sprawdź swoją wiedzę:

1. **Jakie są cztery główne tryby uprawnień w Claude Code i kiedy każdy z nich używać?**
   - Normal, accept edits, plan, bypass - czy pamiętasz różnice?

2. **Jak zabezpieczyć pliki z sekretami przed przypadkowym odczytem przez Claude?**
   - Wskazówka: PreToolUse hook i lista chronionych wzorców

---

## TLDR (Too Long, Didn't Read)

**CLAUDE.md to pamięć projektu** - plik, który Claude automatycznie czyta przy każdej sesji. Dzięki niemu AI wie, jak zbudowana jest Twoja aplikacja, jakie są konwencje i jak uruchamiać testy.

**Kluczowe punkty:**
- `CLAUDE.md` w głównym katalogu = instrukcje dla projektu
- `~/.claude/CLAUDE.md` = globalne preferencje użytkownika
- Komenda `/init` generuje szkielet automatycznie
- Traktuj go jak onboarding dla nowego członka zespołu (programisty, marketera, PM - każdego!)
- Hierarchia: enterprise → project → user → local

**W 5 minut:** Uruchom `/init` w swoim projekcie, edytuj wygenerowany `CLAUDE.md`, dodaj komendy build/test i strukturę folderów.

---

## Mem z Twitter

https://twitter.com/levelsio/status/1735892847392837632

> "Documentation is a love letter to your future self"
>
> Doskonale oddaje sens CLAUDE.md - to nie tylko dokumentacja dla Claude, ale przede wszystkim dla Ciebie za 6 miesięcy, gdy wrócisz do projektu i nie będziesz pamiętać, jak się wszystko uruchamia.

Dobry CLAUDE.md to jak mapa skarbów dla każdego nowego członka zespołu (w tym Claude). Bez niego każdy musi odkrywać projekt od nowa.

---

## Treść lekcji: CLAUDE.md - Pamięć projektu

### Czym jest CLAUDE.md?

CLAUDE.md to specjalny plik, który Claude Code automatycznie ładuje przy każdej sesji. To kontekst, który nie znika po zamknięciu terminala. Dzięki niemu Claude pamięta:
- Jak zbudowany jest Twój projekt
- Jakie komendy uruchamiają build i testy
- Jakie są standardy i konwencje kodowania
- Co jest ważne, a co można pominąć

**Analogia:** Wyobraź sobie, że zatrudniasz nowego juniora. Możesz mu każdego dnia tłumaczyć od nowa, gdzie są testy i jak je uruchomić... albo dać mu dokumentację i zacząć produktywną pracę od razu.

### Hierarchia plików CLAUDE.md

Claude Code ładuje pliki w określonej kolejności. Im wyżej, tym wyższy priorytet:

1. **Enterprise policy** (ustawienia organizacji - dla dużych firm)
2. **Project memory**: `./CLAUDE.md` lub `./.claude/CLAUDE.md` - instrukcje dla tego konkretnego projektu (oba są równoważne)
3. **Project rules**: `./.claude/rules/*.md` - modularyzacja reguł (zaawansowane)
4. **User memory**: `~/.claude/CLAUDE.md` - globalne preferencje użytkownika
5. **Project local**: `./CLAUDE.local.md` - prywatne notatki (ignorowane przez git)

**Praktycznie:**
- `~/.claude/CLAUDE.md` - "Zawsze używaj TypeScript", "Nie używaj emoji w commitach"
- `./CLAUDE.md` - "To projekt Next.js, struktura w `/app`, testy przez `npm test`"
- `./CLAUDE.local.md` - "Moja lokalna baza działa na porcie 5433", "Test API key: sk-test-123"

### Komenda /init - Automatyczny start

Najszybszy sposób na stworzenie CLAUDE.md:

```bash
# W katalogu projektu
claude

> /init
```

Komenda `/init` automatycznie generuje szkielet CLAUDE.md, analizując Twój projekt (package.json, strukturę folderów, README). Claude stworzył gotową bazę, którą następnie możesz edytować i dostosować do swoich potrzeb.

**Szybka edycja z poziomu sesji:**
```bash
> /memory
```

To otworzy edytor z CLAUDE.md, gdzie możesz dodać nowe reguły bez opuszczania CLI.

### Import plików - składnia @

W CLAUDE.md możesz zaimportować zawartość innych plików:

```markdown
# W CLAUDE.md

## Project Overview
See @README.md for general information

## Available Commands
See @package.json for npm scripts

## Architecture
See @docs/architecture.md for system design

## API Documentation
See @docs/api-spec.yaml
```

Claude automatycznie załaduje te pliki do kontekstu. To oszczędza miejsce i pozwala uniknąć duplikacji.

**Przykłady:**
- `@README.md` - import z bieżącego katalogu
- `@docs/setup.md` - import z podkatalogu
- `@~/.claude/global-rules.md` - import z katalogu domowego

**Limit głębokości importów:** Zaimportowane pliki mogą rekurencyjnie importować kolejne pliki, ale maksymalna głębokość to **5 poziomów** (5 "hop'ów"). To zabezpieczenie zapobiega nieskończonym pętlom i nadmiernemu ładowaniu kontekstu.

### Dobra praktyka - jak pisać CLAUDE.md

**Złota zasada:** Traktuj CLAUDE.md jak dokument onboardingowy dla nowego członka zespołu - czy to programisty, marketera, project managera czy pisarza.

Musi zawierać:
- **Setup commands** - jak zainstalować i uruchomić projekt
- **Struktura folderów** - gdzie jest co
- **Komendy build/test** - jak sprawdzić, czy wszystko działa
- **Konwencje** - jak nazywać pliki, gdzie dodawać nowe funkcje

**Nie powinien zawierać:**
- Sekretów (hasła, API keys) - użyj zmiennych środowiskowych
- Bardzo szczegółowych implementacji - to miejsce na docs/
- Duplikatów README - lepiej zaimportuj przez @README.md

---

## Przykłady CLAUDE.md od podstaw do eksperta

### Level 1: Minimalny CLAUDE.md (quick start)

Wystarczy na start dla małego projektu:

```markdown
# My Project

## Setup
- npm install
- npm run dev (starts on :3000)
- npm test

## Structure
- src/ - aplikacja
- tests/ - testy
- docs/ - dokumentacja
```

**Kiedy wystarczy:** Małe projekty, prototypy, nauka.

---

### Level 2: Rozbudowany (production-ready)

Dla większych projektów potrzebujesz więcej szczegółów:

````markdown
# E-Commerce Platform

## Tech Stack
- **Frontend:** React 18 + TypeScript + Vite
- **Backend:** Node.js + Express + PostgreSQL
- **Testing:** Jest + React Testing Library + Playwright
- **Deployment:** Vercel (frontend) + Railway (backend)

## Development
```bash
# Setup
npm install
cp .env.example .env  # Wypełnij DATABASE_URL

# Development
npm run dev          # Start dev server (:3000)
npm run dev:backend  # Start API (:8080)
npm test             # Unit tests
npm run test:e2e     # E2E tests (wymaga running server)

# Building
npm run build        # Production build
npm run preview      # Preview production build
```

## Architecture
```
src/
├── components/    # Reusable React components
│   ├── ui/       # Shadcn/ui components
│   └── features/ # Feature-specific components
├── pages/        # Next.js-style pages
├── hooks/        # Custom React hooks
├── services/     # API calls and external services
├── utils/        # Utility functions
└── types/        # TypeScript type definitions
```

## Coding Standards
- **Imports:** Use absolute imports (@/components vs ../components)
- **Components:** Always functional, use hooks, no class components
- **Styling:** Tailwind CSS, avoid inline styles
- **State:** Zustand for global, useState for local
- **Error handling:** Always use try/catch, return meaningful errors
- **Commit messages:** Conventional Commits (feat:, fix:, docs:, etc.)

## Database
- **ORM:** Prisma
- **Migrations:** `npm run db:migrate`
- **Reset DB:** `npm run db:reset` (dev only!)
- **Seed:** `npm run db:seed`

## Common Tasks
- **Add new component:** Use template in `scripts/new-component.sh`
- **Add new API endpoint:** Follow pattern in `src/api/users.ts`
- **Update dependencies:** `npm run update-deps` (runs audit + update)

## Testing
- Coverage minimum: 80%
- Always test: API endpoints, custom hooks, utils
- E2E: Critical user flows only (auth, checkout)

## Deployment
- **Staging:** Auto-deploy on push to `develop`
- **Production:** Manual deploy from `main` (needs approval)
- **Rollback:** `git revert` + push (auto-deploys)

## Troubleshooting
- **Port 3000 in use:** `lsof -ti:3000 | xargs kill -9`
- **DB connection failed:** Check DATABASE_URL in .env
- **Tests failing:** Clear cache `npm run test:clear-cache`
````

**Kiedy używać:** Projekty produkcyjne, praca zespołowa, częste onboarding nowych osób.

---

### Level 3: Expert (multi-environment, team scale)

Dla dużych zespołów i złożonych projektów:

````markdown
# Enterprise SaaS Platform

## Quick Links
- [API Docs](https://api.company.com/docs)
- [Figma](https://figma.com/file/...)
- [Confluence](https://company.atlassian.net/...)
- [Jira Board](https://company.atlassian.net/jira/...)

## Tech Stack & Versions (as of 2024-12)
- **Frontend:** Next.js 14 (App Router) + TypeScript 5.3 + React 18.2
- **Backend:** NestJS 10 + GraphQL + TypeORM
- **Database:** PostgreSQL 15 (primary) + Redis 7 (cache) + Elasticsearch 8 (search)
- **Auth:** Auth0 (production) + Mock auth (development)
- **Payments:** Stripe API v2023-10-16
- **Testing:** Jest 29 + Playwright 1.40 + Storybook 7
- **Infra:** Kubernetes + Terraform + ArgoCD

## Environment Setup

### Prerequisites
```bash
- Node 20.x (use nvm: `nvm use`)
- Docker Desktop 4.x (for local DB)
- kubectl & helm (for K8s debugging)
- AWS CLI v2 (for S3 access)
```

### First Time Setup
```bash
# 1. Install dependencies
npm install

# 2. Setup local environment
cp .env.example .env.local
./scripts/setup-dev.sh  # Interactive wizard

# 3. Start infrastructure
docker-compose up -d  # DB, Redis, Elasticsearch

# 4. Run migrations & seed
npm run db:migrate
npm run db:seed -- --env=dev

# 5. Verify setup
npm run doctor  # Checks all dependencies
```

### Daily Development
```bash
# Start all services
npm run dev:all  # Frontend (:3000) + Backend (:8080) + Storybook (:6006)

# Or individually:
npm run dev           # Frontend only
npm run dev:backend   # Backend only
npm run dev:docs      # Storybook
```

## Architecture Decisions (ADRs)

### State Management
- **Global state:** Zustand (NOT Redux - deprecated 2024-01)
- **Server state:** React Query v5 (TanStack Query)
- **Form state:** React Hook Form + Zod validation
- **URL state:** Next.js searchParams (no query-string lib)

### API Patterns
- **REST vs GraphQL:**
  - Public API: REST (versioned: /api/v1/)
  - Internal: GraphQL (single endpoint: /graphql)
- **Pagination:** Cursor-based (NOT offset/limit)
- **Error format:** RFC 7807 Problem Details

### Styling
- **CSS Framework:** Tailwind CSS 3 (config: tailwind.config.ts)
- **Component Library:** Custom (based on shadcn/ui)
- **Icons:** Lucide React (NOT FontAwesome - deprecated)
- **Fonts:** Inter (variable) loaded via next/font

### Testing Strategy

#### Unit Tests
- **Coverage Target:** 90%
- **Test Location:** `*.test.ts` (obok plików źródłowych)
- **Mock External APIs:** Tak (wszystkie zewnętrzne zależności)
- **Run on Pre-commit:** Tak (szybkie, muszą przejść)
- **Run on PR:** Tak

#### Integration Tests
- **Coverage Target:** 70%
- **Test Location:** `*.test.ts` (obok plików źródłowych)
- **Mock External APIs:** Tak (ale mniej niż w unit)
- **Run on Pre-commit:** Nie (zbyt wolne)
- **Run on PR:** Tak

#### E2E Tests
- **Coverage Target:** 30% (tylko critical flows)
- **Test Location:** `e2e/` (osobny katalog)
- **Mock External APIs:** Nie (testujemy prawdziwe integracje)
- **Run on Pre-commit:** Nie (bardzo wolne)
- **Run on PR:** Tak

## Team Conventions

### Branch Naming
- `feature/JIRA-123-short-description`
- `bugfix/JIRA-456-short-description`
- `hotfix/critical-issue-description`
- `chore/update-dependencies`

### Commit Messages (Conventional Commits)
```
feat(auth): add OAuth2 support for Google
fix(api): handle null values in user profile
docs(readme): update setup instructions
chore(deps): upgrade Next.js to 14.1
test(users): add integration tests for CRUD
refactor(payments): extract Stripe logic to service
perf(db): add index on user_id for faster lookups
```

### Code Review Checklist
- [ ] Tests pass locally and on CI
- [ ] Code follows style guide (checked by lint)
- [ ] No console.log or debugger statements
- [ ] Error handling is comprehensive
- [ ] Security: no hardcoded secrets, sanitized inputs
- [ ] Performance: no N+1 queries, optimized images
- [ ] Accessibility: ARIA labels, keyboard navigation
- [ ] Documentation: JSDoc for complex functions

## Common Issues & Solutions

### "Module not found" after git pull
```bash
# Stale node_modules
rm -rf node_modules package-lock.json
npm install
```

### "Database schema out of sync"
```bash
# Reset database (DEV ONLY!)
npm run db:reset
npm run db:seed
```

### "Port already in use"
```bash
# Find and kill process
lsof -ti:3000 | xargs kill -9  # Frontend
lsof -ti:8080 | xargs kill -9  # Backend
```

## Security Best Practices

- **Secrets:** NEVER commit to git. Use .env.local (gitignored)
- **API Keys:** Rotate every 90 days (Notion reminder)
- **Dependencies:** Run `npm audit` weekly, fix HIGH/CRITICAL immediately
- **Auth tokens:** Expire after 1h (refresh token pattern)
- **CORS:** Whitelist domains in api/src/config/cors.ts
- **Rate limiting:** Enabled by default (100 req/min per IP)

## Resources

- **Onboarding Doc:** [Notion](https://notion.so/...)
- **API Playground:** [GraphiQL](http://localhost:8080/graphql)
- **Component Library:** [Storybook](http://localhost:6006)
- **Deployment Logs:** [Vercel](https://vercel.com/...)
- **Slack Channels:**
  - `#eng-team` - General engineering
  - `#deploys` - Deployment notifications
  - `#incidents` - Production incidents
````

**Kiedy używać:** Duże zespoły (10+ osób), enterprise, wymagane compliance i standardy.

---

## CLAUDE.md poza programowaniem - przykłady dla każdego

Claude Code to narzędzie nie tylko dla developerów! Oto jak CLAUDE.md może pomóc w różnych zawodach:

### Dla marketerów - Kampania marketingowa

```markdown
# Kampania Q1 2025: Brand Awareness

## Brand Voice Guidelines
- Ton: Przyjazny, ale profesjonalny
- Używamy "Ty" zamiast "Pan/Pani"
- Emoji: Maksymalnie 1-2 na post (❤️ ✨)
- Unikamy: Wykrzykników, agresywnej sprzedaży

## Content Calendar
- Blog: Poniedziałki 10:00
- LinkedIn: Wt/Czw 14:00
- Newsletter: Piątki 9:00

## Approved Channels
- LinkedIn, Instagram, Blog
- NIE UŻYWAJ: Twitter (pauzujemy do końca Q1)

## Campaign Hashtags
- Primary: #BrandName2025
- Secondary: #IndustryLeader

## Target Audience
- Wiek: 25-45 lat
- Branża: Tech, startups, SMB
- Pain points: Brak czasu, przepełniony inbox, chaos w projektach

## Common Tasks
- "Create 5 LinkedIn post ideas about [topic]"
- "Analyze campaign performance from @analytics.csv"
- "Draft email sequence for lead nurturing"
- "Rewrite this copy to be more engaging"
```

**Przykład użycia:**
```bash
> Analyze last week's campaign from @analytics.csv and suggest 3 improvements
```

Claude będzie wiedział, jakie hashtagi używać, jaki ton zachować, i które kanały są aktywne.

---

### Dla Project Managerów - Zarządzanie zespołem

```markdown
# Project: Mobile App Launch

## Team & Roles
- Dev team: 4 developers (Anna, Bartek, Ola, Tomek)
- Designer: 1 UI/UX (Kasia)
- QA: 1 tester (Marcin)
- Stakeholders: CEO (Jan), CTO (Ewa)

## Sprint Info
- Duration: 2 weeks
- Current Sprint: #12 (ends Dec 22)
- Velocity: 25 story points (average)

## Meeting Schedule
- Daily standups: 9:00 (15min max)
- Sprint planning: Mondays 10:00 (2h)
- Sprint review: Last Friday 14:00 (1h)
- Retrospective: Last Friday 15:30 (1h)

## Top 3 Risks
1. **API integration delay** - HIGH (backend team blocked)
2. **Designer availability** - MEDIUM (vacation Dec 15-22)
3. **Budget overrun** - LOW (10% buffer remaining)

## Communication Rules
- Blockers: Immediately to Slack #dev-blockers
- Daily updates: End of day in Notion
- Escalations: Email + Slack mention to PM
- Client comms: Only via PM (no direct contact)

## Decision-Making Framework
- <$1000: PM decides
- $1000-5000: PM + CTO approval
- >$5000: Full stakeholder meeting

## Common PM Tasks
- "Create weekly status report for stakeholders based on @sprint-notes.md"
- "Draft risk mitigation plan for API delay"
- "Generate retrospective agenda from last sprint"
- "Calculate if we can finish feature X in current sprint based on velocity"
- "Prepare burndown chart from @jira-export.csv"
```

**Przykład użycia:**
```bash
> Based on current velocity and @backlog.md, can we finish user authentication in this sprint?
```

Claude zna zespół, velocity, i ryzyko - może realistycznie oszacować feasibility.

---

### Dla pisarzy - Projekt książkowy

```markdown
# Książka: "Skuteczna produktywność dla zabieganych"

## Style Guide
- **Ton:** Osobisty, jak rozmowa przy kawie
- **POV:** Pierwsza osoba ("nauczyłem się", "odkryłem")
- **Przykłady:** Zawsze z życia, konkretne sytuacje
- **Długość zdań:** Krótkie (max 20 słów), dynamiczne
- **Unikamy:** Abstrakcyjnych rad, cliché, nadużywania cudzysłowów

## Struktura książki
- **Rozdziały:** 12 (po 15 stron każdy = ~3500 słów)
- **Format rozdziału:**
  1. Hook (ciekawa historia/pytanie) - 300 słów
  2. Story (osobiste doświadczenie) - 800 słów
  3. Lesson (wyciągnięta nauka) - 1500 słów
  4. Exercise (praktyczne ćwiczenie dla czytelnika) - 400 słów
  5. Takeaways (bullet points) - 500 słów

## Target Audience
- Młodzi profesjonaliści (25-35 lat)
- Pracują w korporacjach/startupach
- Czują się przytłoczeni ilością zadań
- Chcą więcej wolnego czasu bez utraty kariery
- Nie są "productivity geeks" - szukają prostych rozwiązań

## Słowa kluczowe (SEO + branding)
- **Używaj często:** Produktywność, efektywność, work-life balance, nawyki, mindset, priorytetyzacja
- **UNIKAJ:** "hustle culture", "work harder", "grinding" (nie ten nurt!)

## Research Sources
- @research-notes/ - artykuły naukowe i badania
- @interviews/ - wywiady z 15 ekspertami (transkrypcje)
- @personal-stories/ - moje doświadczenia z dziennika (2020-2024)

## Ton Examples (do naśladowania)
✅ "Pamiętam ten poniedziałek, gdy siedziałem przed 47 otwartymi zakładkami..."
✅ "Odkryłem to przypadkiem, podczas gdy próbowałem..."
❌ "Badania pokazują, że produktywność jest kluczowa" (zbyt ogólne)
❌ "Musisz wstać o 5 rano i grindować!" (nie nasz ton)

## Common Writing Tasks
- "Expand this outline into full 3500-word chapter draft"
- "Find 3 scientific studies supporting [claim] from @research-notes/"
- "Rewrite this section to be more conversational and engaging"
- "Check if this chapter follows the 5-step structure"
- "Generate 10 title ideas for Chapter 5"
- "Extract 5 pull quotes from @draft-chapter-3.md for marketing"
```

**Przykład użycia:**
```bash
> Read @draft-chapter-3.md and rewrite opening paragraph to be more hooking. Use a personal story.
```

Claude będzie wiedział, jaki ton zachować, jaką strukturę stosować, i kogo masz na myśli jako czytelnika.

---

### Dla freelancerów - Business management

```markdown
# Mój Freelance Business: UX/UI Design

## Services & Pricing (2025)
- **Logo design:** $500-1500 (depending on revisions, typical: 3 rounds)
- **Website design:** $2000-5000 (5-10 pages, responsive)
- **Full branding package:** $3000-8000 (logo + guidelines + 20 materials)
- **Hourly consultations:** $75/h (max 2h per client/week)
- **Rush fee:** +30% (delivery <7 days)
- **Revision policy:** 3 rounds included, $150/extra round

## Client Onboarding Process
1. **Discovery call** (free, 30min via Zoom) - qualify the fit
2. **Send proposal** (use template @contracts/proposal-template.md)
3. **Contract + NDA** (via DocuSign)
4. **50% deposit required** (before work starts, non-refundable)
5. **Kickoff meeting** (1h, finalize brief, Zoom + record)
6. **Weekly check-ins** (Fridays 30min, show progress)

## Payment Terms
- **NET 14** for existing clients (worked 2+ times before)
- **50/50 split** for new clients (50% upfront, 50% on final delivery)
- **Payment methods:** Bank transfer (preferred), PayPal (-3% fee), Stripe (-2.9% fee)
- **Late payment:** 5% fee after 7 days overdue, work paused after 14 days
- **Currency:** USD only (converted at current rate for international)

## Invoice Reminders (automated via @scripts/invoice-reminder.sh)
- Day 7: Friendly reminder ("Just checking in...")
- Day 13: Second reminder (more direct, "Payment due tomorrow")
- Day 15: Final notice + late fee warning (5%)
- Day 20: Pause work, escalate, consider legal

## Contract Templates
- @contracts/design-agreement.pdf - standard design work
- @contracts/nda.pdf - for confidential projects
- @contracts/payment-terms.md - detailed billing
- @contracts/scope-change-request.md - when client wants extras

## Project Management
- **Tool:** Notion (share workspace with client for transparency)
- **Files:** Google Drive (folder per client, shared)
- **Communication:** Email (formal), Slack (quick questions, response <2h)
- **Deliverables:** Figma (design files), PDF (presentation), PNG (finals)
- **Backups:** Automatic daily to Dropbox

## Red Flags (when to say NO)
- Client wants "quick logo for $50"
- No budget discussion in discovery call
- Wants to pay after project completion (no deposit)
- Multiple decision-makers, unclear who approves
- Asks for work before contract signed
- Expects unlimited revisions

## Common Freelance Tasks
- "Draft proposal for [ClientName] based on @brief-2025-01-15.md"
- "Generate invoice for [ProjectName] completed this week, include tax"
- "Create 6-week timeline for branding project with milestones"
- "Check if [ClientName] payment is overdue and draft appropriate reminder"
- "Calculate total hours spent on [project] from @time-tracking.csv"
- "Prepare year-end tax summary from all invoices in @invoices/"
```

**Przykład użycia:**
```bash
> Generate professional invoice for "Acme Corp - Website Redesign" project, $4500, completed Jan 15, NET 14, include late fee policy
```

Claude będzie wiedział, jakie stawki stosujesz, jakie payment terms, i wygeneruje zgodną z Twoim stylem fakturę/propozycję.

---

**Dlaczego to ważne?**

CLAUDE.md to narzędzie **dla każdego**, nie tylko dla programistów. Marketing, zarządzanie, pisanie, freelancing - wszystkie te obszary zyskują mając "pamięć projektu", która pomaga Claude rozumieć kontekst Twojej pracy.

Kluczowa zasada pozostaje taka sama: **Traktuj CLAUDE.md jak onboarding doc dla nowego członka zespołu** - czy to programisty, marketera, PM, pisarza czy freelancera.

---

## Pro-tipy dla CLAUDE.md

### 1. Automatyczna generacja startowa

```bash
# W katalogu projektu:
claude

> /init
# Claude analizuje projekt i generuje CLAUDE.md

# Edytuj wygenerowany plik:
> Otwórz @CLAUDE.md i dodaj sekcję "Common Mistakes"
```

**Skills vs Slash Commands - kiedy używać czego?**

Ważna różnica między dwoma mechanizmami w Claude Code:

- **Slash commands** (`.claude/commands/`):
  - Proste, często używane prompty
  - Pojedynczy plik `.md` z komendą
  - Wywołujesz jawnie przez `/komenda`
  - Przykład: `/review` → "Review this code for bugs"

- **Skills** (`.claude/skills/`):
  - Kompleksowe możliwości z wieloma plikami
  - Katalog ze `SKILL.md` + dodatkowe zasoby (skrypty, dokumenty)
  - Claude używa automatycznie na podstawie kontekstu
  - Przykład: Skill do przetwarzania PDF ze skryptami i dokumentacją

**Kiedy używać slash commands:**
- Chcesz szybko wywołać gotowy prompt
- Potrzebujesz pełnej kontroli nad momentem uruchomienia
- Wystarczy jeden prosty plik

**Kiedy używać Skills:**
- Claude powinien automatycznie rozpoznać, kiedy użyć możliwości
- Potrzebujesz wielu plików (dokumentacja, skrypty, szablony)
- Chcesz zbudować kompleksowy workflow z walidacją

Oba mechanizmy mogą współistnieć w projekcie!

### 2. Szybkie dodawanie do pamięci

```bash
# W trakcie rozmowy użyj /memory do edycji CLAUDE.md:
> /memory
# Otworzy edytor z CLAUDE.md gdzie możesz dodać nowe reguły

# Lub bezpośrednio edytuj plik:
> Edit @CLAUDE.md i dodaj regułę: "Always use camelCase for variable names"
```

### 3. Template dla nowego projektu

```bash
# Skopiuj template z innego projektu:
cp ~/Projects/reference-project/CLAUDE.md ./

# Lub stwórz własny template:
mkdir -p ~/.claude/templates
# Edit ~/.claude/templates/webapp.md
# Potem:
cp ~/.claude/templates/webapp.md ./CLAUDE.md
```

### 4. Modularyzacja reguł (ZAAWANSOWANE)

Zamiast jednego dużego CLAUDE.md, podziel na moduły:

```bash
.claude/
├── CLAUDE.md (główny plik)
└── rules/
    ├── coding-style.md
    ├── testing.md
    ├── deployment.md
    └── security.md
```

Przykład `.claude/rules/coding-style.md`:

```markdown
# Coding Style Rules

- Always use TypeScript strict mode
- Prefer functional components over class components
- Use camelCase for variables, PascalCase for components
- Maximum line length: 100 characters
```

**Path-specific rules z YAML frontmatter:**

```markdown
---
paths: src/**/*.test.ts
---

# Testing Rules
- Always test edge cases
- Minimum 80% coverage
- Use descriptive test names
```

**Wiele wzorców:** Możesz użyć nawiasów klamrowych lub przecinków dla wielu wzorców:
```markdown
---
paths: {src,lib}/**/*.ts, tests/**/*.test.ts
---
```

Ta reguła będzie aktywna tylko gdy pracujesz z plikami testowymi!

---

## Typowe błędy i jak ich unikać

### Claude ignoruje CLAUDE.md

**Objaw:** Nie stosuje się do reguł, których oczekujesz (np. używa złego stylu kodu)

**Rozwiązanie:**
- Sprawdź czy plik jest w root projektu (nie w podfolderze)
- Upewnij się, że jest poprawnie sformatowany jako Markdown
- Użyj `/reload` aby wymusić przeładowanie pamięci
- Sprawdź czy nazwa pliku to dokładnie `CLAUDE.md` (wielkość liter ma znaczenie na Linux/Mac)

---

### Za długi CLAUDE.md

**Objaw:** Sesja zużywa dużo tokenów (jednostek przetwarzania AI), odpowiedzi są wolniejsze lub droższe

**Rozwiązanie:**
- Ogranicz do <500 linii w głównym pliku
- Przenieś szczegółowe dokumentacje do osobnych plików w `docs/`
- Użyj składni `@` aby zaimportować zamiast kopiować: `See @docs/architecture.md`
- Rozważ modularyzację: podziel na pliki w `.claude/rules/`

---

### Konflikt między global a project

**Objaw:** Niespójne zachowanie - czasem Claude stosuje jedne reguły, czasem inne

**Rozwiązanie:**
- Pamiętaj hierarchię: Project CLAUDE.md **nadpisuje** global ~/.claude/CLAUDE.md
- Sprawdź oba pliki i usuń konfliktujące reguły
- Używaj global dla ogólnych preferencji ("zawsze TypeScript")
- Używaj project dla specyfiki projektu ("w tym projekcie używamy double quotes")

---

### CLAUDE.local.md w repozytorium

**Objaw:** Przypadkowy commit pliku z Twoimi prywatnymi notatkami do repo

**Rozwiązanie:**
- Natychmiast dodaj do `.gitignore`:
  ```bash
  echo "CLAUDE.local.md" >> .gitignore
  ```
- Sprawdź historię Git: `git log --all --full-history -- CLAUDE.local.md`
- Jeśli już został zacommitowany, usuń z tracking:
  ```bash
  git rm --cached CLAUDE.local.md
  git commit -m "Remove accidentally committed local notes"
  ```

---

### Stare informacje w CLAUDE.md

**Objaw:** Claude używa nieaktualnych komend, starej struktury projektu, deprecated narzędzi

**Rozwiązanie:**
- Zaktualizuj CLAUDE.md po każdej większej zmianie w projekcie
- Uruchom `/reload` w CLI aby wymusić przeładowanie pamięci
- Dodaj datę ostatniej aktualizacji w nagłówku:
  ```markdown
  # My Project
  Last updated: 2025-01-15
  ```
- Ustaw przypomnienie (np. co kwartał) aby zrewidować CLAUDE.md

---

## Edge cases - sytuacje specjalne

### Multi-projekt (monorepo)

```
root/
├── CLAUDE.md (globalne dla monorepo)
├── packages/
│   ├── web/
│   │   └── CLAUDE.md (specific dla web app)
│   └── api/
│       └── CLAUDE.md (specific dla API)
```

Claude ładuje oba (root + subdirectory) jeśli uruchomiony w subdirectory.

### Wrażliwe dane (nigdy w CLAUDE.md!)

```markdown
❌ BAD:
## Database
- Connection: postgres://user:password123@prod.db.com

✅ GOOD:
## Database
- Connection: See DATABASE_URL in .env.local
- Schema: Run `npm run db:schema` to see latest
```

**CLAUDE.local.md i .gitignore:** Jeśli potrzebujesz lokalnych, prywatnych notatek dla projektu, użyj `CLAUDE.local.md`. Ten plik jest automatycznie dodawany do `.gitignore` przez Claude Code, więc nigdy nie zostanie przypadkowo zacommitowany do repozytorium.

### Dynamiczne dane (wersje, daty)

```markdown
## Tech Stack (as of 2024-12)
- Next.js 14 (check package.json for current version)
- Run `npm list next` for exact version
```

---

## Cheat sheet - co powinno być w CLAUDE.md

```markdown
✅ Obowiązkowe:
- Setup commands (install, start, test)
- Tech stack (języki, frameworki, major libraries)
- Struktura projektu (główne katalogi)
- Development workflow (jak dodać feature)

✅ Zalecane:
- Coding standards (style guide, conventions)
- Common tasks (częste operacje)
- Troubleshooting (znane problemy + rozwiązania)
- Team conventions (jeśli praca zespołowa)

✅ Opcjonalne (advanced):
- Architecture decisions (ADRs)
- Performance targets
- Security guidelines
- Deployment process

❌ Unikaj:
- Sekretów (hasła, API keys)
- Bardzo szczegółowych implementacji (to powinno być w docs/)
- Duplikatów tego co jest w README (link zamiast kopiować)
```

---

## Przykład zastosowania w firmie

Wyobraź sobie, że masz procedury firmowe:
- **Standardy commitów:** Conventional Commits
- **Proces review:** Zawsze 2 approvals
- **Polityka security:** Nigdy nie commituj .env

Dodaj to do CLAUDE.md:

```markdown
## Team Standards

### Git Workflow
- Branch naming: feature/JIRA-123-description
- Commits: Conventional Commits (feat:, fix:, docs:)
- PR: Requires 2 approvals before merge
- Never force push to main/master

### Security Rules
- Never commit .env files
- API keys only in environment variables
- Run `npm audit` before every PR
- Rotate credentials every 90 days

### Code Review Checklist
- [ ] Tests pass (npm test)
- [ ] No console.log statements
- [ ] TypeScript strict mode (no any)
- [ ] Error handling present
```

Teraz Claude automatycznie będzie przestrzegał tych zasad przy każdej sesji.

---

## Podsumowanie

CLAUDE.md to **most między Tobą a Claude**. Pozwala AI zrozumieć kontekst Twojego projektu bez konieczności powtarzania się w każdej sesji.

**Kluczowe wnioski:**
1. CLAUDE.md to automatycznie ładowany kontekst projektu
2. Hierarchia: enterprise → project → user → local
3. Komenda `/init` generuje szkielet, `/memory` pozwala edytować
4. Traktuj go jak onboarding doc dla nowego członka zespołu
5. Importuj inne pliki przez @syntax
6. Modularyzuj reguły w `.claude/rules/` dla dużych projektów
7. Nigdy nie commituj sekretów - używaj zmiennych środowiskowych

**W praktyce:**
- Mały projekt: Level 1 wystarczy (50 linii)
- Produkcyjny: Level 2 (200-300 linii)
- Enterprise: Level 3 z modularyzacją (500+ linii split na wiele plików)

---

## Pytania kontrolne

Sprawdź, czy dobrze zrozumiałeś materiał:

1. **Jaka jest różnica między `./CLAUDE.md` a `~/.claude/CLAUDE.md`?**
   - Który ma wyższy priorytet?
   - Kiedy używać którego?

2. **Jak zaimportować zawartość innego pliku do CLAUDE.md?**
   - Jaka jest składnia?
   - Podaj 3 przykłady użycia

3. **Co powinno znaleźć się w minimalnym CLAUDE.md dla nowego projektu?**
   - Wymień 4 obowiązkowe sekcje

---

## Zadania praktyczne

### Zadanie 1: Stwórz CLAUDE.md dla istniejącego projektu (10 min)

1. Otwórz swój aktualny projekt
2. Uruchom `claude` i użyj `/init`
3. Edytuj wygenerowany CLAUDE.md:
   - Dodaj sekcję `## Setup` z komendami install/start/test
   - Dodaj sekcję `## Structure` z opisem głównych katalogów
   - Dodaj sekcję `## Conventions` z Twoimi standardami kodowania
4. Zapisz i przetestuj:
   ```bash
   > Explain the project structure based on CLAUDE.md
   ```

**Expected output:** Claude powinien opisać strukturę na podstawie Twojego CLAUDE.md, nie zgadywać.

---

### Zadanie 2: Modularyzacja - podziel reguły (15 min)

Dla większego projektu:

1. Stwórz strukturę:
   ```bash
   mkdir -p .claude/rules
   ```

2. Przenieś coding standards do `.claude/rules/coding-style.md`:
   ```markdown
   # Coding Style
   - Use TypeScript strict mode
   - Prefer const over let
   - Max line length: 100
   ```

3. Dodaj testing rules do `.claude/rules/testing.md`:
   ```markdown
   ---
   paths:
     - "**/*.test.ts"
     - "tests/**/*"
   ---

   # Testing Rules
   - Minimum 80% coverage
   - Always test edge cases
   - Use descriptive test names (it("should..."))
   ```

4. Zredukuj główny CLAUDE.md do overview, usuń szczegóły które teraz są w rules/

5. Przetestuj:
   ```bash
   > What are the testing conventions for this project?
   ```

**Expected output:** Claude powinien wymienić reguły z `.claude/rules/testing.md`

---

### Zadanie 3: Global vs Project memory (10 min)

1. Stwórz global preferences w `~/.claude/CLAUDE.md`:
   ```markdown
   # My Global Preferences

   - Always use TypeScript (never JavaScript)
   - Never use emoji in commit messages
   - Prefer functional programming over OOP
   - Use single quotes for strings
   ```

2. W projekcie dodaj project-specific rule w `./CLAUDE.md`:
   ```markdown
   ## Project Preferences

   - This project uses double quotes (overrides global)
   - Emoji allowed in comments (fun project!)
   ```

3. Przetestuj hierarchię:
   ```bash
   > Create a new function that returns a greeting
   ```

**Expected output:** Claude powinien użyć TypeScript (global), double quotes (project override), i może dodać emoji w komentarzu (project override).

---

## Słowniczek

Jeśli niektóre terminy w tej lekcji były niejasne, oto krótkie wyjaśnienia:

**API (Application Programming Interface)**
Interfejs, który pozwala różnym programom komunikować się ze sobą. Np. Claude Code łączy się z serwerami Anthropic przez API.

**Token**
Jednostka tekstu przetwarzana przez AI (około 3-4 znaki w języku angielskim, więcej w polskim). Im więcej tokenów, tym większy koszt zapytania. Długi CLAUDE.md (500+ linii) zużywa więcej tokenów przy każdej sesji.

**Monorepo**
Repozytorium Git zawierające wiele projektów/pakietów w jednym miejscu. Np. frontend + backend + mobile w jednym repo zamiast trzech osobnych.

**ORM (Object-Relational Mapping)**
Narzędzie, które tłumaczy Twój kod na zapytania do bazy danych. Zamiast pisać SQL, używasz funkcji w swoim języku programowania. Przykład: Prisma, TypeORM.

**GraphQL**
Język zapytań do API (interfejsu komunikacji między aplikacjami), alternatywa dla REST. Pozwala pobrać dokładnie te dane, których potrzebujesz w jednym zapytaniu (zamiast wielu).

**REST (Representational State Transfer)**
Popularny styl budowania API, gdzie każdy zasób (np. użytkownik, artykuł) ma swój unikalny adres URL.

**Git hooks**
Skrypty uruchamiane automatycznie przy operacjach Git. Np. przed commitem można uruchomić testy, sprawdzić formatowanie kodu, itd.

**ADR (Architecture Decision Record)**
Dokument opisujący ważną decyzję architektoniczną i jej uzasadnienie. Np. "Dlaczego wybraliśmy Zustand zamiast Redux?" - przydatne dla przyszłych członków zespołu.

**CORS (Cross-Origin Resource Sharing)**
Mechanizm bezpieczeństwa przeglądarek określający, które domeny mogą wysyłać zapytania do Twojego API. Chroni przed nieautoryzowanym dostępem.

**Rate limiting**
Ograniczenie liczby zapytań do API w określonym czasie (np. 100 żądań/minutę). Chroni serwer przed przeciążeniem i atakami.

**Sandbox mode**
Tryb bezpieczeństwa w Claude Code, który izoluje operacje do katalogu projektu. Claude nie może modyfikować plików systemowych ani wychodzić poza folder projektu.

**CLI (Command Line Interface)**
Interfejs tekstowy w terminalu, gdzie wpisujesz komendy zamiast klikać w przyciski. Claude Code działa jako CLI.

---

## Linki i zasoby

### Oficjalna dokumentacja
- [Claude Code - Memory Management](https://code.claude.com/docs/en/memory)

### Community resources
- [CLAUDE.md Templates na GitHub](https://github.com/topics/claude-md-template)
- [Example CLAUDE.md files](https://github.com/search?q=filename%3ACLAUDE.md)

### Narzędzia
- [CLAUDE.md Generator](https://claude-md-generator.com) - interaktywny kreator
- [CLAUDE.md Linter](https://github.com/claudeai/claudemd-lint) - sprawdza błędy w składni

### Inspiracje
- [Next.js CLAUDE.md example](https://github.com/vercel/next.js/blob/canary/CLAUDE.md)
- [Prisma CLAUDE.md example](https://github.com/prisma/prisma/blob/main/CLAUDE.md)

---

**W następnej lekcji:** Slash Commands - własne skróty do częstych operacji. Nauczysz się tworzyć `/review`, `/test`, `/optimize` i inne komendy przyspieszające pracę.

**Pytania?** Odpowiedz na tego maila lub dołącz do naszego Slacka: [link]

---

Do zobaczenia w lekcji 8!

*Pamiętaj: CLAUDE.md to inwestycja. 15 minut na jego stworzenie zaoszczędzi Ci godzin powtarzania kontekstu w przyszłości.*
