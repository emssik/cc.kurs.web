---
title: "Budowa prostej aplikacji od A do Z"
description: "Praktyczny projekt - stwórz kompletną aplikację Todo używając Claude Code"
duration: 30
difficulty: beginner
tags: [projekt, praktyka, todo-app, fullstack]
---

# Budowa prostej aplikacji od A do Z

## Wprowadzenie

Czas połączyć wszystko, czego się nauczyłeś! W tej lekcji zbudujesz kompletną aplikację Todo od zera do wdrożenia, używając Claude Code i wszystkich poznanych narzędzi i agents.

## Projekt: Todo App

### Co zbudujesz

**Backend API (Node.js + Express):**
- CRUD endpoints dla todo items
- Walidacja danych
- Error handling
- Testy

**Frontend (HTML + Vanilla JS):**
- Lista todos
- Dodawanie/edycja/usuwanie
- Filtrowanie (all/active/completed)
- LocalStorage persistence

### Technologie

- **Backend:** Node.js, Express, JSON file storage
- **Frontend:** HTML5, Vanilla JavaScript, CSS
- **Testing:** Jest
- **Tools:** Claude Code + Agents

## Faza 1: Planowanie (15 min)

### Krok 1: Architektura

```
Ty: Użyj chief-architect do zaprojektowania architektury prostej Todo App

Requirements:
- Backend API (Express)
- Frontend (Vanilla JS)
- JSON file storage (no database for simplicity)
- CRUD operations
- Testable code

Focus:
- Prostota (to projekt dla beginners)
- Best practices
- Testability
```

**Oczekiwany output:**
- Struktura folderów
- API endpoints design
- Data model
- Risk assessment

**Przykładowa architektura:**
```
todo-app/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   └── todos.js
│   │   ├── controllers/
│   │   │   └── todoController.js
│   │   ├── services/
│   │   │   └── todoService.js
│   │   ├── storage/
│   │   │   └── fileStorage.js
│   │   ├── middleware/
│   │   │   └── errorHandler.js
│   │   └── app.js
│   ├── tests/
│   ├── data/
│   │   └── todos.json
│   └── package.json
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── app.js
└── README.md
```

### Krok 2: Plan implementacji

Na podstawie architektury, zaplanuj kolejność:

1. Backend - Data model
2. Backend - Storage layer
3. Backend - Controller logic
4. Backend - Routes
5. Backend - Error handling
6. Backend - Tests
7. Frontend - HTML structure
8. Frontend - JavaScript logic
9. Frontend - Styling
10. Integration
11. Documentation

## Faza 2: Backend (45 min)

### Krok 1: Setup projektu

```
Ty: Zainicjuj projekt Node.js w katalogu backend/

Zainstaluj:
- express
- body-parser
- cors
- dotenv

Dev dependencies:
- jest
- supertest
- nodemon
```

**Rezultat:**
```
backend/
├── package.json
├── .gitignore
└── src/
```

### Krok 2: Data model

```
Ty: Użyj test-first-developer do stworzenia Todo data model w src/models/Todo.js

Todo powinien mieć:
- id (UUID)
- title (string, required)
- completed (boolean, default false)
- createdAt (timestamp)

Dodaj funkcje:
- createTodo(data)
- validateTodo(todo)
```

**Rezultat:**
- src/models/Todo.js
- tests/models/Todo.test.js

### Krok 3: Storage layer

```
Ty: Użyj test-first-developer do implementacji fileStorage.js

Funkcje:
- readTodos() - czyta z data/todos.json
- writeTodos(todos) - zapisuje do pliku
- Obsługa błędów (file not found, parse errors)
```

**Rezultat:**
- src/storage/fileStorage.js
- tests/storage/fileStorage.test.js
- data/todos.json (initial empty array)

### Krok 4: Service layer

```
Ty: Użyj test-first-developer dla todoService.js

Funkcje:
- getAllTodos()
- getTodoById(id)
- createTodo(data)
- updateTodo(id, data)
- deleteTodo(id)

Każda funkcja powinna:
- Używać fileStorage
- Walidować dane
- Obsługiwać błędy
```

**Rezultat:**
- src/services/todoService.js
- tests/services/todoService.test.js

### Krok 5: Controller

