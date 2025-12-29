# Lekcja 9: Tryby Uprawnień - Normal, Plan, Auto-Accept Mode

---

## Przypomnienie z lekcji 8

W poprzedniej lekcji poznałeś **slash commands** - skróty przyspieszające pracę z Claude Code:

- `/add-dir` - dodanie folderów do kontekstu
- `/clear` - czyszczenie kontekstu rozmowy
- `/help` - wyświetlenie listy wszystkich komend
- `/model` - zmiana modelu AI
- `/resume` - historia rozmów
- `/rewind` - cofnięcie ostatniej zmiany

Polecenia te to Twoja szybka nawigacja w Claude Code!

---

## 2 pytania do poprzedniej lekcji

**Q1:** Która komenda pozwala cofnąć ostatnią zmianę wprowadzoną przez Claude?

<details>
<summary>Odpowiedź</summary>
Komenda `/rewind` lub skrót klawiszowy `Esc` + `Esc` - cofnie kod i/lub konwersację do poprzedniego punktu.
</details>

**Q2:** Co dzieje się gdy użyjesz komendy `/clear`?

<details>
<summary>Odpowiedź</summary>
Komenda `/clear` czyści aktualny kontekst rozmowy, ale nie usuwa historii rozmów - ta pozostaje dostępna przez `/resume`.
</details>

---

## TLDR (Too Long; Didn't Read)

**Claude Code ma 3 tryby uprawnień (Permission Modes)**, między którymi przełączasz się skrótem `Shift+Tab` lub `Alt+M`:

1. **Normal Mode (domyślny)** - Claude pyta o pozwolenie przed każdą edycją plików
2. **Plan Mode** - Claude tworzy szczegółowy plan działania bez wykonywania zmian w plikach
3. **Auto-Accept Mode** - Claude automatycznie wykonuje wszystkie zmiany bez pytania

**Kiedy używać którego trybu?**
- Standardowa, bezpieczna praca → **Normal Mode** (pyta przed zmianą)
- Duże zmiany i architektura → **Plan Mode** (tylko plan)
- Zaufane, powtarzalne zadania → **Auto-Accept Mode** (automatyczne zmiany)

**Pro tip:** Używaj `Shift+Tab` aby szybko przełączać tryby w zależności od zadania!

---

## Mem z Twitter

<blockquote class="twitter-tweet">
<p lang="en" dir="ltr">Me switching between &quot;deep work mode&quot; and &quot;shallow work mode&quot; based on my energy levels:<br><br>Just like Claude Code has permission modes (Normal/Plan/Auto-Accept) for different tasks 😄<br><br>The key is: match the tool to the job, not the other way around.</p>
&mdash; Productivity meme
</blockquote>

