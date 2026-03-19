---
lesson: "04.01"
title: "Settings — pełna kontrola nad zachowaniem agenta"
description: "Cztery poziomy konfiguracji, hierarchia nadpisywania, managed settings i debugowanie ustawień Claude Code"
module: "04-finish"
---

# Settings — pełna kontrola nad zachowaniem agenta

Marta wraca z urlopu. Otwiera Claude Code w projekcie analitycznym i widzi, że coś się zmieniło. Claude pyta o zgodę na każdą edycję pliku — nawet na zapis wyników do CSV. Tydzień temu tego nie było.

— Kto przestawił mi uprawnienia? — pyta Pawła.

— Nikt Ci ich nie przestawił — odpowiada Paweł. — DevOps wdrożył managed settings dla całej firmy. Twoje osobiste ustawienia zostały nadpisane przez politykę organizacji.

— Czyli ktoś mną steruje zdalnie?

— Nie zdalnie. Lokalnie, ale z priorytetem wyższym niż Twój. I właśnie dlatego musisz rozumieć, jak działa hierarchia ustawień.

Karina słucha z boku.

— Ja mam odwrotny problem. Ustawiłam sobie `bypassPermissions` w projekcie testowym i zapomniałam. Teraz Claude robi wszystko bez pytania — nawet w produkcyjnym repo.

— To idealny moment na tę lekcję — mówi Paweł.

> **Moduł:** Finał
> **Poziom:** Średniozaawansowany
> **Czas:** 25--35 minut

## Co wyniesiesz z tej lekcji

- Znasz cztery zakresy konfiguracji (managed, user, project, local) i wiesz, który wygrywa.
- Rozumiesz, jak organizacja kontroluje Claude Code przez managed settings.
- Potrafisz skonfigurować uprawnienia, model, effort level i inne ustawienia.
- Wiesz, jak debugować problemy z konfiguracją za pomocą `/config` i zmiennych środowiskowych.
- Rozumiesz, kiedy i po co używać effort levels.

---

## 1. Cztery zakresy — kto tu rządzi

Claude Code ma cztery poziomy konfiguracji. Każdy ma inne przeznaczenie i inny priorytet.

### Managed (najwyższy priorytet)

Ustawienia zarządzane przez organizację. Wdrażane przez IT — Ty ich nie edytujesz.

Gdzie żyją:
- **macOS**: plist w `/Library/Application Support/ClaudeCode/managed-settings.json` lub przez MDM (Jamf, Kandji)
- **Windows**: rejestr systemowy lub plik managed-settings.json
- **Serwer**: ustawienia dostarczane przez serwer autoryzacji (OAuth)

Typowe zastosowania: wymuszanie sandboxa, blokowanie `bypassPermissions`, ograniczanie dostępnych modeli, wymuszanie pluginów z firmowego marketplace.

### User (osobiste)

Twoje osobiste ustawienia, które działają we wszystkich projektach.

Plik: `~/.claude/settings.json`

Typowe zastosowania: preferowany model, tryb uprawnień, osobiste hooki, konfiguracja MCP.

### Project (zespołowe)

Ustawienia dla konkretnego repozytorium. Commitowane do Gita — cały zespół je współdzieli.

Plik: `.claude/settings.json` (w katalogu projektu)

Typowe zastosowania: hooki specyficzne dla projektu, reguły uprawnień, konfiguracja pluginów.

### Local (prywatne w projekcie)

Twoje osobiste ustawienia dla tego jednego projektu. Nie trafiają do Gita.

Plik: `.claude/settings.local.json`

Typowe zastosowania: nadpisanie trybu uprawnień w tym jednym repo, lokalne zmienne środowiskowe, testowe konfiguracje.

### Hierarchia: co wygrywa

Bardziej szczegółowy zakres wygrywa z mniej szczegółowym:

**Managed > CLI args > Local > Project > User**

1. **Managed** (najwyższy) — nie do nadpisania przez nic innego
2. **CLI args** (`--model`, `--effort` itp.) — tymczasowe nadpisania sesji
3. **Local** — Twoje prywatne ustawienia w tym projekcie
4. **Project** — współdzielone ustawienia zespołu
5. **User** (najniższy) — obowiązują, gdy nic bardziej szczegółowego nie ustawia wartości

