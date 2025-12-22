'use client';

import { motion } from 'framer-motion';
import { Sparkles, Compass, Hash, Star, Heart, UtensilsCrossed } from 'lucide-react';
import { LUCKY_ITEMS } from './data';

interface LuckyProps {
  dayStem: string;
}

export default function Lucky({ dayStem }: LuckyProps) {
  const luckyData = LUCKY_ITEMS[dayStem as keyof typeof LUCKY_ITEMS];

  if (!luckyData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        {/* Title with Chapter Badge */}
        <div className="flex items-center gap-4 mb-12">
          <span className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-900 rounded-full text-sm font-bold">
            Chapter 08
          </span>
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500">
            행운 아이템
          </h2>
          <Sparkles className="w-8 h-8 text-amber-400" />
        </div>

        <div className="space-y-8">
          {/* Lucky Colors */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-6 h-6 text-amber-400" />
              <h3 className="text-2xl font-bold text-amber-300">행운의 색상</h3>
            </div>
            <div className="flex gap-4 flex-wrap">
              {luckyData.colors.map((colorName, idx) => {
                // 색상명에 따른 실제 색상 코드 매핑
                const colorMap: Record<string, string> = {
                  '초록': '#22c55e', '파랑': '#3b82f6', '검정': '#1e293b', '연두': '#84cc16',
                  '하늘색': '#38bdf8', '빨강': '#ef4444', '자주': '#a855f7', '노랑': '#fbbf24',
                  '분홍': '#f472b6', '보라': '#8b5cf6', '황금': '#f59e0b', '갈색': '#92400e',
                  '베이지': '#d6d3d1', '황토색': '#b45309', '흰색': '#f8fafc', '금색': '#fcd34d',
                  '은색': '#cbd5e1', '남색': '#1e3a8a', '회색': '#6b7280'
                };
                return (
                  <div key={idx} className="flex items-center gap-2">
                    <div
                      className="w-12 h-12 rounded-full border-2 border-amber-400/50 shadow-lg"
                      style={{ backgroundColor: colorMap[colorName] || '#6b7280' }}
                    />
                    <span className="text-lg text-gray-200">{colorName}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Lucky Directions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Compass className="w-6 h-6 text-purple-400" />
              <h3 className="text-2xl font-bold text-purple-300">행운의 방향</h3>
            </div>
            <p className="text-xl text-gray-200">{luckyData.directions.join(', ')}</p>
          </motion.div>

          {/* Lucky Numbers */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Hash className="w-6 h-6 text-amber-400" />
              <h3 className="text-2xl font-bold text-amber-300">행운의 숫자</h3>
            </div>
            <div className="flex gap-3 flex-wrap">
              {luckyData.numbers.map((num, idx) => (
                <div
                  key={idx}
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-xl font-bold text-slate-900 shadow-lg"
                >
                  {num}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Lucky Items */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-6 h-6 text-purple-400" />
              <h3 className="text-2xl font-bold text-purple-300">행운의 아이템</h3>
            </div>
            <ul className="grid grid-cols-2 gap-3">
              {luckyData.items.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-lg text-gray-200">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Lucky Foods */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <UtensilsCrossed className="w-6 h-6 text-amber-400" />
              <h3 className="text-2xl font-bold text-amber-300">행운의 음식</h3>
            </div>
            <p className="text-xl text-gray-200">{luckyData.foods.join(', ')}</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
