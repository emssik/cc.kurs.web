# Lekcja 5: Referencje do Plików (@-syntax) - Klucz do Efektywności

## Przypomnienie z poprzedniej lekcji

W poprzednim mailu poznaliśmy podstawy pracy w trybie interaktywnym Claude Code. Nauczyłeś się używać kluczowych skrótów klawiszowych - `Ctrl+L` do czyszczenia ekranu, `ESC` do przerywania generowania, `Ctrl+R` do wyszukiwania w historii komend, oraz `Ctrl+O` do przełączania trybu verbose. Poznałeś również skróty do przełączania między trybami uprawnień: `Shift+Tab` (lub `Alt+M` w niektórych konfiguracjach) do cyklicznego przechodzenia przez Normal Mode → Auto-Accept Mode → Plan Mode. Dzięki temu masz już solidne podstawy do efektywnej pracy z Claude Code.

## Sprawdź swoją wiedzę

1. Jaki skrót klawiszowy przełącza między trybami uprawnień?
2. Jak wyszukać poprzednie komendy w historii?

## TLDR

Składnia `@` to najszybszy sposób na dołączanie plików do rozmowy z Claude. Zamiast kopiować kod, piszesz `@nazwa-pliku` i Claude automatycznie wszystko odczyta. Możesz wskazywać konkretne linie (np. `@plik.js#L10-20` w edytorze VS Code/JetBrains), całe katalogi (`@src/`), a nawet obrazy i PDF-y. To fundament efektywnej pracy - oszczędzasz czas, redukujesz błędy i dajesz Claude dokładnie tyle kontekstu, ile potrzeba.

## Mem dnia

Znalazłem dla Ciebie mem, który świetnie oddaje realia pracy z kodem:

"Twój idealnie zorganizowany projekt z perfekcyjną strukturą folderów vs. katalog TEMP na Twoim dysku"

