# The Override War

**Styl:** XKCD/CommitStrip - czarno-biały line art
**Liczba scen:** 5
**Bohaterowie:** Junior dev - młody programista w koszulce z logo "I ❤️ Opus", potargane włosy; IT Admin - postać w koszuli, okulary, kubek z napisem "sudo make coffee", spokojny uśmieszek

---

### PANEL 1: The First Attempt

**KOMPOZYCJA:** Plan średni, widok z boku na biurko

**BOHATEROWIE:**
- Junior dev: siedzi przy biurku, pewny siebie uśmiech, palce nad klawiaturą

**PRZEDMIOTY/TŁO:**
- Monitor z otwartym edytorem, kubek kawy, naklejki na laptopie

**TEKST:**
- Narracja: "Step 1: settings.json"
- Ekran monitora:
  ```
  ~/.claude/settings.json
  { "model": "opus" }
  ```
- Dialog Junior dev: "Finally. The power of Opus is mine."
  - Dymek: normalny, pozycja: nad głową po prawej

**DETALE:** Na monitorze widać zapisany plik z zielonym checkmarkiem

---

### PANEL 2: The Rejection

**KOMPOZYCJA:** Zbliżenie na twarz deva i monitor

**BOHATEROWIE:**
- Junior dev: zaskoczenie, brwi uniesione, usta lekko otwarte

**PRZEDMIOTY/TŁO:**
- Monitor z terminalem, ten sam kubek kawy

**TEKST:**
- Ekran monitora:
  ```
  /status
  Model: haiku
  ```
- Dialog Junior dev: "...haiku?! I SAID OPUS!"
  - Dymek: krzyk (poszarpane krawędzie), pozycja: nad głową

**DETALE:** Na dole terminala małym fontem: "overridden by managed settings"

---

### PANEL 3: Escalation

**KOMPOZYCJA:** Seria trzech mini-paneli obok siebie (tryptyk), ten sam dev, coraz bardziej zdesperowany

**BOHATEROWIE:**
- Junior dev: panel A - skupiony; panel B - zirytowany; panel C - szalony (włosy sterczą)

**PRZEDMIOTY/TŁO:**
- Trzy monitory z trzema próbami

**TEKST:**
- Mini-panel A:
  - Ekran: `export ANTHROPIC_MODEL="opus"`
  - Narracja: "Attempt 2: env variable"
  - Mały tekst pod: "→ haiku"
- Mini-panel B:
  - Ekran: `claude --model opus`
  - Narracja: "Attempt 3: CLI flag"
  - Mały tekst pod: "→ haiku"
- Mini-panel C:
  - Ekran: `claude --model opus --effort max --please --i-beg-you`
  - Narracja: "Attempt 7: desperation"
  - Mały tekst pod: "→ haiku"

**DETALE:** Licznik prób przeskakuje z 3 na 7, sugerując pominięte nieudane próby

---

### PANEL 4: The Man Behind the Curtain

**KOMPOZYCJA:** Cięcie do drugiego biurka — IT Admin w osobnym pokoju, plan średni

**BOHATEROWIE:**
- IT Admin: siedzi wygodnie, nogi na biurku, spokojny uśmiech, pije kawę z kubka "sudo make coffee"

**PRZEDMIOTY/TŁO:**
- Monitor z jednolinijkowym plikiem JSON, plakat na ścianie "BUDGET IS BUDGET", roślinка na biurku

**TEKST:**
- Ekran monitora:
  ```
  managed-settings.json
  { "availableModels": ["haiku"] }
  ```
- Dialog IT Admin: "I love my job."
  - Dymek: normalny, pozycja: nad głową po lewej

**DETALE:** Na drugim monitorze w tle dashboard z wykresem kosztów API gwałtownie spadającym w dół

---

### PANEL 5: The Moral

**KOMPOZYCJA:** Split panel — lewa połowa: dev przy biurku, prawa: IT Admin. Między nimi pionowa linia

**BOHATEROWIE:**
- Junior dev: głowa na klawiaturze, pokonany, koszulka "I ❤️ Opus" widoczna
- IT Admin: unosi kubek jak toast, zadowolony

**TEKST:**
- Dialog Junior dev (myśl): "There are four config levels... and I control none of them."
  - Dymek: chmurka myśli, pozycja: nad głową
- Dialog IT Admin: "Managed settings: because democracy is overrated."
  - Dymek: normalny, pozycja: nad głową
- Narracja (na dole panelu): "In the hierarchy of settings, there is no appeals court."

**DETALE:** Na monitorze deva w tle: haiku poem wyplute przez Claude w modelu Haiku: "You wanted Opus / But budget says otherwise / Here is your haiku"
