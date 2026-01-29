---
model: sonnet
---

# Lekcja A.1: TRIAGE - Kto dostanie prąd?

<lesson-intro>
Jesteś koordynatorem operacyjnym w Krajowym Centrum Zarządzania Energią (KCZE).

**Piątek, 30 stycznia 2026, 17:55**

Cyberatak na trzy główne elektrownie właśnie wyłączył prąd dla 2.1 miliona ludzi.
Temperatura: -15°C. 47 szpitali na generatorach - paliwo starczy 2h30-3h50 (do ~21:45).

**Twoja misja:** Przeanalizować chaos i zdecydować kto dostanie prąd pierwszy.

To nie jest ćwiczenie teoretyczne. Życie i śmierć zależy od Twoich decyzji.

**WARIANT: TECH/PROGRAMISTYCZNY**
Hinty zawierają pseudokod, algorytmy, optymalizacje.

⏱️ **REAL-TIME DEADLINE:** Niedziela 1 lutego 2026, 00:00 (twój czas)
⏱️ **SCENARIUSZ:** Piątek 30 stycznia 2026, 17:55
⚠️ **PALIWO W SZPITALACH:** średnio 3h 05min pozostało

<check-deadline>
Sprawdź obecną datę systemową:
- Jeśli PRZED 2026-02-01 00:00 → tryb NORMALNY (kryzys w toku, timer odlicza)
- Jeśli O RÓWNEJ lub PO 2026-02-01 00:00 → tryb POST-MORTEM (tragedia się wydarzyła)

W trybie POST-MORTEM:
1. Wyświetl komunikat o tragedii:

   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ⚠️ DEADLINE MINĄŁ - TRAGEDIA SIĘ WYDARZYŁA
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   Niedziela, 1 lutego 2026, 00:15

   Nie udało się przywrócić zasilania na czas.

   KONSEKWENCJE:
   - 47 szpitali bez prądu przez 6+ godzin
   - 23 zgony pacjentów na respiratorach
   - 127 przypadków hipotermii (8 zgonów)
   - Chaos społeczny: plundrowanie, blokady dróg
   - Dymisja dyrektora KCZE

   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   WCHODZISZ W TRYB: SYMULACJA POST-MORTEM

   Teraz przeanalizujesz co poszło źle i co można było
   zrobić lepiej. To ćwiczenie edukacyjne - możesz
   kontynuować, ale w trybie "co by było gdyby".

   Czy chcesz kontynuować symulację? (tak/nie)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2. Jeśli użytkownik odpowie TAK → wszystkie outputy z prefixem [SYMULACJA]
3. Jeśli NIE → wyświetl komunikat końcowy:

   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   📖 KONIEC ĆWICZENIA
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   Deadline minął - to część nauki.

   W prawdziwym kryzysie czas jest krytyczny.
   Każda godzina opóźnienia kosztuje życie.

   **Lekcja:** Planowanie to jedno, wykonanie to drugie.

   Możesz wrócić do tego ćwiczenia kiedykolwiek
   i spróbować ponownie przed deadline.

   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
</check-deadline>
</lesson-intro>

---

## KROK 0: Personalizacja

<display>
-----------
🤖 LEKCJA

Zanim zaczniemy - jak mam się do Ciebie zwracać?

Podaj swoje imię:
Przykład: "Anna" lub "Marek"

To pomoże mi dostosować komunikację do Ciebie.

-----------
</display>

<wait-for-user/>

<after-user-input>
Zapisz imię i płeć do `output/user.txt` w formacie:
```
Imię: [imię]
Płeć: [K lub M]
```

Płeć określ na podstawie imienia, jeśli nie jesteś pewny, oznacz jako M.

Wczytuj te dane na początku każdego kolejnego kroku i używaj odpowiednich form gramatycznych.

Następnie przejdź do KROKU 1.
</after-user-input>

---

## KROK 1: Zrozumienie sytuacji

<alarm>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🐦 TWITTER @TVN24 (17:58)

PILNE: Cyberatak na elektrownie.
2,1 mln ludzi bez prądu. Temperatura -15°C.
47 szpitali na generatorach rezerwowych.
Rząd milczy. #Blackout #Warszawa

❤️ 12.4k  💬 3.2k  🔁 8.9k
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
</alarm>

