# Lekcja P.3: W akcji

<read-protocol>
Przed rozpoczęciem lekcji przeczytaj @.claude/commands/lesson-protocol.md i stosuj się do zawartych tam zasad.
</read-protocol>

<lesson-context>
WARIANT:
- PRZECZYTAJ plik output/wariant.txt żeby poznać wybrany wariant (A lub B)
- Jeśli plik nie istnieje - zapytaj użytkownika jaki wariant wybrał
- Dostosuj zadania i hinty do wybranego wariantu
</lesson-context>

<lesson-intro>
## Czas na akcję!

**Cel lekcji:** Stworzysz działający produkt - narzędzie CLI (wariant A) lub pakiet komunikacyjny (wariant B). Nauczysz się używać Normal Mode, Auto-Accept i trybu w tle.

**Czas:** ~35 minut

**Co powinieneś mieć:**
- Plik CLAUDE.md z planem implementacji
- Jasny wybór wariantu (A lub B)
- Zapisane decyzje w pamięci

**Jak to działa:**
- Dostaniesz zadanie do wykonania
- Masz trzy opcje w każdym kroku (własny prompt, własny prompt + ocena, hint)
- Uczysz się przez robienie, nie przez kopiowanie

Gotowy? Daj mi znać, a zaczniemy od weryfikacji stanu projektu.
</lesson-intro>

<wait-for-user/>

<step n="1" title="Sprawdzenie stanu">
  <display>
## Krok 1: Sprawdzenie stanu projektu

Zanim zaczniemy budować, zweryfikujmy punkt startu.

**Zadanie:** Napisz prompt, który przeczyta CLAUDE.md i przypomni Ci:
- Jaki wariant wybrałeś?
- Jaki jest plan implementacji?
- Co macie stworzyć?

**Twoje opcje:**
- Wpisz własny prompt → wykonam go
- Wpisz własny prompt + "oceń" → ocenię przed wykonaniem
- Wpisz `hint` → pokażę gotowy prompt
  </display>

  <hint>
Przeczytaj CLAUDE.md i przypomnij mi:
1. Jaki wariant wybrałem?
2. Jaki jest plan implementacji?
3. Co mamy stworzyć?
  </hint>

  <tip>
Zawsze warto zweryfikować kontekst przed rozpoczęciem pracy - szczególnie jeśli wracasz po przerwie.
  </tip>

  <wait-for-user/>

  <after-user-input>
STOSUJ zasady z lesson-protocol.md.

ZAPAMIĘTAJ wariant użytkownika do dalszych kroków.

Po wykonaniu przejdź do kroku 2.
  </after-user-input>
</step>

<step n="2" title="Pierwszy element">
  <display>
## Krok 2: Budowanie - pierwszy element

Upewnij się, że jesteś w Normal Mode (nie Plan Mode). Jeśli nie jesteś pewien - naciśnij `Shift+Tab`.

**Zadanie:** Napisz prompt, który stworzy pierwszy główny element Twojego projektu.

*Dla wariantu A:* Narzędzie CLI do analizy CSV z rejestracjami
*Dla wariantu B:* Email przypominający o wydarzeniu (T-7 dni)

Twój prompt powinien:
- Wskazać źródła danych/kontekstu (używając @)
- Określić co dokładnie ma powstać
- Wskazać gdzie zapisać wynik

**Twoje opcje:**
- Wpisz własny prompt → wykonam go
- Wpisz własny prompt + "oceń" → ocenię przed wykonaniem
- Wpisz `hint` → pokażę gotowy prompt
  </display>

  <hint>
// Dla WARIANTU A:
Stwórz narzędzie CLI w Pythonie do analizy @odziedziczony-chaos/rejestracje/uczestnicy.csv

Narzędzie powinno:
1. Wczytać plik CSV
2. Pokazać podstawowe statystyki (liczba uczestników, rozkład po kategoriach)
3. Wygenerować prosty raport tekstowy
4. Mieć czytelny output z kolorami (jeśli terminal wspiera)

Zapisz kod w folderze narzedzia/

// Dla WARIANTU B:
Stwórz email przypominający o wydarzeniu (T-7 dni przed).

