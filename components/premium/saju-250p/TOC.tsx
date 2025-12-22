'use client';

import { motion } from 'framer-motion';
import {
  Grid3x3,
  User,
  Zap,
  Users,
  Target,
  TrendingUp,
  GitMerge,
  Star,
  Wallet,
  Briefcase,
  Heart,
  Sparkles
} from 'lucide-react';

const CHAPTERS = [
  { num: '01', title: '사주 원국 분석', icon: Grid3x3, color: 'text-purple-400' },
  { num: '02', title: '일간 성격 분석', icon: User, color: 'text-blue-400' },
  { num: '03', title: '오행 에너지 분석', icon: Zap, color: 'text-amber-400' },
  { num: '04', title: '십신 관계 분석', icon: Users, color: 'text-green-400' },
  { num: '05', title: '격국과 용신', icon: Target, color: 'text-red-400' },
  { num: '06', title: '12운성 분석', icon: TrendingUp, color: 'text-cyan-400' },
  { num: '07', title: '합충형파해', icon: GitMerge, color: 'text-pink-400' },
  { num: '08', title: '신살 분석', icon: Star, color: 'text-yellow-400' },
  { num: '09', title: '재물운 상세', icon: Wallet, color: 'text-emerald-400' },
  { num: '10', title: '직업/사업운', icon: Briefcase, color: 'text-indigo-400' },
  { num: '11', title: '연애/결혼운', icon: Heart, color: 'text-rose-400' },
  { num: '12', title: '건강/행운', icon: Sparkles, color: 'text-violet-400' }
];

export default function TOC() {
  return (
    <div className="min-h-screen bg-slate-950 py-16 px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-white mb-4">목차</h1>
          <p className="text-slate-400 text-lg">12개 챕터로 구성된 완전 분석</p>
        </motion.div>

        {/* Chapter List */}
        <div className="space-y-4">
          {CHAPTERS.map((chapter, idx) => (
            <motion.div
              key={chapter.num}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, x: 10 }}
              className="group relative"
            >
              <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all duration-300">
                <div className="flex items-center gap-6">
                  {/* Chapter Number */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                      <span className="text-2xl font-bold text-slate-400">{chapter.num}</span>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className={`${chapter.color} group-hover:scale-110 transition-transform duration-300`}>
                      <chapter.icon className="w-8 h-8" />
                    </div>
                  </div>

                  {/* Title */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors duration-300">
                      {chapter.title}
                    </h3>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 text-slate-600 group-hover:text-purple-400 transition-colors duration-300">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Hover Glow */}
              <div className={`absolute inset-0 -z-10 blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r ${chapter.color.replace('text-', 'from-')} to-transparent rounded-xl`} />
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 text-center text-slate-500 text-sm"
        >
          각 챕터는 15-25페이지로 구성되어 있습니다
        </motion.div>
      </div>
    </div>
  );
}
