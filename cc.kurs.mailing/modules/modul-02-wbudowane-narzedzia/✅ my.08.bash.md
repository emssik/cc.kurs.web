---
lesson: "02.08"
title: "Bash: Od Terminala do Autonomicznego Asystenta"
description: "Wprowadzenie do Bash i jak Claude używa terminala - od podstaw do zaawansowanej automatyzacji"
module: "02-wbudowane-narzedzia"
---

# Bash: Od Terminala do Autonomicznego Asystenta

Karina patrzy na ekran. Paweł właśnie napisał coś w terminalu i już wyszedł z pokoju.

— Zostawiłem ci na ekranie — rzucił wychodząc. — Jak skończysz te testy, to możesz wyjść wcześniej.

Na monitorze:

```bash
npm test src/auth && npm run build && git add . && git commit -m "Fix auth" && git push
```

Karina patrzy na to jak na hieroglify.

— Co to w ogóle znaczy? Co to `&&`? I czemu wszystko po przecinkach... nie, to nie przecinki... — mruczy do siebie.

Po chwili otwiera Claude Code.

— Run tests for auth module, build the app, commit with message "Fix auth" and push to remote.

5 sekund później widzi:

```
✓ Tests passed (12 tests, 0 failures)
✓ Build successful
✓ Changes committed
✓ Pushed to origin/main
```

— Okej, to jest magia.

Kilka minut później wraca Paweł i patrzy na monitor.

— Nie denerwuj się, że Ci pokazałem tę komendę — mówi. — Mógł być gotowy za godzinę, więc wystarczyło...

— Już zrobione — przerywa Karina. — Poprosiłam Claude i sam się ogarnął.

Paweł unosi brew.

— Czyli Claude wykonał te komendy za Ciebie?

— Tak, chyba tak. Nie czytałam nawet, co dokładnie robił. Po prostu działa.

Paweł kiwa głową i uśmiecha się.

— To jest dokładnie to, o czym będziemy mówić dzisiaj: Claude jako operator Twojego terminala. Ale żeby to w pełni ogarnąć, powinnaś wiedzieć co to w ogóle jest ten terminal, czym jest Bash, i dlaczego Claude jest w tym dobry.

### 📊 Liczby nie kłamią: Dlaczego automatyzacja terminala ma sens

McKinsey szacuje, że **60% pracowników może zaoszczędzić 30% czasu** dzięki automatyzacji. To nie są abstrakcyjne liczby - to znaczy, że jeśli pracujesz 8 godzin dziennie, automatyzacja może dać Ci **2.4 godziny dziennie z powrotem**.

**Realne przykłady:**
- **Deloitte** skrócił przygotowanie raportu zarządczego **z 8 dni do 1 godziny**
- Firmy oszczędzają średnio **$46,000 rocznie** przez automatyzację workflow
- Zautomatyzowane procesy są **40-75% mniej podatne na błędy** niż ręczne

Teraz wyobraź sobie, że masz asystenta AI, który zna terminal za Ciebie i wykonuje te automatyzacje na Twoje polecenie. To właśnie robi Claude Code.

---

## Co zrobisz po tej lekcji (praktycznie)

- Zrozumiesz czym jest terminal, shell i Bash (dla osób bez technicznego tła).
- Poznasz podstawowe komendy Bash i operatory (`&&`, `;`, `||`).
- Dowiesz się jak Claude używa narzędzia Bash do wykonywania komend systemowych.
- Nauczysz się jak Claude radzi sobie z timeoutami i długotrwałymi procesami (background execution).
- Zrozumiesz czemu spacje w ścieżkach powodują problemy i jak Claude je rozwiązuje.
- Zobaczysz praktyczne przykłady automatyzacji: backupy, raporty, CI/CD.

> **Nota weryfikacyjna (Claude Code 2.1.x):** Przeprowadziłem weryfikację treści tej lekcji w oparciu o źródła techniczne dotyczące Claude Code. Ogólny werdykt: **treść jest w bardzo wysokim stopniu zgodna z prawdą**. Dwa doprecyzowania: (1) domyślny timeout narzędzia Bash może być krótszy niż 3 minuty w standardowej konfiguracji, (2) na czystym Windows do bashowych komend w praktyce potrzebujesz Git Bash lub WSL2.

## 1. Wprowadzenie: Czym jest Terminal i Bash?

Paweł zasuwa krzesło i otwiera terminal.

— Terminal to twój sposób na rozmawianie z komputerem w "jego języku". Zamiast klikać myszką, wpisujesz polecenia tekstem.

### Terminal, Shell, Bash – co to wszystko znaczy?

Karina marszczy czoło.

— Czekaj, to nie to samo?

— Nie — odpowiada Paweł. — To trzy różne rzeczy, które razem tworzą całość.

**Terminal** – to okno, w którym wpisujesz komendy. Jak notatnik, ale dla poleceń systemowych.

