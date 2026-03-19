# Review: Styl i zgodnosc z wytycznymi

**Zakres:** Lekcje 04.01-04.05 vs check2.md (wytyczne stylistyczne) i check3.md (styl autora)
**Tryb:** MEDIUM

---

## Lekcja 04.01 — Settings

### Problemy

**Linia 46 (S3):** "Ustawienia zarzadzane przez organizacje. Wdrazane przez IT — Ty ich nie edytujesz."
- Styl OK, ale mozna dodac wiecej energii.

**Linia 85-89 (S2):** "Ale uwaga — to nie jest zwykle nadpisywanie. Reguly zaleza od typu ustawienia:" + lista
- Dobrze! To jest wlasciwy rytm — krotkie, potem lista.

**Linia 187 (S2):** "Low zuzywa mniej tokenow na myslenie, high wiecej. Na prostych zadaniach low jest wystarczajacy i 3-4 razy tanszy. Na skomplikowanym refactoringu high sie oplaca, bo Claude popelni mniej bledow i nie bedziesz musial powtarzac."
- Swietne! Konkretne, z liczba (3-4x), z uzasadnieniem. Wzorcowy fragment.

**Linia 415 (S3):** "Claude Code automatycznie uzywa prompt caching. Co to oznacza w praktyce?"
- Pytanie retoryczne — OK, ale to jedyne w tej sekcji. Pasuje.

**Ogolnie 04.01:** Styl dobry. Dialogi naturalne. Brak wiekszych problemow AI-smrodu.

---

## Lekcja 04.02 — Pluginy

### Problemy

**Linia 55 (S3):** "dystrybuowac przez marketplace, miec wersjonowanie, lub potrzebujesz tych samych skilli w wielu projektach"
- Trojca cech — lekko pachnie check2 zasada #10 (zasada trzech). Ale tutaj kazda cecha wnosi cos konkretnego — OK.

**Linia 86 (S2):** "Czesty blad: nie wrzucaj `commands/`, `agents/`, `skills/` do katalogu `.claude-plugin/`. Tam zyje tylko `plugin.json`. Reszta jest na poziomie glownym pluginu."
- Doskonale! To jest wlasciwy styl — praktyczna rada, konkretna, zajmuje stanowisko.

**Linia 345 (S2):** "W lekcji 03.05 omowilismy bezpieczenstwo skilli. Pluginy rozszerzaja te same zasady — ale skala ryzyka jest wieksza, bo plugin moze zawierac hooki (kod uruchamiany automatycznie) i konfiguracje MCP (dostep do zewnetrznych serwisow)."
- Dlugawe zdanie. Mozna rozbic.
- **Fix:** "W lekcji 03.05 omowilismy bezpieczenstwo skilli. Pluginy rozszerzaja te same zasady. Ale skala ryzyka jest wieksza — plugin moze zawierac hooki (kod uruchamiany automatycznie) i konfiguracje MCP (dostep do zewnetrznych serwisow)."

**Ogolnie 04.02:** Styl dobry. Sekcja hands-on jest praktyczna i krok-po-kroku.

---

## Lekcja 04.03 — CI/CD

### Problemy

**Linia 20 (S2):** "Claude Code to nie tylko interaktywna sesja w terminalu. Mozesz go wywolywac ze skryptow, wrzucac do potokow Unix i integrowac z GitHub Actions. Dzis nauczycie sie, jak wyjac Claude'a z terminala i wprzegnac w automatyzacje."
- "Dzis nauczycie sie" — niezgodne z check2 zasada #6 (pisz jak mowisz, "ty"). Powinno byc "Dzis nauczysz sie" (2 osoba l.poj.).
- **Fix:** "Dzis nauczysz sie, jak wyjac Claude'a z terminala i wprzegnac w automatyzacje."

**Linia 38 (S2):** "Rozumiesz, jak dziala sterowanie zdalne (`claude remote-control`)."
- Obiecane w celach, ale nie omowione w tresci (F12 z REVIEW-FAKTY). Narusza tez check2 zasade #14 (preferuj czynnosci i nastepny krok) — bo nie daje czytelnikowi zadnego kroku.

**Linia 108 (S3):** "Claude Code swietnie wpasowuje sie w filozofie Unix: jedno narzedzie robi jedna rzecz, dane plyna przez potoki."
- Lekko sztuczny kontrast. Ale to nie jest "To nie jest X. To Y", wiec OK.

**Linia 213 (S2):** "To jest prawdziwa moc trybu nieinteraktywnego."
- check2 zasada #1 (unikaj przesady). "Prawdziwa moc" brzmi patetycznie.
- **Fix:** "Tu tryb nieinteraktywny pokazuje pelnia mozliwosci." lub po prostu usunac i zaczac od "Claude Code ma oficjalna GitHub Action..."

**Ogolnie 04.03:** Dobry styl. Duzo praktycznych przykladow. Jeden problem z forma "nauczycie sie".

---

## Lekcja 04.04 — Agent Teams

### Problemy

**Linia 49 (S3):** "Model mentalny: **szef i asystent**."
- Dobry zabieg! Modele mentalne pomagaja w zrozumieniu. Spójne z "model mentalny: **zespol projektowy**" ponizej.

**Linia 60 (S3):** "Model mentalny: **zespol projektowy**. Lider rozdziela zadania, czlonkowie pracuja niezaleznie, moga rozmawiac ze soba, dziela wspolna liste zadan."
- Cztery cechy w jednym zdaniu — mozna rozbic.

**Linia 115 (S2):** Blok kodu z naturalnym jezykiem (tworzenie zespolu). Dobra decyzja — pokazuje ze nie trzeba programowac.

