---
lesson: "04.05"
title: "Voice Mode, performance i podsumowanie kursu"
description: "Głosowe sterowanie Claude Code, optymalizacja wydajności i kosztów, wskazówki dla power users i zamknięcie całego kursu"
module: "04-finish"
---

# Voice Mode, performance i podsumowanie kursu

Jest piątek, koniec dnia. Karina, Olek, Marta i Paweł siedzą przy kawie. Za nimi cztery moduły kursu — od pierwszego `claude --version` po Agent Teams koordynujące pięciu agentów.

— Mam jeszcze jedno pytanie — mówi Olek. — Wczoraj widziałem, jak ktoś mówił do Claude Code. Dosłownie — głosem. Dyktował prompt jak wiadomość głosową.

— To Voice Mode — odpowiada Paweł. — Działa push-to-talk, jak krótkofalówka. Przytrzymujesz klawisz, mówisz, puszczasz — Claude dostaje tekst.

Marta dodaje:

— A ja mam inny problem. Moje sesje trwają po 2-3 godziny i pod koniec Claude "zapomina" wcześniejsze ustalenia. Wydaję coraz więcej tokenów, a jakość spada.

— To problem wydajności — mówi Paweł. — I to jest drugie, co dziś omówimy. A na koniec — podsumujemy cały kurs.

> **Moduł:** Finał
> **Poziom:** Średniozaawansowany
> **Czas:** 25--35 minut

## Co wyniesiesz z tej lekcji

- Wiesz, jak skonfigurować i używać Voice Mode.
- Rozumiesz mechanizmy optymalizacji wydajności: prompt caching, kompresja kontekstu, deferred tool loading.
- Potrafisz kontrolować koszty i wydłużać efektywność sesji.
- Masz zestaw porad dla power users.
- Widzisz pełną mapę kompetencji z kursu i wiesz, co dalej.

---

## 1. Voice Mode — mów zamiast pisać

Voice Mode zamienia Twój głos w tekst, który trafia do Claude Code jako prompt. To nie jest rozmowa głosowa — Claude nie odpowiada głosem. Mówisz Ty, Claude czyta tekst.

### Jak to działa

1. Przytrzymujesz klawisz (push-to-talk)
2. Mówisz prompt
3. Puszczasz klawisz
4. Speech-to-text zamienia głos na tekst
5. Tekst trafia do Claude Code jako normalny prompt

### Konfiguracja

Voice Mode konfigurujesz w ustawieniach Claude Code przez `/config`. Możesz wybrać:

- **Klawisz push-to-talk** — domyślny lub własny binding
- **Język STT** — Speech-to-Text obsługuje ponad 20 języków

### Kiedy Voice Mode ma sens

**Tak:**
- Długie opisy zadań, które szybciej powiesz niż napiszesz
- Brainstorming — myślisz na głos, Claude notuje
- Dyktowanie treści (dokumentacja, opisy PR-ów, komentarze)
- Accessibility — gdy pisanie jest utrudnione

**Nie:**
- Precyzyjne komendy techniczne (nazwy zmiennych, ścieżki plików) — łatwiej wpisać
- Hałaśliwe otoczenie
- Wrażliwe dane — mówisz na głos, a ludzie wokół słyszą

Olek:

— Czyli mogę powiedzieć "zrób mi prezentację o wynikach Q1 na podstawie pliku sales.csv" i Claude zrozumie?

— Tak — mówi Paweł. — STT zamieni to na tekst, a Claude przetworzy jak każdy inny prompt. Jedyna różnica to sposób wprowadzania.

---

## 2. Performance — dlaczego sesje się degradują

Claude ma okno kontekstowe — określoną ilość tekstu, którą może "trzymać w głowie". Gdy zbliżasz się do limitu, dzieje się kilka rzeczy:

- Auto-compaction streszcza wcześniejsze wiadomości (tracisz szczegóły)
- Nowe wiadomości kosztują więcej (dłuższy kontekst = więcej tokenów na input)
- Claude "zapomina" wcześniejsze ustalenia (streszczenie ≠ pełna pamięć)

### Dwie metryki do obserwowania

**Zużycie kontekstu** — `/context` pokazuje, ile kontekstu zajmują poszczególne elementy. Skonfiguruj statusline (`/statusline`), żeby widzieć to ciągle.

