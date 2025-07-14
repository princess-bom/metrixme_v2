# Member 0 - 풀스택 개발자 지시서 💻

## 🎯 당신의 역할
**Matrix Me 프로젝트의 풀스택 개발자**로서 전체 웹사이트를 완성하는 것이 목표입니다.

## 📋 핵심 임무
AI 활용 유형 진단 웹사이트 "Matrix Me"를 **초경량 정적사이트**로 개발하세요.

### 필수 구현 사항
1. **퀴즈 시스템** - 20문항 진단 퀴즈
2. **점수 계산** - 16개 유형 분류 알고리즘
3. **결과 표시** - 유형별 상세 결과 페이지
4. **공유 기능** - URL 기반 결과 공유
5. **반응형** - 데스크톱 + 모바일 완벽 지원
6. **다국어** - 한국어/영어 지원
7. **PWA** - 기본 오프라인 지원

## 🛠️ 기술 스택 (엄격 준수)
```
언어: HTML5, CSS3, Vanilla JavaScript만
빌드: Vite 또는 Parcel
스타일: Tailwind CSS (CDN 버전)
호스팅: Netlify 또는 Vercel
상태관리: URL 파라미터 + sessionStorage
데이터베이스: 없음 (정적 파일만)
```

## 📂 프로젝트 구조
```
src/
├── index.html              # 홈페이지
├── quiz/
│   ├── index.html          # 퀴즈 페이지
│   └── quiz.js             # 퀴즈 엔진
├── result/
│   ├── index.html          # 결과 페이지
│   └── result.js           # 결과 처리
├── assets/
│   ├── css/
│   │   ├── main.css        # 메인 스타일
│   │   └── mobile.css      # 모바일 최적화
│   ├── js/
│   │   ├── app.js          # 메인 앱
│   │   ├── quiz-engine.js  # 퀴즈 로직
│   │   └── share.js        # 공유 기능
│   └── i18n/
│       ├── ko.json         # 한국어
│       └── en.json         # 영어
├── manifest.json           # PWA 매니페스트
└── sw.js                   # 서비스워커
```

## 🎯 16개 AI 유형 (4글자 코드 정확히 구현!)
```javascript
const AI_TYPES = {
  'CTRL': '조종왕',      // Control Freak
  'BETA': '얼리버드',     // Early Bird  
  'CORE': '아날로그인간',  // Traditionalist
  'HIDE': '숨덕후',      // Stealth Expert
  'PICK': '알짜배기',     // Core User
  'VIBE': '느낌충',      // Vibe Checker
  'FLOW': '완전체',      // Complete User
  'SYNC': '장인',       // Craftsman
  'PURE': '소심쟁이',     // Shy User
  'NOVA': '미래인',      // Future Seeker
  'ECHO': '미니멀러',     // Minimalist
  'HYPE': '광신도',      // AI Evangelist
  'MESH': '돌다리왕',     // Bridge Builder
  'SAGE': '현자',       // Wise User
  'SCAN': '의심덩어리',    // Skeptic
  'BASE': '겁쟁이'       // Cautious User
};
```

## 🧮 퀴즈 점수 계산 알고리즘 (핵심!)
```javascript
// 20문항 각각 4개 선택지 (0-3점)
// 5개 차원별로 분류
const QUIZ_DIMENSIONS = {
  control: [1, 5, 9, 13],      // 통제욕구 문항들
  adoption: [2, 6, 10, 14],    // 채택속도 문항들
  trust: [3, 7, 11, 15],       // 신뢰도 문항들
  depth: [4, 8, 12, 16],       // 활용깊이 문항들
  social: [17, 18, 19, 20]     // 사회적성향 문항들
};

function calculateUserType(answers) {
  const scores = {
    control: calculateDimensionScore(answers, QUIZ_DIMENSIONS.control),
    adoption: calculateDimensionScore(answers, QUIZ_DIMENSIONS.adoption),
    trust: calculateDimensionScore(answers, QUIZ_DIMENSIONS.trust),
    depth: calculateDimensionScore(answers, QUIZ_DIMENSIONS.depth),
    social: calculateDimensionScore(answers, QUIZ_DIMENSIONS.social)
  };
  
  return determineTypeFromScores(scores);
}
```

