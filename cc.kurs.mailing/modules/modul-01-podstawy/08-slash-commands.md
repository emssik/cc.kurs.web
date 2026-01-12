# Mail 8: Slash commands - kontroluj kontekst i koszty

## Przypomnienie z lekcji 7

W poprzedniej lekcji poznaliśmy **CLAUDE.md** - pamięć projektu, która działa jak dokument onboardingowy dla Claude. Nauczyliśmy się tworzyć hierarchię plików (globalny, projektowy, lokalny) oraz używać komendy `/init` do automatycznego generowania szkieletu. Dowiedzieliśmy się też, jak importować inne pliki do kontekstu używając składni `@ścieżka/do/pliku`.

Kluczowa lekcja? Traktuj CLAUDE.md jak instrukcję dla nowego stażysty - powinien zawierać komendy build/test, strukturę projektu i najważniejsze zasady kodowania.

---

## Sprawdź swoją wiedzę z lekcji 7

1. **Która komenda automatycznie generuje szkielet CLAUDE.md?** (`/init`, `/memory`, `/help`)
2. **W jakiej kolejności Claude ładuje pliki CLAUDE.md?** (od najwyższego do najniższego priorytetu)
3. **Jakie są poprawne nazwy komend?** (`/add-dir`, `/resume`, `/rewind` - nie `/add`, `/history`, `/undo`)

---

## TLDR

Slash commands to Twoje narzędzia do zarządzania sesją w Claude Code. Najważniejsze:
- `/clear` - resetuje kontekst (oszczędza tokeny)
- `/compact` - kompresuje historię, zachowując kluczowe informacje
- `/cost` i `/usage` - monitorowanie wydatków i zużycia tokenów
- `/export` - eksport rozmowy do pliku (backup postępów)
- `/settings` lub `/config` - sprawdź aktualną konfigurację

**Złota zasada:** Co 30-60 minut sprawdź `/cost`, zrób `/compact`, zapisz `/export`. To jak checkpoint w grze - chroni Twój postęp i portfel.

---

## Mem z Twittera

