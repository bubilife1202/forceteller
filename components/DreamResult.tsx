'use client';

import { motion } from 'framer-motion';
import { Cloud, ArrowLeft, RefreshCw, Star, Sparkles, AlertCircle, TrendingUp } from 'lucide-react';
import { DreamFormData } from './DreamForm';

interface DreamResultProps {
  formData: DreamFormData;
  onReset: () => void;
  onBack: () => void;
}

// 꿈 해석 데이터베이스
const dreamInterpretations: Record<string, {
  type: 'good' | 'bad' | 'neutral';
  title: string;
  meaning: string;
  detail: string;
  advice: string;
  luckyNumber?: number;
}> = {
  // 동물
  '뱀': {
    type: 'good',
    title: '재물과 행운의 상징',
    meaning: '뱀 꿈은 전통적으로 재물운과 깊이 관련됩니다.',
    detail: '뱀이 나타나는 꿈은 대체로 길몽입니다. 특히 큰 뱀이나 구렁이가 나오면 큰 재물이 들어올 징조이며, 뱀이 몸을 감거나 집에 들어오면 금전적 행운이 찾아옵니다. 단, 뱀에게 물리거나 뱀이 도망가면 주의가 필요합니다.',
    advice: '복권이나 투자에 좋은 시기일 수 있습니다. 기회를 놓치지 마세요.',
    luckyNumber: 7,
  },
  '돼지': {
    type: 'good',
    title: '부(富)와 풍요의 상징',
    meaning: '돼지 꿈은 재물과 복을 의미합니다.',
    detail: '돼지는 예로부터 부와 다산의 상징입니다. 돼지를 보거나 안는 꿈은 재물이 늘어날 징조이고, 돼지가 집에 들어오면 집안에 경사가 생깁니다. 살찐 돼지일수록 더 큰 행운을 의미합니다.',
    advice: '사업이나 금전 관련 결정에 자신감을 가지셔도 됩니다.',
    luckyNumber: 8,
  },
  '호랑이': {
    type: 'good',
    title: '권력과 명예의 상징',
    meaning: '호랑이 꿈은 권위와 성공을 나타냅니다.',
    detail: '호랑이를 타거나 호랑이가 순하게 다가오면 높은 지위에 오르거나 큰 성공을 거둘 수 있습니다. 호랑이에게 쫓기는 꿈은 강력한 경쟁자를 만날 수 있음을 암시하지만, 이겨내면 더 큰 성취를 얻습니다.',
    advice: '리더십을 발휘할 기회가 올 수 있습니다. 준비하세요.',
    luckyNumber: 3,
  },
  '개': {
    type: 'neutral',
    title: '충성과 인간관계의 상징',
    meaning: '개 꿈은 주변 사람들과의 관계를 나타냅니다.',
    detail: '개가 반갑게 맞이하면 좋은 친구나 조력자를 만날 수 있고, 개가 짖으면 소식이 들어올 징조입니다. 개에게 물리는 꿈은 주변인과의 갈등을 조심하라는 의미입니다.',
    advice: '인간관계에 신경 쓰시고, 신뢰할 수 있는 사람을 곁에 두세요.',
    luckyNumber: 5,
  },
  '고양이': {
    type: 'neutral',
    title: '직감과 비밀의 상징',
    meaning: '고양이 꿈은 직감력과 숨겨진 것을 의미합니다.',
    detail: '고양이가 나오는 꿈은 상황에 따라 해석이 다릅니다. 예쁜 고양이는 좋은 인연을, 검은 고양이는 숨겨진 적이나 비밀이 있음을 암시합니다. 고양이가 울면 구설수에 주의하세요.',
    advice: '직감을 믿되, 주변을 잘 살피세요. 표면만 보지 마시고요.',
    luckyNumber: 4,
  },
  '용': {
    type: 'good',
    title: '최고의 길몽',
    meaning: '용 꿈은 크게 성공하고 출세할 징조입니다.',
    detail: '용은 동양에서 가장 상서로운 동물입니다. 용을 보거나 타는 꿈은 크게 성공하거나 임신 꿈으로도 해석됩니다. 용이 하늘로 올라가면 승진이나 합격을, 물에서 나오면 새로운 시작을 의미합니다.',
    advice: '큰 도전을 해도 좋은 시기입니다. 자신감을 가지세요.',
    luckyNumber: 9,
  },

  // 자연
  '물': {
    type: 'neutral',
    title: '감정과 재물의 흐름',
    meaning: '물 꿈은 감정 상태와 재물 흐름을 나타냅니다.',
    detail: '맑은 물은 좋은 일이, 탁한 물은 시련이 있을 수 있음을 의미합니다. 물이 넘치면 재물이 들어오고, 물에 빠지면 어려움이 있을 수 있지만 헤엄쳐 나오면 극복합니다.',
    advice: '감정 정리가 필요한 시기입니다. 마음의 평화를 찾으세요.',
    luckyNumber: 6,
  },
  '불': {
    type: 'neutral',
    title: '열정과 변화의 상징',
    meaning: '불 꿈은 상황에 따라 길흉이 갈립니다.',
    detail: '밝게 타오르는 불은 열정과 성공을, 집에 불이 나면 큰 변화를 의미합니다. 불이 번지면 명성이 퍼지고, 불을 끄면 계획이 무산될 수 있습니다. 화상을 입으면 누군가에게 도움받을 일이 생깁니다.',
    advice: '변화를 두려워하지 마세요. 새로운 시작이 될 수 있습니다.',
    luckyNumber: 2,
  },
  '산': {
    type: 'good',
    title: '목표와 도전의 상징',
    meaning: '산 꿈은 목표 달성과 관련됩니다.',
    detail: '산에 오르면 목표를 향해 나아가고 있음을, 정상에 도달하면 성공을 의미합니다. 높은 산을 바라보는 것은 큰 포부를, 산에서 내려오면 한 단계 완료를 뜻합니다.',
    advice: '지금 하시는 일을 꾸준히 하세요. 성과가 있을 것입니다.',
    luckyNumber: 1,
  },
  '바다': {
    type: 'neutral',
    title: '무한한 가능성의 상징',
    meaning: '바다 꿈은 넓은 세계와 가능성을 나타냅니다.',
    detail: '잔잔한 바다는 평온한 미래를, 파도치는 바다는 도전과 역경을 의미합니다. 바다를 건너가면 새로운 기회가, 바다에 빠지면 일시적 어려움이 있을 수 있습니다.',
    advice: '새로운 도전을 해보세요. 넓은 세상이 기다립니다.',
    luckyNumber: 7,
  },
  '꽃': {
    type: 'good',
    title: '사랑과 기쁨의 상징',
    meaning: '꽃 꿈은 행복한 일이 생길 징조입니다.',
    detail: '꽃이 피는 꿈은 기쁜 소식이나 경사가 생길 것을 의미합니다. 꽃을 받으면 사랑을, 꽃이 지면 한 단계가 끝나고 새로운 시작이 옴을 뜻합니다.',
    advice: '좋은 일이 생길 징조입니다. 기대하셔도 좋습니다.',
    luckyNumber: 3,
  },

  // 행동/상황
  '떨어지다': {
    type: 'bad',
    title: '불안과 두려움의 표현',
    meaning: '떨어지는 꿈은 현실의 불안감을 반영합니다.',
    detail: '높은 곳에서 떨어지는 꿈은 현재 느끼는 스트레스나 불안을 나타냅니다. 하지만 떨어져도 다치지 않으면 어려움을 극복할 수 있다는 의미입니다.',
    advice: '스트레스 관리가 필요합니다. 휴식을 취하세요.',
  },
  '쫓기다': {
    type: 'bad',
    title: '회피하고 싶은 문제의 상징',
    meaning: '쫓기는 꿈은 피하고 싶은 것이 있음을 나타냅니다.',
    detail: '무언가에 쫓기는 꿈은 현실에서 직면하기 싫은 문제가 있음을 의미합니다. 쫓기다가 잡히면 문제에 직면해야 하고, 도망치면 당분간 미룰 수 있지만 해결은 필요합니다.',
    advice: '미루던 일을 해결하세요. 마주하면 생각보다 쉬울 수 있습니다.',
  },
  '쫓기는': {
    type: 'bad',
    title: '회피하고 싶은 문제의 상징',
    meaning: '쫓기는 꿈은 피하고 싶은 것이 있음을 나타냅니다.',
    detail: '무언가에 쫓기는 꿈은 현실에서 직면하기 싫은 문제가 있음을 의미합니다. 쫓기다가 잡히면 문제에 직면해야 하고, 도망치면 당분간 미룰 수 있지만 해결은 필요합니다.',
    advice: '미루던 일을 해결하세요. 마주하면 생각보다 쉬울 수 있습니다.',
  },
  '날다': {
    type: 'good',
    title: '자유와 해방의 상징',
    meaning: '나는 꿈은 제약에서 벗어나고 싶은 마음입니다.',
    detail: '하늘을 자유롭게 나는 꿈은 현재의 제약에서 벗어나 자유로워지고 싶은 욕구를 나타냅니다. 높이 날수록 큰 성취를, 떨어질 것 같은 불안은 자신감 부족을 의미합니다.',
    advice: '새로운 것에 도전하세요. 날개를 펼 때입니다.',
    luckyNumber: 9,
  },
  '날아다니는': {
    type: 'good',
    title: '자유와 해방의 상징',
    meaning: '나는 꿈은 제약에서 벗어나고 싶은 마음입니다.',
    detail: '하늘을 자유롭게 나는 꿈은 현재의 제약에서 벗어나 자유로워지고 싶은 욕구를 나타냅니다. 높이 날수록 큰 성취를, 떨어질 것 같은 불안은 자신감 부족을 의미합니다.',
    advice: '새로운 것에 도전하세요. 날개를 펼 때입니다.',
    luckyNumber: 9,
  },

  // 사물
  '돈': {
    type: 'neutral',
    title: '가치와 자존감의 상징',
    meaning: '돈 꿈은 역설적 의미를 가집니다.',
    detail: '돈을 잃는 꿈은 오히려 돈이 들어올 수 있고, 돈을 많이 갖는 꿈은 지출이 생길 수 있습니다. 돈을 줍는 꿈은 횡재수가, 돈을 세는 꿈은 재정 점검이 필요함을 의미합니다.',
    advice: '재정 상태를 점검해보세요. 불필요한 지출을 줄이세요.',
    luckyNumber: 8,
  },
  '금': {
    type: 'good',
    title: '귀한 것을 얻는 상징',
    meaning: '금 꿈은 귀한 것을 얻거나 인정받음을 의미합니다.',
    detail: '금을 얻거나 발견하는 꿈은 값진 기회나 인정을 받을 징조입니다. 금이 빛나면 명예가 높아지고, 금을 잃으면 소중한 것을 놓칠 수 있으니 주의하세요.',
    advice: '기회가 오면 놓치지 마세요. 귀한 인연을 소중히 하세요.',
    luckyNumber: 1,
  },

  // 신체
  '이빨': {
    type: 'bad',
    title: '건강과 가족 관련 징조',
    meaning: '이빨 빠지는 꿈은 주의가 필요합니다.',
    detail: '이빨이 빠지는 꿈은 전통적으로 가족 중 누군가의 건강이 안 좋거나 이별을 암시합니다. 앞니는 가까운 가족, 어금니는 먼 친척과 관련됩니다. 다만, 현대적으로는 스트레스의 표현으로도 봅니다.',
    advice: '가족의 건강을 살피시고, 본인 건강도 챙기세요.',
  },
  '이빨 빠지는': {
    type: 'bad',
    title: '건강과 가족 관련 징조',
    meaning: '이빨 빠지는 꿈은 주의가 필요합니다.',
    detail: '이빨이 빠지는 꿈은 전통적으로 가족 중 누군가의 건강이 안 좋거나 이별을 암시합니다. 앞니는 가까운 가족, 어금니는 먼 친척과 관련됩니다. 다만, 현대적으로는 스트레스의 표현으로도 봅니다.',
    advice: '가족의 건강을 살피시고, 본인 건강도 챙기세요.',
  },
  '임신': {
    type: 'good',
    title: '새로운 시작의 상징',
    meaning: '임신 꿈은 새로운 것이 시작됨을 의미합니다.',
    detail: '임신한 꿈은 반드시 실제 임신을 뜻하지 않습니다. 새로운 프로젝트, 계획, 아이디어가 싹트고 있음을 의미합니다. 무언가 새로운 것이 탄생할 징조입니다.',
    advice: '새로운 시작을 준비하세요. 좋은 결과가 있을 것입니다.',
    luckyNumber: 6,
  },
  '머리카락': {
    type: 'neutral',
    title: '생명력과 걱정의 상징',
    meaning: '머리카락 꿈은 여러 의미를 가집니다.',
    detail: '머리카락이 빠지면 걱정거리가 생길 수 있고, 머리카락이 자라거나 풍성해지면 생명력과 운이 좋아짐을 뜻합니다. 머리를 자르면 과거와의 결별이나 새 출발을 의미합니다.',
    advice: '변화를 받아들이세요. 때로는 덜어내는 것도 필요합니다.',
  },
  '피': {
    type: 'neutral',
    title: '생명력과 관계의 상징',
    meaning: '피 꿈은 생명력과 가족을 나타냅니다.',
    detail: '피가 나는 꿈이 무조건 나쁜 것은 아닙니다. 붉은 피는 생명력과 재물을, 지혈되면 문제 해결을 의미합니다. 다만 많은 출혈은 기력 소모에 주의하라는 뜻입니다.',
    advice: '체력 관리에 신경 쓰시고, 가족과 연락하세요.',
  },

  // 사람
  '죽은 사람': {
    type: 'neutral',
    title: '그리움과 메시지의 상징',
    meaning: '돌아가신 분의 꿈은 메시지를 담고 있습니다.',
    detail: '돌아가신 분이 나오는 꿈은 그분에 대한 그리움이거나, 중요한 메시지를 전하는 것일 수 있습니다. 웃으시면 잘 계신다는 뜻이고, 무언가를 주시면 복을 받을 징조입니다.',
    advice: '조상님께 감사하는 마음을 가지세요. 성묘를 다녀오시는 것도 좋습니다.',
    luckyNumber: 4,
  },
  '아기': {
    type: 'good',
    title: '새로운 시작과 순수함의 상징',
    meaning: '아기 꿈은 새로운 시작을 의미합니다.',
    detail: '아기를 보거나 안는 꿈은 새로운 일이 시작되거나 기쁜 소식이 있을 징조입니다. 아기가 예쁘고 건강하면 좋은 결과를, 아기가 우면 작은 시련이 있을 수 있습니다.',
    advice: '새로운 도전을 두려워하지 마세요. 좋은 시작이 될 것입니다.',
    luckyNumber: 3,
  },
  '결혼': {
    type: 'good',
    title: '결합과 새로운 단계의 상징',
    meaning: '결혼 꿈은 새로운 파트너십을 의미합니다.',
    detail: '결혼하는 꿈은 실제 결혼뿐 아니라 사업 파트너, 새로운 관계, 중요한 결정을 의미합니다. 행복한 결혼식이면 좋은 협력관계를, 문제가 생기면 신중한 결정이 필요함을 뜻합니다.',
    advice: '중요한 결정을 앞두고 계시다면 신중하되 긍정적으로 임하세요.',
    luckyNumber: 2,
  },
  '시험': {
    type: 'neutral',
    title: '평가와 불안의 상징',
    meaning: '시험 꿈은 평가받는 것에 대한 불안입니다.',
    detail: '시험을 보는 꿈은 현실에서 평가받거나 검증받는 상황에 대한 불안을 나타냅니다. 시험에 합격하면 자신감 상승을, 떨어지면 준비가 더 필요함을 의미합니다.',
    advice: '준비를 철저히 하세요. 자신감을 가지면 좋은 결과가 있을 것입니다.',
  },
};