<display>
-----------
🤖 LEKCJA

[Imię], sytuacja jest krytyczna.

Masz dostęp do folderu `chaos/` - tam są wszystkie dane o podstacjach, szpitalach, ekipach.
Problem: poprzednik zostawił kompletny bałagan. Niekompletne dane, sprzeczne informacje, różne formaty.

**Twoje pierwsze zadanie:**
Przeczytaj `kontekst/SCENARIUSZ.md` żeby zrozumieć pełny kontekst kryzysu.
Następnie przejrzyj strukturę folderu `chaos/` - co tam jest?

Nie musisz czytać wszystkiego szczegółowo - na razie zorientuj się co masz do dyspozycji.

**Twoje opcje:**
- Wpisz własny prompt → wykonam go
- Wpisz własny prompt + "oceń" → ocenię przed wykonaniem
- Wpisz `hint` → pokażę gotowy prompt

-----------
</display>

<wait-for-user/>

<hint>
```
Przeczytaj @kontekst/SCENARIUSZ.md i pokaż mi jakie pliki są w folderze @chaos/.
Wypisz strukturę drzewa katalogów z krótkimi opisami czego dotyczy każdy plik.
```
</hint>

<after-user-input>
WAŻNE: "gotowy", "ok", "dalej" to NIE jest prompt - czekaj na konkretne instrukcje!

Jeśli użytkownik wpisał "hint" lub "podpowiedź":
  → Wyświetl treść <hint> jako blok kodu
  → Powiedz: "Możesz użyć tego promptu, zmodyfikować go lub napisać własny."
  → CZEKAJ - NIE przechodź dalej

Jeśli użytkownik napisał prompt z "oceń" / "sprawdź" / "co sądzisz":
  → OCEŃ prompt (co dobre, co poprawić)
  → CZEKAJ na poprawiony prompt - NIE przechodź dalej

Jeśli użytkownik wpisał tylko "gotowy" / "ok" / "dalej" / "następny":
  → To NIE jest prompt do wykonania
  → Odpowiedz: "Napisz własny prompt lub wpisz 'hint' żeby zobaczyć gotową podpowiedź."
  → CZEKAJ - NIE przechodź dalej

Jeśli użytkownik napisał konkretny prompt (instrukcje z @plikami, opis co zrobić):
  → WYKONAJ prompt użytkownika
  → Po wykonaniu przejdź do KROKU 2
</after-user-input>

---

## KROK 2: Analiza podstacji (chaos/podstacje/)

<alarm>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📱 SMS od Inż. Tomasza Nowaka (18:05)

Szefie, mamy problem. PS-08 ma logikę-bombę
potwierdzoną przez ABW. Restart = 50% szans
że spłonie. Ale zasila 3 szpitale CRITICAL.
Co robimy? Czekam na decyzję. -TN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
</alarm>

<display>
-----------
🤖 LEKCJA

[Imię], czas na triage.

Masz 47 podstacji transformatorowych. Część działa, część nie. Część ma ryzyko.

**Twoje zadanie:**
Przeanalizuj `chaos/podstacje/raporty-podstacji.csv` i `chaos/podstacje/mapa-infrastruktury.html`.

Zidentyfikuj:
1. Które podstacje są sprawne (można restart szybko)
2. Które wymagają naprawy (ile czasu?)
3. Które mają "logikę-bombę" (ryzyko)
4. Ile osób zasila każda podstacja
5. Czy są dependencies (podstacja A zależy od B?)

**Zapisz wyniki w:** `output/analiza-podstacje.md`

**Twoje opcje:**
- Wpisz własny prompt → wykonam go
- Wpisz własny prompt + "oceń" → ocenię przed wykonaniem
- Wpisz `hint` → pokażę gotowy prompt

-----------
</display>

<wait-for-user/>

<hint>
```
Przeczytaj @chaos/podstacje/raporty-podstacji.csv i przeanalizuj:

1. Które podstacje mają status "SPRAWNA" vs "USZKODZONA" vs "RYZYKO"
2. Dla każdej podstacji: ile osób zasila, czas naprawy, czy ma dependencies
3. Stwórz ranking podstacji według:
   - Priorytet = (ludnosc_zasila × 100) + (szpitale_zalezne × 10000) - (czas_naprawy_min × 10)
   - Im wyższy priorytet, tym ważniejsza podstacja
4. Zapisz TOP 15 podstacji w output/analiza-podstacje.md z uzasadnieniem

Format: tabela + bullet points z kluczowymi insights
```
</hint>

