'use client';

import { motion } from 'framer-motion';
import { Briefcase, ArrowLeft, RefreshCw, Star, Target, TrendingUp, AlertTriangle, Clock, Zap, Award, Users, DollarSign, Lightbulb, Heart, Compass } from 'lucide-react';
import { calculateSaju } from '@/lib/saju-calculator';
import { CareerFormData } from './CareerForm';

interface CareerResultProps {
  formData: CareerFormData;
  onReset: () => void;
  onBack: () => void;
}

// 일간별 직업 적성
const DAY_STEM_CAREER: Record<string, {
  element: string;
  personality: string;
  strengths: string[];
  weaknesses: string[];
  idealJobs: string[];
  avoidJobs: string[];
  workStyle: string;
  leaderType: string;
  teamRole: string;
}> = {
  '갑': {
    element: '목(木)',
    personality: '리더십과 추진력의 소유자',
    strengths: ['강한 주도력', '목표 지향적', '성장 욕구 강함', '정의로움'],
    weaknesses: ['융통성 부족', '독단적 결정', '참을성 부족'],
    idealJobs: ['경영자/CEO', '스타트업 창업', '변호사/검사', '군장교/경찰', '교육자/교수', '정치인', '사회운동가'],
    avoidJobs: ['단순 반복 업무', '하청/위탁업', '감정노동 직종'],
    workStyle: '목표를 세우고 앞으로 나아가는 진취적 스타일. 새로운 프로젝트를 시작하고 팀을 이끄는 역할에서 빛납니다.',
    leaderType: '카리스마형 리더 - 강한 비전을 제시하고 팀을 이끄는 타입',
    teamRole: '프로젝트 리더, 의사결정자',
  },
  '을': {
    element: '목(木)',
    personality: '유연함과 적응력의 달인',
    strengths: ['뛰어난 적응력', '섬세한 관찰력', '인내심', '협력적'],
    weaknesses: ['우유부단함', '주관 부족', '눈치 과다'],
    idealJobs: ['디자이너', '작가/소설가', '상담사/심리치료사', '비서/조수', '마케터', '외교관', '예술가'],
    avoidJobs: ['격렬한 경쟁 환경', '강압적 영업직', '단독 의사결정 필요 직종'],
    workStyle: '유연하게 상황에 적응하며 조화를 중시. 팀 내에서 갈등을 조율하고 분위기를 부드럽게 만드는 역할.',
    leaderType: '서번트 리더 - 팀원을 섬기고 지원하는 스타일',
    teamRole: '중재자, 협력 촉진자',
  },
  '병': {
    element: '화(火)',
    personality: '열정과 영향력의 아이콘',
    strengths: ['뜨거운 열정', '표현력 우수', '영향력 있음', '밝은 에너지'],
    weaknesses: ['조급함', '지속력 부족', '과시욕'],
    idealJobs: ['연예인/아이돌', '유튜버/인플루언서', '홍보/PR', '강연자/MC', '영업/세일즈', '배우', '방송인'],
    avoidJobs: ['정적인 사무직', '장기 연구직', '뒤에서 지원하는 역할'],
    workStyle: '주목받고 영향력을 발휘하는 위치에서 능력 발휘. 사람들 앞에 서는 것을 즐기고 에너지를 전파합니다.',
    leaderType: '비전형 리더 - 열정으로 사람들에게 영감을 주는 타입',
    teamRole: '무드메이커, 프레젠터',
  },
  '정': {
    element: '화(火)',
    personality: '섬세함과 창의성의 결합',
    strengths: ['세심한 배려', '예술적 감각', '완벽주의', '꼼꼼함'],
    weaknesses: ['걱정 과다', '소심함', '스트레스에 취약'],
    idealJobs: ['작가/시인', '프로그래머', '디자이너', '요리사/파티셰', '연구원', 'UX디자이너', '편집자'],
    avoidJobs: ['대규모 영업', '격렬한 협상', '즉흥적 결정 필요 업무'],
    workStyle: '디테일에 강하고 완성도를 추구. 조용히 집중해서 퀄리티 높은 결과물을 만들어냅니다.',
    leaderType: '전문가형 리더 - 깊은 전문성으로 팀을 이끄는 타입',
    teamRole: '품질 관리자, 전문가',
  },
  '무': {
    element: '토(土)',
    personality: '신뢰와 안정의 중심',
    strengths: ['신뢰감', '안정적', '포용력', '책임감 강함'],
    weaknesses: ['변화에 둔함', '고집', '보수적'],
    idealJobs: ['공무원', '은행원', '부동산', '농업/축산업', '인사담당자', '중재인', '자산관리사'],
    avoidJobs: ['급변하는 IT스타트업', '트렌드 변화 빠른 업종', '위험 감수 높은 투자'],
    workStyle: '안정적인 환경에서 꾸준히 성과를 내는 타입. 조직의 중심이 되어 사람들을 모으고 신뢰를 쌓습니다.',
    leaderType: '안정형 리더 - 조직에 안정감을 주는 든든한 리더',
    teamRole: '팀의 중심, 조정자',
  },
  '기': {
    element: '토(土)',
    personality: '돌봄과 육성의 전문가',
    strengths: ['양육 능력', '배려심', '실용적', '꼼꼼함'],
    weaknesses: ['소극적', '결단력 부족', '자기희생 과다'],
    idealJobs: ['교사/유아교사', '간호사', '사회복지사', '상담사', '농업/원예', '요양보호사', '육아/돌봄'],
    avoidJobs: ['강한 경쟁 환경', '비정한 결정 필요 업무', '냉정한 분석 직종'],
    workStyle: '사람을 돌보고 성장시키는 역할에서 보람을 느낌. 조용히 팀을 서포트하며 필요한 것을 채워줍니다.',
    leaderType: '양육형 리더 - 팀원의 성장을 돕는 멘토 스타일',
    teamRole: '서포터, 멘토',
  },
  '경': {
    element: '금(金)',
    personality: '결단력과 정의의 화신',
    strengths: ['결단력', '정의로움', '원칙적', '단호함'],
    weaknesses: ['융통성 부족', '독선적', '타협 어려움'],
    idealJobs: ['판사/검사', '군인/경찰', '외과의사', 'CEO/경영자', '기술자/엔지니어', '감사/회계사', '품질관리자'],
    avoidJobs: ['감정노동', '고객 응대', '타협 필요한 협상'],
    workStyle: '명확한 원칙하에 단호하게 결정하고 실행. 공정하고 정확한 판단이 필요한 곳에서 능력 발휘.',
    leaderType: '결단형 리더 - 빠르고 단호한 결정으로 팀을 이끄는 타입',
    teamRole: '의사결정자, 문제해결사',
  },
  '신': {
    element: '금(金)',
    personality: '예민함과 정교함의 조화',
    strengths: ['정교함', '완벽주의', '미적 감각', '섬세함'],
    weaknesses: ['비판적', '까다로움', '스트레스 취약'],
    idealJobs: ['보석감정사', '세공사', '금융분석가', '프로그래머', '편집자', '품질관리', '미술품감정', '외과의사'],
    avoidJobs: ['대충하는 업무', '시끄러운 환경', '대량 생산 업무'],
    workStyle: '정교하고 섬세한 작업에서 진가 발휘. 완벽에 가까운 결과물을 만들어내는 장인 정신.',
    leaderType: '장인형 리더 - 높은 기준으로 팀의 품질을 이끄는 타입',
    teamRole: '품질 전문가, 세부 관리자',
  },
  '임': {
    element: '수(水)',
    personality: '지혜와 포용의 바다',
    strengths: ['지혜로움', '포용력', '적응력', '유연한 사고'],
    weaknesses: ['우유부단', '감정 기복', '몽상적'],
    idealJobs: ['철학자/교수', '작가/시인', '심리상담사', '연구원', '외교관', '여행업', '무역업', '통역사'],
    avoidJobs: ['정해진 틀의 업무', '기계적 반복', '경직된 조직'],
    workStyle: '넓은 시야로 큰 그림을 보고 유연하게 대응. 다양한 상황에 물처럼 적응하며 흘러갑니다.',
    leaderType: '지혜형 리더 - 통찰력으로 방향을 제시하는 타입',
    teamRole: '전략가, 비전 제시자',
  },
  '계': {
    element: '수(水)',
    personality: '직관과 감성의 소유자',
    strengths: ['직관력', '감성적', '창의적', '영적 통찰'],
    weaknesses: ['현실 감각 부족', '변덕', '우울함'],
    idealJobs: ['점술가/상담사', '예술가', '음악가', '시인/작가', '종교인', '심리치료사', '영화감독', '작곡가'],
    avoidJobs: ['숫자 중심 업무', '논리적 분석', '경쟁적 영업'],
    workStyle: '감성과 직관을 활용하는 창작 활동에서 능력 발휘. 보이지 않는 것을 느끼고 표현합니다.',
    leaderType: '영감형 리더 - 직관으로 새로운 방향을 제시하는 타입',
    teamRole: '아이디어 뱅크, 창작자',
  },
};

