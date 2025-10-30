---
title: "Efektywna komunikacja z AI"
description: "Prompt engineering dla Claude Code - jak komunikować się aby uzyskać najlepsze rezultaty"
duration: 25
difficulty: intermediate
tags: [komunikacja, prompt-engineering, best-practices, tips]
---

# Efektywna komunikacja z AI

## Wprowadzenie

Sposób w jaki komunikujesz się z Claude Code ma ogromny wpływ na jakość rezultatów. W tej lekcji poznasz techniki efektywnej komunikacji i prompt engineering.

## Podstawy dobrej komunikacji

### 1. Bądź konkretny

❌ **Źle:**
```
Napraw ten bug
```

✅ **Dobrze:**
```
W pliku UserService.ts funkcja loginUser nie waliduje poprawnie email.
Dodaj walidację używając regex dla email.
```

### 2. Podaj kontekst

❌ **Źle:**
```
Dodaj walidację
```

✅ **Dobrze:**
```
W formularzu rejestracji (RegisterForm.tsx) dodaj walidację:
- email: format email
- password: min 8 znaków, 1 wielka litera, 1 cyfra
- username: min 3 znaki, tylko alfanumeryczne
```

### 3. Określ expected output

❌ **Źle:**
```
Przejrzyj kod
```

✅ **Dobrze:**
```
Przejrzyj kod w src/api/ i przedstaw raport:
1. Lista znalezionych problemów (high/medium/low)
2. Sugestie poprawek
3. Ocena 1-10
```

## Techniki Prompt Engineering

### 1. Chain of Thought

Prowadź Claude Code przez proces myślenia:

```
Zaimplementuj user authentication:

Krok 1: Zaprojektuj schema User w bazie
Krok 2: Stwórz API endpoints (POST /register, POST /login)
Krok 3: Implementuj hashowanie haseł (bcrypt)
Krok 4: Generowanie JWT tokens
Krok 5: Middleware autoryzacji
Krok 6: Testy dla każdego kroku

Zacznij od kroku 1.
```

### 2. Few-Shot Examples

Podaj przykłady:

```
Wygeneruj API documentation dla wszystkich endpoints w formacie:

Przykład:
## POST /api/users
Tworzy nowego użytkownika
### Request:
```json
{"email": "user@example.com", "name": "John"}
```
### Response:
```json
{"id": 1, "email": "user@example.com"}
```

Wygeneruj podobnie dla pozostałych endpoints.
```

### 3. Constraints

Określ ograniczenia:

```
Zrefaktoruj funkcję calculateTotal z następującymi constraintami:
- Funkcja musi pozostać pure (no side effects)
- Musi działać z tablicą >10000 elementów (performance)
- Testy muszą nadal przechodzić
- Maksymalnie 20 linii kodu
```

### 4. Role Assignment

Przypisz rolę Claude Code:

```
Jesteś senior React developer z 10-letnim doświadczeniem.
Przejrzyj mój komponent LoginForm.tsx i zaproponuj improvements
według najnowszych best practices React 18.
```

## Struktura dobrego prompta

```
[Kontekst]
Pracuję nad aplikacją e-commerce w Next.js 14.

[Zadanie]
Zaimplementuj koszyk zakupowy.

[Wymagania]
- Server-side rendering
- Persistent w localStorage
- Real-time aktualizacja
- Mobile-friendly

[Constraints]
- Używaj App Router (nie Pages)
- TypeScript strict mode
- Tailwind CSS dla stylów

[Expected Output]
1. Komponenty (CartProvider, CartItem, CartSummary)
2. Hooks (useCart)
3. Testy (min 80% coverage)
4. Documentation
```

## Komunikacja iteracyjna

### Iteracja 1: High-level
```
Ty: Dodaj system komentarzy do bloga

Claude Code: [Plan Mode]
Proponuję architekturę...
```

### Iteracja 2: Drilldown
```
Ty: Zatwierdź plan. Zacznij od implementacji backend API.

Claude Code: [Implementuje API]
```

### Iteracja 3: Refinement
```
Ty: Dodaj rate limiting (max 10 komentarzy/godzinę na użytkownika)

Claude Code: [Dodaje rate limiting]
```

## Co robić gdy Claude Code nie rozumie?

### 1. Uprość
Podziel na mniejsze, jaśniejsze zadania.

### 2. Podaj przykład
Pokaż podobny kod który już działa.

### 3. Wskaż lokalizację
```
W pliku src/api/users.ts w funkcji getUser (linia 45)
zmień...
```

### 4. Użyj innego modelu
Opus dla złożonych zadań, Haiku dla prostych.

## Anti-patterns

❌ **Za ogólne:**
```
Zrób coś z tym kodem
```

❌ **Za dużo naraz:**
```
Zrefaktoruj cały projekt, dodaj testy, zaktualizuj dokumentację,
napraw wszystkie bugi, zoptymalizuj performance...
```

❌ **Zakładanie wiedzy:**
```
Użyj tego wzorca który omawialiśmy wcześniej
(Claude Code nie ma dostępu do historii)
```

❌ **Brak kontekstu:**
```
Napraw ten błąd
(Jaki błąd? Gdzie?)
```

## Best Practices

✅ **Konkretny**
✅ **Z kontekstem**
✅ **Krok po kroku**
✅ **Z przykładami**
✅ **Z expected output**

## Zadanie praktyczne

Przepisz te złe prompty na dobre:

1. "Dodaj walidację"
2. "Zrób refaktoring"
3. "Napraw bug"

---
