/**
 * ColorManager - 통합 색상 관리 시스템
 * 모든 페이지에서 사용 가능한 색상 테마 관리 클래스
 */
class ColorManager {
    constructor() {
        this.themes = [
            { name: '민트 그린', color: '#00CC88' },
            { name: '실버 화이트', color: '#D0D0D0' },
            { name: '앰버 오렌지', color: '#FF8C00' },
            { name: '네온 핑크', color: '#FF0080' },
            { name: '아이스 블루', color: '#00AAFF' }
        ];
        this.currentIndex = 0;
        this.storageKey = 'matrixme-color-index';
    }

    /**
     * 초기화 - 기본 색상 적용 및 저장된 상태 복원
     */
    init() {
        this.restoreFromStorage();
        this.applyColor(this.themes[this.currentIndex].color);
    }

    /**
     * 다음 색상 테마로 전환
     */
    toggleColor() {
        this.currentIndex = (this.currentIndex + 1) % this.themes.length;
        const currentTheme = this.themes[this.currentIndex];
        this.applyColor(currentTheme.color);
        this.saveToStorage();
    }

    /**
     * 특정 색상 적용
     * @param {string} color - 헥스 색상 코드
     */
    applyColor(color) {
        // 페이지 타입에 따라 다른 적용 방식 사용
        const pageType = this.detectPageType();
        
        switch (pageType) {
            case 'main':
                this.applyMainPageColor(color);
                break;
            case 'result':
                this.applyResultPageColor(color);
                break;
            case 'quiz':
                this.applyQuizPageColor(color);
                break;
            default:
                console.warn('Unknown page type for color application');
        }
    }

    /**
     * 메인 페이지 색상 적용
     * @param {string} color - 헥스 색상 코드
     */
    applyMainPageColor(color) {
        const rgbColor = this.hexToRgb(color);
        
        // CSS 변수 업데이트 (호버 효과 포함)
        document.documentElement.style.setProperty('--text-primary', color);
        document.documentElement.style.setProperty('--text-primary-rgb', rgbColor);
        
        // 터미널 컨테이너 네온 배경 효과만 변경 (텍스트는 그대로)
        const terminalContainer = document.querySelector('.terminal-container');
        if (terminalContainer) {
            terminalContainer.style.boxShadow = `
                0 0 20px rgba(${rgbColor}, 0.3),
                0 0 40px rgba(${rgbColor}, 0.1),
                0 0 80px rgba(${rgbColor}, 0.05)
            `;
        }
        
        // 토글 버튼 색상 변경 (!important로 덮어쓰기)
        const colorToggle = document.getElementById('main-color-toggle');
        if (colorToggle) {
            colorToggle.style.setProperty('color', color, 'important');
            colorToggle.style.setProperty('border-color', color, 'important');
            colorToggle.style.setProperty('text-shadow', `0 0 8px ${color}`, 'important');
        }
        
        const languageToggle = document.getElementById('main-language-toggle');
        if (languageToggle) {
            languageToggle.style.setProperty('color', color, 'important');
            languageToggle.style.setProperty('border-color', color, 'important');
            languageToggle.style.setProperty('text-shadow', `0 0 8px ${color}`, 'important');
        }
        
        // 모든 텍스트 요소들 색상 변경
        const textElements = document.querySelectorAll('.boot-line, .option-text, .input-text');
        textElements.forEach(element => {
            element.style.color = color;
            element.style.textShadow = `0 0 5px ${color}`;
        });
        
        // 프롬프트 색상 변경
        const prompts = document.querySelectorAll('.prompt');
        prompts.forEach(prompt => {
            prompt.style.color = color;
            prompt.style.textShadow = `0 0 8px ${color}`;
        });
        
        // 커서 색상 변경
        const cursors = document.querySelectorAll('.cursor');
        cursors.forEach(cursor => {
            cursor.style.color = color;
            cursor.style.textShadow = `0 0 8px ${color}`;
        });
        
        // 로딩바 관련 요소들 색상 변경
        const progressElement = document.getElementById('main-loading-progress');
        if (progressElement) {
            progressElement.style.color = color;
            progressElement.style.textShadow = `0 0 10px ${color}`;
        }
        
        const completionText = document.getElementById('main-completion-text');
        if (completionText) {
            completionText.style.color = color;
            completionText.style.textShadow = `0 0 15px ${color}`;
        }
        
        const loadingText = document.getElementById('main-loading-text');
        if (loadingText) {
            loadingText.style.color = color;
            loadingText.style.textShadow = `0 0 10px ${color}`;
        }
        
        const percentElement = document.getElementById('main-progress-percent');
        if (percentElement) {
            percentElement.style.color = color;
            percentElement.style.textShadow = `0 0 8px ${color}`;
        }
    }

