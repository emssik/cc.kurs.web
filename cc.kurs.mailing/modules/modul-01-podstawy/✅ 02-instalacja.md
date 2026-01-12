# Mail #2: Instalacja i pierwsze uruchomienie - od zera do pierwszego zadania

---

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

Dzisiaj **zainstalujesz Claude Code i uruchomisz swoje pierwsze zadanie**. Skupimy się na tym, żebyś szybko przeszedł przez instalację i od razu zaczął pracować. Poznasz podstawowe komendy, skonfigurujesz swoje środowisko i wykonasz pierwsze praktyczne zadania. Żadnego przepisywania dokumentacji - od razu do działania!

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

## 📦 Instalacja - szybki start

### Która metoda dla Ciebie?

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

**UWAGA:**

Sam na codzień używam Maca. Jeśli masz problemy na innym systemie, kompletna dokumentacja instalacji jest tutaj: **[https://code.claude.com/docs/en/overview](https://code.claude.com/docs/en/overview)**

---

### Instalacja oficjalnym skryptem (zalecana)

**macOS/Linux:**
```bash
curl -fsSL https://claude.ai/install.sh | bash
```

**Windows PowerShell:**
```powershell
irm https://claude.ai/install.ps1 | iex
```

**Sprawdź, czy działa:**
```bash
claude --version
claude doctor  # Sprawdza czy wszystko OK
```

**Co może pójść nie tak?**

- **"command not found"** → Terminal nie widzi Claude w PATH. Rozwiązanie: zamknij i otwórz terminal na nowo
- **Windows Defender blokuje** → Tymczasowo wyłącz "Real-time protection" na czas instalacji

**Pełna dokumentacja troubleshootingu:** [https://code.claude.com/docs/en/troubleshooting](https://code.claude.com/docs/en/troubleshooting)

---

### ✅ Pierwsze uruchomienie

Uruchom Claude:

```bash
claude
```

**Co się stanie:**

1. Otworzy się przeglądarka z logowaniem (lub zobaczysz link)
2. Wybierzesz typ konta (Claude Console vs Claude Pro/Team)
3. Po zalogowaniu wrócisz do terminala i zobaczysz prompt Claude

Więcej o logowaniu i konfiguracjach w następnym mailu. Teraz tylko sprawdzamy, że działa!

---

## 🎯 Pierwsze praktyczne użycie

Zamiast czytać o instalacji, **użyjmy Claude Code do czegoś praktycznego**.

### Przykład 1: Analiza systemu

Uruchom Claude i napisz:

```
Wyświetl podstawowe informacje o moim systemie operacyjnym, wersji Node.js (jeśli mam) i pokażmi strukturę mojego katalogu domowego (bez wchodzenia w głąb).
```

Claude użyje komend systemowych, żeby to zrobić. Zobaczysz jak wykonuje komendy i pokazuje wyniki.

**Co Claude zrobi:**
- Uruchomi `uname -a` lub podobne komendy
- Sprawdzi `node -v`
- Użyje `ls -la ~` żeby pokazać strukturę katalogu

**Kluczowa obserwacja:** Nie powiedziałeś Claude "uruchom uname" czy "uruchom ls". Powiedziałeś CO CHCESZ, a Claude SAM zdecydował jakie komendy użyć.

---

### Przykład 2: Twój pierwszy projekt (mini)

Stwórzmy prosty projekt, żeby zobaczyć jak Claude pracuje z plikami.

```
Stwórz folder test-claude w moim katalogu domowym. W środku stwórz:
1. Plik README.md z opisem testowego projektu Claude Code
2. Prosty skrypt hello który wypisuje "Hello from Claude Code!"
3. Nadaj uprawnienia wykonywania dla hello
4. Uruchom ten skrypt

Na końcu pokaż mi zawartość wszystkich plików.
```

**Co zaobserwujesz:**

- Claude wykona serię komend (`mkdir`, `touch`, `echo`, `chmod`)
- Pokaże Ci każdą komendę przed wykonaniem (chyba że wyłączysz potwierdzenia)
- Przetestuje czy skrypt działa
- Pokaże wyniki

**To jest kluczowe:** Zobacz ile kroków Claude wykonał z jednego polecenia. Normalnie musiałbyś to zrobić ręcznie, krok po kroku.

---

### Przykład 3: Analiza istniejącego projektu

Jeśli masz jakiś projekt na dysku, spróbuj:

```
Przejdź do [ścieżka do twojego projektu] i powiedz mi:
1. Jaki to typ projektu (język, framework)?
2. Czy są jakieś pliki konfiguracyjne?
3. Czy projekt ma zdefiniowane zależności?
4. Jaka jest struktura katalogów?
```

Claude przeanalizuje projekt i da Ci pełny raport.

---

## ⚡ Pro-tipy: Skróty i aliasy

Zamiast pisać `claude` za każdym razem, możesz stworzyć alias `c`.

**Otwórz plik konfiguracyjny shella:**

```bash
# Dla bash (Linux/starsze Mac)
nano ~/.bashrc

# Dla zsh (nowsze Mac/Linux)
nano ~/.zshrc
```

**Dodaj aliasy:**

```bash
# Podstawowe skróty
alias c='claude'
alias cdoc='claude doctor'

# Szybkie przejście do projektów
alias cwork='cd ~/Projects/work && claude'

# Funkcja - uruchom Claude w konkretnym projekcie
cproj() {
    cd ~/Projects/"$1" && claude
}
```

**Zapisz i załaduj:**

```bash
source ~/.bashrc  # lub ~/.zshrc
```

**Teraz możesz:**

```bash
c  # zamiast claude
cwork  # przejdź do projektu i uruchom Claude
cproj moja-apka  # przejdź do konkretnego projektu
```

---

## 📚 Podsumowanie lekcji

**Czego się nauczyłeś:**

✅ Zainstalowałeś Claude Code (lub wiesz gdzie szukać pomocy jeśli coś nie działa)
✅ Uruchomiłeś Claude i zalogowałeś się
✅ Wykonałeś pierwsze praktyczne zadania - analiza systemu, tworzenie projektu
✅ Zobaczyłeś jak Claude **deleguje zadania** zamiast wykonywać pojedyncze komendy
✅ Skonfigurowałeś aliasy dla szybszej pracy

**Najważniejsza rzecz do zapamiętania:**

> Claude Code to nie jest "terminal chatbot". To autonomiczny agent, któremu delegujesz całe zadania, nie pojedyncze komendy.

---

## ❓ 3 pytania kontrolne

1. **Jaką komendę uruchomisz, żeby sprawdzić czy instalacja Claude Code jest OK?**
   - A) `claude --version`
   - B) `claude doctor`
   - C) `claude --test`
   - D) `claude check`

