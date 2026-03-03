To doskonały moment na wprowadzenie tematu Skilli (Umiejętności) w Twoim kursie. W najnowszych wersjach Claude Code (od lutego 2026), Skille przestały być tylko zbiorem promptów, a stały się **otwartym standardem (Agent Skills)** i centralnym punktem, który spaja wszystkie elementy, których już nauczyłeś studentów (MCP, Hooki, Subagenty, Komendy) w spójne, zautomatyzowane przepływy pracy.

Oto kompleksowa propozycja struktury modułu o Skillach, podzielona na logiczne lekcje, która płynnie połączy dotychczasową wiedzę i pokaże pełną moc agentową Claude Code.

---

### Moduł: Skille (Agent Skills) – Serce Autonomicznego Claude Code

#### Lekcja 1: Wprowadzenie do Skilli i ich Anatomia
**Cel:** Zrozumienie, czym technicznie są skille i jak zastępują "wklejanie długich promptów".
*   **Czym są Skille?** Przejście od promptów do "katalogów wiedzy" (pakiety zawierające instrukcje, skrypty wykonawcze i materiały referencyjne).
*   **Struktura katalogu Skilla:**
    *   `SKILL.md` (serce skilla: YAML frontmatter + markdown z instrukcjami).
    *   `scripts/` (opcjonalne skrypty wykonywalne np. w Python/Bash).
    *   `references/` (baza wiedzy, np. zasady stylu, dokumentacja API).
    *   `assets/` (szablony, obrazki, itp.).
*   **Ewolucja Custom Commands:** Wyjaśnienie, że w nowym Claude Code tradycyjne *Slash Commands* zostały połączone ze Skillami. Komenda to teraz po prostu Skill z odpowiednimi flagami we frontmatterze.
*   **Gdzie żyją Skille?** Omówienie zasięgu: globalne (w `~/.claude/skills/`), projektowe (w `.claude/skills/`) oraz z wtyczek (Plugins).

#### Lekcja 2: Architektura Progressive Disclosure (Magia optymalizacji tokenów)
**Cel:** Zrozumienie, jak Skille oszczędzają okno kontekstowe, co jest ich największą zaletą.
*   **Problem przepełnionego kontekstu:** Wyjaśnienie, dlaczego trzymanie wszystkiego w `CLAUDE.md` lub głównym prompcie niszczy wydajność modelu.
*   **Trzy poziomy ładowania (Progressive Disclosure):**
    1.  *Poziom 1 (Metadane):* Na starcie sesji Claude ładuje tylko nazwę i opis (ok. 30-50 tokenów na skill).
    2.  *Poziom 2 (Instrukcje):* Gdy użytkownik poprosi o coś pasującego do opisu, Claude ładuje pełny plik `SKILL.md`.
    3.  *Poziom 3 (Zasoby):* Skrypty i pliki z folderu `references/` są czytane przez Claude (używając np. narzędzia *Bash* lub *Read*) tylko, jeśli workflow tego w danej sekundzie wymaga.
*   **Jak pisać perfekcyjne opisy (Descriptions):** Znaczenie słów kluczowych (triggerów) w polu `description`, aby Claude wiedział, kiedy autonomicznie uruchomić skilla.

#### Lekcja 3: Łączenie Klocków (MCP, Subagenty i Hooki wewnątrz Skilli) 
**Cel:** Integracja wiedzy z poprzednich lekcji. To najważniejsza lekcja w module.
*   **Skille a MCP (Wiedza vs Połączenie):** Złota zasada: *MCP to narzędzia w kuchni (dostęp do bazy, GitHuba, Slacka), a Skille to przepisy kulinarne.* Sam serwer MCP daje możliwości, ale Skill uczy Claude'a, jak ich używać zgodnie ze standardami firmy.
    *   *Przykład:* Skill, który zbiera logi (przez MCP), analizuje je i wysyła raport na Slacka (przez MCP).
*   **Skille w izolowanych Subagentach:** Jak użyć flagi `context: fork` i `agent: Explore` we frontmatterze skilla. Dzięki temu wykonanie skilla odbywa się w odciętym subagencie, nie zaśmiecając głównej konwersacji.
*   **Hooki na poziomie Skilla:** Definiowanie hooków (np. `PreToolUse`, `PostToolUse`) bezpośrednio w YAML skilla. Hooki te żyją tylko wtedy, gdy skill jest aktywny. Przydatne np. do automatycznego uruchamiania lintera po wygenerowaniu kodu przez konkretnego skilla.

