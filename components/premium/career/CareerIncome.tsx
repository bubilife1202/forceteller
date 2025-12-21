'use client';

import { SajuResult } from '@/lib/saju-calculator';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Wallet, PiggyBank, AlertTriangle, Lightbulb } from 'lucide-react';

interface CareerIncomeProps {
  result: SajuResult;
  name: string;
  birthDate: Date;
}

const TEN_GOD_INCOME: Record<string, {
  incomePattern: string;
  salaryGrowth: string;
  bonusLuck: string;
  raiseTip: string;
  savingAdvice: string;
}> = {
  '비견': {
    incomePattern: '경쟁을 통해 수입이 결정되는 해입니다. 동료와의 비교에서 우위를 점해야 수입이 늘어납니다.',
    salaryGrowth: '평균 수준의 연봉 인상이 예상됩니다. 특별한 성과가 있어야 추가 인상이 가능합니다.',
    bonusLuck: '성과급은 팀 성과에 따라 결정됩니다. 개인 성과보다 팀 기여도를 높이세요.',
    raiseTip: '협력적인 태도를 보이면서도 자신의 기여를 명확히 어필하세요.',
    savingAdvice: '예상치 못한 지출에 대비해 비상금을 확보하세요.'
  },
  '겁재': {
    incomePattern: '수입의 변동이 있는 해입니다. 예상치 못한 수입과 지출이 동시에 생길 수 있습니다.',
    salaryGrowth: '불안정한 수입 구조가 될 수 있습니다. 안정적인 기본급에 집중하세요.',
    bonusLuck: '변동적입니다. 큰 성과급을 기대하기보다 안정적인 수입에 집중하세요.',
    raiseTip: '급한 연봉 협상보다 실력을 쌓고 기회를 기다리세요.',
    savingAdvice: '충동적인 소비를 줄이고 자동 이체로 저축하세요.'
  },
  '식신': {
    incomePattern: '창의적인 활동을 통해 수입이 증가하는 해입니다. 아이디어가 돈이 됩니다.',
    salaryGrowth: '창의적 성과에 따라 연봉이 증가할 수 있습니다. 기획력을 발휘하세요.',
    bonusLuck: '특별 프로젝트나 아이디어로 인한 보너스 가능성이 있습니다.',
    raiseTip: '새로운 아이디어와 제안으로 가치를 증명하세요.',
    savingAdvice: '부업이나 사이드 프로젝트로 추가 수입을 만들 수 있습니다.'
  },
  '상관': {
    incomePattern: '표현력과 능력을 인정받아 수입이 증가할 수 있지만, 충돌로 인한 리스크도 있습니다.',
    salaryGrowth: '성과에 따라 극단적인 결과가 나올 수 있습니다. 신중하게 행동하세요.',
    bonusLuck: '특별한 성과로 큰 보너스를 받거나 갈등으로 손해를 볼 수 있습니다.',
    raiseTip: '자신감 있게 협상하되 상사의 체면을 세워주세요.',
    savingAdvice: '지출을 줄이고 예비 자금을 확보하세요.'
  },
  '편재': {
    incomePattern: '재물운이 활발한 해입니다. 다양한 경로로 수입이 들어옵니다.',
    salaryGrowth: '영업이나 성과 기반 직종에서 큰 수입이 가능합니다.',
    bonusLuck: '성과급이나 인센티브가 좋습니다. 적극적으로 목표를 달성하세요.',
    raiseTip: '구체적인 성과 수치로 협상하세요. 시장 가치를 알아보세요.',
    savingAdvice: '수입이 늘어도 지출을 절제하고 투자를 고려하세요.'
  },
  '정재': {
    incomePattern: '안정적인 수입이 보장되는 해입니다. 꾸준한 성장이 기대됩니다.',
    salaryGrowth: '정기적인 연봉 인상이 예상됩니다. 안정적이지만 폭발적이진 않습니다.',
    bonusLuck: '예상 범위 내의 성과급이 주어집니다. 큰 기대보다 안정을 추구하세요.',
    raiseTip: '꾸준한 성과와 신뢰로 어필하세요. 장기적 가치를 강조하세요.',
    savingAdvice: '정기 적금과 투자로 자산을 꾸준히 불리세요.'
  },
  '편관': {
    incomePattern: '경쟁과 도전을 통해 수입이 결정됩니다. 승부를 걸 만한 해입니다.',
    salaryGrowth: '도전적인 프로젝트 성공 시 큰 인상이 가능합니다.',
    bonusLuck: '리스크가 있는 만큼 성과급도 클 수 있습니다.',
    raiseTip: '도전적인 업무를 맡아 성과로 증명하세요.',
    savingAdvice: '위험 관리를 하면서 기회를 잡으세요.'
  },
  '정관': {
    incomePattern: '조직 내 인정을 받아 수입이 안정적으로 증가하는 해입니다.',
    salaryGrowth: '승진과 함께 연봉 인상이 기대됩니다. 조직의 기대에 부응하세요.',
    bonusLuck: '조직 성과에 따라 안정적인 보너스가 주어집니다.',
    raiseTip: '조직에 대한 충성도와 성과를 함께 어필하세요.',
    savingAdvice: '수입 증가에 맞춰 저축과 투자도 늘리세요.'
  },
  '편인': {
    incomePattern: '수입보다 자기계발에 투자하는 해가 될 수 있습니다. 장기적 관점이 필요합니다.',
    salaryGrowth: '당장의 인상보다 역량 개발에 집중하는 것이 좋습니다.',
    bonusLuck: '특별한 보너스보다 학습 기회나 자격증이 더 가치 있습니다.',
    raiseTip: '역량 개발 후 시장 가치를 재평가하세요.',
    savingAdvice: '자기계발 투자를 아끼지 마세요. 미래 수입 증가로 이어집니다.'
  },
  '정인': {
    incomePattern: '귀인의 도움으로 수입이 증가하는 해입니다. 인맥을 통한 기회가 열립니다.',
    salaryGrowth: '추천이나 스카우트 제안이 올 수 있습니다. 네트워크를 활용하세요.',
    bonusLuck: '멘토나 상사의 배려로 좋은 기회가 주어집니다.',
    raiseTip: '좋은 관계를 유지하고 도움을 구하는 것을 두려워하지 마세요.',
    savingAdvice: '들어온 기회를 잘 활용하고 감사한 마음으로 저축하세요.'
  }
};

