'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionCardProps {
  children: ReactNode;
  className?: string;
}

export default function SectionCard({ children, className = '' }: SectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "relative bg-card/50 backdrop-blur-xl rounded-3xl shadow-2xl p-8",
        "border border-border/50",
        "hover:shadow-primary/20 hover:shadow-3xl transition-all duration-300",
        "hover:scale-[1.01]",
        className
      )}
    >
      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
