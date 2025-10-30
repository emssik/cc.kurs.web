/**
 * Lessons - Zarządzanie lekcjami
 * Renderowanie treści lekcji, nawigacja, oznaczanie jako ukończone
 */

const Lessons = {
    currentLesson: null,
    courseStructure: null,
    currentPath: null,
    currentModule: null,

    /**
     * Inicjalizuje moduł lekcji - konfiguruje marked.js
     */
    init() {
        // Konfiguracja marked.js
        if (typeof marked !== 'undefined') {
            marked.setOptions({
                highlight: function(code, lang) {
                    if (lang && typeof hljs !== 'undefined' && hljs.getLanguage(lang)) {
                        try {
                            return hljs.highlight(code, { language: lang }).value;
                        } catch (err) {
                            console.error('Highlight error:', err);
                        }
                    }
                    return code;
                },
                breaks: true,
                gfm: true
            });
        }

        console.log('Lessons module initialized');
    },

    /**
     * Wczytuje strukturę kursu z pliku JSON
     * @returns {Promise<Object>} Struktura kursu
     */
    async loadStructure() {
        if (this.courseStructure) {
            return this.courseStructure;
        }

        try {
            const response = await fetch('content/data/structure.json');

            if (!response.ok) {
                throw new Error(`Failed to load structure: ${response.statusText}`);
            }

            this.courseStructure = await response.json();
            return this.courseStructure;
        } catch (error) {
            console.error('Error loading course structure:', error);
            throw error;
        }
    },

    /**
     * Wczytuje treść lekcji z pliku Markdown
     * @param {string} filePath - Ścieżka do pliku (np. 'beginner/01-czym-jest-claude-code.md')
     * @returns {Promise<string>} Treść pliku
     */
    async loadLessonContent(filePath) {
        try {
            const response = await fetch(`content/lessons/${filePath}`);

            if (!response.ok) {
                throw new Error(`Failed to load lesson: ${response.statusText}`);
            }

            const content = await response.text();
            return content;
        } catch (error) {
            console.error('Error loading lesson:', error);
            throw error;
        }
    },

    /**
     * Parsuje frontmatter z pliku Markdown
     * @param {string} content - Zawartość pliku
     * @returns {Object} { metadata, content }
     */
    parseFrontmatter(content) {
        const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
        const match = content.match(frontmatterRegex);

        if (!match) {
            return {
                metadata: {},
                content: content
            };
        }

        const frontmatterText = match[1];
        const mainContent = match[2];

        // Prosty parser YAML (dla podstawowych przypadków)
        const metadata = {};
        frontmatterText.split('\n').forEach(line => {
            const colonIndex = line.indexOf(':');
            if (colonIndex > -1) {
                const key = line.substring(0, colonIndex).trim();
                let value = line.substring(colonIndex + 1).trim();

                // Usuń cudzysłowy
                if ((value.startsWith('"') && value.endsWith('"')) ||
                    (value.startsWith("'") && value.endsWith("'"))) {
                    value = value.substring(1, value.length - 1);
                }

                // Parsuj tablice (prosty przypadek: [tag1, tag2])
                if (value.startsWith('[') && value.endsWith(']')) {
                    value = value.substring(1, value.length - 1)
                        .split(',')
                        .map(v => v.trim());
                }

                metadata[key] = value;
            }
        });

        return {
            metadata,
            content: mainContent
        };
    },

    /**
     * Renderuje treść Markdown do HTML
     * @param {string} markdown - Treść Markdown
     * @returns {string} HTML
     */
    renderMarkdown(markdown) {
        if (typeof marked === 'undefined') {
            console.warn('marked.js not loaded, rendering as plain text');
            return `<div class="markdown-content">${markdown.replace(/\n/g, '<br>')}</div>`;
        }

        try {
            // Renderuj Markdown do HTML
            const rawHtml = marked.parse(markdown);

            // Sanityzuj HTML za pomocą DOMPurify
            if (typeof DOMPurify !== 'undefined') {
                return DOMPurify.sanitize(rawHtml, {
                    ALLOWED_TAGS: [
                        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                        'p', 'br', 'hr',
                        'strong', 'em', 'u', 's', 'code', 'pre',
                        'a', 'img',
                        'ul', 'ol', 'li',
                        'table', 'thead', 'tbody', 'tr', 'th', 'td',
                        'blockquote',
                        'div', 'span'
                    ],
                    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'target', 'rel']
                });
            }

            return rawHtml;
        } catch (error) {
            console.error('Error rendering markdown:', error);
            return `<div class="error">Error rendering content</div>`;
        }
    },

    /**
     * Znajduje lekcję w strukturze kursu
     * @param {string} pathId - ID ścieżki
     * @param {string} lessonId - ID lekcji
     * @returns {Object|null} Obiekt z lekcją, modułem i indeksami
     */
    findLesson(pathId, lessonId) {
        if (!this.courseStructure) {
            console.error('Course structure not loaded');
            return null;
        }

        const path = this.courseStructure.paths[pathId];
        if (!path) {
            console.error('Path not found:', pathId);
            return null;
        }

        for (let moduleIndex = 0; moduleIndex < path.modules.length; moduleIndex++) {
            const module = path.modules[moduleIndex];
            for (let lessonIndex = 0; lessonIndex < module.lessons.length; lessonIndex++) {
                const lesson = module.lessons[lessonIndex];
                if (lesson.id === lessonId) {
                    return {
                        lesson,
                        module,
                        moduleIndex,
                        lessonIndex,
                        path
                    };
                }
            }
        }

        return null;
    },

    /**
     * Znajduje poprzednią lekcję
     * @param {string} pathId - ID ścieżki
     * @param {string} lessonId - ID bieżącej lekcji
     * @returns {Object|null} Poprzednia lekcja lub null
     */
    findPreviousLesson(pathId, lessonId) {
        const current = this.findLesson(pathId, lessonId);
        if (!current) return null;

        const { moduleIndex, lessonIndex, path } = current;

        // Jeśli to nie pierwsza lekcja w module
        if (lessonIndex > 0) {
            return {
                lesson: path.modules[moduleIndex].lessons[lessonIndex - 1],
                module: path.modules[moduleIndex]
            };
        }

        // Jeśli to pierwsza lekcja w module, ale nie pierwszy moduł
        if (moduleIndex > 0) {
            const prevModule = path.modules[moduleIndex - 1];
            const lastLesson = prevModule.lessons[prevModule.lessons.length - 1];
            return {
                lesson: lastLesson,
                module: prevModule
            };
        }

        // To pierwsza lekcja w kursie
        return null;
    },

    /**
     * Znajduje następną lekcję
     * @param {string} pathId - ID ścieżki
     * @param {string} lessonId - ID bieżącej lekcji
     * @returns {Object|null} Następna lekcja lub null
     */
    findNextLesson(pathId, lessonId) {
        const current = this.findLesson(pathId, lessonId);
        if (!current) return null;

        const { moduleIndex, lessonIndex, path } = current;
        const module = path.modules[moduleIndex];

        // Jeśli to nie ostatnia lekcja w module
        if (lessonIndex < module.lessons.length - 1) {
            return {
                lesson: module.lessons[lessonIndex + 1],
                module: module
            };
        }

        // Jeśli to ostatnia lekcja w module, ale nie ostatni moduł
        if (moduleIndex < path.modules.length - 1) {
            const nextModule = path.modules[moduleIndex + 1];
            return {
                lesson: nextModule.lessons[0],
                module: nextModule
            };
        }

        // To ostatnia lekcja w kursie
        return null;
    },

    /**
     * Renderuje breadcrumbs dla lekcji
     * @param {string} pathId - ID ścieżki
     * @param {string} moduleId - ID modułu
     * @param {string} lessonId - ID lekcji
     * @returns {string} HTML breadcrumbs
     */
    renderBreadcrumbs(pathId, moduleId, lessonId) {
        if (!this.courseStructure) {
            return '';
        }

        const path = this.courseStructure.paths[pathId];
        const lessonData = this.findLesson(pathId, lessonId);

        if (!path || !lessonData) {
            return '';
        }

        const { module, lesson } = lessonData;

        return `
            <nav class="breadcrumbs" aria-label="Breadcrumb">
                <ol>
                    <li><a href="#/paths">Ścieżki</a></li>
                    <li><a href="#/path/${pathId}">${path.name}</a></li>
                    <li><a href="#/path/${pathId}#${module.id}">${module.name}</a></li>
                    <li aria-current="page">${lesson.title}</li>
                </ol>
            </nav>
        `;
    },

    /**
     * Renderuje pełną lekcję
     * @param {string} pathId - ID ścieżki
     * @param {string} lessonId - ID lekcji
     * @returns {Promise<string>} HTML lekcji
     */
    async renderLesson(pathId, lessonId) {
        try {
            // Załaduj strukturę jeśli nie jest załadowana
            if (!this.courseStructure) {
                await this.loadStructure();
            }

            // Znajdź lekcję w strukturze
            const lessonData = this.findLesson(pathId, lessonId);
            if (!lessonData) {
                throw new Error(`Lesson not found: ${pathId}/${lessonId}`);
            }

            const { lesson, module } = lessonData;
            this.currentLesson = { id: lessonId, pathId, moduleId: module.id };

            // Wczytaj treść lekcji
            const content = await this.loadLessonContent(lesson.file);
            const { metadata, content: markdownContent } = this.parseFrontmatter(content);

            // Renderuj Markdown do HTML
            const html = this.renderMarkdown(markdownContent);

            // Znajdź poprzednią i następną lekcję
            const previous = this.findPreviousLesson(pathId, lessonId);
            const next = this.findNextLesson(pathId, lessonId);

            // Sprawdź czy lekcja jest ukończona
            const isCompleted = Storage.isLessonCompleted(lessonId);

            // Renderuj breadcrumbs
            const breadcrumbs = this.renderBreadcrumbs(pathId, module.id, lessonId);

            return `
                ${breadcrumbs}
                <article class="lesson">
                    <header class="lesson-header">
                        <h1>${metadata.title || lesson.title}</h1>
                        ${metadata.description ? `<p class="lesson-description">${metadata.description}</p>` : ''}
                        <div class="lesson-meta">
                            ${lesson.duration ? `<span class="duration">⏱️ ${lesson.duration}</span>` : ''}
                            ${metadata.difficulty ? `<span class="difficulty"><span class="badge badge-${metadata.difficulty}">${metadata.difficulty}</span></span>` : ''}
                            ${metadata.tags && Array.isArray(metadata.tags) ?
                                `<span class="tags">${metadata.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</span>` : ''}
                        </div>
                    </header>
                    <div class="lesson-content">
                        ${html}
                    </div>
                    <footer class="lesson-footer">
                        <div class="lesson-navigation">
                            ${previous ?
                                `<a href="#/lesson/${pathId}/${previous.lesson.id}" class="btn btn-secondary">
                                    <span class="icon">←</span> ${previous.lesson.title}
                                </a>` :
                                '<div></div>'}

                            <button
                                class="btn ${isCompleted ? 'btn-success' : 'btn-primary'}"
                                onclick="Lessons.toggleCompleted('${lessonId}')"
                                id="complete-btn"
                            >
                                ${isCompleted ? '✓ Ukończona' : 'Oznacz jako ukończoną'}
                            </button>

                            ${next ?
                                `<a href="#/lesson/${pathId}/${next.lesson.id}" class="btn btn-primary">
                                    ${next.lesson.title} <span class="icon">→</span>
                                </a>` :
                                '<div></div>'}
                        </div>
                    </footer>
                </article>
            `;
        } catch (error) {
            console.error('Error rendering lesson:', error);
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
     * Toggle stanu ukończenia lekcji
     * @param {string} lessonId - ID lekcji
     */
    toggleCompleted(lessonId) {
        const isCompleted = Storage.isLessonCompleted(lessonId);

        if (isCompleted) {
            Storage.markLessonIncomplete(lessonId);
        } else {
            Storage.markLessonCompleted(lessonId);
        }

        // Odśwież przycisk
        const btn = document.getElementById('complete-btn');
        if (btn) {
            if (isCompleted) {
                btn.classList.remove('btn-success');
                btn.classList.add('btn-primary');
                btn.innerHTML = 'Oznacz jako ukończoną';
            } else {
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-success');
                btn.innerHTML = '✓ Ukończona';
            }
        }

        // Odśwież sidebar jeśli istnieje
        if (typeof App !== 'undefined' && App.updateSidebar && this.currentLesson) {
            App.updateSidebar(this.currentLesson.pathId);
        }
    },

    /**
     * Nawiguje do poprzedniej lekcji
     */
    navigateToPrevious() {
        if (!this.currentLesson) {
            console.warn('No current lesson');
            return;
        }

        const previous = this.findPreviousLesson(
            this.currentLesson.pathId,
            this.currentLesson.id
        );

        if (previous) {
            Router.navigateTo(`/lesson/${this.currentLesson.pathId}/${previous.lesson.id}`);
        }
    },

    /**
     * Nawiguje do następnej lekcji
     */
    navigateToNext() {
        if (!this.currentLesson) {
            console.warn('No current lesson');
            return;
        }

        const next = this.findNextLesson(
            this.currentLesson.pathId,
            this.currentLesson.id
        );

        if (next) {
            Router.navigateTo(`/lesson/${this.currentLesson.pathId}/${next.lesson.id}`);
        }
    },

    /**
     * Pobiera listę wszystkich lekcji dla ścieżki (płaska lista)
     * @param {string} pathId - ID ścieżki
     * @returns {Promise<Array>} Lista lekcji
     */
    async getLessonsForPath(pathId) {
        if (!this.courseStructure) {
            await this.loadStructure();
        }

        const path = this.courseStructure.paths[pathId];
        if (!path) {
            console.error('Path not found:', pathId);
            return [];
        }

        const lessons = [];
        path.modules.forEach(module => {
            module.lessons.forEach(lesson => {
                lessons.push({
                    ...lesson,
                    moduleId: module.id,
                    moduleName: module.name
                });
            });
        });

        return lessons;
    },

    /**
     * Renderuje sidebar z listą lekcji
     * @param {string} pathId - ID aktywnej ścieżki
     * @returns {Promise<string>} HTML sidebara
     */
    async renderSidebar(pathId) {
        if (!this.courseStructure) {
            await this.loadStructure();
        }

        const path = this.courseStructure.paths[pathId];
        if (!path) {
            return '<div class="sidebar-error">Nie znaleziono ścieżki</div>';
        }

        // Oblicz postęp
        const allLessons = await this.getLessonsForPath(pathId);
        const completedLessons = allLessons.filter(lesson =>
            Storage.isLessonCompleted(lesson.id)
        );
        const progress = allLessons.length > 0
            ? Math.round((completedLessons.length / allLessons.length) * 100)
            : 0;

        // Renderuj moduły i lekcje
        const modulesHtml = path.modules.map(module => {
            const lessonsHtml = module.lessons.map(lesson => {
                const isCompleted = Storage.isLessonCompleted(lesson.id);
                const isActive = this.currentLesson && this.currentLesson.id === lesson.id;

                return `
                    <li class="lesson-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}">
                        <a href="#/lesson/${pathId}/${lesson.id}">
                            <span class="lesson-status">${isCompleted ? '✓' : '○'}</span>
                            <span class="lesson-title">${lesson.title}</span>
                            ${lesson.duration ? `<span class="lesson-duration">${lesson.duration}</span>` : ''}
                        </a>
                    </li>
                `;
            }).join('');

            return `
                <div class="module">
                    <h4 class="module-title">${module.name}</h4>
                    <ul class="lesson-list">
                        ${lessonsHtml}
                    </ul>
                </div>
            `;
        }).join('');

        return `
            <div class="sidebar-header">
                <h3>${path.name}</h3>
                <p class="sidebar-description">${path.description}</p>
                <div class="progress-summary">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress}%; background-color: ${path.color}"></div>
                    </div>
                    <span class="progress-text">${progress}% ukończone (${completedLessons.length}/${allLessons.length})</span>
                </div>
            </div>
            <nav class="lesson-nav">
                ${modulesHtml}
            </nav>
        `;
    }
};

// Inicjalizuj przy załadowaniu
if (typeof window !== 'undefined') {
    window.Lessons = Lessons;
    // Inicjalizuj po załadowaniu DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => Lessons.init());
    } else {
        Lessons.init();
    }
}
