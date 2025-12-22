'use client';

import { motion } from 'framer-motion';
import { Heart, Sparkles, Calendar, Users } from 'lucide-react';
import { NEWYEAR_2026_DATA } from './data';

interface LoveMainProps {
  dayStem: string;
}

export default function LoveMain({ dayStem }: LoveMainProps) {
  const data = NEWYEAR_2026_DATA[dayStem];
  if (!data) return null;

  const scoreColor = data.loveScore >= 75 ? 'from-pink-400 to-rose-500' :
    data.loveScore >= 60 ? 'from-rose-400 to-pink-500' : 'from-purple-400 to-pink-400';
  const scoreGrade = data.loveScore >= 75 ? '최상' : data.loveScore >= 60 ? '상' : '보통';

  return (
    <motion.div className="glass-strong rounded-3xl p-8 md:p-10" initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-400/10 rounded-full blur-3xl -z-10" />

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-pink-500/20 to-rose-500/20">
            <Heart className="w-7 h-7 text-pink-400" />
          </div>
          <div>
            <h2 className="text-3xl font-bold gradient-text" style={{ fontFamily: "'Noto Serif KR', serif" }}>연애운</h2>
            <p className="text-slate-400 text-sm">2026 병오년 사랑운</p>
          </div>
        </div>
        <div className="px-4 py-2 bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-full border border-rose-500/30">
          <span className="text-rose-400 font-semibold text-sm">Chapter 3</span>
        </div>
      </div>

      {/* Love Score Display */}
      <div className={`glass rounded-2xl p-6 mb-8 bg-gradient-to-br ${scoreColor}/10`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 mb-1 text-sm">연애운 점수</p>
            <div className="flex items-end gap-2">
              <span className={`text-5xl font-bold bg-gradient-to-r ${scoreColor} bg-clip-text text-transparent`}>
                {data.loveScore}
              </span>
              <span className="text-2xl text-slate-400 mb-1">점</span>
            </div>
            <p className="text-lg font-medium text-pink-400 mt-1">{scoreGrade}</p>
          </div>
          <svg width="120" height="120" className="transform -rotate-90">
            <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="8" fill="none" className="text-slate-700" />
            <motion.circle cx="60" cy="60" r="50" stroke="url(#loveGradient)" strokeWidth="8" fill="none"
              strokeLinecap="round" initial={{ strokeDasharray: '0 314' }}
              whileInView={{ strokeDasharray: `${(data.loveScore / 100) * 314} 314` }}
              viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.3 }} />
            <defs>
              <linearGradient id="loveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f472b6" />
                <stop offset="100%" stopColor="#fb7185" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-rose-400" />
          <h3 className="font-bold text-white">연애운 요약</h3>
        </div>
        <p className="text-slate-300 leading-relaxed">{data.loveSummary}</p>
      </div>

      <div className="glass rounded-2xl p-6 mb-6 bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-pink-500/30">
        <div className="flex items-center gap-2 mb-3">
          <Heart className="w-5 h-5 text-pink-400" />
          <h3 className="font-bold text-white">연애 조언</h3>
        </div>
        <p className="text-slate-300 leading-relaxed">{data.loveAdvice}</p>
      </div>

      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-white">연애 타이밍</h3>
        </div>
        <p className="text-slate-300 leading-relaxed mb-4">{data.loveTiming}</p>
        <div className="flex flex-wrap gap-2">
          {data.loveLuckyMonths.map((month) => (
            <span key={month} className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">{month}월</span>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-5 h-5 text-purple-400" />
          <h3 className="font-bold text-white">이상형</h3>
        </div>
        <p className="text-slate-300 leading-relaxed">{data.idealType}</p>
      </div>
    </motion.div>
  );
}
