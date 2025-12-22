'use client';

import { motion } from 'framer-motion';
import { Sparkles, User, Heart, Eye } from 'lucide-react';
import { DAYMASTER_DATA, DayMasterKey } from './data/daymaster';

interface DayMasterIntroProps {
  dayStem: DayMasterKey;
}

export default function DayMasterIntro({ dayStem }: DayMasterIntroProps) {
  const data = DAYMASTER_DATA[dayStem];
  const gradient = data.color;

  return (
    <div className="min-h-screen bg-slate-950 py-16 px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">일간 소개</h1>
          <p className="text-slate-400 text-lg">나를 나타내는 일간의 특성</p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative bg-slate-900/50 backdrop-blur border border-slate-800 rounded-3xl p-12 mb-8 overflow-hidden"
        >
          {/* Background Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5`} />

          {/* Content */}
          <div className="relative z-10">
            {/* Emoji & Title */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                className="text-8xl mb-4"
              >
                {data.emoji}
              </motion.div>
              <div className="flex items-center justify-center gap-4 mb-3">
                <span className="text-6xl font-bold text-white">{dayStem}</span>
                <span className="text-4xl text-slate-400">{data.hanja}</span>
              </div>
              <div className={`text-2xl font-semibold bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-2`}>
                {data.element} - {data.yinyang}
              </div>
              <div className="flex items-center justify-center gap-3 text-slate-400">
                <span className="px-3 py-1 bg-white/5 rounded-full text-sm">
                  {data.element} 오행
                </span>
                <span className="px-3 py-1 bg-white/5 rounded-full text-sm">
                  {data.yinyang}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className={`h-1 bg-gradient-to-r ${gradient} rounded-full mb-8 opacity-50`} />

            {/* Traits Section */}
            <div className="space-y-6">
              {/* 본성 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                    <User className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">본성</h3>
                  <p className="text-slate-300 text-lg leading-relaxed">{data.nature}</p>
                </div>
              </motion.div>

              {/* 핵심 특성 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">핵심 특성</h3>
                  <ul className="space-y-2">
                    {data.coreTraits.map((trait, index) => (
                      <li key={index} className="text-slate-300 flex items-start gap-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <span>{trait}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* 인생관 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">인생철학</h3>
                  <p className="text-slate-300 text-lg leading-relaxed">{data.lifePhilosophy}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Info Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex items-start gap-3 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4"
        >
          <Eye className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
          <p className="text-blue-300 text-sm leading-relaxed">
            일간은 사주팔자에서 나 자신을 나타내는 가장 중요한 요소입니다.
            일간의 특성을 이해하면 자신의 본질과 타고난 성향을 알 수 있습니다.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
