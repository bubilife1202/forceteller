'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface CoverProps {
  name: string;
  dayStem: string;
}

const STEM_INFO: Record<string, { hanja: string; element: string; color: string }> = {
  '갑': { hanja: '甲', element: '양목', color: 'from-green-500 to-emerald-600' },
  '을': { hanja: '乙', element: '음목', color: 'from-green-400 to-teal-500' },
  '병': { hanja: '丙', element: '양화', color: 'from-red-500 to-orange-600' },
  '정': { hanja: '丁', element: '음화', color: 'from-pink-500 to-rose-600' },
  '무': { hanja: '戊', element: '양토', color: 'from-yellow-500 to-amber-600' },
  '기': { hanja: '己', element: '음토', color: 'from-yellow-600 to-orange-500' },
  '경': { hanja: '庚', element: '양금', color: 'from-slate-300 to-zinc-400' },
  '신': { hanja: '辛', element: '음금', color: 'from-slate-200 to-gray-300' },
  '임': { hanja: '壬', element: '양수', color: 'from-blue-500 to-cyan-600' },
  '계': { hanja: '癸', element: '음수', color: 'from-blue-400 to-indigo-500' }
};

export default function Cover({ name, dayStem }: CoverProps) {
  const stemInfo = STEM_INFO[dayStem] || STEM_INFO['갑'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-[600px] flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-red-950/30 to-slate-900 rounded-3xl overflow-hidden p-8"
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <span className="text-[300px]">🐴</span>
      </div>

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-6 py-2 bg-red-500/20 border border-red-500/30 rounded-full mb-8"
        >
          <span className="text-red-400 font-bold">丙午年</span>
          <span className="text-slate-400">|</span>
          <span className="text-orange-400">붉은 말의 해</span>
        </motion.div>

        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-6xl md:text-7xl font-black mb-4"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-amber-400">
            2026
          </span>
          <br />
          <span className="text-white">신년운세</span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xl text-slate-400 mb-12"
        >
          100페이지 프리미엄 운세 리포트
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="inline-flex flex-col items-center gap-4 p-8 bg-slate-800/50 backdrop-blur rounded-2xl border border-slate-700"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-amber-400" />
            <span className="text-3xl font-bold text-white">{name}</span>
            <span className="text-2xl text-slate-400">님</span>
          </div>
          <div className="flex items-center gap-4">
            <div className={`px-4 py-2 bg-gradient-to-r ${stemInfo.color} rounded-xl`}>
              <span className="text-white font-bold">{dayStem}({stemInfo.hanja})</span>
            </div>
            <span className="text-slate-400">{stemInfo.element} 일간</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 flex flex-col items-center gap-2"
        >
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-500">
            팔자왕
          </span>
          <a
            href="https://www.threads.com/@palzawang"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-500 hover:text-slate-300 transition"
          >
            @palzawang
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}