[Zobacz mem tutaj](https://programmerhumor.io/memes/folder-structure)

To idealnie pokazuje, dlaczego składnia `@` jest taka wartościowa - nie musisz pamiętać, gdzie co leży, Claude sam odnajdzie potrzebne pliki!

---

## Referencje do plików - Twoja supermoc w Claude Code

### Podstawowa składnia: @nazwa-pliku

Najprostsza forma to po prostu `@` i nazwa pliku. Claude automatycznie odczyta jego zawartość i doda do kontekstu rozmowy.

**Przykład:**
```
> Wyjaśnij co robi @src/auth.js
```

Claude otworzy plik `auth.js`, przeanalizuje kod i w prosty sposób wyjaśni, co tam się dzieje. Nie musisz kopiować kodu, otwierać pliku w edytorze, ani nawet pamiętać dokładnie co tam jest - Claude zrobi to za Ciebie.

**Z mojego doświadczenia:** To podstawa mojego workflow. Zamiast tracić czas na copy-paste i ryzykować błędy przepisywania, po prostu wskazuję plik. Claude dostaje dokładnie to, czego potrzebuje, a ja oszczędzam czas.

### Automatyczny kontekst w edytorach - magia dzieje się sama

Jeśli pracujesz w **[VS Code Extension](https://code.claude.com/docs/en/vs-code)** lub **[JetBrains](https://plugins.jetbrains.com/plugin/27310-claude-code-beta-)**, przygotuj się na funkcję, która **definitywnie zmieni Twój sposób pracy** z Claude.

**W skrócie:** Claude **automatycznie** otrzymuje kontekst tego, co robisz w edytorze:
- Masz otwarty plik? Claude widzi cały plik
- Zaznaczyłeś fragment kodu? Claude widzi tylko ten fragment z numerami linii

Żadnych skrótów, żadnego kopiowania, żadnego ręcznego wklejania. Po prostu zaznaczasz kod i pytasz Claude - reszta dzieje się automatycznie.

**Z mojego doświadczenia:**
To jest absolutny game changer. Przykładowo: przeglądasz kod, znajdujesz dziwną funkcję (linie 127-156), **po prostu ją zaznaczasz** i w panelu Claude piszesz: "co tu się dzieje?". Claude automatycznie dostaje tę funkcję wraz z informacją, że to linie 127-156 w pliku `auth.js`. Zero akcji z Twojej strony - to działa jak magia.

![CC_Automatyczna_Referencja_Do_Zaznaczenia](https://images.danielroziecki.com//.netlify/images?url=/cc.img.001.png)

**Kiedy to jest szczególnie przydatne:**
- Gdy debugging - zaznaczasz linię z błędem i pytasz Claude
- Gdy refactoring - wskazujesz fragment do przepisania
- Gdy code review - zaznaczasz podejrzany kod
- Gdy analizujesz długi dokument - wskazujesz konkretny paragraf
- Gdy po prostu pracujesz z tekstem tak jak ja z tymi lekcjami

**Dla użytkowników JetBrains:**
W JetBrains IDE jest dodatkowy skrót klawiszowy `Cmd+Option+K` (Mac) lub `Alt+Ctrl+K` (Windows/Linux), który pozwala **ręcznie wstawić** referencję do zaznaczonego fragmentu kodu do promptu. To przydatne, gdy chcesz zbudować bardziej złożone zapytanie z wieloma referencjami.

**Dla użytkowników CLI:**
Jeśli używasz Claude Code z terminala (a nie extensionu), możesz opisać kontekst słownie (np. "funkcja calculateTotal w auth.js") lub użyć składni `@plik` do ręcznego wskazania pliku.

**Szczegóły techniczne** znajdziesz w [dokumentacji VS Code](https://code.claude.com/docs/en/vs-code) i [dokumentacji JetBrains](https://code.claude.com/docs/en/jetbrains).

### Referencje do katalogów: @katalog/

Czasami potrzebujesz załadować cały folder - np. gdy analizujesz strukturę projektu.

**Przykład:**
```
> Przeanalizuj strukturę @src/components/
```

Claude pobierze listę plików z katalogu i może zaproponować lepszą organizację.

**⚠️ Ostrzeżenie:** Katalogi z dużą liczbą plików mogą szybko zużyć limit tokenów. Używaj rozważnie!

**Strategia:** Zamiast `@src/` (cały projekt), użyj bardziej precyzyjnych ścieżek:
- `@src/components/` - tylko komponenty
- `@src/utils/` - tylko narzędzia pomocnicze
- `@src/api/routes/` - tylko routing

### Wielokrotne referencje

Możesz łączyć wiele plików i katalogów w jednym zapytaniu.

**Przykład:**
```
> Porównaj @src/auth.ts z @src/middleware/jwt.ts i zaproponuj ujednolicenie
```

Claude zobaczy oba pliki i może wskazać różnice, duplikacje czy niezgodności.

**Przykład zaawansowany:**
```
> Zrefaktoruj @src/api/ używając wzorców z @docs/architecture.md
```

To pokazuje prawdziwą moc - Claude czyta dokumentację architektury i stosuje te zasady do refaktoryzacji całego API.

### Autocomplete - Twój turbo przyspieszacz

Gdy wpiszesz `@`, Claude Code automatycznie uruchamia autocomplete i podpowiada dostępne pliki oraz katalogi. Możesz używać strzałek (`↑`/`↓`) do nawigacji po podpowiedziach.

**Jak to działa:**
```
@sr              # Autocomplete podpowiada: @src/
@src/co          # Autocomplete podpowiada: @src/components/
```

**Z mojego doświadczenia:** Autocomplete to życiowa oszczędność. Nie musisz pamiętać dokładnej ścieżki ani nazwy pliku - zacznij pisać, wybierz z listy, gotowe. Szczególnie przydatne w projektach z wieloma zagnieżdżonymi folderami. Choć nie zawsze to działa poprawnie. Dopiero niedawno wprowadzone, że @ działa w treści zapytania a nie tylko na jego początku. Niestety czasami to nie działa dobrze. Osobiście najczęściej, jeśli pracuję w VSC, po prostu przy pomocy myszki przeciagam plik do okna. Albo używam opcji Copy Path / Copy Relative Path i wklejam te informacje do prompta. Używam tego co w danym momencie jest dla mnie wygodniejsze.

![Kopiowanie ścieżek](https://images.danielroziecki.com//.netlify/images?url=/cc.relative.png)

---

## Praktyczne przykłady dla różnych scenariuszy

### Przykład 1: Analiza dokumentu biznesowego

Pracujesz w małej firmie i dostałeś raport w PDF. Chcesz wyciągnąć kluczowe wnioski:

```
> Przeczytaj @raporty/sprzedaz-q4.pdf i wypisz 5 najważniejszych wniosków
```

Claude przeanalizuje PDF i da Ci zwięzłe podsumowanie.

### Przykład 2: Przygotowanie materiałów marketingowych

Masz kilka plików z opisami produktów i chcesz stworzyć spójny newsletter:

```
> Na podstawie @opisy/produkt-a.md i @opisy/produkt-b.md napisz newsletter w stylu casual 
```

Tego akurat nie polecam 🤣 Ale można. Claude weźmie informacje z obu plików i przygotuje gotowy tekst.

### Przykład 3: Analiza danych

Masz arkusz z danymi sprzedażowymi (wyeksportowany do CSV):

```
> Przeanalizuj @dane/sprzedaz-2024.csv i powiedz który miesiąc był najlepszy
```

Claude odczyta dane i wskaże trendy. Jeśli uzna, że tak będzie lepiej, napisze skrypt który przeanalizuje plik.

### Przykład 4: Code review

Sprawdzasz bezpieczeństwo swojego API:

```
> Sprawdź @api/users.ts pod kątem bezpieczeństwa
```

Claude przeskanuje kod i wskaże potencjalne luki.

### Przykład 5: Debugging

Jeden z testów pada i nie wiesz dlaczego:

```
> Dlaczego @tests/auth.test.js failuje? Napraw błędy
```

Claude przeanalizuje test, znajdzie problem i zaproponuje poprawkę.

### Przykład 6: Migracja wzorca

Chcesz przenieść sprawdzone rozwiązanie do nowego modułu:

```
> Stwórz @src/api/products.ts bazując na wzorcu z @src/api/users.ts
```

Claude użyje istniejącego pliku jako szablonu i wygeneruje nowy kod.

### Przykład 7: Planowanie projektu (dla Project Managera)

Zarządzasz projektem i masz notatki ze spotkań z różnymi działami:

```
> Przeanalizuj @notatki/spotkanie-frontend.md, @notatki/spotkanie-backend.md i @notatki/spotkanie-design.md i wypisz czy są konflikty w harmonogramie lub niezgodne założenia
```

Claude przejrzy wszystkie notatki i wskaże potencjalne problemy przed rozpoczęciem sprintu.

### Przykład 8: Spójność treści (dla Content Writera)

Piszesz serię artykułów i chcesz zachować spójny styl:

```
> Porównaj ton i styl pisania w @blog/artykul-01.md i @blog/artykul-02.md - czy są spójne? Jeśli nie, co powinienem zmienić?
```

Claude przeanalizuje oba teksty pod kątem tonu, zwrotów, długości zdań i wskaże różnice.

### Przykład 9: Screening kandydatów (dla HR/Rekrutera)

Masz folder z CV i szukasz konkretnych umiejętności:

```
> Przeszukaj @cv/ i wypisz kandydatów z doświadczeniem w zarządzaniu zespołem minimum 3 lata i znajomością Agile
```

Claude przeskanuje wszystkie CV i stworzy short-listę z uzasadnieniem.

### Przykład 10: Przygotowanie materiałów dydaktycznych (dla Nauczyciela)

Masz materiały źródłowe i chcesz przygotować plan lekcji:

```
> Na podstawie @materialy/dzieje-polski-xix-wiek.md stwórz plan 45-minutowej lekcji dla klasy 3 liceum
```

Claude przygotuje strukturę lekcji z podziałem na etapy, przykłady i pytania kontrolne.

### Przykład 11: Oferta dla klienta (dla Freelancera)

Masz szablon oferty i brief od klienta:

```
> Użyj @templates/oferta-standard.md i stwórz spersonalizowaną ofertę na podstawie @briefs/klient-abc.txt
```

Claude dopasuje szablon do potrzeb klienta i wygeneruje gotową ofertę.

---

## Zaawansowane sztuczki

### Pliki binarne - obrazy i PDF-y

Claude może odczytywać obrazy (PNG, JPG, JPEG) i pliki PDF - to otwiera zupełnie nowe możliwości pracy!

**Obrazy:**
```
> @screenshot.png - zaimplementuj ten design
> @error-console.png - co oznacza ten błąd?
> Przeanalizuj @diagram.jpg i opisz architekturę systemu
```

**PDF-y:**
```
> Przeczytaj @manual.pdf i wyciągnij kluczowe wnioski
> Na podstawie @raport.pdf stwórz podsumowanie w punktach
```

**Z mojego doświadczenia:** Analiza screenshotów to killer feature. Zamiast opisywać błąd słowami, robię screenshot i pytam Claude "co tu się dzieje?". Oszczędza to mnóstwo czasu i eliminuje nieporozumienia. Można też dodać na obrazku własne uwagi. Co często lepiej działa niż tekstowy opis tego co ma zrobić.

![CC_Automatyczna_Referencja_Do_Zaznaczenia](https://images.danielroziecki.com//.netlify/images?url=/cc.tatoo.png)

**Metody dołączania plików:**
1. **Referencja przez @**: `@screenshot.png` lub `@dokument.pdf`
2. **Drag & drop**: Przeciągnij plik bezpośrednio do okna Claude Code
3. **Wklej ze schowka**: Skopiuj obraz i użyj `Ctrl+V` (macOS/Linux) lub `Alt+V` (Windows)
4. **Podaj ścieżkę**: "Przeanalizuj obraz: /path/to/image.png"

**Szczegóły** znajdziesz w [dokumentacji trybu interaktywnego](https://code.claude.com/docs/en/interactive-mode).

**Uwaga:** Claude czyta PDF-y jako całość (wszystkie strony). Jeśli potrzebujesz konkretnej strony, poproś Claude o skupienie się na określonej treści w instrukcji.

### Kombinacje i łańcuchy referencji

Możesz budować kontekst krok po kroku:

```
> Co robi @src/config.js?
# Claude wyjaśnia

> Ok, teraz użyj tej konfiguracji w @src/app.js
# Claude wie już o config.js z poprzedniej odpowiedzi

> Przetestuj to w @tests/app.test.js
```

Każda odpowiedź buduje na wcześniejszym kontekście.

Tylko pamiętaj o przestrodze z wcześniejszych lekcji. Dbaj o kontekst, nie przepełniaj go. Jeśli masz już tylko 50% wolnego, to znak, że warto zacząc nowe polecenie.

### Analiza architektury

```
> Przeanalizuj @src/components/ i zaproponuj lepszą organizację
```

Claude przejrzy wszystkie komponenty i może zasugerować podział na podfoldery, wydzielenie wspólnych części, czy uspójnienie nazewnictwa.

---

## Workflow patterns - jak to robią profesjonaliści

### Pattern 1: Budowanie kontekstu przyrostowo

Zamiast wrzucać wszystko na raz:

```
❌ > Przeanalizuj @src/ i zrefaktoruj wszystko
```

Rob to krok po kroku:

```
✅ > Przeanalizuj strukturę @src/ (tylko lista plików)
✅ > Ok, teraz szczegółowo @src/auth.ts
✅ > Zrefaktoruj tę funkcję (zaznacz ją w edytorze, Claude automatycznie ją zobaczy)
✅ > Teraz zastosuj ten wzorzec w @src/api.ts
```

### Pattern 2: Scaffolding z przykładów

Używaj istniejącego kodu jako szablonu:

```
> Stwórz @src/api/products.ts bazując na wzorcu z @src/api/users.ts
> Dodaj testy @tests/api/products.test.ts podobne do @tests/api/users.test.ts
```

To zapewnia spójność w całym projekcie.

---

## Podsumowanie

ten mły znczek `@` to bardzo potężny i przydatny w codziennej pracy mechanizm w Claude Code. Pozwala:

- **Oszczędzać czas** - nie kopiujesz kodu ręcznie
- **Redukować błędy** - Claude czyta pliki bezpośrednio
- **Precyzyjnie kontrolować kontekst** - zakresy linii (w edytorach) i katalogi
- **Pracować z wieloma formatami** - kod, obrazy, PDF-y
- **Budować złożone analizy** - wielokrotne referencje

Kluczem jest **precyzja** - im dokładniej wskażesz czego potrzebujesz, tym lepsze wyniki otrzymasz.

---

## Na miłe zakończenie :)
## 005

![Komiks](https://images.danielroziecki.com//.netlify/images?url=/005.vsc.extension.jpg)

## Słowniczek

**Token**
Jednostka tekstu używana przez Claude do przetwarzania Twoich zapytań i odpowiedzi. Można to porównać do "słów", które Claude czyta i pisze. Masz ograniczoną liczbę tokenów w każdej rozmowie, więc warto nie wysyłać zbyt dużych plików na raz.

**Autocomplete (autouzupełnianie)**
Funkcja, która automatycznie podpowiada Ci dostępne opcje podczas wpisywania. Gdy napiszesz `@`, Claude Code pokaże listę plików i katalogów, które możesz wybrać.

**Drag & drop (przeciągnij i upuść)**
Sposób dodawania plików przez "złapanie" pliku myszką i przeciągnięcie go do okna programu. Zamiast klikać "Otwórz plik", po prostu przeciągasz plik z folderu do Claude Code.

**CSV (Comma-Separated Values)**
Format pliku, w którym dane są zapisane w postaci tabeli, gdzie każda kolumna jest oddzielona przecinkiem. Często eksportowany z Excela lub Google Sheets. Wygląda tak:
```
Imię,Nazwisko,Wiek
Jan,Kowalski,30
Anna,Nowak,25
```

**PDF (Portable Document Format)**
Popularny format plików dokumentów, który zachowuje formatowanie niezależnie od urządzenia. Claude Code potrafi czytać PDF-y i wyciągać z nich tekst.

**API (Application Programming Interface)**
Sposób, w jaki różne programy rozmawiają ze sobą. W kontekście tej lekcji - część kodu, która obsługuje komunikację z innymi systemami (np. logowanie, wysyłanie danych).

**CLI (Command Line Interface)**
Interfejs tekstowy, w którym piszesz komendy zamiast klikać w przyciski. Claude Code działa w CLI - wpisujesz tekstowe polecenia w terminalu.

**Diff**
Porównanie dwóch wersji pliku pokazujące, co się zmieniło. Zazwyczaj pokazuje zielonym to, co zostało dodane, a czerwonym to, co zostało usunięte.

**Routing**
W kontekście programowania - mechanizm kierowania zapytań do odpowiednich funkcji. Jak router WiFi kieruje pakiety danych, routing w aplikacji kieruje zapytania użytkownika do właściwych części kodu.

**Middleware**
Kod, który działa "pomiędzy" otrzymaniem zapytania a wysłaniem odpowiedzi. Często używany do sprawdzania uprawnień, logowania, czy walidacji danych.

---

## Pytania kontrolne

1. Jakie skróty klawiszowe pozwalają automatycznie wstawić referencję do pliku z zakresem linii w edytorach VS Code i JetBrains?
2. Dlaczego nie powinno się używać `@src/` dla całego projektu?
3. Jakie typy plików oprócz kodu może odczytywać Claude? Wymień przynajmniej 3 formaty.

---

## Zadania praktyczne

### Zadanie 1: Analiza pojedynczego pliku
Wybierz dowolny plik z Twojego projektu (może być też dokument tekstowy, raport, notatka) i poproś Claude o:
```
> Wyjaśnij co robi @[ścieżka-do-pliku]
```

### Zadanie 2: Automatyczny kontekst w edytorze (dla użytkowników VS Code/JetBrains Extension)
Jeśli używasz VS Code Extension lub JetBrains z pluginem Claude Code:
1. Otwórz dowolny plik w edytorze
2. Zaznacz fragment kodu (np. funkcję, 10-20 linii)
3. Przejdź do panelu Claude Code i zadaj pytanie o zaznaczony fragment
4. Zauważ, że Claude automatycznie otrzymał informację o zaznaczonym fragmencie wraz z numerami linii

### Zadanie 3: Porównanie dwóch plików
Znajdź dwa podobne pliki (np. dwa raporty, dwie wersje tego samego dokumentu) i poproś Claude o porównanie:
```
> Porównaj @[plik1] z @[plik2] i wypisz różnice
```

**Bonus:** Jeśli masz PDF lub screenshot - spróbuj go przeanalizować!

---

## Dodatkowe zasoby

- [Dokumentacja Claude Code - Tryb interaktywny](https://code.claude.com/docs/en/interactive-mode)
- [Dokumentacja Claude Code - Integracja VS Code](https://code.claude.com/docs/en/vs-code)
- [Dokumentacja Claude Code - Integracja JetBrains](https://code.claude.com/docs/en/jetbrains)
- [ProgrammerHumor - File Structure Memes](https://programmerhumor.io/memes/folder-structure) - Zabawne memy o organizacji plików

---

**W kolejnej lekcji:** Pierwsze spotkanie z bezpieczeństwem - jak Claude dba o Twoje dane i dlaczego pyta o zgodę na każdą zmianę w systemie.

Do zobaczenia! 👋
