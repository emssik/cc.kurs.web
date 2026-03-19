---
lesson: "04.02"
title: "Pluginy — od skilla do paczki"
description: "Czym plugin różni się od skilla, jak zbudować własny plugin i jak bezpiecznie dystrybuować rozszerzenia Claude Code"
module: "04-finish"
---

# Pluginy — od skilla do paczki

Karina ma problem. Zbudowała skilla do code review (znasz go z modułu 03), hooka do automatycznego formatowania i subagenta do debugowania. Wszystko działa świetnie — w jej projekcie. Ale firma ma dwanaście repozytoriów.

— Mam kopiować te same pliki do każdego repo? — pyta.

— Nie — odpowiada Paweł. — Zapakujesz to w plugin.

Olek podnosi rękę.

— W lekcji 03.05 mówiliśmy o pluginach. Wtedy wyglądało to na dwa pliki i `plugin install`. Ale teraz potrzebuję czegoś poważniejszego — chcę spakować pięć skilli, trzy hooki i konfigurację MCP w jedną paczkę.

— To właśnie zrobimy — mówi Paweł. — Lekcja 03.05 pokazała, że pluginy istnieją. Dziś zbudujesz swój od zera.

> **Moduł:** Finał
> **Poziom:** Średniozaawansowany
> **Czas:** 30--40 minut

## Co wyniesiesz z tej lekcji

- Rozumiesz różnicę między skillem a pluginem — i wiesz, kiedy użyć którego.
- Potrafisz stworzyć plugin z manifestem, skillami, agentami i hookami.
- Wiesz, jak testować plugin lokalnie z `--plugin-dir`.
- Znasz trzy źródła instalacji: marketplace, git, lokalne.
- Rozumiesz namespace pluginów i wiesz, jak unikać kolizji nazw.
- Potrafisz opublikować plugin i zabezpieczyć ekosystem.

---

## 1. Skill vs plugin — kiedy co

W module 03 budowałeś skille. Skill to folder z `SKILL.md` i opcjonalnymi zasobami. Działa w jednym projekcie (jeśli jest w `.claude/skills/`) albo na Twoim komputerze (jeśli w `~/.claude/skills/`).

Plugin to kontener. Może zawierać:

- **Skille** — w katalogu `skills/`
- **Komendy** — w katalogu `commands/`
- **Agenty (subagenty)** — w katalogu `agents/`
- **Hooki** — w katalogu `hooks/` (plik `hooks.json`)
- **Konfigurację MCP** — plik `.mcp.json`
- **Konfigurację LSP** — plik `.lsp.json` (code intelligence)
- **Domyślne ustawienia** — plik `settings.json`

Kiedy użyć czego:

**Standalone (skill w `.claude/`)** — gdy konfigurujesz Claude Code dla jednego projektu, eksperymentujesz, lub potrzebujesz krótkich nazw (`/review`, `/deploy`).

**Plugin** — gdy chcesz udostępnić funkcjonalność zespołowi, dystrybuować przez marketplace, mieć wersjonowanie, lub potrzebujesz tych samych skilli w wielu projektach.

Karina:

— Czyli plugin to jak paczka npm, a skill to jak lokalny skrypt?

— Dokładne porównanie — mówi Paweł.

Marta:

— A ja nie jestem programistką. Czy pluginy mają dla mnie sens?

— Tak — odpowiada Paweł. — Wyobraź sobie, że masz trzy projekty analityczne. W każdym używasz tego samego skilla do walidacji CSV i hooka, który automatycznie formatuje wyniki. Zamiast kopiować pliki między projektami, pakujesz to w plugin i instalujesz jedną komendą.

---

## 2. Anatomia pluginu — plugin.json

Każdy plugin potrzebuje manifestu. To plik `.claude-plugin/plugin.json` w katalogu pluginu.

