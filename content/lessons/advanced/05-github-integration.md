---
title: "GitHub Integration - PR i Issues"
description: "Zaawansowana integracja Claude Code z GitHub: automatyzacja PR, issues i code review"
duration: 25
difficulty: advanced
tags: [github, integration, pr, issues, automation]
---

# GitHub Integration - PR i Issues

## Wprowadzenie

GitHub to centrum współpracy dla większości projektów open-source i komercyjnych. Claude Code oferuje głęboką integrację z GitHub, pozwalając na automatyzację wielu powtarzalnych zadań związanych z pull requests, issues, code review i zarządzaniem projektami.

W tej lekcji nauczysz się wykorzystywać Claude Code do maksymalizacji produktywności pracy z GitHub.

## Dlaczego to ważne?

Praca z GitHub może być czasochłonna:
- Tworzenie szczegółowych opisów PR
- Przeglądanie i komentowanie kodu
- Zarządzanie issues
- Synchronizacja z lokalnym kodem
- Trackowanie zmian

Claude Code może zautomatyzować lub znacząco przyspieszyć wszystkie te zadania.

## Możliwości integracji

Claude Code oferuje:
- **Natywną integrację `gh` CLI** - dostępną od razu
- **MCP GitHub Server** - zaawansowane funkcje (opcjonalne)
- **Bezpośrednie API calls** - przez WebFetch (dla specjalnych przypadków)

## Część 1: Natywna integracja z `gh` CLI

### Setup GitHub CLI

```bash
# Instalacja (macOS)
brew install gh

# Linux
sudo apt install gh

# Windows
winget install GitHub.cli

# Logowanie
gh auth login
```

### Podstawowe operacje

Claude Code ma dostęp do `gh` przez narzędzie Bash:

#### Listowanie Pull Requests

```
user: Pokaż mi wszystkie otwarte PR w tym repo
assistant: [Wywołuje: gh pr list --state open]

user: Jakie PR czekają na mój review?
assistant: [Wywołuje: gh pr list --search "review-requested:@me"]
```

#### Tworzenie Pull Request

```
user: Stwórz pull request z tej branchy
assistant: [Analizuje zmiany z git diff, tworzy opis, następnie:]
          [Wywołuje: gh pr create --title "..." --body "..."]
```

**Ważne**: Claude Code automatycznie:
1. Sprawdza `git diff` aby zrozumieć zmiany
2. Analizuje commit history
3. Generuje szczegółowy opis PR
4. Dodaje odpowiednie labele (jeśli skonfigurowane)

#### Przeglądanie PR

```
user: Pokaż mi szczegóły PR #123
assistant: [Wywołuje: gh pr view 123]

user: Pokaż diff dla PR #123
assistant: [Wywołuje: gh pr diff 123]

user: Wylistuj wszystkie komentarze w PR #123
assistant: [Wywołuje: gh pr view 123 --comments]
```

#### Merge i zamykanie

```
user: Zmerguj PR #123 jeśli wszystkie checks przeszły
assistant: [Sprawdza status checks, następnie:]
          [Wywołuje: gh pr merge 123 --squash]

user: Zamknij PR #456 bez mergowania
assistant: [Wywołuje: gh pr close 456]
```

### Praca z Issues

#### Tworzenie Issues

```
user: Stwórz issue z tytułem "Bug: Login nie działa" i opisem z moich notatek
assistant: [Wywołuje: gh issue create --title "..." --body "..."]
```

#### Zarządzanie Issues

```
user: Pokaż wszystkie issues przypisane do mnie
assistant: [Wywołuje: gh issue list --assignee @me]

user: Zamknij issue #789
assistant: [Wywołuje: gh issue close 789]

user: Dodaj label "bug" do issue #789
assistant: [Wywołuje: gh issue edit 789 --add-label "bug"]
```

## Część 2: Zaawansowane workflow z MCP GitHub Server

MCP GitHub Server oferuje bogatsze funkcjonalności niż samo `gh` CLI.

### Instalacja MCP GitHub Server

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

### Zaawansowane funkcje

#### 1. Analiza zmian w PR

```
user: Przeanalizuj wszystkie zmiany w PR #123 i znajdź potencjalne problemy
assistant: [Używa mcp__github__get_pr_files]
          [Analizuje każdy plik pod kątem:]
          - Security issues
          - Code smells
          - Breaking changes
          - Missing tests
```

