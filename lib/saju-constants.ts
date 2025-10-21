// 천간 (天干) - Heavenly Stems
export const HEAVENLY_STEMS = [
  { ko: '갑', cn: '甲', element: '목', yinyang: '+' },
  { ko: '을', cn: '乙', element: '목', yinyang: '-' },
  { ko: '병', cn: '丙', element: '화', yinyang: '+' },
  { ko: '정', cn: '丁', element: '화', yinyang: '-' },
  { ko: '무', cn: '戊', element: '토', yinyang: '+' },
  { ko: '기', cn: '己', element: '토', yinyang: '-' },
  { ko: '경', cn: '庚', element: '금', yinyang: '+' },
  { ko: '신', cn: '辛', element: '금', yinyang: '-' },
  { ko: '임', cn: '壬', element: '수', yinyang: '+' },
  { ko: '계', cn: '癸', element: '수', yinyang: '-' },
] as const;

// 지지 (地支) - Earthly Branches
export const EARTHLY_BRANCHES = [
  { ko: '자', cn: '子', element: '수', animal: '쥐' },
  { ko: '축', cn: '丑', element: '토', animal: '소' },
  { ko: '인', cn: '寅', element: '목', animal: '호랑이' },
  { ko: '묘', cn: '卯', element: '목', animal: '토끼' },
  { ko: '진', cn: '辰', element: '토', animal: '용' },
  { ko: '사', cn: '巳', element: '화', animal: '뱀' },
  { ko: '오', cn: '午', element: '화', animal: '말' },
  { ko: '미', cn: '未', element: '토', animal: '양' },
  { ko: '신', cn: '申', element: '금', animal: '원숭이' },
  { ko: '유', cn: '酉', element: '금', animal: '닭' },
  { ko: '술', cn: '戌', element: '토', animal: '개' },
  { ko: '해', cn: '亥', element: '수', animal: '돼지' },
] as const;

// 오행 (五行) - Five Elements
export const ELEMENTS = {
  목: { ko: '목', cn: '木', en: 'wood', color: '#10b981' },
  화: { ko: '화', cn: '火', en: 'fire', color: '#ef4444' },
  토: { ko: '토', cn: '土', en: 'earth', color: '#f59e0b' },
  금: { ko: '금', cn: '金', en: 'metal', color: '#d4d4d8' },
  수: { ko: '수', cn: '水', en: 'water', color: '#3b82f6' },
} as const;

// 십성 (十星) - Ten Gods (상세 정보)
export const TEN_GODS_DETAIL = {
  비견: {
    ko: '비견', cn: '比肩', en: 'Peer',
    category: '비겁',
    desc: '나와 같은 오행',
    meaning: '형제·자매·동료·경쟁자',
    positive: '자립심, 독립심, 경쟁력, 추진력이 강함',
    negative: '고집이 세고 독단적, 타협 어려움',
    career: '독립 사업, 자유업, 경쟁 분야'
  },
  겁재: {
    ko: '겁재', cn: '劫財', en: 'Rob Wealth',
    category: '비겁',
    desc: '나와 같은 오행(음양 반대)',
    meaning: '경쟁자·동업자·형제',
    positive: '강한 추진력, 결단력, 행동력',
    negative: '재물 손실, 배우자 문제, 투기성',
    career: '도전적 사업, 경쟁 분야'
  },
  식신: {
    ko: '식신', cn: '食神', en: 'Eating God',
    category: '식상',
    desc: '내가 생하는 오행',
    meaning: '표현·재능·자녀·의식주',
    positive: '온화함, 인내심, 평화주의, 예술적 재능',
    negative: '우유부단, 게으름, 낙천적',
    career: '예술, 요식업, 서비스업, 교육'
  },
  상관: {
    ko: '상관', cn: '傷官', en: 'Hurting Officer',
    category: '식상',
    desc: '내가 생하는 오행(음양 반대)',
    meaning: '재능·표현·반항·비판',
    positive: '창의력, 예술성, 뛰어난 말솜씨',
    negative: '비판적, 반항적, 상관 문제',
    career: '예술가, 작가, 비평가, 연예인'
  },
  편재: {
    ko: '편재', cn: '偏財', en: 'Indirect Wealth',
    category: '재성',
    desc: '내가 극하는 오행',
    meaning: '유동재산·사업·아버지',
    positive: '사교성, 재치, 사업 수완',
    negative: '낭비, 투기, 여색 문제',
    career: '사업가, 영업, 금융, 유통'
  },
  정재: {
    ko: '정재', cn: '正財', en: 'Direct Wealth',
    category: '재성',
    desc: '내가 극하는 오행(음양 반대)',
    meaning: '고정재산·아내·성실',
    positive: '성실, 근면, 절약, 안정 추구',
    negative: '인색, 융통성 부족',
    career: '회계, 재무, 공무원, 안정된 직장'
  },
  편관: {
    ko: '편관', cn: '偏官', en: 'Indirect Officer',
    category: '관성',
    desc: '나를 극하는 오행',
    meaning: '권력·무력·압박·칠살',
    positive: '강한 추진력, 결단력, 리더십',
    negative: '강압적, 폭력적, 건강 문제',
    career: '군인, 경찰, 정치가, 운동선수'
  },
  정관: {
    ko: '정관', cn: '正官', en: 'Direct Officer',
    category: '관성',
    desc: '나를 극하는 오행(음양 반대)',
    meaning: '직장·명예·남편·법',
    positive: '책임감, 명예욕, 성실함, 법 준수',
    negative: '형식적, 보수적, 경직됨',
    career: '공무원, 법조인, 대기업, 관리직'
  },
  편인: {
    ko: '편인', cn: '偏印', en: 'Indirect Resource',
    category: '인성',
    desc: '나를 생하는 오행',
    meaning: '편모·학문·고독·효성',
    positive: '학구적, 독창적, 종교·철학 관심',
    negative: '고독, 외로움, 편식',
    career: '연구직, 종교인, 철학자, 학자'
  },
  정인: {
    ko: '정인', cn: '正印', en: 'Direct Resource',
    category: '인성',
    desc: '나를 생하는 오행(음양 반대)',
    meaning: '어머니·학문·명예·지혜',
    positive: '학구적, 인내심, 책임감, 명예',
    negative: '우유부단, 의존적, 현실 부적응',
    career: '교수, 교사, 연구원, 행정직'
  },
} as const;

