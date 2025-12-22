'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Sparkles, TrendingUp, AlertCircle, Shield } from 'lucide-react';

interface TwelveCyclesMainProps {
  result: SajuResult;
}

const CYCLE_INFO: Record<string, { emoji: string; color: string; meaning: string; level: 'high' | 'medium' | 'low' }> = {
  장생: { emoji: '🌱', color: 'from-green-400 to-emerald-500', meaning: '새로운 시작', level: 'high' },
  목욕: { emoji: '💧', color: 'from-blue-400 to-cyan-500', meaning: '성장 준비', level: 'medium' },
  관대: { emoji: '👑', color: 'from-purple-400 to-indigo-500', meaning: '왕성한 활동', level: 'high' },
  건록: { emoji: '💪', color: 'from-orange-400 to-amber-500', meaning: '전성기', level: 'high' },
  제왕: { emoji: '⚡', color: 'from-yellow-400 to-orange-500', meaning: '최고 정점', level: 'high' },
  쇠: { emoji: '🍂', color: 'from-amber-400 to-orange-500', meaning: '하락 시작', level: 'medium' },
  병: { emoji: '💊', color: 'from-red-400 to-pink-500', meaning: '약화', level: 'low' },
  사: { emoji: '🌙', color: 'from-slate-400 to-gray-500', meaning: '침체', level: 'low' },
  묘: { emoji: '⚰️', color: 'from-gray-500 to-slate-600', meaning: '저장 정리', level: 'low' },
  절: { emoji: '❄️', color: 'from-cyan-400 to-blue-500', meaning: '끊김', level: 'low' },
  태: { emoji: '🥚', color: 'from-pink-400 to-rose-500', meaning: '잉태', level: 'medium' },
  양: { emoji: '🌸', color: 'from-rose-400 to-pink-500', meaning: '양육', level: 'medium' },
};

export default function TwelveCyclesMain({ result }: TwelveCyclesMainProps) {
  const cycles = [
    { pillar: '년주', cycle: result.twelveCycles.year, label: '선조·부모' },
    { pillar: '월주', cycle: result.twelveCycles.month, label: '형제·청년' },
    { pillar: '일주', cycle: result.twelveCycles.day, label: '본인·배우자' },
    { pillar: '시주', cycle: result.twelveCycles.hour, label: '자녀·노년' },
  ];

  const getScoreByLevel = (level: 'high' | 'medium' | 'low') => {
    if (level === 'high') return 85;
    if (level === 'medium') return 60;
    return 35;
  };

  const averageScore = Math.round(
    cycles.reduce((sum, c) => sum + getScoreByLevel(CYCLE_INFO[c.cycle]?.level || 'medium'), 0) / 4
  );

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <h2
          className="text-3xl font-bold gradient-text"
          style={{ fontFamily: "'Noto Serif KR', serif" }}
        >
          12운성 인생 주기
        </h2>
      </div>

      <p className="text-center text-slate-300 mb-8 leading-relaxed">
        12운성은 인생의 흐름을 12단계로 나타냅니다. 각 기둥마다 다른 운성을 갖습니다.
      </p>

      <div className="glass rounded-2xl p-6 mb-8 border border-violet-400/30">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-violet-400">종합 운세 점수</h3>
          <div className="flex items-center gap-2">
            <div className="text-3xl font-bold gradient-text">{averageScore}</div>
            <div className="text-slate-400">/100</div>
          </div>
        </div>
        <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
            initial={{ width: 0 }}
            whileInView={{ width: `${averageScore}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {cycles.map((item, index) => {
          const info = CYCLE_INFO[item.cycle] || CYCLE_INFO['장생'];
          const score = getScoreByLevel(info.level);

          return (
            <motion.div
              key={index}
              className="glass rounded-2xl p-6 border border-slate-700 hover:border-violet-400/50 transition-all"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center text-2xl shadow-lg`}>
                  {info.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-slate-400">{item.pillar}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      info.level === 'high' ? 'bg-green-500/20 text-green-400' :
                      info.level === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {score}점
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-100 mb-1">{item.cycle}</h3>
                  <p className="text-slate-400 text-sm mb-3">{item.label}</p>
                  <p className="text-slate-300 text-sm leading-relaxed">{info.meaning}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <div className="glass rounded-xl p-4 border border-green-400/30">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <h4 className="font-semibold text-green-400">왕성한 운</h4>
          </div>
          <p className="text-slate-300 text-sm">장생·관대·건록·제왕</p>
        </div>

        <div className="glass rounded-xl p-4 border border-amber-400/30">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-amber-400" />
            <h4 className="font-semibold text-amber-400">변화의 운</h4>
          </div>
          <p className="text-slate-300 text-sm">목욕·쇠·태·양</p>
        </div>

        <div className="glass rounded-xl p-4 border border-red-400/30">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-red-400" />
            <h4 className="font-semibold text-red-400">주의의 운</h4>
          </div>
          <p className="text-slate-300 text-sm">병·사·묘·절</p>
        </div>
      </div>
    </motion.div>
  );
}
