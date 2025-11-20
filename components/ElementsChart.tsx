'use client';

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts';

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
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis dataKey="element" tick={{ fill: '#6b7280', fontSize: 14 }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 12 }} />
          <Radar
            name="오행 분포"
            dataKey="value"
            stroke="#8b5cf6"
            fill="#8b5cf6"
            fillOpacity={0.6}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
