'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Building2, TrendingUp, DollarSign, AlertCircle } from 'lucide-react';

interface MovingPurchaseProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function MovingPurchase({ result, name }: MovingPurchaseProps) {
  const dayElement = result.day.stem.element;
  const { 재성, 관성, 식상, 인성 } = result.tenGodsCount;

  // 매매/구입 운세 점수
  const getPurchaseFortune = () => {
    let score = 50;

    // 십성 분석
    if (재성 >= 2) score += 25; // 재성은 재물, 부동산
    if (관성 >= 2) score += 15; // 관성은 안정, 계약
    if (인성 >= 2) score += 10; // 인성은 보호, 자산
    if (식상 >= 2) score += 5; // 식상은 투자 감각

    // 일간별
    if (dayElement === '토') score += 20; // 토는 부동산 최고
    if (dayElement === '금') score += 15; // 금은 재물
    if (dayElement === '목') score += 10; // 목은 성장
    if (dayElement === '수') score += 5; // 수는 유동성

    return Math.min(Math.max(score, 30), 100);
  };

  const purchaseScore = getPurchaseFortune();

  // 구입 시기 추천
  const getPurchaseTimingAdvice = () => {
    if (purchaseScore >= 80) {
      return {
        timing: '최적기',
        message: '부동산 매수에 최고의 운입니다. 적극적으로 추진하세요.',
        color: 'text-emerald-400',
        emoji: '🌟',
      };
    } else if (purchaseScore >= 65) {
      return {
        timing: '적기',
        message: '좋은 시기입니다. 신중하게 선택하면 좋은 매물을 만날 수 있습니다.',
        color: 'text-green-400',
        emoji: '✨',
      };
    } else if (purchaseScore >= 50) {
      return {
        timing: '보통',
        message: '무난한 시기입니다. 충분한 검토 후 결정하세요.',
        color: 'text-yellow-400',
        emoji: '🔆',
      };
    } else {
      return {
        timing: '신중',
        message: '서두르지 마세요. 전문가 조언을 받고 충분히 준비하세요.',
        color: 'text-orange-400',
        emoji: '⚠️',
      };
    }
  };

  const timingAdvice = getPurchaseTimingAdvice();

  // 매매 vs 전세 비교
  const getBuyVsRent = () => {
    return {
      buy: {
        name: '매매 (자가)',
        score: purchaseScore,
        pros: ['자산 형성', '전월세 고민 無', '인테리어 자유', '시세 차익 가능'],
        cons: ['큰 초기 자금', '대출 이자', '양도세/재산세', '이동 불편'],
        when: '장기 거주, 자산 형성 목표, 목돈 여유',
        color: 'from-emerald-500 to-green-600',
        emoji: '🏠',
      },
      rent: {
        name: '전세/월세',
        score: Math.min(100 - (purchaseScore - 50), 100),
        pros: ['적은 초기 비용', '이동 자유', '투자 여력', '유지비 낮음'],
        cons: ['자산 형성 無', '전월세 상승', '계약 갱신 부담', '제약 많음'],
        when: '유동성 중시, 단기 거주, 투자 계획',
        color: 'from-blue-500 to-cyan-600',
        emoji: '🏘️',
      },
    };
  };

  const buyVsRent = getBuyVsRent();

  // 매매 계약 체크리스트
  const getPurchaseChecklist = () => {
    return [
      {
        phase: '매물 탐색',
        icon: '🔍',
        color: 'from-blue-500 to-cyan-600',
        items: [
          '예산 명확히 설정',
          '입지 조건 우선순위',
          '여러 매물 비교',
          '시세 조사 (KB부동산, 네이버)',
          '재개발/재건축 여부',
        ],
      },
      {
        phase: '계약 전 확인',
        icon: '📋',
        color: 'from-purple-500 to-pink-600',
        items: [
          '등기부등본 (근저당, 가압류)',
          '건축물대장 (불법 증축)',
          '토지이용계획 확인서',
          '시설 하자 여부',
          '관리비, 재산세 확인',
        ],
      },
      {
        phase: '대출 준비',
        icon: '💰',
        color: 'from-green-500 to-emerald-600',
        items: [
          '대출 한도 사전 확인',
          '금리 비교 (은행, 보금자리론)',
          'LTV, DTI 계산',
          '상환 계획 수립',
          '대출 서류 준비',
        ],
      },
      {
        phase: '계약 및 잔금',
        icon: '✍️',
        color: 'from-orange-500 to-red-600',
        items: [
          '계약서 특약 꼼꼼히',
          '중도금, 잔금 일정',
          '잔금일 전 재확인',
          '세금 계산 (취득세)',
          '이사 일정 조율',
        ],
      },
    ];
  };

