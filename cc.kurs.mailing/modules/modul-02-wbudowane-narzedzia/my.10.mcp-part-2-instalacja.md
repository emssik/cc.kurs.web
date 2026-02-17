---
lesson: "02.10"
title: "MCP Part 2 - Instalacja i Pierwsze Kroki"
description: "Od zera do działających serwerów MCP - instalacja, praktyczne przykłady i podstawowe bezpieczeństwo"
module: "02-wbudowane-narzedzia"
---

# MCP Part 2 - Instalacja i Pierwsze Kroki

**Znasz już architekturę MCP. Czas zainstalować pierwszy serwer i zobaczyć jak działa w praktyce.**

Marek patrzy na notatki z poprzedniej lekcji.

— Okej, rozumiem teorię: Host, Client, Server, Resources, Tools, Prompts. Ale jak to zainstalować?

Paweł uśmiecha się.

— Zaczynamy od najprostszego: filesystem server. Za 5 minut będziesz miał działający MCP.

> **Moduł:** Wbudowane narzędzia (Tools)
> **Poziom:** Średnio-zaawansowany
> **Czas:** 35–45 minut

## Co wyniesiesz z tej lekcji

- Zainstalujesz pierwszy serwer MCP krok po kroku (filesystem)
- Zobaczysz działające przykłady dla 4 różnych grup zawodowych (GitHub, Google Drive, Slack, SQLite)
- Dowiesz się gdzie szukać pomocy gdy coś nie działa (rozwiązywanie problemów)
- Zrozumiesz podstawy bezpieczeństwa MCP (co może pójść nie tak i jak się chronić)

---

## 1. Instalacja pierwszego serwera — krok po kroku

### Serwer filesystem — lokalny, dobry na start

Zacznijmy od czegoś prostego: serwera który daje Claude'owi dostęp do lokalnych plików.

**Dlaczego filesystem jest idealny na początek:**

- **Lokalny:** działa na Twoim komputerze (bez wysyłania danych do internetu)
- **Bezpieczniejszy na start:** jeśli dasz mu dostęp tylko do minimalnych katalogów (np. osobny folder testowy), ryzyko jest dużo mniejsze niż przy serwerach z tokenami do API

- **Przydatny:** Claude może czytać pliki spoza aktualnego projektu
  - Dokumenty z `~/Documents`
  - Eksporty danych z `~/Downloads`
  - Konfiguracje z `~/.config`
  - Logi systemowe z `/var/log` (jeśli masz uprawnienia — na macOS mogą być ograniczone; zacznij od `~/Downloads` lub innego folderu użytkownika)

- **Prosty:** nie wymaga rejestracji, kluczy API, OAuth ani płatnego konta

Instalujesz i działa — dosłownie w 2 minuty.

Jeśli chcesz podejść do tego maksymalnie bezpiecznie: zacznij od jednego, nowego katalogu (np. `~/mcp-sandbox`) i dopiero potem poszerzaj dostęp.

### Metoda 1: CLI (`claude mcp add`) - najszybsza

Paweł pokazuje:

```bash
# W terminalu (Claude Code musi być zainstalowany)
claude mcp add --transport stdio filesystem -- npx -y @modelcontextprotocol/server-filesystem ~/Documents ~/Projects
```

**Co się dzieje krok po kroku:**

1. **Claude pobiera informacje** o pakiecie `@modelcontextprotocol/server-filesystem` z npm
2. **Dodaje konfigurację** do pliku `~/.claude.json` (user scope — dla wszystkich projektów)
3. **Zapisuje parametry:**
   - Transport: stdio (lokalne połączenie)
   - Ścieżki do katalogów: `~/Documents` i `~/Projects`
4. **Przy następnym uruchomieniu** Claude Code automatycznie odpala serwer w tle

**Kiedy użyć tej metody:**
- Chcesz szybko przetestować serwer (30 sekund od instalacji do działania)
- Nie potrzebujesz szczegółowej kontroli nad konfiguracją
- Chcesz żeby serwer był dostępny globalnie (we wszystkich projektach)

**Uwaga:** Dla bardziej złożonych konfiguracji (z sekretami, wieloma parametrami) lepiej użyj Metody 2 (ręczna edycja JSON).

### Metoda 2: Ręczna (JSON) - lepsza kontrola

Paweł pokazuje bardziej poukładane podejście:

**Krok 1: Znajdź plik konfiguracyjny**

Na macOS/Linux:
```bash
~/.claude.json
```

Na Windows:
```bash
%APPDATA%\Claude\claude.json
```

**Krok 2: Otwórz w edytorze**

Otwórz plik w swoim ulubionym edytorze (VS Code, Sublime, nano, vim). Jeśli plik nie istnieje — stwórz go.

**Pełny przykład konfiguracji:**

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/twoja-nazwa/Documents",
        "/Users/twoja-nazwa/Projects"
      ]
    }
  }
}
```

Uwaga: zamień `/Users/twoja-nazwa/...` na swoje rzeczywiste ścieżki (np. `/Users/marek/Documents`). W JSON używaj ścieżek absolutnych — `~` (tilde) nie zawsze jest rozwijane.

**Wyjaśnienie każdej linii:**

- `"mcpServers"` — obiekt zawierający wszystkie serwery MCP
- `"filesystem"` — nazwa serwera (możesz wybrać własną, np. "my-files")
- `"command": "npx"` — komenda która uruchamia serwer (npx ściąga i uruchamia pakiet npm)
- `"-y"` — automatyczne potwierdzenie (bez pytania "czy zainstalować?")
- `"@modelcontextprotocol/server-filesystem"` — nazwa pakietu npm
- Ostatnie elementy — ścieżki katalogów do których Claude będzie miał dostęp (możesz dodać więcej)

**Na Windows:**
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "C:\\Users\\Marek\\Documents",
        "C:\\Users\\Marek\\Projects"
      ]
    }
  }
}
```

