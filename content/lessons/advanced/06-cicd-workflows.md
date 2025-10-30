---
title: "CI/CD Workflows z Claude Code"
description: "Automatyzacja pipeline'ów CI/CD: tworzenie, debugowanie i optymalizacja z pomocą Claude Code"
duration: 30
difficulty: advanced
tags: [cicd, github-actions, automation, devops, testing]
---

# CI/CD Workflows z Claude Code

## Wprowadzenie

Continuous Integration i Continuous Deployment (CI/CD) to fundament nowoczesnego software development. Claude Code może znacząco przyspieszyć tworzenie, debugowanie i optymalizację pipeline'ów CI/CD, niezależnie od platformy (GitHub Actions, GitLab CI, CircleCI, Jenkins).

W tej lekcji nauczysz się wykorzystywać Claude Code do pracy z CI/CD workflows.

## Dlaczego to ważne?

CI/CD pipelines są kluczowe ale:
- **Skomplikowane** - wymagają znajomości YAML, Docker, bash scripting
- **Trudne w debugowaniu** - błędy widoczne dopiero po push
- **Czasochłonne** - każda iteracja wymaga commit → push → wait
- **Krytyczne** - błędy mogą zatrzymać cały zespół

Claude Code pomaga na każdym etapie: od tworzenia przez debugowanie po optymalizację.

## Część 1: GitHub Actions z Claude Code

### Tworzenie workflow od podstaw

#### Scenariusz: Node.js aplikacja z testami

```
user: Stwórz GitHub Actions workflow dla Node.js projektu:
     - Uruchom testy na każdym PR
     - Wspieraj Node 18 i 20
     - Cache node_modules
     - Uploaduj coverage reports

assistant: [Tworzy .github/workflows/test.yml:]
```

```yaml
name: Tests

on:
  pull_request:
    branches: [ main, develop ]
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
    - uses: actions/checkout@v4

    - name: Setup Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Run tests
      run: npm test -- --coverage

    - name: Upload coverage
      uses: codecov/codecov-action@v3
      with:
        files: ./coverage/lcov.info
        flags: unittests
        name: node-${{ matrix.node-version }}

    - name: Archive test results
      if: always()
      uses: actions/upload-artifact@v3
      with:
        name: test-results-${{ matrix.node-version }}
        path: test-results/
```

**Claude Code automatycznie:**
- Dodaje best practices (npm ci zamiast npm install)
- Uwzględnia caching dla szybszych builds
- Dodaje error handling (if: always())
- Używa najnowszych wersji actions

### Debugowanie błędów workflow

#### Problem: Workflow fails

```
user: Mój workflow test.yml failuje, sprawdź logi i napraw
assistant: [Czyta workflow + ostatnie logs przez gh CLI]
```

```bash
# Claude Code automatycznie:
gh run list --workflow=test.yml --limit=1
gh run view [run-id] --log
```

Typowe problemy i fixes:

**Problem 1: "npm: command not found"**
```yaml
# Fix: Dodanie setup-node PRZED używaniem npm
- uses: actions/setup-node@v4
  with:
    node-version: '20'
```

**Problem 2: "EACCES: permission denied"**
```yaml
# Fix: Zmiana ownership lub użycie sudo
- run: sudo chown -R $USER:$USER .
```

**Problem 3: Timeout**
```yaml
# Fix: Dodanie timeout-minutes
jobs:
  test:
    timeout-minutes: 30
```

### Optymalizacja workflow

```
user: Zoptymalizuj ten workflow - buildy trwają za długo
assistant: [Analizuje i sugeruje:]
```

**Optymalizacje:**

1. **Paralelizacja**
```yaml
jobs:
  test:
    # ...
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm run lint

  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm run build
```

2. **Lepsze cachowanie**
```yaml
- name: Cache node modules
  uses: actions/cache@v3
  with:
    path: |
      ~/.npm
      node_modules
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-
```

