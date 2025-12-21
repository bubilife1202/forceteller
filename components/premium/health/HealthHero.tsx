'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Heart, Activity, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface HealthHeroProps {
  result: SajuResult;
  name: string;
  healthScore: number;
  healthGrade: string;
  keywords: string[];
}

export default function HealthHero({
  result,
  name,
  healthScore,
  healthGrade,
  keywords,
}: HealthHeroProps) {
  const getScoreColor = () => {
    if (healthScore >= 80) return 'from-green-400 to-emerald-500';
    if (healthScore >= 60) return 'from-blue-400 to-cyan-500';
    if (healthScore >= 40) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-rose-500';
  };

  const getGradeEmoji = () => {
    if (healthGrade === '최상') return '💚';
    if (healthGrade === '양호') return '💙';
    if (healthGrade === '보통') return '💛';
    if (healthGrade === '주의') return '🧡';
    return '❤️';
  };

  const getGradeMessage = () => {
    if (healthGrade === '최상') return '매우 건강한 체질입니다. 꾸준한 관리로 건강을 유지하세요!';
    if (healthGrade === '양호') return '건강한 편입니다. 예방 관리에 신경 쓰세요.';
    if (healthGrade === '보통') return '평균적인 건강 상태입니다. 생활습관 개선이 필요합니다.';
    if (healthGrade === '주의') return '건강 관리가 필요합니다. 정기 검진을 받으세요.';
    return '건강 상태를 확인하세요.';
  };

  const getTrendIcon = () => {
    if (healthScore >= 70) return <TrendingUp className="w-6 h-6 text-green-400" />;
    if (healthScore >= 50) return <Minus className="w-6 h-6 text-yellow-400" />;
    return <TrendingDown className="w-6 h-6 text-red-400" />;
  };

  const dayElement = result.day.stem.element;

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-12 relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl -z-10" />

      <div className="text-center mb-8">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
        >
          <Heart className="w-5 h-5 text-green-400" />
          <span className="text-green-400 font-semibold">건강운 종합 분석</span>
        </motion.div>

        <h1
          className="text-4xl md:text-5xl font-bold gradient-text mb-4"
          style={{ fontFamily: "'Noto Serif KR', serif" }}
        >
          {name}님의 건강운
        </h1>

        <p className="text-slate-300 text-lg mb-6">
          오행 체질 기반 맞춤형 건강 가이드
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
              stroke="url(#healthGradient)"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDasharray: '0 628' }}
              animate={{ strokeDasharray: `${(healthScore / 100) * 628} 628` }}
              transition={{ duration: 1.5, delay: 0.7, ease: 'easeOut' }}
            />
            <defs>
              <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#34d399" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold text-green-400">{healthScore}</span>
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
          <span className="text-xl font-bold text-white">{healthGrade}</span>
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
            className="px-4 py-2 bg-slate-800/50 rounded-full text-green-400 border border-green-500/30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 + index * 0.1 }}
          >
            {keyword}
          </motion.span>
        ))}
      </div>

      {/* Constitution Info */}
      <div className="mt-8 grid md:grid-cols-2 gap-4">
        <div className="glass rounded-xl p-5">
          <h4 className="font-bold text-green-400 mb-2 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            일간 오행: {result.day.stem.ko}({dayElement})
          </h4>
          <p className="text-slate-300 text-sm leading-relaxed">
            {dayElement === '목' && '목(木) 체질은 간과 신경계가 중요합니다. 스트레스 관리와 충분한 휴식이 필요하며, 봄철 건강 관리에 특히 신경 쓰세요.'}
            {dayElement === '화' && '화(火) 체질은 심장과 순환기가 중요합니다. 과열되기 쉬우니 열 조절과 수분 섭취에 신경 쓰고, 여름철 건강에 주의하세요.'}
            {dayElement === '토' && '토(土) 체질은 비장과 소화기가 중요합니다. 규칙적인 식사와 소화력 관리가 핵심이며, 환절기 건강 관리가 중요합니다.'}
            {dayElement === '금' && '금(金) 체질은 폐와 호흡기가 중요합니다. 호흡기 건강과 피부 관리에 신경 쓰고, 가을철 건강 관리에 특히 주의하세요.'}
            {dayElement === '수' && '수(水) 체질은 신장과 비뇨기가 중요합니다. 수분 대사와 체온 유지가 중요하며, 겨울철 건강 관리에 신경 쓰세요.'}
          </p>
        </div>
        <div className="glass rounded-xl p-5">
          <h4 className="font-bold text-cyan-400 mb-2 flex items-center gap-2">
            <Heart className="w-5 h-5" />
            건강 운세 핵심
          </h4>
          <p className="text-slate-300 text-sm leading-relaxed">
            {result.yinYangBalance.yang > 60
              ? '음양 균형이 한쪽으로 치우쳐 있습니다. 균형 있는 생활습관으로 조화를 맞추세요.'
              : result.yinYangBalance.yang > 40
              ? '음양 균형이 양호합니다. 현재의 건강한 생활습관을 유지하세요.'
              : '음양 균형이 매우 좋습니다. 타고난 건강 체질이니 잘 관리하면 장수할 수 있습니다.'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
