---
title: "Praca z Git"
description: "Naucz się, jak Claude Code integruje się z Git i pomaga w zarządzaniu kodem"
duration: 18
difficulty: beginner
tags: [git, version-control, commit, branch, collaboration]
---

# Praca z Git

## Wprowadzenie

Git to nieodzowne narzędzie każdego programisty. Claude Code ma wbudowaną integrację z Git i może wykonywać większość operacji git bezpośrednio z poziomu konwersacji. W tej lekcji nauczysz się, jak Claude Code może pomóc Ci w codziennej pracy z Git - od commitów po pull requesty.

## Dlaczego to ważne?

Integracja Claude Code z Git to:
- **Bezpieczeństwo:** Wszystkie zmiany są wersjonowane
- **Współpraca:** Łatwe tworzenie PR i code review
- **Wygoda:** Nie musisz przełączać się między narzędziami
- **Automatyzacja:** Claude Code może generować commit messages i changelog
- **Best practices:** Automatyczne stosowanie Conventional Commits

## Co Claude Code może zrobić z Git?

### Podstawowe operacje

Claude Code ma dostęp do narzędzia **Bash**, które pozwala mu wykonywać komendy git:

```bash
git status           # Sprawdzenie statusu
git add             # Dodawanie plików
git commit          # Tworzenie commitów
git push            # Wysyłanie zmian
git pull            # Pobieranie zmian
git branch          # Zarządzanie gałęziami
git checkout        # Przełączanie gałęzi
git merge           # Łączenie gałęzi
git log             # Historia commitów
git diff            # Różnice w kodzie
```

### Zaawansowane funkcje

- **GitHub CLI (gh):** Tworzenie PR, issues, obsługa release
- **Conventional Commits:** Automatyczne formatowanie wiadomości commitów
- **Changelog:** Automatyczne generowanie zmian
- **Branch management:** Inteligentne zarządzanie gałęziami

## Praktyczne scenariusze

### Scenariusz 1: Inicjalizacja repozytorium

```
Ty: Zainicjuj Git w tym projekcie
```

**Claude Code wykona:**
```bash
git init
git add .
git commit -m "Initial commit"
```

**Wynik:**
```
Initialized empty Git repository in /path/to/project/.git/
[main (root-commit) abc1234] Initial commit
 15 files changed, 245 insertions(+)
```

### Scenariusz 2: Sprawdzenie statusu

```
Ty: Jaki jest status git w tym projekcie?
```

**Claude Code wykona:**
```bash
git status
```

**Przykładowy wynik:**
```
On branch main
Changes not staged for commit:
  modified:   src/app.js
  modified:   src/utils.js

Untracked files:
  src/newFeature.js
```

### Scenariusz 3: Commit zmian

```
Ty: Stwórz commit z obecnymi zmianami
```

**Claude Code:**
1. Sprawdzi `git status`
2. Przeanalizuje `git diff`
3. Doda pliki: `git add .`
4. Wygeneruje sensowną wiadomość commit
5. Wykona commit

**Przykładowa wiadomość:**
```
feat: add user authentication feature

- Implement login functionality
- Add JWT token handling
- Create protected routes middleware

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>
```

### Scenariusz 4: Tworzenie nowego brancha

```
Ty: Stwórz nowy branch 'feature/user-profile' i przełącz się na niego
```

**Claude Code wykona:**
```bash
git checkout -b feature/user-profile
```

**Wynik:**
```
Switched to a new branch 'feature/user-profile'
```

### Scenariusz 5: Merge brancha

```
Ty: Zmerguj branch 'feature/user-profile' do main
```

**Claude Code:**
1. Sprawdzi obecny branch
2. Przełączy się na main: `git checkout main`
3. Zmerguje: `git merge feature/user-profile`
4. Pokaże rezultat lub konflikty

### Scenariusz 6: Tworzenie Pull Request

```
Ty: Stwórz pull request dla tego brancha
```

**Claude Code:**
1. Sprawdzi, czy branch jest pushnięty
2. Przeanalizuje zmiany: `git diff main...HEAD`
3. Wygeneruje opis PR
4. Użyje `gh pr create`

**Przykład:**
```bash
gh pr create --title "feat: Add user authentication" --body "$(cat <<'EOF'
## Summary
- Implemented login functionality with JWT
- Added protected routes middleware
- Created user session management

## Test plan
- ✓ Test login with valid credentials
- ✓ Test login with invalid credentials
- ✓ Test protected route access
- ✓ Test token expiration

🤖 Generated with Claude Code
EOF
)"
```

### Scenariusz 7: Historia zmian

```
Ty: Pokaż ostatnie 5 commitów
```

**Claude Code wykona:**
```bash
git log --oneline -5
```

**Wynik:**
```
abc1234 feat: add authentication
def5678 fix: resolve login bug
ghi9012 docs: update README
jkl3456 refactor: improve code structure
mno7890 test: add unit tests
```

