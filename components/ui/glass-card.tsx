'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'strong' | 'subtle';
  glow?: 'none' | 'gold' | 'purple';
  hover?: boolean;
  animate?: boolean; // 초기 애니메이션 여부
}

const variantStyles = {
  default: 'glass',
  strong: 'glass-strong',
  subtle: 'bg-slate-800/20 backdrop-blur-sm border border-white/5',
};

const glowStyles = {
  none: '',
  gold: 'hover:shadow-[0_0_30px_rgba(251,191,36,0.3)]',
  purple: 'hover:shadow-[0_0_30px_rgba(192,132,252,0.3)]',
};

export default function GlassCard({
  children,
  className = '',
  variant = 'default',
  glow = 'none',
  hover = true,
  animate = true
}: GlassCardProps) {
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 20 } : false}
      animate={animate ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className={cn(
        'rounded-2xl p-8',
        variantStyles[variant],
        hover && 'hover:scale-[1.02] transition-all duration-300',
        glowStyles[glow],
        className
      )}
    >
      {children}
    </motion.div>
  );
}