// 십성별 직업운
const TEN_GOD_CAREER: Record<string, {
  type: string;
  career: string;
  promotion: string;
  change: string;
  startup: string;
}> = {
  '비견': {
    type: '협력과 경쟁',
    career: '동료와 협력하는 분야에서 능력 발휘. 동업이나 파트너십이 유리합니다.',
    promotion: '경쟁을 통해 성장하지만, 협력 관계 구축이 승진의 열쇠입니다.',
    change: '비슷한 업종으로 이직 시 적응 빠름. 완전 새 분야는 신중하게.',
    startup: '동업 형태가 좋으나 주도권 다툼 주의. 명확한 역할 분담 필요.',
  },
  '겁재': {
    type: '도전과 손실',
    career: '경쟁이 치열한 환경에서도 버티는 강인함. 단, 과욕은 금물.',
    promotion: '승진 과정에 경쟁자 多. 실력으로 입증해야 합니다.',
    change: '이직 시 조건을 꼼꼼히 확인. 급하게 결정하면 손해.',
    startup: '창업 시기를 신중하게. 무리한 투자나 확장은 위험합니다.',
  },
  '식신': {
    type: '창조와 풍요',
    career: '창의력과 표현력이 필요한 분야에서 성공. 먹거리/콘텐츠 관련 유리.',
    promotion: '실력을 인정받아 자연스럽게 상승. 급하게 서두르지 않아도 됨.',
    change: '좋은 기회가 찾아옴. 창작/기획 분야로의 이직 길조.',
    startup: '아이디어로 승부하는 사업 적합. 요식업, 콘텐츠 사업 유망.',
  },
  '상관': {
    type: '표현과 반항',
    career: '자유로운 환경, 창의적 업무에서 두각. 조직 생활 마찰 주의.',
    promotion: '기존 방식에 도전해 인정받기도 하지만, 윗사람과 충돌 주의.',
    change: '프리랜서, 1인 기업으로의 전환 고려. 조직 탈출 욕구 강함.',
    startup: '독창적 아이디어로 승부 가능. 단, 인간관계 관리 중요.',
  },
  '편재': {
    type: '횡재와 투자',
    career: '영업, 투자, 사업 분야에서 재능 발휘. 돈 냄새를 잘 맡습니다.',
    promotion: '성과로 승진. 영업 실적이나 투자 성공이 기회가 됩니다.',
    change: '더 나은 연봉, 조건으로 이직 가능. 적극적으로 기회 탐색.',
    startup: '사업 수완 있음. 투자나 부동산 관련 사업 유리.',
  },
  '정재': {
    type: '안정과 성실',
    career: '꾸준히 쌓아가는 타입. 안정적인 대기업, 공기업에 적합.',
    promotion: '성실함이 인정받아 착실히 승진. 급격한 상승보다 꾸준한 성장.',
    change: '안정성을 우선하면 좋은 이직. 연봉보다 복지를 보세요.',
    startup: '리스크 낮은 사업, 프랜차이즈 등이 적합. 무리한 투자 금지.',
  },
  '편관': {
    type: '시련과 권력',
    career: '권위 있는 조직, 공직에서 능력 발휘. 시련을 극복하며 성장.',
    promotion: '고난 뒤에 승진. 인내심이 필요하지만 결국 인정받습니다.',
    change: '이직 과정이 순탄치 않을 수 있음. 충분히 준비 후 실행.',
    startup: '창업보다는 조직 내 성공이 유리. 권력/권위 관련 사업은 고려.',
  },
  '정관': {
    type: '명예와 질서',
    career: '공직, 법조계, 대기업에서 빛나는 타입. 명예와 지위를 얻습니다.',
    promotion: '규칙을 따르고 실력을 쌓으면 승진 보장. 윗사람 인정 중요.',
    change: '공식적인 경로(헤드헌팅 등)로 이직 시 좋은 결과.',
    startup: '자격증/면허 필요 사업, 프랜차이즈 본사 등이 적합.',
  },
  '편인': {
    type: '학문과 사색',
    career: '연구, 학문, 기술 분야에서 전문가로 성장. 깊이를 추구.',
    promotion: '전문성이 승진의 열쇠. 자격증, 석박사가 도움됩니다.',
    change: '더 전문적인 분야로 이직 유리. 학습 기회 있는 곳 선택.',
    startup: '기술 기반 스타트업, 컨설팅, 교육 사업이 적합.',
  },
  '정인': {
    type: '귀인과 도움',
    career: '윗사람의 도움으로 성장. 교육, 학문 분야에서 성공.',
    promotion: '멘토나 선배의 추천으로 승진. 좋은 관계가 자산입니다.',
    change: '지인 소개로 이직 시 좋은 결과. 네트워킹이 중요.',
    startup: '부모/친척 도움으로 시작하거나, 프랜차이즈가 유리.',
  },
};

