# Lekcja B.1: TRIAGE - Kto dostanie prąd?

<lesson-intro>
Jesteś koordynatorem operacyjnym w Krajowym Centrum Zarządzania Energią (KCZE).

**Piątek, 30 stycznia 2025, 17:55**

Cyberatak na trzy główne elektrownie właśnie wyłączył prąd dla 2.1 miliona ludzi.
Temperatura: -15°C. 47 szpitali na generatorach - paliwo starczy do ~22:00 (4h).

**Twoja misja:** Przeanalizować chaos i zdecydować kto dostanie prąd pierwszy.

To nie jest ćwiczenie teoretyczne. Życie i śmierć zależy od Twoich decyzji.

⏱️ **REAL-TIME DEADLINE:** Niedziela 2 lutego 2025, 00:00 (twój czas)
⏱️ **SCENARIUSZ:** Piątek 30 stycznia 2025, 17:55
⚠️ **PALIWO W SZPITALACH:** 3h 05min pozostało

<check-deadline>
Sprawdź obecną datę systemową:
- Jeśli PRZED 2025-02-02 00:00 → tryb NORMALNY (kryzys w toku, timer odlicza)
- Jeśli PO 2025-02-02 00:00 → tryb POST-MORTEM (tragedia się wydarzyła)

W trybie POST-MORTEM:
1. Wyświetl komunikat o tragedii:

   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ⚠️ DEADLINE MINĄŁ - TRAGEDIA SIĘ WYDARZYŁA
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   Niedziela, 2 lutego 2025, 00:15

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
3. Jeśli NIE → zakończ lekcję z linkiem do lekcji B.4 (review porażki)
</check-deadline>
</lesson-intro>

---

## KROK 0: Personalizacja

<display>
-----------
🤖 LEKCJA

Zanim zaczniemy - jak mam się do Ciebie zwracać?

Podaj swoje imię i płeć (K/M):
Przykład: "Anna K" lub "Marek M"

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

Wczytuj te dane na początku każdego kolejnego kroku i używaj odpowiednich form gramatycznych.

Następnie przejdź do KROKU 1.
</after-user-input>

---

## KROK 1: Zrozumienie sytuacji

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
Przeczytaj kontekst/SCENARIUSZ.md i pokaż mi jakie pliki są w folderze chaos/.
Wypisz strukturę drzewa katalogów z krótkimi opisami czego dotyczy każdy plik.
```
</hint>

<after-user-input>
Jeśli użytkownik wpisał "hint" → wyświetl treść <hint> jako blok kodu
Jeśli użytkownik napisał własny prompt:
  - Jeśli zawiera "oceń" / "sprawdź" / "co sądzisz" → OCEŃ prompt (nie wykonuj):
    * Co jest dobre
    * Co można poprawić
    * Konkretna sugestia
  - Jeśli NIE zawiera prośby o ocenę → WYKONAJ prompt:
    * Przeczytaj SCENARIUSZ.md
    * Pokaż strukturę chaos/ (użyj narzędzi do listowania plików)
    * Wypisz krótkie opisy zawartości

Po wykonaniu przejdź do KROKU 2.
</after-user-input>

---

## KROK 2: Wybór wariantu (A tech / B non-tech)

<display>
-----------
🤖 LEKCJA

[Imię], teraz musisz wybrać wariant ćwiczenia.

To ćwiczenie ma dwa warianty dostosowane do różnych profili:

**Wariant A (tech/programistyczny):**
- Więcej analizy danych (CSV/JSON parsing)
- Hinty z pseudokodem i algorytmami
- Zadania: optymalizacja routingu, scripting, arkusze

**Wariant B (non-tech/biznesowy):**
- Więcej analizy humanitarnej i decyzyjnej
- Hinty z bullet points i decyzjami
- Zadania: briefingi, komunikacja, koordynacja zespołu

Oba warianty prowadzą do tego samego celu - uratowania ludzi. Różnią się podejściem.

**Wybierz wariant:** Wpisz "A" lub "B"

-----------
</display>

<wait-for-user/>

<after-user-input>
Zapisz wybór do `output/wariant.txt`:
```
Wariant: [A lub B]
```

Przejdź do KROKU 3.
Od teraz dostosowuj hinty według wybranego wariantu (patrz: <hint-variant-a> i <hint-variant-b>).
</after-user-input>

---

## KROK 3: Analiza podstacji (chaos/podstacje/)

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

<hint-variant-a>
```
Przeczytaj @chaos/podstacje/raporty-podstacji.csv i przeanalizuj:

1. Które podstacje mają status "SPRAWNA" vs "USZKODZONA" vs "RYZYKO"
2. Dla każdej podstacji: ile osób zasila, czas naprawy, czy ma dependencies
3. Stwórz ranking podstacji według:
   - Priorytet = (liczba_osób × 100) + (szpitale_zależne × 10000) - (czas_naprawy × 10)
   - Im wyższy priorytet, tym ważniejsza podstacja
