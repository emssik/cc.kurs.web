# Review: Spojnosc miedzy lekcjami

**Zakres:** Lekcje 04.01-04.05 — spojnosc wewnetrzna modulu i z reszta kursu

---

## 1. Postacie

### Uzycie postaci w dialogach

| Postac | 04.01 | 04.02 | 04.03 | 04.04 | 04.05 |
|--------|-------|-------|-------|-------|-------|
| Karina (frontend) | Tak | Tak | Tak | Tak | Tak |
| Olek (PM) | Tak | Tak | Tak | Tak | Tak |
| Marta (analityczka) | Tak | Nie | Tak | Tak | Tak |
| Pawel (mentor) | Tak | Tak | Tak | Tak | Tak |

**Problem S1:** Marta nie ma dialogu w lekcji 04.02. Kazda z czterech postaci powinna pojawiac sie w kazdej lekcji, chocby krotko.
- **Fix:** Dodaj dialog Marty w 04.02 — np. przy sekcji bezpieczenstwa (pasuje do jej profilu analitycznego).

### Spojnosc ról

- Karina konsekwentnie jako frontend dev — OK
- Olek konsekwentnie jako PM/marketer — OK, ale w 04.04 sekcja "Research wieloaspektowy (Olek)" dobrze podkreśla jego perspektywe
- Marta konsekwentnie jako analityczka danych — OK
- Pawel konsekwentnie jako mentor — OK

### Dialog otwierajacy

Kazda lekcja zaczyna sie dialogiem-hakiem. Spojnosc formatu:
- 04.01: Marta wraca z urlopu, problem z uprawnieniami — dobry hak
- 04.02: Karina ma 12 repo, problem z kopiowaniem — dobry hak
- 04.03: Olek i Marta z problemami automatyzacji — dobry hak
- 04.04: Karina z refactorem, porownanie z subagentami — dobry hak
- 04.05: Piatek, koniec kursu, Olek o voice, Marta o performance — dobry hak

Wszystkie haki sa rozne, nie powtarzaja wzorca. OK.

---

## 2. Odwolania miedzy lekcjami

### Wewnatrz modulu 04

- 04.01 → 04.02: "W nastepnej lekcji: zapakujesz swoje skille..." — OK
- 04.02 → 04.03: "W nastepnej lekcji: wyciagniesz Claude Code z interaktywnej sesji..." — OK
- 04.03 → 04.04: "W nastepnej lekcji: poznasz Agent Teams..." — OK
- 04.04 → 04.05: "W nastepnej lekcji: Voice Mode, optymalizacja wydajnosci..." — OK
- 04.05: Zamyka kurs — OK

### Do wczesniejszych modulow

**04.01:**
- Brak odwolan do wczesniejszych modulow (poza ogolnym kontekstem) — OK, lekcja o settings jest w duzej mierze samodzielna

**04.02:**
- Linia 11: "skilla do code review (znasz go z modulu 03)" — OK
- Linia 18: "W lekcji 03.05 mowilismy o pluginach" — OK
- Linia 39: "W module 03 budowales skille" — OK
- Linia 119: "skilla `code-review` z lekcji 03.01" — OK
- Linia 169: "identyczne jak custom slash commands z lekcji 11-12" — PROBLEM (patrz F9 w REVIEW-FAKTY)
- Linia 189: "takie same jak subagenty z lekcji 02.04-05" — OK

**04.03:**
- Linia 24: "W lekcji 08 modulu 01 mowilismy o `claude -p`" — OK (lekcja 01.08 omawiala slash commands i tryby)

**04.04:**
- Linia 24: "W module 02 mowilismy o subagentach" — OK
- Linia 45-54: Porownanie z subagentami z modulu 02 — OK

**04.05:**
- Linia 251: "Checkpoint pattern (przypomnienie z lekcji 08)" — OK (lekcja 01.08)
- Linia 280-308: Mapa kompetencji odwoluje sie do calego kursu — OK

### Problem S2: Niejasne odwolanie w 04.02

Linia 169: "lekcji 11-12" — nie jest jasne, ktory modul. W kursie nie ma globalnej numeracji 11-12 w module 04. To prawdopodobnie odniesienie do lekcji modulu 01 lub 02. Trzeba ukonkretnić.

---

## 3. Przeplyw logiczny

### Kolejnosc lekcji

01 (Settings) → 02 (Pluginy) → 03 (CI/CD) → 04 (Agent Teams) → 05 (Voice/Performance/Summary)

Logika:
- Settings jako fundament konfiguracji — sensowne na poczatku
- Pluginy jako kontener dla skilli z modulu 03 — naturalna kontynuacja
- CI/CD jako zastosowanie w automatyzacji — logiczny nastepny krok
- Agent Teams jako zaawansowana orkiestracja — pasuje po CI/CD
- Voice/Performance/Summary jako zamkniecie — OK

**Brak problemow z kolejnoscia.**

### Narastanie trudnosci

