# Lekcja 10: Supermoce - multimodalne możliwości Claude Code

Przeczytaj tę lekcję tak, jak przeglądasz menu restauracji. Nie musisz zapamiętać każdego szczegółu. Wystarczy, że wiesz, co jest w ofercie. Gdy przyjdzie moment, że będziesz potrzebować głosowego dyktowania albo analizy PDF-a - wrócisz tutaj po detale. Albo po prostu zapytasz Claude'a. On zna te funkcje lepiej niż Ty kiedykolwiek będziesz.

---

## Przypomnienie z lekcji 9

W poprzedniej lekcji poznałeś tryby uprawnień:

- **Normal Mode** - Claude pyta o zgodę przed każdą operacją
- **Plan Mode** - Claude planuje, ale nie wykonuje zmian
- **Auto-Accept Mode** - Claude działa bez pytania

Tryby przełączasz skrótem **Shift+Tab**.

---

## 1. Głosowe dyktowanie - mów zamiast pisać

Mówienie jest 3-5 razy szybsze od pisania. 150 słów na minutę vs 40 słów na minutę. Ta matematyka jest bezlitosna.

### Narzędzia do wyboru

**SuperWhisper** (macOS) - https://superwhisper.com/
- Przetwarza audio lokalnie, prywatnie
- Obsługuje ponad 100 języków
- Cena: od $8/miesiąc

**Wispr Flow** (Mac, Windows, iOS) - https://wisprflow.ai/
- 97% dokładności transkrypcji
- Tryb szeptania do pracy w open space
- Cena: $15/miesiąc

**VoiceMode MCP** - https://getvoicemode.com/
- Instalacja: `claude mcp add --scope user voicemode`
- Działa lokalnie, bez subskrypcji
- Pełna prywatność

**Claude STT Plugin** - https://github.com/jarrodwatts/claude-stt
- Ctrl+Shift+Space do nagrywania
- Lokalne przetwarzanie (~400ms opóźnienia)
- Darmowy, open source

### Jak to działa w praktyce?

```
# Naciśnij hotkey (np. Ctrl+Shift+Space)
# Powiedz:
"Hej, ta funkcja calculate_total jest za długa,
rozbij ją na trzy mniejsze funkcje i dodaj testy"
# Transkrypcja trafia do Claude Code
# Claude implementuje
```

### Kiedy głos ma sens?

- **Burzę mózgów** - myślisz głośno, Claude zapisuje i implementuje
- **Code review** - "przejrzyj ten plik, znajdź potencjalne problemy"
- **Dokumentowanie** - opisujesz co robisz, Claude pisze dokumentację
- **Przy kawie** - dyktuj prompt odchodząc od biurka

### Realne oszczędności

Użytkownicy SuperWhisper i Wispr Flow raportują oszczędność 2-3 godzin tygodniowo na samym dyktowaniu promptów. Andrej Karpathy nazwał to "vibe coding" - mówisz co chcesz, ręce zostają na kawie.

---

## 2. Screenshoty i obrazy - pokaż zamiast opisywać

Claude widzi obrazy. Dosłownie. Możesz wkleić screenshot i powiedzieć "napraw to".

### Jak wkleić obraz?

**Metoda 1: Schowek (macOS)**
```
Cmd+Ctrl+Shift+4 → zaznacz obszar → Ctrl+V w Claude Code
```
Ważne: użyj Ctrl+V, nie Cmd+V.

**Metoda 2: Ścieżka do pliku**
```
> Zaimplementuj design z ./mockup.png jako komponent React
```

**Metoda 3: Przeciągnij i upuść**
Złap plik obrazu i upuść na okno terminala.

### Specyfikacje techniczne

**Formaty:** JPEG, PNG, GIF, WebP

**Rozmiar pliku:** do 5MB (API) lub 10MB (claude.ai)

**Rozdzielczość:** do 8000x8000 px (przy więcej niż 20 obrazach limit spada do 2000x2000 px)

