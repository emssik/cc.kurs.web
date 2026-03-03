# Raport recenzji -- Modul Skille

## Podsumowanie

**Ocena ogolna:** Dobra -- lekcje sa solidne merytorycznie, narracja czytelna, projekty budowane konsekwentnie. Bledy techniczne sa nieduze, ale kilka wymaga poprawki.
**Lekcje sprawdzone:** 5/5
**Bledy krytyczne:** 4
**Bledy srednie:** 12
**Uwagi kosmetyczne:** 10

---

## Lekcja 01: Skille -- anatomia i pierwszy przepis

### Merytoryka

1. **[SREDNI] Opis Progressive Disclosure jest uproszczony vs docs.** Lekcja opisuje 3 poziomy jako wlasna koncepcje (metadane -> instrukcje -> zasoby). Docs mowi raczej o "description always in context, full skill loads when invoked" i "reference supporting files from SKILL.md so Claude knows what each file contains and when to load them". Lekcja nie klamie, ale narracja "trzech poziomow" jest interpretacja autora, nie terminologia z docs. To dopuszczalne jako uproszczenie dydaktyczne, ale warto byc swiadomym roznic.

2. **[SREDNI] Twierdzenie, ze description jest jedynym polem czytanym na starcie.** Lekcja mowi: "To jedyne pole, ktore naprawde musisz napisac dobrze." Docs potwierdza, ze description jest ladowane do kontekstu na starcie sesji (a full skill loads dopiero po wywolaniu), wiec to jest poprawne.

3. **[OK] Lokalizacje skilli.** Lekcja wymienia: projektowe (.claude/skills/), globalne (~/.claude/skills/), z pluginow. Docs dodaje tez: Enterprise (managed settings) i nested directories (auto-discovery z podkatalogow, np. packages/frontend/.claude/skills/). Brak Enterprise i nested jest OK na tym etapie -- wracaja w lekcji 05.

4. **[OK] Frontmatter -- wymienione pola.** name, description, argument-hint wymienione poprawnie. Lista "innych pol" na pozniej (disable-model-invocation, user-invocable, allowed-tools, context) -- poprawna. Docs wymienia tez `model` i `hooks`, ktore lekcja pomija -- ale to celowe, bo wroca w pozniejszych lekcjach.

5. **[OK] Merged commands/skills.** Lekcja poprawnie mowi, ze ".claude/commands/review.md i skill .claude/skills/review/SKILL.md oba tworza komende /review i dzialaja identycznie". Docs potwierdza: "A file at .claude/commands/review.md and a skill at .claude/skills/review/SKILL.md both create /review and work the same way."

6. **[KOSMETYCZNY] /skills command.** Lekcja mowi: "wpisz /skills, zobaczysz liste zaladowanych skilli". W docs nie ma wzmianki o /skills. Jest /context, ktory pokazuje co Claude zaladowal. Moze chodzic o "What skills are available?" (pytanie do Claude) lub /context. Warto zweryfikowac, czy /skills istnieje -- jesli nie, to to jest blad sredni, nie kosmetyczny.

### Kod

1. **[OK]** Bloki kodu SKILL.md sa poprawne skladniowo (YAML frontmatter + markdown body).
2. **[OK]** Przyklady wywolan (/code-review src/components/, /create-presentation ...) sa poprawne.

### Styl

1. **[KOSMETYCZNY] "dlaczego to zmienia zasady gry" w description lekcji (linia 4).** To jest w meta-danych lekcji, nie w tresci, ale "zmienia zasady gry" brzmi jak AI-smrod ("game-changer"). Warto zmienic.
2. **[OK]** Ton w drugiej osobie -- konsekwentny ("Tworzysz", "Rozumiesz", "Budujesz").
3. **[OK]** Brak emotikonow.
4. **[OK]** Kod po angielsku, narracja po polsku.
5. **[OK]** Brak tabel z 4+ kolumnami.
6. **[OK]** Linki do docs z /en/ -- poprawne.

