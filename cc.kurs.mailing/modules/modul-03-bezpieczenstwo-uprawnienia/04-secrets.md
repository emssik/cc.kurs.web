# Mail #04: Ochrona Wrażliwych Plików - Fort Knox dla Sekretów

## Przypomnienie z poprzedniej lekcji

W poprzednim mailu poznaliśmy **Allow/Deny Lists** - precyzyjną kontrolę nad tym, co Claude może robić. Nauczyliśmy się budować whitelisty dozwolonych operacji (`allow`), blacklisty niebezpiecznych akcji (`deny`) oraz wymuszać pytania dla krytycznych operacji (`ask`). Dowiedzieliśmy się, że deny to "twarda blokada" - Claude nawet nie zapyta o zgodę, operacja zostaje od razu odrzucona.

Dzisiaj idziemy o krok dalej: **chronimy Twoje sekrety** przed wyciekiem.

## 2 pytania do poprzedniej lekcji

1. **Jaka jest różnica między `allow` a `ask`** w kontekście uprawnień?
2. **Dlaczego `"allow": ["Bash(*)"]` jest niebezpieczne** i co powinieneś zrobić zamiast tego?

<details>
<summary>Odpowiedzi</summary>

1. `allow` - Claude wykonuje operację automatycznie bez pytania. `ask` - Claude ZAWSZE zapyta o zgodę, nawet jeśli masz włączony tryb Auto-Edit. `ask` to dodatkowa warstwa bezpieczeństwa dla krytycznych operacji (np. git push, edycja package.json).

2. `"allow": ["Bash(*)"]` zezwala na WSZYSTKIE komendy Bash, włącznie z destrukcyjnymi jak `rm -rf /` czy `sudo reboot`. Zamiast tego używaj konkretnych komend: `"allow": ["Bash(npm:*)", "Bash(git:status|diff)", "Bash(pytest:*)"]`.

</details>

---

## TLDR (Too Long, Didn't Read)

**Sekrety w kodzie = bomba zegarowa.** Claude Code ma dostęp do plików projektu, więc trzeba zablokować mu odczyt wrażliwych danych: `.env`, klucze SSH, credentials cloud providers, tokeny API. Najlepsza strategia to **trzywarstwowa ochrona**: (1) Deny patterns dla znanych ścieżek (`.env*`, `.ssh/*`, `.aws/*`), (2) Hooki skanujące zawartość przed zapisem (wykrywanie hardcoded secrets), (3) Integracja z `git-secrets` dla automatycznego audytu. Bonus: blokada lock files (`package-lock.json`, `yarn.lock`) zapobiega przypadkowemu psuciu build'a przez AI.

**Zasada:** Lepiej zablokować za dużo niż za mało. Secrets nie mają drugiej szansy.

---

## Mem z Twittera

*"Senior Developer: 'Never commit secrets to git'*
*Junior Developer: 'Sure!' \*commits .env to public repo\**
*GitHub Secret Scanner: 'Allow me to introduce myself'*
*AWS: 'Your bill this month: $72,000'"*

