# Mail #04: Glob i Grep - Mistrzowie Wyszukiwania

## Przypomnienie z poprzedniej lekcji

W poprzednim mailu poznaliśmy narzędzie **Bash** - Twój bezpośredni dostęp do terminala. Dowiedzieliśmy się, że Claude potrafi wykonywać komendy systemowe, instalować zależności (`npm install`, `pip install`), uruchamiać testy, a nawet pracować w tle dzięki `run_in_background: true`. Nauczyliśmy się też, jak łączyć komendy sekwencyjnie (`&&`) i dlaczego warto cytować ścieżki ze spacjami. Bash to potężne narzędzie, ale ma jedną wadę - nie jest przeznaczone do **wyszukiwania**.

I tu wkraczają Glob i Grep - specjaliści od odnajdywania igły w stogu siana.

## 2 pytania do poprzedniej lekcji

1. **Jaka flaga pozwala uruchomić komendę w tle**, aby nie blokować terminala?
2. **Jak poprawnie wywołać komendę dla ścieżki ze spacjami** - `cd /Users/Jan Kowalski/Projekt` czy `cd "/Users/Jan Kowalski/Projekt"`?

<details>
<summary>Odpowiedzi</summary>

1. `run_in_background: true` - pozwala uruchomić długotrwałe operacje (np. serwer deweloperski) w tle
2. Poprawna składnia to `cd "/Users/Jan Kowalski/Projekt"` - ścieżki ze spacjami ZAWSZE w cudzysłowach

</details>

---

## TLDR (Too Long, Didn't Read)

**Glob** i **Grep** to dwa narzędzia wyszukiwania, które działają na zasadzie "divide and conquer":

- **Glob** = wyszukiwanie **plików** po nazwach (pattern matching: `**/*.config.js`)
- **Grep** = wyszukiwanie **zawartości** w plikach (regex: `TODO:`, `function.*return`)

Kluczowy trick: **najpierw Glob (gdzie?), potem Grep (co?)**. To oszczędza tokeny i przyspiesza pracę. Grep ma 3 tryby wyjścia: `files_with_matches` (szybki rekonesans), `count` (skala zmian), `content` (szczegóły). Używaj ich mądrze, a zaoszczędzisz setki tokenów dziennie.

---

## Mem z Twittera

*"When you finally find that one file you've been searching for 30 minutes... and it was in the root directory the whole time."*

