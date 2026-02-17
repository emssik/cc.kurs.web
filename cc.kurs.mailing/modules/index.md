# Indeks tematów - Moduł 01: Podstawy

> Ten plik służy do śledzenia tematów poruszonych w lekcjach kursu Claude Code.
> Pozwala uniknąć powtórzeń i zaplanować kolejne moduły.

## Legenda głębokości omówienia

- 📌 **Wzmianka** - temat wspomniany pobieżnie (1-2 zdania)
- 📘 **Podstawy** - wyjaśnione co to jest i do czego służy
- 📗 **Rozwinięcie** - z przykładami i praktycznymi wskazówkami
- 📕 **Wyczerpany** - kompleksowo, czytelnik może samodzielnie stosować

---

## Lekcja 00: Wprowadzenie - kilka słów na początek

| Temat | Głębokość | Uwagi |
|-------|-----------|-------|
| Forma tekstowa kursu | 📗 Rozwinięcie | Uzasadnienie dlaczego kurs w tekście, nie video - tempo zmian w Claude Code |
| Agenda kursu | 📘 Podstawy | Lista 16 modułów zaplanowanych w kursie |
| Tempo rozwoju Claude Code | 📗 Rozwinięcie | Link do listy zmian z ostatniego tygodnia, wpływ na format kursu |
| Oczekiwania i cele kursu | 📘 Podstawy | Co autor chce osiągnąć, dla kogo jest kurs |

---

## Lekcja 01: Zmiana myślenia - poznaj swojego nowego asystenta

| Temat | Głębokość | Uwagi |
|-------|-----------|-------|
| Claude Code jako agent terminalowy | 📗 Rozwinięcie | Różnica między chatbotem a autonomicznym agentem |
| Delegowanie vs instruowanie | 📕 Wyczerpany | Kluczowa zmiana myślenia: opisz CEL, nie KROKI |
| Uniwersalny interfejs do komputera | 📗 Rozwinięcie | Przykłady dla różnych zawodów: dev, marketer, twórca treści, analityk |
| Analogia "sprytny praktykant" | 📘 Podstawy | Claude jak junior z fotograficzną pamięcią, ale krótką |
| Kiedy NIE używać Claude Code | 📗 Rozwinięcie | Procesy cykliczne, duże pliki binarne, interaktywny debugging |
| Typowe błędy początkujących | 📗 Rozwinięcie | Kopiowanie kodu, zbyt ogólne polecenia, ślepe zaufanie, mega-polecenia |
| Formułowanie promptów | 📕 Wyczerpany | Przykłady dobrych i złych poleceń, używanie analogii i kontekstu |

---

## Lekcja 02: Instalacja i pierwsze uruchomienie

| Temat | Głębokość | Uwagi |
|-------|-----------|-------|
| Instalacja oficjalnym skryptem | 📕 Wyczerpany | macOS/Linux curl, Windows PowerShell |
| Instalacja przez Homebrew | 📘 Podstawy | Zalecana metoda dla Mac z Homebrew |
| Instalacja przez NPM | 📘 Podstawy | Wymaga Node.js 18+, potencjalne problemy z uprawnieniami |
| Weryfikacja instalacji | 📗 Rozwinięcie | `claude --version`, `claude doctor` |
| Pierwsze uruchomienie | 📗 Rozwinięcie | Proces logowania przez przeglądarkę |
| Troubleshooting instalacji | 📗 Rozwinięcie | "command not found", Windows Defender |
| Pierwsze praktyczne użycie | 📕 Wyczerpany | Analiza systemu, tworzenie mini-projektu, analiza istniejącego projektu |
| Aliasy i skróty | 📗 Rozwinięcie | `alias c='claude'`, funkcje shellowe |

---

## Lekcja 03: Uwierzytelnianie i abonamenty - jak naprawdę działają koszty

| Temat | Głębokość | Uwagi |
|-------|-----------|-------|
| Opcje rozliczeń: Pro, Max, API | 📕 Wyczerpany | Pro $17, Max $100/$200, API pay-as-you-go, porównanie równoważników |
| Dlaczego Max lepszy niż API | 📗 Rozwinięcie | Max 5-10x tańszy, konkretne przeliczenia kosztów |
| Dynamiczne limity w abonamentach | 📗 Rozwinięcie | Okno 5h, limity tygodniowe, brak konkretnych liczb requestów |
| Uwierzytelnianie interaktywne | 📗 Rozwinięcie | `/login`, dla kogo najlepsze |
| API Key dla projektów | 📕 Wyczerpany | Konfiguracja .env, `.gitignore`, bezpieczeństwo kluczy |
| Wiele kont (multi-account) | 📗 Rozwinięcie | Aliasy dla firmowych i prywatnych kont, `/logout`, `/login`, `/status` |
| Monitorowanie kosztów | 📕 Wyczerpany | `/status`, `/usage`, `/cost`, alerty w Console |
| Wybór modelu świadomie | 📗 Rozwinięcie | Haiku, Sonnet, Opus - kiedy używać którego, tabela cen |
| Alternatywne modele (GLM 4.7) | 📗 Rozwinięcie | "Strategia cebulowa", z.ai DevPack, kiedy ma sens |
| Zarządzanie kontekstem | 📗 Rozwinięcie | `/compact`, `/context`, 50% reguła, zapisywanie wniosków do pliku |
| Slash commands | 📌 Wzmianka | `/usage`, `/cost`, `/status`, `/compact`, `/context`, `/clear` |
| Bezpieczeństwo kluczy API | 📗 Rozwinięcie | Rotacja co 90 dni, revoke przy wycieku, git filter-branch |

---

## Lekcja 04: Opanuj terminal - REPL i skróty klawiszowe

| Temat | Głębokość | Uwagi |
|-------|-----------|-------|
| REPL (Read-Eval-Print Loop) | 📘 Podstawy | Czym jest, dlaczego ważne |
| Skróty klawiszowe | 📕 Wyczerpany | `\ + Enter`, `Esc`, `Esc Esc`, `Ctrl+R`, `Shift+Tab` |
| Wieloliniowe prompty | 📕 Wyczerpany | `\ + Enter` (uniwersalny), `Shift+Enter` (po `/terminal-setup`) |
| Zatrzymywanie generowania | 📗 Rozwinięcie | `Esc` - natychmiastowy stop |
| Cofanie zmian | 📕 Wyczerpany | `Esc Esc` - restore code/conversation/both, opcje wyboru |
| Historia promptów | 📗 Rozwinięcie | `Ctrl+R` - szukaj w historii |
| Przełączanie trybów uprawnień | 📘 Podstawy | `Shift+Tab` - Normal/Plan/Auto-Accept |
| Konfiguracja terminala | 📕 Wyczerpany | `/terminal-setup`, Option+Enter, Ctrl+J |
| Statusline | 📗 Rozwinięcie | `/statusline`, ccstatusline z GitHub, własne skrypty |
| Template prompts (slash commands) | 📘 Podstawy | Tworzenie własnych komend, `/myreview` |
| Praca przez SSH | 📗 Rozwinięcie | Forwarding autoryzacji, port forwarding |
| Tmux integration | 📗 Rozwinięcie | Detach/reattach sesji, split-window |
| Claude Code przez WEB/telefon | 📌 Wzmianka | Możliwość, ale inne warunki |

---

## Lekcja 05: Referencje do plików (@-syntax)

| Temat | Głębokość | Uwagi |
|-------|-----------|-------|
| Podstawowa składnia @nazwa-pliku | 📕 Wyczerpany | Automatyczne odczytywanie zawartości pliku |
| Automatyczny kontekst w edytorach | 📕 Wyczerpany | VS Code/JetBrains - zaznaczenie automatycznie trafia do Claude |
| Referencje do zakresu linii | 📗 Rozwinięcie | `@plik.js#L10-20` w edytorach |
| Referencje do katalogów | 📗 Rozwinięcie | `@katalog/`, ostrzeżenie o zużyciu tokenów |
| Wielokrotne referencje | 📗 Rozwinięcie | Łączenie wielu plików w jednym zapytaniu |
| Autocomplete dla @ | 📗 Rozwinięcie | Podpowiadanie plików, ↑/↓ nawigacja |
| Pliki binarne - obrazy | 📕 Wyczerpany | PNG, JPG, JPEG - implementacja designu, analiza błędów |
| Pliki PDF | 📗 Rozwinięcie | Czytanie dokumentacji, raportów |
| Metody dołączania plików | 📗 Rozwinięcie | @, drag&drop, Ctrl+V/Alt+V, podanie ścieżki |
| Kombinacje i łańcuchy referencji | 📗 Rozwinięcie | Budowanie kontekstu krok po kroku |
| Workflow patterns | 📕 Wyczerpany | Budowanie kontekstu przyrostowo, scaffolding z przykładów |
| Praktyczne przykłady | 📕 Wyczerpany | Dla programisty, marketera, PM, content writera, rekrutera, nauczyciela, freelancera |

---

## Lekcja 06: Podstawy bezpieczeństwa