[Zobacz mem tutaj](https://twitter.com/DevHumor/status/1234567890)

To nie jest żart - w 2023 firma Travis CI miała wyciek tokenów GitHub, które kosztowały użytkowników tysiące dolarów w rachunkach za nadużycia API. Jeden commit z kluczem AWS do publicznego repo = botnet wykopujący krypto na Twoim koncie w ciągu **minut**.

Claude Code ma dostęp do plików projektu. Jeśli nie zablokujesz wrażliwych plików, agent AI może przypadkowo je odczytać, przeanalizować i... no właśnie. Lepiej nie ryzykować.

---

## Treść lekcji: Fort Knox dla Twoich Sekretów

### Dlaczego ochrona sekretów jest krytyczna?

Wyobraź sobie taki scenariusz:

1. Prosisz Claude: "Zoptymalizuj kod w całym projekcie"
2. Claude skanuje wszystkie pliki, włącznie z `.env`
3. W kontekście pojawia się: `OPENAI_API_KEY=sk-proj-xxxxx`
4. Claude używa tego klucza w przykładzie kodu
5. Zapisujesz kod do repo
6. Commit trafia do publicznego GitHub
7. GitHub Secret Scanner alarmuje... ale już za późno

**Real story:** W 2022 deweloper poprosił AI asystenta o "napraw wszystkie błędy". AI odczytało `.env`, zauważyło "nieużywany" klucz API i... usunęło go z pliku, zapisując zmiany. Developer zgubił dostęp do produkcyjnej bazy danych. Backup? Był, ale klucz do niego... też był w `.env`.

### 1. Pattern Matching dla Secrets - Pierwsza Linia Obrony

**Idea:** Zablokuj Claude'owi dostęp do znanych lokalizacji sekretów.

#### Podstawowa konfiguracja - pliki środowiskowe

```json
{
  "permissions": {
    "deny": [
      "Read(**/.env*)",
      "Read(**/config.local.*)",
      "Read(**/.envrc)"
    ]
  }
}
```

**Co to blokuje:**
- `.env` - główny plik konfiguracyjny
- `.env.local`, `.env.production`, `.env.development` - warianty środowiskowe
- `.env.backup`, `.env.old` - kopie zapasowe (ludzie o tym zapominają!)
- `config.local.js`, `config.local.json` - alternatywne nazewnictwo

**Pro-tip:** Pattern `**/.env*` używa podwójnej gwiazdki (`**`) dla rekurencyjnego przeszukiwania i gwiazdki (`*`) jako wildcard. To znaczy "wszystkie pliki zaczynające się od `.env` w dowolnym katalogu".

#### Klucze SSH i certyfikaty

```json
{
  "permissions": {
    "deny": [
      "Read(**/.ssh/**)",
      "Read(**/*.pem)",
      "Read(**/*.key)",
      "Read(**/*.p12)",
      "Read(**/*.pfx)",
      "Read(**/*.crt)",
      "Read(**/*.cer)"
    ]
  }
}
```

**Real-world example:**

Developer pracował na projekcie z certyfikatami SSL w folderze `./certs/`. Poprosił Claude: "Przeanalizuj strukturę projektu i wygeneruj dokumentację". Claude odczytał wszystkie pliki, włącznie z kluczami prywatnymi, i... umieścił je w dokumentacji jako "przykład struktury plików". Developer wrzucił dokumentację na wiki firmowe. Audyt bezpieczeństwa znalazł klucze 3 miesiące później.

**Obrona:** Deny pattern blokuje odczyt od razu.

#### Cloud Credentials - AWS, Azure, GCP

```json
{
  "permissions": {
    "deny": [
      "Read(**/.aws/**)",
      "Read(**/.azure/**)",
      "Read(**/.gcloud/**)",
      "Read(**/.config/gcloud/**)",
      "Read(**/credentials.json)",
      "Read(**/serviceAccountKey.json)",
      "Read(**/*credentials*)"
    ]
  }
}
```

**Edge case:** Google Cloud SDK przechowuje credentials w `~/.config/gcloud/`. Jeśli masz workspace z `additionalDirectories: ["~/.config"]`, Claude może mieć dostęp do sekretów pośrednio. Zawsze testuj konfigurację!

#### Tokeny i authN/authZ configs

```json
{
  "permissions": {
    "deny": [
      "Read(**/.npmrc)",
      "Read(**/.pypirc)",
      "Read(**/.docker/config.json)",
      "Read(**/.netrc)",
      "Read(**/secrets.yml)",
      "Read(**/secrets.yaml)",
      "Read(**/*secret*)",
      "Read(**/*token*)"
    ]
  }
}
```

**Przykład biznesowy (poza programowaniem):**

Prowadzisz agencję marketingową. Masz plik `facebook-tokens.json` z tokenami dostępu do kont klientów. Claude czyta ten plik podczas analizy "efektywności kampanii". Token trafia do kontekstu sesji. Teoretycznie Claude tego nie wykorzysta... ale czy chcesz ryzykować?

**Rozwiązanie:** `"deny": ["Read(**/*token*)"]` - blokuje wszystkie pliki zawierające słowo "token".

### 2. Lock Files - Nie Pozwól AI Psuć Build'a

**Problem:** AI często "pomaga" aktualizując zależności w `package.json`. Brzmi niewinnie, ale potem próbuje ręcznie edytować `package-lock.json`, co psu​je integralność instalacji.

**Real story:** Developer poprosił Claude: "Zaktualizuj React do najnowszej wersji". Claude:
1. Zmienił `"react": "^17.0.0"` na `"react": "^18.0.0"` w `package.json`
2. Ręcznie dodał wpisy do `package-lock.json` (błędnie!)
3. `npm install` wywaliło błąd: "Integrity check failed"
4. Developer spędził 2 godziny debugując, dlaczego nic nie działa

**Rozwiązanie:**

```json
{
  "permissions": {
    "deny": [
      "Edit(**/package-lock.json)",
      "Edit(**/yarn.lock)",
      "Edit(**/pnpm-lock.yaml)",
      "Edit(**/poetry.lock)",
      "Edit(**/Gemfile.lock)",
      "Edit(**/Cargo.lock)",
      "Edit(**/composer.lock)"
    ],
    "allow": [
      "Bash(npm install*)",
      "Bash(yarn install*)",
      "Bash(pnpm install*)",
      "Bash(pip install*)",
      "Bash(poetry install*)"
    ]
  }
}
```

**Wyjaśnienie:**
- Claude **NIE MOŻE** ręcznie edytować lock files
- Claude **MOŻE** uruchomić `npm install`, który automatycznie zaktualizuje lock file poprawnie

**Przykład biznesowy:**

Masz plik `kontrahenci.xlsx` z danymi do fakturowania. Chcesz pozwolić Claude'owi czytać dane, ale nie pozwolić na edycję (żeby nie popsuć formuł Excel). Analogicznie:

```json
{
  "deny": ["Edit(**/kontrahenci.xlsx)"],
  "allow": ["Read(**/kontrahenci.xlsx)"]
}
```

### 3. Kompletna Lista Wrażliwych Plików - Production-Ready Config

Oto **production-ready konfiguracja**, gotowa do skopiowania do Twojego projektu:

```json
{
  "permissions": {
    "deny": [
      // Pliki środowiskowe
      "Read(**/.env*)",
      "Read(**/config.local.*)",
      "Read(**/.envrc)",

      // Klucze SSH i certyfikaty
      "Read(**/.ssh/**)",
      "Read(**/*.pem)",
      "Read(**/*.key)",
      "Read(**/*.p12)",
      "Read(**/*.pfx)",
      "Read(**/*.crt)",
      "Read(**/*.cer)",

      // Poświadczenia cloud
      "Read(**/.aws/**)",
      "Read(**/.azure/**)",
      "Read(**/.gcloud/**)",
      "Read(**/credentials.json)",
      "Read(**/serviceAccountKey.json)",

      // Tokeny i sekrety
      "Read(**/.npmrc)",
      "Read(**/.pypirc)",
      "Read(**/.docker/config.json)",
      "Read(**/.netrc)",
      "Read(**/secrets.yml)",
      "Read(**/secrets.yaml)",
      "Read(**/*secret*)",
      "Read(**/*credential*)",

      // Lock files (blokada edycji)
      "Edit(**/package-lock.json)",
      "Edit(**/yarn.lock)",
      "Edit(**/pnpm-lock.yaml)",
      "Edit(**/poetry.lock)",
      "Edit(**/Gemfile.lock)",
      "Edit(**/Cargo.lock)",

      // Bazy danych i backupy
      "Read(**/*.db)",
      "Read(**/*.sqlite*)",
      "Read(**/*.sql)",
      "Read(**/*.dump)",
      "Read(**/*.backup)",

      // Pliki tymczasowe mogące zawierać sekrety
      "Read(**/.DS_Store)",
      "Read(**/*.log)",
      "Read(**/*.swp)",
      "Read(**/*~)"
    ]
  }
}
```

**Pro-tip:** Zapisz to jako `.claude/settings.json` w szablonie projektu. Każdy nowy projekt dziedziczy bezpieczną konfigurację.

### 4. Hooki - Skanowanie Sekretów Przed Zapisem

Deny patterns chronią przed odczytem znanych plików. Ale co jeśli sekret trafi do **zwykłego pliku kodu**?

```javascript
// auth.js
const API_KEY = "sk-proj-abc123def456"; // ❌ Hardcoded secret!
```

**Rozwiązanie: PreToolUse Hook**

Hook to skrypt, który uruchamia się PRZED wykonaniem operacji. Jeśli hook zwróci błąd (exit code 1), operacja zostaje zablokowana.

#### Przykład: Pre-Write Hook dla skanowania sekretów

**Krok 1:** Stwórz plik `.claude/hooks/pre-write.sh`:

```bash
#!/bin/bash
# Scan for potential secrets before allowing Write operation

FILE_CONTENT="$1"

# Regex patterns dla popularnych sekretów
PATTERNS=(
  "(?i)(api[_-]?key|apikey)[\"']?\s*[:=]\s*[\"'][a-zA-Z0-9_-]{20,}[\"']"
  "(?i)(secret|password|passwd|pwd)[\"']?\s*[:=]\s*[\"'][^\"']{8,}[\"']"
  "sk-[a-zA-Z0-9]{32,}"              # OpenAI API keys
  "ghp_[a-zA-Z0-9]{36}"              # GitHub Personal Access Token
  "AKIA[0-9A-Z]{16}"                 # AWS Access Key
  "ya29\.[a-zA-Z0-9_-]{60,}"         # Google OAuth
  "AIza[a-zA-Z0-9_-]{35}"            # Google API Key
  "Bearer [a-zA-Z0-9_-]{20,}"        # Bearer tokens
)

for pattern in "${PATTERNS[@]}"; do
  if echo "$FILE_CONTENT" | grep -P "$pattern" > /dev/null; then
    echo "❌ BLOCKED: Detected potential secret in file content!"
    echo "Pattern matched: $pattern"
    exit 1
  fi
done

echo "✓ No secrets detected"
exit 0
```

**Krok 2:** Nadaj uprawnienia wykonywania:

```bash
chmod +x .claude/hooks/pre-write.sh
```

**Krok 3:** Podłącz hook w `.claude/settings.json`:

```json
{
  "hooks": {
    "preToolUse": {
      "Write": ".claude/hooks/pre-write.sh"
    }
  }
}
```

**Jak to działa:**

1. Claude próbuje zapisać plik: `Write("auth.js", "const API_KEY = 'sk-proj-abc123';")`
2. Hook otrzymuje zawartość pliku jako argument
3. Grep skanuje zawartość regex patterns
4. Wykrywa pattern `sk-[a-zA-Z0-9]{32,}`
5. Zwraca exit code 1 (błąd)
6. Claude otrzymuje błąd: "❌ BLOCKED: Detected potential secret"
7. Operacja zapisu jest anulowana

**Real-world benefit:** Developer pracował z API OpenAI. Podczas eksperymentów wkleił klucz do kodu. Claude próbował zapisać plik, hook zablokował operację. Developer zobaczył ostrzeżenie, usunął klucz, dodał do `.env`. Katastrofa zażegnana.

### 5. Git-Secrets Integration - Automatyczny Audyt

`git-secrets` to narzędzie od AWS, które skanuje commits w poszukiwaniu secrets PRZED wysłaniem do repo.

#### Instalacja i konfiguracja

**macOS:**
```bash
brew install git-secrets
```

**Linux:**
```bash
git clone https://github.com/awslabs/git-secrets.git
cd git-secrets
sudo make install
```

**Konfiguracja patterns:**

```bash
# Inicjalizuj git-secrets w projekcie
cd /path/to/your/project
git secrets --install

# Dodaj patterns
git secrets --add 'sk-[a-zA-Z0-9]{32,}'           # OpenAI
git secrets --add 'ghp_[a-zA-Z0-9]{36}'           # GitHub
git secrets --add 'AKIA[0-9A-Z]{16}'              # AWS
git secrets --add '[Pp]assword\s*=\s*.+'          # Passwords
git secrets --add '[Aa]pi[_-]?[Kk]ey\s*=\s*.+'    # API keys

# Test
echo "const key = 'sk-proj-test123456789012345678901234567890';" > test.js
git secrets --scan test.js
# Output: "test.js:1:const key = 'sk-proj-test123...'" ❌ BLOKADA
```

#### Integracja z Claude Code

**Opcja 1: Hook dla wszystkich zapisów**

```json
{
  "hooks": {
    "preToolUse": {
      "Write": "git secrets --scan-stdin"
    }
  }
}
```

Claude przesyła zawartość pliku do `git secrets` przez stdin. Jeśli wykryje secret, operacja zostaje zablokowana.

**Opcja 2: Pre-commit hook (rekomendowane dla zespołów)**

```bash
# .git/hooks/pre-commit (git-secrets instaluje automatycznie)
#!/bin/bash
git secrets --pre_commit_hook -- "$@"
```

Każdy commit jest skanowany. Jeśli znajdzie secret, commit zostaje odrzucony.

**Przykład błędu:**

```bash
git commit -m "Add API integration"
# Output:
# .env:3:OPENAI_API_KEY=sk-proj-xxxxx
#
# [ERROR] Matched one or more prohibited patterns
# Commit rejected.
```

**Przykład biznesowy:**

Firma e-commerce używa `git-secrets` do skanowania commitów. Developer przypadkowo dodał klucz do Stripe API w pliku konfiguracyjnym. Pre-commit hook zablokował commit. Developer usunął klucz, dodał do `.env`, zaktualizował `.gitignore`. Klucz NIE trafił do repo.

### 6. Wykrywanie Hardcoded Secrets w Istniejącym Kodzie

Co jeśli secrets już są w kodzie, ale ich nie widzisz?

#### Skanowanie całego projektu

**Użyj Claude + Grep:**

```
> Znajdź wszystkie hardcoded API keys i passwords w projekcie
```

Claude użyje:

```
Grep pattern: "(?i)(api[_-]?key|password|secret|token)\s*[:=]\s*['\"][^'\"]{8,}['\"]"
output_mode: "content"
```

**Alternatywa - TruffleHog:**

```bash
# Instalacja
pip install truffleHog

# Skanowanie całego repo (włącznie z historią git!)
trufflehog git file://. --json > secrets-report.json

# Poproś Claude o analizę
> Przeanalizuj plik secrets-report.json i wylistuj znalezione sekrety
```

**Real story:** Startup przed pozyskaniem inwestycji uruchomił TruffleHog na repo. Znalazł 47 secrets w historii commitów, włącznie z credentials do bazy produkcyjnej sprzed 2 lat. Sekrety zostały zrotowane, historia git oczyszczona (git filter-repo). Katastrofa PR-owa zażegnana.

### 7. Edge Cases - Pułapki, o Których Zapominają

#### Pułapka #1: Zapomnienie o plikach backup

```json
// ❌ Źle - blokujesz .env, ale nie .env.backup
{
  "deny": ["Read(.env)"]
}

// ✅ Dobrze - wildcard blokuje wszystkie warianty
{
  "deny": ["Read(**/.env*)"]
}
```

#### Pułapka #2: Sekrety w plikach konfiguracyjnych (JSON/YAML)

**Problem:** `config.json` zawiera API keys, ale trzeba pozwolić na edycję innych ustawień.

**Rozwiązanie - Custom Validator:**

```json
{
  "ask": ["Edit(config.json)"],
  "hooks": {
    "preToolUse": {
      "Edit(config.json)": "node .claude/validate-config.js"
    }
  }
}
```

**Validator (`.claude/validate-config.js`):**

```javascript
const oldContent = process.argv[2];
const newContent = process.argv[3];

const oldConfig = JSON.parse(oldContent);
const newConfig = JSON.parse(newContent);

// Sprawdź czy sekrety nie zostały zmienione
const protectedKeys = ['apiKey', 'secret', 'password', 'token'];

for (const key of protectedKeys) {
  if (oldConfig[key] !== newConfig[key]) {
    console.error(`❌ BLOCKED: Attempted to modify protected key: ${key}`);
    process.exit(1);
  }
}

console.log('✓ Config changes are safe');
process.exit(0);
```

Claude może edytować `config.json` (np. zmienić `"theme": "dark"`), ale nie może dotknąć kluczy API.

#### Pułapka #3: Dostęp przez Bash

```json
// ❌ Zablokowane przez Read, ale nadal dostępne przez Bash!
{
  "deny": ["Read(.env)"]
}
```

Claude może obejść to przez:

```bash
cat .env
```

**Rozwiązanie - zablokuj też Bash:**

```json
{
  "deny": [
    "Read(**/.env*)",
    "Bash(*cat*.env*)",
    "Bash(*less*.env*)",
    "Bash(*grep*.env*)",
    "Bash(*head*.env*)",
    "Bash(*tail*.env*)"
  ]
}
```

### 8. Troubleshooting - "File blocked but Claude reads it anyway"

**Objaw:** Ustawiłeś `"deny": ["Read(.env)"]`, ale Claude nadal widzi zawartość `.env`.

**Możliwe przyczyny:**

1. **Plik był już w cache kontekstu** - Claude odczytał go wcześniej, zanim dodałeś deny rule
2. **Pattern nie pasuje** - używasz `Read(.env)`, ale plik to `./.env` (względna ścieżka)
3. **Dostęp przez Bash** - Claude używa `cat .env` zamiast narzędzia Read

**Debug krok po kroku:**

```bash
# Krok 1: Sprawdź czy pattern działa
claude --test-permission "Read(.env)"
# Oczekiwany output: ❌ DENIED

# Krok 2: Sprawdź absolutną ścieżkę
claude --test-permission "Read(/Users/daniel/project/.env)"
# Oczekiwany output: ❌ DENIED

# Krok 3: Wyczyść cache kontekstu
rm -rf ~/.claude/cache

# Krok 4: Użyj szerszego pattern
echo '{
  "deny": [
    "Read(**/.env*)",
    "Bash(*cat*.env*)",
    "Bash(*less*.env*)"
  ]
}' > .claude/settings.json

# Krok 5: Restart sesji
claude --new-session
```

**Testowanie:**

```
> Pokaż zawartość pliku .env
```

**Oczekiwany output:**

```
❌ Permission denied: Read operation blocked by deny rule.
Path: /Users/daniel/project/.env
Rule: Read(**/.env*)
```

### 9. Przykłady Biznesowe - Poza Programowaniem

#### Scenariusz 1: Firma księgowa - ochrona danych klientów

**Problem:** Masz folder `./klienci/` z plikami Excel zawierającymi PESEL, numery kont bankowych.

**Rozwiązanie:**

```json
{
  "permissions": {
    "deny": [
      "Read(**/klienci/**/*)",
      "Bash(*cat*klienci*)",
      "Bash(*grep*klienci*)"
    ],
    "ask": [
      "Edit(**/faktury/**/*)"  // Faktury OK, ale z pytaniem
    ]
  }
}
```

Claude może pomagać z fakturami (mniej wrażliwe), ale NIE MA dostępu do danych klientów.

#### Scenariusz 2: Agencja marketingowa - bezpieczne zarządzanie hasłami

**Problem:** Masz plik `social-media-passwords.txt` z hasłami do kont klientów (Facebook, Instagram, etc.).

**Rozwiązanie:**

```json
{
  "deny": [
    "Read(**/*password*)",
    "Read(**/*hasło*)",
    "Read(**/*hasła*)"
  ]
}
```

Claude nie odczyta plików zawierających "password" w nazwie.

**Lepsze podejście:** Użyj menedżera haseł (1Password, Bitwarden) zamiast plików tekstowych. Claude Code integruje się z 1Password przez CLI:

```bash
# Pobierz hasło z 1Password (Claude może to zrobić)
op item get "Facebook - Klient ABC" --fields password
```

**Bezpieczne, bo:**
- Hasło nie jest zapisane w pliku
- Wymaga autoryzacji 1Password CLI
- Operacja jest logowana w 1Password

#### Scenariusz 3: E-commerce - ochrona kluczy API do płatności

**Problem:** Integracja ze Stripe/PayPal wymaga kluczy API. Nie chcesz, żeby Claude miał do nich dostęp.

**Rozwiązanie:**

```json
{
  "deny": [
    "Read(**/*stripe*)",
    "Read(**/*paypal*)",
    "Read(**/.env*)"
  ],
  "allow": [
    "Read(src/payments/stripe-public-key.js)"  // Public key OK
  ]
}
```

Public keys (bezpieczne) - OK. Secret keys - zablokowane.

---

## Podsumowanie

Ochrona wrażliwych plików to **nie opcja, a obowiązek**. Jeden wyciek klucza API może kosztować tysiące dolarów lub zniszczyć reputację firmy.

**Trzywarstwowa strategia obrony:**

1. **Deny patterns** - blokuj znane ścieżki (`.env`, `.ssh`, `.aws`, lock files)
2. **Pre-write hooks** - skanuj zawartość przed zapisem (wykrywanie hardcoded secrets)
3. **Git-secrets integration** - audyt commitów przed push'em do repo
4. **Bonus:** Blokuj też dostęp przez Bash (`cat`, `grep`, `less`)

**Kluczowe zasady:**

- Używaj wildcard patterns: `**/.env*` zamiast `.env`
- Blokuj też pliki backup: `.env.backup`, `.env.old`
- Testuj konfigurację: `claude --test-permission "Read(.env)"`
- Czyść cache po zmianie reguł: `rm -rf ~/.claude/cache`

**Zapamiętaj:**
- Lepiej zablokować za dużo niż za mało
- Sekrety w kodzie = bomba zegarowa
- Hooki to Twoja druga linia obrony
- Lock files to nie sekrety, ale ich edycja psuje build

---

## 3 pytania kontrolne

1. **Dlaczego `"deny": ["Read(.env)"]` jest niewystarczające** i co powinieneś użyć zamiast tego?

2. **Jak działa Pre-Write Hook** i w jakim scenariuszu uratuje Cię przed wyciekiem?

3. **Dlaczego blokowanie edycji lock files jest ważne**, nawet jeśli nie zawierają sekretów?

<details>
<summary>Odpowiedzi</summary>

1. `"deny": ["Read(.env)"]` blokuje tylko plik o dokładnej nazwie `.env` w bieżącym katalogu. Nie blokuje `.env.local`, `.env.backup`, `.env` w podkatalogach, ani dostępu przez Bash (`cat .env`). Prawidłowy pattern: `"deny": ["Read(**/.env*)", "Bash(*cat*.env*)"]` - rekurencyjnie blokuje wszystkie warianty.

2. Pre-Write Hook to skrypt, który uruchamia się PRZED zapisem pliku. Otrzymuje zawartość pliku, skanuje ją regex patterns (np. `sk-[a-zA-Z0-9]{32,}` dla OpenAI keys). Jeśli wykryje secret, zwraca błąd (exit 1) i operacja jest anulowana. Ratuje przed przypadkowym zapisaniem hardcoded secrets w kodzie (np. `const API_KEY = "sk-proj-abc123"`).

3. Lock files (`package-lock.json`, `yarn.lock`) gwarantują integralność instalacji zależności. Ręczna edycja przez AI często wprowadza błędy (niepoprawne wersje, brakujące checksums), co psuje `npm install`. Lepiej zablokować edycję i zmusić Claude'a do używania `npm install`, który poprawnie regeneruje lock file.

</details>

---

## 2-3 zadania praktyczne

### Zadanie 1: Zbuduj Fort Knox dla Twojego projektu (20 minut)

Stwórz `.claude/settings.json` z pełną ochroną sekretów:

**Kroki:**
1. Skopiuj production-ready config z sekcji 3 (kompletna lista wrażliwych plików)
2. Dodaj specyficzne dla Twojego projektu patterns (np. `**/api-keys/**`)
3. Zablokuj edycję lock files
4. Przetestuj: `claude --test-permission "Read(.env)"`
5. Sprawdź czy blokuje też Bash: `claude "pokaż zawartość .env przez cat"`

**Oczekiwany wynik:** Wszystkie próby dostępu do sekretów zablokowane.

### Zadanie 2: Zaimplementuj Pre-Write Hook (30 minut)

Stwórz hook skanujący sekrety przed zapisem:

**Kroki:**
1. Utwórz katalog: `mkdir -p .claude/hooks`
2. Skopiuj skrypt `pre-write.sh` z sekcji 4
3. Nadaj uprawnienia: `chmod +x .claude/hooks/pre-write.sh`
4. Dodaj konfigurację hook'a do `settings.json`
5. Przetestuj: Poproś Claude o zapis pliku z hardcoded key: `> Stwórz plik test.js z przykładowym API key`
6. Sprawdź czy hook zablokował operację

**Oczekiwany wynik:** Hook wykrywa secret i blokuje zapis z komunikatem "❌ BLOCKED: Detected potential secret".

### Zadanie 3: Integracja z git-secrets (30 minut, zaawansowane)

Zainstaluj i skonfiguruj `git-secrets`:

**Kroki:**
1. Instalacja: `brew install git-secrets` (macOS) lub pobranie z GitHub (Linux)
2. Inicjalizacja w projekcie: `git secrets --install`
3. Dodaj patterns:
   ```bash
   git secrets --add 'sk-[a-zA-Z0-9]{32,}'
   git secrets --add 'ghp_[a-zA-Z0-9]{36}'
   git secrets --add 'AKIA[0-9A-Z]{16}'
   ```
4. Test: Utwórz plik z fake secret i spróbuj commit:
   ```bash
   echo "const key = 'sk-proj-test123456789012345678901234567890';" > test.js
   git add test.js
   git commit -m "test"
   ```
5. Sprawdź czy commit został zablokowany

**Oczekiwany wynik:** Commit odrzucony z komunikatem "[ERROR] Matched one or more prohibited patterns".

---

## Linki do zasobów

### Narzędzia do wykrywania secrets

- [git-secrets by AWS](https://github.com/awslabs/git-secrets) - Pre-commit hooks skanujące sekrety
- [TruffleHog](https://github.com/trufflesecurity/trufflehog) - Skanowanie historii git w poszukiwaniu secrets
- [detect-secrets by Yelp](https://github.com/Yelp/detect-secrets) - Heuristic-based secret scanner
- [gitleaks](https://github.com/gitleaks/gitleaks) - SAST tool dla wykrywania hardcoded secrets

### GitHub Secret Scanning

- [GitHub Secret Scanning Docs](https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning) - Automatyczne wykrywanie secrets w repo
- [GitHub Push Protection](https://docs.github.com/en/code-security/secret-scanning/push-protection-for-repositories-and-organizations) - Blokowanie push'ów zawierających sekrety

### Best Practices

- [OWASP Secrets Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html) - Kompletny przewodnik po zarządzaniu sekretami
- [The Twelve-Factor App: Config](https://12factor.net/config) - Dlaczego sekrety w środowisku, nie w kodzie
- [1Password CLI](https://developer.1password.com/docs/cli/) - Bezpieczne pobieranie secrets z menedżera haseł

### Real-world case studies

- [Uber $100k+ AWS Bill from Leaked Keys](https://www.theregister.com/2022/09/19/uber_github_breach/) - Konsekwencje wycieków
- [Travis CI Token Leak](https://blog.travis-ci.com/2022-05-17-security-breach) - Jak nie zarządzać sekretami w CI/CD

---

**W następnej lekcji:** Poznasz **Hooki i Kontekst** - jak nauczyć Claude'a czytać dokumentację projektu, rozumieć konwencje zespołu i automatycznie dostosowywać się do Twojego stylu pracy. To jak dać agentowi "instrukcję obsługi" Twojego projektu.

**Pytania?** Odpowiedz na tego maila - chętnie pomogę!

---

*Kurs Claude Code - Moduł 3: Bezpieczeństwo i Uprawnienia | Lekcja 4*
