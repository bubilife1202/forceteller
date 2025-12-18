'use client';

import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, RefreshCw, Star, TrendingUp, TrendingDown, Coins, Heart, Briefcase, Activity, Sparkles, Sun, Moon, Clock, Lightbulb, AlertTriangle, CheckCircle } from 'lucide-react';
import { getDayPillar, getTenGod } from '@/lib/saju-calculator';
import { MonthlyFortuneFormData } from './MonthlyFortuneForm';

interface MonthlyFortuneResultProps {
  formData: MonthlyFortuneFormData;
  onReset: () => void;
  onBack: () => void;
}

// 월별 천간 (2026년 기준 - 병오년)
const MONTHLY_STEMS_2026 = ['경', '신', '임', '계', '갑', '을', '병', '정', '무', '기', '경', '신'];

// 십성별 상세 정보
const TEN_GOD_DETAILS: Record<string, {
  score: number;
  keyword: string;
  trend: 'up' | 'down' | 'neutral';
  summary: string;
  money: { score: number; detail: string; action: string[] };
  love: { score: number; detail: string; action: string[] };
  work: { score: number; detail: string; action: string[] };
  health: { score: number; detail: string; action: string[] };
  luckyDays: string[];
  unluckyDays: string[];
  advice: string[];
  doList: string[];
  dontList: string[];
}> = {
  '비견': {
    score: 70,
    keyword: '협력',
    trend: 'neutral',
    summary: '동료와 협력이 빛나는 달입니다. 혼자보다 함께할 때 더 큰 성과를 얻습니다.',
    money: {
      score: 65,
      detail: '공동 투자나 합작 사업에서 이익이 있을 수 있습니다. 다만 수익 배분에 대해 명확히 해두세요.',
      action: ['공동 투자 고려', '수익 배분 명확화', '지인과의 금전 거래 주의']
    },
    love: {
      score: 75,
      detail: '친구 같은 편안한 관계가 유지됩니다. 새로운 만남보다는 기존 인연의 발전이 기대됩니다.',
      action: ['소개팅보다 모임에서 인연 찾기', '공통 관심사 활동', '편안한 대화']
    },
    work: {
      score: 70,
      detail: '팀 프로젝트에서 좋은 성과가 예상됩니다. 경쟁보다는 협력을 선택하세요.',
      action: ['팀워크 강화', '동료와 시너지', '단독 성과보다 공동 성과']
    },
    health: {
      score: 70,
      detail: '동료나 친구와 함께하는 운동이 효과적입니다. 적당한 경쟁은 동기부여가 됩니다.',
      action: ['그룹 운동 참여', '러닝 크루 가입', '친구와 운동 약속']
    },
    luckyDays: ['1일', '8일', '15일', '22일'],
    unluckyDays: ['5일', '12일', '19일'],
    advice: ['나눔이 복을 부릅니다', '독식하면 기회가 사라집니다', '함께 성장하세요'],
    doList: ['팀 프로젝트 참여', '네트워킹 모임', '친구와 식사', '공동 목표 설정'],
    dontList: ['혼자 중요 결정', '과한 경쟁심', '비교하며 우울해하기'],
  },
  '겁재': {
    score: 50,
    keyword: '경쟁',
    trend: 'down',
    summary: '예상치 못한 경쟁이나 손실에 주의하세요. 지키는 것이 얻는 것보다 중요한 달입니다.',
    money: {
      score: 40,
      detail: '금전 손실의 위험이 있습니다. 투자는 보류하고, 충동구매를 삼가세요.',
      action: ['투자 보류', '충동구매 자제', '빌려준 돈 받기 어려움']
    },
    love: {
      score: 45,
      detail: '삼각관계나 오해가 생길 수 있습니다. 명확한 의사소통이 중요합니다.',
      action: ['솔직한 대화', '의심 금물', '과도한 질투 주의']
    },
    work: {
      score: 55,
      detail: '경쟁자의 견제나 방해가 있을 수 있습니다. 본업에 집중하세요.',
      action: ['핵심 업무 집중', '소문 무시', '묵묵히 실력 쌓기']
    },
    health: {
      score: 50,
      detail: '스트레스로 인한 컨디션 저하에 주의하세요. 무리한 운동도 피하세요.',
      action: ['과로 금지', '충분한 휴식', '스트레스 관리']
    },
    luckyDays: ['3일', '12일', '21일'],
    unluckyDays: ['7일', '14일', '28일'],
    advice: ['욕심을 버리세요', '지키는 것이 우선입니다', '급할수록 돌아가세요'],
    doList: ['기존 업무 마무리', '저축', '건강검진', '독서'],
    dontList: ['큰 돈 거래', '새 사업 시작', '보증 서기', '과음'],
  },
  '식신': {
    score: 85,
    keyword: '창조',
    trend: 'up',
    summary: '창의력이 빛나고 즐거움이 가득한 달! 취미와 먹거리가 행운을 부릅니다.',
    money: {
      score: 80,
      detail: '부업이나 창작 활동에서 수익이 생길 수 있습니다. 재능을 돈으로 연결하세요.',
      action: ['부업 시작', '창작물 판매', '취미의 수익화']
    },
    love: {
      score: 90,
      detail: '매력이 빛나는 달입니다. 맛집 데이트나 여행이 로맨스를 불러옵니다.',
      action: ['맛집 탐방', '요리해주기', '감성 데이트', '여행 계획']
    },
    work: {
      score: 85,
      detail: '아이디어가 인정받습니다. 기획이나 창의적 업무에서 두각을 나타내세요.',
      action: ['기획서 작성', '아이디어 제안', '프레젠테이션']
    },
    health: {
      score: 85,
      detail: '맛있는 음식을 즐기되 과식은 주의하세요. 즐거운 활동이 건강에 좋습니다.',
      action: ['균형 잡힌 식사', '요가나 수영', '즐거운 취미 활동']
    },
    luckyDays: ['2일', '10일', '18일', '26일'],
    unluckyDays: ['6일', '24일'],
    advice: ['즐기면서 살아가세요', '행복이 성공을 부릅니다', '창의력을 믿으세요'],
    doList: ['맛집 탐방', '취미 활동', '창작', '소개팅', '여행'],
    dontList: ['과식', '무리한 다이어트', '재미없는 일에 매달리기'],
  },
  '상관': {
    score: 60,
    keyword: '표현',
    trend: 'neutral',
    summary: '표현력이 좋지만 화를 부를 수 있습니다. 말의 무게를 아세요.',
    money: {
      score: 55,
      detail: '충동적인 지출이나 유흥비에 주의하세요. 예산을 세워 관리하세요.',
      action: ['예산 관리', '충동구매 자제', '유흥비 줄이기']
    },
    love: {
      score: 60,
      detail: '솔직함이 때로는 상처가 됩니다. 부드러운 표현을 연습하세요.',
      action: ['말투 주의', '칭찬하기', '감정 조절']
    },
    work: {
      score: 65,
      detail: '혁신적인 아이디어가 있지만, 상사와의 마찰에 주의하세요.',
      action: ['겸손한 태도', '의견 제시 시 배려', '참을성']
    },
    health: {
      score: 55,
      detail: '스트레스가 몸에 쌓입니다. 감정 해소 방법을 찾으세요.',
      action: ['명상', '글쓰기', '운동으로 스트레스 해소']
    },
    luckyDays: ['4일', '13일', '22일'],
    unluckyDays: ['9일', '18일', '27일'],
    advice: ['침묵이 금일 때가 있습니다', '한 박자 쉬고 말하세요', '듣기의 미덕을 배우세요'],
    doList: ['글쓰기', '예술 활동', '창의적 발상', '운동'],
    dontList: ['직설적 비판', '논쟁', '음주 후 연락', '충동적 결정'],
  },
  '편재': {
    score: 80,
    keyword: '횡재',
    trend: 'up',
    summary: '재물 운이 왕성합니다! 기회를 적극 포착하세요.',
    money: {
      score: 90,
      detail: '횡재수가 있습니다! 투자, 사업, 복권 등에서 기회가 올 수 있습니다.',
      action: ['투자 기회 포착', '사업 확장', '적극적 재테크']
    },
    love: {
      score: 75,
      detail: '새로운 인연이 생길 수 있습니다. 적극적으로 다가가세요.',
      action: ['소개팅 참여', '새 인연에 열린 마음', '데이팅 앱 활용']
    },
    work: {
      score: 85,
      detail: '새 프로젝트나 거래가 성사될 가능성이 높습니다.',
      action: ['영업 활동', '계약 체결', '새 프로젝트 수주']
    },
    health: {
      score: 75,
      detail: '활력이 넘칩니다. 이 에너지를 긍정적으로 활용하세요.',
      action: ['새로운 운동 도전', '활동량 늘리기', '야외 활동']
    },
    luckyDays: ['5일', '14일', '23일'],
    unluckyDays: ['11일', '20일'],
    advice: ['기회를 망설이지 마세요', '행운은 용기 있는 자의 것', '도전이 보상을 가져옵니다'],
    doList: ['투자', '새 사업', '적극적인 영업', '새 인연 만들기'],
    dontList: ['도박성 투자', '무모한 지출', '과시', '급한 판단'],
  },
  '정재': {
    score: 90,
    keyword: '안정',
    trend: 'up',
    summary: '성실함이 보상받는 달! 꾸준한 노력이 결실을 맺습니다.',
    money: {
      score: 95,
      detail: '정당한 노력의 대가를 받습니다. 월급, 보너스, 계약금 등이 기대됩니다.',
      action: ['성과급 기대', '재테크 정리', '저축 늘리기', '보험 점검']
    },
    love: {
      score: 85,
      detail: '안정적인 관계가 발전합니다. 결혼이나 약속에 좋은 달입니다.',
      action: ['진지한 대화', '미래 계획', '가족 소개', '프러포즈']
    },
    work: {
      score: 95,
      detail: '승진, 인정, 계약 성사 등 좋은 소식이 기대됩니다.',
      action: ['중요 보고', '프레젠테이션', '계약 체결', '승진 면접']
    },
    health: {
      score: 85,
      detail: '규칙적인 생활이 건강을 지켜줍니다. 루틴을 유지하세요.',
      action: ['정시 식사', '규칙적 운동', '충분한 수면']
    },
    luckyDays: ['1일', '9일', '17일', '25일'],
    unluckyDays: ['15일'],
    advice: ['성실함이 최고의 재능', '꾸준함을 멈추지 마세요', '노력은 배신하지 않습니다'],
    doList: ['중요 업무', '계약', '저축', '결혼 준비', '재무 정리'],
    dontList: ['게으름', '약속 어기기', '편법', '급한 판단'],
  },
  '편관': {
    score: 55,
    keyword: '시련',
    trend: 'down',
    summary: '시련이 있지만 성장의 기회입니다. 인내하면 보상이 옵니다.',
    money: {
      score: 50,
      detail: '예상치 못한 지출(세금, 벌금, 수리비 등)에 대비하세요.',
      action: ['비상금 확보', '서류 점검', '세금 미리 준비']
    },
    love: {
      score: 45,
      detail: '갈등이나 오해가 생길 수 있습니다. 참을성이 필요합니다.',
      action: ['차분한 대화', '인내심', '상대방 이해하기']
    },
    work: {
      score: 55,
      detail: '상사나 권위자와의 마찰에 주의하세요. 순응이 지혜입니다.',
      action: ['겸손한 태도', '보고 철저히', '불필요한 충돌 피하기']
    },
    health: {
      score: 50,
      detail: '스트레스성 증상(두통, 소화불량 등)에 주의하세요.',
      action: ['스트레스 관리', '마사지', '충분한 휴식']
    },
    luckyDays: ['8일', '16일', '24일'],
    unluckyDays: ['4일', '12일', '20일', '28일'],
    advice: ['이 또한 지나갑니다', '참으면 복이 옵니다', '시련이 성장의 기회'],
    doList: ['서류 정리', '건강검진', '명상', '자기계발'],
    dontList: ['윗사람과 다투기', '무리한 도전', '음주운전', '과로'],
  },
  '정관': {
    score: 75,
    keyword: '질서',
    trend: 'neutral',
    summary: '원칙을 지키면 좋은 결과가 옵니다. 공식적인 일에 유리합니다.',
    money: {
      score: 70,
      detail: '계획적인 지출과 저축이 좋습니다. 큰 결정은 신중하게.',
      action: ['예산 관리', '장기 재테크', '보험/연금 점검']
    },
    love: {
      score: 80,
      detail: '책임감 있는 태도가 신뢰를 쌓습니다. 진지한 관계에 좋습니다.',
      action: ['약속 지키기', '가족에게 인사', '진지한 대화']
    },
    work: {
      score: 85,
      detail: '공식적인 업무, 서류, 계약에 유리한 달입니다.',
      action: ['공문서 처리', '계약 검토', '면접', '자격증 취득']
    },
    health: {
      score: 75,
      detail: '규칙적인 생활 습관이 건강의 열쇠입니다.',
      action: ['정시 기상', '규칙적 식사', '금연/금주 도전']
    },
    luckyDays: ['6일', '15일', '24일'],
    unluckyDays: ['3일', '21일'],
    advice: ['원칙이 힘이 됩니다', '정도를 걸으세요', '신뢰가 자산입니다'],
    doList: ['공식 업무', '계약', '면접', '자격증 공부', '법적 절차'],
    dontList: ['편법', '무단결근', '거짓말', '약속 어기기'],
  },
  '편인': {
    score: 65,
    keyword: '배움',
    trend: 'neutral',
    summary: '배움과 사색의 달입니다. 당장의 성과보다 미래를 준비하세요.',
    money: {
      score: 60,
      detail: '자기계발 투자가 좋습니다. 당장의 수익보다 미래를 위해 투자하세요.',
      action: ['교육비 투자', '자격증 준비', '독서 습관']
    },
    love: {
      score: 65,
      detail: '정신적 교감이 중요합니다. 깊은 대화를 나눠보세요.',
      action: ['진솔한 대화', '독서 모임', '지적 교류']
    },
    work: {
      score: 70,
      detail: '새로운 지식이나 기술을 배울 기회가 있습니다.',
      action: ['세미나 참석', '온라인 강의', '자격증 취득']
    },
    health: {
      score: 60,
      detail: '생각이 많아 잠이 부족할 수 있습니다. 정신 건강에 신경 쓰세요.',
      action: ['명상', '산책', '수면 관리', '디지털 디톡스']
    },
    luckyDays: ['7일', '16일', '25일'],
    unluckyDays: ['10일', '19일'],
    advice: ['배움에 끝이 없습니다', '오늘의 공부가 내일의 자산', '몸보다 마음을 돌보세요'],
    doList: ['공부', '독서', '강의 수강', '자격증 준비', '명상'],
    dontList: ['결정 미루기', '현실 도피', '과한 몽상', '공부 핑계로 행동 안하기'],
  },
  '정인': {
    score: 85,
    keyword: '귀인',
    trend: 'up',
    summary: '귀인의 도움이 있는 달! 감사하는 마음이 더 큰 복을 부릅니다.',
    money: {
      score: 75,
      detail: '어른이나 멘토의 도움으로 재물 운이 좋아집니다.',
      action: ['멘토 조언', '부모님 도움 감사히', '은사 연락']
    },
    love: {
      score: 85,
      detail: '따뜻하고 안정적인 관계가 이어집니다. 가족 같은 편안함을 느낍니다.',
      action: ['편안한 대화', '가족 소개', '따뜻한 응원']
    },
    work: {
      score: 80,
      detail: '선배나 멘토의 조언이 큰 도움이 됩니다. 가르침을 겸허히 받으세요.',
      action: ['선배에게 질문', '피드백 수용', '멘토링 받기']
    },
    health: {
      score: 85,
      detail: '심신이 안정되는 달입니다. 따뜻한 음식과 충분한 휴식이 좋습니다.',
      action: ['따뜻한 음식', '충분한 수면', '명상', '자연 속 휴식']
    },
    luckyDays: ['2일', '11일', '20일', '29일'],
    unluckyDays: ['8일', '26일'],
    advice: ['감사가 복을 부릅니다', '받은 은혜를 갚으세요', '겸손이 성장의 열쇠'],
    doList: ['부모님 연락', '은사 감사', '멘토 만남', '봉사활동'],
    dontList: ['배은망덕', '교만', '독선', '감사 잊기'],
  },
};

