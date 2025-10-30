---
title: "Glob i Grep - zaawansowane wyszukiwanie w kodzie"
description: "Opanuj narzędzia Glob i Grep do efektywnego wyszukiwania plików i zawartości w całym projekcie"
duration: 25
difficulty: intermediate
tags: [glob, grep, wyszukiwanie, search, find, ripgrep]
---

# Glob i Grep - zaawansowane wyszukiwanie w kodzie

## Wprowadzenie

**Glob** i **Grep** to dwa fundamentalne narzędzia wyszukiwania w Claude Code. Choć brzmią podobnie, służą do zupełnie innych celów:

- **Glob** - wyszukuje **pliki** po nazwie/ścieżce (np. "znajdź wszystkie pliki .tsx")
- **Grep** - wyszukuje **zawartość** wewnątrz plików (np. "znajdź gdzie używany jest `useState`")

Te narzędzia to podstawa pracy z dużymi projektami. Bez nich Claude Code byłby ślepy - nie wiedziałby gdzie szukać informacji w Twoim projekcie. Opanowanie Glob i Grep to klucz do efektywnej pracy z Claude Code.

## Dlaczego to ważne?

**Szybkość:** Znajdź to, czego szukasz w sekundach zamiast przeszukiwać ręcznie setki plików.

**Precyzja:** Dokładne pattern'y pozwalają znaleźć tylko to, co naprawdę potrzebujesz.

**Skala:** Przeszukuj tysiące plików jednocześnie - Glob i Grep są zoptymalizowane pod kątem wydajności.

**Podstawa innych narzędzi:** MultiEdit, refaktoring, analiza kodu - wszystko opiera się na Glob i Grep.

## Glob - wyszukiwanie plików

### Czym jest Glob?

Glob to narzędzie do wyszukiwania plików po ich nazwie i ścieżce przy użyciu wzorców (glob patterns).

### Podstawowe wzorce Glob

```bash
*                # dowolny ciąg znaków (w obrębie jednego poziomu)
**               # dowolny ciąg znaków (rekursywnie, wszystkie poziomy)
?                # pojedynczy znak
[abc]            # jeden z podanych znaków
{js,ts}          # jedna z podanych opcji
```

### Przykłady Glob

**1. Wszystkie pliki TypeScript:**
```
Ty: Znajdź wszystkie pliki .ts w projekcie

Claude Code: [Glob: **/*.ts]

Znalazłem 47 plików:
- src/index.ts
- src/utils/helper.ts
- src/types/user.ts
...
```

**2. Komponenty React w konkretnym folderze:**
```
Ty: Pokaż mi wszystkie komponenty w src/components

Claude Code: [Glob: src/components/**/*.tsx]

Znalazłem 23 komponenty:
- src/components/Button.tsx
- src/components/Input.tsx
- src/components/forms/LoginForm.tsx
...
```

**3. Pliki konfiguracyjne:**
```
Ty: Znajdź wszystkie pliki config w głównym katalogu

Claude Code: [Glob: *config.{js,ts,json}]

Znalazłem 4 pliki:
- babel.config.js
- jest.config.ts
- tsconfig.json
- webpack.config.js
```

**4. Testy dla konkretnego modułu:**
```
Ty: Znajdź wszystkie testy dla modułu auth

Claude Code: [Glob: **/*auth*.test.{ts,tsx}]

Znalazłem 6 plików testowych:
- src/auth/auth.test.ts
- src/auth/login.test.ts
- src/middleware/auth.test.ts
...
```

### Zaawansowane Glob patterns

```bash
# Wszystkie pliki POZA folderem node_modules
**/*.js !node_modules/**

# Pliki zaczynające się na "use" (React hooks)
**/use*.ts

# Pliki w folderach components lub pages
**/{components,pages}/**/*.tsx

# Pliki kończące się na Service lub Repository
**/*{Service,Repository}.ts
```

## Grep - wyszukiwanie w zawartości

### Czym jest Grep?

Grep (w Claude Code używane jest ripgrep - zoptymalizowana wersja) to narzędzie do wyszukiwania tekstu wewnątrz plików przy użyciu regex patterns.

### Podstawowe wzorce Grep

```regex
text              # dokładne dopasowanie
user|admin        # user LUB admin
^function         # na początku linii
console\.log$     # na końcu linii
\b\w+\b           # całe słowa
[A-Z][a-z]+       # Kapitalizowane słowa
```

### Tryby wyjścia Grep

Claude Code oferuje 3 tryby wyjścia:

1. **files_with_matches** (domyślny) - tylko nazwy plików
2. **content** - pokazuje linie z dopasowaniami
3. **count** - liczba dopasowań w każdym pliku

### Przykłady Grep

**1. Znajdź gdzie używany jest hook:**
```
Ty: Znajdź gdzie używamy useState

Claude Code: [Grep: "useState" output_mode: files_with_matches]

Znalazłem useState w 15 plikach:
- src/components/Counter.tsx
- src/components/Form.tsx
- src/pages/Dashboard.tsx
...
```

