class QuizEngine {
    constructor(language = 'ko') {
        this.language = language;
        this.quizData = null;
        this.currentQuestion = 0;
        this.answers = [];
        this.scores = {};
        this.startTime = null;
        this.endTime = null;
        this.isLoaded = false;
    }

    // 퀴즈 데이터 로드
    async loadQuizData(shuffleQuestions = true) {
        try {
            const response = await fetch(`../../assets/data/quiz-${this.language}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load quiz data: ${response.status}`);
            }
            this.quizData = await response.json();
            
            // 질문 순서를 랜덤하게 섞기 (옵션)
            if (shuffleQuestions && this.quizData.questions && Array.isArray(this.quizData.questions)) {
                this.quizData.questions = QuizUtils.shuffleQuestions(this.quizData.questions);
                
                // 각 질문의 답변 선택지도 섞기
                this.quizData.questions.forEach(question => {
                    if (question.answers && Array.isArray(question.answers)) {
                        question.answers = QuizUtils.shuffleAnswers(question.answers);
                    }
                });
            }
            
            this.initializeScores();
            this.isLoaded = true;
            return this.quizData;
        } catch (error) {
            console.error('Error loading quiz data:', error);
            throw error;
        }
    }

    // 점수 초기화
    initializeScores() {
        if (!this.quizData || !this.quizData.types) return;
        
        this.scores = {};
        Object.keys(this.quizData.types).forEach(type => {
            this.scores[type] = 0;
        });
    }

    // 퀴즈 시작
    startQuiz() {
        if (!this.isLoaded) {
            throw new Error('Quiz data not loaded');
        }
        
        this.currentQuestion = 0;
        this.answers = [];
        this.initializeScores();
        this.startTime = new Date();
        
        return this.getCurrentQuestion();
    }

    // 현재 질문 가져오기
    getCurrentQuestion() {
        if (!this.isLoaded || !this.quizData) return null;
        
        if (this.currentQuestion >= this.quizData.questions.length) {
            return null;
        }
        
        return this.quizData.questions[this.currentQuestion];
    }

    // 답변 제출
    submitAnswer(answerLetter) {
        if (!this.isLoaded || !this.quizData) {
            throw new Error('Quiz data not loaded');
        }

        const question = this.getCurrentQuestion();
        if (!question) {
            throw new Error('No current question available');
        }

        const answer = question.answers.find(a => a.letter === answerLetter.toLowerCase());
        if (!answer) {
            throw new Error(`Invalid answer: ${answerLetter}`);
        }

        // 점수 계산
        if (answer.scores) {
            Object.entries(answer.scores).forEach(([type, score]) => {
                if (this.scores.hasOwnProperty(type)) {
                    this.scores[type] += score;
                }
            });
        }

        // 답변 기록
        this.answers.push({
            questionId: question.id,
            answer: answerLetter.toLowerCase(),
            answerText: answer.text,
            scores: answer.scores
        });

        // 다음 질문으로 이동
        this.currentQuestion++;
        
        return {
            isComplete: this.currentQuestion >= this.quizData.questions.length,
            nextQuestion: this.getCurrentQuestion(),
            progress: {
                current: this.currentQuestion,
                total: this.quizData.questions.length,
                percentage: Math.round((this.currentQuestion / this.quizData.questions.length) * 100)
            }
        };
    }

    // 결과 계산
    calculateResult() {
        if (!this.isLoaded || !this.quizData) {
            throw new Error('Quiz data not loaded');
        }

        if (this.currentQuestion < this.quizData.questions.length) {
            throw new Error('Quiz not completed');
        }

        this.endTime = new Date();
        
        // 가장 높은 점수 타입 찾기
        const maxScore = Math.max(...Object.values(this.scores));
        const resultTypes = Object.entries(this.scores)
            .filter(([type, score]) => score === maxScore)
            .map(([type, score]) => type);

        // 동점일 경우 첫 번째 타입 선택 (또는 다른 로직 적용 가능)
        const resultType = resultTypes[0];
        const typeData = this.quizData.types[resultType];

        return {
            type: resultType,
            typeData: typeData,
            scores: { ...this.scores },
            maxScore: maxScore,
            answers: [...this.answers],
            duration: this.endTime - this.startTime,
            totalQuestions: this.quizData.questions.length
        };
    }

    // 진행률 가져오기
    getProgress() {
        if (!this.isLoaded || !this.quizData) return null;
        
        return {
            current: this.currentQuestion,
            total: this.quizData.questions.length,
            percentage: Math.round((this.currentQuestion / this.quizData.questions.length) * 100)
        };
    }

    // 퀴즈 재시작
    resetQuiz() {
        this.currentQuestion = 0;
        this.answers = [];
        this.initializeScores();
        this.startTime = null;
        this.endTime = null;
        
        // 퀴즈 재시작 시 질문 순서를 다시 섞기
        if (this.quizData && this.quizData.questions && Array.isArray(this.quizData.questions)) {
            this.quizData.questions = QuizUtils.shuffleQuestions(this.quizData.questions);
            
            // 각 질문의 답변 선택지도 다시 섞기
            this.quizData.questions.forEach(question => {
                if (question.answers && Array.isArray(question.answers)) {
                    question.answers = QuizUtils.shuffleAnswers(question.answers);
                }
            });
        }
        
        return this.getCurrentQuestion();
    }

    // 이전 질문으로 돌아가기 (선택사항)
    goToPreviousQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            
            // 마지막 답변 제거 및 점수 복구
            if (this.answers.length > 0) {
                const lastAnswer = this.answers.pop();
                if (lastAnswer.scores) {
                    Object.entries(lastAnswer.scores).forEach(([type, score]) => {
                        if (this.scores.hasOwnProperty(type)) {
                            this.scores[type] -= score;
                        }
                    });
                }
            }
            
            return this.getCurrentQuestion();
        }
        return null;
    }

    // 특정 질문으로 이동
    goToQuestion(questionNumber) {
        if (questionNumber >= 0 && questionNumber < this.quizData.questions.length) {
            this.currentQuestion = questionNumber;
            return this.getCurrentQuestion();
        }
        return null;
    }

    // 결과 공유용 URL 생성
    generateShareUrl(result) {
        const baseUrl = window.location.origin;
        const params = new URLSearchParams({
            type: result.type,
            score: result.maxScore,
            lang: this.language
        });
        
        return `${baseUrl}/${this.language}/result/?${params.toString()}`;
    }

    // 결과 저장 (로컬 스토리지)
    saveResult(result) {
        const resultData = {
            ...result,
            timestamp: new Date().toISOString(),
            language: this.language
        };
        
        try {
            const existingResults = JSON.parse(localStorage.getItem('matrixme_results') || '[]');
            existingResults.push(resultData);
            
            // 최대 10개까지만 저장
            if (existingResults.length > 10) {
                existingResults.shift();
            }
            
            localStorage.setItem('matrixme_results', JSON.stringify(existingResults));
        } catch (error) {
            console.error('Error saving result:', error);
        }
    }

    // 저장된 결과 불러오기
    getSavedResults() {
        try {
            return JSON.parse(localStorage.getItem('matrixme_results') || '[]');
        } catch (error) {
            console.error('Error loading saved results:', error);
            return [];
        }
    }

    // 통계 계산
    getStatistics() {
        if (!this.isLoaded || !this.quizData) return null;
        
        const total = this.quizData.questions.length;
        const completed = this.currentQuestion;
        const remaining = total - completed;
        
        return {
            total,
            completed,
            remaining,
            progress: Math.round((completed / total) * 100),
            averageScorePerQuestion: Object.values(this.scores).reduce((a, b) => a + b, 0) / completed || 0
        };
    }

    // 디버그 정보
    getDebugInfo() {
        return {
            language: this.language,
            isLoaded: this.isLoaded,
            currentQuestion: this.currentQuestion,
            totalQuestions: this.quizData?.questions?.length || 0,
            answers: this.answers.length,
            scores: this.scores,
            startTime: this.startTime,
            endTime: this.endTime
        };
    }

    // 언어 변경
    async changeLanguage(newLanguage, preserveQuestionOrder = false) {
        if (newLanguage === this.language) return;
        
        this.language = newLanguage;
        this.isLoaded = false;
        // 언어 토글 시에는 질문 순서를 섞지 않음
        await this.loadQuizData(!preserveQuestionOrder);
        
        if (!preserveQuestionOrder) {
            this.resetQuiz();
        }
    }

    // 답변 유효성 검사
    validateAnswer(answerLetter) {
        const question = this.getCurrentQuestion();
        if (!question) return false;
        
        return question.answers.some(a => a.letter === answerLetter.toLowerCase());
    }

    // 퀴즈 데이터 유효성 검사
    validateQuizData() {
        if (!this.quizData) return false;
        
        // 필수 필드 검사
        const requiredFields = ['language', 'title', 'questions', 'types'];
        if (!requiredFields.every(field => this.quizData.hasOwnProperty(field))) {
            return false;
        }
        
        // 질문 구조 검사
        if (!Array.isArray(this.quizData.questions) || this.quizData.questions.length === 0) {
            return false;
        }
        
        // 타입 구조 검사
        if (typeof this.quizData.types !== 'object' || Object.keys(this.quizData.types).length === 0) {
            return false;
        }
        
        return true;
    }

    // 에러 핸들링
    handleError(error) {
        console.error('QuizEngine Error:', error);
        
        // 사용자에게 표시할 에러 메시지 생성
        let userMessage = 'An error occurred while processing the quiz.';
        
        if (this.language === 'ko') {
            userMessage = '퀴즈 처리 중 오류가 발생했습니다.';
        }
        
        return {
            error: true,
            message: userMessage,
            details: error.message
        };
    }
}

