'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Palette, Hash, Compass, Gift, UtensilsCrossed } from 'lucide-react';
import { LUCKY_DATA } from './data';

interface LuckyItemsProps {
  dayStem: string;
}

export default function LuckyItems({ dayStem }: LuckyItemsProps) {
  const luckyInfo = LUCKY_DATA[dayStem as keyof typeof LUCKY_DATA];

  if (!luckyInfo) return null;

  return (
    <div className="space-y-6 p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-slate-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">행운 아이템</h2>
          <p className="text-slate-400 text-sm">당신의 운을 높여줄 특별한 아이템들</p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <Palette className="w-5 h-5 text-pink-400" />
          <h3 className="text-lg font-bold text-white">행운의 색상</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {luckyInfo.luckyColors.map((color, index) => (
            <div key={index} className="flex items-center gap-2 bg-slate-700/50 px-4 py-2 rounded-full">
              <div className="w-6 h-6 rounded-full border-2 border-slate-600" style={{ backgroundColor: color.hex }} />
              <span className="text-white font-medium">{color.name}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <Hash className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-bold text-white">행운의 숫자</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {luckyInfo.luckyNumbers.map((number, index) => (
            <div key={index} className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl">
              <span className="text-white font-bold text-xl">{number}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <Compass className="w-5 h-5 text-green-400" />
          <h3 className="text-lg font-bold text-white">행운의 방향</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {luckyInfo.luckyDirections.map((direction, index) => (
            <span key={index} className="px-4 py-2 bg-green-500/20 text-green-300 rounded-lg border border-green-500/30 font-medium">
              {direction}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <Gift className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-bold text-white">행운의 아이템</h3>
        </div>
        <div className="space-y-3">
          {luckyInfo.luckyItems.map((item, index) => (
            <div key={index} className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h4 className="text-purple-300 font-medium mb-1">{item.item}</h4>
              <p className="text-gray-400 text-sm">{item.reason}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <UtensilsCrossed className="w-5 h-5 text-orange-400" />
          <h3 className="text-lg font-bold text-white">행운의 음식</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {luckyInfo.luckyFoods.map((food, index) => (
            <span key={index} className="px-4 py-2 bg-orange-500/20 text-orange-300 rounded-lg border border-orange-500/30">
              {food}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
