'use client';

import { motion } from 'framer-motion';
import { Apple, Activity, Leaf, AlertTriangle } from 'lucide-react';
import { HEALTH_DATA } from './data';

interface HealthAdviceProps {
  dayStem: string;
}

export default function HealthAdvice({ dayStem }: HealthAdviceProps) {
  const healthInfo = HEALTH_DATA[dayStem as keyof typeof HEALTH_DATA];

  if (!healthInfo) return null;

  return (
    <div className="space-y-6">
      {/* 식이 조언 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-800/30 rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Apple className="w-5 h-5 text-green-400" />
          <h3 className="text-lg font-semibold text-white">식이 조언</h3>
        </div>
        <p className="text-gray-300 leading-relaxed">{healthInfo.dietAdvice}</p>
      </motion.div>

      {/* 운동 추천 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-blue-800/30 rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">추천 운동</h3>
        </div>
        <div className="space-y-3">
          {healthInfo.recommendedExercise.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-blue-600/10 border border-blue-500/20 rounded-lg p-4"
            >
              <h4 className="text-blue-300 font-medium mb-1">{item.exercise}</h4>
              <p className="text-gray-400 text-sm">{item.reason}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 생활 습관 조언 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-teal-900/30 to-cyan-900/30 border border-teal-800/30 rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Leaf className="w-5 h-5 text-teal-400" />
          <h3 className="text-lg font-semibold text-white">생활 습관 조언</h3>
        </div>
        <ul className="space-y-3">
          {healthInfo.lifestyleAdvice.map((advice, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-start gap-3 text-gray-300"
            >
              <span className="flex-shrink-0 w-6 h-6 bg-teal-600/20 border border-teal-500/30
                           rounded-full flex items-center justify-center text-xs text-teal-400 mt-0.5">
                {index + 1}
              </span>
              <span className="leading-relaxed">{advice}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* 건강 위험 요소 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 border border-amber-800/30 rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-semibold text-white">주의해야 할 건강 위험</h3>
        </div>
        <ul className="space-y-2">
          {healthInfo.healthRisks.map((risk, index) => (
            <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
              <span className="text-amber-400 mt-1">•</span>
              <span>{risk}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
