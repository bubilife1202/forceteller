'use client';

import { motion } from 'framer-motion';
import { Briefcase, Heart, TrendingUp, Star, Sparkles, Crown } from 'lucide-react';
import { TaemongFormData } from '@/components/TaemongForm';

interface TaemongFutureProps {
  formData: TaemongFormData;
}

export default function TaemongFuture({ formData }: TaemongFutureProps) {
  // 적성 직업 분석
  const analyzeCareerPath = () => {
    const content = formData.dreamContent.toLowerCase();
    const careers: Array<{
      category: string;
      jobs: string[];
      description: string;
      icon: string;
      suitability: number;
    }> = [];

    // 리더십/경영
    if (
      content.includes('용') ||
      content.includes('왕') ||
      content.includes('해') ||
      content.includes('태양') ||
      content.includes('독수리')
    ) {
      careers.push({
        category: '리더십/경영',
        jobs: ['CEO', '정치가', '경영인', '임원', '사업가', '관리자'],
        description:
          '타고난 리더십과 추진력으로 조직을 이끄는 능력이 탁월합니다. 많은 사람을 이끌고 큰 성과를 내는 경영자나 리더로 성공할 것입니다.',
        icon: '👔',
        suitability: 95,
      });
    }

    // 예술/문화
    if (
      content.includes('꽃') ||
      content.includes('나비') ||
      content.includes('아름다운') ||
      content.includes('그림') ||
      content.includes('색')
    ) {
      careers.push({
        category: '예술/문화',
        jobs: ['화가', '디자이너', '예술가', '큐레이터', '패션 디렉터', '건축가'],
        description:
          '뛰어난 미적 감각과 창의력으로 예술 분야에서 두각을 나타낼 것입니다. 예술적 재능을 발휘하여 문화 발전에 기여할 수 있습니다.',
        icon: '🎨',
        suitability: 93,
      });
    }

    // 교육/학술
    if (
      content.includes('책') ||
      content.includes('글') ||
      content.includes('뱀') ||
      content.includes('올빼미') ||
      content.includes('현명한')
    ) {
      careers.push({
        category: '교육/학술',
        jobs: ['교수', '연구원', '교사', '학자', '작가', '언론인'],
        description:
          '깊은 지혜와 분석력으로 학문이나 교육 분야에서 성공할 것입니다. 지식을 탐구하고 가르치는 일에서 보람을 느낄 것입니다.',
        icon: '📚',
        suitability: 94,
      });
    }

    // 의료/보건
    if (
      content.includes('치료') ||
      content.includes('건강') ||
      content.includes('약') ||
      content.includes('돕')
    ) {
      careers.push({
        category: '의료/보건',
        jobs: ['의사', '한의사', '간호사', '약사', '치료사', '보건 전문가'],
        description:
          '사람을 돕고 치유하는 능력이 있습니다. 의료 분야에서 많은 사람들의 건강과 생명을 지키는 전문가가 될 것입니다.',
        icon: '⚕️',
        suitability: 90,
      });
    }

    // 음악/공연
    if (
      content.includes('음악') ||
      content.includes('노래') ||
      content.includes('춤') ||
      content.includes('소리')
    ) {
      careers.push({
        category: '음악/공연',
        jobs: ['음악가', '가수', '작곡가', '무용가', '배우', '연예인'],
        description:
          '뛰어난 예술적 감각과 표현력으로 무대에서 빛날 것입니다. 음악이나 공연 예술 분야에서 대중에게 감동을 줄 수 있습니다.',
        icon: '🎵',
        suitability: 92,
      });
    }

    // 과학/기술
    if (
      content.includes('별') ||
      content.includes('기계') ||
      content.includes('숫자') ||
      content.includes('발명')
    ) {
      careers.push({
        category: '과학/기술',
        jobs: ['과학자', '엔지니어', '개발자', '연구원', '발명가', 'IT 전문가'],
        description:
          '논리적 사고와 문제 해결 능력이 뛰어납니다. 과학기술 분야에서 혁신적인 발견이나 발명을 할 수 있습니다.',
        icon: '🔬',
        suitability: 91,
      });
    }

    // 체육/스포츠
    if (
      content.includes('호랑이') ||
      content.includes('빠른') ||
      content.includes('뛰') ||
      content.includes('힘')
    ) {
      careers.push({
        category: '체육/스포츠',
        jobs: ['운동선수', '코치', '스포츠 해설가', '체육 교사', '트레이너', 'e스포츠 선수'],
        description:
          '뛰어난 신체 능력과 승부욕으로 스포츠 분야에서 성공할 것입니다. 선수나 지도자로서 큰 업적을 남길 수 있습니다.',
        icon: '⚽',
        suitability: 89,
      });
    }

    // 금융/재정
    if (
      content.includes('금') ||
      content.includes('돈') ||
      content.includes('보석') ||
      content.includes('돼지')
    ) {
      careers.push({
        category: '금융/재정',
        jobs: ['금융인', '회계사', '펀드매니저', '투자 전문가', '재무 설계사', '경제학자'],
        description:
          '재물운이 뛰어나고 경제 감각이 탁월합니다. 금융 분야에서 성공하여 큰 부를 이룰 수 있습니다.',
        icon: '💰',
        suitability: 88,
      });
    }

    // 법률/행정
    if (
      content.includes('법') ||
      content.includes('정의') ||
      content.includes('공정') ||
      content.includes('판단')
    ) {
      careers.push({
        category: '법률/행정',
        jobs: ['변호사', '판사', '검사', '공무원', '법무사', '행정사'],
        description:
          '정의감이 강하고 판단력이 뛰어납니다. 법률이나 행정 분야에서 공정한 사회를 만드는 데 기여할 것입니다.',
        icon: '⚖️',
        suitability: 87,
      });
    }

    // 기본 직업
    if (careers.length === 0) {
      careers.push({
        category: '종합 전문직',
        jobs: ['전문 관리자', '컨설턴트', '기획자', '마케터', '인사 전문가', '프로젝트 매니저'],
        description:
          '다양한 분야에서 능력을 발휘할 수 있습니다. 여러 경험을 통해 자신에게 맞는 전문 분야를 찾아 성공할 것입니다.',
        icon: '💼',
        suitability: 85,
      });
    }

    return careers.slice(0, 3);
  };

  // 결혼운 분석
  const analyzeMarriageFortune = () => {
    const content = formData.dreamContent.toLowerCase();

    let timing = '';
    let partnerType = '';
    let marriageQuality = '';

    // 결혼 시기
    if (
      content.includes('빠른') ||
      content.includes('일찍') ||
      content.includes('젊')
    ) {
      timing = '20대 중후반에 이른 결혼';
    } else if (
      content.includes('늦은') ||
      content.includes('천천히') ||
      content.includes('느린')
    ) {
      timing = '30대 중반 이후 만혼';
    } else {
      timing = '20대 후반 ~ 30대 초반 적령기 결혼';
    }

    // 배우자 타입
    if (
      content.includes('용') ||
      content.includes('호랑이') ||
      content.includes('강한')
    ) {
      partnerType = '리더십이 강하고 성공한 배우자';
    } else if (
      content.includes('꽃') ||
      content.includes('아름다운') ||
      content.includes('부드러운')
    ) {
      partnerType = '온화하고 배려심 많은 배우자';
    } else if (
      content.includes('똑똑한') ||
      content.includes('현명한') ||
      content.includes('책')
    ) {
      partnerType = '지적이고 교양있는 배우자';
    } else {
      partnerType = '성실하고 믿음직한 배우자';
    }

    // 결혼 생활
    if (
      content.includes('행복') ||
      content.includes('기쁨') ||
      content.includes('웃음') ||
      content.includes('밝은')
    ) {
      marriageQuality = '행복하고 화목한 결혼 생활을 영위할 것입니다. 부부 금슬이 좋고 서로를 존중하며 평생 동반자로 살아갈 것입니다.';
    } else if (
      content.includes('노력') ||
      content.includes('일') ||
      content.includes('땀')
    ) {
      marriageQuality = '서로 노력하며 만들어가는 결혼 생활입니다. 초기에는 어려움이 있을 수 있으나 협력하여 행복한 가정을 이룰 것입니다.';
    } else {
      marriageQuality = '안정적이고 평온한 결혼 생활을 할 것입니다. 큰 풍파 없이 서로를 이해하고 배려하며 살아갈 것입니다.';
    }

    return {
      timing,
      partnerType,
      marriageQuality,
      score: 88,
    };
  };

  // 자녀운 분석
  const analyzeChildrenFortune = () => {
    const content = formData.dreamContent.toLowerCase();

    let numberOfChildren = '';
    let childrenBlessings = '';

    if (content.includes('많은') || content.includes('여러') || content.includes('다수')) {
      numberOfChildren = '2-3명의 자녀';
    } else if (content.includes('하나') || content.includes('귀한') || content.includes('특별한')) {
      numberOfChildren = '1명의 소중한 자녀';
    } else {
      numberOfChildren = '2명 내외의 자녀';
    }

    if (
      content.includes('효도') ||
      content.includes('착한') ||
      content.includes('순한')
    ) {
      childrenBlessings = '효심이 깊고 부모에게 큰 효도를 할 자녀를 둘 것입니다. 자녀로 인한 복이 많고 노후가 편안할 것입니다.';
    } else if (
      content.includes('똑똑한') ||
      content.includes('재능') ||
      content.includes('뛰어난')
    ) {
      childrenBlessings = '재능있고 우수한 자녀를 둘 것입니다. 자녀가 사회적으로 성공하여 가문을 빛낼 것입니다.';
    } else {
      childrenBlessings = '건강하고 밝은 자녀를 둘 것입니다. 자녀와 좋은 관계를 유지하며 행복한 가정을 이룰 것입니다.';
    }

    return {
      numberOfChildren,
      childrenBlessings,
    };
  };

  // 성공 시기 분석
  const analyzeSuccessTiming = () => {
    const content = formData.dreamContent.toLowerCase();

    const timeline = [
      {
        period: '20대',
        icon: '🌱',
        description: '',
        fortune: 70,
      },
      {
        period: '30대',
        icon: '🌿',
        description: '',
        fortune: 85,
      },
      {
        period: '40대',
        icon: '🌳',
        description: '',
        fortune: 90,
      },
      {
        period: '50대 이후',
        icon: '🏆',
        description: '',
        fortune: 95,
      },
    ];

    if (
      content.includes('빠른') ||
      content.includes('일찍') ||
      content.includes('어린')
    ) {
      timeline[0].description = '일찍부터 두각을 나타내며 성공의 기반을 다집니다';
      timeline[1].description = '본격적으로 성공하여 사회적 지위를 확립합니다';
      timeline[2].description = '정점에 이르러 큰 성공을 거둡니다';
      timeline[3].description = '안정적인 성공을 유지하며 여유로운 삶을 삽니다';
    } else if (
      content.includes('늦은') ||
      content.includes('천천히') ||
      content.includes('점진')
    ) {
      timeline[0].description = '기초를 다지고 경험을 쌓는 시기입니다';
      timeline[1].description = '서서히 실력을 인정받기 시작합니다';
      timeline[2].description = '본격적인 성공의 시기가 찾아옵니다';
      timeline[3].description = '대기만성하여 큰 성공과 명예를 얻습니다';
    } else {
      timeline[0].description = '학습과 성장의 시기로 기반을 만듭니다';
      timeline[1].description = '커리어가 본격화되며 성과를 내기 시작합니다';
      timeline[2].description = '전성기를 맞이하여 최고의 성과를 냅니다';
      timeline[3].description = '성숙한 성공으로 안정과 명예를 누립니다';
    }

    return timeline;
  };

  // 재물운 분석
  const analyzeWealthFortune = () => {
    const content = formData.dreamContent.toLowerCase();

    let wealthLevel = '';
    let wealthSource = '';
    let advice = '';

    if (
      content.includes('금') ||
      content.includes('보석') ||
      content.includes('돼지') ||
      content.includes('잉어')
    ) {
      wealthLevel = '대재물운 - 큰 부를 이룰 운명';
      wealthSource = '사업, 투자, 부동산 등 다양한 경로로 재물을 축적할 것입니다.';
      advice = '재물운이 강하나, 과욕은 금물입니다. 나눔과 베풂으로 더 큰 복을 받을 것입니다.';
    } else if (
      content.includes('곡식') ||
      content.includes('땅') ||
      content.includes('집')
    ) {
      wealthLevel = '안정적 재물운 - 꾸준한 재산 형성';
      wealthSource = '근로 소득과 저축, 부동산을 통해 안정적으로 재산을 모을 것입니다.';
      advice = '착실한 저축과 투자로 노후를 든든히 준비할 수 있습니다.';
    } else {
      wealthLevel = '중상급 재물운 - 풍족한 경제생활';
      wealthSource = '전문직이나 사업을 통해 넉넉한 수입을 올릴 것입니다.';
      advice = '계획적인 재무 관리로 더 큰 부를 이룰 수 있습니다.';
    }

    return {
      wealthLevel,
      wealthSource,
      advice,
      score: 87,
    };
  };

  const careerPath = analyzeCareerPath();
  const marriageFortune = analyzeMarriageFortune();
  const childrenFortune = analyzeChildrenFortune();
  const successTiming = analyzeSuccessTiming();
  const wealthFortune = analyzeWealthFortune();

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
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
          <Crown className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2
            className="text-2xl md:text-3xl font-bold text-white"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            성인 후 미래 예측
          </h2>
          <p className="text-slate-400 text-sm">직업, 결혼, 성공의 미래</p>
        </div>
      </div>

      {/* 적성 직업 */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-2 mb-4">
          <Briefcase className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-bold text-white">적성 직업 분야</h3>
        </div>
        <div className="space-y-4 mb-6">
          {careerPath.map((career, index) => (
            <motion.div
              key={career.category}
              className="glass rounded-2xl p-6"
              variants={itemVariants}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-5xl">{career.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xl font-bold text-white">{career.category}</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.round(career.suitability / 20)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-slate-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-blue-400 font-semibold">{career.suitability}%</span>
                    </div>
                  </div>
                  <p className="text-slate-300 leading-relaxed mb-3">{career.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {career.jobs.map((job, jobIndex) => (
                      <span
                        key={jobIndex}
                        className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                      >
                        {job}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${career.suitability}%` }}
                  transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 결혼운 */}
      <motion.div className="glass rounded-2xl p-6 mb-6" variants={itemVariants}>
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-6 h-6 text-rose-400" />
          <h3 className="text-xl font-bold text-white">결혼운</h3>
        </div>

        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-800/50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-pink-400" />
                <h4 className="font-semibold text-pink-400">결혼 시기</h4>
              </div>
              <p className="text-slate-300 text-sm">{marriageFortune.timing}</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-5 h-5 text-rose-400" />
                <h4 className="font-semibold text-rose-400">배우자 타입</h4>
              </div>
              <p className="text-slate-300 text-sm">{marriageFortune.partnerType}</p>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <h4 className="font-semibold text-yellow-400">결혼 생활</h4>
            </div>
            <p className="text-slate-300 text-sm mb-3">{marriageFortune.marriageQuality}</p>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm">결혼운 점수</span>
              <span className="text-rose-400 font-bold">{marriageFortune.score}점</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden mt-2">
              <motion.div
                className="h-full bg-gradient-to-r from-rose-500 to-pink-500"
                initial={{ width: 0 }}
                whileInView={{ width: `${marriageFortune.score}%` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* 자녀운 */}
      <motion.div className="glass rounded-2xl p-6 mb-6" variants={itemVariants}>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-bold text-white">자녀운</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-slate-800/50 rounded-xl p-4">
            <div className="text-center mb-2">
              <div className="text-4xl mb-2">👶</div>
              <h4 className="font-semibold text-purple-400">자녀 수</h4>
            </div>
            <p className="text-slate-300 text-sm text-center">{childrenFortune.numberOfChildren}</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <h4 className="font-semibold text-yellow-400">자녀복</h4>
            </div>
            <p className="text-slate-300 text-sm">{childrenFortune.childrenBlessings}</p>
          </div>
        </div>
      </motion.div>

      {/* 성공 시기 */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-6 h-6 text-emerald-400" />
          <h3 className="text-xl font-bold text-white">연대별 성공 운세</h3>
        </div>
        <div className="space-y-3 mb-6">
          {successTiming.map((period, index) => (
            <motion.div
              key={period.period}
              className="glass rounded-xl p-5"
              variants={itemVariants}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{period.icon}</span>
                <div className="flex-1">
                  <h4 className="font-bold text-white">{period.period}</h4>
                  <p className="text-slate-300 text-sm">{period.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-emerald-400 font-bold text-lg">{period.fortune}%</div>
                  <div className="text-slate-500 text-xs">운세</div>
                </div>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 to-green-400"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${period.fortune}%` }}
                  transition={{ duration: 1, delay: 0.4 + index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 재물운 */}
      <motion.div className="glass rounded-2xl p-6 mb-6" variants={itemVariants}>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-yellow-400" />
          <h3 className="text-xl font-bold text-white">평생 재물운</h3>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl p-5 border border-yellow-500/20">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-yellow-400 text-lg">{wealthFortune.wealthLevel}</h4>
              <span className="text-yellow-400 font-bold text-xl">{wealthFortune.score}점</span>
            </div>
            <div className="h-3 bg-slate-800 rounded-full overflow-hidden mb-3">
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
                initial={{ width: 0 }}
                whileInView={{ width: `${wealthFortune.score}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-800/50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">💰</span>
                <h4 className="font-semibold text-yellow-400">재물 원천</h4>
              </div>
              <p className="text-slate-300 text-sm">{wealthFortune.wealthSource}</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">💡</span>
                <h4 className="font-semibold text-emerald-400">재물 조언</h4>
              </div>
              <p className="text-slate-300 text-sm">{wealthFortune.advice}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 종합 미래 운세 */}
      <motion.div
        className="p-6 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl border border-indigo-500/20"
        variants={itemVariants}
      >
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span className="text-2xl">✨</span>
          종합 미래 운세
        </h3>
        <p className="text-slate-200 leading-relaxed mb-3">
          {formData.name}님은 타고난 재능과 노력으로 {careerPath[0]?.category || '전문'} 분야에서 큰 성공을 거둘 것입니다.
          {marriageFortune.timing}을 하여 행복한 가정을 이루고, {childrenFortune.numberOfChildren}를 두어
          원만한 가족 관계를 유지할 것입니다. 재물운도 좋아 경제적으로 풍족한 삶을 살며,
          나이가 들수록 더욱 큰 성공과 명예를 얻을 것입니다.
        </p>
        <p className="text-slate-300 text-sm">
          💡 미래는 정해진 것이 아닙니다. 태몽이 보여주는 긍정적인 에너지를 바탕으로
          꾸준한 노력과 올바른 선택을 한다면, 더욱 밝고 성공적인 미래를 만들어갈 수 있습니다.
        </p>
      </motion.div>
    </motion.div>
  );
}
