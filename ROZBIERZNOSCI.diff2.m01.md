# Raport zgodności technicznej - Moduł 01 Podstawy

**Data weryfikacji:** 2025-12-29
**Zakres:** Sprawdzenie zgodności technicznej plików z `/cc.kurs.mailing/modules/modul-01-podstawy` z dokumentacją Claude Code
**Fokus:** Atrybuty wywołania, komendy, argumenty, modele, ceny, składnia

---

## Podsumowanie

| Plik | Status | Liczba rozbieżności | Krytyczne |
|------|--------|---------------------|-----------|
| 01-zmiana-myslenia.md | ✅ OK | 0 | 0 |
| 02-instalacja.md | ⚠️ WYMAGA POPRAWEK | 8 | 3 |
| 03-uwierzytelnianie.md | ⚠️ WYMAGA POPRAWEK | 11 | 4 |
| 04-opanuj-terminal.md | ⚠️ WYMAGA POPRAWEK | 12 | 3 |
| 05-referencje-do-plikow.md | ⚠️ DO WERYFIKACJI | 5 | 0 |
| 06-podstawy-bezpieczenstwa.md | ⚠️ WYMAGA POPRAWEK | 8 | 2 |
| 07-claude-md.md | ⚠️ NIEKOMPLETNOŚCI | 6 | 0 |
| 08-slash-commands.md | ⚠️ WYMAGA POPRAWEK | 5 | 2 |
| 09-tryby-pracy.md | ✅ OK | 1 | 0 |
| 10-supermoce.md | ✅ OK | 0 | 0 |

**Łącznie:** 56 rozbieżności, w tym 14 krytycznych

---

## 01-zmiana-myslenia.md ✅

**Status:** BRAK ROZBIEŻNOŚCI TECHNICZNYCH

Plik jest technicznie poprawny. Wszystkie informacje dotyczące:
- Opisania Claude Code jako autonomicznego agenta terminalowego
- Use case'ów
- Delegowania vs instruowania
- Ograniczeń narzędzia

są zgodne z dokumentacją.

---

## 02-instalacja.md ⚠️

### Rozbieżności krytyczne

#### 1. [Linia 8] Nieprawidłowa komenda Homebrew
- **Jak jest:** `brew install claude`
- **Jak powinno być:** `brew install --cask claude-code`
- **Źródło:** setup.md

#### 2. [Linia 178, 186] Błędne zalecenie użycia sudo
- **Jak jest:** "Użyj `sudo` przed komendą (Linux/Mac)"
- **Jak powinno być:** Oficjalna dokumentacja (setup.md:178) **ZALECA PRZECIWKO** używaniu `sudo npm install -g`
- **Poprawne rozwiązanie:** Native Installation lub konfiguracja prefixu npm (`npm config set prefix ~/.local`)

#### 3. [Linia 158-164] Brak wariantu dla Windows CMD
- **Jak jest:** Tylko PowerShell
- **Jak powinno być:** Dokumentacja zawiera wariant dla Windows CMD:
  ```batch
  curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
  ```

### Pozostałe rozbieżności

#### 4. [Linia 258] Błędna terminologia - "/compact"
- **Jak jest:** "Tryb kompaktowy to komenda REPL (`/compact`)"
- **Jak powinno być:** `/compact` to **slash command** (komenda interaktywna), nie "komenda REPL"

#### 5. [Linia 202] Komenda /doctor - brak pełnej informacji
- **Jak jest:** `claude doctor`
- **Jak powinno być:** Oba warianty są poprawne:
  - `claude doctor` - z linii komend
  - `/doctor` - wewnątrz sesji interaktywnej

#### 6. [Linia 309-317] Instalacja offline - brak weryfikacji
- **Status:** Komenda `npm pack @anthropic-ai/claude-code` nie jest oficjalnie udokumentowana dla scenariusza offline

#### 7. [Linia 74] Ścieżka instalacji na macOS
- **Status:** Dla Intel Macs: `/usr/local/bin/claude`, dla Apple Silicon: `/opt/homebrew/bin/claude`
- **Ocena:** Materiał jest adekwatny z użyciem "lub podobnie"

#### 8. [Linia 82-93] Parametr "latest"
- **Status:** Brakuje informacji, że `latest` instaluje najnowszą wersję (jeszcze nie wydaną do stabilnego kanału)

---

## 03-uwierzytelnianie.md ⚠️

### Rozbieżności krytyczne

#### 1. [Linia 418] Nieistniejąca flaga --non-interactive
- **Jak jest:** `claude --non-interactive`
- **Jak powinno być:** `-p` (print mode)
- **Poprawna składnia:** `echo "..." | claude -p "..."` lub `claude -p "..."`

