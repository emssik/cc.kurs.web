---
lesson: "02.11"
title: "MCP Part 3 - Konfiguracja i Optymalizacja"
description: "Hierarchia konfiguracji, zarządzanie serwerami, MCP Tax i troubleshooting zaawansowany"
module: "02-wbudowane-narzedzia"
---

# MCP Part 3 - Konfiguracja i Optymalizacja

Karina wraca po weekendzie. Ma już 5 serwerów MCP działających w Claude Code: GitHub, PostgreSQL, filesystem, Slack i Google Calendar.

— Działa jak marzenie — mówi do Pawła. — Claude sam pobiera dane z bazy, tworzy issues w GitHubie, synchronizuje spotkania.

Paweł patrzy na jej ekran i marszczy brwi.

— Ile to jest serwerów? Pięć?

— Tak, dlaczego?

— Sprawdź `/context`.

Karina wpisuje komendę. Wynik:

```
Context Window Usage: 87%
Tools loaded: 47 tools (5,234 tokens)
Files in context: 3 (1,245 tokens)
Conversation: 28 messages (15,421 tokens)
```

— 87%?! — dziwi się Karina. — Ale ja dopiero co zaczęłam!

— To się nazywa podatek kontekstowy, "MCP Tax" — mówi Paweł. — Każde narzędzie zjada tokeny, nawet jeśli go nie używasz. 47 narzędzi to kilka tysięcy tokenów zanim jeszcze powiesz pierwsze słowo.

— Czyli... im więcej serwerów MCP, tym mniej miejsca na rozmowę?

— Dokładnie. I to nie wszystko. Jeśli podłączasz serwery, musisz wiedzieć trzy rzeczy: gdzie je konfigurować, jak je optymalizować i jak diagnozować problemy.

> **Moduł:** Wbudowane narzędzia (Tools)
> **Poziom:** Zaawansowany
> **Czas:** 30–40 minut

## Co wyniesiesz z tej lekcji

- Zrozumiesz hierarchię konfiguracji MCP: Managed, Project, User, Local — gdzie zapisywać które serwery
- Poznasz problem "MCP Tax" i nauczysz się optymalizować zużycie tokenów
- Nauczysz się zarządzać wieloma serwerami i selektywnie je włączać
- Opanujesz zaawansowany troubleshooting z `--debug "api,mcp"`
- Nauczysz się diagnozować najczęstsze problemy

---

## 1. Hierarchia konfiguracji — gdzie co zapisać

Paweł rysuje na tablicy piramidę:

```
       MANAGED (firma)
      ↓ wymusza politykę
     PROJECT (zespół)
    ↓ dzielony w git
   USER (global)
  ↓ osobiste domyślne
 LOCAL (tylko ty)
```

— To jest system uprawnień i kontroli, nie tylko folder na JSONy — mówi Paweł.

### Managed Settings (Ustawienia zarządzane, szczyt piramidy)

**Lokalizacja:**
- macOS: `/Library/Application Support/ClaudeCode/managed-mcp.json`
- Linux/WSL: `/etc/claude-code/managed-mcp.json`
- Windows: `C:\ProgramData\ClaudeCode\managed-mcp.json`

**Kiedy używać:**
- Wymuszanie compliance (GDPR, SOC2, HIPAA)
- Blokowanie niebezpiecznych serwerów
- Standardy korporacyjne

**Przykład konfiguracji:**

```json
{
  "mcpServers": {
    "github": {
      "transport": "http",
      "url": "https://verified-mcp.company.com/github"
    }
  },
  "deny": ["mcp__*__execute_code"]
}
```

Wyobraź sobie, że pracujesz w firmie medycznej. IT admin chce, żeby wszyscy używali tylko serwerów po audycie bezpieczeństwa. Zapisuje w Managed Settings listę zatwierdzonych serwerów i blokuje wszystkie inne.

Ty jako programista **nie możesz** tego zmienić. Nawet jeśli dodasz własny serwer w User Settings, Managed go zablokuje. To firewall, którego nie obejdziesz.

Karina pyta:

— A jeśli chcę testować nowy serwer lokalnie?

— Właśnie do tego są kolejne poziomy — odpowiada Paweł.

---

### Project Settings (Ustawienia projektu, współdzielone z zespołem)

**Lokalizacja:**
- `.mcp.json` w głównym katalogu projektu (commitowane do git)
- `.claude/settings.json` dla szerszych ustawień projektu

