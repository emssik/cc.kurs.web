# Plan aktualizacji kursu — 11 marca 2026

Zakres: zmiany w Claude Code od wersji 2.1.51 do 2.1.72 (23 luty – 9 marca 2026).

---

## Część A — Aktualizacja strony "Aktualizacje" (content/updates)

Nowy plik: `content/updates/aktualizacja.2026.03.11.md`

Wzór: `aktualizacja.2026.02.22.md` — sekcje tematyczne, każda z InfoBox wskazującym zaktualizowane lekcje.

### Sekcje do opisania

**Effort levels — nowy system kontroli myślenia**
- Uproszczenie do trzech poziomów: low / medium / high z nowymi symbolami i notyfikacjami
- Opus 4.6 domyślnie na medium effort dla subskrybentów Max/Team
- Powrót słowa kluczowego "ultrathink" dla high effort
- Usunięcie Opus 4 i 4.1 z first-party API
- Lekcje: M1/004, M2/001

**`/copy` — interaktywny picker bloków kodu**
- Nowa komenda z pickerem do wyboru bloków kodu z odpowiedzi
- Opcja `w` do zapisu bezpośrednio do pliku (przydatne przez SSH)
- Opcja "Always copy full response"
- Lekcje: M1/004

**`/loop` i cron — powtarzalne zadania**
- `/loop` uruchamia prompt lub komendę cyklicznie (np. `/loop 5m check the deploy`)
- Narzędzia cron do planowania powtarzalnych promptów
- `CLAUDE_CODE_DISABLE_CRON` do wyłączenia zaplanowanych zadań
- Lekcje: M1/008

**HTTP Hooks**
- Hooki mogą teraz wysyłać JSON POST na URL zamiast uruchamiać komendy shell
- Nowy hook `InstructionsLoaded` — reaguje na ładowanie CLAUDE.md/rules
- Nowe pola w eventach hooków: `agent_id`, `agent_type`, `worktree`
- Lekcje: M2/006, M2/007

**Remote Control**
- `claude remote-control` — nowy subcommand do sterowania sesją z zewnątrz
- Opcjonalny argument nazwy sesji
- Lekcje: M1/008 lub M1/010

**Zmiany w skills i pluginach**
- `${CLAUDE_SKILL_DIR}` — zmienna do referencji katalogu skilla
- `/reload-plugins` — przeładowanie pluginów bez restartu
- `/simplify` i `/batch` — nowe wbudowane slash commands
- `pluginTrustMessage` — kontekst organizacyjny dla pluginów
- Nowy typ źródła pluginu: `git-subdir`
- Lekcje: M2/002, M3/001, M3/005

**Voice mode — rozszerzenie**
- STT dla 20 języków (było 10)
- Rebindowalny `voice:pushToTalk` keybinding
- Lekcje: M1/004

**Drobne ulepszenia**
- `/plan` z opcjonalnym argumentem opisu
- `/rename` działa w trakcie pracy Claude'a
- `/resume` picker pokazuje ostatni prompt
- `/debug` przełącza logowanie w trakcie sesji
- `/color` z opcjami reset: `default`, `gray`, `reset`, `none`
- Ctrl+U na pustym bash prompt wychodzi z trybu bash
- HTML comments w CLAUDE.md ukrywane przed Claude'em
- Up-arrow history pokazuje najpierw wiadomości z bieżącej sesji
- `ExitWorktree` tool do opuszczania sesji worktree
- Project configs i auto memory współdzielone między git worktrees
- `includeGitInstructions` — ustawienie usuwające wbudowane instrukcje git workflow
- `sandbox.enableWeakerNetworkIsolation` — słabsza izolacja sieciowa (macOS)
- Rozszerzony bash auto-approval: `lsof`, `pgrep`, `tput`, `ss`, `fd`, `fdfind`, `fmt`, `comm`, `cmp`, `numfmt`, `expr`, `test`, `printf`, `getconf`, `seq`, `tsort`, `pr`