#### 2. [Linia 400] Błędna nazwa modelu
- **Jak jest:** `"model":"claude-sonnet-4.5"`
- **Jak powinno być:** `claude-sonnet-4-5-20250929` lub inny aktualny identyfikator z data suffixem

#### 3. [Linia 412] Błąd składni komendy doctor
- **Jak jest:** `claude /doctor`
- **Jak powinno być:** `/doctor` (w sesji REPL) lub `claude doctor` (z CLI)

#### 4. [Linia 8] Komenda instalacyjna Homebrew
- **Jak jest:** `brew install claude`
- **Jak powinno być:** `brew install --cask claude-code`

### Pozostałe rozbieżności

#### 5. [Linia 179] Mieszanie komend /settings vs /status
- **Problem:** `/settings` opisane jako komenda do sprawdzenia emaila
- **Jak powinno być:** `/status` pokazuje informacje o koncie, `/settings` otwiera ustawienia

#### 6. [Linia 399] Stara wersja API
- **Jak jest:** `anthropic-version: 2023-06-01`
- **Status:** Ta wersja jest bardzo stara - wymaga aktualizacji

#### 7. [Linia 251] Ceny Haiku - wymaga weryfikacji
- **Jak jest:** `$0.25 / $1.25` (input/output za 1M tokenów)
- **Status:** Wymaga weryfikacji z aktualną stroną pricing

#### 8-11. Pozostałe drobne niezgodności w przykładach API

---

## 04-opanuj-terminal.md ⚠️

### Rozbieżności główne

#### 1. [Skróty - Esc] Niezupełna informacja
- **Jak jest:** "Esc - Zatrzymaj generowanie"
- **Jak powinno być:**
  - `Esc` (jedno naciśnięcie) = Cancel current input or generation
  - `Esc Esc` (dwa razy) = Rewind the code/conversation

#### 2. [Skróty - Ctrl+G] Nieudokumentowany skrót
- **Problem:** Kurs mówi "`Ctrl+G` - Edytuj w zewnętrznym edytorze"
- **Status:** Nie ma `Ctrl+G` w liście skrótów klawiszowych w dokumentacji

#### 3. [Multiline input] Niekompletne - brakuje metody \\ + Enter
- **Jak jest:** Opisuje konfigurację dla Shift+Enter
- **Jak powinno być:** Wymienić **4 sposoby**:
  1. `\` + `Enter` (działa wszędzie NATYCHMIAST bez konfiguracji)
  2. `Option+Enter` (domyślnie na macOS)
  3. `Shift+Enter` (po `/terminal-setup`)
  4. `Ctrl+J` (line feed)

### Pozostałe rozbieżności (9 pozycji)

Dotyczą głównie:
- Shift+Tab vs Alt+M (brak wzmianki o Alt+M jako alternatywie)
- Sonnet 4.5 - powinno się odnosić do "aliasu 'sonnet'" zamiast konkretnej wersji
- /statusline - można dodać argumenty (np. `/statusline show the model name in orange`)

**Poprawnie (bez zmian):**
- ✓ Katalogi komend (`.claude/commands/`, `~/.claude/commands/`)
- ✓ Zmienne EDITOR/VISUAL
- ✓ Koszty ($100-200)
- ✓ Dostępność `/cost` tylko dla API
- ✓ SSH/Tmux instrukcje

---

## 05-referencje-do-plikow.md ⚠️

### Rozbieżności wymagające weryfikacji

#### 3. [Linia 57-59] Wielokrotne zakresy
- **Problem:** `@utils.js#L10-20 z @utils.js#L100-120` - składnia nie jest potwierdzona w dokumentacji

#### 4. [Linia 180-184] Specyficzne strony w PDF
- **Problem:** `@manual.pdf strona 45` - dokumentacja nie wymienia tej możliwości

#### 5. [Linia 5] Shift+Tab - niekompletna informacja
- **Status:** Brakuje wzmianki o Alt+M jako alternatywie i kolejności cyklicznego przełączania trybów

---

## 06-podstawy-bezpieczenstwa.md ⚠️

### Rozbieżności krytyczne

#### 1. [Linia 50-51] Zachowanie opcji "always allow" (a)
- **Jak jest:** "a - Always (zawsze dla tego typu operacji w tym projekcie)"
- **Jak powinno być:**
  - Dla **Edit/Write**: "Until session end" (do końca sesji, NIE na stałe!)
  - Dla **Bash Commands**: "Permanently per project directory and command" (trwały, ale tylko dla KONKRETNEJ komendy)

