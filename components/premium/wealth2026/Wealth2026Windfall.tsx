'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Ticket, Gift, Sparkles, Star, Zap, PartyPopper } from 'lucide-react';

interface Wealth2026WindfallProps {
  result: SajuResult;
  name: string;
  baseScore: number;
}

export default function Wealth2026Windfall({ result, name, baseScore }: Wealth2026WindfallProps) {
  const dayElement = result.day.stem.element;
  const { 재성, 식상, 비겁 } = result.tenGodsCount;

  // 횡재운 계산
  const getWindfallScore = () => {
    let score = baseScore - 10; // 횡재는 기본적으로 어려움

    // 편재가 있으면 횡재운 상승
    if (재성 >= 2) score += 20;
    if (재성 >= 1) score += 10;

    // 식상이 있으면 기회 포착력
    if (식상 >= 2) score += 10;

    // 일간별 병오년 횡재운
    if (dayElement === '토') score += 15; // 화생토로 횡재 기회
    if (dayElement === '화') score += 10; // 비겁운 경쟁에서 승리
    if (dayElement === '목') score += 5;
    if (dayElement === '금') score -= 15; // 화극금으로 어려움
    if (dayElement === '수') score += 5;

    // 비겁이 많으면 경쟁으로 손실
    if (비겁 >= 3) score -= 10;

    return Math.min(Math.max(score, 10), 100);
  };

  // 복권운 계산
  const getLotteryScore = () => {
    let score = getWindfallScore() - 20; // 복권은 더 어려움

    if (dayElement === '화') score += 10; // 화기 강한 해에 화 일간 유리
    if (식상 >= 2) score += 10; // 직감

    return Math.min(Math.max(score, 5), 100);
  };

  // 경품운 계산
  const getPrizeScore = () => {
    let score = getWindfallScore();

    if (식상 >= 2) score += 15; // 참여력
    if (dayElement === '목' || dayElement === '화') score += 10; // 활동성

    return Math.min(Math.max(score, 20), 100);
  };

  // 뜻밖의 재물운
  const getUnexpectedScore = () => {
    let score = getWindfallScore();

    if (result.shinsals.some(s => s.type === 'good')) score += 15;
    if (dayElement === '토') score += 10;

    return Math.min(Math.max(score, 20), 100);
  };

  const windfallScore = getWindfallScore();
  const lotteryScore = getLotteryScore();
  const prizeScore = getPrizeScore();
  const unexpectedScore = getUnexpectedScore();

  // 횡재운 등급
  const getWindfallGrade = () => {
    if (windfallScore >= 70) return { grade: '대길', emoji: '🎉', message: '올해 뜻밖의 재물이 들어올 가능성이 높습니다!' };
    if (windfallScore >= 50) return { grade: '길', emoji: '✨', message: '작은 횡재의 기회가 있습니다. 기회를 놓치지 마세요.' };
    if (windfallScore >= 30) return { grade: '보통', emoji: '💫', message: '큰 횡재보다는 꾸준한 노력이 필요한 해입니다.' };
    return { grade: '소길', emoji: '🍀', message: '횡재보다 정당한 수입에 집중하세요.' };
  };

  const windfallGrade = getWindfallGrade();

  // 행운의 시기
  const getLuckyPeriods = () => {
    const periods = [];

    if (dayElement === '토' || dayElement === '화') {
      periods.push({ month: '5월', reason: '화 기운 최고조' });
      periods.push({ month: '6월', reason: '오월(午月)과 병오년 시너지' });
    }
    if (dayElement === '목') {
      periods.push({ month: '3월', reason: '목 기운 왕성' });
      periods.push({ month: '4월', reason: '봄 기운 상승' });
    }
    if (dayElement === '금') {
      periods.push({ month: '8월', reason: '금 기운 보강' });
      periods.push({ month: '9월', reason: '가을 기운 도움' });
    }
    if (dayElement === '수') {
      periods.push({ month: '11월', reason: '수 기운 상승' });
      periods.push({ month: '12월', reason: '겨울 기운 도움' });
    }

    if (periods.length === 0) {
      periods.push({ month: '5월', reason: '병오년 화 기운' });
      periods.push({ month: '10월', reason: '변화의 시기' });
    }

    return periods;
  };

  const luckyPeriods = getLuckyPeriods();

  // 행운의 숫자
  const getLuckyNumbers = () => {
    const baseNumbers: Record<string, number[]> = {
      목: [3, 8, 13, 38],
      화: [2, 7, 12, 27],
      토: [5, 10, 15, 50],
      금: [4, 9, 14, 49],
      수: [1, 6, 11, 16],
    };
    return baseNumbers[dayElement] || [7, 14, 21, 28];
  };

  const luckyNumbers = getLuckyNumbers();

  const categories = [
    {
      icon: Ticket,
      name: '복권운',
      score: lotteryScore,
      color: 'from-red-500 to-pink-600',
      textColor: 'text-red-400',
      advice: lotteryScore >= 50
        ? '가끔 소액으로 도전해 볼 만합니다.'
        : '복권보다 다른 재테크에 집중하세요.',
    },
    {
      icon: Gift,
      name: '경품운',
      score: prizeScore,
      color: 'from-purple-500 to-indigo-600',
      textColor: 'text-purple-400',
      advice: prizeScore >= 50
        ? '이벤트, 경품 행사에 적극 참여하세요!'
        : '큰 기대보다 재미로 참여하세요.',
    },
    {
      icon: Sparkles,
      name: '뜻밖의 재물',
      score: unexpectedScore,
      color: 'from-amber-500 to-yellow-600',
      textColor: 'text-amber-400',
      advice: unexpectedScore >= 50
        ? '예상치 못한 곳에서 재물이 들어올 수 있습니다.'
        : '주변 인맥을 잘 관리하세요.',
    },
  ];

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2
        className="text-3xl font-bold text-center mb-4 gradient-text"
        style={{ fontFamily: "'Noto Serif KR', serif" }}
      >
        🎰 횡재운 분석
      </h2>
      <p className="text-center text-slate-400 mb-8">
        2026년 {name}님의 뜻밖의 재물운
      </p>

      {/* 횡재운 총괄 */}
      <motion.div
        className="glass rounded-2xl p-8 mb-8 text-center bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/30"
        initial={{ scale: 0.9 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
      >
        <span className="text-6xl mb-4 block">{windfallGrade.emoji}</span>
        <h3 className="text-2xl font-bold text-amber-400 mb-2">
          횡재운: {windfallGrade.grade}
        </h3>
        <div className="flex justify-center items-center gap-2 mb-4">
          <span className="text-5xl font-bold text-white">{windfallScore}</span>
          <span className="text-slate-400">/ 100점</span>
        </div>
        <p className="text-slate-300">{windfallGrade.message}</p>

        {/* 횡재운 게이지 */}
        <div className="mt-6 max-w-md mx-auto">
          <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-500 to-amber-500"
              initial={{ width: 0 }}
              whileInView={{ width: `${windfallScore}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
            />
          </div>
        </div>
      </motion.div>

      {/* 세부 횡재운 */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.name}
            className="glass rounded-xl p-5 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mx-auto mb-3`}>
              <cat.icon className="w-7 h-7 text-white" />
            </div>
            <h4 className="font-bold text-white mb-1">{cat.name}</h4>
            <p className={`text-3xl font-bold ${cat.textColor} mb-2`}>{cat.score}점</p>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-3">
              <motion.div
                className={`h-full bg-gradient-to-r ${cat.color}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${cat.score}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </div>
            <p className="text-slate-400 text-sm">{cat.advice}</p>
          </motion.div>
        ))}
      </div>

      {/* 행운의 시기와 숫자 */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-6">
          <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
            <Star className="w-6 h-6" />
            횡재운 최고의 시기
          </h3>
          <div className="space-y-3">
            {luckyPeriods.map((period, index) => (
              <motion.div
                key={period.month}
                className="flex items-center gap-3 bg-slate-800/50 rounded-lg p-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Zap className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="text-white font-medium">{period.month}</p>
                  <p className="text-slate-400 text-sm">{period.reason}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
            <PartyPopper className="w-6 h-6" />
            행운의 숫자
          </h3>
          <div className="flex flex-wrap gap-3 mb-4">
            {luckyNumbers.map((num, index) => (
              <motion.div
                key={num}
                className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: 'spring' }}
              >
                <span className="text-xl font-bold text-white">{num}</span>
              </motion.div>
            ))}
          </div>
          <p className="text-slate-400 text-sm">
            {dayElement} 오행 기반 행운의 숫자입니다. 복권, 경품 응모 등에 활용해보세요.
          </p>
        </div>
      </div>

      {/* 주의사항 */}
      <div className="mt-6 glass rounded-xl p-5 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30">
        <h4 className="font-bold text-orange-400 mb-3">⚠️ 횡재운 주의사항</h4>
        <ul className="space-y-2 text-slate-300 text-sm">
          <li>• 횡재를 기대하며 무리한 도박은 절대 금물입니다.</li>
          <li>• 복권은 소액으로 재미 삼아만 구매하세요.</li>
          <li>• 주변의 달콤한 투자 제안은 특히 경계하세요.</li>
          <li>• 뜻밖의 행운이 와도 겸손하게 관리하세요.</li>
        </ul>
      </div>
    </motion.div>
  );
}
