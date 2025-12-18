'use client';

import { motion } from 'framer-motion';
import { TrendingUp, ArrowLeft, RefreshCw, Calendar, Target, Heart, Briefcase, Coins, Activity, Crown, Zap } from 'lucide-react';
import { calculateSaju } from '@/lib/saju-calculator';
import { DaeunFormData } from './DaeunForm';

// 천간 목록
const STEMS = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];

// 십성 계산 (일간 기준)
const TEN_GODS = ['비견', '겁재', '식신', '상관', '편재', '정재', '편관', '정관', '편인', '정인'];

const calculateTenGod = (dayStem: string, targetStem: string): string => {
  const dayIndex = STEMS.indexOf(dayStem);
  const targetIndex = STEMS.indexOf(targetStem);
  if (dayIndex === -1 || targetIndex === -1) return '비견';

  const diff = (targetIndex - dayIndex + 10) % 10;
  return TEN_GODS[diff];
};

interface DaeunResultProps {
  formData: DaeunFormData;
  onReset: () => void;
  onBack: () => void;
}

// 십성 해석
const TEN_GOD_MEANING: Record<string, {
  name: string;
  keyword: string;
  fortune: 'excellent' | 'good' | 'normal' | 'caution';
  description: string;
  career: string;
  wealth: string;
  love: string;
  health: string;
}> = {
  '비견': {
    name: '비견(比肩)',
    keyword: '협력과 경쟁',
    fortune: 'normal',
    description: '자신과 같은 기운으로, 형제나 동료를 의미합니다. 협력하면 큰 힘이 되지만, 경쟁 관계가 될 수도 있습니다.',
    career: '동업이나 협력 사업에 유리합니다. 다만 주도권 다툼에 주의하세요.',
    wealth: '나눠야 하는 재물운입니다. 공동 투자는 신중하게 하세요.',
    love: '친구 같은 관계가 발전할 수 있습니다. 삼각관계 주의.',
    health: '과로에 주의. 함께하는 운동이 좋습니다.',
  },
  '겁재': {
    name: '겁재(劫財)',
    keyword: '손실과 도전',
    fortune: 'caution',
    description: '강한 경쟁의 기운입니다. 도전적이지만 손실 위험도 있어 신중함이 필요합니다.',
    career: '경쟁이 치열해집니다. 내실을 다지는 것이 중요합니다.',
    wealth: '재물 손실에 주의. 투자와 보증은 피하세요.',
    love: '연인에 대한 경쟁자가 나타날 수 있습니다.',
    health: '스트레스 관리가 중요합니다. 사고 주의.',
  },
  '식신': {
    name: '식신(食神)',
    keyword: '창조와 풍요',
    fortune: 'excellent',
    description: '풍요와 즐거움의 기운입니다. 창의력이 빛나고 먹거리와 관련된 행운이 있습니다.',
    career: '창의적 업무, 요식업, 예술 분야에서 두각을 나타냅니다.',
    wealth: '안정적인 수입과 부수입이 생깁니다. 취미가 돈이 됩니다.',
    love: '매력이 넘치고 좋은 만남이 있습니다. 맛집 데이트 추천.',
    health: '건강하지만 과식과 체중 증가에 주의하세요.',
  },
  '상관': {
    name: '상관(傷官)',
    keyword: '표현과 반항',
    fortune: 'normal',
    description: '강한 표현 욕구와 반골 기질의 기운입니다. 창의적이지만 충돌이 있을 수 있습니다.',
    career: '자유로운 직업, 예술, 프리랜서에 유리. 조직 생활은 마찰 주의.',
    wealth: '아이디어로 수익을 올릴 수 있으나 충동 지출 주의.',
    love: '솔직함이 장점이자 단점. 말조심이 필요합니다.',
    health: '스트레스로 인한 질병 주의. 감정 관리가 중요합니다.',
  },
  '편재': {
    name: '편재(偏財)',
    keyword: '횡재와 투자',
    fortune: 'excellent',
    description: '뜻밖의 재물과 기회의 기운입니다. 사업이나 투자에서 큰 수익을 기대할 수 있습니다.',
    career: '영업, 사업, 투자 분야에서 성공 가능성이 높습니다.',
    wealth: '횡재수가 있습니다! 투자, 복권, 부수입 기회를 잡으세요.',
    love: '새로운 인연이 찾아옵니다. 적극적으로 행동하세요.',
    health: '활력이 넘치지만 과로 주의. 건강검진 추천.',
  },
  '정재': {
    name: '정재(正財)',
    keyword: '안정과 성실',
    fortune: 'good',
    description: '정당한 노력의 대가를 받는 기운입니다. 꾸준히 노력하면 안정적인 부를 쌓습니다.',
    career: '직장에서 인정받고 안정적인 승진이 있습니다.',
    wealth: '월급, 보너스, 계약금 등 정당한 수입이 늘어납니다.',
    love: '안정적인 관계로 발전합니다. 결혼, 약속에 좋은 시기.',
    health: '규칙적인 생활로 건강을 유지하세요.',
  },
  '편관': {
    name: '편관(偏官)',
    keyword: '시련과 권력',
    fortune: 'caution',
    description: '시련과 도전의 기운입니다. 힘들지만 이를 극복하면 큰 성장을 이룹니다.',
    career: '권위자와의 마찰, 직장 내 어려움이 있을 수 있습니다.',
    wealth: '예상치 못한 지출(세금, 벌금 등)에 대비하세요.',
    love: '갈등이 생길 수 있습니다. 인내와 이해가 필요합니다.',
    health: '스트레스로 인한 건강 문제 주의. 휴식이 필요합니다.',
  },
  '정관': {
    name: '정관(正官)',
    keyword: '명예와 질서',
    fortune: 'good',
    description: '명예와 사회적 인정의 기운입니다. 공직, 승진, 자격증에 유리합니다.',
    career: '승진, 공식적인 인정, 자격증 취득에 좋습니다.',
    wealth: '안정적인 수입. 큰 변화보다 유지가 좋습니다.',
    love: '책임감 있는 관계로 발전합니다. 결혼 준비에 좋습니다.',
    health: '규칙적인 생활습관이 건강의 열쇠입니다.',
  },
  '편인': {
    name: '편인(偏印)',
    keyword: '학문과 사색',
    fortune: 'normal',
    description: '배움과 깊은 사색의 기운입니다. 공부나 연구에 좋지만 현실과 거리가 생길 수 있습니다.',
    career: '연구, 학문, 기술 분야에서 깊이를 더할 수 있습니다.',
    wealth: '자기계발 투자가 미래 재물로 돌아옵니다.',
    love: '정신적 교감이 중요합니다. 깊은 대화를 나누세요.',
    health: '불면, 과로, 정신 건강에 신경 쓰세요.',
  },
  '정인': {
    name: '정인(正印)',
    keyword: '귀인과 학문',
    fortune: 'excellent',
    description: '귀인의 도움과 학문적 성취의 기운입니다. 어른의 도움으로 좋은 일이 생깁니다.',
    career: '멘토나 선배의 도움으로 성장합니다. 학업 성취.',
    wealth: '부모님이나 윗사람의 도움으로 재물이 들어옵니다.',
    love: '따뜻하고 안정적인 관계가 발전합니다.',
    health: '심신이 안정됩니다. 어머니의 음식이 보약입니다.',
  },
};

