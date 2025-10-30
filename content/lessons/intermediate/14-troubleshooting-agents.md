---
title: "Troubleshooting Agents"
description: "Jak diagnozować i rozwiązywać problemy z agents"
duration: 18
difficulty: intermediate
tags: [agents, troubleshooting, debugging, problems]
---

# Troubleshooting Agents

## Wprowadzenie

Czasami agents nie działają zgodnie z oczekiwaniami. W tej lekcji nauczysz się diagnozować i rozwiązywać problemy.

## Typowe problemy

### 1. Agent nie startuje

**Objawy:**
```
Error: Could not start agent 'test-first-developer'
```

**Rozwiązania:**
- Sprawdź czy nazwa agenta jest prawidłowa
- Upewnij się że agent jest dostępny
- Sprawdź logi: `.claude/logs/agents/`

### 2. Agent timeout

**Objawy:**
```
Agent 'performance-optimizer' timed out after 600s
```

**Rozwiązania:**
- Zwiększ timeout w config
- Podziel zadanie na mniejsze części
- Użyj innego, szybszego agenta

### 3. Agent zwraca niepełne wyniki

**Objawy:**
Agent kończy się, ale brakuje części zadania

**Rozwiązania:**
- Daj bardziej szczegółowe instrukcje
- Sprawdź czy agent ma dostęp do wszystkich plików
- Użyj verbose mode

## Debugging Agents

### Sprawdź logi

```bash
cat .claude/logs/agents/test-first-developer.log
```

### Verbose Mode

```
Ty: Use test-first-developer --verbose to add tests

Claude Code: [Agent z verbose logging]

[DEBUG] Reading file: src/utils.ts
[DEBUG] Analyzing functions...
[DEBUG] Found 3 functions to test
[DEBUG] Generating test cases...
...
```

### Dry Run

Sprawdź co agent zrobiłby, bez wykonywania:

```
Ty: Use code-reviewer --dry-run on src/

Claude Code:
[Dry run mode]
Would analyze:
- src/components/Button.tsx
- src/components/Input.tsx
...

Would check:
✓ KISS violations
✓ DRY violations
✓ Test coverage
```

## Optymalizacja Agents

### 1. Ograniczaj zakres

Zamiast:
```
Use explore agent to find all functions
```

Lepiej:
```
Use explore agent to find all exported functions in src/api/
```

### 2. Parallel dla niezależnych zadań

```
In parallel:
[Agent 1] Review auth module
[Agent 2] Review api module
[Agent 3] Review utils module
```

### 3. Sequential dla zależnych zadań

```
[Agent 1] Find bugs
↓ (przekazuje wyniki)
[Agent 2] Fix found bugs
```

## Agent Memory i Context

Agents NIE mają dostępu do:
- Całej historii konwersacji
- Poprzednich wyników innych agents
- Twojego kontekstu

**Dlatego:**
- Dawaj pełne instrukcje
- Przekazuj niezbędny kontekst
- Nie zakładaj że agent "pamięta"

## Best Practices

1. **Jasne, konkretne instrukcje**
2. **Ograniczony zakres**
3. **Sprawdzaj output**
4. **Używaj verbose przy problemach**
5. **Czytaj logi**

## Zadanie praktyczne

1. Uruchom agenta z błędną instrukcją
2. Sprawdź logi
3. Popraw instrukcję
4. Zweryfikuj że działa

---
