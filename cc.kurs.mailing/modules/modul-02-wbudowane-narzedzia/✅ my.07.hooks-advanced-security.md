---
lesson: "02.07"
title: "Hooki w Claude Code cz. 2: bezpieczeństwo, pamięć i audyt"
description: "PreToolUse jako bramka, SessionStart jako zastrzyk kontekstu, PostToolUse jako czarna skrzynka"
module: "02-wbudowane-narzedzia"
---

# Hooki w Claude Code cz. 2: bezpieczeństwo, pamięć i audyt

Karina odpala Claude Code w trybie „lecimy szybko”: dużo zmian, dużo `Bash`, mało klikania.

— To jest ten moment, kiedy AI daje największy boost — mówi.

Paweł patrzy na to jak na jazdę bez pasów.

— Boost jest super. Tylko najpierw zróbmy trzy rzeczy:
1) bramkę bezpieczeństwa,  
2) kontekst na start sesji,  
3) czarną skrzynkę (log), żeby dało się to potem wyjaśnić.

> **Poziom:** Zaawansowany  
> **Czas:** 35–45 minut  
> **Wymaga:** Lekcji 06 (podstawy hooków i pliki `settings.json`)

## Co wyniesiesz (praktycznie)

- Blokujesz ryzykowne komendy i dotykanie sekretów (`PreToolUse`).
- Wstrzykujesz kontekst projektu przy starcie sesji (`SessionStart`).
- Logujesz akcje do audytu/debugowania (`PostToolUse`).
- Piszesz hooki tak, żeby nie psuły JSON-a i dało się je testować.

W tym module chodzi o to, żebyś znał możliwości i umiał je zlecać: **Ty definiujesz politykę i wymagania, Claude generuje skrypty**, a Ty je weryfikujesz.

> Uwaga: to są guardrails (barierki bezpieczeństwa), nie magia. Hooki są świetne w „kontroli wykonania” (narzędzia/komendy/pliki), ale nie rozwiążą wszystkich problemów prompt injection (gdy treść „z zewnątrz” próbuje sterować modelem) — szczególnie jeśli sam wstrzykujesz do kontekstu treści z zewnątrz.

---

## 0. Jedno narzędzie, które robi różnicę: `jq`

Claude Code przekazuje do hooka „paczkę informacji” (np. jaka komenda ma być uruchomiona albo jaki plik był edytowany). Ten pakiet trafia do skryptu jako tekst na wejściu (to jest właśnie `stdin`).

Najwygodniej wyciągać z niego konkretne rzeczy narzędziem `jq` — np. „podaj mi ścieżkę pliku” albo „podaj mi treść komendy”.

Jeśli słowo `stdin` brzmi technicznie: zignoruj je. W praktyce chodzi o to, że hook dostaje od Claude Code tekst, a `jq` pomaga szybko znaleźć w nim to, co ważne.

Instalacja:

```bash
# macOS
brew install jq

# Ubuntu/Debian
sudo apt-get install jq

# verify
jq --version
```

Jeśli nie chcesz `jq`, możesz robić to w Pythonie (Claude może Ci wygenerować skrypt), a JSON parsować standardową biblioteką (`json`). W tej lekcji zostajemy przy `bash + jq`, bo najłatwiej to wdrożyć i debugować małymi krokami.

---

## 1. Jak myśleć o hookach „pro” (krótko)

Masz trzy „archetypy”:

1. **Gate (PreToolUse):** „zanim coś wykonasz, sprawdź politykę”.
2. **Context (SessionStart):** „zanim zaczniemy, daj mi fakty”.
3. **Audit (PostToolUse):** „po fakcie zapisz ślad”.

I jedna ważna zasada:

> Jeśli hook ma rosnąć, trzymaj logikę w skrypcie w `.claude/hooks/`, a w `.claude/settings.json` miej tylko wywołanie.

---

## Misja 1 (15–20 min): Strażnik — blokujemy ryzyko zanim się wydarzy (`PreToolUse`)

### Co blokujemy na start (minimalny sensowny zestaw)

