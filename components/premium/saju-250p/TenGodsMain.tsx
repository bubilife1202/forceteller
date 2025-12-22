'use client';

import { motion } from 'framer-motion';
import { Users, Sparkles, DollarSign, Shield, BookOpen } from 'lucide-react';
import { SajuResult } from '@/lib/saju-calculator';

interface TenGodsMainProps {
  result: SajuResult;
}

const TEN_GODS_CONFIG = {
  bijie: {
    name: '비겁(比劫)',
    icon: Users,
    color: 'from-purple-500 to-purple-600',
    textColor: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    meaning: '형제, 친구, 경쟁',
    description: '자립심, 독립성, 경쟁의식이 강하며 협동과 경쟁을 통해 성장합니다.'
  },
  sikshang: {
    name: '식상(食傷)',
    icon: Sparkles,
    color: 'from-pink-500 to-pink-600',
    textColor: 'text-pink-400',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/30',
    meaning: '표현, 재능, 창의',
    description: '표현력, 창의성, 재능이 뛰어나며 예술적 감각과 표현 욕구가 강합니다.'
  },
  jaeseong: {
    name: '재성(財星)',
    icon: DollarSign,
    color: 'from-green-500 to-green-600',
    textColor: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    meaning: '재물, 경제, 실리',
    description: '재물운, 경제관념이 발달하며 현실적이고 실리적인 성향이 강합니다.'
  },
  gwanseong: {
    name: '관성(官星)',
    icon: Shield,
    color: 'from-blue-500 to-blue-600',
    textColor: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    meaning: '명예, 지위, 책임',
    description: '명예, 지위, 책임감이 중요하며 사회적 인정과 규율을 중시합니다.'
  },
  inseong: {
    name: '인성(印星)',
    icon: BookOpen,
    color: 'from-amber-500 to-amber-600',
    textColor: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    meaning: '학문, 지식, 보호',
    description: '학문, 지식 추구에 뛰어나며 정신적 가치와 명예를 중시합니다.'
  }
};

export default function TenGodsMain({ result }: TenGodsMainProps) {
  const extResult = result as SajuResult & {
    tenGods?: { bijie: number; sikshang: number; jaeseong: number; gwanseong: number; inseong: number };
    tenGodsAnalysis?: { dominant: string; characteristics: string };
  };
  const tenGods = extResult.tenGods || {
    bijie: 2,
    sikshang: 1,
    jaeseong: 2,
    gwanseong: 2,
    inseong: 1
  };

  const analysis = extResult.tenGodsAnalysis || {
    dominant: 'bijie',
    characteristics: '비겁이 강하여 독립적이고 자주적인 성향이 강합니다.'
  };

  const total = tenGods.bijie + tenGods.sikshang + tenGods.jaeseong + tenGods.gwanseong + tenGods.inseong;
  const maxCount = Math.max(tenGods.bijie, tenGods.sikshang, tenGods.jaeseong, tenGods.gwanseong, tenGods.inseong);

  const getTenGodsData = () => [
    { key: 'bijie', count: tenGods.bijie },
    { key: 'sikshang', count: tenGods.sikshang },
    { key: 'jaeseong', count: tenGods.jaeseong },
    { key: 'gwanseong', count: tenGods.gwanseong },
    { key: 'inseong', count: tenGods.inseong },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">십신 분석</h2>
        <p className="text-gray-400">사주의 십신 분포와 성향을 확인합니다</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-xl p-5 mb-6"
      >
        <h3 className="text-indigo-400 font-semibold mb-2">주요 특성</h3>
        <p className="text-white">{analysis.characteristics}</p>
      </motion.div>

      <div className="grid gap-4 mb-6">
        {getTenGodsData().map((item, index) => {
          const config = TEN_GODS_CONFIG[item.key as keyof typeof TEN_GODS_CONFIG];
          const Icon = config.icon;
          const percentage = (item.count / total) * 100;
          const widthPercent = (item.count / maxCount) * 100;

          return (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${config.bgColor} border ${config.borderColor} rounded-xl p-4`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${config.color}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-bold ${config.textColor}`}>{config.name}</h4>
                    <p className="text-gray-400 text-xs">{config.meaning}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold text-xl">{item.count}</div>
                  <div className="text-gray-400 text-sm">{percentage.toFixed(0)}%</div>
                </div>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-2">
                <motion.div
                  className={`h-full bg-gradient-to-r ${config.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${widthPercent}%` }}
                  transition={{ duration: 1, ease: 'easeOut', delay: index * 0.1 + 0.2 }}
                />
              </div>
              <p className="text-gray-300 text-sm">{config.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
