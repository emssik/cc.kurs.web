---
title: "Bash i komendy systemowe"
description: "Poznaj narzędzie Bash i naucz się, jak Claude Code wykonuje komendy systemowe"
duration: 15
difficulty: beginner
tags: [bash, terminal, komendy, shell]
---

# Bash i komendy systemowe

## Wprowadzenie

Jednym z najpotężniejszych narzędzi Claude Code jest Bash - pozwala na wykonywanie komend systemowych bezpośrednio z poziomu konwersacji. Od prostych operacji jak `ls` i `pwd`, przez instalację pakietów, aż po złożone skrypty - wszystko to możesz zlecić Claude Code. W tej lekcji nauczysz się, jak i kiedy wykorzystać to narzędzie.

## Dlaczego to ważne?

Narzędzie Bash to most między AI a systemem operacyjnym:
- **Automatyzacja:** Wykonywanie powtarzalnych zadań
- **Instalacja:** Zarządzanie zależnościami i pakietami
- **Testowanie:** Uruchamianie testów i buildów
- **Deployment:** Wdrażanie aplikacji
- **Diagnostyka:** Sprawdzanie stanu systemu

## Czym jest narzędzie Bash?

Bash to narzędzie, które pozwala Claude Code wykonywać komendy w terminalu Twojego systemu. Działa na:
- **Linux:** Bash shell
- **macOS:** Zsh lub Bash
- **Windows:** PowerShell lub WSL Bash

**Ważne:** Claude Code NIE może używać Bash do:
- Operacji na plikach (używa Read, Write, Edit)
- Wyszukiwania w plikach (używa Grep)
- Znajdowania plików (używa Glob)

Bash to narzędzie do **operacji systemowych**, nie do pracy z kodem.

## Podstawowe kategorie komend

### 1. Zarządzanie pakietami

**npm/yarn (JavaScript):**
```bash
npm install express
npm test
npm run build
npm run dev
```

**pip (Python):**
```bash
pip install requests
pip install -r requirements.txt
```

**composer (PHP):**
```bash
composer install
composer update
```

### 2. Operacje Git

```bash
git status
git add .
git commit -m "message"
git push
git pull
```

### 3. Testowanie

```bash
npm test
npm run test:watch
pytest
jest --coverage
```

### 4. Build i deployment

```bash
npm run build
docker build -t myapp .
docker-compose up
npm run deploy
```

### 5. Sprawdzanie systemu

```bash
pwd                    # Obecny katalog
whoami                 # Obecny użytkownik
node --version         # Wersja Node.js
npm --version          # Wersja npm
df -h                  # Wolne miejsce na dysku
```

## Praktyczne scenariusze

### Scenariusz 1: Instalacja zależności

```
Ty: Zainstaluj bibliotekę axios i zapisz do dependencies
```

**Claude Code wykona:**
```bash
npm install axios
```

**Wynik:**
```
+ axios@1.6.2
added 5 packages, and audited 123 packages in 3s
```

### Scenariusz 2: Uruchomienie testów

```
Ty: Uruchom wszystkie testy
```

**Claude Code wykona:**
```bash
npm test
```

**Wynik:**
```
PASS  src/calculator.test.js
PASS  src/utils.test.js

Test Suites: 2 passed, 2 total
Tests:       12 passed, 12 total
Time:        2.456s
```

### Scenariusz 3: Sprawdzenie wersji

```
Ty: Sprawdź, jakiej wersji Node.js używam
```

**Claude Code wykona:**
```bash
node --version
```

**Wynik:**
```
v20.11.0
```

### Scenariusz 4: Build projektu

```
Ty: Zbuduj projekt produkcyjny
```

**Claude Code wykona:**
```bash
npm run build
```

**Wynik:**
```
Creating an optimized production build...
Compiled successfully!

File sizes after gzip:
  52.3 KB  build/static/js/main.abc123.js
  1.2 KB   build/static/css/main.def456.css
```

### Scenariusz 5: Docker operations

```
Ty: Zbuduj obraz Docker z nazwą myapp:latest
```

**Claude Code wykona:**
```bash
docker build -t myapp:latest .
```

### Scenariusz 6: Sprawdzenie portu

```
Ty: Sprawdź, czy port 3000 jest zajęty
```

**Claude Code wykona:**
```bash
# macOS/Linux
lsof -i :3000

# lub uniwersalnie
netstat -an | grep 3000
```

## Sekwencyjne vs Równoległe komendy

### Sekwencyjne (&&)

Użyj `&&`, gdy kolejna komenda zależy od poprzedniej:

```bash
npm install && npm test && npm run build
```

