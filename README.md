# Claude Code - Kurs Interaktywny

Interaktywna platforma webowa do nauki Claude Code z systemem ścieżek edukacyjnych dostosowanych do poziomu użytkownika.

## Stack technologiczny

- **Frontend**: Vanilla JavaScript + HTML5
- **Stylowanie**: SCSS (z kompilatorem)
- **Treść**: JSON dla struktury + Markdown dla treści lekcji
- **Storage**: localStorage dla postępu użytkownika
- **Język**: Polski

## Struktura projektu

```
cc.kurs.web/
├── src/
│   ├── js/                # Moduły JavaScript
│   │   ├── app.js         # Główna logika aplikacji
│   │   ├── router.js      # Hash-based routing
│   │   ├── storage.js     # localStorage API
│   │   ├── quiz.js        # Logika testów
│   │   ├── lessons.js     # Rendering lekcji
│   │   └── utils.js       # Funkcje pomocnicze
│   ├── styles/            # Style SCSS
│   └── assets/            # Obrazy, ikony, maskotka
├── content/
│   ├── lessons/           # Lekcje w formacie Markdown
│   └── data/              # JSON z strukturą i testami
├── dist/
│   └── css/               # Skompilowane pliki CSS
├── index.html
└── package.json
```

## Instalacja i uruchomienie

### Wymagania

- Node.js (wersja 14 lub nowsza)
- npm

### Kroki instalacji

1. Sklonuj repozytorium:
```bash
git clone <repository-url>
cd cc.kurs.web
```

2. Zainstaluj zależności:
```bash
npm install
```

3. Skompiluj style SCSS:
```bash
npm run sass:build
```

4. Uruchom serwer deweloperski:
```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem: http://localhost:8080

### Dostępne skrypty

- `npm run dev` - Uruchamia serwer deweloperski z automatyczną kompilacją SCSS
- `npm run serve` - Uruchamia tylko serwer (bez kompilacji)
- `npm run sass:watch` - Automatyczna kompilacja SCSS przy zmianach
- `npm run sass:build` - Jednorazowa kompilacja SCSS (wersja produkcyjna)

## Status implementacji

### ✅ Faza 1: Fundament (UKOŃCZONE)

- [x] Setup projektu (package.json, SCSS, Git)
- [x] Podstawowa struktura HTML
- [x] Router SPA (hash-based routing)
- [x] Storage API (localStorage)
- [x] Główna logika aplikacji
- [x] Podstawowe style SCSS
- [x] System komponentów (navbar, sidebar, lesson, quiz, progress)

### 🔄 Kolejne fazy

- [ ] Faza 2: Test wstępny
- [ ] Faza 3: System lekcji
- [ ] Faza 4: Treść kursu (45-60 lekcji)
- [ ] Faza 5: Testy końcowe
- [ ] Faza 6: UI/UX (design, responsywność, maskotka)
- [ ] Faza 7: Polish i testy (optymalizacja, accessibility)

## Funkcjonalności MVP

- Test wstępny z automatycznym przypisaniem ścieżki
- 3 ścieżki edukacyjne (beginner, intermediate, advanced)
- 45-60 interaktywnych lekcji
- System postępu z zapisem w localStorage
- Testy końcowe dla każdej ścieżki
- Responsywny interfejs
- Markdown rendering z syntax highlighting

## Rozwój

Aby dodać nowe style:
1. Edytuj pliki SCSS w `src/styles/`
2. Style automatycznie się zkompilują (jeśli `npm run dev` jest uruchomione)

Aby dodać nowe lekcje:
1. Utwórz plik `.md` w odpowiednim folderze (`content/lessons/beginner|intermediate|advanced/`)
2. Dodaj metadane lekcji do `content/data/structure.json`

## Licencja

MIT

## Autor

Kurs interaktywny Claude Code - 2025
