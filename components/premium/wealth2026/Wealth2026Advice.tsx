'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { AlertTriangle, CheckCircle, Target, Calendar, Brain, Heart } from 'lucide-react';

interface Wealth2026AdviceProps {
  result: SajuResult;
  name: string;
  wealthScore: number;
}

export default function Wealth2026Advice({ result, name, wealthScore }: Wealth2026AdviceProps) {
  const dayElement = result.day.stem.element;
  const { 재성, 비겁, 관성 } = result.tenGodsCount;

  // 피해야 할 것들
  const getWarnings = () => {
    const warnings = [];

    // 일간별 주의사항
    if (dayElement === '금') {
      warnings.push({
        icon: '🔥',
        title: '화 기운 과다 주의',
        desc: '2026년 병오년은 화 기운이 강합니다. 금 일간은 화극금으로 손실 위험이 있으니 무리한 투자를 피하세요.',
      });
    }
    if (dayElement === '화') {
      warnings.push({
        icon: '⚔️',
        title: '경쟁 상황 주의',
        desc: '비겁운으로 경쟁이 치열합니다. 독단적인 판단보다 협력을 통해 성과를 내세요.',
      });
    }

    // 십성별 주의사항
    if (비겁 >= 2) {
      warnings.push({
        icon: '🤝',
        title: '보증/대출 주의',
        desc: '비겁이 많아 지인의 부탁에 취약합니다. 금전 보증은 절대 서지 마세요.',
      });
    }
    if (재성 === 0) {
      warnings.push({
        icon: '💸',
        title: '과소비 주의',
        desc: '재성이 없어 돈 관리에 어려움이 있을 수 있습니다. 예산을 철저히 세우세요.',
      });
    }

    // 일반적인 주의사항
    warnings.push({
      icon: '📉',
      title: '투기성 투자 금지',
      desc: '검증되지 않은 투자, 고수익 보장 상품은 피하세요.',
    });

    return warnings;
  };

  // 실천 가이드
  const getActionGuide = () => {
    const actions = [];

    // 점수에 따른 행동 가이드
    if (wealthScore >= 70) {
      actions.push({
        icon: Target,
        title: '적극적 재테크',
        items: ['투자 포트폴리오 다각화', '새로운 수입원 개발', '자산 증식에 집중'],
      });
    } else if (wealthScore >= 50) {
      actions.push({
        icon: Target,
        title: '균형 잡힌 재테크',
        items: ['안정과 성장의 균형', '리스크 관리 우선', '꾸준한 저축 유지'],
      });
    } else {
      actions.push({
        icon: Target,
        title: '수비적 재테크',
        items: ['원금 보존 우선', '비상금 확보', '불필요한 지출 절감'],
      });
    }

    // 일간별 행동 가이드
    const elementActions: Record<string, { icon: typeof Target; title: string; items: string[] }> = {
      목: {
        icon: Brain,
        title: '성장 투자',
        items: ['자기계발에 투자', '새로운 기술 습득', '네트워크 확장'],
      },
      화: {
        icon: Heart,
        title: '열정 발산',
        items: ['창업/사업 기회 탐색', '적극적인 영업', '열정 프로젝트 추진'],
      },
      토: {
        icon: Calendar,
        title: '안정 추구',
        items: ['부동산 관심', '장기 투자 계획', '기반 다지기'],
      },
      금: {
        icon: CheckCircle,
        title: '내실 다지기',
        items: ['저축 우선', '기존 자산 보호', '보수적 투자'],
      },
      수: {
        icon: Brain,
        title: '유연한 대응',
        items: ['시장 흐름 파악', '분산 투자', '정보 수집'],
      },
    };

    actions.push(elementActions[dayElement] || elementActions['토']);

    return actions;
  };

  const warnings = getWarnings();
  const actionGuide = getActionGuide();

  // 월별 행동 가이드
  const getMonthlyActions = () => {
    return [
      { month: '1-2월', action: '새해 재정 계획 수립', emoji: '📋' },
      { month: '3-4월', action: '투자 기회 탐색', emoji: '🔍' },
      { month: '5-6월', action: dayElement === '토' ? '적극적 투자' : '신중한 실행', emoji: '🚀' },
      { month: '7-8월', action: '중간 점검 및 조정', emoji: '⚖️' },
      { month: '9-10월', action: '수익 실현 검토', emoji: '💰' },
      { month: '11-12월', action: '연말 정산 및 내년 준비', emoji: '📊' },
    ];
  };

  const monthlyActions = getMonthlyActions();

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
        ⚠️ 주의사항 & 실천 가이드
      </h2>
      <p className="text-center text-slate-400 mb-8">
        2026년 {name}님을 위한 맞춤 재물운 조언
      </p>

      {/* 피해야 할 것들 */}
      <div className="glass rounded-2xl p-6 mb-8 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30">
        <h3 className="text-xl font-bold text-red-400 mb-6 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6" />
          2026년 꼭 피해야 할 것
        </h3>
        <div className="space-y-4">
          {warnings.map((warning, index) => (
            <motion.div
              key={warning.title}
              className="flex gap-4 bg-slate-800/50 rounded-xl p-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="text-3xl">{warning.icon}</span>
              <div>
                <h4 className="font-bold text-white mb-1">{warning.title}</h4>
                <p className="text-slate-300 text-sm">{warning.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 실천 가이드 */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {actionGuide.map((guide, index) => (
          <motion.div
            key={guide.title}
            className="glass rounded-xl p-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <guide.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-green-400">{guide.title}</h4>
            </div>
            <ul className="space-y-2">
              {guide.items.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* 월별 행동 가이드 */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
          <Calendar className="w-6 h-6" />
          월별 행동 가이드
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {monthlyActions.map((item, index) => (
            <motion.div
              key={item.month}
              className="bg-slate-800/50 rounded-xl p-4 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <span className="text-2xl mb-2 block">{item.emoji}</span>
              <p className="text-amber-400 font-semibold text-sm">{item.month}</p>
              <p className="text-slate-300 text-xs mt-1">{item.action}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 최종 조언 */}
      <div className="mt-8 text-center glass rounded-2xl p-6 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/30">
        <h3 className="text-xl font-bold text-purple-400 mb-4">💎 {name}님을 위한 한마디</h3>
        <p className="text-slate-300 leading-relaxed">
          {wealthScore >= 70
            ? '2026년은 재물운이 좋은 해입니다. 기회를 놓치지 말고 적극적으로 움직이세요. 단, 과욕은 금물입니다.'
            : wealthScore >= 50
            ? '2026년은 꾸준함이 답입니다. 큰 욕심보다 작은 성취를 쌓아가세요. 때를 기다리는 지혜가 필요합니다.'
            : '2026년은 수비의 해입니다. 지키는 것이 버는 것입니다. 내실을 다지며 다음 기회를 준비하세요.'}
        </p>
      </div>
    </motion.div>
  );
}
