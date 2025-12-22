'use client';

import { motion } from 'framer-motion';
import { Home, Heart, Users, Sparkles } from 'lucide-react';
import { NEWYEAR_2026_DATA } from './data';

interface FamilyMainProps {
  dayStem: string;
}

export default function FamilyMain({ dayStem }: FamilyMainProps) {
  const data = NEWYEAR_2026_DATA[dayStem] || NEWYEAR_2026_DATA['갑'];

  // 가정운 점수에 따른 등급
  const getGrade = (score: number) => {
    if (score >= 80) return { text: '대길', color: 'text-orange-400', bgColor: 'bg-orange-500/20', borderColor: 'border-orange-500/30' };
    if (score >= 70) return { text: '상승', color: 'text-amber-400', bgColor: 'bg-amber-500/20', borderColor: 'border-amber-500/30' };
    if (score >= 60) return { text: '안정', color: 'text-yellow-400', bgColor: 'bg-yellow-500/20', borderColor: 'border-yellow-500/30' };
    return { text: '주의', color: 'text-slate-400', bgColor: 'bg-slate-500/20', borderColor: 'border-slate-500/30' };
  };

  const grade = getGrade(data.familyScore);

  // 화목도 팁
  const harmonyTips = [
    { icon: Heart, title: '소통 시간', desc: '매주 가족 회의나 대화 시간을 정기적으로 가지세요', color: 'text-rose-400' },
    { icon: Users, title: '함께하기', desc: '주말마다 함께하는 활동을 계획하세요', color: 'text-orange-400' },
    { icon: Sparkles, title: '감사 표현', desc: '작은 일에도 감사를 자주 표현하세요', color: 'text-amber-400' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* 챕터 헤더 */}
      <div className="flex items-center gap-4 pb-4 border-b border-slate-700">
        <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium">
          Chapter
        </span>
        <h2 className="text-2xl font-bold text-white">가정운</h2>
      </div>

      {/* 가정운 점수 */}
      <div className={`p-6 bg-gradient-to-br from-orange-900/30 to-amber-900/30 rounded-2xl border ${grade.borderColor}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 ${grade.bgColor} rounded-xl`}>
              <Home className={`w-6 h-6 ${grade.color}`} />
            </div>
            <div>
              <p className="text-orange-400 text-sm">2026년 가정운</p>
              <h3 className="text-xl font-bold text-white">가족 화목도</h3>
            </div>
          </div>
          <div className="text-right">
            <p className={`text-3xl font-bold ${grade.color}`}>{data.familyScore}점</p>
            <p className={`${grade.color} text-sm font-medium`}>{grade.text}</p>
          </div>
        </div>
        <div className="w-full h-3 bg-slate-700/50 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${data.familyScore}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-orange-500 to-amber-500"
          />
        </div>
      </div>

      {/* 가정운 요약 */}
      <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
        <h4 className="font-bold text-white mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-400" />
          가정운 총평
        </h4>
        <p className="text-slate-300 leading-relaxed mb-4">{data.familySummary}</p>
        <div className="p-4 bg-orange-900/20 rounded-xl border border-orange-800/30">
          <p className="text-sm text-orange-400 font-medium mb-2">조언</p>
          <p className="text-slate-300 leading-relaxed">{data.familyAdvice}</p>
        </div>
      </div>

      {/* 가족 화목 팁 */}
      <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
        <h4 className="font-bold text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          가족 화목 실천법
        </h4>
        <div className="grid gap-4">
          {harmonyTips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 p-4 bg-slate-700/50 rounded-xl"
            >
              <div className={`p-2 bg-slate-800 rounded-lg`}>
                <tip.icon className={`w-5 h-5 ${tip.color}`} />
              </div>
              <div className="flex-1">
                <h5 className={`font-semibold ${tip.color} mb-1`}>{tip.title}</h5>
                <p className="text-slate-400 text-sm">{tip.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
