---
lesson: "03.04"
title: "Integracja — skille spotykają MCP i feedback loops"
description: "Jak połączyć skille z MCP, stworzyć pętle zwrotne i zbudować wzorce produkcyjne"
module: "03-skille"
---

# Integracja — skille spotykają MCP i feedback loops

Poniedziałek rano. Karina ma kawę, otwarty terminal i frustrację.

-- Mój skill recenzuje kod. Działa. Ale kiedy znajduje problem, ja muszę ręcznie wejść na GitHuba i założyć issue. Potem wracam do terminala i robię kolejne review. Znowu issue. Znowu GitHub. To jest praca robota, nie moja.

Olek kiwa głową znad swojego ekranu.

-- U mnie to samo. Skill buduje prezentację, ale dane sprzedażowe muszę ręcznie wkleić z raportu. A potem i tak sam sprawdzam, czy slajdy mają sens. Skill nie potrafi sam siebie skontrolować.

Paweł odkłada kubek.

-- Bo skill bez połączeń zewnętrznych to mózg bez rąk. A skill bez pętli zwrotnej to mózg, który nigdy nie sprawdza swoich odpowiedzi. Dziś naprawimy oba problemy.

> **Moduł:** Skille (Agent Skills)
> **Poziom:** Średniozaawansowany (znasz podstawy skilli z lekcji 01-03)
> **Czas:** 30-40 minut

## Co wyniesiesz z tej lekcji

- Rozumiesz relację skill-MCP: dlaczego jedno bez drugiego nie wystarczy.
- Wiesz, czym jest `allowed-tools` i jak kontroluje uprawnienia skilla.
- Podłączasz skill do zewnętrznych serwisów (GitHub, dane z plików) przez MCP i shell injection.
- Budujesz pętlę zwrotną (feedback loop): generuj, waliduj, popraw.
- Stosujesz checklist pattern do wymuszania systematyczności.

---

## Stan gry: co mamy po lekcji 03

Zanim ruszymy dalej, przypomnijmy stan obu projektów.

**Projekt Kariny (code-review):**

```
.claude/skills/code-review/
├── SKILL.md
├── references/
│   ├── typescript-conventions.md
│   ├── nextjs-patterns.md
│   └── security-checklist.md
└── scripts/
    └── run-lint.sh
```

Skill działa w izolowanym subagencie (`context: fork`), przyjmuje ścieżkę jako argument (`$ARGUMENTS`), po edycji automatycznie lintuje (hook `PostToolUse`). Ale: nie ma połączenia z GitHubem, nie tworzy raportów jako issue, nie weryfikuje sam siebie.

**Projekt Olka (create-presentation):**

```
.claude/skills/create-presentation/
├── SKILL.md
├── references/
│   ├── brand-guidelines.md
│   ├── slide-templates.md
│   └── storytelling-framework.md
└── scripts/
    └── validate-structure.sh
```

Skill tworzy prezentacje zgodne z brand guidelines, obsługuje zmienne (`$0` temat, `$1` audience, `$2` format) i ma hook walidacji. Ale: nie pobiera danych z zewnątrz, nie sprawdza spójności narracji, wynik nie jest walidowany końcowo.

Oba skille są kompetentne, ale ślepe i głuchonieme. Czas to zmienić.

---

## 1. Złota zasada: MCP to ręce, skill to mózg

Zanim dotkniemy kodu, ustalmy jedną ważną rzecz.

**MCP** (Model Context Protocol) daje Claude'owi **połączenie ze światem zewnętrznym**. Serwer MCP to most do konkretnego serwisu: GitHub, Slack, baza danych, Google Sheets, Jira. Jeśli nie pamiętasz szczegółów, wróć do lekcji o MCP z modułu 02.

**Skill** daje Claude'owi **wiedzę** -- kiedy użyć tych połączeń, w jakiej kolejności, według jakich standardów.

Wyobraź to sobie tak:

- **MCP** to garnki, noże i palniki w kuchni. Dają Ci możliwości.
- **Skill** to przepis kulinarny. Mówi Ci, co robić z tymi możliwościami.

Sam serwer GitHub MCP pozwala Claude'owi tworzyć issue, czytać PR-y, komentować kod. Ale nie wie, *kiedy* tworzyć issue, *co* w nim napisać, *jakie* etykiety nadać. To jest właśnie wiedza skilla.