// 현재 시기 직업운
const YEAR_FORTUNE: Record<string, {
  overall: string;
  promotion: string;
  change: string;
  startup: string;
  advice: string;
}> = {
  '비견': {
    overall: '협력과 경쟁이 공존하는 해입니다. 동료와의 관계가 중요합니다.',
    promotion: '경쟁자가 많지만 협력하면 함께 성장할 수 있습니다.',
    change: '급하게 옮기지 말고 충분히 알아보세요. 동종 업계가 유리.',
    startup: '동업은 신중하게. 파트너 선택이 성패를 좌우합니다.',
    advice: '경쟁보다 협력을 선택하면 더 큰 성과를 얻습니다.',
  },
  '겁재': {
    overall: '변동이 많고 예상치 못한 상황이 생길 수 있습니다. 신중함 필요.',
    promotion: '무리하게 승진을 노리면 역효과. 실력 쌓기에 집중.',
    change: '충동적 이직은 금물. 최소 6개월은 고민하세요.',
    startup: '창업 시기가 아닙니다. 준비만 하고 실행은 미루세요.',
    advice: '손실을 줄이는 것이 이익을 늘리는 것보다 중요한 해.',
  },
  '식신': {
    overall: '재능을 발휘하고 인정받는 시기입니다. 창작/기획에 좋은 해.',
    promotion: '자연스럽게 기회가 옵니다. 욕심내지 않아도 됩니다.',
    change: '좋은 조건의 이직 기회가 있습니다. 적극 탐색하세요.',
    startup: '아이디어로 승부하는 사업 시작에 좋은 타이밍.',
    advice: '즐기면서 하는 일이 성공합니다. 스트레스 받지 마세요.',
  },
  '상관': {
    overall: '자기표현이 강해지는 시기. 조직 내 마찰에 주의하세요.',
    promotion: '아이디어는 좋지만 표현 방식에 신경 쓰세요. 윗사람 기분 관리.',
    change: '프리랜서나 독립을 진지하게 고려해볼 시기입니다.',
    startup: '창의적 사업 가능하지만, 파트너십 관리에 주의.',
    advice: '말 한마디가 천 냥 빚을 갚기도 하고 만들기도 합니다.',
  },
  '편재': {
    overall: '재물운이 좋고 투자 기회가 많은 해입니다. 눈을 크게 뜨세요.',
    promotion: '성과를 올리면 보상이 따릅니다. 적극적으로 성과 어필.',
    change: '연봉 협상에 유리한 시기. 더 좋은 조건 요구 가능.',
    startup: '사업 시작에 좋은 해. 투자나 영업 관련 사업 유망.',
    advice: '기회를 잡되, 과욕은 금물. 적정선에서 만족하세요.',
  },
  '정재': {
    overall: '안정적인 수입과 성장이 기대되는 해입니다.',
    promotion: '성실함이 인정받아 승진 기회가 옵니다.',
    change: '안정적인 회사로의 이직 유리. 스타트업보다 대기업.',
    startup: '리스크 낮은 사업 추천. 검증된 모델로 시작하세요.',
    advice: '급하지 않게 착실히 쌓아가면 좋은 결과가 있습니다.',
  },
  '편관': {
    overall: '시련과 도전이 있지만 성장의 기회이기도 합니다.',
    promotion: '고난 뒤에 승진. 힘들지만 버티면 보상이 옵니다.',
    change: '쉽게 결정하지 마세요. 신중하게 여러 옵션 비교.',
    startup: '창업보다 조직 내 안정을 추천. 리스크 회피.',
    advice: '어려움 속에서 내공이 쌓입니다. 포기하지 마세요.',
  },
  '정관': {
    overall: '공식적인 인정과 명예가 따르는 해입니다.',
    promotion: '승진/자격 취득에 좋은 해. 노력한 만큼 보상받습니다.',
    change: '공식적인 경로(헤드헌터, 추천 등)로 이직 추천.',
    startup: '자격/면허 관련 사업, 컨설팅 시작에 좋은 시기.',
    advice: '원칙을 지키면 신뢰를 얻고 기회가 옵니다.',
  },
  '편인': {
    overall: '공부와 자기계발의 해입니다. 실력을 쌓으세요.',
    promotion: '자격증, 학위가 승진에 도움됩니다. 투자하세요.',
    change: '더 배울 수 있는 곳으로 이직 고려. 성장 가능성 중시.',
    startup: '교육, 컨설팅, 기술 사업 시작에 좋은 시기.',
    advice: '당장의 이익보다 미래를 위한 공부에 투자하세요.',
  },
  '정인': {
    overall: '귀인의 도움을 받는 해입니다. 좋은 인연을 만나세요.',
    promotion: '멘토/선배의 추천으로 좋은 기회가 옵니다.',
    change: '지인 소개 이직이 좋은 결과. 인맥 활용하세요.',
    startup: '경험자의 조언을 받아 시작하면 성공 확률 UP.',
    advice: '혼자 힘으로 하려 하지 말고 도움을 구하세요.',
  },
};

