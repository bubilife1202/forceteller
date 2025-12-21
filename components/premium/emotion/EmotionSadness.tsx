'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { CloudRain, Sun, Sunrise, Waves } from 'lucide-react';

interface EmotionSadnessProps {
  result: SajuResult;
  name: string;
}

export default function EmotionSadness({ result, name }: EmotionSadnessProps) {
  // 수(水) 에너지 분석
  const analyzeWaterEnergy = () => {
    const { 수 } = result.elements;
    const { 인성, 관성 } = result.tenGodsCount;
    const { yin } = result.yinYangBalance;

    let tendency = 0;
    let level = '';
    let description = '';

    // 수 개수에 따른 우울 경향
    if (수 >= 4) {
      tendency = 85;
      level = '높음';
      description = '수 기운이 과도하여 감정이 깊고 어둡게 흐를 수 있습니다. 사색과 성찰이 우울로 이어질 위험이 있습니다.';
    } else if (수 === 3) {
      tendency = 65;
      level = '중상';
      description = '수 기운이 강해 감정이 내면화되고 깊은 감수성을 가집니다. 부정적 생각에 빠지기 쉽습니다.';
    } else if (수 === 2) {
      tendency = 45;
      level = '보통';
      description = '적당한 수 기운으로 감성적이지만 균형을 유지할 수 있습니다.';
    } else if (수 === 1) {
      tendency = 25;
      level = '낮음';
      description = '수 기운이 적어 감정이 표면적이고 우울보다는 다른 감정으로 표출됩니다.';
    } else {
      tendency = 15;
      level = '매우 낮음';
      description = '수 기운이 없어 감정이 건조하고 우울을 잘 느끼지 않지만, 감정 표현이 서툴 수 있습니다.';
    }

    // 음 기운이 강하면 우울 경향 증가
    if (yin >= 6) tendency = Math.min(tendency + 20, 100);
    else if (yin >= 5) tendency = Math.min(tendency + 10, 100);

    // 인성이 과다하면 생각이 많아짐
    if (인성 >= 3) tendency = Math.min(tendency + 15, 100);

    return { tendency, level, description, waterCount: 수 };
  };

  // 우울 유발 요인
  const getDepressionTriggers = () => {
    const { 목, 화, 토, 금, 수 } = result.elements;
    const { 관성, 재성, 식상, 인성, 비겁 } = result.tenGodsCount;

    const triggers = [];

    if (수 >= 3) {
      triggers.push({
        trigger: '과도한 사색',
        detail: '혼자 생각에 빠져 부정적 감정이 깊어짐',
        reason: '수 기운이 강해 내면으로 침잠하기 쉽습니다',
        icon: '🌊',
      });
    }

    if (인성 >= 2) {
      triggers.push({
        trigger: '완벽주의와 자책',
        detail: '높은 기준에 못 미쳐 자신을 비난함',
        reason: '인성이 강해 스스로에게 엄격합니다',
        icon: '📚',
      });
    }

    if (관성 >= 2 && 비겁 <= 1) {
      triggers.push({
        trigger: '압박과 무력감',
        detail: '외부 압력에 대응할 힘이 부족하다고 느낌',
        reason: '관성은 강하나 비겁이 약해 자신감이 부족합니다',
        icon: '⚖️',
      });
    }

    if (재성 >= 3) {
      triggers.push({
        trigger: '성취 압박',
        detail: '물질적 목표에 도달하지 못한 좌절감',
        reason: '재성이 강해 성과에 집착하고 실패에 민감합니다',
        icon: '💼',
      });
    }

    if (식상 >= 2 && 관성 >= 2) {
      triggers.push({
        trigger: '표현 억압',
        detail: '하고 싶은 말과 행동을 억제당함',
        reason: '식상과 관성의 충돌로 자유가 제한됩니다',
        icon: '🔇',
      });
    }

    if (목 === 0) {
      triggers.push({
        trigger: '희망 부족',
        detail: '미래에 대한 긍정적 전망이 없음',
        reason: '목 기운이 없어 성장과 희망의 에너지가 부족합니다',
        icon: '🍂',
      });
    }

    if (화 === 0) {
      triggers.push({
        trigger: '열정 상실',
        detail: '삶의 의욕과 즐거움을 느끼지 못함',
        reason: '화 기운이 없어 생명력과 기쁨이 약합니다',
        icon: '🌑',
      });
    }

    return triggers.slice(0, 6);
  };

  // 회복 방법
  const getRecoveryMethods = () => {
    const { 목, 화, 토, 금, 수 } = result.elements;

    const methods = [];

    // 화(火)로 수(水) 균형
    if (화 >= 1) {
      methods.push({
        method: '햇빛 충전법',
        practice: '아침 산책, 일광욕, 밝은 조명 사용',
        effect: '화 기운으로 어두운 수 기운을 밝게 전환합니다',
        frequency: '매일 20분 이상',
        color: 'text-orange-400',
      });
    } else {
      methods.push({
        method: '화 에너지 보충',
        practice: '촛불 명상, 모닥불 보기, 따뜻한 차 마시기',
        effect: '부족한 화 기운을 채워 생명력을 회복합니다',
        frequency: '매일',
        color: 'text-red-400',
      });
    }

    // 목(木)으로 희망 회복
    if (목 >= 1) {
      methods.push({
        method: '성장 경험법',
        practice: '식물 키우기, 새로운 배움, 작은 목표 달성',
        effect: '목 기운의 성장 에너지로 희망을 되찾습니다',
        frequency: '주 3회 이상',
        color: 'text-green-400',
      });
    } else {
      methods.push({
        method: '목 에너지 활성화',
        practice: '숲속 걷기, 녹색 식물 관찰, 자연과 교감',
        effect: '부족한 목 기운을 채워 생기를 불어넣습니다',
        frequency: '주 2-3회',
        color: 'text-emerald-400',
      });
    }

    // 사회적 연결
    methods.push({
      method: '연결 회복법',
      practice: '가까운 사람과 대화, 취미 모임 참여, 봉사 활동',
      effect: '고립에서 벗어나 관계를 통해 회복합니다',
      frequency: '주 2-3회',
      color: 'text-purple-400',
    });

    // 신체 활동
    methods.push({
      method: '신체 활성화법',
      practice: '가벼운 운동, 요가, 춤, 산책',
      effect: '몸을 움직여 정체된 에너지를 순환시킵니다',
      frequency: '매일 30분',
      color: 'text-cyan-400',
    });

    // 창의적 표현
    methods.push({
      method: '감정 표출법',
      practice: '글쓰기, 그림, 음악, 예술 활동',
      effect: '내면의 감정을 건강하게 밖으로 꺼냅니다',
      frequency: '주 2-3회',
      color: 'text-pink-400',
    });

    // 긍정 경험
    methods.push({
      method: '즐거움 처방전',
      practice: '좋아하는 영화/음악, 맛있는 음식, 작은 사치',
      effect: '일상의 기쁨을 되찾고 긍정 경험을 쌓습니다',
      frequency: '주 3-4회',
      color: 'text-yellow-400',
    });

    // 루틴 구축
    if (토 >= 1) {
      methods.push({
        method: '안정 루틴법',
        practice: '규칙적인 수면, 식사, 운동 시간 확립',
        effect: '토 기운의 안정성으로 예측 가능한 일상을 만듭니다',
        frequency: '매일',
        color: 'text-amber-400',
      });
    }

    return methods;
  };

  const waterAnalysis = analyzeWaterEnergy();
  const triggers = getDepressionTriggers();
  const recoveryMethods = getRecoveryMethods();

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold mb-8 gradient-text flex items-center gap-3">
        <CloudRain className="w-8 h-8 text-blue-400" />
        우울감 관리
      </h2>

      {/* 수(水) 에너지 분석 */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-blue-400 mb-5 flex items-center gap-2">
          <Waves className="w-6 h-6" />
          수(水) 에너지 분석
        </h3>
        <div className="glass rounded-2xl p-6">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <div className="text-sm text-slate-400 mb-2">수 기운</div>
              <div className="text-2xl font-bold text-blue-400">{waterAnalysis.waterCount}개</div>
            </div>
            <div>
              <div className="text-sm text-slate-400 mb-2">우울 경향</div>
              <div className="text-2xl font-bold text-cyan-400">{waterAnalysis.level}</div>
            </div>
            <div>
              <div className="text-sm text-slate-400 mb-2">회복 능력</div>
              <div className="text-2xl font-bold text-emerald-400">
                {waterAnalysis.tendency <= 40 ? '높음' : waterAnalysis.tendency <= 70 ? '보통' : '관리필요'}
              </div>
            </div>
          </div>

          {/* 경향 바 */}
          <div className="mb-6">
            <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-400 via-cyan-500 to-indigo-500"
                initial={{ width: 0 }}
                whileInView={{ width: `${waterAnalysis.tendency}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
            <div className="text-xs text-slate-400 mt-2 text-right">{waterAnalysis.tendency}%</div>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-5">
            <p className="text-slate-300 leading-relaxed">{waterAnalysis.description}</p>
          </div>
        </div>
      </div>

      {/* 우울 유발 요인 */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-indigo-400 mb-5 flex items-center gap-2">
          💭 우울 유발 요인
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {triggers.map((item, index) => (
            <motion.div
              key={item.trigger}
              className="glass rounded-2xl p-5 hover:bg-slate-800/60 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">{item.icon}</div>
                <div className="flex-1">
                  <h4 className="font-bold text-blue-400 mb-1">{item.trigger}</h4>
                  <p className="text-sm text-slate-300 mb-2">{item.detail}</p>
                  <p className="text-xs text-slate-400 italic">💡 {item.reason}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 회복 방법 */}
      <div>
        <h3 className="text-xl font-bold text-amber-400 mb-5 flex items-center gap-2">
          <Sunrise className="w-6 h-6" />
          회복 실천 가이드
        </h3>
        <div className="space-y-4">
          {recoveryMethods.map((method, index) => (
            <motion.div
              key={method.method}
              className="glass rounded-2xl p-6 hover:scale-[1.01] transition-transform"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className={`font-bold text-lg ${method.color}`}>{method.method}</h4>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                  {method.frequency}
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <span className="text-slate-400 min-w-[60px] text-sm">실천:</span>
                  <span className="text-slate-300 text-sm">{method.practice}</span>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <span className="text-cyan-400 font-semibold text-sm">효과:</span>
                  <span className="text-slate-300 ml-2 text-sm">{method.effect}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 우울증 경고 신호 */}
      <motion.div
        className="mt-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-blue-500/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <h4 className="font-bold text-blue-400 mb-4 flex items-center gap-2">
          <Sun className="w-6 h-6" />
          전문가 도움이 필요한 신호
        </h4>
        <div className="space-y-2 text-sm text-slate-300 mb-4">
          <div className="flex items-start gap-3">
            <span className="text-red-400 min-w-[20px]">•</span>
            <span>2주 이상 지속되는 깊은 슬픔과 무기력</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-red-400 min-w-[20px]">•</span>
            <span>일상 활동(식사, 수면, 위생)에 대한 흥미 상실</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-red-400 min-w-[20px]">•</span>
            <span>죽음이나 자해에 대한 반복적인 생각</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-red-400 min-w-[20px]">•</span>
            <span>심각한 수면 장애(불면증 또는 과다 수면)</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-red-400 min-w-[20px]">•</span>
            <span>업무나 학업 수행이 불가능한 수준의 집중력 저하</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-red-400 min-w-[20px]">•</span>
            <span>사회적 관계의 완전한 단절</span>
          </div>
        </div>
        <div className="pt-4 border-t border-blue-500/20">
          <p className="text-emerald-400 font-semibold mb-2">🏥 도움 받을 수 있는 곳:</p>
          <p className="text-xs text-slate-400 leading-relaxed">
            정신건강복지센터 (1577-0199) | 자살예방상담전화 (1393) | 희망의 전화 (129) |
            청소년 전화 (1388) | 가까운 병원 정신건강의학과
          </p>
        </div>
      </motion.div>

      {/* 희망 메시지 */}
      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7 }}
      >
        <p className="text-slate-300 text-sm italic">
          &ldquo;{name}님, 어두운 밤이 지나면 반드시 아침이 옵니다. 당신은 혼자가 아닙니다.&rdquo;
        </p>
      </motion.div>
    </motion.div>
  );
}
