'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Lightbulb, Repeat, PenTool, MessageSquare, FileText, CheckSquare } from 'lucide-react';

interface StudyMethodProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function StudyMethod({ result, name }: StudyMethodProps) {
  const dayElement = result.day.stem.element;
  const { 인성, 식상, 비겁, 관성 } = result.tenGodsCount;

  // 학습법별 효과 분석
  const getStudyMethods = () => {
    const methods = [
      {
        name: '반복 학습법',
        icon: Repeat,
        color: 'from-blue-500 to-indigo-600',
        textColor: 'text-blue-400',
        score: 50 + (dayElement === '토' ? 20 : 0) + (인성 * 10),
        description: '같은 내용을 여러 번 반복하며 암기',
        techniques: ['플래시카드', '간격 반복', '매일 복습'],
        bestFor: '암기 과목, 언어 학습',
      },
      {
        name: '문제풀이법',
        icon: CheckSquare,
        color: 'from-green-500 to-emerald-600',
        textColor: 'text-green-400',
        score: 50 + (dayElement === '금' ? 20 : 0) + (관성 * 10),
        description: '다양한 문제를 풀며 응용력 향상',
        techniques: ['기출문제', '난이도별 풀이', '오답노트'],
        bestFor: '수학, 과학, 논리',
      },
      {
        name: '요약정리법',
        icon: FileText,
        color: 'from-purple-500 to-violet-600',
        textColor: 'text-purple-400',
        score: 50 + (dayElement === '수' ? 20 : 0) + (인성 * 12),
        description: '핵심 내용을 정리하고 구조화',
        techniques: ['마인드맵', '핵심 요약', '도표 작성'],
        bestFor: '이론 과목, 개념 학습',
      },
      {
        name: '토론학습법',
        icon: MessageSquare,
        color: 'from-orange-500 to-amber-600',
        textColor: 'text-orange-400',
        score: 50 + (dayElement === '목' ? 20 : 0) + (비겁 * 15),
        description: '다른 사람과 토론하며 이해도 향상',
        techniques: ['스터디 그룹', '설명하기', '질문 주고받기'],
        bestFor: '인문학, 사회과학',
      },
      {
        name: '실습학습법',
        icon: PenTool,
        color: 'from-pink-500 to-rose-600',
        textColor: 'text-pink-400',
        score: 50 + (dayElement === '화' ? 20 : 0) + (식상 * 12),
        description: '직접 해보며 체득하는 학습',
        techniques: ['프로젝트', '실험', '실습'],
        bestFor: '실기 과목, 창작',
      },
      {
        name: '창의학습법',
        icon: Lightbulb,
        color: 'from-yellow-500 to-amber-600',
        textColor: 'text-yellow-400',
        score: 50 + (dayElement === '화' ? 15 : 0) + (식상 * 15),
        description: '새로운 아이디어를 만들며 학습',
        techniques: ['브레인스토밍', '응용 문제', '창의적 해석'],
        bestFor: '예술, 창작, 기획',
      },
    ];

    return methods.map(method => ({
      ...method,
      score: Math.min(Math.max(method.score, 30), 100),
    })).sort((a, b) => b.score - a.score);
  };

  const methods = getStudyMethods();
  const topMethod = methods[0];

  // 학습 단계별 전략
  const getLearningPhases = () => {
    return [
      {
        phase: '1. 예습 단계',
        strategy: dayElement === '목' ? '전체 구조 파악' : dayElement === '화' ? '핵심만 빠르게' : '꼼꼼히 읽기',
        time: '10-15분',
        color: 'bg-blue-500/20',
      },
      {
        phase: '2. 수업/강의',
        strategy: 인성 >= 2 ? '필기 위주' : 식상 >= 2 ? '이해 위주' : '듣기 집중',
        time: '수업 시간',
        color: 'bg-green-500/20',
      },
      {
        phase: '3. 복습 단계',
        strategy: dayElement === '토' ? '반복 읽기' : dayElement === '금' ? '문제 풀이' : '요약 정리',
        time: '30-60분',
        color: 'bg-purple-500/20',
      },
      {
        phase: '4. 정착 단계',
        strategy: '오답노트, 암기카드',
        time: '주 1-2회',
        color: 'bg-orange-500/20',
      },
    ];
  };

