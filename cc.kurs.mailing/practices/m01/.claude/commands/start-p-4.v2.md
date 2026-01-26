# Lekcja P.4: Review i launch

<read-protocol>
Przed rozpoczęciem lekcji przeczytaj @.claude/commands/lesson-protocol.md i stosuj się do zawartych tam zasad.
</read-protocol>

<lesson-context>
WARIANT:
- PRZECZYTAJ plik output/wariant.txt żeby poznać wybrany wariant (A lub B)
- Jeśli plik nie istnieje - zapytaj użytkownika jaki wariant wybrał

KONSULTACJE Z ZESPOŁEM:
W tej lekcji użytkownik będzie konsultować materiały z trzema "osobami" z zespołu TechStart:
- Marta Kowalska (CEO) - perspektywa strategiczna
- Tomek Nowak (koordynator wolontariuszy) - perspektywa operacyjna
- Ania (uczestniczka) - perspektywa odbiorcy

Gdy użytkownik poprosi o feedback od danej osoby, WCIEL SIĘ w tę postać i daj szczery, konstruktywny feedback.
</lesson-context>

<lesson-intro>
## Ostatnia prosta - review i launch!

**Cel lekcji:** Przeprowadzisz konsultacje z trzema perspektywami (dyrektor, koordynator, uczestnik), wprowadzisz poprawki i sfinalizujesz projekt.

**Czas:** ~25 minut

**Co powinieneś mieć:**
- Gotowy output z lekcji P.3 (narzędzie CLI lub pakiet komunikacyjny)
- CLAUDE.md z dokumentacją projektu

**Jak to działa:**
- Dostaniesz zadanie do wykonania
- Masz trzy opcje w każdym kroku (własny prompt, własny prompt + ocena, hint)
- Uczysz się przez robienie, nie przez kopiowanie

Gotowy na finał? Daj mi znać, a zaczniemy od checkpointu.
</lesson-intro>

<wait-for-user/>

<step n="1" title="Checkpoint przed review">
  <display>
## Krok 1: Checkpoint przed review

Zanim zaczniesz zbierać feedback, warto zapisać obecny stan projektu. To pozwoli Ci wrócić, jeśli coś pójdzie nie tak.

Komenda `/rename` pozwala nadać sesji czytelną nazwę, a `/resume` wrócić do zapisanej sesji.

**Zadanie:** Użyj `/rename` aby nazwać sesję np. "TechStart-przed-review"

**Twoje opcje:**
- Wpisz własny prompt → wykonam go
- Wpisz własny prompt + "oceń" → ocenię przed wykonaniem
- Wpisz `hint` → pokażę gotowy prompt
  </display>

  <hint>
/rename
// Gdy Claude zapyta o nazwę:
TechStart-przed-review
  </hint>

  <tip>
Checkpointy to dobra praktyka przed większymi zmianami - zawsze możesz wrócić przez /resume.
  </tip>

  <wait-for-user/>

  <after-user-input>
STOSUJ zasady z lesson-protocol.md.

Po wykonaniu przejdź do kroku 2.
  </after-user-input>
</step>

<step n="2" title="Konsultacja z CEO">
  <display>
## Krok 2: Konsultacja z dyrektorką (Marta)

**Marta Kowalska** to CEO TechStart. Myśli strategicznie, zależy jej na wizerunku organizacji i zgodności z misją.

**Zadanie:** Napisz prompt, który poprosi Martę o feedback na Twoje materiały. Określ z jakiej perspektywy ma je ocenić.

**Twoje opcje:**
- Wpisz własny prompt → wykonam go
- Wpisz własny prompt + "oceń" → ocenię przed wykonaniem
- Wpisz `hint` → pokażę gotowy prompt
  </display>

  <hint>
Wciel się w rolę Marty Kowalskiej - dyrektorki TechStart.
Przeczytaj wszystkie materiały które stworzyłem.
Daj mi feedback z perspektywy CEO:
- Czy materiały budują profesjonalny wizerunek?
- Czy są zgodne z misją TechStart?
- Co byś zmieniła?
- Co Ci się podoba?

Bądź szczera i konkretna.
  </hint>

  <tip>
Dobry prompt do konsultacji określa: (1) kto ma oceniać, (2) co ma oceniać, (3) z jakiej perspektywy, (4) jakie aspekty są ważne.
  </tip>

  <wait-for-user/>

  <after-user-input>
STOSUJ zasady z lesson-protocol.md.

Gdy wykonujesz zadanie - WCIEL SIĘ w Martę i daj szczery feedback strategiczny.

Po wykonaniu przejdź do kroku 3.
  </after-user-input>
</step>

<step n="3" title="Konsultacja z koordynatorem">
  <display>
## Krok 3: Konsultacja z koordynatorem (Tomek)

**Tomek Nowak** koordynuje wolontariuszy. Jest praktykiem - zna teren, realia i wie co może pójść nie tak.

**Zadanie:** Napisz prompt, który poprosi Tomka o feedback. Skup się na praktycznych aspektach wdrożenia.

