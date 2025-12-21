'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Layers, Bed, Users, Utensils, BookOpen } from 'lucide-react';

interface MovingRoomProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function MovingRoom({ result, name }: MovingRoomProps) {
  const dayElement = result.day.stem.element;

  // 방 배치 기본 원칙
  const getBasicPrinciples = () => {
    return [
      {
        principle: '거실 - 집 중앙',
        reason: '가족이 모이는 중심 공간',
        fengshui: '기의 순환과 화합의 중심',
        icon: '🛋️',
        color: 'from-blue-500 to-cyan-600',
      },
      {
        principle: '안방 - 조용한 곳',
        reason: '부부의 휴식 공간',
        fengshui: '길한 방위, 조용한 구석',
        icon: '🛏️',
        color: 'from-purple-500 to-pink-600',
      },
      {
        principle: '주방 - 동쪽/남동쪽',
        reason: '아침 햇살, 건강',
        fengshui: '화(火) 기운, 재물의 근원',
        icon: '🍳',
        color: 'from-orange-500 to-red-600',
      },
      {
        principle: '서재 - 북쪽/동쪽',
        reason: '조용하고 집중 가능',
        fengshui: '지혜와 학문의 방위',
        icon: '📚',
        color: 'from-indigo-500 to-purple-600',
      },
    ];
  };

  const basicPrinciples = getBasicPrinciples();

  // 방위별 방 배치
  const getDirectionRoomGuide = () => {
    return [
      {
        direction: '동쪽 (東)',
        element: '목',
        suitable: ['자녀방', '서재', '주방', '식당'],
        unsuitable: ['화장실', '창고'],
        effect: '성장, 건강, 새로운 시작',
        tips: '아이들이 자라나고 학업 운이 좋아짐',
        color: 'from-green-500 to-emerald-600',
      },
      {
        direction: '남쪽 (南)',
        element: '화',
        suitable: ['거실', '주방', '서재'],
        unsuitable: ['침실 (너무 밝음)', '창고'],
        effect: '명예, 발전, 활기',
        tips: '사회적 성공과 명예 상승',
        color: 'from-red-500 to-orange-600',
      },
      {
        direction: '서쪽 (西)',
        element: '금',
        suitable: ['침실', '거실', '식당'],
        unsuitable: ['주방 (화극금)'],
        effect: '결실, 재물, 완성',
        tips: '안정된 수입과 저축 증가',
        color: 'from-yellow-500 to-amber-600',
      },
      {
        direction: '북쪽 (北)',
        element: '수',
        suitable: ['서재', '침실', '욕실'],
        unsuitable: ['주방 (수극화)', '거실'],
        effect: '지혜, 휴식, 재물',
        tips: '학문 성취와 깊은 사색',
        color: 'from-blue-500 to-cyan-600',
      },
      {
        direction: '남동쪽',
        element: '목',
        suitable: ['주방', '식당', '자녀방'],
        unsuitable: ['화장실'],
        effect: '재물, 인연, 성장',
        tips: '재물운과 좋은 인연을 만남',
        color: 'from-emerald-500 to-green-600',
      },
      {
        direction: '남서쪽',
        element: '토',
        suitable: ['안방', '거실'],
        unsuitable: ['서재', '자녀방'],
        effect: '안정, 가정, 여성',
        tips: '가정의 평화와 주부 건강',
        color: 'from-amber-500 to-yellow-600',
      },
      {
        direction: '북서쪽',
        element: '금',
        suitable: ['안방', '서재', '가장방'],
        unsuitable: ['주방', '화장실'],
        effect: '권위, 사업, 남성',
        tips: '가장의 권위와 사업 성공',
        color: 'from-slate-400 to-gray-500',
      },
      {
        direction: '북동쪽',
        element: '토',
        suitable: ['창고', '서재'],
        unsuitable: ['현관', '주방'],
        effect: '변화, 귀인, 저장',
        tips: '귀인을 만나고 변화의 기회',
        color: 'from-yellow-500 to-orange-600',
      },
    ];
  };

