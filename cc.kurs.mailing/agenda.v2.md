# Claude Code - Agenda Kursu (v2)

> Kompleksowy program od podstaw do eksperta

---

## SPIS TREŚCI - KOLEJNOŚĆ MODUŁÓW

**MODUŁ PODSTAWY**
**MODUŁ WBUDOWANE NARZĘDZIA (TOOLS)**
**MODUŁ BEZPIECZEŃSTWO I UPRAWNIENIA**
**MODUŁ SLASH COMMANDS**
**MODUŁ INTEGRACJE IDE**
**MODUŁ SUBAGENTS**
**MODUŁ HOOKS**
**MODUŁ MCP SERVERS**
**MODUŁ AGENT SKILLS**
**MODUŁ PLUGINS & MARKETPLACE**
**MODUŁ KONFIGURACJA ZAAWANSOWANA**
**MODUŁ ROZSZERZANIE CLAUDE CODE - WYBÓR NARZĘDZI**
**MODUŁ CLAUDE API**
**MODUŁ BEST PRACTICES**
**MODUŁ ADVANCED PATTERNS**
**MODUŁ CASE STUDIES**
**MODUŁ ENTERPRISE & SCALE**

**PODSUMOWANIE:** Checklist kompetencji, dalsze zasoby, praktyczne projekty

---

## MODUŁ PODSTAWY (0-2h)

Instalacja i Konfiguracja
• Zagadnienie: Metody instalacji (curl, Homebrew, npm) i różnice między nimi
• Przykład praktyczny: curl -fsSL https://claude.ai/install.sh | bash dla macOS/Linux, brew install --cask claude-code jako alternatywa
• Zagadnienie: Pierwsze logowanie i autoryzacja OAuth
• Przykład praktyczny: Uruchomienie claude w terminalu, przejście przez proces logowania w przeglądarce

Podstawowe Polecenia CLI
• Zagadnienie: Wybór modelu (opus, sonnet, haiku) i różnice w cenie/wydajności
• Przykład praktyczny: claude --model opus dla złożonych zadań architektury, claude --model haiku dla formatowania plików
• Zagadnienie: Tryby uruchomienia - interaktywny vs headless
• Przykład praktyczny: claude -p "analyze this codebase structure" dla jednorazowych zapytań
• Zagadnienie: Wznowienie sesji i historia
• Przykład praktyczny: claude --resume auth-refactor aby kontynuować pracę z nazwanej sesji, claude --continue dla ostatniej

Interfejs Interaktywny
• Zagadnienie: Skróty klawiaturowe i nawigacja
• Przykład praktyczny: Shift+Enter dla wieloliniowego promptu, Ctrl+O aby zobaczyć proces myślenia Claude
• Zagadnienie: Wpisywanie i wysyłanie promptów
• Przykład praktyczny: Wpisanie > explain the auth flow in this codebase i naciśnięcie Enter
• Zagadnienie: Przerywanie i cofanie operacji
• Przykład praktyczny: Ctrl+C aby zatrzymać długo trwającą operację

Referencje do Plików i Katalogów
• Zagadnienie: Składnia @ do dołączania plików do kontekstu
• Przykład praktyczny: > explain @src/auth.js aby Claude przeczytał i wyjaśnił plik
• Zagadnienie: Referencje do zakresów linii
• Przykład praktyczny: > review @src/auth.js#L10-20 dla konkretnych linii kodu
• Zagadnienie: Referencje do katalogów
• Przykład praktyczny: > what does @src/components directory contain? aby przeanalizować strukturę

System Uprawnień
• Zagadnienie: Typy uprawnień (Read, Edit, Write, Bash) i dlaczego Claude pyta
• Przykład praktyczny: Claude pyta "Allow Edit on src/auth.ts?" przed modyfikacją pliku
• Zagadnienie: Tryby uprawnień - normal, accept edits, plan, bypass
• Przykład praktyczny: Shift+Tab aby przełączyć na "accept edits on" dla szybkich iteracji
• Zagadnienie: Odpowiedzi na pytania o uprawnienia
• Przykład praktyczny: y (tak), n (nie), s (pokaż szczegóły), a (zawsze zezwalaj)

---

## MODUŁ WBUDOWANE NARZĘDZIA (TOOLS) (2-4h)

Read - Czytanie Plików
• Zagadnienie: Podstawowe czytanie całego pliku
• Przykład praktyczny: Claude automatycznie używa Read gdy referencja @src/auth.ts jest w prompcie
• Zagadnienie: Czytanie z offsetem i limitem dla dużych plików
• Przykład praktyczny: Read z offset: 100, limit: 50 dla linii 100-150 w długim pliku
• Zagadnienie: Czytanie obrazów i PDFów
• Przykład praktyczny: Read pliku screenshot.png pokazuje obraz wizualnie, PDF jest processowany strona po stronie

Write - Tworzenie Plików
• Zagadnienie: Tworzenie nowych plików z zawartością
• Przykład praktyczny: > Create new API endpoint file src/api/users.ts z boilerplate kodem
• Zagadnienie: Nadpisywanie istniejących plików (wymaga wcześniejszego Read)
• Przykład praktyczny: Write nadpisuje plik tylko jeśli Claude wcześniej użył Read na tym pliku
• Zagadnienie: Kiedy NIE używać Write
• Przykład praktyczny: ZAWSZE preferuj Edit dla istniejących plików zamiast Write (nadpisanie całego pliku)

Edit - Modyfikacja Plików
• Zagadnienie: Exact string replacement w plikach
• Przykład praktyczny: old_string: "var name = 'test'", new_string: "const name = 'test'" dla refactoringu
• Zagadnienie: Replace all dla zmian globalnych
• Przykład praktyczny: Edit z replace_all: true zamienia wszystkie wystąpienia zmiennej w pliku (renaming)
• Zagadnienie: Zachowanie wcięć i formatowania
• Przykład praktyczny: old_string musi dokładnie odpowiadać zawartości z Read (z wcięciami), bez line number prefix

NotebookEdit - Edycja Jupyter Notebooks
• Zagadnienie: Zamiana zawartości komórki w notebooku
• Przykład praktyczny: NotebookEdit z cell_id dla konkretnej komórki, new_source: "import pandas as pd\ndf = pd.read_csv('data.csv')"
• Zagadnienie: Dodawanie i usuwanie komórek
• Przykład praktyczny: edit_mode: "insert" dodaje nową komórkę, edit_mode: "delete" usuwa istniejącą
• Zagadnienie: Typy komórek
• Przykład praktyczny: cell_type: "code" dla kodu Python, cell_type: "markdown" dla dokumentacji

Bash - Wykonywanie Komend
• Zagadnienie: Podstawowe komendy systemowe
• Przykład praktyczny: Bash command: "npm test" uruchamia testy, Bash command: "git status" sprawdza zmiany
• Zagadnienie: Timeout i background execution
• Przykład praktyczny: Bash z timeout: 600000 (10 min) dla długich buildów, run_in_background: true dla dev servers
• Zagadnienie: Cytowanie ścieżek ze spacjami
• Przykład praktyczny: cd "/Users/name/My Documents" (correct), cd /Users/name/My Documents (incorrect - fail)
• Zagadnienie: Sekwencyjne vs równoległe komendy
• Przykład praktyczny: command1 && command2 dla zależnych operacji, osobne Bash calls w parallel dla niezależnych

Glob - Wyszukiwanie Plików
• Zagadnienie: Pattern matching dla plików
• Przykład praktyczny: Glob pattern: "**/*.ts" znajduje wszystkie pliki TypeScript rekursywnie
• Zagadnienie: Glob w konkretnym katalogu
• Przykład praktyczny: Glob pattern: "*.test.js", path: "./tests" szuka tylko w folderze tests
• Zagadnienie: Sortowanie po dacie modyfikacji
• Przykład praktyczny: Glob zwraca pliki sorted by modification time (najnowsze pierwsze)

Grep - Wyszukiwanie Zawartości
• Zagadnienie: Podstawowe wyszukiwanie regex w plikach
• Przykład praktyczny: Grep pattern: "function.*login", output_mode: "files_with_matches" znajduje pliki z definicjami funkcji login
• Zagadnienie: Output modes - content, files, count
• Przykład praktyczny: output_mode: "content" pokazuje matching lines z -A/-B/-C context, "files_with_matches" tylko ścieżki, "count" ilość matchów
• Zagadnienie: Filtrowanie po typie pliku
• Przykład praktyczny: Grep pattern: "API_KEY", type: "js" szuka tylko w plikach JavaScript, glob: "*.ts" dla TypeScript
• Zagadnienie: Case insensitive i multiline
• Przykład praktyczny: Grep z -i: true dla case insensitive, multiline: true dla patternów przez wiele linii