I odwrotnie: skill może mieć najdoskonalsze instrukcje na świecie, ale jeśli Claude nie ma dostępu do serwera MCP, to te instrukcje są jak przepis na risotto bez kuchenki.

Stąd zasada:

> **MCP daje możliwości. Skill mówi jak ich używać. Jedno bez drugiego to połowa rozwiązania.**

W poprzednich lekcjach kursu poznałeś serwery MCP i ich instalację. Dziś uczysz się drugiej strony: jak SKILL.md mówi Claude'owi KIEDY i JAK używać narzędzi MCP.

---

## 2. allowed-tools -- kontrola uprawnień skilla

Zanim skill zacznie sięgać po narzędzia MCP, musisz mu na to pozwolić. Domyślnie, kiedy skill jest aktywny, Claude może Cię pytać o każde użycie narzędzia. Przy złożonych skillach to oznacza dziesiątki pytań "Czy mogę?".

Pole `allowed-tools` we frontmatterze rozwiązuje ten problem. To lista narzędzi, które Claude może używać **bez pytania o zgodę**, gdy dany skill jest aktywny.

**Podstawowa składnia:**

```yaml
---
allowed-tools: Read, Grep, Glob, Bash(npm run lint*)
---
```

Rozłóżmy to na części:

- `Read` -- Claude może czytać pliki bez pytania.
- `Grep` -- Claude może przeszukiwać treść plików.
- `Glob` -- Claude może szukać plików po wzorcu.
- `Bash(npm run lint*)` -- Claude może uruchamiać komendy zaczynające się od `npm run lint`. Gwiazdka (`*`) to wildcard -- dopasowuje dowolny ciąg znaków.

**Więcej przykładów z wildcardami:**

- `Bash(git diff*)` -- pozwala na `git diff`, `git diff --cached`, `git diff HEAD~1`, itd.
- `Bash(npm test*)` -- pozwala na `npm test`, `npm test -- --watch`, itd.
- `Bash(python scripts/*)` -- pozwala na uruchamianie dowolnych skryptów z folderu `scripts/`.

**Po co to jest:**

1. **Płynność pracy.** Skill nie zawiesza się na pytaniach "Czy mogę użyć Read?".
2. **Bezpieczeństwo.** Dajesz dokładnie tyle uprawnień, ile potrzeba. Skill do review kodu nie musi mieć prawa do `rm -rf`.
3. **Kontrola zakresu.** Wildcardy pozwalają precyzyjnie określić, jakie komendy są dozwolone.

Ważne: `allowed-tools` działa **tylko gdy skill jest aktywny**. Nie zmienia uprawnień Claude'a globalnie. Kiedy skill kończy pracę, uprawnienia wracają do normy.

---

## 3. Projekt Kariny: code-review spotyka GitHub MCP

Czas na konkrety. Karina chce, żeby jej skill po znalezieniu poważnego problemu w kodzie automatycznie zakładał issue na GitHubie.

### Warunek wstępny

Karina ma skonfigurowany serwer GitHub MCP w projekcie (z lekcji o MCP w module 02). Serwer udostępnia narzędzia takie jak `mcp__github__issue_write`, `mcp__github__create_pull_request` i inne.

### Zaktualizowany SKILL.md

Karina otwiera swój `SKILL.md` i robi trzy zmiany: dodaje `allowed-tools`, nową sekcję o integracji z GitHubem, i usuwa `disable-model-invocation: true`. Dlaczego? Bo teraz chce, żeby Claude SAM mógł uruchomić review przy odpowiednim kontekście (np. gdy ktoś powie "sprawdź kod przed commitem"). Integracja z GitHubem jest bezpieczna -- tworzenie issue to operacja odwracalna.

```yaml
---
name: code-review
description: "TypeScript/Next.js code quality reviewer. Use when reviewing code, before commits, or for code quality checks. Can create GitHub issues for findings."
argument-hint: "[file-or-directory-path]"
context: fork
agent: general-purpose
allowed-tools: Read, Grep, Glob, Bash(npm run lint*), Bash(git diff*)
hooks:
  PostToolUse:
    - matcher: "Edit|Write"
      hooks:
        - type: command
          command: "./scripts/run-lint.sh"
---

# Code Review Skill

You are a TypeScript/Next.js code reviewer. Review the code at path
provided in $ARGUMENTS.

## Review steps

1. Read the target files
2. Check against references/typescript-conventions.md
3. Check against references/nextjs-patterns.md
4. Check against references/security-checklist.md
5. Run lint and report results

## Integration with GitHub

If a GitHub MCP server is available:
1. After completing review, check if there are critical findings
2. For each CRITICAL issue, create a GitHub issue using the GitHub MCP tools
3. Label issues with "code-review" and severity level
4. Reference the file path and line number in the issue body

If no GitHub MCP server is available, skip this step and output
findings to the console only.

## Shell context

Current branch: !`git branch --show-current`
Recent changes: !`git diff --cached --stat`

## Output format

Provide a structured report:
- Summary (1-2 sentences)
- Critical issues (if any)
- Warnings
- Suggestions
- GitHub issues created (if applicable)
```

