# The Skill Evolution

**Styl:** XKCD/CommitStrip - czarno-biały line art
**Liczba scen:** 5
**Bohaterowie:** Junior Dev - młody programista w koszulce z logo, coraz bardziej zmęczony z każdym panelem; Boss - manager w koszuli, pojawia się w panelu 5

### PANEL 1: Day One

**KOMPOZYCJA:** Plan średni, lekko z boku

**BOHATEROWIE:**
- Dev: Siedzi wyprostowany, świeży, uśmiechnięty. Koszulka, czyste biurko. Palce na klawiaturze.

**PRZEDMIOTY/TŁO:**
- Monitor z małym plikiem na ekranie. Kubek kawy (pełny). Mała doniczka z kwiatkiem.

**TEKST:**
- Narracja: "Day 1"
- Ekran monitora:
  "SKILL.md
   ---
   name: code-review
   description: Reviews code
   ---
   Check the code."
- Dialog Dev: "Three lines of YAML and a sentence. How hard can it get?"
  - Dymek: normalny, pozycja: nad głową po prawej

**DETALE:** Terminal prompt widoczny w rogu ekranu. Na monitorze plik ma dosłownie 6 linijek.

---

### PANEL 2: Day Two

**KOMPOZYCJA:** Plan średni, ten sam kąt co panel 1

**BOHATEROWIE:**
- Dev: Lekko pochylony, skupiony. Włosy nieco potargane.

**PRZEDMIOTY/TŁO:**
- Monitor z dłuższym kodem. Kubek kawy (w połowie). Obok monitora karteczka post-it. Folder "references/" narysowany jako fizyczna teczka leżąca na biurku.

**TEKST:**
- Narracja: "Day 2"
- Ekran monitora:
  "SKILL.md
   context: fork
   allowed-tools: Read, Grep, Glob,
     Bash(npm run lint*)...

   references/
   ├── conventions.md
   └── security.md"
- Dialog Dev: "Just a few references. And some tool restrictions. And isolation..."
  - Dymek: normalny, pozycja: nad głową

**DETALE:** Post-it na monitorze: "TODO: shell injection syntax"

---

### PANEL 3: Day Three

**KOMPOZYCJA:** Plan średni, lekkie zbliżenie

**BOHATEROWIE:**
- Dev: Wyraźnie zmęczony, włosy potargane, podkrążone oczy. Ręka podpiera głowę.

**PRZEDMIOTY/TŁO:**
- Monitor zapełniony kodem. Kubek kawy (prawie pusty). Drugi pusty kubek obok. Stos post-itów. Teczka "references/" rozrosła się w stos teczek.

**TEKST:**
- Narracja: "Day 3"
- Ekran monitora:
  "hooks:
    PostToolUse:
      - matcher: 'Edit|Write'
        command: ./scripts/run-lint.sh

  ## Feedback Loop
  1. validate → fix → repeat
  2. max 3 iterations
  3. if still failing, STOP"
- Dialog Dev (myśl): "It validates itself. Then fixes itself. Then validates again. I've created a loop within a loop..."
  - Dymek: chmurka myśli, pozycja: nad głową

**DETALE:** Mały skrypt `chmod +x` widoczny w terminalu w tle.

---

### PANEL 4: The Masterpiece

**KOMPOZYCJA:** Plan szeroki, dev na tle ogromnej struktury plików

**BOHATEROWIE:**
- Dev: Stoi, wyczerpany ale dumny. Podkrążone oczy, potargane włosy, koszulka zmięta. Gest prezentujący w stronę monitora.

**PRZEDMIOTY/TŁO:**
- Monitor z rozbudowanym drzewem katalogów. 3 puste kubki kawy w rzędzie. Kosz na śmieci pełen post-itów.

**TEKST:**
- Narracja: "Day 4"
- Ekran monitora:
  ".claude/skills/code-review/
   ├── SKILL.md (47 lines)
   ├── references/
   │   ├── conventions.md
   │   ├── patterns.md
   │   └── security.md
   └── scripts/
       ├── run-lint.sh
       └── run-tests.sh"
- Dialog Dev: "Dynamic context. Hooks. Feedback loops. Validation scripts. Fork isolation. It's... alive."
  - Dymek: normalny, pozycja: po lewej

**DETALE:** Na jednym z kubków napis "I ♥ YAML"

---

### PANEL 5: The Punchline

**KOMPOZYCJA:** Plan średni, dwuosobowy. Boss stoi za Devem.

**BOHATEROWIE:**
- Boss: Stoi za devem, ręce skrzyżowane, uniesiona brew. Koszula, krótkie włosy.
- Dev: Odwrócony do bossa, zmęczony ale spokojny uśmiech.

**PRZEDMIOTY/TŁO:**
- Monitor z jednolinijkową komendą. Te same 3 puste kubki.

**TEKST:**
- Dialog Boss: "Great. How does the team get it?"
  - Dymek: normalny, pozycja: nad bossem po prawej
- Ekran monitora:
  "$ git clone repo
   ✓ Done."
- Dialog Dev: "They clone the repo. It's already in .claude/skills/."
  - Dymek: normalny, pozycja: nad devem po lewej
- Dialog Boss: "So you spent four days building something that takes one command to share?"
  - Dymek: normalny, pozycja: nad bossem, mniejszy
- Dialog Dev (myśl): "He'll never understand."
  - Dymek: chmurka myśli, pozycja: nad devem, mały

**DETALE:** Na monitorze widać "git clone" z zielonym checkmarkiem. Dev ma lekki uśmiech Mona Lisy — wie, że warto było.