**Shell** – to program, który interpretuje te komendy. Czyta co napisałeś, wykonuje to i pokazuje wynik. To tłumacz między Tobą a systemem operacyjnym.

**Bash** – to konkretny rodzaj shella (jeden z najpopularniejszych). Nazywa się "Bourne Again Shell". Na Macu i Linuxie to domyślny shell (choć Mac przeszedł na `zsh`, który jest podobny). **Na Windows:** Claude Code może działać w PowerShell/CMD/Windows Terminal, ale do wykonywania komend bashowych w natywnej instalacji w praktyce potrzebujesz Git Bash. Alternatywa: WSL2 (Windows Subsystem for Linux), gdzie masz normalne środowisko linuksowe.

Analogia:
- **Terminal** = karta w przeglądarce
- **Shell** = silnik przeglądarki (Chrome, Firefox)
- **Bash** = konkretna wersja silnika

### Podstawowa anatomia komendy

Paweł wpisuje:

```bash
ls -la /Users/Karina/Documents
```

— Każda komenda ma strukturę:

```
komenda [opcje] [argumenty]
```

- `ls` – komenda (wyświetl pliki)
- `-la` – opcje/flagi (long format + ukryte pliki)
- `/Users/Karina/Documents` – argument (gdzie szukać)

Karina kiwa głową.

— Okej, to ma sens. Ale czemu czasem widzę `-` a czasem `--`?

— Dobra uwaga — odpowiada Paweł. — Krótkie opcje to jedna litera z jednym `-`, np. `-l`, `-a`. Długie opcje to słowa z dwoma `--`, np. `--help`, `--verbose`. Możesz łączyć krótkie: `-la` to to samo co `-l -a`.

### Najważniejsze komendy dla początkujących

Paweł szybko kreśli listę:

**`ls` - Lista plików**
Przykład: `ls -la` (pokaż wszystkie szczegóły)

**`cd` - Zmień katalog**
Przykład: `cd ~/Documents`

**`pwd` - Gdzie jestem?**
Przykład: `pwd` (print working directory)

**`mkdir` - Stwórz folder**
Przykład: `mkdir nowy-folder`

**`rm` - Usuń plik**
Przykład: `rm plik.txt` (⚠️ nie ma kosza!)

**`cp` - Kopiuj**
Przykład: `cp plik.txt kopia.txt`

**`mv` - Przenieś/zmień nazwę**
Przykład: `mv stary.txt nowy.txt`

**`cat` - Wyświetl zawartość**
Przykład: `cat README.md`

**`grep` - Szukaj w tekście**
Przykład: `grep "TODO" *.js`

**`echo` - Wypisz tekst**
Przykład: `echo "Hello"`

---

Karina patrzy na listę.

— To jest... dużo.

— Spokojnie — uspokaja ją Paweł. — Nie musisz ich znać. Dlatego właśnie masz Claude. On zna te komendy, ale **zazwyczaj używa dedykowanych narzędzi**: Read zamiast `cat`, Edit zamiast `sed`, Grep zamiast `grep`. Bash to ostateczność, gdy nie ma lepszego narzędzia. Ale warto wiedzieć, że komendy bash istnieją i w przybliżeniu co robią.

### Ścieżki: absolutne vs relatywne

— Ostatnia rzecz przed przejściem do Claude — mówi Paweł. — Ścieżki.

**Absolutna ścieżka** – pełna ścieżka od roota systemu:
```bash
/Users/Karina/Projects/app/src/index.js
```

**Relatywna ścieżka** – względem miejsca, gdzie jesteś:
```bash
./src/index.js
# lub po prostu
src/index.js
```

Skróty:
- `.` – bieżący katalog
- `..` – katalog wyżej
- `~` – Twój folder domowy (`/Users/Karina`)

```bash
cd ~/Projects        # Idź do mojego folderu Projects
cd ../..            # Idź dwa poziomy wyżej
ls ./src            # Pokaż pliki w folderze src obok mnie
```

## 2. Claude jako Operator Terminala

Paweł pokazuje Karinie proste polecenie:

```
> Show me all JavaScript files in current directory
```

Claude odpowiada:

```bash
find . -name "*.js" -type f
```

I wykonuje to, zwracając listę:

```
./src/index.js
./src/auth.js
./tests/auth.test.js
./config/app.js
```

Karina jest pod wrażeniem.

— Czekaj, skąd Claude wie, że ma użyć `find` a nie... czegoś innego?

Paweł uśmiecha się.

— Bo Claude to nie tylko LLM — to LLM **z narzędziami**. Jedno z tych narzędzi nazywa się `Bash`. I działa to mniej więcej tak:

### Jak działa narzędzie Bash w Claude Code

**Ty:**
> "Run tests for auth module"

