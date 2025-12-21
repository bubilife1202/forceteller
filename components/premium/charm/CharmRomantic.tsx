'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Heart, Sparkles, Gift, Star } from 'lucide-react';

interface CharmRomanticProps {
  result: SajuResult;
  name: string;
  gender: 'male' | 'female';
}

export default function CharmRomantic({ result, name, gender }: CharmRomanticProps) {
  const dayElement = result.day.stem.element;
  const { 식상, 재성, 관성, 인성, 비겁 } = result.tenGodsCount;

  // 이성에게 어필되는 포인트
  const getAttractivePoints = () => {
    const points: { [key: string]: {
      primary: string[];
      description: string;
    } } = {
      목: {
        primary: ['따뜻한 배려심', '성장하는 모습', '긍정적 에너지', '진심 어린 응원'],
        description: '당신은 상대방의 꿈과 가능성을 믿어주고 응원하는 모습이 매력적입니다. 함께 있으면 자연스럽게 더 나은 사람이 되고 싶게 만드는 힘이 있습니다. 판단하지 않고 있는 그대로 받아들이는 포용력도 큰 매력 포인트입니다.',
      },
      화: {
        primary: ['열정적인 표현', '솔직한 감정', '밝은 에너지', '진정성'],
        description: '당신은 감정을 숨기지 않고 솔직하게 표현하는 것이 가장 큰 매력입니다. 좋아하는 마음을 당당하게 드러내고, 관계에 열정을 쏟는 모습이 상대방의 마음을 움직입니다. 함께 있으면 삶이 더 화려하고 즐겁게 느껴집니다.',
      },
      토: {
        primary: ['안정감', '신뢰성', '깊은 포용력', '현실적 지원'],
        description: '당신은 함께 있으면 편안하고 안정감을 느끼게 하는 매력이 있습니다. 감정의 기복이 적고 언제나 믿을 수 있는 존재라는 점이 큰 장점입니다. 실질적으로 상대방을 도와주고 지원하는 모습도 매력적입니다.',
      },
      금: {
        primary: ['우아한 품격', '명확한 기준', '전문성', '당당함'],
        description: '당신은 세련되고 품격 있는 모습이 눈에 띕니다. 자신만의 확고한 가치관과 기준이 있어 쉽게 흔들리지 않는 당당함이 매력적입니다. 전문적이고 능력 있는 이미지도 이성에게 강한 인상을 남깁니다.',
      },
      수: {
        primary: ['신비로운 분위기', '깊이 있는 대화', '지적 매력', '독특함'],
        description: '당신은 알수록 더 끌리는 신비로운 매력이 있습니다. 겉으로 쉽게 드러나지 않지만, 깊이 있는 대화를 나누면서 점차 드러나는 지혜와 통찰력이 매력적입니다. 남들과 다른 독특한 시각도 흥미를 불러일으킵니다.',
      },
    };
    return points[dayElement] || points.목;
  };

  // 연애 스타일
  const getDatingStyle = () => {
    const styles: { [key: string]: {
      type: string;
      approach: string;
      ideal: string;
      caution: string;
    } } = {
      목: {
        type: '성장형 연애',
        approach: '서로를 성장시키는 관계를 추구합니다. 상대방의 꿈을 응원하고, 함께 발전해 나가는 것을 중요하게 생각합니다. 배려심이 깊고, 상대방의 입장을 먼저 생각하는 편입니다.',
        ideal: '함께 성장하고, 서로의 가능성을 믿어주는 따뜻한 관계',
        caution: '상대방에게 너무 맞추다 보면 자신을 잃을 수 있어요. 자신의 욕구도 표현하세요.',
      },
      화: {
        type: '열정형 연애',
        approach: '사랑에 빠지면 전력으로 달려갑니다. 감정을 숨기지 않고 표현하며, 관계에 많은 에너지를 쏟습니다. 로맨틱한 순간을 만들고, 감동을 주는 것을 좋아합니다.',
        ideal: '열정적이고 진솔한 감정 교류가 있는 드라마틱한 관계',
        caution: '너무 빠르게 진행되거나 감정적으로 소진될 수 있어요. 페이스 조절이 필요합니다.',
      },
      토: {
        type: '안정형 연애',
        approach: '천천히 깊어지는 관계를 선호합니다. 급하게 서두르지 않고, 시간을 두고 상대방을 알아갑니다. 현실적이고 실질적인 면도 중요하게 고려합니다.',
        ideal: '편안하고 신뢰할 수 있는 오래가는 관계',
        caution: '너무 안정만 추구하면 관계가 지루해질 수 있어요. 가끔은 설렘도 필요합니다.',
      },
      금: {
        type: '원칙형 연애',
        approach: '명확한 기준과 원칙을 가지고 연애합니다. 서로에 대한 존중과 경계를 중요시하며, 품격 있는 관계를 유지하려 노력합니다. 감정보다 이성적 판단을 우선하는 편입니다.',
        ideal: '서로를 존중하고, 격을 맞춰가는 품격 있는 관계',
        caution: '너무 완벽을 추구하면 관계가 딱딱해질 수 있어요. 때로는 감정에 솔직해지세요.',
      },
      수: {
        type: '깊이형 연애',
        approach: '겉으로 쉽게 드러내지 않지만, 깊고 진지한 관계를 추구합니다. 정신적 교감을 중요하게 생각하며, 서로의 내면을 이해하려 노력합니다. 독립적이면서도 깊은 유대를 원합니다.',
        ideal: '정신적으로 교감하고, 서로의 깊이를 존중하는 관계',
        caution: '너무 깊이만 추구하면 관계가 무거워질 수 있어요. 가벼운 즐거움도 중요합니다.',
      },
    };
    return styles[dayElement] || styles.목;
  };

  // 매력 표현 방식
  const getCharmExpression = () => {
    const expressions = [];

    if (식상 >= 2) {
      expressions.push({
        method: '창의적 표현',
        description: '편지, 그림, 음악 등 창의적인 방법으로 마음을 전달합니다',
        example: '손편지나 직접 만든 선물로 진심을 표현하세요',
      });
    }

    if (재성 >= 2 || dayElement === '토') {
      expressions.push({
        method: '실질적 행동',
        description: '말보다 행동으로 사랑을 증명합니다',
        example: '필요한 것을 미리 챙겨주거나 실질적인 도움을 주세요',
      });
    }

    if (인성 >= 2 || dayElement === '수') {
      expressions.push({
        method: '깊은 대화',
        description: '진지하고 의미 있는 대화로 마음을 나눕니다',
        example: '상대방의 이야기를 깊이 들어주고 공감해주세요',
      });
    }

    if (비겁 >= 2 || dayElement === '화') {
      expressions.push({
        method: '직접적 표현',
        description: '솔직하고 직접적으로 감정을 전달합니다',
        example: '좋아하는 마음을 망설이지 말고 당당하게 표현하세요',
      });
    }

    if (관성 >= 1 || dayElement === '금') {
      expressions.push({
        method: '품격 있는 배려',
        description: '세심하고 격조 있는 방식으로 마음을 표현합니다',
        example: '특별한 날을 기억하고 의미 있게 준비하세요',
      });
    }

    return expressions.slice(0, 3);
  };

  const attractivePoints = getAttractivePoints();
  const datingStyle = getDatingStyle();
  const charmExpression = getCharmExpression();

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
          연애 매력
        </h2>
        <p className="text-slate-300">
          이성에게 끌리는 {name}님만의 로맨틱한 매력
        </p>
      </div>

      {/* Attractive Points */}
      <motion.div
        className="glass rounded-2xl p-6 mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20">
            <Heart className="w-6 h-6 text-pink-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-pink-400 mb-4">이성에게 어필되는 포인트</h3>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {attractivePoints.primary.map((point, idx) => (
                <div
                  key={idx}
                  className="px-3 py-2 bg-pink-500/20 rounded-lg text-pink-300 text-sm text-center border border-pink-500/30"
                >
                  {point}
                </div>
              ))}
            </div>

            <div className="p-4 rounded-lg bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-pink-500/20">
              <p className="text-slate-200 text-sm leading-relaxed">
                {attractivePoints.description}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Dating Style */}
      <motion.div
        className="glass rounded-2xl p-6 mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-purple-400 mb-2">연애 스타일</h3>
            <h4 className="text-lg font-semibold text-white mb-4">{datingStyle.type}</h4>

            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-slate-800/50">
                <p className="text-slate-200 text-sm leading-relaxed mb-2">
                  <span className="font-semibold text-purple-400">접근 방식:</span>
                </p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {datingStyle.approach}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <p className="text-slate-200 text-sm leading-relaxed mb-1">
                  <span className="font-semibold text-purple-400">💕 이상적인 관계:</span>
                </p>
                <p className="text-purple-200 text-sm">
                  {datingStyle.ideal}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <p className="text-slate-200 text-sm leading-relaxed mb-1">
                  <span className="font-semibold text-amber-400">⚠️ 주의사항:</span>
                </p>
                <p className="text-amber-200 text-sm">
                  {datingStyle.caution}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Charm Expression */}
      <motion.div
        className="glass rounded-2xl p-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-rose-500/20 to-pink-500/20">
            <Gift className="w-6 h-6 text-rose-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-rose-400 mb-4">매력 표현 방식</h3>

            <div className="space-y-4">
              {charmExpression.map((expr, idx) => (
                <motion.div
                  key={idx}
                  className="p-4 rounded-lg bg-slate-800/50 border border-rose-500/20"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                >
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-rose-400 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h4 className="font-bold text-white mb-2">{expr.method}</h4>
                      <p className="text-slate-300 text-sm mb-2">
                        {expr.description}
                      </p>
                      <div className="p-2 rounded bg-rose-500/10">
                        <p className="text-rose-300 text-xs">
                          💡 {expr.example}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Dating Tips */}
      <motion.div
        className="mt-6 p-6 rounded-xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h4 className="font-bold text-pink-400 mb-3 text-lg flex items-center gap-2">
          <Heart className="w-5 h-5" />
          연애 매력 극대화 팁
        </h4>
        <div className="space-y-2 text-slate-200 text-sm leading-relaxed">
          <p>• 자신의 매력을 믿고 자연스럽게 표현하세요. 억지로 만든 모습은 오히려 매력을 반감시킵니다</p>
          <p>• 상대방의 스타일도 존중하세요. 나와 다르다고 틀린 것이 아닙니다</p>
          <p>• 솔직함과 배려의 균형을 맞추세요. 진심을 전하되, 상대방을 존중하는 표현을 찾으세요</p>
          <p>• 관계 초기의 설렘도 좋지만, 깊어지는 관계의 편안함도 소중합니다</p>
          <p>• 완벽한 사람은 없습니다. 서로의 부족함을 인정하고 함께 성장하세요</p>
          <p>• 무엇보다 자신을 사랑하세요. 자기 자신을 소중히 여기는 사람이 가장 매력적입니다</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
