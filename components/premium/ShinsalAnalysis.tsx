'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Star, Skull, Shield, Flame } from 'lucide-react';

interface ShinsalAnalysisProps {
  result: SajuResult;
}

export default function ShinsalAnalysis({ result }: ShinsalAnalysisProps) {
  // 길신과 흉살 분류
  const goodShinsals = result.shinsals.filter((s) => s.type === 'good');
  const badShinsals = result.shinsals.filter((s) => s.type === 'bad');

  // 주요 신살별 상세 설명 (이름 매칭)
  const shinsalDetails: Record<
    string,
    {
      activation: string;
      caution: string;
      career: string;
      lifeAdvice: string;
    }
  > = {
    천을귀인: {
      activation: '어려울 때 귀인이 나타나 도와줍니다. 신앙이나 철학을 가까이하세요.',
      caution: '너무 의지하면 안 됩니다. 스스로 노력하는 게 우선입니다.',
      career: '교육, 종교, 상담, 공직 등 사람을 돕는 일이 좋습니다.',
      lifeAdvice: '덕을 쌓고 겸손하게 살면 큰 위기에서도 살아남습니다.',
    },
    천덕귀인: {
      activation: '덕과 복이 많아 자연스럽게 좋은 일이 생깁니다.',
      caution: '교만하지 않고 감사하는 마음을 유지하세요.',
      career: '리더십, 경영, 자선사업 등에서 빛을 발합니다.',
      lifeAdvice: '베풀고 나누면 복이 더욱 커집니다.',
    },
    월덕귀인: {
      activation: '매달 좋은 기운을 받아 운이 따릅니다.',
      caution: '작은 선행을 꾸준히 하는 것이 중요합니다.',
      career: '대인관계가 좋으니 영업, 서비스업, 외교 분야가 유리합니다.',
      lifeAdvice: '밝고 긍정적인 태도를 유지하세요.',
    },
    문창귀인: {
      activation: '글과 학문에 재능이 있습니다. 공부하고 연구하세요.',
      caution: '머리만 믿고 실천하지 않으면 무용지물입니다.',
      career: '작가, 연구원, 교수, 기자, 법조인 등 지식인 직업이 좋습니다.',
      lifeAdvice: '평생 배우는 자세로 살아가세요.',
    },
    학당귀인: {
      activation: '학습 능력이 뛰어나 자격증이나 학위가 도움이 됩니다.',
      caution: '이론만 알고 실전이 부족하지 않도록 주의하세요.',
      career: '전문직, 교육자, 연구직이 유리합니다.',
      lifeAdvice: '배운 것을 실생활에 적용하세요.',
    },
    복성귀인: {
      activation: '복이 많은 사주입니다. 하는 일마다 잘 풀립니다.',
      caution: '복에 안주하지 말고 더 노력하세요.',
      career: '사업가, 투자가, 부동산 등 재물과 관련된 일이 좋습니다.',
      lifeAdvice: '감사하는 마음으로 복을 나누세요.',
    },
    역마살: {
      activation: '이동수가 강합니다. 여행, 이사, 해외 진출이 길합니다.',
      caution: '너무 자주 옮기면 뿌리를 내리지 못합니다.',
      career: '여행업, 무역, 운송, 항공, 외교관 등 이동하는 직업이 좋습니다.',
      lifeAdvice: '변화를 두려워하지 말고 새로운 곳으로 나아가세요.',
    },
    도화살: {
      activation: '매력과 인기가 있습니다. 예술이나 대중 앞에 서는 일이 좋습니다.',
      caution: '이성 문제나 스캔들을 조심하세요. 사생활 관리가 중요합니다.',
      career: '연예인, 예술가, 미용사, 패션, 방송인 등이 유리합니다.',
      lifeAdvice: '외모와 품격을 갖추되, 내실도 다지세요.',
    },
    화개살: {
      activation: '예술적 감각과 영적 능력이 뛰어납니다.',
      caution: '현실감각이 부족할 수 있으니 실용성을 키우세요.',
      career: '예술가, 종교인, 철학자, 점술가 등 정신세계 관련 직업이 좋습니다.',
      lifeAdvice: '고독을 즐길 줄 알고, 내면의 소리에 귀 기울이세요.',
    },
    홍염살: {
      activation: '뛰어난 외모와 매력으로 인기가 많습니다.',
      caution: '이성 관계가 복잡해질 수 있으니 신중하게 행동하세요.',
      career: '배우, 모델, 방송인, 호스트 등 외모를 활용하는 직업이 좋습니다.',
      lifeAdvice: '매력을 긍정적으로 활용하되, 사생활은 철저히 관리하세요.',
    },
    백호대살: {
      activation: '강한 기운으로 위기를 극복합니다.',
      caution: '사고, 수술, 재해를 조심하세요. 안전관리가 중요합니다.',
      career: '군인, 경찰, 소방관, 의사, 운동선수 등 강한 직업이 맞습니다.',
      lifeAdvice: '무리하지 말고 건강검진을 정기적으로 받으세요.',
    },
    양인살: {
      activation: '강한 추진력과 결단력이 있습니다.',
      caution: '공격성과 과격함을 조심하세요. 감정 조절이 필요합니다.',
      career: '외과의사, 군인, 경찰, CEO 등 결단력이 필요한 일이 좋습니다.',
      lifeAdvice: '힘을 정의롭게 사용하고, 약자를 돕는 일에 쓰세요.',
    },
    겁살: {
      activation: '위기 대처 능력이 뛰어납니다.',
      caution: '도난, 사기, 강도를 조심하세요. 재물 관리를 철저히 하세요.',
      career: '탐정, 보안요원, 형사, 변호사 등 위기 관리 직업이 좋습니다.',
      lifeAdvice: '의심을 적절히 하되, 지나친 의심은 관계를 해칩니다.',
    },
    재살: {
      activation: '재난을 피하는 능력이 있습니다.',
      caution: '화재, 교통사고, 낙상 등을 조심하세요. 보험 가입이 필수입니다.',
      career: '소방관, 안전관리자, 응급구조사 등이 오히려 유리합니다.',
      lifeAdvice: '항상 안전을 최우선으로 생각하세요.',
    },
    원진살: {
      activation: '오래된 인연이나 과거 문제를 정리하는 능력이 있습니다.',
      caution: '과거의 원한이나 악연을 조심하세요. 과거를 놓아주세요.',
      career: '상담사, 중재자, 법률가 등 갈등 해결 직업이 좋습니다.',
      lifeAdvice: '용서하고 놓아주는 연습을 하세요.',
    },
    고신살: {
      activation: '고독 속에서 깊은 통찰을 얻습니다.',
      caution: '외로움과 고립을 주의하세요. 사람들과 교류하세요.',
      career: '연구원, 작가, 수도자, 철학자 등 혼자 하는 일이 좋습니다.',
      lifeAdvice: '고독을 두려워하지 말고, 내면의 힘을 키우세요.',
    },
    과숙살: {
      activation: '여러 번 결혼하거나 이별을 경험할 수 있습니다.',
      caution: '배우자 선택을 신중히 하고, 관계 유지에 노력하세요.',
      career: '결혼상담사, 심리치료사, 이혼 전문 변호사 등이 의외로 잘 맞습니다.',
      lifeAdvice: '사랑에 신중하고, 관계를 소중히 여기세요.',
    },
    고란살: {
      activation: '부모나 형제와 인연이 얇지만, 독립적으로 성공합니다.',
      caution: '가족 간 갈등을 조심하고, 적절한 거리를 유지하세요.',
      career: '자영업, 프리랜서, 해외 거주 등 독립적인 삶이 좋습니다.',
      lifeAdvice: '혼자 살아가는 힘을 키우세요.',
    },
  };

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
        ⭐ 신살 길흉 완전 분석
      </h2>

      <p className="text-center text-slate-300 mb-12 leading-relaxed">
        신살(神殺)은 사주에 깃든 특별한 기운입니다.
        <br />
        길신(吉神)은 복과 행운을, 흉살(凶殺)은 시련과 주의사항을 알려줍니다.
      </p>

      {/* 개요 */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="glass rounded-2xl p-6 border border-green-400/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-400">길신 (吉神)</h3>
              <p className="text-sm text-slate-400">행운과 복을 가져다주는 별</p>
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-400">{goodShinsals.length}개</div>
            <p className="text-slate-400 text-sm mt-1">발견됨</p>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 border border-red-400/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Skull className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-red-400">흉살 (凶殺)</h3>
              <p className="text-sm text-slate-400">주의와 시련을 알리는 별</p>
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-red-400">{badShinsals.length}개</div>
            <p className="text-slate-400 text-sm mt-1">발견됨</p>
          </div>
        </div>
      </div>

      {/* 길신 상세 */}
      {goodShinsals.length > 0 && (
        <div className="mb-12">
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-green-400">
              길신 (吉神) - 당신의 행운 별자리
            </h3>
          </motion.div>

          <div className="space-y-6">
            {goodShinsals.map((shinsal, index) => {
              const detail = shinsalDetails[shinsal.name] || {
                activation: '이 신살의 기운을 활용하면 좋은 일이 생깁니다.',
                caution: '과신하지 말고 꾸준히 노력하세요.',
                career: '당신의 강점을 살릴 수 있는 분야를 찾으세요.',
                lifeAdvice: '이 기운을 긍정적으로 활용하세요.',
              };

              return (
                <motion.div
                  key={index}
                  className="glass rounded-2xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center text-2xl">
                      ⭐
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-slate-100 mb-2">
                        {shinsal.name}
                      </h4>
                      <p className="text-slate-300 text-sm leading-relaxed">{shinsal.desc}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
                      <h5 className="font-semibold text-emerald-400 mb-2 flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        활용법
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
                      <h5 className="font-semibold text-blue-400 mb-2">💼 적합 직업</h5>
                      <p className="text-slate-300 text-sm">{detail.career}</p>
                    </div>

                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
                      <h5 className="font-semibold text-purple-400 mb-2">💡 인생 조언</h5>
                      <p className="text-slate-300 text-sm">{detail.lifeAdvice}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* 흉살 상세 */}
      {badShinsals.length > 0 && (
        <div>
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Skull className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-red-400">
              흉살 (凶殺) - 주의해야 할 시련과 대처법
            </h3>
          </motion.div>

          <div className="space-y-6">
            {badShinsals.map((shinsal, index) => {
              const detail = shinsalDetails[shinsal.name] || {
                activation: '이 흉살을 잘 다루면 오히려 강점이 될 수 있습니다.',
                caution: '주의하고 조심하면 피해를 최소화할 수 있습니다.',
                career: '이 기운을 역으로 활용할 수 있는 직업을 찾으세요.',
                lifeAdvice: '두려워하지 말고 대비하세요.',
              };

              return (
                <motion.div
                  key={index}
                  className="glass rounded-2xl p-6 border border-red-400/20"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center text-2xl">
                      ⚠️
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-slate-100 mb-2">
                        {shinsal.name}
                      </h4>
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
                      <h5 className="font-semibold text-blue-400 mb-2">💼 역이용 직업</h5>
                      <p className="text-slate-300 text-sm">{detail.career}</p>
                    </div>

                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
                      <h5 className="font-semibold text-purple-400 mb-2">💡 대처 조언</h5>
                      <p className="text-slate-300 text-sm">{detail.lifeAdvice}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* 종합 평가 */}
      <div className="mt-12 glass rounded-2xl p-6 border border-purple-400/30">
        <h4 className="text-lg font-bold text-purple-400 mb-4 flex items-center gap-2">
          <span>🎯</span>
          <span>신살 종합 평가</span>
        </h4>
        <div className="space-y-3 text-slate-300">
          <p className="flex items-start gap-2">
            <span className="text-purple-400 flex-shrink-0">•</span>
            <span>
              길신 <strong className="text-green-400">{goodShinsals.length}개</strong> vs 흉살{' '}
              <strong className="text-red-400">{badShinsals.length}개</strong> -{' '}
              {goodShinsals.length > badShinsals.length
                ? '길신이 더 많아 전체적으로 복이 있는 사주입니다'
                : goodShinsals.length < badShinsals.length
                ? '흉살이 많지만, 조심하면 피할 수 있습니다'
                : '길흉이 균형을 이루고 있습니다'}
            </span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-purple-400 flex-shrink-0">•</span>
            <span>
              신살은 <strong>대운이나 세운</strong>에 따라 발동 시기가 다릅니다. 해당
              시기에 더욱 주의하거나 활용하세요.
            </span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-purple-400 flex-shrink-0">•</span>
            <span>
              흉살이 있다고 무조건 나쁜 것이 아닙니다. 오히려 그 분야의{' '}
              <strong>전문가</strong>가 될 수 있습니다.
            </span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-purple-400 flex-shrink-0">•</span>
            <span>
              길신도 방심하면 무용지물입니다. <strong>노력과 덕행</strong>이 함께해야
              합니다.
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
