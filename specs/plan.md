# Plan realizacji platformy edukacyjnej Claude Code

## Przegląd projektu

Interaktywna platforma webowa do nauki Claude Code z systemem ścieżek edukacyjnych dostosowanych do poziomu użytkownika.

## Stack technologiczny

- **Frontend**: Vanilla JavaScript + HTML5
- **Stylowanie**: SCSS (z kompilatorem)
- **Treść**: JSON dla struktury + Markdown dla treści lekcji
- **Storage**: localStorage dla postępu użytkownika
- **Język**: Polski

## Architektura aplikacji

### Struktura folderów

```
cc.kurs.web/
├── src/
│   ├── js/
│   │   ├── app.js              # główna logika aplikacji
│   │   ├── router.js           # prosty routing SPA (hash-based)
│   │   ├── storage.js          # localStorage API
│   │   ├── quiz.js             # logika testów i walidacja
│   │   ├── lessons.js          # rendering lekcji
│   │   └── utils.js            # funkcje pomocnicze
│   ├── styles/
│   │   ├── main.scss           # główny plik stylów
│   │   ├── _variables.scss     # zmienne (kolory, fonty)
│   │   ├── _base.scss          # reset, typography
│   │   ├── components/
│   │   │   ├── _navbar.scss
│   │   │   ├── _sidebar.scss
│   │   │   ├── _lesson.scss
│   │   │   ├── _quiz.scss
│   │   │   └── _progress.scss
│   │   └── themes/
│   │       └── _default.scss
│   └── assets/
│       ├── images/
│       │   ├── illustrations/  # ilustracje z dokumentacji CC
│       │   └── icons/
│       └── mascot/
│           └── mascot.png      # maskotka kursu
├── content/
│   ├── lessons/
│   │   ├── beginner/           # 15-20 lekcji w formacie MD
│   │   │   ├── 01-instalacja.md
│   │   │   ├── 02-pierwsze-kroki.md
│   │   │   └── ...
│   │   ├── intermediate/       # 15-20 lekcji
│   │   └── advanced/           # 15-20 lekcji
│   └── data/
│       ├── structure.json      # struktura kursu (ścieżki, moduły)
│       ├── initial-test.json   # pytania testu wstępnego
│       └── final-tests.json    # testy końcowe dla każdej ścieżki
├── index.html
├── package.json                # SCSS compilation, dev server
└── README.md
```

### Moduły funkcjonalne

