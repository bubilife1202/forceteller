'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Calendar, AlertTriangle, Stars } from 'lucide-react';
import { LUCKY_DATA } from './data';

interface LuckyAdviceProps {
  dayStem: string;
}

export default function LuckyAdvice({ dayStem }: LuckyAdviceProps) {
  const luckyInfo = LUCKY_DATA[dayStem as keyof typeof LUCKY_DATA];

  if (!luckyInfo) return null;

  return (
    <div className="space-y-6 p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-slate-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl">
          <Lightbulb className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">행운 조언</h2>
          <p className="text-slate-400 text-sm">운을 극대화하는 실용 팁</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-xl p-6 border border-emerald-500/30"
      >
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg font-bold text-white">행운의 시기</h3>
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-slate-400 text-sm mb-2">행운의 날</p>
            <p className="text-emerald-300 font-medium">{luckyInfo.luckyDays}</p>
          </div>
          <div>
            <p className="text-slate-400 text-sm mb-2">행운의 달</p>
            <div className="flex flex-wrap gap-2">
              {luckyInfo.luckyMonths.map((month, index) => (
                <span key={index} className="px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-lg border border-emerald-500/30 font-medium">
                  {month}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl p-6 border border-red-500/30"
      >
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <h3 className="text-lg font-bold text-white">주의사항</h3>
        </div>
        <div className="space-y-4">
          {luckyInfo.avoidColors.length > 0 && (
            <div>
              <p className="text-red-300 text-sm font-medium mb-2">피해야 할 색상</p>
              <div className="flex flex-wrap gap-2">
                {luckyInfo.avoidColors.map((color, index) => (
                  <span key={index} className="px-3 py-1 bg-red-500/20 text-red-300 rounded-lg text-sm border border-red-500/30">
                    {color}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div>
            <p className="text-red-300 text-sm font-medium mb-2">피해야 할 방향</p>
            <p className="text-red-200">{luckyInfo.avoidDirections}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-slate-800/50 rounded-xl p-6 border border-slate-700"
      >
        <div className="flex items-center gap-2 mb-4">
          <Stars className="w-5 h-5 text-yellow-400" />
          <h3 className="text-lg font-bold text-white">실전 행운 팁</h3>
        </div>
        <p className="text-slate-300 leading-relaxed">{luckyInfo.luckyTip}</p>
      </motion.div>
    </div>
  );
}
