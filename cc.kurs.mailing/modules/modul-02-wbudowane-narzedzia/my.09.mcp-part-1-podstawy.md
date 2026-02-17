---
lesson: "02.09"
title: "MCP Part 1 - Podstawy i Architektura"
description: "Model Context Protocol: Port USB-C dla Claude - co to jest, dlaczego potrzebujesz i jak działa"
module: "02-wbudowane-narzedzia"
---

# MCP Part 1 - Podstawy i Architektura

Marek (developer w małej agencji) patrzy na swój kod. Przed nim otwarte: terminal z Claude Code, przeglądarka z GitHub Issues, kolejna karta z Google Drive, jeszcze jedna z bazą danych.

— Znowu to samo — wzdycha. — Claude ma kontekst z tego co widzi w projekcie, ale żeby sprawdzić issue, muszę skopiować numer, przejść do przeglądarki, przeczytać, wrócić, wkleić.

Kasia (PM w tym samym zespole) zerka na jego ekran.

— To samo z naszym backlogiem w Notion. Muszę tłumaczyć Claude'owi co tam jest, zamiast żeby po prostu... widział.

Paweł (tech lead) uśmiecha się.

— Dlatego właśnie powstało MCP. Model Context Protocol. To jak port USB-C dla Claude: podłączasz raz, działa wszędzie.

Ta i 3 kolejne lekcje, wprowadzą Cię w świat tego właśnie rozwiązania.

## Co wyniesiesz z tej lekcji

- Rozumiesz, czym jest MCP i dlaczego to ważniejsze niż kolejny plugin
- Wiesz, jak MCP różni się od RAG i Function Calling (bez żargonu)
- Znasz podstawową architekturę: Host, Client, Server (i co robią)
- Rozumiesz trzy prymitywy: Resources, Tools, Prompts
- Masz model mentalny jak wszystko gra razem

---

## 1. Co to jest MCP i dlaczego Ci to potrzebne

### Analogia "Port USB-C dla AI"

Paweł rysuje na tablicy:

```
Przed USB-C:
- iPhone → własny kabel
- Android → własny kabel
- Laptop → własny kabel
- Słuchawki → własny kabel

= 4 urządzenia × 4 różne złącza = chaos

Po USB-C:
- Wszystko → jeden standard
= 1 kabel do wszystkiego
```

— MCP to to samo dla AI — mówi Paweł. — Zamiast pisać osobną integrację dla Claude, osobną dla ChatGPT, osobną dla Cursor... piszesz jeden serwer MCP. I wszystkie te aplikacje mogą z niego korzystać.

### Od ciekawostki do standardu (szybko)

Kasia pyta:

— Ale to jakaś nowość, prawda? Pewnie mało kto tego używa.

Paweł uśmiecha się.

— Właśnie o to chodzi: MCP bardzo szybko zbudowało ekosystem. W krótkim czasie pojawiły się:

- oficjalna specyfikacja i dokumentacja,
- SDK oraz repozytoria z serwerami,
- integracje w narzędziach, które już masz w pracy (IDE/desktop/CLI).

W praktyce oznacza to jedno: zamiast „każdy buduje własny kabel”, masz wspólny standard, który opłaca się wspierać.

Dla porównania: wiele standardów dojrzewa latami. Tutaj tempo zmian i adopcji jest po prostu dużo szybsze niż zwykle.

*(Jeśli chcesz czytać dalej: linki do dokumentacji są na końcu lekcji.)*

### Problem N×M (czyli dlaczego integracje to piekło)

To jest najprostsza matematyka która wyjaśnia dlaczego MCP działa:

**Bez MCP:**
- 5 aplikacji AI (Claude Code, Cursor, Windsurf, Copilot, Cline)
- 10 narzędzi (GitHub, Slack, Notion, Google Drive, PostgreSQL, Docker, Sentry, Stripe, Jira, Linear)
- = 5 × 10 = **50 integracji do napisania i utrzymania**
- Każda integracja to osobny kod, osobne edge-case'y, osobne utrzymanie

Każda aplikacja AI musi napisać własną integrację z każdym narzędziem. Jak jedno narzędzie zmieni API? Musisz zaktualizować 5 integracji. Jak pojawi się nowa aplikacja AI? Musi napisać 10 integracji od zera.

**Z MCP:**
- 5 aplikacji AI wspiera MCP
- 10 serwerów MCP (każdy pisze swój raz)
- = 5 + 10 = **15 komponentów** (każdy robi swoją robotę)
- Zamiast N×M, masz N+M: każda strona buduje swoje raz

