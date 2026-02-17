---
description: Generuj scenariusz komiksu IT na podstawie lekcji
argument-hint: [ścieżka-do-lekcji]
---

# Generator scenariuszy komiksów IT dla lekcji

## Twoje zadanie

Przeczytaj lekcję z pliku: **$ARGUMENTS**

Następnie:

### KROK 1: Propozycje pomysłów

Wygeneruj **3 krótkie pomysły** na mini komiks (4-6 paneli) w stylu XKCD/CommitStrip/Dilbert, bazujący na kluczowych konceptach z tej lekcji.

Każdy pomysł powinien zawierać:
- **Tytuł** (chwytliwy, ironiczny)
- **Setup** (co będzie tematem, jaka sytuacja)
- **Puenta** (jaka będzie pointa/punchline)
- **Dlaczego pasuje do lekcji** (1-2 zdania)

Format:
```
## Pomysł 1: [Tytuł]
Setup: [krótki opis sytuacji]
Puenta: [jaki będzie finał]
Pasuje, bo: [uzasadnienie]

## Pomysł 2: [Tytuł]
...

## Pomysł 3: [Tytuł]
...
```

### KROK 2: Wybór użytkownika

Zapytaj użytkownika, który pomysł wybrać (1, 2 lub 3).

### KROK 3: Szczegółowy scenariusz

Po wyborze użytkownika, wygeneruj **szczegółowy scenariusz** wybranego komiksu.

**LIMIT:** Maksymalnie **4800 znaków** dla całego scenariusza. Bądź zwięzły, ale precyzyjny.

### KROK 4: Zapis scenariusza

Po wygenerowaniu szczegółowego scenariusza, **zapisz go do pliku**: `komiks.[nazwa-lekcji].md`

Nazwa pliku powinna odpowiadać nazwie pliku lekcji (bez prefiksu `my.` jeśli występuje).

Przykład:
- Lekcja: `my.06.hooks-part-1.md` → Scenariusz: `komiks.hooks-part-1.md`
- Lekcja: `lesson-api-basics.md` → Scenariusz: `komiks.lesson-api-basics.md`

## Wymagania stylistyczne

**STYL GRAFICZNY:**
- Prosta czarno-biała kreska (XKCD/CommitStrip)
- Minimalizm - żadnych kolorów, tylko czarno-białe
- Line art, bez cieniowania

**HUMOR:**
- Geekowy, ironiczny, suchy
- "Śmiech przez łzy" - relatable frustracje devów
- Insider jokes ze świata IT
- Bez slapstick, humor sytuacyjny i intelektualny

**DOSTĘPNI BOHATEROWIE:**
- **Junior dev** - młodszy programista, uczy się, często popełnia błędy
- **Senior dev** - doświadczony programista, mentoruje, zna skróty
- **Boss** - manager/szef, rozumie biznes, czasem nie rozumie technikaliów

**UWAGA:** Jeśli scenariusz wymaga nowych bohaterów (np. DevOps, Designer, Tester), opisz ich charakterystykę w scenariuszu.

## Nagłówek scenariusza

Na samym początku wynikowego pliku scenariusza umieść sekcję podsumowującą:

```
# [Tytuł komiksu]

**Liczba scen:** [X]
**Bohaterowie:** [lista wszystkich bohaterów z krótkim opisem, np. "Junior dev - młody programista w koszulce, Senior dev - brodaty mentor z kubkiem kawy"]
```

To ułatwia generowanie grafik - od razu widać ile paneli przygotować i jakie postacie zaprojektować.

## Format szczegółowego scenariusza (zwięzły)

Dla każdego panelu:

```
### PANEL [numer]: [tytuł]

**KOMPOZYCJA:** [plan], [perspektywa]

**BOHATEROWIE:**
- [Typ]: [pozycja, akcja, mimika, ubranie - zwięźle]

**PRZEDMIOTY/TŁO:**
- [Lista kluczowych przedmiotów i położenie]

**TEKST:**
- Narracja: "[treść]"
- Dialog [Postać]: "[treść]"
  - Dymek: [typ], pozycja: [gdzie]

**DETALE:** [teksty na ekranach, easter eggs]
```

## Przykład formatu (fragment):

```
### PANEL 1: Naiwny optymizm

**KOMPOZYCJA:** Plan średni, z boku ukośnie

**BOHATEROWIE:**
- Dev (~30 lat): Siedzi przy biurku, wyprostowany, lekki uśmiech, koszulka, potargane włosy. Patrzy na monitor.

**PRZEDMIOTY/TŁO:**
- Monitor na biurku (ekran do widza), minimalistyczne biurko, kubek z kawą (prawa strona), klawiatura + mysz

**TEKST:**
- Narracja: "Monday, 9:00 AM"
- Ekran monitora:
  "README.md
   Installation: Just run: npm install awesome-tool"
- Dialog Dev (myśl): "Just run? Sounds easy!"
  - Dymek: chmurka myśli, pozycja: nad głową

**DETALE:** Terminal prompt: $
```

## Pamiętaj:

**LIMIT: Cały scenariusz max 4800 znaków!** Bądź zwięzły.

1. **Dialogi (po angielsku!):**
   - Kto mówi, typ dymku (normalny/myśl/krzyk), pozycja
   - Max 1-2 zdania, ironicznie, zwięźle

2. **Postacie:** Pozycja, mimika, akcja, wygląd (krótko!)

3. **Przedmioty:** Tylko kluczowe, gdzie są, co na nich (jeśli ważne)

4. **Kompaktowy format:** Używaj skrótów, kropek, unikaj powtórzeń

Teraz przeczytaj lekcję i rozpocznij od KROKU 1.