#### 2. Automatyczny Code Review

```
user: Zrób code review PR #123 i dodaj komentarze
assistant: [Używa mcp__github__get_pr_diff]
          [Analizuje kod i dodaje komentarze przez mcp__github__add_review_comment]
```

Przykładowy workflow:

```typescript
// Claude Code automatycznie:
// 1. Pobiera diff
// 2. Identyfikuje problemy:
//    - Brak error handling
//    - Nieoptymalne zapytania DB
//    - Brakująca walidacja
// 3. Dodaje inline comments w odpowiednich liniach
// 4. Submituje review z podsumowaniem
```

#### 3. Pull Request Templates

```
user: Stwórz PR według naszego template
assistant: [Czyta .github/pull_request_template.md]
          [Wypełnia template na podstawie zmian]
          [Tworzy PR z kompletnym opisem]
```

#### 4. Zarządzanie Projects

```
user: Dodaj ten issue do projektu "Q1 2025"
assistant: [Używa mcp__github__add_issue_to_project]

user: Przenieś issue #456 do kolumny "In Progress"
assistant: [Używa mcp__github__move_project_card]
```

## Część 3: Zaawansowane Use Cases

### Use Case 1: Automatyczne Release Notes

```
user: Wygeneruj release notes dla wersji v2.0.0
assistant: [Workflow:]
```

1. Pobiera wszystkie PR zmergowane od ostatniego taga
2. Kategoryzuje zmiany: Features, Bug Fixes, Breaking Changes
3. Generuje changelog w formacie Markdown
4. Opcjonalnie: tworzy GitHub Release

Przykładowy kod prompta:

```
user: Na podstawie zmergowanych PR od v1.9.0 do main, wygeneruj release notes dla v2.0.0 w formacie:
     ## Features
     ## Bug Fixes
     ## Breaking Changes

     Dla każdego PR dodaj link i autora
```

### Use Case 2: PR Health Check

```
user: Sprawdź czy PR #123 jest gotowy do merge
assistant: [Sprawdza:]
```

- ✅ Wszystkie CI/CD checks przeszły
- ✅ Co najmniej 2 approvals
- ✅ Brak konfliktów
- ✅ Branch jest up-to-date z main
- ✅ Wszystkie konwersacje resolved
- ❌ Brak testów dla nowych features → ⚠️ Ostrzeżenie

### Use Case 3: Issue Triage

```
user: Przeanalizuj wszystkie nowe issues i zasugeruj labele oraz assignees
assistant: [Dla każdego issue:]
```

1. Analizuje tytuł i opis
2. Identyfikuje typ (bug, feature, docs)
3. Sugeruje odpowiedni label
4. Sprawdza kod i sugeruje właściwego assignee
5. Opcjonalnie: automatycznie przypisuje proste issues

### Use Case 4: Dependency Updates Review

```
user: Przejrzyj PR od Dependabota i oceń czy można zmergować
assistant: [Analizuje:]
```

1. Sprawdza changelogi dependencies
2. Szuka breaking changes
3. Weryfikuje czy testy przeszły
4. Sprawdza security advisories
5. Rekomenduje: merge / merge with caution / requires manual review

## Część 4: Best Practices

### 1. Standardowe commit messages

Używaj Conventional Commits:

```
user: Commitnij zmiany używając Conventional Commits
assistant: [Analizuje zmiany i tworzy:]
          feat: add user authentication

          - Implement JWT token generation
          - Add login/logout endpoints
          - Update tests
```

### 2. PR Templates

Stwórz `.github/pull_request_template.md`:

```markdown
## Description
<!-- Opisz zmiany -->

## Type of change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change

## Testing
<!-- Jak przetestowano? -->

## Checklist
- [ ] Tests added
- [ ] Documentation updated
- [ ] No console.log() statements
```

Claude Code automatycznie wypełni template:

```
user: Stwórz PR z wypełnionym template
assistant: [Analizuje zmiany i wypełnia każdą sekcję template]
```

### 3. Automated reviews

Konfiguruj Claude Code do automatycznego review:

```
user: Zrób quick review tego PR - sprawdź tylko security i performance
assistant: [Focus tylko na:]
          - SQL injection risks
          - XSS vulnerabilities
          - N+1 queries
          - Memory leaks
```

### 4. Branch protection