### Co się tu zmieniło

Porównaj z wersją z lekcji 03:

**Nowe we frontmatterze:**

- `allowed-tools` -- Claude może czytać pliki, przeszukiwać kod i uruchamiać lint bez pytania o pozwolenie. To sprawia, że review płynie bez przestojów.

**Nowe w instrukcjach:**

- Sekcja "Integration with GitHub" -- Claude wie, że *jeśli* serwer MCP jest dostępny, ma zakładać issue dla krytycznych problemów. Zwróć uwagę na "If no GitHub MCP server is available" -- skill działa również bez MCP, tylko robi mniej.
- Sekcja "Shell context" z dynamicznym kontekstem -- ``!`git branch --show-current` `` i ``!`git diff --cached --stat` `` są wykonywane *zanim* Claude przeczyta instrukcje. Dzięki temu skill od razu wie, na jakiej gałęzi pracujesz i jakie pliki się zmieniły.

### Jak to działa w praktyce

Karina wpisuje:

```
/code-review src/auth/
```

Claude:
1. Dostaje dynamiczny kontekst (gałąź, zmienione pliki).
2. Czyta pliki w `src/auth/`.
3. Porównuje z konwencjami z `references/`.
4. Odpala lint przez hook.
5. Znajduje krytyczny problem: brak walidacji tokena JWT.
6. Tworzy issue na GitHubie przez MCP z etykietami `code-review` i `critical`.
7. Zwraca raport z linkiem do założonego issue.

Karina nie musi opuszczać terminala. Nie musi kopiować tekstu. Nie musi szukać odpowiedniego repozytorium na GitHubie.

---

## 4. Feedback loops -- pętle zwrotne

To jest wzorzec, który zmienia skilla z "jednorazowego strzału" w "inteligentny proces".

### Problem

Wyobraź sobie tatuażystę, który rysuje wzór, ale nigdy na niego nie patrzy. Rysuje dalej, bo "wie co robi". Tak właśnie działa skill bez pętli zwrotnej: generuje wynik i kończy. Nie sprawdza, czy wynik ma sens.

### Rozwiązanie: cykl generuj-waliduj-popraw

Pętla zwrotna to pięć kroków:

1. **Generuj** -- Claude tworzy wynik (raport, kod, prezentację).
2. **Waliduj** -- Skrypt z `scripts/` sprawdza wynik (testy, lint, struktura).
3. **Analizuj** -- Claude czyta wynik walidacji.
4. **Popraw** -- Claude naprawia znalezione problemy.
5. **Powtórz** -- Aż walidacja przejdzie (z limitem iteracji).

Kluczowa kwestia: **dlaczego skrypt, a nie prompt do walidacji?**

Determinizm. Skrypt `validate.sh` zawsze sprawdzi dokładnie to samo: czy jest 10 slajdów, czy nie ma "Lorem ipsum", czy testy przechodzą. Za każdym razem. Bez wyjątku.

Prompt może "przymknąć oko". Model może uznać, że "w sumie 4 slajdy wystarczą" albo "ten błąd nie jest taki ważny". Prompt jest niedeterministyczny -- to jego natura. Dlatego walidację robimy skryptem, a naprawę promptem.

> **Skrypt waliduje (deterministycznie). Claude naprawia (kreatywnie). Rozdziel te role.**

### Wzorzec w SKILL.md

Oto jak zapisujesz pętlę zwrotną w instrukcjach skilla:

```markdown
## Feedback loop

After generating output:
1. Run `scripts/validate.sh` on the result
2. If validation fails, read the error output carefully
3. Fix the identified issues
4. Run validation again
5. Maximum 3 iterations. If still failing after 3 tries,
   report remaining issues to the user.
```

Zwróć uwagę na limit iteracji. Bez niego Claude może wpaść w nieskończoną pętlę poprawek. Trzy próby to rozsądny kompromis: wystarczająco dużo, żeby naprawić większość problemów; wystarczająco mało, żeby nie spalić budżetu tokenów.