// 구 십성 (하위 호환)
export const TEN_GODS = {
  비견: { ko: '비견', cn: '比肩', en: 'Peer', desc: '나와 같은 오행' },
  겁재: { ko: '겁재', cn: '劫財', en: 'Rob Wealth', desc: '나와 같은 오행(음양 반대)' },
  식신: { ko: '식신', cn: '食神', en: 'Eating God', desc: '내가 생하는 오행' },
  상관: { ko: '상관', cn: '傷官', en: 'Hurting Officer', desc: '내가 생하는 오행(음양 반대)' },
  편재: { ko: '편재', cn: '偏財', en: 'Indirect Wealth', desc: '내가 극하는 오행' },
  정재: { ko: '정재', cn: '正財', en: 'Direct Wealth', desc: '내가 극하는 오행(음양 반대)' },
  편관: { ko: '편관', cn: '偏官', en: 'Indirect Officer', desc: '나를 극하는 오행' },
  정관: { ko: '정관', cn: '正官', en: 'Direct Officer', desc: '나를 극하는 오행(음양 반대)' },
  편인: { ko: '편인', cn: '偏印', en: 'Indirect Resource', desc: '나를 생하는 오행' },
  정인: { ko: '정인', cn: '正印', en: 'Direct Resource', desc: '나를 생하는 오행(음양 반대)' },
} as const;

// 12운성 (十二運星) - Twelve Life Cycles (상세 정보)
export const TWELVE_CYCLES_DETAIL = {
  장생: { ko: '장생', cn: '長生', desc: '새로운 생명이 태어나는 시기, 시작과 발전' },
  목욕: { ko: '목욕', cn: '沐浴', desc: '몸을 씻고 정화하는 시기, 변화와 불안정' },
  관대: { ko: '관대', cn: '冠帶', desc: '성인이 되어 관을 쓰는 시기, 성장과 발전' },
  건록: { ko: '건록', cn: '建祿', desc: '관직에 나가는 시기, 안정과 번영' },
  제왕: { ko: '제왕', cn: '帝旺', desc: '왕이 되는 시기, 최고의 전성기' },
  쇠: { ko: '쇠', cn: '衰', desc: '기운이 쇠퇴하기 시작하는 시기' },
  병: { ko: '병', cn: '病', desc: '병들어 약해지는 시기' },
  사: { ko: '사', cn: '死', desc: '생명이 끝나는 시기' },
  묘: { ko: '묘', cn: '墓', desc: '무덤에 들어가는 시기' },
  절: { ko: '절', cn: '絶', desc: '완전히 끊어지는 시기' },
  태: { ko: '태', cn: '胎', desc: '새 생명을 잉태하는 시기' },
  양: { ko: '양', cn: '養', desc: '양육하고 기르는 시기' },
} as const;

