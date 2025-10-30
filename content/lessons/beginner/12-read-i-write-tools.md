---
title: "Read i Write Tools"
description: "Szczegółowo poznaj narzędzia Read i Write do pracy z plikami"
duration: 10
difficulty: beginner
tags: [read, write, pliki, tools]
---

# Read i Write Tools

## Wprowadzenie

Read i Write to fundamentalne narzędzia do pracy z plikami. Już je znasz z poprzednich lekcji, ale teraz zagłębimy się w szczegóły i zaawansowane przypadki użycia.

## Read Tool - Szczegóły

### Podstawy

Read służy do **czytania zawartości plików**. Claude Code używa go automatycznie, gdy potrzebuje zobaczyć kod.

### Parametry

```javascript
Read(file_path, offset?, limit?)
```

- **file_path:** Ścieżka do pliku (bezwzględna)
- **offset:** Od której linii zacząć (opcjonalne)
- **limit:** Ile linii przeczytać (opcjonalne)

### Kiedy używa offset i limit?

Dla bardzo dużych plików (>2000 linii):

```
Ty: Przeczytaj linie 100-200 z pliku large-file.js
```

Claude Code użyje:
```javascript
Read("large-file.js", offset: 99, limit: 100)
```

### Format wyniku

Wynik używa formatu `cat -n` (z numerami linii):

```
     1→ function hello() {
     2→   console.log("Hello");
     3→ }
```

**Uwaga:** Numery linii to metadata dla Claude Code - nie są częścią pliku!

### Możliwości

Read może czytać różne typy plików:
- **Kod:** .js, .py, .java, itp.
- **Obrazy:** .png, .jpg (Claude Code ma multimodal vision!)
- **PDF:** .pdf (ekstraktuje tekst i obrazy)
- **Jupyter notebooks:** .ipynb (pokazuje komórki z wynikami)
- **Binarne:** (ale Claude Code ostrzeże, że to binary)

## Write Tool - Szczegóły

### Podstawy

Write służy do:
1. **Tworzenia nowych plików**
2. **Nadpisywania całych plików** (rzadko używane)

### Parametry

```javascript
Write(file_path, content)
```

### Zasady bezpieczeństwa

**WAŻNE:** Claude Code ZAWSZE preferuje Edit nad Write dla istniejących plików!

Jeśli plik istnieje:
1. Claude Code poinformuje
2. Zapyta o potwierdzenie
3. Zasugeruje użycie Edit zamiast tego

### Przykłady użycia

**Tworzenie nowego pliku:**
```
Ty: Stwórz plik config.json z podstawową konfiguracją
```

**Generowanie boilerplate:**
```
Ty: Stwórz README.md z opisem projektu
```

**Pliki konfiguracyjne:**
```
Ty: Dodaj .gitignore dla Node.js
```

## Praktyczne scenariusze

### Scenariusz 1: Analiza dużego pliku

```
Ty: Plik data.json ma 5000 linii. Pokaż mi tylko linie 1000-1100
```

Claude Code użyje Read z offset i limit.

### Scenariusz 2: Czytanie obrazów

```
Ty: Co znajduje się na obrazie diagram.png?
```

Claude Code użyje Read i przeanalizuje obraz wizualnie.

### Scenariusz 3: PDF analysis

```
Ty: Przeczytaj dokument specification.pdf i podsumuj wymagania
```

Claude Code:
1. Read PDF (ekstrakcja tekstu)
2. Analiza treści
3. Podsumowanie

### Scenariusz 4: Generowanie dokumentacji

```
Ty: Wygeneruj API.md dokumentację na podstawie controllers/
```

Claude Code:
1. Read wszystkich kontrolerów
2. Analiza endpointów
3. Write dokumentacji

### Scenariusz 5: Backup przed zmianami

```
Ty: Zanim edytujesz, stwórz backup ważnych plików
```

Claude Code:
1. Read oryginalny plik
2. Write do .backup

## Read vs Edit vs Write

### Kiedy Read?

✅ Gdy chcesz tylko zobaczyć zawartość
✅ Przed edycją (Claude Code robi automatycznie)
✅ Do analizy kodu
✅ Do zrozumienia struktury

### Kiedy Edit?

