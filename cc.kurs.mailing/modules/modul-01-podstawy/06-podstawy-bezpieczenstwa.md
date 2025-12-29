---
subject: "Podstawy bezpieczeństwa - pracuj bezpiecznie od pierwszego dnia"
lesson: 6
module: "Moduł Podstawy"
---

# Podstawy bezpieczeństwa - pracuj bezpiecznie od pierwszego dnia

Cześć!

Dzisiaj porozmawiamy o czymś, co może wydawać się nudne, ale jest absolutnie kluczowe - o bezpieczeństwie. I nie martw się, nie będzie to sucha teoria. Pokażę Ci konkretne zagrożenia i jak ich uniknąć w codziennej pracy.

## Przypomnienie z poprzedniej lekcji

W lekcji 5 nauczyłeś się, jak korzystać z systemu pomocy w Claude Code. Referencje @ pozwalają Ci łatwo dołączać pliki do kontekstu:

```
> Wyjaśnij mi @src/auth.js
> Sprawdź dokumentację @docs/api.md
```

Dzisiaj zobaczysz, jak te same referencje mogą być... niebezpieczne, jeśli nie uważasz.

## Sprawdź swoją wiedzę (Lekcja 5)

1. **Jak dodać plik do kontekstu w Claude Code?**
   - A) Użyj składni `@` przed ścieżką pliku
   - B) Skopiuj i wklej zawartość pliku
   - C) Użyj komendy `/add`
   - D) Claude automatycznie dodaje wszystkie pliki