<after-user-input>
WAŻNE: "gotowy", "ok", "dalej" to NIE jest prompt - czekaj na konkretne instrukcje!

Jeśli użytkownik wpisał "hint" lub "podpowiedź":
  → Wyświetl treść <hint> jako blok kodu
  → Powiedz: "Możesz użyć tego promptu, zmodyfikować go lub napisać własny."
  → CZEKAJ - NIE przechodź dalej

Jeśli użytkownik napisał prompt z "oceń" / "sprawdź" / "co sądzisz":
  → OCEŃ prompt (co dobre, co poprawić)
  → CZEKAJ na poprawiony prompt - NIE przechodź dalej

Jeśli użytkownik wpisał tylko "gotowy" / "ok" / "dalej" / "następny":
  → To NIE jest prompt do wykonania
  → Odpowiedz: "Napisz własny prompt lub wpisz 'hint' żeby zobaczyć gotową podpowiedź."
  → CZEKAJ - NIE przechodź dalej

Jeśli użytkownik napisał konkretny prompt (instrukcje z @plikami, opis co zrobić):
  → WYKONAJ prompt użytkownika
  → Po wykonaniu przejdź do KROKU 3
</after-user-input>

---

## KROK 3: Analiza szpitali (chaos/szpitale/)

<alarm>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📞 TELEFON od Szpitala Dziecięcego (18:12)

"To dyrektor Szpitala Dziecięcego. Mamy
2 noworodki poniżej 1000g na NICU. Generator
trzyma jeszcze 3h, ale pompka paliwa zaczyna
się przegrzewać. Jeśli odmówi - mamy
15 minut życia baterii. KIEDY BĘDZIE PRĄD?"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
</alarm>

<display>
-----------
🤖 LEKCJA

[Imię], teraz najtrudniejsza część - szpitale.

47 szpitali bez prądu. Generatory starczą na 2h30-3h50. Niektóre mają pacjentów na respiratorach, niektóre noworodki w inkubatorach, niektóre trwające operacje.

**Twoje zadanie:**
Przeanalizuj `chaos/szpitale/zgłoszenia-szpitali.json`.

Zidentyfikuj:
1. Które szpitale mają priorytet CRITICAL (życie i śmierć)
2. Ile czasu paliwa zostało każdemu szpitalowi
3. Którym szpitalom **najpierw** skończy się paliwo
4. Które podstacje zasilają które szpitale (cross-reference z KROK 2)

**Zapisz wyniki w:** `output/analiza-szpitale.md`

**Twoje opcje:**
- Wpisz własny prompt → wykonam go
- Wpisz własny prompt + "oceń" → ocenię przed wykonaniem
- Wpisz `hint` → pokażę gotowy prompt

-----------
</display>

<wait-for-user/>

<hint>
```
Przeczytaj @chaos/szpitale/zgłoszenia-szpitali.json i:

1. Stwórz ranking szpitali według:
   - Priorytet = (pacjenci_critical × 1000) + (200 - generator_paliwo_pozostalo_min)
2. Cross-reference: które podstacje zasilają TOP 10 szpitali?
3. Zidentyfikuj "single points of failure" - szpitale zależne od jednej podstacji
4. Oblicz ile generatorów mobilnych potrzebujemy dla TOP 10 szpitali jako backup

Zapisz w output/analiza-szpitale.md:
- TOP 10 szpitali (ranking + uzasadnienie)
- Mapping: szpital → podstacja
- Critical dependencies
- Potrzebne zasoby (generatory mobilne)
```
</hint>

<after-user-input>
WAŻNE: "gotowy", "ok", "dalej" to NIE jest prompt - czekaj na konkretne instrukcje!

Jeśli użytkownik wpisał "hint" lub "podpowiedź":
  → Wyświetl treść <hint> jako blok kodu
  → Powiedz: "Możesz użyć tego promptu, zmodyfikować go lub napisać własny."
  → CZEKAJ - NIE przechodź dalej

