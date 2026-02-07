---
description: Sprawdź jakość lekcji z kursu Claude Code
argument-hint: [ścieżka-do-pliku-lekcji]
model: Sonnet
---

# Walidator jakości lekcji Claude Code (wersja równoległa)

## Twoje zadanie

Przeczytaj lekcję z pliku: **$ARGUMENTS** i przeprowadź kompleksową analizę jakości używając 4 równoległych agentów.

---

## KROK 1: Przeczytaj lekcję i wyekstrahuj metadane

Użyj Read tool, aby przeczytać lekcję z: **$ARGUMENTS**

Po przeczytaniu, wyekstrahuj:

1. **Główne tematy** - do sprawdzenia w changelog (np. "hooks", "MCP", "permissions", "sandbox")
2. **Linki do dokumentacji** - wszystkie URLe do code.claude.com/docs/
3. **Terminy techniczne** - słowa wymagające słowniczka (API, CLI, token, itp.)
4. **Grupy odbiorców** - dla kogo są przykłady w lekcji

Zapisz te informacje - przekażesz je agentom.

---

## KROK 2: Uruchom 4 agenty równolegle

**WAŻNE:** Użyj Task tool z **4 równoległymi wywołaniami** w jednej wiadomości.

Każdy agent otrzymuje:
- Pełną treść lekcji (skopiuj ją do promptu)
- Ścieżkę do pliku: **$ARGUMENTS**
- Swoją specyficzną instrukcję

---

### Agent 1: AKTUALNOŚĆ

```
subagent_type: general-purpose
description: Check lesson freshness
```

**Prompt dla agenta:**

```
# Agent AKTUALNOŚĆ - Sprawdź aktualność lekcji

## Twoje zadanie
Sprawdź czy poniższa lekcja jest aktualna względem changelog i dokumentacji Claude Code.

## Lekcja do sprawdzenia
Ścieżka: [WSTAW ŚCIEŻKĘ]

[WSTAW PEŁNĄ TREŚĆ LEKCJI]

## Główne tematy do sprawdzenia w changelog
[WSTAW LISTĘ TEMATÓW Z KROKU 1]

## Instrukcje

### 1. Pobierz changelog
Użyj WebFetch na: https://code.claude.com/docs/en/changelog

Szukaj:
- Nowych funkcjonalności dotyczących tematów z lekcji
- Zmian w istniejących funkcjach opisanych w lekcji
- Deprecjacji lub usunięcia funkcji
- Zmian w składni komend, flagach, opcjach

### 2. Zweryfikuj z dokumentacją
Jeśli changelog wskazuje na zmiany, użyj WebFetch na odpowiednie strony:
- https://code.claude.com/docs/en/overview
- https://code.claude.com/docs/en/security
- https://code.claude.com/docs/en/settings
- https://code.claude.com/docs/en/memory
- https://code.claude.com/docs/en/hooks-guide
- https://code.claude.com/docs/en/mcp-overview

### 3. Wygeneruj raport

## RAPORT: AKTUALNOŚĆ

**Ocena:** ✅ / ⚠️ / ❌

**Sprawdzony changelog:**
- Data ostatniego wpisu: [data]
- Zmiany istotne dla tej lekcji: [tak/nie]

**Nieaktualne fragmenty:**

### Linia X: [cytat]
- **Problem:** [co się zmieniło]
- **Źródło:** [link]
- **Poprawka:** [treść]

**Nowe funkcjonalności do uwzględnienia:**
- [Lista funkcji z changelogu wartych dodania]

**Status:** Lekcja jest aktualna / Wymaga aktualizacji X fragmentów
```

---

### Agent 2: STYL

```
subagent_type: general-purpose
description: Check style and formatting
```

**Prompt dla agenta:**