GitHub pisze jeden serwer MCP i automatycznie działa ze wszystkimi aplikacjami AI. Cursor dodaje wsparcie MCP i automatycznie zyskuje dostęp do wszystkich serwerów. To działa jak standard elektryczny - raz zdefiniowany, wszyscy używają.

Marek kiwa głową.

— To jak różnica między tym, że każdy producent urządzenia pisze własną ładowarkę dla każdego modelu telefonu, a standardem gdzie wszyscy używają jednego gniazda.

— Dokładnie — odpowiada Paweł. — I dlatego wiele firm buduje serwery MCP dla swoich usług. Bo wiedzą, że jak napiszą jeden serwer, zadziała ze wszystkimi kompatybilnymi aplikacjami AI.

### Konkretne korzyści (żeby nie było abstrakcji)

**Dla programisty (Marek):**
- Claude widzi GitHub issues bez przełączania okien
- Może czytać i komentować PR bezpośrednio z terminala
- Tworzy commit, tag, branch - wszystko w kontekście rozmowy

**Dla PM (Kasia):**
- Claude czyta backlog z Notion/Linear/Jira
- Rozbija user story na subtaski automatycznie
- Sprawdza statusy bez logowania do 5 różnych narzędzi

**Dla marketera:**
- Dostęp do Google Drive - Claude analizuje arkusze z kampaniami
- Generuje raporty na podstawie żywych danych
- Porównuje metryki bez eksportowania CSV

**Dla analityka danych:**
- Bezpośredni dostęp do bazy przez SQLite/PostgreSQL server
- EDA (Exploratory Data Analysis) bez pisania ani linii SQL
- Claude rozumie schemat bazy i podpowiada zapytania

**Dla pisarza/content creatora:**
- Claude czyta drafty z Google Docs i analizuje strukturę
- Research przez notatki: "Znajdź wszystkie fragmenty o AI w moich 50 plikach"
- Spójność stylu: "Czy ton tego artykułu pasuje do mojego previous work?"

**Dla HR/rekrutera:**
- Screening CV z folderu: "Top 5 kandydatów na Senior Developer"
- LinkedIn integration - przeszukiwanie profili bez ręcznego klikania
- Automatyczne drafty ogłoszeń bazujące na tym, co już działało w Twojej firmie

**Dla customer support:**
- AI agent z dostępem do CRM + historia transakcji + preferencje klienta
- Personalizowane odpowiedzi zachowujące compliance (RBAC)

Marek (developer):
```
> Show me all critical bugs from last sprint
```

**Bez MCP:**
```
Claude: I can't access GitHub directly. You'll need to:
1. Go to your GitHub repository
2. Filter issues by label: "bug" AND "critical"
3. Filter by milestone: "Sprint 24"
4. Copy the results here
5. Then I can help analyze them
```

**Z MCP (GitHub server zainstalowany):**
```
Claude: [używa GitHub MCP server]
Found 4 critical bugs from Sprint 24:

1. #234 - Database connection pool exhausted
   Author: @sarah | Created: Feb 10 | Status: In Progress

2. #228 - Payment webhook failures (Stripe timeouts)
   Author: @tom | Created: Feb 9 | Status: Open

3. #219 - Memory leak in background job processor
   Author: @mike | Created: Feb 7 | Status: Fixed (pending deploy)

4. #215 - Auth tokens expiring after 5 min instead of 24h
   Author: @anna | Created: Feb 6 | Status: Open

Want me to create a summary report or check which PRs address these?
```

Różnica? Zamiast 5 kroków ręcznej pracy, jedna instrukcja i Claude robi resztę.

---

## 2. Różnice: MCP vs RAG vs Function Calling

Kasia pyta:

— Czekaj, ale to nie jest to samo co RAG? Przecież Claude już może czytać dokumenty.

Paweł kreśli szybką tabelkę:

### RAG vs MCP vs Function Calling

**RAG (Retrieval-Augmented Generation)**

Co robi: Pobiera wiedzę z dokumentów/baz wiedzy
Kiedy: Dane są statyczne (dokumentacja, archiwum, książki)
Przykład: "Przeczytaj naszą dokumentację API i odpowiedz na pytanie"

**MCP (Model Context Protocol)**

Co robi: Dostęp do żywych danych + wykonywanie akcji
Kiedy: Dane się zmieniają lub potrzebujesz działania
Przykład: "Sprawdź aktualny status buildu w CI/CD i zrestartuj jeśli failed"

**Function Calling**

