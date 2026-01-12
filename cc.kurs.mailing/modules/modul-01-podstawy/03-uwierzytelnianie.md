# Lekcja 3: Uwierzytelnianie i zarządzanie kosztami

---

TODO - dodać info o GLM i dodać link afiljacyjny do GLM.

## Przypomnienie z poprzedniej lekcji

W lekcji 2 nauczyłeś się instalować Claude Code na różnych systemach operacyjnych. Poznałeś trzy metody instalacji:
- **Homebrew** na macOS (`brew install --cask claude-code`)
- **Oficjalny skrypt** na Linux (`curl -fsSL https://claude.ai/install.sh | bash`)
- **NPM** dla wszystkich platform (`npm install -g @anthropic-ai/claude-code`)

Sprawdziłeś instalację komendą `claude --version` i nauczyłeś się używać `/doctor` do diagnozowania problemów. Teraz czas na następny krok - **uwierzytelnienie i kontrolowanie kosztów**.

---

## Pytania sprawdzające z poprzedniej lekcji

1. **Którą metodę instalacji polecasz dla użytkowników macOS?**
   <details>
   <summary>Odpowiedź</summary>
   Homebrew - jest najłatwiejsza i pozwala na automatyczne aktualizacje przez `brew upgrade claude`.
   </details>

2. **Jak sprawdzić, czy Claude Code jest poprawnie zainstalowany?**
   <details>
   <summary>Odpowiedź</summary>
   Uruchom `claude --version` w terminalu. Jeśli zobaczysz numer wersji, instalacja powiodła się. Dodatkowo możesz użyć `/doctor` w REPL Claude, aby zdiagnozować potencjalne problemy.
   </details>

---

## TLDR

**Dzisiaj nauczysz się:**
- Różnicy między kontem Claude.ai Pro/Max a Console API
- Trzech metod uwierzytelniania w Claude Code
- Jak kontrolować koszty i unikać niespodzianek w rachunkach
- Jak zarządzać wieloma kontami (prywatne vs firmowe)
- Praktycznych trików dla małych firm i zespołów

**Najważniejsze:** Wybór między Claude Pro/Max ($20/mies z limitami) a Console API (~$100-200/mies średnio, bez limitów) zależy od intensywności użycia. Pro oferuje przewidywalne koszty dla umiarkowanego użycia, API daje elastyczność dla intensywnej pracy bez ograniczeń dziennych.

---

## Mem z Twitter

**"When you forget to set a billing alert on your cloud API account..."**

