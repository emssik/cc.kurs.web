---
title: "Czym są Agents"
description: "Poznaj system Agents - wyspecjalizowanych asystentów AI w Claude Code"
duration: 12
difficulty: beginner
tags: [agents, task, delegation, automation]
---

# Czym są Agents

## Wprowadzenie

Agents to wyspecjalizowani asystenci AI w Claude Code. Każdy agent jest ekspertem w konkretnej dziedzinie i może autonomicznie wykonywać złożone zadania. To jak posiadanie zespołu specjalistów dostępnych na żądanie.

## Dlaczego to ważne?

Agents to:
- **Specjalizacja:** Eksperci w swoich dziedzinach
- **Autonomia:** Pracują samodzielnie, zwracają rezultat
- **Efektywność:** Szybsze wykonanie specjalistycznych zadań
- **Kontekst:** Rozumieją best practices swojej domeny

## Jak działają Agents?

### Bez Agents - Bezpośrednia rozmowa

```
Ty: Napisz testy dla tej funkcji
Claude Code: [pisze testy]

Ty: Zrefaktoryzuj ten kod
Claude Code: [refaktoryzuje]

Ty: Dodaj dokumentację
Claude Code: [dodaje docs]
```

### Z Agents - Delegacja do ekspertów

```
Ty: Użyj agent uni-tester do napisania kompleksowych testów
[Agent uni-tester pracuje autonomicznie]
[Zwraca kompletne testy z pokryciem]

Ty: Użyj agent code-reviewer do review kodu
[Agent code-reviewer analizuje kod]
[Zwraca raport z sugestiami]
```

## Główni Agents w Claude Code

### 1. Exploration & Planning

**Explore Agent**
- Specjalizacja: Szybka eksploracja kodu
- Kiedy: "Znajdź wszystkie użycia funkcji X"

**Plan Agent**
- Specjalizacja: Planowanie implementacji
- Kiedy: "Zaplanuj, jak dodać funkcję Y"

### 2. Development

**test-first-developer Agent**
- Specjalizacja: TDD (Test-Driven Development)
- Kiedy: Tworzenie kodu z testami od początku

**refactoring-master Agent**
- Specjalizacja: Bezpieczny refactoring
- Kiedy: Przepisywanie kodu z testami

### 3. Quality Assurance

**uni-tester Agent**
- Specjalizacja: Kompleksowe testowanie
- Kiedy: Tworzenie testów jednostkowych i integracyjnych

**code-reviewer Agent**
- Specjalizacja: Code review (KISS, DRY)
- Kiedy: Analiza jakości kodu

**quality-gate-tester Agent**
- Specjalizacja: Testy integracyjne i E2E
- Kiedy: Przed pull requestem

### 4. Architecture & Security

**chief-architect Agent**
- Specjalizacja: Projektowanie architektury
- Kiedy: Planowanie dużych funkcjonalności

**security-guardian Agent**
- Specjalizacja: Bezpieczeństwo aplikacji
- Kiedy: Audyt bezpieczeństwa kodu

**database-architect Agent**
- Specjalizacja: Projektowanie baz danych
- Kiedy: Schemat DB, optymalizacja

### 5. Debugging & Performance

**debugger-detective Agent**
- Specjalizacja: Znajdowanie i naprawianie bugów
- Kiedy: Debugging trudnych problemów

**performance-optimizer Agent**
- Specjalizacja: Optymalizacja wydajności
- Kiedy: Kod jest wolny, optymalizacja potrzebna

### 6. Documentation

**documentation-writer Agent**
- Specjalizacja: Pisanie dokumentacji
- Kiedy: Tworzenie README, API docs

## Korzyści z używania Agents

### 1. Specjalistyczna wiedza

**Bez Agents:**
```
Ty: Napisz testy
Claude Code: [podstawowe testy]
```

**Z Agents:**
```
Ty: Użyj uni-tester do testów
uni-tester: [testy + edge cases + mocki + integracyjne]
```

### 2. Konsystencja

Agents stosują te same best practices za każdym razem.

### 3. Oszczędność tokenów

Agent pracuje w osobnej sesji - nie zużywa Twoich tokenów na wewnętrzne rozumowanie.

### 4. Równoległość

Możesz uruchomić wiele agents jednocześnie:

```
Ty: Uruchom równolegle:
- code-reviewer dla analiz kodu
- uni-tester dla testów
```

### 5. Fokus na rezultacie

Agent zwraca tylko finalny rezultat, nie szczegóły implementacji.

## Kiedy NIE używać Agents?

### ❌ Dla prostych zadań

```
❌ Użyj Explore do znalezienia jednego pliku
✅ Znajdź plik X (Claude Code użyje Glob bezpośrednio)
```

### ❌ Gdy chcesz kontrolować każdy krok

```
❌ Agent - pokażę Ci każdy krok
✅ Bezpośrednia rozmowa
```

