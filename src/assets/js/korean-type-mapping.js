/**
 * Matrix Me - 한글 재미버전 타입 매핑
 * 4축 시스템 (DETC) → 16개 재미있는 한국어 타입
 */

class KoreanTypeMapping {
    constructor() {
        this.typeMapping = {
            // === 1세대 - 기본 캐릭터들 ===
            
            "HHHH": {
                code: "CTRL",
                englishName: "Compulsive Technology Refactoring Lord", 
                koreanName: "조종왕",
                nickname: "AI는 아르바이트생 나는 사장님",
                description: "AI를 부하직원처럼 부려먹는 완벽주의 보스. AI가 만든 건 그냥 초안일 뿐, 진짜 작업은 지금부터 시작이라고 생각함.",
                rarity: "레어 타입 (상위 12%)",
                rarityLevel: 3,
                traits: [
                    "AI는 아르바이트생, 나는 사장",
                    "AI티 나면 창피해 강박증 보유", 
                    "제출 전 최소 3번은 전체 수정",
                    "AI 결과물 생존율 30%"
                ],
                strengths: [
                    "퀄리티 끝판왕 - 실수? 그게 뭔가요?",
                    "AI 쓰면서도 인간미 유지하는 밸런스 킹",
                    "믿고 맡기는 작업물",
                    "디테일 레이더 - 오타 1개도 못 넘어감"
                ],
                weaknesses: [
                    "완벽 추구하다 마감 털리기 일쑤",
                    "가끔 오버엔지니어링으로 산으로 감",
                    "AI 효율성? 그런 건 나약한 자들이나",
                    "스트레스 레벨 MAX - 혈압 주의"
                ]
            },

            "HHHL": {
                code: "FLOW",
                englishName: "Full-throttle Legendary Output Wizard",
                koreanName: "완전체",
                nickname: "AI 없으면 숨도 못 쉬는 완전 의존형 인간",
                description: "AI가 없으면 아무것도 할 수 없는 완전 AI 의존형 인간. 화장실 갈 때도 ChatGPT에게 경로 물어볼 기세.",
                rarity: "울트라 레어 (상위 2%)",
                rarityLevel: 5,
                traits: [
                    "하루 AI 사용 시간 10시간 이상",
                    "AI야 부르는 횟수가 엄마야보다 많음",
                    "뇌는 AI 프롬프트 생성 전용 기관화",
                    "인간 vs AI 구분 못 할 정도로 일체화"
                ],
                strengths: [
                    "생산성 우주급 - 하루에 10명분 일 처리",
                    "AI 활용 끝판왕 - 모든 도구 마스터 수준",
                    "미래 적응력 1등 - AI 시대 완벽 대비",
                    "문제 해결 속도 광속 - 막히는 게 없음"
                ],
                weaknesses: [
                    "AI 없으면 완전 무력화 - 인터넷 꺼지면 패닉",
                    "인간적 사고력 퇴화 - AI가 뭐라고 했더라?",
                    "의존성 중독 - AI 없는 휴가는 상상도 못 함",
                    "가끔 AI 답변을 맹신하는 위험"
                ]
            },

            "HHLH": {
                code: "BETA",
                englishName: "Budget Experimental Testing Addict",
                koreanName: "얼리버드",
                nickname: "신상 AI 보면 카드긁는 얼리어답터",
                description: "새로 나온 AI 도구만 보면 눈이 번쩍 뜨는 신상 중독자. Product Hunt가 홈페이지고, 베타 테스터 신청은 반사신경.",
                rarity: "에픽 타입 (상위 5%)",
                rarityLevel: 4,
                traits: [
                    "새로 나온 거 = 무조건 써봐야 함",
                    "월 구독료가 용돈을 뛰어넘음",
                    "AI 앱 폴더가 3개 이상 존재",
                    "주변 사람들의 AI 도구 상담사 역할"
                ],
                strengths: [
                    "최신 트렌드 마스터 - AI계의 패셔니스타",
                    "새로운 해결책 발견의 달인",
                    "주변 사람들이 먼저 찾는 AI 컨설턴트",
                    "혁신적 워크플로우 개척자"
                ],
                weaknesses: [
                    "구독료 폭탄으로 가계부 빨간불",
                    "새로운 것에만 집중해서 깊이 부족",
                    "도구 너무 많아서 어떤 걸 써야 할지 혼란",
                    "작심삼일 - 새로운 게 나오면 기존 건 버림"
                ]
            },

            "HHLL": {
                code: "NOVA",
                englishName: "Next-generation Obsessive Visionary Adapter",
                koreanName: "미래인",
                nickname: "아직 안 나온 AI 기술도 미리 상상하는 예언자",
                description: "아직 세상에 없는 AI 기술도 미리 상상해서 준비하는 진짜 미래형 인간. 현재보다 5년 앞서 살고 있음.",
                rarity: "울트라 레어 (상위 1%)",
                rarityLevel: 5,
                traits: [
                    "2030년엔 이렇게 될 거야 예언자 모드",
                    "베타 버전도 너무 늦다고 생각함",
                    "AI 논문 읽기가 취미",
                    "미래 기술 시나리오 상시 작성"
                ],
                strengths: [
                    "트렌드 선도자 - 항상 시대 앞서감",
                    "혁신 마인드 - 불가능한 것도 가능하게 만듬",
                    "장기적 비전 - 미래를 내다보는 눈",
                    "적응력 최강 - 변화에 가장 빠르게 대응"
                ],
                weaknesses: [
                    "현실감 부족 - 아직 기술이 안 따라와",
                    "성급함 - 기다리는 게 제일 힘듬",
                    "소통 어려움 - 남들이 이해 못 함",
                    "과도한 미래 집중으로 현재 놓침"
                ]
            },

            // === 2세대 - 중급자들 ===

            "HLHH": {
                code: "PICK",
                englishName: "Perfect Intelligence Cherry-picking Keeper",
                koreanName: "알짜배기",
                nickname: "ChatGPT 하나로 모든 걸 해결하는 마법사",
                description: "AI 도구 100개 중에서 딱 2-3개만 골라서 그걸로만 모든 걸 해결하는 효율성의 신.",
                rarity: "언커먼 타입 (상위 15%)",
                rarityLevel: 2,
                traits: [
                    "ChatGPT면 충분해 마인드",
                    "한 도구로 10가지 일 처리하는 마법사",
                    "새로운 도구? 기존 걸로 안 되나? 먼저 생각",
                    "구독료는 최소, 효과는 최대"
                ],
                strengths: [
                    "효율성 끝판왕 - 적은 도구로 최대 효과",
                    "도구 마스터 - 선택한 도구는 완전 정복",
                    "경제적 사용 - 구독료 부담 제로",
                    "안정적 워크플로우 - 검증된 방법만 사용"
                ],
                weaknesses: [
                    "새로운 가능성 놓치기 쉬움",
                    "가끔 고집불통 - 내 방식이 최고야",
                    "도구 한계 상황에서 답답함",
                    "트렌드 뒤처짐 - 요즘 뭐가 핫해?"
                ]
            },

            "HLHL": {
                code: "SYNC",
                englishName: "Sophisticated Yielding Neural Craftsman",
                koreanName: "장인",
                nickname: "특정 AI 도구 하나는 신급으로 다루는 마스터",
                description: "특정 AI 도구 하나를 완전히 마스터해서 그 도구로는 신급 결과물을 뽑아내는 진짜 고수.",
                rarity: "레어 타입 (상위 7%)",
                rarityLevel: 3,
                traits: [
                    "선택한 도구의 숨겨진 기능까지 완전 정복",
                    "해당 도구 커뮤니티의 전설급 인물",
                    "이렇게도 할 수 있구나? 감탄사 유발",
                    "도구 하나로 10가지 다른 결과물 창조"
                ],
                strengths: [
                    "전문성 끝판왕 - 해당 분야 원탑",
                    "깊이 있는 노하우 - 남들 모르는 꿀팁 보유",
                    "안정적 퀄리티 - 언제나 일정한 고품질",
                    "교육자 자질 - 가르치는 것도 잘함"
                ],
                weaknesses: [
                    "다양성 부족 - 한 우물만 파는 스타일",
                    "새로운 도구 적응 느림 - 기존 걸로도 충분해",
                    "가끔 융통성 부족 - 내 방식이 최고야",
                    "도구 의존도 높음 - 그 도구 없으면 불안"
                ]
            },

            "HLLH": {
                code: "SAGE",
                englishName: "Sophisticated Analytical Guidance Expert",
                koreanName: "현자",
                nickname: "언제 AI 쓰고 언제 안 쓸지 완벽하게 아는 밸런스 마스터",
                description: "AI를 쓰되 AI에게 휘둘리지 않는 진짜 고수. 언제 쓰고 언제 안 쓸지 완벽하게 판단하는 밸런스의 달인.",
                rarity: "에픽 타입 (상위 4%)",
                rarityLevel: 4,
                traits: [
                    "AI 능력과 한계를 정확히 파악",
                    "상황에 따라 AI 사용 여부 결정", 
                    "AI가 할 일 vs 내가 할 일 명확한 구분",
                    "도구에 의존하지 않는 내공 보유"
                ],
                strengths: [
                    "판단력 최고 - 언제 뭘 써야 할지 정확히 앎",
                    "밸런스 완벽 - AI와 인간의 조화",
                    "멘토 자질 - 다른 사람들의 나침반 역할",
                    "자립성 강함 - AI 없어도 충분히 잘함"
                ],
                weaknesses: [
                    "가끔 너무 신중해서 속도 느림",
                    "완벽주의 성향으로 스트레스",
                    "다른 사람들이 이해하기 어려움",
                    "혼자만 잘하고 공유 적음"
                ]
            },

            "HLLL": {
                code: "ECHO",
                englishName: "Efficient Control Heavy Optimizer",
                koreanName: "미니멀러",
                nickname: "AI 도구 2개로 세상 모든 일 처리하는 심플 라이프 신",
                description: "AI 도구도 미니멀하게, 사용법도 미니멀하게, 결과물도 깔끔하게. 복잡한 건 질색, 심플한 게 최고.",
                rarity: "언커먼 타입 (상위 18%)",
                rarityLevel: 2,
                traits: [
                    "AI 도구 2개 이하로 제한",
                    "복잡한 프롬프트 싫어함",
                    "간단명료가 인생 철학",
                    "결과물도 군더더기 없이 깔끔"
                ],
                strengths: [
                    "효율성 극대화 - 핵심만 딱 집어냄",
                    "학습 속도 빠름 - 복잡하지 않아서",
                    "스트레스 적음 - 선택 장애 없음",
                    "결과물 깔끔 - 보기 좋고 이해하기 쉬움"
                ],
                weaknesses: [
                    "한계 상황에서 답답함",
                    "세밀한 작업엔 부족할 수 있음",
                    "새로운 기능 놓치기 쉬움",
                    "가끔 너무 단순해서 아쉬움"
                ]
            },

            // === 3세대 - 고급자들 ===

            "LHHH": {
                code: "HYPE",
                englishName: "Hyperactive Yelling Passionate Evangelist",
                koreanName: "광신도",
                nickname: "주변 사람들을 AI 전도하려는 열정적 선교사",
                description: "AI의 가능성을 너무 믿어서 주변 사람들까지 전도하려고 하는 열정적인 전파자. AI 선교사급 열정 보유.",
                rarity: "레어 타입 (상위 6%)",
                rarityLevel: 3,
                traits: [
                    "AI로 인생이 바뀌었어! 간증 모드",
                    "모든 대화를 AI로 귀결시킴",
                    "주변 사람들의 AI 사용 현황 체크",
                    "AI 전파가 인생 미션"
                ],
                strengths: [
                    "전파력 최강 - AI 사용자 늘리기 1등 공신",
                    "열정 넘침 - 보는 사람도 의욕 생김",
                    "학습 속도 빠름 - 새로운 기능 즉시 습득",
                    "커뮤니티 리더 - 사람들이 자연스럽게 따름"
                ],
                weaknesses: [
                    "과도한 열정으로 부담스러움",
                    "AI 만능주의 - AI로 안 되는 게 없어",
                    "때로는 강요처럼 느껴짐",
                    "현실적 한계 간과하기 쉬움"
                ]
            },

            "LHHL": {
                code: "HIDE",
                englishName: "Hidden Intelligence Usage Expert",
                koreanName: "숨덕후",
                nickname: "AI 안 쓰는 척하는 숨은 고수",
                description: "겉으로는 AI 거의 안 쓰는 것처럼 보이지만, 실제로는 누구보다 전문적으로 활용하는 진짜 고수.",
                rarity: "에픽 타입 (상위 3%)",
                rarityLevel: 4,
                traits: [
                    "AI? 별로 안 써요 (거짓말ㅋㅋ)",
                    "특정 작업에만 AI 200% 활용",
                    "완벽한 결과물 나와도 그냥 했어요",
                    "비밀 프롬프트 노트북 소지"
                ],
                strengths: [
                    "필요할 때 완벽 활용 - 숨겨진 실력 폭발",
                    "높은 자립성 - 의존하지 않고 선택적 사용",
                    "품질 절대 타협 없음 - 하면 무조건 완벽",
                    "효율적 자원 배분의 달인"
                ],
                weaknesses: [
                    "AI 활용도 낮음 - 더 많이 쓸 수 있는데",
                    "혼자만 잘하고 공유 안 함 (아까워!)",
                    "고립된 작업 선호 - 협업에선 능력 못 드러냄",
                    "노하우 전수 거의 안 함"
                ]
            },

            "LHLH": {
                code: "VIBE",
                englishName: "Vibes-based Intelligence Behavior Expert",
                koreanName: "느낌충",
                nickname: "AI 결과물에 내 손맛 입히는 감성 아티스트",
                description: "AI 결과물이 아무리 완벽해도 뭔가 느낌이 안 와라며 자기 손으로 다시 만드는 감성 아티스트.",
                rarity: "레어 타입 (상위 8%)",
                rarityLevel: 3,
                traits: [
                    "AI가 만든 티 나면 싫어 센서 보유",
                    "결과물에 자기만의 색깔 입히기 필수",
                    "완벽하지만 재미없어 판정 자주 내림",
                    "AI는 아이디어 셔틀, 실제론 내가 창작"
                ],
                strengths: [
                    "창의성 폭발 - 남들과 다른 독창적 결과물",
                    "브랜드 정체성 강함 - 감성 아티스트가 만든 건 다르네",
                    "감성적 어필 탁월 - 사람 마음 확실히 움직임",
                    "완성도 높음 - 만족할 때까지 계속 다듬음"
                ],
                weaknesses: [
                    "효율성? 그게 뭔가요?",
                    "마감 스트레스 엄청남 - 아직 느낌이...",
                    "객관적 기준보다 주관적 만족 우선",
                    "가끔 지나친 완벽주의로 무한루프"
                ]
            },

            "LHLL": {
                code: "PURE",
                englishName: "Persistent User Reviewing Everything",
                koreanName: "소심쟁이",
                nickname: "AI 믿고 싶지만 구글에서 3번 더 확인하는 신중파",
                description: "AI 결과물을 믿고 싶지만 혹시나 하는 마음에 계속 검증하고 또 검증하는 신중한 완벽주의자.",
                rarity: "커먼 타입 (상위 25%)",
                rarityLevel: 1,
                traits: [
                    "AI 답변 받고 구글에서 3번 더 확인",
                    "혹시 틀렸을까봐 불안증 보유",
                    "중요한 일엔 절대 AI만 믿지 않음",
                    "확실한가요?가 입버릇"
                ],
                strengths: [
                    "정확성 99.9% - 실수율 극히 낮음",
                    "신뢰도 최고 - 신중파가 한 거면 믿어도 돼",
                    "리스크 관리 달인 - 사고 예방 전문가",
                    "꼼꼼함 끝판왕 - 놓치는 게 없음"
                ],
                weaknesses: [
                    "속도 느림 - 확인하는 시간이 더 오래 걸림",
                    "기회 놓치기 쉬움 - 더 확인해봐야지",
                    "스트레스 높음 - 항상 불안하고 걱정",
                    "과도한 신중함으로 행동력 저하"
                ]
            },

            // === 4세대 - 특이한 애들 ===

            "LLHH": {
                code: "MESH",
                englishName: "Methodical Extremely Slow Hesitating",
                koreanName: "돌다리왕",
                nickname: "새 AI 도구는 남이 6개월 써본 후 도입하는 안전제일주의자",
                description: "돌다리도 두들겨보고 건너는 성격이 AI에서도 발현. 새로운 AI 도구는 다른 사람들이 최소 6개월 써본 후에 도입.",
                rarity: "커먼 타입 (상위 22%)",
                rarityLevel: 1,
                traits: [
                    "검증된 것만 사용 원칙",
                    "새로운 기능도 리뷰 100개 읽고 결정",
                    "혹시 개인정보 유출되면? 걱정 항상",
                    "무료 버전으로 6개월 테스트 후 유료 전환"
                ],
                strengths: [
                    "보안 의식 투철 - 정보 유출 걱정 없음",
                    "신중한 선택 - 실패 확률 낮음",
                    "안정적 사용 - 검증된 방법만 사용",
                    "리스크 관리 전문가 - 예상치 못한 문제 예방"
                ],
                weaknesses: [
                    "기회 비용 높음 - 좋은 도구 늦게 접함",
                    "변화 적응 느림 - 남들보다 6개월 뒤처짐",
                    "과도한 걱정 - 혹시나 스트레스",
                    "혁신적 시도 어려움"
                ]
            },

            "LLHL": {
                code: "SCAN",
                englishName: "Suspicious Careful AI Navigator",
                koreanName: "의심덩어리",
                nickname: "AI 답변 받자마자 팩트체크 모드 돌입하는 검증 전문가",
                description: "AI 결과물을 받으면 즉시 팩트체크 모드로 돌입하는 검증 전문가. 믿되 의심하라를 실천하는 현실주의자.",
                rarity: "언커먼 타입 (상위 16%)",
                rarityLevel: 2,
                traits: [
                    "AI 답변에 대한 검증이 습관",
                    "정말로?가 입버릇",
                    "팩트체크를 위한 도구들 여러 개 보유",
                    "틀린 정보 발견하면 의기양양"
                ],
                strengths: [
                    "정확성 검증 전문가 - 가짜 정보 걸러냄",
                    "비판적 사고력 우수 - 맹신하지 않음",
                    "신뢰도 높은 결과물 - 검증된 정보만 사용",
                    "문제 발견 능력 - 오류 찾기 달인"
                ],
                weaknesses: [
                    "검증 시간으로 효율성 저하",
                    "과도한 의심으로 스트레스",
                    "가끔 지나치게 신중해서 진전 없음",
                    "AI의 장점을 충분히 활용 못함"
                ]
            },

            "LLLH": {
                code: "BASE",
                englishName: "Barely Accepting Smart-tool Extremely-cautiously",
                koreanName: "겁쟁이",
                nickname: "AI 기술이 무서워서 최대한 피하려는 순수한 마음의 소유자",
                description: "AI 기술이 무섭고 복잡해서 최대한 피하려고 하는 순수한 마음의 소유자. 옛날이 좋았어 성향 강함.",
                rarity: "커먼 타입 (상위 30%)",
                rarityLevel: 1,
                traits: [
                    "AI가 내 일자리를 뺏을까봐 걱정",
                    "복잡한 것보다 익숙한 것 선호",
                    "새로운 기술에 대한 막연한 두려움",
                    "AI 사용할 때마다 긴장감 max"
                ],
                strengths: [
                    "기본기 탄탄 - AI 없이도 할 줄 아는 실력",
                    "신중한 접근 - 무분별한 사용 안함",
                    "인간적 감성 - 사람 냄새 나는 결과물",
                    "안전 의식 - 리스크 회피 능력"
                ],
                weaknesses: [
                    "기술 발전에 뒤처질 위험",
                    "효율성 떨어짐 - 모든 걸 수동으로",
                    "변화 적응 어려움",
                    "기회비용 높음 - 좋은 도구 못 씀"
                ]
            },

            "LLLL": {
                code: "CORE",
                englishName: "Classic Old-school Reliable Expert",
                koreanName: "아날로그인간",
                nickname: "손으로 하는 게 마음 편한 아날로그 장인",
                description: "디지털 시대에 아직도 손으로 쓰는 걸 선호하는 원시인(칭찬). AI보다 자기 손이 더 빠르고 믿음직하다고 생각함.",
                rarity: "커먼 타입 (상위 20%)",
                rarityLevel: 1,
                traits: [
                    "메모는 무조건 손글씨 (노트 덕후)",
                    "AI가 틀리면 어떡해? 걱정증 보유",
                    "구글링 > ChatGPT (네이버 > 구글)",
                    "중요한 건 무조건 직접 해야 마음 편함"
                ],
                strengths: [
                    "기본기 탄탄 - 손으로 다 할 줄 아는 진짜 실력자",
                    "AI 의존성 제로 - 정전되어도 문제없음",
                    "자체 검증 능력 뛰어남 - 실수 적음",
                    "안정감 甲 - 믿고 맡길 수 있는 든든함"
                ],
                weaknesses: [
                    "효율성? 그런 게 있나요?",
                    "반복 작업에 시간 엄청 소모",
                    "AI 트렌드에서 점점 소외감",
                    "할 수 있는 일이 더 많은데 시간 부족"
                ]
            }
        };
    }

    /**
     * 타입 코드로 매핑 정보 가져오기
     */
    getTypeInfo(typeCode) {
        return this.typeMapping[typeCode] || null;
    }

    /**
     * 모든 타입 정보 가져오기
     */
    getAllTypes() {
        return this.typeMapping;
    }

    /**
     * 희귀도별 타입 목록
     */
    getTypesByRarity(rarityLevel) {
        return Object.entries(this.typeMapping)
            .filter(([code, info]) => info.rarityLevel === rarityLevel)
            .map(([code, info]) => ({ code, ...info }));
    }

    /**
     * 타입 코드 검증
     */
    isValidTypeCode(typeCode) {
        return this.typeMapping.hasOwnProperty(typeCode);
    }

    /**
     * 랜덤 타입 가져오기 (테스트용)
     */
    getRandomType() {
        const codes = Object.keys(this.typeMapping);
        const randomCode = codes[Math.floor(Math.random() * codes.length)];
        return { code: randomCode, ...this.typeMapping[randomCode] };
    }
}

// 전역에서 사용 가능하도록 등록
window.KoreanTypeMapping = KoreanTypeMapping;

export default KoreanTypeMapping;