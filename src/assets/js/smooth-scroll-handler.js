/**
 * Matrix Me - 스무스 스크롤 핸들러
 * 질문 전환 시 부드러운 스크롤 애니메이션 제공
 */

class SmoothScrollHandler {
    constructor() {
        this.isScrolling = false;
        this.animationFrameId = null;
        
        // 스크롤 대상 요소들
        this.scrollTargets = {
            questionBox: null,
            answerOptions: null,
            nextButton: null
        };
        
        // 초기화
        this.init();
    }

    init() {
        // DOM 요소 참조 설정
        this.updateTargetElements();
        
        // 스크롤 이벤트 최적화를 위한 패시브 리스너
        if (this.supportsPassiveEvents()) {
            document.addEventListener('scroll', this.onScroll.bind(this), { passive: true });
            document.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: true });
        } else {
            document.addEventListener('scroll', this.onScroll.bind(this));
            document.addEventListener('touchstart', this.onTouchStart.bind(this));
        }
        
        // 스크롤 최적화를 위한 스타일 적용
        this.applyScrollOptimizations();
    }

    /**
     * 패시브 이벤트 지원 확인
     */
    supportsPassiveEvents() {
        let supportsPassive = false;
        try {
            const opts = Object.defineProperty({}, 'passive', {
                get: function() {
                    supportsPassive = true;
                }
            });
            window.addEventListener('test', null, opts);
            window.removeEventListener('test', null, opts);
        } catch (e) {}
        return supportsPassive;
    }

    /**
     * 대상 요소들 업데이트
     */
    updateTargetElements() {
        this.scrollTargets.questionBox = document.querySelector('.matrix-question-box');
        this.scrollTargets.answerOptions = document.querySelector('#answer-options');
        this.scrollTargets.nextButton = document.querySelector('#matrix-next-btn');
    }

    /**
     * 질문 전환 시 스무스 스크롤
     */
    scrollToQuestion() {
        if (!this.scrollTargets.questionBox) {
            this.updateTargetElements();
        }
        
        const questionBox = this.scrollTargets.questionBox;
        if (!questionBox) return;

        // 질문 박스가 보이도록 스크롤
        this.smoothScrollToElement(questionBox, {
            offset: -20, // 상단 여백
            duration: 300,
            easing: 'easeOutCubic'
        });
    }

    /**
     * 답변 선택 시 다음 버튼으로 스크롤
     */
    scrollToNextButton() {
        const nextButton = this.scrollTargets.nextButton;
        if (!nextButton || !nextButton.classList.contains('show')) return;

        // 모바일에서만 다음 버튼으로 스크롤
        if (window.innerWidth <= 768) {
            this.smoothScrollToElement(nextButton, {
                offset: -50,
                duration: 200,
                easing: 'easeOutQuart'
            });
        }
    }

    /**
     * 요소까지 부드럽게 스크롤
     */
    smoothScrollToElement(element, options = {}) {
        if (this.isScrolling || !element) return;

        const defaults = {
            offset: 0,
            duration: 400,
            easing: 'easeOutCubic'
        };
        
        const config = { ...defaults, ...options };
        
        // 스크롤 컨테이너 찾기
        const scrollContainer = this.findScrollContainer(element);
        if (!scrollContainer) return;

        const targetPosition = this.getElementScrollPosition(element, scrollContainer, config.offset);
        const startPosition = scrollContainer.scrollTop;
        const distance = targetPosition - startPosition;
        
        if (Math.abs(distance) < 5) return; // 거리가 너무 짧으면 스크롤하지 않음

        this.isScrolling = true;
        const startTime = performance.now();

        const animateScroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / config.duration, 1);
            
            // 이징 함수 적용
            const easedProgress = this.applyEasing(progress, config.easing);
            const currentPosition = startPosition + (distance * easedProgress);
            
            scrollContainer.scrollTop = currentPosition;
            
            if (progress < 1) {
                this.animationFrameId = requestAnimationFrame(animateScroll);
            } else {
                this.isScrolling = false;
                this.animationFrameId = null;
            }
        };

        this.animationFrameId = requestAnimationFrame(animateScroll);
    }

    /**
     * 스크롤 컨테이너 찾기
     */
    findScrollContainer(element) {
        // 퀴즈 페이지에서는 주로 terminal-content가 스크롤 컨테이너
        const terminalContent = document.querySelector('.terminal-content');
        if (terminalContent) return terminalContent;
        
        // iOS Safari의 경우 terminal-container가 스크롤 컨테이너일 수 있음
        const terminalContainer = document.querySelector('.terminal-container');
        if (terminalContainer && terminalContainer.scrollHeight > terminalContainer.clientHeight) {
            return terminalContainer;
        }
        
        // 기본값으로 document.documentElement 사용
        return document.documentElement;
    }

    /**
     * 요소의 스크롤 위치 계산
     */
    getElementScrollPosition(element, container, offset = 0) {
        const elementRect = element.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        let targetPosition;
        
        if (container === document.documentElement) {
            targetPosition = elementRect.top + window.pageYOffset - offset;
        } else {
            targetPosition = container.scrollTop + elementRect.top - containerRect.top - offset;
        }
        
        // 스크롤 범위 제한
        const maxScroll = container.scrollHeight - container.clientHeight;
        return Math.max(0, Math.min(targetPosition, maxScroll));
    }

    /**
     * 이징 함수 적용
     */
    applyEasing(progress, easingType) {
        switch (easingType) {
            case 'easeOutCubic':
                return 1 - Math.pow(1 - progress, 3);
            case 'easeOutQuart':
                return 1 - Math.pow(1 - progress, 4);
            case 'easeInOutCubic':
                return progress < 0.5 
                    ? 4 * progress * progress * progress 
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            case 'linear':
            default:
                return progress;
        }
    }

    /**
     * 스크롤 최적화 스타일 적용
     */
    applyScrollOptimizations() {
        // CSS에서 이미 처리되었지만 JavaScript로 추가 최적화
        const style = document.createElement('style');
        style.textContent = `
            /* JavaScript 스크롤 최적화 보강 */
            .terminal-content {
                /* 스크롤 성능 향상을 위한 contain 속성 */
                contain: layout style paint;
            }
            
            .matrix-question-box {
                /* 질문 전환 애니메이션 */
                transition: opacity 0.2s ease-out;
            }
            
            .matrix-question-box.transitioning {
                opacity: 0.7;
            }
            
            /* 스크롤 중 터치 이벤트 최적화 */
            .scrolling .quiz-option {
                pointer-events: none;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * 스크롤 이벤트 핸들러
     */
    onScroll() {
        // 스크롤 중임을 표시 (터치 이벤트 최적화)
        document.body.classList.add('scrolling');
        
        // 스크롤 종료 감지를 위한 디바운스
        clearTimeout(this.scrollEndTimer);
        this.scrollEndTimer = setTimeout(() => {
            document.body.classList.remove('scrolling');
        }, 150);
    }

    /**
     * 터치 시작 이벤트 핸들러
     */
    onTouchStart() {
        // 진행 중인 스크롤 애니메이션 중단
        if (this.isScrolling && this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.isScrolling = false;
            this.animationFrameId = null;
        }
    }

    /**
     * 질문 전환 애니메이션 (퀴즈 컨트롤러에서 호출)
     */
    animateQuestionTransition() {
        const questionBox = this.scrollTargets.questionBox;
        if (!questionBox) return;

        // 전환 애니메이션 적용
        questionBox.classList.add('transitioning');
        
        setTimeout(() => {
            questionBox.classList.remove('transitioning');
            // 질문 박스로 스크롤
            this.scrollToQuestion();
        }, 100);
    }

    /**
     * 키보드 팝업 감지 및 처리
     */
    handleKeyboardPopup() {
        let initialViewportHeight = window.innerHeight;
        
        const handleResize = () => {
            const currentViewportHeight = window.innerHeight;
            const heightDifference = initialViewportHeight - currentViewportHeight;
            
            // 키보드가 팝업된 것으로 판단 (높이가 150px 이상 줄어듦)
            if (heightDifference > 150) {
                document.body.classList.add('keyboard-open');
                
                // 포커스된 요소가 보이도록 스크롤
                const focusedElement = document.activeElement;
                if (focusedElement && focusedElement.scrollIntoView) {
                    setTimeout(() => {
                        focusedElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }, 300);
                }
            } else {
                document.body.classList.remove('keyboard-open');
            }
        };
        
        window.addEventListener('resize', handleResize, { passive: true });
        
        // 입력 필드 포커스 시 처리
        document.addEventListener('focusin', (e) => {
            if (e.target.matches('input, textarea, select')) {
                setTimeout(() => {
                    if (document.body.classList.contains('keyboard-open')) {
                        e.target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }
                }, 300);
            }
        });
    }

    /**
     * 소멸자
     */
    destroy() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        
        clearTimeout(this.scrollEndTimer);
        
        // 이벤트 리스너 제거
        document.removeEventListener('scroll', this.onScroll.bind(this));
        document.removeEventListener('touchstart', this.onTouchStart.bind(this));
        window.removeEventListener('resize', this.handleKeyboardPopup);
    }
}

// 전역 인스턴스 생성
window.SmoothScrollHandler = SmoothScrollHandler;

// DOM 로드 완료 시 자동 초기화
document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.smoothScrollHandler === 'undefined') {
        window.smoothScrollHandler = new SmoothScrollHandler();
        window.smoothScrollHandler.handleKeyboardPopup();
    }
});