Zwróć uwagę na podwójne backslash (`\\`) w ścieżkach Windows.

**Krok 3: Zapisz i zrestartuj Claude Code**

**Krok 4: Sprawdź czy działa**

**Metoda 1: Komenda `/mcp` (najszybsza)**

W Claude Code wpisz:
```
/mcp
```

Powinieneś zobaczyć:
```
Connected MCP Servers:

✓ filesystem
  Status: Connected
  Transport: stdio
  Tools Available (6):
    - read_file
    - write_file
    - list_directory
    - create_directory
    - move_file
    - delete_file
  Resources: file:///Users/.../Documents, file:///Users/.../Projects
```

**Metoda 2: Zadaj pytanie (test od początku do końca)**

```
> List all files in my Documents folder
```

Jeśli działa, Claude odpowie (przykładowy output):
```
Reading ~/Documents...

Found 8 items:
📄 report-q4.pdf
📄 meeting-notes.txt
📁 Photos (directory)
📄 budget-2025.xlsx
📁 Archive (directory)
...
```

**Jeśli NIE działa, zobaczysz:**
```
⚠️ filesystem server: Disconnected
Reason: Server failed to start
Check logs: claude mcp logs filesystem
```

W takim przypadku przejdź do sekcji "Rozwiązywanie problemów" dalej w lekcji.

### Co możesz teraz zrobić

> Poniższe przykłady pokazują **ilustracyjne** odpowiedzi Claude'a. Twoje wyniki będą inne — zależą od plików na Twoim dysku.

**Przykład 1: Programista (Marek) — analiza logów**

```
> Show me all error logs from /var/log from last 24h

Claude: [uses filesystem server]
Reading /var/log...

Found 3 error logs with activity in last 24 hours:

📄 system.log (247 errors)
   Most frequent: "connection timeout to database" (89 occurrences)
   First seen: Feb 16, 02:14 AM
   Last seen: Feb 16, 11:32 AM

📄 application.log (52 errors)
   Most frequent: "rate limit exceeded for API /users" (31 occurrences)
   First seen: Feb 16, 08:45 AM

📄 nginx-error.log (12 errors)
   Most frequent: "502 Bad Gateway" (8 occurrences)

Want me to read full entries for any of these?
```

> Uwaga: na części systemów dostęp do `/var/log` może być ograniczony uprawnieniami. Jeśli dostaniesz błąd dostępu, zacznij od folderu użytkownika (np. `~/Downloads`).

**Przykład 2: Pisarz — analiza szkiców**

```
> Analyze all markdown files in my ~/Drafts folder and give me word count breakdown

Claude: [uses list_directory + read_file]
Scanning ~/Drafts...

Found 5 markdown files:

📄 novel-chapter-1.md - 3,247 words
📄 novel-chapter-2.md - 2,891 words (draft incomplete?)
📄 blog-post-ai-writing.md - 1,523 words
📄 essay-future-of-work.md - 4,102 words
📄 notes-random.md - 734 words

Total: 12,497 words across 5 documents
Longest: essay-future-of-work.md (4,102 words)
Shortest: notes-random.md (734 words)
Average: 2,499 words/document

Note: chapter-2.md ends mid-sentence - want me to help continue?
```

**Przykład 3: Analityk — przetwarzanie CSV**

```
> Read all CSV files from ~/Data/exports and create summary statistics

Claude: [uses filesystem server]
Reading ~/Data/exports...

Found 3 CSV files:

📊 sales-2025-q1.csv
   Rows: 1,247 | Columns: 8
   Total Revenue: $487,230
   Avg Order Value: $390.54

📊 users-export.csv
   Rows: 8,934 | Columns: 12
   New Users (Feb): 2,341
   Churn Rate: 4.2%

📊 campaign-performance.csv
   Rows: 156 | Columns: 15
   Best Channel: Email (ROI: 480%)
   Worst Channel: Facebook (ROI: 120%)

Want me to create a combined analysis or visualize any of these?
```

Różnica: Claude **rzeczywiście czyta** pliki i daje konkretne wyniki — nie mówi "użyj tego polecenia ręcznie".

### Jak wyłączyć lub usunąć serwer

Jeśli chcesz wyłączyć serwer (np. przestał być potrzebny albo chcesz zawęzić katalogi):

```bash
# Usuń serwer
claude mcp remove filesystem

# Lub zmień katalogi — dodaj ponownie z nowymi ścieżkami
claude mcp add --transport stdio filesystem -- npx -y @modelcontextprotocol/server-filesystem ~/Projects
```

Możesz też ręcznie edytować `~/.claude.json` — usuń wpis serwera z `"mcpServers"` i zrestartuj Claude Code.

### Częste problemy przy instalacji

**Problem 1: `Server not found` po dodaniu przez CLI**

**Objawy:**
```
⚠️ MCP Server 'filesystem' failed to start
Error: command not found: npx
```

**Przyczyna:**
`npx` nie jest zainstalowany lub nie jest w PATH. To znaczy że Node.js nie jest zainstalowany albo terminal nie wie gdzie go szukać.