| Temat | Głębokość | Uwagi |
|-------|-----------|-------|
| System uprawnień | 📕 Wyczerpany | Read, Edit/Write, Bash - jak działają pytania o zgodę |
| Odpowiedzi na pytania o zgodę | 📗 Rozwinięcie | y (yes), n (no), a (always - zakres zależy od ustawień) |
| Sandbox Mode | 📕 Wyczerpany | Izolacja systemu plików i sieci, `/sandbox`, auto-allow mode |
| Tryby uprawnień | 📕 Wyczerpany | default, acceptEdits, plan, bypassPermissions |
| Przełączanie trybów | 📗 Rozwinięcie | Shift+Tab, Alt+M, `/permissions` |
| Zagrożenia bezpieczeństwa | 📕 Wyczerpany | Scenariusze dla programisty, marketera, content creatora, PM/HR |
| Pliki do ochrony | 📗 Rozwinięcie | ~/.ssh/, ~/.aws/, .env, klucze API |
| .gitignore | 📕 Wyczerpany | Co dodać, jak chronić sekrety |
| Dobre praktyki bezpieczeństwa | 📕 Wyczerpany | Ogranicz zakres, używaj Git, testowe uruchomienia (dry-run) |
| Złe praktyki | 📗 Rozwinięcie | Blind trust, sekretne dane w promptach, niezweryfikowany kod |
| Hooks dla bezpieczeństwa | 📌 Wzmianka | System Hooks do automatycznej walidacji (osobny moduł) |
| Własny Sandbox | 📗 Rozwinięcie | Sandbox Exec na macOS, Docker, fly.io/Hetzner dla testów |
| Sandbox limitations | 📗 Rozwinięcie | Domain fronting, Unix sockets, filesystem privilege escalation |
| Kompatybilność narzędzi | 📘 Podstawy | watchman, docker - excludedCommands, obejścia |

---

## Lekcja 07: CLAUDE.md - zbuduj pamięć projektu

| Temat | Głębokość | Uwagi |
|-------|-----------|-------|
| CLAUDE.md podstawy | 📕 Wyczerpany | Czym jest, jak działa automatyczne ładowanie |
| Hierarchia plików CLAUDE.md | 📕 Wyczerpany | Enterprise → project → rules → user → local, priorytety |
| Komenda /init | 📗 Rozwinięcie | Automatyczne generowanie szkieletu |
| Komenda /memory | 📗 Rozwinięcie | Edycja CLAUDE.md z poziomu sesji |
| Import plików (@syntax) | 📕 Wyczerpany | @README.md, @docs/api.yaml, limit głębokości 5 poziomów |
| Jak pisać CLAUDE.md | 📕 Wyczerpany | Setup, struktura, komendy, konwencje - co zawierać, czego unikać |
| Przykłady CLAUDE.md | 📕 Wyczerpany | Level 1 (minimalny), Level 2 (production-ready), Level 3 (enterprise) |
| CLAUDE.md dla nietechnicznych | 📕 Wyczerpany | Marketerzy, PM, pisarze, freelancerzy - konkretne przykłady |
| Skills vs Slash Commands | 📗 Rozwinięcie | Kiedy używać czego, różnice między mechanizmami |
| Modularyzacja reguł | 📕 Wyczerpany | `.claude/rules/*.md`, path-specific rules z YAML frontmatter |
| Typowe błędy | 📗 Rozwinięcie | Ignorowanie, za długi, konflikt global/project, CLAUDE.local.md w repo |
| Edge cases | 📗 Rozwinięcie | Monorepo, wrażliwe dane, dynamiczne dane |
| Cheat sheet | 📘 Podstawy | Co obowiązkowe, zalecane, opcjonalne, czego unikać |

---

## Lekcja 08: Zarządzanie sesjami i workflow

| Temat | Głębokość | Uwagi |
|-------|-----------|-------|
| Odzyskiwanie sesji /resume | 📕 Wyczerpany | Interaktywny picker sesji, nawigacja ↑/↓, podgląd P, zmiana nazwy R |
| Nazywanie sesji /rename | 📗 Rozwinięcie | Nadawanie czytelnych nazw, pro tip o nazywaniu od razu |
| Eksportowanie sesji /export | 📕 Wyczerpany | Checkpoint Pattern, kiedy eksportować, wczytywanie @plik.md |
| Plan Mode | 📕 Wyczerpany | Shift+Tab, eksploracja bez ryzyka, nie modyfikuje plików |
| Tryby pracy (Normal/Plan/Auto-Accept) | 📕 Wyczerpany | Tabela trybów, cykl przełączania Shift+Tab |
| Wysyłanie do chmury (& prefix) | 📗 Rozwinięcie | Zadania w claude.ai/code, --remote alternatywa |
| Monitorowanie zadań /tasks | 📗 Rozwinięcie | Lista zadań lokalnych i zdalnych, opcje Enter/t/r |
| Teleportacja sesji /teleport | 📗 Rozwinięcie | Przenoszenie z WEB do CLI, --teleport flaga |
| Praca w tle (Ctrl+B) | 📕 Wyczerpany | Przenoszenie procesów, automatyczne sprawdzanie statusu |
| Tryb bash (! prefix) | 📗 Rozwinięcie | Bezpośrednie wykonanie komend bez analizy Claude |
| Auto-Accept Mode | 📗 Rozwinięcie | Zaufane operacje, wymaga git backup |
| Tryb nieinteraktywny (-p) | 📕 Wyczerpany | Jednorazowy prompt, skrypty automatyzacji |
| Output JSON (--output-format) | 📗 Rozwinięcie | Parsowalne dane dla skryptów |
| Wznawianie sesji (--continue, --resume) | 📗 Rozwinięcie | Flagi CLI, różnica vs slash commands |
| Piping danych | 📗 Rozwinięcie | cat file | claude -p, batch processing |
| Checkpoint Pattern | 📕 Wyczerpany | Strategia: /rename → /export co 30-60 min → Plan Mode |

---

## Lekcja 09: Claude Code w przeglądarce - claude.ai/code

| Temat | Głębokość | Uwagi |
|-------|-----------|-------|
| Dla kogo jest claude.ai/code | 📗 Rozwinięcie | Nie-programiści, brak dostępu do CLI, delegowanie zadań |
| Konfiguracja: GitHub OAuth | 📕 Wyczerpany | Połączenie z GitHub, zakres uprawnień |
| Instalacja Claude GitHub App | 📕 Wyczerpany | Wybór repozytoriów, zarządzanie dostępem |
| Konfiguracja środowiska | 📕 Wyczerpany | Domyślne narzędzia (Python, Node.js, Ruby, PHP, Go, Rust, Java, C++), PostgreSQL, Redis |
| Dostęp do sieci | 📕 Wyczerpany | Limited/Full/None, biała lista domen (GitHub, npmjs, pypi, AWS, Azure) |
| Zmienne środowiskowe | 📕 Wyczerpany | Dodawanie przez UI, SessionStart Hook, $CLAUDE_CODE_REMOTE |
| Sesja w WEB | 📗 Rozwinięcie | Klonowanie repo, przygotowanie środowiska, wykonywanie zadania |
| Diff View | 📕 Wyczerpany | Podgląd zmian, komentowanie, iteracja przed PR |
| Workflow z diff view | 📗 Rozwinięcie | Review → komentarz → poprawa → PR |
| Praktyczne przykłady | 📕 Wyczerpany | Dla programisty, marketera, PM, analityka, pisarza, rekrutera |
| Ograniczenia sandbox | 📕 Wyczerpany | Docker/Unix sockets, proxy blokujący binarne, tylko GitHub, timeout |
| WEB vs CLI | 📕 Wyczerpany | Kiedy co wybrać, łączenie środowisk |
| Bezpieczeństwo WEB | 📗 Rozwinięcie | Izolacja VM, credentials, Git proxy, czego sandbox NIE chroni |
| Konfiguracja terminala do WEB | 📗 Rozwinięcie | /remote-env, automatyczna instalacja zależności |
| Teleportacja sesji | 📕 Wyczerpany | Wymagania, sposoby (/teleport, claude --teleport), git status/stash, jednokierunkowość |
| Typowe problemy WEB | 📗 Rozwinięcie | Repository not found, network failed, timeout, teleportacja |

---

## Lekcja 10 (Moduł 02-01): Wprowadzenie do narzędzi - od autopilota do precyzyjnego sterowania

