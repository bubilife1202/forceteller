'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Star, Skull, Sparkles, AlertTriangle } from 'lucide-react';

interface ShinsalMainProps {
  result: SajuResult;
}

const SHINSAL_INFO: Record<string, { category: 'noble' | 'caution'; brief: string }> = {
  천을귀인: { category: 'noble', brief: '귀인의 도움' },
  천덕귀인: { category: 'noble', brief: '덕과 복' },
  월덕귀인: { category: 'noble', brief: '매달 좋은 기운' },
  문창귀인: { category: 'noble', brief: '학문과 지혜' },
  학당귀인: { category: 'noble', brief: '학습 능력' },
  복성귀인: { category: 'noble', brief: '풍부한 복' },
  금여귀인: { category: 'noble', brief: '고귀한 수레' },
  역마살: { category: 'caution', brief: '이동과 변화' },
  도화살: { category: 'caution', brief: '매력과 인기' },
  화개살: { category: 'caution', brief: '예술과 영성' },
  홍염살: { category: 'caution', brief: '뛰어난 외모' },
  백호대살: { category: 'caution', brief: '강한 기운' },
  양인살: { category: 'caution', brief: '추진력과 결단' },
  겁살: { category: 'caution', brief: '재물 주의' },
  재살: { category: 'caution', brief: '재난 주의' },
  원진살: { category: 'caution', brief: '과거 인연' },
  고신살: { category: 'caution', brief: '고독과 통찰' },
  과숙살: { category: 'caution', brief: '이별 경험' },
  고란살: { category: 'caution', brief: '독립 성향' },
};

export default function ShinsalMain({ result }: ShinsalMainProps) {
  const nobles = result.shinsals.filter(s => {
    const info = SHINSAL_INFO[s.name];
    return s.type === 'good' || (info && info.category === 'noble');
  });

  const cautions = result.shinsals.filter(s => {
    const info = SHINSAL_INFO[s.name];
    return s.type === 'bad' || (info && info.category === 'caution');
  });

  const totalScore = Math.max(0, Math.min(100, 50 + (nobles.length * 12) - (cautions.length * 5)));

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <h2
          className="text-3xl font-bold gradient-text"
          style={{ fontFamily: "'Noto Serif KR', serif" }}
        >
          신살 분석
        </h2>
      </div>

      <p className="text-center text-slate-300 mb-10 leading-relaxed">
        신살(神殺)은 사주에 깃든 특별한 별의 기운입니다.
        <br />
        길신은 복과 행운을, 흉살은 주의사항과 시련을 알려줍니다.
      </p>

      <div className="glass rounded-2xl p-6 mb-8 border border-amber-400/30">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-amber-400">신살 종합 점수</h3>
          <div className="flex items-center gap-2">
            <div className="text-3xl font-bold gradient-text">{totalScore}</div>
            <div className="text-slate-400">/100</div>
          </div>
        </div>
        <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-500 to-orange-600"
            initial={{ width: 0 }}
            whileInView={{ width: `${totalScore}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <motion.div
          className="glass rounded-2xl p-6 border border-green-400/30"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-400">길신 (吉神)</h3>
              <p className="text-sm text-slate-400">행운을 가져다주는 별</p>
            </div>
          </div>

          <div className="text-center mb-5">
            <div className="text-4xl font-bold text-green-400">{nobles.length}개</div>
          </div>

          {nobles.length > 0 ? (
            <div className="space-y-2">
              {nobles.map((shinsal, i) => {
                const info = SHINSAL_INFO[shinsal.name];
                return (
                  <div
                    key={i}
                    className="bg-green-500/10 border border-green-500/30 rounded-lg p-3"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-slate-200 text-sm">{shinsal.name}</h4>
                      <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full">
                        길신
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs mb-1">{info?.brief || '복과 행운'}</p>
                    <p className="text-slate-500 text-xs line-clamp-1">{shinsal.desc}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-6 text-slate-500 text-sm">
              길신이 없습니다
            </div>
          )}
        </motion.div>

        <motion.div
          className="glass rounded-2xl p-6 border border-orange-400/30"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
              <Skull className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-orange-400">흉살 (凶殺)</h3>
              <p className="text-sm text-slate-400">주의해야 할 별</p>
            </div>
          </div>

          <div className="text-center mb-5">
            <div className="text-4xl font-bold text-orange-400">{cautions.length}개</div>
          </div>

          {cautions.length > 0 ? (
            <div className="space-y-2">
              {cautions.map((shinsal, i) => {
                const info = SHINSAL_INFO[shinsal.name];
                return (
                  <div
                    key={i}
                    className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-slate-200 text-sm">{shinsal.name}</h4>
                      <span className="text-xs px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded-full">
                        흉살
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs mb-1">{info?.brief || '주의 필요'}</p>
                    <p className="text-slate-500 text-xs line-clamp-1">{shinsal.desc}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-6 text-slate-500 text-sm">
              흉살이 없습니다
            </div>
          )}
        </motion.div>
      </div>

      <div className="glass rounded-2xl p-6 border border-purple-400/30">
        <h4 className="text-lg font-bold text-purple-400 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          신살 이해하기
        </h4>
        <div className="space-y-3 text-slate-300 text-sm">
          <p className="flex items-start gap-2">
            <span className="text-purple-400 flex-shrink-0">•</span>
            <span>
              길신이 많다고 무조건 좋은 것이 아닙니다. <strong>노력과 덕행</strong>이 함께해야 합니다.
            </span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-purple-400 flex-shrink-0">•</span>
            <span>
              흉살이 있다고 나쁜 것이 아닙니다. 오히려 그 분야의 <strong>전문가</strong>가 될 수 있습니다.
            </span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-purple-400 flex-shrink-0">•</span>
            <span>
              신살은 대운이나 세운에 따라 <strong>발동 시기</strong>가 다릅니다. 해당 시기에 더욱 주의하세요.
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
