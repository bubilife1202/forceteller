'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import {
  Calendar, Star, AlertTriangle, CheckCircle,
  ChevronLeft, ChevronRight, Sparkles, Heart,
  Wallet, Briefcase, Plane, Home, Users, GraduationCap
} from 'lucide-react';

interface LuckyCalendar2026Props {
  result: SajuResult;
  name: string;
}

// 월별 천간지지 (2026년 병오년)
const MONTHLY_PILLARS_2026 = [
  { month: 1, stem: '경', branch: '인', element: '금' },   // 경인월
  { month: 2, stem: '신', branch: '묘', element: '금' },   // 신묘월
  { month: 3, stem: '임', branch: '진', element: '수' },   // 임진월
  { month: 4, stem: '계', branch: '사', element: '수' },   // 계사월
  { month: 5, stem: '갑', branch: '오', element: '목' },   // 갑오월
  { month: 6, stem: '을', branch: '미', element: '목' },   // 을미월
  { month: 7, stem: '병', branch: '신', element: '화' },   // 병신월
  { month: 8, stem: '정', branch: '유', element: '화' },   // 정유월
  { month: 9, stem: '무', branch: '술', element: '토' },   // 무술월
  { month: 10, stem: '기', branch: '해', element: '토' },  // 기해월
  { month: 11, stem: '경', branch: '자', element: '금' },  // 경자월
  { month: 12, stem: '신', branch: '축', element: '금' },  // 신축월
];

// 길일 유형
const AUSPICIOUS_TYPES = {
  marriage: { icon: Heart, label: '결혼/약혼', color: 'pink' },
  business: { icon: Briefcase, label: '사업/계약', color: 'blue' },
  moving: { icon: Home, label: '이사/개업', color: 'green' },
  travel: { icon: Plane, label: '여행', color: 'purple' },
  study: { icon: GraduationCap, label: '학업/시험', color: 'indigo' },
  meeting: { icon: Users, label: '미팅/소개팅', color: 'rose' },
  investment: { icon: Wallet, label: '투자/재테크', color: 'amber' },
};

