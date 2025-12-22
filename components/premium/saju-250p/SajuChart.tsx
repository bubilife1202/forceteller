'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';

interface SajuChartProps {
  result: SajuResult;
}

const ELEMENT_COLORS = {
  목: 'from-emerald-600 to-green-500',
  화: 'from-rose-600 to-red-500',
  토: 'from-amber-600 to-yellow-500',
  금: 'from-slate-400 to-gray-300',
  수: 'from-blue-600 to-cyan-500'
};

const PILLAR_LABELS = [
  { ko: '시', en: 'Hour', desc: '나의 말년' },
  { ko: '일', en: 'Day', desc: '나 자신' },
  { ko: '월', en: 'Month', desc: '나의 청년기' },
  { ko: '년', en: 'Year', desc: '나의 유년기' }
];

export default function SajuChart({ result }: SajuChartProps) {
  const pillars = [result.hour, result.day, result.month, result.year];

  return (
    <div className="min-h-screen bg-slate-950 py-16 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">사주 원국</h1>
          <p className="text-slate-400 text-lg">당신의 타고난 사주팔자</p>
        </motion.div>

        {/* Saju Chart */}
        <div className="grid grid-cols-4 gap-6 mb-12">
          {pillars.map((pillar, idx) => {
            const label = PILLAR_LABELS[idx];
            const stemColor = ELEMENT_COLORS[pillar.stem.element as keyof typeof ELEMENT_COLORS];
            const branchColor = ELEMENT_COLORS[pillar.branch.element as keyof typeof ELEMENT_COLORS];
            const isYinStem = pillar.stem.yinyang === '-';
            const branchIndex = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'].indexOf(pillar.branch.ko);
            const isYinBranch = branchIndex % 2 === 1;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                className="relative"
              >
                {/* Pillar Label */}
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-white mb-1">{label.ko}柱</div>
                  <div className="text-sm text-slate-400">{label.desc}</div>
                </div>

                {/* Stem (천간) */}
                <div className="mb-3">
                  <div className={`relative bg-gradient-to-br ${stemColor} rounded-2xl p-8 shadow-2xl overflow-hidden`}>
                    {/* Yin/Yang Indicator */}
                    <div className="absolute top-3 right-3 px-2 py-1 bg-black/30 rounded-full text-xs text-white">
                      {isYinStem ? '음' : '양'}
                    </div>

                    <div className="text-center">
                      <div className="text-6xl font-bold text-white mb-2">{pillar.stem.ko}</div>
                      <div className="text-2xl text-white/80">{pillar.stem.cn}</div>
                      <div className="text-sm text-white/70 mt-2">{pillar.stem.element}</div>
                    </div>

                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  <div className="text-center mt-2 text-sm text-slate-400">천간 (天干)</div>
                </div>

                {/* Branch (지지) */}
                <div>
                  <div className={`relative bg-gradient-to-br ${branchColor} rounded-2xl p-8 shadow-2xl overflow-hidden`}>
                    {/* Yin/Yang Indicator */}
                    <div className="absolute top-3 right-3 px-2 py-1 bg-black/30 rounded-full text-xs text-white">
                      {isYinBranch ? '음' : '양'}
                    </div>

                    <div className="text-center">
                      <div className="text-6xl font-bold text-white mb-2">{pillar.branch.ko}</div>
                      <div className="text-2xl text-white/80">{pillar.branch.cn}</div>
                      <div className="text-sm text-white/70 mt-2">
                        {pillar.branch.element} · {pillar.branch.animal}
                      </div>
                    </div>

                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  <div className="text-center mt-2 text-sm text-slate-400">지지 (地支)</div>
                </div>

                {/* Connecting Line */}
                {idx < 3 && (
                  <div className="absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-purple-500 to-transparent" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-8"
        >
          <h3 className="text-xl font-bold text-white mb-4">오행 색상</h3>
          <div className="flex flex-wrap gap-4">
            {Object.entries(ELEMENT_COLORS).map(([element, gradient]) => (
              <div key={element} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${gradient}`} />
                <span className="text-slate-300">{element}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
