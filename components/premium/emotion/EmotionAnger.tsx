'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Flame, AlertTriangle, Wind, Heart } from 'lucide-react';

interface EmotionAngerProps {
  result: SajuResult;
  name: string;
}

export default function EmotionAnger({ result, name }: EmotionAngerProps) {
  // 화(火) 에너지 분석
  const analyzeFireEnergy = () => {
    const { 화 } = result.elements;
    const { 관성 } = result.tenGodsCount;

    let intensity = 0;
    let level = '';
    let description = '';

    // 화 개수에 따른 분노 강도
    if (화 >= 4) {
      intensity = 90;
      level = '매우 높음';
      description = '화 기운이 매우 강해 감정이 격렬하고 즉각적으로 분노가 표출될 수 있습니다.';
    } else if (화 === 3) {
      intensity = 75;
      level = '높음';
      description = '화 기운이 강해 열정적이지만, 분노로 쉽게 전환될 수 있습니다.';
    } else if (화 === 2) {
      intensity = 50;
      level = '보통';
      description = '적당한 화 기운으로 균형잡힌 감정 표현이 가능합니다.';
    } else if (화 === 1) {
      intensity = 30;
      level = '낮음';
      description = '화 기운이 약해 분노를 잘 느끼지 않거나 억압하는 경향이 있습니다.';
    } else {
      intensity = 20;
      level = '매우 낮음';
      description = '화 기운이 없어 감정 표현이 소극적이고 내면화되는 경향이 있습니다.';
    }

    // 관성이 있으면 분노 증가 (억압과 규제에 대한 반발)
    if (관성 >= 2) intensity = Math.min(intensity + 15, 100);

    return { intensity, level, description, fireCount: 화 };
  };

  // 분노 트리거 분석
  const getAngerTriggers = () => {
    const { 목, 화, 토, 금, 수 } = result.elements;
    const { 관성, 재성, 식상, 비겁 } = result.tenGodsCount;

    const triggers = [];

    if (관성 >= 2) {
      triggers.push({
        trigger: '권위와 통제',
        situation: '상사의 부당한 지시, 규칙에 의한 제약, 자유 억압',
        reason: '관성이 강해 타인의 통제에 민감하게 반응합니다',
        icon: '👔',
      });
    }

    if (비겁 >= 2) {
      triggers.push({
        trigger: '경쟁과 비교',
        situation: '타인과의 비교, 경쟁 상황, 인정받지 못함',
        reason: '비겁이 있어 자존심 손상에 강한 분노를 느낍니다',
        icon: '🏆',
      });
    }

    if (재성 >= 2) {
      triggers.push({
        trigger: '손실과 실패',
        situation: '재물 손실, 기회 놓침, 투자 실패',
        reason: '재성이 강해 물질적 손실에 예민합니다',
        icon: '💸',
      });
    }

    if (식상 >= 2) {
      triggers.push({
        trigger: '표현 억압',
        situation: '의견이 무시됨, 창의성 제약, 자기표현 방해',
        reason: '식상이 강해 자유로운 표현을 막을 때 화가 납니다',
        icon: '🎨',
      });
    }

    if (화 >= 3) {
      triggers.push({
        trigger: '정의감 침해',
        situation: '불공정한 대우, 부당한 상황, 약자 피해',
        reason: '화 기운이 강해 정의롭지 못한 상황에 분노합니다',
        icon: '⚖️',
      });
    }

    if (목 >= 3) {
      triggers.push({
        trigger: '성장 방해',
        situation: '발전 기회 차단, 변화 저항, 성장 제약',
        reason: '목 기운이 강해 성장을 막는 장애물에 분노합니다',
        icon: '🚧',
      });
    }

    return triggers.slice(0, 5);
  };

  // 진정 방법 제시
  const getCalmingMethods = () => {
    const { 목, 화, 토, 금, 수 } = result.elements;
    const dayElement = result.day.stem.element;

    const methods = [];

    // 수(水)로 화(火) 제어
    if (수 >= 1) {
      methods.push({
        method: '물의 진정법',
        technique: '찬물 마시기, 샤워, 수영',
        effect: '수 기운이 화 기운을 식혀 진정시킵니다',
        priority: 'high',
        color: 'text-blue-400',
      });
    } else {
      methods.push({
        method: '물 에너지 보충',
        technique: '물 많이 마시기, 폭포/강 보기, 수족관 방문',
        effect: '부족한 수 기운을 보충하여 감정을 식힙니다',
        priority: 'high',
        color: 'text-blue-400',
      });
    }

    // 토(土)로 화(火) 흡수
    if (토 >= 1) {
      methods.push({
        method: '땅의 안정법',
        technique: '맨발 걷기, 흙 만지기, 자연 산책',
        effect: '토 기운이 화 기운을 받아들여 안정시킵니다',
        priority: 'high',
        color: 'text-yellow-400',
      });
    }

    // 심호흡과 명상
    methods.push({
      method: '호흡 조절법',
      technique: '4-7-8 호흡법 (4초 들숨, 7초 멈춤, 8초 날숨)',
      effect: '자율신경을 안정시켜 분노를 완화합니다',
      priority: 'high',
      color: 'text-green-400',
    });

    // 물리적 해소
    if (화 >= 2 || 목 >= 2) {
      methods.push({
        method: '운동 발산법',
        technique: '달리기, 복싱, 격렬한 운동으로 에너지 발산',
        effect: '과도한 화/목 기운을 건강하게 배출합니다',
        priority: 'medium',
        color: 'text-red-400',
      });
    }

    // 공간 이동
    methods.push({
      method: '환경 전환법',
      technique: '현장 떠나기, 장소 이동, 시원한 곳 가기',
      effect: '트리거 상황에서 벗어나 객관성을 회복합니다',
      priority: 'high',
      color: 'text-purple-400',
    });

    // 표현 기법
    methods.push({
      method: '건전한 표현법',
      technique: '감정 일기, 편지쓰기, 예술 활동',
      effect: '분노를 건설적으로 표출하여 해소합니다',
      priority: 'medium',
      color: 'text-pink-400',
    });

    // 인지 재구성
    if (금 >= 2) {
      methods.push({
        method: '논리적 분석법',
        technique: '상황을 객관적으로 분석, 사실과 감정 분리',
        effect: '금 기운의 이성으로 감정을 정제합니다',
        priority: 'medium',
        color: 'text-slate-300',
      });
    }

    return methods;
  };

  const fireAnalysis = analyzeFireEnergy();
  const triggers = getAngerTriggers();
  const calmingMethods = getCalmingMethods();

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold mb-8 gradient-text flex items-center gap-3">
        <Flame className="w-8 h-8 text-red-400" />
        분노 관리
      </h2>

      {/* 화(火) 에너지 분석 */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-red-400 mb-5 flex items-center gap-2">
          🔥 화(火) 에너지 분석
        </h3>
        <div className="glass rounded-2xl p-6">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <div className="text-sm text-slate-400 mb-2">화 기운</div>
              <div className="text-2xl font-bold text-red-400">{fireAnalysis.fireCount}개</div>
            </div>
            <div>
              <div className="text-sm text-slate-400 mb-2">분노 강도</div>
              <div className="text-2xl font-bold text-orange-400">{fireAnalysis.level}</div>
            </div>
            <div>
              <div className="text-sm text-slate-400 mb-2">조절 능력</div>
              <div className="text-2xl font-bold text-yellow-400">
                {fireAnalysis.intensity <= 30 ? '높음' : fireAnalysis.intensity <= 60 ? '보통' : '주의필요'}
              </div>
            </div>
          </div>

          {/* 강도 바 */}
          <div className="mb-6">
            <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"
                initial={{ width: 0 }}
                whileInView={{ width: `${fireAnalysis.intensity}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
            <div className="text-xs text-slate-400 mt-2 text-right">{fireAnalysis.intensity}%</div>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-5">
            <p className="text-slate-300 leading-relaxed">{fireAnalysis.description}</p>
          </div>
        </div>
      </div>

      {/* 분노 트리거 */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-orange-400 mb-5 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6" />
          분노 유발 상황
        </h3>
        <div className="space-y-4">
          {triggers.map((item, index) => (
            <motion.div
              key={item.trigger}
              className="glass rounded-2xl p-5 hover:bg-slate-800/60 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">{item.icon}</div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-red-400 mb-2">{item.trigger}</h4>
                  <div className="text-slate-300 mb-2">
                    <strong className="text-orange-400">상황:</strong> {item.situation}
                  </div>
                  <div className="text-sm text-slate-400 italic">
                    💡 {item.reason}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {triggers.length === 0 && (
          <div className="glass rounded-2xl p-6 text-center text-slate-400">
            <p>특별한 분노 트리거가 발견되지 않았습니다.</p>
            <p className="text-sm mt-2">일상적인 스트레스 관리로 충분합니다.</p>
          </div>
        )}
      </div>

      {/* 진정 방법 */}
      <div>
        <h3 className="text-xl font-bold text-cyan-400 mb-5 flex items-center gap-2">
          <Wind className="w-6 h-6" />
          분노 진정 방법
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {calmingMethods.map((method, index) => (
            <motion.div
              key={method.method}
              className="glass rounded-2xl p-5 hover:scale-[1.02] transition-transform"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className={`font-bold text-lg ${method.color}`}>{method.method}</h4>
                {method.priority === 'high' && (
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">
                    추천
                  </span>
                )}
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-slate-400">방법:</span>
                  <span className="text-slate-300 ml-2">{method.technique}</span>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <span className="text-emerald-400 font-semibold">효과:</span>
                  <span className="text-slate-300 ml-2">{method.effect}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 긴급 대응 가이드 */}
      <motion.div
        className="mt-8 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl p-6 border border-red-500/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <h4 className="font-bold text-red-400 mb-4 flex items-center gap-2">
          <Heart className="w-6 h-6" />
          분노 순간 긴급 대응법 (1분 이내)
        </h4>
        <div className="space-y-3 text-sm text-slate-300">
          <div className="flex items-start gap-3">
            <span className="font-bold text-red-400 min-w-[60px]">1단계</span>
            <span>즉시 그 자리를 떠나세요. 화장실, 밖, 다른 방 어디든 좋습니다.</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="font-bold text-orange-400 min-w-[60px]">2단계</span>
            <span>찬물을 마시거나 손을 씻으세요. 물리적으로 몸을 식힙니다.</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="font-bold text-yellow-400 min-w-[60px]">3단계</span>
            <span>4초 들숨, 7초 멈춤, 8초 날숨을 3회 반복하세요.</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="font-bold text-green-400 min-w-[60px]">4단계</span>
            <span>마음속으로 10까지 천천히 세면서 진정하세요.</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="font-bold text-cyan-400 min-w-[60px]">5단계</span>
            <span>진정된 후, 상황을 객관적으로 다시 평가하세요.</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-red-500/20 text-xs text-slate-400">
          ⚠️ 분노가 통제되지 않거나 폭력적 충동이 느껴진다면, 즉시 전문가의 도움을 받으세요.
        </div>
      </motion.div>
    </motion.div>
  );
}