## Conventional Commits

Claude Code automatycznie stosuje standard Conventional Commits:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Typy commitów

```
feat:     Nowa funkcjonalność
fix:      Poprawka błędu
docs:     Zmiany w dokumentacji
style:    Formatowanie, brak zmian w logice
refactor: Refaktoryzacja kodu
test:     Dodanie lub poprawka testów
chore:    Zmiany w buildzie, zależnościach
perf:     Poprawka wydajności
ci:       Zmiany w CI/CD
```

### Przykłady

**Nowa funkcjonalność:**
```
feat(auth): add password reset functionality

Implement password reset feature with email verification
- Add reset token generation
- Create email service integration
- Add reset password form
```

**Poprawka błędu:**
```
fix(api): resolve CORS error in production

Fixed CORS configuration to allow production domain
Closes #123
```

**Dokumentacja:**
```
docs(readme): update installation instructions

Add troubleshooting section for common setup issues
```

## Zadanie praktyczne

**Cel:** Przećwicz pełen workflow Git z Claude Code

### Zadanie 1: Setup projektu

```
Ty: Stwórz nowy projekt z Git:
1. Zainicjuj repozytorium
2. Dodaj .gitignore dla Node.js
3. Stwórz plik README.md
4. Zrób initial commit
```

**Sprawdź:**
```
Ty: Pokaż git log
```

### Zadanie 2: Nowa funkcjonalność

```
Ty: Stwórz nowy branch 'feature/calculator' i dodaj plik calculator.js z prostymi funkcjami matematycznymi
```

**Sprawdź:**
```
Ty: Jaki jest obecny branch?
Ty: Pokaż git status
```

### Zadanie 3: Commit i push

```
Ty: Stwórz commit z opisem "feat: add calculator module" i wypchnij na remote
```

**Uwaga:** Jeśli nie masz remote, Claude Code Cię o tym poinformuje.

### Zadanie 4: Testy

```
Ty: Na tym samym branchu dodaj testy dla calculatora i zrób kolejny commit
```

**Sprawdź:**
```
Ty: Pokaż ostatnie 2 commity
```

### Zadanie 5: Merge do main

```
Ty: Wróć na branch main i zmerguj feature/calculator
```

**Sprawdź:**
```
Ty: Pokaż git log --graph --oneline
```

### Zadanie 6: Hotfix

Symulacja szybkiej poprawki:

```
Ty: Stwórz branch 'hotfix/divide-by-zero', napraw błąd z dzieleniem przez zero w calculatorze, commitnij i zmerguj do main
```

### Zadanie 7: Pull Request (jeśli masz GitHub repo)

```
Ty: Stwórz nowy branch 'feature/advanced-calc', dodaj funkcje potęgowania i pierwiastka, a następnie stwórz pull request
```

## Best Practices

### 1. Częste commity

✅ **Dobre:**
```
Ty: Commitnij obecne zmiany
[pracujesz dalej...]
Ty: Commitnij kolejne zmiany
```

❌ **Złe:**
```
[godziny pracy bez commitów]
Ty: Commitnij wszystko
```

### 2. Opisowe wiadomości

✅ **Dobre:**
```
feat(auth): add JWT token refresh mechanism

Implement automatic token refresh before expiration
- Add refresh token endpoint
- Store refresh token securely
- Handle token rotation
```

❌ **Złe:**
```
fix stuff
updated files
changes
```

### 3. Branch naming

✅ **Dobre:**
```
feature/user-authentication
fix/login-validation-bug
hotfix/critical-security-issue
refactor/database-queries
```

❌ **Złe:**
```
new-stuff
fix
test
my-branch
```

### 4. Używaj .gitignore

```
Ty: Zaktualizuj .gitignore, aby ignorować pliki .env i node_modules
```

### 5. Sprawdzaj przed committem

```
Ty: Pokaż mi, co zostanie scommitowane
```

Claude Code wykona `git diff --staged`

### 6. Nie commituj wrażliwych danych

Claude Code ostrzeże Cię, jeśli próbujesz commitować pliki typu:
- `.env`
- `credentials.json`
- `secrets.yml`
- Pliki z hasłami

## Zaawansowane techniki

### 1. Interactive rebase

```
Ty: Chcę połączyć ostatnie 3 commity w jeden. Użyj interactive rebase.
```

**Uwaga:** Claude Code nie może używać interaktywnych narzędzi (-i flag), ale może Ci pomóc w procesie.

### 2. Cherry-pick

```
Ty: Cherry-pickuj commit abc1234 z brancha develop
```

```bash
git cherry-pick abc1234
```

### 3. Stash

```
Ty: Odłóż obecne zmiany na stash, żebym mógł przełączyć branch
```

```bash
git stash
git checkout other-branch
```

Później:
```
Ty: Przywróć zmiany ze stasha
```