**Claude (wewnętrznie):**
1. Analizuje kontekst projektu (czy to Node.js? Python? Ruby?)
2. Szuka `package.json` lub innych plików konfiguracyjnych
3. Decyduje: "to projekt Node.js"
4. Wybiera komendę: `npm test src/auth`
5. Wywołuje narzędzie **Bash** z tą komendą
6. Pokazuje Ci wynik

**Różnica:**
- Ty nie musisz znać składni `npm`, `pytest`, `cargo`, `go test`
- Claude wykrywa język i środowisko automatycznie
- Claude dodaje odpowiednie flagi (`-v` dla verbose, `--watch` dla trybu ciągłego, itd.)
- Claude cytuje ścieżki ze spacjami (o tym za chwilę)

### Automatyczne wykrywanie kontekstu

Paweł pokazuje przykłady:

**Projekt Node.js:**
```
> Install axios
→ npm install axios
```

**Projekt Python:**
```
> Install requests
→ pip install requests
```

**Projekt Ruby:**
```
> Install httparty
→ gem install httparty
```

Claude nie pyta "który package manager?". Po prostu wie.

## 3. Problem: Długotrwałe Procesy i Timeout

Karina próbuje uruchomić serwer deweloperski:

```
> Start development server
```

Claude wykonuje:
```bash
npm run dev
```

I nagle... terminal "zamiera". Serwer działa, ale nic więcej nie można zrobić.

— Czemu to się zawiesza? — pyta Karina.

— Bo serwer "blokuje" terminal — wyjaśnia Paweł. — To długotrwały proces. Normalnie musiałbyś otworzyć nową kartę terminala albo uruchomić to w tle.

### Rozwiązanie: Background Execution

— Ale Claude potrafi to obsłużyć — mówi Paweł.

Claude wewnętrznie używa parametru `run_in_background: true` dla takich procesów.

**Co się dzieje:**

1. Claude wykrywa, że `npm run dev` to długotrwały proces
2. Uruchamia go w tle (z `&` na końcu)
3. Dostaje `shellId` – identyfikator tego procesu
4. Terminal jest wolny do dalszej pracy
5. Możesz później sprawdzić logi lub zatrzymać proces

```
> Start dev server
✓ Development server started in background (shellId: abc123)

> Check dev server logs
[Ostatnie 20 linii logów...]

> Stop dev server
✓ Server stopped
```

### Timeout

W standardowej konfiguracji Claude Code domyślny timeout dla narzędzia Bash to **30 sekund** (`BASH_DEFAULT_TIMEOUT_MS = 30000`). Claude może jawnie wydłużyć timeout dla konkretnej komendy (aż do **10 minut**, `BASH_MAX_TIMEOUT_MS = 600000`) jeśli kontekst na to wskazuje (np. testy, buildy, migracje).

Dla procesów, które mogą trwać jeszcze dłużej (np. serwery deweloperskie), Claude automatycznie używa background execution.

**Przykłady:**
- `npm run dev` → background
- `npm test` → normalnie (testy zwykle trwają krócej)
- `npm run build` → może być normalnie lub background (zależy od wielkości projektu)

## 4. Pułapka: Spacje w Nazwach Plików

Karina ma folder na Macu:

```
/Users/Karina/Moje Dokumenty/Projekt
```

Próbuje ręcznie:

```bash
cd /Users/Karina/Moje Dokumenty/Projekt
```

Błąd:
```
cd: no such file or directory: /Users/Karina/Moje
```

— Co się stało? — dziwi się Karina.

Paweł tłumaczy:

— Bash traktuje spację jako separator argumentów. Dla niego to wygląda tak:

```bash
cd /Users/Karina/Moje Dokumenty/Projekt
   ^komenda  ^arg1      ^arg2    ^arg3
```

Próbuje wykonać `cd /Users/Karina/Moje` i nie może znaleźć tego katalogu.

### Rozwiązanie: Cytowanie

**Opcja 1: Cudzysłowy**
```bash
cd "/Users/Karina/Moje Dokumenty/Projekt"
```

**Opcja 2: Backslash**
```bash
cd /Users/Karina/Moje\ Dokumenty/Projekt
```

**Opcja 3: Tab completion** (w terminalu)
- Zacznij pisać `cd /Users/Kar...`
- Naciśnij `Tab`
- Terminal automatycznie doda backslashe

### Claude robi to automatycznie

```
> Go to "Moje Dokumenty/Projekt" folder
```

Claude wykona:
```bash
cd "/Users/Karina/Moje Dokumenty/Projekt"
```

Zawsze z cudzysłowami. Nie musisz się o to martwić.

| ❌ Źle | ✅ Dobrze |
|--------|----------|
| `cd /Users/Jan Kowalski/Projekty` | `cd "/Users/Jan Kowalski/Projekty"` |
| `python script test.py` | `python "script test.py"` |
| `mv old name.txt new name.txt` | `mv "old name.txt" "new name.txt"` |

