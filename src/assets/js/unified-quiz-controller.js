/**
 * Matrix Me - 통합 퀴즈 컨트롤러
 * 4축 시스템 + 한글 재미버전 + 상태 관리 통합
 */

class UnifiedQuizController {
    constructor(language = 'ko') {
        this.language = language;
        
        // 새로운 컴포넌트들
        this.fourAxisEngine = new FourAxisEngine();
        this.koreanMapping = new KoreanTypeMapping();
        this.stateManager = new QuizStateManager();
        
        // 상태 관리자에 엔진 설정
        this.stateManager.setEngines(this.fourAxisEngine, this.koreanMapping);
        
        // 퀴즈 데이터
        this.quizData = null;
        
        // 진행 상태
        this.currentQuestion = 0;
        this.answers = [];
        this.isStarted = false;
        this.isCompleted = false;
        
        // UI 관련
        this.terminal = null;
        this.typing = null;
    }

    /**
     * 초기화
     */
    async initialize() {
        try {
            console.log('UnifiedQuizController 초기화 시작');
            
            // 1. 퀴즈 데이터 로드
            console.log('퀴즈 데이터 로드 시작');
            await this.loadQuizData();
            console.log('퀴즈 데이터 로드 완료:', this.systemType);
            
            // 2. 상태 복원 확인
            console.log('상태 복원 확인');
            const urlState = this.stateManager.restoreFromUrlParams();
            const savedState = this.stateManager.loadSavedState();
            const hasRestoreState = urlState || (savedState && savedState.language === this.language);
            
            // 3. 항상 로딩 화면 표시 (한국어 페이지와 동일)
            console.log('로딩 화면 표시');
            await this.showLoadingScreen(hasRestoreState);
            
            // 4. 상태 복원 또는 정상 시작
            if (urlState) {
                console.log('URL 상태 발견, 복원 시작:', urlState);
                await this.restoreFromState(urlState);
            } else if (savedState && savedState.language === this.language) {
                console.log('저장된 상태 발견, 복원 시작:', savedState);
                await this.restoreFromState(savedState);
            }
            console.log('초기화 완료');
            
        } catch (error) {
            console.error('Quiz initialization error:', error);
            console.error('스택 트레이스:', error.stack);
            this.showError('퀴즈 초기화 중 오류가 발생했습니다.');
        }
    }

    /**
     * 퀴즈 데이터 로드 (4축 시스템)
     */
    async loadQuizData() {
        try {
            const response = await fetch(`../../assets/data/quiz-${this.language}-fouraxis.json`);
            if (!response.ok) {
                // 4축 데이터가 없으면 기존 데이터 사용
                const fallbackResponse = await fetch(`../../assets/data/quiz-${this.language}.json`);
                if (!fallbackResponse.ok) {
                    throw new Error(`Failed to load quiz data: ${response.status}`);
                }
                this.quizData = await fallbackResponse.json();
                this.systemType = 'legacy';
            } else {
                this.quizData = await response.json();
                this.systemType = 'four-axis';
                
                // 4축 시스템에서 퀴즈 랜덤화
                this.randomizeQuiz();
            }
            
            console.log(`Quiz data loaded: ${this.systemType} system`);
            return this.quizData;
        } catch (error) {
            console.error('Error loading quiz data:', error);
            throw error;
        }
    }

    /**
     * 퀴즈 완전 랜덤화 (질문 순서 + 보기 순서)
     */
    randomizeQuiz() {
        if (!this.quizData || !this.quizData.questions) return;
        
        console.log('퀴즈 랜덤화 시작...');
        
        // 1. 질문 순서 완전 랜덤 섞기
        this.quizData.questions = this.shuffleArray([...this.quizData.questions]);
        
        // 2. 각 질문의 보기 순서도 랜덤 섞기 (라벨은 A,B,C,D,E 고정, 내용만 섞기)
        this.quizData.questions.forEach((question, index) => {
            if (question.answers && question.answers.length > 0) {
                // 원본 보기 순서 보존 (점수 계산용)
                question.originalAnswers = [...question.answers];
                
                // 답변 내용들만 추출하여 섞기
                const answersContent = question.answers.map(answer => ({
                    text: answer.text,
                    scores: answer.scores
                }));
                const shuffledContent = this.shuffleArray([...answersContent]);
                
                // 고정된 라벨(a,b,c,d,e)에 섞인 내용 매핑
                const labels = ['a', 'b', 'c', 'd', 'e'];
                question.answers = shuffledContent.map((content, i) => ({
                    letter: labels[i],
                    text: content.text,
                    scores: content.scores
                }));
                
                console.log(`Q${index + 1} (${question.axis}축): 보기 내용 섞기 완료 (라벨 A-E 고정)`);
            }
        });
        
        console.log('퀴즈 랜덤화 완료!', {
            totalQuestions: this.quizData.questions.length,
            axisDistribution: this.getAxisDistribution(),
            questionOrder: this.quizData.questions.map((q, i) => `Q${i+1}:${q.axis}축`)
        });
    }

