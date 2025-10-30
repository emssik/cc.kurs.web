---
title: "Najpopularniejsze serwery MCP"
description: "Przegląd najbardziej użytecznych MCP servers i ich praktyczne zastosowania"
duration: 25
difficulty: advanced
tags: [mcp, servers, narzędzia, integracje]
---

# Najpopularniejsze serwery MCP

## Wprowadzenie

Ekosystem MCP rozrasta się każdego dnia. W tej lekcji poznasz najpopularniejsze i najbardziej przydatne serwery MCP, które mogą znacząco zwiększyć Twoją produktywność. Dla każdego serwera omówimy przypadki użycia, instalację i przykłady praktyczne.

## Dlaczego to ważne?

Zamiast tworzyć własne integracje od zera, możesz skorzystać z gotowych, przetestowanych serwerów MCP. Znajomość dostępnych serwerów pozwala:
- Szybko zintegrować popularne narzędzia
- Uniknąć reinventowania koła
- Korzystać z best practices społeczności
- Zaoszczędzić czas na rozwój

## 1. MCP Server: Filesystem

### Opis
Rozszerzony dostęp do systemu plików z dodatkowymi funkcjami jak wyszukiwanie semantyczne, obsługa różnych formatów plików i zarządzanie uprawnieniami.

### Instalacja
```bash
npm install -g @modelcontextprotocol/server-filesystem
```

### Konfiguracja
```json
{
  "mcpServers": {
    "docs": {
      "command": "mcp-server-filesystem",
      "args": ["/Users/username/Documents"],
      "env": {}
    }
  }
}
```

### Przypadki użycia
- Praca z dokumentacją w określonym katalogu
- Zarządzanie plikami projektowymi
- Dostęp do katalogów poza projektem
- Semantic search w dużych zbiorach plików

### Przykład
```
user: Znajdź wszystkie pliki PDF w moich dokumentach zawierające słowo "invoice" z ostatnich 30 dni
assistant: [Używa mcp__filesystem__search]
```

## 2. MCP Server: GitHub

### Opis
Pełna integracja z GitHub - repozytoria, issues, pull requests, actions, discussions.

### Instalacja
```bash
npm install -g @modelcontextprotocol/server-github
```

### Konfiguracja
```json
{
  "mcpServers": {
    "github": {
      "command": "mcp-server-github",
      "args": [],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

### Przypadki użycia
- Automatyzacja zarządzania issues
- Tworzenie i przeglądanie PR
- Analiza commit history
- Zarządzanie GitHub Actions
- Code review workflow

### Przykład
```
user: Stwórz issue w repo anthropics/claude-code z tytułem "Feature request: Dark mode" i opisem z moich notatek
assistant: [Używa mcp__github__create_issue]

user: Pokaż mi wszystkie otwarte PR w moich repozytoriach
assistant: [Używa mcp__github__list_pull_requests]
```

## 3. MCP Server: PostgreSQL

### Opis
Pełna integracja z bazą danych PostgreSQL - zapytania, eksploracja schematów, migrations.

### Instalacja
```bash
npm install -g @modelcontextprotocol/server-postgres
```

### Konfiguracja
```json
{
  "mcpServers": {
    "postgres": {
      "command": "mcp-server-postgres",
      "args": [],
      "env": {
        "POSTGRES_CONNECTION_STRING": "${POSTGRES_URL}"
      }
    }
  }
}
```

### Przypadki użycia
- Eksploracja schematów bazy danych
- Wykonywanie zapytań SQL
- Analiza danych
- Debugowanie problemów z bazą
- Tworzenie i modyfikacja tabel

### Przykład
```
user: Pokaż mi schemat tabeli users w bazie danych
assistant: [Używa mcp__postgres__describe_table]

user: Znajdź wszystkich użytkowników, którzy zarejestrowali się w ostatnim tygodniu
assistant: [Używa mcp__postgres__query]
```

## 4. MCP Server: Slack

### Opis
Integracja z Slack - wysyłanie wiadomości, czytanie kanałów, zarządzanie workspace.

### Instalacja
```bash
npm install -g @modelcontextprotocol/server-slack
```

### Konfiguracja
```json
{
  "mcpServers": {
    "slack": {
      "command": "mcp-server-slack",
      "args": [],
      "env": {
        "SLACK_BOT_TOKEN": "${SLACK_BOT_TOKEN}",
        "SLACK_TEAM_ID": "${SLACK_TEAM_ID}"
      }
    }
  }
}
```

### Przypadki użycia
- Automatyzacja powiadomień
- Monitoring kanałów
- Tworzenie raportów z konwersacji
- Integracja z workflow projektowym

### Przykład
```
user: Wyślij wiadomość na kanał #engineering że deploy do production się udał
assistant: [Używa mcp__slack__post_message]