**Linia 261 (S3):** "Konkurencja hipotez to silna technika."
- "Silna technika" — lekko AI-smrodowe.
- **Fix:** "Konkurencja hipotez dziala dobrze." lub "To skuteczna technika."

**Ogolnie 04.04:** Bardzo dobry styl. Modele mentalne, praktyczne scenariusze, konkretne limity (3-5 czlonkow, 5-6 zadan).

---

## Lekcja 04.05 — Voice, Performance, Summary

### Problemy

**Linia 78 (S3):** "Claude ma okno kontekstowe — okreslona ilosc tekstu, ktora moze 'trzymac w glowie'."
- Metafora "trzymac w glowie" — dobra, naturalna. OK.

**Linia 209 (S2):** "Vague: 'Improve this codebase' — Claude skanuje wszystko. Specific: 'Add input validation to the login function in auth.ts' — Claude czyta jeden plik."
- Doskonaly kontrast! Konkretny, z konsekwencjami (10x roznica w tokenach).

**Linia 210-212 (S3):** "Roznica w zuzyciu tokenow: 10x."
- Odwazne stwierdzenie. Brak dowodu, ale heurystyka jest jasna. check2 zasada #9 (zajmij stanowisko) — OK.

**Linia 312-316 (S2):** "Przed kursem: 'Claude Code to chatbot, ktoremu mowie co zrobic.' Po kursie: 'Claude Code to platforma agentowa, na ktorej buduje narzedzia, workflow i zespoly.'"
- To jest konstrukcja "To nie jest X. To Y" z check2 zasada #3. ALE — tu akurat pasuje jako podsumowanie calego kursu. Podwojna krawedz.
- **Sugestia:** Mozna zostawic — to jest jedyne miejsce w calym module, gdzie taki kontrast ma sens (zmiana mentalnego modelu to sedno kursu).

**Linia 316 (S2):** "To nie jest zmiana techniczna. To zmiana sposobu myslenia o pracy z AI."
- To juz JEST "To nie jest X. To Y" — check2 zasada #3.
- **Fix:** "Zmiana jest mentalna, nie techniczna." lub "Sposoby myslenia o pracy z AI zmienily sie bardziej niz narzedzia."

**Linia 317 (S2):** "Przestajesz byc operatorem i stajesz sie architektem."
- Jeszcze jeden sztuczny kontrast. Trzy z rzedu.
- **Fix:** Zostawic jeden kontrast (linie 312-315), usunac lub przeformulowac linie 316-317.

**Ogolnie 04.05:** Dobry styl. Sekcja podsumowujaca ma tendencje do pathosu (trzy kontrasty z rzedu), ale reszta lekcji jest konkretna.

---

## Powtarzajace sie tiki

### Pozytywne (powtarzac dalej)
1. **Modele mentalne** — "szef i asystent" vs "zespol projektowy" (04.04) — doskonaly zabieg
2. **Konkretne liczby** — 3-4x tańszy (04.01), 10x roznica (04.05), ~7x tokenow (04.04)
3. **Dialogi naturalne** — kazda postac ma swoj glos, nie sa wymienne
4. **Krok-po-krok hands-on** — 04.02 sekcja 3 jest wzorcowa
5. **Kontrasty Vague vs Specific** — 04.05 linia 209 jest doskonala

### Negatywne (poprawic)
1. **Forma "nauczycie sie"** — jeden przypadek w 04.03, ale narusza zasade 2. osoby l.poj.
2. **Pathos w zakonczeniu** — 04.05 ma trzy kontrasty z rzedu (linie 312-317)
3. **"Prawdziwa moc"** — 04.03 linia 213, typowe AI-slowo
4. **"Silna technika"** — 04.04 linia 261, lekko AI-smrodowe
5. **Brak Marty w 04.02** — narusza spojnosc postaci

---

## Zgodnosc z check3.md (styl autora)

### Relacja i perspektywa
- "Ty/Twoje" uzywane konsekwentnie — OK
- Autor (Pawel) obecny jako mentor — OK
- Brak bezosobowego korpo — OK (jeden wyjątek: "nauczycie sie" w 04.03)

### Rytm i forma
- Krotkie akapity — OK
- Zmiana dlugosci zdan — OK
- Lista-narracja-lista — OK
- Brak "sciany tekstu" — OK

### Energia i ekspresja
- Naturalne dialogi — OK
- Brak przesadnych emotikonow — OK (zero emotikonow w lekcjach, co jest poprawne)

### Rejestr jezykowy
- Polszczyzna + angielskie terminy techniczne — OK
- Brak korpo-kalek — OK
- Brak przypadkowych anglicyzmow — OK

---

## Slowniczek

Kazda lekcja ma slowniczek:
- 04.01: 7 terminow — OK
- 04.02: 7 terminow — OK
- 04.03: 7 terminow — OK
- 04.04: 7 terminow — OK
- 04.05: 7 terminow — OK

Terminy sa rozne miedzy lekcjami (brak powtorzen). Definicje sa konkretne i zwiezle. OK.

---

## Podsumowanie

**Problemow znalezionych:** 8
- **S2 (srednie):** 5 problemow (forma "nauczycie sie", "prawdziwa moc", trzy kontrasty z rzedu, "silna technika", jedno dlugie zdanie w 04.02)
- **S3 (kosmetyczne):** 3 problemy (drobne kwestie rytmu)

**Ogolna ocena stylu:** 7.5/10
Lekcje sa dobrze napisane, naturalne, z konkretnymi przykladami. Glowne problemy to drobne AI-naleciałosci i nadmiar pathosu w zakonczeniu kursu. Latwe do poprawienia.
