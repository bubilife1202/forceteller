'use client';

import { motion } from 'framer-motion';
import { Coins, Sparkles } from 'lucide-react';
import { YEAR_RELATION } from './data';

interface CoverProps {
  name: string;
  dayStem: string;
}

export default function Cover({ name, dayStem }: CoverProps) {
  const relation = YEAR_RELATION[dayStem] || YEAR_RELATION['갑'];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative min-h-[600px] flex flex-col items-center justify-center text-center p-8 rounded-3xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      }}
    >
      {/* 배경 장식 */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-500 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-amber-500 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500 rounded-full blur-3xl" />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 space-y-8">
        {/* 아이콘 */}
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full shadow-2xl"
        >
          <Coins className="w-12 h-12 text-white" />
        </motion.div>

        {/* 연도 */}
        <div className="space-y-2">
          <p className="text-amber-400 text-lg font-medium">丙午年 병오년</p>
          <p className="text-slate-400">붉은 말의 해</p>
        </div>

        {/* 제목 */}
        <h1 className="text-5xl md:text-6xl font-bold">
          <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 bg-clip-text text-transparent">
            2026
          </span>
          <br />
          <span className="text-white">대박 재물운</span>
        </h1>

        {/* 부제 */}
        <p className="text-xl text-slate-300">
          100페이지 프리미엄 재물 분석서
        </p>

        {/* 사용자 정보 */}
        <div className="mt-12 p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="text-amber-400 font-medium">Special Edition</span>
          </div>
          <p className="text-2xl font-bold text-white mb-2">{name} 님</p>
          <p className="text-slate-400">
            일간: {dayStem}({relation.relation}) | 재물운 점수: {relation.score}점
          </p>
        </div>

        {/* 하단 정보 */}
        <div className="mt-8 text-sm text-slate-500">
          <p>팔자왕 Paljawang</p>
          <p>AI 기반 프리미엄 운세 서비스</p>
        </div>
      </div>
    </motion.div>
  );
}
