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
- Traktuj go jak onboarding dla nowego developera
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

**Złota zasada:** Traktuj CLAUDE.md jak dokument onboardingowy dla nowego junior developera.

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
```
                    │ Unit │ Integration │ E2E │
────────────────────┼──────┼─────────────┼─────┤
Coverage Target     │ 90%  │ 70%         │ 30% │
Test Location       │ *.test.ts         │ e2e/│
Mock External APIs  │ Yes  │ Yes         │ No  │
Run on Pre-commit   │ Yes  │ No          │ No  │
Run on PR           │ Yes  │ Yes         │ Yes │
```

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

| Problem | Objaw | Rozwiązanie |
|---------|-------|-------------|
| **Claude ignoruje CLAUDE.md** | Nie stosuje się do reguł | Sprawdź czy plik jest w root projektu i poprawnie sformatowany (Markdown) |
| **Za długi CLAUDE.md** | Zużywa za dużo tokenów | Ogranicz do <500 linii. Przenieś szczegóły do osobnych docs/ i zaimportuj przez @ |
| **Konflikt między global a project** | Niespójne zachowanie | Project CLAUDE.md ma priorytet nad global ~/.claude/CLAUDE.md |
| **CLAUDE.local.md w repo** | Przypadkowy commit | Dodaj do .gitignore: `echo "CLAUDE.local.md" >> .gitignore` |
| **Stare informacje** | Claude używa outdated data | Zaktualizuj CLAUDE.md i uruchom `/reload` |

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
4. Traktuj go jak onboarding doc dla nowego developera
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

## Linki i zasoby

### Oficjalna dokumentacja
- [Claude Code - Memory Management](https://code.claude.com/docs/memory)
- [Claude Code - Memory Management](https://code.claude.com/docs/memory)

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
