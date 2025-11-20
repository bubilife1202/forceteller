'use client';

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';

interface ElementsChartProps {
  elements: {
    목: number;
    화: number;
    토: number;
    금: number;
    수: number;
  };
}

export default function ElementsChart({ elements }: ElementsChartProps) {
  const data = [
    { element: '목(木)', value: elements.목, fullMark: 100 },
    { element: '화(火)', value: elements.화, fullMark: 100 },
    { element: '토(土)', value: elements.토, fullMark: 100 },
    { element: '금(金)', value: elements.금, fullMark: 100 },
    { element: '수(水)', value: elements.수, fullMark: 100 },
  ];

  return (
    <motion.div
      className="w-full h-[400px] relative"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Glowing background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl blur-xl" />

      <div className="relative">
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={data}>
            <defs>
              <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <PolarGrid
              stroke="hsl(var(--border))"
              strokeOpacity={0.5}
            />
            <PolarAngleAxis
              dataKey="element"
              tick={{
                fill: 'hsl(var(--foreground))',
                fontSize: 14,
                fontWeight: 600
              }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{
                fill: 'hsl(var(--muted-foreground))',
                fontSize: 12
              }}
              stroke="hsl(var(--border))"
            />
            <Radar
              name="오행 분포"
              dataKey="value"
              stroke="hsl(var(--primary))"
              fill="url(#radarGradient)"
              fillOpacity={0.6}
              strokeWidth={2}
            />
            <Legend
              wrapperStyle={{
                color: 'hsl(var(--foreground))',
                fontWeight: 600
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
