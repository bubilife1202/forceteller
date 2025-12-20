'use client';

import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, RefreshCw, Star, TrendingUp, TrendingDown, Coins, Heart, Briefcase, Activity, Sparkles, Sun, Moon, Clock, Lightbulb, AlertTriangle, CheckCircle, Compass, Palette, Hash, Utensils, Target, Quote, Flame, Droplets, Leaf, Mountain, Zap, Download, Mail, Home, Share2 } from 'lucide-react';
import { getDayPillar, getTenGod } from '@/lib/saju-calculator';
import { MonthlyFortuneFormData } from './MonthlyFortuneForm';
import { downloadAsHtml, sendByEmail, createSectionHtml, createScoreBadgeHtml, createProgressBarHtml, createGridHtml, createCardHtml, createListHtml, createMessageBoxHtml } from '@/lib/utils/export-utils';
import { shareToKakao } from '@/lib/utils/kakao-share';
import {
  MONTHLY_STEMS_2026,
  TEN_GOD_DETAILS,
  getSeasonInfo,
  TEN_GOD_WEEKLY,
  ELEMENT_LUCKY_ITEMS,
  TEN_GOD_MANTRAS,
  ELEMENT_MONTHLY_ADVICE,
  DAILY_FORTUNE_CYCLE,
  TEN_GOD_MONTHLY_GOALS,
} from '@/lib/data/monthly-fortune-data';

interface MonthlyFortuneResultProps {
  formData: MonthlyFortuneFormData;
  onReset: () => void;
  onBack: () => void;
  onHome?: () => void;
}

