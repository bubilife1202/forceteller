'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Star, Skull, Shield, Flame, Briefcase, Heart } from 'lucide-react';

interface ShinsalDetailProps {
  result: SajuResult;
}

const getDetail = (name: string) => {
  const defaults = {
    activation: '이 신살의 기운을 활용하면 좋은 일이 생깁니다.',
    caution: '과신하지 말고 꾸준히 노력하세요.',
    career: '당신의 강점을 살릴 수 있는 분야',
    life: '이 기운을 긍정적으로 활용하세요.',
  };

  const details: Record<string, typeof defaults> = {
    천을귀인: { activation: '귀인의 도움을 받습니다. 신앙이나 철학을 가까이하세요.', caution: '의존하지 말고 스스로 노력하세요.', career: '교육, 종교, 상담, 공직', life: '덕을 쌓고 겸손하게 살아가세요.' },
    역마살: { activation: '이동수가 강합니다. 여행, 이사, 해외 진출이 길합니다.', caution: '너무 자주 옮기면 뿌리를 못 내립니다.', career: '여행업, 무역, 운송, 항공', life: '변화를 두려워하지 마세요.' },
    도화살: { activation: '매력과 인기가 있습니다. 예술이나 대중 앞에 서는 일이 좋습니다.', caution: '이성 문제를 조심하세요.', career: '연예인, 예술가, 방송인', life: '외모와 품격을 갖추되 내실도 다지세요.' },
  };

  return details[name] || defaults;
};

export default function ShinsalDetail({ result }: ShinsalDetailProps) {
  const nobles = result.shinsals.filter(s => s.type === 'good');
  const cautions = result.shinsals.filter(s => s.type === 'bad');

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
        신살 상세 해석
      </h2>

      <p className="text-center text-slate-300 mb-10 leading-relaxed">
        각 신살이 당신에게 어떤 영향을 주는지,
        <br />
        어떻게 활용하고 대처해야 하는지 자세히 안내합니다.
      </p>

      {nobles.length > 0 && (
        <div className="mb-10">
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-green-400">길신 상세</h3>
          </motion.div>

          <div className="space-y-6">
            {nobles.map((shinsal, index) => {
              const detail = getDetail(shinsal.name);

              return (
                <motion.div
                  key={index}
                  className="glass rounded-2xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center text-2xl">
                      ⭐
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-100 mb-2">{shinsal.name}</h4>
                      <p className="text-slate-300 text-sm leading-relaxed">{shinsal.desc}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
                      <h5 className="font-semibold text-emerald-400 mb-2 flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        활용 방법
                      </h5>
                      <p className="text-slate-300 text-sm">{detail.activation}</p>
                    </div>

                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                      <h5 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
                        <Flame className="w-4 h-4" />
                        주의사항
                      </h5>
                      <p className="text-slate-300 text-sm">{detail.caution}</p>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                      <h5 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        적합 직업
                      </h5>
                      <p className="text-slate-300 text-sm">{detail.career}</p>
                    </div>

                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
                      <h5 className="font-semibold text-purple-400 mb-2 flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        인생 조언
                      </h5>
                      <p className="text-slate-300 text-sm">{detail.life}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {cautions.length > 0 && (
        <div>
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <Skull className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-orange-400">흉살 상세</h3>
          </motion.div>

          <div className="space-y-6">
            {cautions.map((shinsal, index) => {
              const detail = getDetail(shinsal.name);

              return (
                <motion.div
                  key={index}
                  className="glass rounded-2xl p-6 border border-red-400/20"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-2xl">
                      ⚠️
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-100 mb-2">{shinsal.name}</h4>
                      <p className="text-slate-300 text-sm leading-relaxed">{shinsal.desc}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
                      <h5 className="font-semibold text-orange-400 mb-2 flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        극복 방법
                      </h5>
                      <p className="text-slate-300 text-sm">{detail.activation}</p>
                    </div>

                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                      <h5 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                        <Flame className="w-4 h-4" />
                        특별 주의
                      </h5>
                      <p className="text-slate-300 text-sm">{detail.caution}</p>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                      <h5 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        역이용 직업
                      </h5>
                      <p className="text-slate-300 text-sm">{detail.career}</p>
                    </div>

                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
                      <h5 className="font-semibold text-purple-400 mb-2 flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        대처 조언
                      </h5>
                      <p className="text-slate-300 text-sm">{detail.life}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {nobles.length === 0 && cautions.length === 0 && (
        <div className="glass rounded-2xl p-10 text-center">
          <div className="text-6xl mb-4">✨</div>
          <h3 className="text-2xl font-bold text-slate-200 mb-3">
            신살이 없는 깨끗한 사주
          </h3>
          <p className="text-slate-300 leading-relaxed">
            특별한 신살이 없어 평범하고 안정적인 삶을 살아갑니다.
          </p>
        </div>
      )}
    </motion.div>
  );
}
