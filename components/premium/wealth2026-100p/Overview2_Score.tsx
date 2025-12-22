'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Star, AlertTriangle, CheckCircle } from 'lucide-react';
import { SajuResult } from '@/lib/saju-calculator';
import { WEALTH_2026_BY_STEM } from './data';

interface Overview2ScoreProps {
  result: SajuResult;
  name: string;
}

export default function Overview2Score({ result, name }: Overview2ScoreProps) {
  const dayStem = result.day.stem.ko;
  const data = WEALTH_2026_BY_STEM[dayStem] || WEALTH_2026_BY_STEM['갑'];

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case '대박': return 'from-yellow-500 to-amber-600';
      case '상승': return 'from-green-500 to-emerald-600';
      case '안정': return 'from-blue-500 to-indigo-600';
      default: return 'from-orange-500 to-red-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* 재물운 총점 */}
      <div className="p-8 bg-slate-900/80 rounded-3xl border border-slate-800">
        <div className="text-center space-y-6">
          <h3 className="text-xl text-slate-400">{name}님의 2026년 재물운</h3>

          {/* 점수 원형 */}
          <div className="relative inline-flex items-center justify-center">
            <div className={`w-40 h-40 rounded-full bg-gradient-to-br ${getGradeColor(data.grade)} p-1`}>
              <div className="w-full h-full rounded-full bg-slate-900 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold text-white">{data.yearScore}</span>
                <span className="text-slate-400">/ 100</span>
              </div>
            </div>
          </div>

          {/* 등급 */}
          <div className={`inline-block px-6 py-2 rounded-full bg-gradient-to-r ${getGradeColor(data.grade)}`}>
            <span className="text-xl font-bold text-white">{data.grade}</span>
          </div>

          {/* 키워드 */}
          <div className="flex flex-wrap justify-center gap-2">
            {data.keywords.map((keyword, idx) => (
              <span key={idx} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm">
                #{keyword}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 총운 요약 */}
      <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-6 h-6 text-amber-400" />
          <h4 className="text-lg font-bold text-white">2026년 재물운 총평</h4>
        </div>
        <p className="text-slate-300 leading-relaxed">{data.yearSummary}</p>
      </div>

      {/* 행운/주의 시기 */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-5 bg-green-900/20 rounded-2xl border border-green-800/30">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <h5 className="font-bold text-green-300">행운의 달</h5>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.luckyMonths.map((month) => (
              <span key={month} className="px-3 py-1 bg-green-800/30 text-green-300 rounded-lg font-medium">
                {month}월
              </span>
            ))}
          </div>
        </div>

        <div className="p-5 bg-red-900/20 rounded-2xl border border-red-800/30">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <h5 className="font-bold text-red-300">주의할 달</h5>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.cautionMonths.map((month) => (
              <span key={month} className="px-3 py-1 bg-red-800/30 text-red-300 rounded-lg font-medium">
                {month}월
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
