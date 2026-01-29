# Lekcja 10: Supermoce - jak pracują eksperci

Ta lekcja zamyka Moduł 1. Zamiast nowych funkcji - pokażę Ci **jak łączyć** wszystko, czego się nauczyłeś. Plus kilka technik, które wykorzystują eksperci do maksymalnej produktywności.

---

## Przypomnienie z lekcji 9

W poprzedniej lekcji poznałeś **claude.ai/code** - interfejs webowy Claude Code:
- Konfiguracja GitHub OAuth i Claude GitHub App
- Diff View do przeglądania zmian przed PR
- Teleportacja sesji między WEB a CLI (`/teleport`)
- Ograniczenia sandbox (brak Docker, timeout)

---

## TLDR

**Klamra modułu 1** - ta lekcja łączy wszystko:



Eksperci nie używają jednej techniki - łączą je w workflow.

---

## 1. Pattern Borisa Cherny'ego - równoległe sesje

Boris Cherny, twórca Claude Code, prowadzi **5-15 sesji równocześnie**:
- 5 w terminalu (iTerm2 z numerowanymi tabami)
- 5-10 w WEB (claude.ai/code)
- Sesje mobilne uruchamiane rano, sprawdzane później

**259 Pull Requestów w 30 dni.** 497 commitów, 40 000 linii kodu dodanych.

Każda sesja to **osobny git checkout** (nie branch!). To znaczy osobna kopia repozytorium na dysku:

```bash
# Struktura katalogów Borisa:
~/code/
├── claude-code-1/     # Sesja 1: nowa funkcja
├── claude-code-2/     # Sesja 2: bugfix
├── claude-code-3/     # Sesja 3: refaktoring
├── claude-code-4/     # Sesja 4: dokumentacja
└── claude-code-5/     # Sesja 5: eksperymenty
```

### Jak zacząć?

Nie musisz od razu mieć 15 sesji. Zacznij od **2-3**:

```bash
# Terminal 1: główna praca
cd ~/projects/myapp
claude

# Terminal 2: zadanie w tle
cd ~/projects/myapp-checkout-2
claude
> & Zrefaktoruj system auth według nowych wzorców
```

### Dobre praktyki

1. **10-20% sesji jest porzucanych** - to normalne, nie każdy eksperyment się udaje
2. **Powiadomienia terminala** - dają znać gdy Claude skończy:
   - macOS: iTerm2 ma wbudowane notifications
   - Windows: Windows Terminal (wbudowany w Win 11) też wspiera powiadomienia - w Settings → Actions możesz skonfigurować "Send notification when command completes"
3. **Nazywaj sesje** - `/rename feature-auth` żebyś wiedział co gdzie

### Przykład dla nie-programistów: Content Manager

```bash
# Struktura katalogów dla content managera:
~/content/
├── projekt-klient-A/       # Sesja 1: kampania mailingowa
├── projekt-klient-B/       # Sesja 2: posty social media
└── projekt-wewnetrzny/     # Sesja 3: newsletter firmowy
```

W każdym katalogu trzymasz materiały źródłowe (briefy, poprzednie kampanie, brand guidelines). Claude w każdej sesji ma pełny kontekst danego projektu. Możesz równolegle:
- Sesja 1: pisać sekwencję 5 maili onboardingowych
- Sesja 2: generować warianty copy do testów A/B
- Sesja 3: analizować wyniki poprzedniego newslettera

Ta technika łączy to, czego nauczyłeś się w lekcjach 04 (terminal), 08 (zarządzanie sesjami) i 09 (WEB).

---

## 2. Plan → Execute - workflow mistrzów

Boris Cherny ma prosty workflow dla każdego PR:

### Krok 1: Plan Mode - iteruj aż plan jest dobry

```bash
# Przełącz na Plan Mode
<Shift+Tab>

> Zaplanuj implementację dwufaktorowej autentykacji (2FA)

# Claude tworzy szczegółowy plan...
# Ale NIE modyfikuje żadnych plików!

> Zmień krok 3 - użyj TOTP zamiast SMS
> Dodaj obsługę backup codes

# Iterujesz aż plan Ci pasuje
```

**Cytat Borisa:** *"A good plan is really important! If my goal is to write a Pull Request, I will use Plan mode, and go back and forth with Claude until I like its plan."*

### Krok 2: Auto-Accept Mode - one-shot implementacja

