# Podstawy bezpieczeństwa - pracuj bezpiecznie od pierwszego dnia

Dzisiaj porozmawiamy o czymś, co może wydawać się nudne, ale jest naprawdę ważne - o bezpieczeństwie. I nie martw się, nie będzie to sucha teoria. Pokażę Ci konkretne zagrożenia i jak ich uniknąć w codziennej pracy - bez względu na to, czy jesteś programistą, marketerem, project managerem czy pisarzem freelancerem.

## Referencje @ - szybkie przypomnienie

W ostatniej lekcji poznałeś referencje @, które pozwalają dołączać pliki do kontekstu:

```
> Wyjaśnij mi @src/auth.js
> Sprawdź dokumentację @docs/api.md
```

Dzisiaj zobaczysz, jak te same referencje mogą być... niebezpieczne, jeśli nie uważasz.

## Sprawdź swoją wiedzę (Lekcja 5)

*(Odpowiedzi znajdziesz na końcu maila)*

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

- **System uprawnień**: Domyślnie Claude pyta o zgodę przy pierwszym użyciu Edit/Write/Bash; dalsze zachowanie zależy od trybu i reguł, a w `/sandbox` (auto-allow) Bash może nie pytać
- Odpowiedzi: `y` (tak), `n` (nie), `a` (always - dodaje regułę allow)
- **'a' (always)**: Always dodaje regułę allow dla danej komendy/patternu; zakres zależy od tego, gdzie zapiszesz (sprawdź `/permissions`)
- **Sandbox** izoluje dostęp do systemu plików i sieci (włącz przez `/sandbox`)
- **NIGDY** nie dawaj dostępu do: `~/.ssh/`, `~/.aws/`, `.env`, plików z kluczami
- **Tryby uprawnień**: `default`, `acceptEdits`, `plan`, `bypassPermissions`

**⚠️ Uwaga:** Ten mail jest długi i może być obcięty przez Gmail. W razie problemów: [webversion]

---

## Dzisiaj w internecie

Firma GitGuardian regularnie skanuje publiczne repozytoria GitHub i znajduje dziesiątki milionów (!!!) wycieków "sekretów" każdego roku. Większość to hasła do baz danych, klucze API i tokeny dostępu - wszystko commitowane przez programistów, którzy nie sprawdzili co trafia do repozytorium.

To nie są abstrakcyjne statystyki. Każdy z nas może popełnić ten błąd.

Tak międzynami, nie chciało mi się w to wierzyć, ale patrz -> https://blog.gitguardian.com/pr-state-of-secrets-sprawl-2023/

## Bezpieczeństwo w Claude Code - dlaczego to ważne dla CIEBIE?

### Scenariusz 1: Programista / DevOps

Wyobraź sobie: pracujesz nad projektem ze sklepem internetowym. W projekcie masz:
- Bazę danych z danymi klientów (adresy, emaile, numery telefonów)
- Plik `.env` z hasłami do bazy danych i płatności
- Klucze API do systemu wysyłki
- Tajny algorytm rabatowy

Teraz:
1. Przypadkowo poprosisz Claude Code: "Zapisz wszystkie zmiany w historii projektu" (git commit)
2. Claude commituje też plik `.env` z hasłami
3. Pushuje to na publiczne GitHub
4. Bot skanujący GitHub znajduje Twoje hasła w 5 minut
5. Ktoś pobiera całą bazę klientów lub czyści Twoje konto płatnicze

**To się dzieje codziennie.**

### Scenariusz 2: Marketer

Prowadzisz kampanię marketingową dla klienta. Masz:
- Dokument ze strategią kampanii i budżetami (Q1-2025-strategy.docx)
- Listę mailingową z kontaktami VIP (vip-clients.xlsx)
- Hasło do konta reklamowego Facebook (facebook-ads-credentials.txt)
- Plan premier produktów z datami (product-launches.md)

Prosisz Claude: "Zrób mi backup wszystkich plików projektu na Dropbox"
→ Backup trafia do folderu, który jest współdzielony z freelancerem graficznym
→ Freelancer widzi wszystkie Twoje sekrety, budżety i plany
→ Konkurencja dowiaduje się o planach premier przed czasem

### Scenariusz 3: Freelance Writer / Content Creator

