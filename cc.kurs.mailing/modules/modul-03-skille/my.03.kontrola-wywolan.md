---
lesson: "03.03"
title: "Kontrola — kto, kiedy i jak wywołuje skilla"
description: "Zmienne, izolacja w subagentach i hooki na poziomie skilla — pełna kontrola nad zachowaniem"
module: "03-skille"
---

# Kontrola -- kto, kiedy i jak wywołuje skilla

---

## Przypomnienie z poprzedniej lekcji

W lekcji 02 zbudowałeś porządną bazę wiedzy dla swoich skilli. Masz folder `references/` z dokumentami, folder `scripts/` ze skryptami wykonawczymi i wiesz, jak działa Progressive Disclosure -- Claude sięga po szczegóły dopiero wtedy, gdy są potrzebne.

Oba projekty (code-review i create-presentation) mają kompletną strukturę katalogów z SKILL.md, references i scripts. Działają, ale jest problem. A właściwie kilka problemów.

---

## Fabuła: trzy problemy w jeden poniedziałek

Karina, devka w zespole Pawła, pisze na Slacku: "Ludzie, Claude odpala mi code-review skill za każdym razem, gdy ktoś w rozmowie napisze 'sprawdź ten kod'. Wczoraj pytałam go o coś zupełnie innego -- chciałam zrozumieć, jak działa pewna funkcja -- i zamiast wyjaśnienia dostałam pełny raport z review."

Olek, PM zespołu, dorzuca swoje: "A u mnie odwrotny problem. Chcę, żeby presentation skill zawsze pytał o temat. Bez tematu nie ma sensu go odpalać, a Claude czasem odpala go z pustymi rękami i generuje prezentację o niczym."

Paweł, tech lead, odpowiada krótko: "Pora nauczyć się sterować tym, kto i kiedy odpala skilla. I przy okazji -- jak przekazywać mu konkretne parametry."

Dzisiejsza lekcja rozwiąże wszystkie trzy problemy.

---

## Co wyniesiesz z tej lekcji

Po tej lekcji będziesz wiedzieć:

- Jak zablokować Claude'owi automatyczne odpalanie skilla (tak, żeby tylko Ty mógł go uruchomić)
- Jak ukryć skilla przed użytkownikiem, zostawiając go jako wiedzę tła dla Claude'a
- Jak przekazywać argumenty do skilli -- od prostej ścieżki do pliku po wieloargumentowe komendy
- Jak uruchomić skilla w izolowanym subagencie, żeby nie zaśmiecał głównej rozmowy
- Jak podpiąć automatyczne skrypty (hooki), które odpalają się w trakcie pracy skilla

---

## Tryby wywołania -- trzy pozycje przełącznika

Każdy skill ma dwa niezależne "włączniki": czy może go użyć użytkownik i czy może go użyć Claude. Domyślnie oba są włączone. Ale możesz je przestawić.

### Tryb domyślny (brak flag)

- Użytkownik MOŻE wywołać przez `/nazwa-skilla`
- Claude MOŻE wywołać automatycznie, gdy uzna to za stosowne
- Pole `description` jest ładowane do kontekstu Claude'a na starcie sesji
- Claude widzi nazwę i opis skilla od razu, co pozwala mu zdecydować, kiedy go użyć

Kiedy to ma sens: dla skilli ogólnego przeznaczenia, których używasz często i chcesz, żeby Claude sam sięgnął po nie, gdy pasują do sytuacji. Na przykład skill do formatowania kodu albo generowania testów.

```yaml
---
name: format-code
description: "Format code files according to project style guide and run prettier"
---
```

W tym trybie wystarczy napisać "sformatuj ten plik" i Claude sam odpali skilla.

### Tryb "tylko ręczne" -- disable-model-invocation: true

- Użytkownik MOŻE wywołać przez `/nazwa-skilla`
- Claude NIE MOŻE wywołać automatycznie
- Pole `description` NIE jest ładowane do kontekstu (oszczędność tokenów)
- Skill zachowuje się jak klasyczna komenda -- musisz go odpalić świadomie