**Obrazów na zapytanie:** do 100 (API) lub 20 (claude.ai)

### Praktyczne scenariusze

**Debugowanie UI**
```
> @screenshot.png - ten przycisk jest źle wyrównany, napraw CSS
```

**Błąd w konsoli**
```
> @error.png - co oznacza ten błąd i jak go naprawić?
```

**Implementacja designu**
```
> @figma-mockup.png - zaimplementuj ten layout w Tailwind CSS
```

**Analiza wykresu**
```
> @chart.png - opisz trendy na tym wykresie i wyciągnij wnioski
```

### Iteracyjny workflow z przeglądarką

Claude Code oferuje wbudowaną integrację z Chrome (beta):
```
claude --chrome
```

Możesz też podłączyć Puppeteer MCP server. W obu przypadkach Claude może sam robić screenshoty przeglądarki:

1. Dajesz Claude mockup designu (obraz projektu graficznego)
2. Claude implementuje kod
3. Claude robi screenshot wyniku
4. Porównuje z mockupem
5. Poprawia różnice
6. Powtarza aż do zgodności

Pierwsza wersja jest zwykle 70% tego, czego potrzebujesz. Po 2-3 iteracjach dochodzisz do 95%.

---

## 3. PDF-y - wrzuć dokumentację, Claude się nauczy

Claude czyta PDF-y bezpośrednio z dysku. Bez konwersji, bez kopiowania tekstu.

### Jak to działa?

```
> Przeczytaj @stripe-api-docs.pdf i naucz się Stripe API
> Teraz zaimplementuj flow płatności dla e-commerce
```

Claude analizuje tekst i obrazy na każdej stronie. Rozumie wykresy, tabele, diagramy.

### Specyfikacje

| Parametr | Limit |
|----------|-------|
| Rozmiar zapytania | do 32MB |
| Liczba stron | do 100 |
| Format | standardowy PDF (bez hasła) |

### Praktyczne zastosowania

**Nauka nowej biblioteki**
```
> @aws-sdk-docs.pdf - jak używać S3 do przechowywania plików?
> Zaimplementuj upload i download w naszym projekcie
```

**Analiza raportów**
```
> Przeanalizuj @raport-Q4.pdf i @raport-Q3.pdf
> Porównaj wyniki, znajdź trendy, napisz executive summary
```

**Specyfikacje techniczne**
```
> @api-specification.pdf - zaimplementuj klienta zgodnego ze specyfikacją
```

**Dokumenty prawne**
```
> @regulamin.pdf - wypisz główne zobowiązania stron w punktach
```

### Koszt tokenów

PDF-y są droższe niż zwykły tekst:
- 1500-3000 tokenów na stronę (token to jednostka rozliczeniowa AI - mniej więcej 3/4 słowa)
- Plus koszty za obrazy na każdej stronie

Dla często używanych dokumentów rozważ prompt caching (zapisywanie powtarzających się fragmentów).

---

## 4. Automatyzacja - niech Claude robi nudną robotę

Claude może wykonywać powtarzalne zadania, które normalnie zajmują Ci godziny.

### Git workflow na autopilocie

```
> Przejrzyj moje zmiany, podziel na logiczne commity
> i stwórz PR z opisem
```

Claude:
1. Analizuje wszystkie zmiany
2. Grupuje je tematycznie
3. Pisze commit messages
4. Tworzy branch
5. Pushuje
6. Tworzy PR z opisem

Oszczędność: 15-30 minut dziennie.

### Generowanie testów

```
> Wygeneruj testy jednostkowe dla @src/auth.ts
> Pokryj wszystkie edge cases
```

### Dokumentacja na żądanie

```
> Wygeneruj README.md na podstawie struktury projektu
> Dodaj instrukcje instalacji, użycia i przykłady
```

### Bulk operations