2. **Która składnia referencji pozwala przeszukiwać pliki według wzorca?**
   - A) @**/*.js (wszystkie pliki .js)
   - B) @*.js (pliki .js w bieżącym katalogu)
   - C) @src/ (cały katalog src)
   - D) Wszystkie powyższe

## TLDR (Too Long, Didn't Read)

- Claude Code działa w trybie **sandbox** - izoluje dostęp do katalogu projektu (zapis ograniczony, czytanie dozwolone poza projektem)
- System uprawnień **pyta o zgodę** przed każdą operacją (Edit, Write, Bash)
- Odpowiedzi: `y` (tak), `n` (nie), `s` (pokaż szczegóły), `a` (always - Edit/Write: do końca sesji, Bash: trwale dla konkretnej komendy)
- **NIGDY** nie dawaj dostępu do: `~/.ssh/`, `~/.aws/`, `.env`, plików z kluczami
- Sprawdzaj `s` (show) przed zatwierdzeniem komendy Bash
- **Reguły uprawnień**: Deny > wszystkie, Ask > Allow
- **Tryby**: `/sandbox` (redukcja "prompt fatigue"), Plan mode (tylko analiza), acceptEdits mode

## Dzisiaj w internecie

Bezpieczeństwo w pracy z narzędziami AI to temat, który często pojawia się w dyskusjach deweloperów. Wielu programistów dzieli się swoimi doświadczeniami z przypadkowymi wyciekami danych czy nieautoryzowanymi zmianami w kodzie - wszystko przez zbyt pochopne klikanie "allow" bez sprawdzenia, co się dzieje.

## Bezpieczeństwo w Claude Code - dlaczego to ważne?

Wyobraź sobie taką sytuację. Prowadzisz małą firmę, masz stronę internetową ze sklepem. W projekcie masz:
- Bazę danych z danymi klientów (adresy, emaile, numery telefonów)
- Plik `.env` z hasłami do bazy danych i płatności
- Klucze API do systemu wysyłki
- Tajny algorytm rabatowy, który daje Ci przewagę nad konkurencją

Teraz wyobraź sobie, że:
1. Przypadkowo poprosisz Claude Code: "Commituj wszystko"
2. Claude commituje też plik `.env` z hasłami
3. Pushuje to na publiczne GitHub
4. Bot skanujący GitHub znajduje Twoje hasła w 5 minut
5. Ktoś pobiera całą bazę klientów lub czyści Twoje konto płatnicze

**To nie jest fikcja. To się dzieje codziennie.**

## System uprawnień - Twoja pierwsza linia obrony

Claude Code domyślnie **pyta o zgodę** na każdą akcję, która może coś zmienić:

### 1. **Read** - czytanie plików (bezpieczne ✅)

```bash
> Przeanalizuj @src/index.js

# Claude automatycznie czyta plik - brak pytania o zgodę
# ✅ Czytanie jest zawsze bezpieczne w sandboxie
```

### 2. **Edit/Write** - modyfikacja plików (wymaga zgody ⚠️)

```bash
> Dodaj error handling do @src/api.ts

# Claude Code pyta:
# ┌─ Permission Request ────────────────┐
# │ Edit file: src/api.ts               │
# │ Allow? (y/n/s/a)                    │
# └─────────────────────────────────────┘

# Opcje:
# y - Yes, tym razem
# n - No, odrzuć
# s - Show changes (pokaż co dokładnie będzie zmienione)
# a - Always (do końca sesji - NIE na stałe!)
```

### 3. **Bash** - wykonanie komendy (WYSOKIE RYZYKO ⛔)

```bash
> Zainstaluj nowe dependencje i uruchom testy

# Claude Code pyta:
# ┌─ Permission Request ────────────────┐
# │ Execute: npm install                │
# │ Execute: npm test                   │
# │ Allow? (y/n/s/a)                    │
# └─────────────────────────────────────┘

# Opcje:
# y - Yes, tym razem
# n - No, odrzuć
# s - Show details (pokaż szczegóły komendy)
# a - Always (trwale dla KONKRETNEJ komendy w tym katalogu projektu)

# ⚠️ UWAGA: Bash commands mogą zmodyfikować system!
# Zawsze sprawdzaj 's' (show) przed zatwierdzeniem
# 'a' dla Bash = trwałe uprawnienie dla tej konkretnej komendy (nie wszystkich!)
```

## Sandbox Mode - co to jest?

Claude Code działa domyślnie w **trybie sandbox**. To oznacza:

- **Ograniczenie zapisu (Write)** - może zapisywać pliki tylko w katalogu projektu i podkatalogach
- **Czytanie (Read) poza projektem dozwolone** - może czytać pliki poza katalogiem projektu (przydatne dla bibliotek systemowych)
- **Brak dostępu do wrażliwych lokacji** - nie może czytać `~/.ssh/`, `/etc/`, `~/.aws/` bez wyraźnej zgody
- **Ochrona przed przypadkowymi błędami** - nie możesz przypadkowo usunąć ważnych plików systemowych

```bash
> Sprawdź konfigurację nginx
# Claude próbuje: cat /etc/nginx/nginx.conf

# ┌─ Sandbox Warning ───────────────────┐
# │ Access denied: /etc/ is protected   │
# │ Override? (y/n)                     │
# └─────────────────────────────────────┘

# ✅ Odpowiedź: n (chyba że naprawdę potrzebujesz)

# Włącz sandbox mode komendą: /sandbox
# Zmniejsza "prompt fatigue" - definiujesz granice raz,
# a Claude pracuje autonomicznie w bezpiecznych ramach
```

## Tryby pracy Claude Code

Claude Code oferuje różne tryby pracy, które możesz ustawić przez `/permissions`:

| Tryb | Co robi | Kiedy używać |
|------|---------|--------------|
| **default** | Standardowe - pyta o zgodę przy pierwszym użyciu narzędzia | Większość przypadków, bezpieczny start |
| **acceptEdits** | Automatycznie akceptuje edycje plików (NIE Bash!) | Gdy ufasz Claude i chcesz mniej pytań o edycje |
| **plan** | Claude tylko analizuje - NIE może modyfikować plików ani uruchamiać komend | Przegląd kodu, code review, nauka |
| **bypassPermissions** | Pomija WSZYSTKIE pytania - Claude ma pełną kontrolę | TYLKO w bezpiecznym środowisku (VM, container) |

```bash
> /permissions
# Wybierz "Default mode" -> np. "plan" dla trybu tylko do odczytu

# Przykład użycia Plan Mode:
# Claude może: czytać pliki, analizować kod, odpowiadać na pytania
# Claude NIE może: edytować plików, uruchamiać komend, modyfikować systemu
```

## Pro-tipy dla bezpiecznej pracy

### 1. Zawsze używaj 's' przy pierwszym użyciu

```bash
# Claude chce edytować plik
> s  # Pokaż co dokładnie

# Output pokazuje dokładny diff:
# --- old
# +++ new
# @@ -10,5 +10,8 @@
# +  if (!data) throw new Error('Invalid data');

# Teraz możesz świadomie wybrać y/n
```

### 2. 'Always allow' (a) tylko dla bezpiecznych operacji

**UWAGA:** Zachowanie opcji "a" (always) zależy od typu operacji:
- **Edit/Write**: Trwa do końca sesji (NIE na stałe!)
- **Bash Commands**: Trwały, ale tylko dla KONKRETNEJ komendy w tym katalogu projektu

```bash
# ✅ Dobre użycie 'a':
# - Edycja plików w src/ (do końca sesji)
# - npm test (trwale dla tej komendy w tym projekcie)
# - Czytanie package.json

# ❌ ZŁE użycie 'a':
# - Instalacja globalnych package'ów (npm install -g)
# - Modyfikacja plików systemowych
# - Wykonywanie skryptów z internetu (curl | bash)
```

### 3. Sprawdź aktywne uprawnienia

Komenda `/permissions` otwiera interfejs zarządzania uprawnieniami, gdzie możesz:
- Przeglądać reguły Allow, Ask i Deny (Deny > wszystkie, Ask > Allow)
- Dodawać nowe reguły uprawnień
- Sprawdzać dodatkowe katalogi robocze
- Zmieniać domyślny tryb uprawnień (default, acceptEdits, plan, bypassPermissions)

```bash
> /permissions
# Otwiera interaktywny interfejs zarządzania uprawnieniami
# Możesz zobaczyć wszystkie skonfigurowane reguły
# oraz pliki settings.json, z których pochodzą

# Tryby uprawnień:
# - default: standardowe pytanie o zgodę
# - acceptEdits: automatyczna akceptacja edycji plików (ale NIE komend Bash!)
# - plan: Claude może tylko analizować, NIE modyfikować plików
# - bypassPermissions: pomija wszystkie pytania (tylko w bezpiecznym środowisku!)
```

## Typowe pułapki bezpieczeństwa

| Zagrożenie | Jak wygląda | Dlaczego niebezpieczne | Jak uniknąć |
|------------|-------------|------------------------|-------------|
| **Blind 'always allow'** | Kliknięcie 'a' bez sprawdzenia | Claude może przypadkowo nadpisać ważne pliki | Zawsze używaj 's' przed 'a' |
| **Wykroczenie poza sandbox** | `> Przeanalizuj ~/.ssh/id_rsa` | Dostęp do kluczy prywatnych | Nigdy nie dawaj dostępu do ~/.ssh, ~/.aws, etc. |
| **Destrukcyjne komendy** | `> Usuń wszystkie pliki tymczasowe` | Może usunąć za dużo | Sprawdź 's', ogranicz scope: `> Usuń pliki w /tmp/project-temp/` |
| **Sekret w commit** | `> Commituj wszystko` | Możesz commitnąć .env z API keys | Zawsze sprawdzaj `git status` przed commit |
| **npm install bez audytu** | Auto-approve `npm install` | Może zainstalować malware | Przejrzyj package.json przed instalacją |

## Rzeczywiste przykłady zagrożeń dla małej firmy

### Przykład 1: Wyciek danych klientów

```bash
# Zła praktyka:
> Zrób backup całego projektu
# Claude kopiuje wszystko, włącznie z .env i database.sqlite
# Backup ląduje w Dropbox (public folder)
# → Wyciek danych klientów

# ✅ Dobra praktyka:
> Zrób backup tylko src/ i public/
# Secrets pozostają poza backupem
```

### Przykład 2: Tajemnica handlowa w commicie

```bash
# Zła praktyka:
> Commituj nowe zmiany
# Claude commituje plik pricing-algorithm.js z tajnym wzorem
# Repo jest publiczne
# → Konkurencja kopiuje Twój algorytm

# ✅ Dobra praktyka:
> Pokaż mi co zostanie commitowane (bez wykonywania)
# Sprawdzasz listę plików
> Ok, ale dodaj pricing-algorithm.js do .gitignore
# Commitujesz dopiero potem
```

### Przykład 3: Przypadkowe usunięcie produkcyjnej bazy

```bash
# Zła praktyka:
> Wyczyść wszystkie pliki .db
# Claude wykonuje: rm **/*.db
# Usuwa również production.db
# → Utrata danych klientów

