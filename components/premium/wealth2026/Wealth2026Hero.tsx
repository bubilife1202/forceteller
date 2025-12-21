'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Sparkles, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Wealth2026HeroProps {
  result: SajuResult;
  name: string;
  wealthScore: number;
  wealthGrade: string;
  keywords: string[];
}

export default function Wealth2026Hero({
  result,
  name,
  wealthScore,
  wealthGrade,
  keywords,
}: Wealth2026HeroProps) {
  const getScoreColor = () => {
    if (wealthScore >= 80) return 'from-yellow-400 to-amber-500';
    if (wealthScore >= 60) return 'from-emerald-400 to-green-500';
    if (wealthScore >= 40) return 'from-blue-400 to-indigo-500';
    return 'from-slate-400 to-slate-500';
  };

  const getGradeEmoji = () => {
    if (wealthGrade === '대박') return '🎉';
    if (wealthGrade === '상승') return '📈';
    if (wealthGrade === '안정') return '💎';
    if (wealthGrade === '주의') return '⚠️';
    return '💰';
  };

  const getGradeMessage = () => {
    if (wealthGrade === '대박') return '올해 큰 재물이 들어올 운입니다!';
    if (wealthGrade === '상승') return '꾸준히 재물이 늘어나는 해입니다.';
    if (wealthGrade === '안정') return '현상 유지하며 내실을 다지세요.';
    if (wealthGrade === '주의') return '지출 관리에 신경 쓰세요.';
    return '재물운을 확인하세요.';
  };

  const getTrendIcon = () => {
    if (wealthScore >= 70) return <TrendingUp className="w-6 h-6 text-green-400" />;
    if (wealthScore >= 50) return <Minus className="w-6 h-6 text-yellow-400" />;
    return <TrendingDown className="w-6 h-6 text-red-400" />;
  };

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-12 relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl -z-10" />

      <div className="text-center mb-8">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-full mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
        >
          <Sparkles className="w-5 h-5 text-yellow-400" />
          <span className="text-yellow-400 font-semibold">2026 丙午年 재물운</span>
        </motion.div>

        <h1
          className="text-4xl md:text-5xl font-bold gradient-text mb-4"
          style={{ fontFamily: "'Noto Serif KR', serif" }}
        >
          {name}님의 대박 재물운
        </h1>

        <p className="text-slate-300 text-lg mb-6">
          병오년 붉은 말의 해, 당신의 재물운을 상세히 분석합니다
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
              stroke="url(#wealthGradient)"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDasharray: '0 628' }}
              animate={{ strokeDasharray: `${(wealthScore / 100) * 628} 628` }}
              transition={{ duration: 1.5, delay: 0.7, ease: 'easeOut' }}
            />
            <defs>
              <linearGradient id="wealthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold text-amber-400">{wealthScore}</span>
            <span className="text-slate-400">점</span>
          </div>
        </motion.div>

        {/* Grade Badge */}
        <motion.div
          className={`mt-6 px-6 py-3 rounded-full bg-gradient-to-r ${getScoreColor()} flex items-center gap-2`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <span className="text-2xl">{getGradeEmoji()}</span>
          <span className="text-xl font-bold text-white">{wealthGrade}</span>
          {getTrendIcon()}
        </motion.div>

        <p className="text-slate-300 mt-4 text-center text-lg">
          {getGradeMessage()}
        </p>
      </div>

      {/* Keywords */}
      <div className="flex flex-wrap justify-center gap-3 mt-8">
        {keywords.map((keyword, index) => (
          <motion.span
            key={keyword}
            className="px-4 py-2 bg-slate-800/50 rounded-full text-amber-400 border border-amber-500/30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 + index * 0.1 }}
          >
            {keyword}
          </motion.span>
        ))}
      </div>

      {/* Day Element Info */}
      <div className="mt-8 grid md:grid-cols-2 gap-4">
        <div className="glass rounded-xl p-5">
          <h4 className="font-bold text-amber-400 mb-2 flex items-center gap-2">
            💎 일간: {result.day.stem.ko}({result.day.stem.element})
          </h4>
          <p className="text-slate-300 text-sm leading-relaxed">
            {result.day.stem.element === '목' && '목(木)일간은 성장과 확장의 기운으로, 새로운 사업이나 투자에서 성장 가능성이 높습니다.'}
            {result.day.stem.element === '화' && '화(火)일간은 열정과 추진력으로, 적극적인 재테크와 사업 확장에 유리합니다.'}
            {result.day.stem.element === '토' && '토(土)일간은 안정과 신뢰로, 부동산이나 장기 투자에서 좋은 결과를 얻습니다.'}
            {result.day.stem.element === '금' && '금(金)일간은 정밀함과 결단력으로, 정확한 투자 타이밍을 잡는 능력이 있습니다.'}
            {result.day.stem.element === '수' && '수(水)일간은 지혜와 유연성으로, 다양한 재테크 방법을 활용할 수 있습니다.'}
          </p>
        </div>
        <div className="glass rounded-xl p-5">
          <h4 className="font-bold text-cyan-400 mb-2 flex items-center gap-2">
            🐴 병오년과의 관계
          </h4>
          <p className="text-slate-300 text-sm leading-relaxed">
            {result.day.stem.element === '목' && '목생화(木生火): 당신의 노력이 재물로 변환되는 해입니다. 투자한 만큼 돌아옵니다.'}
            {result.day.stem.element === '화' && '비겁운: 같은 화 기운이 만나 재물 경쟁이 치열할 수 있으나, 열정으로 승부하세요.'}
            {result.day.stem.element === '토' && '화생토(火生土): 재물이 저절로 들어오는 최고의 해! 기회를 놓치지 마세요.'}
            {result.day.stem.element === '금' && '화극금(火克金): 재물 손실 주의. 보수적 투자와 저축에 집중하세요.'}
            {result.day.stem.element === '수' && '수극화(水克火): 재물을 통제하는 힘이 있습니다. 현명한 투자 결정이 가능합니다.'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
