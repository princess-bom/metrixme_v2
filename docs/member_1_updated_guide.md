# Matrix Me - 클로드 코드 디자이너 완전 작업지시서 💻

## 🎯 프로젝트 미션
**순수 ASCII 아트 + 해커 터미널 스타일로 Matrix Me 웹사이트 완성**
- 이미지 파일 0개, 순수 텍스트만 사용
- 완전한 해커 터미널 경험 구현
- 16개 AI 유형 진단 시스템

---

## 🖤 핵심 디자인 컨셉

### 해커 터미널 스타일
```
> Matrix Me Terminal v2.1.0
> AI DNA Analysis System
> Connection established...
> Ready for input... _
```

### 컬러 시스템 (다크 온리)
```css
/* 배경 */
--bg-primary: #000000;
--bg-secondary: #0A0A0A;
--bg-card: #1A1A1A;

/* 텍스트 (해커 컬러) */
--text-primary: #00FF00;    /* 네온 그린 */
--text-secondary: #00CCFF;  /* 사이버 블루 */
--text-warning: #FF0066;    /* 네온 핑크 */
--text-success: #00FF88;    /* 네온 민트 */
--text-error: #FF3333;      /* 네온 레드 */

/* 16개 타입별 네온 컬러 */
--ctrl-color: #FF0040;      /* CTRL - 네온 레드 */
--beta-color: #8A2BE2;      /* BETA - 네온 바이올렛 */
--core-color: #FF8C00;      /* CORE - 네온 오렌지 */
--hide-color: #696969;      /* HIDE - 스틸 그레이 */
/* ... 나머지 12개도 정의 */
```

---

## 📱 구현할 페이지들

### 1. 홈페이지 (/) - 터미널 부팅 화면
```
┌─ Matrix Me Terminal v2.1.0 ────────────────────┐
│ > Matrix Me Terminal v2.1.0                    │
│ > AI DNA Analysis System                       │
│ > ████████████████████████████████ 100%        │
│ > Connection established...                    │
│                                                │
│ ███    ███  █████  ████████ ██████  ██ ██   ██ │
│ ████  ████ ██   ██    ██    ██   ██ ██  ██ ██  │
│ ██ ████ ██ ███████    ██    ██████  ██   ███   │
│ ██  ██  ██ ██   ██    ██    ██   ██ ██  ██ ██  │
│ ██      ██ ██   ██    ██    ██   ██ ██ ██   ██ │
│                                                │
│                     ███    ███ ███████         │
│                     ████  ████ ██              │
│                     ██ ████ ██ █████           │
│                     ██  ██  ██ ██              │
│                     ██      ██ ███████         │
│                                                │
│ > Welcome to Matrix Me                         │
│ > Your AI utilization DNA scanner              │
│ > Discover your AI personality type            │
│                                                │
│ [SCAN NOW] [ABOUT] [EXIT]                      │
│                                                │
│ > Ready for input... _                         │
└────────────────────────────────────────────────┘
```

**구현 요구사항:**
- 타이핑 애니메이션 (50ms/글자)
- 커서 깜빡임 (500ms 간격)
- 네온 글로우 효과
- Mac 터미널 스타일 프레임

### 2. 퀴즈 페이지 (/quiz/1~20) - 시스템 스캔
```
┌─ AI DNA Scanner ───────────────────────────────┐
│ > Initiating AI DNA scan...                    │
│ > Progress: ████████░░ 80% [16/20]              │
│                                                │
│ > Question #16:                                │
│ > When you discover a new AI tool, your first  │
│ > reaction is:                                 │
│                                                │
│ A) Download immediately and test █             │
│ B) Research reviews first                      │
│ C) Bookmark for later                          │
│ D) Ignore completely                           │
│                                                │
│ > Input your choice (A/B/C/D): _               │
│                                                │
│ [PREV] [NEXT] [SKIP]                           │
└────────────────────────────────────────────────┘
```

