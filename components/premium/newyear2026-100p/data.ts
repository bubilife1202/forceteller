// 2026 신년운세 100페이지 데이터
// 병오년(丙午年) - 붉은 말의 해

// ========== 기본 인터페이스 ==========
export interface NewYear2026Data {
  // 총운
  totalScore: number;
  grade: string;
  yearKeywords: string[];
  yearSummary: string;
  yearAdvice: string;

  // 재물운
  wealthScore: number;
  wealthSummary: string;
  wealthAdvice: string;
  incomeOutlook: string;
  investAdvice: string;
  wealthLuckyMonths: number[];
  wealthCautionMonths: number[];

  // 연애운
  loveScore: number;
  loveSummary: string;
  loveAdvice: string;
  loveTiming: string;
  idealType: string;
  loveLuckyMonths: number[];

  // 결혼운
  marriageScore: number;
  marriageSummary: string;
  marriageAdvice: string;
  spouseType: string;

  // 직업운
  careerScore: number;
  careerSummary: string;
  careerAdvice: string;
  careerChange: string;
  businessLuck: string;

  // 건강운
  healthScore: number;
  healthSummary: string;
  healthAdvice: string;
  weakOrgans: string[];
  healthTips: string[];

  // 가정운
  familyScore: number;
  familySummary: string;
  familyAdvice: string;

  // 대인운
  socialScore: number;
  socialSummary: string;
  socialAdvice: string;
  guiinType: string;
}

// ========== 년간-일간 관계 ==========
export const YEAR_RELATION: Record<string, {
  relation: string;
  element: string;
  description: string;
  score: number;
}> = {
  '갑': {
    relation: '식상운(食傷運)',
    element: '목생화',
    description: '내 재능과 표현력이 빛나는 해입니다. 창작, 교육, 서비스업에서 두각을 나타냅니다.',
    score: 72
  },
  '을': {
    relation: '식상운(食傷運)',
    element: '목생화',
    description: '소통과 인맥이 재물이 되는 해입니다. 사람을 통해 기회가 옵니다.',
    score: 70
  },
  '병': {
    relation: '비겁운(比劫運)',
    element: '동기',
    description: '경쟁이 치열한 해입니다. 협력이 필요하고 과시를 줄여야 합니다.',
    score: 65
  },
  '정': {
    relation: '비겁운(比劫運)',
    element: '동기',
    description: '손실 주의의 해입니다. 보증, 투자에 신중해야 합니다.',
    score: 63
  },
  '무': {
    relation: '인성운(印星運)',
    element: '화생토',
    description: '최고의 운! 화생토로 모든 것이 순조롭습니다. 부동산 대운입니다.',
    score: 85
  },
  '기': {
    relation: '인성운(印星運)',
    element: '화생토',
    description: '지혜와 학업이 빛나는 해입니다. 자격증, 승진에 유리합니다.',
    score: 82
  },
  '경': {
    relation: '관성운(官星運)',
    element: '화극금',
    description: '압박과 책임의 해입니다. 직장운은 좋으나 건강 주의.',
    score: 55
  },
  '신': {
    relation: '관성운(官星運)',
    element: '화극금',
    description: '안정적이나 도전은 피해야 합니다. 본업에 충실하세요.',
    score: 58
  },
  '임': {
    relation: '재성운(財星運)',
    element: '수극화',
    description: '재물 기회의 해! 투자와 사업에서 수익이 예상됩니다.',
    score: 78
  },
  '계': {
    relation: '재성운(財星運)',
    element: '수극화',
    description: '꾸준한 재물 상승의 해입니다. 안정 속 성장이 있습니다.',
    score: 75
  }
};

// ========== 오행별 기본 성격 ==========
export const ELEMENT_TRAITS: Record<string, {
  element: string;
  personality: string;
  strength: string;
  weakness: string;
}> = {
  '갑': { element: '양목(陽木)', personality: '리더십, 추진력, 정의감', strength: '결단력, 책임감', weakness: '고집, 독선' },
  '을': { element: '음목(陰木)', personality: '유연함, 적응력, 친화력', strength: '협조성, 인내', weakness: '우유부단, 의존' },
  '병': { element: '양화(陽火)', personality: '열정, 명랑함, 사교성', strength: '활력, 긍정', weakness: '조급함, 과시' },
  '정': { element: '음화(陰火)', personality: '섬세함, 예술성, 배려', strength: '집중력, 섬세함', weakness: '예민함, 걱정' },
  '무': { element: '양토(陽土)', personality: '신뢰감, 포용력, 안정감', strength: '중재력, 신용', weakness: '완고함, 느림' },
  '기': { element: '음토(陰土)', personality: '실용성, 성실함, 인내', strength: '꾸준함, 현실감', weakness: '소심함, 의심' },
  '경': { element: '양금(陽金)', personality: '결단력, 의리, 냉철함', strength: '실행력, 정확함', weakness: '냉정함, 비타협' },
  '신': { element: '음금(陰金)', personality: '세련됨, 품격, 분별력', strength: '감각, 정밀함', weakness: '까다로움, 비판' },
  '임': { element: '양수(陽水)', personality: '지혜, 포용력, 적응력', strength: '융통성, 통찰', weakness: '산만함, 변덕' },
  '계': { element: '음수(陰水)', personality: '직관력, 감수성, 인내', strength: '꾸준함, 직감', weakness: '내성적, 우울' }
};

