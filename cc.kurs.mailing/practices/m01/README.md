# BLACKOUT - Narodowy Kryzys Energetyczny

Witaj w najbardziej intensywnym ćwiczeniu Modułu 1 kursu Claude Code.

## Co to jest?

To **mini-kurs praktyczny** w którym wciela się w koordynatora operacyjnego podczas **narodowego kryzysu energetycznego**. Zamiast teorii - realne zadania pod presją czasu, z prawdziwymi konsekwencjami (symulowanymi).

**Scenariusz:** Piątek 30 stycznia 2026, 17:55. Cyberatak na 3 elektrownie. 2.1M ludzi bez prądu, -15°C, 47 szpitali na generatorach (paliwo do ~22:00). Ty jesteś koordynatorem. Masz ~3.5h żeby uratować sytuację.

**Stawka:** Życie i śmierć. 2 noworodki <1000g na respiratorach, 6 pacjentów na ECMO, 67 na respiratorach OIOM.

**Real-time deadline:** Otrzymujesz to ćwiczenie w piątek 30 stycznia ~18:00. Deadline: niedziela 2 lutego, 00:00. Jeśli nie zdążysz - wchodzisz w tryb POST-MORTEM (analiza porażki).

Spoiler: Claude Code wystarczy. Ale musisz działać szybko i mądrze.

---

## Wymagania wstępne

Przed rozpoczęciem upewnij się, że:

- Ukończyłeś **Moduł 1** kursu Claude Code (lekcje 00-09)
- Masz zainstalowanego i skonfigurowanego **Claude Code** (CLI)
- Masz około **2-2.5 godziny** na intensywną pracę (4 lekcje)
- Jesteś gotowy na stresujący scenariusz (groźba zgonów, presja czasu)

**OSTRZEŻENIE:** To ćwiczenie jest intensywne emocjonalnie. Scenariusz zawiera trudne decyzje moralne i konsekwencje opóźnień. Jeśli czujesz że to zbyt stresujące - pomiń to ćwiczenie lub zrób przerwę.

---

## Jak zacząć?

### Krok 1: Przejdź do folderu

```bash
cd /sciezka/do/practices/m01
```

### Krok 2: Uruchom Claude Code

```bash
claude
```

### Krok 3: Rozpocznij pierwszą lekcję

```
/start-b-1.v2
```

To wszystko! Claude przeprowadzi Cię przez cały mini-kurs.

---

## Struktura mini-kursu (4 lekcje)

| Lekcja | Temat | Co robisz | Czas |
|--------|-------|-----------|------|
| **B.1** | **TRIAGE - Kto dostanie prąd?** | Analizujesz 47 podstacji i 47 szpitali. Decydujesz kogo ratujesz PIERWSZEGO. | ~35 min |
| **B.2** | **LOGISTYKA ŻYCIA - Generatory, ekipy, paliwo** | Koordynujesz 12 ekip, 23 generatory, 15k L paliwa. Routing i timeline. | ~40 min |
| **B.3** | **GŁOS W KRYZYSIE - Media, ludność, decydenci** | Piszesz 4 komunikaty: media (300 słów), SMS (160 znaków), minister (1 strona), ekipy terenowe. | ~30 min |
| **B.4** | **REVIEW - Debriefing z zespołem** | Konsultujesz wyniki z 3 personami (dyrektor, inżynier, MSWiA). Feedback i lessons learned. | ~25 min |

**Łączny czas:** ~2-2.5 godziny intensywnej pracy

---

## Czego się nauczysz?

### Umiejętności praktyczne

- **Analiza chaotycznych danych** - 47 podstacji (CSV), 47 szpitali (JSON), ekipy (TXT), zasoby (MD)
- **Priorytetyzacja w kryzysie** - trudne decyzje z niepełną informacją i presją czasu
- **Koordynacja zasobów** - routing, timeline, dependencies, optymalizacja
- **Komunikacja kryzysowa** - różne tony dla różnych odbiorców (media, ludność, decydenci, ekipy)
- **Praca pod presją** - real-time deadline, konsekwencje opóźnień

### Techniki Claude Code

- **Praca z kontekstem projektowym** - folder `chaos/` z wieloma plikami różnych formatów
- **Delegowanie kompleksowych analiz** - "@chaos/ przeanalizuj 47 podstacji i wypisz TOP 10"
- **Tworzenie strukturyzowanych dokumentów** - rankingi, plany, komunikaty, raporty
- **Adaptacja brand voice** - różne tony i formaty (300 słów vs 160 znaków vs 1 strona A4)
- **Konsultacje z agentami** - roleplay z 3 personami (feedback konstrukcyjny)
- **Integracja wielu źródeł** - CSV + JSON + TXT + HTML w jednej analizie

---

## Co otrzymasz na koniec?

Po ukończeniu mini-kursu będziesz mieć:

