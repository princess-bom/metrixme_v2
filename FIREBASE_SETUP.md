# 🔥 Firebase 설정 가이드

## 1. Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com/) 접속
2. "프로젝트 추가" 클릭
3. 프로젝트 이름: `matrixme-app` (또는 원하는 이름)
4. Google 애널리틱스 활성화 (선택사항)

## 2. Firestore 데이터베이스 설정

1. Firebase 콘솔에서 "Firestore Database" 메뉴 이동
2. "데이터베이스 만들기" 클릭
3. **테스트 모드**로 시작 (나중에 보안 규칙 설정)
4. 위치: `asia-northeast3 (Seoul)` 선택

## 3. 웹 앱 등록

1. Firebase 콘솔에서 프로젝트 설정 (⚙️) 클릭
2. "앱" 섹션에서 웹 아이콘 `</>` 클릭
3. 앱 이름: `Matrix Me Web`
4. Firebase Hosting 설정: **체크 안함** (이미 GitHub Pages 사용)
5. "앱 등록" 클릭

## 4. 설정 코드 복사

Firebase SDK 구성 객체가 표시됩니다:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "matrixme-app.firebaseapp.com",
  projectId: "matrixme-app",
  storageBucket: "matrixme-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdefghijklmnop"
};
```

## 5. 설정 파일 업데이트

복사한 설정을 다음 파일에 적용:

### `/firebase-config.js` 업데이트
```javascript
const firebaseConfig = {
  // 여기에 실제 Firebase 설정 붙여넣기
  apiKey: "실제-api-키",
  authDomain: "실제-도메인.firebaseapp.com",
  projectId: "실제-프로젝트-id",
  storageBucket: "실제-스토리지.appspot.com",
  messagingSenderId: "실제-센더-id",
  appId: "실제-앱-id"
};
```

### `/src/assets/js/firebase-service.js` 업데이트
라인 20-27의 `firebaseConfig` 객체를 실제 값으로 교체:
```javascript
const firebaseConfig = {
  // 실제 Firebase 설정 값으로 교체
  apiKey: "AIzaSy...",
  authDomain: "matrixme-app.firebaseapp.com",
  // ... 나머지 설정
};
```

## 6. 보안 규칙 설정

Firestore Database > 규칙 탭에서 다음 규칙 적용:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 퀴즈 결과는 누구나 쓸 수 있음 (익명)
    match /quiz_results/{document} {
      allow write: if true;
      allow read: if false; // 개인정보 보호
    }
    
    // 통계는 누구나 읽을 수 있음
    match /statistics/{document} {
      allow read: if true;
      allow write: if false; // 서버에서만 업데이트
    }
  }
}
```

## 7. 익명 인증 활성화 (선택사항)

1. Authentication 메뉴 이동
2. "시작하기" 클릭
3. "로그인 방법" 탭 선택
4. "익명" 로그인 제공업체 활성화

## 8. 테스트

1. 로컬에서 `npm run dev` 실행
2. 브라우저 개발자 도구 콘솔 확인
3. "Firebase initialized successfully" 메시지 확인
4. 퀴즈 완료 후 결과 페이지에서 실시간 통계 확인

## 🎯 완료 후 기능

- ✅ 실시간 사용자 통계 수집
- ✅ 타입별 정확한 희귀도 계산
- ✅ 답변 일관성 기반 신뢰도 계산
- ✅ 오프라인 지원 (결과 큐잉)
- ✅ 개인정보 보호 (익명 데이터만)

## ⚠️ 주의사항

1. **API 키 보안**: 클라이언트 노출용 API 키는 안전함 (제한된 권한)
2. **보안 규칙**: 반드시 위의 규칙 적용
3. **비용 관리**: Firebase 무료 할당량 모니터링
4. **백업**: 중요한 통계 데이터는 정기적으로 백업

## 💡 다음 단계

1. 실제 사용자 데이터 수집 시작
2. 대시보드에서 실시간 통계 확인
3. 필요시 추가 분석 기능 구현
4. 성능 최적화 및 캐싱 개선