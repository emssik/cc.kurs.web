---
title: "Instalacja i konfiguracja"
description: "Krok po kroku: jak zainstalować i skonfigurować Claude Code na swoim systemie"
duration: 15
difficulty: beginner
tags: [instalacja, konfiguracja, setup, npm]
---

# Instalacja i konfiguracja Claude Code

## Wprowadzenie

Zanim zaczniesz pracę z Claude Code, musisz go poprawnie zainstalować i skonfigurować. W tej lekcji przejdziemy przez cały proces - od wymagań systemowych, przez instalację, po podstawową konfigurację. Po tej lekcji będziesz mieć w pełni działające środowisko Claude Code gotowe do pracy.

## Dlaczego to ważne?

Poprawna instalacja i konfiguracja to fundament skutecznej pracy z Claude Code. Błędy na tym etapie mogą prowadzić do problemów później, dlatego warto poświęcić chwilę, aby wszystko skonfigurować prawidłowo od początku.

## Wymagania systemowe

Przed instalacją upewnij się, że Twój system spełnia następujące wymagania:

### Minimalne wymagania:
- **System operacyjny:** Windows 10+, macOS 10.15+, lub Linux (Ubuntu 20.04+, Debian 10+)
- **Node.js:** wersja 18.0.0 lub nowsza
- **npm:** wersja 9.0.0 lub nowsza
- **Pamięć RAM:** minimum 4 GB (zalecane 8 GB+)
- **Miejsce na dysku:** minimum 500 MB

### Dodatkowe wymagania:
- **Terminal:** Bash, Zsh, lub kompatybilny
- **Konto Anthropic:** potrzebne do autoryzacji
- **Klucz API:** dostępny po zarejestrowaniu konta

## Instalacja krok po kroku

### Krok 1: Sprawdź wersję Node.js i npm

```bash
# Sprawdź wersję Node.js
node --version

# Sprawdź wersję npm
npm --version
```

**Oczekiwane wyjście:**
```
v20.11.0  # lub nowsza (minimum v18.0.0)
10.2.4    # lub nowsza (minimum v9.0.0)
```

