# Matrix Me 프로젝트 재구축 계획

## 1. 개요

본 문서는 기존 `Matrix Me` 웹 애플리케이션의 디자인을 100% 동일하게 유지하면서, 현대적인 웹 개발 기술 스택을 적용하여 코드의 유지보수성, 확장성, 안정성을 향상시키기 위한 재구축(Rebuild) 계획을 상세히 설명합니다.

## 2. 프로젝트 목표

*   **디자인 100% 유지**: 기존 애플리케이션의 모든 시각적 요소와 사용자 경험(UX)을 완벽하게 재현합니다.
*   **기술 스택 현대화**: React, TypeScript 등 최신 프레임워크 및 언어를 도입하여 개발 효율성과 코드 품질을 높입니다.
*   **유지보수성 향상**: 컴포넌트 기반 아키텍처와 타입 시스템을 통해 코드의 가독성과 재사용성을 증대시킵니다.
*   **확장성 확보**: 향후 기능 추가 및 변경에 용이한 구조를 설계합니다.
*   **안정성 강화**: 자동화된 테스트 도입으로 버그 발생 가능성을 줄이고 코드 변경에 대한 안정성을 확보합니다.

## 3. 제안 기술 스택

*   **프레임워크**: React (UI 컴포넌트 기반 개발)
*   **언어**: TypeScript (정적 타입 검사를 통한 안정성 확보)
*   **빌드 도구**: Vite (빠른 개발 서버 및 번들링, 기존 유지)
*   **상태 관리**: React Context API, `useState`, `useReducer` (React 내장 기능 활용)
*   **라우팅**: React Router (클라이언트 사이드 라우팅)
*   **스타일링**: CSS Modules (컴포넌트 스코프 스타일링)
*   **테스팅**: 
    *   단위/통합 테스트: Jest, React Testing Library
    *   E2E 테스트: Cypress 또는 Playwright

## 4. 작업 계획 (단계별 상세)

### Phase 1: 프로젝트 초기 설정 및 핵심 구조 구축

1.  **새 React + TypeScript 프로젝트 생성**: 
    *   Vite를 사용하여 새로운 React + TypeScript 프로젝트를 생성합니다.
    *   `npm create vite@latest matrixme-rebuild -- --template react-ts`
2.  **기존 `package.json` 의존성 분석 및 설치**: 
    *   기존 `matrixme/package.json` 파일을 분석하여 필요한 의존성(예: `react`, `react-dom` 등)을 새 프로젝트에 설치합니다.
    *   `npm install`
3.  **기본 파일 구조 설정**: 
    *   `src` 디렉토리 내부에 `components`, `pages`, `hooks`, `utils`, `assets` 등의 폴더를 생성하여 모듈화된 구조를 만듭니다.
    *   `src/assets` 내부에 기존 `src/assets`의 `css`, `data`, `icons`, `images`, `js` 폴더를 복사합니다.
4.  **Git 초기화 및 `.gitignore` 설정**: 
    *   새 프로젝트에 Git을 초기화하고, `.gitignore` 파일을 설정하여 불필요한 파일(예: `node_modules`, `dist`)이 커밋되지 않도록 합니다.

### Phase 2: 컴포넌트 마이그레이션 및 스타일링

1.  **기존 HTML 구조 분석**: 
    *   `src/index.html` 및 `ko/quiz/index.html`, `en/quiz/index.html` 등의 기존 HTML 구조를 분석하여 React 컴포넌트로 분리할 단위를 파악합니다.
2.  **기존 CSS 파일 마이그레이션**: 
    *   `src/assets/css` 내의 `accessibility.css`, `mobile.css`, `terminal.css` 파일을 CSS Modules 형식으로 변환하거나, 필요에 따라 전역 스타일로 설정합니다.
    *   각 컴포넌트에 필요한 스타일은 해당 컴포넌트의 CSS Module 파일(`ComponentName.module.css`)로 분리합니다.
3.  **핵심 UI 컴포넌트 개발**: 
    *   터미널 화면, 입력 필드, 출력 영역 등 핵심 UI 요소를 React 컴포넌트로 개발합니다.
    *   기존 `ascii-art.js`, `responsive-separator.js`, `terminal.js`, `typing.js` 등의 JavaScript 로직을 React 컴포넌트 또는 커스텀 훅으로 포팅합니다.