---

## Lekcja 02: Skalowanie wiedzy -- references, scripts i dynamiczny kontekst

### Merytoryka

1. **[OK] references/ jako folder na zasoby.** Docs: "Reference supporting files from SKILL.md so Claude knows what each file contains and when to load them." Lekcja poprawnie opisuje linkowanie plikow z SKILL.md.

2. **[OK] scripts/ jako folder na skrypty.** Docs potwierdza strukture: "scripts/ -> Script Claude can execute". Lekcja poprawnie opisuje.

3. **[KRYTYCZNY] Shell injection -- skladnia `!`command`` jest przedstawiona poprawnie, ale wyswietlanie jest problematyczne.** W tresci lekcji skladnia jest prezentowana jako `!`command`` (wykrzyknik + backticki). Docs potwierdza: "The !`command` syntax runs shell commands before the skill content is sent to Claude." ALE -- w kilku miejscach lekcji (np. linie 462, 474, 478, 494) skladnia jest uzyta poprawnie. Jest jednak problem z formatowaniem: w sekcji "Typowe bledy" (linia 556) tekst uzywa backtickow w srodku backticka inline, co moze sie zle renderowac w niektorych klientach email. Nalezy sprawdzic renderowanie.

4. **[OK] "Solve, don't punt" -- zasada poprawna i dobrze wyjasniona.**

5. **[SREDNI] Brak wzmianki o chmod +x w kroku tworzenia skryptu.** Skrypt run-lint.sh jest opisany, ale w sekcji Projekt 1 (linia 299-367) nigdzie nie ma explicite `chmod +x scripts/run-lint.sh` w krokach. Informacja o chmod pojawia sie dopiero w sekcji "Prawa wykonania" (linia 287-295) i "Typowe bledy" (linia 558). Warto dodac chmod tez do kroku tworzenia skryptu.

6. **[SREDNI] Link do "SKILL.md specification"** (linia 585): `https://code.claude.com/docs/en/skills/skill-files`. Ten URL prawdopodobnie nie istnieje -- docs ma jedna strone /en/skills, nie /en/skills/skill-files. Nalezy zweryfikowac i ewentualnie zamienic na `https://code.claude.com/docs/en/skills`.

### Kod

1. **[OK]** Skrypt run-lint.sh -- poprawny: ma #!/usr/bin/env bash, set -euo pipefail, sprawdzanie warunkow.
2. **[OK]** Skrypt validate-deck.sh -- poprawny skladniowo.
3. **[KOSMETYCZNY]** W validate-deck.sh (linia 409): `SLIDES=$(grep -c "^## " "$FILE" 2>/dev/null || echo "0")` -- `grep -c` zwraca 0 jesli nie znajdzie dopasowania (exit code 1), ale `|| echo "0"` to obsluguje. OK, ale nadmiarowe -- mogloby byc `grep -c "^## " "$FILE" || true`.

### Styl

1. **[OK]** Ton: druga osoba konsekwentna.
2. **[OK]** Brak emotikonow.
3. **[OK]** Kod po angielsku.
4. **[OK]** Brak tabel 4+ kolumnami.
5. **[OK]** Polskie znaki -- konsekwentne.

---

## Lekcja 03: Kontrola -- kto, kiedy i jak wywoluje skilla

### Merytoryka

1. **[OK] Trzy tryby wywolania.** Lekcja opisuje: domyslny (brak flag), disable-model-invocation: true, user-invocable: false. Docs potwierdza dokladnie ta sama tabele:
   - Default: You can invoke YES, Claude can invoke YES, Description always in context
   - disable-model-invocation: true: You YES, Claude NO, Description not in context
   - user-invocable: false: You NO, Claude YES, Description always in context

