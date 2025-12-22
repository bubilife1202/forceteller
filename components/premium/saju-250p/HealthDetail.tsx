'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Brain, Zap, Dumbbell } from 'lucide-react';
import { HEALTH_DATA } from './data';

interface HealthDetailProps {
  dayStem: string;
}

export default function HealthDetail({ dayStem }: HealthDetailProps) {
  const healthInfo = HEALTH_DATA[dayStem as keyof typeof HEALTH_DATA];

  if (!healthInfo) return null;

  return (
    <div className="space-y-6">
      {/* 건강 강점/위험 요소 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-800/30 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <h4 className="font-semibold text-white">건강 강점</h4>
          </div>
          <ul className="space-y-2">
            {healthInfo.healthStrengths.map((strength, index) => (
              <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-br from-red-900/30 to-rose-900/30 border border-red-800/30 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-red-400" />
            <h4 className="font-semibold text-white">위험 요소</h4>
          </div>
          <ul className="space-y-2">
            {healthInfo.healthRisks.map((risk, index) => (
              <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* 정신건강 특성 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border border-purple-800/30 rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">정신건강 특성</h3>
        </div>
        <p className="text-gray-300 leading-relaxed">{healthInfo.mentalHealth}</p>
      </motion.div>

      {/* 스트레스 증상 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-yellow-400" />
          <h3 className="text-lg font-semibold text-white">스트레스 증상</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {healthInfo.stressSymptoms.map((symptom, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="px-3 py-1.5 bg-yellow-600/20 border border-yellow-500/30
                       rounded-lg text-sm text-yellow-300"
            >
              {symptom}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* 추천 운동 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border border-cyan-800/30 rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Dumbbell className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-semibold text-white">추천 운동</h3>
        </div>
        <div className="space-y-3">
          {healthInfo.recommendedExercise.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-cyan-600/10 border border-cyan-500/20 rounded-lg p-4"
            >
              <h4 className="text-cyan-300 font-medium mb-1">{item.exercise}</h4>
              <p className="text-gray-400 text-sm">{item.reason}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
