# Lekcja 4: Opanuj terminal - REPL i skróty klawiszowe

## Przypomnienie z lekcji 3

W poprzedniej lekcji poznałeś dwa sposoby uwierzytelniania w Claude Code - konto Pro/Max (przez `/login`) i API key poprzez Claude Console. Dowiedziałeś się, że subskrypcja Pro/Max oferuje stały miesięczny koszt, ale API daje większą kontrolę i przejrzystość kosztów. Nauczyłeś się również monitorować wydatki za pomocą komendy `/cost` (dostępnej tylko dla użytkowników API). Średnie koszty dla użytkowników API to około $100-200 na dewelopera miesięcznie przy intensywnym użyciu aliasu `sonnet` (aktualnie wskazującego na Sonnet 4.5), choć mogą się znacznie różnić w zależności od liczby uruchomionych instancji i wykorzystania w automatyzacji.

Pamiętaj też o zasadach bezpieczeństwa - nigdy nie commituj klucza API do repozytorium i regularnie rotuj klucze co 90 dni.

## 🤔 Sprawdź się - 2 pytania z poprzedniej lekcji

1. **Które konto ma wyższe limity requestów - Pro czy API?**
   - Podpowiedź: Zastanów się, które rozwiązanie jest dedykowane dla zespołów i większych projektów

2. **Jak często warto sprawdzać koszty podczas intensywnej sesji kodowania?**
   - Podpowiedź: Pomyśl o komendzie `/cost` i kiedy najlepiej ją uruchamiać

*(Odpowiedzi na końcu maila)*

---

## TLDR (Too Long, Didn't Read)

Interfejs REPL w Claude Code to coś więcej niż zwykły terminal. Z mojego doświadczenia, opanowanie kluczowych skrótów klawiszowych może przyspieszyć Twoją pracę o 30-50% - dosłownie:

- **\\ + Enter** - nowa linia bez wysyłania (działa natychmiast wszędzie!)
- **Esc** - zatrzymuje aktualną operację/generowanie
- **Esc Esc** (2x) - pozwala cofnąć kod/konwersację do wybranego miejsca
- **Ctrl+R** - przeszukuje historię promptów jak w bashu
- **Shift+Enter** - nowa linia bez wysyłania (po `/terminal-setup`)

Dobra konfiguracja terminala + opanowanie skrótów = profesjonalny workflow. To różnica między walką z narzędziem a swobodną pracą.

---

## Mem z Twittera

**"Programista próbujący wyjść z Vima"** to jeden z najbardziej kultowych memów developerskich. Ale prawda jest taka, że opanowanie skrótów klawiszowych - czy to w Vimie, czy w Claude Code - to różnica między amatorem a profesjonalistą.

https://thenewstack.io/how-do-you-exit-vim-a-newbie-question-turned-tech-meme/

Jak mówił ktoś na Twitterze: *"Vim transforms typing into a martial art"* (Vim zamienia pisanie w sztukę walki). To samo dotyczy Claude Code - kilka dni z prawidłowymi skrótami i nigdy nie wrócisz do klikania.

