'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Heart, Zap, AlertTriangle, Shield, Lightbulb } from 'lucide-react';

interface HapchungDetailProps {
  result: SajuResult;
}

const HAPCHUNG_GUIDE: Record<string, { meaning: string; impact: string; remedy: string }> = {
  천간합: {
    meaning: '천간끼리 만나 새로운 오행으로 변화합니다. 생각과 가치관의 변화, 타협을 의미합니다.',
    impact: '성격이 유연해지고 협력 관계가 생깁니다. 결혼, 계약, 동업에 유리하지만 우유부단해질 수 있습니다.',
    remedy: '자신의 중심을 잃지 마세요. 타협하되 원칙은 지키세요.',
  },
  육합: {
    meaning: '지지끼리 가까운 인연으로 만납니다. 배우자운, 협력자운을 나타냅니다.',
    impact: '좋은 인연을 만나 도움을 받습니다. 안정적이고 화합하는 관계가 형성됩니다.',
    remedy: '인연을 소중히 하고 감사하세요. 의존하지 말고 상생하세요.',
  },
  삼합: {
    meaning: '세 개의 지지가 합쳐져 강력한 세력을 이룹니다. 큰 기회와 확장을 의미합니다.',
    impact: '사업 확장, 큰 프로젝트, 강력한 협력 관계가 만들어집니다. 에너지가 집중됩니다.',
    remedy: '기회를 잘 활용하되 과욕은 금물입니다. 균형을 유지하세요.',
  },
  방합: {
    meaning: '한 방향으로 기운이 몰립니다. 특정 분야에 집중하게 됩니다.',
    impact: '한 분야에서 전문성을 발휘합니다. 몰입도가 높지만 편향될 수 있습니다.',
    remedy: '다양성을 잃지 마세요. 집중하되 시야를 넓게 유지하세요.',
  },
  충: {
    meaning: '정반대 방향에서 충돌합니다. 변동, 이동, 급변을 의미합니다.',
    impact: '이사, 이직, 사고 등 예상치 못한 변화가 생깁니다. 인간관계 갈등도 있을 수 있습니다.',
    remedy: '변화를 두려워하지 말고 기회로 삼으세요. 안전에 주의하고 보험에 가입하세요.',
  },
  형: {
    meaning: '법과 질서를 어겨 받는 형벌입니다. 시련과 고통을 의미합니다.',
    impact: '관재구설, 건강 악화, 인간관계 갈등이 생길 수 있습니다. 정신적 고통도 있습니다.',
    remedy: '법과 규칙을 철저히 지키세요. 말조심하고 건강검진을 받으세요.',
  },
  파해: {
    meaning: '은밀하게 깨뜨리고 해칩니다. 예상치 못한 손실과 배신을 의미합니다.',
    impact: '뒤에서 음해하는 사람이 생기거나 예상치 못한 손실이 발생할 수 있습니다.',
    remedy: '주변 사람을 잘 살피고 계약은 문서화하세요. 재물 관리를 철저히 하세요.',
  },
};