```
> Znajdź wszystkie komponenty React używające class components
> Zmigruj je na hooks
```

---

## 5. Przykłady dla nie-programistów

### Dla marketera

**Analiza kampanii**
```
> @raport-kampanii.pdf - jakie segmenty klientów
> najlepiej konwertowały? Zaproponuj optymalizacje.
```

**Copywriting**
```
> Napisz 5 wariantów headline'a dla strony produktu
> Fokus: korzyści dla użytkownika, nie funkcje
```

**A/B testy**
```
> @landing-page.png - zidentyfikuj przyciski CTA (Call to Action)
> Zaproponuj 3 warianty A/B testów
```

Firmy używające Claude do marketingu raportują 40% skrócenie czasu produkcji kampanii. Jedna firma osiągnęła 52% open rate w email outreach dzięki personalizacji przez AI.

### Dla content writera

**Repurposing treści**
```
> @artykul-blog.md - przetwórz na:
> 1. Newsletter (300 słów)
> 2. Post LinkedIn (150 słów)
> 3. 5 tweetów
```

**Research**
```
> Przeczytaj @raport-branżowy.pdf
> Wypisz 10 statystyk, które mogę użyć w artykule
```

Według badań, content writerzy używający AI oszczędzają 12 godzin tygodniowo. Koszt produkcji bloga spada z $611 do $131 za post (78% oszczędności).

### Dla analityka danych

**Generowanie raportów**
```
> @dane-sprzedaż.csv - przeanalizuj trendy
> Wygeneruj raport z wykresami w formacie Markdown
```

**SQL na żądanie**
```
> @schemat-bazy.pdf - napisz query, które znajdzie
> top 10 klientów według wartości zamówień w Q4
```

Firmy z sektora finansowego raportują 50% redukcję obciążenia analityków po wdrożeniu Claude do generowania raportów.

### Dla rekrutera/HR

**Screening CV**
```
> @cv-kandydat.pdf @job-description.md
> Oceń dopasowanie kandydata do stanowiska (1-10)
> Wypisz mocne strony i czerwone flagi
```

**Ogłoszenia o pracę**
```
> Przepisz to ogłoszenie - usuń żargon, dodaj konkretne wymagania
> Sprawdź czy język jest neutralny gender-owo
```

87% pracodawców globalnie używa AI w rekrutacji. Czas screeningu CV spada o 70-80%. Rekruterzy oszczędzają 3-5 godzin dziennie.

### Dla project managera

**Retro z danych**
```
> Przeanalizuj @sprint-notes.md i @velocity-chart.png
> Zidentyfikuj wzorce, zaproponuj usprawnienia
```

**Planning**
```
> @backlog.csv - zaplanuj sprint na 2 tygodnie
> Zespół: 3 developerów, velocity 25 punktów
```

### Dla nauczyciela

**Materiały dydaktyczne**
```
> @podręcznik-rozdział-5.pdf - stwórz quiz 10 pytań
> Dodaj 3 trudne pytania dla najlepszych uczniów
```

**Feedback do prac**
```
> @praca-ucznia.pdf - oceń według kryteriów:
> 1. Struktura argumentacji
> 2. Użycie źródeł
> 3. Poprawność językowa
```

### Dla prawnika

**Analiza umów**
```
> @umowa-serwisowa.pdf - zidentyfikuj klauzule dotyczące:
> 1. Odpowiedzialności stron
> 2. Wypowiedzenia
> 3. Kar umownych
```

**Porównanie dokumentów**
```
> Porównaj @umowa-v1.pdf z @umowa-v2.pdf
> Wypisz wszystkie różnice w formie tabeli
```

### Dla handlowca

**Przygotowanie do spotkania**
```
> @notatki-klient.md @linkedin-profil.png
> Przygotuj briefing: pain points, potencjalne obiekcje,
> personalizowane argumenty sprzedażowe
```

