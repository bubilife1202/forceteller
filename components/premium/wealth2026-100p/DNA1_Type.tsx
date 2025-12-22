'use client';

import { motion } from 'framer-motion';
import { Dna, Wallet } from 'lucide-react';
import { WEALTH_BY_DAY_STEM } from '@/lib/fortune-data/saju/wealth-content';

interface DNA1TypeProps {
  dayStem: string;
  name: string;
}

export default function DNA1Type({ dayStem, name }: DNA1TypeProps) {
  const data = WEALTH_BY_DAY_STEM[dayStem] || WEALTH_BY_DAY_STEM['갑'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* 챕터 헤더 */}
      <div className="flex items-center gap-4 pb-4 border-b border-slate-700">
        <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium">
          Chapter 2
        </span>
        <h2 className="text-2xl font-bold text-white">나의 재물 DNA 분석</h2>
      </div>

      {/* 재물 유형 */}
      <div className="p-8 bg-gradient-to-br from-purple-900/30 to-indigo-900/30 rounded-3xl border border-purple-800/30">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-4 bg-purple-500/20 rounded-2xl">
            <Dna className="w-8 h-8 text-purple-400" />
          </div>
          <div>
            <p className="text-purple-400 text-sm mb-1">{name}님의 재물 유형</p>
            <h3 className="text-2xl font-bold text-white">{data.wealthType}</h3>
          </div>
        </div>
        <p className="text-slate-300 leading-relaxed text-lg">
          {data.wealthPersonality}
        </p>
      </div>

      {/* 수입/지출 스타일 */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Wallet className="w-5 h-5 text-green-400" />
            </div>
            <h4 className="font-bold text-green-300">수입 스타일</h4>
          </div>
          <p className="text-slate-300 leading-relaxed">{data.incomeStyle}</p>
        </div>

        <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <Wallet className="w-5 h-5 text-red-400" />
            </div>
            <h4 className="font-bold text-red-300">지출 스타일</h4>
          </div>
          <p className="text-slate-300 leading-relaxed">{data.spendingStyle}</p>
        </div>
      </div>

      {/* 행운의 수입원 */}
      <div className="p-6 bg-amber-900/20 rounded-2xl border border-amber-800/30">
        <h4 className="font-bold text-amber-300 mb-4">행운의 수입원</h4>
        <div className="flex flex-wrap gap-2">
          {data.luckyIncome.map((income, idx) => (
            <span key={idx} className="px-4 py-2 bg-amber-800/30 text-amber-200 rounded-xl">
              {income}
            </span>
          ))}
        </div>
      </div>

      {/* 재물 전성기 */}
      <div className="p-6 bg-gradient-to-r from-yellow-900/30 to-amber-900/30 rounded-2xl border border-yellow-800/30">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-yellow-300">재물 전성기</h4>
          <span className="px-4 py-2 bg-yellow-500/30 text-yellow-200 rounded-xl font-bold text-xl">
            {data.wealthPeak.age}
          </span>
        </div>
        <p className="text-slate-300">{data.wealthPeak.description}</p>
      </div>
    </motion.div>
  );
}