```bash
# Gdy plan jest gotowy - przełącz na Auto-Accept
<Shift+Tab><Shift+Tab>

> Wykonaj plan

# Claude implementuje wszystko automatycznie
# Bez pytania o każdą zmianę
```

### Krok 3: Weryfikacja i /rewind

```bash
# Sprawdź wynik
! git diff

# Jeśli coś nie tak:
> /rewind

# I wróć do Plan Mode
<Shift+Tab>
```

- **Plan Mode** eliminuje błędy koncepcyjne
- **Auto-Accept** przyspiesza implementację
- **`/rewind`** to siatka bezpieczeństwa

### Przykład dla nie-programistów: Raport analityczny

```bash
# Plan Mode
<Shift+Tab>

> Zaplanuj strukturę raportu kwartalnego sprzedaży.
> Mam dane w pliku sales_q4.csv i chcę pokazać trendy,
> top produkty, i rekomendacje dla zarządu.

# Claude proponuje:
# - Krok 1: Analiza danych i wyciągnięcie key metrics
# - Krok 2: Identyfikacja trendów YoY i MoM
# - Krok 3: Ranking produktów i kategorii
# - Krok 4: Executive summary z rekomendacjami

> Zmień krok 4 - dodaj sekcję o ryzykach i mitygacji
> Dodaj wizualizacje w formacie Mermaid

# Gdy plan gotowy - Auto-Accept
<Shift+Tab><Shift+Tab>

> Wykonaj plan
```

Ten sam workflow działa dla: strategii marketingowej, planu projektu, dokumentacji procesu HR, czy struktury prezentacji.

Ten workflow łączy lekcje 06 (tryby uprawnień) i 08 (`/rewind`, Checkpoint Pattern).

---

## 3. Głosowe dyktowanie - mów zamiast pisać

Mówienie jest 3-5x szybsze od pisania. 150 słów na minutę vs 40.

### Narzędzia

**SuperWhisper** (tylko macOS) - https://superwhisper.com/
- Przetwarza audio lokalnie
- Od $8/miesiąc

**Wispr Flow** (Mac, Windows, iOS) - https://wisprflow.ai/
- 97% dokładności
- Tryb szeptania do open space
- $15/miesiąc
- **Dla użytkowników Windows: to najlepsza opcja** - natywna aplikacja, działa systemowo

**VoiceMode MCP** - https://getvoicemode.com/
```bash
claude mcp add --scope user voicemode
```
- Działa lokalnie, bez subskrypcji
- Powinno działać na Windows (nie testowane) - wymaga Node.js

### Zaawansowany workflow

Niektórzy użytkownicy łączą narzędzia:

```
Mowa → Transcribe (Groq/Whisper) → Fix Grammar (Claude) → Format (Gemini)
```

Użytkownicy raportują **3-4 godziny oszczędności dziennie**.

### Kiedy głos ma sens?

- **Burza mózgów** - myślisz głośno, Claude implementuje
- **Code review** - "przejrzyj ten plik, znajdź problemy"
- **Przy kawie** - dyktuj prompt odchodząc od biurka

Andrej Karpathy nazwał to **"vibe coding"** - mówisz co chcesz, ręce zostają na kawie.

---

## 4. Subagenci - Claude deleguje pracę

Claude może delegować zadania do **równoległych subagentów**. To zapowiedź tego, co poznasz dokładniej w Module 2.

### Jak to działa?

Gdy poprosisz Claude o złożone zadanie, może uruchomić do **7 agentów równocześnie**:

```bash
> Znajdź wszystkie miejsca w kodzie gdzie obsługujemy błędy HTTP
> i sprawdź czy są spójne z naszym standardem

# Claude może uruchomić:
# - Agent 1: przeszukuje src/api/
# - Agent 2: przeszukuje src/services/
# - Agent 3: przeszukuje src/utils/
# - Agent 4: analizuje dokumentację standardu
```

### Kiedy Claude używa subagentów?

- **Eksploracja kodu** - Explore agent do szukania wzorców
- **Równoległe wyszukiwanie** - wiele katalogów naraz
- **Badanie dokumentacji** - analiza wielu plików

### Tip z community

W CLAUDE.md dodaj przypomnienie:

```markdown
## Agent Guidelines

Używaj subagentów (Task tool) gdy:
- Przeszukujesz wiele katalogów
- Analizujesz wiele plików równocześnie
- Zadanie można łatwo zrównoleglić

Domyślnie bądź proaktywny z delegowaniem.
```

