# Mail #02: Edit i NotebookEdit - Precyzyjna Modyfikacja

---

## Przypomnienie z poprzedniej lekcji

W pierwszym mailu modułu poznaliśmy narzędzia **Read** i **Write** - podstawowe narządzia do pracy z plikami. Dowiedzieliśmy się, że **Read** to oczy Claude'a - bez przeczytania pliku nie wie, co jest w środku. Z kolei **Write** służy do tworzenia nowych plików lub nadpisywania całych istniejących (ale wymaga wcześniejszego Read dla bezpieczeństwa).

Kluczowa zasada: **Write nadpisuje CAŁY plik**. To potężne narzędzie, ale czasem strzelanie z armaty do muchy. Jeśli chcesz zmienić tylko jedną linijkę w 1000-wierszowym pliku, marnujesz tokeny i ryzykujesz błędy.

Dlatego dzisiaj poznajemy **Edit** - narzędzie do precyzyjnych, chirurgicznych zmian w kodzie.

---

## Sprawdź się - 2 pytania z poprzedniej lekcji

1. **Dlaczego Claude musi użyć Read przed Write na istniejącym pliku?**
   - Podpowiedź: Pomyśl o bezpieczeństwie i ryzyku nadpisania ważnego kodu

2. **Kiedy NIE powinieneś używać Write, tylko innego narzędzia?**
   - Podpowiedź: Zastanów się, co się stanie, gdy chcesz zmienić tylko jedną linię w dużym pliku

*(Odpowiedzi na końcu maila)*

---

## TLDR

Dzisiaj poznasz **Edit** - narzędzie do precyzyjnej modyfikacji plików oraz **NotebookEdit** - specjalistyczne narzędzie do Jupyter Notebooks. Nauczysz się jak Claude zamienia dokładne ciągi znaków (exact string matching), jak działa parametr `replace_all` i dlaczego wcięcia są największym wrogiem edycji. Poznasz także najczęstsze błędy i jak ich unikać. Po tej lekcji będziesz rozumiał różnicę między "nadpisywaniem pliku" a "edytowaniem fragmentu" - i to robi całą różnicę w skuteczności pracy.

---

## Mem z Twittera

Zanim zaczniemy, coś dla rozluźnienia. O refaktoryzacji i edycji kodu:

**"Refaktoryzacja to tak jakby sprzątanie pokoju przez przeniesienie śmieci do innego pokoju. No ale przynajmniej tamten pokój wygląda teraz lepiej!"**

