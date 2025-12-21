'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Calendar, Clock, TrendingUp, AlertCircle } from 'lucide-react';

interface ChildrenTimingProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function ChildrenTiming({ result, name, birthDate }: ChildrenTimingProps) {
  const dayElement = result.day.stem.element;
  const { 식상, 관성, 재성 } = result.tenGodsCount;
  const currentAge = birthDate ? new Date().getFullYear() - birthDate.getFullYear() + 1 : 30;

  // 최적 출산 적기 계산
  const getOptimalAge = () => {
    // 일간별 최적 시기
    const baseAges = {
      목: { early: [26, 28], mid: [30, 32], late: [34, 36] },
      화: { early: [25, 27], mid: [29, 31], late: [33, 35] },
      토: { early: [28, 30], mid: [32, 34], late: [36, 38] },
      금: { early: [27, 29], mid: [31, 33], late: [35, 37] },
      수: { early: [26, 28], mid: [30, 32], late: [34, 36] },
    };

    return baseAges[dayElement] || baseAges.목;
  };

  const optimalAges = getOptimalAge();

  const getTimingAdvice = () => {
    if (currentAge < 25) {
      return {
        period: '준비기',
        message: '아직 시간적 여유가 충분합니다. 경제적, 정서적 안정을 먼저 다지세요.',
        color: 'text-blue-400',
        icon: '📚',
      };
    }
    if (currentAge >= 25 && currentAge < 30) {
      return {
        period: '적기 시작',
        message: '출산을 고려하기 좋은 시기입니다. 건강과 커리어를 균형 있게 준비하세요.',
        color: 'text-green-400',
        icon: '🌱',
      };
    }
    if (currentAge >= 30 && currentAge < 35) {
      return {
        period: '최적기',
        message: '경제적, 정서적으로 안정된 시기입니다. 출산에 가장 적합한 나이입니다.',
        color: 'text-emerald-400',
        icon: '🌟',
      };
    }
    if (currentAge >= 35 && currentAge < 40) {
      return {
        period: '늦은 적기',
        message: '아직 충분히 가능합니다. 건강 관리와 의학적 조언을 병행하세요.',
        color: 'text-yellow-400',
        icon: '⚡',
      };
    }
    return {
      period: '신중 고려',
      message: '전문가와 상담 후 결정하는 것을 권장합니다.',
      color: 'text-orange-400',
      icon: '💭',
    };
  };

  const timingAdvice = getTimingAdvice();

  // 대운 분석
  const getLuckPeriods = () => {
    return [
      {
        year: '2025',
        element: '을사',
        score: dayElement === '토' ? 90 : dayElement === '화' ? 85 : 70,
        advice: '출산 운이 좋은 해입니다.',
      },
      {
        year: '2026',
        element: '병오',
        score: dayElement === '토' ? 95 : dayElement === '화' ? 80 : 75,
        advice: '화 기운이 강해 자녀 복이 큽니다.',
      },
      {
        year: '2027',
        element: '정미',
        score: dayElement === '금' ? 90 : dayElement === '토' ? 88 : 72,
        advice: '안정적인 출산 시기입니다.',
      },
      {
        year: '2028',
        element: '무신',
        score: dayElement === '금' ? 92 : dayElement === '토' ? 85 : 70,
        advice: '금 기운으로 건강한 출산.',
      },
    ];
  };

  const luckPeriods = getLuckPeriods();

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
        📅 출산 적기 분석
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님의 최적 출산 시기
      </p>

      {/* 현재 상태 */}
      <div className="glass rounded-2xl p-8 mb-8 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="text-4xl">{timingAdvice.icon}</span>
          <div>
            <p className="text-slate-400 text-sm">현재 나이 기준</p>
            <p className={`text-2xl font-bold ${timingAdvice.color}`}>{timingAdvice.period}</p>
          </div>
        </div>
        <p className="text-slate-300 text-center leading-relaxed">
          {timingAdvice.message}
        </p>
      </div>

      {/* 나이대별 권장 */}
      <h3 className="text-xl font-bold text-cyan-400 mb-4">나이대별 출산 권장 시기</h3>
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <motion.div
          className="glass rounded-xl p-6"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">초혼 적기</p>
              <p className="text-xl font-bold text-blue-400">
                {optimalAges.early[0]}-{optimalAges.early[1]}세
              </p>
            </div>
          </div>
          <p className="text-slate-300 text-sm">
            체력과 회복력이 좋고, 임신 및 출산이 수월한 시기입니다.
          </p>
        </motion.div>

        <motion.div
          className="glass rounded-xl p-6"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">최적기</p>
              <p className="text-xl font-bold text-green-400">
                {optimalAges.mid[0]}-{optimalAges.mid[1]}세
              </p>
            </div>
          </div>
          <p className="text-slate-300 text-sm">
            경제적, 정서적 안정기로 출산과 양육에 가장 이상적인 시기입니다.
          </p>
        </motion.div>

        <motion.div
          className="glass rounded-xl p-6"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">늦은 적기</p>
              <p className="text-xl font-bold text-orange-400">
                {optimalAges.late[0]}-{optimalAges.late[1]}세
              </p>
            </div>
          </div>
          <p className="text-slate-300 text-sm">
            건강 관리 필요하지만 여전히 충분히 가능한 시기입니다.
          </p>
        </motion.div>
      </div>

      {/* 연도별 출산운 */}
      <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
        <Calendar className="w-6 h-6" />
        연도별 출산 운세 (2025-2028)
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        {luckPeriods.map((period, index) => (
          <motion.div
            key={index}
            className="glass rounded-xl p-5"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-lg font-bold text-white">{period.year}년</h4>
                <p className="text-slate-400 text-sm">{period.element}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-purple-400">{period.score}점</p>
              </div>
            </div>

            <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-3">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                initial={{ width: 0 }}
                whileInView={{ width: `${period.score}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              />
            </div>

            <p className="text-slate-300 text-sm">{period.advice}</p>
          </motion.div>
        ))}
      </div>

      {/* 주의사항 */}
      <div className="glass rounded-2xl p-6 mt-8 bg-orange-500/5 border border-orange-500/20">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
          <div>
            <p className="text-orange-300 font-bold mb-2">⚠️ 중요 안내</p>
            <p className="text-slate-300 text-sm leading-relaxed">
              출산 시기는 개인의 건강 상태, 경제 상황, 부부 관계 등 많은 요인이 복합적으로 작용합니다.
              사주는 하나의 참고 자료일 뿐이며, 반드시 전문 의료진과 상담하시기 바랍니다.
              35세 이상 고령 임신의 경우 산부인과 전문의와 충분한 상담이 필요합니다.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
