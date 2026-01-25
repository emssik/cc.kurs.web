# Mail 8: Slash commands - kompletny przegląd

## Przypomnienie z lekcji 7

W poprzedniej lekcji poznaliśmy **CLAUDE.md** - pamięć projektu, która działa jak dokument onboardingowy dla Claude. Nauczyliśmy się tworzyć hierarchię plików (globalny, projektowy, lokalny) oraz używać komendy `/init` do automatycznego generowania szkieletu.

---

## Sprawdź swoją wiedzę z lekcji 7

1. **Która komenda automatycznie generuje szkielet CLAUDE.md?** (`/init`, `/memory`, `/help`)
2. **W jakiej kolejności Claude ładuje pliki CLAUDE.md?** (od najwyższego do najniższego priorytetu)
3. **Jakie są poprawne nazwy komend?** (`/add-dir`, `/resume`, `/rewind` - nie `/add`, `/history`, `/undo`)

---

## TLDR

Ta lekcja to **kompletna ściągawka** wszystkich slash commands. Część z nich już znasz z poprzednich lekcji - tutaj znajdziesz je wszystkie w jednym miejscu.

**Nowe komendy w tej lekcji:**
- `/export` - eksport rozmowy do pliku (backup postępów)
- `/plan` - tryb planowania przed implementacją
- `/resume` - wznów poprzednią sesję
- `/model` - zmień model AI
- `/settings` lub `/config` - sprawdź/zmień konfigurację

**Checkpoint Pattern** - praktyczna strategia oszczędzania (szczegóły w lekcji).

---

## Lekcja: Slash Commands - kompletny przegląd

W tej lekcji znajdziesz **wszystkie slash commands** w jednym miejscu. Część z nich poznałeś już w poprzednich lekcjach - tutaj skupimy się na nowych komendach i praktycznym **Checkpoint Pattern**.

### Zarządzanie kontekstem i koszty (przypomnienie)

Komendy `/clear`, `/compact`, `/context`, `/cost`, `/usage` i `/stats` szczegółowo omawialiśmy w **Lekcji 03** (abonamenty i koszty). Krótkie przypomnienie:

| Komenda | Funkcja |
|---------|---------|
| `/clear` | Usuwa całą historię rozmowy |
| `/compact` | Kompresuje historię, zachowuje kluczowe info |
| `/context` | Wizualizuje co zajmuje miejsce w kontekście |
| `/cost` | Koszt sesji (dla API users) |
| `/usage` | Limity i rate limits (tylko API) |
| `/stats` | Wizualizacja użycia (Pro/Max) |

> 💡 **Szczegóły:** Patrz Lekcja 03 - "Uwierzytelnianie i abonamenty"

### Kompletna lista slash commands

Poniżej znajdziesz wszystkie komendy z oznaczeniem, gdzie były szczegółowo omówione.

#### Kontekst i koszty (→ Lekcja 03)

| Komenda | Opis |
|---------|------|
| `/clear` | Wyczyść historię i kontekst |
| `/compact` | Skompresuj historię, zachowaj kluczowe info |
| `/context` | Wizualizuj zużycie kontekstu |
| `/cost` | Koszt sesji (API users) |
| `/usage` | Limity i rate limits (API) |
| `/stats` | Wizualizacja użycia (Pro/Max) |

#### CLAUDE.md (→ Lekcja 07)

| Komenda | Opis |
|---------|------|
| `/init` | Wygeneruj CLAUDE.md dla projektu |
| `/memory` | Edytuj pliki CLAUDE.md |

#### Logowanie (→ Lekcja 03)

| Komenda | Opis |
|---------|------|
| `/login` | Zaloguj się do konta Claude |
| `/logout` | Wyloguj się |

#### Bezpieczeństwo (→ Lekcja 06)

| Komenda | Opis |
|---------|------|
| `/permissions` | Zarządzaj uprawnieniami |
| `/sandbox` | Konfiguracja sandboxa |

#### Instalacja i diagnostyka (→ Lekcja 02)

| Komenda | Opis |
|---------|------|
| `/doctor` | Diagnostyka instalacji i połączenia |
| `/version` | Sprawdź wersję Claude Code |

#### NOWE - Zarządzanie sesją

**`/export`** - Eksportuj konwersację do pliku
```bash
> /export conversation.md
```
Zapisuje całą rozmowę do pliku Markdown. Używaj przed:
- Dużymi zmianami w kodzie
- Zakończeniem sesji
- Przełączaniem między projektami