```
# Agent STYL - Sprawdź jakość stylistyczną

## Twoje zadanie
Sprawdź jakość stylistyczną i formatowanie poniższej lekcji.

## Lekcja do sprawdzenia
Ścieżka: [WSTAW ŚCIEŻKĘ]

[WSTAW PEŁNĄ TREŚĆ LEKCJI]

## Kryteria do sprawdzenia

### KRYTERIUM 1: TON I ZWRACANIE SIĘ DO ODBIORCY

**Sprawdź:**
- Czy lekcja konsekwentnie zwraca się w **drugiej osobie liczby pojedynczej** ("nauczysz się", "zrobisz", "możesz")
- Czy ton jest bezpośredni i angażujący
- Czy unika się bezosobowych form ("można", "należy", "powinno się")

**Szukaj:**
- ✅ Dobre: "Dzisiaj nauczysz się...", "Uruchomisz...", "Sprawdzisz..."
- ❌ Złe: "Można nauczyć się...", "Należy uruchomić...", "Powinno się sprawdzić..."

---

### KRYTERIUM 4: PROSTOTA I PRZYSTĘPNOŚĆ JĘZYKA

**Sprawdź:**
- Czy język jest **prosty i zrozumiały** dla osoby bez background'u technicznego
- Czy unika się **zbędnego żargonu** (jeśli żargon jest konieczny, czy jest wyjaśniony?)
- Czy zdania są **krótkie i konkretne**
- Czy struktura jest **logiczna** (nagłówki, listy, przykłady)

**Pułapki:**
- ❌ Nadmiar skrótów bez wyjaśnienia (API, CLI, CI/CD bez kontekstu)
- ❌ Zbyt długie zdania złożone
- ❌ Nadmierna techniczność bez potrzeby

---

### KRYTERIUM 5: SŁOWNICZEK TERMINÓW

**Sprawdź:**
- Czy lekcja zawiera **słowniczek** trudniejszych terminów?
- Czy terminy techniczne są **wyjaśniane przy pierwszym użyciu**?

**Terminy wymagające wyjaśnienia (przykłady):**
- API, CLI, token, workspace, rate limit, CI/CD, REPL
- Git, branch, commit, push, pull
- SSH, endpoint, payload

---

### KRYTERIUM 7: FORMAT I PREZENTACJA TREŚCI (email-friendly)

**Sprawdź:**
- Czy lekcja **unika skomplikowanych tabelek markdown** z wieloma kolumnami (4+)
- Czy informacje są prezentowane w formacie **przyjaznym dla maili HTML**

**Problem z tabelami:**
Tabele markdown (szczególnie z 4+ kolumnami) źle się przenoszą do HTML i wyglądają fatalnie w mailach.

**❌ UNIKAJ:**
```markdown
| Tryb | Co robi | Kiedy używać | Dla kogo |
```

**✅ ZAMIAST TEGO:**
```markdown
### default
**Co robi:** Pyta o zgodę przy pierwszym użyciu
**Kiedy używać:** Większość przypadków
```

---

### KRYTERIUM 8: JĘZYK PRZYKŁADÓW KOMEND

**Sprawdź:**
- Czy **wszystkie przykłady custom commands/skills są w pełni po angielsku**
- Czy **treść narracji i wyjaśnień jest po polsku**

**Zasada:**
- ✅ **Po angielsku:** Kod komend, nagłówki wewnątrz komend (Step 1, Phase 2), komunikaty błędów w przykładach, komentarze w kodzie, symulacje odpowiedzi Claude w przykładach
- ✅ **Po polsku:** Narracja, wyjaśnienia między przykładami, opisy "Dlaczego?", słowniczek

**❌ ŹLEŹLE (mieszanka języków):**
```markdown
## Faza 1: Walidacja

1. Sprawdź czy plik istnieje
2. If file not found: Pokaż błąd
```

**✅ DOBRZE (przykład po angielsku, narracja po polsku):**
```markdown
Sara dodała walidację:

## Phase 1: Validation

