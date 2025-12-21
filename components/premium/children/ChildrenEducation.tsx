'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { BookOpen, GraduationCap, Brain, Target } from 'lucide-react';

interface ChildrenEducationProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function ChildrenEducation({ result, name }: ChildrenEducationProps) {
  const dayElement = result.day.stem.element;
  const { 인성, 식상, 관성, 재성 } = result.tenGodsCount;

  // 학습 능력 점수
  const getLearningScore = () => {
    let score = 60;

    // 인성(학습 신)
    if (인성 >= 3) score += 25;
    else if (인성 >= 2) score += 15;
    else if (인성 >= 1) score += 8;

    // 일간별 학습 성향
    if (dayElement === '수' || dayElement === '금') score += 10; // 사고력
    if (dayElement === '목') score += 5; // 호기심
    if (dayElement === '토') score += 8; // 인내

    // 관성 (집중력)
    if (관성 >= 2) score += 10;

    return Math.min(Math.max(score, 40), 100);
  };

  const learningScore = getLearningScore();

  // 오행별 학습 스타일
  const getLearningStyle = () => {
    switch (dayElement) {
      case '목':
        return {
          style: '탐험형 학습자',
          characteristics: [
            '호기심이 많아 새로운 것을 배우길 좋아합니다',
            '창의적인 방법으로 문제를 해결합니다',
            '토론과 대화를 통해 잘 배웁니다',
            '단조로운 반복 학습은 지루해합니다',
          ],
          bestMethods: [
            '프로젝트 기반 학습',
            '야외 체험 학습',
            '그룹 토론',
            '창의적 과제',
          ],
          subjects: [
            { name: '과학', score: 85 },
            { name: '미술', score: 90 },
            { name: '체육', score: 80 },
            { name: '영어', score: 75 },
          ],
        };
      case '화':
        return {
          style: '열정형 학습자',
          characteristics: [
            '적극적으로 참여하며 배웁니다',
            '경쟁을 통해 동기 부여됩니다',
            '발표와 표현 활동을 좋아합니다',
            '순간적인 집중력은 강하나 오래 지속되지 않을 수 있습니다',
          ],
          bestMethods: [
            '게임 기반 학습',
            '발표 수업',
            '경쟁 활동',
            '짧은 집중 학습',
          ],
          subjects: [
            { name: '국어', score: 85 },
            { name: '사회', score: 80 },
            { name: '체육', score: 90 },
            { name: '음악', score: 75 },
          ],
        };
      case '토':
        return {
          style: '안정형 학습자',
          characteristics: [
            '차근차근 단계적으로 배웁니다',
            '반복 학습을 통해 확실히 익힙니다',
            '인내심이 강해 긴 시간 학습 가능합니다',
            '급격한 변화보다 꾸준함을 선호합니다',
          ],
          bestMethods: [
            '체계적 반복 학습',
            '단계별 커리큘럼',
            '실습 중심 학습',
            '복습 강화',
          ],
          subjects: [
            { name: '수학', score: 85 },
            { name: '과학', score: 80 },
            { name: '사회', score: 75 },
            { name: '실과', score: 90 },
          ],
        };
      case '금':
        return {
          style: '논리형 학습자',
          characteristics: [
            '논리적이고 체계적으로 사고합니다',
            '원리를 이해하면 빠르게 습득합니다',
            '집중력이 뛰어나고 꼼꼼합니다',
            '완벽주의 성향이 있습니다',
          ],
          bestMethods: [
            '원리 이해 중심',
            '논리적 설명',
            '체계적 문제 풀이',
            '심화 학습',
          ],
          subjects: [
            { name: '수학', score: 95 },
            { name: '과학', score: 90 },
            { name: '영어', score: 80 },
            { name: '음악', score: 75 },
          ],
        };
      case '수':
        return {
          style: '사고형 학습자',
          characteristics: [
            '깊이 있게 사고하고 이해합니다',
            '독서와 글쓰기를 좋아합니다',
            '관찰력과 통찰력이 뛰어납니다',
            '자기주도 학습 능력이 높습니다',
          ],
          bestMethods: [
            '독서 중심 학습',
            '토론 수업',
            '연구 프로젝트',
            '자기주도 학습',
          ],
          subjects: [
            { name: '국어', score: 95 },
            { name: '사회', score: 90 },
            { name: '영어', score: 85 },
            { name: '과학', score: 80 },
          ],
        };
      default:
        return {
          style: '균형형',
          characteristics: [],
          bestMethods: [],
          subjects: [],
        };
    }
  };

  const learningStyle = getLearningStyle();

