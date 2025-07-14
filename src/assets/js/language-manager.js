/**
 * LanguageManager - 통합 언어 관리 시스템
 * 모든 페이지에서 사용 가능한 언어 전환 및 다국어 지원
 */
class LanguageManager {
    constructor() {
        this.currentLang = 'ko';
        this.supportedLanguages = ['ko', 'en'];
        this.storageKey = 'matrixme-language';
        this.translations = {};
        
        // 페이지 타입별 번역 데이터 로드
        this.loadTranslations();
    }

    /**
     * 페이지 타입별 번역 데이터 로드
     */
    loadTranslations() {
        const pageType = this.detectPageType();
        
        switch (pageType) {
            case 'main':
                this.loadMainPageTranslations();
                break;
            case 'quiz':
                this.loadQuizPageTranslations();
                break;
            case 'result':
                this.loadResultPageTranslations();
                break;
        }
    }

    /**
     * 메인 페이지 번역 데이터 로드
     */
    loadMainPageTranslations() {
        this.translations = {
            ko: {
                'main-loading-text': 'AI DNA 스캔 시스템 초기화 중...',
                'main-completion-text': '시스템 준비 완료.',
                'description-line1': '당신의 AI 활용 유형을 16가지 중에서 정확히 진단합니다.',
                'description-line2': '20개의 질문을 통해 당신의 AI DNA를 분석하세요.',
                'language-selection-text': '언어 선택 / Language Selection:',
                'korean-option-text': '한국어로 진단 시작 (Korean)',
                'english-option-text': 'Start Diagnosis in English',
                'toggle-button': 'EN'
            },
            en: {
                'main-loading-text': 'AI DNA Scan System Initializing...',
                'main-completion-text': 'System Ready.',
                'description-line1': 'Accurately diagnose your AI usage type among 16 types.',
                'description-line2': 'Analyze your AI DNA through 20 questions.',
                'language-selection-text': 'Language Selection / 언어 선택:',
                'korean-option-text': '한국어로 진단 시작 (Korean)',
                'english-option-text': 'Start Diagnosis in English',
                'toggle-button': 'KO'
            }
        };
    }

    /**
     * 퀴즈 페이지 번역 데이터 로드
     */
    loadQuizPageTranslations() {
        this.translations = {
            ko: {
                'toggle-button': 'EN'
            },
            en: {
                'toggle-button': 'KO'
            }
        };
    }

    /**
     * 결과 페이지 번역 데이터 로드
     */
    loadResultPageTranslations() {
        this.translations = {
            ko: {
                'toggle-button': 'EN'
            },
            en: {
                'toggle-button': 'KO'
            }
        };
    }

    /**
     * 초기화
     */
    init() {
        this.detectCurrentLanguage();
        this.restoreFromStorage();
        this.updateLanguageButton();
    }

    /**
     * 현재 언어 감지 (URL 기반)
     */
    detectCurrentLanguage() {
        const path = window.location.pathname;
        
        if (path.includes('/ko/')) {
            this.currentLang = 'ko';
        } else if (path.includes('/en/')) {
            this.currentLang = 'en';
        } else {
            // 메인 페이지의 경우 기본값 또는 저장된 언어 사용
            this.currentLang = 'ko';
        }
    }

    /**
     * 언어 전환
     * @param {string} newLang - 새 언어 코드
     */
    switchLanguage(newLang) {
        if (!this.supportedLanguages.includes(newLang)) {
            console.warn(`Unsupported language: ${newLang}`);
            return;
        }

        const pageType = this.detectPageType();
        
        switch (pageType) {
            case 'main':
                this.switchMainPageLanguage(newLang);
                break;
            case 'quiz':
                this.switchQuizPageLanguage(newLang);
                break;
            case 'result':
                this.switchResultPageLanguage(newLang);
                break;
        }
    }

    /**
     * 메인 페이지 언어 전환
     * @param {string} newLang - 새 언어 코드
     */
    switchMainPageLanguage(newLang) {
        this.currentLang = newLang;
        this.saveToStorage();
        this.updateMainPageTexts();
        this.updateLanguageButton();
    }

