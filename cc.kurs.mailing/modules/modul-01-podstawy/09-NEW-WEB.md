# Mail 9: Claude Code w przeglądarce - claude.ai/code

## Przypomnienie z lekcji 8

W poprzedniej lekcji poznałeś zarządzanie sesjami: `/resume`, `/rename`, `/export` oraz tryby pracy (Normal/Plan/Auto-Accept). Nauczyłeś się też podstaw wysyłania zadań do chmury (`& prefix`) i teleportacji.

---

## Sprawdź swoją wiedzę z lekcji 8

1. **Jaki skrót przełącza tryby pracy?** (`Ctrl+Tab`, `Shift+Tab`, `Alt+Tab`)
2. **Jak wysłać zadanie do chmury z terminala?** (podaj dwa sposoby)

---

## TLDR

Claude.ai/code daje Ci pełny interfejs webowy - konfigurację, diff view i tworzenie PR bez instalowania czegokolwiek.

**Konfiguracja:**
- Połącz konto GitHub przez OAuth
- Zainstaluj Claude GitHub App w repozytoriach
- Skonfiguruj środowisko i zmienne środowiskowe

**Możliwości WEB:**
- Pełny interfejs z diff view i tworzeniem PR
- Równoległe zadania w izolowanych maszynach wirtualnych
- Sesje działają nawet gdy zamkniesz przeglądarkę

**Ograniczenia sandbox:**
- Domyślnie ograniczony dostęp do sieci
- Brak dostępu do Unix sockets (Docker nie działa)
- Niektóre pakiety binarne blokowane przez proxy

---

## Dla kogo jest claude.ai/code?

Interfejs webowy to brama do Claude Code dla osób, które:
- Nie chcą instalować narzędzi w terminalu
- Pracują na urządzeniach bez dostępu do CLI (tablet, telefon)
- Potrzebują delegować zadania i monitorować je z dowolnego miejsca
- Wolą graficzny podgląd zmian przed stworzeniem pull requesta

**Nie tylko programiści:** Product managerowie, analitycy, marketerzy - każdy, kto chce zlecić Claude przetworzenie plików w repozytorium, może to zrobić przez przeglądarkę.

**Claude iOS app:** Możesz też monitorować i sterować zadaniami z telefonu. Uruchom zadanie z terminala (`& prefix`), a potem sprawdzaj postęp w aplikacji iOS.

---

## Konfiguracja: pierwszy raz na claude.ai/code

### Krok 1: Połączenie z GitHub

Wejdź na **claude.ai/code** i kliknij "Connect GitHub".

OAuth poprowadzi Cię przez proces:
1. Zaloguj się do GitHub (jeśli nie jesteś zalogowany)
2. Autoryzuj Claude AI
3. Wróć do claude.ai/code

**Co Claude otrzymuje:**
- Dostęp do profilu GitHub
- Możliwość odczytu i zapisu w wybranych repozytoriach
- Uprawnienia do tworzenia branch'y i pull requestów

**Czego Claude NIE otrzymuje:**
- Dostępu do innych aplikacji na Twoim koncie
- Możliwości usunięcia repozytoriów
- Twoich credentials poza sesją

### Krok 2: Instalacja Claude GitHub App

Po autoryzacji OAuth musisz zainstalować **Claude GitHub App** w repozytoriach:

1. Kliknij "Install GitHub App"
2. Wybierz organizację lub konto osobiste
3. Zdecyduj: wszystkie repozytoria czy wybrane
4. Zatwierdź instalację

**Moja rada:** Zacznij od wybranych repozytoriów. Zawsze możesz dodać więcej później.

### Krok 3: Konfiguracja środowiska

Po połączeniu z GitHub zobaczysz opcję wyboru środowiska:

**Domyślne środowisko** zawiera:
- Python 3.x z pip, poetry i bibliotekami naukowymi
- Node.js LTS z npm, yarn, pnpm, bun
- Ruby 3.1.6, 3.2.6, 3.3.6 (domyślnie 3.3.6) z gem, bundler, rbenv
- PHP 8.4.14
- Go, Rust, Java (OpenJDK z Maven i Gradle)
- C++ (GCC i Clang)
- PostgreSQL 16, Redis 7.0

**Sprawdzenie dostępnych narzędzi:**
```bash
check-tools
```
Claude może wykonać tę komendę na początku sesji, żeby pokazać Ci, co jest zainstalowane.

---

## Dostęp do sieci - domeny i ograniczenia

