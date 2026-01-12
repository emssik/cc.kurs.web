---
description: Sprawdź jakość lekcji z kursu Claude Code
argument-hint: [ścieżka-do-pliku-lekcji]
---

# Walidator jakości lekcji Claude Code

## Twoje zadanie

Przeczytaj lekcję z pliku: **$ARGUMENTS**

Następnie przeprowadź kompleksową analizę jakości lekcji według poniższych kryteriów.

## Kryteria sprawdzania

### 1. TON I ZWRACANIE SIĘ DO ODBIORCY

**Sprawdź:**
- Czy lekcja konsekwentnie zwraca się do odbiorcy w **drugiej osobie liczby pojedynczej** ("nauczysz się", "zrobisz", "możesz")
- Czy ton jest bezpośredni i angażujący
- Czy unika się bezosobowych form ("można", "należy", "powinno się")

**Wyszukaj przykłady:**
- ✅ Dobre: "Dzisiaj nauczysz się...", "Uruchomisz...", "Sprawdzisz..."
- ❌ Złe: "Można nauczyć się...", "Należy uruchomić...", "Powinno się sprawdzić..."

---

### 2. ORYGINALNOŚĆ TREŚCI (vs. dokumentacja)

Dokumentację Claude Code znajdziesz w ai_docs/claude_code

**Sprawdź:**
- Czy lekcja **przekazuje wiedzę praktyczną** opartą na doświadczeniu, a nie tylko przepisuje dokumentację
- Czy zawiera **osobiste spostrzeżenia**, war stories, "pro-tipy" z praktyki
- Czy instrukcje techniczne zawierają **odniesienia do dokumentacji** zamiast dosłownego przepisywania
- Czy autor wyjaśnia **"dlaczego"** i **"kiedy"**, a nie tylko **"jak"**

**Pożądane elementy:**
- ✅ "Z mojego doświadczenia...", "W praktyce zauważyłem...", "Pro-tip: ..."
- ✅ Odniesienia: "Szczegóły znajdziesz w [dokumentacji](link)"
- ✅ Kontekst: "To przydatne, gdy...", "Używaj tego, jeśli..."
- ❌ Przepisywanie całych sekcji z dokumentacji bez własnego komentarza
- ❌ Brak kontekstu - same suche instrukcje

**Zidentyfikuj fragmenty podejrzane o bycie przepisaną dokumentacją:**
- Zbyt techniczny język
- Brak osobistego tonu
- Długie sekcje bez kontekstu praktycznego

---

### 3. JAKOŚĆ I RÓŻNORODNOŚĆ PRZYKŁADÓW

**Sprawdź przykłady pod kątem:**

#### A) Poprawność techniczna
- Czy przykłady kodu są **działające** i **aktualne**
- Czy komendy są poprawne
- Czy ścieżki/konfiguracje są realistyczne

#### B) Ciekawość i wartość edukacyjna
- Czy przykłady są **praktyczne** i rozwiązują realne problemy
- Czy pokazują **typowe use case'y** z życia
- Czy są **zrozumiałe** bez nadmiernego uproszczenia

#### C) Różnorodność odbiorców
**KLUCZOWE:** Claude Code to narzędzie dla **każdego białego kołnierzyka**, nie tylko programistów!

**Sprawdź, czy lekcja zawiera przykłady dla różnych grup:**
- ✅ **Programiści:** debugging, refactoring, code review
- ✅ **Marketerzy:** analiza kampanii, copywriting, planowanie contentu
- ✅ **Project managerzy:** planowanie projektów, retrospektywy, risk analysis
- ✅ **Pisarze/kreatywni:** pisanie artykułów, wierszy, scenariuszy
- ✅ **Analitycy biznesowi:** analiza danych, raporty, prezentacje
- ✅ **HR/rekruterzy:** screaning CV, przygotowanie ogłoszeń
- ✅ **Nauczyciele:** przygotowanie materiałów, planów lekcji
- ✅ **Freelancerzy:** fakturowanie, planowanie czasu, oferty dla klientów

**Oceń:**
- Czy przykłady są **zbyt programistyczne**?
- Czy lekcja pokazuje **szersze zastosowania** Claude Code?
- Czy językiem zrozumieją **osoby nietechniczne**?

---

### 4. PROSTOTA I PRZYSTĘPNOŚĆ JĘZYKA

**Sprawdź:**
- Czy język jest **prosty i zrozumiały** dla osoby bez background'u technicznego
- Czy unika się **zbędnego żargonu** (jeśli żargon jest konieczny, czy jest wyjaśniony?)
- Czy zdania są **krótkie i konkretne**
- Czy struktura jest **logiczna** (nagłówki, listy, przykłady)
- Czy wizualna hierarchia pomaga w nawigacji (pogrubienia, kursywy, listy)

**Pułapki do wykrycia:**
- ❌ Nadmiar skrótów bez wyjaśnienia (API, CLI, CI/CD bez kontekstu)
- ❌ Zbyt długie zdania złożone
- ❌ Nadmierna techniczność bez potrzeby
- ❌ Założenie wiedzy, której czytelnik może nie mieć

**Przykład prostego języka:**
- ✅ "Claude Code to narzędzie w terminalu, które pomaga Ci w pracy"
- ❌ "Claude Code to CLI-based AI-powered development environment z agentic capabilities"

---

### 5. SŁOWNICZEK TERMINÓW

