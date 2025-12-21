'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Smile, Sparkles, Star, Lightbulb } from 'lucide-react';

interface EmotionPositiveProps {
  result: SajuResult;
  name: string;
}

export default function EmotionPositive({ result, name }: EmotionPositiveProps) {
  // 긍정 에너지 점수 계산
  const calculatePositiveEnergy = () => {
    const { 목, 화, 토, 금, 수 } = result.elements;
    const { 식상, 재성, 비겁 } = result.tenGodsCount;
    const { yang } = result.yinYangBalance;

    let score = 50;

    // 목 - 희망과 성장
    if (목 >= 2) score += 15;
    else if (목 === 1) score += 7;

    // 화 - 열정과 기쁨
    if (화 >= 2 && 화 <= 3) score += 15;
    else if (화 === 1) score += 5;

    // 식상 - 표현과 창의성
    if (식상 >= 2) score += 12;

    // 비겁 - 자신감
    if (비겁 >= 2) score += 10;

    // 재성 - 성취감
    if (재성 >= 1 && 재성 <= 2) score += 8;

    // 양 기운 - 활력
    if (yang >= 5) score += 10;

    score = Math.min(score, 100);

    const level = score >= 75 ? '높음' :
                  score >= 50 ? '보통' : '개발 필요';

    return { score, level };
  };

  // 기쁨 요인 분석
  const getJoyFactors = () => {
    const { 목, 화, 토, 금, 수 } = result.elements;
    const { 식상, 재성, 인성, 비겁 } = result.tenGodsCount;

    const factors = [];

    if (목 >= 2) {
      factors.push({
        factor: '성장과 발전',
        description: '새로운 것을 배우고 발전할 때 큰 기쁨을 느낍니다',
        activities: ['새로운 취미 시작', '기술 배우기', '여행과 탐험', '책 읽기'],
        icon: '🌱',
        color: 'text-green-400',
      });
    }

    if (화 >= 2) {
      factors.push({
        factor: '열정적 활동',
        description: '에너지를 발산하고 창의적으로 표현할 때 즐거움을 느낍니다',
        activities: ['운동/스포츠', '예술 활동', '파티/모임', '춤/음악'],
        icon: '🔥',
        color: 'text-red-400',
      });
    }

    if (토 >= 2) {
      factors.push({
        factor: '안정과 편안함',
        description: '익숙하고 안정된 환경에서 평온한 행복을 느낍니다',
        activities: ['집에서 휴식', '맛있는 음식', '가족과 시간', '정원 가꾸기'],
        icon: '🏡',
        color: 'text-yellow-400',
      });
    }

    if (금 >= 2) {
      factors.push({
        factor: '성취와 완성',
        description: '목표를 달성하고 완벽을 추구할 때 만족감을 느낍니다',
        activities: ['프로젝트 완수', '정리 정돈', '품질 추구', '기술 완성'],
        icon: '💎',
        color: 'text-slate-300',
      });
    }

    if (수 >= 2) {
      factors.push({
        factor: '지적 자극',
        description: '깊이 생각하고 통찰을 얻을 때 지적 만족을 느낍니다',
        activities: ['독서/학습', '영화 감상', '철학적 대화', '명상'],
        icon: '💧',
        color: 'text-blue-400',
      });
    }

    if (식상 >= 2) {
      factors.push({
        factor: '자기 표현',
        description: '자유롭게 자신을 표현할 때 해방감과 기쁨을 느낍니다',
        activities: ['글쓰기', '그림/공예', '음악 연주', 'SNS 활동'],
        icon: '🎨',
        color: 'text-purple-400',
      });
    }

    if (재성 >= 2) {
      factors.push({
        factor: '물질적 보상',
        description: '노력의 결실을 거두고 성과를 얻을 때 성취감을 느낍니다',
        activities: ['목표 달성', '재테크 성공', '선물 받기', '쇼핑'],
        icon: '💰',
        color: 'text-amber-400',
      });
    }

    if (비겁 >= 2) {
      factors.push({
        factor: '사회적 연결',
        description: '친구들과 함께하고 소속감을 느낄 때 행복합니다',
        activities: ['친구 만남', '팀 활동', '커뮤니티 참여', '협력 프로젝트'],
        icon: '👥',
        color: 'text-cyan-400',
      });
    }

    return factors.slice(0, 6);
  };

  // 에너지 충전 방법
  const getEnergyRecharging = () => {
    const { 목, 화, 토, 금, 수 } = result.elements;
    const dayElement = result.day.stem.element;
    const { yang, yin } = result.yinYangBalance;

    const methods = [];

    // 양 우세 - 활동적 충전
    if (yang > yin) {
      methods.push({
        type: '활동형 충전',
        methods: [
          '야외 활동 (등산, 자전거, 조깅)',
          '친구들과 활발한 모임',
          '새로운 장소 탐험',
          '스포츠나 게임',
        ],
        effect: '활동을 통해 양 에너지를 순환시키고 활력을 되찾습니다',
        color: 'text-orange-400',
      });
    }

    // 음 우세 - 정적 충전
    if (yin > yang) {
      methods.push({
        type: '휴식형 충전',
        methods: [
          '조용한 곳에서 독서',
          '명상이나 요가',
          '혼자만의 시간 갖기',
          '차분한 음악 감상',
        ],
        effect: '내면의 음 에너지를 보충하고 깊이 휴식합니다',
        color: 'text-indigo-400',
      });
    }

    // 목 - 자연 에너지
    if (목 >= 1) {
      methods.push({
        type: '자연 연결',
        methods: [
          '숲이나 공원 산책',
          '식물 키우기',
          '자연 소리 듣기',
          '아침 햇살 받기',
        ],
        effect: '자연의 생명력으로 희망과 활력을 충전합니다',
        color: 'text-emerald-400',
      });
    }

    // 화 - 열정 재점화
    if (화 >= 1) {
      methods.push({
        type: '열정 재점화',
        methods: [
          '좋아하는 창작 활동',
          '영감을 주는 콘텐츠 보기',
          '신나는 음악 듣기',
          '격려해주는 사람과 대화',
        ],
        effect: '내면의 불씨를 되살려 열정을 회복합니다',
        color: 'text-red-400',
      });
    }

    // 수 - 마음의 정화
    if (수 >= 1) {
      methods.push({
        type: '마음 정화',
        methods: [
          '물 근처에서 시간 보내기',
          '따뜻한 목욕',
          '감정 일기 쓰기',
          '눈물 나는 영화 보기',
        ],
        effect: '감정을 정화하고 마음의 무게를 덜어냅니다',
        color: 'text-blue-400',
      });
    }

    // 토 - 안정 회복
    if (토 >= 1) {
      methods.push({
        type: '안정 회복',
        methods: [
          '좋아하는 음식 먹기',
          '편안한 공간에서 휴식',
          '루틴 지키기',
          '따뜻한 차 마시기',
        ],
        effect: '안정된 환경과 익숙함으로 중심을 되찾습니다',
        color: 'text-yellow-400',
      });
    }

    return methods;
  };

  // 동기부여 방법
  const getMotivationMethods = () => {
    const { 관성, 재성, 식상, 인성, 비겁 } = result.tenGodsCount;

    const methods = [];

    if (재성 >= 2) {
      methods.push({
        title: '목표 시각화',
        description: '원하는 성과를 구체적으로 상상하고 계획하세요',
        tip: '비전보드를 만들거나 목표를 글로 적어 매일 확인하세요',
      });
    }

    if (비겁 >= 2) {
      methods.push({
        title: '동료와 함께',
        description: '같은 목표를 가진 사람들과 함께 도전하세요',
        tip: '스터디 그룹이나 운동 친구를 만들어 서로 격려하세요',
      });
    }

    if (식상 >= 2) {
      methods.push({
        title: '창의적 접근',
        description: '재미있고 창의적인 방법으로 일을 바꿔보세요',
        tip: '루틴을 게임화하거나 자신만의 독특한 방식을 찾으세요',
      });
    }

    if (인성 >= 2) {
      methods.push({
        title: '의미 부여',
        description: '하는 일의 의미와 가치를 다시 생각해보세요',
        tip: '이 일이 나와 세상에 어떤 영향을 주는지 성찰하세요',
      });
    }

    methods.push({
      title: '작은 성취 축하',
      description: '큰 목표를 작게 나누고 하나씩 달성할 때마다 축하하세요',
      tip: '매일 작은 성공을 기록하고 스스로를 칭찬하세요',
    });

    methods.push({
      title: '롤모델 찾기',
      description: '존경하는 사람의 이야기에서 영감을 받으세요',
      tip: '전기, 다큐멘터리, 강연을 통해 동기를 얻으세요',
    });

    return methods;
  };

  const positiveEnergy = calculatePositiveEnergy();
  const joyFactors = getJoyFactors();
  const energyMethods = getEnergyRecharging();
  const motivationMethods = getMotivationMethods();

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold mb-8 gradient-text flex items-center gap-3">
        <Smile className="w-8 h-8 text-yellow-400" />
        긍정 에너지
      </h2>

      {/* 긍정 에너지 점수 */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-yellow-400 mb-5 flex items-center gap-2">
          <Star className="w-6 h-6" />
          긍정 에너지 지수
        </h3>
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-center mb-6">
            <motion.div
              className="relative w-48 h-48"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', delay: 0.2 }}
            >
              <svg width="192" height="192" className="transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  className="text-slate-700"
                />
                <motion.circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="url(#positiveGradient)"
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: '0 502' }}
                  whileInView={{ strokeDasharray: `${(positiveEnergy.score / 100) * 502} 502` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
                <defs>
                  <linearGradient id="positiveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-yellow-400">{positiveEnergy.score}</span>
                <span className="text-slate-400 text-sm">{positiveEnergy.level}</span>
              </div>
            </motion.div>
          </div>
          <p className="text-center text-slate-300">
            {positiveEnergy.score >= 75 ? `${name}님은 긍정적 에너지가 풍부합니다!` :
             positiveEnergy.score >= 50 ? `${name}님은 균형잡힌 긍정성을 가지고 있습니다.` :
             `${name}님의 긍정 에너지를 더 키워보세요!`}
          </p>
        </div>
      </div>

      {/* 기쁨 요인 */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-pink-400 mb-5 flex items-center gap-2">
          <Sparkles className="w-6 h-6" />
          나의 기쁨 요인
        </h3>
        <div className="space-y-4">
          {joyFactors.map((item, index) => (
            <motion.div
              key={item.factor}
              className="glass rounded-2xl p-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-3xl">{item.icon}</div>
                <div className="flex-1">
                  <h4 className={`font-bold text-lg ${item.color} mb-2`}>{item.factor}</h4>
                  <p className="text-slate-300 text-sm mb-3">{item.description}</p>
                </div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4">
                <div className="text-sm font-semibold text-emerald-400 mb-2">추천 활동:</div>
                <div className="grid md:grid-cols-2 gap-2">
                  {item.activities.map((activity, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                      <span className="text-yellow-400">★</span>
                      <span>{activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 에너지 충전법 */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-cyan-400 mb-5 flex items-center gap-2">
          ⚡ 에너지 재충전 방법
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {energyMethods.map((method, index) => (
            <motion.div
              key={method.type}
              className="glass rounded-2xl p-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className={`font-bold text-lg ${method.color} mb-3`}>{method.type}</h4>
              <div className="space-y-2 mb-4">
                {method.methods.map((m, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-cyan-400 mt-0.5">✓</span>
                    <span>{m}</span>
                  </div>
                ))}
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3">
                <p className="text-xs text-slate-400">{method.effect}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 동기부여 방법 */}
      <div>
        <h3 className="text-xl font-bold text-purple-400 mb-5 flex items-center gap-2">
          <Lightbulb className="w-6 h-6" />
          동기부여 전략
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {motivationMethods.map((method, index) => (
            <motion.div
              key={method.title}
              className="glass rounded-2xl p-5 hover:bg-slate-800/60 transition-colors"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="font-bold text-purple-400 mb-2">{method.title}</h4>
              <p className="text-sm text-slate-300 mb-3">{method.description}</p>
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-3 border border-purple-500/20">
                <div className="text-xs text-purple-400 font-semibold mb-1">실천 팁:</div>
                <div className="text-xs text-slate-300">{method.tip}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 긍정성 강화 습관 */}
      <motion.div
        className="mt-8 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl p-6 border border-yellow-500/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <h4 className="font-bold text-yellow-400 mb-4 flex items-center gap-2">
          🌟 긍정성 강화 일일 습관
        </h4>
        <div className="grid md:grid-cols-2 gap-3 text-sm text-slate-300">
          <div className="flex items-start gap-2">
            <span className="text-yellow-400 mt-0.5">✓</span>
            <span><strong>아침:</strong> 감사한 것 3가지 떠올리기</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-yellow-400 mt-0.5">✓</span>
            <span><strong>오전:</strong> 긍정 확언 반복하기</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-yellow-400 mt-0.5">✓</span>
            <span><strong>점심:</strong> 좋았던 순간 기억하기</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-yellow-400 mt-0.5">✓</span>
            <span><strong>오후:</strong> 작은 성취 인정하기</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-yellow-400 mt-0.5">✓</span>
            <span><strong>저녁:</strong> 하루를 칭찬하기</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-yellow-400 mt-0.5">✓</span>
            <span><strong>밤:</strong> 내일에 대한 기대 품기</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
