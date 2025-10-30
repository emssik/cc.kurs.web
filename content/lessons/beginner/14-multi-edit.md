---
title: "Multi-Edit"
description: "Edytuj wiele plików jednocześnie z narzędziem MultiEdit"
duration: 12
difficulty: beginner
tags: [multiedit, refactoring, batch-edit]
---

# Multi-Edit

## Wprowadzenie

MultiEdit to zaawansowane narzędzie pozwalające na jednoczesną edycję wielu plików w ramach jednej atomowej operacji. Idealne do refaktoringu, zmian nazw, i masowych aktualizacji w całym projekcie.

## Dlaczego to ważne?

MultiEdit to:
- **Atomowość:** Wszystkie zmiany albo się udają, albo żadna
- **Szybkość:** Edytuj dziesiątki plików naraz
- **Bezpieczeństwo:** Rollback jeśli coś pójdzie nie tak
- **Konsystencja:** Gwarancja, że wszystkie zmiany są zgodne

## Podstawy MultiEdit

### Pojedyncze Edit vs MultiEdit

**Single Edit:**
```
Edit(file1.js, old, new)
Edit(file2.js, old, new)
Edit(file3.js, old, new)
```

**MultiEdit:**
```
MultiEdit([
  {file: file1.js, old, new},
  {file: file2.js, old, new},
  {file: file3.js, old, new}
])
```

### Zalety MultiEdit

1. **Atomowość:** Albo wszystkie zmiany, albo żadna
2. **Szybkość:** Jedna operacja zamiast wielu
3. **Transakcyjność:** Możliwość cofnięcia całości
4. **Feedback:** Jeden komunikat o wszystkich zmianach

## Kiedy używać MultiEdit?

### ✅ Idealne przypadki

**1. Zmiana nazwy funkcji/klasy w całym projekcie:**
```
Ty: Zmień nazwę funkcji calculatePrice na computePrice we wszystkich plikach
```

**2. Aktualizacja importów:**
```
Ty: Zmień wszystkie importy z './utils' na './helpers'
```

**3. Refaktoring API:**
```
Ty: Zmień wszystkie wywołania API z .then() na async/await
```

**4. Aktualizacja wersji:**
```
Ty: Zaktualizuj wersję we wszystkich package.json w monorepo
```

**5. Migracja bibliotek:**
```
Ty: Zamień wszystkie użycia moment.js na date-fns
```

### ❌ Kiedy NIE używać

**1. Zmiany w jednym pliku:** Użyj Edit
**2. Różne zmiany w różnych plikach:** Użyj osobnych Edit
**3. Zmiany wymagające indywidualnej logiki**

## Praktyczne przykłady

### Przykład 1: Rename funkcji

```
Ty: Zmień nazwę funkcji getUserData na fetchUserData we wszystkich plikach projektu
```

**Claude Code:**
1. Grep: Znajdzie wszystkie wystąpienia `getUserData`
2. Dla każdego pliku przygotuje edycję
3. MultiEdit: Wykona wszystkie zmiany naraz

**Rezultat:**
```
✓ Updated 8 files:
  - src/api/users.js
  - src/components/UserProfile.jsx
  - src/hooks/useUser.js
  - tests/api/users.test.js
  - ...
```

### Przykład 2: Aktualizacja importów

```
Ty: Wszystkie importy z '@/components/Button' zmień na '@/components/ui/Button'
```

**Claude Code:**
1. Znajdzie wszystkie pliki z tym importem
2. Przygotuje edycje
3. MultiEdit wykonany

### Przykład 3: Dodanie JSDoc

```
Ty: Dodaj JSDoc do wszystkich publicznych funkcji w src/utils/
```

**Claude Code:**
1. Znajdzie funkcje bez JSDoc
2. Wygeneruje odpowiednie JSDoc dla każdej
3. MultiEdit doda wszystkie naraz

### Przykład 4: Usuwanie console.log

```
Ty: Usuń wszystkie console.log z plików produkcyjnych (nie z testów)
```

**Claude Code:**
1. Grep: Znajdzie console.log (wykluczając testy)
2. Dla każdego wystąpienia przygotuje edycję (usunięcie linii)
3. MultiEdit wykona usunięcie

## Workflow z MultiEdit

### Krok 1: Identyfikacja

```
Ty: Znajdź wszystkie pliki używające starej funkcji oldApi()
```

### Krok 2: Planowanie

```
Ty: Pokaż mi plan zmian - co zostanie zmienione w każdym pliku
```

### Krok 3: Wykonanie

```
Ty: Wykonaj zmiany używając MultiEdit
```

### Krok 4: Weryfikacja

```
Ty: Uruchom testy, żeby sprawdzić, czy wszystko działa
```

### Krok 5: Commit

```
Ty: Commitnij zmiany z opisem refaktoringu
```

## Zadanie praktyczne

### Przygotowanie

```
Ty: Stwórz przykładowy projekt z 5 plikami używającymi funkcji calculateTotal()
```

### Zadanie 1: Rename funkcji

```
Ty: Zmień calculateTotal na computeTotal we wszystkich plikach używając MultiEdit
```

**Sprawdź:**
```
Ty: Wyszukaj calculateTotal - powinno być 0 wyników
Ty: Wyszukaj computeTotal - powinny być wszystkie wystąpienia
```

### Zadanie 2: Aktualizacja importów

```
Ty: Dodaj kilka plików importujących z './utils/helpers'
```

Potem:
```
Ty: Zmień wszystkie importy z './utils/helpers' na './lib/helpers' używając MultiEdit
```

### Zadanie 3: Dodanie komentarzy