export default function LuckyCalendar2026({ result, name }: LuckyCalendar2026Props) {
  const [selectedMonth, setSelectedMonth] = useState(1);
  const dayElement = result.day.stem.element;

  // 월별 운세 점수 계산
  const getMonthlyScore = (month: number) => {
    const pillar = MONTHLY_PILLARS_2026[month - 1];
    let score = 60;

    // 일간과 월간의 관계
    const monthElement = pillar.element;

    if (dayElement === '목') {
      if (monthElement === '수') score += 20;  // 수생목
      if (monthElement === '목') score += 10;  // 비겁
      if (monthElement === '화') score -= 5;   // 설기
      if (monthElement === '금') score -= 15;  // 극
    } else if (dayElement === '화') {
      if (monthElement === '목') score += 20;  // 목생화
      if (monthElement === '화') score += 15;  // 비겁 (2026년 화 + 화)
      if (monthElement === '토') score -= 5;   // 설기
      if (monthElement === '수') score -= 15;  // 극
    } else if (dayElement === '토') {
      if (monthElement === '화') score += 20;  // 화생토
      if (monthElement === '토') score += 10;  // 비겁
      if (monthElement === '금') score -= 5;   // 설기
      if (monthElement === '목') score -= 15;  // 극
    } else if (dayElement === '금') {
      if (monthElement === '토') score += 20;  // 토생금
      if (monthElement === '금') score += 10;  // 비겁
      if (monthElement === '수') score -= 5;   // 설기
      if (monthElement === '화') score -= 20;  // 극 (2026년 화 강함)
    } else if (dayElement === '수') {
      if (monthElement === '금') score += 20;  // 금생수
      if (monthElement === '수') score += 10;  // 비겁
      if (monthElement === '목') score -= 5;   // 설기
      if (monthElement === '토') score -= 15;  // 극
    }

    return Math.min(Math.max(score, 30), 100);
  };

  // 월별 길일 생성
  const getMonthlyLuckyDays = (month: number) => {
    const score = getMonthlyScore(month);
    const luckyDays: {
      day: number;
      type: keyof typeof AUSPICIOUS_TYPES;
      level: 'excellent' | 'good';
    }[] = [];

    // 점수에 따라 길일 개수 결정
    const luckyCount = score >= 80 ? 6 : score >= 60 ? 4 : 2;

    // 일간에 따른 길일 배정
    const baseDays = dayElement === '목' ? [3, 8, 13, 18, 23, 28] :
                     dayElement === '화' ? [2, 7, 12, 17, 22, 27] :
                     dayElement === '토' ? [5, 10, 15, 20, 25, 30] :
                     dayElement === '금' ? [4, 9, 14, 19, 24, 29] :
                     [1, 6, 11, 16, 21, 26];

    const types = Object.keys(AUSPICIOUS_TYPES) as (keyof typeof AUSPICIOUS_TYPES)[];

    for (let i = 0; i < luckyCount; i++) {
      luckyDays.push({
        day: baseDays[i % baseDays.length],
        type: types[i % types.length],
        level: i < 2 ? 'excellent' : 'good'
      });
    }

    return luckyDays;
  };

  // 월별 흉일 생성
  const getMonthlyUnluckyDays = (month: number) => {
    const score = getMonthlyScore(month);
    const unluckyDays: { day: number; reason: string }[] = [];

    // 점수가 낮을수록 흉일 많음
    const unluckyCount = score < 50 ? 4 : score < 70 ? 2 : 1;

    const baseDays = dayElement === '목' ? [7, 17, 27] :
                     dayElement === '화' ? [6, 16, 26] :
                     dayElement === '토' ? [3, 13, 23] :
                     dayElement === '금' ? [2, 12, 22] :
                     [5, 15, 25];

    const reasons = [
      '중요한 결정 피할 것',
      '계약/투자 자제',
      '이동 주의',
      '다툼 조심'
    ];

    for (let i = 0; i < unluckyCount; i++) {
      unluckyDays.push({
        day: baseDays[i % baseDays.length],
        reason: reasons[i % reasons.length]
      });
    }

    return unluckyDays;
  };

  // 월별 상세 운세
  const getMonthlyDetail = (month: number) => {
    const score = getMonthlyScore(month);
    const pillar = MONTHLY_PILLARS_2026[month - 1];

    let advice = '';
    let focus = '';
    let warning = '';

    if (score >= 80) {
      advice = '이 달은 모든 일이 순조롭게 풀리는 대길의 달입니다. 적극적으로 도전하고 기회를 잡으세요.';
      focus = '새로운 시작, 중요한 결정, 사업 확장';
      warning = '자만심을 경계하고 겸손함을 유지하세요.';
    } else if (score >= 60) {
      advice = '안정적인 흐름 속에서 꾸준히 노력하면 좋은 결과를 얻을 수 있는 달입니다.';
      focus = '꾸준한 노력, 관계 유지, 건강 관리';
      warning = '무리한 확장보다 내실을 다지세요.';
    } else {
      advice = '신중함이 필요한 달입니다. 큰 결정은 미루고 차분히 준비하는 시간으로 활용하세요.';
      focus = '준비와 계획, 자기 성찰, 휴식';
      warning = '충동적인 결정과 과도한 지출을 피하세요.';
    }

    return {
      pillar: `${pillar.stem}${pillar.branch}월`,
      element: pillar.element,
      score,
      advice,
      focus,
      warning
    };
  };

  const currentMonthDetail = getMonthlyDetail(selectedMonth);
  const luckyDays = getMonthlyLuckyDays(selectedMonth);
  const unluckyDays = getMonthlyUnluckyDays(selectedMonth);

  // 점수별 배지 색상
  const getScoreBadge = (score: number) => {
    if (score >= 80) return { text: '대길', bg: 'bg-green-100 dark:bg-green-900/30', textColor: 'text-green-700 dark:text-green-300' };
    if (score >= 60) return { text: '길', bg: 'bg-blue-100 dark:bg-blue-900/30', textColor: 'text-blue-700 dark:text-blue-300' };
    if (score >= 40) return { text: '평', bg: 'bg-amber-100 dark:bg-amber-900/30', textColor: 'text-amber-700 dark:text-amber-300' };
    return { text: '주의', bg: 'bg-red-100 dark:bg-red-900/30', textColor: 'text-red-700 dark:text-red-300' };
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* 월 선택기 */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setSelectedMonth(prev => prev > 1 ? prev - 1 : 12)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>

        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-purple-500" />
          <span className="text-xl font-bold text-gray-800 dark:text-gray-200">
            2026년 {selectedMonth}월
          </span>
          <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
            {currentMonthDetail.pillar}
          </span>
        </div>

        <button
          onClick={() => setSelectedMonth(prev => prev < 12 ? prev + 1 : 1)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
        >
          <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {/* 월별 미니 캘린더 */}
      <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
        {MONTHLY_PILLARS_2026.map((pillar, idx) => {
          const monthScore = getMonthlyScore(pillar.month);
          const badge = getScoreBadge(monthScore);
          const isSelected = pillar.month === selectedMonth;

          return (
            <motion.button
              key={pillar.month}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedMonth(pillar.month)}
              className={`p-2 rounded-xl text-center transition ${
                isSelected
                  ? 'bg-gradient-to-br from-purple-500 to-indigo-500 text-white'
                  : badge.bg
              }`}
            >
              <div className={`text-lg font-bold ${isSelected ? 'text-white' : badge.textColor}`}>
                {pillar.month}월
              </div>
              <div className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                {badge.text}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* 선택된 월 상세 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedMonth}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-6"
        >
          {/* 운세 점수 & 개요 */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                  {selectedMonth}월 종합 운세
                </h3>
                <p className="text-sm text-gray-500">월간 {currentMonthDetail.pillar} · {currentMonthDetail.element}의 기운</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                  {currentMonthDetail.score}점
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${getScoreBadge(currentMonthDetail.score).bg} ${getScoreBadge(currentMonthDetail.score).textColor}`}>
                  {getScoreBadge(currentMonthDetail.score).text}
                </span>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {currentMonthDetail.advice}
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                <span className="text-sm font-bold text-green-700 dark:text-green-300">✨ 집중할 점</span>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{currentMonthDetail.focus}</p>
              </div>
              <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                <span className="text-sm font-bold text-red-700 dark:text-red-300">⚠️ 주의할 점</span>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{currentMonthDetail.warning}</p>
              </div>
            </div>
          </div>

          {/* 길일 목록 */}
          <div>
            <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              {selectedMonth}월 길일
            </h4>
            <div className="grid md:grid-cols-2 gap-3">
              {luckyDays.map((lucky, idx) => {
                const typeInfo = AUSPICIOUS_TYPES[lucky.type];
                const TypeIcon = typeInfo.icon;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`flex items-center gap-3 p-4 rounded-xl ${
                      lucky.level === 'excellent'
                        ? 'bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border border-yellow-200 dark:border-yellow-800'
                        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className={`w-12 h-12 flex items-center justify-center rounded-full ${
                      lucky.level === 'excellent' ? 'bg-yellow-100 dark:bg-yellow-900/30' : 'bg-gray-100 dark:bg-gray-700'
                    }`}>
                      <span className="text-xl font-bold text-gray-800 dark:text-gray-200">{lucky.day}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <TypeIcon className={`w-4 h-4 text-${typeInfo.color}-500`} />
                        <span className="font-medium text-gray-800 dark:text-gray-200">{typeInfo.label}</span>
                        {lucky.level === 'excellent' && (
                          <span className="px-2 py-0.5 bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 text-xs rounded-full">
                            대길
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{selectedMonth}월 {lucky.day}일</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* 흉일 목록 */}
          <div>
            <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              {selectedMonth}월 주의할 날
            </h4>
            <div className="grid md:grid-cols-2 gap-3">
              {unluckyDays.map((unlucky, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-red-100 dark:bg-red-900/30 rounded-full">
                    <span className="text-xl font-bold text-red-700 dark:text-red-300">{unlucky.day}</span>
                  </div>
                  <div>
                    <span className="font-medium text-red-700 dark:text-red-300">{selectedMonth}월 {unlucky.day}일</span>
                    <p className="text-sm text-red-600 dark:text-red-400">{unlucky.reason}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 연간 길흉 요약 */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl">
        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-500" />
          2026년 {name}님의 월별 운세 요약
        </h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-bold">최고의 달:</span>{' '}
              {MONTHLY_PILLARS_2026
                .map(p => ({ month: p.month, score: getMonthlyScore(p.month) }))
                .sort((a, b) => b.score - a.score)
                .slice(0, 3)
                .map(m => `${m.month}월`)
                .join(', ')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-bold">주의할 달:</span>{' '}
              {MONTHLY_PILLARS_2026
                .map(p => ({ month: p.month, score: getMonthlyScore(p.month) }))
                .sort((a, b) => a.score - b.score)
                .slice(0, 2)
                .map(m => `${m.month}월`)
                .join(', ')}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
