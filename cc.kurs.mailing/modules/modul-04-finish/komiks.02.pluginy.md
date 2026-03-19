# The Plugin Paradox

**Styl:** XKCD/CommitStrip - czarno-bialy line art, minimalizm, bez cieniowania
**Liczba scen:** 5
**Bohaterowie:** Junior dev - mlody programista w koszulce z logo JS, potargane wlosy, duze oczy; Senior dev - brodaty mentor z kubkiem kawy "Works on my machine", spokojna mina

---

### PANEL 1: Eureka moment

**KOMPOZYCJA:** Plan sredni, lekko z boku

**BOHATEROWIE:**
- Junior: Siedzi przy biurku, szerokim usmiechem patrzy na monitor. Gestykuluje jedną ręką w górę (eureka).

**PRZEDMIOTY/TLO:**
- Monitor z kodem, biurko, klawiatura. Na ekranie widać SKILL.md.

**TEKST:**
- Narracja: "Day 1. The skill works perfectly."
- Dialog Junior: "My code-review skill is *amazing*. It catches everything!"
  - Dymek: normalny, pozycja: nad glowa

**DETALE:** Na monitorze: `SKILL.md — code-review`. Maly napis na kubku: "I <3 AI"

---

### PANEL 2: Copy-paste hell

**KOMPOZYCJA:** Plan szeroki, z boku. Ujecie pokazuje biurko Junior'a otoczone stosami karteczek post-it i strzalkami na tablicy.

**BOHATEROWIE:**
- Junior: Pochylony nad klawiatura, zmęczony, pod oczami worki. Wlosy bardziej potargane niż w panelu 1.

**PRZEDMIOTY/TLO:**
- Monitor z terminalem. Na tablicy za nim 12 karteczek post-it, kazda z nazwa repo: "repo-api", "repo-web", "repo-mobile", "repo-admin"... Strzalki miedzy nimi, chaos. Na biurku 3 puste kubki kawy.

**TEKST:**
- Narracja: "Day 5. Twelve repositories later."
- Dialog Junior: "OK, just copy SKILL.md to repo #9... wait, did I update repo #4 with the fix from repo #7?"
  - Dymek: normalny, pozycja: nad glowa
- Karteczka na monitorze: "TODO: sync skills AGAIN"

**DETALE:** Terminal: `cp -r .claude/skills/code-review ../repo-09/.claude/skills/`. Jedna karteczka odkleja sie i spada.

---

### PANEL 3: The breaking point

**KOMPOZYCJA:** Zblizenie na twarz Junior'a i monitor. Dramatyczne.

**BOHATEROWIE:**
- Junior: Twarz w dloniach, rozpacz. Oczy szeroko otwarte w przerażeniu patrza na ekran.

**PRZEDMIOTY/TLO:**
- Monitor z diff'em. Czerwone i zielone linie (zaznaczone kreskowaniem, bo czarno-bialy).

**TEKST:**
- Dialog Junior: "Three repos have version 1, five have version 2, and repo-11 has... something I don't recognize."
  - Dymek: normalny, pozycja: nad glowa, dymek duzy
- Na ekranie: `git diff` z chaotycznymi zmianami

**DETALE:** W tle wisząca karteczka: "Version control is for code, not for... oh wait"

---

### PANEL 4: The mentor appears

**KOMPOZYCJA:** Plan sredni, dwoch bohaterow. Senior stoi za Junior'em, kubek kawy w ręku, spokojna mina.

**BOHATEROWIE:**
- Junior: Odwrocony na krzesle, patrzy na Senior'a z desperacja. Rece rozlozone w gescie bezradnosci.
- Senior: Stoi spokojnie, lekki usmiech, jedna brew uniesiona. Trzyma kubek kawy.

**PRZEDMIOTY/TLO:**
- Tablica z karteczkami w tle. Biurko z chaosem.

**TEKST:**
- Dialog Junior: "I spent a WEEK syncing skills across twelve repos. There HAS to be a better way."
  - Dymek: krzyk (postrzepione krawedzie), pozycja: nad glowa
- Dialog Senior: "mkdir .claude-plugin. Add a plugin.json. Run plugin install."
  - Dymek: normalny, spokojny, pozycja: nad glowa

**DETALE:** Na kubku Senior'a: "Works on my machine"

---

### PANEL 5: Aftermath

**KOMPOZYCJA:** Plan sredni, ustawienie jak w panelu 1. Lustrzane odbicie poczatku.

**BOHATEROWIE:**
- Junior: Siedzi przy CZYSTYM biurku, patrzy na monitor. Wyraz twarzy: mieszanka ulgi i frustracji (ulga ze dziala, frustracja ze nie wiedzial wczesniej).

**PRZEDMIOTY/TLO:**
- Monitor z terminalem. Biurko czyste — zero karteczek. Tablica za nim pusta. Kosz na smieci pelny zmietych karteczek post-it.

**TEKST:**
- Na ekranie monitora:
  `/plugin install ts-toolkit`
  `Installed ts-toolkit@1.0.0 (3 skills, 1 hook, 1 agent)`
  `All 12 projects updated.`
- Dialog Junior: "One command. ONE. COMMAND."
  - Dymek: normalny, pozycja: nad glowa
- Dialog Junior (mysl): "I mass-copied skills for a week like an animal..."
  - Dymek: chmurka mysli, pozycja: prawy gorny rog

**DETALE:** W koszu na smieci widac karteczki z panelu 2. Na monitorze maly napis w rogu: `v1.0.0`
