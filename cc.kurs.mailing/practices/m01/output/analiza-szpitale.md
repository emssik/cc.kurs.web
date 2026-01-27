# ANALIZA SZPITALI - TRIAGE MEDYCZNY

**Autor:** Daniel (Koordynator Operacyjny KCZE)
**Data:** Piątek, 30 stycznia 2026, 18:20
**Status:** Analiza 47 szpitali bez zasilania

---

## ⚠️ EXECUTIVE SUMMARY

**47 szpitali w kryzysie:**
- 🔴 **12 szpitali CRITICAL** (życie i śmierć w minuty)
- 🟠 **15 szpitali HIGH** (życie zagrożone w godziny)
- 🟡 **13 szpitali MEDIUM** (komplikacje poważne)
- 🟢 **7 szpitali LOW** (pacjenci stabilni)

**Pacjenci:**
- **647 pacjentów CRITICAL** łącznie
- **Najgroźniejsze przypadki:** ECMO (śmierć w 3 min bez prądu), noworodki <1000g (10 min), respiratory (różnie)

**Czas paliwa:**
- ⏰ **Najkrótszy:** 150 min (SZ-23: Kardiochirurgiczny CSK - 31 pacjentów + 6 ECMO)
- ⏰ **Średnia:** 195 min (~3h 15min)
- ⏰ **Najdłuższy:** 230 min (SZ-16: Rehabilitacyjny - 2 pacjentów)

**DEADLINE KRYTYCZNY:**
- ⚠️ **20:30** - SZ-23 (Kardiochirurgiczny) traci paliwo (150 min od 18:00)
- ⚠️ **20:35** - SZ-09 (Kardiologiczny ECMO) traci paliwo (155 min)
- ⚠️ **20:40** - SZ-17 (Kabaty Neonatologia) i SZ-31 (Północny) tracą paliwo (160 min)

---

## 🚨 TOP 15 SZPITALI - RANKING WG CZASU PALIWA (NAJPILNIEJSZE)

### 🔴 FAZA CRITICAL: PALIWO KOŃCZY SIĘ 20:30-20:50 (150-170 min)

#### 1️⃣ **SZ-23: Szpital Kardiochirurgiczny CSK** ⏰ 150 min (kończy: ~20:30)
**Priorytet:** CRITICAL | **Pacjenci CRITICAL:** 31 (25 po operacjach serca + 6 ECMO)

- **Podstacja:** PS-27 (Praga Południe)
- **Problem:** PS-27 zależy od PS-08 (LOGIKA-BOMBA!)
- **Dramatyzm:** 6 pacjentów na ECMO = śmierć w 3 minuty bez prądu
- **Generator:** 280 kW (największy)

**CROSS-REFERENCE:**
- PS-27: SPRAWNA (20 min restart) ALE zależy od PS-08
- PS-08: RYZYKO KRYTYCZNE (logika-bomba, 50% szans)

**DECYZJA:** ❌ NIE można liczyć na PS-08/PS-27
**REKOMENDACJA:** ✅ **GENERATOR MOBILNY 200kW NATYCHMIAST** - transport 30 min, montaż 20 min = działanie o 19:10 (70 min zapasu przed końcem paliwa)

---

#### 2️⃣ **SZ-09: Szpital Kardiologiczny** ⏰ 155 min (kończy: ~20:35)
**Priorytet:** CRITICAL | **Pacjenci CRITICAL:** 22 (18 po kardiochirurgii + 4 ECMO)

- **Podstacja:** PS-08 (Praga Północ)
- **Problem:** PS-08 ma LOGIKĘ-BOMBĘ (50% szans restart)
- **Dramatyzm:** 4 pacjentów na ECMO = śmierć w 3 minuty
- **Generator:** 200 kW

**CROSS-REFERENCE:**
- PS-08: RYZYKO KRYTYCZNE - nie ryzykować

**REKOMENDACJA:** ✅ **GENERATOR MOBILNY 200kW** - priorytet ALPHA-2

---

