'use client';

import { motion } from 'framer-motion';
import { Smile, Sparkles, Star, Target } from 'lucide-react';
import { TaemongFormData } from '@/components/TaemongForm';

interface TaemongPersonalityProps {
  formData: TaemongFormData;
}

export default function TaemongPersonality({ formData }: TaemongPersonalityProps) {
  // 성격 및 재능 분석
  const analyzePersonality = () => {
    const content = formData.dreamContent.toLowerCase();

    const traits: Array<{
      icon: string;
      title: string;
      description: string;
      score: number;
    }> = [];

    // 리더십
    if (
      content.includes('용') ||
      content.includes('호랑이') ||
      content.includes('독수리') ||
      content.includes('해')
    ) {
      traits.push({
        icon: '👑',
        title: '리더십',
        description:
          '타고난 리더의 기질을 가지고 있습니다. 친구들 사이에서 중심이 되고, 조직을 이끄는 능력이 뛰어납니다. 많은 사람을 이끌고 큰 일을 성취할 수 있는 인물입니다.',
        score: 95,
      });
    }

    // 예술성
    if (
      content.includes('꽃') ||
      content.includes('나비') ||
      content.includes('새') ||
      content.includes('음악') ||
      content.includes('아름다운')
    ) {
      traits.push({
        icon: '🎨',
        title: '예술적 재능',
        description:
          '예술적 감각이 뛰어납니다. 음악, 미술, 문학 등 예술 분야에서 특별한 재능을 발휘할 것입니다. 아름다움을 추구하고 창조하는 능력이 탁월합니다.',
        score: 90,
      });
    }

    // 지혜
    if (
      content.includes('뱀') ||
      content.includes('올빼미') ||
      content.includes('책') ||
      content.includes('별')
    ) {
      traits.push({
        icon: '🧠',
        title: '뛰어난 지혜',
        description:
          '총명하고 지혜로운 아이입니다. 학문을 좋아하고 이해력이 빠릅니다. 복잡한 문제를 논리적으로 해결하는 능력이 있으며, 학업에서 우수한 성과를 거둘 것입니다.',
        score: 92,
      });
    }

    // 재물복
    if (
      content.includes('금') ||
      content.includes('돼지') ||
      content.includes('잉어') ||
      content.includes('보석')
    ) {
      traits.push({
        icon: '💰',
        title: '재물복',
        description:
          '평생 재물복이 따르는 운명입니다. 돈을 버는 감각이 뛰어나고, 재테크 능력이 좋습니다. 경제적으로 풍요로운 삶을 살 가능성이 높습니다.',
        score: 88,
      });
    }

    // 용기
    if (
      content.includes('호랑이') ||
      content.includes('사자') ||
      content.includes('칼') ||
      content.includes('싸우')
    ) {
      traits.push({
        icon: '⚔️',
        title: '용기와 담력',
        description:
          '용감하고 담대한 성격입니다. 어려운 상황에서도 포기하지 않고 맞서는 강인함을 가지고 있습니다. 정의감이 강하고 약자를 보호하려는 마음이 큽니다.',
        score: 90,
      });
    }

    // 인기
    if (
      content.includes('태양') ||
      content.includes('많은 사람') ||
      content.includes('군중')
    ) {
      traits.push({
        icon: '⭐',
        title: '대중적 인기',
        description:
          '사람들에게 사랑받는 매력을 가지고 있습니다. 친화력이 좋고 리더십이 있어 많은 사람들이 따릅니다. 대중 앞에 서는 직업에 유리합니다.',
        score: 85,
      });
    }

    // 직관력
    if (content.includes('달') || content.includes('신비')) {
      traits.push({
        icon: '🔮',
        title: '뛰어난 직관',
        description:
          '직감이 뛰어나고 통찰력이 있습니다. 사람의 마음을 잘 이해하고, 상황을 예리하게 판단합니다. 심리학이나 상담 분야에서 두각을 나타낼 수 있습니다.',
        score: 87,
      });
    }

    // 성실함
    if (
      content.includes('소') ||
      content.includes('땅') ||
      content.includes('농사') ||
      content.includes('씨앗')
    ) {
      traits.push({
        icon: '🌱',
        title: '성실함',
        description:
          '근면하고 성실한 성격입니다. 한 번 시작한 일은 끝까지 해내는 끈기가 있습니다. 꾸준한 노력으로 큰 성과를 이루는 타입입니다.',
        score: 88,
      });
    }

    // 기본 성격 (키워드가 없을 때)
    if (traits.length === 0) {
      traits.push({
        icon: '😊',
        title: '밝은 성격',
        description:
          '밝고 긍정적인 성격의 아이가 될 것입니다. 주변 사람들에게 긍정적인 에너지를 주고, 화목한 분위기를 만듭니다.',
        score: 80,
      });
      traits.push({
        icon: '❤️',
        title: '따뜻한 마음',
        description:
          '마음이 따뜻하고 다른 사람을 배려할 줄 아는 아이입니다. 가족과 친구를 소중히 여기고, 주변 사람들에게 사랑받습니다.',
        score: 85,
      });
    }

    return traits.slice(0, 4); // 상위 4개만 표시
  };

  // 강점 영역
  const getStrengthAreas = () => {
    const content = formData.dreamContent.toLowerCase();
    const areas: Array<{ name: string; description: string }> = [];

    if (
      content.includes('책') ||
      content.includes('글') ||
      content.includes('뱀') ||
      content.includes('올빼미')
    ) {
      areas.push({
        name: '학업 능력',
        description: '공부에 대한 열정이 있고 이해력이 빨라 학업에서 우수한 성과를 거둡니다.',
      });
    }

    if (
      content.includes('운동') ||
      content.includes('달리') ||
      content.includes('호랑이') ||
      content.includes('말')
    ) {
      areas.push({
        name: '신체 능력',
        description: '운동 신경이 발달하고 활동적입니다. 체육이나 스포츠 분야에서 재능을 보입니다.',
      });
    }

    if (content.includes('노래') || content.includes('춤') || content.includes('꽃')) {
      areas.push({
        name: '예술적 표현',
        description: '예술적 감각이 뛰어나고 자기 표현 능력이 좋습니다.',
      });
    }

    if (content.includes('사람') || content.includes('친구') || content.includes('많은')) {
      areas.push({
        name: '사회성',
        description: '사람들과 잘 어울리고 친구를 쉽게 사귑니다. 리더십과 협동심이 뛰어납니다.',
      });
    }

    if (areas.length === 0) {
      areas.push(
        {
          name: '종합 능력',
          description: '여러 분야에서 고르게 발전할 잠재력을 가지고 있습니다.',
        },
        {
          name: '적응력',
          description: '새로운 환경에 잘 적응하고 유연하게 대처합니다.',
        }
      );
    }

    return areas;
  };

  const personality = analyzePersonality();
  const strengthAreas = getStrengthAreas();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-10"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
          <Smile className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2
            className="text-2xl md:text-3xl font-bold text-white"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            성격과 재능
          </h2>
          <p className="text-slate-400 text-sm">태몽이 예고하는 아이의 특성</p>
        </div>
      </div>

      {/* 주요 성격 특성 */}
      <div className="space-y-6 mb-10">
        {personality.map((trait, index) => (
          <motion.div key={trait.title} className="glass rounded-2xl p-6" variants={itemVariants}>
            <div className="flex items-start gap-4 mb-4">
              <div className="text-5xl">{trait.icon}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">{trait.title}</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.round(trait.score / 20)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-slate-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-emerald-400 font-semibold">{trait.score}%</span>
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed">{trait.description}</p>
              </div>
            </div>

            {/* 진행 바 */}
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-green-400"
                initial={{ width: 0 }}
                whileInView={{ width: `${trait.score}%` }}
                transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* 강점 영역 */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-6 h-6 text-green-400" />
          <h3 className="text-xl font-bold text-white">특별히 뛰어난 영역</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {strengthAreas.map((area, index) => (
            <motion.div
              key={area.name}
              className="glass rounded-xl p-5"
              variants={itemVariants}
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <h4 className="font-bold text-emerald-400">{area.name}</h4>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{area.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 종합 평가 */}
      <motion.div
        className="mt-8 p-6 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-2xl border border-emerald-500/20"
        variants={itemVariants}
      >
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span className="text-2xl">🌟</span>
          종합 평가
        </h3>
        <p className="text-slate-200 leading-relaxed mb-3">
          {formData.name}님은 타고난 재능과 긍정적인 성품을 함께 가진 복된 아이입니다. 태몽이
          보여주는 특성들을 잘 발전시킨다면, 여러 분야에서 큰 성공을 거두고 많은 사람에게
          좋은 영향을 줄 수 있는 인물로 성장할 것입니다.
        </p>
        <p className="text-slate-300 text-sm">
          💡 부모의 사랑과 격려 속에서 아이의 재능은 더욱 빛을 발할 것입니다.
        </p>
      </motion.div>
    </motion.div>
  );
}