### ❌ Dla interaktywnych zadań

Agents pracują autonomicznie - nie mogą zadawać pytań w trakcie.

## Podstawowe użycie Agents

### Składnia

```
Ty: Użyj [agent-name] do [zadanie]
```

Przykłady:
```
Użyj code-reviewer do przeglądu pliku user.js
Użyj uni-tester do stworzenia testów dla auth module
Użyj debugger-detective do znalezienia buga w calculateTotal
```

### Claude Code automatycznie:

1. Wybiera odpowiedniego agenta (jeśli pasuje)
2. Przygotowuje kontekst
3. Uruchamia agenta
4. Czeka na rezultat
5. Prezentuje Ci wynik

## Przykłady praktyczne

### Przykład 1: Testowanie

**Bez Agents:**
```
Ty: Dodaj testy dla calculator.js
Claude Code: [dodaje podstawowe testy]
```

**Z Agents:**
```
Ty: Użyj uni-tester do testowania calculator.js
uni-tester:
- Testy jednostkowe dla każdej funkcji
- Edge cases (dzielenie przez 0, itp.)
- Testy integracyjne
- Pokrycie 100%
```

### Przykład 2: Code Review

```
Ty: Użyj code-reviewer do przeglądu auth module

code-reviewer:
✓ Przeanalizowałem src/auth/

Sugestie:
1. Funkcja login() ma 45 linii - rozważ dekompozycję (KISS)
2. Walidacja email jest duplikowana w 3 miejscach (DRY)
3. Brak obsługi błędów w logout()

Szczegóły: [link do pliku z kodem]
```

### Przykład 3: Refactoring

```
Ty: Użyj refactoring-master do poprawy user.js

refactoring-master:
1. Przeczytałem user.js
2. Uruchomiłem testy (wszystkie przeszły)
3. Zrefaktoryzowałem:
   - Wydzieliłem walidację do osobnej funkcji
   - Uprościłem logikę w getUser()
   - Poprawiłem nazewnictwo zmiennych
4. Uruchomiłem testy ponownie (wszystkie przeszły)
✓ Refactoring ukończony
```

## Zadanie praktyczne

### Zadanie 1: Explore Agent

```
Ty: Stwórz projekt z kilkoma plikami używającymi funkcji fetchData

Ty: Użyj Explore agent do znalezienia wszystkich użyć fetchData
```

**Rezultat:** Agent znajdzie i pokaże wszystkie miejsca.

### Zadanie 2: uni-tester Agent

```
Ty: Mam plik utils/helpers.js z funkcjami. Użyj uni-tester do stworzenia testów
```

**Rezultat:** Kompletne testy z edge cases.

### Zadanie 3: code-reviewer Agent

```
Ty: Użyj code-reviewer do przeglądu mojego kodu w src/
```

**Rezultat:** Raport z sugestiami poprawy.

### Zadanie 4: Porównanie

Wykonaj to samo zadanie dwa razy:
1. Bez agenta - bezpośrednia rozmowa
2. Z agentem

Porównaj:
- Jakość rezultatu
- Czas wykonania
- Kompletność

## Best Practices

### 1. Wybierz właściwego agenta

```
✓ uni-tester dla testów
✓ code-reviewer dla review
✗ Explore do tworzenia kodu (nie jego specjalność)
```

### 2. Daj jasne instrukcje

```
❌ Użyj agenta do czegoś
✅ Użyj uni-tester do stworzenia testów dla modułu auth
```

### 3. Przygotuj kontekst

Jeśli agent potrzebuje specyficznych informacji, podaj je:

```
Użyj code-reviewer dla src/api/
Zwróć uwagę na bezpieczeństwo i obsługę błędów
```

### 4. Weryfikuj rezultaty

Agents są inteligentne, ale weryfikuj wyniki:

```
Ty: Pokaż mi wygenerowane testy
Ty: Uruchom testy
```

## Jak Claude Code może Ci pomóc?

```
Jacy agents są dostępni?
Którego agenta użyć do zadania X?
Pokaż przykłady użycia agent Y
Jak działa agent Z?
```

## Dodatkowe materiały

### Dokumentacja
- [Agents Overview](https://docs.claude.com/en/docs/claude-code/agents)
- [Task Tool Reference](https://docs.claude.com/en/docs/claude-code/tools/task)

## Podsumowanie

Nauczyłeś się:
- Czym są Agents i jak działają
- Jakie kategorie agents istnieją
- Kiedy używać agents vs bezpośrednia rozmowa
- Podstawowej składni używania agents
- Best practices dla pracy z agents

W następnej lekcji szczegółowo poznasz Task Tool - narzędzie do uruchamiania agents!

---

**Ilustracje:** (do dodania)
- Diagram: Agents ecosystem
- Infografika: Agent categories
- Workflow: Bez vs Z agents
