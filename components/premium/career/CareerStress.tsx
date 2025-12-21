'use client';

import { SajuResult } from '@/lib/saju-calculator';
import { motion } from 'framer-motion';
import { Brain, Heart, Coffee, Moon, Dumbbell, Leaf, AlertTriangle, Sparkles } from 'lucide-react';

interface CareerStressProps {
  result: SajuResult;
  name: string;
  birthDate: Date;
}

const ELEMENT_STRESS: Record<string, {
  stressPattern: string;
  triggers: string[];
  symptoms: string[];
  copingStrategies: string[];
  relaxationMethods: string[];
  workLifeBalance: string;
  burnoutWarning: string;
  recoveryAdvice: string;
}> = {
  '목': {
    stressPattern: '성장이 멈췄다고 느끼거나 창의성이 발휘되지 못할 때 스트레스를 받습니다. 틀에 갇힌 느낌에 답답해합니다.',
    triggers: ['성장 기회 부족', '틀에 박힌 업무', '통제적인 환경', '비전 없는 조직'],
    symptoms: ['짜증', '불면', '에너지 저하', '의욕 상실'],
    copingStrategies: ['새로운 것 배우기', '자연 속 산책', '독서', '창의적 취미'],
    relaxationMethods: ['숲길 걷기', '식물 가꾸기', '요가', '명상'],
    workLifeBalance: '성장의 기회를 일과 삶 모두에서 찾으세요. 취미에서도 발전을 느끼면 균형이 잡힙니다.',
    burnoutWarning: '새로운 것에 대한 흥미가 사라지고 모든 것이 무의미하게 느껴지면 번아웃 징조입니다.',
    recoveryAdvice: '자연 속에서 에너지를 충전하세요. 새로운 학습이나 여행이 회복에 도움됩니다.'
  },
  '화': {
    stressPattern: '인정받지 못하거나 주목받지 못할 때 스트레스를 받습니다. 열정을 쏟을 곳이 없으면 답답해합니다.',
    triggers: ['인정 부족', '무시당하는 느낌', '지루한 환경', '열정 발산 불가'],
    symptoms: ['분노 폭발', '두통', '수면 장애', '과식/폭식'],
    copingStrategies: ['운동', '댄스', '노래', '열정적인 취미'],
    relaxationMethods: ['수영', '명상', '음악 감상', '휴식'],
    workLifeBalance: '일에서 인정받지 못하면 취미나 봉사에서 성취감을 찾으세요. 열정을 분산시키세요.',
    burnoutWarning: '열정이 식고 모든 것에 무관심해지면 번아웃 징조입니다. 즉시 휴식이 필요합니다.',
    recoveryAdvice: '물가에서 시간을 보내세요. 수영이나 온천이 화기(火氣)를 다스립니다.'
  },
  '토': {
    stressPattern: '불안정하거나 예측 불가능한 상황에서 스트레스를 받습니다. 급격한 변화에 적응하기 어렵습니다.',
    triggers: ['급격한 변화', '불확실성', '불안정한 환경', '신뢰 훼손'],
    symptoms: ['소화 장애', '불안', '과도한 걱정', '체중 변화'],
    copingStrategies: ['루틴 유지', '안정적인 환경 조성', '가족/친구와 시간', '요리'],
    relaxationMethods: ['명상', '정원 가꾸기', '요리', '조용한 휴식'],
    workLifeBalance: '일상의 루틴을 지키세요. 안정적인 생활 리듬이 스트레스를 줄여줍니다.',
    burnoutWarning: '모든 것이 불안하게 느껴지고 작은 변화에도 과민 반응하면 번아웃 징조입니다.',
    recoveryAdvice: '익숙한 환경에서 휴식하세요. 가족과 함께하는 시간이 회복에 도움됩니다.'
  },
  '금': {
    stressPattern: '불공정하거나 비논리적인 상황에서 스트레스를 받습니다. 기준이 모호하면 답답해합니다.',
    triggers: ['불공정한 대우', '비논리적 결정', '품질 저하', '기준 모호'],
    symptoms: ['피부 트러블', '호흡기 문제', '긴장성 두통', '완벽주의 심화'],
    copingStrategies: ['체계적인 정리', '분석과 계획', '논리적 대화', '자격증 공부'],
    relaxationMethods: ['사우나', '깊은 호흡', '명상', '클래식 음악'],
    workLifeBalance: '일에서 완벽을 추구하되 삶에서는 여유를 가지세요. 때로는 불완전함을 수용하세요.',
    burnoutWarning: '모든 것에 비판적이 되고 어떤 것도 만족스럽지 않으면 번아웃 징조입니다.',
    recoveryAdvice: '호흡에 집중하는 명상이 도움됩니다. 자연 속에서 깨끗한 공기를 마시세요.'
  },
  '수': {
    stressPattern: '틀에 갇히거나 창의성이 억압될 때 스트레스를 받습니다. 자유가 없으면 답답해합니다.',
    triggers: ['통제적 환경', '창의성 억압', '고정된 루틴', '변화 부족'],
    symptoms: ['우울', '불면', '신장/방광 문제', '집중력 저하'],
    copingStrategies: ['새로운 경험', '여행', '창작 활동', '다양한 사람 만남'],
    relaxationMethods: ['물가 산책', '온천', '수영', '음악 감상'],
    workLifeBalance: '다양한 경험을 통해 자극을 받으세요. 일상에서도 작은 변화를 시도하세요.',
    burnoutWarning: '모든 것이 무료하게 느껴지고 아무것도 하기 싫어지면 번아웃 징조입니다.',
    recoveryAdvice: '물과 가까이 하세요. 바다, 호수, 온천 등에서 휴식하면 회복됩니다.'
  }
};