Kiedy to ma sens: dla operacji z side-effectami, czyli takich, które zmieniają coś w świecie zewnętrznym. Deploy, migracja bazy danych, wysyłanie maili, tworzenie ticketów. Wszystko, czego nie chcesz, żeby Claude robił "z automatu".

```yaml
---
name: deploy-staging
description: "Deploy current branch to staging environment"
disable-model-invocation: true
---
```

Pomyśl o tym jak o czerwonym przycisku za szybką. Przycisk istnieje, możesz go nacisnąć -- ale musisz najpierw podnieść osłonę. Nikt go nie naciśnie przypadkiem.

To rozwiązanie problemu Kariny. Jej code-review skill powinien mieć tę flagę:

```yaml
---
name: code-review
description: "TypeScript/Next.js code quality reviewer with security checks"
disable-model-invocation: true
---
```

Teraz Claude nie odpali review sam z siebie. Karina musi świadomie wpisać `/code-review`.

### Tryb "niewidzialny" -- user-invocable: false

- Użytkownik NIE widzi skilla w menu `/`
- Claude MOŻE używać w tle (sam decyduje kiedy)
- Pole `description` JEST ładowane do kontekstu
- Skill nie jest komendą -- jest raczej "podręcznikiem", po który Claude sięga sam

Kiedy to ma sens: dla wiedzy tła. Brand guide, standardy architektoniczne, konwencje nazewnictwa. Rzeczy, które Claude powinien znać i stosować, ale które nie są komendami do uruchomienia.

```yaml
---
name: architecture-standards
description: "Company architecture standards for microservices and API design"
user-invocable: false
---
```

Użytkownik nigdy nie wpisze `/architecture-standards`. Ale gdy poprosi Claude'a o zaprojektowanie nowego endpointu, Claude sięgnie po ten skill automatycznie i zastosuje firmowe standardy.

### Podsumowanie trybów

Dwie flagi, trzy konfiguracje:

**Domyślny** -- brak flag -- użytkownik i Claude mogą używać. Opis w kontekście.

**disable-model-invocation: true** -- tylko użytkownik. Opis poza kontekstem. Dla operacji niebezpiecznych.

**user-invocable: false** -- tylko Claude. Opis w kontekście. Dla wiedzy tła.

Czwarta kombinacja (oba na true/false jednocześnie) nie ma sensu -- skill, którego nikt nie może użyć, nie istnieje.

---

## Zmienne -- przekazywanie parametrów

Skill bez parametrów jest jak formularz bez pól. Czasem wystarczy, ale częściej chcesz przekazać mu konkretne dane: ścieżkę do pliku, temat prezentacji, numer ticketa.

### $ARGUMENTS -- wszystko naraz

Zmienna `$ARGUMENTS` zawiera cały tekst, który podasz po nazwie skilla.

```bash
/code-review src/components/Header.tsx
```

W treści SKILL.md:
```markdown
Review the code at: $ARGUMENTS
```

Claude zobaczy:
```
Review the code at: src/components/Header.tsx
```

Jeśli nie używasz `$ARGUMENTS` nigdzie w treści SKILL.md, Claude Code automatycznie doklei argumenty na końcu z etykietą `ARGUMENTS: <wartość>`.

### $0, $1, $2 -- poszczególne argumenty

Jeśli Twój skill przyjmuje kilka parametrów, możesz odwołać się do każdego z osobna. Numeracja zaczyna się od zera.

```bash
/create-presentation "Q1 Sales Report" sales-team executive
```

- `$0` = `Q1 Sales Report` (temat)
- `$1` = `sales-team` (odbiorcy)
- `$2` = `executive` (format)

Możesz też użyć pełnej składni: `$ARGUMENTS[0]`, `$ARGUMENTS[1]`, `$ARGUMENTS[2]`. Robi dokładnie to samo co `$0`, `$1`, `$2` — to kwestia preferencji.

### ${CLAUDE_SESSION_ID} -- ID sesji

