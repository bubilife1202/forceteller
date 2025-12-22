'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Heart, Zap, TrendingUp, TrendingDown } from 'lucide-react';

interface HapchungMainProps {
  result: SajuResult;
}

export default function HapchungMain({ result }: HapchungMainProps) {
  const categorized = {
    cheonganHap: result.hapchung.filter(h => h.name.includes('천간') && h.name.includes('합')),
    jijiHap: result.hapchung.filter(h => !h.name.includes('천간') && h.name.includes('합') && !h.name.includes('충')),
    chung: result.hapchung.filter(h => h.name.includes('충')),
    hyung: result.hapchung.filter(h => h.name.includes('형')),
    others: result.hapchung.filter(h => !h.name.includes('합') && !h.name.includes('충') && !h.name.includes('형')),
  };

  const totalHap = categorized.cheonganHap.length + categorized.jijiHap.length;
  const totalChung = categorized.chung.length;

  const harmonyScore = Math.max(0, Math.min(100, 60 + (totalHap * 15) - (totalChung * 10)));

  const categories = [
    {
      id: 'hap',
      title: '합 (合)',
      subtitle: '만남·결합·협력',
      icon: Heart,
      color: 'from-pink-500 to-rose-500',
      count: totalHap,
      items: [...categorized.cheonganHap, ...categorized.jijiHap],
      isPositive: true,
    },
    {
      id: 'chung',
      title: '충 (沖)',
      subtitle: '충돌·변동·이동',
      icon: Zap,
      color: 'from-orange-500 to-red-500',
      count: totalChung,
      items: categorized.chung,
      isPositive: false,
    },
  ];

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
    >
      <h2
        className="text-3xl font-bold text-center mb-8 gradient-text"
        style={{ fontFamily: "'Noto Serif KR', serif" }}
      >
        합충형파해 분석
      </h2>

      <p className="text-center text-slate-300 mb-10 leading-relaxed">
        사주 내부에서 천간과 지지가 서로 작용하는 특별한 관계를 분석합니다.
      </p>

      <div className="glass rounded-2xl p-6 mb-8 border border-indigo-400/30">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-indigo-400">조화 점수</h3>
          <div className="flex items-center gap-2">
            <div className="text-3xl font-bold gradient-text">{harmonyScore}</div>
            <div className="text-slate-400">/100</div>
          </div>
        </div>
        <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden mb-3">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
            initial={{ width: 0 }}
            whileInView={{ width: `${harmonyScore}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
          />
        </div>
        <p className="text-slate-400 text-sm text-center">
          {harmonyScore >= 75 ? '매우 조화로운 사주입니다' :
           harmonyScore >= 60 ? '전체적으로 안정적입니다' :
           harmonyScore >= 45 ? '변화가 있는 사주입니다' :
           '역동적이고 변화무쌍한 사주입니다'}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {categories.map((cat, index) => {
          const Icon = cat.icon;

          return (
            <motion.div
              key={cat.id}
              className={`glass rounded-2xl p-6 border ${
                cat.isPositive ? 'border-pink-400/30' : 'border-orange-400/30'
              }`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${cat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-100">{cat.title}</h3>
                  <p className="text-slate-400 text-sm">{cat.subtitle}</p>
                </div>
                <div className="text-3xl font-bold gradient-text">{cat.count}</div>
              </div>

              {cat.count > 0 ? (
                <div className="space-y-2">
                  {cat.items.map((item, i) => (
                    <div
                      key={i}
                      className="bg-slate-800/50 rounded-lg p-3 border border-slate-700"
                    >
                      <h4 className="font-semibold text-slate-200 text-sm mb-1">{item.name}</h4>
                      <p className="text-slate-400 text-xs">{item.desc}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-slate-500 text-sm">
                  해당 없음
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {(categorized.hyung.length > 0 || categorized.others.length > 0) && (
        <div className="glass rounded-2xl p-6 border border-purple-400/30">
          <h3 className="text-lg font-bold text-purple-400 mb-4">기타 관계</h3>
          <div className="space-y-2">
            {[...categorized.hyung, ...categorized.others].map((item, i) => (
              <div
                key={i}
                className="bg-slate-800/50 rounded-lg p-3 border border-slate-700"
              >
                <h4 className="font-semibold text-slate-200 text-sm mb-1">{item.name}</h4>
                <p className="text-slate-400 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 grid md:grid-cols-2 gap-4">
        <div className="glass rounded-xl p-5 border border-green-400/30">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <h4 className="font-semibold text-green-400">긍정 효과</h4>
          </div>
          <ul className="space-y-1 text-slate-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-green-400">•</span>
              <span>합이 많으면 협력과 인연이 좋습니다</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">•</span>
              <span>충이 적당하면 변화의 기회가 됩니다</span>
            </li>
          </ul>
        </div>

        <div className="glass rounded-xl p-5 border border-amber-400/30">
          <div className="flex items-center gap-2 mb-3">
            <TrendingDown className="w-5 h-5 text-amber-400" />
            <h4 className="font-semibold text-amber-400">주의사항</h4>
          </div>
          <ul className="space-y-1 text-slate-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-amber-400">•</span>
              <span>합이 많으면 주도권을 잃을 수 있습니다</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400">•</span>
              <span>충이 많으면 안정성이 떨어집니다</span>
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
