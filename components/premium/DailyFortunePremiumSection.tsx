'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import {
  Sun, Moon, Star, Clock, Calendar,
  Heart, Wallet, Briefcase, Activity, Users,
  AlertTriangle, CheckCircle, Sparkles, Compass,
  TrendingUp, TrendingDown, Coffee, Zap
} from 'lucide-react';

interface DailyFortunePremiumSectionProps {
  result: SajuResult;
  name: string;
  date: Date;
}

// 시간대별 운세
const TIME_PERIODS = [
  { period: '새벽 (00:00~06:00)', hours: '자시~묘시', element: '수목', icon: Moon },
  { period: '오전 (06:00~12:00)', hours: '진시~사시', element: '토화', icon: Sun },
  { period: '오후 (12:00~18:00)', hours: '오시~유시', element: '화금', icon: Coffee },
  { period: '저녁 (18:00~24:00)', hours: '술시~해시', element: '토수', icon: Star }
];

// 애니메이션 설정
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function DailyFortunePremiumSection({
  result,
  name,
  date
}: DailyFortunePremiumSectionProps) {
  const dayElement = result.day.stem.element;
  const dayNumber = date.getDate();
  const month = date.getMonth() + 1;

  // 오늘의 종합 점수 계산
  const calculateDailyScore = () => {
    let score = 60;
    const dayOfWeek = date.getDay();

    // 일간에 따른 요일별 운
    const luckyDays: Record<string, number[]> = {
      '목': [4, 5],     // 목-금
      '화': [2, 0],     // 화-일
      '토': [6, 3],     // 토-수
      '금': [1, 6],     // 월-토
      '수': [3, 4]      // 수-목
    };

    if (luckyDays[dayElement]?.includes(dayOfWeek)) score += 15;

    // 일자에 따른 변동
    if (dayNumber % 10 === parseInt(result.day.stem.ko.charCodeAt(0).toString().slice(-1))) {
      score += 10;
    }

    return Math.min(Math.max(score, 35), 95);
  };

  const dailyScore = calculateDailyScore();

  // 시간대별 운세 계산
  const getTimeFortuneScore = (periodElement: string) => {
    let score = 55;
    const elements = periodElement.split('');

    elements.forEach(el => {
      if (el === dayElement) score += 10;
      // 상생 관계
      const generates: Record<string, string> = { '목': '화', '화': '토', '토': '금', '금': '수', '수': '목' };
      const generatedBy: Record<string, string> = { '목': '수', '화': '목', '토': '화', '금': '토', '수': '금' };
      if (generates[dayElement] === el) score += 8;
      if (generatedBy[dayElement] === el) score += 12;
    });

    return Math.min(score, 95);
  };

  // 분야별 오늘의 운세
  const getDailyCategories = () => {
    const base = dailyScore;
    return {
      love: {
        score: Math.min(base + (dayElement === '화' ? 10 : 0), 100),
        icon: Heart,
        label: '연애운',
        advice: dailyScore >= 70 ? '적극적인 표현이 좋은 하루' : '차분하게 상대를 배려하세요'
      },
      wealth: {
        score: Math.min(base + (dayElement === '토' ? 12 : dayElement === '금' ? -8 : 5), 100),
        icon: Wallet,
        label: '재물운',
        advice: dailyScore >= 70 ? '소소한 행운이 있을 수 있어요' : '충동구매를 자제하세요'
      },
      career: {
        score: Math.min(base + (dayElement === '목' ? 8 : 0), 100),
        icon: Briefcase,
        label: '직업운',
        advice: dailyScore >= 70 ? '업무가 순조롭게 진행됩니다' : '꼼꼼히 검토하는 것이 좋아요'
      },
      health: {
        score: Math.min(base + 5, 100),
        icon: Activity,
        label: '건강운',
        advice: dailyScore >= 70 ? '활력이 넘치는 하루' : '충분한 휴식이 필요해요'
      },
      social: {
        score: Math.min(base + (dayElement === '화' ? 15 : 0), 100),
        icon: Users,
        label: '대인운',
        advice: dailyScore >= 70 ? '좋은 만남이 기대됩니다' : '오해가 생기지 않도록 주의하세요'
      }
    };
  };

  const categories = getDailyCategories();

  // 오늘의 행운 아이템
  const getLuckyItems = () => {
    const items: Record<string, { color: string; number: string; direction: string; food: string; activity: string }> = {
      '목': { color: '녹색, 청색', number: '3, 8', direction: '동쪽', food: '샐러드, 채소', activity: '산책, 독서' },
      '화': { color: '빨강, 주황', number: '2, 7', direction: '남쪽', food: '매운 음식', activity: '운동, 사교' },
      '토': { color: '노랑, 갈색', number: '5, 0', direction: '중앙', food: '곡물, 견과류', activity: '정원 가꾸기' },
      '금': { color: '흰색, 금색', number: '4, 9', direction: '서쪽', food: '해산물', activity: '음악 감상' },
      '수': { color: '검정, 파랑', number: '1, 6', direction: '북쪽', food: '국물 요리', activity: '명상, 목욕' }
    };
    return items[dayElement] || items['토'];
  };

  const luckyItems = getLuckyItems();

  // 오늘의 조언
  const getDailyAdvice = () => {
    if (dailyScore >= 80) {
      return {
        emoji: '🌟',
        title: '최고의 하루!',
        message: `오늘은 ${name}님에게 좋은 기운이 가득합니다. 하고 싶었던 일을 시작하거나 중요한 결정을 내리기 좋은 날입니다. 자신감을 가지고 적극적으로 행동하세요!`
      };
    } else if (dailyScore >= 65) {
      return {
        emoji: '✨',
        title: '순조로운 하루',
        message: `오늘은 대체로 좋은 흐름입니다. 계획대로 진행하면 무난하게 하루를 보낼 수 있어요. 작은 기회도 놓치지 마세요.`
      };
    } else if (dailyScore >= 50) {
      return {
        emoji: '💫',
        title: '평온한 하루',
        message: `특별한 일은 없지만 안정적인 하루입니다. 무리하지 말고 현재에 충실하세요. 작은 일상의 행복을 찾아보세요.`
      };
    } else {
      return {
        emoji: '🌙',
        title: '신중한 하루',
        message: `오늘은 조금 조심이 필요한 날입니다. 큰 결정은 미루고, 차분하게 상황을 관찰하세요. 휴식을 취하는 것도 좋습니다.`
      };
    }
  };

  const dailyAdvice = getDailyAdvice();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* 오늘의 종합 운세 */}
      <motion.div variants={itemVariants} className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-2xl text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Calendar className="w-6 h-6 text-amber-600" />
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            {month}월 {dayNumber}일 오늘의 운세
          </h3>
        </div>
        <div className="text-6xl mb-4">{dailyAdvice.emoji}</div>
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/50 dark:bg-gray-800/50 rounded-full mb-4">
          <span className="text-4xl font-bold text-amber-600 dark:text-amber-400">{dailyScore}점</span>
          <span className="text-gray-500">/ 100</span>
        </div>
        <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">{dailyAdvice.title}</h4>
        <p className="text-gray-700 dark:text-gray-300 max-w-lg mx-auto">
          {dailyAdvice.message}
        </p>
      </motion.div>

      {/* 시간대별 운세 */}
      <motion.div variants={itemVariants}>
        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-500" />
          시간대별 운세
        </h4>
        <div className="grid md:grid-cols-4 gap-4">
          {TIME_PERIODS.map((period, idx) => {
            const score = getTimeFortuneScore(period.element);
            const IconComponent = period.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-xl text-center"
              >
                <IconComponent className={`w-8 h-8 mx-auto mb-2 ${
                  score >= 70 ? 'text-green-500' : score >= 50 ? 'text-amber-500' : 'text-gray-400'
                }`} />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{period.period}</span>
                <div className={`text-2xl font-bold mt-1 ${
                  score >= 70 ? 'text-green-600' : score >= 50 ? 'text-amber-600' : 'text-gray-500'
                }`}>
                  {score}점
                </div>
                <p className="text-xs text-gray-500 mt-1">{period.hours}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* 분야별 운세 */}
      <motion.div variants={itemVariants}>
        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-500" />
          분야별 오늘의 운세
        </h4>
        <div className="grid md:grid-cols-5 gap-3">
          {Object.entries(categories).map(([key, cat], idx) => {
            const IconComponent = cat.icon;
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-xl"
              >
                <div className="flex items-center gap-2 mb-2">
                  <IconComponent className="w-5 h-5 text-purple-500" />
                  <span className="font-bold text-gray-800 dark:text-gray-200 text-sm">{cat.label}</span>
                </div>
                <div className={`text-xl font-bold ${
                  cat.score >= 70 ? 'text-green-600' : cat.score >= 50 ? 'text-amber-600' : 'text-red-600'
                }`}>{cat.score}점</div>
                <p className="text-xs text-gray-500 mt-2">{cat.advice}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* 오늘의 행운 아이템 */}
      <motion.div variants={itemVariants} className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-2xl">
        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-500" />
          오늘의 행운 아이템
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl">
            <span className="text-2xl">🎨</span>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mt-1">행운의 색</p>
            <p className="text-xs text-gray-500">{luckyItems.color}</p>
          </div>
          <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl">
            <span className="text-2xl">🔢</span>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mt-1">행운의 숫자</p>
            <p className="text-xs text-gray-500">{luckyItems.number}</p>
          </div>
          <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl">
            <span className="text-2xl">🧭</span>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mt-1">행운의 방향</p>
            <p className="text-xs text-gray-500">{luckyItems.direction}</p>
          </div>
          <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl">
            <span className="text-2xl">🍽️</span>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mt-1">행운의 음식</p>
            <p className="text-xs text-gray-500">{luckyItems.food}</p>
          </div>
          <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl">
            <span className="text-2xl">⭐</span>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mt-1">추천 활동</p>
            <p className="text-xs text-gray-500">{luckyItems.activity}</p>
          </div>
        </div>
      </motion.div>

      {/* 오늘의 Do & Don't */}
      <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl">
          <h4 className="font-bold text-green-700 dark:text-green-300 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            오늘 하면 좋은 일
          </h4>
          <ul className="space-y-3">
            {[
              dailyScore >= 70 ? '중요한 약속이나 미팅 잡기' : '차분히 계획 세우기',
              dayElement === '목' ? '새로운 학습 시작하기' : '기존 일 마무리하기',
              '감사 인사 전하기',
              dailyScore >= 60 ? '가벼운 운동하기' : '충분히 휴식하기'
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-green-500">✓</span> {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl">
          <h4 className="font-bold text-red-700 dark:text-red-300 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            오늘 피할 일
          </h4>
          <ul className="space-y-3">
            {[
              dailyScore < 60 ? '큰 금액의 지출이나 투자' : '충동적인 결정',
              '불필요한 논쟁',
              dailyScore < 50 ? '중요한 계약서 서명' : '과음, 과식',
              '밤늦게까지 일하기'
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-red-500">✗</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}