// ========== 월별 운세 데이터 ==========
export const MONTHLY_FORTUNE: Record<string, {
  months: { month: number; score: number; keyword: string; advice: string }[];
}> = {
  '갑': {
    months: [
      { month: 1, score: 65, keyword: '준비', advice: '새해 계획 수립에 집중하세요' },
      { month: 2, score: 70, keyword: '시작', advice: '새로운 일을 시작하기 좋은 달' },
      { month: 3, score: 80, keyword: '도약', advice: '적극적으로 행동하세요' },
      { month: 4, score: 75, keyword: '발전', advice: '꾸준히 노력하면 성과가 있습니다' },
      { month: 5, score: 60, keyword: '조정', advice: '무리하지 말고 페이스 조절' },
      { month: 6, score: 55, keyword: '주의', advice: '건강과 지출에 주의하세요' },
      { month: 7, score: 50, keyword: '인내', advice: '참고 기다리는 시기입니다' },
      { month: 8, score: 65, keyword: '회복', advice: '서서히 좋아지기 시작합니다' },
      { month: 9, score: 78, keyword: '수확', advice: '그동안의 노력이 결실을 맺습니다' },
      { month: 10, score: 82, keyword: '최고', advice: '올해 가장 좋은 운의 달' },
      { month: 11, score: 75, keyword: '마무리', advice: '중요한 일은 이달에 마무리' },
      { month: 12, score: 68, keyword: '정리', advice: '한 해를 정리하고 내년을 준비' }
    ]
  },
  '을': {
    months: [
      { month: 1, score: 60, keyword: '관망', advice: '서두르지 말고 상황을 살피세요' },
      { month: 2, score: 72, keyword: '기회', advice: '좋은 만남이 있는 달' },
      { month: 3, score: 78, keyword: '상승', advice: '인맥을 활용하세요' },
      { month: 4, score: 70, keyword: '안정', advice: '기존 일에 충실하세요' },
      { month: 5, score: 80, keyword: '행운', advice: '뜻밖의 좋은 일이 생깁니다' },
      { month: 6, score: 58, keyword: '주의', advice: '구설수에 주의하세요' },
      { month: 7, score: 52, keyword: '정체', advice: '큰 결정은 미루세요' },
      { month: 8, score: 55, keyword: '인내', advice: '참고 기다리세요' },
      { month: 9, score: 75, keyword: '반전', advice: '상황이 좋아집니다' },
      { month: 10, score: 80, keyword: '성취', advice: '목표한 바를 이룰 수 있습니다' },
      { month: 11, score: 72, keyword: '유지', advice: '현상 유지가 상책' },
      { month: 12, score: 65, keyword: '마무리', advice: '올해 일을 잘 정리하세요' }
    ]
  },
  '병': {
    months: [
      { month: 1, score: 55, keyword: '경쟁', advice: '주변 경쟁자를 의식하세요' },
      { month: 2, score: 58, keyword: '협력', advice: '혼자보다 함께가 좋습니다' },
      { month: 3, score: 62, keyword: '노력', advice: '두 배로 노력해야 합니다' },
      { month: 4, score: 72, keyword: '상승', advice: '좋아지기 시작합니다' },
      { month: 5, score: 78, keyword: '호조', advice: '이달에 중요한 일을 추진하세요' },
      { month: 6, score: 60, keyword: '조심', advice: '과욕을 버리세요' },
      { month: 7, score: 50, keyword: '최저', advice: '모든 일에 신중하세요' },
      { month: 8, score: 55, keyword: '회복', advice: '서서히 나아집니다' },
      { month: 9, score: 65, keyword: '평온', advice: '안정을 추구하세요' },
      { month: 10, score: 70, keyword: '기회', advice: '새로운 기회가 옵니다' },
      { month: 11, score: 75, keyword: '결실', advice: '노력의 결실을 봅니다' },
      { month: 12, score: 80, keyword: '마무리', advice: '좋은 마무리가 됩니다' }
    ]
  },
  '정': {
    months: [
      { month: 1, score: 52, keyword: '주의', advice: '손실에 주의하세요' },
      { month: 2, score: 55, keyword: '인내', advice: '참고 기다리세요' },
      { month: 3, score: 68, keyword: '호전', advice: '상황이 나아집니다' },
      { month: 4, score: 75, keyword: '상승', advice: '좋은 기운이 옵니다' },
      { month: 5, score: 60, keyword: '조정', advice: '무리하지 마세요' },
      { month: 6, score: 50, keyword: '최저', advice: '보수적으로 행동하세요' },
      { month: 7, score: 48, keyword: '위험', advice: '큰 결정은 미루세요' },
      { month: 8, score: 58, keyword: '회복', advice: '조금씩 좋아집니다' },
      { month: 9, score: 72, keyword: '반등', advice: '적극적으로 움직여도 됩니다' },
      { month: 10, score: 65, keyword: '안정', advice: '안정적인 달입니다' },
      { month: 11, score: 70, keyword: '기회', advice: '좋은 기회를 잡으세요' },
      { month: 12, score: 78, keyword: '대운', advice: '연말에 큰 행운이 있습니다' }
    ]
  },
  '무': {
    months: [
      { month: 1, score: 78, keyword: '시작', advice: '새해부터 좋은 기운입니다' },
      { month: 2, score: 82, keyword: '상승', advice: '모든 일이 순조롭습니다' },
      { month: 3, score: 75, keyword: '유지', advice: '좋은 흐름을 유지하세요' },
      { month: 4, score: 85, keyword: '최고', advice: '중요한 일을 이달에!' },
      { month: 5, score: 80, keyword: '발전', advice: '확장에 좋은 시기' },
      { month: 6, score: 70, keyword: '조정', advice: '잠시 쉬어가세요' },
      { month: 7, score: 65, keyword: '주의', advice: '건강에 신경 쓰세요' },
      { month: 8, score: 60, keyword: '휴식', advice: '재충전의 시간' },
      { month: 9, score: 78, keyword: '재도약', advice: '다시 활력을 찾습니다' },
      { month: 10, score: 82, keyword: '수확', advice: '풍성한 수확의 달' },
      { month: 11, score: 88, keyword: '대박', advice: '올해 최고의 달!' },
      { month: 12, score: 75, keyword: '마무리', advice: '감사하며 마무리하세요' }
    ]
  },
  '기': {
    months: [
      { month: 1, score: 72, keyword: '준비', advice: '차근차근 준비하세요' },
      { month: 2, score: 78, keyword: '실행', advice: '계획을 실행에 옮기세요' },
      { month: 3, score: 80, keyword: '발전', advice: '꾸준히 성장합니다' },
      { month: 4, score: 75, keyword: '유지', advice: '좋은 흐름 유지' },
      { month: 5, score: 82, keyword: '상승', advice: '학업, 자격증에 최적' },
      { month: 6, score: 85, keyword: '최고', advice: '중요한 시험, 계약 추천' },
      { month: 7, score: 68, keyword: '조정', advice: '무리하지 마세요' },
      { month: 8, score: 62, keyword: '휴식', advice: '재충전이 필요합니다' },
      { month: 9, score: 70, keyword: '회복', advice: '다시 힘을 찾습니다' },
      { month: 10, score: 78, keyword: '결실', advice: '노력의 결실을 봅니다' },
      { month: 11, score: 80, keyword: '풍요', advice: '풍요로운 달입니다' },
      { month: 12, score: 72, keyword: '감사', advice: '감사하며 마무리' }
    ]
  },
  '경': {
    months: [
      { month: 1, score: 50, keyword: '압박', advice: '스트레스 관리가 중요' },
      { month: 2, score: 52, keyword: '인내', advice: '참고 견디세요' },
      { month: 3, score: 58, keyword: '노력', advice: '두 배로 노력해야 합니다' },
      { month: 4, score: 70, keyword: '호전', advice: '좋아지기 시작합니다' },
      { month: 5, score: 75, keyword: '기회', advice: '승진, 발탁 가능성' },
      { month: 6, score: 55, keyword: '주의', advice: '건강 악화 주의' },
      { month: 7, score: 48, keyword: '최저', advice: '큰 결정은 미루세요' },
      { month: 8, score: 52, keyword: '회복중', advice: '서서히 나아집니다' },
      { month: 9, score: 62, keyword: '안정', advice: '안정을 찾아갑니다' },
      { month: 10, score: 68, keyword: '발전', advice: '조금씩 좋아집니다' },
      { month: 11, score: 78, keyword: '성과', advice: '노력한 만큼 성과' },
      { month: 12, score: 82, keyword: '보상', advice: '연말에 좋은 일이!' }
    ]
  },
  '신': {
    months: [
      { month: 1, score: 55, keyword: '신중', advice: '조심스럽게 시작하세요' },
      { month: 2, score: 58, keyword: '관망', advice: '상황을 지켜보세요' },
      { month: 3, score: 68, keyword: '기회', advice: '좋은 기회가 옵니다' },
      { month: 4, score: 72, keyword: '상승', advice: '운이 좋아집니다' },
      { month: 5, score: 65, keyword: '유지', advice: '현상 유지가 상책' },
      { month: 6, score: 52, keyword: '주의', advice: '건강, 지출 주의' },
      { month: 7, score: 48, keyword: '최저', advice: '조용히 지내세요' },
      { month: 8, score: 55, keyword: '인내', advice: '참고 기다리세요' },
      { month: 9, score: 70, keyword: '반전', advice: '상황이 바뀝니다' },
      { month: 10, score: 78, keyword: '도약', advice: '적극적으로 움직이세요' },
      { month: 11, score: 72, keyword: '결실', advice: '노력의 결실' },
      { month: 12, score: 68, keyword: '정리', advice: '잘 마무리하세요' }
    ]
  },
  '임': {
    months: [
      { month: 1, score: 72, keyword: '시작', advice: '새해 좋은 출발!' },
      { month: 2, score: 68, keyword: '안정', advice: '안정적인 달' },
      { month: 3, score: 78, keyword: '기회', advice: '투자 기회를 잡으세요' },
      { month: 4, score: 82, keyword: '대운', advice: '큰 기회가 옵니다' },
      { month: 5, score: 75, keyword: '유지', advice: '좋은 흐름 유지' },
      { month: 6, score: 58, keyword: '조정', advice: '쉬어가세요' },
      { month: 7, score: 55, keyword: '주의', advice: '과욕은 금물' },
      { month: 8, score: 70, keyword: '회복', advice: '다시 좋아집니다' },
      { month: 9, score: 80, keyword: '수확', advice: '투자 수익 실현' },
      { month: 10, score: 75, keyword: '안정', advice: '안정적으로 유지' },
      { month: 11, score: 85, keyword: '최고', advice: '올해 최고의 달!' },
      { month: 12, score: 78, keyword: '마무리', advice: '좋은 마무리' }
    ]
  },
  '계': {
    months: [
      { month: 1, score: 65, keyword: '준비', advice: '천천히 준비하세요' },
      { month: 2, score: 70, keyword: '시작', advice: '새로운 시작' },
      { month: 3, score: 75, keyword: '상승', advice: '운이 상승합니다' },
      { month: 4, score: 68, keyword: '유지', advice: '안정적 유지' },
      { month: 5, score: 78, keyword: '기회', advice: '좋은 기회가 옵니다' },
      { month: 6, score: 55, keyword: '주의', advice: '건강 주의' },
      { month: 7, score: 52, keyword: '인내', advice: '참고 기다리세요' },
      { month: 8, score: 60, keyword: '회복', advice: '서서히 좋아집니다' },
      { month: 9, score: 72, keyword: '발전', advice: '발전하는 달' },
      { month: 10, score: 80, keyword: '수확', advice: '노력의 수확' },
      { month: 11, score: 82, keyword: '풍요', advice: '풍요로운 달' },
      { month: 12, score: 85, keyword: '대운', advice: '연말 대운!' }
    ]
  }
};

