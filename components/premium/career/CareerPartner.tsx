'use client';

import { SajuResult } from '@/lib/saju-calculator';
import { motion } from 'framer-motion';
import { Users, Heart, AlertTriangle, Handshake, Target, Shield } from 'lucide-react';

interface CareerPartnerProps {
  result: SajuResult;
  name: string;
  birthDate: Date;
}

const ELEMENT_PARTNER: Record<string, {
  idealPartner: string;
  partnershipStyle: string;
  contribution: string;
  needFromPartner: string;
  conflictPoint: string;
  successTip: string;
  bestElements: { element: string; reason: string }[];
  avoidElements: { element: string; reason: string }[];
}> = {
  '목': {
    idealPartner: '목(木) 일간은 비전을 제시하고 성장을 이끄는 역할을 담당합니다. 실무와 재정을 관리해줄 파트너가 필요합니다.',
    partnershipStyle: '동등한 관계에서 서로의 영역을 존중하며 협력하는 스타일을 선호합니다.',
    contribution: '새로운 아이디어와 방향 제시, 조직 성장 전략, 인재 육성에 기여합니다.',
    needFromPartner: '세부 실무 처리, 재정 관리, 현실적인 의견 제시가 필요합니다.',
    conflictPoint: '의견 충돌 시 자신의 비전을 고집할 수 있어 갈등이 생길 수 있습니다.',
    successTip: '파트너의 실무 능력을 인정하고, 비전과 현실의 균형을 찾으세요.',
    bestElements: [
      { element: '금(金)', reason: '논리적이고 체계적인 면이 목의 창의성을 보완합니다.' },
      { element: '토(土)', reason: '안정적이고 실용적인 면이 목의 이상주의를 현실화합니다.' }
    ],
    avoidElements: [
      { element: '목(木)', reason: '비슷한 성향으로 리더십 충돌이 생길 수 있습니다.' }
    ]
  },
  '화': {
    idealPartner: '화(火) 일간은 열정과 추진력으로 사업을 이끕니다. 냉정하게 판단하고 관리할 파트너가 필요합니다.',
    partnershipStyle: '열정을 공유하며 함께 달리는 관계를 원합니다.',
    contribution: '마케팅, 영업, 대외 협력, 조직 동기부여에 기여합니다.',
    needFromPartner: '냉정한 판단, 재정 관리, 후방 지원이 필요합니다.',
    conflictPoint: '급한 성격으로 결정을 서두르다 파트너와 갈등이 생길 수 있습니다.',
    successTip: '중요한 결정은 파트너와 충분히 논의 후 내리세요.',
    bestElements: [
      { element: '수(水)', reason: '냉정하고 전략적인 면이 화의 열정을 조절합니다.' },
      { element: '금(金)', reason: '논리적이고 체계적인 면이 화의 추진력을 뒷받침합니다.' }
    ],
    avoidElements: [
      { element: '화(火)', reason: '두 사람 모두 불 같아 충돌이 잦을 수 있습니다.' }
    ]
  },
  '토': {
    idealPartner: '토(土) 일간은 안정적으로 조직을 운영하고 관리합니다. 혁신과 활력을 불어넣을 파트너가 필요합니다.',
    partnershipStyle: '신뢰를 바탕으로 장기적인 관계를 구축하는 것을 선호합니다.',
    contribution: '조직 관리, 재정 운영, 안정적인 의사결정에 기여합니다.',
    needFromPartner: '새로운 아이디어, 마케팅, 변화에 대한 적응력이 필요합니다.',
    conflictPoint: '변화를 꺼리는 성향이 파트너와 갈등을 일으킬 수 있습니다.',
    successTip: '파트너의 혁신적인 의견에 열린 마음을 가지세요.',
    bestElements: [
      { element: '목(木)', reason: '창의적이고 성장 지향적인 면이 토에 활력을 줍니다.' },
      { element: '화(火)', reason: '열정적이고 추진력 있는 면이 토의 보수성을 보완합니다.' }
    ],
    avoidElements: [
      { element: '토(土)', reason: '둘 다 보수적이라 정체될 수 있습니다.' }
    ]
  },
  '금': {
    idealPartner: '금(金) 일간은 논리적이고 체계적으로 일을 처리합니다. 유연성과 창의성을 가진 파트너가 필요합니다.',
    partnershipStyle: '명확한 역할 분담과 책임을 중시하는 관계를 선호합니다.',
    contribution: '전략 수립, 품질 관리, 시스템 구축에 기여합니다.',
    needFromPartner: '창의적 아이디어, 대인 관계, 유연한 대응이 필요합니다.',
    conflictPoint: '원칙을 고집하다 파트너와 마찰이 생길 수 있습니다.',
    successTip: '때로는 원칙보다 상황에 맞는 유연성이 필요합니다.',
    bestElements: [
      { element: '화(火)', reason: '열정적이고 추진력 있는 면이 금의 신중함을 보완합니다.' },
      { element: '목(木)', reason: '창의적이고 성장 지향적인 면이 금에 활력을 줍니다.' }
    ],
    avoidElements: [
      { element: '금(金)', reason: '둘 다 원칙적이라 충돌이 잦을 수 있습니다.' }
    ]
  },
  '수': {
    idealPartner: '수(水) 일간은 전략적 사고와 네트워킹 능력이 뛰어납니다. 안정적으로 실행할 파트너가 필요합니다.',
    partnershipStyle: '자유롭고 유연한 관계에서 각자의 역할을 하는 것을 선호합니다.',
    contribution: '전략 기획, 마케팅, 외부 네트워킹에 기여합니다.',
    needFromPartner: '실행력, 안정적인 운영, 재정 관리가 필요합니다.',
    conflictPoint: '방향을 자주 바꿔 파트너를 혼란스럽게 할 수 있습니다.',
    successTip: '한 번 정한 방향은 최소한의 기간 동안 유지하세요.',
    bestElements: [
      { element: '토(土)', reason: '안정적이고 실용적인 면이 수의 변화를 안정시킵니다.' },
      { element: '금(金)', reason: '논리적이고 체계적인 면이 수의 아이디어를 실현합니다.' }
    ],
    avoidElements: [
      { element: '수(水)', reason: '둘 다 변화를 추구해 방향을 잃을 수 있습니다.' }
    ]
  }
};