// 계절별 특성
function getSeasonInfo(month: number) {
  if (month >= 3 && month <= 5) return { name: '봄', emoji: '🌸', modifier: 5, advice: '새 시작에 좋은 계절, 행동력을 높이세요' };
  if (month >= 6 && month <= 8) return { name: '여름', emoji: '🌻', modifier: 0, advice: '열정을 쏟을 때, 과로에 주의하세요' };
  if (month >= 9 && month <= 11) return { name: '가을', emoji: '🍂', modifier: 5, advice: '결실의 계절, 마무리에 집중하세요' };
  return { name: '겨울', emoji: '❄️', modifier: -5, advice: '준비와 충전의 시기, 내면을 돌아보세요' };
}

export default function MonthlyFortuneResult({ formData, onReset, onBack }: MonthlyFortuneResultProps) {
  // 사용자의 일주 계산
  const userDayPillar = getDayPillar(formData.year, formData.month, formData.day);
  const userDayStem = userDayPillar.stem;
  const userElement = userDayStem.element;

  const targetMonth = formData.targetMonth;
  const monthStem = MONTHLY_STEMS_2026[targetMonth - 1];
  const tenGod = getTenGod(userDayStem.ko, monthStem);
  const fortune = TEN_GOD_DETAILS[tenGod] || TEN_GOD_DETAILS['비견'];
  const seasonInfo = getSeasonInfo(targetMonth);

  // 최종 점수 계산
  const finalScore = Math.min(100, Math.max(20, fortune.score + seasonInfo.modifier));

  // 점수 색상
  const getScoreColor = (score: number) => {
    if (score >= 85) return { text: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/30', fill: 'bg-green-500' };
    if (score >= 70) return { text: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500/30', fill: 'bg-blue-500' };
    if (score >= 55) return { text: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/30', fill: 'bg-yellow-500' };
    return { text: 'text-orange-400', bg: 'bg-orange-500/20', border: 'border-orange-500/30', fill: 'bg-orange-500' };
  };

  const scoreColor = getScoreColor(finalScore);

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

  // 진행바 컴포넌트
  const ProgressBar = ({ score, color }: { score: number; color: string }) => (
    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
      <motion.div
        className={`h-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${score}%` }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
    </div>
  );

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
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center shadow-lg mb-4">
            <Calendar className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            2026년 {targetMonth}월 운세
          </h1>
          <p className="text-purple-400">{userDayStem.ko}일간 • {userElement} 오행</p>
          <p className="text-slate-500 text-sm mt-1">{seasonInfo.emoji} {seasonInfo.name} • {monthStem}월</p>
        </motion.div>

        {/* 메인 점수 카드 */}
        <motion.div
          variants={itemVariants}
          className={`${scoreColor.bg} border ${scoreColor.border} rounded-3xl p-6 mb-6`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {fortune.trend === 'up' && <TrendingUp className="w-8 h-8 text-green-400" />}
              {fortune.trend === 'down' && <TrendingDown className="w-8 h-8 text-orange-400" />}
              {fortune.trend === 'neutral' && <Star className="w-8 h-8 text-yellow-400" />}
              <div>
                <div className={`text-4xl font-bold ${scoreColor.text}`}>{finalScore}점</div>
                <div className="text-slate-400 text-sm">종합 운세</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">#{fortune.keyword}</div>
              <div className="text-slate-400 text-sm">{tenGod}의 달</div>
            </div>
          </div>

          <p className="text-white text-lg leading-relaxed">{fortune.summary}</p>

          <div className="mt-4 p-3 bg-slate-800/50 rounded-xl">
            <div className="flex items-center gap-2 text-purple-300 text-sm">
              <Sparkles className="w-4 h-4" />
              <span>{seasonInfo.advice}</span>
            </div>
          </div>
        </motion.div>

        {/* 분야별 상세 운세 */}
        <motion.div variants={itemVariants} className="space-y-4 mb-6">
          {/* 재물운 */}
          <div className="glass-strong rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400 font-bold">재물운</span>
              </div>
              <span className="text-yellow-400 font-bold">{fortune.money.score}점</span>
            </div>
            <ProgressBar score={fortune.money.score} color="bg-yellow-500" />
            <p className="text-slate-300 text-sm mt-3">{fortune.money.detail}</p>
            <div className="mt-3 space-y-1">
              {fortune.money.action.map((action, i) => (
                <div key={i} className="flex items-center gap-2 text-yellow-300 text-xs">
                  <CheckCircle className="w-3 h-3" />
                  <span>{action}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 애정운 */}
          <div className="glass-strong rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-400" />
                <span className="text-pink-400 font-bold">애정운</span>
              </div>
              <span className="text-pink-400 font-bold">{fortune.love.score}점</span>
            </div>
            <ProgressBar score={fortune.love.score} color="bg-pink-500" />
            <p className="text-slate-300 text-sm mt-3">{fortune.love.detail}</p>
            <div className="mt-3 space-y-1">
              {fortune.love.action.map((action, i) => (
                <div key={i} className="flex items-center gap-2 text-pink-300 text-xs">
                  <CheckCircle className="w-3 h-3" />
                  <span>{action}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 직장/학업운 */}
          <div className="glass-strong rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-400" />
                <span className="text-blue-400 font-bold">직장/학업운</span>
              </div>
              <span className="text-blue-400 font-bold">{fortune.work.score}점</span>
            </div>
            <ProgressBar score={fortune.work.score} color="bg-blue-500" />
            <p className="text-slate-300 text-sm mt-3">{fortune.work.detail}</p>
            <div className="mt-3 space-y-1">
              {fortune.work.action.map((action, i) => (
                <div key={i} className="flex items-center gap-2 text-blue-300 text-xs">
                  <CheckCircle className="w-3 h-3" />
                  <span>{action}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 건강운 */}
          <div className="glass-strong rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-bold">건강운</span>
              </div>
              <span className="text-green-400 font-bold">{fortune.health.score}점</span>
            </div>
            <ProgressBar score={fortune.health.score} color="bg-green-500" />
            <p className="text-slate-300 text-sm mt-3">{fortune.health.detail}</p>
            <div className="mt-3 space-y-1">
              {fortune.health.action.map((action, i) => (
                <div key={i} className="flex items-center gap-2 text-green-300 text-xs">
                  <CheckCircle className="w-3 h-3" />
                  <span>{action}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 행운/주의 날짜 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-5 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-400" />
            {targetMonth}월 중요한 날
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-500/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sun className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-medium">행운의 날</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {fortune.luckyDays.map((day, i) => (
                  <span key={i} className="px-3 py-1 bg-green-500/20 text-green-300 text-sm rounded-full">
                    {day}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-orange-500/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Moon className="w-5 h-5 text-orange-400" />
                <span className="text-orange-400 font-medium">주의할 날</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {fortune.unluckyDays.map((day, i) => (
                  <span key={i} className="px-3 py-1 bg-orange-500/20 text-orange-300 text-sm rounded-full">
                    {day}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 하면 좋은 일 / 피해야 할 일 */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 mb-6">
          <div className="glass-strong rounded-2xl p-4">
            <h3 className="text-emerald-400 font-bold text-sm mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              이달 하면 좋은 일
            </h3>
            <ul className="space-y-2">
              {fortune.doList.map((item, i) => (
                <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-strong rounded-2xl p-4">
            <h3 className="text-red-400 font-bold text-sm mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              이달 피해야 할 일
            </h3>
            <ul className="space-y-2">
              {fortune.dontList.map((item, i) => (
                <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">✗</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* 조언 */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/30 rounded-3xl p-6 mb-6"
        >
          <h2 className="text-lg font-bold text-purple-300 mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            {targetMonth}월의 메시지
          </h2>
          <div className="space-y-3">
            {fortune.advice.map((advice, i) => (
              <p key={i} className="text-white text-lg leading-relaxed">
                &ldquo;{advice}&rdquo;
              </p>
            ))}
          </div>
        </motion.div>

        {/* 버튼 */}
        <motion.div variants={itemVariants} className="space-y-3">
          <button
            onClick={onReset}
            className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl text-white font-bold text-lg hover:from-indigo-600 hover:to-purple-700 transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <RefreshCw className="w-5 h-5" />
            다른 달 보기
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
