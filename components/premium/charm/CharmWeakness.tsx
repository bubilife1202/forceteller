'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { AlertTriangle, TrendingDown, Wrench, Target, CheckCircle, Zap } from 'lucide-react';

interface CharmWeaknessProps {
  result: SajuResult;
  name: string;
  gender: 'male' | 'female';
}

export default function CharmWeakness({ result, name, gender }: CharmWeaknessProps) {
  const dayElement = result.day.stem.element;
  const { 식상, 재성, 관성, 인성, 비겁 } = result.tenGodsCount;

  // 매력 약점 분석
  const getCharmWeaknesses = () => {
    const weaknesses: { [key: string]: {
      primary: string;
      manifestations: string[];
      impact: string;
      root: string;
    } } = {
      목: {
        primary: '자기주장의 부족',
        manifestations: [
          '타인의 의견을 우선시하고 자신의 욕구를 뒤로 미룸',
          '거절하지 못해 불필요한 일까지 떠맡게 됨',
          '자신의 가치를 제대로 어필하지 못함',
          '관계에서 항상 주는 쪽이 되어 소진됨'
        ],
        impact: '사람들이 당신의 진짜 가치를 모르거나, 당연하게 여기게 됩니다. 매력이 있어도 주목받지 못하고, 때로는 이용당하기도 합니다.',
        root: '타인을 배려하는 본성이 강해서, 자신을 드러내는 것을 이기적이라고 생각하는 경향이 있습니다.',
      },
      화: {
        primary: '감정 기복과 일관성 부족',
        manifestations: [
          '기분에 따라 태도가 달라져 예측 불가능해 보임',
          '열정이 식으면 급격하게 관심이 사라짐',
          '즉흥적인 결정으로 신뢰도가 떨어질 수 있음',
          '처음의 에너지를 끝까지 유지하지 못함'
        ],
        impact: '처음에는 매력적으로 보이지만, 시간이 지나면서 신뢰를 잃을 수 있습니다. 깊은 관계로 발전하기 어려워집니다.',
        root: '감정을 솔직하게 표현하는 것은 장점이지만, 조절되지 않은 감정은 관계에 혼란을 줄 수 있습니다.',
      },
      토: {
        primary: '변화와 표현의 부족',
        manifestations: [
          '항상 같은 패턴으로 행동해서 지루하게 느껴질 수 있음',
          '새로운 것에 도전하지 않아 발전이 없어 보임',
          '감정이나 생각을 표현하지 않아 무관심해 보임',
          '안정만 추구하다 관계가 정체됨'
        ],
        impact: '편안하지만 설렘이 없어집니다. 오래 함께 있으면 당연하게 여겨져서, 특별함을 잃을 수 있습니다.',
        root: '안정을 중시하는 성향이 변화를 두려워하게 만들고, 현상 유지에 안주하게 합니다.',
      },
      금: {
        primary: '완벽주의와 거리감',
        manifestations: [
          '너무 높은 기준으로 사람들을 평가하고 비판적으로 보임',
          '실수를 용납하지 못해 경직된 분위기를 만듦',
          '감정적 교류가 부족해 차갑게 느껴짐',
          '약점을 보이지 않으려 해서 진정한 친밀감이 형성되지 않음'
        ],
        impact: '존경은 받지만 사랑받기는 어렵습니다. 사람들이 당신 곁에서 긴장하고 불편해합니다.',
        root: '자신과 타인에 대한 높은 기준이 있으며, 불완전함을 약점으로 받아들입니다.',
      },
      수: {
        primary: '소통 부족과 이해 난이도',
        manifestations: [
          '자신의 생각을 명확하게 전달하지 못함',
          '너무 깊고 복잡해서 사람들이 이해하기 어려움',
          '혼자만의 세계에 갇혀 타인과 연결되지 못함',
          '감정 표현이 서툴러서 냉담해 보임'
        ],
        impact: '흥미롭지만 어렵고 멀게 느껴집니다. 관계를 시작하기도, 유지하기도 힘들어집니다.',
        root: '내면의 세계가 풍부하지만, 그것을 외부로 표현하는 방법을 잘 모릅니다.',
      },
    };
    return weaknesses[dayElement] || weaknesses.목;
  };

  // 사주로 본 추가 약점
  const getAdditionalWeaknesses = () => {
    const weaknesses = [];

    if (식상 >= 3) {
      weaknesses.push({
        weakness: '과도한 자기표현',
        problem: '말이 너무 많거나 자기 이야기만 해서 상대방이 지칠 수 있습니다',
        solution: '듣는 것과 말하는 것의 균형을 맞추세요. 상대방의 이야기에도 충분한 시간을 주세요',
      });
    } else if (식상 === 0) {
      weaknesses.push({
        weakness: '표현력 부족',
        problem: '생각이나 감정을 표현하지 못해 오해를 살 수 있습니다',
        solution: '작은 것부터 표현하는 연습을 하세요. 완벽한 표현이 아니어도 괜찮습니다',
      });
    }

    if (재성 >= 3) {
      weaknesses.push({
        weakness: '실용성만 중시',
        problem: '모든 것을 손익으로 계산해서 냉정하고 계산적으로 보일 수 있습니다',
        solution: '때로는 효율을 내려놓고, 감정적 가치도 인정하세요. 무의미해 보이는 순간에도 의미가 있습니다',
      });
    }

    if (관성 >= 3) {
      weaknesses.push({
        weakness: '지나친 통제욕',
        problem: '모든 것을 통제하려 하고 원칙만 고집해서 답답하게 느껴질 수 있습니다',
        solution: '때로는 융통성을 발휘하세요. 모든 상황에 원칙을 적용할 필요는 없습니다',
      });
    }

    if (인성 >= 3) {
      weaknesses.push({
        weakness: '과도한 사색',
        problem: '생각만 하고 행동하지 않아 답답하거나, 현실과 동떨어진 것처럼 보입니다',
        solution: '작은 것부터 실행해보세요. 완벽한 계획이 아니어도 시작하는 것이 중요합니다',
      });
    }

    if (비겁 >= 3) {
      weaknesses.push({
        weakness: '우유부단함',
        problem: '주변 의견을 너무 많이 들어서 결정을 내리지 못하거나, 자주 마음이 바뀝니다',
        solution: '자신의 직관을 믿으세요. 모든 사람을 만족시킬 수는 없습니다',
      });
    }

    return weaknesses.slice(0, 2);
  };

  // 보완 방법 (단계별)
  const getImprovementSteps = () => {
    const steps: { [key: string]: {
      phase: string;
      actions: string[];
    }[] } = {
      목: [
        {
          phase: '1단계: 자기 인식',
          actions: [
            '자신의 욕구와 감정을 일기로 기록하세요',
            '무엇을 원하는지, 무엇이 불편한지 명확히 파악하세요',
            '작은 것부터 자신의 의견을 말해보세요',
          ],
        },
        {
          phase: '2단계: 경계 설정',
          actions: [
            '"아니오"라고 말하는 연습을 하세요 - 거절도 배려의 한 형태입니다',
            '자신의 시간과 에너지의 우선순위를 정하세요',
            '모든 요청을 들어줄 필요가 없음을 인정하세요',
          ],
        },
        {
          phase: '3단계: 자기 주장',
          actions: [
            '중요한 상황에서 확고하게 의견을 제시하세요',
            '자신의 성취와 가치를 당당하게 표현하세요',
            '배려심은 유지하되, 자기희생은 줄이세요',
          ],
        },
      ],
      화: [
        {
          phase: '1단계: 감정 인식',
          actions: [
            '감정이 일어날 때 즉시 반응하지 말고 잠시 멈추세요',
            '왜 이런 감정이 드는지 스스로에게 물어보세요',
            '감정 일기를 써서 패턴을 파악하세요',
          ],
        },
        {
          phase: '2단계: 감정 조절',
          actions: [
            '중요한 결정은 감정이 가라앉은 후에 하세요',
            '심호흡이나 명상으로 흥분을 진정시키는 방법을 배우세요',
            '10을 세고 난 뒤에 반응하는 습관을 들이세요',
          ],
        },
        {
          phase: '3단계: 일관성 유지',
          actions: [
            '약속한 것은 기분과 상관없이 지키려 노력하세요',
            '장기적 목표를 설정하고 꾸준히 추구하세요',
            '열정과 책임감의 균형을 찾으세요',
          ],
        },
      ],
      토: [
        {
          phase: '1단계: 변화 수용',
          actions: [
            '작은 변화부터 시도해보세요 - 새로운 길로 출근하기, 다른 메뉴 주문하기',
            '변화가 꼭 나쁜 것은 아님을 경험으로 확인하세요',
            '안전지대를 조금씩 넓혀가세요',
          ],
        },
        {
          phase: '2단계: 표현 연습',
          actions: [
            '하루에 한 번은 자신의 생각이나 감정을 표현하세요',
            '칭찬, 감사, 애정 등을 말로 전달하세요',
            '당연한 것도 표현할 때 특별해집니다',
          ],
        },
        {
          phase: '3단계: 능동적 변화',
          actions: [
            '새로운 취미나 활동에 도전하세요',
            '관계에 새로운 시도를 해보세요 - 깜짝 선물, 색다른 데이트',
            '안정과 변화의 균형을 찾으세요',
          ],
        },
      ],
      금: [
        {
          phase: '1단계: 완벽주의 인식',
          actions: [
            '완벽을 추구하는 자신을 관찰하세요',
            '왜 완벽해야 한다고 생각하는지 근본 원인을 탐구하세요',
            '불완전함도 아름다울 수 있음을 인정하세요',
          ],
        },
        {
          phase: '2단계: 수용과 공감',
          actions: [
            '타인의 실수를 비판하기 전에 이해하려 노력하세요',
            '자신의 실수도 솔직하게 인정하고 공유하세요',
            '공감과 따뜻함을 표현하는 연습을 하세요',
          ],
        },
        {
          phase: '3단계: 친밀감 형성',
          actions: [
            '선택된 사람들에게는 마음을 열어보세요',
            '약점을 보이는 것도 용기임을 기억하세요',
            '품격은 유지하되, 인간적인 면도 보여주세요',
          ],
        },
      ],
      수: [
        {
          phase: '1단계: 소통 기초',
          actions: [
            '복잡한 생각을 간단하게 정리하는 연습을 하세요',
            '상대방의 이해 수준에 맞춰 설명하세요',
            '전문 용어나 추상적 개념을 구체적 예시로 바꾸세요',
          ],
        },
        {
          phase: '2단계: 감정 표현',
          actions: [
            '감정을 인지하고 이름 붙이는 연습을 하세요',
            '느낌을 말로 표현하는 것을 연습하세요',
            '완벽한 표현이 아니어도 시도하는 것이 중요합니다',
          ],
        },
        {
          phase: '3단계: 관계 맺기',
          actions: [
            '혼자만의 시간과 사람들과의 시간을 균형있게 가지세요',
            '깊이는 유지하되, 접근성도 높이세요',
            '자신을 조금씩 열어가는 용기를 내세요',
          ],
        },
      ],
    };
    return steps[dayElement] || steps.목;
  };

  // 즉시 실천 가능한 팁
  const getActionableTips = () => {
    return [
      {
        category: '일상 속 실천',
        tips: [
          '매일 아침 거울을 보며 긍정적인 말을 자신에게 해주세요',
          '하루 한 가지씩 새로운 시도를 하세요',
          '감정이 일어날 때 이름을 붙여보세요 (화남, 기쁨, 불안 등)',
          '타인과 대화할 때 경청에 집중하세요',
        ],
      },
      {
        category: '관계에서 실천',
        tips: [
          '진심 어린 칭찬을 하루 한 번씩 전하세요',
          '자신의 약점이나 실수를 솔직하게 인정하세요',
          '상대방의 입장에서 생각해보는 시간을 가지세요',
          '감사의 마음을 말과 행동으로 표현하세요',
        ],
      },
      {
        category: '자기 관리',
        tips: [
          '일주일에 한 번은 자신을 돌아보는 시간을 가지세요',
          '장점 노트를 만들어 좋은 피드백을 기록하세요',
          '실패를 배움의 기회로 재해석하세요',
          '자기계발서나 심리학 책을 읽어보세요',
        ],
      },
    ];
  };

  const weaknesses = getCharmWeaknesses();
  const additionalWeaknesses = getAdditionalWeaknesses();
  const improvementSteps = getImprovementSteps();
  const actionableTips = getActionableTips();

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-10"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-8">
        <h2
          className="text-3xl md:text-4xl font-bold gradient-text mb-3"
          style={{ fontFamily: "'Noto Serif KR', serif" }}
        >
          매력 약점 & 보완법
        </h2>
        <p className="text-slate-300">
          {name}님의 매력을 가리는 요인과 개선 방법
        </p>
      </div>

      {/* Primary Weakness */}
      <motion.div
        className="glass rounded-2xl p-6 mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20">
            <AlertTriangle className="w-6 h-6 text-red-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-red-400 mb-2">주요 매력 약점</h3>
            <h4 className="text-2xl font-bold text-white mb-4">{weaknesses.primary}</h4>

            <div className="space-y-2 mb-4">
              {weaknesses.manifestations.map((manifestation, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                >
                  <TrendingDown className="w-4 h-4 text-red-400 flex-shrink-0 mt-1" />
                  <p className="text-red-200 text-sm">{manifestation}</p>
                </motion.div>
              ))}
            </div>

            <div className="p-4 rounded-lg bg-slate-800/50 mb-3">
              <p className="text-slate-200 text-sm mb-1">
                <span className="font-semibold text-orange-400">📉 영향</span>
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">
                {weaknesses.impact}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border border-amber-500/20">
              <p className="text-slate-200 text-sm mb-1">
                <span className="font-semibold text-amber-400">🔍 근본 원인</span>
              </p>
              <p className="text-amber-200 text-sm">
                {weaknesses.root}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Additional Weaknesses */}
      {additionalWeaknesses.length > 0 && (
        <motion.div
          className="glass rounded-2xl p-6 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20">
              <TrendingDown className="w-6 h-6 text-orange-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-orange-400 mb-4">추가 보완 사항</h3>

              <div className="space-y-4">
                {additionalWeaknesses.map((weakness, idx) => (
                  <motion.div
                    key={idx}
                    className="p-5 rounded-lg bg-slate-800/50 border border-orange-500/20"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                  >
                    <h4 className="font-bold text-white mb-2">
                      ⚠️ {weakness.weakness}
                    </h4>
                    <p className="text-slate-300 text-sm mb-3">
                      <span className="font-semibold text-orange-400">문제:</span> {weakness.problem}
                    </p>
                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <p className="text-emerald-300 text-sm">
                        <span className="font-semibold">✅ 해결책:</span> {weakness.solution}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Improvement Steps */}
      <motion.div
        className="glass rounded-2xl p-6 mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
            <Target className="w-6 h-6 text-blue-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-blue-400 mb-4">단계별 개선 방법</h3>

            <div className="space-y-4">
              {improvementSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  className="p-5 rounded-lg bg-slate-800/50 border border-blue-500/20"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + idx * 0.1 }}
                >
                  <h4 className="font-bold text-blue-300 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    {step.phase}
                  </h4>
                  <div className="space-y-2">
                    {step.actions.map((action, aidx) => (
                      <div
                        key={aidx}
                        className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/10"
                      >
                        <span className="text-blue-400 flex-shrink-0">•</span>
                        <p className="text-slate-300 text-sm leading-relaxed">{action}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Actionable Tips */}
      <motion.div
        className="glass rounded-2xl p-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/20">
            <Zap className="w-6 h-6 text-emerald-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-emerald-400 mb-4">즉시 실천 가능한 팁</h3>

            <div className="space-y-4">
              {actionableTips.map((category, idx) => (
                <motion.div
                  key={idx}
                  className="p-5 rounded-lg bg-slate-800/50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + idx * 0.1 }}
                >
                  <h4 className="font-bold text-emerald-300 mb-3 flex items-center gap-2">
                    <Wrench className="w-4 h-4" />
                    {category.category}
                  </h4>
                  <div className="space-y-2">
                    {category.tips.map((tip, tidx) => (
                      <div
                        key={tidx}
                        className="flex items-start gap-2 text-slate-300 text-sm pl-2"
                      >
                        <span className="text-emerald-400 flex-shrink-0">✓</span>
                        <p className="leading-relaxed">{tip}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Encouragement */}
      <motion.div
        className="mt-6 p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <h4 className="font-bold text-purple-400 mb-3 text-lg flex items-center gap-2">
          <Wrench className="w-5 h-5" />
          변화를 위한 응원
        </h4>
        <div className="space-y-3 text-slate-200 text-sm leading-relaxed">
          <p className="text-base font-semibold text-purple-300">
            약점을 인식하는 것이 개선의 첫걸음입니다.
          </p>
          <p>• <span className="font-semibold text-purple-300">완벽할 필요는 없습니다</span> - 조금씩 나아지면 됩니다</p>
          <p>• <span className="font-semibold text-purple-300">실패를 두려워하지 마세요</span> - 시도하는 것만으로도 성장입니다</p>
          <p>• <span className="font-semibold text-purple-300">자신에게 관대하세요</span> - 자책보다 격려가 더 큰 힘이 됩니다</p>
          <p>• <span className="font-semibold text-purple-300">작은 변화를 축하하세요</span> - 큰 변화는 작은 실천의 누적입니다</p>
          <p className="pt-2 text-purple-300 italic">
            &quot;우리의 가장 큰 영광은 넘어지지 않는 데 있는 것이 아니라, 넘어질 때마다 일어서는 데 있다.&quot; - 공자
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
