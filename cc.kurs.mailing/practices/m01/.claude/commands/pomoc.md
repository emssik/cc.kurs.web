# Pomoc - Mini-kurs TechStart

Witaj w pomocy mini-kursu praktycznego TechStart!

---

## O mini-kursie

**TechStart** to praktyczny mini-kurs, w ktorym wcielasz sie w nowego koordynatora organizacji non-profit. Twoim zadaniem jest przygotowac Dzien Otwarty, korzystajac z umiejetnosci poznanych w Module 1 kursu Claude Code.

**Czas trwania:** ~1.5-2 godziny (4 lekcje)

**Wymagania:** Ukonczony Modul 1 (Podstawy) kursu Claude Code

---

## Struktura lekcji

### Lekcja P.1: Dziedzictwo chaosu (~20 min)
**Cel:** Analiza odziedziczonych materialow
**Umiejetnosci:** Referencje @, delegowanie, synteza

**Uruchom:** `/start-p-1`

---

### Lekcja P.2: Fundament projektu (~25 min)
**Cel:** Stworzenie CLAUDE.md i planu
**Umiejetnosci:** /init, /memory, Plan Mode (Shift+Tab)

**Uruchom:** `/start-p-2`

---

### Lekcja P.3: W akcji (~35 min)
**Cel:** Budowa glownego outputu
**Umiejetnosci:** Normal Mode, Auto-Accept, Ctrl+B, szablony

**Uruchom:** `/start-p-3`

---

### Lekcja P.4: Review i launch (~25 min)
**Cel:** Konsultacje i finalizacja
**Umiejetnosci:** Checkpoint Pattern, /rename, /export, /resume

**Uruchom:** `/start-p-4`

---

## Warianty projektu

Mini-kurs oferuje dwa warianty do wyboru:

### Wariant A: Programistyczny
- Budujesz narzedzie CLI w Pythonie
- Analizujesz dane rejestracji (CSV)
- Generujesz raporty i statystyki

### Wariant B: Biurowy
- Tworzysz pakiet komunikacyjny
- Email, FAQ, brief dla wolontariuszy
- Praca z tekstem i dokumentami

Wyboru dokonujesz w Lekcji P.2.

---

## Nawigacja miedzy lekcjami

**Rozpocznij lekcje:**
- `/start-p-1` - Lekcja 1
- `/start-p-2` - Lekcja 2
- `/start-p-3` - Lekcja 3
- `/start-p-4` - Lekcja 4

**Pomoc:**
- `/pomoc` - ta strona

**Zarzadzanie sesja:**
- `/rename [nazwa]` - zapisz sesje z nazwa
- `/resume` - wroc do zapisanej sesji
- `/export` - eksportuj materialy

---

## Kluczowe umiejetnosci z Modulu 1

### Referencje (@ syntax)
```
@plik.md          - odwolanie do pliku
@folder/          - odwolanie do folderu
@folder/plik.md   - pelna sciezka
```

### Tryby pracy
- **Normal Mode** - standardowy tryb, Claude wykonuje akcje
- **Plan Mode** (Shift+Tab) - Claude tylko planuje, nie wykonuje
- **Auto-Accept** (`/auto-accept on/off`) - automatyczne akceptowanie zmian

### Komendy
- `/init` - inicjalizacja projektu (tworzy CLAUDE.md)
- `/memory` - zapisz informacje miedzy sesjami
- `/rename` - zmien nazwe sesji
- `/export` - eksportuj materialy
- `/resume` - wroc do poprzedniej sesji

### Skroty klawiszowe
- `Shift+Tab` - przelacz Plan/Normal Mode
- `Ctrl+B` (lub `Cmd+B`) - wyslij zadanie w tlo

---

## Rozwiazywanie problemow

### "Nie wiem gdzie jestem w kursie"
Wpisz:
```
Przeczytaj CLAUDE.md i powiedz mi na jakim etapie projektu jestem.
```

### "Zgubilem swoje materialy"
Uzyj `/resume` zeby wrocic do poprzedniej sesji. Jesli nie zapisales - niestety trzeba zaczac od nowa.

### "Claude nie widzi moich plikow"
Upewnij sie ze:
1. Jestes w odpowiednim folderze (folder z mini-kursem)
2. Uzywasz prawidlowej skladni: `@folder/plik.md`
3. Plik istnieje

### "Nie rozumiem co mam zrobic"
Kazda lekcja ma format:
- **STOP** - zatrzymaj sie i przeczytaj instrukcje
- **USER** - Twoja akcja (co wpisac)
- **ACTION** - co sie stanie

Postepuj krok po kroku.

### "Claude robi cos innego niz chce"
1. Badz bardziej precyzyjny w instrukcjach
2. Dodaj kontekst przez `@` referencje
3. Podziel zadanie na mniejsze kroki

### "Auto-Accept zrobil cos zlego"
1. Wpisz `/auto-accept off`
2. Przejrzyj co sie zmienilo
3. Popros Claude'a o cofniecie zmian lub uzyj git (`git checkout .`)

---

## Struktura folderow projektu

```
practices/m01/
├── .claude/
│   └── commands/        <- TU SA KOMENDY SLASH
│       ├── start-p-1.md
│       ├── start-p-2.md
│       ├── start-p-3.md
│       ├── start-p-4.md
│       └── pomoc.md
├── kontekst/
│   ├── SCENARIUSZ.md    <- Twoja sytuacja
│   ├── BRAND-VOICE.md   <- Jak pisze TechStart
│   └── BRIEF-WYDARZENIA.md <- Szczegoly wydarzenia
├── odziedziczony-chaos/ <- Materialy do analizy
│   ├── notatki-koordynatora.md
│   ├── feedback/
│   ├── rejestracje/
│   └── stare-materialy/
└── szablony/            <- Szablony do wykorzystania
```

---

## Wskazowki dla efektywnej pracy

1. **Czytaj instrukcje do konca** zanim zaczniesz dzialac
2. **Uzywaj referencji @** - to kluczowa umiejetnosc
3. **Zapisuj checkpointy** (`/rename`) przed duzymi zmianami
4. **Iteruj** - pierwszy draft rzadko jest idealny
5. **Deleguj analize** - nie musisz wszystkiego czytac sam

---

## Linki i zasoby

- Dokumentacja Claude Code: https://code.claude.com/docs/en/
- Referencje do plikow: https://code.claude.com/docs/en/references
- Komendy slash: https://code.claude.com/docs/en/slash-commands

---

## Kontakt

Jesli masz pytania dotyczace kursu, skontaktuj sie z nami przez platforme kursowa.

---

*Powodzenia z mini-kursem TechStart! Wpisz `/start-p-1` zeby zaczac.*