1. Check if file exists
2. If file not found: Show error
```

**Szukaj:**
- Polskich nagłówków w przykładach komend (np. "Faza", "Krok", "Zadanie")
- Polskich komentarzy w nawiasach wewnątrz przykładów
- Polskich komunikatów błędów w przykładach
- Mieszanek języków w jednym bloku kodu

**Użyj Grep** aby znaleźć podejrzane fragmenty:
- `Faza [0-9]` lub `Krok [0-9]` w blokach markdown
- Polskie słowa w blokach kodów komend

---

## RAPORT: STYL

### 1. TON I ZWRACANIE SIĘ DO ODBIORCY
**Ocena:** ✅ / ⚠️ / ❌
**Uwagi:** [lista problemów lub OK]
**Sugestie:** [konkretne poprawki]

### 4. PROSTOTA I PRZYSTĘPNOŚĆ JĘZYKA
**Ocena:** ✅ / ⚠️ / ❌
**Uwagi:** [lista problemów]
**Terminy do uproszczenia:** [lista]

### 5. SŁOWNICZEK TERMINÓW
**Ocena:** ✅ / ⚠️ / ❌
**Status:** [czy istnieje, czy kompletny]
**Terminy bez wyjaśnienia:** [lista]
**Proponowany słowniczek:** [jeśli brakuje]

### 7. FORMAT I PREZENTACJA
**Ocena:** ✅ / ⚠️ / ❌
**Tabele do przepisania:** [lista z numerami linii]
**Sugestie alternatywnych formatów:** [przykłady]

### 8. JĘZYK PRZYKŁADÓW KOMEND
**Ocena:** ✅ / ⚠️ / ❌
**Przykłady z polskimi elementami:** [lista z numerami linii]
**Fragmenty do przepisania:** [konkretne miejsca]
**Uwagi:** [czy narracja jest po polsku, czy przykłady po angielsku]
```

---

### Agent 3: TECHNIKA

```
subagent_type: general-purpose
description: Check technical accuracy
```

**Prompt dla agenta:**

```
# Agent TECHNIKA - Sprawdź poprawność techniczną

## Twoje zadanie
Sprawdź poprawność techniczną, oryginalność i jakość przykładów w poniższej lekcji.

## Lekcja do sprawdzenia
Ścieżka: [WSTAW ŚCIEŻKĘ]

[WSTAW PEŁNĄ TREŚĆ LEKCJI]

## Dostępna dokumentacja
Przeczytaj pliki z katalogu ai_docs/claude_code aby porównać z lekcją.

## Kryteria do sprawdzenia

### KRYTERIUM 2: ORYGINALNOŚĆ TREŚCI (vs. dokumentacja)

**Sprawdź:**
- Czy lekcja **przekazuje wiedzę praktyczną** opartą na doświadczeniu, a nie tylko przepisuje dokumentację
- Czy zawiera **osobiste spostrzeżenia**, war stories, "pro-tipy"
- Czy autor wyjaśnia **"dlaczego"** i **"kiedy"**, a nie tylko **"jak"**

**Pożądane elementy:**
- ✅ "Z mojego doświadczenia...", "W praktyce zauważyłem...", "Pro-tip: ..."
- ✅ Odniesienia: "Szczegóły znajdziesz w [dokumentacji](link)"
- ❌ Przepisywanie całych sekcji z dokumentacji bez własnego komentarza

**Zidentyfikuj fragmenty podejrzane o bycie przepisaną dokumentacją:**
- Zbyt techniczny język
- Brak osobistego tonu
- Długie sekcje bez kontekstu praktycznego

---

### KRYTERIUM 3: JAKOŚĆ I RÓŻNORODNOŚĆ PRZYKŁADÓW

#### A) Poprawność techniczna
- Czy przykłady kodu są **działające** i **aktualne**
- Czy komendy są poprawne
- Czy ścieżki/konfiguracje są realistyczne

#### B) Ciekawość i wartość edukacyjna
- Czy przykłady są **praktyczne** i rozwiązują realne problemy
- Czy pokazują **typowe use case'y** z życia

#### C) Różnorodność odbiorców
**KLUCZOWE:** Claude Code to narzędzie dla **każdego białego kołnierzyka**, nie tylko programistów!

**Sprawdź, czy lekcja zawiera przykłady dla różnych grup:**
- ✅ Programiści: debugging, refactoring, code review
- ✅ Marketerzy: analiza kampanii, copywriting, planowanie contentu
- ✅ Project managerzy: planowanie projektów, retrospektywy
- ✅ Pisarze/kreatywni: pisanie artykułów, wierszy, scenariuszy
- ✅ Analitycy biznesowi: analiza danych, raporty, prezentacje
- ✅ HR/rekruterzy: screening CV, przygotowanie ogłoszeń

---

### KRYTERIUM 6: POPRAWNOŚĆ LINKÓW DO DOKUMENTACJI

**Sprawdź:**
- Czy wszystkie linki do dokumentacji Claude Code zawierają **`/en/`** w ścieżce
- Format poprawny: `https://code.claude.com/docs/en/[ścieżka]`
- Format błędny: `https://code.claude.com/docs/[ścieżka]` (brak `/en/`)