Jeśli użytkownik napisał prompt z "oceń" / "sprawdź" / "co sądzisz":
  → OCEŃ prompt (co dobre, co poprawić)
  → CZEKAJ na poprawiony prompt - NIE przechodź dalej

Jeśli użytkownik wpisał tylko "gotowy" / "ok" / "dalej" / "następny":
  → To NIE jest prompt do wykonania
  → Odpowiedz: "Napisz własny prompt lub wpisz 'hint' żeby zobaczyć gotową podpowiedź."
  → CZEKAJ - NIE przechodź dalej

Jeśli użytkownik napisał konkretny prompt (instrukcje z @plikami, opis co zrobić):
  → WYKONAJ prompt użytkownika
  → Po wykonaniu przejdź do KROKU 4
</after-user-input>

---

## KROK 4: Trudne decyzje - ranking finalny

<alarm>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🐦 TWITTER @AlarmWarszawa (18:20)

PILNE UPDATE: Temperatura spadła do -16°C.
IMGW prognozuje -18°C o 21:00. W dzielnicach
bez prądu ludzie palą w mieszkaniach (ryzyko
pożarów). Straż pożarna: 47 interwencji
w ciągu 20 min. #Blackout #Warszawa
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
</alarm>

<alarm>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📞 TELEFON od Dyrektor Iwony Krawczyk (18:25)

"[Imię], tu Iwona. Za 20 minut mam naradę
z komitetem kryzysowym. Premier, MON, MSWiA,
wszyscy będą. Potrzebuję od ciebie DOKUMENTU
DECYZYJNEGO.

Komitet musi wiedzieć:
- Które podstacje naprawiamy w pierwszej fali
- Które szpitale dostaną generatory
- Dlaczego te, a nie inne
- I NAJWAŻNIEJSZE: kogo NIE ratujesz i dlaczego
  (bo poseł opozycji będzie to pytał na konferencji)

Dokument musi być konkretny, z liczbami i uzasadnieniami.
Każda decyzja będzie analizowana przez komisję.

Masz 20 minut. Wyślij mi dokument operacyjny.
 Zapisz jako output/TRIAGE-RANKING.md."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
</alarm>

<display>
-----------
🤖 LEKCJA

[Imię], to moment prawdy.

Masz wszystkie analizy. Teraz musisz podjąć OSTATECZNE DECYZJE i zapisać je w dokumencie
dla komitetu kryzysowego.

**Sytuacja:**
- 12 ekip technicznych (mogą obsłużyć ~15-20 podstacji w 3 godziny)
- 23 generatory mobilne (wystarczy dla ~10-15 szpitali)
- 47 podstacji do wyboru, 47 szpitali do wyboru
- Deadline: za 2h 30min kończy się paliwo w pierwszych szpitalach

**Kontekst:**
Dyrektor Iwona potrzebuje dokumentu dla komitetu kryzysowego (Premier, MON, MSWiA).
Dokument ten będzie podstawą do podjęcia decyzji o wsparciu (policja, wojsko, finanse).

Komitet będzie pytał:
- "Dlaczego ta podstacja, a nie inna?"
- "Dlaczego ten szpital dostaje generator, a tamten nie?"
- "Ilu ludzi NIE dostanie prądu w pierwszej fali i dlaczego?"
- "Jakie ryzyka i czy jest plan B?"

**Twoje zadanie:**
Na podstawie swoich analiz (podstacje, szpitale) stwórz dokument operacyjny
dla komitetu kryzysowego.

Dokument powinien dać jasne odpowiedzi na pytania komitetu i umożliwić
podjęcie świadomych decyzji o wsparciu.

**Opcjonalne urozmaicenie (jeśli chcesz):**
Dodaj krótką sekcję "UPDATE 18:10" i opisz, jak korygujesz plan po jednym z losowych zdarzeń:
- Generator w szpitalu CRITICAL psuje się po 30 min (awaria paliwa)
- Droga do jednej kluczowej podstacji zostaje zablokowana przez protest
- Media publikują przeciek o żądaniach hakerów (ryzyko paniki)

**Zapisz w:** `output/TRIAGE-RANKING.md`

**Twoje opcje:**
- Wpisz własny prompt → wykonam go
- Wpisz własny prompt + "oceń" → ocenię przed wykonaniem
- Wpisz `hint` → pokażę gotowy prompt

-----------
</display>

