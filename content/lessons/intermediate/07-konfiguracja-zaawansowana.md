---
title: "Konfiguracja zaawansowana - dostosowanie Claude Code"
description: "Poznaj zaawansowane opcje konfiguracji Claude Code aby dostosować narzędzie do swoich potrzeb"
duration: 20
difficulty: intermediate
tags: [konfiguracja, settings, customizacja, config]
---

# Konfiguracja zaawansowana - dostosowanie Claude Code

## Wprowadzenie

Claude Code oferuje szeroki zakres opcji konfiguracyjnych, które pozwalają dostosować narzędzie do Twoich preferencji i wymagań projektu. W tej lekcji poznasz zaawansowane opcje konfiguracji, które znacząco poprawią Twój workflow i dopasują Claude Code do Twojego stylu pracy.

## Poziomy konfiguracji

Claude Code ma 3 poziomy konfiguracji (priorytet od najwyższego):

1. **Konfiguracja projektu** - `.claude/config.json` w katalogu projektu
2. **Konfiguracja globalna** - `~/.config/claude-code/config.json`
3. **Domyślne wartości** - wbudowane w Claude Code

## Struktura pliku konfiguracyjnego

### Konfiguracja globalna (~/.config/claude-code/config.json)

```json
{
  "model": "claude-sonnet-4",
  "maxTokens": 200000,
  "temperature": 1.0,
  "autoSave": true,
  "editor": "code",
  "language": "pl",
  "theme": "dark"
}
```

### Konfiguracja projektu (.claude/config.json)

```json
{
  "model": "claude-sonnet-4",
  "projectName": "Moja Aplikacja",
  "contextPaths": [
    "src/**/*.ts",
    "README.md",
    "docs/**/*.md"
  ],
  "ignorePaths": [
    "node_modules",
    "dist",
    "*.test.ts"
  ],
  "git": {
    "autoCommit": false,
    "commitTemplate": "🤖 {type}: {message}",
    "branchPrefix": "feature/"
  },
  "tools": {
    "bash": {
      "timeout": 300000,
      "env": {
        "NODE_ENV": "development"
      }
    }
  }
}
```

## Opcje konfiguracji

### Model AI

```json
{
  "model": "claude-sonnet-4",  // Balans - zalecany
  // "model": "claude-opus-4",    // Najlepszy - wolniejszy
  // "model": "claude-haiku-4"    // Najszybszy - prostsze zadania
}
```

**Kiedy zmienić model:**
- Opus: złożone refaktoringi, architektura
- Sonnet: codzienne zadania (domyślny)
- Haiku: proste edycje, szybkie pytania

### Context Paths - co ma wiedzieć Claude Code

```json
{
  "contextPaths": [
    "src/**/*.{ts,tsx}",        // Kod źródłowy
    "package.json",              // Zależności
    "tsconfig.json",             // Konfiguracja TS
    "README.md",                 // Dokumentacja
    "docs/ARCHITECTURE.md"       // Architektura
  ]
}
```

Claude Code automatycznie uwzględni te pliki przy analizie projektu.

### Ignore Paths - co pomijać

```json
{
  "ignorePaths": [
    "node_modules/**",
    "dist/**",
    "build/**",
    "*.log",
    "*.test.ts",              // Nie analizuj testów domyślnie
    "coverage/**",
    ".git/**"
  ]
}
```

**Dlaczego ważne:**
- Szybsze wyszukiwanie
- Mniej noise w wynikach
- Oszczędność tokenów

### Git Integration

```json
{
  "git": {
    "enabled": true,
    "autoCommit": false,            // Czy commitować automatycznie
    "autoStage": true,               // Czy stagować pliki
    "commitTemplate": "🤖 Claude Code: {message}",
    "branchPrefix": "claude/",       // Prefix dla branchy
    "hooks": {
      "preCommit": "npm run lint",   // Hook przed commitem
      "postCommit": "echo 'Done!'"
    }
  }
}
```

### Bash/Terminal Configuration

```json
{
  "tools": {
    "bash": {
      "timeout": 300000,           // 5 minut timeout
      "workingDirectory": "./",
      "shell": "/bin/bash",        // Lub /bin/zsh
      "env": {
        "NODE_ENV": "development",
        "DEBUG": "*"
      }
    }
  }
}
```

### Agent Configuration

```json
{
  "agents": {
    "defaultModel": "sonnet",
    "timeout": 600000,              // 10 minut dla agents
    "parallel": 3                   // Max 3 agents równolegle
  }
}
```

## Praktyczne przykłady

### Przykład 1: Projekt TypeScript + React

**.claude/config.json:**
```json
{
  "projectName": "React App",
  "model": "claude-sonnet-4",
  "contextPaths": [
    "src/**/*.{ts,tsx}",
    "public/index.html",
    "package.json",
    "tsconfig.json",
    "README.md"
  ],
  "ignorePaths": [
    "node_modules/**",
    "build/**",
    "*.test.{ts,tsx}",
    "coverage/**"
  ],
  "git": {
    "commitTemplate": "🚀 {type}({scope}): {message}",
    "branchPrefix": "feature/"
  },
  "tools": {
    "bash": {
      "env": {
        "NODE_ENV": "development",
        "REACT_APP_API_URL": "http://localhost:3001"
      }
    }
  }
}
```