Co robi: Mechanizm wykonawczy - jak model wywołuje funkcje
Kiedy: To warstwa techniczna, nie standard integracji
Przykład: Model decyduje "muszę wywołać funkcję get_weather()"

### Uproszczona różnica

- **RAG** = Czytanie książki (wiedza nie zmienia się co sekundę)
  - Dostajesz gotowy dokument: "Oto nasza dokumentacja API z października 2024"
  - Claude czyta i odpowiada na podstawie tego co przeczytał
  - Dane są martwe - jeśli coś się zmieniło w listopadzie, Claude nie wie

- **MCP** = Rozmowa przez telefon (żywe dane, możesz działać)
  - Claude dzwoni do GitHub: "Jakie są TERAZ otwarte issues?"
  - Dostaje aktualną odpowiedź z ostatniej sekundy
  - Może też działać: "Zamknij issue #123", "Stwórz nowy branch"

- **Function Calling** = Język którym model mówi "chcę zrobić X" (techniczny detal)
  - To mechanizm wykonawczy - jak Claude mówi systemowi "wywołaj tę funkcję"
  - MCP często bywa mapowane na function calling w Host, ale to niższy poziom abstrakcji
  - Nie musisz o tym myśleć jako użytkownik

Marek pyta:

— Czyli MCP używa function calling pod spodem?

— W uproszczeniu: tak, często tak to wygląda w praktyce — odpowiada Paweł. — MCP to protokół Host ↔ Server (jak aplikacja AI rozmawia z narzędziami). A function calling to mechanizm, którym model komunikuje Hostowi: "chcę użyć narzędzia X z parametrami Y". Host zamienia to na realne wywołania po MCP.

---

## 3. Podstawowa architektura - dla początkujących

### Analogia "Restauracja"

Paweł lubi proste analogie:

```
MCP Host (np. Claude Code) = Budynek Restauracji
  ↓ ma w środku
MCP Client = Kelner (odbiera zamówienie, odnosi jedzenie)
  ↓ komunikuje się z
MCP Server = Kuchnia (przygotowuje jedzenie, serwuje)
```

1. **Ty (gość w restauracji)** mówisz: "Poproszę informacje o issue #123 z GitHub"

2. **Kelner (MCP Client)** bierze zamówienie i idzie do kuchni GitHub
   - Nie wie jak przygotować dane (to nie jego rola)
   - Tylko przenosi zamówienie i odbiera wynik

3. **Kuchnia (MCP Server - GitHub)** przygotowuje dane:
   - Łączy się z GitHub API
   - Pobiera issue #123
   - Formatuje do czytelnej formy
   - Oddaje kelnerowi

4. **Kelner wraca** i serwuje Ci odpowiedź:
   "Issue #123: Bug in auth flow, assigned to Sarah, created 2 days ago, 3 comments"

5. **Model (Claude)** widzi te dane w Hoście i odpowiada na Twoje pytanie:
   "To jest bug dotyczący autoryzacji. Sarah nad nim pracuje. Mogę przeczytać komentarze jeśli chcesz więcej kontekstu."

Restauracja (Host) może mieć kilka kelnerów jednocześnie - jeden do kuchni GitHub, drugi do kuchni Slack, trzeci do kuchni PostgreSQL. Każdy kelner (Client) obsługuje jedno połączenie z jedną kuchnią (Server).

### Host, Client, Server - bez metafory

**MCP Host:**
- To Twoja aplikacja AI (Claude Code, Claude Desktop, Cursor)
- Zarządza połączeniami do wielu serwerów
- Koordynuje wszystko

**MCP Client:**
- Komponent wewnątrz Hosta
- Jeden Client = jedno połączenie do jednego Servera
- Host tworzy osobnego Clienta dla każdego Servera

**MCP Server:**
- Program który dostarcza dane lub narzędzia
- Może być lokalny (na Twoim komputerze) lub zdalny (w chmurze)
- Przykłady: filesystem, github, postgres, slack

Gdy Claude Code łączy się z dwoma serwerami jednocześnie:

```
Claude Code (Host)
├── MCP Client #1 → GitHub Server
│   └── Połączenie: (zdalny transport, np. HTTP/SSE)
│
└── MCP Client #2 → Filesystem Server
    └── Połączenie: lokalny proces (npx @modelcontextprotocol/server-filesystem)
```

Każdy Client to osobne, niezależne połączenie. Gdy pytasz Claude: "Show me issue #123 and then save the description to /tmp/issue.txt", Claude:

1. Używa Client #1 (GitHub) żeby pobrać issue
2. Używa Client #2 (Filesystem) żeby zapisać plik

