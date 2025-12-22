'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Clock, Lightbulb } from 'lucide-react';
import { SajuResult } from '@/lib/saju-calculator';

interface DaeunDetailProps {
  result: SajuResult;
  birthYear: number;
}

const DAEUN_MEANINGS = {
  '초년운': {
    description: '기초를 다지는 시기로, 학습과 성장에 집중하세요.',
    advice: '다양한 경험을 쌓고 인생의 방향을 탐색하는 것이 중요합니다.',
    keywords: ['학습', '성장', '탐색', '기초'],
  },
  '청년운': {
    description: '에너지가 넘치는 시기로, 도전과 모험을 두려워하지 마세요.',
    advice: '적극적으로 기회를 찾고, 실패를 두려워하지 않는 자세가 필요합니다.',
    keywords: ['도전', '열정', '모험', '성취'],
  },
  '성장운': {
    description: '커리어와 인간관계가 본격적으로 형성되는 시기입니다.',
    advice: '장기적인 목표를 세우고, 네트워킹에 힘쓰세요.',
    keywords: ['발전', '네트워킹', '커리어', '관계'],
  },
  '발전운': {
    description: '가장 왕성하게 활동하는 전성기로, 결실을 맺을 때입니다.',
    advice: '지금까지의 노력이 결실을 맺습니다. 리더십을 발휘하세요.',
    keywords: ['전성기', '성공', '리더십', '결실'],
  },
  '성숙운': {
    description: '경험과 지혜가 쌓여 안정적인 시기입니다.',
    advice: '후배 양성과 사회 기여에도 관심을 가져보세요.',
    keywords: ['안정', '지혜', '멘토링', '균형'],
  },
  '안정운': {
    description: '여유롭게 인생을 즐기며 새로운 취미를 찾는 시기입니다.',
    advice: '건강 관리에 신경 쓰고, 가족과의 시간을 소중히 하세요.',
    keywords: ['여유', '건강', '가족', '취미'],
  },
  '원숙운': {
    description: '인생의 지혜가 완성되어 깊은 만족감을 느끼는 시기입니다.',
    advice: '삶의 의미를 되돌아보고, 지혜를 나누는 것에 집중하세요.',
    keywords: ['지혜', '만족', '성찰', '전수'],
  },
  '황혼운': {
    description: '평온하고 고요한 시기로, 내면의 평화를 찾을 때입니다.',
    advice: '영적인 성장과 내면의 평화에 집중하세요.',
    keywords: ['평화', '영성', '고요', '완성'],
  },
};

export default function DaeunDetail({ result, birthYear }: DaeunDetailProps) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear + 1;

  const getCurrentDaeunPhase = (currentAge: number) => {
    if (currentAge <= 10) return '초년운';
    if (currentAge <= 20) return '청년운';
    if (currentAge <= 30) return '성장운';
    if (currentAge <= 40) return '발전운';
    if (currentAge <= 50) return '성숙운';
    if (currentAge <= 60) return '안정운';
    if (currentAge <= 70) return '원숙운';
    return '황혼운';
  };

  const currentPhase = getCurrentDaeunPhase(age);
  const daeunInfo = DAEUN_MEANINGS[currentPhase as keyof typeof DAEUN_MEANINGS];

  const nextPhase = getCurrentDaeunPhase(age + 10);
  const nextDaeunInfo = DAEUN_MEANINGS[nextPhase as keyof typeof DAEUN_MEANINGS];

  return (
    <div className="space-y-6 p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-slate-700">
      {/* 헤더 */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">대운 상세</h2>
          <p className="text-slate-400 text-sm">시기별 운세와 조언</p>
        </div>
      </div>

      {/* 현재 대운 상세 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/30"
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <h3 className="text-xl font-bold text-white">{currentPhase} (현재)</h3>
        </div>

        <p className="text-slate-200 mb-4 leading-relaxed">{daeunInfo.description}</p>

        <div className="bg-slate-800/50 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <h4 className="text-amber-400 font-semibold text-sm">조언</h4>
          </div>
          <p className="text-slate-300 text-sm">{daeunInfo.advice}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {daeunInfo.keywords.map((keyword, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full border border-purple-500/30"
            >
              {keyword}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* 다음 대운 미리보기 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800/50 rounded-xl p-6 border border-slate-700"
      >
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-bold text-white">{nextPhase} (다음)</h3>
        </div>

        <p className="text-slate-300 mb-4 text-sm leading-relaxed">
          {nextDaeunInfo.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {nextDaeunInfo.keywords.map((keyword, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-slate-700/50 text-slate-400 text-sm rounded-full"
            >
              {keyword}
            </span>
          ))}
        </div>
      </motion.div>

      {/* 대운 천간지지 의미 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50"
      >
        <h4 className="text-white font-semibold mb-4">대운 해석의 핵심</h4>
        <div className="space-y-3 text-sm">
          <div className="flex gap-3">
            <div className="w-20 text-slate-400 flex-shrink-0">천간</div>
            <div className="text-slate-300">표면적인 환경과 기회를 나타냅니다</div>
          </div>
          <div className="flex gap-3">
            <div className="w-20 text-slate-400 flex-shrink-0">지지</div>
            <div className="text-slate-300">내면적인 변화와 근본적인 운의 흐름을 의미합니다</div>
          </div>
          <div className="flex gap-3">
            <div className="w-20 text-slate-400 flex-shrink-0">전환기</div>
            <div className="text-slate-300">대운이 바뀌는 전후 2년은 변화의 시기입니다</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
