# Raport Rozbieżności - Moduł 01 (PODSTAWY)
**Porównanie materiałów kursowych z oficjalną dokumentacją Claude Code (grudzień 2025)**

---

## 📊 Statystyka Ogólna

| Metrika | Wartość |
|---------|---------|
| **Liczba analizowanych plików** | 10 |
| **Łączna liczba problemów** | 56 |
| **Problemy KRYTYCZNE** | 11 |
| **Problemy WYSOKIE** | 11 |
| **Problemy ŚREDNIE** | 23 |
| **Problemy NISKIE** | 11 |

---

## 🔴 PROBLEMY KRYTYCZNE (11)

### 1. **Lekcja 02 - Błędna komenda instalacji Homebrew** ⚠️
- **Plik:** `02-instalacja.md:70`
- **Problem:** Stara komenda Homebrew
- **Obecnie:** `brew tap anthropic-ai/claude && brew install claude`
- **Powinno być:** `brew install --cask claude-code`
- **Źródło:** setup.md, quickstart.md, overview.md
- **Wpływ:** Użytkownik na macOS nie będzie mógł zainstalować Claude Code

---

### 2. **Lekcja 02 - Błędna komenda diagnostyczna** ⚠️
- **Plik:** `02-instalacja.md:186`
- **Problem:** Komenda diagnostic z ukośnikiem
- **Obecnie:** `claude /doctor`
- **Powinno być:** `claude doctor`
- **Źródło:** setup.md:100, costs.md:107-110
- **Wpływ:** Komenda nie zadziała prawidłowo

---

### 3. **Lekcja 02 - Alias z nieistniejącą flagą** ⚠️
- **Plik:** `02-instalacja.md:234`
- **Problem:** Flaga `--compact` nie istnieje
- **Obecnie:** `alias cc='claude --compact'`
- **Powinno być:** Używaj `/compact` jako komendy REPL, nie flagi CLI
- **Źródło:** cli-reference.md, slash-commands.md:14
- **Wpływ:** Alias nie będzie działać

---

### 4. **Lekcja 02 - Alias dla doktor** ⚠️
- **Plik:** `02-instalacja.md:238`
- **Problem:** Alias używa `/doctor` zamiast `doctor`
- **Obecnie:** `alias cdoc='claude /doctor'`
- **Powinno być:** `alias cdoc='claude doctor'`
- **Źródło:** setup.md:100
- **Wpływ:** Alias nie będzie działać

---

### 5. **Lekcja 03 - Komenda /cost niedostępna dla Pro** ⚠️
- **Plik:** `03-uwierzytelnianie.md:196`
- **Problem:** Brak informacji że `/cost` nie działa dla Pro/Max
- **Obecnie:** "> /cost" bez ostrzeżenia
- **Powinno być:** Dodać notę że komenda nie jest dostępna dla Pro i Max
- **Źródło:** costs.md:13-14
- **Wpływ:** Użytkownicy Pro/Max będą zdezorientowani

---

### 6. **Lekcja 03 - Błędny format output /cost** ⚠️
- **Plik:** `03-uwierzytelnianie.md:197`
- **Problem:** Wymyślony format wyjścia komendy
- **Obecnie:** `# Session cost: $0.23 / Tokens: 45,234 input / 12,891 output / Model: claude-sonnet-4.5`
- **Powinno być:** `Total cost: $0.55` (wg dokumentacji costs.md:19-24)
- **Źródło:** costs.md:19-24
- **Wpływ:** Uczniowie czekają innego formatu

---

### 7. **Lekcja 03 - KRYTYCZNE: Błędy w analizie kosztów** 🚨
- **Plik:** `03-uwierzytelnianie.md:244-246`
- **Problem:** Całkowicie błędne wnioskowanie o kosztach
- **Obecnie:** "Sonnet: ~$16/miesiąc... API jest tańsze niż Pro ($20/mies)"
- **Powinno być:** costs.md mówi o średniej $100-200/miesiąc dla Sonnet (DLA RZECZYWISTEGO UŻYCIA)
- **Źródło:** costs.md:7
- **Wpływ:** 🚨 **KRYTYCZNE** - Uczniowie będą podejmować złe decyzje finansowe

