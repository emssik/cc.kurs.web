# Review: Weryfikacja faktow technicznych

**Zakres:** Lekcje 04.01-04.05 vs dokumentacja Claude Code

---

## Lekcja 04.01 — Settings

### OK (zgodne z dokumentacja)
- Cztery zakresy: managed > user > project > local — poprawne
- Sciezki plikow: `~/.claude/settings.json`, `.claude/settings.json`, `.claude/settings.local.json` — poprawne
- Listy (allow/deny) lacza sie ze wszystkich poziomow — poprawne
- Effort levels: low/medium/high/max — poprawne
- Aliasy modeli: sonnet, opus, haiku, opusplan — poprawne
- Prompt caching do 90% redukcji — zgodne z docs/costs

### Problemy

**F1 (linia 3, tytul):** Opis mowi "Trzy poziomy konfiguracji" ale lekcja omawia cztery. Drobna niezgodnosc w description frontmatter.
- **Fix:** Zmienic description na "Cztery poziomy konfiguracji..."

**F2 (linia 50):** Sciezka managed settings na macOS: `/Library/Application Support/ClaudeCode/managed-settings.json`. Dokumentacja podaje dokladnie te sciezke — OK. Ale warto sprawdzic czy "ClaudeCode" vs "Claude Code" (ze spacja) jest poprawne.
- **Ryzyko:** niskie, ale warto zweryfikowac z najnowszym kodem

**F3 (linia 127):** `"bypassPermissions"` jako wartosc `defaultMode` — dokumentacja mowi o `permissions.defaultMode` akceptujacym `"bypassPermissions"`. To poprawne, ale warto dodac ostrzezenie ze nie wszystkie ustawienia to umozliwiaja.
- **Fix:** Jest juz informacja o `disableBypassPermissionsMode` — wystarczajace.

**F4 (linia 175):** "Opus 4.6 domyslnie pracuje na tym poziomie [medium]" — brak potwierdzenia w dokumentacji ze medium jest domyslne dla Opus 4.6 specyficznie. Dokumentacja mowi ze effort level jest konfigurowalne, ale nie podaje domyslnej wartosci per-model.
- **Fix:** Zmienic na "domyslny effort level to medium"

**F5 (linia 309):** Zmienna `ANTHROPIC_MODEL` — dokumentacja uzywa tej zmiennej. OK.

**F6 (linia 148):** Model alias `opusplan` — w dokumentacji opisany jako alias, poprawne.

**F7 (linia 221):** `cleanupPeriodDays` z domyslna wartoscia 30 — brak potwierdzenia w dostepnej dokumentacji. Moze byc poprawne, ale nie moge zweryfikowac.
- **Ryzyko:** niskie

---

## Lekcja 04.02 — Pluginy

### OK
- Struktura pluginu z `.claude-plugin/plugin.json` — poprawna
- Katalogi: skills/, commands/, agents/, hooks/, .mcp.json, settings.json — zgodne z docs
- Namespace: `nazwa-pluginu:nazwa-skilla` — poprawne
- `/reload-plugins` do przeladowania — poprawne
- `--plugin-dir` do testowania lokalnego — poprawne
- Submission URL: `claude.ai/settings/plugins/submit` — z dokumentacji

### Problemy

**F8 (linia 47):** Plik `.lsp.json` dla code intelligence — wymieniony w strukturze, ale brak wiecej informacji w lekcji. Dokumentacja pluginow wspomina o LSP ale szczegoly sa skape. OK jako wzmianka.

**F9 (linia 169):** "Komendy to proste pliki markdown — identyczne jak custom slash commands z lekcji 11-12" — odwolanie do "lekcji 11-12" jest niejasne. W kursie nie ma numeracji "11-12" w module 04. To prawdopodobnie odwolanie do modulu 01 lub 02.
- **Fix:** Ukonkretnij odwolanie — np. "z modulu 02" lub "z wczesniejszych lekcji"

**F10 (linia 189):** "Agenty to pliki markdown z frontmatterem YAML — takie same jak subagenty z lekcji 02.04-05" — poprawne odwolanie.

**F11 (linia 267-268):** "Na razie tylko klucz `agent` jest wspierany w `settings.json` pluginu" — trudne do zweryfikowania, ale dokumentacja pluginow mowi o agent key. OK.

---

## Lekcja 04.03 — CI/CD

### OK
- `claude -p` / `--print` — poprawne
- `--allowedTools` ze skladnia regul uprawnien — poprawne
- `--output-format text/json/stream-json` — poprawne
- Pole `result` w JSON output — poprawne
- `--json-schema` i `structured_output` — zgodne z dokumentacja headless
- `--append-system-prompt` i `--append-system-prompt-file` — poprawne
- `--system-prompt` calkowicie zastepuje domyslny — poprawne
- `--continue` i `--resume` — poprawne
- `anthropics/claude-code-action@v1` — poprawne
- `/install-github-app` — poprawne
- `CLAUDE_CODE_DISABLE_CRON` i `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS` — poprawne

