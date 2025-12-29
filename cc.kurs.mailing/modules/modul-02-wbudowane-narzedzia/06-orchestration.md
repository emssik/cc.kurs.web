# Mail #06: Task, TodoWrite i AskUserQuestion - Orkiestracja Pracy

---

## Witamy w Module 2: Wbudowane Narzędzia (Tools)

Gratulacje za ukończenie Modułu 1! Opanowałeś już podstawy pracy z Claude Code - wiesz jak komunikować się z agentem, znasz różne tryby pracy, potrafisz wykorzystać multimodalne możliwości.

Teraz czas na **poziom PRO**: poznasz narzędzia, których Claude używa "pod maską". Zrozumiesz **jak agent myśli, jak planuje pracę i jak deleguje zadania**. To wiedza, która zamieni Cię z użytkownika w eksperta.

**W tym mailu:** Ostatnie 3 narzędzia orkiestracyjne - Task (delegacja do subagentów), TodoWrite (zarządzanie złożonymi projektami) i AskUserQuestion (inteligentne zbieranie preferencji). To Twój klucz do automatyzacji skomplikowanych workflow.

---

## Sprawdź swoją wiedzę z Modułu 1

Zanim zanurzymy się w narzędziach, szybkie przypomnienie:

1. **Jaką składnię używasz, aby dołączyć plik do rozmowy?**
   - Odpowiedź: `@nazwa-pliku` lub `@plik.js#L10-20` dla konkretnych linii

2. **W którym trybie Claude wykonuje komendy systemowe i edytuje pliki automatycznie?**
   - Odpowiedź: Agent Mode (w Chat Mode tylko rozmawia, w Code Mode skupia się na edycji bez szerokiego kontekstu)

---

## TLDR

Dziś poznasz 3 narzędzia, które sprawiają, że Claude staje się **orkiestratorem złożonych projektów**:

- **Task** - delegowanie pracy do specjalistycznych subagentów (Explore, Plan, Code) - tańsze, szybsze, bardziej efektywne
- **TodoWrite** - zarządzanie listą zadań w długotrwałych projektach (migracje, refaktoryzacje, kampanie)
- **AskUserQuestion** - zbieranie preferencji użytkownika zamiast zgadywania (menu wyboru w terminalu)

To ostatni mail Modułu 2. Po tej lekcji będziesz rozumiał **jak Claude organizuje pracę od środka** - od planowania przez wykonanie po weryfikację.

---

## Mem dnia

