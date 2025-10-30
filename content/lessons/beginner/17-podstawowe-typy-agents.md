---
title: "Podstawowe typy agents"
description: "Szczegółowy przegląd najpopularniejszych agents w Claude Code"
duration: 15
difficulty: beginner
tags: [agents, types, reference, guide]
---

# Podstawowe typy agents

## Wprowadzenie

Claude Code oferuje bogaty zestaw wyspecjalizowanych agents. W tej lekcji szczegółowo poznasz najpopularniejsze i najbardziej przydatne agents dla beginning użytkowników.

## Kategorie Agents

### 1. Exploration (Eksploracja kodu)

#### Explore Agent

**Specjalizacja:** Szybka eksploracja kodu i struktury projektu

**Kiedy używać:**
- Znajdowanie plików według wzorców
- Wyszukiwanie kodu według słów kluczowych
- Odpowiadanie na pytania o kod
- Mapowanie struktury projektu

**Thoroughness levels:**
- `quick` - Podstawowe wyszukiwanie
- `medium` - Standardowa eksploracja (zalecane)
- `very thorough` - Głęboka analiza

**Przykłady:**
```
Użyj Explore (medium) do znalezienia wszystkich komponentów używających useState
Użyj Explore (quick) gdzie zdefiniowana jest klasa User
Użyj Explore (very thorough) do przeanalizowania architektury API
```

**Output:** Strukturalny raport z lokalizacjami i kontekstem

---

### 2. Development (Tworzenie kodu)

#### test-first-developer Agent

**Specjalizacja:** Test-Driven Development (TDD)

**Workflow:**
1. Pisze testy najpierw
2. Implementuje funkcjonalność
3. Refaktoruje kod
4. Weryfikuje testy

**Kiedy używać:**
- Dodawanie nowych funkcji z testami
- TDD workflow
- Kod wymagający wysokiej jakości

**Przykład:**
```
Użyj test-first-developer do dodania funkcji validateEmail z kompletnymi testami
```

**Output:** Kod + Testy + Dokumentacja

#### refactoring-master Agent

**Specjalizacja:** Bezpieczny refactoring z testami

**Workflow:**
1. Czyta kod
2. Uruchamia testy (before)
3. Refaktoryzuje
4. Uruchamia testy (after)
5. Rollback jeśli testy fail

**Kiedy używać:**
- Refactoring istniejącego kodu
- Gdy bezpieczeństwo zmian jest krytyczne
- Poprawa czytelności kodu

**Przykład:**
```
Użyj refactoring-master do refactoringu modułu auth
```

**Output:** Zrefaktoryzowany kod + Raport zmian

---

### 3. Quality Assurance (Jakość kodu)

#### uni-tester Agent

**Specjalizacja:** Kompleksowe testowanie

**Co tworzy:**
- Testy jednostkowe
- Testy integracyjne
- Edge cases
- Mocki i stubsy

**Kiedy używać:**
- Dodawanie testów do istniejącego kodu
- Zwiększanie pokrycia testami
- Testowanie edge cases

**Przykład:**
```
Użyj uni-tester do stworzenia testów dla calculator module
```

**Output:** Kompletny test suite

#### code-reviewer Agent

**Specjalizacja:** Code review (KISS, DRY principles)

