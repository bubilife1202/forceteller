'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Sparkles, Heart, Star } from 'lucide-react';

interface CharmHeroProps {
  result: SajuResult;
  name: string;
  gender: 'male' | 'female';
  charmScore: number;
  charmType: string;
  charmOneLiner: string;
}

export default function CharmHero({
  result,
  name,
  gender,
  charmScore,
  charmType,
  charmOneLiner,
}: CharmHeroProps) {
  const getScoreColor = () => {
    if (charmScore >= 85) return 'from-pink-400 to-rose-500';
    if (charmScore >= 70) return 'from-purple-400 to-pink-500';
    if (charmScore >= 55) return 'from-blue-400 to-purple-500';
    return 'from-slate-400 to-slate-500';
  };

  const getScoreMessage = () => {
    if (charmScore >= 85) return '압도적인 매력! 당신은 타고난 스타입니다';
    if (charmScore >= 70) return '빛나는 매력! 사람들이 당신에게 끌립니다';
    if (charmScore >= 55) return '은은한 매력! 알수록 빠져드는 스타일';
    return '숨겨진 매력! 발견하면 놀라게 됩니다';
  };

  const getTypeEmoji = () => {
    const emojiMap: { [key: string]: string } = {
      '카리스마형': '👑',
      '지적매력형': '🎓',
      '감성매력형': '🎨',
      '친화력형': '🌟',
      '독창성형': '💎',
      '안정감형': '🏔️',
      '열정매력형': '🔥',
      '세련미형': '✨',
    };
    return emojiMap[charmType] || '💫';
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
          <Heart className="w-5 h-5 text-pink-400" />
          <span className="text-pink-400 font-semibold">내 안의 매력 찾기</span>
        </motion.div>

        <h1
          className="text-4xl md:text-5xl font-bold gradient-text mb-4"
          style={{ fontFamily: "'Noto Serif KR', serif" }}
        >
          {name}님만의 특별한 매력
        </h1>

        <p className="text-slate-300 text-lg mb-6">
          사주팔자에 담긴 당신만의 매력 포인트를 발견하세요
        </p>
      </div>

      {/* Score Circle */}
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
              stroke="url(#charmGradient)"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDasharray: '0 628' }}
              animate={{ strokeDasharray: `${(charmScore / 100) * 628} 628` }}
              transition={{ duration: 1.5, delay: 0.7, ease: 'easeOut' }}
            />
            <defs>
              <linearGradient id="charmGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold text-pink-400">{charmScore}</span>
            <span className="text-slate-400 text-sm mt-1">매력 지수</span>
          </div>
        </motion.div>

        {/* Type Badge */}
        <motion.div
          className={`mt-6 px-6 py-3 rounded-full bg-gradient-to-r ${getScoreColor()} flex items-center gap-2`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <span className="text-2xl">{getTypeEmoji()}</span>
          <span className="text-xl font-bold text-white">{charmType}</span>
          <Star className="w-5 h-5 text-white" />
        </motion.div>

        <motion.p
          className="text-slate-300 mt-6 text-center text-lg max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {getScoreMessage()}
        </motion.p>
      </div>

      {/* One-liner */}
      <motion.div
        className="glass rounded-2xl p-6 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
      >
        <div className="flex items-start gap-3">
          <Sparkles className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-amber-400 font-bold mb-2 text-lg">한 줄 정의</h3>
            <p className="text-white text-xl font-medium leading-relaxed">
              &ldquo;{charmOneLiner}&rdquo;
            </p>
          </div>
        </div>
      </motion.div>

      {/* Day Element Info */}
      <div className="mt-8 grid md:grid-cols-2 gap-4">
        <div className="glass rounded-xl p-5">
          <h4 className="font-bold text-pink-400 mb-2 flex items-center gap-2">
            💎 일간: {result.day.stem.ko}({result.day.stem.element})
          </h4>
          <p className="text-slate-300 text-sm leading-relaxed">
            {result.day.stem.element === '목' && '목(木)일간은 성장하는 나무처럼 생명력 넘치고 따뜻한 매력을 가지고 있습니다. 사람들에게 희망과 활력을 주는 존재입니다.'}
            {result.day.stem.element === '화' && '화(火)일간은 타오르는 불꽃처럼 열정적이고 밝은 매력을 가지고 있습니다. 당신의 에너지가 주변을 밝게 만듭니다.'}
            {result.day.stem.element === '토' && '토(土)일간은 대지처럼 든든하고 포근한 매력을 가지고 있습니다. 사람들이 당신 곁에서 안정감을 느낍니다.'}
            {result.day.stem.element === '금' && '금(金)일간은 보석처럼 세련되고 우아한 매력을 가지고 있습니다. 당신의 품격이 돋보입니다.'}
            {result.day.stem.element === '수' && '수(水)일간은 흐르는 물처럼 유연하고 지혜로운 매력을 가지고 있습니다. 깊이 있는 매력이 알수록 드러납니다.'}
          </p>
        </div>
        <div className="glass rounded-xl p-5">
          <h4 className="font-bold text-purple-400 mb-2 flex items-center gap-2">
            ✨ 성별 매력
          </h4>
          <p className="text-slate-300 text-sm leading-relaxed">
            {gender === 'female' && '여성으로서의 부드러움과 우아함이 자연스럽게 드러나며, 사람들에게 긍정적인 인상을 남깁니다.'}
            {gender === 'male' && '남성으로서의 카리스마와 든든함이 돋보이며, 주변 사람들에게 신뢰감을 줍니다.'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
