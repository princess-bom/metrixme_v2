/**
 * Matrix Me - 결과 처리 엔진
 * 4축 점수를 16가지 타입으로 변환하고 결과 데이터를 제공
 */

// 타입 정의 가져오기
import { AXIS_TO_TYPE_MAPPING, KOREAN_TYPE_DATA, ENGLISH_TYPE_DATA } from '../data/type-definitions.js';

class ResultEngine {
    constructor() {
        this.axisMapping = AXIS_TO_TYPE_MAPPING;
        this.koreanData = KOREAN_TYPE_DATA;
        this.englishData = ENGLISH_TYPE_DATA;
    }

    /**
     * 4축 점수를 타입 코드로 변환
     * @param {Object} scores - {D: number, E: number, T: number, C: number}
     * @returns {string} - 타입 코드 (예: 'FLOW', 'CTRL')
     */
    scoresToTypeCode(scores) {
        const dLevel = this.scoreToLevel(scores.D);
        const eLevel = this.scoreToLevel(scores.E);
        const tLevel = this.scoreToLevel(scores.T);
        const cLevel = this.scoreToLevel(scores.C);
        
        const axisCode = dLevel + eLevel + tLevel + cLevel;
        return this.axisMapping[axisCode] || 'FLOW'; // 기본값
    }

    /**
     * 점수를 H/L로 변환 (Medium 처리 포함, docs/quiz_ko.md 기준)
     * @param {number} score - 5~25점 범위의 축별 점수
     * @returns {string} - 'H' 또는 'L'
     */
    scoreToLevel(score) {
        // H: 18+ 점, L: 12- 점, M: 13-17점 (Medium은 가까운 쪽으로 분류)
        if (score >= 18) return 'H';
        if (score <= 12) return 'L';
        
        // Medium 구간 (13-17점) 처리
        if (score <= 14) return 'L';  // 13-14점 → Low
        return 'H';  // 15-17점 → High
    }

    /**
     * 타입 코드로 상세 데이터 조회
     * @param {string} typeCode - 타입 코드
     * @param {string} language - 'ko' 또는 'en'
     * @returns {Object} - 타입 상세 데이터
     */
    getTypeData(typeCode, language = 'ko') {
        const data = language === 'ko' ? this.koreanData : this.englishData;
        return data[typeCode] || data['FLOW']; // 기본값
    }

    /**
     * URL 파라미터에서 결과 정보 추출
     * @returns {Object} - {typeCode: string, scores: Object, language: string, shareId: string}
     */
    parseResultFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const currentPath = window.location.pathname;
        
        // 언어 감지
        const language = currentPath.includes('/ko/') ? 'ko' : 'en';
        
        // 새로운 공유 ID 기반 URL 체크 (/ko/result/R7x9K2m3)
        const pathParts = currentPath.split('/').filter(part => part);
        if (pathParts.length >= 3 && (pathParts[1] === 'result' || pathParts[1] === 'share')) {
            const shareId = pathParts[2];
            if (shareId && shareId.length >= 6) { // 공유 ID 형태 검증
                return {
                    shareId: shareId,
                    language: language,
                    isShareUrl: true
                };
            }
        }
        
        // 기존 URL 파라미터 방식 (하위 호환성)
        // 4축 점수 확인 (우선순위)
        const dScore = parseInt(urlParams.get('D'));
        const eScore = parseInt(urlParams.get('E'));
        const tScore = parseInt(urlParams.get('T'));
        const cScore = parseInt(urlParams.get('C'));
        
        // 4축 점수가 모두 있으면 사용
        if (!isNaN(dScore) && !isNaN(eScore) && !isNaN(tScore) && !isNaN(cScore)) {
            const scores = { D: dScore, E: eScore, T: tScore, C: cScore };
            const typeCode = this.scoresToTypeCode(scores);
            
            return {
                typeCode: typeCode,
                scores: scores,
                language: language,
                isShareUrl: false
            };
        }
        
