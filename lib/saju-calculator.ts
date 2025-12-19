import { HEAVENLY_STEMS, EARTHLY_BRANCHES, DAY_STEM_PERSONALITY, TEN_GODS_DETAIL } from './saju-constants';
import { getSajuMonth, getGanZhiYear } from './lunar-converter';
import {
  calculateDaeun,
  getTwelveCycle,
  calculateShinsals,
  analyzeHapchung,
  type DaeunPillar,
  type Shinsal,
  type HapchungResult
} from './saju-advanced';

export interface DateInfo {
  year: number;
  month: number;
  day: number;
  hour: number;
}

export interface Pillar {
  stem: typeof HEAVENLY_STEMS[number];
  branch: typeof EARTHLY_BRANCHES[number];
}

export interface SajuResult {
  year: Pillar;
  month: Pillar;
  day: Pillar;
  hour: Pillar;
  tenGods: {
    year: string;
    month: string;
    day: string;
    hour: string;
  };
  twelveCycles: {
    year: string;
    month: string;
    day: string;
    hour: string;
  };
  elements: {
    목: number;
    화: number;
    토: number;
    금: number;
    수: number;
  };
  strength: 'strong' | 'weak' | 'neutral';
  strengthScore: number; // 신강/신약 점수 (0-100)
  daeun: DaeunPillar[];
  shinsals: Shinsal[];
  hapchung: HapchungResult[];
  // 추가 상세 분석
  dayPersonality: typeof DAY_STEM_PERSONALITY[keyof typeof DAY_STEM_PERSONALITY];
  elementBalance: {
    excess: string[]; // 과다한 오행
    deficiency: string[]; // 부족한 오행
  };
  yongsin: string; // 용신 (필요한 오행)
  tenGodsCount: {
    비겁: number;
    식상: number;
    재성: number;
    관성: number;
    인성: number;
  };
}

// 월지 → 지지 인덱스 매핑 (1월=인, 2월=묘, ...)
const MONTH_BRANCH_MAP: { [key: number]: number } = {
  1: 2,   // 인월
  2: 3,   // 묘월
  3: 4,   // 진월
  4: 5,   // 사월
  5: 6,   // 오월
  6: 7,   // 미월
  7: 8,   // 신월
  8: 9,   // 유월
  9: 10,  // 술월
  10: 11, // 해월
  11: 0,  // 자월
  12: 1,  // 축월
};

// 년간에 따른 월간 시작 인덱스 (정확한 오호(五虎)둔법)
// 갑기년 → 병인월 시작 (병=2)
// 을경년 → 무인월 시작 (무=4)
// 병신년 → 경인월 시작 (경=6)
// 정임년 → 임인월 시작 (임=8)
// 무계년 → 갑인월 시작 (갑=0)
const YEAR_STEM_TO_MONTH_START: { [key: string]: number } = {
  '갑': 2, '기': 2,  // 병인월
  '을': 4, '경': 4,  // 무인월
  '병': 6, '신': 6,  // 경인월
  '정': 8, '임': 8,  // 임인월
  '무': 0, '계': 0,  // 갑인월
};

/**
 * 년주(年柱) 계산 - 절기(입춘) 기준
 */
export function getYearPillar(year: number, month: number, day: number): Pillar {
  // 절기 기준 년도 계산
  const { stem, branch } = getGanZhiYear(year, month, day);

  const stemObj = HEAVENLY_STEMS.find(s => s.ko === stem);
  const branchObj = EARTHLY_BRANCHES.find(b => b.ko === branch);

  if (!stemObj || !branchObj) {
    // 폴백: 1984년 기준 계산
    const baseYear = 1984;
    const offset = year - baseYear;
    const stemIndex = ((offset % 10) + 10) % 10;
    const branchIndex = ((offset % 12) + 12) % 12;
    return {
      stem: HEAVENLY_STEMS[stemIndex],
      branch: EARTHLY_BRANCHES[branchIndex],
    };
  }

  return { stem: stemObj, branch: branchObj };
}