**Follow-up po spotkaniu**
```
> @notatki-ze-spotkania.md - napisz email follow-up
> Podsumuj ustalenia, zaproponuj kolejne kroki
```

---

## Statystyki produktywności

Badania London School of Economics pokazują, że pracownicy używający AI oszczędzają średnio **7.5 godziny tygodniowo** - równowartość $14,000 rocznie na pracownika.

Według ankiety Lenny's Newsletter:
- 83% founderów oszczędza 4+ godzin tygodniowo
- 63% product managerów oszczędza 4+ godzin tygodniowo
- 55% inżynierów oszczędza 4+ godzin tygodniowo

Ale jest haczyk: 37% zaoszczędzonego czasu wraca na poprawianie błędów AI i weryfikację outputu. Zostaje 63% w kieszeni. Ta matematyka się opłaca, jeśli weryfikujesz output.

---

## Co dalej?

Przeszedłeś przez 10 lekcji modułu podstawowego. Czas na praktykę.

W Module 2 poznasz wbudowane narzędzia Claude Code:
- Read, Write, Edit - mastery edycji plików
- Bash, Grep, Glob - power user terminala
- Git integration - profesjonalny workflow

---

## Zadania do przećwiczenia

### Zadanie 1: Głosowy prompt

Jeśli masz macOS:
1. Zainstaluj SuperWhisper (trial jest darmowy)
2. Poproś Claude głosowo o analizę struktury swojego projektu
3. Porównaj czas z pisaniem tego samego promptu

### Zadanie 2: Screenshot debugging

1. Znajdź dowolną stronę z błędem wizualnym (lub zrób celowo)
2. Zrób screenshot
3. Wklej do Claude: "co jest nie tak z tym UI?"

### Zadanie 3: PDF learning

1. Pobierz dokumentację dowolnej biblioteki jako PDF
2. Wrzuć do Claude i poproś o wyjaśnienie głównych koncepcji
3. Poproś o implementację prostego przykładu

---

## Słowniczek terminów

**Token** - jednostka rozliczeniowa w AI. Jeden token to około 3/4 słowa po angielsku lub pół słowa po polsku. Im więcej tokenów używasz, tym wyższy koszt.

**MCP (Model Context Protocol)** - protokół pozwalający Claude na integrację z zewnętrznymi narzędziami i serwisami.

**Mockup** - projekt graficzny/wizualizacja pokazująca jak ma wyglądać gotowy interfejs lub strona.

**CTA (Call to Action)** - element interfejsu zachęcający użytkownika do działania, np. przycisk "Kup teraz" lub "Zapisz się".

**Puppeteer** - narzędzie do automatyzacji przeglądarki, pozwala Claude robić screenshoty stron.

**Prompt caching** - technika oszczędzania tokenów przez cache'owanie powtarzających się fragmentów promptu.

**STT (Speech-to-Text)** - konwersja mowy na tekst, podstawa głosowego dyktowania.

**OCR (Optical Character Recognition)** - rozpoznawanie tekstu na obrazach, Claude robi to automatycznie.

**Velocity** - w metodyce Agile/Scrum: miara ilości pracy, którą zespół wykonuje w jednym sprincie. Wyrażana w punktach.

**Backlog** - lista zadań do wykonania w projekcie, uporządkowana według priorytetów.

---

## Linki

**Narzędzia do głosowego dyktowania:**
- SuperWhisper: https://superwhisper.com/
- Wispr Flow: https://wisprflow.ai/
- VoiceMode MCP: https://getvoicemode.com/
- Claude STT: https://github.com/jarrodwatts/claude-stt

**Dokumentacja Claude:**
- Vision: https://platform.claude.com/docs/en/build-with-claude/vision
- PDF Support: https://platform.claude.com/docs/en/build-with-claude/pdf-support
- Claude Code: https://code.claude.com/docs/en/overview

---

*Następna lekcja: Moduł 2, Lekcja 1 - Wbudowane narzędzia*
