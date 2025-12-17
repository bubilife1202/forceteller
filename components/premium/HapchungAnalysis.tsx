'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Heart, Zap, AlertTriangle, Swords } from 'lucide-react';

interface HapchungAnalysisProps {
  result: SajuResult;
}

export default function HapchungAnalysis({ result }: HapchungAnalysisProps) {
  // 합충형파해 분류
  const categorizeHapchung = () => {
    const categories = {
      hap: [] as typeof result.hapchung,
      chung: [] as typeof result.hapchung,
      hyung: [] as typeof result.hapchung,
      pahae: [] as typeof result.hapchung,
    };

    result.hapchung.forEach((item) => {
      if (item.name.includes('합')) {
        categories.hap.push(item);
      } else if (item.name.includes('충')) {
        categories.chung.push(item);
      } else if (item.name.includes('형')) {
        categories.hyung.push(item);
      } else if (item.name.includes('파') || item.name.includes('해')) {
        categories.pahae.push(item);
      }
    });

    return categories;
  };

  const categories = categorizeHapchung();
  const hasAny =
    categories.hap.length > 0 ||
    categories.chung.length > 0 ||
    categories.hyung.length > 0 ||
    categories.pahae.length > 0;

  // 카테고리별 상세 정보
  const categoryInfo = [
    {
      id: 'hap',
      title: '합 合 - 만남과 결합',
      icon: Heart,
      color: 'from-pink-500 to-rose-600',
      emoji: '💕',
      items: categories.hap,
      description:
        '합(合)은 두 오행이 만나 새로운 기운으로 변화하는 것입니다. 인연, 협력, 변화를 의미합니다.',
      types: [
        {
          name: '천간합 (天干合)',
          desc: '갑기합토, 을경합금, 병신합수, 정임합목, 무계합화 - 천간끼리 만나 변화',
          effect: '성격이나 생각의 변화, 협력 관계, 타협',
        },
        {
          name: '지지 육합 (六合)',
          desc: '자축, 인해, 묘술, 진유, 사신, 오미 - 가까운 인연',
          effect: '배우자운, 협력자, 작은 변화',
        },
        {
          name: '지지 삼합 (三合)',
          desc: '신자진(수), 해묘미(목), 인오술(화), 사유축(금) - 큰 세력',
          effect: '큰 기회, 강력한 협력, 사업 확장',
        },
        {
          name: '지지 방합 (方合)',
          desc: '인묘진(동방목), 사오미(남방화), 신유술(서방금), 해자축(북방수) - 방향성',
          effect: '특정 분야 집중, 한 방향으로 몰림',
        },
      ],
      interpretation: {
        positive: [
          '좋은 인연을 만나 협력하게 됩니다',
          '변화와 전환의 기회가 찾아옵니다',
          '타인과의 조화를 통해 발전합니다',
          '결혼, 동업, 계약 등에 유리합니다',
        ],
        negative: [
          '자신의 본질이 흔들릴 수 있습니다',
          '타협하다 보면 주도권을 잃을 수 있습니다',
          '변화가 과도하면 정체성이 혼란스러울 수 있습니다',
        ],
      },
    },
    {
      id: 'chung',
      title: '충 沖 - 충돌과 변동',
      icon: Zap,
      color: 'from-orange-500 to-red-600',
      emoji: '⚡',
      items: categories.chung,
      description:
        '충(沖)은 정반대 방향에서 부딪치는 것입니다. 변동, 이동, 충돌, 급변을 의미합니다.',
      types: [
        {
          name: '천간충 (天干沖)',
          desc: '갑경충, 을신충, 병임충, 정계충, 무갑충, 기을충 등 - 천간 극',
          effect: '생각의 충돌, 의견 불일치, 결정의 어려움',
        },
        {
          name: '지지충 (地支沖)',
          desc: '자오충, 축미충, 인신충, 묘유충, 진술충, 사해충 - 정반대',
          effect: '이동, 이사, 이직, 사고, 큰 변화',
        },
      ],
      interpretation: {
        positive: [
          '정체된 상황을 타파하는 계기가 됩니다',
          '이동, 이직, 이사로 새로운 기회를 얻습니다',
          '답답한 관계를 정리할 수 있습니다',
          '급변하는 환경에서 기민하게 대응합니다',
        ],
        negative: [
          '예상치 못한 사고나 변동이 생길 수 있습니다',
          '안정성이 떨어지고 변화가 잦습니다',
          '인간관계에서 갈등이나 이별이 생길 수 있습니다',
          '건강이나 재물의 급격한 변화를 주의해야 합니다',
        ],
      },
    },
    {
      id: 'hyung',
      title: '형 刑 - 형벌과 시련',
      icon: AlertTriangle,
      color: 'from-purple-600 to-indigo-700',
      emoji: '⚠️',
      items: categories.hyung,
      description:
        '형(刑)은 법과 질서에 어긋나 받는 벌입니다. 시련, 고통, 법적 문제, 건강 악화를 의미합니다.',
      types: [
        {
          name: '무은형 (無恩刑)',
          desc: '인사신 삼형 - 은혜를 모르는 형벌',
          effect: '배신, 배은망덕, 관재구설',
        },
        {
          name: '지세형 (持勢刑)',
          desc: '축술미 삼형 - 권세를 믿고 저지르는 형벌',
          effect: '오만, 교만으로 인한 실수, 자만',
        },
        {
          name: '무례형 (無禮刑)',
          desc: '자묘형 - 예의를 모르는 형벌',
          effect: '말실수, 무례함, 경솔함',
        },
        {
          name: '자형 (自刑)',
          desc: '진진, 오오, 유유, 해해 - 스스로를 해치는 형벌',
          effect: '자책, 우울, 자해, 자학',
        },
      ],
      interpretation: {
        positive: [
          '시련을 통해 성숙해집니다',
          '고통을 극복하며 강해집니다',
          '조심성이 생기고 신중해집니다',
        ],
        negative: [
          '법적 문제나 관재구설에 주의해야 합니다',
          '건강 악화, 수술, 사고 위험이 있습니다',
          '인간관계에서 배신이나 갈등이 생길 수 있습니다',
          '정신적 고통이나 우울감을 겪을 수 있습니다',
        ],
      },
    },
    {
      id: 'pahae',
      title: '파해 破害 - 파괴와 해침',
      icon: Swords,
      color: 'from-slate-600 to-gray-700',
      emoji: '🗡️',
      items: categories.pahae,
      description:
        '파(破)는 깨뜨림, 해(害)는 해침입니다. 은밀한 방해, 음해, 손실을 의미합니다.',
      types: [
        {
          name: '파 (破)',
          desc: '자유파, 오묘파, 진축파, 술미파, 인해파, 사신파 - 깨뜨림',
          effect: '파산, 파혼, 파괴, 손실',
        },
        {
          name: '해 (害)',
          desc: '자미해, 축오해, 인사해, 묘진해, 신해해, 유술해 - 해침',
          effect: '은밀한 방해, 음해, 시기, 질투',
        },
      ],
      interpretation: {
        positive: [
          '낡은 것을 파괴하고 새롭게 시작할 수 있습니다',
          '겉으로 드러나지 않는 문제를 발견합니다',
        ],
        negative: [
          '뒤에서 음해하는 사람을 조심해야 합니다',
          '예상치 못한 손실이나 파손이 생길 수 있습니다',
          '믿었던 사람의 배신을 당할 수 있습니다',
          '계약이나 약속이 깨질 위험이 있습니다',
        ],
      },
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
        🔄 합충형파해 완전 분석
      </h2>

      <p className="text-center text-slate-300 mb-12 leading-relaxed">
        사주 원국 안에서 천간과 지지가 서로 어떻게 작용하는지 분석합니다.
        <br />
        합·충·형·파·해는 인생의 큰 변화와 사건을 예측하는 핵심 단서입니다.
      </p>

      {!hasAny ? (
        <div className="glass rounded-2xl p-8 text-center">
          <div className="text-6xl mb-4">✨</div>
          <h3 className="text-xl font-bold text-slate-200 mb-3">
            합충형파해가 없는 깨끗한 사주
          </h3>
          <p className="text-slate-300 leading-relaxed">
            원국에 특별한 합충형파해가 없습니다. 이는 안정적이고 평온한 사주를 의미합니다.
            <br />
            급격한 변화나 충돌 없이 꾸준히 발전할 수 있는 구조입니다.
            <br />
            다만 대운이나 세운에서 들어오는 합충은 별도로 확인해야 합니다.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {categoryInfo.map((category, index) => {
            if (category.items.length === 0) return null;

            const Icon = category.icon;

            return (
              <motion.div
                key={category.id}
                className="glass rounded-3xl p-6 md:p-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* 헤더 */}
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap mb-2">
                      <h3 className="text-2xl font-bold text-slate-100">
                        {category.emoji} {category.title}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${category.color} text-white`}
                      >
                        {category.items.length}개
                      </span>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* 발견된 합충형파해 목록 */}
                <div className="mb-6 space-y-3">
                  <h4 className="font-semibold text-amber-400 mb-3">
                    당신의 사주에서 발견된 {category.title}
                  </h4>
                  {category.items.map((item, i) => (
                    <div
                      key={i}
                      className="bg-slate-800/50 rounded-xl p-4 border border-slate-700"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl flex-shrink-0">{category.emoji}</span>
                        <div>
                          <h5 className="font-bold text-slate-200 mb-1">{item.name}</h5>
                          <p className="text-slate-400 text-sm">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 유형별 설명 */}
                <div className="mb-6 bg-slate-800/30 rounded-2xl p-5">
                  <h4 className="font-semibold text-amber-400 mb-4">
                    {category.title} 유형별 특징
                  </h4>
                  <div className="space-y-3">
                    {category.types.map((type, i) => (
                      <div key={i} className="text-sm">
                        <p className="font-semibold text-slate-200">{type.name}</p>
                        <p className="text-slate-400 mb-1">{type.desc}</p>
                        <p className="text-slate-300">
                          <strong className="text-amber-300">→ 효과:</strong> {type.effect}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 길흉 해석 */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* 긍정적 측면 */}
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5">
                    <h5 className="font-bold text-green-400 mb-3 flex items-center gap-2">
                      <span>✅</span>
                      <span>긍정적 측면</span>
                    </h5>
                    <ul className="space-y-2">
                      {category.interpretation.positive.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                          <span className="text-green-400 flex-shrink-0 mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 부정적 측면 */}
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5">
                    <h5 className="font-bold text-red-400 mb-3 flex items-center gap-2">
                      <span>⚠️</span>
                      <span>주의할 점</span>
                    </h5>
                    <ul className="space-y-2">
                      {category.interpretation.negative.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                          <span className="text-red-400 flex-shrink-0 mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* 종합 대처법 */}
      {hasAny && (
        <div className="mt-8 glass rounded-2xl p-6 border border-amber-400/30">
          <h4 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
            <span>💡</span>
            <span>합충형파해 대처법</span>
          </h4>
          <div className="space-y-3 text-slate-300 text-sm">
            {categories.hap.length > 0 && (
              <p className="flex items-start gap-2">
                <span className="text-pink-400 flex-shrink-0">💕</span>
                <span>
                  <strong>합(合)</strong>: 변화를 두려워하지 마세요. 좋은 인연을 통해
                  발전하되, 본질을 잃지 않도록 주의합니다.
                </span>
              </p>
            )}
            {categories.chung.length > 0 && (
              <p className="flex items-start gap-2">
                <span className="text-orange-400 flex-shrink-0">⚡</span>
                <span>
                  <strong>충(沖)</strong>: 급변에 대비하세요. 이동수가 있으니 이사, 이직,
                  해외 등을 긍정적으로 활용하고, 사고 예방에 신경 씁니다.
                </span>
              </p>
            )}
            {categories.hyung.length > 0 && (
              <p className="flex items-start gap-2">
                <span className="text-purple-400 flex-shrink-0">⚠️</span>
                <span>
                  <strong>형(刑)</strong>: 법적 문제, 계약서, 건강검진을 철저히 하세요.
                  언행에 신중하고, 감정 관리가 필요합니다.
                </span>
              </p>
            )}
            {categories.pahae.length > 0 && (
              <p className="flex items-start gap-2">
                <span className="text-slate-400 flex-shrink-0">🗡️</span>
                <span>
                  <strong>파해(破害)</strong>: 뒤에서 음해하는 사람을 조심하세요. 계약이나
                  약속은 문서화하고, 재물 관리를 철저히 합니다.
                </span>
              </p>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