// 십성별 상세 라이프 가이드
const TEN_GOD_LIFE_GUIDE: Record<string, {
  lifeTheme: string;
  bestYearsInPeriod: string;
  doList: string[];
  dontList: string[];
  investmentAdvice: string;
  relationshipFocus: string;
  selfDevelopment: string[];
  warningSignals: string[];
  luckyActivities: string[];
  monthlyTip: string;
}> = {
  '비견': {
    lifeTheme: '협력과 자립의 시기 - 동료와 함께 성장하면서도 자신만의 영역을 확보해야 하는 때입니다.',
    bestYearsInPeriod: '대운 시작 후 3-4년차가 가장 유리합니다. 파트너십이 안정되는 시기.',
    doList: ['동업자나 파트너와 명확한 역할 분담', '형제/친구와의 관계 개선', '팀 프로젝트 적극 참여', '자기 전문성 강화', '네트워킹 활동 확대'],
    dontList: ['불필요한 경쟁 유발', '금전 문제로 친구 관계 손상', '보증이나 공동 투자', '독단적 의사결정', '비교를 통한 자기 비하'],
    investmentAdvice: '혼자보다 전문가와 함께 투자하세요. 공동 투자는 계약서 필수. 분쟁 방지가 핵심입니다.',
    relationshipFocus: '친구에서 연인으로 발전할 수 있는 시기. 단, 삼각관계에 주의하고 경쟁자 출현에 대비하세요.',
    selfDevelopment: ['리더십 훈련', '협상 스킬', '팀워크 능력', '갈등 관리'],
    warningSignals: ['친구와의 갈등 증가', '재물 분쟁', '형제 간 다툼', '과도한 경쟁심'],
    luckyActivities: ['팀 스포츠', '동호회 활동', '스터디 그룹', '공동 프로젝트'],
    monthlyTip: '매월 첫째 주에 파트너/동료와 대화 시간을 가지세요.'
  },
  '겁재': {
    lifeTheme: '시련과 도전의 시기 - 손실 위험이 있지만 이를 통해 더 강해질 수 있는 때입니다.',
    bestYearsInPeriod: '대운 후반부(7-9년차)에 시련 극복 후 반등 기회가 옵니다.',
    doList: ['현금 비중 높이기', '보험 점검 및 보강', '법적 계약 철저히', '체력 관리', '감정 컨트롤 연습'],
    dontList: ['고위험 투자', '보증', '충동적 이직', '도박성 행위', '무리한 사업 확장'],
    investmentAdvice: '원금 보존이 최우선. 공격적 투자 절대 금지. 안전 자산 위주로 방어적 운용.',
    relationshipFocus: '연인에 대한 경쟁자 출현 주의. 기존 관계 유지에 집중하고 새로운 인연은 신중하게.',
    selfDevelopment: ['위기 관리 능력', '인내심', '자기 통제력', '재무 관리'],
    warningSignals: ['갑작스러운 금전 요청', '사기 피해 조짐', '건강 이상 신호', '인간관계 갈등'],
    luckyActivities: ['명상', '심호흡', '걷기', '일기 쓰기'],
    monthlyTip: '매월 재무 상태를 점검하고 비상금을 확보하세요.'
  },
  '식신': {
    lifeTheme: '풍요와 창조의 시기 - 재능이 빛나고 물질적 풍요도 따라오는 축복받은 때입니다.',
    bestYearsInPeriod: '대운 전체가 좋지만 특히 3-7년차가 황금기입니다.',
    doList: ['창의적 프로젝트 시작', '요리/맛집 사업 고려', '취미를 수익화', '건강한 식습관', '예술 활동 참여'],
    dontList: ['과식과 과음', '게으름에 빠지기', '기회 놓치기', '안주하기', '건강 방심'],
    investmentAdvice: '식품, F&B, 엔터테인먼트 관련 투자가 유리합니다. 창의적 아이디어로 수익 창출 가능.',
    relationshipFocus: '매력이 넘치는 시기. 자연스럽게 좋은 인연이 찾아옵니다. 데이트 활동 적극 추천.',
    selfDevelopment: ['창의력 개발', '요리 스킬', '예술 감각', '자기 표현력'],
    warningSignals: ['체중 급증', '과식 습관', '나태함', '기회 방관'],
    luckyActivities: ['요리 클래스', '미식 여행', '창작 활동', 'SNS 콘텐츠 제작'],
    monthlyTip: '새로운 맛집을 탐방하거나 요리를 배워보세요. 행운이 따릅니다.'
  },
  '상관': {
    lifeTheme: '표현과 혁신의 시기 - 기존 틀을 깨고 새로운 것을 창조할 수 있는 때입니다.',
    bestYearsInPeriod: '대운 초반(1-4년차)에 창의력이 폭발하고, 후반에는 결과물이 나옵니다.',
    doList: ['예술/창작 활동', '프리랜서 도전', '솔직한 의견 개진', '독창적 프로젝트', '자기 브랜딩'],
    dontList: ['조직 내 충돌 유발', '상사 비판', '말실수', '과격한 표현', '권위에 반항'],
    investmentAdvice: '안전한 투자보다 창의적 사업 투자가 맞습니다. 단, 감정적 투자 결정은 금물.',
    relationshipFocus: '솔직함이 매력이지만 말실수로 상처 줄 수 있어요. 표현 방식을 부드럽게 가다듬으세요.',
    selfDevelopment: ['커뮤니케이션 스킬', '감정 조절', '창의적 글쓰기', '예술 표현'],
    warningSignals: ['직장 내 갈등', '말로 인한 문제', '관계 파탄', '충동적 결정'],
    luckyActivities: ['글쓰기', '유튜브/블로그', '예술 활동', '토론/발표'],
    monthlyTip: '생각을 글로 정리하고, 표현하기 전에 한 번 더 다듬으세요.'
  },
  '편재': {
    lifeTheme: '기회와 횡재의 시기 - 뜻밖의 재물과 새로운 인연이 찾아오는 행운의 때입니다.',
    bestYearsInPeriod: '대운 전체가 황금기. 특히 2-6년차에 큰 기회가 옵니다.',
    doList: ['적극적 투자 활동', '영업/사업 확장', '새로운 인연 만들기', '복권/이벤트 참여', '부업 시작'],
    dontList: ['과도한 투기', '도박', '낭비', '바람기', '불법적 재테크'],
    investmentAdvice: '주식, 부동산, 사업 투자 모두 유리한 시기. 과감하게 도전하되 전 재산 몰빵은 금물.',
    relationshipFocus: '새로운 인연이 많이 찾아옵니다. 다만 진지한 관계와 가벼운 관계를 구분하세요.',
    selfDevelopment: ['영업력', '협상력', '재테크 지식', '인맥 관리'],
    warningSignals: ['과소비', '바람 피울 유혹', '사기 피해', '도박 중독'],
    luckyActivities: ['투자 공부', '네트워킹', '영업 활동', '부업/사이드 프로젝트'],
    monthlyTip: '행운의 기운을 놓치지 마세요. 적극적으로 기회를 잡으러 나가세요.'
  },
  '정재': {
    lifeTheme: '안정과 축적의 시기 - 꾸준한 노력이 결실을 맺고 부가 쌓이는 때입니다.',
    bestYearsInPeriod: '대운 중반(4-7년차)에 안정적 성장, 후반에 결실을 봅니다.',
    doList: ['꾸준한 저축', '부동산 투자 검토', '본업에 충실', '결혼/가정 계획', '장기 재무 설계'],
    dontList: ['일확천금 추구', '투기성 투자', '불안정한 선택', '과소비', '빚으로 투자'],
    investmentAdvice: '안정적인 배당주, 적금, 부동산 위주로. 급하게 불리려 하지 말고 꾸준히 모으세요.',
    relationshipFocus: '결혼, 약속 등 안정적인 관계로 발전하기 좋은 시기. 진지한 사귐을 추구하세요.',
    selfDevelopment: ['재무 관리', '부동산 지식', '안정적 생활 습관', '가정 경영'],
    warningSignals: ['무리한 대출', '급한 투자', '안정 파괴 행위', '과소비'],
    luckyActivities: ['재테크 스터디', '부동산 탐방', '가계부 작성', '정기 저축'],
    monthlyTip: '매월 정해진 금액을 무조건 저축하세요. 작은 돈이 큰 부가 됩니다.'
  },
  '편관': {
    lifeTheme: '시련과 성장의 시기 - 어려움을 통해 단련되고 더 강해지는 때입니다.',
    bestYearsInPeriod: '대운 후반(7-10년차)에 시련 극복 후 도약 기회가 옵니다.',
    doList: ['체력 단련', '스트레스 관리', '법적 문제 예방', '건강 검진', '권위자와의 관계 관리'],
    dontList: ['권위에 대한 반항', '법적 분쟁 유발', '무리한 도전', '건강 방치', '폭력/충동'],
    investmentAdvice: '보수적 투자가 안전합니다. 이 시기는 불리기보다 지키는 것이 중요.',
    relationshipFocus: '갈등이 생길 수 있는 시기. 인내와 이해로 관계를 유지하세요. 이별 위험 주의.',
    selfDevelopment: ['인내심', '스트레스 관리', '법률 상식', '분쟁 해결 능력'],
    warningSignals: ['건강 이상', '법적 문제', '권위자와 충돌', '극심한 스트레스'],
    luckyActivities: ['운동', '명상', '건강검진', '법률 상담'],
    monthlyTip: '스트레스 해소를 위한 운동을 꾸준히 하세요. 건강이 최우선입니다.'
  },
  '정관': {
    lifeTheme: '명예와 인정의 시기 - 사회적 인정과 안정적 성공을 이루는 때입니다.',
    bestYearsInPeriod: '대운 중반(4-7년차)에 승진/인정의 기회가 집중됩니다.',
    doList: ['승진 준비', '자격증 취득', '사회적 활동', '결혼 준비', '규칙적 생활'],
    dontList: ['규칙 위반', '불성실한 태도', '명예 훼손 행위', '법 위반', '무책임한 행동'],
    investmentAdvice: '안정적이고 합법적인 투자만. 고위험은 피하고 명예를 지킬 수 있는 선택을 하세요.',
    relationshipFocus: '결혼, 약속, 책임감 있는 관계에 유리합니다. 사회적으로도 인정받는 관계를 추구하세요.',
    selfDevelopment: ['리더십', '사회성', '자격증/스펙', '규율과 질서'],
    warningSignals: ['명예 실추', '불성실함', '규칙 위반', '책임 회피'],
    luckyActivities: ['자격증 공부', '봉사 활동', '사회 단체 활동', '공식 행사 참여'],
    monthlyTip: '사회적 평판을 쌓는 활동에 참여하세요. 명예가 재물을 부릅니다.'
  },
  '편인': {
    lifeTheme: '학문과 내면 성장의 시기 - 깊은 공부와 사색으로 지혜를 쌓는 때입니다.',
    bestYearsInPeriod: '대운 초반(1-4년차)에 학습과 연구에 집중하면 후반에 결실.',
    doList: ['깊은 공부/연구', '자격증 취득', '기술 습득', '내면 성찰', '멘토 찾기'],
    dontList: ['현실 회피', '과도한 공상', '인간관계 단절', '건강 무시', '실행력 부족'],
    investmentAdvice: '자기 계발 투자가 최고. 금융 투자는 전문가에게 맡기고 본업에 집중하세요.',
    relationshipFocus: '정신적 교감이 중요한 시기. 깊이 있는 대화를 나눌 수 있는 사람을 찾으세요.',
    selfDevelopment: ['전문 지식', '철학/영성', '분석력', '독서 습관'],
    warningSignals: ['현실 감각 상실', '고립', '불면/우울', '실행력 저하'],
    luckyActivities: ['독서', '명상', '온라인 강좌', '연구 활동'],
    monthlyTip: '매월 한 권의 책을 읽고 배운 것을 기록하세요.'
  },
  '정인': {
    lifeTheme: '귀인과 축복의 시기 - 윗사람의 도움으로 순탄하게 성장하는 때입니다.',
    bestYearsInPeriod: '대운 전체가 좋지만 특히 중반(4-7년차)에 귀인의 도움이 집중됩니다.',
    doList: ['멘토/어른 공경', '학업 집중', '자격증 취득', '가족 관계 개선', '감사 표현'],
    dontList: ['어른에 대한 불손', '기회 거절', '감사 부족', '교만', '도움 거부'],
    investmentAdvice: '윗사람의 조언을 따르세요. 부모님이나 멘토가 추천하는 투자가 유리합니다.',
    relationshipFocus: '따뜻하고 안정적인 관계가 발전합니다. 가족의 소개로 좋은 인연이 올 수 있어요.',
    selfDevelopment: ['학문적 성취', '자격증', '인성 수양', '감사하는 마음'],
    warningSignals: ['어른과의 갈등', '불손한 태도', '기회 거절', '교만'],
    luckyActivities: ['어른 방문', '가족 모임', '학업', '멘토링 참여'],
    monthlyTip: '부모님이나 멘토에게 연락하고 감사를 표현하세요. 복이 들어옵니다.'
  }
};

