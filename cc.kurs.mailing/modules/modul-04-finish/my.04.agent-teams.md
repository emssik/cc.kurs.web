---
lesson: "04.04"
title: "Agent Teams — orkiestracja wielu agentów"
description: "Jak koordynować wiele instancji Claude Code pracujących równolegle nad wspólnym zadaniem"
module: "04-finish"
---

# Agent Teams — orkiestracja wielu agentów

Karina dostaje zadanie: zrefaktoryzuj moduł uwierzytelniania. Frontend, backend, testy — trzy obszary, które można robić równolegle. W normalnej sesji Claude Code robiłaby to sekwencyjnie: najpierw backend, potem frontend, na końcu testy. Trzy godziny pracy.

— Mogę uruchomić trzy sesje Claude Code w trzech terminalach — mówi. — Ale kto będzie koordynował?

— Nikt nie musi — odpowiada Paweł. — Agent Teams to funkcja, w której jeden Claude zarządza zespołem. Rozdziela zadania, monitoruje postępy, zbiera wyniki.

Olek mruga.

— Czyli Claude zarządza innymi Claude'ami?

— Tak. Lider koordynuje, członkowie zespołu pracują. Każdy ma własne okno kontekstowe, ale dzielą wspólną listę zadań.

Marta:

— W module 02 mówiliśmy o subagentach. To to samo?

— Nie — odpowiada Paweł. — I właśnie ta różnica jest dziś tematem.

> **Moduł:** Finał
> **Poziom:** Zaawansowany
> **Czas:** 30--40 minut

## Co wyniesiesz z tej lekcji

- Rozumiesz różnicę między subagentami a Agent Teams.
- Wiesz, jak stworzyć zespół agentów i przydzielać im zadania.
- Znasz architekturę: lider, członkowie, lista zadań, wiadomości.
- Rozumiesz dziedziczenie modelu i uprawnień.
- Potrafisz zastosować Agent Teams w praktycznych scenariuszach.
- Znasz ograniczenia i pułapki.

---

## 1. Subagenty vs Agent Teams — dwa różne narzędzia

### Subagenty (z modułu 02)

Subagent to pomocnik wewnątrz Twojej sesji. Uruchamiasz go, on robi robotę, zwraca wynik — i ten wynik wraca do Twojej konwersacji.

Model mentalny: **szef i asystent**. Asystent idzie coś sprawdzić, wraca z odpowiedzią. Nie rozmawia z innymi asystentami.

- Kontekst: własne okno, ale wynik wraca do głównej konwersacji
- Komunikacja: subagent raportuje tylko do Ciebie
- Koordynacja: Ty (główna sesja) zarządzasz wszystkim
- Koszt tokenów: niższy — wyniki są streszczane przy powrocie

### Agent Teams

Agent Teams to osobne instancje Claude Code pracujące równolegle, koordynowane przez lidera. Każdy członek zespołu to pełna sesja Claude Code z własnym kontekstem.

Model mentalny: **zespół projektowy**. Lider rozdziela zadania, członkowie pracują niezależnie, mogą rozmawiać ze sobą, dzielą wspólną listę zadań.

- Kontekst: każdy ma pełne, niezależne okno kontekstowe
- Komunikacja: członkowie mogą pisać do siebie nawzajem
- Koordynacja: współdzielona lista zadań, samodzielne przypisywanie
- Koszt tokenów: wyższy — każdy członek to osobna instancja Claude

### Kiedy co wybrać

**Subagenty** — gdy:
- Potrzebujesz szybkiego wyniku (sprawdź X, znajdź Y)
- Zadanie jest samowystarczalne
- Zależy Ci na oszczędności tokenów
- Wynik ma wrócić do Twojej konwersacji

**Agent Teams** — gdy:
- Zadania są naprawdę niezależne i mogą biec równolegle
- Członkowie muszą się ze sobą komunikować
- Każde zadanie wymaga dużego kontekstu (testy, dokumentacja, implementacja)
- Chcesz, żeby agenci sami koordynowali pracę

Karina:

— Czyli do "sprawdź 5 plików" biorę subagenta. Do "zrefaktoryzuj moduł" biorę zespół.

