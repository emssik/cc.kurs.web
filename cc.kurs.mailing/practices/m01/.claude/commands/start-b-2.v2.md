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
- 3 godziny 30 minut do końca paliwa w szpitalach

**Twoje zadanie:** Skoordynować wszystko w czasie i przestrzeni. Routing, timeline, dependencies.

⏱️ **REAL-TIME DEADLINE:** Niedziela 2 lutego 2026, 00:00 (twój czas)
⏱️ **SCENARIUSZ:** Piątek 30 stycznia 2026, 18:30
⚠️ **PALIWO W SZPITALACH:** 2h 30min pozostało

<check-deadline>
[Sprawdź datę systemową - jeśli po 2026-02-02 00:00 → tryb POST-MORTEM, wyświetl komunikat o tragedii]
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
Jeśli hint → wyświetl jako blok kodu
Jeśli własny prompt z "oceń" → OCEŃ
Jeśli własny prompt → WYKONAJ (przeczytaj TRIAGE-RANKING, wypisz decyzje)

Przejdź do KROKU 2.
</after-user-input>

---

## KROK 2: Analiza zasobów (ekipy, generatory, paliwo)

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

<hint-variant-a>
```
Przeczytaj @chaos/ekipy/ (wszystkie pliki) i przeanalizuj:

1. **Ekipy:**
   - Dla każdej z TOP 10 podstacji (z TRIAGE-RANKING): która ekipa jest najbliżej?
   - Oblicz czas dojazdu (GPS distance / 50 km/h średnio = czas)
   - Zidentyfikuj bottlenecki: czy jakaś ekipa musi obsłużyć 3+ podstacje?

2. **Generatory:**
   - Dla każdego z TOP 10 szpitali: który generator ma wystarczającą moc (kW)?
   - Który depot generatorów jest najbliżej szpitala?
   - Oblicz czas transportu (distance / 40 km/h = czas)

3. **Paliwo:**
   - Oblicz całkowite zapotrzebowanie: TOP 10 szpitali × 150L (3h × 50L/h) = ?
   - Czy 15,000L wystarczy?
   - Czy któryś depot jest zamknięty do 19:00?

Zapisz w output/analiza-zasoby.md:
- Tabela: Podstacja → Ekipa → Czas dojazdu
- Tabela: Szpital → Generator → Moc → Czas transportu
- Suma paliwa potrzebnego vs dostępnego
- Bottlenecki i ryzyka
```
</hint-variant-a>

<hint-variant-b>
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
</hint-variant-b>

<hint>
[Wyświetl odpowiedni wariant]
</hint>

<after-user-input>
Jeśli hint → wyświetl odpowiedni wariant jako blok kodu
Jeśli własny prompt z "oceń" → OCEŃ
Jeśli własny prompt → WYKONAJ (przeczytaj chaos/ekipy/, stwórz analiza-zasoby.md)

Przejdź do KROKU 3.
</after-user-input>

---

## KROK 3: Sekwencjonowanie - kto, co, kiedy

<display>
-----------
🤖 LEKCJA

[Imię], masz zasoby, masz priorytety. Teraz ułóż to w czasie.

**Problem sekwencjonowania:**
- Ekipa-03 może naprawić PS-04 (20 min) ale jest 30 min drogi = razem 50 min
- Ekipa-03 mogłaby POTEM pojechać do PS-06 (25 min naprawa + 15 min dojazd) = +40 min
- Razem: Ekipa-03 obsługuje 2 podstacje w 90 minut

Ale co jeśli Ekipa-07 jest 10 min od PS-06? Wtedy Ekipa-03 robi PS-04 a Ekipa-07 robi PS-06 RÓWNOLEGLE.
Czas: 50 min (zamiast 90 min sekwencyjnie).

To się nazywa **OPTYMALIZACJA**.

**Twoje zadanie:**
Na podstawie `output/analiza-zasoby.md` i `output/TRIAGE-RANKING.md` stwórz:

**PLAN-KOORDYNACJI.md** zawierający:
1. **FALA 1 (18:30-19:30):** Które ekipy gdzie jadą, które generatory do których szpitali
2. **FALA 2 (19:30-20:30):** Co się dzieje potem (kolejne podstacje, tankowanie paliwa)
3. **TIMELINE:** Co dzieje się o której godzinie (18:35, 19:00, 19:15, etc.)
4. **DEPENDENCIES:** Co musi się stać PRZED czym (np. generator PRZED restart podstacji)
5. **RYZYKA:** Co może pójść nie tak i plan B

