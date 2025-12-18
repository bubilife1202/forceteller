'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { BookOpen, ArrowLeft, RefreshCw, Calendar, Star, Sun } from 'lucide-react';

interface TojeongResult2026Props {
  result: SajuResult;
  name: string;
  gender: 'male' | 'female';
  birthDate: { year: number; month: number; day: number };
  onReset: () => void;
  onBack: () => void;
}

// 토정비결 괘 계산
const calculateTojeongGwae = (year: number, month: number, day: number) => {
  // 상괘 (태세수) - 년도 기반
  const yearCycle = (year - 4) % 60; // 60갑자 순환
  const sangGwae = (yearCycle % 8) + 1;

  // 중괘 (월건수) - 월 기반
  const jungGwae = ((month + yearCycle) % 6) + 1;

  // 하괘 (일진수) - 일 기반
  const haGwae = ((day + month + yearCycle) % 8) + 1;

  return { sangGwae, jungGwae, haGwae };
};

// 괘별 기본 운세 해석
const gwaeInterpretations: Record<number, { name: string; meaning: string }> = {
  1: { name: '건(乾)', meaning: '하늘의 기운이 충만하니 크게 이룰 운' },
  2: { name: '태(兌)', meaning: '기쁨이 가득하니 화합의 운' },
  3: { name: '리(離)', meaning: '밝음이 비추니 명예가 오르는 운' },
  4: { name: '진(震)', meaning: '우레와 같이 크게 움직일 운' },
  5: { name: '손(巽)', meaning: '바람처럼 유연하게 나아갈 운' },
  6: { name: '감(坎)', meaning: '물처럼 지혜롭게 헤쳐나갈 운' },
  7: { name: '간(艮)', meaning: '산처럼 굳건히 지킬 운' },
  8: { name: '곤(坤)', meaning: '땅처럼 넓게 받아들일 운' },
};