— Dokładnie — potwierdza Paweł.

---

## 2. Jak uruchomić Agent Teams

Agent Teams to funkcja eksperymentalna. Musisz ją włączyć:

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

Dodaj to do `settings.json` (user lub project) albo ustaw zmienną środowiskową.

### Tworzenie zespołu

Nie musisz programować. Opisujesz zadanie i strukturę zespołu w naturalnym języku:

```
Create an agent team to refactor the authentication module.
Spawn three teammates:
- One for the backend API changes
- One for the frontend components
- One for updating tests
```

Claude tworzy zespół, uruchamia członków i koordynuje pracę.

Możesz też być bardziej precyzyjny:

```
Create a team with 4 teammates to review PR #142.
Use Sonnet for each teammate.
One focused on security, one on performance,
one on test coverage, one on code style.
```

---

## 3. Architektura zespołu

### Komponenty

| Element | Rola |
|---------|------|
| **Lider** | Twoja główna sesja Claude Code. Tworzy zespół, rozdziela zadania, zbiera wyniki |
| **Członkowie** | Osobne instancje Claude Code. Pracują niezależnie, raportują do lidera |
| **Lista zadań** | Współdzielona lista w `~/.claude/tasks/{team-name}/`. Każdy może ją czytać i aktualizować |
| **Wiadomości** | System komunikacji między agentami. Wiadomości dostarczane automatycznie |

### Tryby wyświetlania

Dwa tryby:

**In-process** (domyślny) — wszyscy członkowie w jednym terminalu. `Shift+Down` przełącza między nimi. Działa wszędzie.

**Split panes** — każdy członek w osobnym panelu. Wymaga tmux albo iTerm2 z `it2` CLI. Widzisz wszystkich na raz.

Konfiguracja:

```json
{
  "teammateMode": "in-process"
}
```

Albo jednorazowo:

```bash
claude --teammate-mode in-process
```

---

## 4. Dziedziczenie modelu i uprawnień

### Model

Członkowie zespołu dziedziczą model lidera. Jeśli lider używa Sonneta, członkowie też. Możesz poprosić o nadpisanie:

```
Create a team. Use Opus for the architect teammate
and Sonnet for the implementation teammates.
```

### Uprawnienia

Członkowie startują z ustawieniami uprawnień lidera. Jeśli lider ma `--dangerously-skip-permissions`, członkowie też. Po uruchomieniu możesz zmienić tryb uprawnień dla pojedynczego członka — ale nie możesz ustawić różnych trybów przy starcie.

### Kontekst

Każdy członek ładuje kontekst projektu od nowa: CLAUDE.md, MCP, skille. Ale nie dziedziczy historii konwersacji lidera. Prompt uruchomieniowy (od lidera) to jedyny kontekst startowy.

Dlatego warto być konkretny:

```
Spawn a security reviewer with the prompt:
"Review the auth module at src/auth/ for vulnerabilities.
Focus on token handling and session management.
The app uses JWT in httpOnly cookies."
```

Im więcej kontekstu dasz w prompcie uruchomieniowym, tym mniej członek musi sam odkrywać. Dobry prompt startowy to 3-5 zdań: co zrobić, gdzie szukać, jakie są ograniczenia. Zły prompt to "review the code" — członek zacznie od eksploracji, co kosztuje tokeny i czas.

---

## 5. Komunikacja w zespole

### Wiadomości automatyczne

Gdy członek kończy zadanie, lider dostaje powiadomienie. Nie musisz sprawdzać ręcznie.

### Rozmowy z członkami

W trybie in-process: `Shift+Down` przechodzi do następnego członka. Wpisujesz wiadomość i wysyłasz. `Ctrl+T` pokazuje listę zadań.

W trybie split panes: klikasz w panel członka i piszesz.

### Wymaganie zatwierdzenia planu

Przy ryzykownych zadaniach możesz wymagać, żeby członek najpierw przygotował plan:

```
Spawn an architect teammate to refactor the database layer.
Require plan approval before they make any changes.
```