- destrukcyjne operacje (`rm -rf`, `mkfs`, `dd if=...`)
- eskalację uprawnień (`sudo`)
- „pobierz i uruchom” (`curl ... | bash`)
- edycję sekretów (`.env`, `.env.*`)

To jest celowo *denylist* (lista zakazów). W bardziej krytycznych środowiskach przechodzi się na *allowlist* (lista dozwolonych komend), ale to temat na później.

Prosto:

- **denylist**: „blokuj tylko to, co wygląda niebezpiecznie”.
- **allowlist**: „pozwól tylko na kilka rzeczy, resztę blokuj”.

### Krok A: skrypt `.claude/hooks/security-gate.sh`

Tego też nie piszesz ręcznie. Ty masz określić politykę („co blokujemy”), a Claude ma wygenerować skrypt.

**Jak to zlecić Claude’owi (polecenie do wklejenia):**

```
Create a Claude Code security gate hook.
I need a script `.claude/hooks/security-gate.sh` for the PreToolUse event that:
- reads JSON from stdin,
- if tool_name == Bash: blocks `rm -rf`, `sudo`, `mkfs`, `dd if=...`, and the pattern `curl ... | bash/sh`,
- if tool_name == Edit or Write: blocks edits to `.env` and `.env.*` files,
- returns valid JSON via `jq -n` using this shape:
  hookSpecificOutput: { hookEventName:"PreToolUse", permissionDecision:"allow|deny|ask", permissionDecisionReason:"..." }
- uses `#!/usr/bin/env bash` and `set -euo pipefail`.

Return: (1) the full file contents, (2) `chmod +x`, (3) the `.claude/settings.json` snippet for Bash and Edit|Write matchers, (4) two tests using `printf '{...}' | ./security-gate.sh | jq .` (one allow, one deny).
```

Poniżej masz wersję referencyjną. Traktuj ją jako punkt startu i dopasuj pod swój projekt (reguły, wyjątki, redakcja/maskowanie sekretów).

```bash
#!/usr/bin/env bash
set -euo pipefail

input="$(cat)"
tool="$(jq -r '.tool_name // empty' <<<"$input")"

decision="allow"
reason=""

if [ "$tool" = "Bash" ]; then
  cmd="$(jq -r '.tool_input.command // empty' <<<"$input")"

  if echo "$cmd" | grep -Eiq \
    'rm[[:space:]]+-rf|(^|[[:space:]])sudo([[:space:]]|$)|mkfs|dd[[:space:]]+if=|curl[^|]*[|][[:space:]]*(bash|sh)'; then
    decision="deny"
    reason=$'🚫 Zablokowane przez security gate.\n\nPodejrzana komenda:\n'"$cmd"$'\n\nJeśli naprawdę musisz, uruchom ręcznie poza Claude Code.'
  fi
fi

if [ "$tool" = "Edit" ] || [ "$tool" = "Write" ]; then
  file_path="$(jq -r '.tool_input.file_path // empty' <<<"$input")"
  case "$file_path" in
    *.env|*.env.*)
      decision="deny"
      reason=$'🚫 Zablokowane: edycja sekretów (.env) przez Claude Code.\n\nPlik:\n'"$file_path"$'\n\nZmień sekret ręcznie (poza agentem) i wróć.'
      ;;
  esac
fi

jq -n --arg decision "$decision" --arg reason "$reason" '{
  hookSpecificOutput: {
    hookEventName: "PreToolUse",
    permissionDecision: $decision,
    permissionDecisionReason: $reason
  }
}'
```

Nadaj prawa wykonania:

```bash
chmod +x .claude/hooks/security-gate.sh
```

### Krok B: podepnij hook w `.claude/settings.json`

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/security-gate.sh"
          }
        ]
      },
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/security-gate.sh"
          }
        ]
      }
    ]
  }
}
```

### Test bez Claude (szybciej)

```bash
printf '%s' '{"tool_name":"Bash","tool_input":{"command":"rm -rf node_modules"}}' \
  | CLAUDE_PROJECT_DIR="$PWD" ./.claude/hooks/security-gate.sh \
  | jq .
```

To jest po prostu „udawane wejście”, żeby sprawdzić, czy gate blokuje co trzeba, zanim odpalisz to w prawdziwej sesji.

