'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { HandHeart, Target, Lightbulb, Sparkles } from 'lucide-react';

interface ChildrenSupportProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function ChildrenSupport({ result, name }: ChildrenSupportProps) {
  const dayElement = result.day.stem.element;
  const { 식상, 인성, 재성, 관성 } = result.tenGodsCount;

  // 오행별 지원 방향
  const getSupportGuidance = () => {
    switch (dayElement) {
      case '목':
        return {
          mainFocus: '창의성과 성장 지원',
          icon: '🌱',
          emotionalSupport: {
            title: '정서적 지원',
            methods: [
              '자유로운 표현을 격려하세요',
              '실패를 성장의 기회로 인식시키세요',
              '긍정적 피드백을 자주 주세요',
              '호기심을 존중하고 탐구를 지원하세요',
            ],
          },
          educationalSupport: {
            title: '학습 지원',
            methods: [
              '다양한 경험 기회를 제공하세요',
              '창의적 활동을 권장하세요',
              '야외 활동과 자연 체험을 많이 시키세요',
              '프로젝트 기반 학습을 지원하세요',
            ],
          },
          materialSupport: {
            title: '물질적 지원',
            needs: ['미술/공작 재료', '다양한 책', '체험 활동비', '악기/스포츠 용품'],
            priority: '경험과 활동 중심',
          },
        };
      case '화':
        return {
          mainFocus: '열정과 에너지 지원',
          icon: '🔥',
          emotionalSupport: {
            title: '정서적 지원',
            methods: [
              '열정을 인정하고 칭찬하세요',
              '감정 조절 방법을 가르치세요',
              '성취를 함께 축하하세요',
              '자신감을 북돋아주세요',
            ],
          },
          educationalSupport: {
            title: '학습 지원',
            methods: [
              '활동적인 학습 방식을 제공하세요',
              '경쟁을 통한 동기 부여를 활용하세요',
              '짧고 집중적인 학습을 권장하세요',
              '발표와 표현 기회를 주세요',
            ],
          },
          materialSupport: {
            title: '물질적 지원',
            needs: ['스포츠 용품', '공연/관람 티켓', '에너지 발산 활동', '동아리 활동비'],
            priority: '활동과 체험 중심',
          },
        };
      case '토':
        return {
          mainFocus: '안정성과 끈기 지원',
          icon: '🏔️',
          emotionalSupport: {
            title: '정서적 지원',
            methods: [
              '안정적인 환경을 제공하세요',
              '꾸준함을 인정하고 격려하세요',
              '충분한 시간을 주세요',
              '신뢰와 믿음을 보여주세요',
            ],
          },
          educationalSupport: {
            title: '학습 지원',
            methods: [
              '체계적인 학습 계획을 세우세요',
              '반복 학습을 지원하세요',
              '실습 중심 교육을 제공하세요',
              '단계별 성취를 격려하세요',
            ],
          },
          materialSupport: {
            title: '물질적 지원',
            needs: ['학습 교재', '안정적 학습 공간', '실습 도구', '기초 튼튼 교육'],
            priority: '체계와 안정 중심',
          },
        };
      case '금':
        return {
          mainFocus: '논리성과 완성도 지원',
          icon: '💎',
          emotionalSupport: {
            title: '정서적 지원',
            methods: [
              '완벽주의 압박을 줄여주세요',
              '과정을 인정하고 칭찬하세요',
              '실수를 허용하는 분위기를 만드세요',
              '감정 표현을 격려하세요',
            ],
          },
          educationalSupport: {
            title: '학습 지원',
            methods: [
              '원리 중심 학습을 제공하세요',
              '심화 학습 기회를 주세요',
              '논리적 사고를 키워주세요',
              '체계적 문제 해결을 훈련하세요',
            ],
          },
          materialSupport: {
            title: '물질적 지원',
            needs: ['심화 교재', '과학 실험 도구', '논리 퍼즐', '전문 교육'],
            priority: '깊이와 전문성 중심',
          },
        };
      case '수':
        return {
          mainFocus: '지혜와 통찰력 지원',
          icon: '💧',
          emotionalSupport: {
            title: '정서적 지원',
            methods: [
              '깊이 있는 대화를 나누세요',
              '고민을 함께 나누세요',
              '결단력을 키워주세요',
              '자신감을 북돋아주세요',
            ],
          },
          educationalSupport: {
            title: '학습 지원',
            methods: [
              '독서 습관을 길러주세요',
              '사고력을 키우는 활동을 제공하세요',
              '자기주도 학습을 격려하세요',
              '토론과 글쓰기를 지원하세요',
            ],
          },
          materialSupport: {
            title: '물질적 지원',
            needs: ['다양한 책', '교육 콘텐츠', '문화 체험', '철학/인문 교육'],
            priority: '지식과 사고력 중심',
          },
        };
      default:
        return {
          mainFocus: '균형 발달 지원',
          icon: '⚖️',
          emotionalSupport: { title: '', methods: [] },
          educationalSupport: { title: '', methods: [] },
          materialSupport: { title: '', needs: [], priority: '' },
        };
    }
  };

