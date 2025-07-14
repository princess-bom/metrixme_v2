# Matrix Me - 프론트엔드 개발자 작업지시서 💻

## 🎯 당신의 역할
**Matrix Me 프로젝트의 프론트엔드 개발자**로서 해커 터미널 스타일 웹사이트를 완성하는 것이 목표입니다.

## 📋 핵심 임무
AI 활용 유형 진단 웹사이트 "Matrix Me"를 **순수 ASCII 아트 + 해커 터미널 스타일**로 개발하세요.

### 필수 구현 사항
1. **터미널 UI** - 완전한 해커 터미널 인터페이스
2. **퀴즈 시스템** - 20문항 진단 퀴즈 (이미 완성된 데이터 사용)
3. **점수 계산** - 16개 유형 분류 알고리즘 (이미 완성됨)
4. **ASCII 아트** - 16개 타입별 순수 텍스트 아트
5. **반응형** - 터미널이 모든 기기에서 완벽 동작
6. **다국어** - 한국어/영어 지원
7. **타이핑 애니메이션** - 해커 느낌의 텍스트 효과

## 🛠️ 기술 스택 (엄격 준수)
```
언어: HTML5, CSS3, Vanilla JavaScript만
빌드: Vite 또는 11ty
스타일: 순수 CSS (프레임워크 금지)
폰트: Monospace 계열 (Monaco, Courier New)
호스팅: Netlify 또는 Vercel
상태관리: URL 파라미터 + sessionStorage
데이터베이스: 없음 (정적 파일만)
이미지: 0개 (순수 ASCII만)
```

## 📂 프로젝트 구조
```
src/
├── index.html              # 홈페이지 (터미널 부팅)
├── ko/                     # 한글 버전
│   ├── quiz/
│   │   └── index.html      # 퀴즈 페이지
│   └── result/
│       └── index.html      # 결과 페이지
├── en/                     # 영어 버전
│   ├── quiz/
│   │   └── index.html      # Quiz page
│   └── result/
│       └── index.html      # Result page
├── assets/
│   ├── css/
│   │   ├── terminal.css    # 터미널 스타일
│   │   └── mobile.css      # 모바일 최적화
│   ├── js/
│   │   ├── terminal.js     # 터미널 엔진
│   │   ├── quiz.js         # 퀴즈 로직
│   │   ├── ascii-art.js    # ASCII 아트 데이터
│   │   └── typing.js       # 타이핑 애니메이션
│   └── data/
│       ├── quiz-ko.json    # 한글 퀴즈 데이터
│       ├── quiz-en.json    # 영어 퀴즈 데이터
│       └── types.json      # 16개 유형 데이터
└── sw.js                   # 서비스워커 (선택사항)
```

## 🖤 터미널 디자인 시스템

### 컬러 시스템 (다크 온리)
```css
:root {
  /* 배경 */
  --bg-primary: #000000;
  --bg-secondary: #0A0A0A;
  --bg-terminal: #1A1A1A;
  
  /* 텍스트 (해커 컬러) */
  --text-primary: #00FF00;    /* 네온 그린 */
  --text-secondary: #00CCFF;  /* 사이버 블루 */
  --text-warning: #FF0066;    /* 네온 핑크 */
  --text-success: #00FF88;    /* 네온 민트 */
  --text-error: #FF3333;      /* 네온 레드 */
  
  /* 16개 타입별 네온 컬러 */
  --ctrl-color: #FF0040;      /* 조종왕 */
  --beta-color: #8A2BE2;      /* 얼리버드 */
  --core-color: #FF8C00;      /* 아날로그인간 */
  --hide-color: #696969;      /* 숨덕후 */
  --pick-color: #00FF7F;      /* 알짜배기 */
  --vibe-color: #FF1493;      /* 느낌충 */
  --flow-color: #1E90FF;      /* 완전체 */
  --sync-color: #FF4500;      /* 장인 */
  --pure-color: #E6E6FA;      /* 소심쟁이 */
  --nova-color: #00FFFF;      /* 미래인 */
  --echo-color: #C0C0C0;      /* 미니멀러 */
  --hype-color: #FFD700;      /* 광신도 */
  --mesh-color: #32CD32;      /* 돌다리왕 */
  --sage-color: #9370DB;      /* 현자 */
  --scan-color: #DC143C;      /* 의심덩어리 */
  --base-color: #DCDCDC;      /* 겁쟁이 */
}
```

### 터미널 폰트
```css
body {
  font-family: 'Monaco', 'Menlo', 'Courier New', 'D2Coding', monospace;
  font-size: 14px;
  line-height: 1.4;
  background: var(--bg-primary);
  color: var(--text-primary);
}
```

## 📊 퀴즈 데이터 (이미 완성됨!)

