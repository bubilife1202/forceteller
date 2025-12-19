'use client';

import { SajuResult } from '@/lib/saju-calculator';
import { WEALTH_BY_DAY_STEM, type WealthContent } from '@/lib/fortune-data/saju/wealth-content';
import SectionCard from '../ui/SectionCard';
import SectionHeader from '../ui/SectionHeader';
import Tooltip from '../ui/Tooltip';
import { motion } from 'framer-motion';
import {
  Wallet, TrendingUp, PiggyBank, ShieldCheck, AlertTriangle,
  Target, Calendar, Coins, CreditCard, Building, LineChart,
  BadgeCheck, Flame, Lightbulb, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

interface PremiumWealthSectionProps {
  result: SajuResult;
}

// 리스크 레벨 색상 매핑
const getRiskColor = (risk: string) => {
  switch (risk) {
    case 'high': return { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300', label: '공격적 투자형' };
    case 'medium': return { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-300', label: '균형 투자형' };
    case 'low': return { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300', label: '안정 투자형' };
    default: return { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-700 dark:text-gray-300', label: '일반형' };
  }
};

// 애니메이션 설정
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function PremiumWealthSection({ result }: PremiumWealthSectionProps) {
  const dayStem = result.day.stem.ko;
  const wealthData: WealthContent | undefined = WEALTH_BY_DAY_STEM[dayStem];

  if (!wealthData) {
    return null;
  }

  const riskStyle = getRiskColor(wealthData.investmentProfile.riskTolerance);

  return (
    <SectionCard className="pdf-avoid-break overflow-hidden">
      <SectionHeader
        title="💰 재물운 심층 분석"
        gradient="bg-gradient-to-b from-amber-500 to-yellow-500"
        tooltip={<Tooltip content="일간을 기준으로 한 상세 재물운 분석입니다. 수입 성향, 소비 패턴, 투자 적성 등을 종합적으로 파악합니다." />}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* 재물 유형 & 금전 성격 */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-amber-500 rounded-xl">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200">재물 유형</h4>
                <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{wealthData.wealthType}</p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {wealthData.wealthPersonality}
            </p>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-emerald-500 rounded-xl">
                <Coins className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200">금전 마인드</h4>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {wealthData.moneyMindset}
            </p>
          </div>
        </motion.div>

        {/* 수입 & 지출 스타일 */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 border border-green-200 dark:border-green-800 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <ArrowUpRight className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="font-bold text-green-700 dark:text-green-300">수입 스타일</h4>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {wealthData.incomeStyle}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-rose-200 dark:border-rose-800 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-lg">
                <ArrowDownRight className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              </div>
              <h4 className="font-bold text-rose-700 dark:text-rose-300">지출 스타일</h4>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {wealthData.spendingStyle}
            </p>
          </div>
        </motion.div>

        {/* 저축 조언 */}
        <motion.div variants={itemVariants} className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-2xl">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-500 rounded-xl flex-shrink-0">
              <PiggyBank className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">저축 & 자산 조언</h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {wealthData.savingAdvice}
              </p>
            </div>
          </div>
        </motion.div>

        {/* 투자 프로필 */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-4">
            <div className="flex items-center gap-3">
              <LineChart className="w-6 h-6 text-white" />
              <h4 className="font-bold text-white text-lg">투자 성향 분석</h4>
            </div>
          </div>
          <div className="p-6 space-y-6">
            {/* 리스크 레벨 */}
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">투자 리스크 성향</span>
              <span className={`px-4 py-2 rounded-full font-bold ${riskStyle.bg} ${riskStyle.text}`}>
                {riskStyle.label}
              </span>
            </div>

            {/* 적합 자산 */}
            <div>
              <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                <BadgeCheck className="w-5 h-5 text-green-500" />
                추천 투자 자산
              </h5>
              <div className="flex flex-wrap gap-2">
                {wealthData.investmentProfile.idealAssets.map((asset, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-sm">
                    {asset}
                  </span>
                ))}
              </div>
            </div>

            {/* 피해야 할 자산 */}
            <div>
              <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                주의해야 할 자산
              </h5>
              <div className="flex flex-wrap gap-2">
                {wealthData.investmentProfile.avoidAssets.map((asset, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm">
                    {asset}
                  </span>
                ))}
              </div>
            </div>

            {/* 투자 타이밍 */}
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
              <h5 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">투자 타이밍 조언</h5>
              <p className="text-gray-700 dark:text-gray-300">{wealthData.investmentProfile.investmentTiming}</p>
            </div>
          </div>
        </motion.div>

        {/* 행운의 수입원 */}
        <motion.div variants={itemVariants}>
          <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            행운의 수입원
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {wealthData.luckyIncome.map((income, idx) => (
              <div key={idx} className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl text-center">
                <span className="text-orange-700 dark:text-orange-300 font-medium">{income}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 재물 전성기 */}
        <motion.div variants={itemVariants} className="bg-gradient-to-r from-yellow-100 via-amber-100 to-orange-100 dark:from-yellow-900/30 dark:via-amber-900/30 dark:to-orange-900/30 p-6 rounded-2xl">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-amber-500 rounded-2xl">
              <Target className="w-8 h-8 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">재물 전성기</h4>
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{wealthData.wealthPeak.age}</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">{wealthData.wealthPeak.description}</p>
            </div>
          </div>
        </motion.div>

        {/* SWOT 분석 */}
        <motion.div variants={itemVariants}>
          <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-500" />
            재물운 SWOT 분석
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            {/* 강점 */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl">
              <h5 className="font-bold text-blue-700 dark:text-blue-300 mb-3">💪 강점 (Strengths)</h5>
              <ul className="space-y-2">
                {wealthData.strengths.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <span className="text-blue-500 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* 약점 */}
            <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-xl">
              <h5 className="font-bold text-red-700 dark:text-red-300 mb-3">⚠️ 약점 (Weaknesses)</h5>
              <ul className="space-y-2">
                {wealthData.weaknesses.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <span className="text-red-500 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* 기회 */}
            <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-xl">
              <h5 className="font-bold text-green-700 dark:text-green-300 mb-3">🌟 기회 (Opportunities)</h5>
              <ul className="space-y-2">
                {wealthData.opportunities.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <span className="text-green-500 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* 위협 */}
            <div className="bg-amber-50 dark:bg-amber-900/20 p-5 rounded-xl">
              <h5 className="font-bold text-amber-700 dark:text-amber-300 mb-3">⚡ 위협 (Threats)</h5>
              <ul className="space-y-2">
                {wealthData.threats.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <span className="text-amber-500 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* 월별 재물운 */}
        <motion.div variants={itemVariants}>
          <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-500" />
            월별 재물운 가이드
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {wealthData.monthlyWealth.map((monthData) => (
              <div key={monthData.month} className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
                <div className="text-center mb-2">
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">{monthData.month}월</span>
                </div>
                <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">{monthData.theme}</div>
                <p className="text-xs text-gray-600 dark:text-gray-400">{monthData.advice}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 실행 항목 & 주의 사항 */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-6 rounded-2xl">
            <h4 className="font-bold text-emerald-700 dark:text-emerald-300 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              재물운 향상 실천 항목
            </h4>
            <ul className="space-y-3">
              {wealthData.actionItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-6 h-6 flex items-center justify-center bg-emerald-500 text-white rounded-full text-sm font-bold flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 p-6 rounded-2xl">
            <h4 className="font-bold text-red-700 dark:text-red-300 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              재물운 주의 사항
            </h4>
            <ul className="space-y-3">
              {wealthData.warnings.map((warning, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full text-sm flex-shrink-0">
                    !
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">{warning}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </SectionCard>
  );
}
