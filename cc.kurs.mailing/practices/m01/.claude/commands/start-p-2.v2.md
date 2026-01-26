# Lekcja P.2: Fundament projektu

<read-protocol>
Przed rozpoczęciem lekcji przeczytaj @.claude/commands/lesson-protocol.md i stosuj się do zawartych tam zasad.
</read-protocol>

<lesson-intro>
## Witaj ponownie!

**Cel lekcji:** Stworzysz plik CLAUDE.md oraz plan działania. Nauczysz się używać `/init`, `/memory` i Plan Mode.

**Czas:** ~25 minut

**Co masz z poprzedniej lekcji:** Powinieneś mieć plik `output/ANALIZA-PODSUMOWANIE.md` z kluczowymi wnioskami. Jeśli nie masz - wpisz `/start-p-1.v2` i dokończ analizę.

**Jak to działa:**
- Dostaniesz zadanie do wykonania
- Masz trzy opcje w każdym kroku (własny prompt, własny prompt + ocena, hint)
- Uczysz się przez robienie, nie przez kopiowanie

Gotowy? Daj mi znać, a zaczniemy od wyboru wariantu projektu.
</lesson-intro>

<wait-for-user/>

<step n="1" title="Wybór wariantu">
  <display>
## Krok 1: Wybór wariantu projektu

Ten mini-kurs oferuje dwa warianty. Wybierz ten, który Ci bardziej odpowiada:

**WARIANT A: Programistyczny**
- Zbudujesz narzędzie CLI do analizy rejestracji i generowania raportów
- Dla osób z podstawową znajomością programowania
- Wynik: działający skrypt

**WARIANT B: Biurowy**
- Stworzysz pakiet komunikacyjny - maile, FAQ, brief dla wolontariuszy
- Dla osób nietechnicznych
- Wynik: gotowe dokumenty

**Zadanie:** Napisz mi, który wariant wybierasz i krótko dlaczego.

**Twoje opcje:**
- A albo B
  </display>

  <hint>
Wybieram WARIANT A - programistyczny. Będę budować narzędzie CLI.
// lub
Wybieram WARIANT B - biurowy. Będę tworzyć pakiet komunikacyjny.
  </hint>

  <tip>
Wybierz wariant zgodny z Twoim doświadczeniem - oba uczą tych samych umiejętności Claude Code.
  </tip>

  <wait-for-user/>

  <after-user-input>
STOSUJ zasady z lesson-protocol.md.

ZAPAMIĘTAJ wybrany wariant (A lub B) na potrzeby dalszych kroków.
ZAPISZ wybór do pliku output/wariant.txt (zawartość: "A" lub "B").

Po wyborze przejdź do kroku 2.
  </after-user-input>
</step>

<step n="2" title="Inicjalizacja projektu">
  <display>
## Krok 2: Inicjalizacja projektu

Komenda `/init` to szybki sposób na stworzenie podstawowego pliku CLAUDE.md dla projektu.

**Zadanie:** Użyj komendy `/init` aby zainicjalizować projekt.

**Twoje opcje:**
- Wpisz własny prompt → wykonam go
- Wpisz własny prompt + "oceń" → ocenię przed wykonaniem
- Wpisz `hint` → pokażę gotowy prompt
  </display>

  <hint>
/init
  </hint>

  <tip>
Komenda /init analizuje strukturę projektu i tworzy początkowy CLAUDE.md.
  </tip>

  <wait-for-user/>

  <after-user-input>
STOSUJ zasady z lesson-protocol.md.

Jeśli /init nie jest dostępny w tym środowisku - zaproponuj stworzenie CLAUDE.md ręcznie.

Po wykonaniu przejdź do kroku 3.
  </after-user-input>
</step>

<step n="3" title="Rozbudowa CLAUDE.md">
  <display>
## Krok 3: Rozbudowa CLAUDE.md

Podstawowy CLAUDE.md to za mało. Rozbudujmy go o kontekst projektu TechStart.

**Zadanie:** Napisz prompt, który rozbuduje CLAUDE.md o:
- Opis projektu (zgodny z Twoim wariantem)
- Cel/materiały do stworzenia
- Kontekst wydarzenia (z pliku `kontekst/BRIEF-WYDARZENIA.md`)
- Ton komunikacji (z pliku `kontekst/BRAND-VOICE.md`)

**Twoje opcje:**
- Wpisz własny prompt → wykonam go
- Wpisz własny prompt + "oceń" → ocenię przed wykonaniem
- Wpisz `hint` → pokażę gotowy prompt
  </display>

  <hint>
// Dla WARIANTU A:
Rozbuduj CLAUDE.md o następujące sekcje:

## Projekt
Narzędzie CLI do analizy rejestracji na Dzień Otwarty TechStart.

## Dane wejściowe
- @odziedziczony-chaos/rejestracje/uczestnicy.csv

## Cel narzędzia
1. Analiza demografii uczestników
2. Generowanie statystyk
3. Eksport raportu

## Kontekst wydarzenia
Przeczytaj @kontekst/BRIEF-WYDARZENIA.md i dodaj kluczowe informacje.

// Dla WARIANTU B:
Rozbuduj CLAUDE.md o następujące sekcje:

## Projekt
Pakiet komunikacyjny na Dzień Otwarty TechStart.

## Materiały do stworzenia
1. Email przypominający (T-7 dni)
2. FAQ dla uczestników
3. Brief dla wolontariuszy

## Ton komunikacji
Przeczytaj @kontekst/BRAND-VOICE.md i dodaj kluczowe zasady.

## Kontekst wydarzenia
Przeczytaj @kontekst/BRIEF-WYDARZENIA.md i dodaj kluczowe informacje.
  </hint>

  <tip>
