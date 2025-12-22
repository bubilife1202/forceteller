'use client';

import { motion } from 'framer-motion';
import { Zap, Laptop, Users, Sparkles } from 'lucide-react';
import { WEALTH_2026_BY_STEM } from './data';

interface Income2SideProps {
  dayStem: string;
}

export default function Income2Side({ dayStem }: Income2SideProps) {
  const data = WEALTH_2026_BY_STEM[dayStem] || WEALTH_2026_BY_STEM['갑'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* 부업 추천 */}
      <div className="p-6 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl border border-purple-800/30">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-500/20 rounded-xl">
            <Zap className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">2026년 추천 부업</h3>
            <p className="text-slate-400 text-sm">당신에게 맞는 부수입 아이디어</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {data.sideHustleIdeas.map((idea, idx) => (
            <div key={idx} className="p-4 bg-slate-800/50 rounded-xl flex items-center gap-3">
              <span className="w-8 h-8 bg-purple-500/30 text-purple-300 rounded-lg flex items-center justify-center font-bold">
                {idx + 1}
              </span>
              <span className="text-slate-200">{idea}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 부수입 기회 */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-5 bg-slate-800/50 rounded-2xl border border-slate-700 text-center">
          <Laptop className="w-8 h-8 text-blue-400 mx-auto mb-3" />
          <h4 className="font-bold text-white mb-2">온라인 수입</h4>
          <p className="text-slate-400 text-sm">
            블로그, 유튜브, 온라인 강의 등 디지털 콘텐츠로 수익 창출
          </p>
        </div>
        <div className="p-5 bg-slate-800/50 rounded-2xl border border-slate-700 text-center">
          <Users className="w-8 h-8 text-green-400 mx-auto mb-3" />
          <h4 className="font-bold text-white mb-2">인맥 수입</h4>
          <p className="text-slate-400 text-sm">
            소개, 중개, 컨설팅 등 네트워크를 활용한 수익
          </p>
        </div>
        <div className="p-5 bg-slate-800/50 rounded-2xl border border-slate-700 text-center">
          <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-3" />
          <h4 className="font-bold text-white mb-2">재능 수입</h4>
          <p className="text-slate-400 text-sm">
            특기, 취미를 활용한 프리랜서 활동
          </p>
        </div>
      </div>

      {/* 부업 시작 타이밍 */}
      <div className="p-6 bg-amber-900/20 rounded-2xl border border-amber-800/30">
        <h4 className="font-bold text-amber-300 mb-4">부업 시작 최적 시기</h4>
        <div className="flex flex-wrap gap-3">
          {data.luckyMonths.slice(0, 3).map((month) => (
            <div key={month} className="px-4 py-2 bg-amber-800/30 rounded-xl">
              <span className="text-amber-200 font-bold">{month}월</span>
              <span className="text-slate-400 ml-2">시작 추천</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-slate-300 text-sm">
          위 시기에 새로운 부업을 시작하면 성공 확률이 높습니다.
        </p>
      </div>
    </motion.div>
  );
}
