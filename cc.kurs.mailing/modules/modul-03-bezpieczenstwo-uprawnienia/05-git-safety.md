# Mail #05: Git Safety Protocol - Bezpieczna Praca z Repozytorium

## Przypomnienie z poprzedniej lekcji

W poprzedniej lekcji zagłębiliśmy się w **ochronę wrażliwych plików** przed przypadkowym wyciekiem do repozytorium. Poznaliśmy `.gitignore` dla całego projektu, `.git/info/exclude` dla lokalnych preferencji oraz `git-secrets` i `pre-commit hooks` do aktywnej obrony przed commitowaniem kluczy API i haseł. Nauczyliśmy Claude'a rozpoznawać wzorce plików wrażliwych (`*.env`, `credentials.json`, `*.pem`) i automatycznie blokować ich dodawanie do staging area.

Kluczowa lekcja: bezpieczeństwo to wiele warstw ochrony - nie polegaj tylko na jednej metodzie.

## 2 pytania do poprzedniej lekcji

1. **Jaka jest różnica między `.gitignore` a `.git/info/exclude`?** Kiedy użyjesz którego rozwiązania?
2. **Dlaczego `git-secrets` jest lepszy niż samo `.gitignore`** do ochrony kluczy API?

<details>
<summary>Odpowiedzi</summary>

1. `.gitignore` jest commitowany i współdzielony z całym zespołem (ignoruje pliki wspólne dla projektu), `.git/info/exclude` działa lokalnie i nie jest synchronizowany (ignoruje Twoje osobiste pliki robocze, np. `.idea/`, notatki). Użyjesz `.gitignore` dla `.env`, a `exclude` dla edytora.
2. Bo `.gitignore` tylko ukrywa pliki, ale jeśli developerzy ręcznie zrobią `git add -f secrets.txt`, sekret i tak wycieknie. `git-secrets` **aktywnie skanuje** treść commitów i **blokuje** push, gdy wykryje wzorce kluczy (AWS, API keys) - nawet jeśli są w kodzie, nie w osobnych plikach.

</details>

---

## TLDR (Too Long, Didn't Read)

Git Safety Protocol to zestaw zasad, które chronią Twoje repozytorium przed destrukcyjnymi operacjami Claude'a:
- **Nigdy** `git push --force` ani `--no-verify` - blokujemy pomijanie zabezpieczeń
- **HEREDOC dla commit messages** - `git commit -F -` zamiast `-m` eliminuje problemy z wieloliniowymi opisami
- **Amend protocol** - `--amend` tylko jeśli commit NIE został wypchnięty, inaczej niszczysz historię zespołu

Kluczowe narzędzia: git hooks (pre-push, pre-commit), Commitizen dla spójnych formatów, protected branches w GitHub/GitLab.

---

## Mem z Twittera

Znasz to uczucie, gdy kolega robi `git push --force` na main i cały zespół traci dzień pracy?

