'use client';

import { SajuResult } from '@/lib/saju-calculator';
import { CAREER_BY_DAY_STEM, type CareerContent } from '@/lib/fortune-data/saju/career-content';
import SectionCard from '../ui/SectionCard';
import SectionHeader from '../ui/SectionHeader';
import Tooltip from '../ui/Tooltip';
import { motion } from 'framer-motion';
import {
  Briefcase, TrendingUp, Users, Star, AlertTriangle,
  Building, Lightbulb, Target, Crown, Rocket,
  CheckCircle, XCircle, Award, Compass
} from 'lucide-react';

interface PremiumCareerSectionProps {
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

// 사업 적합도 게이지
const BusinessGauge = ({ score }: { score: number }) => {
  const getColor = (s: number) => {
    if (s >= 80) return 'bg-green-500';
    if (s >= 60) return 'bg-blue-500';
    if (s >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600 dark:text-gray-400">사업 적합도</span>
        <span className="font-bold text-gray-800 dark:text-gray-200">{score}점</span>
      </div>
      <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${getColor(score)} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export default function PremiumCareerSection({ result }: PremiumCareerSectionProps) {
  const dayStem = result.day.stem.ko;
  const careerData: CareerContent | undefined = CAREER_BY_DAY_STEM[dayStem];

  if (!careerData) {
    return null;
  }

  return (
    <SectionCard className="pdf-avoid-break overflow-hidden">
      <SectionHeader
        title="💼 직업운 심층 분석"
        gradient="bg-gradient-to-b from-blue-500 to-indigo-500"
        tooltip={<Tooltip content="일간을 기준으로 한 상세 직업운 분석입니다. 적성 직업, 커리어 경로, 리더십 스타일 등을 종합적으로 파악합니다." />}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* 직업 유형 & 업무 성격 */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-500 rounded-xl">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200">직업 유형</h4>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{careerData.careerType}</p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {careerData.workPersonality}
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-500 rounded-xl">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200">업무 스타일</h4>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {careerData.workStyle}
            </p>
          </div>
        </motion.div>

        {/* 리더십 & 팀워크 */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 border border-amber-200 dark:border-amber-800 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                <Crown className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <h4 className="font-bold text-amber-700 dark:text-amber-300">리더십 스타일</h4>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {careerData.leadershipStyle}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-teal-200 dark:border-teal-800 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
                <Users className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              </div>
              <h4 className="font-bold text-teal-700 dark:text-teal-300">팀워크 스타일</h4>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {careerData.teamworkStyle}
            </p>
          </div>
        </motion.div>

        {/* 적합 산업 */}
        <motion.div variants={itemVariants}>
          <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            <Building className="w-5 h-5 text-blue-500" />
            적합한 산업 분야
          </h4>
          <div className="flex flex-wrap gap-3">
            {careerData.idealIndustries.map((industry, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 rounded-xl font-medium"
              >
                {industry}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* 추천 직업 & 피해야 할 직업 */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl">
            <h4 className="font-bold text-green-700 dark:text-green-300 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              추천 직업
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {careerData.idealJobs.map((job, idx) => (
                <div key={idx} className="p-3 bg-white dark:bg-gray-800 rounded-lg text-center">
                  <span className="text-gray-800 dark:text-gray-200 text-sm font-medium">{job}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl">
            <h4 className="font-bold text-red-700 dark:text-red-300 mb-4 flex items-center gap-2">
              <XCircle className="w-5 h-5" />
              피해야 할 직업
            </h4>
            <div className="space-y-2">
              {careerData.avoidJobs.map((job, idx) => (
                <div key={idx} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                  {job}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 커리어 로드맵 */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4">
            <div className="flex items-center gap-3">
              <Rocket className="w-6 h-6 text-white" />
              <h4 className="font-bold text-white text-lg">커리어 로드맵</h4>
            </div>
          </div>
          <div className="p-6">
            <div className="relative">
              {/* 연결선 */}
              <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-indigo-300 via-purple-300 to-pink-300 dark:from-indigo-600 dark:via-purple-600 dark:to-pink-600" />

              <div className="space-y-6">
                {careerData.careerPath.map((phase, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.15 }}
                    className="relative flex gap-4 pl-4"
                  >
                    <div className="w-5 h-5 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex-shrink-0 z-10 mt-1" />
                    <div className="flex-1 pb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{phase.phase}</span>
                        <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-sm rounded">
                          {phase.age}
                        </span>
                      </div>
                      <p className="font-medium text-gray-800 dark:text-gray-200 mb-1">{phase.focus}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{phase.advice}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 승진 타이밍 */}
        <motion.div variants={itemVariants} className="bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-900/20 dark:via-orange-900/20 dark:to-yellow-900/20 p-6 rounded-2xl">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-500 rounded-xl flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">승진 & 성장 타이밍</h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {careerData.promotionTiming}
              </p>
            </div>
          </div>
        </motion.div>

        {/* 사업 적성 */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
              <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h4 className="font-bold text-gray-800 dark:text-gray-200">사업 & 창업 적성</h4>
          </div>

          <div className="space-y-4">
            <BusinessGauge score={careerData.businessAptitude.score} />

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <span className="text-sm text-gray-500 dark:text-gray-400">사업 유형</span>
                <p className="font-bold text-gray-800 dark:text-gray-200 mt-1">
                  {careerData.businessAptitude.type}
                </p>
              </div>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                <span className="text-sm text-gray-500 dark:text-gray-400">사업 조언</span>
                <p className="text-gray-700 dark:text-gray-300 mt-1 text-sm">
                  {careerData.businessAptitude.advice}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 강점 & 약점 */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl">
            <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-4 flex items-center gap-2">
              <Star className="w-5 h-5" />
              직업적 강점
            </h4>
            <ul className="space-y-3">
              {careerData.strengths.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <span className="text-blue-500 mt-1">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-2xl">
            <h4 className="font-bold text-orange-700 dark:text-orange-300 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              보완이 필요한 점
            </h4>
            <ul className="space-y-3">
              {careerData.weaknesses.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <span className="text-orange-500 mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* 실행 항목 & 주의 사항 */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-6 rounded-2xl">
            <h4 className="font-bold text-emerald-700 dark:text-emerald-300 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              커리어 성공 실천 항목
            </h4>
            <ul className="space-y-3">
              {careerData.actionItems.map((item, idx) => (
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
              <Target className="w-5 h-5" />
              직업운 주의 사항
            </h4>
            <ul className="space-y-3">
              {careerData.warnings.map((warning, idx) => (
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