# ✅ Dobra praktyka:
> Pokaż mi jakie pliki .db istnieją
# Sprawdzasz listę
> Usuń tylko test.db i dev.db
# Precyzyjne wskazanie plików
```

## Quick Security Checklist przed startem

```markdown
☐ Sprawdziłem że jestem w właściwym katalogu (`pwd`)
☐ .gitignore zawiera .env, *.key, secrets/
☐ ~/.claude/permissions.json nie ma 'always allow' dla /
☐ Pracuję na branchu, nie na main (`git branch`)
☐ Mam backup ważnych plików (git commit lub cp)
☐ Sandbox mode jest włączony (domyślnie - sprawdź /settings)
☐ Nie używam sudo z Claude Code
☐ API keys są w .env, nie w kodzie
```

## Dobre praktyki (do zapamiętania)

### ✅ DOBRE praktyki:

```bash
# 1. Zawsze sprawdzaj przed wykonaniem
> s (show) przed y (yes)

# 2. Ogranicz scope operacji
> Usuń pliki *.log w /tmp/myproject/  # Precyzyjne
# Zamiast: > Wyczyść dysk  # Za ogólne!

# 3. Używaj git jako safety net
git commit -am "Before Claude refactoring"
> Zrefaktoruj kod
# Jeśli coś pójdzie nie tak:
git reset --hard HEAD