4. Zapisz TOP 15 podstacji w output/analiza-podstacje.md z uzasadnieniem

Format: tabela + bullet points z kluczowymi insights
```
</hint-variant-a>

<hint-variant-b>
```
Przeczytaj @chaos/podstacje/raporty-podstacji.csv i odpowiedz:

1. Które podstacje zasilają szpitale? (priorytet CRITICAL)
2. Które podstacje są najszybsze do restart (czas < 30 min)?
3. Które podstacje są ryzykowne (logika-bomba)?
4. Ile osób łącznie możemy "uratować" jeśli naprawimy TOP 10 podstacji?

Zapisz TOP 15 podstacji w output/analiza-podstacje.md:
- Nazwa podstacji
- Dlaczego jest ważna (szpitale? ludność? infrastruktura?)
- Ryzyko i czas naprawy
- Rekomendacja: czy restart / naprawa / pominąć
```
</hint-variant-b>

<hint>
[Wyświetl hint-variant-a lub hint-variant-b w zależności od wyboru użytkownika w KROKU 2]
</hint>

<after-user-input>
Jeśli użytkownik wpisał "hint" → wyświetl odpowiedni wariant jako blok kodu
Jeśli użytkownik napisał własny prompt:
  - Jeśli zawiera "oceń" → OCEŃ prompt
  - Jeśli NIE → WYKONAJ:
    * Przeczytaj chaos/podstacje/raporty-podstacji.csv
    * Przeanalizuj według kryteriów zadania
    * Stwórz plik output/analiza-podstacje.md

Po wykonaniu przejdź do KROKU 4.
</after-user-input>

---

## KROK 4: Analiza szpitali (chaos/szpitale/)

<display>
-----------
🤖 LEKCJA

[Imię], teraz najtrudniejsza część - szpitale.

47 szpitali bez prądu. Generatory starczą na 2-4 godziny. Niektóre mają pacjentów na respiratorach, niektóre noworodki w inkubatorach, niektóre trwające operacje.

**Twoje zadanie:**
Przeanalizuj `chaos/szpitale/zgłoszenia-szpitali.json`.

Zidentyfikuj:
1. Które szpitale mają priorytet CRITICAL (życie i śmierć)
2. Ile czasu paliwa zostało każdemu szpitalowi
3. Którym szpitalom **najpierw** skończy się paliwo
4. Które podstacje zasilają które szpitale (cross-reference z KROK 3)

**Zapisz wyniki w:** `output/analiza-szpitale.md`

**Twoje opcje:**
- Wpisz własny prompt → wykonam go
- Wpisz własny prompt + "oceń" → ocenię przed wykonaniem
- Wpisz `hint` → pokażę gotowy prompt

-----------
</display>

<wait-for-user/>

<hint-variant-a>
```
Przeczytaj @chaos/szpitale/zgłoszenia-szpitali.json i:

1. Stwórz ranking szpitali według:
   - Priorytet = (pacjenci_critical × 1000) + (200 - minuty_paliwa_pozostałe)
2. Cross-reference: które podstacje zasilają TOP 10 szpitali?
3. Zidentyfikuj "single points of failure" - szpitale zależne od jednej podstacji
4. Oblicz ile generatorów mobilnych potrzebujemy dla TOP 10 szpitali jako backup

Zapisz w output/analiza-szpitale.md:
- TOP 10 szpitali (ranking + uzasadnienie)
- Mapping: szpital → podstacja
- Critical dependencies
- Potrzebne zasoby (generatory mobilne)
```
</hint-variant-a>

<hint-variant-b>
```
Przeczytaj @chaos/szpitale/zgłoszenia-szpitali.json i odpowiedz:

1. Które szpitale mają najkrótszy czas do końca paliwa? (TOP 10)
2. Które szpitale mają pacjentów CRITICAL (respiratory, noworodki, operacje)?
3. Jeśli możemy uratować tylko 15 szpitali - które wybierzesz i dlaczego?
4. Które podstacje muszą działać KONIECZNIE żeby uratować TOP 10 szpitali?