#### 1. Router (router.js)
- Hash-based routing (#/test, #/lesson/beginner/1, #/path/beginner)
- Obsługa nawigacji między widokami
- History API dla przycisków back/forward

#### 2. State Manager (app.js)
- Prosty obiekt globalny do trzymania stanu aplikacji
- Reactywność przez obserwery (publish-subscribe pattern)

#### 3. Storage Manager (storage.js)
- API do zapisu/odczytu localStorage
- Metody: saveProgress, loadProgress, resetProgress
- Walidacja danych

#### 4. Quiz Engine (quiz.js)
- Obsługa testów wielokrotnego wyboru
- Walidacja odpowiedzi
- Obliczanie wyniku (%)
- Przypisywanie ścieżki na podstawie wyniku

#### 5. Lesson Renderer (lessons.js)
- Parser Markdown → HTML (biblioteka: marked.js)
- Syntax highlighting dla code blocks (highlight.js)
- Render struktury lekcji (intro, content, task, resources)

#### 6. Progress Tracker
- Śledzenie ukończonych lekcji
- Obliczanie postępu (%)
- Wizualizacja (progress bar, checkmarki)

## Plan implementacji MVP

### Faza 1: Fundament (Dzień 1-2)

**Zadania:**
1. Setup projektu
   - Inicjalizacja package.json
   - Konfiguracja SCSS compiler (sass, live-server)
   - Git setup (.gitignore)

2. Podstawowa struktura HTML
   - Semantyczny markup (header, nav, main, footer)
   - Container dla dynamicznej zawartości
   - Loading screen

3. Router SPA
   - Hash-based routing
   - Funkcje: navigateTo, handleRoute, getCurrentRoute
   - Event listener dla hashchange

4. Storage API
   - saveProgress(data)
   - loadProgress()
   - resetProgress()
   - getProgress(key)

**Deliverable:** Działająca SPA z podstawową nawigacją i zapisem do localStorage

---

### Faza 2: Test wstępny (Dzień 3)

**Zadania:**
5. Struktura danych testu (initial-test.json)
   - 10-15 pytań wielokrotnego wyboru
   - Pytania oceniające znajomość: podstaw CLI, edycji plików, narzędzi, agents
   - Punktacja: 0-40% → beginner, 41-70% → intermediate, 71-100% → advanced

6. UI testu
   - Widok pytania (tekst, 4 opcje odpowiedzi)
   - Nawigacja: Poprzednie/Następne
   - Przycisk "Zakończ test"
   - Timer (opcjonalnie)

7. Logika oceny
   - Walidacja odpowiedzi
   - Obliczanie wyniku
   - Przypisanie ścieżki

8. Ekran wyników
   - Wyświetlenie wyniku (%)
   - Przypisana ścieżka + opis
   - Przycisk "Rozpocznij naukę"

**Deliverable:** Funkcjonalny test wstępny z przypisaniem ścieżki

---

### Faza 3: System lekcji (Dzień 4-5)

**Zadania:**
9. Parser Markdown
   - Integracja marked.js
   - Konfiguracja highlight.js dla code blocks
   - Sanityzacja HTML

10. Template lekcji
    - Sekcje: tytuł, wprowadzenie, treść główna, zadanie praktyczne, zasoby dodatkowe
    - Metadata w frontmatter (YAML)
    - Ilustracje ze źródłami

11. Nawigacja między lekcjami
    - Poprzednia/Następna lekcja
    - Breadcrumbs (ścieżka → moduł → lekcja)
    - Przycisk "Oznacz jako ukończoną"

12. Funkcjonalność ukończania
    - Przycisk toggle (ukończona/nieukończona)
    - Zapis do localStorage
    - Walidacja (np. nie można oznaczyć jako ukończona bez przejrzenia)

13. Sidebar z listą lekcji
    - Struktura hierarchiczna (moduły → lekcje)
    - Wizualne oznaczenie ukończonych (✓)
    - Progress bar dla całej ścieżki
    - Aktywna lekcja highlighted

**Deliverable:** Pełny system renderowania i nawigacji po lekcjach

---

### Faza 4: Treść kursu (Dzień 6-10)

**Zadania:**
14. Struktura 3 ścieżek w structure.json
    - Definicja paths, modules, lessons
    - Metadane dla każdej ścieżki

15. Podział na moduły
    - 4-5 modułów na ścieżkę
    - Logiczne grupowanie tematyczne

16. **Tworzenie lekcji - Ścieżka "Od zera" (15-20 lekcji)**

    **Moduł 1: Podstawy (4-5 lekcji)**
    - Czym jest Claude Code
    - Instalacja i konfiguracja
    - Pierwszy projekt - "Hello World"
    - Interface CLI - podstawowe komendy
    - System pomocy i dokumentacja

    **Moduł 2: Praca z plikami (3-4 lekcje)**
    - Czytanie i edycja plików
    - Tworzenie nowych plików
    - Nawigacja po projekcie
    - Praca z Git

    **Moduł 3: Narzędzia podstawowe (4-5 lekcji)**
    - Bash i komendy systemowe
    - Grep i wyszukiwanie w kodzie
    - Read i Write tools
    - Multi-edit

    **Moduł 4: Agents i Task (3-4 lekcje)**
    - Czym są agents
    - Kiedy używać Task tool
    - Podstawowe typy agents
    - Praktyczne przykłady

    **Moduł 5: Projekt końcowy (1-2 lekcje)**
    - Budowa prostej aplikacji od A do Z
    - Best practices dla beginners

17. **Tworzenie lekcji - Ścieżka "Średnio zaawansowany" (15-20 lekcji)**

    **Moduł 1: Zaawansowane features (4-5 lekcji)**
    - Plan Mode i strategiczne planowanie
    - TodoWrite i zarządzanie zadaniami
    - WebSearch i WebFetch
    - Praca z wieloma plikami jednocześnie

    **Moduł 2: Customizacja (3-4 lekcje)**
    - Slash commands - tworzenie własnych
    - Konfiguracja settings
    - Hooks i automatyzacja
    - Skills

    **Moduł 3: Agents w praktyce (4-5 lekcji)**
    - Specjalizowani agents (test-first-developer, debugger, etc.)
    - Łączenie agents w workflow
    - Tworzenie własnych agents
    - Troubleshooting

    **Moduł 4: Dobre praktyki (3-4 lekcje)**
    - Efektywna komunikacja z AI
    - Prompt engineering dla Claude Code
    - Debugowanie i rozwiązywanie problemów
    - Optymalizacja workflow

18. **Tworzenie lekcji - Ścieżka "Zaawansowany" (15-20 lekcji)**

    **Moduł 1: MCP Servers (4-5 lekcji)**
    - Czym są MCP servers
    - Instalacja i konfiguracja
    - Najpopularniejsze serwery
    - Tworzenie własnych MCP servers

    **Moduł 2: Integracje (4-5 lekcji)**
    - GitHub integration (PR, issues)
    - CI/CD workflows
    - Docker i kontenery
    - Databases i ORM

    **Moduł 3: Zaawansowane projekty (4-5 lekcji)**
    - Architektura wielowarstwowych aplikacji
    - TDD z Claude Code
    - Refactoring legacy code
    - Performance optimization

    **Moduł 4: Production (2-3 lekcje)**
    - Deployment strategies
    - Monitoring i logging
    - Security best practices
    - Scaling Claude Code w teamie

19. **Dla każdej lekcji:**
    - Wprowadzenie (czym jest, dlaczego ważne)
    - Kiedy stosować / kiedy nie stosować
    - Praktyczny przykład krok po kroku
    - Zadanie praktyczne (min. 1)
    - Wskazówka: "Jak Claude Code może pomóc" (WebSearch + własna dokumentacja)
    - Linki do dodatkowych materiałów:
      - Oficjalna dokumentacja Anthropic
      - Filmy YouTube (tutorials, demos)
      - Wpisy na blogach
      - Dyskusje GitHub/Discord

20. Ilustracje
    - Wyszukanie ilustracji w dokumentacji CC
    - Download i optymalizacja obrazów
    - Dodanie atrybutów źródła na końcu każdej lekcji
    - Alt text dla accessibility

**Deliverable:** 45-60 kompletnych lekcji z zadaniami i zasobami

---

### Faza 5: Testy końcowe (Dzień 11)

**Zadania:**
21. JSON z testami (final-tests.json)
    - Po 15-20 pytań dla każdej ścieżki
    - Pytania pokrywające kluczowe koncepty z lekcji
    - Różne poziomy trudności

22. Logika walidacji
    - Obliczanie wyniku (%)
    - Próg zaliczenia: 85%
    - Blokada przejścia do następnej ścieżki bez zaliczenia

23. Ekran błędnych odpowiedzi
    - Lista pytań z błędnymi odpowiedziami
    - Prawidłowe odpowiedzi + wyjaśnienia
    - Link do powiązanych lekcji

24. Ponowne podejście
    - Przycisk "Spróbuj ponownie"
    - Reset testu
    - Historia podejść (ile razy podchodziło)

**Deliverable:** Funkcjonalne testy końcowe z walidacją

---

### Faza 6: UI/UX (Dzień 12-13)

**Zadania:**
25. Design System
    - Paleta kolorów (główny, akcent, tło, tekst)
    - Typografia (fonty, rozmiary, line-height)
    - Spacing system (4px grid)
    - Border radius, shadows

26. Responsywność
    - Mobile-first approach
    - Breakpoints: mobile (<768px), tablet (768-1024px), desktop (>1024px)
    - Hamburger menu dla mobile
    - Touch-friendly buttons

27. Animacje i transitions
    - Page transitions (fade in/out)
    - Hover effects
    - Progress animations
    - Micro-interactions (checkmarks, buttons)
    - Lekkie i zabawne (bounce, scale)

28. Loading states i error handling
    - Skeleton screens podczas ładowania
    - Error messages (user-friendly)
    - Empty states (brak ukończonych lekcji)
    - 404 page

29. Maskotka kursu
    - Generacja w Midjourney (prompt poniżej)
    - Integracja w header/footer
    - Animowana maskotka (CSS animations)
    - Różne wersje maskotki (success, error, thinking)

**Deliverable:** Elegancki, responsywny i zabawny interfejs

---

### Faza 7: Polish i testy (Dzień 14-15)

**Zadania:**
30. Cross-browser testing
    - Chrome, Firefox, Safari, Edge
    - Fallbacks dla starszych przeglądarek

31. Optymalizacja performance
    - Minifikacja CSS/JS
    - Lazy loading obrazów
    - Code splitting (opcjonalnie)
    - Caching strategies

32. Accessibility
    - ARIA labels
    - Keyboard navigation (Tab, Enter, Esc)
    - Focus management
    - Screen reader testing
    - Contrast ratio (WCAG AA)

33. SEO basics
    - Meta tags (title, description)
    - Open Graph tags
    - Sitemap (opcjonalnie)
    - robots.txt

34. Dokumentacja
    - README.md (setup, development, deployment)
    - Instrukcja dla użytkowników
    - Komentarze w kodzie

**Deliverable:** Dopracowana, zoptymalizowana aplikacja gotowa do wdrożenia

---

## Struktura danych

### structure.json

```json
{
  "paths": {
    "beginner": {
      "id": "beginner",
      "name": "Od zera",
      "description": "Dla osób, które dopiero zaczynają przygodę z Claude Code",
      "color": "#4CAF50",
      "modules": [
        {
          "id": "module-1",
          "name": "Podstawy",
          "description": "Wprowadzenie do Claude Code",
          "lessons": [
            {
              "id": "lesson-1",
              "title": "Czym jest Claude Code",
              "file": "beginner/01-czym-jest-claude-code.md",
              "duration": "10 min"
            },
            {
              "id": "lesson-2",
              "title": "Instalacja i konfiguracja",
              "file": "beginner/02-instalacja.md",
              "duration": "15 min"
            }
          ]
        }
      ],
      "finalTest": "beginner-final"
    },
    "intermediate": {
      "id": "intermediate",
      "name": "Średnio zaawansowany",
      "description": "Dla osób znających podstawy, które chcą pogłębić wiedzę",
      "color": "#FF9800",
      "modules": [...]
    },
    "advanced": {
      "id": "advanced",
      "name": "Zaawansowany",
      "description": "Dla ekspertów szukających mastery",
      "color": "#F44336",
      "modules": [...]
    }
  }
}
```

### initial-test.json

```json
{
  "questions": [
    {
      "id": "q1",
      "question": "Czy kiedykolwiek używałeś/aś Claude Code?",
      "options": [
        {"id": "a", "text": "Nie, pierwszy raz o tym słyszę", "points": 0},
        {"id": "b", "text": "Słyszałem/am, ale nie używałem/am", "points": 10},
        {"id": "c", "text": "Używałem/am kilka razy", "points": 50},
        {"id": "d", "text": "Używam regularnie", "points": 100}
      ]
    },
    {
      "id": "q2",
      "question": "Jak dobrze znasz terminal/wiersz poleceń?",
      "options": [
        {"id": "a", "text": "W ogóle nie znam", "points": 0},
        {"id": "b", "text": "Znam podstawowe komendy (cd, ls)", "points": 30},
        {"id": "c", "text": "Swobodnie poruszam się po systemie", "points": 70},
        {"id": "d", "text": "Używam zaawansowanych narzędzi (grep, sed, awk)", "points": 100}
      ]
    }
    // ... więcej pytań
  ],
  "thresholds": {
    "beginner": {"min": 0, "max": 40},
    "intermediate": {"min": 41, "max": 70},
    "advanced": {"min": 71, "max": 100}
  }
}
```

### localStorage schema

```json
{
  "version": "1.0",
  "currentPath": "beginner",
  "completedLessons": ["lesson-1", "lesson-2", "lesson-3"],
  "initialTestScore": 45,
  "initialTestCompleted": true,
  "finalTestAttempts": {
    "beginner": [
      {"date": "2025-10-28", "score": 75},
      {"date": "2025-10-30", "score": 88}
    ]
  },
  "lastVisited": "lesson-4",
  "preferences": {
    "theme": "light",
    "fontSize": "medium"
  }
}
```

### Frontmatter w plikach .md (przykład)

```markdown
---
title: "Czym jest Claude Code"
description: "Wprowadzenie do narzędzia Claude Code od Anthropic"
duration: 10
difficulty: beginner
tags: [wprowadzenie, podstawy, CLI]
---

# Czym jest Claude Code

## Wprowadzenie

Claude Code to interaktywne narzędzie CLI stworzone przez Anthropic...

## Dlaczego to ważne?

...

## Kiedy używać Claude Code?

✅ Gdy chcesz...
❌ Nie używaj, gdy...

## Przykład praktyczny

...

## Zadanie praktyczne

1. Zainstaluj Claude Code
2. Uruchom pierwszą sesję
3. Wykonaj proste zadanie...

### Jak Claude Code może Ci pomóc?

Claude Code ma dostęp do własnej dokumentacji przez WebSearch. Możesz zapytać:
- "Jak zainstalować Claude Code?"
- "Jakie są podstawowe komendy?"

## Dodatkowe materiały

- [Oficjalna dokumentacja](https://docs.claude.com/claude-code)
- [Video tutorial na YouTube](...)
- [Blog post: Getting started with Claude Code](...)

---

**Ilustracje:**
- screenshot-interface.png (źródło: docs.claude.com)
```

## Prompt Midjourney dla maskotki

```
A friendly and playful robot mascot character for a coding education platform,
cute anthropomorphic AI assistant with Claude's color palette (orange/coral and
cream tones), holding a laptop or displaying code symbols, modern flat illustration
style, clean vector art, approachable and encouraging expression, tech-savvy but
not intimidating, suitable for educational content, white background, character
design, mascot logo, slight smile, helpful pose --style raw --v 6
```

Warianty:
- Dla success: `... celebrating with raised arms, happy expression ...`
- Dla error: `... confused expression, question mark above head ...`
- Dla thinking: `... hand on chin, thoughtful expression ...`

## Kluczowe funkcjonalności MVP - Checklist

### Funkcjonalności podstawowe
- [ ] Test wstępny z 10-15 pytaniami
- [ ] Automatyczne przypisanie ścieżki (beginner/intermediate/advanced)
- [ ] 3 ścieżki edukacyjne po 15-20 lekcji każda
- [ ] Łącznie 45-60 lekcji

### Struktura lekcji
- [ ] Wprowadzenie (czym jest, dlaczego ważne)
- [ ] Kiedy stosować / kiedy nie stosować
- [ ] Wyjaśnienie koncepcji
- [ ] Min. 1 zadanie praktyczne na lekcję
- [ ] Wskazówka o samodzielnej pomocy Claude Code (WebSearch)
- [ ] Min. 3 linki do dodatkowych materiałów (docs, YT, blogi)

### System postępu
- [ ] Oznaczanie lekcji jako ukończonej
- [ ] Zapis postępu w localStorage
- [ ] Progress bar dla ścieżki
- [ ] Sidebar z listą lekcji i statusem (✓/○)
- [ ] Łatwa nawigacja Poprzednia/Następna

### Testy końcowe
- [ ] Test końcowy dla każdej ścieżki (15-20 pytań)
- [ ] Próg zaliczenia: 85%
- [ ] Blokada bez zaliczenia
- [ ] Możliwość ponownego podejścia
- [ ] Wyświetlenie błędnych odpowiedzi z wyjaśnieniami

### UI/UX
- [ ] Proste i eleganckie UI
- [ ] Responsywność (mobile, tablet, desktop)
- [ ] Lekkie, zabawne animacje
- [ ] Maskotka kursu (generowana w Midjourney)
- [ ] Loading states i error handling

### Treść
- [ ] Ilustracje z dokumentacji CC (ze źródłami na końcu lekcji)
- [ ] Polski język interfejsu i treści
- [ ] Markdown formatting z syntax highlighting
- [ ] Alt text dla obrazów (accessibility)

### Techniczne
- [ ] Hash-based routing (SPA)
- [ ] Parsowanie Markdown → HTML
- [ ] SCSS compilation
- [ ] Cross-browser compatibility
- [ ] Performance optimization (minifikacja)
- [ ] Accessibility (ARIA, keyboard nav)

## Harmonogram i szacowany czas

| Faza | Czas | Opis |
|------|------|------|
| Faza 1: Fundament | 2 dni | Setup, HTML, router, storage |
| Faza 2: Test wstępny | 1 dzień | Quiz engine + UI |
| Faza 3: System lekcji | 2 dni | Parser MD, nawigacja, sidebar |
| **Faza 4: Treść kursu** | **5 dni** | **45-60 lekcji** (największy nakład!) |
| Faza 5: Testy końcowe | 1 dzień | Final tests z walidacją |
| Faza 6: UI/UX | 2 dni | Design, responsywność, maskotka |
| Faza 7: Polish | 2 dni | Testy, optymalizacja, docs |
| **RAZEM** | **15 dni** | **~2-3 tygodnie** |

**Uwaga:** Faza 4 (treść) to 50-60% całego projektu. Tworzenie merytorycznych, wartościowych lekcji z zadaniami i zasobami jest najbardziej czasochłonne.

## Następne kroki po MVP

Funkcjonalności do rozważenia w przyszłości (post-MVP):
- Backend z CMS do łatwej edycji lekcji
- System kont użytkowników (zamiast localStorage)
- Certyfikaty po ukończeniu ścieżki
- Forum/społeczność dla uczniów
- Wersja angielska (i18n)
- Gamifikacja (punkty, badges, leaderboard)
- Code playground zintegrowany z lekcjami
- Video tutorials wbudowane w lekcje
- AI chat assistant (Claude) dla pomocy 24/7
- Mobile app (PWA lub native)

---

**Koniec planu realizacji MVP**
