'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Telescope, TrendingUp, Star, Zap } from 'lucide-react';

interface ChildrenFutureProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function ChildrenFuture({ result, name }: ChildrenFutureProps) {
  const dayElement = result.day.stem.element;
  const { 식상, 인성, 재성, 관성, 비겁 } = result.tenGodsCount;

  // 미래 전망 점수
  const getFutureScore = () => {
    let score = 65;

    if (식상 >= 2) score += 10;
    if (인성 >= 2) score += 12;
    if (재성 >= 2) score += 8;
    if (관성 >= 2) score += 8;

    // 일간별 미래운
    if (dayElement === '수' || dayElement === '목') score += 8;
    if (dayElement === '토' || dayElement === '금') score += 6;
    if (dayElement === '화') score += 5;

    return Math.min(Math.max(score, 50), 100);
  };

  const futureScore = getFutureScore();

  const getGrade = () => {
    if (futureScore >= 85) return { text: '매우 밝음', color: 'text-yellow-400', icon: '🌟' };
    if (futureScore >= 70) return { text: '밝음', color: 'text-green-400', icon: '✨' };
    if (futureScore >= 60) return { text: '안정적', color: 'text-blue-400', icon: '💫' };
    return { text: '노력 필요', color: 'text-orange-400', icon: '⭐' };
  };

  const grade = getGrade();

  // 적성 분야 예측
  const getCareerAptitude = () => {
    const aptitudes = [];

    if (인성 >= 2) {
      aptitudes.push({
        field: '학문/연구',
        icon: '🎓',
        score: 90,
        careers: ['교수', '연구원', '전문직', '교사', '학자'],
        description: '학습 능력이 뛰어나 학문적 성취가 높을 것입니다.',
      });
    }

    if (식상 >= 2) {
      aptitudes.push({
        field: '예술/창작',
        icon: '🎨',
        score: 85,
        careers: ['예술가', '디자이너', '작가', '크리에이터', '연출가'],
        description: '창의력과 표현력이 뛰어나 창작 분야에서 성공할 수 있습니다.',
      });
    }

    if (재성 >= 2) {
      aptitudes.push({
        field: '경영/비즈니스',
        icon: '💼',
        score: 85,
        careers: ['기업가', '경영인', '금융인', '컨설턴트', '마케터'],
        description: '경제 감각이 뛰어나 비즈니스에서 성공할 가능성이 높습니다.',
      });
    }

    if (관성 >= 2) {
      aptitudes.push({
        field: '행정/조직',
        icon: '🏛️',
        score: 80,
        careers: ['공무원', '법조인', '관리자', '정치인', '행정가'],
        description: '조직 관리 능력이 뛰어나 리더로 성장할 것입니다.',
      });
    }

    if (비겁 >= 2) {
      aptitudes.push({
        field: '스포츠/체육',
        icon: '⚽',
        score: 75,
        careers: ['운동선수', '체육 교사', '트레이너', '스포츠 지도자'],
        description: '신체 능력과 경쟁심이 강해 스포츠 분야에 적합합니다.',
      });
    }

    // 오행별 추가 적성
    if (dayElement === '수') {
      aptitudes.push({
        field: '인문/철학',
        icon: '📚',
        score: 85,
        careers: ['철학자', '상담사', '작가', '심리학자', '인문학자'],
        description: '깊이 있는 사고력으로 인문학 분야에서 두각을 나타낼 것입니다.',
      });
    }

    if (dayElement === '금') {
      aptitudes.push({
        field: '공학/기술',
        icon: '⚙️',
        score: 88,
        careers: ['엔지니어', '개발자', 'IT 전문가', '과학자', '기술자'],
        description: '논리적 사고와 분석력으로 기술 분야에서 성공할 것입니다.',
      });
    }

    if (aptitudes.length === 0) {
      aptitudes.push({
        field: '다양한 분야',
        icon: '⭐',
        score: 70,
        careers: ['여러 가능성'],
        description: '다양한 분야에서 자신의 길을 찾을 수 있습니다.',
      });
    }

    return aptitudes.slice(0, 4); // 최대 4개
  };

  const careerAptitudes = getCareerAptitude();

  // 성공 가능성 분석
  const getSuccessPotential = () => {
    return {
      academic: {
        name: '학업 성취',
        score: 인성 >= 2 ? 85 : 인성 >= 1 ? 70 : 60,
        prediction: 인성 >= 2
          ? '뛰어난 학업 성취를 이룰 것입니다'
          : '꾸준한 노력으로 좋은 성적을 거둘 수 있습니다',
      },
      career: {
        name: '직업 성공',
        score: 재성 >= 2 || 관성 >= 2 ? 80 : 70,
        prediction:
          재성 >= 2 || 관성 >= 2
            ? '사회에서 인정받는 위치에 오를 것입니다'
            : '성실함으로 안정적인 커리어를 쌓을 것입니다',
      },
      wealth: {
        name: '경제적 성공',
        score: 재성 >= 2 ? 85 : 재성 >= 1 ? 70 : 65,
        prediction:
          재성 >= 2
            ? '경제적으로 풍요로운 삶을 살 가능성이 높습니다'
            : '계획적인 재테크로 안정을 이룰 수 있습니다',
      },
      relationships: {
        name: '인간관계',
        score: 식상 >= 2 || 비겁 >= 2 ? 80 : 70,
        prediction:
          식상 >= 2 || 비겁 >= 2
            ? '폭넓은 인맥과 좋은 관계를 형성할 것입니다'
            : '진실한 관계를 만들어갈 것입니다',
      },
      happiness: {
        name: '행복도',
        score: futureScore >= 80 ? 85 : futureScore >= 70 ? 75 : 68,
        prediction:
          futureScore >= 80
            ? '만족스럽고 행복한 인생을 살 것입니다'
            : '자신만의 행복을 찾아갈 것입니다',
      },
    };
  };

