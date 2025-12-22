'use client';

import { motion } from 'framer-motion';
import { Calendar, Sun, Zap } from 'lucide-react';
import { MONTHLY_FORTUNE } from './data';

interface MonthlyQ2Props {
  dayStem: string;
}

const getScoreColor = (score: number) => {
  if (score >= 75) return { color: 'from-amber-400 to-yellow-500', text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' };
  if (score >= 60) return { color: 'from-yellow-400 to-orange-500', text: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' };
  if (score >= 50) return { color: 'from-orange-400 to-amber-500', text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30' };
  return { color: 'from-red-400 to-orange-500', text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' };
};

export default function Monthly_Q2({ dayStem }: MonthlyQ2Props) {
  const q2Months = MONTHLY_FORTUNE[dayStem]?.months.slice(3, 6) || [];

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-2" style={{ fontFamily: "'Noto Serif KR', serif" }}>2분기 월별 운세</h2>
        <p className="text-amber-400 font-semibold mb-1">여름의 열정 · 활력과 성장</p>
        <p className="text-slate-300 text-sm">4월 ~ 6월 월별 상세 운세</p>
      </div>

      {/* 월별 카드 */}
      <div className="grid gap-6 md:gap-8">
        {q2Months.map((month, index) => {
          const style = getScoreColor(month.score);
          const percentage = (month.score / 100) * 100;

          return (
            <motion.div
              key={month.month}
              className="glass rounded-2xl p-6 md:p-8 border border-amber-500/20"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${style.color} flex flex-col items-center justify-center shadow-lg`}>
                    <Sun className="w-6 h-6 text-white mb-1" />
                    <span className="text-2xl font-bold text-white">{month.month}월</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                      <Zap className={`w-5 h-5 ${style.text}`} />
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
                      <Zap className={`w-4 h-4 ${style.text} flex-shrink-0 mt-1`} />
                      <p className="text-slate-200 leading-relaxed"><strong className={style.text}>이달의 조언: </strong>{month.advice}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div className="mt-8 glass rounded-2xl p-6 border border-amber-400/30" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
        <h4 className="text-lg font-bold text-amber-400 mb-3 flex items-center gap-2">
          <Sun className="w-5 h-5" />2분기 종합 전략
        </h4>
        <p className="text-slate-300 leading-relaxed text-sm">
          여름의 강렬한 에너지가 시작되는 시기입니다. 4월은 발전의 시기로 1분기의 성과를 확장하고, 5월은 활력이 넘치는 달이니 적극적으로 행동하세요. 6월은 상반기를 마무리하며 조정하는 시기이니 무리하지 말고 페이스를 조절하세요.
        </p>
      </motion.div>
    </motion.div>
  );
}
