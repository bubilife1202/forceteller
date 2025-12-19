'use client';

import { motion } from 'framer-motion';
import {
  Sparkles, Star, Moon, Sun, Heart, Wallet,
  Briefcase, Users, Shield, AlertTriangle,
  CheckCircle, Lightbulb, Eye, Compass,
  Clock, Calendar, TrendingUp, Gift
} from 'lucide-react';

interface TarotCard {
  name: string;
  number: number;
  isReversed: boolean;
  meaning: string;
}

interface TarotPremiumSectionProps {
  cards: TarotCard[];
  question: string;
  spreadType: string;
}

// 메이저 아르카나 상세 데이터
const MAJOR_ARCANA_DATA: Record<number, {
  element: string;
  planet: string;
  keywords: string[];
  upright: { meaning: string; advice: string; luck: number };
  reversed: { meaning: string; advice: string; luck: number };
  loveFortune: string;
  careerFortune: string;
  wealthFortune: string;
}> = {
  0: { // 바보
    element: '공기', planet: '천왕성',
    keywords: ['새로운 시작', '순수함', '모험', '자유'],
    upright: { meaning: '새로운 여정의 시작, 순수한 마음으로 도전할 때', advice: '두려움 없이 새로운 길을 걸어가세요', luck: 75 },
    reversed: { meaning: '무모함, 준비 없는 행동에 대한 경고', advice: '신중하게 준비한 후 시작하세요', luck: 45 },
    loveFortune: '새로운 만남이나 관계의 시작이 예상됩니다',
    careerFortune: '새로운 분야로의 도전이나 전환점이 옵니다',
    wealthFortune: '큰 이익보다는 경험에 투자하는 것이 좋습니다'
  },
  1: { // 마법사
    element: '공기', planet: '수성',
    keywords: ['창조', '의지력', '기술', '자신감'],
    upright: { meaning: '당신에게 필요한 모든 것을 갖추고 있습니다', advice: '자신의 능력을 믿고 행동하세요', luck: 85 },
    reversed: { meaning: '재능의 낭비, 속임수에 주의', advice: '진정성을 가지고 능력을 사용하세요', luck: 50 },
    loveFortune: '적극적인 표현이 좋은 결과를 가져옵니다',
    careerFortune: '창의적 아이디어가 인정받을 때입니다',
    wealthFortune: '새로운 수익 창출 기회가 있습니다'
  },
  2: { // 여사제
    element: '물', planet: '달',
    keywords: ['직관', '신비', '지혜', '내면'],
    upright: { meaning: '내면의 목소리에 귀 기울일 때', advice: '직관을 믿고 내면의 지혜를 따르세요', luck: 72 },
    reversed: { meaning: '직관의 무시, 비밀이 드러남', advice: '숨겨진 것들에 주의를 기울이세요', luck: 48 },
    loveFortune: '상대의 진심을 읽는 것이 중요합니다',
    careerFortune: '겉으로 드러나지 않는 정보가 핵심입니다',
    wealthFortune: '눈에 보이지 않는 가치에 주목하세요'
  },
  3: { // 여황제
    element: '땅', planet: '금성',
    keywords: ['풍요', '모성', '창조', '자연'],
    upright: { meaning: '풍요와 창조의 에너지, 결실의 시기', advice: '자신을 돌보고 창조력을 발휘하세요', luck: 88 },
    reversed: { meaning: '창조성의 막힘, 자기 돌봄 부족', advice: '자신을 먼저 사랑하세요', luck: 52 },
    loveFortune: '사랑이 깊어지고 관계가 풍요로워집니다',
    careerFortune: '창의적 프로젝트가 성공합니다',
    wealthFortune: '재물운이 좋습니다. 투자도 긍정적입니다'
  },
  4: { // 황제
    element: '불', planet: '화성',
    keywords: ['권위', '구조', '리더십', '안정'],
    upright: { meaning: '권위와 질서, 목표 달성의 시기', advice: '리더십을 발휘하고 체계를 세우세요', luck: 80 },
    reversed: { meaning: '과도한 통제, 유연성 부족', advice: '때로는 통제를 놓을 줄도 알아야 합니다', luck: 55 },
    loveFortune: '안정적인 관계를 구축할 수 있습니다',
    careerFortune: '리더의 역할을 맡게 될 수 있습니다',
    wealthFortune: '체계적인 재정 관리가 성공의 열쇠입니다'
  },
  5: { // 교황
    element: '땅', planet: '목성',
    keywords: ['전통', '교육', '믿음', '조언'],
    upright: { meaning: '멘토의 도움, 전통의 가치', advice: '경험자의 조언을 구하세요', luck: 70 },
    reversed: { meaning: '독단적 사고, 조언 무시', advice: '다른 관점도 열린 마음으로 받아들이세요', luck: 50 },
    loveFortune: '전통적인 방식의 관계 발전이 좋습니다',
    careerFortune: '멘토나 상사의 도움이 있을 것입니다',
    wealthFortune: '검증된 방법으로 재정을 관리하세요'
  },
  6: { // 연인
    element: '공기', planet: '금성',
    keywords: ['사랑', '선택', '조화', '가치관'],
    upright: { meaning: '사랑과 조화, 중요한 선택의 시기', advice: '마음의 소리에 따라 선택하세요', luck: 82 },
    reversed: { meaning: '불화, 가치관 충돌', advice: '상대방의 입장에서도 생각해보세요', luck: 45 },
    loveFortune: '운명적인 만남이나 관계의 진전이 있습니다',
    careerFortune: '팀워크와 협력이 중요한 시기입니다',
    wealthFortune: '공동 투자나 파트너십이 좋습니다'
  },
  7: { // 전차
    element: '물', planet: '달',
    keywords: ['승리', '의지', '전진', '결단'],
    upright: { meaning: '승리를 향한 전진, 장애물 극복', advice: '목표를 향해 과감하게 나아가세요', luck: 85 },
    reversed: { meaning: '방향 상실, 통제력 상실', advice: '잠시 멈추고 방향을 재점검하세요', luck: 48 },
    loveFortune: '적극적인 구애가 성공합니다',
    careerFortune: '목표 달성을 향한 질주의 시기입니다',
    wealthFortune: '공격적인 투자가 성과를 냅니다'
  },
  8: { // 힘
    element: '불', planet: '태양',
    keywords: ['용기', '인내', '내면의 힘', '자제력'],
    upright: { meaning: '내면의 힘으로 극복, 부드러운 강함', advice: '인내와 자제력으로 상황을 이끌어가세요', luck: 78 },
    reversed: { meaning: '자신감 부족, 무력감', advice: '자신의 강점을 다시 발견하세요', luck: 52 },
    loveFortune: '진심어린 노력이 통하는 시기입니다',
    careerFortune: '끈기 있는 노력이 인정받습니다',
    wealthFortune: '장기적 관점의 투자가 좋습니다'
  },
  9: { // 은둔자
    element: '땅', planet: '수성',
    keywords: ['내면 탐색', '지혜', '고독', '성찰'],
    upright: { meaning: '내면의 지혜를 찾는 시간', advice: '혼자만의 시간을 가지며 성찰하세요', luck: 65 },
    reversed: { meaning: '고립, 지나친 은둔', advice: '때로는 도움을 요청하는 것도 필요합니다', luck: 45 },
    loveFortune: '관계보다 자신을 돌아볼 시간입니다',
    careerFortune: '연구나 분석 업무에 좋은 시기입니다',
    wealthFortune: '신중한 재정 검토가 필요합니다'
  },
  10: { // 운명의 수레바퀴
    element: '불', planet: '목성',
    keywords: ['운명', '변화', '순환', '기회'],
    upright: { meaning: '행운의 변화, 운명의 전환점', advice: '기회를 놓치지 말고 잡으세요', luck: 90 },
    reversed: { meaning: '불운, 저항할 수 없는 변화', advice: '변화에 순응하며 최선을 다하세요', luck: 40 },
    loveFortune: '운명적인 만남이나 변화가 있습니다',
    careerFortune: '예상치 못한 기회가 찾아옵니다',
    wealthFortune: '횡재운이 있을 수 있습니다'
  }
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

export default function TarotPremiumSection({
  cards,
  question,
  spreadType
}: TarotPremiumSectionProps) {
  // 종합 운세 점수 계산
  const calculateOverallScore = () => {
    let totalLuck = 0;
    cards.forEach(card => {
      const cardData = MAJOR_ARCANA_DATA[card.number % 11] || MAJOR_ARCANA_DATA[0];
      totalLuck += card.isReversed ? cardData.reversed.luck : cardData.upright.luck;
    });
    return Math.round(totalLuck / cards.length);
  };

  const overallScore = calculateOverallScore();

  // 분야별 운세 분석
  const getCategoryFortunes = () => {
    const mainCard = cards[0];
    const cardData = MAJOR_ARCANA_DATA[mainCard.number % 11] || MAJOR_ARCANA_DATA[0];

    return {
      love: { fortune: cardData.loveFortune, score: mainCard.isReversed ? 55 : 75 },
      career: { fortune: cardData.careerFortune, score: mainCard.isReversed ? 50 : 78 },
      wealth: { fortune: cardData.wealthFortune, score: mainCard.isReversed ? 52 : 72 }
    };
  };

  const categoryFortunes = getCategoryFortunes();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* 종합 운세 점수 */}
      <motion.div variants={itemVariants} className="bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 p-6 rounded-2xl text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="w-6 h-6 text-purple-500" />
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">타로 리딩 종합 결과</h3>
        </div>
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/50 dark:bg-gray-800/50 rounded-full mb-4">
          <span className="text-5xl font-bold text-purple-600 dark:text-purple-400">{overallScore}</span>
          <span className="text-gray-500">/ 100</span>
        </div>
        <p className="text-gray-700 dark:text-gray-300">
          {overallScore >= 75 ? '✨ 긍정적인 에너지가 넘칩니다!' :
           overallScore >= 50 ? '💫 균형 잡힌 시기입니다.' :
           '🌙 신중함이 필요한 시기입니다.'}
        </p>
      </motion.div>

      {/* 카드별 상세 해석 */}
      <motion.div variants={itemVariants}>
        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <Eye className="w-5 h-5 text-purple-500" />
          카드별 심층 해석
        </h4>
        <div className="space-y-4">
          {cards.map((card, idx) => {
            const cardData = MAJOR_ARCANA_DATA[card.number % 11] || MAJOR_ARCANA_DATA[0];
            const reading = card.isReversed ? cardData.reversed : cardData.upright;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 rounded-2xl"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-24 rounded-lg flex items-center justify-center text-2xl font-bold ${
                    card.isReversed
                      ? 'bg-gradient-to-b from-gray-600 to-gray-800 text-gray-300'
                      : 'bg-gradient-to-b from-purple-500 to-indigo-600 text-white'
                  }`}>
                    {card.number}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h5 className="font-bold text-gray-800 dark:text-gray-200">{card.name}</h5>
                      {card.isReversed && (
                        <span className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">역방향</span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {cardData.keywords.map((kw, i) => (
                        <span key={i} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded">
                          {kw}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">{reading.meaning}</p>
                    <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">
                      💡 {reading.advice}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* 분야별 운세 */}
      <motion.div variants={itemVariants}>
        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-500" />
          분야별 운세
        </h4>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-pink-500" />
              <span className="font-bold text-pink-700 dark:text-pink-300">연애운</span>
              <span className="ml-auto font-bold text-pink-600">{categoryFortunes.love.score}점</span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">{categoryFortunes.love.fortune}</p>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-5 h-5 text-blue-500" />
              <span className="font-bold text-blue-700 dark:text-blue-300">직업운</span>
              <span className="ml-auto font-bold text-blue-600">{categoryFortunes.career.score}점</span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">{categoryFortunes.career.fortune}</p>
          </div>
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="w-5 h-5 text-amber-500" />
              <span className="font-bold text-amber-700 dark:text-amber-300">재물운</span>
              <span className="ml-auto font-bold text-amber-600">{categoryFortunes.wealth.score}점</span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">{categoryFortunes.wealth.fortune}</p>
          </div>
        </div>
      </motion.div>

      {/* 종합 조언 */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-2xl text-white">
        <div className="flex items-center gap-3 mb-4">
          <Compass className="w-6 h-6" />
          <h4 className="font-bold text-lg">타로가 전하는 메시지</h4>
        </div>
        <p className="leading-relaxed opacity-95">
          {overallScore >= 75
            ? '카드들이 매우 긍정적인 에너지를 보여주고 있습니다. 지금은 용기를 가지고 행동할 때입니다. 기회를 놓치지 말고 적극적으로 나아가세요. 우주가 당신을 응원하고 있습니다.'
            : overallScore >= 50
            ? '균형과 조화가 중요한 시기입니다. 급하게 결정하기보다 차분히 상황을 관찰하세요. 내면의 목소리에 귀 기울이면 올바른 길을 찾을 수 있습니다.'
            : '도전적인 시기일 수 있지만, 이것은 성장의 기회이기도 합니다. 인내를 가지고 자신을 돌보세요. 어려움 속에서 더 강해질 수 있습니다.'}
        </p>
      </motion.div>
    </motion.div>
  );
}
