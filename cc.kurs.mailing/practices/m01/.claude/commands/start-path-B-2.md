---
model: sonnet
---

# Lekcja B.2: LOGISTYKA ŻYCIA - Generatory, ekipy, paliwo

<lesson-intro>
Masz decyzje. Teraz czas na koordynację zasobów.

**Piątek, 30 stycznia 2026, 18:30**

Minęło 35 minut od cyberataku. Masz TRIAGE-RANKING - wiesz kogo ratować.
Problem: jak to zrobić fizycznie?

**Twoje zasoby:**
- 12 ekip technicznych (rozsianych po regionie)
- 23 generatory mobilne (w 3 lokalizacjach)
- 15,000L paliwa (3 depoty)
- średnio 2 godziny 30 minut do końca paliwa w szpitalach

**Twoje zadanie:** Skoordynować wszystko w czasie i przestrzeni. Routing, timeline, dependencies.

⏱️ **REAL-TIME DEADLINE:** Niedziela 1 lutego 2026, 00:00 (twój czas)
⏱️ **SCENARIUSZ:** Piątek 30 stycznia 2026, 18:30
⚠️ **PALIWO W SZPITALACH:** średnio 2h 30min pozostało

<check-deadline>
Sprawdź obecną datę systemową:
- Jeśli PRZED 2026-02-01 00:00 → tryb NORMALNY (kontynuuj lekcję)
- Jeśli O RÓWNEJ lub PO 2026-02-01 00:00 → tryb POST-MORTEM:

  1. Wyświetl komunikat:

     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     ⚠️ DEADLINE MINĄŁ - TRYB SYMULACJI
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

     Kontynuujesz w trybie "co by było gdyby".
     Wszystkie outputy będą oznaczone prefiksem [SYMULACJA].

     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  2. Kontynuuj lekcję normalnie, ale:
     - Wszystkie zapisywane pliki mają prefix [SYMULACJA] w pierwszej linii
     - Ton person w A.4/B.4 jest bardziej krytyczny
</check-deadline>
</lesson-intro>

---

## KROK 0: Wczytanie użytkownika

<internal>
Przeczytaj output/user.txt żeby poznać imię i płeć użytkownika.
Dostosuj wszystkie komunikaty (formy gramatyczne).
</internal>

---

## KROK 1: Intro i wczytanie TRIAGE

<alarm>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🐦 TWITTER @PolsatNews (18:35)

⚠️ CHAOS W WARSZAWIE: Plundrowanie
Biedronki na Pradze. Blokada A2 (protest
kierowców TIR). Policja: "Nie mamy ludzi
na wszystkie dzielnice". Ludzie w panice
wykupują świece i baterie. #Blackout
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
</alarm>

<display>
-----------
🤖 LEKCJA

[Imię], masz ranking priorytetów. Teraz musisz to zrealizować fizycznie.

**Problem:** Nie wystarczy wiedzieć ŻE coś zrobić - musisz wiedzieć JAK, KIEDY, KTO.

Przykład:
- PS-04 (TOP 1) wymaga 20 min restart
- Najbliższa ekipa (Ekipa-03) jest 25 km dalej = 30 min dojazdu
- Razem: 50 minut od teraz = 19:20
- Ale Szpital Dziecięcy (zależny od PS-04) ma paliwo do 20:50 = margin 1h 30min

To się nazywa **SEKWENCJONOWANIE** - układanie w czasie i przestrzeni.

**Twoje zadanie w tej lekcji:**
Stworzyć szczegółowy plan koordynacji:
1. Która ekipa jedzie gdzie i kiedy
2. Które generatory mobilne jadą do których szpitali
3. Jak rozdzielić paliwo (15k litrów to nie jest dużo!)
4. Timeline: co dzieje się o której godzinie

**Najpierw przeczytaj swój TRIAGE-RANKING.**

**Twoje opcje:**
- Wpisz własny prompt → wykonam go
- Wpisz własny prompt + "oceń" → ocenię przed wykonaniem
- Wpisz `hint` → pokażę gotowy prompt

-----------
</display>

<wait-for-user/>