// 해석이 없는 키워드에 대한 기본 해석
const getDefaultInterpretation = (keyword: string) => ({
  type: 'neutral' as const,
  title: `${keyword}의 의미`,
  meaning: `${keyword}이(가) 나오는 꿈은 여러 가지로 해석될 수 있습니다.`,
  detail: `${keyword}이(가) 꿈에 나타났다면, 이는 현재 당신의 마음 상태나 가까운 미래의 변화를 암시할 수 있습니다. 꿈에서의 감정이나 상황을 함께 고려해서 해석해 보세요. 긍정적인 느낌이었다면 좋은 징조로, 부정적인 느낌이었다면 주의가 필요할 수 있습니다.`,
  advice: '꿈에서 느꼈던 감정을 돌아보시고, 현재 생활에서 어떤 부분이 신경 쓰이는지 생각해 보세요.',
});

// 종합 해석 생성
const getOverallInterpretation = (interpretations: typeof dreamInterpretations[string][]) => {
  const goodCount = interpretations.filter(i => i.type === 'good').length;
  const badCount = interpretations.filter(i => i.type === 'bad').length;

  if (goodCount > badCount && goodCount >= 2) {
    return {
      type: 'good',
      title: '길몽(吉夢)',
      description: '전반적으로 좋은 기운이 가득한 꿈입니다. 가까운 미래에 기쁜 일이 있거나, 하시는 일이 잘 풀릴 징조입니다. 이 꿈의 좋은 기운을 믿고 자신감 있게 나아가세요.',
      color: 'from-yellow-400 to-amber-500',
    };
  } else if (badCount > goodCount && badCount >= 2) {
    return {
      type: 'bad',
      title: '주의가 필요한 꿈',
      description: '조심해야 할 요소가 있는 꿈입니다. 하지만 꿈은 경고의 메시지이기도 합니다. 미리 알고 대비하면 화를 면할 수 있습니다. 건강과 안전에 유의하시고, 중요한 결정은 신중히 하세요.',
      color: 'from-slate-400 to-slate-500',
    };
  } else {
    return {
      type: 'neutral',
      title: '평몽(平夢)',
      description: '길흉이 섞여 있거나 중립적인 의미의 꿈입니다. 현재 상황을 돌아보고, 꿈이 주는 메시지에 귀 기울여 보세요. 좋은 방향으로 해석하고 긍정적인 마음가짐을 유지하면 좋은 결과로 이어질 수 있습니다.',
      color: 'from-violet-400 to-purple-500',
    };
  }
};

