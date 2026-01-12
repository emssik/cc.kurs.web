# Mail #2: Instalacja i pierwsze uruchomienie - zbuduj swoje środowisko

---


todo:

- zmiany w claude -> mozna praocwać z claude code, w tym na lokalnym katalogu


## 🔄 Przypomnienie z poprzedniej lekcji

W pierwszym mailu poznałeś Claude Code - autonomicznego agenta terminalowego, który zmienia sposób, w jaki pracujesz z komputerem. Dowiedziałeś się, że to nie jest kolejny chatbot ani asystent w IDE, tylko **prawdziwy terminal agent**, który może wykonywać komendy systemowe, edytować pliki i zarządzać całym projektem.

Kluczowa zmiana myślenia: **nie instruujesz Claude krok po kroku, tylko delegujesz zadania**. Zamiast mówić "uruchom npm install", mówisz "zainstaluj wszystkie zależności i napraw konflikty wersji jeśli wystąpią".

---

## 🤔 Sprawdź się - 2 pytania z poprzedniej lekcji

1. **Czym Claude Code różni się od narzędzi takich jak GitHub Copilot?**
   - Podpowiedź: Zastanów się, gdzie działają te narzędzia i co mogą robić z Twoim systemem

2. **Dlaczego mówimy, że Claude Code to "bardzo szybki stażysta z doskonałą pamięcią"?**
   - Podpowiedź: Pomyśl o tym, jak formułujesz polecenia i jaki poziom szczegółowości jest potrzebny

*(Odpowiedzi na końcu maila)*

---

## 📝 TLDR - Czego się dzisiaj nauczysz

Dzisiaj przejdziesz przez instalację Claude Code na Twoim systemie - niezależnie czy masz Maca, Linuxa czy Windowsa. Poznasz **trzy metody instalacji** i dowiesz się, którą wybrać. Nauczysz się także rozwiązywać najczęstste problemy instalacyjne (bo one zawsze się pojawiają!) oraz skonfigurujesz **aliasy**, które przyśpieszą Twoją pracę. Po tej lekcji będziesz mieć w pełni działające środowisko gotowe do pracy.

---

## Memy dnia

**Gary Bernhardt o wiecznym "piekle zależności":**

> "Wielka teoria wszechświata piekła zależności: W latach 90. mieliśmy piekło zależności przez konflikty wersji kilku wspólnych DLL-ek. Teraz mamy piekło zależności przez tysiące modułów NPM. Ilość piekła jest stała, bo zwiększamy liczbę zależności w miarę jak zarządzanie staje się łatwiejsze."

