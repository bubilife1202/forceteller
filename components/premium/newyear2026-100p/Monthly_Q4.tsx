'use client';

import { motion } from 'framer-motion';
import { Calendar, TrendingUp, Sparkles } from 'lucide-react';
import { MONTHLY_FORTUNE } from './data';

interface MonthlyQ4Props {
  dayStem: string;
}

export default function MonthlyQ4({ dayStem }: MonthlyQ4Props) {
  const monthData = MONTHLY_FORTUNE[dayStem]?.months || [];
  const q4Months = monthData.filter(m => m.month >= 10 && m.month <= 12);

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'from-blue-400 to-cyan-400';
    if (score >= 60) return 'from-blue-500 to-cyan-500';
    return 'from-blue-600 to-cyan-600';
  };

  const getScoreWidth = (score: number) => `${score}%`;

  return (
    <div className="w-full bg-gradient-to-br from-slate-900 via-blue-950/20 to-slate-900 rounded-2xl p-8 shadow-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              4분기 월별 운세
            </h2>
            <p className="text-blue-300/70 text-sm mt-1">10월 - 12월 (겨울의 시작)</p>
          </div>
        </div>

        <div className="space-y-6">
          {q4Months.map((month, index) => (
            <motion.div
              key={month.month}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-500/30">
                    <span className="text-2xl font-bold text-blue-400">{month.month}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      <span className="text-lg font-bold text-blue-300">{month.keyword}</span>
                    </div>
                    <p className="text-blue-400/60 text-sm">{month.month}월</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-400">{month.score}</div>
                  <div className="text-blue-500/60 text-xs">점</div>
                </div>
              </div>

              <div className="relative w-full h-3 bg-slate-700/50 rounded-full overflow-hidden mb-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: getScoreWidth(month.score) }}
                  transition={{ delay: index * 0.2 + 0.3, duration: 0.8, ease: 'easeOut' }}
                  className={`absolute left-0 top-0 h-full bg-gradient-to-r ${getScoreColor(month.score)} rounded-full shadow-lg`}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
              </div>

              <div className="flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                <p className="text-blue-100/80 text-sm leading-relaxed">{month.advice}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
