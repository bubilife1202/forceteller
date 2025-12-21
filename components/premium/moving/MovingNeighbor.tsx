'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Users, Heart, MessageCircle, Coffee, Smile } from 'lucide-react';

interface MovingNeighborProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function MovingNeighbor({ result, name }: MovingNeighborProps) {
  const dayElement = result.day.stem.element;
  const { 인성, 관성, 비겁, 식상 } = result.tenGodsCount;

  // 이웃 관계운 점수 계산
  const getNeighborScore = () => {
    let score = 50;

    // 십성별 분석
    if (인성 >= 2) score += 20; // 인성은 포용력, 인간관계
    if (식상 >= 2) score += 15; // 식상은 소통, 친화력
    if (관성 >= 2) score += 10; // 관성은 예의, 질서
    if (비겁 >= 3) score -= 10; // 비겁 과다는 경쟁심

    // 일간별 성향
    if (dayElement === '목') score += 10; // 온화, 친화적
    if (dayElement === '화') score += 15; // 활발, 사교적
    if (dayElement === '토') score += 5; // 안정적
    if (dayElement === '금') score -= 5; // 독립적
    if (dayElement === '수') score += 5; // 유연함

    return Math.min(Math.max(score, 30), 100);
  };

  const neighborScore = getNeighborScore();

  // 관계 성향 분석
  const getRelationshipStyle = () => {
    const styles: Record<string, { style: string; traits: string[]; advice: string; color: string; emoji: string }> = {
      '목': {
        style: '온화하고 배려심 많은 이웃',
        traits: ['친절함', '베풂을 좋아함', '갈등 회피', '조화 추구'],
        advice: '자연스럽게 좋은 관계가 형성됩니다. 가끔 지나친 희생은 주의하세요.',
        color: 'from-green-500 to-emerald-600',
        emoji: '🌳',
      },
      '화': {
        style: '활발하고 사교적인 이웃',
        traits: ['열정적', '친화력 좋음', '모임 주도', '밝고 긍정적'],
        advice: '적극적으로 관계를 맺어 좋은 인연이 많습니다. 간혹 과도한 열정은 조절하세요.',
        color: 'from-red-500 to-orange-600',
        emoji: '🔥',
      },
      '토': {
        style: '믿음직하고 안정적인 이웃',
        traits: ['신뢰감', '포용력', '느긋함', '중재 역할'],
        advice: '차분하고 든든한 관계를 맺습니다. 소통을 좀 더 적극적으로 해보세요.',
        color: 'from-yellow-500 to-amber-600',
        emoji: '🏔️',
      },
      '금': {
        style: '독립적이고 절제된 이웃',
        traits: ['명확한 선', '예의 바름', '프라이버시 중시', '필요시 도움'],
        advice: '적절한 거리 유지로 편안한 관계. 때론 먼저 다가가는 것도 좋습니다.',
        color: 'from-slate-400 to-gray-500',
        emoji: '⚪',
      },
      '수': {
        style: '유연하고 지혜로운 이웃',
        traits: ['상황 파악', '적응력', '깊은 대화', '경청'],
        advice: '상황에 맞는 유연한 대처로 좋은 관계. 가끔 속마음을 표현하세요.',
        color: 'from-blue-500 to-cyan-600',
        emoji: '💧',
      },
    };

    return styles[dayElement];
  };

  const relationshipStyle = getRelationshipStyle();

