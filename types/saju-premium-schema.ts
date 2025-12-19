// 프리미엄 사주 결과 스키마
// 사용자가 추가 질문할 필요 없을 정도로 상세한 구조

// 기본 점수 및 등급 타입
export type FortuneGrade = 'excellent' | 'good' | 'normal' | 'caution' | 'warning';
export type FortuneScore = number; // 0-100

// 운세 요약 인터페이스
export interface FortuneSummary {
  score: FortuneScore;
  grade: FortuneGrade;
  title: string;
  description: string;
  keywords: string[];
}

// 시기별 흐름
export interface TimePeriodFortune {
  period: string; // "2025년 상반기", "30대 초반" 등
  score: FortuneScore;
  theme: string;
  advice: string;
}

// 상세 분석 섹션 공통 구조
export interface DetailedAnalysis {
  summary: FortuneSummary;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  timePeriods: TimePeriodFortune[];
  actionItems: string[];
  warnings: string[];
}

// 총운 (Overall Fortune)
export interface OverallFortune {
  summary: FortuneSummary;
  dayStemAnalysis: {
    element: string;
    nature: string;
    corePersonality: string;
    hiddenTrait: string;
    lifeTheme: string;
  };
  strengthAnalysis: {
    isStrong: boolean;
    level: 'very_strong' | 'strong' | 'balanced' | 'weak' | 'very_weak';
    description: string;
    yongsin: string; // 용신
    advice: string;
  };
  yearlyTheme: {
    year: number;
    theme: string;
    luckyMonths: number[];
    cautionMonths: number[];
  };
  lifeMotto: string;
  destinyMessage: string;
}

// 재물운 (Wealth Fortune)
export interface WealthFortune extends DetailedAnalysis {
  wealthType: string; // "정재형", "편재형" 등
  moneyMindset: string;
  incomeStyle: string;
  spendingStyle: string;
  savingAdvice: string;
  investmentProfile: {
    riskTolerance: 'high' | 'medium' | 'low';
    idealAssets: string[];
    avoidAssets: string[];
    investmentTiming: string;
  };
  luckyIncome: string[];
  wealthPeak: {
    age: string;
    description: string;
  };
  monthlyWealth: {
    month: number;
    score: FortuneScore;
    advice: string;
  }[];
}

// 직업운 (Career Fortune)
export interface CareerFortune extends DetailedAnalysis {
  careerType: string; // "리더형", "전문가형" 등
  workStyle: string;
  leadershipStyle: string;
  teamworkStyle: string;
  idealIndustries: string[];
  idealJobs: string[];
  avoidJobs: string[];
  careerPath: {
    phase: string;
    age: string;
    focus: string;
    advice: string;
  }[];
  promotionTiming: string;
  businessAptitude: {
    score: FortuneScore;
    type: string;
    advice: string;
  };
}

// 연애운 (Love Fortune)
export interface LoveFortune extends DetailedAnalysis {
  loveStyle: string;
  attractionType: string;
  idealPartnerTraits: string[];
  avoidPartnerTraits: string[];
  relationshipStrengths: string[];
  relationshipWeaknesses: string[];
  marriageAdvice: {
    idealAge: string;
    partnerElement: string;
    cautionPoints: string[];
  };
  romanticPeaks: {
    period: string;
    description: string;
  }[];
  loveCompatibility: {
    bestMatches: string[];
    goodMatches: string[];
    challengingMatches: string[];
  };
}

// 건강운 (Health Fortune)
export interface HealthFortune extends DetailedAnalysis {
  constitution: string; // 체질
  vulnerableOrgans: string[];
  healthTips: string[];
  exerciseRecommendation: string;
  dietAdvice: string;
  stressManagement: string;
  seasonalHealth: {
    season: string;
    caution: string;
    advice: string;
  }[];
  preventiveCare: string[];
}