## 5. Łączenie Komend: Operatory `&&`, `;`, `||`

Paweł rysuje szybki diagram na kartce:

```
Komenda1 && Komenda2   → Wykonaj 2, TYLKO jeśli 1 się powiodła
Komenda1 ; Komenda2    → Wykonaj 2, niezależnie od wyniku 1
Komenda1 || Komenda2   → Wykonaj 2, TYLKO jeśli 1 zawiodła
```

### Operator `&&` – Sekwencja Warunkowa

**Zasada:** Następna komenda wykonuje się **tylko** jeśli poprzednia się powiodła (exit code 0).

```bash
npm install && npm test && npm run build
```

- Jeśli `npm install` zawiedzie → **STOP** (nie ma testu ani build)
- Jeśli install OK, ale test fail → **STOP** (nie ma build)
- Jeśli wszystko OK → wykonuje się cała sekwencja

**Kiedy używać:**
- Instalacja → build → deploy
- Testy → commit → push
- Backup → cleanup
- Download → extract → install

### Operator `;` – Sekwencja Bezwarunkowa

**Zasada:** Następna komenda wykonuje się **zawsze**, niezależnie od wyniku poprzedniej.

```bash
echo "Start" ; npm test ; echo "Koniec"
```

Zobaczysz "Koniec" nawet jeśli testy padły.

**Kiedy używać:**
- Logging (chcesz zawsze zobaczyć komunikat)
- Cleanup (zawsze posprzątaj, nawet jeśli coś poszło nie tak)
- Niezależne operacje

### Operator `||` – Alternatywa (Fallback)

**Zasada:** Następna komenda wykonuje się **tylko** jeśli poprzednia zawiodła.

```bash
npm start || echo "❌ Failed to start server"
```

**Kiedy używać:**
- Error handling
- Fallback commands
- Diagnostyka

```bash
curl https://api.example.com || echo "API is down, check logs"
```

### Przykład złożony: CI/CD Pipeline

```
> Run full CI pipeline: lint, test, build, deploy
```

Claude może wykonać:

```bash
npm run lint && \
npm test && \
npm run build && \
echo "✓ Build successful" && \
npm run deploy || echo "❌ Deployment failed"
```

**Co się dzieje:**
1. Lint → jeśli fail, **STOP**
2. Test → jeśli fail, **STOP**
3. Build → jeśli fail, **STOP**
4. Echo success → zawsze (dla logów)
5. Deploy → jeśli fail, pokaż error message

## 6. Równoległe Wykonywanie Komend

Claude potrafi wysłać kilka niezależnych komend **jednocześnie**.

```
> Check git status, show recent commits, and display unstaged changes
```

Claude wywoła **równolegle** (w jednym bloku tool calls):
```bash
git status
git log -5 --oneline
git diff
```

Wszystkie trzy wykonują się jednocześnie. Zamiast czekać:
- git status (1s)
- git log (1s)
- git diff (1s)
**= 3 sekundy**

Czekasz raz: **~1 sekunda** (wszystko równolegle).

**Zasada:** Jeśli komendy są **niezależne** i nie ma między nimi zależności, Claude je zrównolegla.

## 7. Praktyczne Przykłady Automatyzacji

### Przykład 1: Automatyzacja Backupów

Mała firma robi backupy ręcznie. Claude może to zautomatyzować.

```
> Create backup of /data/invoices with today's date
```

Claude wykona:

```bash
tar -czf "/backups/invoices-$(date +%Y-%m-%d).tar.gz" /data/invoices && \
echo "✓ Backup created: $(du -h /backups/invoices-$(date +%Y-%m-%d).tar.gz | cut -f1)"
```

**Co się dzieje:**
- `tar -czf` – stwórz skompresowany archiwum
- `$(date +%Y-%m-%d)` – wstaw dzisiejszą datę (np. `2025-02-15`)
- `&&` – pokaż komunikat tylko jeśli backup się powiódł
- `du -h` – pokaż rozmiar pliku

**Wynik:**
```
✓ Backup created: 2.4GB
```

### Przykład 2: Generowanie Raportów Sprzedażowych

Firma ma plik CSV z transakcjami.

```
> Generate sales summary from sales.csv for January 2025
```

Claude może użyć `awk` (narzędzie do przetwarzania tekstu):

```bash
awk -F',' 'BEGIN{sum=0; count=0} /2025-01/ {sum+=$3; count++} END{print "Total: $" sum " | Orders: " count}' sales.csv
```

Albo Pythona (jeśli jest zainstalowany):

```bash
python <<'EOF'
import pandas as pd
df = pd.read_csv('sales.csv')
df['date'] = pd.to_datetime(df['date'])
jan = df[df['date'].dt.month == 1]
print(f'Total: ${jan["amount"].sum():.2f}')
print(f'Orders: {len(jan)}')
EOF
```

