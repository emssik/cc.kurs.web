---
model: sonnet
---

# Lekcja A.3: GŁOS W KRYZYSIE - Media, ludność, decydenci

<lesson-intro>
Plan operacyjny gotowy. Teraz musisz zakomunikować co się dzieje.

**Piątek, 30 stycznia 2026, 19:30**

Minęło 95 minut od cyberataku. Ekipy w terenie, generatory jadą do szpitali.
Media dzwonią. TVN24 ma live broadcast. Twitter eksploduje. Ludzie panikują.

**Twoje zadanie:** Przygotować 4 komunikaty w różnych formatach i tonach.

⏱️ **REAL-TIME DEADLINE:** Niedziela 1 lutego 2026, 00:00 (twój czas)
⏱️ **SCENARIUSZ:** Piątek 30 stycznia 2026, 19:30
⚠️ **PALIWO W SZPITALACH:** średnio 1h 30min pozostało

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

<alarm>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 EMAIL od Rzecznika Prasowego Anna Kowalska (19:38)

PILNE - KONFERENCJA PRASOWA ZA 30 MIN

[Imię], tu Anna Kowalska, rzecznik KCZE.

TVN24, Polsat News, Onet - wszyscy dzwonią.
Twitter eksploduje (#Blackout 89k tweetów).
Opozycja krzyczy "niekompetencja".

Dyrektor zdecydowała: konferencja prasowa
za 30 minut. JA będę czytać komunikat.
TY musisz go napisać.

Potrzebuję:
- Komunikatu prasowego (300 słów MAX)
- Który wyjaśni co się stało
- Uspokoi ludzi (bez paniki!)
- Pokaże że wiemy co robimy
- Da konkretny timeline (kiedy prąd wróci)

Dziennikarze będą zadawać trudne pytania:
"Ile ofiar?", "Kiedy DOKŁADNIE?", "Czy rząd
kontroluje sytuację?". Komunikat musi
dać odpowiedzi.

Prześlij w ciągu 15 minut.
Zapisz jako output/KOMUNIKATY/komunikat-media.md. -Anna

P.S. Sprawdź BRAND-VOICE.md - mamy zasady
jak komunikować się w kryzysie.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
</alarm>

<display>
-----------
🤖 LEKCJA

[Imię], w kryzysie NIE WYSTARCZY dobrze działać - musisz też dobrze KOMUNIKOWAĆ.

**Dlaczego?**
- Media bez informacji wymyślą swoją narrację (zwykle gorszą)
- Twitter bez faktów tworzy panikę i fake news
- Opozycja bez transparentności krzyczy "niekompetencja"

**Sytuacja:**
Anna Kowalska (rzecznik prasowy KCZE) za 30 minut będzie czytać twój
komunikat na konferencji prasowej.

Sala: 50 dziennikarzy + kamery (live broadcast TVN24, Polsat, TVP).

Dziennikarze będą pytać:
- "Kiedy DOKŁADNIE wróci prąd?"
- "Ile osób może umrzeć w szpitalach?"
- "Czy rząd kontroluje sytuację?"
- "Dlaczego tak długo milczeliście?"

**Twoje zadanie:**
Napisz komunikat prasowy dla Anny (300 słów MAX).

Komunikat musi:
- Wyjaśnić co się stało
- Pokazać że wiemy co robimy (konkretny plan, timeline)
- Jasno rozróżnić: zabezpieczenie szpitali przed 21:45 vs pełne przywrócenie etapami do poniedziałku rano
- Uspokoić ludzi (bez paniki, empatyczny ton)
- Przygotować Annę na trudne pytania

**Kontekst:**
- Przeczytaj `kontekst/BRAND-VOICE.md` - jak KCZE komunikuje się w kryzysie
- Użyj danych z `output/PLAN-KOORDYNACJI.md` (timeline) i `output/TRIAGE-RANKING.md` (priorytety)

**Zapisz w:** `output/KOMUNIKATY/komunikat-media.md`
(Jeśli folder output/KOMUNIKATY/ nie istnieje - utwórz go)

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
- Szpitale CRITICAL: zabezpieczenie zasilania przed 21:45 (generatory mobilne w drodze)
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

<alarm>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📞 TELEFON od Alert RCB (19:45)

"Tu Rządowe Centrum Bezpieczeństwa. Mamy
system RCB-Alert gotowy do wysłania SMS
do 2.1 miliona ludzi bez prądu.

Potrzebuję od was TREŚCI SMS (MAX 160 znaków).

Uwaga: ludzie są w PANICE. Twitter pełen
fake news ("elektrownia wybuchła", "prądu
nie będzie tydzień", "Rosjanie atakują").

SMS musi:
- Uspokoić
- Dać konkretne informacje (kiedy prąd)
- Powiedzieć co robić (instrukcje)

160 ZNAKÓW MAX. Każdy znak się liczy.

Prześlij treść w ciągu 10 minut - wysyłamy
zaraz po konferencji prasowej.
Zapisz jako output/KOMUNIKATY/sms-ludnosc.txt. -RCB"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
</alarm>

<display>
-----------
🤖 LEKCJA

[Imię], najkrótszy komunikat - ale może najważniejszy.

**Kontekst:**
RCB-Alert może wysłać SMS do 2.1 miliona ludzi jednocześnie.

**Problem:**
Limit SMS: 160 znaków. Musisz w 160 znakach:
- Uspokoić ludzi (Twitter pełen paniki i fake news)
- Powiedzieć kiedy prąd wróci (konkretnie!)
- Dać instrukcje (co robić gdy prąd wróci)

**Przykłady:**

❌ SŁABY (ogólnikowy, zero konkretów):
"Pracujemy nad przywróceniem zasilania. Prosimy o cierpliwość. Wkrótce więcej informacji."

✅ DOBRY (konkretny timeline, instrukcje, link):
"BLACKOUT: Prąd wraca 19:30-21:45 etapami. Sprawdź dzielnicę: kcze.gov.pl/mapa NIE włączaj wszystkiego naraz. Info: 801-111-222"
(154 znaki)

**Twoje zadanie:**
Napisz SMS który:
- Uspokoi 2.1M ludzi w panice
- Da konkretny timeline (z twojego output/PLAN-KOORDYNACJI.md)
- Powie co robić gdy prąd wróci (żeby nie przeciążyć sieci)

**Limit: 160 znaków** (policz dokładnie!)

**Zapisz w:** `output/KOMUNIKATY/sms-ludnosc.txt`

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

## KROK 4: Notatka dla Ministra MSWiA (1 strona A4)

<alarm>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 EMAIL od sekretariatu Ministra MSWiA (19:52)

PILNE - NARADA KRYZYSOWA KPRM

[Imię], tu sekretariat Ministra Spraw
Wewnętrznych i Administracji.

Za 40 minut narada kryzysowa w Kancelarii
Premiera. Uczestniczą:
- Premier
- Minister Obrony Narodowej
- Minister Zdrowia
- Szef ABW
- Komendant Główny Policji

Minister potrzebuje RAPORTU SYTUACYJNEGO
(1 strona A4 MAX).

Premier będzie zadawał pytania:
- "Ile ofiar?"
- "Kiedy DOKŁADNIE koniec?"
- "Czy zdążycie?"
- "Czego potrzebujecie?"

Minister musi mieć odpowiedzi. Na podstawie
raportu podejmie decyzję czy wysłać:
- Policję (patrole w dzielnicach bez prądu)
- Wojsko (wsparcie logistyczne)
- Fundusz kryzysowy (pieniądze na naprawy)

1 STRONA A4. Konkretnie, liczby, fakty.

Prześlij w ciągu 20 minut.
Zapisz jako output/KOMUNIKATY/notatka-minister.md. -Sekretariat MSWiA

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
</alarm>

<display>
-----------
🤖 LEKCJA

[Imię], najważniejszy dokument dnia.

**Kontekst:**
Za 40 minut narada kryzysowa w KPRM (Kancelaria Premiera).

Obecni:
- Premier (podejmuje decyzję o wsparciu)
- MON (wojsko?)
- Zdrowia (szpitale?)
- ABW (śledztwo?)
- Policja (patrole?)

**Sytuacja:**
Minister MSWiA będzie raportował Premierowi o sytuacji.
Na podstawie twojego raportu.

Premier będzie pytał:
- "Ile ofiar może być?"
- "Kiedy DOKŁADNIE przywrócicie zasilanie?"
- "Czy sytuacja pod kontrolą?"
- "Czego potrzebujecie żeby zdążyć?"

**Twoje zadanie:**
Napisz raport sytuacyjny dla Ministra (1 strona A4 MAX).

Raport musi:
- Przedstawić skalę kryzysu (liczby!)
- Wyjaśnić co robicie (plan, timeline, decyzje)
- Zidentyfikować ryzyka (co może pójść nie tak)
- Powiedzieć czego potrzebujecie od MSWiA (policja? wojsko? pieniądze?)

Raport będzie podstawą do podjęcia decyzji o wsparciu.

**TON:** Formalny, raportujący, bez emocji. Premier potrzebuje faktów, nie patosu.

**Zapisz w:** `output/KOMUNIKATY/notatka-minister.md`

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
- Zagrożenie: Generatory kończą paliwo za 1.5h (ok. 21:00, część do 21:45) → ryzyko zgonów pacjentów CRITICAL

**2. DZIAŁANIA PODJĘTE (2-3 akapity)**
- 12 ekip technicznych w terenie (naprawa/restart 47 podstacji)
- 23 generatory mobilne transportowane do szpitali CRITICAL
- Priorytetyzacja: TOP 10 podstacji (zasila 15 szpitali + 800k ludzi)
- Timeline: Pierwsza fala zasilania 19:30-20:30, zabezpieczenie szpitali przed 21:45, pełne przywrócenie do poniedziałku rano

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
  → Po wykonaniu przejdź do KROKU 5
</after-user-input>

---

## KROK 5: Briefing dla ekip terenowych (bullet points)

<alarm>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📱 SMS od Ekipy-08 (19:58)

SZEFIE ALARM! Ekipa-08 przy PS-08.
Widzimy dym z transformatora. Wygląda
na sabotaż (drut odcięty ręcznie).
Temperatura rośnie. RYZYKO POŻARU 80%.

Próbujemy restart czy EWAKUACJA?

ODPOWIEDZ SZYBKO!!!
Mamy 5 minut do decyzji. -E08

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
</alarm>

<alarm>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📞 TELEFON od Koordynatora Marek (20:00)

"[Imię], tu Marek. Mamy problem.

Ekipa-05 stoi w korku na Wisłostradzie
(+45 min opóźnienia). Ekipa-08 zgłasza
sabotaż w PS-08 (ryzyko pożaru). Ekipa-11
pyta czy mają jechać do PS-20 (Kabaty)
czy czekać na dyspozycje.

12 ekip w terenie. Każda dostała kawałek
planu ale nikt nie widzi całości. Pytają:
- Co NAJPIERW?
- Co POTEM?
- Co jeśli coś pójdzie nie tak?

Potrzebuję OPERACYJNEGO BRIEFINGU dla ekip.

Dokument który:
- Powie każdej ekipie CO robić, GDZIE, KIEDY
- Wyjaśni PRIORYTETY (co CRITICAL, co może poczekać)
- Pokaże ZALEŻNOŚCI (co musi być PRZED czym)
- Da NUMERY KONTAKTOWE (do kogo dzwonić w razie problemu)

Wojskowy styl. Bullet points. Zero zbędnych słów.

Prześlij briefing - rozesłę do wszystkich ekip.
Zapisz jako output/KOMUNIKATY/briefing-ekipy-teren.md. -Marek"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
</alarm>

<display>
-----------
🤖 LEKCJA

[Imię], ekipy w terenie potrzebują JASNYCH ROZKAZÓW.

**Problem:**
12 ekip pracuje jednocześnie. Każda widzi tylko swój kawałek.
Nikt nie widzi całości. To prowadzi do chaosu:
- Ekipa-05 stoi w korku (nie wie czy czekać czy jechać inną drogą)
- Ekipa-08 widzi sabotaż (nie wie czy ryzykować restart)
- Ekipa-11 czeka na dyspozycje (nie wie co robić)

**Sytuacja:**
Koordynator Marek prosi o operacyjny briefing dla 12 ekip.

Briefing musi:
- Powiedzieć każdej ekipie DOKĄD jechać (adres + GPS)
- Powiedzieć CO tam robić (restart vs naprawa vs co konkretnie)
- Wyjaśnić PRIORYTETY (co CRITICAL, co może poczekać)
- Pokazać ZALEŻNOŚCI (np. "generator MUSI być gotowy PRZED restart PS-08")
- Dać KONTAKT w razie problemu (do kogo dzwonić)

**TON:**
Operacyjny, wojskowy. Ekipy w stresie, mało czasu, potrzebują
jasnych instrukcji. Zero zbędnych słów.

**Twoje zadanie:**
Stwórz operacyjny briefing dla 12 ekip terenowych.

**Zapisz w:** `output/KOMUNIKATY/briefing-ekipy-teren.md`

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
**Data:** 30.01.2026, 20:00
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
  → Po wykonaniu przejdź do KROKU 6 (podsumowanie)
</after-user-input>

---

## KROK 6: Podsumowanie i następne kroki

<display>
-----------
🤖 LEKCJA

[Imię], ukończyłeś trzeci etap kryzysu - KOMUNIKACJA.

**Co zrobiłeś:**
✓ Przygotowałeś komunikat dla mediów (300 słów, spokojny, konkretny)
✓ Napisałeś SMS dla ludności (160 znaków, instrukcje)
✓ Stworzyłeś raport dla Ministra (1 strona A4, decyzje i potrzeby)
✓ Przygotowałeś briefing dla ekip terenowych (operacyjny, jasny)

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

---

**Zarządzanie kontekstem:**
Zanim uruchomisz następną lekcję, sprawdź swój kontekst:

1. Sprawdź ile kontekstu zużyłeś: `/context`
2. (Opcjonalnie) Skompaktuj historię: `/compact`
3. Wyczyść kontekst przed następną lekcją: `/clear`

Czyszczenie kontekstu zapobiega pomieszaniu instrukcji z różnych lekcji
i optymalizuje koszty tokenów.

---

**Gotowy na ostatnią lekcję?**

```
/start-path-A-4
```

-----------
</display>

<wait-for-user/>

<after-user-input>
Zakończ lekcję A.3.
Użytkownik może teraz uruchomić /start-path-A-4 kiedy będzie gotowy.
</after-user-input>
