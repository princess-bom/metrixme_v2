# Matrix Me - AI Personality Quiz Terminal 🚀

해커 터미널 스타일의 AI 활용 유형 진단 웹사이트입니다.

## 🎯 프로젝트 개요

Matrix Me는 당신의 AI 활용 유형을 16가지 중에서 진단하는 독창적인 웹사이트입니다.
- 🖤 **순수 ASCII 아트만** 사용 (이미지 0개)
- 💻 **완벽한 터미널 경험** 제공
- ⚡ **초고속 로딩** (몇 KB 용량)
- 📱 **모든 기기 지원** (반응형 터미널)
- 🌍 **한글/영어** 동시 지원

## 🎭 16가지 AI 유형

### 한국어 버전
- 조종왕, 얼리버드, 아날로그인간, 숨덕후
- 알짜배기, 느낌충, 완전체, 장인
- 소심쟁이, 미래인, 미니멀러, 광신도
- 돌다리왕, 현자, 의심덩어리, 겁쟁이

### English Version
- Control Freak, Early Bird, Traditionalist, Stealth Expert
- Efficiency King, Vibe Checker, AI Addict, Specialist
- Anxiety Bot, Visionary, Minimalist, Evangelist
- Bridge Builder, Wise Counsel, Detective, Scaredy Cat

## 🚀 빠른 시작

### 개발 환경 설정
```bash
# 저장소 클론
git clone https://github.com/your-username/matrixme.git
cd matrixme

# 의존성 설치
npm install

# 개발 서버 시작
npm run dev
```

### 빌드 및 배포
```bash
# 프로덕션 빌드
npm run build

# 미리보기
npm run preview

# Netlify 배포
npm run deploy
```

## 🛠️ 기술 스택

### Frontend
- **HTML5** - 시맨틱 마크업
- **CSS3** - 순수 CSS (프레임워크 없음)
- **Vanilla JavaScript** - 라이브러리 없음
- **Vite** - 빌드 시스템
- **PWA** - 오프라인 지원

### 디자인
- **ASCII 아트** - 16개 유형별 독창적 디자인
- **터미널 UI** - 완전한 해커 터미널 경험
- **네온 컬러** - 16개 타입별 고유 색상
- **반응형** - 모든 기기 최적화

## 📂 프로젝트 구조

```
src/
├── index.html              # 메인 페이지 (언어 선택)
├── ko/                     # 한국어 버전
│   ├── quiz/
│   │   └── index.html      # 한글 퀴즈 페이지
│   └── result/
│       └── index.html      # 한글 결과 페이지
├── en/                     # 영어 버전
│   ├── quiz/
│   │   └── index.html      # 영어 퀴즈 페이지
│   └── result/
│       └── index.html      # 영어 결과 페이지
├── assets/
│   ├── css/
│   │   ├── terminal.css    # 터미널 스타일
│   │   └── mobile.css      # 모바일 최적화
│   ├── js/
│   │   ├── terminal.js     # 터미널 엔진
│   │   ├── quiz.js         # 퀴즈 엔진
│   │   ├── ascii-art.js    # ASCII 아트 데이터
│   │   └── typing.js       # 타이핑 애니메이션
│   └── data/
│       ├── quiz-ko.json    # 한글 퀴즈 데이터
│       └── quiz-en.json    # 영어 퀴즈 데이터
├── manifest.json           # PWA 매니페스트
└── sw.js                   # 서비스 워커
```

## 🎨 ASCII 아트 시스템

각 AI 유형별로 독창적인 ASCII 아트가 제작되었습니다:

### 조종왕 (Control Freak)
```
███████████████████████████████
█ ♔♔♔ 조종왕 타입 ♔♔♔ █
█ █████████████████████████ █
█ █  ◉ AI 완전 통제 ◉  █ █
█ █████████████████████████ █
███████████████████████████████
```

### 얼리버드 (Early Bird)
```
⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡
█ ⚡⚡⚡ 얼리버드 타입 ⚡⚡⚡ █
█ █  ★ 새로운 기술을 ★  █ █
█ █   가장 먼저 시도    █ █
⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡
```

## 🌍 다국어 지원

### 지원 언어
- 🇰🇷 **한국어** - 완전한 현지화
- 🇺🇸 **영어** - 완전한 현지화

### 구현 방식
- URL 기반 언어 구분 (`/ko/`, `/en/`)
- 각 언어별 독립적인 페이지 구조
- 언어별 최적화된 ASCII 아트
- 문화적 맥락을 고려한 번역

## 📱 PWA 기능

### 주요 기능
- **오프라인 지원** - 서비스 워커 캐싱
- **설치 가능** - 홈 화면에 추가
- **빠른 로딩** - 스태틱 에셋 캐싱
- **반응형** - 모든 기기 최적화

### 브라우저 지원
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- 모바일 브라우저 전체 지원

## 🚀 배포

### Netlify 배포
```bash
# 자동 배포
npm run deploy

# 또는 수동 배포
npm run build
netlify deploy --dir=dist --prod
```

### 환경 변수
```env
NODE_VERSION=18
```

## 🤝 기여하기

1. 저장소 포크
2. 피처 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경 사항 커밋 (`git commit -m 'Add amazing feature'`)
4. 브랜치 푸시 (`git push origin feature/amazing-feature`)
5. Pull Request 생성

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## ⚠️ 제약 사항

- React, Vue 등 프레임워크 사용 금지
- 이미지 파일 사용 금지 (ASCII 아트만)
- 외부 라이브러리 사용 금지
- 데이터베이스 사용 금지 (정적 파일만)

## 🎯 성능 목표

- ⚡ **첫 페이지 로딩**: 1초 이내
- 📱 **모바일 최적화**: 완벽 지원
- 🌐 **다국어 지원**: 한글/영어
- 🔄 **오프라인 지원**: PWA 기능

## 📞 문의

- 프로젝트 관련 문의: GitHub Issues
- 기술 지원: GitHub Discussions

---

**"전세계에서 가장 독창적인 해커 터미널 스타일 AI 진단 웹사이트"** 🚀✨
