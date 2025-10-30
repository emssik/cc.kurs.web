---
title: "Kiedy używać Task Tool"
description: "Naucz się, kiedy delegować zadania do agents zamiast robić je bezpośrednio"
duration: 10
difficulty: beginner
tags: [task, agents, delegation, workflow]
---

# Kiedy używać Task Tool

## Wprowadzenie

Task Tool to mechanizm uruchamiania agents. Wiedza, kiedy użyć Task (agent) vs bezpośrednia rozmowa, to klucz do efektywnej pracy z Claude Code. W tej lekcji nauczysz się podejmować tę decyzję.

## Task Tool - co to jest?

Task Tool uruchamia specjalizowanego agenta w osobnej sesji:

```
Task(
  subagent_type: "uni-tester",
  prompt: "Create comprehensive tests for auth module",
  description: "Create auth tests"
)
```

**Jako użytkownik:**
```
Użyj uni-tester do testów auth module
```

Claude Code automatycznie użyje Task Tool.

## Drzewo decyzyjne: Task vs Direct

```
Czy zadanie jest złożone/specjalistyczne?
├─ NIE → Bezpośrednia rozmowa
└─ TAK → Czy istnieje specjalizowany agent?
    ├─ NIE → Bezpośrednia rozmowa
    └─ TAK → Użyj Task Tool z agentem
```

## Kiedy używać Task Tool?

### ✅ Złożone wyszukiwanie i eksploracja

**Zadanie:** Znajdź wszystkie komponenty używające deprecated API

```
❌ Bezpośrednio: Znajdź komponenty z deprecated API
✅ Task: Użyj Explore agent do znalezienia komponentów z deprecated API (thoroughness: medium)
```

**Dlaczego?**
- Explore agent zna wzorce wyszukiwania
- Może przeszukać wiele lokalizacji
- Zwraca strukturalny raport

### ✅ Testowanie

**Zadanie:** Napisz kompleksowe testy

```
❌ Bezpośrednio: Dodaj testy
✅ Task: Użyj uni-tester do stworzenia testów z edge cases i mockami
```

**Dlaczego?**
- uni-tester wie, jak pisać dobre testy
- Pokrywa edge cases
- Dodaje integracyjne i jednostkowe

### ✅ Code Review

**Zadanie:** Przegląd kodu pod kątem jakości

```
❌ Bezpośrednio: Sprawdź kod
✅ Task: Użyj code-reviewer do analizy kodu (KISS, DRY)
```

**Dlaczego?**
- code-reviewer ma checklistę dobrych praktyk
- Konsekwentne standardy
- Strukturalny raport

### ✅ Refactoring

**Zadanie:** Bezpieczny refactoring z testami

```
❌ Bezpośrednio: Zrefaktoryzuj kod
✅ Task: Użyj refactoring-master do bezpiecznego refactoringu z testami
```

**Dlaczego?**
- Agent uruchamia testy przed i po
- Bezpieczeństwo zmian
- Automatyczny rollback przy błędach

### ✅ Debugging trudnych problemów

**Zadanie:** Znajdź źródło buga

```
❌ Bezpośrednio: Znajdź bug
✅ Task: Użyj debugger-detective do debugowania problemu X
```

**Dlaczego?**
- Systematyczne podejście
- Tworzy failing test najpierw
- Naprawia i weryfikuje

### ✅ Architektура

**Zadanie:** Zaprojektuj architekturę nowej funkcji

```
❌ Bezpośrednio: Jak zaprojektować X?
✅ Task: Użyj chief-architect do zaprojektowania architektury dla X
```

**Dlaczego?**
- Przemyślana analiza ryzyk
- Best practices architektury
- Kompletny plan implementacji

## Kiedy NIE używać Task Tool?

### ❌ Proste pytania

```
❌ Użyj Explore agent do znalezienia pliku config.js
✅ Gdzie jest plik config.js?
```

### ❌ Jednorazowe proste edycje

```
❌ Użyj agenta do zmiany jednej linii
✅ Zmień X na Y w pliku Z
```

### ❌ Gdy chcesz interaktywnej rozmowy

```
❌ Agent (nie możesz pytać w trakcie)
✅ Bezpośrednia rozmowa (możesz doprecyzowywać)
```

### ❌ Gdy chcesz widzieć każdy krok

```
❌ Agent (zwraca tylko rezultat)
✅ Bezpośrednia rozmowa (widzisz proces)
```

### ❌ Bardzo proste wyszukiwanie

```
❌ Użyj Explore do znalezienia słowa "function"
✅ Znajdź słowo "function" (Claude Code użyje Grep)
```

## Przykłady porównawcze

### Przykład 1: Dodanie funkcji

**Bezpośrednio (prostota):**
```
Ty: Dodaj funkcję parseDate do utils.js
Claude Code: [dodaje funkcję]
```

**Z Task (kompleksowość):**
```
Ty: Użyj test-first-developer do dodania funkcji parseDate z testami
test-first-developer:
1. Napisał testy
2. Implementacja
3. Refactoring
4. Dokumentacja
```

**Decyzja:** Jeśli potrzebujesz TDD workflow → Task. Jeśli tylko prosta funkcja → Bezpośrednio.

### Przykład 2: Wyszukiwanie