Sandbox ma domyślnie **ograniczony dostęp do internetu**. To decyzja świadoma - chroni przed nieautoryzowanymi połączeniami.

### Co jest dozwolone domyślnie

**Kontrola wersji:**
- github.com, gitlab.com, bitbucket.org
- raw.githubusercontent.com

**Menedżery pakietów:**
- npmjs.org, registry.yarnpkg.com
- pypi.org, files.pythonhosted.org
- rubygems.org, crates.io, pkg.go.dev
- maven.org, nuget.org

**Usługi chmurowe:**
- googleapis.com, amazonaws.com
- azure.com, microsoftonline.com

**Narzędzia deweloperskie:**
- dl.k8s.io, releases.hashicorp.com
- repo.anaconda.com, nodejs.org

### Zmiana poziomu dostępu

W ustawieniach środowiska możesz wybrać:

**Limited (domyślny)**
Dozwolone tylko domeny z białej listy. Bezpieczny wybór dla większości projektów.

**Full**
Pełny dostęp do internetu. Używaj tylko gdy musisz - np. przy integracjach z zewnętrznymi API.

**None**
Brak dostępu do sieci (poza API Anthropic). Maksymalna izolacja.

---

## Zmienne środowiskowe

Niektóre projekty potrzebują zmiennych środowiskowych - kluczy API, konfiguracji, flag.

### Dodawanie zmiennych

W ustawieniach środowiska, sekcja "Environment Variables":

```
API_KEY=your_api_key
DEBUG=true
DATABASE_URL=postgresql://localhost/mydb
```

Format jak w pliku `.env` - jedna zmienna na linię.

### Zmienne przez SessionStart Hook

Dla bardziej złożonych konfiguracji użyj hooka w `.claude/settings.json`:

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "startup",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/scripts/setup-env.sh"
          }
        ]
      }
    ]
  }
}
```

Skrypt `scripts/setup-env.sh`:

```bash
#!/bin/bash
# Uruchamia się tylko w środowisku zdalnym
if [ "$CLAUDE_CODE_REMOTE" != "true" ]; then
  exit 0
fi

npm install
pip install -r requirements.txt

# Zapisanie zmiennych dla kolejnych komend
echo "PROJECT_ROOT=$CLAUDE_PROJECT_DIR" >> "$CLAUDE_ENV_FILE"
exit 0
```

---

## Jak działa sesja w WEB

Gdy startujesz zadanie na claude.ai/code:

1. **Klonowanie repozytorium** - Twój kod trafia na izolowaną maszynę wirtualną Anthropic
2. **Przygotowanie środowiska** - Claude uruchamia hooki SessionStart
3. **Konfiguracja sieci** - według Twoich ustawień
4. **Wykonywanie zadania** - Claude analizuje kod, modyfikuje pliki, uruchamia testy
5. **Zakończenie** - zmiany lądują na branchu, możesz stworzyć PR

### Co widzisz w interfejsie

**Panel główny:**
- Pole tekstowe do wprowadzenia zadania
- Lista ostatnich sesji
- Aktywne zadania w tle

**Podczas sesji:**
- Przebieg pracy Claude (co robi, jakie pliki czyta/edytuje)
- Możliwość interakcji - możesz sterować Claude, odpowiadać na pytania
- Wskaźnik zmian: `+12 -1` (dodane/usunięte linie)

### Diff View - podgląd zmian

Kliknij wskaźnik zmian (`+12 -1`) żeby otworzyć diff viewer:

- Lista zmienionych plików po lewej
- Szczegóły zmian po prawej (stare → nowe)
- Możliwość komentowania konkretnych linii
- Iteracja z Claude bez tworzenia PR

**Workflow z diff view:**

1. Claude kończy zadanie
2. Otwierasz diff view
3. Zauważasz problem w jednym pliku
4. Piszesz komentarz: "W tym miejscu użyj async/await zamiast .then()"
5. Claude poprawia
6. Sprawdzasz ponownie
7. Tworzysz PR

---

## Praktyczne przykłady

### Dla programisty: code review przed mergem

```
Przejrzyj zmiany w @src/auth/ wprowadzone w ostatnich 5 commitach.
1. Sprawdź czy są security issues (SQL injection, XSS)
2. Oceń zgodność z wzorcami używanymi w projekcie
3. Zasugeruj refactoring dla funkcji dłuższych niż 50 linii

