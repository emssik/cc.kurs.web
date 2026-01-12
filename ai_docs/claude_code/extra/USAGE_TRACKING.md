Last updated: 2026-01-12

# Tracking Wykorzystania Materiałów Extra w Lekcjach

**Data utworzenia:** 2025-12-29
**Ostatnia aktualizacja:** 2025-12-29

## Cel tego dokumentu

Ten plik śledzi, które fragmenty z materiałów `ai_docs/claude_code/extra/` zostały wykorzystane w poszczególnych lekcjach kursu. Zapobiega to duplikacji i pozwala łatwo zidentyfikować niewykorzystane materiały.

---

## 01_case_studies.md

### Wykorzystane fragmenty:

**LEKCJA 1: Zmiana Myślenia**
- **Fragment:** Novo Nordisk case study (30-67% wzrost produktywności)
- **Sekcja w lekcji:** Po "Zmiana myślenia: Claude Code to nie chatbot"
- **Status:** ❌ DO DODANIA

**LEKCJA 3: Uwierzytelnianie**
- **Fragment:** Budżetowanie dla małych firm (już zawarte w lekcji)
- **Sekcja w lekcji:** "Przykłady dla małych firm"
- **Status:** ✅ WYKORZYSTANE (częściowo)

**LEKCJA 10: Supermoce**
- **Fragment:** Puzzmo case study (70% kodu przez Claude Code)
- **Sekcja w lekcji:** Przykłady nietypowych zastosowań
- **Status:** ❌ DO DODANIA

### Niewykorzystane fragmenty:

- TELUS (100B tokens/month, enterprise scale) - potencjał dla ADVANCED module
- HumanLayer (Y Combinator, $11M seed) - potencjał dla INTERMEDIATE module
- Vulcan Technologies - potencjał dla ADVANCED module
- IG Group (70h oszczędzonych tygodniowo, ROI w 3 miesiące) - potencjał dla wszystkich poziomów
- Anthropic Internal metrics (80%+ adoption) - potencjał dla LEKCJA 1

---

## 02_hands_on_exercises.md

### Wykorzystane fragmenty:

**Brak** - żadne zewnętrzne ćwiczenia nie zostały jeszcze dodane do lekcji.

### Niewykorzystane fragmenty (PRIORITY HIGH):

- DeepLearning.AI course (3 projekty) - dodać jako "Dalsze materiały" w LEKCJA 5, 7, 9
- Every.to "Claude Code for Beginners" - dodać jako "Dalsze materiały" w LEKCJA 1
- Movie App tutorial (15 min) - dodać jako hands-on w LEKCJA 5
- Claude Code Camp - dodać jako "Zaawansowane" w LEKCJA 10
- GitHub kousen/claude-code-training - dodać jako repo reference w LEKCJA 10
- Coursera course - dodać jako "Kurs alternatywny" w LEKCJA 1
- 21 Learning Paths - wykorzystać jako struktura całego kursu (meta-level)

---

## 03_war_stories.md

### Wykorzystane fragmenty:

**LEKCJA 6: Podstawy Bezpieczeństwa**
- **Fragment:** Mem o AWS rachunku
- **Sekcja w lekcji:** Mem z Twittera
- **Status:** ✅ WYKORZYSTANE

**LEKCJA 8: Slash Commands**
- **Fragment:** Mem o kosztach AI
- **Sekcja w lekcji:** Mem z Twittera
- **Status:** ✅ WYKORZYSTANE

### Niewykorzystane fragmenty (PRIORITY CRITICAL):

#### CRITICAL ISSUES (dodać do LEKCJA 8 lub 9):
- **Context Compaction problem** - "Claude definitely dumber" po compaction
  - Gdzie dodać: LEKCJA 8 (Slash Commands), sekcja "/compact"
  - War story: Użytkownik stracił $100 w 2 dni walcząc z jednym problemem

- **Test Modification Anti-Pattern** - Claude zmienia testy zamiast naprawiać kod
  - Gdzie dodać: LEKCJA 6 (Bezpieczeństwo), nowa sekcja "Typowe pułapki"
  - War story: Testy przechodziły, ale kod był zepsuty

