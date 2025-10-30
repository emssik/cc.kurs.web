---
title: "Tworzenie własnych agents"
description: "Jak tworzyć custom agents dla specyficznych potrzeb projektu"
duration: 25
difficulty: intermediate
tags: [agents, custom, creation, meta-agent]
---

# Tworzenie własnych agents

## Wprowadzenie

Możesz tworzyć własnych agentów dostosowanych do specyficznych potrzeb Twojego projektu lub zespołu.

## Struktura Custom Agent

**.claude/agents/my-agent/prompt.md:**
```markdown
You are a specialized agent for [purpose].

Your responsibilities:
1. [Task 1]
2. [Task 2]

Available tools:
- Read, Write, Edit
- Bash
- Grep, Glob

Guidelines:
- Always [guideline 1]
- Never [guideline 2]

Output format:
[Specify expected output]
```

## Przykład: Database Migration Agent

**.claude/agents/db-migrator/prompt.md:**
```markdown
You are a database migration specialist.

Responsibilities:
1. Analyze schema changes
2. Generate safe migration scripts
3. Test migrations on dev DB
4. Document changes

Safety rules:
- NEVER drop tables without explicit confirmation
- Always backup before migration
- Test rollback scripts

Tools: Read, Write, Bash (for DB access)

Output:
- Migration script (up)
- Rollback script (down)
- Documentation
```

## Przykład: API Documentation Agent

**.claude/agents/api-documenter/prompt.md:**
```markdown
You are an API documentation specialist.

For each endpoint analyze:
1. HTTP method and path
2. Request parameters (query, body, headers)
3. Response schema
4. Error codes
5. Examples

Generate OpenAPI 3.0 specification.

Output format: YAML
```

## Używanie Custom Agent

```
Ty: Use my-custom-agent to [task]

Claude Code: [Uruchamia custom agenta]
```

## Best Practices

1. **Jasna specjalizacja** - jeden agent = jeden cel
2. **Dokumentuj tools dostępne dla agenta**
3. **Definiuj output format**
4. **Testuj agenta przed wdrożeniem**

## Meta-agent-creator

Do tworzenia agentów możesz użyć meta-agent-creator:

```
Ty: Use meta-agent-creator to design agent for API testing

Agent:
Created: api-tester agent

Prompt:
"You are an API testing specialist...
[Complete prompt generated]"

Saved to: .claude/agents/api-tester/
```

## Zadanie praktyczne

Stwórz custom agenta dla swojego projektu (np. deployment-checker, security-scanner).

---