2. **[OK] Zmienne $ARGUMENTS, $0, $1, ${CLAUDE_SESSION_ID}.** Docs potwierdza wszystkie. Lekcja poprawnie opisuje $ARGUMENTS[N] jako rownowartosc $N.

3. **[KRYTYCZNY] context: fork -- opis typow agentow jest czesciowo bledny.** Lekcja (linie 281-285) opisuje:
   - `agent: general-purpose` -- pelne mozliwosci. **POPRAWNIE.**
   - `agent: Explore` -- tryb tylko-do-odczytu. **POPRAWNIE** (docs: "Read-only tools, denied access to Write and Edit tools").
   - `agent: Plan` -- tryb planowania, "moze analizowac i przygotowywac plan dzialania, ale nie moze go wykonac". **CZESCIOWO BLEDNE.** Docs mowi, ze Plan jest "research agent used during plan mode to gather context before presenting a plan" z "Read-only tools". Lekcja poprawnie mowi, ze nie moze wykonywac zmian, ale sugeruje, ze uzytkownik moze uzyc `agent: Plan` w skill frontmatter. Docs mowi, ze pole `agent` akceptuje "built-in agents (Explore, Plan, general-purpose) or any custom subagent from .claude/agents/", wiec technicznie jest to poprawne. ALE lekcja nie wspomina, ze Plan jest glownie uzywany w kontekscie plan mode, co moze byc mylace.

4. **[SREDNI] Hooki w skillach -- skladnia.** Lekcja (linie 336-348) pokazuje:
   ```yaml
   hooks:
     PostToolUse:
       - matcher: "Edit|Write"
         hooks:
           - type: command
             command: "./scripts/validate.sh"
   ```
   Docs potwierdza, ze hooki w skills frontmatter uzywaja tej samej struktury co w settings.json. Docs mowi: "See Hooks in skills and agents for configuration format." Skladnia wyglada poprawnie na podstawie przykladow z docs (subagent hooks section uzywa identycznej struktury).

5. **[SREDNI] Wspierane zdarzenia -- lekcja wymienia PreToolUse, PostToolUse, Stop.** Docs dla hookow w subagentach wymienia:
   - PreToolUse, PostToolUse -- poprawnie
   - Stop -- "Stop hooks in frontmatter are automatically converted to SubagentStop events"
   Lekcja NIE wspomina o tej konwersji do SubagentStop, ale docs jasno mowi, ze "All hook events are supported" w frontmatter. Lekcja ogranicza sie do trzech, co jest OK dydaktycznie, ale mowienie "Wspierane zdarzenia" sugeruje, ze to jedyne trzy. Warto dodac slowo "najczesciej uzywane" lub "przykladowe".

6. **[KRYTYCZNY] Skrypt run-lint.sh w hooku (linia 405-408) NIE ma set -euo pipefail i nie uzywa #!/usr/bin/env bash.** Skrypt wyglada tak:
   ```bash
   #!/bin/bash
   npx eslint --fix "$1" 2>&1
   exit 0
   ```
   Wczesniej w lekcji 02 podkreslano waznos "set -euo pipefail" jako "standardowa siatka bezpieczenstwa". Tutaj ten sam typ skryptu go nie ma. Niekonsekwencja. Poza tym `#!/bin/bash` vs `#!/usr/bin/env bash` -- lekcja 02 uzywala env bash, lekcja 03 uzywa bezposredniego /bin/bash.

7. **[SREDNI] Skrypt validate-structure.sh (linie 437-458) tez nie ma set -euo pipefail ani #!/usr/bin/env bash.** Ten sam problem co wyzej.

### Kod

1. **[SREDNI]** Niekonsekwencja shebang: lekcja 02 uzywa `#!/usr/bin/env bash`, lekcja 03 uzywa `#!/bin/bash`. Powinno byc spojne w calym module.
2. **[OK]** YAML frontmatter -- poprawny skladniowo we wszystkich przykladach.
3. **[KOSMETYCZNY]** Skrypt validate-structure.sh nie sprawdza, czy $1 to istniejacy plik (brak walidacji argumentu, odroznij od run-lint.sh ktory tez nie waliduje).