Jeśli znajdziesz problemy - stwórz issue na GitHub.
```

Claude przejrzy kod, znajdzie potencjalne problemy, stworzy issue z opisem.

### Dla marketera: analiza kampanii

```
Przeanalizuj @marketing/campaigns/q4-2025/ i przygotuj raport:
1. Które kampanie miały najwyższy CTR
2. Jakie wzorce w copy działały najlepiej
3. Propozycje na Q1 2026

Zapisz wyniki do reports/campaign-analysis.md
```

Claude przejrzy pliki CSV z danymi kampanii, przeanalizuje treści, wygeneruje raport.

### Dla project managera: porządkowanie backlogu

```
Przeczytaj @docs/backlog.md i:
1. Pogrupuj taski według epic'ów
2. Zaproponuj priorytety (MoSCoW)
3. Oznacz taski z zależnościami

Zaktualizuj plik z nową strukturą.
```

### Dla analityka: przetwarzanie danych

```
W katalogu @data/sales/ są pliki CSV z danymi sprzedaży.
1. Połącz wszystkie pliki w jeden DataFrame
2. Oblicz: średnią sprzedaż miesięczną, top 10 produktów, sezonowość
3. Wygeneruj wykresy do reports/charts/
4. Napisz executive summary do reports/sales-summary.md
```

### Dla pisarza: analiza archiwum tekstów

```
Przeanalizuj wszystkie artykuły w @blog/posts/ i stwórz:
1. Style guide na podstawie mojego pisania
2. Listę najczęściej używanych fraz
3. Propozycje tematów, które jeszcze nie były poruszone

Zapisz do docs/editorial-guidelines.md
```

### Dla rekrutera: screening CV

```
W @applications/ są CV kandydatów na stanowisko Senior Developer.
1. Przeanalizuj każde CV pod kątem: doświadczenie Python, praca z API, znajomość AWS
2. Oceń w skali 1-5
3. Przygotuj shortlistę z top 5 kandydatów
4. Dla każdego napisz 3 pytania na rozmowę

Zapisz do recruitment/shortlist.md
```

---

## Problemy i ograniczenia sandbox

### Docker i kontenery - nie działają

Sandbox blokuje dostęp do Unix sockets. Docker potrzebuje `/var/run/docker.sock`, więc:

- `docker-compose up` - nie zadziała
- `wp-env` - nie zadziała
- Każde narzędzie wymagające demona Docker - nie zadziała

**Obejście:** Uruchom te zadania lokalnie przez CLI, lub użyj środowiska z pełnym dostępem do sieci i ręcznie skonfigurowanym Docker (wymaga własnej infrastruktury).

### Blokowanie niektórych pakietów binarnych

Proxy bezpieczeństwa czasem blokuje pobieranie binarek. Znane problemy:

- .NET SDK z CDN Microsoft (403 Forbidden)
- Niektóre natywne moduły Node.js

**Obejście:** Jeśli Twój projekt wymaga specyficznych binarek, przetestuj środowisko przed dużym zadaniem. W razie problemów - użyj lokalnego CLI.

### Ograniczenia proxy sieciowego

Cały ruch HTTP/HTTPS przechodzi przez proxy Anthropic. To oznacza:

- Możliwe opóźnienia przy dużych downloadach
- Niektóre egzotyczne protokoły mogą nie działać
- WebSocket - sprawdź czy działa dla Twojego use case

### Tylko GitHub - brak GitLab

Claude Code on the web działa wyłącznie z repozytoriami na GitHub. GitLab, Bitbucket i inne platformy nie są obsługiwane w trybie WEB. Dla repozytoriów spoza GitHub użyj lokalnego CLI.

### Limity czasowe

Sesje WEB mają timeout. Jeśli Claude długo czeka na Twoją odpowiedź, sesja może się zakończyć.

**Rada:** Dla długich, autonomicznych zadań użyj `& prefix` lub flagi `--remote` z CLI:
```bash
claude --remote "Wykonaj migrację bazy danych"
```
Zadanie wykona się w tle na serwerach Anthropic.

---

## WEB vs CLI - kiedy co wybrać

### Wybierz WEB gdy:

- Nie masz dostępu do terminala (telefon, tablet, komputer bez uprawnień)
- Chcesz monitorować zadanie z dowolnego miejsca
- Potrzebujesz graficznego diff view przed PR
- Delegujesz proste, dobrze zdefiniowane zadania
- Pracujesz z wieloma repozytoriami i chcesz szybko przeskakiwać

### Wybierz CLI gdy:

- Potrzebujesz Docker lub Unix sockets
- Pracujesz z dużymi plikami binarnymi
- Chcesz pełną kontrolę nad środowiskiem
- Debugujesz interaktywnie
- Masz skrypty automatyzacji

### Łącz oba środowiska

1. **Zaplanuj w CLI** (Plan Mode) → **Wyślij do WEB** (`& prefix`)
2. **Rozpocznij w WEB** → **Teleportuj do CLI** gdy potrzebujesz więcej kontroli
3. **Monitoruj w WEB/iOS** → **Finalizuj w CLI**

---

## Bezpieczeństwo - co warto wiedzieć

### Izolacja

Każda sesja to osobna maszyna wirtualna. Twój kod jest odizolowany od innych użytkowników i od infrastruktury Anthropic.

### Credentials

**Nigdy** w sandbox:
- Twoje hasła GitHub
- Klucze SSH
- AWS credentials z Twojego komputera

Wszystko przechodzi przez bezpieczny proxy z ograniczonymi uprawnieniami.

### Git proxy

Operacje Git idą przez dedykowany proxy:
- Push ograniczony do bieżącego brancha
- Clone, fetch, PR - działają normalnie
- Twoje tokeny GitHub nigdy nie są widoczne dla kodu w sandbox

### Co sandbox NIE chroni

- Plików projektu przed błędami Claude (używaj git!)
- Przed ujawnieniem danych, które świadomie dodasz do zmiennych środowiskowych
- Przed social engineeringiem (jeśli ktoś podmieni Twój CLAUDE.md na złośliwy)

---

## Konfiguracja terminala do pracy z WEB

### Wybór środowiska domyślnego

Jeśli masz kilka skonfigurowanych środowisk, wybierz domyślne dla `& prefix`:

```bash
> /remote-env
```

Zobaczysz listę środowisk i możesz wybrać, które ma być używane przy wysyłaniu zadań z terminala.

### Automatyczna instalacja zależności

Skonfiguruj hook, żeby środowisko WEB było gotowe od razu:

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "startup",
        "hooks": [
          {
            "type": "command",
            "command": "npm install && pip install -r requirements.txt"
          }
        ]
      }
    ]
  }
}
```