🔗 [Klasyczny programistyczny humor o refaktorze](https://x.com/iamdevloper/status/1060067235316809729)

I jeszcze jedno złoto o Jupyter Notebooks:

**"Jupyter Notebook to IDE dla ludzi, którzy nie lubią popełniać błędów więcej niż raz dziennie. Uruchom komórkę. Błąd. Popraw. Uruchom znowu. Błąd w innym miejscu. Repeat."**

Dokładnie dlatego NotebookEdit jest takim odkryciem! 😄

---

## Treść lekcji

### Edit - Chirurgiczna precyzja w modyfikacji kodu

Narzędzie **Edit** to najbardziej elegancki sposób na wprowadzanie zmian w plikach. Zamiast nadpisywać cały plik (jak robi Write), Edit wyszukuje konkretny fragment kodu i zamienia go na nowy.

#### Jak działa exact string matching?

Claude musi podać **dokładnie** ten sam ciąg znaków, który występuje w pliku. Nawet jeden dodatkowy lub brakujący znak sprawi, że edycja się nie uda.

**Przykład praktyczny - zmiana nazwy zmiennej:**

Masz w pliku:
```javascript
var x = 1;
console.log(x);
```

Claude używa Edit:
- `old_string: "var x = 1"`
- `new_string: "const userCount = 1"`

Wynik:
```javascript
const userCount = 1;
console.log(x);  // Uwaga! Ta linia się nie zmieni
```

**Dlaczego to działa?**
Edit znajduje dokładnie ciąg `"var x = 1"` i zamienia go na `"const userCount = 1"`. Ale UWAGA - druga linia `console.log(x)` pozostaje niezmieniona! Edit nie robi inteligentnej zamiany nazw w całym pliku - tylko zamienia dokładnie to, co podasz.

---

### Replace all - zmiana wszystkich wystąpień

Czasem potrzebujesz zmienić coś w wielu miejscach jednocześnie. Tu pojawia się parametr `replace_all: true`.

**Przykład praktyczny - zmiana importu:**

Masz plik z wieloma importami:
```javascript
import { oldLib } from 'old-library';
import { oldLib as OL } from 'old-library';
import { oldLib, helper } from 'old-library';
```

Chcesz zmienić nazwę biblioteki wszędzie:
- `old_string: "import { oldLib }"`
- `new_string: "import { newLib }"`
- `replace_all: true`

Ale UWAGA! To zadziała tylko dla pierwszej linii. Dlaczego? Bo pozostałe linie mają inne ciągi: `"import { oldLib as OL }"` i `"import { oldLib, helper }"`.

**Lepsze rozwiązanie:**
- `old_string: "old-library"`
- `new_string: "new-library"`
- `replace_all: true`

To zamieni nazwę we WSZYSTKICH miejscach, gdzie występuje ciąg `"old-library"`.

---

### Największy wróg Edit - wcięcia i formatowanie

To jest źródło 90% problemów z Edit. Ludzie zapominają o wcięciach!

**Przykład problemu:**

Plik ma kod z wcięciami:
```python
def calculate_total():
    subtotal = 100
    tax = 20
    return subtotal + tax
```

Próbujesz edytować:
- `old_string: "subtotal = 100"`  ❌ BŁĄD!

**Dlaczego nie działa?**
Bo w pliku faktyczny ciąg to: `"    subtotal = 100"` (4 spacje na początku).

**Prawidłowo:**
- `old_string: "    subtotal = 100"` ✅

---

### Pro-Tip: Co robić gdy Edit się nie udaje?

Jeśli Claude zgłasza błąd `"Search string not found"`, masz kilka opcji:

**Opcja 1: Poproś Claude o ponowne przeczytanie**
```
Read the file again and be careful with indentation
```

**Opcja 2: Sam skopiuj fragment**
Użyj Read, zobacz dokładnie jak wygląda fragment (z wcięciami!), skopiuj go i przekaż Claude:
```
Replace this exact string:
    subtotal = 100
    tax = 20
```

**Opcja 3: Użyj większego kontekstu**
Zamiast zmieniać jedną linię, podaj więcej kontekstu:
```
old_string:
def calculate_total():
    subtotal = 100
    tax = 20
```

Im więcej kontekstu, tym większa szansa, że ciąg będzie unikalny i Edit się uda.

---

### NotebookEdit - specjalista od Jupyter Notebooks

Pliki `.ipynb` to JSON-y opisujące notebooki Jupyter. Ręczna edycja jest koszmarem. NotebookEdit rozwiązuje ten problem.

#### Struktura notebooka

Notebook składa się z **komórek** (cells), gdzie każda komórka ma:
- **ID** - unikalny identyfikator
- **Typ** - `code` (kod) lub `markdown` (tekst)
- **Zawartość** - właściwy kod lub tekst

#### Przykład praktyczny - zamiana kodu w komórce

Masz komórkę z prostą statystyką:
```python
df.head()
```

Chcesz ją zmienić na bardziej szczegółowy opis:
```python
df.describe()
```

Claude używa NotebookEdit:
- `notebook_path: "/path/to/analysis.ipynb"`
- `cell_id: "cell_1"`
- `new_source: "df.describe()"`

I gotowe! Komórka została zaktualizowana.

---

#### Dodawanie nowych komórek

Pracujesz nad analizą danych i chcesz dodać wizualizację po komórce z ładowaniem danych.

**Krok 1:** Znajdujesz ID komórki, po której chcesz wstawić nową
```python
# Komórka "cell_load" ma:
df = pd.read_csv('data.csv')
```

**Krok 2:** Prosisz Claude o dodanie nowej komórki
```
Add a visualization cell after the data loading step
```

Claude używa:
- `notebook_path: "/path/to/analysis.ipynb"`
- `cell_id: "cell_load"` (po której wstawić)
- `edit_mode: "insert"`
- `cell_type: "code"`
- `new_source: "df.plot(kind='bar', x='category', y='value')"`

**Efekt:** Nowa komórka pojawia się zaraz po `cell_load`.

---

#### Zmiana typu komórki

Świetna praktyka w notebookach to dodawanie wyjaśnień jako komórki markdown.

**Przykład:** Masz komórkę z kodem:
```python
# Analiza korelacji między zmiennymi
correlation = df.corr()
```

Chcesz zamienić komentarz na czytelny opis w markdown:

Claude używa:
- `cell_id: "cell_analysis"`
- `cell_type: "markdown"` (zmiana z code na markdown!)
- `new_source: "## Analiza korelacji\n\nPoniższy kod oblicza macierz korelacji między wszystkimi zmiennymi numerycznymi w zbiorze danych."`

**Efekt:** Komórka staje się czytelnym nagłówkiem z opisem.

---

### Różnica między Edit a Write - kiedy którego użyć?

To najczęstsze pytanie. Oto prosta tabela decyzyjna:

| **Sytuacja** | **Narzędzie** | **Dlaczego?** |
|--------------|---------------|---------------|
| Tworzysz nowy plik | Write | Nie ma czego edytować |
| Zmieniasz 1-2 linie w dużym pliku | Edit | Oszczędność tokenów, mniejsze ryzyko |
| Przebudowujesz strukturę całego pliku | Write | Zmian jest za dużo dla Edit |
| Refaktoryzujesz nazwę funkcji/zmiennej | Edit z `replace_all` | Precyzyjne zmiany w wielu miejscach |
| Plik ma <50 linii i zmieniasz >30% | Write | Prościej nadpisać |
| Pracujesz z Jupyter Notebook | NotebookEdit | Specjalistyczne narzędzie |

**Zasada kciuka:** Jeśli zmieniasz mniej niż 20% pliku, użyj Edit. Jeśli więcej - Write.

---

### Przykłady biznesowe

**1. Edycja szablonów ofert**

Masz szablon oferty w pliku `offer-template.md`:
```markdown
## Oferta dla [NAZWA_KLIENTA]
Cena: [CENA] PLN
```

Chcesz zaktualizować tylko cenę dla konkretnego klienta:
```
Update the price in offer-template.md to 5000 PLN
```

Claude używa Edit zamiast przepisywać cały dokument.

**2. Aktualizacja danych w raportach**

Masz raport kwartalny z danymi Q3:
```markdown
Q3 2024: Przychód 250,000 PLN
```

Chcesz dodać Q4:
```
Add Q4 2024 data to the quarterly report: Revenue 280,000 PLN
```

Edit dodaje linię bez niszczenia reszty raportu.

**3. Praca z analizami danych w Jupyter**

Analityk danych prosi Claude:
```
In my notebook analysis.ipynb, change the visualization in cell 5 from bar chart to line chart and add a title "Sales Trend 2024"
```

NotebookEdit pozwala zmienić kod wizualizacji bez ręcznego edytowania JSON-a.

---

## Podsumowanie

Zapamiętaj te kluczowe punkty:

1. **Edit to precyzyjne narzędzie** - zamienia dokładne ciągi znaków (exact string matching), w przeciwieństwie do Write, który nadpisuje cały plik

2. **Wcięcia i formatowanie muszą się zgadzać** - to najczęstsza przyczyna błędów. Jeśli Edit się nie udaje, sprawdź spacje/tabulatory

3. **`replace_all: true` zmienia wszystkie wystąpienia** - świetne do refaktoryzacji nazw, ale pamiętaj że ciąg musi być identyczny

4. **NotebookEdit to specjalista od .ipynb** - pozwala edytować, dodawać i usuwać komórki bez ręcznej ingerencji w JSON

5. **Wybór narzędzia ma znaczenie** - Edit dla małych zmian (<20% pliku), Write dla dużych przebudów

---

## 3 pytania kontrolne

1. **Dlaczego Edit może zgłosić błąd "Search string not found" nawet gdy widzisz, że tekst jest w pliku?**
   - Odpowiedź: Najczęściej przez różnice we wcięciach (spacje/tabulatory). Edit wymaga DOKŁADNEGO dopasowania ciągu znaków, włącznie z białymi znakami.

2. **Kiedy użyjesz parametru `replace_all: true` zamiast domyślnej edycji?**
   - Odpowiedź: Gdy chcesz zamienić wszystkie wystąpienia danego ciągu w pliku, np. podczas refaktoryzacji nazwy funkcji lub zmiany importu biblioteki w wielu miejscach.

3. **Czym NotebookEdit różni się od zwykłego Edit dla plików .ipynb?**
   - Odpowiedź: NotebookEdit operuje na poziomie komórek (cells) i rozumie strukturę notebooka. Zwykły Edit musiałby edytować JSON, co jest niewygodne i podatne na błędy. NotebookEdit pozwala także zmieniać typy komórek i dodawać/usuwać je.

---

## 2-3 zadania praktyczne

### Zadanie 1: Precyzyjna edycja zmiennej ⭐

Stwórz plik `config.js`:
```javascript
const API_TIMEOUT = 3000;
const API_RETRIES = 3;
const API_ENDPOINT = "https://api.example.com";
```

Poproś Claude:
```
In config.js, change the API_TIMEOUT from 3000 to 5000
```

**Oczekiwany wynik:** Tylko wartość `API_TIMEOUT` się zmienia, reszta pliku pozostaje niezmieniona.

**Bonus:** Spróbuj teraz zmienić WSZYSTKIE wartości liczbowe jednocześnie.

---

### Zadanie 2: Refaktoryzacja z replace_all ⭐⭐

Stwórz plik `logger.js`:
```javascript
import { oldLogger } from 'old-logger';

function logError(msg) {
    oldLogger.error(msg);
}

function logInfo(msg) {
    oldLogger.info(msg);
}

export { logError, logInfo };
```

Poproś Claude:
```
Replace all occurrences of 'oldLogger' with 'newLogger' in logger.js
```

**Oczekiwany wynik:** Wszystkie wystąpienia `oldLogger` zmienione na `newLogger` (import i użycia).

---

### Zadanie 3: Jupyter Notebook workflow ⭐⭐⭐

Jeśli masz Jupyter zainstalowanego, stwórz prosty notebook `analysis.ipynb` z dwiema komórkami:

Komórka 1 (code):
```python
import pandas as pd
data = {'A': [1, 2, 3], 'B': [4, 5, 6]}
df = pd.DataFrame(data)
```

Komórka 2 (code):
```python
print(df)
```

Poproś Claude:
```
In analysis.ipynb, change cell 2 to show df.describe() instead of print(df), and add a new markdown cell before it explaining what describe() does
```

**Oczekiwany wynik:**
- Nowa komórka markdown z opisem
- Komórka 2 zmieniona na `df.describe()`

---

## Linki do zasobów

### Dokumentacja narzędzi:
1. **[Edit tool documentation](https://docs.anthropic.com/claude/docs/edit-tool)** - Oficjalna dokumentacja narzędzia Edit
2. **[NotebookEdit guide](https://docs.anthropic.com/claude/docs/notebook-edit)** - Przewodnik po edycji notebooków
3. **[String matching best practices](https://docs.anthropic.com/claude/docs/string-matching)** - Jak unikać błędów w dopasowywaniu

### Jupyter i data science:
4. **[Jupyter Notebook basics](https://jupyter-notebook.readthedocs.io/en/stable/)** - Podstawy pracy z notebookami
5. **[Pandas documentation](https://pandas.pydata.org/docs/)** - Jeśli pracujesz z analizą danych

### Community i dyskusje:
6. **[Claude Code subreddit - Edit tips](https://www.reddit.com/r/ClaudeAI/)** - Wskazówki społeczności
7. **[Stack Overflow: Claude Code Edit](https://stackoverflow.com/questions/tagged/claude-code)** - Rozwiązania problemów

---

## Odpowiedzi na pytania z początku

**Pytanie 1: Dlaczego Claude musi użyć Read przed Write na istniejącym pliku?**

**Odpowiedź:** To mechanizm bezpieczeństwa. Claude nie może nadpisać pliku, którego zawartości nie zna, aby przypadkowo nie usunąć ważnego kodu. Read pozwala mu "zobaczyć" co jest w pliku przed zmianą. To jak zasada "najpierw zrób backup" - Claude tworzy "mental backup" przez przeczytanie przed zapisem.

**Pytanie 2: Kiedy NIE powinieneś używać Write, tylko innego narzędzia?**

**Odpowiedź:** Gdy chcesz zmienić tylko mały fragment dużego pliku. Write nadpisuje CAŁY plik, co:
- Marnuje tokeny (musisz wysłać całą zawartość)
- Zwiększa ryzyko błędów (trudniej kontrolować dużą zmianę)
- Jest wolniejsze (więcej danych do przetworzenia)

W takich przypadkach użyj **Edit** - chirurgicznej precyzji zamiast armaty.

---

## Co dalej?

W następnym mailu (#03) poznasz **Bash** - narzędzie do wykonywania komend systemowych. Dowiesz się jak Claude uruchamia testy, instaluje paczki, zarządza Git-em i wykonuje setki innych operacji terminalowych. To będzie prawdziwa moc autonomicznego agenta!

**Ale najpierw - wykonaj zadania praktyczne z tego maila!** Różnica między teorią a praktyką jest ogromna.

---

**Do zobaczenia w kolejnej lekcji!**

Jeśli coś jest niejasne lub masz problemy z Edit - odpowiedz na tego maila. Razem rozwiążemy problem.

PS: Pamiętaj - wcięcia to przyjaciel precyzji, wróg automatyzacji. Zawsze sprawdzaj dokładnie!

---

*Mail wygenerowany w ramach kursu Claude Code - Moduł Wbudowane Narzędzia*
