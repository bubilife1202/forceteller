'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { CreditCard, AlertCircle, TrendingDown, Shield, Calendar, DollarSign, CheckCircle2 } from 'lucide-react';

interface Wealth2026DebtProps {
  result: SajuResult;
  name: string;
  baseScore: number;
}

export default function Wealth2026Debt({ result, name, baseScore }: Wealth2026DebtProps) {
  const dayElement = result.day.stem.element;
  const { 재성, 관성, 식상, 비겁, 인성 } = result.tenGodsCount;

  // 부채 상환 능력 점수
  const getRepaymentScore = () => {
    let score = baseScore;
    if (dayElement === '금') score += 20; // 금은 의지와 결단력
    if (dayElement === '토') score += 15; // 토는 저축과 안정
    if (dayElement === '화') score -= 10; // 화는 소비 성향
    if (재성 >= 2) score += 15; // 재물운 좋으면 상환 능력 상승
    if (비겁 >= 3) score -= 10; // 비겁 많으면 지출 많음
    if (관성 >= 2) score += 10; // 관성은 책임감
    return Math.min(Math.max(score, 20), 100);
  };

  // 대출 타이밍 점수 (높을수록 대출 받기 좋은 시기)
  const getLoanTimingScore = () => {
    let score = baseScore - 5;
    if (dayElement === '수') score += 15; // 수는 유동성
    if (dayElement === '목') score += 10; // 목은 성장
    if (dayElement === '금') score -= 15; // 금은 대출 자제
    if (재성 >= 2) score += 20; // 재성 있으면 대출 상환 가능
    if (식상 >= 2) score += 5; // 식상은 수입원 확보
    return Math.min(Math.max(score, 15), 100);
  };

  // 빚 관리 점수
  const getDebtManagementScore = () => {
    let score = baseScore;
    if (dayElement === '토') score += 25; // 토는 관리 능력
    if (dayElement === '금') score += 20; // 금은 계획성
    if (dayElement === '화') score -= 15; // 화는 충동적
    if (관성 >= 2) score += 15; // 관성은 체계성
    if (인성 >= 2) score += 10; // 인성은 학습과 계획
    if (비겁 >= 3) score -= 10; // 비겁 많으면 관리 어려움
    return Math.min(Math.max(score, 25), 100);
  };

  // 신용 관리 점수
  const getCreditScore = () => {
    let score = baseScore + 5;
    if (dayElement === '금') score += 20; // 금은 신용 중시
    if (dayElement === '토') score += 15; // 토는 안정
    if (dayElement === '목') score += 10; // 목은 성실
    if (관성 >= 2) score += 15; // 관성은 책임감
    if (비겁 >= 3) score -= 15; // 비겁 많으면 신용 관리 약함
    return Math.min(Math.max(score, 30), 100);
  };

  const debtAspects = [
    {
      icon: TrendingDown,
      name: '부채 상환력',
      score: getRepaymentScore(),
      color: 'from-green-500 to-emerald-600',
      textColor: 'text-green-400',
      advice: getRepaymentScore() >= 70
        ? '상환 능력이 우수합니다. 공격적 상환 계획을 세우세요.'
        : getRepaymentScore() >= 50
        ? '꾸준한 상환이 가능합니다. 우선순위를 정하세요.'
        : '수입 증대에 먼저 집중하세요.',
      timing: getRepaymentScore() >= 60 ? '상반기 집중 상환' : '소액이라도 꾸준히',
    },
    {
      icon: DollarSign,
      name: '대출 타이밍',
      score: getLoanTimingScore(),
      color: 'from-blue-500 to-cyan-600',
      textColor: 'text-blue-400',
      advice: getLoanTimingScore() >= 70
        ? '필요시 대출 받기에 좋은 해입니다.'
        : getLoanTimingScore() >= 50
        ? '신중하게 검토 후 대출 가능합니다.'
        : '대출은 최대한 자제하세요.',
      timing: getLoanTimingScore() >= 60 ? '2분기 전후' : '긴급 시에만',
    },
    {
      icon: Shield,
      name: '빚 관리 능력',
      score: getDebtManagementScore(),
      color: 'from-purple-500 to-violet-600',
      textColor: 'text-purple-400',
      advice: getDebtManagementScore() >= 70
        ? '체계적인 부채 관리가 가능합니다.'
        : getDebtManagementScore() >= 50
        ? '관리 시스템을 구축하세요.'
        : '전문가 상담을 받는 것이 좋습니다.',
      timing: '매월 정기 점검 필수',
    },
    {
      icon: CheckCircle2,
      name: '신용 관리',
      score: getCreditScore(),
      color: 'from-amber-500 to-orange-600',
      textColor: 'text-amber-400',
      advice: getCreditScore() >= 70
        ? '신용도 관리가 탁월합니다. 유지하세요.'
        : getCreditScore() >= 50
        ? '꾸준한 관리로 신용도를 높이세요.'
        : '신용도 회복에 집중하세요.',
      timing: '연체 절대 금지',
    },
  ];

  // 종합 부채 관리 전략
  const getDebtStrategy = () => {
    const avgScore = (getRepaymentScore() + getDebtManagementScore() + getCreditScore()) / 3;

    if (avgScore >= 70) {
      return {
        type: '적극적 상환형',
        emoji: '💪',
        strategy: '빠른 부채 감축이 가능한 해입니다. 공격적으로 상환하세요.',
        priority: ['고금리 부채 우선 상환', '추가 수입으로 원금 상환', '신용점수 관리'],
      };
    }
    if (avgScore >= 50) {
      return {
        type: '균형적 관리형',
        emoji: '⚖️',
        strategy: '안정적인 상환 계획을 세우고 꾸준히 실행하세요.',
        priority: ['정기 상환 시스템 구축', '금리 낮은 대출로 전환', '비상금 확보'],
      };
    }
    return {
      type: '신중 관리형',
      emoji: '🛡️',
      strategy: '현상 유지에 집중하고 추가 부채는 피하세요.',
      priority: ['이자라도 꾸준히 납부', '추가 대출 자제', '전문가 상담'],
    };
  };

  const strategy = getDebtStrategy();

  // 월별 부채 관리 전략
  const monthlyStrategy = [
    { month: '1-3월', focus: '현황 파악', action: '모든 부채 리스트업, 금리/만기 확인', color: 'blue' },
    { month: '4-6월', focus: '계획 수립', action: '상환 우선순위 정하기, 예산 수립', color: 'green' },
    { month: '7-9월', focus: '적극 상환', action: '고금리 부채 집중 상환, 대환 검토', color: 'purple' },
    { month: '10-12월', focus: '점검 및 조정', action: '진행 상황 점검, 내년 계획', color: 'amber' },
  ];

  // 부채 유형별 조언
  const debtTypeAdvice = [
    {
      type: '신용카드',
      risk: '높음',
      icon: CreditCard,
      color: 'from-red-500 to-pink-600',
      advice: getDebtManagementScore() >= 60
        ? '일시불 위주 사용, 할부는 3개월 이내만'
        : '사용 최소화, 체크카드 전환 권장',
      limit: getDebtManagementScore() >= 60 ? '월 소득의 30% 이내' : '월 소득의 15% 이내',
    },
    {
      type: '대출',
      risk: '중간',
      icon: DollarSign,
      color: 'from-orange-500 to-amber-600',
      advice: getLoanTimingScore() >= 60
        ? '필요시 저금리 대출 활용 가능'
        : '추가 대출 자제, 기존 대출 상환 집중',
      limit: '총 대출액은 연소득의 40% 이내 권장',
    },
    {
      type: '주택담보대출',
      risk: '낮음',
      icon: Shield,
      color: 'from-blue-500 to-cyan-600',
      advice: dayElement === '토' || dayElement === '금'
        ? '계획적 상환, 여유자금 시 중도상환 고려'
        : '정기 상환 유지, 금리 변동 주시',
      limit: '주거 안정성 우선, 무리한 상환은 금물',
    },
  ];

  // 부채 상환 우선순위
  const repaymentPriority = [
    { rank: 1, type: '고금리 신용대출', reason: '이자 부담 최소화', action: '추가 수입 시 우선 상환' },
    { rank: 2, type: '카드론/현금서비스', reason: '신용점수 영향 큼', action: '즉시 상환 권장' },
    { rank: 3, type: '일반 신용카드', reason: '일상 현금 흐름 개선', action: '일시불 전환' },
    { rank: 4, type: '저금리 주택담보대출', reason: '급하지 않음', action: '정기 상환 유지' },
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
        💳 부채 관리운 상세 분석
      </h2>
      <p className="text-center text-slate-400 mb-8">
        2026년 {name}님의 빚 관리 및 상환 전략
      </p>

      {/* 부채 관리 전략 프로필 */}
      <div className="glass rounded-2xl p-6 mb-8 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl">{strategy.emoji}</span>
          <div>
            <p className="text-slate-400">2026년 부채 관리 유형</p>
            <h3 className="text-2xl font-bold text-red-400">{strategy.type}</h3>
          </div>
        </div>
        <p className="text-slate-300 mb-4">{strategy.strategy}</p>

        {/* 우선순위 */}
        <div className="mt-4">
          <p className="text-sm text-slate-400 mb-2">실천 우선순위</p>
          <div className="space-y-2">
            {strategy.priority.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <span className="text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 부채 관리 능력별 점수 */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {debtAspects.map((aspect, index) => (
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

      {/* 월별 부채 관리 전략 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
          <Calendar className="w-6 h-6" />
          2026년 월별 부채 관리 전략
        </h3>
        <div className="grid md:grid-cols-4 gap-4">
          {monthlyStrategy.map((item, index) => (
            <motion.div
              key={index}
              className="text-center p-4 bg-slate-800/50 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <p className="text-slate-400 text-sm">{item.month}</p>
              <p className={`text-lg font-bold text-${item.color}-400 my-2`}>{item.focus}</p>
              <p className="text-slate-300 text-xs">{item.action}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 부채 유형별 조언 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
          <AlertCircle className="w-6 h-6" />
          부채 유형별 관리 전략
        </h3>
        <div className="space-y-4">
          {debtTypeAdvice.map((debt, index) => (
            <motion.div
              key={debt.type}
              className="glass rounded-xl p-5 bg-slate-800/30"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${debt.color} flex items-center justify-center flex-shrink-0`}>
                  <debt.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-lg font-bold text-white">{debt.type}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      debt.risk === '높음' ? 'bg-red-500/20 text-red-400' :
                      debt.risk === '중간' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      위험도: {debt.risk}
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm mb-2">{debt.advice}</p>
                  <p className="text-slate-500 text-xs">📊 {debt.limit}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 상환 우선순위 */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
          <TrendingDown className="w-6 h-6" />
          부채 상환 우선순위
        </h3>
        <div className="space-y-3">
          {repaymentPriority.map((item, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">{item.rank}</span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-white mb-1">{item.type}</h4>
                <p className="text-slate-400 text-sm mb-1">💡 {item.reason}</p>
                <p className="text-green-400 text-sm">✅ {item.action}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
          <p className="text-amber-400 font-bold mb-2">⚠️ 주의사항</p>
          <ul className="text-slate-300 text-sm space-y-1">
            <li>• 부채 상환을 위해 저축을 완전히 포기하지 마세요</li>
            <li>• 비상금 3개월치는 반드시 확보하세요</li>
            <li>• 대환대출 시 총 비용을 꼼꼼히 계산하세요</li>
            <li>• 신용점수가 낮다면 개선 후 대환 고려</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
