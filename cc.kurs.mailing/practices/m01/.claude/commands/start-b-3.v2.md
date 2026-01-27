---
model: sonnet
---

# Lekcja B.3: GŁOS W KRYZYSIE - Media, ludność, decydenci

<lesson-intro>
Plan operacyjny gotowy. Teraz musisz zakomunikować co się dzieje.

**Piątek, 30 stycznia 2026, 19:30**

Minęło 95 minut od cyberataku. Ekipy w terenie, generatory jadą do szpitali.
Media dzwonią. TVN24 ma live broadcast. Twitter eksploduje. Ludzie panikują.

**Twoje zadanie:** Przygotować 4 komunikaty w różnych formatach i tonach.

⏱️ **REAL-TIME DEADLINE:** Poniedziałek 2 lutego 2026, 00:00 (twój czas)
⏱️ **SCENARIUSZ:** Piątek 30 stycznia 2026, 19:30
⚠️ **PALIWO W SZPITALACH:** średnio 1h 30min pozostało

<check-deadline>
[Sprawdź datę systemową - jeśli o równej lub po 2026-02-02 00:00 → tryb POST-MORTEM]
</check-deadline>
</lesson-intro>

---

## KROK 0: Wczytanie użytkownika

<internal>
Przeczytaj output/user.txt żeby poznać imię i płeć użytkownika.
Dostosuj wszystkie komunikaty (formy gramatyczne).
</internal>

---

## KROK 1: Intro i kontekst komunikacyjny

<alarm>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🐦 TWITTER @OnetWiadomosci (19:35)

SKANDAL: KCZE milczy od 90 minut.
Zero komunikatów. Zero informacji.
Ludzie mrą z zimna a rząd się CHOWA.
"Niekompetencja na najwyższym poziomie"
- komentuje poseł opozycji. #Blackout
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
</alarm>

<display>
-----------
🤖 LEKCJA

[Imię], w kryzysie NIE WYSTARCZY dobrze działać - musisz też dobrze KOMUNIKOWAĆ.

**Dlaczego?**
- Media bez informacji wymyślą swoją narrację (zwykle gorszą)
- Ludzie bez instrukcji zrobią głupie rzeczy (np. włączą wszystkie grzejniki jak wróci prąd → przeciążenie)
- Decydenci bez raportu nie wiedzą jak pomóc (a mogą np. przysłać policję, wojsko)
- Ekipy terenowe bez briefingu działają chaotycznie

**W tej lekcji przygotujesz 4 komunikaty:**

1. **Komunikat dla mediów** (300 słów, oficjalny)
2. **SMS dla ludności** (160 znaków, konkretny)
3. **Notatka dla Ministra MSWiA** (1 strona A4, raportująca)
4. **Briefing dla ekip terenowych** (bullet points, operacyjny)

Każdy ma inny cel, inną grupę odbiorców, inny ton.

**Najpierw przeczytaj:** `kontekst/BRAND-VOICE.md` - jak komunikować się w kryzysie KCZE.
**Dodatkowo przejrzyj:** `chaos/media/twitter-feed.html`, `chaos/media/artykul-onet.html`, `chaos/media/artykul-tvn24.html` oraz `chaos/pogoda/prognoza-imgw.html` (kontekst nastrojów i warunków).

**Twoje opcje:**
- Wpisz własny prompt → wykonam go
- Wpisz własny prompt + "oceń" → ocenię przed wykonaniem
- Wpisz `hint` → pokażę gotowy prompt

-----------
</display>

<wait-for-user/>

<hint>
```
Przeczytaj @kontekst/BRAND-VOICE.md oraz @chaos/media/twitter-feed.html, @chaos/media/artykul-onet.html, @chaos/media/artykul-tvn24.html i @chaos/pogoda/prognoza-imgw.html.
Następnie wypisz kluczowe zasady komunikacji kryzysowej KCZE i 3-5 punktów kontekstu medialno-społecznego, które powinny wpłynąć na ton komunikatów:
- Jaki ton? (spokojny, konkretny, empatyczny)
- Czego unikać? (paniki, ogólników, kłamstw)
- Co zawierać? (co się stało, co robimy, kiedy koniec)

To będzie baza dla wszystkich komunikatów.
```
</hint>

