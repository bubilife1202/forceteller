'use client';

import { motion } from 'framer-motion';
import { Star, AlertTriangle, Gift } from 'lucide-react';
import { WEALTH_BY_DAY_STEM } from '@/lib/fortune-data/saju/wealth-content';
import { WEALTH_2026_BY_STEM } from './data';

interface Monthly4Q4Props {
  dayStem: string;
}

export default function Monthly4Q4({ dayStem }: Monthly4Q4Props) {
  const baseData = WEALTH_BY_DAY_STEM[dayStem] || WEALTH_BY_DAY_STEM['갑'];
  const yearData = WEALTH_2026_BY_STEM[dayStem] || WEALTH_2026_BY_STEM['갑'];
  const q4Months = baseData.monthlyWealth.filter(m => m.month >= 10 && m.month <= 12);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Q4 개요 */}
      <div className="p-6 bg-gradient-to-br from-purple-900/30 to-indigo-900/30 rounded-2xl border border-purple-800/30">
        <div className="flex items-center gap-3 mb-2">
          <Gift className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-bold text-white">4분기 (10월~12월)</h3>
        </div>
        <p className="text-slate-300">
          한 해의 마무리와 결산의 시기입니다.
          연말 보너스, 절세 전략, 내년 계획을 준비하세요.
        </p>
      </div>

      {/* 월별 상세 */}
      <div className="space-y-4">
        {q4Months.map((monthData) => {
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

      {/* 절세 팁 */}
      <div className="p-6 bg-blue-900/20 rounded-2xl border border-blue-800/30">
        <h4 className="font-bold text-blue-300 mb-4">연말 절세 팁</h4>
        <div className="grid md:grid-cols-2 gap-3">
          {yearData.taxTips.map((tip, idx) => (
            <div key={idx} className="flex items-center gap-2 text-slate-300">
              <span className="w-2 h-2 bg-blue-400 rounded-full" />
              {tip}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
