---
title: "WebSearch i WebFetch - dostęp do aktualnych informacji"
description: "Jak wykorzystać narzędzia WebSearch i WebFetch do uzyskiwania aktualnej wiedzy z internetu"
duration: 22
difficulty: intermediate
tags: [websearch, webfetch, internet, dokumentacja, research]
---

# WebSearch i WebFetch - dostęp do aktualnych informacji

## Wprowadzenie

Claude Code, podobnie jak każdy model AI, ma określoną datę "obcięcia" wiedzy (knowledge cutoff). Oznacza to, że nie zna wydarzeń ani aktualizacji, które nastąpiły po tej dacie. Tutaj z pomocą przychodzą narzędzia **WebSearch** i **WebFetch** - umożliwiają Claude Code dostęp do aktualnych informacji z internetu w czasie rzeczywistym.

**WebSearch** pozwala na przeszukiwanie internetu (podobnie jak Google), a **WebFetch** pobiera i analizuje zawartość konkretnych stron internetowych. Razem tworzą potężną kombinację do research'u i aktualizacji wiedzy.

## Dlaczego to ważne?

**Aktualna wiedza:** Możesz uzyskać informacje o najnowszych wersjach bibliotek, API, czy frameworków, które pojawiły się po dacie cutoff.

**Dostęp do dokumentacji:** Claude Code może przeczytać oficjalną dokumentację projektu, nawet jeśli nie zna jej z treningów.

**Rozwiązywanie problemów:** Możesz wyszukać konkretne błędy, znane problemy, lub rozwiązania z Stack Overflow czy GitHub Issues.

**Weryfikacja informacji:** Claude Code może sprawdzić, czy jego wiedza jest aktualna i skorygować się na podstawie najnowszych źródeł.

## Kiedy używać WebSearch i WebFetch?

### WebSearch

✅ **Używaj WebSearch, gdy:**
- Potrzebujesz znaleźć najnowszą wersję biblioteki
- Szukasz rozwiązania konkretnego błędu
- Chcesz znaleźć przykłady użycia nowego API
- Potrzebujesz porównać różne podejścia (np. "React vs Vue 2024")
- Szukasz dokumentacji lub tutoriali

❌ **Nie używaj WebSearch, gdy:**
- Pytasz o coś, co Claude Code już wie
- Potrzebujesz informacji z konkretnej strony (użyj WebFetch)
- Pytanie dotyczy Twojego lokalnego kodu

### WebFetch

✅ **Używaj WebFetch, gdy:**
- Znasz konkretny URL dokumentacji, którą chcesz przeanalizować
- Potrzebujesz przeczytać treść artykułu lub blog posta
- Chcesz uzyskać szczegółowe informacje z konkretnej strony
- Musisz sprawdzić aktualny stan GitHub README

❌ **Nie używaj WebFetch, gdy:**
- Nie znasz dokładnego URL (najpierw użyj WebSearch)
- Strona wymaga logowania lub jest za paywallem
- Potrzebujesz informacji z wielu stron (użyj WebSearch)

## Jak działają te narzędzia?

### WebSearch - wyszukiwanie informacji

**Składnia:**
```
Ty: Wyszukaj najnowszą wersję React Router

Claude Code: [Używa WebSearch]
             Wyszukuję: "React Router latest version 2024"

             Znalazłem następujące informacje:
             - React Router v6.21 (grudzień 2023)
             - Główne zmiany: nowy API dla loaderów, improved types
             - Link: https://reactrouter.com/en/main
```

Claude Code automatycznie:
1. Formułuje odpowiednie zapytanie wyszukiwania
2. Przeszukuje internet
3. Analizuje wyniki
4. Przedstawia znalezione informacje

### WebFetch - pobieranie zawartości strony

**Składnia:**
```
Ty: Przeanalizuj dokumentację na stronie https://docs.example.com/api

Claude Code: [Używa WebFetch]
             Pobieram zawartość: https://docs.example.com/api

             Przeanalizowana dokumentacja:
             - API endpoint: POST /api/users
             - Parametry: name (string), email (string)
             - Zwraca: user object z ID

             [Claude Code może teraz używać tej informacji w kodzie]
```

## Przykłady praktyczne

### Przykład 1: Wyszukanie najnowszej składni

```
Ty: Jak używać async/await w najnowszym TypeScript?

Claude Code: Pozwól, że sprawdzę aktualną dokumentację TypeScript.
             [WebSearch: "TypeScript async await latest syntax"]

             Według najnowszej dokumentacji TypeScript 5.3:

             ```typescript
             async function fetchData(): Promise<Data> {
               try {
                 const response = await fetch('/api/data');
                 const data: Data = await response.json();
                 return data;
               } catch (error) {
                 console.error('Error:', error);
                 throw error;
               }
             }
             ```

             Nowe funkcje w TS 5.3:
             - Improved type inference dla async
             - Better error handling types
```

### Przykład 2: Sprawdzenie dokumentacji API