Claude wybiera narzędzie w zależności od kontekstu.

### Przykład 3: Przetwarzanie Wsadowe Plików

Firma dostała 500 faktur w PDF do zmiany nazwy.

```
> Rename all PDFs in /invoices from "Invoice_123.pdf" to "2025-01-123.pdf"
```

Claude wykona pętlę:

```bash
cd /invoices && \
for file in Invoice_*.pdf; do
  number=$(echo "$file" | sed 's/Invoice_\([0-9]*\)\.pdf/\1/')
  mv "$file" "2025-01-$number.pdf"
done && \
echo "✓ Renamed $(ls 2025-01-*.pdf | wc -l) files"
```

Nie musisz znać `sed` ani składni pętli `for`. Opisujesz cel, Claude pisze kod.

### Przykład 4: Monitoring Serwera

```
> Check server health: CPU, memory, disk space
```

Claude wykona (przykład dla Linuxa):

```bash
echo "=== CPU ===" && top -bn1 | grep "Cpu(s)" && \
echo "=== Memory ===" && free -h && \
echo "=== Disk ===" && df -h
```

**Output:**
```
=== CPU ===
Cpu(s): 12.5%us, 3.2%sy, 84.1%id
=== Memory ===
              total        used        free
Mem:           16Gi        8.2Gi       7.8Gi
=== Disk ===
Filesystem      Size  Used Avail Use%
/dev/sda1       100G   45G   55G  45%
```

Przegląd stanu serwera.

**Uwaga:** Komendy `top` i `free` mają różne składnie na różnych systemach (Linux vs macOS). Claude automatycznie dostosowuje komendy do Twojego systemu operacyjnego.

### Przykład 5: Organizacja Mediów Kampanii (Marketing)

Agencja marketingowa ma 50 kampanii, każda z setkami obrazków rozrzuconych po różnych folderach.

```
> Organize all campaign images by month into separate folders
```

Claude wykona:

```bash
find campaigns/ \( -name "*.jpg" -o -name "*.png" \) -type f -print0 | \
while IFS= read -r -d '' img; do
  if [[ "$(uname)" == "Darwin" ]]; then
    month=$(date -r "$img" "+%Y-%m")
  else
    month=$(date -d "@$(stat -c %Y "$img")" "+%Y-%m")
  fi
  mkdir -p "organized/$month"
  cp "$img" "organized/$month/"
done && \
echo "✓ Organized $(find organized/ -type f | wc -l) images by month"
```

**Wynik:**
```
✓ Organized 1,247 images by month
```

### Przykład 6: Raport Postępów Projektu (Project Manager)

PM potrzebuje cotygodniowego raportu z pliku `tasks.csv`.

```
> Generate weekly report: count completed tasks by team member from last 7 days
```

Claude wykona:

```bash
since="$(python3 - <<'PY'
from datetime import date, timedelta
print((date.today() - timedelta(days=7)).isoformat())
PY
)" && \
awk -F',' -v date="$since" \
'$4=="completed" && $5 >= date {count[$2]++}
END {print "Weekly Report:"; for (person in count) print "  " person": " count[person] " tasks"}' tasks.csv
```

**Wynik:**
```
Weekly Report:
  Anna: 12 tasks
  Marek: 8 tasks
  Kasia: 15 tasks
```

### Przykład 7: Statystyki Draftu Książki (Pisarz)

Pisarz ma 20 rozdziałów w plikach markdown i chce wiedzieć ile napisał.

```
> Count words in all draft chapters and show total with breakdown by chapter
```

Claude wykona:

```bash
echo "Chapter Word Count:" && \
total=0 && \
while IFS= read -r -d '' file; do \
  words=$(wc -w < "$file"); \
  total=$((total + words)); \
  echo "  $(basename "$file"): $words words"; \
done < <(find book/chapters -name "*.md" -type f -print0) && \
echo "---" && \
echo "Total: $total words"
```

**Wynik:**
```
Chapter Word Count:
  chapter-01.md: 3,245 words
  chapter-02.md: 2,890 words
  chapter-03.md: 3,120 words
  ...
---
Total: 58,430 words
```

### Przykład 8: Ekstrakcja Kontaktów z CV (HR)

Rekruter ma folder z 200 CV w PDF i chce wyciągnąć wszystkie adresy email.

```
> Extract all email addresses from CVs folder and save to contacts.txt
```

Claude wykona:

```bash
# Wymaga narzędzia pdftotext (np. pakiet poppler / poppler-utils)
find CVs/ -name "*.pdf" -exec pdftotext {} - \; | \
grep -Eo '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}' | \
sort -u > contacts.txt && \
echo "✓ Extracted $(wc -l < contacts.txt) unique email addresses"
```

**Wynik:**
```
✓ Extracted 187 unique email addresses
```