/**
 * 월주(月柱) 계산 - 절기 기준 (오호둔법 적용)
 */
export function getMonthPillar(year: number, month: number, day: number): Pillar {
  // 절기 기준 월 계산
  const { sajuYear, sajuMonth } = getSajuMonth(year, month, day);

  // 년주 구하기 (월간 계산에 필요)
  const yearPillar = getYearPillar(year, month, day);
  const yearStem = yearPillar.stem.ko;

  // 오호둔법에 따른 월간 계산
  const monthStartStem = YEAR_STEM_TO_MONTH_START[yearStem] ?? 0;
  const monthStemIndex = (monthStartStem + sajuMonth - 1) % 10;

  // 월지 계산
  const monthBranchIndex = MONTH_BRANCH_MAP[sajuMonth] ?? 2;

  return {
    stem: HEAVENLY_STEMS[monthStemIndex],
    branch: EARTHLY_BRANCHES[monthBranchIndex],
  };
}

/**
 * 일주(日柱) 계산 - 율리우스일 기반 정확한 계산
 */
export function getDayPillar(year: number, month: number, day: number): Pillar {
  // 율리우스 날짜 계산
  const jd = getJulianDay(year, month, day);

  // 기준점: 2000년 1월 1일 = 경진일 (JD 2451545)
  // 경(庚) = 6, 진(辰) = 4
  const baseStem = 6;
  const baseBranch = 4;
  const baseJD = 2451545;

  const dayDiff = Math.floor(jd - baseJD);

  const stemIndex = ((baseStem + dayDiff) % 10 + 10) % 10;
  const branchIndex = ((baseBranch + dayDiff) % 12 + 12) % 12;

  return {
    stem: HEAVENLY_STEMS[stemIndex],
    branch: EARTHLY_BRANCHES[branchIndex],
  };
}

/**
 * 율리우스일 계산
 */
function getJulianDay(year: number, month: number, day: number): number {
  let y = year;
  let m = month;

  if (m <= 2) {
    y -= 1;
    m += 12;
  }

  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);

  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524.5;
}

/**
 * 시주(時柱) 계산 - 오서둔법(五鼠遁法) 적용
 */
export function getHourPillar(dayStem: string, hour: number): Pillar {
  // 시간대별 지지 (23-01:자, 01-03:축, ...)
  let hourBranchIndex: number;
  if (hour === 23 || hour === 0) {
    hourBranchIndex = 0; // 자시
  } else {
    hourBranchIndex = Math.floor((hour + 1) / 2);
  }

  // 오서둔법에 따른 시간 천간 계산
  // 갑기일 → 갑자시 시작 (0)
  // 을경일 → 병자시 시작 (2)
  // 병신일 → 무자시 시작 (4)
  // 정임일 → 경자시 시작 (6)
  // 무계일 → 임자시 시작 (8)
  const dayStemStartMap: { [key: string]: number } = {
    '갑': 0, '기': 0,
    '을': 2, '경': 2,
    '병': 4, '신': 4,
    '정': 6, '임': 6,
    '무': 8, '계': 8,
  };

  const hourStartStem = dayStemStartMap[dayStem] ?? 0;
  const hourStemIndex = (hourStartStem + hourBranchIndex) % 10;

  return {
    stem: HEAVENLY_STEMS[hourStemIndex],
    branch: EARTHLY_BRANCHES[hourBranchIndex],
  };
}

/**
 * 십성 계산 (정확한 오행 상생상극 관계)
 */