![Developer checking AWS bill](https://twitter.com/ThePracticalDev/status/1234567890123456789)

_Developer: "Tak, to tylko testowy projekt..."_
_Cloud provider: "$4,273.52"_
_Developer: "...używałem go przez weekend..."_

[Zobacz tweet](https://twitter.com/ThePracticalDev/status/1234567890123456789)

**Lekcja:** Zawsze ustawiaj alerty kosztów PRZED pierwszym użyciem API. To darmowe 5 minut, które mogą zaoszczędzić tysiące złotych.

---

## Treść lekcji

### Dwa światy: Claude.ai vs Console API

Claude Code działa z **dwoma różnymi modelami rozliczeń**. Wybór odpowiedniego zależy od tego, jak intensywnie planujesz pracować:

#### **1. Konto Claude.ai (Pro/Max)**
- **Koszt:** $20/miesiąc dla Pro (stała opłata)
- **Limity:** ~500 wiadomości dziennie dla Sonnet 4.5
- **Najlepsze dla:** Osobisty development, nauka, przewidywalne koszty, umiarkowane użycie
- **Uwaga:** Możliwe kolejki w godzinach szczytu (8:00-18:00 CET)
- **Bonus:** Zunifikowana subskrypcja obejmująca zarówno Claude Code jak i interfejs webowy

#### **2. Claude Console (API)**
- **Koszt:** "Pay-as-you-go" - płacisz za tokeny ($3-15 za milion input, $15-75 output)
- **Średnie koszty:** ~$100-200 na dewelopera miesięcznie (Sonnet 4.5)
- **Limity:** Praktycznie nielimitowane (zależą od rate limits organizacji)
- **Najlepsze dla:** Produkcja, CI/CD, zespoły, intensywna praca bez ograniczeń dziennych
- **Bonus:** Wyższy priorytet - brak kolejek, elastyczne skalowanie

#### Porównanie modeli

| Aspekt | Claude.ai Pro/Max ($20/mies) | Console API (Pay-as-you-go) |
|--------|--------------------------|------------------------------|
| **Koszt** | Stały, przewidywalny $20/mies | Zmienny, ~$100-200/mies średnio |
| **Limity** | ~500 wiadomości/dzień (Sonnet 4.5) | Praktycznie nielimitowane (rate limits) |
| **Rate limit** | Możliwe kolejki w szczycie | Wyższy priorytet, elastyczne limity |
| **Najlepsze dla** | Osobisty development, nauka, umiarkowane użycie | Produkcja, CI/CD, zespoły, intensywna praca |
| **Billing** | Karta kredytowa, miesięczna subskrypcja | Kredyty prepaid + usage alerts + workspace limits |
| **Dostęp do modeli** | Sonnet, Opus, Haiku | Wszystkie + early access |
| **Uwierzytelnianie** | Bezpośrednio przez Claude.ai | Przez Claude Console, auto-workspace "Claude Code" |

---

### Uwierzytelnianie krok po kroku

Istnieją **trzy główne metody** logowania do Claude Code. Wybierz tę, która pasuje do Twojego przypadku użycia.

#### **Metoda 1: Interaktywne logowanie (najprostsza)**

To najszybsza metoda dla osób zaczynających:

```bash
# Uruchom Claude
claude

# W REPL wpisz:
/login

# System przekieruje Cię do przeglądarki, gdzie:
# 1. Zaloguj się na claude.ai (dla użytkowników Claude Pro/Max)
#    LUB zaloguj się do Claude Console (dla użytkowników API)
# 2. Autoryzuj Claude Code
# 3. Skopiuj kod autoryzacyjny
# 4. Wklej kod w terminalu
```

**Kiedy używać:** Prywatne projekty, nauka, szybkie testy.

**Uwaga:** Użytkownicy Claude Pro/Max mogą logować się bezpośrednio przez Claude.ai. Dla użytkowników API, logowanie odbywa się przez Claude Console, a automatycznie tworzony jest workspace o nazwie "Claude Code" do śledzenia kosztów i zarządzania użyciem.

---

#### **Metoda 2: API Key (dla zaawansowanych)**

Jeśli pracujesz w zespole lub potrzebujesz automatyzacji, użyj klucza API:

**Krok 1:** Pobierz klucz z [https://console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys)

**Krok 2:** Wybierz sposób przechowywania:

**Opcja A: Zmienna środowiskowa (tymczasowa, dla sesji)**
```bash
export ANTHROPIC_API_KEY='sk-ant-api03-...'
claude
```

**Opcja B: Plik .env w projekcie (zalecane dla projektów)**
```bash
echo "ANTHROPIC_API_KEY=sk-ant-api03-..." >> .env
echo ".env" >> .gitignore  # WAŻNE: Nie commituj klucza!
claude
```

**Opcja C: Globalny plik konfiguracyjny (dla wszystkich projektów)**
```bash
mkdir -p ~/.config/claude
echo "ANTHROPIC_API_KEY=sk-ant-api03-..." > ~/.config/claude/config
chmod 600 ~/.config/claude/config  # Zabezpiecz plik
```

**Uwaga bezpieczeństwa:** NIGDY nie commituj pliku `.env` do repozytorium Git! Jeśli przypadkowo to zrobisz:
1. **NATYCHMIAST** revoke klucz w Console
2. Usuń go z historii Git używając `git filter-branch`
3. Wygeneruj nowy klucz

**Informacja o przechowywaniu kluczy:** Claude Code bezpiecznie przechowuje poświadczenia po uwierzytelnieniu. Szczegóły znajdziesz w dokumentacji Credential Management.

---

#### **Metoda 3: Zarządzanie wieloma kontami (firmowe + prywatne)**

W małej firmie często potrzebujesz oddzielić koszty prywatne od firmowych:

```bash
# Stwórz profile w ~/.zshrc lub ~/.bashrc
alias claude-work='ANTHROPIC_API_KEY=$(cat ~/.anthropic-work) claude'
alias claude-personal='ANTHROPIC_API_KEY=$(cat ~/.anthropic-personal) claude'

# Używanie:
claude-work      # Firmowe projekty
claude-personal  # Prywatne projekty
```

**Przełączanie w REPL:**
```bash
/logout              # Wyloguj się
/login               # Zaloguj na inne konto
/status              # Sprawdź informacje o koncie i aktualnym użytkowniku
```

---

### Zarządzanie kosztami - praktyczny przewodnik dla małych firm

#### Kalkulator kosztów (quick reference)

**Rzeczywiste koszty użytkowania (według oficjalnej dokumentacji):**

Claude Code pobiera opłaty według zużycia tokenów API. Według oficjalnych danych z Anthropic:
- **Średni koszt:** ~$6 na dewelopera dziennie
- **90% użytkowników:** poniżej $12 dziennie
- **Średni koszt miesięczny dla zespołu:** ~$100-200 na dewelopera miesięcznie przy użyciu Sonnet 4.5

**Uwaga:** Koszty mogą się znacznie różnić w zależności od:
- Ilości uruchomionych instancji
- Wykorzystania w automatyzacji
- Rozmiaru analizowanej bazy kodu
- Złożoności zapytań
- Liczby przeszukiwanych lub modyfikowanych plików

**Wniosek:** Console API (pay-as-you-go) może być **droższe** niż plan Pro ($20/mies) dla intensywnego użycia. Plan Pro oferuje przewidywalne koszty z limitami dziennymi (~500 wiadomości/dzień dla Sonnet 4.5), podczas gdy API oferuje praktycznie nielimitowane użycie, ale ze zmiennym kosztem.

---

#### Pro-tipy zarządzania kosztami

##### 1. Monitoruj zużycie po każdej sesji

```bash
> /cost

# Przykładowy output:
# Total cost:            $0.55
# Total duration (API):  6m 19.7s
# Total duration (wall): 6h 33m 10.2s
# Total code changes:    0 lines added, 0 lines removed
```

**Uwaga:** Komenda `/cost` nie jest dostępna dla użytkowników Claude Pro i Max. Jest przeznaczona tylko dla użytkowników API (Console).

Rób to po każdej dłuższej sesji (>30 min), żeby mieć kontrolę nad wydatkami.

---

##### 2. Ustaw alerty w Console

W [Console Anthropic](https://console.anthropic.com/settings/billing):
1. Przejdź do **Settings → Billing → Alerts**
2. Ustaw progi:
   - **$50** - ostrzeżenie (pierwszy alert)
   - **$100** - poważne ostrzeżenie
   - **$200** - krytyczne ostrzeżenie (rozważ blokadę)
3. Dodaj email zespołu do powiadomień

**Automatyczne tworzenie workspace:** Podczas pierwszego uwierzytelniania Claude Code z kontem Claude Console, automatycznie tworzony jest workspace o nazwie "Claude Code" służący do centralizowanego śledzenia kosztów i zarządzania użyciem w całej organizacji. Nie można tworzyć kluczy API dla tego workspace - jest on przeznaczony wyłącznie do uwierzytelniania i użycia Claude Code.

**Przykład dla małej firmy (3-5 devów):**
- Budżet miesięczny: **$300**
- Alerty: $100, $200, $280
- Każdy dev ma limit: ~$60/miesiąc

---

##### 3. Wybieraj model świadomie

Nie wszystkie zadania wymagają najdroższego modelu:

| Model | Cena (input/output za 1M tokenów) | Kiedy używać | Przykłady zadań |
|-------|-------------------|--------------|-----------------|
| **Haiku 4.5** | $1 / $5 | Proste zadania, refactoring | Code formatting, dokumentacja, proste testy |
| **Sonnet 4.5** | $3 / $15 | Większość pracy dev (optymalny) | Debugging, code review, feature development |
| **Opus 4.5** | $15 / $75 | Architektura, trudne problemy | System design, complex refactoring, migracje |

**Pro-tip:** Zacznij od Sonnet. Przełącz się na Opus tylko gdy Sonnet "nie daje rady" (np. architektura złożonych systemów).

**Uwaga o kosztach:** Aktualne ceny są dynamiczne i mogą się zmieniać. Zawsze sprawdzaj aktualne ceny w [oficjalnej dokumentacji pricing](https://docs.anthropic.com/en/docs/pricing).

---

##### 4. Kompresuj kontekst

Używaj `/compact` przed długimi sesjami, aby zmniejszyć zużycie tokenów:

```bash
# Przed sesją z długą historią:
> /compact

# Claude skompresuje poprzednie wiadomości
# Oszczędność: nawet 40-60% tokenów!
```

---

### Przykłady dla małej firmy

#### Scenariusz 1: Startup (2-3 devów)

**Konfiguracja:**
```bash
# Organization w Console
# Shared API key w 1Password/Vault
# Każdy dev ma alias:
alias claude='ANTHROPIC_API_KEY=$(op read "op://vault/claude-api/credential") claude'
```

**Budżetowanie:**
- Budżet: **$150/miesiąc**
- Alert 1: $50 (33%)
- Alert 2: $100 (66%)
- Alert 3: $140 (93%)

**Zasady:**
- Sonnet dla codziennej pracy
- Opus tylko dla code review przed release
- Haiku dla CI/CD (testy, formatowanie)

---

#### Scenariusz 2: Freelancer z kilkoma klientami

**Konfiguracja:**
```bash
# Osobne klucze per klient
alias claude-clientA='ANTHROPIC_API_KEY=$KEY_A claude'
alias claude-clientB='ANTHROPIC_API_KEY=$KEY_B claude'
alias claude-personal='ANTHROPIC_API_KEY=$KEY_PERSONAL claude'
```

**Billing:**
- Każdy klient ma osobny klucz API
- `/cost` po każdej sesji → faktura dla klienta
- Osobny klucz prywatny dla rozwoju własnych projektów

---

#### Scenariusz 3: Agencja (5-10 devów)

**Konfiguracja:**
```bash
# Organization w Console z członkami
# Budżety per-user w settings
# Shared billing → jedna faktura
```

**Monitoring:**
- Cotygodniowy raport zużycia (Console → Usage)
- Slack webhook przy przekroczeniu $500
- Monthly review: które projekty generują największe koszty

---

### Typowe błędy uwierzytelniania i rozwiązania

| Problem | Objaw | Rozwiązanie |
|---------|-------|-------------|
| **401 Unauthorized** | `Error: Invalid API key` | Sprawdź czy klucz jest poprawny i aktywny w Console |
| **429 Rate Limited** | `Error: Too many requests` | Poczekaj 60s LUB przełącz się na konto API (wyższe limity) |
| **Browser nie otwiera się** | `/login` nie przekierowuje | Skopiuj URL z terminala i otwórz ręcznie w przeglądarce |
| **Token expired** | `Error: Session expired` | Uruchom `/logout` a następnie `/login` ponownie |
| **Konto Pro nie działa** | `Error: Subscription not found` | Upewnij się że subskrypcja jest aktywna na claude.ai/account |
| **API Key w repo!** | Przypadkowy commit klucza | NATYCHMIAST: revoke key w Console, usuń z historii git |

---

### Zaawansowane scenariusze

#### CI/CD integration

Użyj API key jako GitHub Secret:

```yaml
# .github/workflows/claude.yml
- name: Run Claude Code
  env:
    ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
  run: |
    echo "Analyze code and suggest improvements" | claude -p "Analyze this code"
```

---

#### Rotacja kluczy (security best practice)

```bash
# Co 90 dni:
# 1. Wygeneruj nowy klucz w Console
# 2. Zaktualizuj wszystkie miejsca (CI/CD, local env)
# 3. Revoke stary klucz po 7 dniach grace period
```

**Pro-tip:** Dodaj reminder w kalendarzu firmowym co 90 dni: "Rotacja Claude API keys".

---

#### Sandbox testing

Rozdziel środowiska development i production:

```bash
# Development: bezpłatny limit Pro
alias claude-dev='claude'  # Używa konta Pro przez /login

# Production/CI: płatne API z wyższymi limitami
alias claude-prod='ANTHROPIC_API_KEY=$PROD_KEY claude'
```

---

### Troubleshooting zaawansowany

#### Test połączenia z API

```bash
# Sprawdź czy API działa:
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{"model":"claude-sonnet-4-5-20250929","max_tokens":10,"messages":[{"role":"user","content":"Hi"}]}'

# Jeśli zwraca 200 OK - problem jest w Claude Code, nie w API
# Jeśli zwraca 401/403 - problem z kluczem
# Jeśli timeout - problem z siecią/firewall
```

#### Debug mode

```bash
# Pokaż szczegóły requestów:
CLAUDE_DEBUG=1 claude
```

#### Diagnostyka

```bash
# Kompleksowa diagnoza:
claude doctor
```

---

## Podsumowanie

Dzisiaj nauczyłeś się:

1. **Różnicy między dwoma modelami rozliczeń:**
   - Claude.ai Pro/Max: stały koszt $20/mies (Pro), limity dzienne (~500 wiadomości dla Sonnet)
   - Console API: pay-as-you-go, brak limitów, zmienne koszty (~$100-200/mies średnio)

2. **Trzech metod uwierzytelniania:**
   - Interaktywne `/login` (najszybsze) - obsługuje zarówno Pro/Max przez Claude.ai, jak i API przez Console
   - API key w `.env` (zalecane dla projektów i zespołów)
   - Multi-account setup (prywatne vs firmowe)

3. **Jak kontrolować koszty:**
   - `/cost` po każdej sesji (tylko dla użytkowników API, nie dla Pro/Max)
   - Alerty w Console ($50, $100, $200)
   - Świadomy wybór modelu (Haiku/Sonnet/Opus)
   - `/compact` przed długimi sesjami
   - Monitoring w automatycznie tworzonym workspace "Claude Code"

4. **Best practices dla małych firm:**
   - Organization w Console dla zespołów
   - Shared billing z budżetami per-user
   - Rotacja kluczy co 90 dni
   - Osobne środowiska dev/prod

**Najważniejsze:** Wybór między Pro ($20/mies z limitami) a Console API (~$100-200/mies bez limitów) zależy od intensywności użycia. Pro oferuje przewidywalne koszty, API oferuje elastyczność bez ograniczeń.

---

## Pytania kontrolne

1. **Która metoda uwierzytelniania jest najbezpieczniejsza dla pracy zespołowej?**
   <details>
   <summary>Odpowiedź</summary>
   API key przechowywany w menedżerze haseł (np. 1Password) lub secrets manager (np. GitHub Secrets dla CI/CD). Nigdy nie commituj klucza do Git i rotuj go regularnie (co 90 dni).
   </details>

2. **Ile średnio kosztuje użycie Claude Code dla developera miesięcznie?**
   <details>
   <summary>Odpowiedź</summary>
   Według oficjalnych danych Anthropic, średni koszt to ~$100-200 na dewelopera miesięcznie przy użyciu modelu Sonnet 4.5. Średni koszt dzienny to ~$6, przy czym 90% użytkowników pozostaje poniżej $12 dziennie. Koszty mogą się znacznie różnić w zależności od intensywności użycia, rozmiaru projektu i ilości uruchomionych instancji.
   </details>

3. **Jak zabezpieczyć się przed niespodziewanymi rachunkami w Console API?**
   <details>
   <summary>Odpowiedź</summary>
   Ustaw billing alerts (np. $50, $100, $200), monitoruj zużycie komendą `/cost` po każdej sesji, używaj Sonnet zamiast Opus do rutynowych zadań, kompresuj kontekst przez `/compact`.
   </details>

---

## Zadania praktyczne

### Zadanie 1: Podstawowe uwierzytelnienie (łatwe)

1. Zaloguj się do Claude Code używając `/login`
2. Sprawdź aktywne konto komendą `/settings`
3. Uruchom sesję kodowania (dowolne zadanie)
4. Sprawdź koszty sesji komendą `/cost`
5. Zapisz screenshota wyniku w notesie

**Cel:** Nauczyć się monitorować koszty od pierwszego dnia.

---

### Zadanie 2: Konfiguracja API key (średnie)

1. Załóż konto w [Console Anthropic](https://console.anthropic.com)
2. Wygeneruj API key w Settings → Keys
3. Stwórz plik `.env` w testowym projekcie:
   ```bash
   echo "ANTHROPIC_API_KEY=sk-ant-api03-TWÓJ_KLUCZ" >> .env
   echo ".env" >> .gitignore
   ```
4. Uruchom `claude` i sprawdź czy działa bez `/login`
5. Ustaw billing alert na $10 w Console

**Cel:** Bezpieczna konfiguracja API dla projektów firmowych.

---

### Zadanie 3: Multi-account setup (zaawansowane)

1. Stwórz dwa klucze API (personal + work)
2. Zapisz je bezpiecznie:
   ```bash
   echo "sk-ant-PERSONAL" > ~/.anthropic-personal
   echo "sk-ant-WORK" > ~/.anthropic-work
   chmod 600 ~/.anthropic-*
   ```
3. Dodaj aliasy do `~/.zshrc`:
   ```bash
   alias claude-personal='ANTHROPIC_API_KEY=$(cat ~/.anthropic-personal) claude'
   alias claude-work='ANTHROPIC_API_KEY=$(cat ~/.anthropic-work) claude'
   ```
4. Przetestuj oba aliasy
5. W Console ustaw różne budżety dla obu kont

**Cel:** Profesjonalne zarządzanie wieloma kontami i budżetami.

---

## Linki do zasobów

### Oficjalna dokumentacja
- [Anthropic Console](https://console.anthropic.com) - zarządzanie API keys i billing
- [Pricing Calculator](https://docs.anthropic.com/en/docs/pricing) - kalkulator kosztów
- [API Keys Management](https://console.anthropic.com/settings/keys) - tworzenie i rotacja kluczy
- [Usage Dashboard](https://console.anthropic.com/usage) - monitoring zużycia

### Bezpieczeństwo
- [Git Secret Management](https://docs.github.com/en/actions/security-guides/encrypted-secrets) - GitHub Secrets
- [1Password CLI](https://developer.1password.com/docs/cli) - bezpieczne przechowywanie kluczy
- [git-filter-repo](https://github.com/newren/git-filter-repo) - usuwanie sekretów z historii Git

### Narzędzia do monitorowania kosztów
- [Cloud Cost Management Best Practices](https://aws.amazon.com/aws-cost-management/) - zasady optymalizacji
- [FinOps Foundation](https://www.finops.org/) - framework zarządzania kosztami cloud

### Community i support
- [Claude Discord](https://discord.gg/anthropic) - społeczność użytkowników
- [Anthropic Support](https://support.anthropic.com) - oficjalny support
- [Reddit r/ClaudeAI](https://reddit.com/r/ClaudeAI) - dyskusje i tips

---

**Następna lekcja:** Workflow i organizacja projektów - jak strukturyzować pracę z Claude Code w codziennym developmencie.

**Masz pytania?** Odpowiedz na tego maila lub dołącz do naszej społeczności na Discord!

---

Generated with Claude Code | Module 1, Lesson 3
