---
title: "Hooks - automatyzacja workflow"
description: "Jak używać hooks do automatyzacji zadań i tworzenia custom workflows w Claude Code"
duration: 22
difficulty: intermediate
tags: [hooks, automatyzacja, workflow, events, triggers]
---

# Hooks - automatyzacja workflow

## Wprowadzenie

Hooks w Claude Code to mechanizm pozwalający na automatyczne wykonywanie komend w odpowiedzi na określone wydarzenia (events). Możesz uruchamiać skrypty przed/po określonych akcjach, walidować zmiany, lub automatyzować repetytywne zadania.

Wyobraź sobie, że przed każdym commitem automatycznie uruchamiają się testy i linter. Albo że po każdej edycji pliku TypeScript automatycznie sprawdzany jest type checking. To właśnie umożliwiają hooks!

## Dlaczego to ważne?

**Automatyzacja:** Eliminuje ręczne wykonywanie powtarzalnych zadań.

**Jakość kodu:** Automatyczne testy i lintery przed commitem zapobiegają błędom.

**Konsystencja:** Każdy w zespole ma te same automated checks.

**Produktywność:** Mniej czasu na rutynę, więcej na rozwój.

## Typy Hooks

### 1. Tool Hooks - reagują na wywołania narzędzi

```json
{
  "hooks": {
    "beforeToolUse": "./scripts/before-tool.sh",
    "afterToolUse": "./scripts/after-tool.sh",
    "onToolError": "./scripts/on-error.sh"
  }
}
```

### 2. File Hooks - reagują na zmiany w plikach

```json
{
  "hooks": {
    "beforeEdit": "./scripts/validate-edit.sh",
    "afterEdit": "./scripts/post-edit.sh",
    "beforeWrite": "./scripts/check-write.sh"
  }
}
```

### 3. Git Hooks - integracja z Git

```json
{
  "hooks": {
    "preCommit": "npm run lint && npm test",
    "postCommit": "echo 'Commit successful!'",
    "prePush": "./scripts/pre-push-checks.sh"
  }
}
```

### 4. Session Hooks - cykl życia sesji

```json
{
  "hooks": {
    "onSessionStart": "./scripts/startup.sh",
    "onSessionEnd": "./scripts/cleanup.sh"
  }
}
```

## Konfiguracja Hooks

### Lokalizacja konfiguracji

Hooks konfiguruje się w `.claude/config.json`:

```json
{
  "hooks": {
    "preCommit": "npm run lint",
    "afterEdit": "./scripts/type-check.sh",
    "onSessionStart": "echo 'Welcome!'"
  }
}
```

### Struktura hook script

**scripts/pre-commit.sh:**
```bash
#!/bin/bash

echo "Running pre-commit hooks..."

# 1. Run linter
npm run lint
if [ $? -ne 0 ]; then
    echo "❌ Linter failed!"
    exit 1
fi

# 2. Run tests
npm test
if [ $? -ne 0 ]; then
    echo "❌ Tests failed!"
    exit 1
fi

# 3. Type check
npx tsc --noEmit
if [ $? -ne 0 ]; then
    echo "❌ Type check failed!"
    exit 1
fi

echo "✅ All pre-commit checks passed!"
exit 0
```

## Praktyczne przykłady

### Przykład 1: Pre-commit Hook z testami

**.claude/config.json:**
```json
{
  "hooks": {
    "preCommit": "./scripts/pre-commit.sh"
  }
}
```

**scripts/pre-commit.sh:**
```bash
#!/bin/bash

echo "🔍 Running pre-commit checks..."

# Lint staged files
echo "1/3 - Linting..."
npm run lint:staged
LINT_EXIT=$?

# Run tests
echo "2/3 - Testing..."
npm test -- --bail --findRelatedTests
TEST_EXIT=$?

# Check for console.log
echo "3/3 - Checking for console.log..."
if git diff --cached | grep -q "console.log"; then
    echo "⚠️  Warning: console.log found in staged files"
    CONSOLE_EXIT=1
else
    CONSOLE_EXIT=0
fi

# Aggregate results
if [ $LINT_EXIT -ne 0 ] || [ $TEST_EXIT -ne 0 ]; then
    echo "❌ Pre-commit checks failed!"
    exit 1
fi

if [ $CONSOLE_EXIT -ne 0 ]; then
    echo "⚠️  Proceeding with warnings"
fi

echo "✅ Pre-commit checks passed!"
exit 0
```