```
Ty: Sprawdź jak używać Stripe Payment Intents API

Claude Code: [WebFetch: https://stripe.com/docs/payments/payment-intents]

             Na podstawie oficjalnej dokumentacji Stripe:

             1. Utwórz Payment Intent:
             ```javascript
             const paymentIntent = await stripe.paymentIntents.create({
               amount: 2000,
               currency: 'usd',
               payment_method_types: ['card'],
             });
             ```

             2. Potwierdź płatność po stronie klienta:
             ```javascript
             const {error} = await stripe.confirmCardPayment(
               clientSecret,
               {payment_method: {card: cardElement}}
             );
             ```
```

### Przykład 3: Rozwiązanie błędu

```
Ty: Mam błąd "Cannot read property 'map' of undefined" w React

Claude Code: [WebSearch: "React Cannot read property map of undefined solution"]

             Znalazłem typowe przyczyny i rozwiązania:

             **Problem:** Próbujesz użyć .map() na undefined/null

             **Rozwiązania:**

             1. **Conditional rendering:**
             ```jsx
             {data && data.map(item => <div key={item.id}>{item.name}</div>)}
             ```

             2. **Default value:**
             ```jsx
             {(data || []).map(item => <div key={item.id}>{item.name}</div>)}
             ```

             3. **Loading state:**
             ```jsx
             if (!data) return <Loading />;
             return data.map(item => <div key={item.id}>{item.name}</div>);
             ```
```

### Przykład 4: Porównanie technologii

```
Ty: Porównaj Next.js App Router vs Pages Router - co wybrać w 2024?

Claude Code: [WebSearch: "Next.js App Router vs Pages Router 2024 comparison"]

             Na podstawie najnowszych źródeł (Q4 2024):

             **App Router (Nowy - zalecany):**
             ✅ Server Components domyślnie
             ✅ Streaming i Suspense
             ✅ Lepszy performance
             ✅ Oficjalnie zalecany przez Vercel
             ❌ Starsza nauka
             ❌ Mniej przykładów w starszych tutorialach

             **Pages Router (Stary - stabilny):**
             ✅ Więcej przykładów i tutoriali
             ✅ Bardziej "React-like"
             ✅ Większa ekosystem 3rd-party
             ❌ Przestarzały (legacy mode w przyszłości)
             ❌ Gorsza performance

             **Rekomendacja dla 2024:**
             Nowe projekty → App Router
             Istniejące projekty → można pozostać na Pages Router
```

## Zaawansowane techniki

### 1. Łączenie WebSearch i WebFetch

```
Ty: Znajdź najlepszą bibliotekę do animacji w React i pokaż przykład użycia

Claude Code: [WebSearch: "best React animation library 2024"]

             Najpopularniejsze opcje:
             1. Framer Motion - najbardziej zalecana
             2. React Spring
             3. GSAP

             Sprawdzę dokumentację Framer Motion...
             [WebFetch: https://www.framer.com/motion/]

             Oto przykład z oficjalnej dokumentacji:

             ```jsx
             import { motion } from "framer-motion";

             function Component() {
               return (
                 <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.5 }}
                 >
                   Animowany element
                 </motion.div>
               );
             }
             ```
```

### 2. Weryfikacja własnej wiedzy

```
Claude Code: Myślę, że składnia to X, ale pozwól że sprawdzę...
             [WebFetch: dokumentacja]

             Poprawiam się - aktualna składnia to Y, nie X.
             [Pokazuje poprawiony kod]
```

### 3. Multi-source research

```
Ty: Zbadaj czy warto używać Bun zamiast Node.js

Claude Code: Przeprowadzę research z kilku źródeł:

             [WebSearch: "Bun vs Node.js performance 2024"]
             [WebSearch: "Bun production ready"]
             [WebFetch: https://bun.sh/docs]

             Podsumowanie z 3 źródeł:

             **Performance (benchmark tests):**
             - Bun: 3x szybszy niż Node.js

             **Production readiness (GitHub Issues):**
             - Wciąż beta, ale stabilizuje się
             - Kilka firm używa w produkcji

             **Dokumentacja oficjalna:**
             - Kompatybilny z Node.js API
             - Built-in TypeScript support

             **Rekomendacja:** Dobre na nowe projekty, ostrożnie w produkcji.
```

## Najlepsze praktyki

### ✅ Dobre praktyki

1. **Konkretne zapytania**
   - ✅ "Next.js 14 server actions example"
   - ❌ "Next.js"

2. **Dodawaj rok do zapytań**
   - ✅ "React best practices 2024"
   - ❌ "React best practices" (może zwrócić stare wyniki)

3. **Weryfikuj źródła**
   - Sprawdź czy informacje pochodzą z oficjalnej dokumentacji

4. **Łącz z lokalnym kodem**
   - Po uzyskaniu informacji, zastosuj je w kontekście Twojego projektu

### ❌ Anty-wzorce

