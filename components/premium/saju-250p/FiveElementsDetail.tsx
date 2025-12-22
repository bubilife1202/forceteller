'use client';

import { motion } from 'framer-motion';
import { Droplet, Flame, Leaf, Coins, Mountain, ArrowRight } from 'lucide-react';
import { SajuResult } from '@/lib/saju-calculator';

interface FiveElementsDetailProps {
  result: SajuResult;
}

const ELEMENT_DETAILS = {
  wood: {
    name: '목(木)',
    icon: Leaf,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    meaning: '성장, 창의성, 확장',
    impact: '진취적이고 창의적인 성향, 발전과 성장을 추구',
    remedy: ['녹색 옷 착용', '식물 키우기', '목재 가구 사용']
  },
  fire: {
    name: '화(火)',
    icon: Flame,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    meaning: '열정, 명예, 활동',
    impact: '열정적이고 활발한 성향, 명예와 인정을 중시',
    remedy: ['붉은색 계열 활용', '햇빛 쬐기', '활동적인 운동']
  },
  earth: {
    name: '토(土)',
    icon: Mountain,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    meaning: '안정, 신뢰, 중재',
    impact: '안정적이고 신뢰감 있는 성향, 중재와 조화를 추구',
    remedy: ['황토색 활용', '도자기 사용', '땅과 접촉']
  },
  metal: {
    name: '금(金)',
    icon: Coins,
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/10',
    borderColor: 'border-gray-500/30',
    meaning: '결단, 정의, 수확',
    impact: '단호하고 정의로운 성향, 결단력과 책임감',
    remedy: ['금속 액세서리', '흰색/금색 활용', '정리정돈']
  },
  water: {
    name: '수(水)',
    icon: Droplet,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    meaning: '지혜, 유연성, 소통',
    impact: '지혜롭고 유연한 성향, 적응력과 소통능력',
    remedy: ['물 마시기', '검정/파란색 활용', '수영/목욕']
  }
};

export default function FiveElementsDetail({ result }: FiveElementsDetailProps) {
  const extResult = result as SajuResult & { elementAnalysis?: { dominant: string; weak: string; impact: string; remedy: string[] } };
  const analysis = extResult.elementAnalysis || {
    dominant: 'wood',
    weak: 'fire',
    impact: '목 기운이 강하여 성장과 발전에 유리하나, 화 기운이 약해 추진력이 부족할 수 있습니다.',
    remedy: ['화 기운 보충 필요', '붉은색 계열 활용', '활동적인 생활']
  };

  const elementKeys = Object.keys(ELEMENT_DETAILS) as Array<keyof typeof ELEMENT_DETAILS>;

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">오행 상세 분석</h2>
        <p className="text-gray-400">각 오행이 삶에 미치는 영향과 보완 방법</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-5 mb-6"
      >
        <h3 className="text-purple-400 font-semibold mb-3">종합 분석</h3>
        <p className="text-white leading-relaxed mb-4">{analysis.impact}</p>
        <div className="flex items-center gap-2 text-pink-400">
          <ArrowRight className="w-4 h-4" />
          <span className="text-sm">주요 오행: {ELEMENT_DETAILS[analysis.dominant as keyof typeof ELEMENT_DETAILS].name}</span>
        </div>
      </motion.div>

      <div className="space-y-4 mb-6">
        {elementKeys.map((key, index) => {
          const detail = ELEMENT_DETAILS[key];
          const Icon = detail.icon;

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${detail.bgColor} border ${detail.borderColor} rounded-xl p-4`}
            >
              <div className="flex items-center gap-2 mb-3">
                <Icon className={`w-5 h-5 ${detail.color}`} />
                <h4 className={`font-bold ${detail.color}`}>{detail.name}</h4>
                <span className="text-gray-400 text-sm ml-auto">{detail.meaning}</span>
              </div>
              <p className="text-gray-300 text-sm mb-2">{detail.impact}</p>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gray-800/50 rounded-xl p-5 border border-gray-700"
      >
        <h3 className="text-white font-semibold mb-3">보완 방법</h3>
        <div className="space-y-2">
          {analysis.remedy.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
              <span className="text-gray-300">{item}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