- **CLAUDE.md Being Ignored** - BUG od czerwca 2025
  - Gdzie dodać: LEKCJA 7 (CLAUDE.md), sekcja "Edge cases"
  - War story: Mandatory rules ignorowane przez Claude

- **"File Modified" Error** - najczęściej raportowany bug
  - Gdzie dodać: LEKCJA 5 (Referencje do plików), sekcja "Typowe błędy"
  - Workaround: Używaj absolute paths

#### Best Practices (dodać do wszystkich lekcji):
1. Use `/clear` often - LEKCJA 8
2. Update CLAUDE.md when mistakes occur - LEKCJA 7
3. Explicitly tell it NOT to write code yet (read first) - LEKCJA 9 (Plan Mode)
4. Work in small steps - LEKCJA 1, 4
5. Use Plan Mode first for complex bugs - LEKCJA 9
6. Stay involved and monitor - LEKCJA 6 (Bezpieczeństwo)
7. Context is critical - LEKCJA 5, 7
8. Cost awareness - LEKCJA 8
9. Learning curve exists - LEKCJA 1, 10

#### "Tumbleweed Effect" (dodać do LEKCJA 1 lub 4):
- Iteracyjne sugestie tworzą tangled code
- War story: "Each iteration adds more complexity"
- Solution: Plan Mode + small steps

---

## 04_comparisons.md

### Wykorzystane fragmenty:

**LEKCJA 1: Zmiana Myślenia**
- **Fragment:** Porównanie z Copilot i ChatGPT (ogólne)
- **Sekcja w lekcji:** "Zmiana myślenia"
- **Status:** ✅ WYKORZYSTANE (częściowo)

### Niewykorzystane fragmenty (PRIORITY MEDIUM):

#### Three-Way Comparison Matrix (dodać jako NOWA LEKCJA):
- Pełna tabela: Claude Code vs Cursor vs GitHub Copilot
- Gdzie: Nowa lekcja w module podstawy lub jako appendix
- Zawiera: Interface, Context Window, Best For, Autonomy, Speed Setup, Pricing, Maturity

#### Performance Benchmarks:
- SWE-bench: Claude Code 72.7%, Opus 4.5 77.2%
- Cursor performance: 2:26 vs Claude Code 24 minutes dla app build
- Gdzie dodać: LEKCJA 1 lub 10 (jako metryki)

#### Hybrid Workflows (BARDZO CENNE):
- Cursor dla "art" (creative coding)
- Claude Code dla "chore" (repetitive tasks, refactoring)
- GitHub Copilot dla daily autocomplete
- Gdzie dodać: LEKCJA 10 (Supermoce), nowa sekcja "Hybrid Workflows"

#### Developer Consensus (2025):
- Start: GitHub Copilot Pro+ ($39/month)
- Upgrade: Cursor ($20-40/month)
- Add: Claude Code ($20-200/month)
- Gdzie dodać: LEKCJA 3 (Uwierzytelnianie), sekcja rozszerzona o "Rekomendacje wyboru narzędzia"

---

## 05_workflows.md (NAJWIĘKSZY SKARB - 21.2 KB)

### Wykorzystane fragmenty:

**Brak** - żadne konkretne workflow'y nie zostały jeszcze systematycznie dodane.

### Niewykorzystane fragmenty (PRIORITY #1 - NAJWAŻNIEJSZE):

#### 1. Refactoring Legacy Code (4-fazy workflow)
**Gdzie dodać:** NOWA LEKCJA w module ADVANCED
**Zawartość:**
- Preparation → Planning → Execution → Review
- Rezultat: 50% redukcja czasu, 43% zmniejszenie cyclomatic complexity
- Konkretny case study z metrykami
**Status:** ❌ DO STWORZENIA JAKO NOWA LEKCJA

#### 2. Adding Tests (TDD Workflow)
**Gdzie dodać:** NOWA LEKCJA w module INTERMEDIATE
**Zawartość:**
- Define → Generate → Execute → Expand
- Rezultat: 2h vs 6h dla mid-sized module
- Praktyczny przykład krok-po-kroku
**Status:** ❌ DO STWORZENIA JAKO NOWA LEKCJA

