# Komiks: "The Plugin Hoarder"

**Lekcja:** MCP Part 2 - Instalacja i Pierwsze Kroki
**Styl:** XKCD/CommitStrip, czarno-biała kreska, minimalizm
**Panele:** 5
**Temat:** Dev odkrywa MCP, instaluje wszystkie serwery, zjada cały kontekst

---

### PANEL 1: Discovery

**KOMPOZYCJA:** Plan średni, lekko z góry

**BOHATEROWIE:**
- Junior dev (~25 lat): Siedzi przy biurku, oczy szeroko otwarte, uśmiech zachwytu. Hoodie, potargane włosy. Pochylony do monitora.

**PRZEDMIOTY/TŁO:**
- Monitor, klawiatura, kubek kawy (pełny). Minimalistyczne biuro.

**TEKST:**
- Narracja: "Day 1: First MCP server"
- Ekran: `✓ filesystem — Connected | Tools: 6`
- Dialog Junior: "It can read my files! This changes EVERYTHING."
  - Dymek: normalny, pozycja: góra-prawo

**DETALE:** Terminal prompt widoczny pod statusem MCP

---

### PANEL 2: The Spree

**KOMPOZYCJA:** Plan średni, prosto. Monitor zajmuje więcej kadru.

**BOHATEROWIE:**
- Junior: Szalony uśmiech, obie ręce na klawiaturze, lekko maniakalny wyraz twarzy. Kubek kawy w połowie pusty.

**PRZEDMIOTY/TŁO:**
- Monitor z długą listą serwerów. Drugi monitor po lewej z otwartym GitHub "Awesome MCP Servers".

**TEKST:**
- Narracja: "Day 3"
- Ekran (lista):
  ```
  ✓ filesystem
  ✓ github
  ✓ slack
  ✓ sqlite
  ✓ google-drive
  ✓ notion
  ✓ jira
  ✓ confluence
  ✓ linear
  ✓ postgres
  ```
- Dialog Junior: "One more can't hurt..."
  - Dymek: normalny, pozycja: góra-prawo

**DETALE:** Na drugim monitorze: "awesome-mcp-servers ★ 4.2k". Zakładki w przeglądarce: "best mcp servers 2025", "mcp server list"

---

### PANEL 3: Symptoms

**KOMPOZYCJA:** Plan szeroki, biuro open space. Boss stoi za Junior devem.

**BOHATEROWIE:**
- Junior: Spokojny, ręce splecione za głową, czeka. Lekki uśmiech.
- Boss (~45 lat): Stoi za nim, garnitur, ręce na biodrach, uniesiona brew. Patrzy na ekran.

**PRZEDMIOTY/TŁO:**
- Monitor z loading spinnerem. Kubek kawy pusty. Zegar na ścianie: 10:47.

**TEKST:**
- Dialog Boss: "Why does Claude take 3 minutes to answer 'hello'?"
  - Dymek: normalny, pozycja: góra-lewo
- Dialog Junior: "He's... thinking deeply."
  - Dymek: normalny, pozycja: góra-prawo
- Ekran: wielki spinner `⟳` i tekst "Claude is thinking..."

**DETALE:** W tle inny dev zerka znad monitora z podejrzliwą miną

---

### PANEL 4: Diagnosis

**KOMPOZYCJA:** Zbliżenie na monitor, Junior widoczny z boku (profil).

**BOHATEROWIE:**
- Junior: Zmarszczone brwi, lekki niepokój. Pochylony do monitora.

**PRZEDMIOTY/TŁO:**
- Monitor wypełnia 2/3 kadru.

**TEKST:**
- Ekran (output Claude'a):
  ```
  Connected MCP Servers: 19
  Tools loaded: 247
  Context used by MCP: 89%

  Your message: "Summarize this file"
  Remaining context for response:
  ██████████████████████░ 94% used
  ```
- Dialog Junior (myśl): "Oh no."
  - Dymek: chmurka myśli, pozycja: góra-prawo

---

### PANEL 5: The Response

**KOMPOZYCJA:** Plan średni, Junior i Boss patrzą razem na monitor. Dramaturgia.

**BOHATEROWIE:**
- Junior: Dłoń na twarzy (facepalm), zgarbiony.
- Boss: Pochylony, czyta z ekranu, palec wskazuje na monitor.

**PRZEDMIOTY/TŁO:**
- Monitor z odpowiedzią Claude'a. Stos pustych kubków kawy (3 sztuki).

**TEKST:**
- Ekran:
  ```
  Claude: "Su"

  ⚠️ Context window exhausted.
  Token usage: 199,987 / 200,000
  (199,438 tokens used by MCP tool descriptions)
  ```
- Dialog Boss: "Deeply, huh?"
  - Dymek: normalny, pozycja: góra-lewo

**DETALE:** Mały tekst na dole ekranu: `Tip: Try disabling some MCP servers`