// 전역 QuizEngine 클래스
window.QuizEngine = QuizEngine;

// 퀴즈 유틸리티 함수들
const QuizUtils = {
    // 시간 포맷팅
    formatDuration(milliseconds) {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        
        if (minutes > 0) {
            return `${minutes}분 ${remainingSeconds}초`;
        }
        return `${remainingSeconds}초`;
    },

    // 점수 백분율 계산
    calculatePercentage(score, maxPossibleScore) {
        if (maxPossibleScore === 0) return 0;
        return Math.round((score / maxPossibleScore) * 100);
    },

    // 랜덤 질문 순서 생성
    shuffleQuestions(questions) {
        const shuffled = [...questions];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },

    // 랜덤 답변 순서 생성 (A, B, C, D, E 순서를 유지하면서 내용만 섞기)
    shuffleAnswers(answers) {
        if (!answers || !Array.isArray(answers)) return answers;
        
        // 답변 내용과 점수를 분리하여 섞기
        const answerContents = answers.map(answer => ({
            text: answer.text,
            scores: answer.scores
        }));
        
        // 내용 섞기
        const shuffledContents = [...answerContents];
        for (let i = shuffledContents.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledContents[i], shuffledContents[j]] = [shuffledContents[j], shuffledContents[i]];
        }
        
        // A, B, C, D, E 레터는 유지하고 내용만 섞인 것으로 교체
        return answers.map((answer, index) => ({
            letter: answer.letter, // 레터는 그대로 유지
            text: shuffledContents[index].text,
            scores: shuffledContents[index].scores
        }));
    },

    // 답변 분석
    analyzeAnswers(answers) {
        const letterCounts = {};
        const sectionCounts = {};
        
        answers.forEach(answer => {
            letterCounts[answer.answer] = (letterCounts[answer.answer] || 0) + 1;
        });
        
        return {
            letterCounts,
            sectionCounts,
            totalAnswers: answers.length
        };
    },

    // 결과 요약 생성
    generateSummary(result, language = 'ko') {
        const { type, typeData, scores, maxScore, totalQuestions } = result;
        
        const summary = {
            type: type,
            name: typeData.name,
            description: typeData.description,
            score: maxScore,
            color: typeData.color,
            percentage: Math.round((maxScore / (totalQuestions * 3)) * 100) // 최대 점수 3점 기준
        };
        
        return summary;
    }
};

window.QuizUtils = QuizUtils;