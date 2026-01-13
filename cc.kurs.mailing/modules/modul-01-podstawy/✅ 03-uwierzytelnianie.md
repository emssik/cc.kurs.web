# Lekcja 3: Uwierzytelnianie i abonamenty - jak naprawdę działają koszty

---

## Przypomnienie z poprzedniej lekcji

W lekcji 2 nauczyłeś się instalować Claude Code. Sprawdziłeś instalację komendą `claude --version` i poznałeś `/doctor` do diagnozowania problemów. Teraz czas na uwierzytelnienie i **zrozumienie, jak naprawdę działają koszty w Claude Code**.

---

## TLDR

**Dzisiaj nauczysz się:**
- Jak naprawdę działają abonamenty i limity (styczeń 2026)
- Dlaczego Max jest 5-10x lepszy niż API
- Jak działają dynamiczne limity i jak się przed nimi bronić
- Jak się uwierzytelnić (3 metody)
- Jak monitorować użycie

**Najważniejsze:** Masz 4 opcje: Pro ($17), Max ($100 lub $200) i API. Nie ma konkretnych liczb requestów - wszystko jest dynamiczne. Max $100 to równoważnik ~$1,000 przez API, Max $200 to nawet $5,000-10,000. Sprawdź `/usage` żeby wiedzieć, gdzie stoisz z limitami.

---

## Mem z Twitter

**"When you forget to set a billing alert on your cloud API account..."**