Ale uwaga — to nie jest zwykłe nadpisywanie. Reguły zależą od typu ustawienia:

- **Listy (np. `permissions.allow`)**: łączą się ze wszystkich poziomów. Jeśli masz `allow: ["Read"]` w user i `allow: ["Edit"]` w project, dostaniesz oba.
- **Wartości skalarne (np. `model`)**: wygrywa najwyższy priorytet, który ustawił wartość.
- **Reguły deny**: jeśli narzędzie jest zablokowane na dowolnym poziomie, żaden inny poziom nie może go odblokować.
- **Managed settings**: zawsze wygrywają i nie mogą być nadpisane niżej.

Marta:

— Czyli jeśli firma wymusi `permissions.disableBypassPermissionsMode: "disable"`, to ja nie mogę sobie włączyć `bypassPermissions`?

— Dokładnie — potwierdza Paweł. — Managed settings to reguły, nie sugestie.

---

## 2. Co możesz skonfigurować — przegląd ustawień

### Uprawnienia

```json
{
  "permissions": {
    "allow": [
      "Read",
      "Glob",
      "Grep",
      "Bash(git status *)",
      "Bash(npm test *)"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(sudo *)",
      "Agent(Explore)"
    ],
    "defaultMode": "default"
  }
}
```

Pole `defaultMode` określa, w jakim trybie uprawnień startuje sesja:
- `"default"` — standardowe pytania o zgodę przy pierwszym użyciu narzędzia
- `"acceptEdits"` — automatyczne zatwierdzanie edycji plików
- `"plan"` — tryb planowania (Claude analizuje, ale nie modyfikuje plików ani nie uruchamia komend)
- `"dontAsk"` — automatycznie odrzuca narzędzia, chyba że mają regułę `allow` w `/permissions`
- `"bypassPermissions"` — pomija wszystkie pytania (wymaga świadomej decyzji, używaj tylko w izolowanych środowiskach)

Pole `disableBypassPermissionsMode` (string) — ustaw na `"disable"`, żeby zablokować tryb bypass i flagę `--dangerously-skip-permissions`. Idealne dla managed settings.

### Reguły uprawnień — składnia

Składnia `allow` i `deny` obsługuje wzorce:

- `"Bash(git diff *)"` — dopuszcza każdą komendę zaczynającą się od `git diff` (spacja przed `*` jest istotna)
- `"Edit"` — dopuszcza każde użycie narzędzia Edit
- `"Agent(worker)"` — dopuszcza uruchamianie subagenta typu `worker`
- `"mcp__github__*"` — dopuszcza wszystkie narzędzia MCP z serwera GitHub

### Model

```json
{
  "model": "sonnet"
}
```

Dostępne aliasy: `sonnet`, `opus`, `haiku`, `opusplan` (Opus do planowania, Sonnet do wykonania), `default` (zależy od Twojego planu).

Możesz też podać pełną nazwę modelu: `"claude-opus-4-6"`, `"claude-sonnet-4-6"`.

### Ograniczanie dostępnych modeli

```json
{
  "availableModels": ["sonnet", "haiku"]
}
```

Użytkownicy nie mogą przełączyć się na model spoza listy. Przydatne w managed settings do kontroli kosztów.

### Effort level

```json
{
  "effortLevel": "medium"
}
```

Effort level kontroluje, ile "myślenia" Claude wkłada w odpowiedź:

- **low** — szybkie, tanie odpowiedzi. Dobre do prostych pytań i rutynowych operacji.
- **medium** — domyślny balans między jakością a kosztem. Domyślny poziom.
- **high** — głębsze rozumowanie. Dla złożonych decyzji architektonicznych, trudnych bugów.
- **max** — bez limitu tokenów na myślenie. Tylko Opus 4.6, tylko w bieżącej sesji, nie zapisuje się.

Zmienisz effort level na kilka sposobów:
- `/effort low` / `/effort medium` / `/effort high` / `/effort max` w sesji
- Suwak w `/model` (strzałki lewo/prawo)
- Flaga `--effort medium` przy starcie
- Zmienna `CLAUDE_CODE_EFFORT_LEVEL`

