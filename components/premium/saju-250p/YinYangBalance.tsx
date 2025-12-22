'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { SajuResult } from '@/lib/saju-calculator';

interface YinYangBalanceProps {
  result: SajuResult;
}

export default function YinYangBalance({ result }: YinYangBalanceProps) {
  const rawBalance = result.yinYangBalance;
  const total = rawBalance.yin + rawBalance.yang;
  const ratio = total > 0 ? (rawBalance.yang / total) * 100 : 50;
  const isBalanced = Math.abs(ratio - 50) < 15;

  const getAdvice = () => {
    if (isBalanced) return '음양의 균형이 적절합니다. 안정적인 에너지 흐름을 가지고 있어 균형 잡힌 삶을 살 수 있습니다.';
    if (ratio > 50) return '양의 기운이 강합니다. 활동적이고 적극적이지만 때로는 휴식이 필요합니다. 음의 에너지를 보충하세요.';
    return '음의 기운이 강합니다. 내성적이고 사려 깊지만 때로는 적극적인 활동이 필요합니다. 양의 에너지를 보충하세요.';
  };

  const yinPercent = total > 0 ? (rawBalance.yin / total) * 100 : 50;
  const yangPercent = total > 0 ? (rawBalance.yang / total) * 100 : 50;

  const getBalanceIcon = () => {
    if (isBalanced) return <Minus className="w-6 h-6" />;
    return yinPercent > yangPercent ? <TrendingDown className="w-6 h-6" /> : <TrendingUp className="w-6 h-6" />;
  };

  const getBalanceText = () => {
    if (isBalanced) return '균형';
    const diff = Math.abs(yinPercent - yangPercent);
    if (diff > 30) return '불균형';
    return '약간 불균형';
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">음양 균형 분석</h2>
        <p className="text-gray-400">사주의 음양 에너지 분포를 확인합니다</p>
      </div>

      <div className="flex items-center justify-center mb-8">
        <div className="relative w-64 h-64">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="128" cy="128" r="100" stroke="#1f2937" strokeWidth="32" fill="none" />
            <motion.circle cx="128" cy="128" r="100" stroke="#3b82f6" strokeWidth="32" fill="none"
              strokeDasharray={`${yinPercent * 6.28} ${(100 - yinPercent) * 6.28}`}
              initial={{ strokeDasharray: '0 628' }}
              animate={{ strokeDasharray: `${yinPercent * 6.28} ${(100 - yinPercent) * 6.28}` }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
            <motion.circle cx="128" cy="128" r="100" stroke="#f59e0b" strokeWidth="32" fill="none"
              strokeDasharray={`${yangPercent * 6.28} ${(100 - yangPercent) * 6.28}`}
              strokeDashoffset={`-${yinPercent * 6.28}`}
              initial={{ strokeDasharray: '0 628' }}
              animate={{ strokeDasharray: `${yangPercent * 6.28} ${(100 - yangPercent) * 6.28}` }}
              transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-white mb-1">{getBalanceIcon()}</div>
            <div className="text-xl font-bold text-white">{getBalanceText()}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
          className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
          <div className="text-blue-400 text-sm mb-1">음(陰)</div>
          <div className="text-3xl font-bold text-white mb-1">{rawBalance.yin}</div>
          <div className="text-blue-300 text-lg">{yinPercent.toFixed(1)}%</div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
          className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
          <div className="text-amber-400 text-sm mb-1">양(陽)</div>
          <div className="text-3xl font-bold text-white mb-1">{rawBalance.yang}</div>
          <div className="text-amber-300 text-lg">{yangPercent.toFixed(1)}%</div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
        <h3 className="text-white font-semibold mb-2">해석 및 조언</h3>
        <p className="text-gray-300 leading-relaxed">{getAdvice()}</p>
      </motion.div>
    </div>
  );
}