    /**
     * 배열 랜덤 섞기 (Fisher-Yates 알고리즘)
     */
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    /**
     * 축별 질문 분포 확인 (디버그용)
     */
    getAxisDistribution() {
        if (!this.quizData || !this.quizData.questions) return {};
        
        const distribution = { D: 0, E: 0, T: 0, C: 0 };
        this.quizData.questions.forEach(question => {
            if (question.axis && distribution.hasOwnProperty(question.axis)) {
                distribution[question.axis]++;
            }
        });
        return distribution;
    }

    /**
     * 저장된 상태에서 복원
     */
    async restoreFromState(state) {
        try {
            this.currentQuestion = state.currentQuestion || 0;
            this.answers = state.answers || [];
            this.isStarted = state.isStarted || false;
            
            if (this.isStarted && this.currentQuestion > 0) {
                // 퀴즈 진행 중이었다면 해당 화면으로
                await this.showQuizScreen();
                this.displayCurrentQuestion();
            } else {
                // 시작 전이었다면 시작 화면으로
                await this.showStartScreen();
            }
            
            console.log('Quiz state restored:', {
                currentQuestion: this.currentQuestion,
                answersCount: this.answers.length,
                isStarted: this.isStarted
            });
            
        } catch (error) {
            console.error('State restoration error:', error);
            await this.showStartScreen();
        }
    }