**Jeśli nie masz Node.js:** Pobierz go ze strony [nodejs.org](https://nodejs.org/)

### Krok 2: Instalacja Claude Code

Istnieją dwa sposoby instalacji Claude Code:

#### Opcja A: Instalacja globalna (zalecana dla początkujących)

```bash
npm install -g @anthropic-ai/claude-code
```

**Zalety:**
- Dostęp do `claude-code` z każdego miejsca w systemie
- Prostsza w użyciu dla początkujących

**Wady:**
- Wymaga uprawnień administratora (może wymagać `sudo` na macOS/Linux)

#### Opcja B: Instalacja lokalna (dla zaawansowanych)

```bash
npm install @anthropic-ai/claude-code
npx claude-code
```

**Zalety:**
- Nie wymaga uprawnień administratora
- Różne wersje w różnych projektach

**Wady:**
- Trzeba używać `npx` przed każdym wywołaniem

### Krok 3: Weryfikacja instalacji

```bash
# Sprawdź, czy Claude Code jest zainstalowany
claude-code --version

# Powinieneś zobaczyć coś w stylu:
# claude-code version 1.2.3
```

### Krok 4: Pierwsze uruchomienie i autoryzacja

```bash
# Uruchom Claude Code
claude-code
```

Przy pierwszym uruchomieniu zostaniesz poproszony o:

1. **Autoryzację konta Anthropic:**
   - Zostanie otwarty link w przeglądarce
   - Zaloguj się na swoje konto Anthropic
   - Autoryzuj Claude Code

2. **Konfigurację klucza API:**
   - Możesz podać własny klucz API
   - Lub użyć autoryzacji przez przeglądarkę

**Po pomyślnej autoryzacji zobaczysz:**
```
✓ Authorization successful!
Welcome to Claude Code!
```

## Podstawowa konfiguracja

Claude Code można skonfigurować na dwa sposoby:

### Plik konfiguracyjny globalny

Znajduje się w: `~/.config/claude-code/config.json`

```json
{
  "model": "claude-sonnet-4",
  "maxTokens": 200000,
  "language": "pl",
  "theme": "dark",
  "autoSave": true
}
```

### Plik konfiguracyjny projektu

Znajduje się w: `.claude/config.json` (w katalogu projektu)

```json
{
  "model": "claude-sonnet-4",
  "projectName": "Mój Projekt",
  "gitIntegration": true,
  "autoCommit": false
}
```

**Konfiguracja projektu ma pierwszeństwo przed globalną!**

## Konfiguracja opcjonalna

### Integracja z Git

Claude Code może automatycznie współpracować z Git:

```json
{
  "git": {
    "enabled": true,
    "autoStage": false,
    "commitTemplate": "🤖 Claude Code: ${summary}"
  }
}
```

### Wybór modelu AI

Możesz wybrać różne modele Claude:

```json
{
  "model": "claude-sonnet-4",  // Zalecany - balans szybkości i jakości
  // "model": "claude-opus-4", // Najlepszy - wolniejszy, droższy
  // "model": "claude-haiku-4" // Najszybszy - prostsze zadania
}
```

## Kiedy używać poszczególnych opcji?

### Instalacja globalna vs lokalna

✅ **Globalna:**
- Jesteś początkującym użytkownikiem
- Chcesz używać Claude Code w wielu projektach
- Nie planujesz używać różnych wersji

✅ **Lokalna:**
- Pracujesz w zespole z określoną wersją
- Potrzebujesz różnych wersji w różnych projektach
- Nie masz uprawnień administratora

### Konfiguracja globalna vs projektowa

✅ **Globalna:**
- Ustawienia ogólne (język, model, motyw)
- Preferencje osobiste

✅ **Projektowa:**
- Ustawienia specyficzne dla projektu
- Współdzielone w zespole (przez Git)
- Nadpisują ustawienia globalne

## Zadanie praktyczne

**Cel:** Zainstaluj i skonfiguruj Claude Code na swoim systemie

### Zadanie 1: Instalacja

1. Sprawdź wersje Node.js i npm
2. Zainstaluj Claude Code globalnie
3. Zweryfikuj instalację komendą `claude-code --version`
4. Uruchom Claude Code i przejdź przez proces autoryzacji

### Zadanie 2: Konfiguracja

1. Utwórz plik konfiguracyjny globalny w `~/.config/claude-code/config.json`
2. Ustaw swój preferowany model i język
3. Utwórz testowy projekt i dodaj konfigurację projektową
4. Uruchom Claude Code w projekcie i sprawdź, czy konfiguracja działa

### Zadanie 3: Test

W Claude Code wykonaj:
```
Stwórz plik test.txt z tekstem "Hello from Claude Code!"
```

**Oczekiwany rezultat:**
- Claude Code powinien utworzyć plik `test.txt` z odpowiednią treścią
- Możesz to sprawdzić komendą: `cat test.txt`

## Rozwiązywanie problemów

### Problem: "command not found: claude-code"

**Rozwiązanie:**
```bash
# Sprawdź, czy npm global bin jest w PATH
npm config get prefix

# Dodaj do PATH w ~/.bashrc lub ~/.zshrc:
export PATH="$PATH:$(npm config get prefix)/bin"

# Przeładuj konfigurację:
source ~/.bashrc  # lub source ~/.zshrc
```

### Problem: Błąd autoryzacji

**Rozwiązanie:**
1. Sprawdź, czy masz konto na [console.anthropic.com](https://console.anthropic.com)
2. Wygeneruj nowy klucz API
3. Ustaw go ręcznie:
   ```bash
   export ANTHROPIC_API_KEY="twoj-klucz-api"
   ```

### Problem: Błąd uprawnień podczas instalacji (macOS/Linux)

**Rozwiązanie:**
```bash
# Opcja 1: Użyj sudo (niezalecane)
sudo npm install -g @anthropic-ai/claude-code

# Opcja 2: Zmień właściciela katalogu npm (zalecane)
mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
npm install -g @anthropic-ai/claude-code
```

## Jak Claude Code może Ci pomóc?

Jeśli masz problemy z instalacją, możesz zapytać Claude Code:
- "Jak zainstalować Claude Code na Windows?"
- "Dlaczego mam błąd 'command not found' po instalacji?"
- "Jak skonfigurować Claude Code do pracy z moim projektem?"
- "Jakie są różnice między modelami Claude?"

## Dodatkowe materiały

### Oficjalna dokumentacja
- [Installation Guide](https://docs.claude.com/en/docs/claude-code/installation)
- [Configuration Reference](https://docs.claude.com/en/docs/claude-code/configuration)
- [Troubleshooting](https://docs.claude.com/en/docs/claude-code/troubleshooting)

### Video tutoriale
- [Claude Code Installation on macOS](https://www.youtube.com/results?search_query=claude+code+installation+macos)
- [Claude Code Setup on Windows](https://www.youtube.com/results?search_query=claude+code+installation+windows)

### Artykuły
- [Best Practices for Claude Code Setup](https://www.anthropic.com/news)
- [Configuring Claude Code for Your Team](https://www.anthropic.com/news)

### Społeczność
- [GitHub Issues - Installation Problems](https://github.com/anthropics/claude-code/issues?q=is%3Aissue+label%3Ainstallation)
- [Discord - #installation-help](https://discord.gg/anthropic)

## Podsumowanie

W tej lekcji nauczyłeś się:
- Jak sprawdzić wymagania systemowe
- Jak zainstalować Claude Code (globalnie i lokalnie)
- Jak skonfigurować Claude Code (globalnie i dla projektu)
- Jak rozwiązywać typowe problemy z instalacją
- Gdzie szukać pomocy w razie problemów

W następnej lekcji utworzymy pierwszy prawdziwy projekt z Claude Code i zobaczymy, jak wykorzystać go w praktyce!

---

**Ilustracje:** (do dodania)
- Screenshot procesu instalacji
- Diagram struktury plików konfiguracyjnych
- Screenshot pomyślnej autoryzacji
