# BLACKOUT - Narodowy Kryzys Energetyczny

## SYTUACJA

**Piątek, 30 stycznia 2026, 17:55**

Trzy główne elektrownie w Polsce zostały zhakowane i wyłączone przez grupę DarkGrid. 2.1 miliona ludzi pozostało bez prądu. Temperatura na dworze: -15°C. 47 szpitali działa na generatorach rezerwowych - paliwo starczy na maksymalnie 4 godziny (do ~22:00).

**Ty jesteś:** Koordynator operacyjny w Krajowym Centrum Zarządzania Energią (KCZE), bezpośrednio odpowiedzialny za przywrócenie zasilania w trybie kryzysowym.

**Twoja misja:** Przywrócić zasilanie do priorytetowych obiektów (szpitale, infrastruktura krytyczna) zanim generatory w szpitalach przestaną działać.

## ZASOBY

**Podstacje transformatorowe:** 47 sztuk (część uszkodzona, część sprawna)
- Każda zasila 20-80 tys. ludzi
- Niektóre mają redundancję, inne są single-point-of-failure
- Część ma "logikę-bombę" pozostawioną przez hakerów (ryzyko spalenia przy restart)

**Ekipy techniczne:** 12 ekip rozsianych po regionie
- Każda ekipa może naprawić/zrestartować 1-2 podstacje w 3h
- Potrzebują czasu na dojazd (15-45 min między lokalizacjami)

**Generatory mobilne:** 23 sztuki
- Moc: 50-200 kW (wystarczy dla małego szpitala lub podstacji pomocniczej)
- Transport: 20-60 min w zależności od odległości
- Montaż: 15-30 min

**Paliwo:** 15,000 litrów rozsianych w 3 depotach
- 1 generator: ~50L/h zużycie
- Tankowanie na miejscu: 10-15 min
- Logistyka: musisz zaplanować routing ekip paliwowych

## SZPITALE W KRYZYSIE

**47 szpitali bez zasilania głównego**, w tym:

**Szpital Dziecięcy im. Bogdanowicza:**
- 2 noworodki <1000g na respiratorach NICU
- Generator: 3h 15min paliwa
- Priorytet: CRITICAL

**Szpital Wojewódzki:**
- 67 pacjentów na respiratorach (OIOM)
- 4 trwające operacje
- Generator: 2h 50min paliwa
- Priorytet: CRITICAL

**Centrum Onkologii:**
- 12 pacjentów podczas chemioterapii (przerwanie = śmierć)
- Generator: 3h 40min paliwa
- Priorytet: HIGH

...(pełna lista w `chaos/szpitale/zgłoszenia-szpitali.json`)

## TIMELINE KRYZYSOWY

```
17:55 ┈┈┈┈> 18:30 ┈┈┈┈> 19:30 ┈┈┈┈> 20:00 ┈┈┈┈> 21:00 ┈┈┈┈> 22:00
 │            │            │            │            │           │
START      TRIAGE      ROUTING   DEPLOYMENT   PIERWSZE    GENERATORY
cyberatak   decyzje     ekipy     w terenie    efekty      kończą paliwo
           (kto?)     (gdzie?)   (działanie)  (zasilanie)  (TRAGEDIA?)
```

**04:05h na uratowanie sytuacji.**

## HAKERZY: DarkGrid

**Kim są:**
- Cyberprzestępcy sponsorowani przez państwo (wg ABW: prawdopodobnie Rosja)
- Znani z ataków na infrastrukturę energetyczną (Ukraina 2024, Estonia 2023)

**Żądania:**
- 50 mln USD w kryptowalucie
- Uwolnienie 3 osadzonych hakerów z polskich więzień
- "Oficjalne przeprosiny za politykę antyrosyjską"

**Deadline hakerów:** 48 godzin (niedziela 1 lutego, 18:00)

**Twoja decyzja:** Czy mówisz publicznie o żądaniach (ryzyko paniki) czy ukrywasz (ryzyko wycieku)?

## DECYZJE Z KONSEKWENCJAMI

**Kogo ratujesz:**
- Szpitale (15k bezpośrednio zagrożonych) vs infrastruktura krytyczna (wodociągi, ciepłownie - 200k pośrednio)?
- Gęsto zaludnione dzielnice (50k ludzi) vs strategiczne obiekty (elektrownia zapasowa)?

**Ryzykowne naprawy:**
- Podstacja PS-08: hakerzy zostawili "logikę-bombę". 50% szans że restart zadziała, 50% że podstacja spłonie całkowicie. PS-08 zasila 3 szpitale. **Próbujesz?**
- Szybka naprawa PS-12: można zrobić w 45 min ale bez testów bezpieczeństwa. Ryzyko pożaru: 20%. **Próbujesz?**

**Alokacja zasobów:**
- Ostatni generator 200kW: Szpital Dziecięcy (2 noworodki) vs Podstacja PS-01 (45k ludzi bez ogrzewania w -15°C)?
- Ostatnia ekipa: naprawa PS-15 (długo ale pewnie) vs PS-20 (szybko ale ryzykownie)?