Piszesz artykuły dla kilku klientów jednocześnie. W projekcie:
- Drafty artykułów dla różnych klientów
- Notatki z briefingów (zawierają poufne informacje biznesowe)
- Dokument z hasłami do CMS-ów różnych klientów
- Unikalna metodologia pisania, która daje Ci przewagę

Mówisz Claude: "Wyczyść wszystkie stare wersje robocze"
→ Claude usuwa folder "drafts-2025"
→ W tym folderze był też draft dla klienta A, nad którym pracowałeś wczoraj
→ Tracisz 8 godzin pracy, deadline mija za godzinę

### Scenariusz 4: Project Manager / HR

Zarządzasz zespołem i planujesz zmiany organizacyjne. Masz:
- Roadmap produktu z datami (confidential-roadmap.md)
- Plan zwolnień w zespole (layoffs-plan.xlsx)
- Budżet projektu z marżami (project-budget-2025.xlsx)
- Feedback od zespołu o menadżerze

Prosisz Claude: "Commituj pliki planowania do repo zespołowego"
→ Claude dodaje też confidential-roadmap.md i layoffs-plan.xlsx
→ Repo jest dostępne dla całego zespołu
→ Informacje o zwolnieniach wyciekają przed oficjalnym ogłoszeniem
→ Panika w zespole, spada morale, ludzie zaczynają szukać nowych prac

**Każdy z tych scenariuszy jest jak najbardziej realny, niektóre z nich i wiele podobnych miałem okazję widzieć na włąsne zmęczone oczęta :)**

## System uprawnień - Twoja pierwsza linia obrony

Claude Code domyślnie **pyta o zgodę** przy pierwszym użyciu narzędzi, które mogą coś zmienić (Edit, Write, Bash). Dalsze zachowanie zależy od trybu uprawnień i zapisanych reguł. W praktyce wygląda to tak:

### 1. **Read** - czytanie plików (bezpieczniejsze ✅)

```bash
> Przeanalizuj @src/index.js
# Claude automatycznie czyta plik - brak pytania o zgodę
# ✅ Read nie zmienia plików, ale sekrety i tak warto blokować regułami Read/deny
```

### 2. **Edit/Write** - modyfikacja plików (wymaga zgody ⚠️)

```bash
> Dodaj error handling do @src/api.ts

# Claude Code pyta:
# ┌─ Permission Request ────────────────┐
# │ Edit file: src/api.ts               │
# │ Allow? (y/n/a)                      │
# └─────────────────────────────────────┘

# Opcje:
# y - Yes, tym razem
# n - No, odrzuć
# a - Always (dodaje regułę allow; zakres zależy od ustawień /permissions)
```

**Pro-tip z mojego doświadczenia:** Na początku, nie będziesz miał zaufania do modelu. Będziesz sprawdzał każdą zmianę, później pozwolisz mu na wszystko. A prawda... Jak zwykle leży po środku. Gdy temat dotyczy istotnych rzeczy. Na pewno warto potwierdzić, czy model czegoś nie pomieszał. Zwłaszcza gdy chodzi o rzeczy, które się skalują. Np. gdy tworzysz prompt, który będzie używany wielokrotnie, albo plan realizacji rozbudowanego zadania, gdzie błąd w początkowym punkcie spowoduje, że cały projekt się nie uda.

Spokojnie. Nauczysz się. 

### 3. **Bash** - wykonanie komendy (WYSOKIE RYZYKO ⛔)

```bash
> Zainstaluj nowe dependencje i uruchom testy

# Claude Code pyta:
# ┌─ Permission Request ────────────────┐
# │ Execute: npm install                │
# │ Execute: npm test                   │
# │ Allow? (y/n/a)                      │
# └─────────────────────────────────────┘

# Opcje:
# y - Yes, tym razem
# n - No, odrzuć
# a - Always (dodaje regułę allow; zakres zależy od ustawień /permissions)

# ⚠️ UWAGA: Bash commands mogą zmodyfikować system!
# Zawsze sprawdź dokładnie komendę przed zatwierdzeniem
# Always dodaje regułę allow dla danej komendy/patternu (sprawdź /permissions)
```

## Sandbox Mode - Twoja piaskownica bezpieczeństwa

Claude Code ma wbudowaną ochronę - **Sandbox Mode** (piaskownica). To jak plac zabaw dla dzieci - mogą bawić się swobodnie, ale nie wyjdą poza ogrodzenie. W praktyce:

### Jak działa Sandbox?

