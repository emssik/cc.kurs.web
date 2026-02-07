---
name: tldr
description: Generuje krótkie podsumowanie TLDR (3-4 punkty) z lekcji dla obrazka
---

# Generator TLDR dla lekcji

## Twoje zadanie

Przeczytaj plik lekcji podany jako argument i wygeneruj **3-4 kluczowe punkty** w formacie TLDR do umieszczenia na obrazku graficznym.

## Format wyjścia

Każdy punkt składa się z:
- **Ikona** (emoji) - reprezentuje temat
- **Tytuł** (1-3 słowa) - nazwa konceptu/narzędzia
- **Opis** (krótkie wyjaśnienie) - co to daje, jaki efekt

**Struktura:**
```
[ikona] Tytuł - opis, efekt/korzyść
```

## Wymagania

**DŁUGOŚĆ:**
- Maksymalnie **80-100 znaków** na linię (z ikoną)
- Zwięźle! Musi zmieścić się na obrazku
- 3-4 punkty (nie więcej, nie mniej)

**STYL:**
- Po polsku
- Konkretnie, bez ogólników
- Liczby i metryki jeśli są w lekcji (np. "4x szybciej", "80% mniej")
- Akcent na **praktyczną korzyść** ("co to daje?")

**IKONY (przykłady):**
- 🛡️ - bezpieczeństwo, walidacja, ochrona
- ⚡ - wydajność, szybkość, optymalizacja
- 🔄 - paralelizacja, workflow, procesy
- 📊 - wzorce, struktury, patterns
- 🔧 - narzędzia, konfiguracja
- 🎯 - cel, focus, precyzja
- 🚀 - deployment, automatyzacja
- 💡 - insight, trick, dobra praktyka
- 📝 - dokumentacja, specyfikacja
- 🧩 - integracje, komponenty
- 🔍 - research, analiza, debugging
- ⚙️ - mechanizmy, hooki, automaty

## Przykłady (z obrazka)

```
🛡️ Error handling - Walidacja + helpful messages = 80% mniej błędów użytkowników

⚡ Chunking - Duże pliki po kawałkach = 4x szybciej, 8x mniej tokenów

🔄 Parallel execution - Wiele zadań naraz zamiast po kolei

📊 Production patterns - Logging, idempotency, wzorce z Git/NPM
```

## Proces

1. Przeczytaj lekcję (argument: ścieżka do pliku `.md`)
2. Zidentyfikuj 3-4 **najważniejsze koncepty** (nie wszystko, tylko kluczowe!)
3. Dla każdego punktu:
   - Dobierz trafną ikonę
   - Nazwij krótko (1-3 słowa)
   - Opisz korzyść/efekt (liczby jeśli są)
4. Zwróć **tylko listę punktów**, bez nagłówków

## Format odpowiedzi (WZÓR)

```
[ikona] Nazwa - co to daje, efekt
[ikona] Nazwa - co to daje, efekt
[ikona] Nazwa - co to daje, efekt
[ikona] Nazwa - co to daje, efekt
```

**WAŻNE:** Zwracaj TYLKO listę punktów (bez sekcji "TLDR:", bez nagłówków, bez komentarzy).

---

**Użycie:** `/tldr ścieżka/do/lekcji.md`
