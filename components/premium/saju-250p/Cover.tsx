'use client';

import { motion } from 'framer-motion';
import { Sparkles, BookOpen } from 'lucide-react';

interface CoverProps {
  userName: string;
  dayStem: string;
  dayElement: string;
  gender: 'male' | 'female';
}

export default function Cover({ userName, dayStem, dayElement, gender }: CoverProps) {
  const elementColors = {
    목: 'from-emerald-600 via-green-500 to-teal-600',
    화: 'from-rose-600 via-red-500 to-orange-600',
    토: 'from-amber-600 via-yellow-500 to-orange-600',
    금: 'from-slate-400 via-gray-300 to-zinc-400',
    수: 'from-blue-600 via-cyan-500 to-indigo-600'
  };

  const gradient = elementColors[dayElement as keyof typeof elementColors] || elementColors.목;

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden flex items-center justify-center">
      {/* Animated Background */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20`}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/20 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight
          }}
          animate={{
            y: [null, Math.random() * -200],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}

      {/* Main Content */}
      <div className="relative z-10 text-center px-8">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <BookOpen className="w-20 h-20 text-purple-400" />
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-8 h-8 text-amber-400" />
            </motion.div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent"
        >
          프리미엄 만세력
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-2xl text-slate-300 mb-12"
        >
          250페이지 완전분석 리포트
        </motion.div>

        {/* User Info */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 mb-12"
        >
          <div className="text-4xl font-bold text-white mb-4">{userName}</div>
          <div className="flex items-center justify-center gap-4 text-slate-300">
            <span className="text-lg">일간</span>
            <span className={`text-3xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
              {dayStem}
            </span>
            <span className="text-lg">{dayElement}(金)</span>
            <span className="px-3 py-1 bg-white/10 rounded-full text-sm">
              {gender === 'male' ? '남성' : '여성'}
            </span>
          </div>
        </motion.div>

        {/* Branding */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-slate-400 text-sm"
        >
          Powered by <span className="text-purple-400 font-semibold">팔자왕</span>
        </motion.div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-pink-500/20 to-transparent blur-3xl" />
    </div>
  );
}
