'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Brain, Users, Headphones, Book } from 'lucide-react';

interface StudyStyleProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function StudyStyle({ result, name }: StudyStyleProps) {
  const dayElement = result.day.stem.element;
  const { 인성, 식상, 비겁, 관성 } = result.tenGodsCount;

  // 학습 스타일 분석
  const getLearningStyles = () => {
    const styles = [];

    // 시각적 학습
    const visualScore = 50 + (dayElement === '화' ? 20 : 0) + (식상 * 10);
    styles.push({
      name: '시각적 학습',
      icon: Brain,
      score: Math.min(visualScore, 100),
      color: 'from-pink-500 to-rose-600',
      textColor: 'text-pink-400',
      desc: '그림, 도표, 색상을 활용한 학습이 효과적입니다.',
      tips: ['마인드맵 작성', '형광펜 활용', '다이어그램 그리기'],
    });

    // 청각적 학습
    const auditoryScore = 50 + (dayElement === '수' ? 20 : 0) + (인성 * 10);
    styles.push({
      name: '청각적 학습',
      icon: Headphones,
      score: Math.min(auditoryScore, 100),
      color: 'from-blue-500 to-indigo-600',
      textColor: 'text-blue-400',
      desc: '듣고 말하는 학습이 효과적입니다.',
      tips: ['강의 듣기', '소리내어 읽기', '토론 참여'],
    });

    // 협동 학습
    const collaborativeScore = 50 + (dayElement === '목' ? 15 : 0) + (비겁 * 10);
    styles.push({
      name: '협동 학습',
      icon: Users,
      score: Math.min(collaborativeScore, 100),
      color: 'from-green-500 to-emerald-600',
      textColor: 'text-green-400',
      desc: '그룹 스터디와 토론이 효과적입니다.',
      tips: ['스터디 그룹', '팀 프로젝트', '상호 설명'],
    });

    // 독립 학습
    const independentScore = 50 + (dayElement === '금' ? 20 : 0) + (관성 * 10);
    styles.push({
      name: '독립 학습',
      icon: Book,
      score: Math.min(independentScore, 100),
      color: 'from-yellow-500 to-amber-600',
      textColor: 'text-yellow-400',
      desc: '혼자 집중하는 학습이 효과적입니다.',
      tips: ['조용한 환경', '자기주도 학습', '계획적 복습'],
    });

    return styles.sort((a, b) => b.score - a.score);
  };

  const learningStyles = getLearningStyles();
  const primaryStyle = learningStyles[0];

  // 추천 학습 방법
  const getRecommendedMethods = () => {
    const methods = [];

    if (dayElement === '수') {
      methods.push('암기는 반복 듣기로');
      methods.push('팟캐스트 활용');
    }
    if (dayElement === '화') {
      methods.push('컬러풀한 노트 작성');
      methods.push('비주얼 자료 우선');
    }
    if (dayElement === '목') {
      methods.push('친구와 함께 공부');
      methods.push('설명하며 배우기');
    }
    if (dayElement === '금') {
      methods.push('계획표 작성');
      methods.push('체계적 정리');
    }
    if (dayElement === '토') {
      methods.push('반복 학습 중시');
      methods.push('기초부터 차근차근');
    }

    if (인성 >= 2) methods.push('독서로 배경지식 확장');
    if (식상 >= 2) methods.push('실습과 응용 중심');

    return methods;
  };

  const recommendedMethods = getRecommendedMethods();

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
        🧠 학습 스타일 분석
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님에게 가장 효과적인 학습 방법
      </p>

      {/* 주요 학습 스타일 */}
      <div className="glass rounded-2xl p-6 mb-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${primaryStyle.color} flex items-center justify-center`}>
            <primaryStyle.icon className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-slate-400">최적 학습 스타일</p>
            <h3 className="text-2xl font-bold text-purple-400">{primaryStyle.name}</h3>
            <p className="text-3xl font-bold text-pink-400">{primaryStyle.score}점</p>
          </div>
        </div>
        <p className="text-slate-300 mb-4">{primaryStyle.desc}</p>
        <div className="flex flex-wrap gap-2">
          {primaryStyle.tips.map((tip, index) => (
            <span key={index} className="px-3 py-1 bg-purple-500/20 rounded-full text-sm text-purple-300">
              {tip}
            </span>
          ))}
        </div>
      </div>

      {/* 학습 스타일별 점수 */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {learningStyles.map((style, index) => (
          <motion.div
            key={style.name}
            className="glass rounded-xl p-5"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${style.color} flex items-center justify-center`}>
                <style.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white">{style.name}</h4>
                <p className={`text-2xl font-bold ${style.textColor}`}>{style.score}점</p>
              </div>
            </div>

            {/* 점수 게이지 */}
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-3">
              <motion.div
                className={`h-full bg-gradient-to-r ${style.color}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${style.score}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </div>

            <p className="text-slate-300 text-sm">{style.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* 추천 학습 방법 */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold text-cyan-400 mb-4">
          💡 맞춤형 학습 전략
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {recommendedMethods.map((method, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="text-cyan-400 font-bold">✓</span>
              <p className="text-slate-300">{method}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