**Użyj Grep** aby znaleźć wszystkie wystąpienia `https://code.claude.com/docs/`

---

## RAPORT: TECHNIKA

### 2. ORYGINALNOŚĆ TREŚCI
**Ocena:** ✅ / ⚠️ / ❌
**Uwagi:** [czy opiera się na doświadczeniu czy przepisuje docs]
**Fragmenty podejrzane o przepisanie:** [lista z linijkami]
**Sugestie:** [jak dodać osobisty kontekst]

### 3. JAKOŚĆ I RÓŻNORODNOŚĆ PRZYKŁADÓW

**A) Poprawność techniczna**
**Ocena:** ✅ / ⚠️ / ❌
**Błędy:** [lista]

**B) Ciekawość i wartość**
**Ocena:** ✅ / ⚠️ / ❌
**Sugestie lepszych przykładów:** [lista]

**C) Różnorodność odbiorców**
**Ocena:** ✅ / ⚠️ / ❌
**Grupy reprezentowane:** [lista]
**Brakujące grupy:** [lista]
**Propozycje przykładów dla brakujących grup:** [konkretne przykłady]

### 6. POPRAWNOŚĆ LINKÓW
**Ocena:** ✅ / ⚠️ / ❌
**Linki bez /en/:** [lista z numerami linii]
**Poprawki:** [stary → nowy]
```

---

### Agent 4: ŹRÓDŁA

```
subagent_type: general-purpose
description: Find external sources
```

**Prompt dla agenta:**

```
# Agent ŹRÓDŁA - Znajdź wartościowe źródła zewnętrzne

## Twoje zadanie
Wyszukaj w internecie wartościowe treści związane z tematami poniższej lekcji i zaproponuj rozbudowanie contentu.

## Lekcja do sprawdzenia
Ścieżka: [WSTAW ŚCIEŻKĘ]

[WSTAW PEŁNĄ TREŚĆ LEKCJI]

## Główne tematy do wyszukania
[WSTAW LISTĘ TEMATÓW Z KROKU 1]

## Instrukcje

### 1. Zidentyfikuj główne koncepcje z lekcji

### 2. Użyj WebSearch, aby znaleźć:
- Artykuły eksperckie i tutoriale
- Case studies i przykłady zastosowań
- Aktualne best practices
- Ciekawe statystyki lub badania
- Wypowiedzi ekspertów z branży

### 3. Użyj WebFetch na najciekawsze źródła

### 4. Zaproponuj konkretne rozszerzenia treści

**Czego szukać:**
- ✅ Praktyczne przykłady z życia (jak firmy/ludzie używają podobnych narzędzi)
- ✅ Statystyki i dane wspierające argumenty lekcji
- ✅ Cytaty ekspertów dodające wiarygodności
- ✅ Alternatywne perspektywy i podejścia
- ✅ Aktualne trendy i nowości w temacie