**2. Znajdź definicję funkcji:**
```
Ty: Gdzie zdefiniowana jest funkcja calculatePrice?

Claude Code: [Grep: "function calculatePrice|const calculatePrice"
             output_mode: content]

src/utils/pricing.ts:45
export function calculatePrice(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

**3. Znajdź console.log (do usunięcia przed produkcją):**
```
Ty: Znajdź wszystkie console.log w src/

Claude Code: [Grep: "console\.log" path: src/ output_mode: content]

Znalazłem 8 wystąpień:

src/components/Debug.tsx:12
  console.log('Rendering Debug component');

src/utils/api.ts:34
  console.log('API response:', response);
...
```

**4. Znajdź TODO komentarze:**
```
Ty: Pokaż wszystkie TODO w projekcie

Claude Code: [Grep: "// TODO|/\\* TODO" output_mode: content]

Znalazłem 12 TODO:

src/api/users.ts:23
  // TODO: Add error handling

src/components/List.tsx:56
  /* TODO: Implement pagination */
...
```

### Zaawansowane Grep features

**1. Case-insensitive search:**
```
Claude Code: [Grep: "error" -i: true]
# Znajdzie: error, Error, ERROR, eRRoR
```

**2. Context (linie przed/po):**
```
Claude Code: [Grep: "throw new Error" output_mode: content -B: 2 -A: 2]

src/utils/validation.ts
23:   if (!email.includes('@')) {
24:     // Invalid email format
25:     throw new Error('Invalid email');  ← dopasowanie
26:     return false;
27:   }
```

**3. Filtrowanie po typie pliku:**
```
Claude Code: [Grep: "interface User" type: "ts"]
# Szuka tylko w plikach TypeScript
```

**4. Multiline search:**
```
Claude Code: [Grep: "function.*\\{[\\s\\S]*?return" multiline: true]
# Znajdzie całe funkcje z ich ciałem
```

## Łączenie Glob i Grep

Prawdziwa moc pojawia się gdy łączysz oba narzędzia:

### Przykład 1: Znajdź w konkretnych plikach

```
Ty: W plikach komponentów React znajdź gdzie używamy useEffect bez dependency array

Claude Code:
1. [Glob: src/components/**/*.tsx]
   Znalazłem 23 komponenty

2. [Grep: "useEffect\\([^)]*\\)" path: src/components/ output_mode: content]
   Analizuję useEffect...

3. Filtrowanie wyników bez []...

Znalazłem 3 problematyczne useEffect:

src/components/DataFetcher.tsx:34
  useEffect(() => {
    fetchData();
  }); // ⚠️ Brak dependency array!
```

### Przykład 2: Analiza zależności

```
Ty: Pokaż mi wszystkie pliki które importują axios

Claude Code:
1. [Grep: "import.*axios" output_mode: files_with_matches]
   Znalazłem 12 plików importujących axios

2. [Glob na te pliki + analiza]

Struktura zależności:
- src/api/*.ts (7 plików) ✅ OK - warstwa API
- src/components/*.tsx (5 plików) ⚠️ Komponenty nie powinny importować axios bezpośrednio!

Sugestia: Przenieś wywołania axios do warstwy API
```

### Przykład 3: Refaktoring preview

```
Ty: Przed zmianą nazwy funkcji getUserData pokaż mi gdzie jest używana

Claude Code:
1. [Grep: "getUserData" output_mode: count]

Użycia getUserData:
- src/api/users.ts: 1 (definicja)
- src/components/UserProfile.tsx: 3
- src/components/UserList.tsx: 2
- src/pages/Dashboard.tsx: 1
Total: 7 wystąpień w 4 plikach

2. [Grep: "getUserData" output_mode: content]

Pokazuje wszystkie 7 miejsc...

Czy chcesz aby zmienić nazwę we wszystkich tych miejscach?
```

## Najlepsze praktyki

### ✅ Dobre praktyki Glob

1. **Bądź konkretny:**
   - ✅ `src/components/**/*.tsx`
   - ❌ `**/*` (za szerokie)

2. **Używaj rozszerzeń:**
   - ✅ `**/*.{ts,tsx}` (tylko TS pliki)
   - ❌ `**/*` (wszystkie pliki, w tym node_modules)

3. **Wykluczaj niepotrzebne:**
   - ✅ `src/**/*.ts` (tylko src)
   - ❌ `**/*.ts` (włącznie z node_modules, dist, etc.)

### ✅ Dobre praktyki Grep

1. **Escape special characters:**
   - ✅ `console\.log` (escape kropki)
   - ❌ `console.log` (. = dowolny znak)

2. **Używaj word boundaries:**
   - ✅ `\buser\b` (tylko słowo "user")
   - ❌ `user` (znajdzie też "username", "userdata")

3. **Wybieraj odpowiedni output_mode:**
   - `files_with_matches` - gdy chcesz tylko listę plików
   - `content` - gdy chcesz zobaczyć kontekst
   - `count` - gdy chcesz statystyki

4. **Używaj filtrów:**
   - `-i: true` dla case-insensitive
   - `type: "ts"` dla konkretnego typu
   - `-A/-B/-C` dla kontekstu

## Typowe zadania

### 1. Znajdź wszystkie komponenty używające props bez typu

```
Claude Code:
[Grep: "function.*\\(props\\)" type: "tsx" output_mode: content]
# Znajdzie: function MyComponent(props) { ...
# Nie znajdzie: function MyComponent(props: Props) { ...
```

### 2. Znajdź puste pliki testowe

```
Claude Code:
1. [Glob: **/*.test.ts]
2. [Read każdego pliku]
3. Sprawdza czy zawiera "it(" lub "test("

