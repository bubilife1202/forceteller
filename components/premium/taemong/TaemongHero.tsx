'use client';

import { motion } from 'framer-motion';
import { Sparkles, Star, Crown } from 'lucide-react';
import { TaemongFormData } from '@/components/TaemongForm';

interface TaemongHeroProps {
  formData: TaemongFormData;
  grade: string;
  gradeScore: number;
  coreMessage: string;
  keywords: string[];
}

export default function TaemongHero({
  formData,
  grade,
  gradeScore,
  coreMessage,
  keywords,
}: TaemongHeroProps) {
  const getGradeColor = () => {
    if (grade === '대길') return 'from-yellow-400 to-amber-500';
    if (grade === '길') return 'from-pink-400 to-rose-500';
    return 'from-blue-400 to-indigo-500';
  };

  const getGradeEmoji = () => {
    if (grade === '대길') return '🌟';
    if (grade === '길') return '✨';
    return '💫';
  };

  const getGradeDescription = () => {
    if (grade === '대길') {
      return '매우 길한 태몽입니다! 아기에게 큰 복이 함께합니다.';
    }
    if (grade === '길') {
      return '좋은 태몽입니다. 건강하고 총명한 아이가 될 것입니다.';
    }
    return '평범하지만 행복한 태몽입니다. 착하고 건강한 아이가 될 것입니다.';
  };

  const getCategoryEmoji = () => {
    const categoryMap: { [key: string]: string } = {
      animal: '🐉',
      plant: '🌸',
      nature: '🌟',
      object: '💎',
      person: '👤',
      other: '✨',
    };
    return categoryMap[formData.dreamCategory] || '✨';
  };

  const getDreamerName = () => {
    const dreamerMap: { [key: string]: string } = {
      self: '본인',
      spouse: '배우자',
      parent: '부모님',
      relative: '친척',
      other: '지인',
    };
    return dreamerMap[formData.dreamer] || '본인';
  };

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-12 relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl -z-10" />

      <div className="text-center mb-8">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
        >
          <Sparkles className="w-5 h-5 text-pink-400" />
          <span className="text-pink-400 font-semibold">태몽 해몽 결과</span>
        </motion.div>

        <h1
          className="text-4xl md:text-5xl font-bold gradient-text mb-4"
          style={{ fontFamily: "'Noto Serif KR', serif" }}
        >
          {formData.name}님의 태몽
        </h1>

        <p className="text-slate-300 text-lg mb-6">
          신비로운 태몽이 예고하는 아기의 미래
        </p>
      </div>

      {/* Dream Info */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="glass rounded-xl p-5">
          <h4 className="font-bold text-pink-400 mb-2 flex items-center gap-2">
            <span className="text-2xl">{getCategoryEmoji()}</span>
            태몽 종류
          </h4>
          <p className="text-slate-300 text-sm">
            {formData.dreamCategory === 'animal' && '동물 태몽'}
            {formData.dreamCategory === 'plant' && '식물 태몽'}
            {formData.dreamCategory === 'nature' && '자연현상 태몽'}
            {formData.dreamCategory === 'object' && '물건 태몽'}
            {formData.dreamCategory === 'person' && '사람 태몽'}
            {formData.dreamCategory === 'other' && '기타 태몽'}
          </p>
        </div>
        <div className="glass rounded-xl p-5">
          <h4 className="font-bold text-purple-400 mb-2 flex items-center gap-2">
            <span className="text-2xl">👥</span>
            꿈을 꾼 분
          </h4>
          <p className="text-slate-300 text-sm">{getDreamerName()}</p>
        </div>
      </div>

      {/* Grade Circle */}
      <div className="flex flex-col items-center my-12">
        <motion.div
          className="relative"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
        >
          <svg width="220" height="220" className="transform -rotate-90">
            <circle
              cx="110"
              cy="110"
              r="100"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              className="text-slate-700"
            />
            <motion.circle
              cx="110"
              cy="110"
              r="100"
              stroke="url(#taemongGradient)"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDasharray: '0 628' }}
              animate={{ strokeDasharray: `${(gradeScore / 100) * 628} 628` }}
              transition={{ duration: 1.5, delay: 0.7, ease: 'easeOut' }}
            />
            <defs>
              <linearGradient id="taemongGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold text-pink-400">{gradeScore}</span>
            <span className="text-slate-400">점</span>
          </div>
        </motion.div>

        {/* Grade Badge */}
        <motion.div
          className={`mt-6 px-8 py-4 rounded-full bg-gradient-to-r ${getGradeColor()} flex items-center gap-3`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <span className="text-3xl">{getGradeEmoji()}</span>
          <span className="text-2xl font-bold text-white">{grade}</span>
          <Crown className="w-7 h-7 text-white" />
        </motion.div>

        <p className="text-slate-300 mt-6 text-center text-lg font-medium max-w-lg">
          {getGradeDescription()}
        </p>
      </div>

      {/* Core Message */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Star className="w-6 h-6 text-yellow-400" />
          핵심 메시지
        </h3>
        <p className="text-slate-200 leading-relaxed text-lg">
          {coreMessage}
        </p>
      </div>

      {/* Keywords */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4 text-center">
          아기의 특성 키워드
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {keywords.map((keyword, index) => (
            <motion.span
              key={keyword}
              className="px-5 py-2.5 bg-slate-800/50 rounded-full text-pink-400 border border-pink-500/30 font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + index * 0.1 }}
            >
              {keyword}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Dream Content Display */}
      <div className="glass rounded-2xl p-6 mt-8">
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span className="text-xl">💭</span>
          꾼 태몽
        </h3>
        <p className="text-slate-300 leading-relaxed">
          {formData.dreamContent}
        </p>
      </div>
    </motion.div>
  );
}
