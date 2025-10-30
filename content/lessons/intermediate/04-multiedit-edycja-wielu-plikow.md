---
title: "MultiEdit - edycja wielu plików jednocześnie"
description: "Jak używać narzędzia MultiEdit do jednoczesnej edycji wielu plików - idealne do refaktoringu i zmian globalnych"
duration: 20
difficulty: intermediate
tags: [multiedit, refaktoring, edycja, mass-edit, bulk-changes]
---

# MultiEdit - edycja wielu plików jednocześnie

## Wprowadzenie

MultiEdit to zaawansowane narzędzie w Claude Code, które pozwala na jednoczesną edycję wielu plików. Zamiast edytować każdy plik osobno, możesz wprowadzić tę samą zmianę (lub podobne zmiany) w dziesiątkach plików za jednym razem. To jest szczególnie przydatne przy refaktoringu, zmianie nazw, aktualizacji importów, czy globalnych zmianach w kodzie.

Wyobraź sobie, że musisz zmienić nazwę funkcji, która jest używana w 30 plikach. Bez MultiEdit zajęłoby to godziny. Z MultiEdit - minuty.

## Dlaczego to ważne?

**Oszczędność czasu:** Zmiany, które zajęłyby godziny, wykonujesz w minuty. Jeden command zamiast dziesiątek pojedynczych edycji.

**Konsystencja:** Wszystkie zmiany są identyczne - nie ma ryzyka, że w jednym pliku zapomnisz o zmianie lub zrobisz ją inaczej.

**Atomowość:** Wszystkie zmiany są wprowadzane razem - albo wszystkie, albo żadna. Brak częściowych aktualizacji.

**Bezpieczeństwo:** Claude Code pokazuje wszystkie zmiany przed ich zastosowaniem, więc możesz je sprawdzić.

## Kiedy używać MultiEdit?

✅ **Używaj MultiEdit, gdy:**
- Zmieniasz nazwę funkcji/klasy używanej w wielu plikach
- Aktualizujesz importy po restrukturyzacji projektu
- Zamieniasz przestarzałe API na nowe w całym projekcie
- Dodajesz ten sam import do wielu plików
- Refaktorujesz wspólny pattern używany w wielu miejscach
- Aktualizujesz konfigurację w podobnych plikach

❌ **Nie używaj MultiEdit, gdy:**
- Zmiany są unikalne dla każdego pliku
- Edytujesz tylko 1-2 pliki (użyj Edit)
- Zmiany wymagają różnej logiki w każdym pliku
- Nie jesteś pewien zakresu zmian (najpierw przeanalizuj)

## Jak działa MultiEdit?

### Proces działania

1. **Identyfikacja plików:** Claude Code znajduje wszystkie pliki wymagające zmiany (Glob/Grep)
2. **Przygotowanie zmian:** Dla każdego pliku przygotowuje konkretną edycję
3. **Prezentacja:** Pokazuje wszystkie zmiany do weryfikacji
4. **Wykonanie:** Po Twojej akceptacji wprowadza zmiany atomowo

### Składnia MultiEdit (wewnętrzna)

Claude Code używa MultiEdit automatycznie, gdy wykryje potrzebę masowej edycji:

```
Claude Code: Znalazłem 23 pliki używające starej funkcji `getData()`.
             Zamienię wszystkie na nową `fetchData()`.

             [Używa MultiEdit dla 23 plików]

             Zmiany wprowadzone w:
             ✓ src/components/UserList.tsx
             ✓ src/components/PostList.tsx
             ...
             ✓ src/pages/Dashboard.tsx
             (23 pliki zaktualizowane)
```

## Przykłady praktyczne

### Przykład 1: Zmiana nazwy funkcji

**Scenariusz:** Zmieniasz nazwę funkcji `calculatePrice()` na `computeTotal()` w całym projekcie.

```
Ty: Zmień nazwę funkcji calculatePrice na computeTotal w całym projekcie

Claude Code: Przeszukuję projekt...
             [Grep: "calculatePrice"]

             Znalazłem 18 plików używających calculatePrice():
             - src/utils/pricing.ts (definicja)
             - src/components/Cart.tsx (3 użycia)
             - src/components/Checkout.tsx (2 użycia)
             ...

             Aktualizuję wszystkie pliki...
             [MultiEdit dla 18 plików]

             ✅ Zaktualizowano:
             - Definicja funkcji: 1 plik
             - Importy: 17 plików
             - Wywołania: 28 wystąpień w 17 plikach

             Wszystkie zmiany wprowadzone pomyślnie!
```

### Przykład 2: Aktualizacja importów

**Scenariusz:** Przeniosłeś plik `utils.ts` z `src/` do `src/lib/` i musisz zaktualizować wszystkie importy.