  const successPotential = getSuccessPotential();

  // 인생 로드맵
  const lifeRoadmap = [
    { age: '20대', focus: '자아 발견', goals: ['전공 선택', '직업 탐색', '인간관계 형성', '자립 준비'] },
    { age: '30대', focus: '기반 구축', goals: ['커리어 확립', '경제적 안정', '가정 형성', '전문성 개발'] },
    { age: '40대', focus: '성숙기', goals: ['커리어 정점', '재산 축적', '자녀 교육', '사회 기여'] },
    { age: '50대+', focus: '완성기', goals: ['지혜 나눔', '여유로운 삶', '제2인생', '후학 양성'] },
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
        🔮 자녀의 미래 전망
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님 자녀의 밝은 미래 예측
      </p>

      {/* 미래 전망 점수 */}
      <div className="glass rounded-2xl p-8 mb-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30">
        <div className="text-center mb-6">
          <span className="text-5xl mb-3 block">{grade.icon}</span>
          <p className="text-slate-400 text-sm mb-2">미래 전망 점수</p>
          <div className="flex items-baseline justify-center gap-2 mb-4">
            <span className="text-5xl font-bold gradient-text">{futureScore}</span>
            <span className="text-2xl text-slate-400">점</span>
          </div>
          <p className={`text-2xl font-bold mb-4 ${grade.color}`}>{grade.text}</p>
          <div className="h-3 bg-slate-700 rounded-full overflow-hidden max-w-md mx-auto">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500"
              initial={{ width: 0 }}
              whileInView={{ width: `${futureScore}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            />
          </div>
        </div>
      </div>

      {/* 적성 분야 */}
      <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
        <Star className="w-6 h-6" />
        유망 진로 분야
      </h3>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {careerAptitudes.map((aptitude, index) => (
          <motion.div
            key={index}
            className="glass rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-start gap-4 mb-4">
              <span className="text-4xl">{aptitude.icon}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-bold text-white">{aptitude.field}</h4>
                  <span className="text-2xl font-bold text-green-400">{aptitude.score}점</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-3">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${aptitude.score}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  />
                </div>
                <p className="text-slate-300 text-sm mb-3">{aptitude.description}</p>
                <div className="flex flex-wrap gap-2">
                  {aptitude.careers.map((career, i) => (
                    <span key={i} className="glass px-3 py-1 rounded-full text-xs text-cyan-400">
                      {career}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 성공 가능성 분석 */}
      <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
        <TrendingUp className="w-6 h-6" />
        영역별 성공 가능성
      </h3>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {Object.entries(successPotential).map(([key, potential], index) => (
          <motion.div
            key={key}
            className="glass rounded-xl p-5"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-white">{potential.name}</h4>
              <span className="text-xl font-bold text-purple-400">{potential.score}점</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-3">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                initial={{ width: 0 }}
                whileInView={{ width: `${potential.score}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              />
            </div>
            <p className="text-slate-300 text-sm">{potential.prediction}</p>
          </motion.div>
        ))}
      </div>

      {/* 인생 로드맵 */}
      <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
        <Telescope className="w-6 h-6" />
        인생 로드맵
      </h3>
      <div className="space-y-3 mb-8">
        {lifeRoadmap.map((stage, index) => (
          <motion.div
            key={index}
            className="glass rounded-xl p-5"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                  <span className="font-bold text-white text-sm">{stage.age}</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <h4 className="font-bold text-white">{stage.focus}</h4>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {stage.goals.map((goal, i) => (
                    <div key={i} className="glass rounded-lg p-2">
                      <p className="text-slate-300 text-sm">✓ {goal}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 부모의 역할 */}
      <div className="glass rounded-2xl p-6 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/30">
        <p className="text-blue-300 font-bold mb-3">🌟 부모로서 자녀의 미래를 위해</p>
        <ul className="text-slate-300 text-sm space-y-2 leading-relaxed">
          <li>• <strong>꿈을 지지하세요</strong>: 자녀의 꿈과 목표를 존중하고 응원하세요</li>
          <li>• <strong>기회를 제공하세요</strong>: 다양한 경험과 도전의 기회를 주세요</li>
          <li>• <strong>실패를 허용하세요</strong>: 실패도 성장의 과정임을 알려주세요</li>
          <li>• <strong>자립심을 키워주세요</strong>: 스스로 결정하고 책임지는 법을 가르치세요</li>
          <li>• <strong>믿음을 주세요</strong>: 자녀를 믿고 기다려주세요</li>
          <li>• <strong>롤모델이 되세요</strong>: 부모의 삶이 최고의 교육입니다</li>
        </ul>
        <p className="text-yellow-300 text-sm mt-4 font-bold">
          ✨ 자녀의 미래는 사주만이 아닌, 부모의 사랑과 지지, 그리고 자녀 자신의 노력으로 만들어집니다.
        </p>
      </div>
    </motion.div>
  );
}