  // 이웃 관계 가이드
  const getNeighborGuide = () => {
    return [
      {
        phase: '입주 첫 주',
        icon: '👋',
        color: 'from-purple-500 to-pink-600',
        tasks: [
          '이사 당일 위아래 옆집 인사',
          '소음 미리 양해 구하기',
          '작은 선물 준비 (떡, 과일 등)',
          '자기 소개 간단히',
        ],
        tip: '첫인상이 중요합니다. 밝게 인사하되 부담 주지 마세요.',
      },
      {
        phase: '첫 달',
        icon: '🤝',
        color: 'from-blue-500 to-cyan-600',
        tasks: [
          '엘리베이터에서 인사',
          '쓰레기 분리수거 잘 지키기',
          '소음 시간대 주의',
          '공동 규칙 파악',
        ],
        tip: '기본 예의만 지켜도 좋은 이웃이 됩니다.',
      },
      {
        phase: '정착기 (3개월)',
        icon: '☕',
        color: 'from-green-500 to-emerald-600',
        tasks: [
          '이웃과 가벼운 대화',
          '단지 행사 참여 고려',
          '아이 있으면 놀이터 인사',
          '도움 필요시 요청하기',
        ],
        tip: '자연스럽게 친분을 쌓아가세요. 무리하지 마세요.',
      },
      {
        phase: '장기 거주',
        icon: '❤️',
        color: 'from-orange-500 to-red-600',
        tasks: [
          '명절 간단한 인사',
          '택배 대신 받아주기',
          '소소한 나눔 (반찬 등)',
          '적절한 거리 유지',
        ],
        tip: '끈끈하지만 부담 없는 관계가 이상적입니다.',
      },
    ];
  };

  const neighborGuide = getNeighborGuide();

  // 층간소음 예방법
  const getNoisePreventionTips = () => {
    return [
      {
        category: '바닥 충격',
        solutions: ['두꺼운 매트/카펫 깔기', '아이 뛰는 시간 제한', '슬리퍼 착용', '가구 이동 시 천 깔기'],
        icon: '👣',
      },
      {
        category: '생활 소음',
        solutions: ['밤 10시 이후 정숙', '세탁기는 낮에만', 'TV 볼륨 조절', '문 여닫기 조심'],
        icon: '🔇',
      },
      {
        category: '배려 시간',
        solutions: ['새벽 6시 이전 조용', '밤 10시 이후 주의', '주말 아침 배려', '낮잠 시간 (오후 1-3시)'],
        icon: '🕐',
      },
      {
        category: '소통',
        solutions: ['공사 전 미리 공지', '소음 발생 시 먼저 사과', '아래층과 친분 유지', '번호 교환'],
        icon: '💬',
      },
    ];
  };

  const noisePrevention = getNoisePreventionTips();

  // 이웃 갈등 대처법
  const getConflictResolution = () => {
    return [
      {
        situation: '층간소음 항의받음',
        solution: '먼저 사과하고, 개선 의지 표명. 구체적 시간과 상황 파악 후 조치',
        prevention: '평소 매트 사용, 소음 시간대 주의',
      },
      {
        situation: '주차 문제',
        solution: '관리사무소 중재 요청, 규칙 확인 후 대화로 해결',
        prevention: '지정 주차 구역 준수, 다른 차 방해 금지',
      },
      {
        situation: '애완동물 문제',
        solution: '반려동물 예절 교육, 소음/배변 관리 철저',
        prevention: '공동 구역에서 리드줄, 배변 즉시 처리',
      },
      {
        situation: '공용 공간 이용',
        solution: '양보와 배려, 먼저 사용자 우선',
        prevention: '이용 시간 적절히 조절, 정리정돈',
      },
    ];
  };

  const conflictResolution = getConflictResolution();

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2
        className="text-3xl font-bold text-center mb-4 gradient-text"
        style={{ fontFamily: "'Noto Serif KR', serif" }}
      >
        🤝 이웃 관계운
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님의 이웃 관계 성향과 가이드
      </p>

      {/* 이웃 관계운 점수 */}
      <div className="glass rounded-2xl p-8 mb-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="text-6xl">{relationshipStyle.emoji}</span>
          <div className="text-center">
            <p className="text-slate-400 mb-1">이웃 관계운</p>
            <p className="text-5xl font-bold text-purple-400 mb-2">{neighborScore}점</p>
            <h3 className="text-xl font-bold text-emerald-400">{relationshipStyle.style}</h3>
          </div>
        </div>
        <p className="text-slate-300 text-center mb-4">{relationshipStyle.advice}</p>

