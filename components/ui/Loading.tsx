'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function Loading() {
  const messages = [
    '별들의 위치를 계산하고 있습니다...',
    '사주 팔자를 분석하는 중...',
    '운명의 실타래를 풀고 있습니다...',
    '천문을 관측하고 있습니다...',
  ];

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center glass-strong"
    >
      {/* Animated Background Glow */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, rgba(109, 40, 217, 0.15), transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.15), transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(192, 132, 252, 0.15), transparent 50%)',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative flex flex-col items-center gap-8">
        {/* Cosmic Circle Animation */}
        <div className="relative w-40 h-40">
          {/* Outer Ring - Cosmic Violet */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-violet-500 via-purple-500 to-violet-500 bg-clip-border"
            style={{
              background: 'linear-gradient(white, white) padding-box, linear-gradient(90deg, rgba(109, 40, 217, 0.8), rgba(192, 132, 252, 0.8), rgba(109, 40, 217, 0.8)) border-box',
              border: '4px solid transparent',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          {/* Middle Ring - Champagne Gold */}
          <motion.div
            className="absolute inset-4 rounded-full"
            style={{
              background: 'linear-gradient(white, white) padding-box, linear-gradient(90deg, rgba(251, 191, 36, 0.6), rgba(252, 211, 77, 0.6), rgba(251, 191, 36, 0.6)) border-box',
              border: '3px solid transparent',
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          {/* Inner Glow Circle */}
          <motion.div
            className="absolute inset-8 rounded-full glow-purple"
            style={{
              background: 'radial-gradient(circle, rgba(192, 132, 252, 0.4), rgba(109, 40, 217, 0.2))',
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Center Icon */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-16 h-16 text-amber-400" />
          </motion.div>
        </div>

        {/* Loading Text */}
        <motion.div
          className="text-center space-y-3 max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3
            className="text-3xl font-bold gradient-text"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            운명을 읽는 중...
          </h3>
          <motion.p
            className="text-slate-300 text-lg"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {randomMessage}
          </motion.p>
        </motion.div>

        {/* Floating Stars/Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${
                i % 3 === 0 ? 'bg-amber-400' :
                i % 3 === 1 ? 'bg-purple-400' :
                'bg-violet-300'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Progress Dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-amber-400"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