**Przykład - przekazanie pracy komuś innemu:**
```bash
# Developer A kończy pracę:
> /export handoff-to-bob.md
> Podsumuj co zrobiono i co pozostało do zrobienia

# Developer B przejmuje:
> Przeczytaj @handoff-to-bob.md i kontynuuj
```

**`/resume`** - Wznów poprzednią sesję
```bash
> /resume
```
Pozwala kontynuować poprzednią rozmowę z pełnym kontekstem.

**`/rewind`** - Cofnij konwersację i/lub kod
```bash
> /rewind
```
Alternatywa dla skrótu `Esc+Esc` (→ Lekcja 04). Pozwala wybrać co cofnąć: kod, rozmowę, lub jedno i drugie.

#### NOWE - Konfiguracja i model

**`/config`** lub **`/settings`** - Otwórz interfejs ustawień
```bash
> /settings
```
Pozwala zmienić konfigurację Claude Code bez edycji plików JSON.

**`/model`** - Wybierz/zmień model AI
```bash
> /model
```
Przełącz między modelami (Haiku, Sonnet, Opus) w trakcie sesji.

**`/plan`** - Wejdź w tryb planowania
```bash
> /plan
```
Claude najpierw zaplanuje podejście, zanim zacznie implementację. Przydatne dla złożonych zadań.

#### Pomoc

**`/help`** - Pokaż wszystkie dostępne komendy

**Tip:** Wpisz `/` w Claude Code, aby zobaczyć listę komend z podpowiedziami.

### Status Line (→ Lekcja 04)

Własny pasek statusu z informacjami o projekcie (git branch, uncommitted changes) omawialiśmy w **Lekcji 04**. Znajdziesz tam:
- Konfigurację w `settings.json`
- Gotowe rozwiązanie **ccstatusline** z GitHub
- Przykład własnego skryptu

### Praktyczne scenariusze

#### Scenariusz 1: Analiza danych sprzedażowych dla małej firmy

```bash
# Start sesji
> Przeanalizuj dane sprzedażowe z pliku sales-2024.csv i pokaż trendy

[... Claude analizuje dane, generuje wykresy w Python ...]

# Po 45 minutach:
> /usage
# Using 78,000 / 200,000 tokens (39%)

> /compact  # Oszczędzamy tokeny
> /export sales-analysis-backup.md  # Backup wyników

# Kontynuuj z czystszym kontekstem:
> Teraz przygotuj raport w formacie PDF z wnioskami
```

#### Scenariusz 2: Przygotowanie kampanii marketingowej

```bash
# Sesja 1: Copywriting
> Napisz 5 wersji maila promocyjnego na nowy produkt
[... praca nad tekstami ...]
> /export campaign-emails.md
> /clear  # Kończymy temat

# Sesja 2: Grafika
cd ~/Marketing/graphics
claude
> Przeanalizuj obrazy w folderze i zasugeruj które użyć w kampanii
[... analiza grafik ...]
> /export graphics-recommendations.md
```

#### Scenariusz 3: Monitorowanie budżetu projektu

```bash
> /cost
# Total cost: $2.34
# Duration: 2h 15m

# Jeśli za drogo:
> /compact  # Zmniejsz zużycie
# Lub przełącz na tańszy model (Haiku) w przyszłych sesjach
```

### Checkpoint Pattern - strategia oszczędzania

Najważniejsza technika zarządzania kosztami. Używaj co 30-60 minut:

```bash
# Co 30-60 minut:
> /context           # Wizualizuj co zajmuje miejsce w kontekście
> /cost              # Sprawdź ile wydałeś
> /compact           # Skompresuj jeśli >50k tokens lub >70% kontekstu
> /export backup.md  # Backup progress

# Przed końcem sesji:
> /export final-summary.md
> /clear
```

**Dlaczego to działa?**
- `/context` pokazuje co zajmuje miejsce w kontekście (skills, pliki, historia)
- Regularny `/compact` redukuje zużycie tokenów nawet o 70-80%
- `/export` chroni przed utratą postępów przy nieoczekiwanym zamknięciu programu
- `/cost` pozwala wykryć problemy zanim rachunek urośnie

### Typowe błędy i jak ich unikać

| Błąd | Objaw | Rozwiązanie |
|------|-------|-------------|
| **Zapomnienie /compact** | Session cost > $5 | Regularnie kompaktuj co 30-60 min |
| **Użycie /clear zamiast /compact** | Utrata całego kontekstu | Używaj `/export` przed `/clear` |
| **Nie sprawdzanie /cost** | Nieoczekiwanie wysoki rachunek | Ustaw habit: `/cost` co godzinę |
| **Brak /export** | Utrata postępu przy crashu | `/export` przed każdą dużą zmianą |

