# Mail #06: Best Practices - Bezpieczna Konfiguracja (+ Podsumowanie Modułu)

---

## Przypomnienie z poprzedniej lekcji

W lekcji 5 poznałeś **Git Safety Protocol** - zestaw zasad, które chronią Twoje repozytorium przed destrukcyjnymi operacjami:

- Blokada `git push --force` i `--no-verify`
- Używanie HEREDOC dla commit messages
- Zasada `--amend` tylko przed pushem
- Pre-push hooks weryfikujące commity Claude'a

Dzisiaj nauczysz się, jak zastosować te zasady w szerszym kontekście - jako część **kompleksowej strategii bezpieczeństwa** dla całego zespołu.

---

## Sprawdź swoją wiedzę (Lekcja 5)

1. **Dlaczego Claude nie powinien używać `git push --force` na gałęzi main/master?**
   - Odpowiedź: Force push nadpisuje historię w repozytorium, co może zniszczyć pracę innych członków zespołu. Na chronionych gałęziach to operacja wymagająca ręcznej weryfikacji.

2. **Kiedy można bezpiecznie użyć `git commit --amend`?**
   - Odpowiedź: Tylko gdy commit NIE został jeszcze wypchnięty na remote (`git status` pokazuje "Your branch is ahead"). Po pushu amend wymagałby force push.

---

## TLDR

Dziś poznasz **kompletny zestaw best practices** dla bezpiecznej konfiguracji Claude Code:

- **Least Privilege Principle** - minimalne uprawnienia jako punkt startowy
- **Environment-specific configurations** - różne uprawnienia dla dev/staging/prod
- **Team settings w repozytorium** - kontrola zmian przez code review
- **Hierarchia konfiguracji** - global → team → project → local
- **Automatyczne audyty** - walidacja w pre-commit i CI/CD
- **Troubleshooting** - rozwiązywanie typowych problemów

**To ostatni mail Modułu 3!** Po tej lekcji będziesz ekspertem od konfiguracji bezpieczeństwa i uprawnień w Claude Code.

---

## Mem dnia