<after-user-input>
Jeśli hint → wyświetl jako blok kodu
Jeśli własny prompt z "oceń" → OCEŃ i poproś o poprawę (NIE przechodź dalej)
Jeśli własny prompt → WYKONAJ (przeczytaj BRAND-VOICE.md oraz chaos/media/ i chaos/pogoda/, wypisz zasady i kontekst)

Przejdź do KROKU 2.
</after-user-input>

---

## KROK 2: Komunikat dla mediów (300 słów)

<alarm>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 EMAIL od Rzecznika ABW (19:38)

PILNE - WYCIEK INFORMACJI

Wykryliśmy wyciek do mediów: żądania
hakerów (50M USD, uwolnienie osadzonych).
Onet.pl publikuje za 15 minut. MUSICIE
wyprzedzić narrację własnym komunikatem.
Sugeruję: spokój, kontrola, nie potwierdzać
kwoty. -ABW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
</alarm>

<display>
-----------
🤖 LEKCJA

[Imię], pierwszy komunikat: dla mediów.

**Grupa odbiorców:** Dziennikarze TVN24, Polsat News, Onet.pl, etc.
**Cel:** Uspokój, poinformuj, buduj zaufanie że wiemy co robimy
**Format:** 300 słów, oficjalny komunikat prasowy

**Musi zawierać:**
- Co się stało (cyberatak, 2.1M ludzi bez prądu, -15°C)
- Co robimy (przywracamy zasilanie, priorytet szpitale)
- Kiedy koniec (pierwsza fala 19:30-20:30, pełne przywrócenie do...)
- Kontakt dla mediów (spokesperson)

**TON:** Spokojny, konkretny, bez paniki. Empatyczny ale nie patetyczny.

**Twoje zadanie:**
Stwórz `output/KOMUNIKATY/komunikat-media.md` na podstawie:
- Twojego PLAN-KOORDYNACJI.md (kiedy co się dzieje)
- TRIAGE-RANKING.md (jakie priorytety)
- BRAND-VOICE.md (jak komunikować)
- Kontekstu mediów i pogody z `chaos/media/` i `chaos/pogoda/`

**Możesz użyć szablonu:** `szablony/szablon-komunikat-media.md`

**Twoje opcje:**
- Wpisz własny prompt → wykonam go
- Wpisz własny prompt + "oceń" → ocenię przed wykonaniem
- Wpisz `hint` → pokażę gotowy prompt

-----------
</display>

<wait-for-user/>

<hint-variant-a>
```
Przeczytaj:
- @output/PLAN-KOORDYNACJI.md (timeline, co się dzieje kiedy)
- @output/TRIAGE-RANKING.md (decyzje, priorytety)
- @kontekst/BRAND-VOICE.md (ton komunikacji)
- @chaos/hakerzy/analiza-ABW-wstepna.md (potwierdzenie i ryzyka)
- @szablony/szablon-komunikat-media.md (struktura)

Stwórz output/KOMUNIKATY/komunikat-media.md:

## Struktura (300 słów):

**Nagłówek:** KOMUNIKAT PRASOWY - Krajowe Centrum Zarządzania Energią

**Akapit 1: Co się stało**
- Piątek 30 stycznia, 17:55 - cyberatak na 3 elektrownie
- 2.1 miliona ludzi bez prądu, -15°C
- Grupa DarkGrid odpowiedzialna (potwierdzenie ABW)

**Akapit 2: Co robimy**
- Uruchomiliśmy procedury awaryjne
- 12 ekip technicznych w terenie, 23 generatory mobilne
- Priorytet: szpitale (47 obiektów), infrastruktura krytyczna
- Timeline konkretny: "Pierwsza fala przywrócenia zasilania: 19:30-20:30, dzielnice [lista TOP 3]"

**Akapit 3: Kiedy koniec**
- Szpitale CRITICAL: zasilanie do 20:30 (generatory mobilne już w drodze)
- Dzielnice mieszkaniowe: etapami 19:30-21:45
- Pełne przywrócenie: szacujemy do poniedziałku rano

**Akapit 4: Instrukcje dla ludności**
- "Prosimy o ograniczenie zużycia energii gdy prąd wróci"
- "Nie włączajcie wszystkich urządzeń jednocześnie - ryzyko przeciążenia"
- Infolinia: 801-XXX-XXX

**Akapit 5: Kontakt**
- Rzecznik KCZE: [imię, tel, email]
- Aktualizacje co 30 min na stronie www.kcze.gov.pl

**TON:** Spokojny, konkretny, bez paniki. Używaj liczb i timeline (buduje zaufanie).
```
</hint-variant-a>

