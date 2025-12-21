'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Battery, BatteryCharging, BatteryLow, Zap, Sun, Moon } from 'lucide-react';

interface EmotionEnergyProps {
  result: SajuResult;
  name: string;
}

interface EnergyThief {
  thief: string;
  solution: string;
}

export default function EmotionEnergy({ result, name }: EmotionEnergyProps) {
  // 기본 에너지 레벨 분석
  const analyzeEnergyLevel = () => {
    const { 목, 화, 토, 금, 수 } = result.elements;
    const { 관성, 재성, 식상, 인성, 비겁 } = result.tenGodsCount;
    const { yang, yin } = result.yinYangBalance;

    let baseEnergy = 50;
    const factors = [];

    // 양 에너지 - 활동성
    if (yang >= 6) {
      baseEnergy += 25;
      factors.push({ factor: '강한 양 에너지', impact: '+25', type: 'positive' });
    } else if (yang <= 2) {
      baseEnergy -= 15;
      factors.push({ factor: '약한 양 에너지', impact: '-15', type: 'negative' });
    }

    // 화 - 열정과 활력
    if (화 >= 3) {
      baseEnergy += 20;
      factors.push({ factor: '불(火) 에너지 충만', impact: '+20', type: 'positive' });
    } else if (화 === 0) {
      baseEnergy -= 15;
      factors.push({ factor: '열정 부족', impact: '-15', type: 'negative' });
    }

    // 목 - 성장 에너지
    if (목 >= 3) {
      baseEnergy += 15;
      factors.push({ factor: '성장 에너지 활발', impact: '+15', type: 'positive' });
    }

    // 토 - 안정성과 지속력
    if (토 >= 2) {
      factors.push({ factor: '안정된 지속력', impact: '+10', type: 'positive' });
      baseEnergy += 10;
    } else if (토 === 0) {
      factors.push({ factor: '지속력 부족', impact: '-10', type: 'negative' });
      baseEnergy -= 10;
    }

    // 수 - 정신적 에너지
    if (수 >= 3) {
      factors.push({ factor: '사색적 에너지 높음', impact: '+5', type: 'neutral' });
      baseEnergy += 5;
    }

    // 금 - 정제된 에너지
    if (금 >= 3) {
      factors.push({ factor: '집중력 강함', impact: '+10', type: 'positive' });
      baseEnergy += 10;
    }

    // 비겁 - 자신감 에너지
    if (비겁 >= 3) {
      baseEnergy += 15;
      factors.push({ factor: '자신감 에너지 높음', impact: '+15', type: 'positive' });
    } else if (비겁 === 0) {
      baseEnergy -= 10;
      factors.push({ factor: '자신감 부족', impact: '-10', type: 'negative' });
    }

    // 식상 - 표현 에너지
    if (식상 >= 3) {
      baseEnergy += 10;
      factors.push({ factor: '표현 에너지 활발', impact: '+10', type: 'positive' });
    }

    // 관성 - 책임감 부담
    if (관성 >= 4) {
      baseEnergy -= 15;
      factors.push({ factor: '과도한 책임감 부담', impact: '-15', type: 'negative' });
    }

    // 인성 - 정신적 소모
    if (인성 >= 4) {
      baseEnergy -= 10;
      factors.push({ factor: '생각의 과부하', impact: '-10', type: 'negative' });
    }

    baseEnergy = Math.min(Math.max(baseEnergy, 0), 100);

    const level = baseEnergy >= 75 ? '매우 높음' :
                  baseEnergy >= 55 ? '높음' :
                  baseEnergy >= 35 ? '보통' : '낮음';

    return { baseEnergy, level, factors };
  };

  // 에너지 소모 패턴
  const analyzeEnergyDrain = () => {
    const { 목, 화, 토, 금, 수 } = result.elements;
    const { 관성, 재성, 식상, 인성, 비겁 } = result.tenGodsCount;

    const drains = [];

    if (관성 >= 3) {
      drains.push({
        type: '권위와 통제에 대한 저항',
        description: '규칙과 명령에 에너지를 많이 소모',
        severity: 80,
        color: 'text-red-400'
      });
    }

    if (재성 >= 3) {
      drains.push({
        type: '목표 달성 압박',
        description: '끊임없는 성취욕으로 소진',
        severity: 75,
        color: 'text-orange-400'
      });
    }

    if (식상 >= 4) {
      drains.push({
        type: '과도한 표현과 활동',
        description: '많은 사람과의 교류로 에너지 소모',
        severity: 70,
        color: 'text-yellow-400'
      });
    }

    if (인성 >= 4) {
      drains.push({
        type: '정신적 과부하',
        description: '끊임없는 사고와 걱정으로 소진',
        severity: 75,
        color: 'text-blue-400'
      });
    }

    if (비겁 >= 4) {
      drains.push({
        type: '경쟁과 비교',
        description: '타인과의 경쟁에서 에너지 소모',
        severity: 65,
        color: 'text-purple-400'
      });
    }

    if (화 >= 4) {
      drains.push({
        type: '감정적 격렬함',
        description: '강한 감정 기복으로 에너지 낭비',
        severity: 70,
        color: 'text-rose-400'
      });
    }

    return drains;
  };

  // 번아웃 위험도 분석
  const analyzeBurnoutRisk = () => {
    const { 목, 화, 토, 금, 수 } = result.elements;
    const { 관성, 재성, 식상, 인성, 비겁 } = result.tenGodsCount;

    let risk = 30;
    const risks = [];

    // 토 부족 - 회복력 약함
    if (토 === 0) {
      risk += 20;
      risks.push('회복 기반 부족 (토 없음)');
    }

    // 극단적 오행 불균형
    const total = 목 + 화 + 토 + 금 + 수;
    const max = Math.max(목, 화, 토, 금, 수);
    const min = Math.min(목, 화, 토, 금, 수);
    if (max - min >= 4) {
      risk += 20;
      risks.push('심한 오행 불균형');
    }

    // 과도한 화 - 소진 위험
    if (화 >= 4) {
      risk += 15;
      risks.push('에너지 과소모 (화 과다)');
    }

    // 과도한 관성/재성 - 압박
    if (관성 + 재성 >= 6) {
      risk += 20;
      risks.push('외부 압박과 스트레스');
    }

    // 인성 과다 - 정신적 소모
    if (인성 >= 4) {
      risk += 15;
      risks.push('정신적 과부하');
    }

    // 비겁 부족 - 자기 돌봄 부족
    if (비겁 === 0) {
      risk += 10;
      risks.push('자기 돌봄 능력 부족');
    }

    risk = Math.min(risk, 100);

    const level = risk >= 70 ? '매우 높음' :
                  risk >= 50 ? '높음' :
                  risk >= 30 ? '보통' : '낮음';

    return { risk, level, risks };
  };

  // 맞춤 회복법
  const getRecoveryMethods = () => {
    const { 목, 화, 토, 금, 수 } = result.elements;
    const dayElement = result.day.stem.element;

    const methods = [];

    // 일간별 맞춤 회복법
    if (dayElement === '목') {
      methods.push({
        title: '목(木) 에너지 충전법',
        quick: [
          '나무 그늘에서 쉬기',
          '식물에 물 주기',
          '산책하며 자연 감상',
          '창문 열고 신선한 공기'
        ],
        deep: [
          '주말 등산이나 숲 여행',
          '화분이나 정원 가꾸기',
          '요가나 타이치',
          '새로운 배움 시작'
        ],
        color: 'text-green-400',
        icon: '🌳'
      });
    } else if (dayElement === '화') {
      methods.push({
        title: '화(火) 에너지 충전법',
        quick: [
          '햇빛 쬐기 (15분)',
          '활기찬 음악 듣기',
          '따뜻한 차 마시기',
          '좋아하는 사람과 대화'
        ],
        deep: [
          '열정 쏟을 취미 찾기',
          '창작 활동 (그림, 글)',
          '격렬한 운동으로 발산',
          '사람들과 즐거운 시간'
        ],
        color: 'text-red-400',
        icon: '🔥'
      });
    } else if (dayElement === '토') {
      methods.push({
        title: '토(土) 에너지 충전법',
        quick: [
          '편안한 곳에서 휴식',
          '좋아하는 음식 천천히',
          '따뜻한 목욕',
          '부드러운 음악'
        ],
        deep: [
          '정기적인 명상 루틴',
          '편안한 집 꾸미기',
          '요리하고 맛있게 먹기',
          '규칙적인 생활 리듬'
        ],
        color: 'text-yellow-400',
        icon: '⛰️'
      });
    } else if (dayElement === '금') {
      methods.push({
        title: '금(金) 에너지 충전법',
        quick: [
          '정리 정돈 10분',
          '클래식 음악 감상',
          '품격있는 티타임',
          '호흡 명상 5분'
        ],
        deep: [
          '체계적인 루틴 만들기',
          '품질 좋은 물건 사용',
          '미니멀라이프 실천',
          '전통 문화 체험'
        ],
        color: 'text-slate-300',
        icon: '⚙️'
      });
    } else if (dayElement === '수') {
      methods.push({
        title: '수(水) 에너지 충전법',
        quick: [
          '물 충분히 마시기',
          '조용한 곳에서 혼자',
          '좋아하는 책 읽기',
          '잔잔한 음악이나 ASMR'
        ],
        deep: [
          '수영이나 온천',
          '독서와 사색의 시간',
          '영화나 드라마 감상',
          '물가에서 산책'
        ],
        color: 'text-blue-400',
        icon: '💧'
      });
    }

    // 보편적 회복법
    methods.push({
      title: '신체 에너지 충전',
      quick: [
        '10분 낮잠',
        '가벼운 스트레칭',
        '물 한 잔 천천히',
        '깊은 호흡 10회'
      ],
      deep: [
        '충분한 수면 (7-8시간)',
        '규칙적인 운동',
        '균형잡힌 영양',
        '마사지나 물리치료'
      ],
      color: 'text-purple-400',
      icon: '💪'
    });

    methods.push({
      title: '정신 에너지 충전',
      quick: [
        '5분 마음챙김 명상',
        '감사한 일 3가지',
        '좋았던 기억 떠올리기',
        '긍정 확언'
      ],
      deep: [
        '정기적인 명상 수련',
        '전문가 상담',
        '의미있는 활동',
        '자기 성찰 시간'
      ],
      color: 'text-cyan-400',
      icon: '🧠'
    });

    methods.push({
      title: '정서 에너지 충전',
      quick: [
        '사랑하는 사람에게 연락',
        '반려동물과 시간',
        '좋아하는 영상 보기',
        '웃을 수 있는 콘텐츠'
      ],
      deep: [
        '깊은 관계 만들기',
        '취미 동호회 참여',
        '봉사 활동',
        '정기적인 사교 활동'
      ],
      color: 'text-pink-400',
      icon: '❤️'
    });

    return methods;
  };

  // 에너지 관리 시간대별 전략
  const getTimeBasedStrategy = () => {
    return {
      morning: {
        time: '06:00 - 12:00',
        energy: '⬆️ 에너지 상승기',
        strategies: [
          '중요하고 집중 필요한 일 우선',
          '창의적이고 전략적 사고 활동',
          '어려운 결정이나 회의',
          '운동이나 신체 활동'
        ],
        tips: '아침 햇빛 쬐고 단백질 섭취로 에너지 깨우기',
        color: 'text-yellow-400'
      },
      afternoon: {
        time: '12:00 - 18:00',
        energy: '➡️ 에너지 유지기',
        strategies: [
          '루틴한 업무 처리',
          '협업과 소통 활동',
          '오후 3시 에너지 충전 필요',
          '가벼운 스트레칭'
        ],
        tips: '점심 과식 피하고, 오후 간식과 휴식으로 충전',
        color: 'text-orange-400'
      },
      evening: {
        time: '18:00 - 22:00',
        energy: '⬇️ 에너지 하강기',
        strategies: [
          '가벼운 정리 작업',
          '취미와 여가 활동',
          '가족/친구와 시간',
          '내일 준비'
        ],
        tips: '업무 생각 내려놓고 개인 시간 즐기기',
        color: 'text-blue-400'
      },
      night: {
        time: '22:00 - 06:00',
        energy: '😴 회복기',
        strategies: [
          '디지털 기기 끄기',
          '이완 활동 (명상, 독서)',
          '따뜻한 목욕',
          '충분한 수면'
        ],
        tips: '최소 7시간 수면으로 완전한 회복',
        color: 'text-purple-400'
      }
    };
  };

  // 에너지 도둑 제거하기
  const getEnergyThieves = () => {
    return {
      physical: [
        { thief: '수면 부족', solution: '규칙적인 수면 스케줄 (7-8시간)' },
        { thief: '영양 불균형', solution: '균형잡힌 식사, 충분한 수분' },
        { thief: '운동 부족', solution: '매일 30분 이상 움직이기' },
        { thief: '만성 통증', solution: '의료 전문가 상담, 물리치료' }
      ],
      mental: [
        { thief: '과도한 멀티태스킹', solution: '한 번에 한 가지에 집중' },
        { thief: '완벽주의', solution: '80% 완성도도 충분하다 인정' },
        { thief: '결정 피로', solution: '중요한 결정만 남기고 루틴화' },
        { thief: '정보 과부하', solution: '디지털 디톡스, SNS 제한' }
      ],
      emotional: [
        { thief: '독성 관계', solution: '경계선 설정, 관계 정리' },
        { thief: '만성 스트레스', solution: '스트레스 관리 기술 배우기' },
        { thief: '억압된 감정', solution: '감정 표현하고 처리하기' },
        { thief: '자기 비판', solution: '자기 자비 연습하기' }
      ],
      environmental: [
        { thief: '어지러운 환경', solution: '정리 정돈, 미니멀 공간' },
        { thief: '소음', solution: '조용한 공간, 백색소음 활용' },
        { thief: '나쁜 공기', solution: '환기, 공기청정, 식물 배치' },
        { thief: '불편한 온도', solution: '적정 온도 유지 (20-24도)' }
      ]
    };
  };

  // 회복 단계별 가이드
  const getRecoveryStages = () => {
    return [
      {
        stage: 1,
        title: '긴급 회복 (에너지 0-30%)',
        duration: '즉시 ~ 1일',
        actions: [
          '모든 일정 취소하고 쉬기',
          '충분한 수면 (8시간 이상)',
          '영양가 있는 식사',
          '의무적 활동만 최소한으로',
          '전문가 도움 고려'
        ],
        focus: '생존 모드 - 기본 욕구 충족에만 집중',
        color: 'text-red-400'
      },
      {
        stage: 2,
        title: '기본 회복 (에너지 30-50%)',
        duration: '1-7일',
        actions: [
          '가벼운 일상 활동 재개',
          '규칙적인 수면과 식사',
          '짧은 산책이나 스트레칭',
          '좋아하는 가벼운 활동',
          '에너지 도둑 제거'
        ],
        focus: '안정화 - 규칙적인 리듬 회복',
        color: 'text-orange-400'
      },
      {
        stage: 3,
        title: '재충전 (에너지 50-70%)',
        duration: '1-4주',
        actions: [
          '점진적으로 활동 늘리기',
          '즐거운 취미 재개',
          '사회적 활동 조금씩',
          '운동 강도 높이기',
          '목표와 계획 재정비'
        ],
        focus: '재건 - 에너지 저장고 채우기',
        color: 'text-yellow-400'
      },
      {
        stage: 4,
        title: '최적화 (에너지 70-100%)',
        duration: '지속적',
        actions: [
          '균형잡힌 활동과 휴식',
          '예방적 자기 돌봄',
          '의미있는 목표 추구',
          '관계와 커뮤니티 투자',
          '성장과 도전'
        ],
        focus: '번영 - 에너지 넘치는 삶',
        color: 'text-green-400'
      }
    ];
  };

  const energyLevel = analyzeEnergyLevel();
  const energyDrain = analyzeEnergyDrain();
  const burnoutRisk = analyzeBurnoutRisk();
  const recoveryMethods = getRecoveryMethods();
  const timeStrategy = getTimeBasedStrategy();
  const energyThieves = getEnergyThieves();
  const recoveryStages = getRecoveryStages();

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold mb-8 gradient-text flex items-center gap-3">
        <Battery className="w-8 h-8 text-green-400" />
        에너지 레벨 & 회복법
      </h2>

      {/* 현재 에너지 레벨 */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-green-400 mb-5 flex items-center gap-2">
          <BatteryCharging className="w-6 h-6" />
          {name}님의 에너지 분석
        </h3>
        <div className="glass rounded-2xl p-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="text-sm text-slate-400 mb-2">기본 에너지 레벨</div>
              <div className="text-3xl font-bold text-green-400 mb-2">{energyLevel.level}</div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-4 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-red-400 via-yellow-400 to-green-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${energyLevel.baseEnergy}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <span className="text-2xl font-bold text-green-400">{energyLevel.baseEnergy}%</span>
              </div>
            </div>
            <div>
              <div className="text-sm text-slate-400 mb-2">번아웃 위험도</div>
              <div className="text-3xl font-bold text-orange-400 mb-2">{burnoutRisk.level}</div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-4 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${burnoutRisk.risk}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
                <span className="text-2xl font-bold text-orange-400">{burnoutRisk.risk}%</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-800/50 rounded-xl p-4">
              <div className="text-sm font-semibold text-emerald-400 mb-3">에너지 요인:</div>
              <div className="space-y-2">
                {energyLevel.factors.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">{item.factor}</span>
                    <span className={`font-bold ${
                      item.type === 'positive' ? 'text-green-400' :
                      item.type === 'negative' ? 'text-red-400' : 'text-yellow-400'
                    }`}>{item.impact}</span>
                  </div>
                ))}
              </div>
            </div>
            {burnoutRisk.risks.length > 0 && (
              <div className="bg-slate-800/50 rounded-xl p-4">
                <div className="text-sm font-semibold text-orange-400 mb-3">번아웃 위험 요인:</div>
                <div className="space-y-2">
                  {burnoutRisk.risks.map((risk, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-red-400 mt-0.5">⚠️</span>
                      {risk}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 에너지 소모 패턴 */}
      {energyDrain.length > 0 && (
        <div className="mb-10">
          <h3 className="text-xl font-bold text-orange-400 mb-5 flex items-center gap-2">
            <BatteryLow className="w-6 h-6" />
            에너지 소모 패턴
          </h3>
          <div className="space-y-4">
            {energyDrain.map((drain, index) => (
              <motion.div
                key={drain.type}
                className="glass rounded-2xl p-5"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className={`font-bold ${drain.color}`}>{drain.type}</h4>
                  <span className="text-lg font-bold text-orange-400">{drain.severity}%</span>
                </div>
                <p className="text-sm text-slate-300 mb-3">{drain.description}</p>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-yellow-400 to-red-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${drain.severity}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* 맞춤 회복법 */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-cyan-400 mb-5 flex items-center gap-2">
          <Zap className="w-6 h-6" />
          맞춤 에너지 충전법
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {recoveryMethods.map((method, index) => (
            <motion.div
              key={method.title}
              className="glass rounded-2xl p-5 hover:scale-[1.02] transition-transform"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">{method.icon}</span>
                <h4 className={`font-bold text-lg ${method.color}`}>{method.title}</h4>
              </div>

              <div className="mb-4">
                <div className="text-sm font-semibold text-cyan-400 mb-2">⚡ 빠른 충전 (5-15분):</div>
                <div className="space-y-2">
                  {method.quick.map((action, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-yellow-400 mt-0.5">→</span>
                      <span>{action}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-3">
                <div className="text-sm font-semibold text-purple-400 mb-2">🔋 깊은 충전 (1시간+):</div>
                <div className="space-y-2">
                  {method.deep.map((action, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-emerald-400 mt-0.5">✓</span>
                      <span>{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 시간대별 에너지 관리 */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-purple-400 mb-5 flex items-center gap-2">
          <Sun className="w-6 h-6" />
          시간대별 에너지 관리
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(timeStrategy).map(([key, strategy], index) => (
            <motion.div
              key={key}
              className="glass rounded-2xl p-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="mb-3">
                <div className="text-sm text-slate-400">{strategy.time}</div>
                <h4 className={`font-bold text-lg ${strategy.color}`}>{strategy.energy}</h4>
              </div>
              <div className="space-y-2 mb-4">
                {strategy.strategies.map((item: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-cyan-400 mt-0.5">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3">
                <span className="text-emerald-400 font-semibold text-xs">💡 팁:</span>
                <p className="text-slate-300 text-xs mt-1">{strategy.tips}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 에너지 도둑 제거 */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-red-400 mb-5">🚫 에너지 도둑 제거하기</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(energyThieves).map(([category, thieves], index) => {
            const titles = {
              physical: '💪 신체적',
              mental: '🧠 정신적',
              emotional: '❤️ 정서적',
              environmental: '🏠 환경적'
            };
            return (
              <motion.div
                key={category}
                className="glass rounded-2xl p-5"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h4 className="font-bold text-cyan-400 mb-4">
                  {titles[category as keyof typeof titles]}
                </h4>
                <div className="space-y-3">
                  {(thieves as EnergyThief[]).map((item, idx) => (
                    <div key={idx} className="bg-slate-800/50 rounded-lg p-3">
                      <div className="text-sm font-semibold text-red-400 mb-1">
                        ✗ {item.thief}
                      </div>
                      <div className="text-xs text-slate-300">
                        → {item.solution}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 회복 단계 가이드 */}
      <div>
        <h3 className="text-xl font-bold text-green-400 mb-5 flex items-center gap-2">
          <Moon className="w-6 h-6" />
          단계별 회복 가이드
        </h3>
        <div className="space-y-4">
          {recoveryStages.map((stage, index) => (
            <motion.div
              key={stage.stage}
              className="glass rounded-2xl p-5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                  {stage.stage}
                </div>
                <div className="flex-1">
                  <h4 className={`font-bold text-lg ${stage.color}`}>{stage.title}</h4>
                  <div className="text-sm text-slate-400">기간: {stage.duration}</div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  {stage.actions.map((action, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-emerald-400 mt-0.5">✓</span>
                      <span>{action}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4 flex items-center">
                  <div>
                    <div className="text-xs font-semibold text-purple-400 mb-1">핵심 초점:</div>
                    <div className="text-sm text-slate-300">{stage.focus}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 일일 에너지 체크리스트 */}
      <motion.div
        className="mt-8 bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded-2xl p-6 border border-green-500/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <h4 className="font-bold text-green-400 mb-4">✅ 일일 에너지 충전 체크리스트</h4>
        <div className="grid md:grid-cols-2 gap-3 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <span>7-8시간 충분한 수면</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <span>영양가 있는 식사 3끼</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <span>30분 이상 운동/활동</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <span>충분한 수분 섭취</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <span>햇빛 쬐기 15분+</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <span>취미/즐거운 활동</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <span>휴식과 이완 시간</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <span>좋아하는 사람과 교류</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-green-500/20 text-xs text-slate-400">
          💡 매일 6개 이상 체크되면 에너지를 잘 관리하고 있습니다!
        </div>
      </motion.div>
    </motion.div>
  );
}