WebFetch - Pobieranie Stron
• Zagadnienie: Fetch URL i analiza zawartości
• Przykład praktyczny: WebFetch url: "https://docs.example.com/api", prompt: "Extract all API endpoints" konwertuje HTML→markdown i analizuje
• Zagadnienie: Redirects i cache
• Przykład praktyczny: WebFetch automatycznie informuje o redirect, 15-min cache przyspiesza powtórne zapytania
• Zagadnienie: Kiedy używać MCP zamiast WebFetch
• Przykład praktyczny: Jeśli MCP web fetch tool dostępny, użyj go (mniej ograniczeń)

WebSearch - Wyszukiwanie w Internecie
• Zagadnienie: Wyszukiwanie aktualnych informacji
• Przykład praktyczny: WebSearch query: "React 19 new features 2025" dla informacji poza knowledge cutoff
• Zagadnienie: Domain filtering
• Przykład praktyczny: WebSearch query: "API docs", allowed_domains: ["docs.python.org"] ogranicza do oficjalnej dokumentacji
• Zagadnienie: KRYTYCZNE: Zawsze dodawaj Sources
• Przykład praktyczny: Po odpowiedzi ZAWSZE dołącz sekcję "Sources:" z markdown linkami [Title](URL)

Task - Delegacja do Subagentów
• Zagadnienie: Wywoływanie specjalistycznych agentów
• Przykład praktyczny: Task subagent_type: "Explore", prompt: "Find all API endpoints", model: "haiku" dla szybkiej eksploracji
• Zagadnienie: Dostępne typy subagentów
• Przykład praktyczny: general-purpose (research), Explore (codebase search), Plan (architecture), claude-code-guide (docs lookup)
• Zagadnienie: Background execution
• Przykład praktyczny: Task z run_in_background: true, użyj TaskOutput task_id: "..." aby odczytać wyniki później
• Zagadnienie: Resumowanie agentów
• Przykład praktyczny: Task z resume: "agent-id-123" kontynuuje pracę z pełnym poprzednim kontekstem

TodoWrite - Zarządzanie Taskami
• Zagadnienie: Tworzenie listy zadań dla złożonych operacji
• Przykład praktyczny: TodoWrite todos: [{content: "Run tests", status: "pending", activeForm: "Running tests"}, ...]
• Zagadnienie: Statusy zadań i workflow
• Przykład praktyczny: pending → in_progress (zacznij pracę) → completed (natychmiast po zakończeniu)
• Zagadnienie: Kiedy używać TodoWrite
• Przykład praktyczny: Zadania z 3+ krokami, user podaje listę tasków, complex non-trivial tasks
• Zagadnienie: Kiedy NIE używać TodoWrite
• Przykład praktyczny: Single straightforward task, trivial operations, purely conversational requests

AskUserQuestion - Zadawanie Pytań
• Zagadnienie: Zbieranie preferencji i wyborów użytkownika
• Przykład praktyczny: AskUserQuestion questions: [{question: "Which library?", header: "Library", options: [{label: "Axios", description: "..."}, ...]}]
• Zagadnienie: Single vs multi-select
• Przykład praktyczny: multiSelect: false dla wyboru jednej opcji (auth method), multiSelect: true dla wielu feature flags
• Zagadnienie: Recommended options
• Przykład praktyczny: Pierwsza opcja z "(Recommended)" w labelu jeśli masz sugestię
• Zagadnienie: Automatyczne "Other" option
• Przykład praktyczny: Użytkownik zawsze może wybrać "Other" i podać custom text input

---

## MODUŁ BEZPIECZEŃSTWO I UPRAWNIENIA (2-4h)

Sandbox Mode - Podstawy
• Zagadnienie: Czym jest sandbox i jak chroni system przed nieautoryzowanym dostępem
• Przykład praktyczny: Domyślna izolacja do katalogu projektu - Claude nie może czytać ~/.ssh/, /etc/ bez zgody użytkownika
• Zagadnienie: Sandbox w praktyce - co jest dozwolone, co zablokowane
• Przykład praktyczny: Dozwolone: ./src/**, Zablokowane: ~/.aws/, katalogi rodzica bez explicit permission

Konfiguracja Sandbox
• Zagadnienie: Włączanie/wyłączanie sandbox w settings.json
• Przykład praktyczny: "sandbox": {"enabled": true} w .claude/settings.json
• Zagadnienie: Additional directories - rozszerzanie dostępu poza projekt
• Przykład praktyczny: "additionalDirectories": ["../shared-lib/", "/opt/company-tools/"] dla bezpiecznego dostępu do współdzielonych zasobów
• Zagadnienie: Kiedy i DLACZEGO wyłączać sandbox (bardzo rzadko!)
• Przykład praktyczny: dangerouslyDisableSandbox tylko dla trusted scripts w Docker/VM, NIGDY w interactive work

Typy Uprawnień - Poziomy Ryzyka
• Zagadnienie: Read (niskie ryzyko) - tylko odczyt plików
• Przykład praktyczny: > explain @src/auth.ts automatycznie czyta plik, może wykryć wrażliwe dane w kodzie
• Zagadnienie: Edit/Write (średnie ryzyko) - modyfikacja/tworzenie plików
• Przykład praktyczny: Refaktoryzacja może wprowadzić bugi, nadpisanie może usunąć dane
• Zagadnienie: Bash (wysokie ryzyko) - wykonywanie komend systemowych
• Przykład praktyczny: npm install vs rm -rf - jedna komenda może usunąć cały projekt
• Zagadnienie: Glob/Grep (niskie ryzyko) - wyszukiwanie plików i zawartości
• Przykład praktyczny: Glob(**/*.ts) znajduje pliki, Grep(API_KEY) może wyciągnąć secrets z kodu

Tryby Uprawnień - Kiedy Którego Użyć
• Zagadnienie: Normal mode - pełna kontrola, pytanie o każdą operację
• Przykład praktyczny: Standard development - Claude pyta przed każdym Edit/Write/Bash
• Zagadnienie: Accept edits mode - szybkie iteracje bez pytań o Edit/Write
• Przykład praktyczny: Shift+Tab → "accept edits on", Claude wciąż pyta o Bash commands
• Zagadnienie: Plan mode - zero modyfikacji, tylko analiza
• Przykład praktyczny: claude --permission-mode plan dla bezpiecznej eksploracji nieznanego codebase
• Zagadnienie: Bypass mode - automatyzacja (NIEBEZPIECZNE!)
• Przykład praktyczny: --permission-mode bypassPermissions w CI/CD, NIGDY interaktywnie

Allow/Deny Lists - Precyzyjna Kontrola
• Zagadnienie: Whitelisting dozwolonych operacji
• Przykład praktyczny: "allow": ["Bash(npm run:*)", "Bash(git status)", "Read(./src/**)"] dla często używanych bezpiecznych komend
• Zagadnienie: Blacklisting niebezpiecznych operacji
• Przykład praktyczny: "deny": ["Bash(rm:*)", "Bash(sudo:*)", "Read(**/.env*)"] blokuje destrukcyjne komendy i wrażliwe pliki
• Zagadnienie: Ask list - wymuszenie pytania
• Przykład praktyczny: "ask": ["Bash(git push:*)", "Edit(package.json)"] pyta nawet w bypass mode

Ochrona Wrażliwych Plików
• Zagadnienie: Pattern matching dla secrets i credentials
• Przykład praktyczny: "deny": ["Read(**/.env*)", "Read(**/.aws/**)", "Read(**/*.pem)", "Read(**/secrets/**)"]
• Zagadnienie: Lock files i package.json
• Przykład praktyczny: "deny": ["Edit(**/package-lock.json)", "Edit(**/yarn.lock)"] zapobiega przypadkowym zmianom w dependencies
• Zagadnienie: Wykrywanie hardcoded secrets w kodzie
• Przykład praktyczny: Grep pattern dla API_KEY|SECRET|PASSWORD w plikach source code

Git Safety Protocol
• Zagadnienie: Zasady bezpieczeństwa dla operacji git
• Przykład praktyczny: Claude NIGDY nie używa git push --force do main/master, NIGDY nie pomija hooks (--no-verify)
• Zagadnienie: Commit message format z HEREDOC
• Przykład praktyczny: git commit -m "$(cat <<'EOF'\nfeat: message\n\n🤖 Generated with Claude Code\nEOF\n)" dla właściwego formatowania
• Zagadnienie: Amend protocol - kiedy używać --amend
• Przykład praktyczny: TYLKO gdy: (1) user explicitly requested, (2) HEAD commit by Claude, (3) NOT pushed to remote

