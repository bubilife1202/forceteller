'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Heart, Users, Home, HeartHandshake, MessageCircle, AlertCircle } from 'lucide-react';

interface EmotionRelationshipProps {
  result: SajuResult;
  name: string;
}

interface RelationshipStrategy {
  title: string;
  description: string;
  why: string;
}

export default function EmotionRelationship({ result, name }: EmotionRelationshipProps) {
  // 연인 관계 감정 패턴
  const analyzeLoverPattern = () => {
    const { 목, 화, 토, 금, 수 } = result.elements;
    const { 관성, 재성, 식상, 인성, 비겁 } = result.tenGodsCount;
    const dayElement = result.day.stem.element;
    const { yang, yin } = result.yinYangBalance;

    const pattern = {
      expressionStyle: '',
      strengths: [] as string[],
      challenges: [] as string[],
      needsInPartner: [] as string[],
      conflictStyle: '',
      intimacyLevel: 50,
      color: 'text-pink-400'
    };

    // 식상 - 표현력
    if (식상 >= 3) {
      pattern.expressionStyle = '직접적이고 솔직한 감정 표현';
      pattern.strengths.push('감정을 숨기지 않고 표현');
      pattern.strengths.push('대화로 문제 해결');
      pattern.challenges.push('때로 너무 직설적일 수 있음');
      pattern.intimacyLevel += 15;
    } else if (식상 === 0) {
      pattern.expressionStyle = '간접적이고 조심스러운 표현';
      pattern.challenges.push('마음을 드러내기 어려움');
      pattern.challenges.push('상대가 눈치채길 기대');
      pattern.needsInPartner.push('먼저 다가와주는 사람');
      pattern.intimacyLevel -= 10;
    }

    // 재성 - 현실성/소유욕
    if (재성 >= 3) {
      pattern.strengths.push('책임감 있고 현실적');
      pattern.strengths.push('파트너를 위해 노력');
      pattern.challenges.push('소유욕이 강할 수 있음');
      pattern.challenges.push('통제하려는 경향');
      pattern.needsInPartner.push('독립적이지만 충성스러운 사람');
    } else if (재성 === 0) {
      pattern.strengths.push('자유롭고 구속 없음');
      pattern.challenges.push('현실적 책임감 부족');
      pattern.challenges.push('헌신도가 낮을 수 있음');
      pattern.needsInPartner.push('자유를 존중하는 사람');
    }

    // 관성 - 원칙/규범
    if (관성 >= 3) {
      pattern.strengths.push('진지하고 책임감 있음');
      pattern.challenges.push('융통성이 부족할 수 있음');
      pattern.challenges.push('상대에게 높은 기준 요구');
      pattern.conflictStyle = '원칙과 규칙을 중시하며 해결';
    } else if (관성 === 0) {
      pattern.strengths.push('자유롭고 유연함');
      pattern.challenges.push('약속을 가볍게 여길 수 있음');
      pattern.conflictStyle = '즉흥적이고 감정적으로 해결';
    }

    // 인성 - 이해/소통
    if (인성 >= 3) {
      pattern.strengths.push('깊은 이해와 공감');
      pattern.strengths.push('지적인 대화 선호');
      pattern.challenges.push('생각이 많아 행동이 느림');
      pattern.needsInPartner.push('지적으로 대화할 수 있는 사람');
      pattern.intimacyLevel += 10;
    }

    // 비겁 - 자존심/독립성
    if (비겁 >= 3) {
      pattern.strengths.push('자신감 있고 당당함');
      pattern.challenges.push('자존심이 강함');
      pattern.challenges.push('먼저 사과하기 어려움');
      pattern.conflictStyle = '정면 대결하거나 회피';
    } else if (비겁 === 0) {
      pattern.strengths.push('겸손하고 배려심 있음');
      pattern.challenges.push('자신의 의견을 내세우기 어려움');
      pattern.needsInPartner.push('자신을 존중해주는 사람');
    }

    // 오행별 특성
    if (화 >= 3) {
      pattern.strengths.push('열정적이고 따뜻함');
      pattern.challenges.push('감정 기복이 클 수 있음');
      pattern.intimacyLevel += 10;
    }

    if (수 >= 3) {
      pattern.strengths.push('섬세하고 로맨틱');
      pattern.challenges.push('불안정하거나 의존적');
    }

    if (토 >= 2) {
      pattern.strengths.push('안정적이고 믿음직함');
      pattern.intimacyLevel += 5;
    }

    if (금 >= 3) {
      pattern.challenges.push('완벽주의적 기준');
      pattern.challenges.push('비판적일 수 있음');
    }

    // 음양 균형
    const yinYangRatio = Math.min(yang, yin) / Math.max(yang, yin);
    if (yinYangRatio > 0.6) {
      pattern.strengths.push('균형 잡힌 에너지');
    }

    pattern.intimacyLevel = Math.min(Math.max(pattern.intimacyLevel, 0), 100);

    return pattern;
  };

  // 가족 관계 감정 패턴
  const analyzeFamilyPattern = () => {
    const { 목, 화, 토, 금, 수 } = result.elements;
    const { 관성, 재성, 식상, 인성, 비겁 } = result.tenGodsCount;

    const pattern = {
      parentRelation: [] as string[],
      siblingRelation: [] as string[],
      role: '',
      emotionalBond: 50,
      boundaries: '',
      tips: [] as string[]
    };

    // 인성 - 부모 관계
    if (인성 >= 3) {
      pattern.parentRelation.push('부모의 영향을 많이 받음');
      pattern.parentRelation.push('부모의 기대에 민감');
      pattern.emotionalBond += 15;
      pattern.boundaries = '독립성을 기르는 것이 중요';
    } else if (인성 === 0) {
      pattern.parentRelation.push('부모와 거리감이 있을 수 있음');
      pattern.parentRelation.push('독립적이고 자율적');
      pattern.tips.push('가끔은 부모에게 연락하고 감사 표현하기');
    }

    // 비겁 - 형제 관계
    if (비겁 >= 3) {
      pattern.siblingRelation.push('경쟁적이거나 비교의식');
      pattern.siblingRelation.push('자신의 위치에 민감');
      pattern.tips.push('협력과 공감의 관계로 전환하기');
    } else if (비겁 === 0) {
      pattern.siblingRelation.push('형제와의 유대감이 약할 수 있음');
      pattern.siblingRelation.push('혼자 있기를 선호');
      pattern.emotionalBond -= 10;
    }

    // 관성 - 가족 내 역할
    if (관성 >= 2) {
      pattern.role = '책임감 있는 역할 (장남/장녀 같은 느낌)';
      pattern.emotionalBond += 10;
    } else {
      pattern.role = '자유로운 역할 (막내 같은 느낌)';
    }

    // 토 - 가족 중심성
    if (토 >= 2) {
      pattern.emotionalBond += 15;
      pattern.tips.push('가족이 큰 안정의 원천이 됨');
    }

    // 식상 - 가족 소통
    if (식상 >= 2) {
      pattern.tips.push('가족과 솔직한 대화로 관계 개선');
    } else if (식상 === 0) {
      pattern.tips.push('마음을 표현하는 연습 필요');
    }

    pattern.emotionalBond = Math.min(Math.max(pattern.emotionalBond, 0), 100);

    return pattern;
  };

  // 친구 관계 감정 패턴
  const analyzeFriendPattern = () => {
    const { 목, 화, 토, 금, 수 } = result.elements;
    const { 관성, 재성, 식상, 인성, 비겁 } = result.tenGodsCount;

    const pattern = {
      friendshipStyle: '',
      preferredType: [] as string[],
      socialEnergy: 50,
      loyaltyLevel: 50,
      conflictHandling: '',
      strengths: [] as string[],
      challenges: [] as string[]
    };

    // 비겁 - 사회성
    if (비겁 >= 3) {
      pattern.friendshipStyle = '동등한 친구, 경쟁적 관계 선호';
      pattern.socialEnergy += 15;
      pattern.preferredType.push('나와 비슷한 수준의 친구');
      pattern.challenges.push('질투나 경쟁심이 생길 수 있음');
    } else if (비겁 === 0) {
      pattern.friendshipStyle = '조용하고 깊은 우정 선호';
      pattern.socialEnergy -= 15;
      pattern.preferredType.push('나를 이해해주는 소수의 친구');
    }

    // 식상 - 표현과 소통
    if (식상 >= 3) {
      pattern.strengths.push('재미있고 유머러스함');
      pattern.strengths.push('친구들과 잘 어울림');
      pattern.socialEnergy += 15;
    } else if (식상 === 0) {
      pattern.challenges.push('먼저 다가가기 어려움');
      pattern.challenges.push('감정 표현이 서툼');
      pattern.socialEnergy -= 10;
    }

    // 인성 - 깊이
    if (인성 >= 2) {
      pattern.preferredType.push('지적이고 깊은 대화가 가능한 친구');
      pattern.loyaltyLevel += 15;
      pattern.strengths.push('좋은 조언자');
    }

    // 재성 - 실용성
    if (재성 >= 2) {
      pattern.strengths.push('실질적인 도움을 줌');
      pattern.loyaltyLevel += 10;
    }

    // 화 - 열정
    if (화 >= 3) {
      pattern.strengths.push('에너지 넘치고 활기참');
      pattern.socialEnergy += 10;
    }

    // 수 - 감수성
    if (수 >= 3) {
      pattern.strengths.push('공감 능력이 뛰어남');
      pattern.challenges.push('상처받기 쉬움');
    }

    // 토 - 충성심
    if (토 >= 2) {
      pattern.loyaltyLevel += 15;
      pattern.strengths.push('믿음직하고 의리 있음');
    }

    // 갈등 처리
    if (식상 >= 2) {
      pattern.conflictHandling = '대화로 풀려고 노력';
    } else if (비겁 >= 3) {
      pattern.conflictHandling = '정면으로 맞서거나 거리 둠';
    } else {
      pattern.conflictHandling = '회피하거나 참는 편';
    }

    pattern.socialEnergy = Math.min(Math.max(pattern.socialEnergy, 0), 100);
    pattern.loyaltyLevel = Math.min(Math.max(pattern.loyaltyLevel, 0), 100);

    return pattern;
  };

  // 관계별 개선 전략
  const getImprovementStrategies = () => {
    const { 목, 화, 토, 금, 수 } = result.elements;
    const { 식상, 인성, 비겁 } = result.tenGodsCount;

    const strategies = {
      lover: [] as RelationshipStrategy[],
      family: [] as RelationshipStrategy[],
      friend: [] as RelationshipStrategy[]
    };

    // 연인 관계 개선
    strategies.lover = [
      {
        title: '일일 감정 체크인',
        description: '매일 10분, 서로의 하루와 감정 공유하기',
        why: '일상적 소통이 친밀감의 기초'
      },
      {
        title: '감사 표현',
        description: '작은 것이라도 매일 한 가지씩 감사 전하기',
        why: '긍정적 관계의 핵심은 인정과 감사'
      },
      {
        title: '퀄리티 타임',
        description: '주 1회 이상, 둘만의 의미 있는 시간 갖기',
        why: '바쁜 일상 속에서도 관계에 투자 필요'
      }
    ];

    if (식상 === 0) {
      strategies.lover.push({
        title: '감정 언어 연습',
        description: '"나는 ~하게 느껴" 형식으로 감정 표현 연습',
        why: '표현이 서툴다면 구조화된 방법으로'
      });
    }

    if (비겁 >= 3) {
      strategies.lover.push({
        title: '자존심 내려놓기',
        description: '갈등 시 먼저 미안하다고 말하기 연습',
        why: '관계에서는 누가 이기는가보다 둘이 이기는 것이 중요'
      });
    }

    // 가족 관계 개선
    strategies.family = [
      {
        title: '정기적 연락',
        description: '주 1회 이상 전화나 만남으로 안부 전하기',
        why: '관계는 관심과 시간 투자가 필요'
      },
      {
        title: '감사 표현',
        description: '부모님께 구체적인 감사 표현하기',
        why: '당연하게 여긴 것들을 인정하기'
      },
      {
        title: '경계선 설정',
        description: '사랑하되 건강한 거리 유지하기',
        why: '과도한 밀착이나 거리 모두 건강하지 않음'
      }
    ];

    if (인성 >= 3) {
      strategies.family.push({
        title: '기대 내려놓기',
        description: '부모의 기대에서 벗어나 나의 삶 살기',
        why: '부모의 사랑과 기대를 분리하기'
      });
    }

    // 친구 관계 개선
    strategies.friend = [
      {
        title: '먼저 연락하기',
        description: '생각날 때 바로 안부 메시지 보내기',
        why: '관계는 먼저 다가가는 사람이 만듦'
      },
      {
        title: '경청하기',
        description: '친구 이야기에 온전히 집중하기',
        why: '진정한 친구는 들어주는 사람'
      },
      {
        title: '함께 성장',
        description: '서로의 목표를 응원하고 지지하기',
        why: '좋은 우정은 서로를 더 나은 사람으로 만듦'
      }
    ];

    if (식상 === 0) {
      strategies.friend.push({
        title: '용기내어 표현',
        description: '고마움, 미안함을 말로 전하기',
        why: '표현하지 않으면 상대는 모름'
      });
    }

    return strategies;
  };

  // 건강한 관계의 신호
  const getHealthyRelationshipSigns = () => {
    return {
      green: [
        '서로를 있는 그대로 존중함',
        '개인의 시간과 공간을 존중함',
        '의견이 달라도 경청하고 이해하려 노력',
        '실수를 용서하고 배우는 기회로 삼음',
        '서로의 성장을 응원하고 지지함',
        '솔직하게 감정과 생각을 표현함',
        '갈등을 건설적으로 해결함',
        '함께 있을 때 편안하고 안전함'
      ],
      red: [
        '상대를 통제하거나 조종하려 함',
        '끊임없이 비판하거나 무시함',
        '감정적으로 학대하거나 폭력적',
        '거짓말이나 배신이 반복됨',
        '일방적으로 희생만 요구함',
        '개인의 경계를 무시함',
        '불안하고 긴장된 관계',
        '상대 앞에서 진정한 나를 숨김'
      ]
    };
  };

  const loverPattern = analyzeLoverPattern();
  const familyPattern = analyzeFamilyPattern();
  const friendPattern = analyzeFriendPattern();
  const improvementStrategies = getImprovementStrategies();
  const relationshipSigns = getHealthyRelationshipSigns();

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold mb-8 gradient-text flex items-center gap-3">
        <Heart className="w-8 h-8 text-pink-400" />
        관계 속 감정 패턴
      </h2>

      {/* 연인 관계 */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-pink-400 mb-5 flex items-center gap-2">
          <Heart className="w-6 h-6" />
          연인 관계 패턴
        </h3>
        <motion.div
          className="glass rounded-2xl p-6"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="text-sm text-slate-400 mb-2">표현 스타일</div>
              <div className="text-lg font-bold text-pink-400">{loverPattern.expressionStyle}</div>
            </div>
            <div>
              <div className="text-sm text-slate-400 mb-2">친밀도 지수</div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-3 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-pink-400 to-rose-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${loverPattern.intimacyLevel}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <span className="text-lg font-bold text-pink-400">{loverPattern.intimacyLevel}</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-slate-800/50 rounded-xl p-4">
              <div className="text-sm font-semibold text-emerald-400 mb-3">💚 강점:</div>
              <div className="space-y-2">
                {loverPattern.strengths.map((strength, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-emerald-400 mt-0.5">✓</span>
                    {strength}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4">
              <div className="text-sm font-semibold text-orange-400 mb-3">⚠️ 주의점:</div>
              <div className="space-y-2">
                {loverPattern.challenges.map((challenge, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-orange-400 mt-0.5">•</span>
                    {challenge}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {loverPattern.needsInPartner.length > 0 && (
            <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-xl p-4 border border-pink-500/20">
              <div className="text-sm font-semibold text-pink-400 mb-2">💝 이상적인 파트너:</div>
              <div className="space-y-1">
                {loverPattern.needsInPartner.map((need, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-pink-400 mt-0.5">→</span>
                    {need}
                  </div>
                ))}
              </div>
            </div>
          )}

          {loverPattern.conflictStyle && (
            <div className="mt-4 bg-slate-800/50 rounded-xl p-4">
              <span className="text-cyan-400 font-semibold text-sm">갈등 해결 스타일:</span>
              <span className="text-slate-300 ml-2 text-sm">{loverPattern.conflictStyle}</span>
            </div>
          )}
        </motion.div>
      </div>

      {/* 가족 관계 */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-blue-400 mb-5 flex items-center gap-2">
          <Home className="w-6 h-6" />
          가족 관계 패턴
        </h3>
        <motion.div
          className="glass rounded-2xl p-6"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="text-sm text-slate-400 mb-2">가족 내 역할</div>
              <div className="text-lg font-bold text-cyan-400">{familyPattern.role}</div>
            </div>
            <div>
              <div className="text-sm text-slate-400 mb-2">정서적 유대감</div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-3 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-400 to-cyan-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${familyPattern.emotionalBond}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
                <span className="text-lg font-bold text-cyan-400">{familyPattern.emotionalBond}</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-slate-800/50 rounded-xl p-4">
              <div className="text-sm font-semibold text-purple-400 mb-3">👨‍👩‍👧 부모 관계:</div>
              <div className="space-y-2">
                {familyPattern.parentRelation.map((relation, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-purple-400 mt-0.5">•</span>
                    {relation}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4">
              <div className="text-sm font-semibold text-green-400 mb-3">👫 형제자매 관계:</div>
              <div className="space-y-2">
                {familyPattern.siblingRelation.map((relation, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-green-400 mt-0.5">•</span>
                    {relation}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {familyPattern.boundaries && (
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl p-4 border border-blue-500/20 mb-4">
              <span className="text-blue-400 font-semibold text-sm">경계선:</span>
              <span className="text-slate-300 ml-2 text-sm">{familyPattern.boundaries}</span>
            </div>
          )}

          {familyPattern.tips.length > 0 && (
            <div className="bg-slate-800/50 rounded-xl p-4">
              <div className="text-sm font-semibold text-cyan-400 mb-2">💡 개선 팁:</div>
              <div className="space-y-1">
                {familyPattern.tips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-cyan-400 mt-0.5">→</span>
                    {tip}
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* 친구 관계 */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-green-400 mb-5 flex items-center gap-2">
          <Users className="w-6 h-6" />
          친구 관계 패턴
        </h3>
        <motion.div
          className="glass rounded-2xl p-6"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <div className="text-sm text-slate-400 mb-2">우정 스타일</div>
              <div className="text-sm font-bold text-green-400">{friendPattern.friendshipStyle}</div>
            </div>
            <div>
              <div className="text-sm text-slate-400 mb-2">사회적 에너지</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-3 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${friendPattern.socialEnergy}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
                <span className="text-sm font-bold text-green-400">{friendPattern.socialEnergy}</span>
              </div>
            </div>
            <div>
              <div className="text-sm text-slate-400 mb-2">충성도</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-3 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${friendPattern.loyaltyLevel}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4 }}
                  />
                </div>
                <span className="text-sm font-bold text-yellow-400">{friendPattern.loyaltyLevel}</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-slate-800/50 rounded-xl p-4">
              <div className="text-sm font-semibold text-emerald-400 mb-3">✨ 강점:</div>
              <div className="space-y-2">
                {friendPattern.strengths.map((strength, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-emerald-400 mt-0.5">✓</span>
                    {strength}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4">
              <div className="text-sm font-semibold text-orange-400 mb-3">⚠️ 주의점:</div>
              <div className="space-y-2">
                {friendPattern.challenges.map((challenge, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-orange-400 mt-0.5">•</span>
                    {challenge}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-500/20 mb-4">
            <div className="text-sm font-semibold text-green-400 mb-2">🎯 선호하는 친구 유형:</div>
            <div className="space-y-1">
              {friendPattern.preferredType.map((type, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-green-400 mt-0.5">→</span>
                  {type}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-4">
            <span className="text-cyan-400 font-semibold text-sm">갈등 처리:</span>
            <span className="text-slate-300 ml-2 text-sm">{friendPattern.conflictHandling}</span>
          </div>
        </motion.div>
      </div>

      {/* 관계 개선 전략 */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-purple-400 mb-5 flex items-center gap-2">
          <HeartHandshake className="w-6 h-6" />
          관계 개선 전략
        </h3>
        <div className="space-y-6">
          {Object.entries(improvementStrategies).map(([key, strategies], index) => {
            const titles = { lover: '💑 연인 관계', family: '👨‍👩‍👧 가족 관계', friend: '👥 친구 관계' };
            const colors = { lover: 'text-pink-400', family: 'text-blue-400', friend: 'text-green-400' };
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h4 className={`font-bold mb-3 ${colors[key as keyof typeof colors]}`}>
                  {titles[key as keyof typeof titles]}
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {strategies.map((strategy: RelationshipStrategy, idx: number) => (
                    <div key={idx} className="glass rounded-xl p-4">
                      <div className="font-bold text-cyan-400 mb-2">{strategy.title}</div>
                      <p className="text-sm text-slate-300 mb-2">{strategy.description}</p>
                      <div className="bg-slate-800/50 rounded-lg p-2">
                        <span className="text-emerald-400 font-semibold text-xs">왜?</span>
                        <span className="text-slate-400 ml-2 text-xs">{strategy.why}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 건강한 관계 체크리스트 */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-cyan-400 mb-5 flex items-center gap-2">
          <MessageCircle className="w-6 h-6" />
          건강한 관계 vs 독성 관계
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <motion.div
            className="glass rounded-2xl p-6 border border-green-500/20"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold text-green-400 mb-4 flex items-center gap-2">
              ✅ 건강한 관계의 신호
            </h4>
            <div className="space-y-2">
              {relationshipSigns.green.map((sign, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>
                  <span>{sign}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="glass rounded-2xl p-6 border border-red-500/20"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold text-red-400 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              독성 관계의 경고 신호
            </h4>
            <div className="space-y-2">
              {relationshipSigns.red.map((sign, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
                  <span>{sign}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* 관계 성찰 질문 */}
      <motion.div
        className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <h4 className="font-bold text-purple-400 mb-4">🤔 관계 성찰 질문</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-300">
          <div className="space-y-2">
            <p>• 이 관계에서 나는 진정한 나 자신일 수 있는가?</p>
            <p>• 이 사람과 있을 때 에너지를 얻는가, 잃는가?</p>
            <p>• 서로의 성장을 응원하고 있는가?</p>
            <p>• 실수했을 때 용서받을 수 있다고 느끼는가?</p>
          </div>
          <div className="space-y-2">
            <p>• 내 감정과 의견을 자유롭게 말할 수 있는가?</p>
            <p>• 경계선이 존중되고 있는가?</p>
            <p>• 이 관계가 나를 더 나은 사람으로 만드는가?</p>
            <p>• 1년 후에도 이 사람과 함께하고 싶은가?</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-purple-500/20 text-xs text-slate-400">
          💡 이 질문들에 대부분 &quot;아니오&quot;라면, 그 관계를 다시 생각해볼 시점입니다.
        </div>
      </motion.div>
    </motion.div>
  );
}