**Czego unikać:**
- ❌ Treści reklamowe i promocyjne
- ❌ Nieaktualne informacje (sprawdź daty publikacji)
- ❌ Źródła o niskiej wiarygodności

---

## RAPORT: ŹRÓDŁA ZEWNĘTRZNE

**Wyszukane tematy:**
- [lista tematów]

**Znalezione wartościowe źródła:**

### Źródło 1: [Tytuł]
- **URL:** [link]
- **Wartość:** [co ciekawego zawiera]
- **Propozycja użycia:** [gdzie i jak wpleść do lekcji]
- **Cytat/fakt:** [konkretny fragment do wykorzystania]

### Źródło 2: [Tytuł]
...

**Proponowane rozszerzenia lekcji:**
1. [Konkretna propozycja]
2. [Kolejna propozycja]
3. [...]
```

---

## KROK 3: Zbierz wyniki i wygeneruj raport końcowy

Po zakończeniu wszystkich 4 agentów, połącz ich raporty w jeden końcowy raport:

```markdown
# Raport walidacji lekcji

**Lekcja:** [tytuł i ścieżka]
**Data sprawdzenia:** [data]

---

## 0. AKTUALNOŚĆ TREŚCI
[Wklej raport od Agenta AKTUALNOŚĆ]

---

## 1. TON I ZWRACANIE SIĘ DO ODBIORCY
[Wklej sekcję 1 od Agenta STYL]

---

## 2. ORYGINALNOŚĆ TREŚCI
[Wklej sekcję 2 od Agenta TECHNIKA]

---

## 3. JAKOŚĆ I RÓŻNORODNOŚĆ PRZYKŁADÓW
[Wklej sekcję 3 od Agenta TECHNIKA]

---

## 4. PROSTOTA I PRZYSTĘPNOŚĆ JĘZYKA
[Wklej sekcję 4 od Agenta STYL]

---

## 5. SŁOWNICZEK TERMINÓW
[Wklej sekcję 5 od Agenta STYL]

---

## 6. POPRAWNOŚĆ LINKÓW
[Wklej sekcję 6 od Agenta TECHNIKA]

---

## 7. FORMAT I PREZENTACJA
[Wklej sekcję 7 od Agenta STYL]

---

## 8. JĘZYK PRZYKŁADÓW KOMEND
[Wklej sekcję 8 od Agenta STYL]

---

## 9. WZBOGACENIE TREŚCI
[Wklej raport od Agenta ŹRÓDŁA]

---

## OCENA KOŃCOWA

**Status:** ✅ GOTOWA / ⚠️ WYMAGA POPRAWEK / ❌ WYMAGA ZNACZĄCYCH ZMIAN

**Podsumowanie:**
[2-3 zdania o ogólnej jakości lekcji]

**Kluczowe akcje:**
1. [Najważniejsza rzecz do poprawy]
2. [Druga w kolejności]
3. [Trzecia w kolejności]
```

---

## Dodatkowe wytyczne

1. **Bądź konstruktywny:** Zawsze zaproponuj konkretne poprawki, nie tylko krytykuj
2. **Priorytetyzuj:** Wskaż, co jest najważniejsze do poprawy
3. **Cytuj konkretne fragmenty:** Użyj numerów linii
4. **Bądź szczegółowy:** Nie pisz ogólnie - zaproponuj konkretne przykłady
5. **Zachowaj ton pomocny:** Pamiętaj, że oceniasz pracę kolegi

---

## Rozpocznij analizę

1. Przeczytaj lekcję z: **$ARGUMENTS**
2. Wyekstrahuj metadane (tematy, linki, terminy)
3. Uruchom 4 agenty równolegle (WAŻNE: jedno wywołanie Task tool z 4 agentami!)
4. Zbierz wyniki i wygeneruj końcowy raport