// ========== 행운 아이템 ==========
export const LUCKY_ITEMS: Record<string, {
  colors: string[];
  directions: string[];
  numbers: number[];
  items: string[];
  foods: string[];
}> = {
  '갑': { colors: ['초록', '파랑', '검정'], directions: ['동쪽', '북쪽'], numbers: [3, 8], items: ['나무 소품', '식물', '파란 지갑'], foods: ['푸른 채소', '신맛 과일'] },
  '을': { colors: ['연두', '하늘색', '검정'], directions: ['동쪽', '북쪽'], numbers: [3, 8], items: ['꽃 장식', '녹색 지갑', '수정'], foods: ['샐러드', '허브차'] },
  '병': { colors: ['빨강', '자주', '노랑'], directions: ['남쪽', '중앙'], numbers: [2, 7], items: ['붉은 소품', '황금 장식', '말 인형'], foods: ['매운 음식', '견과류'] },
  '정': { colors: ['분홍', '보라', '노랑'], directions: ['남쪽', '중앙'], numbers: [2, 7], items: ['촛불', '보라색 소품', '크리스탈'], foods: ['과일', '따뜻한 차'] },
  '무': { colors: ['노랑', '황금', '갈색'], directions: ['중앙', '남서쪽'], numbers: [5, 10], items: ['황금 소품', '도자기', '돌 장식'], foods: ['곡물', '고구마'] },
  '기': { colors: ['베이지', '황토색', '갈색'], directions: ['중앙', '북동쪽'], numbers: [5, 10], items: ['도자기', '흙 화분', '갈색 지갑'], foods: ['현미', '감자'] },
  '경': { colors: ['흰색', '금색', '은색'], directions: ['서쪽', '북서쪽'], numbers: [4, 9], items: ['금 장식', '시계', '금속 펜'], foods: ['흰 음식', '매운 음식'] },
  '신': { colors: ['은색', '흰색', '하늘색'], directions: ['서쪽', '북서쪽'], numbers: [4, 9], items: ['은 액세서리', '보석', '금속 소품'], foods: ['흰 생선', '맑은 국'] },
  '임': { colors: ['검정', '남색', '파랑'], directions: ['북쪽'], numbers: [1, 6], items: ['검정 지갑', '물결 모양', '거북이 장식'], foods: ['해산물', '검은콩'] },
  '계': { colors: ['검정', '회색', '파랑'], directions: ['북쪽'], numbers: [1, 6], items: ['물방울 모양', '진주', '은색 지갑'], foods: ['미역', '두부'] }
};

