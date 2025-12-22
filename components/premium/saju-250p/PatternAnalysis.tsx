'use client';

import { motion } from 'framer-motion';
import { Crown, Target, Compass, Lightbulb, TrendingUp } from 'lucide-react';
import { SajuResult } from '@/lib/saju-calculator';

interface PatternAnalysisProps {
  result: SajuResult;
}

const PATTERN_TYPES = {
  jaeseong: {
    name: '재성격(財星格)',
    icon: Crown,
    color: 'from-green-500 to-emerald-600',
    textColor: 'text-green-400',
    description: '재물과 경제활동에 강점이 있으며, 사업과 실리추구에 유리합니다.',
    traits: ['재물운 강함', '경영 능력', '현실 감각', '실리 추구']
  },
  gwanseong: {
    name: '관성격(官星格)',
    icon: Crown,
    color: 'from-blue-500 to-cyan-600',
    textColor: 'text-blue-400',
    description: '명예와 지위를 중시하며, 공직이나 조직생활에 적합합니다.',
    traits: ['명예 중시', '리더십', '책임감', '사회성']
  },
  sikshang: {
    name: '식상격(食傷格)',
    icon: Crown,
    color: 'from-pink-500 to-rose-600',
    textColor: 'text-pink-400',
    description: '창의성과 표현력이 뛰어나며, 예술이나 창작 분야에 재능이 있습니다.',
    traits: ['창의력', '표현력', '예술 감각', '자유로움']
  },
  inseong: {
    name: '인성격(印星格)',
    icon: Crown,
    color: 'from-amber-500 to-orange-600',
    textColor: 'text-amber-400',
    description: '학문과 지식을 추구하며, 교육이나 연구 분야에 적합합니다.',
    traits: ['학습 능력', '사색적', '정신적 가치', '인내심']
  },
  normal: {
    name: '보통격(普通格)',
    icon: Crown,
    color: 'from-gray-500 to-slate-600',
    textColor: 'text-gray-400',
    description: '균형잡힌 사주로 다양한 분야에서 활동 가능합니다.',
    traits: ['균형잡힘', '융통성', '적응력', '안정성']
  }
};

export default function PatternAnalysis({ result }: PatternAnalysisProps) {
  const extResult = result as SajuResult & {
    pattern?: { type: string; name: string; description: string; strength: number };
    yongshin?: { primary: string; secondary: string; explanation: string };
    lifeDirection?: { career: string[]; relationships: string; wealth: string; health: string };
  };
  const pattern = extResult.pattern || {
    type: 'jaeseong',
    name: '재성격',
    description: '재물운이 강하여 경제활동에 유리합니다.',
    strength: 75
  };

  const yongshin = extResult.yongshin || {
    primary: '화(火)',
    secondary: '목(木)',
    explanation: '화 기운을 용신으로, 목 기운을 희신으로 활용하면 운세 강화에 도움이 됩니다.'
  };

  const direction = extResult.lifeDirection || {
    career: ['경영/사업', '금융/재무', '무역/유통'],
    relationships: '성실하고 신뢰를 바탕으로 한 관계가 중요합니다.',
    wealth: '꾸준한 재물 축적이 가능하며, 투자보다는 저축이 유리합니다.',
    health: '스트레스 관리가 중요하며, 규칙적인 생활이 건강에 도움됩니다.'
  };

  const patternConfig = PATTERN_TYPES[pattern.type as keyof typeof PATTERN_TYPES] || PATTERN_TYPES.normal;
  const PatternIcon = patternConfig.icon;

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">격국 및 용신 분석</h2>
        <p className="text-gray-400">사주의 격국 판정과 인생 방향</p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`bg-gradient-to-br ${patternConfig.color} rounded-xl p-6 mb-6`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <PatternIcon className="w-8 h-8 text-white" />
            <div>
              <h3 className="text-white text-2xl font-bold">{patternConfig.name}</h3>
              <p className="text-white/80 text-sm">격국 강도: {pattern.strength}%</p>
            </div>
          </div>
        </div>
        <p className="text-white leading-relaxed mb-4">{patternConfig.description}</p>
        <div className="flex flex-wrap gap-2">
          {patternConfig.traits.map((trait, idx) => (
            <span key={idx} className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">
              {trait}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-5 mb-6"
      >
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-5 h-5 text-purple-400" />
          <h3 className="text-purple-400 font-semibold">용신 및 희신</h3>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <span className="text-gray-400 text-sm">용신</span>
            <div className="text-white font-bold text-lg">{yongshin.primary}</div>
          </div>
          <div>
            <span className="text-gray-400 text-sm">희신</span>
            <div className="text-white font-bold text-lg">{yongshin.secondary}</div>
          </div>
        </div>
        <p className="text-gray-300 text-sm">{yongshin.explanation}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Compass className="w-5 h-5 text-blue-400" />
            <h4 className="text-blue-400 font-semibold">적합한 진로</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {direction.career.map((career, idx) => (
              <span key={idx} className="px-3 py-1 bg-blue-500/20 rounded-lg text-blue-300 text-sm">
                {career}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-pink-500/10 border border-pink-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-5 h-5 text-pink-400" />
            <h4 className="text-pink-400 font-semibold">대인관계</h4>
          </div>
          <p className="text-gray-300 text-sm">{direction.relationships}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <h4 className="text-green-400 font-semibold">재물운</h4>
            </div>
            <p className="text-gray-300 text-sm">{direction.wealth}</p>
          </div>

          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-red-400" />
              <h4 className="text-red-400 font-semibold">건강</h4>
            </div>
            <p className="text-gray-300 text-sm">{direction.health}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