Użyj:
- Tonu z @kontekst/BRAND-VOICE.md
- Informacji z @kontekst/BRIEF-WYDARZENIA.md
- Wniosków z analizy feedbacku (co uczestnicy cenili wcześniej)

Zapisz w pliku output/email-przypomnienie.md
  </hint>

  <tip>
W Normal Mode Claude aktywnie tworzy pliki i kod. Będzie pytał o potwierdzenie zmian.
  </tip>

  <wait-for-user/>

  <after-user-input>
STOSUJ zasady z lesson-protocol.md.

Pokaż hint odpowiedni dla wariantu użytkownika.

Po wykonaniu przejdź do kroku 3.
  </after-user-input>
</step>

<step n="3" title="Auto-Accept Mode">
  <display>
## Krok 3: Auto-Accept Mode

Gdy masz zaufanie do Claude'a i chcesz przyspieszyć pracę, możesz włączyć Auto-Accept - tryb automatycznego akceptowania zmian.

**Komenda:** shift-tab aż uzyskasz "accept edits on"

**Zadanie:**
1. Włącz Auto-Accept
2. Napisz prompt, który rozbuduje Twój projekt o dodatkową funkcję

*Dla wariantu A:* Dodaj eksport do JSON i prosty wykres ASCII
*Dla wariantu B:* Stwórz FAQ dla uczestników

**Twoje opcje:**
- Wpisz własny prompt → wykonam go
- Wpisz własny prompt + "oceń" → ocenię przed wykonaniem
- Wpisz `hint` → pokażę gotowy prompt
  </display>

  <hint>
/auto-accept on

// Potem dla WARIANTU A:
Dodaj do narzędzia funkcję eksportu do JSON oraz prosty wykres tekstowy (ASCII art) pokazujący rozkład uczestników.

// Potem dla WARIANTU B:
Stwórz FAQ dla uczestników w pliku output/faq-uczestnicy.md
Zawrzyj najczęstsze pytania: dojazd, parking, catering, agenda, dress code.
  </hint>

  <tip>
Auto-Accept przyspiesza pracę, ale używaj świadomie - Claude nie będzie pytał o potwierdzenie.
  </tip>

  <wait-for-user/>

  <after-user-input>
STOSUJ zasady z lesson-protocol.md.

Po wykonaniu przypomnij o wyłączeniu: auto-accept

Po wykonaniu przejdź do kroku 4.
  </after-user-input>
</step>

<step n="4" title="Praca w tle">
  <display>
## Krok 4: Praca w tle - Ctrl+B

Gdy Claude pracuje nad dłuższym zadaniem, możesz wysłać je w tło i kontynuować inne rzeczy.

**Skrót:** `Ctrl+B` (lub `Cmd+B` na Mac) wysyła zadanie w tło.

**Zadanie:**
1. Napisz prompt z większym zadaniem (rozbudowa projektu o kilka elementów)
2. Gdy Claude zacznie pracować, naciśnij `Ctrl+B`

**Twoje opcje:**
- Wpisz własny prompt → wykonam go
- Wpisz własny prompt + "oceń" → ocenię przed wykonaniem
- Wpisz `hint` → pokażę gotowy prompt
  </display>

  <hint>
// Dla WARIANTU A:
Rozbuduj narzędzie o:
1. Opcję filtrowania po dacie rejestracji
2. Eksport do HTML z ładnym formatowaniem
3. Podsumowanie dla CEO (3-4 zdania o najważniejszych insights)
4. Dokumentację użytkowania w README.md

// Dla WARIANTU B:
Stwórz brief dla wolontariuszy w pliku output/brief-wolontariusze.md zawierający:
1. Harmonogram dnia (kiedy przyjść, kiedy koniec)
2. Role i odpowiedzialności (kto co robi)
3. Kontakty awaryjne
4. Dress code i zasady
5. Mapę punktów kluczowych (rejestracja, catering, scena)

Bazuj na @kontekst/BRIEF-WYDARZENIA.md
  </hint>

  <tip>
