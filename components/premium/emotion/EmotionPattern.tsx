'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { TrendingUp, AlertCircle, Sparkles, Activity } from 'lucide-react';

interface EmotionPatternProps {
  result: SajuResult;
  name: string;
  emotionScore: number;
}

export default function EmotionPattern({
  result,
  name,
  emotionScore,
}: EmotionPatternProps) {
  // 기본 성향 분석
  const getBaseTendency = () => {
    const { 목, 화, 토, 금, 수 } = result.elements;
    const { yang, yin } = result.yinYangBalance;

    const tendencies = [];

    // 오행별 성향
    if (목 >= 2) {
      tendencies.push({
        element: '목(木)',
        trait: '희망 지향적',
        description: '새로운 가능성에 대한 기대감이 크며, 성장과 발전을 통해 감정적 만족을 얻습니다.',
        icon: '🌱',
      });
    }
    if (화 >= 2) {
      tendencies.push({
        element: '화(火)',
        trait: '열정 표현형',
        description: '감정을 솔직하게 표현하며, 열정적으로 살아갑니다. 감정 기복이 있을 수 있습니다.',
        icon: '🔥',
      });
    }
    if (토 >= 2) {
      tendencies.push({
        element: '토(土)',
        trait: '안정 추구형',
        description: '변화보다는 안정을 선호하며, 차분하고 신중하게 감정을 다룹니다.',
        icon: '🪨',
      });
    }
    if (금 >= 2) {
      tendencies.push({
        element: '금(金)',
        trait: '이성 중심형',
        description: '감정을 논리적으로 분석하고 통제하려 합니다. 완벽주의 성향이 있을 수 있습니다.',
        icon: '💎',
      });
    }
    if (수 >= 2) {
      tendencies.push({
        element: '수(水)',
        trait: '유연 적응형',
        description: '상황에 따라 감정을 유연하게 조절하며, 깊은 사색을 통해 지혜를 얻습니다.',
        icon: '💧',
      });
    }

    // 음양 성향
    if (yang > yin * 1.3) {
      tendencies.push({
        element: '양(陽)',
        trait: '외향적 표현',
        description: '감정을 외부로 표출하는 경향이 강하며, 활동적이고 사교적입니다.',
        icon: '☀️',
      });
    } else if (yin > yang * 1.3) {
      tendencies.push({
        element: '음(陰)',
        trait: '내향적 성찰',
        description: '감정을 내면에서 처리하며, 조용히 사색하고 깊이 생각합니다.',
        icon: '🌙',
      });
    }

    return tendencies.slice(0, 3);
  };

  // 변동 패턴 분석
  const getFluctuationPattern = () => {
    const { 목, 화, 토, 금, 수 } = result.elements;
    const total = 목 + 화 + 토 + 금 + 수;
    const max = Math.max(목, 화, 토, 금, 수);
    const min = Math.min(목, 화, 토, 금, 수);
    const range = max - min;

    let pattern = '';
    let intensity = '';
    let advice = '';

    if (range <= 1) {
      pattern = '매우 안정적';
      intensity = '낮음';
      advice = '감정의 변화가 크지 않아 안정적입니다. 현재의 균형을 유지하세요.';
    } else if (range <= 2) {
      pattern = '안정적';
      intensity = '보통';
      advice = '대체로 안정적이나 상황에 따라 변화가 있습니다. 자기 인식을 높이세요.';
    } else if (range <= 3) {
      pattern = '변동적';
      intensity = '높음';
      advice = '감정의 기복이 있는 편입니다. 규칙적인 생활과 명상이 도움됩니다.';
    } else {
      pattern = '매우 변동적';
      intensity = '매우 높음';
      advice = '감정 변화가 크므로 체계적인 감정 관리가 필요합니다. 전문가 상담을 고려하세요.';
    }

    // 특정 요소에 의한 변동
    const triggers: string[] = [];
    if (화 >= 3) triggers.push('열정적 상황에서 감정이 고조됩니다');
    if (수 >= 3) triggers.push('깊은 사색 중 감정이 요동칩니다');
    if (금 >= 3) triggers.push('완벽주의로 인한 스트레스가 있습니다');
    if (목 >= 3) triggers.push('변화와 성장 욕구로 불안할 수 있습니다');

    return { pattern, intensity, advice, triggers };
  };

  // 트리거 요인 분석
  const getTriggerFactors = () => {
    const { 관성, 재성, 식상, 인성, 비겁 } = result.tenGodsCount;
    const { 목, 화, 토, 금, 수 } = result.elements;

    const triggers = [];

    // 십성 기반 트리거
    if (관성 >= 2) {
      triggers.push({
        category: '권위/압박',
        factor: '상사나 규칙에 대한 스트레스',
        coping: '자기 주장을 적절히 표현하고, 건설적 대화를 시도하세요',
        color: 'text-red-400',
      });
    }
    if (재성 >= 2) {
      triggers.push({
        category: '물질/성취',
        factor: '재물이나 성과에 대한 집착',
        coping: '과정의 가치를 인정하고, 작은 성취도 축하하세요',
        color: 'text-yellow-400',
      });
    }
    if (식상 >= 2) {
      triggers.push({
        category: '표현/창작',
        factor: '자기표현 욕구와 억압의 갈등',
        coping: '창의적 활동으로 감정을 건강하게 표출하세요',
        color: 'text-green-400',
      });
    }
    if (인성 >= 2) {
      triggers.push({
        category: '학습/성장',
        factor: '완벽한 이해와 성장에 대한 압박',
        coping: '불완전함을 수용하고, 과정을 즐기세요',
        color: 'text-blue-400',
      });
    }
    if (비겁 >= 3) {
      triggers.push({
        category: '경쟁/비교',
        factor: '타인과의 비교로 인한 불안',
        coping: '자신만의 속도를 인정하고, 협력의 가치를 발견하세요',
        color: 'text-purple-400',
      });
    }

    // 오행 기반 트리거
    if (수 === 0 || 수 >= 4) {
      triggers.push({
        category: '감정 유연성',
        factor: 수 === 0 ? '감정이 경직되기 쉬움' : '감정이 과도하게 흐르기 쉬움',
        coping: 수 === 0 ? '물과 관련된 활동(수영, 목욕)을 하세요' : '안정된 루틴으로 감정을 고정하세요',
        color: 'text-cyan-400',
      });
    }

    return triggers.slice(0, 5);
  };

  const baseTendencies = getBaseTendency();
  const fluctuation = getFluctuationPattern();
  const triggers = getTriggerFactors();

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold mb-8 gradient-text flex items-center gap-3">
        <Activity className="w-8 h-8 text-cyan-400" />
        감정 패턴 분석
      </h2>

      {/* 기본 성향 */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-cyan-400 mb-5 flex items-center gap-2">
          <Sparkles className="w-6 h-6" />
          기본 감정 성향
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {baseTendencies.map((tendency, index) => (
            <motion.div
              key={tendency.element}
              className="glass rounded-2xl p-5 hover:scale-[1.02] transition-transform"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-3xl mb-3">{tendency.icon}</div>
              <div className="text-sm text-slate-400 mb-1">{tendency.element}</div>
              <div className="text-lg font-bold text-white mb-2">{tendency.trait}</div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {tendency.description}
              </p>
            </motion.div>
          ))}
        </div>
        {baseTendencies.length === 0 && (
          <div className="glass rounded-2xl p-5 text-center text-slate-400">
            <p>오행이 고르게 분포되어 있어 균형잡힌 감정 성향을 가집니다.</p>
          </div>
        )}
      </div>

      {/* 변동 패턴 */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-purple-400 mb-5 flex items-center gap-2">
          <TrendingUp className="w-6 h-6" />
          감정 변동 패턴
        </h3>
        <div className="glass rounded-2xl p-6">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <div className="text-sm text-slate-400 mb-2">변동 패턴</div>
              <div className="text-2xl font-bold text-purple-400">{fluctuation.pattern}</div>
            </div>
            <div>
              <div className="text-sm text-slate-400 mb-2">변동 강도</div>
              <div className="text-2xl font-bold text-cyan-400">{fluctuation.intensity}</div>
            </div>
            <div>
              <div className="text-sm text-slate-400 mb-2">안정도 점수</div>
              <div className="text-2xl font-bold text-emerald-400">{emotionScore}점</div>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-5 mb-4">
            <p className="text-slate-300 leading-relaxed">{fluctuation.advice}</p>
          </div>

          {fluctuation.triggers.length > 0 && (
            <div>
              <div className="text-sm font-semibold text-slate-400 mb-3">주요 변동 요인:</div>
              <div className="space-y-2">
                {fluctuation.triggers.map((trigger, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2 text-sm text-slate-300"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    {trigger}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 트리거 요인 */}
      <div>
        <h3 className="text-xl font-bold text-amber-400 mb-5 flex items-center gap-2">
          <AlertCircle className="w-6 h-6" />
          감정 트리거 요인
        </h3>
        <div className="space-y-4">
          {triggers.map((trigger, index) => (
            <motion.div
              key={trigger.category}
              className="glass rounded-2xl p-5 hover:bg-slate-800/60 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-xl">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className={`font-bold text-lg mb-1 ${trigger.color}`}>
                    {trigger.category}
                  </div>
                  <div className="text-slate-300 mb-2">{trigger.factor}</div>
                  <div className="bg-slate-800/50 rounded-lg p-3 mt-2">
                    <div className="text-sm text-emerald-400 font-semibold mb-1">대처법:</div>
                    <div className="text-sm text-slate-300">{trigger.coping}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {triggers.length === 0 && (
          <div className="glass rounded-2xl p-6 text-center">
            <p className="text-slate-300">
              특별한 감정 트리거가 발견되지 않았습니다.
              <br />
              일상적인 자기 관찰을 통해 개인적 패턴을 파악하세요.
            </p>
          </div>
        )}
      </div>

      {/* 패턴 활용 팁 */}
      <motion.div
        className="mt-8 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl p-6 border border-cyan-500/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <h4 className="font-bold text-cyan-400 mb-3 flex items-center gap-2">
          💡 패턴 활용 가이드
        </h4>
        <div className="space-y-2 text-sm text-slate-300">
          <p>• <strong>자기 인식:</strong> 자신의 감정 패턴을 이해하고 받아들이세요</p>
          <p>• <strong>조기 감지:</strong> 트리거 상황을 미리 파악하여 대비하세요</p>
          <p>• <strong>적극적 대응:</strong> 감정이 커지기 전에 대처법을 실천하세요</p>
          <p>• <strong>기록 습관:</strong> 감정 일기로 패턴을 더욱 명확히 파악하세요</p>
          <p>• <strong>전문가 도움:</strong> 필요시 심리 상담을 통해 깊이 탐색하세요</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
