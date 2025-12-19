// 사주 상세 콘텐츠 데이터 통합 export
// 각 분야별 일간 데이터를 내보냅니다

export { WEALTH_BY_DAY_STEM, type WealthContent } from './wealth-content';
export { CAREER_BY_DAY_STEM, type CareerContent } from './career-content';
export { LOVE_BY_DAY_STEM, type LoveContent } from './love-content';
export { HEALTH_BY_DAY_STEM, type HealthContent } from './health-content';

// 통합 프리미엄 프로필 조회 함수
import { WEALTH_BY_DAY_STEM } from './wealth-content';
import { CAREER_BY_DAY_STEM } from './career-content';
import { LOVE_BY_DAY_STEM } from './love-content';
import { HEALTH_BY_DAY_STEM } from './health-content';

export interface PremiumDayStemProfile {
  dayStem: string;
  wealth: typeof WEALTH_BY_DAY_STEM[string];
  career: typeof CAREER_BY_DAY_STEM[string];
  love: typeof LOVE_BY_DAY_STEM[string];
  health: typeof HEALTH_BY_DAY_STEM[string];
}

export function getPremiumProfile(dayStem: string): PremiumDayStemProfile | null {
  const wealth = WEALTH_BY_DAY_STEM[dayStem];
  const career = CAREER_BY_DAY_STEM[dayStem];
  const love = LOVE_BY_DAY_STEM[dayStem];
  const health = HEALTH_BY_DAY_STEM[dayStem];

  if (!wealth || !career || !love || !health) {
    return null;
  }

  return {
    dayStem,
    wealth,
    career,
    love,
    health
  };
}

// 일간 목록
export const DAY_STEMS = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'] as const;
export type DayStem = typeof DAY_STEMS[number];
