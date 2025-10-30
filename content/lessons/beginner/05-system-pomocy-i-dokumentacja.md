---
title: "System pomocy i dokumentacja"
description: "Jak znaleźć odpowiedzi na pytania używając wbudowanego systemu pomocy i dokumentacji Claude Code"
duration: 12
difficulty: beginner
tags: [pomoc, dokumentacja, WebSearch, self-service]
---

# System pomocy i dokumentacja

## Wprowadzenie

Jedną z najpotężniejszych cech Claude Code jest możliwość samoobsługi - narzędzie może samo wyszukać odpowiedzi na Twoje pytania w oficjalnej dokumentacji. Nie musisz opuszczać terminala ani przerywać pracy, aby znaleźć pomoc. W tej lekcji dowiesz się, jak maksymalnie wykorzystać wbudowany system pomocy i dokumentacji.

## Dlaczego to ważne?

Efektywne korzystanie z systemu pomocy to:
- **Niezależność:** Nie musisz czekać na odpowiedzi w forach czy od kolegów
- **Aktualność:** Claude Code ma dostęp do najnowszej dokumentacji
- **Kontekst:** Pomoc jest dostosowana do Twojej konkretnej sytuacji
- **Produktywność:** Nie przerywasz pracy, aby szukać w przeglądarce

## Wbudowane narzędzia pomocy

Claude Code ma dostęp do kilku narzędzi, które pozwalają mu pomagać Ci w czasie rzeczywistym:

### 1. WebSearch - Wyszukiwanie w internecie

Claude Code może przeszukiwać internet, aby znaleźć aktualne informacje:

```
Wyszukaj najnowsze informacje o nowej funkcji X w Claude Code
```

Claude Code automatycznie użyje narzędzia WebSearch i przedstawi wyniki.

### 2. WebFetch - Pobieranie treści ze stron

Może pobrać i przeanalizować konkretne strony dokumentacji:

```
Pokaż mi dokumentację dla narzędzia Bash w Claude Code
```

Claude Code pobierze stronę z docs.claude.com i wyświetli potrzebne informacje.

### 3. Bezpośredni dostęp do docs.claude.com

Claude Code ma szczególny dostęp do oficjalnej dokumentacji Anthropic:

```
Jak używać narzędzia MultiEdit?
Jakie są best practices dla prompt engineering w Claude Code?
Pokaż mi przykłady użycia agents
```

## Rodzaje pytań, na które Claude Code może odpowiedzieć

### Pytania o funkcjonalności

```
✅ "Jak mogę wyszukać tekst we wszystkich plikach projektu?"
✅ "Jakie narzędzia są dostępne w Claude Code?"
✅ "Jak edytować wiele plików jednocześnie?"
```

**Odpowiedź:** Claude Code wyjaśni narzędzie Grep, Glob i MultiEdit z przykładami

### Pytania o najlepsze praktyki

```
✅ "Jak efektywnie strukturyzować prompty dla Claude Code?"
✅ "Kiedy powinienem używać agents zamiast zadawać bezpośrednie pytania?"
✅ "Jak zorganizować projekt, aby Claude Code działał optymalnie?"
```

**Odpowiedź:** Claude Code znajdzie i przedstawi best practices z dokumentacji

### Pytania troubleshootingowe

```
✅ "Dlaczego Claude Code nie znajduje moich plików?"
✅ "Jak rozwiązać błąd 'permission denied'?"
✅ "Co zrobić, gdy sesja się zawiesza?"
```

**Odpowiedź:** Claude Code przeszuka dokumentację i GitHub Issues

### Pytania o konkretne przykłady

```
✅ "Pokaż przykład użycia Task tool z agents"
✅ "Jak wygląda typowy workflow z Claude Code przy refaktoringu?"
✅ "Przykład konfiguracji slash command"
```

**Odpowiedź:** Claude Code znajdzie przykłady z dokumentacji lub GitHub

## Jak zadawać skuteczne pytania?

### ✅ Dobre pytania

**Konkretne:**
```
"Jak używać narzędzia Grep do wyszukania wszystkich funkcji nazywających się 'calculate' w plikach JavaScript?"
```

**Z kontekstem:**
```
"Pracuję nad projektem React. Jak mogę użyć Claude Code do dodania PropTypes do wszystkich komponentów?"
```

**Działaniowe:**
```
"Pokaż mi krok po kroku, jak stworzyć własny slash command"
```

### ❌ Mniej efektywne pytania

**Zbyt ogólne:**
```
"Jak działa Claude Code?"
```
*Lepiej:* "Jakie są podstawowe narzędzia dostępne w Claude Code i do czego służą?"

**Bez kontekstu:**
```
"Dlaczego nie działa?"
```
*Lepiej:* "Próbuję edytować plik config.json, ale dostaję błąd 'file not found'. Co może być nie tak?"

**Niejasne:**
```
"Agent coś"
```
*Lepiej:* "Jakie typy agents są dostępne w Claude Code i kiedy używać każdego z nich?"

## Kiedy używać systemu pomocy?

### ✅ Używaj wbudowanej pomocy, gdy:

- **Uczysz się nowego narzędzia:** "Wyjaśnij, jak działa narzędzie MultiEdit"
- **Potrzebujesz przykładu:** "Pokaż przykład użycia WebFetch"
- **Masz problem:** "Jak naprawić błąd X?"
- **Szukasz best practices:** "Jakie są dobre praktyki dla Y?"
- **Chcesz poznać aktualizacje:** "Jakie nowe funkcje zostały dodane do Claude Code?"

### ❌ Szukaj gdzie indziej, gdy:

- **Potrzebujesz bardzo zaawansowanej wiedzy domenowej:** Specjalistyczne fora branżowe
- **Problem dotyczy zewnętrznych narzędzi:** Dokumentacja danego narzędzia
- **Chcesz zobaczyć community projects:** GitHub, Reddit, Discord
- **Potrzebujesz oficjalnego supportu:** GitHub Issues, support@anthropic.com

## Praktyczne przykłady

### Przykład 1: Nauka nowego narzędzia

**Ty:**
```
Nie wiem, jak używać narzędzia Glob. Wyjaśnij mi to z przykładami.
```

**Claude Code:**
```
Narzędzie Glob służy do wyszukiwania plików według wzorców. Oto przykłady:

Podstawowe użycie:
- `**/*.js` - znajdzie wszystkie pliki .js w projekcie
- `src/**/*.test.js` - znajdzie wszystkie pliki testowe w katalogu src
- `*.{js,ts}` - znajdzie pliki .js i .ts w bieżącym katalogu

Przykład: Jeśli chcesz znaleźć wszystkie komponenty React:
[Używa Glob z wzorcem: src/components/**/*.jsx]

Znalazłem 15 plików komponentów...
```

### Przykład 2: Troubleshooting

**Ty:**
```
Próbuję edytować plik, ale dostaję błąd "old_string not found". Co to znaczy?
```

**Claude Code:**
```
Ten błąd oznacza, że narzędzie Edit nie znalazło dokładnego ciągu znaków, który próbujesz zastąpić.

Najczęstsze przyczyny:
1. Różnice w białych znakach (spacje vs tabulatory)
2. String nie jest unikalny (występuje wielokrotnie)
3. Plik był zmieniony od ostatniego odczytu

Rozwiązanie:
- Najpierw przeczytam plik, aby zobaczyć aktualną zawartość
- Wyszukam dokładny string do zastąpienia
- Zademonstruję poprawne użycie Edit

Czy chcesz, żebym to teraz zrobił dla Twojego pliku?
```

### Przykład 3: Najlepsze praktyki

**Ty:**
```
Jak powinienem organizować moje prompty, żeby Claude Code był najbardziej efektywny?
```

**Claude Code:**
```
Oto najlepsze praktyki dla promptów w Claude Code:

1. Bądź konkretny:
   ❌ "Popraw ten kod"
   ✅ "Zrefaktoryzuj funkcję calculateTotal, aby używała reduce zamiast pętli for"

2. Podawaj kontekst:
   ✅ "Pracuję nad API e-commerce. Dodaj walidację do endpointu POST /orders"

3. Dziel duże zadania:
   ✅ "Najpierw stwórz model User, potem dodamy kontroler"

4. Używaj przykładów:
   ✅ "Dodaj testy podobne do tych w auth.test.js"

5. Weryfikuj wyniki:
   ✅ "Uruchom testy po zmianach, aby sprawdzić, czy wszystko działa"

[Claude Code może teraz wyszukać więcej szczegółów w dokumentacji, jeśli chcesz]
```

### Przykład 4: Eksplorujesz możliwości

**Ty:**
```
Jakie zaawansowane funkcje Claude Code powinienem poznać jako osoba średnio zaawansowana?
```

**Claude Code:**
```
Oto zaawansowane funkcje warte poznania:

1. **Agents i Task tool:**
   - Delegowanie złożonych zadań do specjalizowanych agents
   - Przykład: agent.test-first-developer dla TDD workflow

2. **Slash commands:**
   - Tworzenie własnych komend do automatyzacji
   - Przechowywane w .claude/commands/

3. **Plan Mode:**
   - Strategiczne planowanie przed kodowaniem
   - Przydatne dla dużych zmian

4. **Multi-edit:**
   - Edycja wielu plików jednocześnie
   - Atomowe zmiany w całym projekcie

Chcesz, żebym szczegółowo wyjaśnił którąkolwiek z tych funkcji?
```

## Zadanie praktyczne

**Cel:** Przećwicz używanie systemu pomocy w różnych scenariuszach

### Zadanie 1: Poznaj nowe narzędzie

1. Zapytaj Claude Code: "Wyjaśnij narzędzie WebFetch i pokaż 3 praktyczne przykłady użycia"
2. Przeczytaj odpowiedź
3. Zadaj follow-up pytanie: "Jaka jest różnica między WebFetch a WebSearch?"
4. Wypróbuj narzędzie: "Użyj WebFetch, aby pobrać stronę główną docs.claude.com"

### Zadanie 2: Troubleshooting