**Zalety:**
- Jeśli install się nie powiedzie, test się nie uruchomi
- Bezpieczne dla zależnych operacji

### Równoległe (w osobnych wywołaniach Bash)

```
Ty: Uruchom testy jednostkowe i testy integracyjne równolegle
```

Claude Code wykona dwa osobne wywołania Bash:
```bash
npm run test:unit
# oraz równolegle
npm run test:integration
```

## Background processes

Dla długo działających procesów:

```
Ty: Uruchom serwer deweloperski w tle
```

Claude Code może użyć `run_in_background: true`:
```bash
npm run dev
```

Później możesz sprawdzić output:
```
Ty: Pokaż mi output z serwera deweloperskiego
```

## Kiedy używać Bash?

### ✅ Używaj Bash do:

1. **Instalacji pakietów:**
   ```
   npm install, pip install, composer install
   ```

2. **Uruchamiania testów:**
   ```
   npm test, pytest, jest
   ```

3. **Buildowania:**
   ```
   npm run build, webpack, vite build
   ```

4. **Docker operations:**
   ```
   docker build, docker-compose up
   ```

5. **Git operations:**
   ```
   git commit, git push
   ```

6. **Sprawdzania systemu:**
   ```
   node --version, df -h, whoami
   ```

7. **Uruchamiania skryptów:**
   ```
   npm run deploy, ./scripts/setup.sh
   ```

### ❌ NIE używaj Bash do:

1. **Czytania plików:**
   ❌ `cat file.js`
   ✅ "Przeczytaj plik file.js" (używa Read)

2. **Wyszukiwania w plikach:**
   ❌ `grep "function" *.js`
   ✅ "Znajdź 'function' w plikach JS" (używa Grep)

3. **Znajdowania plików:**
   ❌ `find . -name "*.js"`
   ✅ "Znajdź wszystkie pliki JS" (używa Glob)

4. **Edycji plików:**
   ❌ `sed -i 's/old/new/' file.js`
   ✅ "Zmień 'old' na 'new' w file.js" (używa Edit)

5. **Tworzenia plików:**
   ❌ `echo "content" > file.txt`
   ✅ "Stwórz file.txt z treścią 'content'" (używa Write)

## Zadanie praktyczne

**Cel:** Przećwicz używanie Bash w różnych scenariuszach

### Przygotowanie

Stwórz testowy projekt Node.js:

```
Ty: Stwórz nowy projekt Node.js z package.json, zainstaluj express i dodaj prosty serwer w server.js
```

### Zadanie 1: Sprawdzenie środowiska

```
Ty: Sprawdź wersje Node.js i npm
```

**Oczekiwany rezultat:**
- Informacje o wersjach Node.js i npm

### Zadanie 2: Instalacja zależności

```
Ty: Zainstaluj biblioteki: axios, dotenv, cors
```

**Sprawdź:**
```
Ty: Przeczytaj package.json i sprawdź, czy biblioteki zostały dodane
```

### Zadanie 3: Dodanie skryptów

```
Ty: Dodaj do package.json skrypty:
- "start": "node server.js"
- "dev": "nodemon server.js"
- "test": "echo 'No tests yet'"
```

### Zadanie 4: Testowanie skryptów

```
Ty: Uruchom skrypt test
```

**Oczekiwany rezultat:**
```
> test
> echo 'No tests yet'

No tests yet
```

### Zadanie 5: Sprawdzenie zależności

```
Ty: Wyświetl drzewo zależności npm
```

**Claude Code wykona:**
```bash
npm list --depth=0
```

### Zadanie 6: Audit bezpieczeństwa

```
Ty: Sprawdź, czy są znane luki bezpieczeństwa w zależnościach
```

**Claude Code wykona:**
```bash
npm audit
```

### Zadanie 7: Sprawdzanie procesu (zaawansowane)

```
Ty: Uruchom serwer w tle i pokaż mi, czy działa na porcie 3000
```

**Claude Code:**
1. Uruchomi `npm run dev` w tle
2. Sprawdzi port: `lsof -i :3000`

## Best practices

### 1. Zawsze sprawdzaj wersje przed instalacją

```
Ty: Sprawdź wersję Node przed instalacją pakietów
```

### 2. Używaj flag dla clarity

```bash
npm install --save axios        # Zapisz do dependencies
npm install --save-dev jest     # Zapisz do devDependencies
npm test -- --verbose           # Uruchom z dodatkowymi flagami
```

### 3. Sprawdzaj output

```
Ty: Uruchom build i pokaż mi, czy były błędy
```

