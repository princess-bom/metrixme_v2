# 🎯 Matrix Me 공유 페이지 + 이미지 다운로드 완전 구현 가이드

## 🚀 개요
피그마 디자인을 100% 그대로 구현하는 Matrix Me 공유 페이지와 클라이언트 사이드 이미지 다운로드 기능의 완전한 구현 가이드입니다.

---

## 📱 피그마 디자인 정확한 스펙

### 🖥️ **데스크톱 버전** (1200px × 668px)
- **공유 카드**: 800px × 588px
- **위치**: 중앙 정렬 (x: 200px, y: 40px)
- **모서리**: 12px 둥근 모서리
- **배경**: #000000 (전체), #0a0a0a (카드)
- **테두리**: #333333, 1px

### 📱 **태블릿 버전** (768px × 550px)
- **공유 카드**: 600px × 486px
- **위치**: 중앙 정렬 (x: 84px, y: 32px)
- **모서리**: 10px 둥근 모서리

### 📱 **모바일 버전** (375px × 447px)
- **공유 카드**: 335px × 407px
- **위치**: 중앙 정렬 (x: 20px, y: 20px)
- **모서리**: 8px 둥근 모서리

### 📸 **인스타그램 버전** (800px × 800px)
- **공유 카드**: 720px × 720px
- **위치**: 중앙 정렬 (x: 40px, y: 40px)
- **모서리**: 16px 둥근 모서리

---

## 🎨 정확한 컬러 & 타이포그래피

### **컬러 시스템**
```css
:root {
  /* 배경 */
  --page-bg: #000000;
  --card-bg: #0a0a0a;
  --card-border: #333333;
  --type-box-bg: #1a1a1a;
  --type-border: #1e90ff;
  --divider: #333333;
  
  /* 네온 컬러 */
  --matrix-blue: #00ccff;    /* MATRIX ME 제목 */
  --system-green: #00ff88;   /* 시스템 텍스트 */
  --type-blue: #1e90ff;      /* FLOW 타입명 */
  --detection-pink: #ff0066; /* USER TYPE DETECTED */
  --rarity-gold: #ffd700;    /* 희귀도 */
  --text-white: #ffffff;     /* 일반 텍스트 */
}
```

### **폰트 시스템**
```css
font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;

/* 데스크톱 폰트 크기 */
.header-title { font-size: 32px; font-weight: 700; } /* MATRIX ME */
.header-subtitle { font-size: 18px; font-weight: 400; } /* AI DNA Analysis System */
.detection-text { font-size: 20px; font-weight: 700; } /* USER TYPE DETECTED */
.type-name { font-size: 48px; font-weight: 700; } /* FLOW */
.type-description { font-size: 20px; font-weight: 500; } /* Full Load Output Warrior */
.type-quote { font-size: 18px; font-weight: 400; } /* AI 없으면 숨도 못 쉬어! */
.match-label { font-size: 18px; font-weight: 500; } /* Neural Match */
.match-percent { font-size: 24px; font-weight: 700; } /* 96% */
.confirmed { font-size: 18px; font-weight: 700; } /* CONFIRMED */
.rarity { font-size: 18px; font-weight: 700; } /* 희귀도 */
.footer-text { font-size: 16px; font-weight: 400; } /* Discover your AI DNA */
.app-name { font-size: 22px; font-weight: 700; } /* MATRIXME.APP */

/* 태블릿 폰트 크기 */
.tablet .header-title { font-size: 28px; }
.tablet .header-subtitle { font-size: 16px; }
.tablet .detection-text { font-size: 18px; }
.tablet .type-name { font-size: 40px; }
.tablet .type-description { font-size: 16px; }
.tablet .type-quote { font-size: 16px; }
.tablet .match-percent { font-size: 20px; }
.tablet .app-name { font-size: 18px; }

/* 모바일 폰트 크기 */
.mobile .header-title { font-size: 24px; }
.mobile .header-subtitle { font-size: 14px; }
.mobile .detection-text { font-size: 16px; }
.mobile .type-name { font-size: 32px; }
.mobile .type-description { font-size: 14px; }
.mobile .type-quote { font-size: 14px; }
.mobile .match-label { font-size: 14px; }
.mobile .match-percent { font-size: 16px; }
.mobile .confirmed { font-size: 14px; }
.mobile .rarity { font-size: 14px; }
.mobile .footer-text { font-size: 12px; }
.mobile .app-name { font-size: 16px; }

/* 인스타그램 폰트 크기 */
.instagram .header-title { font-size: 36px; }
.instagram .header-subtitle { font-size: 20px; }
.instagram .detection-text { font-size: 24px; }
.instagram .type-name { font-size: 56px; }
.instagram .type-description { font-size: 24px; }
.instagram .type-quote { font-size: 22px; }
.instagram .match-label { font-size: 22px; }
.instagram .match-percent { font-size: 28px; }
.instagram .confirmed { font-size: 22px; }
.instagram .rarity { font-size: 22px; }
.instagram .footer-text { font-size: 18px; }
.instagram .app-name { font-size: 26px; }
```

