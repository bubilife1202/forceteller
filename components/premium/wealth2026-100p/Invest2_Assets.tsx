'use client';

import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Building, TrendingUp, Coins, Landmark } from 'lucide-react';
import { WEALTH_2026_BY_STEM } from './data';

interface Invest2AssetsProps {
  dayStem: string;
}

export default function Invest2Assets({ dayStem }: Invest2AssetsProps) {
  const data = WEALTH_2026_BY_STEM[dayStem] || WEALTH_2026_BY_STEM['갑'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* 추천 자산 */}
      <div className="p-6 bg-green-900/20 rounded-2xl border border-green-800/30">
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle className="w-6 h-6 text-green-400" />
          <h3 className="text-xl font-bold text-green-300">2026년 추천 투자 자산</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {data.bestAssets.map((asset, idx) => (
            <div key={idx} className="p-4 bg-green-800/20 rounded-xl flex items-center gap-3">
              <span className="w-8 h-8 bg-green-500/30 text-green-300 rounded-lg flex items-center justify-center">
                {idx + 1}
              </span>
              <span className="text-slate-200 font-medium">{asset}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 피해야 할 자산 */}
      <div className="p-6 bg-red-900/20 rounded-2xl border border-red-800/30">
        <div className="flex items-center gap-3 mb-6">
          <XCircle className="w-6 h-6 text-red-400" />
          <h3 className="text-xl font-bold text-red-300">2026년 피해야 할 투자</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {data.avoidAssets.map((asset, idx) => (
            <div key={idx} className="p-4 bg-red-800/20 rounded-xl flex items-center gap-3">
              <span className="w-8 h-8 bg-red-500/30 text-red-300 rounded-lg flex items-center justify-center">
                ✕
              </span>
              <span className="text-slate-200">{asset}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 자산별 가이드 */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-5 bg-slate-800/50 rounded-2xl border border-slate-700">
          <Building className="w-6 h-6 text-amber-400 mb-3" />
          <h4 className="font-bold text-white mb-2">부동산</h4>
          <p className="text-slate-400 text-sm">
            {data.bestAssets.some(a => a.includes('부동산')) ?
              '올해 부동산 투자 적기입니다. 장기 보유 목적으로 매수하세요.' :
              '부동산은 신중하게. 급매물이 아니면 관망하세요.'}
          </p>
        </div>
        <div className="p-5 bg-slate-800/50 rounded-2xl border border-slate-700">
          <TrendingUp className="w-6 h-6 text-blue-400 mb-3" />
          <h4 className="font-bold text-white mb-2">주식</h4>
          <p className="text-slate-400 text-sm">
            {data.bestAssets.some(a => a.includes('주')) ?
              '우량주 위주로 분할 매수하세요. 장기 투자가 유리합니다.' :
              '주식 투자는 소액으로만. 단타는 피하세요.'}
          </p>
        </div>
        <div className="p-5 bg-slate-800/50 rounded-2xl border border-slate-700">
          <Coins className="w-6 h-6 text-yellow-400 mb-3" />
          <h4 className="font-bold text-white mb-2">금/원자재</h4>
          <p className="text-slate-400 text-sm">
            {data.bestAssets.some(a => a.includes('금')) ?
              '안전자산으로 금 투자 추천. 포트폴리오의 10-20% 배분하세요.' :
              '금은 소량만 보유하세요.'}
          </p>
        </div>
        <div className="p-5 bg-slate-800/50 rounded-2xl border border-slate-700">
          <Landmark className="w-6 h-6 text-green-400 mb-3" />
          <h4 className="font-bold text-white mb-2">예금/채권</h4>
          <p className="text-slate-400 text-sm">
            {data.bestAssets.some(a => a.includes('적금') || a.includes('예금')) ?
              '안정적인 이자 수입을 위해 예금 비중을 높이세요.' :
              '예금은 비상금 정도만 유지하세요.'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
