# Moduł 4 — Tematy zaawansowane

## Kontekst

Moduł zamykający kurs. Uczestnik zna już REPL, narzędzia, hooki, MCP i skille. Moduł 4 otwiera tematy, które zmieniają skalę użycia — od konfiguracji, przez automatyzację CI/CD, po orkiestrację wielu agentów.

Pluginy celowo trafiają tutaj (a nie jako rozszerzenie M3/005), bo wymagają wiedzy o skillach, hookach i komendach jednocześnie — dopiero teraz uczestnik ma pełny obraz.

---

## Lekcja 01 — Settings: pełna kontrola nad zachowaniem agenta

Temat, którego brakowało — settings.json to fundament świadomego używania Claude Code, a dotychczas pojawiał się tylko fragmentarycznie.

Tematy:
- Trzy poziomy konfiguracji: user (`~/.claude/settings.json`), project (`.claude/settings.json`), enterprise (managed settings)
- Hierarchia i nadpisywanie — co wygrywa, co jest wymuszane
- Managed settings: macOS plist, Windows Registry — jak organizacja kontroluje Claude Code
- Przegląd kluczowych ustawień:
  - `permissions.defaultMode`, `permissions.disableBypassPermissionsMode`
  - `sandbox.enableWeakerNetworkIsolation`
  - `includeGitInstructions`
  - `CLAUDE_CODE_DISABLE_CRON`
  - `ENABLE_CLAUDEAI_MCP_SERVERS`
  - `oauth.authServerMetadataUrl`
  - `strictKnownMarketplaces` z `pathPattern` regex
- Effort levels (low/medium/high) i ich wpływ na jakość, koszt, szybkość
- Jak debugować konfigurację — `/config`, zmienne środowiskowe

---

## Lekcja 02 — Pluginy: od skilla do paczki

M3/005 opisuje czym jest plugin i jak go zainstalować. Ta lekcja prowadzi krok po kroku przez **tworzenie własnego pluginu** — od pomysłu do dystrybucji.

Tematy:
- Czym plugin różni się od skilla — plugin to kontener (skille + komendy + agenty + hooki)
- Anatomy of `plugin.json` — manifest, metadata, wersjonowanie
- Hands-on: zapakowanie istniejącego skilla w plugin
- Dodawanie komend i hooków do pluginu
- Namespace pluginów — jak unikać kolizji nazw
- Źródła instalacji: marketplace, `git-subdir`, lokalne
- `/plugin install`, `/reload-plugins`
- `pluginTrustMessage` — kontekst organizacyjny
- Publikacja pluginu — co trzeba przygotować, licencja, README
- Bezpieczeństwo ekosystemu pluginów — review cudzych pluginów, zaufane źródła

---

## Lekcja 03 — Tryb nieinteraktywny i CI/CD

Zupełnie inny paradygmat niż REPL — Claude Code jako element pipeline'u. Otwiera automatyzację na dużą skalę.

Tematy:
- `claude -p "..."` — jednorazowe wywołania bez sesji interaktywnej
- Potoki Unix — stdin/stdout, integracja z `jq`, `grep`, skryptami
- `--append-system-prompt-file` — dodatkowy kontekst z pliku
- Integracja z GitHub Actions — przykładowy workflow
- Remote Control (`claude remote-control`) — sterowanie sesją z zewnętrznych narzędzi
- `/loop` + cron scheduling — powtarzalne zadania (monitoring, CI checks)
- `CLAUDE_CODE_DISABLE_CRON` — kontrola nad zadaniami cron
- Account info env vars dla SDK callers
- Praktyczny przykład: automatyczny code review na PR, generowanie changelogów, monitoring

---

## Lekcja 04 — Agent Teams: orkiestracja wielu agentów

Subagenty (M2/004-005) to delegowanie zadań w jednej sesji. Agent Teams to osobny paradygmat — wiele instancji Claude Code współpracujących ze sobą.

Tematy:
- Czym Agent Teams różni się od subagentów — komunikacja, izolacja, model mentalny
- Architektura: lider + członkowie zespołu, `SendMessage`, `TeamCreate`
- Dziedziczenie modelu — team agents dziedziczą model lidera, override per-agent
- Kiedy Teams, a kiedy subagenty — kryteria decyzji
- Praktyczne scenariusze: równoległy refactoring, multi-repo zmiany, podział frontend/backend
- Redukcja token usage w multi-agent scenariuszach
- Pułapki: nested teammates, payload stripping, limity

---

## Lekcja 05 — Voice Mode, performance i podsumowanie kursu

Lekcja zamykająca — dwa praktyczne tematy + retrospektywa całego kursu.

Tematy:
- **Voice Mode**
  - Push-to-talk, konfiguracja, rebindowanie klawiszy
  - 20 języków STT, transkrypcja terminów developerskich
  - Scenariusze: code review głosem, pair programming, dłuższe interakcje
- **Performance i długie sesje**
  - Jak Claude Code zarządza pamięcią — prompt cache, kompresja kontekstu
  - Optymalizacja kosztów (do 12x redukcja z cache)
  - Deferred tool loading
  - Tips dla power users: kiedy zaczynać nową sesję, jak unikać degradacji
- **Podsumowanie kursu**
  - Mapa kompetencji — co uczestnik umie po każdym module
  - Od chatbota do autonomicznego asystenta — zmiana mentalnego modelu
  - Co dalej — śledzenie zmian, community, własne eksperymenty

---

## Uwagi

- Aktualizacje istniejących lekcji (M1-M3) z finish.md realizowane osobno, nie w ramach tego modułu
- Kolejność lekcji jest logiczna: Settings → Pluginy → CI/CD → Teams → Finał (każda buduje na poprzednich)
- Voice Mode i Performance jako jedna lekcja — oba tematy są ważne, ale żaden nie ciągnie na pełną lekcję samodzielnie