export default function MonthlyFortuneResult({ formData, onReset, onBack, onHome }: MonthlyFortuneResultProps) {
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

  // 추가 데이터 가져오기
  const weeklyFortune = TEN_GOD_WEEKLY[tenGod] || TEN_GOD_WEEKLY['비견'];
  const luckyItems = ELEMENT_LUCKY_ITEMS[userElement] || ELEMENT_LUCKY_ITEMS['목'];
  const mantras = TEN_GOD_MANTRAS[tenGod] || TEN_GOD_MANTRAS['비견'];
  const elementAdvice = ELEMENT_MONTHLY_ADVICE[userElement] || ELEMENT_MONTHLY_ADVICE['목'];
  const monthlyGoals = TEN_GOD_MONTHLY_GOALS[tenGod] || TEN_GOD_MONTHLY_GOALS['비견'];

  // 오행 아이콘 가져오기
  const getElementIcon = (element: string) => {
    switch (element) {
      case '목': return <Leaf className="w-5 h-5 text-green-400" />;
      case '화': return <Flame className="w-5 h-5 text-red-400" />;
      case '토': return <Mountain className="w-5 h-5 text-yellow-400" />;
      case '금': return <Zap className="w-5 h-5 text-gray-300" />;
      case '수': return <Droplets className="w-5 h-5 text-blue-400" />;
      default: return <Star className="w-5 h-5 text-purple-400" />;
    }
  };

  // HTML 다운로드 함수 - 전체 내용 포함
  const handleDownloadHtml = () => {
    const headerHtml = `
      <div class="header">
        <h1>📅 2026년 ${targetMonth}월 운세</h1>
        <p>${userDayStem.ko}일간 (${userElement} 오행) • ${tenGod}의 달</p>
      </div>
    `;

    const scoreHtml = createSectionHtml('종합 운세', `
      ${createScoreBadgeHtml(finalScore)}
      <p style="text-align: center; color: #a78bfa; margin-top: 12px;">이달의 키워드: #${fortune.keyword}</p>
      <p style="text-align: center; margin-top: 12px; font-size: 1.1rem;">${fortune.summary}</p>
      <p style="text-align: center; margin-top: 16px; color: #fbbf24; font-weight: bold;">"${fortune.advice}"</p>
    `, '⭐');

    // 분야별 상세 운세
    const categoryDetailHtml = createSectionHtml('분야별 상세 운세', `
      <div style="margin-bottom: 24px;">
        <h3 style="color: #fbbf24; margin-bottom: 8px;">💰 재물운 (${fortune.money.score}점)</h3>
        <p style="margin-bottom: 8px;">${fortune.money.detail}</p>
        <p style="color: #4ade80; font-size: 0.9rem;">💡 실천: ${fortune.money.action.join(', ')}</p>
      </div>
      <div style="margin-bottom: 24px;">
        <h3 style="color: #f472b6; margin-bottom: 8px;">💕 애정운 (${fortune.love.score}점)</h3>
        <p style="margin-bottom: 8px;">${fortune.love.detail}</p>
        <p style="color: #4ade80; font-size: 0.9rem;">💡 실천: ${fortune.love.action.join(', ')}</p>
      </div>
      <div style="margin-bottom: 24px;">
        <h3 style="color: #60a5fa; margin-bottom: 8px;">💼 직장운 (${fortune.work.score}점)</h3>
        <p style="margin-bottom: 8px;">${fortune.work.detail}</p>
        <p style="color: #4ade80; font-size: 0.9rem;">💡 실천: ${fortune.work.action.join(', ')}</p>
      </div>
      <div>
        <h3 style="color: #4ade80; margin-bottom: 8px;">🏃 건강운 (${fortune.health.score}점)</h3>
        <p style="margin-bottom: 8px;">${fortune.health.detail}</p>
        <p style="color: #4ade80; font-size: 0.9rem;">💡 실천: ${fortune.health.action.join(', ')}</p>
      </div>
    `, '📊');

    const weeklyHtml = createSectionHtml('주간별 운세', `
      <div style="display: grid; gap: 12px;">
        ${Object.entries(weeklyFortune).map(([key, data]) => `
          <div style="background: rgba(255,255,255,0.05); padding: 16px; border-radius: 12px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="color: #a78bfa; font-weight: bold;">${key === 'week1' ? '1주차 (1~7일)' : key === 'week2' ? '2주차 (8~14일)' : key === 'week3' ? '3주차 (15~21일)' : '4주차 (22~말일)'}</span>
              <span style="font-weight: bold; color: ${data.score >= 70 ? '#4ade80' : data.score >= 50 ? '#fbbf24' : '#f87171'};">${data.score}점</span>
            </div>
            <p style="color: #fbbf24; font-size: 0.9rem; margin-bottom: 8px;">#${data.theme}</p>
            <p style="font-size: 0.9rem; color: #e2e8f0;">${data.tip}</p>
          </div>
        `).join('')}
      </div>
    `, '📆');

    const doHtml = createSectionHtml('이달 하면 좋은 일', createListHtml(fortune.doList, 'check'), '✅');
    const dontHtml = createSectionHtml('이달 피해야 할 일', createListHtml(fortune.dontList, 'cross'), '⚠️');

    const goalHtml = createSectionHtml('이달의 목표', `
      <div style="background: linear-gradient(135deg, rgba(34,197,94,0.2), rgba(16,185,129,0.3)); padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 16px; border: 1px solid rgba(34,197,94,0.3);">
        <p style="color: #4ade80; font-weight: bold; font-size: 1.2rem;">🎯 "${monthlyGoals.mainGoal}"</p>
      </div>
      <h4 style="color: #a78bfa; margin-bottom: 12px;">세부 목표:</h4>
      ${createListHtml(monthlyGoals.subGoals, 'check')}
    `, '🎯');

    const luckyHtml = createSectionHtml('행운 아이템', createGridHtml([
      createCardHtml('행운의 색', luckyItems.colors.join(', '), '🎨'),
      createCardHtml('행운의 숫자', luckyItems.numbers.join(', '), '🔢'),
      createCardHtml('행운의 방향', luckyItems.directions.join(', '), '🧭'),
      createCardHtml('추천 활동', luckyItems.activities.join(', '), '⭐'),
    ]), '✨');

    const messageHtml = createSectionHtml('이달의 명언', `
      ${mantras.map(m => `<p style="text-align: center; margin: 16px 0; font-style: italic; font-size: 1.1rem; color: #e2e8f0;">"${m}"</p>`).join('')}
    `, '💬');

    const fullHtml = headerHtml + scoreHtml + categoryDetailHtml + weeklyHtml + doHtml + dontHtml + goalHtml + luckyHtml + messageHtml;
    downloadAsHtml(fullHtml, `월간운세_2026년_${targetMonth}월_${userDayStem.ko}일간`);
  };

  // 이메일 전송 함수
  const handleSendEmail = () => {
    const subject = `[ForceTeller] 2026년 ${targetMonth}월 운세 - ${userDayStem.ko}일간`;
    const body = `
━━━━━━━━━━━━━━━━━━━━
📅 2026년 ${targetMonth}월 운세
${userDayStem.ko}일간 • ${userElement} 오행 • ${tenGod}의 달
━━━━━━━━━━━━━━━━━━━━

⭐ 종합 운세: ${finalScore}점
키워드: #${fortune.keyword}

${fortune.summary}

━━ 분야별 운세 ━━
💰 재물운: ${fortune.money.score}점
💕 애정운: ${fortune.love.score}점
💼 직장운: ${fortune.work.score}점
🏃 건강운: ${fortune.health.score}점

━━ 주간별 운세 ━━
1주차: ${weeklyFortune.week1.score}점 #${weeklyFortune.week1.theme}
2주차: ${weeklyFortune.week2.score}점 #${weeklyFortune.week2.theme}
3주차: ${weeklyFortune.week3.score}점 #${weeklyFortune.week3.theme}
4주차: ${weeklyFortune.week4.score}점 #${weeklyFortune.week4.theme}

━━ 이달 하면 좋은 일 ━━
${fortune.doList.map(item => `✓ ${item}`).join('\n')}

━━ 이달 피해야 할 일 ━━
${fortune.dontList.map(item => `✗ ${item}`).join('\n')}

━━ 이달의 목표 ━━
"${monthlyGoals.mainGoal}"
${monthlyGoals.subGoals.map(goal => `• ${goal}`).join('\n')}

━━ 행운 아이템 ━━
🎨 행운의 색: ${luckyItems.colors.slice(0, 2).join(', ')}
🔢 행운의 숫자: ${luckyItems.numbers.slice(0, 3).join(', ')}
🧭 행운의 방향: ${luckyItems.directions.join(', ')}

━━ 이달의 명언 ━━
${mantras.map(m => `"${m}"`).join('\n')}

━━━━━━━━━━━━━━━━━━━━
ForceTeller - AI 운세 서비스
    `.trim();

    sendByEmail(subject, body);
  };

  const handleKakaoShare = () => {
    shareToKakao({
      title: `📅 2026년 ${targetMonth}월 운세`,
      description: `${userDayStem.ko}일간 | 종합 운세 ${finalScore}점 | ${fortune.keyword}`,
    });
  };

  // 홈으로 이동
  const handleGoHome = () => {
    if (onHome) {
      onHome();
    } else {
      onBack();
    }
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

        {/* 주간별 운세 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-5 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-400" />
            {targetMonth}월 주간별 운세
          </h2>
          <div className="space-y-3">
            {[
              { week: '1주차', data: weeklyFortune.week1 },
              { week: '2주차', data: weeklyFortune.week2 },
              { week: '3주차', data: weeklyFortune.week3 },
              { week: '4주차', data: weeklyFortune.week4 },
            ].map(({ week, data }, i) => (
              <div key={i} className="bg-slate-800/50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-indigo-300 font-medium">{week}</span>
                    <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 text-xs rounded-full">
                      #{data.theme}
                    </span>
                  </div>
                  <span className={`font-bold ${getScoreColor(data.score).text}`}>{data.score}점</span>
                </div>
                <ProgressBar score={data.score} color={getScoreColor(data.score).fill} />
                <p className="text-slate-400 text-sm mt-2">{data.tip}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 이달의 목표 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-5 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-400" />
            이달의 목표
          </h2>
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mb-4">
            <p className="text-emerald-300 text-lg font-bold text-center">
              &ldquo;{monthlyGoals.mainGoal}&rdquo;
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-slate-800/50 rounded-xl p-4">
              <h4 className="text-emerald-400 font-medium text-sm mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                달성 목표
              </h4>
              <ul className="space-y-1">
                {monthlyGoals.subGoals.map((goal, i) => (
                  <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                    <span className="text-emerald-400">•</span>
                    {goal}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4">
              <h4 className="text-red-400 font-medium text-sm mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                주의 사항
              </h4>
              <ul className="space-y-1">
                {monthlyGoals.avoidGoals.map((goal, i) => (
                  <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    {goal}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* 행운 아이템 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-5 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            {getElementIcon(userElement)}
            {userElement} 오행 행운 아이템
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {/* 행운 색상 */}
            <div className="bg-slate-800/50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Palette className="w-4 h-4 text-pink-400" />
                <span className="text-pink-400 font-medium text-sm">행운 색상</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {luckyItems.colors.slice(0, 3).map((color, i) => (
                  <span key={i} className="px-2 py-1 bg-pink-500/20 text-pink-300 text-xs rounded-full">
                    {color}
                  </span>
                ))}
              </div>
            </div>

            {/* 행운 숫자 */}
            <div className="bg-slate-800/50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Hash className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 font-medium text-sm">행운 숫자</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {luckyItems.numbers.slice(0, 4).map((num, i) => (
                  <span key={i} className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full">
                    {num}
                  </span>
                ))}
              </div>
            </div>

            {/* 행운 방향 */}
            <div className="bg-slate-800/50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Compass className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-400 font-medium text-sm">행운 방향</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {luckyItems.directions.map((dir, i) => (
                  <span key={i} className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full">
                    {dir}
                  </span>
                ))}
              </div>
            </div>

            {/* 행운 음식 */}
            <div className="bg-slate-800/50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Utensils className="w-4 h-4 text-orange-400" />
                <span className="text-orange-400 font-medium text-sm">행운 음식</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {luckyItems.foods.slice(0, 3).map((food, i) => (
                  <span key={i} className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-full">
                    {food}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 추천 활동 */}
          <div className="mt-4 bg-slate-800/50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-violet-400 font-medium text-sm">추천 활동</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {luckyItems.activities.map((activity, i) => (
                <span key={i} className="px-3 py-1 bg-violet-500/20 text-violet-300 text-sm rounded-full">
                  {activity}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 오행별 상세 조언 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-5 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            {getElementIcon(userElement)}
            {userElement} 오행 {targetMonth}월 심화 조언
          </h2>
          <div className="space-y-4">
            {/* 건강 */}
            <div className="bg-green-500/10 rounded-xl p-4">
              <h4 className="text-green-400 font-medium text-sm mb-2 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                건강 관리
              </h4>
              <ul className="space-y-1">
                {elementAdvice.health.map((advice, i) => (
                  <li key={i} className="text-slate-300 text-sm">• {advice}</li>
                ))}
              </ul>
            </div>

            {/* 인간관계 */}
            <div className="bg-pink-500/10 rounded-xl p-4">
              <h4 className="text-pink-400 font-medium text-sm mb-2 flex items-center gap-2">
                <Heart className="w-4 h-4" />
                인간관계
              </h4>
              <ul className="space-y-1">
                {elementAdvice.relationship.map((advice, i) => (
                  <li key={i} className="text-slate-300 text-sm">• {advice}</li>
                ))}
              </ul>
            </div>

            {/* 직장/경력 */}
            <div className="bg-blue-500/10 rounded-xl p-4">
              <h4 className="text-blue-400 font-medium text-sm mb-2 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                직장/경력
              </h4>
              <ul className="space-y-1">
                {elementAdvice.career.map((advice, i) => (
                  <li key={i} className="text-slate-300 text-sm">• {advice}</li>
                ))}
              </ul>
            </div>

            {/* 마인드셋 */}
            <div className="bg-purple-500/10 rounded-xl p-4">
              <h4 className="text-purple-400 font-medium text-sm mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                마음가짐
              </h4>
              <ul className="space-y-1">
                {elementAdvice.mindset.map((advice, i) => (
                  <li key={i} className="text-slate-300 text-sm">• {advice}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* 일별 운세 흐름 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-5 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-400" />
            일별 운세 흐름 (10일 주기)
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {DAILY_FORTUNE_CYCLE.map((item, i) => (
              <div key={i} className="bg-slate-800/50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-amber-300 font-medium text-sm">{item.day}</span>
                  <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 text-xs rounded-full">
                    {item.theme}
                  </span>
                </div>
                <p className="text-slate-400 text-xs">{item.tip}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 이달의 명언 */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-3xl p-6 mb-6"
        >
          <h2 className="text-lg font-bold text-amber-300 mb-4 flex items-center gap-2">
            <Quote className="w-5 h-5" />
            이달의 명언
          </h2>
          <div className="space-y-4">
            {mantras.map((mantra, i) => (
              <p key={i} className="text-white text-center leading-relaxed" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                &ldquo;{mantra}&rdquo;
              </p>
            ))}
          </div>
        </motion.div>

        {/* 내보내기 버튼 */}
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
            className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl text-white font-bold text-lg hover:from-indigo-600 hover:to-purple-700 transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <RefreshCw className="w-5 h-5" />
            다른 달 보기
          </button>

          <button
            onClick={handleGoHome}
            className="w-full py-3 bg-slate-700/50 rounded-2xl text-slate-300 font-medium hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            홈으로
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