**Koszt sesji** — `/cost` pokazuje zużycie tokenów w bieżącej sesji (dla użytkowników API).

---

## 3. Prompt caching — automatyczna oszczędność

Prompt caching to mechanizm, który cachuje niezmienione fragmenty kontekstu między wiadomościami. System prompt, CLAUDE.md, załadowane skille — wszystko, co się nie zmienia, jest cachowane.

Efekt: do 90% redukcji kosztów na powtarzalnym kontekście. Działa automatycznie, nie musisz nic konfigurować.

W praktyce oznacza to, że Twoja pierwsza wiadomość w sesji jest najdroższa. Kolejne są tańsze, bo większość kontekstu jest w cache.

Jeśli z jakiegoś powodu cache Ci przeszkadza (debugowanie, specyficzny cloud provider):

```bash
# Wyłącz globalnie
export DISABLE_PROMPT_CACHING=1

# Wyłącz dla konkretnego modelu (np. Haiku)
export DISABLE_PROMPT_CACHING_HAIKU=1
```

---

## 4. Kompresja kontekstu — `/compact`

Gdy kontekst się rozrasta, masz dwa narzędzia:

### `/compact`

Streszcza historię konwersacji. Claude podsumowuje dotychczasowe wiadomości, zwalniając miejsce na nowe.

```
/compact Focus on code changes and API decisions
```

Możesz powiedzieć Claude'owi, co zachować w streszczeniu. Bez wskazówek Claude sam zdecyduje — ale może pominąć coś, co dla Ciebie jest ważne.

### Instrukcje kompresji w CLAUDE.md

Jeśli regularnie pracujesz nad konkretnymi typami zadań, dodaj instrukcje do CLAUDE.md:

```markdown
# Compact instructions

When compacting, preserve:
- Test output and error messages
- Code changes and file paths
- API endpoint specifications
- Database schema decisions
```

### Auto-compaction

Claude Code automatycznie kompresuje kontekst, gdy zbliża się do ~95% pojemności. Możesz obniżyć próg:

```bash
export CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=50
```

Ustawienie na 50% sprawi, że kompresja uruchomi się wcześniej — sesja będzie "lżejsza", ale częściej tracisz szczegóły.

---

## 5. Deferred tool loading — ukryty oszczędnik

Każdy serwer MCP dodaje definicje narzędzi do Twojego kontekstu — nawet gdy z nich nie korzystasz. 10 serwerów MCP × 20 narzędzi = 200 definicji narzędzi zajmujących miejsce.

Claude Code automatycznie odracza ładowanie narzędzi, gdy ich definicje przekraczają 10% okna kontekstowego. Odroczone narzędzia ładują się dopiero, gdy Claude ich faktycznie potrzebuje.

Możesz obniżyć próg:

```bash
export ENABLE_TOOL_SEARCH=auto:5
```

`auto:5` triggeruje odraczanie, gdy narzędzia zajmują >5% kontekstu. Mniej idle'ujących definicji = więcej miejsca na Twój kod.

### CLI zamiast MCP

Paweł:

— Jeśli masz zainstalowane `gh`, `aws`, `gcloud` albo `sentry-cli`, Claude może ich używać bezpośrednio przez Bash. Narzędzia CLI nie dodają definicji do kontekstu — Claude po prostu uruchamia komendę. To jest tańsze niż serwer MCP, który siedzi w pamięci.

Zasada: jeśli narzędzie CLI robi to samo co serwer MCP — wybierz CLI.

---

## 6. Redukcja kosztów — zestawienie technik

### Wybór modelu

| Sytuacja | Model | Dlaczego |
|----------|-------|----------|
| Codzienne kodowanie | Sonnet | Dobry balans jakości i ceny |
| Planowanie architektury | Opus | Głębsze rozumowanie |
| Planowanie + implementacja | opusplan | Opus planuje, Sonnet wykonuje |
| Proste subagenty | Haiku | Szybki i tani do prostych zadań |

### Effort level

Low effort na prostych zadaniach może być 3-4x tańszy niż high. Zmień w trakcie sesji:

```
/effort low
```

### CLAUDE.md poniżej 500 linii

Wszystko, co jest w CLAUDE.md, ładuje się przy każdej wiadomości. Przenieś specjalistyczne instrukcje do skilli — ładują się na żądanie.

### Czyszczenie między zadaniami