### Styl

1. **[OK]** Ton druga osoba.
2. **[KOSMETYCZNY] "zmienia zasady gry"** nie pojawia sie tutaj. OK.
3. **[OK]** Brak emotikonow.
4. **[KOSMETYCZNY]** Linia 76 -- "fundamentalnego" nie uzyto, ale "coś fundamentalnego" -- sprawdzam... nie, nie ma. OK.
5. **[KOSMETYCZNY]** Sekcja "Podsumowanie" na koncu (linia 542) -- zaczyna sie od "W tej lekcji nauczyles sie trzech rzeczy:" -- to jest lekki meta-komentarz, ale akceptowalny, bo jest w sekcji wyraznie oznaczonej jako podsumowanie.

---

## Lekcja 04: Integracja -- skille spotykaja MCP i feedback loops

### Merytoryka

1. **[OK] Relacja skill-MCP.** Poprawnie wyjasniona jako "MCP to rece, skill to mozg". Technicznie poprawne.

2. **[OK] allowed-tools -- skladnia.** Lekcja (linia 109): `allowed-tools: Read Grep Glob Bash(npm run lint*)`. Docs potwierdza: "Tools Claude can use without asking permission when this skill is active." Format z separatorem spacja i wildcardami -- poprawny na podstawie przykladow z docs.

3. **[SREDNI] allowed-tools -- separator.** Lekcja uzywa spacji jako separatora (np. `allowed-tools: Read Grep Glob Bash(npm run lint*) Bash(git diff*)`). Docs w jednym miejscu uzywa przecinkow: `allowed-tools: Read, Grep, Glob`. W innym miejscu uzywaja spacji. Obie formy prawdopodobnie dzialaja, ale lekcja powinna byc konsekwentna i najlepiej uzyc formatu z docs (przecinki). UWAGA: po dokladniejszym sprawdzeniu docs uzywa obu form -- w reference table pisze "Tools Claude can use" bez specyfikacji separatora, a przyklady uzywaja przecinkow w jednym miejscu (`allowed-tools: Read, Grep, Glob`) i brak przecinkow w innym. Lekcja jest prawdopodobnie poprawna, ale warto ujednolicic.

4. **[OK] Feedback loop -- wzorzec "generuj, waliduj, popraw".** Poprawnie opisany, z limitem iteracji.

5. **[OK] Checklist pattern.** Nie jest to feature z docs, ale dydaktyczny wzorzec pracy -- poprawny i uzyteczny.

6. **[KOSMETYCZNY] Linia 77 -- "ustalmy cos fundamentalnego".** Slowo "fundamentalne" jest na liscie AI-smrodu. Nalezy zamienic na cos prostszego, np. "wazna rzecz" lub "podstawowa zasade".

7. **[SREDNI] Skrypt run-tests.sh (linie 289-315) uzywa zmiennej $CLAUDE_PROJECT_DIR.** Ta zmienna nie jest udokumentowana w oficjalnej docs. Docs wspomina tylko o ${CLAUDE_SESSION_ID}. Moze to byc zmienna srodowiskowa ustawiana przez Claude Code, ale nie jest oficjalnie udokumentowana. Moze powodowac zamieszanie u czytelnikow.

8. **[KOSMETYCZNY] Opis Olka (linia 68) -- "Skill tworzy prezentacje (...) i ma hook walidacji."** W lekcji 03 hook dodano do create-presentation, ale uzywa on scripts/validate-structure.sh. W lekcji 04 pojawia sie scripts/validate-presentation.sh. Te dwa skrypty robia podobne rzeczy, ale maja rozne nazwy. Patrz sekcja "Spojnosc".

### Kod