---

## 🏗️ HTML 구조 (피그마 디자인 그대로)

```html
<div class="share-page-container">
  <div class="share-card" id="share-card">
    <!-- 헤더 섹션 -->
    <div class="header-section">
      <h1 class="header-title">MATRIX ME</h1>
      <p class="header-subtitle">AI DNA Analysis System</p>
      <div class="divider"></div>
    </div>
    
    <!-- 결과 섹션 -->
    <div class="result-section">
      <p class="detection-text">> USER TYPE DETECTED:</p>
      
      <!-- 타입 디스플레이 박스 -->
      <div class="type-display">
        <h2 class="type-name">FLOW</h2>
        <p class="type-description">(Full Load Output Warrior)</p>
        <div class="divider-small"></div>
        <p class="type-quote">"AI 없으면 숨도 못 쉬어!"</p>
      </div>
      
      <!-- 매치 정보 -->
      <div class="match-info">
        <span class="match-label">> Neural Match:</span>
        <span class="match-percent">96%</span>
        <span class="confirmed">CONFIRMED</span>
      </div>
      
      <!-- 희귀도 -->
      <p class="rarity">> 희귀도: 레전더리 타입 (상위 1%)</p>
    </div>
    
    <!-- 푸터 섹션 -->
    <div class="footer-section">
      <div class="divider"></div>
      <p class="footer-text">Discover your AI DNA type</p>
      <p class="app-name">MATRIXME.APP</p>
    </div>
  </div>
  
  <!-- 공유 액션 버튼들 -->
  <div class="share-actions">
    <button class="download-btn" onclick="downloadShareImage()">
      📥 이미지 다운로드
    </button>
    <button class="copy-link-btn" onclick="copyShareLink()">
      🔗 링크 복사
    </button>
    <button class="share-social-btn" onclick="shareToSocial()">
      📱 소셜 공유
    </button>
  </div>
</div>
```

---

## 🎯 CSS 구현 (피그마 스펙 그대로)

### **기본 컨테이너**
```css
.share-page-container {
  min-height: 100vh;
  background: var(--page-bg);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-family: 'JetBrains Mono', monospace;
}

.share-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  position: relative;
  display: flex;
  flex-direction: column;
}

/* 데스크톱 */
.share-card {
  width: 800px;
  height: 588px;
  border-radius: 12px;
  padding: 40px;
}

/* 태블릿 */
@media (max-width: 1023px) and (min-width: 768px) {
  .share-card {
    width: 600px;
    height: 486px;
    border-radius: 10px;
    padding: 32px;
  }
}

/* 모바일 */
@media (max-width: 767px) {
  .share-card {
    width: 335px;
    height: 407px;
    border-radius: 8px;
    padding: 20px;
  }
}

/* 인스타그램 (별도 클래스) */
.share-card.instagram {
  width: 720px;
  height: 720px;
  border-radius: 16px;
  padding: 60px;
}
```