**Kiedy używać:**
- Narzędzia specyficzne dla projektu (np. serwer do firmowej bazy danych)
- Konfiguracja dzielona między programistami
- Standardy zespołowe

**Przykład `.mcp.json`:**

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@bytebase/dbhub"],
      "env": {
        "DATABASE_URL": "${DB_URL_STAGING}"
      }
    }
  }
}
```

Zespół rozwija backend dla e-commerce. Wszyscy potrzebują dostępu do staging bazy — żeby testować zapytania i migracje. Team Lead dodaje serwer PostgreSQL do `.mcp.json` i commituje do repozytorium.

Każdy, kto sklonuje repo, dostaje ten serwer automatycznie. Zmienne środowiskowe (jak `DB_URL_STAGING`) każdy ustawia lokalnie w `.env`, ale sama konfiguracja serwera jest wspólna.

**Wskazówka:** Commituj `.mcp.json` do git, ale **NIGDY nie wpisuj** sekretów na stałe — używaj zmiennych środowiskowych.

---

### User Settings (Twoje globalne domyślne)

**Lokalizacja:**
- `~/.claude.json` (konfiguracja serwerów MCP)
- `~/.claude/settings.json` (ogólne ustawienia: permissions, hooks, env)

**Kiedy używać:**
- Twoje osobiste narzędzia dostępne we wszystkich projektach
- GitHub, Slack, Notion — rzeczy, których używasz codziennie

**Przykład:**

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "slack": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"],
      "env": {
        "SLACK_TOKEN": "${SLACK_TOKEN}"
      }
    }
  }
}
```

To jak zainstalowanie aplikacji globalnie w systemie vs. lokalnie w jednym folderze.

---

### Local Settings (Ustawienia lokalne, tylko dla Ciebie w tym projekcie)

**Lokalizacja:**
- `.claude/settings.local.json` (ignorowany przez git!)

**Kiedy używać:**
- Testowanie nowych serwerów przed dodaniem do team config
- Twoje osobiste eksperymenty
- Nadpisania dla project settings (np. inna baza testowa)

**Przykład:**

```json
{
  "mcpServers": {
    "test-server": {
      "command": "node",
      "args": ["/Users/karina/dev/my-mcp-server/index.js"]
    }
  }
}
```

Piszesz własny MCP server dla firmowego API. Chcesz go przetestować lokalnie, zanim pokażesz zespołowi. Dodajesz go do Local Settings — eksperymentujesz, łamiesz rzeczy, debugujesz. Wszystko w izolacji. Gdy działa, przenosisz konfigurację do Project Settings i commitujesz.

**WAŻNE:** Dodaj `.claude/settings.local.json` do `.gitignore`. W przeciwnym razie Twoje lokalne eksperymenty wyciekną do repozytorium.

---

### Konflikt ustawień — co wygrywa?

Paweł pokazuje przykład:

```
# User settings (~/.claude/settings.json)
"permissions": {
  "allow": ["mcp__github__*"]
}

# Project settings (.claude/settings.json)
"permissions": {
  "deny": ["mcp__github__create_issue"]
}

# Wynik: create_issue jest ZABLOKOWANE (project wygrywa)
```

**Reguła precedencji:**
1. **Managed** (najwyższy) — wymusza firma
2. **Command Line Arguments** — tymczasowe nadpisanie w sesji
3. **Local** — Twoje osobiste nadpisanie dla projektu
4. **Project** — standard zespołu
5. **User** (najniższy) — Twoje globalne domyślne

**Gdzie zapisać serwer MCP?**

- Musisz wymusić na całej firmie? → **Managed**
- Cały zespół tego potrzebuje? → **Project**
- Używasz w każdym projekcie? → **User**
- Testujesz coś lokalnie? → **Local**

**Przykłady:**
- **Managed:** Firma blokuje `execute_code` (wymóg compliance)
- **Project:** Serwer PostgreSQL dla staging bazy (wspólny dla zespołu)
- **User:** GitHub, Slack, Notion (używasz wszędzie)
- **Local:** Testowy serwer Twojego autorskiego narzędzia (tylko Ty, tylko tu)

---

## 2. Zarządzanie wieloma serwerami

Karina ma teraz jasność, gdzie co konfigurować. Ale wciąż ma problem — 5 serwerów, 47 narzędzi, 87% context usage.

