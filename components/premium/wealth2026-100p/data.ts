// 2026 대박 재물운 100페이지 데이터
// 병오년(丙午年) - 붉은 말의 해

export interface Wealth2026Data {
  yearScore: number;
  grade: string;
  keywords: string[];
  yearSummary: string;
  incomeOutlook: string;
  investmentAdvice: string;
  warningMessage: string;
  luckyMonths: number[];
  cautionMonths: number[];
  bestAssets: string[];
  avoidAssets: string[];
  sideHustleIdeas: string[];
  taxTips: string[];
}

// 병오년과 일간의 관계
export const YEAR_RELATION: Record<string, { relation: string; score: number; desc: string }> = {
  '갑': { relation: '식상운', score: 72, desc: '병화가 갑목의 식신으로 재능이 돈이 되는 해입니다.' },
  '을': { relation: '식상운', score: 70, desc: '병화가 을목의 상관으로 창의적 수입이 늘어납니다.' },
  '병': { relation: '비겁운', score: 65, desc: '같은 병화로 경쟁이 치열하나 협력하면 좋습니다.' },
  '정': { relation: '비겁운', score: 63, desc: '겁재운으로 재물 분쟁에 주의하세요.' },
  '무': { relation: '인성운', score: 85, desc: '화생토! 최고의 재물운, 부동산이 유리합니다.' },
  '기': { relation: '인성운', score: 82, desc: '편인운으로 지혜롭게 재물을 모읍니다.' },
  '경': { relation: '관성운', score: 55, desc: '편관운으로 직장운은 좋으나 투자는 신중히.' },
  '신': { relation: '관성운', score: 58, desc: '정관운으로 안정적 수입, 모험은 피하세요.' },
  '임': { relation: '재성운', score: 78, desc: '편재운! 투자와 사업에서 기회가 옵니다.' },
  '계': { relation: '재성운', score: 75, desc: '정재운으로 꾸준한 수입 증가가 예상됩니다.' },
};