**Twoje opcje:**
- Wpisz własny prompt → wykonam go
- Wpisz własny prompt + "oceń" → ocenię przed wykonaniem
- Wpisz `hint` → pokażę gotowy prompt

-----------
</display>

<wait-for-user/>

<hint-variant-a>
```
Na podstawie @output/analiza-zasoby.md i @output/TRIAGE-RANKING.md stwórz:

output/PLAN-KOORDYNACJI.md z następującą strukturą:

## FALA 1: Pierwsze 60 minut (18:30-19:30)

### Ekipy (podstacje)
[Dla każdej ekipy:]
- **Ekipa-XX:** 18:35 → wyjazd do PS-YY (30 min dojazd, 20 min naprawa, gotowe 19:25)
  - Podstacja: PS-YY
  - Zasoby potrzebne: [transformator / spawarka / etc.]
  - Ryzyko: [logika-bomba? pożar? opóźnienie?]
  - Po zakończeniu: jedzie do PS-ZZ (FALA 2)

### Generatory (szpitale - backup)
[Dla każdego szpitala CRITICAL:]
- **Generator-XX (200kW):** 18:32 → transport do Szpital YY (25 min transport, 15 min montaż, gotowy 19:12)
  - Priorytet: Backup PRZED próbą restart PS-ZZ
  - Paliwo: 150L z Depot-A

### Paliwo
- Depot-A: 8,000L → alokacja [lista generatorów]
- Depot-B: zamknięty do 19:00 → czekamy
- Depot-C: 7,000L → alokacja [lista generatorów]

## FALA 2: Godzina 19:30-20:30

[Podobna struktura - kolejne podstacje, tankowanie generatorów]

## TIMELINE (chronologicznie)

18:30 - Start operacji
18:32 - Wyjazd 6 generatorów do szpitali CRITICAL
18:35 - Wyjazd 8 ekip do TOP podstacji
19:00 - Depot-B otwarty → tankowanie dodatkowych generatorów
19:12 - Pierwszy generator gotowy (Szpital Dziecięcy)
19:20 - Pierwszy restart podstacji (PS-XX)
19:25 - Pierwsze zasilanie przywrócone (dzielnica YY)
...

## DEPENDENCIES (co musi być PRZED czym)

1. Generatory mobilne MUSZĄ być podłączone PRZED próbą restart PS-08 (logika-bomba)
2. PS-01 MUSI działać PRZED restart PS-02 i PS-23 (dependency)
3. Depot-B otwarty (19:00) PRZED tankowaniem Generatorów-15,16,17

## RYZYKA I PLAN B

- **Ryzyko:** PS-08 spłonie podczas restart (50% szans)
  **Plan B:** Generatory mobilne już podłączone w 3 szpitalach - przełączenie w 2 min

- **Ryzyko:** Ekipa-03 opóźniona (korek, wypadek)
  **Plan B:** Ekipa-07 jest 15 min dalej - może przejąć jeśli potrzeba

[etc. dla każdego głównego ryzyka]
```
</hint-variant-a>

<hint-variant-b>
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
</hint-variant-b>

<hint>
[Wyświetl odpowiedni wariant]
</hint>

<after-user-input>
Jeśli hint → wyświetl odpowiedni wariant jako blok kodu
Jeśli własny prompt z "oceń" → OCEŃ
Jeśli własny prompt → WYKONAJ (stwórz PLAN-KOORDYNACJI.md)

Po wykonaniu przejdź do KROKU 4 (podsumowanie).
</after-user-input>

---

## KROK 4: Podsumowanie i następne kroki

<display>
-----------
🤖 LEKCJA

[Imię], ukończył[eś/aś] drugi etap kryzysu - LOGISTYKA.

**Co [zrobiłeś/zrobiłaś]:**
✓ Przeanalizował[eś/aś] zasoby (12 ekip, 23 generatory, 15k L paliwa)
✓ Zoptymalizował[eś/aś] routing (kto, gdzie, kiedy)
✓ Stworzyłeś PLAN-KOORDYNACJI.md z timeline i dependencies
✓ Zidentyfikował[eś/aś] ryzyka i plan B

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
⏱️ Paliwo w szpitalach: 1h 30min pozostało

**Gotowy na kolejną lekcję?**

```
/start-b-3.v2
```

-----------
</display>

<wait-for-user/>

<after-user-input>
Zakończ lekcję B.2.
Użytkownik może teraz uruchomić /start-b-3.v2 kiedy będzie gotowy.
</after-user-input>
