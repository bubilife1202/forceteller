'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Briefcase, TrendingUp, Building2, Laptop } from 'lucide-react';

interface MarriageOccupationProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function MarriageOccupation({ result, name }: MarriageOccupationProps) {
  const dayElement = result.day.stem.element;
  const { 재성, 관성, 식상 } = result.tenGodsCount;

  // 오행별 배우자 직업운
  const getPartnerCareer = () => {
    const careers: Record<string, {
      bestJobs: string[];
      careerLevel: { type: string; score: number; desc: string };
      income: { level: string; score: number };
      stability: { level: string; score: number };
    }> = {
      목: {
        bestJobs: ['교육자', '출판/언론', '법률 전문가', '공무원', '작가/기자', '상담사'],
        careerLevel: { type: '전문직 성향', score: 85, desc: '전문성을 갖춘 안정적인 직업을 가진 배우자' },
        income: { level: '중상', score: 75 },
        stability: { level: '안정적', score: 85 }
      },
      화: {
        bestJobs: ['경영인', '마케터', '영업직', '연예인', '사업가', '디자이너'],
        careerLevel: { type: '도전형 성향', score: 80, desc: '적극적이고 활동적인 직업을 가진 배우자' },
        income: { level: '상', score: 85 },
        stability: { level: '변동적', score: 60 }
      },
      토: {
        bestJobs: ['공무원', '부동산', '금융인', '회계사', '요식업', '건설업'],
        careerLevel: { type: '안정형 성향', score: 90, desc: '든든하고 안정적인 직업을 가진 배우자' },
        income: { level: '중상', score: 80 },
        stability: { level: '매우 안정', score: 95 }
      },
      금: {
        bestJobs: ['의사', '변호사', '엔지니어', '금융 전문가', '건축가', '연구원'],
        careerLevel: { type: '고급 전문직', score: 95, desc: '높은 전문성과 사회적 지위를 가진 배우자' },
        income: { level: '상', score: 90 },
        stability: { level: '안정적', score: 85 }
      },
      수: {
        bestJobs: ['예술가', '심리상담사', '의료인', 'IT 전문가', '작가', '연구원'],
        careerLevel: { type: '창조형 성향', score: 80, desc: '창의적이고 지적인 직업을 가진 배우자' },
        income: { level: '중', score: 70 },
        stability: { level: '유동적', score: 65 }
      }
    };
    return careers[dayElement] || careers['목'];
  };

  // 사주 기반 배우자 재물운
  const getPartnerWealth = () => {
    let score = 60;
    if (재성 >= 2) score += 20; // 재성 많음 = 배우자가 재물운 좋음
    if (관성 >= 2) score += 15; // 관성 많음 = 배우자의 사회적 지위 높음
    if (식상 >= 2) score += 10; // 식상 = 배우자의 사업/부업 운
    return Math.min(Math.max(score, 40), 100);
  };

  const partnerCareer = getPartnerCareer();
  const partnerWealthScore = getPartnerWealth();

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
        💼 배우자 직업운
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님 배우자의 커리어와 경제력
      </p>

      {/* 배우자 직업 성향 */}
      <div className="glass rounded-2xl p-6 mb-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30">
        <div className="flex items-center gap-3 mb-4">
          <Briefcase className="w-6 h-6 text-indigo-400" />
          <h3 className="text-xl font-bold text-white">배우자 직업 성향</h3>
        </div>
        <div className="flex justify-between items-center mb-3">
          <p className="text-2xl font-bold text-indigo-300">{partnerCareer.careerLevel.type}</p>
          <p className="text-3xl font-bold text-indigo-400">{partnerCareer.careerLevel.score}점</p>
        </div>
        <p className="text-slate-300 mb-4">{partnerCareer.careerLevel.desc}</p>
        <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
            initial={{ width: 0 }}
            whileInView={{ width: `${partnerCareer.careerLevel.score}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </div>

      {/* 추천 직업 */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="w-6 h-6 text-cyan-400" />
          <h3 className="text-xl font-bold text-white">궁합 좋은 배우자 직업</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {partnerCareer.bestJobs.map((job, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                <Laptop className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="text-white font-medium">{job}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 배우자 경제력 분석 */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="glass rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-yellow-400" />
            <h4 className="font-bold text-white">소득 수준</h4>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-yellow-300">{partnerCareer.income.level}</span>
            <span className="text-2xl font-bold text-yellow-400">{partnerCareer.income.score}점</span>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-500 to-amber-500"
              initial={{ width: 0 }}
              whileInView={{ width: `${partnerCareer.income.score}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>

        <div className="glass rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Building2 className="w-5 h-5 text-emerald-400" />
            <h4 className="font-bold text-white">직업 안정성</h4>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-emerald-300">{partnerCareer.stability.level}</span>
            <span className="text-2xl font-bold text-emerald-400">{partnerCareer.stability.score}점</span>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
              initial={{ width: 0 }}
              whileInView={{ width: `${partnerCareer.stability.score}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>
      </div>

      {/* 배우자 재물운 */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">배우자 재물운 (사주 기반)</h3>
        <div className="flex justify-between items-center mb-3">
          <div>
            <p className="text-slate-400 text-sm">배우자의 평생 재물운</p>
            <p className="text-slate-300 mt-1">
              {partnerWealthScore >= 80 ? '큰 재물을 모을 배우자' :
               partnerWealthScore >= 65 ? '안정적인 경제력을 가진 배우자' :
               partnerWealthScore >= 50 ? '평균적인 재물운의 배우자' :
               '함께 노력하면 좋은 배우자'}
            </p>
          </div>
          <span className="text-4xl font-bold text-rose-400">{partnerWealthScore}점</span>
        </div>
        <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-rose-500 to-pink-500"
            initial={{ width: 0 }}
            whileInView={{ width: `${partnerWealthScore}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />
        </div>
        <div className="mt-4 p-4 bg-slate-800/50 rounded-xl">
          <p className="text-sm text-slate-400 mb-2">사주 분석</p>
          <div className="space-y-1 text-sm">
            <p className="text-slate-300">• 재성(財星): {재성}개 - {재성 >= 2 ? '재물운 강함' : 재성 >= 1 ? '보통' : '약함'}</p>
            <p className="text-slate-300">• 관성(官星): {관성}개 - {관성 >= 2 ? '사회적 지위 높음' : 관성 >= 1 ? '보통' : '평범'}</p>
            <p className="text-slate-300">• 식상(食傷): {식상}개 - {식상 >= 2 ? '사업/부업 운 좋음' : 식상 >= 1 ? '보통' : '약함'}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