export default function CareerPartner({ result, name }: CareerPartnerProps) {
  const dayElement = result.day.stem.element;
  const partner = ELEMENT_PARTNER[dayElement] || ELEMENT_PARTNER['목'];

  // 동업 적합도 점수
  const calculatePartnerScore = () => {
    let score = 50;
    const { 재성, 비겁, 식상, 인성 } = result.tenGodsCount;

    if (재성 >= 1) score += 12;
    if (식상 >= 1) score += 10;
    if (인성 >= 1) score += 8;
    if (비겁 >= 2) score -= 5; // 독립심이 강함

    return Math.min(Math.max(score, 35), 90);
  };

  const partnerScore = calculatePartnerScore();

  return (
    <motion.section
      className="glass-strong rounded-3xl p-6 md:p-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20">
          <Users className="w-7 h-7 text-blue-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            동업자 운세
          </h2>
          <p className="text-slate-400 text-sm">{name}님의 파트너십</p>
        </div>
      </div>

      {/* 동업 적합도 */}
      <div className="glass rounded-2xl p-6 mb-6 bg-gradient-to-br from-blue-500/10 to-indigo-500/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 mb-1">동업 적합도</p>
            <span className="text-4xl font-bold text-blue-400">{partnerScore}점</span>
          </div>
        </div>
      </div>

      {/* 이상적인 동업자 */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 text-cyan-400 mb-3">
          <Handshake className="w-5 h-5" />
          <h3 className="font-semibold">이상적인 동업 관계</h3>
        </div>
        <p className="text-slate-300 leading-relaxed">{partner.idealPartner}</p>
      </div>

      {/* 기여 & 필요 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 text-emerald-400 mb-3">
            <Target className="w-5 h-5" />
            <h3 className="font-semibold">내가 기여하는 것</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{partner.contribution}</p>
        </div>

        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 text-purple-400 mb-3">
            <Heart className="w-5 h-5" />
            <h3 className="font-semibold">파트너에게 필요한 것</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{partner.needFromPartner}</p>
        </div>
      </div>

      {/* 추천 & 주의 동업자 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="glass rounded-2xl p-5 border border-emerald-500/30">
          <h3 className="font-bold text-emerald-400 mb-4">✅ 추천 동업자</h3>
          <div className="space-y-3">
            {partner.bestElements.map((el, idx) => (
              <div key={idx} className="p-3 bg-emerald-500/10 rounded-xl">
                <p className="font-medium text-emerald-300">{el.element} 일간</p>
                <p className="text-slate-400 text-sm mt-1">{el.reason}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-5 border border-rose-500/30">
          <h3 className="font-bold text-rose-400 mb-4">⚠️ 주의할 동업자</h3>
          <div className="space-y-3">
            {partner.avoidElements.map((el, idx) => (
              <div key={idx} className="p-3 bg-rose-500/10 rounded-xl">
                <p className="font-medium text-rose-300">{el.element} 일간</p>
                <p className="text-slate-400 text-sm mt-1">{el.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 갈등 포인트 */}
      <div className="glass rounded-2xl p-6 mb-6 border border-amber-500/30">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-amber-300 mb-2">갈등 포인트</h3>
            <p className="text-slate-300 leading-relaxed">{partner.conflictPoint}</p>
          </div>
        </div>
      </div>

      {/* 성공 팁 */}
      <div className="glass rounded-2xl p-6 bg-gradient-to-r from-blue-500/10 to-indigo-500/10">
        <div className="flex items-start gap-3">
          <Shield className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-blue-300 mb-2">🤝 동업 성공 팁</h3>
            <p className="text-slate-300 leading-relaxed">{partner.successTip}</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
