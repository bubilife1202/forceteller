'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { AlertTriangle, Shield, Lightbulb, Heart } from 'lucide-react';

interface ChildrenConflictProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function ChildrenConflict({ result, name }: ChildrenConflictProps) {
  const dayElement = result.day.stem.element;
  const { 식상, 비겁, 관성, 인성 } = result.tenGodsCount;

  // 갈등 빈도 예측
  const getConflictLevel = () => {
    let level = 30;

    // 비겁 (자기 주장)
    if (비겁 >= 3) level += 20;
    else if (비겁 >= 2) level += 10;

    // 관성 (규율, 충돌)
    if (관성 >= 3) level += 15;
    else if (관성 >= 2) level += 8;

    // 일간별 갈등 성향
    if (dayElement === '화') level += 10; // 감정적
    if (dayElement === '금') level += 8; // 원칙적
    if (dayElement === '수' || dayElement === '토') level -= 5; // 유연/포용

    // 인성 (이해력)
    if (인성 >= 2) level -= 10;

    return Math.min(Math.max(level, 10), 70);
  };

  const conflictLevel = getConflictLevel();

  const getConflictGrade = () => {
    if (conflictLevel <= 20) return { text: '매우 낮음', color: 'text-green-400', icon: '😊' };
    if (conflictLevel <= 35) return { text: '낮음', color: 'text-blue-400', icon: '🙂' };
    if (conflictLevel <= 50) return { text: '보통', color: 'text-yellow-400', icon: '😐' };
    return { text: '높음', color: 'text-orange-400', icon: '😟' };
  };

  const grade = getConflictGrade();

  // 주요 갈등 패턴
  const getConflictPatterns = () => {
    const patterns = [];

    if (비겁 >= 2) {
      patterns.push({
        type: '자기 주장 충돌',
        icon: '💥',
        description: '자녀가 자기 의견을 강하게 주장하여 부모와 충돌할 수 있습니다.',
        frequency: '자주',
        solutions: [
          '자녀의 의견을 먼저 들어주세요',
          '선택권을 주되 범위를 정하세요',
          '논리적으로 설명하세요',
          '타협점을 찾으세요',
        ],
      });
    }

    if (관성 >= 2) {
      patterns.push({
        type: '규칙 저항',
        icon: '🚫',
        description: '부모의 규칙이나 통제에 반발할 수 있습니다.',
        frequency: '가끔',
        solutions: [
          '규칙을 함께 정하세요',
          '이유를 명확히 설명하세요',
          '일관성을 유지하세요',
          '자율성도 인정하세요',
        ],
      });
    }

    if (식상 >= 2) {
      patterns.push({
        type: '표현 방식 차이',
        icon: '🗣️',
        description: '감정이나 생각을 표현하는 방식이 달라 오해가 생길 수 있습니다.',
        frequency: '종종',
        solutions: [
          '서로의 표현 방식을 이해하세요',
          '감정을 언어화하도록 도와주세요',
          '비언어적 신호도 읽으세요',
          '침착하게 대화하세요',
        ],
      });
    }

    if (dayElement === '화' || dayElement === '목') {
      patterns.push({
        type: '즉각적 반응',
        icon: '⚡',
        description: '감정적으로 즉각 반응하여 갈등이 확대될 수 있습니다.',
        frequency: '자주',
        solutions: [
          '감정이 격할 때 잠시 멈추세요',
          '심호흡하고 생각하세요',
          '냉각 시간을 가지세요',
          '차분히 다시 대화하세요',
        ],
      });
    }

    if (patterns.length === 0) {
      patterns.push({
        type: '경미한 의견 차이',
        icon: '💭',
        description: '대체로 원만한 관계를 유지하며 큰 갈등은 드뭅니다.',
        frequency: '드물게',
        solutions: [
          '작은 갈등도 소홀히 하지 마세요',
          '대화로 해결하세요',
          '긍정적 관계를 유지하세요',
          '예방적 소통이 중요합니다',
        ],
      });
    }

    return patterns;
  };

  const conflictPatterns = getConflictPatterns();

  // 나이별 갈등 대처법
  const ageSpecificStrategies = [
    {
      age: '영유아기 (0-5세)',
      icon: '👶',
      commonIssues: ['떼쓰기', '고집', '분리불안', '수면/식사 거부'],
      strategies: [
        '일관된 루틴 유지',
        '선택권 제공 (제한적)',
        '감정 인정 후 전환',
        '긍정적 강화',
      ],
    },
    {
      age: '아동기 (6-12세)',
      icon: '🧒',
      commonIssues: ['숙제/공부', '게임/스마트폰', '형제 갈등', '친구 문제'],
      strategies: [
        '규칙을 함께 정하기',
        '결과를 미리 설명',
        '책임감 키우기',
        '대화로 해결',
      ],
    },
    {
      age: '청소년기 (13-18세)',
      icon: '👨',
      commonIssues: ['독립 욕구', '또래 압력', '진로 문제', '사생활 존중'],
      strategies: [
        '존중과 신뢰 기반',
        '조언만 하고 강요 안함',
        '독립성 인정',
        '열린 대화 유지',
      ],
    },
  ];