```
Ty: Dodaj komentarz "// TODO: Add error handling" przed każdą funkcją fetch w projekcie
```

### Zadanie 4: Usuwanie kodu

```
Ty: Usuń wszystkie linie z console.log używając MultiEdit
```

**Sprawdź:**
```
Ty: Wyszukaj console.log - powinno być 0 wyników
Ty: Uruchom kod - sprawdź, czy działa bez console.log
```

## Best Practices

### 1. Zawsze sprawdź zakres zmian

```
Ty: Pokaż mi, które pliki zostaną zmienione, zanim wykonasz MultiEdit
```

### 2. Test przed commit

```
Ty: Wykonaj MultiEdit → Uruchom testy → Commitnij jeśli OK
```

### 3. Atomic commits

```
Ty: MultiEdit dla jednego rodzaju zmian → commit → kolejne zmiany
```

❌ Nie mieszaj różnych refaktoringów w jednym MultiEdit

### 4. Backup w Git

```
Ty: Przed dużym MultiEdit stwórz commit z obecnym stanem
```

### 5. Weryfikacja regex/patterns

```
Ty: Pokaż przykład dopasowania przed wykonaniem na wszystkich plikach
```

## Zaawansowane techniki

### 1. Conditional MultiEdit

```
Ty: W plikach .jsx zamień useState na useSignal, ale tylko jeśli plik importuje 'preact/signals'
```

### 2. MultiEdit z transformacjami

```
Ty: We wszystkich plikach zamień funkcje callback na async/await
```

### 3. MultiEdit po grep

```
Ty: Znajdź wszystkie pliki z TODO (Grep) → Dodaj ticketnumber do każdego TODO (MultiEdit)
```

### 4. Cross-file refactoring

```
Ty: Przenieś funkcję X z utils.js do helpers.js i zaktualizuj wszystkie importy
```

Claude Code:
1. Edit: Przenieś funkcję
2. MultiEdit: Aktualizuj importy w innych plikach

## Częste problemy i rozwiązania

### Problem: Nie wszystkie pliki zostały zmienione

**Przyczyna:** Pattern nie był wystarczająco dokładny

**Rozwiązanie:**
```
Ty: Znajdź pliki, które nie zostały zmienione i pokaż dlaczego
```

### Problem: MultiEdit się nie powiódł

**Przyczyna:** Błąd w jednym z plików (old_string not found)

**Rozwiązanie:**
```
Ty: Pokaż, który plik spowodował błąd i napraw go ręcznie
```

Claude Code może:
1. Pokazać problematyczny plik
2. Spróbować ponownie z poprawką
3. Wykonać dla pozostałych plików

### Problem: Za dużo plików do edycji

**Rozwiązanie:** Podziel na mniejsze grupy
```
Ty: Wykonaj MultiEdit tylko dla plików w src/components/
Potem: Wykonaj dla src/pages/
```

## Rollback i cofanie

### Jeśli MultiEdit się nie powiódł

Claude Code automatycznie **nie zastosuje żadnych zmian**.

### Jeśli zmiany zostały wykonane, ale chcesz cofnąć

```
Ty: Cofnij ostatni MultiEdit
```

Claude Code:
```bash
git checkout .  # Jeśli nie było commitu
# lub
git revert HEAD  # Jeśli był commit
```

## MultiEdit vs inne metody

| | MultiEdit | Multiple Edit | Bash sed/awk |
|---|---|---|---|
| **Atomowość** | ✓ | ✗ | ✗ |
| **Rollback** | ✓ | Częściowy | ✗ |
| **Szybkość** | ⚡⚡⚡ | ⚡⚡ | ⚡⚡⚡ |
| **Bezpieczeństwo** | ✓✓✓ | ✓✓ | ✓ |
| **Prostota** | ✓✓✓ | ✓✓✓ | ✓ |

## Integracja z workflow

### Pre-MultiEdit checklist

- [ ] Zakres zmian jest jasny
- [ ] Pattern jest przetestowany
- [ ] Backup (git commit) jest zrobiony
- [ ] Testy są aktualne

### Post-MultiEdit checklist

- [ ] Weryfikacja zmian (code review)
- [ ] Uruchomienie testów
- [ ] Sprawdzenie czy nic nie zostało pominięte
- [ ] Git commit z opisem zmian

## Jak Claude Code może Ci pomóc?

```
Jak używać MultiEdit do zmiany nazwy funkcji?
Pokaż przykład MultiEdit dla aktualizacji importów
Jak cofnąć MultiEdit?
Jaka jest różnica między Edit a MultiEdit?
```

## Dodatkowe materiały

### Dokumentacja
- [MultiEdit Tool Reference](https://docs.claude.com/en/docs/claude-code/tools/multiedit)
- [Refactoring Best Practices](https://docs.claude.com/en/docs/claude-code/refactoring)

### Video
- [Mass Refactoring with Claude Code](https://www.youtube.com/results?search_query=claude+code+refactoring)

## Podsumowanie

Nauczyłeś się:
- Czym jest MultiEdit i kiedy go używać
- Różnic między Edit a MultiEdit
- Workflow refaktoringu z MultiEdit
- Best practices dla bezpiecznych masowych zmian
- Jak cofać i debugować problemy

**Gratulacje!** 🎉 Ukończyłeś Moduł 3: Narzędzia podstawowe. Teraz znasz wszystkie kluczowe narzędzia Claude Code. W Modułu 4 poznasz Agents i Task - zaawansowane funkcje do delegowania zadań!

---

**Ilustracje:** (do dodania)
- Diagram: MultiEdit workflow
- Infografika: Edit vs MultiEdit
- Screenshot przykładowego MultiEdit z wynikami