2. **Co się stanie, gdy napiszesz Claude: "Stwórz folder test i w nim plik hello.txt"?**
   - A) Claude wyświetli CI komendę do skopiowania
   - B) Claude zapyta o każdy szczegół
   - C) Claude wykona serię komend (`mkdir`, `touch`, etc.) i stworzy to za Ciebie
   - D) Claude pokaże dokumentację

3. **Jaka jest główna różnica między pracą z Claude Code a normalnymi komendami terminala?**
   - A) Claude jest szybszy
   - B) Delegujesz całe zadania zamiast pisać pojedyncze komendy
   - C) Claude ma lepsze GUI
   - D) Claude działa tylko na Mac

*(Odpowiedzi: 1-B, 2-C, 3-B)*

---

## 🛠️ Zadania praktyczne - DO WYKONANIA!

### Zadanie 1: Instalacja i pierwszy test ⭐

1. Zainstaluj Claude Code
2. Uruchom `claude doctor`
3. Uruchom `claude` i zaloguj się
4. Napisz: "Pokaż mi podstawowe informacje o moim systemie"

**Oczekiwany wynik:** Claude wykonuje komendy i pokazuje informacje o systemie.

---

### Zadanie 2: Twój pierwszy mini-projekt ⭐⭐

Uruchom Claude i napisz to polecenie (skopiuj dokładnie):

```
Stwórz folder ~/claude-test. W środku stwórz:
1. README.md z informacjami o tym projekcie
2. Skrypt test.sh który wypisuje datę i godzinę
3. Plik notes.txt z trzema notatkami o Claude Code
4. Podkatalog logs/ (pusty na razie)

Na końcu pokaż mi strukturę i zawartość wszystkich plików.
```

**Oczekiwany wynik:** Claude wykona wszystkie kroki i pokaże strukturę projektu.

**Kluczowa obserwacja:** Policz ile pojedynczych komend musiałbyś napisać, żeby to zrobić ręcznie. Claude zrobił to wszystko z jednego polecenia.

---

### Zadanie 3: Analiza twojego projektu ⭐⭐⭐

Jeśli masz jakiś projekt programistyczny na dysku, napisz:

```
Przejdź do [ścieżka do projektu] i zrób mi pełną analizę:
1. Jaki to typ projektu?
2. Jakie technologie są użyte?
3. Czy są jakieś problemy w konfiguracji?
4. Czy zależności są aktualne?
5. Jaka jest struktura plików?
```

**Oczekiwany wynik:** Szczegółowy raport o projekcie.

---

### BONUS: Konfiguracja aliasów 🎁

1. Skonfiguruj przynajmniej alias `c` dla `claude`
2. Stwórz alias dla swojego głównego projektu (np. `cwork`)
3. Przetestuj czy działa

**Oczekiwany wynik:** Możesz uruchomić Claude pisząc tylko `c`.

---

## 🔗 Linki do zasobów

**Jeśli coś nie działa - NAJPIERW TUTAJ:**
- **Troubleshooting (problemy instalacji):** [https://code.claude.com/docs/en/troubleshooting](https://code.claude.com/docs/en/troubleshooting)
- **Setup guide (pełna instrukcja):** [https://code.claude.com/docs/en/quickstart](https://code.claude.com/docs/en/quickstart)

**Inne przydatne:**
- **Claude Code GitHub:** [https://github.com/anthropics/claude-code](https://github.com/anthropics/claude-code)

**Narzędzia:**
- **Homebrew (Mac):** [https://brew.sh](https://brew.sh)
- **Node Version Manager (nvm):** [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)

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

**Ale najpierw - wykonaj zadania praktyczne z tego maila!** Najlepiej nauczysz się używając Claude Code, nie czytając o nim.

---

**Do zobaczenia w kolejnej lekcji!**

Jeśli masz pytania lub coś nie działa - odpowiedz na tego maila. Pomogę rozwiązać problem.

PS: Pamiętaj - jeśli masz problem z instalacją, **najpierw sprawdź dokumentację troubleshootingu**. Jest naprawdę dobra i ma rozwiązania dla 99% problemów!

---
