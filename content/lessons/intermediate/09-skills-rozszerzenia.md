---
title: "Skills - rozszerzanie możliwości Claude Code"
description: "Jak używać i tworzyć skills aby dodawać nowe funkcjonalności do Claude Code"
duration: 18
difficulty: intermediate
tags: [skills, rozszerzenia, plugins, customizacja]
---

# Skills - rozszerzanie możliwości Claude Code

## Wprowadzenie

Skills to system rozszerzeń w Claude Code, który pozwala dodawać nowe możliwości bez modyfikowania samego narzędzia. Możesz instalować gotowe skills stworzone przez społeczność lub tworzyć własne dla specyficznych potrzeb Twojego projektu.

Skills działają podobnie do plugins w innych narzędziach - dodają nowe komendy, narzędzia i funkcjonalności, które można wywoływać podczas pracy z Claude Code.

## Dlaczego to ważne?

**Rozszerzalność:** Dodaj funkcjonalności specyficzne dla Twojego projektu bez czekania na oficjalne wsparcie.

**Reużywalność:** Raz napisany skill może być używany w wielu projektach.

**Społeczność:** Korzystaj ze skills stworzonych przez innych lub dziel się swoimi.

**Integracje:** Łatwo integruj Claude Code z innymi narzędziami i usługami.

## Struktura Skills

### Lokalizacja

Skills przechowywane są w `.claude/skills/`:

```
projekt/
├── .claude/
│   └── skills/
│       ├── database/
│       │   ├── skill.json
│       │   └── scripts/
│       ├── deploy/
│       │   ├── skill.json
│       │   └── scripts/
│       └── custom-lint/
│           ├── skill.json
│           └── run.sh
```

### Format skill.json

```json
{
  "name": "database",
  "version": "1.0.0",
  "description": "Database management utilities",
  "author": "Your Name",
  "commands": [
    {
      "name": "migrate",
      "description": "Run database migrations",
      "script": "./scripts/migrate.sh"
    },
    {
      "name": "seed",
      "description": "Seed database with test data",
      "script": "./scripts/seed.sh"
    },
    {
      "name": "reset",
      "description": "Reset database to clean state",
      "script": "./scripts/reset.sh"
    }
  ],
  "dependencies": {
    "psql": "required",
    "node": ">=18.0.0"
  }
}
```

## Przykłady Skills

### Przykład 1: Database Skill

**.claude/skills/database/skill.json:**
```json
{
  "name": "database",
  "version": "1.0.0",
  "description": "Database management",
  "commands": [
    {
      "name": "migrate",
      "description": "Run migrations",
      "script": "./scripts/migrate.sh"
    },
    {
      "name": "status",
      "description": "Check migration status",
      "script": "./scripts/status.sh"
    }
  ]
}
```

**.claude/skills/database/scripts/migrate.sh:**
```bash
#!/bin/bash

echo "🗄️  Running database migrations..."

# Run Prisma migrations
npx prisma migrate dev

if [ $? -eq 0 ]; then
    echo "✅ Migrations completed successfully!"
else
    echo "❌ Migration failed!"
    exit 1
fi
```

**Użycie:**
```
Ty: Uruchom migracje bazy danych

Claude Code: [Wykrywa database skill]
             Używam skill: database:migrate

             🗄️  Running database migrations...
             Applying migration: 001_initial
             Applying migration: 002_add_users
             ✅ Migrations completed successfully!
```

### Przykład 2: Deployment Skill

**.claude/skills/deploy/skill.json:**
```json
{
  "name": "deploy",
  "version": "1.0.0",
  "description": "Deployment utilities",
  "commands": [
    {
      "name": "staging",
      "description": "Deploy to staging",
      "script": "./scripts/deploy-staging.sh"
    },
    {
      "name": "production",
      "description": "Deploy to production",
      "script": "./scripts/deploy-production.sh",
      "confirmation": true
    },
    {
      "name": "rollback",
      "description": "Rollback last deployment",
      "script": "./scripts/rollback.sh"
    }
  ]
}
```

**.claude/skills/deploy/scripts/deploy-staging.sh:**
```bash
#!/bin/bash

echo "🚀 Deploying to staging..."

# Build
npm run build

# Run tests
npm test

# Deploy to staging
echo "Pushing to staging server..."
git push staging main

echo "✅ Deployed to staging!"
echo "URL: https://staging.example.com"
```