### **헤더 섹션**
```css
.header-section {
  text-align: center;
  margin-bottom: 24px;
}

.header-title {
  color: var(--matrix-blue);
  margin: 0 0 16px 0;
  line-height: 1.2;
}

.header-subtitle {
  color: var(--system-green);
  margin: 0 0 16px 0;
  line-height: 1.2;
}

.divider {
  height: 2px;
  background: var(--divider);
  width: 100%;
  margin: 0;
}

/* 태블릿 */
@media (max-width: 1023px) and (min-width: 768px) {
  .header-section {
    margin-bottom: 20px;
  }
  
  .divider {
    height: 2px;
  }
}

/* 모바일 */
@media (max-width: 767px) {
  .header-section {
    margin-bottom: 16px;
  }
  
  .divider {
    height: 1px;
  }
}

/* 인스타그램 */
.instagram .divider {
  height: 3px;
}
```

### **결과 섹션**
```css
.result-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.detection-text {
  color: var(--detection-pink);
  margin: 0 0 32px 0;
  line-height: 1.2;
}

.type-display {
  background: var(--type-box-bg);
  border: 2px solid var(--type-border);
  border-radius: 8px;
  padding: 32px 24px;
  margin: 0 0 24px 0;
}

.type-name {
  color: var(--type-blue);
  margin: 0 0 16px 0;
  line-height: 1.2;
}

.type-description {
  color: var(--type-blue);
  margin: 0 0 16px 0;
  line-height: 1.2;
}

.divider-small {
  height: 1px;
  background: var(--divider);
  width: 100%;
  margin: 0 0 16px 0;
}

.type-quote {
  color: var(--text-white);
  margin: 0;
  line-height: 1.2;
}

.match-info {
  margin: 0 0 16px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.match-label {
  color: var(--matrix-blue);
}

.match-percent {
  color: var(--type-blue);
}

.confirmed {
  color: var(--system-green);
}

.rarity {
  color: var(--rarity-gold);
  margin: 0;
  line-height: 1.2;
}

/* 태블릿 */
@media (max-width: 1023px) and (min-width: 768px) {
  .detection-text {
    margin-bottom: 24px;
  }
  
  .type-display {
    border-radius: 6px;
    padding: 24px 20px;
    margin-bottom: 20px;
  }
  
  .match-info {
    margin-bottom: 12px;
  }
}

/* 모바일 */
@media (max-width: 767px) {
  .detection-text {
    margin-bottom: 20px;
  }
  
  .type-display {
    border-radius: 6px;
    padding: 20px 16px;
    margin-bottom: 16px;
  }
  
  .match-info {
    flex-direction: column;
    gap: 4px;
    margin-bottom: 12px;
  }
}

/* 인스타그램 */
.instagram .type-display {
  border-radius: 12px;
  padding: 40px 32px;
}

.instagram .divider-small {
  height: 2px;
}
```

### **푸터 섹션**
```css
.footer-section {
  text-align: center;
  margin-top: 24px;
}

.footer-text {
  color: var(--matrix-blue);
  margin: 12px 0 8px 0;
  line-height: 1.2;
}

.app-name {
  color: var(--system-green);
  margin: 0;
  line-height: 1.2;
}

/* 태블릿 */
@media (max-width: 1023px) and (min-width: 768px) {
  .footer-section {
    margin-top: 20px;
  }
  
  .footer-text {
    margin: 10px 0 6px 0;
  }
}

/* 모바일 */
@media (max-width: 767px) {
  .footer-section {
    margin-top: 16px;
  }
  
  .footer-text {
    margin: 8px 0 4px 0;
  }
}
```

### **공유 액션 버튼**
```css
.share-actions {
  margin-top: 32px;
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.share-actions button {
  background: var(--type-box-bg);
  border: 1px solid var(--matrix-blue);
  color: var(--matrix-blue);
  padding: 12px 20px;
  border-radius: 6px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
}

.download-btn {
  border-color: var(--system-green);
  color: var(--system-green);
}

.copy-link-btn {
  border-color: var(--matrix-blue);
  color: var(--matrix-blue);
}

.share-social-btn {
  border-color: var(--detection-pink);
  color: var(--detection-pink);
}

/* 호버 효과 */
.download-btn:hover {
  background: var(--system-green);
  color: var(--page-bg);
  box-shadow: 0 0 20px var(--system-green);
}

.copy-link-btn:hover {
  background: var(--matrix-blue);
  color: var(--page-bg);
  box-shadow: 0 0 20px var(--matrix-blue);
}

.share-social-btn:hover {
  background: var(--detection-pink);
  color: var(--page-bg);
  box-shadow: 0 0 20px var(--detection-pink);
}

/* 모바일 */
@media (max-width: 767px) {
  .share-actions {
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
  
  .share-actions button {
    width: 100%;
    max-width: 280px;
  }
}
```