Claude Code nie jest tylko dla programistów. Marketing, PM, pisarze, HR - każdy kto pracuje z plikami i danymi może zaoszczędzić godziny dzięki automatyzacji terminala.

## 8. Bezpieczeństwo: Co Claude może, a czego nie

### ✅ Zwykle bez pytania (w trybie auto-allow sandbox)

- Operacje bez modyfikacji plików: Read / Glob / Grep (czytanie i wyszukiwanie)
- Podgląd repo (read-only): `git status`, `git diff`, `git log`

### ⚠️ Operacje wymagające potwierdzenia

- Modyfikacje plików: Edit / Write
- Komendy systemowe: Bash (w tym `npm install`, `pip install`, `npm test`, `git commit`, `git pull`)
- Usuwanie: `rm -rf foldername`
- Modyfikacje systemowe: `sudo apt install`
- Push do remote: `git push`
- Destructive git: `git reset --hard`, `git clean -f`
- Force operations: `git push --force`

Claude **zapyta** przed wykonaniem tych komend.

### 🚫 Operacje których Claude NIE wykona

- `rm -rf /` (niszczenie systemu)
- Operacje na plikach systemowych `/etc`, `/sys`
- Force push do `main`/`master` (chyba że explicitnie poprosisz)
- Obchodzenie sandboxu bez zgody

## 8.5. Sandbox Mode – Bezpieczeństwo na Poziomie Systemu

Paweł otwiera nowe okno terminala.

— Jest jeszcze jedna rzecz, o której powinieneś wiedzieć — mówi. — Sandbox.

Karina unosi brew.

— Sandbox? Jak... piaskownica?

— Dokładnie. Od wersji 2.1.x Claude Code domyślnie uruchamia bash commands w **sandboxie** – izolowanym środowisku z ograniczeniami. To jak piaskownica dla dziecka: może się bawić, ale nie może wyjść poza ogrodzenie.

### Jak działa Sandbox?

**Izolacja filesystem:**
- **Odczyt:** Claude może czytać większość plików w systemie
- **Zapis:** Claude może pisać **tylko** w working directory (tam gdzie pracujesz) i podkatalogach
- **Blokada:** Pliki systemowe (`~/.bashrc`, `/bin/`, `/etc/`) są zablokowane

**Izolacja sieciowa:**
- Claude może łączyć się tylko z zatwierdzonymi domenami
- Przy próbie połączenia z nową domeną, zapyta Cię o zgodę
- Blokada exfiltracji danych - nie może wysłać Twoich plików na nieznane serwery

**Włączenie sandboxu:**

Sandbox jest **domyślnie włączony**, ale możesz go kontrolować przez:

```
> /sandbox
```

**Tryby:**
- **Auto-allow mode**: Komendy w sandboxie wykonują się automatycznie (zalecane)
- **Regular permissions mode**: Każda komenda wymaga zgody, nawet w sandboxie

**Technologia:**
- **macOS:** Seatbelt (wbudowany w system)
- **Linux/WSL2:** bubblewrap (wymaga instalacji: `sudo apt-get install bubblewrap socat`)

### Kiedy Sandbox Przeszkadza: Escape Hatch

Karina pyta:

— A co jeśli potrzebuję zrobić coś, co sandbox blokuje?

— Dobra uwaga — odpowiada Paweł. — Niektóre narzędzia nie działają w sandboxie, np. `docker` czy `watchman`. Claude może:

1. Wykryć niepowodzenie komendy przez sandbox
2. Zapytać Cię o zgodę na uruchomienie poza sandboxem
3. Wykonać komendę z normalnymi uprawnieniami (jeśli wyrazisz zgodę)

To się nazywa **escape hatch** - "wyjście awaryjne".

**Wyłączenie escape hatch** (jeśli chcesz maksymalnego bezpieczeństwa):

```json
// settings.json
{
  "sandbox": {
    "allowUnsandboxedCommands": false
  }
}
```

**Wyjątki trwałe** (dla zaufanych narzędzi):

```json
{
  "sandbox": {
    "excludedCommands": ["docker", "watchman"]
  }
}
```

### Dlaczego to ważne?

Paweł patrzy poważnie na Karinę.

— Wyobraź sobie, że ktoś zhackuje Claude przez prompt injection - wstrzyknie złośliwą komendę w prompt. Bez sandboxu, mógłby usunąć Twoje pliki, wysłać dane na zewnątrz, zainstalować malware.

— Z sandboxem? — pyta Karina.

— Z sandboxem: może tylko czytać pliki i pisać w folderze projektu. Nie może dotknąć systemu. To jak dawanie Claude'owi "ograniczonego zaufania" zamiast pełnych kluczy do systemu.

Sandbox to nie przeszkoda - to warstwa bezpieczeństwa, która pozwala Ci ufać Claude'owi bardziej, bo wiesz, że nawet jeśli coś pójdzie nie tak, szkody będą minimalne.

