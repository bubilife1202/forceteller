'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { PieChart, Wallet, Coins, Receipt } from 'lucide-react';

interface Wealth2026AnalysisProps {
  result: SajuResult;
  name: string;
}

export default function Wealth2026Analysis({ result, name }: Wealth2026AnalysisProps) {
  // 재성(정재/편재) 분석
  const getWealthStars = () => {
    const { 재성 } = result.tenGodsCount;
    const hasJeongJae = 재성 >= 1; // 정재
    const hasPyeonJae = 재성 >= 2; // 편재

    return {
      jeongJae: hasJeongJae,
      pyeonJae: hasPyeonJae,
      total: 재성,
    };
  };

  const wealthStars = getWealthStars();

  // 재성 강약 판단
  const getWealthStrength = () => {
    if (wealthStars.total >= 3) return { level: '매우 강함', desc: '재물복이 타고났습니다. 돈을 모으고 불리는 능력이 뛰어납니다.' };
    if (wealthStars.total >= 2) return { level: '강함', desc: '재물운이 좋은 편입니다. 꾸준한 노력으로 부를 축적합니다.' };
    if (wealthStars.total >= 1) return { level: '보통', desc: '평균적인 재물운입니다. 계획적인 재테크가 필요합니다.' };
    return { level: '약함', desc: '재물보다 다른 복이 강합니다. 전문성을 키워 수입을 늘리세요.' };
  };

  const wealthStrength = getWealthStrength();

  // 재물 성향 분석
  const getWealthType = () => {
    const { 비겁, 식상, 재성, 관성, 인성 } = result.tenGodsCount;

    if (식상 >= 2 && 재성 >= 1) {
      return {
        type: '창업형',
        emoji: '🚀',
        desc: '창의적인 아이디어로 돈을 버는 타입입니다. 사업이나 프리랜서에 적합합니다.',
        advice: '아이디어를 현실화하는 실행력을 키우세요.',
      };
    }
    if (재성 >= 2) {
      return {
        type: '투자형',
        emoji: '📈',
        desc: '재물을 불리는 감각이 뛰어납니다. 투자나 재테크에 강합니다.',
        advice: '분산 투자로 리스크를 관리하세요.',
      };
    }
    if (관성 >= 2) {
      return {
        type: '직장형',
        emoji: '💼',
        desc: '안정적인 직장 수입이 유리합니다. 승진과 연봉 인상을 노리세요.',
        advice: '전문성을 높여 연봉 협상력을 키우세요.',
      };
    }
    if (인성 >= 2) {
      return {
        type: '전문가형',
        emoji: '🎓',
        desc: '지식과 기술로 수입을 올리는 타입입니다. 자격증이나 전문직이 유리합니다.',
        advice: '끊임없이 배우고 자기계발에 투자하세요.',
      };
    }
    if (비겁 >= 2) {
      return {
        type: '협력형',
        emoji: '🤝',
        desc: '혼자보다 파트너와 함께할 때 재물운이 좋습니다.',
        advice: '좋은 동업자나 투자 파트너를 찾으세요.',
      };
    }
    return {
      type: '균형형',
      emoji: '⚖️',
      desc: '다양한 방식으로 수입을 올릴 수 있는 유연한 타입입니다.',
      advice: '여러 수입원을 만들어 안정성을 높이세요.',
    };
  };

  const wealthType = getWealthType();

  // 오행별 재물 에너지
  const getElementWealth = () => {
    const elements = result.elements;
    const sorted = Object.entries(elements).sort((a, b) => b[1] - a[1]);

    const elementMeaning: Record<string, { meaning: string; money: string }> = {
      목: { meaning: '성장', money: '투자 수익, 사업 확장' },
      화: { meaning: '활발', money: '빠른 회전, 단기 수익' },
      토: { meaning: '안정', money: '부동산, 저축, 장기 투자' },
      금: { meaning: '결실', money: '월급, 보너스, 정기 수입' },
      수: { meaning: '유동', money: '금융, 주식, 암호화폐' },
    };

    return sorted.map(([element, value]) => ({
      element,
      value,
      ...elementMeaning[element],
    }));
  };

  const elementWealth = getElementWealth();

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2
        className="text-3xl font-bold text-center mb-8 gradient-text"
        style={{ fontFamily: "'Noto Serif KR', serif" }}
      >
        📊 사주 재성 분석
      </h2>

      {/* 재성 강약 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center">
            <Wallet className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-amber-400">재성 강약: {wealthStrength.level}</h3>
            <p className="text-slate-400">재성 {wealthStars.total}개 보유</p>
          </div>
        </div>
        <p className="text-slate-300 leading-relaxed">{wealthStrength.desc}</p>

        {/* 재성 게이지 */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-slate-400 mb-2">
            <span>재성 강도</span>
            <span>{Math.min(wealthStars.total * 25, 100)}%</span>
          </div>
          <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-500"
              initial={{ width: 0 }}
              whileInView={{ width: `${Math.min(wealthStars.total * 25, 100)}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* 재물 성향 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-3xl">
            {wealthType.emoji}
          </div>
          <div>
            <h3 className="text-xl font-bold text-purple-400">{name}님의 재물 유형</h3>
            <p className="text-white text-lg font-semibold">{wealthType.type}</p>
          </div>
        </div>
        <p className="text-slate-300 leading-relaxed mb-4">{wealthType.desc}</p>
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
          <p className="text-purple-300">💡 <strong>조언:</strong> {wealthType.advice}</p>
        </div>
      </div>

      {/* 오행 재물 에너지 */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
          <PieChart className="w-6 h-6" />
          오행별 재물 에너지
        </h3>

        <div className="space-y-4">
          {elementWealth.map((item, index) => (
            <motion.div
              key={item.element}
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold
                ${item.element === '목' ? 'bg-green-500/20 text-green-400' : ''}
                ${item.element === '화' ? 'bg-red-500/20 text-red-400' : ''}
                ${item.element === '토' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                ${item.element === '금' ? 'bg-slate-400/20 text-slate-300' : ''}
                ${item.element === '수' ? 'bg-blue-500/20 text-blue-400' : ''}
              `}>
                {item.element}
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300 font-medium">{item.meaning}</span>
                  <span className="text-slate-400">{item.value}%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full
                      ${item.element === '목' ? 'bg-green-500' : ''}
                      ${item.element === '화' ? 'bg-red-500' : ''}
                      ${item.element === '토' ? 'bg-yellow-500' : ''}
                      ${item.element === '금' ? 'bg-slate-400' : ''}
                      ${item.element === '수' ? 'bg-blue-500' : ''}
                    `}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  />
                </div>
                <p className="text-slate-500 text-xs mt-1">{item.money}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 정재 vs 편재 */}
      <div className="grid md:grid-cols-2 gap-4 mt-8">
        <div className="glass rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <Coins className="w-6 h-6 text-green-400" />
            <h4 className="font-bold text-green-400">정재(正財) 운</h4>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">
            {wealthStars.jeongJae
              ? '정재가 있어 안정적인 수입과 저축 능력이 좋습니다. 월급, 이자, 배당금 등 정기적인 수입이 유리합니다.'
              : '정재가 없어 고정 수입보다 변동 수입에서 기회를 찾으세요. 부업이나 투자를 고려해보세요.'}
          </p>
        </div>
        <div className="glass rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <Receipt className="w-6 h-6 text-orange-400" />
            <h4 className="font-bold text-orange-400">편재(偏財) 운</h4>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">
            {wealthStars.pyeonJae
              ? '편재가 있어 횡재수와 투자 수익의 기회가 있습니다. 부동산, 주식, 사업에서 큰 수익을 노릴 수 있습니다.'
              : '편재가 없어 투기보다는 안정적인 투자가 유리합니다. 무리한 투자는 피하세요.'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
