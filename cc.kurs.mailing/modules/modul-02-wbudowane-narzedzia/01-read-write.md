# Mail #01: Read i Write - Podstawy Operacji na Plikach

---

## Przypomnienie z poprzedniej lekcji

Cześć!

W pierwszym module poznałeś fundamenty pracy z Claude Code. Nauczyłeś się, że to nie jest zwykły chatbot, ale **autonomiczny agent terminalowy** - coś jak bardzo sprytny praktykant, który sam wykonuje polecenia. Zamiast kopiować kod z okna czatu, nauczyłeś się **delegować zadania** i myśleć celami, nie krokami.

Pamiętasz najważniejsze wnioski?
- Claude Code działa bezpośrednio w terminalu i sam modyfikuje pliki
- Myślisz "co chcę osiągnąć?", nie "jak to zrobić krok po kroku?"
- Plik CLAUDE.md to instrukcja obsługi Twojego projektu dla agenta
- Tryby /ask, /code, /architect pomagają dostosować styl pracy

Teraz czas zagłębić się w to, **jak dokładnie Claude manipuluje plikami**. Poznasz dwa podstawowe narzędzia: **Read** i **Write**.

---

## 2 pytania do poprzedniej lekcji

Zanim ruszymy dalej, sprawdź swoją wiedzę:

1. **Jaka jest różnica między Claude Code a tradycyjnymi narzędziami AI jak ChatGPT czy Copilot?**
   - Odpowiedź: Claude Code to autonomiczny agent, który sam wykonuje komendy, edytuje pliki i zarządza projektem. ChatGPT/Copilot tylko podpowiadają kod, który musisz ręcznie skopiować.

2. **Dlaczego plik CLAUDE.md jest kluczowy dla efektywnej pracy?**
   - Odpowiedź: To instrukcja obsługi projektu - Claude czyta go na początku, aby zrozumieć strukturę, konwencje, reguły i preferencje. Bez tego musiałbyś tłumaczyć to samo przy każdej sesji.

---

## TLDR

W tym mailu dowiesz się:
- Jak działa narzędzie **Read** - czytanie plików, obrazów i PDFów
- Czym jest **Write** i kiedy go używać (a kiedy nie!)
- Jak efektywnie pracować z dużymi plikami za pomocą offset i limit
- Praktyczne przykłady nie tylko z kodu, ale też analizy faktur czy zrzutów ekranu UI

---

## Mem z Twittera

Zanim zaczniemy - klasyk programistycznych memów:

**["6 hours of debugging can save you 5 minutes of reading"](https://x.com/jcsrb/status/1392459191353286656)**

Idealnie podsumowuje absurd sytuacji, kiedy spędzamy pół dnia na debugowaniu, zamiast poświęcić 5 minut na przeczytanie dokumentacji. Na szczęście Claude Code świetnie czyta pliki za nas! 😄

---

## Treść lekcji

### Read - Jak Claude "widzi" Twoje pliki

Claude Code bez narzędzia **Read** jest jak osoba z zawiązanymi oczami - może gadać o kodzie w teorii, ale nie wie, co dzieje się w **Twoim** projekcie. Narzędzie Read to jego wzrok.

#### Podstawy: Symbol @ to skrót do Read

Najłatwiejszy sposób na powiedzenie Claude'owi "przeczytaj ten plik" to użycie symbolu `@`:

```
> podsumuj logikę walidacji w @src/utils/validation.ts
```

To krótka wersja komendy "użyj narzędzia Read na pliku src/utils/validation.ts, przeczytaj jego zawartość i podsumuj logikę".

**Co się dzieje w tle?**
1. Claude uruchamia narzędzie Read z parametrem `file_path: "src/utils/validation.ts"`
2. Otrzymuje całą zawartość pliku (z numerami linii!)
3. Analizuje kod i przygotowuje odpowiedź

**Praktyczny przykład dla małej firmy:**
Wyobraź sobie, że prowadzisz jednoosobową działalność i masz faktury w PDF. Zamiast otwierać każdą ręcznie:

```
> przeczytaj @faktury/2024-01-*.pdf i wyciągnij daty wystawienia oraz kwoty
```

Claude przeczyta wszystkie faktury ze stycznia i wyciągnie dla Ciebie kluczowe informacje.

---

#### Offset i Limit - Praca z gigantycznymi plikami

Masz plik logów serwera o rozmiarze 50MB? Jeśli Claude spróbuje przeczytać go w całości, "zapcha" kontekst i zmarnuje tokeny (które kosztują!).

**Rozwiązanie: Parametry offset i limit**

```
> przeczytaj plik server.log, ale tylko linie od 5000 do 5100, gdzie wystąpił błąd
```

Claude użyje:
- `offset: 5000` - zacznij od linii 5000
- `limit: 100` - przeczytaj tylko 100 linii

**Pro-Tip:** Jeśli pracujesz z naprawdę gigantycznym plikiem JSON (np. dane z API o rozmiarze 200MB), nie każ Claude'owi czytać go narzędziem Read. Zamiast tego:

```
> napisz skrypt w Pythonie, który przeanalizuje plik products.json i wyciągnie tylko produkty z kategorii "elektronika"
```

Skrypt wykona się lokalnie i przetworzy dane znacznie wydajniej.

---

#### Czytanie obrazów i PDFów - Multimodalna moc

Claude to model multimodalny - oznacza to, że **widzi obrazy** i **czyta dokumenty PDF**. To otwiera masę możliwości:

**1. Analiza zrzutów ekranu UI:**

Wyobraź sobie, że designer wysłał Ci makietę nowego komponentu (screenshot.png). Zamiast ręcznie kodować:

```
> użyj @screenshot.png jako wzoru i wygeneruj komponent React z Tailwind CSS, który wygląda identycznie
```

Claude:
1. Przeczyta (zobaczy) zrzut ekranu
2. Zidentyfikuje układ, kolory, odstępy, czcionki
3. Wygeneruje kod komponentu React
4. Zapisze go w odpowiednim pliku

**2. Analiza faktur PDF:**

Masz stos faktur w PDF i chcesz wyciągnąć dane do arkusza kalkulacyjnego?

```
> przeczytaj wszystkie pliki w @faktury/*.pdf i stwórz plik CSV z kolumnami: data, kontrahent, kwota netto, VAT, kwota brutto
```

**3. Dokumentacja techniczna:**

Klient wysłał Ci specyfikację w PDF, a Ty potrzebujesz szybko znaleźć informacje o konkretnym API:

```
> przeczytaj @dokumentacja-api.pdf i wyjaśnij jak działa endpoint /users/authenticate
```

**Ciekawy pomysł:**
Możesz nawet analizować diagramy architektoniczne! Wklej diagram UML jako obraz i napisz:

```
> na podstawie @diagram-architektury.png wygeneruj strukturę folderów projektu i pliki podstawowe
```

---

### Write - Tworzenie i nadpisywanie plików

Narzędzie **Write** to odpowiednik "Zapisz jako" w edytorze tekstu, ale z jedną kluczową różnicą: **nadpisuje cały plik**.

#### Tworzenie nowych plików

Najczęstsze zastosowanie Write to generowanie boilerplate'u, plików konfiguracyjnych, nowych komponentów:

**Przykład 1 - Dockerfile:**
```
> Stwórz nowy Dockerfile zoptymalizowany pod Node.js 18 z obrazem alpine
```

Claude:
1. Użyje narzędzia Write
2. Stworzy plik `Dockerfile`
3. Wypełni go odpowiednią konfiguracją

**Przykład 2 - Szablony dokumentów dla małej firmy:**
```
> Wygeneruj szablon faktury VAT w formacie Markdown z polami do wypełnienia
```

**Przykład 3 - Komponenty React:**
```
> Stwórz nowy komponent Button w src/components/Button.tsx z podstawowymi variantami (primary, secondary, danger)
```

---

#### Nadpisywanie istniejących plików (wymaga wcześniejszego Read!)

**Zasada bezpieczeństwa:** Claude nie może nadpisać pliku, którego treści nie zna. To zabezpieczenie przed przypadkowym usunięciem ważnych danych.

**Błędny scenariusz:**
```
> nadpisz plik config.json nową konfiguracją
```
❌ Claude odrzuci to, jeśli wcześniej nie przeczytał pliku.

**Prawidłowy scenariusz:**
```
> przeczytaj @config.json, zmień wartość timeout na 5000 i zapisz
```
✅ Claude:
1. Przeczyta plik (Read)
2. Zmodyfikuje treść w pamięci
3. Nadpisze plik (Write)

---

#### Kiedy NIE używać Write - Złota zasada

⚠️ **Narzędzie Write nadpisuje CAŁY plik.**

Jeśli masz plik o 1000 liniach i chcesz zmienić jedną linijkę, użycie Write to:
- **Marnowanie tokenów** - Claude musi odtworzyć całą zawartość
- **Ryzyko błędów** - może coś pominąć lub źle sformatować
- **Powolne** - nadpisywanie dużego pliku trwa

**Zamiast Write użyj Edit** (o którym dowiesz się w następnej lekcji):

❌ **Źle (Write):**
```
> zmień w pliku app.js wartość PORT z 3000 na 8080
```
Claude nadpisze cały plik, żeby zmienić jedną liczbę.

✅ **Dobrze (Edit):**
```
> w pliku app.js zamień "const PORT = 3000" na "const PORT = 8080"
```
Claude użyje narzędzia Edit do precyzyjnej zamiany.

---

#### Różnica między Read a Write - Tabela dla jasności

| Cecha | Read | Write |
|-------|------|-------|
| **Co robi?** | Czyta zawartość pliku | Tworzy lub nadpisuje plik |
| **Czy modyfikuje?** | Nie, tylko odczyt | Tak, zmienia zawartość |
| **Duże pliki** | Może użyć offset/limit | Nadpisuje cały plik |
| **Bezpieczeństwo** | Bezpieczne, nie zmienia nic | Wymaga Read przed nadpisaniem |
| **Obrazy/PDF** | Tak, może czytać | Nie, tylko pliki tekstowe |
| **Kiedy używać?** | Zawsze na początku analizy | Tworzenie nowych plików lub całkowita zamiana |

---

### Przykłady praktyczne poza programowaniem

#### 1. Analiza danych sprzedażowych (mała firma)

```
> przeczytaj @sprzedaz-2024.csv i wygeneruj raport miesięczny w @raport-styczen.md z podsumowaniem: przychody, top 5 produktów, średnia wartość zamówienia
```

Claude:
1. Przeczyta plik CSV (Read)
2. Przeanalizuje dane
3. Utworzy nowy plik Markdown z raportem (Write)

#### 2. Porządkowanie dokumentów

```
> przeczytaj wszystkie pliki PDF w @pobrane/, rozpoznaj czy to faktury, umowy czy inne dokumenty i przenieś je do odpowiednich folderów
```

#### 3. Generowanie szablonów e-maili

```
> stwórz szablon e-maila powitalnego dla nowych klientów w @szablony/email-powitalny.md z polami [IMIĘ], [DATA_REJESTRACJI], [KOD_RABATOWY]
```

#### 4. Przetwarzanie zrzutów ekranu

```
> przeczytaj @screenshots/*.png i dla każdego zrzutu wygeneruj krótki opis (1-2 zdania) w pliku README.md
```

---

## Podsumowanie

Kluczowe wnioski z lekcji:

1. **Read to "oczy" Claude Code** - bez przeczytania pliku, agent pracuje w ciemno. Symbol `@` to wygodny skrót do Read.

2. **Offset i limit oszczędzają tokeny** - dla dużych plików czytaj tylko potrzebne fragmenty, a gigantyczne pliki przetwarzaj skryptami.

3. **Claude widzi obrazy i czyta PDFy** - możesz analizować zrzuty ekranu UI, faktury, dokumentację techniczną i diagramy.

4. **Write tworzy lub nadpisuje CAŁY plik** - świetne do boilerplate'u i nowych plików, ale ryzykowne dla małych zmian w dużych plikach.

5. **Bezpieczeństwo przede wszystkim** - Claude musi przeczytać plik (Read) przed jego nadpisaniem (Write), aby nie usunąć ważnych danych.

---

## 3 pytania kontrolne

1. **Po co używać parametrów offset i limit w narzędziu Read?**
   - Odpowiedź: Aby czytać tylko fragmenty bardzo dużych plików (np. logów o rozmiarze 50MB), zamiast wczytywać całość i marnować tokeny oraz kontekst.

2. **Dlaczego Claude nie może nadpisać pliku bez wcześniejszego przeczytania go?**
   - Odpowiedź: To zabezpieczenie - gdyby Claude nadpisał plik nie znając jego zawartości, mógłby przypadkowo usunąć ważne dane.

3. **Kiedy powinieneś użyć Write, a kiedy lepiej użyć Edit?**
   - Odpowiedź: Write - do tworzenia nowych plików i całkowitego nadpisania. Edit - do małych, precyzyjnych zmian w istniejących plikach (o czym więcej w następnej lekcji).

---

## 2-3 zadania praktyczne

### Zadanie 1: Analiza dokumentu PDF
Jeśli masz jakikolwiek plik PDF (faktura, umowa, tutorial), poproś Claude Code:
```
> przeczytaj @[nazwa-pliku].pdf i wyciągnij kluczowe informacje w formie listy punktowej
```
Sprawdź, jak dobrze Claude radzi sobie z rozpoznawaniem tekstu i struktury dokumentu.

---

### Zadanie 2: Generowanie pliku konfiguracyjnego
Poproś Claude o stworzenie pliku `.env.example` dla projektu Node.js:
```
> Stwórz plik .env.example z przykładowymi zmiennymi środowiskowymi: PORT, DATABASE_URL, JWT_SECRET, API_KEY
```
Sprawdź, czy plik został utworzony i czy zawiera sensowne przykładowe wartości.

---

### Zadanie 3: Czytanie obrazu i generowanie opisu
Zrób zrzut ekranu dowolnej strony internetowej (screenshot.png) i poproś:
```
> przeczytaj @screenshot.png i opisz co widzisz - układ strony, kolory, główne elementy interfejsu
```
Sprawdź, jak dokładnie Claude "widzi" obraz i czy jego opis jest precyzyjny.

---

## Linki do zasobów

Chcesz zgłębić temat? Sprawdź te materiały:

1. **[Claude Code - Oficjalna dokumentacja narzędzia Read](https://code.claude.com/docs/en/overview)** - Dokumentacja techniczna narzędzi Claude Code (EN)

2. **[Cooking with Claude Code: The Complete Guide](https://www.siddharthbharath.com/claude-code-the-complete-guide/)** - Kompletny przewodnik po Claude Code z przykładami użycia Read/Write (EN)

3. **[Tools and system prompt of Claude Code - GitHub Gist](https://gist.github.com/wong2/e0f34aac66caf890a332f7b6f9e2ba8f)** - Techniczne szczegóły jak działają narzędzia Claude Code (EN)

4. **[Anthropic Engineering: Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)** - Najlepsze praktyki od twórców Claude (EN)

---

**Do zobaczenia w następnym mailu!**

W kolejnej lekcji poznasz narzędzie **Edit** - precyzyjną modyfikację plików bez nadpisywania całości. Nauczysz się, jak zmieniać pojedyncze linie kodu, zachowując formatowanie i unikając błędów.

Jeśli masz pytania lub coś jest niejasne - śmiało odpisz na tego maila.

Powodzenia!

---

**P.S.** Pamiętaj - Claude Code to nie tylko programowanie. Wykorzystuj Read i Write do analizy dokumentów, porządkowania plików, generowania raportów. To narzędzie do wszystkiego, co robisz na komputerze!
