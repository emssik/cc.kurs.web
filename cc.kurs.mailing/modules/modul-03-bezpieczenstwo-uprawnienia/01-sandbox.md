# Mail #01: Sandbox - Pierwsza Linia Obrony

---

## Przypomnienie z poprzedniej lekcji

Gratulacje za ukończenie Modułu 2! Opanowałeś już cały arsenał narzędzi Claude Code:

- **Task** - delegowanie pracy do specjalistycznych subagentów (Explore, Plan, Code) dla tańszej i szybszej realizacji zadań
- **TodoWrite** - zarządzanie złożonymi projektami z pełnym śledzeniem postępu (pending → in_progress → completed)
- **AskUserQuestion** - zbieranie preferencji użytkownika zamiast zgadywania, z inteligentnymi rekomendacjami
- **Orkiestracja** - łączenie wszystkich narzędzi w spójny workflow dla maksymalnej efektywności

Teraz czas na **poziom EXPERT**: nauczysz się jak pracować z Claude Code bezpiecznie. Poznasz mechanizmy ochronne, które chronią Twoje dane i system przed nieautoryzowanym dostępem.

---

## 2 pytania do poprzedniej lekcji

1. **Dlaczego używanie subagentów (Task) jest bardziej efektywne kosztowo niż wykonywanie wszystkiego głównym agentem?**
   - Odpowiedź: Subagenty używają tańszych modeli (np. Haiku zamiast Sonnet) i nie zaśmiecają głównego kontekstu. Można je uruchamiać w tle, co przyspiesza wykonanie złożonych zadań.

2. **Kiedy powinieneś użyć TodoWrite, a kiedy nie?**
   - Odpowiedź: UŻYWAJ dla zadań wieloetapowych (>3 kroki), migracji, refaktoryzacji, długoterminowych projektów. NIE UŻYWAJ dla prostych zadań typu "popraw literówkę" czy "dodaj console.log".

---

## TLDR

**Sandbox to Twoja pierwsza linia obrony przed wyciekiem danych.** Claude Code działa w wirtualnej piaskownicy - domyślnie nie widzi niczego poza katalogiem projektu. To chroni Twoje klucze SSH, dane firmowe i wrażliwe pliki.

Dzisiaj nauczysz się:
- Czym jest sandbox i jak chroni system
- Jak testować granice izolacji
- Konfiguracja sandbox w settings.json
- Kiedy (bardzo rzadko!) wyłączać sandbox
- Troubleshooting i edge cases

---

## Mem dnia