*Więcej o developer productivity memes: [Programming Memes Defining Developer Culture](https://vocal.media/geeks/programming-memes-defining-developer-culture-2026)*

---

## Treść lekcji: REPL i jakość życia w terminalu

### Czym jest REPL i dlaczego to ważne?

REPL to skrót od **Read-Eval-Print Loop** - interfejs, w którym wpisujesz polecenie, system je wykonuje i pokazuje wynik. W Claude Code to Twoje główne miejsce pracy. Im lepiej go opanujesz, tym szybciej pracujesz.

Myśl o tym jak o sterówce samolotu. Pilot musi znać każdy przycisk i każdy skrót, żeby reagować natychmiast. Tak samo Ty - opanowanie podstawowych skrótów to różnica między walką z narzędziem a swobodną pracą.

### Kluczowe skróty klawiszowe - Twoja przewaga

Z mojego doświadczenia, te 5 skrótów **oszczędziły mi dziesiątki godzin frustracji**. Pierwszego miesiąca pracy z Claude Code często się denerwowałem - Claude szedł w złym kierunku, nie mogłem przerwać generowania, musiałem scrollować przez historię. Potem odkryłem te skróty i wszystko się zmieniło:

#### Top 5 skrótów, które musisz znać

**1. `\` + `Enter` - Wieloliniowe prompty (UNIWERSALNY)**

To mój absolutny faworyt. **Działa wszędzie, zawsze, bez konfiguracji.** Kiedy piszę skomplikowaną instrukcję dla Claude - analizę kodu, listę wymagań, szczegółowy prompt - wpisywanie tego w jednej linii to horror. Backslash + Enter rozwiązuje ten problem:

```bash
> Przeanalizuj ten kod pod kątem:\
<Enter>
> - bezpieczeństwa\
<Enter>
> - wydajności\
<Enter>
> - czytelności
<Enter>
```

Choć trzeba przyznać że shift+enter zaczął w CC działać ostatniop bez problemów.

**2. `Esc` - Zatrzymaj generowanie (RATOWNIK)**

Claude poszedł w złą stronę? Zaczął refaktorować cały projekt, a Ty chciałeś tylko jeden plik? Zamiast czekać 2 minuty aż skończy - **Esc i zaczynasz od nowa**. To jak przycisk "Stop" w windzie - natychmiastowy.

**3. `Esc Esc` (2x) - Cofnij zmiany (PRZYWRÓĆ)**

To jest **absolutny game-changer**. Claude wprowadził niepożądane zmiany w kodzie? Napisał coś, co Ci się nie podoba? Podwójny Esc przywraca kod i konwersację do poprzedniego punktu. Ile razy to mnie uratowało...

I teraz uwaga. Bo to może być mylące. Zobaczysz coś podobnego:

```
The conversation will be forked.
 The code will be restored +21 -42 in 04-opanuj-terminal-v2.md.

 ❯ 1. Restore code and conversation
   2. Restore conversation
   3. Restore code
   4. Never mind
```

Co to znaczy.

1. Cofasz wszystko, zarówno zmiany w kodzie jak i rozmowę z modelem. Tutaj raczej nie muszę nic tłumaczyć.

Tylko uważaj. Jeśli agent będzie w miedzyczasie wykonywał jakieś operacje na kodzie przy pomocy klasycznych narzędzi bashowych, to takie zmiany NIE zostaną przywrócone.

2. Cofasz tylko konwersację, ale nie kod.

Kiedy się to przydaje? W trakcie konwersacji orientujesz się, że jest błąd. Nie chcesz przerywać, bo nie skończyłeś. W takim razie prosisz model o naprawienie błędu. Gdy jest to zrobione, wtedy używasz tego punktu. Kasujesz z kontekstu zbędną treść dotyczącą naprawy, a naprawiony kod zostaje.

3. Cofasz tylko kod.

To opcja przydatna, np. gdy testujesz różne rozwiązania i nie chcesz tracić histori rozmowy.


**4. `Ctrl+R` - Szukaj w historii (PRZYPOMNIJ)**

Tydzień temu pisałeś podobny prompt? Zamiast przepisywać wszystko od nowa - **Ctrl+R + słowo kluczowe** i masz go z powrotem. To jak Ctrl+F dla Twojej historii promptów. Ja używam tego kilkanaście razy dziennie.

**5. `Shift+Tab` - Przełącz tryby uprawnień (KONTROLA)**

Przełączasz między trybami uprawnień (Normal/Plan/Auto-Accept) bez wychodzenia z promptu. Szybko i wygodnie.

#### Pełna tabela skrótów

Znajdziesz ją oczywiście w dokumentacji Claude Code.

https://code.claude.com/docs/en/interactive-mode

Warto się z nią zapoznać.

Często na ekranie w takcie pracy, CC wyświetla kombinację którą możesz użyć, zeby np. zobaczyć procesy uruchomione w tle (ctrl+B) albo rozwinąć ddoatkowe informacje (ctrl+o).

### Praktyczne scenariusze użycia

Teoria to jedno, ale pokażę Ci jak ja używam tych skrótów w prawdziwym życiu - zarówno jako programista, jak i w innych rolach.

#### Scenariusz 1: Przerwanie złego kierunku (każdy)

```bash
> Zrefaktoruj cały projekt używając pattern X
[Claude zaczyna zmieniać wszystko...]
<Esc>  # STOP! Za dużo zmian naraz

> Zacznij od zrefaktorowania tylko @src/utils/
```

**Przykład dla marketera:** Poprosiłeś Claude o przygotowanie maila marketingowego do 500 klientów, ale zauważyłeś błąd w szablonie. Zamiast czekać aż skończy - Esc i popraw błąd.

**Przykład dla Project Managera:** Prosisz Claude o przygotowanie raportu ze sprintu, ale nagle przypominasz sobie, że zapomniałeś dodać metryki z Jiry. Esc - dodajesz instrukcję o metrykach.

#### Scenariusz 2: Cofnięcie niepożądanych zmian (programista)

```bash
> Zrefaktoruj wszystkie pliki w projekcie
[Claude wprowadza zmiany, które Ci się nie podobają...]
<Esc><Esc>  # Cofnij zmiany i konwersację do poprzedniego punktu
> Zrefaktoruj tylko @src/auth.ts  # Precyzyjniejsze polecenie
```

#### Scenariusz 3: Wyszukiwanie w historii (każdy)

Trzy dni temu przygotowywałeś analizę sprzedaży za Q3. Teraz potrzebujesz podobnej za Q4. Zamiast pisać od nowa - Ctrl+R + wpisz "analiza sprzedaży" i gotowe.

### Konfiguracja terminala - zrób to raz, korzystaj zawsze

Okej, czas na małą konfigurację. To jednorazowa inwestycja 10-15 minut, która **zwraca się setkami zaoszczędzonych godzin**.

#### 1. Wieloliniowe prompty - moja rekomendacja

Już pokazałem Ci `\` + Enter - i szczerze? **To wystarczy dla 90% przypadków**. Działa wszędzie, zawsze, bez konfiguracji.

Ale... JEST WKURZAJACE!!!

Jeśli chcesz czegoś bardziej "naturalnego" - jak Shift+Enter w ChatGPT - możesz to skonfigurować:

**Automatyczna konfiguracja (polecam!):**

```bash
# W Claude Code uruchom:
/terminal-setup

# Claude automatycznie skonfiguruje Shift+Enter dla:
# - VS Code integrated terminal
# - Alacritty
# - Zed
# - Warp
```

Ta komenda jest **sprytna** - sama wykrywa, jakiego terminala używasz i konfiguruje go odpowiednio. Ja to zrobiłem raz 6 miesięcy temu i od tamtej pory nie muszę myśleć o backslashu.

**Alternatywne metody:**
- **Option+Enter** (macOS) - domyślnie działa po konfiguracji Option jako Meta w ustawieniach terminala
- **Ctrl+J** (wszędzie) - line feed character, działa uniwersalnie

**Szczegóły techniczne:** [Terminal Configuration Guide](https://code.claude.com/docs/terminal-config)

#### 2. Personalizacja statusu (dla power users)

Pracując na 3-4 projektach jednocześnie, często **traciłem orientację** - "zaraz, który model teraz używam?", "ile to już kosztuje?", "na którym branchu jestem?".

Statusline rozwiązał ten problem. To customizowalna linia na dole terminala pokazująca w czasie rzeczywistym:
- **Obecny model** (żeby wiedzieć, czy to Opus czy Sonnet)
- **Obecny branch git** (wiesz, gdzie jesteś)
- **Katalog roboczy** (nie gubisz się w projektach)

**Jak to ustawić (super proste!):**

```bash
# W Claude Code:
/statusline

# Claude pomoże Ci skonfigurować statusline.
# Możesz też podać mu instrukcje:
/statusline pokaż nazwę modelu na pomarańczowo i aktualny katalog
```

Nie proś, żeby pokazywał Ci koszty, czy informacje o kontekście, bo przynajmniej na razie jeszcze nie może tego robić.

Claude **sam Ci to skonfiguruje** - zapyta o preferencje, pokaże preview i zapisze konfigurację. Ja mam ustawione: model, branch git, katalog. Teraz zawsze wiem co się dzieje.

**Dla zaawansowanych:** Jeśli chcesz napisać własny skrypt statusline'a (bash, python, node.js), szczegóły znajdziesz w [dokumentacji statusline](https://code.claude.com/docs/statusline).

Możesz też skożystać z ładnych gotowców: https://github.com/sirmalloc/ccstatusline


#### Template prompts - twoje gotowe szablony

Tutaj będziesz używać tzw. **slash-commands**. Dzisiaj tylko je zasygnalizuję, więcej opowiem Ci o nich w jednej z kolejnych lekcji.

Jeśli robisz coś **więcej niż 3 razy** - poproś Claude Code, żeby stworzył Ci komendę slash. Sam mam np. takie komendy:

- `/zrreview` - code review dla studentów w Za Rączkę
- `/test-gen` - generowanie testów jednostkowych
- `/c.commit` - rozbudowany proces, który analizuje zmiany, aktualizuje readme.md i changelog.md, zwiększa wersję jeśli jest taka potrzeba i robi commit
- `/komiks` - wsparcie do budowania scenariuszy komiksów jakie są w tym kursie :)

**Jak to zrobić?**

Zamiast ręcznie pisać pliki, po prostu **poproś Claude Code**:

```
> Stwórz mi custom command /myreview w ~/.claude/commands/
> który zrobi code review kodu pod kątem bezpieczeństwa,
> wydajności i czytelności
```

Claude Code sam:
1. Stworzy katalog jeśli nie istnieje
2. Napisze plik z odpowiednią strukturą
3. Doda wszystkie potrzebne elementy

**Użycie:** `/myreview @src/auth.ts`
(Komenda będzie w widoczna dopiero po restarcie)

**Więcej o slash-commands:** Szczegółowo omówię je w kolejnej lekcji - poznasz dokładną składnię, argumenty, wzorce i zaawansowane możliwości.


### Zaawansowane scenariusze

Dla tych, którzy chcą **wycisnąć maksimum** z Claude Code.

#### Praca przez SSH (dla devops/admins)

Claude Code działa świetnie przez SSH - ja regularnie łączę się z serwerem produkcyjnym:

```bash
# Forwarding autoryzacji (jeśli używasz API key)
ssh -A user@server
export ANTHROPIC_API_KEY="sk-ant-..."
claude

# Dla /login przez SSH (wymaga port forwarding):
ssh -L 8080:localhost:8080 user@server
# Przeglądarka otworzy się lokalnie
```

#### Tmux integration (game changer!)

Połączenie Claude Code z tmux to **absolutny game changer**. Dlaczego? Bo możesz:
- Odłączyć sesję (zamknąć laptop) - Claude dalej pracuje
- Wrócić później dokładnie tam, gdzie skończyłeś
- Mieć kilka sesji Claude jednocześnie

```bash
# Stwórz dedykowaną sesję Claude
tmux new -s claude
claude

# Detach: Ctrl+B D
# Reattach (nawet z innego komputera!): tmux attach -t claude

# Pro-tip: Podziel ekran (kod + Claude)
tmux split-window -h "vim"
# Lewe okno: kod w Vim
# Prawe okno: Claude Code
```

**Przykład dla analityka danych:** Pracujesz nad długoterminowym projektem - analiza 1000 faktur. Tmux pozwala odłączyć sesję, wyjść na lunch, a potem wrócić dokładnie tam, gdzie skończyłeś.

#### Claude Code przez WEB / telefon

Używając Claude przez WEB albo na telefonie też masz dostęp do Claude Code, choć na nieco innych warunkach, o których może innym razem, ponieważ niewiele mają wspólnego z terminalem o którym dzisiaj rozmawiamy.

---

## Podsumowanie lekcji

Interfejs REPL w Claude Code to Twoje główne narzędzie pracy. Z mojego doświadczenia, **opanowanie podstawowych skrótów to realna oszczędność czasu** - nie fanaberia.

**Top 5 must-have skrótów:**

1. **`\` + Enter** - wieloliniowe prompty (działa wszędzie!)
2. **Esc** - ratuje Cię, gdy Claude idzie w złym kierunku
3. **Esc Esc** - cofa kod i konwersację do poprzedniego punktu
4. **Ctrl+R** - przeszukuje historię błyskawicznie
5. **Shift+Tab** - przełącza tryby uprawnień

**Jednorazowa konfiguracja (10-15 minut):**
- Uruchom `/terminal-setup` dla Shift+Enter
- Skonfiguruj `/statusline` dla lepszej orientacji
- Zapoznaj się z dostępnymi skrótami klawiszowymi (naciśnij `?` w Claude Code)

**Pamiętaj:** Te same zasady działają wszędzie - czy pracujesz nad kodem, analizujesz dane dla firmy, przygotowujesz materiały marketingowe, czy screeningujesz CV. Opanowanie narzędzi = większa produktywność.

Dobra konfiguracja terminala to jednorazowa inwestycja, która **zwraca się setkami zaoszczędzonych godzin**. Nie odkładaj tego na później - zrób to teraz!


## 2 zadania praktyczne

### Zadanie 1: Test wieloliniowych promptów (10 minut)

**Cel:** Opanować wpisywanie skomplikowanych instrukcji

1. Uruchom Claude Code
2. Przetestuj **`\` + Enter**: Napisz prompt w 3 liniach używając backslash
   ```
   Przeanalizuj plik @README.md pod kątem:\
   <Enter>
   - Czy jest kompletny?\
   <Enter>
   - Czy jest przystępny dla początkujących?
   ```
3. Jeśli używasz macOS, przetestuj **Option+Enter** (może wymagać konfiguracji)
4. Uruchom `/terminal-setup` i przetestuj **Shift+Enter**
5. Przetestuj **Ctrl+J** jako alternatywę

**Sukces:** Potrafisz wpisać wieloliniowy prompt bez wysyłania za każdym razem.

### Zadanie 2: Trening skrótów (20 minut)

**Cel:** Wykształcić muscle memory dla kluczowych skrótów

1. Uruchom Claude Code
2. Wpisz dowolny prompt i wyślij
3. **Gdy Claude zacznie odpowiadać** - naciśnij **Esc** (przerwij generowanie)
4. Poproś Claude o jakąś zmianę w kodzie, **a następnie** naciśnij **Esc Esc** - kod powinien wrócić do poprzedniego stanu
5. Wpisz kilka różnych promptów (np. związanych z "test", "docker", "refactor", "analiza")
6. Naciśnij **Ctrl+R** i wyszukaj słowo kluczowe z poprzednich promptów
7. Naciśnij **Shift+Tab** lub **Alt+M** - przełącz tryby uprawnień i obserwuj zmianę w interfejsie

**Sukces:** Używasz tych skrótów intuicyjnie, bez myślenia.

---

## Linki do dodatkowych zasobów

### Oficjalna dokumentacja
- [Interactive Mode Reference](https://code.claude.com/docs/interactive-mode) - Kompletna dokumentacja skrótów klawiszowych
- [Terminal Configuration Guide](https://code.claude.com/docs/terminal-config) - Wszystkie opcje konfiguracyjne terminala
- [Statusline Documentation](https://code.claude.com/docs/statusline) - Customizacja statusline

### Praktyczne poradniki
- [How I Use Claude Code - Builder.io](https://www.builder.io/blog/claude-code) - Keyboard shortcuts i living entirely in Claude Code
- [10 Claude Code Productivity Tips](https://www.f22labs.com/blogs/10-claude-code-productivity-tips-for-every-developer/) - Tips na produktywność
- [32 Claude Code Tips: From Basics to Advanced](https://agenticcoding.substack.com/p/32-claude-code-tips-from-basics-to) - 32 wskazówki od podstaw do zaawansowanych

### GitHub repositories z tipami
- [40+ tips for getting the most out of Claude Code](https://github.com/ykdojo/claude-code-tips) - Custom status line, optimized prompts
- [Full guide on claude tips and tricks](https://github.com/zebbern/claude-code-guide) - Comprehensive optimization guide

### Video tutorials
- [How to Set Up Claude Code for Faster Coding](https://www.classcentral.com/course/youtube-how-i-set-up-claude-code-for-faster-and-better-ai-code-468813) - 27-minutowy tutorial setup
- [Claude Code Masterclass from CS Dojo](https://www.classcentral.com/course/youtube-claude-code-masterclass-503745) - 20-minutowy comprehensive masterclass

---

## Na miłe zakończenie :)
## 004

TUTAJ WKLEJ OBRAZEK z adresu https://images.danielroziecki.com//.netlify/images?url=/004.escesc.png


## Słowniczek

Dla osób nietechnicznych - wyjaśnienie wszystkich skrótów i terminów użytych w lekcji:

**Alias**
Skrót do dłuższej komendy. Zamiast pisać `cd ~/Projects/my-app && claude`, tworzysz alias `ccd` który robi to samo. Oszczędza czas.

**Bash**
Jeden z najpopularniejszych programów shell (zobacz: Shell). To język, w którym piszesz komendy w terminalu. Używany głównie na Linux i macOS.

**Branch (git)**
Gałąź w systemie kontroli wersji Git. Pozwala pracować nad zmianami w kodzie bez wpływu na główną wersję. Jak "alternatywna rzeczywistość" dla Twojego kodu.

**Prompt**
Instrukcja lub pytanie, które wysyłasz do Claude. Przykład: "Przeanalizuj ten kod pod kątem bezpieczeństwa". Im lepszy prompt, tym lepsza odpowiedź.

**REPL (Read-Eval-Print Loop)**
Interfejs, w którym wpisujesz polecenie, program je wykonuje i pokazuje wynik. Potem możesz wpisać kolejne polecenie. Claude Code działa jako REPL - czytasz, piszesz, widzisz wynik, powtarzasz.

**Session (Sesja)**
Pojedyncza rozmowa z Claude od momentu uruchomienia do zamknięcia. Twoja historia promptów i odpowiedzi. Jak jedna "rozmowa" - ma początek i koniec.

**Shell**
Program obsługujący terminal - przyjmuje komendy, wykonuje je i pokazuje wyniki. Popularne: bash, zsh, fish. To jak "tłumacz" między Tobą a komputerem.

**SSH (Secure Shell)**
Sposób na bezpieczne łączenie się z innym komputerem przez internet i wykonywanie tam komend, jakbyś siedział przy nim. Używane głównie przez programistów i adminów.

**Terminal**
Okno, w którym wpisujesz komendy tekstowe do komputera. Na Macu to "Terminal.app" lub "iTerm2". Na Windows: PowerShell, Command Prompt. Przed graficznymi interfejsami - to był JEDYNY sposób używania komputera.

**TLDR (Too Long, Didn't Read)**
"Zbyt długie, nie czytałem" - krótkie podsumowanie dla zabieganych. Daje Ci najważniejsze informacje bez czytania całości. Popularny skrót internetowy.

**Tmux**
Program pozwalający na pracę w wielu "oknach" terminala naraz, odłączanie sesji (możesz zamknąć laptop, a program dalej działa) i powrót do nich później. Jak menedżer okien dla terminala.

**Workflow**
Sposób pracy - Twoje zwyczaje, narzędzia i metody, które używasz do osiągnięcia celu. "Profesjonalny workflow" = efektywny, przemyślany sposób pracy. Przeciwieństwo chaotycznego działania.

---

**W następnej lekcji:** Prosta i lekka lekcja o tym, jak łątwo odwoływać się do plików z projektu.

**Pytania?** Odpowiedz na tego maila - chętnie pomogę!

---

## 📮 Odpowiedzi na pytania z początku

**Pytanie 1: Które konto ma wyższe limity requestów - Pro czy API?**

**Odpowiedź:** API poprzez Claude Console oferuje **wyższe limity** niż subskrypcja Pro/Max. Szczegółowe limity zależą od rozmiaru zespołu i konfiguracji workspace, ale API jest dedykowane dla profesjonalistów i większych projektów, gdzie potrzebne są wyższe przepustowości i większa kontrola nad kosztami.

**Pytanie 2: Jak często warto sprawdzać koszty podczas intensywnej sesji kodowania?**

**Odpowiedź:** **Po każdej dłuższej sesji** używaj `/cost` aby śledzić wydatki w czasie rzeczywistym. To pozwala kontrolować budżet i uniknąć niespodzianek na koniec miesiąca. Uwaga: komenda `/cost` jest dostępna **tylko dla użytkowników API**, nie dla subskrypcji Pro/Max (tam masz stały koszt miesięczny).