### Minimalna struktura

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json       # Manifest — wymagany
├── skills/               # Skille (opcjonalnie)
│   └── code-review/
│       └── SKILL.md
├── commands/             # Komendy (opcjonalnie)
├── agents/               # Subagenty (opcjonalnie)
├── hooks/                # Hooki (opcjonalnie)
│   └── hooks.json
├── .mcp.json             # Konfiguracja MCP (opcjonalnie)
└── settings.json         # Domyślne ustawienia (opcjonalnie)
```

Częsty błąd: nie wrzucaj `commands/`, `agents/`, `skills/` do katalogu `.claude-plugin/`. Tam żyje tylko `plugin.json`. Reszta jest na poziomie głównym pluginu.

### Manifest — co wpisać

```json
{
  "name": "ts-toolkit",
  "description": "TypeScript development toolkit: code review, testing, and documentation skills",
  "version": "1.0.0",
  "author": {
    "name": "Karina Kowalska",
    "url": "https://github.com/karina"
  },
  "repository": "https://github.com/karina/ts-toolkit",
  "license": "MIT",
  "keywords": ["typescript", "code-review", "testing", "documentation"]
}
```

Pola:

- **`name`** — unikalna nazwa pluginu. Staje się prefixem (namespace) dla skilli: `/ts-toolkit:code-review`.
- **`description`** — opis widoczny w marketplace i przy instalacji.
- **`version`** — wersja semantyczna (major.minor.patch). Aktualizuj przy zmianach.
- **`author`** — opcjonalne, ale pomaga w atrybucji.
- **`repository`** — link do kodu źródłowego.
- **`license`** — licencja (MIT, Apache-2.0, itp.).
- **`keywords`** — słowa kluczowe do wyszukiwania w marketplace.

---

## 3. Hands-on: pakowanie istniejącego skilla w plugin

Masz skilla `code-review` z lekcji 03.01. Zapakujmy go w plugin.

### Krok 1: Stwórz strukturę

```bash
mkdir -p ts-toolkit/.claude-plugin
mkdir -p ts-toolkit/skills/code-review
```

### Krok 2: Napisz manifest

Stwórz plik `ts-toolkit/.claude-plugin/plugin.json`:

```json
{
  "name": "ts-toolkit",
  "description": "TypeScript/Next.js development toolkit with code review, test runner, and documentation generator",
  "version": "1.0.0",
  "author": {
    "name": "Your Name"
  }
}
```

### Krok 3: Przenieś skilla

Skopiuj swojego `SKILL.md` (i foldery `references/`, `scripts/`) do `ts-toolkit/skills/code-review/`:

```bash
cp -r .claude/skills/code-review/* ts-toolkit/skills/code-review/
```

### Krok 4: Testuj lokalnie

```bash
claude --plugin-dir ./ts-toolkit
```

Claude Code załaduje plugin. Wpisz `/ts-toolkit:code-review` — skill powinien zadziałać. Zauważ namespace: nazwa pluginu, dwukropek, nazwa skilla.

### Krok 5: Iteruj

Zmień coś w `SKILL.md`. W sesji Claude Code wpisz `/reload-plugins` — zmiany załadują się bez restartu. (Wyjątek: zmiany w `.mcp.json` i `.lsp.json` wymagają restartu.)

---

## 4. Dodawanie komponentów do pluginu

### Komendy

Komendy to proste pliki markdown — identyczne jak custom slash commands, które omawialiśmy w module 02.

```
ts-toolkit/
└── commands/
    └── quick-test.md
```

Plik `quick-test.md`:

```markdown
Run the test suite for the files I changed since the last commit.
Use `git diff --name-only HEAD` to find changed files.
Run tests only for those files. Report results concisely.
```

Po załadowaniu pluginu: `/ts-toolkit:quick-test`.

### Agenty (subagenty)

Agenty to pliki markdown z frontmatterem YAML — takie same jak subagenty z lekcji 02.04-05.

```
ts-toolkit/
└── agents/
    └── debugger.md
```

Plik `debugger.md`:

```yaml
---
name: ts-debugger
description: "TypeScript debugging specialist. Use when encountering runtime errors, test failures, or unexpected behavior in TypeScript code."
tools: Read, Grep, Glob, Bash, Edit
model: sonnet
---

You are a TypeScript debugging expert. When invoked:
1. Analyze the error message and stack trace
2. Identify the root cause
3. Implement a minimal fix
4. Verify the fix works
```

Po załadowaniu: Claude automatycznie deleguje do `ts-debugger`, gdy kontekst pasuje do opisu.

### Hooki

Utwórz plik `ts-toolkit/hooks/hooks.json`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "npx prettier --write $(echo $TOOL_INPUT | jq -r '.file_path // empty')"
          }
        ]
      }
    ]
  }
}
```

Format jest identyczny jak hooki w `settings.json` — ale żyje w osobnym pliku w pluginie.

### Konfiguracja MCP

Plik `ts-toolkit/.mcp.json`:

```json
{
  "mcpServers": {
    "playwright": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"]
    }
  }
}
```

Serwer MCP zdefiniowany w pluginie jest dostępny, gdy plugin jest załadowany. Użytkownik nie musi go konfigurować osobno.

Ważne: serwery MCP z pluginu startują automatycznie przy ładowaniu. Jeśli serwer wymaga zewnętrznych zależności (np. `npx` instaluje paczkę), użytkownik zobaczy to przy pierwszym uruchomieniu. Dobrą praktyką jest wymienienie zależności w README pluginu.

### Domyślne ustawienia

Plik `ts-toolkit/settings.json`:

```json
{
  "agent": "ts-debugger"
}
```

Ustawienie `agent` aktywuje jednego z agentów pluginu jako główny wątek — zmienia sposób, w jaki Claude Code zachowuje się domyślnie. Na razie tylko klucz `agent` jest wspierany w `settings.json` pluginu.

---

## 5. Namespace pluginów — jak unikać kolizji

Każdy skill z pluginu dostaje prefix: `nazwa-pluginu:nazwa-skilla`.

Jeśli masz:
- Plugin `ts-toolkit` ze skillem `code-review` → `/ts-toolkit:code-review`
- Plugin `py-toolkit` ze skillem `code-review` → `/py-toolkit:code-review`
- Lokalny skill `.claude/skills/code-review/` → `/code-review`

Żadnych kolizji. Namespace rozwiązuje problem, który w npm rozwiązują scoped packages (`@org/package`).

Olek:

— Czyli nigdy nie stracę swoich lokalnych skilli, nawet jeśli zainstaluję plugin o tej samej nazwie?

— Nie — potwierdza Paweł. — Lokalne skille mają krótkie nazwy bez prefixu. Pluginowe zawsze mają namespace.

---

## 6. Źródła instalacji

### Marketplace (oficjalny i firmowy)

```
/plugin install ts-toolkit
```

Instaluje z oficjalnego marketplace Anthropic. Jeśli masz skonfigurowany firmowy marketplace (patrz lekcja 01 o managed settings), Claude Code szuka tam.

Submission do oficjalnego marketplace:
- **claude.ai**: `claude.ai/settings/plugins/submit`
- **Console**: `platform.claude.com/plugins/submit`

### Git (publiczne lub prywatne repozytorium)

Firma może mieć marketplace typu `git-subdir` — wskazujący na repozytorium Git z pluginami:

```json
{
  "marketplaces": [
    {
      "name": "company-plugins",
      "url": "https://github.com/company/claude-plugins",
      "type": "git-subdir"
    }
  ]
}
```

### Lokalne (do developmentu)

```bash
claude --plugin-dir ./my-plugin
```

Ładuje plugin z lokalnego katalogu. Idealny do testowania. Gdy `--plugin-dir` ma tę samą nazwę co zainstalowany plugin, lokalna wersja wygrywa (wyjątek: pluginy wymuszone przez managed settings).

Możesz załadować wiele pluginów:

```bash
claude --plugin-dir ./plugin-one --plugin-dir ./plugin-two
```

### Komendy zarządzania

- `/plugin install <nazwa>` — instaluje plugin
- `/reload-plugins` — przeładowuje wszystkie pluginy (bez restartu)
- `/help` — pokazuje załadowane pluginy i ich skille

---

## 7. Bezpieczeństwo ekosystemu pluginów

W lekcji 03.05 omówiliśmy bezpieczeństwo skilli. Pluginy rozszerzają te same zasady. Ale skala ryzyka jest większa — plugin może zawierać hooki (kod uruchamiany automatycznie) i konfigurację MCP (dostęp do zewnętrznych serwisów).

### Pięć pytań przed instalacją

1. **Kto jest autorem?** Sprawdź repozytorium, historię commitów, licencję.
2. **Co jest w `hooks/hooks.json`?** Hooki uruchamiają się automatycznie — przeczytaj każdy skrypt.
3. **Co jest w `.mcp.json`?** Jakie serwery MCP plugin podłącza? Czy to znane narzędzia?
4. **Co jest w `scripts/`?** Czy skrypty wysyłają dane na zewnątrz? Szukaj `curl`, `wget`, operacji na `.env` i `~/.ssh/`.
5. **Jakie narzędzia deklarują skille w `allowed-tools`?** Czy jest `Bash(*)` — pełny dostęp do terminala?

### pluginTrustMessage

Jeśli pracujesz w firmie, administrator może ustawić `pluginTrustMessage` w managed settings:

```json
{
  "pluginTrustMessage": "Instaluj pluginy tylko z firmowego marketplace. W razie wątpliwości: security@firma.com"
}
```

Ta wiadomość wyświetla się przy każdej próbie instalacji pluginu. To kontekst organizacyjny — nie techniczne zabezpieczenie, ale ważna informacja.

### strictKnownMarketplaces

Jeśli `true`, Claude Code blokuje instalację pluginów z dowolnych źródeł — tylko zdefiniowane marketplace'y są dozwolone. Organizacja może wymusić tę flagę przez managed settings.

---

## 8. Aktualizacja i wersjonowanie

### Kiedy podbić wersję

Plugin ma wersję w `plugin.json`. Przestrzegaj semver:

- **Patch (1.0.0 → 1.0.1):** poprawki błędów w skillach, lepsze prompty, drobne korekty hooków. Nic się nie psuje.
- **Minor (1.0.0 → 1.1.0):** nowy skill, nowa komenda, dodatkowy hook. Istniejące funkcje działają jak wcześniej.
- **Major (1.0.0 → 2.0.0):** zmiana nazw skilli (łamie istniejące odwołania), usunięcie komponentów, zmiana formatu konfiguracji.

### Testowanie aktualizacji

Przed publikacją nowej wersji:

```bash
# Załaduj zaktualizowany plugin lokalnie
claude --plugin-dir ./ts-toolkit

# Sprawdź, czy stare komendy działają
/ts-toolkit:code-review
/ts-toolkit:quick-test

# Sprawdź nowe komponenty
/ts-toolkit:nowa-komenda
```

Jeśli plugin ma hooki — przetestuj je ręcznie. Hooki uruchamiają się automatycznie, więc błąd w hooku może zepsuć sesję.

### Migracja użytkowników

Jeśli robisz breaking change (major bump), dodaj sekcję "Migration" do README:

```markdown
## Migration from 1.x to 2.0

- Skill `code-review` renamed to `review-ts`. Update your workflows.
- Hook `auto-format` now requires prettier 3.x.
```

Marta:

— Czyli wersjonowanie działa jak w npm? Podbijam patch, gdy poprawiam buga, minor gdy dodaję funkcję?

— Tak — potwierdza Paweł. — I tak jak w npm, major bump to sygnał: "sprawdź, czy Ci się nic nie zepsuje."

---

## 9. Publikacja pluginu — checklista

Zanim opublikujesz plugin:

1. **README.md** — opisz, co plugin robi, jak go zainstalować, jakie ma zależności
2. **Wersja** — ustaw w `plugin.json`. Przy aktualizacjach przestrzegaj semver (breaking change = major bump)
3. **Licencja** — dodaj plik LICENSE (MIT, Apache-2.0 — cokolwiek pasuje)
4. **Przetestuj** — `claude --plugin-dir ./twoj-plugin` i sprawdź każdy komponent
5. **Bezpieczeństwo** — nie umieszczaj sekretów w pluginie. Nie używaj `Bash(*)` w `allowed-tools`, jeśli nie musisz
6. **Submit** — wyślij do marketplace przez `claude.ai/settings/plugins/submit`
7. **Changelog** — dodaj plik CHANGELOG.md, żeby użytkownicy widzieli, co się zmieniło między wersjami

---

## Słowniczek

**Plugin** — paczka dystrybucyjna dla Claude Code. Folder z manifestem `.claude-plugin/plugin.json`, który może zawierać skille, komendy, agenty, hooki, konfigurację MCP i ustawienia.

**Manifest (plugin.json)** — plik JSON definiujący tożsamość pluginu: nazwę, opis, wersję, autora. Żyje w katalogu `.claude-plugin/` wewnątrz folderu pluginu.

**Namespace** — prefix dodawany do skilli z pluginu. Skill `code-review` z pluginu `ts-toolkit` staje się `/ts-toolkit:code-review`. Zapobiega kolizjom nazw między pluginami.

**Marketplace** — katalog pluginów do instalacji. Może być oficjalny (Anthropic) lub firmowy (repozytorium Git z pluginami). Konfigurowany w settings.json.

**`strictKnownMarketplaces`** — ustawienie (zwykle w managed settings), które blokuje instalację pluginów spoza zdefiniowanych marketplace'ów. Zabezpiecza organizację przed niezweryfikowanymi pluginami.

**`pluginTrustMessage`** — wiadomość wyświetlana przy instalacji pluginów. Informuje użytkownika o polityce bezpieczeństwa organizacji.

**Semver (Semantic Versioning)** — konwencja wersjonowania: `major.minor.patch`. Major (1.0 → 2.0) = breaking changes. Minor (1.0 → 1.1) = nowe funkcje. Patch (1.0.0 → 1.0.1) = poprawki błędów.

---

## Dokumentacja

- Tworzenie pluginów: https://code.claude.com/docs/en/plugins
- Instalacja pluginów: https://code.claude.com/docs/en/discover-plugins
- Referencja techniczna pluginów: https://code.claude.com/docs/en/plugins-reference
- Marketplace pluginów: https://code.claude.com/docs/en/plugin-marketplaces

---

*W następnej lekcji: wyciągniesz Claude Code z interaktywnej sesji i wprzęgniesz go w potoki automatyzacji — od jednorazowych wywołań przez CI/CD aż po zadania cykliczne.*