![Zarządzanie kosztami AI](https://twitter.com/search?q=AI%20costs%20meme&src=typed_query)

*Deweloper: "Używam AI do wszystkiego!"*
*Rachunek za API: "Cześć, to ja."*
*Deweloper po zobaczeniu `/cost`: "Może jednak nie do wszystkiego..."*

[Link do mema o kontrolowaniu kosztów AI](https://x.com/search?q=AI%20API%20costs%20expensive&src=typed_query&f=image)

---

## Lekcja: Slash Commands - Twój panel kontrolny

### Dlaczego slash commands są ważne?

Wyobraź sobie, że prowadzisz małą firmę i korzystasz z Claude Code do różnych zadań. Rano piszesz kod do aplikacji webowej, po południu analizujesz dane sprzedażowe, wieczorem przygotowujesz kampanię email. Każda sesja zajmuje czas i kosztuje tokeny.

**Problem:** Bez kontroli kontekstu jedna długa sesja może kosztować 5-10 dolarów. To jak zostawienie włączonego światła przez całą noc - niepotrzebne marnotrawstwo.

**Rozwiązanie:** Slash commands pozwalają zarządzać sesją jak dobrze zorganizowanym biurem - regularnie sprzątasz, archiwizujesz, monitorujesz koszty.

### Podstawowe slash commands

#### 1. Zarządzanie kontekstem (oszczędzanie pieniędzy)

**`/clear` - resetuj wszystko**
```bash
> /clear
```
Usuwa całą historię rozmowy. Używaj gdy:
- Kończysz jeden projekt i zaczynasz nowy
- Kontekst się "zaśmiecił" niepotrzebnymi informacjami
- Chcesz zacząć od czystej karty

**`/compact` - sprzątnij, ale zostaw ważne rzeczy**
```bash
> /compact
```
Claude podsumowuje rozmowę, usuwa niepotrzebne szczegóły, ale zachowuje kluczowe ustalenia. Używaj gdy:
- Pracujesz już 30-60 minut nad projektem
- Zużyłeś >50% limitu tokenów
- Chcesz kontynuować pracę, ale odświeżyć kontekst

**Przykład - długa sesja kodowania:**
```bash
> Dodaj autentykację OAuth do projektu
[... 30 minut pracy, wiele plików edytowanych ...]

> /usage
# Output: Using 45,000 / 200,000 tokens (22%)

> /compact
# Claude: "Podsumowałem dotychczasową pracę. Zaimplementowaliśmy OAuth z Google i GitHub,
#          dodaliśmy endpointy /auth/login i /auth/callback, oraz testy..."

> /usage
# Output: Using 8,000 / 200,000 tokens (4%) # Oszczędność 37k tokenów!
```

#### 2. Monitorowanie kosztów

**`/cost` - sprawdź ile wydałeś**
```bash
> /cost
# Session started: 14:23:15
# Duration: 1h 23m
# Total cost: $0.87
# Model: claude-sonnet-4-5-20250929
# Input tokens: 125,443
# Output tokens: 38,291
```

**`/usage` - sprawdź zużycie tokenów (tylko dla subscription plans)**
```bash
> /usage
# Using 45,000 / 200,000 tokens (22%)
```

**Uwaga:** Komenda `/usage` jest dostępna tylko dla użytkowników z API subscription (Console/API accounts). Pokazuje limity planu subskrypcyjnego i status rate limitów. Nie jest dostępna dla użytkowników planu Pro lub Max.

**Pro-tip:** Ustaw sobie nawyk sprawdzania `/cost` co godzinę. To jak sprawdzanie salda konta - lepiej wiedzieć wcześniej niż być zaskoczonym rachunkiem.

#### 3. Backup i eksport

**`/export` - zapisz postęp do pliku**
```bash
> /export project-summary.md
# Saves całą konwersację do pliku Markdown
```

Używaj przed:
- Dużymi zmianami w kodzie
- Zakończeniem sesji
- Przełączaniem między projektami

**Przykład - przekazanie pracy komuś innemu:**
```bash
# Developer A kończy pracę:
> /export handoff-to-bob.md
> Podsumuj co zrobiono i co pozostało do zrobienia

# Developer B przejmuje:
> Przeczytaj @handoff-to-bob.md i kontynuuj
```

### Kompletna lista slash commands

| Komenda | Funkcja | Przykład użycia |
|---------|---------|-----------------|
| `/help` | Pokaż dostępne komendy | `/help` |
| `/clear` | Wyczyść historię i kontekst | `/clear` (przed startem nowego zadania) |
| `/compact` | Skompresuj historię, zachowaj kluczowe info | `/compact` (po 30-60 min pracy) |
| `/cost` | Pokaż koszt obecnej sesji | `/cost` (sprawdź ile wydałeś) |
| `/usage` | Pokaż zużycie tokenów (tylko subscription) | `/usage` |
| `/login` | Zaloguj się do konta Claude | `/login` |
| `/logout` | Wyloguj się | `/logout` |
| `/settings` | Pokaż aktualną konfigurację | `/settings` |
| `/init` | Wygeneruj CLAUDE.md dla projektu | `/init` (w root projektu) |
| `/memory` | Edytuj pliki CLAUDE.md | `/memory` (otwórz edytor pamięci projektu) |
| `/doctor` | Diagnostyka instalacji i połączenia | `/doctor` (troubleshooting) |
| `/permissions` | Zarządzaj uprawnieniami | `/permissions` (pokaż/edytuj uprawnienia) |
| `/export` | Eksportuj konwersację do pliku | `/export conversation.md` |
| `/version` | Sprawdź wersję Claude Code | `/version` |

### Custom Status Line - wizualny kontekst projektu

Claude Code pozwala skonfigurować własny **status line** - pasek statusu wyświetlany podczas pracy, który może pokazywać kluczowe informacje o projekcie:

**Jak to działa?**
Status line to skrypt, który zwraca informacje wyświetlane w interfejsie Claude Code. Może zawierać:
- Aktualną gałąź Git
- Liczbę uncommitted changes
- Status testów
- Dowolne inne informacje projektowe

**Konfiguracja w settings.json:**
```json
{
  "statusLine": {
    "type": "command",
    "command": "~/.claude/statusline.sh"
  }
}
```

**Gotowe rozwiązanie z community:**
Zamiast pisać własny skrypt od zera, możesz użyć **ccstatusline** - gotowego rozwiązania:

🔗 **https://github.com/sirmalloc/ccstatusline**

Zawiera:
- Git branch i status (uncommitted changes)
- File counts (pliki w projekcie)
- Test status (jeśli wykryje framework testowy)
- Łatwa instalacja i konfiguracja

**Przykład prostego własnego skryptu:**
```bash
#!/bin/bash
# ~/.claude/statusline.sh

BRANCH=$(git branch --show-current 2>/dev/null || echo "no git")
UNCOMMITTED=$(git status --short 2>/dev/null | wc -l | tr -d ' ')

echo "📍 $BRANCH | 📝 $UNCOMMITTED changes"
```

Pamiętaj, aby nadać skryptowi uprawnienia wykonywania:
```bash
chmod +x ~/.claude/statusline.sh
```

**Po co to?**
Status line daje Ci (i Claude) natychmiastowy kontekst o stanie projektu bez potrzeby sprawdzania komend typu `git status`. To szczególnie przydatne gdy:
- Przełączasz się między projektami
- Pracujesz na wielu gałęziach
- Chcesz mieć szybki overview stanu projektu

### Praktyczne scenariusze

#### Scenariusz 1: Analiza danych sprzedażowych dla małej firmy

```bash
# Start sesji
> Przeanalizuj dane sprzedażowe z pliku sales-2024.csv i pokaż trendy

[... Claude analizuje dane, generuje wykresy w Python ...]

# Po 45 minutach:
> /usage
# Using 78,000 / 200,000 tokens (39%)

> /compact  # Oszczędzamy tokeny
> /export sales-analysis-backup.md  # Backup wyników

# Kontynuuj z czystszym kontekstem:
> Teraz przygotuj raport w formacie PDF z wnioskami
```

#### Scenariusz 2: Przygotowanie kampanii marketingowej

```bash
# Sesja 1: Copywriting
> Napisz 5 wersji maila promocyjnego na nowy produkt
[... praca nad tekstami ...]
> /export campaign-emails.md
> /clear  # Kończymy temat

# Sesja 2: Grafika
cd ~/Marketing/graphics
claude
> Przeanalizuj obrazy w folderze i zasugeruj które użyć w kampanii
[... analiza grafik ...]
> /export graphics-recommendations.md
```

#### Scenariusz 3: Monitorowanie budżetu projektu

```bash
> /cost
# Total cost: $2.34
# Duration: 2h 15m

# Jeśli za drogo:
> /compact  # Zmniejsz zużycie
# Lub przełącz na tańszy model (Haiku) w przyszłych sesjach
```

### Checkpoint Pattern - strategia oszczędzania

Najważniejsza technika zarządzania kosztami. Używaj co 30-60 minut:

```bash
# Co 30-60 minut:
> /cost              # Sprawdź ile wydałeś
> /compact           # Skompresuj jeśli >50k tokens
> /export backup.md  # Backup progress

# Przed końcem sesji:
> /export final-summary.md
> /clear
```

**Dlaczego to działa?**
- Regularny `/compact` redukuje zużycie tokenów nawet o 70-80%
- `/export` chroni przed utratą postępów przy crashu
- `/cost` pozwala wykryć problemy zanim rachunek urośnie

### Typowe błędy i jak ich unikać

| Błąd | Objaw | Rozwiązanie |
|------|-------|-------------|
| **Zapomnienie /compact** | Session cost > $5 | Regularnie kompaktuj co 30-60 min |
| **Użycie /clear zamiast /compact** | Utrata całego kontekstu | Używaj `/export` przed `/clear` |
| **Nie sprawdzanie /cost** | Nieoczekiwanie wysoki rachunek | Ustaw habit: `/cost` co godzinę |
| **Brak /export** | Utrata postępu przy crashu | `/export` przed każdą dużą zmianą |

### Advanced tricks

**1. Auto-export przy wyjściu (dodaj do ~/.zshrc)**
```bash
claude-session() {
    claude
    # Po wyjściu z Claude (Ctrl+D):
    echo "Saving session..."
    claude /export "session-$(date +%Y%m%d-%H%M).md"
}
```

**2. Alias do szybkiej diagnostyki**
```bash
alias cdoc='claude /doctor && claude /usage && claude /cost'
```

**3. Periodic cost alerts (w tle podczas pracy)**
```bash
watch -n 300 'claude /cost'  # Co 5 min sprawdź koszt
```

### Debug workflow

```bash
> /doctor  # Pierwsza linia obrony przy problemach

# Jeśli problem z kosztami:
> /cost
> /usage

# Jeśli problem z uprawnieniami:
> /permissions  # Zobacz i zaktualizuj uprawnienia

# Jeśli problem z konfiguracją:
> /settings
```

### Przykład z życia: Zarządzanie małą firmą konsultingową

Marcin prowadzi małą firmę konsultingową. Tak używa slash commands:

**Poranek - kodowanie:**
```bash
cd ~/Projekty/klient-abc
claude
> /init  # Załaduj kontekst projektu
> Dodaj system logowania do aplikacji
[... 45 minut pracy ...]
> /cost  # $0.42
> /compact
> /export morning-coding-session.md
> /clear
```

**Popołudnie - analiza biznesowa:**
```bash
cd ~/Documents/Business
claude
> Przeanalizuj faktury z ostatniego kwartału i znajdź optymalizacje
[... analiza danych ...]
> /cost  # $0.28
> /export quarterly-analysis.md
> /clear
```

**Wieczór - marketing:**
```bash
cd ~/Marketing
claude
> Napisz post na LinkedIn o naszej nowej usłudze
[... copywriting ...]
> /cost  # $0.15
> /export linkedin-posts.md
```

**Podsumowanie dnia:**
```bash
# Łączny koszt: $0.85
# Trzy różne projekty, każdy z czystym kontekstem
# Wszystko zbackupowane i zorganizowane
```

---

## Podsumowanie

Slash commands to Twój panel kontrolny w Claude Code. Kluczowe wnioski:

1. **Regularnie monitoruj:** `/cost` i `/usage` pokazują czy jesteś na dobrej drodze
2. **Oszczędzaj inteligentnie:** `/compact` zamiast `/clear` gdy chcesz kontynuować pracę
3. **Backup, backup, backup:** `/export` przed każdą większą zmianą
4. **Checkpoint Pattern:** Co 30-60 min: `/cost` → `/compact` → `/export`
5. **Organizuj kontekst:** `/clear` między różnymi projektami

**Złota zasada:** Claude Code to potężne narzędzie, ale bez kontroli może generować wysokie koszty. Slash commands pozwalają pracować wydajnie i ekonomicznie.

---

## Pytania kontrolne

1. **Jaka jest różnica między `/clear` a `/compact`?** Kiedy użyć jednego, a kiedy drugiego?

2. **Ile kosztuje Cię jedna godzina pracy z Claude Code?** Sprawdź używając `/cost` podczas następnej sesji i zapisz wynik.

3. **Co to jest "Checkpoint Pattern"?** Opisz pełny workflow tego podejścia.

---

## Zadania praktyczne

### Zadanie 1: Zmierz swoje koszty
1. Rozpocznij nową sesję Claude Code w swoim projekcie
2. Pracuj normalnie przez 30 minut (kodowanie, analiza, cokolwiek)
3. Sprawdź `/usage` i `/cost`
4. Wykonaj `/compact`
5. Sprawdź `/usage` ponownie - ile tokenów zaoszczędziłeś?
6. Zapisz wyniki używając `/export baseline-costs.md`

### Zadanie 2: Stwórz własny checkpoint workflow
1. Dodaj alias do swojego `.zshrc` lub `.bashrc`:
```bash
alias ccheck='claude /usage && claude /cost'
```
2. Przetestuj go podczas następnej sesji
3. Zapisz własne notatki: jak często planujesz używać checkpointów?

### Zadanie 3: Przełączanie między projektami
1. Pracuj nad projektem A przez 20 minut
2. Użyj `/export project-a-progress.md`
3. Wykonaj `/clear`
4. Przejdź do projektu B (`cd ~/projekt-b`)
5. Uruchom Claude i pracuj nad projektem B
6. Wróć do projektu A - załaduj kontekst używając:
```bash
> Przeczytaj @project-a-progress.md i kontynuuj pracę
```

---

## Linki do dodatkowych zasobów

1. **Oficjalna dokumentacja Claude Code - Slash Commands**
   https://code.claude.com/docs/slash-commands

2. **Managing Context Windows (Anthropic Blog)**
   https://www.anthropic.com/index/managing-context-windows

3. **Cost Optimization Best Practices**
   https://docs.anthropic.com/claude/docs/cost-optimization

4. **Understanding Token Usage**
   https://help.anthropic.com/en/articles/8114521-what-are-tokens

5. **Export and Backup Strategies (Community Guide)**
   https://github.com/anthropics/claude-code/discussions/export-strategies

6. **Checkpoint Pattern - Case Studies**
   https://dev.to/search?q=claude%20code%20checkpoint%20pattern

---

**W następnej lekcji:** Poznamy wbudowane narzędzia (Tools) w Claude Code - jak działa Bash, Read, Write, Edit, Grep i Glob. Dowiesz się, jak Claude "widzi" i modyfikuje Twoje pliki oraz jak wykorzystać to do automatyzacji powtarzalnych zadań.

Do zobaczenia!