user: Podsumuj dyskusję z kanału #planning z ostatniego tygodnia
assistant: [Używa mcp__slack__read_messages i analizuje treść]
```

## 5. MCP Server: Google Drive

### Opis
Dostęp do plików na Google Drive - czytanie, tworzenie, aktualizacja dokumentów.

### Instalacja
```bash
npm install -g @modelcontextprotocol/server-gdrive
```

### Konfiguracja (wymaga OAuth setup)
```json
{
  "mcpServers": {
    "gdrive": {
      "command": "mcp-server-gdrive",
      "args": [],
      "env": {
        "GDRIVE_CLIENT_ID": "${GDRIVE_CLIENT_ID}",
        "GDRIVE_CLIENT_SECRET": "${GDRIVE_CLIENT_SECRET}",
        "GDRIVE_REFRESH_TOKEN": "${GDRIVE_REFRESH_TOKEN}"
      }
    }
  }
}
```

### Przypadki użycia
- Praca z dokumentami zespołowymi
- Synchronizacja dokumentacji
- Backup kodu do Drive
- Analiza spreadsheetów

### Przykład
```
user: Otwórz dokument "Project Requirements" z mojego Drive i podsumuj kluczowe punkty
assistant: [Używa mcp__gdrive__read_document]
```

## 6. MCP Server: Puppeteer (Web Automation)

### Opis
Automatyzacja przeglądarki - scraping, testowanie, screenshots, PDF generation.

### Instalacja
```bash
npm install -g @modelcontextprotocol/server-puppeteer
```

### Konfiguracja
```json
{
  "mcpServers": {
    "browser": {
      "command": "mcp-server-puppeteer",
      "args": [],
      "env": {}
    }
  }
}
```

### Przypadki użycia
- Web scraping
- Automatyczne testowanie UI
- Generowanie PDF z stron web
- Screenshots dla dokumentacji
- Monitoring zmian na stronach

### Przykład
```
user: Zrób screenshot głównej strony example.com i zapisz jako PNG
assistant: [Używa mcp__puppeteer__screenshot]

user: Sprawdź czy formularz logowania na staging.myapp.com działa poprawnie
assistant: [Używa mcp__puppeteer__test]
```

## 7. MCP Server: SQLite

### Opis
Integracja z bazami SQLite - idealna do lokalnych baz, prototypów, testów.

### Instalacja
```bash
npm install -g @modelcontextprotocol/server-sqlite
```

### Konfiguracja
```json
{
  "mcpServers": {
    "sqlite": {
      "command": "mcp-server-sqlite",
      "args": ["./local-database.db"],
      "env": {}
    }
  }
}
```

### Przypadki użycia
- Praca z lokalnymi bazami danych
- Prototypowanie schematów
- Migracje danych
- Analiza danych w plikach .db

### Przykład
```
user: Importuj dane z CSV do tabeli users w mojej SQLite bazie
assistant: [Używa mcp__sqlite__import]
```

## 8. MCP Server: Memory (Kontekst persistence)

### Opis
Długoterminowa pamięć dla Claude Code - zapamiętywanie preferencji, kontekstu projektu, wcześniejszych decyzji.

### Instalacja
```bash
npm install -g @modelcontextprotocol/server-memory
```

### Konfiguracja
```json
{
  "mcpServers": {
    "memory": {
      "command": "mcp-server-memory",
      "args": [],
      "env": {
        "MEMORY_STORAGE_PATH": "~/.claude-code-memory"
      }
    }
  }
}
```

### Przypadki użycia
- Zapamiętywanie stylów kodowania
- Kontekst projektowy między sesjami
- Preferencje użytkownika
- Historia decyzji architektonicznych

### Przykład
```
user: Zapamiętaj, że w tym projekcie używamy ESLint z konfiguracją Airbnb
assistant: [Używa mcp__memory__store]

