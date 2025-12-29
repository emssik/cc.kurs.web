# Lekcja 5: Referencje do Plików (@-syntax) - Klucz do Efektywności

## Przypomnienie z poprzedniej lekcji

W poprzednim mailu poznaliśmy podstawy pracy w trybie interaktywnym Claude Code. Nauczyłeś się używać kluczowych skrótów klawiszowych - `Ctrl+L` do czyszczenia ekranu, `Ctrl+C` do przerywania generowania, `Ctrl+R` do wyszukiwania w historii komend, oraz `Ctrl+O` do przełączania trybu verbose. Poznałeś również skróty do przełączania między trybami uprawnień: `Shift+Tab` (lub `Alt+M` w niektórych konfiguracjach) do cyklicznego przechodzenia przez Normal Mode → Auto-Accept Mode → Plan Mode. Dzięki temu masz już solidne podstawy do efektywnej pracy z Claude Code.

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

**Zaleta:** Zero copy-paste, zero błędów przepisywania, zero zaśmiecania rozmowy ogromną ilością kodu.

### Zakresy linii (edytory VS Code/JetBrains)

W edytorach VS Code i JetBrains możesz używać skrótów klawiszowych do automatycznego wstawiania referencji z zakresami linii:
- **VS Code**: Zaznacz kod i naciśnij `Alt+K` - wstawi `@plik#L10-20`
- **JetBrains**: Użyj `Cmd+Option+K` (Mac) lub `Alt+Ctrl+K` (Windows/Linux)

**Przykład użycia w edytorze:**
1. Zaznacz fragment kodu w pliku (np. linie 45-89)
2. Naciśnij odpowiedni skrót klawiszowy
3. Referencja z zakresem linii zostaje automatycznie wstawiona do promptu

**Zaleta:** Precyzyjne wskazanie fragmentu kodu bez konieczności ręcznego przepisywania numerów linii.

**Uwaga:** Składnia `@plik#L10-20` działa głównie w integracji z edytorami. W czystym CLI lepiej opisać kontekst słownie lub skopiować konkretny fragment.

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
- `@src/api/routes/` - tylko routing API

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

**Uwaga:** Dokumentacja nie wymienia klawisza `Tab` jako standardowego sposobu autouzupełniania. Używaj strzałek i `Enter` do wyboru z listy sugestii.

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

Claude weźmie informacje z obu plików i przygotuje gotowy tekst.

### Przykład 3: Analiza danych

Masz arkusz z danymi sprzedażowymi (wyeksportowany do CSV):

```
> Przeanalizuj @dane/sprzedaz-2024.csv i powiedz który miesiąc był najlepszy
```

Claude odczyta dane i wskaże trendy.

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

---

## Zaawansowane sztuczki

### Pliki binarne - obrazy i PDF-y

Claude może odczytywać obrazy (PNG, JPG, JPEG) i pliki PDF:

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

**Metody dołączania plików:**
1. **Referencja przez @**: `@screenshot.png` lub `@dokument.pdf`
2. **Drag & drop**: Przeciągnij plik bezpośrednio do okna Claude Code
3. **Wklej ze schowka**: Skopiuj obraz i użyj `Ctrl+V` (macOS/Linux) lub `Alt+V` (Windows)
4. **Podaj ścieżkę**: "Przeanalizuj obraz: /path/to/image.png"

**Uwaga:** Claude czyta PDF-y jako całość (wszystkie strony). Dokumentacja nie potwierdza możliwości wskazywania konkretnych stron składnią typu `@manual.pdf strona 45`. Jeśli potrzebujesz konkretnej strony, poproś Claude o skupienie się na określonej treści w instrukcji.

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

### Analiza architektury

```
> Przeanalizuj @src/components/ i zaproponuj lepszą organizację
```

Claude przejrzy wszystkie komponenty i może zasugerować podział na podfoldery, wydzielenie wspólnych części, czy uspójnienie nazewnictwa.

