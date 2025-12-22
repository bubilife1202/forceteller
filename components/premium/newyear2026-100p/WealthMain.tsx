'use client';

import { motion } from 'framer-motion';
import { Wallet, TrendingUp, Calendar, AlertTriangle, Sparkles } from 'lucide-react';
import { NEWYEAR_2026_DATA } from './data';

interface WealthMainProps {
  dayStem: string;
}

export default function WealthMain({ dayStem }: WealthMainProps) {
  const data = NEWYEAR_2026_DATA[dayStem];
  if (!data) return null;

  const scoreColor = data.wealthScore >= 80 ? 'text-yellow-400' : data.wealthScore >= 70 ? 'text-amber-400' :
    data.wealthScore >= 60 ? 'text-orange-400' : 'text-rose-400';
  const scoreGrade = data.wealthScore >= 85 ? '최상' : data.wealthScore >= 75 ? '상' :
    data.wealthScore >= 65 ? '중상' : data.wealthScore >= 55 ? '중' : '하';
  const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

  const MonthBadge = ({ month, type }: { month: number; type: 'lucky' | 'caution' }) => (
    <motion.div className={`px-3 py-2 rounded-lg bg-gradient-to-br border ${type === 'lucky' ?
      'from-yellow-500/20 to-amber-500/20 border-yellow-500/30 text-yellow-300' :
      'from-rose-500/20 to-red-500/20 border-rose-500/30 text-rose-300'}`} whileHover={{ scale: 1.05 }}>
      <span className="font-semibold text-sm">{months[month - 1]}</span>
    </motion.div>
  );

  return (
    <motion.section
      className="glass-strong rounded-3xl p-6 md:p-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-amber-500/20">
          <Wallet className="w-7 h-7 text-yellow-400" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Noto Serif KR', serif" }}>재물운</h2>
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold">Chapter 2</span>
          </div>
          <p className="text-slate-400 text-sm mt-1">2026 병오년 재물 흐름</p>
        </div>
      </div>

      <div className="glass rounded-2xl p-6 mb-6 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border border-yellow-500/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-slate-400 mb-1 text-sm">재물운 점수</p>
            <div className="flex items-baseline gap-2">
              <span className={`text-5xl font-bold ${scoreColor}`}>{data.wealthScore}</span>
              <span className="text-slate-400 text-lg">/ 100</span>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${scoreColor}`}>{scoreGrade}등급</div>
            <p className="text-slate-400 text-sm mt-1">종합 평가</p>
          </div>
        </div>
        <div className="w-full bg-slate-700/50 rounded-full h-2">
          <motion.div className="h-2 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500"
            initial={{ width: 0 }} whileInView={{ width: `${data.wealthScore}%` }}
            viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 text-yellow-400 mb-3">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-semibold">재물운 종합</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{data.wealthSummary}</p>
        </div>
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 text-emerald-400 mb-3">
            <TrendingUp className="w-5 h-5" />
            <h3 className="font-semibold">수입 전망</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{data.incomeOutlook}</p>
        </div>
      </div>

      <div className="glass rounded-2xl p-6 mb-6 border border-yellow-500/30 bg-gradient-to-br from-yellow-500/5 to-amber-500/5">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-yellow-500/20 flex-shrink-0">
            <Wallet className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <h3 className="font-bold text-yellow-300 mb-2">💰 재물 조언</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{data.wealthAdvice}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-5 border border-yellow-500/20">
          <div className="flex items-center gap-2 text-yellow-400 mb-4">
            <Calendar className="w-5 h-5" />
            <h3 className="font-semibold">행운의 달</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.wealthLuckyMonths.map((month) => <MonthBadge key={month} month={month} type="lucky" />)}
          </div>
        </div>
        <div className="glass rounded-2xl p-5 border border-rose-500/20">
          <div className="flex items-center gap-2 text-rose-400 mb-4">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-semibold">주의의 달</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.wealthCautionMonths.map((month) => <MonthBadge key={month} month={month} type="caution" />)}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