---

## 🖼️ 이미지 다운로드 기능 구현

### **필요한 라이브러리**
```html
<!-- HTML2Canvas 라이브러리 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
```

### **메인 다운로드 함수**
```javascript
async function downloadShareImage() {
  try {
    // 1. 로딩 상태 표시
    showLoading();
    
    // 2. 공유 카드 요소 선택
    const shareCard = document.getElementById('share-card');
    
    // 3. html2canvas 옵션 설정
    const canvas = await html2canvas(shareCard, {
      backgroundColor: '#0a0a0a',
      scale: 2, // 고해상도 (레티나 대응)
      useCORS: true,
      allowTaint: true,
      foreignObjectRendering: true,
      logging: false,
      width: shareCard.offsetWidth,
      height: shareCard.offsetHeight,
      x: 0,
      y: 0
    });
    
    // 4. Canvas를 이미지로 변환
    const imageData = canvas.toDataURL('image/png', 1.0);
    
    // 5. 사용자 타입에 따른 파일명 생성
    const userType = getUserType(); // 'FLOW', 'HYPE' 등
    const timestamp = new Date().toISOString().slice(0, 10);
    const filename = `matrix-me-${userType}-${timestamp}.png`;
    
    // 6. 다운로드 링크 생성 및 실행
    const link = document.createElement('a');
    link.download = filename;
    link.href = imageData;
    
    // 7. 자동 클릭으로 다운로드 시작
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // 8. 성공 알림
    showSuccessMessage('이미지가 다운로드되었습니다!');
    
    // 9. 분석 이벤트 전송 (선택사항)
    trackEvent('share_image_downloaded', {
      user_type: userType,
      device_type: getDeviceType()
    });
    
  } catch (error) {
    console.error('이미지 다운로드 실패:', error);
    showErrorMessage('이미지 다운로드에 실패했습니다. 다시 시도해주세요.');
  } finally {
    hideLoading();
  }
}
```

### **유틸리티 함수들**
```javascript
// 사용자 타입 가져오기 (URL 파라미터 또는 로컬 스토리지에서)
function getUserType() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('type') || localStorage.getItem('matrix_user_type') || 'FLOW';
}

// 디바이스 타입 감지
function getDeviceType() {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

// 로딩 표시
function showLoading() {
  const loadingEl = document.createElement('div');
  loadingEl.id = 'loading-overlay';
  loadingEl.innerHTML = `
    <div class="loading-spinner">
      <div class="spinner"></div>
      <p>이미지 생성 중...</p>
    </div>
  `;
  document.body.appendChild(loadingEl);
}

function hideLoading() {
  const loadingEl = document.getElementById('loading-overlay');
  if (loadingEl) {
    document.body.removeChild(loadingEl);
  }
}

// 성공/에러 메시지
function showSuccessMessage(message) {
  showToast(message, 'success');
}

function showErrorMessage(message) {
  showToast(message, 'error');
}

function showToast(message, type) {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}

// 분석 이벤트 (Google Analytics 등)
function trackEvent(eventName, properties) {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, properties);
  }
  
  if (typeof mixpanel !== 'undefined') {
    mixpanel.track(eventName, properties);
  }
}
```