```
Ty: Implementuj todoController.js

Controllers dla:
- GET /todos
- GET /todos/:id
- POST /todos
- PUT /todos/:id
- DELETE /todos/:id

Error handling z proper HTTP status codes
```

### Krok 6: Routes

```
Ty: Stwórz routes/todos.js z Express Router

Podepnij wszystkie kontrolery do odpowiednich routes
```

### Krok 7: Main app

```
Ty: Stwórz src/app.js

Setup:
- Express app
- Middleware (body-parser, cors)
- Routes
- Error handler middleware
- Export app (dla testów)

Stwórz też src/server.js do uruchamiania serwera
```

### Krok 8: Code review backend

```
Ty: Użyj code-reviewer do przeglądu całego backend/src/
```

Zastosuj sugestie.

### Krok 9: Security audit

```
Ty: Użyj security-guardian do audytu API endpoints
```

Napraw znalezione problemy.

### Krok 10: Testy integracyjne

```
Ty: Użyj uni-tester do dodania integration tests w tests/integration/api.test.js

Testuj:
- Pełny flow: create → read → update → delete
- Edge cases
- Error scenarios
```

### Krok 11: Uruchom backend

```
Ty: Uruchom backend serwer na porcie 3000
Ty: Przetestuj API używając curl lub Postman
```

Sprawdź:
```bash
curl http://localhost:3000/todos
curl -X POST http://localhost:3000/todos -H "Content-Type: application/json" -d '{"title":"Test todo"}'
```

## Faza 3: Frontend (30 min)

### Krok 1: HTML structure

```
Ty: Stwórz frontend/index.html

Struktura:
- Header z tytułem "Todo App"
- Form do dodawania todo (input + button)
- Filters (All / Active / Completed)
- Lista todos (ul)
- Template dla pojedynczego todo item
```

### Krok 2: CSS styling

```
Ty: Stwórz frontend/styles.css

Style:
- Clean, modern design
- Responsive
- Hover effects
- Completed todos przekreślone
- Podobny styl do TodoMVC
```

### Krok 3: JavaScript logic

```
Ty: Stwórz frontend/app.js

Funkcjonalności:
- Fetch todos from API
- Render todos list
- Add new todo
- Toggle complete status
- Delete todo
- Filter todos (all/active/completed)
- Error handling z user-friendly messages
```

### Krok 4: Code review frontend

```
Ty: Użyj code-reviewer dla frontend/app.js

Focus na:
- Separation of concerns
- Event delegation
- Async/await best practices
```

Zastosuj sugestie.

### Krok 5: Integration testing

```
Ty: Uruchom backend, otwórz frontend w przeglądarce i przetestuj:
1. Dodawanie todo
2. Oznaczanie jako completed
3. Usuwanie todo
4. Filtrowanie
5. Refresh strony (persistence)
```

## Faza 4: Polish & Documentation (15 min)

### Krok 1: Refactoring

```
Ty: Użyj refactoring-master na obu backend i frontend

Focus:
- DRY violations
- Kompleksowe funkcje
- Naming conventions
```

### Krok 2: Performance check

```
Ty: Użyj performance-optimizer dla frontend/app.js jeśli lista jest długa
```

Dodaj optimizations:
- Debouncing dla filter
- Virtual scrolling dla długich list (opcjonalne)

### Krok 3: Error handling improvements

Sprawdź edge cases:
- Backend offline
- Network errors
- Invalid data

### Krok 4: Documentation

```
Ty: Użyj documentation-writer do stworzenia kompletnej dokumentacji

Files:
- README.md (main)
- backend/API.md (API documentation)
- SETUP.md (installation & setup)
```

### Krok 5: Final quality gate

```
Ty: Użyj quality-gate-tester dla całego projektu przed finalizacją
```

## Faza 5: Git & Deployment (10 min)

### Krok 1: Git setup

```
Ty: Zainicjuj Git repo i stwórz initial commit

Commitnij w etapach:
1. Backend implementation
2. Frontend implementation
3. Documentation
```

### Krok 2: Deployment checklist

```
Ty: Przygotuj checklist do deployment:
- [ ] Wszystkie testy przechodzą
- [ ] No console.logs w produkcji
- [ ] Environment variables setup
- [ ] README z instrukcjami
- [ ] Security audit passed
```

