/**
 * Router - Hash-based routing dla SPA
 * Zarządza nawigacją między różnymi widokami aplikacji
 */

const Router = {
    routes: {},
    currentRoute: null,

    /**
     * Rejestruje trasę z odpowiadającym jej handlerem
     * @param {string} path - Ścieżka (np. '/', '/test', '/lesson/:id')
     * @param {Function} handler - Funkcja wywoływana przy aktywacji trasy
     */
    register(path, handler) {
        this.routes[path] = handler;
    },

    /**
     * Inicjalizuje router - nasłuchuje zmian w hash
     */
    init() {
        // Nasłuchuj zmian hash
        window.addEventListener('hashchange', () => {
            this.handleRoute();
        });

        // Obsługa przycisków back/forward
        window.addEventListener('popstate', () => {
            this.handleRoute();
        });

        // Obsługa kliknięć w linki
        document.addEventListener('click', (e) => {
            // Sprawdź czy kliknięto link z hash
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const hash = link.getAttribute('href');
                this.navigateTo(hash);
            }
        });

        // Obsłuż aktualną trasę przy starcie
        this.handleRoute();
    },

    /**
     * Nawiguje do podanej trasy
     * @param {string} hash - Hash docelowej trasy (np. '#/test')
     */
    navigateTo(hash) {
        // Usuń # jeśli jest na początku
        if (!hash.startsWith('#')) {
            hash = '#' + hash;
        }

        window.location.hash = hash;
    },

    /**
     * Pobiera aktualną trasę (bez #)
     * @returns {string} Aktualna trasa
     */
    getCurrentRoute() {
        let hash = window.location.hash;

        // Usuń # z początku
        if (hash.startsWith('#')) {
            hash = hash.substring(1);
        }

        // Jeśli brak hash, zwróć '/'
        if (!hash || hash === '') {
            hash = '/';
        }

        return hash;
    },

    /**
     * Parsuje parametry z trasy
     * @param {string} pattern - Wzorzec trasy (np. '/lesson/:path/:id')
     * @param {string} route - Aktualna trasa (np. '/lesson/beginner/1')
     * @returns {Object|null} Obiekt z parametrami lub null jeśli nie pasuje
     */
    parseParams(pattern, route) {
        const patternParts = pattern.split('/').filter(p => p);
        const routeParts = route.split('/').filter(p => p);

        // Jeśli różna liczba części, nie pasuje
        if (patternParts.length !== routeParts.length) {
            return null;
        }

        const params = {};

        for (let i = 0; i < patternParts.length; i++) {
            const patternPart = patternParts[i];
            const routePart = routeParts[i];

            if (patternPart.startsWith(':')) {
                // To parametr - zapisz wartość
                const paramName = patternPart.substring(1);
                params[paramName] = routePart;
            } else if (patternPart !== routePart) {
                // Stałe części się nie zgadzają
                return null;
            }
        }

        return params;
    },

    /**
     * Obsługuje zmianę trasy - wywołuje odpowiedni handler
     */
    handleRoute() {
        const currentRoute = this.getCurrentRoute();
        this.currentRoute = currentRoute;

        // Usuń aktywne klasy ze wszystkich linków
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Znajdź pasującą trasę
        let matchedRoute = null;
        let params = {};

        // Najpierw sprawdź dokładne dopasowanie
        if (this.routes[currentRoute]) {
            matchedRoute = currentRoute;
        } else {
            // Sprawdź trasy z parametrami
            for (const [pattern, handler] of Object.entries(this.routes)) {
                const parsedParams = this.parseParams(pattern, currentRoute);
                if (parsedParams !== null) {
                    matchedRoute = pattern;
                    params = parsedParams;
                    break;
                }
            }
        }

        // Wywołaj handler lub 404
        if (matchedRoute && this.routes[matchedRoute]) {
            this.routes[matchedRoute](params);

            // Oznacz aktywny link w nawigacji
            const activeLink = document.querySelector(`a[href="#${currentRoute}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        } else {
            // Trasa nie znaleziona - przekieruj do 404
            if (this.routes['/404']) {
                this.routes['/404']();
            } else {
                console.warn('Route not found:', currentRoute);
                this.navigateTo('/');
            }
        }

        // Scroll do góry przy zmianie trasy
        window.scrollTo(0, 0);
    },

    /**
     * Pobiera query parameters z URL
     * @returns {Object} Obiekt z parametrami query
     */
    getQueryParams() {
        const hash = window.location.hash;
        const queryIndex = hash.indexOf('?');

        if (queryIndex === -1) {
            return {};
        }

        const queryString = hash.substring(queryIndex + 1);
        const params = {};

        queryString.split('&').forEach(param => {
            const [key, value] = param.split('=');
            params[decodeURIComponent(key)] = decodeURIComponent(value || '');
        });

        return params;
    }
};

// Eksportuj Router jako globalny obiekt
if (typeof window !== 'undefined') {
    window.Router = Router;
}