**Co sprawdza:**
- Prostota (KISS - Keep It Simple, Stupid)
- Duplikacja (DRY - Don't Repeat Yourself)
- Czytelność
- Best practices

**Kiedy używać:**
- Przed pull requestem
- Po napisaniu nowego kodu
- Okresowe review istniejącego kodu

**Przykład:**
```
Użyj code-reviewer do przeglądu src/components/
```

**Output:** Raport z sugestiami poprawy

#### quality-gate-tester Agent

**Specjalizacja:** Testy integracyjne i E2E przed PR

**Co robi:**
- Uruchamia wszystkie testy
- Testy integracyjne
- E2E tests
- Negative testing

**Kiedy używać:**
- Przed stworzeniem pull requesta
- Po zakończeniu feature
- Przed merge do main

**Przykład:**
```
Użyj quality-gate-tester przed PR - sprawdź wszystko
```

**Output:** Raport przejścia przez quality gate

---

### 4. Debugging (Szukanie błędów)

#### debugger-detective Agent

**Specjalizacja:** Znajdowanie i naprawianie bugów

**Workflow:**
1. Analizuje problem
2. Tworzy failing test
3. Znajduje źródło buga
4. Naprawia
5. Weryfikuje, że test przechodzi

**Kiedy używać:**
- Trudne do znalezienia bugi
- Nieoczekiwane zachowania
- Debugging complex issues

**Przykład:**
```
Użyj debugger-detective do znalezienia, dlaczego login nie działa dla niektórych użytkowników
```

**Output:** Znaleziony bug + Fix + Test

---

### 5. Architecture (Architektura)

#### chief-architect Agent

**Specjalizacja:** Projektowanie architektury systemów

**Co tworzy:**
- Architektura wysokiego poziomu
- Analiza ryzyk
- Wybór technologii
- Plan implementacji

**Kiedy używać:**
- Planowanie nowych dużych funkcji
- Redesign istniejących systemów
- Ważne decyzje architektoniczne

**Przykład:**
```
Użyj chief-architect do zaprojektowania architektury systemu payment
```

**Output:** Dokument architektury + Risks + Plan

#### database-architect Agent

**Specjalizacja:** Projektowanie i optymalizacja baz danych

**Co robi:**
- Projektuje schemat DB
- Optymalizuje queries
- Indeksy i performance
- Migracje

**Kiedy używać:**
- Projektowanie nowego schematu
- Optymalizacja istniejącej DB
- Problemy z wydajnością DB

**Przykład:**
```
Użyj database-architect do zaprojektowania schematu dla e-commerce
```

**Output:** Schemat DB + Migracje + Indexy

---

### 6. Security (Bezpieczeństwo)

#### security-guardian Agent

**Specjalizacja:** Security audits i vulnerability detection

**Co sprawdza:**
- SQL injection
- XSS vulnerabilities
- Authentication issues
- Data exposure
- Dependency vulnerabilities

**Kiedy używać:**
- Przed deployment
- Okresowe audyty
- Po dodaniu nowych features
- Przed code review

**Przykład:**
```
Użyj security-guardian do audytu bezpieczeństwa API endpoints
```

**Output:** Security report + Recommendations

---

### 7. Documentation (Dokumentacja)

#### documentation-writer Agent

**Specjalizacja:** Pisanie dokumentacji technicznej

**Co tworzy:**
- README.md
- API documentation
- User guides
- Code comments
- JSDocs

**Kiedy używać:**
- Nowy projekt potrzebuje docs
- Dokumentacja jest przestarzała
- Onboarding nowych devs

**Przykład:**
```
Użyj documentation-writer do stworzenia API.md dla wszystkich endpoints
```

**Output:** Kompletna dokumentacja

---

### 8. Performance (Wydajność)

#### performance-optimizer Agent

**Specjalizacja:** Optymalizacja wydajności kodu

**Co robi:**
- Identyfikuje bottlenecks
- Optymalizuje algorytmy
- Redukuje complexity
- Cache strategies

**Kiedy używać:**
- Kod jest wolny
- Wysokie użycie CPU/pamięci
- Skalowanie aplikacji

**Przykład:**
```
Użyj performance-optimizer do poprawy wydajności data processing
```

**Output:** Zoptymalizowany kod + Benchmarks

---

## Porównanie Agents

| Agent | Szybkość | Kompleksowość | Autonomia | Best For |
|-------|----------|---------------|-----------|----------|
| Explore | ⚡⚡⚡ | ⭐⭐ | ⭐⭐⭐ | Wyszukiwanie |
| uni-tester | ⚡⚡ | ⭐⭐⭐ | ⭐⭐⭐ | Testowanie |
| code-reviewer | ⚡⚡⚡ | ⭐⭐ | ⭐⭐⭐ | Code review |
| refactoring-master | ⚡⚡ | ⭐⭐⭐ | ⭐⭐⭐ | Refactoring |
| debugger-detective | ⚡⚡ | ⭐⭐⭐ | ⭐⭐ | Debugging |
| chief-architect | ⚡ | ⭐⭐⭐ | ⭐⭐ | Architektura |

## Wybór właściwego agenta

### Decision Tree

```
Czego potrzebujesz?

EKSPLORACJA → Explore
TESTY → uni-tester lub test-first-developer
CODE REVIEW → code-reviewer
REFACTORING → refactoring-master
BUG → debugger-detective
ARCHITEKTURA → chief-architect
SECURITY → security-guardian
DOCS → documentation-writer
PERFORMANCE → performance-optimizer
```

## Zadanie praktyczne

### Zadanie 1: Explore Agent

```
Ty: Stwórz projekt z komponentami React używającymi useEffect
Ty: Użyj Explore (medium) do znalezienia wszystkich useEffect hooks
```

### Zadanie 2: uni-tester Agent

```
Ty: Masz plik math.js z funkcjami add, subtract, multiply, divide
Ty: Użyj uni-tester do stworzenia kompletnych testów
```

### Zadanie 3: code-reviewer Agent

```
Ty: Napisz kod z celowymi problemami (duplikacja, długie funkcje)
Ty: Użyj code-reviewer do znalezienia problemów
```

### Zadanie 4: Porównanie

Wykonaj to samo zadanie z różnymi agents i porównaj:

**Zadanie:** Dodaj funkcję sortUsers z testami

**Podejście 1:** Bezpośrednio
**Podejście 2:** test-first-developer
**Podejście 3:** uni-tester (najpierw kod, potem testy)

Porównaj jakość i kompletność.

## Best Practices

### 1. Wybieraj agenta według zadania

```
❌ Użyj Explore do pisania kodu
✅ Użyj Explore do znajdowania kodu
```

### 2. Podaj kontekst

```
❌ Użyj uni-tester
✅ Użyj uni-tester dla auth module, zwróć uwagę na edge cases security
```

### 3. Łącz agents w workflow

```
1. chief-architect (plan)
2. test-first-developer (implement)
3. code-reviewer (review)
4. quality-gate-tester (verify)
```

### 4. Dostosuj thoroughness

```
quick:    Szybkie zadania
medium:   Normalna praca (default)
very thorough: Krytyczne zadania
```

## Jak Claude Code może Ci pomóc?

```
Który agent jest najlepszy dla X?
Pokaż przykład użycia agent Y
Jaka jest różnica między A a B agent?
Jak łączyć agents w workflow?
```

## Dodatkowe materiały

### Dokumentacja
- [Agents Reference](https://docs.claude.com/en/docs/claude-code/agents)
- [Agent Types Overview](https://docs.claude.com/en/docs/claude-code/agents/types)

## Podsumowanie

Nauczyłeś się:
- Szczegółowych opisów najpopularniejszych agents
- Kiedy używać poszczególnych agents
- Jak wybierać właściwego agenta dla zadania
- Porównania między różnymi agents
- Best practices dla efektywnego używania agents

W następnej lekcji zobaczysz praktyczne przykłady workflow z agents!

---

**Ilustracje:** (do dodania)
- Tabela porównawcza agents
- Diagram: Agent selection flowchart
- Infografika: Agent capabilities
