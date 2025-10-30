---
title: "Debugowanie i rozwiązywanie problemów"
description: "Jak diagnozować i rozwiązywać problemy podczas pracy z Claude Code"
duration: 22
difficulty: intermediate
tags: [debugging, troubleshooting, problems]
---

# Debugowanie i rozwiązywanie problemów

## Typowe problemy

### 1. Claude nie rozumie
- Uprość polecenie
- Podaj kontekst
- Użyj przykładów

### 2. Zmiany nie są wprowadzane
```bash
git status
# Poproś ponownie z emphasis
```

### 3. Testy failują
```
Ty: Przeanalizuj błędy i napraw
```

## Debugging Workflow

1. Zidentyfikuj problem
2. Reprodukuj
3. Diagnozuj root cause
4. Napraw
5. Weryfikuj

## Logi

```bash
tail -f ~/.claude/logs/claude-code.log
```

## Recovery

```bash
git diff
git reset --hard
```

---
