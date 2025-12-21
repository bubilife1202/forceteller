'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Calendar, Clock, Sun, Moon } from 'lucide-react';

interface MovingTimingProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function MovingTiming({ result, name }: MovingTimingProps) {
  const dayElement = result.day.stem.element;
  const { 재성, 식상 } = result.tenGodsCount;

  // 월별 이사 적기 분석
  const getMonthlyAnalysis = () => {
    const months = [
      { month: 1, name: '1월 (정월)', element: '토', season: '겨울' },
      { month: 2, name: '2월', element: '목', season: '봄' },
      { month: 3, name: '3월', element: '목', season: '봄' },
      { month: 4, name: '4월', element: '목', season: '봄' },
      { month: 5, name: '5월', element: '화', season: '여름' },
      { month: 6, name: '6월', element: '화', season: '여름' },
      { month: 7, name: '7월', element: '토', season: '여름' },
      { month: 8, name: '8월', element: '금', season: '가을' },
      { month: 9, name: '9월', element: '금', season: '가을' },
      { month: 10, name: '10월', element: '토', season: '가을' },
      { month: 11, name: '11월', element: '수', season: '겨울' },
      { month: 12, name: '12월', element: '수', season: '겨울' },
    ];

    return months.map(m => {
      let score = 50;

      // 오행 상생 관계
      if (m.element === dayElement) {
        score += 10;
      } else if (
        (dayElement === '목' && m.element === '수') ||
        (dayElement === '화' && m.element === '목') ||
        (dayElement === '토' && m.element === '화') ||
        (dayElement === '금' && m.element === '토') ||
        (dayElement === '수' && m.element === '금')
      ) {
        score += 20;
      } else if (
        (dayElement === '목' && m.element === '금') ||
        (dayElement === '화' && m.element === '수') ||
        (dayElement === '토' && m.element === '목') ||
        (dayElement === '금' && m.element === '화') ||
        (dayElement === '수' && m.element === '토')
      ) {
        score -= 15;
      }

      // 용신 관계
      if (m.element === result.yongsin) {
        score += 15;
      }

      const finalScore = Math.min(Math.max(score, 20), 100);

      let rating = '';
      let emoji = '';
      if (finalScore >= 75) {
        rating = '최적기';
        emoji = '🌟';
      } else if (finalScore >= 60) {
        rating = '적기';
        emoji = '✨';
      } else if (finalScore >= 45) {
        rating = '보통';
        emoji = '🔆';
      } else {
        rating = '주의';
        emoji = '⚠️';
      }

      return {
        ...m,
        score: finalScore,
        rating,
        emoji,
      };
    });
  };

  const monthlyAnalysis = getMonthlyAnalysis();
  const bestMonths = monthlyAnalysis.filter(m => m.score >= 75);
  const goodMonths = monthlyAnalysis.filter(m => m.score >= 60 && m.score < 75);

  // 사계절별 종합
  const getSeasonalSummary = () => {
    return [
      {
        season: '봄 (2-4월)',
        element: '목',
        icon: '🌸',
        color: 'from-green-500 to-emerald-600',
        advice: dayElement === '목' ? '같은 목 기운으로 성장과 확장에 유리' :
                dayElement === '화' ? '목생화로 최고의 이사 시기' :
                dayElement === '수' ? '수생목으로 좋은 시기' :
                dayElement === '토' ? '목극토로 신중하게 접근' :
                '봄의 생기가 새로운 시작을 돕습니다',
      },
      {
        season: '여름 (5-7월)',
        element: '화',
        icon: '☀️',
        color: 'from-red-500 to-orange-600',
        advice: dayElement === '화' ? '왕성한 화 기운으로 적극적 이사 가능' :
                dayElement === '토' ? '화생토로 최고의 이사 시기' :
                dayElement === '목' ? '목생화로 에너지 넘치는 이사' :
                dayElement === '금' ? '화극금으로 주의 필요' :
                '활기찬 여름 기운을 활용하세요',
      },
      {
        season: '가을 (8-10월)',
        element: '금',
        icon: '🍂',
        color: 'from-yellow-500 to-amber-600',
        advice: dayElement === '금' ? '왕성한 금 기운으로 안정적 이사' :
                dayElement === '수' ? '금생수로 최고의 이사 시기' :
                dayElement === '토' ? '토생금으로 풍요로운 이사' :
                dayElement === '목' ? '금극목으로 신중 필요' :
                '결실의 계절, 안정적인 이사',
      },
      {
        season: '겨울 (11-1월)',
        element: '수',
        icon: '❄️',
        color: 'from-blue-500 to-cyan-600',
        advice: dayElement === '수' ? '강한 수 기운으로 빠른 이사 가능' :
                dayElement === '목' ? '수생목으로 최고의 준비 시기' :
                dayElement === '금' ? '금생수로 차분한 이사' :
                dayElement === '토' ? '토극수로 주의 필요' :
                '침착하게 계획하는 이사',
      },
    ];
  };