[Link do mema o trybach pracy i produktywności](https://twitter.com/search?q=work%20modes%20productivity%20meme&src=typed_query)

*Kluczowe przesłanie:* Dobierz tryb pracy do zadania. Plan Mode do planowania, Auto-Accept do zaufanych operacji, Normal Mode do standardowej pracy.

---

## Tryby Uprawnień Claude Code - Normal, Plan, Auto-Accept

### Czym są tryby uprawnień (Permission Modes)?

Claude Code oferuje **3 tryby uprawnień**, które kontrolują sposób, w jaki Claude wykonuje zmiany w plikach. Możesz je przełączać używając skrótu `Shift+Tab` lub `Alt+M`.

**Przełączanie trybów:** Użyj `Shift+Tab` lub `Alt+M` aby cyklicznie przełączać: Normal Mode → Plan Mode → Auto-Accept Mode → Normal Mode...

---

### Szczegółowy przegląd trybów

| Tryb | Kiedy używać | Co robi Claude | Charakterystyka |
|------|--------------|----------------|-----------------|
| **Normal Mode** | Standardowa bezpieczna praca | Pyta o pozwolenie przed każdą zmianą | Domyślny tryb, maksymalna kontrola |
| **Plan Mode** | Złożone zadania, architektura | Tworzy plan bez wykonywania zmian | Tylko planowanie, zero edycji |
| **Auto-Accept Mode** | Zaufane, powtarzalne zadania | Automatycznie wykonuje wszystkie zmiany | Szybka praca, mniejsza kontrola |

---

### 1. Normal Mode (domyślny)

**Kiedy używać:**
- Standardowa praca z kodem
- Gdy chcesz mieć pełną kontrolę nad zmianami
- Uczysz się i chcesz rozumieć każdą zmianę
- Praca na produkcyjnym kodzie

**Co robi Claude:**
W Normal Mode, Claude **pyta o pozwolenie przed każdą edycją pliku**. Pokazuje diff i czeka na twoją decyzję: (y)es/(n)o/(s)how diff.

**Przykład:**

```bash
# Normal Mode (domyślny)
> Dodaj error handling do @src/api/users.ts

# Claude analizuje kod i proponuje zmiany
# Pokazuje diff:
# + try {
# +   const response = await fetch(...)
# + } catch (error) {
# +   console.error('API error:', error)
# +   throw error
# + }

# Pyta: Accept changes? (y)es/(n)o/(s)how diff
```

**Scenariusze biznesowe:**
- **Refaktoryzacja krytycznego kodu:** Pełna kontrola nad każdą zmianą
- **Nauka:** Możesz przejrzeć i zrozumieć każdą modyfikację
- **Code review:** Weryfikacja zmian przed zaakceptowaniem

---

### 2. Plan Mode

**Kiedy używać:**
- Złożone, wieloetapowe zadania
- Projektowanie architektury
- Migracje systemów
- Gdy nie jesteś pewien jak podejść do problemu
- Chcesz zobaczyć strategię przed wykonaniem

**Co robi Claude:**
W Plan Mode, Claude **tworzy szczegółowy plan działania** krok po kroku, **bez wykonywania żadnych zmian w plikach**. Możesz przejrzeć plan, zmodyfikować go, a następnie przełączyć na inny tryb aby go wykonać.

**Przykład:**

```bash
# Przełącz na Plan Mode
<Shift+Tab>  # Przełącz tryb

> Dodaj autentykację 2FA do aplikacji

# Claude tworzy plan:
# "Plan implementacji 2FA w 5 krokach:
#
# Krok 1: Instalacja zależności
#   - npm install speakeasy qrcode
#   - Czas: ~5 min
#
# Krok 2: Rozszerzenie User model
#   - Dodanie pól: twoFactorSecret, twoFactorEnabled
#   - Migracja bazy danych
#   - Czas: ~15 min
#
# Krok 3: API endpoints
#   - POST /auth/2fa/setup
#   - POST /auth/2fa/verify
#   - POST /auth/2fa/disable
#   - Czas: ~30 min
#
# Krok 4: Frontend komponenty
#   - QR code display
#   - Verification input
#   - Settings panel
#   - Czas: ~45 min
#
# Krok 5: Testy
#   - Unit testy dla API
#   - Integration testy
#   - Czas: ~30 min
#
# Całkowity czas: ~2 godziny
#
# Czy kontynuować? Możesz:
# - Zaakceptować cały plan
# - Zmodyfikować wybrane kroki
# - Przełączyć na Auto-Accept/Normal i wykonać"

# W Plan Mode NIE MA edycji plików - tylko planowanie
```

**Scenariusze biznesowe:**
- **Nowe projekty:** "Zaplanuj setup projektu e-commerce z Next.js, Stripe, i Prisma"
- **Migracje:** "Zaplanuj migrację z REST API na GraphQL"
- **Refaktoryzacja:** "Zaplanuj podział monolitu na microservices"
- **Bezpieczeństwo:** "Zaplanuj implementację OAuth 2.0 + 2FA"

---

### 3. Auto-Accept Mode

**Kiedy używać:**
- Zaufane, powtarzalne zadania
- Masowe zmiany (np. formatowanie, rename)
- Prototypowanie i eksperymenty
- Gdy masz backupy i możesz łatwo cofnąć zmiany

**Co robi Claude:**
W Auto-Accept Mode, Claude **automatycznie wykonuje wszystkie zmiany** bez pytania o pozwolenie. To najszybszy tryb, ale wymaga większego zaufania.

**UWAGA:** Ten tryb jest potężny - używaj go ostrożnie! Zawsze upewnij się, że masz aktywny system kontroli wersji (git) i możesz łatwo cofnąć zmiany.

**Przykład:**

```bash
# Przełącz na Auto-Accept Mode
<Shift+Tab>  # Przełącz tryb dwukrotnie (Normal → Plan → Auto-Accept)

> Zrefaktoruj wszystkie console.log na logger.info w @src/

# Claude automatycznie:
# - Znajduje wszystkie pliki z console.log
# - Zamienia je na logger.info
# - Wykonuje zmiany BEZ pytania o pozwolenie
# - Pokazuje podsumowanie zmian

# Zmienione pliki:
# ✓ src/utils/helper.ts (3 zmiany)
# ✓ src/api/users.ts (5 zmian)
# ✓ src/components/Dashboard.tsx (2 zmiany)
#
# Gotowe! 10 zmian w 3 plikach.
```

**Scenariusze biznesowe:**
- **Formatowanie kodu:** "Popraw wcięcia we wszystkich plikach @src/"
- **Rename refaktoring:** "Zmień wszystkie `getUserData` na `fetchUserData`"
- **Masowe aktualizacje:** "Dodaj JSDoc do wszystkich funkcji w @src/utils/"
- **Eksperymenty:** "Spróbuj różnych implementacji tego algorytmu"

**Pro tip:** Po zakończeniu pracy w Auto-Accept Mode, przełącz z powrotem na Normal Mode używając `Shift+Tab`.

---

### Pro-tipy dla trybów

#### **Workflow: Plan → Normal/Auto-Accept**

Najlepsze wyniki otrzymasz łącząc tryby w jeden workflow:

```bash
# 1. Zaplanuj (Plan Mode)
<Shift+Tab>  # Przełącz na Plan Mode
> Zaplanuj migrację komponentów do TypeScript

# Claude tworzy szczegółowy plan:
# ✓ Folder structure
# ✓ Dependencies to install
# ✓ Configuration files needed
# ✓ Step-by-step implementation

# 2. Wykonaj (Normal Mode lub Auto-Accept)
<Shift+Tab>  # Przełącz z powrotem na Normal lub Auto-Accept
> Wykonaj kroki 1-3 z planu

# W Normal Mode: Claude pyta o każdą zmianę
# W Auto-Accept Mode: Claude wykonuje automatycznie
```

#### **Szybkie przełączanie w trakcie pracy:**

```bash
# Pracujesz w Normal Mode
> Dodaj walidację do @src/forms/LoginForm.tsx
# Accept changes? (y)es/(n)o/(s)how diff
> y

# Teraz chcesz szybkie zmiany
<Shift+Tab><Shift+Tab>  # Przełącz na Auto-Accept
> Dodaj podobną walidację do wszystkich formularzy w @src/forms/

# Claude automatycznie zmienia wszystkie pliki
# Gotowe!

# Wróć do bezpiecznego trybu
<Shift+Tab>  # Przełącz z powrotem na Normal Mode
```

#### **Plan Mode dla eksploracji:**

```bash
<Shift+Tab>  # Przełącz na Plan Mode

> Stwórz nowy projekt e-commerce z Next.js, Stripe, i Prisma

# Claude tworzy szczegółowy plan bez zmian w plikach
# Możesz przejrzeć strategię zanim cokolwiek wykonasz

> Zmodyfikuj krok 3 - użyj Supabase zamiast Prisma

# Claude aktualizuje plan
# Wciąż żadnych zmian w plikach!
```

#### **Bezpieczeństwo: zawsze używaj git**

```bash
# Przed Auto-Accept Mode:
! git status
! git add .
! git commit -m "Before auto-accept changes"

<Shift+Tab><Shift+Tab>  # Auto-Accept Mode
> Wykonaj masowe zmiany...

# Jeśli coś pójdzie nie tak:
! git diff  # Zobacz co się zmieniło
! git reset --hard HEAD  # Cofnij wszystko
```

---

### Typowe błędy

| Błąd | Objaw | Rozwiązanie |
|------|-------|-------------|
| **Auto-Accept bez git** | Niemożliwe cofnięcie złych zmian | Zawsze commituj przed Auto-Accept Mode |
| **Brak planu dla dużych zmian** | Chaotyczna implementacja | Zacznij od Plan Mode |
| **Nie sprawdzenie trybu** | Nieoczekiwane zachowanie | Sprawdź aktywny tryb (wyświetlany w promptcie) |
| **Za szybkie akceptowanie w Normal** | Wprowadzenie błędów | Zawsze używaj 's' (show) przed 'y' |
| **Plan Mode → Auto-Accept** | Za mało kontroli nad zmianami | Lepiej Plan Mode → Normal Mode dla bezpieczeństwa |

---

### Przykład: Mieszane tryby w jednej sesji

Zobaczmy jak wykorzystać wszystkie 3 tryby w realnym projekcie - dodawanie 2FA do systemu:

```bash
# 1. PLAN MODE: Strategia
<Shift+Tab>  # Przełącz na Plan Mode
> Zaplanuj dodanie 2FA do systemu autentykacji

# Claude tworzy szczegółowy plan:
# Krok 1: Instalacja bibliotek (speakeasy, qrcode)
# Krok 2: Rozszerzenie User model
# Krok 3: API endpoints dla setup/verify
# Krok 4: Frontend komponenty
# Krok 5: Testy

# 2. NORMAL MODE: Implementacja krytycznych części
<Shift+Tab>  # Przełącz na Normal Mode
> Wykonaj kroki 1-3 z planu

# Claude implementuje backend
# Dla każdej zmiany pokazuje diff i pyta o approval
# Accept changes to User model? (y)es/(n)o/(s)how diff
> s  # Pokazuje diff
> y  # Akceptujesz

# 3. AUTO-ACCEPT MODE: Szybkie zmiany UI
<Shift+Tab><Shift+Tab>  # Przełącz na Auto-Accept
> Wykonaj krok 4 - dodaj komponenty UI

# Claude automatycznie dodaje:
# ✓ QRCodeDisplay.tsx
# ✓ VerificationInput.tsx
# ✓ TwoFactorSettings.tsx
# Gotowe bez pytania!

# 4. NORMAL MODE: Testy (wracamy do kontroli)
<Shift+Tab>  # Przełącz z powrotem na Normal
> Dodaj testy integracyjne dla 2FA

# Claude pokazuje testy i pyta o approval
# Accept changes? (y)es/(n)o/(s)how diff
> y

# Gotowe! Wykorzystałeś wszystkie 3 tryby optymalnie.
```

---

## Podsumowanie

**3 tryby uprawnień Claude Code (Permission Modes):**

1. **Normal Mode** - Claude pyta o pozwolenie przed każdą zmianą (domyślny)
2. **Plan Mode** - Claude tworzy plan bez wykonywania zmian w plikach
3. **Auto-Accept Mode** - Claude automatycznie wykonuje wszystkie zmiany

**Przełączanie:** `Shift+Tab` lub `Alt+M` - przełącza cyklicznie między trybami.

**Złota zasada:**
- Standardowa praca? → **Normal Mode** (bezpiecznie, pyta przed zmianą)
- Nie wiesz co zrobić? → **Plan Mode** (najpierw strategia)
- Zaufane, masowe zmiany? → **Auto-Accept Mode** (szybko, bez pytania)

**Najważniejsze zasady:**
- Zawsze miej aktywny git repository przed używaniem Auto-Accept Mode
- Używaj Plan Mode do złożonych zadań zanim cokolwiek wykonasz
- W Normal Mode zawsze sprawdzaj diff ('s') przed akceptacją ('y')

**Najlepszy workflow:**
Plan Mode (strategia) → Normal Mode (bezpieczne wykonanie) → git commit

---

## 3 pytania kontrolne

**Q1:** W jakim trybie Claude NIE modyfikuje plików wcale?

<details>
<summary>Odpowiedź</summary>
W **Plan Mode**. Ten tryb służy tylko do tworzenia planów działania - Claude nie wykonuje żadnych zmian w plikach, tylko planuje strategię.
</details>

**Q2:** Jaki skrót klawiszowy użyjesz aby przełączyć tryb uprawnień?

<details>
<summary>Odpowiedź</summary>
**Shift+Tab** lub **Alt+M** - przełącza cyklicznie: Normal Mode → Plan Mode → Auto-Accept Mode → Normal Mode...
</details>

**Q3:** Jaki jest domyślny tryb pracy w Claude Code i dlaczego jest bezpieczny?

<details>
<summary>Odpowiedź</summary>
**Normal Mode** jest domyślny. Jest bezpieczny, ponieważ Claude **zawsze pyta o pozwolenie** przed każdą zmianą w plikach. Możesz przejrzeć diff ('s'), zaakceptować ('y') lub odrzucić ('n') każdą zmianę.
</details>

---

## 2-3 zadania praktyczne

### Zadanie 1: Poznaj tryby - przełączanie

**Poziom:** Łatwy

1. Uruchom Claude Code w swoim projekcie
2. Sprawdź w którym trybie jesteś (powinien być **Normal Mode**)
3. Użyj `Shift+Tab` aby przełączyć na **Plan Mode**
4. Poproś Claude: "Zaplanuj dodanie funkcji logowania błędów"
5. Zauważ że Claude **NIE modyfikuje plików** - tylko planuje
6. Użyj `Shift+Tab` ponownie aby przejść do **Auto-Accept Mode**
7. Użyj `Shift+Tab` jeszcze raz aby wrócić do **Normal Mode**

**Cel:** Zrozumienie jak działają tryby i jak się między nimi przełączać.

---

### Zadanie 2: Workflow Plan → Normal Mode

**Poziom:** Średni

1. Przełącz na **Plan Mode** (`Shift+Tab`)
2. Poproś Claude: "Zaplanuj refaktoryzację funkcji w @src/" (wskaż konkretny plik w projekcie)
3. Przejrzyj szczegółowy plan
4. Przełącz na **Normal Mode** (`Shift+Tab`)
5. Polecenie: "Wykonaj krok 1 z planu"
6. Gdy Claude pokaże diff, użyj opcji `s` (show) aby zobaczyć zmiany
7. Zaakceptuj lub odrzuć zmiany (`y` lub `n`)

**Cel:** Nauczenie się bezpiecznego workflow: planowanie → kontrolowane wykonanie.

---

### Zadanie 3: Auto-Accept z git safety

**Poziom:** Zaawansowany

1. W terminalu wykonaj: `git status` i `git add . && git commit -m "Before auto-accept test"`
2. Przełącz na **Auto-Accept Mode** (`Shift+Tab` dwukrotnie)
3. Poproś Claude: "Dodaj komentarze JSDoc do wszystkich funkcji w @src/utils/" (lub podobny katalog)
4. Obserwuj jak Claude automatycznie zmienia pliki bez pytania
5. Sprawdź zmiany: `git diff`
6. Jeśli coś nie wygląda dobrze: `git reset --hard HEAD` (cofnij)
7. Jeśli wszystko OK: `git add . && git commit -m "Auto-generated JSDoc comments"`
8. Przełącz z powrotem na **Normal Mode** (`Shift+Tab`)

**Cel:** Bezpieczne używanie Auto-Accept Mode z git jako safety net.

---

## Linki

**Oficjalna dokumentacja:**
- [Claude Code - Interactive Mode (Permission Modes)](https://code.claude.com/docs/interactive-mode)
- [Claude Code - Slash Commands](https://code.claude.com/docs/slash-commands)
- [Claude Code - Checkpointing (Rewind)](https://code.claude.com/docs/checkpointing)

**Dodatkowe materiały:**
- [Claude Code - CLI Reference](https://code.claude.com/docs/cli-reference)
- [Claude Code - Settings](https://code.claude.com/docs/settings)

**Community resources:**
- [Reddit r/ClaudeAI - Workflows](https://reddit.com/r/ClaudeAI)
- [GitHub Topics - Claude Code](https://github.com/topics/claude-code)

---

**Następna lekcja:** Debugowanie i naprawianie błędów - jak Claude może pomóc Ci znaleźć i naprawić bugi szybciej niż kiedykolwiek.

Do zobaczenia! 👋