**Użycie:**
```
Ty: Zcommituj zmiany

Claude Code: Przygotowuję commit...
             [Uruchamia pre-commit hook]

             🔍 Running pre-commit checks...
             1/3 - Linting... ✓
             2/3 - Testing... ✓
             3/3 - Checking for console.log... ✓
             ✅ Pre-commit checks passed!

             [Commit utworzony]
```

### Przykład 2: Auto Type-Check po edycji TS

**.claude/config.json:**
```json
{
  "hooks": {
    "afterEdit": "./scripts/type-check.sh"
  }
}
```

**scripts/type-check.sh:**
```bash
#!/bin/bash

# Check if edited file is TypeScript
if [[ $EDITED_FILE == *.ts ]] || [[ $EDITED_FILE == *.tsx ]]; then
    echo "🔎 Type checking $EDITED_FILE..."
    npx tsc --noEmit $EDITED_FILE
    if [ $? -eq 0 ]; then
        echo "✅ No type errors"
    else
        echo "⚠️  Type errors found - review needed"
    fi
fi
```

**Użycie:**
```
Ty: W pliku UserService.ts zmień typ return value na Promise<User[]>

Claude Code: [Edytuje plik]
             [Uruchamia afterEdit hook]

             🔎 Type checking UserService.ts...
             ✅ No type errors

             Zmiana wprowadzona!
```

### Przykład 3: Auto-formatting Hook

**.claude/config.json:**
```json
{
  "hooks": {
    "afterWrite": "./scripts/format.sh"
  }
}
```

**scripts/format.sh:**
```bash
#!/bin/bash

echo "💅 Formatting $WRITTEN_FILE..."
npx prettier --write $WRITTEN_FILE

# Stage formatted file
git add $WRITTEN_FILE

echo "✅ File formatted and staged"
```

### Przykład 4: Session Startup Hook

**.claude/config.json:**
```json
{
  "hooks": {
    "onSessionStart": "./scripts/startup.sh"
  }
}
```

**scripts/startup.sh:**
```bash
#!/bin/bash

echo "🚀 Starting Claude Code session..."

# Check dependencies
echo "Checking dependencies..."
npm ci --quiet

# Check for updates
echo "Checking for outdated packages..."
npm outdated

# Pull latest changes
echo "Syncing with remote..."
git fetch origin

# Show project status
echo ""
echo "📊 Project Status:"
echo "Branch: $(git branch --show-current)"
echo "Commits ahead: $(git rev-list --count @{u}..HEAD 2>/dev/null || echo 0)"
echo "Uncommitted changes: $(git status --short | wc -l)"

echo ""
echo "✅ Ready to code!"
```

## Zaawansowane techniki

### 1. Conditional Hooks

Hook wykonywany tylko dla określonych plików:

```bash
#!/bin/bash

# Only run for production code (not tests)
if [[ $EDITED_FILE == *".test."* ]]; then
    echo "Skipping hook for test file"
    exit 0
fi

# Run actual hook logic
npm run validate
```

### 2. Hook Chain

Jeden hook wywołuje inne:

**.claude/config.json:**
```json
{
  "hooks": {
    "preCommit": "./scripts/pre-commit-chain.sh"
  }
}
```

**scripts/pre-commit-chain.sh:**
```bash
#!/bin/bash

./scripts/lint.sh && \
./scripts/test.sh && \
./scripts/build.sh && \
./scripts/security-check.sh

exit $?
```

### 3. Hook z notyfikacjami

```bash
#!/bin/bash

# Run tests
npm test

if [ $? -eq 0 ]; then
    # Success notification (macOS)
    osascript -e 'display notification "Tests passed!" with title "Claude Code"'
else
    # Failure notification
    osascript -e 'display notification "Tests failed!" with title "Claude Code" sound name "Basso"'
    exit 1
fi
```

### 4. Environment-specific Hooks