1. **TRIAGE-RANKING.md** - twoja priorytetyzacja (kogo ratujesz, dlaczego)
2. **PLAN-KOORDYNACJI.md** - szczegółowy plan operacyjny (timeline, dependencies, zasoby)
3. **KOMUNIKATY/** - 4 komunikaty kryzysowe (media, SMS, minister, ekipy)
4. **LESSONS-LEARNED.md** - wnioski z kryzysu (co poszło dobrze, co można poprawić)
5. **Doświadczenie** - praktyczna wiedza którą zastosujesz w prawdziwych projektach

**I przede wszystkim:** Doświadczenie zarządzania kryzysem narodowym z pomocą Claude Code.

---

## Warianty zadań

Mini-kurs oferuje 2 warianty dostosowane do różnych profili:

- **Wariant A (tech/programistyczny):** Więcej analizy danych (CSV/JSON parsing), optymalizacja routingu, hinty z pseudokodem
- **Wariant B (non-tech/biznesowy):** Więcej analizy humanitarnej i decyzyjnej, koordynacja zespołu, hinty z bullet points

Wybierasz wariant w lekcji B.1 (KROK 2). Oba prowadzą do tego samego celu - uratowania ludzi.

---

## Real-time deadline

**KRYTYCZNE:** To nie jest tylko symulacja.

Otrzymujesz to ćwiczenie **w piątek 30 stycznia 2026, około 17:55**.
Masz czas do **niedzieli 2 lutego 2026, 00:00** (północ) na ukończenie.

**Jeśli nie zdążysz przed deadline:**
- Wchodzisz w tryb POST-MORTEM
- Widzisz konsekwencje opóźnienia (23 zgony pacjentów, 8 zgonów z hipotermii, chaos społeczny)
- Możesz kontynuować w trybie "symulacji - co by było gdyby"
- Persony są bardziej krytyczne w review (B.4)
- Dodatkowe zadanie: raport dla komisji śledczej

**Każda lekcja sprawdza datę systemową i dostosowuje komunikaty.**

---

## Struktura projektu

```
practices/m01/
├── README.md                    # Ten plik
├── kontekst/
│   ├── SCENARIUSZ.md           # Pełny opis kryzysu (PRZECZYTAJ NAJPIERW!)
│   ├── BRAND-VOICE.md          # Zasady komunikacji kryzysowej KCZE
│   └── BRIEF-PROJEKTU.md       # Szczegóły infrastruktury
├── chaos/                       # CHAOTYCZNE DANE (tu jest wszystko)
│   ├── podstacje/
│   │   ├── raporty-podstacji.csv        # 47 podstacji (statusy, czasy, ryzyka)
│   │   └── mapa-infrastruktury.html     # (opcjonalnie) Mapa OpenStreetMap
│   ├── szpitale/
│   │   └── zgłoszenia-szpitali.json     # 47 szpitali (pacjenci CRITICAL, paliwo)
│   ├── ekipy/
│   │   ├── lokalizacje-ekip.txt         # 12 ekip (GPS, sprzęt, dostępność)
│   │   ├── sprzet-dostepny.md           # 23 generatory mobilne (moc, lokalizacja)
│   │   └── paliwo-lokalizacje.txt       # 3 depoty paliwa
│   ├── hakerzy/
│   │   ├── komunikat-hakerzy.txt        # Żądania DarkGrid (50M USD, etc.)
│   │   └── analiza-ABW-wstepna.md       # Co wiemy o ataku
│   ├── media/
│   │   ├── twitter-feed.html            # (opcjonalnie) Symulowany live feed
│   │   ├── artykul-onet.html            # (opcjonalnie) "Blackout w Warszawie"
│   │   └── artykul-tvn24.html           # (opcjonalnie) "Hakerzy atakują?"
│   ├── pogoda/
│   │   └── prognoza-IMGW.html           # (opcjonalnie) Prognoza (-15°C → -18°C)
│   └── notatki/
│       └── posiedzenie-kryzysowe-04-35.md  # Notatki z posiedzenia (18:04-18:35)
├── szablony/
│   ├── szablon-komunikat-media.md
│   ├── szablon-notatka-minister.md
│   └── szablon-briefing-teren.md
├── output/                      # Tu zapiszesz swoje dokumenty
│   ├── user.txt                # Imię i płeć (personalizacja)
│   ├── wariant.txt             # A lub B (tech vs non-tech)
│   ├── analiza-podstacje.md   # Analiza 47 podstacji
│   ├── analiza-szpitale.md    # Analiza 47 szpitali
│   ├── TRIAGE-RANKING.md      # TOP 10 podstacji + TOP 10 szpitali (decyzje!)
│   ├── PLAN-KOORDYNACJI.md    # Timeline, routing, zasoby, dependencies
│   ├── KOMUNIKATY/
│   │   ├── komunikat-media.md
│   │   ├── sms-ludnosc.txt
│   │   ├── notatka-minister.md
│   │   └── briefing-ekipy-teren.md
│   └── LESSONS-LEARNED.md     # Wnioski z kryzysu
└── .claude/
    ├── commands/
    │   ├── lesson-protocol.md      # Protokół prowadzenia lekcji
    │   ├── start-b-1.v2.md         # Lekcja B.1: TRIAGE
    │   ├── start-b-2.v2.md         # Lekcja B.2: LOGISTYKA
    │   ├── start-b-3.v2.md         # Lekcja B.3: KOMUNIKACJA
    │   ├── start-b-4.v2.md         # Lekcja B.4: REVIEW
    │   └── pomoc.md                # Pomoc w trakcie ćwiczenia
    └── agents/
        ├── dyrektor-iwona.md       # Persona: Iwona Krawczyk (Dyrektor Operacyjny)
        ├── inżynier-tomasz.md      # Persona: Tomasz Nowak (Inżynier Senior)
        └── msw-mazur.md            # Persona: mjr Paweł Mazur (MSWiA)
```

---

## Potrzebujesz pomocy?

W trakcie mini-kursu:

```
/pomoc
```

Claude podpowie, co robić dalej lub jak wrócić na właściwy tor.

---

## Najczęściej zadawane pytania

### Czy mogę zrobić przerwę w trakcie?

Tak! Stan Twojej pracy jest zapisywany w folderze `output/`. Możesz wrócić później i kontynuować. **ALE UWAGA:** Real-time deadline (2 lutego 00:00) nadal leci - jeśli nie zdążysz, wchodzisz w tryb POST-MORTEM.

### Co jeśli zrobię coś źle?

Nic się nie stanie. To jest nauka - eksperymentuj swobodnie. Jeśli coś poszło nie tak, zawsze możesz zacząć daną lekcję od nowa. W prawdziwym kryzysie błędy kosztują życie - tu możesz je popełnić bezpiecznie i się nauczyć.

### Czy muszę robić wszystkie lekcje po kolei?

**TAK.** Każda lekcja buduje na poprzedniej:
- B.1 → tworzy TRIAGE-RANKING.md
- B.2 → używa TRIAGE-RANKING.md do stworzenia PLAN-KOORDYNACJI.md
- B.3 → używa obu do stworzenia KOMUNIKATÓW
- B.4 → persony czytają wszystkie 3 i dają feedback

Przeskakiwanie zakłóci flow i zmniejszy wartość edukacyjną.

### Czy to jest realistyczne?

**Scenariusz:** TAK - bazuje na prawdziwych blackout'ach (Ukraina 2024, USA 2003, Europa 2006) i realnych zagrożeniach cyberataków na infrastrukturę energetyczną.

**Dane:** Częściowo - podstacje, szpitale, generatory to fikcyjne liczby ale zbliżone do rzeczywistości.

**Presja:** TAK - prawdziwi koordynatorzy kryzysowi pracują pod taką presją. Uczysz się jak to jest.

### Czy mogę używać zewnętrznych narzędzi? (Excel, Python, etc.)

TAK! To jest zachęcane. Claude Code może pomóc Ci generować skrypty Pythona, arkusze Excel, etc. Cel ćwiczenia to nauczyć Cię **jak używać Claude Code w prawdziwych zadaniach** - a w prawdziwej pracy używasz wszystkich narzędzi które masz pod ręką.

### Ile razy mogę powtarzać mini-kurs?

Ile chcesz! Każde podejście może dać inne wyniki - to zaleta pracy z AI. Możesz eksperymentować z różnymi decyzjami i zobaczyć jak persony reagują.

---

## Gotowy?

**PRZECZYTAJ NAJPIERW:** `kontekst/SCENARIUSZ.md` - pełny opis kryzysu

Potem:

```bash
cd /sciezka/do/practices/m01
claude
```

A następnie:

```
/start-b-1.v2
```

⏱️ **Czas zaczyna lecieć. Generatory w szpitalach kończą paliwo za 3h 25min.**

**Powodzenia. Życie 647 pacjentów CRITICAL zależy od Twoich decyzji.**

---

## Co dalej po ukończeniu?

1. **Zachowaj** folder `output/` - to Twoje portfolio z tego ćwiczenia
2. **Przeczytaj** `LESSONS-LEARNED.md` - wnioski które zastosujesz w przyszłości
3. **Wróć do głównego kursu** Claude Code - Moduł 2 czeka
4. **Podziel się** doświadczeniem - jak Ci poszło? Co było najtrudniejsze?

**Feedback do kursu:** [link lub email]

---

*Mini-kurs jest częścią kursu "Claude Code - od podstaw do eksperta". Więcej informacji: [strona kursu]*

---

**⚠️ DISCLAIMER:** To jest ćwiczenie edukacyjne. Scenariusz, dane, persony są fikcyjne. Żadna instytucja (KCZE, ABW, MSWiA, szpitale) nie jest powiązana z tym projektem. Real-time deadline jest mechanizmem edukacyjnym - jeśli nie zdążysz, to tylko symulacja.