export default function DreamResult({ formData, onReset, onBack }: DreamResultProps) {
  // 각 키워드에 대한 해석 가져오기
  const interpretations = formData.keywords.map(keyword => {
    return dreamInterpretations[keyword] || getDefaultInterpretation(keyword);
  });

  const overallInterpretation = getOverallInterpretation(interpretations);

  // 행운의 숫자 계산
  const luckyNumbers = interpretations
    .filter(i => i.luckyNumber)
    .map(i => i.luckyNumber!);
  const mainLuckyNumber = luckyNumbers.length > 0
    ? luckyNumbers[Math.floor(Math.random() * luckyNumbers.length)]
    : Math.floor(Math.random() * 9) + 1;

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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'good': return <TrendingUp className="w-5 h-5 text-yellow-400" />;
      case 'bad': return <AlertCircle className="w-5 h-5 text-red-400" />;
      default: return <Star className="w-5 h-5 text-violet-400" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'good': return <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-300 text-xs rounded-full">길몽</span>;
      case 'bad': return <span className="px-2 py-0.5 bg-red-500/20 text-red-300 text-xs rounded-full">흉몽</span>;
      default: return <span className="px-2 py-0.5 bg-violet-500/20 text-violet-300 text-xs rounded-full">평몽</span>;
    }
  };

  return (
    <motion.div
      className="min-h-screen py-8 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-3xl mx-auto">
        {/* 뒤로가기 */}
        <motion.button
          variants={itemVariants}
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>메뉴로</span>
        </motion.button>

        {/* 헤더 */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center shadow-lg mb-4">
            <Cloud className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            꿈 해몽 결과
          </h1>
          <p className="text-violet-400">
            {formData.keywords.join(', ')}
          </p>
        </motion.div>

        {/* 종합 해석 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-6 mb-6 overflow-hidden relative">
          <div className={`absolute inset-0 bg-gradient-to-br ${overallInterpretation.color} opacity-10`} />
          <div className="relative z-10">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              종합 해몽
            </h2>

            <div className="text-center mb-4">
              <span className={`text-3xl font-bold bg-gradient-to-r ${overallInterpretation.color} bg-clip-text text-transparent`}>
                {overallInterpretation.title}
              </span>
            </div>

            <p className="text-slate-300 leading-relaxed text-center" style={{ fontFamily: "'Noto Serif KR', serif" }}>
              {overallInterpretation.description}
            </p>

            {/* 행운의 숫자 */}
            <div className="mt-6 text-center">
              <p className="text-slate-400 text-sm mb-2">오늘의 행운의 숫자</p>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-violet-500/30 text-violet-300 text-2xl font-bold">
                {mainLuckyNumber}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 키워드별 상세 해석 */}
        <motion.div variants={itemVariants} className="mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-violet-400" />
            상세 해몽
          </h2>

          <div className="space-y-4">
            {formData.keywords.map((keyword, index) => {
              const interpretation = interpretations[index];
              return (
                <motion.div
                  key={keyword}
                  variants={itemVariants}
                  className="glass rounded-2xl p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(interpretation.type)}
                      <h3 className="text-white font-bold">{keyword}</h3>
                    </div>
                    {getTypeBadge(interpretation.type)}
                  </div>

                  <h4 className="text-violet-400 font-medium mb-2">{interpretation.title}</h4>

                  <p className="text-slate-400 text-sm mb-3">{interpretation.meaning}</p>

                  <div className="bg-slate-800/50 rounded-xl p-4 mb-3">
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {interpretation.detail}
                    </p>
                  </div>

                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-emerald-400 font-medium shrink-0">💡 조언:</span>
                    <span className="text-slate-400">{interpretation.advice}</span>
                  </div>

                  {interpretation.luckyNumber && (
                    <div className="mt-3 text-xs text-slate-500">
                      행운의 숫자: {interpretation.luckyNumber}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* 주의사항 */}
        <motion.div variants={itemVariants} className="glass rounded-2xl p-4 mb-6">
          <p className="text-slate-400 text-xs text-center">
            ※ 꿈해몽은 전통 민간 해몽서를 참고한 것으로, 재미로 봐주세요.
            꿈은 무의식의 표현일 뿐, 반드시 현실에서 일어나는 것은 아닙니다.
          </p>
        </motion.div>

        {/* 버튼 */}
        <motion.div variants={itemVariants} className="flex gap-4">
          <button
            onClick={onBack}
            className="flex-1 py-4 bg-slate-700/50 rounded-2xl text-slate-300 font-medium hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            메뉴로
          </button>
          <button
            onClick={onReset}
            className="flex-1 py-4 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl text-white font-bold hover:from-violet-600 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            다른 꿈 풀이
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