  const directionGuide = getDirectionRoomGuide();

  // 오행별 최적 방 배치
  const getOptimalLayout = () => {
    const layouts: Record<string, { priority: string; masterBedroom: string; childRoom: string; study: string; kitchen: string; living: string; avoid: string }> = {
      '목': {
        priority: '동쪽, 남동쪽을 중심으로',
        masterBedroom: '동쪽 또는 남동쪽',
        childRoom: '동쪽 (성장운)',
        study: '동쪽 또는 북쪽',
        kitchen: '남동쪽 (재물)',
        living: '중앙 또는 남쪽',
        avoid: '서쪽 안방 (금극목)',
      },
      '화': {
        priority: '남쪽, 동쪽을 중심으로',
        masterBedroom: '남동쪽',
        childRoom: '동쪽',
        study: '남쪽',
        kitchen: '남쪽 또는 남동쪽',
        living: '남쪽 (밝고 활기차게)',
        avoid: '북쪽 안방 (수극화)',
      },
      '토': {
        priority: '중앙, 남서쪽을 중심으로',
        masterBedroom: '남서쪽 (안정)',
        childRoom: '동쪽',
        study: '북동쪽',
        kitchen: '남쪽',
        living: '중앙 (가족 중심)',
        avoid: '동쪽 안방 (목극토)',
      },
      '금': {
        priority: '서쪽, 북서쪽을 중심으로',
        masterBedroom: '서쪽 또는 북서쪽',
        childRoom: '서쪽',
        study: '북서쪽',
        kitchen: '동쪽 (화극금 피함)',
        living: '서쪽',
        avoid: '남쪽 안방 (화극금)',
      },
      '수': {
        priority: '북쪽, 서쪽을 중심으로',
        masterBedroom: '북쪽 (깊은 휴식)',
        childRoom: '동쪽',
        study: '북쪽 (지혜)',
        kitchen: '동쪽',
        living: '북쪽 또는 서쪽',
        avoid: '남서쪽 안방 (토극수)',
      },
    };

    return layouts[dayElement];
  };

  const optimalLayout = getOptimalLayout();

  // 방 배치 실전 팁
  const getPracticalTips = () => {
    return [
      {
        category: '침실 배치',
        tips: [
          '침대 머리는 벽에 붙이기 (안정감)',
          '침대에서 문이 보이는 위치',
          '창문과 문 사이에 침대 금지',
          '침실은 집 안쪽 조용한 곳',
        ],
        icon: Bed,
      },
      {
        category: '거실 배치',
        tips: [
          '소파는 입구가 보이게',
          '중앙 공간 확보 (기 순환)',
          'TV는 북쪽 또는 동쪽 벽',
          '가족 사진은 남동쪽',
        ],
        icon: Users,
      },
      {
        category: '주방 배치',
        tips: [
          '싱크대-가스레인지 분리',
          '냉장고는 북쪽이나 동쪽',
          '가스레인지는 동쪽이나 남쪽',
          '주방 문은 현관 직접 대면 피함',
        ],
        icon: Utensils,
      },
      {
        category: '서재 배치',
        tips: [
          '책상은 문 보는 방향',
          '뒤에 책장이나 벽',
          '창문은 옆이나 앞',
          '조용한 방 선택',
        ],
        icon: BookOpen,
      },
    ];
  };

  const practicalTips = getPracticalTips();

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
        🏠 방 배치 가이드
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님의 오행에 맞는 최적 방 배치
      </p>

