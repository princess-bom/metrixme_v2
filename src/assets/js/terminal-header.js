/**
 * TerminalHeader - 터미널 헤더 컴포넌트
 * 모든 페이지에서 일관된 터미널 헤더 UI를 제공
 */
class TerminalHeader {
    constructor(options = {}) {
        this.options = {
            title: 'MATRIX ME',
            subtitle: 'DNA Scanner Active',
            showColorToggle: true,
            showLanguageToggle: true,
            colorToggleId: 'color-toggle',
            languageToggleId: 'language-toggle',
            ...options
        };
        
        this.element = null;
    }

    /**
     * 터미널 헤더 HTML 생성
     * @returns {string} 터미널 헤더 HTML
     */
    generateHTML() {
        const colorToggleHTML = this.options.showColorToggle 
            ? `<button class="terminal-color-toggle" id="${this.options.colorToggleId}">C</button>`
            : '';
            
        const languageToggleHTML = this.options.showLanguageToggle
            ? `<button class="terminal-language-toggle" id="${this.options.languageToggleId}">EN</button>`
            : '';

        return `
            <div class="terminal-header">
                <div class="terminal-controls">
                    <span class="control red"></span>
                    <span class="control yellow"></span>
                    <span class="control green"></span>
                </div>
                <div class="terminal-title">
                    <span class="title-part1">${this.options.title}</span>
                    <span class="title-separator"> - </span>
                    <span class="title-part2">${this.options.subtitle}</span>
                </div>
                <div class="terminal-header-buttons">
                    ${colorToggleHTML}
                    ${languageToggleHTML}
                </div>
            </div>
        `;
    }

    /**
     * 터미널 헤더 CSS 스타일 반환
     * @returns {string} CSS 스타일
     */
    getCSS() {
        return `
            .terminal-header {
                background: #0A0A0A;
                padding: 12px 20px;
                display: flex;
                align-items: center;
                gap: 12px;
                border-bottom: 1px solid #333;
            }

            .terminal-controls {
                display: flex;
                gap: 8px;
            }

            .control {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                cursor: pointer;
            }

            .control.red {
                background: #ff5f56;
                border: 1px solid #e0443e;
            }

            .control.yellow {
                background: #ffbd2e;
                border: 1px solid #dea123;
            }

            .control.green {
                background: #27ca3f;
                border: 1px solid #1aab29;
            }

            .terminal-title {
                color: #00CCFF;
                font-size: 12px;
                font-weight: 500;
                text-shadow: 0 0 10px currentColor;
                flex: 1;
            }

            .terminal-header-buttons {
                display: flex;
                gap: 8px;
            }

            .terminal-color-toggle {
                background: transparent !important;
                border: 1px solid #00CCFF !important;
                color: #00CCFF !important;
                padding: 4px 8px !important;
                border-radius: 3px !important;
                font-family: inherit !important;
                font-size: 10px !important;
                font-weight: bold !important;
                cursor: pointer !important;
                transition: all 0.2s ease !important;
                opacity: 1 !important;
                text-shadow: 0 0 8px #00CCFF !important;
            }

            .terminal-language-toggle {
                background: transparent !important;
                border: 1px solid #00CCFF !important;
                color: #00CCFF !important;
                padding: 4px 8px !important;
                border-radius: 3px !important;
                font-family: inherit !important;
                font-size: 10px !important;
                font-weight: bold !important;
                cursor: pointer !important;
                transition: all 0.2s ease !important;
                opacity: 1 !important;
                text-shadow: 0 0 8px #00CCFF !important;
            }

            .terminal-color-toggle::before,
            .terminal-color-toggle::after {
                content: none !important;
            }

            .terminal-language-toggle::before,
            .terminal-language-toggle::after {
                content: none !important;
            }

            .terminal-color-toggle:hover,
            .terminal-language-toggle:hover {
                background: #00CCFF !important;
                color: #000 !important;
                transform: none !important;
                box-shadow: none !important;
            }

            /* 모바일 반응형 */
            @media (max-width: 767px) {
                .terminal-header {
                    padding: 10px 15px;
                    border-radius: 0;
                }
                
                .terminal-title {
                    font-size: 10px;
                }
                
                .control {
                    width: 8px;
                    height: 8px;
                }
                
                .terminal-controls {
                    gap: 4px;
                }
                
                .terminal-color-toggle,
                .terminal-language-toggle {
                    font-size: 8px !important;
                    padding: 2px 4px !important;
                }
            }
        `;
    }

