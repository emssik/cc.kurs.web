---
title: "Kontekst i pamięć - jak pomagać Claude Code"
description: "Zrozum jak Claude Code zarządza kontekstem i jak mu pomagać w utrzymaniu pamięci"
duration: 20
difficulty: intermediate
tags: [kontekst, pamięć, context, memory, optimization]
---

# Kontekst i pamięć

## Wprowadzenie

Claude Code ma ograniczoną "pamięć". Zrozumienie jak zarządza kontekstem pomoże Ci efektywniej z nim współpracować.

## Context Window

### Co Claude pamięta:
- Ostatnie wiadomości (~10-20)
- Aktualnie otwarte pliki
- Wyniki narzędzi
- Konfigurację projektu

### Czego NIE pamięta:
- Całej historii
- Poprzednich sesji
- Starych plików

## Strategie zarządzania

### 1. Przypominaj

```
Ty: (Przypomnienie: System autoryzacji JWT)
    Dodaj endpoint /refresh-token
```

### 2. Używaj contextPaths

```json
{
  "contextPaths": [
    "README.md",
    "src/types/User.ts"
  ]
}
```

### 3. Referencje do plików

```
W src/api/users.ts funkcja getUser (linia 45)...
```

## Best Practices

- Start nowej sesji po >50 wiadomościach
- Podsumuj regularnie
- Read tylko potrzebne pliki

---