### **추가 공유 기능들**
```javascript
// 링크 복사
async function copyShareLink() {
  try {
    const shareUrl = window.location.href;
    await navigator.clipboard.writeText(shareUrl);
    showSuccessMessage('링크가 복사되었습니다!');
    trackEvent('share_link_copied');
  } catch (error) {
    // 폴백: 텍스트 선택 방식
    const textArea = document.createElement('textarea');
    textArea.value = window.location.href;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showSuccessMessage('링크가 복사되었습니다!');
  }
}

// 네이티브 공유 API (모바일)
async function shareToSocial() {
  const userType = getUserType();
  const shareData = {
    title: `Matrix Me - ${userType} 타입`,
    text: `나의 AI DNA 분석 결과: ${userType} 타입! 당신도 테스트해보세요!`,
    url: window.location.href
  };
  
  try {
    if (navigator.share) {
      // 네이티브 공유 API 지원
      await navigator.share(shareData);
      trackEvent('native_share_used');
    } else {
      // 폴백: 커스텀 공유 모달
      showShareModal(shareData);
    }
  } catch (error) {
    if (error.name !== 'AbortError') {
      showErrorMessage('공유에 실패했습니다.');
    }
  }
}

// 커스텀 공유 모달
function showShareModal(shareData) {
  const modal = document.createElement('div');
  modal.className = 'share-modal-overlay';
  modal.innerHTML = `
    <div class="share-modal">
      <h3>공유하기</h3>
      <div class="share-options">
        <button onclick="shareToTwitter('${encodeURIComponent(shareData.text)}', '${shareData.url}')">
          🐦 트위터
        </button>
        <button onclick="shareToFacebook('${shareData.url}')">
          📘 페이스북
        </button>
        <button onclick="shareToKakao('${shareData.url}', '${shareData.title}')">
          💬 카카오톡
        </button>
      </div>
      <button class="close-modal" onclick="closeShareModal()">닫기</button>
    </div>
  `;
  document.body.appendChild(modal);
}

function closeShareModal() {
  const modal = document.querySelector('.share-modal-overlay');
  if (modal) {
    document.body.removeChild(modal);
  }
}

// 개별 SNS 공유 함수들
function shareToTwitter(text, url) {
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  trackEvent('twitter_share_clicked');
}

function shareToFacebook(url) {
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  trackEvent('facebook_share_clicked');
}

function shareToKakao(url, title) {
  // 카카오 SDK 필요
  if (typeof Kakao !== 'undefined') {
    Kakao.Link.sendDefault({
      objectType: 'web',
      title: title,
      url: url
    });
  }
  trackEvent('kakao_share_clicked');
}
```

---

## 🎨 로딩 및 토스트 스타일

```css
/* 로딩 오버레이 */
#loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-spinner {
  text-align: center;
  color: var(--matrix-blue);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--card-border);
  border-top: 3px solid var(--matrix-blue);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 토스트 메시지 */
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  color: var(--text-white);
  padding: 12px 20px;
  border-radius: 6px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  z-index: 10000;
  transform: translateX(100%);
  transition: transform 0.3s ease;
}

.toast.show {
  transform: translateX(0);
}

.toast-success {
  border-color: var(--system-green);
  color: var(--system-green);
}

.toast-error {
  border-color: var(--detection-pink);
  color: var(--detection-pink);
}

/* 공유 모달 */
.share-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.share-modal {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  min-width: 300px;
}

.share-modal h3 {
  color: var(--matrix-blue);
  margin: 0 0 24px 0;
  font-size: 20px;
}

.share-options {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.share-options button {
  background: var(--type-box-bg);
  border: 1px solid var(--matrix-blue);
  color: var(--matrix-blue);
  padding: 10px 16px;
  border-radius: 6px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  min-width: 80px;
}

.share-options button:hover {
  background: var(--matrix-blue);
  color: var(--page-bg);
}

.close-modal {
  background: transparent;
  border: 1px solid var(--card-border);
  color: var(--text-white);
  padding: 8px 16px;
  border-radius: 4px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  cursor: pointer;
}
```

---

## 🚀 페이지 초기화 및 동적 데이터