---

## 5. Projekt Kariny: feedback loop w code-review

Karina chce, żeby skill po review automatycznie sprawdził, czy testy przechodzą, a jeśli coś zepsuł podczas naprawy -- naprawił jeszcze raz.

### Nowy skrypt: scripts/run-tests.sh

```bash
#!/usr/bin/env bash
set -euo pipefail

# Run project tests and return results
# Exit 0 = all pass, Exit 1 = failures found

PROJECT_DIR="$(git rev-parse --show-toplevel 2>/dev/null || echo ".")"
cd "$PROJECT_DIR"

echo "=== Running TypeScript compiler check ==="
npx tsc --noEmit 2>&1 || true

echo ""
echo "=== Running tests ==="
npm test -- --passWithNoTests 2>&1

exit_code=$?
if [ $exit_code -eq 0 ]; then
  echo ""
  echo "ALL TESTS PASSED"
else
  echo ""
  echo "SOME TESTS FAILED (see above)"
fi
exit $exit_code
```

Po stworzeniu pliku:

```bash
chmod +x .claude/skills/code-review/scripts/run-tests.sh
```

### Zaktualizowane instrukcje w SKILL.md

Karina dodaje nową sekcję do części markdown (poniżej frontmattera):

```markdown
## Review feedback loop

1. Run `scripts/run-lint.sh $ARGUMENTS` to check style issues
2. Run `scripts/run-tests.sh` to check if tests pass
3. If issues found: suggest fixes with specific line numbers
4. If you made fixes, re-run both validations (max 3 iterations)
5. Generate final report with all findings and fixes applied
```

### Jak to wygląda w akcji

Karina: `/code-review src/auth/middleware.ts`

**Iteracja 1:**
- Claude czyta plik, porównuje z konwencjami.
- Lint: 2 ostrzeżenia (brak typów).
- Testy: 1 test failuje (brakujący mock).
- Claude poprawia typy i dodaje mock.

**Iteracja 2:**
- Lint: czysto.
- Testy: wszystkie przechodzą.
- Claude generuje raport końcowy.
- Krytyczny problem (brak walidacji JWT) leci jako issue na GitHuba.

Dwie iteracje, zero ręcznej interwencji.

---

## 6. Projekt Olka: dane zewnętrzne i feedback loop w create-presentation

Olek ma inny problem. Jego skill tworzy prezentacje, ale operuje na pustym kontekście -- nie wie, jakie są aktualne dane sprzedażowe. A po stworzeniu prezentacji nikt nie sprawdza, czy trzyma się kupy.

Podobnie jak Karina, Olek również usuwa `disable-model-invocation: true`. Tworzenie prezentacji to bezpieczna operacja i chce, żeby Claude sam proponował użycie skilla, gdy ktoś poprosi o "przygotowanie prezentacji" czy "zrobienie slajdów". Zamiast hooka z L03 (który sprawdzał strukturę po każdym zapisie), Olek przechodzi na feedback loop w treści SKILL.md -- bardziej elastyczny i dający lepszy raport końcowy. Skrypt `validate-structure.sh` z lekcji 03 ewoluuje w `validate-presentation.sh` -- bardziej kompletny, z dodatkowymi sprawdzeniami.

### Krok 1: shell injection dla danych

Olek dodaje do SKILL.md sekcję z dynamicznym kontekstem:

```markdown
## Data context

Latest quarterly data:
!`cat data/quarterly-report.json 2>/dev/null || echo "No data file found -- use placeholder data and mark slides as DRAFT"`

Team structure:
!`cat data/team-roster.txt 2>/dev/null || echo "No team data available"`
```

Zwróć uwagę na `2>/dev/null || echo "..."`. To zabezpieczenie: jeśli plik nie istnieje, zamiast błędu Claude dostaje jasną instrukcję ("użyj danych zastępczych i oznacz jako DRAFT"). Skill nie pada -- degraduje się elegancko.

### Krok 2: skrypt walidacji