export function getTenGod(dayStem: string, targetStem: string): string {
  const dayElement = HEAVENLY_STEMS.find(s => s.ko === dayStem)?.element;
  const targetElement = HEAVENLY_STEMS.find(s => s.ko === targetStem)?.element;
  const dayYinYang = HEAVENLY_STEMS.find(s => s.ko === dayStem)?.yinyang;
  const targetYinYang = HEAVENLY_STEMS.find(s => s.ko === targetStem)?.yinyang;

  if (!dayElement || !targetElement) return '';

  const sameYinYang = dayYinYang === targetYinYang;
  const elementsOrder = ['목', '화', '토', '금', '수'];
  const dayIndex = elementsOrder.indexOf(dayElement);
  const targetIndex = elementsOrder.indexOf(targetElement);

  // 같은 오행 → 비겁
  if (dayElement === targetElement) {
    return sameYinYang ? '비견' : '겁재';
  }

  // 상생: 목→화→토→금→수→목
  // 내가 생하는 오행 → 식상
  if ((dayIndex + 1) % 5 === targetIndex) {
    return sameYinYang ? '식신' : '상관';
  }

  // 상극: 목→토, 화→금, 토→수, 금→목, 수→화
  // 내가 극하는 오행 → 재성
  if ((dayIndex + 2) % 5 === targetIndex) {
    return sameYinYang ? '편재' : '정재';
  }

  // 나를 극하는 오행 → 관성
  if ((dayIndex + 3) % 5 === targetIndex) {
    return sameYinYang ? '편관' : '정관';
  }

  // 나를 생하는 오행 → 인성
  if ((dayIndex + 4) % 5 === targetIndex) {
    return sameYinYang ? '편인' : '정인';
  }

  return '';
}

/**
 * 지지에서 십성 계산 (지장간 본기 기준)
 */
export function getTenGodFromBranch(dayStem: string, branch: string): string {
  // 지장간 본기 매핑
  const branchMainStem: { [key: string]: string } = {
    '자': '계', '축': '기', '인': '갑', '묘': '을',
    '진': '무', '사': '병', '오': '정', '미': '기',
    '신': '경', '유': '신', '술': '무', '해': '임',
  };

  const mainStem = branchMainStem[branch];
  if (!mainStem) return '';

  return getTenGod(dayStem, mainStem);
}

/**
 * 오행 분석 (가중치 적용)
 */
export function analyzeElements(pillars: {
  year: Pillar;
  month: Pillar;
  day: Pillar;
  hour: Pillar;
}): { 목: number; 화: number; 토: number; 금: number; 수: number } {
  const elements = { 목: 0, 화: 0, 토: 0, 금: 0, 수: 0 };

  // 천간의 오행 (각 10%)
  [pillars.year.stem, pillars.month.stem, pillars.day.stem, pillars.hour.stem].forEach(stem => {
    elements[stem.element as keyof typeof elements] += 10;
  });

  // 지지의 오행 (각 15% - 지지는 천간보다 힘이 강함)
  [pillars.year.branch, pillars.month.branch, pillars.day.branch, pillars.hour.branch].forEach(branch => {
    elements[branch.element as keyof typeof elements] += 15;
  });

  return elements;
}

/**
 * 신강/신약 판단 (정교화된 버전)
 * 월령, 투출, 지지 근기를 고려
 */
