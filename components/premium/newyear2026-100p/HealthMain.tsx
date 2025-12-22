'use client';

import { motion } from 'framer-motion';
import { Activity, Heart, AlertCircle, Shield } from 'lucide-react';
import { NEWYEAR_2026_DATA } from './data';

interface HealthMainProps {
  dayStem: string;
}

const organIcons: Record<string, string> = {
  '간': '🫀', '담낭': '💚', '눈': '👁️', '신경': '🧠', '위장': '🫃', '담': '💚',
  '심장': '❤️', '소장': '🫁', '혈관': '🩸', '비장': '🫃', '근육': '💪', '피부': '✨',
  '폐': '🫁', '대장': '🫃', '뼈': '🦴', '신장': '🫘', '방광': '💧', '생식기': '🌸', '허리': '🦴'
};

export default function HealthMain({ dayStem }: HealthMainProps) {
  const data = NEWYEAR_2026_DATA[dayStem];
  if (!data) return null;

  const scoreColor = data.healthScore >= 70 ? 'emerald' : data.healthScore >= 60 ? 'yellow' : 'red';

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <Activity className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">건강운</h2>
            <div className="mt-1 px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-xs rounded inline-block">
              Chapter 06
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-3xl font-bold text-${scoreColor}-400`}>{data.healthScore}</div>
          <div className="text-sm text-gray-400">건강 점수</div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-emerald-500/10 to-green-500/5 border border-emerald-500/20 rounded-xl p-6"
      >
        <div className="flex items-start gap-3">
          <Heart className="w-5 h-5 text-emerald-400 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">종합 건강운</h3>
            <p className="text-gray-300 leading-relaxed">{data.healthSummary}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-800/50 border border-gray-700 rounded-xl p-6"
      >
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-green-400 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">건강 조언</h3>
            <p className="text-green-300 leading-relaxed">{data.healthAdvice}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gray-800/50 border border-gray-700 rounded-xl p-6"
      >
        <div className="flex items-start gap-3 mb-4">
          <AlertCircle className="w-5 h-5 text-orange-400" />
          <h3 className="text-lg font-semibold text-white">주의해야 할 장기</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {data.weakOrgans.map((organ, index) => (
            <motion.div
              key={organ}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 text-center"
            >
              <div className="text-3xl mb-2">{organIcons[organ] || '🫀'}</div>
              <div className="text-orange-300 font-medium">{organ}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