        // 타입 코드만 있는 경우 (4축 점수 없음)
        const directType = urlParams.get('type');
        if (directType) {
            const upperType = directType.toUpperCase();
            
            // 4축 조합 코드인 경우 실제 타입 코드로 변환
            const actualTypeCode = this.axisMapping[upperType] || upperType;
            
            return {
                typeCode: actualTypeCode,
                scores: null,
                language: language,
                isShareUrl: false
            };
        }
        
        // 기본값 (아무 파라미터 없음)
        return {
            typeCode: 'FLOW',
            scores: null,
            language: language
        };
    }

    /**
     * 타입 코드를 타입 이름으로 변환
     * @param {string} typeCode - 타입 코드 (예: 'SAGE')
     * @param {string} language - 언어 ('ko' 또는 'en')
     * @returns {string} - 타입 이름
     */
    getTypeDisplayName(typeCode, language = 'ko') {
        const data = language === 'ko' ? this.koreanData : this.englishData;
        const typeInfo = data[typeCode];
        if (!typeInfo) return typeCode; // 못 찾으면 코드 그대로 반환
        
        if (language === 'ko') {
            return typeInfo.korean || typeInfo.name.split('(')[0].trim();
        } else {
            return typeInfo.name.split('(')[0].trim() || typeInfo.korean;
        }
    }

    /**
     * 타입의 풀네임 추출
     * @param {Object} typeData - 타입 데이터
     * @param {string} language - 언어
     * @returns {string} - 풀네임
     */
    getFullName(typeData, language = 'ko') {
        // 특별 매핑: 한국어 타입 코드에 대한 영어 풀네임
        const typeCodeToFullName = {
            'HIDE': 'Hidden Intelligence Dedicated Expert',
            'CTRL': 'Compulsive Technology Refactoring Lord',
            'FLOW': 'Full-throttle Legendary Output Wizard',
            'BETA': 'Budget Experimental Testing Addict',
            'NOVA': 'Next-generation Obsessive Visionary Adapter',
            'PICK': 'Perfect Intelligence Cherry-picking Keeper',
            'SYNC': 'Sophisticated Yielding Neural Craftsman',
            'SAGE': 'Sophisticated Analytical Guidance Expert',
            'ECHO': 'Efficient Control Heavy Optimizer',
            'HYPE': 'Hyperactive Yelling Passionate Evangelist',
            'VIBE': 'Vibes-based Intelligence Behavior Expert',
            'PURE': 'Persistent User Reviewing Everything',
            'MESH': 'Methodical Extremely Slow Hesitating',
            'SCAN': 'Suspicious Careful AI Navigator',
            'BASE': 'Barely Accepting Smart-tool Extremely-cautiously',
            'CORE': 'Classic Old-school Reliable Expert'
        };
        
        // 1. 타입 코드로 풀네임 찾기
        const typeCode = typeData.name ? typeData.name.split(' ')[0] : '';
        if (typeCodeToFullName[typeCode]) {
            return typeCodeToFullName[typeCode];
        }
        
        // 2. fullName 필드가 있으면 사용
        if (typeData.fullName) {
            return typeData.fullName;
        }
        
        // 3. name 필드에서 괄호 안의 내용 추출
        // 예: "HIDE (Stealth Expert)" → "Stealth Expert"
        if (typeData.name && typeData.name.includes('(')) {
            const match = typeData.name.match(/\(([^)]+)\)/);
            if (match && match[1]) {
                return match[1].trim();
            }
        }
        
        // 4. 기본값
        return typeData.name || 'Unknown Type';
    }

    /**
     * 궁합 정보 텍스트 생성 (한국어/영어 데이터 구조 차이 처리)
     * @param {Object} typeData - 타입 데이터
     * @param {string} matchType - 'good', 'bad', 'surprise'
     * @param {string} language - 언어
     * @returns {string} - 궁합 텍스트
     */
    getCompatibilityText(typeData, matchType, language = 'ko') {
        if (!typeData.compatibility) return '';
        
        let emoji, label, compatData;
        
        // 이모지와 라벨 설정
        if (matchType === 'good') {
            emoji = '🎉';
            label = language === 'ko' ? '천생연분' : 'Perfect Match';
            compatData = typeData.compatibility.soulmate || { type: '', title: typeData.compatibility.good || '' };
        } else if (matchType === 'bad') {
            emoji = '🔥';
            label = language === 'ko' ? '극과극' : 'Total Opposite';
            compatData = typeData.compatibility.nemesis || { type: '', title: typeData.compatibility.bad || '' };
        } else if (matchType === 'surprise') {
            emoji = '💫';
            label = language === 'ko' ? '의외의 케미' : 'Surprising Chemistry';
            // surprise 데이터가 없으면 빈 문자열 반환
            if (!typeData.compatibility.surprise) {
                return '';
            }
            compatData = typeData.compatibility.surprise;
        } else {
            return '';
        }
        
        // 데이터 추출
        let typeName = '';
        let title = '';
        
        if (compatData.type) {
            // 한국어 버전 구조: { type: 'SAGE', title: '...' }
            typeName = this.getTypeDisplayName(compatData.type, language);
            title = compatData.title || '';
        } else if (typeof compatData === 'string') {
            // 영어 버전 구조: "Type Name (description)"
            title = compatData;
        } else {
            // 기본값 또는 예외 처리
            if (typeof compatData === 'object' && compatData !== null) {
                title = compatData.title || '';
            } else {
                title = String(compatData || '');
            }
        }
        
        // 최종 텍스트 생성
        if (typeName && title) {
            return `${emoji} ${label}: ${typeName} - ${title}`;
        } else if (title) {
            return `${emoji} ${label}: ${title}`;
        } else {
            return `${emoji} ${label}: 정보 없음`;
        }
    }

    /**
     * 완전한 결과 데이터 생성
     * @param {string} typeCode - 타입 코드
     * @param {string} language - 언어
     * @param {Object} scores - 4축 점수 (선택사항)
     * @param {Array} answers - 퀴즈 답변 (선택사항)
     * @returns {Object} - 결과 페이지에 필요한 모든 데이터
     */
    async generateResultData(typeCode, language = 'ko', scores = null, answers = null) {
        const typeData = this.getTypeData(typeCode, language);
        
        // Firebase 서비스 사용 가능한지 확인
        let confidence = 94;
        let realTimeStats = null;
        
        try {
            if (window.firebaseService) {
                // 실시간 통계 조회
                realTimeStats = await window.firebaseService.getStatistics(language);
                
                // 답변 일관성 기반 신뢰도 계산
                confidence = window.firebaseService.calculateConfidence(scores, answers);
                
                // 결과 저장 (완전한 퀴즈 완료 시에만)
                if (scores && this.isValidQuizCompletion(scores)) {
                    await window.firebaseService.saveQuizResult({
                        typeCode,
                        language,
                        scores,
                        confidence
                    });
                }
            } else {
                // Firebase 없으면 기본 계산
                confidence = Math.floor(Math.random() * 8) + 90; // 90-97%
            }
        } catch (error) {
            console.error('Firebase error, using fallback:', error);
            confidence = Math.floor(Math.random() * 8) + 90;
        }

        // 희귀도 계산
        let rarityInfo = this.calculateRarityInfo(typeCode, realTimeStats, language);
        
        return {
            // 기본 정보
            typeCode: typeCode,
            typeName: language === 'ko' ? `${typeCode} (${typeData.fullName || typeData.name.split('(')[1]?.replace(')', '') || 'Unknown'})` : typeData.name,
            typeKorean: typeData.korean || typeData.name.split('(')[0].trim(),
            fullName: this.getFullName(typeData, language),
            description: typeData.description,
            rarity: rarityInfo.rarity,
            rarityPercentage: rarityInfo.percentage,
            confidence: confidence,
            
            // 상세 정보
            profile: typeData.profile,
            routine: typeData.routine,
            arsenal: typeData.arsenal,
            strengths: typeData.strengths,
            weaknesses: typeData.weaknesses,
            compatibility: typeData.compatibility,
            
            // 메타 정보
            language: language,
            scores: scores,
            
            // 결과 페이지 전용 데이터
            headerTitle: `${typeData.name.split('(')[0].trim()} MATRIX`,
            profileTitle: language === 'ko' 
                ? `MATRIX PROFILE TYPE : ${typeData.korean || typeData.name.split('(')[0].trim()}`
                : `MATRIX PROFILE - ${(typeData.korean || typeData.name.split('(')[0].trim()).toUpperCase()} TYPE:`,
            rarityText: language === 'ko' 
                ? `희귀도: ${typeData.rarity} - ${typeData.description}!`
                : `Rarity: ${typeData.rarity} - ${typeData.description}!`,
            routineTitle: language === 'ko'
                ? `> ${typeData.korean || typeData.name.split('(')[0].trim()} 일상 루틴:`
                : `> ${typeData.name.split('(')[0].trim()} Daily Routine:`,
            arsenalTitle: language === 'ko'
                ? `> ${typeData.korean || typeData.name.split('(')[0].trim()}의 무기고:`
                : `> ${typeData.name.split('(')[0].trim()}'s Arsenal:`,
            compatibilityGood: this.getCompatibilityText(typeData, 'good', language),
            compatibilityBad: this.getCompatibilityText(typeData, 'bad', language),
            compatibilitySurprise: this.getCompatibilityText(typeData, 'surprise', language)
        };
    }

    /**
     * 현재 URL 기반으로 결과 데이터 생성
     * @returns {Object} - 완전한 결과 데이터
     */
    async generateCurrentResult() {
        const urlResult = this.parseResultFromURL();
        
        // 공유 ID 기반 URL인 경우 Firebase에서 데이터 조회
        if (urlResult.isShareUrl && urlResult.shareId) {
            try {
                // Firebase 서비스가 있는지 확인
                if (window.firebaseService && typeof window.firebaseService.getResultByShareId === 'function') {
                    const savedResult = await window.firebaseService.getResultByShareId(urlResult.shareId);
                    
                    if (savedResult) {
                        // Firebase에서 가져온 데이터로 결과 생성
                        return await this.generateResultData(
                            savedResult.type_code,
                            savedResult.language || urlResult.language,
                            savedResult.scores || null
                        );
                    } else {
                        console.warn('No result found for share ID:', urlResult.shareId);
                        // 기본 타입으로 fallback
                        return await this.generateResultData('FLOW', urlResult.language);
                    }
                } else {
                    console.warn('Firebase service not available for share ID lookup');
                    // 기본 타입으로 fallback
                    return await this.generateResultData('FLOW', urlResult.language);
                }
            } catch (error) {
                console.error('Error loading shared result:', error);
                // 기본 타입으로 fallback
                return await this.generateResultData('FLOW', urlResult.language);
            }
        }
        
        // 기존 파라미터 방식
        return await this.generateResultData(
            urlResult.typeCode,
            urlResult.language,
            urlResult.scores
        );
    }

    /**
     * 희귀도 정보 계산
     * @param {string} typeCode - 타입 코드
     * @param {Object} stats - 실시간 통계 (선택사항)
     * @param {string} language - 언어
     * @returns {Object} - {rarity: string, percentage: number}
     */
    calculateRarityInfo(typeCode, stats = null, language = 'ko') {
        // 예상 희귀도 (실제 통계가 없을 때 사용)
        const estimatedRarity = {
            'BASE': 30,    // AI 무서워하는 사람들
            'CORE': 21,    // 전통주의자들  
            'MESH': 22,    // 안전제일주의자
            'PURE': 16,    // 신중파
            'PICK': 15,    // ChatGPT 마법사
            'SCAN': 13,    // 검증 전문가
            'ECHO': 18,    // 심플 라이프 신
            'CTRL': 12,    // 조종왕
            'VIBE': 8,     // 감성 아티스트
            'SYNC': 7,     // AI 마스터
            'HYPE': 6,     // AI 선교사
            'BETA': 5,     // 얼리버드
            'SAGE': 4,     // 밸런스 마스터
            'HIDE': 3,     // 숨은 고수
            'FLOW': 2,     // 완전체
            'NOVA': 1      // 예언자
        };

        let percentage;
        
        // 실시간 통계가 있으면 사용
        if (stats && stats.total_users > 100) {
            const typeCount = stats.type_distribution[typeCode] || 0;
            percentage = Math.round((typeCount / stats.total_users) * 100 * 10) / 10;
        } else {
            // 예상 희귀도 사용
            percentage = estimatedRarity[typeCode] || 10;
        }

        // 희귀도 등급 결정
        let tier, tierText;
        
        if (language === 'ko') {
            if (percentage <= 1) {
                tier = '레전더리';
                tierText = '레전더리 타입';
            } else if (percentage <= 3) {
                tier = '울트라 레어';
                tierText = '울트라 레어 타입';
            } else if (percentage <= 8) {
                tier = '에픽';
                tierText = '에픽 타입';
            } else if (percentage <= 15) {
                tier = '레어';
                tierText = '레어 타입';
            } else if (percentage <= 25) {
                tier = '언커먼';
                tierText = '언커먼 타입';
            } else {
                tier = '커먼';
                tierText = '커먼 타입';
            }
        } else {
            if (percentage <= 1) {
                tier = 'Legendary';
                tierText = 'Legendary Type';
            } else if (percentage <= 3) {
                tier = 'Ultra Rare';
                tierText = 'Ultra Rare Type';
            } else if (percentage <= 8) {
                tier = 'Epic';
                tierText = 'Epic Type';
            } else if (percentage <= 15) {
                tier = 'Rare';
                tierText = 'Rare Type';
            } else if (percentage <= 25) {
                tier = 'Uncommon';
                tierText = 'Uncommon Type';
            } else {
                tier = 'Common';
                tierText = 'Common Type';
            }
        }

        return {
            rarity: `${tierText} (상위 ${percentage}%)`,
            percentage: percentage,
            tier: tier,
            isRealTime: stats && stats.total_users > 100
        };
    }

    /**
     * 디버깅용 정보 출력
     * @param {Object} scores - 4축 점수
     * @returns {Object} - 디버그 정보
     */
    getDebugInfo(scores) {
        if (!scores) {
            return { error: 'No scores provided' };
        }

        const typeCode = this.scoresToTypeCode(scores);
        const axisLevels = {
            D: this.scoreToLevel(scores.D),
            E: this.scoreToLevel(scores.E),
            T: this.scoreToLevel(scores.T),
            C: this.scoreToLevel(scores.C)
        };
        const axisCode = axisLevels.D + axisLevels.E + axisLevels.T + axisLevels.C;

        return {
            inputScores: scores,
            axisLevels: axisLevels,
            axisCode: axisCode,
            resultType: typeCode,
            mapping: this.axisMapping[axisCode]
        };
    }

    /**
     * 유효한 퀴즈 완료인지 검증
     * @param {Object} scores - 4축 점수
     * @returns {boolean} - 유효한 완료 여부
     */
    isValidQuizCompletion(scores) {
        if (!scores || typeof scores !== 'object') {
            return false;
        }
        
        // 모든 축 점수가 유효한 범위인지 확인 (5-25점)
        const { D, E, T, C } = scores;
        return (
            typeof D === 'number' && D >= 5 && D <= 25 &&
            typeof E === 'number' && E >= 5 && E <= 25 &&
            typeof T === 'number' && T >= 5 && T <= 25 &&
            typeof C === 'number' && C >= 5 && C <= 25
        );
    }

    /**
     * 결과 공유용 URL 생성
     * @param {string} typeCode - 타입 코드
     * @param {string} language - 언어
     * @returns {string} - 공유용 URL
     */
    generateShareURL(typeCode, language = 'ko') {
        const baseURL = window.location.origin;
        const langPath = language === 'ko' ? '/ko' : '/en';
        return `${baseURL}${langPath}/result/?type=${typeCode.toLowerCase()}`;
    }

    /**
     * 4축 점수로 결과 URL 생성
     * @param {Object} scores - 4축 점수
     * @param {string} language - 언어
     * @returns {string} - 결과 URL
     */
    generateResultURL(scores, language = 'ko') {
        const typeCode = this.scoresToTypeCode(scores);
        return this.generateShareURL(typeCode, language);
    }
}

// 전역에서 사용 가능하도록 등록
window.ResultEngine = ResultEngine;

export default ResultEngine;