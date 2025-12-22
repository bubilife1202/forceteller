'use client';

import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Shield, Zap } from 'lucide-react';
import { SajuResult } from '@/lib/saju-calculator';
import CircularScore from '../CircularScore';

interface OverviewProps {
  result: SajuResult;
}

export default function Overview({ result }: OverviewProps) {
  // Calculate overall score based on various factors
  const overallScore = Math.round(
    (result.strengthScore * 0.3) +
    (calculateElementBalance(result.elements) * 0.3) +
    (calculateTenGodsBalance(result.tenGodsCount) * 0.2) +
    (calculateYinYangBalance(result.yinYangBalance) * 0.2)
  );

  // Extract key keywords based on analysis
  const keywords = extractKeywords(result);

  return (
    <div className="min-h-screen bg-slate-950 py-16 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">전체 개요</h1>
          <p className="text-slate-400 text-lg">사주 종합 분석 요약</p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Left: Overall Score */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-purple-400" />
              종합 점수
            </h2>
            <div className="flex justify-center">
              <CircularScore score={overallScore} size={240} strokeWidth={16} />
            </div>
          </motion.div>

          {/* Right: Key Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-4"
          >
            {/* Strength */}
            <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400">신강/신약</span>
                <Shield className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white">
                {result.strength === 'strong' ? '신강' : result.strength === 'weak' ? '신약' : '중화'}
              </div>
              <div className="text-sm text-slate-500 mt-1">{result.strengthScore}점</div>
            </div>

            {/* 용신 */}
            <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400">용신</span>
                <Zap className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-2xl font-bold text-white">{result.yongsin}</div>
              <div className="text-sm text-slate-500 mt-1">필요한 오행 에너지</div>
            </div>
          </motion.div>
        </div>

        {/* Keywords */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-400" />
            핵심 키워드
          </h2>
          <div className="flex flex-wrap gap-3">
            {keywords.map((keyword, idx) => (
              <motion.span
                key={keyword}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + idx * 0.1, duration: 0.4 }}
                className="px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-white font-semibold text-lg"
              >
                {keyword}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Summary Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4">종합 총평</h2>
          <p className="text-slate-300 leading-relaxed text-lg">
            {generateSummary(result)}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// Helper functions
function calculateElementBalance(elements: SajuResult['elements']): number {
  const values = Object.values(elements);
  const avg = values.reduce((a, b) => a + b, 0) / 5;
  const variance = values.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / 5;
  return Math.max(0, 100 - variance * 2);
}

function calculateTenGodsBalance(tenGodsCount: SajuResult['tenGodsCount']): number {
  const values = Object.values(tenGodsCount);
  const hasAll = values.filter(v => v > 0).length;
  return (hasAll / 5) * 100;
}

function calculateYinYangBalance(yinYangBalance: SajuResult['yinYangBalance']): number {
  const total = yinYangBalance.yang + yinYangBalance.yin;
  const ratio = Math.min(yinYangBalance.yang, yinYangBalance.yin) / total;
  return ratio * 200;
}

function extractKeywords(result: SajuResult): string[] {
  const keywords: string[] = [];

  if (result.strength === 'strong') keywords.push('강한 추진력');
  if (result.strength === 'weak') keywords.push('섬세한 감성');

  const maxElement = Object.entries(result.elements).reduce((a, b) => a[1] > b[1] ? a : b);
  const elementKeywords: Record<string, string> = {
    목: '창의적', 화: '열정적', 토: '안정적', 금: '원칙적', 수: '지혜로운'
  };
  keywords.push(elementKeywords[maxElement[0]]);

  if (result.tenGodsCount.재성 >= 2) keywords.push('재물운');
  if (result.tenGodsCount.관성 >= 2) keywords.push('명예운');

  return keywords.slice(0, 5);
}

function generateSummary(result: SajuResult): string {
  const strengthText = result.strength === 'strong'
    ? '강한 에너지를 가진 사주로 주도적이고 능동적인 삶을 살아갑니다.'
    : result.strength === 'weak'
    ? '섬세하고 민감한 사주로 세심한 관찰력과 깊이 있는 사고를 합니다.'
    : '균형 잡힌 사주로 상황에 따라 유연하게 대처할 수 있습니다.';

  return `${result.dayPersonality.personality} ${strengthText} 용신인 ${result.yongsin} 기운을 보충하면 더욱 좋은 운을 만들어갈 수 있습니다.`;
}
