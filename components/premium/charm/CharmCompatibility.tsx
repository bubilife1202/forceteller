'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Heart, Users, Sparkles, Target, Star, TrendingUp, AlertCircle } from 'lucide-react';

interface CharmCompatibilityProps {
  result: SajuResult;
  name: string;
  gender: 'male' | 'female';
}

export default function CharmCompatibility({ result, name, gender }: CharmCompatibilityProps) {
  const dayElement = result.day.stem.element;
  const { 식상, 재성, 관성, 인성, 비겁 } = result.tenGodsCount;

  // 끌리는 타입
  const getAttractedToType = () => {
    const types: { [key: string]: {
      primary: string;
      characteristics: string[];
      reason: string;
      example: string;
    } } = {
      목: {
        primary: '열정적이고 주도적인 타입',
        characteristics: [
          '확실한 주관과 리더십이 있는 사람',
          '적극적으로 이끌어주는 사람',
          '밝고 긍정적인 에너지를 가진 사람',
          '결단력 있고 추진력이 강한 사람'
        ],
        reason: '배려심이 많고 유연한 당신은 확실한 방향성을 제시해주는 사람에게 끌립니다. 자신이 부족하다고 느끼는 적극성과 추진력을 가진 사람에게 매력을 느낍니다.',
        example: '화(火) 또는 금(金) 오행이 강한 사람 - 열정적이거나 카리스마 있는 타입',
      },
      화: {
        primary: '차분하고 안정적인 타입',
        characteristics: [
          '감정 기복이 적고 평온한 사람',
          '인내심이 있고 꾸준한 사람',
          '현실적이고 실용적인 사람',
          '나를 진정시켜줄 수 있는 사람'
        ],
        reason: '열정적이고 감정 기복이 있는 당신은 균형을 맞춰줄 수 있는 안정적인 사람에게 끌립니다. 자신의 부족함을 채워줄 수 있는 차분함을 추구합니다.',
        example: '토(土) 또는 수(水) 오행이 강한 사람 - 안정적이거나 깊이 있는 타입',
      },
      토: {
        primary: '활발하고 변화무쌍한 타입',
        characteristics: [
          '재미있고 유머러스한 사람',
          '새로운 것을 시도하는 모험심 있는 사람',
          '표현력이 풍부하고 창의적인 사람',
          '일상에 활력을 불어넣어주는 사람'
        ],
        reason: '안정적이지만 때로는 지루함을 느끼는 당신은 삶에 변화와 재미를 가져다줄 사람에게 끌립니다. 자신에게 없는 역동성을 원합니다.',
        example: '화(火) 또는 목(木) 오행이 강한 사람 - 활발하거나 성장지향적인 타입',
      },
      금: {
        primary: '따뜻하고 공감 능력이 뛰어난 타입',
        characteristics: [
          '감정적으로 풍부하고 표현을 잘하는 사람',
          '융통성 있고 부드러운 사람',
          '진심으로 이해하고 공감해주는 사람',
          '나의 단단한 껍질을 녹여줄 수 있는 사람'
        ],
        reason: '이성적이고 때로는 차갑게 보일 수 있는 당신은 감정적 따뜻함을 가진 사람에게 끌립니다. 자신의 감정을 표현하도록 도와줄 사람을 원합니다.',
        example: '목(木) 또는 화(火) 오행이 강한 사람 - 따뜻하거나 열정적인 타입',
      },
      수: {
        primary: '명확하고 솔직한 타입',
        characteristics: [
          '생각을 단순명료하게 표현하는 사람',
          '행동이 빠르고 결단력 있는 사람',
          '복잡하게 생각하지 않고 직진하는 사람',
          '나를 현실로 끌어내줄 수 있는 사람'
        ],
        reason: '깊고 복잡한 사고를 하는 당신은 단순하고 명확한 사람에게 끌립니다. 머릿속에서 벗어나 행동하게 만들어줄 사람을 원합니다.',
        example: '화(火) 또는 금(金) 오행이 강한 사람 - 직설적이거나 명확한 타입',
      },
    };
    return types[dayElement] || types.목;
  };

  // 나를 좋아하는 타입
  const getAttractiveToType = () => {
    const types: { [key: string]: {
      primary: string;
      whoLikesYou: string[];
      why: string;
      chemistry: string;
    } } = {
      목: {
        primary: '상처받거나 지친 사람들',
        whoLikesYou: [
          '위로와 힐링이 필요한 사람',
          '인정받고 싶어하는 사람',
          '따뜻함에 굶주린 사람',
          '진심 어린 응원이 필요한 사람'
        ],
        why: '당신의 포용력과 무조건적인 지지가 상처받은 사람들에게는 오아시스 같습니다. 판단하지 않고 받아들이는 당신의 자세가 큰 매력입니다.',
        chemistry: '당신이 베푸는 것을 좋아하고, 상대방은 받는 것을 필요로 하는 관계. 균형을 맞추지 않으면 일방적이 될 수 있습니다.',
      },
      화: {
        primary: '소극적이거나 우울한 사람들',
        whoLikesYou: [
          '활력이 필요한 사람',
          '용기를 내지 못하는 사람',
          '즐거움을 찾는 사람',
          '변화가 필요한 사람'
        ],
        why: '당신의 밝은 에너지와 긍정성이 어두운 곳에 있는 사람들에게 빛이 됩니다. 함께 있으면 삶이 즐거워진다고 느낍니다.',
        chemistry: '당신이 에너지를 주고, 상대방은 받는 관계. 에너지 소진에 주의해야 합니다.',
      },
      토: {
        primary: '불안하거나 방황하는 사람들',
        whoLikesYou: [
          '안정이 필요한 사람',
          '믿을 곳이 필요한 사람',
          '현실적 조언이 필요한 사람',
          '의지할 곳을 찾는 사람'
        ],
        why: '당신의 안정감과 신뢰성이 불안한 사람들에게 안식처가 됩니다. 변하지 않고 항상 그 자리에 있어주는 것이 큰 매력입니다.',
        chemistry: '당신이 버팀목이 되고, 상대방은 의지하는 관계. 책임감이 과도해질 수 있습니다.',
      },
      금: {
        primary: '방향을 찾지 못한 사람들',
        whoLikesYou: [
          '명확한 기준이 필요한 사람',
          '이끌어줄 누군가를 찾는 사람',
          '능력 있는 사람을 존경하는 사람',
          '자기계발에 관심 있는 사람'
        ],
        why: '당신의 확고한 기준과 전문성이 길을 잃은 사람들에게 나침반이 됩니다. 본받고 싶은 롤모델로 보입니다.',
        chemistry: '당신이 기준을 제시하고, 상대방은 따르는 관계. 평등하지 않을 수 있습니다.',
      },
      수: {
        primary: '호기심 많은 사람들',
        whoLikesYou: [
          '깊이 있는 대화를 원하는 사람',
          '평범함에서 벗어나고 싶은 사람',
          '신비로운 것에 끌리는 사람',
          '지적 자극을 원하는 사람'
        ],
        why: '당신의 신비로움과 깊이가 호기심을 자극합니다. 알수록 더 흥미로운 당신의 모습에 매료됩니다.',
        chemistry: '당신이 신비를 주고, 상대방은 탐구하는 관계. 너무 멀어지지 않도록 주의해야 합니다.',
      },
    };
    return types[dayElement] || types.목;
  };

  // 이상형
  const getIdealType = () => {
    const ideals = [];

    if (식상 >= 2) {
      ideals.push({
        aspect: '대화와 소통',
        description: '재미있는 대화를 나눌 수 있고, 서로의 생각을 자유롭게 표현할 수 있는 사람',
        importance: '창의적 교류가 중요한 당신에게 대화는 관계의 핵심입니다',
      });
    }

    if (재성 >= 2) {
      ideals.push({
        aspect: '현실적 능력',
        description: '경제적으로 안정적이고, 실질적인 문제 해결 능력이 있는 사람',
        importance: '현실을 중시하는 당신에게 실용성은 매력의 중요한 요소입니다',
      });
    }

    if (관성 >= 2) {
      ideals.push({
        aspect: '책임감과 원칙',
        description: '약속을 지키고, 원칙이 있으며, 책임감 있게 행동하는 사람',
        importance: '신뢰를 중요시하는 당신에게 일관성은 필수적입니다',
      });
    }

    if (인성 >= 2) {
      ideals.push({
        aspect: '지적 수준',
        description: '교양 있고, 깊이 있는 대화가 가능하며, 배움에 열린 사람',
        importance: '정신적 교감을 중시하는 당신에게 지성은 큰 매력입니다',
      });
    }

    if (비겁 >= 1) {
      ideals.push({
        aspect: '친화력과 사회성',
        description: '사람들과 잘 어울리고, 나의 사람들과도 편하게 지낼 수 있는 사람',
        importance: '관계를 중시하는 당신에게 사회성은 중요한 덕목입니다',
      });
    }

    // 일간별 추가 이상형
    const elementIdeals: Record<string, { aspect: string; description: string; importance: string }> = {
      목: {
        aspect: '감정적 안정',
        description: '나의 감정을 이해하고 공감해주며, 정서적으로 안정된 사람',
        importance: '감정 교류를 중시하는 당신에게 공감 능력은 필수입니다',
      },
      화: {
        aspect: '열정 공유',
        description: '나의 열정을 이해하고 함께 즐거워할 수 있는 사람',
        importance: '에너지를 공유할 수 있는 파트너가 중요합니다',
      },
      토: {
        aspect: '편안함과 신뢰',
        description: '함께 있으면 편안하고, 서로를 완전히 믿을 수 있는 사람',
        importance: '안정적 관계를 원하는 당신에게 편안함은 최우선입니다',
      },
      금: {
        aspect: '상호 존중',
        description: '서로의 영역을 존중하고, 품격 있게 대해주는 사람',
        importance: '경계와 존중을 중시하는 당신에게 격은 중요합니다',
      },
      수: {
        aspect: '정신적 교감',
        description: '말하지 않아도 이해하고, 깊은 수준에서 연결될 수 있는 사람',
        importance: '영혼의 교감을 원하는 당신에게 정신적 연결은 필수입니다',
      },
    };

    ideals.push(elementIdeals[dayElement] || elementIdeals.목);

    return ideals.slice(0, 4);
  };

  // 궁합이 좋은 타입 (오행 기반)
  const getCompatibleElements = () => {
    const compatibility: { [key: string]: {
      best: { element: string; name: string; reason: string }[];
      good: { element: string; name: string; reason: string }[];
      challenging: { element: string; name: string; reason: string }[];
    } } = {
      목: {
        best: [
          { element: '수', name: '수(水) - 물', reason: '물이 나무를 키우듯, 당신을 성장시켜주는 관계입니다. 지혜롭고 깊이 있는 사람이 당신에게 영감을 줍니다.' },
        ],
        good: [
          { element: '목', name: '목(木) - 나무', reason: '같은 오행으로 서로를 이해하기 쉽습니다. 함께 성장하는 관계가 될 수 있습니다.' },
          { element: '화', name: '화(火) - 불', reason: '당신이 베풀면 상대가 빛나는 관계입니다. 열정적인 사람에게 에너지를 전달합니다.' },
        ],
        challenging: [
          { element: '금', name: '금(金) - 쇠', reason: '금이 나무를 자르듯, 때로는 갈등이 있을 수 있습니다. 하지만 서로 다른 점이 매력이 될 수도 있습니다.' },
        ],
      },
      화: {
        best: [
          { element: '목', name: '목(木) - 나무', reason: '나무가 불을 지피듯, 당신의 열정을 지원해주는 관계입니다. 따뜻하고 배려심 많은 사람이 당신을 돕습니다.' },
        ],
        good: [
          { element: '화', name: '화(火) - 불', reason: '같은 열정을 가진 사람과 함께 더 크게 타오를 수 있습니다. 드라마틱한 관계가 될 것입니다.' },
          { element: '토', name: '토(土) - 흙', reason: '당신이 베풀면 상대가 안정되는 관계입니다. 안정적인 사람이 당신을 받아줍니다.' },
        ],
        challenging: [
          { element: '수', name: '수(水) - 물', reason: '물이 불을 끄듯, 서로 반대되는 성향이 있습니다. 하지만 균형을 맞추면 조화로울 수 있습니다.' },
        ],
      },
      토: {
        best: [
          { element: '화', name: '화(火) - 불', reason: '불이 흙을 만들듯, 당신에게 활력을 주는 관계입니다. 열정적인 사람이 당신의 삶을 풍요롭게 합니다.' },
        ],
        good: [
          { element: '토', name: '토(土) - 흙', reason: '같은 안정성을 추구하여 편안한 관계를 만들 수 있습니다. 서로를 이해하기 쉽습니다.' },
          { element: '금', name: '금(金) - 쇠', reason: '당신이 베풀면 상대가 빛나는 관계입니다. 세련된 사람에게 안정감을 전달합니다.' },
        ],
        challenging: [
          { element: '목', name: '목(木) - 나무', reason: '나무가 흙의 양분을 가져가듯, 에너지를 많이 요구받을 수 있습니다. 경계 설정이 필요합니다.' },
        ],
      },
      금: {
        best: [
          { element: '토', name: '토(土) - 흙', reason: '흙이 쇠를 만들듯, 당신을 지지해주는 관계입니다. 안정적이고 믿음직한 사람이 당신을 돕습니다.' },
        ],
        good: [
          { element: '금', name: '금(金) - 쇠', reason: '같은 기준과 품격을 추구하여 서로 존중하는 관계를 만들 수 있습니다.' },
          { element: '수', name: '수(水) - 물', reason: '당신이 베풀면 상대가 깊어지는 관계입니다. 지적인 사람에게 명확함을 전달합니다.' },
        ],
        challenging: [
          { element: '화', name: '화(火) - 불', reason: '불이 쇠를 녹이듯, 당신의 틀을 깨는 사람입니다. 변화를 가져올 수 있지만 때로는 부담스러울 수 있습니다.' },
        ],
      },
      수: {
        best: [
          { element: '금', name: '금(金) - 쇠', reason: '쇠가 물을 만들듯, 당신에게 명확함을 주는 관계입니다. 확고한 기준을 가진 사람이 당신을 돕습니다.' },
        ],
        good: [
          { element: '수', name: '수(水) - 물', reason: '같은 깊이를 추구하여 정신적으로 깊이 교감할 수 있습니다.' },
          { element: '목', name: '목(木) - 나무', reason: '당신이 베풀면 상대가 성장하는 관계입니다. 성장 지향적인 사람에게 영감을 줍니다.' },
        ],
        challenging: [
          { element: '토', name: '토(土) - 흙', reason: '흙이 물을 막듯, 서로 다른 접근 방식으로 갈등이 있을 수 있습니다. 하지만 균형을 맞추면 좋습니다.' },
        ],
      },
    };
    return compatibility[dayElement] || compatibility.목;
  };

  const attractedTo = getAttractedToType();
  const attractiveTo = getAttractiveToType();
  const idealType = getIdealType();
  const compatible = getCompatibleElements();

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
          매력 궁합
        </h2>
        <p className="text-slate-300">
          {name}님이 끌리는 타입과 {name}님을 좋아하는 타입
        </p>
      </div>

      {/* Attracted To Type */}
      <motion.div
        className="glass rounded-2xl p-6 mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20">
            <Heart className="w-6 h-6 text-pink-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-pink-400 mb-2">내가 끌리는 타입</h3>
            <h4 className="text-2xl font-bold text-white mb-4">{attractedTo.primary}</h4>

            <div className="space-y-2 mb-4">
              {attractedTo.characteristics.map((char, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg bg-pink-500/10 border border-pink-500/20"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                >
                  <Heart className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
                  <p className="text-pink-200 text-sm">{char}</p>
                </motion.div>
              ))}
            </div>

            <div className="p-4 rounded-lg bg-slate-800/50 mb-3">
              <p className="text-slate-200 text-sm mb-1">
                <span className="font-semibold text-pink-400">💕 왜 끌리나요?</span>
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">
                {attractedTo.reason}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
              <p className="text-slate-200 text-sm mb-1">
                <span className="font-semibold text-purple-400">✨ 예시</span>
              </p>
              <p className="text-purple-200 text-sm">
                {attractedTo.example}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Attractive To Type */}
      <motion.div
        className="glass rounded-2xl p-6 mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
            <Users className="w-6 h-6 text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-purple-400 mb-2">나를 좋아하는 타입</h3>
            <h4 className="text-2xl font-bold text-white mb-4">{attractiveTo.primary}</h4>

            <div className="space-y-2 mb-4">
              {attractiveTo.whoLikesYou.map((type, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                >
                  <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                  <p className="text-purple-200 text-sm">{type}</p>
                </motion.div>
              ))}
            </div>

            <div className="p-4 rounded-lg bg-slate-800/50 mb-3">
              <p className="text-slate-200 text-sm mb-1">
                <span className="font-semibold text-purple-400">💜 왜 좋아하나요?</span>
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">
                {attractiveTo.why}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border border-amber-500/20">
              <p className="text-slate-200 text-sm mb-1">
                <span className="font-semibold text-amber-400">⚠️ 관계 특성</span>
              </p>
              <p className="text-amber-200 text-sm">
                {attractiveTo.chemistry}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Ideal Type */}
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
            <h3 className="text-xl font-bold text-blue-400 mb-4">이상형 조건</h3>

            <div className="space-y-4">
              {idealType.map((ideal, idx) => (
                <motion.div
                  key={idx}
                  className="p-5 rounded-lg bg-slate-800/50 border border-blue-500/20"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + idx * 0.1 }}
                >
                  <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                    <Star className="w-4 h-4 text-blue-400" />
                    {ideal.aspect}
                  </h4>
                  <p className="text-slate-300 text-sm mb-3">
                    {ideal.description}
                  </p>
                  <div className="p-3 rounded-lg bg-blue-500/10">
                    <p className="text-blue-300 text-xs">
                      💡 {ideal.importance}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Element Compatibility */}
      <motion.div
        className="glass rounded-2xl p-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20">
            <TrendingUp className="w-6 h-6 text-green-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-green-400 mb-4">오행 궁합</h3>

            {/* Best Match */}
            <div className="mb-6">
              <h4 className="font-semibold text-green-300 mb-3 flex items-center gap-2">
                <Star className="w-4 h-4" />
                최고의 궁합
              </h4>
              <div className="space-y-3">
                {compatible.best.map((match, idx) => (
                  <motion.div
                    key={idx}
                    className="p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + idx * 0.1 }}
                  >
                    <h5 className="font-bold text-green-300 mb-2">{match.name}</h5>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {match.reason}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Good Match */}
            <div className="mb-6">
              <h4 className="font-semibold text-blue-300 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                좋은 궁합
              </h4>
              <div className="space-y-3">
                {compatible.good.map((match, idx) => (
                  <motion.div
                    key={idx}
                    className="p-4 rounded-lg bg-slate-800/50 border border-blue-500/20"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 + idx * 0.1 }}
                  >
                    <h5 className="font-bold text-blue-300 mb-2">{match.name}</h5>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {match.reason}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Challenging Match */}
            <div>
              <h4 className="font-semibold text-amber-300 mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                주의가 필요한 궁합
              </h4>
              <div className="space-y-3">
                {compatible.challenging.map((match, idx) => (
                  <motion.div
                    key={idx}
                    className="p-4 rounded-lg bg-slate-800/50 border border-amber-500/20"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + idx * 0.1 }}
                  >
                    <h5 className="font-bold text-amber-300 mb-2">{match.name}</h5>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {match.reason}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Final Message */}
      <motion.div
        className="mt-6 p-6 rounded-xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
      >
        <h4 className="font-bold text-pink-400 mb-3 text-lg flex items-center gap-2">
          <Heart className="w-5 h-5" />
          궁합을 보는 지혜
        </h4>
        <div className="space-y-3 text-slate-200 text-sm leading-relaxed">
          <p className="text-base font-semibold text-pink-300">
            궁합은 참고일 뿐, 결정적인 것은 아닙니다.
          </p>
          <p>• <span className="font-semibold text-pink-300">다른 것이 매력이 될 수 있습니다</span> - 궁합이 안 맞아도 서로를 성장시킬 수 있습니다</p>
          <p>• <span className="font-semibold text-pink-300">비슷한 것도 장단점이 있습니다</span> - 편하지만 자극이 부족할 수 있습니다</p>
          <p>• <span className="font-semibold text-pink-300">노력이 궁합을 만듭니다</span> - 이해하려는 마음이 가장 중요합니다</p>
          <p>• <span className="font-semibold text-pink-300">타이밍도 중요합니다</span> - 같은 사람도 만나는 시기에 따라 달라집니다</p>
          <p>• <span className="font-semibold text-pink-300">자신을 먼저 사랑하세요</span> - 자기 사랑이 좋은 관계의 시작입니다</p>
          <p className="pt-2 text-pink-300 italic">
            &quot;사랑은 서로를 바라보는 것이 아니라, 같은 방향을 바라보는 것이다.&quot; - 생텍쥐페리
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
