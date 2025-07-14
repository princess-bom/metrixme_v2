/**
 * Matrix Me - 4축 점수 계산 엔진
 * D(Dependency) - E(Exploration) - T(Trust) - C(Control) 시스템
 */

class FourAxisEngine {
    constructor() {
        this.axisNames = ['D', 'E', 'T', 'C'];
        this.questionsPerAxis = 5; // 각 축당 5문항
        this.totalQuestions = 20;
    }

    /**
     * D축 (Dependency) 점수 계산 - AI 의존도/사용빈도
     * 5점 = 높은 의존도, 1점 = 낮은 의존도
     */
    calculateDScore(answers) {
        return this.calculateAxisScore(answers, 'D');
    }

    /**
     * E축 (Exploration) 점수 계산 - 새로운 AI 도구 개방성/탐험성
     * 5점 = 높은 개방성, 1점 = 낮은 개방성
     */
    calculateEScore(answers) {
        return this.calculateAxisScore(answers, 'E');
    }

    /**
     * T축 (Trust) 점수 계산 - AI 결과물 신뢰도
     * 5점 = 높은 신뢰, 1점 = 낮은 신뢰
     */
    calculateTScore(answers) {
        return this.calculateAxisScore(answers, 'T');
    }

    /**
     * C축 (Control) 점수 계산 - 작업 주도권
     * 5점 = 내가 주도, 1점 = AI 주도
     */
    calculateCScore(answers) {
        return this.calculateAxisScore(answers, 'C');
    }

    /**
     * 축별 점수 계산 (랜덤 순서 대응)
     */
    calculateAxisScore(answers, axisType) {
        // 축별로 답변 필터링
        const axisAnswers = answers.filter(answer => {
            return answer && answer.axis === axisType;
        });

        console.log(`${axisType}축 답변:`, axisAnswers);

        return axisAnswers.reduce((sum, answer) => {
            return sum + this.getAnswerValue(answer);
        }, 0);
    }

    /**
     * 답변에서 점수 추출
     * a=1, b=2, c=3, d=4, e=5 또는 직접 점수값
     */
    getAnswerValue(answer) {
        if (typeof answer === 'object') {
            // 새로운 방식: {scores: {D: 1, E: 2, T: 3, C: 4}, axis: 'D'}
            if (answer.scores && answer.axis) {
                return answer.scores[answer.axis];
            }
            // 기존 방식: {letter: 'a', value: 1}
            if (answer.value !== undefined) {
                return answer.value;
            }
            if (answer.letter) {
                return this.letterToValue(answer.letter);
            }
        } else if (typeof answer === 'string') {
            // 단순 문자: 'a', 'b', 'c', 'd', 'e'
            return this.letterToValue(answer);
        } else if (typeof answer === 'number') {
            // 직접 점수
            return answer;
        }
        
        // 기본값
        return 3;
    }

    /**
     * 문자를 점수로 변환
     */
    letterToValue(letter) {
        const mapping = {
            'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5
        };
        return mapping[letter.toLowerCase()] || 3;
    }

    /**
     * 점수를 High/Medium/Low로 변환 (docs/quiz_ko.md 기준)
     * High: 18-25점, Low: 5-12점, Medium: 13-17점
     */
    scoreToLevel(score) {
        if (score >= 18) return 'H';
        if (score <= 12) return 'L';
        return 'M'; // Medium: 13-17점
    }

    /**
     * Medium 구간 처리 - 더 세밀한 분석 (docs/quiz_ko.md 기준)
     * 13-17점인 경우 가장 가까운 쪽으로 분류, 15점이면 관련 질문들의 패턴 분석하여 결정
     */
    resolveMediumScore(score, axisAnswers, axisType) {
        if (score <= 12) return 'L';
        if (score >= 18) return 'H';

        // Medium 구간 (13-17점) 해결 로직
        if (score <= 14) {
            // 13-14점이면 Low 쪽으로
            return 'L';
        } else if (score >= 16) {
            // 16-17점이면 High 쪽으로
            return 'H';
        } else {
            // 15점인 경우 - 가장 가까운 쪽으로 분류 (기본적으로 High로)
            // 향후 관련 질문들의 패턴 분석 로직을 추가할 수 있음
            return 'H';
        }
    }

    /**
     * 모든 답변으로부터 4축 점수 계산
     */
    calculateAllScores(answers) {
        if (!answers || answers.length < this.totalQuestions) {
            throw new Error(`Need ${this.totalQuestions} answers, got ${answers?.length || 0}`);
        }

        const dScore = this.calculateDScore(answers);
        const eScore = this.calculateEScore(answers);
        const tScore = this.calculateTScore(answers);
        const cScore = this.calculateCScore(answers);

        return {
            D: dScore,
            E: eScore,
            T: tScore,
            C: cScore,
            total: dScore + eScore + tScore + cScore
        };
    }

    /**
     * 4축 점수를 타입 코드로 변환
     * 예: {D:20, E:15, T:22, C:18} → "HMHH"
     */
    scoresToTypeCode(scores) {
        const dLevel = this.resolveMediumScore(scores.D, null, 'D');
        const eLevel = this.resolveMediumScore(scores.E, null, 'E');
        const tLevel = this.resolveMediumScore(scores.T, null, 'T');
        const cLevel = this.resolveMediumScore(scores.C, null, 'C');

        return dLevel + eLevel + tLevel + cLevel;
    }

    /**
     * 전체 분석 실행
     */
    analyzeAnswers(answers) {
        try {
            const scores = this.calculateAllScores(answers);
            const typeCode = this.scoresToTypeCode(scores);
            
            return {
                success: true,
                scores: scores,
                typeCode: typeCode,
                breakdown: {
                    dependency: { score: scores.D, level: this.scoreToLevel(scores.D) },
                    exploration: { score: scores.E, level: this.scoreToLevel(scores.E) },
                    trust: { score: scores.T, level: this.scoreToLevel(scores.T) },
                    control: { score: scores.C, level: this.scoreToLevel(scores.C) }
                }
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                scores: null,
                typeCode: null
            };
        }
    }

    /**
     * 디버그 정보 출력
     */
    getDebugInfo(answers) {
        if (!answers || answers.length === 0) {
            return { error: 'No answers provided' };
        }

        return {
            totalAnswers: answers.length,
            expectedAnswers: this.totalQuestions,
            scoringSystem: 'H:18+, L:12-, M:13-17 (15점은 H로 분류)',
            answerBreakdown: {
                'Q1-5 (D축)': answers.slice(0, 5),
                'Q6-10 (E축)': answers.slice(5, 10),
                'Q11-15 (T축)': answers.slice(10, 15),
                'Q16-20 (C축)': answers.slice(15, 20)
            },
            scores: answers.length >= this.totalQuestions ? this.calculateAllScores(answers) : null
        };
    }
}

// 전역에서 사용 가능하도록 등록
window.FourAxisEngine = FourAxisEngine;

export default FourAxisEngine;