// 일간별 2026 재물 상세
export const WEALTH_2026_BY_STEM: Record<string, Wealth2026Data> = {
  '갑': {
    yearScore: 72,
    grade: '상승',
    keywords: ['재능 수익화', '교육 사업', '콘텐츠 수입', '장기 투자'],
    yearSummary: '2026년 갑목 일간은 식신운이 작용하여 재능과 기술이 돈이 되는 한 해입니다. 창작 활동, 교육, 컨설팅 등에서 수입이 늘어나며, 본업보다 부업에서 의외의 수익이 발생할 수 있습니다.',
    incomeOutlook: '본업 수입은 안정적으로 유지되며, 특히 하반기에 보너스나 성과급이 기대됩니다. 강의, 저술, 온라인 콘텐츠 등 재능 기반 부수입이 늘어날 전망입니다.',
    investmentAdvice: '부동산 장기 투자가 유리합니다. 단기 투자보다 5년 이상 보유할 자산에 집중하세요. 주식은 우량주 위주로, 테마주는 피하세요.',
    warningMessage: '형제나 친구와의 금전 거래는 피하세요. 보증은 절대 금물입니다. 상반기보다 하반기에 큰 지출이 예상되니 미리 준비하세요.',
    luckyMonths: [3, 4, 9, 10, 11],
    cautionMonths: [1, 6, 7],
    bestAssets: ['부동산', '우량주', '적금', '연금'],
    avoidAssets: ['암호화폐', '선물옵션', '테마주'],
    sideHustleIdeas: ['온라인 강의', '전자책', '컨설팅', '블로그'],
    taxTips: ['연금저축 최대 납입', 'IRP 활용', '기부금 공제']
  },
  '을': {
    yearScore: 70,
    grade: '상승',
    keywords: ['인맥 수익', '서비스업', '유연한 수입', '네트워크'],
    yearSummary: '2026년 을목 일간은 상관운이 작용하여 인맥과 소통 능력이 돈이 됩니다. 사람을 통해 기회가 오며, 서비스업이나 중개업에서 수입이 늘어납니다.',
    incomeOutlook: '다양한 곳에서 작은 수입들이 들어옵니다. 한 곳에서 큰돈보다 여러 파이프라인을 만드세요. 소개 수수료, 커미션 수입이 늘어납니다.',
    investmentAdvice: '분산 투자가 핵심입니다. 한 곳에 몰빵하지 마세요. 적금, 펀드, 소액 부동산 등 다양하게 분산하세요.',
    warningMessage: '친한 사람에게도 돈을 빌려주지 마세요. 감정적 투자 결정은 금물입니다. 사업 제안은 꼼꼼히 검토하세요.',
    luckyMonths: [2, 3, 5, 9, 10],
    cautionMonths: [1, 7, 8],
    bestAssets: ['분산 펀드', '적금', '배당주', '소형 부동산'],
    avoidAssets: ['고위험 주식', '레버리지', '단기 투기'],
    sideHustleIdeas: ['중개업', '상담', '네트워크 마케팅', 'SNS 마케팅'],
    taxTips: ['소득공제 최대 활용', '의료비 공제', '신용카드 공제']
  },
  '병': {
    yearScore: 65,
    grade: '안정',
    keywords: ['경쟁 심화', '협력 필요', '과시 주의', '저축 강화'],
    yearSummary: '2026년 병화 일간은 비겁운으로 같은 기운이 겹칩니다. 경쟁자가 많아지고 재물이 분산될 수 있습니다. 혼자보다 협력이 유리한 해입니다.',
    incomeOutlook: '수입은 유지되나 지출도 늘어납니다. 과시 소비를 줄이고 저축을 늘려야 합니다. 동업이나 팀 프로젝트에서 수입 기회가 있습니다.',
    investmentAdvice: '올해는 공격적 투자보다 수성이 중요합니다. 기존 자산을 잘 지키고, 새 투자는 신중하게. 부동산보다 현금 비중을 높이세요.',
    warningMessage: '형제, 친구와 돈 문제로 다툴 수 있습니다. 공동 투자는 피하세요. 과시 욕구를 억제하고 검소하게 생활하세요.',
    luckyMonths: [4, 5, 11, 12],
    cautionMonths: [2, 6, 7, 8],
    bestAssets: ['예금', '적금', '국채', '금'],
    avoidAssets: ['공동 투자', '고위험 상품', '사행성'],
    sideHustleIdeas: ['팀 프로젝트', '공동 창업', '프리랜서 협업'],
    taxTips: ['비용 처리 철저', '경비 영수증 관리', '절세 상품 가입']
  },
  '정': {
    yearScore: 63,
    grade: '안정',
    keywords: ['전문성 강화', '지출 주의', '자기계발', '실력 투자'],
    yearSummary: '2026년 정화 일간은 겁재운으로 재물 손실에 주의해야 합니다. 하지만 전문성을 높이면 장기적으로 고수입을 얻을 수 있는 준비의 해입니다.',
    incomeOutlook: '급격한 수입 증가보다 안정적 유지가 목표입니다. 자기 계발에 투자하면 내년부터 수입이 늘어납니다. 프리미엄 서비스로 차별화하세요.',
    investmentAdvice: '투자보다 저축이 유리한 해입니다. 리스크를 피하고 원금을 지키세요. 공부하는 데 투자하면 나중에 큰 수익이 됩니다.',
    warningMessage: '사기나 손실에 특히 주의하세요. 좋은 투자 기회라며 접근하는 사람을 경계하세요. 보증, 대출은 절대 안 됩니다.',
    luckyMonths: [3, 4, 9, 12],
    cautionMonths: [1, 2, 6, 7],
    bestAssets: ['적금', '연금', '자기계발', '교육'],
    avoidAssets: ['고위험 투자', '보증', '대출'],
    sideHustleIdeas: ['온라인 강의', '전문 컨설팅', '저술', '1:1 코칭'],
    taxTips: ['교육비 공제', '연금저축', '소득공제 최대화']
  },
  '무': {
    yearScore: 85,
    grade: '대박',
    keywords: ['부동산 대운', '자산 증가', '투자 적기', '안정적 성장'],
    yearSummary: '2026년 무토 일간은 화생토! 최고의 재물운입니다. 병오년의 화 기운이 토를 생해주어 모든 재물 활동이 순조롭습니다. 특히 부동산에서 큰 행운이 있습니다.',
    incomeOutlook: '본업 수입이 크게 늘어나고, 부동산 투자에서 시세 차익을 볼 수 있습니다. 임대 수입도 안정적이며, 전반적으로 풍요로운 한 해입니다.',
    investmentAdvice: '부동산 매입 최적기입니다. 토지, 아파트, 상가 모두 좋습니다. 장기 보유 목적으로 구입하세요. 주식도 우량주 위주로 매수하세요.',
    warningMessage: '너무 욕심내면 복이 달아납니다. 적당히 벌고 나누세요. 한 곳에 모든 자산을 집중하지 말고 분산하세요.',
    luckyMonths: [1, 2, 4, 5, 9, 10, 11],
    cautionMonths: [7, 8],
    bestAssets: ['부동산', '토지', '아파트', '상가', '금'],
    avoidAssets: ['레버리지', '단기 투기'],
    sideHustleIdeas: ['부동산 임대', '건물 관리', '인테리어', '농업'],
    taxTips: ['부동산 취득세 계산', '양도세 절세', '종부세 대비']
  },
  '기': {
    yearScore: 82,
    grade: '대박',
    keywords: ['지혜로운 투자', '꾸준한 성장', '복리 효과', '안정 속 성장'],
    yearSummary: '2026년 기토 일간은 편인운으로 지혜와 통찰력이 재물을 모아줍니다. 급하게 벌려 하지 않아도 자연스럽게 재물이 모이는 해입니다.',
    incomeOutlook: '크게 벌기보다 꾸준히 모이는 형태입니다. 저축한 돈이 복리로 불어나고, 작은 투자들이 결실을 맺습니다. 서비스업에서 안정적 수입이 예상됩니다.',
    investmentAdvice: '적립식 투자가 최고입니다. 매월 일정 금액을 꾸준히 투자하세요. 소형 부동산, 배당주, 적금 등 안정적 자산이 좋습니다.',
    warningMessage: '너무 작게 목표를 잡지 마세요. 올해는 조금 더 도전해도 됩니다. 기회가 왔을 때 잡을 용기를 가지세요.',
    luckyMonths: [2, 3, 5, 6, 10, 11],
    cautionMonths: [7, 8],
    bestAssets: ['적립식 펀드', '배당주', '소형 부동산', '적금'],
    avoidAssets: ['고위험 상품', '단타'],
    sideHustleIdeas: ['소규모 창업', '프랜차이즈', '온라인 쇼핑몰', '케어 서비스'],
    taxTips: ['소득공제 최대화', '연금저축', 'ISA 활용']
  },
  '경': {
    yearScore: 55,
    grade: '주의',
    keywords: ['직장운 상승', '투자 신중', '안정 추구', '무리 금지'],
    yearSummary: '2026년 경금 일간은 편관운으로 직장에서는 승진 기회가 있으나, 투자와 사업에서는 신중해야 합니다. 안정을 추구하는 것이 현명합니다.',
    incomeOutlook: '직장 수입은 안정적이고 승진 가능성도 있습니다. 하지만 투자 수익은 기대 이하일 수 있습니다. 본업에 집중하세요.',
    investmentAdvice: '올해는 투자보다 저축입니다. 공격적 투자는 손실로 이어질 수 있습니다. 안전 자산 위주로 포트폴리오를 구성하세요.',
    warningMessage: '과한 승부욕은 금물입니다. 한 방을 노리면 모두 잃을 수 있습니다. 겸손하게 본업에 충실하세요.',
    luckyMonths: [4, 5, 11, 12],
    cautionMonths: [1, 2, 6, 7],
    bestAssets: ['예금', '적금', '국채', '금'],
    avoidAssets: ['주식 단타', '암호화폐', '고위험 투자'],
    sideHustleIdeas: ['전문 컨설팅', '강의', '멘토링'],
    taxTips: ['연말정산 꼼꼼히', '의료비 공제', '교육비 공제']
  },
  '신': {
    yearScore: 58,
    grade: '안정',
    keywords: ['품격 유지', '프리미엄 전략', '가치 투자', '브랜딩'],
    yearSummary: '2026년 신금 일간은 정관운으로 안정적이지만 화려하지 않은 재물운입니다. 품격과 가치로 승부하면 꾸준한 수입을 올릴 수 있습니다.',
    incomeOutlook: '전문성을 인정받아 프리미엄 가격을 받을 수 있습니다. 저가 경쟁은 피하고 차별화된 가치를 제공하세요. 안정적이지만 급격한 상승은 어렵습니다.',
    investmentAdvice: '가치 투자가 핵심입니다. 저평가된 우량주, 실물 자산에 투자하세요. 단기 수익보다 장기 가치를 보세요.',
    warningMessage: '완벽을 추구하다 기회를 놓치지 마세요. 때로는 빠른 결정도 필요합니다. 유동성을 확보해두세요.',
    luckyMonths: [3, 4, 9, 10],
    cautionMonths: [1, 2, 6, 7],
    bestAssets: ['가치주', '금', '예술품', '부동산'],
    avoidAssets: ['테마주', '단기 투기'],
    sideHustleIdeas: ['프리미엄 서비스', '디자인', '컨설팅', '예술'],
    taxTips: ['사업자 비용 처리', '감가상각', '필요경비']
  },
  '임': {
    yearScore: 78,
    grade: '상승',
    keywords: ['투자 기회', '다중 수입', '해외 관련', '유동성 확보'],
    yearSummary: '2026년 임수 일간은 편재운으로 투자와 사업에서 큰 기회가 옵니다. 다양한 곳에서 수입이 들어오며, 해외 관련 사업이 특히 유리합니다.',
    incomeOutlook: '여러 파이프라인에서 수입이 들어옵니다. 본업 외 투자 수익, 부업 수익 등 다중 수입 구조가 형성됩니다. 해외 거래에서 이익이 예상됩니다.',
    investmentAdvice: '분산 투자하되 과하게 분산하지 마세요. 3-5개 정도로 관리 가능한 수준을 유지하세요. 해외 주식, ETF가 유리합니다.',
    warningMessage: '너무 많이 분산하면 관리가 안 됩니다. 지출 통제에 신경 쓰세요. 들어오는 대로 나가면 남는 게 없습니다.',
    luckyMonths: [1, 3, 4, 8, 9, 11],
    cautionMonths: [6, 7],
    bestAssets: ['해외 주식', 'ETF', '외화', '분산 펀드'],
    avoidAssets: ['한 곳 집중', '유동성 없는 자산'],
    sideHustleIdeas: ['해외 무역', '온라인 사업', '투자', '컨설팅'],
    taxTips: ['해외주식 양도세', '환차익 관리', '분리과세 활용']
  },
  '계': {
    yearScore: 75,
    grade: '상승',
    keywords: ['꾸준한 성장', '지혜로운 저축', '안정 속 상승', '복리 효과'],
    yearSummary: '2026년 계수 일간은 정재운으로 꾸준하고 안정적인 재물 상승이 예상됩니다. 큰 대박보다 작지만 확실한 수익이 쌓이는 해입니다.',
    incomeOutlook: '본업 수입이 조금씩 늘어나고, 저축한 돈이 복리로 불어납니다. 급격한 상승은 없지만 안정적으로 자산이 증가합니다.',
    investmentAdvice: '적립식 투자가 최고입니다. 욕심내지 말고 매월 꾸준히 투자하세요. 안전 자산 위주로 포트폴리오를 구성하세요.',
    warningMessage: '너무 소극적이면 기회를 놓칩니다. 올해는 조금 더 적극적으로 도전해도 좋습니다. 자신감을 가지세요.',
    luckyMonths: [2, 3, 5, 10, 11, 12],
    cautionMonths: [6, 7],
    bestAssets: ['적금', '연금', '배당주', '채권'],
    avoidAssets: ['고위험 투자', '레버리지'],
    sideHustleIdeas: ['상담', '교육', '콘텐츠', '케어 서비스'],
    taxTips: ['연금저축 최대 납입', 'IRP', '소득공제']
  }
};

export default WEALTH_2026_BY_STEM;
