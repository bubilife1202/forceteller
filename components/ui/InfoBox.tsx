'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface InfoBoxProps {
  children: ReactNode;
  variant?: 'green' | 'orange' | 'blue' | 'purple' | 'pink' | 'gradient' | 'primary' | 'secondary';
  className?: string;
}

const variantStyles = {
  green: 'bg-green-500/10 border-green-500/20 text-green-300',
  orange: 'bg-orange-500/10 border-orange-500/20 text-orange-300',
  blue: 'bg-blue-500/10 border-blue-500/20 text-blue-300',
  purple: 'bg-purple-500/10 border-purple-500/20 text-purple-300',
  pink: 'bg-pink-500/10 border-pink-500/20 text-pink-300',
  primary: 'bg-primary/10 border-primary/20 text-primary-foreground',
  secondary: 'bg-secondary/10 border-secondary/20 text-secondary-foreground',
  gradient: 'bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 text-foreground',
};

export default function InfoBox({ children, variant = 'blue', className = '' }: InfoBoxProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'relative p-5 rounded-xl border backdrop-blur-sm',
        'hover:scale-[1.02] transition-transform duration-200',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </motion.div>
  );
}
