'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';

interface CircularScoreProps {
  score: number; // 0-100
  size?: number;
  strokeWidth?: number;
}

export default function CircularScore({
  score,
  size = 200,
  strokeWidth = 12
}: CircularScoreProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = useMotionValue(0);
  const strokeDashoffset = useTransform(
    progress,
    [0, 100],
    [circumference, 0]
  );

  useEffect(() => {
    const controls = animate(count, score, {
      duration: 2,
      ease: 'easeOut',
    });

    const progressControls = animate(progress, score, {
      duration: 2,
      ease: 'easeOut',
    });

    return () => {
      controls.stop();
      progressControls.stop();
    };
  }, [score, count, progress]);

  // 점수에 따른 색상 결정
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-amber-400';
    if (score >= 60) return 'text-purple-400';
    if (score >= 40) return 'text-blue-400';
    return 'text-slate-400';
  };

  const getStrokeColor = (score: number) => {
    if (score >= 80) return '#fbbf24'; // amber-400
    if (score >= 60) return '#c084fc'; // purple-400
    if (score >= 40) return '#60a5fa'; // blue-400
    return '#94a3b8'; // slate-400
  };

  return (
    <motion.div
      className="relative"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(148, 163, 184, 0.2)"
          strokeWidth={strokeWidth}
        />

        {/* Progress Circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getStrokeColor(score)}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset }}
          filter="drop-shadow(0 0 8px currentColor)"
        />
      </svg>

      {/* Score Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div className={`text-6xl font-bold ${getScoreColor(score)}`}>
          {rounded}
        </motion.div>
        <div className="text-sm text-slate-400 mt-1">/ 100</div>
      </div>

      {/* Glow Effect */}
      <div
        className="absolute inset-0 -z-10 blur-3xl opacity-40"
        style={{
          background: `radial-gradient(circle, ${getStrokeColor(score)}, transparent 70%)`
        }}
      />
    </motion.div>
  );
}
