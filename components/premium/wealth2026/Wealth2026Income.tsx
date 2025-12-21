'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Banknote, Gift, TrendingUp, Briefcase, Lightbulb, Users } from 'lucide-react';

interface Wealth2026IncomeProps {
  result: SajuResult;
  name: string;
  baseScore: number;
}

export default function Wealth2026Income({ result, name, baseScore }: Wealth2026IncomeProps) {
  const dayElement = result.day.stem.element;

  // 월급운 계산
  const getSalaryFortune = () => {
    let score = baseScore;
    const { 관성, 인성 } = result.tenGodsCount;

    if (관성 >= 2) score += 15;
    if (관성 >= 1) score += 5;
    if (인성 >= 2) score += 10;
    if (dayElement === '토') score += 10;
    if (dayElement === '금') score += 5;

    score = Math.min(Math.max(score, 30), 100);

    const grade = score >= 80 ? '대폭 상승' : score >= 60 ? '상승' : score >= 40 ? '유지' : '주의';

    return {
      score,
      grade,
      summary: score >= 80
        ? '올해 연봉 협상이나 승진의 기회가 옵니다!'
        : score >= 60
        ? '꾸준한 상승세, 성과를 어필하세요.'
        : score >= 40
        ? '현상 유지에 집중하며 기회를 노리세요.'
        : '직장 내 변화에 유연하게 대응하세요.',
      months: score >= 70 ? '3월, 6월, 9월' : '5월, 11월',
    };
  };

  // 부수입운 계산
  const getSideIncomeFortune = () => {
    let score = baseScore;
    const { 식상, 재성 } = result.tenGodsCount;

    if (식상 >= 2) score += 20;
    if (식상 >= 1) score += 10;
    if (재성 >= 1) score += 5;
    if (dayElement === '화') score += 10;
    if (dayElement === '목') score += 5;

    score = Math.min(Math.max(score, 30), 100);

    const grade = score >= 80 ? '매우 좋음' : score >= 60 ? '좋음' : score >= 40 ? '보통' : '어려움';

    const recommendations = [];
    if (식상 >= 2) recommendations.push('콘텐츠 제작', '강의/컨설팅');
    if (dayElement === '화') recommendations.push('영상/미디어', '공연/이벤트');
    if (dayElement === '목') recommendations.push('교육/코칭', '헬스케어');
    if (dayElement === '토') recommendations.push('부동산 중개', '컨설팅');
    if (dayElement === '금') recommendations.push('금융 관련', '정밀 작업');
    if (dayElement === '수') recommendations.push('IT/온라인', '무역/유통');

    if (recommendations.length === 0) recommendations.push('재능 기반 부업', '온라인 판매');

    return {
      score,
      grade,
      summary: score >= 80
        ? '부업이나 사이드 프로젝트에서 큰 수입이 기대됩니다!'
        : score >= 60
        ? '작은 부수입 기회가 여러 번 찾아옵니다.'
        : score >= 40
        ? '본업에 집중하되, 작은 기회를 놓치지 마세요.'
        : '무리한 부업보다 본업 역량 강화에 집중하세요.',
      recommendations: recommendations.slice(0, 3),
    };
  };

  // 투자수익운 계산
  const getInvestmentIncomeFortune = () => {
    let score = baseScore;
    const { 재성, 비겁 } = result.tenGodsCount;

    if (재성 >= 2) score += 20;
    if (재성 >= 1) score += 10;
    if (비겁 <= 1) score += 5;
    if (dayElement === '토') score += 15;
    if (dayElement === '수') score += 10;
    if (dayElement === '금') score -= 10;

    score = Math.min(Math.max(score, 30), 100);

    const grade = score >= 80 ? '대박' : score >= 60 ? '좋음' : score >= 40 ? '보통' : '주의';

    return {
      score,
      grade,
      summary: score >= 80
        ? '투자에서 큰 수익을 올릴 수 있는 해입니다!'
        : score >= 60
        ? '신중한 투자로 안정적인 수익을 기대하세요.'
        : score >= 40
        ? '보수적인 투자 전략을 권장합니다.'
        : '올해는 투자보다 저축에 집중하세요.',
      riskLevel: score >= 70 ? '공격적 가능' : score >= 50 ? '중립적 권장' : '보수적 필수',
    };
  };

  const salaryFortune = getSalaryFortune();
  const sideIncomeFortune = getSideIncomeFortune();
  const investmentIncomeFortune = getInvestmentIncomeFortune();

  const incomeCategories = [
    {
      icon: Briefcase,
      title: '월급/연봉 운',
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      textColor: 'text-blue-400',
      ...salaryFortune,
      detail: `${salaryFortune.grade} 예상. 좋은 달: ${salaryFortune.months}`,
    },
    {
      icon: Lightbulb,
      title: '부수입/부업 운',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      textColor: 'text-purple-400',
      ...sideIncomeFortune,
      detail: `추천 분야: ${sideIncomeFortune.recommendations.join(', ')}`,
    },
    {
      icon: TrendingUp,
      title: '투자 수익 운',
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      textColor: 'text-emerald-400',
      ...investmentIncomeFortune,
      detail: `투자 성향: ${investmentIncomeFortune.riskLevel}`,
    },
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
        💰 수입운 상세 분석
      </h2>
      <p className="text-center text-slate-400 mb-8">
        2026년 {name}님의 다양한 수입 채널별 운세
      </p>

      <div className="space-y-6">
        {incomeCategories.map((category, index) => (
          <motion.div
            key={category.title}
            className="glass rounded-2xl p-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
          >
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center flex-shrink-0`}>
                <category.icon className="w-7 h-7 text-white" />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-white">{category.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${category.bgColor} ${category.textColor} border ${category.borderColor}`}>
                      {category.grade}
                    </span>
                    <span className="text-2xl font-bold text-amber-400">{category.score}점</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-3">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${category.color}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${category.score}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>

                <p className="text-slate-300 mb-2">{category.summary}</p>
                <p className="text-slate-500 text-sm">{category.detail}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 종합 수입 전망 */}
      <div className="mt-8 glass rounded-2xl p-6 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/30">
        <h3 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
          <Banknote className="w-6 h-6" />
          2026년 종합 수입 전망
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-slate-400 text-sm mb-1">예상 수입 증가율</p>
            <p className="text-2xl font-bold text-white">
              {baseScore >= 70 ? '+15~25%' : baseScore >= 50 ? '+5~15%' : '0~5%'}
            </p>
          </div>
          <div>
            <p className="text-slate-400 text-sm mb-1">수입 최고 분기</p>
            <p className="text-2xl font-bold text-white">
              {dayElement === '화' || dayElement === '토' ? '2분기' : dayElement === '목' ? '1분기' : '3분기'}
            </p>
          </div>
          <div>
            <p className="text-slate-400 text-sm mb-1">주력 수입원</p>
            <p className="text-2xl font-bold text-white">
              {salaryFortune.score > sideIncomeFortune.score ? '본업' : '부수입'}
            </p>
          </div>
        </div>
      </div>

      {/* 수입 극대화 팁 */}
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="glass rounded-xl p-5">
          <h4 className="font-bold text-green-400 mb-3 flex items-center gap-2">
            <Gift className="w-5 h-5" />
            수입 극대화 전략
          </h4>
          <ul className="space-y-2 text-slate-300 text-sm">
            <li>• {dayElement === '토' ? '부동산/실물 자산 투자 적기' : '본업 전문성 강화'}</li>
            <li>• {salaryFortune.score >= 70 ? '적극적인 연봉 협상 추천' : '성과 기록 꼼꼼히 정리'}</li>
            <li>• {sideIncomeFortune.score >= 70 ? '부업 시작 좋은 시기' : '스킬업에 투자'}</li>
          </ul>
        </div>
        <div className="glass rounded-xl p-5">
          <h4 className="font-bold text-red-400 mb-3 flex items-center gap-2">
            <Users className="w-5 h-5" />
            주의할 점
          </h4>
          <ul className="space-y-2 text-slate-300 text-sm">
            <li>• {dayElement === '금' ? '화 기운 강한 해, 무리한 확장 금지' : '과욕은 금물'}</li>
            <li>• 검증되지 않은 투자 제안 경계</li>
            <li>• 수입과 지출의 균형 유지 필수</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