```
user: Sprawdź czy settings branch protection dla main są prawidłowe
assistant: [Używa: gh api repos/:owner/:repo/branches/main/protection]
          [Weryfikuje:]
          - Require PR reviews: ✅
          - Require status checks: ✅
          - Require branches up to date: ✅
          - Include administrators: ❌ ⚠️ Rekomendacja: włącz
```

## Kiedy używać której metody?

| Zadanie | gh CLI | MCP Server | WebFetch |
|---------|--------|------------|----------|
| Tworzenie PR | ⭐⭐⭐ | ⭐⭐ | ⭐ |
| Code review | ⭐ | ⭐⭐⭐ | ⭐ |
| Zarządzanie issues | ⭐⭐⭐ | ⭐⭐ | ⭐ |
| Analityka repo | ⭐ | ⭐⭐⭐ | ⭐⭐ |
| GitHub Actions | ⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| Bulk operations | ⭐⭐ | ⭐⭐⭐ | ⭐ |

## Troubleshooting

### Problem: "gh: command not found"

```bash
# Sprawdź instalację
which gh

# Reinstaluj jeśli potrzeba
brew reinstall gh
gh auth login
```

### Problem: "API rate limit exceeded"

```bash
# Sprawdź limit
gh api rate_limit

# Użyj tokenu z wyższym limitem
gh auth login --with-token < token.txt
```

### Problem: MCP server nie widzi repo

Sprawdź czy:
1. Token ma odpowiednie scope: `repo`, `read:org`
2. Jesteś w katalogu z git repo
3. Remote jest skonfigurowany: `git remote -v`

## Zadanie praktyczne

**Cel**: Zautomatyzuj swój GitHub workflow

### Część 1: Setup (5 min)

1. Zainstaluj i skonfiguruj `gh` CLI
2. Przetestuj: `gh auth status`

### Część 2: Basic Operations (10 min)

W swoim projekcie:

```
user: Pokaż wszystkie moje otwarte PR
user: [Jeśli są PR] Przeanalizuj PR #X i powiedz czy jest gotowy do merge
user: [Jeśli nie ma] Stwórz nową branch, dodaj drobną zmianę i stwórz draft PR
```

### Część 3: Advanced (10 min)

```
user: Stwórz issue z tytułem "Test automation enhancement" i szczegółowym opisem
user: Dodaj do tego issue labele: "enhancement", "good first issue"
user: Znajdź wszystkie issues z labelem "bug" utworzone w ostatnim miesiącu
```

### Część 4: Code Review Practice

Jeśli masz dostęp do repo z otwartymi PR:

```
user: Zrób code review PR #[numer], skup się na:
     - Bezpieczeństwie
     - Testowalności kodu
     - Dokumentacji

     Dodaj konstruktywne komentarze
```

### Jak Claude Code może Ci pomóc?

```
user: Jak mogę zautomatyzować tworzenie release notes?
user: Pokaż mi najlepsze praktyki dla PR descriptions
user: Stwórz template dla issue reports w moim projekcie
user: Jaki workflow polecasz dla code review z Claude Code?
```

## Podsumowanie

GitHub integration w Claude Code to potężne narzędzie do:
- Automatyzacji powtarzalnych zadań
- Przyspieszenia code review
- Lepszego zarządzania issues i PR
- Standaryzacji procesów zespołowych

Kluczowe umiejętności:
1. Używanie `gh` CLI przez Claude Code
2. Automatyczne tworzenie PR z inteligentymi opisami
3. Code review przez AI
4. Zarządzanie issues i projects
5. Integracja z CI/CD workflows

## Dodatkowe materiały

### Oficjalna dokumentacja
- [GitHub CLI Manual](https://cli.github.com/manual/)
- [GitHub API Documentation](https://docs.github.com/en/rest)
- [MCP GitHub Server](https://github.com/modelcontextprotocol/servers/tree/main/src/github)

### Narzędzia
- [GitHub CLI Extensions](https://github.com/topics/gh-extension) - rozszerzenia dla gh
- [Act](https://github.com/nektos/act) - lokalne testowanie GitHub Actions

### Best Practices
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)

### Artykuły
- [Automating GitHub Workflows with AI](https://github.blog/ai-automation)
- [Code Review Best Practices](https://google.github.io/eng-practices/review/)

---

**Czas trwania**: ~25 minut
**Poziom**: Zaawansowany
**Wymagania**: Git, GitHub account, podstawy CI/CD
