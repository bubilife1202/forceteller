'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { TrendingUp, TrendingDown, AlertTriangle, Target, BarChart3, Shield, Zap, Clock } from 'lucide-react';

interface Wealth2026StockProps {
  result: SajuResult;
  name: string;
  baseScore: number;
}

export default function Wealth2026Stock({ result, name, baseScore }: Wealth2026StockProps) {
  const dayElement = result.day.stem.element;
  const { 재성, 식상, 관성, 비겁 } = result.tenGodsCount;

  // 투자 성향 분석
  const getInvestorType = () => {
    if (재성 >= 3) {
      return {
        type: '공격형 투자자',
        emoji: '🦁',
        description: '높은 수익을 추구하며 리스크도 감수합니다. 성장주와 단기 트레이딩에 적합합니다.',
        stockRatio: 70,
        bondRatio: 20,
        cashRatio: 10,
        preferredStyle: '성장주 중심 투자'
      };
    }
    if (재성 >= 2 && 식상 >= 1) {
      return {
        type: '적극형 투자자',
        emoji: '🐺',
        description: '수익을 위해 적극적으로 움직이지만, 분석을 바탕으로 투자합니다.',
        stockRatio: 60,
        bondRatio: 25,
        cashRatio: 15,
        preferredStyle: '가치+성장 혼합'
      };
    }
    if (관성 >= 2 || 비겁 >= 2) {
      return {
        type: '안정형 투자자',
        emoji: '🐢',
        description: '안정적인 수익을 선호합니다. 배당주와 ETF가 적합합니다.',
        stockRatio: 40,
        bondRatio: 40,
        cashRatio: 20,
        preferredStyle: '배당주 중심 투자'
      };
    }
    return {
      type: '균형형 투자자',
      emoji: '🦊',
      description: '리스크와 수익의 균형을 추구합니다. 분산 투자가 적합합니다.',
      stockRatio: 50,
      bondRatio: 35,
      cashRatio: 15,
      preferredStyle: '균형 포트폴리오'
    };
  };

  const investorType = getInvestorType();

  // 2026년 투자 전망
  const get2026Outlook = () => {
    let score = baseScore;

    // 병오년(화 기운 강함)과 일간의 관계
    if (dayElement === '토') score += 15; // 화생토 - 최고
    if (dayElement === '목') score += 5; // 목생화
    if (dayElement === '금') score -= 10; // 화극금

    const outlook = score >= 75 ? '매우 좋음' : score >= 60 ? '좋음' : score >= 45 ? '보통' : '주의 필요';

    return {
      score: Math.min(Math.max(score, 30), 100),
      outlook,
      mainAdvice: score >= 70 ?
        '2026년은 투자에 유리한 해입니다. 적극적으로 기회를 잡으세요.' :
        score >= 50 ?
        '신중하게 접근하되, 좋은 기회는 놓치지 마세요.' :
        '보수적으로 접근하세요. 원금 보존을 우선으로 합니다.'
    };
  };

  const outlook = get2026Outlook();

  // 월별 투자 전략
  const getMonthlyStrategy = () => {
    return [
      { month: '1-2월', action: '관망', strategy: '시장 동향 파악, 포트폴리오 점검', risk: '낮음' },
      { month: '3-4월', action: 재성 >= 2 ? '매수' : '소량 매수', strategy: '실적 시즌 앞두고 우량주 분할 매수', risk: '중간' },
      { month: '5-6월', action: '리밸런싱', strategy: '상반기 실적 확인 후 비중 조정', risk: '중간' },
      { month: '7-8월', action: dayElement === '화' ? '적극 매수' : '관망', strategy: '여름 조정장 대비, 현금 확보', risk: '높음' },
      { month: '9-10월', action: '매수 기회', strategy: '9월 효과 활용, 배당주 매집', risk: '중간' },
      { month: '11-12월', action: '수익 실현', strategy: '연말 리밸런싱, 세금 관리', risk: '낮음' }
    ];
  };

  const monthlyStrategy = getMonthlyStrategy();

  // 추천 투자 섹터
  const getRecommendedSectors = () => {
    const sectors = [];

    // 병오년 화 기운 관련
    sectors.push({
      name: '에너지/유틸리티',
      reason: '2026년 화(火) 기운이 강해 에너지 섹터 호조 예상',
      tickers: ['한국전력', '한국가스공사', 'SK이노베이션'],
      risk: '중간',
      potential: '15-25%'
    });

    // 일간별 추천
    if (dayElement === '토') {
      sectors.push({
        name: '건설/부동산',
        reason: '화생토(火生土)로 부동산 관련 종목에 유리',
        tickers: ['삼성물산', '현대건설', 'SK에코플랜트'],
        risk: '중간',
        potential: '10-20%'
      });
    }

    if (dayElement === '금' || dayElement === '목') {
      sectors.push({
        name: '방어주/필수소비재',
        reason: '안정적인 수익이 필요한 시기',
        tickers: ['CJ제일제당', 'LG생활건강', '오리온'],
        risk: '낮음',
        potential: '8-15%'
      });
    }

    // 공통 추천
    sectors.push({
      name: 'IT/반도체',
      reason: '기술주는 장기적으로 성장 잠재력 높음',
      tickers: ['삼성전자', 'SK하이닉스', 'NAVER'],
      risk: '중높음',
      potential: '20-40%'
    });

    sectors.push({
      name: 'ETF',
      reason: '분산 투자로 리스크 관리',
      tickers: ['KODEX 200', 'TIGER 미국S&P500', 'KODEX 배당성장'],
      risk: '중간',
      potential: '10-15%'
    });

    return sectors;
  };

  const sectors = getRecommendedSectors();

  // 피해야 할 투자
  const getAvoidList = () => {
    const avoid = [];

    if (비겁 >= 2) {
      avoid.push({
        item: '지인 추천 종목',
        reason: '감정에 휩쓸려 판단력이 흐려질 수 있습니다',
        alternative: '객관적인 분석 후 투자하세요'
      });
    }

    if (dayElement === '금') {
      avoid.push({
        item: '테마주/급등주',
        reason: '화극금의 해, 급격한 변동에 취약합니다',
        alternative: '우량 배당주 위주로 투자하세요'
      });
    }

    avoid.push({
      item: '레버리지/인버스 ETF',
      reason: '장기 보유시 손실 위험 높음',
      alternative: '일반 ETF로 장기 투자하세요'
    });

    avoid.push({
      item: '무리한 신용거래',
      reason: '손실 시 감당 불가',
      alternative: '현금 투자만 하세요'
    });

    return avoid;
  };

  const avoidList = getAvoidList();

  // 투자 원칙
  const getInvestmentRules = () => {
    return [
      {
        rule: '분할 매수 원칙',
        detail: '한 번에 전액 투자하지 말고, 3-5회에 나눠 매수하세요. 평균 매입가를 낮출 수 있습니다.',
        importance: 'critical'
      },
      {
        rule: '손절매 라인 설정',
        detail: `${name}님은 -${baseScore >= 70 ? '15' : '10'}%에서 손절을 권장합니다. 감정적 판단을 막습니다.`,
        importance: 'critical'
      },
      {
        rule: '목표 수익률 설정',
        detail: `${재성 >= 2 ? '+25-30%' : '+15-20%'}에서 일부 익절을 고려하세요. 욕심은 금물입니다.`,
        importance: 'high'
      },
      {
        rule: '정기 리밸런싱',
        detail: '분기에 한 번 포트폴리오를 점검하고, 목표 비중에서 벗어나면 조정하세요.',
        importance: 'high'
      },
      {
        rule: '비상금 분리',
        detail: '투자금과 생활비/비상금은 반드시 분리하세요. 투자금은 없어도 되는 돈으로만.',
        importance: 'critical'
      },
      {
        rule: '감정 통제',
        detail: '공포에 팔고, 탐욕에 사지 마세요. 계획에 따라 기계적으로 투자하세요.',
        importance: 'high'
      }
    ];
  };

  const rules = getInvestmentRules();

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
        📈 2026년 주식/펀드 투자 가이드
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님을 위한 맞춤형 투자 전략
      </p>

      {/* 투자자 유형 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-3xl">
            {investorType.emoji}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-green-400">{investorType.type}</h3>
            <p className="text-slate-400">{investorType.description}</p>
          </div>
        </div>

        {/* 추천 포트폴리오 비중 */}
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-slate-300 mb-3">추천 자산 배분</h4>
          <div className="flex gap-2 h-8 rounded-full overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center"
              initial={{ width: 0 }}
              whileInView={{ width: `${investorType.stockRatio}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <span className="text-xs font-bold text-white">주식 {investorType.stockRatio}%</span>
            </motion.div>
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center"
              initial={{ width: 0 }}
              whileInView={{ width: `${investorType.bondRatio}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="text-xs font-bold text-white">채권 {investorType.bondRatio}%</span>
            </motion.div>
            <motion.div
              className="bg-gradient-to-r from-slate-500 to-slate-600 flex items-center justify-center"
              initial={{ width: 0 }}
              whileInView={{ width: `${investorType.cashRatio}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <span className="text-xs font-bold text-white">현금 {investorType.cashRatio}%</span>
            </motion.div>
          </div>
          <p className="text-slate-500 text-sm mt-2">추천 스타일: {investorType.preferredStyle}</p>
        </div>
      </div>

      {/* 2026년 투자 전망 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <BarChart3 className="w-6 h-6 text-amber-400" />
          <h3 className="text-xl font-bold text-amber-400">2026년 투자 전망</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div className="text-center p-4 glass rounded-xl">
            <p className="text-slate-400 text-sm">투자 운세</p>
            <p className="text-2xl font-bold text-amber-400">{outlook.outlook}</p>
          </div>
          <div className="text-center p-4 glass rounded-xl">
            <p className="text-slate-400 text-sm">투자 점수</p>
            <p className="text-2xl font-bold text-green-400">{outlook.score}점</p>
          </div>
          <div className="text-center p-4 glass rounded-xl">
            <p className="text-slate-400 text-sm">일간-년운</p>
            <p className="text-2xl font-bold text-purple-400">{dayElement}-화(丙午)</p>
          </div>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
          <p className="text-amber-300">📊 {outlook.mainAdvice}</p>
        </div>
      </div>

      {/* 월별 투자 전략 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-6 h-6 text-cyan-400" />
          <h3 className="text-xl font-bold text-cyan-400">월별 투자 전략</h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {monthlyStrategy.map((item, idx) => (
            <motion.div
              key={idx}
              className="glass rounded-xl p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-white">{item.month}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  item.action.includes('매수') ? 'bg-green-500/20 text-green-400' :
                  item.action.includes('매도') || item.action.includes('실현') ? 'bg-red-500/20 text-red-400' :
                  'bg-slate-500/20 text-slate-400'
                }`}>
                  {item.action}
                </span>
              </div>
              <p className="text-slate-400 text-sm mb-2">{item.strategy}</p>
              <div className="flex items-center gap-1">
                <span className="text-xs text-slate-500">리스크:</span>
                <span className={`text-xs ${
                  item.risk === '높음' ? 'text-red-400' :
                  item.risk === '중간' ? 'text-yellow-400' : 'text-green-400'
                }`}>{item.risk}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 추천 섹터 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-green-400" />
          <h3 className="text-xl font-bold text-green-400">추천 투자 섹터</h3>
        </div>
        <div className="space-y-4">
          {sectors.map((sector, idx) => (
            <motion.div
              key={idx}
              className="glass rounded-xl p-5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-bold text-white text-lg">{sector.name}</h4>
                  <p className="text-slate-400 text-sm">{sector.reason}</p>
                </div>
                <div className="text-right">
                  <span className="text-green-400 font-bold">{sector.potential}</span>
                  <p className="text-xs text-slate-500">예상 수익률</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {sector.tickers.map((ticker, tIdx) => (
                  <span key={tIdx} className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-slate-300">
                    {ticker}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded ${
                  sector.risk === '낮음' ? 'bg-green-500/20 text-green-400' :
                  sector.risk === '중간' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  리스크 {sector.risk}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 피해야 할 투자 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <TrendingDown className="w-6 h-6 text-red-400" />
          <h3 className="text-xl font-bold text-red-400">피해야 할 투자</h3>
        </div>
        <div className="space-y-3">
          {avoidList.map((item, idx) => (
            <div key={idx} className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-red-400">{item.item}</h4>
                  <p className="text-slate-400 text-sm mb-1">{item.reason}</p>
                  <p className="text-green-400 text-sm">→ {item.alternative}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 투자 원칙 */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-bold text-purple-400">{name}님의 투자 원칙</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {rules.map((rule, idx) => (
            <motion.div
              key={idx}
              className={`rounded-xl p-4 ${
                rule.importance === 'critical' ? 'bg-red-500/10 border border-red-500/30' :
                'glass'
              }`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <div className="flex items-center gap-2 mb-2">
                {rule.importance === 'critical' ? (
                  <Zap className="w-4 h-4 text-red-400" />
                ) : (
                  <Target className="w-4 h-4 text-purple-400" />
                )}
                <h4 className={`font-semibold ${
                  rule.importance === 'critical' ? 'text-red-400' : 'text-purple-400'
                }`}>{rule.rule}</h4>
              </div>
              <p className="text-slate-400 text-sm">{rule.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