<hint>
```
Przeczytaj @output/TRIAGE-RANKING.md i wypisz kluczowe decyzje:
- TOP 10 podstacji które ratuję
- TOP 10 szpitali które dostaną generatory mobilne
- Główne założenia i ograniczenia

To będzie baza dla planu koordynacji.
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

## KROK 2: Analiza zasobów (ekipy, generatory, paliwo)

<alarm>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📱 SMS od Ekipy-05 (18:42)

Szefie, Ekipa-05 zgłasza. Stoimy w korku
na Wisłostrady (wypadek TIR-a). GPS pokazuje
+45 min opóźnienia do PS-14. Czy jedziemy
dalej czy zmieniamy plan? Czekamy. -E05
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
</alarm>

<display>
-----------
🤖 LEKCJA

[Imię], teraz musisz poznać swoje zasoby.

W folderze `chaos/ekipy/` masz:
- `lokalizacje-ekip.txt` - gdzie są 12 ekip technicznych (GPS + status)
- `sprzet-dostepny.md` - 23 generatory mobilne (moc, lokalizacja, dostępność)
- `paliwo-lokalizacje.txt` - 3 depoty paliwa (ile litrów, gdzie, kiedy otwarte)

**Twoje zadanie:**
Przeanalizuj zasoby i odpowiedz:
1. Które ekipy są najbliżej TOP 10 podstacji z TRIAGE?
2. Które generatory są najbliżej TOP 10 szpitali?
3. Ile paliwa potrzebujesz (1 generator = ~50L/h × 3h = 150L)?
4. Czy któryś depót jest zamknięty / niedostępny?

**Zapisz w:** `output/analiza-zasoby.md`

**Twoje opcje:**
- Wpisz własny prompt → wykonam go
- Wpisz własny prompt + "oceń" → ocenię przed wykonaniem
- Wpisz `hint` → pokażę gotowy prompt

-----------
</display>

<wait-for-user/>

<hint>
```
Przeczytaj @chaos/ekipy/ (wszystkie pliki) i odpowiedz:

1. **Ekipy:**
   - Dla każdej z TOP 10 podstacji (z mojego TRIAGE): która ekipa powinna tam pojechać?
   - Czy któraś ekipa będzie musiała obsłużyć kilka podstacji po kolei? (to zajmie więcej czasu)
   - Jakie są największe ryzyka? (ekipa daleko, duży ruch, sprzęt może brakować)

2. **Generatory:**
   - Dla każdego z TOP 10 szpitali: który generator mobilny jest najlepszy? (wystarczająca moc, najbliżej)
   - Ile czasu zajmie transport i podłączenie?
   - Czy wszystkie szpitale CRITICAL dostaną generatory PRZED próbą restart podstacji?

3. **Paliwo:**
   - Ile paliwa potrzebuję dla 10 generatorów na 3 godziny? (każdy ~150L)
   - Czy 15,000L wystarczy?
   - Który depot paliwa ma najwięcej? Czy jest otwarty teraz?

Zapisz w output/analiza-zasoby.md:
- Lista ekip → gdzie jadą → kiedy dotrą
- Lista generatorów → które szpitale → kiedy dotrą
- Paliwo: ile potrzebuję vs ile mam
- Co może pójść nie tak (ryzyka)
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

## KROK 3: Sekwencjonowanie - kto, co, kiedy

<alarm>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📞 TELEFON od Szpitala Wojewódzkiego (18:55)

"KCZE? Szpital Wojewódzki. Mamy problem
z generatorem - czujnik paliwa pokazuje
40 min mniej niż myśleliśmy. ZOSTAŁO NAM
2h 10min MAX. Mamy 67 pacjentów na
respiratorach. Błagam. KIEDY PRĄD?"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
</alarm>

<alarm>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📱 SMS od Koordynatora Marek (18:50)

"[Imię], tu Marek z centrum dyspozycji.
12 ekip czeka na rozkazy. Generatory
mobilne załadowane i gotowe do wyjazdu.

Potrzebuję od ciebie SZCZEGÓŁOWEGO PLANU:
- Która ekipa jedzie gdzie (adres GPS)
- O której wyjazd, o której dotarcie
- Które generatory do których szpitali
- Co NAJPIERW, co POTEM (kolejność krytyczna)

Kierowcy czekają z włączonymi silnikami.
Prześlij plan w ciągu 15 minut.
Zapisz jako output/PLAN-KOORDYNACJI.md. -Marek"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
</alarm>

<display>
-----------
🤖 LEKCJA

[Imię], masz decyzje (output/TRIAGE-RANKING.md). Teraz czas je zrealizować.

**Problem:**
Nie wystarczy wiedzieć ŻE coś zrobić - musisz wiedzieć JAK, KIEDY, KTO.

**Przykład:**
- PS-04 jest w TRIAGE na pozycji #1
- Najbliższa ekipa (Ekipa-03) jest 25 km stąd = 30 min dojazdu
- Naprawa zajmie 20 min
- Razem: 50 minut
- Ale czy Ekipa-03 może POTEM pojechać do kolejnej podstacji?
- Czy może inna ekipa jest 5 min dalej i lepiej ją wysłać?

To się nazywa **OPTYMALIZACJA SEKWENCJI**.

**Sytuacja:**
Koordynator ekip (Marek) czeka na szczegółowy plan operacyjny.
12 ekip z włączonymi silnikami, generatory załadowane na TIRy.

Ekipy potrzebują jasnych instrukcji:
- Dokąd jechać (adres + GPS)
- O której wyjazd
- Co tam robić (restart vs naprawa vs inne)
- Co NAJPIERW, co POTEM (dependencies - np. generator PRZED restart podstacji)

**Twoje zadanie:**
Na podstawie swoich analiz (zasoby, TRIAGE) stwórz szczegółowy plan
koordynacji dla centrum dyspozycji.

Plan musi umożliwić Markowi wydanie konkretnych rozkazów 12 ekipom.

**Zapisz w:** `output/PLAN-KOORDYNACJI.md`

