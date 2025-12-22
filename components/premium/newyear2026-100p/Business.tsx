'use client';

import { motion } from 'framer-motion';
import { Building, Rocket, Store, MessageSquare } from 'lucide-react';
import { NEWYEAR_2026_DATA } from './data';

interface BusinessProps {
  dayStem: string;
}

export default function Business({ dayStem }: BusinessProps) {
  const data = NEWYEAR_2026_DATA[dayStem];

  if (!data) {
    return <div className="text-slate-400">데이터를 찾을 수 없습니다.</div>;
  }

  // Extract business-related info from businessLuck field
  const getBusinessSuitability = () => {
    const luck = data.businessLuck;
    if (luck.includes('교육') || luck.includes('콘텐츠') || luck.includes('서비스')) {
      return ['교육업', '콘텐츠 제작', '서비스업', '컨설팅'];
    }
    if (luck.includes('부동산') || luck.includes('건설')) {
      return ['부동산업', '건설업', '인테리어', '중개업'];
    }
    if (luck.includes('중개') || luck.includes('상담')) {
      return ['중개업', '상담업', '서비스업', 'SNS 마케팅'];
    }
    if (luck.includes('무역') || luck.includes('투자')) {
      return ['해외 무역', '온라인 사업', '투자 관련', '전자상거래'];
    }
    if (luck.includes('프리미엄')) {
      return ['프리미엄 서비스', '컨설팅', '고급 상품', '전문 서비스'];
    }
    return ['서비스업', '상담업', '교육업', '자영업'];
  };

  const suitableBusinessTypes = getBusinessSuitability();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-8 shadow-2xl border border-slate-800"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Building className="w-6 h-6 text-blue-400" />
            <Rocket className="w-5 h-5 text-cyan-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-1">사업/창업운</h2>
          <p className="text-slate-400 text-sm">비즈니스와 창업 기운</p>
        </div>
      </div>

      {/* Business Luck Description */}
      <div className="mb-6 p-5 bg-slate-800/50 rounded-xl border border-slate-700">
        <div className="flex items-center gap-2 mb-3">
          <Store className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg font-semibold text-white">사업운 개요</h3>
        </div>
        <p className="text-slate-300 leading-relaxed">{data.businessLuck}</p>
      </div>

      {/* Suitable Business Types */}
      <div className="mb-6 p-5 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-xl border border-blue-700/50">
        <div className="flex items-center gap-2 mb-4">
          <Rocket className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">유리한 사업 분야</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {suitableBusinessTypes.map((type, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800/60 rounded-lg p-3 border border-slate-700"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400" />
                <span className="text-slate-200 text-sm font-medium">{type}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Business Advice */}
      <div className="p-5 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-xl border border-cyan-700/50">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-semibold text-white">창업 조언</h3>
        </div>
        <p className="text-cyan-100 leading-relaxed font-medium">
          {data.careerScore >= 70
            ? '올해는 창업을 고려해볼 만한 시기입니다. 충분한 준비와 시장 조사를 거쳐 신중하게 결정하세요. 초기 자본과 운영 계획을 철저히 세우는 것이 중요합니다.'
            : '창업보다는 현재 직장에서 경험과 자본을 축적하는 것이 좋습니다. 부업이나 소규모 프로젝트로 시작하여 시장을 테스트해보세요. 급하게 서두르지 마세요.'}
        </p>
      </div>
    </motion.div>
  );
}
