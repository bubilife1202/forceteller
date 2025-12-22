'use client';

import { motion } from 'framer-motion';
import { Heart, MessageCircle, TrendingUp, Users } from 'lucide-react';
import { LOVE_DATA } from './data';

interface LoveDetailProps {
  dayStem: string;
}

export default function LoveDetail({ dayStem }: LoveDetailProps) {
  const loveInfo = LOVE_DATA[dayStem as keyof typeof LOVE_DATA];

  if (!loveInfo) return null;

  return (
    <div className="space-y-6">
      {/* 연애 행동 패턴 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-pink-400" />
          <h3 className="text-lg font-semibold text-white">연애 행동 패턴</h3>
        </div>
        <p className="text-gray-300 leading-relaxed">{loveInfo.datingBehavior}</p>
      </motion.div>

      {/* 애정 표현 방식 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="w-5 h-5 text-pink-400" />
          <h3 className="text-lg font-semibold text-white">애정 표현 방식</h3>
        </div>
        <p className="text-gray-300 leading-relaxed">{loveInfo.expressionStyle}</p>
      </motion.div>

      {/* 연애 강점/과제 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-800/30 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <h4 className="font-semibold text-white">연애 강점</h4>
          </div>
          <ul className="space-y-2">
            {loveInfo.loveStrengths.map((strength, index) => (
              <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 border border-amber-800/30 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-amber-400" />
            <h4 className="font-semibold text-white">연애 과제</h4>
          </div>
          <ul className="space-y-2">
            {loveInfo.loveChallenges.map((challenge, index) => (
              <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                <span className="text-amber-400 mt-1">•</span>
                <span>{challenge}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* 궁합 좋은 일간 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-800/30 rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">궁합 좋은 일간</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {loveInfo.compatibleStems.map((stem, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-purple-600/20 border border-purple-500/30
                       rounded-lg text-lg font-medium text-purple-300"
            >
              {stem}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