**.claude/config.json:**
```json
{
  "hooks": {
    "preCommit": "NODE_ENV=test ./scripts/pre-commit.sh"
  }
}
```

## Hook Environment Variables

Claude Code przekazuje zmienne środowiskowe do hooks:

```bash
$TOOL_NAME          # Nazwa użytego narzędzia (Edit, Write, etc.)
$EDITED_FILE        # Ścieżka edytowanego pliku
$WRITTEN_FILE       # Ścieżka utworzonego pliku
$PROJECT_ROOT       # Root projektu
$SESSION_ID         # ID sesji Claude Code
```

**Przykład użycia:**
```bash
#!/bin/bash

echo "Tool: $TOOL_NAME"
echo "File: $EDITED_FILE"
echo "Project: $PROJECT_ROOT"

# Do something based on file type
if [[ $EDITED_FILE == *.ts ]]; then
    npx tsc --noEmit $EDITED_FILE
fi
```

## Best Practices

### ✅ Dobre praktyki

1. **Szybkie hooks**
   - Hook nie powinien trwać >5 sekund
   - Długie operacje w background

2. **Informuj użytkownika**
   ```bash
   echo "🔍 Running security scan..."
   npm audit
   echo "✅ Security scan complete"
   ```

3. **Graceful failures**
   ```bash
   if ! command -v npm &> /dev/null; then
       echo "⚠️  npm not found, skipping..."
       exit 0  # Don't block workflow
   fi
   ```

4. **Testowalne hooks**
   ```bash
   # Allow disabling hooks for testing
   if [ "$SKIP_HOOKS" = "true" ]; then
       exit 0
   fi
   ```

### ❌ Anty-wzorce

1. **Zbyt restrykcyjne hooks** - nie blokuj każdej drobnej zmiany
2. **Brak feedbacku** - użytkownik nie wie co się dzieje
3. **Długie hooks** - >10 sekund to za długo
4. **Ukryte side effects** - hook nie powinien wprowadzać nieoczekiwanych zmian

## Zadanie praktyczne

### Zadanie 1: Pre-commit Hook

1. Stwórz folder `.claude/scripts/`
2. Stwórz `pre-commit.sh`:
   ```bash
   #!/bin/bash
   echo "Running pre-commit check..."
   npm run lint
   exit $?
   ```
3. Dodaj do `.claude/config.json`:
   ```json
   {
     "hooks": {
       "preCommit": "./scripts/pre-commit.sh"
     }
   }
   ```
4. Przetestuj commitując zmiany

### Zadanie 2: After-Edit Hook

1. Stwórz `after-edit.sh` który uruchamia prettier
2. Skonfiguruj w `.claude/config.json`
3. Przetestuj edytując plik

### Zadanie 3: Session Startup

1. Stwórz `startup.sh` który pokazuje status projektu
2. Dodaj do `onSessionStart`
3. Zrestartuj Claude Code i zobacz rezultat

**Oczekiwany rezultat:**
- Działające hooks w Twoim projekcie
- Automatyzacja testów i lintingu
- Feedback przy każdej operacji

## Dodatkowe materiały

### Oficjalna dokumentacja
- [Hooks Guide](https://docs.claude.com/en/docs/claude-code/hooks)
- [Hook Events Reference](https://docs.claude.com/en/docs/claude-code/hook-events)
- [Hook Best Practices](https://docs.claude.com/en/docs/claude-code/hook-best-practices)

### Przykłady
- [GitHub - Hook Examples](https://github.com/search?q=.claude+hooks)
- [Community Hook Scripts](https://github.com/topics/claude-code-hooks)

## Podsumowanie

W tej lekcji nauczyłeś się:
- Czym są hooks i jak działają
- Różnych typów hooks (tool, file, git, session)
- Jak konfigurować hooks w `.claude/config.json`
- Praktycznych przykładów automatyzacji
- Najlepszych praktyk tworzenia hooks

Hooks to potężne narzędzie automatyzacji - używaj ich mądrze aby usprawnić workflow bez spowalniania pracy!

---

**Ilustracje:** (do dodania)
- Diagram: Event → Hook → Action
- Timeline: Session lifecycle z hooks
- Przykład outputu pre-commit hook
