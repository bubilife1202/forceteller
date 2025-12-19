'use client';

import { SajuResult } from '@/lib/saju-calculator';
import { LOVE_BY_DAY_STEM, type LoveContent } from '@/lib/fortune-data/saju/love-content';
import SectionCard from '../ui/SectionCard';
import SectionHeader from '../ui/SectionHeader';
import Tooltip from '../ui/Tooltip';
import { motion } from 'framer-motion';
import {
  Heart, HeartHandshake, Sparkles, AlertTriangle,
  Users, MessageCircle, Crown, Flame, Star,
  CheckCircle, XCircle, Calendar, Gift, Compass
} from 'lucide-react';

interface PremiumLoveSectionProps {
  result: SajuResult;
}

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

// 하트 레이팅 컴포넌트
const HeartRating = ({ level }: { level: number }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Heart
          key={i}
          className={`w-5 h-5 ${i <= level ? 'text-pink-500 fill-pink-500' : 'text-gray-300 dark:text-gray-600'}`}
        />
      ))}
    </div>
  );
};

export default function PremiumLoveSection({ result }: PremiumLoveSectionProps) {
  const dayStem = result.day.stem.ko;
  const loveData: LoveContent | undefined = LOVE_BY_DAY_STEM[dayStem];

  if (!loveData) {
    return null;
  }

  return (
    <SectionCard className="pdf-avoid-break overflow-hidden">
      <SectionHeader
        title="💕 연애운 심층 분석"
        gradient="bg-gradient-to-b from-pink-500 to-rose-500"
        tooltip={<Tooltip content="일간을 기준으로 한 상세 연애운 분석입니다. 연애 스타일, 이상형, 궁합 등을 종합적으로 파악합니다." />}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* 연애 유형 & 연애 성격 */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-pink-500 rounded-xl">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200">연애 유형</h4>
                <p className="text-2xl font-bold text-pink-600 dark:text-pink-400">{loveData.loveType}</p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {loveData.lovePersonality}
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-500 rounded-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200">연애 스타일</h4>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {loveData.loveStyle}
            </p>
          </div>
        </motion.div>

        {/* 매력 포인트 */}
        <motion.div variants={itemVariants} className="bg-gradient-to-r from-rose-100 via-pink-100 to-fuchsia-100 dark:from-rose-900/30 dark:via-pink-900/30 dark:to-fuchsia-900/30 p-6 rounded-2xl">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex-shrink-0">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">✨ 당신의 매력 포인트</h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {loveData.attractionType}
              </p>
            </div>
          </div>
        </motion.div>

        {/* 이상형 & 피해야 할 유형 */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl">
            <h4 className="font-bold text-green-700 dark:text-green-300 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              이상적인 파트너 특성
            </h4>
            <div className="space-y-2">
              {loveData.idealPartnerTraits.map((trait, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg"
                >
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-gray-700 dark:text-gray-300">{trait}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl">
            <h4 className="font-bold text-red-700 dark:text-red-300 mb-4 flex items-center gap-2">
              <XCircle className="w-5 h-5" />
              피해야 할 파트너 유형
            </h4>
            <div className="space-y-2">
              {loveData.avoidPartnerTraits.map((trait, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg"
                >
                  <span className="w-2 h-2 bg-red-500 rounded-full" />
                  <span className="text-gray-700 dark:text-gray-300">{trait}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 연애 강점 & 약점 */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl">
            <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-4 flex items-center gap-2">
              <Star className="w-5 h-5" />
              연애 강점
            </h4>
            <ul className="space-y-3">
              {loveData.relationshipStrengths.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <span className="text-blue-500 mt-1">💙</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-2xl">
            <h4 className="font-bold text-orange-700 dark:text-orange-300 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              연애 약점
            </h4>
            <ul className="space-y-3">
              {loveData.relationshipWeaknesses.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <span className="text-orange-500 mt-1">⚠️</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* 결혼 조언 */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-4">
            <div className="flex items-center gap-3">
              <HeartHandshake className="w-6 h-6 text-white" />
              <h4 className="font-bold text-white text-lg">결혼 & 배우자 조언</h4>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-xl">
                <span className="text-sm text-gray-500 dark:text-gray-400">적합한 결혼 시기</span>
                <p className="font-bold text-pink-700 dark:text-pink-300 text-lg mt-1">
                  {loveData.marriageAdvice.idealAge}
                </p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <span className="text-sm text-gray-500 dark:text-gray-400">궁합 좋은 배우자 오행</span>
                <p className="font-bold text-purple-700 dark:text-purple-300 text-lg mt-1">
                  {loveData.marriageAdvice.partnerElement}
                </p>
              </div>
            </div>

            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
              <h5 className="font-semibold text-amber-700 dark:text-amber-300 mb-2">⚠️ 결혼 시 주의점</h5>
              <ul className="space-y-2">
                {loveData.marriageAdvice.cautionPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm">
                    <span className="text-amber-500">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* 로맨틱 전성기 */}
        <motion.div variants={itemVariants}>
          <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-pink-500" />
            연애 전성기
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            {loveData.romanticPeaks.map((peak, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="p-5 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-xl border border-pink-200 dark:border-pink-800"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl font-bold text-pink-600 dark:text-pink-400">{peak.period}</span>
                  <HeartRating level={5 - idx} />
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{peak.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 궁합 분석 */}
        <motion.div variants={itemVariants} className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 p-6 rounded-2xl">
          <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-500" />
            일간별 궁합 분석
          </h4>
          <div className="space-y-4">
            <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-xl">
              <h5 className="font-semibold text-green-700 dark:text-green-300 mb-2">💚 최고의 궁합</h5>
              <div className="flex flex-wrap gap-2">
                {loveData.loveCompatibility.bestMatches.map((match, idx) => (
                  <span key={idx} className="px-3 py-1 bg-green-200 dark:bg-green-800/50 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                    {match}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <h5 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">💙 좋은 궁합</h5>
              <div className="flex flex-wrap gap-2">
                {loveData.loveCompatibility.goodMatches.map((match, idx) => (
                  <span key={idx} className="px-3 py-1 bg-blue-200 dark:bg-blue-800/50 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                    {match}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
              <h5 className="font-semibold text-amber-700 dark:text-amber-300 mb-2">💛 도전적인 궁합</h5>
              <div className="flex flex-wrap gap-2">
                {loveData.loveCompatibility.challengingMatches.map((match, idx) => (
                  <span key={idx} className="px-3 py-1 bg-amber-200 dark:bg-amber-800/50 text-amber-800 dark:text-amber-200 rounded-full text-sm font-medium">
                    {match}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 데이트 팁 */}
        <motion.div variants={itemVariants}>
          <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            <Gift className="w-5 h-5 text-rose-500" />
            연애 성공 팁
          </h4>
          <div className="grid md:grid-cols-2 gap-3">
            {loveData.datingTips.map((tip, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 border border-rose-200 dark:border-rose-800 rounded-xl"
              >
                <span className="w-7 h-7 flex items-center justify-center bg-rose-500 text-white rounded-full text-sm font-bold flex-shrink-0">
                  {idx + 1}
                </span>
                <span className="text-gray-700 dark:text-gray-300">{tip}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 이별 & 재회 패턴 */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl">
            <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-gray-500" />
              이별 패턴
            </h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {loveData.breakupPattern}
            </p>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 p-6 rounded-2xl">
            <h4 className="font-bold text-teal-700 dark:text-teal-300 mb-4 flex items-center gap-2">
              <Compass className="w-5 h-5" />
              재회 & 화해 조언
            </h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {loveData.reconciliationAdvice}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </SectionCard>
  );
}
