'use client';

import { motion } from 'framer-motion';
import { Calendar, Star, AlertTriangle } from 'lucide-react';
import { WEALTH_BY_DAY_STEM } from '@/lib/fortune-data/saju/wealth-content';
import { WEALTH_2026_BY_STEM } from './data';

interface Monthly1Q1Props {
  dayStem: string;
}

export default function Monthly1Q1({ dayStem }: Monthly1Q1Props) {
  const baseData = WEALTH_BY_DAY_STEM[dayStem] || WEALTH_BY_DAY_STEM['갑'];
  const yearData = WEALTH_2026_BY_STEM[dayStem] || WEALTH_2026_BY_STEM['갑'];
  const q1Months = baseData.monthlyWealth.filter(m => m.month >= 1 && m.month <= 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* 챕터 헤더 */}
      <div className="flex items-center gap-4 pb-4 border-b border-slate-700">
        <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-medium">
          Chapter 5
        </span>
        <h2 className="text-2xl font-bold text-white">월별 재물 캘린더</h2>
      </div>

      {/* Q1 개요 */}
      <div className="p-6 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl border border-blue-800/30">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="w-6 h-6 text-cyan-400" />
          <h3 className="text-xl font-bold text-white">1분기 (1월~3월)</h3>
        </div>
        <p className="text-slate-300">
          새해의 시작과 함께 재정 계획을 세우는 시기입니다.
          {yearData.luckyMonths.includes(1) || yearData.luckyMonths.includes(2) || yearData.luckyMonths.includes(3) ?
            ' 이 분기에 좋은 기회가 있습니다.' : ' 준비와 계획에 집중하세요.'}
        </p>
      </div>

      {/* 월별 상세 */}
      <div className="space-y-4">
        {q1Months.map((monthData) => {
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
              <div className="mt-4 pt-4 border-t border-slate-700/50">
                <p className="text-sm text-slate-400">
                  {isLucky ? '💰 투자/지출 적극 권장' :
                   isCaution ? '⚠️ 큰 지출/투자 자제' :
                   '📊 현상 유지 권장'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