Każda sesja Claude Code ma unikalny identyfikator. Przydaje się do logów, plików tymczasowych (unikasz kolizji nazw) i korelacji wyników między skillami.

```markdown
Save results to: logs/${CLAUDE_SESSION_ID}/review-results.md
```

---

## Projekt 1: Zmienne w code-review

Karina aktualizuje swój skill. Chce, żeby `/code-review` przyjmowało ścieżkę do pliku lub katalogu. A jeśli ktoś nie poda ścieżki -- niech skill sprawdzi ostatnie zmiany w Git.

Oto zaktualizowany początek SKILL.md:

```markdown
---
name: code-review
description: "TypeScript/Next.js code quality reviewer with security checks"
disable-model-invocation: true
argument-hint: "[file-or-directory-path]"
---

## Target

Review the code at: $ARGUMENTS

If no path provided, review the most recent git changes:
!`git diff --cached --name-only`

If there are no staged changes either, check unstaged changes:
!`git diff --name-only`
```

Zwróć uwagę na pole `argument-hint`. To podpowiedź, która pojawia się w menu autouzupełniania, gdy wpisujesz `/code-review`. Użytkownik od razu widzi, czego skill oczekuje.

Teraz Karina może napisać:

```bash
# Konkretny plik
/code-review src/components/Header.tsx

# Cały katalog
/code-review src/utils/

# Bez argumentów -- sprawdzi zmiany w Git
/code-review
```

Trzy sposoby użycia, jeden skill.

---

## Projekt 2: Zmienne w create-presentation

Olek idzie o krok dalej. Jego skill do prezentacji przyjmuje trzy argumenty: temat, grupę docelową i format.

```markdown
---
name: create-presentation
description: "Generate branded presentations following company storytelling framework"
disable-model-invocation: true
argument-hint: "[topic] [audience] [format]"
---

## Presentation Brief

**Topic:** $0
**Target audience:** $1
**Format:** $2

If no arguments provided, ask for:
1. Presentation topic (required)
2. Target audience (default: general)
3. Format: executive | workshop | pitch (default: executive)
```

Olek używa tego tak:

```bash
/create-presentation "Q1 Sales Report" sales-team executive
```

Claude dostaje pełny brief i od razu wie, co generować. Nie trzeba prowadzić rozmowy w stylu "o czym ma być prezentacja?".

A jeśli Olek zapomni podać argumenty? Skill ma fallback -- Claude zapyta o brakujące dane. To dobra praktyka: zawsze pisz skilla tak, żeby radził sobie zarówno z pełnym zestawem argumentów, jak i z ich brakiem.

---

## context: fork -- izolacja w subagentach

Do tej pory wszystkie skille działały w głównym wątku rozmowy. To znaczy, że każdy plik, który Claude czytał w ramach review, każdy krok analizy -- wszystko ładowało się do kontekstu głównej konwersacji.

Dla krótkiego review to nie problem. Ale wyobraź sobie, że code-review skill czyta 15 plików, analizuje zależności, sprawdza security checklist. Nagle Twoje okno kontekstowe jest zapchane szczegółami review, a Ty chciałeś jeszcze porozmawiać o czymkolwiek innym.

Rozwiązanie: `context: fork`.

### Jak to działa

Dodanie `context: fork` do frontmattera sprawia, że skill uruchamia się w osobnym subagencie. To oddzielny "pokój", w którym:

- Subagent dostaje treść SKILL.md jako swój główny prompt
- NIE widzi historii Twojej rozmowy
- Ma własne okno kontekstowe
- Po zakończeniu pracy zwraca podsumowanie do głównej konwersacji

Pomyśl o tym jak o delegowaniu. Mówisz: "idź, zrób review i wróć z raportem". Nie siedzisz obok i nie patrzysz na każdy krok. Dostajesz gotowy wynik.

### Typy subagentów

Pole `agent` w frontmatterze określa typ subagenta:

**agent: general-purpose** -- pełne możliwości. Może czytać pliki, edytować je, uruchamiać komendy. Użyj, gdy skill musi wykonywać realną pracę (np. code review z poprawkami).