**Izolacja systemu plików:**
- **Ograniczenie zapisu** - Claude zapisuje pliki tylko w Twoim katalogu projektu (np. `/moj-projekt/`), nie może nadpisać ważnych plików systemowych ani plików w `~/.bashrc`, `~/.zshrc`
- **Czytanie poza projektem OK** - może czytać pliki spoza projektu (przydatne, gdy analizujesz biblioteki systemowe)
- **Blokowanie wrażliwych miejsc** - możesz skonfigurować w ustawieniach Claude Code (`/permissions`), żeby zablokować dostęp do `~/.ssh/`, `~/.aws/` i innych wrażliwych katalogów

**Izolacja sieci:**
- **Kontrola domen** - Claude może łączyć się tylko z zatwierdzonymi domenami
- **Pytanie o nowe domeny** - próba połączenia z nową domeną wymaga Twojej zgody
- **Ochrona przed wyciekiem** - Sandbox znacząco ogranicza eksfiltrację danych, ale nie eliminuje jej w 100% (np. domain fronting, zbyt szerokie allowlisty mogą stanowić ryzyko)

**Techniczne podstawy (dla zaawansowanych):**
- **Linux**: Używa [bubblewrap](https://github.com/containers/bubblewrap) dla izolacji
- **macOS**: Używa Seatbelt dla sandbox enforcement
- **Open source**: Sandbox runtime jest [dostępny na GitHub](https://github.com/anthropic-experimental/sandbox-runtime) - możesz go użyć w swoich projektach!

### Włącz Sandbox

```bash
> /sandbox

# Wybierz tryb:
# 1. Auto-allow mode (domyślny) - komendy w sandboxie wykonują się automatycznie
# 2. Regular permissions mode - wszystkie komendy wymagają zgody
```

**Moja rekomendacja:** Zacznij od Auto-allow mode. Zmniejsza "prompt fatigue" (zmęczenie ciągłym klikaniem) i pozwala Claude pracować bardziej autonomicznie w bezpiecznych ramach.

### ⚠️ Sandbox limitations (dla zaawansowanych)

Sandbox nie jest idealny. Poznaj ograniczenia (dla zaawansowanych):

1. **Domain fronting bypass**: Atakujący może obejść filtr domen używając techniki [domain fronting](https://en.wikipedia.org/wiki/Domain_fronting)
2. **Unix sockets**: Jeśli zezwolisz na dostęp do `/var/run/docker.sock`, Claude może uzyskać dostęp do hosta przez Docker
3. **Filesystem privilege escalation**: Zbyt szerokie uprawnienia zapisu (np. do `~/.bashrc`) mogą prowadzić do eskalacji uprawnień
4. **Kompatybilność**: Niektóre narzędzia nie działają w sandboxie (np. `watchman`, `docker`)

**Rozwiązania:**
- Dla `docker`: Dodaj do `excludedCommands` w settings.json
- Dla `jest`: Użyj `jest --no-watchman`

## Tryby uprawnień - dopasuj do swojego stylu pracy

Claude Code oferuje różne tryby pracy, które przełączasz przez **Shift+Tab**:

### default
**Co robi:** Pyta o zgodę przy pierwszym użyciu narzędzia

**Kiedy używać:** Większość przypadków, bezpieczny start

### acceptEdits
**Co robi:** Automatycznie akceptuje edycje plików (NIE Bash!)

**Kiedy używać:** Gdy ufasz Claude i chcesz mniej pytań o edycje

### plan
**Co robi:** Claude buduje plan implementacji - NIE może modyfikować plików ani uruchamiać komend

**Kiedy używać:** Planowanie większych zmian, projektowanie architektury, przygotowanie strategii implementacji

### bypassPermissions
**Co robi:** Pomija WSZYSTKIE pytania - Claude ma pełną kontrolę

**Kiedy używać:** TYLKO w bezpiecznym środowisku (VM, container)

```bash
> /permissions
# Otwiera menu zarządzania uprawnieniami
# Możesz dodać reguły Allow/Ask/Deny
```

**Przykład użycia Plan Mode:**
```bash
# Chcesz dodać nową funkcję do aplikacji
> [Naciśnij Shift+Tab i wybierz "Plan mode"]
> Pomóż mi zaplanować dodanie systemu autoryzacji użytkowników do @src/app.js

# Claude może: czytać pliki, badać kod, proponować plan implementacji
# Claude NIE może: edytować plików, uruchamiać komend, modyfikować systemu
# ✅ Idealne do przemyślenia podejścia przed rozpoczęciem implementacji!
# Ostatecznie na końcu dostajesz gotowy plan pracy
```

Niedawno Claude Code dostał dodatkową komendę `/plan` zapoznaj się z nią, poeksperymentuj, to nie gryzie :)

## Quick Security Checklist przed startem

Jeśli jesteś na początku swojej przygody z Claude Code warto zwracać uwagę na poniższe punkty. 

```markdown
☐ Sprawdziłem że jestem w właściwym katalogu (`pwd` w terminalu)
☐ .gitignore zawiera wrażliwe pliki (.env, *.key, secrets/, credentials.*)
☐ Nie mam 'always allow' dla niebezpiecznych operacji (sprawdź /permissions)
☐ Pracuję na kopii / branchu, nie na głównej wersji
☐ Mam backup ważnych plików (git commit lub po prostu Copy folder)
☐ Sandbox mode jest włączony (sprawdź /settings lub włącz przez /sandbox)
☐ Pliki z hasłami są w bezpiecznym miejscu (np. password manager, nie w projekcie)
```

## Dobre praktyki (do zapamiętania)

### ✅ DOBRE praktyki:

```bash
# 1. Ogranicz zakres / zasięg / scope (a wybierz co tam wolisz 🤣) operacji
> Usuń pliki *.log w /tmp/myproject/  # Precyzyjne
# Zamiast: > Wyczyść dysk  # Za ogólne!

# 2. Używaj systemu kontroli wersji (Git) jako safety net
git commit -am "Before Claude refactoring"
> Zrefaktoruj kod
# Jeśli coś pójdzie nie tak możesz to łatwo cofnąć

# 3. Testowe (bezpieczne) uruchomienia (dry-run)
> Pokaż mi co byś zrobił, ale nie wykonuj
> Ok, teraz wykonaj to
```

### ❌ ZŁE praktyki (unikaj!):

```bash
# 1. Blind trust
> a (always) dla wszystkiego  # NIGDY! (nigdy nie mów nigdy ;) nadajedzie taki moment, kiedy to zrobisz :) )

# 2. Sekretne dane w promptach
> Połącz się z DB: password=SuperSecret123  # Wyciek do historii!
# Lepiej: użyj zmiennych środowiskowych lub password managera

# 3. Wykonywanie nieznanego kodu
> Pobierz i uruchom skrypt z https://random-site.com/install.sh
# Claude może to zrobić - ale NIE POZWALAJ!

# 4. Zbyt szeroki zakres
> Usuń wszystkie pliki tymczasowe  # Może usunąć za dużo!
# Lepiej: > Usuń pliki w folderze tmp/

# 5. Brak weryfikacji przy ważnych operacjach
> Zaktualizuj produkcyjną bazę danych  # ZATRZYMAJ SIĘ!
# Zawsze sprawdź środowisko, zrób backup, testuj na dev/staging!
```

## Zaawansowane: Hooks dla automatyzacji bezpieczeństwa

Claude Code oferuje system [Hooks](https://code.claude.com/docs/en/hooks), który pozwala między innymi na na automatyczną walidację operacji. 

Można dzięki temu np. fizycznie zabronić wykonywania pewnych komend czy wchodzenia do określonych katalogów. To taki system zabezpieczeń funkcjonujący na samej górze, taka ostatnia deska ratunku, w sytuacjach awaryjnych.

Hooki to na tyle rozbudowane zagadnienie, że na ich temat będzie cały osobny moduł.

## Na koniec praktyczny temat dla zaawansowanych

Tak, można używać sandboxa w Claude Code. Osobiście tego nie robię. Zamiast tego uruchamiam CC we własnym Sandboxie.

Jak? 

Używam do tego tego samego mechanizmu co Anthropic (czyli na Macu jest to [Sandbox Exec](https://igorstechnoclub.com/sandbox-exec/)). Ponieważ on sam nie ogranicza sieci, dodaje do tego własne proxy, które przepuszcza wyłącznie ruch na zdefiniowane wcześniej adresy. 

Dzięki temu mogę mieć pełną kontrolę nad tym, do czego Claude Code ma, a do czego nie ma dostępu.

W aliasie `cld` uruchamiam claude obwarowany moim skryptem, a jeśli używam claude jako cli w skryptach, wtedy również ich wywołanie obudowuję własnym sandboxem. 

Oczywiście jeśli ktoś mocno chce, może uruchamiać CC w Dockerze, osobiście nie lubię, ponieważ wymaga to zbyt wielu przygotowań i jest bardzo utrudnione przy większych projektach.

Warto też testowanie bardziej rozbudowanych aplikacji wykonywać poza swoim komputerem. 

Osobiście do tego celu używamy fly.io lub vpsy na hetznerze, w zależności od projektu.


## Co zapamiętać

Bezpieczeństwo w Claude Code wymaga zdrowego rozsądku. Pamiętaj:

**Podstawy (dla wszystkich):**
1. **System uprawnień** wymaga zgody na każdą zmianę - wykorzystaj to!
2. **'a' (always)** - Edit/Write (do końca sesji), Bash (trwale dla konkretnej komendy)
3. **NIGDY** nie dawaj dostępu do wrażliwych miejsc: ~/.ssh/, ~/.aws/, hasła, klucze
4. Sprawdzaj **co zostanie zmienione** przed zatwierdzeniem
5. **Rób backupy** - czy to przez Git, czy przez zwykłe Copy folder

**Sandbox (dla wszystkich, szczególnie ważny):**
6. **Włącz Sandbox Mode** (`/sandbox`) - to Twoja najlepsza ochrona
7. Sandbox izoluje Claude od reszty systemu - może pracować tylko w Twoim projekcie
8. **Auto-allow mode** zmniejsza "click fatigue" zachowując bezpieczeństwo

**Zaawansowane (dla power users):**
9. Rozważ **Hooks** do automatyzacji walidacji
10. Poznaj **Managed Settings** jeśli zarządzasz zespołem

---

## Komiks 006

![Komiks](https://images.danielroziecki.com//.netlify/images?url=/006.permissions.png)



---

## Pytania kontrolne

*(Odpowiedzi znajdziesz na końcu maila)*

**1. Co robi Sandbox Mode w Claude Code?**

- A) Przyspiesza działanie narzędzia
- B) Izoluje dostęp do katalogu projektu i sieci
- C) Automatycznie tworzy backupy
- D) Kompresuje pliki

**2. Który z tych plików NIGDY nie powinien być dostępny dla Claude Code?**

- A) src/index.js
- B) ~/.ssh/id_rsa
- C) package.json
- D) README.md

