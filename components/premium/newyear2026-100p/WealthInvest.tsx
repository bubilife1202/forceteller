'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Target, CheckCircle2, XCircle, Lightbulb, BarChart3 } from 'lucide-react';
import { NEWYEAR_2026_DATA, YEAR_RELATION } from './data';

interface WealthInvestProps {
  dayStem: string;
}

// 일간별 추천 투자 자산
const INVEST_ASSETS: Record<string, {
  recommended: string[];
  avoid: string[];
}> = {
  '갑': { recommended: ['부동산 장기투자', '성장주', '교육 관련 펀드'], avoid: ['고위험 파생상품', '단기 투기'] },
  '을': { recommended: ['분산 투자', '소액 다중 투자', '중개 플랫폼'], avoid: ['단일 종목 집중', '레버리지'] },
  '병': { recommended: ['현금 보유', '금', '안전 자산'], avoid: ['공동 투자', '동업', '과감한 투자'] },
  '정': { recommended: ['적금', '자기계발', '안전 채권'], avoid: ['친구 소개 투자', '고수익 상품', '투기'] },
  '무': { recommended: ['부동산', '토지', '실물 자산', '건설주'], avoid: ['과도한 레버리지'] },
  '기': { recommended: ['소형 부동산', '배당주', '적립식 펀드'], avoid: ['단기 매매', '투기'] },
  '경': { recommended: ['예금', '적금', '국채', '안전 자산'], avoid: ['위험 자산', '신규 투자', '대출 투자'] },
  '신': { recommended: ['가치주', '금', '예술품', '프리미엄 자산'], avoid: ['저가 매수', '단기 매매'] },
  '임': { recommended: ['해외 주식', 'ETF', '외화 자산', '다중 포트폴리오'], avoid: ['과도한 분산', '관리 불가능한 투자'] },
  '계': { recommended: ['적금', '연금', '배당주', '안전 자산'], avoid: ['단기 투기', '고위험 상품'] }
};

export default function WealthInvest({ dayStem }: WealthInvestProps) {
  const data = NEWYEAR_2026_DATA[dayStem];
  const assets = INVEST_ASSETS[dayStem];
  const yearRelation = YEAR_RELATION[dayStem];

  if (!data || !assets) return null;

  return (
    <motion.section
      className="glass-strong rounded-3xl p-6 md:p-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20">
          <TrendingUp className="w-7 h-7 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            투자 & 재테크
          </h2>
          <p className="text-slate-400 text-sm mt-1">2026년 투자 전략과 자산 배분</p>
        </div>
      </div>

      {/* Year Relation Context */}
      <div className="glass rounded-2xl p-6 mb-6 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/20">
        <div className="flex items-center gap-2 text-purple-400 mb-3">
          <BarChart3 className="w-5 h-5" />
          <h3 className="font-semibold">올해 운세: {yearRelation?.relation}</h3>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed mb-2">{yearRelation?.description}</p>
        <div className="flex items-center gap-2 mt-3">
          <span className="px-2 py-1 rounded bg-purple-500/20 text-purple-300 text-xs font-semibold">
            {yearRelation?.element}
          </span>
          <span className="px-2 py-1 rounded bg-purple-500/20 text-purple-300 text-xs font-semibold">
            종합점수 {yearRelation?.score}점
          </span>
        </div>
      </div>

      {/* Investment Advice */}
      <div className="glass rounded-2xl p-6 mb-6 border border-emerald-500/30">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/20 flex-shrink-0">
            <Lightbulb className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-bold text-emerald-300 mb-2">📊 투자 조언</h3>
            <p className="text-slate-300 leading-relaxed">{data.investAdvice}</p>
          </div>
        </div>
      </div>

      {/* Asset Lists */}
      <div className="grid grid-cols-1 gap-6">
        <div className="glass rounded-2xl p-6 bg-gradient-to-br from-emerald-500/5 to-teal-500/5">
          <div className="flex items-center gap-2 text-emerald-400 mb-4">
            <Target className="w-5 h-5" />
            <h3 className="font-semibold">추천 투자 자산</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {assets.recommended.map((asset, i) => (
              <motion.div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }} whileHover={{ scale: 1.02 }}>
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <p className="text-emerald-300 font-semibold">{asset}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="glass rounded-2xl p-6 bg-gradient-to-br from-rose-500/5 to-red-500/5">
          <div className="flex items-center gap-2 text-rose-400 mb-4">
            <XCircle className="w-5 h-5" />
            <h3 className="font-semibold">피해야 할 투자</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {assets.avoid.map((asset, i) => (
              <motion.div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20"
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }} whileHover={{ scale: 1.02 }}>
                <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                <p className="text-rose-300 font-semibold">{asset}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