| Temat | Głębokość | Uwagi |
|-------|-----------|-------|
| Model + Prompt + Context + Tools | 📗 Rozwinięcie | Podstawowa formuła pracy z AI, jak elementy wpływają na wynik |
| Dobór modelu (Haiku, Sonnet, Opus) | 📘 Podstawy | Przypomnienie z L03, kontekst narzędzi |
| Formułowanie promptów zaawansowane | 📗 Rozwinięcie | READ, UPDATE, CREATE patterns, kontynuacja L01 |
| Kontekst jako król (Context is king) | 📗 Rozwinięcie | Dlaczego kontekst ważniejszy niż prompt, budowanie kontekstu |
| Autopilot vs precyzyjne sterowanie | 📕 Wyczerpany | Dwa poziomy pracy z narzędziami, kiedy przejąć kontrolę |
| Jawne wywoływanie narzędzi | 📕 Wyczerpany | Składnia "Użyj [TOOL] z parametrami:", 8 case studies |
| Timeout w Bash | 📕 Wyczerpany | Parametr timeout, domyślny 180000ms, max 600000ms, przykłady użycia |
| Multiline w Grep | 📕 Wyczerpany | Wyszukiwanie wieloliniowe, pattern z [\\s\\S]*?, praktyczne przykłady |
| Offset i Limit w Read | 📕 Wyczerpany | Paginacja dużych plików, analiza fragmentów, case study z logami |
| Output modes w Grep | 📕 Wyczerpany | content/files_with_matches/count, kiedy używać którego |
| Head_limit w Grep | 📕 Wyczerpany | Ograniczanie liczby wyników, kontrola outputu |
| Context lines w Grep (-A, -B, -C) | 📗 Rozwinięcie | Pokazywanie kontekstu wokół dopasowań |
| Case insensitive search (-i) | 📗 Rozwinięcie | Ignorowanie wielkości liter w Grep |
| Glob patterns | 📗 Rozwinięcie | Filtrowanie plików w Grep (*.js, *.{txt,md}) |
| WebFetch z promptem | 📕 Wyczerpany | Precyzyjne wyciąganie danych ze stron, case study technical writer |
| Kombinowanie narzędzi (LEGO pattern) | 📕 Wyczerpany | Grep→Read→Edit, WebFetch→Bash→Write, Glob→Grep→Task |
| Case Studies power users | 📕 Wyczerpany | 8 szczegółowych scenariuszy: backend dev, marketer, analyst, PM, writer, recruiter, nauczyciel, content writer |
| Narzędzie Read | 📕 Wyczerpany | Pełny opis: parametry, offset, limit, obsługa obrazów/PDF/Jupyter |
| Narzędzie Write | 📕 Wyczerpany | Tworzenie i nadpisywanie plików, wymóg wcześniejszego Read |
| Narzędzie Edit | 📕 Wyczerpany | Zamiany tekstowe, old_string/new_string, replace_all |
| Narzędzie NotebookEdit | 📕 Wyczerpany | Edycja komórek Jupyter, cell_id, edit_mode (replace/insert/delete) |
| Narzędzie Glob | 📕 Wyczerpany | Wyszukiwanie plików po wzorcach, pattern, path, sortowanie po modyfikacji |
| Narzędzie Grep | 📕 Wyczerpany | Pełny opis wszystkich parametrów: pattern, output_mode, glob, type, multiline, head_limit, offset, context |
| Narzędzie Bash | 📕 Wyczerpany | Wykonywanie poleceń: command, timeout, run_in_background, dangerouslyDisableSandbox |
| Narzędzie mcp__ide__executeCode | 📕 Wyczerpany | Wykonywanie Python w Jupyter kernel, stan utrzymywany między wywołaniami |
| Narzędzie WebFetch | 📕 Wyczerpany | Pobieranie i analiza URL: url, prompt, cache 15 minut |
| Narzędzie WebSearch | 📕 Wyczerpany | Wyszukiwanie w sieci: query, allowed_domains, blocked_domains (tylko USA) |
| Narzędzie Task | 📕 Wyczerpany | Subagenty: subagent_type, prompt, description, model, resume, run_in_background |
| Narzędzia TaskCreate/Update/List/Get/Output/Stop | 📕 Wyczerpany | Pełne API zarządzania zadaniami, wszystkie parametry |
| Narzędzie AskUserQuestion | 📕 Wyczerpany | Zadawanie pytań: questions, header, options, multiSelect, metadata |
| Narzędzia EnterPlanMode/ExitPlanMode | 📕 Wyczerpany | Tryb planowania: allowedPrompts, pushToRemote |
| Narzędzie Skill | 📕 Wyczerpany | Wykonywanie slash commands: skill, args |
| Narzędzie mcp__ide__getDiagnostics | 📕 Wyczerpany | Diagnostyka VS Code: uri (opcjonalny) |
| Słowniczek terminów narzędzi | 📕 Wyczerpany | Pattern, API, Endpoint, Kernel, Timeout, Multiline, Offset, Limit, Head_limit, Output_mode, Context lines, Glob pattern, Token limit |

---

## Lekcja 11 (Moduł 02-02): Custom Slash Commands - Twoje Własne Skróty

| Temat | Głębokość | Uwagi |
|-------|-----------|-------|
| Czym są custom slash commands | 📕 Wyczerpany | Własne skróty dla Claude, proste pliki .md z instrukcjami |
| Built-in commands: /help | 📕 Wyczerpany | Pokazuje wszystkie dostępne komendy (built-in + custom) |
| Built-in commands: /compact | 📕 Wyczerpany | Kompresja historii konwersacji, opcje focus on topic |
| Built-in commands: /clear | 📕 Wyczerpany | Czyszczenie całej historii, fresh start |
| Built-in commands: /context | 📕 Wyczerpany | Token usage, files in context, loaded commands |
| Built-in commands: /init | 📕 Wyczerpany | Tworzenie .claude/CLAUDE.md (project memory) |
| Built-in commands: /config | 📕 Wyczerpany | Konfiguracja Claude Code settings, GUI |
| Built-in commands: /permissions | 📕 Wyczerpany | Zarządzanie uprawnieniami tools |
| Tworzenie pierwszego custom command | 📕 Wyczerpany | 4 przykłady step-by-step: morning routine, social post, CSV analysis, code review |
| Argumenty: $ARGUMENTS | 📕 Wyczerpany | Podstawowy placeholder, wszystko po nazwie komendy |
| Argumenty: $0, $1, $2 | 📕 Wyczerpany | Positional arguments, konkretne części inputu |
| Lokalizacja: Personal commands | 📕 Wyczerpany | ~/.claude/commands/ - tylko dla Ciebie, wszystkie projekty |
| Lokalizacja: Project commands | 📕 Wyczerpany | .claude/commands/ - dla całego teamu, commitowane do git |
| Priority hierarchy | 📕 Wyczerpany | Enterprise > Project > Personal, konflikt przy tej samej nazwie |
| Organizacja w subdirectories | 📕 Wyczerpany | folder/file.md → /folder:file, namespacing |
| Autocomplete dla slash commands | 📕 Wyczerpany | Menu po wpisaniu /, nawigacja strzałkami, tab completion |
| Hot reload mechanizm | 📕 Wyczerpany | Instant updates bez restartu, iterative development |
| Discovery - jak Claude znajduje komendy | 📕 Wyczerpany | Scan locations, cache, availability check |
| Przykłady dla Developers | 📕 Wyczerpany | 6 commands: /commit, /test, /bug-hunt, /refactor, /api-doc, /dependency-check |
| Przykłady dla Marketers | 📕 Wyczerpany | 5 commands: /blog-post, /competitor-research, /email-campaign, /seo-audit, /hashtag-research |
| Przykłady dla Data Analysts | 📕 Wyczerpany | 4 commands: /csv-summary, /create-chart, /monthly-report, /data-clean |
| Przykłady dla HR/Admin | 📕 Wyczerpany | 3 commands: /screen-cv, /offer-letter, /onboarding-checklist |
| Przykłady dla Managers | 📕 Wyczerpany | 2 commands: /standup-summary, /performance-review |
| Best practices: DO ✅ | 📕 Wyczerpany | Descriptive names, clear instructions, $ARGUMENTS flexibility, examples, output format |
| Best practices: DON'T ❌ | 📕 Wyczerpany | Vague names, too complex, hardcoded values, destructive without confirmation, no error handling |
| Naming conventions | 📕 Wyczerpany | verb-noun pattern, category:action with subdirectories, max 64 chars |
| Documentation tips | 📕 Wyczerpany | In-command comments, team wiki/README |
| Troubleshooting: Command not found | 📕 Wyczerpany | Check file location, name, wait for hot reload, restart if needed |
| Troubleshooting: $ARGUMENTS not working | 📕 Wyczerpany | Check placement (markdown body), quotes, test output |
| Troubleshooting: Command unexpected behavior | 📕 Wyczerpany | Be explicit, add examples, specify tools |
| Troubleshooting: Local vs team | 📕 Wyczerpany | Move from personal to project, commit to git |
| Troubleshooting: Too many commands | 📕 Wyczerpany | Organize with subdirectories, clear categories |
| Zadanie praktyczne | 📕 Wyczerpany | Challenge: 3 custom commands dla swojej roli z wymaganiami |
| Słowniczek | 📕 Wyczerpany | 10 terminów: custom slash command, built-in, $ARGUMENTS, positional args, personal/project commands, hot reload, autocomplete, subdirectories, CLAUDE.md |

---

## Lekcja 12 (Moduł 02-03): Custom Slash Commands - Zaawansowane Workflow

