'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Focus, Battery, Zap, Moon } from 'lucide-react';

interface StudyConcentrationProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function StudyConcentration({ result, name }: StudyConcentrationProps) {
  const dayElement = result.day.stem.element;
  const { 관성, 인성, 비겁 } = result.tenGodsCount;

  // 집중력 점수 계산
  const getConcentrationScore = () => {
    let score = 50;

    if (관성 >= 2) score += 20;
    else if (관성 >= 1) score += 10;

    if (인성 >= 2) score += 15;
    else if (인성 >= 1) score += 8;

    if (dayElement === '금') score += 15;
    if (dayElement === '토') score += 12;
    if (dayElement === '수') score += 10;

    if (비겁 >= 3) score -= 10; // 산만할 수 있음

    return Math.min(Math.max(score, 30), 100);
  };

  const concentrationScore = getConcentrationScore();

  // 집중력 유형
  const getConcentrationType = () => {
    if (관성 >= 2) {
      return {
        type: '지속형 집중',
        icon: '🎯',
        desc: '오랜 시간 한 가지에 몰두할 수 있습니다',
        duration: '2-3시간 연속',
        strength: '깊이 있는 학습',
      };
    }
    if (dayElement === '화' || 비겁 >= 2) {
      return {
        type: '순발형 집중',
        icon: '⚡',
        desc: '짧고 강렬한 집중력을 발휘합니다',
        duration: '25-30분 단위',
        strength: '빠른 이해',
      };
    }
    return {
      type: '균형형 집중',
      icon: '⚖️',
      desc: '적절한 시간 동안 집중할 수 있습니다',
      duration: '50-60분 단위',
      strength: '안정적 학습',
    };
  };

  const concentrationType = getConcentrationType();

  // 집중력 패턴 분석
  const getConcentrationPatterns = () => {
    return [
      {
        name: '초반 집중력',
        icon: Zap,
        score: dayElement === '화' || 비겁 >= 2 ? 85 : 65,
        color: 'from-yellow-500 to-orange-600',
        textColor: 'text-yellow-400',
        advice: '새로운 주제는 아침에 학습',
      },
      {
        name: '중반 지속력',
        icon: Battery,
        score: 관성 >= 1 ? 80 : 50,
        color: 'from-green-500 to-emerald-600',
        textColor: 'text-green-400',
        advice: '중요한 내용은 중간 시간에',
      },
      {
        name: '후반 마무리',
        icon: Focus,
        score: 인성 >= 1 ? 75 : 55,
        color: 'from-blue-500 to-indigo-600',
        textColor: 'text-blue-400',
        advice: '복습은 후반부에 배치',
      },
      {
        name: '심야 집중력',
        icon: Moon,
        score: dayElement === '수' || dayElement === '금' ? 70 : 40,
        color: 'from-purple-500 to-violet-600',
        textColor: 'text-purple-400',
        advice: dayElement === '수' ? '야간 학습 가능' : '밤보다는 낮 학습 추천',
      },
    ];
  };

  const patterns = getConcentrationPatterns();

  // 집중력 향상 방법
  const getImprovementTips = () => {
    const tips = [];

    if (concentrationType.type === '순발형 집중') {
      tips.push('포모도로 기법 (25분 + 5분 휴식)');
      tips.push('짧은 목표 설정');
      tips.push('타이머 활용');
    } else if (concentrationType.type === '지속형 집중') {
      tips.push('긴 학습 세션 계획');
      tips.push('방해 요소 완전 차단');
      tips.push('깊이 있는 탐구');
    } else {
      tips.push('50분 학습 + 10분 휴식');
      tips.push('단계별 목표 설정');
      tips.push('환경 변화 활용');
    }

    if (dayElement === '수') tips.push('조용한 환경 필수');
    if (dayElement === '화') tips.push('적절한 자극 활용');
    if (dayElement === '목') tips.push('식물, 자연 요소 활용');
    if (dayElement === '금') tips.push('체계적 환경 조성');
    if (dayElement === '토') tips.push('편안한 공간 마련');

    return tips;
  };

  const improvementTips = getImprovementTips();

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
        🎯 집중력 패턴 분석
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님의 집중력 특성과 활용법
      </p>

      {/* 집중력 종합 점수 */}
      <div className="glass rounded-2xl p-6 mb-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30">
        <div className="text-center mb-6">
          <p className="text-slate-400 mb-2">집중력 종합 점수</p>
          <h3 className="text-5xl font-bold gradient-text">{concentrationScore}점</h3>

          <div className="h-4 bg-slate-700 rounded-full overflow-hidden mt-4 max-w-md mx-auto">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
              initial={{ width: 0 }}
              whileInView={{ width: `${concentrationScore}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            />
          </div>
        </div>

        <div className="flex items-center gap-4 mt-6">
          <span className="text-4xl">{concentrationType.icon}</span>
          <div>
            <h4 className="text-xl font-bold text-cyan-400">{concentrationType.type}</h4>
            <p className="text-slate-300">{concentrationType.desc}</p>
            <div className="flex gap-4 mt-2 text-sm">
              <span className="text-slate-400">권장 시간: <span className="text-cyan-400">{concentrationType.duration}</span></span>
              <span className="text-slate-400">강점: <span className="text-cyan-400">{concentrationType.strength}</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* 시간대별 집중력 패턴 */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {patterns.map((pattern, index) => (
          <motion.div
            key={pattern.name}
            className="glass rounded-xl p-5"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pattern.color} flex items-center justify-center`}>
                <pattern.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white">{pattern.name}</h4>
                <p className={`text-2xl font-bold ${pattern.textColor}`}>{pattern.score}점</p>
              </div>
            </div>

            <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-3">
              <motion.div
                className={`h-full bg-gradient-to-r ${pattern.color}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${pattern.score}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </div>

            <p className="text-slate-300 text-sm">{pattern.advice}</p>
          </motion.div>
        ))}
      </div>

      {/* 집중력 향상 방법 */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold text-yellow-400 mb-4">
          💡 맞춤형 집중력 향상 전략
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {improvementTips.map((tip, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="text-yellow-400 font-bold">✦</span>
              <p className="text-slate-300">{tip}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/20">
          <p className="text-slate-300 text-sm">
            <span className="text-cyan-400 font-bold">⚡ 핵심 TIP:</span>{' '}
            {concentrationType.type === '순발형 집중'
              ? '짧은 시간 고강도 집중 후 충분한 휴식을 취하세요. 여러 번 반복하는 것이 효과적입니다.'
              : concentrationType.type === '지속형 집중'
              ? '한 번 시작하면 최소 2시간 이상 방해받지 않도록 환경을 조성하세요.'
              : '50분 학습 + 10분 휴식의 사이클을 유지하며, 점진적으로 집중 시간을 늘려가세요.'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