export default function HapchungDetail({ result }: HapchungDetailProps) {
  const hasAny = result.hapchung.length > 0;

  const categorized = {
    hap: result.hapchung.filter(h => h.name.includes('합')),
    chung: result.hapchung.filter(h => h.name.includes('충')),
    hyung: result.hapchung.filter(h => h.name.includes('형')),
    others: result.hapchung.filter(h => !h.name.includes('합') && !h.name.includes('충') && !h.name.includes('형')),
  };

  const sections = [
    { id: 'hap', title: '합 (合) - 결합과 조화', icon: Heart, color: 'from-pink-500 to-rose-500', items: categorized.hap, guide: '합' },
    { id: 'chung', title: '충 (沖) - 충돌과 변화', icon: Zap, color: 'from-orange-500 to-red-500', items: categorized.chung, guide: '충' },
    { id: 'hyung', title: '형 (刑) - 형벌과 시련', icon: AlertTriangle, color: 'from-purple-500 to-indigo-600', items: categorized.hyung, guide: '형' },
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
        합충형파해 상세 해석
      </h2>

      <p className="text-center text-slate-300 mb-10 leading-relaxed">
        각 합충형파해가 당신의 삶에 어떤 영향을 미치는지,
        <br />
        어떻게 대처해야 하는지 상세히 안내합니다.
      </p>

      {!hasAny ? (
        <div className="glass rounded-2xl p-10 text-center">
          <div className="text-6xl mb-4">✨</div>
          <h3 className="text-2xl font-bold text-slate-200 mb-3">
            평온하고 안정적인 사주
          </h3>
          <p className="text-slate-300 leading-relaxed max-w-2xl mx-auto">
            원국에 특별한 합충형파해가 없습니다.
            <br />
            이는 급격한 변화나 충돌 없이 안정적으로 살아갈 수 있음을 의미합니다.
            <br />
            꾸준히 노력하며 차근차근 발전하는 삶의 패턴을 가지고 있습니다.
          </p>
        </div>
      ) : (
        <div className="space-y-10">
          {sections.map((section, index) => {
            if (section.items.length === 0) return null;

            const Icon = section.icon;
            const guideKey = section.items[0].name.includes('천간') ? '천간합' :
                             section.items[0].name.includes('육합') ? '육합' :
                             section.items[0].name.includes('삼합') ? '삼합' :
                             section.items[0].name.includes('방합') ? '방합' : section.guide;
            const guide = HAPCHUNG_GUIDE[guideKey] || HAPCHUNG_GUIDE[section.guide];

            return (
              <motion.div
                key={section.id}
                className="glass rounded-3xl p-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-100">{section.title}</h3>
                </div>

                <div className="space-y-6">
                  <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
                    <h4 className="font-semibold text-amber-400 mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      기본 의미
                    </h4>
                    <p className="text-slate-300 leading-relaxed">{guide.meaning}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5">
                      <h4 className="font-bold text-blue-400 mb-3">삶에 미치는 영향</h4>
                      <p className="text-slate-300 text-sm leading-relaxed">{guide.impact}</p>
                    </div>

                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5">
                      <h4 className="font-bold text-amber-400 mb-3 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4" />
                        대처 방법
                      </h4>
                      <p className="text-slate-300 text-sm leading-relaxed">{guide.remedy}</p>
                    </div>
                  </div>

                  <div className="bg-slate-800/30 rounded-2xl p-6">
                    <h4 className="font-semibold text-purple-400 mb-4">당신의 사주에 있는 {section.title}</h4>
                    <div className="space-y-3">
                      {section.items.map((item, i) => (
                        <div key={i} className="bg-slate-700/30 rounded-lg p-4 border border-slate-600">
                          <h5 className="font-bold text-slate-200 mb-2">{item.name}</h5>
                          <p className="text-slate-400 text-sm">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {categorized.others.length > 0 && (
            <div className="glass rounded-2xl p-6">
              <h3 className="text-xl font-bold text-slate-200 mb-4">기타 특별한 관계</h3>
              <div className="space-y-3">
                {categorized.others.map((item, i) => (
                  <div key={i} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <h4 className="font-bold text-slate-200 mb-1">{item.name}</h4>
                    <p className="text-slate-400 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-10 glass rounded-2xl p-6 border border-indigo-400/30">
        <h4 className="text-lg font-bold text-indigo-400 mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5" />
          종합 조언
        </h4>
        <div className="space-y-3 text-slate-300 text-sm">
          <p className="flex items-start gap-2">
            <span className="text-indigo-400 flex-shrink-0">•</span>
            <span>합충형파해는 좋고 나쁨이 아니라 <strong>어떻게 활용하느냐</strong>가 중요합니다.</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-indigo-400 flex-shrink-0">•</span>
            <span>대운이나 세운에서 들어오는 합충도 함께 고려해야 정확한 시기를 알 수 있습니다.</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-indigo-400 flex-shrink-0">•</span>
            <span>합충이 발동하는 시기에는 큰 변화나 중요한 결정이 생기므로 신중하게 대처하세요.</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