Olek tworzy `scripts/validate-presentation.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail

FILE="${1:?Usage: validate-presentation.sh <file>}"
[ ! -f "$FILE" ] && echo "ERROR: File not found: $FILE" && exit 1

errors=0

# Check slide count (expect 5-15)
slide_count=$(grep -c '^## ' "$FILE" || true)
[ "$slide_count" -lt 5 ] && echo "ERROR: Too few slides ($slide_count)." && errors=$((errors+1))
[ "$slide_count" -gt 15 ] && echo "ERROR: Too many slides ($slide_count)." && errors=$((errors+1))

# Check for intro and summary
grep -qi '## intro\|## introduction\|## agenda' "$FILE" \
  || { echo "ERROR: Missing intro/agenda slide."; errors=$((errors+1)); }
grep -qi '## summary\|## podsumowanie\|## key takeaway' "$FILE" \
  || { echo "ERROR: Missing summary slide."; errors=$((errors+1)); }

# Check for placeholder text
grep -qi 'lorem ipsum\|TODO\|PLACEHOLDER\|TBD' "$FILE" \
  && { echo "ERROR: Found placeholder text."; errors=$((errors+1)); }

[ "$errors" -eq 0 ] && echo "VALIDATION PASSED ($slide_count slides)" && exit 0
echo "VALIDATION FAILED ($errors errors)" && exit 1
```

```bash
chmod +x .claude/skills/create-presentation/scripts/validate-presentation.sh
```

### Krok 3: zaktualizowany SKILL.md

Oto pełna, zaktualizowana wersja SKILL.md Olka:

```yaml
---
name: create-presentation
description: "Create structured presentations with brand guidelines. Use when someone asks to prepare a presentation, pitch deck, or slide outline."
context: fork
agent: general-purpose
allowed-tools: Read, Grep, Glob, Bash(cat data/*), Bash(./scripts/*)
---

# Create Presentation Skill

Create a presentation on topic: $0
Audience: $1
Format: $2

## Data context

Latest quarterly data:
!`cat data/quarterly-report.json 2>/dev/null || echo "No data file found -- use placeholder data and mark slides as DRAFT"`

Team structure:
!`cat data/team-roster.txt 2>/dev/null || echo "No team data available"`

## Instructions

1. Read references/brand-guidelines.md for visual standards
2. Read references/slide-templates.md for structure
3. Read references/storytelling-framework.md for narrative arc
4. Use real data from the Data context section above
5. Build the presentation following the template structure

## Presentation feedback loop

After generating the presentation:
1. Save output to `output/presentation.md`
2. Run `scripts/validate-presentation.sh output/presentation.md`
3. If validation fails, read error output and fix issues
4. Run validation again
5. Maximum 3 iterations. If still failing, deliver current
   version with a list of unresolved issues.

## Output requirements

- Each slide starts with ## heading
- Include speaker notes under each slide (as blockquotes)
- First slide: title + agenda
- Last slide: summary + key takeaways
- No placeholder text (Lorem ipsum, TODO, TBD)
```

### Jak to wygląda w akcji

Olek: `/create-presentation "Q4 Sales Results" "board members" "executive summary"`

**Iteracja 1:**
- Claude ładuje dane z `data/quarterly-report.json`.
- Buduje 12 slajdów według szablonu.
- Walidacja: FAIL -- brak slajdu z podsumowaniem, znaleziono "TBD" w dwóch miejscach.

**Iteracja 2:**
- Claude dodaje slajd "Key Takeaways", zastępuje "TBD" konkretnymi liczbami z raportu.
- Walidacja: PASS (12 slajdów, struktura OK).

Olek dostaje gotową prezentację z prawdziwymi danymi, sprawdzoną pod kątem struktury.

---

## 7. Checklist pattern -- wymuszanie systematyczności

Feedback loop pilnuje jakości wyniku. Checklist pattern pilnuje, żeby Claude nie pominął żadnego kroku w trakcie pracy.

### Problem

Przy złożonych skillach Claude czasem "zapomina" o jednym z kroków. Sprawdzi konwencje TypeScript, ale pominie security checklist. Zbuduje slajdy, ale zapomni o speaker notes. To nie jest złośliwość -- to natura probabilistycznego modelu. Im dłuższe zadanie, tym łatwiej o pominięcie.

### Rozwiązanie

Każ Claude'owi prowadzić listę kontrolną i aktualizować ją po każdym kroku:

```markdown
## Progress tracking

Maintain a checklist as you work. Update it after each step:

- [ ] Read target files
- [ ] Run lint check
- [ ] Check TypeScript conventions (references/typescript-conventions.md)
- [ ] Check Next.js patterns (references/nextjs-patterns.md)
- [ ] Check security issues (references/security-checklist.md)
- [ ] Run tests
- [ ] Fix found issues (if any)
- [ ] Re-run validation after fixes
- [ ] Generate final report
- [ ] Create GitHub issues for critical findings (if MCP available)

After completing all steps, output the final checklist with results.
```