**3. Jak długo trwa 'a' (always allow) dla Edit/Write?**

- A) Na zawsze (permanentnie)
- B) Do końca sesji
- C) 24 godziny
- D) Do restartu komputera

**4. Który tryb uprawnień pozwala tylko czytać i planować implementację, ale NIE modyfikować?**

- A) default
- B) acceptEdits
- C) plan
- D) bypassPermissions

## Zadania praktyczne

### Zadanie 1: Włącz i przetestuj Sandbox

```bash
# W swoim projekcie wykonaj:
> /sandbox

# Wybierz "Auto-allow mode"
# Teraz poproś Claude o operację wymagającą sieci:
> Sprawdź czy mam dostęp do internetu (curl google.com)

# Obserwuj co się stanie - Claude poprosi o zgodę na dostęp do google.com
```

### Zadanie 2: Sprawdź swoje uprawnienia

```bash
> /permissions

# Sprawdź:
# 1. Czy masz jakieś 'always allow' dla niebezpiecznych operacji?
# 2. Jaki masz aktualny tryb uprawnień (default/acceptEdits/plan)?
# 3. Czy Sandbox jest włączony?
```

### Zadanie 3: Ćwicz świadome akceptowanie uprawnień

```bash
# Poproś Claude Code o edycję jakiegoś pliku
> Dodaj komentarz na początku pliku @README.md wyjaśniający co to za projekt

# Gdy pojawi się dialog z pytaniem o zgodę:
# 1. Przeczytaj uważnie jaką operację Claude chce wykonać
# 2. Zastanów się czy to bezpieczne
# 3. Jeśli niepewny - wybierz 'n' (no) i sprawdź plik ręcznie po wykonaniu
# 4. Zdecyduj: y (tak), n (nie), lub a (always - do końca sesji)
```

