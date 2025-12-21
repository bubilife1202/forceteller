'use client';

import { SajuResult } from '@/lib/saju-calculator';
import { motion } from 'framer-motion';
import { UserCheck, Shield, AlertTriangle, Lightbulb, Heart, Target } from 'lucide-react';

interface CareerBossProps {
  result: SajuResult;
  name: string;
  birthDate: Date;
}

const ELEMENT_BOSS_RELATION: Record<string, {
  relationStyle: string;
  strength: string;
  challenge: string;
  idealBoss: string;
  difficultBoss: string;
  managementTip: string;
  loyaltyPattern: string;
  conflictResolution: string;
}> = {
  '목': {
    relationStyle: '성장과 발전을 함께 추구하는 관계를 원합니다. 멘토-멘티 같은 관계에서 최고의 성과를 냅니다.',
    strength: '상사의 비전에 공감하면 강한 충성심을 보입니다. 조직의 성장에 기여하는 것에 보람을 느낍니다.',
    challenge: '성장 기회가 없다고 느끼면 의욕이 떨어집니다. 지나친 통제에 답답함을 느낍니다.',
    idealBoss: '비전을 제시하고 성장을 지원하는 멘토형 상사. 자율성을 주면서 방향을 잡아주는 리더.',
    difficultBoss: '마이크로매니징하는 상사. 새로운 시도를 막는 보수적인 리더.',
    managementTip: '상사에게 성장 의지와 학습하는 모습을 보여주세요. 새로운 프로젝트에 적극 참여하세요.',
    loyaltyPattern: '성장시켜주는 상사에게 강한 충성심을 보입니다. 은혜를 갚으려는 마음이 있습니다.',
    conflictResolution: '감정적으로 대응하기보다 성장 관점에서 대화하세요. 미래 지향적 제안을 하면 효과적입니다.'
  },
  '화': {
    relationStyle: '인정받고 싶어하며, 열정을 공유할 수 있는 관계를 원합니다. 카리스마 있는 상사를 존경합니다.',
    strength: '열정적으로 일하며 성과로 보답합니다. 상사의 비전에 불을 지피는 역할을 합니다.',
    challenge: '인정받지 못하면 급격히 의욕이 떨어집니다. 무시당한다고 느끼면 감정적으로 대응할 수 있습니다.',
    idealBoss: '성과를 인정하고 칭찬하는 상사. 함께 열정을 나눌 수 있는 카리스마 리더.',
    difficultBoss: '무관심하거나 인색한 상사. 감정 없이 냉정하게만 대하는 리더.',
    managementTip: '성과를 정기적으로 보고하고 가시적인 결과를 보여주세요. 열정을 표현하세요.',
    loyaltyPattern: '인정해주는 상사에게 뜨거운 충성심을 보입니다. 그러나 배신감을 느끼면 관계가 급격히 식습니다.',
    conflictResolution: '감정을 가라앉힌 후 대화하세요. 성과와 기여를 객관적으로 정리해서 전달하세요.'
  },
  '토': {
    relationStyle: '안정적이고 신뢰할 수 있는 관계를 원합니다. 예측 가능하고 공정한 상사를 선호합니다.',
    strength: '묵묵히 맡은 일을 완수하며 신뢰를 쌓습니다. 안정적인 성과로 조직에 기여합니다.',
    challenge: '급격한 변화나 불공정한 대우에 스트레스를 받습니다. 불신이 쌓이면 관계 회복이 어렵습니다.',
    idealBoss: '공정하고 일관성 있는 상사. 약속을 지키고 안정적으로 조직을 운영하는 리더.',
    difficultBoss: '변덕스럽고 예측 불가능한 상사. 불공정하게 차별하는 리더.',
    managementTip: '꾸준한 성과로 신뢰를 쌓으세요. 안정적이고 믿을 수 있다는 이미지를 구축하세요.',
    loyaltyPattern: '한번 신뢰하면 오래 충성합니다. 그러나 신뢰가 깨지면 회복이 어렵습니다.',
    conflictResolution: '감정보다 사실에 기반해 대화하세요. 공정성을 어필하면 효과적입니다.'
  },
  '금': {
    relationStyle: '명확한 기대치와 공정한 평가를 원합니다. 논리적이고 체계적인 상사를 선호합니다.',
    strength: '맡은 업무를 완벽하게 수행합니다. 논리적인 분석과 체계적인 보고로 상사를 보좌합니다.',
    challenge: '비논리적이거나 감정적인 결정에 불만을 느낍니다. 기준이 모호하면 혼란스러워합니다.',
    idealBoss: '논리적이고 공정한 상사. 명확한 기준으로 평가하고 피드백하는 리더.',
    difficultBoss: '감정적이거나 편파적인 상사. 기준 없이 결정하는 리더.',
    managementTip: '데이터와 논리로 보고하세요. 명확한 기준을 제시하고 그에 따라 성과를 내세요.',
    loyaltyPattern: '공정하게 대우받으면 충성합니다. 불공정하면 내면으로 거리를 둡니다.',
    conflictResolution: '감정을 배제하고 논리적으로 대화하세요. 객관적 근거를 제시하면 효과적입니다.'
  },
  '수': {
    relationStyle: '자유롭고 유연한 관계를 원합니다. 창의성을 존중하는 상사를 선호합니다.',
    strength: '새로운 아이디어와 전략으로 상사를 보좌합니다. 외부 네트워킹으로 기회를 가져옵니다.',
    challenge: '지나친 통제나 틀에 갇힌 업무에 답답함을 느낍니다. 자유가 없으면 의욕이 떨어집니다.',
    idealBoss: '자율성을 주는 상사. 창의적 아이디어를 환영하고 새로운 시도를 지원하는 리더.',
    difficultBoss: '마이크로매니징하는 상사. 변화를 싫어하고 틀에 가두는 리더.',
    managementTip: '자율성 내에서 성과를 내 신뢰를 쌓으세요. 새로운 아이디어를 제안하세요.',
    loyaltyPattern: '자유를 주는 상사에게 충성합니다. 그러나 구속받으면 떠나고 싶어합니다.',
    conflictResolution: '감정적으로 반응하지 말고 한 발 물러서 상황을 지켜보세요. 유연하게 대응하세요.'
  }
};