// 월별 토정비결 시(詩) - 괘 조합에 따른 변형
const getMonthlyVerse = (month: number, totalGwae: number) => {
  const verses: Record<number, { title: string; verse: string; interpretation: string; luck: number }[]> = {
    1: [
      { title: '새해 첫 달의 운', verse: '동풍이 불어 얼음을 녹이니\n새싹이 돋아날 조짐이로다', interpretation: '새로운 시작의 기운이 감돌고, 준비한 일이 서서히 결실을 맺기 시작합니다.', luck: 70 },
      { title: '정월의 운세', verse: '봄빛이 문 앞에 이르렀으니\n만물이 소생할 때로다', interpretation: '좋은 기회가 찾아오니 적극적으로 움직이십시오.', luck: 80 },
      { title: '첫달의 비결', verse: '매화가 눈 속에서 피어나니\n고난 속 희망을 보리라', interpretation: '어려움 속에서도 좋은 소식이 있을 것입니다.', luck: 65 },
    ],
    2: [
      { title: '이월의 운', verse: '꽃망울이 터지려 하니\n기다림이 곧 보람되리라', interpretation: '참고 기다린 일에 진전이 생깁니다. 서두르지 마십시오.', luck: 75 },
      { title: '경칩의 운세', verse: '개구리가 잠에서 깨어나듯\n숨은 기회가 나타나리라', interpretation: '뜻밖의 기회가 찾아올 수 있으니 준비하십시오.', luck: 72 },
      { title: '봄기운의 비결', verse: '버들가지에 새순이 돋으니\n희망찬 소식이 오리라', interpretation: '좋은 소식과 만남이 기다리고 있습니다.', luck: 78 },
    ],
    3: [
      { title: '삼월의 운', verse: '꽃이 만발하여 향기 가득하니\n귀인이 찾아올 때로다', interpretation: '귀인의 도움으로 일이 순조롭게 풀립니다.', luck: 85 },
      { title: '춘삼월 운세', verse: '제비가 돌아와 집을 짓듯\n기반이 다져지는 때로다', interpretation: '안정적인 기반을 다질 좋은 시기입니다.', luck: 80 },
      { title: '화창한 봄의 비결', verse: '봄비가 대지를 적시니\n만물이 자라날 때로다', interpretation: '노력한 만큼 성장과 발전이 있습니다.', luck: 82 },
    ],
    4: [
      { title: '사월의 운', verse: '백화가 다투어 피었으니\n선택의 기로에 서리라', interpretation: '여러 기회 중 현명한 선택이 필요한 때입니다.', luck: 73 },
      { title: '늦봄의 운세', verse: '꽃잎이 바람에 흩날리니\n변화에 대비하라', interpretation: '변화의 조짐이 있으니 유연하게 대처하십시오.', luck: 68 },
      { title: '곡우의 비결', verse: '농부가 씨를 뿌리듯\n정성을 다하면 결실을 보리라', interpretation: '지금 뿌린 씨앗이 나중에 큰 결실로 돌아옵니다.', luck: 76 },
    ],
    5: [
      { title: '오월의 운', verse: '녹음이 짙어지니\n하는 일마다 무르익으리라', interpretation: '일이 궤도에 오르고 순조롭게 진행됩니다.', luck: 83 },
      { title: '초여름 운세', verse: '보리가 익어가듯\n노력의 결실이 보이리라', interpretation: '그동안의 노력이 결실을 맺기 시작합니다.', luck: 85 },
      { title: '단오의 비결', verse: '해가 중천에 떠오르니\n기운이 왕성할 때로다', interpretation: '체력과 의욕이 충만하니 적극적으로 임하십시오.', luck: 80 },
    ],
    6: [
      { title: '유월의 운', verse: '여름비가 대지를 적시니\n시련 후에 복이 오리라', interpretation: '잠시 어려움이 있으나 곧 좋아집니다.', luck: 65 },
      { title: '한여름 운세', verse: '뙤약볕 아래 그늘을 찾듯\n휴식이 필요한 때로다', interpretation: '무리하지 말고 재충전의 시간을 가지십시오.', luck: 60 },
      { title: '하지의 비결', verse: '모내기가 끝나면 기다림뿐\n인내하면 복이 오리라', interpretation: '조급해하지 말고 때를 기다리십시오.', luck: 62 },
    ],
    7: [
      { title: '칠월의 운', verse: '은하수에 별이 빛나니\n소원이 이루어질 조짐', interpretation: '바라던 일이 이루어질 가능성이 높습니다.', luck: 78 },
      { title: '칠석의 운세', verse: '견우와 직녀가 만나듯\n좋은 인연이 찾아오리라', interpretation: '좋은 만남이나 협력의 기회가 옵니다.', luck: 80 },
      { title: '백중의 비결', verse: '과일이 영글어가니\n준비한 것이 빛을 보리라', interpretation: '그동안 준비한 일이 성과로 나타납니다.', luck: 77 },
    ],
    8: [
      { title: '팔월의 운', verse: '가을바람이 불기 시작하니\n새로운 전환의 때로다', interpretation: '변화와 전환의 시기, 새로운 계획을 세우십시오.', luck: 72 },
      { title: '처서의 운세', verse: '더위가 물러가듯\n근심도 사라지리라', interpretation: '걱정하던 일이 해결될 조짐입니다.', luck: 75 },
      { title: '한가위 비결', verse: '보름달이 환하게 비추니\n가정에 화목함이 가득', interpretation: '가정과 주변 관계가 화목해지는 때입니다.', luck: 82 },
    ],
    9: [
      { title: '구월의 운', verse: '국화가 피어 향기 그윽하니\n지혜로운 결단의 때로다', interpretation: '중요한 결정을 내리기 좋은 시기입니다.', luck: 79 },
      { title: '중양절 운세', verse: '단풍이 물들어가듯\n성숙해지는 때로다', interpretation: '내면적으로 성장하고 성숙해지는 시기입니다.', luck: 76 },
      { title: '가을의 비결', verse: '곡식을 거두어들이니\n풍요로움을 누리리라', interpretation: '그동안의 노력에 대한 보상이 있습니다.', luck: 84 },
    ],
    10: [
      { title: '시월의 운', verse: '서리가 내리기 전에\n거둘 것을 거두어라', interpretation: '마무리가 필요한 일을 서둘러 처리하십시오.', luck: 70 },
      { title: '상강의 운세', verse: '낙엽이 지니 새봄을 준비하듯\n미래를 도모하라', interpretation: '다가올 일을 위한 준비를 시작하십시오.', luck: 68 },
      { title: '늦가을 비결', verse: '기러기가 남으로 날아가듯\n순리를 따르면 길하리라', interpretation: '흐름에 순응하며 자연스럽게 나아가십시오.', luck: 71 },
    ],
    11: [
      { title: '동짓달의 운', verse: '밤이 가장 길 때이나\n새벽이 머지않았도다', interpretation: '어려움이 있으나 곧 희망의 빛이 보입니다.', luck: 63 },
      { title: '소설의 운세', verse: '눈이 내려 세상을 덮으니\n정결한 마음을 가져라', interpretation: '마음을 정리하고 새로운 각오를 다지십시오.', luck: 65 },
      { title: '입동의 비결', verse: '곰이 겨울잠에 들 듯\n내실을 다지는 때로다', interpretation: '외부 활동보다 내부를 다지는 데 집중하십시오.', luck: 60 },
    ],
    12: [
      { title: '섣달의 운', verse: '묵은해가 저물어가니\n새해의 희망을 품어라', interpretation: '한 해를 마무리하며 새로운 희망을 품으십시오.', luck: 72 },
      { title: '대설의 운세', verse: '흰 눈이 온 세상을 덮으니\n새로운 시작을 준비하라', interpretation: '과거를 정리하고 새출발을 준비하십시오.', luck: 70 },
      { title: '연말의 비결', verse: '북풍이 거세게 불어도\n봄은 반드시 오리라', interpretation: '어려움을 견디면 좋은 날이 반드시 옵니다.', luck: 68 },
    ],
  };

  const monthVerses = verses[month] || verses[1];
  const index = totalGwae % monthVerses.length;
  return monthVerses[index];
};

