'use client';

import { motion } from 'framer-motion';
import { Star, AlertTriangle } from 'lucide-react';
import { WEALTH_BY_DAY_STEM } from '@/lib/fortune-data/saju/wealth-content';
import { WEALTH_2026_BY_STEM } from './data';

interface Monthly2Q2Props {
  dayStem: string;
}

export default function Monthly2Q2({ dayStem }: Monthly2Q2Props) {
  const baseData = WEALTH_BY_DAY_STEM[dayStem] || WEALTH_BY_DAY_STEM['갑'];
  const yearData = WEALTH_2026_BY_STEM[dayStem] || WEALTH_2026_BY_STEM['갑'];
  const q2Months = baseData.monthlyWealth.filter(m => m.month >= 4 && m.month <= 6);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Q2 개요 */}
      <div className="p-6 bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl border border-green-800/30">
        <h3 className="text-xl font-bold text-white mb-2">2분기 (4월~6월)</h3>
        <p className="text-slate-300">
          봄의 성장 에너지와 함께 재물도 움직이는 시기입니다.
          상반기 결산을 준비하며 하반기를 계획하세요.
        </p>
      </div>

      {/* 월별 상세 */}
      <div className="space-y-4">
        {q2Months.map((monthData) => {
          const isLucky = yearData.luckyMonths.includes(monthData.month);
          const isCaution = yearData.cautionMonths.includes(monthData.month);

          return (
            <div
              key={monthData.month}
              className={`p-6 rounded-2xl border ${
                isLucky ? 'bg-green-900/20 border-green-800/30' :
                isCaution ? 'bg-red-900/20 border-red-800/30' :
                'bg-slate-800/50 border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className={`text-3xl font-bold ${
                    isLucky ? 'text-green-400' : isCaution ? 'text-red-400' : 'text-slate-300'
                  }`}>
                    {monthData.month}월
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    isLucky ? 'bg-green-500/20 text-green-300' :
                    isCaution ? 'bg-red-500/20 text-red-300' :
                    'bg-slate-700 text-slate-300'
                  }`}>
                    {monthData.theme}
                  </span>
                </div>
                {isLucky && <Star className="w-5 h-5 text-yellow-400" />}
                {isCaution && <AlertTriangle className="w-5 h-5 text-red-400" />}
              </div>
              <p className="text-slate-300">{monthData.advice}</p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