#### 2. [Linia 119-121] Błędne informacje o dostępie do plików poza projektem
- **Jak jest:** "Dostęp tylko do katalogu projektu - nie może czytać plików poza projektem"
- **Jak powinno być:** Tylko WRITE jest ograniczony. READ poza katalogiem projektu jest dozwolony (przydatne dla system libraries)
- **Źródło:** security.md:24

### Pozostałe rozbieżności (6 pozycji)

#### 3. [Linia 42, 92-96] Opcje y/n/s/a
- **Status:** Dokumentacja nie precyzuje tego interfejsu w tych terminach
- **Dokumentacja mówi:** "Users control whether to approve actions once or allow them automatically"

#### 4. Brak wspomnienia o trybie sandbox
- **Status:** Sandboxing.md:14-17 opisuje sandbox jako mechanizm zmniejszający "prompt fatigue"
- **Zalecenie:** Dodać wzmiankę o `/sandbox` - krótką, o sandbox jest później całą duza lekcja

#### 5. Brak wspomnienia o "acceptEdits" mode
- **Status:** IAM.md:74 wspomina o trybie "acceptEdits" jako alternatywnym mechanizmie

#### 6. Brak informacji o Plan Mode
- **Status:** IAM.md:75 definiuje "plan" mode: "Claude can analyze but not modify files"

#### 7. Brak informacji o rules precedence
- **Status:** IAM.md:57-59: Ask > Allow, Deny > wszystkie

#### 8. Komenda /permissions
- **Status:** ✓ POPRAWNIE - `/permissions` istnieje w slash-commands.md:32

---

## 07-claude-md.md ⚠️

### Rozbieżności (głównie niekompletności)

#### 1. [Linia 73-77] Nieprecyzyjna hierarchia plików CLAUDE.md
- **Jak jest:** "Enterprise policy → Project memory → Project rules → User memory → Project local"
- **Jak powinno być:** Dokumentacja precyzuje, że zarówno `./CLAUDE.md` i `./.claude/CLAUDE.md` są równoważne
- **Status:** Struktura hierarchii jest poprawna, ale brakuje szczegółów

#### 2. [Linia 104-129] Brak informacji o limicie głębokości importów
- **Status:** Dokumentacja memory.md wspomina o limicie max 5 hop'ów dla importów
- **Zalecenie:** Dodać informację o tym ograniczeniu

#### 3. [Linia 99-102] Komenda /init - brak wyjaśnienia
- **Status:** `/init` generuje szkielet CLAUDE.md automatycznie
- **Zalecenie:** Dodać wyjaśnienie działania `/init`

#### 4. [Linia 493-495] Błędna struktura YAML frontmatter
- **Jak jest:**
  ```yaml
  ---
  paths:
    - "src/**/*.test.ts"
    - "tests/**/*"
  ---
  ```
- **Jak powinno być (wg memory.md):**
  ```yaml
  ---
  paths: src/api/**/*.ts
  ---
  ```
  (lub `paths: {src,lib}/**/*.ts, tests/**/*.test.ts` dla wielu wzorców)

#### 5. [Linia 537-548] Brak wzmianki o .gitignore dla CLAUDE.local.md
- **Status:** Dokumentacja memory.md:22 mówi: "CLAUDE.local.md files are automatically added to .gitignore"

#### 6. Skills vs slash commands - brak rozróżnienia
- **Problem:** Lekcja nie wyjaśnia różnicy
- **Jak powinno być:** Skills używają `.claude/skills/` z `SKILL.md`, slash commands są w `.claude/commands/`
- **Źródło:** slash-commands.md:410-501

---

## 08-slash-commands.md ⚠️

### Rozbieżności krytyczne

#### 1. [Linia 99] Nieprawidłowa nazwa modelu
- **Jak jest:** `Model: claude-sonnet-4.5`
- **Jak powinno być:** `claude-sonnet-4-5-20250929` lub inny ID z data suffixem
- **Źródło:** monitoring-usage.md:287, 297, 367

#### 2. [Linia 268] Błędna komenda /permissions reset
- **Jak jest:** `/permissions reset  # Nuclear option`
- **Jak powinno być:** `/permissions` (bez `reset` - to nie jest oficjalna opcja)
- **Źródło:** slash-commands.md:32

### Pozostałe rozbieżności

#### 3. [Linia 104] Nieprecyzyjne wyjaśnienie /usage
- **Jak jest:** "Komenda `/usage` działa tylko dla planów subskrypcyjnych (API)"
- **Jak powinno być:** `/usage` jest dla użytkowników z API subscription (Console/API accounts)
- **Źródło:** slash-commands.md:48, costs.md:14

#### 4. [Linia 202] Błędny link do dokumentacji modeli
- **Jak jest:** `https://docs.claude.com/en/docs/about-claude/models/overview`
- **Status:** Wymaga weryfikacji - dokumentacja Claude Code używa `https://docs.claude.com/`

