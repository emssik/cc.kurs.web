---
lesson: "02.06"
title: "Hooki w Claude Code cz. 1: deterministyczny autopilot"
description: "Powiadomienia, formatowanie i proste logi — żeby Claude zawsze robił to samo"
module: "02-wbudowane-narzedzia"
---

# Hooki w Claude Code cz. 1: deterministyczny autopilot

Karina ma dziś prosty cel: „nie chcę już pilnować AI jak stażysty”.

Wczoraj Claude zrobił refaktor. Kod działał. Tylko… wyglądał jakby pisały go trzy osoby: 2 spacje tu, 4 tam, a w jednym pliku w ogóle bez formatowania.

— Przecież prosiłam: *zawsze formatuj kod* — mówi Karina.

— I zawsze będzie „prawie zawsze” — odpowiada Paweł. — Prompt podbija prawdopodobieństwo. Hook daje gwarancję.

To jest lekcja o tej gwarancji.

> **Moduł:** Wbudowane narzędzia (Tools)  
> **Poziom:** Średnio-zaawansowany (wystarczy ogarniać podstawy terminala)  
> **Czas:** 25–35 minut

## Co wyniesiesz z tej lekcji (praktycznie)

- Rozumiesz, czym hooki różnią się od promptów (`CLAUDE.md`).
- Ustawiasz powiadomienie, gdy Claude czeka na Twoją decyzję.
- Robisz automatyczne formatowanie po każdej edycji pliku przez Claude’a.
- Dokładasz prosty dziennik komend z terminala (żeby „wiedzieć co się stało”).
- Wiesz, gdzie trzymać hooki: globalnie vs per-projekt.

Ważna zasada tego kursu: **Ty opisujesz wymagania, Claude przygotowuje pliki**, a Ty robisz szybkie sprawdzenie (bo hooki działają z Twoimi uprawnieniami).

> Uwaga: hooki uruchamiają się z Twoimi uprawnieniami. To „autopilot”, ale też „pilarka”. Wklejaj tylko to, co rozumiesz i co przetestowałeś.

---

## 1. Hooki w 3 zdaniach (bez metafizyki)

Hook w Claude Code ma trzy elementy:

1. **Event (czyli „kiedy”):** np. `Notification`, `PostToolUse`, `PreToolUse`.
2. **Matcher (czyli „dla czego”):** np. `Bash` albo `Edit|Write`.
3. **Akcja (co):** komenda/skrypt, który ma się wykonać.

Jeśli nie jesteś techniczny: potraktuj to jak trzy kliknięcia w ustawieniach — **wybierasz moment**, **ustawiasz filtr**, **wklejasz co ma się uruchomić**.

Szybkie tłumaczenie nazw z przykładów:

- `Bash` = terminal (uruchamianie komend).
- `Edit|Write` = edycja lub zapis pliku.

Najważniejsza różnica:

- **Prompt / `CLAUDE.md`**: „prośba” do modelu (może zadziałać, może pominąć).
- **Hook**: kod uruchamiany *zawsze* w odpowiednim momencie (deterministycznie).

---

## 2. Gdzie to się konfiguruje (i czemu to ważne)

Masz dwa typy ustawień:

- **User (globalnie):** `~/.claude/settings.json` — działa we wszystkich projektach.
- **Project (w repo):** `.claude/settings.json` — można commitować i współdzielić w zespole.

Najwygodniejszy start: konfiguracja przez komendę zaczynającą się od `/`, czyli `/hooks` (Claude Code sam dopisze ustawienia do właściwego pliku).

### Dla ciekawskich: inne eventy i opcje (żebyś wiedział, że istnieją)

W tej lekcji skupiamy się na trzech eventach „do codziennej roboty”: `Notification`, `PreToolUse`, `PostToolUse`.

W dokumentacji spotkasz też eventy cyklu życia, m.in.:

- `UserPromptSubmit` — tuż po wysłaniu Twojej wiadomości (walidacja/uzupełnienie promptu zanim ruszy praca).
- `Stop` — gdy Claude kończy generować odpowiedź (moment na „domknięcie” etapu: np. uruchom testy raz na odpowiedź).
- `PermissionRequest` — gdy pojawia się okno z prośbą o uprawnienia (możesz automatycznie allow/deny dla powtarzalnych, bezpiecznych akcji).
- `PreCompact` — tuż przed kompresją kontekstu rozmowy (backup ważnych informacji, zanim wypadną z kontekstu).
- `PostToolUseFailure` — osobne zdarzenie na błędy narzędzi (logowanie awarii inaczej niż sukcesów).
- `SessionEnd` — sprzątanie na koniec sesji (np. pliki tymczasowe).
- `SubagentStart` / `SubagentStop` — śledzenie cyklu życia subagentów (gdy robisz bardziej złożoną orkiestrację).