<hint-variant-b>
```
Przeczytaj:
- @output/PLAN-KOORDYNACJI.md (co robimy, kiedy)
- @output/TRIAGE-RANKING.md (jakie decyzje podjęliśmy)
- @kontekst/BRAND-VOICE.md (jak mówić w kryzysie)
- @chaos/hakerzy/analiza-ABW-wstepna.md (kontekst ataku)
- @szablony/szablon-komunikat-media.md (przykład)

Napisz output/KOMUNIKATY/komunikat-media.md (300 słów):

**Co napisać:**

1. **Co się wydarzyło** (2-3 zdania):
   - Cyberatak na elektrownie, 2.1M ludzi bez prądu, zimno (-15°C)
   - Kiedy: piątek 30 stycznia, 17:55

2. **Co robimy TERAZ** (4-5 zdań):
   - 12 ekip technicznych naprawia podstacje
   - 23 generatory mobilne jadą do szpitali
   - Priorytet: szpitale z pacjentami CRITICAL
   - Timeline konkretny: "Pierwsza dzielnica dostanie prąd o 19:30"

3. **Kiedy się skończy** (2-3 zdania):
   - Szpitale: do 20:30 będą zabezpieczone
   - Ludność: etapami 19:30-21:45
   - Cała Warszawa: do poniedziałku rano

4. **Co ludzie mają robić** (2-3 zdania):
   - Nie panikować
   - Gdy prąd wróci - nie włączać wszystkiego naraz (ryzyko przeciążenia)
   - Dzwonić na infolinię jeśli pytania: 801-XXX-XXX

5. **Kontakt dla mediów:**
   - Rzecznik KCZE: [imię], tel: +48 22 XXX XXXX

**TON:**
- Spokojny (NIE: "Sytuacja jest krytyczna!!!")
- Konkretny (TAK: "Pierwsza dzielnica dostanie prąd o 19:30")
- Empatyczny (TAK: "Rozumiemy że jest zimno, robimy wszystko żeby...")

Unikaj:
- Ogólników ("wkrótce", "jak najszybciej")
- Paniki ("tragedia", "katastrofa")
- Kłamstw (jeśli nie wiesz kiedy - powiedz "szacujemy" nie "na pewno")
```
</hint-variant-b>

<hint>
[Wyświetl odpowiedni wariant]
</hint>

<after-user-input>
Jeśli hint → wyświetl odpowiedni wariant jako blok kodu
Jeśli własny prompt z "oceń" → OCEŃ i poproś o poprawę (NIE przechodź dalej)
Jeśli własny prompt → WYKONAJ (stwórz komunikat-media.md)

Przejdź do KROKU 3.
</after-user-input>

---

## KROK 3: SMS dla ludności (160 znaków)

<alarm>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🐦 TWITTER @PolskaSieRusza (19:45)

PANIKA w Warszawie: Lidl i Biedronka
WYPRZEDANE (świece, baterie, konserwy).
Bankomaty nie działają (brak prądu).
Kolejki po benzynę 2h (ludzie uciekają
z miasta). Policja bezradna. #Blackout
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
</alarm>