### 4. Timeout dla długich operacji

Długie operacje (build, testy) mogą potrzebować więcej czasu:

```
Ty: Uruchom pełny build produkcyjny (może potrwać kilka minut)
```

Claude Code może ustawić dłuższy timeout.

### 5. Bezpieczeństwo

**Nigdy nie uruchamiaj:**
- Komend, których nie rozumiesz
- Skryptów z niezaufanych źródeł
- Komend wymagających sudo bez zrozumienia

Claude Code ostrzeże przed niebezpiecznymi operacjami!

## Częste problemy

### Problem: "command not found"

**Przyczyna:** Komenda nie jest zainstalowana

**Rozwiązanie:**
```
Ty: Zainstaluj narzędzie X globalnie
```

### Problem: Permission denied

**Przyczyna:** Brak uprawnień

**Rozwiązanie:**
```
Ty: Nie mogę wykonać komendy X przez brak uprawnień. Co powinienem zrobić?
```

Claude Code zasugeruje rozwiązanie (czasem `sudo`, czasem zmiana właściciela).

### Problem: Timeout

**Przyczyna:** Operacja trwa za długo

**Rozwiązanie:**
- Użyj `run_in_background: true`
- Zwiększ timeout
- Podziel na mniejsze operacje

### Problem: Output za długi

**Przyczyna:** Komenda zwraca bardzo dużo tekstu

**Rozwiązanie:**
Użyj filtrowania:
```bash
npm test 2>&1 | grep "PASS"  # Tylko przechodzące testy
npm list | head -20          # Tylko pierwsze 20 linii
```

## Zaawansowane techniki

### 1. Łączenie komend

```bash
# Sekwencyjnie - zatrzymaj przy błędzie
npm install && npm test && npm run build

# Zawsze wykonaj wszystkie
npm test; npm run lint; npm run build

# Warunkowe
npm test || echo "Tests failed but continuing"
```

### 2. Variables i substitution

```bash
VERSION=$(node -p "require('./package.json').version")
echo "Building version $VERSION"
```

### 3. Loops (przez skrypty)

```bash
for file in *.js; do
  echo "Processing $file"
done
```

### 4. Pipes i redirection

```bash
npm test 2>&1 | tee test-output.log  # Output do pliku i ekranu
npm list --json > deps.json          # Output tylko do pliku
```

### 5. Environment variables

```bash
NODE_ENV=production npm run build
PORT=8080 npm start
```

## Jak Claude Code może Ci pomóc?

Możesz pytać:
- "Jak zainstalować pakiet globalnie przez npm?"
- "Jaka jest różnica między && a ; w Bash?"
- "Jak uruchomić komendę w tle?"
- "Wyjaśnij, co robi komenda X"

## Dodatkowe materiały

### Oficjalna dokumentacja
- [Bash Tool Reference](https://docs.claude.com/en/docs/claude-code/tools/bash)
- [System Commands Best Practices](https://docs.claude.com/en/docs/claude-code/best-practices/system-commands)

### Bash/Shell Resources
- [Bash Guide for Beginners](https://tldp.org/LDP/Bash-Beginners-Guide/html/)
- [Shell Scripting Tutorial](https://www.shellscript.sh/)
- [Explain Shell - Command Explainer](https://explainshell.com/)

### Package Managers
- [npm Documentation](https://docs.npmjs.com/)
- [yarn Documentation](https://yarnpkg.com/)
- [pip Documentation](https://pip.pypa.io/)

### Video tutoriale
- [Bash Basics](https://www.youtube.com/results?search_query=bash+basics+tutorial)
- [npm Commands Tutorial](https://www.youtube.com/results?search_query=npm+commands+tutorial)

### Społeczność
- [Stack Overflow - Bash](https://stackoverflow.com/questions/tagged/bash)
- [r/bash Reddit](https://www.reddit.com/r/bash/)

## Podsumowanie

W tej lekcji nauczyłeś się:
- Czym jest narzędzie Bash w Claude Code
- Kiedy używać Bash, a kiedy innych narzędzi
- Jak wykonywać podstawowe operacje systemowe
- Jak instalować pakiety i uruchamiać testy
- Jakie są best practices dla komend systemowych
- Jak rozwiązywać typowe problemy

W następnej lekcji szczegółowo poznasz narzędzie Grep i zaawansowane wyszukiwanie w kodzie!

---

**Ilustracje:** (do dodania)
- Diagram: Bash vs inne narzędzia (kiedy używać którego)
- Infografika najczęstszych komend Bash
- Screenshot przykładowego output z npm install
- Flowchart troubleshootingu błędów Bash
