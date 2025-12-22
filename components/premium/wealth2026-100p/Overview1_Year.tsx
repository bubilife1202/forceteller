'use client';

import { motion } from 'framer-motion';
import { Sun, Flame, Calendar } from 'lucide-react';
import { YEAR_RELATION } from './data';

interface Overview1YearProps {
  dayStem: string;
}

export default function Overview1Year({ dayStem }: Overview1YearProps) {
  const relation = YEAR_RELATION[dayStem] || YEAR_RELATION['갑'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* 챕터 헤더 */}
      <div className="flex items-center gap-4 pb-4 border-b border-slate-700">
        <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium">
          Chapter 1
        </span>
        <h2 className="text-2xl font-bold text-white">2026년 병오년 개요</h2>
      </div>

      {/* 병오년 설명 */}
      <div className="p-6 bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-2xl border border-red-800/30">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-red-500/20 rounded-xl">
            <Flame className="w-8 h-8 text-red-400" />
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white">丙午年 병오년</h3>
            <p className="text-slate-300 leading-relaxed">
              2026년은 <span className="text-red-400 font-bold">병오년(丙午年)</span>, 붉은 말의 해입니다.
              천간 병(丙)은 태양의 불을, 지지 오(午)는 말을 상징합니다.
              화(火) 기운이 2배로 강한 해로, 열정과 에너지가 넘치는 한 해가 될 것입니다.
            </p>
          </div>
        </div>
      </div>

      {/* 오행 에너지 */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <Sun className="w-6 h-6 text-orange-400" />
            <h4 className="text-lg font-bold text-white">천간: 병(丙)</h4>
          </div>
          <p className="text-slate-300">
            태양을 상징하는 양(陽)의 불입니다.
            밝고 화려하며 적극적인 에너지를 가집니다.
            재물에서는 과감한 투자와 확장을 의미합니다.
          </p>
        </div>

        <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-6 h-6 text-red-400" />
            <h4 className="text-lg font-bold text-white">지지: 오(午)</h4>
          </div>
          <p className="text-slate-300">
            말(馬)을 상징하며 음력 5월에 해당합니다.
            활동적이고 진취적인 에너지를 가집니다.
            빠른 움직임과 변화를 의미합니다.
          </p>
        </div>
      </div>

      {/* 나와의 관계 */}
      <div className="p-6 bg-gradient-to-br from-amber-900/30 to-yellow-900/30 rounded-2xl border border-amber-800/30">
        <h3 className="text-xl font-bold text-white mb-4">
          {dayStem}일간과 2026년의 관계
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="px-4 py-2 bg-amber-500/30 text-amber-300 rounded-xl font-bold text-lg">
              {relation.relation}
            </span>
            <span className="text-3xl font-bold text-white">{relation.score}점</span>
          </div>
          <p className="text-slate-300 leading-relaxed">{relation.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}
