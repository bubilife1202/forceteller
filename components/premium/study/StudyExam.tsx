'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Award, Target, AlertCircle, TrendingUp } from 'lucide-react';

interface StudyExamProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function StudyExam({ result, name }: StudyExamProps) {
  const dayElement = result.day.stem.element;
  const { 관성, 인성, 식상, 비겁 } = result.tenGodsCount;

  // 시험운 점수 계산
  const getExamScore = () => {
    let score = 50;

    if (관성 >= 2) score += 20; // 집중력, 목표 달성
    else if (관성 >= 1) score += 10;

    if (인성 >= 2) score += 15; // 학습 능력
    else if (인성 >= 1) score += 8;

    if (dayElement === '금') score += 15; // 체계적 준비
    if (dayElement === '토') score += 12; // 안정적 실력 발휘
    if (dayElement === '수') score += 10; // 분석력

    if (비겁 >= 3) score -= 8; // 긴장 가능

    return Math.min(Math.max(score, 30), 100);
  };

  const examScore = getExamScore();

  // 시험 유형별 강점
  const getExamTypeStrengths = () => {
    return [
      {
        type: '객관식',
        icon: Target,
        score: 50 + (dayElement === '수' ? 20 : 0) + (dayElement === '금' ? 15 : 0) + (관성 * 10),
        color: 'from-blue-500 to-indigo-600',
        textColor: 'text-blue-400',
        tip: '분석력 활용, 소거법',
      },
      {
        type: '주관식',
        icon: Award,
        score: 50 + (dayElement === '목' ? 20 : 0) + (인성 * 12) + (식상 * 8),
        color: 'from-green-500 to-emerald-600',
        textColor: 'text-green-400',
        tip: '논리적 서술, 핵심 위주',
      },
      {
        type: '실기',
        icon: TrendingUp,
        score: 50 + (dayElement === '화' ? 25 : 0) + (식상 * 15),
        color: 'from-orange-500 to-amber-600',
        textColor: 'text-orange-400',
        tip: '반복 연습, 자신감',
      },
      {
        type: '구술/면접',
        icon: AlertCircle,
        score: 50 + (dayElement === '목' ? 20 : 0) + (비겁 * 10) + (식상 * 10),
        color: 'from-purple-500 to-violet-600',
        textColor: 'text-purple-400',
        tip: '명확한 표현, 침착함',
      },
    ].map(type => ({
      ...type,
      score: Math.min(Math.max(type.score, 30), 100),
    })).sort((a, b) => b.score - a.score);
  };

  const examTypes = getExamTypeStrengths();

  // D-Day 준비 전략
  const getPreparationTimeline = () => {
    return [
      {
        period: 'D-30',
        focus: '전체 범위 파악',
        tasks: ['학습 계획 수립', '전체 교재 1회독', '약점 파악'],
        intensity: 60,
      },
      {
        period: 'D-14',
        focus: '집중 학습',
        tasks: ['핵심 개념 정리', '문제 풀이', '오답 분석'],
        intensity: 80,
      },
      {
        period: 'D-7',
        focus: '최종 정리',
        tasks: ['암기 사항 복습', '모의고사', '컨디션 관리'],
        intensity: 90,
      },
      {
        period: 'D-1',
        focus: '마무리',
        tasks: ['핵심 요약 확인', '충분한 휴식', '긍정적 마인드'],
        intensity: 50,
      },
    ];
  };

  const timeline = getPreparationTimeline();

  // 시험 당일 전략
  const getExamDayStrategy = () => {
    const strategies = [];

    if (dayElement === '수') {
      strategies.push('차분하게 문제 읽기');
      strategies.push('시간 배분 철저히');
    }
    if (dayElement === '화') {
      strategies.push('긴장 풀고 자신감 갖기');
      strategies.push('첫 문제 신중히 풀기');
    }
    if (dayElement === '목') {
      strategies.push('쉬운 문제부터 풀기');
      strategies.push('긍정적 마인드 유지');
    }
    if (dayElement === '금') {
      strategies.push('계획대로 차근차근');
      strategies.push('검토 시간 확보');
    }
    if (dayElement === '토') {
      strategies.push('아는 것부터 확실히');
      strategies.push('침착하게 마무리');
    }

    return strategies;
  };