Członek pracuje w trybie read-only (plan mode), przygotowuje plan, wysyła go do lidera. Lider zatwierdza lub odrzuca z feedbackiem. Po zatwierdzeniu członek przechodzi do implementacji.

### Lista zadań

Zadania mają trzy stany: pending, in progress, completed. Zadania mogą mieć zależności — zadanie zablokowane przez inne nie może być podjęte, dopóki blokujące się nie skończy.

Lider tworzy zadania, członkowie je podejmują. Mogą też podejmować zadania samodzielnie, bez przypisania przez lidera (self-claim). To przydatne, gdy lider nie zna z góry optymalnego przydziału — członkowie sami wybierają zadania pasujące do ich specjalizacji.

---

## 6. Praktyczne scenariusze

### Równoległy code review

Jeden reviewer ma tendencję do skupiania się na jednym typie problemów. Trzech reviewerów z różnymi perspektywami pokryje więcej:

```
Create an agent team to review PR #142.
Spawn three reviewers:
- One focused on security implications
- One checking performance impact
- One validating test coverage
Have them review and report findings.
```

Każdy reviewer pracuje na tym samym PR, ale z innym filtrem. Lider zbiera wyniki.

### Debugging z konkurencyjnymi hipotezami

Gdy przyczyna buga jest niejasna:

```
Users report the app crashes after login.
Create a team of 3 agents to investigate different hypotheses:
- Token expiration handling
- Session storage race condition
- Database connection pool exhaustion
Have them talk to each other to challenge each other's theories.
```

Konkurencja hipotez działa dobrze. Jeden agent szuka potwierdzenia swojej teorii i obalenia cudzych. Teoria, która przetrwa, jest najprawdopodobniej trafna.

### Multi-layer refactoring

```
Create a team to add pagination to the users API:
- Backend teammate: modify the API endpoint and database queries
- Frontend teammate: update the user list component
- Test teammate: write integration tests for the new pagination
```

Każdy członek pracuje na innych plikach, więc nie ma konfliktów. Lider monitoruje i zbiera na koniec.

### Research wieloaspektowy (Olek)

```
Create a team to research CRM options for the company:
- One teammate researches pricing and plans
- One teammate evaluates API and integration capabilities
- One teammate checks security certifications and compliance
Synthesize findings into a recommendation document.
```

---

## 7. Redukcja kosztów

Agent Teams zużywają istotnie więcej tokenów niż pojedyncza sesja. Każdy członek ma własne okno kontekstowe.

Jak trzymać koszty w ryzach:

- **Sonnet dla członków.** Opus zostawiaj dla lidera (jeśli w ogóle).
- **Małe zespoły.** 3-5 członków to optimum. Powyżej 5 koordynacja pochłania więcej niż daje.
- **Krótkie prompty startowe.** Członkowie ładują CLAUDE.md, MCP i skille automatycznie — nie powtarzaj tego w prompcie.
- **Zamykaj zespół po pracy.** Aktywni członkowie zużywają tokeny nawet gdy czekają.
- **5-6 zadań na członka.** Mniej = za mało pracy. Więcej = za dużo context switchingu.

Orientacyjnie: Agent Teams zużywają kilkukrotnie więcej tokenów niż standardowa sesja. Trzy osoby w zespole to trzy pełne okna kontekstowe plus komunikacja między nimi.

### Kiedy NIE używać Agent Teams

Nie każde zadanie potrzebuje zespołu. Typowe pułapki:

**Zadanie jest sekwencyjne.** Jeśli krok 2 zależy od wyniku kroku 1, a krok 3 od kroku 2 — równoległość nic nie da. Jeden agent zrobi to szybciej.

**Za mało pracy na osobę.** Trzy osoby do zmiany trzech linii kodu? Overhead koordynacji pochłonie więcej niż zysk z równoległości.

**Wspólne pliki.** Jeśli wszyscy członkowie muszą edytować ten sam plik — konfliktów nie unikniesz. Agent Teams nie mają mechanizmu merge. Ostatni zapis wygrywa.

**Mały projekt.** Jeśli cały kontekst mieści się w jednym oknie kontekstowym (200K tokenów) — subagent wystarczy. Agent Teams opłacają się przy dużych, wielowarstwowych projektach.