---

### 8. **Lekcja 09 - Fundamentalna niezgodność tryby pracy** 🚨
- **Plik:** `09-tryby-pracy.md:1, 40, 74`
- **Problem:** Opisane tryby "Ask Mode", "Auto-Edit Mode", "Plan Mode" nie istnieją w dokumentacji
- **Obecnie:** 3 tryby pracy wymieniane (Ask, Auto-Edit, Plan)
- **Powinno być:** Permission modes (Normal, Plan, Auto-Accept) przełączane Shift+Tab
- **Źródło:** interactive-mode.md:23
- **Wpływ:** 🚨 **KRYTYCZNE** - Całe lekcje 9 i 10 są oparte na błędnych koncepcjach

---

### 9. **Lekcja 10 - Błędne tryby: Chat/Agent/Code Mode** 🚨
- **Plik:** `10-supermoce.md:9`
- **Problem:** Opisane tryby nie istnieją
- **Obecnie:** "Chat Mode", "Agent Mode", "Code Mode"
- **Powinno być:** Używaj permission modes (Normal, Plan, Auto-Accept)
- **Źródło:** interactive-mode.md
- **Wpływ:** 🚨 **KRYTYCZNE** - Cała lekcja opiera się na fałszywych informacjach

---

### 10. **Lekcja 08 & 09 - Nieaktualne komendy Slash** 🚨
- **Pliki:** `08-slash-commands.md:9`, `09-tryby-pracy.md`
- **Problem:** Wymienione komendy `/add`, `/history`, `/undo` nie istnieją
- **Komendy które istnieją:** `/add-dir`, `/resume`, `/rewind`
- **Źródło:** slash-commands.md
- **Wpływ:** 🚨 **KRYTYCZNE** - Użytkownicy będą pisać komendy które nie zadziałają

---

### 11. **Lekcja 03 - Błędy w odpowiedziach kontrolnych** ⚠️
- **Plik:** `03-uwierzytelnianie.md:440`
- **Problem:** Błędna odpowiedź na pytanie o koszty
- **Obecnie:** "~$16 miesięcznie - mniej niż Pro ($20)"
- **Powinno być:** Rzeczywisty koszt to ~$100-200/miesiąc (wg dokumentacji)
- **Źródło:** costs.md:5-7
- **Wpływ:** Uczniowie uczą się błędnych koncepcji

---

## 🟠 PROBLEMY WYSOKIE (11)

### Lekcja 02 - Instalacja
1. **Linia 234:** Alias z flagą `--compact` która nie istnieje
2. **Linia 238:** Alias używający `/doctor` zamiast `doctor`

### Lekcja 03 - Uwierzytelnianie
3. **Linia 104:** Brak informacji o logowaniu za pośrednictwem Claude.ai (Pro/Max plan)
4. **Linia 197:** Błędny format output `/cost`
5. **Linia 210:** Brak informacji o automatycznym tworzeniu workspace "Claude Code"
6. **Linia 244-245:** Błędy w analizie kosztów (nieaktualne kwoty)
7. **Linia 440:** Błędy w odpowiedzach kontrolnych (koszty)

### Lekcja 09 - Tryby Pracy
8. **Linia 12:** Komenda `/history` nie istnieje - użyj `/resume`
9. **Linia 14:** Komenda `/undo` nie istnieje - użyj `/rewind`

---

## 🟡 PROBLEMY ŚREDNIE (23)