| Temat | Głębokość | Uwagi |
|-------|-----------|-------|
| Multi-step workflows: Sequential | 📕 Wyczerpany | Step 1 → Step 2 → Step 3, każdy krok przed następnym |
| Multi-step workflows: Complex with validation | 📕 Wyczerpany | Pre-deployment checks, deployment steps, post-deployment, STOP conditions |
| Multi-step workflows: Parallel tasks | 📕 Wyczerpany | Run all → Collect results, 4x speed gain |
| Multi-step workflows: Conditional | 📕 Wyczerpany | IF-THEN-ELSE logic, adapts to situation, early exit |
| Multi-step workflows: Loops | 📕 Wyczerpany | FOR EACH item → Process → Collect, bulk processing |
| Multi-step workflows: Error recovery | 📕 Wyczerpany | Checkpoint → Refactor → Validate → Rollback if fail |
| Tool-specific: Read optimization | 📕 Wyczerpany | Size-based strategy: <10MB full, 10-100MB chunks, >100MB tail |
| Tool-specific: Grep optimization | 📕 Wyczerpany | Progressive refinement: count → content/files → refine pattern |
| Tool-specific: WebSearch + WebFetch combo | 📕 Wyczerpany | Broad search → Deep dive → Synthesis, cache-aware |
| Tool-specific: Bash patterns | 📕 Wyczerpany | Parallel, sequential (&&), background, timeout |
| Tool-specific: Write vs Edit decision | 📕 Wyczerpany | File exists → Edit, new → Write, logic table |
| Advanced arguments: Optional | 📕 Wyczerpany | Required + optional, intelligent defaults, ${1:-md} |
| Advanced arguments: Flags | 📕 Wyczerpany | --watch, --coverage, --verbose, CLI-like |
| Advanced arguments: Named | 📕 Wyczerpany | key=value parsing, self-documenting |
| Advanced arguments: Multi-line | 📕 Wyczerpany | Short one-liner or detailed spec, both modes |
| Advanced arguments: Validation | 📕 Wyczerpany | Fail fast, validate early, clear errors |
| Conditional logic: If-then-else | 📕 Wyczerpany | Smart test runner, adaptive behavior, multiple modes |
| Conditional logic: Switch-case | 📕 Wyczerpany | Environment-specific deployment, different rules per env |
| Conditional logic: Loops | 📕 Wyczerpany | Process multiple files, progress tracking, error tolerance |
| Conditional logic: Nested conditions | 📕 Wyczerpany | Smart commit + PR creation, multiple decision points |
| Error handling: Try-catch | 📕 Wyczerpany | Backup → Execute → Verify → Recover, safety layers |
| Error handling: Validation cascade | 📕 Wyczerpany | Pre-flight → Build → Deploy → Production, progressive gates |
| Error handling: Graceful degradation | 📕 Wyczerpany | Full → Sample → Basic → Error, best effort |
| Error handling: Retry logic | 📕 Wyczerpany | Max 3 attempts, exponential backoff, fallback to cache |
| Real-world: Feature development | 📕 Wyczerpany | Complete workflow: setup → dev → QA → git → PR, 30min-2h, metrics |
| Real-world: Marketing campaign | 📕 Wyczerpany | Research → Strategy → Calendar → Content → Assets → Email, complete package |
| Real-world: Data pipeline | 📕 Wyczerpany | Loading → Cleaning → EDA → Insights → Report, ~75min to insights |
| Real-world: Team retrospective | 📕 Wyczerpany | Data collection → Analysis → Report generation, 30min weekly |
| Production: Security patterns | 📕 Wyczerpany | Sensitive data handling, destructive warnings, input validation |
| Production: Sensitive data handling | 📕 Wyczerpany | Scan for hardcoded secrets, verify .env, env vars check |
| Production: Destructive operations | 📕 Wyczerpany | Show what affected, explicit confirmation, backup first, log |
| Production: Input validation | 📕 Wyczerpany | Sanitize shell injection, path traversal, format validation |
| Production: Performance - Incremental | 📕 Wyczerpany | Size-based strategy: <10MB at once, chunking for large |
| Production: Performance - Caching | 📕 Wyczerpany | Cache check, age verification, 10-100x faster on hits |
| Production: Performance - Tool selection | 📕 Wyczerpany | Smart choice based on codebase size, 10-100x token savings |
| Production: Reliability - Idempotency | 📕 Wyczerpany | Check first, create only missing, safe to re-run |
| Production: Reliability - Atomicity | 📕 Wyczerpany | All or nothing, transaction pattern, never broken state |
| Production: Reliability - Logging | 📕 Wyczerpany | Audit trail, [timestamp] [user] [command] [result] |
| Production: Team - Documentation | 📕 Wyczerpany | Self-documenting, purpose/requirements/usage/owner |
| Production: Team - Versioning | 📕 Wyczerpany | Version + changelog, track evolution |
| Production: Team - Notification | 📕 Wyczerpany | Slack/email stakeholders, team awareness |
| Optimization: Token - Lazy loading | 📕 Wyczerpany | High-level first, ask focus areas, targeted reads, 10-50x reduction |
| Optimization: Token - Progressive detail | 📕 Wyczerpany | Level 1 (500t) → Level 2 (2000t) → Level 3 (5000t), user controls |
| Optimization: Token - Summarization | 📕 Wyczerpany | Don't show full diff, summary only, handle any size |
| Optimization: Speed - Parallel execution | 📕 Wyczerpany | Single Bash call, wait for all, 2-3x time savings |
| Optimization: Speed - Fast-fail | 📕 Wyczerpany | Check cheapest first, STOP early, exit in seconds vs minutes |
| Optimization: Speed - Background | 📕 Wyczerpany | run_in_background for >3min, continue working |
| Optimization: UX - Progress indicators | 📕 Wyczerpany | Step X/Y, estimated time, what's happening |
| Optimization: UX - Incremental results | 📕 Wyczerpany | Show immediately as generated, feels faster |
| Optimization: UX - Helpful errors | 📕 Wyczerpany | What happened, how to fix, actionable + specific |
| Zadanie końcowe | 📕 Wyczerpany | Complex workflow command: requirements, test, document, share, measure |
| Słowniczek | 📕 Wyczerpany | 14 terminów: multi-step, conditional logic, error handling, idempotency, atomicity, progressive detail, fast-fail, incremental processing, audit trail, graceful degradation, lazy loading, background execution, cache-aware |

---

## Lekcja 13 (Moduł 02-04): Hooks - Od Probabilistyki do Determinizmu

| Temat | Głębokość | Uwagi |
|-------|-----------|-------|
| Czym są hooki w Claude Code | 📕 Wyczerpany | Deterministyczna warstwa kontrolna, różnica AI probabilistyczny vs deterministic hooks |
| Architektura hooka: Event, Matcher, Action | 📕 Wyczerpany | 3 elementy każdego hooka, kiedy/dla czego/co |
| Lokalizacja hooków: User vs Project | 📕 Wyczerpany | ~/.claude/settings.json vs .claude/settings.json, kiedy używać którego |
| Konfiguracja przez /hooks | 📕 Wyczerpany | Interaktywny UI do dodawania hooków, live editing |
| Notification hook | 📕 Wyczerpany | Desktop notifications (macOS/Linux/Windows), osascript, notify-send |
| PostToolUse hook - formatowanie | 📕 Wyczerpany | Automatyczne prettier/black/gofmt po edycji, multi-language support |
| PreToolUse hook - logging | 📕 Wyczerpany | Bash command log do pliku, tracking dla PM/marketers |
| jq basics | 📕 Wyczerpany | Parsowanie JSON w hookach, -r flag, nested values, defaults |
| Exit codes w hookach | 📕 Wyczerpany | 0 = allow, 2 = block, 1/3-255 = non-blocking error |
| Bezpieczeństwo hooków | 📕 Wyczerpany | Hooki wykonują się z user permissions, NIGDY nie kopiuj bez zrozumienia |
| Typowe problemy i debug | 📕 Wyczerpany | Hook się nie uruchamia, command not found, hook za wolny, hook blokuje |
| Kiedy hooks vs prompts | 📕 Wyczerpany | Decision tree: hooks dla deterministycznych operacji, prompts dla business logic |
| $CLAUDE_PROJECT_DIR | 📕 Wyczerpany | Zmienna env dla project-specific scripts, absolute paths |
| Timeout konfiguracja | 📗 Rozwinięcie | Domyślnie 60s, zwiększanie dla długich operacji |
| Słowniczek | 📕 Wyczerpany | 13 terminów: hook, event, matcher, exit code, deterministic, probabilistic, stdin, jq, user hooks, project hooks, timeout, blocking error, non-blocking error |

---

## Lekcja 14 (Moduł 02-05): Hooks - Zaawansowane Bezpieczeństwo i Kontekst

| Temat | Głębokość | Uwagi |
|-------|-----------|-------|
| Hook Input/Output JSON format | 📕 Wyczerpany | Struktura JSON dla różnych tools (Bash, Edit, Write, Read), session_id, cwd, permission_mode |
| jq zaawansowane techniki | 📕 Wyczerpany | Nested extraction, array iteration, default values, single quotes |
| Exit codes zaawansowane | 📕 Wyczerpany | 0 vs 2 behavior per hook event, stderr pokazywane do Claude/user |
| set -euo pipefail best practice | 📕 Wyczerpany | Fail fast w bash hooks, undefined variables jako błędy |
| NOWA składnia PreToolUse (2.1.9+) | 📕 Wyczerpany | hookSpecificOutput.permissionDecision (allow/deny/ask), deprecation starej składni |
| PreToolUse security gate | 📕 Wyczerpany | Blokowanie rm -rf, sudo, .env edits, PEŁNY działający skrypt bash |
| War story: rm -rf disaster | 📕 Wyczerpany | Real incident z Reddit, auto-accept bez guardrails = system deleted |
| Prompt injection vs hooks | 📕 Wyczerpany | OWASP 2025 #1 risk (73% podatność), Google Jules kill chain, hooki chronią przed WYKONANIEM |
| SessionStart context injection | 📕 Wyczerpany | Git logs, branch, uncommitted changes wstrzykiwane do kontekstu, PEŁNY skrypt |
| additionalContext mechanism | 📕 Wyczerpany | SessionStart i UserPromptSubmit, tekst trafia do conversation context |
| SessionStart vs Auto Memory | 📗 Rozwinięcie | External data (git, Jira) vs conversation history, kiedy używać czego |
| PostToolUse audit logging | 📕 Wyczerpany | Compliance (ISO 27001, HIPAA, GDPR, SOC 2), CSV format, timestamp/user/tool/resource |
| Audit requirements | 📕 Wyczerpany | Kto, co, kiedy, rezultat, retention 90 dni, WORM storage |
| WORM storage options | 📗 Rozwinięcie | AWS S3 Object Lock, syslog, PostgreSQL append-only, enterprise compliance |
| Routing Layer analogy | 📕 Wyczerpany | Hooki jako control plane w AI infrastructure, security/context/tracking layers |
| 2026 production standard | 📕 Wyczerpany | "Vibe Coding" vs Engineering, guardrails not bypassable, CI/CD integration |
| Multi-layer defense | 📕 Wyczerpany | Prevention (hooks) + Access Control (sandbox) + Monitoring (logs) + Governance (reviews) + Recovery (backups) |
| Mocne strony PRO | 📕 Wyczerpany | Guardrails nie do obejścia, CI/CD integration, team consistency |
| Słabe strony PRO | 📕 Wyczerpany | Źle napisany hook blokuje, zwiększona latency (~10-100ms), debugging trudniejszy |
| CLAUDE_ENV_FILE | 📕 Wyczerpany | SessionStart only, persystencja env vars dla subsequent bash commands |
| Słowniczek | 📕 Wyczerpany | 15 terminów: PreToolUse, PostToolUse, SessionStart, permissionDecision, additionalContext, WORM, retention policy, routing layer, control plane, prompt injection, guardrails, multi-layer defense, audit trail, compliance |

