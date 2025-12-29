# Mail #03: Bash - Claude jako Twój Operator Terminala

---

## Przypomnienie z poprzedniej lekcji

W poprzednim mailu poznaliśmy narzędzia **Edit** i **NotebookEdit** - precyzyjne instrumenty do modyfikacji plików. Edit pozwala na chirurgiczną zamianę fragmentów kodu (exact string replacement), podczas gdy NotebookEdit obsługuje specyficzną strukturę notebooków Jupyter (.ipynb). Nauczyliśmy się, że Edit wymaga dokładnego dopasowania `old_string` do `new_string`, zachowując przy tym formatowanie i wcięcia.

Kluczowa zasada: Claude **musi** najpierw przeczytać plik narzędziem Read, zanim będzie mógł go edytować. To zabezpieczenie przed przypadkowym nadpisaniem ważnych danych.

---

## Sprawdź swoją wiedzę

1. **Dlaczego narzędzie Edit wymaga wcześniejszego użycia Read?**
   <details>
   <summary>Odpowiedź</summary>
   Aby upewnić się, że Claude zna aktualną zawartość pliku i nie nadpisze czegoś ważnego. To zasada bezpieczeństwa - Claude nie może edytować plików "na ślepo".
   </details>

2. **Kiedy użyjesz parametru `replace_all: true` w narzędziu Edit?**
   <details>
   <summary>Odpowiedź</summary>
   Gdy chcesz zamienić WSZYSTKIE wystąpienia danego ciągu znaków w pliku, np. przy zmianie nazwy zmiennej lub funkcji, która pojawia się w wielu miejscach.
   </details>

---

## TLDR

Narzędzie **Bash** to terminal agent Claude - pozwala mu wykonywać komendy systemowe tak, jakby siedział przed Twoim komputerem. Claude potrafi instalować pakiety, uruchamiać testy, zarządzać git, generować raporty i wszystko, co da się zrobić w wierszu poleceń. Dzisiaj nauczysz się, jak Claude obsługuje timeout i wykonywanie w tle (background), jak radzi sobie ze ścieżkami ze spacjami, oraz jak łączy komendy w sekwencje. To narzędzie zamienia Claude w autonomicznego operatora Twojego terminala.

---

## Mem z Twittera

**"Programiści przez 90% czasu:"**

> "Hmm, czy to był `&&` czy `||`? A może `;`? *googles for 47th time*"

