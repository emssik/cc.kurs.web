/**
 * App.js - Główna logika aplikacji
 * Zarządza stanem aplikacji i inicjalizuje wszystkie moduły
 */

const App = {
    state: {
        currentPath: null,
        currentLesson: null,
        progress: null,
        structure: null
    },

    /**
     * Inicjalizuje aplikację
     */
    async init() {
        console.log('Initializing app...');

        try {
            // Inicjalizuj storage
            Storage.init();

            // Wczytaj postęp użytkownika
            this.state.progress = Storage.loadProgress();

            // Zarejestruj trasy
            this.registerRoutes();

            // Inicjalizuj router
            Router.init();

            // Ukryj loading screen
            this.hideLoadingScreen();

            console.log('App initialized successfully');
        } catch (error) {
            console.error('Error initializing app:', error);
            this.showError('Wystąpił błąd podczas inicjalizacji aplikacji');
        }
    },

    /**
     * Rejestruje wszystkie trasy aplikacji
     */
    registerRoutes() {
        // Strona główna
        Router.register('/', () => {
            this.showView('home');
        });

        // Test wstępny
        Router.register('/test', () => {
            this.showView('initialTest');
        });

        // Wynik testu wstępnego
        Router.register('/test/result', () => {
            this.showView('testResult');
        });

        // Lista ścieżek
        Router.register('/paths', () => {
            this.showView('paths');
        });

        // Szczegóły ścieżki
        Router.register('/path/:pathId', (params) => {
            this.showView('pathDetail', params);
        });

        // Lekcja
        Router.register('/lesson/:pathId/:lessonId', (params) => {
            this.showView('lesson', params);
        });

        // O kursie
        Router.register('/about', () => {
            this.showView('about');
        });

        // 404
        Router.register('/404', () => {
            this.showView('notFound');
        });
    },

    /**
     * Pokazuje konkretny widok
     * @param {string} viewName - Nazwa widoku
     * @param {Object} params - Parametry widoku
     */
    async showView(viewName, params = {}) {
        const contentContainer = document.getElementById('content');
        const sidebar = document.getElementById('sidebar');

        if (!contentContainer) {
            console.error('Content container not found');
            return;
        }

        try {
            let html = '';

            switch (viewName) {
                case 'home':
                    html = this.renderHomeView();
                    sidebar.style.display = 'none';
                    break;

                case 'initialTest':
                    html = this.renderInitialTestView();
                    sidebar.style.display = 'none';
                    break;

                case 'testResult':
                    html = this.renderTestResultView();
                    sidebar.style.display = 'none';
                    break;

                case 'paths':
                    html = this.renderPathsView();
                    sidebar.style.display = 'none';
                    break;

                case 'pathDetail':
                    html = await this.renderPathDetailView(params);
                    sidebar.style.display = 'none';
                    break;

                case 'lesson':
                    html = await this.renderLessonView(params);
                    sidebar.style.display = 'block';
                    this.updateSidebar(params.pathId);
                    break;

                case 'about':
                    html = this.renderAboutView();
                    sidebar.style.display = 'none';
                    break;

                case 'notFound':
                    html = this.render404View();
                    sidebar.style.display = 'none';
                    break;

                default:
                    html = this.render404View();
                    sidebar.style.display = 'none';
            }

            contentContainer.innerHTML = html;

            // Wywołaj hook po renderowaniu (jeśli istnieje)
            if (typeof this[`on${viewName}Rendered`] === 'function') {
                this[`on${viewName}Rendered`](params);
            }

        } catch (error) {
            console.error(`Error rendering view ${viewName}:`, error);
            contentContainer.innerHTML = this.renderErrorView(error.message);
        }
    },

    /**
     * Renderuje widok strony głównej
     */
    renderHomeView() {
        const progress = Storage.loadProgress();
        const hasStarted = progress && progress.initialTestCompleted;

        return `
            <div class="welcome-screen">
                <div class="welcome-hero">
                    <div class="welcome-text">
                        <h2 class="gradient-text">Witaj w kursie Claude Code!</h2>
                        <p>Przygotuj się na interaktywną przygodę z nauką jednego z najciekawszych narzędzi AI. Opanuj terminal, automatyzację i kodowanie z pomocą Claude.</p>
                        
                        ${hasStarted ? `
                            <div class="progress-overview glass-effect">
                                <h3>Twój postęp</h3>
                                <p>Ścieżka: <strong>${progress.currentPath || 'Nie wybrano'}</strong></p>
                                <p>Ukończone lekcje: <strong>${progress.completedLessons.length}</strong></p>
                                <a href="#/path/${progress.currentPath}" class="btn btn-primary btn-lg">Kontynuuj naukę</a>
                            </div>
                        ` : `
                            <div class="cta-buttons">
                                <a href="#/test" class="btn btn-primary btn-lg">Rozpocznij test wstępny</a>
                                <a href="#/paths" class="btn btn-outline btn-lg">Przeglądaj ścieżki</a>
                            </div>
                        `}
                    </div>
                    <div class="welcome-image">
                        <img src="src/assets/mascot/claude_mascot.png" alt="Claude Mascot" class="mascot-img">
                    </div>
                </div>

                <div class="welcome-features">
                    <h3>Co znajdziesz w kursie?</h3>
                    <div class="features-grid">
                        <div class="feature-card">
                            <div class="feature-icon">📚</div>
                            <h4>Lekcje interaktywne</h4>
                            <p>Nauka przez praktykę w prawdziwym środowisku.</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">🛠️</div>
                            <h4>Zadania praktyczne</h4>
                            <p>Rozwiązywanie realnych problemów programistycznych.</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">🎯</div>
                            <h4>Ścieżki rozwoju</h4>
                            <p>Dostosowane do Twojego poziomu zaawansowania.</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">🚀</div>
                            <h4>Testy wiedzy</h4>
                            <p>Sprawdź swoje umiejętności i śledź postępy.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Renderuje widok testu wstępnego
     */
    renderInitialTestView() {
        return `
            <div class="initial-test-view">
                <h2>Test wstępny</h2>
                <p>Odpowiedz na kilka pytań, aby określić Twój poziom i dopasować odpowiednią ścieżkę nauki.</p>
                <div class="test-info">
                    <p><strong>Czas:</strong> około 5-10 minut</p>
                    <p><strong>Pytania:</strong> 10-15</p>
                </div>
                <button class="btn btn-primary" onclick="App.startInitialTest()">Rozpocznij test</button>
                <p class="note">Możesz też pominąć test i wybrać ścieżkę samodzielnie.</p>
                <a href="#/paths" class="btn btn-secondary">Wybierz ścieżkę ręcznie</a>
            </div>
        `;
    },

    /**
     * Renderuje widok wyniku testu
     */
    renderTestResultView() {
        const progress = Storage.loadProgress();

        if (!progress || !progress.initialTestCompleted) {
            return `
                <div class="test-result-view">
                    <h2>Brak wyników</h2>
                    <p>Nie ukończyłeś jeszcze testu wstępnego.</p>
                    <a href="#/test" class="btn btn-primary">Rozpocznij test</a>
                </div>
            `;
        }

        const score = progress.initialTestScore || 0;
        const path = progress.currentPath;

        let pathName, pathDescription, pathColor;
        if (path === 'beginner') {
            pathName = 'Od zera';
            pathDescription = 'Dla osób, które dopiero zaczynają przygodę z Claude Code';
            pathColor = '#4CAF50';
        } else if (path === 'intermediate') {
            pathName = 'Średnio zaawansowany';
            pathDescription = 'Dla osób znających podstawy, które chcą pogłębić wiedzę';
            pathColor = '#FF9800';
        } else {
            pathName = 'Zaawansowany';
            pathDescription = 'Dla ekspertów szukających mastery';
            pathColor = '#F44336';
        }

        return `
            <div class="test-result-view">
                <h2>Wyniki testu wstępnego</h2>
                <div class="score-display">
                    <div class="score-circle" style="border-color: ${pathColor}">
                        <span class="score-value">${score}%</span>
                    </div>
                </div>
                <div class="path-assignment" style="border-left: 4px solid ${pathColor}">
                    <h3>Przypisana ścieżka: ${pathName}</h3>
                    <p>${pathDescription}</p>
                </div>
                <div class="cta-buttons">
                    <a href="#/path/${path}" class="btn btn-primary">Rozpocznij naukę</a>
                    <a href="#/paths" class="btn btn-secondary">Zobacz inne ścieżki</a>
                </div>
            </div>
        `;
    },

    /**
     * Renderuje widok listy ścieżek
     */
    renderPathsView() {
        return `
            <div class="paths-view">
                <h2>Wybierz ścieżkę nauki</h2>
                <p>Wybierz ścieżkę odpowiednią do Twojego poziomu zaawansowania</p>

                <div class="paths-grid">
                    <div class="path-card beginner">
                        <div class="path-header">
                            <h3>Od zera</h3>
                            <span class="path-badge">Beginner</span>
                        </div>
                        <p class="path-description">Dla osób, które dopiero zaczynają przygodę z Claude Code</p>
                        <ul class="path-features">
                            <li>Instalacja i konfiguracja</li>
                            <li>Podstawowe komendy i narzędzia</li>
                            <li>Praca z plikami</li>
                            <li>Wprowadzenie do Agents</li>
                        </ul>
                        <a href="#/path/beginner" class="btn btn-primary">Wybierz</a>
                    </div>

                    <div class="path-card intermediate">
                        <div class="path-header">
                            <h3>Średnio zaawansowany</h3>
                            <span class="path-badge">Intermediate</span>
                        </div>
                        <p class="path-description">Dla osób znających podstawy, które chcą pogłębić wiedzę</p>
                        <ul class="path-features">
                            <li>Zaawansowane features</li>
                            <li>Customizacja i automatyzacja</li>
                            <li>Agents w praktyce</li>
                            <li>Dobre praktyki</li>
                        </ul>
                        <a href="#/path/intermediate" class="btn btn-primary">Wybierz</a>
                    </div>

                    <div class="path-card advanced">
                        <div class="path-header">
                            <h3>Zaawansowany</h3>
                            <span class="path-badge">Advanced</span>
                        </div>
                        <p class="path-description">Dla ekspertów szukających mastery</p>
                        <ul class="path-features">
                            <li>MCP Servers</li>
                            <li>Integracje i CI/CD</li>
                            <li>Zaawansowane projekty</li>
                            <li>Production & scaling</li>
                        </ul>
                        <a href="#/path/advanced" class="btn btn-primary">Wybierz</a>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Renderuje szczegóły ścieżki
     */
    async renderPathDetailView(params) {
        const pathId = params.pathId;

        try {
            // Załaduj strukturę
            await Lessons.loadStructure();
            const structure = Lessons.courseStructure;

            if (!structure || !structure.paths[pathId]) {
                throw new Error('Ścieżka nie została znaleziona');
            }

            const path = structure.paths[pathId];
            const allLessons = await Lessons.getLessonsForPath(pathId);
            const completedLessons = allLessons.filter(lesson =>
                Storage.isLessonCompleted(lesson.id)
            );
            const progress = allLessons.length > 0
                ? Math.round((completedLessons.length / allLessons.length) * 100)
                : 0;

            // Renderuj moduły jako accordiony
            const modulesHtml = path.modules.map((module, moduleIndex) => {
                const moduleLessonsCount = module.lessons.length;
                return `
                    <div class="module-accordion ${moduleIndex === 0 ? 'expanded' : ''}"
                         data-module-id="${module.id}"
                         style="--path-color: ${path.color}">
                        <div class="module-header" onclick="App.toggleModule('${module.id}')">
                            <div class="module-title">
                                <h3>${module.name}</h3>
                                <p>${module.description}</p>
                            </div>
                            <div class="module-toggle">
                                <span class="lesson-count">${moduleLessonsCount} lekcj${moduleLessonsCount === 1 ? 'a' : moduleLessonsCount < 5 ? 'e' : 'i'}</span>
                                <span class="toggle-icon">▼</span>
                            </div>
                        </div>
                        <div class="module-content">
                            <ul class="module-lessons lessons-preview">
                                ${module.lessons.map((lesson, index) => {
                                    const isCompleted = Storage.isLessonCompleted(lesson.id);
                                    return `
                                        <li>
                                            <a href="#/lesson/${pathId}/${lesson.id}" class="${isCompleted ? 'completed' : ''}" style="--path-color: ${path.color}">
                                                <span class="lesson-number">${index + 1}.</span>
                                                <span class="lesson-title">${lesson.title}</span>
                                                <span class="lesson-duration">${lesson.duration}</span>
                                                ${isCompleted ? '<span class="checkmark">✓</span>' : ''}
                                            </a>
                                        </li>
                                    `;
                                }).join('')}
                            </ul>
                        </div>
                    </div>
                `;
            }).join('');

            return `
                <div class="path-detail-view" style="--path-color: ${path.color}">
                    <header class="path-header" style="--path-color: ${path.color}">
                        <h1>${path.name}</h1>
                        <p class="path-description">${path.description}</p>
                        <div class="path-stats">
                            <div class="stat">
                                <span class="stat-label">Lekcje</span>
                                <span class="stat-value">${allLessons.length}</span>
                            </div>
                            <div class="stat">
                                <span class="stat-label">Ukończone</span>
                                <span class="stat-value">${completedLessons.length}</span>
                            </div>
                            <div class="stat">
                                <span class="stat-label">Postęp</span>
                                <span class="stat-value">${progress}%</span>
                            </div>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progress}%; background-color: ${path.color}"></div>
                        </div>
                    </header>

                    <div class="modules-container">
                        <h2>Moduły kursu</h2>
                        ${modulesHtml}
                    </div>

                    <div class="path-actions">
                        ${allLessons.length > 0 ? `
                            <a href="#/lesson/${pathId}/${allLessons[0].id}" class="btn btn-primary btn-large">
                                ${completedLessons.length > 0 ? 'Kontynuuj naukę' : 'Rozpocznij kurs'}
                            </a>
                        ` : ''}
                        <a href="#/paths" class="btn btn-secondary">Powrót do ścieżek</a>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('Error rendering path detail:', error);
            return `
                <div class="error-message">
                    <h2>Nie udało się wczytać ścieżki</h2>
                    <p>${error.message}</p>
                    <a href="#/paths" class="btn btn-secondary">Powrót do ścieżek</a>
                </div>
            `;
        }
    },

    /**
     * Renderuje widok lekcji
     */
    async renderLessonView(params) {
        try {
            const { pathId, lessonId } = params;
            return await Lessons.renderLesson(pathId, lessonId);
        } catch (error) {
            console.error('Error rendering lesson view:', error);
            return `
                <div class="error-message">
                    <h2>Nie udało się wczytać lekcji</h2>
                    <p>${error.message}</p>
                    <a href="#/paths" class="btn btn-secondary">Powrót do ścieżek</a>
                </div>
            `;
        }
    },

    /**
     * Renderuje widok "O kursie"
     */
    renderAboutView() {
        return `
            <div class="about-view">
                <h2>O kursie</h2>
                <p>Interaktywna platforma do nauki Claude Code - od podstaw do zaawansowanych technik.</p>
                <h3>Funkcje</h3>
                <ul>
                    <li>Test wstępny określający poziom zaawansowania</li>
                    <li>3 ścieżki edukacyjne (beginner, intermediate, advanced)</li>
                    <li>45-60 lekcji z praktycznymi zadaniami</li>
                    <li>Automatyczny zapis postępu</li>
                    <li>Testy końcowe</li>
                </ul>
                <h3>Technologie</h3>
                <ul>
                    <li>Vanilla JavaScript</li>
                    <li>SCSS</li>
                    <li>Hash-based routing</li>
                    <li>localStorage</li>
                </ul>
                <a href="#/" class="btn btn-primary">Powrót do strony głównej</a>
            </div>
        `;
    },

    /**
     * Renderuje widok 404
     */
    render404View() {
        return `
            <div class="not-found-view">
                <h2>404 - Strona nie znaleziona</h2>
                <p>Przepraszamy, ale strona której szukasz nie istnieje.</p>
                <a href="#/" class="btn btn-primary">Powrót do strony głównej</a>
            </div>
        `;
    },

    /**
     * Renderuje widok błędu
     */
    renderErrorView(message) {
        return `
            <div class="error-view">
                <h2>Wystąpił błąd</h2>
                <p>${message}</p>
                <a href="#/" class="btn btn-primary">Powrót do strony głównej</a>
            </div>
        `;
    },

    /**
     * Aktualizuje sidebar z listą lekcji
     */
    async updateSidebar(pathId) {
        const sidebar = document.getElementById('sidebar');

        if (!sidebar) {
            console.error('Sidebar element not found');
            return;
        }

        try {
            const sidebarHtml = await Lessons.renderSidebar(pathId);
            sidebar.innerHTML = sidebarHtml;
        } catch (error) {
            console.error('Error updating sidebar:', error);
            sidebar.innerHTML = '<div class="sidebar-error">Błąd wczytywania sidebara</div>';
        }
    },

    /**
     * Ukrywa loading screen
     */
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const app = document.getElementById('app');

        if (loadingScreen && app) {
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                app.style.display = 'block';
            }, 500);
        }
    },

    /**
     * Pokazuje komunikat błędu
     */
    showError(message) {
        alert(message); // TODO: Zamienić na bardziej elegancki modal
    },

    /**
     * Rozpoczyna test wstępny
     */
    startInitialTest() {
        Quiz.startTest('initial-test');
    },

    /**
     * Przełącza widoczność modułu (accordion)
     * @param {string} moduleId - ID modułu do przełączenia
     */
    toggleModule(moduleId) {
        const moduleElement = document.querySelector(`[data-module-id="${moduleId}"]`);

        if (!moduleElement) {
            console.error('Module element not found:', moduleId);
            return;
        }

        // Toggle expanded class
        moduleElement.classList.toggle('expanded');
    }
};

// Inicjalizuj aplikację po załadowaniu DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        App.init();
    });
} else {
    App.init();
}

// Eksportuj App jako globalny obiekt
if (typeof window !== 'undefined') {
    window.App = App;
}
