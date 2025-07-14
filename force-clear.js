// 강제 캐시 클리어 스크립트
(async function forceClearCache() {
    console.log('🗑️ 강제 캐시 클리어 시작...');
    
    // 서비스 워커 언등록
    if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const registration of registrations) {
            await registration.unregister();
            console.log('✅ 서비스 워커 언등록 완료');
        }
    }
    
    // 모든 캐시 삭제
    if ('caches' in window) {
        const cacheNames = await caches.keys();
        for (const cacheName of cacheNames) {
            await caches.delete(cacheName);
            console.log(`✅ 캐시 삭제: ${cacheName}`);
        }
    }
    
    // 로컬 스토리지 클리어
    localStorage.clear();
    sessionStorage.clear();
    console.log('✅ 로컬 스토리지 클리어 완료');
    
    // 강제 새로고침
    console.log('🔄 강제 새로고침 실행...');
    window.location.reload(true);
})();

// 콘솔에서 수동 실행 가능
window.forceClearCache = forceClearCache;