3. **Conditional execution**
```yaml
- name: Run integration tests
  if: github.event_name == 'push' && github.ref == 'refs/heads/main'
  run: npm run test:integration
```

4. **Docker layer caching**
```yaml
- name: Build Docker image
  uses: docker/build-push-action@v5
  with:
    context: .
    cache-from: type=gha
    cache-to: type=gha,mode=max
```

## Część 2: Advanced CI/CD Patterns

### Pattern 1: Multi-stage pipeline

```yaml
name: Full Pipeline

on:
  push:
    branches: [ main ]

jobs:
  # Stage 1: Build & Test
  build:
    runs-on: ubuntu-latest
    outputs:
      version: ${{ steps.version.outputs.version }}
    steps:
      - uses: actions/checkout@v4
      - id: version
        run: echo "version=$(node -p "require('./package.json').version")" >> $GITHUB_OUTPUT
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v3
        with:
          name: build
          path: dist/

  test:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/download-artifact@v3
        with:
          name: build
          path: dist/
      - run: npm ci
      - run: npm test

  # Stage 2: Security Scanning
  security:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm audit
      - uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}

  # Stage 3: Deploy to Staging
  deploy-staging:
    needs: [test, security]
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - uses: actions/download-artifact@v3
      - run: npm run deploy:staging

  # Stage 4: Deploy to Production (manual approval)
  deploy-production:
    needs: deploy-staging
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/download-artifact@v3
      - run: npm run deploy:production
```

```
user: Stwórz mi pełny multi-stage pipeline z testami, security scanning i deployment
assistant: [Generuje powyższy workflow z wyjaśnieniami]
```

### Pattern 2: Matrix builds z custom configurations

```yaml
name: Matrix Build

on: [push]

jobs:
  test:
    runs-on: ${{ matrix.os }}
    strategy:
      fail-fast: false
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node: [18, 20]
        include:
          - os: ubuntu-latest
            node: 20
            coverage: true
        exclude:
          - os: macos-latest
            node: 18

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node }}
      - run: npm ci
      - run: npm test

      - name: Upload coverage
        if: matrix.coverage
        uses: codecov/codecov-action@v3
```

### Pattern 3: Reusable workflows

**`.github/workflows/reusable-test.yml`:**
```yaml
name: Reusable Test Workflow

on:
  workflow_call:
    inputs:
      node-version:
        required: true
        type: string
      coverage:
        required: false
        type: boolean
        default: false

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ inputs.node-version }}
      - run: npm ci
      - run: npm test

      - if: inputs.coverage
        run: npm run test:coverage
```

**Użycie:**
```yaml
name: Main Workflow

on: [push]

jobs:
  test-18:
    uses: ./.github/workflows/reusable-test.yml
    with:
      node-version: '18'
      coverage: false

  test-20:
    uses: ./.github/workflows/reusable-test.yml
    with:
      node-version: '20'
      coverage: true
```

## Część 3: CI/CD dla różnych platform

### GitLab CI

```
user: Stwórz .gitlab-ci.yml dla tego samego projektu
assistant: [Generuje:]
```

```yaml
stages:
  - test
  - build
  - deploy

variables:
  NODE_VERSION: "20"

cache:
  paths:
    - node_modules/

test:
  stage: test
  image: node:${NODE_VERSION}
  script:
    - npm ci
    - npm test
  coverage: '/Statements\s*:\s*(\d+\.\d+)%/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml

build:
  stage: build
  image: node:${NODE_VERSION}
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 week

deploy:staging:
  stage: deploy
  script:
    - npm run deploy:staging
  environment:
    name: staging
    url: https://staging.example.com
  only:
    - develop

deploy:production:
  stage: deploy
  script:
    - npm run deploy:production
  environment:
    name: production
    url: https://example.com
  when: manual
  only:
    - main
```

### CircleCI

