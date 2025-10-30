---
title: "Instalacja i konfiguracja MCP servers"
description: "Krok po kroku: jak zainstalować i skonfigurować pierwszy MCP server w Claude Code"
duration: 20
difficulty: advanced
tags: [mcp, instalacja, konfiguracja, setup]
---

# Instalacja i konfiguracja MCP servers

## Wprowadzenie

W poprzedniej lekcji poznaliśmy czym są MCP servers. Teraz nauczymy się, jak zainstalować i skonfigurować pierwszy serwer MCP w Claude Code. Przejdziemy przez proces instalacji na przykładzie serwera PostgreSQL, ale zasady są podobne dla wszystkich serwerów MCP.

## Dlaczego to ważne?

Prawidłowa instalacja i konfiguracja MCP servers to fundament skutecznej pracy z zaawansowanymi integracjami. Nieprawidłowa konfiguracja może prowadzić do:
- Problemów z bezpieczeństwem (np. niechronione tokeny)
- Błędów połączenia
- Nieefektywnej pracy Claude Code
- Trudności w debugowaniu

## Wymagania wstępne

Przed instalacją MCP servers upewnij się, że masz:

- **Node.js** (wersja 18 lub nowsza) - większość serwerów MCP jest napisanych w Node.js/TypeScript
- **npm** lub **yarn** - menedżer pakietów
- **Claude Code** w najnowszej wersji
- Dostęp do pliku konfiguracyjnego Claude Code

## Architektura konfiguracji

Claude Code przechowuje konfigurację MCP servers w pliku JSON, który zawiera:

```json
{
  "mcpServers": {
    "nazwa-serwera": {
      "command": "komenda-uruchomienia",
      "args": ["argumenty"],
      "env": {
        "ZMIENNA": "wartość"
      }
    }
  }
}
```

### Lokalizacja pliku konfiguracyjnego

- **macOS/Linux**: `~/.config/claude-code/mcp_settings.json`
- **Windows**: `%APPDATA%\claude-code\mcp_settings.json`

## Przykład praktyczny: Instalacja MCP Server dla PostgreSQL

Przeprowadzimy pełną instalację serwera PostgreSQL krok po kroku.

### Krok 1: Instalacja serwera MCP

```bash
# Instalacja globalnie przez npm
npm install -g @modelcontextprotocol/server-postgres

# LUB lokalnie w projekcie
npm install --save-dev @modelcontextprotocol/server-postgres
```

### Krok 2: Przygotowanie połączenia

Upewnij się, że masz:
- Działającą instancję PostgreSQL
- Dane do połączenia: host, port, database, user, password

### Krok 3: Konfiguracja w Claude Code

Otwórz plik konfiguracyjny MCP i dodaj:

```json
{
  "mcpServers": {
    "postgres": {
      "command": "mcp-server-postgres",
      "args": [],
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgresql://user:password@localhost:5432/mydatabase"
      }
    }
  }
}
```

**⚠️ Ważne**: Nigdy nie commituj haseł do repozytorium! Zamiast tego użyj zmiennych środowiskowych:

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

Następnie ustaw `POSTGRES_URL` w swoim `.bashrc` lub `.zshrc`:

```bash
export POSTGRES_URL="postgresql://user:password@localhost:5432/mydatabase"
```

### Krok 4: Restart Claude Code

Po zapisaniu konfiguracji, zrestartuj Claude Code aby załadować nowy serwer MCP.

### Krok 5: Weryfikacja

Zapytaj Claude Code:

```
user: Jakie narzędzia MCP masz dostępne?
```

Powinieneś zobaczyć nowe narzędzia rozpoczynające się od `mcp__postgres__`, np.:
- `mcp__postgres__query`
- `mcp__postgres__list_tables`
- `mcp__postgres__describe_table`

## Konfiguracja zaawansowana

### Używanie wielu serwerów MCP

Możesz skonfigurować wiele serwerów jednocześnie:

```json
{
  "mcpServers": {
    "postgres": {
      "command": "mcp-server-postgres",
      "args": [],
      "env": {
        "POSTGRES_CONNECTION_STRING": "${POSTGRES_URL}"
      }
    },
    "github": {
      "command": "mcp-server-github",
      "args": [],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "filesystem": {
      "command": "mcp-server-filesystem",
      "args": ["/Users/username/Documents"],
      "env": {}
    }
  }
}
```

### Argumenty wiersza poleceń

