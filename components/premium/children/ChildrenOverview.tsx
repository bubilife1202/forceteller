'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Baby, Heart, Star, TrendingUp } from 'lucide-react';

interface ChildrenOverviewProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function ChildrenOverview({ result, name }: ChildrenOverviewProps) {
  const dayElement = result.day.stem.element;
  const { 식상, 관성, 재성 } = result.tenGodsCount;

  // 자녀운 총점 계산
  const getChildrenScore = () => {
    let score = 50;

    // 식상(자녀궁) 가점
    if (식상 >= 3) score += 25;
    else if (식상 >= 2) score += 15;
    else if (식상 >= 1) score += 8;

    // 일간별 자녀운
    if (dayElement === '목') score += 15; // 목생화, 생생불식
    if (dayElement === '화') score += 10; // 화생토
    if (dayElement === '토') score += 12; // 토생금
    if (dayElement === '금') score += 8; // 금생수
    if (dayElement === '수') score += 18; // 수생목, 자녀복 강함

    // 관성 균형
    if (관성 >= 2) score += 5; // 자녀 교육 운

    return Math.min(Math.max(score, 30), 100);
  };

  const childrenScore = getChildrenScore();

  const getGrade = () => {
    if (childrenScore >= 80) return { text: '최고', color: 'text-pink-400', emoji: '🌟' };
    if (childrenScore >= 65) return { text: '좋음', color: 'text-blue-400', emoji: '💫' };
    if (childrenScore >= 50) return { text: '보통', color: 'text-green-400', emoji: '✨' };
    return { text: '주의', color: 'text-orange-400', emoji: '💭' };
  };

  const grade = getGrade();

  const getOverviewMessage = () => {
    if (식상 >= 3) {
      return '자녀궁이 매우 강한 사주입니다. 자녀와 인연이 깊고, 자녀로 인한 기쁨이 클 것입니다.';
    }
    if (식상 >= 2) {
      return '자녀운이 좋은 편입니다. 자녀와의 관계가 원만하고 자녀 복이 있습니다.';
    }
    if (식상 >= 1) {
      return '자녀운이 평범한 편입니다. 노력하는 만큼 자녀와의 관계가 좋아집니다.';
    }
    return '자녀궁이 약한 편이지만, 사랑과 관심으로 좋은 관계를 만들 수 있습니다.';
  };

  const keywords = [
    식상 >= 2 ? '자녀복' : '인내심',
    dayElement === '수' || dayElement === '목' ? '재능 계발' : '교육열',
    관성 >= 2 ? '체계적 양육' : '자유로운 양육',
    식상 >= 3 ? '다자녀' : '소수정예'
  ];

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2
        className="text-3xl font-bold text-center mb-4 gradient-text"
        style={{ fontFamily: "'Noto Serif KR', serif" }}
      >
        👶 자녀운 종합 개요
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님의 자녀운 총괄 분석
      </p>

      {/* 자녀운 점수 */}
      <div className="glass rounded-2xl p-8 mb-8 bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/30">
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="text-5xl">{grade.emoji}</span>
          <div className="text-center">
            <p className="text-slate-400 text-sm mb-1">자녀운 총점</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold gradient-text">{childrenScore}</span>
              <span className="text-2xl text-slate-400">점</span>
            </div>
            <p className={`text-xl font-bold mt-1 ${grade.color}`}>{grade.text}</p>
          </div>
        </div>

        {/* 점수 게이지 */}
        <div className="h-3 bg-slate-700 rounded-full overflow-hidden mb-6">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
            initial={{ width: 0 }}
            whileInView={{ width: `${childrenScore}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </div>

        <p className="text-slate-300 text-center text-lg leading-relaxed">
          {getOverviewMessage()}
        </p>
      </div>

      {/* 핵심 키워드 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {keywords.map((keyword, index) => (
          <motion.div
            key={index}
            className="glass rounded-xl p-4 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <p className="text-lg font-bold gradient-text">{keyword}</p>
          </motion.div>
        ))}
      </div>

      {/* 사주 분석 */}
      <div className="grid md:grid-cols-3 gap-4">
        <motion.div
          className="glass rounded-xl p-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
              <Baby className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">식상(자녀궁)</p>
              <p className="text-2xl font-bold text-pink-400">{식상}개</p>
            </div>
          </div>
          <p className="text-slate-300 text-sm">
            {식상 >= 3 ? '매우 강함' : 식상 >= 2 ? '강함' : 식상 >= 1 ? '보통' : '약함'}
          </p>
        </motion.div>

        <motion.div
          className="glass rounded-xl p-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">일간</p>
              <p className="text-2xl font-bold text-blue-400">{dayElement}</p>
            </div>
          </div>
          <p className="text-slate-300 text-sm">
            {dayElement === '수' || dayElement === '목' ? '자녀 재능운' : '자녀 교육운'}
          </p>
        </motion.div>

        <motion.div
          className="glass rounded-xl p-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">관성(교육)</p>
              <p className="text-2xl font-bold text-purple-400">{관성}개</p>
            </div>
          </div>
          <p className="text-slate-300 text-sm">
            {관성 >= 2 ? '체계적 교육' : '자율적 교육'}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