## 9. Pro-tipy

### Tip 1: Dry-run przed destrukcyjnymi operacjami

```
> Show me what files would be deleted from /temp older than 30 days (DON'T delete yet)
```

Claude wykona:
```bash
find /temp -type f -mtime +30 -print
```

Sprawdzasz wynik. Potem:

```
> OK, delete them now
```

Teraz Claude:
```bash
find /temp -type f -mtime +30 -delete
```

### Tip 2: Verbose mode dla diagnostyki

```
> Install package-name with detailed output
```

Claude doda `--verbose`:
```bash
npm install package-name --verbose
```

### Tip 3: Sprawdzanie exit codes

```
> Run tests and tell me if they passed
```

Claude wykona:
```bash
npm test && echo "✅ Tests passed" || echo "❌ Tests failed"
```

### Tip 4: Co Claude robi za kulisami (żebyś nie musiał)

Paweł pokazuje Karinie kod, który Claude wygenerował:

— Widzisz te wszystkie cudzysłowy, `&&`, sprawdzenia błędów? — pyta. — Gdybyś pisał skrypt Bash ręcznie, powinieneś znać best practices z 2025:

**Production-grade Bash wymaga:**
- ✅ Używać `set -o errexit` (zatrzymaj się gdy coś pójdzie nie tak)
- ✅ Cytować wszystkie zmienne: `"${var}"` nie `$var`
- ✅ Używać `[[ ]]` zamiast `[ ]` dla warunków
- ✅ Sprawdzać exit codes przed destrukcyjnymi operacjami
- ✅ Pisać kod dla ludzi, nie komputerów

**Claude robi to wszystko automatycznie.** Gdy wykonujesz komendę przez Claude, nie dostajesz "quick & dirty" hacka - dostajesz poprawnie napisany, bezpieczny skrypt który trzyma się production-grade standards.

— To tak jakby mieć senior DevOps engineera piszącego każdą Twoją komendę — podsumowuje Paweł.

## 10. Typowe Błędy i Jak ich Unikać

| Problem | Objaw | Co robi Claude |
|---------|-------|----------------|
| **Timeout** | `Command timed out after 30s` (default) | Ustawia dłuższy timeout lub używa `run_in_background: true` |
| **Spacje w ścieżkach** | `No such file or directory` | Automatycznie cytuje ścieżki |
| **Złe uprawnienia** | `Permission denied` | Pyta o zgodę na `sudo` |
| **Proces blokuje terminal** | Terminal zamiera | Uruchamia w tle z `&` |
| **Destructive command** | Ryzyko utraty danych | Pyta o potwierdzenie |

## Podsumowanie

Paweł patrzy na Karinę.

— Wiesz co jest najlepsze w tym wszystkim?

Karina zastanawia się.

— Że nie muszę znać składni?

— Dokładnie. Claude to nie chatbot, który Ci podpowiada komendy. To **operator**, który je **wykonuje**. Ty mówisz "co", a Claude robi "jak".

**Najważniejsze rzeczy do zapamiętania:**

1. **Terminal to interfejs tekstowy** do rozmawiania z systemem operacyjnym
2. **Bash to język** tego interfejsu (podobnie jak zsh)
3. **Claude ma narzędzie Bash** – może wykonywać komendy za Ciebie
4. **Background execution** – długie procesy nie blokują pracy
5. **Automatyczne cytowanie** – spacje w nazwach plików nie są problemem
6. **Operatory: `&&` (warunek), `;` (zawsze), `||` (fallback)**
7. **Równoległość** – niezależne komendy wykonują się jednocześnie
8. **Bezpieczeństwo** – destrukcyjne operacje wymagają zgody

Opisujesz cel ("uruchom testy"), Claude wybiera i wykonuje komendy. Nie musisz znać składni `npm`, `pytest`, `find`, `grep`, `awk`, `sed` – wystarczy że wiesz czego chcesz.

## Słowniczek

**Terminal** – Okno/aplikacja, w którym wpisujesz komendy tekstowe. Na Macu: Terminal.app lub iTerm2. Na Windows: PowerShell, CMD, Windows Terminal. Na Linuxie: GNOME Terminal, Konsole, itd.

**Shell** – Program interpretujący komendy wpisane w terminalu. Czyta, wykonuje, zwraca wynik. Najpopularniejsze: Bash, Zsh, Fish.

**Bash** – "Bourne Again Shell", jeden z najpopularniejszych shelli. Domyślny na większości systemów Linux i starszych wersjach macOS.

**Komenda (Command)** – Instrukcja dla systemu operacyjnego, np. `ls`, `cd`, `npm test`.

**Argument** – Wartość przekazana do komendy, np. w `cd /Users/Karina`, argumentem jest `/Users/Karina`.

**Flaga/Opcja** – Modyfikator zmieniający zachowanie komendy, np. `-l`, `--verbose`, `--help`.

