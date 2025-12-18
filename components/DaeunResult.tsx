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
