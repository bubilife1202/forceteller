'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowLeft, RefreshCw, Star, TrendingUp, TrendingDown, Minus, ChevronDown, ChevronUp, Coins, Heart, Briefcase, Activity } from 'lucide-react';
import { getDayPillar, getTenGod } from '@/lib/saju-calculator';
import { MonthlyFortuneFormData } from './MonthlyFortuneForm';

interface MonthlyFortuneResultProps {
  formData: MonthlyFortuneFormData;
  onReset: () => void;
  onBack: () => void;
}

// 월별 천간 (2025년 기준 - 을사년)
const MONTHLY_STEMS_2025 = ['정', '무', '기', '경', '신', '임', '계', '갑', '을', '병', '정', '무'];

// 십성별 운세 점수 및 키워드
const TEN_GOD_SCORES: Record<string, { score: number; keyword: string; trend: 'up' | 'down' | 'neutral'; advice: string }> = {
  '비견': { score: 70, keyword: '협력', trend: 'neutral', advice: '동료와 함께하면 좋은 결과' },
  '겁재': { score: 50, keyword: '경쟁', trend: 'down', advice: '지출과 손실에 주의' },
  '식신': { score: 85, keyword: '창조', trend: 'up', advice: '창의적 활동에 좋은 달' },
  '상관': { score: 60, keyword: '표현', trend: 'neutral', advice: '말조심, 감정 조절 필요' },
  '편재': { score: 80, keyword: '횡재', trend: 'up', advice: '투자와 사업 기회' },
  '정재': { score: 90, keyword: '안정', trend: 'up', advice: '꾸준한 노력의 결실' },
  '편관': { score: 55, keyword: '시련', trend: 'down', advice: '스트레스 관리 필요' },
  '정관': { score: 75, keyword: '질서', trend: 'neutral', advice: '원칙을 지키면 좋은 결과' },
  '편인': { score: 65, keyword: '배움', trend: 'neutral', advice: '새로운 것을 배우기 좋은 때' },
  '정인': { score: 85, keyword: '귀인', trend: 'up', advice: '도움을 주는 사람이 나타남' },
};

// 분야별 운세 계산
function getCategoryScores(tenGod: string, monthIndex: number) {
  const baseScores = TEN_GOD_SCORES[tenGod]?.score || 70;
  const seasonModifier = getSeasonModifier(monthIndex);

  return {
    money: Math.min(100, Math.max(20, baseScores + (tenGod === '정재' || tenGod === '편재' ? 15 : tenGod === '겁재' ? -15 : 0) + seasonModifier)),
    love: Math.min(100, Math.max(20, baseScores + (tenGod === '식신' || tenGod === '정인' ? 10 : tenGod === '편관' ? -10 : 0) + Math.floor(seasonModifier / 2))),
    work: Math.min(100, Math.max(20, baseScores + (tenGod === '정관' || tenGod === '정재' ? 15 : tenGod === '상관' ? -10 : 0) + seasonModifier)),
    health: Math.min(100, Math.max(20, baseScores + (tenGod === '정인' || tenGod === '식신' ? 10 : tenGod === '편관' || tenGod === '겁재' ? -15 : 0))),
  };
}

// 계절 보정
function getSeasonModifier(monthIndex: number): number {
  // 봄(3-5): +5, 여름(6-8): 0, 가을(9-11): +5, 겨울(12-2): -5
  if (monthIndex >= 2 && monthIndex <= 4) return 5;
  if (monthIndex >= 8 && monthIndex <= 10) return 5;
  if (monthIndex === 11 || monthIndex === 0 || monthIndex === 1) return -5;
  return 0;
}

// 월별 상세 조언
function getMonthlyAdvice(tenGod: string): string[] {
  const advices: Record<string, string[]> = {
    '비견': ['동료나 친구와 협력하기', '공동 프로젝트 참여', '나눔의 마음 갖기'],
    '겁재': ['지출 줄이기', '무리한 투자 피하기', '인간관계 정리'],
    '식신': ['창작 활동하기', '맛있는 음식 즐기기', '여행이나 취미 활동'],
    '상관': ['감정 표현 조절하기', '새로운 시도해보기', '스트레스 해소'],
    '편재': ['투자 기회 포착하기', '적극적인 영업 활동', '새 사업 구상'],
    '정재': ['저축과 재테크', '계획적 지출', '안정적인 수입 관리'],
    '편관': ['건강 관리하기', '스트레스 줄이기', '무리한 일정 피하기'],
    '정관': ['책임감 있게 행동하기', '공식 업무 처리', '자기 계발'],
    '편인': ['새로운 것 배우기', '자격증 취득', '독서와 공부'],
    '정인': ['어른께 조언 구하기', '감사 표현하기', '따뜻한 관계 유지'],
  };

  return advices[tenGod] || ['차분하게 하루하루 보내기'];
}