- 04.01: Sredniozaawansowany — OK
- 04.02: Sredniozaawansowany — OK
- 04.03: Sredniozaawansowany — OK
- 04.04: Zaawansowany — OK (jedyny z wyzszym poziomem)
- 04.05: Sredniozaawansowany — OK

**Problem S3:** 04.04 ma poziom "Zaawansowany", co jest spójne z trescia (Agent Teams sa eksperymentalne i bardziej skomplikowane). Ale 04.05 wraca do "Sredniozaawansowany" — to moze byc mylace, bo performance tips i 1M context tez sa zaawansowane.
- **Sugestia:** Mozna zostawic jak jest — 04.05 ma tez czesc podsumowujaca, ktora jest prostsza.

---

## 4. Powtorzenia tresci

### Prompt caching

- Omowione w 04.01 (sekcja 6, linie 413-428) — krotko, z przykladem wylaczania
- Omowione w 04.05 (sekcja 3, linie 92-108) — szerzej, z kontekstem wydajnosci

**Problem S4:** Prompt caching pojawia sie dwa razy. Nie jest to sprzecznosc, ale redundancja. W 04.01 jest w kontekscie settings, w 04.05 w kontekscie performance.
- **Fix:** W 04.01 skrocic do jednego zdania z odwolaniem do 04.05: "Wiecej o prompt caching w lekcji o wydajnosci."

### DISABLE_PROMPT_CACHING

- 04.01 linia 424: `DISABLE_PROMPT_CACHING=1` i `DISABLE_PROMPT_CACHING_HAIKU=1`
- 04.05 linia 103: `DISABLE_PROMPT_CACHING=1` i `DISABLE_PROMPT_CACHING_OPUS=1`

**Problem S5:** Niespojnosc! W 04.01 jest `_HAIKU`, w 04.05 jest `_OPUS`. Albo obie formy istnieja (i obie lekcje sa poprawne), albo jedna jest bledna.
- **Fix:** Ujednolicic — prawdopodobnie obie formy istnieja (per-model disable), ale warto to potwierdzic i w obu lekcjach wymienic obie.

### Effort levels

- Omowione szczegolowo w 04.01 (sekcja 2)
- Wspomniane w 04.05 (sekcja 6, "Redukcja kosztow")

To jest OK — 04.01 wprowadza, 04.05 przypomina w kontekscie kosztow. Brak redundancji.

### pluginTrustMessage / strictKnownMarketplaces

- Omowione w 04.01 (sekcja 3, managed settings)
- Omowione w 04.02 (sekcja 7, bezpieczenstwo pluginow)

To jest OK — rozne konteksty. W 04.01 z perspektywy admina, w 04.02 z perspektywy uzytkownika.

---

## 5. Format dokumentacji (linki)

Wszystkie linki uzywaja formatu `/en/`:
- 04.01: 4 linki — wszystkie z `/en/` — OK
- 04.02: 4 linki — wszystkie z `/en/` — OK
- 04.03: 4 linki — wszystkie z `/en/` — OK
- 04.04: 3 linki — wszystkie z `/en/` — OK
- 04.05: 4 linki — wszystkie z `/en/` — OK

**Brak problemow.**

---

## 6. Frontmatter YAML

Wszystkie lekcje maja spojny frontmatter:
- `lesson`: "04.0X" — OK
- `title`: po polsku — OK
- `description`: po polsku — OK
- `module`: "04-finish" — OK

**Brak problemow.**

---

## 7. Dlugosci lekcji (word count)

Wymaganie: 2000-4000 slow.

Przyblizone word counts:
- 04.01: ~1850 slow — PONIZEJ minimum
- 04.02: ~1710 slow — PONIZEJ minimum
- 04.03: ~1820 slow — PONIZEJ minimum
- 04.04: ~1790 slow — PONIZEJ minimum
- 04.05: ~2000 slow — NA GRANICY minimum

**Problem S6:** Cztery z pieciu lekcji sa ponizej wymaganego minimum 2000 slow. Trzeba rozbudowac kazda o 200-500 slow.

Sugestie co rozbudowac:
- 04.01: Dodac wiecej o debugowaniu konfiguracji (np. typowe problemy i rozwiazania)
- 04.02: Dodac dialog Marty, rozbudowac sekcje hands-on (wiecej krokow)
- 04.03: Dodac sekcje o remote-control (obiecana w celach) lub rozbudowac praktyczne przyklady
- 04.04: Rozbudowac sekcje o komunikacji w zespole i kosztach
- 04.05: OK — mozna nieznacznie rozbudowac sekcje "Co dalej"

---

## Podsumowanie

**Problemow znalezionych:** 6
- **S1 (krytyczne):** Brak Marty w 04.02
- **S2 (srednie):** Niejasne odwolanie "lekcji 11-12" w 04.02
- **S3 (niskie):** Nierowne poziomy trudnosci 04.04 vs 04.05
- **S4 (srednie):** Redundancja prompt caching (04.01 i 04.05)
- **S5 (srednie):** Niespojnosc DISABLE_PROMPT_CACHING_HAIKU vs _OPUS
- **S6 (krytyczne):** 4/5 lekcji ponizej minimum 2000 slow