[Typowy workflow każdego developera](https://twitter.com/ThePracticalDev/status/1234567890)

Dokładnie dlatego Claude jest tak pomocny - on wie, którego operatora użyć i dlaczego. Nie musisz już google'ować podstaw basha po raz setny! 😄

---

## Treść lekcji

### Bash - Claude jako operator terminala

Narzędzie **Bash** to serce autonomiczności Claude Code. Dzięki niemu Claude nie tylko "podpowiada" komendy - on je **wykonuje**. To tak jakbyś miał doświadczonego administratora systemu, który:
- Rozumie kontekst Twojego projektu
- Zna najlepsze praktyki (bezpieczne komendy, odpowiednie flagi)
- Nigdy nie zapomina cytować ścieżek ze spacjami
- Potrafi łączyć komendy w inteligentne sekwencje

**Kluczowa różnica:** Ty mówisz "uruchom testy dla modułu autoryzacji", a Claude sam tłumaczy to na `npm test src/auth` lub `pytest tests/auth/` - w zależności od tego, co wykryje w projekcie.

---

### Podstawowe komendy systemowe

Bash to uniwersalny język terminala. Claude używa go do wszystkiego, co wymaga interakcji z systemem operacyjnym.

#### Przykład 1: Uruchamianie testów

Zamiast ręcznie szukać w `package.json` jaką komendę trzeba użyć:

```
> Run tests for the auth module
```

Claude wykona:
```bash
npm test src/auth
```

Lub jeśli wykryje Pythona:
```bash
pytest tests/auth/ -v
```

**Claude automatycznie:**
- Wykrywa język projektu (Node.js, Python, Ruby...)
- Znajduje odpowiedni runner testów (npm, pytest, rspec...)
- Dodaje właściwe flagi (np. `-v` dla verbose output)

---

#### Przykład 2: Zarządzanie zależnościami

```
> Update project dependencies and fix any conflicts
```

Claude może wykonać sekwencję:
```bash
npm outdated                    # Sprawdź co jest przestarzałe
npm update                      # Zaktualizuj zgodnie z package.json
npm audit fix                   # Napraw luki bezpieczeństwa
npm test                        # Upewnij się, że nic się nie zepsuło
```

**Magia:** Nie musisz pamiętać kolejności - Claude wie, że najpierw trzeba zaktualizować, potem naprawić audit, a na koniec przetestować.

---

#### Przykład 3: Analiza logów

W małej firmie często potrzebujesz szybko wyciągnąć informacje z logów serwera:

```
> Find all 500 errors in server.log from last 24 hours
```

Claude wykona:
```bash
grep "500" server.log | grep "$(date -d '24 hours ago' '+%Y-%m-%d')" | wc -l
```

Albo w bardziej czytelnej formie:
```bash
awk '/500/ && $1 >= "'$(date -d '24 hours ago' '+%Y-%m-%d')'" {print}' server.log | wc -l
```

**Dlaczego to wartościowe:** Nie musisz znać składni `grep`, `awk` czy `date` - wystarczy opisać co chcesz osiągnąć.

---

### Timeout i background execution

Tu zaczyna się magia - Claude potrafi uruchamiać długotrwałe procesy w tle.

#### Problem: Blokujące procesy

Niektóre komendy "blokują" terminal - np. serwer deweloperski:

```bash
npm run dev
# Terminal jest zablokowany, nie możesz nic więcej zrobić
```

#### Rozwiązanie: `run_in_background: true`

Claude używa wewnętrznego parametru `run_in_background: true` dla takich operacji:

```
> Start development server
```

Claude wykona:
```bash
npm run dev &
# Zwróci shellId: "abc123"
```

**Co się dzieje:**
1. Serwer startuje w tle (nie blokuje terminala)
2. Claude dostaje `shellId` - unikalny identyfikator procesu
3. Możesz później sprawdzić logi: `> Check logs for dev server`
4. Claude użyje narzędzia `BashOutput` z `shellId: "abc123"`

---

#### Przykład praktyczny: CI/CD pipeline lokalnie

```
> Run full CI pipeline locally: lint, test, build
```

Claude wykona:
```bash
npm run lint && npm test && npm run build
```

Jeśli którykolwiek krok zawiedzie, kolejne się nie wykonają (dzięki `&&`).

**Timeout:** Domyślnie Claude czeka max 3 minuty (180s) na zakończenie komendy. Dla długich procesów używa background execution.

---

### Cytowanie ścieżek ze spacjami

To pułapka, w którą wpadają wszyscy - zwłaszcza na macOS i Windows.

#### Problem: Spacje w nazwach katalogów

```bash
cd /Users/Jan Kowalski/Projekt
# Bash zinterpretuje to jako: cd /Users/Jan + Kowalski/Projekt
# BŁĄD: "No such file or directory"
```

#### Rozwiązanie: Cytowanie

Claude **zawsze** cytuje ścieżki:

```bash
cd "/Users/Jan Kowalski/Projekt"
# Działa! Bash traktuje całość jako jedną ścieżkę
```

**Przykłady z prawdziwego świata:**

| ❌ Nieprawidłowe | ✅ Prawidłowe |
|-----------------|--------------|
| `cd /Users/Daniel/My Documents` | `cd "/Users/Daniel/My Documents"` |
| `python /path/with spaces/script.py` | `python "/path/with spaces/script.py"` |
| `mv file.txt /Shared Drive/backup/` | `mv file.txt "/Shared Drive/backup/"` |

**Claude robi to automatycznie** - nie musisz się o to martwić. Ale jeśli piszesz własne skrypty, pamiętaj o tym!

---

#### Edge case: Spacje w nazwach plików

```
> Rename "old name.txt" to "new name.txt"
```

Claude wykona:
```bash
mv "old name.txt" "new name.txt"
```

Bez cudzysłowów bash potraktowałby to jako 4 osobne argumenty!

---

### Sekwencyjne vs równoległe komendy

Bash pozwala łączyć komendy w różny sposób - Claude wybiera odpowiednią metodę w zależności od kontekstu.

#### Operator `&&` - sekwencja z warunkiem

**Zasada:** Wykonaj następną komendę **tylko jeśli** poprzednia się powiodła (exit code 0).

```bash
npm install && npm run build
```

- Jeśli `npm install` zawiedzie → `npm run build` się NIE wykona
- Jeśli `npm install` powiedzie się → `npm run build` się wykona

**Kiedy Claude używa `&&`:**
- Instalacja + build
- Testy + deploy
- Backup + cleanup
- Git add + commit + push

---

#### Operator `;` - sekwencja bezwarunkowa

**Zasada:** Wykonaj następną komendę **niezależnie** od wyniku poprzedniej.

```bash
echo "Start" ; npm test ; echo "Done"
```

Komunikat "Done" pojawi się nawet jeśli testy padną.

**Kiedy Claude używa `;`:**
- Logging + operacja + logging
- Cleanup (nawet jeśli coś poszło nie tak)
- Niezależne operacje

---

#### Operator `||` - alternatywa

**Zasada:** Wykonaj następną komendę **tylko jeśli** poprzednia się nie powiodła.

```bash
npm start || echo "Failed to start server"
```

**Kiedy Claude używa `||`:**
- Fallback commands
- Error handling
- Diagnostyka

---

#### Równoległe wykonywanie

Claude potrafi wysłać wiele niezależnych komend w jednym bloku tool calls:

```
> Check git status, see recent commits, and show unstaged changes
```

Claude wywoła **równolegle**:
```bash
git status
git log -5 --oneline
git diff
```

Wszystkie trzy komendy wykonają się jednocześnie (jeśli są niezależne).

**Korzyść:** Oszczędność czasu - zamiast czekać 3x sekwencyjnie, czekasz raz.

---

### Przykłady biznesowe: Automatyzacja w małej firmie

#### Przykład 1: Automatyzacja backupów

Małe firmy często robią backupy ręcznie - Claude może to zautomatyzować:

```
> Create backup of /data/invoices to /backups with today's date
```

Claude wykona:
```bash
tar -czf "/backups/invoices-$(date +%Y-%m-%d).tar.gz" /data/invoices
```

**Dodatkowa inteligencja:**
```bash
# Claude może dodać sprawdzenie, czy backup się powiódł
tar -czf "/backups/invoices-$(date +%Y-%m-%d).tar.gz" /data/invoices && \
echo "Backup successful: $(du -h /backups/invoices-$(date +%Y-%m-%d).tar.gz)" || \
echo "ERROR: Backup failed!"
```

---

#### Przykład 2: Generowanie raportów sprzedażowych

```
> Generate sales report from sales.csv for last month
```

Claude wykona:
```bash
awk -F',' 'BEGIN{sum=0} NR>1 {sum+=$3} END{print "Total sales: $"sum}' sales.csv
```

Albo użyje Pythona dla bardziej zaawansowanej analizy:
```bash
python -c "
import pandas as pd
df = pd.read_csv('sales.csv')
df['date'] = pd.to_datetime(df['date'])
last_month = df[df['date'] >= pd.Timestamp.now() - pd.DateOffset(months=1)]
print(f'Total: ${last_month[\"amount\"].sum():.2f}')
print(f'Orders: {len(last_month)}')
"
```

**Magia:** Nie musisz znać ani AWK, ani Pandas - Claude wybiera najlepsze narzędzie.

---

#### Przykład 3: Przetwarzanie wsadowe plików

Firma otrzymała 500 faktur w PDF do zmiany nazw według schematu:

```
> Rename all PDFs in /invoices from "Invoice_123.pdf" to "2024-01-123.pdf"
```

Claude wykona:
```bash
cd /invoices
for file in Invoice_*.pdf; do
  number=$(echo "$file" | sed 's/Invoice_\([0-9]*\)\.pdf/\1/')
  mv "$file" "2024-01-$number.pdf"
done
```

---

#### Przykład 4: Monitoring serwera

```
> Check server health: CPU usage, memory, disk space
```

Claude wykona:
```bash
echo "=== CPU ===" && top -bn1 | grep "Cpu(s)" && \
echo "=== Memory ===" && free -h && \
echo "=== Disk ===" && df -h
```

**Output:**
```
=== CPU ===
Cpu(s): 12.5%us, 3.2%sy, 0.0%ni, 84.1%id
=== Memory ===
              total        used        free
Mem:           16Gi        8.2Gi       7.8Gi
=== Disk ===
Filesystem      Size  Used Avail Use%
/dev/sda1       100G   45G   55G  45%
```

---

### Pro-tipy dla zaawansowanych

#### Tip 1: Dry-run przed destrukcyjnymi operacjami

```
> Show me what files would be deleted from /temp older than 30 days (don't delete yet)
```

Claude wykona:
```bash
find /temp -type f -mtime +30 -print
# Używa -print zamiast -delete
```

Sprawdzasz output, a potem:
```
> Ok, delete them
```

Claude dopiero teraz:
```bash
find /temp -type f -mtime +30 -delete
```

---

#### Tip 2: Verbose mode dla diagnostyki

```
> Install package with verbose output
```

Claude wykona:
```bash
npm install package-name --verbose
# Lub
pip install package-name -vvv
```

---

#### Tip 3: Sprawdzanie exit codes

```
> Run tests and tell me if they passed
```

Claude wykona:
```bash
npm test && echo "✓ Tests passed" || echo "✗ Tests failed"
```

---

### Typowe błędy i jak ich unikać

| Problem | Objaw | Rozwiązanie |
|---------|-------|-------------|
| **Timeout** | `Command timed out after 180s` | Claude użyje `run_in_background: true` dla długich procesów |
| **Spacje w ścieżkach** | `No such file or directory` | Claude automatycznie cytuje ścieżki |
| **Złe uprawnienia** | `Permission denied` | Claude użyje `sudo` jeśli wykryje potrzebę (po Twojej zgodzie) |
| **Złe quote** | `Unmatched "` | Claude używa heredoc dla złożonych stringów |
| **Background nie działa** | Proces blokuje terminal | Użyj `/kill` lub `Ctrl+C` i poproś Claude żeby użył `&` |

---

### Bezpieczeństwo: Co Claude może, a czego nie

#### ✅ Bezpieczne operacje (Claude wykona automatycznie):
- Czytanie plików (`cat`, `less`, `head`)
- Analiza logów (`grep`, `awk`, `sed`)
- Instalacja pakietów (`npm install`, `pip install`)
- Git operations (`git status`, `git commit`)
- Testy (`npm test`, `pytest`)

#### ⚠️ Operacje wymagające potwierdzenia:
- Usuwanie plików (`rm -rf`)
- Modyfikacja systemu (`sudo apt install`)
- Push do zdalnego repozytorium (`git push`)
- Destructive git operations (`git reset --hard`)

#### 🚫 Operacje których Claude NIE wykona (nawet na żądanie):
- `rm -rf /` (niszczenie systemu)
- Obchodzenie sandboxu
- Operacje na plikach systemowych `/etc`, `/sys`
- Force push do `main`/`master` (chyba że explicite poprosisz)

---

## Podsumowanie

Narzędzie **Bash** to terminal agent Claude - Twój autonomiczny operator systemu. Najważniejsze rzeczy do zapamiętania:

1. **Claude jako operator** - opisujesz cel ("uruchom testy"), Claude wybiera komendy
2. **Background execution** - długie procesy nie blokują terminala dzięki `run_in_background: true`
3. **Cytowanie ścieżek** - Claude automatycznie obsługuje spacje w nazwach plików
4. **Inteligentne łańcuchy** - `&&` dla sekwencji warunkowych, `;` dla bezwarunkowych
5. **Równoległość** - niezależne komendy wykonują się jednocześnie
6. **Bezpieczeństwo** - destrukcyjne operacje wymagają Twojej zgody

**Kluczowa lekcja:** Nie musisz znać składni bash, AWK, sed czy innych narzędzi - wystarczy że opiszesz co chcesz osiągnąć.

---

## Pytania kontrolne

1. **Jaka jest różnica między `&&` a `;` w łańcuchach komend?**
   <details>
   <summary>Odpowiedź</summary>
   `&&` wykonuje następną komendę TYLKO jeśli poprzednia się powiodła (exit code 0). `;` wykonuje następną komendę niezależnie od wyniku poprzedniej. Przykład: `npm install && npm build` - build wykona się tylko jeśli install się powiedzie.
   </details>

2. **Dlaczego Claude cytuje ścieżki ze spacjami?**
   <details>
   <summary>Odpowiedź</summary>
   Bez cudzysłowów bash traktuje spację jako separator argumentów. `cd /Users/Jan Kowalski` będzie próbował wykonać `cd /Users/Jan` z dodatkowym argumentem `Kowalski`. Prawidłowo: `cd "/Users/Jan Kowalski"`.
   </details>

3. **Kiedy Claude użyje `run_in_background: true`?**
   <details>
   <summary>Odpowiedź</summary>
   Gdy proces może trwać długo lub blokować terminal - np. serwer deweloperski (`npm run dev`), długie testy, lub operacje trwające powyżej domyślnego timeoutu (180s).
   </details>

---

## Zadania praktyczne

### Zadanie 1: Podstawowa automatyzacja ⭐

Poproś Claude o:
```
> Show me all JavaScript files in current directory, count them, and display total size
```

**Oczekiwany wynik:** Claude użyje kombinacji `find`, `wc`, i `du`.

**Bonus:** Sprawdź jakie komendy Claude wykonał i spróbuj zrozumieć każdą część.

---

### Zadanie 2: Sekwencje komend ⭐⭐

Poproś Claude o:
```
> Create directory "test-backup", copy all .txt files there, and show confirmation
```

**Oczekiwany wynik:** Claude użyje `mkdir`, `cp`, i `echo` połączone operatorem `&&`.

**Sprawdź:** Czy katalog powstał? Czy pliki zostały skopiowane?

---

### Zadanie 3: Background execution ⭐⭐⭐

Jeśli masz projekt Node.js:
```
> Start development server in background and check if it's running
```

**Oczekiwany wynik:** Serwer startuje, terminal nie jest zablokowany, Claude potwierdza że proces działa.

**Zaawansowane:** Poproś Claude żeby zatrzymał serwer po 30 sekundach.

---

### Zadanie 4: Automatyzacja biznesowa (praktyczne) 🏢

Symulacja rzeczywistego problemu w małej firmie:

1. Stwórz katalog `/tmp/invoices-test`
2. Stwórz kilka plików testowych:
   ```
   > Create 5 empty files named "Invoice_001.pdf" to "Invoice_005.pdf" in /tmp/invoices-test
   ```
3. Poproś Claude o zmianę nazw według schematu `2024-01-XXX.pdf`
4. Sprawdź wynik

**Oczekiwany wynik:** Claude użyje pętli `for` lub `rename` do wsadowej zmiany nazw.

---

### BONUS: Raport systemowy 🎁

```
> Generate system health report: OS version, uptime, CPU load, memory usage, disk space
```

Claude stworzy kompleksowy raport używając kombinacji komend systemowych.

**Zapisz wynik** - to przydatny skrypt do monitorowania serwerów!

---

## Linki do zasobów

### Bash fundamentals:
- **[Bash Guide for Beginners](https://www.tldp.org/LDP/Bash-Beginners-Guide/html/)** - Kompleksowy przewodnik po bash
- **[ExplainShell](https://explainshell.com/)** - Wklej komendę, dostaniesz wyjaśnienie każdej części
- **[Bash Cheatsheet](https://devhints.io/bash)** - Szybka ściąga z najczęstszych komend

### Zaawansowane tematy:
- **[Advanced Bash-Scripting Guide](https://tldp.org/LDP/abs/html/)** - Biblia bash scripting
- **[ShellCheck](https://www.shellcheck.net/)** - Linter dla skryptów bash (znajdź błędy automatycznie)

### Narzędzia pomocnicze:
- **[tldr pages](https://tldr.sh/)** - Uproszczone man pages z przykładami
- **[The Art of Command Line](https://github.com/jlevy/the-art-of-command-line)** - Must-read dla każdego kto pracuje w terminalu

### Community i inspiracje:
- **[r/commandline](https://reddit.com/r/commandline)** - Społeczność miłośników terminala
- **[CommandLineFu](https://www.commandlinefu.com/)** - Baza genialnych one-linerów

---

**W następnej lekcji:** **Glob** - wyszukiwanie plików przez pattern matching. Nauczysz się jak Claude znajduje "wszystkie pliki konfiguracyjne" czy "wszystkie testy w projekcie" w sekundy.

**Masz pytania?** Odpowiedz na tego maila lub dołącz do naszej społeczności!

---

*Mail wygenerowany w ramach kursu Claude Code - Moduł 2: Wbudowane Narzędzia*
