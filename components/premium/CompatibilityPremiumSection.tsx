'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import {
  Heart, Users, Star, Sparkles, Shield, AlertTriangle,
  MessageCircle, Gift, Coffee, Home, Flame, Scale,
  TrendingUp, TrendingDown, CheckCircle, XCircle
} from 'lucide-react';

interface CompatibilityPremiumSectionProps {
  myResult: SajuResult;
  partnerResult: SajuResult;
  myName: string;
  partnerName: string;
}

// 오행 상생상극 관계
const ELEMENT_RELATIONS = {
  '목': { generates: '화', controls: '토', generatedBy: '수', controlledBy: '금' },
  '화': { generates: '토', controls: '금', generatedBy: '목', controlledBy: '수' },
  '토': { generates: '금', controls: '수', generatedBy: '화', controlledBy: '목' },
  '금': { generates: '수', controls: '목', generatedBy: '토', controlledBy: '화' },
  '수': { generates: '목', controls: '화', generatedBy: '금', controlledBy: '토' }
};

// 애니메이션 설정
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function CompatibilityPremiumSection({
  myResult,
  partnerResult,
  myName,
  partnerName
}: CompatibilityPremiumSectionProps) {
  const myElement = myResult.day.stem.element;
  const partnerElement = partnerResult.day.stem.element;
  const myRelation = ELEMENT_RELATIONS[myElement as keyof typeof ELEMENT_RELATIONS];

  // 궁합 점수 계산
  const calculateScore = () => {
    let score = 50;

    // 상생 관계
    if (myRelation.generates === partnerElement) score += 25;
    if (myRelation.generatedBy === partnerElement) score += 20;

    // 비화 (같은 오행)
    if (myElement === partnerElement) score += 15;

    // 상극 관계
    if (myRelation.controls === partnerElement) score -= 10;
    if (myRelation.controlledBy === partnerElement) score -= 15;

    // 음양 조화
    if (myResult.day.stem.yinyang !== partnerResult.day.stem.yinyang) score += 10;

    return Math.min(Math.max(score, 20), 100);
  };

  const score = calculateScore();

  // 관계 유형 분석
  const getRelationType = () => {
    if (myRelation.generates === partnerElement) {
      return { type: '상생(相生)', desc: `${myName}님이 ${partnerName}님을 생(生)하는 관계`, icon: '💝', color: 'green' };
    }
    if (myRelation.generatedBy === partnerElement) {
      return { type: '상생(相生)', desc: `${partnerName}님이 ${myName}님을 생(生)하는 관계`, icon: '💖', color: 'blue' };
    }
    if (myElement === partnerElement) {
      return { type: '비화(比和)', desc: '같은 기운으로 서로 공감하는 관계', icon: '💕', color: 'purple' };
    }
    if (myRelation.controls === partnerElement) {
      return { type: '상극(相克)', desc: `${myName}님이 ${partnerName}님을 극(克)하는 관계`, icon: '⚡', color: 'orange' };
    }
    if (myRelation.controlledBy === partnerElement) {
      return { type: '상극(相克)', desc: `${partnerName}님이 ${myName}님을 극(克)하는 관계`, icon: '💢', color: 'red' };
    }
    return { type: '중립', desc: '특별한 상호작용 없이 조화로운 관계', icon: '💛', color: 'yellow' };
  };

  const relationType = getRelationType();

  // 분야별 궁합 분석
  const getCategoryAnalysis = () => {
    const baseScore = score;
    return {
      love: {
        score: Math.min(baseScore + (relationType.color === 'green' ? 15 : relationType.color === 'red' ? -10 : 5), 100),
        title: '연애 궁합',
        icon: Heart,
        advice: score >= 70 ? '서로에게 끌리는 로맨틱한 관계입니다.' : score >= 50 ? '노력하면 좋은 관계를 만들 수 있습니다.' : '서로를 이해하려는 노력이 필요합니다.'
      },
      marriage: {
        score: Math.min(baseScore + (myElement === partnerElement ? 10 : 0), 100),
        title: '결혼 궁합',
        icon: Home,
        advice: score >= 70 ? '안정적인 가정을 이룰 수 있는 조합입니다.' : score >= 50 ? '서로 맞춰가면 좋은 부부가 됩니다.' : '인내와 소통이 특히 중요합니다.'
      },
      communication: {
        score: Math.min(baseScore + (myResult.day.stem.yinyang !== partnerResult.day.stem.yinyang ? 15 : -5), 100),
        title: '소통 궁합',
        icon: MessageCircle,
        advice: score >= 70 ? '대화가 잘 통하고 서로를 이해합니다.' : score >= 50 ? '노력하면 의사소통이 개선됩니다.' : '오해가 생길 수 있으니 명확히 표현하세요.'
      },
      growth: {
        score: Math.min(baseScore + (relationType.type === '상생(相生)' ? 20 : 0), 100),
        title: '성장 궁합',
        icon: TrendingUp,
        advice: score >= 70 ? '서로에게 좋은 영향을 주며 성장합니다.' : score >= 50 ? '함께 노력하면 성장할 수 있습니다.' : '독립적인 성장도 중요합니다.'
      }
    };
  };

  const categories = getCategoryAnalysis();

  // 장점과 주의점
  const getStrengthsAndCautions = () => {
    const strengths = [];
    const cautions = [];

    if (relationType.type === '상생(相生)') {
      strengths.push('서로에게 에너지를 주는 관계입니다');
      strengths.push('자연스럽게 돌봄과 지지가 이루어집니다');
    }
    if (myElement === partnerElement) {
      strengths.push('같은 기운으로 서로를 깊이 이해합니다');
      cautions.push('너무 비슷해서 자극이 부족할 수 있습니다');
    }
    if (myResult.day.stem.yinyang !== partnerResult.day.stem.yinyang) {
      strengths.push('음양이 조화를 이뤄 균형 잡힌 관계입니다');
    }
    if (relationType.type === '상극(相克)') {
      cautions.push('갈등이 생길 수 있으니 양보가 필요합니다');
      cautions.push('서로의 차이를 인정하는 것이 중요합니다');
    }

    if (strengths.length === 0) strengths.push('서로 다른 매력으로 끌립니다');
    if (cautions.length === 0) cautions.push('관계에 안주하지 말고 꾸준히 노력하세요');

    return { strengths, cautions };
  };

  const { strengths, cautions } = getStrengthsAndCautions();

  // 데이트 코스 추천
  const getDateRecommendations = () => {
    const recs = [];
    if (myElement === '목' || partnerElement === '목') recs.push({ emoji: '🌳', activity: '숲속 산책, 식물원 데이트' });
    if (myElement === '화' || partnerElement === '화') recs.push({ emoji: '🎬', activity: '영화관, 콘서트, 열정적인 활동' });
    if (myElement === '토' || partnerElement === '토') recs.push({ emoji: '🍽️', activity: '맛집 탐방, 요리 클래스' });
    if (myElement === '금' || partnerElement === '금') recs.push({ emoji: '🎨', activity: '미술관, 쇼핑, 문화생활' });
    if (myElement === '수' || partnerElement === '수') recs.push({ emoji: '🌊', activity: '바다 여행, 수상 스포츠' });
    recs.push({ emoji: '☕', activity: '조용한 카페에서 대화' });
    return recs.slice(0, 4);
  };

  const dateRecs = getDateRecommendations();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* 종합 궁합 점수 */}
      <motion.div variants={itemVariants} className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 p-6 rounded-2xl text-center">
        <div className="text-6xl mb-4">{relationType.icon}</div>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          {myName} ❤️ {partnerName}
        </h3>
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/50 dark:bg-gray-800/50 rounded-full mb-4">
          <span className="text-4xl font-bold text-pink-600 dark:text-pink-400">{score}점</span>
          <span className="text-gray-600 dark:text-gray-400">/ 100</span>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          <strong className={`text-${relationType.color}-600 dark:text-${relationType.color}-400`}>{relationType.type}</strong> - {relationType.desc}
        </p>
      </motion.div>

      {/* 오행 관계 시각화 */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl">
        <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <Scale className="w-5 h-5 text-purple-500" />
          오행 관계 분석
        </h3>
        <div className="flex items-center justify-center gap-8">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-2">
              {myElement}
            </div>
            <span className="text-gray-700 dark:text-gray-300">{myName}</span>
          </div>
          <div className="text-center">
            <span className="text-4xl">{relationType.icon}</span>
            <p className="text-sm text-gray-500 mt-2">{relationType.type}</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-2">
              {partnerElement}
            </div>
            <span className="text-gray-700 dark:text-gray-300">{partnerName}</span>
          </div>
        </div>
      </motion.div>

      {/* 분야별 궁합 */}
      <motion.div variants={itemVariants}>
        <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-500" />
          분야별 궁합 분석
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(categories).map(([key, cat]) => {
            const IconComponent = cat.icon;
            return (
              <div key={key} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <IconComponent className="w-5 h-5 text-pink-500" />
                    <span className="font-bold text-gray-800 dark:text-gray-200">{cat.title}</span>
                  </div>
                  <span className={`text-xl font-bold ${cat.score >= 70 ? 'text-green-600' : cat.score >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                    {cat.score}점
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-2">
                  <motion.div
                    className={`h-full rounded-full ${cat.score >= 70 ? 'bg-green-500' : cat.score >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.score}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{cat.advice}</p>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* 장점 & 주의점 */}
      <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl">
          <h4 className="font-bold text-green-700 dark:text-green-300 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            이 커플의 장점
          </h4>
          <ul className="space-y-3">
            {strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-green-500">✓</span> {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-2xl">
          <h4 className="font-bold text-amber-700 dark:text-amber-300 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            주의할 점
          </h4>
          <ul className="space-y-3">
            {cautions.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-amber-500">!</span> {c}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* 데이트 추천 */}
      <motion.div variants={itemVariants} className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-2xl">
        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <Gift className="w-5 h-5 text-purple-500" />
          추천 데이트 코스
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {dateRecs.map((rec, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl">
              <span className="text-2xl">{rec.emoji}</span>
              <span className="text-sm text-gray-700 dark:text-gray-300">{rec.activity}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