— Jak to ogarnąć? — pyta.

Paweł uśmiecha się.

— Dwie zasady. Pierwsza: **nie trzymaj wszystkich serwerów włączonych naraz**. Druga: **kategoryzuj i selektywnie aktywuj**.

### Strategia kategoryzacji

Karina ma teraz 15 serwerów:
- GitHub, PostgreSQL, Slack, Filesystem, Google Calendar
- Puppeteer, Sentry, Stripe, Notion, Airtable
- HubSpot, Google Analytics, Twitter, Medium, Hashnode

15 serwerów × 10 narzędzi = 150 narzędzi.

Paweł pokazuje jak to zorganizować:

1. **Always-on** (zawsze włączone, max 5–10 narzędzi)
   - Używane codziennie: GitHub, filesystem, Slack

2. **On-demand** (na żądanie, włączaj gdy potrzebujesz)
   - Serwery baz danych (postgres, mysql)
   - Narzędzia marketingowe (Google Analytics, HubSpot)
   - Narzędzia specjalistyczne (Puppeteer, Sentry)

3. **Experimental** (eksperymentalne, tylko lokalnie)
   - Testowe serwery w `.claude/settings.local.json`

### Selektywne włączanie przez `/config`

Włączaj tylko serwery potrzebne w tej sesji:

```
> /config
```

W GUI:
- **MCP Servers** (zakładka)
  - ✅ github (enabled)
  - ✅ filesystem (enabled)
  - ❌ postgres (disabled — klik aby włączyć)
  - ❌ puppeteer (disabled)
  - ❌ google-calendar (disabled)

— Pracujesz nad backendem? Włącz postgres. Robisz scraping? Włącz puppeteer. Ale nie wszystko naraz — mówi Paweł.

### Historia z życia: programista z 20 serwerami

Paweł pokazuje zrzut ekranu z Slacka:

```
Developer: Claude działa dziwnie. Zapomina co mu mówiłem 10 minut temu.
Paweł: Sprawdź /context
Developer: 94% usage... ale ja dopiero zacząłem sesję!
Paweł: Tools loaded?
Developer: 187 tools (22,450 tokens)
Paweł: 😱
```

**Skutki przeładowania:**
- Context window wypełniony już na starcie
- Model "zapomina" wcześniejsze instrukcje (wyparte przez definicje narzędzi)
- Wolniejsze odpowiedzi
- Wyższe koszty

**Rekomendacja Pawła:**
- **5–7 serwerów zawsze włączonych** (narzędzia podstawowe)
- **Reszta na żądanie** (włączaj przez `/config` gdy potrzebujesz)

Karina wyłącza 3 serwery i sprawdza `/context`:

```
Context Window Usage: 42%
Tools loaded: 18 tools (2,145 tokens)
```

— O wow, z 87% do 42%! — cieszy się Karina.

— Dokładnie — mówi Paweł. — To się nazywa "MCP hygiene".

---

## 3. Problem "MCP Tax" i optymalizacja

### Co to jest MCP Tax?

Każde narzędzie MCP to jeden członek zespołu w sali konferencyjnej. Nawet jeśli nie mówi, zajmuje miejsce. 50 ludzi w pokoju na 60 miejsc? Zostaje 10 miejsc na rzeczywistą rozmowę.

To jest MCP Tax — koszt "obecności" narzędzi, nawet jeśli ich nie używasz.

Paweł rysuje kalkulację:

```
1 serwer MCP = ~10–15 narzędzi
1 narzędzie = ~100–500 tokenów (definicja + schema)

10 narzędzi = 1,000–5,000 tokenów
20 serwerów × 10 narzędzi = 200 narzędzi = 20,000–100,000 tokenów!

Context window (Opus 4.5): 200,000 tokenów
50% "tax" = 100,000 tokenów na narzędzia
50% pozostało = na rozmowę, kod, dokumentację
```

**Przykład z życia (z zespołu Kariny):**

Programista A:
- 3 serwery MCP (GitHub, Filesystem, PostgreSQL)
- 18 narzędzi = 2,100 tokenów = **1% context usage**
- Sesja: 50 wiadomości, 10 plików = 65% total ✅

Programista B:
- 15 serwerów MCP (wszystko co znalazł w katalogu MCP)
- 142 narzędzia = 48,500 tokenów = **24% context usage**
- Sesja: 20 wiadomości, 3 pliki = 89% total 🔴