Best Practices - Bezpieczna Konfiguracja
• Zagadnienie: Least privilege principle - minimalne uprawnienia
• Przykład praktyczny: Zamiast bypassPermissions użyj allow list tylko dla needed operations
• Zagadnienie: Environment-specific configurations
• Przykład praktyczny: Development: liberal allow list, Production: plan mode only, CI/CD: bypass z precyzyjną ask list
• Zagadnienie: Team settings i code review
• Przykład praktyczny: .claude/settings.json w git → każda zmiana permissions wymaga PR review

---

## MODUŁ AGENT SKILLS (6-8h)

Struktura i Lokacja Skills
• Zagadnienie: Różnica między user skills (~/.claude/skills) a project skills (.claude/skills)
• Przykład praktyczny: Skill w ~/.claude/skills/pdf-tools dostępny wszędzie, skill w .claude/skills/api-review tylko w tym projekcie
• Zagadnienie: Wymagane pliki w skillu (SKILL.md)
• Przykład praktyczny: Utworzenie katalogu .claude/skills/my-skill/ z plikiem SKILL.md zawierającym YAML frontmatter

Tworzenie Podstawowego Skillu
• Zagadnienie: Format YAML frontmatter (name, description, allowed-tools)
• Przykład praktyczny: ---\nname: api-review\ndescription: Review API endpoints for security, performance, best practices. Use when reviewing REST APIs.\n---
• Zagadnienie: Instrukcje w formacie markdown
• Przykład praktyczny: Sekcja "## Checklist" z punktami: Authentication required? Input validation? Rate limiting?
• Zagadnienie: Dodawanie przykładów kodu w skillu
• Przykład praktyczny: Blok ```bash z przykładem grep -r "POST /api" src/ do znalezienia endpointów

Skill dla TypeScript Modernization
• Zagadnienie: Skill do refaktoryzacji legacy kodu TypeScript
• Przykład praktyczny: Skill ts-modernizer z regułami: zamień var → const/let, usuń any → proper types, użyj optional chaining ?.
• Zagadnienie: Before/After examples w skillach
• Przykład praktyczny: Sekcja z kodem "Before: var name = user.name || 'Unknown'" i "After: const name = user.name ?? 'Unknown'"

Skill dla Security Review
• Zagadnienie: Automatyczna analiza bezpieczeństwa kodu
• Przykład praktyczny: Skill security-review sprawdzający: SQL injection, XSS, CSRF, exposed secrets, weak crypto
• Zagadnienie: Integracja z narzędziami zewnętrznymi
• Przykład praktyczny: Skill wywołujący npm audit, git secrets, snyk test w ramach review

Używanie i Aktywacja Skills
• Zagadnienie: Automatyczna aktywacja przez opis vs jawne wywołanie
• Przykład praktyczny: > Review this API endpoint automatycznie użyje api-review skill jeśli description pasuje
• Zagadnienie: Sprawdzanie dostępnych skills
• Przykład praktyczny: > What skills are available? aby zobaczyć listę wszystkich skills w projekcie i user-level

---

## MODUŁ HOOKS (6-8h)

Typy Hooków i Kiedy Się Wykonują
• Zagadnienie: PreToolUse - przed wykonaniem narzędzia (blokowanie, walidacja)
• Przykład praktyczny: Hook blokujący edycję plików .env przed każdym Edit/Write
• Zagadnienie: PostToolUse - po wykonaniu narzędzia (formatowanie, logowanie)
• Przykład praktyczny: Hook uruchamiający prettier --write po każdej edycji pliku
• Zagadnienie: SessionStart/SessionEnd - setup i cleanup
• Przykład praktyczny: SessionStart hook aktywujący venv poprzez echo 'source venv/bin/activate' >> "$CLAUDE_ENV_FILE"

Hook Auto-Formatowania
• Zagadnienie: Automatyczne formatowanie kodu po edycji za pomocą Prettier
• Przykład praktyczny: PostToolUse hook z matcher: "Edit|Write" i command: jq -r '.tool_input.file_path' | xargs npx prettier --write
• Zagadnienie: Formatowanie wielojęzyczne (JS/TS/Python/Go)
• Przykład praktyczny: Hook z case statement: *.ts) npx prettier;; *.py) black;; *.go) gofmt

Hook Ochrony Plików Wrażliwych
• Zagadnienie: Blokowanie dostępu do plików z secretami
• Przykład praktyczny: PreToolUse hook z python3 -c sprawdzający czy path zawiera .env, secrets/, .aws/, .ssh/ i zwracający sys.exit(2)
• Zagadnienie: Lista chronionych wzorców
• Przykład praktyczny: Sprawdzanie ['.env', '.env.local', 'secrets/', 'package-lock.json', 'private_key']

Hook Logowania Komend
• Zagadnienie: Zapisywanie wszystkich komend Bash do loga
• Przykład praktyczny: PostToolUse hook dla Bash: jq -r '.tool_input.command' | tee -a ~/.claude/bash-history.log
• Zagadnienie: Logowanie z timestampem
• Przykład praktyczny: echo "$(date '+%Y-%m-%d %H:%M:%S'): $command" >> log.txt

Debug Hooków
• Zagadnienie: Włączanie trybu debug dla hooków
• Przykład praktyczny: export CLAUDE_HOOK_DEBUG=1 przed uruchomieniem claude
• Zagadnienie: Testowanie hooków manualnie
• Przykład praktyczny: bash -x ~/.claude/hooks/my-hook.sh <<< '{"tool": "Bash", "tool_input": {"command": "ls"}}' do debugowania

---

## MODUŁ MCP SERVERS (6-8h)

Instalacja MCP Servers - HTTP
• Zagadnienie: Dodawanie serwerów HTTP (GitHub, Sentry)
• Przykład praktyczny: claude mcp add --transport http github https://api.githubcopilot.com/mcp/
• Zagadnienie: Logowanie do MCP servera
• Przykład praktyczny: W Claude Code użycie > /mcp aby zalogować się interaktywnie

Instalacja MCP Servers - Stdio
• Zagadnienie: Lokalne serwery MCP uruchamiane przez npx
• Przykład praktyczny: claude mcp add --transport stdio filesystem -- npx -y @modelcontextprotocol/server-filesystem /path/to/dir
• Zagadnienie: MCP z environment variables
• Przykład praktyczny: claude mcp add --transport stdio airtable --env AIRTABLE_API_KEY=key123 -- npx -y airtable-mcp-server

Zakresy MCP (Scopes)
• Zagadnienie: Local scope - tylko dla tego projektu
• Przykład praktyczny: claude mcp add --scope local --transport http github https://... instaluje tylko dla bieżącego katalogu
• Zagadnienie: Project scope - dzielony przez zespół w git
• Przykład praktyczny: claude mcp add --scope project zapisuje do .claude/mcp.json który jest commitowany
• Zagadnienie: User scope - dla wszystkich projektów użytkownika
• Przykład praktyczny: claude mcp add --scope user zapisuje do ~/.claude/mcp.json

PostgreSQL MCP Server
• Zagadnienie: Połączenie z bazą danych PostgreSQL
• Przykład praktyczny: claude mcp add --transport stdio postgres -- npx -y @bytebase/dbhub --dsn "postgresql://user:pass@localhost:5432/db"
• Zagadnienie: Zapytania SQL przez Claude
• Przykład praktyczny: > What's the total revenue this month? - Claude wykonuje SELECT SUM(amount) FROM orders WHERE created_at > NOW() - INTERVAL '1 month'

GitHub MCP Integration
• Zagadnienie: Praca z GitHub Issues i Pull Requests
• Przykład praktyczny: > Review PR #456 from our repository - Claude pobiera diff, komentarze, sprawdza testy
• Zagadnienie: Zarządzanie Issues
• Przykład praktyczny: > List all open issues labeled "bug" - Claude używa GitHub API przez MCP

Custom MCP Server (Stdio)
• Zagadnienie: Tworzenie własnego MCP servera w Node.js
• Przykład praktyczny: Server z narzędziem get_weather używający @modelcontextprotocol/sdk/server
• Zagadnienie: Rejestracja custom tools
• Przykład praktyczny: server.setRequestHandler('tools/list', ...) i server.setRequestHandler('tools/call', ...)

---

## MODUŁ PLUGINS & MARKETPLACE (8-9h)

Plugin System Overview
• Zagadnienie: Czym są pluginy w Claude Code i jak rozszerzają funkcjonalność
• Przykład praktyczny: Pluginy dodają nowe narzędzia (tools), integracje, UI components - np. plugin do Jira, Slack, Notion
• Zagadnienie: Różnica między pluginami a MCP servers
• Przykład praktyczny: MCP = data sources (GitHub, DB), Plugins = full features (UI, workflows, custom commands)

Instalacja Pluginów z Marketplace
• Zagadnienie: Przeglądanie i instalacja pluginów z oficjalnego marketplace
• Przykład praktyczny: > /plugins list aby zobaczyć dostępne, > /plugins install jira-integration dla instalacji
• Zagadnienie: Zarządzanie zainstalowanymi pluginami
• Przykład praktyczny: > /plugins status (lista installed), > /plugins remove plugin-name (usunięcie)

Konfiguracja Pluginów
• Zagadnienie: Settings dla pluginów - API keys, preferences, permissions
• Przykład praktyczny: ~/.claude/plugins/jira/config.json z {"apiKey": "...", "defaultProject": "PROJ-123"}
• Zagadnienie: Plugin-specific permissions
• Przykład praktyczny: Plugin może wymagać permissions: ["Read(.jira/**)", "Bash(jira-cli:*)"] w settings.json

Popularne Pluginy
• Zagadnienie: Jira/Linear plugin - zarządzanie taskami z Claude
• Przykład praktyczny: > Create Jira ticket for bug found in auth.ts - plugin tworzy ticket z description, assigns, links code
• Zagadnienie: Slack plugin - notyfikacje i komunikacja
• Przykład praktyczny: > Send code review summary to #engineering channel - plugin formatuje i wysyła Slack message
• Zagadnienie: Notion plugin - dokumentacja i notes
• Przykład praktyczny: > Save this architecture decision to Notion - plugin tworzy page w workspace

Tworzenie Własnego Pluginu
• Zagadnienie: Struktura pluginu - manifest.json, main entry point
• Przykład praktyczny: my-plugin/ z manifest.json: {"name": "my-plugin", "version": "1.0.0", "main": "index.js", "tools": [...]}
• Zagadnienie: Rejestracja custom tools w pluginie
• Przykład praktyczny: exports.tools = [{name: "my_tool", description: "...", handler: async (input) => {...}}]
• Zagadnienie: Plugin lifecycle hooks
• Przykład praktyczny: exports.onActivate = async (context) => {...}, exports.onDeactivate = async () => {...}

---

## MODUŁ SUBAGENTS (9-11h)

Struktura Subagenta
• Zagadnienie: YAML frontmatter z name, description, tools, model
• Przykład praktyczny: ---\nname: code-reviewer\ndescription: Expert code reviewer. Use after significant changes.\ntools: Read, Grep, Glob, Bash\nmodel: inherit\n---
• Zagadnienie: Lokacja - project (.claude/agents/) vs user (~/.claude/agents/)
• Przykład praktyczny: .claude/agents/code-reviewer.md dla zespołowego agenta

Code Reviewer Agent
• Zagadnienie: Agent do automatycznego review kodu
• Przykład praktyczny: Agent uruchamiający git diff, sprawdzający security (XSS, SQL injection), quality, performance
• Zagadnienie: Format outputu agenta
• Przykład praktyczny: Struktura ### 🔴 Critical Issues, ### 🟡 Suggestions, ### ✅ Good Practices

Test Runner Agent
• Zagadnienie: Agent do uruchamiania i naprawiania testów
• Przykład praktyczny: Workflow: npm test → analyze failures → fix code/tests → re-run → report summary
• Zagadnienie: Wykrywanie framework testowego
• Przykład praktyczny: Sprawdzanie package.json dla Jest/Mocha/Pytest i wybór odpowiedniej komendy

Debugger Agent
• Zagadnienie: Specjalista od debugowania i root cause analysis
• Przykład praktyczny: Proces: understand error → read stack trace → investigate code → propose hypothesis → implement fix → verify
• Zagadnienie: Model dla debuggera
• Przykład praktyczny: model: opus dla głębszej analizy złożonych błędów

Używanie Subagentów
• Zagadnienie: Automatyczna delegacja vs jawne wywołanie
• Przykład praktyczny: > Fix failing tests automatycznie użyje test-runner agenta
• Zagadnienie: Jawne wywołanie agenta
• Przykład praktyczny: > Use the code-reviewer agent to check this PR
• Zagadnienie: Zarządzanie agentami
• Przykład praktyczny: > /agents aby zobaczyć wszystkich dostępnych agentów

---

## MODUŁ KONFIGURACJA ZAAWANSOWANA (11-13h)

Hierarchia Settings
• Zagadnienie: Kolejność precedencji konfiguracji
• Przykład praktyczny: 1. Enterprise Managed → 2. CLI Arguments → 3. Local Project → 4. Shared Project → 5. User
• Zagadnienie: Nadpisywanie ustawień
• Przykład praktyczny: claude --model opus nadpisuje ustawienie "model": "sonnet" z settings.json

Konfiguracja Permissions
• Zagadnienie: Allow, deny, ask lists dla kontroli dostępu
• Przykład praktyczny: "allow": ["Bash(npm run:*)", "Read(./src/**)"], "deny": ["Bash(rm:*)", "Read(.env*)"]
• Zagadnienie: Additional directories - dostęp poza projektem
• Przykład praktyczny: "additionalDirectories": ["../shared-utils/", "/home/user/common-libs/"]

Environment Variables w Settings
• Zagadnienie: Ustawienie zmiennych środowiskowych dla sesji
• Przykład praktyczny: "env": {"NODE_ENV": "development", "LOG_LEVEL": "debug"}
• Zagadnienie: Integration z CLAUDE_ENV_FILE
• Przykład praktyczny: Hook zapisujący export MY_VAR=value do $CLAUDE_ENV_FILE

CLAUDE.md - Project Memory
• Zagadnienie: Struktura dokumentu projektowego automatycznie czytanego przez Claude
• Przykład praktyczny: Sekcje: ## Overview (stack), ## Architecture (komponenty), ## Conventions (coding standards), ## Known Issues
• Zagadnienie: Development workflow w CLAUDE.md
• Przykład praktyczny: Blok ```bash z komendami npm install, npm run dev, npm test, npm run build

