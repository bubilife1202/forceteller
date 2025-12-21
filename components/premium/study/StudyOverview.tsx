'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { BookOpen, TrendingUp, Target, Star } from 'lucide-react';

interface StudyOverviewProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function StudyOverview({ result, name }: StudyOverviewProps) {
  const dayElement = result.day.stem.element;
  const { 식상, 인성, 관성 } = result.tenGodsCount;

  // 학업운 총점 계산
  const getStudyScore = () => {
    let score = 50;

    // 인성(학습력) 가점
    if (인성 >= 2) score += 20;
    else if (인성 >= 1) score += 10;

    // 식상(창의력) 가점
    if (식상 >= 2) score += 15;
    else if (식상 >= 1) score += 8;

    // 관성(집중력) 가점
    if (관성 >= 2) score += 10;
    else if (관성 >= 1) score += 5;

    // 오행별 학업 적성
    if (dayElement === '수') score += 15; // 지혜, 분석력
    if (dayElement === '금') score += 12; // 논리, 체계
    if (dayElement === '목') score += 10; // 창의, 성장
    if (dayElement === '토') score += 8; // 암기, 안정
    if (dayElement === '화') score += 5; // 열정, 순발력

    return Math.min(Math.max(score, 30), 100);
  };

  const studyScore = getStudyScore();

  // 학업 성향 분석
  const getStudyType = () => {
    if (인성 >= 2) return { type: '학구파', icon: '📚', desc: '꾸준한 학습으로 실력을 쌓는 타입' };
    if (식상 >= 2) return { type: '창의파', icon: '💡', desc: '새로운 아이디어와 응용력이 뛰어난 타입' };
    if (관성 >= 2) return { type: '집중파', icon: '🎯', desc: '목표 지향적이고 집중력이 강한 타입' };
    return { type: '균형파', icon: '⚖️', desc: '다양한 분야를 골고루 학습하는 타입' };
  };

  const studyType = getStudyType();

  // 강점 분석
  const getStrengths = () => {
    const strengths = [];
    if (인성 >= 2) strengths.push('뛰어난 학습 흡수력');
    if (식상 >= 2) strengths.push('창의적 문제 해결');
    if (관성 >= 2) strengths.push('높은 목표 달성력');
    if (dayElement === '수') strengths.push('분석적 사고력');
    if (dayElement === '금') strengths.push('논리적 체계성');
    if (dayElement === '목') strengths.push('빠른 이해력');

    return strengths.slice(0, 4);
  };

  const strengths = getStrengths();

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
        📖 학업운 종합 개요
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님의 학습 잠재력과 학업 운세
      </p>

      {/* 학업운 총점 */}
      <div className="glass rounded-2xl p-8 mb-8 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/30">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-blue-400" />
            <div>
              <p className="text-slate-400 text-sm">학업운 종합 점수</p>
              <h3 className="text-5xl font-bold gradient-text">{studyScore}점</h3>
            </div>
          </div>

          {/* 점수 게이지 */}
          <div className="h-4 bg-slate-700 rounded-full overflow-hidden mb-4">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
              initial={{ width: 0 }}
              whileInView={{ width: `${studyScore}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            />
          </div>

          <p className="text-lg text-slate-300">
            {studyScore >= 80 ? '🌟 탁월한 학업 운세! 목표를 높게 잡으세요.' :
             studyScore >= 65 ? '✨ 좋은 학업 운세! 꾸준히 노력하면 성공합니다.' :
             studyScore >= 50 ? '💫 평균 이상의 운세! 전략적 학습이 필요합니다.' :
             '🔥 열정과 노력으로 극복 가능합니다.'}
          </p>
        </div>
      </div>

      {/* 학업 성향 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl">{studyType.icon}</span>
          <div>
            <p className="text-slate-400">학업 성향</p>
            <h3 className="text-2xl font-bold text-indigo-400">{studyType.type}</h3>
          </div>
        </div>
        <p className="text-slate-300">{studyType.desc}</p>
      </div>

      {/* 학업 강점 */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
          <Star className="w-6 h-6" />
          주요 학업 강점
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {strengths.map((strength, index) => (
            <motion.div
              key={index}
              className="glass rounded-xl p-4 flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <p className="text-slate-300">{strength}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 사주 분석 요약 */}
      <div className="mt-8 p-6 glass rounded-2xl border border-indigo-500/30">
        <h4 className="font-bold text-indigo-400 mb-3">사주 오행 분석</h4>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-slate-400 text-sm">일간</p>
            <p className="text-xl font-bold text-white">{result.day.stem.ko}</p>
            <p className="text-sm text-slate-500">({dayElement})</p>
          </div>
          <div>
            <p className="text-slate-400 text-sm">인성</p>
            <p className="text-xl font-bold text-blue-400">{인성}개</p>
            <p className="text-sm text-slate-500">학습력</p>
          </div>
          <div>
            <p className="text-slate-400 text-sm">식상</p>
            <p className="text-xl font-bold text-purple-400">{식상}개</p>
            <p className="text-sm text-slate-500">창의력</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