**Tip:** Sprawdź `$CLAUDE_CODE_REMOTE` w hooku, żeby uruchamiać niektóre komendy tylko w WEB:

```bash
#!/bin/bash
[ "$CLAUDE_CODE_REMOTE" != "true" ] && exit 0
# Ten kod uruchomi się tylko w środowisku WEB
```

---

## Typowe problemy i rozwiązania

### "Repository not found"

**Przyczyna:** Claude GitHub App nie ma dostępu do repozytorium.

**Rozwiązanie:**
1. Wejdź na GitHub → Settings → Applications
2. Znajdź "Claude" i kliknij "Configure"
3. Dodaj brakujące repozytorium

### "Network request failed"

**Przyczyna:** Domena nie jest na białej liście.

**Rozwiązanie:**
1. Sprawdź czy domena jest w dozwolonych
2. Jeśli nie - zmień ustawienia sieci na "Full" (ostrożnie!)
3. Lub użyj lokalnego CLI

### "Session timed out"

**Przyczyna:** Za długa bezczynność lub zbyt długie zadanie.

**Rozwiązanie:**
- Podziel zadanie na mniejsze części
- Użyj `& prefix` z CLI dla długich zadań
- Monitoruj postęp i odpowiadaj na pytania Claude

### Teleportacja nie działa

**Wymagania teleportacji:**
- Czyste drzewo git (brak uncommitted changes)
- Jesteś w tym samym repozytorium (nie fork)
- Branch został wypchnięty do remote
- Zalogowany na to samo konto Claude

**Sposoby teleportacji:**
- `/teleport` lub `/tp` - interaktywny picker sesji w Claude Code
- `claude --teleport` - z linii poleceń (interactive picker)
- `claude --teleport <session-id>` - bezpośrednio do konkretnej sesji
- W `/tasks` naciśnij `t` aby teleportować
- W interfejsie WEB kliknij "Open in CLI"

```bash
# Przed teleportacją - sprawdź status
git status

# Jeśli masz zmiany - stash
git stash

# Teleportuj (wybierz jedną z metod)
/teleport
# lub: claude --teleport

# Po zakończeniu - odtwórz zmiany
git stash pop
```

**Teleportacja jest jednokierunkowa:** Możesz ściągnąć sesję z WEB do terminala, ale NIE możesz wypchnąć lokalnej sesji do WEB. Jeśli planujesz kontynuować na innym urządzeniu - zawsze zacznij z prefiksem `&`!