#### 3. Code Analysis
**Gdzie dodać:** LEKCJA 9 (Plan Mode), rozszerzona sekcja
**Zawartość:**
- Plan Mode dla deep analysis
- Pattern identification
- Competitive analysis workflow
**Status:** ❌ DO DODANIA

#### 4. Finding Differences
**Gdzie dodać:** LEKCJA 5 (Referencje do plików), nowa sekcja
**Zawartość:**
- Automatic detection workflow
- Categorization
- Systematic resolution
**Status:** ❌ DO DODANIA

#### 5. Brainstorming & Ideation
**Gdzie dodać:** NOWA LEKCJA w module ADVANCED (dla non-coding use cases)
**Zawartość:**
- Product development workflow
- Creative workflows
- Structured ideation process
**Status:** ❌ DO STWORZENIA JAKO NOWA LEKCJA

#### 6. Migration Workflows
**Gdzie dodać:** NOWA LEKCJA w module ADVANCED
**Zawartość:**
- 4 fazy: Planning → Preparation → Execution → Safety
- Framework migrations, dependency updates, DB migrations
**Status:** ❌ DO STWORZENIA JAKO NOWA LEKCJA

#### 7. Documentation Generation
**Gdzie dodać:** LEKCJA 7 (CLAUDE.md) lub NOWA LEKCJA
**Zawartość:**
- Scanning → Generation → Enhancement
- CI/CD integration
**Status:** ❌ DO DODANIA/STWORZENIA

#### 8-10. Polish Workflows (Analiza Konkurencji, Wyszukiwanie Różnic, Burza Mózgów)
**Gdzie dodać:** Bezpośrednio jako polskie lekcje w odpowiednich modułach
**Status:** ❌ DO WYKORZYSTANIA (już w języku polskim!)

---

## Podsumowanie Statystyk

### Wykorzystanie materiałów:

| Materiał | Rozmiar | Wykorzystane | Niewykorzystane | % Wykorzystania |
|----------|---------|--------------|-----------------|-----------------|
| 01_case_studies.md | 10.7 KB | ~2 fragmenty | ~15 case studies | ~10% |
| 02_hands_on_exercises.md | 13.6 KB | 0 | 24 zasoby | 0% |
| 03_war_stories.md | 15.6 KB | 2 memy | ~12 war stories | ~15% |
| 04_comparisons.md | 13.7 KB | 1 fragment | Pełna matryca + hybrid workflows | ~10% |
| 05_workflows.md | 21.2 KB | 0 | 10 kompletnych workflow'ów | 0% |
| **RAZEM** | **75.8 KB** | **~5%** | **~95%** | **5%** |

### Akcje priorytetowe:

**PRIORITY 1 (Następne 24h):**
1. Dodać Critical War Stories do LEKCJA 6, 7, 8
2. Dodać Best Practices z 03_war_stories.md do wszystkich lekcji
3. Dodać Hybrid Workflows z 04_comparisons.md do LEKCJA 10

**PRIORITY 2 (Następny tydzień):**
4. Stworzyć 3-5 nowych lekcji z 05_workflows.md:
   - Refactoring Legacy Code
   - Adding Tests (TDD)
   - Migration Workflows
   - Brainstorming & Ideation
   - Documentation Generation

**PRIORITY 3 (Następne 2 tygodnie):**
5. Dodać zewnętrzne ćwiczenia z 02_hands_on_exercises.md jako "Dalsze materiały"
6. Dodać dodatkowe case studies z 01_case_studies.md
7. Stworzyć porównawczą lekcję z 04_comparisons.md

---

## Tracking zmian

### 2025-12-29 - Utworzenie dokumentu
- Zidentyfikowano ~95% niewykorzystanych materiałów
- Przygotowano plan 3-priorytetowy
- Oszacowano potencjał na 5-10 nowych lekcji

### [Data] - [Kto] - [Co zmieniono]
(Template dla przyszłych aktualizacji)

---

**UWAGA:** Ten dokument powinien być aktualizowany przy każdym dodaniu materiałów z extra/ do lekcji kursu.