// ========== 일간별 종합 데이터 ==========
export const NEWYEAR_2026_DATA: Record<string, NewYear2026Data> = {
  '갑': {
    totalScore: 72,
    grade: '상승',
    yearKeywords: ['재능 발휘', '창작 활동', '교육', '새로운 시작'],
    yearSummary: '2026년은 갑목 일간에게 식신운이 작용하여 재능과 표현력이 돈이 되는 한 해입니다. 특히 창작, 교육, 서비스 분야에서 두각을 나타낼 수 있습니다.',
    yearAdvice: '숨겨둔 재능을 펼칠 때입니다. 배운 것을 가르치고, 알고 있는 것을 나누세요. 그것이 수입이 됩니다.',

    wealthScore: 74,
    wealthSummary: '본업보다 부업에서 수입이 늘어날 수 있습니다. 재능 기반 수익에 집중하세요.',
    wealthAdvice: '온라인 강의, 콘텐츠 제작, 컨설팅 등 재능을 활용한 수입원을 개발하세요.',
    incomeOutlook: '본업 수입은 안정적이며, 하반기 보너스나 성과급이 기대됩니다.',
    investAdvice: '부동산 장기 투자가 유리합니다. 단기 투기는 피하세요.',
    wealthLuckyMonths: [3, 4, 9, 10],
    wealthCautionMonths: [6, 7],

    loveScore: 70,
    loveSummary: '표현력이 좋아져 이성에게 매력적으로 보입니다. 적극적인 표현이 좋습니다.',
    loveAdvice: '감정을 솔직하게 표현하세요. 숨기지 말고 다가가세요.',
    loveTiming: '봄(3-5월)과 가을(9-11월)에 좋은 만남이 있습니다.',
    idealType: '지적이고 대화가 통하는 사람, 자신만의 재능이 있는 사람',
    loveLuckyMonths: [3, 4, 5, 10],

    marriageScore: 68,
    marriageSummary: '결혼운은 평균적입니다. 서두르지 말고 충분히 알아가세요.',
    marriageAdvice: '올해 결혼보다는 진지한 만남에 집중하세요. 내년이 더 좋습니다.',
    spouseType: '지적이고 대화가 잘 통하는 사람, 서로의 성장을 돕는 파트너',

    careerScore: 75,
    careerSummary: '직장에서 재능을 인정받을 수 있습니다. 프레젠테이션, 기획 업무에 강합니다.',
    careerAdvice: '아이디어를 적극적으로 제안하세요. 인정받을 수 있습니다.',
    careerChange: '이직보다 현 직장에서 새로운 기회를 찾는 것이 좋습니다.',
    businessLuck: '교육, 콘텐츠, 서비스업 창업에 유리합니다.',

    healthScore: 68,
    healthSummary: '간, 담 건강에 주의하세요. 스트레스 관리가 중요합니다.',
    healthAdvice: '과로를 피하고 충분한 수면을 취하세요. 녹색 채소를 많이 드세요.',
    weakOrgans: ['간', '담낭', '눈'],
    healthTips: ['아침 산책', '스트레칭', '녹색 채소 섭취', '절주'],

    familyScore: 72,
    familySummary: '가족과의 대화가 늘어나고 화목한 한 해입니다.',
    familyAdvice: '가족과 함께하는 시간을 늘리세요. 대화가 관계를 좋게 합니다.',

    socialScore: 74,
    socialSummary: '대인관계가 확장됩니다. 새로운 인연이 좋은 기회를 가져옵니다.',
    socialAdvice: '모임에 적극 참여하세요. 인맥이 재물이 됩니다.',
    guiinType: '교육자, 예술가, 콘텐츠 창작자 유형의 귀인이 나타납니다.'
  },
  '을': {
    totalScore: 70,
    grade: '상승',
    yearKeywords: ['인맥 활용', '소통', '유연한 대처', '협력'],
    yearSummary: '2026년은 을목 일간에게 상관운이 작용합니다. 소통 능력이 빛나고 인맥을 통해 기회가 옵니다.',
    yearAdvice: '사람과의 관계를 소중히 하세요. 좋은 인연이 행운을 가져옵니다.',

    wealthScore: 70,
    wealthSummary: '여러 곳에서 작은 수입이 들어옵니다. 다중 수입원을 만드세요.',
    wealthAdvice: '소개 수수료, 커미션 등 인맥 기반 수입에 집중하세요.',
    incomeOutlook: '한 곳에서 큰돈보다 여러 파이프라인을 만드는 것이 유리합니다.',
    investAdvice: '분산 투자가 핵심입니다. 한 곳에 몰빵하지 마세요.',
    wealthLuckyMonths: [2, 3, 5, 9, 10],
    wealthCautionMonths: [7, 8],

    loveScore: 75,
    loveSummary: '매력적인 한 해입니다. 여러 이성의 관심을 받을 수 있습니다.',
    loveAdvice: '너무 많은 만남보다 진정성 있는 관계에 집중하세요.',
    loveTiming: '봄(2-4월)과 가을(9-10월)에 좋은 인연이 있습니다.',
    idealType: '사교적이고 밝은 사람, 함께 있으면 편안한 사람',
    loveLuckyMonths: [2, 3, 5, 9],

    marriageScore: 72,
    marriageSummary: '결혼 논의가 진전될 수 있는 해입니다.',
    marriageAdvice: '상대방 가족과의 관계도 중요하게 생각하세요.',
    spouseType: '사교적이고 가정적인 사람, 주변 평판이 좋은 사람',

    careerScore: 72,
    careerSummary: '팀워크가 중요한 해입니다. 협력을 통해 성과를 냅니다.',
    careerAdvice: '동료들과의 관계를 좋게 유지하세요.',
    careerChange: '인맥을 통한 이직이 유리합니다. 헤드헌팅에 열려 있으세요.',
    businessLuck: '중개업, 상담업, 서비스업이 유리합니다.',

    healthScore: 70,
    healthSummary: '신경계와 소화기 건강에 주의하세요.',
    healthAdvice: '스트레스 관리와 규칙적인 식사가 중요합니다.',
    weakOrgans: ['신경', '위장', '담'],
    healthTips: ['명상', '규칙적 식사', '가벼운 운동'],

    familyScore: 74,
    familySummary: '가족 간 소통이 원활합니다. 형제자매와 협력할 일이 있습니다.',
    familyAdvice: '가족 모임을 자주 가지세요.',

    socialScore: 78,
    socialSummary: '인맥이 크게 확장됩니다. 새로운 만남이 많습니다.',
    socialAdvice: '명함을 많이 나누고 연락을 유지하세요.',
    guiinType: '중개인, 소개자, 네트워커 유형의 귀인이 나타납니다.'
  },
  '병': {
    totalScore: 65,
    grade: '안정',
    yearKeywords: ['경쟁', '협력', '절제', '내실'],
    yearSummary: '2026년은 병화 일간에게 비겁운입니다. 같은 기운이 겹쳐 경쟁이 치열해집니다. 협력이 필요한 해입니다.',
    yearAdvice: '혼자 하려 하지 말고 함께 하세요. 과시욕을 줄이고 내실을 다지세요.',

    wealthScore: 62,
    wealthSummary: '수입은 유지되나 지출이 늘어날 수 있습니다. 저축을 늘리세요.',
    wealthAdvice: '과시 소비를 줄이고, 공동 투자는 피하세요.',
    incomeOutlook: '새로운 수입원보다 기존 수입을 지키는 것이 중요합니다.',
    investAdvice: '올해는 투자보다 저축입니다. 현금 비중을 높이세요.',
    wealthLuckyMonths: [4, 5, 11, 12],
    wealthCautionMonths: [2, 6, 7, 8],

    loveScore: 60,
    loveSummary: '연인과 경쟁자가 동시에 나타날 수 있습니다. 삼각관계 주의.',
    loveAdvice: '명확한 관계 정립이 필요합니다. 애매한 관계는 정리하세요.',
    loveTiming: '하반기(11-12월)가 상대적으로 좋습니다.',
    idealType: '차분하고 이해심 많은 사람, 경쟁보다 협력하는 타입',
    loveLuckyMonths: [5, 11, 12],

    marriageScore: 58,
    marriageSummary: '결혼은 서두르지 않는 것이 좋습니다.',
    marriageAdvice: '충분한 시간을 두고 신중하게 결정하세요.',
    spouseType: '차분하고 안정적인 사람, 내 기운을 보완해주는 사람',

    careerScore: 65,
    careerSummary: '직장 내 경쟁이 있습니다. 실력으로 승부하세요.',
    careerAdvice: '정치보다 실력에 집중하세요. 묵묵히 일하면 인정받습니다.',
    careerChange: '이직은 신중히. 새 직장도 경쟁이 있을 수 있습니다.',
    businessLuck: '동업은 피하고, 단독 창업도 신중히 검토하세요.',

    healthScore: 62,
    healthSummary: '심장, 혈압에 주의하세요. 과로와 스트레스가 문제입니다.',
    healthAdvice: '화를 다스리고 마음의 평화를 유지하세요.',
    weakOrgans: ['심장', '소장', '혈관'],
    healthTips: ['명상', '심호흡', '가벼운 유산소 운동'],

    familyScore: 60,
    familySummary: '형제자매와 재물 문제로 갈등이 있을 수 있습니다.',
    familyAdvice: '돈 문제는 명확히 하세요. 모호한 약속은 피하세요.',

    socialScore: 62,
    socialSummary: '친구가 경쟁자가 될 수 있습니다. 선별적 교류가 필요합니다.',
    socialAdvice: '믿을 수 있는 사람과만 깊게 교류하세요.',
    guiinType: '토 기운이 강한 사람(무, 기)이 귀인입니다.'
  },
  '정': {
    totalScore: 63,
    grade: '안정',
    yearKeywords: ['신중', '자기계발', '준비', '내면 성장'],
    yearSummary: '2026년은 정화 일간에게 겁재운입니다. 손실 주의의 해이지만, 자기 계발에 투자하면 장기적으로 좋습니다.',
    yearAdvice: '투자보다 저축, 확장보다 내실에 집중하세요. 배움에 투자하세요.',

    wealthScore: 58,
    wealthSummary: '급격한 수입 증가보다 안정적 유지가 목표입니다.',
    wealthAdvice: '좋은 투자 기회라며 접근하는 사람을 경계하세요.',
    incomeOutlook: '본업 수입을 지키고, 부업은 소규모로만.',
    investAdvice: '투자보다 저축, 자기계발에 돈을 쓰세요.',
    wealthLuckyMonths: [3, 4, 9, 12],
    wealthCautionMonths: [1, 2, 6, 7],

    loveScore: 65,
    loveSummary: '섬세한 감정 표현이 매력이 됩니다. 천천히 관계를 쌓아가세요.',
    loveAdvice: '급하게 발전시키려 하지 마세요. 시간이 필요합니다.',
    loveTiming: '봄(3-4월)과 연말(12월)이 좋습니다.',
    idealType: '따뜻하고 이해심 많은 사람, 예술적 감성이 있는 사람',
    loveLuckyMonths: [3, 4, 12],

    marriageScore: 60,
    marriageSummary: '결혼 결정은 신중히 하세요. 충분히 알아본 후 결정.',
    marriageAdvice: '상대방의 경제적 상황도 꼼꼼히 확인하세요.',
    spouseType: '안정적이고 믿음직한 사람, 금전 관념이 확실한 사람',

    careerScore: 65,
    careerSummary: '전문성을 높이면 장기적으로 좋습니다. 자격증 취득 추천.',
    careerAdvice: '현 위치에서 실력을 쌓으세요. 때가 오면 빛납니다.',
    careerChange: '이직보다 현 직장에서의 성장에 집중하세요.',
    businessLuck: '창업은 아직 때가 아닙니다. 준비 기간으로 삼으세요.',

    healthScore: 65,
    healthSummary: '심장, 눈 건강에 주의하세요.',
    healthAdvice: '과로와 밤샘을 피하세요. 규칙적인 생활이 중요합니다.',
    weakOrgans: ['심장', '눈', '소장'],
    healthTips: ['충분한 수면', '눈 휴식', '따뜻한 음식'],

    familyScore: 65,
    familySummary: '가족과 함께하는 조용한 시간이 좋습니다.',
    familyAdvice: '가족과의 금전 거래는 피하세요.',

    socialScore: 62,
    socialSummary: '소수의 깊은 관계가 좋습니다. 넓은 인맥보다 진한 관계.',
    socialAdvice: '오래된 친구를 소중히 하세요.',
    guiinType: '토 기운이 강한 사람(무, 기), 신뢰할 수 있는 연장자'
  },
  '무': {
    totalScore: 85,
    grade: '대박',
    yearKeywords: ['최고운', '부동산', '안정', '풍요'],
    yearSummary: '2026년은 무토 일간에게 인성운! 화생토로 최고의 운이 옵니다. 모든 일이 순조롭고 특히 부동산에서 큰 행운이 있습니다.',
    yearAdvice: '적극적으로 움직이세요. 기회를 잡을 때입니다. 단, 욕심은 적당히.',

    wealthScore: 88,
    wealthSummary: '재물운 최고! 본업 수입 증가, 부동산 시세 차익까지.',
    wealthAdvice: '부동산 매입 최적기입니다. 과감하게 투자하세요.',
    incomeOutlook: '본업 수입이 크게 늘고, 임대 수입도 안정적입니다.',
    investAdvice: '부동산, 토지, 실물 자산에 투자하세요.',
    wealthLuckyMonths: [1, 2, 4, 5, 9, 10, 11],
    wealthCautionMonths: [7, 8],

    loveScore: 80,
    loveSummary: '안정적이고 따뜻한 연애운입니다. 진지한 만남이 기대됩니다.',
    loveAdvice: '진심을 다해 대하면 좋은 인연이 옵니다.',
    loveTiming: '상반기(1-5월)와 가을(10-11월)이 좋습니다.',
    idealType: '가정적이고 안정적인 사람, 신뢰감을 주는 사람',
    loveLuckyMonths: [2, 4, 5, 11],

    marriageScore: 85,
    marriageSummary: '결혼 적기입니다! 올해 결혼하면 좋은 가정을 이룹니다.',
    marriageAdvice: '결혼을 계획 중이라면 올해가 최고의 해입니다.',
    spouseType: '성실하고 가정적인 사람, 경제력이 있거나 될 사람',

    careerScore: 85,
    careerSummary: '승진, 이직, 창업 모두 좋습니다. 기회가 많은 해.',
    careerAdvice: '욕심내도 되는 해입니다. 적극적으로 기회를 잡으세요.',
    careerChange: '좋은 조건의 이직 제안이 올 수 있습니다.',
    businessLuck: '부동산, 건설, 인테리어 관련 사업이 특히 좋습니다.',

    healthScore: 75,
    healthSummary: '비위(소화기) 건강에 신경 쓰세요.',
    healthAdvice: '과식을 피하고 규칙적으로 드세요.',
    weakOrgans: ['위장', '비장', '근육'],
    healthTips: ['규칙적 식사', '과식 금지', '걷기 운동'],

    familyScore: 85,
    familySummary: '가족 모두에게 좋은 해입니다. 화목한 한 해.',
    familyAdvice: '가족과 함께 부동산을 알아보는 것도 좋습니다.',

    socialScore: 82,
    socialSummary: '인맥이 재물이 됩니다. 좋은 사람들과의 만남이 많습니다.',
    socialAdvice: '적극적으로 모임에 참여하세요.',
    guiinType: '화 기운(병, 정), 목 기운(갑, 을)을 가진 사람이 귀인입니다.'
  },
  '기': {
    totalScore: 82,
    grade: '대박',
    yearKeywords: ['학업', '자격증', '승진', '지혜'],
    yearSummary: '2026년은 기토 일간에게 편인운! 지혜와 학업이 빛나는 해입니다. 배움이 성공으로 이어집니다.',
    yearAdvice: '배움에 투자하세요. 자격증, 승진 시험 도전 최적기입니다.',

    wealthScore: 80,
    wealthSummary: '크게 벌기보다 꾸준히 모이는 형태입니다. 복리 효과를 믿으세요.',
    wealthAdvice: '적립식 투자가 최고입니다. 매월 꾸준히.',
    incomeOutlook: '저축한 돈이 복리로 불어나고, 작은 투자가 결실을 맺습니다.',
    investAdvice: '소형 부동산, 배당주, 적금 등 안정적 자산이 좋습니다.',
    wealthLuckyMonths: [2, 3, 5, 6, 10, 11],
    wealthCautionMonths: [7, 8],

    loveScore: 78,
    loveSummary: '지적인 매력이 빛나는 해입니다. 대화로 사랑을 얻습니다.',
    loveAdvice: '공부 모임, 세미나 등에서 좋은 인연을 만날 수 있습니다.',
    loveTiming: '봄(2-3월)과 초여름(5-6월)이 좋습니다.',
    idealType: '지적이고 대화가 통하는 사람, 향상심이 있는 사람',
    loveLuckyMonths: [2, 3, 5, 6],

    marriageScore: 78,
    marriageSummary: '결혼에 좋은 해입니다. 안정적인 가정을 이룰 수 있습니다.',
    marriageAdvice: '서로의 성장을 돕는 파트너를 선택하세요.',
    spouseType: '지적이고 성실한 사람, 함께 성장할 수 있는 사람',

    careerScore: 85,
    careerSummary: '자격증, 승진 시험에 최고의 해! 공부한 만큼 성과.',
    careerAdvice: '시험, 면접에 도전하세요. 좋은 결과가 있습니다.',
    careerChange: '더 좋은 조건으로 이직할 수 있는 해입니다.',
    businessLuck: '교육, 컨설팅, 서비스업 창업이 좋습니다.',

    healthScore: 78,
    healthSummary: '소화기 건강에 주의하세요. 스트레스성 위장병 조심.',
    healthAdvice: '천천히 꼭꼭 씹어 드세요. 인스턴트 식품을 줄이세요.',
    weakOrgans: ['위장', '비장', '피부'],
    healthTips: ['천천히 식사', '규칙적 생활', '산책'],

    familyScore: 80,
    familySummary: '가족과 함께 공부하거나 여행하면 좋습니다.',
    familyAdvice: '부모님께 배움의 기회를 드리는 것도 좋습니다.',

    socialScore: 80,
    socialSummary: '스터디 그룹, 학습 모임에서 좋은 인연을 만납니다.',
    socialAdvice: '배움을 나누는 관계가 오래갑니다.',
    guiinType: '화 기운(병, 정)을 가진 선생님, 멘토가 귀인입니다.'
  },
  '경': {
    totalScore: 55,
    grade: '주의',
    yearKeywords: ['직장운', '압박', '인내', '건강 주의'],
    yearSummary: '2026년은 경금 일간에게 편관운입니다. 직장에서는 승진 기회가 있으나 스트레스도 많은 해입니다.',
    yearAdvice: '욕심을 버리고 본업에 충실하세요. 건강 관리가 우선입니다.',

    wealthScore: 52,
    wealthSummary: '직장 수입은 안정적이나 투자 손실 주의.',
    wealthAdvice: '올해는 투자보다 저축입니다. 안전 자산으로 가세요.',
    incomeOutlook: '월급은 오를 수 있으나 투자 수익은 기대 이하.',
    investAdvice: '예금, 적금, 국채 등 안전 자산 위주로.',
    wealthLuckyMonths: [4, 5, 11, 12],
    wealthCautionMonths: [1, 2, 6, 7],

    loveScore: 55,
    loveSummary: '바쁜 업무로 연애할 시간이 부족할 수 있습니다.',
    loveAdvice: '일과 사랑의 균형을 찾으세요.',
    loveTiming: '하반기(11-12월)가 상대적으로 좋습니다.',
    idealType: '이해심 많고 참을성 있는 사람',
    loveLuckyMonths: [5, 11, 12],

    marriageScore: 52,
    marriageSummary: '결혼은 서두르지 않는 것이 좋습니다.',
    marriageAdvice: '올해보다 내년을 기약하세요.',
    spouseType: '차분하고 이해심 많은 사람, 직업이 안정적인 사람',

    careerScore: 68,
    careerSummary: '승진, 발탁 가능성은 있으나 압박감도 큽니다.',
    careerAdvice: '맡은 일에 최선을 다하세요. 인정받습니다.',
    careerChange: '이직은 신중히. 현 직장이 더 나을 수 있습니다.',
    businessLuck: '창업보다 직장 생활이 유리한 해입니다.',

    healthScore: 48,
    healthSummary: '폐, 대장, 피부 건강에 특히 주의! 스트레스성 질환 조심.',
    healthAdvice: '무리하지 마세요. 건강이 최우선입니다.',
    weakOrgans: ['폐', '대장', '피부', '뼈'],
    healthTips: ['충분한 휴식', '스트레스 관리', '가벼운 운동'],

    familyScore: 60,
    familySummary: '가족이 위안이 되는 해입니다.',
    familyAdvice: '힘들 때 가족에게 기대세요.',

    socialScore: 55,
    socialSummary: '인간관계보다 자기 관리에 집중하세요.',
    socialAdvice: '에너지를 분산시키지 마세요.',
    guiinType: '토 기운(무, 기)을 가진 사람이 귀인입니다. 상사의 도움.'
  },
  '신': {
    totalScore: 58,
    grade: '안정',
    yearKeywords: ['품격', '가치', '신중', '브랜딩'],
    yearSummary: '2026년은 신금 일간에게 정관운입니다. 안정적이지만 화려하지 않은 해. 품격으로 승부하세요.',
    yearAdvice: '급하게 움직이지 말고 가치 있는 일에 집중하세요.',

    wealthScore: 58,
    wealthSummary: '안정적이지만 급격한 상승은 어렵습니다. 가치 투자.',
    wealthAdvice: '프리미엄 전략으로 가세요. 싼 게 비지떡.',
    incomeOutlook: '전문성을 인정받아 프리미엄 가격을 받을 수 있습니다.',
    investAdvice: '가치주, 금, 예술품 등 가치 있는 자산에 투자.',
    wealthLuckyMonths: [3, 4, 9, 10],
    wealthCautionMonths: [1, 2, 6, 7],

    loveScore: 60,
    loveSummary: '품격 있는 만남이 있습니다. 질적으로 좋은 인연.',
    loveAdvice: '첫인상보다 시간이 지나면서 매력을 느끼게 됩니다.',
    loveTiming: '봄(3-4월)과 가을(9-10월)이 좋습니다.',
    idealType: '품격 있고 교양 있는 사람, 자기 일에 전문성이 있는 사람',
    loveLuckyMonths: [3, 4, 9, 10],

    marriageScore: 58,
    marriageSummary: '서두르지 않으면 좋은 결혼이 될 수 있습니다.',
    marriageAdvice: '상대방의 가치관을 충분히 확인하세요.',
    spouseType: '품위 있고 안정적인 사람, 가문이 좋은 사람',

    careerScore: 62,
    careerSummary: '전문성으로 인정받는 해입니다.',
    careerAdvice: '자신만의 분야에서 최고가 되세요.',
    careerChange: '급하게 움직이지 마세요. 좋은 기회를 기다리세요.',
    businessLuck: '프리미엄 서비스, 컨설팅 분야가 좋습니다.',

    healthScore: 55,
    healthSummary: '폐, 피부 건강에 주의하세요.',
    healthAdvice: '공기 좋은 곳에서 휴식을 취하세요.',
    weakOrgans: ['폐', '대장', '피부'],
    healthTips: ['공기 정화', '피부 관리', '호흡 운동'],

    familyScore: 62,
    familySummary: '가족과 품격 있는 시간을 보내세요.',
    familyAdvice: '좋은 식당, 좋은 여행지에서 추억을 만드세요.',

    socialScore: 58,
    socialSummary: '소수의 질 좋은 인맥이 좋습니다.',
    socialAdvice: '아무나 만나지 말고 선별적으로 교류하세요.',
    guiinType: '토 기운(무, 기)을 가진 사람, 품격 있는 연장자가 귀인.'
  },
  '임': {
    totalScore: 78,
    grade: '상승',
    yearKeywords: ['투자 기회', '다중 수입', '해외', '유동성'],
    yearSummary: '2026년은 임수 일간에게 편재운! 투자와 사업에서 큰 기회가 옵니다. 다양한 곳에서 수입이 들어옵니다.',
    yearAdvice: '기회를 잡되 너무 분산하지 마세요. 관리 가능한 수준으로.',

    wealthScore: 82,
    wealthSummary: '재물 기회가 많은 해! 투자 수익, 부업 수익 등 다중 수입.',
    wealthAdvice: '해외 주식, ETF, 외화 투자가 유리합니다.',
    incomeOutlook: '여러 파이프라인에서 수입이 들어옵니다.',
    investAdvice: '분산 투자하되 3-5개로 관리 가능하게.',
    wealthLuckyMonths: [1, 3, 4, 8, 9, 11],
    wealthCautionMonths: [6, 7],

    loveScore: 75,
    loveSummary: '다양한 만남이 있는 해입니다. 선택이 필요합니다.',
    loveAdvice: '한 사람에게 집중하세요. 여러 명과 동시에는 안 됩니다.',
    loveTiming: '봄(3-4월)과 가을(9-11월)이 좋습니다.',
    idealType: '활동적이고 넓은 시야를 가진 사람',
    loveLuckyMonths: [3, 4, 9, 11],

    marriageScore: 72,
    marriageSummary: '결혼 논의가 진전될 수 있는 해입니다.',
    marriageAdvice: '경제적 부분을 명확히 정리하고 결혼하세요.',
    spouseType: '경제 관념이 확실한 사람, 함께 재테크할 파트너',

    careerScore: 75,
    careerSummary: '새로운 기회가 많은 해입니다. 다양한 제안이 옵니다.',
    careerAdvice: '좋은 기회를 잘 선별하세요.',
    careerChange: '더 좋은 조건의 이직이 가능합니다.',
    businessLuck: '해외 무역, 온라인 사업, 투자 관련 사업이 좋습니다.',

    healthScore: 68,
    healthSummary: '신장, 방광 건강에 주의하세요.',
    healthAdvice: '물을 충분히 마시고, 하체 운동을 하세요.',
    weakOrgans: ['신장', '방광', '생식기'],
    healthTips: ['충분한 수분 섭취', '하체 운동', '족욕'],

    familyScore: 70,
    familySummary: '가족과 함께 재테크를 논의하면 좋습니다.',
    familyAdvice: '가족 여행이나 함께하는 활동이 좋습니다.',

    socialScore: 78,
    socialSummary: '비즈니스 인맥이 확장됩니다.',
    socialAdvice: '돈 되는 인맥을 만드세요. 투자 정보를 공유하는 모임.',
    guiinType: '금 기운(경, 신)을 가진 사람이 귀인입니다. 투자 조언자.'
  },
  '계': {
    totalScore: 75,
    grade: '상승',
    yearKeywords: ['꾸준한 성장', '복리', '안정', '지혜'],
    yearSummary: '2026년은 계수 일간에게 정재운! 급격한 변화보다 꾸준한 성장이 있는 해입니다.',
    yearAdvice: '조급해하지 마세요. 천천히 가면 멀리 갑니다.',

    wealthScore: 75,
    wealthSummary: '꾸준히 자산이 늘어나는 해입니다. 복리의 마법.',
    wealthAdvice: '적립식 투자, 연금 납입을 늘리세요.',
    incomeOutlook: '본업 수입이 조금씩 늘고, 저축이 복리로 불어납니다.',
    investAdvice: '안전 자산 위주로. 적금, 연금, 배당주.',
    wealthLuckyMonths: [2, 3, 5, 10, 11, 12],
    wealthCautionMonths: [6, 7],

    loveScore: 72,
    loveSummary: '천천히 깊어지는 사랑이 있습니다.',
    loveAdvice: '급하게 발전시키려 하지 마세요. 시간이 답입니다.',
    loveTiming: '봄(2-3월)과 연말(11-12월)이 좋습니다.',
    idealType: '차분하고 깊이 있는 사람, 말보다 행동하는 사람',
    loveLuckyMonths: [2, 3, 11, 12],

    marriageScore: 70,
    marriageSummary: '안정적인 결혼이 가능한 해입니다.',
    marriageAdvice: '서두르지 말고 충분히 알아가세요.',
    spouseType: '안정적이고 성실한 사람, 저축 습관이 좋은 사람',

    careerScore: 72,
    careerSummary: '묵묵히 일하면 인정받는 해입니다.',
    careerAdvice: '조용히 실력을 쌓으세요. 때가 옵니다.',
    careerChange: '급하게 움직이지 마세요. 기다리면 좋은 기회가.',
    businessLuck: '상담, 교육, 콘텐츠 분야가 좋습니다.',

    healthScore: 70,
    healthSummary: '신장, 허리 건강에 주의하세요.',
    healthAdvice: '물을 충분히 마시고, 허리 스트레칭을 자주 하세요.',
    weakOrgans: ['신장', '방광', '허리'],
    healthTips: ['수분 섭취', '허리 스트레칭', '반신욕'],

    familyScore: 75,
    familySummary: '가족과 평화로운 한 해입니다.',
    familyAdvice: '조용히 함께하는 시간이 좋습니다.',

    socialScore: 70,
    socialSummary: '깊은 관계가 좋습니다. 넓은 인맥보다 진한 우정.',
    socialAdvice: '오래된 친구를 소중히 하세요.',
    guiinType: '금 기운(경, 신)을 가진 사람, 신뢰할 수 있는 선배가 귀인.'
  }
};

export default NEWYEAR_2026_DATA;