export default function CareerBoss({ result, name }: CareerBossProps) {
  const dayElement = result.day.stem.element;
  const bossRelation = ELEMENT_BOSS_RELATION[dayElement] || ELEMENT_BOSS_RELATION['목'];

  return (
    <motion.section
      className="glass-strong rounded-3xl p-6 md:p-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20">
          <UserCheck className="w-7 h-7 text-amber-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            상사/직장인 관계
          </h2>
          <p className="text-slate-400 text-sm">{name}님의 직장 관계 스타일</p>
        </div>
      </div>

      {/* 관계 스타일 */}
      <div className="glass rounded-2xl p-6 mb-6 bg-gradient-to-br from-amber-500/10 to-yellow-500/10">
        <p className="text-slate-300 leading-relaxed">{bossRelation.relationStyle}</p>
      </div>

      {/* 강점 & 도전 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="glass rounded-2xl p-5 border border-emerald-500/30">
          <div className="flex items-center gap-2 text-emerald-400 mb-3">
            <Shield className="w-5 h-5" />
            <h3 className="font-semibold">강점</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{bossRelation.strength}</p>
        </div>

        <div className="glass rounded-2xl p-5 border border-rose-500/30">
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-semibold">도전 과제</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{bossRelation.challenge}</p>
        </div>
      </div>

      {/* 이상적인 상사 & 어려운 상사 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 text-cyan-400 mb-3">
            <Heart className="w-5 h-5" />
            <h3 className="font-semibold">이상적인 상사</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{bossRelation.idealBoss}</p>
        </div>

        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 text-purple-400 mb-3">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-semibold">어려운 상사</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{bossRelation.difficultBoss}</p>
        </div>
      </div>

      {/* 충성 패턴 */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 text-blue-400 mb-3">
          <Target className="w-5 h-5" />
          <h3 className="font-semibold">충성도 패턴</h3>
        </div>
        <p className="text-slate-300 leading-relaxed">{bossRelation.loyaltyPattern}</p>
      </div>

      {/* 관리 팁 & 갈등 해결 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-5 bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-emerald-300 mb-2">상사 관리 팁</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{bossRelation.managementTip}</p>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-5 bg-gradient-to-br from-amber-500/10 to-yellow-500/10">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-amber-300 mb-2">갈등 해결법</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{bossRelation.conflictResolution}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