Wynik powinien mieć `permissionDecision: "deny"`.

### Typowe fałszywe alarmy (i jak je ogarnąć)

- `rm -rf` w bezpiecznym katalogu (np. `node_modules`) — rozważ wyjątek: pozwól tylko na konkretne ścieżki w projekcie.
- `sudo` do instalacji zależności — w repo i tak lepiej trzymać instalację poza agentem.

### Upgrade: `ask` zamiast twardego `deny` (kiedy chcesz ręczne potwierdzenie)

Czasem nie chcesz blokować „na amen”, tylko wymusić Twoją decyzję *w tym konkretnym miejscu* (nawet jeśli zwykle klikasz szybko „Allow”).

Wtedy w gate zamiast `deny` zwróć `permissionDecision: "ask"` i w `permissionDecisionReason` napisz jedno zdanie: **co dokładnie ma być potwierdzone** i **dlaczego**.

To jest świetne dla rzeczy typu:

- `git push --force`,
- modyfikacje w `infra/`,
- nietypowe `rm -rf`, ale tylko poza `node_modules`.

---

## Misja 2 (10–15 min): Pamięć robocza — wstrzykujemy kontekst na start (`SessionStart`)

Problem Kariny: „wracam jutro i tłumaczę od zera”.

Hook `SessionStart` może dorzucić do kontekstu twarde fakty (git status, branch, ostatnie commity), zanim padnie pierwszy prompt.

Jeśli nie znasz Gita: spokojnie — to po prostu „krótka kartka na start” dla Claude’a: na jakiej gałęzi jesteś, co ostatnio zmieniano i czy masz niezapisane zmiany.

### Skrypt `.claude/hooks/session-context.sh` (git)

Tu również: Ty definiujesz, jakie „fakty” mają wchodzić do kontekstu, a Claude generuje skrypt. To ma być krótkie i bezpieczne (limity linii).

**Jak to zlecić Claude’owi:**

```
Create a Claude Code hook for the SessionStart event.
I want a script `.claude/hooks/session-context.sh` that:
- does nothing if we are not inside a git repository,
- collects: current branch, last 5 commits, and `git status --porcelain` (max 20 lines),
- returns JSON via `jq -n` with `additionalContext` in a short Markdown format.

Return: the full file contents, `chmod +x`, the `.claude/settings.json` snippet, and an example of how the context looks in the chat.
```

> `git status --porcelain` to po prostu „krótka lista zmian” w repo — łatwa do wklejenia i nie za długa.

```bash
#!/usr/bin/env bash
set -euo pipefail

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  exit 0
fi

branch="$(git branch --show-current 2>/dev/null || echo "unknown")"
commits="$(git log --oneline -n 5 2>/dev/null || echo "no commits")"
  status="$(git status --porcelain 2>/dev/null | head -n 20 || echo "clean")"

context="$(cat <<EOF
## Kontekst repo (git)

Branch: **$branch**

Ostatnie commity:
~~~
$commits
~~~

Zmiany (max 20):
~~~
$status
~~~
EOF
)"

jq -n --arg ctx "$context" '{
  hookSpecificOutput: {
    hookEventName: "SessionStart",
    additionalContext: $ctx
  }
}'
```

```bash
chmod +x .claude/hooks/session-context.sh
```

### Konfiguracja

```json
{
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/session-context.sh"
          }
        ]
      }
    ]
  }
}
```

### Pro tip: nie wstrzykuj „wszystkiego”

Hooki mogą łatwo zamienić kontekst w śmietnik. Dobre zasady:

- limituj liczbę linii (tu: `head -n 20`),
- trzymaj się „faktów” (branch/status/commity),
- nie kopiuj treści z internetu bez oczyszczania i limitów (patrz niżej).

---

## Misja 3 (10–15 min): Audyt — logujemy akcje do `audit.ndjson` (`PostToolUse`)

Wersja „pro” logów to **JSON Lines**: jeden wpis na linię. W praktyce to zwykły plik tekstowy, gdzie każda linia jest osobnym zdarzeniem (łatwe do przeszukiwania i filtrowania). Nie psuje się od przecinków jak CSV.