Olek pyta:

— Jak to wpływa na koszty?

— Bezpośrednio — odpowiada Paweł. — Low zużywa mniej tokenów na myślenie, high więcej. Na prostych zadaniach low jest wystarczający i 3-4 razy tańszy. Na skomplikowanym refactoringu high się opłaca, bo Claude popełni mniej błędów i nie będziesz musiał powtarzać.

### Sandbox

```json
{
  "sandbox": {
    "enableWeakerNetworkIsolation": true
  }
}
```

Flaga `enableWeakerNetworkIsolation` osłabia izolację sieciową sandboxa. Przydatne, gdy Twoje narzędzia potrzebują dostępu do sieci (np. `npm install` z prywatnego registry). Domyślnie sandbox blokuje połączenia wychodzące.

### Zmienne środowiskowe

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1",
    "CLAUDE_CODE_DISABLE_CRON": "1",
    "ENABLE_TOOL_SEARCH": "auto:5"
  }
}
```

Możesz ustawiać zmienne środowiskowe przez settings — przydatne, gdy nie chcesz modyfikować `.bashrc`.

### Inne przydatne ustawienia

- `attribution` — konfiguruje atrybucję w commitach i PR-ach (np. `{"commit": "🤖 Generated with Claude Code", "pr": ""}`)
- `includeCoAuthoredBy` (boolean) — **deprecated**, używaj `attribution`. Dodaje `Co-Authored-By: Claude` do commitów
- `teammateMode` — tryb wyświetlania Agent Teams: `"in-process"`, `"tmux"`, `"auto"`
- `cleanupPeriodDays` — po ilu dniach czyścić stare transkrypty sesji (domyślnie 30)
- `language` — język odpowiedzi Claude'a (np. `"polish"`, `"japanese"`)

Uwaga: motyw kolorystyczny (`theme`) i inne preferencje wizualne żyją w `~/.claude.json`, nie w `settings.json`.

---

## 3. Managed settings — jak firma kontroluje Claude Code

Wyobraź sobie, że jesteś administratorem IT w firmie z 200 programistami. Chcesz:

1. Wymusić sandbox dla wszystkich
2. Zablokować `bypassPermissions`
3. Ograniczyć modele do Sonneta (kontrola kosztów)
4. Wymusić instalację firmowego pluginu z marketplace

Oto jak wygląda taki plik managed-settings.json:

```json
{
  "permissions": {
    "defaultMode": "default",
    "disableBypassPermissionsMode": "disable"
  },
  "availableModels": ["sonnet", "haiku"],
  "model": "sonnet"
}
```

### Dystrybucja managed settings

Na macOS możesz użyć MDM (Jamf, Kandji) do wdrożenia pliku plist. Na Windowsie — rejestru systemowego. Dla organizacji korzystających z OAuth — serwer autoryzacji dostarcza ustawienia.

Najważniejsze: użytkownik nie może nadpisać managed settings. Nawet jeśli wpisze `"model": "opus"` w swoim `~/.claude/settings.json`, managed settings wygrają.

### Kontrola pluginów

```json
{
  "pluginTrustMessage": "Tylko pluginy z firmowego marketplace są dozwolone. Kontakt: devtools@firma.com",
  "strictKnownMarketplaces": [
    {
      "source": "github",
      "repo": "firma/claude-plugins"
    }
  ],
  "extraKnownMarketplaces": {
    "firma-marketplace": {
      "source": {
        "source": "github",
        "repo": "firma/claude-plugins"
      }
    }
  }
}
```

- `pluginTrustMessage` — wiadomość wyświetlana przy instalacji pluginów. Informuje użytkownika o polityce firmy.
- `strictKnownMarketplaces` — tablica dozwolonych źródeł marketplace'ów. Pusta tablica `[]` blokuje dodawanie jakichkolwiek marketplace'ów. Brak klucza = brak ograniczeń.
- `extraKnownMarketplaces` — marketplace'y, które automatycznie pojawiają się użytkownikom (np. po zaufaniu projektowi). Przydatne w parze ze `strictKnownMarketplaces`.
- `blockedMarketplaces` — tablica zablokowanych źródeł (sprawdzane przed pobraniem, nigdy nie trafiają na dysk).

Karina:

— Czyli firma może mi narzucić konkretne pluginy i zablokować instalację cudzych?

— Tak — mówi Paweł. — To ten sam model co polityki bezpieczeństwa w przeglądarkach. IT ustala reguły, Ty pracujesz w ich ramach.

---

## 4. Debugowanie konfiguracji

Coś nie działa tak, jak chcesz? Oto Twoje narzędzia diagnostyczne.

### /config

Wpisz `/config` w sesji Claude Code. Otworzy się interaktywny interfejs z zakładkami, który pokazuje:
- Aktualnie obowiązujące ustawienia
- Skąd pochodzą (który plik)
- Co jest zablokowane przez managed settings

### /status

Wpisz `/status`, żeby zobaczyć:
- Aktualny model
- Tryb uprawnień
- Informacje o koncie i limicie

### /context

Wpisz `/context`, żeby zobaczyć, co zajmuje okno kontekstowe — w tym załadowane pluginy, skille i narzędzia MCP.

### Zmienne środowiskowe diagnostyczne

Kilka zmiennych, które pomagają w debugowaniu:

```bash
# Wymuś konkretny model (nadpisuje settings)
export ANTHROPIC_MODEL="sonnet"

