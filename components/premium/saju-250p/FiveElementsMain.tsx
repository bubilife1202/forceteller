'use client';

import { motion } from 'framer-motion';
import { Droplet, Flame, Leaf, Coins, Mountain } from 'lucide-react';
import { SajuResult } from '@/lib/saju-calculator';

interface FiveElementsMainProps {
  result: SajuResult;
}

const ELEMENT_CONFIG = {
  목: { name: '목(木)', color: 'bg-green-500', icon: Leaf, textColor: 'text-green-400' },
  화: { name: '화(火)', color: 'bg-red-500', icon: Flame, textColor: 'text-red-400' },
  토: { name: '토(土)', color: 'bg-yellow-500', icon: Mountain, textColor: 'text-yellow-400' },
  금: { name: '금(金)', color: 'bg-gray-400', icon: Coins, textColor: 'text-gray-400' },
  수: { name: '수(水)', color: 'bg-blue-500', icon: Droplet, textColor: 'text-blue-400' },
};

export default function FiveElementsMain({ result }: FiveElementsMainProps) {
  const elements = result.elements;
  const total = elements.목 + elements.화 + elements.토 + elements.금 + elements.수;
  const maxCount = Math.max(elements.목, elements.화, elements.토, elements.금, elements.수);

  const getElementData = () => [
    { key: '목' as const, count: elements.목 },
    { key: '화' as const, count: elements.화 },
    { key: '토' as const, count: elements.토 },
    { key: '금' as const, count: elements.금 },
    { key: '수' as const, count: elements.수 },
  ];

  const excessive = getElementData().filter(e => e.count >= 3).map(e => e.key);
  const deficient = getElementData().filter(e => e.count === 0).map(e => e.key);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">오행 분석</h2>
        <p className="text-gray-400">사주의 오행 분포와 균형을 확인합니다</p>
      </div>

      <div className="space-y-4 mb-8">
        {getElementData().map((element, index) => {
          const config = ELEMENT_CONFIG[element.key];
          const Icon = config.icon;
          const percentage = total > 0 ? (element.count / total) * 100 : 0;
          const widthPercent = maxCount > 0 ? (element.count / maxCount) * 100 : 0;

          return (
            <motion.div key={element.key} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className={`w-5 h-5 ${config.textColor}`} />
                  <span className="text-white font-semibold">{config.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 text-sm">{percentage.toFixed(1)}%</span>
                  <span className="text-white font-bold w-8 text-right">{element.count}</span>
                </div>
              </div>
              <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                <motion.div className={`h-full ${config.color}`} initial={{ width: 0 }} animate={{ width: `${widthPercent}%` }} transition={{ duration: 1, ease: 'easeOut', delay: index * 0.1 + 0.2 }} />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {excessive.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
            <h3 className="text-red-400 font-semibold mb-2">과다 오행</h3>
            <div className="space-y-1">
              {excessive.map((elem) => (
                <div key={elem} className="text-white">{ELEMENT_CONFIG[elem].name}</div>
              ))}
            </div>
          </motion.div>
        )}
        {deficient.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
            <h3 className="text-blue-400 font-semibold mb-2">부족 오행</h3>
            <div className="space-y-1">
              {deficient.map((elem) => (
                <div key={elem} className="text-white">{ELEMENT_CONFIG[elem].name}</div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