Custom Status Line
• Zagadnienie: Własny script dla paska statusu
• Przykład praktyczny: Bash script wyciągający BRANCH=$(git branch --show-current), TESTS=..., UNCOMMITTED=...
• Zagadnienie: Konfiguracja statusLine
• Przykład praktyczny: "statusLine": {"type": "command", "command": "~/.claude/statusline.sh"}

Environment Variables
• Zagadnienie: Kluczowe zmienne środowiskowe dla Claude Code
• Przykład praktyczny: export ANTHROPIC_API_KEY=sk-ant-..., export BASH_DEFAULT_TIMEOUT_MS=180000
• Zagadnienie: Extended thinking configuration
• Przykład praktyczny: export MAX_THINKING_TOKENS=2048 dla większego budżetu myślenia
• Zagadnienie: Disabling features
• Przykład praktyczny: export DISABLE_AUTOUPDATER=1, export DISABLE_TELEMETRY=1

Plan Mode
• Zagadnienie: Tryb analizy bez edycji - safe exploration
• Przykład praktyczny: claude --permission-mode plan do analizy architektury przed zmianami
• Zagadnienie: Wyjście z Plan Mode
• Przykład praktyczny: > /exit-plan aby przejść do implementacji po zaakceptowaniu planu

Extended Thinking
• Zagadnienie: Włączanie głębszego myślenia dla złożonych problemów
• Przykład praktyczny: > /config → toggle "Enable thinking for complex problems"
• Zagadnienie: Per-query thinking
• Przykład praktyczny: > ultrathink: design a distributed caching architecture
• Zagadnienie: Budżet thinking tokens
• Przykład praktyczny: export MAX_THINKING_TOKENS=5000 dla bardzo złożonych zadań (droższe!)

---

## MODUŁ SLASH COMMANDS (13-15h)

Tworzenie Slash Commands
• Zagadnienie: Lokacja - project (.claude/commands/) vs user (~/.claude/commands/)
• Przykład praktyczny: mkdir -p .claude/commands && echo "Analyze for performance..." > .claude/commands/optimize.md
• Zagadnienie: Format - plain text markdown
• Przykład praktyczny: Plik zawiera prompt który będzie wysłany do Claude po wywołaniu /optimize

