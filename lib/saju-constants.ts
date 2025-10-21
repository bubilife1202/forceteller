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

// 십성 (十星) - Ten Gods
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