Dwa różne serwery, dwa różne połączenia, jedna płynna rozmowa.

### Trzy prymitywy: Resources, Tools, Prompts

To są trzy rzeczy, które serwer MCP może dać Claude'owi:

#### 1. Resources (Zasoby) - Dane do czytania

Resource to "plik tylko do odczytu" - coś co Claude może przeczytać, ale nie zmienić.

Wyobraź sobie że Resource to jak kartka papieru przyklejona do lodówki: możesz ją przeczytać, ale nie edytować (przynajmniej nie bezpośrednio przez samo czytanie).

**Konkretne przykłady:**
- Schemat bazy danych (PostgreSQL server) - "Tabele: users, orders, products..."
- Lista plików w folderze (filesystem server) - "Folder /Documents zawiera: file1.txt, file2.pdf..."
- Treść issue z GitHub (github server) - "Issue #123: Bug in auth flow, created by Sarah..."
- Aktualny log aplikacji (logging server) - "2024-02-16 14:23:05 ERROR: Connection timeout..."

**Kiedy użyć:**
Gdy chcesz dać Claude'owi **kontekst** - informacje które pomogą mu odpowiedzieć na pytanie. "Przeczytaj to zanim odpowiesz."

**Analogia:**
Resource = Wikipedia. Możesz czytać, ale nie możesz bezpośrednio zmieniać treści (potrzebujesz osobnej akcji - Tool).

#### 2. Tools (Narzędzia) - Akcje do wykonania

Tool to "przycisk do kliknięcia" - Claude może go uruchomić i coś się ZMIENI w świecie.

Wyobraź sobie pilota do telewizora: każdy przycisk robi coś konkretnego (zmienia kanał, głośność, włącza/wyłącza).

**Konkretne przykłady:**
- `create_file` - stwórz nowy plik (filesystem server)
  - Wejście: ścieżka + treść
  - Wyjście: "Plik utworzony" lub błąd

- `query_database` - wykonaj SQL (postgres server)
  - Wejście: zapytanie SQL
  - Wyjście: wyniki lub błąd

- `create_issue` - stwórz issue na GitHubie (github server)
  - Wejście: tytuł, opis, labels
  - Wyjście: numer issue, link

- `send_message` - wyślij wiadomość na Slacku (slack server)
  - Wejście: kanał, treść
  - Wyjście: potwierdzenie wysłania

**Kiedy użyć:**
Gdy chcesz żeby Claude mógł **działać** - zmieniać stan świata, nie tylko czytać.

**Analogia:**
Tool = Przycisk w windzie. Kliknięcie zmienia coś realnego (winda jedzie na piętro).

#### 3. Prompts (Szablony) - Gotowe scenariusze

Prompt to "gotowy przepis na rozmowę" - zestaw instrukcji który często się powtarza i nie chcesz go pisać za każdym razem od zera.

Wyobraź sobie makra w Excelu lub snippety kodu: raz napisane, wielokrotnie używane.

**Konkretne przykłady:**

- **"Code review checklist"** - szablon do review kodu
  ```
  Gdy użyjesz: Claude sprawdza:
  ✓ Czy są testy?
  ✓ Czy kod jest zrozumiały?
  ✓ Czy nie ma hardcoded secrets?
  ✓ Czy dokumentacja jest aktualna?
  ```

- **"Bug report template"** - jak zgłaszać bugi
  ```
  Claude pyta kolejno:
  - Jakie kroki prowadzą do błędu?
  - Czego się spodziewałeś?
  - Co się faktycznie stało?
  - Jaka wersja aplikacji?
  Potem formatuje w standardowy issue
  ```

- **"Sprint planning assistant"** - pomoc w planowaniu sprintu
  ```
  Claude prowadzi przez:
  1. Analiza velocity z ostatnich 3 sprintów
  2. Priorytetyzacja backlogu
  3. Estimation meeting agenda
  4. Commitment based on capacity
  ```

**Kiedy użyć:**
Gdy masz powtarzalny proces, który chcesz ustandaryzować w zespole. Wszyscy robią to samo, w ten sam sposób.

**Analogia:**
Prompt = Przepis kulinarny. Nie wymyślasz za każdym razem jak zrobić sernik, masz sprawdzony przepis.

### Żadnej techniczności (na razie)

Marek pyta:

— A jak to działa pod spodem? JSON-RPC? stdio? HTTP?

Paweł uśmiecha się.

— To wszystko prawda, ale na początek wystarczy wiedzieć: instalujesz serwer, Claude się z nim łączy, dostaje Resources/Tools/Prompts i może z nich korzystać. Technikalia zostawiamy na kolejne części.