```
Ty: Zaktualizuj wszystkie importy z './utils' na './lib/utils'

Claude Code: Szukam plików importujących utils...
             [Grep: "from ['\"].*utils['\"]"]

             Znalezionych importów: 34 w 25 plikach

             Aktualizuję ścieżki importu...
             [MultiEdit dla 25 plików]

             Przykładowe zmiany:
             ❌ import { helper } from '../utils';
             ✅ import { helper } from '../lib/utils';

             ❌ import * as utils from './utils';
             ✅ import * as utils from './lib/utils';

             ✅ Wszystkie importy zaktualizowane!
```

### Przykład 3: Dodawanie brakującego importu

**Scenariusz:** Dodajesz nowy typ `User` i musisz go zaimportować we wszystkich plikach, które go używają.

```
Ty: Dodaj import { User } from './types' do wszystkich plików używających typu User

Claude Code: Znajduję pliki używające typu User bez importu...
             [Grep: "User" + analiza importów]

             Pliki wymagające dodania importu: 12

             Dodaję import...
             [MultiEdit dla 12 plików]

             Przykład (UserService.ts):
             ❌ // brak importu
                export class UserService {
                  getUser(): User { ... }

             ✅ import { User } from './types';
                export class UserService {
                  getUser(): User { ... }

             ✅ Import dodany do 12 plików!
```

### Przykład 4: Refaktoring API

**Scenariusz:** Stare API używało `.then()`, nowe używa `async/await`.

```
Ty: Zamień wszystkie fetch().then() na async/await w folderze src/api/

Claude Code: Analizuję pliki API...
             [Glob: src/api/*.ts]
             [Grep: "fetch.*then"]

             Znalazłem 8 plików z .then() pattern

             Refaktoruję na async/await...
             [MultiEdit dla 8 plików]

             Przykład (users.ts):
             ❌ export function getUsers() {
                  return fetch('/api/users')
                    .then(res => res.json())
                    .then(data => data.users);
                }

             ✅ export async function getUsers() {
                  const res = await fetch('/api/users');
                  const data = await res.json();
                  return data.users;
                }

             ✅ Refaktoring zakończony: 8 plików!
```

## Zaawansowane techniki

### 1. MultiEdit z warunkami

```
Ty: W plikach .tsx (nie .ts) zamień wszystkie <div> z className="container"
    na <Container>

Claude Code: [Glob: **/*.tsx]
             [Grep: className="container"]

             Znalazłem 15 plików TSX z tym pattern

             [MultiEdit dla 15 plików]

             Przykład:
             ❌ <div className="container">{children}</div>
             ✅ <Container>{children}</Container>

             Dodatkowo dodaję import Container gdzie brakuje...

             ✅ 15 plików zaktualizowanych + 8 importów dodanych
```

### 2. Selektywny MultiEdit

```
Ty: Pokaż mi wszystkie miejsca gdzie używany jest stary API endpoint,
    ale zaktualizuj tylko te w folderze src/features/

Claude Code: [Grep: "/api/v1/users"]

             Znalazłem 23 użycia:
             - src/features/: 12 plików ✅ (do aktualizacji)
             - src/legacy/: 8 plików ⏸️ (pominięte)
             - tests/: 3 pliki ⏸️ (pominięte)

             Aktualizuję tylko src/features/...
             [MultiEdit dla 12 plików]

             ✅ 12 plików zaktualizowanych
             ℹ️  11 plików pozostawionych bez zmian
```

### 3. MultiEdit z transformacją

```
Ty: We wszystkich plikach komponentów React zamień Props interface
    na type Props

Claude Code: [Glob: src/components/**/*.tsx]
             [Grep: "interface.*Props"]

             Znalazłem 34 komponenty z interface Props

             [MultiEdit dla 34 plików]

             Transformacja:
             ❌ interface ButtonProps {
                  onClick: () => void;
                }

             ✅ type ButtonProps = {
                  onClick: () => void;
                }

             ✅ 34 interface → type konwersji zakończonych
```

## Najlepsze praktyki

### ✅ Dobre praktyki

1. **Zawsze sprawdzaj zakres**
   ```
   Ty: Najpierw pokaż mi gdzie jest używane calculatePrice
   [Sprawdzasz zakres]
   Ty: OK, teraz zmień nazwę na computeTotal
   ```

2. **Używaj precyzyjnych wzorców**
   - ✅ "Zmień fetchUser() ale tylko w src/api/"
   - ❌ "Zmień wszystkie funkcje fetch*"

3. **Testuj po MultiEdit**
   ```
   Ty: Po MultiEdit uruchom testy aby sprawdzić czy nic nie pękło
   ```

4. **Commituj przed i po**
   ```
   Ty: Zrób commit przed MultiEdit, żeby móc łatwo zrobić rollback
   ```

### ❌ Anty-wzorce

