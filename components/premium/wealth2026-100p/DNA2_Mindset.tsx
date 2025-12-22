'use client';

import { motion } from 'framer-motion';
import { Brain, PiggyBank, TrendingUp } from 'lucide-react';
import { WEALTH_BY_DAY_STEM } from '@/lib/fortune-data/saju/wealth-content';

interface DNA2MindsetProps {
  dayStem: string;
}

export default function DNA2Mindset({ dayStem }: DNA2MindsetProps) {
  const data = WEALTH_BY_DAY_STEM[dayStem] || WEALTH_BY_DAY_STEM['갑'];
  const riskLevel = data.investmentProfile.riskTolerance;

  const getRiskInfo = () => {
    switch (riskLevel) {
      case 'high': return { label: '공격적', color: 'red', desc: '높은 수익을 위해 리스크를 감수하는 타입' };
      case 'medium': return { label: '균형적', color: 'yellow', desc: '리스크와 수익의 균형을 추구하는 타입' };
      default: return { label: '안정적', color: 'green', desc: '원금 보존을 최우선으로 하는 타입' };
    }
  };

  const riskInfo = getRiskInfo();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* 돈에 대한 마인드셋 */}
      <div className="p-6 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl border border-blue-800/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-blue-500/20 rounded-xl">
            <Brain className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-white">돈에 대한 마인드셋</h3>
        </div>
        <p className="text-slate-300 leading-relaxed text-lg">{data.moneyMindset}</p>
      </div>

      {/* 저축 조언 */}
      <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-emerald-500/20 rounded-xl">
            <PiggyBank className="w-6 h-6 text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold text-white">저축 조언</h3>
        </div>
        <p className="text-slate-300 leading-relaxed">{data.savingAdvice}</p>
      </div>

      {/* 투자 성향 */}
      <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-purple-500/20 rounded-xl">
            <TrendingUp className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-xl font-bold text-white">투자 성향</h3>
        </div>

        {/* 리스크 레벨 */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400">리스크 허용도</span>
            <span className={`px-3 py-1 bg-${riskInfo.color}-500/20 text-${riskInfo.color}-300 rounded-lg font-medium`}>
              {riskInfo.label}
            </span>
          </div>
          <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${
                riskLevel === 'high' ? 'from-red-500 to-orange-500 w-full' :
                riskLevel === 'medium' ? 'from-yellow-500 to-amber-500 w-2/3' :
                'from-green-500 to-emerald-500 w-1/3'
              }`}
            />
          </div>
          <p className="mt-2 text-sm text-slate-400">{riskInfo.desc}</p>
        </div>

        {/* 투자 타이밍 */}
        <p className="text-slate-300 leading-relaxed">{data.investmentProfile.investmentTiming}</p>
      </div>

      {/* 적합/부적합 자산 */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-5 bg-green-900/20 rounded-2xl border border-green-800/30">
          <h4 className="font-bold text-green-300 mb-3">추천 투자 자산</h4>
          <div className="space-y-2">
            {data.investmentProfile.idealAssets.map((asset, idx) => (
              <div key={idx} className="flex items-center gap-2 text-slate-300">
                <span className="w-2 h-2 bg-green-400 rounded-full" />
                {asset}
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 bg-red-900/20 rounded-2xl border border-red-800/30">
          <h4 className="font-bold text-red-300 mb-3">피해야 할 자산</h4>
          <div className="space-y-2">
            {data.investmentProfile.avoidAssets.map((asset, idx) => (
              <div key={idx} className="flex items-center gap-2 text-slate-300">
                <span className="w-2 h-2 bg-red-400 rounded-full" />
                {asset}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