// 연간 종합운
const getYearlyFortune = (sangGwae: number, jungGwae: number, haGwae: number) => {
  const totalScore = sangGwae + jungGwae + haGwae;

  if (totalScore >= 18) {
    return {
      title: '대길(大吉)',
      description: '하늘이 내린 복록이 가득한 해입니다. 하는 일마다 순풍에 돛 단 듯 순조롭고, 귀인의 도움이 끊이지 않습니다. 다만 겸손함을 잃지 마시고, 주변과 복을 나누면 더욱 크게 번창하리라.',
      color: 'from-yellow-400 to-amber-500',
    };
  } else if (totalScore >= 14) {
    return {
      title: '중길(中吉)',
      description: '전체적으로 좋은 운세입니다. 노력한 만큼의 결실을 얻을 수 있으며, 새로운 기회도 찾아옵니다. 급하게 서두르지 말고 차분히 진행하면 좋은 결과를 얻습니다.',
      color: 'from-emerald-400 to-teal-500',
    };
  } else if (totalScore >= 10) {
    return {
      title: '소길(小吉)',
      description: '평온한 한 해입니다. 큰 변화보다는 현재를 유지하며 내실을 다지기 좋습니다. 작은 것에 감사하고 꾸준히 노력하면 복이 쌓입니다.',
      color: 'from-blue-400 to-cyan-500',
    };
  } else {
    return {
      title: '보통(普通)',
      description: '기복이 있는 한 해입니다. 순탄하지만은 않으나 인내와 지혜로 헤쳐나갈 수 있습니다. 큰 모험은 피하고 안정을 추구하며, 건강에 특히 신경 쓰십시오.',
      color: 'from-slate-400 to-slate-500',
    };
  }
};

