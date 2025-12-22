'use client';

import { motion } from 'framer-motion';
import { TrendingUp, AlertTriangle, Lightbulb, Briefcase } from 'lucide-react';
import { WEALTH_DATA } from './data';

interface WealthDetailProps {
  dayStem: string;
}

export default function WealthDetail({ dayStem }: WealthDetailProps) {
  const data = WEALTH_DATA[dayStem as keyof typeof WEALTH_DATA];

  if (!data) return null;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">재물운 상세 분석</h2>
        <p className="text-gray-400">당신의 재물 운세를 깊이 있게 분석합니다</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-6 border border-blue-500/20">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-bold text-white">투자 스타일</h3>
        </div>
        <p className="text-gray-300 leading-relaxed">{data.investmentStyle}</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-xl p-6 border border-green-500/20">
          <h3 className="text-xl font-bold text-white mb-4">재물 강점</h3>
          <ul className="space-y-2">
            {data.wealthStrengths.map((strength, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-300">
                <span className="text-green-400 mt-1">•</span>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-orange-900/20 to-red-900/20 rounded-xl p-6 border border-orange-500/20">
          <h3 className="text-xl font-bold text-white mb-4">재물 약점</h3>
          <ul className="space-y-2">
            {data.wealthWeaknesses.map((weakness, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-300">
                <span className="text-orange-400 mt-1">•</span>
                <span>{weakness}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-6 border border-purple-500/20">
        <div className="flex items-center gap-3 mb-4">
          <Lightbulb className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-bold text-white">재물 조언</h3>
        </div>
        <div className="space-y-3">
          {data.wealthAdvice.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-purple-400 text-sm font-bold">{index + 1}</span>
              </div>
              <p className="text-gray-300">{item}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 rounded-xl p-6 border border-yellow-500/20">
        <div className="flex items-center gap-3 mb-4">
          <Briefcase className="w-6 h-6 text-yellow-400" />
          <h3 className="text-xl font-bold text-white">추천 업종</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {data.luckyIndustries.map((sector, index) => (
            <div key={index} className="bg-yellow-500/10 rounded-lg px-4 py-3 text-center border border-yellow-500/20">
              <span className="text-yellow-300 font-medium">{sector}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