  const purchaseChecklist = getPurchaseChecklist();

  // 투자 포인트
  const getInvestmentPoints = () => {
    return [
      {
        factor: '입지 (위치)',
        importance: '최우선',
        details: '역세권, 학군, 생활편의시설, 개발 호재',
        tip: '위치는 시간이 지나도 변하지 않는 가장 중요한 요소',
      },
      {
        factor: '시세',
        importance: '매우 중요',
        details: '주변 호가 대비, 실거래가, 상승 추세',
        tip: '싸다고 무조건 좋은 것은 아님. 이유를 파악해야',
      },
      {
        factor: '향/층수',
        importance: '중요',
        details: '남향 선호, 중간층, 조망권',
        tip: '재판매 시 가격 차이가 큼',
      },
      {
        factor: '단지 규모',
        importance: '중요',
        details: '세대수 많을수록 유리, 커뮤니티 시설',
        tip: '1000세대 이상 대단지 추천',
      },
      {
        factor: '브랜드',
        importance: '보통',
        details: '시공사 브랜드, 하자 보증',
        tip: '중소형은 브랜드 중요, 대형은 덜 중요',
      },
      {
        factor: '연식',
        importance: '보통',
        details: '준공 연도, 리모델링 계획',
        tip: '15년 이하 추천, 재건축은 30년 이상',
      },
    ];
  };

  const investmentPoints = getInvestmentPoints();

  // 세금 가이드
  const getTaxGuide = () => {
    return [
      {
        tax: '취득세',
        rate: '1~12% (주택 수, 면적, 가격에 따라)',
        timing: '잔금일로부터 60일 이내',
        tip: '생애 최초 구매 시 감면 혜택',
      },
      {
        tax: '재산세',
        rate: '0.1~0.4% (과세표준액 기준)',
        timing: '매년 7월, 9월 분납',
        tip: '1세대 1주택 공제 혜택',
      },
      {
        tax: '양도소득세',
        rate: '6~45% (보유 기간, 주택 수)',
        timing: '양도일 속한 달 말일로부터 2개월',
        tip: '2년 이상 보유 + 실거주 시 비과세',
      },
    ];
  };

  const taxGuide = getTaxGuide();

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
        🏢 매매/구입 운세
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님의 부동산 매수 운세 분석
      </p>

      {/* 매매 운세 점수 */}
      <div className="glass rounded-2xl p-8 mb-8 bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/30">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="text-6xl">{timingAdvice.emoji}</span>
          <div className="text-center">
            <p className="text-slate-400 mb-1">부동산 매수운</p>
            <p className="text-5xl font-bold text-emerald-400 mb-2">{purchaseScore}점</p>
            <h3 className={`text-2xl font-bold ${timingAdvice.color}`}>{timingAdvice.timing}</h3>
          </div>
        </div>
        <p className="text-slate-300 text-center">{timingAdvice.message}</p>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-3 bg-slate-800/50 rounded-xl text-center">
            <p className="text-sm text-slate-400 mb-1">재성 (재물운)</p>
            <p className="text-xl font-bold text-emerald-400">{재성}개</p>
          </div>
          <div className="p-3 bg-slate-800/50 rounded-xl text-center">
            <p className="text-sm text-slate-400 mb-1">관성 (계약운)</p>
            <p className="text-xl font-bold text-blue-400">{관성}개</p>
          </div>
          <div className="p-3 bg-slate-800/50 rounded-xl text-center">
            <p className="text-sm text-slate-400 mb-1">일간 오행</p>
            <p className="text-xl font-bold text-purple-400">{dayElement}</p>
          </div>
        </div>
      </div>