### 3. 로딩 페이지 - AI DNA 분석 중
```
┌─ Processing AI DNA ────────────────────────────┐
│ > Processing AI DNA data...                    │
│ > Analyzing behavioral patterns ⣾⣽⣻⢿⣿⣿         │
│                                                │
│ > CTRL probability: 87% ████████▓░             │
│ > BETA probability: 45% ████▓░░░░░             │
│ > CORE probability: 23% ██▓░░░░░░░             │
│ > HIDE probability: 12% █▓░░░░░░░░             │
│                                                │
│ > Analysis complete...                         │
│ > Generating profile...                        │
│ > ████████████████████████████████ 100%        │
└────────────────────────────────────────────────┘
```

### 4. 결과 페이지 (/result/[type]) - 16개 타입별
```
┌─ AI DNA Analysis Report ───────────────────────┐
│ > USER TYPE: CTRL (Control Freak)              │
│ > Probability: 91%                             │
│                                                │
│     ███████████████████████                    │
│     █ ♔♔♔ CTRL TYPE ♔♔♔ █                    │
│     █ ███████████████████ █                    │
│     █ █               █ █                    │
│     █ █  ◉ CONTROL ◉  █ █                    │
│     █ █       ───     █ █                    │
│     █ █   MASTER OF   █ █                    │
│     █ █   AI TOOLS    █ █                    │
│     █ █               █ █                    │
│     █ ███████████████████ █                    │
│     ███████████████████████                    │
│                                                │
│ > Profile Description:                         │
│ > You are the master of AI tools               │
│ > Control every parameter                      │
│ > Optimize everything to perfection            │
│                                                │
│ [SHARE] [RETEST] [VIEW ALL TYPES]              │
└────────────────────────────────────────────────┘
```

---

## 🎭 16개 AI 유형 ASCII 아트 디자인

### CTRL (조종왕) - 네온 레드
```
███████████████████████
█ ♔♔♔ CTRL TYPE ♔♔♔ █
█ ███████████████████ █
█ █               █ █
█ █  ◉ CONTROL ◉  █ █
█ █       ───     █ █
█ █   MASTER OF   █ █
█ █   AI TOOLS    █ █
█ █               █ █
█ ███████████████████ █
███████████████████████
```

### BETA (얼리버드) - 네온 바이올렛
```
⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡
█ ⚡⚡⚡ BETA TYPE ⚡⚡⚡ █
█ ████████████████████ █
█ █                █ █
█ █  ★ EARLY BIRD ★ █ █
█ █      ◡◡◡      █ █
█ █   FIRST TO    █ █
█ █   TRY NEW     █ █
█ █     TECH      █ █
█ ████████████████████ █
⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡
```

### HIDE (숨덕후) - 스틸 그레이
```
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
█ ◉◉◉ HIDE TYPE ◉◉◉ █
█ ████████████████████ █
█ █                █ █
█ █  ░ STEALTH  ░  █ █
█ █      ███      █ █
█ █   USES AI IN  █ █
█ █    SECRET     █ █
█ █               █ █
█ ████████████████████ █
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
```

### (나머지 13개 타입도 동일한 스타일로 제작 필요)

---

## 💻 기술 구현 요구사항

### HTML 구조
```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>Matrix Me - Terminal</title>
    <link rel="stylesheet" href="terminal.css">
</head>
<body>
    <div class="terminal-container">
        <div class="terminal-header">
            <div class="terminal-controls">
                <span class="control red"></span>
                <span class="control yellow"></span>
                <span class="control green"></span>
            </div>
            <div class="terminal-title">Matrix Me Terminal v2.1.0</div>
        </div>
        <div class="terminal-content">
            <!-- ASCII 아트 및 콘텐츠 -->
        </div>
    </div>
</body>
</html>
```

