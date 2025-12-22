'use client';

import { motion } from 'framer-motion';
import { Calendar, Sparkles, TrendingUp } from 'lucide-react';
import { MONTHLY_FORTUNE } from './data';

interface MonthlyQ1Props {
  dayStem: string;
}

const getScoreColor = (score: number) => {
  if (score >= 75) return { color: 'from-emerald-400 to-green-500', text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' };
  if (score >= 60) return { color: 'from-lime-400 to-green-500', text: 'text-lime-400', bg: 'bg-lime-500/10', border: 'border-lime-500/30' };
  if (score >= 50) return { color: 'from-yellow-400 to-amber-500', text: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' };
  return { color: 'from-orange-400 to-red-500', text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30' };
};

export default function Monthly_Q1({ dayStem }: MonthlyQ1Props) {
  const q1Months = MONTHLY_FORTUNE[dayStem]?.months.slice(0, 3) || [];

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-2" style={{ fontFamily: "'Noto Serif KR', serif" }}>1분기 월별 운세</h2>
        <p className="text-emerald-400 font-semibold mb-1">봄의 기운 · 새로운 시작</p>
        <p className="text-slate-300 text-sm">1월 ~ 3월 월별 상세 운세</p>
      </div>

      {/* 월별 카드 */}
      <div className="grid gap-6 md:gap-8">
        {q1Months.map((month, index) => {
          const style = getScoreColor(month.score);
          const percentage = (month.score / 100) * 100;

          return (
            <motion.div
              key={month.month}
              className="glass rounded-2xl p-6 md:p-8 border border-emerald-500/20"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${style.color} flex flex-col items-center justify-center shadow-lg`}>
                    <Calendar className="w-6 h-6 text-white mb-1" />
                    <span className="text-2xl font-bold text-white">{month.month}월</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                      <Sparkles className={`w-5 h-5 ${style.text}`} />
                      <h3 className="text-2xl font-bold text-slate-100">{month.keyword}</h3>
                    </div>
                    <span className={`px-4 py-2 ${style.bg} ${style.text} font-bold rounded-full border ${style.border} text-lg`}>{month.score}점</span>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm text-slate-400">운세 지수</span>
                      <div className="flex-1 h-3 bg-slate-700/50 rounded-full overflow-hidden">
                        <motion.div className={`h-full bg-gradient-to-r ${style.color} rounded-full`} initial={{ width: 0 }} whileInView={{ width: `${percentage}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: index * 0.15 + 0.3 }} />
                      </div>
                    </div>
                  </div>
                  <div className={`${style.bg} border ${style.border} rounded-xl p-4`}>
                    <div className="flex items-start gap-2">
                      <TrendingUp className={`w-4 h-4 ${style.text} flex-shrink-0 mt-1`} />
                      <p className="text-slate-200 leading-relaxed"><strong className={style.text}>이달의 조언: </strong>{month.advice}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div className="mt-8 glass rounded-2xl p-6 border border-emerald-400/30" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
        <h4 className="text-lg font-bold text-emerald-400 mb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />1분기 종합 전략
        </h4>
        <p className="text-slate-300 leading-relaxed text-sm">
          봄의 새로운 기운과 함께 한 해를 시작하는 중요한 시기입니다. 1월은 계획을 세우고, 2월부터 본격적으로 실행에 옮기세요. 3월은 봄의 에너지가 가장 강한 때이므로 적극적인 행동이 좋은 결과를 가져옵니다.
        </p>
      </motion.div>
    </motion.div>
  );
}
