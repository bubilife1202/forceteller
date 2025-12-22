'use client';

import { SajuResult } from '@/lib/saju-calculator';
import Cover from './Cover';
import TOC from './TOC';
import Overview from './Overview';
import SajuAnalysis from './SajuAnalysis';
import YearRelation from './YearRelation';
import Personality from './Personality';
import WealthMain from './WealthMain';
import WealthInvest from './WealthInvest';
import LoveMain from './LoveMain';
import Marriage from './Marriage';
import CareerMain from './CareerMain';
import Business from './Business';
import HealthMain from './HealthMain';
import HealthDetail from './HealthDetail';
import FamilyMain from './FamilyMain';
import SocialMain from './SocialMain';
import Monthly_Q1 from './Monthly_Q1';
import Monthly_Q2 from './Monthly_Q2';
import Monthly_Q3 from './Monthly_Q3';
import Monthly_Q4 from './Monthly_Q4';
import Lucky from './Lucky';
import Closing from './Closing';

interface NewYear2026_100pProps {
  result: SajuResult;
  name: string;
  gender: 'male' | 'female';
  birthDate: { year: number; month: number; day: number };
}

export default function NewYear2026_100p({ result, name }: NewYear2026_100pProps) {
  const dayStem = result.day.stem.ko;

  return (
    <div id="newyear2026-100p" className="w-full max-w-4xl mx-auto space-y-12 py-8 px-4 bg-slate-950 text-slate-100">
      {/* 표지 */}
      <Cover name={name} dayStem={dayStem} />

      {/* 목차 */}
      <TOC />

      {/* Chapter 1: 총운 */}
      <Overview dayStem={dayStem} userName={name} />

      {/* Chapter 2: 사주 분석 */}
      <SajuAnalysis dayStem={dayStem} />
      <YearRelation dayStem={dayStem} />
      <Personality dayStem={dayStem} />

      {/* Chapter 3: 재물운 */}
      <WealthMain dayStem={dayStem} />
      <WealthInvest dayStem={dayStem} />

      {/* Chapter 4: 연애 & 결혼운 */}
      <LoveMain dayStem={dayStem} />
      <Marriage dayStem={dayStem} />

      {/* Chapter 5: 직장 & 사업운 */}
      <CareerMain dayStem={dayStem} />
      <Business dayStem={dayStem} />

      {/* Chapter 6: 건강운 */}
      <HealthMain dayStem={dayStem} />
      <HealthDetail dayStem={dayStem} />

      {/* Chapter 7: 가정 & 대인운 */}
      <FamilyMain dayStem={dayStem} />
      <SocialMain dayStem={dayStem} />

      {/* Chapter 8: 월별 운세 */}
      <Monthly_Q1 dayStem={dayStem} />
      <Monthly_Q2 dayStem={dayStem} />
      <Monthly_Q3 dayStem={dayStem} />
      <Monthly_Q4 dayStem={dayStem} />

      {/* Chapter 9: 행운 & 마무리 */}
      <Lucky dayStem={dayStem} />
      <Closing dayStem={dayStem} userName={name} />
    </div>
  );
}
