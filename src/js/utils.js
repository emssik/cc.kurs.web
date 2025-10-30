/**
 * Utils - Funkcje pomocnicze
 */

const Utils = {
    /**
     * Formatuje datę do czytelnego formatu
     * @param {string|Date} date - Data do sformatowania
     * @returns {string} Sformatowana data
     */
    formatDate(date) {
        if (typeof date === 'string') {
            date = new Date(date);
        }

        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };

        return date.toLocaleDateString('pl-PL', options);
    },

    /**
     * Escapuje HTML w tekście
     * @param {string} text - Tekst do escapowania
     * @returns {string} Escapowany tekst
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    /**
     * Debounce funkcji
     * @param {Function} func - Funkcja do debounce
     * @param {number} wait - Czas oczekiwania w ms
     * @returns {Function} Debounced funkcja
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Sprawdza czy element jest widoczny w viewport
     * @param {HTMLElement} element - Element do sprawdzenia
     * @returns {boolean} True jeśli element jest widoczny
     */
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    /**
     * Płynne przewijanie do elementu
     * @param {string|HTMLElement} target - Element lub selektor
     * @param {number} offset - Offset od góry (px)
     */
    scrollTo(target, offset = 0) {
        const element = typeof target === 'string'
            ? document.querySelector(target)
            : target;

        if (element) {
            const y = element.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    },

    /**
     * Generuje losowy ID
     * @returns {string} Losowy ID
     */
    generateId() {
        return Math.random().toString(36).substring(2, 15) +
               Math.random().toString(36).substring(2, 15);
    },

    /**
     * Oblicza procent postępu
     * @param {number} completed - Liczba ukończonych elementów
     * @param {number} total - Całkowita liczba elementów
     * @returns {number} Procent (0-100)
     */
    calculateProgress(completed, total) {
        if (total === 0) return 0;
        return Math.round((completed / total) * 100);
    }
};

// Eksportuj Utils jako globalny obiekt
if (typeof window !== 'undefined') {
    window.Utils = Utils;
}