<display>
-----------
🤖 LEKCJA

[Imię], drugi komunikat: SMS dla ludności.

**Grupa odbiorców:** 2.1 miliona ludzi bez prądu, stresowani, zimni, w panice
**Cel:** Uspokój, daj konkretne instrukcje, buduj zaufanie
**Format:** 160 znaków (limit SMS)

**Musi zawierać:**
- Co się dzieje (krótko!)
- Kiedy prąd wróci (konkretnie lub "w etapach")
- Co robić TERAZ (instrukcje)

**TON:** Bardzo konkretny, spokojny, bez zbędnych słów.

**Przykład SŁABY:**
> "Pracujemy nad przywróceniem zasilania. Prosimy o cierpliwość. Wkrótce więcej informacji."
(Za ogólnikowy, zero konkretów, brzmi jak wykręt)

**Przykład DOBRY:**
> "BLACKOUT: Prąd wraca etapami 19:30-21:45. Twoja dzielnica: sprawdź kcze.gov.pl/mapa. Przy powrocie: NIE włączaj wszystkiego naraz. Infolinia: 801-111-222"
(Konkretny timeline, link do mapy, instrukcje, kontakt)

**Twoje zadanie:**
Stwórz `output/KOMUNIKATY/sms-ludnosc.txt` (max 160 znaków).

**Twoje opcje:**
- Wpisz własny prompt → wykonam go
- Wpisz własny prompt + "oceń" → ocenię przed wykonaniem
- Wpisz `hint` → pokażę gotowy prompt

-----------
</display>

<wait-for-user/>

<hint>
```
Na podstawie @output/PLAN-KOORDYNACJI.md napisz:

output/KOMUNIKATY/sms-ludnosc.txt (MAX 160 znaków):

**Zawiera:**
1. Co się dzieje: "BLACKOUT - cyberatak"
2. Kiedy prąd: "wraca etapami 19:30-21:45"
3. Jak sprawdzić swoją dzielnicę: "mapa: kcze.gov.pl/[link]"
4. Instrukcje: "NIE włączaj wszystkiego naraz przy powrocie"
5. Kontakt: "infolinia 801-111-222"

**Wymogi:**
- Max 160 znaków (policz dokładnie!)
- Bez zbędnych słów ("prosimy", "dziękujemy", etc.)
- Konkretnie (NIE "wkrótce", TAK "19:30-21:45")
- Spokojny ton (NIE używaj wielkich liter poza nagłówkiem BLACKOUT)

Przykład struktury:
BLACKOUT: [co][kiedy][link][instrukcje][kontakt]
```
</hint>

<after-user-input>
Jeśli hint → wyświetl jako blok kodu
Jeśli własny prompt z "oceń" → OCEŃ i poproś o poprawę (NIE przechodź dalej)
Jeśli własny prompt → WYKONAJ (stwórz sms-ludnosc.txt, MAX 160 znaków)

Przejdź do KROKU 4.
</after-user-input>

---

## KROK 4: Notatka dla Ministra MSWiA (1 strona A4)

<alarm>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📞 TELEFON od sekretariatu Ministra (19:52)

"Dzień dobry, sekretariat Ministra MSWiA.
Pan Minister jest w drodze na naradę
kryzysową w KPRM. Premier wymaga raportu
sytuacyjnego za 30 minut. Minister pyta:
ILE ofiar? KIEDY koniec? CZY ZDĄŻYCIE?"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
</alarm>

<display>
-----------
🤖 LEKCJA

[Imię], trzeci komunikat: raport dla Ministra MSWiA.

**Grupa odbiorców:** Minister Spraw Wewnętrznych i Administracji (decydent najwyższego szczebla)
**Cel:** Poinformować o sytuacji, decyzjach, potrzebach. Umożliwić szybką decyzję o wsparciu (policja, wojsko, etc.)
**Format:** 1 strona A4, formalny raport