```javascript
// 페이지 로드시 초기화
document.addEventListener('DOMContentLoaded', function() {
  // URL 파라미터에서 사용자 데이터 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  const userData = {
    type: urlParams.get('type') || 'FLOW',
    typeName: urlParams.get('typeName') || 'Full Load Output Warrior',
    quote: urlParams.get('quote') || 'AI 없으면 숨도 못 쉬어!',
    match: urlParams.get('match') || '96%',
    rarity: urlParams.get('rarity') || '레전더리 타입 (상위 1%)'
  };
  
  // 동적으로 콘텐츠 업데이트
  updateShareContent(userData);
  
  // 디바이스에 따른 반응형 클래스 적용
  applyResponsiveClass();
  
  // 폰트 로딩 완료 대기
  document.fonts.ready.then(() => {
    console.log('폰트 로딩 완료');
  });
});

// 공유 콘텐츠 동적 업데이트
function updateShareContent(userData) {
  document.querySelector('.type-name').textContent = userData.type;
  document.querySelector('.type-description').textContent = `(${userData.typeName})`;
  document.querySelector('.type-quote').textContent = `"${userData.quote}"`;
  document.querySelector('.match-percent').textContent = userData.match;
  document.querySelector('.rarity').textContent = `> 희귀도: ${userData.rarity}`;
}

// 반응형 클래스 적용
function applyResponsiveClass() {
  const width = window.innerWidth;
  const shareCard = document.getElementById('share-card');
  
  shareCard.classList.remove('mobile', 'tablet', 'instagram');
  
  if (width < 768) {
    shareCard.classList.add('mobile');
  } else if (width < 1024) {
    shareCard.classList.add('tablet');
  }
  
  // 인스타그램 모드는 별도 URL 파라미터로 처리
  if (new URLSearchParams(window.location.search).get('format') === 'instagram') {
    shareCard.classList.add('instagram');
  }
}

// 윈도우 리사이즈 대응
window.addEventListener('resize', applyResponsiveClass);
```

---

## 📊 성능 최적화 팁

### **폰트 최적화**
```html
<!-- 폰트 preload -->
<link rel="preload" href="/fonts/JetBrainsMono-Regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/JetBrainsMono-Bold.woff2" as="font" type="font/woff2" crossorigin>
```

### **이미지 생성 최적화**
```javascript
// 큰 화면에서만 고해상도 생성
const scale = window.innerWidth > 1200 ? 2 : 1.5;

// 불필요한 요소 임시 제거
const buttonsEl = document.querySelector('.share-actions');
buttonsEl.style.display = 'none';

// 캔버스 생성
const canvas = await html2canvas(shareCard, { scale });

// 요소 다시 표시
buttonsEl.style.display = 'flex';
```

### **메모리 최적화**
```javascript
// 큰 캔버스 객체 정리
canvas.width = 0;
canvas.height = 0;
canvas = null;

// URL 객체 해제
URL.revokeObjectURL(imageData);
```

---

## 🎯 구현 체크리스트

### ✅ **디자인 구현**
- [ ] 4가지 반응형 버전 (데스크톱/태블릿/모바일/인스타그램)
- [ ] 정확한 폰트 크기 및 가중치
- [ ] 피그마 스펙 그대로 색상 적용
- [ ] 정확한 간격 및 패딩

### ✅ **이미지 다운로드**
- [ ] html2canvas 라이브러리 통합
- [ ] 고해상도 이미지 생성 (2x)
- [ ] 사용자 타입별 파일명 생성
- [ ] 로딩 상태 및 에러 처리

### ✅ **추가 공유 기능**
- [ ] 링크 복사 기능
- [ ] 네이티브 공유 API (모바일)
- [ ] SNS별 공유 링크 생성
- [ ] 공유 완료 추적

### ✅ **성능 및 UX**
- [ ] 폰트 preload 최적화
- [ ] 반응형 브레이크포인트
- [ ] 접근성 고려사항
- [ ] 크로스 브라우저 호환성

---

## 🚀 최종 배포 가이드

### **정적 호스팅 최적화**
```json
// vercel.json
{
  "headers": [
    {
      "source": "/fonts/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### **SEO 및 메타 태그**
```html
<meta property="og:title" content="Matrix Me - AI DNA 분석 결과">
<meta property="og:description" content="나의 AI 활용 유형을 발견해보세요!">
<meta property="og:image" content="/og-image.png">
<meta name="twitter:card" content="summary_large_image">
```

**🎉 이 가이드로 피그마 디자인과 100% 동일한 공유 페이지와 완벽한 이미지 다운로드 기능을 구현할 수 있습니다!**