---

## Lekcja 15 (Moduł 02-08): Bash - Od Terminala do Autonomicznego Asystenta

| Temat | Głębokość | Uwagi |
|-------|-----------|-------|
| Terminal, Shell, Bash - definicje | 📗 Rozwinięcie | Terminal (okno), Shell (interpreter), Bash (konkretny shell), różnice |
| Anatomia komendy bash | 📗 Rozwinięcie | komenda [opcje] [argumenty], krótkie vs długie flagi (-l vs --long) |
| Podstawowe komendy bash | 📗 Rozwinięcie | ls, cd, pwd, mkdir, rm, cp, mv, cat, grep, echo - przegląd dla początkujących |
| Ścieżki absolutne vs relatywne | 📗 Rozwinięcie | /full/path vs ./relative, skróty (., .., ~) |
| Claude jako operator terminala | 📗 Rozwinięcie | Jak Claude wybiera i wykonuje komendy bash |
| Automatyczne wykrywanie kontekstu | 📗 Rozwinięcie | Node.js → npm, Python → pip, Ruby → gem, wykrywanie środowiska |
| Timeout w narzędziu Bash | 📕 Wyczerpany | Domyślnie 30s, maksymalnie 10 min, jawne ustawianie timeout |
| Background execution | 📕 Wyczerpany | run_in_background: true, ShellId, długotrwałe procesy (npm run dev) |
| Spacje w nazwach plików | 📕 Wyczerpany | Problem z bashowymi spacjami, cytowanie ("path with spaces"), Claude robi to automatycznie |
| Operator && (warunkowa sekwencja) | 📕 Wyczerpany | A && B (B tylko jeśli A OK), CI/CD pipelines, install → test → build |
| Operator ; (bezwarunkowa sekwencja) | 📕 Wyczerpany | A ; B (B zawsze), logging, cleanup |
| Operator \|\| (fallback) | 📕 Wyczerpany | A \|\| B (B tylko jeśli A fail), error handling, diagnostyka |
| Równoległe wykonywanie komend | 📕 Wyczerpany | Niezależne komendy w jednym bloku, 3x speed gain |
| Automatyzacja: Backupy | 📕 Wyczerpany | tar -czf z datą, du -h, przykład pełnego skryptu |
| Automatyzacja: Raporty sprzedażowe | 📕 Wyczerpany | awk dla CSV, Python pandas, wybór narzędzia przez Claude |
| Automatyzacja: Przetwarzanie wsadowe | 📕 Wyczerpany | Pętla for, batch rename 500 plików, sed do ekstrakcji |
| Automatyzacja: Monitoring serwera | 📕 Wyczerpany | top, free, df - health check, różnice Linux vs macOS |
| Automatyzacja: Marketing (organizacja mediów) | 📕 Wyczerpany | find, date, organizacja 1000+ obrazków po miesiącach |
| Automatyzacja: PM (raport postępów) | 📕 Wyczerpany | awk na tasks.csv, weekly report per team member |
| Automatyzacja: Pisarz (statystyki draftu) | 📕 Wyczerpany | wc -w, liczenie słów w rozdziałach, total breakdown |
| Automatyzacja: HR (ekstrakcja kontaktów) | 📕 Wyczerpany | pdftotext, grep -E email regex, 200 CV → contacts.txt |
| Bezpieczeństwo Bash: operacje bez pytania | 📕 Wyczerpany | Read-only (git status, git diff, git log) w auto-allow sandbox |
| Bezpieczeństwo Bash: operacje wymagające zgody | 📕 Wyczerpany | Edit/Write, git commit/push, npm install, rm -rf, sudo, force operations |
| Bezpieczeństwo Bash: operacje zabronione | 📕 Wyczerpany | rm -rf /, pliki systemowe, force push do main bez zgody |
| Sandbox Mode podstawy | 📕 Wyczerpany | Domyślnie włączony od 2.1.x, izolacja filesystem + sieć |
| Sandbox: izolacja filesystem | 📕 Wyczerpany | Czytanie wszędzie, zapis tylko w working directory, blokada ~/.bashrc, /etc/ |
| Sandbox: izolacja sieciowa | 📕 Wyczerpany | Whitelist domen, pytanie o zgodę dla nowych, blokada exfiltracji |
| Sandbox: tryby | 📕 Wyczerpany | Auto-allow mode (zalecane) vs regular permissions |
| Sandbox: technologia | 📗 Rozwinięcie | macOS Seatbelt, Linux bubblewrap + socat |
| Escape hatch (wyjście awaryjne) | 📕 Wyczerpany | Gdy sandbox blokuje (docker, watchman), pytanie o zgodę, allowUnsandboxedCommands |
| excludedCommands dla sandboxu | 📕 Wyczerpany | Trwałe wyjątki dla zaufanych narzędzi w settings.json |
| Pro-tip: Dry-run | 📕 Wyczerpany | Sprawdzenie co zostanie usunięte przed delete, find -print → find -delete |
| Pro-tip: Verbose mode | 📗 Rozwinięcie | --verbose dla diagnostyki, npm install --verbose |
| Pro-tip: Exit codes | 📕 Wyczerpany | && echo "✅ Success" \|\| echo "❌ Fail", auto-sprawdzanie wyniku |
| Production-grade Bash by Claude | 📕 Wyczerpany | set -o errexit, cytowanie zmiennych, [[ ]] zamiast [ ], sprawdzanie exit codes |
| Typowe błędy Bash | 📕 Wyczerpany | Timeout, spacje, złe uprawnienia, procesy blokujące, destructive commands |
| Słowniczek Bash | 📕 Wyczerpany | 23 terminy: Terminal, Shell, Bash, Command, Argument, Flag, Exit code, ścieżki, timeout, background, ShellId, operatory, pipe, stdout/stderr, grep, awk, sed, tar, sandbox, escape hatch, sudo |

---

## Podsumowanie tematów

### Tematy wyczerpane (📕) - nie powtarzać

**Zmiana myślenia i podstawy:**
- Delegowanie vs instruowanie
- Formułowanie promptów (cele, nie kroki)

**Instalacja i konfiguracja:**
- Instalacja oficjalnym skryptem
- Pierwsze praktyczne użycie (analiza systemu, mini-projekt)

**Bezpieczeństwo:**
- System uprawnień (Read, Edit/Write, Bash)
- Sandbox Mode (izolacja, auto-allow)
- Tryby uprawnień (default, acceptEdits, plan, bypassPermissions)
- Zagrożenia bezpieczeństwa (scenariusze)
- .gitignore i ochrona sekretów
- Dobre i złe praktyki bezpieczeństwa

**Referencje i kontekst:**
- @syntax dla plików (podstawowa, katalogi, wielokrotne)
- Automatyczny kontekst w edytorach (VS Code/JetBrains)
- Pliki binarne - obrazy (implementacja designu, błędy)
- Workflow patterns z @

**CLAUDE.md:**
- Hierarchia plików (enterprise → project → user → local)
- Import plików (@syntax)
- Jak pisać CLAUDE.md (setup, struktura, konwencje)
- Przykłady (minimalny, production-ready, enterprise)
- CLAUDE.md dla nietechnicznych (marketerzy, PM, pisarze, freelancerzy)
- Modularyzacja reguł (`.claude/rules/`, YAML frontmatter)

**Skróty klawiszowe:**
- Wieloliniowe prompty (`\ + Enter`, `Shift+Enter`)
- Cofanie zmian (`Esc Esc`)
- Konfiguracja terminala (`/terminal-setup`)

**Koszty i abonamenty:**
- Opcje rozliczeń (Pro, Max, API) z porównaniem
- Dlaczego Max lepszy niż API
- Monitorowanie kosztów

**Zarządzanie sesjami i workflow (Lekcja 08):**
- Odzyskiwanie sesji (/resume z interaktywnym pickerem)
- Eksportowanie sesji (/export, checkpoint pattern)
- Plan Mode (Shift+Tab, eksploracja bez zmian)
- Tryby pracy (Normal/Plan/Auto-Accept, przełączanie)
- Praca w tle (Ctrl+B)
- Tryb nieinteraktywny (-p dla skryptów)
- Checkpoint Pattern (workflow)

**Claude Code w przeglądarce (Lekcja 09):**
- Konfiguracja: GitHub OAuth i Claude GitHub App
- Konfiguracja środowiska (narzędzia, języki)
- Dostęp do sieci (Limited/Full/None, biała lista)
- Zmienne środowiskowe (UI + SessionStart Hook)
- Diff View (podgląd, komentowanie, iteracja)
- Praktyczne przykłady dla różnych ról
- Ograniczenia sandbox (Docker, proxy, timeout)
- WEB vs CLI (kiedy co wybrać)
- Teleportacja sesji (wymagania, metody)