### Problemy

**F12 (linia 38-39):** Wymienione "sterowanie zdalne (`claude remote-control`)" w celach lekcji, ale NIE omowione w tresci lekcji. To obietnica bez pokrycia.
- **Fix:** Albo dodaj sekcje o remote-control, albo usun z celow lekcji.

**F13 (linia 398):** "Oficjalna nazwa to teraz 'Agent SDK CLI'" — dokumentacja uzywa terminu "SDK" i "headless mode". Termin "Agent SDK CLI" nie jest formalnie uzywany w dokumentacji jako oficjalna nazwa trybu -p.
- **Fix:** Zmienic na "W dokumentacji opisywany tez jako 'headless mode' lub 'SDK usage'"

---

## Lekcja 04.04 — Agent Teams

### OK
- Flaga `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` — poprawna
- Tryby: in-process, split panes (tmux/iTerm2) — poprawne
- Dziedziczenie modelu i uprawnien od lidera — poprawne
- `--dangerously-skip-permissions` dziedziczone — poprawne (nazwa flagi nieaktualna — teraz to raczej `--dangerously-skip-permissions` lub per-ustawienie, ale logika poprawna)
- Brak zagniezdzonych zespolow — poprawne
- Hooki: TeammateIdle, TaskCompleted — poprawne z docs
- Exit code 2 dla feedbacku — poprawne

### Problemy

**F14 (linia 132-138):** Tabela z 4 kolumnami (Element, Rola). Czekaj — to 2 kolumny, OK. Ale zasada z CLAUDE.md mowi "unikaj tabel markdown z 4+ kolumnami". Ta tabela ma 2 kolumny — poprawna.

**F15 (linia 136-137):** Sciezki `~/.claude/tasks/{team-name}/` i `~/.claude/teams/{team-name}/config.json` — dokumentacja agent-teams nie podaje tych sciezek explicite. Moga byc implementacyjnym detalem, ktory sie zmieni.
- **Ryzyko:** srednie — lepiej je usunac lub oznaczyc jako "moze sie zmienic"

**F16 (linia 298):** "Agent Teams zuzywaja ~7x wiecej tokenow niz standardowa sesja, gdy czlonkowie pracuja w plan mode" — to specyficzna liczba. Dokumentacja costs mowi o "significantly more tokens" ale nie podaje mnoznika 7x.
- **Fix:** Zmienic na "wielokrotnie wiecej" lub "kilkukrotnie wiecej" bez podawania konkretnego mnoznika

**F17 (linia 148):** `Shift+Down` do przelaczania czlonkow — zgodne z dokumentacja agent-teams.

**F18 (linia 208):** `Ctrl+T` pokazuje liste zadan — nie moge zweryfikowac z dokumentacja. Moze byc poprawne, ale ryzyko nieaktualnosci.
- **Ryzyko:** niskie

---

## Lekcja 04.05 — Voice, Performance, Summary

### OK
- Voice Mode push-to-talk — poprawne (z docs interactive-mode)
- STT 20+ jezykow — poprawne
- Auto-compaction ~95% — zgodne z docs/costs
- `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` — poprawne
- Deferred tool loading przy 10% okna — poprawne
- `ENABLE_TOOL_SEARCH=auto:5` — poprawne
- `DISABLE_PROMPT_CACHING` — poprawne
- `/compact` z instrukcjami focus — poprawne
- `/context`, `/cost` — poprawne
- Opus 4.6 i Sonnet 4.6 z 1M tokenow — poprawne
- `/model opus[1m]` i `/model sonnet[1m]` — poprawne
- `/btw` — poprawne
- Plan mode `Shift+Tab` — poprawne

### Problemy

**F19 (linia 107):** `DISABLE_PROMPT_CACHING_OPUS=1` — dokumentacja mowi o `DISABLE_PROMPT_CACHING_HAIKU`. Wariant `_OPUS` nie jest potwierdzony.
- **Fix:** Zmienic na `DISABLE_PROMPT_CACHING_HAIKU` (jak w lekcji 01 — tam jest poprawnie) lub sprawdzic czy wariant _OPUS istnieje.

**F20 (linia 180-186):** Tabela z 4 kolumnami (Sytuacja, Model, Dlaczego) — to 3 kolumny. Mniej niz 4, wiec OK wg zasad.

**F21 (linia 237):** "Na planach Max, Team i Enterprise Opus automatycznie uzywa 1M" — dokumentacja mowi o 1M kontekscie dla Max/Team/Enterprise. OK.

---

## Podsumowanie

**Faktow zweryfikowanych:** ~50
**Problemow znalezionych:** 11 (F1-F21, z czego 10 istotnych)
**Krytyczne:** F12 (obietnica bez pokrycia — remote-control), F16 (niesprawdzony mnoznik 7x), F19 (zmienna DISABLE_PROMPT_CACHING_OPUS vs HAIKU)
**Srednie:** F1, F4, F9, F13, F15
**Niskie:** F2, F7, F8, F10, F11, F14, F17, F18, F20, F21
