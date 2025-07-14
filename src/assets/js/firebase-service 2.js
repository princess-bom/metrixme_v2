/**
 * Matrix Me - Firebase Service Layer
 * 퀴즈 결과 저장 및 실시간 통계 관리
 */

class FirebaseService {
    constructor() {
        this.db = null;
        this.initialized = false;
        this.isOnline = navigator.onLine;
        this.offlineQueue = [];
        
        // 온라인/오프라인 상태 감지
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.processOfflineQueue();
        });
        
        window.addEventListener('offline', () => {
            this.isOnline = false;
        });
    }

    /**
     * Firebase 초기화
     */
    async initialize() {
        try {
            // 🛡️ 사파리 개인정보 보호 대응: Firebase 연결 시도
            console.log('🔥 Firebase 초기화 시도...');
            
            // Firebase SDK 동적 로딩 (사파리 차단 감지)
            const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
            const { getFirestore } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
            
            // Firebase 설정 (하드코딩 방식 - 프로덕션에서는 환경변수 사용 권장)
            const firebaseConfig = {
                apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDTpY1gUc1vCgSzwDJ3aCjjSBygbamMADo",
                authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "matrixme-91be1.firebaseapp.com",
                projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "matrixme-91be1",
                storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "matrixme-91be1.firebasestorage.app",
                messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "310441710094",
                appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:310441710094:web:6190389dcec147a72de25f"
            };

            // Firebase 앱 초기화
            const app = initializeApp(firebaseConfig);
            this.db = getFirestore(app);
            
            // 개발 환경 설정 - 에뮬레이터 비활성화
            if (window.location.hostname === 'localhost') {
                console.log('Development mode: Using production Firestore');
                // 에뮬레이터 연결 비활성화 - 프로덕션 Firestore 사용
            }
            
            this.initialized = true;
            console.log('Firebase initialized successfully');
            
            // 오프라인 큐 처리
            if (this.isOnline) {
                this.processOfflineQueue();
            }
            
            return true;
        } catch (error) {
            console.warn('🛡️ Firebase 차단됨 (사파리 개인정보 보호 기능 또는 네트워크 오류)');
            console.log('📴 오프라인 모드로 진행합니다');
            this.initialized = false;
            
            // 🎯 중요: Firebase 없이도 퀴즈는 정상 진행되도록 함
            return true; // Firebase 실패해도 true 반환하여 퀴즈 진행 허용
        }
    }

    /**
     * 짧은 공유 ID 생성 (8자리)
     * @returns {string} - 공유용 ID (예: R7x9K2m3)
     */
    generateShareId() {
        const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
        let result = 'R'; // 'R'로 시작 (Result의 R)
        for (let i = 0; i < 7; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    /**
     * 퀴즈 결과 저장
     */
    async saveQuizResult(resultData) {
        if (!this.initialized) {
            await this.initialize();
        }

        const result = {
            timestamp: new Date().toISOString(),
            type_code: resultData.typeCode,
            scores: resultData.scores,
            confidence: resultData.confidence,
            language: resultData.language
        };

        // 짧은 공유 ID 생성
        const shareId = this.generateShareId();
        result.shareId = shareId;

        if (!this.isOnline || !this.initialized) {
            // 오프라인이거나 초기화 실패시 큐에 저장
            this.offlineQueue.push({ type: 'saveResult', data: result });
            console.log('Result queued for offline sync');
            return shareId;
        }

        try {
            const { doc, setDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
            
            // Firestore에 저장 (짧은 ID 사용)
            const resultRef = doc(this.db, 'quiz_results', shareId);
            await setDoc(resultRef, result);
            
            console.log('Quiz result saved:', shareId);
            
            // 통계 업데이트
            await this.updateStatistics(result.type_code, result.language);
            
            return shareId;
        } catch (error) {
            console.error('Error saving quiz result:', error);
            // 실패시 오프라인 큐에 추가
            this.offlineQueue.push({ type: 'saveResult', data: result });
            return shareId;
        }
    }

    /**
     * 실시간 통계 조회
     */
    async getStatistics(language = 'global') {
        if (!this.initialized) {
            await this.initialize();
        }

        if (!this.isOnline || !this.initialized) {
            // 오프라인시 캐시된 통계 반환
            return this.getCachedStatistics();
        }

        try {
            const { doc, getDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
            
            const statsRef = doc(this.db, 'statistics', language);
            const statsSnap = await getDoc(statsRef);
            
            if (statsSnap.exists()) {
                const stats = statsSnap.data();
                
                // 로컬 캐시 업데이트
                localStorage.setItem('matrixme-stats-cache', JSON.stringify({
                    data: stats,
                    timestamp: Date.now()
                }));
                
                return stats;
            } else {
                // 통계가 없으면 초기화
                return await this.initializeStatistics(language);
            }
        } catch (error) {
            console.error('Error fetching statistics:', error);
            return this.getCachedStatistics();
        }
    }

    /**
     * 공유 ID로 퀴즈 결과 조회
     * @param {string} shareId - 공유 ID
     * @returns {Object|null} - 결과 데이터 또는 null
     */
    async getResultByShareId(shareId) {
        if (!this.initialized) {
            await this.initialize();
        }

        if (!this.isOnline || !this.initialized) {
            console.warn('Offline or not initialized - cannot fetch result');
            return null;
        }

        try {
            const { doc, getDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
            
            const resultRef = doc(this.db, 'quiz_results', shareId);
            const resultSnap = await getDoc(resultRef);
            
            if (resultSnap.exists()) {
                console.log('Result found for share ID:', shareId);
                return resultSnap.data();
            } else {
                console.log('No result found for share ID:', shareId);
                return null;
            }
        } catch (error) {
            console.error('Error fetching result:', error);
            return null;
        }
    }

    /**
     * 통계 업데이트 (트랜잭션 사용)
     */
    async updateStatistics(typeCode, language) {
        try {
            const { doc, runTransaction } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
            
            const globalStatsRef = doc(this.db, 'statistics', 'global');
            const langStatsRef = doc(this.db, 'statistics', language);
            
            await runTransaction(this.db, async (transaction) => {
                // 모든 읽기 작업을 먼저 수행
                const globalDoc = await transaction.get(globalStatsRef);
                const langDoc = await transaction.get(langStatsRef);
                
                // 읽기 완료 후 데이터 처리
                const globalData = globalDoc.exists() ? globalDoc.data() : this.getDefaultStats();
                const langData = langDoc.exists() ? langDoc.data() : this.getDefaultStats();
                
                // 글로벌 통계 업데이트
                globalData.total_users += 1;
                globalData.type_distribution[typeCode] = (globalData.type_distribution[typeCode] || 0) + 1;
                globalData.last_updated = new Date().toISOString();
                
                // 언어별 통계 업데이트
                langData.total_users += 1;
                langData.type_distribution[typeCode] = (langData.type_distribution[typeCode] || 0) + 1;
                langData.last_updated = new Date().toISOString();
                
                // 모든 쓰기 작업을 마지막에 수행
                transaction.set(globalStatsRef, globalData);
                transaction.set(langStatsRef, langData);
            });
            
            console.log('Statistics updated successfully');
        } catch (error) {
            console.error('Error updating statistics:', error);
        }
    }

    /**
     * 통계 초기화
     */
    async initializeStatistics(language = 'global') {
        const defaultStats = this.getDefaultStats();
        
        try {
            const { doc, setDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
            
            const statsRef = doc(this.db, 'statistics', language);
            await setDoc(statsRef, defaultStats);
            
            return defaultStats;
        } catch (error) {
            console.error('Error initializing statistics:', error);
            return defaultStats;
        }
    }

    /**
     * 기본 통계 구조
     */
    getDefaultStats() {
        return {
            total_users: 0,
            type_distribution: {
                'BASE': 0, 'CORE': 0, 'PURE': 0, 'MESH': 0,
                'SCAN': 0, 'BETA': 0, 'ECHO': 0, 'SAGE': 0,
                'HIDE': 0, 'CTRL': 0, 'PICK': 0, 'VIBE': 0,
                'NOVA': 0, 'SYNC': 0, 'HYPE': 0, 'FLOW': 0
            },
            created_at: new Date().toISOString(),
            last_updated: new Date().toISOString()
        };
    }

    /**
     * 캐시된 통계 조회
     */
    getCachedStatistics() {
        try {
            const cached = localStorage.getItem('matrixme-stats-cache');
            if (cached) {
                const { data, timestamp } = JSON.parse(cached);
                // 1시간 이내 캐시만 사용
                if (Date.now() - timestamp < 60 * 60 * 1000) {
                    return data;
                }
            }
        } catch (error) {
            console.error('Error reading cached stats:', error);
        }
        
        // 캐시가 없거나 만료된 경우 기본값 반환
        return this.getDefaultStats();
    }

    /**
     * 오프라인 큐 처리
     */
    async processOfflineQueue() {
        if (!this.initialized || this.offlineQueue.length === 0) {
            return;
        }

        const queue = [...this.offlineQueue];
        this.offlineQueue = [];

        for (const item of queue) {
            try {
                if (item.type === 'saveResult') {
                    const { doc, setDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
                    
                    const resultRef = doc(this.db, 'quiz_results', Date.now().toString());
                    await setDoc(resultRef, item.data);
                    
                    await this.updateStatistics(item.data.type_code, item.data.language);
                    console.log('Offline result synced:', resultRef.id);
                }
            } catch (error) {
                console.error('Error processing offline queue item:', error);
                // 실패한 항목은 다시 큐에 추가
                this.offlineQueue.push(item);
            }
        }
    }


    /**
     * 희귀도 계산
     */
    calculateRarity(typeCode, stats) {
        const total = stats.total_users;
        const typeCount = stats.type_distribution[typeCode] || 0;
        
        if (total === 0) {
            // 데이터가 없으면 예상 희귀도 반환
            const estimatedRarity = {
                'FLOW': 0.02, 'NOVA': 0.01, 'HIDE': 0.03,
                'HYPE': 0.06, 'BETA': 0.05, 'SAGE': 0.04,
                'SYNC': 0.07, 'VIBE': 0.08, 'CTRL': 0.12,
                'PICK': 0.15, 'ECHO': 0.18, 'SCAN': 0.13,
                'PURE': 0.16, 'MESH': 0.22, 'CORE': 0.21,
                'BASE': 0.30
            };
            return estimatedRarity[typeCode] || 0.1;
        }
        
        return typeCount / total;
    }

    /**
     * 신뢰도 계산 (답변 일관성 기반)
     */
    calculateConfidence(scores, answers) {
        if (!answers || answers.length === 0) {
            return Math.floor(Math.random() * 8) + 90; // 90-97%
        }

        let consistencyScore = 0;
        const axes = ['D', 'E', 'T', 'C'];
        
        axes.forEach(axis => {
            const axisAnswers = answers.filter(a => a.axis === axis);
            if (axisAnswers.length > 0) {
                const values = axisAnswers.map(a => a.value || 3);
                const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
                const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
                
                // 분산이 낮을수록 일관성이 높음
                consistencyScore += Math.max(0, 1 - variance);
            }
        });
        
        // 85-98% 범위로 정규화
        const normalizedScore = 85 + (consistencyScore / 4) * 13;
        return Math.round(Math.min(98, Math.max(85, normalizedScore)));
    }
}

// ES6 모듈 방식으로 인스턴스 직접 export
export const firebaseService = new FirebaseService();
export default FirebaseService;