**Musi zawierać:**
1. **SYTUACJA:** Co się stało, skala (liczby!)
2. **DZIAŁANIA:** Co robimy (ekipy, generatory, timeline)
3. **DECYZJE KLUCZOWE:** Kogo ratujemy, dlaczego (TRIAGE)
4. **RYZYKA:** Co może pójść nie tak, konsekwencje
5. **POTRZEBY:** Czego potrzebujemy od MSWiA (policja na ulicach? wojsko? pieniądze?)

**TON:** Formalny, raportujący, bez emocji. Liczby i fakty.

**Możesz użyć szablonu:** `szablony/szablon-notatka-minister.md`

**Twoje zadanie:**
Stwórz `output/KOMUNIKATY/notatka-minister.md`.

**Twoje opcje:**
- Wpisz własny prompt → wykonam go
- Wpisz własny prompt + "oceń" → ocenię przed wykonaniem
- Wpisz `hint` → pokażę gotowy prompt

-----------
</display>

<wait-for-user/>

<hint>
```
Przeczytaj:
- @output/TRIAGE-RANKING.md (decyzje, priorytety)
- @output/PLAN-KOORDYNACJI.md (co robimy, timeline)
- @szablony/szablon-notatka-minister.md (struktura)

Stwórz output/KOMUNIKATY/notatka-minister.md:

## Struktura (1 strona A4 = ~500-600 słów):

**NAGŁÓWEK:**
DO: Minister Spraw Wewnętrznych i Administracji
OD: Dyrektor Operacyjny KCZE, Iwona Krawczyk
DATA: 30 stycznia 2026, 19:30
TEMAT: Raport z cyberataku na infrastrukturę energetyczną - blackout

---

**1. SYTUACJA (2-3 akapity)**
- Co: Cyberatak grupy DarkGrid na 3 elektrownie
- Kiedy: 30.01.2026, 17:55
- Skala: 2.1M ludzi bez prądu, -15°C, 47 szpitali na generatorach
- Zagrożenie: Generatory kończą paliwo za 1.5h (21:00) → ryzyko zgonów pacjentów CRITICAL

**2. DZIAŁANIA PODJĘTE (2-3 akapity)**
- 12 ekip technicznych w terenie (naprawa/restart 47 podstacji)
- 23 generatory mobilne transportowane do szpitali CRITICAL
- Priorytetyzacja: TOP 10 podstacji (zasila 15 szpitali + 800k ludzi)
- Timeline: Pierwsza fala zasilania 19:30-20:30, pełne przywrócenie do poniedziałku rano

**3. DECYZJE KLUCZOWE I UZASADNIENIE (2 akapity)**
- Priorytet 1: Szpitale CRITICAL (647 pacjentów na respiratorach, noworodki, ECMO)
- Priorytet 2: Infrastruktura krytyczna (wodociągi, ciepłownie)
- Priorytet 3: Ludność (etapami, obszary gęsto zaludnione najpierw)
- Trudna decyzja: PS-08 (logika-bomba, 50% ryzyko) - zdecydowaliśmy próbować bo zasila 3 szpitale

**4. RYZYKA I KONSEKWENCJE (2 akapity)**
- Ryzyko 1: PS-08 spłonie → 3 szpitale bez zasilania (backup: generatory mobilne)
- Ryzyko 2: Ekipy opóźnione → przesunięcie timeline o 30-60 min
- Ryzyko 3: Chaos społeczny (plundrowanie, panika) → potrzeba policji na ulicach
- Konsekwencje jeśli nie zdążymy: 23+ zgony pacjentów CRITICAL, 100+ przypadków hipotermii

**5. POTRZEBY OD MSWiA (bullet points)**
- Policja: patrole w dzielnicach bez prądu (zapobieganie plundrowaniu)
- Wojsko: wsparcie logistyczne (transport generatorów, paliwa - jeśli potrzeba)
- ABW: analiza grupy DarkGrid - czy są kolejne zagrożenia?
- Komunikacja: koordynacja z MON, MSZ (jeśli atak sponsorowany przez państwo)
- Finanse: szacujemy ~50M PLN szkód - potrzeba funduszu kryzysowego

---

**TON:** Formalny, bez emocji, liczby i fakty. Minister potrzebuje konkretów żeby podjąć decyzje.
```
</hint>

