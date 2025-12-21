'use client';

import { motion } from 'framer-motion';
import { Heart, Activity, Shield, AlertCircle, Sparkles, TrendingUp } from 'lucide-react';
import { TaemongFormData } from '@/components/TaemongForm';

interface TaemongHealthProps {
  formData: TaemongFormData;
}

export default function TaemongHealth({ formData }: TaemongHealthProps) {
  // 건강 체질 분석
  const analyzeConstitution = () => {
    const content = formData.dreamContent.toLowerCase();

    // 체질 분석
    if (
      content.includes('용') ||
      content.includes('호랑이') ||
      content.includes('해') ||
      content.includes('불') ||
      content.includes('태양')
    ) {
      return {
        type: '태양인 체질',
        icon: '☀️',
        description:
          '기운이 왕성하고 활동적인 체질입니다. 에너지가 넘치고 활발하지만, 과도한 활동으로 인한 피로에 주의해야 합니다.',
        characteristics: [
          '활동적이고 에너지가 넘침',
          '더위를 잘 타는 편',
          '빠른 신진대사',
          '외향적이고 활발한 성격',
        ],
        color: 'from-orange-500 to-red-500',
      };
    } else if (
      content.includes('달') ||
      content.includes('물') ||
      content.includes('강') ||
      content.includes('바다') ||
      content.includes('비')
    ) {
      return {
        type: '소음인 체질',
        icon: '🌙',
        description:
          '차분하고 섬세한 체질입니다. 감수성이 풍부하고 조용한 성격이지만, 소화기 계통과 면역력 강화에 신경 써야 합니다.',
        characteristics: [
          '섬세하고 예민한 편',
          '추위를 잘 타는 경향',
          '소화기능이 약할 수 있음',
          '조용하고 차분한 성격',
        ],
        color: 'from-blue-500 to-cyan-500',
      };
    } else if (
      content.includes('땅') ||
      content.includes('소') ||
      content.includes('산') ||
      content.includes('바위') ||
      content.includes('나무')
    ) {
      return {
        type: '태음인 체질',
        icon: '🌳',
        description:
          '안정적이고 건강한 체질입니다. 체력이 좋고 지구력이 뛰어나지만, 비만에 주의하고 규칙적인 운동이 필요합니다.',
        characteristics: [
          '체력이 좋고 튼튼함',
          '골격이 크고 건강함',
          '지구력이 뛰어남',
          '차분하고 신중한 성격',
        ],
        color: 'from-green-500 to-emerald-500',
      };
    } else if (
      content.includes('바람') ||
      content.includes('새') ||
      content.includes('나비') ||
      content.includes('꽃') ||
      content.includes('구름')
    ) {
      return {
        type: '소양인 체질',
        icon: '🌸',
        description:
          '민첩하고 활발한 체질입니다. 행동이 빠르고 적응력이 좋지만, 신경계통과 스트레스 관리에 신경 써야 합니다.',
        characteristics: [
          '민첩하고 빠른 행동',
          '적응력이 뛰어남',
          '신경이 예민할 수 있음',
          '활발하고 사교적인 성격',
        ],
        color: 'from-pink-500 to-rose-500',
      };
    }

    // 기본 체질
    return {
      type: '조화로운 체질',
      icon: '⚖️',
      description:
        '균형 잡힌 건강한 체질입니다. 여러 체질의 장점을 고루 갖추고 있어 전체적으로 안정적인 건강을 유지할 것입니다.',
      characteristics: [
        '균형잡힌 체력',
        '안정적인 면역력',
        '적응력이 좋음',
        '조화로운 성장 발달',
      ],
      color: 'from-purple-500 to-indigo-500',
    };
  };

  // 주의해야 할 질병 분석
  const analyzeHealthConcerns = () => {
    const content = formData.dreamContent.toLowerCase();
    const concerns: Array<{
      area: string;
      icon: string;
      warning: string;
      prevention: string;
      severity: 'low' | 'medium' | 'high';
    }> = [];

    // 소화기 계통
    if (
      content.includes('물') ||
      content.includes('음식') ||
      content.includes('과일') ||
      content.includes('차가운')
    ) {
      concerns.push({
        area: '소화기 건강',
        icon: '🍎',
        warning: '소화기 계통이 예민할 수 있습니다. 차가운 음식이나 자극적인 음식은 피하세요.',
        prevention:
          '따뜻한 음식 섭취, 규칙적인 식사 시간, 소화가 잘 되는 음식 위주로 식단 구성',
        severity: 'medium',
      });
    }

    // 호흡기 계통
    if (
      content.includes('새') ||
      content.includes('바람') ||
      content.includes('공기') ||
      content.includes('하늘')
    ) {
      concerns.push({
        area: '호흡기 건강',
        icon: '🫁',
        warning: '호흡기가 약할 수 있습니다. 환절기나 미세먼지가 많은 날 특히 주의하세요.',
        prevention: '실내 공기 청정, 규칙적인 환기, 적절한 습도 유지, 호흡기 운동',
        severity: 'medium',
      });
    }

    // 피부 건강
    if (
      content.includes('꽃') ||
      content.includes('나비') ||
      content.includes('아름다운') ||
      content.includes('빛')
    ) {
      concerns.push({
        area: '피부 건강',
        icon: '✨',
        warning: '피부가 민감할 수 있습니다. 자외선과 화학성분에 주의가 필요합니다.',
        prevention: '순한 제품 사용, 자외선 차단, 충분한 수분 공급, 알레르기 유발 물질 주의',
        severity: 'low',
      });
    }

    // 심혈관 건강
    if (
      content.includes('용') ||
      content.includes('호랑이') ||
      content.includes('빠른') ||
      content.includes('뛰')
    ) {
      concerns.push({
        area: '심혈관 건강',
        icon: '❤️',
        warning: '활동이 과도하면 심장에 무리가 갈 수 있습니다. 적절한 휴식이 필요합니다.',
        prevention: '규칙적인 유산소 운동, 충분한 휴식, 스트레스 관리, 균형잡힌 활동',
        severity: 'low',
      });
    }

    // 신경계 건강
    if (
      content.includes('번개') ||
      content.includes('빛') ||
      content.includes('빠른') ||
      content.includes('많은')
    ) {
      concerns.push({
        area: '신경계 건강',
        icon: '🧠',
        warning: '신경이 예민하고 긴장을 많이 할 수 있습니다. 스트레스 관리가 중요합니다.',
        prevention: '충분한 수면, 명상이나 요가, 안정적인 환경, 규칙적인 생활 패턴',
        severity: 'medium',
      });
    }

    // 기본 주의사항
    if (concerns.length === 0) {
      concerns.push({
        area: '전반적 건강',
        icon: '🌟',
        warning: '특별히 주의해야 할 질병은 없으나, 예방적 건강관리가 중요합니다.',
        prevention: '규칙적인 운동, 균형잡힌 식단, 충분한 수면, 정기적인 건강검진',
        severity: 'low',
      });
    }

    return concerns.slice(0, 3);
  };

  // 건강 관리 조언
  const getHealthAdvice = () => {
    const content = formData.dreamContent.toLowerCase();
    const advice: Array<{
      category: string;
      icon: string;
      tips: string[];
    }> = [];

    // 식단 관리
    const dietTips: string[] = [];
    if (content.includes('물') || content.includes('바다') || content.includes('강')) {
      dietTips.push('수분 섭취를 충분히 하세요');
      dietTips.push('신선한 해산물이 건강에 도움됩니다');
      dietTips.push('싱겁게 먹는 습관을 들이세요');
    } else if (content.includes('불') || content.includes('태양') || content.includes('뜨거운')) {
      dietTips.push('시원한 성질의 음식이 좋습니다');
      dietTips.push('과도한 자극적인 음식은 피하세요');
      dietTips.push('녹황색 채소를 많이 섭취하세요');
    } else if (content.includes('땅') || content.includes('산') || content.includes('나무')) {
      dietTips.push('통곡물과 견과류가 좋습니다');
      dietTips.push('규칙적인 식사가 중요합니다');
      dietTips.push('신선한 채소와 과일을 충분히 드세요');
    } else {
      dietTips.push('균형잡힌 영양소 섭취가 중요합니다');
      dietTips.push('제철 음식을 위주로 드세요');
      dietTips.push('과식을 피하고 적당량을 드세요');
    }
    advice.push({
      category: '식단 관리',
      icon: '🥗',
      tips: dietTips,
    });

    // 운동 관리
    const exerciseTips: string[] = [];
    if (
      content.includes('호랑이') ||
      content.includes('용') ||
      content.includes('뛰') ||
      content.includes('빠른')
    ) {
      exerciseTips.push('활발한 운동이 적합합니다');
      exerciseTips.push('팀 스포츠를 즐기면 좋습니다');
      exerciseTips.push('단, 과도한 운동은 피하고 적절한 휴식을 취하세요');
    } else if (content.includes('물') || content.includes('바다') || content.includes('헤엄')) {
      exerciseTips.push('수영이나 수상 운동이 특히 좋습니다');
      exerciseTips.push('부드러운 스트레칭을 자주 하세요');
      exerciseTips.push('요가나 필라테스도 추천합니다');
    } else if (content.includes('새') || content.includes('나비') || content.includes('날')) {
      exerciseTips.push('가벼운 유산소 운동이 좋습니다');
      exerciseTips.push('산책이나 조깅을 즐기세요');
      exerciseTips.push('춤이나 체조도 좋습니다');
    } else {
      exerciseTips.push('매일 30분 이상 신체 활동을 하세요');
      exerciseTips.push('야외 활동을 자주 하면 좋습니다');
      exerciseTips.push('아이가 좋아하는 운동을 찾아주세요');
    }
    advice.push({
      category: '운동 관리',
      icon: '⚽',
      tips: exerciseTips,
    });

    // 수면 관리
    advice.push({
      category: '수면 관리',
      icon: '😴',
      tips: [
        '규칙적인 취침 시간을 지키세요',
        '잠들기 전 편안한 환경을 만들어주세요',
        '충분한 수면 시간을 확보하세요 (영유아 12-14시간, 학령기 9-11시간)',
        '낮잠 시간도 적절히 활용하세요',
      ],
    });

    // 정서 관리
    const emotionTips: string[] = [];
    if (
      content.includes('밝은') ||
      content.includes('태양') ||
      content.includes('빛') ||
      content.includes('웃')
    ) {
      emotionTips.push('긍정적인 에너지를 잘 유지하세요');
      emotionTips.push('사회성 발달에 도움이 되는 활동을 많이 하세요');
      emotionTips.push('가끔은 조용히 쉬는 시간도 필요합니다');
    } else if (content.includes('조용한') || content.includes('달') || content.includes('밤')) {
      emotionTips.push('아이의 섬세한 감성을 이해해주세요');
      emotionTips.push('안정적인 환경을 제공하세요');
      emotionTips.push('천천히 적응할 수 있도록 기다려주세요');
    } else {
      emotionTips.push('아이의 감정 표현을 존중해주세요');
      emotionTips.push('충분한 사랑과 관심을 주세요');
      emotionTips.push('스트레스 받지 않도록 배려해주세요');
    }
    advice.push({
      category: '정서 관리',
      icon: '💚',
      tips: emotionTips,
    });

    return advice;
  };

  // 성장 발달 예측
  const getGrowthPrediction = () => {
    const content = formData.dreamContent.toLowerCase();

    if (
      content.includes('큰') ||
      content.includes('크게') ||
      content.includes('높은') ||
      content.includes('키')
    ) {
      return {
        height: '평균 이상',
        description: '키가 크게 자랄 가능성이 높습니다',
        recommendation: '성장기 영양관리와 적절한 운동이 중요합니다',
      };
    } else if (
      content.includes('작은') ||
      content.includes('아담한') ||
      content.includes('귀여운')
    ) {
      return {
        height: '평균 수준',
        description: '아담하고 균형잡힌 체형으로 자랄 것입니다',
        recommendation: '균형잡힌 영양섭취로 건강한 성장을 도우세요',
      };
    } else {
      return {
        height: '평균 수준',
        description: '표준 성장 곡선을 따라 건강하게 자랄 것입니다',
        recommendation: '규칙적인 생활과 충분한 영양으로 성장을 지원하세요',
      };
    }
  };

  const constitution = analyzeConstitution();
  const healthConcerns = analyzeHealthConcerns();
  const healthAdvice = getHealthAdvice();
  const growthPrediction = getGrowthPrediction();

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
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center">
          <Heart className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2
            className="text-2xl md:text-3xl font-bold text-white"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            건강운
          </h2>
          <p className="text-slate-400 text-sm">아이의 건강 체질과 관리법</p>
        </div>
      </div>

      {/* 체질 분석 */}
      <motion.div className="glass rounded-2xl p-6 mb-6" variants={itemVariants}>
        <div className="flex items-center gap-3 mb-4">
          <div className="text-5xl">{constitution.icon}</div>
          <div>
            <h3 className="text-2xl font-bold text-white">{constitution.type}</h3>
            <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${constitution.color} text-white text-sm font-semibold mt-1`}>
              타고난 체질
            </div>
          </div>
        </div>
        <p className="text-slate-300 leading-relaxed mb-4">{constitution.description}</p>
        <div className="grid md:grid-cols-2 gap-3">
          {constitution.characteristics.map((char, index) => (
            <div key={index} className="flex items-center gap-2 text-slate-300">
              <Sparkles className="w-4 h-4 text-rose-400" />
              <span>{char}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 주의해야 할 건강 사항 */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-6 h-6 text-rose-400" />
          <h3 className="text-xl font-bold text-white">주의해야 할 건강 사항</h3>
        </div>
        <div className="space-y-4 mb-6">
          {healthConcerns.map((concern, index) => (
            <motion.div
              key={concern.area}
              className="glass rounded-xl p-5"
              variants={itemVariants}
            >
              <div className="flex items-start gap-3">
                <div className="text-3xl">{concern.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold text-white">{concern.area}</h4>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        concern.severity === 'high'
                          ? 'bg-red-500/20 text-red-400'
                          : concern.severity === 'medium'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-green-500/20 text-green-400'
                      }`}
                    >
                      {concern.severity === 'high'
                        ? '중요'
                        : concern.severity === 'medium'
                        ? '보통'
                        : '낮음'}
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm mb-2">{concern.warning}</p>
                  <div className="bg-slate-800/50 rounded-lg p-3 mt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold text-sm">예방법</span>
                    </div>
                    <p className="text-slate-300 text-sm">{concern.prevention}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 건강 관리 조언 */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-6 h-6 text-emerald-400" />
          <h3 className="text-xl font-bold text-white">맞춤 건강 관리법</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {healthAdvice.map((advice, index) => (
            <motion.div
              key={advice.category}
              className="glass rounded-xl p-5"
              variants={itemVariants}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-3xl">{advice.icon}</span>
                <h4 className="font-bold text-white">{advice.category}</h4>
              </div>
              <ul className="space-y-2">
                {advice.tips.map((tip, tipIndex) => (
                  <li key={tipIndex} className="flex items-start gap-2 text-slate-300 text-sm">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 성장 발달 예측 */}
      <motion.div
        className="glass rounded-2xl p-6 mb-6"
        variants={itemVariants}
      >
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-bold text-white">성장 발달 예측</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-slate-800/50 rounded-xl">
            <div className="text-3xl mb-2">📏</div>
            <div className="text-blue-400 font-semibold mb-1">예상 키</div>
            <div className="text-white font-bold">{growthPrediction.height}</div>
          </div>
          <div className="md:col-span-2 p-4 bg-slate-800/50 rounded-xl">
            <p className="text-slate-300 mb-2">{growthPrediction.description}</p>
            <div className="flex items-start gap-2 text-sm">
              <Sparkles className="w-4 h-4 text-blue-400 mt-0.5" />
              <p className="text-slate-400">{growthPrediction.recommendation}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 종합 건강 조언 */}
      <motion.div
        className="p-6 bg-gradient-to-br from-rose-500/10 to-pink-500/10 rounded-2xl border border-rose-500/20"
        variants={itemVariants}
      >
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span className="text-2xl">💖</span>
          종합 건강 조언
        </h3>
        <p className="text-slate-200 leading-relaxed mb-3">
          {formData.name}님은 {constitution.type}으로, 타고난 건강 기질이 좋습니다.
          체질에 맞는 식단과 생활습관을 유지하면서, 주의해야 할 건강 사항들을 잘 관리한다면
          평생 건강하고 활력 넘치는 삶을 살 수 있을 것입니다.
        </p>
        <p className="text-slate-300 text-sm">
          💡 건강은 어릴 때부터의 관리가 가장 중요합니다. 부모님의 세심한 관심과 사랑으로
          아이의 건강한 성장을 도와주세요.
        </p>
      </motion.div>
    </motion.div>
  );
}
