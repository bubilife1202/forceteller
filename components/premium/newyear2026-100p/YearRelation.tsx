'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Sparkles, Star, CircleDot } from 'lucide-react';
import { YEAR_RELATION } from './data';

interface YearRelationProps {
  dayStem: string;
}

export default function YearRelation({ dayStem }: YearRelationProps) {
  const relation = YEAR_RELATION[dayStem];

  if (!relation) {
    return null;
  }

  const getRelationIcon = () => {
    // relation.relation 형태: '식상운(食傷運)'
    if (relation.relation.includes('식상운')) {
      return <Sparkles className="w-6 h-6" />;
    } else if (relation.relation.includes('비겁운')) {
      return <CircleDot className="w-6 h-6" />;
    } else if (relation.relation.includes('인성운')) {
      return <Star className="w-6 h-6" />;
    } else if (relation.relation.includes('관성운')) {
      return <TrendingUp className="w-6 h-6" />;
    } else if (relation.relation.includes('재성운')) {
      return <TrendingUp className="w-6 h-6" />;
    }
    return <Star className="w-6 h-6" />;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">병오년과의 관계</h2>
        <p className="text-gray-400">2026년 화마(火馬)의 기운과의 조화</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-gradient-to-br from-red-500 to-orange-500 p-3 rounded-xl text-white">
            {getRelationIcon()}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{relation.relation}</h3>
            <p className="text-gray-400 text-sm">{relation.element}</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">조화도</span>
            <span className="text-2xl font-bold text-white">{relation.score}점</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${relation.score}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-800/50 rounded-xl p-4">
            <p className="text-gray-300 leading-relaxed">{relation.description}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 gap-4"
      >
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="text-center">
            <div className="text-3xl mb-2">🔥</div>
            <div className="text-sm text-gray-400 mb-1">병(丙)</div>
            <div className="text-white font-medium">양의 화</div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="text-center">
            <div className="text-3xl mb-2">🐴</div>
            <div className="text-sm text-gray-400 mb-1">오(午)</div>
            <div className="text-white font-medium">화의 기운</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