**Sprawdź:**
- Czy lekcja zawiera **słowniczek** trudniejszych terminów?
- Czy terminy techniczne są **wyjaśniane przy pierwszym użyciu**?
- Czy wyjaśnienia są **przystępne** dla osób nietechnicznych?

**Lokalizacja słowniczka:**
- Na końcu lekcji (sekcja "Słowniczek")
- LUB inline w tekście (przy pierwszym użyciu terminu)
- LUB w przypis/tooltip

**Terminy wymagające wyjaśnienia (przykłady):**
- API, CLI, token, workspace, rate limit, CI/CD, REPL
- Git, branch, commit, push, pull
- SSH,環境變數, endpoint, payload
- Billing, usage, pricing tier

---

## Format raportu

Po przeczytaniu lekcji, wygeneruj raport w następującym formacie:

```markdown
# Raport walidacji lekcji

**Lekcja:** [tytuł i ścieżka]

---

## 1. TON I ZWRACANIE SIĘ DO ODBIORCY

**Ocena:** ✅ / ⚠️ / ❌

**Uwagi:**
- [Lista znalezionych problemów lub potwierdzenie poprawności]
- [Przykłady błędnych form, jeśli występują]

**Sugestie poprawek:**
- [Konkretne fragmenty do poprawy]

---

## 2. ORYGINALNOŚĆ TREŚCI

**Ocena:** ✅ / ⚠️ / ❌

**Uwagi:**
- [Czy lekcja opiera się na doświadczeniu czy przepisuje dokumentację?]
- [Lista sekcji podejrzanych o przepisanie dokumentacji]

**Fragmenty wymagające przeróbki:**
- [Konkretne sekcje z linijkami]

**Sugestie:**
- [Jak dodać osobisty kontekst i doświadczenie]

---

## 3. JAKOŚĆ I RÓŻNORODNOŚĆ PRZYKŁADÓW

### A) Poprawność techniczna
**Ocena:** ✅ / ⚠️ / ❌
- [Czy przykłady są poprawne technicznie?]
- [Lista błędów, jeśli występują]

### B) Ciekawość i wartość
**Ocena:** ✅ / ⚠️ / ❌
- [Czy przykłady są ciekawe i praktyczne?]
- [Sugestie lepszych przykładów]

### C) Różnorodność odbiorców
**Ocena:** ✅ / ⚠️ / ❌

**Grupy zawodowe reprezentowane:**
- [Lista grup: programiści, marketerzy, PM, pisarze, etc.]

**Brakujące grupy:**
- [Kogo brakuje?]

**Sugestie nowych przykładów:**
- [Dla marketerów: ...]
- [Dla PM: ...]
- [Dla pisarzy: ...]

---

## 4. PROSTOTA I PRZYSTĘPNOŚĆ JĘZYKA

**Ocena:** ✅ / ⚠️ / ❌

**Uwagi:**
- [Czy język jest przystępny dla osób nietechnicznych?]
- [Lista fragmentów zbyt technicznych]

**Terminy wymagające uproszczenia:**
- [Lista z proponowanymi zamianami]

**Sugestie poprawek:**
- [Konkretne przepisane fragmenty]

---

## 5. SŁOWNICZEK TERMINÓW

**Ocena:** ✅ / ⚠️ / ❌

**Status:**
- [Czy słowniczek istnieje?]
- [Czy jest kompletny?]

**Terminy bez wyjaśnienia:**
- [Lista terminów technicznych użytych bez definicji]

**Proponowany słowniczek (jeśli brakuje):**
```
### Słowniczek

**API (Application Programming Interface)**
Interfejs, który pozwala różnym programom rozmawiać ze sobą. W przypadku Claude Code - sposób, w jaki Twoje narzędzie łączy się z serwerami Anthropic.

**[kolejne terminy]**
```

---

## OCENA KOŃCOWA

**Status:** ✅ GOTOWA / ⚠️ WYMAGA POPRAWEK / ❌ WYMAGA ZNACZĄCYCH ZMIAN

**Podsumowanie:**
[2-3 zdania o ogólnej jakości lekcji]

**Kluczowe akcje:**
1. [Najważniejsza rzecz do poprawy]
2. [Druga w kolejności]
3. [Trzecia w kolejności]

---

## PRZYKŁADY POPRAWEK (opcjonalnie)

[Jeśli ocena to ⚠️ lub ❌, pokaż 1-2 przykłady przepisanych fragmentów demonstrujących pożądany styl]

### Przed:
```
[Fragment oryginalny]
```

### Po:
```
[Fragment poprawiony]
```

**Dlaczego lepiej:**
[Krótkie wyjaśnienie]

```

---

## Dodatkowe wytyczne

1. **Bądź konstruktywny:** Zawsze zaproponuj konkretne poprawki, nie tylko krytykuj
2. **Priorytetyzuj:** Wskaż, co jest najważniejsze do poprawy
3. **Cytuj konkretne fragmenty:** Użyj numerów linii z Read tool
4. **Bądź szczegółowy:** Nie pisz ogólnie "brak przykładów dla marketerów" - zaproponuj konkretny przykład
5. **Zachowaj ton pomocny:** Pamiętaj, że oceniasz pracę kolegi, który chce się rozwijać

---

## Rozpocznij analizę

Przeczytaj teraz plik lekcji ze ścieżki **$ARGUMENTS** i przeprowadź pełną analizę według powyższych kryteriów.