  // 교육 방향 제안
  const getEducationPath = () => {
    const paths = [];

    if (인성 >= 2) {
      paths.push({
        type: '학문 중심',
        icon: '📚',
        description: '전통적인 학업 성취도가 높습니다. 대학 진학 및 학문적 커리어에 유리합니다.',
        recommendations: ['조기 교육', '독서 습관', '학원/과외', '명문대 진학'],
      });
    }

    if (식상 >= 2) {
      paths.push({
        type: '창의/예술 중심',
        icon: '🎨',
        description: '창의력과 표현력이 뛰어납니다. 예술, 디자인, 창작 분야에 재능이 있습니다.',
        recommendations: ['예체능 교육', '창의 활동', '포트폴리오', '특기 개발'],
      });
    }

    if (재성 >= 2) {
      paths.push({
        type: '실용/비즈니스 중심',
        icon: '💼',
        description: '현실 감각이 뛰어납니다. 경영, 경제, 실용 학문에 적합합니다.',
        recommendations: ['경제 교육', '실무 경험', '리더십 개발', '기업가 정신'],
      });
    }

    if (관성 >= 2) {
      paths.push({
        type: '체계/조직 중심',
        icon: '🏛️',
        description: '조직력과 리더십이 있습니다. 법학, 행정, 경영 분야에 유리합니다.',
        recommendations: ['리더십 교육', '조직 활동', '토론 대회', '학생회 활동'],
      });
    }

    if (paths.length === 0) {
      paths.push({
        type: '균형 발달',
        icon: '⚖️',
        description: '다양한 분야를 경험하며 적성을 찾아가세요.',
        recommendations: ['다양한 경험', '적성 탐색', '진로 상담', '종합 발달'],
      });
    }

    return paths;
  };

  const educationPaths = getEducationPath();

  // 학습 관리 팁
  const learningTips = [
    {
      title: '동기 부여',
      icon: '🎯',
      tips: [
        '구체적인 목표를 함께 설정하세요',
        '작은 성취를 칭찬하세요',
        '학습의 즐거움을 느끼게 하세요',
        '롤모델을 제시하세요',
      ],
    },
    {
      title: '집중력 향상',
      icon: '🧠',
      tips: [
        '적절한 휴식을 제공하세요',
        '학습 환경을 정돈하세요',
        '집중 시간을 점진적으로 늘리세요',
        '멀티태스킹을 지양하세요',
      ],
    },
    {
      title: '효율적 학습',
      icon: '⚡',
      tips: [
        '아이의 학습 스타일을 존중하세요',
        '예습-수업-복습 사이클 확립',
        '이해 중심 학습을 권장하세요',
        '질문하는 습관을 길러주세요',
      ],
    },
    {
      title: '스트레스 관리',
      icon: '❤️',
      tips: [
        '과도한 압박을 피하세요',
        '충분한 수면을 보장하세요',
        '취미 활동 시간을 확보하세요',
        '정서적 지지를 제공하세요',
      ],
    },
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
        📚 자녀 교육 방향
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님 자녀의 학습 스타일과 교육 가이드
      </p>

      {/* 학습 능력 점수 */}
      <div className="glass rounded-2xl p-8 mb-8 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/30">
        <div className="text-center mb-6">
          <p className="text-slate-400 text-sm mb-2">학습 능력 점수</p>
          <div className="flex items-baseline justify-center gap-2 mb-4">
            <span className="text-5xl font-bold gradient-text">{learningScore}</span>
            <span className="text-2xl text-slate-400">점</span>
          </div>
          <p className="text-lg font-bold text-blue-400 mb-4">{learningStyle.style}</p>
          <div className="h-3 bg-slate-700 rounded-full overflow-hidden max-w-md mx-auto">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
              initial={{ width: 0 }}
              whileInView={{ width: `${learningScore}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            />
          </div>
        </div>
      </div>

      {/* 학습 스타일 특성 */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
          <Brain className="w-6 h-6" />
          학습 스타일 특성
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {learningStyle.characteristics.map((char, index) => (
            <motion.div
              key={index}
              className="glass rounded-xl p-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <p className="text-slate-300 text-sm">✓ {char}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 추천 학습 방법 */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
          <Target className="w-6 h-6" />
          최적 학습 방법
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {learningStyle.bestMethods.map((method, index) => (
            <motion.div
              key={index}
              className="glass rounded-xl p-4 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <p className="text-sm font-bold text-purple-400">{method}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 과목별 적성 */}
      {learningStyle.subjects.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
            <GraduationCap className="w-6 h-6" />
            과목별 적성도
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {learningStyle.subjects.map((subject, index) => (
              <motion.div
                key={index}
                className="glass rounded-xl p-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-white font-bold">{subject.name}</p>
                  <p className="text-2xl font-bold text-green-400">{subject.score}점</p>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${subject.score}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* 교육 방향 제안 */}
      <h3 className="text-xl font-bold text-cyan-400 mb-4">추천 교육 방향</h3>
      <div className="space-y-4 mb-8">
        {educationPaths.map((path, index) => (
          <motion.div
            key={index}
            className="glass rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-start gap-4">
              <span className="text-4xl">{path.icon}</span>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-white mb-2">{path.type}</h4>
                <p className="text-slate-300 text-sm mb-3">{path.description}</p>
                <div className="flex flex-wrap gap-2">
                  {path.recommendations.map((rec, i) => (
                    <span
                      key={i}
                      className="glass px-3 py-1 rounded-full text-xs text-cyan-400"
                    >
                      • {rec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 학습 관리 팁 */}
      <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
        <BookOpen className="w-6 h-6" />
        효과적인 학습 관리 팁
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        {learningTips.map((category, index) => (
          <motion.div
            key={index}
            className="glass rounded-xl p-5"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{category.icon}</span>
              <h4 className="font-bold text-white">{category.title}</h4>
            </div>
            <ul className="space-y-2">
              {category.tips.map((tip, i) => (
                <li key={i} className="text-slate-300 text-sm">
                  ✓ {tip}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