Command z Argumentami
• Zagadnienie: Używanie $ARGUMENTS do przekazywania parametrów
• Przykład praktyczny: "Find and fix issue #$ARGUMENTS" w .claude/commands/fix-issue.md
• Zagadnienie: Wywołanie z argumentami
• Przykład praktyczny: > /fix-issue 456 zastępuje $ARGUMENTS → "Find and fix issue #456"

Przykład: /security-review Command
• Zagadnienie: Command do security auditu
• Przykład praktyczny: Multi-sekcyjny prompt sprawdzający: 1. Injection Attacks (SQL, XSS), 2. Auth/AuthZ, 3. Data Exposure, 4. OWASP Top 10
• Zagadnienie: Wymaganie konkretnych outputów
• Przykład praktyczny: "Provide specific line numbers and fixes" w prompcie

Przykład: /api-endpoint Command
• Zagadnienie: Generator nowych API endpointów z testami
• Przykład praktyczny: Prompt tworzący: route definition, validation (Zod), service layer, DB queries, error handling, tests, docs
• Zagadnienie: Parametryzacja przez $ARGUMENTS
• Przykład praktyczny: > /api-endpoint GET /api/users/:id tworzy endpoint z tym pattern

Przykład: /refactor Command
• Zagadnienie: Automatyczny refactoring według zasad projektu
• Przykład praktyczny: Prompt z zasadami: DRY, SOLID, max 20 lines per function, extract magic numbers, add types
• Zagadnienie: Before/After comparison
• Przykład praktyczny: "Show before/after comparison" jako requirement w prompcie

Listing i Używanie Commands
• Zagadnienie: Wyświetlanie wszystkich dostępnych commands
• Przykład praktyczny: > /help pokazuje built-in commands i custom commands
• Zagadnienie: Wykonywanie command
• Przykład praktyczny: > /optimize wywołuje .claude/commands/optimize.md

---

## MODUŁ ROZSZERZANIE CLAUDE CODE - WYBÓR NARZĘDZI (13-15h)

Architektura Rozszerzeń - Overview
• Zagadnienie: 5 głównych mechanizmów rozszerzania Claude Code i ich role
• Przykład praktyczny: Skills = behaviors/wiedza, Hooks = automation/reakcje, MCP = data sources/external systems, Commands = shortcuts/quick prompts, Subagents = specialized delegates
• Zagadnienie: Kiedy potrzebujesz rozszerzeń vs kiedy wystarczy prompt
• Przykład praktyczny: Jednorazowa analiza: prompt, Powtarzalne workflow: rozszerzenie (Command/Skill/Hook)

Skills vs Hooks vs MCP - Kluczowe różnice
• Zagadnienie: Skills dodają wiedzę i kontekst (jak coś robić), Hooks wykonują akcje automatycznie (reakcja na eventy), MCP daje dostęp do external systems
• Przykład praktyczny: Skill "code-review" (guidelines jak reviewować kod), Hook prettier (auto-format po edycji), MCP GitHub (pobierz dane z API)
• Zagadnienie: Timing execution - kiedy się uruchamiają
• Przykład praktyczny: Skills: on-demand przez Claude, Hooks: automatycznie pre/post tool use, MCP: on-demand przez Claude gdy potrzebuje danych

Slash Commands vs Skills - Kiedy co?
• Zagadnienie: Commands = quick prompts bez logiki, Skills = complex behaviors z instrukcjami i przykładami
• Przykład praktyczny: Command `/test` = "Run npm test and report results", Skill test-analyzer = 20-line markdown z checklist, debugging strategies, fix patterns
• Zagadnienie: Parametryzacja i złożoność
• Przykład praktyczny: Command z $ARGUMENTS dla prostych substitution, Skill z conditional logic, examples, tool restrictions

Subagents vs Skills - Poziom autonomii
• Zagadnienie: Skills = instrukcje dla głównego Claude (ten sam context), Subagents = dedykowany agent z własnym kontekstem i narzędziami
• Przykład praktyczny: Skill security-checklist (główny Claude używa checklist), Subagent security-auditor (delegacja całej analizy do specjalisty)
• Zagadnienie: Model selection i tool access
• Przykład praktyczny: Subagent może używać model: opus dla heavy analysis, restricted tools (tylko Read/Grep), podczas gdy main Claude ma pełen access
• Zagadnienie: Kiedy delegować do subagenta
• Przykład praktyczny: Task wymaga >5 kroków, deep domain expertise, lub parallel execution (multiple subagents)

Decision Tree - Wybór narzędzia
• Zagadnienie: Flowchart decyzyjny dla wyboru właściwego rozszerzenia
• Przykład praktyczny:
  Q: Automatyczna reakcja na tool? → Hook
  Q: Dostęp do external API/DB? → MCP
  Q: Shortcut do częstego promptu? → Command
  Q: Guidelines/wiedza jak coś robić? → Skill
  Q: Delegacja złożonego task do specjalisty? → Subagent
  Q: Jednorazowa operacja? → Zwykły prompt
• Zagadnienie: Kombinacje - większość workflow używa 2-3 typów razem
• Przykład praktyczny: Command wywołuje behavior → Claude używa Skill (guidelines) + MCP (data) → Hook formatuje output

Przykład 1: Code Review Automation
• Zagadnienie: End-to-end code review używając wszystkich typów rozszerzeń
• Przykład praktyczny:
  1. Command `/review` (quick trigger)
  2. Subagent code-reviewer (autonomous analysis)
  3. Skill review-guidelines (standards + checklist)
  4. MCP GitHub (pobiera PR diff, comments, CI status)
  5. Hook pre-commit (blokuje commit jeśli critical issues)
• Zagadnienie: Flow execution
• Przykład praktyczny: User: `/review` → Command prompt → Subagent activated → Uses Skill for guidelines + MCP for PR data → Returns analysis → Hook validates before commit

Przykład 2: API Development Workflow
• Zagadnienie: Kombinacja narzędzi dla tworzenia API endpoints
• Przykład praktyczny:
  1. Command `/api-endpoint POST /users` (trigger z parametrem)
  2. Skill api-patterns (REST best practices, validation, error handling examples)
  3. MCP postgres (query DB schema dla user table)
  4. Hook prettier + eslint (auto-format po write)
  5. Subagent test-generator (tworzy integration tests)
• Zagadnienie: Dlaczego każde narzędzie
• Przykład praktyczny: Command=convenience, Skill=knowledge, MCP=data, Hook=automation, Subagent=complex task delegation

Przykład 3: Security Audit Pipeline
• Zagadnienie: Multi-layer security checking
• Przykład praktyczny:
  1. Hook pre-commit (quick regex check dla secrets)
  2. Skill security-patterns (OWASP Top 10 checklist)
  3. MCP snyk/sonarqube (external security scanning tools)
  4. Subagent penetration-tester (deep analysis z exploit attempts)
  5. Command `/security-report` (generate final report)

Anti-Patterns - Czego unikać
• Zagadnienie: Typowe błędy w wyborze narzędzi i ich konsekwencje
• Przykład praktyczny:
  ❌ Hook do dodawania wiedzy → Użyj Skill (hooks to akcje, nie dokumentacja)
  ❌ MCP do local filesystem → Użyj additionalDirectories w sandbox config
  ❌ Skill gdy wystarczy Command → Skill dla 1-liner to overkill
  ❌ Subagent dla prostego task → Overhead tworzenia nowego contextu, użyj Skill
  ❌ Command z >50 lines promptu → Przenieś do Skill dla maintainability
• Zagadnienie: Over-engineering vs pragmatyzm
• Przykład praktyczny: Nie twórz Subagent + MCP + Skill jeśli zwykły prompt + Command wystarczy. Start simple, scale up when needed.

Kombinacje narzędzi - Synergy
• Zagadnienie: Jak łączyć rozszerzenia dla maksymalnej efektywności
• Przykład praktyczny:
  Pattern 1: Command → Subagent → Skill + MCP
  Pattern 2: Hook (trigger) → Command (what to do) → Skill (how to do)
  Pattern 3: MCP (data) → Skill (process) → Hook (format output)
• Zagadnienie: Shared context między narzędziami
• Przykład praktyczny: CLAUDE.md definiuje project conventions → Skills referencują te conventions → Hooks enforce → MCP provides project-specific data
• Zagadnienie: Reusability - DRY principle dla rozszerzeń
• Przykład praktyczny: Jeden Skill api-patterns używany przez 5 Commands (/api-endpoint, /api-test, /api-docs, /api-refactor, /api-security)

