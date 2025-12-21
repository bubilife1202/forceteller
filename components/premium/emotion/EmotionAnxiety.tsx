'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { AlertCircle, Shield, Anchor, Leaf } from 'lucide-react';

interface EmotionAnxietyProps {
  result: SajuResult;
  name: string;
}

export default function EmotionAnxiety({ result, name }: EmotionAnxietyProps) {
  // 토(土) 에너지 분석 - 안정성
  const analyzeEarthEnergy = () => {
    const { 토 } = result.elements;
    const { 관성, 인성 } = result.tenGodsCount;

    let anxietyLevel = 50;
    let stabilityLevel = '';
    let description = '';

    // 토가 부족하면 불안 증가
    if (토=== 0) {
      anxietyLevel = 85;
      stabilityLevel = '매우 불안정';
      description = '토 기운이 없어 중심을 잡기 어렵고 불안과 걱정이 많습니다. 안정감을 찾기 어려워합니다.';
    } else if (토 === 1) {
      anxietyLevel = 60;
      stabilityLevel = '불안정';
      description = '토 기운이 약해 쉽게 흔들리고 걱정이 많은 편입니다. 안정된 환경이 필요합니다.';
    } else if (토 === 2) {
      anxietyLevel = 40;
      stabilityLevel = '보통';
      description = '적당한 토 기운으로 대체로 안정적이나 스트레스 시 불안을 느낍니다.';
    } else if (토 === 3) {
      anxietyLevel = 25;
      stabilityLevel = '안정적';
      description = '토 기운이 강해 안정감이 있고 불안을 잘 관리합니다.';
    } else {
      anxietyLevel = 20;
      stabilityLevel = '매우 안정적';
      description = '토 기운이 매우 강해 중심이 견고하고 불안을 느끼는 일이 드뭅니다.';
    }

    // 관성이 강하면 불안 증가 (외부 압박)
    if (관성 >= 3) anxietyLevel = Math.min(anxietyLevel + 20, 100);
    else if (관성 >= 2) anxietyLevel = Math.min(anxietyLevel + 10, 100);

    // 인성이 과다하면 걱정 증가 (생각이 많음)
    if (인성 >= 3) anxietyLevel = Math.min(anxietyLevel + 15, 100);

    return { anxietyLevel, stabilityLevel, description, earthCount: 토 };
  };

  // 불안 패턴 분석
  const getAnxietyPatterns = () => {
    const { 목, 화, 토, 금, 수 } = result.elements;
    const { 관성, 재성, 식상, 인성, 비겁 } = result.tenGodsCount;

    const patterns = [];

    if (토 <= 1) {
      patterns.push({
        pattern: '불확실성 불안',
        symptom: '미래에 대한 두려움, 결정을 못 내림, 끊임없는 걱정',
        element: '토(土) 부족',
        icon: '🌪️',
      });
    }

    if (관성 >= 2) {
      patterns.push({
        pattern: '평가 불안',
        symptom: '타인의 시선 의식, 실수 두려움, 완벽주의 압박',
        element: '관성(官星) 과다',
        icon: '👁️',
      });
    }

    if (인성 >= 3) {
      patterns.push({
        pattern: '사고 과잉',
        symptom: '걱정의 연쇄, 최악의 시나리오 상상, 결정 마비',
        element: '인성(印星) 과다',
        icon: '🧠',
      });
    }

    if (재성 >= 2 && 비겁 <= 1) {
      patterns.push({
        pattern: '성취 불안',
        symptom: '목표 달성 압박, 실패 공포, 경쟁 스트레스',
        element: '재성 강/비겁 약',
        icon: '🎯',
      });
    }

    if (수 >= 3) {
      patterns.push({
        pattern: '예민 불안',
        symptom: '작은 자극에도 민감, 감정 요동, 과도한 공감',
        element: '수(水) 과다',
        icon: '💧',
      });
    }

    if (목 >= 3 && 토 <= 1) {
      patterns.push({
        pattern: '변화 불안',
        symptom: '급한 성격, 조급함, 기다림을 못 참음',
        element: '목(木) 강/토(土) 약',
        icon: '🌱',
      });
    }

    if (금 >= 3) {
      patterns.push({
        pattern: '통제 불안',
        symptom: '계획대로 안 되면 불안, 예상 밖 상황 공포',
        element: '금(金) 과다',
        icon: '💎',
      });
    }

    return patterns.slice(0, 6);
  };

  // 안정화 방법
  const getStabilizationMethods = () => {
    const { 목, 화, 토, 금, 수 } = result.elements;
    const { 인성 } = result.tenGodsCount;

    const methods = [];

    // 토(土) 강화 - 가장 중요
    if (토 <= 2) {
      methods.push({
        category: '접지 기법 (Grounding)',
        techniques: [
          '맨발로 흙/잔디 밟기',
          '5-4-3-2-1 기법 (5가지 보이는 것, 4가지 만질 수 있는 것...)',
          '무거운 담요 사용',
          '진흙/도자기 만들기',
        ],
        effect: '토 기운을 보충하여 안정감과 현실감을 회복합니다',
        color: 'text-yellow-400',
        priority: 'high',
      });
    }

    // 호흡법
    methods.push({
      category: '호흡 안정법',
      techniques: [
        '복식 호흡 (배로 깊게 숨쉬기)',
        '4-4-4-4 박스 호흡',
        '코로 들이쉬고 입으로 길게 내쉬기',
        '호흡 세기 명상',
      ],
      effect: '자율신경계를 진정시켜 즉각적인 안정을 가져옵니다',
      color: 'text-cyan-400',
      priority: 'high',
    });

    // 신체 이완
    methods.push({
      category: '근육 이완법',
      techniques: [
        '점진적 근육 이완 (발부터 머리까지 순차적으로)',
        '스트레칭 (특히 목, 어깨)',
        '따뜻한 물로 샤워/목욕',
        '부드러운 요가',
      ],
      effect: '신체 긴장을 풀어 정신적 불안을 감소시킵니다',
      color: 'text-green-400',
      priority: 'high',
    });

    // 인지 재구성
    if (금 >= 1 || 인성 >= 1) {
      methods.push({
        category: '생각 전환법',
        techniques: [
          '걱정 기록 후 사실 검증',
          '최악의 경우 vs 현실적 결과 비교',
          '통제 가능/불가능 구분',
          '긍정 확언 반복',
        ],
        effect: '비합리적 생각을 현실적으로 수정하여 불안을 줄입니다',
        color: 'text-purple-400',
        priority: 'medium',
      });
    }

    // 감각 안정
    methods.push({
      category: '감각 진정법',
      techniques: [
        '라벤더, 캐모마일 향기',
        '부드러운 음악 듣기',
        '차가운 물 마시기',
        '손에 얼음 쥐기',
      ],
      effect: '감각을 통해 현재 순간에 집중하게 합니다',
      color: 'text-pink-400',
      priority: 'medium',
    });

    // 규칙적 생활
    if (토 >= 1) {
      methods.push({
        category: '루틴 구축법',
        techniques: [
          '일정한 수면/기상 시간',
          '규칙적인 식사',
          '매일 같은 시간 운동',
          '저녁 의식 (차 마시기, 독서 등)',
        ],
        effect: '예측 가능한 일상이 안정감을 제공합니다',
        color: 'text-amber-400',
        priority: 'medium',
      });
    }

    // 마음챙김
    methods.push({
      category: '마음챙김 명상',
      techniques: [
        '현재 순간 관찰 (판단 없이)',
        '바디스캔 명상',
        '걷기 명상',
        '먹기 명상',
      ],
      effect: '미래 걱정에서 벗어나 현재에 머무릅니다',
      color: 'text-indigo-400',
      priority: 'medium',
    });

    return methods;
  };

  const earthAnalysis = analyzeEarthEnergy();
  const anxietyPatterns = getAnxietyPatterns();
  const stabilizationMethods = getStabilizationMethods();

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold mb-8 gradient-text flex items-center gap-3">
        <AlertCircle className="w-8 h-8 text-amber-400" />
        불안·걱정 관리
      </h2>

      {/* 토(土) 에너지 분석 */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-yellow-400 mb-5 flex items-center gap-2">
          <Anchor className="w-6 h-6" />
          토(土) 안정성 분석
        </h3>
        <div className="glass rounded-2xl p-6">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <div className="text-sm text-slate-400 mb-2">토 기운</div>
              <div className="text-2xl font-bold text-yellow-400">{earthAnalysis.earthCount}개</div>
            </div>
            <div>
              <div className="text-sm text-slate-400 mb-2">안정 수준</div>
              <div className="text-2xl font-bold text-amber-400">{earthAnalysis.stabilityLevel}</div>
            </div>
            <div>
              <div className="text-sm text-slate-400 mb-2">불안 지수</div>
              <div className="text-2xl font-bold text-orange-400">{earthAnalysis.anxietyLevel}%</div>
            </div>
          </div>

          {/* 불안 지수 바 */}
          <div className="mb-6">
            <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500"
                initial={{ width: 0 }}
                whileInView={{ width: `${earthAnalysis.anxietyLevel}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-400 mt-2">
              <span>안정</span>
              <span>불안</span>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-5">
            <p className="text-slate-300 leading-relaxed">{earthAnalysis.description}</p>
          </div>
        </div>
      </div>

      {/* 불안 패턴 */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-orange-400 mb-5 flex items-center gap-2">
          🔍 불안 패턴 유형
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {anxietyPatterns.map((item, index) => (
            <motion.div
              key={item.pattern}
              className="glass rounded-2xl p-5 hover:bg-slate-800/60 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">{item.icon}</div>
                <div className="flex-1">
                  <h4 className="font-bold text-amber-400 mb-2">{item.pattern}</h4>
                  <p className="text-sm text-slate-300 mb-2">{item.symptom}</p>
                  <div className="inline-block px-2 py-1 bg-orange-500/20 rounded text-xs text-orange-400">
                    {item.element}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {anxietyPatterns.length === 0 && (
          <div className="glass rounded-2xl p-6 text-center text-slate-400">
            <p>특별한 불안 패턴이 발견되지 않았습니다.</p>
            <p className="text-sm mt-2">전반적으로 안정적인 상태입니다.</p>
          </div>
        )}
      </div>

      {/* 안정화 방법 */}
      <div>
        <h3 className="text-xl font-bold text-emerald-400 mb-5 flex items-center gap-2">
          <Shield className="w-6 h-6" />
          안정화 실천 방법
        </h3>
        <div className="space-y-5">
          {stabilizationMethods.map((method, index) => (
            <motion.div
              key={method.category}
              className="glass rounded-2xl p-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between mb-4">
                <h4 className={`font-bold text-lg ${method.color}`}>{method.category}</h4>
                {method.priority === 'high' && (
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                    추천
                  </span>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-2 mb-4">
                {method.techniques.map((technique, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 text-sm text-slate-300"
                  >
                    <span className="text-cyan-400 mt-1">✓</span>
                    <span>{technique}</span>
                  </div>
                ))}
              </div>

              <div className="bg-slate-800/50 rounded-lg p-3">
                <span className="text-emerald-400 font-semibold text-sm">효과:</span>
                <span className="text-slate-300 ml-2 text-sm">{method.effect}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 급성 불안 대응 */}
      <motion.div
        className="mt-8 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl p-6 border border-amber-500/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <h4 className="font-bold text-amber-400 mb-4 flex items-center gap-2">
          <Leaf className="w-6 h-6" />
          급성 불안 발작 시 즉시 대응법 (3분 이내)
        </h4>
        <div className="space-y-3 text-sm text-slate-300">
          <div className="flex items-start gap-3">
            <span className="font-bold text-red-400 min-w-[80px]">1단계 (0분)</span>
            <span>현재 위치 인식: &ldquo;나는 지금 [장소]에 있다&rdquo;고 소리내어 말하세요</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="font-bold text-orange-400 min-w-[80px]">2단계 (30초)</span>
            <span>5-4-3-2-1 기법: 5개 보이는 것, 4개 만질 수 있는 것, 3개 들리는 소리, 2개 냄새, 1개 맛</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="font-bold text-yellow-400 min-w-[80px]">3단계 (1분)</span>
            <span>4-7-8 호흡: 4초 들숨 → 7초 멈춤 → 8초 날숨을 5회 반복</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="font-bold text-green-400 min-w-[80px]">4단계 (2분)</span>
            <span>근육 이완: 발가락부터 머리까지 순차적으로 힘주고 풀기</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="font-bold text-cyan-400 min-w-[80px]">5단계 (3분)</span>
            <span>자기 대화: &ldquo;이것도 지나갈 것이다. 나는 안전하다&rdquo;</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-amber-500/20 text-xs text-slate-400">
          💊 불안이 일상을 방해한다면 정신건강의학과 전문의 상담을 권장합니다.
        </div>
      </motion.div>
    </motion.div>
  );
}
