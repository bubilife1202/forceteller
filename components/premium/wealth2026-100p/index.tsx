'use client';

import { SajuResult } from '@/lib/saju-calculator';
import Cover from './Cover';
import TOC from './TOC';
import Overview1Year from './Overview1_Year';
import Overview2Score from './Overview2_Score';
import DNA1Type from './DNA1_Type';
import DNA2Mindset from './DNA2_Mindset';
import DNA3SWOT from './DNA3_SWOT';
import Income1Main from './Income1_Main';
import Income2Side from './Income2_Side';
import Invest1Profile from './Invest1_Profile';
import Invest2Assets from './Invest2_Assets';
import Monthly1Q1 from './Monthly1_Q1';
import Monthly2Q2 from './Monthly2_Q2';
import Monthly3Q3 from './Monthly3_Q3';
import Monthly4Q4 from './Monthly4_Q4';
import Lucky from './Lucky';
import Closing from './Closing';

interface Wealth2026_100pProps {
  result: SajuResult;
  name: string;
  gender: 'male' | 'female';
  birthDate: { year: number; month: number; day: number };
}

export default function Wealth2026_100p({ result, name, gender, birthDate }: Wealth2026_100pProps) {
  const dayStem = result.day.stem.ko;

  return (
    <div id="wealth2026-100p" className="w-full max-w-4xl mx-auto space-y-8 py-8 px-4 bg-slate-950 text-slate-100">
      {/* 표지 */}
      <Cover name={name} dayStem={dayStem} />

      {/* 목차 */}
      <TOC />

      {/* Chapter 1: 개요 */}
      <Overview1Year dayStem={dayStem} />
      <Overview2Score result={result} name={name} />

      {/* Chapter 2: DNA 분석 */}
      <DNA1Type dayStem={dayStem} name={name} />
      <DNA2Mindset dayStem={dayStem} />
      <DNA3SWOT dayStem={dayStem} />

      {/* Chapter 3: 수입운 */}
      <Income1Main result={result} name={name} />
      <Income2Side dayStem={dayStem} />

      {/* Chapter 4: 투자운 */}
      <Invest1Profile dayStem={dayStem} />
      <Invest2Assets dayStem={dayStem} />

      {/* Chapter 5: 월별 운세 */}
      <Monthly1Q1 dayStem={dayStem} />
      <Monthly2Q2 dayStem={dayStem} />
      <Monthly3Q3 dayStem={dayStem} />
      <Monthly4Q4 dayStem={dayStem} />

      {/* 행운 & 마무리 */}
      <Lucky dayStem={dayStem} />
      <Closing userName={name} dayStem={dayStem} />
    </div>
  );
}