### 🎮 기존 완성된 퀴즈 사용
**"Matrix Me - 완전 웃긴 AI 유형 진단 퀴즈.md" 파일의 데이터를 그대로 사용하세요!**

```javascript
// 한글 퀴즈 데이터 구조 예시
const quizData = {
  ko: {
    questions: [
      {
        id: 1,
        question: "친구가 '야, 이 새로운 AI 완전 대박이야!'라고 보여주면?",
        answers: [
          { text: "그래? 나는 지금 쓰는 거로 충분해", scores: { pick: 3, core: 2 } },
          { text: "흠... 나중에 필요하면 써볼게", scores: { mesh: 3, pure: 2 } },
          { text: "오? 뭔데? 한번 보여줘봐", scores: { ctrl: 2, sage: 2 } },
          { text: "헉! 바로 다운받아야지!", scores: { beta: 3, nova: 2 } },
          { text: "잠깐, 나 이거보다 더 좋은 거 5개 알아!", scores: { flow: 3, hype: 2 } }
        ]
      }
      // ... 19개 더 (기존 데이터 그대로 사용)
    ],
    types: {
      ctrl: { name: "조종왕", desc: "모든 것을 통제하고 최적화하는 마스터" },
      beta: { name: "얼리버드", desc: "새로운 것을 먼저 시도하는 선구자" }
      // ... 14개 더
    }
  }
};
```

## 🎭 16개 타입 이모지 심볼 (완성됨)

### 타입별 이모지 심볼
- **조종왕 (CTRL)**: ♔ - 왕관으로 통제력 표현
- **얼리버드 (BETA)**: ⚡ - 번개로 빠른 선구자 정신 표현
- **아날로그인간 (CORE)**: 📝 - 손글씨로 전통적 방식 표현
- **숨덕후 (HIDE)**: 🤫 - 조용함으로 은밀함 표현
- **알짜배기 (PICK)**: 💎 - 다이아몬드로 핵심 가치 표현
- **느낌충 (VIBE)**: 🎵 - 음표로 감성적 접근 표현
- **완전체 (FLOW)**: 🚀 - 로켓으로 AI 의존도 표현
- **장인 (SYNC)**: 🔨 - 망치로 기술자 정신 표현
- **소심쟁이 (PURE)**: 😰 - 불안한 표정으로 신중함 표현
- **미래인 (NOVA)**: 🌟 - 별로 미래 지향성 표현
- **미니멀러 (ECHO)**: ◽ - 간단한 도형으로 최소주의 표현
- **광신도 (HYPE)**: 🔥 - 불꽃으로 열정 표현
- **돌다리왕 (MESH)**: 🛡️ - 방패로 신중함 표현
- **현자 (SAGE)**: 🧙 - 마법사로 지혜 표현
- **의심덩어리 (SCAN)**: 🔍 - 돋보기로 탐구심 표현
- **겁쟁이 (BASE)**: 😱 - 두려운 표정으로 기술 공포 표현

**ASCII 아트 대신 간단하고 직관적인 이모지 심볼로 타입을 표현합니다.**

## 💻 핵심 기능 구현

### 1. 터미널 UI 엔진
```javascript
class TerminalEngine {
  constructor(container) {
    this.container = container;
    this.currentLine = '';
    this.history = [];
  }
  
  typeText(text, speed = 50) {
    return new Promise((resolve) => {
      let i = 0;
      const interval = setInterval(() => {
        this.container.textContent += text[i];
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          resolve();
        }
      }, speed);
    });
  }
  
  addCursor() {
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.textContent = '_';
    this.container.appendChild(cursor);
  }
}
```

### 2. 퀴즈 엔진
```javascript
class QuizEngine {
  constructor(quizData) {
    this.questions = quizData.questions;
    this.currentQuestion = 0;
    this.answers = [];
    this.scores = {};
  }
  
  getCurrentQuestion() {
    return this.questions[this.currentQuestion];
  }
  
  submitAnswer(answerIndex) {
    const question = this.getCurrentQuestion();
    const answer = question.answers[answerIndex];
    
    // 점수 계산
    for (const [type, score] of Object.entries(answer.scores)) {
      this.scores[type] = (this.scores[type] || 0) + score;
    }
    
    this.answers.push(answerIndex);
    this.currentQuestion++;
  }
  
  getResult() {
    // 가장 높은 점수 타입 반환
    const maxScore = Math.max(...Object.values(this.scores));
    const resultType = Object.keys(this.scores).find(
      type => this.scores[type] === maxScore
    );
    return resultType;
  }
}
```

### 3. 페이지별 구현

