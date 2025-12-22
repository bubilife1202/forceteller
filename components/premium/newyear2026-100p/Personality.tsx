'use client';

import { motion } from 'framer-motion';
import { TrendingUp, AlertCircle, User, Sparkles } from 'lucide-react';
import { ELEMENT_TRAITS } from './data';

interface PersonalityProps {
  dayStem: string;
}

// 일간별 이모지 매핑
const STEM_EMOJI: Record<string, string> = {
  '갑': '🌲', '을': '🌿', '병': '☀️', '정': '🕯️', '무': '⛰️',
  '기': '🌾', '경': '🗡️', '신': '💎', '임': '🌊', '계': '💧'
};

export default function Personality({ dayStem }: PersonalityProps) {
  const traits = ELEMENT_TRAITS[dayStem];

  if (!traits) {
    return null;
  }

  // 쉼표로 구분된 문자열을 배열로 변환
  const personalities = traits.personality.split(', ');
  const strengths = traits.strength.split(', ');
  const weaknesses = traits.weakness.split(', ');
  const emoji = STEM_EMOJI[dayStem] || '✨';

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium">
            성격 분석
          </span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">나의 성격 특성</h2>
        <p className="text-gray-400">{traits.element} 오행의 특성</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700"
      >
        {/* 오행 정보 */}
        <div className="mb-6 text-center">
          <div className="text-6xl mb-4">{emoji}</div>
          <h3 className="text-2xl font-bold text-white mb-2">{traits.element}</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {personalities.map((p, idx) => (
              <span key={idx} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                {p.trim()}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {/* 강점 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <h4 className="font-semibold text-white">강점</h4>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {strengths.map((strength, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-4"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-green-400" />
                    <span className="text-gray-200">{strength.trim()}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 약점 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-amber-400" />
              <h4 className="font-semibold text-white">주의할 점</h4>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {weaknesses.map((weakness, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl p-4"
                >
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-400" />
                    <span className="text-gray-200">{weakness.trim()}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
