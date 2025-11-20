import { ReactNode } from 'react';

interface InfoBoxProps {
  children: ReactNode;
  variant?: 'green' | 'orange' | 'blue' | 'purple' | 'pink' | 'gradient';
  className?: string;
}

const variantStyles = {
  green: 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300',
  orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300',
  blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300',
  purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300',
  pink: 'bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300',
  gradient: 'bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 text-purple-700 dark:text-purple-300',
};

export default function InfoBox({ children, variant = 'blue', className = '' }: InfoBoxProps) {
  return (
    <div className={`p-5 rounded-xl ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
}