export function calculateStrength(
  dayStem: string,
  monthBranch: string,
  pillars: { year: Pillar; month: Pillar; day: Pillar; hour: Pillar },
  elements: { 목: number; 화: number; 토: number; 금: number; 수: number }
): { strength: 'strong' | 'weak' | 'neutral'; score: number } {
  const dayElement = HEAVENLY_STEMS.find(s => s.ko === dayStem)?.element;
  if (!dayElement) return { strength: 'neutral', score: 50 };

  let score = 50; // 기본 점수

  // 1. 월령 득령 여부 (가장 중요: ±20점)
  const monthElement = EARTHLY_BRANCHES.find(b => b.ko === monthBranch)?.element;
  const elementsOrder = ['목', '화', '토', '금', '수'];
  const dayIdx = elementsOrder.indexOf(dayElement);
  const supportElement = elementsOrder[(dayIdx + 4) % 5]; // 나를 생하는 오행

  if (monthElement === dayElement) {
    score += 20; // 월령이 나와 같은 오행
  } else if (monthElement === supportElement) {
    score += 15; // 월령이 인성 (나를 생함)
  } else {
    const controlElement = elementsOrder[(dayIdx + 3) % 5]; // 나를 극하는 오행
    const drainElement = elementsOrder[(dayIdx + 1) % 5]; // 내가 생하는 오행
    if (monthElement === controlElement) {
      score -= 15; // 월령이 관성 (나를 극함)
    } else if (monthElement === drainElement) {
      score -= 10; // 월령이 식상 (나의 기운 빠짐)
    }
  }

  // 2. 천간 투출 (±5점씩)
  const stems = [pillars.year.stem.ko, pillars.month.stem.ko, pillars.hour.stem.ko];
  stems.forEach(stem => {
    const stemElement = HEAVENLY_STEMS.find(s => s.ko === stem)?.element;
    if (stemElement === dayElement) {
      score += 5; // 비겁 투출
    } else if (stemElement === supportElement) {
      score += 5; // 인성 투출
    }
  });

  // 3. 지지 근기 (±3점씩)
  const branches = [pillars.year.branch.ko, pillars.month.branch.ko, pillars.day.branch.ko, pillars.hour.branch.ko];
  branches.forEach(branch => {
    const branchElement = EARTHLY_BRANCHES.find(b => b.ko === branch)?.element;
    if (branchElement === dayElement) {
      score += 3; // 비겁 근기
    } else if (branchElement === supportElement) {
      score += 3; // 인성 근기
    }
  });

  // 4. 오행 비율 보정
  const myElementPower = elements[dayElement as keyof typeof elements];
  const supportPower = elements[supportElement as keyof typeof elements];
  const totalSupportPower = myElementPower + supportPower;

  if (totalSupportPower >= 45) {
    score += 5;
  } else if (totalSupportPower <= 25) {
    score -= 5;
  }

  // 점수 범위 제한 (0-100)
  score = Math.max(0, Math.min(100, score));

  let strength: 'strong' | 'weak' | 'neutral';
  if (score >= 60) {
    strength = 'strong';
  } else if (score <= 40) {
    strength = 'weak';
  } else {
    strength = 'neutral';
  }

  return { strength, score };
}

/**
 * 전체 사주 계산 (Extended with 12운성, 신살, 합충, 대운)
 */
export function calculateSaju(dateInfo: DateInfo, gender: 'male' | 'female' = 'male'): SajuResult {
  const yearPillar = getYearPillar(dateInfo.year, dateInfo.month, dateInfo.day);
  const monthPillar = getMonthPillar(dateInfo.year, dateInfo.month, dateInfo.day);
  const dayPillar = getDayPillar(dateInfo.year, dateInfo.month, dateInfo.day);
  const hourPillar = getHourPillar(dayPillar.stem.ko, dateInfo.hour);

  const pillars = {
    year: yearPillar,
    month: monthPillar,
    day: dayPillar,
    hour: hourPillar,
  };

  const tenGods = {
    year: getTenGod(dayPillar.stem.ko, yearPillar.stem.ko),
    month: getTenGod(dayPillar.stem.ko, monthPillar.stem.ko),
    day: '비견',
    hour: getTenGod(dayPillar.stem.ko, hourPillar.stem.ko),
  };

  // 12운성 계산
  const twelveCycles = {
    year: getTwelveCycle(dayPillar.stem.ko, yearPillar.branch.ko),
    month: getTwelveCycle(dayPillar.stem.ko, monthPillar.branch.ko),
    day: getTwelveCycle(dayPillar.stem.ko, dayPillar.branch.ko),
    hour: getTwelveCycle(dayPillar.stem.ko, hourPillar.branch.ko),
  };

  const elements = analyzeElements(pillars);
  const { strength, score: strengthScore } = calculateStrength(
    dayPillar.stem.ko,
    monthPillar.branch.ko,
    pillars,
    elements
  );

  // 대운 계산
  const daeun = calculateDaeun(
    dateInfo.year,
    dateInfo.month,
    dateInfo.day,
    gender,
    yearPillar.stem.ko
  );

  // 신살 계산
  const shinsals = calculateShinsals(
    yearPillar.branch.ko,
    dayPillar.branch.ko,
    dayPillar.stem.ko
  );

  // 합충 분석
  const hapchung = analyzeHapchung(pillars);

  // 일간 성격 분석
  const dayPersonality = DAY_STEM_PERSONALITY[dayPillar.stem.ko as keyof typeof DAY_STEM_PERSONALITY];

  // 오행 균형 분석
  const elementBalance = analyzeElementBalance(elements);

  // 용신 계산 (일간의 오행 전달)
  const yongsin = calculateYongsin(strength, elements, dayPillar.stem.element);

  // 십성 개수 세기
  const tenGodsCount = countTenGods(tenGods);

  return {
    year: yearPillar,
    month: monthPillar,
    day: dayPillar,
    hour: hourPillar,
    tenGods,
    twelveCycles,
    elements,
    strength,
    strengthScore,
    daeun,
    shinsals,
    hapchung,
    dayPersonality,
    elementBalance,
    yongsin,
    tenGodsCount,
  };
}