Praktyczne ćwiczenie - Design własnego workflow
• Zagadnienie: Zaprojektuj workflow dla częstego zadania używając odpowiednich narzędzi
• Przykład praktyczny: Zadanie: "Dodaj nową feature z testami i dokumentacją"
  Rozwiązanie:
  - Command `/feature [name]` (quick start)
  - Skill feature-checklist (structure, conventions, testing requirements)
  - Hook prettier + type-check (auto po każdej edycji)
  - Subagent test-writer (generuje comprehensive tests)
  - MCP linear/jira (create tracking ticket)
  - Hook pre-commit (run tests, block if fail)

---

## MODUŁ INTEGRACJE IDE (15-17h)

VS Code Extension - Instalacja
• Zagadnienie: Metody instalacji extension
• Przykład praktyczny: Cmd+Shift+X → szukaj "Claude Code" → Install, lub vscode:extension/anthropic.claude-code
• Zagadnienie: Pierwsza konfiguracja
• Przykład praktyczny: Kliknięcie ikony Spark w editor toolbar (top-right) lub Cmd+Shift+Esc

VS Code - Skróty Klawiaturowe
• Zagadnienie: Podstawowe skróty w VS Code
• Przykład praktyczny: Alt+K dodaje @file z zaznaczonymi liniami, Cmd+Esc toggle focus między edytorem a Claude
• Zagadnienie: Opening modes
• Przykład praktyczny: Cmd+Shift+Esc otwiera w nowej zakładce, kliknięcie Spark w sidebar

VS Code - Settings
• Zagadnienie: Konfiguracja extension przez VS Code settings
• Przykład praktyczny: Cmd+, → "claudeCode.selectedModel": "sonnet", "claudeCode.autosave": true
• Zagadnienie: Terminal vs GUI mode
• Przykład praktyczny: "claudeCode.useTerminal": false dla GUI, true dla terminal mode

Połączenie CLI ↔ VS Code
• Zagadnienie: Uruchomienie Claude w terminalu i podłączenie do VS Code
• Przykład praktyczny: W VS Code terminal: claude, następnie > /ide aby połączyć z IDE view
• Zagadnienie: Wznowienie sesji z CLI w VS Code
• Przykład praktyczny: W externym terminalu: claude --resume session-name automatycznie otwiera w VS Code jeśli extension jest zainstalowany

JetBrains IDEs - Instalacja
• Zagadnienie: Instalacja przez marketplace
• Przykład praktyczny: Settings → Plugins → Marketplace → "Claude Code Beta" → Install → Restart
• Zagadnienie: Supported IDEs
• Przykład praktyczny: IntelliJ IDEA, PyCharm, WebStorm, PhpStorm, wszystkie 2023.3+

JetBrains - Konfiguracja
• Zagadnienie: Plugin settings
• Przykład praktyczny: Settings → Tools → Claude Code [Beta] → Claude command, Enable Option+Enter, Enable auto-updates
• Zagadnienie: WSL configuration
• Przykład praktyczny: Claude command: wsl -d Ubuntu -- bash -lic "claude" dla użytkowników WSL

JetBrains - Skróty i File References
• Zagadnienie: Keyboard shortcuts
• Przykład praktyczny: Cmd+Esc / Ctrl+Esc toggle Claude, Alt+Ctrl+K dodaje @file reference
• Zagadnienie: Sharing selections
• Przykład praktyczny: Zaznaczenie kodu w edytorze automatycznie dostępne w Claude przez @selection

Cursor Editor Integration
• Zagadnienie: Claude Code w Cursor (VS Code fork)
• Przykład praktyczny: cursor:extension/anthropic.claude-code - instalacja identyczna jak VS Code
• Zagadnienie: Kompatybilność
• Przykład praktyczny: Wszystkie funkcje VS Code extension działają identycznie w Cursor

---

## MODUŁ CLAUDE API (17-19h)

API Basics - Authentication
• Zagadnienie: Ustawienie API key
• Przykład praktyczny: export ANTHROPIC_API_KEY=sk-ant-... lub przekazanie w konstruktorze client
• Zagadnienie: API endpoints
• Przykład praktyczny: https://api.anthropic.com/v1/messages dla Messages API

Messages API - Python Basic
• Zagadnienie: Podstawowe zapytanie przez Python SDK
• Przykład praktyczny: client.messages.create(model="claude-opus-4-5-20251101", max_tokens=1024, messages=[{"role": "user", "content": "..."}])
• Zagadnienie: Sprawdzanie usage
• Przykład praktyczny: message.usage.input_tokens, message.usage.output_tokens

Messages API - TypeScript Basic
• Zagadnienie: Podstawowe zapytanie przez TypeScript SDK
• Przykład praktyczny: const message = await client.messages.create({model: "claude-opus-4-5-20251101", messages: [...]})
• Zagadnienie: Type safety
• Przykład praktyczny: message.content[0].type === "text" guard przed dostępem do .text

Tool Use (Function Calling) - Python
• Zagadnienie: Definiowanie tools w API request
• Przykład praktyczny: tools = [{"name": "get_weather", "description": "...", "input_schema": {...}}]
• Zagadnienie: Tool use loop
• Przykład praktyczny: while response.stop_reason == "tool_use": execute tool → append result → re-call API
• Zagadnienie: Processing tool results
• Przykład praktyczny: {"type": "tool_result", "tool_use_id": tool_use.id, "content": result}

Tool Use (Function Calling) - TypeScript
• Zagadnienie: Type-safe tools definition
• Przykład praktyczny: const tools: Anthropic.Tool[] = [{name: "get_weather", ...}]
• Zagadnienie: Tool use type guards
• Przykład praktyczny: const toolUse = response.content.find((block): block is Anthropic.ToolUseBlock => block.type === "tool_use")

Vision API - Image Analysis
• Zagadnienie: Wysyłanie obrazów w base64
• Przykład praktyczny: image_data = base64.standard_b64encode(Path("screenshot.png").read_bytes()).decode("utf-8")
• Zagadnienie: Image content block
• Przykład praktyczny: {"type": "image", "source": {"type": "base64", "media_type": "image/png", "data": image_data}}
• Zagadnienie: Multi-modal prompts
• Przykład praktyczny: Lista content z image + text: [{type: "image", ...}, {type: "text", text: "What's in this screenshot?"}]

Streaming - Real-time Responses
• Zagadnienie: Streaming w Python
• Przykład praktyczny: with client.messages.stream(...) as stream: for text in stream.text_stream: print(text, end="", flush=True)
• Zagadnienie: Streaming w TypeScript
• Przykład praktyczny: stream.on("text", (text) => { process.stdout.write(text); })

Prompt Caching - Cost Optimization
• Zagadnienie: Cachowanie długich kontekstów (dokumentacja, kod)
• Przykład praktyczny: system=[{"type": "text", "text": long_docs, "cache_control": {"type": "ephemeral"}}]
• Zagadnienie: Cache metrics
• Przykład praktyczny: response.usage.cache_creation_input_tokens (pierwsza), response.usage.cache_read_input_tokens (kolejne)
• Zagadnienie: Oszczędności
• Przykład praktyczny: ~90% redukcja kosztów input tokens przy re-use cached context

Extended Thinking API
• Zagadnienie: Włączanie extended thinking przez API
• Przykład praktyczny: thinking={"type": "enabled", "budget_tokens": 5000}
• Zagadnienie: Odczyt thinking process
• Przykład praktyczny: for block in response.content: if block.type == "thinking": print(block.thinking)
• Zagadnienie: Koszt thinking
• Przykład praktyczny: Thinking tokens liczą się jako output tokens (droższe niż input!)

Structured Outputs
• Zagadnienie: Wymuszanie JSON schema w odpowiedzi
• Przykład praktyczny: response_schema = {"type": "object", "properties": {"sentiment": {"type": "string", "enum": [...]}}}
• Zagadnienie: Parsing structured response
• Przykład praktyczny: result = json.loads(response.content[0].text)

Token Counting
• Zagadnienie: Pre-counting tokens przed wysłaniem requestu
• Przykład praktyczny: count = client.messages.count_tokens(model="...", messages=[...])
• Zagadnienie: Cost estimation
• Przykład praktyczny: Użycie count.input_tokens * price_per_1M_tokens do oszacowania kosztu

Batch Processing
• Zagadnienie: Wysyłanie wielu requestów jako batch
• Przykład praktyczny: batch = client.beta.messages.batches.create(requests=[{custom_id: "...", params: {...}}, ...])
• Zagadnienie: Polling batch status
• Przykład praktyczny: while True: batch = client.beta.messages.batches.retrieve(batch.id); if batch.processing_status == "ended": break
• Zagadnienie: Retrieving results
• Przykład praktyczny: for result in client.beta.messages.batches.results(batch.id): process(result.result.message)

---

## MODUŁ BEST PRACTICES (19-21h)