// 12운성 계산 테이블 (일간 기준)
export const TWELVE_CYCLES_TABLE: { [key: string]: string[] } = {
  '갑': ['해', '자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술'],
  '을': ['오', '사', '진', '묘', '인', '축', '자', '해', '술', '유', '신', '미'],
  '병': ['인', '묘', '진', '사', '오', '미', '신', '유', '술', '해', '자', '축'],
  '정': ['유', '신', '미', '오', '사', '진', '묘', '인', '축', '자', '해', '술'],
  '무': ['인', '묘', '진', '사', '오', '미', '신', '유', '술', '해', '자', '축'],
  '기': ['유', '신', '미', '오', '사', '진', '묘', '인', '축', '자', '해', '술'],
  '경': ['사', '오', '미', '신', '유', '술', '해', '자', '축', '인', '묘', '진'],
  '신': ['자', '해', '술', '유', '신', '미', '오', '사', '진', '묘', '인', '축'],
  '임': ['신', '유', '술', '해', '자', '축', '인', '묘', '진', '사', '오', '미'],
  '계': ['묘', '인', '축', '자', '해', '술', '유', '신', '미', '오', '사', '진'],
};

// 신살 (神殺) - 길흉신
export const SHINSALS = {
  // 길신
  천을귀인: { ko: '천을귀인', cn: '天乙貴人', type: 'good', desc: '하늘이 내린 귀인, 어려울 때 도움' },
  천덕귀인: { ko: '천덕귀인', cn: '天德貴人', type: 'good', desc: '하늘의 덕, 재앙을 면함' },
  월덕귀인: { ko: '월덕귀인', cn: '月德貴人', type: 'good', desc: '달의 덕, 길함' },
  문창귀인: { ko: '문창귀인', cn: '文昌貴人', type: 'good', desc: '학문과 문재, 지혜' },
  학당: { ko: '학당', cn: '學堂', type: 'good', desc: '학문에 뛰어남' },

  // 흉신
  역마살: { ko: '역마살', cn: '驛馬殺', type: 'neutral', desc: '이동수가 많음, 변화와 활동' },
  도화살: { ko: '도화살', cn: '桃花殺', type: 'neutral', desc: '인기와 이성, 풍류' },
  양인살: { ko: '양인살', cn: '羊刃殺', type: 'bad', desc: '강하고 날카로움, 사고' },
  공망: { ko: '공망', cn: '空亡', type: 'bad', desc: '비어있음, 허무함' },
  겁살: { ko: '겁살', cn: '劫殺', type: 'bad', desc: '재물 손실, 도난' },
  재살: { ko: '재살', cn: '災殺', type: 'bad', desc: '재앙과 질병' },
  원진살: { ko: '원진살', cn: '怨嗔殺', type: 'bad', desc: '원한과 갈등' },
  고신살: { ko: '고신살', cn: '孤辰殺', type: 'bad', desc: '고독, 외로움' },
  과숙살: { ko: '과숙살', cn: '寡宿殺', type: 'bad', desc: '고독, 홀로 지냄' },
} as const;

// 합충형파해 (合沖刑破害)
export const HAPCHUNG = {
  // 천간합
  천간합: {
    갑기: { stems: ['갑', '기'], result: '토', name: '갑기합토' },
    을경: { stems: ['을', '경'], result: '금', name: '을경합금' },
    병신: { stems: ['병', '신'], result: '수', name: '병신합수' },
    정임: { stems: ['정', '임'], result: '목', name: '정임합목' },
    무계: { stems: ['무', '계'], result: '화', name: '무계합화' },
  },

  // 지지합
  지지합: {
    자축: { branches: ['자', '축'], result: '토', name: '자축합' },
    인해: { branches: ['인', '해'], result: '목', name: '인해합' },
    묘술: { branches: ['묘', '술'], result: '화', name: '묘술합' },
    진유: { branches: ['진', '유'], result: '금', name: '진유합' },
    사신: { branches: ['사', '신'], result: '수', name: '사신합' },
    오미: { branches: ['오', '미'], result: '화', name: '오미합' },
  },

  // 지지충 (대립)
  지지충: {
    자오: ['자', '오'],
    축미: ['축', '미'],
    인신: ['인', '신'],
    묘유: ['묘', '유'],
    진술: ['진', '술'],
    사해: ['사', '해'],
  },

  // 삼합 (세 지지가 합)
  삼합: {
    인오술: { branches: ['인', '오', '술'], result: '화', name: '인오술 화국' },
    사유축: { branches: ['사', '유', '축'], result: '금', name: '사유축 금국' },
    신자진: { branches: ['신', '자', '진'], result: '수', name: '신자진 수국' },
    해묘미: { branches: ['해', '묘', '미'], result: '목', name: '해묘미 목국' },
  },
} as const;

