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
| Sandbox Mode | 06 | 📕 Wyczerpany |
| Tryby uprawnień (4 tryby) | 06 | 📕 Wyczerpany |
| Zagrożenia bezpieczeństwa | 06 | 📕 Wyczerpany |
| .gitignore | 06 | 📕 Wyczerpany |
| Dobre praktyki bezpieczeństwa | 06 | 📕 Wyczerpany |
| Własny Sandbox | 06 | 📗 Rozwinięcie |
| Sandbox limitations | 06 | 📗 Rozwinięcie |

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

### Moduł 2: Wbudowane narzędzia (Tools)
- Read, Write, Edit - szczegółowo
- Bash tool - zaawansowane użycie
- Grep, Glob - power user
- Git integration - workflow
- Task management

### Moduł 3: Bezpieczeństwo zaawansowane
- Hooks - system do walidacji (wspomniany w L06)
- Managed Settings dla organizacji
- IAM zaawansowane
- Pre-tool use hooks
- Przykłady własnych hooków

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

**Data aktualizacji:** 2026-01-25
**Źródło:** Analiza 9 lekcji z modułu-01-podstawy (00-08)
**Status lekcji:** Lekcje 00-08 ✅
