'use client';

import { motion } from 'framer-motion';
import { Heart, Sparkles, Target } from 'lucide-react';
import { LOVE_DATA } from './data';

interface LoveMainProps {
  dayStem: string;
}

export default function LoveMain({ dayStem }: LoveMainProps) {
  const loveInfo = LOVE_DATA[dayStem as keyof typeof LOVE_DATA];

  if (!loveInfo) return null;

  return (
    <div className="space-y-6">
      {/* 연애 점수 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative flex items-center justify-center"
      >
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="80"
              stroke="#1f2937"
              strokeWidth="12"
              fill="none"
            />
            <motion.circle
              cx="96"
              cy="96"
              r="80"
              stroke="url(#loveGradient)"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDasharray: '502.4', strokeDashoffset: '502.4' }}
              animate={{
                strokeDashoffset: 502.4 - (502.4 * loveInfo.loveScore) / 100,
              }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
            <defs>
              <linearGradient id="loveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#f43f5e" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Heart className="w-8 h-8 text-pink-500 mb-2" />
            <span className="text-3xl font-bold text-white">{loveInfo.loveScore}</span>
            <span className="text-sm text-gray-400">연애 점수</span>
          </div>
        </div>
      </motion.div>

      {/* 연애 스타일 요약 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-pink-900/30 to-rose-900/30 border border-pink-800/30 rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-pink-400" />
          <h3 className="text-lg font-semibold text-white">연애 스타일</h3>
        </div>
        <p className="text-gray-300 leading-relaxed">{loveInfo.loveStyle}</p>
      </motion.div>

      {/* 이상형 특성 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-pink-400" />
          <h3 className="text-lg font-semibold text-white">이상형 특성</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {loveInfo.idealPartner.map((trait, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="px-4 py-2 bg-gradient-to-r from-pink-600/20 to-rose-600/20
                       border border-pink-500/30 rounded-full text-sm text-pink-300"
            >
              {trait}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
