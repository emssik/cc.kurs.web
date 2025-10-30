---
title: "Agent Workflow - łączenie agentów"
description: "Jak łączyć wielu agentów w złożone workflows dla większych zadań"
duration: 20
difficulty: intermediate
tags: [agents, workflow, automation, multi-agent]
---

# Agent Workflow - łączenie agentów

## Wprowadzenie

Prawdziwa moc agentów objawia się, gdy łączysz ich w workflows. Możesz utworzyć pipeline, gdzie jeden agent przekazuje wyniki następnemu, automatyzując złożone procesy.

## Sequential Workflow

Agenci pracują jeden po drugim:

```
Ty: Dodaj feature "export to PDF" with full workflow

Claude Code:
[1. Plan Agent] Tworzy plan implementacji
↓
[2. Test-first-developer] Pisze testy
↓
[3. Test-first-developer] Implementuje feature
↓
[4. Code-reviewer] Przegląd kodu
↓
[5. Quality-gate-tester] Full test suite
↓
Done! Feature ready for PR
```

## Parallel Workflow

Agenci pracują równocześnie:

```
Ty: Analyze całego projektu in parallel

Claude Code:
[Explore] → Finding structure...
[Code-reviewer] → Reviewing quality...
[Performance-optimizer] → Finding bottlenecks...

Zbiorczy raport z 3 agentów za 45s!
```

## Conditional Workflow

Następny agent uruchamia się tylko jeśli poprzedni succeeds:

```
[Test-first-developer] → IF tests pass → [Code-reviewer]
                      → IF tests fail → [Debugger-detective]
```

## Przykład: Complete Feature Workflow

```
Ty: Implement "user notifications" feature z pełnym workflow

Claude Code:
📋 Workflow Plan (6 etapów):

1. [Chief-architect] → Projektowanie architektury
   ✓ Zaprojektowano: NotificationService + Queue + Templates

2. [TDD-planner] → Podział na zadania TDD
   ✓ 8 zadań zdefiniowanych

3. [Test-first-developer x3] → Parallel implementation
   ✓ Zadanie 1-3 ukończone
   ✓ Zadanie 4-6 ukończone
   ✓ Zadanie 7-8 ukończone

4. [Quality-gate-tester] → Testing
   ✓ Unit: 45/45 passed
   ✓ Integration: 12/12 passed
   ✓ Coverage: 95%

5. [Code-reviewer] → Review
   ✓ KISS: Good
   ✓ DRY: Good
   ✓ No issues

6. [Documentation-writer] → Docs
   ✓ API docs generated
   ✓ README updated

✅ Feature "user notifications" complete!
```

## Best Practices

1. **Jasne instrukcje dla każdego agenta**
2. **Max 5 agentów w workflow** - więcej = zbyt skomplikowane
3. **Sprawdzaj output każdego etapu**
4. **Używaj parallel gdzie można**

## Zadanie praktyczne

Stwórz własny workflow z 3 agentami dla nowej funkcjonalności.

---