Dlaczego to działa: Claude traktuje checklisty jako zobowiązanie. Kiedy widzi niezaznaczony punkt, próbuje go wykonać zanim przejdzie dalej. To nie jest gwarancja (gwarancję daje hook albo skrypt), ale znacząco poprawia systematyczność.

### Kiedy checklist, a kiedy feedback loop?

To różne narzędzia do różnych celów:

**Checklist pattern** -- pilnuje, żeby Claude **przeszedł wszystkie kroki**. Odpowiada na pytanie: "Czy nic nie pominąłeś?"

**Feedback loop** -- pilnuje, żeby wynik **spełniał kryteria jakości**. Odpowiada na pytanie: "Czy to, co zrobiłeś, jest poprawne?"

Najlepsze skille używają obu naraz. Checklist prowadzi przez proces, feedback loop weryfikuje wynik.

---

## 8. Podsumowanie

Porównaj stan obu projektów z początkiem lekcji. Oba skille zyskały:

- **Połączenia zewnętrzne** -- GitHub MCP, dane z plików.
- **Samokontrolę** -- feedback loops z deterministycznymi skryptami.
- **Systematyczność** -- checklist patterns.
- **Kontrolę uprawnień** -- `allowed-tools` dla płynnej, ale bezpiecznej pracy.

Paweł podsumowuje to jednym zdaniem:

-- Skill, który generuje, sprawdza i naprawia -- to już nie jest prompt. To jest agent.

---

## 9. Trzy błędy, które popełnisz (i jak ich uniknąć)

**Błąd 1: feedback loop bez limitu iteracji.**
Claude wpada w pętlę poprawek i zjada budżet tokenów. Zawsze ustawiaj `max 3 iterations` (lub inną rozsądną liczbę).

**Błąd 2: walidacja promptem zamiast skryptem.**
"Sprawdź, czy prezentacja ma 10 slajdów" w prompcie to proszenie się o kłopoty. Claude może policzyć źle, może "przymknąć oko", może zmienić kryteria. Skrypt `grep -c '^## '` zawsze policzy tak samo.

**Błąd 3: allowed-tools zbyt szerokie.**
`allowed-tools: Bash(*)` to jak danie stażyście kluczy do wszystkich serwerów. Używaj precyzyjnych wildcardów: `Bash(npm run lint*)`, `Bash(git diff*)`, `Bash(./scripts/*)`.

---

## Słowniczek

**feedback loop (pętla zwrotna)** -- wzorzec, w którym skill generuje wynik, waliduje go skryptem i poprawia błędy. Powtarza się aż do sukcesu (z limitem prób).

**allowed-tools** -- pole we frontmatterze SKILL.md. Lista narzędzi, które Claude może używać bez pytania o zgodę, gdy skill jest aktywny. Nie zmienia uprawnień globalnych.

**wildcard (w kontekście uprawnień)** -- znak `*` w `allowed-tools`, który dopasowuje dowolny ciąg znaków. `Bash(git diff*)` oznacza: "każda komenda zaczynająca się od `git diff`".

**checklist pattern** -- wzorzec, w którym Claude prowadzi listę kontrolną i odhacza punkty w trakcie pracy. Poprawia systematyczność przy złożonych zadaniach.

**iteracja** -- jeden pełny przebieg pętli: generowanie, walidacja, naprawa. "Maksymalnie 3 iteracje" oznacza, że Claude może próbować naprawić wynik najwyżej trzy razy.

**determinizm** -- właściwość, dzięki której ta sama operacja daje za każdym razem ten sam wynik. Skrypt bash jest deterministyczny (zawsze sprawdzi to samo). Prompt LLM nie jest (może za każdym razem ocenić inaczej).

---

## Dokumentacja

- Skills w Claude Code: https://code.claude.com/docs/en/skills
- Slash commands i frontmatter: https://code.claude.com/docs/en/slash-commands
- MCP (Model Context Protocol): https://code.claude.com/docs/en/mcp
- Hooki: https://code.claude.com/docs/en/hooks

---

**Następna lekcja:** Lekcja 05 -- Dystrybucja i finał: od folderu do standardu
**Poprzednia lekcja:** Lekcja 03 -- Kontrola: kto, kiedy i jak wywołuje skilla