Tryb w tle pozwala na wielozadaniowość. Claude powiadomi Cię gdy skończy.
  </tip>

  <wait-for-user/>

  <after-user-input>
STOSUJ zasady z lesson-protocol.md.

Po wykonaniu przejdź do kroku 5.
  </after-user-input>
</step>

<step n="5" title="Weryfikacja wyników">
  <display>
## Krok 5: Weryfikacja wyników

Czas sprawdzić co powstało w tej sesji.

**Zadanie:** Napisz prompt, który:
- Wylistuje wszystkie pliki stworzone w tej sesji
- Da krótki opis każdego pliku

**Twoje opcje:**
- Wpisz własny prompt → wykonam go
- Wpisz własny prompt + "oceń" → ocenię przed wykonaniem
- Wpisz `hint` → pokażę gotowy prompt
  </display>

  <hint>
Pokaż mi listę wszystkich plików które stworzyłeś w tej sesji.
Dla każdego pliku daj 1-zdaniowy opis co zawiera.
  </hint>

  <tip>
Regularna weryfikacja wyników pomaga utrzymać porządek w projekcie.
  </tip>

  <wait-for-user/>

  <after-user-input>
STOSUJ zasady z lesson-protocol.md.

Po wykonaniu przejdź do kroku 6.
  </after-user-input>
</step>

<step n="6" title="Finalizacja outputu">
  <display>
## Krok 6: Finalizacja głównego outputu

Ostatni krok - zweryfikuj i napraw ewentualne problemy.

**Zadanie:** Napisz prompt, który:
- *Dla wariantu A:* Przetestuje narzędzie na danych CSV i pokaże przykładowy output
- *Dla wariantu B:* Sprawdzi spójność dokumentów (daty, ton, informacje)

**Twoje opcje:**
- Wpisz własny prompt → wykonam go
- Wpisz własny prompt + "oceń" → ocenię przed wykonaniem
- Wpisz `hint` → pokażę gotowy prompt
  </display>

  <hint>
// Dla WARIANTU A:
Przetestuj narzędzie na danych z CSV. Pokaż mi przykładowy output.
Napraw ewentualne błędy.

// Dla WARIANTU B:
Sprawdź spójność wszystkich dokumentów:
- Czy daty są zgodne?
- Czy ton jest spójny z brand voice?
- Czy nie ma sprzecznych informacji?

Popraw jeśli coś nie gra.
  </hint>

  <tip>
Zawsze weryfikuj wyniki - Claude jest pomocny, ale nie nieomylny.
  </tip>

  <wait-for-user/>

  <after-user-input>
STOSUJ zasady z lesson-protocol.md.

Po wykonaniu przejdź do podsumowania lekcji.
  </after-user-input>
</step>

<lesson-summary>
## Podsumowanie lekcji P.3

**Umiejętności, które przećwiczyłeś:**
- Normal Mode - aktywne budowanie projektu
- Auto-Accept (`/auto-accept on/off`) - przyspieszenie pracy
- Tryb w tle (`Ctrl+B`) - długie zadania w tle
- Iteracyjne budowanie z weryfikacją
- Testowanie i poprawianie wyników

**Kluczowe wnioski:**
1. Auto-Accept przyspiesza, ale używaj świadomie
2. Ctrl+B pozwala na wielozadaniowość
3. Zawsze weryfikuj wyniki - Claude nie jest nieomylny
4. Iteracja to klucz - pierwszy draft rzadko jest idealny

**Twój output:** Działający produkt - narzędzie CLI lub pakiet komunikacyjny.
</lesson-summary>

<next-lesson>
## Następna lekcja

W **Lekcji P.4: Review i launch** skonsultujesz materiały z zespołem (trzema perspektywami) i sfinalizujesz projekt.

**Aby rozpocząć:** wpisz `/start-p-4.v2`

---

## Twój progress

- [x] P.1: Analiza chaosu
- [x] P.2: Fundament projektu
- [x] P.3: W akcji (właśnie ukończona)
- [ ] P.4: Review i launch

*Świetna robota! Masz już działający produkt. Teraz czas na konsultacje z zespołem.*
</next-lesson>
