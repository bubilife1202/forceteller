'use client';

import { motion } from 'framer-motion';
import { Heart, Activity, AlertCircle } from 'lucide-react';
import { HEALTH_DATA } from './data';

interface HealthMainProps {
  dayStem: string;
}

export default function HealthMain({ dayStem }: HealthMainProps) {
  const healthInfo = HEALTH_DATA[dayStem as keyof typeof HEALTH_DATA];

  if (!healthInfo) return null;

  return (
    <div className="space-y-6">
      {/* 건강 점수 */}
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
              stroke="url(#healthGradient)"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDasharray: '502.4', strokeDashoffset: '502.4' }}
              animate={{
                strokeDashoffset: 502.4 - (502.4 * healthInfo.healthScore) / 100,
              }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
            <defs>
              <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Activity className="w-8 h-8 text-emerald-500 mb-2" />
            <span className="text-3xl font-bold text-white">{healthInfo.healthScore}</span>
            <span className="text-sm text-gray-400">건강 점수</span>
          </div>
        </div>
      </motion.div>

      {/* 체질 설명 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-emerald-900/30 to-green-900/30 border border-emerald-800/30 rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg font-semibold text-white">체질 특성</h3>
        </div>
        <p className="text-gray-300 leading-relaxed">{healthInfo.bodyConstitution}</p>
      </motion.div>

      {/* 취약 장기 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-semibold text-white">취약 장기</h3>
        </div>
        <div className="space-y-3">
          {healthInfo.vulnerableOrgans.map((organ, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-gradient-to-br from-amber-900/30 to-orange-900/30
                       border border-amber-800/30 rounded-lg p-4"
            >
              <div className="text-sm font-medium text-amber-300 mb-1">{organ.organ}</div>
              <p className="text-gray-400 text-sm">{organ.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