### Lekcja 02 - Instalacja
| Linia | Problem | Obecne | Powinno być |
|-------|---------|--------|------------|
| 83 | Brakuje info o wersjach | `curl -fsSL https://claude.ai/install.sh \| bash` | Dodaj opcje: `bash -s latest`, `bash -s 1.0.58` |
| 399 | Błędny URL do docs | `docs.anthropic.com/claude/docs/getting-started` | `code.claude.com/docs/setup` |
| 401 | Błędny URL troubleshooting | `docs.anthropic.com/claude/docs/troubleshooting` | `code.claude.com/docs/troubleshooting` |

### Lekcja 04 - Opanuj Terminal
| Linia | Problem | Ważność |
|-------|---------|---------|
| 5 | Nieaktualna info o limitach Pro | ŚREDNIE |
| 17 | Konkretne liczby requestów mogą być zdezaktualizowane | ŚREDNIE |
| 171 | Komenda `/permissions` - uproszczenie | ŚREDNIE |
| 407 | URL z `/en/` - nieaktualna | ŚREDNIE |

### Lekcja 05 - Referencje do Plików
| Linia | Problem | Ważność |
|-------|---------|---------|
| 15 | Błędy w odniesieniach do poprzednich lekcji | ŚREDNIE |

### Lekcja 06 - Podstawy Bezpieczeństwa
| Linia | Problem | Obecne | Powinno być | Ważność |
|-------|---------|--------|------------|---------|
| 378 | Błędny URL security | `docs.claude.com/security` | `code.claude.com/docs/security` | ŚREDNIE |
| 379 | Błędny URL sandbox | `docs.claude.com/sandbox` | `code.claude.com/docs/sandboxing` | ŚREDNIE |
| 380 | Błędny URL uprawnień | `docs.claude.com/permissions` | `code.claude.com/docs/iam` | ŚREDNIE |

### Lekcja 07 - CLAUDE.md
| Linia | Problem | Powinno być | Ważność |
|-------|---------|------------|---------|
| 754 | Nieaktualne URL | `memory.md` zamiast `project-memory` | ŚREDNIE |
| 755 | Nieaktualne URL | `memory.md` zamiast `claudemd-guide` | ŚREDNIE |

### Lekcja 08 - Slash Commands
| Linia | Problem | Ważność |
|-------|---------|---------|
| 9 | Wymienione komendy są nieaktualne | ŚREDNIE |
| 99 | `/usage` tylko dla subscription | ŚREDNIE |
| 376 | Błędny URL do docs | `code.claude.com/docs/slash-commands` | ŚREDNIE |

### Lekcja 09 - Tryby Pracy
| Linia | Problem | Obecne | Powinno być | Ważność |
|-------|---------|--------|------------|---------|
| 1 | Zły tytuł lekcji | "Ask, Auto-Edit, Plan Mode" | "Permission modes" | ŚREDNIE |
| 9 | Komenda `/add` - nieaktualna | `/add` | `/add-dir` | ŚREDNIE |
| 22 | Pytania o nieistniejące tryby | Pytanie o "Chat Mode" | Pytanie o "Normal Mode" | ŚREDNIE |
| 451 | Błędny URL | `docs.anthropic.com/claude-code/modes` | `code.claude.com/docs/interactive-mode` | ŚREDNIE |
| 452 | Błędny URL | `docs.anthropic.com/claude-code/best-practices` | Brak takiego URL | ŚREDNIE |

### Lekcja 03 - Uwierzytelnianie
| Linia | Problem | Ważność |
|-------|---------|---------|
| 158 | Niepewny sposób przechowywania kluczy | ŚREDNIE |
| 241 | Nieaktualne ceny | ŚREDNIE |

---

## 🟢 PROBLEMY NISKIE (11)

### Lekcja 04
- Linia 212: Odniesienie do nieistniejącego pliku `~/.claude/templates.md`

### Lekcja 05
- Linia 26: Pytania kontrolne dotyczą niewłaściwej lekcji
- Linia 98: Brak info o autocomplete dla @syntax

