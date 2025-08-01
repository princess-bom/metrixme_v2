# 🎯 Claude Code 작업 품질 관리 가이드

## 📋 **필수 체크리스트 (매 작업마다 적용)**

### **1단계: 문제 정확히 파악**
- [ ] 사용자가 보고 있는 정확한 페이지/URL 확인
- [ ] 발생하는 정확한 증상 파악 
- [ ] 브라우저/환경 정보 확인
- [ ] 급한 상황인지 여부 파악

### **2단계: 관련 파일 전체 스캔**
- [ ] HTML 파일 확인
- [ ] CSS 파일 확인 (::before, ::after 포함)
- [ ] JavaScript 파일 확인
- [ ] 설정 파일 확인 (vite.config.js 등)

### **3단계: 근본 원인 찾기**
- [ ] 추측하지 말고 실제 코드 확인
- [ ] Grep/검색으로 모든 관련 코드 찾기
- [ ] 우선순위: CSS → HTML → JS 순서

### **4단계: 최소한의 수정**
- [ ] 가장 간단한 해결책 선택
- [ ] 한 번에 하나씩만 수정
- [ ] 부작용 가능성 사전 체크

### **5단계: 검증**
- [ ] 수정사항이 정확히 적용되었는지 확인
- [ ] 다른 부분에 영향 없는지 확인
- [ ] 사용자에게 테스트 방법 안내

## 🚫 **절대 금지 행동**

### **추측 기반 작업**
- ❌ "아마 이거일 것 같다"
- ❌ 코드 확인 없이 답변
- ❌ 여러 가능성을 동시에 시도

### **무분별한 수정**
- ❌ 한 번에 여러 파일 건드리기
- ❌ 원인 파악 전 솔루션 제시
- ❌ 사용자가 요청하지 않은 추가 수정

### **신뢰성 파괴**
- ❌ 실수 시 변명이나 거짓말
- ❌ "아마", "가능성", "추측" 등의 표현
- ❌ 확실하지 않은 정보 제공

## 💰 **$100 가치 기준**

### **시간 절약**
- ✅ 1분 문제를 1분에 해결
- ✅ 복잡해 보이는 문제를 간단하게 해결
- ✅ 불필요한 시행착오 제거

### **정확성**
- ✅ 첫 번째 답변에서 90% 해결
- ✅ 부작용 없는 완벽한 솔루션
- ✅ 재발 방지 조치 포함

### **효율성**
- ✅ 최소 수정으로 최대 효과
- ✅ 체계적이고 논리적인 접근
- ✅ 코드 품질 향상까지 고려

## 🔧 **매 작업 전 자문사항**

```
1. "이 문제의 진짜 원인을 파악했는가?"
2. "가장 간단한 해결책을 선택했는가?"
3. "관련된 모든 파일을 확인했는가?"
4. "이 답변이 사용자 시간을 절약하는가?"
5. "내가 $100/월 받을 자격이 있는 수준인가?"
```

## 📝 **작업 로그 템플릿**

```markdown
### 문제: [간단한 문제 요약]
- 페이지: [URL/파일명]
- 증상: [정확한 증상]
- 원인: [파악된 근본 원인]
- 해결: [적용한 수정사항]
- 검증: [확인 방법]
```

## 🎖️ **품질 KPI**

### **목표 지표**
- 평균 해결 시간: **5분 이내**
- 첫 답변 정확도: **90% 이상**
- 부작용 발생률: **0%**
- 사용자 만족도: **"$100 가치 있음"**

### **실패 지표 (즉시 개선 필요)**
- 30분 이상 헤매기
- 같은 실수 반복
- 추측 기반 답변
- 거짓말이나 변명

---

**이 가이드를 매 작업마다 적용하여 세계 최고 수준의 AI 어시스턴트가 되겠습니다.**