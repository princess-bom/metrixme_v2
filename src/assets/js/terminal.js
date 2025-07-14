class TerminalEngine {
    constructor(container) {
        this.container = container;
        this.currentLine = '';
        this.history = [];
        this.isTyping = false;
        this.language = 'ko';
        this.initialized = false;
    }

    initialize() {
        if (this.initialized) return;
        
        this.setupEventListeners();
        this.showBootSequence();
        this.initialized = true;
    }

    setupEventListeners() {
        // 키보드 입력 처리
        document.addEventListener('keydown', (e) => {
            if (this.isTyping) return;
            
            const key = e.key.toLowerCase();
            
            // 언어 선택
            if (key === '1') {
                this.selectLanguage('ko');
            } else if (key === '2') {
                this.selectLanguage('en');
            }
            
            // 퀴즈 답변 (A, B, C, D, E)
            if (['a', 'b', 'c', 'd', 'e'].includes(key)) {
                this.selectAnswer(key);
            }
            
            // 엔터키 처리
            if (key === 'enter') {
                this.handleEnter();
            }
        });

        // 마우스 클릭 처리
        document.addEventListener('click', (e) => {
            if (e.target.closest('.option')) {
                const option = e.target.closest('.option');
                const lang = option.dataset.lang;
                if (lang) {
                    this.selectLanguage(lang);
                }
            }
            
            if (e.target.closest('.quiz-option')) {
                const option = e.target.closest('.quiz-option');
                const letter = option.dataset.letter;
                if (letter) {
                    this.selectAnswer(letter);
                }
            }
        });
    }

    async showBootSequence() {
        const bootLines = document.querySelectorAll('.boot-line');
        
        // 부팅 시퀀스 애니메이션
        for (let i = 0; i < bootLines.length; i++) {
            await this.delay(200);
            bootLines[i].style.opacity = '0';
            bootLines[i].style.transform = 'translateX(-10px)';
            bootLines[i].style.transition = 'all 0.3s ease';
            
            await this.delay(50);
            bootLines[i].style.opacity = '1';
            bootLines[i].style.transform = 'translateX(0)';
            
            // ASCII 아트는 더 천천히
            if (bootLines[i].classList.contains('ascii-art')) {
                await this.delay(800);
            }
        }
        
        // 커서 깜빡임 시작
        this.startCursorBlink();
    }

    startCursorBlink() {
        const cursor = document.querySelector('.cursor');
        if (cursor) {
            cursor.style.animation = 'blink 1s infinite';
        }
    }

    async typeText(text, container, speed = 50) {
        this.isTyping = true;
        const element = container || document.createElement('div');
        element.textContent = '';
        
        for (let i = 0; i < text.length; i++) {
            element.textContent += text[i];
            await this.delay(speed);
        }
        
        this.isTyping = false;
        return element;
    }

    async selectLanguage(lang) {
        if (this.isTyping) return;
        
        this.language = lang;
        const inputText = document.getElementById('input-text');
        const cursor = document.querySelector('.cursor');
        
        // 입력 표시
        inputText.textContent = lang === 'ko' ? '1' : '2';
        
        await this.delay(500);
        
        // 로딩 표시
        inputText.textContent = lang === 'ko' ? '한국어 모드 로딩...' : 'Loading English mode...';
        
        await this.delay(1000);
        
        // 퀴즈 페이지로 이동
        window.location.href = `${lang}/quiz/`;
    }

    async selectAnswer(letter) {
        if (this.isTyping) return;
        
        const inputText = document.getElementById('input-text');
        const options = document.querySelectorAll('.quiz-option');
        
        // 선택된 옵션 표시
        options.forEach(option => {
            option.classList.remove('selected');
            if (option.dataset.letter === letter.toLowerCase()) {
                option.classList.add('selected');
            }
        });
        
        // 입력 표시
        inputText.textContent = letter.toUpperCase();
        
        await this.delay(500);
        
        // 다음 질문으로 진행
        this.processAnswer(letter);
    }

    processAnswer(letter) {
        // 답변 처리 로직 (퀴즈 엔진에서 구현)
        const event = new CustomEvent('answerSelected', {
            detail: { letter: letter.toLowerCase() }
        });
        document.dispatchEvent(event);
    }

    handleEnter() {
        // 엔터키 처리 로직
        const selectedOption = document.querySelector('.quiz-option.selected');
        if (selectedOption) {
            const letter = selectedOption.dataset.letter;
            this.processAnswer(letter);
        }
    }

    addLine(text, className = '') {
        const line = document.createElement('div');
        line.className = `boot-line ${className}`;
        line.textContent = text;
        this.container.appendChild(line);
        return line;
    }

    clear() {
        this.container.innerHTML = '';
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // 진행률 표시
    updateProgress(current, total) {
        const percentage = Math.round((current / total) * 100);
        const progressBar = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        if (progressBar) {
            progressBar.style.width = `${percentage}%`;
        }
        
        if (progressText) {
            progressText.textContent = `${percentage}% (${current}/${total})`;
        }
    }

    // 네온 효과 적용
    applyNeonEffect(element, type = 'normal') {
        const className = type === 'strong' ? 'neon-strong' : 'neon-text';
        element.classList.add(className);
    }

    // 타입별 컬러 적용
    applyTypeColor(element, type) {
        element.classList.add(`type-${type}`);
    }

    // 애니메이션 효과
    animateElement(element, animation = 'fadeIn') {
        element.style.animation = `${animation} 0.5s ease-in`;
    }

    // 로딩 스피너 표시
    showLoading(container) {
        const loading = document.createElement('div');
        loading.className = 'loading';
        container.appendChild(loading);
        return loading;
    }

    // 버튼 생성
    createButton(text, onClick, className = 'terminal-button') {
        const button = document.createElement('button');
        button.className = className;
        button.textContent = text;
        button.onclick = onClick;
        return button;
    }

    // 스크롤 제어
    scrollToBottom() {
        this.container.scrollTop = this.container.scrollHeight;
    }

    // 모바일 감지
    isMobile() {
        return window.innerWidth <= 768;
    }

    // 터치 이벤트 처리
    handleTouchEvents() {
        let touchStartY = 0;
        
        this.container.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        });
        
        this.container.addEventListener('touchmove', (e) => {
            const touchY = e.touches[0].clientY;
            const deltaY = touchStartY - touchY;
            
            // 스크롤 처리
            this.container.scrollTop += deltaY;
            touchStartY = touchY;
        });
    }

    // 키보드 단축키 가이드
    showKeyboardGuide() {
        const guide = this.addLine('키보드 단축키:', 'text-secondary');
        this.addLine('1, 2: 언어 선택', 'text-muted');
        this.addLine('A, B, C, D, E: 답변 선택', 'text-muted');
        this.addLine('Enter: 확인', 'text-muted');
        this.addLine('', '');
        return guide;
    }

    // 에러 메시지 표시
    showError(message) {
        const errorLine = this.addLine(`오류: ${message}`, 'text-error');
        this.applyNeonEffect(errorLine, 'strong');
        return errorLine;
    }

    // 성공 메시지 표시
    showSuccess(message) {
        const successLine = this.addLine(`✓ ${message}`, 'text-success');
        this.applyNeonEffect(successLine, 'strong');
        return successLine;
    }

    // 경고 메시지 표시
    showWarning(message) {
        const warningLine = this.addLine(`⚠ ${message}`, 'text-warning');
        this.applyNeonEffect(warningLine);
        return warningLine;
    }

    // 디버그 모드
    enableDebug() {
        this.debug = true;
        console.log('Terminal debug mode enabled');
    }

    log(message) {
        if (this.debug) {
            console.log(`[Terminal] ${message}`);
        }
    }
}

// 전역 터미널 인스턴스
window.TerminalEngine = TerminalEngine;