```bash
git stash pop
```

### 4. Resolving conflicts

```
Ty: Są konflikty po merge. Pokaż mi, które pliki mają konflikty i pomóż je rozwiązać
```

Claude Code:
1. Wyświetli `git status`
2. Przeczyta pliki z konfliktami
3. Zaproponuje rozwiązania
4. Pomoże w edycji

### 5. Git hooks

```
Ty: Dodaj pre-commit hook, który uruchamia ESLint przed każdym commitem
```

Claude Code stworzy `.git/hooks/pre-commit`

## Integracja z GitHub

### GitHub CLI (gh)

Claude Code może używać `gh` do:

#### Tworzenie issues

```
Ty: Stwórz issue na GitHubie: "Add dark mode support"
```

```bash
gh issue create --title "Add dark mode support" --body "..."
```

#### Wyświetlanie PR

```
Ty: Pokaż otwarte pull requesty
```

```bash
gh pr list
```

#### Code review

```
Ty: Dodaj komentarz do PR #123
```

```bash
gh pr comment 123 --body "LGTM! Great work."
```

#### Sprawdzanie CI/CD

```
Ty: Sprawdź status CI dla ostatniego commitu
```

```bash
gh run list --limit 1
```

## Rozwiązywanie problemów

### Problem: Merge conflict

**Claude Code pomoże:**
1. Zidentyfikuje pliki z konfliktami
2. Pokaże obie wersje
3. Zaproponuje rozwiązanie
4. Dokona edycji
5. Oznaczy jako resolved: `git add`

### Problem: Przypadkowy commit

```
Ty: Cofnij ostatni commit, ale zachowaj zmiany
```

```bash
git reset --soft HEAD~1
```

### Problem: Chcę zmienić ostatnią wiadomość commit

```
Ty: Zmień ostatnią wiadomość commitu na "fix: correct typo in documentation"
```

```bash
git commit --amend -m "fix: correct typo in documentation"
```

**Uwaga:** Claude Code sprawdzi authorship przed --amend!

### Problem: Pushnąłem zmiany na zły branch

```
Ty: Właśnie pushnąłem zmiany na main zamiast feature branch. Co robić?
```

Claude Code:
1. Stworzy nowy branch z obecnych zmian
2. Resetuje main do poprzedniego stanu
3. Force push main (z ostrzeżeniem!)

## Jak Claude Code może Ci pomóc?

Możesz pytać:
- "Jak cofnąć ostatni commit?"
- "Jakie są dobre praktyki nazewnictwa branchy?"
- "Wytłumacz mi, czym jest rebase vs merge"
- "Jak rozwiązać konflikty w Git?"
- "Pokaż przykład dobrego commit message"

## Dodatkowe materiały

### Oficjalna dokumentacja
- [Git Integration in Claude Code](https://docs.claude.com/en/docs/claude-code/git-integration)
- [GitHub CLI Integration](https://docs.claude.com/en/docs/claude-code/github-cli)
- [Conventional Commits](https://www.conventionalcommits.org/)

### Git Resources
- [Pro Git Book (free)](https://git-scm.com/book/en/v2)
- [GitHub Docs](https://docs.github.com/)
- [GitHub CLI Docs](https://cli.github.com/manual/)

### Video tutoriale
- [Git with Claude Code](https://www.youtube.com/results?search_query=claude+code+git)
- [Creating Pull Requests with Claude Code](https://www.youtube.com/results?search_query=claude+code+pull+request)

### Artykuły
- [Git Best Practices](https://github.com/git-tips/tips)
- [Conventional Commits Cheat Sheet](https://www.conventionalcommits.org/en/v1.0.0/#summary)

### Interaktywne tutoriale
- [Learn Git Branching](https://learngitbranching.js.org/)
- [Git Exercises](https://gitexercises.fracz.com/)

### Społeczność
- [GitHub Discussions](https://github.com/anthropics/claude-code/discussions)
- [Discord - #git-help](https://discord.gg/anthropic)

## Podsumowanie

W tej lekcji nauczyłeś się:
- Jak Claude Code integruje się z Git
- Jak wykonywać podstawowe operacje Git przez Claude Code
- Czym są Conventional Commits i dlaczego są ważne
- Jak tworzyć pull requesty z Claude Code
- Jak rozwiązywać typowe problemy z Git
- Jak używać GitHub CLI przez Claude Code

**Gratulacje!** 🎉 Ukończyłeś Moduł 2: Praca z plikami. Teraz znasz wszystkie podstawy pracy z plikami i Git. W Module 3 poznasz zaawansowane narzędzia Claude Code!

---

**Ilustracje:** (do dodania)
- Diagram Git workflow z Claude Code
- Infografika Conventional Commits types
- Screenshot tworzenia PR
- Flowchart rozwiązywania konfliktów
- Diagram Git branching strategy
