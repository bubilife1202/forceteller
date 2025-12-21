'use client';

import { motion } from 'framer-motion';
import { TrendingUp, ArrowLeft, RefreshCw, Calendar, Target, Heart, Briefcase, Coins, Activity, Crown, Zap, Download, Shield, AlertTriangle, CheckCircle, TrendingDown, Compass, Clock, Palette, Hash, MapPin, Brain, Lightbulb, Star, Award, Mail, Share2 } from 'lucide-react';
import { calculateSaju } from '@/lib/saju-calculator';
import { DaeunFormData } from './DaeunForm';
import { downloadElementAsHtml, sendByEmail } from '@/lib/utils/export-utils';
import { shareToKakao } from '@/lib/utils/kakao-share';

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

// 십성별 SWOT 분석
const TEN_GOD_SWOT: Record<string, {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}> = {
  '비견': {
    strengths: ['협업 능력 향상', '동료와의 시너지', '자기 주도성', '팀워크 강화'],
    weaknesses: ['경쟁 심화', '독단적 결정 어려움', '재물 분산', '리더십 충돌'],
    opportunities: ['동업 기회', '네트워크 확장', '공동 프로젝트', '파트너십 형성'],
    threats: ['형제간 갈등', '동료와의 분쟁', '재물 손실', '과도한 경쟁']
  },
  '겁재': {
    strengths: ['도전 정신', '위기 대응력', '강한 의지력', '극복 능력'],
    weaknesses: ['충동적 결정', '재물 손실 위험', '관계 갈등', '감정 조절 어려움'],
    opportunities: ['역경을 통한 성장', '내면 강화', '위기관리 능력 습득', '인내심 배양'],
    threats: ['사기 피해', '보증 문제', '금전 손실', '건강 악화']
  },
  '식신': {
    strengths: ['창의력 발산', '풍부한 아이디어', '매력 증가', '안정적 수입'],
    weaknesses: ['과소비 경향', '나태함', '체중 증가', '안주하는 습관'],
    opportunities: ['취미의 수익화', '요식업 성공', '예술 활동', '콘텐츠 창작'],
    threats: ['건강 방심', '기회 낭비', '과식/과음', '안일함']
  },
  '상관': {
    strengths: ['창의적 사고', '표현력', '혁신 능력', '독창성'],
    weaknesses: ['충돌 위험', '말실수', '권위에 대한 반항', '감정 기복'],
    opportunities: ['프리랜서 성공', '예술 창작', '자기 브랜딩', '혁신 프로젝트'],
    threats: ['직장 내 마찰', '상사와의 충돌', '법적 문제', '인간관계 파탄']
  },
  '편재': {
    strengths: ['사업 수완', '투자 감각', '인맥 형성', '기회 포착력'],
    weaknesses: ['충동 투자', '바람기', '과소비', '투기 유혹'],
    opportunities: ['사업 확장', '투자 수익', '횡재 가능', '새로운 인연'],
    threats: ['사기 피해', '과도한 투기', '재물 낭비', '불륜 위험']
  },
  '정재': {
    strengths: ['안정적 수입', '꾸준한 성장', '계획성', '신뢰성'],
    weaknesses: ['보수적 사고', '기회 놓침', '변화 두려움', '느린 성장'],
    opportunities: ['부동산 투자', '장기 자산 형성', '결혼/가정', '정기 수입 증가'],
    threats: ['큰 기회 상실', '급격한 변화 부적응', '과도한 안정 추구', '성장 정체']
  },
  '편관': {
    strengths: ['인내력', '위기 극복력', '책임감', '강인함'],
    weaknesses: ['극심한 스트레스', '건강 악화', '권위자와의 마찰', '법적 위험'],
    opportunities: ['시련을 통한 성장', '리더십 개발', '인내심 강화', '후반 도약'],
    threats: ['건강 문제', '법적 분쟁', '사고', '권력 갈등']
  },
  '정관': {
    strengths: ['사회적 인정', '안정적 지위', '명예', '신뢰'],
    weaknesses: ['보수성', '형식주의', '변화 저항', '과도한 책임감'],
    opportunities: ['승진', '자격증', '공직', '결혼'],
    threats: ['명예 실추', '책임 과중', '규칙 위반 시 불이익', '스트레스']
  },
  '편인': {
    strengths: ['학습 능력', '분석력', '깊이 있는 사고', '전문성'],
    weaknesses: ['현실 감각 부족', '고립', '실행력 저하', '사회성 부족'],
    opportunities: ['학위 취득', '연구 성과', '전문 지식 습득', '멘토 만남'],
    threats: ['현실 도피', '불면증', '우울', '인간관계 단절']
  },
  '정인': {
    strengths: ['귀인의 도움', '학문 성취', '안정감', '지혜'],
    weaknesses: ['의존성', '주도성 부족', '수동적 태도', '안일함'],
    opportunities: ['멘토링', '학업 성공', '가족의 지원', '윗사람의 추천'],
    threats: ['기회 거절', '의존성 증가', '주체성 상실', '교만']
  }
};