      {/* 최적 배치 요약 */}
      <div className="glass rounded-2xl p-8 mb-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30">
        <h3 className="text-xl font-bold text-purple-400 mb-6 text-center">
          {dayElement}({result.day.stem.ko}) 일간 최적 배치
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-800/50 rounded-xl">
            <p className="text-sm text-slate-400 mb-2">안방 (주침실)</p>
            <p className="text-lg font-bold text-purple-400">{optimalLayout.masterBedroom}</p>
          </div>
          <div className="p-4 bg-slate-800/50 rounded-xl">
            <p className="text-sm text-slate-400 mb-2">자녀방</p>
            <p className="text-lg font-bold text-green-400">{optimalLayout.childRoom}</p>
          </div>
          <div className="p-4 bg-slate-800/50 rounded-xl">
            <p className="text-sm text-slate-400 mb-2">서재</p>
            <p className="text-lg font-bold text-blue-400">{optimalLayout.study}</p>
          </div>
          <div className="p-4 bg-slate-800/50 rounded-xl">
            <p className="text-sm text-slate-400 mb-2">주방</p>
            <p className="text-lg font-bold text-orange-400">{optimalLayout.kitchen}</p>
          </div>
          <div className="p-4 bg-slate-800/50 rounded-xl">
            <p className="text-sm text-slate-400 mb-2">거실</p>
            <p className="text-lg font-bold text-cyan-400">{optimalLayout.living}</p>
          </div>
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
            <p className="text-sm text-slate-400 mb-2">피할 배치</p>
            <p className="text-lg font-bold text-red-400">{optimalLayout.avoid}</p>
          </div>
        </div>
        <p className="text-slate-300 text-center mt-4">{optimalLayout.priority}</p>
      </div>

      {/* 기본 배치 원칙 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
          <Layers className="w-6 h-6" />
          방 배치 기본 원칙
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {basicPrinciples.map((principle, index) => (
            <motion.div
              key={principle.principle}
              className="glass-strong rounded-xl p-5"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${principle.color} flex items-center justify-center text-2xl`}>
                  {principle.icon}
                </div>
                <h4 className="font-bold text-white">{principle.principle}</h4>
              </div>
              <p className="text-sm text-slate-400 mb-2">이유: {principle.reason}</p>
              <p className="text-sm text-emerald-400">풍수: {principle.fengshui}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 방위별 방 배치 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-amber-400 mb-6 flex items-center gap-2">
          <Layers className="w-6 h-6" />
          8방위별 적합한 방
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {directionGuide.map((dir, index) => (
            <motion.div
              key={dir.direction}
              className="glass-strong rounded-xl p-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${dir.color}`} />
                <h4 className="font-bold text-white">{dir.direction}</h4>
                <span className="text-xs text-slate-500">({dir.element})</span>
              </div>

              <div className="mb-3">
                <p className="text-xs text-slate-500 mb-1">적합한 방</p>
                <div className="flex flex-wrap gap-1">
                  {dir.suitable.map((room, idx) => (
                    <span key={idx} className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded">
                      {room}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <p className="text-xs text-slate-500 mb-1">부적합한 방</p>
                <div className="flex flex-wrap gap-1">
                  {dir.unsuitable.map((room, idx) => (
                    <span key={idx} className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">
                      {room}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-sm text-slate-400 mb-2">효과: {dir.effect}</p>
              <p className="text-xs text-slate-500 italic">{dir.tips}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 실전 배치 팁 */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold text-green-400 mb-6 flex items-center gap-2">
          <Layers className="w-6 h-6" />
          방별 실전 배치 팁
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {practicalTips.map((section, index) => (
            <motion.div
              key={section.category}
              className="glass-strong rounded-xl p-5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <section.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-white">{section.category}</h4>
              </div>
              <ul className="space-y-2">
                {section.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-green-400 text-xs mt-0.5">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl">
          <p className="text-slate-300 text-sm leading-relaxed">
            💡 <span className="font-bold">실용 팁:</span> 이상적인 방 배치가 항상 가능한 것은 아닙니다.
            구조상 불가피한 경우, 가구 배치와 인테리어로 풍수를 보완할 수 있습니다.
            예: 나쁜 방위의 방은 거울이나 식물로 기운 차단/전환
          </p>
        </div>
      </div>
    </motion.div>
  );
}