```
/clear
```

Zmiana tematu? Nowa sesja. Stary kontekst to martwy ciężar. Przed `/clear` użyj `/rename`, żebyś mógł wrócić przez `/resume`.

### Precyzyjne prompty

Vague: "Improve this codebase" — Claude skanuje wszystko.
Specific: "Add input validation to the login function in auth.ts" — Claude czyta jeden plik.

Różnica w zużyciu tokenów: 10x.

### Plan mode przed implementacją

`Shift+Tab` → Plan Mode. Claude eksploruje, proponuje podejście. Ty zatwierdzasz. Dopiero potem implementacja. Zapobiega kosztownemu cofaniu, gdy Claude pójdzie w złym kierunku.

### Code intelligence plugins

Pluginy LSP (dla TypeScript, Python, Rust) dają Claude nawigację po symbolach — "go to definition" zamiast grep + czytanie wielu plików. Mniej tokenów na eksplorację.

---

## 7. Wskazówki dla power users

### Kiedy zacząć nową sesję

- Zmieniasz temat pracy (frontend → backend → dokumentacja)
- Kontekst przekracza 60-70% (`/context`)
- Claude zaczyna "zapominać" wcześniejsze ustalenia
- Po `/compact` jakość odpowiedzi spada

Zasada: lepiej 3 krótkie sesje niż 1 maratońska.

### Rozszerzony kontekst — 1M tokenów

Opus 4.6 i Sonnet 4.6 wspierają okno kontekstowe o pojemności 1 miliona tokenów — 5x więcej niż standardowe 200K. Na planach Max, Team i Enterprise Opus automatycznie używa 1M.

```
/model opus[1m]
```

Albo Sonnet z 1M:

```
/model sonnet[1m]
```

Przydatne przy dużych codebase'ach, długich sesjach, lub gdy pracujesz z wieloma plikami jednocześnie. Ale pamiętaj: większy kontekst = wyższy koszt per wiadomość.

### Checkpoint pattern (przypomnienie z lekcji 08)

1. `/rename refactor-auth` — nazwij sesję
2. Pracuj 30-60 minut
3. `/export` — zapisz stan
4. Kontynuuj lub `/clear` i zacznij nowy temat

### Deleguj ciężkie operacje

Testy, fetching dokumentacji, przetwarzanie logów — deleguj do subagentów. Ciężki output zostaje w kontekście subagenta, a Ty dostajesz streszczenie.

```
Use a subagent to run the full test suite and report only failures
```

### `/btw` — szybkie pytanie bez kontekstu

Chcesz coś sprawdzić, ale nie chcesz zaśmiecać konwersacji?

```
/btw what was the name of that config file?
```

`/btw` widzi Twoją konwersację, ale nie ma narzędzi i nie dodaje odpowiedzi do historii. Zero kosztów kontekstowych.

---

## 8. Podsumowanie kursu — mapa kompetencji

Cztery moduły. Ponad 25 lekcji. Oto, co teraz umiesz:

### Moduł 01: Podstawy
- Myślisz w kategoriach delegowania, nie instruowania
- Instalujesz, konfigurujesz i autoryzujesz Claude Code
- Zarządzasz sesjami, kontekstem i kosztami
- Pracujesz w terminalu, przeglądarce i przez SSH
- Budujesz CLAUDE.md jako pamięć projektu

### Moduł 02: Wbudowane narzędzia
- Precyzyjnie sterujesz narzędziami (Read, Write, Edit, Grep, Bash, WebFetch...)
- Tworzysz custom slash commands — od prostych po wielokrokowe workflow
- Budujesz hooki — deterministyczną warstwę kontrolną
- Konfigurujesz subagenty i delegujesz zadania
- Integrujesz MCP servers z zewnętrznymi narzędziami

### Moduł 03: Skille
- Budujesz skille z Progressive Disclosure (metadane → instrukcje → zasoby)
- Kontrolujesz wywołanie skilli (model-invocation, user-invocable, zmienne)
- Integrujesz skille z hookami i MCP
- Tworzysz feedback loops (generuj → waliduj → popraw)
- Dystrybuujesz skille przez Agent Skills Standard