**Bezpośrednio (konkretne):**
```
Ty: Znajdź funkcję calculateTotal
Claude Code: [używa Grep, pokazuje wynik]
```

**Z Task (rozległe):**
```
Ty: Użyj Explore agent (medium) do znalezienia wszystkich funkcji finansowych
Explore:
- Przeszukał cały projekt
- Znalazł 23 funkcje
- Kategoryzował według typu
- Raport z lokalizacjami
```

**Decyzja:** Konkretne wyszukiwanie → Bezpośrednio. Rozległa eksploracja → Task.

### Przykład 3: Testy

**Bezpośrednio (szybkie):**
```
Ty: Dodaj test dla funkcji add
Claude Code: [jeden prosty test]
```

**Z Task (kompleksowe):**
```
Ty: Użyj uni-tester dla calculator module
uni-tester:
- 20 testów jednostkowych
- Edge cases (overflow, NaN, null)
- Integracyjne
- Pokrycie 100%
```

**Decyzja:** Jeden prosty test → Bezpośrednio. Kompletny test suite → Task.

## Równoległe uruchamianie Agents

Możesz uruchomić wiele agents jednocześnie:

```
Ty: Uruchom równolegle:
1. code-reviewer dla src/
2. uni-tester dla tests/
3. security-guardian audit
```

**Kiedy:** Gdy zadania są niezależne i chcesz zaoszczędzić czas.

## Thoroughness levels dla Explore

Explore agent ma poziomy dokładności:

```
quick:         Podstawowe wyszukiwanie
medium:        Umiarkowana eksploracja
very thorough: Kompletna analiza projektu
```

**Przykład:**
```
Użyj Explore (quick) do znalezienia komponentu Button
Użyj Explore (very thorough) do mapowania całej architektury
```

## Zadanie praktyczne

### Zadanie 1: Decyzje

Dla każdego scenariusza zdecyduj: Task czy bezpośrednio?

1. Znajdź plik README.md
2. Napisz kompleksowe testy dla auth module
3. Zmień nazwę zmiennej w jednym pliku
4. Przejrzyj cały kod pod kątem bezpieczeństwa
5. Dodaj console.log do debugowania
6. Zrefaktoryzuj cały moduł z testami
7. Znajdź wszystkie komponenty używające deprecated API
8. Dodaj komentarz do funkcji

**Odpowiedzi:**
1. Bezpośrednio (proste)
2. Task - uni-tester (kompleksowe)
3. Bezpośrednio (prosta edycja)
4. Task - security-guardian (specjalistyczne)
5. Bezpośrednio (proste)
6. Task - refactoring-master (bezpieczeństwo)
7. Task - Explore (rozległe wyszukiwanie)
8. Bezpośrednio (proste)

### Zadanie 2: Praktyka

**Część A - Bezpośrednio:**
```
Ty: Stwórz prostą funkcję hello() w greeting.js
```

**Część B - Z Task:**
```
Ty: Użyj test-first-developer do dodania funkcji greet(name, language) z testami
```

Porównaj:
- Czas wykonania
- Kompletność
- Jakość testów

### Zadanie 3: Eksploracja

**Quick:**
```
Ty: Użyj Explore (quick) do znalezienia wszystkich .jsx plików
```

**Very thorough:**
```
Ty: Użyj Explore (very thorough) do analizy struktury projektu i dependencies
```

Zauważ różnicę w głębokości analizy.

## Best Practices

### 1. Zacznij od bezpośredniej rozmowy

Jeśli nie jesteś pewny, zacznij bezpośrednio. Claude Code zasugeruje agenta, jeśli pasuje.

### 2. Używaj Task dla wieloetapowych zadań

```
✓ Task: Napisz kod → Testy → Dokumentację
```

### 3. Podaj kontekst agentowi

```
❌ Użyj uni-tester
✅ Użyj uni-tester do testowania auth module, zwróć uwagę na security
```

### 4. Równoległość dla niezależnych zadań

```
Uruchom równolegle code-reviewer i uni-tester
```

### 5. Dopasuj thoroughness do potrzeb

```
quick:   Szybka odpowiedź
medium:  Normalna praca
very thorough: Krytyczne zadania
```

## Jak Claude Code może Ci pomóc?

```
Którego agenta powinienem użyć dla X?
Czy to zadanie wymaga Task czy można bezpośrednio?
Pokaż przykład użycia Task Tool
Jaka jest różnica między quick a very thorough?
```

## Dodatkowe materiały

### Dokumentacja
- [Task Tool Reference](https://docs.claude.com/en/docs/claude-code/tools/task)
- [Agents Guide](https://docs.claude.com/en/docs/claude-code/agents)

## Podsumowanie

Nauczyłeś się:
- Kiedy używać Task Tool vs bezpośrednia rozmowa
- Drzewa decyzyjnego dla wyboru podejścia
- Jak uruchamiać agents równolegle
- Poziomów thoroughness dla Explore
- Best practices dla efektywnej delegacji

W następnej lekcji poznasz szczegółowo podstawowe typy agents!

---

**Ilustracje:** (do dodania)
- Drzewo decyzyjne: Task vs Direct
- Infografika: Scenariusze użycia
- Diagram: Thoroughness levels