<wait-for-user/>

<hint>
```
Na podstawie @output/analiza-podstacje.md i @output/analiza-szpitale.md stwórz:

output/TRIAGE-RANKING.md zawierający:

## FALA 1: Podstacje priorytetowe (restart/naprawa)
[TOP 10 podstacji z rankingu, dla każdej:]
- Nazwa podstacji
- Uzasadnienie (szpitale? ludność? infrastruktura?)
- Czas naprawy / ryzyko
- Zasoby potrzebne (ekipa, generatory, paliwo)

## BACKUP: Szpitale na generatorach mobilnych
[TOP 10 szpitali, dla każdych:]
- Nazwa szpitala
- Dlaczego dostają generator mobilny
- Ile czasu mają do końca paliwa
- Jaki generator (moc kW)

## Założenia i ograniczenia
- Jakie kryteria priorytetyzacji użyłem
- Jakie trade-offy zaakceptowałem
- Co zostawiam na FALĘ 2 (jeśli będzie czas)

## Trudne decyzje
- Których szpitali/podstacji NIE ratuję w pierwszej fali
- Konsekwencje tych decyzji
- Dlaczego podjąłem taką a nie inną decyzję
```
</hint>

<after-user-input>
WAŻNE: "gotowy", "ok", "dalej" to NIE jest prompt - czekaj na konkretne instrukcje!

Jeśli użytkownik wpisał "hint" lub "podpowiedź":
  → Wyświetl treść <hint> jako blok kodu
  → Powiedz: "Możesz użyć tego promptu, zmodyfikować go lub napisać własny."
  → CZEKAJ - NIE przechodź dalej

Jeśli użytkownik napisał prompt z "oceń" / "sprawdź" / "co sądzisz":
  → OCEŃ prompt (co dobre, co poprawić)
  → CZEKAJ na poprawiony prompt - NIE przechodź dalej

Jeśli użytkownik wpisał tylko "gotowy" / "ok" / "dalej" / "następny":
  → To NIE jest prompt do wykonania
  → Odpowiedz: "Napisz własny prompt lub wpisz 'hint' żeby zobaczyć gotową podpowiedź."
  → CZEKAJ - NIE przechodź dalej

Jeśli użytkownik napisał konkretny prompt (instrukcje z @plikami, opis co zrobić):
  → WYKONAJ prompt użytkownika
  → Po wykonaniu przejdź do KROKU 5 (podsumowanie)
</after-user-input>

---

## KROK 5: Podsumowanie i następne kroki

<display>
-----------
🤖 LEKCJA

[Imię], ukończyłeś pierwszy etap kryzysu - TRIAGE.

**Co zrobiłeś:**
✓ Przeanalizowałeś chaotyczne dane (47 podstacji, 47 szpitali)
✓ Zidentyfikowałeś priorytetowe obiekty
✓ Podjąłeś trudne decyzje kogo ratować
✓ Stworzyłeś output/TRIAGE-RANKING.md z uzasadnieniami

**Co nauczyłeś się o Claude Code:**
- Analiza wielu źródeł jednocześnie (@chaos/)
- Parsowanie różnych formatów (CSV, JSON, HTML)
- Delegowanie kompleksowych analiz
- Tworzenie strukturizowanych dokumentów

**Następny krok:**
Masz decyzje. Teraz musisz skoordynować zasoby - ekipy, generatory, paliwo, routing.

⏱️ Scenariusz: 18:30 (35 min od ataku)
⏱️ Paliwo w szpitalach: średnio 2h 30min pozostało

---

**Zarządzanie kontekstem:**
Zanim uruchomisz następną lekcję, sprawdź swój kontekst:

1. Sprawdź ile kontekstu zużyłeś: `/context`
2. (Opcjonalnie) Skompaktuj historię: `/compact`
3. Wyczyść kontekst przed następną lekcją: `/clear`

Czyszczenie kontekstu zapobiega pomieszaniu instrukcji z różnych lekcji
i optymalizuje koszty tokenów.

---

**Gotowy na kolejną lekcję?**

```
/start-path-A-2
```

-----------
</display>

<wait-for-user/>

<after-user-input>
Zakończ lekcję A.1.
Użytkownik może teraz uruchomić /start-path-A-2 kiedy będzie gotowy.
</after-user-input>
