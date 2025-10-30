---
title: "TodoWrite - organizacja i śledzenie zadań"
description: "Jak używać narzędzia TodoWrite do zarządzania zadaniami i śledzenia postępu podczas kodowania"
duration: 18
difficulty: intermediate
tags: [todowrite, todo, organizacja, zarządzanie-zadaniami, tracking]
---

# TodoWrite - organizacja i śledzenie zadań

## Wprowadzenie

TodoWrite to wbudowane narzędzie w Claude Code, które pozwala tworzyć i zarządzać listą zadań bezpośrednio podczas pracy nad projektem. To nie jest zwykła lista TODO w komentarzach - to dynamiczny system śledzenia postępu, który pomaga zarówno Tobie, jak i Claude Code utrzymać porządek w złożonych projektach.

Wyobraź sobie, że masz asystenta, który automatycznie rozbija duże zadania na mniejsze kroki, śledzi co już zostało zrobione, a co jeszcze czeka, i przypomina o tym, co nie może zostać zapomniane. To właśnie robi TodoWrite.

## Dlaczego to ważne?

**Przejrzystość:** Zawsze wiesz, co zostało zrobione i co jeszcze przed Tobą. Nie musisz trzymać wszystkiego w głowie.

**Organizacja:** Duże zadania są automatycznie rozbijane na mniejsze, łatwiejsze do zarządzania kroki.

**Komunikacja z Claude Code:** Claude Code wykorzystuje listę TODO do planowania kolejnych kroków i przypominania sobie o zadaniach, które jeszcze nie zostały ukończone.

**Śledzenie postępu:** Widoczny pasek postępu motywuje i pokazuje, ile pracy zostało wykonane.

**Unikanie zapominania:** Nic nie zostanie pominięte - każdy krok jest jawnie zaznaczony jako ukończony lub oczekujący.

## Kiedy używać TodoWrite?

✅ **Używaj TodoWrite, gdy:**
- Pracujesz nad złożonym zadaniem wymagającym wielu kroków
- Implementujesz nową funkcjonalność od zera
- Refaktorujesz dużą część kodu
- Masz wiele niezależnych zadań do wykonania
- Chcesz śledzić postęp w czasie rzeczywistym
- Pracujesz nad projektem z wieloma osobami (lepsze zrozumienie postępu)

❌ **Nie musisz używać TodoWrite, gdy:**
- Robisz prostą, jednoetapową zmianę
- Zadanie jest oczywiste i nie wymaga rozbicia
- Pracujesz nad szybkim eksperymentem
- Jedyne zadanie to "przeczytaj plik X"

## Jak działa TodoWrite?

### Struktura zadania

Każde zadanie w TodoWrite ma trzy właściwości:

```json
{
  "content": "Napisz testy jednostkowe",
  "status": "pending",  // pending | in_progress | completed
  "activeForm": "Pisanie testów jednostkowych"
}
```

- **content** - opis zadania w formie rozkazującej (co zrobić)
- **status** - aktualny status: `pending`, `in_progress`, `completed`
- **activeForm** - forma ciągła (co się dzieje TERAZ)

### Cykl życia zadania

1. **pending** → Zadanie czeka na realizację
2. **in_progress** → Claude Code pracuje nad zadaniem (tylko JEDNO zadanie na raz!)
3. **completed** → Zadanie zostało ukończone

**WAŻNE:** W danym momencie tylko JEDNO zadanie może mieć status `in_progress`.

## Przykład praktyczny

### Scenariusz: Implementacja systemu logowania

**Krok 1: Tworzenie listy zadań**

```
Ty: Zaimplementuj system logowania dla użytkowników

Claude Code: Stworzę listę zadań dla tego projektu:

📋 Lista zadań:
1. ⏳ Utworzenie modelu User w bazie danych
2. ⏸️ Implementacja endpointów API (POST /login, POST /register)
3. ⏸️ Hashowanie haseł (bcrypt)
4. ⏸️ Generowanie JWT tokenów
5. ⏸️ Middleware autoryzacji
6. ⏸️ Testy dla endpointów
7. ⏸️ Formularz logowania (frontend)

Zaczynam od zadania 1...
```

**Krok 2: Realizacja zadań**

```
Claude Code: ⏳ Tworzenie modelu User...

[Tworzy model User]

✅ Ukończono: Utworzenie modelu User
⏳ Implementacja endpointów API...

[Tworzy endpointy]

✅ Ukończono: Implementacja endpointów API
⏳ Hashowanie haseł...
```

