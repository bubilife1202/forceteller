'use client';

import { motion } from 'framer-motion';
import { Heart, Sparkles, User, Users } from 'lucide-react';
import { NEWYEAR_2026_DATA } from './data';

interface MarriageProps {
  dayStem: string;
}

export default function Marriage({ dayStem }: MarriageProps) {
  const data = NEWYEAR_2026_DATA[dayStem];
  if (!data) return null;

  const scoreColor = data.marriageScore >= 75 ? 'from-rose-400 to-pink-500' :
    data.marriageScore >= 60 ? 'from-pink-400 to-rose-400' : 'from-purple-400 to-pink-400';
  const scoreGrade = data.marriageScore >= 75 ? '최상' : data.marriageScore >= 60 ? '상' : '보통';
  const spouseTraits = data.spouseType.split(',').map(t => t.trim());

  return (
    <motion.div className="glass-strong rounded-3xl p-8 md:p-10" initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
      <div className="absolute top-0 left-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-400/10 rounded-full blur-3xl -z-10" />

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-rose-500/20 to-pink-500/20">
          <Users className="w-7 h-7 text-rose-400" />
        </div>
        <div>
          <h2 className="text-3xl font-bold gradient-text" style={{ fontFamily: "'Noto Serif KR', serif" }}>결혼운</h2>
          <p className="text-slate-400 text-sm">2026 병오년 혼인운</p>
        </div>
      </div>

      <div className={`glass rounded-2xl p-6 mb-8 bg-gradient-to-br ${scoreColor}/10`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-slate-400 mb-1 text-sm">결혼운 점수</p>
            <div className="flex items-end gap-2">
              <span className={`text-5xl font-bold bg-gradient-to-r ${scoreColor} bg-clip-text text-transparent`}>
                {data.marriageScore}
              </span>
              <span className="text-2xl text-slate-400 mb-1">점</span>
            </div>
            <p className="text-lg font-medium text-rose-400 mt-1">{scoreGrade}</p>
          </div>
          <svg width="130" height="130" className="transform -rotate-90">
            <circle cx="65" cy="65" r="55" stroke="currentColor" strokeWidth="10" fill="none" className="text-slate-700" />
            <motion.circle cx="65" cy="65" r="55" stroke="url(#marriageGradient)" strokeWidth="10" fill="none"
              strokeLinecap="round" initial={{ strokeDasharray: '0 345' }}
              whileInView={{ strokeDasharray: `${(data.marriageScore / 100) * 345} 345` }}
              viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.3 }} />
            <defs>
              <linearGradient id="marriageGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fb7185" />
                <stop offset="100%" stopColor="#f472b6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Heart className="w-5 h-5 text-pink-400" />
          <h3 className="font-bold text-white">결혼운 요약</h3>
        </div>
        <p className="text-slate-300 leading-relaxed">{data.marriageSummary}</p>
      </div>

      <div className="glass rounded-2xl p-6 mb-8 bg-gradient-to-br from-rose-500/10 to-pink-500/10 border border-rose-500/30">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-rose-400" />
          <h3 className="font-bold text-white">결혼 조언</h3>
        </div>
        <p className="text-slate-300 leading-relaxed">{data.marriageAdvice}</p>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <User className="w-5 h-5 text-purple-400" />
          <h3 className="font-bold text-white text-lg">배우자 유형</h3>
        </div>
        <p className="text-slate-300 leading-relaxed mb-6">{data.spouseType}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {spouseTraits.map((trait, index) => (
            <motion.div key={index}
              className="glass rounded-xl p-5 bg-gradient-to-br from-pink-500/5 to-rose-500/5 border border-pink-500/20"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500/30 to-pink-500/30 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-rose-400 font-bold">{index + 1}</span>
                </div>
                <p className="text-slate-300 leading-relaxed flex-1">{trait}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
        <h4 className="font-bold text-white mb-3 flex items-center gap-2">
          <Heart className="w-4 h-4 text-pink-400" />
          결혼 성공의 비결
        </h4>
        <p className="text-slate-300 text-sm leading-relaxed">
          {data.marriageScore >= 75 && '올해는 결혼 적기입니다. 서로를 존중하고 이해하는 마음으로 평생의 반려자를 만나보세요.'}
          {data.marriageScore >= 60 && data.marriageScore < 75 && '좋은 결혼운이 함께합니다. 충분히 알아가는 시간을 가지고 신중하게 결정하세요.'}
          {data.marriageScore >= 45 && data.marriageScore < 60 && '결혼은 타이밍과 준비가 중요합니다. 서두르지 말고 차근차근 준비하세요.'}
          {data.marriageScore < 45 && '올해는 자신을 더욱 성장시키는 시기로 삼으세요. 때가 되면 좋은 인연이 찾아옵니다.'}
        </p>
      </div>
    </motion.div>
  );
}
