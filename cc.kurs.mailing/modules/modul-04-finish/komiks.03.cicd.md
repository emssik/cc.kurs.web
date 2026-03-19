# The Automation Trap

**Styl:** XKCD/CommitStrip - czarno-bialy line art
**Liczba scen:** 5
**Bohaterowie:** Dev - zmeczony programista ~30 lat, potargane wlosy, koszulka z logo, kubek kawy zawsze w zasiegu reki. Boss - manager w koszuli, stoi z tabletem, pragmatyczny.

---

### PANEL 1: Groundhog Day

**KOMPOZYCJA:** Plan sredni, lekko z gory. Seria 3 malych sub-paneli w jednym pasku — poniedzialek, sroda, piatek. Ten sam kadr powtorzony 3 razy.

**BOHATEROWIE:**
- Dev: Siedzi przy biurku, coraz bardziej zmeczony w kazdym sub-panelu. Pon: lekki znuzenie. Sr: opadajace powieki. Pt: glowa prawie na klawiaturze.

**PRZEDMIOTY/TLO:**
- Monitor z terminalem, kubek kawy (coraz bardziej pusty w kazdym sub-panelu), sticky notes na monitorze

**TEKST:**
- Narracja: "Monday... Wednesday... Friday..."
- Ekran monitora (ten sam we wszystkich 3): `$ claude` + interaktywna sesja
- Dialog Dev (Pt, mysl): "I've been doing this exact thing for 3 weeks..."
  - Dymek: chmurka mysli, pozycja: nad glowa

**DETALE:** Sticky note: "TODO: review PRs, generate changelog, check CSV". Kalendarz na scianie z przekreslonymi dniami.

---

### PANEL 2: The Epiphany

**KOMPOZYCJA:** Plan sredni, prosto. Dev wyprostowany, oczy szeroko otwarte, zarowka nad glowa.

**BOHATEROWIE:**
- Dev: Zerwany z krzesla, stoi, palec w gorze, szerokie oczy, maniakalny usmiech. Energia odkrywcy.

**PRZEDMIOTY/TLO:**
- Monitor z otwarta dokumentacja (widac naglowek "Headless Mode"), kubek kawy przewrocony (plama sie rozlewa)

**TEKST:**
- Dialog Dev: "Wait. claude -p. Pipes. Cron jobs. I can AUTOMATE all of this!"
  - Dymek: normalny z wykrzyknikiem, pozycja: gora-prawo
- Narracja: "The dangerous moment every developer knows."

**DETALE:** Na ekranie widac fragment: `claude -p "..." --output-format json | jq`

---

### PANEL 3: Down the Rabbit Hole

**KOMPOZYCJA:** Plan szeroki, z boku. Dev otoczony chaosem — wiele okien terminala, dokumentacja, notatki.

**BOHATEROWIE:**
- Dev: Pochylony nad klawiatura, wlosy jeszcze bardziej potargane, oczy podkrazone ale szalone. 3 puste kubki kawy obok.

**PRZEDMIOTY/TLO:**
- 2 monitory pelne kodu, sticky notes wszedzie, zegarek na scianie pokazuje 2:00 AM, tablica z narysowanym pipeline (strzalki: stdin → claude -p → jq → curl → slack)

**TEKST:**
- Dialog Dev (mysl): "Just one more pipeline... I need the GitHub Action to trigger the cron that feeds the JSON schema that posts to Slack..."
  - Dymek: chmurka mysli, pozycja: gora
- Narracja: "Hour 14."

**DETALE:** Na monitorze: wielolinijkowy YAML z GitHub Actions. Na kartce: przekreslone "Day 1", "Day 2", aktualne "Day 3".

---

### PANEL 4: It Works!

**KOMPOZYCJA:** Plan sredni, prosto. Dev z rekami w gorze, tryumfalny.

**BOHATEROWIE:**
- Dev: Stoi, rece uniesione w gescie zwyciestwa, szalony usmiech, podkrazone oczy, 3-dniowy zarost. Wyglada jak po maratonie.

**PRZEDMIOTY/TLO:**
- Monitor z zielonym checkmarkiem i "All workflows passing", konfetti z emoji (w line art)

**TEKST:**
- Dialog Dev: "IT WORKS! Fully automated! PR review, changelog, CSV analysis — all hands-free!"
  - Dymek: normalny, duzy, pozycja: gora
- Maly tekst pod monitorem: `--max-turns 10 --allowedTools "Read,Bash(git *)"`

**DETALE:** Zegar: Friday 11 PM. Kalendarz: 3 dni przekreslone.

---

### PANEL 5: The Math

**KOMPOZYCJA:** Plan sredni, z boku. Boss stoi za Devem, patrzy na tablice z obliczeniami.

**BOHATEROWIE:**
- Boss: Stoi z tabletem, jedna brew uniesiona, lekki usmieszek. Koszula, schludny.
- Dev: Siedzi, zamrozony usmiech, powoli dociera do niego prawda.

**PRZEDMIOTY/TLO:**
- Tablica/whiteboard z obliczeniami (widoczna dla czytelnika):
  "Manual: 10 min/day
   Automation: 3 days
   Break even: 2028"

**TEKST:**
- Dialog Boss: "So you spent 3 days automating a 10-minute task?"
  - Dymek: normalny, pozycja: gora-lewo
- Dialog Dev: "Yes, but now it runs AUTOMATICALLY."
  - Dymek: normalny, pozycja: gora-prawo
- Dialog Boss: "You could've just done it 600 more times."
  - Dymek: normalny, pozycja: dol-lewo

**DETALE:** Na tablecie Bossa: wykres ROI z linia schodzaca w dol. Maly napis pod tablica: "Worth it? Always."
