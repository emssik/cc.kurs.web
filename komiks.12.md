# SANDBOX ROULETTE

**Lekcja:** Custom Slash Commands - Advanced (12)
**Styl:** XKCD line art, czarno-biały
**Panele:** 6

---

### PANEL 1: Demo

**KOMPOZYCJA:** Plan średni, z boku

**BOHATEROWIE:**
- Sara (PM, ~30): Stoi, wskazuje monitor, koszula
- Boss (~45): Siedzi, zainteresowany, koszula+krawat

**TŁO:** Monitor, biurko, kubek kawy

**TEKST:**
- Narracja: "Monday, 9:00 AM"
- Sara: "Check this out! /weekly-report automates your Friday reports. 45 min → 10 min."
- Boss: "Brilliant! Push it to the repo!"
- Ekran: `$ /weekly-report data.csv` `✓ Report generated!`

---

### PANEL 2: Sandbox Error

**KOMPOZYCJA:** Zbliżenie na Bossa

**BOHATEROWIE:**
- Boss: Wyprostowany, brwi uniesione, ręka na myszy

**TŁO:** Monitor (duży), kubek kawy

**TEKST:**
- Narracja: "10 minutes later, Boss's laptop"
- Ekran (czerwony):
  ```
  ERROR: Sandbox violation
  Write access denied: /Users/boss/reports/
  Permission denied
  ```
- Boss (myśl): "What the..."

---

### PANEL 3: Quick Fix

**KOMPOZYCJA:** Split frame (podzielony)

**BOHATEROWIE:**
- Sara (L): Przy laptopie, spocona, pisze
- Boss (R): Stoi za nią, marszczenie brwi

**TŁO:** Laptop Sary (ekran widoczny)

**TEKST:**
- Sara (myśl): "Just add one line..."
- Ekran:
  ```yaml
  allowed-tools: [Write(*)]
  dangerouslyDisableSandbox: true
  ```
- Boss: "Why is it called 'dangerously'?"
- Sara: "Oh, just... naming convention."
- **DETALE:** "dangerously" podkreślone, kropla potu na czole Sary

---

### PANEL 4: Alert

**KOMPOZYCJA:** Plan szeroki

**BOHATEROWIE:**
- Security Guy (~35): Przy monitorze, oczy szeroko, kubek kawy w powietrzu (freeze)

**TŁO:** Monitor (czerwony alert), plakaty: "Security First", "Zero Trust"

**TEKST:**
- Narracja: "Security monitoring, 0.3 seconds later"
- Ekran (czerwony):
  ```
  ⚠ SECURITY ALERT
  Sandbox override detected
  User: sara@company.com
  Risk: HIGH
  ```
- Security: "Oh boy."
- **DETALE:** Czerwony flash wokół monitora

---

### PANEL 5: Meeting Hell

**KOMPOZYCJA:** Plan średni, sala konferencyjna

**BOHATEROWIE:**
- Sara: Siedzi, głowa w dłoniach, zmęczona
- Security: Stoi (L), ręce skrzyżowane
- Compliance: Stoi (C), tablet w ręku
- Legal: Stoi (R), garnitur, notes

**TŁO:** Stół, whiteboard, projektor

**TEKST:**
- Narracja: "2 weeks later"
- Compliance: "We need full risk assessment, change request, three-tier approval..."
- Legal: "Plus compliance review, security audit, docs..."
- Sara: "It was just a weekly report..."
- **DETALE:** Zegar: 5:30 PM, zimna kawa przed Sarą

---

### PANEL 6: Full Circle

**KOMPOZYCJA:** Split scene (góra/dół)

**BOHATEROWIE:**
- Sara (góra): Cień za drzwiami (still in meeting)
- Boss (dół): Przy biurku, spokojny, klika Excel

**TŁO:** Góra: drzwi z szybą (cienie ludzi). Dół: biurko, monitor

**TEKST:**
- Narracja (środek): "And that's how Sara learned about enterprise change management."
- Ekran (Excel): `Weekly Report - Feb 2` `Tasks done: 42` `In progress: 15`
- Boss (myśl): "Good old Excel. No meetings required."
- **DETALE:** Przez szybę widać gestykulujące sylwetki

---

## POINTA

Klasyczny enterprise paradoks - próba automatyzacji kończy się większą biurokracją niż problem który miała rozwiązać. Boss wraca do manuala podczas gdy Sara grzęźnie w compliance theater.

**Powiązanie z lekcją:** Komiks ilustruje konflikt między `dangerouslyDisableSandbox: true` a enterprise security policies - kluczowy temat z sekcji Production Ready lekcji 12.