// 십성별 오행 균형 데이터
const TEN_GOD_FIVE_ELEMENTS: Record<string, {
  wood: number;
  fire: number;
  earth: number;
  metal: number;
  water: number;
}> = {
  '비견': { wood: 70, fire: 60, earth: 65, metal: 65, water: 60 },
  '겁재': { wood: 85, fire: 75, earth: 50, metal: 55, water: 50 },
  '식신': { wood: 65, fire: 80, earth: 75, metal: 60, water: 65 },
  '상관': { wood: 60, fire: 85, earth: 55, metal: 65, water: 60 },
  '편재': { wood: 70, fire: 70, earth: 80, metal: 75, water: 65 },
  '정재': { wood: 65, fire: 65, earth: 85, metal: 70, water: 60 },
  '편관': { wood: 55, fire: 60, earth: 65, metal: 85, water: 70 },
  '정관': { wood: 60, fire: 65, earth: 70, metal: 80, water: 65 },
  '편인': { wood: 65, fire: 55, earth: 60, metal: 70, water: 85 },
  '정인': { wood: 70, fire: 60, earth: 65, metal: 65, water: 80 }
};

// 십성별 행운의 요소
const TEN_GOD_LUCKY_ELEMENTS: Record<string, {
  colors: string[];
  directions: string[];
  numbers: number[];
  times: string[];
}> = {
  '비견': {
    colors: ['청록색', '하늘색', '민트', '연두색'],
    directions: ['동쪽', '남동쪽'],
    numbers: [3, 8, 13, 18],
    times: ['오전 5-7시', '오전 7-9시']
  },
  '겁재': {
    colors: ['녹색', '청색', '남색'],
    directions: ['동쪽'],
    numbers: [3, 4, 13, 14],
    times: ['오전 5-7시', '오전 3-5시']
  },
  '식신': {
    colors: ['빨강', '주황', '자주', '핑크'],
    directions: ['남쪽', '남동쪽'],
    numbers: [2, 7, 12, 17],
    times: ['오전 11-13시', '오후 13-15시']
  },
  '상관': {
    colors: ['주황', '빨강', '와인', '버건디'],
    directions: ['남쪽'],
    numbers: [2, 9, 12, 19],
    times: ['오전 11-13시', '오후 19-21시']
  },
  '편재': {
    colors: ['노랑', '갈색', '베이지', '황토'],
    directions: ['중앙', '남서쪽'],
    numbers: [5, 10, 15, 20],
    times: ['오전 7-9시', '오후 19-21시']
  },
  '정재': {
    colors: ['밝은 노랑', '크림', '아이보리'],
    directions: ['중앙', '남서쪽', '북동쪽'],
    numbers: [5, 8, 15, 18],
    times: ['오전 7-9시', '오전 13-15시']
  },
  '편관': {
    colors: ['흰색', '은색', '회색', '금색'],
    directions: ['서쪽', '북서쪽'],
    numbers: [6, 7, 16, 17],
    times: ['오후 15-17시', '오후 17-19시']
  },
  '정관': {
    colors: ['흰색', '밝은 회색', '진주색'],
    directions: ['서쪽', '북서쪽'],
    numbers: [6, 9, 16, 19],
    times: ['오후 15-17시', '오후 21-23시']
  },
  '편인': {
    colors: ['검정', '진남색', '보라', '어두운 회색'],
    directions: ['북쪽'],
    numbers: [1, 4, 11, 14],
    times: ['오전 23-1시', '오전 3-5시']
  },
  '정인': {
    colors: ['검정', '진청색', '네이비'],
    directions: ['북쪽', '북동쪽'],
    numbers: [1, 6, 11, 16],
    times: ['오전 23-1시', '오후 15-17시']
  }
};

