'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { BookOpen, Lightbulb } from 'lucide-react';

interface TwelveCyclesDetailProps {
  result: SajuResult;
}

const CYCLE_DETAILS: Record<string, { desc: string; life: string; advice: string }> = {
  장생: {
    desc: '새로운 생명이 탄생하는 단계입니다. 모든 것이 시작되고 가능성이 무한합니다.',
    life: '새로운 시작, 도전, 학습이 유리한 시기입니다. 젊고 활기차며 희망이 넘칩니다.',
    advice: '기초를 탄탄히 하고, 배우고 익히는데 집중하세요. 성급히 결과를 바라지 마세요.',
  },
  목욕: {
    desc: '갓 태어난 아이가 목욕하며 세상에 적응하는 단계입니다. 변화와 혼란이 있습니다.',
    life: '감정 기복이 크고 유혹에 약합니다. 이성에 관심이 많고 외모를 가꾸려 합니다.',
    advice: '절제와 자제력이 필요합니다. 외적인 것보다 내면을 다지세요.',
  },
  관대: {
    desc: '성인이 되어 관직에 나가는 단계입니다. 사회적으로 활동하며 인정받습니다.',
    life: '리더십이 있고 책임감이 강합니다. 명예와 지위를 중시하며 사회활동이 왕성합니다.',
    advice: '타인과 협력하며 덕을 쌓으세요. 교만하지 말고 겸손하게 처신하세요.',
  },
  건록: {
    desc: '자신의 능력으로 봉록을 받는 전성기입니다. 실력과 노력이 빛을 발합니다.',
    life: '자수성가형으로 스스로 일구는 힘이 있습니다. 성실하고 근면하며 독립적입니다.',
    advice: '자만하지 말고 끝까지 노력하세요. 건강관리와 재물 저축을 병행하세요.',
  },
  제왕: {
    desc: '왕의 자리에 오른 최고 정점입니다. 모든 것이 원하는 대로 이루어집니다.',
    life: '자존심이 강하고 카리스마가 있습니다. 타고난 복이 있어 귀한 대접을 받습니다.',
    advice: '권력을 올바르게 사용하세요. 교만은 몰락의 시작입니다. 주변을 배려하세요.',
  },
  쇠: {
    desc: '왕성했던 기운이 쇠퇴하기 시작하는 단계입니다. 서서히 내려놓아야 합니다.',
    life: '체력과 의욕이 떨어지고 보수적이 됩니다. 과거를 돌아보며 정리합니다.',
    advice: '새로운 것보다 기존의 것을 유지하세요. 건강검진을 받고 무리하지 마세요.',
  },
  병: {
    desc: '병들어 누운 상태입니다. 기력이 약해지고 도움이 필요합니다.',
    life: '건강이 약하고 의존적입니다. 고독하고 우울할 수 있으나, 내면은 성숙합니다.',
    advice: '건강을 최우선으로 하세요. 무리하지 말고 도움을 청하는 것을 두려워하지 마세요.',
  },
  사: {
    desc: '죽음의 단계로 모든 활동이 정지됩니다. 끝이자 새로운 시작 전 단계입니다.',
    life: '현실적 활동보다 정신세계에 관심이 갑니다. 철학적이고 종교적입니다.',
    advice: '집착을 놓아주세요. 명상이나 수행으로 내면을 정화하세요.',
  },
  묘: {
    desc: '무덤에 들어가 정리되는 단계입니다. 모든 것이 보존되고 저장됩니다.',
    life: '과거를 정리하고 유산을 남깁니다. 보수적이며 전통을 중시합니다.',
    advice: '과거에 집착하지 말고 필요한 것만 남기세요. 후대를 위한 준비를 하세요.',
  },
  절: {
    desc: '모든 인연이 끊어지는 단계입니다. 고독하지만 독립적입니다.',
    life: '인연이 박복하고 고독합니다. 독특하고 창의적이며 자기만의 길을 갑니다.',
    advice: '고독을 두려워하지 마세요. 혼자만의 시간으로 자신을 발견하세요.',
  },
  태: {
    desc: '어머니 뱃속에서 잉태되는 단계입니다. 새로운 생명이 준비됩니다.',
    life: '잠재력이 크고 발전 가능성이 높습니다. 준비하고 계획하는 시기입니다.',
    advice: '때를 기다리며 준비하세요. 조급해하지 말고 내실을 다지세요.',
  },
  양: {
    desc: '뱃속에서 자라며 양육받는 단계입니다. 보살핌 속에서 성장합니다.',
    life: '순수하고 귀여우며 보호받습니다. 의존적이지만 성장 잠재력이 큽니다.',
    advice: '배우고 익히는데 집중하세요. 좋은 스승과 환경을 만나는 것이 중요합니다.',
  },
};

export default function TwelveCyclesDetail({ result }: TwelveCyclesDetailProps) {
  const mainCycle = result.twelveCycles.day;
  const mainDetail = CYCLE_DETAILS[mainCycle];

  const allCycles = ['장생', '목욕', '관대', '건록', '제왕', '쇠', '병', '사', '묘', '절', '태', '양'];

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
        12운성 상세 해석
      </h2>

      <div className="glass rounded-3xl p-8 mb-8 border border-violet-400/40">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-violet-400">당신의 일주 12운성</h3>
            <p className="text-slate-400 text-sm">본인과 배우자를 나타내는 핵심 운성</p>
          </div>
        </div>

        <div className="text-center mb-6">
          <div className="text-5xl font-bold gradient-text mb-4">{mainCycle}</div>
        </div>

        <div className="space-y-6">
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-6">
            <h4 className="font-bold text-purple-400 mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              기본 의미
            </h4>
            <p className="text-slate-300 leading-relaxed">{mainDetail.desc}</p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6">
            <h4 className="font-bold text-blue-400 mb-3">인생 패턴</h4>
            <p className="text-slate-300 leading-relaxed">{mainDetail.life}</p>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6">
            <h4 className="font-bold text-amber-400 mb-3">인생 조언</h4>
            <p className="text-slate-300 leading-relaxed">{mainDetail.advice}</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
          <span>📚</span>
          <span>12운성 전체 해설</span>
        </h3>
        <p className="text-slate-400 text-sm mb-6">
          인생의 흐름을 12단계로 나눈 것입니다. 각 단계마다 해야 할 일과 주의할 점이 다릅니다.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {allCycles.map((cycle, index) => {
          const detail = CYCLE_DETAILS[cycle];
          const isUserCycle = [
            result.twelveCycles.year,
            result.twelveCycles.month,
            result.twelveCycles.day,
            result.twelveCycles.hour,
          ].includes(cycle);

          return (
            <motion.div
              key={cycle}
              className={`glass rounded-2xl p-5 ${isUserCycle ? 'border-2 border-violet-400/60' : 'border border-slate-700'}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-bold text-slate-100">{cycle}</h4>
                {isUserCycle && (
                  <span className="px-2 py-1 bg-violet-500/20 text-violet-400 text-xs font-bold rounded-full">
                    보유
                  </span>
                )}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-3">{detail.desc}</p>
              <p className="text-slate-400 text-xs leading-relaxed">{detail.advice}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
