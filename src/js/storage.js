/**
 * Storage API - Zarządzanie localStorage
 * Obsługuje zapis i odczyt postępu użytkownika
 */

const Storage = {
    storageKey: 'claudeCodeCourse',
    version: '1.0',

    /**
     * Zwraca domyślny stan aplikacji
     * @returns {Object} Domyślny stan
     */
    getDefaultState() {
        return {
            version: this.version,
            currentPath: null,
            completedLessons: [],
            initialTestScore: null,
            initialTestCompleted: false,
            initialTestAnswers: {},
            finalTestAttempts: {
                beginner: [],
                intermediate: [],
                advanced: []
            },
            lastVisited: null,
            preferences: {
                theme: 'light',
                fontSize: 'medium'
            },
            createdAt: new Date().toISOString(),
            lastUpdated: new Date().toISOString()
        };
    },

    /**
     * Waliduje strukturę danych
     * @param {Object} data - Dane do walidacji
     * @returns {boolean} True jeśli dane są poprawne
     */
    validateData(data) {
        if (!data || typeof data !== 'object') {
            return false;
        }

        // Sprawdź czy wszystkie wymagane pola istnieją
        const requiredFields = [
            'version',
            'completedLessons',
            'initialTestCompleted',
            'finalTestAttempts'
        ];

        for (const field of requiredFields) {
            if (!(field in data)) {
                console.warn(`Missing required field: ${field}`);
                return false;
            }
        }

        // Sprawdź typy
        if (!Array.isArray(data.completedLessons)) {
            console.warn('completedLessons must be an array');
            return false;
        }

        if (typeof data.initialTestCompleted !== 'boolean') {
            console.warn('initialTestCompleted must be a boolean');
            return false;
        }

        return true;
    },

    /**
     * Inicjalizuje storage - tworzy domyślny stan jeśli nie istnieje
     */
    init() {
        const existingData = this.loadProgress();

        if (!existingData) {
            // Brak danych - utwórz domyślny stan
            const defaultState = this.getDefaultState();
            this.saveProgress(defaultState);
            console.log('Storage initialized with default state');
        } else {
            console.log('Storage loaded successfully');
        }
    },

    /**
     * Zapisuje postęp do localStorage
     * @param {Object} data - Dane do zapisania
     * @returns {boolean} True jeśli zapis się powiódł
     */
    saveProgress(data) {
        try {
            // Waliduj dane
            if (!this.validateData(data)) {
                console.error('Invalid data structure');
                return false;
            }

            // Dodaj timestamp aktualizacji
            data.lastUpdated = new Date().toISOString();

            // Zapisz do localStorage
            const jsonData = JSON.stringify(data);
            localStorage.setItem(this.storageKey, jsonData);

            return true;
        } catch (error) {
            console.error('Error saving progress:', error);
            return false;
        }
    },

    /**
     * Wczytuje postęp z localStorage
     * @returns {Object|null} Zapisane dane lub null jeśli nie istnieją
     */
    loadProgress() {
        try {
            const jsonData = localStorage.getItem(this.storageKey);

            if (!jsonData) {
                return null;
            }

            const data = JSON.parse(jsonData);

            // Waliduj dane
            if (!this.validateData(data)) {
                console.warn('Stored data is invalid, resetting to default');
                return this.getDefaultState();
            }

            // Sprawdź wersję - jeśli inna, migruj dane
            if (data.version !== this.version) {
                console.log('Data version mismatch, migrating...');
                return this.migrateData(data);
            }

            return data;
        } catch (error) {
            console.error('Error loading progress:', error);
            return null;
        }
    },

    /**
     * Resetuje postęp - usuwa wszystkie dane
     * @returns {boolean} True jeśli reset się powiódł
     */
    resetProgress() {
        try {
            localStorage.removeItem(this.storageKey);
            console.log('Progress reset successfully');
            // Zainicjalizuj ponownie
            this.init();
            return true;
        } catch (error) {
            console.error('Error resetting progress:', error);
            return false;
        }
    },

    /**
     * Pobiera konkretną wartość z zapisanych danych
     * @param {string} key - Klucz do pobrania
     * @returns {any} Wartość lub null jeśli nie istnieje
     */
    getProgress(key) {
        const data = this.loadProgress();

        if (!data) {
            return null;
        }

        // Obsługa nested keys (np. 'preferences.theme')
        const keys = key.split('.');
        let value = data;

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return null;
            }
        }

        return value;
    },

    /**
     * Aktualizuje konkretną wartość w zapisanych danych
     * @param {string} key - Klucz do aktualizacji
     * @param {any} value - Nowa wartość
     * @returns {boolean} True jeśli aktualizacja się powiodła
     */
    updateProgress(key, value) {
        const data = this.loadProgress() || this.getDefaultState();

        // Obsługa nested keys
        const keys = key.split('.');
        let current = data;

        for (let i = 0; i < keys.length - 1; i++) {
            const k = keys[i];
            if (!(k in current) || typeof current[k] !== 'object') {
                current[k] = {};
            }
            current = current[k];
        }

        current[keys[keys.length - 1]] = value;

        return this.saveProgress(data);
    },

    /**
     * Dodaje ukończoną lekcję
     * @param {string} lessonId - ID lekcji
     * @returns {boolean} True jeśli operacja się powiodła
     */
    markLessonCompleted(lessonId) {
        const data = this.loadProgress() || this.getDefaultState();

        if (!data.completedLessons.includes(lessonId)) {
            data.completedLessons.push(lessonId);
            return this.saveProgress(data);
        }

        return true;
    },

    /**
     * Usuwa lekcję z listy ukończonych
     * @param {string} lessonId - ID lekcji
     * @returns {boolean} True jeśli operacja się powiodła
     */
    markLessonIncomplete(lessonId) {
        const data = this.loadProgress() || this.getDefaultState();

        const index = data.completedLessons.indexOf(lessonId);
        if (index > -1) {
            data.completedLessons.splice(index, 1);
            return this.saveProgress(data);
        }

        return true;
    },

    /**
     * Sprawdza czy lekcja jest ukończona
     * @param {string} lessonId - ID lekcji
     * @returns {boolean} True jeśli lekcja jest ukończona
     */
    isLessonCompleted(lessonId) {
        const completedLessons = this.getProgress('completedLessons') || [];
        return completedLessons.includes(lessonId);
    },

    /**
     * Zapisuje wynik testu końcowego
     * @param {string} path - Ścieżka (beginner/intermediate/advanced)
     * @param {number} score - Wynik (0-100)
     * @returns {boolean} True jeśli zapis się powiódł
     */
    saveFinalTestAttempt(path, score) {
        const data = this.loadProgress() || this.getDefaultState();

        const attempt = {
            date: new Date().toISOString(),
            score: score
        };

        if (!data.finalTestAttempts[path]) {
            data.finalTestAttempts[path] = [];
        }

        data.finalTestAttempts[path].push(attempt);

        return this.saveProgress(data);
    },

    /**
     * Pobiera najlepszy wynik z testu końcowego dla danej ścieżki
     * @param {string} path - Ścieżka
     * @returns {number|null} Najlepszy wynik lub null
     */
    getBestFinalTestScore(path) {
        const attempts = this.getProgress(`finalTestAttempts.${path}`);

        if (!attempts || attempts.length === 0) {
            return null;
        }

        return Math.max(...attempts.map(a => a.score));
    },

    /**
     * Migruje dane ze starszej wersji
     * @param {Object} oldData - Stare dane
     * @returns {Object} Zmigrowane dane
     */
    migrateData(oldData) {
        // Tutaj można dodać logikę migracji dla różnych wersji
        console.log('Migrating data from version', oldData.version, 'to', this.version);

        const newData = this.getDefaultState();

        // Skopiuj istniejące dane
        Object.keys(oldData).forEach(key => {
            if (key in newData) {
                newData[key] = oldData[key];
            }
        });

        // Aktualizuj wersję
        newData.version = this.version;

        // Zapisz zmigrowane dane
        this.saveProgress(newData);

        return newData;
    },

    /**
     * Eksportuje dane jako JSON (do pobrania)
     * @returns {string} JSON z danymi
     */
    exportData() {
        const data = this.loadProgress();
        return JSON.stringify(data, null, 2);
    },

    /**
     * Importuje dane z JSON
     * @param {string} jsonData - JSON z danymi
     * @returns {boolean} True jeśli import się powiódł
     */
    importData(jsonData) {
        try {
            const data = JSON.parse(jsonData);

            if (this.validateData(data)) {
                return this.saveProgress(data);
            } else {
                console.error('Invalid import data');
                return false;
            }
        } catch (error) {
            console.error('Error importing data:', error);
            return false;
        }
    }
};

// Eksportuj Storage jako globalny obiekt
if (typeof window !== 'undefined') {
    window.Storage = Storage;
}
