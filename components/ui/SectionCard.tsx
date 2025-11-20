import { ReactNode } from 'react';

interface SectionCardProps {
  children: ReactNode;
  className?: string;
}

export default function SectionCard({ children, className = '' }: SectionCardProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 card-hover ${className}`}>
      {children}
    </div>
  );
}