### Moduł 04: Finał
- Konfigurujesz Claude Code na czterech poziomach (managed → user → project → local)
- Pakujesz skille i hooki w pluginy i dystrybuujesz przez marketplace
- Uruchamiasz Claude Code w CI/CD — od jednorazowych wywołań po GitHub Actions
- Koordynujesz Agent Teams — równoległe instancje pracujące razem
- Optymalizujesz wydajność i koszty

### Zmiana mentalnego modelu

Przed kursem myślałeś o Claude Code jako chatbocie, któremu mówisz co zrobić. Po kursie widzisz platformę agentową, na której budujesz narzędzia, workflow i zespoły. Zmiana jest mentalna, nie techniczna — i to ona robi największą różnicę w codziennej pracy.

---

## 9. Co dalej

Claude Code rozwija się szybko. Między momentem, gdy zaczęliśmy ten kurs, a teraz — pojawiło się kilkanaście nowych funkcji. To się nie zatrzyma.

Trzy rzeczy, które warto robić:

**1. Śledź changelog.** https://code.claude.com/docs/en/changelog — nowe funkcje, zmiany, poprawki. Czytaj raz w tygodniu.

**2. Buduj na tym, co masz.** Nie próbuj wdrożyć wszystkiego naraz. Zacznij od jednego skilla. Jednego hooka. Jednego workflow w CI/CD. Iteruj.

**3. Dziel się wiedzą.** Najlepszy sposób na naukę to nauczanie. Stwórz plugin dla swojego zespołu. Napisz CLAUDE.md dla nowego projektu. Pokaż koledze, jak `/compact` ratuje długie sesje.

Karina:

— Cztery tygodnie temu kopiowałam style guide do każdej rozmowy z Claude'em. Teraz mam skilla, który sam to ładuje, hooka, który formatuje kod, i subagenta, który robi code review. I cały mój zespół tego używa — bo spakuowałam to w plugin.

Olek:

— A ja mam workflow w GitHub Actions, który automatycznie robi review każdego PR-a i generuje changelog co poniedziałek. Nie dotykam tego ręcznie.

Marta:

— Moje analizy danych działają jako skrypty z `claude -p`. Rano odpalam, po kawie mam wyniki.

Paweł:

— I to jest sedno. Claude Code nie zastępuje Waszej pracy. Daje Wam narzędzia, żebyście robili ją lepiej, szybciej i z mniejszym trudem. Reszta zależy od Was.

---

## Słowniczek

**Voice Mode** — funkcja Claude Code pozwalająca na wprowadzanie promptów głosem (push-to-talk). Głos jest zamieniany na tekst przez Speech-to-Text (STT) i przekazywany do Claude'a jak normalny prompt.

**Push-to-talk** — sposób aktywacji mikrofonu, w którym przytrzymujesz klawisz podczas mówienia. Puszczenie klawisza kończy nagrywanie i wysyła tekst.

**Auto-compaction** — automatyczna kompresja kontekstu, która uruchamia się, gdy konwersacja zbliża się do limitu okna kontekstowego (~95% domyślnie). Claude streszcza wcześniejsze wiadomości, zwalniając miejsce.

**Deferred tool loading** — mechanizm odraczania ładowania definicji narzędzi MCP do kontekstu. Narzędzia ładują się dopiero, gdy Claude ich potrzebuje, zamiast zajmować miejsce od początku sesji.

**Rozszerzony kontekst (1M)** — opcja powiększenia okna kontekstowego do 1 miliona tokenów (5x standardowe 200K). Dostępna dla Opus 4.6 i Sonnet 4.6.

**Plan mode** — tryb pracy, w którym Claude eksploruje i planuje bez modyfikowania plików. Przydatny przed implementacją, żeby zapobiec kosztownemu cofaniu zmian. Aktywacja: `Shift+Tab`.

**`/btw`** — komenda do zadawania szybkich pytań, które nie dodają się do historii konwersacji. Widzi pełny kontekst, ale nie ma dostępu do narzędzi. Odpowiedź jest jednorazowa.

---

## Dokumentacja

- Tryb interaktywny i skróty: https://code.claude.com/docs/en/interactive-mode
- Konfiguracja modelu: https://code.claude.com/docs/en/model-config
- Zarządzanie kosztami: https://code.claude.com/docs/en/costs
- Changelog: https://code.claude.com/docs/en/changelog

---

*Dziękujemy za udział w kursie Claude Code. Buduj, automatyzuj, dziel się wiedzą.*