Olek:

— Czyli do mojego raportu tygodniowego wystarczy `claude -p` z lekcji 03?

— Tak — mówi Paweł. — Agent Teams to jak wynajęcie ekipy remontowej. Nie wynajmujesz ekipy, żeby powiesić obraz.

---

## 8. Pułapki i ograniczenia

**Brak zagnieżdżonych zespołów.** Członek nie może stworzyć własnego zespołu ani członka. Tylko lider zarządza.

**Brak wznawiania sesji z in-process.** `/resume` nie przywraca członków in-process. Po wznowieniu musisz stworzyć nowych.

**Konflikty plikowe.** Dwóch członków edytujących ten sam plik = nadpisywanie. Rozdzielaj pracę tak, żeby każdy miał swój zestaw plików.

**Lider zabiera się do pracy sam.** Czasem lider zaczyna implementować zamiast delegować. Powiedz mu: "Wait for your teammates to complete their tasks before proceeding."

**Status zadań może się opóźniać.** Członek czasem nie oznaczy zadania jako completed. Jeśli widzisz zablokowane zadanie — sprawdź, czy praca faktycznie jest zrobiona.

**Jedno zamknięcie.** Przed tworzeniem nowego zespołu zamknij stary. Jeden zespół na sesję.

**Uprawnienia przy starcie.** Nie możesz ustawić różnych uprawnień dla różnych członków przy starcie — tylko jednolite dziedziczenie od lidera.

**Koszt rośnie szybko.** Trzy osoby w zespole to trzy pełne sesje Claude Code — trzy razy więcej tokenów na wejściu, trzy razy więcej na wyjściu, plus overhead komunikacji. Zanim uruchomisz zespół, policz, czy naprawdę potrzebujesz równoległości.

---

## 9. Hooki dla zespołów

Dwa specjalne eventy hooków:

**TeammateIdle** — uruchamia się, gdy członek ma przejść w stan idle. Exit code 2 wysyła feedback i utrzymuje członka w pracy.

**TaskCompleted** — uruchamia się, gdy zadanie ma zostać oznaczone jako completed. Exit code 2 blokuje oznaczenie i wysyła feedback — przydatne do quality gates.

```json
{
  "hooks": {
    "TaskCompleted": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "./scripts/verify-task-quality.sh"
          }
        ]
      }
    ]
  }
}
```

---

## Słowniczek

**Agent Teams** — eksperymentalna funkcja Claude Code pozwalająca na koordynację wielu instancji Claude Code pracujących równolegle. Jedna sesja (lider) zarządza zespołem, członkowie pracują niezależnie i komunikują się ze sobą.

**Lider (team lead)** — główna sesja Claude Code, która tworzy zespół, rozdziela zadania i zbiera wyniki. Lider jest stały — nie można zmienić lidera w trakcie pracy zespołu.

**Członek zespołu (teammate)** — osobna instancja Claude Code uruchomiona przez lidera. Ma własne okno kontekstowe, może komunikować się z innymi członkami i liderem.

**Lista zadań (task list)** — współdzielona lista zadań w `~/.claude/tasks/{team-name}/`. Członkowie mogą samodzielnie podejmować zadania (self-claim) lub być przydzielani przez lidera.

**In-process mode** — tryb wyświetlania, w którym wszyscy członkowie pracują w jednym terminalu. Przełączanie między nimi przez `Shift+Down`.

**Split panes** — tryb wyświetlania, w którym każdy członek ma osobny panel terminala. Wymaga tmux lub iTerm2.

**Self-claim** — mechanizm, w którym członek zespołu sam podejmuje dostępne, nieprzypisane zadanie z listy zadań, bez czekania na przypisanie przez lidera.

---

## Dokumentacja

- Agent Teams: https://code.claude.com/docs/en/agent-teams
- Subagenty (porównanie): https://code.claude.com/docs/en/sub-agents
- Zarządzanie kosztami: https://code.claude.com/docs/en/costs

---

*W następnej lekcji: Voice Mode, optymalizacja wydajności i wielkie podsumowanie całego kursu.*
