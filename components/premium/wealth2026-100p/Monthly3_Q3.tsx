'use client';

import { motion } from 'framer-motion';
import { Star, AlertTriangle } from 'lucide-react';
import { WEALTH_BY_DAY_STEM } from '@/lib/fortune-data/saju/wealth-content';
import { WEALTH_2026_BY_STEM } from './data';

interface Monthly3Q3Props {
  dayStem: string;
}

export default function Monthly3Q3({ dayStem }: Monthly3Q3Props) {
  const baseData = WEALTH_BY_DAY_STEM[dayStem] || WEALTH_BY_DAY_STEM['갑'];
  const yearData = WEALTH_2026_BY_STEM[dayStem] || WEALTH_2026_BY_STEM['갑'];
  const q3Months = baseData.monthlyWealth.filter(m => m.month >= 7 && m.month <= 9);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Q3 개요 */}
      <div className="p-6 bg-gradient-to-br from-orange-900/30 to-amber-900/30 rounded-2xl border border-orange-800/30">
        <h3 className="text-xl font-bold text-white mb-2">3분기 (7월~9월)</h3>
        <p className="text-slate-300">
          여름의 열기와 함께 재물 활동도 활발해지는 시기입니다.
          하반기 투자를 준비하고 수확의 시기를 대비하세요.
        </p>
      </div>

      {/* 월별 상세 */}
      <div className="space-y-4">
        {q3Months.map((monthData) => {
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