// 연령대별 조언
const getAgeGroupAdvice = (age: number) => {
  if (age < 20) {
    return {
      title: '10대 청소년기',
      advice: '학업에 충실하고 다양한 경험을 통해 자신의 적성을 찾아보세요. 인격 형성의 중요한 시기입니다.',
      focus: ['학업', '자아 정체성 확립', '인성 교육', '진로 탐색']
    };
  } else if (age < 30) {
    return {
      title: '20대 자립기',
      advice: '자신의 길을 찾고 독립하는 시기입니다. 실패를 두려워하지 말고 도전하세요. 이 시기의 경험이 평생의 자산이 됩니다.',
      focus: ['커리어 시작', '경제적 독립', '인간관계 구축', '자기계발']
    };
  } else if (age < 40) {
    return {
      title: '30대 성장기',
      advice: '커리어와 가정을 안정시키는 시기입니다. 장기적 계획을 세우고 실행하세요. 결혼과 육아를 고려할 수 있는 때입니다.',
      focus: ['승진/이직', '결혼/출산', '자산 형성', '전문성 강화']
    };
  } else if (age < 50) {
    return {
      title: '40대 전성기',
      advice: '인생의 전성기입니다. 경험과 능력이 최고조에 달하는 때입니다. 후배를 양성하고 사회에 기여하세요.',
      focus: ['리더십 발휘', '자산 증식', '자녀 교육', '건강 관리']
    };
  } else if (age < 60) {
    return {
      title: '50대 원숙기',
      advice: '경험의 지혜를 나누는 시기입니다. 은퇴를 준비하고 제2의 인생을 설계하세요. 건강이 무엇보다 중요합니다.',
      focus: ['은퇴 준비', '건강 최우선', '취미 활동', '멘토링']
    };
  } else if (age < 70) {
    return {
      title: '60대 성숙기',
      advice: '인생의 결실을 즐기는 시기입니다. 건강을 유지하며 여유있는 생활을 즐기세요. 봉사와 나눔도 좋습니다.',
      focus: ['건강 유지', '여가 생활', '손자녀와의 시간', '봉사 활동']
    };
  } else {
    return {
      title: '70대 이상 황금기',
      advice: '인생의 황금기를 맞이하셨습니다. 건강을 최우선으로 하며 가족과 함께 행복한 시간을 보내세요.',
      focus: ['건강 관리', '가족과의 시간', '영적 성장', '평온한 생활']
    };
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

// 세운 계산 (연도별 운세)
const calculateYearlyFortune = (year: number, dayStem: string, daeunTenGod: string) => {
  const yearStem = STEMS[(year + 6) % 10];
  const yearTenGod = calculateTenGod(dayStem, yearStem);

  // 대운과 세운의 조화 점수
  const harmony = calculateHarmonyScore(daeunTenGod, yearTenGod);

  return {
    year,
    stem: yearStem,
    tenGod: yearTenGod,
    harmony,
    keywords: getYearKeywords(yearTenGod, harmony)
  };
};

const calculateHarmonyScore = (daeunTenGod: string, yearTenGod: string) => {
  // 대운과 세운의 조화도 계산
  const goodCombos = [
    ['식신', '편재'], ['식신', '정재'],
    ['정인', '정관'], ['정인', '편관'],
    ['편재', '식신'], ['정재', '식신'],
    ['비견', '식신'], ['비견', '편재']
  ];

  const badCombos = [
    ['겁재', '편관'], ['겁재', '정관'],
    ['상관', '정관'], ['상관', '편관'],
    ['편인', '식신'], ['정인', '상관']
  ];

  if (goodCombos.some(([a, b]) => (a === daeunTenGod && b === yearTenGod) || (b === daeunTenGod && a === yearTenGod))) {
    return 85;
  }

  if (badCombos.some(([a, b]) => (a === daeunTenGod && b === yearTenGod) || (b === daeunTenGod && a === yearTenGod))) {
    return 45;
  }

  return 65;
};

const getYearKeywords = (tenGod: string, harmony: number) => {
  const base = TEN_GOD_MEANING[tenGod]?.keyword || '변화';
  if (harmony >= 80) return `${base} • 대길`;
  if (harmony >= 60) return `${base} • 길`;
  return `${base} • 주의`;
};

// 인생 전환점 찾기
const findTurningPoints = (daeuns: { age: number; tenGod: string; score: number }[], currentAge: number) => {
  const turningPoints = [];

  for (let i = 1; i < daeuns.length; i++) {
    const scoreDiff = Math.abs(daeuns[i].score - daeuns[i-1].score);
    if (scoreDiff >= 20) {
      turningPoints.push({
        age: daeuns[i].age,
        from: daeuns[i-1].tenGod,
        to: daeuns[i].tenGod,
        impact: scoreDiff >= 30 ? '큰 변화' : '중요 변화',
        isUpward: daeuns[i].score > daeuns[i-1].score,
        description: daeuns[i].score > daeuns[i-1].score
          ? '상승 전환: 운세가 크게 좋아지는 시기입니다.'
          : '하강 전환: 신중한 대처가 필요한 시기입니다.'
      });
    }
  }

  return turningPoints.slice(0, 5);
};

// 중요 결정 시기 추천
const getDecisionTimings = (daeuns: { age: number; tenGod: string; score: number }[], currentAge: number) => {
  const goodPeriods = daeuns.filter(d => d.score >= 75 && d.age >= currentAge).slice(0, 3);

  return {
    career: goodPeriods[0] ? `${goodPeriods[0].age}~${goodPeriods[0].age + 2}세` : '현재',
    marriage: goodPeriods.find(d => ['정재', '정관', '정인'].includes(d.tenGod))
      ? `${goodPeriods.find(d => ['정재', '정관', '정인'].includes(d.tenGod))!.age}세 전후` : '안정기 추천',
    investment: goodPeriods.find(d => ['편재', '식신'].includes(d.tenGod))
      ? `${goodPeriods.find(d => ['편재', '식신'].includes(d.tenGod))!.age}~${goodPeriods.find(d => ['편재', '식신'].includes(d.tenGod))!.age + 3}세` : '신중히',
    business: goodPeriods[0] ? `${goodPeriods[0].age}세 이후` : '준비 필요'
  };
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
  const bestPeriod = peakPeriods[0];

  // 현재 대운 SWOT 분석
  const currentSwot = TEN_GOD_SWOT[currentDaeun.tenGod] || TEN_GOD_SWOT['비견'];

  // 향후 5년 세운 분석
  const currentYearNum = new Date().getFullYear();
  const yearlyFortunes = Array.from({ length: 5 }, (_, i) =>
    calculateYearlyFortune(currentYearNum + i, dayStem, currentDaeun.tenGod)
  );

  // 대운별 통합 분석
  const integratedAnalysis = daeunData.slice(0, 6).map(d => ({
    ...d,
    healthScore: calculateDaeunScore(d.tenGod, d.age, currentAge) + ((d.tenGod === '식신' || d.tenGod === '정인') ? 10 : (d.tenGod === '편관' || d.tenGod === '겁재') ? -10 : 0),
    wealthScore: calculateDaeunScore(d.tenGod, d.age, currentAge) + ((d.tenGod === '편재' || d.tenGod === '정재') ? 15 : (d.tenGod === '겁재') ? -15 : 0),
    loveScore: calculateDaeunScore(d.tenGod, d.age, currentAge) + ((d.tenGod === '식신' || d.tenGod === '편재') ? 10 : (d.tenGod === '상관' || d.tenGod === '편관') ? -10 : 0),
  }));

  // 인생 전환점
  const turningPoints = findTurningPoints(daeunData, currentAge);

  // 오행 균형
  const currentFiveElements = TEN_GOD_FIVE_ELEMENTS[currentDaeun.tenGod] || TEN_GOD_FIVE_ELEMENTS['비견'];
  const fiveElementsData = daeunData.slice(0, 6).map(d => ({
    age: `${d.age}세`,
    ...TEN_GOD_FIVE_ELEMENTS[d.tenGod]
  }));

  // 연령대별 조언
  const ageGroupAdvice = getAgeGroupAdvice(currentAge);

  // 행운의 요소
  const luckyElements = TEN_GOD_LUCKY_ELEMENTS[currentDaeun.tenGod] || TEN_GOD_LUCKY_ELEMENTS['비견'];

  // 중요 결정 시기
  const decisionTimings = getDecisionTimings(daeunData, currentAge);

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

  // HTML 다운로드
  const handleDownloadHtml = () => {
    const today = new Date().toISOString().split('T')[0];
    downloadElementAsHtml('daeun-result', `${formData.name}_대운분석_${today}`);
  };

  const handleSendEmail = () => {
    const subject = `[ForceTeller] 인생 전성기 분석 - ${formData.name}님`;
    const body = `
━━━━━━━━━━━━━━━━━━━━
📈 인생 전성기 분석
${formData.name}님 (${currentAge}세)
${result.day.stem.ko}일간 • ${result.day.stem.element} 오행
━━━━━━━━━━━━━━━━━━━━

⭐ 인생 전성기: ${bestPeriod.age}세~${bestPeriod.age + 9}세
십성: ${bestPeriod.tenGod} | 점수: ${bestPeriod.score}점

━━ 주요 대운 분석 ━━
${result.daeun.slice(0, 3).map(d => `
${d.age}세~${d.age + 9}세: ${d.stem.ko}${d.branch.ko} 대운
십성: ${calculateTenGod(result.day.stem.ko, d.stem.ko)}
`).join('\n')}

━━━━━━━━━━━━━━━━━━━━
ForceTeller - AI 운세 서비스
    `.trim();
    sendByEmail(subject, body);
  };

  const handleKakaoShare = () => {
    shareToKakao({
      title: `📈 ${formData.name}님의 인생 전성기 분석`,
      description: `${result.day.stem.ko}일간 | 전성기: ${bestPeriod.age}세~${bestPeriod.age + 9}세`,
    });
  };

  return (
    <motion.div
      className="min-h-screen py-8 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div id="daeun-result" className="max-w-lg mx-auto">
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

        {/* 1. 현재 대운 SWOT 분석 */}
        <motion.div variants={itemVariants} className="glass rounded-3xl p-5 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-purple-400" />
            현재 대운 SWOT 분석
          </h2>
          <p className="text-slate-400 text-sm mb-4">
            강점을 극대화하고 약점을 보완하여, 기회를 잡고 위협을 피하세요.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 강점 */}
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
              <h3 className="text-emerald-400 font-medium mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                강점 (Strengths)
              </h3>
              <ul className="space-y-2">
                {currentSwot.strengths.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
                    <span className="text-emerald-400 mt-1">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* 약점 */}
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
              <h3 className="text-orange-400 font-medium mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                약점 (Weaknesses)
              </h3>
              <ul className="space-y-2">
                {currentSwot.weaknesses.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
                    <span className="text-orange-400 mt-1">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* 기회 */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
              <h3 className="text-blue-400 font-medium mb-3 flex items-center gap-2">
                <Star className="w-5 h-5" />
                기회 (Opportunities)
              </h3>
              <ul className="space-y-2">
                {currentSwot.opportunities.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
                    <span className="text-blue-400 mt-1">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* 위협 */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
              <h3 className="text-red-400 font-medium mb-3 flex items-center gap-2">
                <TrendingDown className="w-5 h-5" />
                위협 (Threats)
              </h3>
              <ul className="space-y-2">
                {currentSwot.threats.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
                    <span className="text-red-400 mt-1">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* 2. 향후 5년 세운 분석 */}
        <motion.div variants={itemVariants} className="glass rounded-3xl p-5 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-teal-400" />
            향후 5년 세운 분석
          </h2>
          <p className="text-slate-400 text-sm mb-4">
            대운 안에서도 매년 변화하는 세운(歲運)을 살펴보세요.
          </p>

          <div className="space-y-3">
            {yearlyFortunes.map((yf, idx) => {
              const color = yf.harmony >= 80 ? 'emerald' : yf.harmony >= 60 ? 'blue' : 'orange';
              return (
                <div key={idx} className={`bg-${color}-500/10 border border-${color}-500/30 rounded-xl p-4`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-white font-bold text-lg">{yf.year}년</span>
                      <span className="text-slate-400">({yf.stem})</span>
                      <span className={`px-2 py-1 bg-${color}-500/30 text-${color}-300 text-xs rounded-full`}>
                        {yf.tenGod}
                      </span>
                    </div>
                    <span className={`font-bold text-${color}-400`}>{yf.harmony}점</span>
                  </div>
                  <p className="text-slate-300 text-sm">{yf.keywords}</p>
                  <p className="text-slate-400 text-xs mt-2">
                    {TEN_GOD_MEANING[yf.tenGod]?.description || ''}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* 3. 대운별 건강운, 재물운, 연애운 통합 분석 */}
        <motion.div variants={itemVariants} className="glass rounded-3xl p-5 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            대운별 3대 운세 통합 분석
          </h2>
          <p className="text-slate-400 text-sm mb-4">
            각 대운 시기별 건강운, 재물운, 연애운을 종합적으로 분석했습니다.
          </p>

          <div className="space-y-4">
            {integratedAnalysis.map((d, idx) => (
              <div key={idx} className={`rounded-xl p-4 ${
                d.isCurrent ? 'bg-cyan-500/20 border-2 border-cyan-500/50' : 'bg-slate-800/50 border border-slate-700'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold">
                      {d.stem.ko}{d.branch.ko} ({d.age}~{d.age + 9}세)
                    </span>
                    <span className="text-slate-400 text-sm">{d.tenGod}</span>
                    {d.isCurrent && (
                      <span className="px-2 py-1 bg-cyan-500 text-white text-xs rounded-full">현재</span>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  {/* 건강운 */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 text-sm">건강운</span>
                      </div>
                      <span className={`font-bold ${getScoreColor(Math.min(100, Math.max(0, d.healthScore))).text}`}>
                        {Math.min(100, Math.max(0, d.healthScore))}점
                      </span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-green-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, Math.max(0, d.healthScore))}%` }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                      />
                    </div>
                  </div>

                  {/* 재물운 */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Coins className="w-4 h-4 text-yellow-400" />
                        <span className="text-yellow-400 text-sm">재물운</span>
                      </div>
                      <span className={`font-bold ${getScoreColor(Math.min(100, Math.max(0, d.wealthScore))).text}`}>
                        {Math.min(100, Math.max(0, d.wealthScore))}점
                      </span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-yellow-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, Math.max(0, d.wealthScore))}%` }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                      />
                    </div>
                  </div>

                  {/* 연애운 */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-pink-400" />
                        <span className="text-pink-400 text-sm">연애운</span>
                      </div>
                      <span className={`font-bold ${getScoreColor(Math.min(100, Math.max(0, d.loveScore))).text}`}>
                        {Math.min(100, Math.max(0, d.loveScore))}점
                      </span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-pink-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, Math.max(0, d.loveScore))}%` }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 4. 인생 전환점 시기 분석 */}
        <motion.div variants={itemVariants} className="glass rounded-3xl p-5 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
            인생 전환점 시기 분석
          </h2>
          <p className="text-slate-400 text-sm mb-4">
            운세가 크게 변화하는 중요한 시기를 미리 파악하세요.
          </p>

          {turningPoints.length > 0 ? (
            <div className="space-y-3">
              {turningPoints.map((tp, idx) => (
                <div key={idx} className={`rounded-xl p-4 border-l-4 ${
                  tp.isUpward
                    ? 'bg-emerald-500/10 border-emerald-500'
                    : 'bg-orange-500/10 border-orange-500'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{tp.isUpward ? '📈' : '📉'}</span>
                      <span className="text-white font-bold">{tp.age}세</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        tp.impact === '큰 변화'
                          ? 'bg-purple-500/30 text-purple-300'
                          : 'bg-blue-500/30 text-blue-300'
                      }`}>
                        {tp.impact}
                      </span>
                    </div>
                  </div>
                  <div className="text-slate-300 text-sm mb-2">
                    {tp.from} → {tp.to}
                  </div>
                  <p className="text-slate-400 text-sm">{tp.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
              <p className="text-slate-400">
                큰 전환점이 발견되지 않았습니다. 완만한 변화가 예상됩니다.
              </p>
            </div>
          )}
        </motion.div>

        {/* 5. 오행 균형 변화 그래프 */}
        <motion.div variants={itemVariants} className="glass rounded-3xl p-5 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Compass className="w-5 h-5 text-lime-400" />
            오행 균형 변화
          </h2>
          <p className="text-slate-400 text-sm mb-4">
            대운에 따라 오행(木火土金水)의 균형이 어떻게 변화하는지 확인하세요.
          </p>

          <div className="space-y-4">
            {fiveElementsData.map((d, idx) => (
              <div key={idx} className="bg-slate-800/50 rounded-xl p-4">
                <div className="text-white font-medium mb-3">{d.age}</div>
                <div className="space-y-2">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-green-400">木 (목)</span>
                      <span className="text-green-400">{d.wood}</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-green-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${d.wood}%` }}
                        transition={{ duration: 0.6, delay: idx * 0.05 }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-red-400">火 (화)</span>
                      <span className="text-red-400">{d.fire}</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-red-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${d.fire}%` }}
                        transition={{ duration: 0.6, delay: idx * 0.05 }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-yellow-400">土 (토)</span>
                      <span className="text-yellow-400">{d.earth}</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-yellow-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${d.earth}%` }}
                        transition={{ duration: 0.6, delay: idx * 0.05 }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-400">金 (금)</span>
                      <span className="text-gray-400">{d.metal}</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gray-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${d.metal}%` }}
                        transition={{ duration: 0.6, delay: idx * 0.05 }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-blue-400">水 (수)</span>
                      <span className="text-blue-400">{d.water}</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-blue-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${d.water}%` }}
                        transition={{ duration: 0.6, delay: idx * 0.05 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 6. 연령대별 인생 조언 */}
        <motion.div variants={itemVariants} className="glass rounded-3xl p-5 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-rose-400" />
            {ageGroupAdvice.title}
          </h2>

          <div className="bg-gradient-to-br from-rose-500/20 to-pink-500/20 border border-rose-500/30 rounded-xl p-4 mb-4">
            <p className="text-rose-100 leading-relaxed text-base">
              {ageGroupAdvice.advice}
            </p>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-4">
            <h3 className="text-rose-400 font-medium mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              이 시기 중점 과제
            </h3>
            <div className="flex flex-wrap gap-2">
              {ageGroupAdvice.focus.map((item, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-rose-500/20 border border-rose-500/30 text-rose-300 rounded-full text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 7. 행운의 요소 */}
        <motion.div variants={itemVariants} className="glass rounded-3xl p-5 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400" />
            현재 대운의 행운의 요소
          </h2>
          <p className="text-slate-400 text-sm mb-4">
            이 요소들을 일상에 활용하면 대운의 기운을 더욱 강화할 수 있습니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 행운의 색상 */}
            <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/30 rounded-xl p-4">
              <h3 className="text-pink-400 font-medium mb-3 flex items-center gap-2">
                <Palette className="w-5 h-5" />
                행운의 색상
              </h3>
              <div className="flex flex-wrap gap-2">
                {luckyElements.colors.map((color, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-2 bg-pink-500/20 text-pink-200 rounded-lg text-sm"
                  >
                    {color}
                  </span>
                ))}
              </div>
              <p className="text-slate-400 text-xs mt-3">
                옷, 소품, 인테리어에 활용하세요
              </p>
            </div>

            {/* 행운의 방향 */}
            <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-xl p-4">
              <h3 className="text-emerald-400 font-medium mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                행운의 방향
              </h3>
              <div className="flex flex-wrap gap-2">
                {luckyElements.directions.map((dir, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-2 bg-emerald-500/20 text-emerald-200 rounded-lg text-sm"
                  >
                    {dir}
                  </span>
                ))}
              </div>
              <p className="text-slate-400 text-xs mt-3">
                이동, 여행, 중요한 일 방향으로 추천
              </p>
            </div>

            {/* 행운의 숫자 */}
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-4">
              <h3 className="text-blue-400 font-medium mb-3 flex items-center gap-2">
                <Hash className="w-5 h-5" />
                행운의 숫자
              </h3>
              <div className="flex flex-wrap gap-2">
                {luckyElements.numbers.map((num, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-2 bg-blue-500/20 text-blue-200 rounded-lg text-sm font-bold"
                  >
                    {num}
                  </span>
                ))}
              </div>
              <p className="text-slate-400 text-xs mt-3">
                비밀번호, 복권, 중요한 선택에 활용
              </p>
            </div>

            {/* 행운의 시간대 */}
            <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl p-4">
              <h3 className="text-amber-400 font-medium mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                행운의 시간대
              </h3>
              <div className="flex flex-wrap gap-2">
                {luckyElements.times.map((time, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-2 bg-amber-500/20 text-amber-200 rounded-lg text-sm"
                  >
                    {time}
                  </span>
                ))}
              </div>
              <p className="text-slate-400 text-xs mt-3">
                중요한 결정, 회의, 면접에 추천
              </p>
            </div>
          </div>
        </motion.div>

        {/* 8. 중요 결정 시기 추천 */}
        <motion.div variants={itemVariants} className="glass rounded-3xl p-5 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-fuchsia-400" />
            중요 결정 시기 추천
          </h2>
          <p className="text-slate-400 text-sm mb-4">
            인생의 중요한 결정은 대운이 좋을 때 내리는 것이 유리합니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="w-5 h-5 text-blue-400" />
                <h3 className="text-blue-400 font-medium">커리어 결정</h3>
              </div>
              <p className="text-white text-2xl font-bold mb-1">{decisionTimings.career}</p>
              <p className="text-slate-400 text-xs">
                이직, 승진, 독립 등의 결정에 좋은 시기
              </p>
            </div>

            <div className="bg-pink-500/10 border border-pink-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-5 h-5 text-pink-400" />
                <h3 className="text-pink-400 font-medium">결혼 결정</h3>
              </div>
              <p className="text-white text-2xl font-bold mb-1">{decisionTimings.marriage}</p>
              <p className="text-slate-400 text-xs">
                결혼, 약혼 등 평생의 약속에 좋은 시기
              </p>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Coins className="w-5 h-5 text-yellow-400" />
                <h3 className="text-yellow-400 font-medium">투자 결정</h3>
              </div>
              <p className="text-white text-2xl font-bold mb-1">{decisionTimings.investment}</p>
              <p className="text-slate-400 text-xs">
                부동산, 주식 등 큰 투자 결정에 좋은 시기
              </p>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-5 h-5 text-purple-400" />
                <h3 className="text-purple-400 font-medium">사업 결정</h3>
              </div>
              <p className="text-white text-2xl font-bold mb-1">{decisionTimings.business}</p>
              <p className="text-slate-400 text-xs">
                창업, 사업 확장 등의 결정에 좋은 시기
              </p>
            </div>
          </div>
        </motion.div>

        {/* 내보내기 버튼 */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={handleDownloadHtml}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-white font-medium hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg"
            >
              <Download className="w-5 h-5" />
              <span>저장</span>
            </button>
            <button
              onClick={handleSendEmail}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white font-medium hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg"
            >
              <Mail className="w-5 h-5" />
              <span>메일</span>
            </button>
            <button
              onClick={handleKakaoShare}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-xl text-white font-medium hover:from-yellow-600 hover:to-amber-700 transition-all shadow-lg"
            >
              <Share2 className="w-5 h-5" />
              <span>카톡</span>
            </button>
          </div>
        </motion.div>

        {/* 면책 조항 */}
        <motion.div variants={itemVariants} className="glass rounded-2xl p-4 mb-6">
          <p className="text-slate-400 text-xs text-center">
            ※ 대운 분석은 전통 명리학을 기반으로 한 참고 자료입니다.
            인생의 중요한 결정은 다양한 요소를 고려하여 신중하게 내리시기 바랍니다.
          </p>
        </motion.div>

        {/* 버튼 */}
        <motion.div variants={itemVariants} className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={handleDownloadHtml}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-white font-medium hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg"
            >
              <Download className="w-5 h-5" />
              <span>저장</span>
            </button>
            <button
              onClick={handleSendEmail}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white font-medium hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg"
            >
              <Mail className="w-5 h-5" />
              <span>메일</span>
            </button>
            <button
              onClick={handleKakaoShare}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-xl text-white font-medium hover:from-yellow-600 hover:to-amber-700 transition-all shadow-lg"
            >
              <Share2 className="w-5 h-5" />
              <span>카톡</span>
            </button>
          </div>

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
