'use client';

import { motion } from 'framer-motion';
import { Wallet, TrendingUp, Briefcase, Award } from 'lucide-react';
import { SajuResult } from '@/lib/saju-calculator';
import { WEALTH_2026_BY_STEM } from './data';

interface Income1MainProps {
  result: SajuResult;
  name: string;
}

export default function Income1Main({ result, name }: Income1MainProps) {
  const dayStem = result.day.stem.ko;
  const data = WEALTH_2026_BY_STEM[dayStem] || WEALTH_2026_BY_STEM['갑'];
  const { 재성, 식상 } = result.tenGodsCount;

  // 수입 증가율 예측
  const incomeGrowth = Math.min(30, 5 + (재성 * 5) + (식상 * 3) + (data.yearScore > 70 ? 10 : 0));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* 챕터 헤더 */}
      <div className="flex items-center gap-4 pb-4 border-b border-slate-700">
        <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
          Chapter 3
        </span>
        <h2 className="text-2xl font-bold text-white">2026년 수입운 상세</h2>
      </div>

      {/* 수입운 점수 */}
      <div className="p-6 bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl border border-green-800/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-500/20 rounded-xl">
              <Wallet className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-green-400 text-sm">{name}님의 2026 수입운</p>
              <h3 className="text-xl font-bold text-white">본업 수입 전망</h3>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-green-400">+{incomeGrowth}%</p>
            <p className="text-slate-400 text-sm">예상 수입 증가율</p>
          </div>
        </div>
        <p className="text-slate-300 leading-relaxed">{data.incomeOutlook}</p>
      </div>

      {/* 사주 재성 현황 */}
      <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
        <h4 className="font-bold text-white mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          사주 원국 재성 분석
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-700/50 rounded-xl text-center">
            <p className="text-slate-400 text-sm mb-1">재성 (정재+편재)</p>
            <p className="text-2xl font-bold text-amber-400">{재성}개</p>
          </div>
          <div className="p-4 bg-slate-700/50 rounded-xl text-center">
            <p className="text-slate-400 text-sm mb-1">식상 (식신+상관)</p>
            <p className="text-2xl font-bold text-green-400">{식상}개</p>
          </div>
          <div className="p-4 bg-slate-700/50 rounded-xl text-center">
            <p className="text-slate-400 text-sm mb-1">재성 강도</p>
            <p className="text-2xl font-bold text-white">{재성 >= 2 ? '강' : 재성 === 1 ? '중' : '약'}</p>
          </div>
          <div className="p-4 bg-slate-700/50 rounded-xl text-center">
            <p className="text-slate-400 text-sm mb-1">식상생재</p>
            <p className="text-2xl font-bold text-white">{식상 >= 1 && 재성 >= 1 ? 'O' : 'X'}</p>
          </div>
        </div>
      </div>

      {/* 본업 수입 예측 */}
      <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
        <h4 className="font-bold text-white mb-4 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-blue-400" />
          본업 수입 분석
        </h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-xl">
            <span className="text-slate-300">급여/매출 상승 가능성</span>
            <div className="flex items-center gap-2">
              <div className="w-32 h-2 bg-slate-600 rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: `${Math.min(100, data.yearScore)}%` }} />
              </div>
              <span className="text-green-400 font-medium">{data.yearScore}%</span>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-xl">
            <span className="text-slate-300">승진/성과급 기대치</span>
            <div className="flex items-center gap-2">
              <div className="w-32 h-2 bg-slate-600 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: `${Math.min(100, data.yearScore + 10)}%` }} />
              </div>
              <span className="text-blue-400 font-medium">{Math.min(100, data.yearScore + 10)}%</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
