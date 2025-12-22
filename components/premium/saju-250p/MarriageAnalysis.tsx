'use client';

import { motion } from 'framer-motion';
import { Heart, User, Lightbulb } from 'lucide-react';
import { LOVE_DATA } from './data';

interface MarriageAnalysisProps {
  dayStem: string;
}

export default function MarriageAnalysis({ dayStem }: MarriageAnalysisProps) {
  const loveInfo = LOVE_DATA[dayStem as keyof typeof LOVE_DATA];

  if (!loveInfo) return null;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-800/30 rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-semibold text-white">결혼관</h3>
        </div>
        <p className="text-gray-300 leading-relaxed">{loveInfo.marriageView}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <User className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-semibold text-white">배우자 특성</h3>
        </div>
        <p className="text-gray-300 leading-relaxed">{loveInfo.spouseTraits}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-yellow-400" />
          <h3 className="text-lg font-semibold text-white">결혼 조언</h3>
        </div>
        <ul className="space-y-3">
          {loveInfo.marriageAdvice.map((advice, index) => (
            <li key={index} className="flex items-start gap-3 text-gray-300">
              <span className="flex-shrink-0 w-6 h-6 bg-yellow-600/20 border border-yellow-500/30 rounded-full flex items-center justify-center text-xs text-yellow-400 mt-0.5">
                {index + 1}
              </span>
              <span className="leading-relaxed">{advice}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