**Wbudowane narzędzia - wprowadzenie (Lekcja 10 / Moduł 02-01):**
- Autopilot vs precyzyjne sterowanie narzędziami
- Jawne wywoływanie narzędzi (składnia "Użyj [TOOL] z parametrami")
- Kombinowanie narzędzi (LEGO patterns: Grep→Read→Edit, WebFetch→Bash→Write, Glob→Grep→Task)
- Case studies power users (8 szczegółowych scenariuszy dla różnych ról)
- Wszystkie narzędzia podstawowe z pełnym opisem: Read, Write, Edit, NotebookEdit, Glob, Grep, Bash
- Wszystkie narzędzia sieciowe: WebFetch (z promptem), WebSearch
- Wszystkie narzędzia zarządzania zadaniami: Task, TaskCreate/Update/List/Get/Output/Stop
- Wszystkie narzędzia interakcji: AskUserQuestion, EnterPlanMode, ExitPlanMode, Skill, mcp__ide__getDiagnostics
- Kluczowe parametry narzędzi: timeout w Bash, multiline w Grep, offset/limit w Read, head_limit w Grep, output_mode w Grep
- Słowniczek terminów technicznych narzędzi (13 terminów)

### Tematy rozwinięte (📗) - można pogłębić w zaawansowanych modułach

**Bezpieczeństwo:**
- Własny Sandbox (Sandbox Exec, Docker, fly.io)
- Sandbox limitations (domain fronting, Unix sockets)

**Zarządzanie projektem:**
- Zarządzanie kontekstem (`/context`, 50% reguła)
- Alternatywne modele (GLM 4.7, strategia cebulowa)
- Statusline (custom, ccstatusline)

**Workflow:**
- Kombinacje i łańcuchy referencji

**Zarządzanie sesjami i workflow (Lekcja 08):**
- Nazywanie sesji (/rename)
- Wysyłanie do chmury (& prefix, --remote)
- Teleportacja (/teleport, --teleport)
- Tryb bash (! prefix)
- Auto-Accept Mode
- Output JSON
- Piping danych
- Monitorowanie zadań (/tasks)
- Wznawianie sesji (--continue, --resume flagi CLI)

**Claude Code w przeglądarce (Lekcja 09):**
- Dla kogo jest claude.ai/code
- Sesja w WEB (klonowanie, środowisko, wykonanie)
- Workflow z diff view
- Bezpieczeństwo WEB (izolacja, credentials, Git proxy)
- Konfiguracja terminala do WEB (/remote-env)
- Typowe problemy i rozwiązania

**Wbudowane narzędzia - wprowadzenie (Lekcja 10):**
- Formułowanie promptów zaawansowane (READ, UPDATE, CREATE patterns)
- Kontekst jako król (budowanie kontekstu, dlaczego ważny)
- Context lines w Grep (-A, -B, -C)
- Case insensitive search w Grep (-i)
- Glob patterns w Grep

### Tematy podstawowe (📘) - wymagają rozwinięcia

**Skróty i workflow:**
- Przełączanie trybów uprawnień (Shift+Tab)
- Historia promptów (Ctrl+R)
- REPL (Read-Eval-Print Loop)

### Tematy tylko wspomniane (📌) - wymagają osobnej lekcji

**Moduły zaawansowane:**
- Hooks dla bezpieczeństwa (system do automatycznej walidacji)
- Claude Code przez WEB/telefon
- Template prompts jako Skills

---

## Mapa tematów wg kategorii

### Instalacja i Setup
| Temat | Lekcja | Głębokość |
|-------|--------|-----------|
| Instalacja oficjalnym skryptem | 02 | 📕 Wyczerpany |
| Instalacja przez Homebrew | 02 | 📘 Podstawy |
| Instalacja przez NPM | 02 | 📘 Podstawy |
| Weryfikacja instalacji | 02 | 📗 Rozwinięcie |
| Troubleshooting instalacji | 02 | 📗 Rozwinięcie |
| Pierwsze uruchomienie | 02 | 📗 Rozwinięcie |

### Podstawy myślenia i pracy
| Temat | Lekcja | Głębokość |
|-------|--------|-----------|
| Claude Code jako agent terminalowy | 01 | 📗 Rozwinięcie |
| Delegowanie vs instruowanie | 01 | 📕 Wyczerpany |
| Analogia "sprytny praktykant" | 01 | 📘 Podstawy |
| Formułowanie promptów | 01 | 📕 Wyczerpany |
| Typowe błędy początkujących | 01 | 📗 Rozwinięcie |
| Kiedy NIE używać Claude Code | 01 | 📗 Rozwinięcie |

### Uwierzytelnianie i koszty
| Temat | Lekcja | Głębokość |
|-------|--------|-----------|
| Opcje rozliczeń: Pro, Max, API | 03 | 📕 Wyczerpany |
| Dlaczego Max lepszy niż API | 03 | 📗 Rozwinięcie |
| Dynamiczne limity w abonamentach | 03 | 📗 Rozwinięcie |
| Uwierzytelnianie interaktywne | 03 | 📗 Rozwinięcie |
| API Key dla projektów | 03 | 📕 Wyczerpany |
| Wiele kont (multi-account) | 03 | 📗 Rozwinięcie |
| Monitorowanie kosztów | 03 | 📕 Wyczerpany |
| Wybór modelu świadomie | 03 | 📗 Rozwinięcie |
| Alternatywne modele (GLM 4.7) | 03 | 📗 Rozwinięcie |
| Bezpieczeństwo kluczy API | 03 | 📗 Rozwinięcie |

### Terminal i skróty klawiszowe
| Temat | Lekcja | Głębokość |
|-------|--------|-----------|
| REPL (Read-Eval-Print Loop) | 04 | 📘 Podstawy |
| Skróty klawiszowe (Top 5) | 04 | 📕 Wyczerpany |
| Wieloliniowe prompty | 04 | 📕 Wyczerpany |
| Zatrzymywanie generowania (Esc) | 04 | 📗 Rozwinięcie |
| Cofanie zmian (Esc Esc) | 04 | 📕 Wyczerpany |
| Historia promptów (Ctrl+R) | 04 | 📗 Rozwinięcie |
| Konfiguracja terminala | 04 | 📕 Wyczerpany |
| Statusline | 04 | 📗 Rozwinięcie |
| Praca przez SSH | 04 | 📗 Rozwinięcie |
| Tmux integration | 04 | 📗 Rozwinięcie |

### Referencje do plików i kontekst
| Temat | Lekcja | Głębokość |
|-------|--------|-----------|
| @syntax podstawowa | 05 | 📕 Wyczerpany |
| Automatyczny kontekst w edytorach | 05 | 📕 Wyczerpany |
| Referencje do zakresu linii | 05 | 📗 Rozwinięcie |
| Referencje do katalogów | 05 | 📗 Rozwinięcie |
| Wielokrotne referencje | 05 | 📗 Rozwinięcie |
| Autocomplete dla @ | 05 | 📗 Rozwinięcie |
| Pliki binarne - obrazy | 05 | 📕 Wyczerpany |
| Pliki PDF | 05 | 📗 Rozwinięcie |
| Workflow patterns | 05 | 📕 Wyczerpany |

### Bezpieczeństwo i uprawnienia
| Temat | Lekcja | Głębokość |
|-------|--------|-----------|
| System uprawnień | 06 | 📕 Wyczerpany |
| Odpowiedzi: y/n/a | 06 | 📗 Rozwinięcie |
| Sandbox Mode podstawy | 06 | 📕 Wyczerpany |
| Sandbox Mode szczegółowo | 15 | 📕 Wyczerpany |
| Tryby uprawnień (4 tryby) | 06 | 📕 Wyczerpany |
| Zagrożenia bezpieczeństwa | 06 | 📕 Wyczerpany |
| .gitignore | 06 | 📕 Wyczerpany |
| Dobre praktyki bezpieczeństwa | 06 | 📕 Wyczerpany |
| Własny Sandbox | 06 | 📗 Rozwinięcie |
| Sandbox limitations | 06 | 📗 Rozwinięcie |
| Sandbox: izolacja filesystem i sieciowa | 15 | 📕 Wyczerpany |
| Escape hatch (wyjście awaryjne) | 15 | 📕 Wyczerpany |
| excludedCommands dla sandboxu | 15 | 📕 Wyczerpany |
| Bezpieczeństwo operacji Bash | 15 | 📕 Wyczerpany |

### CLAUDE.md - pamięć projektu
| Temat | Lekcja | Głębokość |
|-------|--------|-----------|
| CLAUDE.md podstawy | 07 | 📕 Wyczerpany |
| Hierarchia plików | 07 | 📕 Wyczerpany |
| /init - generowanie | 07 | 📗 Rozwinięcie |
| /memory - edycja | 07 | 📗 Rozwinięcie |
| Import plików (@syntax) | 07 | 📕 Wyczerpany |
| Jak pisać CLAUDE.md | 07 | 📕 Wyczerpany |
| Przykłady (3 poziomy) | 07 | 📕 Wyczerpany |
| CLAUDE.md dla nietechnicznych | 07 | 📕 Wyczerpany |
| Skills vs Slash Commands | 07 | 📗 Rozwinięcie |
| Modularyzacja reguł | 07 | 📕 Wyczerpany |
| Typowe błędy | 07 | 📗 Rozwinięcie |

