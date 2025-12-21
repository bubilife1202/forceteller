'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { CreditCard, AlertTriangle, ShoppingBag, Home, Car, Utensils } from 'lucide-react';

interface Wealth2026ExpenseProps {
  result: SajuResult;
  name: string;
  baseScore: number;
}

export default function Wealth2026Expense({ result, name, baseScore }: Wealth2026ExpenseProps) {
  const dayElement = result.day.stem.element;
  const { 비겁, 식상, 관성 } = result.tenGodsCount;

  // 지출 성향 분석
  const getExpenseType = () => {
    if (비겁 >= 2) {
      return {
        type: '충동형',
        emoji: '⚡',
        desc: '순간적인 충동 구매가 잦을 수 있습니다. 큰 금액은 하루 이상 고민 후 결정하세요.',
        risk: '높음',
      };
    }
    if (식상 >= 2) {
      return {
        type: '향유형',
        emoji: '🎭',
        desc: '경험과 즐거움에 투자하는 편입니다. 문화, 여행, 취미 지출이 많습니다.',
        risk: '중간',
      };
    }
    if (관성 >= 2) {
      return {
        type: '계획형',
        emoji: '📋',
        desc: '계획적인 지출을 하는 편입니다. 예산 관리 능력이 좋습니다.',
        risk: '낮음',
      };
    }
    return {
      type: '균형형',
      emoji: '⚖️',
      desc: '상황에 따라 유연하게 지출합니다. 적절한 균형을 유지합니다.',
      risk: '중간',
    };
  };

  const expenseType = getExpenseType();

  // 손재수 분석
  const getLossRisk = () => {
    let risk = 50;

    // 병오년 화기가 강하므로 금 일간은 손재수 높음
    if (dayElement === '금') risk += 25;
    if (dayElement === '화') risk += 10; // 비겁운 - 경쟁으로 인한 손실
    if (dayElement === '토') risk -= 15; // 화생토로 안정
    if (dayElement === '수') risk -= 5;
    if (dayElement === '목') risk += 5;

    if (비겁 >= 2) risk += 15;
    if (result.hapchung.length > 0) risk += 10;

    risk = Math.min(Math.max(risk, 20), 90);

    return {
      level: risk >= 70 ? '높음' : risk >= 50 ? '중간' : '낮음',
      score: risk,
      warning: risk >= 70
        ? '올해는 예상치 못한 지출이 발생할 수 있습니다. 비상금을 넉넉히 준비하세요.'
        : risk >= 50
        ? '계획에 없는 지출이 간혹 생길 수 있습니다. 여유 예산을 확보하세요.'
        : '지출 관리가 잘 되는 해입니다. 계획대로 진행하세요.',
    };
  };

  const lossRisk = getLossRisk();

  // 분야별 지출 예측
  const getExpenseCategories = () => {
    const categories = [
      {
        icon: Home,
        name: '주거/생활비',
        prediction: dayElement === '토' ? '증가' : '유지',
        advice: '고정비 점검 필요',
        color: 'text-blue-400',
      },
      {
        icon: Utensils,
        name: '식비/외식',
        prediction: 식상 >= 2 ? '증가' : '유지',
        advice: '모임 지출 관리',
        color: 'text-orange-400',
      },
      {
        icon: ShoppingBag,
        name: '쇼핑/의류',
        prediction: 비겁 >= 2 ? '증가' : dayElement === '금' ? '감소' : '유지',
        advice: '계획 구매 권장',
        color: 'text-pink-400',
      },
      {
        icon: Car,
        name: '교통/차량',
        prediction: dayElement === '화' ? '증가' : '유지',
        advice: '유지비 점검',
        color: 'text-green-400',
      },
      {
        icon: CreditCard,
        name: '경조사/선물',
        prediction: dayElement === '화' || dayElement === '목' ? '증가' : '유지',
        advice: '예비비 확보',
        color: 'text-purple-400',
      },
    ];

    return categories;
  };

  const expenseCategories = getExpenseCategories();

  // 주의할 지출
  const getDangerousExpenses = () => {
    const dangers = [];

    if (dayElement === '금') {
      dangers.push({ item: '무리한 투자', reason: '화극금으로 손실 위험' });
    }
    if (비겁 >= 2) {
      dangers.push({ item: '충동 구매', reason: '비겁 과다로 충동성 증가' });
      dangers.push({ item: '지인 보증', reason: '손재수 주의' });
    }
    if (dayElement === '화') {
      dangers.push({ item: '사치품', reason: '화기 과다로 과소비 경향' });
    }
    if (식상 >= 2) {
      dangers.push({ item: '유흥/오락', reason: '식상 과다로 향락 지출' });
    }

    if (dangers.length === 0) {
      dangers.push({ item: '검증 안 된 투자', reason: '항상 주의 필요' });
    }

    return dangers;
  };

  const dangerousExpenses = getDangerousExpenses();

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
        💸 지출운 분석
      </h2>
      <p className="text-center text-slate-400 mb-8">
        2026년 {name}님의 지출 패턴과 주의사항
      </p>

      {/* 지출 성향 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-3xl">
            {expenseType.emoji}
          </div>
          <div>
            <h3 className="text-xl font-bold text-rose-400">{name}님의 지출 유형</h3>
            <p className="text-white text-lg font-semibold">{expenseType.type}</p>
          </div>
          <div className="ml-auto">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold
              ${expenseType.risk === '높음' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : ''}
              ${expenseType.risk === '중간' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : ''}
              ${expenseType.risk === '낮음' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : ''}
            `}>
              지출 위험도: {expenseType.risk}
            </span>
          </div>
        </div>
        <p className="text-slate-300 leading-relaxed">{expenseType.desc}</p>
      </div>

      {/* 손재수 경고 */}
      <div className={`glass rounded-2xl p-6 mb-8 border
        ${lossRisk.level === '높음' ? 'border-red-500/50 bg-red-500/5' : ''}
        ${lossRisk.level === '중간' ? 'border-yellow-500/50 bg-yellow-500/5' : ''}
        ${lossRisk.level === '낮음' ? 'border-green-500/50 bg-green-500/5' : ''}
      `}>
        <div className="flex items-center gap-4 mb-4">
          <AlertTriangle className={`w-8 h-8
            ${lossRisk.level === '높음' ? 'text-red-400' : ''}
            ${lossRisk.level === '중간' ? 'text-yellow-400' : ''}
            ${lossRisk.level === '낮음' ? 'text-green-400' : ''}
          `} />
          <div>
            <h3 className="text-lg font-bold text-white">2026년 손재수 위험도</h3>
            <p className={`text-2xl font-bold
              ${lossRisk.level === '높음' ? 'text-red-400' : ''}
              ${lossRisk.level === '중간' ? 'text-yellow-400' : ''}
              ${lossRisk.level === '낮음' ? 'text-green-400' : ''}
            `}>
              {lossRisk.level} ({lossRisk.score}%)
            </p>
          </div>
        </div>
        <p className="text-slate-300">{lossRisk.warning}</p>

        {/* 손재수 게이지 */}
        <div className="mt-4">
          <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className={`h-full
                ${lossRisk.level === '높음' ? 'bg-gradient-to-r from-red-500 to-rose-500' : ''}
                ${lossRisk.level === '중간' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : ''}
                ${lossRisk.level === '낮음' ? 'bg-gradient-to-r from-green-500 to-emerald-500' : ''}
              `}
              initial={{ width: 0 }}
              whileInView={{ width: `${lossRisk.score}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
      </div>

      {/* 분야별 지출 예측 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-cyan-400 mb-6">📊 분야별 지출 예측</h3>
        <div className="grid md:grid-cols-5 gap-4">
          {expenseCategories.map((cat, index) => (
            <motion.div
              key={cat.name}
              className="text-center glass rounded-xl p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <cat.icon className={`w-8 h-8 mx-auto mb-2 ${cat.color}`} />
              <p className="text-slate-300 text-sm font-medium mb-1">{cat.name}</p>
              <p className={`text-lg font-bold
                ${cat.prediction === '증가' ? 'text-red-400' : ''}
                ${cat.prediction === '유지' ? 'text-yellow-400' : ''}
                ${cat.prediction === '감소' ? 'text-green-400' : ''}
              `}>
                {cat.prediction}
              </p>
              <p className="text-slate-500 text-xs mt-1">{cat.advice}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 주의할 지출 */}
      <div className="glass rounded-2xl p-6 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30">
        <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6" />
          2026년 피해야 할 지출
        </h3>
        <div className="space-y-3">
          {dangerousExpenses.map((danger, index) => (
            <motion.div
              key={danger.item}
              className="flex items-center gap-3 bg-slate-800/50 rounded-lg p-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="text-red-400 text-xl">⛔</span>
              <div>
                <p className="text-white font-medium">{danger.item}</p>
                <p className="text-slate-400 text-sm">{danger.reason}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 지출 관리 팁 */}
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="glass rounded-xl p-5">
          <h4 className="font-bold text-green-400 mb-3">✅ 권장 지출</h4>
          <ul className="space-y-2 text-slate-300 text-sm">
            <li>• 자기계발/교육 투자</li>
            <li>• 건강 관리 비용</li>
            <li>• 미래를 위한 저축</li>
          </ul>
        </div>
        <div className="glass rounded-xl p-5">
          <h4 className="font-bold text-amber-400 mb-3">💡 절약 팁</h4>
          <ul className="space-y-2 text-slate-300 text-sm">
            <li>• 월 예산 설정 후 지키기</li>
            <li>• 구매 전 24시간 룰 적용</li>
            <li>• 고정비 정기 점검</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