        <div className="flex flex-wrap gap-2 justify-center">
          {relationshipStyle.traits.map((trait: string, index: number) => (
            <motion.span
              key={trait}
              className={`px-4 py-2 rounded-full bg-gradient-to-r ${relationshipStyle.color} text-white font-bold text-sm`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {trait}
            </motion.span>
          ))}
        </div>
      </div>

      {/* 단계별 이웃 관계 가이드 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
          <Users className="w-6 h-6" />
          단계별 이웃 관계 만들기
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {neighborGuide.map((phase, index) => (
            <motion.div
              key={phase.phase}
              className="glass-strong rounded-xl p-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${phase.color} flex items-center justify-center text-2xl`}>
                  {phase.icon}
                </div>
                <h4 className="font-bold text-white">{phase.phase}</h4>
              </div>
              <ul className="space-y-2 mb-3">
                {phase.tasks.map((task, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-emerald-400 text-xs mt-0.5">✓</span>
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-amber-400 italic">💡 {phase.tip}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 층간소음 예방 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-orange-400 mb-6 flex items-center gap-2">
          <MessageCircle className="w-6 h-6" />
          층간소음 예방 가이드
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {noisePrevention.map((item, index) => (
            <motion.div
              key={item.category}
              className="glass-strong rounded-xl p-5"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{item.icon}</span>
                <h4 className="font-bold text-white">{item.category}</h4>
              </div>
              <ul className="space-y-2">
                {item.solutions.map((solution, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-green-400 text-xs mt-0.5">•</span>
                    <span>{solution}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl">
          <p className="text-slate-300 text-sm leading-relaxed">
            ⚠️ <span className="font-bold">중요:</span> 층간소음은 공동주택 최대 갈등 원인입니다.
            평소 조심하고, 문제 발생 시 즉시 사과하고 개선하는 것이 최선입니다.
          </p>
        </div>
      </div>

      {/* 갈등 대처법 */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold text-amber-400 mb-6 flex items-center gap-2">
          <Smile className="w-6 h-6" />
          이웃 갈등 현명하게 대처하기
        </h3>
        <div className="space-y-3">
          {conflictResolution.map((item, index) => (
            <motion.div
              key={item.situation}
              className="p-4 bg-slate-800/50 rounded-xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="font-bold text-white mb-2">상황: {item.situation}</h4>
              <p className="text-sm text-emerald-400 mb-2">해결: {item.solution}</p>
              <p className="text-sm text-blue-400">예방: {item.prevention}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl">
          <h4 className="font-bold text-purple-400 mb-3 flex items-center gap-2">
            <Heart className="w-5 h-5" />
            좋은 이웃 관계 황금률
          </h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-slate-300">
              <span className="text-yellow-400">1.</span>
              <span><span className="font-bold">먼저 인사</span> - 밝게 인사하는 것만으로도 좋은 인상</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-300">
              <span className="text-yellow-400">2.</span>
              <span><span className="font-bold">기본 예의</span> - 소음, 주차, 쓰레기 규칙 준수</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-300">
              <span className="text-yellow-400">3.</span>
              <span><span className="font-bold">적절한 거리</span> - 너무 가깝지도, 멀지도 않게</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-300">
              <span className="text-yellow-400">4.</span>
              <span><span className="font-bold">소통과 배려</span> - 문제 생기면 대화로 해결</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-300">
              <span className="text-yellow-400">5.</span>
              <span><span className="font-bold">작은 나눔</span> - 때론 반찬이나 간식 나누기</span>
            </li>
          </ul>
        </div>

        <div className="mt-4 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl">
          <p className="text-slate-300 text-sm leading-relaxed">
            💡 <span className="font-bold">명심:</span> 이웃은 가장 가까운 이웃이자 먼 친척보다 가까울 수 있습니다.
            좋은 이웃 관계는 삶의 질을 크게 높입니다. 평소 작은 배려가 큰 도움이 됩니다.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
