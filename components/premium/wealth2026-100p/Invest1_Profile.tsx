'use client';

import { motion } from 'framer-motion';
import { LineChart, TrendingUp, Shield, Target } from 'lucide-react';
import { WEALTH_2026_BY_STEM } from './data';

interface Invest1ProfileProps {
  dayStem: string;
}

export default function Invest1Profile({ dayStem }: Invest1ProfileProps) {
  const data = WEALTH_2026_BY_STEM[dayStem] || WEALTH_2026_BY_STEM['갑'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* 챕터 헤더 */}
      <div className="flex items-center gap-4 pb-4 border-b border-slate-700">
        <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm font-medium">
          Chapter 4
        </span>
        <h2 className="text-2xl font-bold text-white">투자운 심층 분석</h2>
      </div>

      {/* 투자 조언 */}
      <div className="p-6 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-2xl border border-indigo-800/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-indigo-500/20 rounded-xl">
            <LineChart className="w-6 h-6 text-indigo-400" />
          </div>
          <h3 className="text-xl font-bold text-white">2026년 투자 조언</h3>
        </div>
        <p className="text-slate-300 leading-relaxed text-lg">{data.investmentAdvice}</p>
      </div>

      {/* 투자 성공 전략 */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-5 bg-slate-800/50 rounded-2xl border border-slate-700">
          <TrendingUp className="w-8 h-8 text-green-400 mb-3" />
          <h4 className="font-bold text-white mb-2">수익 극대화</h4>
          <p className="text-slate-400 text-sm">
            {data.grade === '대박' ? '적극적인 투자로 큰 수익을 노리세요' :
             data.grade === '상승' ? '안정과 성장의 균형을 맞추세요' :
             '원금 보존을 최우선으로 하세요'}
          </p>
        </div>
        <div className="p-5 bg-slate-800/50 rounded-2xl border border-slate-700">
          <Shield className="w-8 h-8 text-blue-400 mb-3" />
          <h4 className="font-bold text-white mb-2">리스크 관리</h4>
          <p className="text-slate-400 text-sm">
            분산 투자로 리스크를 줄이고, 손절 기준을 미리 정해두세요
          </p>
        </div>
        <div className="p-5 bg-slate-800/50 rounded-2xl border border-slate-700">
          <Target className="w-8 h-8 text-amber-400 mb-3" />
          <h4 className="font-bold text-white mb-2">목표 설정</h4>
          <p className="text-slate-400 text-sm">
            {data.yearScore >= 70 ? '수익률 15-20% 목표' :
             data.yearScore >= 50 ? '수익률 8-12% 목표' :
             '물가상승률 방어 목표'}
          </p>
        </div>
      </div>

      {/* 월별 투자 타이밍 */}
      <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
        <h4 className="font-bold text-white mb-4">2026년 투자 타이밍</h4>
        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
          {[1,2,3,4,5,6,7,8,9,10,11,12].map((month) => {
            const isLucky = data.luckyMonths.includes(month);
            const isCaution = data.cautionMonths.includes(month);
            return (
              <div
                key={month}
                className={`p-3 rounded-xl text-center ${
                  isLucky ? 'bg-green-900/30 border border-green-700' :
                  isCaution ? 'bg-red-900/30 border border-red-700' :
                  'bg-slate-700/50'
                }`}
              >
                <p className="text-sm text-slate-400">{month}월</p>
                <p className={`font-bold ${
                  isLucky ? 'text-green-400' : isCaution ? 'text-red-400' : 'text-slate-300'
                }`}>
                  {isLucky ? '매수' : isCaution ? '관망' : '유지'}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