      {/* 매매 vs 전세 비교 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-purple-400 mb-6 flex items-center gap-2">
          <Building2 className="w-6 h-6" />
          매매 vs 전세 운세 비교
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {Object.values(buyVsRent).map((option, index) => (
            <motion.div
              key={option.name}
              className="glass-strong rounded-xl p-6"
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${option.color} flex items-center justify-center text-3xl`}>
                  {option.emoji}
                </div>
                <div>
                  <h4 className="font-bold text-white text-xl">{option.name}</h4>
                  <p className="text-2xl font-bold text-emerald-400">{option.score}점</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-bold text-green-400 mb-2">장점</p>
                <ul className="space-y-1">
                  {option.pros.map((pro, idx) => (
                    <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                      <span className="text-green-400">•</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <p className="text-sm font-bold text-orange-400 mb-2">단점</p>
                <ul className="space-y-1">
                  {option.cons.map((con, idx) => (
                    <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                      <span className="text-orange-400">•</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-xs text-amber-400 italic">추천: {option.when}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 매매 계약 체크리스트 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6" />
          단계별 매매 체크리스트
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {purchaseChecklist.map((phase, index) => (
            <motion.div
              key={phase.phase}
              className="glass-strong rounded-xl p-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${phase.color} flex items-center justify-center text-2xl`}>
                  {phase.icon}
                </div>
                <h4 className="font-bold text-white">{phase.phase}</h4>
              </div>
              <ul className="space-y-2">
                {phase.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-emerald-400 text-xs mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 투자 포인트 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-amber-400 mb-6 flex items-center gap-2">
          <DollarSign className="w-6 h-6" />
          부동산 투자 핵심 포인트
        </h3>
        <div className="space-y-3">
          {investmentPoints.map((point, index) => (
            <motion.div
              key={point.factor}
              className="p-4 bg-slate-800/50 rounded-xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="grid md:grid-cols-4 gap-3 items-center">
                <div>
                  <h4 className="font-bold text-white mb-1">{point.factor}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    point.importance === '최우선' ? 'bg-red-500/20 text-red-400' :
                    point.importance === '매우 중요' ? 'bg-orange-500/20 text-orange-400' :
                    point.importance === '중요' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {point.importance}
                  </span>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-slate-300">{point.details}</p>
                </div>
                <div>
                  <p className="text-xs text-emerald-400 italic">{point.tip}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 세금 가이드 */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold text-red-400 mb-6 flex items-center gap-2">
          <AlertCircle className="w-6 h-6" />
          부동산 세금 가이드
        </h3>
        <div className="space-y-3">
          {taxGuide.map((tax, index) => (
            <motion.div
              key={tax.tax}
              className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="grid md:grid-cols-4 gap-3">
                <div>
                  <h4 className="font-bold text-white">{tax.tax}</h4>
                </div>
                <div>
                  <p className="text-sm text-red-400">{tax.rate}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-400">{tax.timing}</p>
                </div>
                <div>
                  <p className="text-xs text-emerald-400 italic">{tax.tip}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl">
          <p className="text-slate-300 text-sm leading-relaxed">
            💡 <span className="font-bold">세금 절약 팁:</span> 생애 최초 구매, 1세대 1주택, 장기 보유 시 다양한 세금 혜택이 있습니다.
            구매 전 세무사나 부동산 전문가 상담을 받으면 수백만 원을 절약할 수 있습니다.
          </p>
        </div>

        <div className="mt-4 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl">
          <p className="text-slate-300 text-sm leading-relaxed">
            🏠 <span className="font-bold">최종 조언:</span> 부동산은 인생에서 가장 큰 투자입니다.
            서두르지 말고 충분히 비교하고, 전문가 조언을 받으며, 본인의 재정 상황을 냉정하게 판단하세요.
            좋은 집보다 나에게 맞는 집이 더 중요합니다.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