// 대운 점수 계산
const calculateDaeunScore = (tenGod: string, age: number, currentAge: number) => {
  const godInfo = TEN_GOD_MEANING[tenGod];
  let baseScore = 60;

  if (godInfo?.fortune === 'excellent') baseScore = 85;
  else if (godInfo?.fortune === 'good') baseScore = 75;
  else if (godInfo?.fortune === 'normal') baseScore = 65;
  else if (godInfo?.fortune === 'caution') baseScore = 50;

  // 현재 대운이면 활성화
  if (age <= currentAge && currentAge < age + 10) {
    baseScore += 5;
  }

  // 약간의 변동성 추가
  const variation = ((age + baseScore) % 10) - 5;
  return Math.min(95, Math.max(35, baseScore + variation));
};

// 전성기 찾기
const findPeakPeriods = (daeuns: { age: number; tenGod: string }[], currentAge: number) => {
  const peaks = daeuns
    .map(d => ({ ...d, score: calculateDaeunScore(d.tenGod, d.age, currentAge) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  return peaks;
};

export default function DaeunResult({ formData, onReset, onBack }: DaeunResultProps) {
  // 사주 계산
  const result = calculateSaju({
    year: formData.year,
    month: formData.month,
    day: formData.day,
    hour: formData.timeUnknown ? 12 : formData.hour,
  }, formData.gender);

  const currentYear = new Date().getFullYear();
  const currentAge = currentYear - formData.year + 1; // 한국 나이

  // 일간 (Day Master)
  const dayStem = result.day.stem.ko;

  // 대운 데이터 가공
  const daeunData = result.daeun.slice(0, 8).map((d) => {
    const tenGod = calculateTenGod(dayStem, d.stem.ko);
    return {
      age: d.age,
      stem: d.stem,
      branch: d.branch,
      tenGod,
      score: calculateDaeunScore(tenGod, d.age, currentAge),
      isCurrent: d.age <= currentAge && currentAge < d.age + 10,
    };
  });

  // 현재 대운 찾기
  const currentDaeun = daeunData.find(d => d.isCurrent) || daeunData[0];
  const currentTenGodInfo = TEN_GOD_MEANING[currentDaeun.tenGod] || TEN_GOD_MEANING['비견'];
  const currentLifeGuide = TEN_GOD_LIFE_GUIDE[currentDaeun.tenGod] || TEN_GOD_LIFE_GUIDE['비견'];

  // 전성기 시기
  const peakPeriods = findPeakPeriods(
    daeunData.map(d => ({ age: d.age, tenGod: d.tenGod })),
    currentAge
  );

  // 점수에 따른 색상
  const getScoreColor = (score: number) => {
    if (score >= 80) return { text: 'text-emerald-400', bg: 'bg-emerald-500', bar: 'bg-emerald-400' };
    if (score >= 70) return { text: 'text-blue-400', bg: 'bg-blue-500', bar: 'bg-blue-400' };
    if (score >= 60) return { text: 'text-yellow-400', bg: 'bg-yellow-500', bar: 'bg-yellow-400' };
    return { text: 'text-orange-400', bg: 'bg-orange-500', bar: 'bg-orange-400' };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="min-h-screen py-8 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-lg mx-auto">
        {/* 뒤로가기 */}
        <motion.button
          variants={itemVariants}
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>메뉴로</span>
        </motion.button>

        {/* 헤더 */}
        <motion.div variants={itemVariants} className="text-center mb-6">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-600 flex items-center justify-center shadow-lg mb-4">
            <TrendingUp className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            {formData.name}님의 인생 그래프
          </h1>
          <p className="text-cyan-400">{result.day.stem.ko}일간 • {result.day.stem.element} 오행</p>
          <p className="text-slate-500 text-sm mt-1">현재 {currentAge}세 (만 {currentAge - 1}세)</p>
        </motion.div>

        {/* 인생 그래프 */}
        <motion.div variants={itemVariants} className="glass rounded-3xl p-5 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            인생 전성기 그래프
          </h2>

          <div className="space-y-4">
            {daeunData.map((d, idx) => {
              const color = getScoreColor(d.score);
              return (
                <div key={idx} className={`relative ${d.isCurrent ? 'scale-[1.02]' : ''}`}>
                  {d.isCurrent && (
                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-cyan-400 rounded-full" />
                  )}
                  <div className={`flex items-center gap-3 p-3 rounded-xl ${d.isCurrent ? 'bg-cyan-500/20 border border-cyan-500/30' : 'bg-slate-800/50'}`}>
                    <div className="text-center min-w-[60px]">
                      <div className="text-slate-400 text-xs">{d.age}~{d.age + 9}세</div>
                      <div className="text-white font-bold">
                        {d.stem.ko}{d.branch.ko}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-slate-300 text-sm">{d.tenGod}</span>
                        <span className={`font-bold ${color.text}`}>{d.score}점</span>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${color.bar}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${d.score}%` }}
                          transition={{ duration: 0.8, delay: idx * 0.1 }}
                        />
                      </div>
                    </div>
                    {d.isCurrent && (
                      <span className="px-2 py-1 bg-cyan-500 text-white text-xs rounded-full">현재</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* 전성기 시기 */}
        <motion.div variants={itemVariants} className="glass rounded-3xl p-5 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Crown className="w-5 h-5 text-yellow-400" />
            나의 전성기 TOP 3
          </h2>

          <div className="space-y-3">
            {peakPeriods.map((peak, idx) => {
              const color = getScoreColor(peak.score);
              const medals = ['🥇', '🥈', '🥉'];
              return (
                <div key={idx} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl">
                  <span className="text-2xl">{medals[idx]}</span>
                  <div className="flex-1">
                    <div className="text-white font-medium">
                      {peak.age}~{peak.age + 9}세
                    </div>
                    <div className="text-slate-400 text-sm">{peak.tenGod} 대운</div>
                  </div>
                  <div className={`font-bold ${color.text}`}>{peak.score}점</div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
            <p className="text-yellow-300 text-sm text-center">
              {peakPeriods[0].age <= currentAge && currentAge < peakPeriods[0].age + 10
                ? '🎉 지금이 바로 당신의 전성기입니다!'
                : peakPeriods[0].age > currentAge
                ? `✨ ${peakPeriods[0].age}세부터 전성기가 시작됩니다!`
                : `💪 ${peakPeriods[0].age}~${peakPeriods[0].age + 9}세가 최고의 시기였습니다.`}
            </p>
          </div>
        </motion.div>

        {/* 현재 대운 상세 */}
        <motion.div variants={itemVariants} className="glass rounded-3xl p-5 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-400" />
            현재 대운: {currentTenGodInfo.name}
          </h2>

          <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-purple-500/30 text-purple-300 text-xs rounded-full">
                #{currentTenGodInfo.keyword}
              </span>
              <span className={`px-2 py-1 text-xs rounded-full ${
                currentTenGodInfo.fortune === 'excellent' ? 'bg-emerald-500/30 text-emerald-300' :
                currentTenGodInfo.fortune === 'good' ? 'bg-blue-500/30 text-blue-300' :
                currentTenGodInfo.fortune === 'normal' ? 'bg-yellow-500/30 text-yellow-300' :
                'bg-orange-500/30 text-orange-300'
              }`}>
                {currentTenGodInfo.fortune === 'excellent' ? '대길' :
                 currentTenGodInfo.fortune === 'good' ? '길' :
                 currentTenGodInfo.fortune === 'normal' ? '보통' : '주의'}
              </span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              {currentTenGodInfo.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-800/50 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400 text-sm font-medium">직업운</span>
              </div>
              <p className="text-slate-300 text-xs">{currentTenGodInfo.career}</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-2">
                <Coins className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 text-sm font-medium">재물운</span>
              </div>
              <p className="text-slate-300 text-xs">{currentTenGodInfo.wealth}</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-pink-400" />
                <span className="text-pink-400 text-sm font-medium">애정운</span>
              </div>
              <p className="text-slate-300 text-xs">{currentTenGodInfo.love}</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm font-medium">건강운</span>
              </div>
              <p className="text-slate-300 text-xs">{currentTenGodInfo.health}</p>
            </div>
          </div>
        </motion.div>

        {/* 대운별 상세 해석 */}
        <motion.div variants={itemVariants} className="glass rounded-3xl p-5 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-400" />
            10년 주기별 상세 해석
          </h2>

          <div className="space-y-4">
            {daeunData.slice(0, 6).map((d, idx) => {
              const godInfo = TEN_GOD_MEANING[d.tenGod] || TEN_GOD_MEANING['비견'];
              const isPast = d.age + 10 <= currentAge;
              const isCurrent = d.isCurrent;
              const isFuture = d.age > currentAge;

              return (
                <div key={idx} className={`rounded-xl p-4 ${
                  isCurrent ? 'bg-cyan-500/20 border border-cyan-500/30' :
                  isPast ? 'bg-slate-800/30' : 'bg-slate-800/50'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold">
                        {d.stem.ko}{d.branch.ko}
                      </span>
                      <span className="text-slate-400 text-sm">
                        ({d.age}~{d.age + 9}세)
                      </span>
                      {isCurrent && (
                        <span className="px-2 py-0.5 bg-cyan-500 text-white text-xs rounded-full">현재</span>
                      )}
                      {isPast && (
                        <span className="px-2 py-0.5 bg-slate-600 text-slate-300 text-xs rounded-full">과거</span>
                      )}
                      {isFuture && (
                        <span className="px-2 py-0.5 bg-indigo-500/30 text-indigo-300 text-xs rounded-full">미래</span>
                      )}
                    </div>
                    <span className={`font-bold ${getScoreColor(d.score).text}`}>{d.score}점</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded-full">
                      {godInfo.name}
                    </span>
                    <span className="text-slate-400 text-xs">#{godInfo.keyword}</span>
                  </div>
                  <p className="text-slate-400 text-sm">{godInfo.description}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* 대운 활용 조언 */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-3xl p-6 mb-6"
        >
          <h2 className="text-lg font-bold text-cyan-300 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" />
            대운 활용 조언
          </h2>
          <div className="space-y-3 text-white">
            <p>
              <strong className="text-cyan-400">현재 대운 ({currentDaeun.age}~{currentDaeun.age + 9}세):</strong><br />
              {currentTenGodInfo.fortune === 'excellent' || currentTenGodInfo.fortune === 'good'
                ? '지금은 적극적으로 도전하기 좋은 시기입니다. 기회를 놓치지 마세요!'
                : '내실을 다지고 준비하는 시기입니다. 무리하지 말고 차분히 대비하세요.'}
            </p>
            <p>
              <strong className="text-cyan-400">전성기 대비:</strong><br />
              {peakPeriods[0].age > currentAge
                ? `${peakPeriods[0].age}세부터 시작되는 전성기를 위해 지금부터 역량을 쌓아두세요.`
                : '과거의 경험을 바탕으로 현재를 현명하게 살아가세요.'}
            </p>
            <p>
              <strong className="text-cyan-400">주의할 점:</strong><br />
              대운이 좋다고 방심하면 안 되고, 나쁘다고 포기하면 안 됩니다.
              대운은 큰 흐름일 뿐, 매일의 노력이 운명을 바꿉니다.
            </p>
          </div>
        </motion.div>

        {/* 현재 대운 라이프 테마 */}
        <motion.div variants={itemVariants} className="glass rounded-3xl p-5 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-400" />
            현재 대운 라이프 테마
          </h2>

          <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-xl p-4 mb-4">
            <p className="text-amber-100 leading-relaxed">
              {currentLifeGuide.lifeTheme}
            </p>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-4">
            <h3 className="text-cyan-400 font-medium mb-2 flex items-center gap-2">
              <span className="text-lg">⭐</span>
              황금기 시기
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {currentLifeGuide.bestYearsInPeriod}
            </p>
          </div>
        </motion.div>

        {/* 해야 할 것 & 하지 말아야 할 것 */}
        <motion.div variants={itemVariants} className="glass rounded-3xl p-5 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-green-400" />
            대운 기간 행동 가이드
          </h2>

          <div className="grid gap-4">
            {/* 해야 할 것 */}
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
              <h3 className="text-emerald-400 font-medium mb-3 flex items-center gap-2">
                <span className="text-lg">✅</span>
                해야 할 것
              </h3>
              <ul className="space-y-2">
                {currentLifeGuide.doList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
                    <span className="text-emerald-400 mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* 하지 말아야 할 것 */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
              <h3 className="text-red-400 font-medium mb-3 flex items-center gap-2">
                <span className="text-lg">❌</span>
                하지 말아야 할 것
              </h3>
              <ul className="space-y-2">
                {currentLifeGuide.dontList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
                    <span className="text-red-400 mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* 투자 & 관계 조언 */}
        <motion.div variants={itemVariants} className="glass rounded-3xl p-5 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Coins className="w-5 h-5 text-yellow-400" />
            투자 & 관계 조언
          </h2>

          <div className="space-y-4">
            {/* 투자 조언 */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
              <h3 className="text-yellow-400 font-medium mb-2 flex items-center gap-2">
                <span className="text-lg">💰</span>
                이 시기 투자 조언
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {currentLifeGuide.investmentAdvice}
              </p>
            </div>

            {/* 관계 조언 */}
            <div className="bg-pink-500/10 border border-pink-500/30 rounded-xl p-4">
              <h3 className="text-pink-400 font-medium mb-2 flex items-center gap-2">
                <Heart className="w-4 h-4" />
                연애 & 인간관계 조언
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {currentLifeGuide.relationshipFocus}
              </p>
            </div>
          </div>
        </motion.div>

        {/* 자기 계발 분야 */}
        <motion.div variants={itemVariants} className="glass rounded-3xl p-5 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-violet-400" />
            추천 자기 계발 분야
          </h2>

          <div className="flex flex-wrap gap-2">
            {currentLifeGuide.selfDevelopment.map((item, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-violet-500/20 border border-violet-500/30 text-violet-300 rounded-full text-sm"
              >
                {item}
              </span>
            ))}
          </div>

          <p className="mt-4 text-slate-400 text-sm">
            이 시기에 위 분야를 공부하거나 훈련하면 큰 성장을 이룰 수 있습니다.
          </p>
        </motion.div>

        {/* 경고 신호 */}
        <motion.div variants={itemVariants} className="glass rounded-3xl p-5 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-orange-400" />
            주의해야 할 경고 신호
          </h2>

          <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
            <p className="text-orange-300 text-sm mb-3">
              이런 신호가 보이면 대운의 흐름을 거스르고 있는 것입니다. 즉시 점검하세요!
            </p>
            <div className="grid grid-cols-2 gap-2">
              {currentLifeGuide.warningSignals.map((signal, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 bg-orange-500/10 rounded-lg"
                >
                  <span className="text-orange-400">⚠️</span>
                  <span className="text-slate-300 text-sm">{signal}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 행운의 활동 */}
        <motion.div variants={itemVariants} className="glass rounded-3xl p-5 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-400" />
            행운을 부르는 활동
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {currentLifeGuide.luckyActivities.map((activity, idx) => (
              <div
                key={idx}
                className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center"
              >
                <span className="text-2xl mb-1 block">
                  {idx === 0 ? '🍀' : idx === 1 ? '✨' : idx === 2 ? '🌟' : '💫'}
                </span>
                <span className="text-slate-200 text-sm">{activity}</span>
              </div>
            ))}
          </div>

          <p className="mt-4 text-emerald-400 text-sm text-center">
            이 활동들을 꾸준히 하면 대운의 기운을 극대화할 수 있습니다!
          </p>
        </motion.div>

        {/* 월간 실천 팁 */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-3xl p-6 mb-6"
        >
          <h2 className="text-lg font-bold text-indigo-300 mb-3 flex items-center gap-2">
            <span className="text-xl">📅</span>
            월간 실천 팁
          </h2>
          <p className="text-white leading-relaxed">
            {currentLifeGuide.monthlyTip}
          </p>
          <div className="mt-4 text-indigo-300 text-sm">
            매월 꾸준히 실천하면 대운의 흐름을 최대한 활용할 수 있습니다.
          </div>
        </motion.div>

        {/* 다음 대운 미리보기 */}
        {daeunData.find(d => d.age > currentAge) && (
          <motion.div variants={itemVariants} className="glass rounded-3xl p-5 mb-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              다음 대운 미리보기
            </h2>

            {(() => {
              const nextDaeun = daeunData.find(d => d.age > currentAge);
              if (!nextDaeun) return null;

              const nextLifeGuide = TEN_GOD_LIFE_GUIDE[nextDaeun.tenGod] || TEN_GOD_LIFE_GUIDE['비견'];
              const nextTenGodInfo = TEN_GOD_MEANING[nextDaeun.tenGod] || TEN_GOD_MEANING['비견'];
              const yearsUntil = nextDaeun.age - currentAge;

              return (
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-white font-bold">
                        {nextDaeun.stem.ko}{nextDaeun.branch.ko} 대운
                      </span>
                      <span className="text-slate-400 text-sm ml-2">
                        ({nextDaeun.age}세~)
                      </span>
                    </div>
                    <span className="px-2 py-1 bg-blue-500/30 text-blue-300 text-xs rounded-full">
                      {yearsUntil}년 후
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded-full">
                      {nextTenGodInfo.name}
                    </span>
                    <span className="text-slate-400 text-xs">#{nextTenGodInfo.keyword}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      nextTenGodInfo.fortune === 'excellent' ? 'bg-emerald-500/30 text-emerald-300' :
                      nextTenGodInfo.fortune === 'good' ? 'bg-blue-500/30 text-blue-300' :
                      nextTenGodInfo.fortune === 'normal' ? 'bg-yellow-500/30 text-yellow-300' :
                      'bg-orange-500/30 text-orange-300'
                    }`}>
                      {nextTenGodInfo.fortune === 'excellent' ? '대길' :
                       nextTenGodInfo.fortune === 'good' ? '길' :
                       nextTenGodInfo.fortune === 'normal' ? '보통' : '주의'}
                    </span>
                  </div>

                  <p className="text-slate-300 text-sm mb-3">
                    {nextLifeGuide.lifeTheme}
                  </p>

                  <div className="pt-3 border-t border-blue-500/20">
                    <h4 className="text-blue-400 text-sm font-medium mb-2">지금부터 준비할 것</h4>
                    <ul className="space-y-1">
                      {nextLifeGuide.doList.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-400 text-xs">
                          <span className="text-blue-400 mt-0.5">→</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}

        {/* 면책 조항 */}
        <motion.div variants={itemVariants} className="glass rounded-2xl p-4 mb-6">
          <p className="text-slate-400 text-xs text-center">
            ※ 대운 분석은 전통 명리학을 기반으로 한 참고 자료입니다.
            인생의 중요한 결정은 다양한 요소를 고려하여 신중하게 내리시기 바랍니다.
          </p>
        </motion.div>

        {/* 버튼 */}
        <motion.div variants={itemVariants} className="space-y-3">
          <button
            onClick={onReset}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl text-white font-bold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <RefreshCw className="w-5 h-5" />
            다시 분석하기
          </button>
          <button
            onClick={onBack}
            className="w-full py-3 bg-slate-700/50 rounded-2xl text-slate-300 font-medium hover:bg-slate-700 transition-all"
          >
            메뉴로
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