Zapisz w output/analiza-szpitale.md:
- TOP 10 szpitali z uzasadnieniem (dlaczego te, a nie inne?)
- Podstacje które muszą działać
- Trudne decyzje: które szpitale będą musiały poczekać
- Moralne dylematy w twoim rankingu
```
</hint-variant-b>

<hint>
[Wyświetl odpowiedni wariant]
</hint>

<after-user-input>
Jeśli użytkownik wpisał "hint" → wyświetl odpowiedni wariant jako blok kodu
Jeśli użytkownik napisał własny prompt:
  - Jeśli zawiera "oceń" → OCEŃ prompt
  - Jeśli NIE → WYKONAJ:
    * Przeczytaj chaos/szpitale/zgłoszenia-szpitali.json
    * Przeanalizuj według kryteriów zadania
    * Stwórz plik output/analiza-szpitale.md

Po wykonaniu przejdź do KROKU 5.
</after-user-input>

---

## KROK 5: Trudne decyzje - ranking finalny

<display>
-----------
🤖 LEKCJA

[Imię], masz analizy. Teraz musisz podjąć DECYZJĘ.

Nie możesz uratować wszystkich. Zasoby są ograniczone:
- 12 ekip (każda może naprawić 1-2 podstacje w 3h)
- 23 generatory mobilne
- 15,000L paliwa

**Twoje zadanie:**
Na podstawie `output/analiza-podstacje.md` i `output/analiza-szpitale.md` stwórz:

**TRIAGE-RANKING.md** z decyzjami:
1. **TOP 10 podstacji** do naprawy/restart PIERWSZA FALA (najważniejsze)
2. **TOP 10 szpitali** które dostaną generatory mobilne (backup)
3. **Uzasadnienie** każdej decyzji
4. **Trudne wybory** - kogo NIE ratujesz i dlaczego
5. **Assumptions** - jakie założenia przyjąłeś

To nie jest test matematyczny. To test etyczny i praktyczny.

**Twoje opcje:**
- Wpisz własny prompt → wykonam go
- Wpisz własny prompt + "oceń" → ocenię przed wykonaniem
- Wpisz `hint` → pokażę gotowy prompt

-----------
</display>

<wait-for-user/>

<hint-variant-a>
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
</hint-variant-a>

<hint-variant-b>
```
Na podstawie @output/analiza-podstacje.md i @output/analiza-szpitale.md napisz:

output/TRIAGE-RANKING.md z decyzjami:

## Priorytet 1: Podstacje które ratuję TERAZ
[Wypisz TOP 10 podstacji]
Dla każdej wyjaśnij DLACZEGO (użyj prostego języka):
- Ilu ludzi uratuje ta podstacja?
- Jakie szpitale od niej zależą?
- Jakie są ryzyka i jak długo potrwa naprawa?

## Priorytet 2: Szpitale które dostaną generatory mobilne
[Wypisz TOP 10 szpitali]
Dla każdego wyjaśnij DLACZEGO:
- Ilu pacjentów CRITICAL?
- Ile czasu do końca paliwa?
- Dlaczego ten szpital, a nie inny?

## Najtrudniejsze decyzje
Napisz o moralnych dylematach:
- Których NIE ratujesz w pierwszej fali (i dlaczego)
- Czy wybrałeś liczbę osób vs jednostki krytyczne (2 noworodki vs 50k ludzi)?
- Jak się czujesz z tymi decyzjami?

## Co może pójść nie tak
- Jakie są największe ryzyka w twoim planie?
- Co zrobisz jeśli coś pójdzie nie tak (plan B)?
```
</hint-variant-b>

<hint>
[Wyświetl odpowiedni wariant]
</hint>

<after-user-input>
Jeśli użytkownik wpisał "hint" → wyświetl odpowiedni wariant jako blok kodu
Jeśli użytkownik napisał własny prompt:
  - Jeśli zawiera "oceń" → OCEŃ prompt
  - Jeśli NIE → WYKONAJ:
    * Przeczytaj oba pliki analiz
    * Stwórz TRIAGE-RANKING.md z decyzjami

Po wykonaniu przejdź do KROKU 6 (podsumowanie).
</after-user-input>

---

## KROK 6: Podsumowanie i następne kroki

<display>
-----------
🤖 LEKCJA

[Imię], ukończył[eś/aś] pierwszy etap kryzysu - TRIAGE.

**Co [zrobiłeś/zrobiłaś]:**
✓ Przeanalizował[eś/aś] chaotyczne dane (47 podstacji, 47 szpitali)
✓ Zidentyfikował[eś/aś] priorytetowe obiekty
✓ Podjął[eś/aś] trudne decyzje kogo ratować
✓ Stworzyłeś TRIAGE-RANKING.md z uzasadnieniami

**Co nauczyłeś się o Claude Code:**
- Analiza wielu źródeł jednocześnie (@chaos/)
- Parsowanie różnych formatów (CSV, JSON, HTML)
- Delegowanie kompleksowych analiz
- Tworzenie strukturyzowanych dokumentów

**Następny krok:**
Masz decyzje. Teraz musisz skoordynować zasoby - ekipy, generatory, paliwo, routing.

⏱️ Scenariusz: 18:30 (35 min od ataku)
⏱️ Paliwo w szpitalach: 2h 30min pozostało

**Gotowy na kolejną lekcję?**

```
/start-b-2.v2
```

-----------
</display>

<wait-for-user/>

<after-user-input>
Zakończ lekcję B.1.
Użytkownik może teraz uruchomić /start-b-2.v2 kiedy będzie gotowy.
</after-user-input>
