'use client';

import { motion } from 'framer-motion';
import { Users, TrendingUp, Star, MessageCircle } from 'lucide-react';
import { NEWYEAR_2026_DATA } from './data';

interface SocialMainProps {
  dayStem: string;
}

export default function SocialMain({ dayStem }: SocialMainProps) {
  const data = NEWYEAR_2026_DATA[dayStem] || NEWYEAR_2026_DATA['갑'];

  // 대인운 점수에 따른 등급
  const getGrade = (score: number) => {
    if (score >= 80) return { text: '대길', color: 'text-blue-400', bgColor: 'bg-blue-500/20', borderColor: 'border-blue-500/30' };
    if (score >= 70) return { text: '상승', color: 'text-cyan-400', bgColor: 'bg-cyan-500/20', borderColor: 'border-cyan-500/30' };
    if (score >= 60) return { text: '안정', color: 'text-teal-400', bgColor: 'bg-teal-500/20', borderColor: 'border-teal-500/30' };
    return { text: '주의', color: 'text-slate-400', bgColor: 'bg-slate-500/20', borderColor: 'border-slate-500/30' };
  };

  const grade = getGrade(data.socialScore);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* 챕터 헤더 */}
      <div className="flex items-center gap-4 pb-4 border-b border-slate-700">
        <h2 className="text-2xl font-bold text-white">대인관계운</h2>
      </div>

      {/* 대인운 점수 */}
      <div className={`p-6 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl border ${grade.borderColor}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 ${grade.bgColor} rounded-xl`}>
              <Users className={`w-6 h-6 ${grade.color}`} />
            </div>
            <div>
              <p className="text-blue-400 text-sm">2026년 대인관계운</p>
              <h3 className="text-xl font-bold text-white">인맥 확장도</h3>
            </div>
          </div>
          <div className="text-right">
            <p className={`text-3xl font-bold ${grade.color}`}>{data.socialScore}점</p>
            <p className={`${grade.color} text-sm font-medium`}>{grade.text}</p>
          </div>
        </div>
        <div className="w-full h-3 bg-slate-700/50 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${data.socialScore}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
          />
        </div>
      </div>

      {/* 대인운 요약 */}
      <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
        <h4 className="font-bold text-white mb-4 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-cyan-400" />
          대인관계 총평
        </h4>
        <p className="text-slate-300 leading-relaxed mb-4">{data.socialSummary}</p>
        <div className="p-4 bg-blue-900/20 rounded-xl border border-blue-800/30">
          <p className="text-sm text-blue-400 font-medium mb-2">조언</p>
          <p className="text-slate-300 leading-relaxed">{data.socialAdvice}</p>
        </div>
      </div>

      {/* 귀인 유형 */}
      <div className="p-6 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl border border-purple-800/30">
        <h4 className="font-bold text-white mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-purple-400" />
          귀인(貴人) - 나를 도와줄 사람
        </h4>
        <div className="space-y-4">
          <div className="p-4 bg-slate-800/50 rounded-xl">
            <p className="text-sm text-purple-400 font-medium mb-2">귀인 유형</p>
            <p className="text-slate-300 leading-relaxed">{data.guiinType}</p>
          </div>
          <div className="grid gap-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-xl"
            >
              <div className="w-2 h-2 bg-purple-400 rounded-full" />
              <p className="text-slate-300 text-sm">이런 유형의 사람과 자주 교류하세요</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-xl"
            >
              <div className="w-2 h-2 bg-pink-400 rounded-full" />
              <p className="text-slate-300 text-sm">귀인과의 만남은 우연이 아닌 필연입니다</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-xl"
            >
              <div className="w-2 h-2 bg-cyan-400 rounded-full" />
              <p className="text-slate-300 text-sm">관계를 소중히 하고 먼저 도움을 베푸세요</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 인맥 관리 팁 */}
      <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
        <h4 className="font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-400" />
          인맥 관리 전략
        </h4>
        <div className="grid gap-3">
          <div className="flex items-start gap-3 p-4 bg-slate-700/50 rounded-xl">
            <div className="w-8 h-8 flex items-center justify-center bg-blue-500/20 rounded-lg flex-shrink-0">
              <span className="text-blue-400 font-bold text-sm">1</span>
            </div>
            <div>
              <h5 className="text-blue-400 font-semibold mb-1">정기 소통</h5>
              <p className="text-slate-400 text-sm">중요한 인맥과는 최소 한 달에 한 번 연락하세요</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-slate-700/50 rounded-xl">
            <div className="w-8 h-8 flex items-center justify-center bg-cyan-500/20 rounded-lg flex-shrink-0">
              <span className="text-cyan-400 font-bold text-sm">2</span>
            </div>
            <div>
              <h5 className="text-cyan-400 font-semibold mb-1">진정성</h5>
              <p className="text-slate-400 text-sm">이익 관계가 아닌 진심 어린 관심을 표현하세요</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-slate-700/50 rounded-xl">
            <div className="w-8 h-8 flex items-center justify-center bg-teal-500/20 rounded-lg flex-shrink-0">
              <span className="text-teal-400 font-bold text-sm">3</span>
            </div>
            <div>
              <h5 className="text-teal-400 font-semibold mb-1">베풂</h5>
              <p className="text-slate-400 text-sm">받기 전에 먼저 도움을 주는 사람이 되세요</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
