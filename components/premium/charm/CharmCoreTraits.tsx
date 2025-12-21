'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Leaf, Flame, Mountain, Gem, Droplet } from 'lucide-react';

interface CharmCoreTraitsProps {
  result: SajuResult;
  name: string;
}

export default function CharmCoreTraits({ result, name }: CharmCoreTraitsProps) {
  // 오행별 매력 점수 계산
  const calculateElementCharms = () => {
    const elements = {
      목: 0,
      화: 0,
      토: 0,
      금: 0,
      수: 0,
    };

    // 사주 팔자에서 오행 카운트
    [result.year, result.month, result.day, result.hour].forEach(pillar => {
      const stemElement = pillar.stem.element;
      const branchElement = pillar.branch.element;
      elements[stemElement as keyof typeof elements]++;
      elements[branchElement as keyof typeof elements]++;
    });

    return {
      목: Math.min((elements.목 / 8) * 100, 100),
      화: Math.min((elements.화 / 8) * 100, 100),
      토: Math.min((elements.토 / 8) * 100, 100),
      금: Math.min((elements.금 / 8) * 100, 100),
      수: Math.min((elements.수 / 8) * 100, 100),
    };
  };

  const elementCharms = calculateElementCharms();

  const charms = [
    {
      element: '목',
      icon: Leaf,
      name: '성장의 매력',
      color: 'text-green-400',
      bgColor: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-500/30',
      score: elementCharms.목,
      description: '끊임없이 발전하고 성장하려는 의지가 돋보입니다',
      traits: [
        '새로운 것을 배우고 도전하는 모습이 매력적',
        '꾸준히 성장하는 모습에서 희망을 줌',
        '생명력 넘치는 에너지가 주변을 밝게 함',
        '미래 지향적인 사고방식이 돋보임',
      ],
      strengthArea: '새로운 프로젝트나 도전에서 특히 빛남',
    },
    {
      element: '화',
      icon: Flame,
      name: '열정의 매력',
      color: 'text-red-400',
      bgColor: 'from-red-500/20 to-orange-500/20',
      borderColor: 'border-red-500/30',
      score: elementCharms.화,
      description: '뜨겁고 열정적인 에너지로 사람들을 감동시킵니다',
      traits: [
        '하는 일에 진심으로 몰입하는 모습이 매력적',
        '밝고 긍정적인 에너지가 전염됨',
        '표현이 풍부하고 감정이 진솔함',
        '리더십과 추진력이 강함',
      ],
      strengthArea: '사람들 앞에서 발표하거나 이끌 때 빛남',
    },
    {
      element: '토',
      icon: Mountain,
      name: '안정의 매력',
      color: 'text-yellow-400',
      bgColor: 'from-yellow-500/20 to-amber-500/20',
      borderColor: 'border-yellow-500/30',
      score: elementCharms.토,
      description: '믿음직하고 포근한 분위기로 안정감을 줍니다',
      traits: [
        '함께 있으면 편안하고 안정감을 느낌',
        '신뢰할 수 있는 든든한 존재',
        '배려심이 깊고 따뜻함',
        '차분하고 성숙한 면모',
      ],
      strengthArea: '사람들을 포용하고 중재할 때 빛남',
    },
    {
      element: '금',
      icon: Gem,
      name: '세련의 매력',
      color: 'text-slate-300',
      bgColor: 'from-slate-400/20 to-zinc-400/20',
      borderColor: 'border-slate-400/30',
      score: elementCharms.금,
      description: '우아하고 세련된 품격이 돋보입니다',
      traits: [
        '정갈하고 깔끔한 이미지',
        '품격 있는 말투와 행동',
        '결단력 있고 명확한 태도',
        '전문가적 분위기',
      ],
      strengthArea: '공식적이고 전문적인 자리에서 빛남',
    },
    {
      element: '수',
      icon: Droplet,
      name: '지혜의 매력',
      color: 'text-blue-400',
      bgColor: 'from-blue-500/20 to-indigo-500/20',
      borderColor: 'border-blue-500/30',
      score: elementCharms.수,
      description: '깊이 있는 사고와 통찰력으로 감동을 줍니다',
      traits: [
        '알수록 깊이가 느껴지는 매력',
        '상황을 파악하는 지혜로움',
        '유연하고 적응력이 뛰어남',
        '신비롭고 독특한 분위기',
      ],
      strengthArea: '깊은 대화나 전략적 사고가 필요할 때 빛남',
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
          5가지 핵심 매력
        </h2>
        <p className="text-slate-300">
          오행(五行) 기운에서 나타나는 {name}님만의 매력 포인트
        </p>
      </div>

      <div className="space-y-6">
        {charms.map((charm, index) => {
          const Icon = charm.icon;
          return (
            <motion.div
              key={charm.element}
              className={`glass rounded-2xl p-6 border ${charm.borderColor}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${charm.bgColor}`}>
                  <Icon className={`w-6 h-6 ${charm.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`text-xl font-bold ${charm.color}`}>
                      {charm.name}
                    </h3>
                    <span className={`text-lg font-bold ${charm.color}`}>
                      {Math.round(charm.score)}%
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm mb-3">
                    {charm.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden mb-4">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${charm.bgColor.replace('/20', '')}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${charm.score}%` }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                    />
                  </div>
                </div>
              </div>

              {/* Traits */}
              <div className="ml-16 space-y-2 mb-4">
                {charm.traits.map((trait, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center gap-2 text-sm text-slate-300"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + idx * 0.05 }}
                  >
                    <span className="text-xs">✓</span>
                    <span>{trait}</span>
                  </motion.div>
                ))}
              </div>

              {/* Strength Area */}
              <div className={`ml-16 p-3 rounded-lg bg-gradient-to-br ${charm.bgColor} border ${charm.borderColor}`}>
                <p className="text-sm text-white">
                  <span className="font-semibold">💫 빛나는 순간:</span> {charm.strengthArea}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary */}
      <motion.div
        className="mt-8 glass rounded-2xl p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h4 className="font-bold text-pink-400 mb-3 text-lg">✨ 매력 조합 총평</h4>
        <p className="text-slate-200 leading-relaxed">
          {name}님의 사주는 {Object.entries(elementCharms)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 2)
            .map(([elem]) => {
              const names = { 목: '성장', 화: '열정', 토: '안정', 금: '세련', 수: '지혜' };
              return names[elem as keyof typeof names];
            })
            .join('과 ')}의 기운이 강하게 나타납니다.
          이는 당신만의 독특한 매력 조합을 만들어내며,
          상황에 따라 다양한 면모를 발휘할 수 있는 다재다능한 매력을 가지고 있음을 의미합니다.
        </p>
      </motion.div>
    </motion.div>
  );
}