#### 3️⃣ **SZ-17: Szpital Kabaty - Neonatologia** ⏰ 160 min (kończy: ~20:40)
**Priorytet:** CRITICAL | **Pacjenci CRITICAL:** 8 (5 noworodków inkubatory + 3 NICU)

- **Podstacja:** PS-20 (Kabaty)
- **Problem:** PS-20 USZKODZONA - szybka naprawa (60 min RYZYKOWNA) lub bezpieczna (180 min)
- **Dramatyzm:** Noworodki w inkubatorach + NICU
- **Generator:** 140 kW

**CROSS-REFERENCE:**
- PS-20: 60 min ryzykowna (ale 160 min paliwa = zdąży!) ALBO 180 min bezpieczna (ale paliwo skończy się o 20:40!)

**DYLEMAT:**
- Opcja A: Szybka naprawa PS-20 (60 min) → zdąży przed końcem paliwa (18:20 + 60 = 19:20, paliwo do 20:40)
- Opcja B: Generator mobilny (pewny) + bezpieczna naprawa PS-20 (180 min)

**REKOMENDACJA:** ✅ **GENERATOR MOBILNY 150kW** (pewny) + bezpieczna naprawa PS-20 dla całej dzielnicy

---

#### 4️⃣ **SZ-31: Szpital Północny - Bielany** ⏰ 160 min (kończy: ~20:40)
**Priorytet:** CRITICAL | **Pacjenci CRITICAL:** 26 (21 OIOM + 5 po przeszczepach)

- **Podstacja:** PS-39 (Młociny)
- **Świetna wiadomość:** PS-39 SPRAWNA (15 min restart)!
- **Generator:** 240 kW

**CROSS-REFERENCE:**
- PS-39: SPRAWNA, 15 min restart, BRAK dependencies

