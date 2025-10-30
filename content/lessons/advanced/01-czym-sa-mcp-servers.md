---
title: "Czym są MCP servers"
description: "Wprowadzenie do Model Context Protocol i serwerów MCP w Claude Code"
duration: 15
difficulty: advanced
tags: [mcp, servers, integracje, zaawansowane]
---

# Czym są MCP servers

## Wprowadzenie

Model Context Protocol (MCP) to otwarty standard stworzony przez Anthropic, który umożliwia Claude Code połączenie z zewnętrznymi źródłami danych i narzędziami. MCP servers działają jako mosty między Claude Code a różnymi systemami - bazami danych, API, plikami, usługami w chmurze i wieloma innymi.

Dzięki MCP servers możesz rozszerzyć możliwości Claude Code daleko poza standardowe narzędzia (Read, Write, Bash), dodając spersonalizowane integracje dostosowane do Twojego workflow.

## Dlaczego to ważne?

MCP servers są kluczowe dla zaawansowanych użytkowników, ponieważ:

- **Rozszerzalność**: Możesz dodać dowolne źródło danych lub narzędzie
- **Standaryzacja**: Jeden protokół dla wszystkich integracji
- **Bezpieczeństwo**: Kontrolowana ekspozycja danych i uprawnień
- **Ekosystem**: Rosnąca biblioteka gotowych serwerów od społeczności
- **Produktywność**: Automatyzacja zadań wymagających dostępu do zewnętrznych systemów

## Kiedy używać MCP servers?

### ✅ Używaj, gdy:

- Musisz często łączyć się z bazą danych (PostgreSQL, MongoDB)
- Pracujesz z zewnętrznymi API (GitHub, Slack, Jira)
- Potrzebujesz dostępu do zasobów firmowych (intranety, wewnętrzne systemy)
- Chcesz zautomatyzować powtarzalne zadania z konkretnymi narzędziami
- Integrujesz Claude Code z własnym stack'iem technologicznym

### ❌ Nie używaj, gdy:

- Standardowe narzędzia Claude Code (Read, Write, Bash) wystarczają
- Potrzebujesz jednorazowego dostępu (lepiej użyć WebFetch)
- Nie masz uprawnień do instalacji dodatkowego oprogramowania
- System, z którym chcesz się połączyć, nie ma API ani interfejsu

## Jak działają MCP servers?

MCP server to proces działający w tle, który:

1. **Nasłuchuje** na żądania od Claude Code
2. **Tłumaczy** te żądania na operacje w zewnętrznym systemie
3. **Zwraca** wyniki z powrotem do Claude Code w ustandaryzowanym formacie

```
Claude Code
    ↓
    ↓ (MCP Protocol)
    ↓
MCP Server (np. PostgreSQL)
    ↓
    ↓ (SQL)
    ↓
PostgreSQL Database
```

## Przykład praktyczny: MCP Server dla GitHub

Wyobraź sobie, że często pracujesz z GitHub i chcesz, aby Claude Code mógł:
- Listować issues w repo
- Tworzyć pull requesty
- Czytać komentarze w PR

Zamiast robić to ręcznie przez `gh` CLI lub WebFetch, możesz zainstalować **MCP server dla GitHub**, który doda te funkcje jako natywne narzędzia Claude Code.

### Instalacja MCP server dla GitHub

```bash
# 1. Instalacja serwera przez npm
npm install -g @modelcontextprotocol/server-github

# 2. Konfiguracja w Claude Code settings
# Dodaj do swojego pliku konfiguracyjnego MCP:
{
  "mcpServers": {
    "github": {
      "command": "mcp-server-github",
      "args": [],
      "env": {
        "GITHUB_TOKEN": "ghp_twoj_token_tutaj"
      }
    }
  }
}
```

### Użycie po instalacji

Po zainstalowaniu i skonfigurowaniu, Claude Code automatycznie zyska nowe narzędzia:

```
user: Pokaż mi otwarte issues w repozytorium anthropics/claude-code
assistant: [Używa narzędzia mcp__github__list_issues]

user: Stwórz pull request z tej branchy
assistant: [Używa narzędzia mcp__github__create_pull_request]
```

## Typy MCP servers

### 1. **Database servers**
- PostgreSQL, MySQL, MongoDB
- Wykonywanie zapytań SQL/NoSQL
- Eksploracja schematów

### 2. **API servers**
- GitHub, GitLab, Jira, Slack
- Integracje z popularnymi usługami
- Automatyzacja workflow

### 3. **File system servers**
- Dostęp do specyficznych lokalizacji
- Integracje z chmurą (Google Drive, Dropbox)
- Wyszukiwanie semantyczne w plikach

### 4. **Custom servers**
- Twoje własne narzędzia
- Dostęp do firmowych systemów
- Spersonalizowane integracje

## Zadanie praktyczne

**Cel**: Zrozum, jak Claude Code "widzi" MCP servers

1. Otwórz Claude Code w swoim projekcie
2. Uruchom komendę, aby sprawdzić dostępne narzędzia:
   ```
   user: Jakie narzędzia masz dostępne? Wymień wszystkie, które zaczynają się od "mcp__"
   ```
3. Jeśli nie masz żadnych MCP servers, zobaczysz tylko standardowe narzędzia
4. Zapisz listę - w następnej lekcji nauczymy się instalować pierwszy serwer MCP

**Opcjonalnie**: Jeśli już masz zainstalowane MCP servers, poproś Claude Code o:
```
user: Wyjaśnij mi, co robi każde z dostępnych narzędzi MCP
```

### Jak Claude Code może Ci pomóc?

Claude Code ma dostęp do dokumentacji MCP przez WebSearch. Możesz zapytać:
- "Pokaż mi listę dostępnych MCP servers w oficjalnym repozytorium"
- "Jak zainstalować MCP server dla [konkretna usługa]?"
- "Jakie są najlepsze praktyki konfiguracji MCP servers?"

## Podsumowanie

MCP servers to potężne rozszerzenia, które przekształcają Claude Code w hub integracyjny dla Twojego całego stack'u technologicznego. W kolejnych lekcjach nauczysz się:
- Instalować i konfigurować MCP servers
- Używać najpopularniejszych serwerów
- Tworzyć własne MCP servers od podstaw

## Dodatkowe materiały

### Oficjalna dokumentacja
- [Model Context Protocol Specification](https://spec.modelcontextprotocol.io/)
- [MCP Servers Repository](https://github.com/modelcontextprotocol/servers)
- [Claude Code MCP Documentation](https://docs.claude.com/claude-code/mcp)

### Artykuły i tutoriale
- [Introducing Model Context Protocol (blog Anthropic)](https://www.anthropic.com/news/model-context-protocol)
- [Building Your First MCP Server](https://modelcontextprotocol.io/tutorials/building-your-first-server)

### Community
- [MCP Discord Server](https://discord.gg/anthropic)
- [r/ClaudeCode subreddit](https://reddit.com/r/ClaudeCode)

---

**Czas trwania**: ~15 minut
**Poziom**: Zaawansowany
**Wymagania**: Znajomość podstaw Claude Code, doświadczenie z terminalem
