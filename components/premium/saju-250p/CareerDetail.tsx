'use client';

import { motion } from 'framer-motion';
import { Briefcase, Users, Target, TrendingUp, Lightbulb } from 'lucide-react';
import { CAREER_DATA } from './data';

interface CareerDetailProps {
  dayStem: string;
}

export default function CareerDetail({ dayStem }: CareerDetailProps) {
  const data = CAREER_DATA[dayStem as keyof typeof CAREER_DATA];

  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-white mb-2">직업운 상세 분석</h2>
        <p className="text-gray-400">당신의 커리어 잠재력을 상세히 분석합니다</p>
      </motion.div>

      {/* 적합 직업 목록 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-xl p-6 border border-cyan-500/20"
      >
        <div className="flex items-center gap-3 mb-4">
          <Briefcase className="w-6 h-6 text-cyan-400" />
          <h3 className="text-xl font-bold text-white">적합 직업 목록</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {data.suitableJobs.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="bg-cyan-500/10 rounded-lg px-4 py-3 border border-cyan-500/20"
            >
              <span className="text-cyan-300 font-medium">{item.job}</span>
              <p className="text-gray-400 text-sm mt-1">{item.reason}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 리더십/팀워크 스타일 */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-6 border border-purple-500/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-purple-400" />
            <h3 className="text-xl font-bold text-white">리더십 스타일</h3>
          </div>
          <p className="text-gray-300 leading-relaxed">{data.leadershipStyle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-xl p-6 border border-blue-500/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-bold text-white">팀워크 스타일</h3>
          </div>
          <p className="text-gray-300 leading-relaxed">{data.teamworkStyle}</p>
        </motion.div>
      </div>

      {/* 커리어 강점/과제 */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-xl p-6 border border-green-500/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-green-400" />
            <h3 className="text-xl font-bold text-white">커리어 강점</h3>
          </div>
          <ul className="space-y-2">
            {data.careerStrengths.map((strength, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-300">
                <span className="text-green-400 mt-1">•</span>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-orange-900/20 to-red-900/20 rounded-xl p-6 border border-orange-500/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-orange-400" />
            <h3 className="text-xl font-bold text-white">커리어 과제</h3>
          </div>
          <ul className="space-y-2">
            {data.careerChallenges.map((challenge, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-300">
                <span className="text-orange-400 mt-1">•</span>
                <span>{challenge}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* 커리어 조언 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl p-6 border border-indigo-500/20"
      >
        <div className="flex items-center gap-3 mb-4">
          <Lightbulb className="w-6 h-6 text-indigo-400" />
          <h3 className="text-xl font-bold text-white">커리어 조언</h3>
        </div>
        <div className="space-y-3">
          {data.careerAdvice.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-indigo-400 text-sm font-bold">{index + 1}</span>
              </div>
              <p className="text-gray-300">{item}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
