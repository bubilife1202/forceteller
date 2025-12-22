'use client';

import { motion } from 'framer-motion';
import { Sparkles, Apple, Dumbbell, Leaf, Droplets, Sun } from 'lucide-react';
import { NEWYEAR_2026_DATA, LUCKY_ITEMS } from './data';

interface HealthDetailProps {
  dayStem: string;
}

const activityIcons = [Dumbbell, Sun, Leaf, Droplets];
const activities = ['아침 산책', '스트레칭', '요가', '명상'];
const wellness = [
  { icon: '💚', label: '건강' },
  { icon: '🧘', label: '명상' },
  { icon: '🥗', label: '영양' },
  { icon: '💤', label: '수면' }
];

export default function HealthDetail({ dayStem }: HealthDetailProps) {
  const data = NEWYEAR_2026_DATA[dayStem];
  const luckyItems = LUCKY_ITEMS[dayStem];
  if (!data || !luckyItems) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-emerald-500/10 rounded-lg">
          <Sparkles className="w-6 h-6 text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold text-white">건강 관리 팁</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {data.healthTips.map((tip, index) => {
          const Icon = activityIcons[index % activityIcons.length];
          return (
            <motion.div key={index} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 + index * 0.1 }} className="bg-gradient-to-br from-emerald-500/10 to-green-500/5 border border-emerald-500/20 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg flex-shrink-0">
                  <Icon className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <div className="text-sm text-emerald-400 font-medium mb-1">TIP {index + 1}</div>
                  <p className="text-white font-medium">{tip}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Dumbbell className="w-5 h-5 text-green-400" />
          <h3 className="text-lg font-semibold text-white">추천 활동</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {activities.map((activity, index) => (
            <motion.div key={activity} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + index * 0.05 }} className="bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-2.5 text-center">
              <span className="text-green-300 font-medium">{activity}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Apple className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg font-semibold text-white">건강에 좋은 음식</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {luckyItems.foods.map((food, index) => (
            <motion.div key={food} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 + index * 0.05 }} className="bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2">
              <span className="text-emerald-300 font-medium">{food}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="bg-gradient-to-br from-emerald-500/5 to-green-500/10 border border-emerald-500/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 text-center">웰니스 아이콘</h3>
        <div className="flex justify-center gap-8">
          {wellness.map((item, index) => (
            <motion.div key={item.label} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.0 + index * 0.1 }} className="text-center">
              <div className="text-4xl mb-2">{item.icon}</div>
              <div className="text-sm text-emerald-300">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