Claude domyślnie jest ostrożny z subagentami - to przypomnienie zwiększa ich użycie.

### Koszt

Każdy subagent to ~20k tokenów overhead. Dla Max subscription to nie problem. Dla API - rozważ czy warto.

---

## 5. Extended Thinking - Ctrl+O

Claude "myśli" zanim odpowie. Możesz zobaczyć to myślenie.

### Ctrl+O - toggle verbose mode

```bash
# Naciśnij Ctrl+O w trakcie sesji
# Teraz widzisz "thinking" jako szary tekst

> Zoptymalizuj ten algorytm sortowania

# Claude pokazuje swoje rozumowanie:
# [thinking] Analizuję złożoność czasową...
# [thinking] Obecna implementacja to O(n²)...
# [thinking] Mogę użyć quicksort dla O(n log n)...
```

### Domyślny budżet myślenia

- **31,999 tokenów** - standardowy limit
- Myślenie jest teraz **automatyczne** - "ultrathink" jest deprecated

### Dla power userów

```bash
# Podwój budżet myślenia (Opus 4.5 / Sonnet 4)
MAX_THINKING_TOKENS=63999 claude
```

Więcej tokenów na myślenie = lepsze rozumowanie dla złożonych zadań.

### Kiedy używać verbose mode?

- **Debugging** - zobacz jak Claude analizuje problem
- **Nauka** - zrozum tok rozumowania
- **Weryfikacja** - sprawdź czy Claude rozumie kontekst

---

## 6. Slash commands zaawansowane

Boris używa własnych slash commands **dziesiątki razy dziennie**.

### Przykład: /commit-push-pr

Stwórz plik `.claude/commands/commit-push-pr.md`:

```markdown
Przejrzyj wszystkie zmiany w repozytorium.

1. Podziel zmiany na logiczne commity (max 3)
2. Napisz commit messages w formacie Conventional Commits
3. Stwórz branch z sensowną nazwą (feature/..., fix/..., chore/...)
4. Push do remote
5. Stwórz PR z opisem:
   - Summary (2-3 zdania)
   - Changes (bullet points)
   - Testing (jak przetestować)

Użyj git i gh CLI.
```

Teraz możesz użyć:

```bash
> /commit-push-pr
```

### Inne przydatne komendy

**`.claude/commands/review.md`**
```markdown
Przejrzyj zmiany w tym PR pod kątem:
1. Bugi i błędy logiczne
2. Security issues (SQL injection, XSS, etc.)
3. Performance (N+1 queries, memory leaks)
4. Zgodność z wzorcami projektu

Format: markdown z severity (HIGH/MEDIUM/LOW)
```

**`.claude/commands/test-coverage.md`**
```markdown
Sprawdź pokrycie testami dla zmienionych plików.
Wygeneruj brakujące testy jednostkowe.
Skup się na edge cases.
```

### Przykłady dla nie-programistów

**`.claude/commands/weekly-report.md`** (dla PM/managerów)
```markdown
Na podstawie plików w tym katalogu wygeneruj raport tygodniowy:

1. Podsumowanie wykonanych zadań (z commitów lub notatek)
2. Blockers i ryzyka
3. Plan na następny tydzień
4. Metryki (jeśli dostępne)

Format: markdown, max 1 strona A4.
```

**`.claude/commands/job-posting.md`** (dla HR)
```markdown
Przeczytaj opis stanowiska z pliku job-description.md.

Wygeneruj:
1. Ogłoszenie o pracę (LinkedIn, pracuj.pl)
2. Krótką wersję na social media (max 280 znaków)
3. Listę pytań rekrutacyjnych (5-7 pytań)
4. Kryteria oceny kandydatów

Ton: profesjonalny ale przyjazny.
```

**`.claude/commands/content-brief.md`** (dla marketerów)
```markdown
Przeanalizuj materiały w tym katalogu i stwórz content brief:

1. Cel treści i grupa docelowa
2. Key messages (3-5 punktów)
3. Ton i styl
4. Struktura (nagłówki, sekcje)
5. CTA i next steps
6. SEO keywords (jeśli dotyczy)

Uwzględnij brand guidelines z pliku brand.md (jeśli istnieje).
```

