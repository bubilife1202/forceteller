'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Zap, AlertTriangle, Shield, Target, Brain, Heart } from 'lucide-react';

interface EmotionTriggerProps {
  result: SajuResult;
  name: string;
}

export default function EmotionTrigger({ result, name }: EmotionTriggerProps) {
  // 감정 트리거 유형 분석
  const analyzeTriggerTypes = () => {
    const { 목, 화, 토, 금, 수 } = result.elements;
    const { 관성, 재성, 식상, 인성, 비겁 } = result.tenGodsCount;
    const dayElement = result.day.stem.element;

    const triggers = [];

    // 관성 트리거 - 권위, 통제
    if (관성 >= 3) {
      triggers.push({
        type: '권위/통제 상황',
        intensity: 85,
        situations: [
          '상사나 윗사람의 명령이나 지시',
          '규칙과 규제에 얽매이는 상황',
          '자유가 제한되는 환경',
          '평가받거나 감시받는 느낌'
        ],
        reaction: '저항하거나 답답함을 느끼고 감정이 폭발할 수 있습니다',
        color: 'text-red-400',
        icon: '⚠️'
      });
    } else if (관성 === 0) {
      triggers.push({
        type: '방향성 부족',
        intensity: 65,
        situations: [
          '목표나 방향이 불명확한 상황',
          '결정을 내려야 하는 순간',
          '책임감을 느껴야 할 때',
          '체계가 없는 환경'
        ],
        reaction: '불안하거나 초조해지며 방황하는 느낌을 받습니다',
        color: 'text-orange-400',
        icon: '🌀'
      });
    }

    // 재성 트리거 - 성취, 물질
    if (재성 >= 3) {
      triggers.push({
        type: '성과 압박',
        intensity: 80,
        situations: [
          '목표 달성이 어려운 상황',
          '경쟁에서 뒤처지는 느낌',
          '재정적 불안정',
          '소유욕이 좌절될 때'
        ],
        reaction: '조급해지고 불안하며 자기비판이 심해집니다',
        color: 'text-yellow-400',
        icon: '💰'
      });
    } else if (재성 === 0) {
      triggers.push({
        type: '현실 압박',
        intensity: 60,
        situations: [
          '돈이나 물질에 신경 써야 할 때',
          '실용적 결정을 해야 할 때',
          '계획을 실행해야 하는 순간',
          '책임을 져야 하는 상황'
        ],
        reaction: '회피하고 싶어지거나 막막함을 느낍니다',
        color: 'text-amber-400',
        icon: '📊'
      });
    }

    // 식상 트리거 - 표현, 창의성
    if (식상 >= 3) {
      triggers.push({
        type: '표현 억압',
        intensity: 75,
        situations: [
          '의견을 말할 수 없는 환경',
          '창의성이 제한되는 상황',
          '자유로운 표현이 막힐 때',
          '무시당하거나 인정받지 못할 때'
        ],
        reaction: '답답하고 폭발적으로 감정을 표출하게 됩니다',
        color: 'text-green-400',
        icon: '💬'
      });
    } else if (식상 === 0) {
      triggers.push({
        type: '감정 표현 요구',
        intensity: 65,
        situations: [
          '감정을 드러내야 하는 순간',
          '자기 의견을 말해야 할 때',
          '창의성이 필요한 상황',
          '즉흥적 대처가 필요할 때'
        ],
        reaction: '위축되고 말문이 막히며 회피하고 싶어집니다',
        color: 'text-lime-400',
        icon: '🤐'
      });
    }

    // 인성 트리거 - 학습, 사고
    if (인성 >= 3) {
      triggers.push({
        type: '과도한 자극',
        intensity: 70,
        situations: [
          '정보가 너무 많은 환경',
          '빠른 결정을 요구받을 때',
          '생각할 시간이 없는 상황',
          '단순 반복 작업'
        ],
        reaction: '머릿속이 복잡해지고 생각의 소용돌이에 빠집니다',
        color: 'text-blue-400',
        icon: '🧠'
      });
    } else if (인성 === 0) {
      triggers.push({
        type: '지적 요구',
        intensity: 60,
        situations: [
          '복잡한 개념을 이해해야 할 때',
          '학습이 필요한 상황',
          '깊은 사고가 요구될 때',
          '이론적 설명을 들어야 할 때'
        ],
        reaction: '지루하거나 짜증나며 집중하기 어렵습니다',
        color: 'text-sky-400',
        icon: '📚'
      });
    }

    // 비겁 트리거 - 자존감, 경쟁
    if (비겁 >= 3) {
      triggers.push({
        type: '자존심 상함',
        intensity: 85,
        situations: [
          '무시당하거나 비교당할 때',
          '경쟁에서 패배하는 상황',
          '자신감이 꺾이는 순간',
          '동료와의 갈등'
        ],
        reaction: '자존심이 상하고 방어적이 되거나 공격적으로 반응합니다',
        color: 'text-purple-400',
        icon: '👊'
      });
    } else if (비겁 === 0) {
      triggers.push({
        type: '혼자 감당',
        intensity: 75,
        situations: [
          '혼자 결정해야 하는 상황',
          '경쟁해야 하는 환경',
          '자신감이 필요한 순간',
          '주도적으로 행동해야 할 때'
        ],
        reaction: '불안하고 위축되며 도움을 받고 싶어집니다',
        color: 'text-pink-400',
        icon: '😰'
      });
    }

    // 오행별 추가 트리거
    if (화 >= 4) {
      triggers.push({
        type: '열정 좌절',
        intensity: 80,
        situations: [
          '흥미를 잃었을 때',
          '지루하고 단조로운 환경',
          '열정을 쏟을 곳이 없을 때',
          '인정받지 못하는 상황'
        ],
        reaction: '에너지가 폭발하거나 갑자기 의욕을 잃습니다',
        color: 'text-rose-400',
        icon: '🔥'
      });
    }

    if (수 >= 3) {
      triggers.push({
        type: '변화와 불확실성',
        intensity: 70,
        situations: [
          '급작스러운 변화',
          '불확실한 미래',
          '통제할 수 없는 상황',
          '예측하지 못한 일'
        ],
        reaction: '불안하고 흔들리며 두려움을 느낍니다',
        color: 'text-cyan-400',
        icon: '🌊'
      });
    }

    if (금 >= 3) {
      triggers.push({
        type: '무질서와 혼란',
        intensity: 75,
        situations: [
          '정리되지 않은 환경',
          '계획이 틀어지는 상황',
          '규칙이 지켜지지 않을 때',
          '완벽하지 못한 결과'
        ],
        reaction: '예민해지고 짜증나며 통제하려 합니다',
        color: 'text-slate-300',
        icon: '⚙️'
      });
    }

    return triggers.sort((a, b) => b.intensity - a.intensity);
  };

  // 대응 전략
  const getCopingStrategies = () => {
    const { 목, 화, 토, 금, 수 } = result.elements;
    const dayElement = result.day.stem.element;

    const strategies = [];

    // 일간별 맞춤 전략
    if (dayElement === '목') {
      strategies.push({
        title: '목(木)일간 감정 조절법',
        immediate: [
          '잠깐 자리를 떠나 신선한 공기 마시기',
          '스트레칭으로 몸을 움직이기',
          '창밖 자연을 바라보기',
          '깊게 숨 쉬며 성장을 상상하기'
        ],
        longTerm: [
          '규칙적인 운동 루틴 만들기',
          '자연 속에서 시간 보내기',
          '새로운 취미나 배움의 기회 찾기',
          '유연성을 기르는 요가나 명상'
        ],
        color: 'text-green-400'
      });
    } else if (dayElement === '화') {
      strategies.push({
        title: '화(火)일간 감정 조절법',
        immediate: [
          '격렬한 운동으로 에너지 발산',
          '큰 소리로 노래 부르기',
          '종이에 감정을 마구 쓰기',
          '차갑게 식히기 (찬물, 찬 공기)'
        ],
        longTerm: [
          '정기적인 유산소 운동',
          '창작 활동으로 에너지 표출',
          '명상으로 마음의 불 조절하기',
          '열정을 긍정적으로 쓸 프로젝트 찾기'
        ],
        color: 'text-red-400'
      });
    } else if (dayElement === '토') {
      strategies.push({
        title: '토(土)일간 감정 조절법',
        immediate: [
          '편안한 공간으로 이동하기',
          '따뜻한 차나 음료 마시기',
          '부드러운 음악 듣기',
          '좋아하는 향 맡기'
        ],
        longTerm: [
          '안정된 일상 루틴 만들기',
          '좋아하는 음식과 취미 즐기기',
          '명상과 마음챙김 습관화',
          '편안한 환경 조성하기'
        ],
        color: 'text-yellow-400'
      });
    } else if (dayElement === '금') {
      strategies.push({
        title: '금(金)일간 감정 조절법',
        immediate: [
          '주변 정리 정돈하기',
          '리스트 작성으로 정리하기',
          '클래식 음악 감상',
          '품질 좋은 물건 사용하기'
        ],
        longTerm: [
          '체계적인 일정 관리',
          '품격있는 취미 기르기',
          '완벽주의 내려놓기 연습',
          '정기적인 명상과 호흡법'
        ],
        color: 'text-slate-300'
      });
    } else if (dayElement === '수') {
      strategies.push({
        title: '수(水)일간 감정 조절법',
        immediate: [
          '물 마시거나 씻기',
          '조용한 곳에서 혼자 시간 갖기',
          '좋아하는 음악이나 팟캐스트',
          '일기나 메모로 감정 정리'
        ],
        longTerm: [
          '수영이나 물과 친한 활동',
          '독서와 사색의 시간',
          '유연한 사고 기르기',
          '흐름에 맡기는 연습'
        ],
        color: 'text-blue-400'
      });
    }

    // 보편적 즉각 대응법
    strategies.push({
      title: '즉각 대응 3단계',
      immediate: [
        '1단계: 멈추기 - 현재 상황에서 잠시 멈춤',
        '2단계: 호흡하기 - 깊고 천천히 5번 호흡',
        '3단계: 관찰하기 - 감정을 판단 없이 알아차림',
        '선택하기 - 의식적으로 반응 선택'
      ],
      longTerm: [
        '정기적인 마음챙김 명상',
        '감정 일기 쓰기',
        '트리거 패턴 분석하기',
        '전문가 상담 고려'
      ],
      color: 'text-purple-400'
    });

    return strategies;
  };

  // 예방 전략
  const getPreventionStrategies = () => {
    return {
      daily: [
        {
          title: '일상 관리',
          tips: [
            '충분한 수면 (7-8시간)',
            '규칙적인 식사와 수분 섭취',
            '매일 30분 이상 운동',
            '햇빛 쬐며 산책하기'
          ],
          reason: '신체 건강이 감정 안정의 기초입니다'
        },
        {
          title: '마음 관리',
          tips: [
            '아침 5분 명상으로 하루 시작',
            '감사 일기 쓰기',
            '긍정적 자기 대화',
            '디지털 디톡스 시간 갖기'
          ],
          reason: '마음의 여유가 트리거에 대한 저항력을 높입니다'
        },
        {
          title: '관계 관리',
          tips: [
            '경계선 명확히 하기',
            '감정을 건강하게 표현하기',
            '지지적인 사람들과 시간 보내기',
            '독성 관계 정리하기'
          ],
          reason: '건강한 관계가 감정적 안전망이 됩니다'
        }
      ],
      environmental: [
        '편안하고 정돈된 공간 만들기',
        '자극을 줄인 조용한 환경',
        '자연과 가까운 곳에서 시간 보내기',
        '스트레스 줄이는 물건 비치 (향초, 식물 등)'
      ]
    };
  };

  // 트리거 인식 훈련
  const getTriggerAwarenessExercise = () => {
    return {
      steps: [
        {
          step: 1,
          title: '감정 알아차리기',
          description: '어떤 감정을 느끼는지 이름 붙이기 (분노, 불안, 슬픔 등)',
          practice: '하루에 3번, 지금 느끼는 감정에 이름을 붙여보세요'
        },
        {
          step: 2,
          title: '신체 반응 관찰',
          description: '몸의 어디에서 감정을 느끼는지 알아차리기',
          practice: '가슴이 답답한지, 배가 아픈지, 주먹을 쥐고 있는지 확인하세요'
        },
        {
          step: 3,
          title: '트리거 찾기',
          description: '무엇이 이 감정을 촉발했는지 파악하기',
          practice: '감정이 강해지기 직전 무슨 일이 있었는지 떠올려보세요'
        },
        {
          step: 4,
          title: '패턴 발견',
          description: '반복되는 트리거 상황이 무엇인지 찾기',
          practice: '일주일간 감정 일기를 쓰며 공통점을 찾아보세요'
        },
        {
          step: 5,
          title: '대응 계획',
          description: '각 트리거에 대한 건강한 대응법 준비하기',
          practice: '주요 트리거 3가지에 대한 대응 계획을 세워보세요'
        }
      ],
      journalTemplate: {
        when: '언제? (날짜, 시간)',
        where: '어디서? (장소, 상황)',
        who: '누구와? (혼자/타인)',
        trigger: '트리거는? (무엇이 촉발했나)',
        emotion: '감정은? (어떤 느낌이었나)',
        intensity: '강도는? (1-10점)',
        bodyReaction: '신체 반응은? (어디가 어땠나)',
        response: '어떻게 반응했나?',
        betterWay: '더 나은 방법은?'
      }
    };
  };

  const triggers = analyzeTriggerTypes();
  const copingStrategies = getCopingStrategies();
  const prevention = getPreventionStrategies();
  const awarenessExercise = getTriggerAwarenessExercise();

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold mb-8 gradient-text flex items-center gap-3">
        <Zap className="w-8 h-8 text-yellow-400" />
        감정 트리거 분석
      </h2>

      {/* 주요 트리거들 */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-orange-400 mb-5 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6" />
          {name}님의 주요 감정 트리거
        </h3>
        <div className="space-y-4">
          {triggers.map((trigger, index) => (
            <motion.div
              key={trigger.type}
              className="glass rounded-2xl p-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{trigger.icon}</span>
                  <div>
                    <h4 className={`font-bold text-lg ${trigger.color}`}>{trigger.type}</h4>
                    <div className="text-sm text-slate-400 mt-1">트리거 강도: {trigger.intensity}%</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-orange-400">{trigger.intensity}</div>
                </div>
              </div>

              {/* 강도 바 */}
              <div className="mb-4">
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${trigger.intensity}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="text-sm font-semibold text-cyan-400 mb-3">촉발 상황:</div>
                  <div className="space-y-2">
                    {trigger.situations.map((situation, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="text-orange-400 mt-0.5">•</span>
                        {situation}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="text-sm font-semibold text-pink-400 mb-3">전형적 반응:</div>
                  <p className="text-sm text-slate-300 leading-relaxed">{trigger.reaction}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 대응 전략 */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-emerald-400 mb-5 flex items-center gap-2">
          <Shield className="w-6 h-6" />
          맞춤 대응 전략
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {copingStrategies.map((strategy, index) => (
            <motion.div
              key={strategy.title}
              className="glass rounded-2xl p-6 hover:scale-[1.02] transition-transform"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className={`font-bold text-lg mb-4 ${strategy.color}`}>{strategy.title}</h4>

              <div className="mb-4">
                <div className="text-sm font-semibold text-cyan-400 mb-2">즉각 대응:</div>
                <div className="space-y-2">
                  {strategy.immediate.map((method, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-green-400 mt-0.5">→</span>
                      <span>{method}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-3">
                <div className="text-sm font-semibold text-purple-400 mb-2">장기 전략:</div>
                <div className="space-y-2">
                  {strategy.longTerm.map((method, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-emerald-400 mt-0.5">✓</span>
                      <span>{method}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 예방 전략 */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-purple-400 mb-5 flex items-center gap-2">
          <Target className="w-6 h-6" />
          트리거 예방 전략
        </h3>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {prevention.daily.map((category, index) => (
            <motion.div
              key={category.title}
              className="glass rounded-2xl p-5"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="font-bold text-cyan-400 mb-3">{category.title}</h4>
              <div className="space-y-2 mb-4">
                {category.tips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-emerald-400 mt-0.5">✓</span>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3">
                <span className="text-purple-400 font-semibold text-xs">이유:</span>
                <p className="text-slate-300 text-xs mt-1">{category.reason}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="glass rounded-2xl p-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h4 className="font-bold text-pink-400 mb-3">환경 조성:</h4>
          <div className="grid md:grid-cols-2 gap-3">
            {prevention.environmental.map((tip, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="text-yellow-400 mt-0.5">★</span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 트리거 인식 훈련 */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-blue-400 mb-5 flex items-center gap-2">
          <Brain className="w-6 h-6" />
          트리거 인식 훈련
        </h3>
        <div className="space-y-4">
          {awarenessExercise.steps.map((step, index) => (
            <motion.div
              key={step.step}
              className="glass rounded-2xl p-5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  {step.step}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-cyan-400 mb-2">{step.title}</h4>
                  <p className="text-sm text-slate-300 mb-3">{step.description}</p>
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <span className="text-emerald-400 font-semibold text-xs">실천:</span>
                    <p className="text-slate-300 text-xs mt-1">{step.practice}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 감정 일기 템플릿 */}
      <motion.div
        className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-blue-500/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <h4 className="font-bold text-blue-400 mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5" />
          감정 트리거 일기 템플릿
        </h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          {Object.entries(awarenessExercise.journalTemplate).map(([key, value], index) => (
            <div key={key} className="bg-slate-800/50 rounded-lg p-3">
              <div className="text-cyan-400 font-semibold mb-1">{value}</div>
              <div className="text-slate-500 text-xs">________________________________</div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-blue-500/20 text-xs text-slate-400">
          💡 매일 저녁 5분, 감정이 강했던 순간을 기록하면 트리거 패턴을 발견할 수 있습니다!
        </div>
      </motion.div>

      {/* 긴급 대응 카드 */}
      <motion.div
        className="mt-6 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl p-6 border border-red-500/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      >
        <h4 className="font-bold text-red-400 mb-4">🚨 감정 폭발 직전? 지금 당장 이렇게 하세요!</h4>
        <div className="grid md:grid-cols-4 gap-3 text-sm">
          <div className="bg-slate-800/50 rounded-lg p-3 text-center">
            <div className="text-2xl mb-2">🛑</div>
            <div className="font-bold text-orange-400 mb-1">멈추기</div>
            <div className="text-slate-400 text-xs">하던 일 멈추고 자리 비우기</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3 text-center">
            <div className="text-2xl mb-2">🫁</div>
            <div className="font-bold text-cyan-400 mb-1">호흡하기</div>
            <div className="text-slate-400 text-xs">4초 들이쉬고 6초 내쉬기</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3 text-center">
            <div className="text-2xl mb-2">🧊</div>
            <div className="font-bold text-blue-400 mb-1">식히기</div>
            <div className="text-slate-400 text-xs">찬물 마시거나 세수하기</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3 text-center">
            <div className="text-2xl mb-2">💭</div>
            <div className="font-bold text-purple-400 mb-1">선택하기</div>
            <div className="text-slate-400 text-xs">의식적으로 반응 선택</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
