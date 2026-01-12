# Lekcja 4: Opanuj terminal - REPL i skróty klawiszowe


Dudaj dać opis claude z opcją pracy na plikach lokalnych

## Przypomnienie z lekcji 3

W poprzedniej lekcji poznaliśmy dwa sposoby uwierzytelniania w Claude Code - konto Pro/Max (przez `/login`) i API key poprzez Claude Console. Dowiedzieliśmy się, że subskrypcja Pro/Max oferuje stały miesięczny koszt, ale API daje większą kontrolę i przejrzystość kosztów. Nauczyliśmy się również monitorować wydatki za pomocą komendy `/cost` (dostępnej tylko dla użytkowników API). Średnie koszty dla użytkowników API to około $100-200 na dewelopera miesięcznie przy intensywnym użyciu aliasu `sonnet` (aktualnie wskazującego na Sonnet 4.5), choć mogą się znacznie różnić w zależności od liczby uruchomionych instancji i wykorzystania w automatyzacji.

Pamiętaj też o zasadach bezpieczeństwa - nigdy nie commituj klucza API do repozytorium i regularnie rotuj klucze co 90 dni.

## 2 pytania do poprzedniej lekcji

1. **Które konto ma wyższe limity requestów** - Pro czy API?
2. **Jak często powinieneś sprawdzać koszty** podczas intensywnej sesji kodowania?

<details>
<summary>Odpowiedzi</summary>

1. API poprzez Claude Console oferuje wyższe limity niż subskrypcja Pro/Max - szczegółowe limity zależą od rozmiaru zespołu i konfiguracji workspace
2. Po każdej dłuższej sesji używaj `/cost` aby śledzić wydatki w czasie rzeczywistym (uwaga: `/cost` jest dostępny tylko dla użytkowników API, nie dla subskrypcji Pro/Max)

</details>

---

## TLDR (Too Long, Didn't Read)

Interfejs REPL w Claude Code to coś więcej niż zwykły terminal. Kluczowe skróty klawiszowe mogą przyspieszyć Twoją pracę o 30-50%:
- **\\ + Enter** - nowa linia bez wysyłania (działa natychmiast wszędzie!)
- **Esc** - zatrzymuje aktualną operację/generowanie
- **Esc Esc** (2x) - cofa kod/konwersację do poprzedniego punktu
- **Ctrl+R** - przeszukuje historię promptów jak w bashu
- **Shift+Enter** - nowa linia bez wysyłania (po `/terminal-setup`)

Dobra konfiguracja terminala + opanowanie skrótów = profesjonalny workflow.

---

## Mem z Twittera

**"Programista próbujący wyjść z Vima"** to jeden z najbardziej kultowych memów developerskich. Ale prawda jest taka, że opanowanie skrótów klawiszowych - czy to w Vimie, czy w Claude Code - to różnica między amatorem a profesjonalistą.

Jak mówił ktoś na Twitterze: *"Vim transforms typing into a martial art"* (Vim zamienia pisanie w sztukę walki). To samo dotyczy Claude Code - kilka dni z prawidłowymi skrótami i nigdy nie wrócisz do klikania.