I jeszcze dwie „cegiełki”, które warto kojarzyć, nawet jeśli nie wdrażasz ich dziś:

- Hook nie musi być tylko `type: "command"`. W dokumentacji znajdziesz też `type: "prompt"` i `type: "agent"` — w tej lekcji trzymamy się `command`, bo jest najbardziej deterministyczny i najłatwiejszy do debugowania.
- Zaawansowana kontrola przepływu: `async: true` (hook w tle) i `updatedInput` (hook może zmienić parametry narzędzia przed wykonaniem). To już „middleware” — używaj ostrożnie.

---

## Misja 1 (5 min): „Nie gapię się w terminal” — powiadomienia, gdy Claude czeka

### Po co?

Claude często kończy krok i czeka na Twoją decyzję (np. uprawnienia do uruchomienia `Bash`). Jeśli w tym czasie jesteś w innym oknie — tracisz minuty.

### Jak to zrobić

1. W Claude Code wpisz `/hooks`.
2. Wybierz event `Notification`.
3. Matcher zostaw pusty (łapie wszystkie powiadomienia).
4. Dodaj hook typu `command` (czyli: „uruchom tę komendę w systemie”).

**macOS (wbudowane):**

```bash
osascript -e 'display notification "Claude czeka na Twoją decyzję" with title "Claude Code" sound name "Glass"'
```

**Linux (pakiet `libnotify-bin`):**

```bash
notify-send 'Claude Code' 'Claude czeka na Twoją decyzję' --urgency=normal
```

### Test

Poproś Claude’a o uruchomienie komendy w terminalu (`Bash`), np. `ls`. W momencie, gdy pojawi się prośba o zgodę, powinno wyskoczyć powiadomienie.

---

## Misja 2 (10–15 min): „Prettier bez proszenia” — formatowanie po każdej edycji

### Problem

Prompt „zawsze uruchamiaj Prettier” działa… dopóki nie przestanie. A Ty chcesz, żeby kod był sformatowany *za każdym razem*, bez dyskusji.

### Pattern (czyli podejście): logika w skrypcie, konfiguracja w `.claude/settings.json`

Da się to zrobić jedną linijką w JSON, ale to jest trudne do debugowania i łatwe do zepsucia cytowaniami. Zróbmy to czytelnie.

### Krok A: dodaj skrypt `format-code.sh`

Nie chodzi o to, żebyś pisał ten skrypt ręcznie. Chodzi o to, żebyś **wiedział, że możesz go mieć** i umiał go sensownie zlecić Claude’owi.

**Jak to zlecić Claude’owi (polecenie do wklejenia):**

```
Create a Claude Code hook: PostToolUse for Edit|Write.
I want a script `.claude/hooks/format-code.sh` that:
- reads JSON from stdin and extracts `.tool_input.file_path`,
- only runs on files inside `$CLAUDE_PROJECT_DIR`,
- if the file extension is ts/tsx/js/jsx/json/md, runs Prettier via `node_modules/.bin/prettier --write`,
- does not error if Prettier is missing,
- uses `#!/usr/bin/env bash` and `set -euo pipefail`.

Return: (1) the full file contents, (2) the `chmod +x` command, (3) the `.claude/settings.json` snippet, (4) a short test (printf with a sample JSON payload).
```

Poniżej masz gotową wersję referencyjną. Jeśli Claude wygeneruje inną, porównaj logikę i wybierz prostszą.

Utwórz plik `.claude/hooks/format-code.sh` w projekcie:

> `jq` to małe narzędzie, które pozwala skryptowi „wyciągnąć” z paczki informacji od Claude Code ścieżkę pliku, który właśnie został zmieniony. Jeśli nie masz `jq`, zainstaluj:
>
> - macOS: `brew install jq`
> - Ubuntu/Debian: `sudo apt-get install jq`

```bash
#!/usr/bin/env bash
set -euo pipefail

input="$(cat)"
project_dir="${CLAUDE_PROJECT_DIR:-}"
if [ -z "$project_dir" ]; then
  exit 0
fi
file_path="$(jq -r '.tool_input.file_path // empty' <<<"$input")"

[ -z "$file_path" ] && exit 0