1. **[OK]** Skrypt run-tests.sh -- poprawny: #!/usr/bin/env bash, set -euo pipefail, poprawna logika.
2. **[OK]** Skrypt validate-presentation.sh -- poprawny i dobrze napisany.
3. **[OK]** YAML frontmatter -- poprawny skladniowo.
4. **[KOSMETYCZNY]** W finalnym SKILL.md Olka (linia 423-424) -- `./scripts/validate-structure.sh` i `./scripts/validate-presentation.sh` -- sa dwa rozne skrypty do walidacji. Jeden sprawdza strukture, drugi pelna walidacje. To jest logiczne, ale moze byc mylace.

### Styl

1. **[SREDNI] Linia 77 -- "ustalmy cos fundamentalnego".** AI-smrod. Zamienic.
2. **[OK]** Ton druga osoba.
3. **[OK]** Brak emotikonow.
4. **[OK]** Kod po angielsku.
5. **[OK]** Brak tabel 4+ kolumnami.

---

## Lekcja 05: Dystrybucja i final -- od folderu do otwartego standardu

### Merytoryka

1. **[OK] Agent Skills Standard -- opis jako otwarty standard.** Docs: "Claude Code skills follow the Agent Skills open standard, which works across multiple AI tools." Poprawne.

2. **[SREDNI] Struktura pluginu.** Lekcja (linie 133-147) pokazuje:
   ```
   my-plugin/
   |-- .claude-plugin/
   |   -- plugin.json
   |-- skills/
   |-- commands/
   |-- agents/
   -- hooks/
       -- hooks.json
   ```
   Docs potwierdza te strukture. ALE docs wyraznie ostrzega: "Don't put commands/, agents/, skills/, or hooks/ inside the .claude-plugin/ directory." Lekcja poprawnie umieszcza je na poziomie roota. OK.

3. **[SREDNI] Komenda /plugin install.** Lekcja mowi: `/plugin install https://github.com/yourname/typescript-reviewer`. Wg najnowszej docs instalacja pluginow odbywa sie przez marketplace i /plugin install. Lekcja uprascza to do jednej komendy, co moze byc niewystarczajace -- ale na potrzeby kursu jest OK.

4. **[SREDNI] plugin.json -- pola.** Lekcja (linie 153-163) pokazuje: name, version, description, author (name, url), repository, license, keywords. Docs potwierdza name, description, version, author jako podstawowe. Lekcja dodaje repository, license, keywords -- ktore sa w pelnej specyfikacji. OK.

5. **[OK] Namespace.** Lekcja mowi: "skille z pluginu dostaja namespace -- uzywasz ich jako typescript-reviewer:code-review". Docs: "Plugin skills use a plugin-name:skill-name namespace." Poprawne.

6. **[OK] Bezpieczenstwo -- 5 zasad.** Dobre, praktyczne wskazowki. Nie ma odpowiednika w docs, ale sa logiczne i poprawne.

7. **[KRYTYCZNY] Finalna wersja code-review SKILL.md (linie 196-332) -- niepoprawnie zamkniety blok kodu.** Na koncu finalnego SKILL.md sa dwa zamykajace backticki:
   ```
   ## Review Summary
   - Files reviewed: <count>
   ...
   ```
   ```
   ``` (linia 331)
   ``` (linia 332)
   ```
   To wyglada na podwojne zamkniecie bloku kodu markdown. W renderowanym SKILL.md bedzie to wyswietlone blednie. Blok kodu zaczynajacy sie na linii 196 (```markdown) zamyka sie na linii 331 (```), a linia 332 to dodatkowe ``` ktore nie ma otwierajacego. Nalezy zweryfikowac i naprawic.

8. **[KOSMETYCZNY] Finalna wersja code-review -- brak disable-model-invocation: true.** W lekcji 03 Karina dodala `disable-model-invocation: true` do code-review. W finalnej wersji w lekcji 05 (linia 197-213) tego pola NIE MA. To jest niekonsekwencja z lekcja 03. Patrz sekcja "Spojnosc".

9. **[KOSMETYCZNY] Finalna wersja create-presentation -- brak disable-model-invocation: true.** To samo: w lekcji 03 Olek dodal te flage, a w finalnej wersji w lekcji 05 jej nie ma.

10. **[KOSMETYCZNY] Troubleshooting -- /context.** Linia 541: "Wpisz /context w Claude Code, zeby zobaczyc co Claude zaladowal." Docs potwierdza: "Run /context to check for a warning about excluded skills." Poprawne.

### Kod

1. **[KRYTYCZNY]** Problem z zamknieciem bloku kodu w finalnej wersji code-review SKILL.md (opisany wyzej). Podwojne ```.
2. **[OK]** plugin.json -- poprawny JSON.
3. **[OK]** Struktura katalogow -- poprawna.

