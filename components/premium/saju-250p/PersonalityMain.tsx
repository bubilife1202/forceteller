'use client';

import { motion } from 'framer-motion';
import { User, TrendingUp, TrendingDown, Sparkles } from 'lucide-react';
import { PERSONALITY_DATA } from './data';

interface PersonalityMainProps {
  dayStem: string;
}

export default function PersonalityMain({ dayStem }: PersonalityMainProps) {
  const data = PERSONALITY_DATA[dayStem as keyof typeof PERSONALITY_DATA];

  if (!data) return null;

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <User className="w-8 h-8 text-purple-400" />
          <h2 className="text-3xl font-bold text-white">성격 분석</h2>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-2xl p-8 border border-purple-500/20"
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-purple-400" />
          <h3 className="text-2xl font-bold text-white">핵심 성격</h3>
        </div>
        <p className="text-gray-300 text-lg leading-relaxed">{data.mainPersonality}</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-xl p-6 border border-green-500/20"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-green-400" />
            <h3 className="text-xl font-bold text-white">강점</h3>
          </div>
          <div className="space-y-3">
            {data.strengths.map((item, index) => (
              <div key={index} className="bg-green-500/10 rounded-lg p-3">
                <h4 className="text-green-300 font-medium mb-1">{item.title}</h4>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-orange-900/20 to-red-900/20 rounded-xl p-6 border border-orange-500/20"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown className="w-6 h-6 text-orange-400" />
            <h3 className="text-xl font-bold text-white">약점</h3>
          </div>
          <div className="space-y-3">
            {data.weaknesses.map((item, index) => (
              <div key={index} className="bg-orange-500/10 rounded-lg p-3">
                <h4 className="text-orange-300 font-medium mb-1">{item.title}</h4>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