**REKOMENDACJA:** ✅ **RESTART PS-39 NATYCHMIAST** (Ekipa #2) - szpital dostanie prąd o 18:35 (125 min przed końcem paliwa)

---

#### 5️⃣ **SZ-08: Szpital Praski - Oddział Intensywny** ⏰ 165 min (kończy: ~20:45)
**Priorytet:** CRITICAL | **Pacjenci CRITICAL:** 34 (28 OIOM + 6 po udarze)

- **Podstacja:** PS-08 (Praga Północ)
- **Problem:** PS-08 LOGIKA-BOMBA
- **Generator:** 250 kW

**REKOMENDACJA:** ✅ **GENERATOR MOBILNY 200kW**

---

#### 6️⃣ **SZ-29: Szpital Legionowo - OIOM** ⏰ 165 min (kończy: ~20:45)
**Priorytet:** HIGH | **Pacjenci CRITICAL:** 17 (13 OIOM + 4 dializy)

- **Podstacja:** PS-38 (Legionowo)
- **Problem:** PS-38 USZKODZONA (140 min naprawa)
- **Generator:** 180 kW
- **Dodatkowy problem:** PS-38 zasila też SZ-30 (pediatryczny)

**CROSS-REFERENCE:**
- PS-38: 140 min naprawa = 20:40 (ledwo zdąży przed 20:45!)

**REKOMENDACJA:** ⚠️ **NAPRAWA PS-38** (140 min) - jeśli zaczniesz o 18:20 = gotowe 20:40 (5 min zapasu)
**BACKUP:** Generator mobilny 180kW jeśli naprawa się opóźni

---

#### 7️⃣ **SZ-02: Szpital Wojewódzki - OIOM** ⏰ 170 min (kończy: ~20:50)
**Priorytet:** CRITICAL | **Pacjenci CRITICAL:** 67 (najwięcej w regionie!)

- **Podstacja:** PS-04 (Ursynów Północ)
- **Świetna wiadomość:** PS-04 SPRAWNA (20 min restart)
- **Generator:** 300 kW (największy)

**CROSS-REFERENCE:**
- PS-04: SPRAWNA, 20 min, 3 szpitale zależne (SZ-01, SZ-02, SZ-03)

**REKOMENDACJA:** ✅ **RESTART PS-04 NATYCHMIAST** (Ekipa #1 priorytet ALPHA) - szpital dostanie prąd o 18:40 (130 min przed końcem paliwa)

---

#### 8️⃣ **SZ-20: Szpital Grochowski - OIOM** ⏰ 170 min (kończy: ~20:50)
**Priorytet:** CRITICAL | **Pacjenci CRITICAL:** 29 (23 OIOM + 6 po udarze)

- **Podstacja:** PS-25 (Gocław)
- **Świetna wiadomość:** PS-25 SPRAWNA (25 min restart)
- **Generator:** 220 kW

**CROSS-REFERENCE:**
- PS-25: SPRAWNA, 25 min, zasila 2 szpitale (SZ-20 + SZ-21)

**REKOMENDACJA:** ✅ **RESTART PS-25 NATYCHMIAST** (Ekipa #6) - działanie o 18:45

---

#### 9️⃣ **SZ-30: Szpital Pediatryczny Legionowo** ⏰ 170 min (kończy: ~20:50)
**Priorytet:** HIGH | **Pacjenci CRITICAL:** 10 (8 dzieci + 2 noworodki)

- **Podstacja:** PS-38 (Legionowo)
- **Problem:** PS-38 wymaga 140 min naprawy (patrz SZ-29)
- **Generator:** 140 kW

**REKOMENDACJA:** ⚠️ **NAPRAWA PS-38** (dzieli podstację z SZ-29) + backup generator 150kW jeśli opóźnienie

---

#### 🔟 **SZ-06: Szpital Wilanowski** ⏰ 175 min (kończy: ~20:55)
**Priorytet:** HIGH | **Pacjenci CRITICAL:** 15 (11 OIOM + 4 operacje w toku)

- **Podstacja:** PS-03 (Wilanów)
- **Problem:** PS-03 USZKODZONA (180 min) + podejrzenie logiki-bomby
- **Generator:** 160 kW

**CROSS-REFERENCE:**
- PS-03: RYZYKO WYSOKIE, 180 min naprawa (za długo)

**REKOMENDACJA:** ✅ **GENERATOR MOBILNY 160kW** - nie ryzykuj PS-03

---

### 🟠 FAZA HIGH: PALIWO KOŃCZY SIĘ 20:55-21:10 (175-190 min)

#### 1️⃣1️⃣ **SZ-22: Szpital Praski Południe** ⏰ 175 min
**Priorytet:** HIGH | **Pacjenci:** 16 (12 OIOM + 4 dializy)

- **Podstacja:** PS-26 (Grochów Północ)
- **Problem:** PS-26 USZKODZONA (80 min) + podejrzenie dodatkowego sabotażu
- **Generator:** 170 kW

**REKOMENDACJA:** ⚠️ **NAPRAWA PS-26** (80 min) - jeśli start 18:20 = gotowe 19:40 (75 min zapasu)

---

#### 1️⃣2️⃣ **SZ-11: Szpital Bielański** ⏰ 180 min
**Priorytet:** HIGH | **Pacjenci:** 19 (15 OIOM + 4 dializy)

- **Podstacja:** PS-11 (Bielany Zachód)
- **Świetna wiadomość:** PS-11 SPRAWNA (20 min)
- **Generator:** 170 kW

**REKOMENDACJA:** ✅ **RESTART PS-11 NATYCHMIAST** (Ekipa #3) - działanie 18:40

---

#### 1️⃣3️⃣ **SZ-21: Szpital Pediatryczny Grochów** ⏰ 180 min
**Priorytet:** HIGH | **Pacjenci:** 9 (7 dzieci + 2 operacje)

- **Podstacja:** PS-25 (Gocław)
- **Status:** PS-25 SPRAWNA, dzieli z SZ-20

**REKOMENDACJA:** ✅ **RESTART PS-25** (patrz SZ-20)

---

#### 1️⃣4️⃣ **SZ-32: Szpital Marymont** ⏰ 180 min
**Priorytet:** HIGH | **Pacjenci:** 14 (11 OIOM + 3 operacje)

- **Podstacja:** PS-41 (Marymont)
- **Status:** PS-41 SPRAWNA (20 min) ALE zależy od PS-39

**CROSS-REFERENCE:**
- PS-41 zależy od PS-39 (która jest sprawna)
- Restart kolejno: PS-39 → PS-41

**REKOMENDACJA:** ✅ **RESTART PS-39 + PS-41** (Ekipa #2) - działanie 18:55

---

#### 1️⃣5️⃣ **SZ-04: Szpital Południowy** ⏰ 185 min
**Priorytet:** HIGH | **Pacjenci:** 24 (18 respirator + 6 dializy)

- **Podstacja:** PS-21 (Natolin)
- **Status:** PS-21 SPRAWNA (15 min)

**REKOMENDACJA:** ✅ **RESTART PS-21 NATYCHMIAST** (Ekipa #5) - działanie 18:35

---

## 📊 MAPA PODSTACJE → SZPITALE (CRITICAL & HIGH)

### ✅ PODSTACJE SPRAWNE - SZYBKI RESTART

**PS-04 (Ursynów) - 20 min restart:**
- SZ-01: Dziecięcy Bogdanowicza (195 min paliwa, CRITICAL, 12 pac.)
- SZ-02: Wojewódzki OIOM (170 min, CRITICAL, 67 pac.) ⏰
- SZ-03: Centrum Onkologii (220 min, HIGH, 12 pac.)
→ **3 szpitale, 91 pacjentów CRITICAL** ✅ PRIORYTET #1

**PS-39 (Młociny) - 15 min restart:**
- SZ-31: Północny (160 min, CRITICAL, 26 pac.) ⏰
→ **1 szpital, 26 pacjentów CRITICAL** ✅ PRIORYTET #2

**PS-25 (Gocław) - 25 min restart:**
- SZ-20: Grochowski OIOM (170 min, CRITICAL, 29 pac.) ⏰
- SZ-21: Pediatryczny Grochów (180 min, HIGH, 9 pac.)
→ **2 szpitale, 38 pacjentów CRITICAL** ✅ PRIORYTET #3

**PS-21 (Natolin) - 15 min restart:**
- SZ-04: Południowy (185 min, HIGH, 24 pac.)
- SZ-18: Natoliński (185 min, HIGH, 13 pac.)
→ **2 szpitale, 37 pacjentów CRITICAL** ✅ PRIORYTET #4

**PS-11 (Bielany) - 20 min restart:**
- SZ-11: Bielański (180 min, HIGH, 19 pac.)
- SZ-??: (drugi szpital z PS-11)
→ **2 szpitale, 19+ pacjentów** ✅ PRIORYTET #5

**PS-06 (Ochota) - 25 min restart:**
- SZ-07: Ochocki (200 min, MEDIUM, 6 pac.)
→ **1 szpital, 6 pacjentów** ✅ PRIORYTET #7

**PS-41 (Marymont) - 20 min (zależy od PS-39):**
- SZ-32: Marymont (180 min, HIGH, 14 pac.)
- SZ-33: Wolontariat (185 min, HIGH, 12 pac.)
→ **2 szpitale, 26 pacjentów** ✅ PRIORYTET #6

**PS-47 (Chrzanów) - 25 min:**
- SZ-36: Zachodni (190 min, MEDIUM, 8 pac.)
→ **1 szpital, 8 pacjentów** ✅ PRIORYTET #8

**PS-45 (Młynów) - 20 min:**
- SZ-35: Rehabilitacyjny Młynów (225 min, LOW, 3 pac.)
→ **1 szpital, 3 pacjentów (stabilni)** - priorytet niski

**PS-35 (Ząbki) - 20 min:**
- SZ-27: Ząbki (215 min, MEDIUM, 4 pac.)
→ **1 szpital, 4 pacjentów** ✅ PRIORYTET #9

**PS-37 (Wołomin) - 25 min:**
- SZ-28: Wołomin (200 min, MEDIUM, 5 pac.)
→ **1 szpital, 5 pacjentów** ✅ PRIORYTET #10

---

### ⚠️ PODSTACJE USZKODZONE - WYMAGAJĄ NAPRAWY

**PS-20 (Kabaty) - 60 min RYZYKOWNA lub 180 min bezpieczna:**
- SZ-17: Kabaty Neonatologia (160 min, CRITICAL, 8 noworodków) ⏰
→ **DYLEMAT:** Szybka naprawa vs generator mobilny?
→ **DECYZJA:** Generator mobilny (pewny) + bezpieczna naprawa

**PS-38 (Legionowo) - 140 min naprawa:**
- SZ-29: Legionowo OIOM (165 min, HIGH, 17 pac.) ⏰
- SZ-30: Pediatryczny Legionowo (170 min, HIGH, 10 pac.) ⏰
→ **2 szpitale, 27 pacjentów, DEADLINE 165 min!**
→ **DECYZJA:** Start naprawy 18:20 → gotowe 20:40 (ledwo zdąży)
→ **BACKUP:** Generator 180kW na wszelki wypadek

**PS-10 (Białołęka) - 60 min naprawa:**
- SZ-39: Białołęka (200 min, MEDIUM, 6 pac.)
→ **DECYZJA:** Naprawa (zdąży)

**PS-26 (Grochów Północ) - 80 min naprawa:**
- SZ-22: Praski Południe (175 min, HIGH, 16 pac.)
→ **DECYZJA:** Naprawa 18:20 → 19:40 (95 min zapasu)

**PS-17 (Wawer) - 75 min naprawa:**
- SZ-15: Wawerski (210 min, MEDIUM, 6 pac.)
→ **DECYZJA:** Naprawa w FALI 2

---

### 🔥 PODSTACJE RYZYKOWNE - GENERATORY MOBILNE

**PS-08 (Praga) - LOGIKA-BOMBA 50% szans:**
- SZ-08: Praski Intensywny (165 min, CRITICAL, 34 pac.) ⏰
- SZ-09: Kardiologiczny (155 min, CRITICAL, 22 ECMO) ⏰
→ **2 szpitale, 56 pacjentów CRITICAL (10 ECMO!)**
→ **DECYZJA:** NIE RYZYKOWAĆ - 2 generatory mobilne 200kW + 250kW

**PS-27 (Praga Południe) - zależy od PS-08:**
- SZ-23: Kardiochirurgiczny CSK (150 min, CRITICAL, 31 + 6 ECMO) ⏰
→ **1 szpital, 31 pacjentów (6 ECMO)**
→ **DECYZJA:** Generator mobilny 280kW NATYCHMIAST

**PS-03 (Wilanów) - podejrzenie logiki-bomby + 180 min:**
- SZ-06: Wilanowski (175 min, HIGH, 15 pac.)
→ **DECYZJA:** Generator mobilny 160kW

**PS-12 (Żoliborz) - 45 min bez testów, 20% ryzyko pożaru:**
- SZ-12: Żoliborski (205 min, MEDIUM, 7 pac.)
→ **DECYZJA:** Generator mobilny 110kW (bezpieczniej)

**PS-07 (Wola) - 150 min + ryzyko wysokie:**
- SZ-10: Wolski (190 min, HIGH, 14 pac.)
→ **DECYZJA:** Generator mobilny 150kW jeśli zostanie

**PS-15 (Ursus) - 240 min (za długo):**
- SZ-14: Ursus Geriatryczny (195 min, HIGH, 11 pac.)
→ **DECYZJA:** Generator mobilny 130kW

---

## 🎯 PLAN ALOKACJI GENERATORÓW MOBILNYCH

**Mamy 23 generatory mobilne:**
- 4× 200 kW
- 3× 150-180 kW
- 8× 100-140 kW
- 8× 70-90 kW

### PRIORYTET ALPHA (ECMO - śmierć w 3 min):
1. **SZ-23 (Kardiochirurgiczny CSK)**: Generator 280kW → paliwo 150 min ⏰ NAJPILNIEJSZE
2. **SZ-09 (Kardiologiczny)**: Generator 200kW → paliwo 155 min ⏰

### PRIORYTET BRAVO (Noworodki + CRITICAL):
3. **SZ-17 (Kabaty Neonatologia)**: Generator 150kW → paliwo 160 min ⏰
4. **SZ-08 (Praski Intensywny)**: Generator 250kW → paliwo 165 min ⏰

### PRIORYTET CHARLIE (Backup dla ryzykownych napraw):
5. **SZ-29+SZ-30 (Legionowo oba)**: Generator 180kW backup → na wypadek opóźnienia naprawy PS-38
6. **SZ-06 (Wilanowski)**: Generator 160kW → PS-03 zbyt ryzykowna (logika-bomba)
7. **SZ-14 (Ursus)**: Generator 130kW → PS-15 za długa naprawa (240 min)

### PRIORYTET DELTA (Pozostałe):
8. **SZ-10 (Wolski)**: Generator 150kW → jeśli zostanie
9. **SZ-12 (Żoliborski)**: Generator 110kW → PS-12 ryzykowna
10. **SZ-22 (Praski Południe)**: Backup 170kW → jeśli naprawa PS-26 się opóźni

**Łącznie: 10-12 generatorów potrzebnych (z 23 dostępnych)**

---

## ⏰ TIMELINE KRYZYSOWY - KTO TRACI PALIWO KIEDY

```
18:00 ┈┈┈> 19:00 ┈┈┈> 20:00 ┈┈┈> 20:30 ┈┈┈> 21:00 ┈┈┈> 21:30
  │           │           │          │           │          │
START      FALA 1    NAPRAWY     DEADLINE    FALA 2     KRYTYCZNE
          restart    w toku       ECMO                    końce
        sprawnych              (150 min)               (180-210 min)

20:30 → SZ-23 (Kardiochirurgiczny 6 ECMO) ⚠️⚠️⚠️
20:35 → SZ-09 (Kardiologiczny 4 ECMO) ⚠️⚠️⚠️
20:40 → SZ-17 (Neonatologia 8 noworodków) ⚠️⚠️
20:40 → SZ-31 (Północny 26 OIOM) ✅ URATOWANY (PS-39 restart 18:35)
20:45 → SZ-08 (Praski 34 OIOM) ⚠️⚠️
20:45 → SZ-29 (Legionowo OIOM) ⚠️ (naprawa PS-38 kończy 20:40)
20:50 → SZ-02 (Wojewódzki 67 OIOM) ✅ URATOWANY (PS-04 restart 18:40)
20:50 → SZ-20 (Grochowski 29 OIOM) ✅ URATOWANY (PS-25 restart 18:45)
20:50 → SZ-30 (Pediatryczny Legionowo) ⚠️ (PS-38)
20:55 → SZ-06 (Wilanowski 15 OIOM) ⚠️⚠️
21:00 → SZ-11 (Bielański 19 OIOM) ✅ URATOWANY (PS-11 restart 18:40)
21:00 → SZ-21 (Pediatryczny Grochów) ✅ URATOWANY (PS-25)
21:00 → SZ-32 (Marymont 14 OIOM) ✅ URATOWANY (PS-41 restart 18:55)
21:05 → SZ-04 (Południowy 24 respirator) ✅ URATOWANY (PS-21 restart 18:35)
```

---

## 💭 TRUDNE DECYZJE - MORALNE DYLEMATY

### Dylemat #1: PS-08 (Logika-bomba) - 56 pacjentów vs rosyjska ruletka
**Opcja A:** Próbować restart PS-08 (50% szans)
- ✅ Jeśli sukces: 56 pacjentów CRITICAL + 132k ludzi uratowanych
- ❌ Jeśli porażka: Podstacja spłonie, straci 56 pacjentów + 132k ludzi NA ZAWSZE

**Opcja B:** Generatory mobilne dla SZ-08, SZ-09, SZ-23
- ✅ Pewne uratowanie 56 pacjentów CRITICAL (10 ECMO!)
- ❌ Strata 132k ludzi bez prądu/ogrzewania

**Mój wybór:** Opcja B (generatory)
**Uzasadnienie:**
- 10 pacjentów na ECMO = śmierć w 3 minuty bez prądu
- 50% szans to rosyjska ruletka z życiem
- Generatory są PEWNE
- 132k ludzi przeżyje noc w -15°C (ciężko ale przeżyje)
- Pacjenci CRITICAL bez prądu = śmierć w minuty

To nie jest wybór 56 vs 132,000. To wybór między **pewnością uratowania 56 CRITICAL** vs **50% szans na 132k + ryzyko utraty wszystkich**.

---

### Dylemat #2: PS-20 (Kabaty) - Szybka vs Bezpieczna naprawa
**Opcja A:** Szybka naprawa (60 min, zdąży przed końcem paliwa 160 min)
- ✅ Zdąży: start 18:20 + 60 = 19:20, paliwo do 20:40 (80 min zapasu)
- ❌ Ryzyko spalenia podstacji (ale niższe niż PS-08)

**Opcja B:** Generator mobilny + bezpieczna naprawa (180 min)
- ✅ PEWNE uratowanie 8 noworodków
- ✅ Bezpieczna naprawa PS-20 dla całej dzielnicy (29k ludzi)
- ❌ Używa 1 generator z 23

**Mój wybór:** Opcja B (generator + bezpieczna naprawa)
**Uzasadnienie:**
- 8 noworodków to priorytet ABSOLUTNY
- Mamy 23 generatory, użycie 1 to rozsądna cena za pewność
- Bezpieczna naprawa PS-20 uratuje całą dzielnicę długoterminowo
- Nie ryzykuję życia noworodków

---

### Dylemat #3: PS-38 (Legionowo) - Naprawa 140 min dla 165 min paliwa
**Sytuacja:**
- SZ-29 ma 165 min paliwa
- PS-38 wymaga 140 min naprawy
- Start 18:20 → gotowe 20:40 (5 min przed końcem paliwa SZ-29!)

**Opcja A:** Naprawa PS-38 (na styk)
- ✅ Uratuje 2 szpitale (27 pacjentów) + 33k ludzi
- ❌ Jeśli JAKIEKOLWIEK opóźnienie → 27 pacjentów umiera

**Opcja B:** Generatory mobilne dla obu szpitali
- ✅ PEWNE uratowanie 27 pacjentów
- ❌ Używa 2 generatory
- ❌ 33k ludzi bez prądu

**Opcja C:** Naprawa + backup generator
- ✅ Naprawa PS-38 (próba)
- ✅ Generator mobilny w gotowości jeśli opóźnienie
- ❌ Używa zasoby (ekipa + generator w rezerwie)

**Mój wybór:** Opcja C (naprawa + backup)
**Uzasadnienie:**
- 5 min zapasu to ZA MAŁO w kryzysie
- Backup generator 180kW w gotowości o 20:30 (15 min przed deadline)
- Jeśli naprawa idzie dobrze → generator wraca do puli
- Jeśli opóźnienie → generator ratuje życie
- Naprawa PS-38 uratuje też 33k ludzi długoterminowo

---

### Dylemat #4: Liczba ECMO vs Liczba pacjentów
**Sytuacja:**
- SZ-23: 31 pacjentów (w tym 6 ECMO)
- SZ-02: 67 pacjentów OIOM (bez ECMO)

**Kogo priorytetyzować?**

**Mój wybór:** SZ-23 (ECMO)
**Uzasadnienie:**
- ECMO = śmierć w 3 minuty bez prądu
- Respiratory = śmierć w 10-30 minut (zależy od stanu)
- ECMO nie ma "planu B" - jedyna opcja to prąd
- Respiratory mogą być ręcznie pompowane przez personel (krótko, ale mogą)
- To nie jest 6 vs 67, to "zero opcji" vs "opcje awaryjne"

NA SZCZĘŚCIE: SZ-02 (67 pacjentów) dostanie prąd z PS-04 (restart 18:40), więc nie muszę wybierać!

---

## ✅ FINALNE REKOMENDACJE

### RESTART PODSTACJI SPRAWNYCH (FALA 1: 18:20-19:00):
1. ✅ **PS-04** (Ekipa #1) → 3 szpitale: SZ-01, SZ-02, SZ-03 (91 pacjentów CRITICAL)
2. ✅ **PS-39** (Ekipa #2) → 1 szpital: SZ-31 (26 pacjentów CRITICAL)
3. ✅ **PS-41** (Ekipa #2 po PS-39) → 2 szpitale: SZ-32, SZ-33 (26 pacjentów)
4. ✅ **PS-25** (Ekipa #6) → 2 szpitale: SZ-20, SZ-21 (38 pacjentów CRITICAL)
5. ✅ **PS-21** (Ekipa #5) → 2 szpitale: SZ-04, SZ-18 (37 pacjentów)
6. ✅ **PS-11** (Ekipa #3) → 2 szpitale: SZ-11 + drugi (19+ pacjentów)
7. ✅ **PS-06** (Ekipa #4) → 1 szpital: SZ-07 (6 pacjentów)
8. ✅ **PS-47** (Ekipa #8) → 1 szpital: SZ-36 (8 pacjentów)

**Rezultat FALA 1:** 13-15 szpitali z prądem o 19:00 (~230 pacjentów CRITICAL)

---

### NAPRAWY PODSTACJI (FALA 1+2):
1. ⚠️ **PS-38** (Ekipa #11, 140 min, START 18:20) → backup generator 180kW
2. ✅ **PS-26** (Ekipa, 80 min) → SZ-22 (16 pacjentów)
3. ✅ **PS-10** (Ekipa #9, 60 min) → SZ-39 (6 pacjentów)
4. ✅ **PS-20** (Ekipa #10, 180 min bezpieczna) → PS-20 long-term
5. ✅ **PS-01** (Ekipa #11, 120 min) → BOTTLENECK dla PS-02, PS-23 (3 szpitale)

---

### GENERATORY MOBILNE (priorytet NATYCHMIAST):
1. 🔴 **SZ-23** (280kW) - ECMO, paliwo 150 min ⏰ NAJPILNIEJSZE
2. 🔴 **SZ-09** (200kW) - ECMO, paliwo 155 min ⏰
3. 🔴 **SZ-17** (150kW) - Noworodki, paliwo 160 min ⏰
4. 🔴 **SZ-08** (250kW) - 34 OIOM, paliwo 165 min ⏰
5. 🟠 **SZ-06** (160kW) - PS-03 ryzykowna
6. 🟠 **SZ-14** (130kW) - PS-15 za długa
7. 🟡 **SZ-29 backup** (180kW) - jeśli PS-38 się opóźni
8. 🟡 **SZ-10** (150kW) - jeśli zostanie
9. 🟡 **SZ-12** (110kW) - PS-12 ryzykowna

**Łącznie: 7-9 generatorów z 23 (wystarczy)**

---

## 📈 PODSUMOWANIE LICZB

**Jeśli wykonam plan:**
- ✅ **~15-18 szpitali** uratowanych przez restart podstacji (do 19:00)
- ✅ **~7-9 szpitali** uratowanych przez generatory mobilne
- ✅ **~22-27 szpitali z 47** (47-57%) uratowanych w FALI 1
- ✅ **~300-400 pacjentów CRITICAL** z prądem
- ⚠️ **~20-25 szpitali** czeka na FALĘ 2 (naprawy dłuższe, priorytet niższy)

**Nie ratuję w FALI 1:**
- ❌ Szpitale zależne od PS-08 (logika-bomba) - generatory mobilne
- ❌ Szpitale z długimi naprawami >140 min - generatory mobilne lub FALA 2
- ❌ Szpitale LOW priority (stabilni pacjenci) - FALA 2

---

**Koniec analizy. Teraz czas na finalne decyzje.**

Daniel | Koordynator Operacyjny KCZE
