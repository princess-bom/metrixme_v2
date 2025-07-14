/**
 * Matrix Me - 퀴즈 상태 관리 컴포넌트
 * 언어 토글 시 상태 유지 및 4축 점수 기반 상태 전달
 */

class QuizStateManager {
    constructor() {
        this.storageKey = 'matrixme_quiz_state';
        this.fourAxisEngine = null; // FourAxisEngine 인스턴스
        this.koreanMapping = null; // KoreanTypeMapping 인스턴스
    }

    /**
     * 엔진 인스턴스 설정
     */
    setEngines(fourAxisEngine, koreanMapping) {
        this.fourAxisEngine = fourAxisEngine;
        this.koreanMapping = koreanMapping;
    }

    /**
     * 현재 퀴즈 상태 저장
     */
    saveCurrentState(quizData) {
        try {
            const state = {
                currentQuestion: quizData.currentQuestion || 0,
                answers: quizData.answers || [],
                isStarted: quizData.isStarted || false,
                language: quizData.language || 'ko',
                timestamp: new Date().toISOString(),
                
                // 4축 점수 계산 (현재까지의 답변으로)
                axisScores: this.calculateCurrentAxisScores(quizData.answers || [])
            };

            sessionStorage.setItem(this.storageKey, JSON.stringify(state));
            return true;
        } catch (error) {
            console.error('Failed to save quiz state:', error);
            return false;
        }
    }

    /**
     * 저장된 상태 불러오기
     */
    loadSavedState() {
        try {
            const saved = sessionStorage.getItem(this.storageKey);
            if (!saved) return null;

            const state = JSON.parse(saved);
            
            // 타임스탬프 체크 (24시간 이내만 유효)
            const saveTime = new Date(state.timestamp);
            const now = new Date();
            const hoursDiff = (now - saveTime) / (1000 * 60 * 60);
            
            if (hoursDiff > 24) {
                this.clearSavedState();
                return null;
            }

            return state;
        } catch (error) {
            console.error('Failed to load quiz state:', error);
            return null;
        }
    }

    /**
     * 저장된 상태 삭제
     */
    clearSavedState() {
        sessionStorage.removeItem(this.storageKey);
    }

    /**
     * 현재까지의 답변으로 4축 점수 계산
     */
    calculateCurrentAxisScores(answers) {
        if (!this.fourAxisEngine || !answers || answers.length === 0) {
            return { D: 0, E: 0, T: 0, C: 0 };
        }

        // 각 축별로 현재까지 답변된 문항들의 점수 계산
        const dAnswers = answers.slice(0, 5).filter(a => a !== null && a !== undefined);
        const eAnswers = answers.slice(5, 10).filter(a => a !== null && a !== undefined);
        const tAnswers = answers.slice(10, 15).filter(a => a !== null && a !== undefined);
        const cAnswers = answers.slice(15, 20).filter(a => a !== null && a !== undefined);

        return {
            D: dAnswers.reduce((sum, answer) => sum + this.fourAxisEngine.getAnswerValue(answer), 0),
            E: eAnswers.reduce((sum, answer) => sum + this.fourAxisEngine.getAnswerValue(answer), 0),
            T: tAnswers.reduce((sum, answer) => sum + this.fourAxisEngine.getAnswerValue(answer), 0),
            C: cAnswers.reduce((sum, answer) => sum + this.fourAxisEngine.getAnswerValue(answer), 0)
        };
    }

    /**
     * 언어 토글용 URL 생성
     */
    generateLanguageToggleUrl(currentLanguage, quizData) {
        const targetLanguage = currentLanguage === 'ko' ? 'en' : 'ko';
        const baseUrl = `/${targetLanguage}/quiz/`;

        console.log('언어 토글 URL 생성 - 입력 데이터:', {
            currentLanguage,
            targetLanguage,
            quizData
        });

        // 퀴즈가 시작되지 않았으면 기본 URL 반환
        if (!quizData.isStarted || !quizData.answers || quizData.answers.length === 0) {
            console.log('퀴즈 시작 전이므로 기본 URL 반환:', baseUrl);
            return baseUrl;
        }

        // 4축 점수 기반 상태 전달
        const axisScores = this.calculateCurrentAxisScores(quizData.answers);
        console.log('계산된 4축 점수:', axisScores);
        
        const params = new URLSearchParams();
        
        // 현재 문항 번호
        params.set('q', (quizData.currentQuestion || 0).toString());
        
        // 각 축 점수 (0점이 아닌 경우만)
        if (axisScores.D > 0) params.set('d', axisScores.D.toString());
        if (axisScores.E > 0) params.set('e', axisScores.E.toString());
        if (axisScores.T > 0) params.set('t', axisScores.T.toString());
        if (axisScores.C > 0) params.set('c', axisScores.C.toString());

        const finalUrl = baseUrl + '?' + params.toString();
        console.log('최종 생성된 언어 토글 URL:', finalUrl);

        // 언어 토글 전에 현재 상태를 특별한 키로 저장 (영어 페이지에서 읽을 수 있도록)
        try {
            const crossLanguageState = {
                currentQuestion: quizData.currentQuestion,
                axisScores: axisScores,
                isStarted: true,
                originalLanguage: currentLanguage,
                targetLanguage: targetLanguage,
                timestamp: new Date().toISOString()
            };
            sessionStorage.setItem('matrixme_cross_language_state', JSON.stringify(crossLanguageState));
            console.log('언어 간 상태 저장 완료:', crossLanguageState);
        } catch (error) {
            console.error('언어 간 상태 저장 실패:', error);
        }

        return finalUrl;
    }

