'use client';

import { motion } from 'framer-motion';
import {
  Moon, Star, Sun, Cloud, Eye, Brain,
  Heart, Wallet, Briefcase, Home, Users,
  AlertTriangle, CheckCircle, Lightbulb, Sparkles,
  Calendar, Clock, Compass, Shield, Target
} from 'lucide-react';

interface DreamPremiumSectionProps {
  dreamCategory: string;
  dreamKeywords: string[];
  interpretation: string;
  luckyNumbers: number[];
  luckyColor: string;
}

// 꿈 카테고리별 상세 데이터
const DREAM_CATEGORY_DATA: Record<string, {
  element: string;
  energy: string;
  meaning: string;
  psychology: string;
  timing: string;
  action: string[];
  caution: string[];
  luckyAreas: { area: string; score: number; advice: string }[];
  symbols: { symbol: string; meaning: string }[];
}> = {
  길몽: {
    element: '화', energy: '양(陽)',
    meaning: '좋은 기운이 감돌고 있습니다. 이 꿈은 당신에게 행운이 다가오고 있음을 알려주는 신호입니다.',
    psychology: '무의식 속에서 긍정적인 에너지가 솟아오르고 있습니다. 현재의 방향이 옳다는 확신을 얻을 수 있습니다.',
    timing: '꿈을 꾼 후 3일~7일 이내에 좋은 일이 생길 수 있습니다.',
    action: ['적극적으로 기회를 잡으세요', '새로운 시작을 계획하기 좋은 때입니다', '중요한 결정을 내려도 좋습니다'],
    caution: ['지나친 자만은 금물입니다', '꿈에만 의존하지 말고 노력하세요'],
    luckyAreas: [
      { area: '재물운', score: 85, advice: '투자와 사업에 좋은 시기입니다' },
      { area: '연애운', score: 80, advice: '새로운 만남이나 진전이 있을 수 있습니다' },
      { area: '직업운', score: 82, advice: '승진이나 좋은 기회가 있을 수 있습니다' },
      { area: '건강운', score: 78, advice: '활력이 넘치는 시기입니다' }
    ],
    symbols: [
      { symbol: '🌟', meaning: '성공과 성취' },
      { symbol: '🎁', meaning: '예상치 못한 선물' },
      { symbol: '🌈', meaning: '희망과 새로운 시작' }
    ]
  },
  흉몽: {
    element: '수', energy: '음(陰)',
    meaning: '주의가 필요한 시기입니다. 하지만 흉몽은 경고의 의미이므로 미리 대비하면 화를 피할 수 있습니다.',
    psychology: '무의식이 잠재된 불안이나 걱정을 표현하고 있습니다. 현실에서 해결해야 할 문제가 있을 수 있습니다.',
    timing: '꿈을 꾼 후 일주일간 특히 주의하세요. 이후에는 기운이 바뀝니다.',
    action: ['큰 결정은 잠시 미루세요', '건강을 점검하세요', '주변 관계를 돌아보세요'],
    caution: ['과도한 걱정은 오히려 해롭습니다', '꿈은 경고일 뿐, 예언이 아닙니다'],
    luckyAreas: [
      { area: '재물운', score: 45, advice: '큰 지출과 투자는 피하세요' },
      { area: '연애운', score: 50, advice: '오해가 생길 수 있으니 소통에 신경 쓰세요' },
      { area: '직업운', score: 48, advice: '신중하게 행동하세요' },
      { area: '건강운', score: 42, advice: '건강 관리에 특히 신경 쓰세요' }
    ],
    symbols: [
      { symbol: '⚠️', meaning: '주의와 경고' },
      { symbol: '🛡️', meaning: '대비와 보호' },
      { symbol: '🔄', meaning: '변화와 정화' }
    ]
  },
  태몽: {
    element: '목', energy: '생(生)',
    meaning: '새로운 생명과 창조의 기운이 감돌고 있습니다. 임신과 관련될 수도 있고, 새로운 시작을 의미하기도 합니다.',
    psychology: '창조적 에너지가 활성화되어 있습니다. 새로운 프로젝트나 아이디어가 떠오를 수 있습니다.',
    timing: '3개월 이내에 새로운 시작과 관련된 일이 있을 수 있습니다.',
    action: ['새로운 시작을 준비하세요', '창의적인 활동에 집중하세요', '가족과의 시간을 소중히 하세요'],
    caution: ['건강을 잘 돌보세요', '무리하지 마세요'],
    luckyAreas: [
      { area: '재물운', score: 70, advice: '새로운 수입원이 생길 수 있습니다' },
      { area: '연애운', score: 88, advice: '연인과의 관계가 발전합니다' },
      { area: '직업운', score: 75, advice: '새로운 프로젝트에 좋은 시기입니다' },
      { area: '건강운', score: 72, advice: '몸을 소중히 다루세요' }
    ],
    symbols: [
      { symbol: '🌱', meaning: '새로운 시작' },
      { symbol: '✨', meaning: '창조와 탄생' },
      { symbol: '👶', meaning: '새 생명, 새 프로젝트' }
    ]
  },
  반복몽: {
    element: '토', energy: '정(靜)',
    meaning: '무의식이 중요한 메시지를 전달하려 합니다. 반복되는 꿈은 해결되지 않은 문제를 암시합니다.',
    psychology: '마음속 깊이 자리 잡은 감정이나 미해결 과제가 표출되고 있습니다.',
    timing: '문제를 인식하고 해결하면 더 이상 반복되지 않습니다.',
    action: ['꿈의 메시지를 곰곰이 생각해보세요', '전문가와 상담을 고려해보세요', '일기를 쓰며 감정을 정리하세요'],
    caution: ['무시하지 말고 진지하게 받아들이세요', '혼자 끙끙 앓지 마세요'],
    luckyAreas: [
      { area: '재물운', score: 60, advice: '변화의 시기, 신중함이 필요합니다' },
      { area: '연애운', score: 58, advice: '관계를 돌아보는 시간이 필요합니다' },
      { area: '직업운', score: 62, advice: '현재 상황을 객관적으로 평가하세요' },
      { area: '건강운', score: 55, advice: '정신 건강에 특히 신경 쓰세요' }
    ],
    symbols: [
      { symbol: '🔁', meaning: '반복과 패턴' },
      { symbol: '💭', meaning: '무의식의 메시지' },
      { symbol: '🔓', meaning: '해결과 해방' }
    ]
  },
  일반: {
    element: '금', energy: '중(中)',
    meaning: '일상의 경험이 꿈으로 나타난 것입니다. 특별한 길흉은 없으나 마음의 상태를 반영합니다.',
    psychology: '하루 동안의 경험과 감정이 정리되는 과정입니다.',
    timing: '특별한 시기적 의미는 없습니다.',
    action: ['평상시처럼 생활하세요', '꿈 일기를 쓰면 자기 이해에 도움됩니다'],
    caution: ['꿈에 지나치게 의미를 부여하지 마세요'],
    luckyAreas: [
      { area: '재물운', score: 65, advice: '안정적인 흐름이 유지됩니다' },
      { area: '연애운', score: 65, advice: '평온한 관계가 지속됩니다' },
      { area: '직업운', score: 68, advice: '꾸준히 노력하면 됩니다' },
      { area: '건강운', score: 70, advice: '무난한 상태입니다' }
    ],
    symbols: [
      { symbol: '💤', meaning: '휴식과 회복' },
      { symbol: '📖', meaning: '일상의 기록' },
      { symbol: '⚖️', meaning: '균형과 안정' }
    ]
  }
};