---

## Część B — Aktualizacje istniejących lekcji

### Moduł 1

**M1/003 — Uwierzytelnianie i abonamenty**
- Opus 4 i 4.1 usunięte z first-party API
- Opus 4.6 domyślnie na medium effort

**M1/004 — REPL i skróty klawiszowe**
- Effort levels: low/medium/high z nowymi symbolami
- "ultrathink" przywrócone jako keyword dla high effort
- `/copy` — nowy picker bloków kodu
- Ctrl+U wychodzi z trybu bash
- Up-arrow history: najpierw bieżąca sesja
- `voice:pushToTalk` jako rebindowalny keybinding
- `/color` z opcjami reset

**M1/006 — Bezpieczeństwo**
- `sandbox.enableWeakerNetworkIsolation` (macOS) — nowe ustawienie
- Fix bezpieczeństwa: nested skill discovery z gitignored directories
- Fix bezpieczeństwa: hook commands executing without trust w interactive mode

**M1/007 — CLAUDE.md**
- HTML comments w CLAUDE.md teraz ukrywane przed Claude'em (zmiana zachowania!)
- `${CLAUDE_SKILL_DIR}` — zmienna do ścieżek w skillach
- `includeGitInstructions` — kontrola nad wbudowanymi instrukcjami git

**M1/008 — Zarządzanie sesjami i workflow**
- `/loop` + cron scheduling — powtarzalne zadania
- `/copy` z interaktywnym pickerem
- `/plan` z opcjonalnym opisem
- `/rename` działa w trakcie pracy Claude'a
- `/resume` picker pokazuje ostatni prompt
- `/debug` przełącza logowanie mid-session
- `ExitWorktree` tool
- Project configs współdzielone między worktrees
- Remote Control (`claude remote-control`)

**M1/009 — claude.ai/code**
- VSCode: spark icon z listą sesji
- VSCode: widok planów markdown z komentarzami
- VSCode: natywny dialog zarządzania serwerami MCP
- VSCode: effort level indicator na input border
- VSCode: URI handler `vscode://anthropic.claude-code/open`

**M1/010 — Supermoce ekspertów**
- `ExitWorktree` jako uzupełnienie `EnterWorktree`
- Auto memory współdzielone między git worktrees
- Remote Control jako zaawansowany workflow

### Moduł 2

**M2/001 — Model + Prompt + Context + Tools**
- Effort levels: low/medium/high z implikacjami dla jakości i kosztu
- Opus 4.6 domyślnie na medium effort
- "ultrathink" = high effort
- Przywrócony parametr `model` na Agent tool

**M2/002 — Custom Slash Commands**
- `/simplify` i `/batch` — nowe bundled slash commands jako przykłady
- `/reload-plugins` do przeładowania po instalacji

**M2/004 — Subagenty cz. 1**
- Przywrócony parametr `model` na Agent tool (override per-invocation)
- Fix: team agents dziedziczą model lidera

**M2/006 — Hooki cz. 1**
- `InstructionsLoaded` — nowy event hook
- `agent_id`, `agent_type` w eventach hooków
- `worktree` field w status line hooks

**M2/007 — Hooki cz. 2**
- HTTP Hooks — hooki mogą wysyłać JSON POST na URL (alternatywa dla shell commands)
- Nowe pola w eventach: `agent_id`, `agent_type`, `worktree`

**M2/008 — Bash**
- Rozszerzony bash auto-approval allowlist (17 nowych komend)
- BashTool pomija login shell ze snapshotami (wcześniej wymagał env var)

**M2/010 — MCP Part 2**
- MCP server deduplication — zapobiega duplikatom połączeń
- `ENABLE_CLAUDEAI_MCP_SERVERS=false` — opt-out z konektorów claude.ai

**M2/011 — MCP Part 3**
- VSCode: natywny dialog zarządzania MCP servers