// 일간별 성격 분석
export const DAY_STEM_PERSONALITY = {
  갑: {
    element: '목', yinyang: '양',
    image: '큰 나무, 숲',
    personality: '정직하고 곧은 성격. 리더십이 강하고 진취적이며 독립심이 강합니다. 외유내강형으로 겉은 부드러우나 속은 강합니다.',
    strength: '추진력, 결단력, 정의감, 리더십',
    weakness: '고집, 융통성 부족, 권위적',
    suitable: '경영자, 리더, 공직자, 교육자'
  },
  을: {
    element: '목', yinyang: '음',
    image: '작은 풀, 덩굴',
    personality: '부드럽고 유연한 성격. 적응력이 뛰어나고 인내심이 강합니다. 예술적 감각이 있고 섬세합니다.',
    strength: '적응력, 친화력, 섬세함, 예술성',
    weakness: '우유부단, 의존성, 질투심',
    suitable: '예술가, 디자이너, 상담사, 서비스업'
  },
  병: {
    element: '화', yinyang: '양',
    image: '태양, 큰 불',
    personality: '밝고 활발한 성격. 열정적이고 사교적이며 낙천적입니다. 타인에게 긍정적 에너지를 줍니다.',
    strength: '열정, 사교성, 명랑함, 창의력',
    weakness: '경솔함, 지속성 부족, 허영',
    suitable: '연예인, 영업, 홍보, 교육, 방송'
  },
  정: {
    element: '화', yinyang: '음',
    image: '촛불, 작은 불',
    personality: '섬세하고 감성적인 성격. 예의가 바르고 조용하지만 내면의 열정이 있습니다. 완벽주의 경향이 있습니다.',
    strength: '섬세함, 예의, 집중력, 완벽주의',
    weakness: '예민함, 소심함, 집착',
    suitable: '예술가, 작가, 연구원, 전문직'
  },
  무: {
    element: '토', yinyang: '양',
    image: '산, 바위',
    personality: '신뢰감 있고 포용력이 큰 성격. 책임감이 강하고 성실합니다. 중재자 역할을 잘합니다.',
    strength: '포용력, 신뢰감, 책임감, 안정성',
    weakness: '고지식함, 완고함, 느림',
    suitable: '공무원, 관리자, 부동산, 건설'
  },
  기: {
    element: '토', yinyang: '음',
    image: '밭, 정원',
    personality: '세심하고 배려심 많은 성격. 실용적이고 현실적입니다. 사람을 잘 챙기고 키웁니다.',
    strength: '배려심, 실용성, 근면함, 육성능력',
    weakness: '소심함, 걱정 많음, 욕심',
    suitable: '교육자, 간호사, 농업, 요식업'
  },
  경: {
    element: '금', yinyang: '양',
    image: '쇠, 철',
    personality: '강직하고 의리가 있는 성격. 정의감이 강하고 원칙적입니다. 결단력이 뛰어납니다.',
    strength: '정의감, 의리, 결단력, 추진력',
    weakness: '융통성 부족, 강압적, 비타협적',
    suitable: '군인, 경찰, 법조인, 기술자'
  },
  신: {
    element: '금', yinyang: '음',
    image: '보석, 귀금속',
    personality: '세련되고 예리한 성격. 미적 감각이 뛰어나고 완벽을 추구합니다. 비판적 사고가 강합니다.',
    strength: '심미안, 예리함, 완벽추구, 분석력',
    weakness: '비판적, 냉소적, 예민함',
    suitable: '디자이너, 보석상, 비평가, 전문직'
  },
  임: {
    element: '수', yinyang: '양',
    image: '큰 바다, 강',
    personality: '지혜롭고 포용력 있는 성격. 통찰력이 뛰어나고 융통성이 있습니다. 변화에 유연합니다.',
    strength: '지혜, 포용력, 융통성, 통찰력',
    weakness: '우유부단, 변덕, 게으름',
    suitable: '학자, 컨설턴트, 무역, 해운'
  },
  계: {
    element: '수', yinyang: '음',
    image: '이슬, 빗방울',
    personality: '섬세하고 감수성이 풍부한 성격. 직관력이 뛰어나고 신비로운 면이 있습니다. 조용하지만 깊이가 있습니다.',
    strength: '직관력, 감수성, 섬세함, 신비감',
    weakness: '소심함, 의존성, 우울함',
    suitable: '예술가, 종교인, 상담사, 점술가'
  },
} as const;