  const learningPhases = getLearningPhases();

  // 과목별 맞춤 전략
  const getSubjectStrategies = () => {
    const strategies = [];

    if (dayElement === '수' || 인성 >= 2) {
      strategies.push({ subject: '언어 영역', method: '구조 분석 + 배경지식' });
    }
    if (dayElement === '금' || 관성 >= 2) {
      strategies.push({ subject: '수학', method: '개념 이해 + 반복 풀이' });
    }
    if (dayElement === '화' || 식상 >= 2) {
      strategies.push({ subject: '예체능', method: '실습 + 창의적 표현' });
    }
    if (dayElement === '목' || 비겁 >= 2) {
      strategies.push({ subject: '사회', method: '토론 + 사례 연구' });
    }
    if (dayElement === '토') {
      strategies.push({ subject: '과학', method: '암기 + 실험 이해' });
    }

    return strategies;
  };

  const subjectStrategies = getSubjectStrategies();

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
        📝 효과적인 학습법
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님의 사주에 맞는 학습 방법론
      </p>

      {/* 최고 효율 학습법 */}
      <div className="glass rounded-2xl p-6 mb-8 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${topMethod.color} flex items-center justify-center`}>
            <topMethod.icon className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-slate-400">가장 효과적인 학습법</p>
            <h3 className="text-2xl font-bold text-indigo-400">{topMethod.name}</h3>
            <p className="text-3xl font-bold text-purple-400">{topMethod.score}점</p>
          </div>
        </div>
        <p className="text-slate-300 mb-4">{topMethod.description}</p>
        <div className="mb-3">
          <p className="text-sm text-slate-400 mb-2">추천 기법</p>
          <div className="flex flex-wrap gap-2">
            {topMethod.techniques.map((technique, idx) => (
              <span key={idx} className="px-3 py-1 bg-indigo-500/20 rounded-full text-sm text-indigo-300">
                {technique}
              </span>
            ))}
          </div>
        </div>
        <p className="text-sm text-slate-500">
          <span className="text-indigo-400">적합 과목:</span> {topMethod.bestFor}
        </p>
      </div>

      {/* 학습법별 점수 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {methods.map((method, index) => (
          <motion.div
            key={method.name}
            className="glass rounded-xl p-5"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center`}>
                <method.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">{method.name}</h4>
                <p className={`text-xl font-bold ${method.textColor}`}>{method.score}점</p>
              </div>
            </div>

            <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-2">
              <motion.div
                className={`h-full bg-gradient-to-r ${method.color}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${method.score}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </div>

            <p className="text-slate-400 text-xs">{method.bestFor}</p>
          </motion.div>
        ))}
      </div>

      {/* 학습 단계별 전략 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-cyan-400 mb-4">
          📊 학습 4단계 전략
        </h3>
        <div className="space-y-3">
          {learningPhases.map((phase, index) => (
            <motion.div
              key={index}
              className={`p-4 ${phase.color} rounded-xl border border-white/10`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-white">{phase.phase}</h4>
                <span className="text-sm text-slate-400">{phase.time}</span>
              </div>
              <p className="text-slate-300 text-sm">{phase.strategy}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 과목별 맞춤 전략 */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold text-yellow-400 mb-4">
          🎯 과목별 맞춤 전략
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {subjectStrategies.map((strategy, index) => (
            <motion.div
              key={index}
              className="p-4 bg-slate-800/50 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="font-bold text-yellow-400 mb-1">{strategy.subject}</h4>
              <p className="text-slate-300 text-sm">{strategy.method}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
