import { HEAVENLY_STEMS, EARTHLY_BRANCHES, DAY_STEM_PERSONALITY, TEN_GODS_DETAIL } from './saju-constants';
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

// 년주(年柱) 계산
export function getYearPillar(year: number): Pillar {
  // 1984년이 갑자년(0)으로 시작
  const baseYear = 1984;
  const offset = (year - baseYear) % 60;
  const stemIndex = offset % 10;
  const branchIndex = offset % 12;

  return {
    stem: HEAVENLY_STEMS[stemIndex < 0 ? stemIndex + 10 : stemIndex],
    branch: EARTHLY_BRANCHES[branchIndex < 0 ? branchIndex + 12 : branchIndex],
  };
}

// 월주(月柱) 계산
export function getMonthPillar(year: number, month: number): Pillar {
  // 월간 계산 공식
  const yearStemIndex = HEAVENLY_STEMS.findIndex(
    stem => stem.ko === getYearPillar(year).stem.ko
  );

  // 월간 계산: (년간 * 2 + 월) % 10
  const monthStemIndex = ((yearStemIndex * 2) + month) % 10;

  // 월지는 고정: 인월(1월), 묘월(2월), ...
  const monthBranchIndex = (month + 1) % 12;

  return {
    stem: HEAVENLY_STEMS[monthStemIndex],
    branch: EARTHLY_BRANCHES[monthBranchIndex],
  };
}

// 일주(日柱) 계산 - 간단한 버전
export function getDayPillar(year: number, month: number, day: number): Pillar {
  // 실제로는 율리우스일(Julian Day) 사용
  // 여기서는 간단한 근사치 사용
  const baseDate = new Date(2000, 0, 1); // 2000-01-01은 경진일
  const targetDate = new Date(year, month - 1, day);
  const dayDiff = Math.floor((targetDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));

  // 2000-01-01이 경진일 (庚辰 = stem 6, branch 4)
  const baseStem = 6; // 경
  const baseBranch = 4; // 진

  const stemIndex = (baseStem + dayDiff) % 10;
  const branchIndex = (baseBranch + dayDiff) % 12;

  return {
    stem: HEAVENLY_STEMS[stemIndex < 0 ? stemIndex + 10 : stemIndex],
    branch: EARTHLY_BRANCHES[branchIndex < 0 ? branchIndex + 12 : branchIndex],
  };
}

// 시주(時柱) 계산
export function getHourPillar(dayStem: string, hour: number): Pillar {
  const dayStemIndex = HEAVENLY_STEMS.findIndex(stem => stem.ko === dayStem);

  // 시간대별 지지
  const hourBranchIndex = Math.floor((hour + 1) / 2) % 12;

  // 시간 계산: (일간 * 2 + 시지) % 10
  const hourStemIndex = ((dayStemIndex * 2) + hourBranchIndex) % 10;

  return {
    stem: HEAVENLY_STEMS[hourStemIndex],
    branch: EARTHLY_BRANCHES[hourBranchIndex],
  };
}

// 십성 계산
export function getTenGod(dayStem: string, targetStem: string): string {
  const dayElement = HEAVENLY_STEMS.find(s => s.ko === dayStem)?.element;
  const targetElement = HEAVENLY_STEMS.find(s => s.ko === targetStem)?.element;
  const dayYinYang = HEAVENLY_STEMS.find(s => s.ko === dayStem)?.yinyang;
  const targetYinYang = HEAVENLY_STEMS.find(s => s.ko === targetStem)?.yinyang;

  if (!dayElement || !targetElement) return '';

  const sameYinYang = dayYinYang === targetYinYang;

  // 같은 오행
  if (dayElement === targetElement) {
    return sameYinYang ? '비견' : '겁재';
  }

  // 내가 생하는 오행 (식상)
  const elementsOrder = ['목', '화', '토', '금', '수'];
  const dayIndex = elementsOrder.indexOf(dayElement);
  const targetIndex = elementsOrder.indexOf(targetElement);

  if ((dayIndex + 1) % 5 === targetIndex) {
    return sameYinYang ? '식신' : '상관';
  }

  // 내가 극하는 오행 (재성)
  if ((dayIndex + 2) % 5 === targetIndex) {
    return sameYinYang ? '편재' : '정재';
  }

  // 나를 극하는 오행 (관성)
  if ((dayIndex + 3) % 5 === targetIndex) {
    return sameYinYang ? '편관' : '정관';
  }

  // 나를 생하는 오행 (인성)
  if ((dayIndex + 4) % 5 === targetIndex) {
    return sameYinYang ? '편인' : '정인';
  }

  return '';
}