### Krok 3: Create PR (opcional)

Jeśli pracujesz z remote repo:

```
Ty: Stwórz pull request z opisem funkcjonalności
```

## Gotowa aplikacja - Funkcjonalności

### Backend API

**Endpoints:**
```
GET    /todos          Lista wszystkich todos
GET    /todos/:id      Pojedynczy todo
POST   /todos          Nowy todo
PUT    /todos/:id      Aktualizacja todo
DELETE /todos/:id      Usunięcie todo
```

**Features:**
- ✅ CRUD operations
- ✅ Walidacja danych
- ✅ Error handling
- ✅ File-based storage
- ✅ Testy (unit + integration)
- ✅ API documentation

### Frontend

**Features:**
- ✅ Wyświetlanie listy todos
- ✅ Dodawanie nowych todos
- ✅ Toggle completed status
- ✅ Usuwanie todos
- ✅ Filtrowanie (all/active/completed)
- ✅ Responsywny design
- ✅ Error handling
- ✅ Loading states

## Rozszerzenia (dla chętnych)

### Easy:
1. Dodaj counter pozostałych tasks
2. "Clear completed" button
3. Edit todo title inline
4. Sort by date created

### Medium:
5. Drag & drop reordering
6. Multiple lists/categories
7. Search functionality
8. Dark mode toggle

### Advanced:
9. Backend → Database (MongoDB/PostgreSQL)
10. Authentication & user accounts
11. Real-time updates (WebSockets)
12. Deploy to Heroku/Vercel

## Nauka z projektu

### Co osiągnąłeś

1. **Architektura:** Zaprojektowałeś strukturę aplikacji z chief-architect
2. **TDD:** Użyłeś test-first-developer do pisania kodu z testami
3. **Quality:** Code-reviewer i security-guardian zapewniły jakość
4. **Documentation:** Kompletna dokumentacja z documentation-writer
5. **Integration:** Połączyłeś backend i frontend
6. **Best Practices:** Zastosowałeś wszystkie poznane techniki

### Kluczowe umiejętności

- Planowanie przed kodowaniem
- Używanie agents do specjalistycznych zadań
- TDD workflow
- Code review i refactoring
- Security awareness
- Dokumentowanie kodu
- Git workflow

## Best Practices zastosowane

1. ✅ Plan before code (chief-architect)
2. ✅ Tests first (test-first-developer)
3. ✅ Code review (code-reviewer)
4. ✅ Security audit (security-guardian)
5. ✅ Documentation (documentation-writer)
6. ✅ Quality gates (quality-gate-tester)
7. ✅ Version control (Git)
8. ✅ Separation of concerns
9. ✅ Error handling
10. ✅ KISS & DRY principles

## Zadanie praktyczne

**Zbuduj swoją własną wersję Todo App używając tego przewodnika!**

Możesz:
- Dodać własne features
- Użyć innej technologii (React, Vue, Python)
- Połączyć z bazą danych
- Wdrożyć online

## Jak Claude Code może Ci pomóc?

```
Utkn1łem na etapie X, co robić?
Jak rozszerzyć aplikację o Y?
Mam błąd Z, pomóż debugować
Jak zoptymalizować wydajność?
```

## Dodatkowe materiały

### Tutorial extensions
- [TodoMVC](https://todomvc.com/) - Zobacz inne implementacje
- [REST API Best Practices](https://restfulapi.net/)

### Deploy guides
- [Heroku Deployment](https://devcenter.heroku.com/articles/deploying-nodejs)
- [Vercel Deployment](https://vercel.com/guides)

## Podsumowanie

Zbudowałeś kompletną aplikację od architektury do dokumentacji używając Claude Code i agents! Nauczyłeś się:
- Planowania projektu z chief-architect
- TDD workflow z test-first-developer
- Quality assurance z multiple agents
- Integration full-stack aplikacji
- Best practices dla beginning devs

**Gratulacje!** 🎉🎉🎉 Jesteś gotowy do ostatniej lekcji - Best Practices dla Beginners!

---

**Ilustracje:** (do dodania)
- Diagram architektury aplikacji
- Screenshot gotowej aplikacji
- Flowchart development process
- Checklist realizacji projektu
