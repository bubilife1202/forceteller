// 음력/양력 변환 유틸리티
// lunar-javascript 라이브러리 사용
import { Solar, Lunar } from 'lunar-javascript';

export interface LunarDate {
  year: number;
  month: number;
  day: number;
  isLeapMonth: boolean;
}

export interface SolarDate {
  year: number;
  month: number;
  day: number;
}

export interface SolarTermInfo {
  name: string;
  date: Date;
  month: number; // 절기 기준 월
}

// 24절기 데이터 (2024-2030년 정확한 데이터)
// 절기는 매년 날짜가 1-2일 변동됨
export const SOLAR_TERMS_DETAILED = [
  { name: '소한', month: 12, approxDay: 6 },
  { name: '대한', month: 12, approxDay: 20 },
  { name: '입춘', month: 1, approxDay: 4 },   // 1월(인월) 시작
  { name: '우수', month: 1, approxDay: 19 },
  { name: '경칩', month: 2, approxDay: 6 },   // 2월(묘월) 시작
  { name: '춘분', month: 2, approxDay: 21 },
  { name: '청명', month: 3, approxDay: 5 },   // 3월(진월) 시작
  { name: '곡우', month: 3, approxDay: 20 },
  { name: '입하', month: 4, approxDay: 6 },   // 4월(사월) 시작
  { name: '소만', month: 4, approxDay: 21 },
  { name: '망종', month: 5, approxDay: 6 },   // 5월(오월) 시작
  { name: '하지', month: 5, approxDay: 21 },
  { name: '소서', month: 6, approxDay: 7 },   // 6월(미월) 시작
  { name: '대서', month: 6, approxDay: 23 },
  { name: '입추', month: 7, approxDay: 8 },   // 7월(신월) 시작
  { name: '처서', month: 7, approxDay: 23 },
  { name: '백로', month: 8, approxDay: 8 },   // 8월(유월) 시작
  { name: '추분', month: 8, approxDay: 23 },
  { name: '한로', month: 9, approxDay: 8 },   // 9월(술월) 시작
  { name: '상강', month: 9, approxDay: 23 },
  { name: '입동', month: 10, approxDay: 7 },  // 10월(해월) 시작
  { name: '소설', month: 10, approxDay: 22 },
  { name: '대설', month: 11, approxDay: 7 },  // 11월(자월) 시작
  { name: '동지', month: 11, approxDay: 22 },
] as const;

// 절입일 (각 월이 시작되는 절기)
export const MONTH_START_TERMS = [
  '입춘',  // 1월(인월)
  '경칩',  // 2월(묘월)
  '청명',  // 3월(진월)
  '입하',  // 4월(사월)
  '망종',  // 5월(오월)
  '소서',  // 6월(미월)
  '입추',  // 7월(신월)
  '백로',  // 8월(유월)
  '한로',  // 9월(술월)
  '입동',  // 10월(해월)
  '대설',  // 11월(자월)
  '소한',  // 12월(축월)
] as const;

/**
 * lunar-javascript를 사용한 정확한 양력→음력 변환
 */
export function solarToLunar(solar: SolarDate): LunarDate {
  try {
    const solarDate = Solar.fromYmd(solar.year, solar.month, solar.day);
    const lunar = solarDate.getLunar();

    return {
      year: lunar.getYear(),
      month: lunar.getMonth(),
      day: lunar.getDay(),
      isLeapMonth: lunar.isLeap(),
    };
  } catch {
    // 라이브러리 에러 시 근사치 반환
    return {
      year: solar.year,
      month: solar.month,
      day: solar.day,
      isLeapMonth: false,
    };
  }
}

/**
 * lunar-javascript를 사용한 정확한 음력→양력 변환
 */
export function lunarToSolar(lunar: LunarDate): SolarDate {
  try {
    const lunarDate = Lunar.fromYmd(lunar.year, lunar.month, lunar.day);
    const solar = lunarDate.getSolar();

    return {
      year: solar.getYear(),
      month: solar.getMonth(),
      day: solar.getDay(),
    };
  } catch {
    // 라이브러리 에러 시 근사치 반환
    return {
      year: lunar.year,
      month: lunar.month,
      day: lunar.day,
    };
  }
}

/**
 * 특정 날짜의 절기 정보 가져오기
 * lunar-javascript 사용
 */
export function getSolarTermForDate(year: number, month: number, day: number): string | null {
  try {
    const solar = Solar.fromYmd(year, month, day);
    const jieQi = solar.getJieQi();
    return jieQi || null;
  } catch {
    return null;
  }
}

/**
 * 특정 년도의 입춘 날짜 구하기
 * 입춘은 대개 2월 3~5일경
 */
export function getLichunDate(year: number): Date {
  try {
    // lunar-javascript의 JieQi 기능 활용
    const solar = Solar.fromYmd(year, 2, 4);
    const lunar = solar.getLunar();
    const jieQiTable = lunar.getJieQiTable();

    // 입춘 찾기
    for (const [name, jieQiSolar] of Object.entries(jieQiTable)) {
      if (name === '立春' || name === '입춘') {
        const s = jieQiSolar as { getYear: () => number; getMonth: () => number; getDay: () => number };
        return new Date(s.getYear(), s.getMonth() - 1, s.getDay());
      }
    }

    // 기본값: 2월 4일
    return new Date(year, 1, 4);
  } catch {
    return new Date(year, 1, 4);
  }
}

/**
 * 절기 기준 월 계산 (사주 월주 계산용)
 * 입춘(2월 4일경)부터 1월(인월) 시작
 */