// 오행 분석
export function analyzeElements(pillars: {
  year: Pillar;
  month: Pillar;
  day: Pillar;
  hour: Pillar;
}): { 목: number; 화: number; 토: number; 금: number; 수: number } {
  const elements = { 목: 0, 화: 0, 토: 0, 금: 0, 수: 0 };

  // 천간의 오행
  [pillars.year.stem, pillars.month.stem, pillars.day.stem, pillars.hour.stem].forEach(stem => {
    elements[stem.element as keyof typeof elements] += 12.5;
  });

  // 지지의 오행
  [pillars.year.branch, pillars.month.branch, pillars.day.branch, pillars.hour.branch].forEach(branch => {
    elements[branch.element as keyof typeof elements] += 12.5;
  });

  return elements;
}

// 신강/신약 판단 (간단 버전)
export function calculateStrength(
  dayStem: string,
  monthBranch: string,
  elements: { 목: number; 화: number; 토: number; 금: number; 수: number }
): 'strong' | 'weak' | 'neutral' {
  const dayElement = HEAVENLY_STEMS.find(s => s.ko === dayStem)?.element;
  if (!dayElement) return 'neutral';

  // 일간의 오행 세력
  const myElementPower = elements[dayElement as keyof typeof elements];

  // 나를 생하는 오행의 세력
  const elementsOrder = ['목', '화', '토', '금', '수'];
  const myIndex = elementsOrder.indexOf(dayElement);
  const supportElement = elementsOrder[(myIndex + 4) % 5];
  const supportPower = elements[supportElement as keyof typeof elements];

  const totalPower = myElementPower + supportPower;

  if (totalPower >= 50) return 'strong';
  if (totalPower <= 30) return 'weak';
  return 'neutral';
}

// 전체 사주 계산 (Extended with 12운성, 신살, 합충, 대운)
export function calculateSaju(dateInfo: DateInfo, gender: 'male' | 'female' = 'male'): SajuResult {
  const yearPillar = getYearPillar(dateInfo.year);
  const monthPillar = getMonthPillar(dateInfo.year, dateInfo.month);
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
  const strength = calculateStrength(dayPillar.stem.ko, monthPillar.branch.ko, elements);

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
    daeun,
    shinsals,
    hapchung,
    dayPersonality,
    elementBalance,
    yongsin,
    tenGodsCount,
  };
}

// 오행 균형 분석 (과다/부족)
// 평균 20%를 기준으로 30% 이상은 과다, 10% 이하는 부족으로 판단
function analyzeElementBalance(elements: { 목: number; 화: number; 토: number; 금: number; 수: number }) {
  const excess: string[] = [];
  const deficiency: string[] = [];

  Object.entries(elements).forEach(([element, value]) => {
    if (value > 30) excess.push(element); // 30% 이상이면 과다
    if (value < 10) deficiency.push(element); // 10% 이하면 부족
  });

  return { excess, deficiency };
}

// 용신 계산 (오행 기반)
function calculateYongsin(
  strength: 'strong' | 'weak' | 'neutral',
  elements: { 목: number; 화: number; 토: number; 금: number; 수: number },
  dayElement: string // 일간의 오행
): string {
  // 상생 관계: 나를 생하는 오행 (인성)
  const generates: { [key: string]: string } = {
    '목': '수', '화': '목', '토': '화', '금': '토', '수': '금'
  };
  // 상극 관계: 나를 극하는 오행 (관성)
  const controls: { [key: string]: string } = {
    '목': '금', '화': '수', '토': '목', '금': '화', '수': '토'
  };
  // 내가 생하는 오행 (식상)
  const iGenerate: { [key: string]: string } = {
    '목': '화', '화': '토', '토': '금', '금': '수', '수': '목'
  };
  // 내가 극하는 오행 (재성)
  const iControl: { [key: string]: string } = {
    '목': '토', '화': '금', '토': '수', '금': '목', '수': '화'
  };

  if (strength === 'strong') {
    // 신강: 나를 설기하는 오행(식상)이나 내가 극하는 오행(재성)이 용신
    // 가장 부족한 오행 중에서 식상/재성에 해당하는 것 선택
    const shisang = iGenerate[dayElement];
    const jaesung = iControl[dayElement];

    // 식상과 재성 중 더 부족한 것을 용신으로
    if (elements[shisang as keyof typeof elements] <= elements[jaesung as keyof typeof elements]) {
      return shisang;
    }
    return jaesung;
  } else if (strength === 'weak') {
    // 신약: 나를 생하는 오행(인성)이나 같은 오행(비겁)이 용신
    const insung = generates[dayElement];
    const bigeop = dayElement;

    // 인성과 비겁 중 더 부족한 것을 용신으로
    if (elements[insung as keyof typeof elements] <= elements[bigeop as keyof typeof elements]) {
      return insung;
    }
    return bigeop;
  } else {
    // 중화: 가장 부족한 오행을 용신으로
    const sorted = Object.entries(elements).sort((a, b) => a[1] - b[1]);
    return sorted[0][0];
  }
}

// 십성 개수 세기
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
