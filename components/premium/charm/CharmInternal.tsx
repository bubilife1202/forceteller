'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Brain, Heart, Lightbulb, Shield } from 'lucide-react';

interface CharmInternalProps {
  result: SajuResult;
  name: string;
}

export default function CharmInternal({ result, name }: CharmInternalProps) {
  const dayElement = result.day.stem.element;
  const { 식상, 재성, 관성, 인성, 비겁 } = result.tenGodsCount;

  // 성격적 강점
  const getPersonalityStrengths = () => {
    const strengths: { [key: string]: {
      title: string;
      core: string[];
      description: string;
    } } = {
      목: {
        title: '끊임없는 성장 의지',
        core: ['배려심', '성장지향', '희망적', '유연함'],
        description: '당신은 항상 더 나은 사람이 되려고 노력합니다. 이런 성장 의지가 주변 사람들에게 긍정적인 영향을 미치며, 함께 있으면 자연스럽게 발전하고 싶은 마음이 들게 만듭니다. 배려심이 깊고 타인의 성장도 진심으로 응원하는 마음이 내면의 가장 큰 매력입니다.',
      },
      화: {
        title: '진솔한 열정',
        core: ['열정적', '솔직함', '창의적', '표현력'],
        description: '당신의 가장 큰 매력은 진심입니다. 좋아하는 것에 대한 열정이 가득하고, 그것을 숨기지 않고 표현하는 당당함이 있습니다. 이런 진솔함이 사람들에게 감동을 주며, 당신의 열정이 다른 사람들에게도 불을 지피는 촉매제가 됩니다.',
      },
      토: {
        title: '깊은 신뢰감',
        core: ['신뢰성', '포용력', '인내심', '책임감'],
        description: '당신은 사람들이 기댈 수 있는 든든한 존재입니다. 약속을 지키고, 끝까지 책임지는 모습에서 신뢰감이 형성됩니다. 또한 타인을 있는 그대로 받아들이는 포용력이 있어, 사람들이 당신 앞에서 편안하게 자신을 드러낼 수 있습니다.',
      },
      금: {
        title: '명확한 원칙',
        core: ['원칙성', '정의감', '결단력', '전문성'],
        description: '당신은 자신만의 확고한 가치관과 원칙을 가지고 있습니다. 옳고 그름에 대한 명확한 기준이 있고, 그것을 지키려는 의지가 강합니다. 이런 당당함과 전문가적 태도가 사람들에게 존경심을 불러일으킵니다.',
      },
      수: {
        title: '깊이 있는 통찰',
        core: ['지혜로움', '통찰력', '적응력', '독창성'],
        description: '당신은 겉으로 드러나지 않는 본질을 꿰뚫어 보는 능력이 있습니다. 상황을 깊이 이해하고, 남들이 보지 못하는 것을 발견하는 통찰력이 매력적입니다. 또한 상황에 맞게 유연하게 대처하는 지혜가 있어 어떤 환경에서도 빛을 발합니다.',
      },
    };
    return strengths[dayElement] || strengths.목;
  };

  // 숨겨진 재능
  const getHiddenTalents = () => {
    const talents = [];

    if (식상 >= 2) {
      talents.push({
        icon: Lightbulb,
        title: '창의적 표현력',
        description: '당신은 자신의 생각과 감정을 독특한 방식으로 표현하는 재능이 있습니다. 예술, 글쓰기, 디자인 등 창작 활동에서 빛을 발하며, 남들과 다른 시각으로 세상을 바라보는 능력이 있습니다.',
        color: 'text-yellow-400',
        bgColor: 'from-yellow-500/20 to-amber-500/20',
      });
    }

    if (재성 >= 2) {
      talents.push({
        icon: Brain,
        title: '실용적 감각',
        description: '돈과 자원을 효율적으로 관리하는 능력이 뛰어납니다. 실용적이고 현실적인 판단력이 있어, 투자나 사업에서 좋은 성과를 낼 수 있습니다. 가치 있는 것을 알아보는 안목도 탁월합니다.',
        color: 'text-green-400',
        bgColor: 'from-green-500/20 to-emerald-500/20',
      });
    }

    if (관성 >= 2) {
      talents.push({
        icon: Shield,
        title: '리더십과 조직력',
        description: '사람들을 이끌고 조직을 관리하는 능력이 있습니다. 공정하고 체계적으로 일을 처리하며, 책임감 있게 목표를 달성합니다. 공적인 자리에서 특히 빛을 발하는 재능입니다.',
        color: 'text-blue-400',
        bgColor: 'from-blue-500/20 to-indigo-500/20',
      });
    }

    if (인성 >= 2) {
      talents.push({
        icon: Heart,
        title: '깊은 사고력',
        description: '학문적 깊이와 철학적 사고가 뛰어납니다. 복잡한 개념을 이해하고, 끊임없이 배우며 성장합니다. 지식을 전달하고 가르치는 능력도 있어, 교육이나 연구 분야에서 재능을 발휘할 수 있습니다.',
        color: 'text-purple-400',
        bgColor: 'from-purple-500/20 to-pink-500/20',
      });
    }

    if (비겁 >= 2) {
      talents.push({
        icon: Heart,
        title: '강한 독립심',
        description: '자립심이 강하고 독자적으로 일을 추진하는 능력이 있습니다. 경쟁 상황에서 오히려 더 빛을 발하며, 자신만의 길을 개척하는 용기가 있습니다. 프리랜서나 창업가로서의 재능이 있습니다.',
        color: 'text-red-400',
        bgColor: 'from-red-500/20 to-orange-500/20',
      });
    }

    // 최소 2개는 보장
    if (talents.length < 2) {
      talents.push({
        icon: Lightbulb,
        title: '적응력',
        description: '다양한 환경과 상황에 빠르게 적응하는 능력이 있습니다. 변화를 두려워하지 않고, 새로운 도전을 기회로 만들 수 있습니다.',
        color: 'text-cyan-400',
        bgColor: 'from-cyan-500/20 to-blue-500/20',
      });
    }

    return talents.slice(0, 3);
  };

  // 독특한 관점
  const getUniquePerspective = () => {
    const perspectives: { [key: string]: {
      worldview: string;
      approach: string;
      specialty: string;
    } } = {
      목: {
        worldview: '성장과 가능성의 관점',
        approach: '당신은 모든 것을 성장의 기회로 봅니다. 실패도 배움의 과정이며, 사람도 변화하고 발전할 수 있다고 믿습니다. 이런 긍정적이고 미래지향적인 시각이 주변 사람들에게 희망을 줍니다.',
        specialty: '사람의 가능성을 발견하고 격려하는 능력',
      },
      화: {
        worldview: '열정과 진정성의 관점',
        approach: '당신은 진심과 열정을 가장 중요하게 생각합니다. 형식보다 내용을, 겉모습보다 본질을 추구합니다. 직관적이고 감각적으로 세상을 이해하며, 진솔한 감정 교류를 중시합니다.',
        specialty: '사람의 진심을 읽어내고 공감하는 능력',
      },
      토: {
        worldview: '안정과 조화의 관점',
        approach: '당신은 균형과 조화를 추구합니다. 극단을 피하고 중도를 지향하며, 모두가 편안할 수 있는 환경을 만들려고 노력합니다. 현실적이면서도 따뜻한 시각으로 세상을 바라봅니다.',
        specialty: '갈등을 중재하고 화합을 이끌어내는 능력',
      },
      금: {
        worldview: '원칙과 정의의 관점',
        approach: '당신은 명확한 기준과 원칙을 중요하게 생각합니다. 옳고 그름을 분명히 하고, 공정함을 추구합니다. 체계적이고 논리적으로 사고하며, 전문성과 품질을 중시합니다.',
        specialty: '복잡한 문제를 명확하게 정리하는 능력',
      },
      수: {
        worldview: '지혜와 유연성의 관점',
        approach: '당신은 고정관념에 얽매이지 않고 독창적으로 생각합니다. 여러 가능성을 열어두고, 상황에 따라 유연하게 대처합니다. 깊이 있게 사고하며, 본질을 꿰뚫어 봅니다.',
        specialty: '복잡한 상황에서 핵심을 파악하는 능력',
      },
    };
    return perspectives[dayElement] || perspectives.목;
  };

  const personality = getPersonalityStrengths();
  const talents = getHiddenTalents();
  const perspective = getUniquePerspective();

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
          내적 매력
        </h2>
        <p className="text-slate-300">
          겉으로 드러나지 않지만 {name}님을 빛나게 하는 내면의 힘
        </p>
      </div>

      {/* Personality Strengths */}
      <motion.div
        className="glass rounded-2xl p-6 mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20">
            <Heart className="w-6 h-6 text-blue-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-blue-400 mb-2">성격적 강점</h3>
            <h4 className="text-lg font-semibold text-white mb-3">{personality.title}</h4>
            <p className="text-slate-300 leading-relaxed mb-4">
              {personality.description}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {personality.core.map((trait, idx) => (
                <div
                  key={idx}
                  className="px-3 py-2 bg-blue-500/20 rounded-lg text-blue-300 text-sm text-center border border-blue-500/30"
                >
                  {trait}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hidden Talents */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
          <Lightbulb className="w-6 h-6" />
          숨겨진 재능
        </h3>
        <div className="space-y-4">
          {talents.map((talent, idx) => {
            const Icon = talent.icon;
            return (
              <motion.div
                key={idx}
                className="glass rounded-xl p-5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${talent.bgColor}`}>
                    <Icon className={`w-5 h-5 ${talent.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-bold ${talent.color} mb-2`}>{talent.title}</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {talent.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Unique Perspective */}
      <motion.div
        className="glass rounded-2xl p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20">
            <Brain className="w-6 h-6 text-pink-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-pink-400 mb-2">독특한 관점</h3>
            <h4 className="text-lg font-semibold text-white mb-3">{perspective.worldview}</h4>
            <p className="text-slate-200 leading-relaxed mb-4">
              {perspective.approach}
            </p>
            <div className="p-4 rounded-lg bg-slate-800/50 border border-pink-500/20">
              <p className="text-slate-200 text-sm">
                <span className="font-semibold text-pink-400">특별한 능력:</span> {perspective.specialty}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Summary */}
      <motion.div
        className="mt-6 p-5 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <p className="text-slate-200 leading-relaxed">
          💡 <span className="font-semibold">내면의 매력 활용법:</span> 당신의 내적 강점은 시간이 지날수록 빛을 발합니다.
          겉으로 드러나는 매력도 중요하지만, 진정한 관계는 내면의 깊이에서 시작됩니다.
          자신의 가치관과 재능을 신뢰하고, 그것을 자연스럽게 표현할 때 가장 매력적인 모습이 됩니다.
        </p>
      </motion.div>
    </motion.div>
  );
}