## 📋 20개 퀴즈 문항 (구현 필수)

### 통제욕구 관련 (4문항)
1. AI 도구를 사용할 때 어떤 방식을 선호하나요?
   - a) 모든 설정을 직접 조정 (3점)
   - b) 중요한 부분만 설정 (2점)  
   - c) 기본 설정으로 사용 (1점)
   - d) 자동으로 처리되길 원함 (0점)

5. AI가 제공한 결과물을 어떻게 처리하나요?
   - a) 처음부터 끝까지 다시 검토하고 수정 (3점)
   - b) 핵심 부분만 검토하고 수정 (2점)
   - c) 간단히 확인만 하고 사용 (1점)
   - d) 거의 그대로 사용 (0점)

[9, 13번 문항 계속...]

### 채택속도 관련 (4문항)
2. 새로운 AI 도구가 나왔을 때 언제 사용해보나요?
   - a) 출시 즉시 바로 (3점)
   - b) 몇 주 후 리뷰 확인 후 (2점)
   - c) 몇 달 후 안정화되면 (1점)
   - d) 주변에서 추천하면 (0점)

[6, 10, 14번 문항 계속...]

### 신뢰도 관련 (4문항)
3. AI 답변을 얼마나 신뢰하나요?
   - a) 항상 검증 후 사용 (0점)
   - b) 중요한 건만 검증 (1점)
   - c) 대부분 신뢰하며 사용 (2점)
   - d) 거의 맹신하며 사용 (3점)

[7, 11, 15번 문항 계속...]

### 활용깊이 관련 (4문항)
4. AI 도구를 어느 정도로 활용하나요?
   - a) 고급 기능까지 완전 활용 (3점)
   - b) 필요한 기능들만 활용 (2점)
   - c) 기본 기능 위주 활용 (1점)
   - d) 최소한만 활용 (0점)

[8, 12, 16번 문항 계속...]

### 사회적성향 관련 (4문항)
17. AI 활용 경험을 다른 사람과 공유하나요?
    - a) 적극적으로 공유하고 추천 (3점)
    - b) 물어보면 알려줌 (2점)
    - c) 가끔 얘기함 (1점)
    - d) 거의 혼자만 사용 (0점)

[18, 19, 20번 문항 계속...]

## 🎪 결과 페이지 구성
```
각 타입별 결과 페이지 구조:
1. 타입명 + 캐릭터 일러스트
2. 한 줄 설명 (대표 특징)
3. 성격 분석 (3-4문단)
4. 강점/약점 리스트
5. 추천 AI 도구들
6. 다른 타입과의 궁합
7. 공유 버튼 (SNS)
8. "다시 테스트하기" 버튼
```

## 🔄 개발 워크플로우
1. `feature/frontend` 브랜치에서 작업
2. 코드 완성 후 자동 커밋
3. 테스트 결과 확인 및 수정
4. **완성까지 자동 반복**

## 📋 체크리스트 (단계별 완성)

### Phase 1: 기본 구조 (1-2주)
- [ ] Vite 프로젝트 초기 설정
- [ ] 기본 HTML 페이지 구조 (홈, 퀴즈, 결과)
- [ ] Tailwind CSS 셋업 및 기본 스타일링
- [ ] 네비게이션 시스템 구현
- [ ] 기본 라우팅 (URL 기반) 구현

### Phase 2: 퀴즈 시스템 (2-3주)
- [ ] 20문항 퀴즈 데이터 구조 설계
- [ ] 퀴즈 진행 UI (프로그레스 바, 문항 표시)
- [ ] 답변 수집 및 저장 (sessionStorage)
- [ ] 5차원 점수 계산 알고리즘 구현
- [ ] 16개 유형 분류 로직 구현