1. **Nadużywanie** - nie wyszukuj rzeczy, które Claude Code już wie
2. **Za ogólne zapytania** - "JavaScript" to za mało, sprecyzuj czego szukasz
3. **Ignorowanie dat** - stare artykuły mogą zawierać przestarzałe informacje
4. **Ślepe zaufanie** - zawsze weryfikuj kod z internetu

## Ograniczenia i rozwiązywanie problemów

### Ograniczenia WebSearch
- Dostępne tylko w USA (na razie)
- Nie ma dostępu do stron za paywallem
- Może zwrócić przestarzałe wyniki jeśli zapytanie jest nieprecyzyjne

### Ograniczenia WebFetch
- Nie może logować się do serwisów
- Niektóre strony blokują automatyczne pobieranie
- Nie obsługuje JavaScript-heavy stron (React apps bez SSR)

### Rozwiązywanie problemów

**Problem:** "WebSearch nie znajduje informacji"
```
Rozwiązanie:
- Sprecyzuj zapytanie (dodaj rok, konkretne słowa kluczowe)
- Użyj angielskich terminów (więcej wyników)
- Spróbuj alternatywnych sformułowań
```

**Problem:** "WebFetch nie może pobrać strony"
```
Rozwiązanie:
- Sprawdź czy URL jest publiczny
- Sprawdź czy strona nie wymaga logowania
- Spróbuj alternatywnego URL (np. GitHub raw content)
```

## Zadanie praktyczne

**Cel:** Użyj WebSearch i WebFetch do research'u i implementacji nowej funkcjonalności

### Zadanie 1: Research biblioteki

1. Zapytaj Claude Code: "Znajdź najlepszą bibliotekę do walidacji formularzy w React 2024"
2. Poproś o porównanie top 3 opcji
3. Wybierz jedną i poproś o pokazanie przykładu użycia z dokumentacji

### Zadanie 2: Rozwiązanie błędu

1. Symuluj błąd: "Mam warning: 'Cannot update a component while rendering a different component'"
2. Poproś Claude Code o wyszukanie rozwiązania
3. Zastosuj rozwiązanie w swoim kodzie

### Zadanie 3: Aktualizacja wiedzy

1. Zapytaj: "Jakie są nowe feature'y w TypeScript 5.3?"
2. Poproś Claude Code o pokazanie przykładów każdego z nich
3. Zastosuj jeden z nowych feature'ów w swoim projekcie

**Oczekiwany rezultat:**
- Claude Code używa WebSearch/WebFetch automatycznie
- Otrzymujesz aktualne informacje z oficjalnych źródeł
- Kod jest zgodny z najnowszymi best practices

## Jak Claude Code może Ci pomóc?

Możesz zapytać Claude Code:
- "Wyszukaj najnowszą dokumentację dla [technologia]"
- "Sprawdź czy [informacja] jest aktualna"
- "Znajdź rozwiązanie dla [błąd]"
- "Porównaj [technologia A] vs [technologia B] w 2024"

## Dodatkowe materiały

### Oficjalna dokumentacja
- [WebSearch Tool](https://docs.claude.com/en/docs/claude-code/tools#websearch)
- [WebFetch Tool](https://docs.claude.com/en/docs/claude-code/tools#webfetch)
- [Internet Access Best Practices](https://docs.claude.com/en/docs/claude-code/internet-access)

### Video tutoriale
- [Using WebSearch in Claude Code](https://www.youtube.com/results?search_query=claude+code+websearch)
- [Research Workflows with Claude Code](https://www.youtube.com/results?search_query=claude+code+research)

### Artykuły
- [Effective Research with AI Assistants](https://www.anthropic.com/news)
- [Keeping Your Code Up-to-Date](https://dev.to/search?q=claude%20code%20research)

### Przykłady użycia
- [GitHub - WebSearch Examples](https://github.com/search?q=claude+code+websearch)
- [Real-world Research Workflows](https://www.reddit.com/r/ClaudeAI/search/?q=websearch)

## Podsumowanie

W tej lekcji nauczyłeś się:
- Różnic między WebSearch (wyszukiwanie) a WebFetch (pobieranie stron)
- Kiedy używać każdego z tych narzędzi
- Jak formułować efektywne zapytania
- Jak łączyć informacje z internetu z lokalnym kodem
- Najlepszych praktyk research'u z Claude Code

WebSearch i WebFetch to kluczowe narzędzia, które eliminują ograniczenie "knowledge cutoff" i pozwalają Claude Code być zawsze na bieżąco. Używaj ich zawsze, gdy potrzebujesz aktualnej wiedzy lub dostępu do dokumentacji.

W następnej lekcji poznasz narzędzie MultiEdit, które pozwala na jednoczesną edycję wielu plików - nieocenione przy refaktoringu!

---

**Ilustracje:** (do dodania)
- Screenshot działania WebSearch z wynikami
- Diagram flow: WebSearch → Wybór źródła → WebFetch → Implementacja
- Przykład porównania wyników z różnych źródeł