    /**
     * 로딩 화면 표시
     */
    async showLoadingScreen(isRestoreMode = false) {
        try {
            console.log('showLoadingScreen 시작');
            this.currentScreen = 'loading';
            
            // 로딩 화면 표시
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.style.display = 'block';
                console.log('로딩 화면 표시됨');
            } else {
                console.error('loading-screen 요소를 찾을 수 없음');
            }
            
            // 다른 화면 숨기기
            const screensToHide = ['quiz-start', 'quiz-progress', 'quiz-analyzing', 'error-screen'];
            screensToHide.forEach(screenId => {
                const element = document.getElementById(screenId);
                if (element) {
                    element.style.display = 'none';
                } else {
                    console.warn(`${screenId} 요소를 찾을 수 없음`);
                }
            });
            
            // 메인 로딩 애니메이션 실행
            console.log('로딩 애니메이션 시작');
            await this.animateMainLoading();
            console.log('로딩 애니메이션 완료');
            
            // 상태 복원 모드가 아닐 때만 시작 화면으로 이동
            if (!isRestoreMode) {
                console.log('시작 화면으로 이동');
                await this.showStartScreen();
            }
            console.log('showLoadingScreen 완료');
            
        } catch (error) {
            console.error('showLoadingScreen 오류:', error);
            // 오류 발생 시 시작 화면으로 바로 이동
            await this.showStartScreen();
        }
    }

    /**
     * 메인 로딩 애니메이션
     */
    async animateMainLoading() {
        const progressElement = document.getElementById('main-loading-progress');
        const percentElement = document.getElementById('main-progress-percent');
        const completionText = document.getElementById('main-completion-text');
        
        if (!progressElement || !percentElement) {
            // 로딩 요소가 없으면 간단히 대기
            await this.sleep(2000);
            return;
        }
        
        const steps = [
            { progress: '░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░', percent: 0, delay: 0 },
            { progress: '██████░░░░░░░░░░░░░░░░░░░░░░░░░░░', percent: 20, delay: 500 },
            { progress: '█████████████░░░░░░░░░░░░░░░░░░░░', percent: 40, delay: 1000 },
            { progress: '███████████████████░░░░░░░░░░░░░░', percent: 60, delay: 1500 },
            { progress: '██████████████████████████░░░░░░░', percent: 80, delay: 2000 },
            { progress: '█████████████████████████████████', percent: 100, delay: 2500 }
        ];
        
        for (const step of steps) {
            await this.sleep(step.delay === 0 ? 100 : 500);
            progressElement.textContent = step.progress;
            percentElement.textContent = step.percent;
        }
        
        // 100% 완료 후 0.5초 뒤에 완료 메시지 표시
        await this.sleep(500);
        if (completionText) {
            completionText.style.display = 'block';
        }
        
        // 추가 0.5초 대기
        await this.sleep(500);
    }

    /**
     * 시작 화면 표시
     */
    async showStartScreen() {
        try {
            console.log('showStartScreen 시작');
            this.currentScreen = 'start';
            
            const loadingScreen = document.getElementById('loading-screen');
            const startScreen = document.getElementById('quiz-start');
            
            if (loadingScreen) {
                loadingScreen.style.display = 'none';
                console.log('로딩 화면 숨김');
            }
            
            if (startScreen) {
                startScreen.style.display = 'block';
                console.log('시작 화면 표시');
            } else {
                console.error('quiz-start 요소를 찾을 수 없음');
            }
            
            this.setupEventListeners();
            console.log('이벤트 리스너 설정 완료');
            console.log('showStartScreen 완료');
            
        } catch (error) {
            console.error('showStartScreen 오류:', error);
        }
    }

    /**
     * 퀴즈 시작
     */
    async startQuiz() {
        if (this.isProcessing) return;
        this.isProcessing = true;
        
        // 시작 입력 표시
        const startInput = document.getElementById('start-input');
        if (startInput) {
            startInput.textContent = 'start';
            await this.sleep(500);
            startInput.textContent = '퀴즈 시작 중...';
            await this.sleep(1000);
        }
        
        this.isStarted = true;
        this.currentQuestion = 0;
        this.answers = [];
        this.selectedAnswer = null;
        
        // 상태 저장
        this.saveCurrentState();
        
        await this.showQuizScreen();
        this.isProcessing = false;
    }

    /**
     * 퀴즈 화면 표시
     */
    async showQuizScreen() {
        this.currentScreen = 'quiz';
        document.getElementById('quiz-start').style.display = 'none';
        document.getElementById('quiz-progress').style.display = 'block';
        
        await this.displayCurrentQuestion();
        this.setupEventListeners();
    }

    /**
     * 현재 질문 표시
     */
    async displayCurrentQuestion() {
        if (this.currentQuestion >= this.quizData.questions.length) {
            await this.completeQuiz();
            return;
        }

        const question = this.quizData.questions[this.currentQuestion];
        
        // 진행률 업데이트
        const progress = this.stateManager.calculateProgress(this.currentQuestion);
        this.updateProgressDisplay(progress);
        
        // 질문 표시
        this.updateQuestionDisplay(question);
        
        // 답변 옵션 표시
        this.updateAnswerOptions(question.answers);
        
        // 상태 저장
        this.saveCurrentState();
    }

    /**
     * 답변 제출
     */
    async submitAnswer(answerLetter) {
        if (this.isProcessing || !answerLetter) return;
        this.isProcessing = true;
        
        try {
            const question = this.quizData.questions[this.currentQuestion];
            const answer = question.answers.find(a => a.letter === answerLetter.toLowerCase());
            
            if (!answer) {
                console.error('Invalid answer:', answerLetter);
                return;
            }

            // 답변 저장 (축 정보 포함)
            this.answers[this.currentQuestion] = {
                questionId: question.id,
                letter: answerLetter.toLowerCase(),
                scores: answer.scores,
                text: answer.text,
                axis: question.axis
            };

            // 해당 축의 점수 추출
            const axisScore = answer.scores[question.axis];
            console.log(`답변 저장 완료: Q${this.currentQuestion + 1} (${question.axis}축) - ${answerLetter.toUpperCase()} (${axisScore}점)`);

            // 답변 확인 표시
            const inputText = document.getElementById('matrix-input-text');
            if (inputText) {
                inputText.textContent = this.language === 'ko' ? '답변 저장 중...' : 'Saving answer...';
            }
            
            const nextBtn = document.getElementById('matrix-next-btn');
            if (nextBtn) {
                nextBtn.disabled = true;
                nextBtn.classList.remove('show');
            }
            
            await this.sleep(800);

            // 다음 질문으로
            this.currentQuestion++;
            
            // 상태 저장
            this.saveCurrentState();
            
            // 화면 업데이트
            await this.displayCurrentQuestion();
            
        } catch (error) {
            console.error('Answer submission error:', error);
            this.showError('답변 처리 중 오류가 발생했습니다.');
        }
        
        this.isProcessing = false;
    }

    /**
     * 퀴즈 완료
     */
    async completeQuiz() {
        this.isCompleted = true;
        
        // 결과 계산
        const result = this.calculateResult();
        
        // 최종 결과 저장
        this.stateManager.saveFinalResult(result);
        
        // Firebase에 결과 저장하고 공유 ID 생성 (ES6 import 방식)
        let shareId = null;
        try {
            console.log('🔍 Firebase 서비스 import 확인');
            const { firebaseService } = await import('/assets/js/firebase-service.js');
            
            if (firebaseService && typeof firebaseService.saveQuizResult === 'function') {
                console.log('🔥 Firebase 저장 시작...');
                shareId = await firebaseService.saveQuizResult(result);
                console.log('🔥 Firebase에 결과 저장 완료. Share ID:', shareId);
                
                // sessionStorage에 shareId 저장하여 result/share 페이지에서 사용 가능하게 함
                if (shareId) {
                    sessionStorage.setItem('matrixme-shareId', shareId);
                    console.log('🎯 ShareId를 sessionStorage에 저장:', shareId);
                }
            } else {
                console.warn('⚠️ Firebase 서비스 또는 saveQuizResult 함수를 찾을 수 없습니다');
            }
        } catch (error) {
            console.error('❌ Firebase 저장 실패:', error);
        }
        
        // 결과 화면으로 이동 (새로운 공유 ID 우선, 실패시 기존 방식)
        const resultUrl = this.generateResultUrl(result, shareId);
        console.log('🎯 퀴즈 완료 - 결과 URL:', resultUrl);
        console.log('🎯 최종 결과 데이터:', result);
        window.location.href = resultUrl;
    }

    /**
     * 결과 계산 (4축 시스템 또는 기존 시스템)
     */
    calculateResult() {
        console.log('🔍 결과 계산 시작 - systemType:', this.systemType);
        console.log('🔍 답변 개수:', this.answers.length);
        console.log('🔍 답변 데이터:', this.answers);
        
        if (this.systemType === 'four-axis') {
            console.log('✅ 4축 시스템으로 계산');
            return this.calculateFourAxisResult();
        } else {
            console.log('⚠️ 레거시 시스템으로 계산');
            return this.calculateLegacyResult();
        }
    }

    /**
     * 4축 시스템 결과 계산
     */
    calculateFourAxisResult() {
        console.log('🔍 4축 결과 계산 시작');
        console.log('🔍 fourAxisEngine 존재 여부:', !!this.fourAxisEngine);
        console.log('🔍 전달할 답변 데이터:', this.answers);
        
        // 4축 점수 계산
        const analysis = this.fourAxisEngine.analyzeAnswers(this.answers);
        
        console.log('🔍 4축 분석 결과:', analysis);
        
        if (!analysis.success) {
            console.error('❌ 4축 분석 실패:', analysis.error);
            throw new Error('4축 분석 실패: ' + analysis.error);
        }

        console.log('🎯 4축 분석 결과:', {
            scores: analysis.scores,
            typeCode: analysis.typeCode,
            breakdown: analysis.breakdown,
            answersUsed: this.answers.length
        });

        // 타입 코드로 한글 정보 가져오기
        const typeInfo = this.koreanMapping.getTypeInfo(analysis.typeCode);
        
        if (!typeInfo) {
            throw new Error('타입 정보를 찾을 수 없습니다: ' + analysis.typeCode);
        }

        return {
            systemType: 'four-axis',
            typeCode: analysis.typeCode,
            scores: analysis.scores,
            breakdown: analysis.breakdown,
            
            // 한글 재미버전 정보
            koreanName: typeInfo.koreanName,
            nickname: typeInfo.nickname,
            description: typeInfo.description,
            rarity: typeInfo.rarity,
            rarityLevel: typeInfo.rarityLevel,
            traits: typeInfo.traits,
            strengths: typeInfo.strengths,
            weaknesses: typeInfo.weaknesses,
            
            // 기존 호환성
            type: typeInfo.code,
            name: typeInfo.koreanName,
            maxScore: Math.max(analysis.scores.D, analysis.scores.E, analysis.scores.T, analysis.scores.C),
            
            // 메타데이터
            answers: this.answers,
            language: this.language,
            completedAt: new Date().toISOString(),
            totalQuestions: this.quizData.questions.length
        };
    }

    /**
     * 기존 시스템 결과 계산 (하위 호환성)
     */
    calculateLegacyResult() {
        // 기존 QuizEngine 로직 사용
        const scores = {};
        
        this.answers.forEach(answer => {
            if (answer.scores) {
                Object.entries(answer.scores).forEach(([type, score]) => {
                    scores[type] = (scores[type] || 0) + score;
                });
            }
        });

        const maxScore = Math.max(...Object.values(scores));
        const resultType = Object.entries(scores)
            .filter(([type, score]) => score === maxScore)
            .map(([type, score]) => type)[0];

        return {
            systemType: 'legacy',
            type: resultType,
            scores: scores,
            maxScore: maxScore,
            answers: this.answers,
            language: this.language,
            completedAt: new Date().toISOString(),
            totalQuestions: this.quizData.questions.length
        };
    }

    /**
     * 결과 URL 생성
     */
    generateResultUrl(result, shareId = null) {
        // 개발 환경에서는 파라미터 방식 사용 (Vite SPA 라우팅 제한)
        // 공유 기능에서만 클린 URL 생성하여 실용성 확보
        if (shareId) {
            console.log('🎯 ShareId 생성됨:', shareId, '(공유용 클린 URL에서 사용)');
        }
        
        // 결과 페이지는 안정적인 파라미터 방식 사용
        const baseUrl = `/${this.language}/result/`;
        const params = new URLSearchParams();
        
        if (result.systemType === 'four-axis') {
            // 4축 개별 점수 전달 (Firebase 저장용)
            params.set('D', result.scores.D.toString());
            params.set('E', result.scores.E.toString());
            params.set('T', result.scores.T.toString());
            params.set('C', result.scores.C.toString());
            
            // 기존 호환성 유지
            params.set('type', result.typeCode);
            params.set('korean', result.koreanName);
        } else {
            params.set('type', result.type);
        }
        
        params.set('score', result.maxScore.toString());
        
        return baseUrl + '?' + params.toString();
    }

    /**
     * 현재 상태 저장
     */
    saveCurrentState() {
        this.stateManager.saveCurrentState({
            currentQuestion: this.currentQuestion,
            answers: this.answers,
            isStarted: this.isStarted,
            language: this.language
        });
    }

    /**
     * 언어 토글 URL 생성
     */
    generateLanguageToggleUrl() {
        const currentState = {
            currentQuestion: this.currentQuestion,
            answers: this.answers,
            isStarted: this.isStarted
        };
        
        console.log('언어 토글 URL 생성:', {
            language: this.language,
            currentState: currentState
        });
        
        const url = this.stateManager.generateLanguageToggleUrl(this.language, currentState);
        console.log('생성된 URL:', url);
        
        return url;
    }

    /**
     * 진행률 표시 업데이트
     */
    updateProgressDisplay(progress) {
        // DOM 업데이트 로직
        const progressElement = document.getElementById('matrix-progress-text');
        if (progressElement) {
            progressElement.textContent = `${progress.percentage}% [${progress.current + 1}/${progress.total}]`;
        }
        
        const progressFill = document.getElementById('matrix-progress-fill');
        if (progressFill) {
            progressFill.style.setProperty('--progress-width', `${progress.percentage}%`);
        }

        const questionNumber = document.getElementById('question-number');
        if (questionNumber) {
            questionNumber.textContent = progress.current + 1;
        }
    }

    /**
     * 질문 표시 업데이트
     */
    updateQuestionDisplay(question) {
        const questionText = document.getElementById('question-text');
        if (questionText) {
            questionText.textContent = question.question;
        }
    }

    /**
     * 답변 옵션 업데이트
     */
    updateAnswerOptions(answers) {
        const optionsContainer = document.getElementById('answer-options');
        if (!optionsContainer) return;
        
        optionsContainer.innerHTML = '';
        
        answers.forEach((answer) => {
            const option = document.createElement('div');
            option.className = 'quiz-option';
            option.dataset.letter = answer.letter;
            option.innerHTML = `
                <span class="option-letter">${answer.letter.toUpperCase()})</span>
                <span class="option-content">${answer.text}</span>
            `;
            optionsContainer.appendChild(option);
        });
    }

    /**
     * 이벤트 리스너 설정
     */
    setupEventListeners() {
        // 기존 이벤트 리스너 제거하여 중복 방지
        this.removeEventListeners();
        
        // 키보드 이벤트
        this.keydownHandler = (e) => {
            if (this.isProcessing) return;
            
            const key = e.key.toLowerCase();
            
            if (this.currentScreen === 'start') {
                if (key === 'enter') {
                    this.startQuiz();
                } else if (key === 'escape') {
                    window.location.href = '/';
                }
            } else if (this.currentScreen === 'quiz') {
                if (['a', 'b', 'c', 'd', 'e'].includes(key)) {
                    this.selectAnswer(key);
                } else if (key === 'enter' && this.selectedAnswer) {
                    this.submitAnswer(this.selectedAnswer);
                } else if (key === 'escape') {
                    this.goBack();
                }
            }
        };
        
        // 마우스 클릭 이벤트
        this.clickHandler = (e) => {
            if (this.isProcessing) return;
            
            const option = e.target.closest('.quiz-option');
            const nextBtn = e.target.closest('.matrix-next-button');
            
            if (option) {
                const action = option.dataset.action;
                const letter = option.dataset.letter;
                
                if (action === 'start') {
                    this.startQuiz();
                } else if (action === 'back') {
                    window.location.href = '/';
                } else if (letter) {
                    this.selectAnswer(letter);
                }
            } else if (nextBtn && !nextBtn.disabled) {
                this.submitAnswer(this.selectedAnswer);
            }
        };
        
        document.addEventListener('keydown', this.keydownHandler);
        document.addEventListener('click', this.clickHandler);
    }
    
    /**
     * 이벤트 리스너 제거
     */
    removeEventListeners() {
        if (this.keydownHandler) {
            document.removeEventListener('keydown', this.keydownHandler);
        }
        if (this.clickHandler) {
            document.removeEventListener('click', this.clickHandler);
        }
    }

    /**
     * 답변 선택
     */
    selectAnswer(letter) {
        if (this.isProcessing) return;
        
        // 기존 선택 해제
        document.querySelectorAll('.quiz-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // 새로운 선택
        const selectedOption = document.querySelector(`[data-letter="${letter}"]`);
        if (selectedOption) {
            selectedOption.classList.add('selected');
            this.selectedAnswer = letter;
            
            const inputText = document.getElementById('matrix-input-text');
            if (inputText) {
                inputText.textContent = letter.toUpperCase() + ' _';
            }
            
            const nextBtn = document.getElementById('matrix-next-btn');
            if (nextBtn) {
                nextBtn.disabled = false;
                nextBtn.style.removeProperty('display');
                nextBtn.style.removeProperty('visibility');
                nextBtn.style.removeProperty('opacity');
                nextBtn.classList.add('show');
            }
        }
    }

    /**
     * 뒤로 가기
     */
    goBack() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.displayCurrentQuestion();
        } else {
            window.location.href = '/';
        }
    }

    /**
     * 에러 화면 표시
     */
    showError(message) {
        console.error('Quiz error:', message);
        // 에러 화면 표시 로직
    }

    /**
     * 유틸리티: 슬립
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * 디버그 정보
     */
    getDebugInfo() {
        return {
            systemType: this.systemType,
            language: this.language,
            currentQuestion: this.currentQuestion,
            answersCount: this.answers.length,
            isStarted: this.isStarted,
            isCompleted: this.isCompleted,
            hasQuizData: !!this.quizData,
            stateManager: this.stateManager.getDebugInfo()
        };
    }
}

// 전역에서 사용 가능하도록 등록
window.UnifiedQuizController = UnifiedQuizController;

export default UnifiedQuizController;