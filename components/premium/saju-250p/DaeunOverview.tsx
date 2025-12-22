'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, AlertCircle } from 'lucide-react';
import { SajuResult } from '@/lib/saju-calculator';

interface DaeunOverviewProps {
  result: SajuResult;
  birthYear: number;
}

export default function DaeunOverview({ result, birthYear }: DaeunOverviewProps) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear + 1;

  // 대운 계산 (10년 주기)
  const daeunStart = Math.floor((age - 1) / 10) * 10 + 1;
  const daeunEnd = daeunStart + 9;
  const daeunProgress = ((age - daeunStart) / 10) * 100;

  const daeunPeriods = [
    { start: 1, end: 10, phase: '초년운', color: 'from-blue-500 to-cyan-500' },
    { start: 11, end: 20, phase: '청년운', color: 'from-green-500 to-emerald-500' },
    { start: 21, end: 30, phase: '성장운', color: 'from-yellow-500 to-amber-500' },
    { start: 31, end: 40, phase: '발전운', color: 'from-orange-500 to-red-500' },
    { start: 41, end: 50, phase: '성숙운', color: 'from-purple-500 to-pink-500' },
    { start: 51, end: 60, phase: '안정운', color: 'from-indigo-500 to-violet-500' },
    { start: 61, end: 70, phase: '원숙운', color: 'from-rose-500 to-pink-500' },
    { start: 71, end: 80, phase: '황혼운', color: 'from-amber-500 to-yellow-500' },
  ];

  const currentDaeun = daeunPeriods.find(d => age >= d.start && age <= d.end);
  const isTransitionPeriod = age % 10 <= 2 || age % 10 >= 9;

  return (
    <div className="space-y-6 p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-slate-700">
      {/* 헤더 */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">대운 개요</h2>
          <p className="text-slate-400 text-sm">인생의 큰 흐름을 파악하세요</p>
        </div>
      </div>

      {/* 현재 대운 상태 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 rounded-xl p-6 border border-slate-700"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-slate-400 text-sm mb-1">현재 대운</p>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              {currentDaeun?.phase}
            </h3>
          </div>
          <div className="text-right">
            <p className="text-slate-400 text-sm">만 {age}세</p>
            <p className="text-white font-semibold">{daeunStart}세 ~ {daeunEnd}세</p>
          </div>
        </div>

        {/* 진행도 바 */}
        <div className="relative h-3 bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${daeunProgress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full bg-gradient-to-r ${currentDaeun?.color} rounded-full`}
          />
        </div>
        <p className="text-slate-400 text-xs mt-2 text-right">{daeunProgress.toFixed(0)}% 진행</p>
      </motion.div>

      {/* 대운 전환기 알림 */}
      {isTransitionPeriod && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5" />
            <div>
              <h4 className="text-amber-400 font-semibold mb-1">대운 전환기</h4>
              <p className="text-amber-200/80 text-sm">
                현재 대운의 전환기입니다. 변화와 새로운 시작을 준비하는 시기로,
                중요한 결정은 신중하게 접근하세요.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* 대운 타임라인 */}
      <div className="space-y-3">
        <h4 className="text-white font-semibold flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          대운 흐름
        </h4>
        <div className="space-y-2">
          {daeunPeriods.map((period, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
                age >= period.start && age <= period.end
                  ? 'bg-slate-700/50 border border-slate-600'
                  : 'bg-slate-800/30'
              }`}
            >
              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${period.color}`} />
              <div className="flex-1">
                <p className={`font-medium ${
                  age >= period.start && age <= period.end ? 'text-white' : 'text-slate-400'
                }`}>
                  {period.phase}
                </p>
              </div>
              <p className={`text-sm ${
                age >= period.start && age <= period.end ? 'text-slate-300' : 'text-slate-500'
              }`}>
                {period.start}세 - {period.end}세
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
