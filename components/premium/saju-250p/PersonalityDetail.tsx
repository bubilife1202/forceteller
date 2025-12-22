'use client';

import { motion } from 'framer-motion';
import { Users, Briefcase, AlertCircle, Lightbulb } from 'lucide-react';
import { PERSONALITY_DATA } from './data';

interface PersonalityDetailProps {
  dayStem: string;
}

export default function PersonalityDetail({ dayStem }: PersonalityDetailProps) {
  const data = PERSONALITY_DATA[dayStem as keyof typeof PERSONALITY_DATA];

  if (!data) return null;

  const sections = [
    { icon: Users, title: '대인관계 스타일', content: data.socialStyle, color: 'blue' },
    { icon: Briefcase, title: '업무 스타일', content: data.workStyle, color: 'purple' },
    { icon: AlertCircle, title: '스트레스 반응', content: data.stressResponse, color: 'orange' },
    { icon: Lightbulb, title: '성장 조언', content: data.growthAdvice, color: 'green' },
  ];

  const colorClasses: Record<string, string> = {
    blue: 'from-blue-900/30 to-cyan-900/30 border-blue-500/20 text-blue-400',
    purple: 'from-purple-900/30 to-pink-900/30 border-purple-500/20 text-purple-400',
    orange: 'from-orange-900/30 to-red-900/30 border-orange-500/20 text-orange-400',
    green: 'from-green-900/30 to-emerald-900/30 border-green-500/20 text-green-400',
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">성격 상세 분석</h2>
        <p className="text-gray-400">당신의 성격을 다각도로 분석합니다</p>
      </motion.div>

      <div className="space-y-6">
        {sections.map((section, index) => {
          const Icon = section.icon;
          const colorClass = colorClasses[section.color];

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-br ${colorClass.split(' ')[0]} rounded-xl p-6 border ${colorClass.split(' ')[2]}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <Icon className={`w-6 h-6 ${colorClass.split(' ')[3]}`} />
                <h3 className="text-xl font-bold text-white">{section.title}</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">{section.content}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
