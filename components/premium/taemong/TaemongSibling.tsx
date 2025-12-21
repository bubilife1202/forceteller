'use client';

import { motion } from 'framer-motion';
import { Users, Heart, AlertTriangle, Lightbulb, TrendingUp, Star } from 'lucide-react';
import { TaemongFormData } from '@/components/TaemongForm';

interface TaemongSiblingProps {
  formData: TaemongFormData;
}

export default function TaemongSibling({ formData }: TaemongSiblingProps) {
  // 형제자매와의 궁합 분석
  const analyzeSiblingCompatibility = () => {
    const content = formData.dreamContent.toLowerCase();

    // 성향 분석
    let personality = '';
    let compatibility = '';

    if (
      content.includes('용') ||
      content.includes('호랑이') ||
      content.includes('사자') ||
      content.includes('독수리')
    ) {
      personality = '리더형';
      compatibility =
        '강한 리더십을 가진 아이입니다. 형제자매 사이에서 주도적인 역할을 하려 합니다. 동생에게는 든든한 보호자가 되고, 형제자매에게는 경쟁 의식을 보일 수 있습니다.';
    } else if (
      content.includes('꽃') ||
      content.includes('나비') ||
      content.includes('새') ||
      content.includes('토끼')
    ) {
      personality = '온화형';
      compatibility =
        '부드럽고 온화한 성격입니다. 형제자매와 큰 마찰 없이 잘 지내며, 배려심이 많아 동생을 잘 챙기고 형제자매와 협력을 잘 합니다.';
    } else if (
      content.includes('뱀') ||
      content.includes('여우') ||
      content.includes('올빼미') ||
      content.includes('고양이')
    ) {
      personality = '지혜형';
      compatibility =
        '영리하고 관찰력이 뛰어난 아이입니다. 형제자매 간의 갈등을 현명하게 해결하며, 동생에게 좋은 조언자 역할을 할 것입니다.';
    } else if (
      content.includes('돼지') ||
      content.includes('소') ||
      content.includes('곰') ||
      content.includes('코끼리')
    ) {
      personality = '온순형';
      compatibility =
        '느긋하고 온순한 성격입니다. 형제자매와 안정적인 관계를 유지하며, 다툼이 적고 평화로운 관계를 만들어갑니다.';
    } else if (
      content.includes('원숭이') ||
      content.includes('다람쥐') ||
      content.includes('강아지')
    ) {
      personality = '활발형';
      compatibility =
        '활발하고 사교적인 아이입니다. 형제자매와 함께 노는 것을 좋아하며, 때로 장난이 심해 다툴 수 있지만 금방 화해합니다.';
    } else {
      personality = '균형형';
      compatibility =
        '균형잡힌 성격으로 형제자매와 좋은 관계를 유지할 것입니다. 상황에 따라 유연하게 대처하며 조화로운 관계를 만듭니다.';
    }

    return {
      personality,
      compatibility,
      score: 85,
    };
  };

  // 출생 순서별 특성
  const analyzeBirthOrderTraits = () => {
    const content = formData.dreamContent.toLowerCase();

    const traits = {
      firstborn: {
        strengths: [] as string[],
        challenges: [] as string[],
      },
      middle: {
        strengths: [] as string[],
        challenges: [] as string[],
      },
      youngest: {
        strengths: [] as string[],
        challenges: [] as string[],
      },
    };

    // 첫째로서의 특성
    if (
      content.includes('용') ||
      content.includes('호랑이') ||
      content.includes('왕') ||
      content.includes('해')
    ) {
      traits.firstborn.strengths = [
        '타고난 리더십으로 동생들을 잘 이끔',
        '책임감이 강하고 모범이 됨',
        '부모의 기대에 잘 부응함',
      ];
      traits.firstborn.challenges = [
        '완벽주의로 스트레스 받을 수 있음',
        '동생에 대한 질투심 관리 필요',
        '과도한 책임감에서 벗어나기',
      ];
    } else if (content.includes('꽃') || content.includes('나비') || content.includes('부드러운')) {
      traits.firstborn.strengths = [
        '온화하고 배려심 많은 첫째',
        '동생을 잘 돌보고 챙김',
        '평화로운 가정 분위기 조성',
      ];
      traits.firstborn.challenges = [
        '자신의 감정 표현 연습 필요',
        '때로는 자기 주장도 중요',
        '동생에게만 양보하지 않기',
      ];
    } else {
      traits.firstborn.strengths = [
        '균형잡힌 첫째 역할 수행',
        '동생들에게 좋은 본보기',
        '부모와 동생 사이 조율',
      ];
      traits.firstborn.challenges = [
        '첫째로서의 부담감 관리',
        '자신만의 시간 확보',
        '동생과의 경계 설정',
      ];
    }

    // 중간으로서의 특성
    traits.middle.strengths = [
      '뛰어난 중재 능력과 외교술',
      '독립적이고 자립심이 강함',
      '다양한 관점을 이해하는 능력',
    ];
    traits.middle.challenges = [
      '관심 받기 위한 노력 필요',
      '자신의 정체성 찾기',
      '형제자매 사이에서 균형 유지',
    ];

    // 막내로서의 특성
    if (content.includes('귀여운') || content.includes('작은') || content.includes('토끼')) {
      traits.youngest.strengths = [
        '사랑스럽고 애교가 많음',
        '형제자매에게 사랑받음',
        '자유로운 성격과 창의성',
      ];
      traits.youngest.challenges = [
        '독립심 기르기',
        '형제자매와 동등한 관계 맺기',
        '책임감 키우기',
      ];
    } else {
      traits.youngest.strengths = [
        '밝고 긍정적인 막내',
        '가족에게 활력을 줌',
        '사교적이고 적응력이 좋음',
      ];
      traits.youngest.challenges = [
        '스스로 결정하는 연습',
        '형제자매 의존에서 벗어나기',
        '자기 관리 능력 키우기',
      ];
    }

    return traits;
  };

  // 형제자매 관계 개선 조언
  const getRelationshipAdvice = () => {
    const content = formData.dreamContent.toLowerCase();

    const advice: Array<{
      category: string;
      icon: string;
      tips: string[];
    }> = [];

    // 갈등 예방
    const conflictPrevention: string[] = [
      '각자의 개인 공간과 소유물을 존중하게 합니다',
      '공평한 대우와 관심 배분을 실천합니다',
      '비교하지 않고 각자의 장점을 인정합니다',
    ];

    if (
      content.includes('싸우') ||
      content.includes('화') ||
      content.includes('호랑이') ||
      content.includes('용')
    ) {
      conflictPrevention.push('감정 표현 방법을 가르치고 평화롭게 소통하도록 유도합니다');
    } else {
      conflictPrevention.push('갈등 해결 방법을 함께 배워나갑니다');
    }

    advice.push({
      category: '갈등 예방',
      icon: '🛡️',
      tips: conflictPrevention,
    });

    // 유대감 강화
    advice.push({
      category: '유대감 강화',
      icon: '💕',
      tips: [
        '함께하는 가족 시간을 정기적으로 만듭니다',
        '형제자매 간 협력하는 활동을 장려합니다',
        '서로를 도울 수 있는 기회를 제공합니다',
        '형제자매의 특별한 관계를 강조합니다',
      ],
    });

    // 개별성 존중
    const individualityTips: string[] = [
      '각자의 흥미와 재능을 따로 발전시킵니다',
      '일대일 시간을 각 아이와 가집니다',
      '각자의 성격과 특성을 인정합니다',
    ];

    if (content.includes('다른') || content.includes('독특한') || content.includes('특별한')) {
      individualityTips.push('독특한 개성을 격려하고 존중합니다');
    } else {
      individualityTips.push('각자의 방식으로 성장하도록 지원합니다');
    }

    advice.push({
      category: '개별성 존중',
      icon: '🌟',
      tips: individualityTips,
    });

    // 소통 증진
    advice.push({
      category: '소통 증진',
      icon: '💬',
      tips: [
        '정기적인 가족 회의로 의견을 나눕니다',
        '감정을 표현하는 방법을 가르칩니다',
        '경청하는 태도를 본보기로 보여줍니다',
        '칭찬과 감사를 자주 표현하게 합니다',
      ],
    });

    return advice;
  };

  // 나이차별 맞춤 조언
  const getAgeDifferenceAdvice = () => {
    return {
      close: {
        title: '2-3살 차이 (가까운 나이)',
        icon: '👫',
        benefits: [
          '놀이 친구가 되어 함께 성장',
          '비슷한 관심사로 유대감 형성',
          '서로에게 배우고 자극받음',
        ],
        cautions: [
          '경쟁 의식이 강할 수 있음',
          '비교 받지 않도록 주의',
          '각자의 발달 속도 존중',
        ],
      },
      medium: {
        title: '4-6살 차이 (중간 나이)',
        icon: '👬',
        benefits: [
          '선배-후배 관계로 서로 배움',
          '갈등이 비교적 적음',
          '각자의 발달 단계 존중 가능',
        ],
        cautions: [
          '관심사 차이로 소원해질 수 있음',
          '큰 아이의 돌봄 부담 주의',
          '각자와의 개별 시간 필요',
        ],
      },
      far: {
        title: '7살 이상 차이 (먼 나이)',
        icon: '👨‍👦',
        benefits: [
          '부모 역할을 하며 책임감 발달',
          '갈등이 거의 없음',
          '서로 다른 역할로 조화',
        ],
        cautions: [
          '공통 활동 찾기가 어려울 수 있음',
          '큰 아이에게 과도한 책임 금지',
          '나이 차이를 고려한 소통',
        ],
      },
    };
  };

  // 부모 역할
  const getParentRole = () => {
    const content = formData.dreamContent.toLowerCase();

    const roles: string[] = [
      '모든 아이에게 공평한 사랑과 관심을 줍니다',
      '각 아이의 개성을 존중하고 비교하지 않습니다',
      '형제자매 간 긍정적인 상호작용을 격려합니다',
      '갈등 시 중재자가 아닌 조력자 역할을 합니다',
    ];

    if (
      content.includes('싸우') ||
      content.includes('화') ||
      content.includes('갈등')
    ) {
      roles.push('감정 조절 방법을 가르치고 평화로운 해결책을 제시합니다');
    }

    if (content.includes('사랑') || content.includes('따뜻한') || content.includes('포근한')) {
      roles.push('따뜻하고 안정적인 가정 환경을 만듭니다');
    }

    roles.push('형제자매 관계의 소중함을 일깨워줍니다');

    return roles;
  };

  const siblingInfo = analyzeSiblingCompatibility();
  const birthOrderTraits = analyzeBirthOrderTraits();
  const relationshipAdvice = getRelationshipAdvice();
  const ageDifferenceAdvice = getAgeDifferenceAdvice();
  const parentRole = getParentRole();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-10"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2
            className="text-2xl md:text-3xl font-bold text-white"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            형제자매 관계
          </h2>
          <p className="text-slate-400 text-sm">형제자매와의 궁합과 관계 형성</p>
        </div>
      </div>

      {/* 기본 궁합 */}
      <motion.div className="glass rounded-2xl p-6 mb-6" variants={itemVariants}>
        <div className="flex items-center gap-3 mb-4">
          <Heart className="w-8 h-8 text-rose-400" />
          <div>
            <h3 className="text-2xl font-bold text-white">형제자매 궁합</h3>
            <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold mt-1">
              {siblingInfo.personality}
            </div>
          </div>
        </div>
        <p className="text-slate-300 leading-relaxed mb-4">{siblingInfo.compatibility}</p>

        <div className="bg-slate-800/50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-400">전체 궁합도</span>
            <span className="text-rose-400 font-bold text-lg">{siblingInfo.score}%</span>
          </div>
          <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-rose-500 to-pink-500"
              initial={{ width: 0 }}
              whileInView={{ width: `${siblingInfo.score}%` }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
        </div>
      </motion.div>

      {/* 출생 순서별 특성 */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-6 h-6 text-yellow-400" />
          <h3 className="text-xl font-bold text-white">출생 순서별 특성</h3>
        </div>
        <div className="space-y-4 mb-6">
          <motion.div className="glass rounded-xl p-5" variants={itemVariants}>
            <h4 className="font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-2xl">👑</span>
              첫째로 태어난다면
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="text-emerald-400 font-semibold mb-2 text-sm">강점</div>
                <ul className="space-y-1">
                  {birthOrderTraits.firstborn.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2 text-slate-300 text-sm">
                      <span className="text-emerald-400 mt-0.5">+</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-orange-400 font-semibold mb-2 text-sm">주의할 점</div>
                <ul className="space-y-1">
                  {birthOrderTraits.firstborn.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-2 text-slate-300 text-sm">
                      <span className="text-orange-400 mt-0.5">!</span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div className="glass rounded-xl p-5" variants={itemVariants}>
            <h4 className="font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-2xl">🤝</span>
              중간으로 태어난다면
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="text-emerald-400 font-semibold mb-2 text-sm">강점</div>
                <ul className="space-y-1">
                  {birthOrderTraits.middle.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2 text-slate-300 text-sm">
                      <span className="text-emerald-400 mt-0.5">+</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-orange-400 font-semibold mb-2 text-sm">주의할 점</div>
                <ul className="space-y-1">
                  {birthOrderTraits.middle.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-2 text-slate-300 text-sm">
                      <span className="text-orange-400 mt-0.5">!</span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div className="glass rounded-xl p-5" variants={itemVariants}>
            <h4 className="font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-2xl">💝</span>
              막내로 태어난다면
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="text-emerald-400 font-semibold mb-2 text-sm">강점</div>
                <ul className="space-y-1">
                  {birthOrderTraits.youngest.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2 text-slate-300 text-sm">
                      <span className="text-emerald-400 mt-0.5">+</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-orange-400 font-semibold mb-2 text-sm">주의할 점</div>
                <ul className="space-y-1">
                  {birthOrderTraits.youngest.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-2 text-slate-300 text-sm">
                      <span className="text-orange-400 mt-0.5">!</span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* 관계 개선 조언 */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-6 h-6 text-yellow-400" />
          <h3 className="text-xl font-bold text-white">형제자매 관계 개선 조언</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {relationshipAdvice.map((advice, index) => (
            <motion.div
              key={advice.category}
              className="glass rounded-xl p-5"
              variants={itemVariants}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{advice.icon}</span>
                <h4 className="font-bold text-white">{advice.category}</h4>
              </div>
              <ul className="space-y-2">
                {advice.tips.map((tip, tipIndex) => (
                  <li key={tipIndex} className="flex items-start gap-2 text-slate-300 text-sm">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 나이차별 조언 */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-bold text-white">나이 차이별 특성</h3>
        </div>
        <div className="space-y-4 mb-6">
          {Object.values(ageDifferenceAdvice).map((advice, index) => (
            <motion.div
              key={advice.title}
              className="glass rounded-xl p-5"
              variants={itemVariants}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-3xl">{advice.icon}</span>
                <h4 className="font-bold text-white">{advice.title}</h4>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-blue-400 font-semibold mb-2 text-sm">장점</div>
                  <ul className="space-y-1">
                    {advice.benefits.map((benefit, bIndex) => (
                      <li key={bIndex} className="flex items-start gap-2 text-slate-300 text-sm">
                        <span className="text-blue-400">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-amber-400 font-semibold mb-2 text-sm">유의사항</div>
                  <ul className="space-y-1">
                    {advice.cautions.map((caution, cIndex) => (
                      <li key={cIndex} className="flex items-start gap-2 text-slate-300 text-sm">
                        <span className="text-amber-400">!</span>
                        <span>{caution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 부모의 역할 */}
      <motion.div className="glass rounded-2xl p-6 mb-6" variants={itemVariants}>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-bold text-white">부모의 역할</h3>
        </div>
        <div className="space-y-3">
          {parentRole.map((role, index) => (
            <div
              key={index}
              className="flex items-start gap-3 bg-slate-800/50 rounded-lg p-4"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-0.5">
                {index + 1}
              </div>
              <p className="text-slate-300 text-sm">{role}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 종합 조언 */}
      <motion.div
        className="p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl border border-orange-500/20"
        variants={itemVariants}
      >
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span className="text-2xl">👨‍👩‍👧‍👦</span>
          형제자매 관계 종합 조언
        </h3>
        <p className="text-slate-200 leading-relaxed mb-3">
          {formData.name}님은 형제자매와 {siblingInfo.personality} 관계를 형성할 것입니다.
          부모님의 공평한 사랑과 각 아이의 개성 존중, 그리고 긍정적인 상호작용 격려를 통해
          평생 든든한 지원자이자 친구가 되는 형제자매 관계를 만들어갈 수 있습니다.
        </p>
        <p className="text-slate-300 text-sm">
          💡 형제자매는 인생의 가장 오래된 친구입니다. 어릴 때 맺은 좋은 관계는
          평생의 자산이 되므로, 건강한 형제자매 관계 형성에 많은 관심을 기울여주세요.
        </p>
      </motion.div>
    </motion.div>
  );
}
