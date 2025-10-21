import { HEAVENLY_STEMS, EARTHLY_BRANCHES } from './saju-constants';
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
  };
}
