'use client';

import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { WEALTH_DATA } from './data';

interface WealthMainProps {
  dayStem: string;
}

export default function WealthMain({ dayStem }: WealthMainProps) {
  const data = WEALTH_DATA[dayStem as keyof typeof WEALTH_DATA];

  if (!data) return null;

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (data.wealthScore / 100) * circumference;

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <DollarSign className="w-8 h-8 text-yellow-400" />
          <h2 className="text-3xl font-bold text-white">재물운 분석</h2>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="flex justify-center">
        <div className="relative">
          <svg width="200" height="200" className="transform -rotate-90">
            <circle cx="100" cy="100" r={radius} stroke="#374151" strokeWidth="12" fill="none" />
            <motion.circle
              cx="100" cy="100" r={radius}
              stroke="url(#wealthGradient)" strokeWidth="12" fill="none" strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
            <defs>
              <linearGradient id="wealthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FCD34D" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400">{data.wealthScore}</div>
              <div className="text-gray-400 text-sm">재물 점수</div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 rounded-2xl p-8 border border-yellow-500/20">
        <div className="flex items-center gap-2 mb-4">
          <Wallet className="w-6 h-6 text-yellow-400" />
          <h3 className="text-2xl font-bold text-white">재물 유형</h3>
        </div>
        <p className="text-gray-300 text-lg leading-relaxed">{data.wealthType}</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-xl p-6 border border-green-500/20">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-green-400" />
            <h3 className="text-xl font-bold text-white">수입 패턴</h3>
          </div>
          <p className="text-gray-300 leading-relaxed">{data.incomePattern}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-red-900/20 to-pink-900/20 rounded-xl p-6 border border-red-500/20">
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown className="w-6 h-6 text-red-400" />
            <h3 className="text-xl font-bold text-white">지출 패턴</h3>
          </div>
          <p className="text-gray-300 leading-relaxed">{data.spendingHabit}</p>
        </motion.div>
      </div>
    </div>
  );
}