### CSS 스타일링
```css
/* 터미널 기본 스타일 */
body {
    background: var(--bg-primary);
    font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
    color: var(--text-primary);
    margin: 0;
    padding: 20px;
}

.terminal-container {
    max-width: 800px;
    margin: 0 auto;
    background: var(--bg-card);
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
}

/* 네온 글로우 효과 */
.neon-text {
    text-shadow: 
        0 0 5px currentColor,
        0 0 10px currentColor,
        0 0 15px currentColor;
}

/* 타이핑 애니메이션 */
@keyframes typing {
    from { width: 0; }
    to { width: 100%; }
}

/* 커서 깜빡임 */
@keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
}

.cursor {
    animation: blink 1s infinite;
}
```

### JavaScript 기능
```javascript
// 타이핑 애니메이션
function typeText(element, text, speed = 50) {
    let i = 0;
    const interval = setInterval(() => {
        element.textContent += text[i];
        i++;
        if (i >= text.length) {
            clearInterval(interval);
        }
    }, speed);
}

// 퀴즈 로직
const quiz = {
    questions: [...], // 20개 질문
    answers: [],
    currentQuestion: 0,
    
    calculateResult() {
        // 16개 타입 중 점수 계산
        // 가장 높은 점수 타입 반환
    }
};

// 네온 효과 토글
function addNeonEffect(element, color) {
    element.style.textShadow = `
        0 0 5px ${color},
        0 0 10px ${color},
        0 0 15px ${color}
    `;
}
```

---

## 🚀 구현 단계

### Phase 1: 기본 터미널 UI (1일)
- [x] 터미널 프레임 구조
- [x] 기본 CSS 스타일링
- [x] 네온 효과 구현
- [x] 타이핑 애니메이션

### Phase 2: 16개 ASCII 아트 제작 (2일)
- [x] CTRL, BETA, HIDE 등 16개 타입
- [x] 각 타입별 고유 디자인
- [x] 네온 컬러 적용
- [x] 반응형 레이아웃

### Phase 3: 퀴즈 시스템 (2일)
- [x] 20개 질문 데이터
- [x] 점수 계산 알고리즘
- [x] 프로그레스 바
- [x] 결과 페이지 연결

### Phase 4: 인터랙션 & 최적화 (1일)
- [x] 터미널 명령어 입력
- [x] 키보드 네비게이션
- [x] 모바일 반응형
- [x] 성능 최적화

---

## 📊 20개 진단 질문 (예시)

1. 새로운 AI 도구를 발견했을 때 첫 반응은?
2. AI 사용 시 가장 중요하게 생각하는 것은?
3. AI 결과물에 대한 당신의 태도는?
4. AI 도구의 설정을 조정할 때...
5. AI 관련 뉴스를 접했을 때...
(... 총 20개)

---

## 🎯 16개 AI 유형 정의

```
CTRL (조종왕) - 모든 것을 통제하고 최적화
BETA (얼리버드) - 새로운 것을 먼저 시도
CORE (아날로그인간) - 전통적 방식 선호
HIDE (숨덕후) - 은밀하게 AI 활용
PICK (알짜배기) - 핵심 기능만 사용
VIBE (느낌충) - 감정으로 AI 판단
FLOW (완전체) - 모든 기능 완벽 활용
SYNC (장인) - 완벽주의로 AI 사용
PURE (소심쟁이) - 조심스럽게 접근
NOVA (미래인) - 미래지향적 사고
ECHO (미니멀러) - 최소한만 사용
HYPE (광신도) - AI에 대한 맹신
MESH (돌다리왕) - 신중하게 검증
SAGE (현자) - 지혜롭게 활용
SCAN (의심덩어리) - 항상 의심하며 사용
BASE (겁쟁이) - AI를 두려워함
```

---

## 🔥 최종 목표

**"전세계에서 가장 독창적인 AI 유형 진단 터미널 완성"**

- 🖤 순수 ASCII 아트만 사용 (이미지 0개)
- 💻 완벽한 해커 터미널 경험
- ⚡ 초고속 로딩 (< 2초)
- 📱 모든 기기에서 완벽 동작
- 🌍 글로벌 호환성 100%

**쌤! 이걸로 진짜 혁신적인 Matrix Me를 만들어보세요!** 🚀✨