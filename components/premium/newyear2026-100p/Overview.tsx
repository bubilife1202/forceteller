'use client';

import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Star, BookOpen } from 'lucide-react';
import { NEWYEAR_2026_DATA, YEAR_RELATION } from './data';

interface OverviewProps {
  dayStem: string;
  userName: string;
}

export default function Overview({ dayStem, userName }: OverviewProps) {
  const data = NEWYEAR_2026_DATA[dayStem];
  const relation = YEAR_RELATION[dayStem];

  if (!data || !relation) {
    return <div className="text-slate-400">데이터를 찾을 수 없습니다.</div>;
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-amber-500 to-orange-500';
    if (score >= 70) return 'from-green-500 to-emerald-500';
    if (score >= 60) return 'from-blue-500 to-cyan-500';
    return 'from-slate-500 to-slate-600';
  };

  const getGradeColor = (grade: string) => {
    if (grade === '대박') return 'bg-gradient-to-r from-amber-500 to-orange-500';
    if (grade === '상승') return 'bg-gradient-to-r from-green-500 to-emerald-500';
    if (grade === '안정') return 'bg-gradient-to-r from-blue-500 to-cyan-500';
    return 'bg-gradient-to-r from-slate-500 to-slate-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 rounded-2xl p-8 shadow-2xl border border-slate-800"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              Chapter 1
            </div>
            <Sparkles className="w-5 h-5 text-amber-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-1">2026년 총운</h2>
          <p className="text-slate-400 text-sm">{userName}님의 신년운세</p>
        </div>
        <div className={`${getGradeColor(data.grade)} px-4 py-2 rounded-lg text-white font-bold`}>
          {data.grade}
        </div>
      </div>

      {/* Score Display - Circular */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <svg className="w-40 h-40 transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-slate-800"
            />
            <motion.circle
              cx="80"
              cy="80"
              r="70"
              stroke="url(#scoreGradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDashoffset: 440 }}
              animate={{ strokeDashoffset: 440 - (440 * data.totalScore) / 100 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              style={{
                strokeDasharray: 440,
              }}
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" className={`text-${getScoreColor(data.totalScore).split('-')[1]}-500`} stopColor="currentColor" />
                <stop offset="100%" className={`text-${getScoreColor(data.totalScore).split('-')[3]}-500`} stopColor="currentColor" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-white">{data.totalScore}</span>
            <span className="text-sm text-slate-400">/ 100</span>
          </div>
        </div>
      </div>

      {/* Year Keywords */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-4 h-4 text-amber-400" />
          <h3 className="text-lg font-semibold text-white">올해의 키워드</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.yearKeywords.map((keyword, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-r from-slate-800 to-slate-700 text-slate-200 px-4 py-2 rounded-full text-sm font-medium border border-slate-600"
            >
              #{keyword}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Year Summary */}
      <div className="mb-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-4 h-4 text-green-400" />
          <h3 className="text-base font-semibold text-white">운세 요약</h3>
        </div>
        <p className="text-slate-300 leading-relaxed">{data.yearSummary}</p>
      </div>

      {/* Year Advice */}
      <div className="p-4 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl border border-purple-700/50">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-4 h-4 text-purple-400" />
          <h3 className="text-base font-semibold text-white">한 줄 조언</h3>
        </div>
        <p className="text-purple-100 leading-relaxed font-medium">{data.yearAdvice}</p>
      </div>
    </motion.div>
  );
}
