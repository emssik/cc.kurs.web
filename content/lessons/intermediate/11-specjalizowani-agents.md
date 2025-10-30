---
title: "Specjalizowani Agents"
description: "Poznaj konkretnych specjalizowanych agentów i dowiedz się kiedy używać każdego z nich"
duration: 25
difficulty: intermediate
tags: [agents, specialized, test-first, debugger, code-reviewer]
---

# Specjalizowani Agents

## Wprowadzenie

Claude Code oferuje szereg specjalizowanych agentów, z których każdy jest ekspertem w swojej dziedzinie. W tej lekcji poznasz najważniejszych agentów i dowiesz się, kiedy używać każdego z nich.

## Katalog Agentów

### test-first-developer
**Specjalizacja:** TDD (Test-Driven Development)

**Kiedy używać:**
- Dodajesz nową funkcjonalność
- Refaktorujesz kod
- Chcesz 100% test coverage

**Przykład:**
```
Ty: Use test-first-developer to add user authentication

Agent:
1. ✓ Napisałem 12 testów dla auth
2. ✓ Zaimplementowałem funkcjonalność
3. ✓ Wszystkie testy przechodzą
4. ✓ Coverage: 100%
```

### debugger-detective
**Specjalizacja:** Znajdowanie i naprawa bugów

**Kiedy używać:**
- Masz bug do naprawienia
- Aplikacja zachowuje się nieoczekiwanie
- Potrzebujesz root cause analysis

**Przykład:**
```
Ty: Fix the login bug - users can't log in

Agent:
1. ✓ Utworzyłem failing test
2. ✓ Zidentyfikowałem problem: hash comparison failure
3. ✓ Naprawiłem w AuthService.ts:45
4. ✓ Test przechodzi, bug fixed!
```

### code-reviewer
**Specjalizacja:** Code review pod kątem jakości

**Kiedy używać:**
- Przed commitem
- Po refaktoringu
- Code review dla PR

**Zasady:**
- KISS (Keep It Simple)
- DRY (Don't Repeat Yourself)

**Przykład:**
```
Ty: Review my changes

Agent:
📊 Code Review:
✅ KISS: Kod prosty i czytelny
⚠️ DRY: Duplikacja w UserService i AdminService (lines 45-60)
✅ Tests: 85% coverage
💡 Sugestie: Wydziel wspólną logikę do BaseService
```

### refactoring-master
**Specjalizacja:** Bezpieczny refaktoring

**Kiedy używać:**
- Legacy code do refaktoringu
- Optymalizacja kodu
- Redukcja duplikacji

**Workflow:**
1. Uruchamia testy (baseline)
2. Refaktoruje kod
3. Uruchamia testy ponownie
4. Jeśli fail → rollback i próbuje inaczej

### quality-gate-tester
**Specjalizacja:** Comprehensive testing

**Kiedy używać:**
- Przed utworzeniem PR
- Po zakończeniu feature
- Quality check przed release

**Co testuje:**
- Unit tests
- Integration tests
- E2E tests (jeśli są)
- Negative test cases

### performance-optimizer
**Specjalizacja:** Optymalizacja wydajności

**Kiedy używać:**
- Aplikacja jest wolna
- Potrzebujesz optymalizacji
- Performance bottlenecks

**Co optymalizuje:**
- Database queries
- Algorytmy
- Memory usage
- Bundle size

## Zadanie praktyczne

**Zadanie:** Użyj 3 różnych agentów

1. test-first-developer: Dodaj walidację
2. code-reviewer: Przejrzyj zmiany
3. quality-gate-tester: Uruchom full test suite

## Dodatkowe materiały

- [Agent Types Reference](https://docs.claude.com/en/docs/claude-code/agent-types)

## Podsumowanie

Każdy agent to ekspert w swojej dziedzinie. Używaj ich mądrze aby osiągać najlepsze rezultaty!

---