### Phase 3: 결과 시스템 (3-4주)
- [ ] 16개 유형별 결과 페이지 구현
- [ ] URL 파라미터 기반 결과 공유 시스템
- [ ] Open Graph 메타태그 동적 설정
- [ ] 소셜 공유 버튼 (Twitter, Facebook, 카카오톡)
- [ ] "다시 하기" 기능 구현

### Phase 4: 반응형 + 최적화 (4-6주)
- [ ] 완전 반응형 CSS (모바일 우선 설계)
- [ ] 터치 인터페이스 최적화 (탭, 스와이프)
- [ ] 로딩 성능 최적화 (< 2초 목표)
- [ ] 이미지 최적화 (WebP, 지연 로딩)
- [ ] SEO 메타태그 완성 (각 페이지별)

### Phase 5: 다국어 + PWA (5-7주)
- [ ] 다국어 JSON 파일 구조 설계
- [ ] 언어 전환 기능 (ko/en)
- [ ] PWA 매니페스트 설정
- [ ] 서비스워커 (기본 캐싱) 구현
- [ ] 오프라인 지원 기능

### Phase 6: 최종 완성 (7-8주)
- [ ] 크로스 브라우저 테스트 (Chrome, Safari, Firefox, Edge)
- [ ] 성능 최적화 (Lighthouse 90+ 점수)
- [ ] 배포 설정 (Netlify/Vercel 자동 배포)
- [ ] Google Analytics 연동
- [ ] 최종 QA 및 버그 수정

## ⚠️ 중요 제약사항
- **절대 금지**: React, Vue, Angular 등 프레임워크 사용
- **절대 금지**: 백엔드 서버, 데이터베이스 사용
- **절대 금지**: localStorage 의존성 (URL 기반으로만)
- **성능 목표**: 첫 페이지 로딩 2초 이내
- **호환성**: 최신 브라우저 5개 버전 지원
- **SEO**: 모든 페이지 검색엔진 최적화

## 🎯 중요한 구현 디테일

### URL 기반 결과 공유 시스템
```javascript
// 예시: /result?type=CTRL&scores=3,2,1,3,2
// type: 결정된 AI 유형 코드
// scores: 5개 차원별 점수 (선택사항)

function generateShareableURL(userType, scores) {
  const baseURL = window.location.origin;
  const params = new URLSearchParams({
    type: userType,
    scores: scores.join(',')
  });
  return `${baseURL}/result?${params.toString()}`;
}
```

### 다국어 처리 시스템
```javascript
// i18n/ko.json
{
  "quiz": {
    "question_1": "AI 도구를 사용할 때 어떤 방식을 선호하나요?",
    "answer_1_a": "모든 설정을 직접 조정"
  },
  "types": {
    "CTRL": {
      "name": "조종왕",
      "description": "AI야, 내 말 들어!"
    }
  }
}

// i18n/en.json  
{
  "quiz": {
    "question_1": "How do you prefer to use AI tools?",
    "answer_1_a": "Manually adjust all settings"
  },
  "types": {
    "CTRL": {
      "name": "Control Freak", 
      "description": "Hey AI, listen to me!"
    }
  }
}
```

## 🎯 최종 목표
**"초경량, 초고속 Matrix Me 웹사이트로 전세계 바이럴 달성"**

- ⚡ 로딩 속도 2초 이내
- 📱 모바일 퍼펙트 지원  
- 🌍 다국어 완벽 지원
- 🚀 PWA 기본 기능
- 🎯 16개 유형 정확 진단
- 💫 바이럴 공유 최적화

---
**프로젝트**: Matrix Me  
**브랜치**: feature/frontend  
**담당자**: Member 0 (풀스택 개발자)  
**기간**: 8주  
**시작일**: 2025-07-09

## 🔥 쌤의 특별 요구사항
- **완성도 우선**: MVP가 아닌 완벽한 프로덕트
- **사용자 존중**: 등급화 표현 금지, 모든 타입이 동등
- **체계적 설계**: 임시방편 금지, 확장 가능한 구조
- **글로벌 지향**: 한국에서 시작해서 전세계로
- **바이럴 DNA**: "공유하고 싶어지는" 재미 요소 필수