---

## Słowniczek

**CLI** - Command Line Interface, czyli interfejs wiersza poleceń. W praktyce: terminal na komputerze, gdzie wpisujesz komendy tekstowe.

**Branch (gałąź)** - oddzielna linia rozwoju kodu. Pozwala pracować nad zmianami bez wpływu na główną wersję projektu.

**Pull Request (PR)** - prośba o włączenie Twoich zmian do głównej gałęzi projektu. Pozwala na review kodu przed połączeniem.

**OAuth** - protokół autoryzacji pozwalający aplikacjom (jak Claude) uzyskać ograniczony dostęp do Twoich zasobów (np. repozytoriów GitHub) bez znajomości hasła.

**Sandbox** - izolowane środowisko wykonawcze, gdzie kod nie ma dostępu do zewnętrznych zasobów poza dozwolonymi. Chroni przed nieautoryzowanymi połączeniami i eksfiltracją danych.

**Diff view** - widok porównujący dwie wersje pliku, pokazujący dodane i usunięte linie. W claude.ai/code pozwala przeglądać zmiany przed stworzeniem PR.

**Proxy** - serwer pośredniczący w połączeniach sieciowych. W sandbox Claude filtruje ruch i zarządza uwierzytelnianiem.

**SessionStart Hook** - skrypt uruchamiany automatycznie przy starcie sesji Claude Code. Służy do konfiguracji środowiska, instalacji zależności.

**Timeout** - limit czasu, po którym operacja zostaje automatycznie przerwana. Chroni przed nieskończonym oczekiwaniem.

---

## Do zapamiętania

GitHub OAuth + Claude GitHub App + konfiguracja środowiska = gotowe do pracy.

Diff view i równoległe zadania działają świetnie. Pamiętaj o ograniczeniach: brak Docker, proxy sieciowy może blokować egzotyczne pakiety, sesje mają timeout.

Mój workflow: planuję lokalnie (Plan Mode), wysyłam do WEB (`& prefix`), teleportuję gdy potrzebuję więcej kontroli.

---

## Pytania kontrolne

1. **Jakie dwa kroki są wymagane, żeby połączyć GitHub z claude.ai/code?**

2. **Dlaczego Docker nie działa w sandbox WEB?**

3. **Jak skonfigurować automatyczną instalację zależności przy starcie sesji zdalnej?**

4. **Jakie są wymagania przed teleportacją sesji z WEB do CLI?**

---

## Zadania praktyczne

### Zadanie 1: Pierwsza konfiguracja

1. Wejdź na claude.ai/code
2. Połącz konto GitHub
3. Zainstaluj Claude GitHub App w jednym repozytorium testowym
4. Stwórz środowisko z zmienną `TEST_VAR=hello`
5. Uruchom sesję i poproś Claude: "Wyświetl wartość zmiennej TEST_VAR"

### Zadanie 2: Diff view workflow

1. W WEB poproś Claude o drobną zmianę w pliku README
2. Otwórz diff view
3. Skomentuj zmianę z prośbą o modyfikację
4. Po poprawce - stwórz PR

### Zadanie 3: WEB ↔ CLI roundtrip

1. Z terminala wyślij zadanie: `& Dodaj komentarz na początku pliku README.md`
2. Sprawdź status: `/tasks`
3. Otwórz claude.ai/code i zobacz sesję
4. Wróć do terminala i teleportuj: `/teleport`
5. Sprawdź czy zmiany są w lokalnym repozytorium

### Zadanie 4: Analiza bez kodu (dla nie-programistów)

1. Stwórz katalog `test-data/` z kilkoma plikami tekstowymi
2. Wypchnij do GitHub
3. W claude.ai/code poproś: "Przeanalizuj pliki w test-data/ i napisz podsumowanie do summary.md"
4. Przejrzyj diff view i stwórz PR

---

## Linki do dokumentacji

1. **Claude Code on the Web** (oficjalny przewodnik)
   https://code.claude.com/docs/en/claude-code-on-the-web

2. **Hooks** (konfiguracja SessionStart)
   https://code.claude.com/docs/en/hooks

3. **Sandboxing** (izolacja i bezpieczeństwo)
   https://code.claude.com/docs/en/sandboxing

4. **Settings** (konfiguracja środowisk)
   https://code.claude.com/docs/en/settings

---

**W następnej lekcji:** Poznasz zaawansowane techniki, które naprawdę przyspieszają pracę z Claude Code.

Do zobaczenia!
