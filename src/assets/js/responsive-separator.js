// 반응형 구분선 길이 조정
class ResponsiveSeparator {
    constructor() {
        this.separatorLengths = {
            desktop: 58,  // 1024px 이상
            tablet: 43,   // 768px - 1023px  
            mobile: 28    // 767px 이하
        };
        
        this.separatorChar = '━';
        this.init();
    }
    
    init() {
        this.adjustSeparators();
        
        // 윈도우 리사이즈 시 재조정
        window.addEventListener('resize', () => {
            this.adjustSeparators();
        });
    }
    
    getScreenType() {
        const width = window.innerWidth;
        
        if (width >= 1024) {
            return 'desktop';
        } else if (width >= 768) {
            return 'tablet';
        } else {
            return 'mobile';
        }
    }
    
    adjustSeparators() {
        const screenType = this.getScreenType();
        const length = this.separatorLengths[screenType];
        const separatorText = this.separatorChar.repeat(length);
        
        // 모든 구분선 요소 찾기
        const separators = document.querySelectorAll('.separator-line');
        
        separators.forEach(separator => {
            separator.textContent = separatorText;
        });
    }
}

// DOM 로드 완료 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    new ResponsiveSeparator();
});

// 전역으로 접근 가능하도록 설정
window.ResponsiveSeparator = ResponsiveSeparator;