**Krok 3: Dynamiczne dodawanie zadań**

```
Claude Code: ⚠️ Podczas implementacji zauważyłem, że brakuje walidacji danych.
             Dodaję nowe zadanie do listy:

📋 Lista zaktualizowana:
1. ✅ Utworzenie modelu User
2. ✅ Implementacja endpointów API
3. ⏳ Hashowanie haseł
4. ⏸️ Walidacja danych wejściowych (NOWE)
5. ⏸️ Generowanie JWT tokenów
...
```

## Manualne sterowanie TodoWrite

### Tworzenie listy zadań

```
Ty: Użyj TodoWrite aby zaplanować refaktoring komponentu Dashboard

Claude Code: [Używa TodoWrite]

📋 Plan refaktoringu Dashboard:
1. ⏸️ Analiza istniejącego kodu
2. ⏸️ Podział na mniejsze komponenty
3. ⏸️ Ekstrakcja logiki biznesowej do hooks
4. ⏸️ Optymalizacja renderowania (React.memo)
5. ⏸️ Aktualizacja testów
6. ⏸️ Weryfikacja działania
```

### Zmiana kolejności zadań

```
Ty: Zrób najpierw testy, potem refaktoring

Claude Code: Zmieniam kolejność zadań:

📋 Zaktualizowana lista:
1. ⏸️ Analiza istniejącego kodu
2. ⏸️ Aktualizacja testów (PRZENIESIONE)
3. ⏸️ Podział na mniejsze komponenty
4. ⏸️ Ekstrakcja logiki biznesowej do hooks
5. ⏸️ Optymalizacja renderowania
6. ⏸️ Weryfikacja działania
```

### Usuwanie zadań

```
Ty: Nie potrzebujemy optymalizacji renderowania

Claude Code: Usuwam zadanie z listy:

📋 Zaktualizowana lista:
1. ✅ Analiza istniejącego kodu
2. ⏳ Aktualizacja testów
3. ⏸️ Podział na mniejsze komponenty
4. ⏸️ Ekstrakcja logiki biznesowej do hooks
5. ⏸️ Weryfikacja działania
```

## Zaawansowane techniki

### 1. Grupowanie zadań według priorytetów

```
Claude Code: Organizuję zadania według priorytetów:

📋 🔴 WYSOKIE (krytyczne):
1. ⏸️ Naprawa błędu bezpieczeństwa
2. ⏸️ Aktualizacja zależności z CVE

📋 🟡 ŚREDNIE (ważne):
3. ⏸️ Refaktoring komponentu X
4. ⏸️ Dodanie testów

📋 🟢 NISKIE (opcjonalne):
5. ⏸️ Poprawa dokumentacji
6. ⏸️ Code cleanup
```

### 2. Zadania z pod-zadaniami

```
Claude Code: Rozbijam złożone zadanie:

📋 Lista:
1. ⏳ Implementacja systemu płatności
   1.1 ⏸️ Integracja Stripe API
   1.2 ⏸️ Webhook handling
   1.3 ⏸️ Zarządzanie subskrypcjami
   1.4 ⏸️ Panel płatności (UI)
```

### 3. Szacowanie czasu

```
Claude Code: Dodaję szacunki czasowe:

📋 Lista (całkowity czas: ~3h):
1. ⏸️ Konfiguracja Stripe (15 min)
2. ⏸️ Backend endpoints (45 min)
3. ⏸️ Frontend integracja (60 min)
4. ⏸️ Testy (30 min)
5. ⏸️ Dokumentacja (30 min)
```

## Najlepsze praktyki

### ✅ Dobre praktyki

1. **Konkretne opisy zadań**
   - ✅ Dobrze: "Dodaj walidację email w formularzu rejestracji"
   - ❌ Źle: "Dodaj walidację"

2. **Atomowe zadania**
   - ✅ Dobrze: Jedno zadanie = jedna jasno określona zmiana
   - ❌ Źle: "Zrób całą aplikację"

3. **Aktualizuj na bieżąco**
   - ✅ Dobrze: Oznaczaj jako completed natychmiast po ukończeniu
   - ❌ Źle: Zbiorcze aktualizacje na końcu