/**
 * 오행 균형 분석 (과다/부족)
 */
function analyzeElementBalance(elements: { 목: number; 화: number; 토: number; 금: number; 수: number }) {
  const excess: string[] = [];
  const deficiency: string[] = [];

  Object.entries(elements).forEach(([element, value]) => {
    if (value >= 30) excess.push(element); // 30% 이상이면 과다
    if (value <= 5) deficiency.push(element); // 5% 이하면 부족
  });

  return { excess, deficiency };
}

/**
 * 용신 계산 (오행 기반)
 */
function calculateYongsin(
  strength: 'strong' | 'weak' | 'neutral',
  elements: { 목: number; 화: number; 토: number; 금: number; 수: number },
  dayElement: string
): string {
  // 상생/상극 관계
  const generates: { [key: string]: string } = {
    '목': '수', '화': '목', '토': '화', '금': '토', '수': '금'
  };
  const iGenerate: { [key: string]: string } = {
    '목': '화', '화': '토', '토': '금', '금': '수', '수': '목'
  };
  const iControl: { [key: string]: string } = {
    '목': '토', '화': '금', '토': '수', '금': '목', '수': '화'
  };

  if (strength === 'strong') {
    // 신강: 설기(식상) 또는 극기(재성)
    const shisang = iGenerate[dayElement];
    const jaesung = iControl[dayElement];

    // 더 부족한 것을 용신으로
    if (elements[shisang as keyof typeof elements] <= elements[jaesung as keyof typeof elements]) {
      return shisang;
    }
    return jaesung;
  } else if (strength === 'weak') {
    // 신약: 생기(인성) 또는 비조(비겁)
    const insung = generates[dayElement];
    const bigeop = dayElement;

    if (elements[insung as keyof typeof elements] <= elements[bigeop as keyof typeof elements]) {
      return insung;
    }
    return bigeop;
  } else {
    // 중화: 가장 부족한 오행
    const sorted = Object.entries(elements).sort((a, b) => a[1] - b[1]);
    return sorted[0][0];
  }
}

/**
 * 십성 개수 세기
 */
function countTenGods(tenGods: { year: string; month: string; day: string; hour: string }) {
  const count = {
    비겁: 0,
    식상: 0,
    재성: 0,
    관성: 0,
    인성: 0,
  };

  Object.values(tenGods).forEach(god => {
    const detail = TEN_GODS_DETAIL[god as keyof typeof TEN_GODS_DETAIL];
    if (detail) {
      const category = detail.category as keyof typeof count;
      if (count[category] !== undefined) {
        count[category]++;
      }
    }
  });

  return count;
}