Programista B ma problem: Claude "zapomina" instrukcje, ignoruje wcześniejszy kod, powtarza się. Dlaczego? Context window przepełniony zanim zaczął pracę.

**Koszty MCP Tax:**

1. **Tokeny input** (każda wiadomość)
   - 20,000 tokenów × $15 per 1M = $0.30 za wiadomość *(przykładowe ceny — sprawdź aktualny cennik modelu, którego używasz)*
   - 100 wiadomości dziennie = $30/dzień = $600/miesiąc

2. **Latency** (opóźnienie)
   - Więcej tokenów = dłuższe przetwarzanie
   - 20,000 vs 2,000 tokenów = 2–3x wolniej

3. **Context overflow**
   - Za dużo narzędzi = za mało miejsca na kod i rozmowę
   - Model "zapomina" wcześniejsze instrukcje

Karina patrzy na liczby z przerażeniem.

— $600 miesięcznie tylko przez narzędzia?!

— Jeśli nie optymalizujesz, tak — mówi Paweł. — Ale są strategie.

---

### Strategie optymalizacji

**1. Sprawdzanie zużycia: `/context`**

Zacznij od tej komendy — pokazuje dokładnie ile tokenów zjada każdy element.

```
> /context

Context Window Usage: 42% (84,000 / 200,000 tokens)

Breakdown:
- Tools: 2,145 tokens (18 tools from 3 servers)
- Files in context: 5,420 tokens (4 files)
- Conversation: 76,435 tokens (32 messages)

MCP Servers:
- github: 8 tools (945 tokens)
- filesystem: 6 tools (780 tokens)
- postgres: 4 tools (420 tokens)

Recommendations:
- Consider disabling unused MCP servers
- Files taking significant space: @src/auth.ts (2,145 tokens)
```

Jak czytać ten wynik:
- **42% usage** — komfortowo, zostało 58% na rozmowę
- **Tools: 2,145 tokens** — to jest MCP Tax; im więcej serwerów, tym większa liczba
- **Breakdown per server** — widać, który serwer zjada najwięcej
- **Recommendations** — Claude podpowiada co wyłączyć

Progi:
- **<50%** = zielona strefa
- **50–70%** = żółta strefa (czas na porządki)
- **>70%** = czerwona strefa (wyłącz serwery!)

**2. Selektywne włączanie serwerów**

Przebieg:
1. Zacznij sesję z minimum serwerów (2–3 podstawowe)
2. Gdy potrzebujesz więcej: `/config` → włącz konkretny serwer
3. Po zakończeniu zadania: `/config` → wyłącz

**3. Serwery agregujące**

Zamiast 5 serwerów po 10 narzędzi — jeden serwer-agregator z kilkoma uniwersalnymi narzędziami.

Serwer-agregator łączy wiele źródeł w jedno narzędzie z parametrem `source`. Zamiast 4 serwerów (każdy z 10 narzędziami) masz JEDEN serwer z kilkoma uniwersalnymi:
- `search(source, query)` — szuka we wszystkich źródłach
- `read(source, id)` — czyta z dowolnego źródła
- `create(source, data)` — tworzy w dowolnym źródle
- `list(source)` — listuje z dowolnego źródła

Model dostaje `source: "github"` lub `source: "jira"` jako parametr, zamiast osobnych narzędzi dla każdego serwisu.

**Oszczędność:** 40 narzędzi (4,000 tokenów) → 5 narzędzi (500 tokenów) = **88% redukcja**