// 대운 분석 (Major Luck Cycles)
export interface DaeunAnalysis {
  currentDaeun: {
    startAge: number;
    endAge: number;
    stem: string;
    branch: string;
    tenGod: string;
    score: FortuneScore;
    theme: string;
    description: string;
  };
  allDaeun: {
    startAge: number;
    endAge: number;
    stem: string;
    branch: string;
    tenGod: string;
    score: FortuneScore;
    theme: string;
    isCurrent: boolean;
    isPast: boolean;
  }[];
  peakPeriods: {
    age: string;
    score: FortuneScore;
    reason: string;
  }[];
  cautionPeriods: {
    age: string;
    reason: string;
    advice: string;
  }[];
  lifeGraph: {
    age: number;
    score: FortuneScore;
  }[];
}

// 개운법 (Fortune Enhancement)
export interface FortuneEnhancement {
  luckyColors: {
    primary: string;
    secondary: string[];
    meaning: string;
  };
  luckyNumbers: {
    numbers: number[];
    meaning: string;
  };
  luckyDirections: {
    primary: string;
    secondary: string;
    meaning: string;
  };
  luckyItems: string[];
  luckyFoods: string[];
  luckyActivities: string[];
  luckyTimes: {
    hours: string[];
    days: string[];
    months: number[];
  };
  avoidItems: string[];
  avoidActivities: string[];
  dailyRoutine: string;
  yearlyRitual: string;
}

// 신살 분석 (Special Stars Analysis)
export interface ShinsalAnalysis {
  nobles: {
    name: string;
    hanja: string;
    meaning: string;
    influence: string;
    howToActivate: string;
  }[];
  cautions: {
    name: string;
    hanja: string;
    meaning: string;
    influence: string;
    remedy: string;
  }[];
  overall: {
    noblesCount: number;
    cautionsCount: number;
    balance: string;
    advice: string;
  };
}

// 합충 분석 (Harmony & Clash Analysis)
export interface HapchungAnalysis {
  harmonies: {
    type: string;
    elements: string;
    meaning: string;
    influence: string;
  }[];
  clashes: {
    type: string;
    elements: string;
    meaning: string;
    influence: string;
    remedy: string;
  }[];
  overall: {
    harmonyScore: FortuneScore;
    stabilityLevel: string;
    advice: string;
  };
}

// 십성 분석 (Ten Gods Analysis)
export interface TenGodsAnalysis {
  dominant: {
    name: string;
    count: number;
    influence: string;
  };
  distribution: {
    tenGod: string;
    count: number;
    positions: string[];
  }[];
  missing: string[];
  balance: {
    isBalanced: boolean;
    description: string;
    advice: string;
  };
  personality: string;
  lifeTheme: string;
}

// 오행 분석 (Five Elements Analysis)
export interface FiveElementsAnalysis {
  distribution: {
    element: string;
    count: number;
    percentage: number;
    positions: string[];
  }[];
  dominant: string;
  lacking: string[];
  balance: {
    isBalanced: boolean;
    description: string;
  };
  enhancement: {
    needElement: string;
    howToEnhance: string[];
  };
}

// 프리미엄 사주 결과 통합
export interface PremiumSajuResult {
  // 기본 정보
  userInfo: {
    name: string;
    gender: 'male' | 'female';
    birthDate: string;
    birthTime: string;
    lunarDate: string;
  };

  // 사주 원국
  pillars: {
    year: { stem: string; branch: string; };
    month: { stem: string; branch: string; };
    day: { stem: string; branch: string; };
    hour: { stem: string; branch: string; };
  };

  // 분석 결과
  overall: OverallFortune;
  wealth: WealthFortune;
  career: CareerFortune;
  love: LoveFortune;
  health: HealthFortune;
  daeun: DaeunAnalysis;
  enhancement: FortuneEnhancement;
  shinsal: ShinsalAnalysis;
  hapchung: HapchungAnalysis;
  tenGods: TenGodsAnalysis;
  fiveElements: FiveElementsAnalysis;

  // 메타 정보
  generatedAt: string;
  version: string;
}

export default PremiumSajuResult;