**Rozwiązanie:**

1. **Sprawdź czy Node.js jest zainstalowany:**
   ```bash
   node --version
   ```
   Powinno zwrócić coś w stylu: `v20.11.0` (v18+ wymagane)

2. **Sprawdź czy npx działa:**
   ```bash
   npx --version
   ```
   Powinno zwrócić: `10.2.4` (lub podobne)

3. **Jeśli któreś nie działa:**
   - Zainstaluj Node.js z https://nodejs.org (wersja LTS)
   - Na macOS możesz też: `brew install node`
   - Na Windows: pobierz instalator ze strony Node.js

4. **Zrestartuj terminal** (żeby PATH się odświeżył)

5. **Spróbuj ponownie:**
   ```bash
   claude mcp add --transport stdio filesystem -- npx -y @modelcontextprotocol/server-filesystem ~/Documents
   ```

**Problem 2: Serwer w `/mcp` pokazuje "Disconnected"**

**Objawy:**
```
⚠️ filesystem
  Status: Disconnected
  Last error: ENOENT: no such file or directory
```

**Przyczyna:**
Błędna ścieżka w konfiguracji lub brak uprawnień do katalogu.

**Rozwiązanie:**

1. **Sprawdź logi:**
   ```bash
   claude mcp logs filesystem
   ```

   Szukaj błędów typu:
   ```
   Error: ENOENT: no such file or directory, scandir '/Users/twoja-nazwa/Documnets'
   ```
   (zwróć uwagę na literówkę: Documnets zamiast Documents)

2. **Sprawdź czy ścieżki istnieją:**
   ```bash
   ls -la ~/Documents
   ls -la ~/Projects
   ```

3. **Na macOS — zgoda na dostęp do plików:**
   - System Settings > Privacy & Security > Files and Folders
   - Sprawdź czy Claude Code ma dostęp do podanych katalogów
   - Jeśli nie — zrestartuj Claude Code (czasem trzeba dodać ręcznie)

4. **Popraw ścieżkę** jeśli była błędna

5. **Zrestartuj Claude Code**

---

**Problem 3: "Permission denied" przy próbie zapisu**

**Objawy:**
```
Claude: I tried to create file.txt but got:
Error: EACCES: permission denied, open '/Users/.../Documents/file.txt'
```

**Przyczyna:**
Błąd `EACCES: permission denied` to systemowy błąd uprawnień — albo Twój użytkownik nie ma praw zapisu, albo macOS blokuje dostęp przez Privacy & Security.

**Rozwiązanie:**

1. **Sprawdź uprawnienia katalogu:**
   ```bash
   ls -la ~/Documents
   ```
   Twój użytkownik powinien mieć `rw` (odczyt i zapis).

2. **Na macOS — sprawdź Privacy & Security:**
   - System Settings > Privacy & Security > Files and Folders
   - Sprawdź czy Claude Code ma dostęp
   - Jeśli nie — dodaj ręcznie

3. **Sprawdź czy katalog docelowy istnieje:**
   ```bash
   mkdir -p ~/Documents/mcp-output
   ```

4. **Zrestartuj Claude Code** po zmianie uprawnień

---

## 2. Praktyczne przykłady użycia

### Przykład 1: GitHub server — dla programisty

#### Aktualna metoda: HTTP (dla nowych instalacji)

```bash
claude mcp add --transport http github https://api.githubcopilot.com/mcp/
```

To wszystko — autoryzujesz się przez przeglądarkę, bez ręcznego kopiowania tokenów.

#### Historyczna metoda: npx (zarchiwizowana, ale edukacyjna)

> Pakiet `@modelcontextprotocol/server-github` jest zarchiwizowany. Poniższy przykład nadal działa i dobrze pokazuje mechanikę konfiguracji (tokeny, env, JSON) — dlatego go omawiamy.

**Konfiguracja krok po kroku:**

**Krok 1: Zdobądź token GitHub**

1. Idź do: https://github.com/settings/tokens
2. Kliknij "Generate new token (classic)"
3. Nazwa: "Claude Code MCP"
4. Wybierz zakresy uprawnień (scopes):
   - ✅ `repo` (dostęp do repozytoriów)
   - ✅ `read:user` (odczyt profilu)
   - ✅ `read:org` (jeśli pracujesz w organizacji)
5. Kliknij "Generate token"
6. **Skopiuj token** (zobaczysz go tylko raz!) — wygląda jak: `ghp_xxxxxxxxxxxxxxxxxxxx`

**Krok 2: Zainstaluj serwer (bezpieczniejsza metoda)**

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

Następnie ustaw token tak, żeby nie trafił do repozytorium:

**Opcja A (polecana): `.claude/settings.local.json`** — plik lokalny, ignorowany przez git:

```json
{
  "env": {
    "GITHUB_TOKEN": "ghp_twoj_prawdziwy_token_tutaj"
  }
}
```

**Opcja B: zmienna środowiskowa w terminalu** — ustaw przed uruchomieniem Claude Code:

```bash
export GITHUB_TOKEN=ghp_twoj_prawdziwy_token_tutaj
claude
```

**Opcja C: plik `.env`** — uwaga: Claude Code nie ładuje `.env` automatycznie. Musisz zadbać o to sam (np. przez `direnv`, `dotenv` w shellu, lub ręczny `source .env` przed uruchomieniem). Jeśli nie wiesz co to znaczy, użyj Opcji A.