Effective Prompting - Specificity
• Zagadnienie: Dlaczego konkretne prompty dają lepsze wyniki
• Przykład praktyczny: Źle: "Analyze code", Dobrze: "Review @src/auth.ts for SQL injection, XSS, CSRF. Provide line numbers."
• Zagadnienie: Dostarczanie kontekstu
• Przykład praktyczny: > @src/auth.ts @src/middleware/jwt.ts Review OAuth2 implementation

Effective Prompting - Task Breakdown
• Zagadnienie: Dzielenie dużych zadań na kroki
• Przykład praktyczny: Zamiast "Refactor payment system", użyj kroków: Step 1 analyze, Step 2 identify issues, Step 3 propose solution, Step 4 implement
• Zagadnienie: Strukturyzowane requesty
• Przykład praktyczny: Numerowana lista wymagań: 1. GET /api/users/:id, 2. Returns user profile, 3. Requires auth, 4. Add tests

Permission Configuration - Safe Production
• Zagadnienie: Bezpieczna konfiguracja dla środowiska produkcyjnego
• Przykład praktyczny: allow: ["Bash(npm run:*)", "Read(./src/**)"], deny: ["Bash(rm:*)", "Bash(sudo:*)", "Read(.env*)"]
• Zagadnienie: Ask list dla krytycznych operacji
• Przykład praktyczny: "ask": ["Bash(git push:*)", "Bash(npm publish:*)"]

