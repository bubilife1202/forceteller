'use client';

import { motion } from 'framer-motion';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

interface ElementsRadarChartProps {
  elements: {
    목: number;
    화: number;
    토: number;
    금: number;
    수: number;
  };
}

export default function ElementsRadarChart({ elements }: ElementsRadarChartProps) {
  // Recharts 형식으로 변환
  const data = [
    { element: '목 木', value: elements.목, color: '#10b981' },
    { element: '화 火', value: elements.화, color: '#ef4444' },
    { element: '토 土', value: elements.토, color: '#f59e0b' },
    { element: '금 金', value: elements.금, color: '#f3f4f6' },
    { element: '수 水', value: elements.수, color: '#3b82f6' },
  ];

  return (
    <motion.div
      className="w-full h-[400px] relative"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid
            stroke="rgba(251, 191, 36, 0.3)"
            strokeWidth={1}
          />
          <PolarAngleAxis
            dataKey="element"
            tick={{
              fill: '#fbbf24',
              fontSize: 14,
              fontWeight: 600,
            }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: '#94a3b8', fontSize: 12 }}
          />
          <Radar
            name="오행"
            dataKey="value"
            stroke="#c084fc"
            fill="#c084fc"
            fillOpacity={0.3}
            strokeWidth={2}
            dot={{
              r: 6,
              fill: '#fbbf24',
              strokeWidth: 2,
              stroke: '#c084fc',
            }}
          />
        </RadarChart>
      </ResponsiveContainer>

      {/* Glow Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl" />
      </div>
    </motion.div>
  );
}