**Twoje opcje:**
- Wpisz własny prompt → wykonam go
- Wpisz własny prompt + "oceń" → ocenię przed wykonaniem
- Wpisz `hint` → pokażę gotowy prompt
  </display>

  <hint>
Teraz wciel się w Tomka Nowaka - koordynatora wolontariuszy.
Przejrzyj materiały z perspektywy osoby, która musi to wdrożyć w praktyce:
- Czy instrukcje są jasne?
- Czy niczego nie brakuje dla wolontariuszy?
- Czy harmonogram jest realistyczny?
- Jakie problemy mogą się pojawić?

Daj mi 3-5 konkretnych uwag.
  </hint>

  <tip>
Perspektywa operacyjna często wyłapuje problemy, które umykają z poziomu strategicznego.
  </tip>

  <wait-for-user/>

  <after-user-input>
STOSUJ zasady z lesson-protocol.md.

Gdy wykonujesz zadanie - WCIEL SIĘ w Tomka i daj praktyczny feedback operacyjny.

Po wykonaniu przejdź do kroku 4.
  </after-user-input>
</step>

<step n="4" title="Konsultacja z uczestniczką">
  <display>
## Krok 4: Konsultacja z uczestniczką (Ania)

**Ania** to typowa uczestniczka - 28 lat, marketingowiec, pierwszy raz na wydarzeniu TechStart. Nie jest techniczna i nie zna organizacji.

**Zadanie:** Napisz prompt, który poprosi Anię o feedback na materiały komunikacyjne (email, FAQ). Skup się na perspektywie odbiorcy.

**Twoje opcje:**
- Wpisz własny prompt → wykonam go
- Wpisz własny prompt + "oceń" → ocenię przed wykonaniem
- Wpisz `hint` → pokażę gotowy prompt
  </display>

  <hint>
Na koniec wciel się w Anię - potencjalną uczestniczkę wydarzenia.
Przeczytaj materiały komunikacyjne (email, FAQ) jej oczami:
- Czy wszystko jest zrozumiałe?
- Czy czuję się zaproszona i mile widziana?
- Czy mam wszystkie informacje żeby przyjść?
- Czego by mi brakowało?

Bądź szczera - Ania nie jest techniczna i nie zna TechStart.
  </hint>

  <tip>
Perspektywa końcowego odbiorcy jest kluczowa - to dla niego tworzysz materiały.
  </tip>

  <wait-for-user/>

  <after-user-input>
STOSUJ zasady z lesson-protocol.md.

Gdy wykonujesz zadanie - WCIEL SIĘ w Anię i daj szczery feedback odbiorcy.

Po wykonaniu przejdź do kroku 5.
  </after-user-input>
</step>

<step n="5" title="Wprowadzanie poprawek">
  <display>
## Krok 5: Wprowadzanie poprawek

Masz feedback od trzech perspektyw. Czas wprowadzić najważniejsze poprawki.

**Zadanie:** Napisz prompt, który:
- Przeanalizuje feedback od Marty, Tomka i Ani
- Wprowadzi najważniejsze poprawki (priorytetyzując te powtarzające się)
- Wyjaśni co zostało zmienione i dlaczego

**Twoje opcje:**
- Wpisz własny prompt → wykonam go
- Wpisz własny prompt + "oceń" → ocenię przed wykonaniem
- Wpisz `hint` → pokażę gotowy prompt
  </display>

  <hint>
Na podstawie feedbacku od Marty, Tomka i Ani, wprowadź najważniejsze poprawki.
Skup się na:
1. Uwagach które powtórzyły się u więcej niż jednej osoby
2. Problemach które mogą uniemożliwić osiągnięcie celu
3. Szybkich wygranach (łatwe do naprawienia)

Po każdej poprawce powiedz mi co zmieniłeś i dlaczego.
  </hint>

  <tip>
Nie wszystkie uwagi trzeba wdrażać - priorytetyzuj te, które mają największy wpływ.
  </tip>

  <wait-for-user/>

  <after-user-input>
STOSUJ zasady z lesson-protocol.md.

Po wykonaniu przejdź do kroku 6.
  </after-user-input>
</step>

<step n="6" title="Finalny przegląd">
  <display>
## Krok 6: Finalny przegląd

Czas na ostateczną weryfikację gotowości projektu.

**Zadanie:** Napisz prompt, który zrobi finalną checklistę:
- Wszystkie zaplanowane materiały są gotowe
- Materiały są spójne między sobą
- Feedback od zespołu został uwzględniony
- Nie ma błędów ani brakujących informacji
- CLAUDE.md jest aktualny

**Twoje opcje:**
- Wpisz własny prompt → wykonam go
- Wpisz własny prompt + "oceń" → ocenię przed wykonaniem
- Wpisz `hint` → pokażę gotowy prompt
  </display>

  <hint>
Zrób finalną checklistę:
[ ] Wszystkie zaplanowane materiały są gotowe
[ ] Materiały są spójne między sobą
[ ] Feedback od zespołu został uwzględniony
[ ] Nie ma błędów ani brakujących informacji
[ ] CLAUDE.md jest aktualny

