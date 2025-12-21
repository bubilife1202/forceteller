'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Heart, TrendingUp, Minus, TrendingDown } from 'lucide-react';

interface EmotionHeroProps {
  result: SajuResult;
  name: string;
  emotionScore: number;
  emotionType: string;
  keywords: string[];
}

export default function EmotionHero({
  result,
  name,
  emotionScore,
  emotionType,
  keywords,
}: EmotionHeroProps) {
  const getScoreColor = () => {
    if (emotionScore >= 80) return 'from-emerald-400 to-green-500';
    if (emotionScore >= 60) return 'from-cyan-400 to-blue-500';
    if (emotionScore >= 40) return 'from-amber-400 to-orange-500';
    return 'from-rose-400 to-red-500';
  };

  const getTypeEmoji = () => {
    if (emotionType === '성장형') return '🌱';
    if (emotionType === '열정형') return '🔥';
    if (emotionType === '안정형') return '🪨';
    if (emotionType === '절제형') return '💎';
    if (emotionType === '유연형') return '💧';
    return '🌈';
  };

  const getTypeDescription = () => {
    if (emotionType === '성장형')
      return '희망과 성장을 추구하며, 긍정적 변화를 통해 감정을 조절합니다. 새로운 경험과 도전이 감정 안정에 도움이 됩니다.';
    if (emotionType === '열정형')
      return '강렬한 감정 표현과 열정적인 성향을 가집니다. 에너지를 건설적으로 사용할 때 감정이 안정됩니다.';
    if (emotionType === '안정형')
      return '차분하고 중심잡힌 감정을 유지합니다. 안정감을 주는 환경과 규칙적인 생활이 중요합니다.';
    if (emotionType === '절제형')
      return '자기 통제력이 뛰어나며 감정을 이성적으로 다룹니다. 때로는 감정 표현이 필요할 수 있습니다.';
    if (emotionType === '유연형')
      return '감정의 흐름을 자연스럽게 받아들이며 적응력이 높습니다. 다양한 상황에서 유연하게 대처합니다.';
    return '다양한 감정 특성이 조화롭게 균형을 이룹니다. 상황에 따라 적절히 대응할 수 있는 능력이 있습니다.';
  };

  const getStabilityMessage = () => {
    if (emotionScore >= 80) return '매우 안정적인 감정 상태입니다. 현재의 균형을 잘 유지하고 있습니다.';
    if (emotionScore >= 60) return '대체로 균형잡힌 감정을 가지고 있습니다. 꾸준한 관리가 도움이 됩니다.';
    if (emotionScore >= 40) return '감정 관리 연습이 필요합니다. 작은 실천들이 큰 변화를 만듭니다.';
    return '전문가의 도움을 받는 것을 권장합니다. 당신은 혼자가 아닙니다.';
  };

  const getTrendIcon = () => {
    if (emotionScore >= 70) return <TrendingUp className="w-6 h-6 text-emerald-400" />;
    if (emotionScore >= 50) return <Minus className="w-6 h-6 text-cyan-400" />;
    return <TrendingDown className="w-6 h-6 text-amber-400" />;
  };

  // 핵심 특성 분석
  const getCoreCharacteristics = () => {
    const { 목, 화, 토, 금, 수 } = result.elements;
    const chars = [];

    if (목 >= 2) chars.push({ label: '성장 지향', value: '높음', color: 'text-green-400' });
    if (화 >= 2) chars.push({ label: '감정 표현', value: '활발함', color: 'text-red-400' });
    if (토 >= 2) chars.push({ label: '정서 안정', value: '우수함', color: 'text-yellow-400' });
    if (금 >= 2) chars.push({ label: '자기 통제', value: '강함', color: 'text-slate-300' });
    if (수 >= 2) chars.push({ label: '감정 유연성', value: '높음', color: 'text-blue-400' });

    // 음양 균형
    const { yang, yin } = result.yinYangBalance;
    if (yang > yin * 1.5) {
      chars.push({ label: '활동성', value: '매우 높음', color: 'text-orange-400' });
    } else if (yin > yang * 1.5) {
      chars.push({ label: '내면성', value: '매우 높음', color: 'text-purple-400' });
    } else {
      chars.push({ label: '음양 균형', value: '조화로움', color: 'text-emerald-400' });
    }

    return chars.slice(0, 6);
  };

  const characteristics = getCoreCharacteristics();

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-12 relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl -z-10" />

      <div className="text-center mb-8">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
        >
          <Heart className="w-5 h-5 text-cyan-400" />
          <span className="text-cyan-400 font-semibold">사주 감정 관리</span>
        </motion.div>

        <h1
          className="text-4xl md:text-5xl font-bold gradient-text mb-4"
          style={{ fontFamily: "'Noto Serif KR', serif" }}
        >
          {name}님의 감정 프로필
        </h1>

        <p className="text-slate-300 text-lg mb-6">
          사주 오행으로 분석한 당신만의 감정 패턴과 관리 전략
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
              stroke="url(#emotionGradient)"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDasharray: '0 628' }}
              animate={{ strokeDasharray: `${(emotionScore / 100) * 628} 628` }}
              transition={{ duration: 1.5, delay: 0.7, ease: 'easeOut' }}
            />
            <defs>
              <linearGradient id="emotionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold text-cyan-400">{emotionScore}</span>
            <span className="text-slate-400">감정 안정도</span>
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
          <span className="text-xl font-bold text-white">{emotionType}</span>
          {getTrendIcon()}
        </motion.div>

        <p className="text-slate-300 mt-4 text-center text-lg max-w-2xl">
          {getStabilityMessage()}
        </p>
      </div>

      {/* Type Description */}
      <motion.div
        className="glass rounded-2xl p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <h3 className="text-xl font-bold text-cyan-400 mb-3 flex items-center gap-2">
          {getTypeEmoji()} {emotionType} 특성
        </h3>
        <p className="text-slate-300 leading-relaxed">
          {getTypeDescription()}
        </p>
      </motion.div>

      {/* Keywords */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {keywords.map((keyword, index) => (
          <motion.span
            key={keyword}
            className="px-4 py-2 bg-slate-800/50 rounded-full text-cyan-400 border border-cyan-500/30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4 + index * 0.1 }}
          >
            {keyword}
          </motion.span>
        ))}
      </div>

      {/* Core Characteristics */}
      <div className="grid md:grid-cols-3 gap-4">
        {characteristics.map((char, index) => (
          <motion.div
            key={char.label}
            className="glass rounded-xl p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 + index * 0.1 }}
          >
            <div className="text-slate-400 text-sm mb-1">{char.label}</div>
            <div className={`font-bold text-lg ${char.color}`}>{char.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Element Info */}
      <div className="mt-8 grid md:grid-cols-2 gap-4">
        <div className="glass rounded-xl p-5">
          <h4 className="font-bold text-purple-400 mb-2 flex items-center gap-2">
            🧬 일간: {result.day.stem.ko}({result.day.stem.element})
          </h4>
          <p className="text-slate-300 text-sm leading-relaxed">
            {result.day.stem.element === '목' && '목(木)일간은 성장과 확장의 기운으로 희망적이고 긍정적인 감정을 가집니다. 변화와 발전을 통해 감정적 만족을 얻습니다.'}
            {result.day.stem.element === '화' && '화(火)일간은 열정과 표현의 기운으로 감정이 풍부하고 활발합니다. 창의적 표현을 통해 감정을 건강하게 발산합니다.'}
            {result.day.stem.element === '토' && '토(土)일간은 안정과 포용의 기운으로 차분하고 중심잡힌 감정을 유지합니다. 안정된 환경에서 감정적 평화를 찾습니다.'}
            {result.day.stem.element === '금' && '금(金)일간은 절제와 정련의 기운으로 이성적이고 통제된 감정을 가집니다. 명확한 기준과 원칙이 감정 안정에 도움이 됩니다.'}
            {result.day.stem.element === '수' && '수(水)일간은 유연과 지혜의 기운으로 감정의 흐름을 자연스럽게 받아들입니다. 적응력이 뛰어나 다양한 감정을 잘 다룹니다.'}
          </p>
        </div>
        <div className="glass rounded-xl p-5">
          <h4 className="font-bold text-cyan-400 mb-2 flex items-center gap-2">
            ⚖️ 음양 균형
          </h4>
          <div className="flex items-center gap-4 mb-3">
            <div className="flex-1">
              <div className="text-xs text-slate-400 mb-1">양(☀️)</div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-orange-400 to-red-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(result.yinYangBalance.yang / 8) * 100}%` }}
                  transition={{ delay: 1.8, duration: 1 }}
                />
              </div>
              <div className="text-xs text-orange-400 mt-1">{result.yinYangBalance.yang}/8</div>
            </div>
            <div className="flex-1">
              <div className="text-xs text-slate-400 mb-1">음(🌙)</div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-400 to-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(result.yinYangBalance.yin / 8) * 100}%` }}
                  transition={{ delay: 1.8, duration: 1 }}
                />
              </div>
              <div className="text-xs text-purple-400 mt-1">{result.yinYangBalance.yin}/8</div>
            </div>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">
            {result.yinYangBalance.yang > result.yinYangBalance.yin * 1.5
              ? '양 기운이 강해 활발하고 외향적입니다. 때로는 휴식과 내면 성찰이 필요합니다.'
              : result.yinYangBalance.yin > result.yinYangBalance.yang * 1.5
              ? '음 기운이 강해 내면적이고 사려깊습니다. 적극적인 활동으로 에너지를 보충하세요.'
              : '음양이 조화롭게 균형을 이루어 안정적입니다. 상황에 따라 유연하게 대응할 수 있습니다.'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