---

## ⚠️ Ważna uwaga o bezpieczeństwie

Kasia martwi się:

— Brzmi super, ale... czy to bezpieczne? Daję Claude'owi dostęp do GitHub, Slacka, bazy danych?

Paweł kiwa głową.

— Słuszna obawa. MCP to potężne narzędzie, ale z wielką mocą przychodzi odpowiedzialność.

Najczęstsze problemy w integracjach (nie tylko MCP) są bardzo przewidywalne:
- zbyt szerokie uprawnienia (token "admin", bo tak było najszybciej),
- brak separacji środowisk (dev/prod),
- tajne dane w kodzie (hard-coded credentials),
- uruchamianie community serwerów "w ciemno", bez audytu.

**Co to znaczy dla Ciebie:**

✅ **Instaluj tylko zaufane serwery** (najlepiej oficjalne, albo takie z dobrym maintainerem i historią)
✅ **Sprawdzaj kod przed uruchomieniem**, jeśli to community server (albo przynajmniej: README, uprawnienia, zależności)
✅ **Nie dawaj więcej uprawnień niż potrzeba** (principle of least privilege)
✅ **Oddziel dev od prod** (osobne tokeny, osobne konta, osobne projekty)
✅ **Ustaw granice**: read-only tam gdzie się da, allowlist zasobów, ograniczenia ścieżek/komend
✅ **Aktualizuj** i traktuj Server jak normalną aplikację, którą instalujesz na komputerze

**Dobra wiadomość:**
Większość oficjalnych serwerów (od dużych firm) jest bezpieczna. Problem dotyczył głównie projektów community/eksperymentalnych.

W osobnej lekcji o bezpieczeństwie i uprawnieniach dowiesz się jak bezpiecznie używać MCP, jak audytować serwery, jak ustawić sandboxing.

Na razie pamiętaj: **traktuj MCP server jak aplikację którą instalujesz na swoim komputerze** - sprawdź źródło przed uruchomieniem.

---

## Słowniczek

**MCP (Model Context Protocol)**
Otwarty standard protokołu komunikacji między aplikacjami AI (jak Claude Code) a zewnętrznymi narzędziami/danymi. "Port USB-C dla AI".

**Host**
Aplikacja AI która zarządza połączeniami MCP (np. Claude Code, Claude Desktop, Cursor). To "budynek restauracji" w analogii.

**Client**
Komponent wewnątrz Hosta który utrzymuje połączenie z jednym Serverem. To "kelner" który przenosi zamówienia między Tobą a kuchnią.

**Server**
Program który dostarcza dane (Resources), narzędzia (Tools) lub szablony (Prompts) do Claude'a. To "kuchnia" która przygotowuje to czego potrzebujesz.

**Resource (Zasób)**
Dane pasywne które Claude może przeczytać, ale nie zmienić. Przykład: schemat bazy danych, treść pliku, lista issues z GitHub.

**Tool (Narzędzie)**
Funkcja wykonywalna która zmienia stan świata. Przykład: `create_file`, `send_message`, `query_database`, `create_issue`.

**Prompt (Szablon)**
Gotowa instrukcja/scenariusz dla Claude'a. Przykład: "Code review checklist", "Bug report template". Pomaga standaryzować powtarzalne procesy.

**N×M problem**
Problem "eksplozji integracji". Bez standardu: każda aplikacja × każde narzędzie = N×M osobnych integracji do napisania. MCP redukuje to do N+M (każdy pisze swój komponent raz).

**RAG (Retrieval-Augmented Generation)**
Technika gdzie model AI pobiera wiedzę z dokumentów/baz wiedzy przed odpowiedzią. Dla danych statycznych (nie zmienia się często).

**Function Calling**
Mechanizm w którym model AI decyduje "chcę wywołać funkcję X z parametrami Y". Używane przez MCP pod spodem, ale to niższy poziom abstrakcji.

---

## Dokumentacja

1. **Model Context Protocol - Introduction:**
   https://modelcontextprotocol.io/introduction

2. **MCP Architecture Overview:**
   https://modelcontextprotocol.io/docs/learn/architecture

3. **Claude Code MCP Documentation:**
   https://code.claude.com/docs/en/mcp-overview

4. **Official MCP Servers Repository:**
   https://github.com/model-context-protocol/servers

5. **MCP vs RAG vs Function Calling:**
   (opcjonalnie) artykuły i porównania z blogów, ale traktuj je jako komentarz, nie specyfikację