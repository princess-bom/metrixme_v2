// Service Worker 관리 유틸리티
class ServiceWorkerManager {
    constructor() {
        this.isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        this.currentCacheVersion = 'matrix-me-v1.2.0';
    }

    // 서비스 워커 등록
    async register() {
        if (!('serviceWorker' in navigator)) {
            console.log('Service Worker not supported');
            return;
        }

        try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            console.log('SW registered: ', registration);
            
            // 업데이트 감지
            registration.addEventListener('updatefound', () => {
                this.handleUpdate(registration);
            });

            // 개발 모드에서 캐시 클리어 (퀴즈 상태 유지를 위해 임시 비활성화)
            // if (this.isDevelopment) {
            //     this.clearCacheOnReload();
            // }

            return registration;
        } catch (error) {
            console.log('SW registration failed: ', error);
        }
    }

    // 서비스 워커 업데이트 처리
    handleUpdate(registration) {
        const newWorker = registration.installing;
        
        newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'activated') {
                console.log('New Service Worker activated');
                if (confirm('새 버전이 업데이트되었습니다. 페이지를 새로고침하시겠습니까?')) {
                    window.location.reload();
                }
            }
        });
    }

    // 개발 모드에서 캐시 클리어
    clearCacheOnReload() {
        // 페이지 로드 시 자동으로 캐시 클리어 (개발 모드)
        if (this.isDevelopment) {
            this.clearAllCaches();
        }
        
        window.addEventListener('keydown', (event) => {
            // Ctrl+R 또는 F5 시 캐시 클리어
            if ((event.ctrlKey && event.key === 'r') || event.key === 'F5') {
                this.clearAllCaches();
            }
        });
    }

    // 모든 캐시 클리어
    async clearAllCaches() {
        if ('caches' in window) {
            const cacheNames = await caches.keys();
            await Promise.all(
                cacheNames.map(cacheName => {
                    console.log('Deleting cache:', cacheName);
                    return caches.delete(cacheName);
                })
            );
            console.log('All caches cleared');
        }
    }

    // 서비스 워커 언등록
    async unregister() {
        if ('serviceWorker' in navigator) {
            const registrations = await navigator.serviceWorker.getRegistrations();
            for (const registration of registrations) {
                await registration.unregister();
                console.log('SW unregistered');
            }
        }
    }

    // 캐시 상태 확인
    async getCacheStatus() {
        if ('caches' in window) {
            const cacheNames = await caches.keys();
            const status = {};
            
            for (const cacheName of cacheNames) {
                const cache = await caches.open(cacheName);
                const keys = await cache.keys();
                status[cacheName] = keys.length;
            }
            
            return status;
        }
        return {};
    }

    // 뒤로 가기 캐시 문제 해결
    handleBackNavigation() {
        window.addEventListener('pageshow', (event) => {
            if (event.persisted) {
                // 페이지가 bfcache에서 복원된 경우
                console.log('Page restored from bfcache');
                
                // 개발 모드에서는 항상 새로고침
                if (this.isDevelopment) {
                    window.location.reload();
                }
            }
        });

        // popstate 이벤트 처리
        window.addEventListener('popstate', () => {
            // 뒤로 가기 시 캐시 관련 이슈 방지
            if (this.isDevelopment) {
                setTimeout(() => {
                    window.location.reload();
                }, 100);
            }
        });
    }
}

// 전역 인스턴스 생성
const swManager = new ServiceWorkerManager();

// 페이지 로드 시 자동 등록
window.addEventListener('load', () => {
    swManager.register();
    swManager.handleBackNavigation();
});

// 개발 도구를 위한 전역 노출
window.swManager = swManager;