1. Celowo spróbuj wykonać nieprawidłową operację (np. odczytać nieistniejący plik)
2. Zapytaj Claude Code: "Dlaczego otrzymuję błąd 'file not found'?"
3. Zastosuj sugerowane rozwiązanie
4. Zweryfikuj, że problem został rozwiązany

### Zadanie 3: Best practices

1. Zapytaj: "Jakie są 5 najważniejszych best practices dla efektywnej pracy z Claude Code?"
2. Dla każdej praktyki zapytaj o konkretny przykład
3. Wybierz jedną praktykę i zastosuj ją w swojej kolejnej sesji
4. Zanotuj różnicę w efektywności

### Zadanie 4: Eksploracja dokumentacji

1. Zapytaj: "Gdzie mogę znaleźć dokumentację wszystkich narzędzi Claude Code?"
2. Poproś: "Pokaż mi listę wszystkich dostępnych narzędzi z krótkim opisem"
3. Wybierz narzędzie, którego jeszcze nie znasz
4. Poproś o szczegółowe wyjaśnienie i przykłady dla tego narzędzia

## Zaawansowane techniki

### 1. Iteracyjne doprecyzowywanie

```
Ty: Jak używać agents?
CC: [ogólne wyjaśnienie]

Ty: Bardziej konkretnie - jak użyć agent do napisania testów?
CC: [konkretne przykłady z test-first-developer]

Ty: Pokaż mi pełny przykład workflow od A do Z
CC: [szczegółowy step-by-step guide]
```

### 2. Kontekstowe pytania

```
Ty: [po napotkaniu błędu] Co oznacza ten błąd i jak go naprawić?
CC: [analiza kontekstu i rozwiązanie specyficzne dla Twojej sytuacji]
```

### 3. Meta-pomoc

```
Ty: Jak powinienem sformułować pytanie, żeby dostać najlepszą odpowiedź na temat X?
CC: [pomaga w sformułowaniu lepszego pytania]
```

## Mapy mentalne pomocy

### Mapa "Czego potrzebuję?"

```
Potrzebuję pomocy → Co dokładnie?
  ├─ Nauka → "Wyjaśnij X", "Pokaż przykłady Y"
  ├─ Problem → "Jak naprawić błąd X?", "Dlaczego Y nie działa?"
  ├─ Przykład → "Pokaż, jak zrobić X", "Demo workflow Y"
  └─ Praktyka → "Jak mogę przećwiczyć X?", "Zadanie dla Y"
```

### Mapa "Jak zapytać?"

```
Moje pytanie → Jak je ulepszyć?
  ├─ Zbyt ogólne → Dodaj szczegóły i kontekst
  ├─ Niejasne → Podaj konkretny przykład
  ├─ Bez kontekstu → Opisz swoją sytuację
  └─ Za złożone → Podziel na mniejsze pytania
```

## Jak Claude Code może Ci pomóc?

Możesz w każdej chwili zapytać:
- "Jak mogę lepiej sformułować to pytanie?"
- "Gdzie w dokumentacji znajdę informacje o X?"
- "Pokaż mi najnowsze zmiany w Claude Code"
- "Jakie są typowe problemy z X i jak je rozwiązać?"

## Dodatkowe materiały

### Oficjalna dokumentacja
- [Documentation Home](https://docs.claude.com/en/docs/claude-code)
- [Tool Reference](https://docs.claude.com/en/docs/claude-code/tools)
- [Troubleshooting Guide](https://docs.claude.com/en/docs/claude-code/troubleshooting)
- [Best Practices](https://docs.claude.com/en/docs/claude-code/best-practices)

### Video tutoriale
- [Effective Help Usage in Claude Code](https://www.youtube.com/results?search_query=claude+code+help+system)
- [Finding Answers Without Leaving Terminal](https://www.youtube.com/results?search_query=claude+code+documentation)

### Artykuły
- [Mastering Self-Service in Claude Code](https://www.anthropic.com/news)
- [10 Questions Every Claude Code User Should Know How to Ask](https://www.anthropic.com/news)

### Społeczność
- [GitHub Discussions](https://github.com/anthropics/claude-code/discussions)
- [Discord - #help Channel](https://discord.gg/anthropic)
- [Reddit - r/ClaudeCode](https://www.reddit.com/r/ClaudeCode)

## Podsumowanie

W tej lekcji nauczyłeś się:
- Jak Claude Code może wyszukiwać informacje w dokumentacji
- Jakie rodzaje pytań możesz zadawać
- Jak formułować skuteczne pytania
- Kiedy używać wbudowanej pomocy, a kiedy szukać gdzie indziej
- Jak iteracyjnie doprecyzowywać pytania dla lepszych odpowiedzi

**Gratulacje!** 🎉 Ukończyłeś Moduł 1: Podstawy. Teraz znasz fundamenty Claude Code i jesteś gotowy do nauki pracy z plikami w Module 2!

---

**Ilustracje:** (do dodania)
- Diagram flow zadawania pytań
- Screenshot przykładowej sesji pomocy
- Mapa mentalna systemu pomocy
- Infografika "Dobre vs Złe pytania"