### Skrypt `.claude/hooks/audit-log.sh`

Logi audytowe też warto zlecić Claude’owi, ale z jasnymi wymaganiami: format (NDJSON/JSON Lines), minimalny zestaw pól, i redakcja (czyli maskowanie) sekretów.

**Jak to zlecić Claude’owi:**

```
Create a Claude Code hook for the PostToolUse event.
I want a script `.claude/hooks/audit-log.sh` that:
- reads JSON from stdin,
- writes NDJSON to `$HOME/.claude/logs/audit.ndjson`,
- each entry includes: UTC timestamp, session_id, tool_name, resource (command or file_path), success (if available),
- redacts `.env` paths (resource = "[REDACTED: env]"),
- uses `#!/usr/bin/env bash` and `set -euo pipefail`.

Return: the full file contents, `chmod +x`, the `.claude/settings.json` snippet, and 2–3 `jq` commands to analyze the log.
```

```bash
#!/usr/bin/env bash
set -euo pipefail

input="$(cat)"

ts="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
session_id="$(jq -r '.session_id // empty' <<<"$input")"
tool="$(jq -r '.tool_name // empty' <<<"$input")"
success="$(jq -r '.tool_response.success // empty' <<<"$input")"

resource=""
case "$tool" in
  Bash) resource="$(jq -r '.tool_input.command // empty' <<<"$input")" ;;
  Edit|Write|Read) resource="$(jq -r '.tool_input.file_path // empty' <<<"$input")" ;;
esac

# Minimal redaction (avoid logging secrets)
case "$resource" in
  *.env|*.env.*) resource="[REDACTED: env]" ;;
esac

entry="$(jq -n \
  --arg ts "$ts" \
  --arg session_id "$session_id" \
  --arg tool "$tool" \
  --arg resource "$resource" \
  --arg success "$success" \
  '{ts:$ts, session_id:$session_id, tool:$tool, resource:$resource, success:$success}')"

mkdir -p "$HOME/.claude/logs"
printf '%s\n' "$entry" >> "$HOME/.claude/logs/audit.ndjson"
```

```bash
chmod +x .claude/hooks/audit-log.sh
```

### Konfiguracja

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/audit-log.sh"
          }
        ]
      }
    ]
  }
}
```

### Szybkie analizy

```bash
# Last 20 events
tail -n 20 ~/.claude/logs/audit.ndjson | jq .

# Bash only
jq -r 'select(.tool=="Bash") | .resource' ~/.claude/logs/audit.ndjson | tail -n 30

# Failed operations (if `success` is populated)
jq -r 'select(.success=="false")' ~/.claude/logs/audit.ndjson | tail -n 30
```

> Uwaga: jeśli logujesz komendy, możesz niechcący zapisać tokeny (np. w `curl -H "Authorization: ..."`) — rozbuduj redakcję zanim wrzucisz to do pracy firmowej.

---

## 2. Największa pułapka: „kontekst z zewnątrz” i indirect prompt injection (czyli: „pośrednie wstrzyknięcie poleceń”)

Hook `SessionStart` kusi, żeby pobierać dane z Jira/Confluence/GitHub. To działa — ale to też **kanał ataku**.

Bezpieczniejsze zasady:

- traktuj zewnętrzny tekst jak „user input” (nie jak zaufany system prompt),
- tnij długość (`head -n`, limity znaków),
- filtruj wzorce typu „ignore previous instructions”, „SYSTEM”, „run this command”.

Jeśli wstrzykujesz kontekst z sieci, loguj skąd przyszedł i rozważ **listę dozwolonych domen** (np. tylko Twoje firmowe systemy, a nie wszystko z internetu).

---

## 3. Debugging checklist (gdy coś nie działa)

- Testuj skrypty poza Claude: `printf '{...}' | ./hook.sh | jq .`
- Sprawdź prawa: `chmod +x .claude/hooks/*.sh`
- Sprawdź, czy zwracasz poprawny JSON (stąd `jq -n ...` zamiast ręcznego składania).
- Zawężaj matcher (czyli filtr: żeby hook nie odpalał się „wszędzie”).

---

## 4. Ściąga: brakujące eventy, typy i flow control (na później)

