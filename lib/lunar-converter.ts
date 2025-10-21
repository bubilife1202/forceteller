// 음력/양력 변환 유틸리티
// lunar-javascript 라이브러리 사용

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

// 간단한 음력 변환 (lunar-javascript 대체)
// 실제 프로덕션에서는 정확한 라이브러리 사용 권장
export function solarToLunar(solar: SolarDate): LunarDate {
  // 간단한 근사치 계산 (실제로는 복잡한 천문 계산 필요)
  const solarDate = new Date(solar.year, solar.month - 1, solar.day);
  const baseDate = new Date(2000, 0, 1); // 2000-01-01 기준
  const dayDiff = Math.floor((solarDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));

  // 대략적인 음력 계산 (평균 29.53일 주기)
  const lunarMonths = dayDiff / 29.53;
  const lunarYear = 2000 + Math.floor(lunarMonths / 12);
  const lunarMonth = Math.floor(lunarMonths % 12) + 1;
  const lunarDay = Math.floor((lunarMonths % 1) * 29.53) + 1;

  return {
    year: lunarYear,
    month: lunarMonth,
    day: lunarDay,
    isLeapMonth: false,
  };
}

export function lunarToSolar(lunar: LunarDate): SolarDate {
  // 간단한 근사치 계산
  const baseDate = new Date(2000, 0, 1);
  const lunarMonths = (lunar.year - 2000) * 12 + lunar.month - 1;
  const days = lunarMonths * 29.53 + lunar.day;

  const solarDate = new Date(baseDate.getTime() + days * 24 * 60 * 60 * 1000);

  return {
    year: solarDate.getFullYear(),
    month: solarDate.getMonth() + 1,
    day: solarDate.getDate(),
  };
}

// 양력/음력 구분 포맷팅
export function formatDate(date: SolarDate | LunarDate, isLunar: boolean): string {
  const type = isLunar ? '음력' : '양력';
  return `${type} ${date.year}년 ${date.month}월 ${date.day}일`;
}