*Więcej o developer productivity memes: [Programming Memes Defining Developer Culture](https://vocal.media/geeks/programming-memes-defining-developer-culture-2026)*

---

## Treść lekcji: REPL i jakość życia w terminalu

### Czym jest REPL i dlaczego to ważne?

REPL to skrót od **Read-Eval-Print Loop** - interfejs, w którym wpisujesz polecenie, system je wykonuje i pokazuje wynik. W Claude Code to Twoje główne miejsce pracy. Im lepiej go opanujesz, tym szybciej pracujesz.

Myśl o tym jak o sterówce samolotu. Pilot musi znać każdy przycisk i każdy skrót, żeby reagować natychmiast. Tak samo Ty - opanowanie podstawowych skrótów to różnica między walką z narzędziem a swobodną pracą.

### Kluczowe skróty klawiszowe - Twoja przewaga

Oto kompletna tabela skrótów, które powinieneś znać na pamięć:

| Skrót | Akcja | Kiedy użyć |
|-------|-------|------------|
| `\` + `Enter` | Nowa linia w prompcie | **Uniwersalny sposób** na multi-line prompts - działa wszędzie bez konfiguracji |
| `Esc` | Zatrzymaj obecne generowanie | Gdy Claude "halucynuje" lub poszedł w złym kierunku |
| `Esc Esc` (2x) | Cofnij kod/konwersację | Przywraca kod i/lub konwersację do poprzedniego stanu |
| `Ctrl+C` | Anuluj obecną operację | Przerwij długotrwałe wykonywanie bash command |
| `Ctrl+D` | Wyjdź z Claude Code | Koniec sesji (zapisz historię) |
| `Ctrl+R` | Szukaj w historii | Przypomnij sobie poprzedni prompt |
| `Shift+Enter` | Nowa linia w prompcie | Multi-line prompts (wymaga `/terminal-setup`) |
| `Option+Enter` | Nowa linia w prompcie | Domyślnie na macOS (po konfiguracji Option jako Meta) |
| `Ctrl+J` | Nowa linia w prompcie | Line feed character (alternatywa) |
| `Shift+Tab` | Przełącz tryby uprawnień | Przełącza między Normal/Plan/Auto-Accept Mode |
| `Alt+M` | Przełącz tryby uprawnień | Alternatywa dla Shift+Tab (niektóre konfiguracje) |
| `Tab` | Autocomplete @files | Szybkie referencje do plików |
| `Ctrl+L` | Wyczyść ekran | Odświeżenie widoku (nie czyści historii) |
| `Up/Down` | Historia promptów | Nawigacja po poprzednich komendach |

### Praktyczne scenariusze użycia

#### Scenariusz 1: Przerwanie złego kierunku
```bash
> Zrefaktoruj cały projekt używając pattern X
[Claude zaczyna zmieniać wszystko...]
<Esc>  # STOP! Za dużo zmian naraz

> Zacznij od zrefaktorowania tylko @src/utils/
```

**Przykład poza programowaniem:** Poprosiłeś Claude o przygotowanie maila marketingowego do 500 klientów, ale zauważyłeś błąd w szablonie. Zamiast czekać aż skończy - Esc i popraw błąd.

#### Scenariusz 2: Cofnięcie niepożądanych zmian
```bash
> Zrefaktoruj wszystkie pliki w projekcie
[Claude wprowadza zmiany, które Ci się nie podobają...]
<Esc><Esc>  # Cofnij zmiany i konwersację do poprzedniego punktu
> Zrefaktoruj tylko @src/auth.ts  # Precyzyjniejsze polecenie
```

#### Scenariusz 3: Wyszukiwanie w historii
```bash
<Ctrl+R>
(reverse-i-search): migration  # Wpisz słowo kluczowe
# Znajdzie: "Przeprowadź migrację bazy danych z Postgres na MySQL"
```

**Przykład poza programowaniem:** Trzy dni temu przygotowywałeś analizę sprzedaży za Q3. Teraz potrzebujesz podobnej za Q4. Zamiast pisać od nowa - Ctrl+R + wpisz "analiza sprzedaży" i gotowe.

#### Scenariusz 4: Wieloliniowe prompty
```bash
# Uniwersalny sposób - działa wszędzie, zawsze:
> Przeanalizuj ten kod pod kątem:\
<Enter>
> - bezpieczeństwa\
<Enter>
> - wydajności\
<Enter>
> - czytelności
<Enter>

# Na macOS (po konfiguracji Option jako Meta):
> Przeanalizuj ten kod pod kątem:
<Option+Enter>
> - bezpieczeństwa
<Option+Enter>
> - wydajności
<Option+Enter>
> - czytelności
```

**Przykład poza programowaniem:** Tworzysz szczegółową instrukcję dla Claude, jak ma przeanalizować 50 faktur i wyciągnąć kluczowe dane do excela. Zamiast pisać to wszystko w jednej linii - użyj `\` + Enter dla każdego punktu.

### Konfiguracja terminala - zrób to raz, korzystaj zawsze

#### 1. Wieloliniowe prompty - 4 sposoby

Claude Code oferuje kilka metod wprowadzania wieloliniowych promptów:

**Metoda 1: `\` + Enter (UNIWERSALNA - polecana!)**
```bash
# Działa wszędzie, zawsze, bez żadnej konfiguracji
> Długi prompt\
> który zajmuje\
> wiele linii
```

**Metoda 2: Automatyczna konfiguracja przez `/terminal-setup`**
```bash
# Uruchom w Claude Code:
/terminal-setup

# Automatycznie konfiguruje Shift+Enter dla:
# - iTerm2 (macOS)
# - VS Code integrated terminal
```

**Metoda 3: Option+Enter (macOS - domyślnie)**
```bash
# Dla Mac Terminal.app:
# Settings → Profiles → Keyboard → "Use Option as Meta Key"

# Dla iTerm2 i VS Code:
# Settings → Profiles → Keys → Left/Right Option key: "Esc+"
```

**Metoda 4: Ctrl+J (line feed)**
```bash
# Uniwersalny control sequence - działa w większości terminali
> Długi prompt<Ctrl+J>
> który zajmuje<Ctrl+J>
> wiele linii
```

#### 2. Personalizacja statusu (Advanced)

Claude Code posiada wbudowaną komendę do konfiguracji statusu:

```bash
# Uruchom w Claude Code
/statusline

# Możesz również podać instrukcje bezpośrednio:
/statusline show the model name in orange

# Komenda pozwala Claude'owi pomóc Ci skonfigurować:
# - Który informacje pokazywać (model, koszty, git branch, katalog, etc.)
# - Format i kolorowanie wyświetlania
# - Zapisanie konfiguracji jako skrypt w ~/.claude/statusline.sh
```

Statusline może wyświetlać m.in. bieżący model, koszty sesji, branch git, katalog roboczy i inne przydatne informacje podczas pracy. Domyślnie `/statusline` próbuje odtworzyć wygląd Twojego terminala (PS1), ale możesz to dostosować podając dodatkowe instrukcje.

### Pro-tipy dla wydajnej pracy

#### 1. History search master
Zamiast scrollować w górę przez 50 komend, użyj Ctrl+R + słowo kluczowe:

```bash
# Szukasz wszystkich promptów związanych z dockerem?
<Ctrl+R> docker

# Szukasz analizy danych z zeszłego tygodnia?
<Ctrl+R> analiza
```

#### 2. Template prompts - twoje gotowe szablony

Stwórz niestandardowe komendy slash w `~/.claude/commands/` z często używanymi promptami:

```bash
# Utwórz katalog dla komend
mkdir -p ~/.claude/commands

# Template: Code Review
cat > ~/.claude/commands/code-review.md << 'EOF'
---
description: Przeanalizuj kod pod kątem jakości i bezpieczeństwa
---
Przeanalizuj $ARGUMENTS pod kątem:
- Bezpieczeństwa (SQL injection, XSS)
- Performance bottlenecks
- Code smells i violations DRY
EOF

# Template: Test Generation
cat > ~/.claude/commands/test-gen.md << 'EOF'
---
description: Wygeneruj testy jednostkowe
---
Wygeneruj testy jednostkowe dla $ARGUMENTS używając Jest
Coverage: 100%
Edge cases: invalid input, null, undefined
EOF
```

Użycie: Wywołaj komendę przez `/code-review @src/file.ts` lub `/test-gen @src/utils.ts`

**Przykład poza programowaniem:** Prowadzisz małą firmę i co miesiąc musisz przygotować raport finansowy. Zamiast za każdym razem pisać od nowa - masz gotową komendę slash, np. `/raport-finansowy plik.xlsx`.

#### 3. Clipboard integration

Integracja ze schowkiem to prawdziwa magia:

```bash
# Skopiuj output Claude do clipboard (macOS)
> Wygeneruj UUID | pbcopy

# Wklej clipboard jako input
> Przeanalizuj ten error: $(pbpaste)
```

**Przykład poza programowaniem:** Klient wysłał Ci maila z błędem. Kopiujesz treść błędu, wklejasz do Claude przez `$(pbpaste)` i od razu masz analizę + rozwiązanie.

### Typowe problemy i rozwiązania

| Problem | Objaw | Rozwiązanie |
|---------|-------|-------------|
| **Shift+Enter wysyła zamiast nowej linii** | Nie można pisać multi-line | Skonfiguruj terminal (patrz wyżej) |
| **Ctrl+R nie działa** | Brak przeszukiwania historii | Sprawdź czy używasz bash/zsh (nie fish/powershell) |
| **Ctrl+G otwiera złą aplikację** | Notepad zamiast VS Code | Ustaw `EDITOR` i `VISUAL` w profilu powłoki |
| **Polskie znaki się sypią** | ąćęłńóśźż wyświetlają jako ??? | Ustaw `export LANG=pl_PL.UTF-8` w ~/.zshrc |
| **Historia się nie zapisuje** | Po restarcie brak poprzednich promptów | Sprawdź uprawnienia `~/.claude/history` (chmod 644) |
| **Kolorowanie nie działa** | Monochromatyczny output | Włącz `export CLAUDE_COLORS=1` lub sprawdź `$TERM` |

### Zaawansowane scenariusze

#### Praca przez SSH
Claude Code działa świetnie przez SSH:

```bash
# Forwarding autoryzacji (jeśli używasz API key)
ssh -A user@server
export ANTHROPIC_API_KEY="sk-ant-..."
claude

# Dla /login przez SSH (wymaga port forwarding):
ssh -L 8080:localhost:8080 user@server
# Przeglądarka otworzy się lokalnie
```

#### Tmux/Screen integration
Połącz Claude Code z tmux dla maksymalnej produktywności:

```bash
# Stwórz dedykowaną sesję Claude
tmux new -s claude
claude

# Detach: Ctrl+B D
# Reattach: tmux attach -t claude

# Pro-tip: Podziel ekran (kod + Claude)
tmux split-window -h "vim"
# Lewe okno: kod w Vim
# Prawe okno: Claude Code
```

**Przykład poza programowaniem:** Pracujesz nad długoterminowym projektem - analiza 1000 faktur. Tmux pozwala odłączyć sesję, zrobić coś innego, a potem wrócić dokładnie tam, gdzie skończyłeś.

#### Logging sesji do pliku

```bash
# Loguj całą konwersację
script -q /tmp/claude-session-$(date +%Y%m%d).log claude

# Później możesz przeglądać:
less /tmp/claude-session-20241228.log
```

**Przykład poza programowaniem:** Przygotowujesz skomplikowaną strategię marketingową w Claude. Chcesz mieć pełny zapis sesji, żeby pokazać zespołowi jak doszedłeś do finalnej wersji.

### Tips & Tricks dla power users

#### Szybkie przełączanie projektów
```bash
# Funkcja w ~/.zshrc
ccd() {
    cd "$1" && claude
}

# Użycie:
ccd ~/Projects/my-app  # CD + uruchom Claude
```

#### Auto-save conversation
```bash
# Alias zapisujący historię przed wyjściem
alias cexit='claude /export session.md && exit'
```

#### Notification po długich operacjach (macOS)
```bash
# Dodaj do CLAUDE.md w projekcie:
When a task takes >2 minutes, send system notification:
`osascript -e 'display notification "Task completed" with title "Claude Code"'`
```

**Przykład poza programowaniem:** Poprosiłeś Claude o przeanalizowanie 500 emaili od klientów i wyciągnięcie najczęstszych problemów. To zajmie chwilę - notification da Ci znać, gdy skończy.

---

## Podsumowanie lekcji

Interfejs REPL w Claude Code to Twoje główne narzędzie pracy. Opanowanie podstawowych skrótów klawiszowych to nie fanaberia - to realna oszczędność czasu:

1. **`\` + Enter** - uniwersalny sposób na wieloliniowe prompty (działa wszędzie!)
2. **Esc** ratuje Cię, gdy Claude idzie w złym kierunku
3. **Esc Esc** cofa kod i konwersację do poprzedniego punktu
4. **Ctrl+R** przeszukuje historię błyskawicznie
5. **Shift+Enter** lub **Option+Enter** (po konfiguracji) umożliwiają wieloliniowe prompty
6. **Shift+Tab** / **Alt+M** przełączają tryby uprawnień

Dobra konfiguracja terminala to jednorazowa inwestycja 15 minut, która zwraca się setkami zaoszczędzonych godzin. Nie odkładaj tego na później - zrób to teraz!

Pamiętaj: te same zasady działają wszędzie - czy pracujesz nad kodem, analizujesz dane dla firmy, czy przygotowujesz materiały marketingowe. Opanowanie narzędzi = większa produktywność.

---

## 3 pytania kontrolne

1. **Jaki jest najbardziej uniwersalny sposób** na wpisanie wieloliniowego prompta, który działa w każdym terminalu bez konfiguracji?

2. **Jaka jest różnica między jednym a dwoma naciśnięciami Esc?**

3. **Jak przeszukać historię promptów**, żeby znaleźć komendę sprzed kilku dni bez przewijania?

<details>
<summary>Odpowiedzi</summary>

1. `\` + `Enter` - backslash, a następnie Enter tworzy nową linię. Działa wszędzie natychmiast.
2. Jedno `Esc` zatrzymuje aktualną operację/generowanie. Dwa razy `Esc Esc` cofa kod i konwersację do poprzedniego punktu.
3. `Ctrl+R` i wpisanie słowa kluczowego (np. "docker", "analiza")

</details>

---

## 2-3 zadania praktyczne

### Zadanie 1: Test wieloliniowych promptów (10 minut)
1. Uruchom Claude Code
2. Przetestuj **`\` + Enter**: Napisz prompt w 3 liniach używając backslash
3. Jeśli używasz macOS, przetestuj **Option+Enter** (może wymagać konfiguracji Option jako Meta)
4. Uruchom `/terminal-setup` i przetestuj **Shift+Enter**
5. Przetestuj **Ctrl+J** jako alternatywę

### Zadanie 2: Trening skrótów (20 minut)
1. Uruchom Claude Code
2. Wpisz dowolny prompt i wyślij
3. Gdy Claude zacznie odpowiadać - naciśnij **Esc** (przerwij generowanie)
4. Poproś Claude o jakąś zmianę w kodzie, a następnie naciśnij **Esc Esc** - kod powinien wrócić do poprzedniego stanu
5. Wpisz kilka różnych promptów (np. związanych z "test", "docker", "refactor")
6. Naciśnij **Ctrl+R** i wyszukaj słowo kluczowe z poprzednich promptów
7. Naciśnij **Shift+Tab** lub **Alt+M** - przełącz tryby uprawnień i obserwuj zmianę w interfejsie

### Zadanie 3: Niestandardowe komendy slash (25 minut)
1. Stwórz katalog: `mkdir -p ~/.claude/commands`
2. Utwórz plik: `~/.claude/commands/review.md` z szablonem code review
3. Dodaj 2-3 dodatkowe komendy związane z Twoją pracą:
   - Jeśli programujesz: komendy do code review, testów, dokumentacji
   - Jeśli prowadzisz firmę: komendy do analizy wydatków, raportów, emaili
   - Jeśli analizujesz dane: komendy do czyszczenia danych, wizualizacji, raportów
4. Przetestuj jedną komendę - uruchom `/review @plik.ts` w Claude Code

**Bonus:** Dodaj `description` i `argument-hint` w frontmatter dla lepszego auto-complete

---

## Linki do dodatkowych zasobów

### Oficjalna dokumentacja
- [Claude Code CLI Reference - Keyboard Shortcuts](https://code.claude.com/docs/cli-reference) - Pełna lista skrótów i komend
- [Claude Code Interactive Mode](https://code.claude.com/docs/interactive-mode) - Kompletna dokumentacja skrótów klawiszowych
- [Claude Code Settings](https://code.claude.com/docs/settings) - Wszystkie opcje konfiguracyjne

### Praktyczne poradniki
- [How I Use Claude Code - Builder.io](https://www.builder.io/blog/claude-code) - Keyboard shortcuts i living entirely in Claude Code
- [10 Claude Code Productivity Tips For Every Developer in 2025](https://www.f22labs.com/blogs/10-claude-code-productivity-tips-for-every-developer/) - Tips na produktywność
- [32 Claude Code Tips: From Basics to Advanced](https://agenticcoding.substack.com/p/32-claude-code-tips-from-basics-to) - 32 wskazówki od podstaw do zaawansowanych

### GitHub repositories z tipami
- [40+ tips for getting the most out of Claude Code](https://github.com/ykdojo/claude-code-tips) - Custom status line, optimized prompts
- [Full guide on claude tips and tricks](https://github.com/zebbern/claude-code-guide) - Comprehensive optimization guide

### Video tutorials
- [How to Set Up Claude Code for Faster and Better AI Coding](https://www.classcentral.com/course/youtube-how-i-set-up-claude-code-for-faster-and-better-ai-code-468813) - 27-minutowy tutorial setup
- [Claude Code Masterclass from CS Dojo](https://www.classcentral.com/course/youtube-claude-code-masterclass-503745) - 20-minutowy comprehensive masterclass

---

**W następnej lekcji:** Poznasz zaawansowane techniki pisania promptów - jak uzyskać dokładnie to, czego potrzebujesz za pierwszym razem. Nauczysz się też, jak Claude Code radzi sobie z dużymi projektami i jak zarządzać kontekstem.

**Pytania?** Odpowiedz na tego maila - chętnie pomogę!

---

*Kurs Claude Code - Moduł 1: Podstawy | Lekcja 4 z 8*
