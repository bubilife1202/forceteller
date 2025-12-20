'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, RefreshCw, Coins, TrendingUp, Calendar, Star, Sparkles, Target, Clock, Gift, Gem, Crown, DollarSign, PiggyBank, Wallet, Download, Share2 } from 'lucide-react';
import { WealthFortuneFormData } from './WealthFortuneForm';
import { downloadElementAsHtml } from '@/lib/utils/export-utils';
import { getDayPillar, getTenGod } from '@/lib/saju-calculator';
import { DAY_STEM_WEALTH } from '@/lib/data/wealth-data';

interface WealthFortuneResultProps {
  formData: WealthFortuneFormData;
  onReset: () => void;
  onBack: () => void;
}

export default function WealthFortuneResult({ formData, onReset, onBack }: WealthFortuneResultProps) {
  const { name, year, month, day, gender } = formData;

  // 일주 계산
  const dayPillar = getDayPillar(year, month, day);
  const dayStem = dayPillar.stem;
  const dayBranch = dayPillar.branch;
  const userElement = dayStem.element;

  // 오늘 날짜
  const today = new Date();
  const todayPillar = getDayPillar(today.getFullYear(), today.getMonth() + 1, today.getDate());
  const tenGod = getTenGod(dayStem.ko, todayPillar.stem.ko);

  // 시드값 생성 (고정된 결과를 위해)
  const seed = year * 10000 + month * 100 + day;
  const seededRandom = (offset: number) => {
    const x = Math.sin(seed + offset) * 10000;
    return x - Math.floor(x);
  };

  // 재물 팔자 점수 계산 (40-95)
  const calculateWealthScore = () => {
    let score = 60;

    // 일간별 기본 재물운
    const elementScores: { [key: string]: number } = {
      '목': 65, '화': 60, '토': 75, '금': 80, '수': 70
    };
    score = elementScores[userElement] || 65;

    // 십성에 따른 가감
    if (tenGod === '정재' || tenGod === '편재') score += 15;
    else if (tenGod === '식신' || tenGod === '상관') score += 10;
    else if (tenGod === '정관' || tenGod === '편관') score += 5;
    else if (tenGod === '겁재' || tenGod === '비견') score -= 5;

    // 성별 보정
    if (gender === 'male' && tenGod === '정재') score += 5;
    if (gender === 'female' && tenGod === '편재') score += 5;

    // 지지(띠)별 재물운
    const branchScores: { [key: string]: number } = {
      '자': 70, '축': 80, '인': 65, '묘': 60,
      '진': 85, '사': 75, '오': 65, '미': 70,
      '신': 80, '유': 85, '술': 75, '해': 70
    };
    score += (branchScores[dayBranch.ko] || 70) - 70;

    return Math.max(40, Math.min(95, score));
  };

  const wealthScore = calculateWealthScore();

  // 재물 등급 판정
  const getWealthGrade = () => {
    if (wealthScore >= 85) return { grade: '대박 재물상', emoji: '💎', color: 'text-purple-400', desc: '평생 돈 걱정 없는 대부호의 팔자입니다!' };
    if (wealthScore >= 75) return { grade: '상위 재물상', emoji: '👑', color: 'text-yellow-400', desc: '꾸준히 재물이 쌓이는 복 많은 팔자입니다.' };
    if (wealthScore >= 65) return { grade: '안정 재물상', emoji: '💰', color: 'text-green-400', desc: '안정적인 수입으로 풍요로운 삶을 살 팔자입니다.' };
    if (wealthScore >= 55) return { grade: '성장 재물상', emoji: '📈', color: 'text-blue-400', desc: '노력에 따라 재물이 늘어나는 팔자입니다.' };
    return { grade: '실속 재물상', emoji: '🌱', color: 'text-emerald-400', desc: '알뜰하게 모으면 부를 이룰 수 있는 팔자입니다.' };
  };

  const gradeInfo = getWealthGrade();

  // 평생 예상 수입 계산 (재미용)
  const getLifetimeEarnings = () => {
    const base = wealthScore * 100000000; // 기본 100억 기준
    const variation = seededRandom(1) * 50000000000;
    const total = base + variation;

    if (total >= 10000000000) return `${Math.floor(total / 100000000)}억원+`;
    return `${Math.floor(total / 100000000)}억원`;
  };

  // 재물 성향 분석
  const getWealthType = () => {
    const types: { [key: string]: { type: string; desc: string; icon: typeof Coins } } = {
      '목': { type: '성장형 재물', desc: '사업이나 창업으로 재물을 불려나가는 타입입니다. 초기에는 힘들어도 점점 성장합니다.', icon: TrendingUp },
      '화': { type: '활동형 재물', desc: '적극적인 활동과 인맥으로 돈을 버는 타입입니다. 영업, 마케팅에 강합니다.', icon: Star },
      '토': { type: '안정형 재물', desc: '부동산이나 안정적인 투자로 재물을 모으는 타입입니다. 꾸준함이 강점입니다.', icon: PiggyBank },
      '금': { type: '투자형 재물', desc: '금융, 투자에 뛰어난 감각을 가진 타입입니다. 주식, 코인에서 수익을 낼 수 있습니다.', icon: DollarSign },
      '수': { type: '지혜형 재물', desc: '전문성이나 지식으로 돈을 버는 타입입니다. 기술직, 전문직에서 성공합니다.', icon: Gem },
    };
    return types[userElement] || types['토'];
  };

  const wealthType = getWealthType();

  // 투자 적기 계산
  const getInvestmentDays = () => {
    const currentMonth = today.getMonth() + 1;
    const days: string[] = [];

    // 각 월의 좋은 날 계산 (간단한 로직)
    for (let i = 0; i < 3; i++) {
      const targetMonth = ((currentMonth + i - 1) % 12) + 1;
      const luckyDays = [
        Math.floor(seededRandom(targetMonth) * 10) + 1,
        Math.floor(seededRandom(targetMonth + 100) * 10) + 11,
        Math.floor(seededRandom(targetMonth + 200) * 8) + 21,
      ];
      days.push(`${targetMonth}월 ${luckyDays.join('일, ')}일`);
    }

    return days;
  };

  // 로또 행운 번호 생성
  const getLuckyNumbers = () => {
    const numbers: number[] = [];
    const elementBonus: { [key: string]: number[] } = {
      '목': [3, 8, 13, 18, 23, 28, 33, 38],
      '화': [2, 7, 12, 17, 22, 27, 32, 37],
      '토': [5, 10, 15, 20, 25, 30, 35, 40],
      '금': [4, 9, 14, 19, 24, 29, 34, 39],
      '수': [1, 6, 11, 16, 21, 26, 31, 36],
    };

    const bonus = elementBonus[userElement] || elementBonus['토'];

    // 6개 번호 선택
    while (numbers.length < 6) {
      let num: number;
      if (numbers.length < 2) {
        // 처음 2개는 오행에 맞는 번호
        num = bonus[Math.floor(seededRandom(numbers.length + 300) * bonus.length)];
      } else {
        // 나머지는 랜덤
        num = Math.floor(seededRandom(numbers.length + 400) * 45) + 1;
      }
      if (!numbers.includes(num) && num >= 1 && num <= 45) {
        numbers.push(num);
      }
    }

    return numbers.sort((a, b) => a - b);
  };

  // 재물 조언
  const getWealthAdvice = () => {
    const advice: { [key: string]: string[] } = {
      '목': [
        '봄철(2-4월)에 새로운 사업이나 투자를 시작하면 좋습니다.',
        '동쪽 방향의 부동산이나 사업장이 재물을 불러옵니다.',
        '녹색 계열의 지갑이나 소품이 금전운을 높여줍니다.',
        '나무와 관련된 사업(가구, 인테리어, 농업)에 기회가 있습니다.',
      ],
      '화': [
        '여름철(5-7월)에 적극적인 재테크 활동이 효과적입니다.',
        '남쪽 방향이 재물을 끌어당기는 방위입니다.',
        '빨간색이나 보라색 소품이 금전운을 활성화합니다.',
        'IT, 전기, 미디어 관련 분야에서 수익 기회가 많습니다.',
      ],
      '토': [
        '환절기(3, 6, 9, 12월)에 재물운이 상승합니다.',
        '중앙 또는 고향 방향의 투자가 안정적입니다.',
        '노란색, 베이지색 지갑이 재물을 지켜줍니다.',
        '부동산, 건설, 식품업에서 좋은 기회를 찾을 수 있습니다.',
      ],
      '금': [
        '가을철(8-10월)에 투자 수익률이 높아집니다.',
        '서쪽 방향의 금융기관이나 사업장이 유리합니다.',
        '흰색, 금색 계열의 소품이 금전운을 높입니다.',
        '금융, 귀금속, 기계 관련 분야에 적성이 맞습니다.',
      ],
      '수': [
        '겨울철(11-1월)에 큰 거래나 계약이 성사됩니다.',
        '북쪽 방향에서 재물의 기운이 들어옵니다.',
        '검정색, 파란색 소품이 재물을 끌어당깁니다.',
        '물류, 유통, 서비스업에서 성공 확률이 높습니다.',
      ],
    };
    return advice[userElement] || advice['토'];
  };

  // 올해 재물운 예측
  const getYearlyForecast = () => {
    const forecasts = [
      { month: '1-3월', score: Math.floor(seededRandom(500) * 30 + 50), desc: '새해 계획을 세우기 좋은 시기' },
      { month: '4-6월', score: Math.floor(seededRandom(600) * 30 + 55), desc: '적극적인 투자 활동의 시기' },
      { month: '7-9월', score: Math.floor(seededRandom(700) * 30 + 50), desc: '안정적인 수익 관리 시기' },
      { month: '10-12월', score: Math.floor(seededRandom(800) * 30 + 60), desc: '결실을 맺는 수확의 시기' },
    ];
    return forecasts;
  };

  const luckyNumbers = getLuckyNumbers();
  const investmentDays = getInvestmentDays();
  const wealthAdvice = getWealthAdvice();
  const yearlyForecast = getYearlyForecast();

  // 일간별 상세 재물 프로필 가져오기
  const wealthProfile = DAY_STEM_WEALTH[dayStem.ko] || DAY_STEM_WEALTH['갑'];

  // 현재 월 조언 가져오기
  const currentMonth = today.getMonth() + 1;
  const currentMonthAdvice = wealthProfile.monthlyAdvice.find(
    m => m.month === `${currentMonth}월`
  ) || wealthProfile.monthlyAdvice[0];

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

  const handleDownloadHtml = () => {
    const today = new Date().toISOString().split('T')[0];
    downloadElementAsHtml('wealth-result', `${formData.name}_재물운_${today}`);
  };

  // 카카오톡 공유 함수
  const handleKakaoShare = () => {
    const shareUrl = window.location.href;
    const shareText = `💰 ${name}님의 재물운\n\n${dayStem.ko}일간 재물 분석 결과\n\n나도 재물운 보러가기 👉`;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const kakao = (window as any).Kakao;
    if (typeof window !== 'undefined' && kakao) {
      kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: `💰 ${name}님의 재물운`,
          description: `${dayStem.ko}일간 - ${wealthProfile.wealthPeak}`,
          imageUrl: 'https://forceteller.vercel.app/og-image.png',
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
        buttons: [
          {
            title: '나도 재물운 보기',
            link: {
              mobileWebUrl: shareUrl,
              webUrl: shareUrl,
            },
          },
        ],
      });
    } else {
      if (navigator.share) {
        navigator.share({
          title: `💰 ${name}님의 재물운`,
          text: shareText,
          url: shareUrl,
        });
      } else {
        alert('카카오톡 공유 기능을 사용하려면 모바일 앱에서 접속해주세요.');
      }
    }
  };

  return (
    <motion.div
      className="min-h-screen py-8 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div id="wealth-result" className="max-w-2xl mx-auto">
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
        <motion.div
          variants={itemVariants}
          className="glass-strong rounded-3xl p-6 md:p-8 text-center mb-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/20 rounded-full blur-3xl -z-10" />

          <h1
            className="text-2xl md:text-3xl font-bold gradient-text mb-2"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            {name}님의 재물 팔자
          </h1>
          <p className="text-slate-400 mb-6">
            {dayStem.ko}({dayStem.cn}) 일간 · {dayBranch.ko}({dayBranch.cn}) 일지
          </p>

          {/* 재물 점수 */}
          <div className="relative w-40 h-40 mx-auto mb-6">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="12"
              />
              <motion.circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="url(#goldGradient)"
                strokeWidth="12"
                strokeLinecap="round"
                initial={{ strokeDasharray: '0 440' }}
                animate={{ strokeDasharray: `${(wealthScore / 100) * 440} 440` }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl mb-1">{gradeInfo.emoji}</span>
              <span className="text-3xl font-bold text-yellow-400">{wealthScore}점</span>
            </div>
          </div>

          <div className={`text-xl font-bold ${gradeInfo.color} mb-2`}>
            {gradeInfo.grade}
          </div>
          <p className="text-slate-300">{gradeInfo.desc}</p>
        </motion.div>

        {/* 평생 예상 수입 */}
        <motion.div
          variants={itemVariants}
          className="glass-strong rounded-3xl p-6 mb-6 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Crown className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-bold text-white">평생 예상 수입</h2>
          </div>
          <motion.div
            className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {getLifetimeEarnings()}
          </motion.div>
          <p className="text-slate-400 text-sm">
            * 사주팔자 기반 재미용 예측입니다
          </p>
        </motion.div>

        {/* 재물 성향 */}
        <motion.div
          variants={itemVariants}
          className="glass-strong rounded-3xl p-6 mb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center">
              <wealthType.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{wealthType.type}</h2>
              <p className="text-yellow-400 text-sm">{userElement} 오행 기반</p>
            </div>
          </div>
          <p className="text-slate-300 leading-relaxed">{wealthType.desc}</p>
        </motion.div>

        {/* 분기별 재물운 */}
        <motion.div
          variants={itemVariants}
          className="glass-strong rounded-3xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-yellow-400" />
            <h2 className="text-lg font-bold text-white">2025년 분기별 재물운</h2>
          </div>
          <div className="space-y-4">
            {yearlyForecast.map((period, i) => (
              <div key={i} className="bg-slate-800/50 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-300 font-medium">{period.month}</span>
                  <span className="text-yellow-400 font-bold">{period.score}점</span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden mb-2">
                  <motion.div
                    className="h-full bg-gradient-to-r from-yellow-500 to-amber-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${period.score}%` }}
                    transition={{ duration: 0.8, delay: i * 0.2 }}
                  />
                </div>
                <p className="text-slate-400 text-sm">{period.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 투자 적기 */}
        <motion.div
          variants={itemVariants}
          className="glass-strong rounded-3xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <h2 className="text-lg font-bold text-white">투자하기 좋은 날</h2>
          </div>
          <div className="grid gap-3">
            {investmentDays.map((dayInfo, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-xl p-4"
              >
                <Clock className="w-5 h-5 text-green-400" />
                <span className="text-green-300 font-medium">{dayInfo}</span>
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-xs mt-3">
            * 주식, 코인, 부동산 등 투자 결정 시 참고하세요
          </p>
        </motion.div>

        {/* 로또 행운 번호 */}
        <motion.div
          variants={itemVariants}
          className="glass-strong rounded-3xl p-6 mb-6 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gift className="w-5 h-5 text-pink-400" />
            <h2 className="text-lg font-bold text-white">로또 행운 번호</h2>
          </div>
          <div className="flex justify-center gap-3 mb-4">
            {luckyNumbers.map((num, i) => (
              <motion.div
                key={i}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-black font-bold text-lg shadow-lg"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.8 + i * 0.1, type: 'spring' }}
              >
                {num}
              </motion.div>
            ))}
          </div>
          <p className="text-slate-400 text-sm">
            {userElement} 오행 기반 행운의 숫자입니다
          </p>
        </motion.div>

        {/* 재물 조언 */}
        <motion.div
          variants={itemVariants}
          className="glass-strong rounded-3xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <h2 className="text-lg font-bold text-white">재물운 높이는 방법</h2>
          </div>
          <div className="space-y-3">
            {wealthAdvice.map((advice, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-yellow-400 text-sm font-bold">{i + 1}</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{advice}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ===== 일간별 상세 재물 프로필 시작 ===== */}

        {/* 재물 성격 상세 */}
        <motion.div
          variants={itemVariants}
          className="glass-strong rounded-3xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Crown className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-bold text-white">{dayStem.ko}일간 재물 성격</h2>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 mb-4">
            <p className="text-purple-200 leading-relaxed">{wealthProfile.wealthPersonality}</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4">
            <h3 className="text-sm font-medium text-slate-400 mb-2">💰 돈에 대한 마인드셋</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{wealthProfile.moneyMindset}</p>
          </div>
        </motion.div>

        {/* 재물 강점 & 약점 */}
        <motion.div
          variants={itemVariants}
          className="glass-strong rounded-3xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-bold text-white">재물 강점 & 약점</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
              <h3 className="text-emerald-400 font-medium mb-3 flex items-center gap-2">
                <span>✅</span> 재물 강점
              </h3>
              <ul className="space-y-2">
                {wealthProfile.strengths.map((s, i) => (
                  <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
              <h3 className="text-red-400 font-medium mb-3 flex items-center gap-2">
                <span>⚠️</span> 재물 약점
              </h3>
              <ul className="space-y-2">
                {wealthProfile.weaknesses.map((w, i) => (
                  <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* 이상적인 수입원 */}
        <motion.div
          variants={itemVariants}
          className="glass-strong rounded-3xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-5 h-5 text-green-400" />
            <h2 className="text-lg font-bold text-white">이상적인 수입원</h2>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-4">
            <h3 className="text-green-400 font-medium mb-3">💼 추천 직업/사업</h3>
            <div className="flex flex-wrap gap-2">
              {wealthProfile.idealIncome.map((job, i) => (
                <span key={i} className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                  {job}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
            <h3 className="text-orange-400 font-medium mb-3">🚫 피해야 할 분야</h3>
            <div className="flex flex-wrap gap-2">
              {wealthProfile.avoidIncome.map((job, i) => (
                <span key={i} className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm">
                  {job}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 저축 & 소비 스타일 */}
        <motion.div
          variants={itemVariants}
          className="glass-strong rounded-3xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <PiggyBank className="w-5 h-5 text-pink-400" />
            <h2 className="text-lg font-bold text-white">저축 & 소비 스타일</h2>
          </div>
          <div className="space-y-4">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
              <h3 className="text-blue-400 font-medium mb-2">🏦 저축 스타일</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{wealthProfile.savingStyle}</p>
            </div>
            <div className="bg-pink-500/10 border border-pink-500/30 rounded-xl p-4">
              <h3 className="text-pink-400 font-medium mb-2">🛍️ 소비 스타일</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{wealthProfile.spendingStyle}</p>
            </div>
          </div>
        </motion.div>

        {/* 투자 성향 */}
        <motion.div
          variants={itemVariants}
          className="glass-strong rounded-3xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">투자 성향 프로필</h2>
          </div>
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 mb-4">
            <p className="text-cyan-200 leading-relaxed">{wealthProfile.investmentProfile}</p>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
            <h3 className="text-yellow-400 font-medium mb-2">⏰ 재물 전성기</h3>
            <p className="text-slate-300 text-sm">{wealthProfile.wealthPeak}</p>
          </div>
        </motion.div>

        {/* 행운의 사업/아이템/컬러 */}
        <motion.div
          variants={itemVariants}
          className="glass-strong rounded-3xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Gem className="w-5 h-5 text-violet-400" />
            <h2 className="text-lg font-bold text-white">행운의 재물 아이템</h2>
          </div>
          <div className="space-y-4">
            <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl p-4">
              <h3 className="text-violet-400 font-medium mb-3">🏪 행운의 사업 분야</h3>
              <div className="flex flex-wrap gap-2">
                {wealthProfile.luckyBusiness.map((biz, i) => (
                  <span key={i} className="px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full text-sm">
                    {biz}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
              <h3 className="text-amber-400 font-medium mb-3">🎁 행운의 아이템</h3>
              <div className="flex flex-wrap gap-2">
                {wealthProfile.luckyItems.map((item, i) => (
                  <span key={i} className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4">
              <h3 className="text-rose-400 font-medium mb-3">🎨 행운의 컬러</h3>
              <div className="flex flex-wrap gap-2">
                {wealthProfile.luckyColors.map((color, i) => (
                  <span key={i} className="px-3 py-1 bg-rose-500/20 text-rose-300 rounded-full text-sm">
                    {color}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 월별 재물 조언 */}
        <motion.div
          variants={itemVariants}
          className="glass-strong rounded-3xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">월별 재물 조언</h2>
          </div>

          {/* 이번 달 하이라이트 */}
          <div className="bg-indigo-500/20 border border-indigo-500/40 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-indigo-500 text-white text-xs rounded-full">이번 달</span>
              <span className="text-indigo-300 font-medium">{currentMonthAdvice.month}</span>
            </div>
            <p className="text-white">{currentMonthAdvice.advice}</p>
          </div>

          {/* 전체 월별 조언 */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {wealthProfile.monthlyAdvice.map((m, i) => (
              <div
                key={i}
                className={`rounded-xl p-3 ${
                  m.month === `${currentMonth}월`
                    ? 'bg-indigo-500/30 border border-indigo-500/50'
                    : 'bg-slate-800/50'
                }`}
              >
                <div className="text-slate-400 text-xs mb-1">{m.month}</div>
                <p className="text-slate-300 text-xs leading-relaxed">{m.advice}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 재물 핵심 조언 */}
        <motion.div
          variants={itemVariants}
          className="glass-strong rounded-3xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Wallet className="w-5 h-5 text-teal-400" />
            <h2 className="text-lg font-bold text-white">재물 핵심 조언</h2>
          </div>
          <div className="space-y-3">
            {wealthProfile.wealthTips.map((tip, i) => (
              <div key={i} className="flex gap-3 items-start bg-teal-500/10 border border-teal-500/30 rounded-xl p-3">
                <div className="w-6 h-6 rounded-full bg-teal-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-teal-400 text-sm font-bold">{i + 1}</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 평생 재물 여정 */}
        <motion.div
          variants={itemVariants}
          className="glass-strong rounded-3xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-orange-400" />
            <h2 className="text-lg font-bold text-white">평생 재물 여정</h2>
          </div>
          <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/30 rounded-xl p-4 mb-4">
            <p className="text-orange-200 text-sm leading-relaxed">{wealthProfile.lifetimeWealthPath}</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4">
            <h3 className="text-slate-400 font-medium mb-2">🏖️ 은퇴 후 재물 스타일</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{wealthProfile.retirementStyle}</p>
          </div>
        </motion.div>

        {/* 재물 방해요소 & 증폭요소 */}
        <motion.div
          variants={itemVariants}
          className="glass-strong rounded-3xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-lime-400" />
            <h2 className="text-lg font-bold text-white">재물 방해요소 & 증폭요소</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
              <h3 className="text-red-400 font-medium mb-3">🚧 재물 방해요소</h3>
              <div className="flex flex-wrap gap-2">
                {wealthProfile.wealthBlockers.map((b, i) => (
                  <span key={i} className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm">
                    {b}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-lime-500/10 border border-lime-500/30 rounded-xl p-4">
              <h3 className="text-lime-400 font-medium mb-3">🚀 재물 증폭요소</h3>
              <div className="flex flex-wrap gap-2">
                {wealthProfile.wealthBoosters.map((b, i) => (
                  <span key={i} className="px-3 py-1 bg-lime-500/20 text-lime-300 rounded-full text-sm">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ===== 일간별 상세 재물 프로필 끝 ===== */}

        {/* 버튼 */}
        <motion.div variants={itemVariants} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleDownloadHtml}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-white font-medium hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg"
            >
              <Download className="w-5 h-5" />
              <span>저장</span>
            </button>
            <button
              onClick={handleKakaoShare}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-yellow-500 rounded-xl text-black font-medium hover:bg-yellow-400 transition-colors shadow-lg"
            >
              <Share2 className="w-5 h-5" />
              <span>카톡 공유</span>
            </button>
          </div>
          <button
            onClick={onReset}
            className="w-full py-4 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-2xl text-black font-bold text-lg hover:from-yellow-600 hover:to-amber-700 transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <RefreshCw className="w-5 h-5" />
            다시 보기
          </button>
          <button
            onClick={onBack}
            className="w-full py-3 bg-slate-700/50 rounded-2xl text-slate-300 font-medium hover:bg-slate-700 transition-all"
          >
            메뉴로
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
