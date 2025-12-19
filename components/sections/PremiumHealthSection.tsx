'use client';

import { SajuResult } from '@/lib/saju-calculator';
import { HEALTH_BY_DAY_STEM, type HealthContent } from '@/lib/fortune-data/saju/health-content';
import SectionCard from '../ui/SectionCard';
import SectionHeader from '../ui/SectionHeader';
import Tooltip from '../ui/Tooltip';
import { motion } from 'framer-motion';
import {
  Activity, Heart, Brain, Dumbbell, Apple,
  AlertTriangle, Leaf, Sun, Cloud, Snowflake,
  Wind, Droplets, Shield, Smile, Coffee, Moon
} from 'lucide-react';

interface PremiumHealthSectionProps {
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

// 계절 아이콘 매핑
const getSeasonIcon = (season: string) => {
  if (season.includes('봄')) return <Leaf className="w-5 h-5 text-green-500" />;
  if (season.includes('여름')) return <Sun className="w-5 h-5 text-orange-500" />;
  if (season.includes('가을')) return <Wind className="w-5 h-5 text-amber-500" />;
  if (season.includes('겨울')) return <Snowflake className="w-5 h-5 text-blue-500" />;
  return <Cloud className="w-5 h-5 text-gray-500" />;
};

// 계절 색상 매핑
const getSeasonColor = (season: string) => {
  if (season.includes('봄')) return { bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-200 dark:border-green-800' };
  if (season.includes('여름')) return { bg: 'bg-orange-50 dark:bg-orange-900/20', border: 'border-orange-200 dark:border-orange-800' };
  if (season.includes('가을')) return { bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-200 dark:border-amber-800' };
  if (season.includes('겨울')) return { bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800' };
  return { bg: 'bg-gray-50 dark:bg-gray-800', border: 'border-gray-200 dark:border-gray-700' };
};

export default function PremiumHealthSection({ result }: PremiumHealthSectionProps) {
  const dayStem = result.day.stem.ko;
  const healthData: HealthContent | undefined = HEALTH_BY_DAY_STEM[dayStem];

  if (!healthData) {
    return null;
  }

  return (
    <SectionCard className="pdf-avoid-break overflow-hidden">
      <SectionHeader
        title="🏥 건강운 심층 분석"
        gradient="bg-gradient-to-b from-emerald-500 to-teal-500"
        tooltip={<Tooltip content="일간을 기준으로 한 상세 건강운 분석입니다. 체질, 취약 장기, 건강 관리법 등을 종합적으로 파악합니다." />}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* 체질 & 건강 성격 */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-emerald-500 rounded-xl">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200">체질 유형</h4>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{healthData.constitution}</p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {healthData.healthPersonality}
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-500 rounded-xl">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200">정신 건강</h4>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {healthData.mentalHealth}
            </p>
          </div>
        </motion.div>

        {/* 취약 장기 */}
        <motion.div variants={itemVariants}>
          <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            취약한 신체 부위 & 장기
          </h4>
          <div className="flex flex-wrap gap-3">
            {healthData.vulnerableOrgans.map((organ, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
              >
                <span className="text-red-700 dark:text-red-300 font-medium">{organ}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 건강 팁 */}
        <motion.div variants={itemVariants} className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 p-6 rounded-2xl">
          <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-teal-500" />
            맞춤 건강 관리 팁
          </h4>
          <div className="grid md:grid-cols-2 gap-3">
            {healthData.healthTips.map((tip, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl"
              >
                <span className="w-6 h-6 flex items-center justify-center bg-teal-500 text-white rounded-full text-sm font-bold flex-shrink-0">
                  {idx + 1}
                </span>
                <span className="text-gray-700 dark:text-gray-300">{tip}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 운동 & 식단 */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 border border-purple-200 dark:border-purple-800 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Dumbbell className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="font-bold text-purple-700 dark:text-purple-300">추천 운동</h4>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {healthData.exerciseRecommendation}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-orange-200 dark:border-orange-800 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <Apple className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <h4 className="font-bold text-orange-700 dark:text-orange-300">식단 조언</h4>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {healthData.dietAdvice}
            </p>
          </div>
        </motion.div>

        {/* 스트레스 관리 */}
        <motion.div variants={itemVariants} className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 dark:from-indigo-900/30 dark:via-purple-900/30 dark:to-pink-900/30 p-6 rounded-2xl">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex-shrink-0">
              <Smile className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">스트레스 관리법</h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {healthData.stressManagement}
              </p>
            </div>
          </div>
        </motion.div>

        {/* 계절별 건강 */}
        <motion.div variants={itemVariants}>
          <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            <Sun className="w-5 h-5 text-amber-500" />
            계절별 건강 가이드
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            {healthData.seasonalHealth.map((seasonData, idx) => {
              const seasonColor = getSeasonColor(seasonData.season);
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-5 rounded-xl border ${seasonColor.bg} ${seasonColor.border}`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    {getSeasonIcon(seasonData.season)}
                    <span className="text-lg font-bold text-gray-800 dark:text-gray-200">{seasonData.season}</span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-xs font-semibold text-red-600 dark:text-red-400">⚠️ 주의</span>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{seasonData.caution}</p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-green-600 dark:text-green-400">💡 조언</span>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{seasonData.advice}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* 예방 관리 */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-white" />
              <h4 className="font-bold text-white text-lg">예방 건강 관리</h4>
            </div>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-4">
              {healthData.preventiveCare.map((care, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-start gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl"
                >
                  <Droplets className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">{care}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 생활 습관 */}
        <motion.div variants={itemVariants} className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-2xl">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-500 rounded-xl flex-shrink-0">
              <Coffee className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">생활 습관 조언</h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {healthData.lifestyleAdvice}
              </p>
            </div>
          </div>
        </motion.div>

        {/* 건강 일과표 예시 */}
        <motion.div variants={itemVariants}>
          <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            <Moon className="w-5 h-5 text-indigo-500" />
            건강한 하루 일과 가이드
          </h4>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-300 via-emerald-300 to-indigo-300 dark:from-amber-600 dark:via-emerald-600 dark:to-indigo-600" />

            <div className="space-y-4 pl-10">
              <div className="relative">
                <div className="absolute -left-8 w-4 h-4 bg-amber-400 rounded-full" />
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                  <span className="font-bold text-amber-700 dark:text-amber-300">🌅 아침 (6:00-9:00)</span>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    {healthData.constitution.includes('화') || healthData.constitution.includes('열')
                      ? '시원한 물 한 잔으로 시작, 가벼운 스트레칭 후 균형 잡힌 아침 식사'
                      : '따뜻한 물 한 잔으로 시작, 가벼운 산책 후 영양가 있는 아침 식사'}
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-8 w-4 h-4 bg-orange-400 rounded-full" />
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                  <span className="font-bold text-orange-700 dark:text-orange-300">☀️ 오전 (9:00-12:00)</span>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    집중력이 높은 시간대, 중요한 업무 처리. 매 시간 5분 휴식으로 눈과 목 스트레칭
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-8 w-4 h-4 bg-emerald-400 rounded-full" />
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                  <span className="font-bold text-emerald-700 dark:text-emerald-300">🌿 오후 (12:00-18:00)</span>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    점심 후 15분 산책, 오후 3시 가벼운 간식. {healthData.exerciseRecommendation.split('.')[0]}
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-8 w-4 h-4 bg-indigo-400 rounded-full" />
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
                  <span className="font-bold text-indigo-700 dark:text-indigo-300">🌙 저녁 (18:00-22:00)</span>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    저녁 7시 전 식사 완료, 취침 2시간 전 전자기기 사용 줄이기, 가벼운 명상이나 독서
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </SectionCard>
  );
}
