To doskonały pomysł na ułożenie kursu w formie **project-based learning**. Budowanie jednego, ewoluującego skilla świetnie pokaże studentom, jak kolejne mechanizmy (Progressive Disclosure, Hooki, MCP, Subagenty) nawarstwiają się, tworząc ostatecznie w pełni autonomiczne narzędzie. 

Zbudujmy skilla o nazwie **„Autonomiczny Inspektor Kodu” (Code Inspector)**. Będzie to narzędzie, które analizuje napisany kod, sprawdza go pod kątem standardów, uruchamia testy, a na końcu może nawet współpracować w zespole agentów przy tworzeniu Pull Requesta.

Oto jak możesz rozłożyć budowę tego skilla na poszczególne lekcje:

### Projekt: Autonomiczny Inspektor Kodu (`code-inspector`)

#### Lekcja 1: Fundamenty – Pierwszy zarys i metadane
**Co robimy:** Tworzymy bazową strukturę katalogu i uczymy modela podstawowych zachowań.
*   **Akcja:** Student tworzy folder `code-inspector` i umieszcza w nim plik `SKILL.md`.
*   **Teoria w praktyce:** Wpisujemy YAML frontmatter. Definiujemy pola `name: code-inspector` oraz `description`, które musi zawierać zarówno informację o tym, *co* robi skill, jak i *kiedy* ma zostać użyty (np. "Użyj, gdy użytkownik prosi o sprawdzenie kodu lub przed commitem"). Student uczy się, że tylko te metadane są na starcie ładowane do pamięci Claude'a, zużywając zaledwie 30-50 tokenów.
*   **Efekt lekcji:** Claude potrafi odpowiedzieć na prośbę "Sprawdź mój kod", opierając się na prostych instrukcjach tekstowych zawartych w `SKILL.md`.

#### Lekcja 2: Architektura Progressive Disclosure – Odciążamy kontekst
**Co robimy:** Skalujemy wiedzę Inspektora bez zapychania okna kontekstowego modelu.
*   **Akcja:** Zamiast trzymać setki linii standardów kodowania w jednym pliku, student tworzy folder `references/`. Umieszcza tam pliki takie jak `security_rules.md` (zasady bezpieczeństwa) i `style_guide.md` (styl firmy).
*   **Teoria w praktyce:** W `SKILL.md` stosujemy tzw. "płytkie linkowanie" (one level deep) do tych plików. Uczymy studentów, że Claude wczyta plik z zasadami bezpieczeństwa dopiero wtedy, gdy w trakcie analizy natrafi na operacje na bazie danych lub autoryzację.
*   **Efekt lekcji:** Skill staje się potężny merytorycznie, ale nadal zużywa mało tokenów, dopóki specyficzna wiedza nie jest bezwzględnie potrzebna.

#### Lekcja 3: Skrypty wykonawcze i Wstrzykiwanie Kontekstu (Shell Injection)
**Co robimy:** Przechodzimy od słów do czynów – skill zaczyna wchodzić w interakcję ze środowiskiem.
*   **Akcja 1 (Skrypty):** Tworzymy folder `scripts/` i umieszczamy w nim prosty skrypt np. w Bashu lub Pythonie (`run_tests.sh`), który linteruje kod lub odpala testy jednostkowe. Instrukcja w `SKILL.md` nakazuje Claude'owi: "Uruchom dokładnie ten skrypt i sprawdź błędy", co zapobiega halucynowaniu komend przez model (zasada "Solve, don't punt").
*   **Akcja 2 (Dynamic Context):** Wykorzystujemy mechanizm pre-processingu. Student dodaje w instrukcji składnię `` !`git diff` ``. 
*   **Teoria w praktyce:** System wykona tę komendę w tle i podmieni ją na gotowe zmiany z GitHuba, zanim Claude w ogóle przeczyta polecenie.
*   **Efekt lekcji:** Inspektor przed analizą sam pobiera różnice (diff) z repozytorium i uruchamia lokalne testy.

