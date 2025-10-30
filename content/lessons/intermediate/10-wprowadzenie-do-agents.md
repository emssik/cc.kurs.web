---
title: "Wprowadzenie do Agents"
description: "Poznaj system agents w Claude Code i dowiedz się kiedy i jak z nich korzystać"
duration: 20
difficulty: intermediate
tags: [agents, task, automation, specialized-agents]
---

# Wprowadzenie do Agents

## Wprowadzenie

Agents to specjalizowane instancje Claude Code, które możesz uruchamiać dla konkretnych zadań. Każdy agent ma swoją ekspertyzę i zestaw narzędzi dostosowany do określonego typu pracy. Zamiast prosić głównego Claude Code o wszystko, możesz delegować zadania do wyspecjalizowanych agentów.

Wyobraź sobie zespół specjalistów: jeden jest ekspertem od testów, drugi od code review, trzeci od debugowania. Agents działają podobnie - każdy jest najlepszy w swojej dziedzinie.

## Dlaczego Agents?

**Specjalizacja:** Każdy agent jest optymalizowany pod konkretne zadanie.

**Równoległość:** Możesz uruchamiać wielu agentów jednocześnie.

**Efektywność:** Agent zna best practices dla swojej domeny.

**Izolacja:** Każdy agent działa niezależnie, nie miesza kontekstów.

## Typy Agents

### 1. Explore Agent
Szybkie przeszukiwanie codebase.

```
Ty: Gdzie jest zdefiniowana funkcja calculatePrice?

Claude Code: Uruchamiam Explore Agent...
             [Agent przeszukuje projekt]

             Znalazłem w: src/utils/pricing.ts:23
```

### 2. Test-First Developer
TDD workflow - najpierw testy, potem kod.

```
Ty: Dodaj funkcję walidacji email z testami

Claude Code: Uruchamiam test-first-developer...

             1. Tworzę testy dla walidacji email
             2. Testy failują (expected)
             3. Implementuję funkcję
             4. Testy przechodzą ✓
```

### 3. Debugger Detective
Specjalista od znajdowania i naprawiania bugów.

```
Ty: Napraw błąd w logowaniu użytkowników

Claude Code: Uruchamiam debugger-detective...

             1. Analizuję kod logowania
             2. Tworzę test reprodukujący bug
             3. Identyfikuję przyczynę
             4. Naprawiam
             5. Weryfikuję że działa
```

### 4. Code Reviewer
Przegląd kodu pod kątem jakości.

```
Ty: Zrób review ostatnich zmian

Claude Code: Uruchamiam code-reviewer...

             📊 Code Review:
             ✅ KISS: Dobra prostota
             ⚠️ DRY: Znalazłem duplikację w 3 miejscach
             ✅ Tests: Pokrycie 85%
```

## Kiedy używać Agents?

✅ **Używaj Agent, gdy:**
- Zadanie wymaga specjalistycznej wiedzy
- Chcesz uruchomić wiele zadań równolegle
- Potrzebujesz izolowanego kontekstu
- Zadanie jest złożone i wieloetapowe

❌ **Nie używaj Agent, gdy:**
- Proste zadanie, które główny Claude może zrobić
- Potrzebujesz pełnego kontekstu z całej konwersacji
- Zadanie wymaga interakcji (Agent działa autonomicznie)

## Uruchamianie Agents

### Automatyczne
Claude Code sam decyduje kiedy użyć agenta:

```
Ty: Przeszukaj codebase i znajdź wszystkie komponenty React

Claude Code: [Automatycznie uruchamia Explore Agent]
```

### Manualne
Możesz wymusić użycie konkretnego agenta:

```
Ty: Use test-first-developer agent to add user authentication

Claude Code: [Uruchamia test-first-developer]
```

## Agents równoległe

Możesz uruchomić wielu agentów jednocześnie:

```
Ty: W parallel uruchom:
    1. Explore agent - znajdź wszystkie API endpoints
    2. Code-reviewer - przejrzyj zmiany w src/api/
    3. Test-first-developer - dodaj testy dla UserService

Claude Code: Uruchamiam 3 agents równolegle...

             [Agent 1] Znalazłem 15 endpoints
             [Agent 2] Review zakończony - 3 uwagi
             [Agent 3] Dodano 8 testów

             Wszyscy agenci zakończyli pracę!
```

## Agent Output

Każdy agent zwraca raport ze swojej pracy:

```
========================
Agent: test-first-developer
Task: Add user validation
Duration: 45s
========================

Wykonane kroki:
1. ✓ Utworzono testy (5 test cases)
2. ✓ Zaimplementowano walidację
3. ✓ Wszystkie testy przechodzą
4. ✓ Code coverage: 100%

Pliki zmienione:
- src/validation/user.ts (nowy)
- src/validation/user.test.ts (nowy)

Gotowe do commit!
========================
```

## Przykłady praktyczne

### Przykład 1: Explore + Refactor

```
Ty: Znajdź wszystkie użycia old API i zrefaktoruj na new API

Claude Code:
[Agent 1: Explore] Wyszukuję old API...
                  Znalazłem 23 pliki

[Agent 2: Refactoring-master] Refaktoruję 23 pliki...
                             Zakończono! Testy przechodzą.
```

### Przykład 2: Multi-agent workflow

```
Ty: Dodaj nową funkcjonalność comments system

Claude Code:
[Agent 1: Plan] Tworzę plan implementacji
[Agent 2: Test-first-developer] Piszę testy
[Agent 3: Test-first-developer] Implementuję funkcjonalność
[Agent 4: Code-reviewer] Przegląd kodu
[Agent 5: Quality-gate-tester] Integration tests

Wszystko gotowe! Funkcjonalność dodana z testami i reviewem.
```

## Best Practices

### ✅ Dobre praktyki

1. **Pozwól Claude Code decydować** - często wie lepiej którego agenta użyć
2. **Używaj równoległości** - oszczędza czas
3. **Daj jasne instrukcje** - agent nie widzi pełnego kontekstu konwersacji
4. **Sprawdzaj output** - przeczytaj raporty agentów

### ❌ Anty-wzorce

1. Nadużywanie agents dla prostych zadań
2. Za ogólne instrukcje dla agenta
3. Uruchamianie za dużo agents jednocześnie (max 3-4)

## Zadanie praktyczne

### Zadanie 1: Pierwszy agent

```
Ty: Use explore agent to find all TypeScript interfaces in the project
```

Obserwuj jak agent działa i zwraca rezultat.

### Zadanie 2: Test-first workflow

```
Ty: Use test-first-developer to add validation for email and password
```

Sprawdź jak agent najpierw pisze testy, potem kod.

### Zadanie 3: Agents równoległe

```
Ty: In parallel:
    1. Find all TODO comments
    2. Review changes in src/
    3. Run all tests
```

Obserwuj jak agents pracują jednocześnie.

## Dodatkowe materiały

### Oficjalna dokumentacja
- [Agents Guide](https://docs.claude.com/en/docs/claude-code/agents)
- [Available Agents](https://docs.claude.com/en/docs/claude-code/agent-types)
- [Task Tool](https://docs.claude.com/en/docs/claude-code/tools#task)

## Podsumowanie

Agents to potężny system specjalizacji w Claude Code. Deleguj zadania do ekspertów i osiągaj lepsze rezultaty szybciej!

W następnej lekcji poznasz konkretnych specjalizowanych agentów i ich zastosowania.

---

**Ilustracje:** (do dodania)
- Diagram: Zadanie → Agent Selection → Execution → Report
- Porównanie: Claude Code vs Specialized Agent
