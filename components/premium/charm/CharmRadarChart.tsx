'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Activity } from 'lucide-react';

interface CharmRadarChartProps {
  result: SajuResult;
  name: string;
}

export default function CharmRadarChart({ result, name }: CharmRadarChartProps) {
  const dayElement = result.day.stem.element;
  const { 식상, 재성, 관성, 인성, 비겁 } = result.tenGodsCount;

  // 6가지 매력 지수 계산
  const calculateCharmMetrics = () => {
    const metrics = {
      intelligence: 50, // 지성
      emotion: 50,      // 감성
      passion: 50,      // 열정
      stability: 50,    // 안정
      creativity: 50,   // 독창성
      affinity: 50,     // 친화력
    };

    // 오행별 기본 점수
    const elementBonus: { [key: string]: { [key: string]: number } } = {
      목: { affinity: 15, emotion: 10, creativity: 5 },
      화: { passion: 15, emotion: 10, affinity: 5 },
      토: { stability: 15, affinity: 10, emotion: 5 },
      금: { intelligence: 15, stability: 10, passion: -5 },
      수: { intelligence: 15, creativity: 10, stability: 5 },
    };

    Object.entries(elementBonus[dayElement] || {}).forEach(([key, value]) => {
      metrics[key as keyof typeof metrics] += value;
    });

    // 십성별 가산점
    if (인성 >= 2) {
      metrics.intelligence += 15;
      metrics.stability += 5;
    }
    if (식상 >= 2) {
      metrics.creativity += 15;
      metrics.emotion += 10;
    }
    if (재성 >= 2) {
      metrics.stability += 10;
      metrics.intelligence += 5;
    }
    if (관성 >= 2) {
      metrics.stability += 10;
      metrics.intelligence += 5;
    }
    if (비겁 >= 2) {
      metrics.passion += 10;
      metrics.creativity += 5;
    }

    // 범위 제한 (30-95)
    Object.keys(metrics).forEach(key => {
      const k = key as keyof typeof metrics;
      metrics[k] = Math.min(Math.max(metrics[k], 30), 95);
    });

    return metrics;
  };

  const metrics = calculateCharmMetrics();

  const axes = [
    { key: 'intelligence', label: '지성', color: 'text-blue-400', description: '논리적 사고와 학습 능력' },
    { key: 'emotion', label: '감성', color: 'text-pink-400', description: '감정 이해와 공감 능력' },
    { key: 'passion', label: '열정', color: 'text-red-400', description: '추진력과 에너지' },
    { key: 'stability', label: '안정', color: 'text-yellow-400', description: '신뢰감과 일관성' },
    { key: 'creativity', label: '독창성', color: 'text-purple-400', description: '창의적 사고와 표현' },
    { key: 'affinity', label: '친화력', color: 'text-green-400', description: '사교성과 친근함' },
  ];

  // SVG 레이더 차트 계산
  const calculateRadarPoints = () => {
    const center = 150;
    const maxRadius = 120;
    const angleStep = (2 * Math.PI) / 6;

    const points = axes.map((axis, index) => {
      const angle = angleStep * index - Math.PI / 2; // 위쪽부터 시작
      const value = metrics[axis.key as keyof typeof metrics];
      const radius = (value / 100) * maxRadius;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      return { x, y, value, label: axis.label };
    });

    return points;
  };

  const radarPoints = calculateRadarPoints();
  const pathData = radarPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ') + ' Z';

  // 레이더 차트 배경 그리드
  const gridLevels = [20, 40, 60, 80, 100];
  const center = 150;
  const maxRadius = 120;
  const angleStep = (2 * Math.PI) / 6;

  const getInterpretation = () => {
    const sorted = Object.entries(metrics)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    const top = sorted[0];
    const topLabel = axes.find(a => a.key === top[0])?.label || '';

    let interpretation = '';
    if (top[1] >= 75) {
      interpretation = `${name}님은 특히 ${topLabel} 분야에서 압도적인 매력을 발휘합니다. `;
    } else if (top[1] >= 60) {
      interpretation = `${name}님의 가장 큰 매력 포인트는 ${topLabel}입니다. `;
    } else {
      interpretation = `${name}님은 균형잡힌 매력을 가지고 있으며, `;
    }

    // 균형도 평가
    const values = Object.values(metrics);
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / values.length;

    if (variance < 100) {
      interpretation += '다양한 상황에서 고르게 빛을 발하는 올라운더형 매력의 소유자입니다.';
    } else if (variance < 200) {
      interpretation += '강점이 뚜렷하면서도 다른 영역도 잘 발휘하는 균형잡힌 매력을 가지고 있습니다.';
    } else {
      interpretation += '특정 분야에서 탁월한 전문성을 발휘하는 스페셜리스트형 매력을 가지고 있습니다.';
    }

    return interpretation;
  };

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-10"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-8">
        <h2
          className="text-3xl md:text-4xl font-bold gradient-text mb-3"
          style={{ fontFamily: "'Noto Serif KR', serif" }}
        >
          매력 지수 분석
        </h2>
        <p className="text-slate-300">
          6가지 차원에서 분석한 {name}님의 매력 밸런스
        </p>
      </div>

      {/* Radar Chart */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-8">
        <motion.div
          className="relative"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <svg width="300" height="300" viewBox="0 0 300 300" className="drop-shadow-lg">
            {/* Grid Background */}
            {gridLevels.map((level, idx) => {
              const radius = (level / 100) * maxRadius;
              const points = Array.from({ length: 6 }, (_, i) => {
                const angle = angleStep * i - Math.PI / 2;
                const x = center + radius * Math.cos(angle);
                const y = center + radius * Math.sin(angle);
                return `${x},${y}`;
              }).join(' ');

              return (
                <polygon
                  key={level}
                  points={points}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className={idx === gridLevels.length - 1 ? 'text-slate-600' : 'text-slate-700'}
                  opacity={0.3}
                />
              );
            })}

            {/* Axis Lines */}
            {axes.map((_, index) => {
              const angle = angleStep * index - Math.PI / 2;
              const x = center + maxRadius * Math.cos(angle);
              const y = center + maxRadius * Math.sin(angle);
              return (
                <line
                  key={index}
                  x1={center}
                  y1={center}
                  x2={x}
                  y2={y}
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-slate-600"
                  opacity={0.3}
                />
              );
            })}

            {/* Data Area */}
            <motion.path
              d={pathData}
              fill="url(#radarGradient)"
              stroke="url(#radarStroke)"
              strokeWidth="3"
              opacity={0.7}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />

            {/* Data Points */}
            {radarPoints.map((point, index) => (
              <motion.circle
                key={index}
                cx={point.x}
                cy={point.y}
                r="5"
                fill="white"
                stroke="url(#radarStroke)"
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              />
            ))}

            {/* Labels */}
            {radarPoints.map((point, index) => {
              const angle = angleStep * index - Math.PI / 2;
              const labelRadius = maxRadius + 30;
              const labelX = center + labelRadius * Math.cos(angle);
              const labelY = center + labelRadius * Math.sin(angle);

              return (
                <text
                  key={index}
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-sm font-semibold fill-slate-200"
                >
                  {point.label}
                </text>
              );
            })}

            <defs>
              <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#a855f7" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="radarStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Metric Details */}
        <div className="flex-1 space-y-3 max-w-md">
          {axes.map((axis, index) => (
            <motion.div
              key={axis.key}
              className="glass rounded-xl p-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Activity className={`w-4 h-4 ${axis.color}`} />
                  <span className={`font-bold ${axis.color}`}>{axis.label}</span>
                </div>
                <span className={`text-lg font-bold ${axis.color}`}>
                  {metrics[axis.key as keyof typeof metrics]}
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-2">{axis.description}</p>
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${metrics[axis.key as keyof typeof metrics]}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interpretation */}
      <motion.div
        className="glass rounded-2xl p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <h4 className="font-bold text-purple-400 mb-3 text-lg flex items-center gap-2">
          <Activity className="w-5 h-5" />
          종합 분석
        </h4>
        <p className="text-slate-200 leading-relaxed">
          {getInterpretation()}
        </p>
      </motion.div>

      {/* Balance Tips */}
      <motion.div
        className="mt-6 p-5 rounded-xl bg-slate-800/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
      >
        <h4 className="font-bold text-amber-400 mb-3">💡 밸런스 개선 팁</h4>
        <div className="space-y-2 text-slate-300 text-sm leading-relaxed">
          <p>• 강점은 유지하되, 약한 부분도 조금씩 개발하면 더욱 완벽해집니다</p>
          <p>• 각 매력 요소는 상황에 따라 필요한 정도가 다릅니다. 유연하게 발휘하세요</p>
          <p>• 너무 한쪽으로 치우치면 피로할 수 있습니다. 균형을 유지하세요</p>
          <p>• 자신의 약점을 보완해 줄 수 있는 사람들과 협력하세요</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