**agent: Explore** -- tryb tylko-do-odczytu. Może czytać pliki i przeszukiwać codebase, ale nie może nic zmieniać. Użyj, gdy skill ma zebrać informacje i wrócić z raportem.

**agent: Plan** -- tryb eksploracyjny, tylko-do-odczytu. Używany głównie wewnętrznie przez Claude Code w trybie planowania. Subagent w tym trybie może czytać pliki i analizować kod, ale nie wprowadza zmian.

### Kiedy używać context: fork

Używaj, gdy:
- Skill robi dużo "brudnej roboty" -- czyta wiele plików, analizuje zależności, przeszukuje codebase
- Nie chcesz zaśmiecać głównej konwersacji szczegółami
- Chcesz ograniczyć uprawnienia skilla (np. dać mu tylko odczyt)
- Wynik to raport lub podsumowanie, nie seria drobnych interakcji

NIE używaj, gdy:
- Skill potrzebuje kontekstu rozmowy ("co ustaliliśmy wcześniej", "na podstawie tego pliku, który przed chwilą edytowałem")
- Wynik jest krótki i szybki -- narzut na uruchomienie subagenta nie jest tego wart
- Skill ma prowadzić długi, interaktywny dialog z użytkownikiem (fork ma sens, gdy brief jest dopięty i wynik ma wrócić jako raport/podsumowanie)

---

## Projekt 1: code-review z context: fork

Karina decyduje się na izolację. Review często czyta kilkanaście plików i generuje długi raport. Nie ma sensu, żeby to wszystko ładowało się do głównej rozmowy.

Do frontmattera dochodzą dwie nowe linie:

```yaml
---
name: code-review
description: "TypeScript/Next.js code quality reviewer with security checks"
disable-model-invocation: true
argument-hint: "[file-or-directory-path]"
context: fork
agent: general-purpose
---
```

Reszta SKILL.md (sekcje Target, Review Process, Output Format) pozostaje bez zmian. Ale zachowanie skilla zmienia się radykalnie:

- Review dzieje się "w tle", w oddzielnym subagencie
- Subagent może czytać pliki i uruchamiać skrypty (`agent: general-purpose`)
- Do głównej rozmowy wraca tylko gotowy raport

Karina wpisuje `/code-review src/components/` i idzie po kawę. Gdy wróci, w głównej rozmowie czeka raport z sekcjami Summary, Issues i Checklist. Żadnych pośrednich kroków, żadnego "czytam plik Header.tsx... czytam plik Footer.tsx...".

---

## Hooki na poziomie skilla

Znasz już hooki z wcześniejszych lekcji kursu -- skrypty, które uruchamiają się automatycznie w reakcji na określone zdarzenia. Hooki na poziomie skilla działają identycznie, ale z jedną różnicą: żyją TYLKO gdy skill jest aktywny.

To oznacza, że możesz podpiąć automatyczną walidację, formatowanie czy blokowanie niebezpiecznych operacji -- ale tylko w kontekście konkretnego skilla. Gdy skill zakończy pracę, hooki znikają.

### Składnia w frontmatterze

```yaml
---
name: my-skill
description: "Example skill with hooks"
hooks:
  PostToolUse:
    - matcher: "Edit|Write"
      hooks:
        - type: command
          command: ".claude/skills/my-skill/scripts/validate.sh"
---
```

**Ważne:** hooki w skillach uruchamiają się z katalogu głównego projektu (project root), NIE z katalogu skilla. Jeśli Twój skrypt leży w `.claude/skills/my-skill/scripts/validate.sh`, musisz podać pełną ścieżkę względem roota projektu — `./scripts/validate.sh` nie zadziała, bo będzie szukał `<project-root>/scripts/validate.sh`.

### Najczęściej używane zdarzenia

**PreToolUse** -- uruchamia się PRZED wykonaniem narzędzia. Możesz zablokować operację (exit code 2 z JSON `{"decision": "deny"}`) lub pozwolić na nią.

**PostToolUse** -- uruchamia się PO wykonaniu narzędzia. Idealny do walidacji wyników, formatowania kodu, uruchamiania linterów.

