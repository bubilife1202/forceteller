'use client';

import { motion } from 'framer-motion';
import { Atom, Sparkles, Zap, Shield, AlertCircle } from 'lucide-react';
import { ELEMENT_TRAITS } from './data';

interface SajuAnalysisProps {
  dayStem: string;
}

export default function SajuAnalysis({ dayStem }: SajuAnalysisProps) {
  const trait = ELEMENT_TRAITS[dayStem];

  if (!trait) {
    return <div className="text-slate-400">데이터를 찾을 수 없습니다.</div>;
  }

  const getElementColor = (element: string) => {
    if (element.includes('목')) return 'from-green-500 to-emerald-600';
    if (element.includes('화')) return 'from-red-500 to-orange-600';
    if (element.includes('토')) return 'from-yellow-600 to-amber-700';
    if (element.includes('금')) return 'from-slate-400 to-gray-500';
    if (element.includes('수')) return 'from-blue-500 to-cyan-600';
    return 'from-slate-500 to-slate-600';
  };

  const getElementIcon = (element: string) => {
    if (element.includes('양')) return '☀️';
    return '☾';
  };

  const elementColor = getElementColor(trait.element);
  const elementIcon = getElementIcon(trait.element);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 rounded-2xl p-8 shadow-2xl border border-slate-800"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          Chapter 2
        </div>
        <h2 className="text-3xl font-bold text-white">사주 분석</h2>
        <Atom className="w-6 h-6 text-indigo-400" />
      </div>

      {/* Element Type - Main Display */}
      <div className="mb-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`bg-gradient-to-br ${elementColor} rounded-2xl p-6 shadow-xl`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium mb-1">나의 오행</p>
              <h3 className="text-4xl font-bold text-white flex items-center gap-2">
                {trait.element}
                <span className="text-3xl">{elementIcon}</span>
              </h3>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/20">
            <p className="text-white/90 text-sm">
              일간 <span className="font-bold text-lg">{dayStem}</span>의 기운을 가진 사람
            </p>
          </div>
        </motion.div>
      </div>

      {/* Personality Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-6 p-5 bg-gradient-to-br from-purple-900/30 to-indigo-900/30 rounded-xl border border-purple-700/50"
      >
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <h4 className="text-lg font-semibold text-white">기본 성격</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {trait.personality.split(',').map((item, index) => (
            <span
              key={index}
              className="bg-purple-500/20 text-purple-200 px-3 py-1.5 rounded-lg text-sm font-medium border border-purple-500/30"
            >
              {item.trim()}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Strength Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-6 p-5 bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl border border-green-700/50"
      >
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-5 h-5 text-green-400" />
          <h4 className="text-lg font-semibold text-white">강점</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {trait.strength.split(',').map((item, index) => (
            <span
              key={index}
              className="bg-green-500/20 text-green-200 px-3 py-1.5 rounded-lg text-sm font-medium border border-green-500/30"
            >
              <Zap className="w-3 h-3 inline mr-1" />
              {item.trim()}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Weakness Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="p-5 bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-xl border border-orange-700/50"
      >
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle className="w-5 h-5 text-orange-400" />
          <h4 className="text-lg font-semibold text-white">보완할 점</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {trait.weakness.split(',').map((item, index) => (
            <span
              key={index}
              className="bg-orange-500/20 text-orange-200 px-3 py-1.5 rounded-lg text-sm font-medium border border-orange-500/30"
            >
              {item.trim()}
            </span>
          ))}
        </div>
        <p className="mt-3 text-orange-200/70 text-sm">
          이러한 부분을 인지하고 보완하면 더욱 균형 잡힌 삶을 살 수 있습니다.
        </p>
      </motion.div>
    </motion.div>
  );
}