![Security Audit Meme](https://twitter.com/search?q=security%20audit%20meme%20developer%20penetration%20testing)

*"Security Engineer: 'Przeprowadziłem penetration test Waszej aplikacji'*
*Developer: 'I jak?'*
*Security: 'Znalazłem 47 sposobów na dostanie się do bazy danych'*
*Developer: 'To dobrze czy źle?'*
*Security: '46 z nich było przez panel admina z hasłem admin/admin'"*

Znajdź swój ulubiony mem o security audits: [#security #penetrationtesting #infosec](https://twitter.com/search?q=%23security%20%23pentesting%20%23developer)

---

## Least Privilege Principle - Fundamenty Bezpieczeństwa

### Czym jest Least Privilege?

**Least Privilege (najmniejsze uprawnienia)** to zasada bezpieczeństwa, która mówi:

> *"Nadawaj tylko te uprawnienia, które są absolutnie niezbędne do wykonania zadania - ani więcej, ani mniej."*

W kontekście Claude Code oznacza to:
- **Zacznij od zablokowania wszystkiego** (tryb `normal` lub `plan`)
- **Stopniowo dodawaj do `allow`** tylko to, co jest potrzebne
- **Nigdy nie używaj `bypassPermissions`** z lenistwa - tylko w kontrolowanych środowiskach

### Dlaczego to działa?

**Scenariusz 1: Zbyt szerokie uprawnienia**
```json
{
  "permissions": {
    "mode": "bypassPermissions"  // ❌ ZŁE
  }
}
```

**Ryzyko:** Claude może przypadkowo:
- Usunąć ważne pliki (`rm -rf`)
- Commitnąć sekrety (`.env`)
- Nadpisać konfigurację produkcyjną
- Wykonać destrukcyjne komendy systemowe

**Scenariusz 2: Least Privilege w akcji**
```json
{
  "permissions": {
    "mode": "normal",
    "allow": [
      "Read(src/**/*.{ts,tsx,js,jsx})",
      "Bash(npm run test)",
      "Bash(npm run lint)",
      "Bash(git status)",
      "Edit(src/**/*.{ts,tsx})"
    ],
    "deny": [
      "Read(**/.env*)",
      "Bash(rm:*)",
      "Bash(sudo:*)",
      "Edit(package*.json)"
    ]
  }
}
```

**Korzyści:**
- Claude ma dostęp tylko do plików źródłowych
- Może uruchamiać testy i lintery
- **Nie może** usunąć niczego destrukcyjnego
- **Nie może** przeczytać sekretów
- **Nie może** zepsuć zależności

### Strategia implementacji

```
KROK 1: Zacznij od blokady
├─ Tryb: "normal" (pyta o wszystko)
├─ Deny list: sekrety, destrukcyjne komendy
└─ Allow list: pusta

KROK 2: Obserwuj co Claude potrzebuje
├─ Pracujesz z Claude Code
├─ Zapisujesz operacje, na które mówisz "y"
└─ Identyfikujesz powtarzające się patterns

KROK 3: Dodaj do allow list
├─ Tylko bezpieczne, powtarzalne operacje
├─ Precyzyjne patterns (nie wildcardy!)
└─ Testuj każdą regułę

KROK 4: Monitoruj i dostosowuj
├─ Code review dla zmian w settings.json
├─ Audyty co miesiąc
└─ Aktualizacja reguł gdy projekt ewoluuje
```

**Przykład biznesowy:**

Startup e-commerce z 5 programistami:

```json
// Początek: Wszyscy na "normal mode"
{
  "permissions": {
    "mode": "normal",
    "deny": [
      "Read(**/.env*)",
      "Read(**/credentials.json)",
      "Bash(rm:*)",
      "Bash(sudo:*)"
    ]
  }
}

// Po miesiącu obserwacji: Allow list dla częstych operacji
{
  "permissions": {
    "mode": "normal",
    "allow": [
      "Read(src/**)",
      "Edit(src/**/*.{ts,tsx,vue})",
      "Bash(npm run test:unit)",
      "Bash(npm run lint)",
      "Bash(git status|diff|log)"
    ],
    "deny": [
      "Read(**/.env*)",
      "Read(**/credentials.json)",
      "Bash(rm:*)",
      "Bash(sudo:*)",
      "Bash(git push:*--force*)"
    ],
    "ask": [
      "Bash(npm install*)",
      "Bash(git push*)",
      "Edit(package.json)"
    ]
  }
}
```

**Wynik:** 80% redukcji niepotrzebnych pytań o uprawnienia, przy zachowaniu pełnego bezpieczeństwa.

---

## Environment-Specific Configurations

### Dlaczego różne środowiska potrzebują różnych uprawnień?

**Development (lokalnie):**
- Deweloper eksperymentuje
- Potrzebny dostęp do testów, linterów
- Modyfikacja plików jest normalna
- Ryzyko: niskie (lokalny system)

**Staging (testowe):**
- Weryfikacja przed produkcją
- Ograniczona edycja
- Dozwolone: testy, analiza logów
- Ryzyko: średnie

**Production (produkcja):**
- **ZERO modyfikacji plików**
- Tylko odczyt i analiza
- Tryb `plan` lub `read-only`
- Ryzyko: KRYTYCZNE

### Konfiguracja dla każdego środowiska

#### Development Environment
```json
// .claude/settings.dev.json
{
  "permissions": {
    "mode": "acceptEdits",  // Szybkie iteracje
    "allow": [
      "Read(src/**)",
      "Edit(src/**)",
      "Bash(npm run *)",
      "Bash(git status|diff|log|add|commit)",
      "Glob(**/*)",
      "Grep(**/*)"
    ],
    "deny": [
      "Read(**/.env*)",
      "Bash(rm:*)",
      "Bash(sudo:*)"
    ],
    "ask": [
      "Bash(npm install*)",
      "Bash(git push*)"
    ]
  }
}
```

#### Staging Environment
```json
// .claude/settings.staging.json
{
  "permissions": {
    "mode": "normal",  // Wymaga potwierdzenia
    "allow": [
      "Read(**/*)",
      "Bash(npm test)",
      "Bash(docker logs*)",
      "Bash(git status|diff|log)"
    ],
    "deny": [
      "Edit(**/*)",           // Brak edycji!
      "Write(**/*)",
      "Bash(rm:*)",
      "Bash(git push*)",
      "Bash(docker restart*)"
    ]
  }
}
```

#### Production Environment
```json
// .claude/settings.prod.json
{
  "permissions": {
    "mode": "plan",  // TYLKO ODCZYT
    "allow": [
      "Read(logs/**)",      // Tylko logi
      "Bash(git log*)",
      "Bash(docker ps)",
      "Bash(systemctl status*)"
    ],
    "deny": [
      "Edit(**/*)",         // Zero edycji
      "Write(**/*)",
      "Bash(rm:*)",
      "Bash(git push*)",
      "Bash(docker stop*)",
      "Bash(systemctl restart*)",
      "Read(**/.env*)"      // Nawet nie czytaj sekretów
    ]
  }
}
```

### Automatyczne przełączanie środowisk

**Metoda 1: Zmienna środowiskowa**
```bash
# ~/.bashrc lub ~/.zshrc
export CLAUDE_ENV="development"  # albo staging, production

# .claude/settings.json
{
  "extends": ".claude/settings.${CLAUDE_ENV}.json"
}
```

**Metoda 2: Git branch detection**
```bash
# .claude/load-config.sh
#!/bin/bash
BRANCH=$(git branch --show-current)

if [[ "$BRANCH" == "main" || "$BRANCH" == "production" ]]; then
  ln -sf .claude/settings.prod.json .claude/settings.json
elif [[ "$BRANCH" == "staging" ]]; then
  ln -sf .claude/settings.staging.json .claude/settings.json
else
  ln -sf .claude/settings.dev.json .claude/settings.json
fi
```

**Git hook (`.git/hooks/post-checkout`):**
```bash
#!/bin/bash
.claude/load-config.sh
echo "✓ Claude config loaded for current environment"
```

**Przykład biznesowy:**

Firma SaaS z infrastrukturą AWS:

```bash
# Developer lokalnie (feature branch)
git checkout feature/new-payment-flow
# → Automatycznie ładuje settings.dev.json
# → Pełna edycja, testy, eksperymenty

# Deploy na staging
git checkout staging
# → Automatycznie ładuje settings.staging.json
# → Tylko analiza i testy, zero edycji

# Hotfix na produkcji
git checkout production
# → Automatycznie ładuje settings.prod.json
# → Plan mode, tylko czytanie logów
```

**Rezultat:** Zero przypadkowych zmian na produkcji. System sam dba o bezpieczeństwo.

---

## Team Settings i Code Review

### Settings.json w repozytorium - dlaczego to ważne?

**Problem bez kontroli wersji:**
```
Developer 1: Dodaje "Bash(*)" do allow list
Developer 2: Nie wie o tym, kopiuje konfigurację
Developer 3: Claude wykonuje destrukcyjną komendę
Security Team: "Kto i kiedy to zmienił?" 🤷
```

**Rozwiązanie: Settings w repo + code review**
```
Developer 1: Tworzy PR z zmianą w .claude/settings.json
Developer 2: Code review: "Dlaczego potrzebujesz Bash(*)?? ❌"
Developer 1: Poprawia na "Bash(npm:*|git:status)"
Senior Dev: Approve ✅
Merge → Wszyscy mają bezpieczną konfigurację
```

### Struktura plików w repozytorium

```
project/
├─ .claude/
│  ├─ settings.json              # Główna konfiguracja (w repo)
│  ├─ team-settings.json         # Ustawienia zespołu (w repo)
│  ├─ settings.dev.json          # Dev environment (w repo)
│  ├─ settings.staging.json      # Staging (w repo)
│  ├─ settings.prod.json         # Production (w repo)
│  ├─ local.json                 # Lokalne override'y (gitignore!)
│  └─ hooks/
│     ├─ pre-write.sh            # Walidacja przed zapisem
│     └─ audit.sh                # Skrypt audytowy
├─ .gitignore
│  # Zawiera: .claude/local.json
└─ README.md
```

### Pull Request workflow dla zmian uprawnień

**Przykład PR:**

```markdown
## PR #123: Dodanie uprawnień do docker commands

### Zmiana
Dodaję do allow list:
- `Bash(docker ps)`
- `Bash(docker logs:*)`

### Uzasadnienie
Potrzebne do debugowania kontenerów w środowisku dev.

### Weryfikacja bezpieczeństwa
- ✅ Tylko komendy read-only (ps, logs)
- ✅ Brak destrukcyjnych komend (stop, rm, restart)
- ✅ Testowane na lokalnym środowisku
- ✅ Nie dotyczy produkcji (tylko dev environment)

### Checklist
- [x] Uprawnienia są minimalne (least privilege)
- [x] Deny list zawiera destrukcyjne komendy
- [x] Zmiana dotyczy tylko dev environment
- [x] Dokumentacja zaktualizowana
```

**Code Review Checklist (dla reviewera):**
```markdown
☐ Czy zmiana jest uzasadniona?
☐ Czy uprawnienia są minimalne?
☐ Czy deny list blokuje ryzykowne operacje?
☐ Czy zmiana dotyczy właściwego środowiska?
☐ Czy nie wprowadza backdoorów (np. Bash(*))?
☐ Czy dokumentacja jest aktualna?
☐ Czy zmiany zostały przetestowane?
```

**Automatyzacja w GitHub Actions:**

```yaml
# .github/workflows/claude-config-audit.yml
name: Claude Config Security Audit

on:
  pull_request:
    paths:
      - '.claude/**'

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Validate JSON syntax
        run: |
          for file in .claude/*.json; do
            echo "Validating $file..."
            jq empty "$file" || exit 1
          done

      - name: Check for dangerous patterns
        run: |
          DANGEROUS_PATTERNS=(
            'bypassPermissions.*true'
            'sandbox.*false'
            'Bash\(\*\)'
            'deny.*\[\s*\]'
          )

          for pattern in "${DANGEROUS_PATTERNS[@]}"; do
            if grep -rP "$pattern" .claude/*.json; then
              echo "❌ BLOCKED: Dangerous pattern detected: $pattern"
              exit 1
            fi
          done

          echo "✅ No dangerous patterns found"

      - name: Require deny list
        run: |
          for file in .claude/settings*.json; do
            if ! grep -q '"deny"' "$file"; then
              echo "❌ BLOCKED: $file missing deny list"
              exit 1
            fi
          done

          echo "✅ All configs have deny lists"

      - name: Comment PR with audit results
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '✅ Claude configuration passed security audit\n\n**Verified:**\n- JSON syntax valid\n- No dangerous patterns\n- Deny lists present\n- Sandbox enabled'
            })
```

**Przykład biznesowy:**

Zespół 10 deweloperów w agencji web:

1. **Junior dev** chce dodać `Bash(*)` aby "nie klikać cały czas"
2. **Tworzy PR** z tą zmianą
3. **CI/CD** automatycznie wykrywa ryzykowny pattern
4. **Senior dev** w code review tłumaczy:
   - "To otwiera drzwi dla destrukcyjnych komend"
   - "Dodaj konkretne komendy których potrzebujesz"
5. **Junior poprawia** na `Bash(npm:*|git:status|docker:ps|logs)`
6. **PR approved** i zmergowany
7. **Wszyscy** mają bezpieczną, ale wygodną konfigurację

**Rezultat:** Edukacja zespołu + bezpieczeństwo + wygoda.

---

## Hierarchia Konfiguracji

### Porządek ładowania (od najogólniejszej do najbardziej specyficznej)

```
1. ~/.claude/settings.json           (GLOBAL - użytkownik)
   ↓ (override)
2. /project/.claude/team-settings.json  (TEAM - zespół)
   ↓ (override)
3. /project/.claude/settings.json       (PROJECT - projekt)
   ↓ (override)
4. /project/.claude/local.json          (LOCAL - gitignore)
```

**Każdy poziom nadpisuje poprzedni.**

### Przykład kompletnej hierarchii

#### 1. Global (~/.claude/settings.json)
```json
{
  "sandbox": {"enabled": true},
  "permissions": {
    "deny": [
      "Read(**/.ssh/**)",
      "Read(**/.aws/**)",
      "Bash(sudo:*)",
      "Bash(rm:-rf*)"
    ]
  }
}
```
*Globalna ochrona dla wszystkich projektów tego użytkownika.*

#### 2. Team (/project/.claude/team-settings.json)
```json
{
  "extends": "~/.claude/settings.json",
  "permissions": {
    "deny": [
      "Read(**/.env*)",
      "Bash(git push:*--force*)"
    ],
    "ask": [
      "Bash(npm install*)",
      "Edit(package.json)"
    ]
  }
}
```
*Zasady zespołu, wspólne dla wszystkich deweloperów.*

#### 3. Project (/project/.claude/settings.json)
```json
{
  "extends": ".claude/team-settings.json",
  "permissions": {
    "allow": [
      "Read(src/**)",
      "Edit(src/**/*.{ts,tsx})",
      "Bash(npm run test)",
      "Bash(git status|diff)"
    ]
  }
}
```
*Specyfika tego projektu (np. TypeScript, npm).*

#### 4. Local (/project/.claude/local.json) - GITIGNORE!
```json
{
  "extends": ".claude/settings.json",
  "permissions": {
    "allow": [
      "Bash(code:*)",              // Osobisty editor
      "Read(/Users/me/dotfiles/**)"  // Osobiste pliki
    ]
  }
}
```
*Osobiste preferencje dewelopera - NIE w repo.*

### Użycie zmiennych środowiskowych

```json
{
  "extends": ".claude/settings.${CLAUDE_ENV:-dev}.json",
  "permissions": {
    "mode": "${CLAUDE_MODE:-normal}",
    "allow": [
      "Read(${PROJECT_SRC:-src}/**)"
    ]
  }
}
```

**Setup w .bashrc:**
```bash
export CLAUDE_ENV="development"
export CLAUDE_MODE="acceptEdits"
export PROJECT_SRC="src"
```

### Debugowanie hierarchii

**Komenda sprawdzająca:**
```bash
> claude --show-config
```

**Output:**
```
Configuration hierarchy:
1. ~/.claude/settings.json
   - sandbox: enabled
   - deny: ~/.ssh/**, rm -rf*

2. .claude/team-settings.json (extends global)
   - deny: .env*, git push --force

3. .claude/settings.json (extends team)
   - allow: Read(src/**), Edit(src/**)

4. .claude/local.json (extends project) [NOT IN REPO]
   - allow: Bash(code:*)

Final merged config:
{
  "sandbox": {"enabled": true},
  "permissions": {
    "allow": ["Read(src/**)", "Edit(src/**)", "Bash(code:*)"],
    "deny": ["Read(~/.ssh/**)", "Bash(rm:-rf*)", "Read(.env*)", "Bash(git push:--force*)"],
    "ask": ["Bash(npm install*)", "Edit(package.json)"]
  }
}
```

---

## Automatyczna Walidacja w Pre-commit

### Dlaczego walidować przed commitem?

**Problem:**
```bash
Developer commituje .claude/settings.json z:
- "bypassPermissions": true
- "sandbox": false
- Pusta deny list

Merge na main → Wszyscy mają niebezpieczną konfigurację
```

**Rozwiązanie: Pre-commit hook**

### Implementacja

**1. Skrypt walidacyjny (.claude/validate-config.js):**
```javascript
#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const DANGEROUS_PATTERNS = [
  { pattern: /bypassPermissions.*true/i, message: 'Bypass mode enabled' },
  { pattern: /sandbox.*false/i, message: 'Sandbox disabled' },
  { pattern: /Bash\(\*\)/, message: 'Wildcard Bash permission' },
  { pattern: /"deny"\s*:\s*\[\s*\]/, message: 'Empty deny list' },
  { pattern: /Read\(\*\*\/\*\)(?!.*deny)/, message: 'Unrestricted file read' },
];

const REQUIRED_DENY = [
  'Read(**/.env*)',
  'Read(**/.ssh/**)',
  'Bash(rm:*)',
  'Bash(sudo:*)',
];

function validateConfig(filePath) {
  const config = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const configStr = JSON.stringify(config);
  const violations = [];

  // Check dangerous patterns
  DANGEROUS_PATTERNS.forEach(({ pattern, message }) => {
    if (pattern.test(configStr)) {
      violations.push(`❌ ${message}: ${pattern.source}`);
    }
  });

  // Check required deny rules
  const denyList = config.permissions?.deny || [];
  REQUIRED_DENY.forEach(required => {
    if (!denyList.some(rule => rule.includes(required.split('(')[1].split(')')[0]))) {
      violations.push(`⚠️  Missing required deny rule: ${required}`);
    }
  });

  return violations;
}

// Validate all settings files
const settingsFiles = fs.readdirSync('.claude')
  .filter(f => f.match(/settings.*\.json$/))
  .map(f => path.join('.claude', f));

let hasErrors = false;

settingsFiles.forEach(file => {
  console.log(`\nValidating ${file}...`);
  const violations = validateConfig(file);

  if (violations.length > 0) {
    hasErrors = true;
    violations.forEach(v => console.error(`  ${v}`));
  } else {
    console.log('  ✅ Configuration is safe');
  }
});

if (hasErrors) {
  console.error('\n❌ Configuration validation FAILED');
  console.error('Fix the issues above before committing.');
  process.exit(1);
}

console.log('\n✅ All configurations passed validation');
```

**2. Pre-commit hook (.git/hooks/pre-commit):**
```bash
#!/bin/bash

# Check if .claude/settings.json is being committed
if git diff --cached --name-only | grep -q "\.claude/.*settings.*\.json"; then
  echo "🔍 Validating Claude configuration..."

  # Run validation script
  node .claude/validate-config.js

  if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Commit rejected: Claude configuration failed security validation"
    echo "Fix the issues above and try again."
    exit 1
  fi

  echo "✅ Claude configuration validated successfully"
fi

exit 0
```

**3. Instalacja (setup.sh):**
```bash
#!/bin/bash
# Automatyczna instalacja pre-commit hook

echo "Installing pre-commit hook for Claude config validation..."

# Make validation script executable
chmod +x .claude/validate-config.js

# Install pre-commit hook
cp .claude/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit

echo "✅ Pre-commit hook installed"
echo "Run: npm install -D husky (optional - for team-wide hooks)"
```

### Integracja z Husky (team-wide)

**package.json:**
```json
{
  "scripts": {
    "prepare": "husky install"
  },
  "devDependencies": {
    "husky": "^8.0.0"
  }
}
```

**.husky/pre-commit:**
```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Validate Claude config if changed
if git diff --cached --name-only | grep -q "\.claude/"; then
  node .claude/validate-config.js || exit 1
fi
```

**Rezultat:** Każdy developer w zespole automatycznie ma walidację. Niemożliwe jest commitowanie niebezpiecznej konfiguracji.

---

## Audyty Bezpieczeństwa w CI/CD

### Ciągłe monitorowanie konfiguracji

**GitHub Actions workflow (.github/workflows/security-audit.yml):**
```yaml
name: Security Audit

on:
  push:
    branches: [main, staging, production]
  pull_request:
    paths:
      - '.claude/**'
  schedule:
    - cron: '0 0 * * 0'  # Co tydzień

jobs:
  claude-config-audit:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Validate JSON syntax
        run: |
          echo "🔍 Validating JSON syntax..."
          for file in .claude/*.json; do
            if [ -f "$file" ]; then
              echo "Checking $file..."
              jq empty "$file" || {
                echo "❌ Invalid JSON in $file"
                exit 1
              }
            fi
          done
          echo "✅ JSON syntax valid"

      - name: Security scan
        run: |
          echo "🔍 Scanning for security issues..."
          node .claude/validate-config.js

      - name: Check for secrets in config
        run: |
          echo "🔍 Scanning for hardcoded secrets..."

          # Patterns for common secrets
          PATTERNS=(
            "api[_-]?key"
            "password"
            "secret"
            "token"
            "credential"
          )

          for pattern in "${PATTERNS[@]}"; do
            if grep -ri "$pattern" .claude/*.json | grep -v "deny"; then
              echo "⚠️  Warning: Found potential secret: $pattern"
            fi
          done

          echo "✅ No secrets detected"

      - name: Generate audit report
        run: |
          echo "📊 Generating audit report..."

          cat > audit-report.md <<EOF
          # Claude Code Security Audit Report

          **Date:** $(date)
          **Branch:** ${GITHUB_REF}
          **Commit:** ${GITHUB_SHA}

          ## Configuration Files Audited
          $(ls -1 .claude/*.json)

          ## Security Checks Passed
          - ✅ JSON syntax validation
          - ✅ Dangerous pattern detection
          - ✅ Required deny rules present
          - ✅ No hardcoded secrets

          ## Recommendations
          - Review permissions quarterly
          - Update deny list with new threats
          - Test configuration changes in dev first

          EOF

          cat audit-report.md

      - name: Upload audit report
        uses: actions/upload-artifact@v3
        with:
          name: security-audit-report
          path: audit-report.md

      - name: Notify team on failure
        if: failure()
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          text: '❌ Claude Code security audit failed!'
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

**Rezultat:** Automatyczne audyty przy każdym pushu i co tydzień. Zespół jest natychmiast informowany o problemach.

---

## Troubleshooting

### Problem 1: "Settings file not loading"

**Objawy:**
- Zmiany w `settings.json` nie działają
- Claude używa domyślnych ustawień
- Uprawnienia są ignorowane

**Debug checklist:**
```bash
# 1. Sprawdź czy plik istnieje
ls -la .claude/settings.json

# 2. Waliduj JSON
cat .claude/settings.json | jq .
# Jeśli błąd: napraw składnię JSON

# 3. Sprawdź uprawnienia pliku
stat -f "%Sp %N" .claude/settings.json  # macOS
# stat -c "%a %n" .claude/settings.json  # Linux
# Powinno być: -rw-r--r--

# 4. Sprawdź encoding
file .claude/settings.json
# Powinno być: UTF-8 text

# 5. Sprawdź merged config
claude --show-config

# 6. Wyczyść cache
rm -rf ~/.claude/cache
claude --reload-config
```

**Typowe przyczyny:**
- **Komentarze w JSON** (JSON nie wspiera komentarzy!)
  ```json
  {
    // To jest komentarz  ❌ NIE DZIAŁA
    "permissions": {}
  }
  ```
  Rozwiązanie: Usuń komentarze lub użyj JSON5

- **BOM (Byte Order Mark)**
  ```bash
  # Usuń BOM
  sed -i '' '1s/^\xEF\xBB\xBF//' .claude/settings.json
  ```

- **Symlink do nieistniejącego pliku**
  ```bash
  # Sprawdź
  ls -l .claude/settings.json
  # Jeśli wskazuje na nieistniejący plik → napraw
  ```

### Problem 2: "Permission denied" mimo allow list

**Objawy:**
- `"allow": ["Read(debug.log)"]` ustawione
- Claude nadal pyta o zgodę
- Operacja jest blokowana

**Przyczyna:** Kolejność reguł - `deny` ma priorytet nad `allow`

**Debug:**
```json
{
  "deny": ["Read(*.log)"],      // ❌ Ta reguła blokuje...
  "allow": ["Read(debug.log)"]  // ❌ ...mimo że to jest dozwolone
}
```

**Rozwiązanie 1: Bardziej precyzyjna deny list**
```json
{
  "deny": [
    "Read(*.log)",
    "!Read(debug.log)"  // ✅ Negacja - wyklucz debug.log z deny
  ],
  "allow": ["Read(debug.log)"]
}
```

**Rozwiązanie 2: Zmień pattern**
```json
{
  "deny": [
    "Read(error.log)",
    "Read(access.log)",
    "Read(system.log)"
    // Nie blokuj debug.log
  ],
  "allow": ["Read(debug.log)"]
}
```

### Problem 3: "Bypass mode not working in CI"

**Objawy:**
- CI job z `"bypassPermissions": true`
- Nadal dostaje "Permission denied"
- Zadania się wiesza

**Przyczyna:** Sandbox jest nadal aktywny

**Rozwiązanie:**
```yaml
# GitHub Actions
- name: Run Claude with full bypass
  run: |
    cat > .claude/settings.json <<EOF
    {
      "sandbox": {
        "enabled": false
      },
      "permissions": {
        "mode": "bypassPermissions"
      }
    }
    EOF
    claude "fix all failing tests"
  env:
    CLAUDE_ALLOW_UNSAFE: "true"
```

**UWAGA:** Używaj tylko w izolowanych runnerach CI/CD, NIGDY lokalnie!

---

## Przykłady Biznesowe

### Przykład 1: Agencja Web (10 deweloperów)

**Challenge:** Junior devs często przypadkowo commitują `.env` files

**Rozwiązanie:**
```json
// .claude/team-settings.json
{
  "permissions": {
    "deny": [
      "Read(**/.env*)",
      "Bash(git add:.env*)"
    ],
    "hooks": {
      "preToolUse": {
        "Bash(git commit*)": ".claude/hooks/pre-commit-check.sh"
      }
    }
  }
}
```

**Hook (.claude/hooks/pre-commit-check.sh):**
```bash
#!/bin/bash
# Sprawdź czy staged files zawierają sekrety

STAGED=$(git diff --cached --name-only)

if echo "$STAGED" | grep -E '\.env|secret|credential'; then
  echo "❌ BLOCKED: Attempt to commit sensitive files"
  echo "$STAGED"
  exit 1
fi

exit 0
```

**Rezultat:** Zero leaków sekretów. Pre-commit hook zatrzymuje commity z `.env`.

### Przykład 2: Startup Fintech (zgodność z regulacjami)

**Challenge:** Audyty compliance wymagają trackingu wszystkich zmian w permissions

**Rozwiązanie:**
```json
// .claude/settings.json
{
  "auditLog": {
    "enabled": true,
    "path": "logs/claude-audit.log",
    "events": ["permission_change", "tool_use", "file_edit"]
  },
  "permissions": {
    "hooks": {
      "postToolUse": {
        "*": ".claude/hooks/log-action.sh"
      }
    }
  }
}
```

**Hook (.claude/hooks/log-action.sh):**
```bash
#!/bin/bash
# Log każdej akcji do audyt logu

TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
USER=$(whoami)
ACTION="$TOOL_NAME"
DETAILS="$TOOL_ARGS"

echo "$TIMESTAMP | $USER | $ACTION | $DETAILS" >> logs/claude-audit.log

# Wyślij do SIEM (Security Information and Event Management)
curl -X POST https://siem.company.com/events \
  -H "Content-Type: application/json" \
  -d "{\"timestamp\":\"$TIMESTAMP\",\"user\":\"$USER\",\"action\":\"$ACTION\",\"details\":\"$DETAILS\"}"
```

**Rezultat:** Pełny audit trail zgodny z SOC 2 i GDPR.

### Przykład 3: Enterprise (100+ deweloperów)

**Challenge:** Różne zespoły potrzebują różnych uprawnień

**Rozwiązanie: Role-based configuration**
```
.claude/
├─ roles/
│  ├─ junior-dev.json      # Ograniczone uprawnienia
│  ├─ senior-dev.json      # Pełne dev uprawnienia
│  ├─ devops.json          # Infrastruktura
│  ├─ data-analyst.json    # Tylko analiza
│  └─ security.json        # Audyty
└─ settings.json           # Ładuje role
```

**Settings.json:**
```json
{
  "extends": ".claude/roles/${CLAUDE_ROLE:-junior-dev}.json"
}
```

**Każdy dev ustawia swoją rolę:**
```bash
# ~/.bashrc
export CLAUDE_ROLE="senior-dev"
```

**Rezultat:** Skalowalny system uprawnień dla dużych organizacji.

---

## Podsumowanie

Bezpieczna konfiguracja Claude Code to nie jednorazowe zadanie, ale **ciągły proces**:

1. **Least Privilege** - zacznij od minimum, dodawaj stopniowo
2. **Environment-specific** - dev/staging/prod wymagają różnych uprawnień
3. **Team settings w repo** - kontrola zmian przez code review
4. **Hierarchia** - global → team → project → local
5. **Automatyczna walidacja** - pre-commit hooks i CI/CD
6. **Audyty** - regularne skanowanie i monitoring
7. **Troubleshooting** - szybka diagnoza problemów

### Podsumowanie całego Modułu 3: Bezpieczeństwo i Uprawnienia

Przez ostatnie 6 maili przeszedłeś kompletny kurs bezpieczeństwa w Claude Code:

**Mail 1: Sandbox Mode**
- Izolacja projektu
- Testowanie granic
- Symlinki i edge cases

**Mail 2: Konfiguracja Sandbox**
- Włączanie/wyłączanie
- additionalDirectories
- Monorepo i zespoły

**Mail 3: Typy Uprawnień**
- Read, Edit, Write, Bash
- Macierz ryzyka
- Webhooks i audyty

**Mail 4: Tryby Uprawnień**
- Normal, Accept Edits, Plan, Bypass
- Kiedy którego użyć
- Automatyczne przełączanie

**Mail 5: Allow/Deny Lists i Git Safety**
- Whitelisting/blacklisting
- Pattern matching
- Git Safety Protocol

**Mail 6: Best Practices (dzisiejszy)**
- Least privilege principle
- Environment configurations
- Team settings i code review
- Hierarchia i automatyzacja

**Co osiągnąłeś?**
- Rozumiesz **system bezpieczeństwa** od podstaw
- Potrafisz **skonfigurować uprawnienia** dla różnych środowisk
- Znasz **best practices** dla pracy zespołowej
- Umiesz **debugować** problemy z konfiguracją
- Jesteś gotowy na **Moduł 4: Zaawansowane Techniki**

---

## Pytania kontrolne

Sprawdź czy opanowałeś materiał z całego modułu:

1. **Dlaczego należy zaczynać od trybu "normal" z pustą allow list, zamiast od razu użyć "bypassPermissions"?**

   <details>
   <summary>Odpowiedź</summary>
   Least Privilege Principle - zaczynasz od minimum i stopniowo dodajesz tylko niezbędne uprawnienia. BypassPermissions omija wszystkie kontrole bezpieczeństwa i jest odpowiedni tylko dla izolowanych środowisk CI/CD, nigdy dla rozwoju lokalnego.
   </details>

2. **Jakie środowisko (dev/staging/prod) powinno używać trybu "plan" i dlaczego?**

   <details>
   <summary>Odpowiedź</summary>
   Production. Tryb "plan" jest read-only - Claude może tylko analizować i generować plany działania, ale nie może modyfikować plików ani wykonywać komend. To zapobiega przypadkowym zmianom na produkcji.
   </details>

3. **Dlaczego plik .claude/settings.json powinien być w repozytorium, ale .claude/local.json w .gitignore?**

   <details>
   <summary>Odpowiedź</summary>
   settings.json zawiera zasady zespołowe (wspólne dla wszystkich) i musi przejść przez code review. local.json to osobiste preferencje dewelopera (np. ścieżki do lokalnych narzędzi), które nie powinny być narzucane innym.
   </details>

---

## Zadania praktyczne - Finałowe wyzwanie modułu!

### Zadanie 1: Kompletny Security Setup

**Cel:** Skonfiguruj bezpieczne środowisko dla nowego projektu

```bash
# 1. Utwórz strukturę konfiguracji
mkdir -p .claude/roles .claude/hooks

# 2. Stwórz settings dla 3 środowisk
# - .claude/settings.dev.json
# - .claude/settings.staging.json
# - .claude/settings.prod.json

# 3. Dodaj pre-commit hook walidujący
# 4. Skonfiguruj hierarchię (global → team → project)
# 5. Przetestuj każde środowisko

# 6. Zweryfikuj:
> /settings
> Czy konfiguracja ładuje się poprawnie dla każdego środowiska?
```

**Co ćwiczysz:**
- Hierarchia konfiguracji
- Environment-specific settings
- Pre-commit hooks
- Walidacja bezpieczeństwa

---

### Zadanie 2: Team Settings i Code Review Simulation

**Cel:** Przećwicz workflow zmian uprawnień w zespole

```bash
# 1. Stwórz branch feature/add-docker-permissions
git checkout -b feature/add-docker-permissions

# 2. Dodaj do allow list:
"Bash(docker ps)",
"Bash(docker logs:*)"

# 3. Dodaj do deny list:
"Bash(docker stop:*)",
"Bash(docker rm:*)"

# 4. Uruchom walidację
node .claude/validate-config.js

# 5. Stwórz commit z opisem zmian
# 6. W PR opisz uzasadnienie i security checklist

# 7. Merge po "self-review"
```

**Co ćwiczysz:**
- PR workflow dla uprawnień
- Dokumentowanie zmian
- Security checklist
- Walidacja przed mergem

---

### Zadanie 3: Security Audit i Troubleshooting

**Cel:** Wykryj i napraw problemy w konfiguracji

Pobierz celowo "zepsutą" konfigurację:
```json
{
  "sandbox": {"enabled": false},
  "permissions": {
    "mode": "bypassPermissions",
    "allow": ["Bash(*)"],
    "deny": []
  }
}
```

**Zadanie:**
1. Zidentyfikuj wszystkie problemy
2. Napraw każdy z nich
3. Dodaj pre-commit hook, który wykryłby te problemy
4. Przetestuj naprawioną konfigurację

**Co ćwiczysz:**
- Audyt bezpieczeństwa
- Troubleshooting
- Automatyczna walidacja

---

## Linki do zasobów

**Bezpieczeństwo i best practices:**
- [OWASP Secure Coding Practices](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/) - Fundamenty bezpiecznego kodowania
- [Principle of Least Privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege) - Teoria i praktyka
- [Security Configuration Management](https://csrc.nist.gov/projects/risk-management/risk-management-framework-(RMF)-Overview) - NIST guidelines

**Narzędzia do audytów:**
- [git-secrets](https://github.com/awslabs/git-secrets) - Wykrywanie sekretów w commitach
- [truffleHog](https://github.com/trufflesecurity/truffleHog) - Skanowanie historii git
- [gitleaks](https://github.com/gitleaks/gitleaks) - Detekcja leaków credentials

**CI/CD Security:**
- [GitHub Actions Security Best Practices](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions)
- [GitLab CI/CD Security](https://docs.gitlab.com/ee/ci/pipelines/pipeline_security.html)

**Compliance:**
- [SOC 2 Compliance Guide](https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/aicpasoc2report.html)
- [GDPR Developer Guide](https://gdpr.eu/developers/)

---

## Gratulacje za ukończenie Modułu 3!

Przeszedłeś przez **kompleksowy kurs bezpieczeństwa** w Claude Code. Teraz jesteś:

- **Ekspertem** od sandboxa i izolacji
- **Mistrzem** konfiguracji uprawnień
- **Specjalistą** od team settings i code review
- **Profesjonalistą** w zakresie automatyzacji audytów

**Jesteś gotowy na produkcję.** Możesz bezpiecznie pracować z Claude Code w środowisku biznesowym, zespołowym i compliance-regulated.

### Co dalej?

**Moduł 4: Zaawansowane Techniki**

Nauczysz się:
- Custom prompts i CLAUDE.md zaawansowany
- MCP (Model Context Protocol) - własne narzędzia
- Integracje z IDE (VS Code, Cursor)
- Workflow automation i scripts
- Performance optimization

**Start za 2 dni** - dajemy Ci czas na przećwiczenie security best practices!

---

*P.S. Ukończyłeś zadania? Podziel się swoją konfiguracją security na Discordzie - pomóż innym!*

*P.P.S. Pytania? Wątpliwości? Odpowiedz na tego maila - pomagam osobiście.*

**Do zobaczenia w Module 4!**