### Styl

1. **[OK]** Ton druga osoba.
2. **[OK]** Brak emotikonow.
3. **[OK]** Kod po angielsku.
4. **[OK]** Brak tabel 4+ kolumnami.
5. **[OK]** Polskie znaki.
6. **[KOSMETYCZNY]** Linia 41 -- "opublikowalo specyfikacje Agent Skills jako otwarty standard" -- "grudzien 2025" -- trudno zweryfikowac dokladna date. Docs nie podaje daty publikacji.

---

## Spojnosc miedzy lekcjami

### Projekt 1 (code-review)

**Ewolucja frontmattera:**

| Lekcja | Frontmatter |
|--------|------------|
| 01 | name, description, argument-hint |
| 02 | name, description, argument-hint (bez zmian) |
| 03 | + disable-model-invocation: true, context: fork, agent: general-purpose, hooks |
| 04 | + allowed-tools (ale opis z L03 NIE jest identyczny -- linia 149-160 vs 307-317 z L03) |
| 05 (final) | name, description, argument-hint, context: fork, agent: general-purpose, allowed-tools, hooks |

**Problem: disable-model-invocation: true znika w lekcji 04 i 05.**

W lekcji 03 (linia 86-93) Karina explicite dodaje `disable-model-invocation: true`. W lekcji 04 (linia 149-160) nowy frontmatter NIE zawiera tej flagi. W lekcji 05 (finalna wersja, linia 197-213) tez nie.

Mozliwe wyjasniene: lekcja 04 celowo usuwa te flage, bo skill z integracjami MCP moze byc wywolywany automatycznie. Ale to NIE jest wyjasnienie w tekscie. Czytelnik nie wie, dlaczego flaga zniknela.

**Problem: description sie zmienia bez wyjasnenia.**

- L01: "TypeScript/Next.js code quality reviewer. Use when reviewing code changes, before commits, or when asked to check code quality. Analyzes patterns, naming, types, and common pitfalls."
- L02: "TypeScript/Next.js code quality reviewer. Use when reviewing code changes, before commits, or when asked to check code quality." (krotsza)
- L03: "TypeScript/Next.js code quality reviewer with security checks"
- L04: "TypeScript/Next.js code quality reviewer. Use when reviewing code, before commits, or for code quality checks. Can create GitHub issues for findings."
- L05: "TypeScript/Next.js code quality reviewer. Use when reviewing code changes, before commits, or when asked to check code quality. Analyzes patterns, naming, types, security, and common pitfalls. Can create GitHub issues for critical findings."

Te zmiany sa naturalne (skill ewoluuje), ale brak komentzarza w tekscie sprawia, ze czytelnik moze sie pogubic.

**Problem: opis tresci SKILL.md.**

W lekcji 03 mamy: "Reszta SKILL.md (sekcje Target, Review Process, Output Format) pozostaje bez zmian." Ale w lekcji 04 mamy zupelnie nowa tresc SKILL.md z innymi sekcjami (Review steps, Integration with GitHub, Shell context, Output format). Nie jest jasne, jak nowa wersja laczy sie ze stara.