export function getSajuMonth(year: number, month: number, day: number): { sajuYear: number; sajuMonth: number } {
  try {
    const solar = Solar.fromYmd(year, month, day);
    const lunar = solar.getLunar();

    // 절기 기준 월 (1~12)
    const jieQiMonth = lunar.getMonthInGanZhiExact ?
      getMonthFromGanZhi(lunar.getMonthInGanZhiExact()) :
      getApproximateSajuMonth(month, day);

    // 절기 기준 년 (입춘 전이면 전년도)
    let sajuYear = year;
    const lichun = getLichunDate(year);
    const currentDate = new Date(year, month - 1, day);

    if (currentDate < lichun) {
      sajuYear = year - 1;
    }

    return { sajuYear, sajuMonth: jieQiMonth };
  } catch {
    return getApproximateSajuMonthYear(year, month, day);
  }
}

/**
 * 간지에서 월 추출
 */
function getMonthFromGanZhi(ganZhi: string): number {
  const branches = ['寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '子', '丑'];
  const branchesKr = ['인', '묘', '진', '사', '오', '미', '신', '유', '술', '해', '자', '축'];

  for (let i = 0; i < branches.length; i++) {
    if (ganZhi.includes(branches[i]) || ganZhi.includes(branchesKr[i])) {
      return i + 1;
    }
  }
  return 1;
}

/**
 * 근사치 사주 월 계산 (절기 테이블 기반)
 */
function getApproximateSajuMonth(month: number, day: number): number {
  // 각 월의 절입일 (대략적인 값)
  const monthStartDays: { [key: number]: number } = {
    1: 6,   // 소한 (12월 시작)
    2: 4,   // 입춘 (1월 시작)
    3: 6,   // 경칩 (2월 시작)
    4: 5,   // 청명 (3월 시작)
    5: 6,   // 입하 (4월 시작)
    6: 6,   // 망종 (5월 시작)
    7: 7,   // 소서 (6월 시작)
    8: 8,   // 입추 (7월 시작)
    9: 8,   // 백로 (8월 시작)
    10: 8,  // 한로 (9월 시작)
    11: 7,  // 입동 (10월 시작)
    12: 7,  // 대설 (11월 시작)
  };

  const startDay = monthStartDays[month] || 6;

  // 양력 월 → 사주 월 변환
  const monthMapping: { [key: number]: { before: number; after: number } } = {
    1: { before: 12, after: 12 },  // 1월: 소한 전 12월, 소한 후 12월
    2: { before: 12, after: 1 },   // 2월: 입춘 전 12월, 입춘 후 1월
    3: { before: 1, after: 2 },    // 3월: 경칩 전 1월, 경칩 후 2월
    4: { before: 2, after: 3 },    // 4월
    5: { before: 3, after: 4 },    // 5월
    6: { before: 4, after: 5 },    // 6월
    7: { before: 5, after: 6 },    // 7월
    8: { before: 6, after: 7 },    // 8월
    9: { before: 7, after: 8 },    // 9월
    10: { before: 8, after: 9 },   // 10월
    11: { before: 9, after: 10 },  // 11월
    12: { before: 10, after: 11 }, // 12월
  };

  if (day < startDay) {
    return monthMapping[month].before;
  }
  return monthMapping[month].after;
}

/**
 * 근사치 사주 년/월 계산
 */
function getApproximateSajuMonthYear(year: number, month: number, day: number): { sajuYear: number; sajuMonth: number } {
  const sajuMonth = getApproximateSajuMonth(month, day);
  let sajuYear = year;

  // 입춘(2월 4일경) 전이면 전년도
  if (month < 2 || (month === 2 && day < 4)) {
    sajuYear = year - 1;
  }

  return { sajuYear, sajuMonth };
}

/**
 * 양력/음력 구분 포맷팅
 */
export function formatDate(date: SolarDate | LunarDate, isLunar: boolean): string {
  const type = isLunar ? '음력' : '양력';
  const leapMonth = isLunar && 'isLeapMonth' in date && date.isLeapMonth ? '(윤)' : '';
  return `${type} ${date.year}년 ${leapMonth}${date.month}월 ${date.day}일`;
}

/**
 * 간지 년도 계산 (60갑자)
 */
export function getGanZhiYear(year: number, month: number, day: number): { stem: string; branch: string } {
  const { sajuYear } = getSajuMonth(year, month, day);

  const stems = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
  const branches = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];

  // 1984년 = 갑자년
  const baseYear = 1984;
  const offset = sajuYear - baseYear;

  const stemIndex = ((offset % 10) + 10) % 10;
  const branchIndex = ((offset % 12) + 12) % 12;

  return {
    stem: stems[stemIndex],
    branch: branches[branchIndex],
  };
}

/**
 * 시간대별 지지 반환
 */
export function getHourBranch(hour: number): string {
  const branches = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];

  // 23:00-01:00 자시, 01:00-03:00 축시, ...
  if (hour === 23 || hour === 0) return branches[0];
  return branches[Math.floor((hour + 1) / 2)];
}

/**
 * 띠 계산
 */
export function getZodiac(year: number, month: number, day: number): string {
  const { sajuYear } = getSajuMonth(year, month, day);
  const animals = ['쥐', '소', '호랑이', '토끼', '용', '뱀', '말', '양', '원숭이', '닭', '개', '돼지'];
  const index = ((sajuYear - 4) % 12 + 12) % 12;
  return animals[index];
}