```bash
# .env
GITHUB_TOKEN=ghp_twoj_prawdziwy_token_tutaj
```

I dodaj do `.gitignore`:
```bash
# .gitignore
.env
.claude/settings.local.json
```

**KRYTYCZNIE WAŻNE:**
❌ **NIGDY nie commituj pliku z tokenem do git!**
✅ Używaj zmiennych środowiskowych lub `.claude/settings.local.json` (ignorowany przez git)

**Krok 3: Zrestartuj Claude Code**

**Krok 4: Sprawdź połączenie**

```
/mcp
```

Powinieneś zobaczyć:
```
✓ github
  Status: Connected
  Tools: create_issue, get_issue, list_issues, create_pull_request, ...
```

**Co możesz zrobić:**

[PRZYKŁAD: Marek używa GitHub server]

```
Marek: Show me all open issues labeled "bug" in our repo

Claude: [uses github server]
Found 7 open bugs:
1. #156 - Auth token expires too quickly (opened 3d ago, @sarah)
2. #142 - Memory leak in background worker (opened 1w ago, @tom)
...

Marek: Create a new issue: "Add rate limiting to /api/users endpoint",
label it as "enhancement", assign to me

Claude: [uses create_issue tool]
✓ Created issue #157
   Title: Add rate limiting to /api/users endpoint
   Labels: enhancement
   Assignee: @marek
   URL: https://github.com/yourorg/repo/issues/157
```

Marek nie przełącza się do przeglądarki — wszystko dzieje się w kontekście rozmowy. Claude widzi historię i komentarze, więc może od razu zaproponować poprawkę.

---

### Przykład 2: Google Drive server — dla marketera

**Konfiguracja OAuth (wyższa złożoność)**

Instalacja Google Drive jest trudniejsza niż GitHub, bo wymaga przepływu OAuth w Google Cloud Console:

**Ogólny zarys (szczegóły w dokumentacji):**

1. **Stwórz projekt w Google Cloud Console**
   - https://console.cloud.google.com
   - Włącz Google Drive API

2. **Wygeneruj dane uwierzytelniające OAuth (credentials)**
   - Typ: OAuth 2.0 Client ID
   - Application type: Desktop app
   - Pobierz `credentials.json`

3. **Zainstaluj serwer:**
   ```bash
   claude mcp add --transport stdio gdrive -- npx -y @modelcontextprotocol/server-gdrive
   ```

4. **Autoryzuj (pierwsze użycie):**
   - Serwer otworzy przeglądarkę
   - Zaloguj się do Google
   - Zezwól na dostęp
   - Token zostanie zapisany lokalnie

**Załóżmy że masz już działający serwer** (szczegółowy tutorial OAuth znajdziesz w dokumentacji MCP).

**Co możesz zrobić:**

[PRZYKŁAD: Ania (marketer) używa Google Drive server]

```
Ania: Analyze the "Campaign Performance Q1" spreadsheet in my Drive.
Show me which channels had best ROI.

Claude: [uses google-drive server]
Reading spreadsheet "Campaign Performance Q1"...

ROI Analysis by Channel:
1. Email: 480% ROI ($12,000 revenue / $2,500 spent)
2. LinkedIn Ads: 220% ROI ($8,800 / $4,000)
3. Google Ads: 180% ROI ($7,200 / $4,000)
4. Facebook: 120% ROI ($3,600 / $3,000)

Recommendation: Double down on Email marketing. Consider reducing Facebook budget.

Ania: Create a summary doc with these findings and share it with the team

Claude: [creates Google Doc]
✓ Created "Q1 Campaign ROI Summary"
✓ Shared with team@company.com
📄 https://docs.google.com/document/d/...
```

Ania nie eksportuje CSV, nie kopiuje danych do ChatGPT (gdzie mogą wyciec), nie robi ręcznych obliczeń. Dane zostają na miejscu, obliczenia robi Claude.

---

### Przykład 3: Slack server — dla PM

> **Uwaga:** Pakiet `@modelcontextprotocol/server-slack` jest zarchiwizowany. Szukaj aktywnie utrzymywanych alternatyw w katalogu serwerów MCP: https://github.com/modelcontextprotocol/servers

**Konfiguracja bota Slack (średnia złożoność)**

**Krok 1: Stwórz Slack App**

1. Idź do: https://api.slack.com/apps
2. Kliknij "Create New App"
3. Wybierz "From scratch"
4. Nazwa: "Claude MCP Bot"
5. Wybierz workspace

**Krok 2: Dodaj uprawnienia (scopes)**

W sekcji "OAuth & Permissions" dodaj Bot Token Scopes:
- `channels:history` (czytanie wiadomości z publicznych kanałów)
- `channels:read` (lista kanałów)
- `chat:write` (wysyłanie wiadomości)
- `users:read` (odczyt profili użytkowników)

**Krok 3: Zainstaluj app do workspace**

Kliknij "Install to Workspace" i autoryzuj.

**Krok 4: Skopiuj tokeny**

Po instalacji zobaczysz:
- **Bot User OAuth Token:** `xoxb-YOUR-BOT-TOKEN-HERE`
- **Team ID:** znajdziesz w ustawieniach workspace (np. `T1234ABCD`)

**Krok 5: Dodaj do konfiguracji**

```json
{
  "mcpServers": {
    "slack": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"],
      "env": {
        "SLACK_BOT_TOKEN": "${SLACK_BOT_TOKEN}",
        "SLACK_TEAM_ID": "${SLACK_TEAM_ID}"
      }
    }
  }
}
```