Context Management - CLAUDE.md Template
• Zagadnienie: Struktura CLAUDE.md dla optymalnego kontekstu
• Przykład praktyczny: Sekcje: ## Overview (purpose, stack), ## Structure (katalogi), ## Development (komendy), ## Conventions (standards), ## Known Issues
• Zagadnienie: Code examples w CLAUDE.md
• Przykład praktyczny: Bloki ```typescript z template endpoint, service, validation pattern

Cost Optimization - Model Selection
• Zagadnienie: Wybór modelu według złożoności zadania
• Przykład praktyczny: Haiku dla formatowania/typos, Sonnet dla standard coding, Opus dla architektury/complex reasoning
• Zagadnienie: Monitoring kosztów
• Przykład praktyczny: > /cost w sesji, tracking usage z PostToolUse hook

Cost Optimization - Token Reduction
• Zagadnienie: Zmniejszanie input tokens
• Przykład praktyczny: Zamiast @. użyj @src/auth.ts @src/auth.test.ts - tylko potrzebne pliki
• Zagadnienie: Excluding niepotrzebne pliki
• Przykład praktyczny: "deny": ["Read(node_modules/**)", "Read(.git/**)", "Read(dist/**)"]

Security - Protecting Secrets
• Zagadnienie: Blokowanie dostępu do wrażliwych plików
• Przykład praktyczny: PreToolUse hook sprawdzający ['.env', '.aws/', '.ssh/', 'secrets/', 'private_key'] i zwracający exit(2)
• Zagadnienie: Git hooks dla Claude Code
• Przykład praktyczny: .git/hooks/pre-commit blokujący commit \.env lub API keys pattern

Team Workflows - Shared Configuration
• Zagadnienie: Dzielenie się skills/agents w projekcie
• Przykład praktyczny: .claude/skills/api-review/ commitowany do git, cały zespół ma automatyczny dostęp po git pull
• Zagadnienie: Project-level settings
• Przykład praktyczny: .claude/settings.json w git z permissions i hooks dla całego zespołu

Workflow Patterns - Phased Development
• Zagadnienie: Podział pracy na fazy: Research → Design → Implement → Test → Document
• Przykład praktyczny: Fase 1: claude --permission-mode plan do research, Faza 2: > /exit-plan do implementacji
• Zagadnienie: Clear context między fazami
• Przykład praktyczny: > /new + @CLAUDE.md dla świeżego kontekstu między fazami

Workflow Patterns - 60% Context Rule
• Zagadnienie: Nie przekraczanie 60% context usage
• Przykład praktyczny: Gdy context blisko limitu: > /new aby zacząć fresh conversation z kluczowym kontekstem
• Zagadnienie: Parallel research
• Przykład praktyczny: > Have debugger agent investigate X, meanwhile test-runner check Y, also security-review scan Z

---

## MODUŁ ADVANCED PATTERNS (21-23h)

Custom Workflow - Pre-Commit Validation
• Zagadnienie: Automatyczne testy przed każdym commitem
• Przykład praktyczny: PreToolUse hook dla Bash(git commit:*) wykonujący npm test && npm run lint && npm run type-check
• Zagadnienie: Blokowanie commit przy błędach
• Przykład praktyczny: Hook zwracający non-zero exit code gdy testy failują

Custom Workflow - Auto-Format Multi-Language
• Zagadnienie: Formatowanie według typu pliku
• Przykład praktyczny: PostToolUse hook z case: *.ts|*.js) prettier;; *.py) black;; *.go) gofmt
• Zagadnienie: Conditional formatting
• Przykład praktyczny: Sprawdzenie czy plik istnieje przed formatowaniem: test -f {} && formatter {}

Custom Workflow - Automatic Testing
• Zagadnienie: Auto-run testów po edycji kodu
• Przykład praktyczny: PostToolUse dla Edit(src/**) uruchamiający test dla odpowiadającego pliku w tests/
• Zagadnienie: Test file mapping
• Przykład praktyczny: sed 's/src/tests/' | sed 's/\\.ts$/.test.ts/' do znalezienia test file

Multi-Agent Orchestration - Coordinator
• Zagadnienie: Coordinator agent delegujący do specjalistów
• Przykład praktyczny: Agent z tools: Task który: breaks down task → identifies specialist agent → delegates → synthesizes results
• Zagadnienie: Przykład delegacji
• Przykład praktyczny: "Fix auth" → debugger investigates, code-reviewer reviews, test-runner verifies, optimizer checks performance

CI/CD Integration - GitHub Actions
• Zagadnienie: Claude Code review w PR workflow
• Przykład praktyczny: GitHub Action: install Claude → claude --permission-mode bypassPermissions -p "Review PR..." → comment wyniki
• Zagadnienie: Security scanning w CI
• Przykład praktyczny: Action failujący przy znalezieniu exposed secrets lub SQL injection

CI/CD Integration - Pre-Push Hook
• Zagadnienie: Security review przed push
• Przykład praktyczny: .git/hooks/pre-push wywołujący claude -p "Quick security scan: $(git diff --name-only @{u}..HEAD)"
• Zagadnienie: Exit on issues
• Przykład praktyczny: if [ $? -ne 0 ]; then echo "Security issues!"; exit 1; fi

Monitoring - Usage Tracking
• Zagadnienie: Logowanie wszystkich użyć narzędzi
• Przykład praktyczny: PostToolUse hook zapisujący timestamp, tool name, file/command do ~/.claude/usage.log
• Zagadnienie: CSV format dla analizy
• Przykład praktyczny: echo "$(date),$(jq -r '.tool'),$(jq -r '.tool_input.file_path // .tool_input.command')" >> log

Monitoring - Cost Tracking
• Zagadnienie: Tracking kosztów per sesja/model
• Przykład praktyczny: Python script logujący model, input_tokens, output_tokens, calculated cost do cost.log
• Zagadnienie: Monthly cost reports
• Przykład praktyczny: Agregacja logów: jq -s 'group_by(.model) | map({model: .[0].model, total_cost: map(.cost_usd) | add})'

Custom MCP Server - Development Tools
• Zagadnienie: MCP server z custom narzędziami (linter, git blame)
• Przykład praktyczny: Node.js server z tools: run_linter (npx eslint), get_git_blame (git blame -L line)
• Zagadnienie: Registration
• Przykład praktyczny: server.setRequestHandler('tools/list', ...) i server.setRequestHandler('tools/call', ...)
• Zagadnienie: Installation
• Przykład praktyczny: claude mcp add --transport stdio dev-tools -- node /path/to/server.js

Custom MCP Server - Database Integration
• Zagadnienie: Własny MCP server dla niestandardowej bazy danych
• Przykład praktyczny: Server z narzędziami: execute_query, get_schema, explain_query
• Zagadnienie: Security
• Przykład praktyczny: Whitelist allowed queries, sanitize inputs, read-only user w connection string

---

## MODUŁ CASE STUDIES (23-25h)

Case Study: Legacy Migration - Phase 1 Planning
• Zagadnienie: Migracja 50k LOC JavaScript → TypeScript
• Przykład praktyczny: claude --permission-mode plan → analyze structure → identify modules → map dependencies → document w CLAUDE.md
• Zagadnienie: Creating migration skills
• Przykład praktyczny: .claude/skills/ts-migration/ dla automatycznej konwersji .js → .ts z type annotations

Case Study: Legacy Migration - Phase 2 Execution
• Zagadnienie: Wykonanie migracji z hooks
• Przykład praktyczny: PostToolUse hook: prettier + type-check po każdej edycji
• Zagadnienie: Adding tests
• Przykład praktyczny: Skill add-tests generujący .test.ts dla każdego migrowanego modułu, target 80%+ coverage
• Zagadnienie: Results
• Przykład praktyczny: 50k LOC w 2 tygodnie, 85% test coverage, type-safe codebase

Case Study: API Development - Team Setup
• Zagadnienie: 4-person team building REST API
• Przykład praktyczny: Shared .claude/skills/ (api-endpoint, api-review, db-migration), .claude/agents/ (code-reviewer, test-runner)
• Zagadnienie: Team settings
• Przykład praktyczny: .claude/settings.json z permissions, hooks (prettier, type-check), commitowany do git

Case Study: API Development - Workflow
• Zagadnienie: Developer workflow dla nowego endpoint
• Przykład praktyczny: > Create POST /api/v1/products with validation, tests, docs → skill generuje route, service, validation, tests, OpenAPI
• Zagadnienie: Pre-commit hooks
• Przykład praktyczny: Automatyczne npm test && lint przed każdym commitem
• Zagadnienie: Results
• Przykład praktyczny: 50+ endpoints w 6 weeks, 90% coverage, consistent style

Case Study: Production Debugging - Investigation
• Zagadnienie: Memory leak crashing production co 6h
• Przykład praktyczny: Phase 1: > Analyze production logs → identify memory growth pattern → reproduce locally
• Zagadnienie: Using debugger agent
• Przykład praktyczny: > Use debugger agent to investigate memory leak → focus on event listeners, DB connections, large objects

Case Study: Production Debugging - Fix & Verify
• Zagadnienie: Implementation fix
• Przykład praktyczny: Identified: unclosed WebSocket connections → fix: proper cleanup w connection handler
• Zagadnienie: Prevention
• Przykład praktyczny: Added memory leak tests, 24h load test, monitoring alerts
• Zagadnienie: Results
• Przykład praktyczny: Memory stable 72h+, monitoring prevents future leaks

---

## MODUŁ ENTERPRISE & SCALE (25-27h)

Enterprise Configuration - Managed Settings
• Zagadnienie: IT-deployed settings z najwyższą precedencją
• Przykład praktyczny: Enterprise settings.json z sandbox: {enabled: true}, telemetry endpoint, restricted permissions
• Zagadnienie: Enforcement
• Przykład praktyczny: Managed settings nie mogą być override przez user/project settings

Enterprise - Team Templates
• Zagadnienie: Repository template dla nowych projektów
• Przykład praktyczny: company-template/ z .claude/skills/, agents/, settings.json, CLAUDE.md, scripts/setup-claude.sh
• Zagadnienie: Onboarding
• Przykład praktyczny: New project: git clone template → setup-claude.sh → instant team configuration

Large-Scale - Batch File Review
• Zagadnienie: Review wszystkich plików w codebase jako batch
• Przykład praktyczny: Python script iterujący przez Path("src").rglob("*.ts"), tworzący batch request dla każdego
• Zagadnienie: Batch processing
• Przykład praktyczny: client.beta.messages.batches.create(requests) → poll status → collect results → generate report JSON

Large-Scale - Multi-Repository Management
• Zagadnienie: Sync kodu między wieloma repos
• Przykład praktyczny: Skill cross-repo-sync sprawdzający diff shared/ między repo-api, repo-web, repo-mobile
• Zagadnienie: Sync strategy
• Przykład praktyczny: Identify diffs → propose sync → cp -r repo-shared/types/* do każdego repo → run tests w każdym

Performance at Scale - File Indexing
• Zagadnienie: Custom file indexer zamiast filesystem scan
• Przykład praktyczny: ~/.claude/file-finder-fast.sh używający pre-built index: ~/bin/code-indexer query "$QUERY"
• Zagadnienie: Configuration
• Przykład praktyczny: "fileSuggestion": {"type": "command", "command": "~/.claude/file-finder-fast.sh"}

Performance at Scale - Context Caching Strategy
• Zagadnienie: Cachowanie dużej dokumentacji (100k+ tokens)
• Przykład praktyczny: First request z cache_control: {type: "ephemeral"} creates cache → subsequent requests reuse (90% cheaper)
• Zagadnienie: Cache metrics
• Przykład praktyczny: response1.usage.cache_creation_input_tokens vs response2.usage.cache_read_input_tokens

Enterprise Telemetry - OpenTelemetry Integration
• Zagadnienie: Integration z enterprise monitoring
• Przykład praktyczny: "otelHeadersHelper": "/usr/local/bin/company-otel-headers.sh", env: {OTEL_METRICS_EXPORTER: "otlp"}
• Zagadnienie: Custom headers
• Przykład praktyczny: Script generujący headers z trace ID, span ID, team ID dla każdego request

Enterprise Security - Compliance Skill
• Zagadnienie: Automatic compliance checking (GDPR, SOC2, HIPAA)
• Przykład praktyczny: Skill compliance-check skanujący: PII handling, data retention, encryption, audit logs
• Zagadnienie: Pre-deploy validation
• Przykład praktyczny: CI/CD step uruchamiający compliance skill przed deployment

Scale Optimization - Parallel Batch Processing
• Zagadnienie: Processing thousands of files równolegle
• Przykład praktyczny: Split files w chunks → create multiple batches → process in parallel → merge results
• Zagadnienie: Rate limiting handling
• Przykład praktyczny: Exponential backoff przy rate limit errors, queue management

Enterprise Deployment - Containerized Claude Code
• Zagadnienie: Claude Code w Docker dla consistent environment
• Przykład praktyczny: Dockerfile: FROM node:18 → npm install -g @anthropic-ai/claude-code → COPY .claude/ → ENTRYPOINT ["claude"]
• Zagadnienie: Secrets management
• Przykład praktyczny: Docker secrets lub env injection, nigdy hardcoded API keys w image

---

## PODSUMOWANIE

Checklist Kompetencji - Podstawy
• Zagadnienie: Must-have skills dla początujących
• Przykład praktyczny: Instalacja, CLI usage, referencje @file, permission modes, basic prompting

Checklist Kompetencji - Średniozaawansowany
• Zagadnienie: Skills dla produktywnej pracy
• Przykład praktyczny: Agent Skills, Hooks (auto-format, protection), MCP servers (GitHub, DB), Plugins (Jira, Slack, Notion), Slash commands, IDE integration

Checklist Kompetencji - Zaawansowany
• Zagadnienie: Expert-level capabilities
• Przykład praktyczny: Subagents, CLAUDE.md optimization, API & SDK (tools, streaming, caching), custom MCP servers, custom plugins, CI/CD integration

Checklist Kompetencji - Enterprise Expert
• Zagadnienie: Large-scale deployment skills
• Przykład praktyczny: Managed settings, batch processing, multi-repo, monitoring/telemetry, compliance, performance optimization at scale

Dalsze Zasoby - Oficjalne
• Zagadnienie: Gdzie szukać aktualnej dokumentacji
• Przykład praktyczny: https://code.claude.com/docs/ (Claude Code), https://platform.claude.com/docs/ (API), https://github.com/anthropics/claude-code

Dalsze Zasoby - Community
• Zagadnienie: Community resources i pomoc
• Przykład praktyczny: Reddit r/ClaudeAI, GitHub Discussions, community tools: https://github.com/ykdojo/claude-code-tips, https://github.com/zebbern/claude-code-guide

Praktyczne Projekty - Początkujący
• Zagadnienie: Pierwsze projekty do nauki
• Przykład praktyczny: 1. Stwórz skill dla swojego języka/frameworka, 2. Setup auto-format hook, 3. Napisz CLAUDE.md dla istniejącego projektu

Praktyczne Projekty - Średniozaawansowany
• Zagadnienie: Projekty rozwijające umiejętności
• Przykład praktyczny: 1. Integracja MCP (GitHub + DB), 2. Custom subagent dla code review, 3. Slash commands dla team workflows, 4. Simple plugin dla integracji z internal tool

Praktyczne Projekty - Zaawansowany
• Zagadnienie: Expert-level challenges
• Przykład praktyczny: 1. Custom MCP server dla internal tools, 2. CI/CD integration z auto-review, 3. Batch processing codebase, 4. Multi-agent orchestration system

---