### Zarządzanie sesjami i workflow
| Temat | Lekcja | Głębokość |
|-------|--------|-----------|
| Odzyskiwanie sesji /resume | 08 | 📕 Wyczerpany |
| Nazywanie sesji /rename | 08 | 📗 Rozwinięcie |
| Eksportowanie sesji /export | 08 | 📕 Wyczerpany |
| Plan Mode | 08 | 📕 Wyczerpany |
| Tryby pracy (Normal/Plan/Auto-Accept) | 08 | 📕 Wyczerpany |
| Wysyłanie do chmury (& prefix) | 08 | 📗 Rozwinięcie |
| Monitorowanie zadań /tasks | 08 | 📗 Rozwinięcie |
| Teleportacja sesji /teleport | 08 | 📗 Rozwinięcie |
| Praca w tle (Ctrl+B) | 08 | 📕 Wyczerpany |
| Tryb bash (! prefix) | 08 | 📗 Rozwinięcie |
| Auto-Accept Mode | 08 | 📗 Rozwinięcie |
| Tryb nieinteraktywny (-p) | 08 | 📕 Wyczerpany |
| Output JSON (--output-format) | 08 | 📗 Rozwinięcie |
| Wznawianie sesji (--continue, --resume) | 08 | 📗 Rozwinięcie |
| Piping danych | 08 | 📗 Rozwinięcie |
| Checkpoint Pattern | 08 | 📕 Wyczerpany |

### Claude Code w przeglądarce
| Temat | Lekcja | Głębokość |
|-------|--------|-----------|
| Dla kogo jest claude.ai/code | 09 | 📗 Rozwinięcie |
| Konfiguracja: GitHub OAuth | 09 | 📕 Wyczerpany |
| Instalacja Claude GitHub App | 09 | 📕 Wyczerpany |
| Konfiguracja środowiska | 09 | 📕 Wyczerpany |
| Dostęp do sieci | 09 | 📕 Wyczerpany |
| Zmienne środowiskowe | 09 | 📕 Wyczerpany |
| Sesja w WEB | 09 | 📗 Rozwinięcie |
| Diff View | 09 | 📕 Wyczerpany |
| Workflow z diff view | 09 | 📗 Rozwinięcie |
| Praktyczne przykłady | 09 | 📕 Wyczerpany |
| Ograniczenia sandbox | 09 | 📕 Wyczerpany |
| WEB vs CLI | 09 | 📕 Wyczerpany |
| Bezpieczeństwo WEB | 09 | 📗 Rozwinięcie |
| Konfiguracja terminala do WEB | 09 | 📗 Rozwinięcie |
| Teleportacja sesji | 09 | 📕 Wyczerpany |
| Typowe problemy WEB | 09 | 📗 Rozwinięcie |

### Wbudowane narzędzia (Moduł 02)
| Temat | Lekcja | Głębokość |
|-------|--------|-----------|
| Model + Prompt + Context + Tools | 10 | 📗 Rozwinięcie |
| Autopilot vs precyzyjne sterowanie | 10 | 📕 Wyczerpany |
| Jawne wywoływanie narzędzi | 10 | 📕 Wyczerpany |
| Kombinowanie narzędzi (LEGO patterns) | 10 | 📕 Wyczerpany |
| Case studies power users | 10 | 📕 Wyczerpany |
| Narzędzie Read | 10 | 📕 Wyczerpany |
| Narzędzie Write | 10 | 📕 Wyczerpany |
| Narzędzie Edit | 10 | 📕 Wyczerpany |
| Narzędzie NotebookEdit | 10 | 📕 Wyczerpany |
| Narzędzie Glob | 10 | 📕 Wyczerpany |
| Narzędzie Grep | 10 | 📕 Wyczerpany |
| Narzędzie Bash | 10 | 📕 Wyczerpany |
| Narzędzie mcp__ide__executeCode | 10 | 📕 Wyczerpany |
| Narzędzie WebFetch | 10 | 📕 Wyczerpany |
| Narzędzie WebSearch | 10 | 📕 Wyczerpany |
| Narzędzie Task i subagenty | 10 | 📕 Wyczerpany |
| Narzędzia zarządzania zadaniami | 10 | 📕 Wyczerpany |
| Narzędzia interakcji z użytkownikiem | 10 | 📕 Wyczerpany |
| Narzędzia trybu planowania | 10 | 📕 Wyczerpany |
| Timeout w Bash | 10, 15 | 📕 Wyczerpany |
| Multiline w Grep | 10 | 📕 Wyczerpany |
| Offset i Limit w Read | 10 | 📕 Wyczerpany |
| Output modes w Grep | 10 | 📕 Wyczerpany |
| Head_limit w Grep | 10 | 📕 Wyczerpany |
| Context lines w Grep (-A, -B, -C) | 10 | 📗 Rozwinięcie |
| Case insensitive search (-i) | 10 | 📗 Rozwinięcie |
| Glob patterns | 10 | 📗 Rozwinięcie |
| Formułowanie promptów zaawansowane | 10 | 📗 Rozwinięcie |
| Kontekst jako król | 10 | 📗 Rozwinięcie |
| Dobór modelu dla narzędzi | 10 | 📘 Podstawy |
| Terminal, Shell, Bash - podstawy | 15 | 📗 Rozwinięcie |
| Podstawowe komendy bash (ls, cd, pwd...) | 15 | 📗 Rozwinięcie |
| Operatory bash (&&, ;, \|\|) | 15 | 📕 Wyczerpany |
| Spacje w nazwach plików | 15 | 📕 Wyczerpany |
| Background execution | 15 | 📕 Wyczerpany |
| Równoległe wykonywanie komend | 15 | 📕 Wyczerpany |
| Automatyzacja z bash (8 przykładów) | 15 | 📕 Wyczerpany |
| Sandbox Mode szczegółowo | 15 | 📕 Wyczerpany |
| Escape hatch i excludedCommands | 15 | 📕 Wyczerpany |
| Production-grade Bash by Claude | 15 | 📕 Wyczerpany |

### Custom Slash Commands (Moduł 02 - część 2)
| Temat | Lekcja | Głębokość |
|-------|--------|-----------|
| Custom slash commands - czym są | 11 | 📕 Wyczerpany |
| Built-in commands (/help, /compact, /clear) | 11 | 📕 Wyczerpany |
| Tworzenie pierwszych custom commands | 11 | 📕 Wyczerpany |
| Argumenty: $ARGUMENTS | 11 | 📕 Wyczerpany |
| Argumenty: positional ($0, $1, $2) | 11 | 📕 Wyczerpany |
| Lokalizacja: personal vs project | 11 | 📕 Wyczerpany |
| Organizacja w subdirectories | 11 | 📕 Wyczerpany |
| Priority hierarchy (enterprise/project/personal) | 11 | 📕 Wyczerpany |
| Autocomplete dla slash commands | 11 | 📕 Wyczerpany |
| Hot reload mechanizm | 11 | 📕 Wyczerpany |
| Przykłady dla Developers (6 commands) | 11 | 📕 Wyczerpany |
| Przykłady dla Marketers (5 commands) | 11 | 📕 Wyczerpany |
| Przykłady dla Data Analysts (4 commands) | 11 | 📕 Wyczerpany |
| Przykłady dla HR/Admin (3 commands) | 11 | 📕 Wyczerpany |
| Przykłady dla Managers (2 commands) | 11 | 📕 Wyczerpany |
| Best practices tworzenia commands | 11 | 📕 Wyczerpany |
| Naming conventions | 11 | 📕 Wyczerpany |
| Troubleshooting custom commands | 11 | 📕 Wyczerpany |
| Multi-step workflows | 12 | 📕 Wyczerpany |
| Sequential tasks pattern | 12 | 📕 Wyczerpany |
| Parallel tasks pattern | 12 | 📕 Wyczerpany |
| Conditional workflows (if-then-else) | 12 | 📕 Wyczerpany |
| Loops pattern (FOR EACH) | 12 | 📕 Wyczerpany |
| Error recovery i rollback | 12 | 📕 Wyczerpany |
| Tool-specific optimizations | 12 | 📕 Wyczerpany |
| Read tool optimization (chunking) | 12 | 📕 Wyczerpany |
| Grep tool optimization (progressive) | 12 | 📕 Wyczerpany |
| WebSearch + WebFetch combo | 12 | 📕 Wyczerpany |
| Bash command patterns | 12 | 📕 Wyczerpany |
| Write vs Edit decision logic | 12 | 📕 Wyczerpany |
| Advanced argument handling | 12 | 📕 Wyczerpany |
| Optional arguments pattern | 12 | 📕 Wyczerpany |
| Flags pattern (--watch, --coverage) | 12 | 📕 Wyczerpany |
| Named arguments (key=value) | 12 | 📕 Wyczerpany |
| Multi-line arguments | 12 | 📕 Wyczerpany |
| Validation patterns | 12 | 📕 Wyczerpany |
| If-then-else patterns | 12 | 📕 Wyczerpany |
| Switch-case pattern | 12 | 📕 Wyczerpany |
| Nested conditions | 12 | 📕 Wyczerpany |
| Try-catch pattern | 12 | 📕 Wyczerpany |
| Validation cascade | 12 | 📕 Wyczerpany |
| Graceful degradation | 12 | 📕 Wyczerpany |
| Retry logic | 12 | 📕 Wyczerpany |
| Real-world: Feature development workflow | 12 | 📕 Wyczerpany |
| Real-world: Marketing campaign workflow | 12 | 📕 Wyczerpany |
| Real-world: Data pipeline workflow | 12 | 📕 Wyczerpany |
| Real-world: Team retrospective workflow | 12 | 📕 Wyczerpany |
| Production: Security patterns | 12 | 📕 Wyczerpany |
| Production: Sensitive data handling | 12 | 📕 Wyczerpany |
| Production: Destructive operation warnings | 12 | 📕 Wyczerpany |
| Production: Input validation | 12 | 📕 Wyczerpany |
| Production: Performance patterns | 12 | 📕 Wyczerpany |
| Production: Incremental processing | 12 | 📕 Wyczerpany |
| Production: Caching strategy | 12 | 📕 Wyczerpany |
| Production: Tool selection optimization | 12 | 📕 Wyczerpany |
| Production: Idempotency | 12 | 📕 Wyczerpany |
| Production: Atomicity | 12 | 📕 Wyczerpany |
| Production: Logging i audit trail | 12 | 📕 Wyczerpany |
| Production: Team collaboration patterns | 12 | 📕 Wyczerpany |
| Optimization: Token optimization | 12 | 📕 Wyczerpany |
| Optimization: Lazy loading | 12 | 📕 Wyczerpany |
| Optimization: Progressive detail | 12 | 📕 Wyczerpany |
| Optimization: Execution speed | 12 | 📕 Wyczerpany |
| Optimization: Fast-fail pattern | 12 | 📕 Wyczerpany |
| Optimization: Background operations | 12 | 📕 Wyczerpany |
| Optimization: Progress indicators | 12 | 📕 Wyczerpany |
| Optimization: Incremental results | 12 | 📕 Wyczerpany |
| Optimization: Helpful error messages | 12 | 📕 Wyczerpany |

