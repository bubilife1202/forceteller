'use client';

import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Lightbulb, Target } from 'lucide-react';
import { WEALTH_BY_DAY_STEM } from '@/lib/fortune-data/saju/wealth-content';

interface DNA3SWOTProps {
  dayStem: string;
}

export default function DNA3SWOT({ dayStem }: DNA3SWOTProps) {
  const data = WEALTH_BY_DAY_STEM[dayStem] || WEALTH_BY_DAY_STEM['갑'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h3 className="text-xl font-bold text-white flex items-center gap-2">
        <Shield className="w-6 h-6 text-blue-400" />
        재물운 SWOT 분석
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        {/* 강점 */}
        <div className="p-5 bg-blue-900/20 rounded-2xl border border-blue-800/30">
          <h4 className="font-bold text-blue-300 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-blue-500/30 rounded-lg flex items-center justify-center text-lg">S</span>
            강점 (Strengths)
          </h4>
          <ul className="space-y-2">
            {data.strengths.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-slate-300">
                <span className="text-blue-400 mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* 약점 */}
        <div className="p-5 bg-red-900/20 rounded-2xl border border-red-800/30">
          <h4 className="font-bold text-red-300 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-red-500/30 rounded-lg flex items-center justify-center text-lg">W</span>
            약점 (Weaknesses)
          </h4>
          <ul className="space-y-2">
            {data.weaknesses.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-slate-300">
                <span className="text-red-400 mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* 기회 */}
        <div className="p-5 bg-green-900/20 rounded-2xl border border-green-800/30">
          <h4 className="font-bold text-green-300 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-green-500/30 rounded-lg flex items-center justify-center text-lg">O</span>
            기회 (Opportunities)
          </h4>
          <ul className="space-y-2">
            {data.opportunities.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-slate-300">
                <span className="text-green-400 mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* 위협 */}
        <div className="p-5 bg-amber-900/20 rounded-2xl border border-amber-800/30">
          <h4 className="font-bold text-amber-300 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-amber-500/30 rounded-lg flex items-center justify-center text-lg">T</span>
            위협 (Threats)
          </h4>
          <ul className="space-y-2">
            {data.threats.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-slate-300">
                <span className="text-amber-400 mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 실행 항목 & 주의사항 */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="p-5 bg-emerald-900/20 rounded-2xl border border-emerald-800/30">
          <h4 className="font-bold text-emerald-300 mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            재물운 향상 실천 항목
          </h4>
          <ol className="space-y-2">
            {data.actionItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-slate-300">
                <span className="w-6 h-6 bg-emerald-500/30 text-emerald-300 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {idx + 1}
                </span>
                {item}
              </li>
            ))}
          </ol>
        </div>

        <div className="p-5 bg-red-900/20 rounded-2xl border border-red-800/30">
          <h4 className="font-bold text-red-300 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            재물운 주의사항
          </h4>
          <ul className="space-y-2">
            {data.warnings.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-slate-300">
                <span className="w-6 h-6 bg-red-500/30 text-red-300 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                  !
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