// 애니메이션 설정
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function DreamPremiumSection({
  dreamCategory,
  dreamKeywords,
  interpretation,
  luckyNumbers,
  luckyColor
}: DreamPremiumSectionProps) {
  const categoryData = DREAM_CATEGORY_DATA[dreamCategory] || DREAM_CATEGORY_DATA['일반'];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* 꿈 분석 개요 */}
      <motion.div variants={itemVariants} className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-2xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl">
            <Moon className="w-8 h-8 text-white" />
          </div>
          <div>
            <span className="text-sm text-gray-500">꿈 유형</span>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{dreamCategory}</h3>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-bold ${
              categoryData.energy === '양(陽)' ? 'bg-amber-100 text-amber-700' :
              categoryData.energy === '음(陰)' ? 'bg-blue-100 text-blue-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {categoryData.element} · {categoryData.energy}
            </span>
          </div>
        </div>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {categoryData.meaning}
        </p>
      </motion.div>

      {/* 꿈 키워드 */}
      <motion.div variants={itemVariants}>
        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <Eye className="w-5 h-5 text-purple-500" />
          꿈에 나타난 핵심 키워드
        </h4>
        <div className="flex flex-wrap gap-2">
          {dreamKeywords.map((keyword, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-xl"
            >
              {keyword}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* 심층 해석 */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-4">
          <div className="flex items-center gap-2 text-white">
            <Brain className="w-5 h-5" />
            <h4 className="font-bold">심층 심리 분석</h4>
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            {categoryData.psychology}
          </p>
          <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
            <h5 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4" /> 효력 기간
            </h5>
            <p className="text-sm text-gray-700 dark:text-gray-300">{categoryData.timing}</p>
          </div>
        </div>
      </motion.div>

      {/* 분야별 영향 */}
      <motion.div variants={itemVariants}>
        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-500" />
          분야별 영향
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          {categoryData.luckyAreas.map((area, idx) => {
            const icons = [Wallet, Heart, Briefcase, Shield];
            const IconComponent = icons[idx] || Star;
            return (
              <div key={idx} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <IconComponent className="w-5 h-5 text-purple-500" />
                    <span className="font-bold text-gray-800 dark:text-gray-200">{area.area}</span>
                  </div>
                  <span className={`text-lg font-bold ${
                    area.score >= 70 ? 'text-green-600' : area.score >= 50 ? 'text-amber-600' : 'text-red-600'
                  }`}>{area.score}점</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-2">
                  <motion.div
                    className={`h-full rounded-full ${
                      area.score >= 70 ? 'bg-green-500' : area.score >= 50 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${area.score}%` }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                  />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{area.advice}</p>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* 행동 지침 & 주의사항 */}
      <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl">
          <h4 className="font-bold text-green-700 dark:text-green-300 mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            권장 행동
          </h4>
          <ul className="space-y-3">
            {categoryData.action.map((a, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                {a}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-2xl">
          <h4 className="font-bold text-amber-700 dark:text-amber-300 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            주의 사항
          </h4>
          <ul className="space-y-3">
            {categoryData.caution.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* 행운 아이템 */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-amber-100 via-yellow-100 to-orange-100 dark:from-amber-900/30 dark:via-yellow-900/30 dark:to-orange-900/30 p-6 rounded-2xl">
        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          행운의 힌트
        </h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl">
            <span className="text-sm text-gray-500">행운의 숫자</span>
            <p className="font-bold text-lg text-amber-700 dark:text-amber-300">
              {luckyNumbers.join(', ')}
            </p>
          </div>
          <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl">
            <span className="text-sm text-gray-500">행운의 색</span>
            <p className="font-bold text-lg text-amber-700 dark:text-amber-300">{luckyColor}</p>
          </div>
          <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl">
            <span className="text-sm text-gray-500">꿈의 상징</span>
            <div className="flex justify-center gap-1 mt-1">
              {categoryData.symbols.map((s, i) => (
                <span key={i} className="text-2xl" title={s.meaning}>{s.symbol}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