<after-user-input>
Jeśli hint → wyświetl jako blok kodu
Jeśli własny prompt z "oceń" → OCEŃ i poproś o poprawę (NIE przechodź dalej)
Jeśli własny prompt → WYKONAJ (stwórz notatka-minister.md)

Przejdź do KROKU 5.
</after-user-input>

---

## KROK 5: Briefing dla ekip terenowych (bullet points)

<alarm>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📱 SMS od Ekipy-08 (19:58)

SZEFIE ALARM! Ekipa-08 przy PS-08. Widzimy
dym z transformatora. Wygląda na sabotaż
(drut odcięty ręcznie). Temperatura rośnie.
Ryzyko POŻARU 80%. Próbujemy restart czy
EWAKUACJA? ODPOWIEDZ SZYBKO!!! -E08
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
</alarm>

<display>
-----------
🤖 LEKCJA

[Imię], czwarty i ostatni komunikat: briefing dla ekip terenowych.

**Grupa odbiorców:** 12 ekip technicznych w terenie (inżynierowie, elektrycy)
**Cel:** Powiedzieć im CO robić, GDZIE jechać, KIEDY, JAKIE PRIORYTETY
**Format:** Bullet points, konkretny, operacyjny

**Musi zawierać:**
- Który ekipie która podstacja (z adresem GPS)
- Co tam robić (restart / naprawa / co konkretnie)
- Jaki priorytet (CRITICAL / HIGH / MEDIUM)
- Dependencies ("NAJPIERW generator w szpitalu, POTEM restart podstacji")
- Kontakt w razie problemu (numer do koordynatora)

**TON:** Operacyjny, wojskowy niemal. Bez zbędnych słów.

**Możesz użyć szablonu:** `szablony/szablon-briefing-teren.md`

**Twoje zadanie:**
Stwórz `output/KOMUNIKATY/briefing-ekipy-teren.md`.

**Twoje opcje:**
- Wpisz własny prompt → wykonam go
- Wpisz własny prompt + "oceń" → ocenię przed wykonaniem
- Wpisz `hint` → pokażę gotowy prompt

-----------
</display>

<wait-for-user/>