**Stop** -- uruchamia się gdy Claude kończy pracę w ramach skilla. Możesz użyć go do generowania podsumowania, sprzątania plików tymczasowych lub wysyłania powiadomień.

### Po co hooki w skillach?

Hooki globalne (z pliku `settings.json`) działają zawsze. Hooki w skillach działają tylko wtedy, gdy dany skill jest aktywny. To różnica między:

- "Zawsze uruchamiaj prettier po każdej edycji" (hook globalny)
- "Uruchamiaj lint tylko gdy skill code-review edytuje pliki" (hook w skillu)

Dzięki temu możesz mieć różne reguły dla różnych skilli. Skill do review może odpalać linter. Skill do prezentacji może odpalać walidator struktury. A skill do dokumentacji nie odpala żadnego z nich.

---

## Projekt 1: Hook lint w code-review

Karina chce, żeby po każdej edycji pliku przez skill code-review automatycznie odpalał się linter. Jeśli linter znajdzie błędy -- Claude zobaczy wynik i poprawi kod.

Zaktualizowany frontmatter:

```yaml
---
name: code-review
description: "TypeScript/Next.js code quality reviewer with security checks"
disable-model-invocation: true
argument-hint: "[file-or-directory-path]"
context: fork
agent: general-purpose
hooks:
  PostToolUse:
    - matcher: "Edit|Write"
      hooks:
        - type: command
          command: ".claude/skills/code-review/scripts/run-lint.sh"
---
```

Pamiętaj: ścieżka do skryptu jest względem katalogu głównego projektu, nie katalogu skilla.

Co się dzieje krok po kroku:

1. Karina wpisuje `/code-review src/components/Header.tsx`
2. Claude uruchamia subagenta (bo `context: fork`)
3. Subagent czyta plik, analizuje go, sugeruje poprawki
4. Gdy subagent używa narzędzia Edit lub Write (żeby poprawić plik), hook odpala `run-lint.sh`
5. Jeśli linter znajdzie błędy, wynik wraca do Claude'a i Claude może je naprawić
6. Gotowy raport wraca do głównej konwersacji

Pętla zwrotna: edytuj -> lintuj -> popraw. Automatycznie, bez udziału człowieka.

Skrypt `run-lint.sh` może wyglądać tak. W lekcji 02 stworzyliśmy rozbudowany skrypt lint. Dla hooka wystarczy uproszczona wersja — hook musi być szybki i minimalny:

```bash
#!/usr/bin/env bash
set -euo pipefail

TARGET="${1:-.}"
npx eslint --fix "$TARGET" 2>&1 || true
exit 0
```

Zwróć uwagę na `exit 0` na końcu. Nawet jeśli linter znajdzie błędy, skrypt zwraca kod 0 (sukces). Dlaczego? Bo nie chcesz blokować skilla -- chcesz, żeby Claude zobaczył błędy i je naprawił. Gdyby skrypt zwrócił błąd, skill by się zatrzymał.

---

## Projekt 2: Hook walidacji w create-presentation

Olek dodaje podobny mechanizm do swojego skilla. Po wygenerowaniu prezentacji, skrypt sprawdza, czy struktura jest poprawna: czy jest tytuł, czy są slajdy, czy każdy slajd ma nagłówek.

```yaml
---
name: create-presentation
description: "Generate branded presentations following company storytelling framework"
disable-model-invocation: true
argument-hint: "[topic] [audience] [format]"
hooks:
  PostToolUse:
    - matcher: "Write"
      hooks:
        - type: command
          command: ".claude/skills/create-presentation/scripts/validate-structure.sh"
---
```

Skrypt `validate-structure.sh` sprawdza trzy rzeczy: czy plik ma tytuł (`# nagłówek`), czy ma przynajmniej 3 slajdy (`## nagłówki`), czy zawiera notatki dla prezentera (`Notes:`). Jeśli czegoś brakuje -- wypisuje błędy na stdout. Claude zobaczy te komentarze i poprawi prezentację.