**Użycie:**
```
Ty: Wdróż na staging

Claude Code: [Używa deploy skill]
             Uruchamiam deploy:staging...

             🚀 Deploying to staging...
             Building... ✓
             Testing... ✓
             Pushing to staging server... ✓
             ✅ Deployed to staging!
             URL: https://staging.example.com
```

### Przykład 3: Code Quality Skill

**.claude/skills/quality/skill.json:**
```json
{
  "name": "quality",
  "version": "1.0.0",
  "description": "Code quality checks",
  "commands": [
    {
      "name": "check",
      "description": "Run all quality checks",
      "script": "./scripts/check-all.sh"
    },
    {
      "name": "complexity",
      "description": "Check code complexity",
      "script": "./scripts/complexity.sh"
    },
    {
      "name": "coverage",
      "description": "Check test coverage",
      "script": "./scripts/coverage.sh"
    }
  ]
}
```

**.claude/skills/quality/scripts/check-all.sh:**
```bash
#!/bin/bash

echo "📊 Running code quality checks..."

# 1. Linter
echo "1/4 - Linting..."
npm run lint
LINT_EXIT=$?

# 2. Type check
echo "2/4 - Type checking..."
npx tsc --noEmit
TYPE_EXIT=$?

# 3. Tests + coverage
echo "3/4 - Testing with coverage..."
npm test -- --coverage
TEST_EXIT=$?

# 4. Complexity
echo "4/4 - Checking complexity..."
npx complexity-report src/
COMPLEXITY_EXIT=$?

# Summary
echo ""
echo "📊 Quality Report:"
[ $LINT_EXIT -eq 0 ] && echo "✅ Lint: PASS" || echo "❌ Lint: FAIL"
[ $TYPE_EXIT -eq 0 ] && echo "✅ Types: PASS" || echo "❌ Types: FAIL"
[ $TEST_EXIT -eq 0 ] && echo "✅ Tests: PASS" || echo "❌ Tests: FAIL"
[ $COMPLEXITY_EXIT -eq 0 ] && echo "✅ Complexity: PASS" || echo "❌ Complexity: FAIL"

if [ $LINT_EXIT -ne 0 ] || [ $TYPE_EXIT -ne 0 ] || [ $TEST_EXIT -ne 0 ]; then
    exit 1
fi

echo ""
echo "✅ All quality checks passed!"
```

### Przykład 4: Documentation Skill

**.claude/skills/docs/skill.json:**
```json
{
  "name": "docs",
  "version": "1.0.0",
  "description": "Documentation utilities",
  "commands": [
    {
      "name": "generate",
      "description": "Generate API documentation",
      "script": "./scripts/generate-docs.sh"
    },
    {
      "name": "serve",
      "description": "Serve docs locally",
      "script": "./scripts/serve-docs.sh"
    },
    {
      "name": "validate",
      "description": "Validate documentation",
      "script": "./scripts/validate-docs.sh"
    }
  ]
}
```

## Tworzenie własnego Skill

### Krok 1: Struktura podstawowa

```bash
mkdir -p .claude/skills/my-skill/scripts
cd .claude/skills/my-skill
```

### Krok 2: Utwórz skill.json

```json
{
  "name": "my-skill",
  "version": "1.0.0",
  "description": "My custom skill",
  "commands": [
    {
      "name": "action",
      "description": "Perform custom action",
      "script": "./scripts/action.sh"
    }
  ]
}
```

### Krok 3: Utwórz skrypt

**scripts/action.sh:**
```bash
#!/bin/bash

echo "Running my custom action..."

# Your logic here

echo "Done!"
```

### Krok 4: Nadaj uprawnienia

```bash
chmod +x scripts/action.sh
```

### Krok 5: Testuj

```
Ty: Użyj my-skill action

Claude Code: Running my custom action...
             Done!
```

## Zaawansowane techniki

### 1. Skills z parametrami