    /**
     * 결과 페이지 색상 적용
     * @param {string} color - 헥스 색상 코드
     */
    applyResultPageColor(color) {
        const lang = this.detectLanguage();
        const rgbColor = this.hexToRgb(color);
        
        // CSS 변수 업데이트 (호버 효과 포함)
        document.documentElement.style.setProperty('--text-primary', color);
        document.documentElement.style.setProperty('--text-primary-rgb', rgbColor);
        
        // 컬러 토글 버튼 색상 업데이트
        const colorToggle = document.getElementById(`${lang}-result-color-toggle`);
        if (colorToggle) {
            colorToggle.style.color = color;
            colorToggle.style.borderColor = color;
            colorToggle.style.textShadow = `0 0 8px ${color}`;
        }
        
        // 언어 토글 버튼 색상 업데이트
        const languageToggle = document.getElementById(`${lang}-result-language-toggle`);
        if (languageToggle) {
            languageToggle.style.color = color;
            languageToggle.style.borderColor = color;
            languageToggle.style.textShadow = `0 0 8px ${color}`;
        }
    }

    /**
     * 퀴즈 페이지 색상 적용
     * @param {string} color - 헥스 색상 코드
     */
    applyQuizPageColor(color) {
        const lang = this.detectLanguage();
        const rgbColor = this.hexToRgb(color);
        
        // CSS 변수 업데이트 (호버 효과 포함)
        document.documentElement.style.setProperty('--text-primary', color);
        document.documentElement.style.setProperty('--text-primary-rgb', rgbColor);
        
        // 컬러 토글 버튼 색상 업데이트
        const colorToggle = document.getElementById(`${lang}-quiz-color-toggle`);
        if (colorToggle) {
            colorToggle.style.color = color;
            colorToggle.style.borderColor = color;
            colorToggle.style.textShadow = `0 0 8px ${color}`;
        }
        
        // 언어 토글 버튼 색상 업데이트
        const languageToggle = document.getElementById(`${lang}-quiz-language-toggle`);
        if (languageToggle) {
            languageToggle.style.color = color;
            languageToggle.style.borderColor = color;
            languageToggle.style.textShadow = `0 0 8px ${color}`;
        }
    }

    /**
     * 헥스 색상을 RGB 문자열로 변환
     * @param {string} hex - 헥스 색상 코드
     * @returns {string} RGB 문자열 (예: "255, 0, 0")
     */
    hexToRgb(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `${r}, ${g}, ${b}`;
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
     * 현재 언어 감지
     * @returns {string} 언어 코드 ('ko', 'en')
     */
    detectLanguage() {
        const path = window.location.pathname;
        
        if (path.includes('/ko/')) return 'ko';
        if (path.includes('/en/')) return 'en';
        
        return 'ko'; // 기본값
    }

    /**
     * 로컬 스토리지에서 색상 상태 복원
     */
    restoreFromStorage() {
        const savedColorIndex = localStorage.getItem(this.storageKey);
        if (savedColorIndex !== null) {
            this.currentIndex = parseInt(savedColorIndex);
        }
    }

    /**
     * 로컬 스토리지에 색상 상태 저장
     */
    saveToStorage() {
        localStorage.setItem(this.storageKey, this.currentIndex);
    }

    /**
     * 현재 테마 정보 반환
     * @returns {Object} 현재 테마 객체
     */
    getCurrentTheme() {
        return this.themes[this.currentIndex];
    }

    /**
     * 특정 인덱스의 테마로 설정
     * @param {number} index - 테마 인덱스
     */
    setTheme(index) {
        if (index >= 0 && index < this.themes.length) {
            this.currentIndex = index;
            this.applyColor(this.themes[index].color);
            this.saveToStorage();
        }
    }
}

// 즉시 실행하여 전역 인스턴스 생성
window.ColorManager = new ColorManager();

// 디버깅용
console.log('ColorManager loaded:', window.ColorManager);

// 모듈로 내보내기 (ES6 모듈 지원)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ColorManager;
}