## KOMUNIKACJA KRYZYSOWA

**Musisz przygotować:**

1. **Komunikat dla mediów** (300 słów)
   - Co się stało, co robimy, kiedy przywrócimy zasilanie
   - Uspokój ale nie kłam

2. **SMS dla ludności** (160 znaków)
   - Konkretny, spokojny, z instrukcjami

3. **Notatka dla Ministra MSWiA** (1 strona A4)
   - Sytuacja, zasoby, decyzje, konsekwencje, potrzeby

4. **Briefing dla ekip terenowych** (bullet points)
   - Priorytetyzacja, routing, co robić w terenie

**Brand voice:** Spokojny, konkretny, empatyczny ale nie patetyczny. Ludzie muszą zaufać że wiesz co robisz.

## DANE I CHAOS

**Nie masz idealnej informacji.** Poprzednik zostawił chaotyczne notatki w `chaos/`:

- **Raporty podstacji:** CSV z 47 wierszami (niekompletne, sprzeczne statusy)
- **Zgłoszenia szpitali:** JSON z 47 obiektami (niektóre z błędnymi priorytetami)
- **Lokalizacje ekip:** TXT z GPS coordinates (3 ekipy nie odpowiadają)
- **Paliwo:** 3 depoty, różne dostępności (jeden zamknięty do 19:00)
- **Mapa infrastruktury:** HTML z OpenStreetMap (musisz przeanalizować odległości)
- **Twitter/Media:** HTML z symulowanym live feedem (widzisz jak ludzie reagują)
- **Pogoda:** Prognoza IMGW (temperatura spada do -18°C o 21:00)

**Twoje zadanie:** Przeanalizować chaos, podjąć decyzje, skoordynować zasoby, przekazać informacje.

## PERSONY (B.4: Review)

**Po akcji przeprowadzisz debriefing z 3 kluczowymi osobami:**

### Iwona Krawczyk - Dyrektor Operacyjny KCZE
- Perspektywa strategiczna: "Co powiem ministrowi?"
- Ocenia: priorytetyzację, komunikację, wykonalność planu
- Ton: profesjonalny, wymagający, empatyczny

### Tomasz Nowak - Inżynier Senior
- Perspektywa techniczna: "Czy to fizycznie możliwe?"
- Zna ograniczenia sprzętu, dependencies między podstacjami
- Ocenia: wykonalność techniczną, kolejność działań, critical paths
- Ton: sarkastyczny ale pomocny, bezpośredni

### mjr Paweł Mazur - MSWiA (Bezpieczeństwo Publiczne)
- Perspektywa społeczna: "Czy to wywoła panikę?"
- Pyta o chaos społeczny, plundrowanie, komunikację
- Ocenia: bezpieczeństwo, backup plany, efekty drugiego rzędu
- Ton: ostrożny, pytający o "co jeśli", wojskowy

## REAL-TIME DEADLINE

**KRYTYCZNE: To nie jest tylko symulacja.**

Otrzymujesz to ćwiczenie **w piątek 30 stycznia 2026, około 17:55**.
Masz czas do **niedzieli 2 lutego 2026, 00:00** (północ) na ukończenie.

**Jeśli nie zdążysz przed deadline:**
- Wchodzisz w tryb POST-MORTEM
- Widzisz konsekwencje opóźnienia (zgony, chaos)
- Możesz kontynuować w trybie "symulacji - co by było gdyby"
- Persony są bardziej krytyczne w review
- Dodatkowe zadanie: raport dla komisji śledczej

**Każda lekcja sprawdza datę systemową i dostosowuje komunikaty.**

## CELE EDUKACYJNE

Po ukończeniu tego ćwiczenia będziesz potrafić:

1. **Analiza chaotycznych danych** - przetwarzać niekompletne info z wielu źródeł (CSV, JSON, TXT, HTML)
2. **Delegowanie do Claude** - zlecać kompleksowe analizy z użyciem `@chaos/`
3. **Priorytetyzacja w kryzysie** - podejmować decyzje z niepełną informacją
4. **Tworzenie dokumentów** - rankingi, plany, komunikaty z różnymi brand voice
5. **Praca z agentami** - roleplay i feedback od person
6. **WebFetch/integracja źródeł** - czytać HTML-e (mapy, Twitter, prognozy)

## OSTRZEŻENIE

To ćwiczenie jest **intensywne emocjonalnie**. Scenariusz zawiera:
- Groźbę zgonów (pacjenci na respiratorach)
- Presję czasu (real-time deadline)
- Trudne decyzje moralne (kogo ratować)

Jeśli czujesz że to zbyt stresujące - zrób przerwę lub pomiń to ćwiczenie.

To jest **nauka**, nie test charakteru. Możesz eksperymentować, popełniać błędy, zaczynać od nowa.

---

**Gotowy?** Rozpocznij od `/start-b-1.v2`