  const support = getSupportGuidance();

  // 시기별 집중 지원 영역
  const developmentStages = [
    {
      age: '0-3세',
      title: '애착 형성기',
      icon: '👶',
      focus: '정서적 안정',
      keySupport: [
        '충분한 스킨십',
        '일관된 돌봄',
        '안전한 환경',
        '풍부한 자극',
      ],
      investment: '사랑과 시간 투자',
    },
    {
      age: '4-7세',
      title: '기초 형성기',
      icon: '🧒',
      focus: '기본 습관',
      keySupport: [
        '기본 생활 습관',
        '사회성 발달',
        '언어 발달',
        '창의적 놀이',
      ],
      investment: '교육과 경험 투자',
    },
    {
      age: '8-13세',
      title: '성장 발달기',
      icon: '👦',
      focus: '재능 발견',
      keySupport: [
        '다양한 체험',
        '특기 개발',
        '학습 습관',
        '자존감 향상',
      ],
      investment: '교육과 활동 투자',
    },
    {
      age: '14-18세',
      title: '정체성 확립기',
      icon: '👨',
      focus: '진로 준비',
      keySupport: [
        '진로 탐색',
        '자기 결정',
        '전문성 개발',
        '독립성 지원',
      ],
      investment: '교육과 미래 투자',
    },
  ];

  // 지원 우선순위
  const getPriorities = () => {
    const priorities = [
      {
        rank: 1,
        area: '정서적 지원',
        icon: '❤️',
        importance: '최우선',
        description: '무조건적 사랑과 안정감 제공',
        budget: '시간과 관심',
      },
      {
        rank: 2,
        area: '건강 지원',
        icon: '🏥',
        importance: '필수',
        description: '영양, 운동, 건강 관리',
        budget: '건강 투자',
      },
      {
        rank: 3,
        area: '교육 지원',
        icon: '📚',
        importance: '중요',
        description: '학습, 재능 개발, 진로 준비',
        budget: '교육비',
      },
    ];

    // 사주에 따른 추가 우선순위
    if (인성 >= 2) {
      priorities.push({
        rank: 4,
        area: '학문 지원',
        icon: '🎓',
        importance: '추천',
        description: '심화 학습, 전문 교육',
        budget: '전문 교육비',
      });
    }

    if (식상 >= 2) {
      priorities.push({
        rank: 4,
        area: '예술/창작 지원',
        icon: '🎨',
        importance: '추천',
        description: '예술, 창의 활동, 표현 교육',
        budget: '예체능 교육비',
      });
    }

    if (재성 >= 2) {
      priorities.push({
        rank: 4,
        area: '경제 교육',
        icon: '💰',
        importance: '권장',
        description: '금융 이해, 경제 감각',
        budget: '실무 교육',
      });
    }

    return priorities;
  };

  const priorities = getPriorities();

  // 지원 밸런스 조언
  const getBalanceAdvice = () => {
    if (인성 >= 2 && 식상 >= 2) {
      return '학업과 창의성을 균형 있게 지원하세요. 둘 다 중요합니다.';
    }
    if (관성 >= 2) {
      return '규율과 자율성의 균형이 중요합니다. 적절한 통제와 자유를 주세요.';
    }
    if (재성 >= 2) {
      return '현실적 지원과 정서적 지원을 병행하세요.';
    }
    return '자녀의 욕구와 부모의 능력을 고려한 균형 있는 지원이 필요합니다.';
  };

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
        🤝 자녀 지원 방향
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님 자녀를 위한 최적 지원 전략
      </p>