    /**
     * URL 파라미터에서 상태 복원
     */
    restoreFromUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);
        
        const questionIndex = urlParams.get('q');
        const dScore = urlParams.get('d');
        const eScore = urlParams.get('e');
        const tScore = urlParams.get('t');
        const cScore = urlParams.get('c');

        // URL 파라미터가 없으면 null 반환
        if (!questionIndex && !dScore && !eScore && !tScore && !cScore) {
            return null;
        }

        try {
            // 축별 점수에서 답변 배열 재구성
            const restoredAnswers = this.reconstructAnswersFromScores({
                D: parseInt(dScore) || 0,
                E: parseInt(eScore) || 0,
                T: parseInt(tScore) || 0,
                C: parseInt(cScore) || 0
            });

            const state = {
                currentQuestion: parseInt(questionIndex) || 0,
                answers: restoredAnswers,
                isStarted: true,
                restored: true,
                axisScores: {
                    D: parseInt(dScore) || 0,
                    E: parseInt(eScore) || 0,
                    T: parseInt(tScore) || 0,
                    C: parseInt(cScore) || 0
                }
            };

            // URL 파라미터 제거 (새로고침 시 정상 시작되도록)
            window.history.replaceState(null, '', window.location.pathname);

            return state;
        } catch (error) {
            console.error('Failed to restore from URL params:', error);
            return null;
        }
    }

    /**
     * 4축 점수에서 답변 배열 재구성
     * 각 축의 점수를 문항 수로 나눠서 평균값으로 답변 생성
     */
    reconstructAnswersFromScores(axisScores) {
        const answers = new Array(20).fill(null);
        
        // D축 (Q1-5) - 점수를 5개 문항으로 분산
        const dAvg = Math.round(axisScores.D / 5) || 3; // 기본값 3
        for (let i = 0; i < 5; i++) {
            answers[i] = { letter: this.valueToLetter(dAvg), value: dAvg };
        }

        // E축 (Q6-10)
        const eAvg = Math.round(axisScores.E / 5) || 3;
        for (let i = 5; i < 10; i++) {
            answers[i] = { letter: this.valueToLetter(eAvg), value: eAvg };
        }

        // T축 (Q11-15)
        const tAvg = Math.round(axisScores.T / 5) || 3;
        for (let i = 10; i < 15; i++) {
            answers[i] = { letter: this.valueToLetter(tAvg), value: tAvg };
        }

        // C축 (Q16-20)
        const cAvg = Math.round(axisScores.C / 5) || 3;
        for (let i = 15; i < 20; i++) {
            answers[i] = { letter: this.valueToLetter(cAvg), value: cAvg };
        }

        return answers;
    }

    /**
     * 점수를 문자로 변환
     */
    valueToLetter(value) {
        const mapping = { 1: 'a', 2: 'b', 3: 'c', 4: 'd', 5: 'e' };
        return mapping[Math.max(1, Math.min(5, value))] || 'c';
    }

    /**
     * 퀴즈 완료 시 최종 결과 저장
     */
    saveFinalResult(result) {
        try {
            const finalResult = {
                ...result,
                timestamp: new Date().toISOString(),
                language: result.language || 'ko'
            };

            // 로컬 스토리지에 최근 결과 저장
            const recentResults = JSON.parse(localStorage.getItem('matrixme_recent_results') || '[]');
            recentResults.unshift(finalResult);
            
            // 최대 5개까지만 저장
            if (recentResults.length > 5) {
                recentResults.splice(5);
            }
            
            localStorage.setItem('matrixme_recent_results', JSON.stringify(recentResults));

            // 세션 스토리지 정리
            this.clearSavedState();

            return true;
        } catch (error) {
            console.error('Failed to save final result:', error);
            return false;
        }
    }

    /**
     * 최근 결과 목록 가져오기
     */
    getRecentResults() {
        try {
            return JSON.parse(localStorage.getItem('matrixme_recent_results') || '[]');
        } catch (error) {
            console.error('Failed to load recent results:', error);
            return [];
        }
    }

    /**
     * 진행률 계산
     */
    calculateProgress(currentQuestion, totalQuestions = 20) {
        return {
            current: currentQuestion,
            total: totalQuestions,
            percentage: Math.round((currentQuestion / totalQuestions) * 100),
            remaining: totalQuestions - currentQuestion
        };
    }

    /**
     * 디버그 정보
     */
    getDebugInfo() {
        const saved = this.loadSavedState();
        const urlState = this.restoreFromUrlParams();
        
        return {
            hasSavedState: !!saved,
            hasUrlParams: !!urlState,
            savedState: saved,
            urlState: urlState,
            storageSize: new Blob([sessionStorage.getItem(this.storageKey) || '']).size
        };
    }
}

// 전역에서 사용 가능하도록 등록
window.QuizStateManager = QuizStateManager;

export default QuizStateManager;