#### 5. [Linia 24] Brak /settings w TLDR
- **Problem:** Komenda `/settings` jest wymieniona w tabeli (linia 148), ale powinna być w TLDR
- **Zalecenie:** Dodać `/settings` lub `/config` do TLDR

---

## 09-tryby-pracy.md ✅

### Rozbieżność (nieistotna)

#### 1. [Linia 40, 72, 383] Alt+M - warunkowo dostępne
- **Status:** Materiał poprawnie stwierdza "Shift+Tab lub Alt+M"
- **Dokumentacja:** `Shift+Tab` or `Alt+M` (some configurations)
- **Ocena:** WARUNKOWO POPRAWNE - Alt+M działa tylko w niektórych konfiguracjach

**Wszystkie pozostałe elementy techniczne są POPRAWNE:**
- ✓ Przełączanie trybów (Shift+Tab)
- ✓ Trzy tryby uprawnień
- ✓ Skrót Esc+Esc (rewind)
- ✓ Komendy: /rewind, /clear, /add-dir, /help, /model, /resume
- ✓ Prompty (yes/no/show diff)
- ✓ Checkpoint automatyczne

---

## 10-supermoce.md ✅

**Status:** BRAK ROZBIEŻNOŚCI TECHNICZNYCH

Wszystkie informacje techniczne są zgodne z dokumentacją:
- ✓ Nazwy trybów uprawnień (Normal Mode, Plan Mode, Auto-Accept Mode)
- ✓ Skróty klawiszowe (Shift+Tab, Alt+M)
- ✓ Opisy trybów uprawnień
- ✓ Narzędzia (Voice, Visual, PDF)
- ✓ Git workflow, testy, dokumentacja
- ✓ Nazwy komend i argumentów
- ✓ Nazewnictwo modeli

---

## Rekomendacje priorytetowe

### Krytyczne do poprawy (blokują użycie):

1. **02-instalacja.md:**
   - Popraw komendę Homebrew: `brew install --cask claude-code`
   - Usuń zalecenie użycia `sudo npm install -g`
   - Dodaj wariant Windows CMD

2. **03-uwierzytelnianie.md:**
   - Usuń flagę `--non-interactive` (nie istnieje)
   - Popraw nazwę modelu: `claude-sonnet-4-5-20250929`
   - Popraw komendę: `/doctor` lub `claude doctor` (nie `claude /doctor`)
   - Popraw komendę Homebrew

3. **04-opanuj-terminal.md:**
   - Dodaj informację o `\` + `Enter` jako najszybszej metodzie multiline
   - Usuń lub zweryfikuj `Ctrl+G` (nieudokumentowany)
   - Wyjaśnij różnicę między `Esc` a `Esc Esc`

4. **06-podstawy-bezpieczenstwa.md:**
   - Popraw opis opcji "a" (always) - różne dla Edit vs Bash
   - Popraw informację o dostępie READ poza projektem (dozwolony)

5. **08-slash-commands.md:**
   - Popraw nazwę modelu: `claude-sonnet-4-5-20250929`
   - Usuń `/permissions reset` (nie istnieje)

### Ważne do weryfikacji:

1. **05-referencje-do-plikow.md:**
   - Zweryfikuj czy składnia `@plik#L10-20` rzeczywiście działa
   - Zweryfikuj autouzupełnianie Tab
   - Zweryfikuj `@pdf.pdf strona 45`

2. **07-claude-md.md:**
   - Popraw strukturę YAML frontmatter dla path-specific rules
   - Dodaj informację o limicie 5 hop'ów dla importów
   - Dodaj rozróżnienie Skills vs slash commands

### Niekrytyczne (poprawiają jakość):

- Aktualizacja wersji API w przykładach
- Weryfikacja cen modeli Haiku
- Dodanie informacji o sandboxing
- Dodanie informacji o Plan Mode i acceptEdits mode

---

## Metodologia weryfikacji

Weryfikacja została przeprowadzona przez 10 równoległych agentów claude-code-guide, każdy analizujący jeden plik z modułu 01. Agenty porównały zawartość z oficjalną dokumentacją Claude Code z katalogu `/ai_docs/claude_code/`, skupiając się wyłącznie na aspektach technicznych:

- Nazwy komend i argumentów
- Składnia wywołań
- Modele i ich identyfikatory
- Ceny i koszty
- Zachowanie systemowe
- Atrybuty konfiguracyjne

Weryfikacja NIE obejmowała:
- Opisów słownych czym jest Claude Code
- Braków tematycznych (mogą być w dalszych modułach)
- Stylu pisania i formatowania
- Kompletności coverage'u tematów