![Project Management Reality](https://twitter.com/search?q=project%20management%20meme%20developer%20delegation)

*"Project Manager: 'Jak długo zajmie Ci ta funkcjonalność?'*
*Ja: '2 godziny'*
*PM: 'A jak długo naprawdę?'*
*Ja: '3 dni, 2 broken builds, i 47 google searches'"*

Znajdź swój ulubiony mem o zarządzaniu projektami: [#ProjectManagement #DevLife](https://twitter.com/search?q=%23projectmanagement%20%23developer%20%23automation)

---

## Task - Delegacja do Subagentów

### Czym jest Task?

**Task to jak zatrudnianie specjalistów do konkretnych zadań.** Główny agent (Claude, z którym rozmawiasz) działa jak Project Manager - deleguje pracę do mniejszych, wyspecjalizowanych agentów.

**Dlaczego to jest genialne?**
- Subagenty używają **tańszych modeli** (np. Haiku zamiast Sonnet)
- **Nie zaśmiecają głównego kontekstu** - pracują w izolacji
- Możesz uruchamiać zadania **w tle** i wracać do nich później

### Architektura: Project Manager + Specjaliści

Główny agent to **strategiczny myśliciel**. Gdy dostaje złożone zadanie, dzieli je na mniejsze części i deleguje:

```
Ty: > Przeanalizuj całe repozytorium i zmapuj zależności między modułami

Claude (główny agent):
  "To duże zadanie. Utworzę subagenta typu 'Explore' do przeszukania kodu."

  → Task subagent_type: "Explore"
     Prompt: "Przeszukaj wszystkie pliki .ts/.js i zmapuj importy"

  [Subagent Explore pracuje w tle, używając Haiku]

  → Claude dostaje wynik i przedstawia Ci podsumowanie
```

### Dostępne typy subagentów

| Typ | Specjalizacja | Kiedy używać |
|-----|--------------|--------------|
| **Explore** | Przeszukiwanie kodu, analiza struktury | "Znajdź wszystkie funkcje używające deprecated API" |
| **Plan** | Projektowanie architektury, planowanie | "Zaproponuj strukturę modułów dla tej aplikacji" |
| **Code** | Implementacja, refaktoryzacja | "Zaimplementuj obsługę webhooków" |

**Przykład praktyczny:**

```
> Chcę dodać autentykację OAuth do mojej aplikacji

Claude (główny):
  1. Tworzy subagenta "Plan" → projektuje architekturę
  2. Tworzy subagenta "Explore" → sprawdza istniejące integracje
  3. Tworzy subagenta "Code" → implementuje OAuth flow
  4. Główny agent łączy wszystko i prezentuje wynik
```

### Background execution - praca w tle

**Scenario:** Masz długotrwałe zadanie, które zajmie 10 minut (np. analiza gigantycznych logów).

Zamiast czekać, uruchamiasz w tle:

```
> Przeanalizuj logi z ostatniego miesiąca i znajdź wszystkie błędy 500
  (run_in_background: true)

Claude:
  "Uruchomiłem analizę w tle (Task ID: abc123).
   Możesz teraz pracować nad czymś innym."

# Pracujesz nad czymś innym...

> Sprawdź wynik zadania abc123

Claude (używa TaskOutput):
  "Analiza gotowa! Znalazłem 247 błędów 500. Oto breakdown..."
```

**Dlaczego to zmienia grę?**
- Nie blokujesz pracy
- Długotrwałe zadania działają równolegle
- Wracasz do wyników gdy jesteś gotowy

---

## TodoWrite - Zarządzanie Złożonymi Projektami

### Po co TodoWrite?

Człowiek traci kontekst. Claude traci kontekst. Ale **lista zadań nigdy nie zapomina**.

**Problem bez TodoWrite:**
```
> Zmigruj bazę danych z MySQL na PostgreSQL

Claude rozpoczyna:
1. Robi backup...
2. Generuje migrację...
3. BŁĄD podczas aplikacji migracji!
4. ???
   Gdzie teraz jesteśmy? Co zostało zrobione? Co trzeba naprawić?
```

**Rozwiązanie z TodoWrite:**
```
Claude:
  Todo List:
  ✅ 1. Backup MySQL database
  ✅ 2. Generowanie skryptów migracji
  🔄 3. Aplikacja migracji (ERROR - foreign key conflict)
  ⏳ 4. Weryfikacja danych
  ⏳ 5. Aktualizacja konfiguracji aplikacji

  "Wystąpił błąd w punkcie 3. Naprawiam foreign keys..."
```

**Teraz wiesz dokładnie:**
- Co już zrobione
- Gdzie wystąpił problem
- Co jeszcze zostało do zrobienia

### Cykl życia zadania

```
pending (⏳)  →  in_progress (🔄)  →  completed (✅)
```

**Przykład: Refaktoryzacja modułu**

```
Todo List:
⏳ 1. Analiza istniejącego kodu
⏳ 2. Wydzielenie wspólnych funkcji do utils
⏳ 3. Aktualizacja testów
⏳ 4. Aktualizacja dokumentacji
⏳ 5. Code review i merge

[Claude zaczyna pracę]

✅ 1. Analiza istniejącego kodu
🔄 2. Wydzielenie wspólnych funkcji do utils  ← TU TERAZ JESTEŚMY
⏳ 3. Aktualizacja testów
⏳ 4. Aktualizacja dokumentacji
⏳ 5. Code review i merge
```

### Kiedy używać TodoWrite?

**✅ UŻYWAJ gdy:**
- Zadanie zajmie więcej niż 3 kroki
- Pracujesz nad złożoną migracją/refaktoryzacją
- Potrzebujesz wznowić pracę po przerwie
- Zarządzasz długoterminowym projektem

**❌ NIE UŻYWAJ gdy:**
- "Popraw literówkę w README"
- "Dodaj console.log do debugowania"
- Proste, jednoetapowe zadania

**Zasada:** Jeśli zadanie zajmie więcej niż 3 prompty, użyj TodoWrite. Jeśli to "quick fix", nie używaj.

### Przykład biznesowy: Kampania marketingowa

```
> Przygotuj kompletną kampanię email marketingową dla nowego produktu

Claude tworzy Todo:
✅ 1. Analiza grupy docelowej (personas)
✅ 2. Przygotowanie 5 wariantów subject lines
🔄 3. Napisanie email copy (główna wiadomość)
⏳ 4. Przygotowanie wariantów A/B
⏳ 5. Generowanie HTML templates
⏳ 6. Stworzenie harmonogramu wysyłki
⏳ 7. Przygotowanie metryk do śledzenia

"Właśnie kończę email copy. Chcesz zobaczyć draft przed przejściem dalej?"
```

**Wartość:** Widzisz postęp, możesz interweniować w dowolnym momencie, nic nie ginie.

---

## AskUserQuestion - Inteligentne Zbieranie Preferencji

### Koniec z zgadywaniem

**Stary sposób (bez AskUserQuestion):**
```
> Zainstaluj dependencies

Claude (zgaduje):
  "Widzę package.json. Zakładam że używasz npm..."
  [npm install]

Ty: "Ale ja używam yarn! 😤"
```

**Nowy sposób (z AskUserQuestion):**
```
> Zainstaluj dependencies

Claude:
  ┌─────────────────────────────────────┐
  │ Wykryłem kilka menedżerów pakietów. │
  │ Którego użyć?                       │
  ├─────────────────────────────────────┤
  │ 1. npm                              │
  │ 2. yarn (Recommended) ✓             │
  │ 3. pnpm                             │
  │ 4. Other (wpisz własny)             │
  └─────────────────────────────────────┘

Wybór: _
```

Claude **widzi `yarn.lock`** więc **rekomenduje yarn**. Ale decyzja należy do Ciebie.

### Single vs Multi-select

**Single-select** (wybierz jedno):
```
> Wygeneruj komponent React

Claude:
  ┌─────────────────────────────────────┐
  │ Jakiego stylu użyć?                 │
  ├─────────────────────────────────────┤
  │ 1. Tailwind CSS (Recommended) ✓     │
  │ 2. CSS Modules                      │
  │ 3. Styled Components                │
  │ 4. Emotion                          │
  └─────────────────────────────────────┘
```

**Multi-select** (wybierz wiele):
```
> Setup projektu Next.js

Claude:
  ┌─────────────────────────────────────┐
  │ Które features dodać? (multi)       │
  ├─────────────────────────────────────┤
  │ ☑ TypeScript                        │
  │ ☑ ESLint                            │
  │ ☐ Prettier                          │
  │ ☑ Tailwind CSS                      │
  │ ☐ Storybook                         │
  └─────────────────────────────────────┘
```

### Recommended option - AI decision

Claude może **analizować projekt** i **rekomendować najlepszą opcję**:

```
Claude (analizuje):
  - Widzi yarn.lock → rekomenduje Yarn
  - Widzi tailwind.config.js → rekomenduje Tailwind CSS
  - Widzi .prettierrc → rekomenduje Prettier
  - Widzi pliki .test.tsx → rekomenduje Jest
```

**Pro-tip:** Możesz poprosić Claude'a:
```
> Zawsze rekomenduj opcję, która pasuje do mojego projektu na podstawie analizy plików konfiguracyjnych
```

### Automatyczne "Other" option

Każde menu ma **ukrytą opcję "Other"** - możesz wpisać własną odpowiedź:

```
Claude:
  ┌─────────────────────────────────────┐
  │ Który framework CSS?                │
  ├─────────────────────────────────────┤
  │ 1. Tailwind                         │
  │ 2. Bootstrap                        │
  │ 3. Material-UI                      │
  └─────────────────────────────────────┘

Ty: Bulma

Claude:
  "Ok, używam Bulma CSS!"
```

**Elastyczność:** Nigdy nie jesteś ograniczony tylko do predefiniowanych opcji.

### Przykład biznesowy: Konfiguracja newslettera

```
> Skonfiguruj system wysyłki newsletterów

Claude:
  ┌─────────────────────────────────────┐
  │ Który provider email?               │
  ├─────────────────────────────────────┤
  │ 1. SendGrid (Recommended) ✓         │
  │ 2. Mailchimp                        │
  │ 3. AWS SES                          │
  │ 4. Postmark                         │
  └─────────────────────────────────────┘

Wybór: 1

Claude:
  ┌─────────────────────────────────────┐
  │ Częstotliwość wysyłki?              │
  ├─────────────────────────────────────┤
  │ 1. Codziennie                       │
  │ 2. Co tydzień (Recommended) ✓       │
  │ 3. Co miesiąc                       │
  └─────────────────────────────────────┘

Wybór: 2

Claude:
  "Konfiguruję SendGrid z cotygodniową wysyłką..."
```

---

## Orkiestracja w akcji - przykład złożonego workflow

Zobaczmy jak **Task + TodoWrite + AskUserQuestion** działają razem:

**Scenariusz:** Budowa systemu rezerwacji online dla małego hotelu

```
> Zbuduj system rezerwacji dla hotelu z płatnościami online

[1] Claude używa AskUserQuestion:

  ┌─────────────────────────────────────┐
  │ Który payment gateway?              │
  ├─────────────────────────────────────┤
  │ 1. Stripe (Recommended) ✓           │
  │ 2. PayPal                           │
  │ 3. Przelewy24                       │
  └─────────────────────────────────────┘

Wybór: 1

  ┌─────────────────────────────────────┐
  │ Framework frontend?                 │
  ├─────────────────────────────────────┤
  │ 1. Next.js (Recommended) ✓          │
  │ 2. Nuxt.js                          │
  │ 3. SvelteKit                        │
  └─────────────────────────────────────┘

Wybór: 1

[2] Claude używa TodoWrite:

Todo List:
⏳ 1. Setup projektu Next.js + TypeScript
⏳ 2. Zaprojektowanie schematu bazy (pokoje, rezerwacje)
⏳ 3. Implementacja kalendarza dostępności
⏳ 4. Integracja Stripe Checkout
⏳ 5. System powiadomień email
⏳ 6. Panel administracyjny
⏳ 7. Testy i deployment

[3] Claude używa Task (deleguje subagenty):

✅ 1. Setup projektu Next.js + TypeScript
  → Claude bezpośrednio wykonuje setup

🔄 2. Zaprojektowanie schematu bazy
  → Task subagent_type: "Plan"
     "Zaprojektuj optymalny schemat dla systemu rezerwacji hotelowych"
  → Subagent analizuje best practices
  → Główny agent dostaje propozycję schematu

⏳ 3. Implementacja kalendarza dostępności
⏳ 4. Integracja Stripe Checkout
  ...

[4] Praca kontynuowana z pełnym śledzeniem:

✅ 1. Setup projektu Next.js + TypeScript
✅ 2. Zaprojektowanie schematu bazy
✅ 3. Implementacja kalendarza dostępności
🔄 4. Integracja Stripe Checkout (60% done)
⏳ 5. System powiadomień email
⏳ 6. Panel administracyjny
⏳ 7. Testy i deployment

"Właśnie konfiguruję Stripe webhooks. Chcesz aby rezerwacje
 były potwierdzone automatycznie czy wymagały approval?"

[5] AskUserQuestion ponownie - dynamiczna interakcja:

  ┌─────────────────────────────────────┐
  │ Potwierdzanie rezerwacji?           │
  ├─────────────────────────────────────┤
  │ 1. Automatyczne (natychmiast) ✓     │
  │ 2. Manualne (wymaga approval)       │
  └─────────────────────────────────────┘
```

**Rezultat:**
- **1 godzina pracy** zamiast 3 dni
- **Zero zgadywania** - wszystkie decyzje potwierdzone
- **Pełna transparentność** - wiesz co się dzieje na każdym etapie
- **Możliwość wznowienia** - przerywasz i wracasz kiedy chcesz

---

## Przykłady zastosowań biznesowych

### 1. Automatyzacja marketingu (TodoWrite + AskUserQuestion)

```
> Przygotuj pełną strategię content marketingową na Q1

Claude:
  [AskUserQuestion] Branża? → E-commerce
  [AskUserQuestion] Główna platforma? → LinkedIn + Blog

  [TodoWrite]
  ✅ 1. Analiza konkurencji
  ✅ 2. Research słów kluczowych
  🔄 3. Przygotowanie content calendar (12 tygodni)
  ⏳ 4. Napisanie 4 artykułów pillarowych
  ⏳ 5. Generowanie 48 postów social media
  ⏳ 6. Opracowanie strategii dystrybucji

  "Content calendar gotowy. Przechodzę do pisania artykułów..."
```

### 2. Analiza danych (Task + Background)

```
> Przeanalizuj dane sprzedażowe z ostatniego roku i znajdź trendy

Claude:
  [Task subagent_type: "Explore", run_in_background: true]
  "Uruchomiłem analizę w tle (Task ID: data-analysis-xyz).
   To potrwa ~5 minut. Możesz pracować dalej."

# Robisz coś innego...

Claude (po 5 minutach):
  "Analiza gotowa! Znalazłem 3 kluczowe trendy:
   1. Wzrost sprzedaży o 45% w Q4
   2. Produkty kategorii 'Premium' rosną 3x szybciej
   3. Klienci z email marketingu wydają 2x więcej"
```

### 3. Migracja systemu (TodoWrite + Task)

```
> Zmigruj naszą aplikację z Heroku na AWS

Claude:
  [TodoWrite]
  ⏳ 1. Audit obecnej infrastruktury Heroku
  ⏳ 2. Zaprojektowanie architektury AWS
  ⏳ 3. Setup AWS account i VPC
  ⏳ 4. Migracja bazy danych
  ⏳ 5. Deployment aplikacji na ECS
  ⏳ 6. Konfiguracja DNS i SSL
  ⏳ 7. Testing i rollback plan
  ⏳ 8. Production cutover

  [Task subagent_type: "Plan"]
  "Deleguję projekt architektury AWS do subagenta..."

  ✅ 1. Audit obecnej infrastruktury Heroku
  🔄  2. Zaprojektowanie architektury AWS
     → Subagent "Plan" analizuje wymagania
     → Proponuje: ECS Fargate + RDS + CloudFront + S3
  ...
```

---

## Podsumowanie

Właśnie poznałeś **3 najbardziej zaawansowane narzędzia orkiestracyjne** Claude Code:

1. **Task** - Delegacja do subagentów
   - Specjalizacja (Explore, Plan, Code)
   - Tańsze modele w tle
   - Background execution dla długich zadań

2. **TodoWrite** - Zarządzanie złożonymi projektami
   - Statusy: pending → in_progress → completed
   - Wznowienie po błędach
   - Pełna transparentność postępu

3. **AskUserQuestion** - Zbieranie preferencji
   - Single/multi-select
   - Recommended options (AI analysis)
   - Elastyczność (Other option)

### Podsumowanie całego Modułu 2: Wbudowane Narzędzia

Przez ostatnie 6 maili poznałeś **kompletny zestaw narzędzi**, których używa Claude Code:

**Maile 1-3: Praca z plikami**
- Read - czytanie plików (z offsetem, obrazy, PDF)
- Write - tworzenie nowych plików
- Edit - modyfikacja istniejących (exact string replacement)
- NotebookEdit - edycja Jupyter notebooks
- Glob - wyszukiwanie plików (pattern matching)
- Grep - wyszukiwanie w zawartości (regex, multiline)

**Maile 4-5: Integracje zewnętrzne**
- Bash - wykonywanie komend (timeout, background)
- WebFetch - pobieranie stron i dokumentacji
- WebSearch - wyszukiwanie aktualnych informacji

**Mail 6: Orkiestracja (dzisiejszy)**
- Task - delegacja do subagentów
- TodoWrite - zarządzanie projektami
- AskUserQuestion - interakcja z użytkownikiem

**Co osiągnąłeś?**
- Rozumiesz **jak Claude działa od środka**
- Znasz **wszystkie narzędzia** i ich zastosowania
- Potrafisz **optymalizować workflow** poprzez wybór właściwych narzędzi
- Jesteś gotowy na **Moduł 3: Bezpieczeństwo i Uprawnienia**

---

## Pytania kontrolne

Sprawdź czy opanowałeś materiał z dzisiejszej lekcji:

1. **Jaki jest główny benefit używania Task z subagentami zamiast robienia wszystkiego głównym agentem?**

   <details>
   <summary>Podpowiedź</summary>
   Subagenty używają tańszych modeli (np. Haiku), nie zaśmiecają głównego kontekstu, można je uruchamiać w tle (background execution) i działają równolegle co przyspiesza pracę.
   </details>

2. **Kiedy powinieneś użyć TodoWrite?**

   <details>
   <summary>Podpowiedź</summary>
   Gdy zadanie jest złożone (więcej niż 3 kroki), wymaga śledzenia postępu, możesz potrzebować wznowić pracę po błędzie lub przerwie. NIE używaj dla prostych zadań typu "popraw literówkę".
   </details>

3. **Co oznacza "Recommended" w AskUserQuestion?**

   <details>
   <summary>Podpowiedź</summary>
   Claude analizuje projekt (np. widzi yarn.lock, tailwind.config.js) i na podstawie tej analizy rekomenduje najlepszą opcję dopasowaną do Twojego setupu. Decyzja nadal należy do Ciebie.
   </details>

---

## Zadania praktyczne - łącz wiedzę z całego modułu!

### Zadanie 1: Orchestrated Project Setup

**Cel:** Połącz TodoWrite + AskUserQuestion w praktycznym projekcie

```
> Stwórz kompletny setup dla projektu blogging platform:
  - Zapytaj mnie o preferencje (framework, styling, database)
  - Stwórz todo list z wszystkimi krokami
  - Zaimplementuj bazowy setup
```

**Co ćwiczysz:**
- Interakcja z AskUserQuestion
- Śledzenie postępu z TodoWrite
- Praktyczny setup projektu

---

### Zadanie 2: Background Analysis

**Cel:** Wykorzystaj Task z background execution

Jeśli masz większy projekt:
```
> Przeanalizuj całe repozytorium w tle i znajdź:
  - Nieużywane funkcje
  - Duplikaty kodu
  - Potencjalne security issues

  (run_in_background: true)
```

Podczas gdy analiza trwa, pracuj nad czymś innym. Sprawdź wynik później.

**Co ćwiczysz:**
- Task delegation
- Background execution
- Równoległa praca

---

### Zadanie 3: Complex Refactoring

**Cel:** Użyj wszystkich 3 narzędzi w jednym workflow

```
> Zrefaktoruj moduł authentication w mojej aplikacji:
  1. Przeanalizuj obecną implementację (Task: Explore)
  2. Zaproponuj nową architekturę (Task: Plan)
  3. Zapytaj o moje preferencje (AskUserQuestion)
  4. Stwórz plan migracji (TodoWrite)
  5. Wykonaj refaktoryzację krok po kroku
```

**Co ćwiczysz:**
- Orkiestracja wszystkich narzędzi
- Złożony workflow
- Real-world scenario

---

## Linki do zasobów

**Orkiestracja i automatyzacja:**
- [Project Management Best Practices](https://github.com/topics/project-management) - Wzorce zarządzania projektami
- [Automation Patterns](https://github.com/topics/automation) - Sprawdzone schematy automatyzacji
- [Task Delegation in AI Systems](https://www.anthropic.com/research) - Badania Anthropic na temat delegacji zadań

**Narzędzia wspierające workflow:**
- [GitHub Projects](https://github.com/features/issues) - Zarządzanie zadaniami
- [Linear](https://linear.app/) - Issue tracking dla teamów
- [Notion](https://notion.so/) - Dokumentacja i planowanie

**Community i inspiracje:**
- [Claude Code Community Discord](https://discord.gg/anthropic) - Wymiana doświadczeń
- [Awesome Claude Code](https://github.com/topics/claude-code) - Kolekcja przykładów
- [Developer Productivity](https://twitter.com/search?q=%23productivity%20%23automation) - Inspiration feed

---

## Co dalej?

**Moduł 3: Bezpieczeństwo i Uprawnienia (Security & Permissions)**

Nauczysz się:
- Jak Claude chroni Twoje dane
- System uprawnień i sandboxing
- Bezpieczne workflow z poufnymi danymi
- Audit logs i compliance
- Best practices dla teamów

**Start za 2 dni** - dajemy Ci czas na przećwiczenie orkiestracji!

---

## Gratulacje za ukończenie Modułu 2!

Przeszedłeś przez **wszystkie wbudowane narzędzia** Claude Code. Teraz rozumiesz:
- Jak agent czyta i modyfikuje pliki (Read, Write, Edit)
- Jak przeszukuje kod (Grep, Glob)
- Jak komunikuje się ze światem (WebFetch, WebSearch)
- Jak orkiestruje złożone projekty (Task, TodoWrite, AskUserQuestion)

**Jesteś teraz na poziomie "power user"** - znasz narzędzia, rozumiesz mechanikę, potrafisz optymalizować workflow.

W Module 3 nauczysz się jak **pracować bezpiecznie** - chronić dane, zarządzać uprawnieniami i stosować best practices w środowisku produkcyjnym.

**Do zobaczenia w Module 3!**

---

*P.S. Wykonałeś zadania praktyczne? Podziel się wynikami na naszym Discordzie i pokaż jak orkiestrujesz złożone projekty!*

*P.P.S. Pytania? Wątpliwości? Odpowiedz na tego maila - czytam każdą wiadomość i odpowiadam osobiście.*