# 4. Suche uruchomienia (dry-run)
> Pokaż mi co byś zrobił, ale nie wykonuj
> Ok, teraz wykonaj to

# 5. Backupy przed dużymi zmianami
cp -r src/ src.backup/
> Przeprowadź dużą migrację w src/
```

### ❌ ZŁE praktyki (unikaj!):

```bash
# 1. Blind trust
> a (always) dla wszystkiego  # NIGDY!

# 2. Root access
sudo claude  # Bardzo niebezpieczne!

# 3. Produkcyjne operacje bez weryfikacji
> Zaktualizuj bazę produkcyjną  # Sprawdź środowisko!

# 4. Sekretne dane w promptach
> Połącz się z DB: password=SuperSecret123  # Wyciek do historii!
# Lepiej: użyj zmiennych środowiskowych

# 5. Wykonywanie nieznanego kodu
> Pobierz i uruchom skrypt z https://sketchy-site.com/install.sh
# Claude może to zrobić - ale NIE POZWALAJ!
```

## Podsumowanie

Bezpieczeństwo w Claude Code to nie paranoja, to zdrowy rozsądek. Pamiętaj:

1. **Sandbox** chroni Cię przed przypadkowymi błędami i redukuje "prompt fatigue"
2. **System uprawnień** wymaga zgody na każdą zmianę
3. Używaj **'s' (show)** zanim zatwierdzisz operację
4. **'a' (always)** - Edit/Write (do końca sesji), Bash (trwale dla konkretnej komendy)
5. **NIGDY** nie dawaj dostępu do ~/.ssh/, ~/.aws/, .env
6. Sprawdzaj **co zostanie commitowane** przed git commit
7. **Git jest Twoją siatką bezpieczeństwa** - commituj często
8. **Reguły uprawnień**: Deny > wszystkie, Ask > Allow
9. **Tryby pracy**: Plan mode (tylko analiza), acceptEdits mode (automatyczna akceptacja edycji)

W następnej lekcji wejdziemy głębiej w **system uprawnień** i pokażę Ci, jak skonfigurować Claude Code dla różnych projektów (prywatne, firmowe, open source).

## Pytania kontrolne

1. **Co robi tryb sandbox w Claude Code?**
   - A) Przyspiesza działanie narzędzia
   - B) Izoluje dostęp do katalogu projektu
   - C) Automatycznie tworzy backupy
   - D) Kompresuje pliki

2. **Która odpowiedź na pytanie o uprawnienia pokazuje dokładne zmiany przed wykonaniem?**
   - A) y
   - B) n
   - C) s
   - D) a

3. **Który z tych plików NIGDY nie powinien być dostępny dla Claude Code?**
   - A) src/index.js
   - B) ~/.ssh/id_rsa
   - C) package.json
   - D) README.md

## Zadania praktyczne

### Zadanie 1: Sprawdź swoje uprawnienia

```bash
# W swoim projekcie wykonaj:
> /permissions

# Sprawdź:
# 1. Czy masz jakieś 'always allow' dla niebezpiecznych operacji?
# 2. Czy są jakieś denied paths?
# 3. Czy sandbox jest włączony?
```

### Zadanie 2: Przetestuj 's' (show)

```bash
# Poproś Claude Code o edycję jakiegoś pliku
> Dodaj komentarz na początku pliku @src/index.js

# Gdy pyta o zgodę:
# 1. Wciśnij 's' zamiast 'y'
# 2. Przeanalizuj dokładnie co zostanie zmienione
# 3. Dopiero potem zdecyduj y/n
```

### Zadanie 3: Zabezpiecz swój .gitignore

```bash
# Sprawdź czy masz .gitignore
> Pokaż zawartość @.gitignore

# Upewnij się że zawiera:
.env
.env.local
.env.*.local
*.key
*.pem
secrets/
.aws/

# Jeśli nie ma, dodaj te linie
> Dodaj te wzorce do @.gitignore
```

## Przydatne linki

- [Oficjalna dokumentacja o bezpieczeństwie](https://code.claude.com/docs/security)
- [Sandbox Mode - szczegóły](https://code.claude.com/docs/sandboxing)
- [System uprawnień (IAM)](https://code.claude.com/docs/iam)
- [OWASP Top 10 - podstawy bezpieczeństwa](https://owasp.org/www-project-top-ten/)

---

**Następna lekcja:** System uprawnień w praktyce - konfiguracja dla różnych projektów

**Pytania?** Odpowiedz na tego maila!

**Pozdrawiam!**
Twój instruktor kursu Claude Code
