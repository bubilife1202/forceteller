'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Building2, TrendingUp, Bitcoin, PiggyBank, Gem, BarChart3 } from 'lucide-react';

interface Wealth2026InvestmentProps {
  result: SajuResult;
  name: string;
  baseScore: number;
}

export default function Wealth2026Investment({ result, name, baseScore }: Wealth2026InvestmentProps) {
  const dayElement = result.day.stem.element;
  const { 재성, 관성, 식상 } = result.tenGodsCount;

  // 주식 적합도
  const getStockScore = () => {
    let score = baseScore;
    if (dayElement === '수') score += 15; // 유동성, 분석력
    if (dayElement === '화') score += 10; // 추진력
    if (dayElement === '금') score -= 15; // 화극금
    if (식상 >= 2) score += 10; // 트렌드 감각
    if (재성 >= 2) score += 5;
    return Math.min(Math.max(score, 20), 100);
  };

  // 부동산 적합도
  const getRealEstateScore = () => {
    let score = baseScore;
    if (dayElement === '토') score += 25; // 부동산 최적
    if (dayElement === '화') score += 10; // 화생토
    if (dayElement === '금') score -= 10;
    if (관성 >= 2) score += 10; // 안정 추구
    if (재성 >= 2) score += 5;
    return Math.min(Math.max(score, 20), 100);
  };

  // 코인/암호화폐 적합도
  const getCryptoScore = () => {
    let score = baseScore - 10; // 기본적으로 위험
    if (dayElement === '수') score += 20; // 변동성 대응
    if (dayElement === '화') score += 5;
    if (dayElement === '금') score -= 20; // 화극금 + 변동성
    if (dayElement === '토') score -= 10; // 안정 선호
    if (식상 >= 2) score += 15; // 트렌드
    return Math.min(Math.max(score, 10), 100);
  };

  // 저축 적합도
  const getSavingsScore = () => {
    let score = baseScore + 10;
    if (dayElement === '토') score += 15;
    if (dayElement === '금') score += 20; // 화극금이라 저축 권장
    if (관성 >= 2) score += 10;
    if (dayElement === '화') score -= 5; // 저축보다 투자 성향
    return Math.min(Math.max(score, 30), 100);
  };

  // 금/귀금속 적합도
  const getGoldScore = () => {
    let score = baseScore;
    if (dayElement === '금') score += 10;
    if (dayElement === '토') score += 15; // 토생금
    if (dayElement === '화') score -= 5;
    if (관성 >= 2) score += 10;
    return Math.min(Math.max(score, 30), 100);
  };

  const investments = [
    {
      icon: TrendingUp,
      name: '주식',
      score: getStockScore(),
      color: 'from-blue-500 to-indigo-600',
      textColor: 'text-blue-400',
      advice: getStockScore() >= 70
        ? '적극적인 투자 가능. 성장주에 주목하세요.'
        : getStockScore() >= 50
        ? '분산 투자로 리스크 관리하세요.'
        : '주식보다 안정적인 투자를 권장합니다.',
      timing: getStockScore() >= 60 ? '상반기 매수 유리' : '하반기 관망 권장',
    },
    {
      icon: Building2,
      name: '부동산',
      score: getRealEstateScore(),
      color: 'from-emerald-500 to-green-600',
      textColor: 'text-emerald-400',
      advice: getRealEstateScore() >= 70
        ? '부동산 투자 최적기! 실거주 매수 고려하세요.'
        : getRealEstateScore() >= 50
        ? '소액 부동산 투자(리츠 등)를 고려하세요.'
        : '부동산보다 유동성 자산을 권장합니다.',
      timing: getRealEstateScore() >= 60 ? '2분기 매수 유리' : '임대 수익 중심으로',
    },
    {
      icon: Bitcoin,
      name: '암호화폐',
      score: getCryptoScore(),
      color: 'from-orange-500 to-amber-600',
      textColor: 'text-orange-400',
      advice: getCryptoScore() >= 70
        ? '소액으로 도전해볼 만합니다.'
        : getCryptoScore() >= 50
        ? '전체 자산의 5% 이내로만 투자하세요.'
        : '암호화폐 투자는 피하는 것이 좋습니다.',
      timing: getCryptoScore() >= 50 ? '하락장 매수 전략' : '관망 권장',
    },
    {
      icon: PiggyBank,
      name: '저축/예금',
      score: getSavingsScore(),
      color: 'from-pink-500 to-rose-600',
      textColor: 'text-pink-400',
      advice: getSavingsScore() >= 70
        ? '적금과 예금으로 안전하게 자산을 늘리세요.'
        : getSavingsScore() >= 50
        ? '비상금 6개월치 확보 후 투자하세요.'
        : '저축과 투자를 적절히 병행하세요.',
      timing: '매월 꾸준히',
    },
    {
      icon: Gem,
      name: '금/귀금속',
      score: getGoldScore(),
      color: 'from-yellow-500 to-amber-600',
      textColor: 'text-yellow-400',
      advice: getGoldScore() >= 70
        ? '금 투자가 좋은 해입니다. 안전자산으로 활용하세요.'
        : getGoldScore() >= 50
        ? '포트폴리오의 10% 정도 금으로 헷지하세요.'
        : '금보다 다른 투자를 우선 고려하세요.',
      timing: getGoldScore() >= 60 ? '분할 매수 추천' : '소량만 보유',
    },
  ];

  // 종합 투자 성향
  const getInvestmentProfile = () => {
    const avgScore = (getStockScore() + getRealEstateScore() + getCryptoScore()) / 3;

    if (avgScore >= 70) {
      return {
        type: '공격적 투자자',
        emoji: '🚀',
        allocation: { 주식: 50, 부동산: 30, 저축: 15, 기타: 5 },
        advice: '적극적인 투자로 자산을 불릴 수 있는 해입니다.',
      };
    }
    if (avgScore >= 50) {
      return {
        type: '균형적 투자자',
        emoji: '⚖️',
        allocation: { 주식: 30, 부동산: 25, 저축: 35, 기타: 10 },
        advice: '안정과 성장의 균형을 맞추세요.',
      };
    }
    return {
      type: '보수적 투자자',
      emoji: '🛡️',
      allocation: { 저축: 50, 부동산: 25, 주식: 15, 기타: 10 },
      advice: '안전자산 중심으로 운용하세요.',
    };
  };

  const profile = getInvestmentProfile();

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
        📈 투자운 상세 분석
      </h2>
      <p className="text-center text-slate-400 mb-8">
        2026년 {name}님의 투자 분야별 적합도
      </p>

      {/* 투자 성향 프로필 */}
      <div className="glass rounded-2xl p-6 mb-8 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/30">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl">{profile.emoji}</span>
          <div>
            <p className="text-slate-400">2026년 투자 성향</p>
            <h3 className="text-2xl font-bold text-purple-400">{profile.type}</h3>
          </div>
        </div>
        <p className="text-slate-300 mb-4">{profile.advice}</p>

        {/* 권장 자산 배분 */}
        <div className="mt-4">
          <p className="text-sm text-slate-400 mb-2">권장 자산 배분</p>
          <div className="flex h-4 rounded-full overflow-hidden">
            {Object.entries(profile.allocation).map(([asset, percent], index) => {
              const colors = ['bg-blue-500', 'bg-emerald-500', 'bg-pink-500', 'bg-orange-500'];
              return (
                <motion.div
                  key={asset}
                  className={colors[index % colors.length]}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${percent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                />
              );
            })}
          </div>
          <div className="flex flex-wrap gap-3 mt-2">
            {Object.entries(profile.allocation).map(([asset, percent], index) => {
              const colors = ['text-blue-400', 'text-emerald-400', 'text-pink-400', 'text-orange-400'];
              return (
                <span key={asset} className={`text-sm ${colors[index % colors.length]}`}>
                  {asset} {percent}%
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* 투자 분야별 점수 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {investments.map((inv, index) => (
          <motion.div
            key={inv.name}
            className="glass rounded-xl p-5"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${inv.color} flex items-center justify-center`}>
                <inv.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white">{inv.name}</h4>
                <p className={`text-2xl font-bold ${inv.textColor}`}>{inv.score}점</p>
              </div>
            </div>

            {/* 점수 게이지 */}
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-3">
              <motion.div
                className={`h-full bg-gradient-to-r ${inv.color}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${inv.score}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </div>

            <p className="text-slate-300 text-sm mb-2">{inv.advice}</p>
            <p className="text-slate-500 text-xs">⏰ {inv.timing}</p>
          </motion.div>
        ))}
      </div>

      {/* 투자 타이밍 */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
          <BarChart3 className="w-6 h-6" />
          2026년 투자 타이밍
        </h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-slate-800/50 rounded-xl">
            <p className="text-slate-400 text-sm">1분기</p>
            <p className="text-lg font-bold text-blue-400">관망/준비</p>
            <p className="text-slate-500 text-xs mt-1">정보 수집 시기</p>
          </div>
          <div className="text-center p-4 bg-slate-800/50 rounded-xl">
            <p className="text-slate-400 text-sm">2분기</p>
            <p className="text-lg font-bold text-green-400">매수 적기</p>
            <p className="text-slate-500 text-xs mt-1">화 기운 상승</p>
          </div>
          <div className="text-center p-4 bg-slate-800/50 rounded-xl">
            <p className="text-slate-400 text-sm">3분기</p>
            <p className="text-lg font-bold text-yellow-400">유지/관리</p>
            <p className="text-slate-500 text-xs mt-1">포트폴리오 점검</p>
          </div>
          <div className="text-center p-4 bg-slate-800/50 rounded-xl">
            <p className="text-slate-400 text-sm">4분기</p>
            <p className="text-lg font-bold text-purple-400">수익 실현</p>
            <p className="text-slate-500 text-xs mt-1">리밸런싱</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