#### 홈페이지 (터미널 부팅)
```html
<div class="terminal-container">
  <div class="terminal-header">
    <div class="terminal-controls">
      <span class="control red"></span>
      <span class="control yellow"></span>
      <span class="control green"></span>
    </div>
    <div class="terminal-title">Matrix Me 터미널 v2.1.0</div>
  </div>
  <div class="terminal-content" id="terminal">
    <!-- 타이핑 애니메이션으로 내용 채워짐 -->
  </div>
</div>
```

#### 퀴즈 페이지
```javascript
// 퀴즈 진행 로직
async function showQuestion(questionIndex) {
  const question = quiz.getCurrentQuestion();
  
  await terminal.typeText(`> 질문 #${questionIndex + 1}:\n`);
  await terminal.typeText(`> ${question.question}\n\n`);
  
  question.answers.forEach((answer, index) => {
    const letter = String.fromCharCode(65 + index); // A, B, C, D, E
    terminal.typeText(`${letter}) ${answer.text}\n`);
  });
  
  await terminal.typeText(`\n> 선택지를 입력하세요 (A-E): `);
  terminal.addCursor();
}
```

#### 결과 페이지
```javascript
// 결과 표시
async function showResult(resultType) {
  const typeData = quizData.types[resultType];
  const asciiArt = getAsciiArt(resultType);
  
  await terminal.typeText(`> AI DNA 분석 완료!\n`);
  await terminal.typeText(`> 당신의 유형: ${typeData.name}\n\n`);
  await terminal.typeText(asciiArt);
  await terminal.typeText(`\n> ${typeData.desc}\n\n`);
  await terminal.typeText(`[공유하기] [다시하기] [전체 유형 보기]\n`);
}
```

## 🔄 Git 워크플로우

### 브랜치 전략
```
main (프로덕션)
├── develop (개발 통합)
├── feature/frontend (개발자 작업)
└── feature/design (디자이너 작업)
```

### 작업 순서
1. **feature/frontend 브랜치에서 개발**
2. **커밋 메시지**: `feat: 터미널 UI 구현` 형식
3. **develop으로 PR 생성**
4. **디자이너와 협업 필요시 communicate**
5. **완성 후 main 브랜치로 배포**

### 커밋 규칙
```
feat: 새로운 기능 추가
fix: 버그 수정
style: CSS 스타일 변경
refactor: 코드 리팩토링
test: 테스트 추가/수정
docs: 문서 수정
```

## 📋 개발 체크리스트

### Phase 1: 터미널 기본 구조 (1-2일)
- [ ] 터미널 UI 프레임 구축
- [ ] 타이핑 애니메이션 엔진
- [ ] 커서 깜빡임 효과
- [ ] 네온 글로우 CSS 효과
- [ ] Mac 터미널 스타일 완성

### Phase 2: 퀴즈 시스템 (2-3일)
- [ ] 기존 퀴즈 데이터 JSON 변환
- [ ] 퀴즈 엔진 구현
- [ ] 진행률 표시 (████████░░ 80%)
- [ ] 키보드 입력 처리 (A, B, C, D, E)
- [ ] 점수 계산 로직

### Phase 3: ASCII 아트 결과 (3-4일)
- [ ] 16개 타입 ASCII 아트 제작
- [ ] 결과 페이지 터미널 UI
- [ ] 타입별 네온 컬러 적용
- [ ] 공유 기능 (URL 파라미터)

### Phase 4: 반응형 & 최적화 (1-2일)
- [ ] 모바일 터미널 최적화
- [ ] 터치 인터페이스 (가상 키보드)
- [ ] 로딩 성능 최적화
- [ ] 다국어 JSON 분리

### Phase 5: 최종 완성 (1일)
- [ ] 크로스 브라우저 테스트
- [ ] 접근성 최적화
- [ ] SEO 메타태그
- [ ] 배포 설정

## ⚠️ 중요 제약사항
- **절대 금지**: React, Vue 등 프레임워크 사용
- **절대 금지**: 이미지 파일 사용 (ASCII만)
- **절대 금지**: 외부 라이브러리 (순수 Vanilla JS만)
- **성능 목표**: 첫 페이지 로딩 1초 이내
- **호환성**: 최신 브라우저 지원

## 🎯 최종 목표
**"전세계에서 가장 독창적인 해커 터미널 스타일 AI 진단 웹사이트 완성"**

- 🖤 **순수 ASCII만** - 이미지 0개, 텍스트만으로 완성
- 💻 **완벽한 터미널 경험** - 진짜 해커 느낌
- ⚡ **초고속 로딩** - 몇 KB 용량
- 📱 **모든 기기 지원** - 반응형 터미널
- 🌍 **한글/영어** - 글로벌 서비스

**개발자님! 이 독창적인 Matrix Me를 완성해주세요!** 🚀✨