[Developer checking AWS bill](https://twitter.com/ThePracticalDev/status/1234567890123456789)

_Developer: "Tak, to tylko testowy projekt..."_
_Cloud provider: "$4,273.52"_
_Developer: "...używałem go przez weekend..."_

[Zobacz tweet](https://twitter.com/ThePracticalDev/status/1234567890123456789)


**Lekcja:** Zawsze ustawiaj alerty kosztów PRZED pierwszym użyciem API. To 5 minut, które mogą zaoszczędzić tysiące złotych.

---

## Jak naprawdę działają abonamenty i limity w Claude Code

Styczeń 2026. Masz 4 opcje - pomijam darmową, bo szybko się wyczerpuje i nie nadaje się do poważnej pracy.

### Twoje opcje

**Pro za $17 miesięcznie** - wystarcza do prostych prac i nauki. Znam osoby, które używają Pro nawet do codziennego programowania. Plus dostęp do interfejsu webowego w cenie.

**Max za $100 miesięcznie** - to już narzędzie profesjonalisty. Równoważnik wydania **~$1,000 przez API**. Jeśli Claude Code ma na siebie zarabiać, to jest idealna opcja.

**Max za $200 miesięcznie** - beast mode. Równoważnik **$5,000-10,000 przez API** w zależności od sposobu użycia. Dla osób, które pracują z Claude Code przez większość dnia.

**API (pay-as-you-go)** - płacisz za każdy token ($3-15 za milion tokenów wejściowych, $15-75 wyjściowych). Średnio ~$100-200 miesięcznie, ale może być znacznie więcej.

### Dlaczego Max jest lepszy niż API?

Matematyka jest prosta. Max $100 = ~$1,000 API. Max $200 = ~$5,000-10,000 API. To 5-10 razy tańsze.

Więc zanim pomyślisz "ok, wezmę API bo będzie elastycznie" - zatrzymaj się i sprawdź Max. W większości przypadków będzie tańszy i wystarczający. API używaj tylko gdy masz naprawdę mocne uzasadnienie.

### Jak działają limity w abonamentach?

To kluczowa rzecz, której musisz się nauczyć. **Nie ma konkretnych liczb requestów.** Anthropic ustala limity dynamicznie w zależności od aktualnego obciążenia.

Pracując z abonamentami, musisz rozumieć dwa rodzaje limitów:

**Limit okna 5h** - masz 5 godzin od pierwszego użycia modelu w danym dniu. Zużywasz go podczas intensywnej pracy. Gdy się wyczerpie, musisz poczekać (do końca okna) lub wykupić wyższy plan.

**Limity tygodniowe** - resetują się co tydzień. To druga bariera. Możesz wyczerpać limit tygodniowy nawet jeśli masz jeszcze czas w oknie 5h.

Sprawdzasz status przez `/usage` jeśli masz abonament. Jeśli używasz API - przez `/cost`.

### Z mojego doświadczenia

Gdy pojawiło się Claude Code, działało tylko po API. Trzymałem się od niego z daleka. Koszt prostych operacji był kosmiczny, zwłaszcza że model Opus był wtedy najdroższym modelem (75$ za milion tokenów wyjściowych). Mimo że najnowszy Opus jest 3 razy tańszy, to i tak wciąż sporo jak na polską kieszeń.

Jednak jak tylko pojawiła się możliwość przetestowania abonamentu Max, nie wahałem się nawet przez moment. I tak już zostałem.

Z abonamentem za 100$ mogę pracować bez patrzenia na zegar. I przede wszystkim - to kilkadziesiąt razy tańsze niż API dla mojego sposobu użycia. W razie potrzeby zawsze mogę przejść na abonament za 200$.

**Zasada:** Jeśli Claude Code ma na siebie zarabiać - wykup Max. Jeśli uczysz się lub robisz proste prace sporadycznie - Pro wystarczy. API używaj tylko gdy Max $200 nie wystarcza (bardzo rzadkie przypadki).

---

## Uwierzytelnianie - 3 metody

Teraz gdy rozumiesz koszty, czas na logowanie. Masz trzy główne metody.

### Metoda 1: Interaktywne logowanie (najprostsza)

Najszybsza metoda dla osób zaczynających:

```bash
# Uruchom Claude
claude

# W REPL wpisz:
/login

# System przekieruje Cię do przeglądarki:
# 1. Zaloguj się na claude.ai (Pro/Max) lub Claude Console (API)
# 2. Autoryzuj Claude Code
# 3. Skopiuj kod autoryzacyjny
# 4. Wklej w terminalu
```

**Kiedy używać:** Prywatne projekty, nauka, szybkie testy.

**Uwaga:** Użytkownicy Pro/Max logują się przez Claude.ai. Dla API, logowanie przez Console tworzy automatycznie workspace "Claude Code" do śledzenia kosztów.

---

### Metoda 2: API Key (dla projektów)

Gdy pracujesz w zespole lub potrzebujesz automatyzacji:

**Krok 1:** Pobierz klucz z [https://console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys)

**Krok 2:** Zapisz w projekcie:

```bash
echo "ANTHROPIC_API_KEY=sk-ant-api03-..." >> .env
echo ".env" >> .gitignore  # WAŻNE: Nie commituj klucza!
claude
```

**Uwaga bezpieczeństwa:** NIGDY nie commituj `.env` do Git! Jeśli to zrobisz:
1. **NATYCHMIAST** unieważnij klucz w Console (przycisk "Revoke")
2. Usuń z historii Git przez `git filter-branch`
3. Wygeneruj nowy klucz

---

### Metoda 3: Wiele kont (firmowe + prywatne)

Gdy potrzebujesz oddzielić koszty:

```bash
# Stwórz aliasy w ~/.zshrc lub ~/.bashrc
alias claude-work='ANTHROPIC_API_KEY=$(cat ~/.anthropic-work) claude'
alias claude-personal='ANTHROPIC_API_KEY=$(cat ~/.anthropic-personal) claude'

# Używanie:
claude-work      # Firmowe projekty
claude-personal  # Prywatne projekty
```

**Przełączanie w REPL:**
```bash
/logout    # Wyloguj się
/login     # Zaloguj na inne konto
/status    # Sprawdź aktywne konto
```

---

## Zarządzanie kosztami - praktyczny przewodnik

### Monitoruj zużycie

**Abonamenty (Pro/Max):** Używaj `/status (lub od razu /usage)`. Pokaże Ci plan, status limitów (okno 5h + tygodniowe) i ile zostało do resetu.

**API:** Masz `/cost` - pokazuje koszt sesji i zmiany w kodzie.

**Best practice:** Sprawdzaj regularnie, szczególnie gdy zbliżasz się do końca okna 5h lub tygodnia. Lepiej wiedzieć wcześniej niż być zaskoczonym.

---

### Ustaw alerty w Console (dla API)

Jeśli używasz API, to KONIECZNIE.

W [Console Anthropic](https://console.anthropic.com/settings/billing):
1. Przejdź do **Settings → Billing → Alerts**
2. Ustaw progi: $50 (ostrzeżenie), $100 (poważne), $200 (krytyczne)
3. Dodaj email zespołu do powiadomień

**Automatyczny workspace:** Podczas pierwszego uwierzytelnienia API, Claude Code tworzy workspace "Claude Code" do śledzenia kosztów. To jak osobne "konto podrzędne" - widzisz dokładnie ile kosztuje Cię użycie Claude Code oddzielnie od innych zastosowań API.

---

### Wybieraj model świadomie

Nie wszystkie zadania wymagają najdroższego modelu. Od tego jakich używasz modeli zależy na ile wystarczy Ci abonamentu. I choć wydawać by się mogło, że najlepiej zawsze używać najmocniejszego modelu, to wcale nie zawsze musi być prawda.

Np. o ile OPUS genialnie nadaje się do planowania i kodowania, to już Sonnet jest dużo lepszym pisarzem. A jeśli ma przygotowany dobry plan, do stowrzenia kodu może wystarczyć w zupełności model Haiku, który jest przy tym bardzo szybki.


| Model | Cena (input/output na 1M tokenów) | Kiedy używać |
|-------|-----------------------------------|--------------|
| **Haiku 4.5** | $1 / $5 | Proste zadania, refactoring, formatowanie |
| **Sonnet 4.5** | $3 / $15 | Większość pracy dev - optymalny wybór |
| **Opus 4.5** | $15 / $25 | Architektura, trudne problemy, system design |

**Pro-tip:** Zacznij od Sonnet. Przełącz na Opus tylko gdy Sonnet "nie daje rady" (np. kompleksowa architektura).

### Opcja "cebulowa" - alternatywne modele

Jeśli chcesz jeszcze bardziej obniżyć koszty, możesz skorzystać z alternatywnych dostawców. Jednym z ciekawszych jest **z.ai** z modelem GLM 4.7.

Według testów (w tym moich praktycznych, inaczej by nie było tego punktu), GLM 4.7 jest na poziomie Sonnet 4.5 pod względem jakości kodu. Ważne zastrzeżenia:
- ✅ Świetnie nadaje się do **kodowania** gdy ma już gotowy plan
- ❌ **Nie nadaje się do planowania większych zadań** - tutaj zostań przy Opus/Sonnet
- ✅ Abonamenty są **niesamowicie atrakcyjne** cenowo 

**"Cebulowa" strategia:**
1. Opus/Sonnet do planowania architektury
2. GLM 4.7 (z.ai) do implementacji kodu według planu
3. Haiku do prostych refaktoryzacji

**Link:** [z.ai DevPack](https://z.ai/subscribe?ic=HVQVOBYUUA) (to link afiljacyjny - Ty dostajesz 10% zniżki, mi trochę zwiększają się limity)

[Jak podpiąć GLM 4.7 do Claude Code](https://docs.z.ai/devpack/tool/claude) to nie jest trudna operacja, a instrukcja wszystko wyjaśnia. Najwygodniej stworzyć sobie alias do Claude Code z kluczami GLM. Jak to zrobić?

Poproś CC, żeby Ci pomógł. Napisz czego potrzebujesz, podaj mu link do strony z dokumentacją, napisz jakiego używasz systemu operacyjnego :) 

**Kiedy to ma sens?** 

I w planie Pro i w intensywnie uzywanym planie max
Gdy pracujesz intensywnie i limity Max $200 się wyczerpują. Używając GLM do implementacji możesz znacznie wydłużyć czas pracy na abonamencie.

---

### Kontekst

Ogromne znaczenie na jakość i koszty pracy, ma też odpowienie używanie kontekstu (jeśli nie wiesz co to dokładnie jest to spokojnie, będzie o tym dużo więcej w jednym z kolejnych modułów).

Pamiętaj że co prawda isnieje komenda `/compact` która powoduje "skondesowanie" kontekstu, jednak używaj jej naprawdę w ostateczności.

Modele Anthropica pracują najlepiej gdy mają nie więcej niż 50% zajętego kontesktu (możesz to sprawdzić komendą `/context`). 

Dlatego tak naprawdę, o wiele lepiej poprosić model o wyciągnięcie najważniejszych wniosków z aktualnej rozmowy i poprosić o ich zapisanie do pliku. Następnie zapoznać się z nimi, zmodyfikować jeśli będzie taka konieczność. Następnie przy pomocy komendy `clear` wyczyścić kontekst, poprosić model o załadowanie pliku i można kontynuować.

## Podsumowanie

Dzisiaj nauczyłeś się:

1. **Czterech opcji rozliczeń:**
   - Pro ($17) - nauka, proste prace
   - Max $100 - równoważnik ~$1,000 API
   - Max $200 - równoważnik $5,000-10,000 API
   - API - tylko w specyficznych przypadkach

2. **Jak działają limity:**
   - Brak konkretnych liczb - dynamiczne
   - Okno 5h + limity tygodniowe
   - Sprawdzaj `/status` (abonamenty) lub `/cost` (API)

3. **Trzech metod uwierzytelniania:**
   - Interaktywne `/login`
   - API key w `.env`
   - Multi-account setup

4. **Best practices:**
   - Max jest 5-10x tańszy niż API
   - Wybieraj model świadomie (Haiku/Sonnet/Opus)
   - Monitoruj użycie regularnie
   - Dbaj o kontekst

**Najważniejsze:** Najpierw sprawdź Max zamiast od razu myśleć o API. W większości przypadków Max będzie wystarczający i znacznie tańszy.

---

## Pytania kontrolne

1. **Ile wynosi równoważnik Max $200 w API?**
   <details>
   <summary>Odpowiedź</summary>
   $5,000-10,000 API (w zależności od użycia). Dlatego Max jest znacznie lepszą opcją dla większości użytkowników.
   </details>

2. **Jakie są dwa rodzaje limitów w abonamentach?**
   <details>
   <summary>Odpowiedź</summary>
   1) Limit okna 5h - od pierwszego użycia w danym dniu. 2) Limity tygodniowe - resetują się co tydzień. Ważne: brak konkretnych liczb requestów - limity dynamiczne.
   </details>

3. **Jak sprawdzić status limitów?**
   <details>
   <summary>Odpowiedź</summary>
   Abonamenty: `/status` - pokazuje limity i czas do resetu. API: `/cost` - pokazuje koszty (trudno znaleźć w dokumentacji).
   </details>

---

## Zadania praktyczne

### Zadanie 1: Uwierzytelnienie i monitoring (łatwe)

1. Zaloguj się przez `/login`
2. Sprawdź konto przez `/settings`
3. Uruchom sesję (dowolne zadanie)
4. Sprawdź koszty przez `/cost` lub status przez `/status`

**Cel:** Nauczyć się monitorować użycie od pierwszego dnia.

---

### Zadanie 2: API key dla projektu (średnie)

1. Wygeneruj API key w Console
2. Stwórz `.env` w projekcie
3. Dodaj `.env` do `.gitignore`
4. Ustaw alert na $10 w Console

**Cel:** Bezpieczna konfiguracja dla projektów firmowych.

---

## Na miłe zakończenie :)
## 003

TUTAJ WKLEJ OBRAZEK z adresu https://images.danielroziecki.com//.netlify/images?url=/003.pricing.jpg



## Słowniczek

**API (Application Programming Interface)**
Interfejs programistyczny - sposób, w jaki różne programy "rozmawiają" ze sobą. W Claude Code to kanał komunikacji między narzędziem a serwerami Anthropic.

**Token**
Podstawowa jednostka tekstu w AI. Średnio 1 token = ~4 znaki (~0.75 słowa angielskiego). Przykład: "Cześć, jak się masz?" to ~6 tokenów. Koszty API liczone w tokenach.

**Rate limit**
Maksymalna liczba zapytań w określonym czasie (np. 100/minutę). Chroni serwery przed przeciążeniem.

**Console (Claude Console)**
Panel administracyjny Anthropic (console.anthropic.com) do zarządzania kluczami API, monitorowania kosztów i konfiguracji.

**REPL (Read-Eval-Print Loop)**
Interaktywny tryb Claude Code. Wpisujesz komendy, widzisz odpowiedzi natychmiast. Uruchamiasz przez `claude`.

**Workspace**
Przestrzeń robocza w Console do organizacji projektów i śledzenia kosztów. Claude Code automatycznie tworzy workspace "Claude Code" przy pierwszym logowaniu API.

**Billing alert**
Alert kosztowy - automatyczne powiadomienie email gdy wydatki przekroczą próg. Pomaga uniknąć niespodzianek.

**Revoke (key)**
Unieważnienie klucza API - permanentne wyłączenie. Robisz to gdy klucz wyciekł lub nie jest już potrzebny.

**Environment variable**
Sposób przechowywania konfiguracji (np. API key) poza kodem. Działa jak "schowek" dostępny dla Twojego systemu.

**.env file**
Plik tekstowy z zmiennymi środowiskowymi dla projektu. Zawiera dane wrażliwe - NIE commituj do Git.

**CI/CD (Continuous Integration/Continuous Deployment)**
Automatyczne testowanie i wdrażanie kodu. CI = testy przy każdym commit. CD = automatyczna publikacja na produkcję.

---

## Linki do zasobów

### Oficjalna dokumentacja
- [Anthropic Console](https://console.anthropic.com) - zarządzanie API keys i billing
- [Pricing Calculator](https://docs.anthropic.com/en/docs/pricing) - kalkulator kosztów
- [API Keys Management](https://console.anthropic.com/settings/keys) - tworzenie i rotacja kluczy

### Bezpieczeństwo
- [GitHub Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) - bezpieczne przechowywanie
- [1Password CLI](https://developer.1password.com/docs/cli) - zarządzanie kluczami
- [git-filter-repo](https://github.com/newren/git-filter-repo) - usuwanie sekretów z historii

---

**Następna lekcja:** Podstawy pracy z Claude Code.

**Masz pytania?** Odpowiedz na tego maila!

---

Generated with Claude Code | Module 1, Lesson 3