### Projekt 2 (create-presentation)

**Ewolucja frontmattera:**

| Lekcja | Frontmatter |
|--------|------------|
| 01 | name, description, argument-hint |
| 02 | name, description (inna niz L01!), argument-hint |
| 03 | + disable-model-invocation: true, hooks |
| 04 | name, description (inna niz L03!), context: fork, agent: general-purpose, allowed-tools |
| 05 (final) | name, description, argument-hint, context: fork, agent: general-purpose, allowed-tools, hooks |

**Problem: disable-model-invocation: true znika w lekcji 04 i 05.**

Identyczny problem jak w code-review. Flaga dodana w L03 znika w L04 bez wyjasnenia.

**Problem: dwa skrypty walidujace.**

- L02: scripts/validate-deck.sh
- L03: scripts/validate-structure.sh
- L04: scripts/validate-presentation.sh
- L05 (final): scripts/validate-structure.sh ORAZ scripts/validate-presentation.sh

W L02 skrypt nazywa sie validate-deck.sh. W L03 pojawia sie validate-structure.sh (inny skrypt, inna nazwa). W L04 pojawia sie validate-presentation.sh (jeszcze inny). W L05 sa oba: validate-structure.sh i validate-presentation.sh, ale nie ma validate-deck.sh.

Czytelnik nie wie, co sie stalo z validate-deck.sh. Czy to to samo co validate-structure.sh? Dlaczego zmieniono nazwe? Nalezy albo ujednolicic nazwy, albo explicite powiedziec "zamieniamy validate-deck.sh na validate-structure.sh".

**Problem: hooks w lekcji 05.**

W lekcji 03 hook create-presentation uzywa `./scripts/validate-structure.sh`. W lekcji 05 (finalna) tez uzywa `./scripts/validate-structure.sh`. Ale w lekcji 04 hook zniknal z frontmattera (linia 417-424), bo Olek zrobil feedback loop w tresci SKILL.md. To jest niekonsekwencja: w L05 hook wraca, ale tresc SKILL.md z L04 tez opisuje reczne uruchamianie walidacji w "Presentation feedback loop".

---

## Podsumowanie problemow

### Krytyczne (musza byc naprawione)

1. **[L05, linie 331-332] Podwojne zamkniecie bloku kodu w finalnym SKILL.md code-review.** Dwa ``` zamiast jednego. Powoduje bledne renderowanie. Nalezy usunac jedno ```.

2. **[L03, linie 405-408] Skrypt run-lint.sh w hooku nie ma set -euo pipefail i uzywa #!/bin/bash zamiast #!/usr/bin/env bash.** Niekonsekwencja z wlasnym nauczaniem z lekcji 02. Rozwiazanie: dodac set -euo pipefail albo wyjasnic, dlaczego w hookach to nieistotne.

3. **[L03, linie 437-458] Skrypt validate-structure.sh ma ten sam problem** -- brak set -euo pipefail i #!/bin/bash vs #!/usr/bin/env bash. Rozwiazanie: ujednolicic z konwencja z lekcji 02.

4. **[L03, linie 281-285] Opis agent: Plan jest mylacy.** Lekcja prezentuje go jako "tryb planowania" do uzytku w skillach, podczas gdy docs mowi ze Plan to "research agent used during plan mode". Rozwiazanie: doprecyzowac opis, ze Plan jest glownie wewnetrznym agentem plan mode, a w skillach warto uzywac Explore (read-only) lub general-purpose (full access).

### Srednie (warto poprawic)

1. **[L01-L05] disable-model-invocation: true znika bez wyjasnenia.** Dodana w L03, brak w L04 i L05. Rozwiazanie: dodac jedno zdanie w L04 wyjasniajace, dlaczego flaga zostala usunieta, albo zachowac ja w finalnych wersjach.