#### Lekcja 4: Izolacja i Kontrola Wywołań (Tryb Manualny vs Automatyczny)
**Co robimy:** Zarządzamy tym, kto i w jakim środowisku wywołuje Inspektora.
*   **Akcja:** Modyfikujemy YAML frontmatter. Dodajemy `disable-model-invocation: true`.
*   **Teoria w praktyce:** Dzięki tej fladze Claude traci możliwość samowolnego włączenia skilla – od teraz działa on jak dawna komenda "Slash Command", którą programista wywołuje świadomie wpisując `/code-inspector`. Studenci dodają też flagi `context: fork` oraz `agent: Explore`, dzięki czemu praca Inspektora odbywa się w całkowicie odizolowanym subagencie o uprawnieniach tylko-do-odczytu, co chroni główne okno konwersacji przed zanieczyszczeniem. Możemy tu też użyć zmiennej `$ARGUMENTS`, aby móc przekazać konkretny plik do analizy: `/code-inspector src/auth.js`.
*   **Efekt lekcji:** Inspektor to teraz bezpieczna, wywoływana na żądanie komenda, która po cichu wykonuje pracę w tle (jako subagent) i zwraca tylko podsumowanie.

#### Lekcja 5: Hooki – Żelazne zasady bezpieczeństwa
**Co robimy:** Wprowadzamy ramy bezpieczeństwa, których LLM nie może obejść.
*   **Akcja:** Definiujemy hooki (np. `PreToolUse` oraz `PostToolUse`) bezpośrednio we frontmatterze naszego pliku `SKILL.md`.
*   **Teoria w praktyce:** Dodajemy skrypt bashowy, który podczepia się pod zdarzenie `PreToolUse` dla narzędzia Bash. Jeśli Inspektor spróbuje wywołać jakąkolwiek komendę niszczącą (np. usunąć plik za pomocą `rm`), skrypt zareaguje, zwróci Exit Code 2 i wymusi status `permissionDecision: "deny"`, odsyłając modelowi informację o blokadzie. Dodajemy też `PostToolUse`, który po każdej udanej interwencji w kod automatycznie odpali formatowanie Prettier.
*   **Efekt lekcji:** Inspektor staje się idiotoodporny i bezpieczny do stosowania w środowiskach produkcyjnych.

#### Lekcja 6: MCP i Równoległość (Git Worktrees & Agent Teams)
**Co robimy:** Skalowanie do dużych zadań i komunikacja ze światem. To punkt kulminacyjny kursu.
*   **Akcja 1 (MCP):** Podłączamy do projektu istniejący serwer MCP (np. integrację z systemem Jira lub Slackiem). W `SKILL.md` uczymy Inspektora, jak go używać: "Jeśli znajdziesz błąd krytyczny, wygeneruj ticket używając serwera MCP Jira".
*   **Akcja 2 (Worktrees & Teams):** Prezentujemy potęgę flagi `--worktree` oraz trybu Agent Teams. Student uczy się, jak rozkazać Claude'owi wykreować "zespół agentów" w izolowanych gałęziach (worktrees), z których jeden weryfikuje bezpieczeństwo (Security), drugi wydajność (Performance), a trzeci sprawdza dokumentację (QA). Wszyscy współpracują w oparciu o nasz stworzony Skill.
*   **Teoria w praktyce:** Studenci widzą, jak Skill (Logika/Wiedza) współpracuje z MCP (Zewnętrzne Ręce) i Agent Teams (Równoległość). Subagenty samodzielnie wysyłają do siebie wiadomości (Direct Messaging), debatują nad błędami w architekturze i odhaczają współdzieloną listę zadań (Shared Task List).
*   **Efekt lekcji:** Powstaje wieloagentowy, autonomiczny rzeczoznawca kodu, który działa w tle, nie psuje plików źródłowych (izolacja Worktree) i samodzielnie raportuje błędy do Jiry.

#### Lekcja 7: Dystrybucja – Od lokalnego narzędzia do Otwartego Standardu
**Co robimy:** Wypuszczamy nasze dzieło w świat.
*   **Akcja:** Przygotowujemy skilla do dzielenia się nim z zespołem lub społecznością.
*   **Teoria w praktyce:** Uczymy studentów, jak zapakować foldery `code-inspector` tak, by inni programiści mogli je łatwo zainstalować korzystając ze specyfikacji `agentskills.io` oraz narzędzia CLI `npx skills install`. Pokazujemy, że nasz skill zadziała teraz nie tylko w Claude Code, ale też w OpenAI Codex, Cursorze, Windsurf czy Gemini CLI, dzięki przyjęciu uniwersalnego standardu.
*   **Efekt lekcji:** Student opuszcza kurs z potężnym, gotowym do wpisania w CV produktem, który może udostępnić na GitHubie. 

Ten układ ma potężną zaletę: pozwala na metodę „od ogółu do szczegółu”. Zaczynasz od wygenerowania prostej porady z pliku `.md`, a kończysz z wieloagentowym, bezpiecznym systemem operującym na izolowanych systemach plików za pomocą worktrees.