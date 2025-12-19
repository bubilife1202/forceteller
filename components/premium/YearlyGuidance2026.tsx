'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import {
  Compass, Target, Shield, Flame, Droplets,
  Mountain, TreeDeciduous, Gem, Sparkles, Star,
  CheckCircle, AlertTriangle, Lightbulb, Heart,
  Wallet, Briefcase, Users, Award, Zap, Clock
} from 'lucide-react';

interface YearlyGuidance2026Props {
  result: SajuResult;
  name: string;
}

// 오행별 색상
const ELEMENT_COLORS = {
  목: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300', icon: TreeDeciduous },
  화: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300', icon: Flame },
  토: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300', icon: Mountain },
  금: { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-700 dark:text-gray-300', icon: Gem },
  수: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', icon: Droplets },
};

// 애니메이션 설정
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function YearlyGuidance2026({ result, name }: YearlyGuidance2026Props) {
  const dayElement = result.day.stem.element;
  const elementStyle = ELEMENT_COLORS[dayElement as keyof typeof ELEMENT_COLORS] || ELEMENT_COLORS['토'];
  const ElementIcon = elementStyle.icon;

  // 일간별 2026년 인생 테마
  const getYearTheme = () => {
    const themes: Record<string, {
      theme: string;
      keyword: string;
      fortune: string;
      warning: string;
      opportunity: string;
      challenge: string;
    }> = {
      목: {
        theme: '성장과 확장의 해',
        keyword: '도약',
        fortune: '나무가 불을 피우듯, 당신의 재능과 노력이 세상에 빛을 발하는 해입니다. 그동안 준비해온 것들이 열매를 맺기 시작하며, 특히 창의적인 분야에서 뛰어난 성과를 거둘 수 있습니다.',
        warning: '지나친 헌신으로 기력이 소진될 수 있습니다. 자기 관리와 휴식의 균형이 필요합니다.',
        opportunity: '새로운 프로젝트 시작, 교육/강의 활동, 해외 진출, 예술적 도전',
        challenge: '에너지 관리, 과로 방지, 금전적 낭비 주의'
      },
      화: {
        theme: '정점과 카리스마의 해',
        keyword: '빛남',
        fortune: '같은 화(火)의 기운이 만나 당신의 존재감이 극대화됩니다. 리더십을 발휘하고 중심에 서는 역할을 맡게 될 것입니다. 열정과 추진력이 최고조에 달해 불가능해 보이던 일도 해낼 수 있습니다.',
        warning: '과열과 충동의 위험이 있습니다. 냉정함을 유지하고 중요한 결정은 숙고하세요.',
        opportunity: '리더 역할, 사업 확장, 미디어 노출, 대중적 인지도 상승',
        challenge: '감정 조절, 인간관계 마찰, 건강(심장, 혈압) 관리'
      },
      토: {
        theme: '풍요와 결실의 해',
        keyword: '수확',
        fortune: '화생토(火生土)의 상생으로 모든 운이 상승합니다. 마치 따뜻한 햇살 아래 대지가 비옥해지듯, 재물, 건강, 인간관계 모두 좋은 기운을 받습니다. 안정적인 성장과 풍요로움을 누리는 해가 될 것입니다.',
        warning: '지나친 안주로 새로운 기회를 놓칠 수 있습니다. 적절한 도전 정신을 유지하세요.',
        opportunity: '부동산 투자, 사업 안정화, 가족 행사, 건강 회복',
        challenge: '게으름 경계, 변화에 대한 열린 자세, 인간관계 확장'
      },
      금: {
        theme: '시련과 단련의 해',
        keyword: '정제',
        fortune: '화극금(火克金)으로 도전적인 해이지만, 이는 대장장이가 쇠를 불에 달구어 명검을 만드는 과정과 같습니다. 어려움을 통해 더욱 강하고 순수해지며, 진정한 가치를 발견하게 됩니다.',
        warning: '무리한 확장이나 도전은 피하고, 내실을 다지는 데 집중하세요.',
        opportunity: '자기 개발, 전문성 강화, 숨은 재능 발견, 내면 성장',
        challenge: '스트레스 관리, 건강(폐, 호흡기) 관리, 재정 보수적 운용'
      },
      수: {
        theme: '지혜와 제어의 해',
        keyword: '조절',
        fortune: '수극화(水克火)로 당신이 2026년의 기운을 제어하고 조절하는 위치에 있습니다. 물이 불을 끄듯, 혼란스러운 상황을 정리하고 질서를 만들어가는 역할을 하게 됩니다. 지혜롭게 상황을 이끌어갈 수 있습니다.',
        warning: '과도한 통제 욕구나 강한 화기와의 충돌로 갈등이 생길 수 있습니다.',
        opportunity: '문제 해결, 조정자 역할, 학문적 성취, 전략 수립',
        challenge: '유연성 유지, 타인과의 협력, 감정적 소통'
      }
    };
    return themes[dayElement] || themes['토'];
  };

  const yearTheme = getYearTheme();

  // 분기별 가이드
  const getQuarterlyGuide = () => {
    return [
      {
        quarter: '1분기 (1월~3월)',
        title: '씨앗을 뿌리는 시기',
        theme: '계획과 준비',
        color: 'from-green-400 to-emerald-500',
        advice: [
          '연초에 명확한 목표를 설정하세요',
          '새로운 학습이나 자기계발을 시작하기 좋습니다',
          '인맥을 정리하고 중요한 관계에 집중하세요',
          '재정 상태를 점검하고 저축 계획을 세우세요'
        ],
        luckyActivity: '명상, 독서, 계획 수립, 건강검진',
        caution: '조급함을 버리고 기초를 탄탄히 다지세요'
      },
      {
        quarter: '2분기 (4월~6월)',
        title: '성장의 시기',
        theme: '확장과 실행',
        color: 'from-orange-400 to-red-500',
        advice: [
          '1분기에 세운 계획을 적극적으로 실행하세요',
          '새로운 프로젝트나 사업 기회를 잡으세요',
          '인간관계를 확장하고 네트워킹에 힘쓰세요',
          '여행이나 새로운 경험에 도전하세요'
        ],
        luckyActivity: '사업 미팅, 계약, 여행, 운동',
        caution: '에너지 과잉으로 인한 충돌을 주의하세요'
      },
      {
        quarter: '3분기 (7월~9월)',
        title: '결실의 시기',
        theme: '수확과 조정',
        color: 'from-amber-400 to-orange-500',
        advice: [
          '상반기 노력의 결실을 거두는 시기입니다',
          '중요한 결정이나 계약을 마무리하세요',
          '재정 상태를 재점검하고 조정하세요',
          '건강을 돌보고 휴식을 취하세요'
        ],
        luckyActivity: '투자 수익 실현, 승진/이직, 가족 행사',
        caution: '자만심을 경계하고 겸손함을 유지하세요'
      },
      {
        quarter: '4분기 (10월~12월)',
        title: '마무리의 시기',
        theme: '정리와 준비',
        color: 'from-blue-400 to-indigo-500',
        advice: [
          '올해의 성과를 정리하고 평가하세요',
          '내년을 위한 장기적 계획을 구상하세요',
          '감사의 마음으로 관계를 돌보세요',
          '몸과 마음의 에너지를 충전하세요'
        ],
        luckyActivity: '송년 모임, 자선 활동, 내년 계획, 휴식',
        caution: '연말 과소비와 과음을 주의하세요'
      }
    ];
  };

  const quarterlyGuide = getQuarterlyGuide();

  // 운명 개선 행동 가이드
  const getActionGuide = () => {
    const actions: Record<string, string[]> = {
      목: [
        '아침에 동쪽을 향해 스트레칭하며 생기를 받으세요',
        '녹색 계열의 옷이나 액세서리를 자주 착용하세요',
        '식물을 키우거나 자연 속에서 시간을 보내세요',
        '창의적인 취미 활동(글쓰기, 예술, 음악)을 즐기세요',
        '새로운 것을 배우는 데 투자하세요'
      ],
      화: [
        '명상과 호흡으로 내면의 열기를 조절하세요',
        '빨간색을 과하게 사용하지 말고 시원한 색상을 활용하세요',
        '충분한 수분 섭취와 휴식을 취하세요',
        '리더십을 발휘하되 경청하는 자세를 가지세요',
        '봉사활동으로 에너지를 나눠주세요'
      ],
      토: [
        '규칙적인 생활 리듬을 유지하세요',
        '노란색, 베이지색 계열을 활용하세요',
        '신뢰할 수 있는 인맥을 소중히 하세요',
        '땅과 접촉하는 활동(정원 가꾸기, 등산)이 좋습니다',
        '안정적인 투자와 저축에 힘쓰세요'
      ],
      금: [
        '수(水)의 기운을 보충하세요 - 물 자주 마시기, 수영',
        '흰색, 회색, 금속 액세서리를 활용하세요',
        '차분하고 절제된 생활을 유지하세요',
        '전문 분야의 깊이를 더하는 공부를 하세요',
        '과도한 스트레스 상황을 피하고 명상하세요'
      ],
      수: [
        '물가나 바다 근처에서 에너지를 충전하세요',
        '검은색, 파란색 계열을 활용하세요',
        '직관을 믿되 논리적 검증도 병행하세요',
        '지식을 나누고 가르치는 활동이 좋습니다',
        '유연한 사고로 다양한 의견을 수용하세요'
      ]
    };
    return actions[dayElement] || actions['토'];
  };

  // 행운 아이템
  const getLuckyItems = () => {
    const items: Record<string, {
      colors: string[];
      numbers: string;
      directions: string;
      items: string[];
      food: string[];
    }> = {
      목: {
        colors: ['녹색', '청록색', '에메랄드'],
        numbers: '3, 8',
        directions: '동쪽',
        items: ['나무 소재 액세서리', '식물', '책', '파란 보석'],
        food: ['녹색 채소', '신맛 과일', '콩류', '미역']
      },
      화: {
        colors: ['빨간색', '주황색', '자주색'],
        numbers: '2, 7',
        directions: '남쪽',
        items: ['루비', '양초', '태양 모양 장식', '붉은 꽃'],
        food: ['붉은 과일', '쓴맛 음식', '적포도주', '고추']
      },
      토: {
        colors: ['노란색', '베이지', '갈색'],
        numbers: '5, 10',
        directions: '중앙',
        items: ['황금', '도자기', '크리스탈', '대리석'],
        food: ['단맛 음식', '곡류', '감자', '당근']
      },
      금: {
        colors: ['흰색', '회색', '은색'],
        numbers: '4, 9',
        directions: '서쪽',
        items: ['은 액세서리', '금속 장신구', '다이아몬드', '시계'],
        food: ['매운 음식', '생강', '무', '양파']
      },
      수: {
        colors: ['검은색', '남색', '진한 파랑'],
        numbers: '1, 6',
        directions: '북쪽',
        items: ['진주', '사파이어', '물병', '달 모양 장식'],
        food: ['짠맛 음식', '검은콩', '미역', '해산물']
      }
    };
    return items[dayElement] || items['토'];
  };

  const luckyItems = getLuckyItems();
  const actionGuide = getActionGuide();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* 연간 테마 */}
      <motion.div variants={itemVariants} className={`p-6 rounded-2xl ${elementStyle.bg}`}>
        <div className="flex items-center gap-4 mb-4">
          <div className={`p-4 ${elementStyle.bg} rounded-xl`}>
            <ElementIcon className={`w-8 h-8 ${elementStyle.text}`} />
          </div>
          <div>
            <span className={`text-sm font-medium ${elementStyle.text}`}>2026년 {name}님의 인생 테마</span>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{yearTheme.theme}</h3>
          </div>
          <div className={`ml-auto px-4 py-2 ${elementStyle.bg} rounded-full`}>
            <span className={`text-lg font-bold ${elementStyle.text}`}>#{yearTheme.keyword}</span>
          </div>
        </div>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          {yearTheme.fortune}
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
            <h4 className="font-bold text-green-700 dark:text-green-300 flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4" /> 기회
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">{yearTheme.opportunity}</p>
          </div>
          <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
            <h4 className="font-bold text-red-700 dark:text-red-300 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4" /> 주의
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">{yearTheme.challenge}</p>
          </div>
        </div>
      </motion.div>

      {/* 분기별 가이드 */}
      <motion.div variants={itemVariants}>
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-500" />
          2026년 분기별 인생 가이드
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {quarterlyGuide.map((quarter, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <div className={`bg-gradient-to-r ${quarter.color} p-4`}>
                <span className="text-white/80 text-sm">{quarter.quarter}</span>
                <h4 className="text-white font-bold text-lg">{quarter.title}</h4>
              </div>
              <div className="p-4 space-y-3">
                <div className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300">
                  테마: {quarter.theme}
                </div>
                <ul className="space-y-2">
                  {quarter.advice.map((advice, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className="text-purple-500 mt-0.5">•</span>
                      {advice}
                    </li>
                  ))}
                </ul>
                <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                    💫 추천 활동: {quarter.luckyActivity}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 운세 개선 행동 가이드 */}
      <motion.div variants={itemVariants} className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-6 rounded-2xl">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          2026년 운세 개선 실천 항목
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {actionGuide.map((action, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl"
            >
              <span className="w-6 h-6 flex items-center justify-center bg-purple-500 text-white rounded-full text-sm font-bold flex-shrink-0">
                {idx + 1}
              </span>
              <span className="text-sm text-gray-700 dark:text-gray-300">{action}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 행운 아이템 */}
      <motion.div variants={itemVariants}>
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-500" />
          2026년 행운의 아이템
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-xl">
            <h4 className="font-bold text-pink-700 dark:text-pink-300 mb-2">🎨 행운의 색상</h4>
            <div className="flex flex-wrap gap-2">
              {luckyItems.colors.map((color, idx) => (
                <span key={idx} className="px-2 py-1 bg-white dark:bg-gray-800 rounded text-sm text-gray-700 dark:text-gray-300">
                  {color}
                </span>
              ))}
            </div>
          </div>
          <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
            <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2">🔢 행운의 숫자 & 방향</h4>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">숫자:</span> {luckyItems.numbers}<br/>
              <span className="font-medium">방향:</span> {luckyItems.directions}
            </p>
          </div>
          <div className="p-4 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-xl">
            <h4 className="font-bold text-amber-700 dark:text-amber-300 mb-2">💎 행운의 아이템</h4>
            <div className="flex flex-wrap gap-1">
              {luckyItems.items.map((item, idx) => (
                <span key={idx} className="text-sm text-gray-700 dark:text-gray-300">
                  {idx > 0 && '·'} {item}
                </span>
              ))}
            </div>
          </div>
          <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
            <h4 className="font-bold text-green-700 dark:text-green-300 mb-2">🍎 행운의 음식</h4>
            <div className="flex flex-wrap gap-1">
              {luckyItems.food.map((food, idx) => (
                <span key={idx} className="text-sm text-gray-700 dark:text-gray-300">
                  {idx > 0 && '·'} {food}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* 핵심 메시지 */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-2xl text-white">
        <div className="flex items-center gap-4 mb-4">
          <Sparkles className="w-8 h-8" />
          <h3 className="text-xl font-bold">2026년 {name}님에게 전하는 메시지</h3>
        </div>
        <p className="text-lg leading-relaxed opacity-95">
          {dayElement === '목' && '당신의 재능이 세상을 밝히는 한 해가 될 것입니다. 나무가 불을 피우듯, 당신의 노력은 빛나는 결실로 돌아올 것입니다. 지치지 않도록 자신을 돌보면서 꿈을 향해 나아가세요.'}
          {dayElement === '화' && '당신은 2026년의 주인공입니다. 열정을 가지고 원하는 것을 이루되, 불꽃이 너무 거세지지 않도록 중심을 잡으세요. 당신의 빛은 많은 이에게 영감을 줄 것입니다.'}
          {dayElement === '토' && '풍요와 안정의 기운이 당신을 감싸는 한 해입니다. 지금까지의 노력이 결실을 맺고, 소중한 것들이 더욱 단단해질 것입니다. 감사하는 마음으로 복을 나누세요.'}
          {dayElement === '금' && '시련은 당신을 더 강하게 만들 것입니다. 불 속에서 단련되는 금처럼, 이 해를 통해 당신의 진정한 가치가 빛날 것입니다. 인내하며 내면의 힘을 키우세요.'}
          {dayElement === '수' && '당신은 혼란 속에서 질서를 만들어내는 지혜로운 존재입니다. 물이 불을 다스리듯, 어려운 상황도 현명하게 헤쳐나갈 것입니다. 유연함을 잃지 마세요.'}
        </p>
      </motion.div>
    </motion.div>
  );
}