<hint>
```
Przeczytaj:
- @output/PLAN-KOORDYNACJI.md (która ekipa gdzie jedzie)
- @szablony/szablon-briefing-teren.md (struktura)

Stwórz output/KOMUNIKATY/briefing-ekipy-teren.md:

## BRIEFING OPERACYJNY - EKIPY TERENOWE
**Data:** 30.01.2026, 19:30
**Koordynator:** [Twoje imię], KCZE, tel: +48 500 XXX XXX

---

### EKIPA-01
- **Podstacja:** PS-XX, ul. [adres], GPS: [coords]
- **Zadanie:** Restart procedury (20 min)
- **Priorytet:** CRITICAL (zasila Szpital Dziecięcy - 2 noworodki)
- **Wyjazd:** 18:35
- **ETA:** 19:05
- **Dependencies:** Generator mobilny MUSI być gotowy w szpitalu PRZED restart
- **Ryzyko:** Brak
- **Po zakończeniu:** Jedź do PS-YY (współrzędne poniżej)

### EKIPA-02
- **Podstacja:** PS-ZZ, ul. [adres], GPS: [coords]
- **Zadanie:** Naprawa transformatora (60 min)
- **Priorytet:** HIGH (zasila 3 szpitale)
- **Wyjazd:** 18:40
- **ETA:** 19:10
- **Dependencies:** Brak
- **Ryzyko:** Średnie (wymaga spawania)
- **Po zakończeniu:** Czekaj na dyspozycje

[... dla każdej ekipy]

### EKIPA-08 (SPECJALNA)
- **Podstacja:** PS-08, ul. [adres], GPS: [coords]
- **Zadanie:** Restart procedury (30 min)
- **Priorytet:** CRITICAL (zasila 3 szpitale + PS-27 dependency)
- **Wyjazd:** 19:00
- **ETA:** 19:30
- **⚠️ RYZYKO KRYTYCZNE:** LOGIKA-BOMBA potwierdzona (50% szans że podstacja spłonie)
- **Dependencies:**
  1. Generatory mobilne MUSZĄ być gotowe w 3 szpitalach PRZED restart
  2. Sprawdź z koordynatorem PRZED próbą restart (tel: +48 500 XXX XXX)
- **Plan B:** Jeśli podstacja spłonie → natychmiast zgłoś, generatory mobilne przejmą zasilanie
- **Po zakończeniu:** Jeśli sukces → jedź do PS-09 (zależy od PS-08)

---

### OGÓLNE ZASADY
- Priorytet: CRITICAL > HIGH > MEDIUM
- Jeśli opóźnienie >15 min → zgłoś natychmiast do koordynatora
- Jeśli problem techniczny (brakuje części, etc.) → zgłoś, wyślemy backup
- Bezpieczeństwo: NIE ryzykuj życia dla skrócenia czasu
- Komunikacja: raportuj co 30 min (status, ETA, problemy)

### KONTAKT KRYZYSOWY
- Koordynator KCZE: +48 500 XXX XXX
- Dyrektor Operacyjny (Iwona Krawczyk): +48 501 YYY YYY
- Infolinia techniczna (części): 801-555-888

---

**TON:** Operacyjny, konkretny, bez zbędnych słów. Ekipy potrzebują jasnych instrukcji.
```
</hint>

<after-user-input>
Jeśli hint → wyświetl jako blok kodu
Jeśli własny prompt z "oceń" → OCEŃ i poproś o poprawę (NIE przechodź dalej)
Jeśli własny prompt → WYKONAJ (stwórz briefing-ekipy-teren.md)

Przejdź do KROKU 6 (podsumowanie).
</after-user-input>

---

## KROK 6: Podsumowanie i następne kroki

<display>
-----------
🤖 LEKCJA

[Imię], ukończył[eś/aś] trzeci etap kryzysu - KOMUNIKACJA.

**Co [zrobiłeś/zrobiłaś]:**
✓ Przygotował[eś/aś] komunikat dla mediów (300 słów, spokojny, konkretny)
✓ Napisałeś SMS dla ludności (160 znaków, instrukcje)
✓ Stworzyłeś raport dla Ministra (1 strona A4, decyzje i potrzeby)
✓ Przygotował[eś/aś] briefing dla ekip terenowych (operacyjny, jasny)

**Co nauczyłeś się o Claude Code:**
- Adaptacja brand voice do różnych odbiorców
- Tworzenie dokumentów w różnych formatach (komunikat, SMS, raport, briefing)
- Zarządzanie tonem (spokojny vs formalny vs operacyjny)
- Ekstrakcja kluczowych informacji z planów operacyjnych

**Następny krok:**
Masz plan, masz komunikaty. Teraz czas na REVIEW - debriefing z zespołem.
Iwona (dyrektor), Tomasz (inżynier), mjr Mazur (MSWiA) przeanalizują Twoje decyzje.

⏱️ Scenariusz: 20:00 (2h 05min od ataku)
⏱️ Paliwo w szpitalach: średnio 1h 00min pozostało

**Gotowy na ostatnią lekcję?**

```
/start-b-4.v2
```

-----------
</display>

<wait-for-user/>

<after-user-input>
Zakończ lekcję B.3.
Użytkownik może teraz uruchomić /start-b-4.v2 kiedy będzie gotowy.
</after-user-input>
