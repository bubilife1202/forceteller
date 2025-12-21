'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { DollarSign, TrendingUp, Home, PiggyBank, Coins } from 'lucide-react';

interface MarriageWealthProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function MarriageWealth({ result, name }: MarriageWealthProps) {
  const dayElement = result.day.stem.element;
  const { 재성, 식상, 관성 } = result.tenGodsCount;

  // 배우자로 인한 재물 증가율
  const getWealthIncrease = () => {
    let score = 50;
    if (재성 >= 2) score += 25; // 배우자가 재물을 가져옴
    if (식상 >= 2) score += 15; // 배우자와 함께 부업 가능
    if (관성 >= 1) score += 10; // 배우자의 지위가 재물에 도움

    // 오행별 보정
    if (dayElement === '토') score += 15; // 토는 재물을 모으는 기운
    if (dayElement === '금') score += 10;

    return Math.min(Math.max(score, 30), 100);
  };

  const wealthIncrease = getWealthIncrease();

  // 결혼 후 재정 상태
  const getFinancialStatus = () => {
    const statuses: Record<string, {
      title: string;
      beforeMarriage: string;
      afterMarriage: string;
      growth: number;
      advice: string;
    }> = {
      목: {
        title: '꾸준한 성장형',
        beforeMarriage: '학자금, 자기계발에 투자',
        afterMarriage: '맞벌이로 안정적 수입 증가',
        growth: 150,
        advice: '함께 공부하고 성장하며 재산을 늘려갑니다'
      },
      화: {
        title: '활발한 소비형',
        beforeMarriage: '소비 활발, 저축 부족',
        afterMarriage: '배우자의 조언으로 균형 잡힌 소비',
        growth: 130,
        advice: '열정적 벌이와 현명한 쓰임의 조화가 필요합니다'
      },
      토: {
        title: '안정적 축적형',
        beforeMarriage: '꾸준한 저축, 안정 추구',
        afterMarriage: '부동산 등 큰 자산 형성',
        growth: 180,
        advice: '결혼이 재산 증식의 기회가 됩니다'
      },
      금: {
        title: '계획적 관리형',
        beforeMarriage: '철저한 재무 관리',
        afterMarriage: '전문적 투자로 자산 증대',
        growth: 170,
        advice: '계획적 재테크로 큰 부를 이룰 수 있습니다'
      },
      수: {
        title: '유동적 변화형',
        beforeMarriage: '들쑥날쑥한 재정',
        afterMarriage: '배우자의 도움으로 안정화',
        growth: 140,
        advice: '변화를 즐기되 배우자의 조언을 따르세요'
      }
    };
    return statuses[dayElement] || statuses['목'];
  };

  const financialStatus = getFinancialStatus();

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
        💰 배우자 재물운
      </h2>
      <p className="text-center text-slate-400 mb-8">
        결혼으로 인한 {name}님의 재물 변화
      </p>

      {/* 재물 증가율 */}
      <div className="glass rounded-2xl p-6 mb-6 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/30">
        <div className="flex items-center gap-3 mb-4">
          <DollarSign className="w-6 h-6 text-yellow-400" />
          <h3 className="text-xl font-bold text-white">결혼 후 재물 증가 예상</h3>
        </div>
        <div className="flex justify-between items-center mb-3">
          <p className="text-slate-300">
            {wealthIncrease >= 80 ? '결혼이 대박 재물운을 가져옵니다!' :
             wealthIncrease >= 65 ? '결혼 후 재정 상태가 크게 좋아집니다' :
             wealthIncrease >= 50 ? '결혼이 재정 안정에 도움이 됩니다' :
             '함께 노력하면 재산을 늘릴 수 있습니다'}
          </p>
          <p className="text-4xl font-bold text-yellow-400">{wealthIncrease}점</p>
        </div>
        <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-500 to-amber-500"
            initial={{ width: 0 }}
            whileInView={{ width: `${wealthIncrease}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>

      {/* 재정 상태 변화 */}
      <div className="glass rounded-2xl p-6 mb-6">
        <h3 className="text-xl font-bold text-white mb-4">{financialStatus.title}</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-slate-800/50 rounded-xl">
            <p className="text-slate-400 text-sm mb-2">결혼 전</p>
            <p className="text-white">{financialStatus.beforeMarriage}</p>
          </div>
          <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/30">
            <p className="text-emerald-400 text-sm mb-2">결혼 후</p>
            <p className="text-white">{financialStatus.afterMarriage}</p>
          </div>
        </div>
        <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-green-400 font-medium">재산 증가율</span>
            <span className="text-2xl font-bold text-green-400">+{financialStatus.growth}%</span>
          </div>
          <p className="text-slate-300 text-sm">{financialStatus.advice}</p>
        </div>
      </div>

      {/* 재물 분야별 운세 */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <motion.div
          className="glass rounded-xl p-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Home className="w-5 h-5 text-blue-400" />
            <h4 className="font-bold text-white">부동산</h4>
          </div>
          <p className="text-2xl font-bold text-blue-400 mb-2">
            {dayElement === '토' ? '90점' :
             dayElement === '금' ? '75점' :
             dayElement === '화' ? '70점' : '65점'}
          </p>
          <p className="text-slate-300 text-sm">
            {dayElement === '토' ? '내 집 마련 필수!' :
             '결혼 후 부동산 투자 고려'}
          </p>
        </motion.div>

        <motion.div
          className="glass rounded-xl p-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <PiggyBank className="w-5 h-5 text-pink-400" />
            <h4 className="font-bold text-white">저축</h4>
          </div>
          <p className="text-2xl font-bold text-pink-400 mb-2">
            {dayElement === '토' || dayElement === '금' ? '85점' :
             dayElement === '목' ? '75점' : '65점'}
          </p>
          <p className="text-slate-300 text-sm">
            {dayElement === '토' || dayElement === '금' ? '꾸준한 저축 가능' :
             '배우자와 함께 저축'}
          </p>
        </motion.div>

        <motion.div
          className="glass rounded-xl p-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Coins className="w-5 h-5 text-yellow-400" />
            <h4 className="font-bold text-white">투자</h4>
          </div>
          <p className="text-2xl font-bold text-yellow-400 mb-2">
            {재성 >= 2 ? '80점' :
             식상 >= 2 ? '70점' : '60점'}
          </p>
          <p className="text-slate-300 text-sm">
            {재성 >= 2 ? '적극 투자 가능' :
             '분산 투자 권장'}
          </p>
        </motion.div>
      </div>

      {/* 재물 조언 */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-6 h-6 text-emerald-400" />
          <h3 className="text-xl font-bold text-white">부부 재테크 조언</h3>
        </div>
        <div className="space-y-3">
          <div className="p-4 bg-emerald-500/10 rounded-xl">
            <p className="text-emerald-400 font-medium mb-1">✓ 공동 재정 관리</p>
            <p className="text-slate-300 text-sm">
              투명하게 수입과 지출을 공유하고 함께 계획을 세우세요
            </p>
          </div>
          <div className="p-4 bg-blue-500/10 rounded-xl">
            <p className="text-blue-400 font-medium mb-1">✓ 역할 분담</p>
            <p className="text-slate-300 text-sm">
              한 사람은 벌이에, 한 사람은 저축과 투자에 집중하는 것도 좋습니다
            </p>
          </div>
          <div className="p-4 bg-purple-500/10 rounded-xl">
            <p className="text-purple-400 font-medium mb-1">✓ 장기 목표 설정</p>
            <p className="text-slate-300 text-sm">
              5년, 10년 후 재산 목표를 함께 정하고 실천하세요
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