      {/* 핵심 지원 방향 */}
      <div className="glass rounded-2xl p-8 mb-8 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/30">
        <div className="text-center mb-6">
          <span className="text-6xl mb-3 block">{support.icon}</span>
          <p className="text-2xl font-bold gradient-text mb-4">{support.mainFocus}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* 정서적 지원 */}
          <div className="glass rounded-xl p-5">
            <h4 className="text-pink-400 font-bold mb-3 flex items-center gap-2">
              <HandHeart className="w-5 h-5" />
              {support.emotionalSupport.title}
            </h4>
            <ul className="space-y-2">
              {support.emotionalSupport.methods.map((method, i) => (
                <li key={i} className="text-slate-300 text-sm">
                  ❤️ {method}
                </li>
              ))}
            </ul>
          </div>

          {/* 학습 지원 */}
          <div className="glass rounded-xl p-5">
            <h4 className="text-blue-400 font-bold mb-3 flex items-center gap-2">
              <Target className="w-5 h-5" />
              {support.educationalSupport.title}
            </h4>
            <ul className="space-y-2">
              {support.educationalSupport.methods.map((method, i) => (
                <li key={i} className="text-slate-300 text-sm">
                  📚 {method}
                </li>
              ))}
            </ul>
          </div>

          {/* 물질적 지원 */}
          <div className="glass rounded-xl p-5">
            <h4 className="text-green-400 font-bold mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              {support.materialSupport.title}
            </h4>
            <p className="text-purple-400 text-sm font-bold mb-2">
              우선순위: {support.materialSupport.priority}
            </p>
            <ul className="space-y-1">
              {support.materialSupport.needs.map((need, i) => (
                <li key={i} className="text-slate-300 text-sm">
                  • {need}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 시기별 집중 지원 */}
      <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
        <Target className="w-6 h-6" />
        시기별 집중 지원 영역
      </h3>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {developmentStages.map((stage, index) => (
          <motion.div
            key={index}
            className="glass rounded-xl p-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-start gap-4 mb-4">
              <span className="text-4xl">{stage.icon}</span>
              <div className="flex-1">
                <p className="text-slate-400 text-sm">{stage.age}</p>
                <h4 className="text-lg font-bold text-white mb-1">{stage.title}</h4>
                <p className="text-purple-400 text-sm">🎯 {stage.focus}</p>
              </div>
            </div>
            <div className="glass rounded-lg p-4 mb-3">
              <p className="text-blue-400 text-sm font-bold mb-2">핵심 지원 사항</p>
              <div className="grid grid-cols-2 gap-2">
                {stage.keySupport.map((support, i) => (
                  <span key={i} className="text-slate-300 text-xs">
                    ✓ {support}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-green-400 text-sm">
              💰 {stage.investment}
            </p>
          </motion.div>
        ))}
      </div>

      {/* 지원 우선순위 */}
      <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
        <Lightbulb className="w-6 h-6" />
        지원 영역 우선순위
      </h3>
      <div className="space-y-3 mb-8">
        {priorities.map((priority, index) => (
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
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white">
                  {priority.rank}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{priority.icon}</span>
                  <h4 className="font-bold text-white">{priority.area}</h4>
                  <span className="text-xs font-bold text-orange-400 ml-auto">
                    {priority.importance}
                  </span>
                </div>
                <p className="text-slate-300 text-sm mb-2">{priority.description}</p>
                <p className="text-green-400 text-sm">💵 {priority.budget}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 균형 조언 */}
      <div className="glass rounded-2xl p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30">
        <p className="text-purple-300 font-bold mb-3">⚖️ 균형 잡힌 지원을 위한 조언</p>
        <p className="text-slate-300 text-sm leading-relaxed mb-4">
          {getBalanceAdvice()}
        </p>
        <ul className="text-slate-300 text-sm space-y-2 leading-relaxed">
          <li>• <strong>과잉 지원 주의</strong>: 너무 많은 지원은 오히려 자녀의 자립심을 해칠 수 있습니다</li>
          <li>• <strong>경제적 능력 고려</strong>: 가정의 경제 상황에 맞는 현실적 지원이 중요합니다</li>
          <li>• <strong>정서적 우선</strong>: 물질적 지원보다 정서적 지지가 더 중요합니다</li>
          <li>• <strong>자녀 의견 존중</strong>: 자녀가 원하는 것과 필요한 것을 구분하여 지원하세요</li>
          <li>• <strong>장기적 관점</strong>: 당장의 성과보다 장기적 성장을 목표로 하세요</li>
        </ul>
      </div>
    </motion.div>
  );
}