Puste pliki testowe:
- src/utils/helpers.test.ts (brak testów!)
```

### 3. Znajdź deprecated API

```
Claude Code:
[Grep: "oldApiMethod|deprecatedFunction" output_mode: content]

Znalazłem użycie deprecated API:
- src/legacy/oldCode.ts:45
  Sugestia: Użyj newApiMethod() zamiast oldApiMethod()
```

## Zadanie praktyczne

**Cel:** Opanuj Glob i Grep przez praktyczne ćwiczenia

### Zadanie 1: Glob - znajdowanie plików

1. **Znajdź wszystkie komponenty React:**
   ```
   Ty: Znajdź wszystkie pliki .tsx w projekcie
   ```

2. **Znajdź pliki testowe dla konkretnego modułu:**
   ```
   Ty: Znajdź wszystkie testy w folderze src/auth/
   ```

3. **Znajdź pliki konfiguracyjne:**
   ```
   Ty: Znajdź wszystkie pliki kończące się na config.js lub config.ts
   ```

### Zadanie 2: Grep - znajdowanie w zawartości

1. **Znajdź użycie konkretnej funkcji:**
   ```
   Ty: Gdzie używana jest funkcja fetchUsers?
   ```

2. **Znajdź wszystkie TODO:**
   ```
   Ty: Pokaż wszystkie TODO komentarze z kontekstem (2 linie przed i po)
   ```

3. **Znajdź console.log:**
   ```
   Ty: Znajdź wszystkie console.log i policz ile ich jest w każdym pliku
   ```

### Zadanie 3: Łączenie Glob + Grep

1. **Analiza importów:**
   ```
   Ty: W plikach .tsx znajdź wszystkie importy z 'react'
   ```

2. **Znajdź pattern w konkretnych plikach:**
   ```
   Ty: W komponentach znajdź wszystkie useState bez initial value
   ```

**Oczekiwany rezultat:**
- Umiejętność precyzyjnego wyszukiwania plików (Glob)
- Umiejętność znajdowania zawartości (Grep)
- Zrozumienie kiedy używać którego narzędzia

## Jak Claude Code może Ci pomóc?

Możesz zapytać Claude Code:
- "Znajdź wszystkie pliki .tsx w src/components/"
- "Gdzie używana jest funkcja [nazwa]?"
- "Pokaż mi wszystkie console.log w projekcie"
- "Znajdź pliki importujące [biblioteka]"

Claude Code automatycznie użyje odpowiedniego narzędzia (Glob lub Grep).

## Dodatkowe materiały

### Oficjalna dokumentacja
- [Glob Tool Reference](https://docs.claude.com/en/docs/claude-code/tools#glob)
- [Grep Tool Reference](https://docs.claude.com/en/docs/claude-code/tools#grep)
- [Search Patterns Guide](https://docs.claude.com/en/docs/claude-code/search-patterns)

### Ripgrep (używany przez Grep)
- [Ripgrep GitHub](https://github.com/BurntSushi/ripgrep)
- [Ripgrep User Guide](https://github.com/BurntSushi/ripgrep/blob/master/GUIDE.md)
- [Regex Tutorial](https://regex101.com/)

### Video tutoriale
- [Search Like a Pro with Claude Code](https://www.youtube.com/results?search_query=claude+code+search)
- [Glob and Grep Masterclass](https://www.youtube.com/results?search_query=ripgrep+tutorial)

### Artykuły
- [Effective Code Search Strategies](https://dev.to/search?q=code%20search)
- [Regex for Developers](https://www.regular-expressions.info/)

## Podsumowanie

W tej lekcji nauczyłeś się:
- Różnicy między Glob (pliki) a Grep (zawartość)
- Jak tworzyć efektywne wzorce wyszukiwania
- Kiedy używać różnych trybów output w Grep
- Jak łączyć Glob i Grep dla zaawansowanych analiz
- Najlepszych praktyk wyszukiwania w dużych projektach

Glob i Grep to fundamenty pracy z Claude Code. Im lepiej je opanujesz, tym efektywniej będziesz pracować. Te narzędzia są podstawą dla MultiEdit, refaktoringu i analizy kodu.

W następnej lekcji przejdziemy do Modułu 2 i poznamy Slash Commands - jak tworzyć własne komendy w Claude Code!

---

**Ilustracje:** (do dodania)
- Diagram: Glob (pliki) vs Grep (zawartość)
- Screenshot wyników Glob z listą plików
- Screenshot wyników Grep z kontekstem (-B/-A)
- Cheat sheet: Najczęściej używane wzorce