```bash
#!/usr/bin/env bash
set -euo pipefail

FILE="${1:-}"
[ -z "$FILE" ] && exit 0

ERRORS=""

if ! grep -q "^# " "$FILE" 2>/dev/null; then
  ERRORS="$ERRORS\n- Missing presentation title (# heading)"
fi

SLIDE_COUNT=$(grep -c "^## " "$FILE" 2>/dev/null || echo "0")
if [ "$SLIDE_COUNT" -lt 3 ]; then
  ERRORS="$ERRORS\n- Only $SLIDE_COUNT slides found, minimum is 3"
fi

if ! grep -q "Notes:" "$FILE" 2>/dev/null; then
  ERRORS="$ERRORS\n- Missing speaker notes"
fi

if [ -n "$ERRORS" ]; then
  echo -e "Validation failed:$ERRORS"
fi
exit 0
```

Znów `exit 0` -- nie blokujemy skilla, tylko informujemy.

---

## Stan projektów po tej lekcji

Oto co masz po trzech lekcjach. Oba skille ewoluowały z prostych plików SKILL.md w pełne systemy z kontrolą dostępu, zmiennymi i automatyczną walidacją. Struktura katalogów się nie zmieniła -- zmieniła się zawartość frontmattera.

### Projekt 1: code-review -- finalny frontmatter

```yaml
---
name: code-review
description: "TypeScript/Next.js code quality reviewer with security checks"
disable-model-invocation: true
argument-hint: "[file-or-directory-path]"
context: fork
agent: general-purpose
hooks:
  PostToolUse:
    - matcher: "Edit|Write"
      hooks:
        - type: command
          command: ".claude/skills/code-review/scripts/run-lint.sh"
---
```

Co masz: skill wywoływalny tylko ręcznie, przyjmujący ścieżkę jako argument, działający w izolowanym subagencie, z automatycznym lintem po każdej edycji. Treść SKILL.md (sekcje Target, Review Process, Output Format) pozostaje taka, jak pokazaliśmy wcześniej.

### Projekt 2: create-presentation -- finalny frontmatter

```yaml
---
name: create-presentation
description: "Generate branded presentations following company storytelling framework"
disable-model-invocation: true
argument-hint: "[topic] [audience] [format]"
hooks:
  PostToolUse:
    - matcher: "Write"
      hooks:
        - type: command
          command: ".claude/skills/create-presentation/scripts/validate-structure.sh"
---
```

Co masz: skill wywoływalny ręcznie, przyjmujący trzy argumenty (temat, odbiorcy, format), z automatyczną walidacją struktury po każdym zapisie pliku. Treść SKILL.md (sekcje Presentation Brief, Instructions, Output Structure) pozostaje taka, jak pokazaliśmy wcześniej.

---

## Słowniczek

**context: fork**
Flaga w frontmatterze SKILL.md, która sprawia, że skill uruchamia się w izolowanym subagencie. Subagent ma własne okno kontekstowe, nie widzi historii rozmowy, a po zakończeniu pracy zwraca podsumowanie do głównej konwersacji.

**disable-model-invocation**
Flaga frontmattera (wartość: `true`), która blokuje Claude'owi automatyczne uruchamianie skilla. Skill staje się dostępny tylko przez ręczne wpisanie `/nazwa`. Używaj dla operacji z side-effectami.

**user-invocable**
Flaga frontmattera (wartość: `false`), która ukrywa skilla z menu użytkownika `/`. Skill staje się "niewidzialny" -- Claude może go używać w tle jako źródło wiedzy, ale użytkownik nie może go wywołać jawnie.

**subagent (w kontekście skilli)**
Oddzielna instancja Claude'a uruchamiana przez `context: fork`. Działa w izolacji od głównej rozmowy. Ma własne uprawnienia określone przez pole `agent` (general-purpose, Explore, Plan). Po zakończeniu pracy wysyła podsumowanie do głównego wątku.