#### Lekcja 4: Projektowanie i Best Practices (Inżynieria Skilli)
**Cel:** Nauczenie studentów tworzenia niezawodnych skilli produkcyjnych.
*   **Stopnie swobody (Degrees of Freedom):** Kiedy dać Claude'owi swobodę (np. burza mózgów, design), a kiedy wymusić sztywne ramy (np. migracje bazy danych – polecenie "Uruchom dokładnie ten skrypt bash").
*   **Zasada "Solve, don't punt":** Pisanie skryptów pomocniczych (Python/Bash) w taki sposób, aby same radziły sobie z błędami (np. tworzyły brakujący plik, używały timeoutów), zamiast zrzucać rozwiązywanie prostych problemów na model LLM.
*   **Wzorce projektowe skilli:**
    *   *Checklist Pattern:* Zmuszenie Claude'a do wygenerowania checklisty postępów i odhaczania jej przy wieloetapowych zadaniach.
    *   *Feedback Loops:* Zmuszenie modelu do samodzielnej weryfikacji. Wzorzec: Wygeneruj -> Uruchom walidator (np. skrypt testowy z folderu `scripts/`) -> Popraw błędy -> Kontynuuj.
*   **Pre-processing (Shell Injection):** Użycie składni `` !`command` `` w `SKILL.md` do wstrzykiwania dynamicznego kontekstu (np. `!`gh pr diff``) zanim Claude w ogóle przeczyta prompta.

#### Lekcja 5: Kontrola Wywołań (Kto i kiedy może użyć Skilla)
**Cel:** Zarządzanie interakcją człowiek-maszyna.
*   Studenci poznają kluczowe flagi YAML z frontmattera kontrolujące zachowanie:
    *   `disable-model-invocation: true`: Claude nie może użyć tego sam. Wymaga wpisania komendy z palca przez usera (np. `/deploy-to-prod`). Zastępuje to dawne "Custom Commands".
    *   `user-invocable: false`: Znika z menu użytkownika. Skill działa "w tle" (np. wiedza o specyficznej architekturze bazy danych, po którą Claude sięga sam).
    *   Zmienne systemowe: Użycie `$ARGUMENTS`, `$0`, `$1` oraz `${CLAUDE_SESSION_ID}` do przekazywania parametrów od użytkownika do skilla.

#### Lekcja 6: Tworzenie, Testowanie i Ewaluacja Skilli
**Cel:** Praktyczny warsztat z tworzenia skilla i mierzenia jego jakości.
*   **Meta-skill `skill-creator`:** Jak użyć oficjalnego skilla od Anthropic, który pomaga budować, strukturyzować i walidować inne skille (skille tworzące skille).
*   **Evaluation-driven development:** Jak testować skille. Budowanie 3 przypadków użycia *zanim* napisze się instrukcje.
*   **Troubleshooting:** Co zrobić, gdy skill włącza się za często (overtriggering) albo wcale (undertriggering) – praca z polem `description`.
*   **Monitorowanie limitu tokenów:** Kiedy podzielić jeden wielki `SKILL.md` na kilka mniejszych plików referencyjnych ładowanych "leniwie" (lazy loading) w celu ucieczki od pułapki 500+ linii.

#### Lekcja 7: Dystrybucja, Ekosystem i Bezpieczeństwo Skilli (Zakończenie)
**Cel:** Przejście od narzędzia lokalnego do poziomu "Enterprise".
*   **Otwarty Standard (npx skills):** Wyjaśnienie, że standard *Agent Skills* jest uniwersalny. Skille napisane dla Claude Code działają też w OpenAI Codex, Cursor, Gemini CLI i innych środowiskach (projekt `skills.sh`).
*   **Korzystanie z Marketplaces i Pluginów:** Pobieranie gotowych rozwiązań (np. frameworki od Vercel, Atlassian, Stripe) przy użyciu poleceń `/plugin install`.
*   **Cyberbezpieczeństwo (Supply Chain Risks):** 
    *   Omówienie ryzyka pobierania cudzych skilli (mogą zawierać złośliwe skrypty kradnące tokeny czy zmienne `.env` – przypomnienie tzw. incydentu "ClawHub").
    *   Używanie flagi `allowed-tools` we frontmatterze do ograniczania tego, co dany skill może zrobić (np. zablokowanie dostępu do `Bash`).
    *   Wykorzystanie hooka `ConfigChange` i polityki `disableAllHooks` do ochrony repozytorium przed złośliwymi zmianami dokonywanymi przez agentów.

### Wskazówka trenerska:
Jako zadanie zaliczeniowe po tym module (Capstone Project), możesz poprosić studentów o:
1. Skonfigurowanie serwera MCP pobierającego np. dane o pogodzie lub statusie z GitHuba.
2. Stworzenie Skilla, który ma przypisany `context: fork` (wymuszenie subagenta).
3. Napisanie w nim Hooka `PreToolUse`, który blokuje operacje `Write`.
4. Sprawienie, by ten Skill przez MCP pobrał dane, przeanalizował je i wygenerował estetyczny raport markdown, całkowicie chroniąc główne okno kontekstowe.