### Slash Commands
| Komenda | Lekcja | Głębokość |
|---------|--------|-----------|
| /cost, /usage, /stats | 03 | 📕 Wyczerpany |
| /compact, /context, /clear | 03 | 📕 Wyczerpany |
| /sandbox | 06 | 📕 Wyczerpany |
| /terminal-setup | 04 | 📕 Wyczerpany |
| /statusline | 04 | 📗 Rozwinięcie |
| /init | 07 | 📗 Rozwinięcie |
| /memory | 07 | 📗 Rozwinięcie |
| /resume | 08 | 📕 Wyczerpany |
| /rename | 08 | 📗 Rozwinięcie |
| /export | 08 | 📕 Wyczerpany |
| /teleport | 08 | 📗 Rozwinięcie |
| /tasks | 08 | 📗 Rozwinięcie |
| /doctor | 02 | 📗 Rozwinięcie |
| /permissions | 06 | 📗 Rozwinięcie |
| /login, /logout | 03 | 📗 Rozwinięcie |
| /help | - | 📘 Podstawy |
| /version | - | 📘 Podstawy |
| /remote-env | 09 | 📗 Rozwinięcie |
| /tp | 09 | 📕 Wyczerpany |

### Tryby pracy i uprawnienia
| Temat | Lekcja | Głębokość |
|-------|--------|-----------|
| Tryby uprawnień (default, acceptEdits, plan, bypassPermissions) | 06 | 📕 Wyczerpany |
| Przełączanie trybów (Shift+Tab) | 04 | 📘 Podstawy |

### Zarządzanie kontekstem i kosztami
| Temat | Lekcja | Głębokość |
|-------|--------|-----------|
| Zarządzanie kontekstem | 03 | 📗 Rozwinięcie |

### Narzędzia i integracje
| Temat | Lekcja | Głębokość |
|-------|--------|-----------|
| Aliasy i skróty shellowe | 02 | 📗 Rozwinięcie |
| VS Code Extension | 05 | 📕 Wyczerpany |
| JetBrains Plugin | 05 | 📕 Wyczerpany |
| ccstatusline | 04 | 📗 Rozwinięcie |

---

## Tematy do omówienia w przyszłych modułach

### Moduł 2: Wbudowane narzędzia (Tools) - W TRAKCIE 🔄
**Ukończone (Lekcja 10):**
- Read, Write, Edit - pełny opis parametrów ✅
- Grep, Glob - wszystkie parametry, output modes ✅
- Bash tool - timeout, background execution ✅
- WebFetch, WebSearch - kompletny przegląd ✅
- Task management - wszystkie narzędzia TaskCreate/Update/List/Get/Output/Stop ✅
- Autopilot vs precyzyjne sterowanie - case studies ✅

**Ukończone (Lekcja 11):**
- Custom slash commands - podstawy ✅
- Built-in commands (/help, /compact, /clear, /init, /config, /permissions) ✅
- Tworzenie pierwszych custom commands (4 przykłady) ✅
- Argumenty ($ARGUMENTS, $0, $1, $2) ✅
- Lokalizacja (personal vs project, organizacja) ✅
- Przykłady dla 6 zawodów (Developer, Marketer, Analyst, HR, Manager) ✅
- Autocomplete & hot reload ✅
- Best practices & troubleshooting ✅

**Ukończone (Lekcja 12):**
- Multi-step workflows (sequential, parallel, conditional, loops) ✅
- Tool-specific optimizations (Read, Grep, WebSearch, Bash) ✅
- Advanced argument handling (optional, flags, named, validation) ✅
- Conditional logic & branching (if-then-else, switch-case, nested) ✅
- Error handling patterns (try-catch, validation cascade, graceful degradation, retry) ✅
- Real-world workflows (4 kompleksowe: feature dev, marketing campaign, data pipeline, team retro) ✅
- Production best practices (security, performance, reliability, team collaboration) ✅
- Optimization techniques (token, execution speed, UX) ✅

**Ukończone (Lekcja 13):**
- Hooks basics - czym są, dlaczego deterministyczne ✅
- Architektura hooka (Event, Matcher, Action) ✅
- Lokalizacja (user vs project hooks) ✅
- Konfiguracja przez /hooks ✅
- Notification hook (desktop notifications) ✅
- PostToolUse formatowanie (prettier, black, gofmt) ✅
- PreToolUse logging (bash command log) ✅
- jq basics (parsing JSON w hookach) ✅
- Exit codes (0 = allow, 2 = block) ✅
- Bezpieczeństwo hooków (NIGDY nie kopiuj bez zrozumienia) ✅
- Kiedy hooks vs prompts ✅

**Ukończone (Lekcja 14):**
- Hook Input/Output JSON format ✅
- jq zaawansowane techniki ✅
- Exit codes zaawansowane (per event behavior) ✅
- set -euo pipefail best practice ✅
- NOWA składnia PreToolUse (2.1.9+: hookSpecificOutput.permissionDecision) ✅
- PreToolUse security gate (blokowanie rm/sudo/.env) ✅
- Prompt injection vs hooks (OWASP 2025, Google Jules) ✅
- SessionStart context injection (git logs, Jira tickets) ✅
- additionalContext mechanism ✅
- PostToolUse audit logging (ISO 27001, HIPAA, GDPR, SOC 2) ✅
- WORM storage dla compliance ✅
- Routing Layer analogy (hooki jako control plane) ✅
- Multi-layer defense ✅

**Ukończone (Lekcja 15):**
- Terminal, Shell, Bash - podstawy dla początkujących ✅
- Anatomia komendy bash (komenda, opcje, argumenty) ✅
- Podstawowe komendy (ls, cd, pwd, mkdir, rm, cp, mv, cat, grep, echo) ✅
- Ścieżki absolutne vs relatywne ✅
- Claude jako operator terminala - wykrywanie kontekstu ✅
- Timeout i background execution - szczegółowo ✅
- Spacje w nazwach plików - cytowanie automatyczne ✅
- Operatory bash (&&, ;, ||) - wszystkie przypadki użycia ✅
- Równoległe wykonywanie komend ✅
- 8 praktycznych przykładów automatyzacji (backupy, raporty, batch processing, monitoring, marketing, PM, pisarz, HR) ✅
- Sandbox Mode - szczegółowy opis izolacji ✅
- Escape hatch i excludedCommands ✅
- Production-grade Bash by Claude ✅
- Pro-tipy (dry-run, verbose, exit codes) ✅

**Do omówienia w kolejnych modułach:**
- Git integration - zaawansowane workflow (commit, branch, merge, PR)
- Task i subagenty - szczegółowo dla każdego typu (Explore, Plan, general-purpose)
- NotebookEdit - zaawansowana praca z Jupyter
- mcp__ide__ narzędzia - głębsza integracja z IDE
- Prompt-based hooks (type: "prompt" dla Stop/SubagentStop)
- PermissionRequest hooks (auto-allow/deny permissions)
- Hooks w Skills/Agents/Commands (component-scoped hooks)

### Moduł 3: Bezpieczeństwo zaawansowane
- Managed Settings dla organizacji
- IAM zaawansowane
- Enterprise telemetry (OpenTelemetry integration)
- Compliance patterns dla regulated industries

### Moduł 4: Slash Commands zaawansowane
- Tworzenie własnych slash commands
- Template prompts
- Skills - kompleksowe możliwości
- Marketplace

### Moduł 5: Integracje IDE
- VS Code Extension - zaawansowane funkcje
- JetBrains - szczegółowo
- Web interface
- Mobile access

### Moduł 6: MCP (Model Context Protocol)
- Co to jest MCP
- Integracja z zewnętrznymi narzędziami
- Własne MCP servery
- Puppeteer, bazy danych, custom tools

### Moduł 7: Hooks
- System eventów
- Typy hooków
- Własne skrypty
- Walidacja i automatyzacja

### Moduł 8: Advanced Patterns
- Multi-projekt workflow
- Cross-language development
- Microservices management
- CI/CD integration

---

**Data aktualizacji:** 2026-02-16
**Źródło:** Analiza lekcji z modułu-01-podstawy (00-09) + moduł-02-wbudowane-narzedzia (10-15)
**Status lekcji:** Moduł 01 (Lekcje 00-09) ✅ | Moduł 02 (Lekcje 10-15) 🔄