**hook (w kontekście skilla)**
Skrypt zdefiniowany w frontmatterze SKILL.md, który uruchamia się automatycznie w reakcji na zdarzenia (PreToolUse, PostToolUse, Stop). Żyje TYLKO gdy skill jest aktywny. Różnica względem hooków globalnych: hooki skilla są scopowane do konkretnego skilla.

**side-effect**
Operacja, która zmienia coś poza Twoją lokalną sesją. Wysłanie maila, deploy na serwer, stworzenie ticketa w Jira, zapis do bazy danych. Dla takich operacji skille powinny mieć `disable-model-invocation: true`, żeby Claude nie odpalał ich przypadkowo. Jeśli side-effect jest tani i odwracalny (np. utworzenie issue), możesz zostawić automatyczne wywoływanie, ale dodaj guardraile (np. tylko CRITICAL, limit liczby akcji, jasne warunki w SKILL.md).

---

## Dokumentacja

Oficjalna dokumentacja omawianych tematów:

- [Skills -- frontmatter reference](https://code.claude.com/docs/en/skills) -- pełna lista pól frontmattera, w tym `disable-model-invocation`, `user-invocable`, `context`, `agent`, `hooks`
- [Slash commands -- arguments](https://code.claude.com/docs/en/slash-commands) -- szczegóły o `$ARGUMENTS`, `$0`, `$1` i `${CLAUDE_SESSION_ID}`
- [Hooks](https://code.claude.com/docs/en/hooks) -- pełna dokumentacja hooków, w tym PreToolUse, PostToolUse, Stop

---

## Podsumowanie

W tej lekcji nauczyłeś się trzech rzeczy:

Kontrola dostępu -- `disable-model-invocation: true` blokuje automatyczne odpalanie, `user-invocable: false` ukrywa skilla przed użytkownikiem. Dwie flagi, trzy konfiguracje.

Zmienne -- `$ARGUMENTS` daje Ci cały tekst po nazwie skilla, `$0`, `$1`, `$2` dają poszczególne argumenty, `${CLAUDE_SESSION_ID}` daje ID sesji. Dzięki nim skill nie musi pytać o dane -- dostajesz je od razu.

Izolacja i hooki -- `context: fork` uruchamia skilla w subagencie, `hooks` pozwalają podpiąć automatyczne skrypty do zdarzeń. Połączenie obu daje Ci skilla, który pracuje w tle i sam się waliduje.

W następnej lekcji połączymy skille z serwerami MCP i nauczymy się budować pętlę zwrotną: generuj, waliduj, popraw, powtórz.

---

## Pytania kontrolne

1. Jaką flagę dodasz do frontmattera skilla, który deployuje aplikację na produkcję?
   - Wskazówka: chcesz, żeby tylko człowiek mógł go uruchomić.

2. Czym różni się `$ARGUMENTS` od `$0`?
   - Wskazówka: pomyśl o komendzie z trzema argumentami.

3. Kiedy NIE powinieneś używać `context: fork`?
   - Wskazówka: pomyśl o skillach, które potrzebują wiedzy z bieżącej rozmowy.

---

## Zadanie praktyczne

Weź jeden ze swoich projektów (lub stwórz nowy) i:

1. Stwórz skill z `disable-model-invocation: true`, który przyjmuje argument przez `$ARGUMENTS`
2. Dodaj `argument-hint` w frontmatterze, żeby użytkownik widział podpowiedź
3. Dodaj `context: fork` z `agent: Explore` (tryb tylko-do-odczytu)
4. Dodaj hook PostToolUse, który uruchamia dowolny skrypt po użyciu narzędzia Read

Przetestuj: wpisz `/nazwa-skilla jakiś-argument` i sprawdź, czy:
- Skill uruchamia się w subagencie
- Argument jest poprawnie przekazany
- Hook odpala się po każdym odczycie pliku

---

**W następnej lekcji:** Skille spotykają MCP i feedback loops. Nauczysz się łączyć skille z serwerami MCP, budować pętlę: generuj -> waliduj -> popraw -> powtórz, i tworzyć skille, które uczą się na własnych błędach.

Do zobaczenia w lekcji 04!