```yaml
version: 2.1

orbs:
  node: circleci/node@5.1

workflows:
  test-and-deploy:
    jobs:
      - node/test:
          version: '20.0'
      - build:
          requires:
            - node/test
      - deploy:
          requires:
            - build
          filters:
            branches:
              only: main

jobs:
  build:
    docker:
      - image: cimg/node:20.0
    steps:
      - checkout
      - restore_cache:
          keys:
            - v1-deps-{{ checksum "package-lock.json" }}
      - run: npm ci
      - run: npm run build
      - save_cache:
          key: v1-deps-{{ checksum "package-lock.json" }}
          paths:
            - node_modules
      - persist_to_workspace:
          root: .
          paths:
            - dist

  deploy:
    docker:
      - image: cimg/node:20.0
    steps:
      - attach_workspace:
          at: .
      - run: npm run deploy
```

## Część 4: Zaawansowane techniki

### 1. Dynamic configuration

```yaml
name: Dynamic Build

on: [push]

jobs:
  setup:
    runs-on: ubuntu-latest
    outputs:
      matrix: ${{ steps.set-matrix.outputs.matrix }}
    steps:
      - uses: actions/checkout@v4
      - id: set-matrix
        run: |
          # Dynamicznie generuj matrix na podstawie zmian
          if git diff --name-only HEAD~1 | grep -q '^packages/'; then
            echo "matrix={\"package\":$(ls packages | jq -R -s -c 'split("\n")[:-1]')}" >> $GITHUB_OUTPUT
          else
            echo "matrix={\"package\":[]}" >> $GITHUB_OUTPUT
          fi

  test:
    needs: setup
    if: needs.setup.outputs.matrix != '{\"package\":[]}'
    strategy:
      matrix: ${{ fromJson(needs.setup.outputs.matrix) }}
    runs-on: ubuntu-latest
    steps:
      - run: npm test --workspace=packages/${{ matrix.package }}
```

### 2. Secrets management

```
user: Jak bezpiecznie zarządzać sekretami w CI/CD?
assistant: [Wyjaśnia best practices:]
```

**GitHub Actions:**
```yaml
- name: Deploy
  env:
    API_KEY: ${{ secrets.API_KEY }}
    DB_PASSWORD: ${{ secrets.DB_PASSWORD }}
  run: npm run deploy
```

**Enkapsulacja w environment:**
```yaml
jobs:
  deploy:
    environment: production
    steps:
      - run: echo ${{ secrets.PROD_API_KEY }}
```

**Vault integration:**
```yaml
- name: Import Secrets
  uses: hashicorp/vault-action@v2
  with:
    url: https://vault.example.com
    token: ${{ secrets.VAULT_TOKEN }}
    secrets: |
      secret/data/production api_key | API_KEY ;
      secret/data/production db_password | DB_PASSWORD
```

### 3. Monitoring i alerting

```yaml
name: Deploy with monitoring

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy
        run: npm run deploy

      - name: Health check
        run: |
          sleep 30
          curl -f https://app.example.com/health || exit 1

      - name: Notify Slack on failure
        if: failure()
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "text": "Deploy failed: ${{ github.event.head_commit.message }}"
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}

      - name: Create incident
        if: failure()
        run: |
          curl -X POST https://api.pagerduty.com/incidents \
            -H "Authorization: Token token=${{ secrets.PAGERDUTY_TOKEN }}" \
            -d '{"incident": {"type": "incident", "title": "Deploy failed"}}'
```

## Część 5: Debugowanie z Claude Code

### Lokalное testowanie workflows

```
user: Jak mogę przetestować GitHub Actions workflow lokalnie?
assistant: Użyj narzędzia 'act':
```

```bash
# Instalacja act
brew install act

# Uruchomienie workflow lokalnie
act -j test

# Z konkretnymi secrets
act -j test -s GITHUB_TOKEN=...

# Debug mode
act -j test --verbose
```

Claude Code może pomóc z `act`:

```
user: Uruchom workflow test.yml lokalnie używając act
assistant: [Wykonuje: act -j test]
          [Analizuje output i sugeruje poprawki]
```

