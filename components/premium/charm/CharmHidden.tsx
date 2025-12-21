'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Search, Gem, Eye, EyeOff, Sparkles, Unlock, Gift } from 'lucide-react';

interface CharmHiddenProps {
  result: SajuResult;
  name: string;
  gender: 'male' | 'female';
}

export default function CharmHidden({ result, name, gender }: CharmHiddenProps) {
  const dayElement = result.day.stem.element;
  const { 식상, 재성, 관성, 인성, 비겁 } = result.tenGodsCount;

  // 숨겨진 매력 발견
  const getHiddenCharms = () => {
    const charms: { [key: string]: {
      title: string;
      hidden: string[];
      whyHidden: string;
      impact: string;
    } } = {
      목: {
        title: '강인한 생명력',
        hidden: [
          '어떤 상황에서도 다시 일어서는 회복력',
          '역경을 성장의 기회로 만드는 긍정성',
          '주변 사람들을 치유하고 회복시키는 힘',
          '절대 포기하지 않는 끈기'
        ],
        whyHidden: '겉으로는 부드럽고 온화해 보여서, 내면의 강인함이 쉽게 드러나지 않습니다. 조용히 견디고 성장하는 스타일이라 타인이 알아채기 어렵습니다.',
        impact: '위기 상황에서 이 매력이 빛을 발합니다. 사람들은 당신의 진짜 강함을 보고 놀라게 될 것입니다.',
      },
      화: {
        title: '깊은 열정과 헌신',
        hidden: [
          '사랑하는 것을 위해 모든 것을 바치는 헌신',
          '표면적 즐거움 뒤에 숨은 진지함',
          '목표를 향한 불타는 집념',
          '진심으로 누군가를 응원하는 순수함'
        ],
        whyHidden: '밝고 쾌활한 모습 때문에 가볍게 보일 수 있지만, 실제로는 매우 진지하고 깊은 사람입니다. 진정한 열정은 특별한 순간에만 보여줍니다.',
        impact: '당신의 진심을 알게 된 사람들은 강렬하게 끌리게 됩니다. 겉모습과 내면의 갭이 큰 매력 포인트입니다.',
      },
      토: {
        title: '포용력과 희생',
        hidden: [
          '누구도 배제하지 않는 넓은 품',
          '말없이 지탱해주는 든든한 지원',
          '자신을 낮추고 타인을 높이는 겸손',
          '오랜 시간 쌓아온 지혜와 통찰'
        ],
        whyHidden: '당연한 듯 베푸는 스타일이라 사람들이 고마움을 잘 모릅니다. 티를 내지 않고 조용히 지원하기 때문에 간과되기 쉽습니다.',
        impact: '당신의 도움이 사라졌을 때 비로소 사람들은 당신의 가치를 깨닫게 됩니다. 소중함은 잃고 나서야 알게 됩니다.',
      },
      금: {
        title: '숨겨진 따뜻함',
        hidden: [
          '차가운 외모 뒤에 숨은 섬세한 배려',
          '엄격한 기준으로 자신을 보호하는 연약함',
          '소수에게만 보여주는 유머와 유연함',
          '완벽주의 뒤에 숨은 두려움과 불안'
        ],
        whyHidden: '스스로를 보호하기 위해 벽을 치는 경향이 있습니다. 쉽게 마음을 열지 않기 때문에 진짜 모습을 아는 사람이 적습니다.',
        impact: '당신의 진짜 모습을 본 사람은 특별함을 느끼고, 더욱 깊은 신뢰를 형성하게 됩니다.',
      },
      수: {
        title: '천재성과 독창성',
        hidden: [
          '남들과 완전히 다른 시각과 관점',
          '복잡한 문제를 꿰뚫는 통찰력',
          '평범함 속에 숨겨진 비범함',
          '조용히 세상을 바꾸는 혁신의 씨앗'
        ],
        whyHidden: '말수가 적고 자신을 드러내지 않는 성향 때문에, 뛰어난 능력이 묻혀 있습니다. 스스로도 자신의 특별함을 잘 모를 수 있습니다.',
        impact: '당신의 아이디어나 관점이 세상에 나왔을 때, 사람들은 놀라움을 금치 못합니다. 조용한 천재의 전형입니다.',
      },
    };
    return charms[dayElement] || charms.목;
  };

  // 사주로 본 숨겨진 재능
  const getHiddenTalents = () => {
    const talents = [];

    if (식상 >= 2) {
      talents.push({
        talent: '예술적 감각과 창조성',
        description: '일상에서는 평범해 보이지만, 창작 활동을 할 때 놀라운 재능을 발휘합니다.',
        discovery: '그림, 글쓰기, 음악 등 표현 활동을 해보세요. 생각보다 뛰어난 작품이 나올 것입니다.',
      });
    }

    if (재성 >= 2) {
      talents.push({
        talent: '경제적 감각과 실용성',
        description: '돈과 자원을 다루는 능력이 뛰어나지만, 스스로 과소평가하는 경향이 있습니다.',
        discovery: '투자나 재테크를 공부해보세요. 숫자를 다루는 직관이 예상보다 훌륭할 것입니다.',
      });
    }

    if (관성 >= 2) {
      talents.push({
        talent: '리더십과 조직 관리',
        description: '앞장서기를 꺼려하지만, 실제로는 훌륭한 리더의 자질을 갖추고 있습니다.',
        discovery: '작은 그룹이라도 이끌어보는 경험을 해보세요. 의외의 추진력이 발견될 것입니다.',
      });
    }

    if (인성 >= 2) {
      talents.push({
        talent: '학습 능력과 전문성',
        description: '무엇이든 깊이 파고들어 전문가가 될 수 있는 잠재력이 있습니다.',
        discovery: '관심 있는 분야를 체계적으로 공부해보세요. 전문가 수준까지 도달할 수 있습니다.',
      });
    }

    if (비겁 >= 1) {
      talents.push({
        talent: '소통과 네트워킹',
        description: '사람들과 관계를 맺고 유지하는 능력이 뛰어나지만, 그 가치를 모를 수 있습니다.',
        discovery: '다양한 사람들을 만나보세요. 자연스럽게 좋은 인맥이 형성될 것입니다.',
      });
    }

    return talents.slice(0, 3);
  };

  // 숨겨진 매력 발견 방법
  const getDiscoveryMethods = () => {
    const methods = [
      {
        category: '자기 성찰',
        icon: Search,
        methods: [
          '일기를 쓰면서 자신의 생각과 감정을 탐구하세요',
          '명상이나 조용한 시간을 통해 내면을 들여다보세요',
          '과거의 성공 경험을 분석해서 강점을 찾으세요',
          '신뢰하는 사람에게 당신의 장점을 물어보세요',
        ],
      },
      {
        category: '새로운 도전',
        icon: Unlock,
        methods: [
          '평소 하지 않던 새로운 활동을 시도해보세요',
          '두려움이 느껴지는 일에 도전해보세요 - 거기에 성장이 있습니다',
          '익숙한 환경을 벗어나 낯선 곳에 가보세요',
          '다양한 사람들과 교류하며 새로운 자극을 받으세요',
        ],
      },
      {
        category: '관계 속 발견',
        icon: Eye,
        methods: [
          '깊은 대화를 나눌 수 있는 사람을 찾으세요',
          '당신을 있는 그대로 받아들여주는 관계를 만드세요',
          '다른 사람을 도우면서 자신의 가치를 발견하세요',
          '사랑하는 사람 앞에서는 숨겨진 면이 자연스럽게 드러납니다',
        ],
      },
    ];
    return methods;
  };

  // 매력을 가리는 요인
  const getBlockingFactors = () => {
    const factors: { [key: string]: {
      factor: string;
      reason: string;
      solution: string;
    }[] } = {
      목: [
        {
          factor: '지나친 겸손',
          reason: '자신을 낮추고 타인을 배려하다 보니, 정작 자신의 가치를 제대로 보여주지 못합니다',
          solution: '겸손은 미덕이지만, 자신의 성취도 당당하게 인정하세요. 자랑이 아닌 사실의 공유입니다.',
        },
        {
          factor: '거절하지 못하는 성격',
          reason: '모든 사람의 요청을 들어주다 보니, 정작 자신을 위한 시간이 없습니다',
          solution: '선택과 집중이 필요합니다. 중요한 것에 에너지를 쏟을 수 있도록 NO라고 말하는 연습을 하세요.',
        },
      ],
      화: [
        {
          factor: '겉으로 드러나는 밝음',
          reason: '항상 밝고 즐거운 모습만 보이려 하다 보니, 깊이 있는 면이 가려집니다',
          solution: '진지한 모습도 보여주세요. 모든 순간 밝을 필요는 없습니다. 진솔함이 더 매력적입니다.',
        },
        {
          factor: '빠른 감정 표현',
          reason: '감정을 즉각적으로 표현하다 보니, 깊은 생각을 가진 사람으로 보이지 않을 수 있습니다',
          solution: '때로는 생각을 정리한 후에 말하세요. 즉흥성과 신중함의 균형을 찾으세요.',
        },
      ],
      토: [
        {
          factor: '표현의 부족',
          reason: '마음속에 많은 것을 가지고 있지만, 말이나 행동으로 표현하지 않습니다',
          solution: '조금씩이라도 자신의 생각과 감정을 표현하는 연습을 하세요. 사람들이 알아주길 기대만 하지 마세요.',
        },
        {
          factor: '변화에 대한 두려움',
          reason: '안정을 추구하다 보니, 새로운 모습을 보여주는 것을 꺼립니다',
          solution: '작은 변화부터 시도해보세요. 안정은 유지하되, 정체되지 않도록 하세요.',
        },
      ],
      금: [
        {
          factor: '높은 벽',
          reason: '스스로를 보호하기 위해 사람들과 거리를 둡니다',
          solution: '선택적으로 마음을 열어보세요. 모든 사람에게 열 필요는 없지만, 신뢰할 수 있는 사람에게는 진심을 보여주세요.',
        },
        {
          factor: '완벽주의',
          reason: '완벽하지 않으면 보여주지 않으려는 경향이 있습니다',
          solution: '불완전함도 매력이 될 수 있습니다. 70% 정도만 준비되어도 보여주는 용기를 가지세요.',
        },
      ],
      수: [
        {
          factor: '과도한 내향성',
          reason: '혼자 있는 것을 좋아하고, 자신을 드러내는 것을 불편해합니다',
          solution: '완전히 변할 필요는 없지만, 가끔은 자신에 대해 이야기해보세요. 조금씩 열어가는 것이 중요합니다.',
        },
        {
          factor: '복잡한 사고',
          reason: '생각이 너무 깊고 복잡해서, 간단하게 표현하는 것을 어려워합니다',
          solution: '핵심만 간결하게 전달하는 연습을 하세요. 모든 맥락을 설명할 필요는 없습니다.',
        },
      ],
    };
    return factors[dayElement] || factors.목;
  };

  const hiddenCharms = getHiddenCharms();
  const hiddenTalents = getHiddenTalents();
  const discoveryMethods = getDiscoveryMethods();
  const blockingFactors = getBlockingFactors();

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
          숨겨진 매력
        </h2>
        <p className="text-slate-300">
          {name}님도 모르는 내면의 보석 같은 매력들
        </p>
      </div>

      {/* Hidden Charms */}
      <motion.div
        className="glass rounded-2xl p-6 mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
            <Gem className="w-6 h-6 text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-purple-400 mb-2">숨겨진 매력</h3>
            <h4 className="text-2xl font-bold text-white mb-4">{hiddenCharms.title}</h4>

            <div className="space-y-2 mb-4">
              {hiddenCharms.hidden.map((charm, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                >
                  <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0 mt-1" />
                  <p className="text-purple-200 text-sm">{charm}</p>
                </motion.div>
              ))}
            </div>

            <div className="p-4 rounded-lg bg-slate-800/50 mb-3">
              <p className="text-slate-200 text-sm mb-1">
                <span className="font-semibold text-purple-400">왜 숨겨져 있나요?</span>
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">
                {hiddenCharms.whyHidden}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-pink-500/20">
              <p className="text-slate-200 text-sm mb-1">
                <span className="font-semibold text-pink-400">💎 이 매력의 영향력</span>
              </p>
              <p className="text-pink-200 text-sm">
                {hiddenCharms.impact}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hidden Talents */}
      <motion.div
        className="glass rounded-2xl p-6 mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20">
            <Gift className="w-6 h-6 text-amber-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-amber-400 mb-4">숨겨진 재능</h3>

            <div className="space-y-4">
              {hiddenTalents.map((talent, idx) => (
                <motion.div
                  key={idx}
                  className="p-5 rounded-lg bg-slate-800/50 border border-amber-500/20"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                >
                  <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    {talent.talent}
                  </h4>
                  <p className="text-slate-300 text-sm mb-3">
                    {talent.description}
                  </p>
                  <div className="p-3 rounded-lg bg-amber-500/10">
                    <p className="text-amber-300 text-xs">
                      🔍 <span className="font-semibold">발견 방법:</span> {talent.discovery}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Discovery Methods */}
      <motion.div
        className="glass rounded-2xl p-6 mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
            <Search className="w-6 h-6 text-cyan-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-cyan-400 mb-4">매력 발견 방법</h3>

            <div className="space-y-4">
              {discoveryMethods.map((method, idx) => {
                const IconComponent = method.icon;
                return (
                  <motion.div
                    key={idx}
                    className="p-5 rounded-lg bg-slate-800/50"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + idx * 0.1 }}
                  >
                    <h4 className="font-bold text-cyan-300 mb-3 flex items-center gap-2">
                      <IconComponent className="w-5 h-5" />
                      {method.category}
                    </h4>
                    <div className="space-y-2">
                      {method.methods.map((m, midx) => (
                        <div
                          key={midx}
                          className="flex items-start gap-2 text-slate-300 text-sm pl-2"
                        >
                          <span className="text-cyan-400 flex-shrink-0">•</span>
                          <p className="leading-relaxed">{m}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Blocking Factors */}
      <motion.div
        className="glass rounded-2xl p-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-red-500/20 to-rose-500/20">
            <EyeOff className="w-6 h-6 text-red-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-red-400 mb-4">매력을 가리는 요인</h3>

            <div className="space-y-4">
              {blockingFactors.map((factor, idx) => (
                <motion.div
                  key={idx}
                  className="p-5 rounded-lg bg-slate-800/50 border border-red-500/20"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + idx * 0.1 }}
                >
                  <h4 className="font-bold text-red-300 mb-2">
                    🚫 {factor.factor}
                  </h4>
                  <p className="text-slate-300 text-sm mb-3">
                    <span className="font-semibold text-red-400">이유:</span> {factor.reason}
                  </p>
                  <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/20">
                    <p className="text-emerald-300 text-sm">
                      <span className="font-semibold">✅ 해결책:</span> {factor.solution}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Final Message */}
      <motion.div
        className="mt-6 p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <h4 className="font-bold text-purple-400 mb-3 text-lg flex items-center gap-2">
          <Gem className="w-5 h-5" />
          숨겨진 매력을 발견하는 여정
        </h4>
        <div className="space-y-3 text-slate-200 text-sm leading-relaxed">
          <p className="text-base font-semibold text-purple-300">
            당신 안에는 아직 발견되지 않은 보석 같은 매력들이 숨어 있습니다.
          </p>
          <p>• <span className="font-semibold text-purple-300">자신을 탐구하세요</span> - 혼자만의 시간을 통해 내면의 목소리를 들어보세요</p>
          <p>• <span className="font-semibold text-purple-300">도전하세요</span> - 새로운 경험 속에서 몰랐던 자신을 발견할 수 있습니다</p>
          <p>• <span className="font-semibold text-purple-300">피드백을 구하세요</span> - 다른 사람의 눈에 비친 당신의 모습을 알아보세요</p>
          <p>• <span className="font-semibold text-purple-300">있는 그대로를 사랑하세요</span> - 자신을 인정하고 사랑할 때 진짜 매력이 빛납니다</p>
          <p className="pt-2 text-purple-300 italic">
            &quot;가장 아름다운 것들은 눈에 보이지 않습니다. 마음으로 느껴야 하죠.&quot; - 어린왕자
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