**skill.json:**
```json
{
  "commands": [
    {
      "name": "deploy",
      "description": "Deploy to environment",
      "script": "./scripts/deploy.sh",
      "args": {
        "environment": {
          "type": "string",
          "required": true,
          "options": ["dev", "staging", "production"]
        }
      }
    }
  ]
}
```

**scripts/deploy.sh:**
```bash
#!/bin/bash

ENV=$1

echo "Deploying to $ENV..."
# Deployment logic based on $ENV
```

### 2. Skills dependencies check

**scripts/check-deps.sh:**
```bash
#!/bin/bash

# Check if required tools are available
command -v docker >/dev/null 2>&1 || {
    echo "❌ Docker is required but not installed."
    exit 1
}

command -v kubectl >/dev/null 2>&1 || {
    echo "❌ kubectl is required but not installed."
    exit 1
}

echo "✅ All dependencies available"
```

### 3. Interactive Skills

```bash
#!/bin/bash

echo "Select database to migrate:"
echo "1) Development"
echo "2) Staging"
read -p "Choice: " choice

case $choice in
    1) DB_URL=$DEV_DB_URL ;;
    2) DB_URL=$STAGING_DB_URL ;;
    *) echo "Invalid choice"; exit 1 ;;
esac

echo "Migrating $DB_URL..."
```

## Sharing Skills z zespołem

### 1. Commituj do repo

```bash
git add .claude/skills/
git commit -m "Add database management skill"
git push
```

### 2. Dokumentuj skill

**README.md w folderze skill:**
```markdown
# Database Skill

Database management utilities for this project.

## Commands

- `database:migrate` - Run migrations
- `database:seed` - Seed test data
- `database:reset` - Reset to clean state

## Setup

Requires PostgreSQL client installed.
```

### 3. Versioning

```json
{
  "version": "1.2.0",
  "changelog": {
    "1.2.0": "Added rollback support",
    "1.1.0": "Added seed command",
    "1.0.0": "Initial release"
  }
}
```

## Best Practices

### ✅ Dobre praktyki

1. **Jeden skill = jedna odpowiedzialność**
2. **Dokumentuj każdy command**
3. **Sprawdzaj dependencies**
4. **Używaj exit codes prawidłowo** (0 = success, >0 = error)
5. **Informuj użytkownika o postępie**

### ❌ Anty-wzorce

1. Zbyt duże, monolityczne skills
2. Brak error handling
3. Hardcoded paths i credentials
4. Brak dokumentacji

## Zadanie praktyczne

### Zadanie 1: Prosty skill

1. Stwórz skill "hello" z komendą "greet"
2. Skrypt powinien wyświetlić "Hello from my skill!"
3. Przetestuj wywołując skill

### Zadanie 2: Użyteczny skill

1. Stwórz skill "project" z komendami:
   - `status` - pokazuje git status, npm outdated
   - `clean` - usuwa node_modules, dist, cache
   - `reset` - clean + npm install

### Zadanie 3: Skill z parametrami

1. Stwórz skill który przyjmuje nazwę środowiska
2. Wyświetla konfigurację dla tego środowiska

**Oczekiwany rezultat:**
- Działające własne skills
- Automatyzacja specyficznych zadań projektu
- Zrozumienie jak rozszerzać Claude Code

## Dodatkowe materiały

### Oficjalna dokumentacja
- [Skills Guide](https://docs.claude.com/en/docs/claude-code/skills)
- [Creating Skills](https://docs.claude.com/en/docs/claude-code/creating-skills)
- [Skills Best Practices](https://docs.claude.com/en/docs/claude-code/skills-best-practices)

### Przykłady z community
- [GitHub - Claude Code Skills](https://github.com/search?q=claude+skills)
- [Awesome Claude Skills](https://github.com/topics/claude-code-skills)

## Podsumowanie

W tej lekcji nauczyłeś się:
- Czym są skills i jak działają
- Struktury skill (skill.json + scripts)
- Jak tworzyć własne skills
- Przykładów praktycznych skills
- Jak dzielić się skills z zespołem

Skills to potężny sposób na dostosowanie Claude Code do specyficznych potrzeb Twojego projektu!

---

**Ilustracje:** (do dodania)
- Struktura folderu .claude/skills/
- Przykład skill.json z adnotacjami
- Flow diagram: Wywołanie → Skill → Skrypt → Rezultat