W lekcji 07 poznałeś Skills vs Slash Commands - teraz widzisz praktyczne zastosowanie.

---

## 7. Praktyczny przykład end-to-end

Połączmy wszystko w jeden workflow. Zadanie: **dodaj dark mode do aplikacji**.

### Krok 1: Plan Mode

```bash
# Przełącz na Plan Mode
<Shift+Tab>

> Zaplanuj implementację dark mode dla naszej aplikacji React
```

Claude tworzy plan:
- Krok 1: Theme context i provider
- Krok 2: CSS variables dla kolorów
- Krok 3: Toggle component
- Krok 4: Persistencja w localStorage
- Krok 5: Testy

### Krok 2: Iteracja planu

```bash
> Dodaj do planu: użyj Tailwind dark: variant
> Zmień krok 4: użyj prefers-color-scheme jako domyślny
```

### Krok 3: Implementacja

```bash
# Auto-Accept Mode
<Shift+Tab><Shift+Tab>

> Wykonaj plan
```

Claude implementuje wszystko automatycznie.

### Krok 4: Równoległa sesja na testy

```bash
# W drugim terminalu (lub WEB)
> & Napisz testy E2E dla dark mode - sprawdź toggle, persistencję, i system preference
```

### Krok 5: Weryfikacja i PR

```bash
# Sprawdź zmiany
! git diff

# Jeśli OK - użyj własnej komendy
> /commit-push-pr
```

### Czas realizacji

Od pomysłu do PR z testami - bez konieczności ręcznego pisania kodu.

---

## 8. Przykład end-to-end dla nie-programistów

Połączmy workflow w przykład dla **analityka/PM**: przygotowanie prezentacji kwartalnej.

### Krok 1: Plan Mode

```bash
<Shift+Tab>

> Zaplanuj prezentację wyników Q4 dla zarządu.
> Mam: sales_q4.csv, customer_feedback.xlsx, marketing_spend.csv
> Potrzebuję: 10-15 slajdów, executive summary, rekomendacje
```

Claude tworzy plan:
- Krok 1: Analiza danych sprzedażowych
- Krok 2: Agregacja feedbacku klientów
- Krok 3: ROI kampanii marketingowych
- Krok 4: Struktura prezentacji
- Krok 5: Executive summary

### Krok 2: Iteracja planu

```bash
> Dodaj porównanie YoY
> W rekomendacjach uwzględnij budżet na Q1
```

### Krok 3: Implementacja

```bash
<Shift+Tab><Shift+Tab>

> Wykonaj plan - wygeneruj prezentację w markdown
> i osobny plik z talking points dla każdego slajdu
```

### Krok 4: Równoległa sesja na wizualizacje

```bash
# W drugim terminalu
> & Wygeneruj wykresy w formacie Mermaid
> dla danych z sales_q4.csv - trend miesięczny i top 10 produktów
```

### Krok 5: Finalizacja

```bash
> /weekly-report   # jeśli masz taką komendę
# lub
> Wygeneruj podsumowanie w 3 bullet points dla maila do CEO
```

Ten sam workflow działa dla: kampanii marketingowej, onboardingu pracownika, dokumentacji procesu, czy briefu kreatywnego.

---

## Co dalej - Moduł 2

W **Module 2** poznasz wbudowane narzędzia Claude Code: Read, Write, Edit (jak Claude widzi i modyfikuje pliki), Bash, Grep, Glob (power user terminala), Task tool (subagenci w szczegółach) i Git integration.

---

## Podsumowanie

Eksperci nie używają jednej techniki - **łączą je w workflow**:

1. **Równoległe sesje** - 5+ sesji naraz, każda w osobnym checkout
2. **Plan → Execute** - Plan Mode → iteracja → Auto-Accept → /rewind jeśli źle
3. **Głosowe dyktowanie** - 3-4h oszczędności dziennie
4. **Subagenci** - Claude deleguje do 7 agentów równocześnie
5. **Ctrl+O** - podgląd myślenia Claude
6. **Własne slash commands** - automatyzacja powtarzalnych zadań

Claude działa jak **orkiestra agentów**, którą dyrygujesz.

---

## Uwaga dla użytkowników Windows

Większość technik z tej lekcji działa identycznie na Windows. Kilka różnic:

- **Terminal z tabami**: Zamiast iTerm2 użyj Windows Terminal (wbudowany w Win 11) - wspiera taby, profile, i powiadomienia
- **Głosowe dyktowanie**: Wispr Flow działa natywnie na Windows. VoiceMode MCP powinno działać (wymaga Node.js), ale nie było testowane
- **Skróty klawiszowe**: `Shift+Tab`, `Ctrl+O` działają tak samo
- **Powiadomienia**: Windows Terminal → Settings → Actions → możesz skonfigurować powiadomienia po zakończeniu komendy

> **Uwaga**: Nie mam dostępu do Windows, więc nie mogę zweryfikować wszystkich szczegółów. Jeśli znajdziesz różnice - daj znać, zaktualizuję lekcję.

---

## Słowniczek

**Checkout** - w kontekście Borisa: osobna kopia repozytorium na dysku (nie branch). Pozwala na izolowaną pracę bez konfliktów.

**One-shot** - wykonanie zadania w jednym podejściu, bez iteracji. Auto-Accept Mode umożliwia one-shot implementację.

**Subagent** - autonomiczny agent uruchamiany przez Claude do wykonania podzadania. Działa równolegle, ma własny kontekst.

**Extended Thinking** - proces rozumowania Claude przed wygenerowaniem odpowiedzi. Ctrl+O pozwala zobaczyć ten proces.

**TOTP (Time-based One-Time Password)** - metoda 2FA używająca kodów czasowych (jak Google Authenticator).

**Vibe coding** - termin Andreja Karpathy'ego na dyktowanie kodu głosem, gdzie "vibes" (nastrój, intuicja) kierują procesem.

---

## Pytania kontrolne

1. **Ile sesji równocześnie prowadzi Boris Cherny i dlaczego używa osobnych checkoutów zamiast branchy?**

2. **Jaki jest workflow Plan → Execute i kiedy używać którego trybu?**

3. **Jak włączyć podgląd myślenia Claude i kiedy to przydatne?**

---

## Zadania praktyczne

### Zadanie 1: Dwie równoległe sesje

1. Otwórz dwa terminale
2. W pierwszym: normalna praca
3. W drugim: wyślij zadanie do chmury (`& prefix`)
4. Monitoruj oba (`/tasks`)
5. Zapisz ile zadań udało Ci się wykonać równocześnie

### Zadanie 2: Plan → Execute workflow

1. Wybierz zadanie (np. "dodaj walidację formularza")
2. Przełącz na Plan Mode (`Shift+Tab`)
3. Poproś o plan, iteruj aż będziesz zadowolony
4. Przełącz na Auto-Accept (`Shift+Tab` x2)
5. Wykonaj plan
6. Sprawdź wynik, użyj `/rewind` jeśli trzeba

### Zadanie 3: Własna slash command

1. Stwórz `.claude/commands/` w swoim projekcie
2. Dodaj plik `quick-review.md` z instrukcją code review
3. Użyj `/quick-review` w następnej sesji
4. Dostosuj do swoich potrzeb

### Zadanie 4: Workflow dla nie-programistów

1. Wybierz zadanie ze swojej branży:
   - Marketer: brief kampanii
   - Analityk: struktura raportu
   - PM: plan projektu
   - HR: ogłoszenie o pracę
2. Użyj Plan Mode - poproś Claude o plan, iteruj 2-3 razy
3. Przełącz na Auto-Accept i wykonaj
4. Stwórz slash command dla tego zadania (żebyś mógł powtórzyć)

---

## Źródła

- [VentureBeat - Creator of Claude Code reveals workflow](https://venturebeat.com/technology/the-creator-of-claude-code-just-revealed-his-workflow-and-developers-are)
- [InfoQ - Inside Development Workflow](https://www.infoq.com/news/2026/01/claude-code-creator-workflow/)
- [ClaudeLog - Task Agent Tools](https://claudelog.com/mechanics/task-agent-tools/)
- [Wispr Flow + Claude](https://wisprflow.ai/use-cases/claude)
- [ClaudeLog - Toggle Thinking](https://claudelog.com/faqs/how-to-toggle-thinking-in-claude-code/)
- [Anthropic - Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)

---

**Gratulacje!** Ukończyłeś Moduł 1: Podstawy.

W Module 2 wejdziesz głębiej w wbudowane narzędzia Claude Code. Zobaczysz jak Claude naprawdę "widzi" Twoje pliki i jak wykorzystać to do automatyzacji.

Do zobaczenia!
