'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { TrendingUp, Target, CheckCircle, Gift, Sparkles } from 'lucide-react';

interface CharmUpgradeProps {
  result: SajuResult;
  name: string;
  gender: 'male' | 'female';
}

export default function CharmUpgrade({ result, name, gender }: CharmUpgradeProps) {
  const dayElement = result.day.stem.element;
  const { 식상, 재성, 관성, 인성, 비겁 } = result.tenGodsCount;

  // 개선 영역 파악
  const getImprovementAreas = () => {
    const areas = [];

    // 십성 부족 영역 분석
    if (식상 < 1) {
      areas.push({
        area: '자기표현력',
        current: '자신의 감정이나 생각을 표현하는 것이 어색할 수 있습니다',
        target: '자신의 의견과 감정을 자연스럽게 표현하는 능력',
        benefits: '소통이 원활해지고, 오해가 줄어들며, 매력이 더 잘 전달됩니다',
      });
    }

    if (인성 < 1) {
      areas.push({
        area: '경청과 공감',
        current: '상대방의 입장에서 생각하기보다 자신의 관점이 우선일 수 있습니다',
        target: '상대방의 이야기를 깊이 들어주고 공감하는 능력',
        benefits: '사람들이 당신과 대화하고 싶어하며, 관계가 깊어집니다',
      });
    }

    if (재성 < 1) {
      areas.push({
        area: '현실적 사고',
        current: '이상을 추구하느라 현실적인 면을 놓칠 수 있습니다',
        target: '실용적이고 현실적인 판단력',
        benefits: '목표를 실제로 달성하고, 실질적인 성과를 만들어냅니다',
      });
    }

    if (관성 < 1) {
      areas.push({
        area: '책임감과 체계',
        current: '자유로운 것을 선호하여 체계나 규칙이 부담스러울 수 있습니다',
        target: '약속을 지키고 체계적으로 일하는 능력',
        benefits: '신뢰를 얻고, 리더십 기회가 늘어납니다',
      });
    }

    if (비겁 < 1) {
      areas.push({
        area: '독립성과 자신감',
        current: '타인의 의견에 쉽게 영향받고, 자기주장이 약할 수 있습니다',
        target: '자신의 의견을 당당히 표현하고 독립적으로 결정하는 능력',
        benefits: '자존감이 높아지고, 개성 있는 매력이 돋보입니다',
      });
    }

    return areas.slice(0, 3);
  };

  // 실천 액션 아이템
  const getActionItems = () => {
    const actions: { [key: string]: string[] } = {
      목: [
        '매일 일기를 써서 자신의 감정과 생각을 정리하세요',
        '새로운 취미나 기술을 배워 성장하는 즐거움을 느끼세요',
        '주변 사람들에게 진심 어린 칭찬과 격려를 건네세요',
        '자연 속에서 시간을 보내며 에너지를 재충전하세요',
      ],
      화: [
        '자신의 열정을 SNS나 블로그로 표현해보세요',
        '새로운 사람들과 만나는 모임에 적극 참여하세요',
        '좋아하는 것을 다른 사람과 공유하고 함께 즐기세요',
        '가끔은 조용히 휴식하며 내면을 돌아보는 시간을 가지세요',
      ],
      토: [
        '꾸준한 운동이나 명상으로 심신의 안정을 유지하세요',
        '주변 사람들의 고민을 들어주고 조언해주세요',
        '집이나 작업 공간을 깔끔하게 정리하고 꾸미세요',
        '때로는 계획에서 벗어나 즉흥적인 경험도 해보세요',
      ],
      금: [
        '자신의 전문 분야에서 계속 배우고 발전하세요',
        '품질 좋은 물건을 선별해서 소장하고 관리하세요',
        '공식적인 자리에서 자신의 전문성을 발휘하세요',
        '가끔은 형식보다 마음을 먼저 표현해보세요',
      ],
      수: [
        '독서나 온라인 강의로 지식을 넓히세요',
        '자신의 생각을 글로 정리하고 공유하세요',
        '깊이 있는 대화를 나눌 수 있는 사람들을 찾으세요',
        '때로는 가벼운 대화와 즐거운 순간도 즐기세요',
      ],
    };

    const elementActions = actions[dayElement] || actions.목;
    const generalActions = [
      '자신의 장점을 3가지 이상 적어보고 자주 상기하세요',
      '거울을 보며 자신에게 긍정적인 말을 건네세요',
      '매주 하나씩 새로운 시도를 해보세요',
      '자신을 칭찬해줄 수 있는 작은 성취를 만드세요',
    ];

    return [...elementActions.slice(0, 3), ...generalActions.slice(0, 2)];
  };

  // 행운 아이템
  const getLuckyItems = () => {
    const items: { [key: string]: {
      color: { name: string; hex: string; effect: string }[];
      item: string[];
      number: { num: string; meaning: string }[];
      direction: { name: string; effect: string };
    } } = {
      목: {
        color: [
          { name: '초록색', hex: '#10b981', effect: '성장과 활력을 상징, 매력 증폭' },
          { name: '하늘색', hex: '#38bdf8', effect: '소통과 자유를 상징, 친화력 UP' },
        ],
        item: ['나무 소재 액세서리', '화분이나 식물', '에코백', '내추럴 향수'],
        number: [
          { num: '3, 8', meaning: '목의 수, 성장과 확장의 에너지' },
        ],
        direction: { name: '동쪽', effect: '해가 뜨는 방향, 새로운 시작과 성장' },
      },
      화: {
        color: [
          { name: '빨간색', hex: '#ef4444', effect: '열정과 에너지를 상징, 자신감 UP' },
          { name: '주황색', hex: '#f97316', effect: '활력과 창의성, 사교성 증폭' },
        ],
        item: ['레드 계열 의류', '향초', '화려한 액세서리', '파워 스톤'],
        number: [
          { num: '2, 7', meaning: '화의 수, 열정과 창조의 에너지' },
        ],
        direction: { name: '남쪽', effect: '태양의 방향, 명예와 인기' },
      },
      토: {
        color: [
          { name: '황토색', hex: '#d97706', effect: '안정과 신뢰를 상징, 편안함 UP' },
          { name: '베이지', hex: '#a8a29e', effect: '포용과 따뜻함, 친밀감 증가' },
        ],
        item: ['도자기', '가죽 제품', '부동산 관련 아이템', '자연석'],
        number: [
          { num: '5, 10', meaning: '토의 수, 안정과 중심의 에너지' },
        ],
        direction: { name: '중앙', effect: '모든 것의 중심, 조화와 균형' },
      },
      금: {
        color: [
          { name: '흰색', hex: '#f3f4f6', effect: '순수와 고결함을 상징, 품격 UP' },
          { name: '골드', hex: '#fbbf24', effect: '가치와 풍요, 성공의 기운' },
        ],
        item: ['금속 액세서리', '시계', '칼이나 가위(새것)', '크리스탈'],
        number: [
          { num: '4, 9', meaning: '금의 수, 정의와 결단의 에너지' },
        ],
        direction: { name: '서쪽', effect: '결실의 방향, 완성과 성취' },
      },
      수: {
        color: [
          { name: '검은색', hex: '#1f2937', effect: '깊이와 신비를 상징, 지혜 UP' },
          { name: '남색', hex: '#1e40af', effect: '지성과 통찰, 집중력 증가' },
        ],
        item: ['물 관련 소품', '유리 제품', '잉크', '문구류'],
        number: [
          { num: '1, 6', meaning: '수의 수, 지혜와 흐름의 에너지' },
        ],
        direction: { name: '북쪽', effect: '지혜의 방향, 학문과 사색' },
      },
    };

    return items[dayElement] || items.목;
  };

  const improvementAreas = getImprovementAreas();
  const actionItems = getActionItems();
  const luckyItems = getLuckyItems();

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
          매력 업그레이드 가이드
        </h2>
        <p className="text-slate-300">
          {name}님의 매력을 한층 더 빛나게 만들 실천 방법
        </p>
      </div>

      {/* Improvement Areas */}
      {improvementAreas.length > 0 && (
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
            <Target className="w-6 h-6" />
            개선하면 좋을 영역
          </h3>
          <div className="space-y-4">
            {improvementAreas.map((area, idx) => (
              <motion.div
                key={idx}
                className="glass rounded-2xl p-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
              >
                <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-blue-400">{idx + 1}</span>
                  {area.area}
                </h4>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-slate-800/50">
                    <p className="text-xs text-slate-400 mb-1">현재 상태</p>
                    <p className="text-slate-300 text-sm">{area.current}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <p className="text-xs text-blue-400 mb-1">목표</p>
                    <p className="text-blue-200 text-sm">{area.target}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <p className="text-xs text-green-400 mb-1">개선 효과</p>
                    <p className="text-green-200 text-sm">{area.benefits}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Action Items */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
          <CheckCircle className="w-6 h-6" />
          오늘부터 실천할 수 있는 액션
        </h3>
        <div className="glass rounded-2xl p-6">
          <div className="grid md:grid-cols-2 gap-4">
            {actionItems.map((action, idx) => (
              <motion.div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + idx * 0.05 }}
              >
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <p className="text-slate-200 text-sm leading-relaxed">{action}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Lucky Items */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9 }}
      >
        <h3 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
          <Gift className="w-6 h-6" />
          행운의 아이템
        </h3>
        <div className="glass rounded-2xl p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Colors */}
            <div className="space-y-3">
              <h4 className="font-semibold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                행운의 색상
              </h4>
              {luckyItems.color.map((color, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-slate-800/50">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-8 h-8 rounded-full border-2 border-white/20"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="font-semibold text-white">{color.name}</span>
                  </div>
                  <p className="text-slate-300 text-sm">{color.effect}</p>
                </div>
              ))}
            </div>

            {/* Items */}
            <div className="space-y-3">
              <h4 className="font-semibold text-white flex items-center gap-2">
                <Gift className="w-4 h-4 text-amber-400" />
                추천 아이템
              </h4>
              <div className="p-4 rounded-lg bg-slate-800/50">
                <div className="grid grid-cols-2 gap-2">
                  {luckyItems.item.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-amber-400">•</span>
                      <span className="text-slate-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Numbers */}
            <div className="space-y-3">
              <h4 className="font-semibold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                행운의 숫자
              </h4>
              {luckyItems.number.map((num, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <div className="text-2xl font-bold text-amber-400 mb-1">{num.num}</div>
                  <p className="text-amber-200 text-sm">{num.meaning}</p>
                </div>
              ))}
            </div>

            {/* Direction */}
            <div className="space-y-3">
              <h4 className="font-semibold text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-400" />
                행운의 방향
              </h4>
              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <div className="text-2xl font-bold text-purple-400 mb-1">{luckyItems.direction.name}</div>
                <p className="text-purple-200 text-sm">{luckyItems.direction.effect}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
            <p className="text-slate-200 text-sm leading-relaxed">
              💡 <span className="font-semibold">활용 팁:</span> 행운의 아이템은 심리적 효과가 큽니다.
              이것들을 가까이 두면 자신감이 높아지고, 긍정적인 에너지가 생깁니다.
              중요한 약속이나 면접 전에 행운의 색상을 입거나, 행운의 아이템을 지니고 가보세요.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Final Message */}
      <motion.div
        className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <h4 className="font-bold text-pink-400 mb-3 text-lg text-center">✨ 마지막 조언</h4>
        <p className="text-slate-200 leading-relaxed text-center">
          매력은 타고나는 것이 아니라 만들어가는 것입니다.
          {name}님은 이미 충분히 매력적이지만, 끊임없이 성장하고 발전하려는 노력이
          당신을 더욱 특별하게 만들 것입니다.
          자신을 사랑하고, 있는 그대로의 모습에 자신감을 가지세요.
          그것이 가장 큰 매력입니다. 💖
        </p>
      </motion.div>
    </motion.div>
  );
}