**["Me: *accidentally does git push --force to main* / Team: *silence* / Me: I'm in danger" + Ralph Wiggum meme](https://twitter.com/gitlost/status/1234567890)**

Właśnie dlatego Git Safety Protocol istnieje - Claude Code nigdy nie zrobi force push bez Twojej zgody. Zawsze.

---

## Treść lekcji: Git Safety - Ochrona przed Samozniszczeniem

### 1. Git Safety Rules - Czarna Lista Komend

Git to najpotężniejsze narzędzie do wersjonowania kodu, ale również najbardziej niebezpieczne. Kilka niewłaściwych flag może zniszczyć historię commitów, usunąć godziny pracy lub zablokować CI/CD.

**Zasada Podstawowa:** Claude **NIGDY** nie powinien używać destrukcyjnych operacji git bez Twojej jawnej zgody.

#### Deny List - Komendy Zabronione

```json
{
  "permissions": {
    "deny": [
      "Bash(git push:*--force*)",       // Force push = niszczenie historii zdalnej
      "Bash(git push:*-f*)",            // Skrót force push
      "Bash(git commit:*--no-verify*)", // Pomija pre-commit hooks
      "Bash(git commit:*-n*)",          // Skrót --no-verify
      "Bash(git reset:*--hard*)",       // Usuwa uncommitted changes
      "Bash(git clean:*-fd*)",          // Usuwa untracked files
      "Bash(git rebase:*-i*)",          // Interactive mode nie działa w CLI
      "Bash(git cherry-pick:*--skip*)"  // Ryzyko utraty commitów
    ]
  }
}
```

**Dlaczego te komendy są niebezpieczne?**

- **`git push --force`**: Nadpisuje zdalne commity, niszcząc pracę innych osób. Jeśli zespół pobrał już zmiany, ich lokalne repo zostaje rozsynchronizowane.
- **`--no-verify`**: Pomija git hooks (linters, testy, walidatory). Jeśli hook blokuje commit z powodu błędów składni, `--no-verify` pozwala wrzucić zepsuty kod.
- **`git reset --hard`**: Usuwa wszystkie niezcommitowane zmiany bez możliwości odzyskania. Godziny pracy przepadają.
- **`git rebase -i`**: Wymaga interaktywnego edytora, który nie działa w środowisku CLI Claude'a. Claude zostanie zablokowany.

#### Ask List - Komendy Wymagające Zgody

```json
{
  "permissions": {
    "ask": [
      "Bash(git push*)",        // Push do remote wymaga potwierdzenia
      "Bash(git merge*)",       // Merge może tworzyć konflikty
      "Bash(git rebase*)",      // Rebase przepisuje historię
      "Bash(git stash:drop*)"   // Nieodwracalne usunięcie stash
    ]
  }
}
```

**Dlaczego wymagają zgody?**
- **Push/Merge/Rebase**: Zmieniają zdalne repo lub lokalną historię - chcesz wiedzieć, kiedy to się dzieje.
- **Stash drop**: Usuwa zapisane zmiany bez możliwości odzyskania.

---

### 2. Commit Message Format z HEREDOC

**Problem:**
Zwykłe `git commit -m "message"` w bashu ma koszmarne problemy z wieloliniowymi opisami, cudzysłowami i znakami specjalnymi:

```bash
# To się zepsuje:
git commit -m "feat: Add user auth

This commit adds:
- Login form
- JWT tokens
- Password reset"

# Bash zinterpretuje newline jako koniec komendy
```

**Rozwiązanie: HEREDOC**

HEREDOC (`<<EOF`) to składnia basha, która pozwala przekazać wieloliniowy tekst bez ucieczki znaków:

```bash
git commit -F - <<'EOF'
feat: Add user authentication system

This commit implements:
- Login/logout forms with React Hook Form
- JWT token management in localStorage
- Password reset flow via email
- Protected routes with AuthGuard component

Breaking change: Old session cookies are no longer supported

🤖 Generated with Claude Code
Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
EOF
```

**Jak to działa:**
- `git commit -F -`: Czyta wiadomość ze stdin (zamiast `-m`)
- `<<'EOF'`: Rozpoczyna heredoc (cudzysłowy `'EOF'` wyłączają interpolację zmiennych)
- Wszystko między `<<'EOF'` a `EOF` jest traktowane dosłownie - żadnych problemów z cudzysłowami, newlines, itp.

**Dodaj do CLAUDE.md:**

```markdown
## Git Commit Message Format

ALWAYS use HEREDOC for commit messages to avoid bash escaping issues:

```bash
git commit -F - <<'EOF'
<type>(<scope>): <subject>

<body>

🤖 Generated with Claude Code
Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
EOF
```

NEVER use `git commit -m "..."` for multi-line messages.
```

---

### 3. Amend Protocol - Kiedy Można Przepisać Historię

`git commit --amend` pozwala "poprawić" ostatni commit - zmienić wiadomość, dodać zapomniany plik, naprawić literówkę. Ale jest haczyk.

**Bezpieczny Amend:**
```bash
# Commitujesz lokalnie
git commit -F - <<'EOF'
feat: Add login form
EOF

# Zauważasz literówkę w kodzie PRZED pushowaniem
git add login.tsx
git commit --amend --no-edit

# Pushowanie - wszystko OK, bo remote jeszcze nie ma pierwszego commita
git push
```

**Niebezpieczny Amend:**
```bash
# Commitujesz i pushowujesz
git commit -m "feat: Add login form"
git push

# Zauważasz błąd, robisz amend
git commit --amend -m "feat: Add login form with validation"

# Próba push = ERROR
git push
# > error: failed to push some refs
# > Updates were rejected because the tip of your current branch is behind

# Musisz użyć force push = niszczysz historię dla zespołu
git push --force  # ❌ NIGDY NIE RÓB TEGO
```

**Zasada Amend Protocol:**

✅ **Używaj `--amend` TYLKO jeśli commit NIE został wypchnięty**

Jak sprawdzić, czy commit jest lokalny?
```bash
git log @{u}..
# Jeśli pokazuje Twój commit = nie został wypchnięty (amend OK)
# Jeśli puste = commit już jest na remote (amend = BAD)
```

**Dodaj do CLAUDE.md:**

```markdown
## Git Amend Rules

- NEVER use `git commit --amend` after pushing to remote
- If commit was already pushed and needs fixing:
  1. Create a NEW commit with the fix
  2. Use message: "fix: correct issue from previous commit"
- Only use --amend if `git log @{u}..` shows commit is not pushed yet
```

---

### 4. Git Hooks - Automatyczna Walidacja

Git hooks to skrypty, które uruchamiają się automatycznie przy określonych operacjach (commit, push, merge). Są Twoją ostatnią linią obrony przed błędami.

#### Pre-Commit Hook - Walidacja Przed Commitem

Typowe użycie: Linter, formatter, testy jednostkowe.

**Przykład: Prettier + ESLint**

`.git/hooks/pre-commit`:
```bash
#!/bin/bash

echo "Running pre-commit checks..."

# Format kodu
npm run format:check
if [ $? -ne 0 ]; then
  echo "❌ Code formatting failed. Run 'npm run format' to fix."
  exit 1
fi

# Lint
npm run lint
if [ $? -ne 0 ]; then
  echo "❌ Linting failed. Fix errors above."
  exit 1
fi

echo "✅ Pre-commit checks passed"
exit 0
```

**Ustaw uprawnienia:**
```bash
chmod +x .git/hooks/pre-commit
```

Teraz każdy `git commit` automatycznie uruchomi formatter i lintera. Jeśli Claude próbuje commitować zepsuty kod, hook odrzuci commit.

#### Pre-Push Hook - Blokada Force Push i Protected Branches

`.git/hooks/pre-push`:
```bash
#!/bin/bash

BRANCH=$(git branch --show-current)

# Zablokuj push na main/master bez PR
if [[ "$BRANCH" == "main" || "$BRANCH" == "master" ]]; then
  # Sprawdź czy to Claude (wykryj commit message footer)
  LAST_COMMIT_MSG=$(git log -1 --pretty=%B)
  if echo "$LAST_COMMIT_MSG" | grep -q "Co-Authored-By: Claude"; then
    echo "❌ BLOCKED: Claude nie może pushować bezpośrednio na $BRANCH"
    echo "Użyj Pull Request workflow zamiast direct push"
    exit 1
  fi
fi

# Zablokuj force push
while read local_ref local_sha remote_ref remote_sha; do
  if [[ "$remote_sha" == "0000000000000000000000000000000000000000" ]]; then
    # Nowy branch, OK
    continue
  fi

  # Sprawdź czy remote_sha jest przodkiem local_sha (normalny push)
  if git merge-base --is-ancestor "$remote_sha" "$local_sha" 2>/dev/null; then
    : # Normal push, OK
  else
    echo "❌ BLOCKED: Wykryto próbę force push!"
    echo "Remote SHA: $remote_sha"
    echo "Local SHA: $local_sha"
    exit 1
  fi
done

echo "✅ Pre-push checks passed"
exit 0
```

**Ustaw uprawnienia:**
```bash
chmod +x .git/hooks/pre-push
```

---

### 5. Kompletna Konfiguracja Git Safety

Łączmy wszystko w jedną, produkcyjną konfigurację dla Claude Code.

**`.claude/permissions.json`:**
```json
{
  "permissions": {
    "allow": [
      "Bash(git status)",
      "Bash(git diff*)",
      "Bash(git log*)",
      "Bash(git branch*)",
      "Bash(git checkout:*)",
      "Bash(git add:*)",
      "Bash(git commit:-F*)"
    ],
    "deny": [
      "Bash(git push:*--force*)",
      "Bash(git push:*-f*)",
      "Bash(git commit:*--no-verify*)",
      "Bash(git commit:*-n*)",
      "Bash(git reset:*--hard*)",
      "Bash(git clean:*-fd*)",
      "Bash(git rebase:*-i*)"
    ],
    "ask": [
      "Bash(git push*)",
      "Bash(git merge*)",
      "Bash(git rebase*)",
      "Bash(git stash:drop*)",
      "Bash(git commit:*--amend*)"
    ]
  },
  "hooks": {
    "postToolUse": {
      "Bash(git commit*)": "bash -c 'if [ $TOOL_EXIT_CODE -ne 0 ]; then echo \"⚠️ Commit failed - check hook output above and fix errors\"; fi'"
    }
  }
}
```

**`CLAUDE.md`:**
```markdown
## Git Workflow Rules

### Commit Messages
Always use HEREDOC format:
```bash
git commit -F - <<'EOF'
<type>(<scope>): <subject>

<body>

🤖 Generated with Claude Code
Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
EOF
```

Types: feat, fix, docs, style, refactor, test, chore

### Amend Protocol
- NEVER use `git commit --amend` after pushing to remote
- Check if commit is local: `git log @{u}..`
- If already pushed, create NEW commit instead

### Push Protocol
- NEVER use `git push --force` or `-f`
- NEVER push directly to main/master - use Pull Requests
- If push fails due to remote changes, pull and rebase first

### Hook Failures
If pre-commit or pre-push hook fails:
1. Read the error output carefully
2. Fix the issues (linting, tests, formatting)
3. Try committing again
4. NEVER use `--no-verify` to bypass hooks
```

**`.git/hooks/pre-commit`** (prettier + lint):
```bash
#!/bin/bash
echo "Running pre-commit checks..."
npm run lint || exit 1
npm run format:check || exit 1
echo "✅ Pre-commit passed"
```

**`.git/hooks/pre-push`** (force push blocker):
```bash
#!/bin/bash
BRANCH=$(git branch --show-current)

if [[ "$BRANCH" == "main" || "$BRANCH" == "master" ]]; then
  echo "❌ Direct push to $BRANCH is blocked. Use Pull Request."
  exit 1
fi

# Anti-force-push logic (patrz wyżej)
```

---

### 6. Commitizen - Spójne Commit Messages

Jeśli chcesz wymusić na Claude'ie (i całym zespole) używanie Conventional Commits, użyj **Commitizen**.

**Instalacja:**
```bash
npm install -D commitizen cz-conventional-changelog

# Dodaj do package.json
npm set-script commit "git-cz"
```

**`package.json`:**
```json
{
  "scripts": {
    "commit": "git-cz"
  },
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  }
}
```

**`.claude/permissions.json`** (wymuszanie Commitizen):
```json
{
  "permissions": {
    "deny": ["Bash(git commit:-m*)"],  // Blokuj zwykłe git commit -m
    "allow": ["Bash(npm run commit)"]   // Wymuszaj Commitizen
  }
}
```

**`CLAUDE.md`:**
```markdown
## Commit Messages

Always use Commitizen instead of `git commit`:

```bash
git add .
npm run commit
```

Format: `<type>(<scope>): <subject>`
Types: feat, fix, docs, style, refactor, test, chore
```

Teraz Claude **nie może** użyć `git commit -m`, tylko `npm run commit`, który uruchomi interaktywny wizard Commitizen (ale w CLI Claude'a może być problem z interaktywnością - wtedy zostań przy HEREDOC).

---

### 7. Protected Branches - Ochrona na Poziomie Serwera

Git hooks działają lokalnie, ale co jeśli ktoś je usunie? **Protected branches** w GitHub/GitLab/Bitbucket to server-side ochrona, której nie można ominąć.

#### GitHub - Branch Protection Rules

1. Idź do **Settings** → **Branches** → **Add rule**
2. Branch name pattern: `main`
3. Włącz:
   - ✅ **Require pull request reviews before merging** (wymagaj code review)
   - ✅ **Require status checks to pass** (CI musi przejść)
   - ✅ **Require branches to be up to date** (wymuś merge z main przed PR)
   - ✅ **Include administrators** (nawet admini nie mogą ominąć)
   - ✅ **Do not allow bypassing the above settings**

4. **Force pushes**: Ustaw na **Do not allow**

Teraz nawet jeśli Claude (lub człowiek) spróbuje `git push --force`, GitHub odrzuci operację.

#### GitLab - Protected Branches

1. **Settings** → **Repository** → **Protected Branches**
2. Branch: `main`
3. Allowed to merge: **Maintainers**
4. Allowed to push: **No one**
5. **Allowed to force push**: Unchecked

---

### 8. Troubleshooting - "Git hook failed, commit rejected"

**Symptom:**
Claude próbuje commitować, pre-commit hook (ESLint, Prettier) zawodzi z błędem:

```
Running pre-commit checks...
❌ Linting failed:
  /src/components/Login.tsx
    12:5  error  'useState' is not defined  no-undef
```

**Dobre Zachowanie Claude'a:**
1. Przeczytać output hooka
2. Zidentyfikować problem: brakujący import `useState`
3. Naprawić plik: `import { useState } from 'react'`
4. Dodać do staging: `git add src/components/Login.tsx`
5. Spróbować commitować ponownie

**Złe Zachowanie Claude'a:**
```bash
# Claude ignoruje błąd i próbuje obejść hook
git commit --no-verify -m "feat: Add login"
```

**Jak naprawić?**

Dodaj `postToolUse` hook, który wymusi analizę błędów:

**`.claude/permissions.json`:**
```json
{
  "hooks": {
    "postToolUse": {
      "Bash(git commit*)": "bash -c 'if [ $TOOL_EXIT_CODE -ne 0 ]; then echo \"⚠️ Commit failed. READ THE OUTPUT ABOVE and fix the errors. DO NOT use --no-verify.\"; fi'"
    }
  }
}
```

Teraz każdy nieudany commit wyświetli ostrzeżenie, zmuszając Claude'a do analizy błędu.

---

### 9. Przykłady Biznesowe

#### Przypadek 1: Startup - Ochrona Produkcji

**Scenariusz:** Małe startupy często mają słabą organizację repo. Junior dev (lub Claude) może przypadkowo wypchnąć niedokończony kod na `main`, psując produkcję.

**Rozwiązanie:**
- Protected branch `main` (tylko merge przez PR)
- Pre-push hook blokujący direct push
- CI/CD wymaga przejścia testów przed merge

**Efekt:** Produkcja jest zawsze stabilna, błędy są łapane w PR review.

---

#### Przypadek 2: Enterprise - Compliance i Audit

**Scenariusz:** Firmy finansowe/medyczne muszą spełniać compliance (SOC 2, HIPAA). Każda zmiana w kodzie musi być zatwierdzona i auditowana.

**Rozwiązanie:**
- Commitizen wymusza Conventional Commits (łatwy audit: "kto, co, kiedy")
- Protected branches z wymogiem 2+ reviewerów
- Git hooks blokują commit secrets (git-secrets)
- Commit messages z footerami: `Co-Authored-By: Claude` (transparentność AI)

**Efekt:** Pełna audytowość zmian, compliance spełniony, AI nie może obejść procedur.

---

#### Przypadek 3: Open Source - Współpraca z Wolontariuszami

**Scenariusz:** Projekt open-source z setkami contributorów. Trudno egzekwować standardy commitów.

**Rozwiązanie:**
- Commitizen w `package.json` (contributor uruchamia `npm run commit`)
- Pre-commit hook: Prettier auto-formatuje kod
- GitHub Action: Automatyczny lint + test przy każdym PR
- Protected `main`: Tylko maintainerzy mogą mergować

**Efekt:** Kod zawsze sformatowany, commity spójne, PR review łatwiejszy.

---

### 10. Checklist - Git Safety Setup

Użyj tego checklisty, aby skonfigurować Git Safety w swoim projekcie:

**Lokalna Konfiguracja:**
- [ ] Dodaj `.claude/permissions.json` z deny list (force push, --no-verify)
- [ ] Dodaj `CLAUDE.md` z Git Workflow Rules
- [ ] Stwórz `.git/hooks/pre-commit` (lint + format)
- [ ] Stwórz `.git/hooks/pre-push` (anti-force-push)
- [ ] Ustaw `chmod +x` na hookach
- [ ] Zainstaluj Commitizen (opcjonalnie)
- [ ] Dodaj `git-secrets` (opcjonalnie)

**Remote Konfiguracja (GitHub/GitLab):**
- [ ] Włącz Protected Branch dla `main`
- [ ] Wymagaj PR reviews (min. 1-2 osoby)
- [ ] Wymagaj przejścia CI/CD przed merge
- [ ] Zablokuj force push na `main`
- [ ] Włącz "Require branches to be up to date"

**Testy:**
- [ ] Spróbuj `git push --force` → powinno być zablokowane
- [ ] Commitnij kod z błędami lintera → pre-commit powinien odrzucić
- [ ] Spróbuj `git commit --no-verify` → permissions.json powinien zablokować
- [ ] Pushuj do `main` bez PR → GitHub/GitLab powinien odrzucić

---

## Podsumowanie

1. **Git Safety Protocol** chroni Twoje repozytorium przed destrukcyjnymi operacjami Claude'a - blokujemy `--force`, `--no-verify`, `--hard reset` przez deny list w permissions.json.

2. **HEREDOC (`git commit -F -`)** eliminuje problemy z wieloliniowymi commit messages w bashu - zawsze używaj tego formatu zamiast `-m`.

3. **Amend Protocol**: `git commit --amend` TYLKO jeśli commit nie został wypchnięty (sprawdź `git log @{u}..`). Jeśli już pushowałeś, stwórz nowy commit zamiast amendować.

4. **Git Hooks (pre-commit, pre-push)** automatycznie walidują kod przed commitem i blokują niebezpieczne operacje - ostatnia linia obrony przed błędami.

5. **Protected Branches** na GitHub/GitLab wymuszają PR workflow i blokują direct push na `main` - server-side ochrona, której nie można ominąć lokalnie.

---

## 3 pytania kontrolne

1. **Dlaczego `git push --force` jest niebezpieczny?** Co się stanie, jeśli użyjesz go na współdzielonym branchu?

2. **Kiedy możesz bezpiecznie użyć `git commit --amend`?** Jak sprawdzić, czy commit został już wypchnięty?

3. **Jaka jest różnica między git hookami (pre-commit) a protected branches?** Którą ochronę można ominąć lokalnie?

<details>
<summary>Odpowiedzi</summary>

1. `git push --force` nadpisuje zdalną historię commitów, niszcząc zmiany innych osób. Jeśli ktoś pobrał już zmiany, jego lokalne repo zostaje rozsynchronizowane - może stracić swoje commity. W najgorszym wypadku zespół traci dni pracy.

2. Możesz użyć `--amend` TYLKO jeśli commit nie został wypchnięty do remote. Sprawdź: `git log @{u}..` - jeśli pokazuje Twój commit, to jest lokalny (amend OK). Jeśli puste, commit już jest na remote (amend wymaga force push = BAD).

3. Git hooki działają lokalnie i można je usunąć/ominąć (`--no-verify`). Protected branches działają server-side (GitHub/GitLab) i NIE MOŻNA ich ominąć - nawet jeśli usuniesz hooki, serwer odrzuci push. Hooki to pierwsza linia obrony, protected branches to ostateczna bariera.

</details>

---

## 2-3 zadania praktyczne

### Zadanie 1: Skonfiguruj Git Safety Protocol (15 min)

**Cel:** Zabezpiecz swoje repo przed destrukcyjnymi operacjami Claude'a.

**Kroki:**
1. Stwórz `.claude/permissions.json` z deny list:
   ```json
   {
     "permissions": {
       "deny": [
         "Bash(git push:*--force*)",
         "Bash(git commit:*--no-verify*)",
         "Bash(git reset:*--hard*)"
       ],
       "ask": ["Bash(git push*)"]
     }
   }
   ```

2. Dodaj do `CLAUDE.md`:
   ```markdown
   ## Git Rules
   - NEVER use git push --force
   - NEVER use --no-verify
   - Always use HEREDOC for commit messages
   ```

3. Przetestuj: Poproś Claude'a, aby spróbował `git push --force` - powinno być zablokowane.

**Bonus:** Dodaj `ask` dla `git commit --amend`.

---

### Zadanie 2: Stwórz Pre-Commit Hook (20 min)

**Cel:** Automatyczna walidacja kodu przed commitem.

**Kroki:**
1. Stwórz `.git/hooks/pre-commit`:
   ```bash
   #!/bin/bash
   echo "Running linter..."
   npm run lint || exit 1
   echo "✅ Lint passed"
   ```

2. Ustaw uprawnienia: `chmod +x .git/hooks/pre-commit`

3. Przetestuj:
   - Wprowadź błąd lintera w pliku (np. usuń średnik)
   - Spróbuj commitować
   - Hook powinien odrzucić commit z komunikatem błędu

4. Napraw błąd i commitnij ponownie - teraz powinno przejść.

**Bonus:** Dodaj Prettier do hooka: `npm run format || exit 1`.

---

### Zadanie 3: Włącz Protected Branch na GitHub (10 min)

**Cel:** Server-side ochrona przed direct push na `main`.

**Kroki:**
1. Idź do **Settings** → **Branches** → **Add rule**
2. Branch name pattern: `main`
3. Włącz:
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass (jeśli masz CI)
   - ✅ Do not allow force pushes
4. Zapisz regułę

5. Przetestuj:
   - Lokalnie zrób commit na `main`
   - Spróbuj `git push`
   - GitHub powinien odrzucić push z komunikatem "protected branch"

6. Stwórz feature branch, zrób commit, wypchnij, stwórz PR - teraz powinno działać.

---

## Linki do zasobów

1. **[Git Hooks Documentation](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)** - Oficjalna dokumentacja git hooks (pre-commit, pre-push, post-merge)

2. **[Commitizen - Conventional Commits Tool](https://github.com/commitizen/cz-cli)** - Narzędzie do wymuszania Conventional Commits w zespole

3. **[GitHub Protected Branches Guide](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)** - Jak skonfigurować branch protection rules

4. **[git-secrets - Prevent Committing Secrets](https://github.com/awslabs/git-secrets)** - AWS tool do wykrywania kluczy API w commitach

5. **[Conventional Commits Specification](https://www.conventionalcommits.org/)** - Standard formatowania commit messages (feat, fix, chore, etc.)
