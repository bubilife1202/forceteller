'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Calendar, TrendingUp, Sparkles, Crown, Heart, Zap } from 'lucide-react';

interface CharmByAgeProps {
  result: SajuResult;
  name: string;
  gender: 'male' | 'female';
}

export default function CharmByAge({ result, name, gender }: CharmByAgeProps) {
  const dayElement = result.day.stem.element;
  const { 식상, 재성, 관성, 인성, 비겁 } = result.tenGodsCount;

  // 나이대별 매력 변화
  const getCharmByAge = () => {
    const charms: { [key: string]: {
      age20s: {
        charm: string;
        description: string;
        keywords: string[];
        advice: string;
      };
      age30s: {
        charm: string;
        description: string;
        keywords: string[];
        advice: string;
      };
      age40s: {
        charm: string;
        description: string;
        keywords: string[];
        advice: string;
      };
      age50sPlus: {
        charm: string;
        description: string;
        keywords: string[];
        advice: string;
      };
    } } = {
      목: {
        age20s: {
          charm: '풋풋한 순수함과 성장 잠재력',
          description: '20대의 당신은 마치 새싹처럼 신선하고 생명력이 넘칩니다. 순수하게 타인을 대하고, 배우려는 열정이 가득한 모습이 매력적입니다. 아직 세상에 물들지 않은 진심이 사람들을 끌어당깁니다.',
          keywords: ['순수함', '성장 가능성', '배움의 열정', '진심'],
          advice: '이 시기의 순수함을 잃지 마세요. 많은 경험을 쌓되, 진심으로 사람을 대하는 마음은 지키세요.',
        },
        age30s: {
          charm: '성숙한 배려와 포용력',
          description: '30대에는 경험이 쌓이면서 타인을 이해하고 배려하는 능력이 깊어집니다. 단순히 좋은 사람을 넘어서, 누구에게나 편안한 안식처가 되는 존재감이 생깁니다. 성장한 모습이 신뢰를 줍니다.',
          keywords: ['깊은 배려', '포용력', '신뢰감', '안정감'],
          advice: '자신의 꿈도 중요합니다. 타인을 돌보되, 자신의 성장도 놓치지 마세요.',
        },
        age40s: {
          charm: '지혜로운 멘토의 풍모',
          description: '40대에는 많은 경험을 통해 얻은 지혜가 빛을 발합니다. 젊은이들에게는 든든한 조언자가 되고, 동료들에게는 신뢰받는 파트너가 됩니다. 나이 듦이 곧 매력의 증가로 이어집니다.',
          keywords: ['지혜', '멘토십', '깊이', '신뢰'],
          advice: '경험을 나누는 것을 주저하지 마세요. 당신의 이야기는 누군가에게 큰 도움이 됩니다.',
        },
        age50sPlus: {
          charm: '자연스러운 품격과 인생의 여유',
          description: '50대 이후에는 억지로 꾸미지 않아도 저절로 풍기는 품격이 생깁니다. 인생의 희로애락을 겪으며 얻은 통찰과 여유로움이 최고의 매력입니다. 존재 자체가 위로가 되는 사람입니다.',
          keywords: ['품격', '여유', '통찰', '포용'],
          advice: '나이를 두려워하지 마세요. 당신은 나이가 들수록 더 아름다워지는 사람입니다.',
        },
      },
      화: {
        age20s: {
          charm: '불타는 열정과 밝은 에너지',
          description: '20대의 당신은 태양처럼 밝고 뜨겁습니다. 무엇이든 할 수 있을 것 같은 자신감과, 실제로 도전하는 용기가 매력적입니다. 주변을 환하게 밝히는 에너지가 사람들을 끌어당깁니다.',
          keywords: ['열정', '도전', '밝음', '에너지'],
          advice: '열정을 마음껏 발산하세요. 다만 건강과 지속 가능성도 생각하세요.',
        },
        age30s: {
          charm: '목표를 향한 추진력과 카리스마',
          description: '30대에는 열정이 구체적인 목표와 만나면서 강력한 추진력이 됩니다. 무언가를 이루어가는 모습이 카리스마로 느껴지며, 리더십이 빛을 발하기 시작합니다. 성숙한 열정이 매력적입니다.',
          keywords: ['추진력', '카리스마', '리더십', '성취'],
          advice: '다른 사람도 함께 빛날 수 있게 해주세요. 혼자 타오르기보다 함께 불타오르세요.',
        },
        age40s: {
          charm: '안정된 정열과 영향력',
          description: '40대에는 경험을 통해 얻은 지혜가 열정과 결합됩니다. 단순히 뜨거운 것이 아니라, 방향성 있고 의미 있는 열정이 됩니다. 주변에 긍정적 영향을 미치는 존재가 됩니다.',
          keywords: ['영향력', '의미', '긍정성', '균형'],
          advice: '열정을 나누세요. 당신의 에너지는 다음 세대에게 큰 영감이 됩니다.',
        },
        age50sPlus: {
          charm: '따뜻한 온기와 인생의 깊이',
          description: '50대 이후에는 불꽃같던 열정이 따뜻한 온기로 변합니다. 겉으로 드러나는 화려함보다, 내면에서 우러나오는 진정한 따뜻함이 매력입니다. 인생을 즐길 줄 아는 여유가 생깁니다.',
          keywords: ['온기', '여유', '진정성', '즐거움'],
          advice: '젊음에 집착하지 마세요. 당신만의 온기는 어떤 열정보다 아름답습니다.',
        },
      },
      토: {
        age20s: {
          charm: '믿음직한 안정감과 성실함',
          description: '20대임에도 불구하고 어른스럽고 믿음직한 모습이 매력적입니다. 또래들보다 성숙하고 책임감 있는 태도가 신뢰를 줍니다. 튼튼한 기반을 만들어가는 모습이 인상적입니다.',
          keywords: ['성실', '책임감', '신뢰', '성숙'],
          advice: '너무 빨리 어른이 되려 하지 마세요. 20대의 자유로움도 즐기세요.',
        },
        age30s: {
          charm: '깊어진 신뢰와 전문성',
          description: '30대에는 쌓아온 경험과 실력이 확실한 전문성으로 자리잡습니다. 말보다 실력으로 증명하는 모습이 설득력 있고 매력적입니다. 의지할 수 있는 든든한 존재가 됩니다.',
          keywords: ['전문성', '실력', '든든함', '신뢰'],
          advice: '변화도 두려워하지 마세요. 안정 속에서도 성장할 수 있습니다.',
        },
        age40s: {
          charm: '포용력과 중재 능력',
          description: '40대에는 다양한 사람과 상황을 경험하며 넓은 포용력이 생깁니다. 갈등을 중재하고, 화합을 이끌어내는 능력이 뛰어납니다. 모두를 편안하게 만드는 힘이 있습니다.',
          keywords: ['포용', '중재', '화합', '균형'],
          advice: '자신의 의견도 표현하세요. 중재만 하다 보면 자신을 잃을 수 있습니다.',
        },
        age50sPlus: {
          charm: '어른의 품격과 깊은 인내심',
          description: '50대 이후에는 세월이 만든 진정한 품격이 드러납니다. 서두르지 않고 묵묵히 지켜보는 인내심, 누구도 배제하지 않는 너그러움이 최고의 매력입니다. 존경받는 어른이 됩니다.',
          keywords: ['품격', '인내', '너그러움', '존경'],
          advice: '경험을 전수하세요. 당신의 지혜는 다음 세대의 자산입니다.',
        },
      },
      금: {
        age20s: {
          charm: '예리한 재능과 독특한 개성',
          description: '20대의 당신은 날카로운 재능과 뚜렷한 개성이 빛납니다. 자기만의 확고한 기준이 있어서 쉽게 흔들리지 않는 모습이 인상적입니다. 프로페셔널한 태도가 또래들 사이에서 돋보입니다.',
          keywords: ['재능', '개성', '전문성', '독립성'],
          advice: '완벽을 추구하되, 유연함도 배우세요. 때로는 융통성이 필요합니다.',
        },
        age30s: {
          charm: '세련된 품격과 능력',
          description: '30대에는 갈고닦은 실력과 품격이 완벽하게 어우러집니다. 자신의 분야에서 인정받는 전문가가 되며, 세련된 이미지가 강력한 매력 포인트가 됩니다. 우아함과 능력을 동시에 갖춘 모습입니다.',
          keywords: ['세련', '전문가', '품격', '능력'],
          advice: '사람들과의 관계도 소중히 하세요. 실력만큼 인간관계도 중요합니다.',
        },
        age40s: {
          charm: '권위와 리더십',
          description: '40대에는 자연스럽게 권위가 생기고, 리더로서의 카리스마가 발휘됩니다. 명확한 판단력과 추진력으로 조직을 이끌어가는 모습이 매력적입니다. 존중받는 리더가 됩니다.',
          keywords: ['권위', '리더십', '판단력', '카리스마'],
          advice: '부드러움도 갖추세요. 강함만으로는 사람의 마음을 얻기 어렵습니다.',
        },
        age50sPlus: {
          charm: '고귀한 품위와 지성',
          description: '50대 이후에는 평생 갈고닦은 품위가 자연스럽게 드러납니다. 억지로 만들지 않아도 고귀함이 느껴지며, 깊은 지성과 통찰력이 빛을 발합니다. 진정한 품격을 갖춘 어른입니다.',
          keywords: ['품위', '지성', '통찰', '고귀함'],
          advice: '완벽주의를 내려놓으세요. 불완전함을 인정하는 것도 품격입니다.',
        },
      },
      수: {
        age20s: {
          charm: '신비로운 매력과 잠재력',
          description: '20대의 당신은 알 수 없는 신비로움이 매력적입니다. 겉으로 드러나지 않는 깊이가 있어서, 사람들이 더 알고 싶어하게 만듭니다. 무한한 가능성을 품은 모습이 흥미롭습니다.',
          keywords: ['신비', '잠재력', '깊이', '독특함'],
          advice: '자신을 조금씩 열어보세요. 신비로움은 좋지만, 소통도 필요합니다.',
        },
        age30s: {
          charm: '지적 매력과 독창성',
          description: '30대에는 내면의 지혜가 구체적인 형태로 드러나기 시작합니다. 독창적인 아이디어와 깊은 통찰력이 주변 사람들을 감탄하게 만듭니다. 지성의 매력이 전성기를 맞이합니다.',
          keywords: ['지성', '독창성', '통찰', '혁신'],
          advice: '아이디어를 현실화하세요. 생각만 하지 말고 실행으로 옮기세요.',
        },
        age40s: {
          charm: '깊은 통찰력과 지혜',
          description: '40대에는 오랜 사색과 경험이 만나 진정한 지혜가 됩니다. 복잡한 문제를 꿰뚫어보는 통찰력이 뛰어나며, 조용하지만 강력한 영향력을 발휘합니다. 현자의 면모가 드러납니다.',
          keywords: ['지혜', '통찰력', '영향력', '현자'],
          advice: '지혜를 나누세요. 혼자만 알고 있기에는 너무 아까운 것들입니다.',
        },
        age50sPlus: {
          charm: '초월적 평온과 깊은 이해',
          description: '50대 이후에는 세속적인 것들을 초월한 평온함이 생깁니다. 모든 것을 이해하고 받아들이는 넓은 마음, 집착하지 않는 자유로움이 최고의 매력입니다. 도인의 경지에 이릅니다.',
          keywords: ['평온', '초월', '자유', '깨달음'],
          advice: '세상과 소통하세요. 깨달음은 나누어질 때 더 빛납니다.',
        },
      },
    };
    return charms[dayElement] || charms.목;
  };

  // 매력 발전 곡선
  const getCharmCurve = () => {
    const curves: { [key: string]: {
      type: string;
      description: string;
      peak: string;
      tip: string;
    } } = {
      목: {
        type: '우상향 곡선 - 시간이 지날수록 매력 증가',
        description: '나이가 들수록 깊어지는 배려심과 포용력으로 매력이 계속 증가합니다. 젊을 때보다 나이 들었을 때 더 아름다운 사람입니다.',
        peak: '50대 이후 - 인생의 지혜가 완성되는 시기',
        tip: '서두르지 마세요. 당신의 진가는 시간이 지나야 드러납니다.',
      },
      화: {
        type: '높은 출발 후 안정화 - 젊을 때 정점, 이후 안정적 유지',
        description: '젊을 때의 폭발적인 매력이 나이 들면서 안정되고 성숙한 매력으로 변화합니다. 화려함에서 따뜻함으로 진화합니다.',
        peak: '20대 후반~30대 초반 - 열정과 성숙함이 만나는 시기',
        tip: '젊은 시절의 에너지를 잘 활용하세요. 하지만 나이 듦도 두려워하지 마세요.',
      },
      토: {
        type: '점진적 상승 후 정체기 - 꾸준히 증가 후 유지',
        description: '꾸준히 쌓아온 신뢰와 전문성이 중년에 정점을 이루고, 이후 안정적으로 유지됩니다. 변화는 적지만 일관된 매력을 유지합니다.',
        peak: '40대 - 경험과 실력이 완성되는 시기',
        tip: '정체기를 두려워하지 마세요. 안정적인 매력도 큰 가치입니다.',
      },
      금: {
        type: '계단식 상승 - 단계마다 새로운 매력 발견',
        description: '각 나이대마다 다른 형태의 매력이 발현됩니다. 재능→품격→권위→품위로 진화하며, 매 단계가 새로운 정점입니다.',
        peak: '전 생애에 걸쳐 다양한 정점 - 각 시기마다 다른 매력',
        tip: '각 시기의 매력을 충분히 누리세요. 다음 단계를 조급해하지 마세요.',
      },
      수: {
        type: '지연된 개화 - 늦게 피지만 오래가는 매력',
        description: '젊을 때는 숨겨져 있다가, 나이 들면서 점차 드러나는 매력입니다. 40대 이후 본격적으로 빛을 발하며, 오래도록 지속됩니다.',
        peak: '40대 후반~50대 - 지혜가 완성되고 드러나는 시기',
        tip: '조급해하지 마세요. 당신의 매력은 천천히, 그러나 확실하게 피어납니다.',
      },
    };
    return curves[dayElement] || curves.목;
  };

  // 나이대별 조언
  const getAgeSpecificAdvice = () => {
    const advice = [];

    // 식상 기반 조언
    if (식상 >= 2) {
      advice.push({
        age: '전 연령',
        topic: '표현력 활용',
        advice: '창의성은 나이와 상관없이 발휘할 수 있습니다. 젊을 때는 신선함으로, 나이 들어서는 깊이로 표현하세요.',
      });
    }

    // 재성 기반 조언
    if (재성 >= 2) {
      advice.push({
        age: '30~40대',
        topic: '경제적 안정기',
        advice: '이 시기의 실용적 능력이 가장 빛을 발합니다. 재정적 안정이 자신감과 매력으로 이어집니다.',
      });
    }

    // 관성 기반 조언
    if (관성 >= 2) {
      advice.push({
        age: '40~50대',
        topic: '리더십 발휘',
        advice: '경험이 쌓인 이 시기에 리더십이 가장 빛납니다. 후배들을 이끄는 멘토가 되어보세요.',
      });
    }

    // 인성 기반 조언
    if (인성 >= 2) {
      advice.push({
        age: '50대 이후',
        topic: '지혜 나눔',
        advice: '평생 축적한 지식과 통찰을 나눌 때입니다. 강의, 집필, 멘토링 등을 고려해보세요.',
      });
    }

    // 비겁 기반 조언
    if (비겁 >= 2) {
      advice.push({
        age: '전 연령',
        topic: '관계 관리',
        advice: '사람과의 관계는 평생의 자산입니다. 각 나이대마다 다양한 연령층과 교류하세요.',
      });
    }

    return advice.slice(0, 3);
  };

  const charmByAge = getCharmByAge();
  const charmCurve = getCharmCurve();
  const ageAdvice = getAgeSpecificAdvice();

  const ageGroups = [
    {
      title: '20대',
      data: charmByAge.age20s,
      icon: Sparkles,
      color: 'from-pink-500/20 to-rose-500/20',
      textColor: 'text-pink-400',
      borderColor: 'border-pink-500/20'
    },
    {
      title: '30대',
      data: charmByAge.age30s,
      icon: Zap,
      color: 'from-purple-500/20 to-pink-500/20',
      textColor: 'text-purple-400',
      borderColor: 'border-purple-500/20'
    },
    {
      title: '40대',
      data: charmByAge.age40s,
      icon: Crown,
      color: 'from-amber-500/20 to-orange-500/20',
      textColor: 'text-amber-400',
      borderColor: 'border-amber-500/20'
    },
    {
      title: '50대+',
      data: charmByAge.age50sPlus,
      icon: Heart,
      color: 'from-blue-500/20 to-cyan-500/20',
      textColor: 'text-blue-400',
      borderColor: 'border-blue-500/20'
    },
  ];

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
          나이대별 매력 변화
        </h2>
        <p className="text-slate-300">
          {name}님의 매력이 시간에 따라 어떻게 변화하고 발전하는지
        </p>
      </div>

      {/* Charm Curve */}
      <motion.div
        className="glass rounded-2xl p-6 mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20">
            <TrendingUp className="w-6 h-6 text-green-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-green-400 mb-2">매력 발전 곡선</h3>
            <h4 className="text-lg font-semibold text-white mb-3">{charmCurve.type}</h4>

            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-slate-800/50">
                <p className="text-slate-200 text-sm leading-relaxed">
                  {charmCurve.description}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
                <p className="text-slate-200 text-sm mb-1">
                  <span className="font-semibold text-green-400">🌟 매력의 정점</span>
                </p>
                <p className="text-green-200 text-sm">{charmCurve.peak}</p>
              </div>

              <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                <p className="text-slate-200 text-sm mb-1">
                  <span className="font-semibold text-blue-400">💡 핵심 팁</span>
                </p>
                <p className="text-blue-200 text-sm">{charmCurve.tip}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Age Groups */}
      {ageGroups.map((group, idx) => {
        const IconComponent = group.icon;
        return (
          <motion.div
            key={group.title}
            className="glass rounded-2xl p-6 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + idx * 0.15 }}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${group.color}`}>
                <IconComponent className={`w-6 h-6 ${group.textColor}`} />
              </div>
              <div className="flex-1">
                <h3 className={`text-xl font-bold ${group.textColor} mb-2`}>{group.title}</h3>
                <h4 className="text-lg font-semibold text-white mb-3">{group.data.charm}</h4>

                <div className="p-4 rounded-lg bg-slate-800/50 mb-4">
                  <p className="text-slate-200 text-sm leading-relaxed">
                    {group.data.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  {group.data.keywords.map((keyword, kidx) => (
                    <div
                      key={kidx}
                      className={`px-3 py-2 bg-gradient-to-br ${group.color} rounded-lg ${group.textColor} text-sm text-center border ${group.borderColor}`}
                    >
                      {keyword}
                    </div>
                  ))}
                </div>

                <div className={`p-4 rounded-lg bg-gradient-to-br ${group.color} border ${group.borderColor}`}>
                  <p className="text-slate-200 text-sm mb-1">
                    <span className={`font-semibold ${group.textColor}`}>💫 이 시기의 조언</span>
                  </p>
                  <p className="text-slate-300 text-sm">
                    {group.data.advice}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Age-Specific Advice */}
      {ageAdvice.length > 0 && (
        <motion.div
          className="glass rounded-2xl p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
              <Calendar className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">특별 조언</h3>

              <div className="space-y-4">
                {ageAdvice.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="p-5 rounded-lg bg-slate-800/50 border border-cyan-500/20"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 + idx * 0.1 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-cyan-500/20 rounded-full text-cyan-300 text-xs font-semibold">
                        {item.age}
                      </span>
                      <h4 className="font-bold text-white">{item.topic}</h4>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed pl-4 border-l-2 border-cyan-500/30">
                      {item.advice}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Life-Long Charm Message */}
      <motion.div
        className="mt-6 p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
      >
        <h4 className="font-bold text-purple-400 mb-3 text-lg flex items-center gap-2">
          <Heart className="w-5 h-5" />
          나이 듦의 아름다움
        </h4>
        <div className="space-y-3 text-slate-200 text-sm leading-relaxed">
          <p className="text-base font-semibold text-purple-300">
            매력은 나이와 함께 변화하고 진화합니다.
          </p>
          <p>• <span className="font-semibold text-purple-300">젊음만이 매력이 아닙니다</span> - 각 나이대마다 고유한 아름다움이 있습니다</p>
          <p>• <span className="font-semibold text-purple-300">과거를 그리워하지 마세요</span> - 지금 이 순간의 당신이 가장 아름답습니다</p>
          <p>• <span className="font-semibold text-purple-300">나이 듦을 두려워하지 마세요</span> - 시간은 당신을 더 깊고 풍성하게 만듭니다</p>
          <p>• <span className="font-semibold text-purple-300">각 단계를 충분히 누리세요</span> - 서두르지 말고, 지금의 매력을 즐기세요</p>
          <p>• <span className="font-semibold text-purple-300">나이에 맞는 품위를 갖추세요</span> - 젊어 보이려 애쓰기보다, 나이답게 아름다워지세요</p>
          <p className="pt-2 text-purple-300 italic">
            &quot;나이가 들면서 우리는 아름다워지거나 추해지는 것이 아니라, 더 자기다워집니다.&quot; - 코코 샤넬
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