4. **Używaj activeForm prawidłowo**
   - ✅ Dobrze: content: "Napisz testy", activeForm: "Pisanie testów"
   - ❌ Źle: content: "Pisanie testów", activeForm: "Napisz testy"

### ❌ Anty-wzorce

1. **Za dużo zadań** - Nie twórz 50 mikro-zadań dla prostego projektu
2. **Za mało zadań** - Nie używaj jednego zadania "Zrób wszystko"
3. **Nieaktualna lista** - Nie zapominaj oznaczać zadań jako ukończone
4. **Duplikaty** - Nie dodawaj tego samego zadania wielokrotnie

## Zadanie praktyczne

**Cel:** Użyj TodoWrite do zarządzania implementacją nowej funkcjonalności

### Zadanie 1: Proste zadanie z TODO

1. Powiedz Claude Code: "Dodaj formularz kontaktowy do aplikacji. Użyj TodoWrite."
2. Obserwuj jak Claude Code tworzy listę zadań
3. Pozwól Claude Code zrealizować 2-3 pierwsze zadania
4. Poproś o dodanie nowego zadania: "Dodaj walidację formularza"

### Zadanie 2: Modyfikacja listy

1. Kontynuuj pracę nad formularzem kontaktowym
2. W połowie pracy powiedz: "Najpierw chcę testy, potem styling"
3. Obserwuj jak Claude Code zmienia kolejność zadań
4. Poproś o usunięcie jednego zadania, jeśli uznasz że niepotrzebne

### Zadanie 3: Śledzenie postępu

1. Podczas realizacji monitoruj pasek postępu
2. Zauważ, jak Claude Code oznacza zadania jako completed
3. Na końcu sprawdź całą listę - wszystko powinno być ✅

**Oczekiwany rezultat:**
- Lista zadań utworzona przez Claude Code
- Zadania realizowane po kolei (jedno in_progress na raz)
- Możliwość modyfikacji listy w trakcie pracy
- Widoczny postęp wykonania

## Jak Claude Code może Ci pomóc?

W kontekście TodoWrite możesz zapytać:
- "Pokaż mi przykład użycia TodoWrite dla projektu full-stack"
- "Jak organizować zadania w TodoWrite dla dużych projektów?"
- "Czy TodoWrite może eksportować listę do pliku?"
- "Jak Claude Code decyduje, co dodać do listy TODO?"

## Dodatkowe materiały

### Oficjalna dokumentacja
- [TodoWrite Tool Reference](https://docs.claude.com/en/docs/claude-code/tools#todowrite)
- [Task Management in Claude Code](https://docs.claude.com/en/docs/claude-code/task-management)
- [Best Practices for Complex Projects](https://docs.claude.com/en/docs/claude-code/best-practices)

### Video tutoriale
- [Managing Tasks with TodoWrite](https://www.youtube.com/results?search_query=claude+code+todo)
- [Project Organization with Claude Code](https://www.youtube.com/results?search_query=claude+code+project+management)

### Artykuły
- [Effective Task Breakdown with AI](https://dev.to/search?q=claude%20code%20tasks)
- [From Chaos to Order: Managing Code with TodoWrite](https://medium.com/search?q=claude%20code)

### Przykłady
- [GitHub - TodoWrite Examples](https://github.com/search?q=claude+code+todo)
- [Real Projects Using TodoWrite](https://www.reddit.com/r/ClaudeAI/search/?q=todowrite)

## Podsumowanie

W tej lekcji nauczyłeś się:
- Czym jest TodoWrite i kiedy go używać
- Jak działa struktura zadań (content, status, activeForm)
- Jak Claude Code automatycznie zarządza listą TODO
- Jak manualnie modyfikować listę zadań
- Najlepsze praktyki organizacji zadań

TodoWrite to potężne narzędzie, które pomaga utrzymać porządek w złożonych projektach. Używaj go zawsze, gdy pracujesz nad czymś, co wymaga wielu kroków - zobaczysz, jak bardzo zwiększa to efektywność i przejrzystość pracy.

W następnej lekcji poznasz narzędzia WebSearch i WebFetch, które pozwalają Claude Code na dostęp do aktualnych informacji z internetu.

---

**Ilustracje:** (do dodania)
- Screenshot listy TODO w trakcie realizacji
- Diagram cyklu życia zadania (pending → in_progress → completed)
- Przykład złożonej listy zadań z pod-zadaniami
