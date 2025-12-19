'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import {
  BookOpen, Scroll, Star, Moon, Sun, Cloud,
  Sparkles, Heart, Wallet, Briefcase, Home,
  Users, Activity, Shield, Compass, Target,
  AlertTriangle, CheckCircle, Calendar, Flame
} from 'lucide-react';

interface TojeongPremiumSectionProps {
  result: SajuResult;
  name: string;
  birthDate: { year: number; month: number; day: number };
}

// 괘 데이터
const GWAE_DATA: Record<number, {
  name: string;
  hanja: string;
  symbol: string;
  element: string;
  nature: string;
  fortune: string;
  advice: string;
  luckyColor: string;
  luckyNumber: string;
  luckyDirection: string;
}> = {
  1: {
    name: '건', hanja: '乾', symbol: '☰', element: '금', nature: '하늘',
    fortune: '하늘의 기운이 충만하여 큰 일을 이룰 수 있습니다. 리더십을 발휘하고 주도적으로 나아가십시오.',
    advice: '자만하지 말고 겸손함을 유지하세요. 과욕은 화를 부릅니다.',
    luckyColor: '흰색, 금색', luckyNumber: '1, 6', luckyDirection: '서북'
  },
  2: {
    name: '태', hanja: '兌', symbol: '☱', element: '금', nature: '연못',
    fortune: '기쁨과 화합의 기운이 가득합니다. 인간관계가 좋아지고 즐거운 일이 생깁니다.',
    advice: '말조심이 필요합니다. 기쁜 일에 취해 경솔해지지 마세요.',
    luckyColor: '흰색, 분홍', luckyNumber: '2, 7', luckyDirection: '서'
  },
  3: {
    name: '리', hanja: '離', symbol: '☲', element: '화', nature: '불',
    fortune: '밝음과 명예의 기운입니다. 재능이 빛나고 인정받게 됩니다.',
    advice: '불처럼 타오르되 꺼지지 않도록 에너지 관리가 필요합니다.',
    luckyColor: '빨간색, 자주', luckyNumber: '3, 8', luckyDirection: '남'
  },
  4: {
    name: '진', hanja: '震', symbol: '☳', element: '목', nature: '우레',
    fortune: '움직임과 시작의 기운입니다. 새로운 일을 시작하기 좋은 때입니다.',
    advice: '성급하게 움직이지 말고 때를 보아 결단하세요.',
    luckyColor: '청색, 녹색', luckyNumber: '4, 9', luckyDirection: '동'
  },
  5: {
    name: '손', hanja: '巽', symbol: '☴', element: '목', nature: '바람',
    fortune: '유연함과 순응의 기운입니다. 상황에 맞게 유연하게 대처하면 길합니다.',
    advice: '고집을 버리고 순리에 따르세요. 유연함이 강함입니다.',
    luckyColor: '녹색, 청록', luckyNumber: '5, 10', luckyDirection: '동남'
  },
  6: {
    name: '감', hanja: '坎', symbol: '☵', element: '수', nature: '물',
    fortune: '지혜와 극복의 기운입니다. 어려움이 있으나 지혜롭게 헤쳐나갑니다.',
    advice: '물처럼 낮은 곳으로 흐르되 멈추지 마세요. 꾸준함이 중요합니다.',
    luckyColor: '검정, 남색', luckyNumber: '1, 6', luckyDirection: '북'
  },
  7: {
    name: '간', hanja: '艮', symbol: '☶', element: '토', nature: '산',
    fortune: '멈춤과 굳건함의 기운입니다. 지키고 보존하는 데 유리합니다.',
    advice: '무리하게 나아가지 말고 현재를 굳건히 지키세요.',
    luckyColor: '노랑, 갈색', luckyNumber: '5, 10', luckyDirection: '동북'
  },
  8: {
    name: '곤', hanja: '坤', symbol: '☷', element: '토', nature: '땅',
    fortune: '포용과 안정의 기운입니다. 받아들이고 키우는 데 유리합니다.',
    advice: '땅처럼 넓게 포용하되 자신의 중심을 잃지 마세요.',
    luckyColor: '노랑, 베이지', luckyNumber: '2, 8', luckyDirection: '서남'
  }
};