# Support both absolute and project-relative paths
if [[ "$file_path" != /* ]]; then
  file_path="$project_dir/$file_path"
fi

# Safety: only format files inside the project (resolve `..` if possible)
project_dir_real="$project_dir"
file_path_real="$file_path"
if command -v realpath >/dev/null 2>&1; then
  project_dir_real="$(realpath "$project_dir")"
  file_path_real="$(realpath "$file_path")"
elif command -v python3 >/dev/null 2>&1; then
  project_dir_real="$(python3 -c 'import os,sys; print(os.path.realpath(sys.argv[1]))' "$project_dir")"
  file_path_real="$(python3 -c 'import os,sys; print(os.path.realpath(sys.argv[1]))' "$file_path")"
fi

case "$file_path_real" in
  "$project_dir_real"/*) ;;
  *) exit 0 ;;
esac

case "$file_path" in
  *.ts|*.tsx|*.js|*.jsx|*.json|*.md)
    prettier_bin="$project_dir/node_modules/.bin/prettier"
    if [ -x "$prettier_bin" ]; then
      "$prettier_bin" --write "$file_path" >/dev/null 2>&1 || true
    fi
    ;;
esac
```

Nadaj prawa wykonania:

```bash
chmod +x .claude/hooks/format-code.sh
```

To polecenie tylko „oznacza plik jako uruchamialny”. Jeśli chcesz, Claude może Ci też przygotować dokładnie tę komendę do wklejenia.

### Krok B: podepnij go hookiem `PostToolUse`

W `.claude/settings.json` (projektowo) dodaj:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/format-code.sh"
          }
        ]
      }
    ]
  }
}
```

### Test

Poproś Claude’a: “Add `console.log('test')` to `src/index.ts`.” Po zapisie pliku hook odpali Prettier (bez udziału modelu).

### Kiedy warto (a kiedy nie warto) odpalać Prettier po każdym `PostToolUse`?

To, że „da się” uruchamiać Prettier automatycznie po każdej edycji, nie znaczy, że zawsze to ma sens. To jest typowy przykład, gdzie warto znać opcje i dobrać „złoty środek”.

**Warto używać `PostToolUse` (po każdej edycji pliku), gdy:**

- repo jest małe/średnie, a formatowanie jednego pliku jest szybkie,
- Claude robi dużo drobnych zmian i chcesz, żeby diff (czyli podgląd „co się zmieniło”) od razu był czysty,
- pracujesz sam albo masz jasny standard formatowania w projekcie,
- chcesz „feedback” natychmiast (format od razu pokazuje, czy kod jest spójny).

**Lepiej NIE używać (albo ograniczyć), gdy:**

- formatowanie pliku trwa wyraźnie długo i czujesz lag po każdej zmianie,
- Claude edytuje ten sam duży plik 20 razy w jednej sesji (formatowanie powtarza się bez wartości),
- formatowanie robi dużo „szumu” w historii zmian (np. podczas refaktoru chcesz najpierw dopiąć logikę, potem uporządkować styl),
- w zespole i tak wymuszasz formatowanie w innym miejscu (pre-commit / CI) i lokalny hook tylko przeszkadza.

### Złoty środek: 3 strategie (od „najbardziej wygodnej” do „najbardziej rozsądnej”)

1) **Format po edycji (tu i teraz)**  
Najwygodniejsze podczas pracy, ale potencjalnie najcięższe wydajnościowo.

2) **Format „raz na odpowiedź” (`Stop`) albo „raz na etap” (manualnie)**  
Jeśli czujesz, że `PostToolUse` jest zbyt częste, przenieś formatowanie na moment, kiedy Claude kończy swoją odpowiedź (`Stop`). To wciąż automatyzuje, ale nie odpala się po każdej mikro-edycji.

3) **Format w Gicie (pre-commit) + kontrola w CI**  
Najlepsze dla zespołu: wszyscy mają ten sam standard, a formatowanie dzieje się wtedy, kiedy ma sens (przed commitem / w pipeline). To też rozwiązuje problem „Claude sformatował, ale ja zapomniałem”.

> Prosto mówiąc: **CI** to „automatyczne sprawdzenie na serwerze” (np. przy PR). **Pre-commit** to „automatyczny krok tuż przed commitem” na Twoim komputerze.
>
> W praktyce często wygrywa kombinacja: **CI wymusza `prettier --check`**, a lokalnie (opcjonalnie) masz **pre-commit** albo hook w Claude, zależnie od projektu.

### Alternatywa: Prettier jako git hook (kiedy chcesz formatować dopiero na commit)

Jeśli używasz Node, popularny pattern to `lint-staged` (formatuje tylko pliki, które faktycznie idą do commita). Wtedy nie ma „formatowania w kółko” podczas pracy — a standard i tak jest dowieziony.

---

### Częste wpadki

- Skrypt się nie uruchamia: sprawdź `chmod +x`.
- Prettier się nie odpala: upewnij się, że jest w projekcie (`node_modules/.bin/prettier`).
- Formatowanie jest wolne: zawęź rozszerzenia.

---

## Misja 3 (5–10 min): „Czarna skrzynka” — logowanie komend bash

Po tygodniu kliknięć „Allow” chcesz umieć odpowiedzieć na pytanie: „co tak naprawdę było uruchamiane?”.

### Krok A: skrypt `log-bash.sh`

Nie pisz tego ręcznie — zleć to Claude’owi i tylko sprawdź, czy nie loguje sekretów.

**Jak to zlecić Claude’owi:**

```
Create a Claude Code hook: PreToolUse for Bash.
I want a script `.claude/hooks/log-bash.sh` that:
- reads JSON from stdin,
- extracts `.tool_input.command` and `.tool_input.description`,
- appends a timestamped line to `$HOME/.claude/logs/bash.log`,
- does nothing if `command` is empty,
- uses `#!/usr/bin/env bash` and `set -euo pipefail`.

Return: the full file contents, `chmod +x`, and the `.claude/settings.json` snippet for PreToolUse/Bash.
```

Poniżej jest wersja referencyjna (minimalna):

Utwórz plik `.claude/hooks/log-bash.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail

input="$(cat)"
cmd="$(jq -r '.tool_input.command // empty' <<<"$input")"
desc="$(jq -r '.tool_input.description // empty' <<<"$input")"

[ -z "$cmd" ] && exit 0

mkdir -p "$HOME/.claude/logs"
printf '[%s] %s — %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$cmd" "$desc" >> "$HOME/.claude/logs/bash.log"
```

I nadaj prawa wykonania:

```bash
chmod +x .claude/hooks/log-bash.sh
```

### Krok B: podepnij `PreToolUse` dla `Bash`

W `.claude/settings.json` (projektowo lub globalnie — jak wolisz) dodaj:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/log-bash.sh"
          }
        ]
      }
    ]
  }
}
```

### Szybki podgląd

```bash
tail -n 20 ~/.claude/logs/bash.log
```

---

## 3. Kiedy hook, a kiedy prompt?

Użyj hooka, gdy:

- coś ma się stać **zawsze** (format, log, notyfikacja),
- chcesz „automatu” bez angażowania modelu,
- reguła jest techniczna i prosta (nie wymaga rozumowania).

Użyj prompta/`CLAUDE.md`, gdy:

- zasada jest **miękka** i zależy od kontekstu („pisz zwięźle”, „trzymaj ton marki”),
- chcesz, żeby AI samo decydowało, kiedy coś zastosować.

Pro tip (żeby nie mieszać pojęć): „prompt” może znaczyć dwie rzeczy:

- zwykły prompt / `CLAUDE.md` (czyli instrukcje dla modelu),
- albo *hook* typu `prompt` (czyli hook, który sam wywołuje szybki model do oceny sytuacji).

W Lekcji 06 robimy tylko `type: "command"`, bo to najprostszy sposób na deterministyczny autopilot.

---

## 4. Podsumowanie + małe zadanie

Masz już trzy pierwsze „autopiloty”:

- `Notification` → nie tracisz czasu na czekanie.
- `PostToolUse + Edit|Write` → formatowanie robi się samo.
- `PreToolUse + Bash` → masz ślad operacji.

**Zadanie (10 min):** dopasuj Misję 2 do swojej roboty:

- Frontend: dodaj `*.css|*.scss` i odpal formatter, którego używacie.
- Python: zamiast Prettier odpal `black` lub `ruff format`.
- Go: odpal `gofmt -w`.

W Lekcji 07 zrobimy wersję „pro”: bramka bezpieczeństwa, wstrzyknięcie kontekstu na start i audyt, który da się analizować.

---

## Linki

- Claude Code Hooks: https://code.claude.com/docs/en/hooks
- Hooks guide (więcej przykładów): https://code.claude.com/docs/en/hooks-guide
- `jq` manual: https://jqlang.org/manual/

---

**Następna lekcja:** Lekcja 07 – Hooki cz. 2: bezpieczeństwo, pamięć i audyt  
**Poprzednia lekcja:** Lekcja 05 – Subagenty cz. 2 (orkiestracja)