### Moduł 3

**M3/001 — Skille anatomia**
- `${CLAUDE_SKILL_DIR}` — zmienna do referencji katalogu skilla w SKILL.md

**M3/005 — Dystrybucja**
- `pluginTrustMessage` — kontekst organizacyjny
- Nowy typ źródła: `git-subdir`
- `/reload-plugins` — aktywacja po instalacji bez restartu

---

## Część C — Tematy dla modułu 4 (specs/finish.md)

Nowe tematy wynikające z changelogów, które pasują do zaawansowanego modułu:

**Settings (rozbudowa istniejącego punktu)**
- Nowe ustawienia potwierdzone od 2.1.51:
  - `sandbox.enableWeakerNetworkIsolation`
  - `includeGitInstructions`
  - `CLAUDE_CODE_DISABLE_CRON`
  - `ENABLE_CLAUDEAI_MCP_SERVERS`
  - `pluginTrustMessage`
  - `oauth.authServerMetadataUrl`
  - `permissions.disableBypassPermissionsMode`
  - `permissions.defaultMode`
  - Managed settings: macOS plist, Windows Registry
  - `strictKnownMarketplaces` z `pathPattern` regex
- Potwierdza, że Settings to szeroki, samodzielny temat

**Tryb nieinteraktywny i CI/CD (rozbudowa istniejącego punktu)**
- Remote Control (`claude remote-control`) — sterowanie sesją z zewnętrznych narzędzi
- `/loop` + cron scheduling — powtarzalne zadania w tle
- `--print` poprawki (hanging z team agents)
- `--append-system-prompt-file` dokumentacja
- To nie jest tylko `claude -p` — to cały ekosystem automatyzacji

**Agent Teams (rozbudowa istniejącego punktu)**
- Team agents dziedziczą model lidera
- Nested teammates fix (spawning prevention)
- Multi-agent token usage reduction
- Subagent payload stripping dla długich sesji

**Nowy kandydat: Voice Mode**
- 20 języków STT
- Push-to-talk keybinding
- Rozbudowana konfiguracja
- Czy zasługuje na osobną lekcję? Raczej jako podsekcja w Settings lub osobny temat w M4

**Nowy kandydat: Performance i Memory Management**
- Dziesiątki naprawionych memory leaks
- Redukcja baseline memory o ~16MB
- Prompt cache — do 12x redukcja kosztów
- React Compiler integration
- Temat techniczny, ale ważny dla power users z długimi sesjami

---

## Priorytety realizacji

**Wysoki priorytet** — duży wpływ na codzienne użytkowanie:
- Effort levels (M1/004, M2/001) — zmienia sposób interakcji z modelem
- `/loop` i cron (M1/008) — nowy paradygmat pracy
- HTTP Hooks (M2/006, M2/007) — otwiera integracje z webhookami
- `/copy` (M1/004) — często używana funkcja

**Średni priorytet** — wartościowe uzupełnienia:
- Remote Control (M1/008 lub M1/010)
- `${CLAUDE_SKILL_DIR}` (M3/001)
- VSCode improvements (M1/009)
- Zmiany w pluginach (M3/005)
- HTML comments w CLAUDE.md (M1/007)

**Niski priorytet** — drobne aktualizacje:
- Nowe komendy w bash allowlist (M2/008)
- `/color` reset options (M1/004)
- `/debug` toggle (M1/008)
- Voice mode rozszerzenia (M1/004)

---

## Uwagi

- Między 2.1.51 a 2.1.72 naprawiono dziesiątki memory leaks i crashy — warto wspomnieć ogólnie o stabilności, ale nie opisywać każdego fixa
- Wiele zmian dotyczy Windows — kurs tego nie pokrywa, więc pomijamy
- Plugin/marketplace system dojrzał znacząco — wiele fixów i usprawnień
- Prompt cache optimization (12x cost reduction) to ważna informacja dla użytkowników API