Szukaj takich serwerów na [mcp.so](https://mcp.so) lub [smithery.ai](https://smithery.ai) z filtrem "multi-source" lub "aggregator".

**4. MCP Tool Search — leniwe ładowanie**

Od wersji 2.1.9 Claude Code ma wbudowany mechanizm leniwego ładowania (lazy loading) dla narzędzi MCP. Zamiast ładować wszystkie definicje na starcie, ładuje je dynamicznie gdy są potrzebne. Efekt z rzeczywistych wdrożeń: redukcja z 51,000 tokenów do 8,500 (~46%) *(liczby przykładowe — sprawdź aktualną wersję, którą masz).*

Szczegóły w [dokumentacji MCP](https://code.claude.com/docs/en/mcp).

**5. Token budżet per server (konceptualnie)**

Co jeśli mógłbyś powiedzieć serwerowi "masz limit 1000 tokenów, wybierz 10 narzędzi"? Coś takiego:

```json
{
  "mcpServers": {
    "github": {
      "command": "...",
      "maxTools": 10
    }
  }
}
```

**UWAGA:** To konceptualna funkcja — nie wszystkie serwery wspierają. Ale pokazuje kierunek.

---

### Monitoring i metryki

Metryki, które warto śledzić:

1. **Context usage** (`/context`) — trzymaj poniżej 60%, powyżej 80% = czas na porządki
2. **Tools loaded** — celuj w 10–20 dla normalnej pracy; 50+ = czerwona flaga
3. **Cost per session** — oblicz: tokeny × cena modelu; optymalizuj jeśli >$1 za sesję przy prostych zadaniach

— Wyłączam HubSpota i Google Analytics z zawsze włączonych od razu — mówi Karina. — Będę je włączać tylko przed konkretnym zadaniem.

— Dobra — mówi Paweł.

---

## 4. Troubleshooting zaawansowany

> W Part 2 omówiliśmy podstawowe problemy z instalacją (brak Node.js, literówki w ścieżkach, uprawnienia systemowe). Tu skupiamy się na problemach konfiguracyjnych i sieciowych — gdy serwer jest zainstalowany, ale nie działa poprawnie.

### Główne narzędzie: `--debug "api,mcp"`

Gdy `/mcp` nie daje wystarczających informacji, uruchom Claude z trybem debug:

```bash
claude --debug "api,mcp"
```

To pokaże DLACZEGO serwer się nie uruchomił — dokładną komendę, zmienne środowiskowe, komunikaty JSON-RPC i błędy.

### Problem 1: Błędy konfiguracji

**Objawy:**
```
⚠️ MCP Server 'filesystem' not found
Status: Never connected
```

**Krok 1: Sprawdź konfigurację**

Otwórz plik konfiguracyjny i sprawdź składnię.

Częste błędy:
- Przecinek po ostatnim obiekcie
- Pojedyncze apostrofy zamiast cudzysłowów
- Niezamknięte nawiasy

```bash
# Waliduj JSON:
# macOS: cat ~/.claude.json | pbcopy  (kopiuje do schowka)
# Linux/Windows: otwórz plik w edytorze i skopiuj zawartość
# Wklej na: https://jsonlint.com
```

**Krok 2: Sprawdź czy pakiet npm się pobiera**

```bash
npx -y @modelcontextprotocol/server-github --help

# Jeśli nie działa, sprawdź npm registry:
npm config get registry
# Powinno być: https://registry.npmjs.org/
```

**Krok 3: Test ręczny**

```bash
npx -y @modelcontextprotocol/server-filesystem ~/Documents
```

Jeśli to działa (nie kończy się błędem), problem jest w konfiguracji Claude Code, nie w samym serwerze.

**Krok 4: Pełny restart**

1. Zamknij Claude Code całkowicie (Cmd+Q / Alt+F4)
2. Zrestartuj terminal
3. Uruchom Claude Code ponownie

---

### Problem 2: "Connection failed"

**Typ 1: Connection Timeout (serwery zdalne)**

**Objawy:**
```
⚠️ github
  Status: Connection timeout after 30s
  Last attempt: Feb 16, 14:32:05
```

**Przyczyny:**

1. **Serwer zdalny nie odpowiada**
   ```bash
   curl -I https://api.githubcopilot.com/mcp/
   # Jeśli timeout/error → problem po stronie serwera
   ```

2. **Firewall / VPN blokuje połączenie**
   ```bash
   ping api.githubcopilot.com
   # Jeśli "Request timeout" → firewall/network
   ```

3. **Złe dane uwierzytelniające (token wygasł lub niepoprawny)**
   ```bash
   claude --debug "api,mcp"
   # Szukaj: "401 Unauthorized" lub "403 Forbidden"
   ```

**Rozwiązania:**
- **Problem 1:** Poczekaj, spróbuj później (serwis może mieć awarię)
- **Problem 2:** Wyłącz VPN i spróbuj; sprawdź System Settings > Network > Firewall i dodaj Claude Code do wyjątków
- **Problem 3:** Wygeneruj nowy token; sprawdź zakresy uprawnień (scopes) i datę wygaśnięcia

**Typ 2: Błąd konfiguracji (lokalny)**

**Objawy:**
```
⚠️ filesystem
  Status: Failed to start
  Error: invalid arguments: path does not exist
```

**Przyczyny:**

1. **Błędna składnia JSON** — np. brakuje przecinka między elementami `args`
   ```json
   "args": ["-y", "@modelcontextprotocol/server-filesystem" "/missing/comma"]
   ```

2. **Złe argumenty** — ścieżka nie istnieje
   ```json
   "args": ["-y", "@modelcontextprotocol/server-filesystem", "/nieistniejący/katalog"]
   ```

3. **Brak wymaganych zmiennych środowiskowych** — `${GITHUB_TOKEN}` w konfiguracji, ale brak w `.env`

**Rozwiązania:**
- **Problem 1:** Waliduj JSON na jsonlint.com
- **Problem 2:** `ls -la /ścieżka/z/konfiguracji` — jeśli "No such file" → popraw ścieżkę
- **Problem 3:** Sprawdź `cat .env` czy klucz istnieje; lub ustaw globalnie: `export GITHUB_TOKEN=ghp_...`

Zawsze sprawdzaj szczegółowe logi:
```bash
claude --debug "api,mcp"
```

---

### Problem 3: "Permission denied"

**Objawy:**
```
⚠️ github
  Error: GitHub API returned 401 Unauthorized
```

lub

```
⚠️ slack
  Error: invalid_auth
```

**Przyczyna:** dane uwierzytelniające są niepoprawne, wygasłe lub nie mają wymaganych zakresów uprawnień (scopes).

**Diagnostyka:**

```bash
claude --debug "api,mcp"
# Szukaj:
# "401 Unauthorized" → token niepoprawny/wygasły
# "403 Forbidden" → token nie ma wymaganych scopes
# "invalid_auth" (Slack) → token odwołany lub złe Team ID
```

**Rozwiązanie dla GitHub:**

**Krok 1: Sprawdź czy token istnieje**
```bash
cat .env | grep GITHUB_TOKEN
# Powinno zwrócić: GITHUB_TOKEN=ghp_...
```

**Krok 2: Wygeneruj nowy token**

1. Idź do: https://github.com/settings/tokens
2. Znajdź token "Claude Code MCP" — sprawdź "Expires" i "Scopes"
3. Jeśli wygasł lub brakuje zakresów uprawnień → stwórz nowy:
   - "Generate new token (classic)"
   - Expiration: "No expiration" (lub 90 dni)
   - Scopes:
     - ✅ `repo` (pełny dostęp do repozytoriów)
     - ✅ `read:user` (odczyt profilu)
     - ✅ `read:org` (jeśli pracujesz w org)
     - ✅ `admin:repo_hook` (jeśli potrzebujesz webhooków)
4. Kliknij "Generate token"
5. **Skopiuj NATYCHMIAST** — zobaczysz go tylko raz!

**Krok 3: Zaktualizuj konfigurację**

Otwórz `.env` w edytorze i zaktualizuj (lub dodaj) linię:
```
GITHUB_TOKEN=ghp_twoj_nowy_token
```

Ewentualnie — bezpośrednio w `~/.claude.json` (awaryjnie, nie zalecane dla wielu projektów):
```json
{
  "mcpServers": {
    "github": {
      "env": {
        "GITHUB_TOKEN": "ghp_twoj_nowy_token"
      }
    }
  }
}
```

**Krok 4: Zrestartuj Claude Code** (Cmd+Q i uruchom ponownie)

**Krok 5: Weryfikacja**

```
/mcp
```

Powinno pokazać:
```
✓ github
  Status: Connected
```

**Ogólna zasada: Principle of Least Privilege**

ZAWSZE używaj **najmniejszych uprawnień**, które są potrzebne:
- Tylko czytasz issues? → wystarczy `read:issues` (nie pełne `repo`)
- Tylko piszesz wiadomości na Slack? → wystarczy `chat:write` (nie `admin`)

Im węższe uprawnienia, tym mniejsze ryzyko, jeśli token wycieknie.

---

### `--debug "api,mcp"` — zaawansowane użycie

Gdy `/mcp` pokazuje "Connected" ale coś nie działa — albo chcesz zobaczyć co się dzieje pod maską — użyj trybu debug.

```bash
claude --debug "api,mcp"
```

**Przykładowy wynik komendy:**

```
[MCP] Starting MCP initialization...
[MCP] Found 2 servers in config: filesystem, github
[MCP]
[MCP] Initializing server: filesystem
[MCP] Command: npx -y @modelcontextprotocol/server-filesystem /Users/marek/Documents
[MCP] Spawning process...
[MCP] Server started, PID: 12345
[MCP]
[MCP] Sending handshake:
[MCP] → {"jsonrpc":"2.0","id":1,"method":"initialize","params":{...}}
[MCP]
[MCP] Received response:
[MCP] ← {"jsonrpc":"2.0","id":1,"result":{"protocolVersion":"2024-11-05",...}}
[MCP]
[MCP] Server capabilities detected:
[MCP]   - tools: enabled (6 tools available)
[MCP]   - resources: enabled (file:// protocol)
[MCP]   - prompts: disabled
[MCP]
[MCP] ✓ Connected to filesystem server
[MCP]
[MCP] Initializing server: github
[MCP] ...
[MCP] ✓ Connected to github server
[MCP]
[MCP] All servers initialized successfully.
```

Jak czytać ten wynik:
1. **`Initializing server: <name>`** — który serwer jest uruchamiany
2. **`Command: ...`** — dokładna komenda (możesz ją skopiować i uruchomić ręcznie)
3. **`PID: 12345`** — ID procesu (`ps aux | grep 12345`)
4. **`→` i `←`** — komunikaty JSON-RPC (→ wysyłane, ← odbierane)
5. **`Server capabilities`** — co serwer umie (tools/resources/prompts)
6. **`✓ Connected`** — sukces

Kiedy używać:

✅ Serwer pokazuje "Disconnected" i nie wiesz dlaczego — debug pokaże dokładny błąd
✅ Chcesz zobaczyć jakie narzędzia serwer eksponuje — sekcja `tools/list`
✅ Debugujesz własny serwer MCP — widzisz odpowiedzi na każde żądanie
✅ Performance troubleshooting — widzisz jak długo trwa każda operacja

**Zapisywanie logów do pliku:**

Logi mogą być bardzo obszerne. Warto je zapisać:

```bash
# Zapisz i jednocześnie wyświetl:
claude --debug "api,mcp" 2>&1 | tee mcp-debug.log

# Tylko zapisz:
claude --debug "api,mcp" > mcp-debug.log 2>&1

# Potem przeszukuj:
grep "Error" mcp-debug.log
grep "github" mcp-debug.log
```

**Przykładowy błąd w debug mode:**

```
[MCP] Initializing server: github
[MCP] Command: npx -y @modelcontextprotocol/server-github
[MCP] Environment: GITHUB_TOKEN=ghp_****...
[MCP] Server started, PID: 12350
[MCP] → {"jsonrpc":"2.0","id":5,"method":"initialize",...}
[MCP] ⚠️ Server error:
[MCP] ← {"jsonrpc":"2.0","id":5,"error":{"code":-32000,"message":"GitHub API returned 401 Unauthorized"}}
[MCP]
[MCP] ❌ Failed to connect to github server
[MCP] Reason: Invalid or expired token
```

Wiesz dokładnie co zrobić: token jest niepoprawny, generujesz nowy.

---

## Słowniczek

**Context window**
Limit tokenów, które model może "widzieć" naraz w jednej sesji. Działa jak pamięć robocza — im więcej rzeczy ładujesz jednocześnie (narzędzia MCP, pliki, rozmowa), tym mniej miejsca zostaje na nowe informacje. Dla Claude Opus 4.5 wynosi 200,000 tokenów.

**Token**
Podstawowa jednostka rozliczeniowa modelu AI. Jeden token to mniej więcej 4 znaki tekstu lub ¾ słowa angielskiego. Każda definicja narzędzia MCP zajmuje od 100 do 500 tokenów.

**Scope (zakres uprawnień)**
Zestaw uprawnień przyznanych tokenowi API (GitHub, Slack itp.). Na przykład `repo` pozwala na pełny dostęp do repozytoriów, a `read:user` tylko na odczyt profilu. Im węższy scope, tym bezpieczniejszy token.

**npx**
Narzędzie wbudowane w Node.js do uruchamiania pakietów bez trwałej instalacji. Gdy widzisz `npx -y @pakiet`, znaczy to: "pobierz ten pakiet z internetu i uruchom go teraz". Wymaga zainstalowanego Node.js.

**npm**
Menedżer pakietów dla JavaScript/Node.js (Node Package Manager). Instalowany razem z Node.js, używany przez `npx` do pobierania serwerów MCP.

**PATH**
Zmienna systemowa mówiąca systemowi, gdzie szukać programów. Jeśli `npx` nie działa po instalacji Node.js — często znaczy to, że Node.js nie został dodany do PATH.

**Firewall**
System ochrony sieciowej filtrujący ruch internetowy. W firmach może blokować połączenia Claude Code ze zdalnymi serwerami MCP.

**Managed Settings**
Najwyższy poziom konfiguracji MCP, wymuszany przez organizację. Lokalizacja: macOS `/Library/Application Support/ClaudeCode/managed-mcp.json`, Linux `/etc/claude-code/`, Windows `C:\ProgramData\ClaudeCode\`. Nie może być nadpisany przez użytkownika.

**Project Settings**
Konfiguracja dzielona przez zespół, commitowana do git. Lokalizacja: `.mcp.json` lub `.claude/settings.json`. Wyższy priorytet niż User Settings.

**User Settings**
Globalna konfiguracja użytkownika dla wszystkich projektów. Konfiguracja MCP w `~/.claude.json`, ustawienia ogólne w `~/.claude/settings.json`. Niższy priorytet niż Project Settings.

**Local Settings**
Osobiste nadpisania ustawień projektu, ignorowane przez git. Lokalizacja: `.claude/settings.local.json`. Wyższy priorytet niż Project Settings (ale niższy niż Managed).

**MCP Tax**
Koszt tokenów zużywanych przez definicje narzędzi MCP, nawet jeśli nie są używane. Każde narzędzie to ~100–500 tokenów. 20 serwerów może zająć 50% context window.

**Aggregated server**
MCP server łączący wiele źródeł w jedno narzędzie z parametrem `source`. Zamiast osobnych narzędzi dla GitHub, Linear i Jiry — jeden serwer z 5 uniwersalnymi narzędziami. Redukcja tokenów o 80–90%.

**MCP Tool Search**
Wbudowany mechanizm leniwego ładowania (lazy loading) w Claude Code (od v2.1.9). Zamiast ładować wszystkie definicje na starcie, Claude ładuje je dynamicznie gdy są potrzebne. Efekt: redukcja zużycia tokenów przez narzędzia o ~46%.

**JSON-RPC**
Protokół komunikacji używany przez MCP. Prosty format do wysyłania żądań i otrzymywania odpowiedzi. Bazuje na JSON.

---

## Podsumowanie

Karina patrzy na notatki.

— Jutro zaczynam od wyłączenia połowy serwerów. Nie wracam do 87% — mówi.

Paweł kiwa głową.

---

## Co dalej?

W następnej lekcji (MCP Part 4 — Bezpieczeństwo i Marketplace):

- Zaawansowane zagrożenia: Prompt Injection, Tool Poisoning, Cross-Repository Data Theft
- Studia przypadków z incydentów bezpieczeństwa
- Wielowarstwowa obrona (sandbox, hooks, osobne tokeny)
- Marketplace: mcp.so vs smithery.ai
- Jak oceniać jakość serwerów (7-punktowy checklist)
- Top 10 serwerów MCP (z komendami instalacji)


---

## Dokumentacja

**MCP Protocol:**
- Specyfikacja: https://modelcontextprotocol.io/specification/2025-11-25
- Architektura: https://modelcontextprotocol.io/docs/learn/architecture

**Claude Code Settings:**
- Hierarchia ustawień: https://code.claude.com/docs/en/settings
- MCP konfiguracja: https://code.claude.com/docs/en/mcp

**Optymalizacja:**
- MCP Tax analysis: https://selfservicebi.co.uk/analytics%20edge/improve%20the%20experience/2025/11/23/the-hidden-cost-of-mcps-and-custom-instructions-on-your-context-window.html
- Dynamic toolsets: https://www.speakeasy.com/blog/how-we-reduced-token-usage-by-100x-dynamic-toolsets-v2

---

**Następna lekcja:** Lekcja 12 – MCP Part 4: Bezpieczeństwo i Marketplace
**Poprzednia lekcja:** Lekcja 10 – MCP Part 2: Instalacja i Pierwsze Kroki