✅ Modyfikacja istniejących plików (99% przypadków)
✅ Precyzyjne zmiany
✅ Refactoring

### Kiedy Write?

✅ Tworzenie nowych plików
✅ Generowanie całych plików od zera
✅ Pliki konfiguracyjne
❌ NIE do modyfikacji istniejącego kodu!

## Zadanie praktyczne

### Zadanie 1: Czytanie z limitami

```
Ty: Stwórz plik big.js z 100 liniami kodu (funkcje od function1 do function100)
```

Potem:
```
Ty: Pokaż mi tylko linie 40-50 z big.js
```

### Zadanie 2: Analiza różnych typów

Jeśli masz:
```
Ty: Przeczytaj package.json i wylistuj wszystkie dependencies
Ty: Przeczytaj .gitignore i wyjaśnij każdą regułę
```

### Zadanie 3: Multimodal

Jeśli masz obraz:
```
Ty: Przeczytaj screenshot.png i opisz, co widzisz
```

### Zadanie 4: Generate + Read + Verify

```
Ty:
1. Wygeneruj plik users.json z 10 przykładowymi użytkownikami
2. Przeczytaj go
3. Zweryfikuj, czy dane są poprawne
```

## Best Practices

### 1. Zawsze weryfikuj po Write

```
Ty: Stwórz plik X
Ty: Pokaż mi utworzony plik
```

### 2. Używaj offset/limit dla dużych plików

❌ `Przeczytaj cały plik 10000-liniowy`
✅ `Pokaż mi linie 500-600`

### 3. Read przed Edit

Claude Code robi to automatycznie, ale możesz też prosić:
```
Ty: Najpierw pokaż mi plik, potem go edytujemy
```

### 4. Opisowe commit messages po Write

Po utworzeniu plików:
```
Ty: Commitnij nowe pliki konfiguracyjne
```

## Zaawansowane techniki

### 1. Conditional Write

```
Ty: Jeśli config.json nie istnieje, utwórz go z defaultami
```

### 2. Template-based generation

```
Ty: Użyj utils/helpers.js jako template i stwórz utils/validators.js w tym samym stylu
```

### 3. Batch reading

```
Ty: Przeczytaj wszystkie pliki w src/models/ i podsumuj schemat bazy danych
```

### 4. Diff przed nadpisaniem

```
Ty: Pokaż mi różnice między tym, co chcesz napisać a obecną zawartością
```

## Ograniczenia

### Read

- Maksymalnie 2000 linii na raz (użyj offset/limit dla większych)
- Linie dłuższe niż 2000 znaków są obcinane
- Binary files - dostaniesz ostrzeżenie

### Write

- Musi być absolute path
- Dla istniejących plików - Claude Code zapyta o potwierdzenie
- Nie może nadpisać plików w .gitignore (czasem)

## Troubleshooting

### "File not found"

```
Ty: Sprawdź, czy plik istnieje i pokaż mi ścieżkę
```

### "Line too long"

Dla bardzo długich linii:
```
Ty: Plik ma bardzo długie linie. Pokaż mi tylko pierwsze 200 znaków każdej linii
```

### Binary file warning

```
This is a binary file. Are you sure you want to read it?
```

Claude Code ostrzega przed czytaniem plików binarnych.

## Jak Claude Code może Ci pomóc?

```
Jak przeczytać tylko fragment dużego pliku?
Czy mogę czytać obrazy przez Read?
Jaka jest różnica między Read a Grep?
Kiedy używać Write zamiast Edit?
```

## Dodatkowe materiały

### Dokumentacja
- [Read Tool Reference](https://docs.claude.com/en/docs/claude-code/tools/read)
- [Write Tool Reference](https://docs.claude.com/en/docs/claude-code/tools/write)

## Podsumowanie

Nauczyłeś się:
- Zaawansowanego użycia Read (offset, limit, różne typy plików)
- Kiedy używać Write vs Edit
- Jak czytać obrazy i PDF-y
- Best practices dla pracy z plikami
- Troubleshooting typowych problemów

W następnej lekcji poznasz szczegóły narzędzia Glob!

---

**Ilustracje:** (do dodania)
- Diagram: Read vs Edit vs Write decision tree
- Infografika: Read capabilities (typy plików)