---

## Typowe błędy i jak ich unikać

| Problem | Objaw | Rozwiązanie |
|---------|-------|-------------|
| **Plik nie znaleziony** | `Error: File not found @src/missing.js` | Sprawdź ścieżkę komendą `ls` lub użyj autocomplete |
| **Za duży kontekst** | `Warning: Context size exceeded` | W edytorach: zaznacz fragment i użyj `Alt+K` (VS Code) lub `Cmd+Option+K` (JetBrains) |
| **Brak autocomplete** | `@` nie pokazuje podpowiedzi | Sprawdź czy jesteś w katalogu projektu |
| **Zakres linii nie działa** | Składnia `#L10-50` nie rozpoznawana | Ta składnia działa głównie w edytorach (VS Code/JetBrains), nie w CLI |

---

## Optymalizacja zużycia tokenów

| Scenariusz | ❌ Złe (dużo tokenów) | ✅ Dobre (oszczędne) |
|------------|----------------------|----------------------|
| Duży plik | `@large-file.js` (10k linii) | W edytorze: zaznacz fragment i użyj `Alt+K` lub `Cmd+Option+K` |
| Cały katalog | `@src/` (100 plików) | `@src/auth/` lub lista: `@src/auth.ts @src/jwt.ts` |
| Cały projekt | `@.` (katastrofa!) | Użyj opisu architektury |

**Zasada:** Im precyzyjniej wskażesz czego potrzebujesz, tym lepsze i szybsze będą odpowiedzi Claude.

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
✅ > Zrefaktoruj tę funkcję (zaznacz w edytorze i użyj Alt+K/Cmd+Option+K)
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

Składnia `@` to jeden z najpotężniejszych mechanizmów w Claude Code. Pozwala:
- **Oszczędzać czas** - nie kopiujesz kodu ręcznie
- **Redukować błędy** - Claude czyta pliki bezpośrednio
- **Precyzyjnie kontrolować kontekst** - zakresy linii (w edytorach) i katalogi
- **Pracować z wieloma formatami** - kod, obrazy, PDF-y
- **Budować złożone analizy** - wielokrotne referencje

Kluczem jest **precyzja** - im dokładniej wskażesz czego potrzebujesz, tym lepsze wyniki otrzymasz.

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

### Zadanie 2: Zakresy linii (dla użytkowników edytorów)
Jeśli używasz VS Code lub JetBrains:
1. Otwórz plik w edytorze
2. Zaznacz fragment kodu (np. funkcję)
3. Użyj skrótu `Alt+K` (VS Code) lub `Cmd+Option+K`/`Alt+Ctrl+K` (JetBrains)
4. Skrót automatycznie wstawi referencję z zakresem linii do Claude Code

### Zadanie 3: Porównanie dwóch plików
Znajdź dwa podobne pliki (np. dwa raporty, dwie wersje tego samego dokumentu) i poproś Claude o porównanie:
```
> Porównaj @[plik1] z @[plik2] i wypisz różnice
```

**Bonus:** Jeśli masz PDF lub screenshot - spróbuj go przeanalizować!

---

## Dodatkowe zasoby

- [ProgrammerHumor - File Structure Memes](https://programmerhumor.io/memes/folder-structure) - Zabawne memy o organizacji plików
- [ProgrammerHumor - Directory Structure](https://programmerhumor.io/memes/directory-structure) - Więcej memów o strukturze katalogów
- [Best Programming Tweets](https://tweethunter.io/tweets/coding-programming-tweets) - Inspirujące tweety o programowaniu
- [Folder Management Memes](https://programmerhumor.io/memes/file-management) - Społeczność programistów o zarządzaniu plikami

---

**W kolejnej lekcji:** Pierwsze spotkanie z bezpieczeństwem - jak Claude dba o Twoje dane i dlaczego pyta o zgodę na każdą zmianę w systemie.

Do zobaczenia! 👋
