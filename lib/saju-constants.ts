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
  비견: { ko: '비견', cn: '比肩', en: 'Peer' },
  겁재: { ko: '겁재', cn: '劫財', en: 'Rob Wealth' },
  식신: { ko: '식신', cn: '食神', en: 'Eating God' },
  상관: { ko: '상관', cn: '傷官', en: 'Hurting Officer' },
  편재: { ko: '편재', cn: '偏財', en: 'Indirect Wealth' },
  정재: { ko: '정재', cn: '正財', en: 'Direct Wealth' },
  편관: { ko: '편관', cn: '偏官', en: 'Indirect Officer' },
  정관: { ko: '정관', cn: '正官', en: 'Direct Officer' },
  편인: { ko: '편인', cn: '偏印', en: 'Indirect Resource' },
  정인: { ko: '정인', cn: '正印', en: 'Direct Resource' },
} as const;

// 12운성 (十二運星) - Twelve Life Cycles
export const TWELVE_CYCLES = [
  '장생', '목욕', '관대', '건록', '제왕', '쇠', '병', '사', '묘', '절', '태', '양'
] as const;

// 절기 데이터 (간단한 버전)
export const SOLAR_TERMS = [
  { name: '입춘', month: 2, day: 4 },
  { name: '경칩', month: 3, day: 6 },
  { name: '청명', month: 4, day: 5 },
  { name: '입하', month: 5, day: 6 },
  { name: '망종', month: 6, day: 6 },
  { name: '소서', month: 7, day: 7 },
  { name: '입추', month: 8, day: 8 },
  { name: '백로', month: 9, day: 8 },
  { name: '한로', month: 10, day: 8 },
  { name: '입동', month: 11, day: 7 },
  { name: '대설', month: 12, day: 7 },
  { name: '소한', month: 1, day: 6 },
] as const;