// 오행 균형 분석
export const ELEMENT_BALANCE = {
  excess: {
    목: {
      personality: '성격이 급하고 신경질적일 수 있습니다. 창의적이나 완성도가 떨어질 수 있습니다.',
      health: '간, 담, 눈, 신경계 주의. 스트레스 관리 필요.',
      advice: '금(金) 기운으로 조절 필요. 침착함과 인내심 기르기.'
    },
    화: {
      personality: '성격이 급하고 조급할 수 있습니다. 열정적이나 지속력이 부족할 수 있습니다.',
      health: '심장, 혈압, 눈, 소화기 주의. 과열 주의.',
      advice: '수(水) 기운으로 조절 필요. 차분함과 여유 갖기.'
    },
    토: {
      personality: '고집이 세고 완고할 수 있습니다. 안정을 추구하나 변화를 두려워할 수 있습니다.',
      health: '위, 비장, 소화기, 비만 주의.',
      advice: '목(木) 기운으로 조절 필요. 유연성과 변화 수용하기.'
    },
    금: {
      personality: '냉정하고 비판적일 수 있습니다. 원칙적이나 융통성이 부족할 수 있습니다.',
      health: '폐, 호흡기, 대장, 피부 주의.',
      advice: '화(火) 기운으로 조절 필요. 따뜻함과 감성 표현하기.'
    },
    수: {
      personality: '우유부단하고 방황할 수 있습니다. 지혜롭지만 실행력이 부족할 수 있습니다.',
      health: '신장, 방광, 생식기, 허리 주의. 냉증 주의.',
      advice: '토(土) 기운으로 조절 필요. 실행력과 결단력 기르기.'
    }
  },
  deficiency: {
    목: {
      personality: '창의력과 추진력이 부족할 수 있습니다. 소극적이고 우유부단할 수 있습니다.',
      health: '간 기능 저하, 눈 건강 주의.',
      advice: '목(木) 기운 보충 필요. 새로운 시도와 도전 필요.'
    },
    화: {
      personality: '열정과 활력이 부족할 수 있습니다. 우울하고 소극적일 수 있습니다.',
      health: '심장 기능, 혈액순환 주의.',
      advice: '화(火) 기운 보충 필요. 밝고 긍정적인 마인드 필요.'
    },
    토: {
      personality: '신뢰감과 안정감이 부족할 수 있습니다. 불안하고 초조할 수 있습니다.',
      health: '소화기능 약함, 비장 주의.',
      advice: '토(土) 기운 보충 필요. 안정과 신뢰 구축 필요.'
    },
    금: {
      personality: '의지와 결단력이 부족할 수 있습니다. 원칙 없이 흔들릴 수 있습니다.',
      health: '호흡기 약함, 면역력 주의.',
      advice: '금(金) 기운 보충 필요. 원칙과 절제 필요.'
    },
    수: {
      personality: '지혜와 융통성이 부족할 수 있습니다. 경직되고 딱딱할 수 있습니다.',
      health: '신장 기능, 생식기 주의.',
      advice: '수(水) 기운 보충 필요. 유연함과 지혜 필요.'
    }
  }
} as const;

// 절기 데이터
export const SOLAR_TERMS = [
  { name: '입춘', month: 2, day: 4 },
  { name: '우수', month: 2, day: 19 },
  { name: '경칩', month: 3, day: 6 },
  { name: '춘분', month: 3, day: 21 },
  { name: '청명', month: 4, day: 5 },
  { name: '곡우', month: 4, day: 20 },
  { name: '입하', month: 5, day: 6 },
  { name: '소만', month: 5, day: 21 },
  { name: '망종', month: 6, day: 6 },
  { name: '하지', month: 6, day: 21 },
  { name: '소서', month: 7, day: 7 },
  { name: '대서', month: 7, day: 23 },
  { name: '입추', month: 8, day: 8 },
  { name: '처서', month: 8, day: 23 },
  { name: '백로', month: 9, day: 8 },
  { name: '추분', month: 9, day: 23 },
  { name: '한로', month: 10, day: 8 },
  { name: '상강', month: 10, day: 23 },
  { name: '입동', month: 11, day: 7 },
  { name: '소설', month: 11, day: 22 },
  { name: '대설', month: 12, day: 7 },
  { name: '동지', month: 12, day: 22 },
  { name: '소한', month: 1, day: 6 },
  { name: '대한', month: 1, day: 20 },
] as const;