![Security Sandbox Meme](https://twitter.com/search?q=sandbox%20security%20developer%20meme)

*"Dev: 'I need access to production database'*
*Security: 'Here's a sandbox'*
*Dev: 'But I need REAL data'*
*Security: 'Here's MORE sandbox'"*

Znajdź swój ulubiony mem o sandboxing i bezpieczeństwie: [#InfoSec #Sandbox #DevOps](https://twitter.com/search?q=%23infosec%20%23sandbox%20%23security%20%23developer)

---

## Czym jest Sandbox?

### Podstawowa koncepcja

**Sandbox to wirtualna piaskownica, w której działa Claude Code.** Domyślnie agent nie widzi niczego poza katalogiem, w którym został uruchomiony.

**Wyobraź sobie to tak:**
```
Twój system:
/
├── Users/
│   ├── .ssh/id_rsa           ← ❌ Claude NIE widzi
│   ├── Documents/faktury/    ← ❌ Claude NIE widzi
│   └── projekty/
│       └── moj-projekt/      ← ✅ Claude WIDZI (tutaj uruchomiony)
│           ├── src/
│           ├── tests/
│           └── package.json
```

**Dlaczego to jest kluczowe?**
- Ochrona przed wyciekiem kluczy SSH (np. `~/.ssh/id_rsa`)
- Izolacja danych firmowych
- Brak dostępu do innych projektów
- Minimalizacja powierzchni ataku

### Różnica: Sandbox vs Docker

**WAŻNE:** Sandbox to NIE jest kontener Docker!

| Aspekt | Sandbox (Claude) | Docker Container |
|--------|------------------|------------------|
| **Poziom izolacji** | Aplikacja | System operacyjny |
| **Co chroni** | Dostęp do katalogów | Cały runtime |
| **Czy chroni przed `rm -rf`?** | ❌ NIE (w dozwolonym katalogu) | ✅ TAK (zniszczy tylko kontener) |
| **Performance overhead** | Minimalny | Średni |
| **Kiedy używać** | Codziennie | Maksymalne bezpieczeństwo |

**Typowy błąd:**
```
❌ "Mam sandbox, więc mogę włączyć bypass permissions"
✅ "Sandbox ogranicza dostęp do katalogów, ale nadal potrzebuję kontroli uprawnień"
```

**Pro-tip:** Dla projektów fintech/healthcare użyj **podwójnej izolacji**: Claude w kontenerze Docker + sandbox aplikacji.

---

## Testowanie Granic Sandbox

### Podstawowy test izolacji

**Eksperyment 1: Próba odczytu pliku poza projektem**

Uruchom Claude w katalogu `/my-project` i poproś:

```
> Read ~/.ssh/id_rsa
```

**Oczekiwany wynik:**
```
❌ Permission denied: path outside sandbox
   Allowed directories:
   - /my-project
```

**Eksperyment 2: Test na pulpit**

Będąc w katalogu projektu:

```
> List files on my desktop
```

**Oczekiwany wynik:**
```
❌ Error: Cannot access ~/Desktop (outside sandbox)
```

### Zaawansowane testy

**Test 1: Linux/Mac - katalogi systemowe**
```bash
claude "read /etc/passwd"
# Oczekiwany wynik: ❌ DENIED
```

**Test 2: Windows - system32**
```bash
claude "read C:\Windows\System32\drivers\etc\hosts"
# Oczekiwany wynik: ❌ DENIED
```

**Pro-tip:** Zapisz te testy jako suite do weryfikacji przed wdrożeniem w zespole:

```bash
# .claude/security-tests.sh
#!/bin/bash

echo "Testing sandbox boundaries..."

# Test 1: SSH keys
claude "read ~/.ssh/id_rsa" 2>&1 | grep -q "Permission denied" && echo "✅ Test 1: SSH protection OK" || echo "❌ Test 1: FAILED"

# Test 2: Parent directory
claude "read ../" 2>&1 | grep -q "outside sandbox" && echo "✅ Test 2: Parent dir protection OK" || echo "❌ Test 2: FAILED"

# Test 3: Home directory
claude "list files in ~/" 2>&1 | grep -q "denied" && echo "✅ Test 3: Home dir protection OK" || echo "❌ Test 3: FAILED"
```

Uruchom po każdej aktualizacji Claude Code.

---

## Edge Case: Symlinki i Hardlinki

### Problem z symlinkami

**Symlink może potencjalnie ominąć ochronę sandbox:**

```bash
# W katalogu projektu tworzymy symlink do klucza SSH
ln -s ~/.ssh/id_rsa /my-project/link_to_key

# Czy Claude może go odczytać?
> Read link_to_key
```

**Oczekiwane zachowanie (Claude Code >1.5):**
```
❌ Permission denied: symlink target outside sandbox
   Symlink: /my-project/link_to_key
   Target:  /Users/you/.ssh/id_rsa (BLOCKED)
```

**Nowoczesne wersje Claude Code rozwiązują symlinki** i blokują dostęp, jeśli target jest poza sandbox.

**Jeśli to NIE działa w Twojej wersji** - zgłoś bug i zastosuj workaround:

```json
// .claude/settings.json
{
  "sandbox": {
    "enabled": true,
    "followSymlinks": false  // Blokuj wszystkie symlinki
  }
}
```

### Hardlinki - mniejszy problem

Hardlinki (w przeciwieństwie do symlinków) są trudniejsze do wykorzystania jako exploit, ponieważ:
- Nie mogą wskazywać na katalogi
- Nie mogą przekraczać granic filesystem
- Claude sprawdza ścieżkę dostępu, nie tylko inode

---

## Konfiguracja Sandbox

### Podstawowa konfiguracja w settings.json

Plik: `.claude/settings.json`

```json
{
  "sandbox": {
    "enabled": true,
    "additionalDirectories": []
  }
}
```

**Ustawienia:**
- `enabled: true` - sandbox aktywny (ZALECANE)
- `enabled: false` - sandbox wyłączony (NIEBEZPIECZNE!)

### additionalDirectories - rozszerzanie dostępu

**Problem:** Pracujesz w monorepo, biblioteki są w sąsiednim katalogu.

**Rozwiązanie:** Dodaj dodatkowe katalogi do dozwolonych:

```json
{
  "sandbox": {
    "enabled": true,
    "additionalDirectories": [
      "../shared-utils/",
      "../packages/",
      "/opt/company-tools/"
    ]
  }
}
```

**Sandbox teraz widzi:**
```
✅ /my-project/           (główny katalog)
✅ /shared-utils/         (dodatkowo dozwolony)
✅ /packages/             (dodatkowo dozwolony)
✅ /opt/company-tools/    (dodatkowo dozwolony)
❌ /Users/you/.ssh/       (nadal zablokowany)
```

### Przykład: Monorepo z Turborepo/Nx

**Struktura projektu:**
```
company-monorepo/
├── apps/
│   ├── web/              ← Tutaj uruchamiasz Claude
│   └── mobile/
├── packages/
│   ├── ui-components/
│   └── utils/
└── tooling/
    └── eslint-config/
```

**Konfiguracja sandbox w `apps/web/.claude/settings.json`:**

```json
{
  "sandbox": {
    "enabled": true,
    "additionalDirectories": [
      "../../packages",
      "../../tooling",
      "/usr/local/share/company-configs"
    ]
  }
}
```

**Pro-tip:** Używaj:
- **Ścieżki relatywne** dla struktury projektu (łatwe przenoszenie między maszynami)
- **Ścieżki absolutne** dla globalnych narzędzi (konsystencja)

---

## Kiedy Wyłączać Sandbox? (BARDZO RZADKO!)

### Scenario 1: Jednorazowe kontenery Docker

```bash
# Uruchom Claude w izolowanym kontenerze
docker run -it --rm -v $(pwd):/workspace \
  -e CLAUDE_CONFIG='{"sandbox":{"enabled":false}}' \
  anthropics/claude-code:latest

# W kontenerze sandbox może być wyłączony - kontener sam jest izolacją
```

### Scenario 2: Maszyny wirtualne do testów

```json
// W VM przeznaczonej TYLKO do testów Claude
{
  "sandbox": {
    "enabled": false
  }
}
```

### Scenario 3: CI/CD (z ostrożnością)

```yaml
# GitHub Actions - izolowany runner
- name: Run Claude Code
  run: |
    echo '{"sandbox":{"enabled":false},"permissions":{"mode":"bypassPermissions"}}' > .claude/settings.json
    claude "analyze and fix tests"
  env:
    CLAUDE_ALLOW_UNSAFE: "true"
```

**WAŻNE:** Nawet w CI/CD rozważ pozostawienie sandbox włączonego. Chroni przed wyciekiem GitHub Secrets z `/home/runner/.ssh`.

### OSTRZEŻENIE

**NIGDY nie wyłączaj sandbox:**
- Na głównej maszynie deweloperskiej
- W projektach z danymi klientów
- W środowisku produkcyjnym
- Bez konsultacji z zespołem security

**Jeśli ktoś mówi "po prostu wyłącz sandbox" - to RED FLAG.**

---

## Typowe Błędy i Pułapki

### Błąd 1: Zbyt szerokie additionalDirectories

**❌ ZŁE:**
```json
{
  "additionalDirectories": ["/Users/username"]
}
```
To faktycznie **wyłącza sandbox** - Claude widzi cały katalog domowy!

**✅ DOBRE:**
```json
{
  "additionalDirectories": [
    "/Users/username/.config/custom-tool",
    "/Users/username/company-templates"
  ]
}
```

**Weryfikacja:** Użyj `/add-dir` slash command lub sprawdź `.claude/settings.json`.

### Błąd 2: Ścieżki relatywne vs absolutne

**Problem:** Ścieżki relatywne są rozwiązywane względem `.claude/`.

```json
{
  "additionalDirectories": ["../shared"]
}
```

Jeśli masz wiele projektów:
- `/project-a/.claude/` → `../shared` = `/shared` ✅
- `/deep/nested/project-b/.claude/` → `../shared` = `/deep/nested/shared` ❌

**Rozwiązanie:** Używaj zmiennych środowiskowych:

```json
{
  "additionalDirectories": [
    "${COMPANY_LIBS_PATH}",
    "${HOME}/.local/share/templates"
  ]
}
```

### Błąd 3: Mylenie sandbox disabled z bypass permissions

**To są DWA różne mechanizmy:**

```json
// ❌ ZŁE: Oba wyłączone = totalna anarchia
{
  "sandbox": {"enabled": false},
  "permissions": {"mode": "bypassPermissions"}
}

// ✅ DOBRE: Sandbox włączony, bypass tylko w CI
{
  "sandbox": {"enabled": true},
  "permissions": {"mode": "bypassPermissions"}  // OK w Docker/CI
}
```

---

## Integracja: Sandbox + CI/CD

### GitHub Actions - bezpieczna konfiguracja

```yaml
name: Claude Code Tasks
on: [push]

jobs:
  analyze:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Configure Claude
        run: |
          mkdir -p .claude
          cat > .claude/settings.json <<EOF
          {
            "sandbox": {
              "enabled": true,
              "additionalDirectories": []
            },
            "permissions": {
              "mode": "bypassPermissions",
              "deny": [
                "Read(**/.env*)",
                "Read(**/secrets.*)"
              ]
            }
          }
          EOF

      - name: Run Claude
        run: claude "analyze code and suggest improvements"
```

**Dlaczego sandbox jest włączony nawet w CI?**
- Chroni GitHub Secrets przed wyciekiem
- Izoluje workspace od runner environment
- Best practice nawet w izolowanych runnerach

---

## Troubleshooting

### "Sandbox disabled" warning

**Objaw:** Widzisz ostrzeżenie przy starcie Claude.

**Debug:**

```bash
# 1. Sprawdź konfigurację
cat .claude/settings.json | jq .sandbox

# 2. Uruchom z debugiem
claude --debug

# 3. Szukaj w logach
# "Sandbox initialization: SKIPPED" = problem
```

**Rozwiązania:**

```bash
# Fix 1: Sprawdź uprawnienia
chmod 755 .claude/
chmod 644 .claude/settings.json

# Fix 2: Usuń zepsutą konfigurację
rm .claude/settings.json
claude --init  # Regeneruj

# Fix 3: Wymuś sandbox
echo '{"sandbox":{"enabled":true}}' > .claude/settings.json
```

### "Cannot access additional directory"

**Objaw:** `additionalDirectories` nie działa.

**Debug checklist:**

```bash
# 1. Czy katalog istnieje?
ls -la /ścieżka/z/additionalDirectories

# 2. Czy masz uprawnienia rx?
stat -f "%Sp %N" /ścieżka  # Mac
stat -c "%A %n" /ścieżka   # Linux

# 3. Czy ścieżka jest poprawna?
realpath /ścieżka/z/additionalDirectories
```

**Rozwiązanie:** Dodaj sprawdzenie w skrypcie setup:

```bash
# scripts/setup-claude.sh
#!/bin/bash

REQUIRED_DIRS=(
  "/opt/company-tools"
  "../shared-utils"
)

for dir in "${REQUIRED_DIRS[@]}"; do
  if [ ! -d "$dir" ]; then
    echo "⚠️  Warning: $dir not found"
    echo "   Some features may be unavailable"
  fi
done
```

---

## Przykłady Biznesowe

### 1. Biuro rachunkowe - ochrona danych klientów

**Scenario:** Przetwarzasz faktury klientów, masz wrażliwe dane finansowe.

```json
// .claude/settings.json
{
  "sandbox": {
    "enabled": true,
    "additionalDirectories": []  // Tylko bieżący projekt
  },
  "permissions": {
    "deny": [
      "Read(**/faktury-klientow/**)",
      "Read(**/*PESEL*)",
      "Read(**/*NIP*)"
    ]
  }
}
```

**Workflow:**
1. Utwórz katalog `temp-workspace/` dla Claude
2. Skopiuj TYLKO niezbędne pliki (zanonimizowane)
3. Uruchom Claude w `temp-workspace/`
4. Sandbox chroni przed dostępem do reszty

### 2. Software house - izolacja projektów klientów

**Struktura:**
```
~/projects/
├── client-a/
│   └── .claude/settings.json  # Sandbox: tylko client-a
├── client-b/
│   └── .claude/settings.json  # Sandbox: tylko client-b
└── internal-tools/
```

**Każdy projekt ma własny sandbox** - zero ryzyka wycieku między klientami.

### 3. Startup - bezpieczna praca z API keys

**Problem:** Twój `.env` ma klucze API.

**Rozwiązanie:**
```json
{
  "sandbox": {
    "enabled": true
  },
  "permissions": {
    "deny": [
      "Read(**/.env*)",
      "Bash(*cat*.env*)",
      "Bash(*grep*.env*)"
    ]
  }
}
```

**Bonus:** Hook sprawdzający czy przypadkiem nie committujesz `.env`:

```bash
# .git/hooks/pre-commit
#!/bin/bash
if git diff --cached --name-only | grep -q "\.env"; then
  echo "❌ BLOCKED: Attempting to commit .env file!"
  exit 1
fi
```

---

## Podsumowanie

Właśnie poznałeś **pierwszy i najważniejszy mechanizm ochronny** Claude Code:

1. **Sandbox izoluje dostęp** - Claude widzi tylko katalog projektu
2. **Nie jest to Docker** - to izolacja na poziomie aplikacji
3. **Testuj granice** - weryfikuj ochronę przed pracą z wrażliwymi danymi
4. **additionalDirectories** - rozszerzaj dostęp precyzyjnie
5. **Wyłączaj sandbox tylko w izolowanych środowiskach** (Docker, VM, CI)
6. **Uważaj na symlinki** - nowoczesne wersje je blokują
7. **Łącz z deny lists** - sandbox + permissions = podwójna ochrona

### Kluczowe wnioski:

- **Sandbox to Twoja pierwsza linia obrony** - nigdy nie pracuj bez niego na produkcji
- **Testuj regularnie** - zwłaszcza po aktualizacjach
- **Ścieżki absolutne dla globalnych narzędzi, relatywne dla struktury projektu**
- **W razie wątpliwości - zostaw sandbox włączony**

---

## Pytania kontrolne

Sprawdź czy opanowałeś materiał:

1. **Czy sandbox chroni przed wykonaniem `rm -rf` w dozwolonym katalogu?**

   <details>
   <summary>Podpowiedź</summary>
   ❌ NIE. Sandbox ogranicza tylko dostęp do katalogów, nie blokuje destrukcyjnych komend w obrębie dozwolonego obszaru. Potrzebujesz dodatkowo deny list dla niebezpiecznych komend Bash.
   </details>

2. **Masz monorepo z Turborepo. Jak skonfigurować sandbox aby Claude widział packages ale nie ~/.ssh?**

   <details>
   <summary>Podpowiedź</summary>
   ```json
   {
     "sandbox": {
       "enabled": true,
       "additionalDirectories": [
         "../../packages",
         "../../shared",
         "../../tooling"
       ]
     }
   }
   ```
   Ścieżki relatywne wskazują na katalogi w monorepo, ale sandbox nadal blokuje ~/.ssh.
   </details>

3. **Kiedy jest OK wyłączyć sandbox?**

   <details>
   <summary>Podpowiedź</summary>
   Tylko w izolowanych środowiskach:
   - Jednorazowe kontenery Docker
   - Dedykowane maszyny wirtualne do testów
   - CI/CD runners (z ostrożnością)

   NIGDY na głównej maszynie deweloperskiej ani z danymi klientów.
   </details>

---

## Zadania praktyczne

### Zadanie 1: Test izolacji

**Cel:** Zweryfikuj że Twój sandbox działa poprawnie.

```bash
# W katalogu projektu uruchom:
> Spróbuj odczytać plik ~/.ssh/id_rsa

# Oczekiwany wynik: Permission denied
```

Jeśli Claude odczytał plik - **ALARM! Sandbox nie działa.**

---

### Zadanie 2: Konfiguracja monorepo

**Cel:** Skonfiguruj sandbox dla struktury monorepo.

Jeśli pracujesz w monorepo:
```
> Skonfiguruj sandbox tak aby widzieć tylko packages/ i shared/, ale nie parent directory
```

Sprawdź konfigurację:
```bash
cat .claude/settings.json
```

---

### Zadanie 3: Security audit

**Cel:** Stwórz suite testów bezpieczeństwa.

Utwórz plik `.claude/security-tests.sh`:
```bash
#!/bin/bash
echo "Running security tests..."

# Test 1: SSH protection
# Test 2: Parent directory
# Test 3: Home directory
# ... (użyj przykładów z maila)

echo "Security audit complete"
```

Uruchom i zweryfikuj wyniki.

---

## Linki do zasobów

**Dokumentacja i bezpieczeństwo:**
- [Claude Code Security Best Practices](https://docs.anthropic.com/claude-code/security) - Oficjalne wytyczne
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Najczęstsze zagrożenia bezpieczeństwa
- [Principle of Least Privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege) - Filozofia minimalnych uprawnień

**Narzędzia do testowania:**
- [git-secrets](https://github.com/awslabs/git-secrets) - Skanowanie sekretów w repo
- [detect-secrets](https://github.com/Yelp/detect-secrets) - Wykrywanie credentials w kodzie
- [Docker Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html) - Bezpieczne kontenery

**Community i case studies:**
- [r/netsec](https://reddit.com/r/netsec) - Dyskusje o bezpieczeństwie
- [Cloud Security Alliance](https://cloudsecurityalliance.org/) - Best practices dla chmury
- [Security StackExchange](https://security.stackexchange.com/) - Q&A o bezpieczeństwie

---

## Co dalej?

**Następny mail: Typy Uprawnień i Tryby**

Nauczysz się:
- Read vs Edit vs Bash - poziomy ryzyka
- Normal, Accept Edits, Plan, Bypass modes
- Allow/Deny lists - precyzyjna kontrola
- Git Safety Protocol
- Ochrona wrażliwych plików

**Start za 2 dni** - dajemy Ci czas na przetestowanie sandbox!

---

*P.S. Wykonałeś test izolacji? Czy Twój sandbox działa poprawnie? Podziel się wynikami na Discordzie!*

*P.P.S. Znalazłeś lukę w sandboxie? Zgłoś ją do Anthropic - to poważna sprawa bezpieczeństwa.*