  // 갈등 해결 5단계
  const resolutionSteps = [
    {
      step: 1,
      title: '감정 인정',
      icon: '❤️',
      description: '자녀의 감정을 먼저 인정하고 공감합니다',
      example: '"화가 났구나. 그럴 수 있어."',
    },
    {
      step: 2,
      title: '문제 파악',
      icon: '🔍',
      description: '무엇이 문제인지 함께 파악합니다',
      example: '"무엇 때문에 화가 났는지 말해줄래?"',
    },
    {
      step: 3,
      title: '의견 청취',
      icon: '👂',
      description: '자녀의 입장을 충분히 듣습니다',
      example: '"네 생각을 들려줘. 끝까지 들을게."',
    },
    {
      step: 4,
      title: '해결책 찾기',
      icon: '💡',
      description: '함께 해결 방법을 찾습니다',
      example: '"어떻게 하면 좋을까? 같이 생각해보자."',
    },
    {
      step: 5,
      title: '실행 & 점검',
      icon: '✅',
      description: '합의한 방법을 실행하고 결과를 확인합니다',
      example: '"약속대로 해보고 다시 이야기하자."',
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
        ⚡ 자녀와의 갈등 패턴
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님과 자녀의 갈등 예측 및 해결 방법
      </p>

      {/* 갈등 수준 */}
      <div className="glass rounded-2xl p-8 mb-8 bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/30">
        <div className="text-center mb-6">
          <span className="text-5xl mb-3 block">{grade.icon}</span>
          <p className="text-slate-400 text-sm mb-2">예상 갈등 빈도</p>
          <p className={`text-2xl font-bold mb-4 ${grade.color}`}>{grade.text}</p>
          <div className="flex items-baseline justify-center gap-2 mb-4">
            <span className="text-4xl font-bold gradient-text">{conflictLevel}</span>
            <span className="text-xl text-slate-400">/ 100</span>
          </div>
          <div className="h-3 bg-slate-700 rounded-full overflow-hidden max-w-md mx-auto">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-500 to-amber-500"
              initial={{ width: 0 }}
              whileInView={{ width: `${conflictLevel}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            />
          </div>
          <p className="text-slate-300 text-sm mt-4">
            {conflictLevel <= 35
              ? '대체로 원만한 관계를 유지할 것입니다'
              : conflictLevel <= 50
              ? '적절한 소통으로 갈등을 예방할 수 있습니다'
              : '갈등 관리에 더 많은 노력이 필요합니다'}
          </p>
        </div>
      </div>

      {/* 주요 갈등 패턴 */}
      <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
        <AlertTriangle className="w-6 h-6" />
        예상되는 갈등 패턴
      </h3>
      <div className="space-y-4 mb-8">
        {conflictPatterns.map((pattern, index) => (
          <motion.div
            key={index}
            className="glass rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-start gap-4 mb-4">
              <span className="text-4xl">{pattern.icon}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-bold text-white">{pattern.type}</h4>
                  <span className="text-sm text-orange-400 font-bold">{pattern.frequency}</span>
                </div>
                <p className="text-slate-300 text-sm mb-4">{pattern.description}</p>
                <div>
                  <p className="text-green-400 font-bold text-sm mb-2">✓ 해결 방법:</p>
                  <div className="grid md:grid-cols-2 gap-2">
                    {pattern.solutions.map((solution, i) => (
                      <div key={i} className="glass rounded-lg p-3">
                        <p className="text-slate-300 text-sm">• {solution}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 나이별 갈등 대처법 */}
      <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
        <Shield className="w-6 h-6" />
        나이별 갈등 대처 전략
      </h3>
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {ageSpecificStrategies.map((strategy, index) => (
          <motion.div
            key={index}
            className="glass rounded-xl p-5"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="text-center mb-4">
              <span className="text-4xl mb-2 block">{strategy.icon}</span>
              <p className="font-bold text-white">{strategy.age}</p>
            </div>
            <div className="mb-4">
              <p className="text-orange-400 text-sm font-bold mb-2">주요 갈등</p>
              <div className="space-y-1">
                {strategy.commonIssues.map((issue, i) => (
                  <p key={i} className="text-slate-400 text-xs">
                    • {issue}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <p className="text-blue-400 text-sm font-bold mb-2">대처 전략</p>
              <div className="space-y-1">
                {strategy.strategies.map((strat, i) => (
                  <p key={i} className="text-slate-300 text-xs">
                    ✓ {strat}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 갈등 해결 5단계 */}
      <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
        <Lightbulb className="w-6 h-6" />
        갈등 해결 5단계 프로세스
      </h3>
      <div className="space-y-3 mb-8">
        {resolutionSteps.map((step, index) => (
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
                  {step.step}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{step.icon}</span>
                  <h4 className="font-bold text-white">{step.title}</h4>
                </div>
                <p className="text-slate-300 text-sm mb-2">{step.description}</p>
                <p className="text-cyan-400 text-sm italic">예: {step.example}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 갈등 예방 수칙 */}
      <div className="glass rounded-2xl p-6 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/30">
        <div className="flex items-start gap-3">
          <Heart className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
          <div>
            <p className="text-blue-300 font-bold mb-3">💙 갈등 예방을 위한 일상 수칙</p>
            <ul className="text-slate-300 text-sm space-y-2 leading-relaxed">
              <li>• 매일 충분한 대화 시간을 가지세요 (10-30분)</li>
              <li>• 자녀의 말을 끝까지 경청하세요</li>
              <li>• 감정이 격할 때는 잠시 멈추고 진정하세요</li>
              <li>• 비난보다는 &apos;I-message&apos;로 표현하세요 (&quot;나는 ~해서 슬퍼&quot;)</li>
              <li>• 자녀를 다른 아이와 비교하지 마세요</li>
              <li>• 실수를 용서하고 배움의 기회로 삼으세요</li>
              <li>• 갈등 후에는 반드시 화해하고 포옹하세요</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
