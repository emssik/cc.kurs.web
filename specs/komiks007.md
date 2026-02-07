# Scenariusz komiksu: "The Hierarchy of Pain"

**Lekcja źródłowa:** Mail 7 - CLAUDE.md - zbuduj pamięć projektu

**Koncept:** Dev ma globalny CLAUDE.md z "single quotes" i projektowy z "double quotes". Claude używa ich losowo. Frustracja narasta, aż dev odkrywa hierarchię priorytetów i explicite override.

---

### PANEL 1: The Setup

**KOMPOZYCJA:** Plan średni, widok z boku na biurko

**BOHATEROWIE:**
- Senior dev (~35 lat): Siedzi dumny przy biurku, ręce splecione za głową, zadowolony uśmiech. Koszulka, okulary.

**PRZEDMIOTY/TŁO:**
- Monitor z otwartym edytorem, biurko, kubek "I ❤️ Config"
- Na ekranie widoczny plik

**TEKST:**
- Narracja: "Day 1: Global preferences set"
- Ekran monitora:
  ```
  ~/.claude/CLAUDE.md
  - Always use single quotes
  - TypeScript only
  ```
- Dialog Senior (myśl): "One config to rule them all."
  - Dymek: chmurka myśli, nad głową

**DETALE:** Terminal prompt widoczny w rogu ekranu

---

### PANEL 2: The Plot Thickens

**KOMPOZYCJA:** Plan średni, ten sam kąt

**BOHATEROWIE:**
- Senior dev: Lekko pochylony, pisze na klawiaturze, neutralna mina

**PRZEDMIOTY/TŁO:**
- Ten sam setup, inny plik na ekranie

**TEKST:**
- Narracja: "Day 2: New client project"
- Ekran monitora:
  ```
  ./CLAUDE.md
  - Use double quotes (client standard)
  ```
- Dialog Senior: "Their codebase, their rules."
  - Dymek: normalny, z prawej

**DETALE:** Folder na ekranie: `/projects/acme-corp/`

---

### PANEL 3: The Horror

**KOMPOZYCJA:** Zbliżenie na ekran + twarz deva z boku

**BOHATEROWIE:**
- Senior dev: Oczy szeroko otwarte, brwi uniesione, usta lekko otwarte (szok)

**PRZEDMIOTY/TŁO:**
- Monitor wypełnia 60% kadru, kod na ekranie

**TEKST:**
- Narracja: "Day 3: Code review"
- Ekran monitora:
  ```
  const name = "Alice";
  const city = 'Boston';
  const job = "developer";
  const id = '42';
  ```
- Dialog Senior: "What... what is this?"
  - Dymek: drżący/nierówny, z lewej

**DETALE:** Czerwone podkreślenia pod niespójnymi cudzysłowami

---

### PANEL 4: The Descent

**KOMPOZYCJA:** Plan szeroki, dev przy biurku, wiele okien na ekranie

**BOHATEROWIE:**
- Senior dev: Głowa w dłoniach, zgarbiony, wyraz rozpaczy

**PRZEDMIOTY/TŁO:**
- Monitor z 4 oknami: global config, project config, kod, Claude chat
- Puste kubki po kawie (3 szt.) na biurku
- Karteczki post-it wszędzie

**TEKST:**
- Narracja: "Day 5"
- Dialog Senior: "It uses single quotes on Mondays and double quotes when Mercury is in retrograde."
  - Dymek: normalny, duży, nad głową
- Mały tekst na karteczce: "WHY??"

**DETALE:** Zegar pokazuje 2:47 AM

---

### PANEL 5: The Revelation

**KOMPOZYCJA:** Plan średni, dev pochylony ku monitorowi, palec wskazuje na ekran

**BOHATEROWIE:**
- Senior dev: Wyraz "eureka", oczy rozświetlone, lekki uśmiech

**PRZEDMIOTY/TŁO:**
- Monitor z dokumentacją, schemat hierarchii widoczny

**TEKST:**
- Narracja: "Day 6: RTFM moment"
- Ekran monitora:
  ```
  HIERARCHY:
  1. Enterprise
  2. Project ← WINS
  3. User/Global
  4. Local
  ```
- Dialog Senior: "Project overrides global... I just needed to be explicit!"
  - Dymek: normalny, z prawej

**DETALE:** Highlight na "Project ← WINS"

---

### PANEL 6: The Wisdom

**KOMPOZYCJA:** Plan średni, dev odchylony na krześle, ręce na klawiaturze

**BOHATEROWIE:**
- Senior dev: Spokojny, lekko zmęczony ale zadowolony uśmiech, "thousand-yard stare"

**PRZEDMIOTY/TŁO:**
- Czysty kod na ekranie (same double quotes), porządek na biurku

**TEKST:**
- Ekran monitora:
  ```
  ./CLAUDE.md
  - Use double quotes (overrides global)
  ```
- Dialog Senior: "Who designs these systems?"
  - Dymek: normalny, nad głową
- Dialog Senior (druga linijka, mniejsza czcionka): "People who learned the hard way."
  - Dymek: kontynuacja, poniżej

**DETALE:** Nowy kubek: "I READ THE DOCS"

---

## Styl graficzny

- Czarno-biała kreska (XKCD/CommitStrip)
- Minimalizm, line art, bez cieniowania
- Humor suchy, ironiczny, "śmiech przez łzy"

## Postacie

- **Senior dev** - ~35 lat, okulary, koszulka, ewolucja od pewności siebie przez rozpacz do mądrości
- **Sara Developer** - dostępna jako dodatkowa postać