export default function CareerIncome({ result, name, birthDate }: CareerIncomeProps) {
  const yearTenGod = result.tenGods.year;
  const income = TEN_GOD_INCOME[yearTenGod] || TEN_GOD_INCOME['비견'];
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthDate.getFullYear() + 1;

  // 수입 성장 점수
  const calculateIncomeScore = () => {
    let score = 50;
    const { 재성, 관성, 식상 } = result.tenGodsCount;

    if (['편재', '정재', '정관'].includes(yearTenGod)) score += 20;
    if (['식신', '편관'].includes(yearTenGod)) score += 10;
    if (['겁재', '상관', '편인'].includes(yearTenGod)) score -= 5;
    if (재성 >= 1) score += 10;
    if (관성 >= 1) score += 8;
    if (식상 >= 1) score += 5;

    return Math.min(Math.max(score, 30), 95);
  };

  const incomeScore = calculateIncomeScore();

  const getScoreColor = () => {
    if (incomeScore >= 75) return 'text-emerald-400';
    if (incomeScore >= 55) return 'text-blue-400';
    if (incomeScore >= 40) return 'text-amber-400';
    return 'text-rose-400';
  };

  return (
    <motion.section
      className="glass-strong rounded-3xl p-6 md:p-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20">
          <DollarSign className="w-7 h-7 text-green-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            직장인 수입운
          </h2>
          <p className="text-slate-400 text-sm">{currentYear}년 {name}님의 재물 흐름</p>
        </div>
      </div>

      {/* 수입 점수 */}
      <div className="glass rounded-2xl p-6 mb-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 mb-1">수입운 점수</p>
            <span className={`text-4xl font-bold ${getScoreColor()}`}>{incomeScore}점</span>
          </div>
          <div className="text-right">
            <p className="text-slate-400 text-sm">올해 운: {yearTenGod}</p>
            <p className="text-slate-400 text-sm">나이: {age}세</p>
          </div>
        </div>
      </div>

      {/* 수입 패턴 */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 text-emerald-400 mb-3">
          <Wallet className="w-5 h-5" />
          <h3 className="font-semibold">수입 패턴</h3>
        </div>
        <p className="text-slate-300 leading-relaxed">{income.incomePattern}</p>
      </div>

      {/* 연봉 & 보너스 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 text-blue-400 mb-3">
            <TrendingUp className="w-5 h-5" />
            <h3 className="font-semibold">연봉 전망</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{income.salaryGrowth}</p>
        </div>

        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 text-amber-400 mb-3">
            <DollarSign className="w-5 h-5" />
            <h3 className="font-semibold">보너스/성과급</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{income.bonusLuck}</p>
        </div>
      </div>

      {/* 연봉 협상 팁 */}
      <div className="glass rounded-2xl p-6 mb-6 border border-emerald-500/30">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-emerald-300 mb-2">💰 연봉 협상 팁</h3>
            <p className="text-slate-300 leading-relaxed">{income.raiseTip}</p>
          </div>
        </div>
      </div>

      {/* 저축 조언 */}
      <div className="glass rounded-2xl p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
        <div className="flex items-start gap-3">
          <PiggyBank className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-green-300 mb-2">🐷 저축 조언</h3>
            <p className="text-slate-300 leading-relaxed">{income.savingAdvice}</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