    /**
     * 지정된 컨테이너에 터미널 헤더 렌더링
     * @param {string|HTMLElement} container - 컨테이너 요소 또는 선택자
     */
    render(container) {
        const targetElement = typeof container === 'string' 
            ? document.querySelector(container) 
            : container;
            
        if (!targetElement) {
            console.error('TerminalHeader: Container element not found');
            return;
        }

        // HTML 삽입
        targetElement.innerHTML = this.generateHTML();
        this.element = targetElement.querySelector('.terminal-header');

        // CSS 스타일 주입 (한 번만)
        if (!document.querySelector('#terminal-header-styles')) {
            const style = document.createElement('style');
            style.id = 'terminal-header-styles';
            style.textContent = this.getCSS();
            document.head.appendChild(style);
        }

        return this.element;
    }

    /**
     * 특정 요소에 터미널 헤더 HTML을 prepend
     * @param {string|HTMLElement} container - 컨테이너 요소 또는 선택자
     */
    prependTo(container) {
        const targetElement = typeof container === 'string' 
            ? document.querySelector(container) 
            : container;
            
        if (!targetElement) {
            console.error('TerminalHeader: Container element not found');
            return;
        }

        // 기존 헤더 제거
        const existingHeader = targetElement.querySelector('.terminal-header');
        if (existingHeader) {
            existingHeader.remove();
        }

        // 새 헤더 추가
        const headerHTML = this.generateHTML();
        targetElement.insertAdjacentHTML('afterbegin', headerHTML);
        this.element = targetElement.querySelector('.terminal-header');

        // CSS 스타일 주입 (한 번만)
        if (!document.querySelector('#terminal-header-styles')) {
            const style = document.createElement('style');
            style.id = 'terminal-header-styles';
            style.textContent = this.getCSS();
            document.head.appendChild(style);
        }

        return this.element;
    }

    /**
     * 헤더 제목 업데이트
     * @param {string} title - 새 제목
     * @param {string} subtitle - 새 부제목
     */
    updateTitle(title, subtitle) {
        if (this.element) {
            const titlePart1 = this.element.querySelector('.title-part1');
            const titlePart2 = this.element.querySelector('.title-part2');
            
            if (titlePart1) titlePart1.textContent = title;
            if (titlePart2) titlePart2.textContent = subtitle;
        }
    }

    /**
     * 언어 토글 버튼 텍스트 업데이트
     * @param {string} text - 새 텍스트
     */
    updateLanguageToggle(text) {
        if (this.element) {
            const languageToggle = this.element.querySelector('.terminal-language-toggle');
            if (languageToggle) {
                languageToggle.textContent = text;
            }
        }
    }

    /**
     * 컬러 토글 버튼 표시/숨김
     * @param {boolean} show - 표시 여부
     */
    showColorToggle(show) {
        if (this.element) {
            const colorToggle = this.element.querySelector('.terminal-color-toggle');
            if (colorToggle) {
                colorToggle.style.display = show ? 'block' : 'none';
            }
        }
    }

    /**
     * 언어 토글 버튼 표시/숨김
     * @param {boolean} show - 표시 여부
     */
    showLanguageToggle(show) {
        if (this.element) {
            const languageToggle = this.element.querySelector('.terminal-language-toggle');
            if (languageToggle) {
                languageToggle.style.display = show ? 'block' : 'none';
            }
        }
    }

    /**
     * 헤더 요소 반환
     * @returns {HTMLElement} 헤더 DOM 요소
     */
    getElement() {
        return this.element;
    }

    /**
     * 페이지 타입별 기본 설정 반환
     * @param {string} pageType - 페이지 타입 ('main', 'quiz', 'result')
     * @param {string} language - 언어 코드 ('ko', 'en')
     * @returns {Object} 기본 설정 객체
     */
    static getDefaultOptions(pageType, language = 'ko') {
        const langCode = language === 'ko' ? 'ko' : 'en';
        
        const pageConfigs = {
            main: {
                title: 'MATRIX ME',
                subtitle: 'DNA Scanner Active',
                colorToggleId: 'main-color-toggle',
                languageToggleId: 'main-language-toggle'
            },
            quiz: {
                title: 'MATRIX ME',
                subtitle: 'DNA Analysis in Progress',
                colorToggleId: `${langCode}-quiz-color-toggle`,
                languageToggleId: `${langCode}-quiz-language-toggle`
            },
            result: {
                title: 'MATRIX ME',
                subtitle: 'DNA Analysis Complete',
                colorToggleId: `${langCode}-result-color-toggle`,
                languageToggleId: `${langCode}-result-language-toggle`
            }
        };

        return pageConfigs[pageType] || pageConfigs.main;
    }
}

// 전역 노출
window.TerminalHeader = TerminalHeader;

// 모듈로 내보내기 (ES6 모듈 지원)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TerminalHeader;
}