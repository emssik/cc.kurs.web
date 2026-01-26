# Lekcja P.1: Dziedzictwo chaosu

<read-protocol>
Przed rozpoczęciem lekcji przeczytaj @.claude/commands/lesson-protocol.md i stosuj się do zawartych tam zasad.
</read-protocol>

<lesson-intro>
## Witaj w pierwszej praktycznej lekcji!

Zanim zaczniemy - jak masz na imię?
</lesson-intro>

<wait-for-user/>

<after-intro>
WYKRYJ PŁEĆ na podstawie imienia użytkownika:
- Imiona kończące się na -a (Ania, Kasia, Marta) → kobieta (K)
- Pozostałe (Tomek, Michał, Piotr) → mężczyzna (M)
- Jeśli niepewne → zapytaj

ZAPISZ do pliku output/user.txt w formacie:
imie: [imię]
plec: [K/M]

WYŚWIETL spersonalizowane intro (użyj imienia i odpowiednich form gramatycznych):

## Cześć, [imię]!

**Cel lekcji:** Przeanalizujesz odziedziczone materiały i zrozumiesz, co masz do dyspozycji. Nauczysz się używać referencji do plików (@) oraz delegować zadania Claude'owi.

**Czas:** ~20 minut

**Twoja sytuacja:** Właśnie przejąłeś rolę koordynatora Dnia Otwartego TechStart. Poprzedni koordynator (Paweł) odszedł tydzień temu i pozostawił po sobie... chaos. Masz 2 tygodnie do wydarzenia.

**Jak to działa:**
- Dostaniesz zadanie do wykonania
- Masz trzy opcje w każdym kroku (własny prompt, własny prompt + ocena, hint)
- Uczysz się przez robienie, nie przez kopiowanie

Gotowy? Daj mi znać, a zaczniemy od pierwszego kroku.

Po odpowiedzi użytkownika przejdź do kroku 1.
</after-intro>

<wait-for-user/>

<step n="1" title="Poznaj kontekst">
  <display>
## Krok 1: Poznaj kontekst

**Zadanie:** Zapoznaj się ze scenariuszem swojej sytuacji. Plik `kontekst/SCENARIUSZ.md` zawiera pełny opis tego, co się dzieje w TechStart.

Napisz prompt, który:
- Przeczyta ten plik
- Da Ci zwięzłe podsumowanie sytuacji

**Twoje opcje:**
- Wpisz własny prompt → wykonam go
- Wpisz własny prompt + "oceń" → ocenię przed wykonaniem
- Wpisz `hint` → pokażę gotowy prompt
  </display>

  <hint>
Przeczytaj @kontekst/SCENARIUSZ.md i streść mi moją sytuację w 3-4 zdaniach.
  </hint>

  <tip>
Symbol `@` pozwala na odwołanie się do konkretnego pliku.
  </tip>

  <wait-for-user/>

  <after-user-input>
STOSUJ zasady z lesson-protocol.md dla opcji hint/własny prompt/własny prompt + oceń.

Po wykonaniu zadania przejdź do kroku 2.
  </after-user-input>
</step>

<step n="2" title="Eksploracja chaosu">
  <display>
## Krok 2: Eksploracja chaosu

**Zadanie:** Sprawdź co znajduje się w folderze `odziedziczony-chaos/`. To wszystko, co zostało po poprzednim koordynatorze.

Napisz prompt, który pokaże Ci strukturę tego folderu - wszystkie pliki i podfoldery.

**Twoje opcje:**
- Wpisz własny prompt → wykonam go
- Wpisz własny prompt + "oceń" → ocenię przed wykonaniem
- Wpisz `hint` → pokażę gotowy prompt
  </display>

  <hint>
Pokaż mi strukturę folderu @odziedziczony-chaos/ - co tam jest? Wymień wszystkie pliki i foldery.
  </hint>

  <tip>
Możesz odwoływać się też do folderów, nie tylko do pojedynczych plików.
  </tip>

  <wait-for-user/>

  <after-user-input>
STOSUJ zasady z lesson-protocol.md.

Po wykonaniu przejdź do kroku 3.
  </after-user-input>
</step>

<step n="3" title="Delegowanie analizy">
  <display>
## Krok 3: Delegowanie analizy

**Zadanie:** Teraz kluczowa umiejętność - **delegowanie złożonych zadań**.

Zamiast czytać każdy plik ręcznie, poproś o kompleksową analizę CAŁEGO folderu `odziedziczony-chaos/`.

Napisz prompt, który:
- Przeanalizuje wszystkie pliki i podfoldery
- Da Ci raport: co jest użyteczne, co wymaga poprawy, czego brakuje
- Znajdzie wzorce w feedbacku z poprzednich wydarzeń

**Twoje opcje:**
- Wpisz własny prompt → wykonam go
- Wpisz własny prompt + "oceń" → ocenię przed wykonaniem
- Wpisz `hint` → pokażę gotowy prompt
  </display>

  <hint>
