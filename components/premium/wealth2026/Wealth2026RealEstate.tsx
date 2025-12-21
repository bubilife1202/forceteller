'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Home, Building2, Key, TrendingUp, MapPin, Compass, Calendar, DollarSign } from 'lucide-react';

interface Wealth2026RealEstateProps {
  result: SajuResult;
  name: string;
  baseScore: number;
}

export default function Wealth2026RealEstate({ result, name, baseScore }: Wealth2026RealEstateProps) {
  const dayElement = result.day.stem.element;
  const { 재성, 관성, 식상, 비겁, 인성 } = result.tenGodsCount;

  // 매매 타이밍 점수
  const getBuyScore = () => {
    let score = baseScore;
    if (dayElement === '토') score += 25; // 토는 부동산 최적
    if (dayElement === '금') score += 15; // 금은 재물운
    if (dayElement === '화') score += 10; // 화생토
    if (dayElement === '수') score -= 10; // 토극수
    if (재성 >= 2) score += 20; // 재물운 좋음
    if (관성 >= 2) score += 10; // 안정 추구
    return Math.min(Math.max(score, 25), 100);
  };

  // 전세 운 점수
  const getJeonseScore = () => {
    let score = baseScore + 5;
    if (dayElement === '토') score += 20;
    if (dayElement === '금') score += 15;
    if (dayElement === '목') score += 10;
    if (재성 >= 2) score += 15;
    if (관성 >= 2) score += 10;
    return Math.min(Math.max(score, 30), 100);
  };

  // 월세 운 점수
  const getMonthlyScore = () => {
    let score = baseScore;
    if (dayElement === '수') score += 15; // 수는 유동성
    if (dayElement === '목') score += 10;
    if (dayElement === '화') score += 5;
    if (식상 >= 2) score += 10; // 소득 창출
    if (재성 >= 1) score += 10;
    return Math.min(Math.max(score, 25), 100);
  };

  // 투자 수익성 점수
  const getInvestmentScore = () => {
    let score = baseScore - 5;
    if (dayElement === '토') score += 30; // 토는 부동산 투자 최적
    if (dayElement === '금') score += 20;
    if (dayElement === '화') score += 10;
    if (재성 >= 3) score += 25; // 재성 강하면 투자 수익
    if (식상 >= 2) score += 10;
    return Math.min(Math.max(score, 20), 100);
  };

  const realEstateTypes = [
    {
      icon: Home,
      name: '매매 (구입)',
      score: getBuyScore(),
      color: 'from-blue-500 to-indigo-600',
      textColor: 'text-blue-400',
      advice: getBuyScore() >= 70
        ? '실거주 목적 매수에 매우 좋은 시기입니다.'
        : getBuyScore() >= 50
        ? '신중한 검토 후 매수 가능합니다.'
        : '급하지 않다면 시기를 더 기다리세요.',
      timing: getBuyScore() >= 60 ? '상반기 매수 적기' : '하반기 관망',
    },
    {
      icon: Key,
      name: '전세',
      score: getJeonseScore(),
      color: 'from-green-500 to-emerald-600',
      textColor: 'text-green-400',
      advice: getJeonseScore() >= 70
        ? '전세 계약에 유리한 해입니다.'
        : getJeonseScore() >= 50
        ? '안정적인 전세 거주가 가능합니다.'
        : '월세나 매매를 고려하세요.',
      timing: getJeonseScore() >= 60 ? '연초 계약 권장' : '2-3월 성수기 피하기',
    },
    {
      icon: Building2,
      name: '월세',
      score: getMonthlyScore(),
      color: 'from-purple-500 to-violet-600',
      textColor: 'text-purple-400',
      advice: getMonthlyScore() >= 70
        ? '월세로 유동성을 확보하는 것이 좋습니다.'
        : getMonthlyScore() >= 50
        ? '부담 없는 월세 거주 가능합니다.'
        : '전세나 매매를 우선 고려하세요.',
      timing: '수시 협상 가능',
    },
    {
      icon: TrendingUp,
      name: '투자 목적',
      score: getInvestmentScore(),
      color: 'from-amber-500 to-orange-600',
      textColor: 'text-amber-400',
      advice: getInvestmentScore() >= 70
        ? '부동산 투자로 수익 창출 가능한 해입니다.'
        : getInvestmentScore() >= 50
        ? '소액 부동산 투자(리츠 등) 고려하세요.'
        : '투자는 신중하게, 실거주 우선하세요.',
      timing: getInvestmentScore() >= 60 ? '2-3분기 매수' : '관망 권장',
    },
  ];

  // 종합 부동산 전략
  const getRealEstateStrategy = () => {
    const avgScore = (getBuyScore() + getJeonseScore() + getInvestmentScore()) / 3;

    if (avgScore >= 70) {
      return {
        type: '적극 매수형',
        emoji: '🏡',
        strategy: '부동산 거래에 매우 유리한 해입니다. 실거주나 투자 모두 검토하세요.',
        action: ['실거주 목적 매수 적극 검토', '투자 목적 2순위 고려', '좋은 입지 확보'],
      };
    }
    if (avgScore >= 50) {
      return {
        type: '신중 거래형',
        emoji: '🔍',
        strategy: '조건이 맞으면 거래 가능합니다. 충분한 검토가 필요합니다.',
        action: ['실거주 필요성 우선 판단', '예산 범위 내 검토', '전문가 자문 활용'],
      };
    }
    return {
      type: '관망 대기형',
      emoji: '⏳',
      strategy: '급하지 않다면 현 상태 유지를 권장합니다.',
      action: ['현재 거주지 유지', '시장 동향 관찰', '자금 준비 기간'],
    };
  };

  const strategy = getRealEstateStrategy();

  // 방향별 길흉
  const directionLuck = [
    {
      direction: '동쪽',
      element: '목',
      score: dayElement === '목' ? 90 : dayElement === '수' ? 85 : dayElement === '화' ? 75 : dayElement === '토' ? 40 : 50,
      color: 'green',
      advice: '목 기운으로 성장과 발전',
    },
    {
      direction: '서쪽',
      element: '금',
      score: dayElement === '금' ? 90 : dayElement === '토' ? 85 : dayElement === '수' ? 75 : dayElement === '목' ? 40 : 50,
      color: 'amber',
      advice: '금 기운으로 재물과 안정',
    },
    {
      direction: '남쪽',
      element: '화',
      score: dayElement === '화' ? 90 : dayElement === '목' ? 85 : dayElement === '토' ? 75 : dayElement === '수' ? 40 : 50,
      color: 'red',
      advice: '화 기운으로 명예와 활력',
    },
    {
      direction: '북쪽',
      element: '수',
      score: dayElement === '수' ? 90 : dayElement === '금' ? 85 : dayElement === '목' ? 75 : dayElement === '토' ? 40 : 50,
      color: 'blue',
      advice: '수 기운으로 지혜와 유동성',
    },
  ];

  // 월별 부동산 타이밍
  const monthlyTiming = [
    { quarter: '1분기', period: '1-3월', action: '시장 조사', priority: '정보 수집', color: 'blue' },
    { quarter: '2분기', period: '4-6월', action: '적극 매물 탐색', priority: '계약 적기', color: 'green' },
    { quarter: '3분기', period: '7-9월', action: '협상 및 계약', priority: '거래 실행', color: 'purple' },
    { quarter: '4분기', period: '10-12월', action: '정리 및 이사', priority: '마무리', color: 'amber' },
  ];

  // 부동산 유형별 조언
  const propertyTypeAdvice = [
    {
      type: '아파트',
      suitability: dayElement === '토' || dayElement === '금' ? '매우 적합' : dayElement === '화' ? '적합' : '보통',
      pros: '유동성 좋음, 관리 편리, 가격 투명',
      cons: '프리미엄 높음, 경쟁 치열',
      score: dayElement === '토' ? 90 : dayElement === '금' ? 85 : dayElement === '화' ? 75 : 65,
    },
    {
      type: '빌라/연립',
      suitability: dayElement === '목' || dayElement === '화' ? '적합' : '보통',
      pros: '가격 부담 적음, 다양한 선택지',
      cons: '유동성 다소 낮음, 관리 체크 필요',
      score: dayElement === '목' ? 80 : dayElement === '화' ? 75 : dayElement === '토' ? 70 : 60,
    },
    {
      type: '오피스텔',
      suitability: dayElement === '수' || 식상 >= 2 ? '적합' : '보통',
      pros: '투자/실거주 겸용, 관리 편리',
      cons: '규제 변동 주의, 임대 수요 체크',
      score: dayElement === '수' ? 75 : 식상 >= 2 ? 70 : 60,
    },
    {
      type: '단독/다가구',
      suitability: dayElement === '토' && 재성 >= 2 ? '적합' : '신중',
      pros: '넓은 공간, 프라이버시',
      cons: '관리 부담, 유동성 낮음',
      score: dayElement === '토' && 재성 >= 2 ? 80 : 50,
    },
  ];

  // 거래 시 체크리스트
  const checkList = [
    { category: '입지', items: ['교통편 접근성', '생활 인프라', '개발 계획', '학군'] },
    { category: '시세', items: ['주변 시세 비교', '호가 vs 실거래가', '전세가율', '매매가 추이'] },
    { category: '물건', items: ['일조권/조망권', '층간 소음', '수리 필요 부분', '리모델링 이력'] },
    { category: '법률', items: ['등기부등본', '건축물대장', '토지이용계획', '재건축/재개발'] },
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
        🏠 부동산운 상세 분석
      </h2>
      <p className="text-center text-slate-400 mb-8">
        2026년 {name}님의 부동산 매매/임대 길흉
      </p>

      {/* 부동산 전략 프로필 */}
      <div className="glass rounded-2xl p-6 mb-8 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl">{strategy.emoji}</span>
          <div>
            <p className="text-slate-400">2026년 부동산 전략</p>
            <h3 className="text-2xl font-bold text-blue-400">{strategy.type}</h3>
          </div>
        </div>
        <p className="text-slate-300 mb-4">{strategy.strategy}</p>

        {/* 행동 지침 */}
        <div className="mt-4">
          <p className="text-sm text-slate-400 mb-2">실천 가이드</p>
          <div className="space-y-2">
            {strategy.action.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <span className="text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 거래 유형별 점수 */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {realEstateTypes.map((type, index) => (
          <motion.div
            key={type.name}
            className="glass rounded-xl p-5"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center`}>
                <type.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white">{type.name}</h4>
                <p className={`text-2xl font-bold ${type.textColor}`}>{type.score}점</p>
              </div>
            </div>

            {/* 점수 게이지 */}
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-3">
              <motion.div
                className={`h-full bg-gradient-to-r ${type.color}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${type.score}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </div>

            <p className="text-slate-300 text-sm mb-2">{type.advice}</p>
            <p className="text-slate-500 text-xs">⏰ {type.timing}</p>
          </motion.div>
        ))}
      </div>

      {/* 방향별 길흉 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
          <Compass className="w-6 h-6" />
          거주지 방향별 길흉
        </h3>
        <div className="grid md:grid-cols-4 gap-4">
          {directionLuck.map((dir, index) => (
            <motion.div
              key={dir.direction}
              className="text-center p-4 bg-slate-800/50 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <p className="text-slate-400 text-sm">{dir.direction}</p>
              <p className={`text-2xl font-bold text-${dir.color}-400 my-2`}>{dir.score}점</p>
              <p className="text-slate-300 text-xs mb-1">{dir.element} 기운</p>
              <p className="text-slate-500 text-xs">{dir.advice}</p>
            </motion.div>
          ))}
        </div>
        <p className="text-slate-400 text-sm mt-4 text-center">
          💡 현재 거주지 기준 방향. 일주 오행과 조화로운 방향이 유리합니다.
        </p>
      </div>

      {/* 분기별 타이밍 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
          <Calendar className="w-6 h-6" />
          2026년 분기별 부동산 타이밍
        </h3>
        <div className="grid md:grid-cols-4 gap-4">
          {monthlyTiming.map((timing, index) => (
            <motion.div
              key={timing.quarter}
              className="p-4 bg-slate-800/50 rounded-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <p className="text-slate-400 text-sm">{timing.quarter}</p>
              <p className={`text-lg font-bold text-${timing.color}-400 my-2`}>{timing.action}</p>
              <p className="text-slate-300 text-xs">{timing.period}</p>
              <p className="text-slate-500 text-xs mt-1">🎯 {timing.priority}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 부동산 유형별 조언 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
          <MapPin className="w-6 h-6" />
          부동산 유형별 적합도
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {propertyTypeAdvice.map((property, index) => (
            <motion.div
              key={property.type}
              className="glass rounded-xl p-5 bg-slate-800/30"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-bold text-white">{property.type}</h4>
                <span className={`text-2xl font-bold ${
                  property.score >= 80 ? 'text-green-400' :
                  property.score >= 65 ? 'text-blue-400' :
                  'text-slate-400'
                }`}>
                  {property.score}점
                </span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-3">
                <motion.div
                  className={`h-full ${
                    property.score >= 80 ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                    property.score >= 65 ? 'bg-gradient-to-r from-blue-500 to-cyan-600' :
                    'bg-gradient-to-r from-slate-500 to-slate-600'
                  }`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${property.score}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                />
              </div>
              <p className="text-slate-400 text-sm mb-2">적합도: {property.suitability}</p>
              <p className="text-green-400 text-xs mb-1">✅ {property.pros}</p>
              <p className="text-orange-400 text-xs">⚠️ {property.cons}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 거래 시 체크리스트 */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
          <DollarSign className="w-6 h-6" />
          부동산 거래 시 필수 체크리스트
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {checkList.map((check, index) => (
            <motion.div
              key={check.category}
              className="p-4 bg-slate-800/30 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="font-bold text-amber-400 mb-2">{check.category}</h4>
              <ul className="space-y-1">
                {check.items.map((item, idx) => (
                  <li key={idx} className="text-slate-300 text-sm flex items-center gap-2">
                    <span className="text-amber-400">▪</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
          <p className="text-red-400 font-bold mb-2">⚠️ 주의사항</p>
          <ul className="text-slate-300 text-sm space-y-1">
            <li>• 급하게 결정하지 말고 최소 3곳 이상 비교하세요</li>
            <li>• 계약 전 반드시 등기부등본과 건축물대장을 확인하세요</li>
            <li>• 중개수수료, 취득세 등 부대비용도 미리 계산하세요</li>
            <li>• 대출 한도와 금리를 사전에 확인하세요</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