🔗 [Zobacz tweet](https://x.com/garybernhardt/status/1291107647135989760?lang=en)

I jeszcze jedno złoto od ThePrimeagen o frustracji z instalacją:

> "NIE OBCHODZI MNIE TEN CHOLERNY KOD! chcę tylko ściągnąć tę głupią aplikację i jej użyć WHY IS THERE CODE??? ZRÓBCIE PLIK .EXE I DAJCIE MI GO."

🔗 [Zobacz tweet](https://x.com/ThePrimeagen/status/1760710371550106045?lang=en)

Dokładnie tak czasem czujesz się z instalacją... ale obiecuję, że z Claude Code będzie prościej! 😉

---

## 📦 Instalacja krok po kroku

### Która metoda instalacji dla Ciebie?

Zanim zaczniesz, musisz wybrać metodę instalacji. Oto najprostszy przewodnik:

- **Masz Maca z Homebrew?** → Użyj Homebrew (najłatwiejsze)
- **Linux lub Mac bez Homebrew?** → Użyj oficjalnego skryptu instalacyjnego
- **Windows?** → PowerShell
- **Chcesz ręcznie zarządzać wersjami?** → Użyj NPM (wymaga Node.js 18+)

**Wersja w 20 sekund (plusy/minusy):**
- **Instalator natywny (skrypt)** → najbardziej niezawodny i bez Node.js, ale mniej wygodny do żonglowania wersjami
- **Homebrew** → najłatwiejsze aktualizacje i odinstalowanie, ale wymaga Homebrew
- **NPM** → wygodne wersjonowanie, ale najwięcej problemów z uprawnieniami i PATH

**Przed instalacją: 3 szybkie checki**
1. Jeśli wybierasz NPM, sprawdź wersję Node: `node -v` (musi być 18+)
2. Na macOS/Linux sprawdź, czy nie masz starego `claude`: `which -a claude`
3. Zamknij stare sesje terminala, żeby nowy PATH wczytał się po instalacji

**UWAGA**

Sam na codzień używam Maca, nie mam jak przetestować pozostałych form instalacji. W razie problemów na pewno znajdziesz odpowiedzi w dokumentacji do Claude Code. https://code.claude.com/docs/en/quickstart

---

### 🍎 Instalacja na macOS

**Metoda 1: Homebrew (zalecana)**

To najprostsza metoda dla użytkowników Maca. Homebrew to menedżer pakietów - coś jak "sklep z aplikacjami" dla programistów.

```bash
# Jeśli masz Homebrew (najprawdopodobniej masz)
brew install --cask claude-code

# Sprawdź, czy działa
claude --version
which claude  # Powinno pokazać /opt/homebrew/bin/claude lub podobnie
```

**Metoda 2: Oficjalny skrypt**

Jeśli nie masz Homebrew lub wolisz "natywną" instalację:

```bash
# Instalacja stabilnej wersji (domyślnie)
curl -fsSL https://claude.ai/install.sh | bash

# Lub zainstaluj najnowszą wersję (jeszcze nie wydaną do stabilnego kanału)
curl -fsSL https://claude.ai/install.sh | bash -s latest

# Lub konkretną wersję
curl -fsSL https://claude.ai/install.sh | bash -s 1.0.58

# Sprawdź instalację
claude --version
```

**Metoda 3: NPM (dla zaawansowanych)**

Jeśli masz Node.js i chcesz zarządzać wersjami:

```bash
npm install -g @anthropic-ai/claude-code

# Sprawdź
claude --version
```

**UWAGA:** NIE używaj `sudo npm install -g` - może to prowadzić do problemów z uprawnieniami i ryzyka bezpieczeństwa.

---

### 🐧 Instalacja na Linux

**Uniwersalna metoda (działa na Ubuntu, Debian, Fedora, Arch):**

```bash
# Pobierz i uruchom oficjalny skrypt
curl -fsSL https://claude.ai/install.sh | bash
```

**Jeśli komenda `claude` nie działa po instalacji:**

Oznacza to, że musisz dodać Claude do zmiennej PATH (ścieżki systemowej):

```bash
# Dla bash (Ubuntu/Debian standardowo)
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Dla zsh (nowsze dystrybucje)
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Dla Fish shell
fish_add_path $HOME/.local/bin
```

**Uwaga o bilingowaniu:** Instalacja natywna wymaga bibliotek `libgcc`, `libstdc++`, i `ripgrep`. W niektórych środowiskach (np. Alpine Linux) może być konieczne ręczne zainstalowanie tych zależności.

**Szybki test:**

```bash
# Sprawdź czy działa (nie wymaga internetu)
claude --help
```

---

### 🪟 Instalacja na Windows

**Metoda 1: Oficjalny skrypt PowerShell (zalecana)**

```powershell
irm https://claude.ai/install.ps1 | iex
```

**Metoda 2: Windows CMD**

Jeśli używasz standardowego wiersza poleceń Windows:

```batch
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

**Metoda 3: NPM**

Jeśli masz zainstalowany Node.js:

```powershell
npm install -g @anthropic-ai/claude-code
```

**UWAGA:** Uruchamianie PowerShell jako Administrator nie jest wymagane i może prowadzić do problemów z uprawnieniami.

**Sprawdź instalację:**

```powershell
claude --version
```

**Windows Defender może blokować instalację!**

Jeśli instalacja się zawiesza, Windows Defender może blokować skrypt. Rozwiązania:
- Tymczasowo wyłącz "Ochronę w czasie rzeczywistym"
- ALBO dodaj wyjątek dla folderu `%APPDATA%\npm`

---

### ✅ Pierwsze uruchomienie (co zobaczysz)

Po instalacji uruchom:

```bash
claude
```

**Czego się spodziewać:**
- Otworzy się przeglądarka z logowaniem (lub zobaczysz link do skopiowania)
- Wybierzesz typ konta (Claude Console vs Claude Pro/Max) - to normalne
- Po zalogowaniu wrócisz do terminala i zobaczysz prompt Claude

W kolejnym mailu masz pełny przewodnik po logowaniu i konfiguracji, więc tu tylko „kontrola, że działa”.

---

### 🔧 Najczęstsze problemy i rozwiązania

Oto tabelka ratunkowa dla najczęstszych błędów:

| **Problem** | **Jak rozpoznać** | **Jak naprawić** |
|-------------|-------------------|------------------|
| **Brak uprawnień** | Widzisz `Permission denied` | Użyj Native Installation (instalator natywny, zobacz powyżej) - NIE używaj sudo! |
| **Za stara wersja Node.js** | `Error: Unsupported Node version` | Zaktualizuj: `nvm install --lts` lub `brew upgrade node` |
| **Komenda nie znaleziona** | `command not found: claude` | Dodaj `~/.local/bin` do PATH (patrz sekcja Linux wyżej) lub zrestartuj terminal |
| **Windows Defender blokuje** | Instalacja się zawiesza | Wyłącz tymczasowo Real-time Protection |
| **Błąd certyfikatu SSL** | `unable to verify the first certificate` | Zaktualizuj certyfikaty: `npm config set cafile /ścieżka/do/cert.pem` |
| **Zepsuty cache NPM** | Dziwne błędy przy `npm install` | Wyczyść: `npm cache clean --force` i spróbuj ponownie |

---

### ⚠️ Najczęstsze wpadki z życia (i jak je złapać szybko)

- **Masz dwie instalacje naraz**: `which -a claude` pokazuje kilka ścieżek; usuń starą i zostaw jedną metodę
- **Stary alias nadpisuje nową instalację**: sprawdź `alias | rg claude` i usuń nieaktualne skróty
- **PATH jest poprawny, ale terminal „nie widzi” zmian**: zamknij i otwórz terminal albo `source ~/.zshrc` / `source ~/.bashrc`

---

### 🚑 Zaawansowane troubleshooting

**Komenda `doctor` - Twój przyjaciel**

Claude Code ma wbudowane narzędzie diagnostyczne dostępne w dwóch wariantach:

```bash
# Z linii komend (przed uruchomieniem Claude Code)
claude doctor

# Lub wewnątrz sesji interaktywnej (po uruchomieniu claude)
/doctor
```

Ta komenda sprawdzi:
- Czy instalacja jest kompletna
- Czy połączenie z API działa
- Czy wszystkie uprawnienia są OK
- Czy konfigurację jest poprawna

**Pełny reset instalacji (jeśli nic nie działa):**

**Dla instalacji natywnej:**

```bash
# macOS/Linux - usuń plik wykonywalny i dane
rm -f ~/.local/bin/claude
rm -rf ~/.claude-code

# Opcjonalnie usuń też konfigurację (ustawienia, MCP, historia)
rm -rf ~/.claude
rm ~/.claude.json

# Teraz zainstaluj od nowa
curl -fsSL https://claude.ai/install.sh | bash
```

```powershell
# Windows PowerShell - usuń plik wykonywalny i dane
Remove-Item -Path "$env:LOCALAPPDATA\Programs\claude-code" -Recurse -Force
Remove-Item -Path "$env:LOCALAPPDATA\Microsoft\WindowsApps\claude.exe" -Force

# Opcjonalnie usuń też konfigurację
Remove-Item -Path "$env:USERPROFILE\.claude" -Recurse -Force
Remove-Item -Path "$env:USERPROFILE\.claude.json" -Force

# Teraz zainstaluj od nowa
irm https://claude.ai/install.ps1 | iex
```

**Dla instalacji przez NPM:**

```bash
# macOS/Linux
npm uninstall -g @anthropic-ai/claude-code
rm -rf ~/.claude
rm ~/.claude.json
# Teraz zainstaluj od nowa
npm install -g @anthropic-ai/claude-code
```

---

### ⚡ Pro-tipy: Aliasy i automatyzacja

Aliasy to skróty klawiszowe dla terminala. Zamiast pisać `claude` za każdym razem, możesz napisać tylko `c`. Oto kilka świetnych aliasów:

**Otwórz plik konfiguracyjny:**

```bash
# Dla bash
nano ~/.bashrc

# Dla zsh (Mac/nowsze Linuxy)
nano ~/.zshrc
```

**Dodaj te aliasy:**

```bash
# Podstawowe skróty
alias c='claude'
alias cdoc='claude doctor'  # Szybka diagnostyka

# Aliasy projektowe - przeskocz do projektu i uruchom Claude
alias cwork='cd ~/Projects/work && claude'
alias cpersonal='cd ~/Projects/personal && claude'

# Funkcja pomocnicza - uruchom Claude w konkretnym projekcie
cproj() {
    cd ~/Projects/"$1" && claude
}
# Użycie: cproj moja-apka
```

**Zapisz plik** (Ctrl+X, potem Y, potem Enter) i załaduj na nowo:

```bash
source ~/.bashrc   # dla bash
source ~/.zshrc    # dla zsh
```

**Teraz możesz użyć:**

```bash
c  # zamiast claude
cdoc  # zamiast claude doctor
cwork  # przeskakuje do ~/Projects/work i uruchamia Claude
cproj moja-apka  # przeskakuje do ~/Projects/moja-apka i uruchamia Claude
```

**Alternatywne miejsca przechowywania konfiguracji:**
- **Bash:** `~/.bashrc` lub `~/.bash_profile` (macOS często używa `.bash_profile`)
- **Zsh:** `~/.zshrc`
- **Fish:** `~/.config/fish/config.fish`

---

### 🏢 Edge case: Instalacja w firmie (za proxy/firewall)

Jeśli pracujesz w korporacji z restrykcyjnym firewallem:

**Skonfiguruj proxy:**

```bash
export HTTP_PROXY=http://proxy.firma.com:8080
export HTTPS_PROXY=http://proxy.firma.com:8080
npm install -g @anthropic-ai/claude-code
```

**Brak dostępu do sudo?**

Użyj instalatora natywnego (zalecane) lub zainstaluj NPM lokalnie:

```bash
# Opcja 1: Instalator natywny (zalecana)
curl -fsSL https://claude.ai/install.sh | bash

# Opcja 2: NPM lokalnie
npm config set prefix ~/.local
npm install -g @anthropic-ai/claude-code
export PATH="$HOME/.local/bin:$PATH"
```

**Instalacja offline (zupełnie bez internetu):**

```bash
# Na komputerze z internetem:
npm pack @anthropic-ai/claude-code

# Skopiuj plik .tgz na komputer bez internetu i zainstaluj:
npm install -g ./anthropic-ai-claude-code-*.tgz
```

---

## 📚 Podsumowanie lekcji

Gratulacje! Jeśli dotarłeś tutaj, powinieneś mieć w pełni działającą instalację Claude Code.

**Czego się nauczyłeś:**

✅ Poznałeś **trzy metody instalacji** (skrypt, Homebrew, NPM) i wiesz, którą wybrać dla swojego systemu
✅ Umiesz **rozwiązać najczęstsze problemy** instalacyjne za pomocą tabeli ratunkowej
✅ Znasz komendę `claude doctor` do diagnostyki
✅ Skonfigurowałeś **aliasy**, które przyśpieszą Twoją codzienną pracę
✅ Wiesz jak zainstalować Claude Code nawet w trudnym środowisku korporacyjnym

**Najważniejsza rzecz do zapamiętania:**

> Jeśli cokolwiek nie działa, uruchom `claude doctor` - to Twoja pierwsza linia obrony przy problemach.

---

## ❓ 3 pytania kontrolne

1. **Jaką metodę instalacji wybierzesz, jeśli chcesz łatwo zarządzać różnymi wersjami Claude Code?**
   - A) Oficjalny skrypt instalacyjny
   - B) Homebrew
   - C) NPM
   - D) PowerShell

2. **Co zrobisz, jeśli po instalacji komenda `claude` nie działa i widzisz błąd "command not found"?**
   - A) Zrestartujesz komputer
   - B) Dodasz Claude do zmiennej PATH
   - C) Odinstalujesz i zainstalujesz ponownie
   - D) Napiszesz do supportu

3. **Jaka komenda pozwala uruchomić diagnostykę instalacji Claude Code?**
   - A) `claude --help`
   - B) `claude debug`
   - C) `claude doctor`
   - D) `claude --test`

*(Odpowiedzi: 1-C, 2-B, 3-C)*

---

## 🛠️ Zadania praktyczne - DO WYKONANIA!

### Zadanie 1: Instalacja podstawowa ⭐

1. Wybierz odpowiednią metodę instalacji dla Twojego systemu
2. Zainstaluj Claude Code
3. Uruchom `claude --version` i zrób screenshot wyniku
4. Uruchom `claude doctor` i sprawdź, czy wszystko działa

**Oczekiwany wynik:** Widzisz numer wersji Claude Code i `doctor` pokazuje wszystko OK.

---

### Zadanie 2: Konfiguracja aliasów ⭐⭐

1. Otwórz swój plik konfiguracyjny powłoki (`.bashrc` lub `.zshrc`)
2. Dodaj przynajmniej 3 aliasy z sekcji "Pro-tipy"
3. Załaduj konfigurację: `source ~/.bashrc` (lub `.zshrc`)
4. Przetestuj aliasy - spróbuj wpisać `c` zamiast `claude`

**Oczekiwany wynik:** Możesz uruchomić Claude wpisując tylko `c`.

---

### Zadanie 3: Rozwiązywanie problemów ⭐⭐⭐

Symulacja problemu (tylko jeśli wszystko działa!):

1. Sprawdź gdzie jest zainstalowany Claude: `which claude`
2. Wyświetl swoją zmienną PATH: `echo $PATH`
3. Zidentyfikuj, który fragment PATH wskazuje na Claude

**Oczekiwany wynik:** Rozumiesz, jak działa zmienna PATH i gdzie znajdują się Twoje programy.

---

### BONUS: Pierwszy test Claude Code 🎁

Jeśli wszystko działa, uruchom:

```bash
claude
```

A potem napisz:

```
Cześć! Jestem nowym użytkownikiem Claude Code. Możesz wyświetlić podstawowe informacje o moim systemie?
```

Claude powinien odpowiedzieć i pokazać informacje o twoim systemie!

---

## 🔗 Linki do zasobów

### Oficjalna dokumentacja:
- **Przewodnik instalacji:** [https://code.claude.com/docs/setup](https://code.claude.com/docs/setup)
- **Troubleshooting:** [https://code.claude.com/docs/troubleshooting](https://code.claude.com/docs/troubleshooting)
- **Claude Code GitHub:** [https://github.com/anthropics/claude-code](https://github.com/anthropics/claude-code)

### Rozwiązywanie problemów:
- **Community Forum:** [https://community.anthropic.com](https://community.anthropic.com)
- **Discord społeczności Claude:** (szukaj "Claude AI Discord" w Google)

### Narzędzia pomocnicze:
- **Homebrew (Mac):** [https://brew.sh](https://brew.sh)
- **Node Version Manager (nvm):** [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)
- **Windows Terminal:** [https://aka.ms/terminal](https://aka.ms/terminal) - lepszy terminal dla Windows

---

## 📮 Odpowiedzi na pytania z początku

**Pytanie 1: Czym Claude Code różni się od narzędzi takich jak GitHub Copilot?**

**Odpowiedź:** GitHub Copilot działa **w edytorze kodu** (VS Code, IDE) i podpowiada fragmenty kodu podczas pisania. Claude Code działa **w terminalu** jako autonomiczny agent - może wykonywać komendy systemowe, zarządzać plikami, uruchamiać git, instalować paczki i robić wszystko, co możesz zrobić w terminalu. To różnica między "asystentem podpowiadającym kod" a "autonomicznym programistą wykonującym zadania".

**Pytanie 2: Dlaczego mówimy, że Claude Code to "bardzo szybki stażysta z doskonałą pamięcią"?**

**Odpowiedź:** Jak stażyście, Claude Code możesz **delegować całe zadania**, a nie tylko prosić o fragment kodu. Powiesz "zaktualizuj zależności i napraw konflikty" zamiast "uruchom npm update". "Doskonała pamięć" oznacza, że Claude pamięta kontekst całej rozmowy i strukturę projektu - nie musisz się powtarzać. A "bardzo szybki" - bo wykonuje zadania w sekundach, nie godzinach.

---

## Na miłe zakończenie :)
## 002

TUTAJ WKLEJ OBRAZEK z adresu https://images.danielroziecki.com//.netlify/images?url=/002.use.homebrew.jpg

## 🎯 Co dalej?

W następnym mailu (#3) poznasz **uwierzytelnianie i konfigurację konta** - zarówno konto Claude.ai (Pro/Team) jak i Claude Console (API). Dowiesz się, którą opcję wybrać i jak skonfigurować klucze API.

**Ale najpierw - wykonaj zadania praktyczne z tego maila!** Bez działającej instalacji nie przejdziesz dalej.

---

**Do zobaczenia w kolejnej lekcji!**

Jeśli masz pytania lub coś nie działa - odpowiedz na tego maila. Pomogę rozwiązać problem.

PS: Nie zapomnij wykonać zadań praktycznych! To najważniejsza część nauki.

---
