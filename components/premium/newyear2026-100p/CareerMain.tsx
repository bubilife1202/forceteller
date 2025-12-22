'use client';

import { motion } from 'framer-motion';
import { Briefcase, TrendingUp, Lightbulb, RefreshCw } from 'lucide-react';
import { NEWYEAR_2026_DATA } from './data';

interface CareerMainProps {
  dayStem: string;
}

export default function CareerMain({ dayStem }: CareerMainProps) {
  const data = NEWYEAR_2026_DATA[dayStem];

  if (!data) {
    return <div className="text-slate-400">데이터를 찾을 수 없습니다.</div>;
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-amber-500 to-orange-500';
    if (score >= 70) return 'from-blue-500 to-cyan-500';
    if (score >= 60) return 'from-indigo-500 to-blue-500';
    return 'from-slate-500 to-slate-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 rounded-2xl p-8 shadow-2xl border border-slate-800"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              Chapter 5
            </div>
            <Briefcase className="w-5 h-5 text-blue-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-1">직장/직업운</h2>
          <p className="text-slate-400 text-sm">커리어와 직장생활</p>
        </div>
      </div>

      {/* Career Score Display */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <svg className="w-36 h-36 transform -rotate-90">
            <circle
              cx="72"
              cy="72"
              r="64"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-slate-800"
            />
            <motion.circle
              cx="72"
              cy="72"
              r="64"
              stroke="url(#careerGradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDashoffset: 402 }}
              animate={{ strokeDashoffset: 402 - (402 * data.careerScore) / 100 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              style={{
                strokeDasharray: 402,
              }}
            />
            <defs>
              <linearGradient id="careerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-white">{data.careerScore}</span>
            <span className="text-sm text-slate-400">/ 100</span>
          </div>
        </div>
      </div>

      {/* Career Summary */}
      <div className="mb-6 p-5 bg-slate-800/50 rounded-xl border border-slate-700">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">직업운 요약</h3>
        </div>
        <p className="text-slate-300 leading-relaxed">{data.careerSummary}</p>
      </div>

      {/* Career Advice */}
      <div className="mb-6 p-5 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl border border-blue-700/50">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-semibold text-white">직장 생활 조언</h3>
        </div>
        <p className="text-blue-100 leading-relaxed font-medium">{data.careerAdvice}</p>
      </div>

      {/* Career Change Advice */}
      <div className="p-5 bg-slate-800/40 rounded-xl border border-slate-700">
        <div className="flex items-center gap-2 mb-3">
          <RefreshCw className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-semibold text-white">이직 및 전직 조언</h3>
        </div>
        <p className="text-slate-300 leading-relaxed">{data.careerChange}</p>
      </div>
    </motion.div>
  );
}
