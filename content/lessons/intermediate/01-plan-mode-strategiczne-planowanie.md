---
title: "Plan Mode - strategiczne planowanie projektów"
description: "Jak używać Plan Mode do przemyślenia architektury i strategii przed rozpoczęciem kodowania"
duration: 20
difficulty: intermediate
tags: [plan-mode, planowanie, strategia, architektura]
---

# Plan Mode - strategiczne planowanie projektów

## Wprowadzenie

Plan Mode to specjalny tryb działania Claude Code, który pozwala Ci współpracować z AI w fazie planowania, zanim napiszesz choćby linię kodu. W tym trybie Claude Code skupia się na analizie wymagań, projektowaniu architektury i tworzeniu szczegółowego planu działania - bez wprowadzania zmian w kodzie.

To jak sesja brainstormingu z doświadczonym architektem, który pomoże Ci przemyśleć wszystkie aspekty projektu, zidentyfikować potencjalne problemy i zaplanować optymalną ścieżkę implementacji.

## Dlaczego to ważne?

**Oszczędność czasu:** Godzina planowania może zaoszczędzić dni refaktoringu. Plan Mode pomaga uniknąć błędów architektonicznych, które są kosztowne w naprawie.

**Lepsze decyzje:** Możesz rozważyć różne podejścia i wybrać najlepsze rozwiązanie zanim zaczniesz kodować. Claude Code może przedstawić alternatywy i ich wady/zalety.

**Jasna wizja:** Dzięki planowi wiesz dokładnie, co robić w każdym kroku. Nie tracisz czasu zastanawiając się "co dalej?".

**Komunikacja w zespole:** Plan można łatwo udostępnić zespołowi, co poprawia współpracę i synchronizację.

## Kiedy używać Plan Mode?

✅ **Używaj Plan Mode, gdy:**
- Rozpoczynasz nowy projekt lub funkcjonalność
- Refaktorujesz dużą część kodu
- Nie jesteś pewien optymalnej architektury
- Chcesz przeanalizować różne podejścia przed implementacją
- Pracujesz nad złożonym problemem wymagającym przemyślenia
- Potrzebujesz oszacować zakres pracy przed rozpoczęciem

❌ **Nie używaj Plan Mode, gdy:**
- Robisz prostą, oczywistą zmianę (np. poprawka literówki)
- Już wiesz dokładnie co i jak zrobić
- Pracujesz nad pilnym bugfixem
- Chcesz szybko przetestować pomysł (lepiej użyć trybu normalnego)

## Jak działa Plan Mode?

### Aktywacja Plan Mode

Plan Mode można aktywować na dwa sposoby:

**Sposób 1: Automatyczna aktywacja** (gdy Claude Code wykryje planowanie)
```
Ty: Chcę dodać system autoryzacji użytkowników do mojej aplikacji.
    Pomóż mi zaplanować implementację.

Claude Code: Wykryłem, że chcesz zaplanować implementację.
             Aktywuję Plan Mode...
```

**Sposób 2: Manualna aktywacja**
```
Ty: /plan

Claude Code: Plan Mode aktywowany. Opowiedz mi o swoim projekcie...
```

### Proces planowania

W Plan Mode Claude Code:

1. **Zadaje pytania** - aby zrozumieć wymagania
2. **Analizuje kontekst** - przegląda istniejący kod (bez edycji)
3. **Proponuje architekturę** - przedstawia różne opcje
4. **Tworzy plan działania** - dzieli projekt na konkretne kroki
5. **Czeka na zatwierdzenie** - nie przechodzi do kodu bez Twojej zgody

### Wyjście z Plan Mode

```
Ty: Plan wygląda dobrze, zacznijmy implementację

Claude Code: Zamykam Plan Mode. Przechodzę do implementacji...
             [Claude Code przełącza się w tryb normalny i zaczyna kodować]
```

## Przykład praktyczny

### Scenariusz: System komentarzy w blogu

**Krok 1: Aktywacja i opis projektu**