1. **Masowe zmiany bez analizy**
   - Nie rób MultiEdit bez sprawdzenia co dokładnie zostanie zmienione

2. **Za szerokie pattern'y**
   - Nie używaj zbyt ogólnych wzorców (np. "zmień wszystkie 'user'")

3. **Brak testów po zmianie**
   - Zawsze uruchom testy po MultiEdit

4. **Brak backupu**
   - Zrób commit lub backup przed dużymi zmianami

## Porównanie: Edit vs MultiEdit

| Aspekt | Edit (pojedyncze) | MultiEdit (masowe) |
|--------|-------------------|-------------------|
| **Liczba plików** | 1 | 2+ (często 10+) |
| **Czas wykonania** | Natychmiastowy | Kilka sekund |
| **Atomowość** | Jedna zmiana | Wszystkie razem |
| **Use case** | Unikalne zmiany | Powtarzalne pattern'y |
| **Ryzyko** | Niskie | Średnie (duży zakres) |
| **Rollback** | Łatwy | Wymaga Git revert |

## Zadanie praktyczne

**Cel:** Użyj MultiEdit do refaktoringu wielu plików jednocześnie

### Zadanie 1: Przygotowanie

1. Stwórz testowy projekt z kilkoma plikami używającymi tej samej funkcji
2. Przykład:
   ```javascript
   // 5 plików zawierających:
   import { oldFunction } from './utils';

   const result = oldFunction(data);
   ```

### Zadanie 2: Zmiana nazwy funkcji

1. Powiedz Claude Code: "Zmień nazwę oldFunction na newFunction we wszystkich plikach"
2. Obserwuj jak Claude Code:
   - Znajduje wszystkie wystąpienia
   - Pokazuje zakres zmian
   - Wprowadza zmiany atomowo

### Zadanie 3: Aktualizacja importów

1. Przenieś plik `utils.ts` do `lib/utils.ts`
2. Powiedz: "Zaktualizuj wszystkie importy z './utils' na './lib/utils'"
3. Sprawdź czy wszystkie importy są poprawne

### Zadanie 4: Weryfikacja

1. Uruchom projekt/testy
2. Sprawdź czy wszystko działa
3. Jeśli są błędy, użyj Git do przeglądu zmian

**Oczekiwany rezultat:**
- Wszystkie pliki zaktualizowane jednocześnie
- Zmiany są konsystentne we wszystkich plikach
- Kod nadal działa poprawnie

## Jak Claude Code może Ci pomóc?

Możesz zapytać Claude Code:
- "Znajdź wszystkie miejsca gdzie używam [funkcja]"
- "Zamień [stary-pattern] na [nowy-pattern] w całym projekcie"
- "Zaktualizuj importy po przeniesieniu pliku"
- "Zrefaktoruj wszystkie komponenty używające [old-API]"

## Dodatkowe materiały

### Oficjalna dokumentacja
- [MultiEdit Tool](https://docs.claude.com/en/docs/claude-code/tools#multiedit)
- [Refactoring with Claude Code](https://docs.claude.com/en/docs/claude-code/refactoring)
- [Mass Edit Best Practices](https://docs.claude.com/en/docs/claude-code/mass-edits)

### Video tutoriale
- [MultiEdit in Action](https://www.youtube.com/results?search_query=claude+code+multiedit)
- [Large-Scale Refactoring](https://www.youtube.com/results?search_query=claude+code+refactoring)

### Artykuły
- [Refactoring at Scale with AI](https://dev.to/search?q=claude%20code%20refactoring)
- [Mass Code Changes Made Easy](https://medium.com/search?q=claude%20code%20multiedit)

### Przykłady
- [GitHub - MultiEdit Examples](https://github.com/search?q=claude+code+multiedit)
- [Real Refactoring Projects](https://www.reddit.com/r/ClaudeAI/search/?q=multiedit)

## Podsumowanie

W tej lekcji nauczyłeś się:
- Czym jest MultiEdit i kiedy go używać
- Jak MultiEdit różni się od pojedynczego Edit
- Jak przeprowadzać masowe refaktoringi bezpiecznie
- Najlepszych praktyk dla mass edits
- Jak weryfikować zmiany po MultiEdit

MultiEdit to jedno z najpotężniejszych narzędzi w Claude Code - pozwala na zmiany, które normalnie zajęłyby godziny, w ciągu minut. Używaj go mądrze, zawsze weryfikuj zakres zmian, i pamiętaj o testach!

W następnej lekcji poznasz narzędzia Glob i Grep - fundamenty wyszukiwania w kodzie, które często pracują razem z MultiEdit.

---

**Ilustracje:** (do dodania)
- Screenshot procesu MultiEdit z listą plików
- Diagram: Grep → Identyfikacja → MultiEdit → Weryfikacja
- Before/After przykład masowego refaktoringu