// 괘 조합별 연간 대운
const getYearlyFortune = (sangGwae: number, jungGwae: number, haGwae: number, name: string) => {
  const total = sangGwae + jungGwae + haGwae;
  const fortuneLevel = total % 5;

  const fortunes = [
    {
      grade: '대길(大吉)',
      summary: '하늘이 돕는 대운의 해',
      detail: `${name}님의 2026년은 삼재가 물러가고 대길의 운이 찾아옵니다. 태세(太歲)의 기운이 순조롭고, 월건(月建)과 일진(日辰)이 조화를 이루어 하는 일마다 순탄하게 풀릴 것입니다. 특히 봄과 가을에 좋은 기회가 찾아오니 놓치지 마십시오.`,
      category: {
        wealth: { score: 90, text: '재물운이 왕성합니다. 투자와 사업에 좋은 성과가 있습니다.' },
        love: { score: 85, text: '인연이 좋습니다. 좋은 만남과 화합이 있습니다.' },
        health: { score: 80, text: '건강 기운이 좋습니다. 활력이 넘칩니다.' },
        career: { score: 88, text: '일운이 좋습니다. 승진과 성공의 기회가 있습니다.' }
      }
    },
    {
      grade: '중길(中吉)',
      summary: '꾸준히 나아가면 길한 해',
      detail: `${name}님의 2026년은 중길의 운이 작용합니다. 급하게 서두르지 않고 차분히 준비하면 좋은 결과를 얻습니다. 상반기에는 다소 더딜 수 있으나 하반기에 운이 상승합니다. 인내하며 꾸준히 노력하십시오.`,
      category: {
        wealth: { score: 75, text: '재물운이 안정적입니다. 저축과 절약이 좋습니다.' },
        love: { score: 70, text: '인연이 평탄합니다. 기존 관계를 돈독히 하십시오.' },
        health: { score: 72, text: '건강에 유의하되 크게 걱정할 것은 없습니다.' },
        career: { score: 76, text: '일운이 점진적으로 좋아집니다. 꾸준함이 중요합니다.' }
      }
    },
    {
      grade: '평운(平運)',
      summary: '평온하게 지키는 해',
      detail: `${name}님의 2026년은 큰 변동 없이 평온하게 흘러갑니다. 새로운 것을 시작하기보다 현재를 유지하고 다지는 것이 좋습니다. 무리한 욕심을 부리지 않으면 탈이 없습니다.`,
      category: {
        wealth: { score: 65, text: '현상 유지가 좋습니다. 무리한 투자는 피하세요.' },
        love: { score: 65, text: '평온한 관계가 유지됩니다. 변화를 추구하지 마세요.' },
        health: { score: 68, text: '무난합니다. 과로를 피하고 휴식을 취하세요.' },
        career: { score: 64, text: '현재 위치에서 내실을 다지십시오.' }
      }
    },
    {
      grade: '소길(小吉)',
      summary: '작은 기쁨이 있는 해',
      detail: `${name}님의 2026년은 소길의 운입니다. 큰 일보다 작은 일에서 기쁨을 찾는 해입니다. 일상의 소소한 행복에 감사하며, 과욕을 부리지 않으면 복이 깃듭니다.`,
      category: {
        wealth: { score: 60, text: '소소한 재물운이 있습니다. 큰 것보다 작은 것을 취하세요.' },
        love: { score: 68, text: '소박한 인연이 복입니다. 진심이 통합니다.' },
        health: { score: 70, text: '건강 유지에 집중하세요. 무난합니다.' },
        career: { score: 62, text: '작은 성과들이 모여 큰 힘이 됩니다.' }
      }
    },
    {
      grade: '주의(注意)',
      summary: '신중함이 필요한 해',
      detail: `${name}님의 2026년은 신중함이 필요합니다. 삼재(三災)의 기운이 있어 조심해야 할 일들이 있습니다. 큰 결정은 미루고, 현명하게 대처하면 화를 면할 수 있습니다. 특히 건강과 인간관계에 주의하십시오.`,
      category: {
        wealth: { score: 50, text: '재물에 주의하세요. 보수적으로 운용하십시오.' },
        love: { score: 55, text: '관계에 신중하세요. 다툼을 피하십시오.' },
        health: { score: 52, text: '건강 관리에 특히 신경 쓰세요.' },
        career: { score: 54, text: '신중하게 처신하세요. 무리하지 마십시오.' }
      }
    }
  ];

  return fortunes[fortuneLevel];
};

// 분기별 괘 해석
const getQuarterlyGwae = (baseGwae: number, quarter: number) => {
  const adjustedGwae = ((baseGwae + quarter - 1) % 8) + 1;
  return GWAE_DATA[adjustedGwae];
};