Dla każdego punktu powiedz czy OK czy wymaga uwagi.
  </hint>

  <tip>
Checklista przed "launch" to dobra praktyka - minimalizuje ryzyko przeoczenia czegoś ważnego.
  </tip>

  <wait-for-user/>

  <after-user-input>
STOSUJ zasady z lesson-protocol.md.

Po wykonaniu przejdź do kroku 7.
  </after-user-input>
</step>

<step n="7" title="Eksport i archiwizacja">
  <display>
## Krok 7: Eksport i archiwizacja

Zapisz finalną wersję projektu.

**Zadanie:**
1. Użyj `/export` aby wyeksportować materiały (opcjonalnie)
2. Użyj `/rename` aby nadać sesji finalną nazwę np. "TechStart-FINAL-gotowe"

**Twoje opcje:**
- Wpisz własny prompt → wykonam go
- Wpisz własny prompt + "oceń" → ocenię przed wykonaniem
- Wpisz `hint` → pokażę gotowy prompt
  </display>

  <hint>
/export
// Wybierz format i lokalizację

/rename
// Wpisz:
TechStart-FINAL-gotowe
  </hint>

  <tip>
Finalna archiwizacja pozwala łatwo wrócić do projektu w przyszłości.
  </tip>

  <wait-for-user/>

  <after-user-input>
STOSUJ zasady z lesson-protocol.md.

Po wykonaniu przejdź do kroku 8.
  </after-user-input>
</step>

<step n="8" title="Refleksja">
  <display>
## Krok 8: Refleksja końcowa

Ostatni krok - podsumowanie całego projektu i nauki.

**Zadanie:** Napisz prompt, który podsumuje:
1. Co udało się osiągnąć?
2. Jakie materiały powstały?
3. Czego się nauczyłeś o pracy z Claude Code?
4. Co zrobiłbyś inaczej następnym razem?

**Twoje opcje:**
- Wpisz własny prompt → wykonam go
- Wpisz własny prompt + "oceń" → ocenię przed wykonaniem
- Wpisz `hint` → pokażę gotowy prompt
  </display>

  <hint>
Podsumuj cały projekt TechStart:
1. Co udało się osiągnąć?
2. Jakie materiały powstały?
3. Czego się nauczyłem o pracy z Claude Code?
4. Co zrobiłbym inaczej następnym razem?

To jest moje podsumowanie na zakończenie mini-kursu.
  </hint>

  <tip>
Refleksja po projekcie pomaga utrwalić naukę i zidentyfikować obszary do rozwoju.
  </tip>

  <wait-for-user/>

  <after-user-input>
STOSUJ zasady z lesson-protocol.md.

Po wykonaniu przejdź do gratulacji i podsumowania lekcji.
  </after-user-input>
</step>

<lesson-summary>
## GRATULACJE!

Ukończyłeś mini-kurs praktyczny TechStart!

**Umiejętności, które przećwiczyłeś w tej lekcji:**
- `/rename` - checkpointy projektu
- `/export` - eksport materiałów
- `/resume` - powrót do zapisanej sesji
- Konsultacje z różnymi perspektywami (roleplay)
- Priorytetyzacja i wdrażanie feedbacku
- Iteracja i finalizacja projektu

**Co osiągnąłeś w całym mini-kursie:**

*Wariant A (programistyczny):*
- Narzędzie CLI do analizy rejestracji
- Raporty i statystyki
- Dokumentacja

*Wariant B (biurowy):*
- Email przypominający
- FAQ dla uczestników
- Brief dla wolontariuszy

**Wszystkie umiejętności Claude Code z Modułu 1:**

- Referencje `@` do plików i folderów (P.1)
- Delegowanie analizy (P.1)
- `/init` - inicjalizacja projektu (P.2)
- `/memory` - pamięć projektu (P.2)
- Plan Mode - `Shift+Tab` (P.2)
- CLAUDE.md - dokumentacja projektu (P.2)
- Normal Mode - aktywne budowanie (P.3)
- Auto-Accept - `/auto-accept on/off` (P.3)
- Tryb w tle - `Ctrl+B` (P.3)
- `/rename` i `/resume` - checkpointy (P.4)
- `/export` - eksport materiałów (P.4)
- Konsultacje i iteracja z feedbackiem (P.4)
</lesson-summary>

<next-lesson>
## Co dalej?

1. **Eksperymentuj** - użyj tych technik w swoich projektach
2. **Wracaj do lekcji** - `/start-p-1.v2` do `/start-p-4.v2`
3. **Czytaj dokumentację** - https://code.claude.com/docs/en/
4. **Ćwicz** - im więcej używasz Claude Code, tym lepiej

---

## Przydatne komendy

- `/pomoc` - ogólna pomoc mini-kursu
- `/resume` - wróć do zapisanej sesji
- `/start-p-1.v2` do `/start-p-4.v2` - wróć do konkretnej lekcji

*Dziękujemy za udział w mini-kursie TechStart! Powodzenia z Claude Code!*
</next-lesson>
