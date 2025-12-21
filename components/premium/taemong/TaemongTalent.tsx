'use client';

import { motion } from 'framer-motion';
import { Sparkles, Trophy, Zap, TrendingUp, Star, Target } from 'lucide-react';
import { TaemongFormData } from '@/components/TaemongForm';

interface TaemongTalentProps {
  formData: TaemongFormData;
}

export default function TaemongTalent({ formData }: TaemongTalentProps) {
  // 재능 분석
  const analyzeTalents = () => {
    const content = formData.dreamContent.toLowerCase();
    const talents: Array<{
      name: string;
      icon: string;
      description: string;
      potential: number;
      color: string;
      development: string;
    }> = [];

    // 예술적 재능
    if (
      content.includes('꽃') ||
      content.includes('나비') ||
      content.includes('아름다운') ||
      content.includes('색') ||
      content.includes('그림')
    ) {
      talents.push({
        name: '미술/디자인',
        icon: '🎨',
        description:
          '뛰어난 심미안과 창의력을 가지고 있습니다. 색감과 형태에 대한 감각이 탁월하며, 시각 예술 분야에서 큰 재능을 발휘할 것입니다.',
        potential: 95,
        color: 'from-pink-500 to-purple-500',
        development: '어릴 때부터 다양한 미술 재료를 접하게 하고, 자유롭게 표현할 기회를 많이 주세요. 미술관 방문, 드로잉, 조형 활동을 권장합니다.',
      });
    }

    // 음악적 재능
    if (
      content.includes('음악') ||
      content.includes('노래') ||
      content.includes('소리') ||
      content.includes('춤') ||
      content.includes('새')
    ) {
      talents.push({
        name: '음악/무용',
        icon: '🎵',
        description:
          '리듬감과 음감이 뛰어납니다. 음악을 통한 감성 표현 능력이 탁월하며, 악기 연주나 성악, 무용 분야에서 특별한 재능을 보일 것입니다.',
        potential: 93,
        color: 'from-purple-500 to-indigo-500',
        development: '다양한 음악 장르를 들려주고, 악기를 배울 기회를 제공하세요. 신체 표현 활동과 리듬 놀이가 도움이 됩니다.',
      });
    }

    // 운동 재능
    if (
      content.includes('호랑이') ||
      content.includes('용') ||
      content.includes('말') ||
      content.includes('뛰') ||
      content.includes('빠른')
    ) {
      talents.push({
        name: '체육/운동',
        icon: '⚽',
        description:
          '뛰어난 신체 능력과 운동 신경을 타고났습니다. 민첩성, 순발력, 지구력이 우수하며 다양한 스포츠 분야에서 두각을 나타낼 것입니다.',
        potential: 92,
        color: 'from-green-500 to-emerald-500',
        development: '어릴 때부터 다양한 신체 활동을 경험하게 하세요. 팀 스포츠, 개인 운동 모두 좋으며, 기본 체력 훈련이 중요합니다.',
      });
    }

    // 언어 재능
    if (
      content.includes('책') ||
      content.includes('글') ||
      content.includes('말') ||
      content.includes('이야기') ||
      content.includes('펜')
    ) {
      talents.push({
        name: '언어/문학',
        icon: '📚',
        description:
          '언어 능력이 탁월하고 표현력이 뛰어납니다. 글쓰기, 말하기, 외국어 학습에 재능이 있으며, 문학이나 언론 분야에서 빛을 발할 것입니다.',
        potential: 94,
        color: 'from-blue-500 to-cyan-500',
        development: '책을 많이 읽히고, 생각을 글로 표현하는 연습을 하세요. 토론, 발표 기회를 많이 제공하고 외국어 교육도 좋습니다.',
      });
    }

    // 과학/수학 재능
    if (
      content.includes('별') ||
      content.includes('뱀') ||
      content.includes('올빼미') ||
      content.includes('숫자') ||
      content.includes('기계')
    ) {
      talents.push({
        name: '과학/수학',
        icon: '🔬',
        description:
          '논리적 사고력과 분석 능력이 뛰어납니다. 수학적 감각이 있고 과학적 호기심이 많아 STEM 분야에서 큰 성과를 낼 것입니다.',
        potential: 91,
        color: 'from-cyan-500 to-blue-500',
        development: '실험과 탐구 활동을 많이 하게 하세요. 수학 퍼즐, 과학 실험 키트, 로봇 조립 등이 재능 발달에 도움이 됩니다.',
      });
    }

    // 리더십
    if (
      content.includes('용') ||
      content.includes('왕') ||
      content.includes('해') ||
      content.includes('태양') ||
      content.includes('많은 사람')
    ) {
      talents.push({
        name: '리더십/경영',
        icon: '👑',
        description:
          '타고난 리더의 자질이 있습니다. 사람을 이끄는 능력과 조직력이 뛰어나며, 경영이나 관리 분야에서 탁월한 능력을 발휘할 것입니다.',
        potential: 90,
        color: 'from-yellow-500 to-orange-500',
        development: '팀 활동과 프로젝트를 주도하게 하세요. 의사결정 능력, 책임감, 소통 능력을 키울 수 있는 기회를 제공합니다.',
      });
    }

    // 사회성/대인관계
    if (
      content.includes('친구') ||
      content.includes('사람') ||
      content.includes('함께') ||
      content.includes('도와')
    ) {
      talents.push({
        name: '사회성/상담',
        icon: '🤝',
        description:
          '뛰어난 공감 능력과 소통 능력을 가지고 있습니다. 사람들과 잘 어울리고 타인의 마음을 이해하는 능력이 있어 상담이나 교육 분야에 적합합니다.',
        potential: 89,
        color: 'from-rose-500 to-pink-500',
        development: '다양한 사람들과 교류할 기회를 주세요. 봉사활동, 또래 관계, 멘토링 경험이 재능 발달에 도움됩니다.',
      });
    }

    // 창의성
    if (
      content.includes('신비') ||
      content.includes('특이한') ||
      content.includes('새로운') ||
      content.includes('달')
    ) {
      talents.push({
        name: '창의력/혁신',
        icon: '💡',
        description:
          '독창적인 사고력과 창의성이 뛰어납니다. 기존의 틀을 벗어난 새로운 아이디어를 내는 능력이 있으며, 혁신적인 분야에서 성공할 것입니다.',
        potential: 88,
        color: 'from-indigo-500 to-purple-500',
        development: '자유로운 상상력을 발휘할 기회를 주세요. 창의적 놀이, 발명 활동, 새로운 경험이 재능 개발에 좋습니다.',
      });
    }

    // 기본 재능
    if (talents.length === 0) {
      talents.push({
        name: '다재다능',
        icon: '🌟',
        description:
          '여러 분야에서 고른 재능을 보입니다. 특정 분야에 국한되지 않고 다양한 영역에서 능력을 발휘할 수 있는 잠재력을 가지고 있습니다.',
        potential: 85,
        color: 'from-purple-500 to-pink-500',
        development: '다양한 분야를 경험하게 하며 아이가 특히 흥미를 보이는 분야를 찾아 집중 육성하세요.',
      });
    }

    return talents.slice(0, 4);
  };

  // 숨겨진 재능 발굴
  const analyzeHiddenTalents = () => {
    const content = formData.dreamContent.toLowerCase();
    const hidden: Array<{
      talent: string;
      icon: string;
      hint: string;
    }> = [];

    if (content.includes('물') || content.includes('바다') || content.includes('강')) {
      hidden.push({
        talent: '수영/수상 스포츠',
        icon: '🏊',
        hint: '물과 관련된 꿈은 수상 스포츠에 특별한 재능이 있음을 암시합니다.',
      });
    }

    if (content.includes('요리') || content.includes('음식') || content.includes('맛')) {
      hidden.push({
        talent: '요리/미식',
        icon: '👨‍🍳',
        hint: '미각이 발달했고 요리에 재능이 있을 수 있습니다.',
      });
    }

    if (content.includes('동물') || content.includes('키우') || content.includes('돌보')) {
      hidden.push({
        talent: '동물 교감/수의학',
        icon: '🐾',
        hint: '동물과의 교감 능력이 뛰어나며 관련 분야에 적성이 있습니다.',
      });
    }

    if (content.includes('식물') || content.includes('나무') || content.includes('꽃밭')) {
      hidden.push({
        talent: '원예/식물학',
        icon: '🌱',
        hint: '식물을 돌보는 재능이 있으며 생명과학 분야에 흥미를 보일 수 있습니다.',
      });
    }

    if (content.includes('만들') || content.includes('조립') || content.includes('손')) {
      hidden.push({
        talent: '공예/제작',
        icon: '🔨',
        hint: '손재주가 좋고 무언가를 만드는 데 재능이 있습니다.',
      });
    }

    if (hidden.length === 0) {
      hidden.push({
        talent: '잠재적 재능',
        icon: '✨',
        hint: '다양한 활동을 경험하며 숨겨진 재능을 발견할 수 있습니다.',
      });
    }

    return hidden.slice(0, 3);
  };

  // 재능 발전 로드맵
  const getDevelopmentRoadmap = () => {
    const content = formData.dreamContent.toLowerCase();

    const roadmap = [
      {
        stage: '유아기 (0-7세)',
        icon: '👶',
        activities: [] as string[],
      },
      {
        stage: '아동기 (8-13세)',
        icon: '🧒',
        activities: [] as string[],
      },
      {
        stage: '청소년기 (14-19세)',
        icon: '👦',
        activities: [] as string[],
      },
    ];

    // 유아기
    if (content.includes('음악') || content.includes('노래')) {
      roadmap[0].activities.push('음악 감상과 리듬 놀이');
      roadmap[1].activities.push('악기 레슨 시작');
      roadmap[2].activities.push('본격적인 음악 교육과 공연 경험');
    } else if (content.includes('운동') || content.includes('뛰')) {
      roadmap[0].activities.push('기본 운동 능력 발달');
      roadmap[1].activities.push('전문 스포츠 훈련');
      roadmap[2].activities.push('경기 참여와 실전 경험');
    } else {
      roadmap[0].activities.push('다양한 분야 탐색');
      roadmap[1].activities.push('흥미 분야 집중');
      roadmap[2].activities.push('전문성 개발');
    }

    // 공통 활동 추가
    roadmap[0].activities.push('자유로운 놀이와 탐색', '기본 사회성 발달');
    roadmap[1].activities.push('자기주도적 학습', '또래 협력 활동');
    roadmap[2].activities.push('심화 학습과 경험', '진로 탐색');

    return roadmap;
  };

  // 재능 극대화 전략
  const getMaximizationStrategy = () => {
    return {
      principles: [
        {
          title: '조기 발견',
          description: '아이의 흥미와 재능을 일찍 발견하여 적절한 시기에 교육을 시작합니다.',
        },
        {
          title: '체계적 육성',
          description: '단계적이고 체계적인 교육 계획을 수립하여 재능을 키웁니다.',
        },
        {
          title: '실전 경험',
          description: '배운 것을 실제로 활용하고 발표할 기회를 많이 제공합니다.',
        },
        {
          title: '지속적 격려',
          description: '재능 개발 과정에서 격려와 칭찬으로 동기를 부여합니다.',
        },
      ],
      tips: [
        '아이의 속도를 존중하고 강요하지 않기',
        '재능 분야의 롤모델을 찾아주기',
        '관련 커뮤니티나 동아리 참여',
        '정기적인 평가와 피드백',
      ],
    };
  };

  const talents = analyzeTalents();
  const hiddenTalents = analyzeHiddenTalents();
  const developmentRoadmap = getDevelopmentRoadmap();
  const strategy = getMaximizationStrategy();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2
            className="text-2xl md:text-3xl font-bold text-white"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            재능과 특기
          </h2>
          <p className="text-slate-400 text-sm">타고난 재능과 발전 방향</p>
        </div>
      </div>

      {/* 주요 재능 */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-6 h-6 text-yellow-400" />
          <h3 className="text-xl font-bold text-white">주요 재능</h3>
        </div>
        <div className="space-y-4 mb-6">
          {talents.map((talent, index) => (
            <motion.div
              key={talent.name}
              className="glass rounded-2xl p-6"
              variants={itemVariants}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-5xl">{talent.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xl font-bold text-white">{talent.name}</h4>
                    <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${talent.color} text-white text-sm font-semibold`}>
                      {talent.potential}%
                    </div>
                  </div>
                  <p className="text-slate-300 leading-relaxed mb-3">{talent.description}</p>

                  {/* 잠재력 바 */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-400 text-sm">재능 잠재력</span>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.round(talent.potential / 20)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-slate-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${talent.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${talent.potential}%` }}
                        transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                      />
                    </div>
                  </div>

                  {/* 발전 방법 */}
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold text-sm">발전 방법</span>
                    </div>
                    <p className="text-slate-300 text-sm">{talent.development}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 숨겨진 재능 */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-6 h-6 text-yellow-400" />
          <h3 className="text-xl font-bold text-white">숨겨진 재능</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {hiddenTalents.map((hidden, index) => (
            <motion.div
              key={hidden.talent}
              className="glass rounded-xl p-5"
              variants={itemVariants}
            >
              <div className="text-center mb-3">
                <div className="text-4xl mb-2">{hidden.icon}</div>
                <h4 className="font-bold text-white mb-2">{hidden.talent}</h4>
              </div>
              <p className="text-slate-300 text-sm text-center">{hidden.hint}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 재능 발전 로드맵 */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-bold text-white">재능 발전 로드맵</h3>
        </div>
        <div className="space-y-4 mb-6">
          {developmentRoadmap.map((stage, index) => (
            <motion.div
              key={stage.stage}
              className="glass rounded-xl p-5"
              variants={itemVariants}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{stage.icon}</span>
                <h4 className="font-bold text-white text-lg">{stage.stage}</h4>
              </div>
              <ul className="space-y-2">
                {stage.activities.map((activity, actIndex) => (
                  <li key={actIndex} className="flex items-start gap-2 text-slate-300 text-sm">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>{activity}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 재능 극대화 전략 */}
      <motion.div className="glass rounded-2xl p-6 mb-6" variants={itemVariants}>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-6 h-6 text-emerald-400" />
          <h3 className="text-xl font-bold text-white">재능 극대화 전략</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {strategy.principles.map((principle, index) => (
            <div key={principle.title} className="bg-slate-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <h4 className="font-semibold text-emerald-400">{principle.title}</h4>
              </div>
              <p className="text-slate-300 text-sm">{principle.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-slate-800/50 rounded-lg p-4">
          <h4 className="font-semibold text-purple-400 mb-3">실천 팁</h4>
          <ul className="space-y-2">
            {strategy.tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2 text-slate-300 text-sm">
                <span className="text-purple-400">✓</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* 종합 조언 */}
      <motion.div
        className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20"
        variants={itemVariants}
      >
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span className="text-2xl">⭐</span>
          재능 발전 종합 조언
        </h3>
        <p className="text-slate-200 leading-relaxed mb-3">
          {formData.name}님은 여러 분야에서 뛰어난 재능을 타고났습니다.
          이러한 재능들을 체계적으로 발전시키고, 적절한 시기에 적절한 교육을 제공한다면
          각 분야에서 탁월한 성과를 이루고 행복한 인생을 살아갈 것입니다.
        </p>
        <p className="text-slate-300 text-sm">
          💡 재능은 타고나는 것이지만, 발전은 노력과 환경에 달려 있습니다.
          부모님의 지속적인 관심과 격려가 아이의 재능을 꽃피우는 가장 큰 원동력입니다.
        </p>
      </motion.div>
    </motion.div>
  );
}