// 애니메이션 설정
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function TojeongPremiumSection({ result, name, birthDate }: TojeongPremiumSectionProps) {
  // 토정비결 괘 계산
  const calculateTojeongGwae = (year: number, month: number, day: number) => {
    const yearCycle = (year - 4) % 60;
    const sangGwae = (yearCycle % 8) + 1;
    const jungGwae = ((month + yearCycle) % 6) + 1;
    const haGwae = ((day + month + yearCycle) % 8) + 1;
    return { sangGwae, jungGwae, haGwae };
  };

  const gwae = calculateTojeongGwae(birthDate.year, birthDate.month, birthDate.day);
  const yearlyFortune = getYearlyFortune(gwae.sangGwae, gwae.jungGwae, gwae.haGwae, name);
  const sangGwaeData = GWAE_DATA[gwae.sangGwae] || GWAE_DATA[1];
  const haGwaeData = GWAE_DATA[gwae.haGwae] || GWAE_DATA[1];

  // 삼재 계산
  const getSamjae = () => {
    const birthYear = birthDate.year;
    const zodiac = (birthYear - 4) % 12;
    // 삼재 띠: 신유술(닭, 개, 돼지) → 삼재 년: 인묘진(호랑이, 토끼, 용)
    // 2026년은 병오년(말띠) → 해자축 삼재
    const samjaeYears = {
      0: [6, 7, 8],   // 자축인(쥐, 소, 호랑이) → 신유술 삼재
      1: [9, 10, 11], // 묘진사(토끼, 용, 뱀) → 해자축 삼재
      2: [0, 1, 2],   // 오미신(말, 양, 원숭이) → 인묘진 삼재
      3: [3, 4, 5]    // 유술해(닭, 개, 돼지) → 사오미 삼재
    };

    const group = Math.floor(zodiac / 3);
    const isSamjae = samjaeYears[group as keyof typeof samjaeYears]?.includes(6); // 2026년 = 오(6)

    return {
      hasSamjae: isSamjae,
      type: isSamjae ? (zodiac % 3 === 0 ? '들삼재' : zodiac % 3 === 1 ? '눌삼재' : '날삼재') : null
    };
  };

  const samjae = getSamjae();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* 삼원 괘상 */}
      <motion.div variants={itemVariants} className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 p-6 rounded-2xl border border-amber-200 dark:border-amber-800">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <Scroll className="w-5 h-5 text-amber-600" />
          {name}님의 2026년 삼원 괘상(三元卦象)
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl text-center">
            <span className="text-sm text-gray-500">상괘(上卦) - 태세수</span>
            <div className="text-4xl my-2">{sangGwaeData.symbol}</div>
            <div className="text-lg font-bold text-amber-700 dark:text-amber-300">
              {sangGwaeData.name}({sangGwaeData.hanja})
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{sangGwaeData.nature}의 기운</div>
          </div>

          <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl text-center">
            <span className="text-sm text-gray-500">중괘(中卦) - 월건수</span>
            <div className="text-4xl my-2">{GWAE_DATA[((gwae.jungGwae - 1) % 8) + 1]?.symbol || '☰'}</div>
            <div className="text-lg font-bold text-amber-700 dark:text-amber-300">
              {GWAE_DATA[((gwae.jungGwae - 1) % 8) + 1]?.name || '건'}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">월의 기운</div>
          </div>

          <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl text-center">
            <span className="text-sm text-gray-500">하괘(下卦) - 일진수</span>
            <div className="text-4xl my-2">{haGwaeData.symbol}</div>
            <div className="text-lg font-bold text-amber-700 dark:text-amber-300">
              {haGwaeData.name}({haGwaeData.hanja})
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{haGwaeData.nature}의 기운</div>
          </div>
        </div>
      </motion.div>

      {/* 연간 대운 */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-white" />
              <h3 className="font-bold text-white text-lg">2026년 연간 대운</h3>
            </div>
            <span className="px-4 py-1 bg-white/20 rounded-full text-white font-bold">
              {yearlyFortune.grade}
            </span>
          </div>
        </div>
        <div className="p-6">
          <p className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            {yearlyFortune.summary}
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            {yearlyFortune.detail}
          </p>

          {/* 분야별 운세 */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-amber-700 dark:text-amber-300 flex items-center gap-2">
                  <Wallet className="w-4 h-4" /> 재물운
                </span>
                <span className="text-lg font-bold text-amber-600">{yearlyFortune.category.wealth.score}점</span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">{yearlyFortune.category.wealth.text}</p>
            </div>

            <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-pink-700 dark:text-pink-300 flex items-center gap-2">
                  <Heart className="w-4 h-4" /> 인연운
                </span>
                <span className="text-lg font-bold text-pink-600">{yearlyFortune.category.love.score}점</span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">{yearlyFortune.category.love.text}</p>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-green-700 dark:text-green-300 flex items-center gap-2">
                  <Activity className="w-4 h-4" /> 건강운
                </span>
                <span className="text-lg font-bold text-green-600">{yearlyFortune.category.health.score}점</span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">{yearlyFortune.category.health.text}</p>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-blue-700 dark:text-blue-300 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> 직업운
                </span>
                <span className="text-lg font-bold text-blue-600">{yearlyFortune.category.career.score}점</span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">{yearlyFortune.category.career.text}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 삼재 안내 */}
      {samjae.hasSamjae && (
        <motion.div variants={itemVariants} className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-6 rounded-2xl">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-red-500 rounded-xl flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-red-700 dark:text-red-300 text-lg mb-2">
                ⚠️ 2026년 {samjae.type} 주의
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {samjae.type === '들삼재' && '삼재가 시작되는 해입니다. 새로운 일을 시작하기보다 준비하는 자세가 좋습니다.'}
                {samjae.type === '눌삼재' && '삼재가 절정인 해입니다. 건강과 안전에 특히 주의하시고, 큰 결정은 미루십시오.'}
                {samjae.type === '날삼재' && '삼재가 물러가는 해입니다. 하반기부터 운이 좋아지니 희망을 가지십시오.'}
              </p>
              <div className="mt-4 p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                <span className="font-semibold text-red-600 dark:text-red-400">삼재 극복 비결:</span>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                  북쪽을 향해 기도하고, 빨간색을 피하며, 새해 첫날 해돋이를 보면 삼재를 막는다고 전해집니다.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* 분기별 괘 운세 */}
      <motion.div variants={itemVariants}>
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-purple-500" />
          2026년 분기별 괘 운세
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((quarter) => {
            const qGwae = getQuarterlyGwae(gwae.haGwae, quarter);
            const seasons = ['봄 (1~3월)', '여름 (4~6월)', '가을 (7~9월)', '겨울 (10~12월)'];
            const icons = [Sun, Flame, Moon, Cloud];
            const colors = ['from-green-400 to-emerald-500', 'from-orange-400 to-red-500', 'from-amber-400 to-yellow-500', 'from-blue-400 to-indigo-500'];
            const SeasonIcon = icons[quarter - 1];

            return (
              <div key={quarter} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
                <div className={`bg-gradient-to-r ${colors[quarter - 1]} p-3`}>
                  <div className="flex items-center gap-2 text-white">
                    <SeasonIcon className="w-5 h-5" />
                    <span className="font-bold">{seasons[quarter - 1]}</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{qGwae.symbol}</span>
                    <div>
                      <span className="font-bold text-gray-800 dark:text-gray-200">{qGwae.name}({qGwae.hanja})</span>
                      <p className="text-sm text-gray-500">{qGwae.nature}의 기운</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{qGwae.fortune}</p>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>🎨 행운의 색: {qGwae.luckyColor}</p>
                    <p>🔢 행운의 수: {qGwae.luckyNumber}</p>
                    <p>🧭 행운의 방향: {qGwae.luckyDirection}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* 토정비결 총평 */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-amber-100 via-yellow-100 to-orange-100 dark:from-amber-900/30 dark:via-yellow-900/30 dark:to-orange-900/30 p-6 rounded-2xl">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-6 h-6 text-amber-600" />
          <h3 className="font-bold text-gray-800 dark:text-gray-200 text-lg">2026년 토정비결 총평</h3>
        </div>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {name}님의 상괘 <strong>{sangGwaeData.name}({sangGwaeData.hanja})</strong>와
          하괘 <strong>{haGwaeData.name}({haGwaeData.hanja})</strong>의 조합으로 볼 때,
          2026년은 <strong>{sangGwaeData.nature}</strong>의 기운과 <strong>{haGwaeData.nature}</strong>의 기운이
          어우러져 {yearlyFortune.grade}의 해가 예상됩니다.
          {sangGwaeData.advice} 또한, {haGwaeData.advice}
        </p>
      </motion.div>
    </motion.div>
  );
}