4.  **이미지 및 아이콘 경로 조정**: 
    *   기존 `src/assets/images` 및 `src/assets/icons`에 있는 이미지 및 아이콘 파일의 경로를 React 프로젝트에 맞게 조정하고, 컴포넌트에서 올바르게 참조하도록 합니다.

### Phase 3: 라우팅 및 데이터 통합

1.  **React Router 설정**: 
    *   `react-router-dom` 라이브러리를 설치하고, `App.tsx` 또는 `main.tsx` 파일에 라우팅 설정을 추가합니다.
    *   `/`, `/ko/quiz`, `/en/quiz`, `/ko/result`, `/en/result` 등 기존 경로에 해당하는 라우트를 정의합니다.
2.  **퀴즈 데이터 통합**: 
    *   `src/assets/data/quiz-ko.json` 및 `quiz-en.json` 파일을 불러와 React 컴포넌트에서 사용할 수 있도록 처리합니다.
    *   TypeScript 인터페이스를 정의하여 퀴즈 데이터의 구조를 명확히 합니다.
3.  **퀴즈 로직 포팅**: 
    *   기존 `quiz.js`의 퀴즈 진행 로직(질문 표시, 답변 처리, 결과 계산 등)을 React 컴포넌트 및 커스텀 훅으로 포팅합니다.
    *   `useState`와 `useReducer`를 활용하여 퀴즈의 현재 상태를 관리합니다.
4.  **다국어 지원 구현**: 
    *   React Context API를 활용하여 언어 설정을 전역적으로 관리하고, 퀴즈 데이터 및 UI 텍스트를 동적으로 변경할 수 있도록 구현합니다.

### Phase 4: 테스팅 및 코드 리팩토링

1.  **단위/통합 테스트 작성**: 
    *   Jest와 React Testing Library를 사용하여 핵심 컴포넌트, 커스텀 훅, 유틸리티 함수에 대한 단위 및 통합 테스트 코드를 작성합니다.
    *   특히 퀴즈 로직과 같은 중요한 비즈니스 로직에 대한 테스트 커버리지를 확보합니다.
2.  **E2E 테스트 작성**: 
    *   Cypress 또는 Playwright를 사용하여 사용자 흐름(예: 퀴즈 시작 -> 답변 선택 -> 결과 확인)에 대한 E2E 테스트를 작성합니다.
3.  **코드 리팩토링 및 최적화**: 
    *   재구축 과정에서 발생할 수 있는 비효율적인 코드나 중복 코드를 리팩토링합니다.
    *   React의 성능 최적화 기법(예: `React.memo`, `useCallback`, `useMemo`)을 적용하여 렌더링 성능을 개선합니다.
4.  **코드 스타일 및 린팅 설정**: 
    *   ESLint와 Prettier를 설정하여 코드 스타일을 통일하고 잠재적인 오류를 미리 방지합니다.

### Phase 5: 배포 준비

1.  **빌드 스크립트 확인**: 
    *   `package.json`의 빌드 스크립트(`vite build`)가 올바르게 작동하는지 확인합니다.
2.  **Netlify 배포 설정**: 
    *   기존 `netlify.toml` 파일을 참고하여 새 프로젝트의 빌드 설정 및 배포 설정을 확인하거나 업데이트합니다.
    *   Netlify를 통해 재구축된 애플리케이션을 배포하고, 기존 URL과 동일하게 서비스될 수 있도록 설정합니다.

## 5. 예상되는 도전 과제

*   **디자인 100% 재현**: 기존 CSS 및 JavaScript 로직을 React 컴포넌트와 CSS Modules로 정확히 포팅하는 것이 가장 큰 도전 과제가 될 수 있습니다. 특히 터미널 애니메이션 및 타이핑 효과의 미세한 디테일을 재현하는 데 주의가 필요합니다.
*   **성능 최적화**: 기존 JavaScript 로직이 React의 렌더링 사이클과 잘 통합되도록 성능을 고려한 구현이 필요합니다.

## 6. 결론

본 계획에 따라 `Matrix Me` 프로젝트를 재구축함으로써, 기존의 훌륭한 디자인과 사용자 경험을 유지하면서도, 현대적인 웹 기술의 장점을 최대한 활용하여 더욱 견고하고 유지보수하기 쉬운 애플리케이션으로 거듭날 수 있을 것입니다. 각 단계별로 철저한 검증과 테스트를 통해 안정적인 전환을 목표로 합니다.