```
Ty: Chcę dodać system komentarzy do mojego bloga. Pomóż mi to zaplanować.

Claude Code: [Plan Mode] Świetnie! Pomogę Ci zaplanować system komentarzy.

Najpierw kilka pytań:
1. Czy komentarze będą wymagały rejestracji użytkownika?
2. Czy planujesz nested comments (odpowiedzi na komentarze)?
3. Czy będziesz potrzebował moderacji komentarzy?
4. Jaki backend używasz? (Express, Django, Rails, etc.)
5. Jaka jest skala? (ile komentarzy dziennie oczekujesz?)
```

**Krok 2: Odpowiedzi i analiza**

```
Ty: 1. Tak, tylko zalogowani
    2. Nie, flat structure
    3. Tak, podstawowa moderacja
    4. Express + MongoDB
    5. ~100 komentarzy dziennie

Claude Code: [Plan Mode] Rozumiem. Przeanalizowałem Twój projekt.
             Proponuję następującą architekturę...

## Architektura systemu komentarzy

### 1. Model danych (MongoDB)
```javascript
{
  _id: ObjectId,
  postId: ObjectId,
  userId: ObjectId,
  content: String,
  status: 'pending' | 'approved' | 'rejected',
  createdAt: Date,
  updatedAt: Date
}
```

### 2. API Endpoints
- POST /api/comments - dodanie komentarza
- GET /api/comments/:postId - lista komentarzy do posta
- DELETE /api/comments/:id - usunięcie komentarza (autor/admin)
- PATCH /api/comments/:id/moderate - moderacja (admin)

### 3. Frontend components
- CommentList - wyświetlenie komentarzy
- CommentForm - formularz dodawania
- CommentItem - pojedynczy komentarz
- ModerationPanel - panel moderacji (admin)

### 4. Plan implementacji (8 kroków)

**Krok 1:** Model Comment w Mongoose
**Krok 2:** API routes i kontrolery
**Krok 3:** Middleware autoryzacji
**Krok 4:** CommentForm component
**Krok 5:** CommentList component
**Krok 6:** Integracja z postami
**Krok 7:** Panel moderacji
**Krok 8:** Testy

Czy taka architektura Ci odpowiada? Mogę przedstawić alternatywy.
```

**Krok 3: Zatwierdzenie i przejście do implementacji**

```
Ty: Plan wygląda świetnie! Zacznijmy od kroku 1.

Claude Code: [Zamykam Plan Mode]
             Przechodzę do implementacji kroku 1...
             [Tworzy model Comment]
```

## Zaawansowane techniki

### 1. Porównywanie opcji

```
Ty: Jakie są różnice między MongoDB a PostgreSQL dla tego projektu?

Claude Code: [Plan Mode] Porównajmy obie opcje:

**MongoDB (NoSQL)**
✅ Zalety:
  - Szybsza implementacja (schema-less)
  - Łatwiejsza skalowalność horyzontalna
  - Lepiej dla dużych ilości prostych dokumentów

❌ Wady:
  - Brak relacyjności (trzeba manualnie dbać o spójność)
  - Trudniejsze złożone zapytania

**PostgreSQL (SQL)**
✅ Zalety:
  - Relacje i integrity constraints
  - Zaawansowane zapytania (JOIN, subqueries)
  - ACID compliance - większa niezawodność

❌ Wady:
  - Więcej konfiguracji
  - Trudniejsza skalowanie horyzontalne

**Moja rekomendacja:**
Dla systemu komentarzy z ~100/dzień i potrzebą relacji z użytkownikami
i postami - PostgreSQL będzie lepszym wyborem.
```

### 2. Analiza ryzyk

```
Ty: Jakie są potencjalne problemy z tym planem?

Claude Code: [Plan Mode] Zidentyfikowałem następujące ryzyka:

**🔴 Wysokie ryzyko:**
1. **Spam i abuse** - brak rate limiting
   → Rozwiązanie: Dodać express-rate-limit

**🟡 Średnie ryzyko:**
2. **Performance** - brak cache'owania komentarzy
   → Rozwiązanie: Redis cache dla popularnych postów

**🟢 Niskie ryzyko:**
3. **Walidacja** - podstawowa walidacja może być niewystarczająca
   → Rozwiązanie: Użyć Joi/Zod do walidacji
```

