'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Eye, Sparkles, Users, TrendingUp, AlertCircle, Lightbulb } from 'lucide-react';

interface CharmFirstImpressionProps {
  result: SajuResult;
  name: string;
  gender: 'male' | 'female';
}

export default function CharmFirstImpression({ result, name, gender }: CharmFirstImpressionProps) {
  const dayElement = result.day.stem.element;
  const { 식상, 재성, 관성, 인성, 비겁 } = result.tenGodsCount;

  // 첫인상 유형
  const getFirstImpressionType = () => {
    const types: { [key: string]: {
      type: string;
      image: string;
      keywords: string[];
      description: string;
    } } = {
      목: {
        type: '온화하고 편안한 인상',
        image: '봄날의 따뜻한 햇살 같은 느낌',
        keywords: ['친근하다', '다정하다', '편안하다', '부드럽다'],
        description: '처음 만나는 사람에게 경계심을 풀게 하는 온화한 인상을 줍니다. 말투와 표정이 부드러워서 쉽게 다가갈 수 있는 느낌을 받습니다. 강압적이거나 위협적이지 않아서, 상대방이 편하게 대화를 시작할 수 있게 만듭니다.',
      },
      화: {
        type: '밝고 활기찬 인상',
        image: '한여름의 뜨거운 태양 같은 느낌',
        keywords: ['활발하다', '밝다', '열정적이다', '긍정적이다'],
        description: '처음 만나도 금방 친해질 수 있을 것 같은 밝은 에너지를 풍깁니다. 표정이 풍부하고 말투에 생기가 넘쳐서, 함께 있으면 즐거울 것 같다는 느낌을 줍니다. 사교적이고 개방적인 인상으로 사람들의 관심을 끕니다.',
      },
      토: {
        type: '믿음직하고 안정적인 인상',
        image: '든든한 대지 같은 느낌',
        keywords: ['믿음직하다', '성실하다', '차분하다', '안정적이다'],
        description: '첫 만남부터 신뢰감을 주는 안정적인 인상입니다. 급하거나 가벼운 느낌이 없어서, 중요한 일을 맡길 수 있을 것 같다는 인상을 줍니다. 말과 행동이 일치하는 진실된 사람처럼 보입니다.',
      },
      금: {
        type: '세련되고 품격 있는 인상',
        image: '가을의 맑은 하늘 같은 느낌',
        keywords: ['우아하다', '세련됐다', '똑똑하다', '당당하다'],
        description: '첫 만남부터 범접하기 어려운 품격과 세련미를 풍깁니다. 옷차림과 말투가 깔끔하고 정돈되어 있어서, 교양 있고 능력 있는 사람이라는 인상을 줍니다. 자기관리가 철저해 보이는 이미지입니다.',
      },
      수: {
        type: '신비롭고 지적인 인상',
        image: '겨울밤의 고요한 호수 같은 느낌',
        keywords: ['신비롭다', '지적이다', '조용하다', '깊이있다'],
        description: '첫 만남에서 쉽게 파악되지 않는 신비로운 인상을 줍니다. 말수가 많지 않지만, 한마디 한마디에 무게감이 있어서 생각이 깊은 사람처럼 보입니다. 알수록 더 흥미로울 것 같은 느낌을 줍니다.',
      },
    };
    return types[dayElement] || types.목;
  };

  // 첫인상의 강점
  const getFirstImpressionStrengths = () => {
    const strengths = [];

    if (식상 >= 2) {
      strengths.push({
        title: '표현력이 뛰어난 인상',
        description: '말을 재미있고 생동감 있게 해서, 대화가 지루하지 않을 것 같은 인상을 줍니다.',
        impact: '첫 만남에서도 자연스럽게 분위기를 이끌 수 있습니다',
      });
    }

    if (재성 >= 2) {
      strengths.push({
        title: '실용적이고 현실적인 인상',
        description: '말이 아닌 행동으로 보여주는 사람처럼 보이며, 실질적인 도움을 줄 수 있을 것 같은 인상입니다.',
        impact: '비즈니스나 협력 관계에서 좋은 첫인상을 남깁니다',
      });
    }

    if (관성 >= 2) {
      strengths.push({
        title: '책임감 있고 신뢰할 수 있는 인상',
        description: '원칙을 지키고 약속을 중요하게 여길 것 같은 모습으로, 신뢰감을 줍니다.',
        impact: '중요한 역할이나 리더십 포지션에 적합해 보입니다',
      });
    }

    if (인성 >= 2) {
      strengths.push({
        title: '교양 있고 지적인 인상',
        description: '많은 것을 알고 있을 것 같으며, 깊이 있는 대화가 가능할 것 같은 인상을 줍니다.',
        impact: '학문적이거나 전문적인 영역에서 존중받습니다',
      });
    }

    if (비겁 >= 2) {
      strengths.push({
        title: '친화력 있고 사교적인 인상',
        description: '사람들과 쉽게 어울리고, 팀워크를 중요시할 것 같은 인상을 줍니다.',
        impact: '네트워킹이나 협업 상황에서 환영받습니다',
      });
    }

    // 기본 강점 추가
    if (strengths.length < 3) {
      const elementStrengths: Record<string, { title: string; description: string; impact: string }> = {
        목: {
          title: '따뜻하고 배려심 있는 인상',
          description: '상대방의 말을 경청하고 공감해줄 것 같은 포근한 느낌을 줍니다.',
          impact: '상담이나 케어가 필요한 상황에서 신뢰를 얻습니다',
        },
        화: {
          title: '열정적이고 긍정적인 인상',
          description: '어떤 일이든 즐겁게 할 것 같고, 주변을 밝게 만들 것 같은 에너지를 풍깁니다.',
          impact: '팀의 사기를 높이고 분위기를 좋게 만듭니다',
        },
        토: {
          title: '안정적이고 믿음직한 인상',
          description: '흔들림 없이 꾸준하게 일을 처리할 것 같은 든든함을 줍니다.',
          impact: '장기적인 관계나 프로젝트에서 신뢰를 받습니다',
        },
        금: {
          title: '전문적이고 능력 있는 인상',
          description: '자기 분야에서 실력을 갖추고 있을 것 같은 프로페셔널한 모습입니다.',
          impact: '전문성이 요구되는 분야에서 인정받습니다',
        },
        수: {
          title: '사려 깊고 통찰력 있는 인상',
          description: '겉으로 드러나지 않지만 깊은 생각과 지혜를 가진 것 같은 느낌입니다.',
          impact: '중요한 결정이나 조언이 필요할 때 찾게 됩니다',
        },
      };
      strengths.push(elementStrengths[dayElement] || elementStrengths.목);
    }

    return strengths.slice(0, 3);
  };

  // 첫인상 보완점
  const getFirstImpressionWeaknesses = () => {
    const weaknesses: { [key: string]: {
      issue: string;
      reason: string;
      improvement: string;
    }[] } = {
      목: [
        {
          issue: '너무 유순해 보일 수 있음',
          reason: '상대방이 당신을 만만하게 볼 수 있습니다',
          improvement: '필요할 때는 확고하게 의견을 표현하세요. 부드러움 속에 단호함을 보여주면 더 균형잡힌 인상을 줄 수 있습니다.',
        },
        {
          issue: '존재감이 약해 보일 수 있음',
          reason: '강한 사람들 사이에서 묻힐 수 있습니다',
          improvement: '목소리 톤을 조금 높이고, 자신의 의견을 더 적극적으로 개진하세요. 배려심은 유지하되, 자기주장도 분명히 하세요.',
        },
      ],
      화: [
        {
          issue: '가볍게 보일 수 있음',
          reason: '너무 밝고 쾌활해서 진지함이 부족해 보일 수 있습니다',
          improvement: '중요한 상황에서는 진지한 표정과 태도를 보여주세요. TPO에 맞춰 에너지를 조절하는 것이 중요합니다.',
        },
        {
          issue: '충동적으로 보일 수 있음',
          reason: '즉흥적이고 계획성이 없어 보일 수 있습니다',
          improvement: '첫 만남에서는 열정을 보이되, 신중한 면모도 함께 보여주세요. 계획과 준비를 해왔다는 것을 어필하세요.',
        },
      ],
      토: [
        {
          issue: '지루하거나 답답해 보일 수 있음',
          reason: '너무 신중하고 조심스러워 보일 수 있습니다',
          improvement: '가끔은 유머나 가벼운 이야기로 분위기를 환기시키세요. 안정감을 주되, 재미도 함께 선사하세요.',
        },
        {
          issue: '변화에 소극적으로 보일 수 있음',
          reason: '새로운 것을 받아들이기 어려워하는 것처럼 보일 수 있습니다',
          improvement: '새로운 아이디어에 열린 태도를 보여주세요. "한번 고려해보겠습니다" 같은 긍정적 반응을 보이세요.',
        },
      ],
      금: [
        {
          issue: '냉정하거나 차갑게 보일 수 있음',
          reason: '거리감이 느껴져서 친근하게 다가가기 어려울 수 있습니다',
          improvement: '미소를 더 자주 짓고, 가벼운 스몰토크로 긴장을 풀어주세요. 품격은 유지하되, 따뜻함도 보여주세요.',
        },
        {
          issue: '완벽주의자처럼 보일 수 있음',
          reason: '함께 일하기 까다롭거나 비판적일 것 같은 인상을 줄 수 있습니다',
          improvement: '실수나 부족함을 인정하는 솔직함을 보여주세요. 완벽하지 않아도 괜찮다는 여유를 드러내세요.',
        },
      ],
      수: [
        {
          issue: '폐쇄적이거나 소극적으로 보일 수 있음',
          reason: '마음을 열지 않는 것처럼 보여 거리감이 느껴질 수 있습니다',
          improvement: '자신에 대한 이야기를 조금씩 나누세요. 신비로움을 유지하되, 완전히 벽을 치지는 마세요.',
        },
        {
          issue: '이해하기 어려워 보일 수 있음',
          reason: '생각이 복잡하고 깊어서 소통이 어려울 것 같은 인상을 줄 수 있습니다',
          improvement: '간단하고 명확한 표현을 사용하세요. 깊이는 유지하되, 누구나 이해할 수 있게 설명하세요.',
        },
      ],
    };
    return weaknesses[dayElement] || weaknesses.목;
  };

  // 상황별 첫인상 관리법
  const getSituationalTips = () => {
    return [
      {
        situation: '비즈니스 미팅',
        tips: [
          '시간 약속을 철저히 지키세요 - 첫인상의 50%는 시간 엄수입니다',
          '명함을 준비하고 정중하게 교환하세요',
          '경청하는 자세를 보이세요 - 상대방 말을 끊지 않고 끝까지 듣습니다',
          '자신감 있게 악수하고 눈을 맞추세요',
        ],
      },
      {
        situation: '소개팅이나 미팅',
        tips: [
          '자연스러운 미소로 편안한 분위기를 만드세요',
          '상대방에 대한 진정한 관심을 보여주세요',
          '너무 완벽해 보이려 하지 마세요 - 진솔함이 더 매력적입니다',
          '긍정적인 에너지를 전달하되, 지나치지 않게 조절하세요',
        ],
      },
      {
        situation: '새로운 직장이나 모임',
        tips: [
          '겸손하면서도 자신감 있는 태도를 유지하세요',
          '먼저 인사하고 자기소개를 간단명료하게 하세요',
          '기존 멤버들을 존중하는 태도를 보이세요',
          '적극적으로 참여하되, 너무 앞서나가지 않도록 주의하세요',
        ],
      },
    ];
  };

  const impressionType = getFirstImpressionType();
  const strengths = getFirstImpressionStrengths();
  const weaknesses = getFirstImpressionWeaknesses();
  const situationalTips = getSituationalTips();

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
          첫인상 분석
        </h2>
        <p className="text-slate-300">
          사람들이 처음 만나는 {name}님을 어떻게 느낄까요?
        </p>
      </div>

      {/* First Impression Type */}
      <motion.div
        className="glass rounded-2xl p-6 mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
            <Eye className="w-6 h-6 text-blue-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-blue-400 mb-2">첫인상 유형</h3>
            <h4 className="text-2xl font-bold text-white mb-3">{impressionType.type}</h4>

            <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 mb-4">
              <p className="text-blue-200 text-sm italic mb-3">&quot;{impressionType.image}&quot;</p>
              <p className="text-slate-200 text-sm leading-relaxed">
                {impressionType.description}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {impressionType.keywords.map((keyword, idx) => (
                <motion.div
                  key={idx}
                  className="px-3 py-2 bg-blue-500/20 rounded-lg text-blue-300 text-sm text-center border border-blue-500/30"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                >
                  {keyword}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Strengths */}
      <motion.div
        className="glass rounded-2xl p-6 mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20">
            <TrendingUp className="w-6 h-6 text-green-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-green-400 mb-4">첫인상의 강점</h3>

            <div className="space-y-4">
              {strengths.map((strength, idx) => (
                <motion.div
                  key={idx}
                  className="p-4 rounded-lg bg-slate-800/50 border border-green-500/20"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                >
                  <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-green-400" />
                    {strength.title}
                  </h4>
                  <p className="text-slate-300 text-sm mb-3">
                    {strength.description}
                  </p>
                  <div className="p-3 rounded-lg bg-green-500/10">
                    <p className="text-green-300 text-xs">
                      💡 {strength.impact}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Weaknesses & Improvements */}
      <motion.div
        className="glass rounded-2xl p-6 mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20">
            <AlertCircle className="w-6 h-6 text-amber-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-amber-400 mb-4">첫인상 보완점</h3>

            <div className="space-y-4">
              {weaknesses.map((weakness, idx) => (
                <motion.div
                  key={idx}
                  className="p-5 rounded-lg bg-slate-800/50 border border-amber-500/20"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + idx * 0.1 }}
                >
                  <h4 className="font-bold text-amber-300 mb-2">
                    ⚠️ {weakness.issue}
                  </h4>
                  <p className="text-slate-300 text-sm mb-3">
                    <span className="font-semibold text-amber-400">이유:</span> {weakness.reason}
                  </p>
                  <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/20">
                    <p className="text-emerald-300 text-sm">
                      <span className="font-semibold">✅ 개선 방법:</span> {weakness.improvement}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Situational Tips */}
      <motion.div
        className="glass rounded-2xl p-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
            <Lightbulb className="w-6 h-6 text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-purple-400 mb-4">상황별 첫인상 관리법</h3>

            <div className="space-y-4">
              {situationalTips.map((tip, idx) => (
                <motion.div
                  key={idx}
                  className="p-5 rounded-lg bg-slate-800/50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + idx * 0.1 }}
                >
                  <h4 className="font-bold text-purple-300 mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {tip.situation}
                  </h4>
                  <div className="space-y-2">
                    {tip.tips.map((t, tidx) => (
                      <p key={tidx} className="text-slate-300 text-sm pl-4 border-l-2 border-purple-500/30">
                        {t}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Final Tips */}
      <motion.div
        className="mt-6 p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <h4 className="font-bold text-blue-400 mb-3 text-lg flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          첫인상 극대화 핵심 팁
        </h4>
        <div className="space-y-2 text-slate-200 text-sm leading-relaxed">
          <p>• <span className="font-semibold text-blue-300">첫 7초가 중요합니다</span> - 표정, 자세, 목소리 톤을 의식하세요</p>
          <p>• <span className="font-semibold text-blue-300">진정성이 최고의 무기입니다</span> - 억지로 꾸미지 말고 자연스럽게</p>
          <p>• <span className="font-semibold text-blue-300">상대방에게 집중하세요</span> - 자신을 어필하려 하기보다 상대방에게 관심을 보이세요</p>
          <p>• <span className="font-semibold text-blue-300">긍정적인 바디랭귀지</span> - 눈 맞춤, 미소, 열린 자세를 유지하세요</p>
          <p>• <span className="font-semibold text-blue-300">준비된 모습</span> - 외모뿐 아니라 마음가짐도 준비하세요</p>
          <p>• <span className="font-semibold text-blue-300">일관성 유지</span> - 첫인상과 이후 모습이 크게 다르지 않도록 하세요</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