Przeanalizuj CAŁY folder @odziedziczony-chaos/ - wszystkie pliki i podfoldery.
Daj mi raport:
1. Co jest użyteczne i można wykorzystać?
2. Co wymaga poprawy lub uzupełnienia?
3. Czego kompletnie brakuje?
4. Jakie wzorce widzisz w feedbacku z poprzednich wydarzeń?
  </hint>

  <tip>
Im bardziej szczegółowo opiszesz czego oczekujesz, tym lepszy raport dostaniesz.
  </tip>

  <wait-for-user/>

  <after-user-input>
To kluczowy moment lekcji - delegowanie analizy.

STOSUJ zasady z lesson-protocol.md.

Po wykonaniu przejdź do kroku 4.
  </after-user-input>
</step>

<step n="4" title="Łączenie źródeł">
  <display>
## Krok 4: Łączenie źródeł

**Zadanie:** Masz też oficjalne materiały TechStart - brief wydarzenia i wytyczne komunikacji.

Napisz prompt, który:
- Przeczyta `kontekst/BRIEF-WYDARZENIA.md` i `kontekst/BRAND-VOICE.md`
- Połączy te informacje z wcześniejszą analizą chaosu
- Określi co jest gotowe, co jest priorytetem, i jakiego tonu używać

**Twoje opcje:**
- Wpisz własny prompt → wykonam go
- Wpisz własny prompt + "oceń" → ocenię przed wykonaniem
- Wpisz `hint` → pokażę gotowy prompt
  </display>

  <hint>
Przeczytaj @kontekst/BRIEF-WYDARZENIA.md i @kontekst/BRAND-VOICE.md.
Na podstawie tych dokumentów oraz wcześniejszej analizy chaosu, powiedz mi:
- Co już jest gotowe na wydarzenie?
- Co MUSI być zrobione jako priorytet?
- Jakiego tonu komunikacji mam używać?
  </hint>

  <tip>
Możesz łączyć wiele referencji @ w jednym prompcie. Możesz też odwoływać się do wcześniejszej rozmowy.
  </tip>

  <wait-for-user/>

  <after-user-input>
STOSUJ zasady z lesson-protocol.md.

Po wykonaniu przejdź do kroku 5.
  </after-user-input>
</step>

<step n="5" title="Podsumowanie analizy">
  <display>
## Krok 5: Podsumowanie analizy

**Zadanie:** Ostatni krok - stwórz dokument podsumowujący całą analizę.

Napisz prompt, który:
- Stworzy jednostronicowe podsumowanie (STATUS, PRIORYTETY, RYZYKA, NASTĘPNY KROK)
- Zapisze je do pliku `output/ANALIZA-PODSUMOWANIE.md`

**Twoje opcje:**
- Wpisz własny prompt → wykonam go
- Wpisz własny prompt + "oceń" → ocenię przed wykonaniem
- Wpisz `hint` → pokażę gotowy prompt
  </display>

  <hint>
Zrób mi jednostronicowe podsumowanie całej analizy:
- STATUS: co mamy gotowe
- PRIORYTETY: 3 najważniejsze rzeczy do zrobienia
- RYZYKA: na co uważać
- NASTĘPNY KROK: co robimy w lekcji P.2

Zapisz to w pliku output/ANALIZA-PODSUMOWANIE.md
  </hint>

  <tip>
Claude może zapisywać pliki. Używaj tego do dokumentowania ważnych wyników.
  </tip>

  <wait-for-user/>

  <after-user-input>
STOSUJ zasady z lesson-protocol.md.

Po wykonaniu przejdź do podsumowania lekcji.
  </after-user-input>
</step>

<lesson-summary>
## Podsumowanie lekcji P.1

**Umiejętności, które przećwiczyłeś:**
- Referencje do plików (`@plik.md`)
- Referencje do folderów (`@folder/`)
- Delegowanie złożonych zadań analizy
- Łączenie informacji z wielu źródeł
- Zapisywanie wyników do plików

**Kluczowe wnioski:**
1. Nie musisz czytać wszystkiego sam - deleguj analizę
2. Symbol `@` wskazuje kontekst - pliki i foldery
3. Im precyzyjniej opiszesz zadanie, tym lepszy wynik dostaniesz
4. Możesz łączyć wiele źródeł w jednym prompcie

**Twój output:** Plik `output/ANALIZA-PODSUMOWANIE.md` z mapą dalszych działań.
</lesson-summary>

<next-lesson>
## Następna lekcja

W **Lekcji P.2: Fundament projektu** stworzysz plik CLAUDE.md dla projektu TechStart i plan działania.

**Aby rozpocząć:** wpisz `/start-p-2.v2`

---

*Pamiętaj: możesz wrócić do tej lekcji w dowolnym momencie wpisując `/start-p-1.v2`*
</next-lesson>