// 천간 목록
const STEMS = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
const TEN_GODS = ['비견', '겁재', '식신', '상관', '편재', '정재', '편관', '정관', '편인', '정인'];

const calculateTenGod = (dayStem: string, targetStem: string): string => {
  const dayIndex = STEMS.indexOf(dayStem);
  const targetIndex = STEMS.indexOf(targetStem);
  if (dayIndex === -1 || targetIndex === -1) return '비견';
  const diff = (targetIndex - dayIndex + 10) % 10;
  return TEN_GODS[diff];
};

export default function CareerResult({ formData, onReset, onBack }: CareerResultProps) {
  // 사주 계산
  const result = calculateSaju({
    year: formData.year,
    month: formData.month,
    day: formData.day,
    hour: formData.timeUnknown ? 12 : formData.hour,
  }, formData.gender);

  const currentYear = new Date().getFullYear();
  const dayStem = result.day.stem.ko;
  const careerProfile = DAY_STEM_CAREER[dayStem] || DAY_STEM_CAREER['갑'];

  // 올해 운세 계산 (년주 기준)
  const yearTenGod = result.tenGods.year;
  const yearFortune = YEAR_FORTUNE[yearTenGod] || YEAR_FORTUNE['비견'];
  const tenGodCareer = TEN_GOD_CAREER[yearTenGod] || TEN_GOD_CAREER['비견'];

  // 대운 분석
  const currentAge = currentYear - formData.year + 1;
  const currentDaeun = result.daeun.find(d => d.age <= currentAge && currentAge < d.age + 10);
  const daeunTenGod = currentDaeun ? calculateTenGod(dayStem, currentDaeun.stem.ko) : '비견';
  const daeunCareer = TEN_GOD_CAREER[daeunTenGod] || TEN_GOD_CAREER['비견'];

  // 직업 적합도 점수
  const calculateJobScore = () => {
    let score = 60;
    if (['식신', '편재', '정재', '정인'].includes(yearTenGod)) score += 15;
    if (['식신', '편재', '정인'].includes(daeunTenGod)) score += 10;
    if (['겁재', '편관'].includes(yearTenGod)) score -= 10;
    return Math.min(95, Math.max(35, score + (currentAge % 10)));
  };

  const jobScore = calculateJobScore();

  const getScoreColor = (score: number) => {
    if (score >= 80) return { text: 'text-emerald-400', bg: 'bg-emerald-500/20', border: 'border-emerald-500' };
    if (score >= 60) return { text: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500' };
    if (score >= 40) return { text: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500' };
    return { text: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500' };
  };

  const scoreColor = getScoreColor(jobScore);

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

  // 고민별 콘텐츠
  const getConcernContent = () => {
    switch (formData.concern) {
      case 'job_fit':
        return {
          title: '나에게 맞는 직업은?',
          icon: <Target className="w-6 h-6" />,
          content: (
            <div className="space-y-4">
              <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/30">
                <h4 className="font-medium text-purple-300 mb-2">타고난 직업 적성</h4>
                <p className="text-white">{careerProfile.personality}</p>
                <p className="text-slate-400 mt-2">원소: {careerProfile.element}</p>
              </div>
              <div>
                <h4 className="font-medium text-emerald-400 mb-2 flex items-center gap-2">
                  <Star className="w-4 h-4" /> 추천 직업군
                </h4>
                <div className="flex flex-wrap gap-2">
                  {careerProfile.idealJobs.map((job, i) => (
                    <span key={i} className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm">{job}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-red-400 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> 피해야 할 직업
                </h4>
                <div className="flex flex-wrap gap-2">
                  {careerProfile.avoidJobs.map((job, i) => (
                    <span key={i} className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm">{job}</span>
                  ))}
                </div>
              </div>
            </div>
          ),
        };
      case 'promotion':
        return {
          title: '승진/성공 시기',
          icon: <TrendingUp className="w-6 h-6" />,
          content: (
            <div className="space-y-4">
              <div className={`p-4 rounded-xl border ${scoreColor.border} ${scoreColor.bg}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-400">올해 승진운</span>
                  <span className={`text-2xl font-bold ${scoreColor.text}`}>{jobScore}점</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div className={`h-3 rounded-full ${scoreColor.text.replace('text-', 'bg-')}`} style={{ width: `${jobScore}%` }} />
                </div>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-xl">
                <h4 className="font-medium text-blue-400 mb-2">올해의 승진운</h4>
                <p className="text-slate-300">{yearFortune.promotion}</p>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-xl">
                <h4 className="font-medium text-purple-400 mb-2">현재 대운의 흐름</h4>
                <p className="text-slate-300">{daeunCareer.promotion}</p>
              </div>
            </div>
          ),
        };
      case 'change':
        return {
          title: '이직 타이밍',
          icon: <Compass className="w-6 h-6" />,
          content: (
            <div className="space-y-4">
              <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/30">
                <h4 className="font-medium text-indigo-300 mb-2">현재 이직 적합도</h4>
                <p className="text-slate-300">{yearFortune.change}</p>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-xl">
                <h4 className="font-medium text-cyan-400 mb-2">대운으로 본 이직운</h4>
                <p className="text-slate-300">{daeunCareer.change}</p>
              </div>
              <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/30">
                <h4 className="font-medium text-yellow-400 mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" /> 이직 조언
                </h4>
                <p className="text-slate-300">{tenGodCareer.change}</p>
              </div>
            </div>
          ),
        };
      case 'startup':
        return {
          title: '창업 적성과 시기',
          icon: <Zap className="w-6 h-6" />,
          content: (
            <div className="space-y-4">
              <div className="p-4 bg-orange-500/10 rounded-xl border border-orange-500/30">
                <h4 className="font-medium text-orange-300 mb-2">창업 적성</h4>
                <p className="text-slate-300">{tenGodCareer.startup}</p>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-xl">
                <h4 className="font-medium text-emerald-400 mb-2">올해 창업 타이밍</h4>
                <p className="text-slate-300">{yearFortune.startup}</p>
              </div>
              <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/30">
                <h4 className="font-medium text-purple-400 mb-2">대운으로 본 사업운</h4>
                <p className="text-slate-300">{daeunCareer.startup}</p>
              </div>
            </div>
          ),
        };
      case 'sidejob':
        return {
          title: '부업/투잡 운세',
          icon: <DollarSign className="w-6 h-6" />,
          content: (
            <div className="space-y-4">
              <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/30">
                <h4 className="font-medium text-cyan-300 mb-2">부업 적성</h4>
                <p className="text-slate-300">
                  {careerProfile.element.includes('목') && '콘텐츠 제작, 교육, 컨설팅 부업이 적합합니다.'}
                  {careerProfile.element.includes('화') && '온라인 강의, 인플루언서, 공연 관련 부업이 유리합니다.'}
                  {careerProfile.element.includes('토') && '부동산, 중개, 재테크 관련 부업을 추천합니다.'}
                  {careerProfile.element.includes('금') && '기술 프리랜싱, 컨설팅, 품질 관리 부업이 맞습니다.'}
                  {careerProfile.element.includes('수') && '온라인 사업, 해외 거래, 창작 부업이 어울립니다.'}
                </p>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-xl">
                <h4 className="font-medium text-yellow-400 mb-2">추천 N잡</h4>
                <div className="flex flex-wrap gap-2">
                  {careerProfile.idealJobs.slice(0, 4).map((job, i) => (
                    <span key={i} className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">{job} 프리랜서</span>
                  ))}
                </div>
              </div>
            </div>
          ),
        };
    }
  };

  const concernContent = getConcernContent();

  return (
    <motion.div
      className="min-h-screen px-4 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-2xl mx-auto">
        {/* 헤더 */}
        <motion.div variants={itemVariants} className="flex justify-between items-center mb-6">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>메뉴로</span>
          </button>
          <button onClick={onReset} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <RefreshCw className="w-5 h-5" />
            <span>다시하기</span>
          </button>
        </motion.div>

        {/* 타이틀 */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center shadow-lg mb-4">
            <Briefcase className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            {formData.name}님의 직업운
          </h1>
          <p className="text-purple-400">일간: {dayStem} ({careerProfile.element})</p>
        </motion.div>

        {/* 메인 고민 콘텐츠 */}
        <motion.div variants={itemVariants} className="glass rounded-3xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4 text-purple-400">
            {concernContent?.icon}
            <h2 className="text-xl font-bold text-white">{concernContent?.title}</h2>
          </div>
          {concernContent?.content}
        </motion.div>

        {/* 강점과 약점 */}
        <motion.div variants={itemVariants} className="glass rounded-3xl p-6 mb-6">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-400" />
            업무 강점과 약점
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm text-emerald-400 mb-2">강점</h4>
              <div className="space-y-1">
                {careerProfile.strengths.map((s, i) => (
                  <div key={i} className="text-sm text-slate-300">• {s}</div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm text-red-400 mb-2">약점</h4>
              <div className="space-y-1">
                {careerProfile.weaknesses.map((w, i) => (
                  <div key={i} className="text-sm text-slate-300">• {w}</div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 업무 스타일 */}
        <motion.div variants={itemVariants} className="glass rounded-3xl p-6 mb-6">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" />
            팀에서의 역할
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-slate-800/50 rounded-xl">
              <div className="text-sm text-slate-400">업무 스타일</div>
              <div className="text-white">{careerProfile.workStyle}</div>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-xl">
              <div className="text-sm text-slate-400">리더십 유형</div>
              <div className="text-white">{careerProfile.leaderType}</div>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-xl">
              <div className="text-sm text-slate-400">팀 내 역할</div>
              <div className="text-white">{careerProfile.teamRole}</div>
            </div>
          </div>
        </motion.div>

        {/* 올해의 조언 */}
        <motion.div variants={itemVariants} className="glass rounded-3xl p-6 mb-6">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            {currentYear}년 직업운 총평
          </h3>
          <div className="p-4 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-xl border border-purple-500/20">
            <p className="text-slate-300 mb-3">{yearFortune.overall}</p>
            <div className="flex items-start gap-2 p-3 bg-yellow-500/10 rounded-lg">
              <Heart className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <p className="text-yellow-300 text-sm"><strong>핵심 조언:</strong> {yearFortune.advice}</p>
            </div>
          </div>
        </motion.div>

        {/* 하단 버튼 */}
        <motion.div variants={itemVariants} className="flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 py-4 bg-slate-700 hover:bg-slate-600 rounded-2xl text-white font-medium transition-colors"
          >
            다른 메뉴 보기
          </button>
          <button
            onClick={onReset}
            className="flex-1 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl text-white font-medium hover:from-indigo-600 hover:to-purple-600 transition-all"
          >
            다른 고민 분석
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
