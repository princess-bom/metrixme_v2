class TypingEngine {
    constructor() {
        this.currentText = '';
        this.isTyping = false;
        this.speed = 50;
        this.cursorChar = '_';
    }

    // 타이핑 애니메이션
    async typeText(element, text, speed = this.speed) {
        if (this.isTyping) return;
        
        this.isTyping = true;
        element.textContent = '';
        
        for (let i = 0; i < text.length; i++) {
            element.textContent += text[i];
            
            // 특수 문자는 더 빠르게
            if (text[i] === ' ') {
                await this.delay(speed * 0.3);
            } else if (text[i] === '\n') {
                await this.delay(speed * 2);
            } else {
                await this.delay(speed);
            }
        }
        
        this.isTyping = false;
    }

    // 한 글자씩 지우기
    async deleteText(element, speed = this.speed * 0.5) {
        if (this.isTyping) return;
        
        this.isTyping = true;
        const text = element.textContent;
        
        for (let i = text.length; i >= 0; i--) {
            element.textContent = text.substring(0, i);
            await this.delay(speed);
        }
        
        this.isTyping = false;
    }

    // 타이핑 후 커서 추가
    async typeWithCursor(element, text, speed = this.speed) {
        await this.typeText(element, text, speed);
        this.addCursor(element);
    }

    // 커서 추가
    addCursor(element) {
        const cursor = document.createElement('span');
        cursor.className = 'cursor';
        cursor.textContent = this.cursorChar;
        element.appendChild(cursor);
    }

    // 커서 제거
    removeCursor(element) {
        const cursor = element.querySelector('.cursor');
        if (cursor) {
            cursor.remove();
        }
    }

    // 다중 라인 타이핑
    async typeLines(container, lines, speed = this.speed) {
        for (let i = 0; i < lines.length; i++) {
            const line = document.createElement('div');
            line.className = 'boot-line';
            container.appendChild(line);
            
            await this.typeText(line, lines[i], speed);
            
            // 빈 줄은 더 빠르게 처리
            if (lines[i].trim() === '') {
                await this.delay(speed * 0.5);
            } else {
                await this.delay(speed * 3);
            }
        }
    }

    // 프롬프트 스타일 타이핑
    async typePrompt(container, prompt, text, speed = this.speed) {
        const line = document.createElement('div');
        line.className = 'input-line';
        
        const promptSpan = document.createElement('span');
        promptSpan.className = 'prompt';
        promptSpan.textContent = prompt;
        
        const textSpan = document.createElement('span');
        textSpan.className = 'input-text';
        
        line.appendChild(promptSpan);
        line.appendChild(textSpan);
        container.appendChild(line);
        
        await this.typeText(textSpan, text, speed);
        this.addCursor(line);
        
        return line;
    }

    // 코드 스타일 타이핑
    async typeCode(element, code, speed = this.speed * 0.8) {
        element.style.fontFamily = 'monospace';
        element.style.whiteSpace = 'pre';
        
        await this.typeText(element, code, speed);
    }

    // 컬러 타이핑 (각 글자마다 다른 색상)
    async typeColorful(element, text, colors, speed = this.speed) {
        if (this.isTyping) return;
        
        this.isTyping = true;
        element.innerHTML = '';
        
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.textContent = text[i];
            span.style.color = colors[i % colors.length];
            element.appendChild(span);
            
            await this.delay(speed);
        }
        
        this.isTyping = false;
    }

    // 글리치 효과 타이핑
    async typeGlitch(element, text, speed = this.speed) {
        if (this.isTyping) return;
        
        this.isTyping = true;
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        for (let i = 0; i < text.length; i++) {
            // 글리치 효과 (3번 반복)
            for (let j = 0; j < 3; j++) {
                const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
                element.textContent = text.substring(0, i) + randomChar;
                await this.delay(speed * 0.2);
            }
            
            // 실제 글자 표시
            element.textContent = text.substring(0, i + 1);
            await this.delay(speed);
        }
        
        this.isTyping = false;
    }

    // 매트릭스 스타일 타이핑
    async typeMatrix(element, text, speed = this.speed) {
        if (this.isTyping) return;
        
        this.isTyping = true;
        const matrixChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        
        for (let i = 0; i < text.length; i++) {
            // 매트릭스 효과
            for (let j = 0; j < 5; j++) {
                const randomChar = matrixChars[Math.floor(Math.random() * matrixChars.length)];
                element.textContent = text.substring(0, i) + randomChar;
                element.style.color = '#00FF00';
                await this.delay(speed * 0.1);
            }
            
            // 실제 글자 표시
            element.textContent = text.substring(0, i + 1);
            await this.delay(speed);
        }
        
        this.isTyping = false;
    }

    // 랜덤 속도 타이핑 (인간적인 느낌)
    async typeHuman(element, text, baseSpeed = this.speed) {
        if (this.isTyping) return;
        
        this.isTyping = true;
        element.textContent = '';
        
        for (let i = 0; i < text.length; i++) {
            element.textContent += text[i];
            
            // 랜덤 속도 (±50% 변화)
            const randomSpeed = baseSpeed + (Math.random() - 0.5) * baseSpeed;
            await this.delay(Math.max(10, randomSpeed));
        }
        
        this.isTyping = false;
    }

    // 단어 단위 타이핑
    async typeWords(element, text, speed = this.speed * 10) {
        if (this.isTyping) return;
        
        this.isTyping = true;
        const words = text.split(' ');
        element.textContent = '';
        
        for (let i = 0; i < words.length; i++) {
            element.textContent += words[i];
            if (i < words.length - 1) {
                element.textContent += ' ';
            }
            await this.delay(speed);
        }
        
        this.isTyping = false;
    }

    // 진행률과 함께 타이핑
    async typeWithProgress(element, text, progressCallback, speed = this.speed) {
        if (this.isTyping) return;
        
        this.isTyping = true;
        element.textContent = '';
        
        for (let i = 0; i < text.length; i++) {
            element.textContent += text[i];
            
            // 진행률 콜백 호출
            if (progressCallback) {
                progressCallback(i + 1, text.length);
            }
            
            await this.delay(speed);
        }
        
        this.isTyping = false;
    }

    // 타이핑 중단
    stopTyping() {
        this.isTyping = false;
    }

    // 타이핑 상태 확인
    isCurrentlyTyping() {
        return this.isTyping;
    }

    // 속도 설정
    setSpeed(speed) {
        this.speed = speed;
    }

    // 커서 문자 변경
    setCursorChar(char) {
        this.cursorChar = char;
    }

    // 딜레이 함수
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // 타이핑 사운드 효과 (선택사항)
    playTypingSound() {
        // 웹 오디오 API를 사용한 타이핑 사운드
        // 실제 구현시 오디오 파일 사용 또는 합성음 생성
        if (window.AudioContext && this.enableSound) {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            gainNode.gain.value = 0.1;
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.1);
        }
    }

    // 사운드 활성화/비활성화
    enableTypingSound(enable = true) {
        this.enableSound = enable;
    }

    // 반응형 속도 조정
    adjustSpeedForDevice() {
        const isMobile = window.innerWidth <= 768;
        const isSlowDevice = navigator.hardwareConcurrency < 4;
        
        if (isMobile || isSlowDevice) {
            this.speed = Math.max(this.speed * 1.5, 75);
        }
    }

    // 접근성 고려 (애니메이션 감소 설정)
    respectReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            this.speed = 1; // 거의 즉시 표시
        }
    }
}

// 전역 타이핑 엔진 인스턴스
window.TypingEngine = TypingEngine;