Niektóre serwery przyjmują argumenty:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "mcp-server-filesystem",
      "args": [
        "/path/to/directory",
        "--read-only",
        "--max-file-size=10MB"
      ],
      "env": {}
    }
  }
}
```

### Timeout i retry

Dla niestabilnych połączeń możesz dodać konfigurację timeout:

```json
{
  "mcpServers": {
    "api-server": {
      "command": "mcp-server-custom-api",
      "args": [],
      "env": {
        "API_URL": "https://api.example.com",
        "TIMEOUT": "30000",
        "MAX_RETRIES": "3"
      }
    }
  }
}
```

## Kiedy używać której metody instalacji?

### Instalacja globalna (`npm install -g`)

✅ **Używaj, gdy:**
- Serwer będzie używany w wielu projektach
- Chcesz prostej konfiguracji
- Nie masz wymagań wersjonowania per-projekt

### Instalacja lokalna (w projekcie)

✅ **Używaj, gdy:**
- Różne projekty potrzebują różnych wersji serwera
- Chcesz commitować konfigurację do repo (bez sekretów!)
- Pracujesz w zespole i chcesz spójnego środowiska

W przypadku instalacji lokalnej, komenda w konfiguracji musi wskazywać na `node_modules`:

```json
{
  "mcpServers": {
    "postgres": {
      "command": "node",
      "args": ["./node_modules/@modelcontextprotocol/server-postgres/dist/index.js"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "${POSTGRES_URL}"
      }
    }
  }
}
```

## Troubleshooting - Najczęstsze problemy

### Problem: "MCP server not found"

**Rozwiązanie:**
- Sprawdź czy serwer jest zainstalowany: `npm list -g @modelcontextprotocol/server-xyz`
- Sprawdź PATH: `which mcp-server-xyz`
- Spróbuj użyć pełnej ścieżki w `command`

### Problem: "Connection refused"

**Rozwiązanie:**
- Sprawdź czy usługa docelowa (np. PostgreSQL) działa
- Zweryfikuj connection string / credentials
- Sprawdź firewall i porty

### Problem: "Environment variable not found"

**Rozwiązanie:**
- Sprawdź czy zmienna jest ustawiona: `echo $NAZWA_ZMIENNEJ`
- Zrestartuj terminal i Claude Code po ustawieniu zmiennych
- Użyj pełnych wartości w konfiguracji (tylko dla testów!)

### Problem: "Permission denied"

**Rozwiązanie:**
- Sprawdź uprawnienia do katalogu konfiguracyjnego
- Dla filesystem servers: sprawdź uprawnienia do katalogów
- Uruchom z odpowiednimi uprawnieniami

## Zadanie praktyczne

**Cel**: Zainstaluj i skonfiguruj swój pierwszy MCP server

### Opcja A: MCP Server dla systemu plików (łatwiejsze)

1. Zainstaluj serwer:
   ```bash
   npm install -g @modelcontextprotocol/server-filesystem
   ```

2. Dodaj konfigurację dla katalogu z dokumentami:
   ```json
   {
     "mcpServers": {
       "docs": {
         "command": "mcp-server-filesystem",
         "args": ["/path/to/your/documents"],
         "env": {}
       }
     }
   }
   ```

3. Zrestartuj Claude Code

4. Przetestuj:
   ```
   user: Jakie pliki znajdują się w moim katalogu dokumentów?
   ```

### Opcja B: MCP Server dla GitHub (bardziej praktyczne)

1. Wygeneruj GitHub Personal Access Token:
   - Idź do: https://github.com/settings/tokens
   - Kliknij "Generate new token (classic)"
   - Zaznacz scope: `repo`, `read:org`
   - Skopiuj token

2. Dodaj token do zmiennych środowiskowych:
   ```bash
   export GITHUB_TOKEN="ghp_your_token_here"
   ```

3. Zainstaluj serwer:
   ```bash
   npm install -g @modelcontextprotocol/server-github
   ```

4. Dodaj konfigurację:
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

5. Zrestartuj Claude Code

6. Przetestuj:
   ```
   user: Pokaż mi moje repozytoria GitHub
   ```

### Jak Claude Code może Ci pomóc?

Podczas instalacji i konfiguracji możesz zapytać Claude Code:
- "Jak zainstalować MCP server dla [nazwa usługi]?"
- "Gdzie znajduje się plik konfiguracyjny MCP na moim systemie?"
- "Debuguj problem z połączeniem do MCP server"
- "Jakie zmienne środowiskowe potrzebuje serwer [nazwa]?"

## Podsumowanie

Gratulacje! Nauczyłeś się:
- Instalować MCP servers (globalnie i lokalnie)
- Konfigurować serwery w Claude Code
- Zarządzać sekretami i zmiennymi środowiskowymi
- Rozwiązywać najczęstsze problemy

W następnej lekcji poznasz najpopularniejsze MCP servers i ich praktyczne zastosowania.

## Dodatkowe materiały

### Oficjalna dokumentacja
- [MCP Configuration Guide](https://docs.claude.com/claude-code/mcp/configuration)
- [MCP Server Development](https://modelcontextprotocol.io/docs/server-development)
- [Environment Variables Best Practices](https://12factor.net/config)

### Narzędzia
- [MCP Inspector](https://github.com/modelcontextprotocol/inspector) - debugowanie serwerów MCP
- [dotenv](https://github.com/motdotla/dotenv) - zarządzanie zmiennymi środowiskowymi

### Społeczność
- [MCP GitHub Discussions](https://github.com/modelcontextprotocol/discussions)
- [Claude Code Discord](https://discord.gg/anthropic) - kanał #mcp-servers

---

**Czas trwania**: ~20 minut
**Poziom**: Zaawansowany
**Wymagania**: Node.js, npm, podstawy terminala