Tokeny ustaw przez `.claude/settings.local.json` (polecane) lub zmienne środowiskowe:
```bash
# .claude/settings.local.json (polecane)
# { "env": { "SLACK_BOT_TOKEN": "xoxb-twoj-prawdziwy-token", "SLACK_TEAM_ID": "T1234ABCD" } }

# Lub w .env (pamiętaj: wymaga ręcznego załadowania, np. direnv)
SLACK_BOT_TOKEN=xoxb-twoj-prawdziwy-token
SLACK_TEAM_ID=T1234ABCD
```

**Krok 6: Zaproś bota do kanału**

W Slack, na kanale który chcesz monitorować (np. #dev-team):
```
/invite @Claude MCP Bot
```

Bez tego bot nie będzie widział wiadomości (zabezpieczenia Slacka).

**Co możesz zrobić:**

[PRZYKŁAD: Kasia (PM) używa Slack server]

```
Kasia: Check #dev-team channel from last 3 days.
Are there any blockers for the release?

Claude: [reads Slack via MCP]
Scanning #dev-team messages (Feb 13-16)...

Found 2 potential blockers:
1. @tom (Feb 14): "Migration script failing on production DB - investigating"
   Status: 🔴 UNRESOLVED (no follow-up for 2 days)

2. @sarah (Feb 15): "Need design approval for checkout flow before deploying"
   Status: 🟡 WAITING (pinged @design-team yesterday)

Kasia: Post a message to #dev-team asking Tom for migration update

Claude: [sends message]
✓ Posted to #dev-team:
"@tom Hi! Checking in on the production migration issue from Feb 14.
Do we have an update? This might block tomorrow's release. - Kasia"
```

Zamiast przewijać 200 wiadomości na Slacku, Kasia dostaje gotową wstępną selekcję — tylko blokery i tematy wymagające reakcji.

---

### Przykład 4: SQLite server — dla analityka

> **Uwaga:** Pakiet `@modelcontextprotocol/server-sqlite` jest zarchiwizowany. Szukaj aktywnie utrzymywanych alternatyw w katalogu serwerów MCP: https://github.com/modelcontextprotocol/servers

**Konfiguracja (najprostsza ze wszystkich)**

SQLite to lokalny plik bazy danych — nie wymaga tokenów ani OAuth. Tylko ścieżka do pliku.

**Krok 1: Sprawdź czy masz bazę SQLite**

Jeśli nie masz, stwórz testową:

```bash
sqlite3 ~/data/sales.db
```

W SQLite console:
```sql
CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT, email TEXT);
INSERT INTO customers VALUES (1, 'John Doe', 'john@example.com');
INSERT INTO customers VALUES (2, 'Jane Smith', 'jane@example.com');
.quit
```

**Krok 2: Dodaj do konfiguracji**

```json
{
  "mcpServers": {
    "sqlite": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-sqlite",
        "/Users/twoja-nazwa/data/sales.db"
      ]
    }
  }
}
```

**Ważne:** Ścieżka musi być **absolutna** (pełna), nie względna:
- ✅ `/Users/twoja-nazwa/data/sales.db`
- ❌ `~/data/sales.db` (tilde nie zawsze działa w JSON)
- ❌ `./sales.db` (względna ścieżka)

**Krok 3: Dla wielu baz danych**

Możesz dodać wiele serwerów SQLite:

```json
{
  "mcpServers": {
    "sales-db": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "/Users/twoja-nazwa/data/sales.db"]
    },
    "users-db": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "/Users/twoja-nazwa/data/users.db"]
    }
  }
}
```

Każda baza ma własne połączenie.

**Co możesz zrobić:**

[PRZYKŁAD: Piotr (analityk) używa SQLite server]

```
Piotr: Show me the schema of the database

Claude: [uses sqlite server - query_database tool]
Database schema (sales.db):

Tables:
- customers (id, name, email, created_at)
- orders (id, customer_id, total, status, created_at)
- order_items (id, order_id, product_id, quantity, price)
- products (id, name, category, price)

Piotr: What was the average order value in January 2025?

Claude: [generates and executes SQL]
Running: SELECT AVG(total) FROM orders
         WHERE created_at >= '2025-01-01'
         AND created_at < '2025-02-01'

Average order value in January 2025: $127.45
Based on 1,247 orders

Piotr: Show top 5 products by revenue

Claude: [complex SQL with JOIN]
Running: SELECT p.name, SUM(oi.quantity * oi.price) as revenue
         FROM products p
         JOIN order_items oi ON p.id = oi.product_id
         JOIN orders o ON oi.order_id = o.id
         WHERE o.created_at >= '2025-01-01'
         GROUP BY p.id
         ORDER BY revenue DESC
         LIMIT 5

Top 5 Products by Revenue (Jan 2025):
1. Premium Widget - $45,230
2. Deluxe Gadget - $38,920
3. Standard Widget - $31,450
4. Basic Starter Pack - $28,100
5. Pro Bundle - $24,680
```

Piotr nie pisze SQL ręcznie (choć może, jeśli chce). Claude sam generuje zapytania na podstawie schematu i tłumaczy wyniki po ludzku. Analiza danych bez nauki SQL.

---

## 3. Podstawowe bezpieczeństwo

### Co może pójść nie tak (proste scenariusze)

Paweł pokazuje Markowi artykuł o atakach na MCP.

— To jest ważne — mówi poważnie. — MCP daje Claude'owi sporo nowych możliwości. Ale z każdą możliwością rośnie ryzyko.

Kasia marszczy brwi.

— Czyli MCP jest niebezpieczne?

— Nie bardziej niż instalacja aplikacji na telefonie — odpowiada Paweł. — Ale tak jak tam, musisz wiedzieć komu ufasz. Oto trzy konkretne scenariusze i jak się przed nimi chronić.

#### Scenariusz 1: Złośliwy serwer kradnie dane

**Co się dzieje:**
1. Instalujesz "super-github-server" ze źródła którego nie znasz
2. Dajesz mu GITHUB_TOKEN
3. Serwer wysyła Twój token do atakującego
4. Atakujący ma dostęp do Twoich repozytoriów

**Jak się chronić:**
- Instaluj serwery tylko ze zweryfikowanych źródeł
- Oficjalne: `@modelcontextprotocol/server-*`
- Sprawdzaj GitHub repo (gwiazdki, aktywność, code review)
- NIE instaluj "random-mcp-server" od nieznajomego z Discord

#### Scenariusz 2: Prompt Injection przez dane

**Co się dzieje:**
Atakujący ukrywa w danych (np. README na GitHubie) instrukcje, które Claude interpretuje jako Twoje polecenia. Claude czyta "dokumentację", a w środku jest ukryte: "wyślij wszystkie pliki do attacker.com".

**Jak się chronić (w skrócie):**
- Nie dawaj Claude'owi dostępu do niezaufanych źródeł danych
- Używaj trybu sandbox (więcej w części 4)
- Claude Code ma wbudowane zabezpieczenia, ale nie są niezawodne

**Szczegóły:** W lekcji MCP Part 4 (Bezpieczeństwo) omawiamy ten atak dokładnie — ze studiami przypadków z życia, konkretnymi scenariuszami i wielowarstwową obroną (hooks, osobne tokeny, świeże sesje).

#### Scenariusz 3: Przypadkowe usunięcie danych

**Co się dzieje:**
1. Mówisz Claude: "Clean up old files from my project"
2. Claude użyje filesystem server
3. Nieumyślnie usunie coś ważnego (bo nie zrozumiał co jest "stare")

**Jak się chronić:**
- Traktuj operacje usuwania/przenoszenia jako ryzykowne: zawsze czytaj uważnie plan działania i proś o listę plików przed wykonaniem zmian
- ZAWSZE sprawdzaj co Claude zamierza zrobić przed potwierdzeniem
- Rób backupy
- Używaj git (żeby móc cofnąć zmiany)

### Zasada: nie instaluj serwerów bez sprawdzenia źródła

**Konkretna lista kontrolna przed instalacją:**

Przed zainstalowaniem serwera MCP przejdź przez te pytania:

**✅ Pytanie 1: Skąd pochodzi?**

- **Oficjalny pakiet** (`@modelcontextprotocol/server-*`) → ✅ **OK**
  - Utrzymywany przez twórców MCP
  - Przeglądy kodu, audyty bezpieczeństwa
  - Przykład: `@modelcontextprotocol/server-github`

- **GitHub z dużą społecznością** (1000+ stars, aktywny development) → ⚠️ **Prawdopodobnie OK**
  - Sprawdź współtwórców (znane osoby?)
  - Przeczytaj zgłoszenia (issues) (są sygnały o problemach bezpieczeństwa?)
  - Przykład: serwer społecznościowy z 5k stars i 200 współtwórcami

- **"Random blog post" / mały projekt** (< 100 stars) → 🔴 **Sprawdź dokładnie kod**
  - Przeczytaj CAŁY kod (szczególnie co robi z tokenami)
  - Szukaj podejrzanych połączeń sieciowych
  - Sprawdź zależności (czy ciągnie dziwne paczki?)

- **Binarny / zamknięty kod** → 🚫 **NIE instaluj**

**✅ Pytanie 2: Jakie ma uprawnienia?**

- **Tylko czyta pliki** (read-only filesystem) → 🟢 Niskie ryzyko
  - Najgorsze co może: wyciek danych które czytasz

- **Może pisać do bazy / plików** → 🟡 Średnie ryzyko
  - Może zepsuć/usunąć dane
  - ZAWSZE testuj najpierw na kopii/sandbox

- **Wymaga tokena do API** (GitHub, Stripe, AWS) → 🔴 Wysokie ryzyko
  - Token = klucze do królestwa
  - Złośliwy serwer może ukraść token i wysłać atakującemu
  - **TYLKO zaufane źródła!**

**✅ Pytanie 3: Czy mogę przeczytać kod?**

- **Open source, kod na GitHub** → ✅ Możesz zweryfikować
  - Zajrzyj do `src/` lub `index.js`
  - Szukaj: `fetch()`, `axios`, `http.request` — gdzie wysyła dane?
  - Szukaj: `process.env` — jakie zmienne środowiskowe czyta?

- **Binarny / zamknięty / obfuskowany** → 🚫 Nie instaluj
  - Nie możesz sprawdzić co robi
  - "Czarna skrzynka" = nieakceptowalne ryzyko

**Praktyczny przykład decyzji:**

```
Serwer: "awesome-notion-mcp" (znaleziony na blogu)
- Stars: 47 (mało)
- Contributors: 1 osoba (autor bloga)
- Wymaga: NOTION_API_KEY (wysoki dostęp)
- Kod: dostępny na GitHub

DECYZJA:
1. Przeczytaj kod (zajmie 15 minut)
2. Sprawdź czy NOTION_API_KEY jest wysyłany gdzieś poza Notion API
3. Sprawdź dependencies: `npm ls` - czy są podejrzane paczki?
4. Jeśli OK → testuj na throwaway workspace (nie produkcji)
5. Jeśli wszystko działa dobrze przez tydzień → można użyć na produkcji
```

### .gitignore dla konfiguracji z sekretami

**Historia prawdziwa (setki przypadków na GitHubie):**

Developer dodaje GitHub token do konfiguracji. Commituje. Pushuje do publicznego repo. Za 15 minut boty skanujące GitHub znajdują token. Za godzinę atakujący ma dostęp do wszystkich repozytoriów firmy. Token musi zostać odwołany, wszyscy developerzy zmieniają hasła, security incident report...

**Jak tego uniknąć:**

**❌ ZŁE podejście (commitowanie sekretów):**

Token wpisany bezpośrednio w konfiguracji — prosta droga do wycieku:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_sekretny_token_123abc"
      }
    }
  }
}
```

Gdy to commitniesz:
- Token trafia do git history (nawet jak potem usuniesz)
- Każdy kto ma dostęp do repo widzi token
- Jeśli repo publiczne = token w rękach atakujących

**✅ DOBRE podejście 1: Zmienne środowiskowe**

W konfiguracji użyj placeholdera `${GITHUB_TOKEN}` — wartość zostanie pobrana ze zmiennych środowiskowych (ustawionych przez `.claude/settings.local.json`, `export` w terminalu, lub narzędzia typu `direnv`):

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

```bash
# .env (NIE commitowane - dodane do .gitignore)
# UWAGA: Claude Code nie ładuje .env automatycznie!
# Użyj direnv, dotenv, lub ręcznie: source .env && claude
GITHUB_TOKEN=ghp_sekretny_token_123abc
SLACK_BOT_TOKEN=xoxb-prawdziwy-token
OPENAI_API_KEY=sk-prawdziwy-klucz
```

```gitignore
# .gitignore
.env
.env.local
.env.*.local
.claude/settings.local.json
**/secrets.json
**/*.secret.json
```

**✅ DOBRE podejście 2: Lokalne nadpisanie (dla konfiguracji zespołowej)**

Plik `.claude/settings.json` (commitowany — config dla zespołu):

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

Plik `.claude/settings.local.json` (NIE commitowany — Twoje osobiste sekrety):

```json
{
  "env": {
    "GITHUB_TOKEN": "ghp_twoj_prawdziwy_token",
    "SLACK_BOT_TOKEN": "xoxb_twoj_prawdziwy_token"
  }
}
```

W `.gitignore`:

```gitignore
.claude/settings.local.json
```

**Instrukcje dla zespołu (w README):**

```markdown
## Konfiguracja serwerów MCP

1. Skopiuj `.env.example` do `.env`
2. Uzupełnij tokeny:
   - GITHUB_TOKEN: pobierz z https://github.com/settings/tokens
   - SLACK_BOT_TOKEN: pobierz z https://api.slack.com/apps
3. Nigdy nie commituj `.env` do gita!
```

**Weryfikacja że nie wyciekły sekrety:**

```bash
# Przed commitem sprawdź:
git diff

# Szukaj wzorców:
grep -r "ghp_" .
grep -r "xoxb-" .
grep -r "sk-" .

# Jeśli znajdziesz = usuń przed commitem!
```

Windows (PowerShell):
```powershell
git diff
Select-String -Path . -Pattern "ghp_", "xoxb-", "sk-" -Recurse
```

### Sandbox — czy MCP działa poza nim?

Marek pyta:

— Czekaj, w lekcji o Bash mówiliśmy że Claude działa w sandboxie. MCP też?

Paweł kiwa głową.

— To zależy. Serwery MCP które używają `stdio` (lokalne procesy) działają poza sandboxem, bo to osobne programy. Claude Code je uruchamia, ale sam serwer nie jest sandboxowany.

— Czyli mogą zrobić co chcą? — dziwi się Marek.

— Teoretycznie tak. Dlatego instaluj tylko zaufane serwery. To jak instalacja aplikacji na telefonie — dajesz jej uprawnienia, musisz ufać autorowi.

**Bash vs MCP — sandbox**

**Bash commands w Claude Code:**
- ✅ Uruchamiane **W** sandboxie (domyślnie)
- ✅ Ograniczone uprawnienia:
  - Czytanie: wszędzie
  - Pisanie: tylko w katalogach projektu + /tmp
- ✅ Claude kontroluje **CO** uruchomić (model decyduje)
- ✅ Sandbox może blokować niebezpieczne operacje

**Przykład:**
```bash
# Claude uruchamia w sandbox:
rm -rf /
# → Zablokowane przez sandbox (nie może pisać poza projektem)
```

**MCP servers:**
- ⚠️ Uruchamiane **POZA** sandboxem (osobny proces)
- ⚠️ Pełne uprawnienia (jakie dasz w konfiguracji)
- ⚠️ **TY** kontrolujesz które serwery uruchomić (wybór przy instalacji)
- ⚠️ Serwer może robić wszystko co normalny program

**Przykład:**
```javascript
// Złośliwy MCP server (gdyby taki zainstalował):
const fs = require('fs');
fs.unlinkSync('/ważny-plik.txt'); // Usunie plik bez pytania
```

**Dlaczego taka różnica?**

Bash commands to **reaktywne** narzędzie — Claude decyduje "teraz uruchomię to polecenie" w odpowiedzi na Twoją prośbę. Możesz zastosować sandbox, bo każda komenda przechodzi przez filtr.

MCP servers to **stałe** połączenia — serwer działa cały czas w tle, niezależnie od Claude. Musisz mu ufać jak aplikacji którą instalujesz na komputerze.

**Analogia:** Bash to wpuszczenie gościa na chwilę — pilnujesz go. MCP to oddanie kluczy do domu — musisz ufać.

---

## Słowniczek

**stdio (Standard Input/Output)**
Sposób komunikacji między procesami przez "rurki" (pipes) w systemie. Używany dla lokalnych serwerów MCP (szybki, bez sieci).

**OAuth**
Protokół autoryzacji który pozwala aplikacji dostać ograniczone uprawnienia do Twojego konta bez podawania hasła. Przykład: "Zezwól GitHub serverowi czytać issues w moim imieniu".

**Scope (zakres uprawnień)**
Lista rzeczy które token/aplikacja może robić. Przykład GitHub scopes: `repo` (dostęp do kodu), `issues` (dostęp do issues), `admin` (pełna kontrola).

**CLI (Command Line Interface)**
Interfejs wiersza poleceń. W kontekście MCP: `claude mcp add`, `claude mcp logs`, itp.

**Token (API token)**
Sekretny klucz który daje dostęp do API zewnętrznego serwisu. Przykład: GitHub token `ghp_xxx`, Slack token `xoxb-xxx`. Traktuj jak hasło — NIGDY nie commituj do git!

**Environment variable (zmienna środowiskowa)**
Wartość dostępna w systemie operacyjnym, używana do przechowywania konfiguracji i sekretów. Przykład: `GITHUB_TOKEN=ghp_xxx`. Zapisywane w `.env`.

**npx**
Narzędzie z npm które uruchamia pakiety Node.js bez instalowania ich globalnie. Przykład: `npx -y @modelcontextprotocol/server-github` pobierze i uruchomi serwer.

**Transport**
Sposób komunikacji między MCP Client i Server. `stdio` = lokalne połączenie przez standardowe wejście/wyjście. `http` = zdalne połączenie przez HTTP.

**npm (Node Package Manager)**
Rejestr pakietów dla JavaScript i Node.js — zawiera setki tysięcy gotowych bibliotek i narzędzi. `npx` to wbudowane w npm narzędzie do uruchamiania pakietów bez instalowania ich globalnie.

**LTS (Long-Term Support)**
Wersja oprogramowania z wydłużonym wsparciem technicznym (poprawki bezpieczeństwa przez kilka lat). Dla Node.js: zalecana wersja do regularnego użytku. Przykład: `v20.11.0 LTS`.

**EDA (Exploratory Data Analysis)**
Wstępna analiza danych — szybkie przeglądanie, podsumowywanie i wizualizacja zbioru danych, zanim zaczniesz właściwą analizę lub raport.

---

## Pierwszy serwer działa — co dalej?

Marek patrzy na swój działający filesystem server.

— Okej, mam pierwszy serwer MCP — mówi. — Claude widzi moje pliki, może je czytać i analizować.

Kasia dodaje:

— I widziałam setupy dla GitHub, Google Drive, Slack, SQLite. Każdy służy do czegoś innego, ale zasada ta sama: zainstaluj, skonfiguruj, używaj.

Paweł kiwa głową.

— Dokładnie. A najważniejsze:

**Do zapamiętania:**

1. **Serwer filesystem = najlepszy start** — lokalny, bezpieczny, użyteczny
2. **Weryfikuj źródło** — tylko zaufane serwery MCP, sprawdzaj kod przed instalacją
3. **NIGDY nie commituj sekretów** — używaj `.env` + `.gitignore`
4. **MCP działa poza sandboxem** — musisz ufać serwerowi jak aplikacji na telefonie
5. **`/mcp` i `claude mcp logs`** — Twoje narzędzia do diagnozowania problemów

W następnej lekcji (MCP Part 3 - Konfiguracja i Optymalizacja):

- Hierarchia konfiguracji: Managed, Project, User, Local — gdzie co zapisywać
- Problem "MCP Tax" — dlaczego 20 serwerów zjada 50% kontekstu
- Optymalizacja tokenów — jak trzymać zużycie poniżej 60%
- Zaawansowane rozwiązywanie problemów z `--mcp-debug`

---

## Dokumentacja

**MCP Protocol:**
- Wprowadzenie: https://modelcontextprotocol.io/introduction
- Architektura: https://modelcontextprotocol.io/docs/learn/architecture

**Claude Code:**
- Konfiguracja MCP: https://code.claude.com/docs/en/mcp-overview
- Katalog serwerów MCP: https://github.com/modelcontextprotocol/servers

**Bezpieczeństwo:**
- MCP Security Best Practices: https://checkmarx.com/zero-post/11-emerging-ai-security-risks-with-mcp-model-context-protocol/

**Oficjalne serwery:**
- Filesystem: https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem
- GitHub: https://github.com/modelcontextprotocol/servers/tree/main/src/github
- Slack: https://github.com/modelcontextprotocol/servers/tree/main/src/slack
- SQLite: https://github.com/modelcontextprotocol/servers/tree/main/src/sqlite

---

**Następna lekcja:** Lekcja 11 – MCP Part 3: Konfiguracja i Optymalizacja
**Poprzednia lekcja:** Lekcja 09 – MCP Part 1: Podstawy i Architektura
