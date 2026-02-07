# "The Blame Game"

**Źródło:** Lekcja 02.04 - Subagenty w Claude Code cz. 1
**Styl:** XKCD/CommitStrip - czarno-biały line art, minimalizm
**Tagline:** "When you can't debug what you can't see"

---

## PANEL 1: The Brief

**KOMPOZYCJA:** Plan średni, z boku

**BOHATEROWIE:**
- Dev (~28 lat): Przy biurku, zmęczony po długiej sesji. Potargane włosy, kubek kawy. Patrzy na monitor.

**PRZEDMIOTY/TŁO:**
- Monitor (ekran widoczny), klawiatura, biurko minimalistyczne. Okno w tle pokazuje wieczór (ciemno).

**TEKST:**
- Narracja: "After 2 hours of context pollution..."
- Ekran monitora:
  ```
  Main conversation: 78,000 tokens
  [mixed topics, old approaches, debug logs...]
  ```
- Dialog Dev: "Time for a fresh start. I'll delegate this to a subagent."
  - Dymek: normalny, nad głową

**DETALE:** Timestamp w rogu ekranu: 18:47

---

## PANEL 2: The Delegation

**KOMPOZYCJA:** Close-up na ekran + ręce na klawiaturze

**PRZEDMIOTY:**
- Terminal/Claude Code interface

**TEKST:**
- Ekran pokazuje:
  ```
  Dev: "Research OAuth flow and propose implementation"

  Claude (Main): "Delegating to research-agent..."
  ```
- Progress indicator: "Subagent working... (internal process hidden)"

**DETALE:** Spinner animation, subagent działa w tle

---

## PANEL 3: The Inheritance Problem

**KOMPOZYCJA:** Split panel (dwa obrazy obok siebie)

**Lewa strona - "What Dev thinks":**
- Czysta kartka, świeży start, subagent z pustym biurkiem

**Prawa strona - "What actually happens":**
- Subagent siedzi przy biurku zawalonym papierami (inherited context z main conversation)
- Papiery: "Old approach #1 (abandoned)", "Debug logs", "Mixed topics"
- Subagent zdezorientowany, drapie się po głowie

**TEKST:**
- Narracja lewa: "Fresh context"
- Narracja prawa: "Inherited garbage"

---

## PANEL 4: The Result

**KOMPOZYCJA:** Plan średni, dev przy biurku

**BOHATEROWIE:**
- Dev: Patrzy na ekran, zmieszany wyraz twarzy (confusion + frustration)

**PRZEDMIOTY:**
- Monitor pokazuje output od subagenta

**TEKST:**
- Ekran:
  ```
  Research-agent result:

  "Use JWT tokens with OAuth2 flow.
  Store in localStorage (approach #1 from context).
  No refresh tokens needed (per earlier discussion)."
  ```
- Dialog Dev: "Wait... what? I never said localStorage. And we NEED refresh tokens!"
  - Dymek: normalny, frustracja

**DETALE:** Dev marszczy brwi

---

## PANEL 5: The Investigation

**KOMPOZYCJA:** Plan bliski, dev + monitor

**BOHATEROWIE:**
- Dev: Pochyla się do ekranu, próbuje zrozumieć

**TEKST:**
- Dialog Dev: "Claude, why did the subagent decide localStorage?"
  - Dymek: normalny
- Odpowiedź Claude (Main):
  ```
  "I don't have visibility into the subagent's
  reasoning process. I only received the final output."
  ```
- Dialog Dev (myśl): "So... I'm debugging a black box?"
  - Dymek: thought bubble, pozycja nad głową

**DETALE:** Pot na czole deva

---

## PANEL 6: The Realization

**KOMPOZYCJA:** Szerokie, dev stoi przy tablicy/ścianie gdzie przykleja karteczki (detective style)

**BOHATEROWIE:**
- Dev: Stoi, marker w ręku, patrzy na "evidence board"

**PRZEDMIOTY/TŁO:**
- Ściana z karteczkami połączonymi strzałkami:
  - "Main context (polluted)" → strzałka → "Brief to subagent"
  - "Subagent inherited garbage" → "Made assumptions"
  - "No spec = no contract" → "Interpreted freely"

**TEKST:**
- Dialog Dev: "I gave it a vague brief... with polluted context... and no output contract..."
  - Dymek: normalny, revelation
- Dev (kontynuacja): "I wasn't debugging the subagent. I was debugging... my management."
  - Dymek: normalny, bitter realization

**DETALE:**
- Na dole ściany karteczka: "LESSON: Clean brief + Clear contract = Debuggable results"
- Kubek kawy (już pusty) na biurku w tle

---

## KLUCZOWE ELEMENTY

**Humor:**
1. Relatable pain - każdy, kto zarządzał ludźmi/AI, widział "ale ja myślałem że..."
2. Visual contrast - panel 3 (expectation vs reality) to instant clarity
3. Meta-realization - puenta nie jest "AI is dumb" tylko "I was a bad manager"
4. Bitter truth - nie możesz debugować procesu, którego nie widzisz

**Odniesienia do lekcji:**
- Context pollution (panel 1)
- Inheritance problemu (panel 3, z advanced lesson)
- Brak kontraktu wyjścia (panel 4-5)
- "Garbage brief" concept
- Delegacja bez specyfikacji prowadzi do założeń

**Przekaz edukacyjny:**
- Subagenty dziedziczą kontekst głównej rozmowy (jeśli jest zanieczyszczony, przekazujesz garbage)
- Brak visibility w proces myślowy subagenta = trudny debugging
- Potrzeba czystego brief + jasnego kontraktu wyjściowego
- "Don't debug the code, debug the spec/brief"