### Debugowanie failed runs

```
user: Debuguj failed run #12345
assistant: [Workflow:]
```

1. Pobiera logi: `gh run view 12345 --log`
2. Identyfikuje failed step
3. Analizuje error message
4. Sprawdza ostatnie zmiany w workflow
5. Sugeruje fix
6. Opcjonalnie: tworzy PR z poprawką

## Zadanie praktyczne

**Cel**: Stwórz pełny CI/CD pipeline dla swojego projektu

### Część 1: Basic Pipeline (10 min)

```
user: Stwórz GitHub Actions workflow dla mojego [typ projektu], który:
     - Uruchamia testy na każdym PR
     - Builduje aplikację
     - Uploaduje artifacts
```

### Część 2: Add Security (5 min)

```
user: Dodaj do workflow:
     - npm audit
     - SAST scanning (np. CodeQL)
     - Dependency check
```

### Część 3: Deployment (10 min)

```
user: Rozszerz workflow o:
     - Deploy do staging na push do main
     - Deploy do production z manual approval
     - Rollback mechanism
```

### Część 4: Optimization (5 min)

```
user: Zoptymalizuj ten workflow pod kątem czasu wykonania
assistant: [Analizuje i dodaje:]
          - Caching
          - Paralelizację
          - Conditional execution
          - Docker layer caching
```

### Jak Claude Code może Ci pomóc?

```
user: Dlaczego mój workflow jest wolny?
user: Jak dodać blue-green deployment do pipeline?
user: Zautomatyzuj rollback w przypadku failed health checks
user: Stwórz workflow dla monorepo z selective testing
```

## Best Practices Checklist

- [ ] **Fail fast**: Umieść szybkie testy na początku
- [ ] **Cache dependencies**: npm, pip, gems
- [ ] **Parallel jobs**: Uruchamiaj niezależne joby równolegle
- [ ] **Artifacts**: Przechowuj buildy między jobami
- [ ] **Timeouts**: Ustaw timeout-minutes dla każdego joba
- [ ] **Secrets**: Używaj GitHub Secrets, nigdy nie commituj
- [ ] **Conditions**: Używaj `if:` do conditional execution
- [ ] **Manual approval**: Dla production deployments
- [ ] **Notifications**: Slack/email przy failures
- [ ] **Monitoring**: Health checks po deployment

## Podsumowanie

CI/CD z Claude Code to game-changer:
- **Szybkie tworzenie** - workflow w minutach, nie godzinach
- **Łatwe debugowanie** - AI analizuje logi i sugeruje fixes
- **Best practices** - automatycznie dodawane optymalizacje
- **Platform-agnostic** - GitHub Actions, GitLab, CircleCI

Kluczowe umiejętności:
1. Tworzenie workflow od podstaw
2. Debugowanie failed runs
3. Optymalizacja performance
4. Security integration
5. Multi-stage deployments

## Dodatkowe materiały

### Oficjalna dokumentacja
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitLab CI/CD Documentation](https://docs.gitlab.com/ee/ci/)
- [CircleCI Documentation](https://circleci.com/docs/)

### Narzędzia
- [act](https://github.com/nektos/act) - Run GitHub Actions locally
- [actionlint](https://github.com/rhysd/actionlint) - Linter dla workflows
- [GitHub Actions Toolkit](https://github.com/actions/toolkit) - SDK dla custom actions

### Best Practices
- [GitHub Actions Best Practices](https://docs.github.com/en/actions/learn-github-actions/best-practices-for-github-actions)
- [Awesome Actions](https://github.com/sdras/awesome-actions) - Kurowana lista actions

### Artykuły
- [Optimizing GitHub Actions](https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows)
- [CI/CD Security Best Practices](https://owasp.org/www-project-devsecops-guideline/)

---

**Czas trwania**: ~30 minut
**Poziom**: Zaawansowany
**Wymagania**: Git, YAML, podstawy DevOps, ukończona lekcja 05