### Zadanie 4: Zabezpiecz swój .gitignore (dla programistów i technical writers)

```bash
# Sprawdź czy masz .gitignore
> Pokaż zawartość @.gitignore

# Upewnij się że zawiera (dostosuj do swoich potrzeb):
.env
.env.local
.env.*.local
*.key
*.pem
secrets/
credentials/
*credentials*
*password*

# Jeśli nie ma, dodaj te wzorce
> Dodaj te wzorce do @.gitignore
```

### Zadanie 5: Symulacja zagrożenia (bezpieczne!)

```bash
# Stwórz testowy plik z "hasłem"
> Utwórz plik test-secret.txt z tekstem "password=secret123"

# Teraz poproś Claude:
> Commituj wszystkie zmiany

# Obserwuj: Czy Claude spróbuje dodać test-secret.txt?
# Jeśli tak - to znak, że musisz dodać go do .gitignore!

# Sprzątanie:
> Usuń plik test-secret.txt
```

## Przydatne linki

### Dokumentacja oficjalna
- [Security Overview](https://code.claude.com/docs/en/security) - Kompleksowy przegląd bezpieczeństwa
- [Sandboxing Guide](https://code.claude.com/docs/en/sandboxing) - Szczegóły sandbox mode
- [IAM (Permissions)](https://code.claude.com/docs/en/iam) - System uprawnień
- [Hooks Guide](https://code.claude.com/docs/en/hooks-guide) - Automatyzacja przez hooks

### Dla zaawansowanych
- [Sandbox Runtime (GitHub)](https://github.com/anthropic-experimental/sandbox-runtime) - Open source sandbox
- [Anthropic Trust Center](https://trust.anthropic.com) - Certyfikaty bezpieczeństwa (SOC 2, ISO 27001)
- [HackerOne VDP](https://hackerone.com/anthropic-vdp) - Zgłaszanie luk bezpieczeństwa

### Bezpieczeństwo ogólnie
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Podstawy bezpieczeństwa aplikacji
- [Domain Fronting (Wikipedia)](https://en.wikipedia.org/wiki/Domain_fronting) - Technika obejścia filtrów

### Community resources
- [Claude Code on Incus](https://github.com/mensfeld/claude-on-incus) - Bezpieczne uruchamianie Claude Code w kontenerach
- [Blog: Claude on Incus](https://mensfeld.pl/2026/01/claude-on-incus-all-the-autonomy-securely/) - War story o bezpieczeństwie

---

**Następna lekcja:** Serce Claude Code, czyli Claude.md

**Pytania?** Odpowiedz na tego maila!

**Stay safe! 🔒**

---

## Odpowiedzi

### Sprawdź swoją wiedzę (Lekcja 5)

1. **Jak dodać plik do kontekstu w Claude Code?**
   - **A) Użyj składni `@` przed ścieżką pliku** ✅

2. **Która składnia referencji pozwala przeszukiwać pliki według wzorca?**
   - **D) Wszystkie powyższe** ✅ - Wszystkie trzy składnie (@**/*.js, @*.js, @src/) są poprawne i pozwalają na różne sposoby wyszukiwania plików.

### Pytania kontrolne (Lekcja 6)

1. **Co robi Sandbox Mode w Claude Code?**
   - **B) Izoluje dostęp do katalogu projektu i sieci** ✅

2. **Który z tych plików NIGDY nie powinien być dostępny dla Claude Code?**
   - **B) ~/.ssh/id_rsa** ✅ - Klucze SSH to wrażliwe dane, które dają dostęp do serwerów.

3. **Jak długo trwa 'a' (always allow) dla Edit/Write?**
   - **B) Do końca sesji** ✅ - Dla Edit/Write uprawnienie "always" trwa tylko do końca sesji.

4. **Który tryb uprawnień pozwala tylko czytać i planować implementację, ale NIE modyfikować?**
   - **C) plan** ✅ - Plan mode pozwala Claude badać kod i budować plan implementacji, ale blokuje wszelkie modyfikacje.

---

## Słowniczek

### Podstawowe terminy (dla wszystkich)

**API (Application Programming Interface)**

Interfejs, który pozwala różnym programom rozmawiać ze sobą. W przypadku Claude Code - sposób, w jaki Twoje narzędzie łączy się z serwerami Anthropic.

**API keys (klucze API)**

Sekretne hasła, które pozwalają Twoim programom łączyć się z zewnętrznymi usługami (np. płatności, wysyłka emaili, mapy Google).

**Backup**

Kopia zapasowa Twoich plików. Jak "save point" w grze - możesz wrócić do tego stanu, jeśli coś pójdzie nie tak.

**CLI (Command Line Interface)**

Interfejs tekstowy - program, który obsługujesz przez wpisywanie komend zamiast klikania przycisków. Claude Code to CLI tool.

**.env**

Plik zawierający sekrety i konfigurację (hasła, klucze API). Powinien być zawsze w .gitignore! Nazwa pochodzi od "environment" (środowisko).

**Prompt Injection**

Technika ataku, gdzie złośliwy użytkownik próbuje oszukać AI przez sprytnie sformułowaną wiadomość. Sandbox chroni przed tym.

**Sandbox (piaskownica)**

Izolowane, bezpieczne środowisko, które ogranicza dostęp programu do systemu. Jak plac zabaw z ogrodzeniem - można się bawić, ale nie wyjść poza granice.

**Secrets (sekrety)**

Wrażliwe dane: hasła, klucze API, tokeny dostępu. Nigdy nie powinny trafić do publicznego kodu ani być widoczne dla innych osób.

### Terminy dla programistów i technical writers

**Bash**

Język poleceń w terminalu (wiersz poleceń). Pozwala wykonywać operacje na plikach i systemie przez tekstowe komendy.

**Branch (gałąź)**

Oddzielna wersja projektu w Git, gdzie możesz eksperymentować bez wpływu na główną wersję (main).

**Commit**

Zapisanie zmian w historii projektu (Git). Jak "save point" w grze - możesz wrócić do tego stanu później.

**Git**

System kontroli wersji - narzędzie, które śledzi historię zmian w plikach projektu. Jak "Track Changes" w Word, ale znacznie potężniejsze.

**.gitignore**

Plik tekstowy, który mówi Git, których plików NIE śledzić (np. hasła, pliki tymczasowe, cache).

**GitHub**

Strona internetowa do przechowywania projektów Git. Jak Dropbox/Google Drive, ale specjalnie dla programistów.

**IAM (Identity and Access Management)**

System zarządzania uprawnieniami - kto może co robić w systemie.

**Malware**

Złośliwe oprogramowanie - wirusy, trojany, programy szpiegujące, keyloggery.

**npm (Node Package Manager)**

Narzędzie do instalowania bibliotek JavaScript. Jak App Store dla programistów JavaScript.

**package.json**

Plik konfiguracyjny projektu JavaScript - lista bibliotek, ustawienia, metadane projektu.

**Push**

Wysłanie lokalnych zmian (commitów) na serwer (np. GitHub). Jak "Upload" w Dropbox.

**Repo/Repository (repozytorium)**

Folder z projektem śledzony przez Git. Zawiera cały kod i historię zmian.

**SSH (Secure Shell)**

Protokół szyfrowanej komunikacji z serwerami. Klucze SSH (w ~/.ssh/) to Twoje "cyfrowe klucze" do serwerów - strzeż ich jak oka w głowie!

**sudo**

Komenda "super user do" - wykonuje polecenie z uprawnieniami administratora. BARDZO niebezpieczne z AI! Nigdy nie używaj `sudo` z Claude Code.

### Zaawansowane terminy (dla DevOps i security-conscious users)

**Bubblewrap**

Open-source narzędzie do sandboxingu na Linuxie. Używane przez Claude Code do izolacji procesów.

**Domain Fronting**

Technika obejścia filtrów sieciowych przez ukrycie prawdziwej domeny docelowej za trusted CDN. Potencjalny bypass sandboxa.

**Hooks**

System eventów w Claude Code - pozwala na automatyczne wykonywanie własnych skryptów w reakcji na wydarzenia (np. przed commitem, po edycji pliku).

**Managed Settings**

Centralna konfiguracja dla organizacji (Claude Enterprise) - nie może być nadpisana przez użytkowników.

**MCP (Model Context Protocol)**

Protokół pozwalający Claude Code łączyć się z zewnętrznymi narzędziami i usługami (np. Puppeteer, bazy danych, custom tools).

**Permission Pattern Matching**

System dopasowywania wzorców w regułach uprawnień. Np. `Bash(npm *)` dopasuje wszystkie komendy npm.

**Privilege Escalation**

Technika ataku, gdzie atakujący uzyskuje wyższe uprawnienia niż powinien (np. z user → admin). Sandbox chroni przed tym.

**Unix Socket**

Specjalny plik pozwalający procesom komunikować się na tym samym systemie. Np. `/var/run/docker.sock` daje dostęp do Docker daemon.