    /**
     * 퀴즈 페이지 언어 전환
     * @param {string} newLang - 새 언어 코드
     */
    switchQuizPageLanguage(newLang) {
        // 퀴즈 상태 저장
        this.saveQuizState();
        
        // URL 변경으로 언어 전환
        const targetLang = newLang === 'ko' ? 'ko' : 'en';
        const newPath = window.location.pathname.replace(/\/(ko|en)\//, `/${targetLang}/`);
        const searchParams = window.location.search;
        
        window.location.href = newPath + searchParams;
    }

    /**
     * 결과 페이지 언어 전환
     * @param {string} newLang - 새 언어 코드
     */
    switchResultPageLanguage(newLang) {
        const urlParams = new URLSearchParams(window.location.search);
        const currentPath = window.location.pathname;
        
        let newPath;
        if (newLang === 'en') {
            newPath = currentPath.replace('/ko/', '/en/');
        } else {
            newPath = currentPath.replace('/en/', '/ko/');
        }
        
        const newUrl = newPath + '?' + urlParams.toString();
        window.location.href = newUrl;
    }

    /**
     * 메인 페이지 텍스트 업데이트
     */
    updateMainPageTexts() {
        const texts = this.translations[this.currentLang];
        
        Object.keys(texts).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.textContent = texts[key];
            }
        });
    }

    /**
     * 언어 토글 버튼 텍스트 업데이트
     */
    updateLanguageButton() {
        const pageType = this.detectPageType();
        const lang = this.currentLang;
        
        let buttonId;
        switch (pageType) {
            case 'main':
                buttonId = 'main-language-toggle';
                break;
            case 'quiz':
                buttonId = `${lang}-quiz-language-toggle`;
                break;
            case 'result':
                buttonId = `${lang}-result-language-toggle`;
                break;
        }
        
        const button = document.getElementById(buttonId);
        if (button && this.translations[lang]) {
            button.textContent = this.translations[lang]['toggle-button'];
        }
    }

    /**
     * 퀴즈 상태 저장 (언어 전환 시)
     */
    saveQuizState() {
        try {
            if (window.quizApp && window.quizApp.quizEngine) {
                const quizEngine = window.quizApp.quizEngine;
                const quizState = {
                    currentQuestionIndex: quizEngine.currentQuestionIndex,
                    answers: quizEngine.answers,
                    isStarted: quizEngine.isStarted,
                    quizData: quizEngine.quizData,
                    timestamp: Date.now()
                };
                
                sessionStorage.setItem('matrixme-quiz-state', JSON.stringify(quizState));
            }
        } catch (error) {
            console.warn('Failed to save quiz state:', error);
        }
    }

    /**
     * 현재 페이지 타입 감지
     * @returns {string} 페이지 타입 ('main', 'quiz', 'result')
     */
    detectPageType() {
        const path = window.location.pathname;
        
        if (path.includes('/quiz/')) return 'quiz';
        if (path.includes('/result/')) return 'result';
        if (path === '/' || path.endsWith('/index.html') || path.endsWith('/matrixme/')) return 'main';
        
        return 'main';
    }

    /**
     * 로컬 스토리지에서 언어 상태 복원
     */
    restoreFromStorage() {
        const savedLang = localStorage.getItem(this.storageKey);
        if (savedLang && this.supportedLanguages.includes(savedLang)) {
            // 메인 페이지에서만 저장된 언어 사용
            if (this.detectPageType() === 'main') {
                this.currentLang = savedLang;
            }
        }
    }

    /**
     * 로컬 스토리지에 언어 상태 저장
     */
    saveToStorage() {
        localStorage.setItem(this.storageKey, this.currentLang);
    }

    /**
     * 번역 텍스트 반환
     * @param {string} key - 번역 키
     * @param {string} lang - 언어 코드 (선택사항)
     * @returns {string} 번역된 텍스트
     */
    getText(key, lang = this.currentLang) {
        return this.translations[lang]?.[key] || key;
    }

    /**
     * 언어 토글 (현재 언어와 반대로 전환)
     */
    toggleLanguage() {
        const newLang = this.currentLang === 'ko' ? 'en' : 'ko';
        this.switchLanguage(newLang);
    }

    /**
     * 언어 전환 이벤트 리스너 등록
     * @param {string} buttonId - 버튼 ID
     */
    bindToggleButton(buttonId) {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleLanguage();
            });
        }
    }

    /**
     * 현재 언어 반환
     * @returns {string} 현재 언어 코드
     */
    getCurrentLanguage() {
        return this.currentLang;
    }

    /**
     * 언어 설정
     * @param {string} lang - 언어 코드
     */
    setLanguage(lang) {
        if (this.supportedLanguages.includes(lang)) {
            this.currentLang = lang;
            this.saveToStorage();
            this.updateLanguageButton();
        }
    }

    /**
     * 페이지 타입별 자동 이벤트 바인딩
     */
    autoBindEvents() {
        const pageType = this.detectPageType();
        const lang = this.currentLang;
        
        switch (pageType) {
            case 'main':
                this.bindToggleButton('main-language-toggle');
                break;
            case 'quiz':
                this.bindToggleButton(`${lang}-quiz-language-toggle`);
                break;
            case 'result':
                this.bindToggleButton(`${lang}-result-language-toggle`);
                break;
        }
    }
}

// 전역 인스턴스 생성
window.LanguageManager = new LanguageManager();

// 모듈로 내보내기 (ES6 모듈 지원)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LanguageManager;
}