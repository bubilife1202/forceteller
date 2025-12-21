'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Zap, Battery, BatteryCharging, Target } from 'lucide-react';

interface EmotionStressProps {
  result: SajuResult;
  name: string;
}

export default function EmotionStress({ result, name }: EmotionStressProps) {
  // 스트레스 취약성 분석
  const analyzeStressVulnerability = () => {
    const { 목, 화, 토, 금, 수 } = result.elements;
    const { 관성, 재성, 식상, 인성, 비겁 } = result.tenGodsCount;
    const { yang, yin } = result.yinYangBalance;

    let vulnerability = 50;
    const factors = [];

    // 오행 불균형
    const total = 목 + 화 + 토 + 금 + 수;
    const average = total / 5;
    const maxElement = Math.max(목, 화, 토, 금, 수);
    const minElement = Math.min(목, 화, 토, 금, 수);
    const imbalance = maxElement - minElement;

    if (imbalance >= 3) {
      vulnerability += 20;
      factors.push('오행 불균형으로 적응력 저하');
    }

    // 관성 과다 - 외부 압박
    if (관성 >= 3) {
      vulnerability += 15;
      factors.push('권위와 규제에 의한 압박');
    }

    // 재성 과다 - 성취 압박
    if (재성 >= 3) {
      vulnerability += 15;
      factors.push('성과와 목표 달성 압박');
    }

    // 비겁 부족 - 자신감 부족
    if (비겁 === 0) {
      vulnerability += 15;
      factors.push('자신감 부족으로 스트레스 증가');
    }

    // 인성 과다 - 과다 사고
    if (인성 >= 3) {
      vulnerability += 10;
      factors.push('생각이 많아 스트레스 증폭');
    }

    // 화 과다 - 감정적 소진
    if (화 >= 4) {
      vulnerability += 10;
      factors.push('과도한 에너지 소모');
    }

    // 토 부족 - 회복력 약함
    if (토 === 0) {
      vulnerability += 10;
      factors.push('회복 기반 부족');
    }

    // 음양 극심한 불균형
    const yinYangRatio = Math.min(yang, yin) / Math.max(yang, yin);
    if (yinYangRatio < 0.3) {
      vulnerability += 10;
      factors.push('음양 불균형으로 적응 어려움');
    }

    vulnerability = Math.min(vulnerability, 100);

    const level = vulnerability >= 75 ? '매우 높음' :
                  vulnerability >= 55 ? '높음' :
                  vulnerability >= 35 ? '보통' : '낮음';

    return { vulnerability, level, factors };
  };

  // 스트레스 해소법
  const getStressReliefMethods = () => {
    const { 목, 화, 토, 금, 수 } = result.elements;
    const dayElement = result.day.stem.element;

    const methods = [];

    // 일간별 맞춤 해소법
    if (dayElement === '목') {
      methods.push({
        title: '목(木)일간 스트레스 해소',
        methods: ['자연 속 걷기/등산', '식물 가꾸기', '스트레칭/요가', '새로운 취미 시작'],
        reason: '성장과 확장의 에너지로 스트레스를 승화시킵니다',
        color: 'text-green-400',
      });
    } else if (dayElement === '화') {
      methods.push({
        title: '화(火)일간 스트레스 해소',
        methods: ['격렬한 운동', '창작 활동', '사람들과 대화', '햇빛 쬐기'],
        reason: '열정을 건설적으로 발산하여 스트레스를 소진시킵니다',
        color: 'text-red-400',
      });
    } else if (dayElement === '토') {
      methods.push({
        title: '토(土)일간 스트레스 해소',
        methods: ['명상/묵상', '따뜻한 목욕', '좋아하는 음식 먹기', '안정된 환경 만들기'],
        reason: '안정과 편안함으로 중심을 되찾습니다',
        color: 'text-yellow-400',
      });
    } else if (dayElement === '금') {
      methods.push({
        title: '금(金)일간 스트레스 해소',
        methods: ['정리 정돈', '계획 세우기', '음악 감상', '품질 좋은 물건 사용'],
        reason: '질서와 정제된 환경으로 마음을 가다듬습니다',
        color: 'text-slate-300',
      });
    } else if (dayElement === '수') {
      methods.push({
        title: '수(水)일간 스트레스 해소',
        methods: ['수영/물놀이', '독서', '영화/음악', '혼자만의 시간'],
        reason: '유연함과 흐름으로 스트레스를 흘려보냅니다',
        color: 'text-blue-400',
      });
    }

    // 보편적 방법들
    methods.push({
      title: '신체 활동',
      methods: ['30분 이상 걷기', '유산소 운동', '근력 운동', '춤추기'],
      reason: '엔도르핀 분비로 자연스럽게 스트레스 해소',
      color: 'text-purple-400',
    });

    methods.push({
      title: '이완 기법',
      methods: ['깊은 호흡', '점진적 근육 이완', '명상/마음챙김', '아로마테라피'],
      reason: '부교감 신경 활성화로 긴장 완화',
      color: 'text-cyan-400',
    });

    methods.push({
      title: '사회적 지지',
      methods: ['가까운 사람과 대화', '취미 모임 참여', '반려동물과 시간', '전문가 상담'],
      reason: '연결감과 공감으로 정서적 회복',
      color: 'text-pink-400',
    });

    return methods;
  };

  // 회복탄력성 분석
  const analyzeResilience = () => {
    const { 목, 화, 토, 금, 수 } = result.elements;
    const { 비겁, 인성, 식상 } = result.tenGodsCount;

    let resilience = 50;
    const strengths = [];

    // 토 - 안정성
    if (토 >= 2) {
      resilience += 15;
      strengths.push({ trait: '정서적 안정성', score: 85 });
    }

    // 비겁 - 자신감
    if (비겁 >= 2) {
      resilience += 15;
      strengths.push({ trait: '자기 신뢰', score: 80 });
    }

    // 목 - 희망
    if (목 >= 2) {
      resilience += 10;
      strengths.push({ trait: '희망과 낙관성', score: 75 });
    }

    // 식상 - 표현력
    if (식상 >= 2) {
      resilience += 10;
      strengths.push({ trait: '감정 표현 능력', score: 75 });
    }

    // 수 적당 - 유연성
    if (수 >= 1 && 수 <= 2) {
      resilience += 10;
      strengths.push({ trait: '적응 유연성', score: 70 });
    }

    // 균형잡힌 오행
    const total = 목 + 화 + 토 + 금 + 수;
    const average = total / 5;
    const elementArray = [목, 화, 토, 금, 수];
    const variance = elementArray.reduce((sum, count) => sum + Math.pow(count - average, 2), 0) / 5;
    if (variance < 1.2) {
      resilience += 15;
      strengths.push({ trait: '전반적 균형', score: 85 });
    }

    resilience = Math.min(resilience, 100);

    if (strengths.length === 0) {
      strengths.push({ trait: '기본 회복력', score: 50 });
    }

    const level = resilience >= 75 ? '높음' :
                  resilience >= 50 ? '보통' : '보강 필요';

    return { resilience, level, strengths };
  };

  const stressAnalysis = analyzeStressVulnerability();
  const reliefMethods = getStressReliefMethods();
  const resilienceAnalysis = analyzeResilience();

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
        스트레스 대응 분석
      </h2>

      {/* 스트레스 취약성 */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-orange-400 mb-5 flex items-center gap-2">
          <Battery className="w-6 h-6" />
          스트레스 취약성
        </h3>
        <div className="glass rounded-2xl p-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="text-sm text-slate-400 mb-2">취약도</div>
              <div className="text-2xl font-bold text-orange-400">{stressAnalysis.level}</div>
              <div className="text-sm text-slate-500 mt-1">{stressAnalysis.vulnerability}%</div>
            </div>
            <div>
              <div className="text-sm text-slate-400 mb-2">회복탄력성</div>
              <div className="text-2xl font-bold text-cyan-400">{resilienceAnalysis.level}</div>
              <div className="text-sm text-slate-500 mt-1">{resilienceAnalysis.resilience}%</div>
            </div>
          </div>

          {/* 취약도 바 */}
          <div className="mb-4">
            <div className="text-xs text-slate-400 mb-2">스트레스 취약도</div>
            <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500"
                initial={{ width: 0 }}
                whileInView={{ width: `${stressAnalysis.vulnerability}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
          </div>

          {/* 회복력 바 */}
          <div className="mb-6">
            <div className="text-xs text-slate-400 mb-2">회복탄력성</div>
            <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 to-emerald-500"
                initial={{ width: 0 }}
                whileInView={{ width: `${resilienceAnalysis.resilience}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
              />
            </div>
          </div>

          {stressAnalysis.factors.length > 0 && (
            <div className="bg-slate-800/50 rounded-xl p-5">
              <div className="text-sm font-semibold text-orange-400 mb-3">취약 요인:</div>
              <div className="space-y-2">
                {stressAnalysis.factors.map((factor, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-orange-400 mt-0.5">•</span>
                    {factor}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 회복탄력성 강점 */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-emerald-400 mb-5 flex items-center gap-2">
          <BatteryCharging className="w-6 h-6" />
          회복탄력성 강점
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {resilienceAnalysis.strengths.map((strength, index) => (
            <motion.div
              key={strength.trait}
              className="glass rounded-2xl p-5"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-emerald-400">{strength.trait}</h4>
                <span className="text-2xl font-bold text-cyan-400">{strength.score}</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-400 to-cyan-500"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${strength.score}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 스트레스 해소법 */}
      <div>
        <h3 className="text-xl font-bold text-purple-400 mb-5 flex items-center gap-2">
          <Target className="w-6 h-6" />
          맞춤 스트레스 해소법
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {reliefMethods.map((method, index) => (
            <motion.div
              key={method.title}
              className="glass rounded-2xl p-5 hover:scale-[1.02] transition-transform"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className={`font-bold text-lg mb-3 ${method.color}`}>{method.title}</h4>
              <div className="space-y-2 mb-4">
                {method.methods.map((m, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-cyan-400 mt-0.5">✓</span>
                    <span>{m}</span>
                  </div>
                ))}
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3">
                <span className="text-emerald-400 font-semibold text-sm">이유:</span>
                <span className="text-slate-300 ml-2 text-sm">{method.reason}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 스트레스 관리 체크리스트 */}
      <motion.div
        className="mt-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <h4 className="font-bold text-purple-400 mb-4 flex items-center gap-2">
          ✅ 일일 스트레스 관리 체크리스트
        </h4>
        <div className="grid md:grid-cols-2 gap-3 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <span>7-8시간 충분한 수면</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <span>규칙적인 식사 3끼</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <span>30분 이상 신체 활동</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <span>햇빛 쬐기 (최소 15분)</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <span>명상/호흡 연습 (5-10분)</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <span>감사한 일 3가지 떠올리기</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <span>취미/즐거운 활동 시간</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <span>가까운 사람과 대화</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-purple-500/20 text-xs text-slate-400">
          💡 매일 5개 이상 체크되면 건강한 스트레스 관리 중입니다!
        </div>
      </motion.div>
    </motion.div>
  );
}
