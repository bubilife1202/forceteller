'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import {
  Calendar, Star, TrendingUp, TrendingDown,
  Heart, Wallet, Briefcase, Activity, Users,
  AlertTriangle, CheckCircle, Sparkles, Target,
  Moon, Sun, Flame, Droplets, Mountain
} from 'lucide-react';

interface MonthlyFortunePremiumSectionProps {
  result: SajuResult;
  name: string;
  year: number;
  month: number;
}

// 월별 지지
const MONTHLY_BRANCHES = ['인', '묘', '진', '사', '오', '미', '신', '유', '술', '해', '자', '축'];

// 월별 오행
const BRANCH_ELEMENTS: Record<string, string> = {
  '인': '목', '묘': '목', '진': '토', '사': '화', '오': '화', '미': '토',
  '신': '금', '유': '금', '술': '토', '해': '수', '자': '수', '축': '토'
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

export default function MonthlyFortunePremiumSection({
  result,
  name,
  year,
  month
}: MonthlyFortunePremiumSectionProps) {
  const dayElement = result.day.stem.element;
  const monthBranch = MONTHLY_BRANCHES[(month + 1) % 12];
  const monthElement = BRANCH_ELEMENTS[monthBranch];

  // 월간 운세 점수 계산
  const calculateMonthlyScore = () => {
    let score = 55;

    // 상생 관계
    const generates: Record<string, string> = { '목': '화', '화': '토', '토': '금', '금': '수', '수': '목' };
    const generatedBy: Record<string, string> = { '목': '수', '화': '목', '토': '화', '금': '토', '수': '금' };

    if (generates[dayElement] === monthElement) score += 12;
    if (generatedBy[dayElement] === monthElement) score += 18;
    if (dayElement === monthElement) score += 10;

    // 상극 관계
    const controls: Record<string, string> = { '목': '토', '화': '금', '토': '수', '금': '목', '수': '화' };
    const controlledBy: Record<string, string> = { '목': '금', '화': '수', '토': '목', '금': '화', '수': '토' };

    if (controls[dayElement] === monthElement) score -= 8;
    if (controlledBy[dayElement] === monthElement) score -= 12;

    return Math.min(Math.max(score, 30), 95);
  };

  const monthlyScore = calculateMonthlyScore();

  // 주간별 운세
  const getWeeklyFortunes = () => {
    const base = monthlyScore;
    return [
      { week: '1주차 (1~7일)', score: Math.min(base + 5, 100), theme: '시작의 에너지', advice: '새로운 계획을 세우기 좋은 시기' },
      { week: '2주차 (8~14일)', score: Math.min(base + 8, 100), theme: '성장의 시기', advice: '진행 중인 일에 집중하세요' },
      { week: '3주차 (15~21일)', score: Math.min(base - 3, 100), theme: '전환점', advice: '중간 점검이 필요한 시기' },
      { week: '4주차 (22~말일)', score: Math.min(base + 2, 100), theme: '마무리', advice: '한 달을 정리하고 다음을 준비하세요' }
    ];
  };

  const weeklyFortunes = getWeeklyFortunes();

  // 분야별 운세
  const getCategoryFortunes = () => {
    const base = monthlyScore;
    return {
      love: {
        score: Math.min(base + (monthElement === '화' ? 12 : monthElement === '수' ? -5 : 5), 100),
        icon: Heart,
        trend: monthElement === '화' ? 'up' : 'stable',
        advice: monthlyScore >= 70 ? '로맨틱한 만남이 기대됩니다' : '관계에 진심을 담으세요',
        details: [
          '인연운: ' + (monthlyScore >= 65 ? '좋은 만남이 있을 수 있습니다' : '기존 인연을 소중히 하세요'),
          '소통: ' + (monthElement === '화' ? '열정적인 대화가 통합니다' : '차분한 소통이 필요합니다')
        ]
      },
      wealth: {
        score: Math.min(base + (monthElement === '토' ? 15 : monthElement === '금' ? 10 : 0), 100),
        icon: Wallet,
        trend: monthElement === '토' || monthElement === '금' ? 'up' : monthElement === '수' ? 'down' : 'stable',
        advice: monthlyScore >= 70 ? '재물 증식의 기회가 있습니다' : '절약과 저축에 집중하세요',
        details: [
          '수입: ' + (monthlyScore >= 70 ? '부수입이 생길 수 있습니다' : '안정적인 수입 유지'),
          '지출: ' + (monthElement === '화' ? '충동구매 주의' : '계획적인 지출 권장')
        ]
      },
      career: {
        score: Math.min(base + (monthElement === '목' ? 10 : monthElement === '화' ? 8 : 0), 100),
        icon: Briefcase,
        trend: monthElement === '목' || monthElement === '화' ? 'up' : 'stable',
        advice: monthlyScore >= 70 ? '승진이나 인정받을 기회' : '묵묵히 실력을 쌓으세요',
        details: [
          '업무: ' + (monthlyScore >= 65 ? '프로젝트가 순조롭습니다' : '꼼꼼한 검토가 필요합니다'),
          '인간관계: ' + (monthElement === '화' ? '동료와의 협력이 좋습니다' : '독립적인 업무가 효율적')
        ]
      },
      health: {
        score: Math.min(base + 5, 100),
        icon: Activity,
        trend: monthElement === '목' ? 'up' : monthElement === '화' ? 'caution' : 'stable',
        advice: monthElement === '화' ? '과로와 열에 주의하세요' : '꾸준한 건강 관리를 하세요',
        details: [
          '체력: ' + (monthlyScore >= 60 ? '활력이 유지됩니다' : '휴식이 필요합니다'),
          '주의: ' + (monthElement === '화' ? '화병, 혈압 관리' : monthElement === '수' ? '신장, 방광 관리' : '균형 잡힌 생활')
        ]
      },
      social: {
        score: Math.min(base + (monthElement === '화' ? 15 : 5), 100),
        icon: Users,
        trend: monthElement === '화' ? 'up' : 'stable',
        advice: monthElement === '화' ? '활발한 사교 활동이 좋습니다' : '깊이 있는 관계에 집중하세요',
        details: [
          '인맥: ' + (monthlyScore >= 70 ? '새로운 인연이 들어옵니다' : '기존 인맥을 다지세요'),
          '평판: ' + (monthlyScore >= 65 ? '좋은 평가를 받습니다' : '말과 행동을 조심하세요')
        ]
      }
    };
  };

  const categories = getCategoryFortunes();

  // 길일과 흉일
  const getLuckyDays = () => {
    const base = (month * 3 + 1) % 28 + 1;
    return [base, (base + 7) % 28 + 1, (base + 14) % 28 + 1, (base + 21) % 28 + 1];
  };

  const getUnluckyDays = () => {
    const base = (month * 5 + 3) % 28 + 1;
    return [base, (base + 10) % 28 + 1];
  };

  const luckyDays = getLuckyDays();
  const unluckyDays = getUnluckyDays();

  // 월별 테마
  const getMonthlyTheme = () => {
    if (monthlyScore >= 80) {
      return { emoji: '🌟', title: '행운의 달', color: 'from-amber-400 to-orange-500' };
    } else if (monthlyScore >= 65) {
      return { emoji: '✨', title: '순조로운 달', color: 'from-green-400 to-emerald-500' };
    } else if (monthlyScore >= 50) {
      return { emoji: '💫', title: '평온한 달', color: 'from-blue-400 to-indigo-500' };
    } else {
      return { emoji: '🌙', title: '신중한 달', color: 'from-purple-400 to-violet-500' };
    }
  };

  const theme = getMonthlyTheme();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* 월간 종합 운세 */}
      <motion.div variants={itemVariants} className={`bg-gradient-to-br ${theme.color} p-6 rounded-2xl text-white text-center`}>
        <div className="text-5xl mb-4">{theme.emoji}</div>
        <h3 className="text-2xl font-bold mb-2">{year}년 {month}월 운세</h3>
        <p className="text-lg opacity-90 mb-4">{theme.title}</p>
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 rounded-full">
          <span className="text-4xl font-bold">{monthlyScore}점</span>
          <span className="opacity-80">/ 100</span>
        </div>
        <p className="mt-4 opacity-90">
          이번 달 {monthBranch}월의 {monthElement} 기운과 {name}님의 {dayElement} 일간이 만납니다
        </p>
      </motion.div>

      {/* 주간별 운세 */}
      <motion.div variants={itemVariants}>
        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-purple-500" />
          주간별 운세 흐름
        </h4>
        <div className="grid md:grid-cols-4 gap-4">
          {weeklyFortunes.map((week, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-xl"
            >
              <span className="text-sm text-gray-500">{week.week}</span>
              <div className={`text-2xl font-bold mt-1 ${
                week.score >= 70 ? 'text-green-600' : week.score >= 50 ? 'text-amber-600' : 'text-gray-500'
              }`}>{week.score}점</div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mt-2">{week.theme}</p>
              <p className="text-xs text-gray-500 mt-1">{week.advice}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 분야별 상세 운세 */}
      <motion.div variants={itemVariants}>
        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-500" />
          분야별 상세 운세
        </h4>
        <div className="space-y-4">
          {Object.entries(categories).map(([key, cat], idx) => {
            const IconComponent = cat.icon;
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 rounded-xl"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      <IconComponent className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <span className="font-bold text-gray-800 dark:text-gray-200">
                        {key === 'love' ? '연애운' : key === 'wealth' ? '재물운' : key === 'career' ? '직업운' : key === 'health' ? '건강운' : '대인운'}
                      </span>
                      <div className="flex items-center gap-1 mt-0.5">
                        {cat.trend === 'up' && <TrendingUp className="w-3 h-3 text-green-500" />}
                        {cat.trend === 'down' && <TrendingDown className="w-3 h-3 text-red-500" />}
                        <span className="text-xs text-gray-500">
                          {cat.trend === 'up' ? '상승' : cat.trend === 'down' ? '하락' : '안정'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={`text-2xl font-bold ${
                    cat.score >= 70 ? 'text-green-600' : cat.score >= 50 ? 'text-amber-600' : 'text-red-600'
                  }`}>{cat.score}점</div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-3">{cat.advice}</p>
                <div className="grid md:grid-cols-2 gap-2">
                  {cat.details.map((detail, i) => (
                    <div key={i} className="text-sm text-gray-600 dark:text-gray-400 p-2 bg-gray-50 dark:bg-gray-700/50 rounded">
                      {detail}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* 길일 & 흉일 */}
      <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl">
          <h4 className="font-bold text-green-700 dark:text-green-300 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            이달의 길일
          </h4>
          <div className="flex flex-wrap gap-3">
            {luckyDays.map((day, i) => (
              <div key={i} className="w-12 h-12 flex items-center justify-center bg-green-100 dark:bg-green-800/50 rounded-full">
                <span className="font-bold text-green-700 dark:text-green-300">{day}일</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
            중요한 결정, 계약, 새로운 시작에 좋은 날입니다
          </p>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl">
          <h4 className="font-bold text-red-700 dark:text-red-300 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            이달의 주의일
          </h4>
          <div className="flex flex-wrap gap-3">
            {unluckyDays.map((day, i) => (
              <div key={i} className="w-12 h-12 flex items-center justify-center bg-red-100 dark:bg-red-800/50 rounded-full">
                <span className="font-bold text-red-700 dark:text-red-300">{day}일</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
            큰 결정은 피하고 신중하게 행동하세요
          </p>
        </div>
      </motion.div>

      {/* 월간 행동 지침 */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 p-6 rounded-2xl">
        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-500" />
          이달의 행동 지침
        </h4>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
            <span className="font-bold text-indigo-600 dark:text-indigo-400">✓ Do</span>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
              {monthlyScore >= 70 ? '적극적으로 기회를 잡으세요' : '차분히 준비하고 계획하세요'}
            </p>
          </div>
          <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
            <span className="font-bold text-red-600 dark:text-red-400">✗ Don&apos;t</span>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
              {monthElement === '화' ? '충동적인 결정, 다툼' : '지나친 욕심, 무리한 일정'}
            </p>
          </div>
          <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
            <span className="font-bold text-amber-600 dark:text-amber-400">💡 Focus</span>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
              {dayElement} 일간인 당신은 {monthElement} 기운을 {monthlyScore >= 60 ? '활용' : '조절'}하세요
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
