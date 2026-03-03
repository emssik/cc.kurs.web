---                                                                                                                                                                                         
  Review modułu 03: Skille                                                                                                                                                                    
                                                                                                                                                                                              
  Ogólna ocena                                                                                                                                                                                
                                                                                                                                                                                              
  Moduł jest solidnie zaprojektowany pedagogicznie — dwa projekty (code-review, create-presentation) budowane równolegle przez 5 lekcji, z narratywą trzech postaci. Progresja jest logiczna.
  Ale znalazłem kilka realnych problemów technicznych i niespójności między lekcjami.

  ---
  1. Błędy techniczne

  Shell injection wewnątrz bloków kodu (L05 — obie finalne wersje)

  Najpoważniejszy problem. W finalnych SKILL.md (lekcja 05) shell injection !command`` jest umieszczony wewnątrz fenced code blocks:

  code-review, L05, linia ~231:

  !git diff --name-only HEAD~1 2>/dev/null || git diff --name-only --cached


  create-presentation, L05, linia ~393:

  !cat project-brief.json 2>/dev/null || echo "No project brief found"


  Fenced code block (potrójne backticki) traktuje zawartość jako tekst literalny. Shell injection nie wykona się wewnątrz bloku kodu. Porównaj z lekcją 02 i 04, gdzie ten sam mechanizm jest
  poprawnie użyty poza blokiem kodu:

  Current branch: !`git branch --show-current`
  Recent changes: !`git diff --cached --stat`

  To jest bug — finalne wersje skilli nie będą działać tak, jak opisano.

  Skrypt run-lint.sh nigdy nie zwraca kodu błędu (L02)

  Lekcja 02, linia 316 deklaruje kody wyjścia:
  # Exit codes: 0 = no issues, 1 = issues found, 2 = tool error

  Ale sam skrypt kończy się na || true (linia 343), które zawsze zwraca kod 0. Przy set -e skrypt nigdy nie zakończy się kodem 1. Udokumentowane kody wyjścia 1 i 2 są martwe.

  Ścieżki hooków — niejasność katalogu roboczego (L03, L04, L05)

  Hooki w frontmatterze używają ścieżki "./scripts/run-lint.sh":

  hooks:
    PostToolUse:
      - matcher: "Edit|Write"
        hooks:
          - type: command
            command: "./scripts/run-lint.sh"

  Ale skrypt fizycznie żyje w .claude/skills/code-review/scripts/run-lint.sh. Jeśli hook rozwiązuje ścieżki względem katalogu projektu (root), to ./scripts/run-lint.sh wskaże na
  <project-root>/scripts/run-lint.sh, którego nie ma. Jeśli względem katalogu skilla — jest OK.

  Lekcje nigdy nie wyjaśniają, jaki jest katalog roboczy dla hooków w skillach. To krytyczna informacja dla czytelnika.

  Komenda /context (L01, linia 351)

  Lekcja 01 mówi:
  Chcesz zobaczyć, które skille Claude ma "w pamięci"? W trakcie sesji wpisz /context

  Nie jestem pewien, czy /context to rzeczywista komenda w Claude Code. Jeśli nie istnieje, czytelnik dostanie błąd i straci zaufanie do kursu. Warto zweryfikować i ew. zamienić na /help lub
   inną istniejącą komendę diagnostyczną.

  ---
  2. Niespójności między lekcjami

  Widmo validate-deck.sh (L05)

  Lekcja 05, linia 353:
  validate-deck.sh z lekcji 02 stał się validate-structure.sh

  Ale w lekcji 02 skrypt od początku nazywał się validate-structure.sh (L02, linia 395). Nazwa validate-deck.sh nigdy nie pojawiła się w żadnej wcześniejszej lekcji. To fantomowa referencja.

  Zmiana semantyki $2 bez wyjaśnienia (L03 → L05)

  Lekcja 03 (linia 162-166) definiuje argumenty create-presentation:
  - $0 = temat
  - $1 = odbiorcy (sales-team)
  - $2 = format (executive | workshop | pitch)

  Lekcja 05 (linia 386-388) cicho zmienia semantykę:
  - $0 = temat
  - $1 = target audience
  - $2 = number of slides (default: "12")

  Trzeci argument zmienił się z "formatu" na "liczbę slajdów" bez żadnego wyjaśnienia. To łamie API skilla między lekcjami.

  Analogicznie argument-hint zmienia się z "[topic] [audience] [format]" (L03) na "<topic> [audience] [slide-count]" (L05) — i zmiana konwencji z [] na <> też nie jest wyjaśniona.

  Dwa różne skrypty run-lint.sh (L02 vs L03)

  Lekcja 02 — rozbudowany skrypt (20 linii), sprawdza config eslinta, node_modules, output JSON.

  Lekcja 03 (linia 405-411) — zupełnie inny skrypt (3 linie):
  npx eslint --fix "$1" 2>&1 || true
  exit 0

  Oba nazywają się run-lint.sh i żyją w tym samym katalogu scripts/. Czytelnik nie wie, który jest aktualny. Lekcja 03 nie mówi "zastąp poprzedni skrypt" ani "to jest uproszczona wersja dla
  hooka".

  Flaga disable-model-invocation — yo-yo (L01 → L03 → L04)

  - L01: brak flagi (domyślne zachowanie)
  - L03: dodana do obu skilli (wyjaśnione dlaczego)
  - L04: usunięta z code-review (wyjaśnione) i z create-presentation (wspomniane jednym zdaniem w L04, linia 361)

  Progresja jest logiczna, ale usunięcie flagi z create-presentation jest wyjaśnione zbyt pobieżnie. W lekcji 03 Paweł poświęca akapit na wyjaśnienie, dlaczego Olek powinien mieć tę flagę. W
   lekcji 04 znika jednym zdaniem. Czytelnik może się zgubić.

  ---
  3. Wątpliwości merytoryczne

  $ARGUMENTS[0] jako alias $0 (L03, linia 166)

  Możesz też użyć pełnej składni: $ARGUMENTS[0], $ARGUMENTS[1], $ARGUMENTS[2]. Robi dokładnie to samo co $0, $1, $2.

  Warto zweryfikować, czy ta składnia faktycznie działa w Claude Code. Jeśli nie, czytelnik będzie debugować nieistniejącą funkcjonalność.

  ${CLAUDE_SESSION_ID} (L03, linia 168-174)

  Prezentowana jako zmienna dostępna w skillach. Warto zweryfikować, czy ta zmienna istnieje. Jeśli tak — jest przydatna. Jeśli nie — to kolejny ghost feature.

  Tworzenie issue przez MCP bez allowed-tools dla MCP (L04)

  W lekcji 04 Karina dodaje integrację z GitHubem. allowed-tools zawiera:
  allowed-tools: Read, Grep, Glob, Bash(npm run lint*), Bash(git diff*)

  Ale nie zawiera narzędzi MCP (np. mcp__github__issue_write). Czy Claude może użyć narzędzi GitHub MCP bez ich jawnego dodania do allowed-tools? Jeśli nie — skill będzie pytał o pozwolenie
  przy każdym tworzeniu issue, co burzy flow opisany w lekcji. Jeśli tak — warto wyjaśnić, że allowed-tools dotyczy tylko narzędzi wbudowanych, a MCP ma osobny model uprawnień.

  Pluginy — /plugin install (L05, linia 169)

  Komenda /plugin install i struktura .claude-plugin/plugin.json — warto zweryfikować, czy ta funkcjonalność istnieje w obecnej wersji Claude Code. Jeśli to planned feature, powinno być
  jasno zaznaczone.

  ---
  4. Obserwacje dotyczące spójności projektów

  Tabela ewolucji frontmattera — code-review

  ┌────────┬─────────────┬─────────────────────────────┬──────────────────────────┬─────────┬─────────────────┬──────────────────────────────┬─────────────┐
  │ Lekcja │    name     │         description         │ disable-model-invocation │ context │      agent      │        allowed-tools         │    hooks    │
  ├────────┼─────────────┼─────────────────────────────┼──────────────────────────┼─────────┼─────────────────┼──────────────────────────────┼─────────────┤
  │ L01    │ code-review │ TS/Next.js reviewer         │ -                        │ -       │ -               │ -                            │ -           │
  ├────────┼─────────────┼─────────────────────────────┼──────────────────────────┼─────────┼─────────────────┼──────────────────────────────┼─────────────┤
  │ L02    │ code-review │ TS/Next.js reviewer         │ -                        │ -       │ -               │ -                            │ -           │
  ├────────┼─────────────┼─────────────────────────────┼──────────────────────────┼─────────┼─────────────────┼──────────────────────────────┼─────────────┤
  │ L03    │ code-review │ ...with security checks     │ true                     │ fork    │ general-purpose │ -                            │ PostToolUse │
  ├────────┼─────────────┼─────────────────────────────┼──────────────────────────┼─────────┼─────────────────┼──────────────────────────────┼─────────────┤
  │ L04    │ code-review │ ...Can create GitHub issues │ usunięte                 │ fork    │ general-purpose │ Read, Grep...                │ PostToolUse │
  ├────────┼─────────────┼─────────────────────────────┼──────────────────────────┼─────────┼─────────────────┼──────────────────────────────┼─────────────┤
  │ L05    │ code-review │ ...Analyzes patterns...     │ -                        │ fork    │ general-purpose │ Read, Grep + Bash(npm test*) │ PostToolUse │
  └────────┴─────────────┴─────────────────────────────┴──────────────────────────┴─────────┴─────────────────┴──────────────────────────────┴─────────────┘

  Progresja jest czytelna i logiczna.

  Tabela ewolucji frontmattera — create-presentation

  ┌────────┬──────────────────────────┬─────────┬─────────────────┬──────────────────────────┬─────────────────────────────┬─────────────┐
  │ Lekcja │ disable-model-invocation │ context │      agent      │      allowed-tools       │            hooks            │     $2      │
  ├────────┼──────────────────────────┼─────────┼─────────────────┼──────────────────────────┼─────────────────────────────┼─────────────┤
  │ L01    │ -                        │ -       │ -               │ -                        │ -                           │ -           │
  ├────────┼──────────────────────────┼─────────┼─────────────────┼──────────────────────────┼─────────────────────────────┼─────────────┤
  │ L02    │ -                        │ -       │ -               │ -                        │ -                           │ -           │
  ├────────┼──────────────────────────┼─────────┼─────────────────┼──────────────────────────┼─────────────────────────────┼─────────────┤
  │ L03    │ true                     │ -       │ -               │ -                        │ PostToolUse(Write)          │ format      │
  ├────────┼──────────────────────────┼─────────┼─────────────────┼──────────────────────────┼─────────────────────────────┼─────────────┤
  │ L04    │ usunięte                 │ fork    │ general-purpose │ Read...Bash              │ - (usunięty hook)           │ -           │
  ├────────┼──────────────────────────┼─────────┼─────────────────┼──────────────────────────┼─────────────────────────────┼─────────────┤
  │ L05    │ -                        │ fork    │ general-purpose │ Read...Bash(./scripts/*) │ PostToolUse(Write) powrócił │ slide-count │
  └────────┴──────────────────────────┴─────────┴─────────────────┴──────────────────────────┴─────────────────────────────┴─────────────┘

  Tu jest bałagan. Hook znika w L04 (bo Olek przechodzi na feedback loop), ale wraca w L05 bez wyjaśnienia. $2 zmienia semantykę. context: fork pojawia się dopiero w L04, nie w L03 jak u
  Kariny.

  ---
  5. Drobniejsze uwagi

  1. L01, linia 76: "Plik .claude/commands/review.md i skill .claude/skills/review/SKILL.md oba tworzą komendę /review" — to ważna informacja, ale nie wyjaśniono, co się stanie, jeśli
  istnieją oba (konflikt nazw).
  2. L02, linia 562: Sekcja "Typowe błędy" wspomina o !npm test`` jako złym pomyśle — ale nie wyjaśnia, jak długo trwa "zbyt długo". 2 sekundy? 10? 60?
  3. L05, linia 350: Finalna struktura create-presentation zawiera oba skrypty walidacji (validate-structure.sh i validate-presentation.sh), ale lekcja nie wyjaśnia, czym się różnią. Hook
  odpala validate-structure.sh, feedback loop odpala validate-presentation.sh — ale czytelnik musi to sam wydedukować.
  4. L01, linia 86: Instalacja pluginów przez /plugin install jest wspomniana jako trzecia lokalizacja skilli, ale pluginy są dopiero w L05. Wczesna wzmianka może zdezorientować.
  5. Brak testowania skilli: Żadna lekcja nie pokazuje, jak systematycznie testować skilla (np. dry-run, sprawdzenie co Claude faktycznie załadował). L01 wspomina /context, ale to jedyna
  wzmianka.
  6. L03, linia 281: agent: Plan jest opisany jako "tryb eksploracyjny, tylko-do-odczytu. Używany głównie wewnętrznie przez Claude Code w trybie planowania." — to poprawne, ale potem mówi "W
   praktyce w skillach rzadko go potrzebujesz" — takie rzeczy lepiej wyjaśnić krótko i pominąć, niż opisywać i mówić "nie używaj".

  ---
  Podsumowanie priorytetów napraw

  Krytyczne (wpływa na działanie):
  1. Shell injection w code blocks w L05 — nie zadziała
  2. Ścieżki hooków — niejasne, potencjalnie złamane
  3. Fantomowa referencja validate-deck.sh w L05

  Ważne (wpływa na zrozumienie):
  4. Dwa różne run-lint.sh bez wyjaśnienia
  5. Zmiana semantyki $2 w create-presentation bez wyjaśnienia
  6. Brak wyjaśnienia, czy narzędzia MCP potrzebują allowed-tools
  7. Weryfikacja istnienia /context, $ARGUMENTS[0], ${CLAUDE_SESSION_ID}

  Kosmetyczne:
  8. Hook yo-yo w create-presentation (znika L04, wraca L05)
  9. Usunięcie disable-model-invocation z create-presentation opisane zbyt pobieżnie
  10. Exit codes w run-lint.sh z L02 martwe przez || true