**Exit code** – Kod zwracany przez komendę po zakończeniu. `0` = sukces, wartości > 0 = błąd. Używane przez operatory `&&` i `||`.

**Ścieżka absolutna** – Pełna ścieżka od roota systemu, np. `/Users/Karina/Projects/app.js`. Zawsze zaczyna się od `/` (Linux/Mac) lub `C:\` (Windows).

**Ścieżka relatywna** – Ścieżka względem bieżącego katalogu, np. `./src/index.js` lub po prostu `src/index.js`.

**Working directory** – Katalog, w którym aktualnie "jesteś" w terminalu. Sprawdzisz przez `pwd` (print working directory).

**Timeout** – Limit czasu na wykonanie komendy. W standardowej konfiguracji Claude Code dla narzędzia Bash: domyślnie 30 sekund (`BASH_DEFAULT_TIMEOUT_MS = 30000`), maksymalnie 10 minut (`BASH_MAX_TIMEOUT_MS = 600000`).

**Background execution** – Uruchomienie procesu w tle, tak by nie blokował terminala. W Bash: dodanie `&` na końcu komendy.

**ShellId** – Unikalny identyfikator procesu uruchomionego w tle. Claude Code używa go do sprawdzania logów lub zatrzymywania procesu.

**Operator `&&`** – Operator logiczny AND. `A && B` wykonuje B tylko jeśli A się powiodło.

**Operator `;`** – Separator komend. `A ; B` wykonuje B niezależnie od wyniku A.

**Operator `||`** – Operator logiczny OR. `A || B` wykonuje B tylko jeśli A zawiodło (fallback).

**Pipe `|`** – Operator przekazujący output jednej komendy jako input do drugiej, np. `cat file.txt | grep "error"`.

**Stdout/Stderr** – Standardowe wyjście (stdout) dla normalnych komunikatów, standardowe wyjście błędów (stderr) dla błędów.

**Grep** – Narzędzie do wyszukiwania wzorców tekstowych. `grep "TODO" *.js` znajdzie wszystkie wystąpienia "TODO" w plikach JS.

**AWK** – Język/narzędzie do przetwarzania tekstu, szczególnie CSV i tabel. Potężne ale skomplikowane – dobrze że Claude to zna.

**Sed** – "Stream editor", narzędzie do zamiany/modyfikacji tekstu. `sed 's/old/new/g'` zamienia "old" na "new".

**Tar** – Narzędzie do tworzenia archiwów (pakowania plików). `tar -czf archive.tar.gz folder/` tworzy skompresowany archiwum.

**Sandbox** – Izolowane środowisko z ograniczonymi uprawnieniami na poziomie systemu operacyjnego. Claude Code domyślnie uruchamia bash commands w sandboxie dla bezpieczeństwa. Sandbox pozwala Claude na czytanie większości plików, ale zapis tylko w working directory. Nawet jeśli Claude zostanie zhackowany (np. prompt injection), sandbox ogranicza potencjalne szkody. Włącz przez `/sandbox`.

**Escape hatch** – Mechanizm pozwalający Claude'owi uruchomić komendę poza sandboxem, gdy sandbox blokuje jej działanie (np. Docker). Wymaga zgody użytkownika.

**Sudo** – "Superuser do", komenda do wykonywania operacji z prawami administratora. Wymaga hasła.

## Co dalej?

Paweł zamyka terminal.

— Teraz wiesz jak działa Bash i jak Claude go używa. Ale to dopiero pierwszy krok. Claude ma więcej narzędzi: może czytać pliki, szukać w kodzie, edytować wielokrotnie. W następnych lekcjach zobaczymy jak to wszystko ze sobą gra.

Karina kiwa głową i patrzy na terminal z nowym szacunkiem.

— Okej, myślałam że terminal to czarna magia dla programistów. Okazuje się, że to po prostu... inny sposób rozmawiania z komputerem. I Claude mówi tym językiem płynnie.

— Dokładnie. A ty? Ty po prostu mówisz po ludzku.

**Twój action item:** Następnym razem gdy złapiesz się na powtarzaniu tego samego kliknięcia 10 razy, pomyśl: "Claude, czy możesz to zautomatyzować?" Odpowiedź prawie zawsze brzmi: tak.

---

## Dokumentacja

1. **Bash Guide for Beginners**: https://tldp.org/LDP/Bash-Beginners-Guide/html/
2. **Explain Shell** (wklej komendę, dostaniesz wyjaśnienie): https://explainshell.com/
3. **Claude Code Bash Documentation**: https://code.claude.com/docs/en/tools/bash
4. **Claude Code Sandboxing**: https://code.claude.com/docs/en/sandboxing
5. **The Art of Command Line** (must-read): https://github.com/jlevy/the-art-of-command-line
6. **ShellCheck** (linter dla Bash): https://www.shellcheck.net/
