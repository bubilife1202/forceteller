'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Compass, Navigation, MapPin, Star } from 'lucide-react';

interface MovingDirectionProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function MovingDirection({ result, name }: MovingDirectionProps) {
  const dayElement = result.day.stem.element;

  // 오행별 길한 방위 계산
  const getDirectionAnalysis = () => {
    const directions = [
      {
        name: '동쪽 (東)',
        element: '목',
        icon: '🌳',
        color: 'from-green-500 to-emerald-600',
        textColor: 'text-green-400',
      },
      {
        name: '남쪽 (南)',
        element: '화',
        icon: '🔥',
        color: 'from-red-500 to-orange-600',
        textColor: 'text-red-400',
      },
      {
        name: '중앙 (中)',
        element: '토',
        icon: '🏔️',
        color: 'from-yellow-500 to-amber-600',
        textColor: 'text-yellow-400',
      },
      {
        name: '서쪽 (西)',
        element: '금',
        icon: '⚪',
        color: 'from-slate-400 to-gray-500',
        textColor: 'text-slate-300',
      },
      {
        name: '북쪽 (北)',
        element: '수',
        icon: '💧',
        color: 'from-blue-500 to-cyan-600',
        textColor: 'text-blue-400',
      },
    ];

    return directions.map(dir => {
      let score = 50;
      let relationship = '';

      // 오행 상생상극 관계 분석
      if (dir.element === dayElement) {
        score += 10;
        relationship = '비화 (같은 기운)';
      } else if (
        (dayElement === '목' && dir.element === '화') ||
        (dayElement === '화' && dir.element === '토') ||
        (dayElement === '토' && dir.element === '금') ||
        (dayElement === '금' && dir.element === '수') ||
        (dayElement === '수' && dir.element === '목')
      ) {
        score += 25;
        relationship = '상생 (나를 돕는 기운)';
      } else if (
        (dayElement === '목' && dir.element === '수') ||
        (dayElement === '화' && dir.element === '목') ||
        (dayElement === '토' && dir.element === '화') ||
        (dayElement === '금' && dir.element === '토') ||
        (dayElement === '수' && dir.element === '금')
      ) {
        score += 15;
        relationship = '생조 (나를 생하는 기운)';
      } else if (
        (dayElement === '목' && dir.element === '금') ||
        (dayElement === '화' && dir.element === '수') ||
        (dayElement === '토' && dir.element === '목') ||
        (dayElement === '금' && dir.element === '화') ||
        (dayElement === '수' && dir.element === '토')
      ) {
        score -= 20;
        relationship = '상극 (나를 극하는 기운)';
      } else {
        score += 5;
        relationship = '설기 (나를 설하는 기운)';
      }

      // 용신 관계
      if (dir.element === result.yongsin) {
        score += 20;
      }

      const finalScore = Math.min(Math.max(score, 10), 100);

      let advice = '';
      if (finalScore >= 80) {
        advice = '최고의 방위입니다. 이 방향으로의 이사를 적극 추천합니다.';
      } else if (finalScore >= 65) {
        advice = '좋은 방위입니다. 이사 시 우선적으로 고려하세요.';
      } else if (finalScore >= 50) {
        advice = '무난한 방위입니다. 다른 조건과 함께 고려하세요.';
      } else {
        advice = '피하는 것이 좋은 방위입니다. 신중하게 검토하세요.';
      }

      return {
        ...dir,
        score: finalScore,
        relationship,
        advice,
      };
    });
  };

  const directionAnalysis = getDirectionAnalysis();
  const sortedDirections = [...directionAnalysis].sort((a, b) => b.score - a.score);
  const bestDirection = sortedDirections[0];

  // 세부 방위 (8방위)
  const getDetailedDirections = () => {
    return [
      { name: '정동', angle: '90°', desc: '해가 뜨는 방향, 새로운 시작' },
      { name: '남동', angle: '135°', desc: '재물과 인연의 방위' },
      { name: '정남', angle: '180°', desc: '명예와 발전의 방위' },
      { name: '남서', angle: '225°', desc: '안정과 여성의 방위' },
      { name: '정서', angle: '270°', desc: '결실과 완성의 방위' },
      { name: '북서', angle: '315°', desc: '권위와 남성의 방위' },
      { name: '정북', angle: '0°/360°', desc: '지혜와 학문의 방위' },
      { name: '북동', angle: '45°', desc: '변화와 귀인의 방위' },
    ];
  };

  const detailedDirections = getDetailedDirections();

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
        🧭 길한 방위 분석
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님의 사주에 맞는 이사 방향 상세 분석
      </p>

      {/* 최고 길한 방위 */}
      <div className="glass rounded-2xl p-8 mb-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="text-6xl">{bestDirection.icon}</span>
          <div className="text-center">
            <p className="text-slate-400 mb-1">최고 길한 방위</p>
            <h3 className="text-3xl font-bold text-purple-400">{bestDirection.name}</h3>
            <p className="text-xl font-bold text-emerald-400 mt-2">{bestDirection.score}점</p>
          </div>
        </div>
        <p className="text-slate-300 text-center mb-3">{bestDirection.advice}</p>
        <div className="flex items-center justify-center gap-2">
          <Star className="w-5 h-5 text-yellow-400" />
          <p className="text-yellow-400 font-bold">{bestDirection.relationship}</p>
        </div>
      </div>

      {/* 5방위 점수표 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
          <Compass className="w-6 h-6" />
          방위별 적합도 분석
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {directionAnalysis.map((dir, index) => (
            <motion.div
              key={dir.name}
              className="glass-strong rounded-xl p-5"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${dir.color} flex items-center justify-center text-2xl`}>
                  {dir.icon}
                </div>
                <div>
                  <h4 className="font-bold text-white">{dir.name}</h4>
                  <p className="text-sm text-slate-400">{dir.element}(오행)</p>
                </div>
              </div>

              {/* 점수 게이지 */}
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-slate-400">적합도</span>
                  <span className={`text-xl font-bold ${dir.textColor}`}>{dir.score}점</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${dir.color}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${dir.score}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>

              <p className="text-xs text-slate-400 mb-2">{dir.relationship}</p>
              <p className="text-sm text-slate-300">{dir.advice}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 8방위 세부 설명 */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold text-amber-400 mb-6 flex items-center gap-2">
          <Navigation className="w-6 h-6" />
          세부 방위 (8방위) 가이드
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {detailedDirections.map((dir, index) => (
            <motion.div
              key={dir.name}
              className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-amber-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-white">{dir.name}</h4>
                  <span className="text-xs text-slate-500">{dir.angle}</span>
                </div>
                <p className="text-sm text-slate-400">{dir.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl">
          <p className="text-slate-300 text-sm leading-relaxed">
            💡 <span className="font-bold">방위 측정 팁:</span> 스마트폰 나침반 앱을 사용하여 현재 거주지에서 정확한 방향을 측정하세요.
            이사 후보지가 현재 위치에서 어느 방향에 있는지 확인하는 것이 중요합니다.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