Użyj @ do wskazania plików z kontekstem - Claude przeczyta je i wykorzysta informacje.
  </tip>

  <wait-for-user/>

  <after-user-input>
STOSUJ zasady z lesson-protocol.md.

Dostosuj hint do wybranego wariantu użytkownika.

Po wykonaniu przejdź do kroku 4.
  </after-user-input>
</step>

<step n="4" title="Plan Mode">
  <display>
## Krok 4: Plan Mode - Shift+Tab

Teraz nauczysz się używać Plan Mode do planowania bez natychmiastowej implementacji.

**Skrót:** `Shift+Tab` przełącza między Normal Mode na Plan Mode.

**Zadanie:**
1. Naciśnij `Shift+Tab` (powinieneś zobaczyć zmianę w interfejsie - wskaźnik "Plan")
2. Napisz prompt, który zaplanuje Twój projekt - strukturę, funkcje/dokumenty, kolejność działań

**Twoje opcje:**
- Wpisz własny prompt → wykonam go
- Wpisz własny prompt + "oceń" → ocenię przed wykonaniem
- Wpisz `hint` → pokażę gotowy prompt
  </display>

  <hint>
// Dla WARIANTU A:
Zaplanuj narzędzie CLI do analizy CSV z rejestracjami.
Co powinno robić? Jakie funkcje? Jaka struktura?

// Dla WARIANTU B:
Zaplanuj pakiet komunikacyjny.
Jakie dokumenty stworzyć? W jakiej kolejności? Co w każdym?
  </hint>

  <tip>
W Plan Mode Claude TYLKO planuje - nie tworzy plików, nie pisze kodu. To idealne do przemyślenia struktury przed działaniem.
  </tip>

  <wait-for-user/>

  <after-user-input>
STOSUJ zasady z lesson-protocol.md.

Jeśli Shift+Tab nie działa - zasymuluj planowanie przez prompt "Zaplanuj (nie implementuj jeszcze)..."

Po wykonaniu przejdź do kroku 5.
  </after-user-input>
</step>

<step n="5" title="Zapisanie w pamięci">
  <display>
## Krok 5: Zapisz plan w pamięci

Komenda `/memory` pozwala zapisać ważne informacje, które Claude będzie pamiętał między sesjami.

**Zadanie:**
1. Wyjdź z Plan Mode (jeśli jesteś) - naciśnij `Shift+Tab`
2. Użyj `/memory` aby zapisać swój wybór wariantu i streszczenie planu

**Twoje opcje:**
- Wpisz własny prompt → wykonam go
- Wpisz własny prompt + "oceń" → ocenię przed wykonaniem
- Wpisz `hint` → pokażę gotowy prompt
  </display>

  <hint>
/memory
// Gdy Claude zapyta co zapisać:
Zapisz: Wybrałem wariant [A/B]. Mój plan to: [streszczenie planu z poprzedniego kroku]
  </hint>

  <tip>
Pamięć projektu jest przechowywana w pliku .claude/memory - możesz ją edytować też ręcznie.
  </tip>

  <wait-for-user/>

  <after-user-input>
STOSUJ zasady z lesson-protocol.md.

Po wykonaniu przejdź do kroku 6.
  </after-user-input>
</step>

<step n="6" title="Finalizacja CLAUDE.md">
  <display>
## Krok 6: Finalizacja CLAUDE.md

Ostatni krok - dodaj plan implementacji do dokumentacji projektu.

**Zadanie:** Napisz prompt, który doda sekcję "## Plan implementacji" do CLAUDE.md z planem, który opracowaliście, i pokaże finalny plik.

**Twoje opcje:**
- Wpisz własny prompt → wykonam go
- Wpisz własny prompt + "oceń" → ocenię przed wykonaniem
- Wpisz `hint` → pokażę gotowy prompt
  </display>

  <hint>
Dodaj do CLAUDE.md sekcję "## Plan implementacji" z planem, który przed chwilą opracowaliśmy.
Pokaż mi finalny CLAUDE.md.
  </hint>

  <tip>
Dobry CLAUDE.md to kompletna "instrukcja obsługi" projektu dla Claude'a.
  </tip>

  <wait-for-user/>

  <after-user-input>
STOSUJ zasady z lesson-protocol.md.

Po wykonaniu przejdź do podsumowania lekcji.
  </after-user-input>
</step>

<lesson-summary>
## Podsumowanie lekcji P.2

**Umiejętności, które przećwiczyłeś:**
- `/init` - inicjalizacja projektu (tworzenie CLAUDE.md)
- `/memory` - zapisywanie informacji między sesjami
- `Shift+Tab` - przełączanie Plan Mode
- Rozbudowa CLAUDE.md o kontekst projektu
- Referencje do wielu plików w jednym prompcie

**Kluczowe wnioski:**
1. CLAUDE.md to Twoja "instrukcja obsługi" projektu dla Claude'a
2. Plan Mode pozwala przemyśleć strukturę przed implementacją
3. `/memory` przechowuje ważne decyzje między sesjami
4. Im lepiej opisany kontekst, tym lepsze wyniki

**Twój output:** Rozbudowany CLAUDE.md z planem implementacji.
</lesson-summary>

<next-lesson>
## Następna lekcja

W **Lekcji P.3: W akcji** zbudujesz główny output projektu - narzędzie CLI lub pakiet komunikacyjny.

**Aby rozpocząć:** wpisz `/start-p-3.v2`

---

*Pamiętaj: możesz wrócić do tej lekcji w dowolnym momencie wpisując `/start-p-2.v2`*
</next-lesson>