## Zadanie praktyczne

**Cel:** Użyj Plan Mode do zaplanowania nowej funkcjonalności

### Zadanie 1: Aktywacja Plan Mode

1. Uruchom Claude Code w swoim projekcie
2. Aktywuj Plan Mode (automatycznie lub `/plan`)
3. Opisz funkcjonalność, którą chcesz dodać (np. "system wyszukiwania")

### Zadanie 2: Iteracja planu

1. Odpowiedz na pytania Claude Code
2. Poproś o porównanie 2-3 różnych podejść
3. Zidentyfikuj potencjalne ryzyka i problemy

### Zadanie 3: Finalizacja

1. Zatwierdź wybrany plan
2. Poproś o szczegółowy breakdown na kroki
3. Przejdź do implementacji pierwszego kroku

**Oczekiwany rezultat:**
- Szczegółowy plan architektury
- Lista kroków do implementacji
- Zrozumienie wad/zalet różnych podejść

### Przykładowe zapytanie do wykonania

```
W Plan Mode zapytaj:

"Chcę dodać system powiadomień email do mojej aplikacji.
Użytkownicy powinni dostawać powiadomienia o:
- Nowych komentarzach do ich postów
- Odpowiedziach na ich komentarze
- Newsletter (opcjonalnie)

Pomóż mi to zaplanować, uwzględniając:
- Wybór usługi email (SendGrid, Mailgun, AWS SES)
- Kolejkowanie zadań (żeby nie blokować requestów)
- Template'y email
- Preferencje użytkownika (co chce dostawać)"
```

## Jak Claude Code może Ci pomóc?

W kontekście Plan Mode możesz zapytać:
- "Pokaż mi przykład użycia Plan Mode dla projektu e-commerce"
- "Jakie pytania powinienem zadać podczas planowania API?"
- "Jak porównać różne podejścia architektoniczne?"
- "Jak zidentyfikować ryzyka w planie projektu?"

## Dodatkowe materiały

### Oficjalna dokumentacja
- [Plan Mode Guide](https://docs.claude.com/en/docs/claude-code/plan-mode)
- [ExitPlanMode Tool](https://docs.claude.com/en/docs/claude-code/tools#exitplanmode)
- [Conversation Planning](https://docs.claude.com/en/docs/claude-code/conversation-planning)

### Video tutoriale
- [Planning Projects with Claude Code](https://www.youtube.com/results?search_query=claude+code+plan+mode)
- [Architecture Planning with AI](https://www.youtube.com/results?search_query=claude+code+architecture)

### Artykuły
- [Best Practices for AI-Assisted Planning](https://www.anthropic.com/news)
- [From Plan to Code: A Complete Workflow](https://dev.to/search?q=claude%20code%20planning)

### Przykłady z życia
- [GitHub - Example Planning Sessions](https://github.com/search?q=claude+code+plan)
- [Real-world Planning Examples](https://www.reddit.com/r/ClaudeAI/search/?q=plan%20mode)

## Podsumowanie

W tej lekcji nauczyłeś się:
- Czym jest Plan Mode i kiedy go używać
- Jak aktywować i wykorzystywać Plan Mode
- Jak porównywać różne opcje architektoniczne
- Jak identyfikować ryzyka przed implementacją
- Jak przejść od planu do kodu

Plan Mode to potężne narzędzie, które może znacząco poprawić jakość Twojego kodu przez lepsze planowanie. Używaj go zawsze, gdy masz wątpliwości co do architektury lub podejścia do problemu.

W następnej lekcji poznasz narzędzie TodoWrite, które pomoże Ci organizować i śledzić zadania podczas implementacji.

---

**Ilustracje:** (do dodania)
- Screenshot aktywacji Plan Mode
- Diagram procesu planowania
- Przykład porównania opcji architektonicznych
