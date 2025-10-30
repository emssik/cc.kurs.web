/**
 * Quiz - Obsługa testów i quizów
 * Test wstępny i testy końcowe
 */

const Quiz = {
    currentQuiz: null,
    currentQuestionIndex: 0,
    answers: {},

    /**
     * Wczytuje pytania testu z pliku JSON
     * @param {string} testType - Typ testu ('initial-test' lub 'final-tests')
     * @returns {Promise<Object>} Dane testu
     */
    async loadQuestions(testType) {
        try {
            const response = await fetch(`content/data/${testType}.json`);

            if (!response.ok) {
                throw new Error(`Failed to load test: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error loading test:', error);
            throw error;
        }
    },

    /**
     * Rozpoczyna test
     * @param {string} testType - Typ testu
     */
    async startTest(testType) {
        try {
            const quizData = await this.loadQuestions(testType);
            this.currentQuiz = quizData;
            this.currentQuestionIndex = 0;
            this.answers = {};

            this.renderQuestion();
        } catch (error) {
            console.error('Error starting test:', error);
            alert('Nie udało się wczytać testu. Spróbuj ponownie później.');
        }
    },

    /**
     * Renderuje aktualne pytanie
     */
    renderQuestion() {
        if (!this.currentQuiz || !this.currentQuiz.questions) {
            console.error('No quiz loaded');
            return;
        }

        const questions = this.currentQuiz.questions;
        const currentQuestion = questions[this.currentQuestionIndex];

        if (!currentQuestion) {
            // Koniec testu
            this.finishTest();
            return;
        }

        const contentContainer = document.getElementById('content');

        const html = `
            <div class="quiz-container">
                <div class="quiz-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${((this.currentQuestionIndex + 1) / questions.length) * 100}%"></div>
                    </div>
                    <span class="progress-text">Pytanie ${this.currentQuestionIndex + 1} z ${questions.length}</span>
                </div>

                <div class="question-container">
                    <h2 class="question-text">${currentQuestion.question}</h2>

                    <div class="options-container">
                        ${currentQuestion.options.map(option => `
                            <label class="option-label">
                                <input
                                    type="radio"
                                    name="answer"
                                    value="${option.id}"
                                    ${this.answers[currentQuestion.id] === option.id ? 'checked' : ''}
                                    onchange="Quiz.selectAnswer('${currentQuestion.id}', '${option.id}')"
                                >
                                <span class="option-text">${option.text}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>

                <div class="quiz-navigation">
                    ${this.currentQuestionIndex > 0 ? `
                        <button class="btn btn-secondary" onclick="Quiz.previousQuestion()">
                            ← Poprzednie
                        </button>
                    ` : '<div></div>'}

                    ${this.currentQuestionIndex < questions.length - 1 ? `
                        <button class="btn btn-primary" onclick="Quiz.nextQuestion()">
                            Następne →
                        </button>
                    ` : `
                        <button class="btn btn-primary" onclick="Quiz.finishTest()">
                            Zakończ test
                        </button>
                    `}
                </div>
            </div>
        `;

        contentContainer.innerHTML = html;
    },

    /**
     * Zapisuje odpowiedź użytkownika
     * @param {string} questionId - ID pytania
     * @param {string} answerId - ID odpowiedzi
     */
    selectAnswer(questionId, answerId) {
        this.answers[questionId] = answerId;
    },

    /**
     * Przechodzi do następnego pytania
     */
    nextQuestion() {
        if (this.currentQuestionIndex < this.currentQuiz.questions.length - 1) {
            this.currentQuestionIndex++;
            this.renderQuestion();
        }
    },

    /**
     * Wraca do poprzedniego pytania
     */
    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.renderQuestion();
        }
    },

    /**
     * Kończy test i oblicza wynik
     */
    finishTest() {
        if (!this.currentQuiz) {
            console.error('No quiz loaded');
            return;
        }

        // Sprawdź czy wszystkie pytania mają odpowiedzi
        const unansweredCount = this.currentQuiz.questions.filter(
            q => !this.answers[q.id]
        ).length;

        if (unansweredCount > 0) {
            if (!confirm(`Nie odpowiedziałeś na ${unansweredCount} pytań. Czy na pewno chcesz zakończyć test?`)) {
                return;
            }
        }

        // Oblicz wynik
        const result = this.calculateScore();

        // Zapisz wynik
        this.saveTestResult(result);

        // Przekieruj do widoku wyniku
        if (typeof Router !== 'undefined') {
            Router.navigateTo('/test/result');
        }
    },

    /**
     * Oblicza wynik testu
     * @returns {Object} Wynik testu { score, path }
     */
    calculateScore() {
        let totalPoints = 0;
        let maxPoints = 0;

        this.currentQuiz.questions.forEach(question => {
            // Znajdź maksymalną liczbę punktów dla pytania
            const maxQuestionPoints = Math.max(...question.options.map(o => o.points || 0));
            maxPoints += maxQuestionPoints;

            // Dodaj punkty za wybraną odpowiedź
            const selectedAnswerId = this.answers[question.id];
            if (selectedAnswerId) {
                const selectedOption = question.options.find(o => o.id === selectedAnswerId);
                if (selectedOption) {
                    totalPoints += selectedOption.points || 0;
                }
            }
        });

        // Oblicz procent
        const percentage = maxPoints > 0 ? Math.round((totalPoints / maxPoints) * 100) : 0;

        // Określ ścieżkę na podstawie progu
        let path = 'beginner';
        if (this.currentQuiz.thresholds) {
            if (percentage >= this.currentQuiz.thresholds.advanced.min) {
                path = 'advanced';
            } else if (percentage >= this.currentQuiz.thresholds.intermediate.min) {
                path = 'intermediate';
            }
        }

        return {
            score: percentage,
            path: path,
            totalPoints: totalPoints,
            maxPoints: maxPoints
        };
    },

    /**
     * Zapisuje wynik testu do Storage
     * @param {Object} result - Wynik testu
     */
    saveTestResult(result) {
        const progress = Storage.loadProgress() || Storage.getDefaultState();

        progress.initialTestScore = result.score;
        progress.initialTestCompleted = true;
        progress.initialTestAnswers = this.answers;
        progress.currentPath = result.path;

        Storage.saveProgress(progress);
    }
};

// Eksportuj Quiz jako globalny obiekt
if (typeof window !== 'undefined') {
    window.Quiz = Quiz;
}