[Zobacz mem tutaj](https://twitter.com/ThePracticalDev/status/1234567890)

Każdy programista to przeżył. Szukasz pliku konfiguracyjnego przez pół godziny, używając `ls`, `cd`, `ls`, `cd`... a on leżał sobie w katalogu głównym projektu. **Glob** rozwiązuje ten problem w 2 sekundy: `Glob pattern: "**/*.config.js"` - gotowe, znaleziony.

To jak różnica między szukaniem kluczy po ciemku a włączeniem światła.

---

## Treść lekcji: Glob i Grep - Jak wyszukiwać jak profesjonalista

### Dlaczego nie używać samego Bash do wyszukiwania?

Możesz pokusić się o użycie klasycznych komend Unix:

```bash
find . -name "*.js"
grep -r "TODO" .
```

I to zadziała! Ale:

1. **Marnujesz tokeny** - Bash zwraca surowe dane, które Claude musi przetworzyć
2. **Brak optymalizacji** - nie masz kontroli nad sortowaniem czy limitami
3. **Brak integracji** - musisz ręcznie parsować wyniki

Glob i Grep są **dedykowanymi narzędziami** zoptymalizowanymi dla Claude Code. Działają szybciej, kosztują mniej i dają lepsze wyniki.

---

### Glob - Wyszukiwanie Plików (The "Where")

Glob odpowiada na pytanie: **"Gdzie są pliki pasujące do wzorca?"**

#### 1. Podstawowy pattern matching

**Idea:** Znajdź wszystkie pliki konfiguracyjne w projekcie.

```
> Znajdź wszystkie pliki konfiguracyjne
```

Claude użyje:
```
Glob pattern: "**/*.config.js"
```

Wynik: Lista plików jak `webpack.config.js`, `jest.config.js`, `babel.config.js`.

**Wildcard patterns:**
- `*` - dowolne znaki w nazwie pliku (np. `*.js`)
- `**` - rekurencyjne przeszukiwanie podkatalogów (np. `**/*.ts`)
- `?` - pojedynczy znak (np. `file?.txt` znajdzie `file1.txt`, `file2.txt`)
- `[abc]` - jeden z podanych znaków (np. `file[123].js`)

#### 2. Glob w konkretnym katalogu (optymalizacja tokenów)

**Problem:** Szukanie w całym repozytorium trwa długo i kosztuje dużo.

**Rozwiązanie:** Szukaj lokalnie.

```
> Znajdź wszystkie komponenty React w katalogu src/components
```

Claude użyje:
```
Glob pattern: "*.tsx"
path: "./src/components"
```

**Różnica:**
- Bez `path`: Przeszukuje 10,000 plików w całym projekcie (50,000 tokenów)
- Z `path`: Przeszukuje 50 plików w `src/components` (500 tokenów)

To **100x oszczędność**!

#### 3. Sortowanie po dacie modyfikacji - kontekst "świeżości"

**Ciekawy pomysł:** "Pokaż mi pliki, nad którymi ostatnio pracowaliśmy"

```
> Które pliki były ostatnio modyfikowane?
```

Claude użyje Glob, który **domyślnie sortuje wyniki od najnowszych**. To daje Claude'owi kontekst:

- Plik zmodyfikowany 2 minuty temu = "pracujesz nad tym teraz"
- Plik sprzed 6 miesięcy = "legacy code, ostrożnie"

**Przykład biznesowy (poza programowaniem):**

Prowadzisz firmę i masz folder z fakturami. Chcesz zobaczyć ostatnio wystawione:

```
> Pokaż mi ostatnio wystawione faktury
```

Claude użyje `Glob pattern: "**/*.pdf" path: "./faktury"` i posortuje od najnowszych.

---

### Grep - Wyszukiwanie Zawartości (The "What")

Grep odpowiada na pytanie: **"Co jest w środku tych plików?"**

#### 1. Podstawowe wyszukiwanie regex

**Moc:** Znajdowanie użycia konkretnej funkcji lub zmiennej w całym projekcie.

```
> Znajdź wszystkie miejsca, gdzie używamy funkcji calculateTotal
```

Claude użyje:
```
Grep pattern: "calculateTotal"
```

Wynik: Lista plików zawierających tę funkcję.

**Praktyczny przykład dla programisty:**

```
> Znajdź wszystkie miejsca wymagające pracy (TODO)
```

Claude użyje:
```
Grep pattern: "TODO:"
```

Możesz zobaczyć:
```
src/auth.ts:45: // TODO: Add password validation
src/api.ts:120: // TODO: Implement rate limiting
tests/users.test.ts:89: // TODO: Add edge cases
```

**Przykład biznesowy:**

Masz folder z notkami ze spotkań (pliki `.txt`). Chcesz znaleźć wszystkie wzmianki o kliencie "Kowalski":

```
> Znajdź wszystkie wzmianki o kliencie Kowalski w notatkach
```

Claude użyje:
```
Grep pattern: "Kowalski"
path: "./notatki"
```

#### 2. Output modes - sztuka oszczędzania tokenów

Grep ma **3 tryby wyjścia**. Używaj ich strategicznie!

| Mode | Co zwraca | Kiedy używać | Koszt tokenów |
|------|-----------|--------------|---------------|
| `files_with_matches` | Tylko nazwy plików | Szybki rekonesans "gdzie to jest?" | Niski (~100) |
| `count` | Liczba wystąpień w każdym pliku | "Jaka skala zmian?" | Bardzo niski (~50) |
| `content` | Pełne linie z kodem | "Pokaż mi szczegóły" | Wysoki (~5000) |

**Strategia profesjonalisty:**

1. **Krok 1:** Użyj `count` lub `files_with_matches` aby zobaczyć skalę
2. **Krok 2:** Jeśli skala jest OK, użyj `content` aby pobrać szczegóły

**Przykład:**

```
> Ile razy używamy funkcji deprecatedAPI?
```

Claude użyje:
```
Grep pattern: "deprecatedAPI"
output_mode: "count"
```

Wynik:
```
src/legacy.ts: 45
src/utils.ts: 12
src/api.ts: 3
```

Teraz wiesz, że `src/legacy.ts` to główny problem (45 użyć). Dopiero teraz używasz `content`:

```
> Pokaż mi kod używający deprecatedAPI w src/legacy.ts
```

Claude użyje:
```
Grep pattern: "deprecatedAPI"
path: "src/legacy.ts"
output_mode: "content"
```

**Oszczędność:** Zamiast od razu pobierać 5000 linii kodu ze wszystkich plików, najpierw sprawdziłeś skalę (50 tokenów) i dopiero potem pobrałeś szczegóły dla jednego pliku (500 tokenów).

#### 3. Filtrowanie po typie pliku

Zamiast przeszukiwać wszystko, ogranicz się do konkretnych typów plików.

```
> Znajdź użycie API_KEY w plikach JavaScript
```

Claude użyje:
```
Grep pattern: "API_KEY"
type: "js"
```

**Dostępne typy:**
- `js` - JavaScript
- `ts` - TypeScript
- `py` - Python
- `md` - Markdown
- `json` - JSON
- `css` - CSS/SCSS
- `html` - HTML

**Alternatywa - glob pattern:**

```
Grep pattern: "API_KEY"
glob: "*.{js,ts,jsx,tsx}"
```

#### 4. Multiline - regex across lines

**Problem:** Czasami wzorzec rozciąga się na wiele linii.

**Przykład:**

Chcesz znaleźć funkcje, które od razu zwracają wartość (arrow functions):

```javascript
const getData = () =>
  fetch('/api/data')
```

Standardowy Grep (linia po linii) tego nie znajdzie. Potrzebujesz `multiline: true`.

```
> Znajdź wszystkie funkcje strzałkowe, które od razu zwracają wartość
```

Claude użyje:
```
Grep pattern: "const.*=.*=>\\n.*return"
multiline: true
```

**Pro-Tip:**

Multiline jest **kosztowne** (musi analizować cały plik jako jedną całość). Używaj tylko gdy naprawdę potrzebujesz.

**Przykład biznesowy:**

Masz szablony emaili w plikach tekstowych. Każdy email zaczyna się od `Subject:` i kończy na `---`. Chcesz wyciągnąć wszystkie emaile dotyczące faktury:

```
> Znajdź wszystkie emaile dotyczące faktur
```

Claude użyje:
```
Grep pattern: "Subject:.*faktur[aąę].*\\n.*---"
multiline: true
path: "./szablony-emaili"
```

---

### Połącz Glob + Grep = Workflow Mistrza

**Najlepsza praktyka:** Najpierw Glob (znajdź pliki), potem Grep (przeszukaj je).

#### Scenariusz 1: Znajdź wszystkie testy zawierające "authentication"

```
> Znajdź wszystkie pliki testowe związane z autentykacją
```

Claude wykonuje:

**Krok 1 - Glob:**
```
Glob pattern: "**/*.test.ts"
```

Wynik: 50 plików testowych.

**Krok 2 - Grep:**
```
Grep pattern: "authentication"
glob: "*.test.ts"
output_mode: "files_with_matches"
```

Wynik: 5 plików (`auth.test.ts`, `login.test.ts`, itd.)

**Krok 3 - Szczegóły:**
```
Grep pattern: "authentication"
path: "auth.test.ts"
output_mode: "content"
```

#### Scenariusz 2: Analiza logów sprzedażowych

Prowadzisz e-commerce. Masz logi sprzedaży w formacie `.log`. Chcesz znaleźć wszystkie transakcje powyżej 10,000 PLN.

```
> Znajdź wszystkie duże transakcje (>10000 PLN) w logach
```

Claude wykonuje:

**Krok 1 - Glob:**
```
Glob pattern: "**/*.log"
path: "./logi-sprzedazy"
```

**Krok 2 - Grep:**
```
Grep pattern: "TRANSACTION.*[0-9]{5,} PLN"
glob: "*.log"
output_mode: "content"
```

Wyjaśnienie regex:
- `TRANSACTION` - szukamy linii zaczynających się od tego słowa
- `.*` - dowolne znaki
- `[0-9]{5,}` - co najmniej 5 cyfr (czyli 10,000+)
- `PLN` - waluta

#### Scenariusz 3: Znajdowanie klientów VIP w bazie CSV

Masz bazę klientów w formacie CSV. Chcesz znaleźć wszystkich z kategorią "VIP".

```
> Znajdź wszystkich klientów VIP w bazie
```

Claude wykonuje:

**Krok 1 - Glob:**
```
Glob pattern: "klienci*.csv"
path: "./baza-danych"
```

**Krok 2 - Grep:**
```
Grep pattern: ",VIP,"
glob: "*.csv"
output_mode: "content"
```

Wynik:
```
klienci_2024.csv:
145,Jan Kowalski,VIP,jan@example.com
289,Anna Nowak,VIP,anna@example.com
```

---

### Zaawansowane techniky

#### 1. Case insensitive search (`-i`)

Szukasz "error" ale nie wiesz czy pisane "Error", "ERROR", czy "error"?

```
Grep pattern: "error"
-i: true
```

Znajdzie wszystkie warianty.

#### 2. Context lines (`-A`, `-B`, `-C`)

Czasami chcesz zobaczyć linijki **wokół** znalezienia.

```
Grep pattern: "CRITICAL ERROR"
output_mode: "content"
-A: 3  # 3 linie AFTER
-B: 2  # 2 linie BEFORE
```

Wynik:
```
45: function processPayment() {
46:   if (!validateCard()) {
47:     console.log("CRITICAL ERROR: Invalid card")
48:     return false
49:   }
50:   chargeCard()
```

**-C: 5** to skrót na `-A: 5 -B: 5` (5 linii w obie strony).

#### 3. Head limit i offset (pagination)

Gdy wyników jest **za dużo**, użyj limitów:

```
Grep pattern: "import"
output_mode: "content"
head_limit: 50  # Tylko pierwsze 50 wyników
```

Albo skip pierwszych N wyników:

```
Grep pattern: "import"
output_mode: "content"
offset: 100     # Skip pierwszych 100
head_limit: 50  # Pokaż następne 50
```

To jak **paginacja** w Google - strona 1, strona 2, itd.

---

### Przykłady biznesowe poza programowaniem

#### Analiza faktur

Folder `./faktury` zawiera setki PDF-ów. Chcesz znaleźć wszystkie od firmy "ABC Corp":

```
> Znajdź wszystkie faktury od ABC Corp
```

Claude użyje:
```
Glob pattern: "*.pdf"
path: "./faktury"
# Następnie Claude użyje Read na znalezionych plikach i przeszuka zawartość
```

#### Przeszukiwanie ofert handlowych

Masz folder `./oferty` z plikami Word (.docx). Chcesz znaleźć wszystkie oferty zawierające rabat powyżej 20%:

```
> Znajdź oferty z rabatem >20%
```

Claude może:
1. Użyć Glob na `**/*.docx`
2. Użyć Read na każdym pliku
3. Przeszukać tekst regex `rabat.*2[0-9]%|rabat.*[3-9][0-9]%`

#### Monitorowanie wzmianek o produkcie

Masz pliki tekstowe z feedbackiem klientów. Chcesz znaleźć wszystkie negatywne opinie:

```
> Znajdź wszystkie negatywne opinie (zawierające "słabe", "problem", "błąd")
```

Claude użyje:
```
Grep pattern: "słab[ey]|problem|błąd"
glob: "*.txt"
path: "./feedback"
output_mode: "content"
```

---

## Podsumowanie

Glob i Grep to **fundament efektywnego wyszukiwania** w Claude Code:

1. **Glob = "Gdzie?"** - znajdź pliki pasujące do wzorca (`**/*.config.js`)
2. **Grep = "Co?"** - przeszukaj zawartość plików (regex, multiline)
3. **Strategia tokenów:** Najpierw `count`/`files_with_matches`, potem `content`
4. **Workflow:** Glob → Grep (files) → Grep (content)

**Zapamiętaj wzór:**
- Szukasz plików po nazwie? → **Glob**
- Szukasz tekstu w plikach? → **Grep**
- Nie wiesz jak duża skala? → **Grep count** najpierw
- Chcesz szczegóły? → **Grep content** na koniec

To jak przejście z latarki (Bash `find`/`grep`) do reflektora (Glob/Grep). Ta sama robota, ale 10x szybciej i 100x taniej w tokenach.

---

## 3 pytania kontrolne

1. **Jaka jest różnica między Glob a Grep?** Które narzędzie użyjesz do znalezienia plików o nazwie `*.config.js`, a które do znalezienia kodu zawierającego `TODO:`?

2. **Dlaczego powinieneś najpierw użyć `Grep output_mode: "count"`** przed użyciem `output_mode: "content"`?

3. **Co robi flaga `multiline: true` w Grep** i dlaczego jest kosztowna?

<details>
<summary>Odpowiedzi</summary>

1. **Glob** = wyszukiwanie **plików** po nazwie/wzorcu. **Grep** = wyszukiwanie **zawartości** w plikach. Do `*.config.js` użyj Glob, do `TODO:` użyj Grep.

2. `count` pokazuje skalę (ile wystąpień w każdym pliku) przy minimalnym koszcie tokenów. Jeśli jest 1000 wyników, nie chcesz od razu pobierać całego contentu. Najpierw `count` (50 tokenów), potem `content` tylko dla istotnych plików (500 tokenów).

3. `multiline: true` pozwala regex dopasowywać wzorce **rozciągające się na wiele linii** (np. funkcje wieloliniowe). Jest kosztowna, bo zamiast analizować plik linia po linii, musi załadować cały plik do pamięci jako jeden string.

</details>

---

## 2-3 zadania praktyczne

### Zadanie 1: Znajdź swoje konfiguracje (10 minut)

Użyj Glob, aby znaleźć wszystkie pliki konfiguracyjne w Twoim projekcie:

```
> Znajdź wszystkie pliki konfiguracyjne (.config.js, .config.ts, .json)
```

**Podpowiedź:** Pattern: `**/*.config.{js,ts}` lub `**/*.json`

**Dla biznesu (poza programowaniem):**
Znajdź wszystkie faktury PDF w folderze firmowym:
```
> Znajdź wszystkie pliki PDF w folderze ./dokumenty
```

### Zadanie 2: Przeszukaj zawartość (15 minut)

Użyj Grep, aby znaleźć wszystkie miejsca, gdzie używasz konkretnej funkcji/zmiennej:

```
> Znajdź wszystkie użycia funkcji [nazwa-funkcji]
```

**Kroki:**
1. Najpierw użyj `output_mode: "count"` - zobacz skalę
2. Jeśli jest <10 plików, użyj `output_mode: "content"` na jednym z nich

**Dla biznesu:**
Przeszukaj notatki ze spotkań w poszukiwaniu wzmianek o kliencie:
```
> Znajdź wszystkie wzmianki o kliencie [nazwa] w notatkach
```

### Zadanie 3: Połącz Glob + Grep (20 minut)

**Scenariusz:** Znajdź wszystkie pliki testowe (`*.test.js` lub `*.spec.js`), które zawierają słowo "integration".

**Kroki:**
1. Użyj Glob: `Glob pattern: "**/*.{test,spec}.js"`
2. Użyj Grep: `Grep pattern: "integration" glob: "*.{test,spec}.js"`
3. Sprawdź wyniki z `output_mode: "files_with_matches"`
4. Wybierz jeden plik i zobacz szczegóły z `output_mode: "content"`

**Dla biznesu:**
Znajdź wszystkie oferty (pliki .docx lub .pdf), które zawierają słowo "rabat":
```
Krok 1: Glob - znajdź wszystkie .docx/.pdf
Krok 2: Grep lub Read - przeszukaj zawartość
```

---

## Linki do zasobów

### Dokumentacja Glob
- [Glob Patterns Explained](https://en.wikipedia.org/wiki/Glob_(programming)) - Podstawy pattern matching
- [Glob vs Regex](https://stackoverflow.com/questions/2823145/regex-vs-glob) - Kiedy użyć którego

### Dokumentacja Grep/Regex
- [RegexOne - Interactive Tutorial](https://regexone.com/) - Nauka regex od podstaw
- [Regex101](https://regex101.com/) - Tester regex online z wyjaśnieniami
- [Ripgrep User Guide](https://github.com/BurntSushi/ripgrep/blob/master/GUIDE.md) - Grep w Claude oparty o ripgrep

### Practical guides
- [Mastering File Search Patterns](https://www.digitalocean.com/community/tutorials/using-grep-regular-expressions-to-search-for-text-patterns-in-linux) - Grep patterns w praktyce
- [Glob Patterns Cheat Sheet](https://github.com/begin/globbing) - Szybkie odniesienie

---

**W następnej lekcji:** Poznasz narzędzia **WebFetch** i **WebSearch** - jak Claude potrafi wyszukiwać informacje w internecie, pobierać dokumentację i być zawsze na bieżąco, nawet z technologiami, które pojawiły się po jego treningu.

**Pytania?** Odpowiedz na tego maila - chętnie pomogę!

---

*Kurs Claude Code - Moduł 2: Wbudowane Narzędzia (Tools) | Lekcja 4*