### Lekcja 06
- Linia 26: Pytania kontrolne dotyczą niewłaściwej lekcji
- Linia 51: Złamany link do tweeta (placeholder ID)
- Linia 170: Komenda `/permissions` - niewyjaśniony format
- Linia 390: Błąd w podpisie autora

### Lekcja 02
- Linia 122: Brak kontekstu o wymaganym bilingingu
- Linia 128: Brak info o alternatywnych miejscach przechowywania
- Linia 256: Brak wzmianki o Fish shell

### Lekcja 03
- Linia 245: Nieaktualne ceny dla Opus

---

## 📋 REKOMENDACJE PRIORYTETOWE

### 🚨 PILNE (zmień natychmiast)

1. **Lekcja 02** - Popraw komendy instalacji i aliasy
   - [ ] Zmień `brew tap...` na `brew install --cask`
   - [ ] Zmień `/doctor` na `doctor`
   - [ ] Usuń flagę `--compact`

2. **Lekcja 03** - Popraw informacje o kosztach
   - [ ] Usuń błędną analizę kosztów (~$16 vs Pro)
   - [ ] Dodaj ostrzeżenie że `/cost` nie działa dla Pro
   - [ ] Zaktualizuj rzeczywiste koszty (~$100-200/miesiąc)

3. **Lekcje 09-10** - Przepisz całe rozdziały o trybach
   - [ ] Zmień "Ask/Auto-Edit/Plan Mode" na "Permission modes (Normal/Plan/Auto-Accept)"
   - [ ] Usuń wyjaśnienia o nieistniejących trybach
   - [ ] Zaktualizuj odpowiedzi kontrolne

4. **Lekcja 08-09** - Popraw słash komendy
   - [ ] Zmień `/add` → `/add-dir`
   - [ ] Zmień `/history` → `/resume`
   - [ ] Zmień `/undo` → `/rewind`

### ⚠️ WAŻNE (zmień w najbliższym update)
- Zaktualizuj wszystkie URL-e z `docs.anthropic.com` na `code.claude.com/docs`
- Popraw błędy w pytaniach kontrolnych

### 💡 OPCJONALNE (przyszłe poprawki)
- Dodaj informacje o Fish shell
- Dodaj brakujące konteksty
- Popraw sygnatury autorów

---

## 📌 PODSUMOWANIE

Materiały kursu mają **poważne niezgodności** z oficjalną dokumentacją Claude Code (grudzień 2025). Najważniejsze są:

1. **Błędy funkcyjne** - Komendy które nie zadziałają (`/add`, `/history`, `/undo`, `/doctor`)
2. **Błędy koncepcyjne** - Całe lekcje (9-10) oparty na nieistniejących trybach pracy
3. **Błędy finansowe** - Mylące informacje o kosztach mogą prowadzić do błędnych decyzji
4. **Błędy URL-ów** - Dokumentacja przeniosła się na nową domenę

**Rekomendacja:** Przeprowadzić szybki update wszystkich materiałów, szczególnie lekcji 02, 03, 08, 09, 10.

---

## 🔍 Źródła Dokumentacji Używane do Weryfikacji

- `setup.md` - Setup and authentication
- `quickstart.md` - Getting started
- `overview.md` - Claude Code overview
- `slash-commands.md` - Reference of slash commands
- `interactive-mode.md` - Interactive mode and keyboard shortcuts
- `costs.md` - Cost management
- `cli-reference.md` - CLI reference
- `security.md` - Security best practices
- `sandboxing.md` - Sandboxing documentation
- `iam.md` - Identity and Access Management
- `memory.md` - Memory management

---

**Data analizy:** 29 grudnia 2025 (grudzień 2025)
**Wersja Claude Code:** Najnowsza dostępna (na podstawie llms.txt)
**Analiza przeprowadzona przez:** Trzema równoległo pracującymi agentami