export default function MonthlyFortuneResult({ formData, onReset, onBack }: MonthlyFortuneResultProps) {
  const [expandedMonth, setExpandedMonth] = useState<number | null>(null);

  // 사용자의 일주 계산
  const userDayPillar = getDayPillar(formData.year, formData.month, formData.day);
  const userDayStem = userDayPillar.stem;
  const userElement = userDayStem.element;

  // 12개월 운세 계산
  const monthlyFortunes = MONTHLY_STEMS_2025.map((monthStem, index) => {
    const tenGod = getTenGod(userDayStem.ko, monthStem);
    const godInfo = TEN_GOD_SCORES[tenGod] || TEN_GOD_SCORES['비견'];
    const categoryScores = getCategoryScores(tenGod, index);
    const advice = getMonthlyAdvice(tenGod);

    return {
      month: index + 1,
      stem: monthStem,
      tenGod,
      score: godInfo.score,
      keyword: godInfo.keyword,
      trend: godInfo.trend,
      baseAdvice: godInfo.advice,
      categoryScores,
      detailedAdvice: advice,
    };
  });

  // 최고/최저 달 찾기
  const bestMonth = monthlyFortunes.reduce((best, current) => current.score > best.score ? current : best);
  const worstMonth = monthlyFortunes.reduce((worst, current) => current.score < worst.score ? current : worst);

  // 평균 점수
  const avgScore = Math.round(monthlyFortunes.reduce((sum, m) => sum + m.score, 0) / 12);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // 점수 색상
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 70) return 'text-blue-400';
    if (score >= 55) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 85) return 'from-green-500/20 to-emerald-500/20 border-green-500/30';
    if (score >= 70) return 'from-blue-500/20 to-indigo-500/20 border-blue-500/30';
    if (score >= 55) return 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30';
    return 'from-orange-500/20 to-red-500/20 border-orange-500/30';
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-400" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-400" />;
    return <Minus className="w-4 h-4 text-slate-400" />;
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
          <span>메뉴로 돌아가기</span>
        </motion.button>

        {/* 헤더 */}
        <motion.div variants={itemVariants} className="text-center mb-6">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center shadow-lg mb-4">
            <Calendar className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            2025년 월별 운세
          </h1>
          <p className="text-purple-400">{userDayStem.ko}일간 • {userElement} 오행</p>
        </motion.div>

        {/* 연간 요약 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-purple-400" />
            2025년 운세 요약
          </h2>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center p-3 bg-slate-800/50 rounded-xl">
              <div className="text-slate-400 text-xs mb-1">평균 운세</div>
              <div className={`text-2xl font-bold ${getScoreColor(avgScore)}`}>{avgScore}점</div>
            </div>
            <div className="text-center p-3 bg-green-500/10 rounded-xl">
              <div className="text-green-400 text-xs mb-1">최고의 달</div>
              <div className="text-xl font-bold text-green-400">{bestMonth.month}월</div>
              <div className="text-green-300 text-xs">{bestMonth.score}점</div>
            </div>
            <div className="text-center p-3 bg-orange-500/10 rounded-xl">
              <div className="text-orange-400 text-xs mb-1">주의할 달</div>
              <div className="text-xl font-bold text-orange-400">{worstMonth.month}월</div>
              <div className="text-orange-300 text-xs">{worstMonth.score}점</div>
            </div>
          </div>

          {/* 연간 그래프 */}
          <div className="flex items-end justify-between h-24 gap-1 px-2">
            {monthlyFortunes.map((fortune, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div
                  className={`w-full rounded-t transition-all ${
                    fortune.score >= 85 ? 'bg-green-500' :
                    fortune.score >= 70 ? 'bg-blue-500' :
                    fortune.score >= 55 ? 'bg-yellow-500' : 'bg-orange-500'
                  }`}
                  style={{ height: `${fortune.score * 0.8}%` }}
                />
                <span className="text-slate-500 text-xs mt-1">{fortune.month}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 월별 상세 */}
        <motion.div variants={itemVariants} className="space-y-3">
          {monthlyFortunes.map((fortune) => (
            <motion.div
              key={fortune.month}
              className={`bg-gradient-to-br ${getScoreBg(fortune.score)} border rounded-2xl overflow-hidden`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: fortune.month * 0.03 }}
            >
              {/* 헤더 (클릭 가능) */}
              <button
                onClick={() => setExpandedMonth(expandedMonth === fortune.month ? null : fortune.month)}
                className="w-full p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    fortune.score >= 85 ? 'bg-green-500/30' :
                    fortune.score >= 70 ? 'bg-blue-500/30' :
                    fortune.score >= 55 ? 'bg-yellow-500/30' : 'bg-orange-500/30'
                  }`}>
                    <span className="text-lg font-bold text-white">{fortune.month}</span>
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold">{fortune.month}월</span>
                      <span className="text-slate-400 text-sm">({fortune.stem}월)</span>
                      {getTrendIcon(fortune.trend)}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-purple-400 text-sm">{fortune.tenGod}</span>
                      <span className="px-2 py-0.5 bg-slate-700/50 rounded text-xs text-slate-300">#{fortune.keyword}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-2xl font-bold ${getScoreColor(fortune.score)}`}>{fortune.score}</span>
                  {expandedMonth === fortune.month ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </button>

              {/* 상세 내용 */}
              <AnimatePresence>
                {expandedMonth === fortune.month && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-4 pb-4"
                  >
                    {/* 분야별 점수 */}
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      <div className="text-center p-2 bg-slate-800/50 rounded-lg">
                        <Coins className="w-4 h-4 mx-auto text-yellow-400 mb-1" />
                        <div className="text-yellow-400 text-xs">재물</div>
                        <div className="text-white font-bold text-sm">{fortune.categoryScores.money}</div>
                      </div>
                      <div className="text-center p-2 bg-slate-800/50 rounded-lg">
                        <Heart className="w-4 h-4 mx-auto text-pink-400 mb-1" />
                        <div className="text-pink-400 text-xs">애정</div>
                        <div className="text-white font-bold text-sm">{fortune.categoryScores.love}</div>
                      </div>
                      <div className="text-center p-2 bg-slate-800/50 rounded-lg">
                        <Briefcase className="w-4 h-4 mx-auto text-blue-400 mb-1" />
                        <div className="text-blue-400 text-xs">직장</div>
                        <div className="text-white font-bold text-sm">{fortune.categoryScores.work}</div>
                      </div>
                      <div className="text-center p-2 bg-slate-800/50 rounded-lg">
                        <Activity className="w-4 h-4 mx-auto text-green-400 mb-1" />
                        <div className="text-green-400 text-xs">건강</div>
                        <div className="text-white font-bold text-sm">{fortune.categoryScores.health}</div>
                      </div>
                    </div>

                    {/* 조언 */}
                    <div className="bg-slate-800/50 rounded-xl p-3 mb-3">
                      <p className="text-slate-300 text-sm">{fortune.baseAdvice}</p>
                    </div>

                    {/* 상세 조언 */}
                    <div className="space-y-1">
                      <p className="text-slate-400 text-xs mb-2">이달 추천 활동:</p>
                      {fortune.detailedAdvice.map((advice, i) => (
                        <div key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                          <span className="text-purple-400">•</span>
                          {advice}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* 버튼 */}
        <motion.div variants={itemVariants} className="mt-6 space-y-3">
          <button
            onClick={onReset}
            className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl text-white font-bold text-lg hover:from-indigo-600 hover:to-purple-700 transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <RefreshCw className="w-5 h-5" />
            다시 보기
          </button>
          <button
            onClick={onBack}
            className="w-full py-3 bg-slate-700/50 rounded-2xl text-slate-300 font-medium hover:bg-slate-700 transition-all"
          >
            메인으로 돌아가기
          </button>
        </motion.div>

        {/* 안내 */}
        <motion.p variants={itemVariants} className="text-slate-500 text-xs text-center mt-6">
          일간 오행과 2025년 월별 천간의 관계를 분석한 운세입니다.<br />
          재미로 봐주시고, 좋은 한 해 되세요!
        </motion.p>
      </div>
    </motion.div>
  );
}
