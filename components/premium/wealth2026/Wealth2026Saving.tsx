'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { PiggyBank, Wallet, TrendingDown, Target, Calendar, Sparkles, Award, Shield } from 'lucide-react';

interface Wealth2026SavingProps {
  result: SajuResult;
  name: string;
  baseScore: number;
}

export default function Wealth2026Saving({ result, name, baseScore }: Wealth2026SavingProps) {
  const dayElement = result.day.stem.element;
  const { 재성, 관성, 식상, 비겁, 인성 } = result.tenGodsCount;

  // 저축 성공률
  const getSavingSuccessScore = () => {
    let score = baseScore + 10;
    if (dayElement === '토') score += 25; // 토는 저축 최적
    if (dayElement === '금') score += 20; // 금은 축재
    if (dayElement === '수') score += 10; // 수는 모으기
    if (dayElement === '화') score -= 15; // 화는 소비 성향
    if (관성 >= 2) score += 15; // 관성은 계획성
    if (인성 >= 2) score += 10; // 인성은 절제
    if (비겁 >= 3) score -= 10; // 비겁 많으면 지출 많음
    return Math.min(Math.max(score, 30), 100);
  };

  // 절약 실천력
  const getThriftScore = () => {
    let score = baseScore;
    if (dayElement === '금') score += 25; // 금은 절제력
    if (dayElement === '토') score += 20; // 토는 안정
    if (dayElement === '목') score += 10; // 목은 성실
    if (dayElement === '화') score -= 20; // 화는 소비
    if (dayElement === '수') score -= 10; // 수는 유동적 지출
    if (관성 >= 2) score += 15;
    if (비겁 >= 3) score -= 15;
    return Math.min(Math.max(score, 25), 100);
  };

  // 목돈 마련 가능성
  const getLumpSumScore = () => {
    let score = baseScore;
    if (dayElement === '토') score += 20;
    if (dayElement === '금') score += 25; // 금은 축재력
    if (dayElement === '수') score += 5;
    if (재성 >= 2) score += 20; // 재성 좋으면 목돈 마련
    if (식상 >= 2) score += 15; // 식상은 수입원
    if (관성 >= 2) score += 10;
    return Math.min(Math.max(score, 30), 100);
  };

  // 재테크 실천력
  const getFinancialPlanScore = () => {
    let score = baseScore + 5;
    if (dayElement === '금') score += 20;
    if (dayElement === '토') score += 15;
    if (dayElement === '수') score += 10; // 수는 분석력
    if (인성 >= 2) score += 15; // 인성은 학습
    if (관성 >= 2) score += 10; // 관성은 체계
    if (식상 >= 2) score += 5;
    return Math.min(Math.max(score, 35), 100);
  };

  const savingAspects = [
    {
      icon: PiggyBank,
      name: '저축 성공률',
      score: getSavingSuccessScore(),
      color: 'from-green-500 to-emerald-600',
      textColor: 'text-green-400',
      advice: getSavingSuccessScore() >= 70
        ? '체계적인 저축으로 큰 성과를 낼 수 있습니다.'
        : getSavingSuccessScore() >= 50
        ? '꾸준한 저축이 가능합니다. 자동이체를 활용하세요.'
        : '소액이라도 저축 습관을 만드는 것이 중요합니다.',
      timing: '매월 월급날 자동이체',
    },
    {
      icon: TrendingDown,
      name: '절약 실천력',
      score: getThriftScore(),
      color: 'from-blue-500 to-cyan-600',
      textColor: 'text-blue-400',
      advice: getThriftScore() >= 70
        ? '뛰어난 절약 능력으로 지출을 줄일 수 있습니다.'
        : getThriftScore() >= 50
        ? '계획적 소비로 절약이 가능합니다.'
        : '충동 구매를 줄이는 연습이 필요합니다.',
      timing: '월초 예산 수립 필수',
    },
    {
      icon: Target,
      name: '목돈 마련',
      score: getLumpSumScore(),
      color: 'from-purple-500 to-violet-600',
      textColor: 'text-purple-400',
      advice: getLumpSumScore() >= 70
        ? '목돈 마련에 매우 유리한 해입니다.'
        : getLumpSumScore() >= 50
        ? '꾸준한 저축으로 목돈 마련이 가능합니다.'
        : '소액 적금부터 시작하세요.',
      timing: getLumpSumScore() >= 60 ? '연 1000만원 이상 가능' : '연 500만원 목표',
    },
    {
      icon: Wallet,
      name: '재테크 실천',
      score: getFinancialPlanScore(),
      color: 'from-amber-500 to-orange-600',
      textColor: 'text-amber-400',
      advice: getFinancialPlanScore() >= 70
        ? '체계적인 재테크로 자산을 효율적으로 늘리세요.'
        : getFinancialPlanScore() >= 50
        ? '기본적인 재테크 방법을 공부하고 실천하세요.'
        : '먼저 저축 습관을 들인 후 재테크를 시작하세요.',
      timing: '분기별 재무 점검',
    },
  ];

  // 종합 저축 전략
  const getSavingStrategy = () => {
    const avgScore = (getSavingSuccessScore() + getThriftScore() + getLumpSumScore()) / 3;

    if (avgScore >= 70) {
      return {
        type: '모범적 저축가',
        emoji: '💰',
        strategy: '체계적인 저축과 절약으로 큰 자산을 모을 수 있는 해입니다.',
        monthlyTarget: '월 소득의 40% 이상',
        method: '적금 + 투자 병행',
      };
    }
    if (avgScore >= 50) {
      return {
        type: '꾸준한 저축가',
        emoji: '📊',
        strategy: '계획적인 저축으로 안정적인 자산 형성이 가능합니다.',
        monthlyTarget: '월 소득의 30% 정도',
        method: '자동이체 적금',
      };
    }
    return {
      type: '습관 형성기',
      emoji: '🌱',
      strategy: '작은 금액부터 저축 습관을 만들어가세요.',
      monthlyTarget: '월 소득의 15-20%',
      method: '소액 자동이체부터',
    };
  };

  const strategy = getSavingStrategy();

  // 저축 방법별 추천
  const savingMethods = [
    {
      method: '정기 적금',
      suitability: getSavingSuccessScore() >= 60 ? '매우 적합' : '적합',
      pros: '확정 금리, 강제 저축, 안정성',
      target: '월 50-100만원',
      score: getSavingSuccessScore(),
      color: 'green',
    },
    {
      method: '청약 저축',
      suitability: dayElement === '토' || 재성 >= 2 ? '매우 적합' : '적합',
      pros: '주택 마련, 세금 혜택, 장기 저축',
      target: '월 10-50만원',
      score: dayElement === '토' ? 90 : 75,
      color: 'blue',
    },
    {
      method: '비상금 통장',
      suitability: '필수',
      pros: '긴급 자금, 즉시 사용 가능, 유동성',
      target: '월 소득의 3-6개월치',
      score: 95,
      color: 'purple',
    },
    {
      method: '파킹 통장',
      suitability: dayElement === '수' || 재성 >= 1 ? '적합' : '보통',
      pros: '여유 자금 활용, 이자 수익, 유동성',
      target: '100만원 이상',
      score: dayElement === '수' ? 80 : 65,
      color: 'amber',
    },
  ];

  // 월별 절약 전략
  const monthlyTips = [
    { month: '1-3월', tip: '연초 목표 수립', action: '연간 저축 목표 설정, 가계부 시작', saving: '보너스/세뱃돈' },
    { month: '4-6월', tip: '지출 패턴 분석', action: '불필요한 구독 해지, 고정비 절감', saving: '월 10-20만원 절약' },
    { month: '7-9월', tip: '휴가비 절약', action: '알뜰 여행, 휴가비 미리 적립', saving: '여행 적금 활용' },
    { month: '10-12월', tip: '연말 정산 준비', action: '공제 항목 체크, 13월의 월급 준비', saving: '세금 환급 저축' },
  ];

  // 절약 팁 (카테고리별)
  const thriftTips = [
    {
      category: '식비',
      icon: '🍽️',
      tips: ['주 2-3회 도시락', '외식 횟수 절반으로', '반값 쿠폰/할인 활용', '대용량 구매 후 소분'],
      saving: '월 20-30만원',
    },
    {
      category: '교통비',
      icon: '🚗',
      tips: ['대중교통 정기권', '카풀/자전거 활용', '가까운 거리는 도보', '주유 할인카드'],
      saving: '월 10-15만원',
    },
    {
      category: '통신비',
      icon: '📱',
      tips: ['알뜰폰 전환', '결합상품 활용', '불필요한 옵션 해지', '와이파이 활용'],
      saving: '월 5-10만원',
    },
    {
      category: '구독료',
      icon: '💳',
      tips: ['사용 안 하는 구독 해지', '가족 요금제 공유', '무료 체험 적극 활용', '연 단위 결제 할인'],
      saving: '월 5-10만원',
    },
    {
      category: '쇼핑',
      icon: '🛍️',
      tips: ['24시간 규칙 (하루 지나고 재고민)', '필요한 것만 리스트 작성', '중고거래 활용', '시즌오프 세일'],
      saving: '월 10-20만원',
    },
    {
      category: '공과금',
      icon: '💡',
      tips: ['대기전력 차단', '에너지 효율 가전', '사용하지 않는 전기 끄기', '절수 샤워기'],
      saving: '월 5-10만원',
    },
  ];

  // 목돈 마련 로드맵
  const lumpSumRoadmap = [
    { target: '500만원', period: '6개월', method: '월 80만원 적금', purpose: '비상금 확보' },
    { target: '1000만원', period: '1년', method: '월 80만원 적금 + α', purpose: '목돈 마련 1단계' },
    { target: '3000만원', period: '3년', method: '월 70만원 + 투자 수익', purpose: '전세자금/목돈 마련' },
    { target: '5000만원', period: '5년', method: '월 60만원 + 투자 + 보너스', purpose: '주택 구입 자금' },
  ];

  // 저축 챌린지
  const savingChallenges = [
    { name: '365일 챌린지', method: '매일 1000원씩 저축', result: '연 36만원', difficulty: '하' },
    { name: '거스름돈 챌린지', method: '거스름돈은 모두 저금통', result: '월 3-5만원', difficulty: '하' },
    { name: '52주 챌린지', method: '주차별 금액 증액 저축', result: '연 137만원', difficulty: '중' },
    { name: '월급 반토막 챌린지', method: '월급의 50% 저축', result: getSavingSuccessScore() >= 70 ? '가능' : '고난도', difficulty: '상' },
  ];

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2
        className="text-3xl font-bold text-center mb-4 gradient-text"
        style={{ fontFamily: "'Noto Serif KR', serif" }}
      >
        💸 저축/절약 전략 분석
      </h2>
      <p className="text-center text-slate-400 mb-8">
        2026년 {name}님의 저축 성공 전략과 절약 팁
      </p>

      {/* 저축 전략 프로필 */}
      <div className="glass rounded-2xl p-6 mb-8 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl">{strategy.emoji}</span>
          <div>
            <p className="text-slate-400">2026년 저축 유형</p>
            <h3 className="text-2xl font-bold text-green-400">{strategy.type}</h3>
          </div>
        </div>
        <p className="text-slate-300 mb-4">{strategy.strategy}</p>

        {/* 저축 목표 */}
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="p-3 bg-green-500/10 rounded-xl">
            <p className="text-sm text-slate-400 mb-1">월 저축 목표</p>
            <p className="text-xl font-bold text-green-400">{strategy.monthlyTarget}</p>
          </div>
          <div className="p-3 bg-emerald-500/10 rounded-xl">
            <p className="text-sm text-slate-400 mb-1">추천 방법</p>
            <p className="text-xl font-bold text-emerald-400">{strategy.method}</p>
          </div>
        </div>
      </div>

      {/* 저축 능력별 점수 */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {savingAspects.map((aspect, index) => (
          <motion.div
            key={aspect.name}
            className="glass rounded-xl p-5"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${aspect.color} flex items-center justify-center`}>
                <aspect.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white">{aspect.name}</h4>
                <p className={`text-2xl font-bold ${aspect.textColor}`}>{aspect.score}점</p>
              </div>
            </div>

            {/* 점수 게이지 */}
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-3">
              <motion.div
                className={`h-full bg-gradient-to-r ${aspect.color}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${aspect.score}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </div>

            <p className="text-slate-300 text-sm mb-2">{aspect.advice}</p>
            <p className="text-slate-500 text-xs">⏰ {aspect.timing}</p>
          </motion.div>
        ))}
      </div>

      {/* 저축 방법별 추천 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
          <Shield className="w-6 h-6" />
          저축 상품별 추천
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {savingMethods.map((method, index) => (
            <motion.div
              key={method.method}
              className="glass rounded-xl p-5 bg-slate-800/30"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-bold text-white">{method.method}</h4>
                <span className={`text-lg font-bold text-${method.color}-400`}>{method.score}점</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-3">
                <motion.div
                  className={`h-full bg-gradient-to-r from-${method.color}-500 to-${method.color}-600`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${method.score}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                />
              </div>
              <p className="text-slate-400 text-sm mb-2">적합도: {method.suitability}</p>
              <p className="text-green-400 text-xs mb-2">✅ {method.pros}</p>
              <p className="text-cyan-400 text-xs">💰 목표: {method.target}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 월별 절약 전략 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
          <Calendar className="w-6 h-6" />
          2026년 월별 절약 전략
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {monthlyTips.map((tip, index) => (
            <motion.div
              key={tip.month}
              className="p-4 bg-slate-800/50 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <p className="text-slate-400 text-sm">{tip.month}</p>
              <p className="text-lg font-bold text-purple-400 my-2">{tip.tip}</p>
              <p className="text-slate-300 text-sm mb-1">{tip.action}</p>
              <p className="text-green-400 text-xs">💰 {tip.saving}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 카테고리별 절약 팁 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
          <Sparkles className="w-6 h-6" />
          카테고리별 절약 꿀팁
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {thriftTips.map((category, index) => (
            <motion.div
              key={category.category}
              className="glass rounded-xl p-5 bg-slate-800/30"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{category.icon}</span>
                <h4 className="font-bold text-white">{category.category}</h4>
              </div>
              <ul className="space-y-1 mb-3">
                {category.tips.map((tip, idx) => (
                  <li key={idx} className="text-slate-300 text-xs flex items-start gap-1">
                    <span className="text-amber-400 flex-shrink-0">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="text-green-400 text-sm font-bold">💰 {category.saving}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
          <p className="text-amber-400 font-bold mb-2">💡 총 절약 가능 금액</p>
          <p className="text-white text-lg">월 55~95만원 / 연 660~1,140만원</p>
          <p className="text-slate-400 text-sm mt-1">모든 항목 실천 시 최대 금액</p>
        </div>
      </div>

      {/* 목돈 마련 로드맵 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
          <Target className="w-6 h-6" />
          목돈 마련 로드맵
        </h3>
        <div className="space-y-3">
          {lumpSumRoadmap.map((step, index) => (
            <motion.div
              key={step.target}
              className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">{index + 1}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-white">{step.target}</h4>
                  <span className="text-slate-400 text-sm">{step.period}</span>
                </div>
                <p className="text-green-400 text-sm mb-1">{step.method}</p>
                <p className="text-slate-500 text-xs">🎯 {step.purpose}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 저축 챌린지 */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
          <Award className="w-6 h-6" />
          2026년 저축 챌린지
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {savingChallenges.map((challenge, index) => (
            <motion.div
              key={challenge.name}
              className="p-4 bg-slate-800/30 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-white">{challenge.name}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  challenge.difficulty === '하' ? 'bg-green-500/20 text-green-400' :
                  challenge.difficulty === '중' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  난이도: {challenge.difficulty}
                </span>
              </div>
              <p className="text-slate-300 text-sm mb-2">{challenge.method}</p>
              <p className="text-blue-400 text-sm font-bold">🎁 {challenge.result}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
          <p className="text-blue-400 font-bold mb-2">💪 저축 성공 비법</p>
          <ul className="text-slate-300 text-sm space-y-1">
            <li>• 월급날 자동이체로 저축을 먼저 하세요</li>
            <li>• 목표를 구체적으로 설정하세요 (언제까지, 얼마를)</li>
            <li>• 가계부로 지출을 시각화하세요</li>
            <li>• 작은 성공을 축하하고 동기부여를 유지하세요</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