  const seasonalSummary = getSeasonalSummary();

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
        📅 이사 적기 분석
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님의 월별/계절별 최적 이사 타이밍
      </p>

      {/* 최적 이사 시기 요약 */}
      <div className="glass rounded-2xl p-6 mb-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30">
        <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
          <Calendar className="w-6 h-6" />
          추천 이사 시기
        </h3>
        {bestMonths.length > 0 ? (
          <>
            <div className="flex flex-wrap gap-3 mb-4 justify-center">
              {bestMonths.map((m, index) => (
                <motion.div
                  key={m.month}
                  className="px-5 py-3 rounded-full bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <p className="text-emerald-400 font-bold flex items-center gap-2">
                    <span>{m.emoji}</span>
                    <span>{m.name}</span>
                  </p>
                </motion.div>
              ))}
            </div>
            <p className="text-slate-300 text-center">위 시기가 이사에 가장 좋습니다</p>
          </>
        ) : (
          <p className="text-slate-300 text-center">전반적으로 신중한 계획이 필요한 해입니다</p>
        )}
      </div>

      {/* 월별 상세 분석 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
          <Clock className="w-6 h-6" />
          월별 이사운 캘린더
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {monthlyAnalysis.map((m, index) => (
            <motion.div
              key={m.month}
              className={`p-4 rounded-xl text-center ${
                m.score >= 75 ? 'bg-emerald-500/20 border border-emerald-500/40' :
                m.score >= 60 ? 'bg-green-500/20 border border-green-500/40' :
                m.score >= 45 ? 'bg-slate-700/50 border border-slate-600' :
                'bg-orange-500/20 border border-orange-500/40'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <p className="text-2xl mb-1">{m.emoji}</p>
              <p className="font-bold text-white mb-1">{m.month}월</p>
              <p className="text-sm text-slate-400 mb-2">{m.element}</p>
              <p className={`text-lg font-bold ${
                m.score >= 75 ? 'text-emerald-400' :
                m.score >= 60 ? 'text-green-400' :
                m.score >= 45 ? 'text-yellow-400' :
                'text-orange-400'
              }`}>{m.rating}</p>
              <p className="text-xs text-slate-500 mt-1">{m.score}점</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 계절별 종합 */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold text-amber-400 mb-6 flex items-center gap-2">
          <Sun className="w-6 h-6" />
          사계절 이사운 분석
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {seasonalSummary.map((s, index) => (
            <motion.div
              key={s.season}
              className="glass-strong rounded-xl p-5"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-2xl`}>
                  {s.icon}
                </div>
                <div>
                  <h4 className="font-bold text-white">{s.season}</h4>
                  <p className="text-sm text-slate-400">{s.element} 기운</p>
                </div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{s.advice}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl">
          <p className="text-slate-300 text-sm leading-relaxed">
            💡 <span className="font-bold">이사 일진 선택:</span> 월 선택 후 택일력을 참고하여 이사 길일을 정하면 더욱 좋습니다.
            손없는 날, 대길일을 함께 고려하세요.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
