'use client';

import { motion } from 'framer-motion';
import { Briefcase, Target, Building, TrendingUp } from 'lucide-react';
import { CAREER_DATA } from './data';

interface CareerMainProps {
  dayStem: string;
}

export default function CareerMain({ dayStem }: CareerMainProps) {
  const data = CAREER_DATA[dayStem as keyof typeof CAREER_DATA];

  if (!data) return null;

  return (
    <div className="space-y-8">
      {/* 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Briefcase className="w-8 h-8 text-cyan-400" />
          <h2 className="text-3xl font-bold text-white">직업운 분석</h2>
        </div>
        <p className="text-gray-400 text-lg">{data.careerType}</p>
      </motion.div>

      {/* 직업 점수 표시 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-2xl p-8 border border-cyan-500/20"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Target className="w-8 h-8 text-cyan-400" />
            <h3 className="text-2xl font-bold text-white">직업 적성 점수</h3>
          </div>
          <div className="text-5xl font-bold text-cyan-400">{data.careerScore}</div>
        </div>
        <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${data.careerScore}%` }}
            transition={{ delay: 0.3, duration: 1.2 }}
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
          />
        </div>
      </motion.div>

      {/* 적합 직업 목록 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 rounded-xl p-6 border border-purple-500/20"
      >
        <div className="flex items-center gap-3 mb-4">
          <Building className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-bold text-white">적합 직업 분야</h3>
        </div>
        <div className="grid gap-3">
          {data.suitableJobs.slice(0, 6).map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="bg-purple-500/10 rounded-lg px-4 py-3 border border-purple-500/20"
            >
              <span className="text-purple-300 font-medium">{item.job}</span>
              <p className="text-gray-400 text-sm mt-1">{item.reason}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 업무환경 선호도 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gray-800/40 rounded-xl p-6 border border-gray-700"
      >
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-6 h-6 text-cyan-400" />
          <h3 className="text-xl font-bold text-white">선호 업무환경</h3>
        </div>
        <p className="text-gray-300 leading-relaxed">{data.workEnvironment}</p>
      </motion.div>
    </div>
  );
}