2. **[L02-L05] Nazwy skryptow walidujacych sa niekonsekwentne.** validate-deck.sh (L02) -> validate-structure.sh (L03) -> validate-presentation.sh (L04). Rozwiazanie: uzywac jednej nazwy od poczatku (np. validate-deck.sh -> w L03 zmienic na validate-structure.sh z krotkim wyjasnieniem).

3. **[L02, linia 585] Potencjalnie nieistniejacy URL** https://code.claude.com/docs/en/skills/skill-files. Rozwiazanie: zamienic na https://code.claude.com/docs/en/skills.

4. **[L04, linia 77] Slowo "fundamentalne" -- AI-smrod.** Rozwiazanie: zamienic na "wazne" lub "podstawowe".

5. **[L03, linie 350-356] "Wspierane zdarzenia" sugeruja, ze to jedyne trzy.** Rozwiazanie: dodac slowo "najczesciej uzywane" lub "przykladowe zdarzenia".

6. **[L04, linie 289-315] Zmienna $CLAUDE_PROJECT_DIR nieudokumentowana w docs.** Rozwiazanie: usunac lub zamienic na standardowa zmienna, np. `cd "$(git rev-parse --show-toplevel)"`.

7. **[L01, linie 347-353] /skills -- moze nie istniec.** Docs wspomina /context jako narzedzie do sprawdzania zaladowanych skilli. Jesli /skills nie istnieje, nalezy zamienic na /context lub pytanie "What skills are available?".

8. **[L02] Brak chmod +x w krokach tworzenia skryptu run-lint.sh** (sekcja Projekt 1). Informacja o chmod jest osobno, ale nie w workflow tworzenia.

9. **[L03-L04] Niekonsekwentny shebang** -- #!/usr/bin/env bash vs #!/bin/bash. Nalezy ujednolicic w calym module.

10. **[L04, L05] Opisy (description) zmieniaja sie miedzy lekcjami bez komentarza.** Czytelnik moze sie pogubic. Rozwiazanie: krotka uwaga przy kazdej zmianie opisu.

11. **[L04] allowed-tools -- separator spacja vs przecinek.** Docs uzywa obu form. Lekcja uzywa spacji. Rozwiazanie: ujednolicic -- albo spacja wszedzie, albo przecinek.

12. **[L01, linia 4] "zmienia zasady gry" w meta-opisie lekcji.** Lekki AI-smrod. Rozwiazanie: zamienic np. na "i dlaczego warto je znac".

### Kosmetyczne (opcjonalne)

1. **[L01] Brak wzmianki o nested directory auto-discovery** -- ale to szczegol, ktorego nie trzeba na tym etapie.
2. **[L01] Brak wzmianki o polu `model` we frontmatterze** -- ale explicite mowi "inne pola uzyjemy w nastepnych lekcjach".
3. **[L02] grep -c z || echo "0" w validate-deck.sh** -- dziala, ale nadmiarowe.
4. **[L03] Skrypt validate-structure.sh nie waliduje argumentu $1.**
5. **[L04] Dwa skrypty walidacji (validate-structure.sh i validate-presentation.sh)** w jednym skillu -- logiczne, ale moze byc mylace.
6. **[L05] "Grudzien 2025" jako data publikacji Agent Skills Standard** -- trudno zweryfikowac.
7. **[L05] Finalne wersje nie zawieraja disable-model-invocation: true** -- opisane w sekcji srednie.
8. **[L03] Meta-komentarz "W tej lekcji nauczyles sie trzech rzeczy:"** -- akceptowalny w podsumowaniu.
9. **[L05] Sekcja Marketplace w slowniczku** -- docs nie wspomina explicite o "Marketplace" w kontekscie skilli, ale jest w kontekscie pluginow. OK dydaktycznie.
10. **[L01-L05] Brak konsekwentnego formatowania dialogow** -- w L01-L04 uzywa `--` (myslnik em-dash), w L05 uzywa `--` (dwa myslniki). Nalezy ujednolicic.