[Nowa sesja Claude Code]
user: Dodaj nowy plik JavaScript
assistant: [Sprawdza mcp__memory__retrieve i automatycznie dodaje ESLint config]
```

## Porównanie - Który serwer wybrać?

| Serwer | Trudność setup | Częstość użycia | Must-have dla |
|--------|----------------|-----------------|---------------|
| Filesystem | ⭐ Łatwy | ⭐⭐⭐ Częste | Każdego |
| GitHub | ⭐⭐ Średni | ⭐⭐⭐ Częste | Developerów |
| PostgreSQL | ⭐⭐ Średni | ⭐⭐ Umiarkowane | Backend devs |
| Slack | ⭐⭐⭐ Trudny | ⭐⭐ Umiarkowane | Zespołów |
| Google Drive | ⭐⭐⭐ Trudny | ⭐⭐ Umiarkowane | Zespołów |
| Puppeteer | ⭐⭐ Średni | ⭐ Rzadkie | QA/Testers |
| SQLite | ⭐ Łatwy | ⭐⭐ Umiarkowane | Prototyping |
| Memory | ⭐ Łatwy | ⭐⭐⭐ Częste | Każdego |

## Kiedy używać wielu serwerów jednocześnie?

### Scenariusz 1: Full-stack development
```json
{
  "mcpServers": {
    "github": {...},
    "postgres": {...},
    "filesystem": {...},
    "memory": {...}
  }
}
```

### Scenariusz 2: DevOps workflow
```json
{
  "mcpServers": {
    "github": {...},
    "slack": {...},
    "puppeteer": {...}
  }
}
```

### Scenariusz 3: Data analysis
```json
{
  "mcpServers": {
    "postgres": {...},
    "sqlite": {...},
    "gdrive": {...}
  }
}
```

## Zadanie praktyczne

**Cel**: Zainstaluj i przetestuj 3 serwery MCP dostosowane do Twojego workflow

### Część 1: Analiza potrzeb (5 min)

Odpowiedz na pytania:
1. Z jakich zewnętrznych serwisów korzystasz najczęściej w pracy?
2. Które powtarzalne zadania chciałbyś zautomatyzować?
3. Jakie dane często przetwarzasz?

### Część 2: Instalacja (10 min)

Na podstawie analizy wybierz 3 serwery i zainstaluj je:

**Minimalna rekomendacja dla każdego:**
- `filesystem` - zawsze przydatny
- `memory` - pamięć między sesjami
- `github` lub `postgres` - zależnie od specjalizacji

### Część 3: Test (5 min)

Dla każdego zainstalowanego serwera wykonaj test:

```
user: Pokaż mi wszystkie narzędzia mcp__ dostępne dla [nazwa serwera]
user: Wykonaj przykładową operację używając [narzędzie]
```

### Część 4: Dokumentacja (5 min)

Stwórz w swoim projekcie plik `MCP-SETUP.md` dokumentujący:
- Które serwery zainstalowałeś
- Dlaczego je wybrałeś
- Przykłady użycia specyficzne dla Twojego projektu

### Jak Claude Code może Ci pomóc?

```
user: Pomóż mi wybrać odpowiednie MCP servers dla projektu [opis projektu]
user: Jakie są najlepsze praktyki używania [nazwa serwera]?
user: Pokaż mi przykłady zaawansowanego użycia mcp__[nazwa]__[narzędzie]
```

## Podsumowanie

Poznałeś 8 najpopularniejszych serwerów MCP i ich zastosowania. Kluczowe wnioski:

1. **Zacznij od basics**: filesystem + memory + github/postgres
2. **Dodawaj stopniowo**: tylko te serwery, których rzeczywiście potrzebujesz
3. **Dokumentuj**: prowadź listę zainstalowanych serwerów i ich konfiguracji
4. **Eksperymentuj**: testuj nowe serwery w izolowanych projektach

W następnej lekcji nauczymy się tworzyć własne MCP servers od podstaw.

## Dodatkowe materiały

### Repozytoria oficjalne
- [MCP Servers Repository](https://github.com/modelcontextprotocol/servers) - pełna lista oficjalnych serwerów
- [Community Servers](https://github.com/topics/mcp-server) - serwery od społeczności

### Dokumentacje poszczególnych serwerów
- [PostgreSQL MCP Server](https://github.com/modelcontextprotocol/servers/tree/main/src/postgres)
- [GitHub MCP Server](https://github.com/modelcontextprotocol/servers/tree/main/src/github)
- [Filesystem MCP Server](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem)

### Artykuły
- [10 Must-Have MCP Servers for Developers](https://blog.anthropic.com/mcp-top-servers)
- [Building a Productive MCP Setup](https://dev.to/claude-code-mcp-setup)

### Video tutorials
- [MCP Servers Complete Guide](https://youtube.com/watch?v=example1)
- [Setting Up Your First 5 MCP Servers](https://youtube.com/watch?v=example2)

---

**Czas trwania**: ~25 minut
**Poziom**: Zaawansowany
**Wymagania**: Ukończone lekcje 01-02, doświadczenie z API i integracjami