### Przykład 2: Projekt Node.js API

**.claude/config.json:**
```json
{
  "projectName": "API Backend",
  "contextPaths": [
    "src/**/*.ts",
    "prisma/schema.prisma",
    ".env.example",
    "package.json"
  ],
  "ignorePaths": [
    "node_modules/**",
    "dist/**",
    "*.test.ts",
    "logs/**"
  ],
  "git": {
    "commitTemplate": "feat(api): {message}"
  },
  "tools": {
    "bash": {
      "env": {
        "DATABASE_URL": "postgresql://localhost:5432/dev"
      },
      "timeout": 600000
    }
  }
}
```

### Przykład 3: Monorepo

**.claude/config.json:**
```json
{
  "projectName": "Monorepo",
  "contextPaths": [
    "packages/*/src/**/*.ts",
    "packages/*/package.json",
    "package.json",
    "lerna.json"
  ],
  "workspaces": [
    "packages/frontend",
    "packages/backend",
    "packages/shared"
  ]
}
```

## Zaawansowane techniki

### 1. Per-workspace Configuration

Dla monorepo możesz mieć różne configy dla różnych workspace'ów:

```
monorepo/
├── .claude/
│   └── config.json              # Globalna config
├── packages/
│   ├── frontend/
│   │   └── .claude/
│   │       └── config.json      # Config dla frontend
│   └── backend/
│       └── .claude/
│           └── config.json      # Config dla backend
```

### 2. Environment-specific Config

**development.json:**
```json
{
  "model": "claude-haiku-4",     // Szybszy dla dev
  "tools": {
    "bash": {
      "env": {
        "NODE_ENV": "development"
      }
    }
  }
}
```

**production.json:**
```json
{
  "model": "claude-opus-4",      // Najlepszy dla production
  "tools": {
    "bash": {
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

### 3. Team-shared Configuration

Commituj `.claude/config.json` do repo:

```bash
git add .claude/config.json
git commit -m "Add Claude Code team configuration"
```

Każdy w zespole używa tej samej konfiguracji!

## Best Practices

### ✅ Dobre praktyki

1. **Commituj project config**
   ```bash
   git add .claude/
   # Zespół używa tej samej konfiguracji
   ```

2. **Używaj contextPaths**
   - Pomaga Claude Code zrozumieć strukturę projektu
   - Szybsze analizy

3. **Dokumentuj custom settings**
   ```json
   {
     "_comment": "Using Haiku for faster responses in dev",
     "model": "claude-haiku-4"
   }
   ```

4. **Testuj zmiany**
   - Zmiana konfiguracji może wpłynąć na workflow
   - Testuj przed commitowaniem

### ❌ Anty-wzorce

1. **Nie commituj sekretów**
   ```json
   // ❌ NIE RÓB TEGO
   {
     "tools": {
       "bash": {
         "env": {
           "API_KEY": "secret-key-123"  // ❌
         }
       }
     }
   }
   ```

2. **Nie ignoruj zbyt dużo**
   - Claude Code może potrzebować kontekstu z testów

3. **Nie ustawiaj timeout zbyt nisko**
   - Może przerywać długie operacje

## Zadanie praktyczne

### Zadanie 1: Podstawowa konfiguracja

1. Stwórz `.claude/config.json` w swoim projekcie
2. Ustaw:
   - projectName
   - contextPaths (pliki które Claude powinien znać)
   - ignorePaths (node_modules, dist, etc.)

### Zadanie 2: Git integration

1. Dodaj sekcję `git` do konfiguracji
2. Ustaw własny commit template
3. Przetestuj tworząc commit z Claude Code

### Zadanie 3: Environment variables

1. Dodaj custom env variables dla Bash tool
2. Przetestuj czy są dostępne:
   ```
   Ty: Uruchom `echo $MY_CUSTOM_VAR`
   ```

**Oczekiwany rezultat:**
- Działająca konfiguracja projektu
- Claude Code zna strukturę Twojego projektu
- Custom settings działają poprawnie

## Dodatkowe materiały

### Oficjalna dokumentacja
- [Configuration Guide](https://docs.claude.com/en/docs/claude-code/configuration)
- [Config Schema Reference](https://docs.claude.com/en/docs/claude-code/config-schema)
- [Team Setup Guide](https://docs.claude.com/en/docs/claude-code/team-setup)

### Przykłady konfiguracji
- [GitHub - Config Examples](https://github.com/search?q=.claude+config.json)
- [Community Configs](https://github.com/topics/claude-code-config)

## Podsumowanie

W tej lekcji nauczyłeś się:
- Poziomów konfiguracji (global vs project)
- Kluczowych opcji konfiguracyjnych
- Jak dostosować Claude Code do różnych typów projektów
- Jak współdzielić konfigurację w zespole

Dobra konfiguracja to fundament efektywnej pracy z Claude Code. Poświęć czas na jej skonfigurowanie - zwróci się wielokrotnie!

---

**Ilustracje:** (do dodania)
- Diagram poziomów konfiguracji
- Przykład konfiguracji dla różnych typów projektów