# Wymuś effort level
export CLAUDE_CODE_EFFORT_LEVEL="low"

# Wyłącz agent teams
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS="0"

# Wyłącz cron
export CLAUDE_CODE_DISABLE_CRON="1"

# Wyłącz background tasks
export CLAUDE_CODE_DISABLE_BACKGROUND_TASKS="1"

# Wyłącz 1M kontekst
export CLAUDE_CODE_DISABLE_1M_CONTEXT="1"
```

### Kolejność priorytetów dla modelu

Jeśli model jest ustawiony w wielu miejscach, wygrywa (od najwyższego priorytetu):

1. Managed settings (nie do nadpisania)
2. `/model` w trakcie sesji
3. `--model` przy starcie
4. `ANTHROPIC_MODEL` (zmienna środowiskowa)
5. `model` w settings.json (local > project > user)
6. Domyślny dla Twojego planu

Marta:

— A jak sprawdzę, który model faktycznie się używa?

— Wpisz `/status` — odpowiada Paweł. — Albo skonfiguruj statusline (`/statusline`), żeby model był widoczny cały czas.

### Typowe problemy i rozwiązania

**"Claude nie używa modelu, który ustawiłem"**

Sprawdź kolejność priorytetów. Jeśli ustawiłeś model w `settings.json`, ale ktoś eksportował `ANTHROPIC_MODEL` w `.bashrc` — zmienna środowiskowa wygrywa. Użyj `/status`, żeby zobaczyć aktywny model, a potem szukaj źródła konfliktu.

**"Mam allow na Bash(npm test *), ale Claude i tak pyta o zgodę"**

Reguły `allow` i `deny` łączą się ze wszystkich poziomów. Jeśli na poziomie project masz `deny: ["Bash(npm *)"]`, to blokada wygrywa — nawet jeśli na poziomie user masz `allow`. Sprawdź `/config` i szukaj sprzecznych reguł na różnych poziomach.

**"Kolega ma inne ustawienia w tym samym repo"**

Prawdopodobnie ma inne `~/.claude/settings.json` (user scope) albo `.claude/settings.local.json` (local scope). Pliki `settings.local.json` nie trafiają do Gita — każdy ma swoje. Jeśli chcesz wymusić wspólne ustawienia dla zespołu, użyj `.claude/settings.json` (project scope) i scommituj go.

**"Managed settings zablokowały mi funkcję, której potrzebuję"**

Managed settings nadpisują wszystko. Nie obejdziesz ich lokalnie. Skontaktuj się z IT/DevOps — to oni zarządzają plikiem managed-settings.json. Jeśli korzystacie z OAuth, ustawienia mogą pochodzić z serwera autoryzacji.

---

## 5. Praktyczne scenariusze konfiguracji

### Scenariusz 1: Analityczka danych (Marta)

Marta pracuje z danymi i chce, żeby Claude automatycznie zatwierdzał edycje plików, ale nie pozwalał na niebezpieczne komendy bash.

Plik `~/.claude/settings.json`:

```json
{
  "permissions": {
    "defaultMode": "acceptEdits",
    "allow": [
      "Read",
      "Bash(python *)",
      "Bash(pip install *)",
      "Bash(jupyter *)"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(sudo *)"
    ]
  },
  "model": "sonnet",
  "effortLevel": "medium"
}
```

### Scenariusz 2: Programistka frontend (Karina)

Karina chce Opusa do planowania i Sonneta do pisania kodu. W projekcie testowym chce mieć luźniejsze uprawnienia.

Plik `~/.claude/settings.json`:

```json
{
  "model": "opusplan",
  "effortLevel": "high"
}
```

Plik `.claude/settings.local.json` (tylko w testowym projekcie):

```json
{
  "permissions": {
    "defaultMode": "bypassPermissions"
  }
}
```

### Scenariusz 3: PM (Olek) — minimalna konfiguracja

Olek pisze raporty i prezentacje. Nie potrzebuje Opusa ani zaawansowanych uprawnień.

Plik `~/.claude/settings.json`:

```json
{
  "model": "sonnet",
  "effortLevel": "low"
}
```

Low effort wystarczy do generowania tekstu — Claude będzie szybszy i tańszy. Jeśli Olek trafi na zadanie wymagające głębszej analizy (np. porównanie trzech CRM-ów), może tymczasowo przełączyć na `/effort high` i wrócić do low po zakończeniu.

Olek:

— Czyli mogę zmieniać effort level w trakcie sesji? Nie muszę restartować?

— Nie musisz — odpowiada Paweł. — `/effort low` działa natychmiast. Następna wiadomość już będzie przetwarzana z mniejszym budżetem na myślenie.

---

## 6. Prompt caching — niewidoczna oszczędność

Claude Code automatycznie cachuje niezmienione fragmenty kontekstu (system prompt, CLAUDE.md, skille) między wiadomościami. Efekt: do 90% redukcji kosztów na powtarzalnym kontekście. Nie musisz nic konfigurować — działa automatycznie.

Więcej o prompt caching, kompresji kontekstu i innych technikach optymalizacji — w lekcji 05 tego modułu.

---

## Słowniczek

**Scope (zakres)** — poziom konfiguracji określający, gdzie ustawienia obowiązują i kto je widzi. Claude Code ma cztery zakresy: managed, user, project, local.

**Managed settings** — ustawienia wdrażane przez organizację (IT/DevOps), które mają najwyższy priorytet i nie mogą być nadpisane przez użytkownika. Dystrybuowane przez MDM (macOS), rejestr (Windows) lub serwer OAuth.

**Effort level** — poziom "wysiłku intelektualnego" Claude'a. Kontroluje, ile tokenów przeznaczonych jest na rozumowanie (thinking). W settings.json: low, medium, high. W sesji dodatkowo dostępny `max` (przez `/effort max`).

**Prompt caching** — mechanizm optymalizacji, w którym niezmienione fragmenty kontekstu (system prompt, CLAUDE.md) są cachowane między wiadomościami. Redukuje koszty do 90% na powtarzalnym kontekście.

**Sandbox** — mechanizm izolacji, który ogranicza dostęp Claude Code do systemu plików i sieci. Domyślnie włączony.

**`opusplan`** — specjalny alias modelu, który używa Opusa w trybie planowania, a automatycznie przełącza się na Sonneta przy implementacji. Daje lepsze planowanie przy niższych kosztach wykonania.

**MDM (Mobile Device Management)** — narzędzia do zarządzania urządzeniami w organizacji (np. Jamf, Kandji na macOS). Pozwalają dystrybuować konfigurację na komputery pracowników.

---

## Dokumentacja

- Ustawienia Claude Code: https://code.claude.com/docs/en/settings
- Konfiguracja modelu: https://code.claude.com/docs/en/model-config
- Zarządzanie kosztami: https://code.claude.com/docs/en/costs
- Zmienne środowiskowe: https://code.claude.com/docs/en/env-vars

---

*W następnej lekcji: zapakujesz swoje skille, hooki i agenty w plugin — i nauczysz się, jak dzielić się nimi z zespołem i całym światem.*