export default function TojeongResult2026({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  result,
  name,
  birthDate,
  onReset,
  onBack,
}: TojeongResult2026Props) {
  const { sangGwae, jungGwae, haGwae } = calculateTojeongGwae(birthDate.year, birthDate.month, birthDate.day);
  const totalGwae = sangGwae + jungGwae + haGwae;
  const yearlyFortune = getYearlyFortune(sangGwae, jungGwae, haGwae);

  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

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

  const getLuckColor = (luck: number) => {
    if (luck >= 80) return 'text-yellow-400';
    if (luck >= 70) return 'text-emerald-400';
    if (luck >= 60) return 'text-blue-400';
    return 'text-slate-400';
  };

  const getLuckBg = (luck: number) => {
    if (luck >= 80) return 'bg-yellow-500/20';
    if (luck >= 70) return 'bg-emerald-500/20';
    if (luck >= 60) return 'bg-blue-500/20';
    return 'bg-slate-500/20';
  };

  return (
    <motion.div
      className="min-h-screen py-8 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-4xl mx-auto">
        {/* 뒤로가기 */}
        <motion.button
          variants={itemVariants}
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>메뉴로 돌아가기</span>
        </motion.button>

        {/* 헤더 */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg mb-4">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            2026 토정비결
          </h1>
          <p className="text-emerald-400">병오년(丙午年) {name}님의 한 해 운세</p>
        </motion.div>

        {/* 괘 정보 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-emerald-400" />
            나의 토정비결 괘(卦)
          </h2>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-slate-800/50 rounded-xl">
              <div className="text-emerald-400 text-sm mb-1">상괘 (태세)</div>
              <div className="text-2xl font-bold text-white">{gwaeInterpretations[sangGwae]?.name}</div>
              <div className="text-xs text-slate-400 mt-1">{sangGwae}수</div>
            </div>
            <div className="text-center p-4 bg-slate-800/50 rounded-xl">
              <div className="text-emerald-400 text-sm mb-1">중괘 (월건)</div>
              <div className="text-2xl font-bold text-white">{gwaeInterpretations[jungGwae]?.name}</div>
              <div className="text-xs text-slate-400 mt-1">{jungGwae}수</div>
            </div>
            <div className="text-center p-4 bg-slate-800/50 rounded-xl">
              <div className="text-emerald-400 text-sm mb-1">하괘 (일진)</div>
              <div className="text-2xl font-bold text-white">{gwaeInterpretations[haGwae]?.name}</div>
              <div className="text-xs text-slate-400 mt-1">{haGwae}수</div>
            </div>
          </div>

          <div className="text-center text-slate-300 text-sm">
            <p>{gwaeInterpretations[sangGwae]?.meaning}</p>
          </div>
        </motion.div>

        {/* 연간 종합운 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-6 mb-6 overflow-hidden relative">
          <div className={`absolute inset-0 bg-gradient-to-br ${yearlyFortune.color} opacity-10`} />
          <div className="relative z-10">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Sun className="w-5 h-5 text-yellow-400" />
              2026년 종합운세
            </h2>

            <div className="text-center mb-4">
              <span className={`text-3xl font-bold bg-gradient-to-r ${yearlyFortune.color} bg-clip-text text-transparent`}>
                {yearlyFortune.title}
              </span>
            </div>

            <p className="text-slate-300 leading-relaxed text-center" style={{ fontFamily: "'Noto Serif KR', serif" }}>
              {yearlyFortune.description}
            </p>
          </div>
        </motion.div>

        {/* 월별 운세 */}
        <motion.div variants={itemVariants} className="mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-400" />
            월별 토정비결
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {months.map((month) => {
              const verse = getMonthlyVerse(month, totalGwae + month);
              return (
                <motion.div
                  key={month}
                  variants={itemVariants}
                  className="glass rounded-2xl p-5"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-emerald-400 font-bold">{month}월</span>
                      <h3 className="text-white font-medium">{verse.title}</h3>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-bold ${getLuckBg(verse.luck)} ${getLuckColor(verse.luck)}`}>
                      {verse.luck}점
                    </div>
                  </div>

                  <div className="bg-slate-800/50 rounded-xl p-3 mb-3">
                    <p className="text-slate-300 text-sm whitespace-pre-line leading-relaxed" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                      {verse.verse}
                    </p>
                  </div>

                  <p className="text-slate-400 text-sm">
                    {verse.interpretation}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* 주의사항 */}
        <motion.div variants={itemVariants} className="glass rounded-2xl p-4 mb-6">
          <p className="text-slate-400 text-xs text-center">
            ※ 토정비결은 조선시대 토정 이지함 선생의 점술서를 현대적으로 재해석한 것입니다.
            재미로 참고하시고, 인생의 중요한 결정은 신중하게 내리시기 바랍니다.
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
            className="flex-1 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl text-white font-bold hover:from-emerald-600 hover:to-teal-600 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            다시 보기
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