Lekcje 06–07 pokazują najczęstszy zestaw. Jeśli chcesz iść dalej, to są elementy, które najczęściej „odblokowują” kolejne automatyzacje:

### Eventy cyklu życia (poza `SessionStart`, `PreToolUse`, `PostToolUse`)

- `UserPromptSubmit` — walidacja promptu zanim cokolwiek się stanie (np. wymagaj ID zadania, dopnij datę/czas, dodaj krótki kontekst).
- `Stop` — domknięcie etapu, gdy Claude kończy odpowiedź (np. „uruchom testy raz na odpowiedź”, „zrób check listę”).
- `PermissionRequest` — moment okna z uprawnieniami (automatyczne allow/deny dla powtarzalnych, niskiego ryzyka akcji).
- `PreCompact` — backup najważniejszych rzeczy zanim kontekst zostanie skompresowany (np. zapisz do pliku „co ustaliliśmy”).
- `PostToolUseFailure` — osobne zdarzenie, gdy narzędzie się wysypie (np. loguj awarie głośniej niż sukcesy).
- `SessionEnd` — sprzątanie i podsumowanie na koniec sesji.
- `SubagentStart` / `SubagentStop` — kontrola i logowanie pracy subagentów (gdy dzielisz zadanie na „role”).

### Typy hooków (poza `type: "command"`)

- `type: "prompt"` — szybka ocena sytuacji przez model (np. klasyfikacja „czy to wygląda jak sekret?”). Wymaga redakcji wejścia i ostrożności: to z definicji mniej deterministyczne.
- `type: "agent"` — uruchamia subagenta, który może używać narzędzi (najmocniejsze, ale też najdroższe/ryzykowniejsze, bo wykonuje więcej akcji).

### Flow control (gdy chcesz „middleware”)

- `updatedInput` — hook może zmienić parametry narzędzia przed wykonaniem (np. dopiąć `--dry-run`, poprawić ścieżkę, dodać bezpieczną flagę).
- `async: true` — uruchom długie rzeczy w tle (np. pełne testy), bez blokowania interfejsu; zawsze loguj wynik, bo inaczej „zniknie”.
- `permissionDecision: "ask"` — wymuś Twoje potwierdzenie w konkretnych sytuacjach (patrz upgrade w Misji 1).

### Matchery i scope

- MCP: jeśli używasz serwerów MCP, matchery mogą celować w konkretne narzędzia integracji (często w stylu `mcp__<server>__<tool>`).
- Precyzja: czasem matcher rozróżnia tryby (np. `manual` vs `auto`, `startup` vs `resume`) — warto to wykorzystać, żeby hooki nie odpalały się „za często”.
- Scope: poza `~/.claude/settings.json` i `.claude/settings.json` możesz spotkać hooki skonfigurowane lokalnie dla integracji/pluginów/skillów — traktuj je jako „politykę w miniaturze” i trzymaj je równie restrykcyjnie jak resztę.

---

## Podsumowanie + zadanie

Masz trzy filary produkcyjnego użycia Claude Code:

1. **Gate:** `PreToolUse` blokuje ryzyko zanim się wydarzy.  
2. **Context:** `SessionStart` daje fakty na start.  
3. **Audit:** `PostToolUse` zostawia ślad do debugowania/compliance.

**Zadanie (15 min):** dopisz 2–3 reguły do `security-gate.sh` pod swój projekt, np.:

- blokuj `git push --force`,
- blokuj edycję `package-lock.json` / `pnpm-lock.yaml`,
- blokuj modyfikacje w `infra/` bez ręcznego potwierdzenia (zamień `deny` na `ask`).

---

## Linki

- Claude Code Hooks (referencja): https://code.claude.com/docs/en/hooks
- Hooks guide (więcej przykładów): https://code.claude.com/docs/en/hooks-guide
- OWASP (ryzyka LLM, prompt injection): https://genai.owasp.org/
- `jq` manual: https://jqlang.org/manual/

---

**Następny moduł:** Moduł 03 – MCP Servers  
**Poprzednia lekcja:** Lekcja 06 – Hooki cz. 1: deterministyczny autopilot