### Przydatne tricki

> 💡 Podstawy aliasów shellowych znajdziesz w **Lekcji 02**.

**Funkcja z reminderem o eksporcie:**
```bash
# Dodaj do ~/.zshrc lub ~/.bashrc
claude-session() {
    echo "💡 Pamiętaj: /export przed wyjściem!"
    claude
    echo "Sesja zakończona. Sprawdź czy zrobiłeś /export."
}
```

### Debug workflow

```bash
> /doctor  # Pierwsza linia obrony przy problemach

# Jeśli problem z kosztami:
> /cost
> /usage

# Jeśli problem z uprawnieniami:
> /permissions  # Zobacz i zaktualizuj uprawnienia

# Jeśli problem z konfiguracją:
> /settings
```

---

## Słowniczek

> 💡 Definicje tokenów, kontekstu i rate limitów znajdziesz w **Lekcji 03**.

**Checkpoint Pattern** - strategia regularnego zapisywania postępów: co 30-60 min wykonaj `/cost` → `/compact` → `/export`. Chroni przed utratą pracy i kontroluje koszty.

**Plan mode** - tryb pracy Claude Code, w którym AI najpierw planuje podejście do zadania zanim zacznie implementację. Aktywowany przez `/plan`.

---

## Podsumowanie

Ta lekcja to **kompletna ściągawka** wszystkich slash commands. Kluczowe wnioski:

1. **Nowe komendy:** `/export`, `/resume`, `/plan`, `/model`, `/settings` - poznałeś je w tej lekcji
2. **Checkpoint Pattern:** Co 30-60 min: `/cost` → `/compact` → `/export`
3. **Backup jest kluczowy:** `/export` przed każdą większą zmianą chroni Twój postęp
4. **Wracaj do poprzednich lekcji:** Szczegóły kosztów (L03), CLAUDE.md (L07), statusline (L04)

**Złota zasada:** Wpisz `/` w Claude Code, aby zobaczyć wszystkie dostępne komendy - nie musisz ich pamiętać na pamięć.

---

## Pytania kontrolne

1. **Jaka jest różnica między `/clear` a `/compact`?** Kiedy użyć jednego, a kiedy drugiego?

2. **Ile kosztuje Cię jedna godzina pracy z Claude Code?** Sprawdź używając `/cost` podczas następnej sesji i zapisz wynik.

3. **Co to jest "Checkpoint Pattern"?** Opisz pełny workflow tego podejścia.

---

## Zadania praktyczne

### Zadanie 1: Wypróbuj Checkpoint Pattern
1. Rozpocznij sesję Claude Code w swoim projekcie
2. Pracuj przez 30 minut
3. Wykonaj pełny checkpoint:
   - `/cost` - zanotuj koszt
   - `/compact` - skompresuj kontekst
   - `/export session-backup.md` - zapisz postęp
4. Sprawdź `/context` przed i po `/compact` - ile zaoszczędziłeś?

### Zadanie 2: Export i resume
1. Pracuj nad zadaniem przez 15 minut
2. Wykonaj `/export handoff.md`
3. Zamknij Claude Code
4. Uruchom ponownie i wpisz `/resume`
5. Porównaj: czy kontekst się zachował?
6. Alternatywnie: `> Przeczytaj @handoff.md i kontynuuj`

### Zadanie 3: Tryb planowania
1. Wybierz złożone zadanie (np. "Dodaj system logowania do aplikacji")
2. Wpisz `/plan`
3. Opisz zadanie i pozwól Claude zaplanować podejście
4. Oceń: czy plan jest sensowny? Co byś zmienił?

---

## Linki do dodatkowych zasobów

1. **Oficjalna dokumentacja Claude Code - Slash Commands**
   https://docs.anthropic.com/en/docs/claude-code/cli-usage#slash-commands

2. **Export and Backup Strategies (Community Guide)**
   https://github.com/anthropics/claude-code/discussions

3. **Skills i Custom Commands**
   https://docs.anthropic.com/en/docs/claude-code/slash-commands

---

**W następnej lekcji:** Poznamy wbudowane narzędzia (Tools) w Claude Code - jak działa Bash, Read, Write, Edit, Grep i Glob. Dowiesz się, jak Claude "widzi" i modyfikuje Twoje pliki oraz jak wykorzystać to do automatyzacji powtarzalnych zadań.

Do zobaczenia!