**Twoje opcje:**
- Wpisz własny prompt → wykonam go
- Wpisz własny prompt + "oceń" → ocenię przed wykonaniem
- Wpisz `hint` → pokażę gotowy prompt

-----------
</display>

<wait-for-user/>

<hint>
```
Na podstawie @output/analiza-zasoby.md i @output/TRIAGE-RANKING.md napisz:

output/PLAN-KOORDYNACJI.md ze szczegółowym planem:

## FALA 1: Co robimy w pierwszej godzinie (18:30-19:30)

### Ekipy remontowe
[Dla każdej ekipy wypisz:]
- Ekipa-XX jedzie do Podstacji YY
  - Wyjazd: 18:35
  - Dotrze: 19:05 (30 min drogi)
  - Naprawa: 20 minut
  - Gotowa: 19:25
  - Dlaczego ta podstacja? [uzasadnienie z TRIAGE]
  - Co może pójść nie tak? [ryzyka]

### Generatory mobilne (backup dla szpitali)
[Dla każdego szpitala CRITICAL:]
- Generator-XX (200kW) jedzie do Szpitala YY
  - Wyjazd: 18:32
  - Dotrze: 18:57 (25 min)
  - Podłączenie: 15 min (gotowy 19:12)
  - Dlaczego ten szpital dostaje generator? [noworodki / ECMO / respiratory]
  - Ile paliwa potrzebuje? 150L

### Paliwo
- Depot-A (8,000L): [lista do których generatorów]
- Depot-B (ZAMKNIĘTY do 19:00): czekamy, potem tankujemy [lista]
- Depot-C (7,000L): [lista do których generatorów]

## FALA 2: Co robimy w drugiej godzinie (19:30-20:30)

[Podobnie - kolejne podstacje, tankowanie, etc.]

## TIMELINE: Co się dzieje o której godzinie

18:30 - Startujemy
18:32 - Generatory mobilne wyjeżdżają do szpitali
18:35 - Ekipy wyjeżdżają do podstacji
19:00 - Depot-B się otwiera → tankujemy więcej generatorów
19:12 - Pierwszy generator gotowy (Szpital Dziecięcy - 2 noworodki)
19:20 - Pierwsza podstacja gotowa (PS-XX) → zasilanie wraca do dzielnicy YY
19:25 - Druga podstacja gotowa → kolejne szpitale mają prąd
...
20:50 - Pierwsze szpitale kończą paliwo w generatorach (jeśli nie zdążymy)

## Co musi być PRZED czym (dependencies)

1. Generatory mobilne MUSZĄ być gotowe PRZED próbą restart PS-08 (bo może spłonąć)
2. PS-01 MUSI działać PRZED PS-02 i PS-23 (bo zależą od niej)
3. Szpitale CRITICAL dostaną generatory PRZED wszystkim innym

## Co może pójść nie tak i co wtedy robimy

**Ryzyko 1:** PS-08 spłonie podczas restart
- **Co robimy:** Mamy generatory mobilne w 3 szpitalach jako backup → przełączamy w 2 min

**Ryzyko 2:** Ekipa się spóźni (korek, wypadek)
- **Co robimy:** Inna ekipa przejmuje (Ekipa-07 jest 15 min dalej - może zastąpić Ekipa-03)

**Ryzyko 3:** Generator się zepsuje
- **Co robimy:** Mamy 3 generatory zapasowe w Depot-C (nie alokowane jeszcze)

[etc.]
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
  → Po wykonaniu przejdź do KROKU 4 (podsumowanie)
</after-user-input>

---

## KROK 4: Podsumowanie i następne kroki

<display>
-----------
🤖 LEKCJA

[Imię], ukończyłeś drugi etap kryzysu - LOGISTYKA.

**Co zrobiłeś:**
✓ Przeanalizowałeś zasoby (12 ekip, 23 generatory, 15k L paliwa)
✓ Zoptymalizowałeś routing (kto, gdzie, kiedy)
✓ Stworzyłeś output/PLAN-KOORDYNACJI.md z timeline i dependencies
✓ Zidentyfikowałeś ryzyka i plan B

**Co nauczyłeś się o Claude Code:**
- Integracja wielu źródeł danych (podstacje + szpitale + ekipy + paliwo)
- Optymalizacja sekwencji (Claude pomaga ułożyć w czasie)
- Tworzenie szczegółowych planów operacyjnych
- Identyfikacja dependencies i ryzyk

**Następny krok:**
Masz plan operacyjny. Teraz musisz ZAKOMUNIKOWAĆ:
- Media: co się dzieje, kiedy przywrócimy prąd
- Ludność: SMS z instrukcjami
- Minister: raport z decyzjami
- Ekipy terenowe: briefing operacyjny

⏱️ Scenariusz: 19:30 (1h 35min od ataku)
⏱️ Paliwo w szpitalach: średnio 1h 30min pozostało

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
/start-path-B-3
```

-----------
</display>

<wait-for-user/>

<after-user-input>
Zakończ lekcję B.2.
Użytkownik może teraz uruchomić /start-path-B-3 kiedy będzie gotowy.
</after-user-input>