export default function CareerStress({ result, name }: CareerStressProps) {
  const dayElement = result.day.stem.element;
  const stress = ELEMENT_STRESS[dayElement] || ELEMENT_STRESS['목'];

  return (
    <motion.section
      className="glass-strong rounded-3xl p-6 md:p-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-rose-500/20 to-pink-500/20">
          <Brain className="w-7 h-7 text-rose-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            직장 스트레스 관리
          </h2>
          <p className="text-slate-400 text-sm">{name}님의 멘탈 케어</p>
        </div>
      </div>

      {/* 스트레스 패턴 */}
      <div className="glass rounded-2xl p-6 mb-6 bg-gradient-to-br from-rose-500/10 to-pink-500/10">
        <p className="text-slate-300 leading-relaxed">{stress.stressPattern}</p>
      </div>

      {/* 트리거 & 증상 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="glass rounded-2xl p-5 border border-amber-500/30">
          <div className="flex items-center gap-2 text-amber-400 mb-3">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-semibold">스트레스 트리거</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {stress.triggers.map((trigger, idx) => (
              <span key={idx} className="px-3 py-1.5 bg-amber-500/20 text-amber-300 rounded-lg text-sm">
                {trigger}
              </span>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-5 border border-rose-500/30">
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <Heart className="w-5 h-5" />
            <h3 className="font-semibold">나타나는 증상</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {stress.symptoms.map((symptom, idx) => (
              <span key={idx} className="px-3 py-1.5 bg-rose-500/20 text-rose-300 rounded-lg text-sm">
                {symptom}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 대처 전략 & 휴식 방법 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 text-emerald-400 mb-3">
            <Coffee className="w-5 h-5" />
            <h3 className="font-semibold">대처 전략</h3>
          </div>
          <div className="space-y-2">
            {stress.copingStrategies.map((strategy, idx) => (
              <div key={idx} className="flex items-center gap-2 text-slate-300 text-sm">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                {strategy}
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 text-blue-400 mb-3">
            <Moon className="w-5 h-5" />
            <h3 className="font-semibold">휴식 방법</h3>
          </div>
          <div className="space-y-2">
            {stress.relaxationMethods.map((method, idx) => (
              <div key={idx} className="flex items-center gap-2 text-slate-300 text-sm">
                <Leaf className="w-4 h-4 text-blue-400" />
                {method}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 워라밸 */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 text-purple-400 mb-3">
          <Dumbbell className="w-5 h-5" />
          <h3 className="font-semibold">워라밸 조언</h3>
        </div>
        <p className="text-slate-300 leading-relaxed">{stress.workLifeBalance}</p>
      </div>

      {/* 번아웃 경고 & 회복 조언 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-5 border border-rose-500/30">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-rose-300 mb-2">🔥 번아웃 경고</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{stress.burnoutWarning}</p>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-5 bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
          <div className="flex items-start gap-3">
            <Heart className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-emerald-300 mb-2">💚 회복 조언</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{stress.recoveryAdvice}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