  const examDayStrategies = getExamDayStrategy();

  // 운세별 주의사항
  const getWarnings = () => {
    const warnings = [];

    if (비겁 >= 3) warnings.push('시험장에서 긴장 관리 필수');
    if (식상 >= 3) warnings.push('창의보다 원칙에 충실하게');
    if (examScore < 60) warnings.push('충분한 준비 기간 확보');

    warnings.push('수면 관리로 컨디션 유지');
    warnings.push('마지막까지 포기하지 않기');

    return warnings;
  };

  const warnings = getWarnings();

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
        🏆 시험운 분석
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님의 시험 성공 확률과 전략
      </p>

      {/* 시험운 총점 */}
      <div className="glass rounded-2xl p-6 mb-8 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30">
        <div className="text-center mb-6">
          <p className="text-slate-400 mb-2">시험운 종합 점수</p>
          <h3 className="text-5xl font-bold gradient-text">{examScore}점</h3>

          <div className="h-4 bg-slate-700 rounded-full overflow-hidden mt-4 max-w-md mx-auto">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-500 to-orange-600"
              initial={{ width: 0 }}
              whileInView={{ width: `${examScore}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            />
          </div>

          <p className="mt-4 text-slate-300">
            {examScore >= 80 ? '🌟 대단히 좋은 시험운! 자신감을 갖고 도전하세요.' :
             examScore >= 65 ? '✨ 좋은 시험운! 준비한 만큼 결과가 따라옵니다.' :
             examScore >= 50 ? '💫 평균적인 운세. 철저한 준비가 성공의 열쇠입니다.' :
             '🔥 노력으로 극복 가능. 일찍 준비를 시작하세요.'}
          </p>
        </div>
      </div>

      {/* 시험 유형별 강점 */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {examTypes.map((type, index) => (
          <motion.div
            key={type.type}
            className="glass rounded-xl p-5"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center`}>
                <type.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white">{type.type}</h4>
                <p className={`text-2xl font-bold ${type.textColor}`}>{type.score}점</p>
              </div>
            </div>

            <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-3">
              <motion.div
                className={`h-full bg-gradient-to-r ${type.color}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${type.score}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </div>

            <p className="text-slate-300 text-sm">💡 {type.tip}</p>
          </motion.div>
        ))}
      </div>

      {/* 시험 준비 타임라인 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-cyan-400 mb-4">
          📅 D-Day 준비 전략
        </h3>
        <div className="space-y-3">
          {timeline.map((phase, index) => (
            <motion.div
              key={phase.period}
              className="glass rounded-xl p-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-lg font-bold text-cyan-400">{phase.period}</span>
                  <span className="ml-3 text-slate-400">{phase.focus}</span>
                </div>
                <span className="text-sm font-semibold text-orange-400">{phase.intensity}%</span>
              </div>

              <ul className="text-sm text-slate-300 space-y-1 ml-4">
                {phase.tasks.map((task, idx) => (
                  <li key={idx}>• {task}</li>
                ))}
              </ul>

              <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden mt-3">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${phase.intensity}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 시험 당일 전략 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-green-400 mb-4">
          🎯 시험 당일 전략
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {examDayStrategies.map((strategy, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 p-3 bg-green-500/10 rounded-xl border border-green-500/20"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="text-green-400 font-bold text-lg">✓</span>
              <p className="text-slate-300">{strategy}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 주의사항 */}
      <div className="glass rounded-2xl p-6 bg-orange-500/10 border border-orange-500/30">
        <h3 className="text-xl font-bold text-orange-400 mb-4 flex items-center gap-2">
          <AlertCircle className="w-6 h-6" />
          주의사항
        </h3>
        <div className="space-y-2">
          {warnings.map((warning, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 text-slate-300"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="text-orange-400">⚠</span>
              <p>{warning}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
