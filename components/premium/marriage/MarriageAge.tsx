'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Users, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MarriageAgeProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function MarriageAge({ result, name }: MarriageAgeProps) {
  const dayElement = result.day.stem.element;

  // 오행별 나이차 궁합
  const getAgeGapCompatibility = () => {
    const ageGaps: Record<string, {
      olderPartner: { gap: string; score: number; advice: string };
      sameAge: { gap: string; score: number; advice: string };
      youngerPartner: { gap: string; score: number; advice: string };
      best: string;
    }> = {
      목: {
        olderPartner: { gap: '3-7세 연상', score: 85, advice: '배우자의 포용력과 경험이 나를 성장시킵니다' },
        sameAge: { gap: '동갑±1세', score: 75, advice: '함께 성장하는 즐거움이 있습니다' },
        youngerPartner: { gap: '1-4세 연하', score: 70, advice: '내가 이끌어주는 관계로 보람을 느낍니다' },
        best: '연상'
      },
      화: {
        olderPartner: { gap: '1-3세 연상', score: 75, advice: '열정은 있되 조언을 들을 수 있는 배우자' },
        sameAge: { gap: '동갑±1세', score: 90, advice: '같은 눈높이에서 활발하게 소통하는 최고의 관계' },
        youngerPartner: { gap: '1-5세 연하', score: 80, advice: '내가 이끄는 역동적인 관계가 행복합니다' },
        best: '동갑'
      },
      토: {
        olderPartner: { gap: '5-10세 연상', score: 90, advice: '든든하고 안정적인 배우자가 평생의 버팀목' },
        sameAge: { gap: '동갑±2세', score: 70, advice: '차분하게 신뢰를 쌓아가는 관계' },
        youngerPartner: { gap: '1-3세 연하', score: 60, advice: '내가 책임지는 무게가 부담될 수 있음' },
        best: '연상'
      },
      금: {
        olderPartner: { gap: '2-5세 연상', score: 80, advice: '서로의 원칙을 존중하는 성숙한 관계' },
        sameAge: { gap: '동갑±1세', score: 85, advice: '비슷한 수준의 품격을 유지하는 이상적 관계' },
        youngerPartner: { gap: '3-7세 연하', score: 75, advice: '내 기준을 따르는 배우자와 편안한 관계' },
        best: '동갑'
      },
      수: {
        olderPartner: { gap: '4-8세 연상', score: 80, advice: '지혜로운 배우자가 나를 이해해줍니다' },
        sameAge: { gap: '동갑±2세', score: 75, advice: '깊은 감성을 나누는 영혼의 교감' },
        youngerPartner: { gap: '5-10세 연하', score: 85, advice: '내가 가르치고 돌보는 관계가 잘 맞습니다' },
        best: '연하'
      }
    };
    return ageGaps[dayElement] || ageGaps['목'];
  };

  const ageCompatibility = getAgeGapCompatibility();

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
        👥 배우자 나이차 운세
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님에게 가장 잘 맞는 나이차는?
      </p>

      {/* 최적 나이차 */}
      <div className="glass rounded-2xl p-6 mb-6 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30">
        <div className="text-center">
          <p className="text-emerald-400 text-sm mb-2">최고의 나이차</p>
          <p className="text-4xl font-bold text-white mb-2">
            {ageCompatibility.best === '연상' ? '연상 배우자' :
             ageCompatibility.best === '연하' ? '연하 배우자' :
             '동갑 배우자'}
          </p>
          <p className="text-slate-400">
            {name}님의 일간({dayElement})과 가장 조화로운 나이차
          </p>
        </div>
      </div>

      {/* 연상 배우자 */}
      <div className="glass rounded-2xl p-6 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-bold text-white">연상 배우자</h3>
        </div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-blue-300 font-medium">{ageCompatibility.olderPartner.gap}</span>
          <span className="text-3xl font-bold text-blue-400">{ageCompatibility.olderPartner.score}점</span>
        </div>
        <div className="h-3 bg-slate-700 rounded-full overflow-hidden mb-3">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
            initial={{ width: 0 }}
            whileInView={{ width: `${ageCompatibility.olderPartner.score}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
        </div>
        <p className="text-slate-300">{ageCompatibility.olderPartner.advice}</p>
        <div className="mt-3 p-3 bg-blue-500/10 rounded-lg">
          <p className="text-blue-300 text-sm">
            <strong>장점:</strong> 안정감, 포용력, 경제력, 인생 경험
          </p>
        </div>
      </div>

      {/* 동갑 배우자 */}
      <div className="glass rounded-2xl p-6 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <Minus className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-bold text-white">동갑 배우자</h3>
        </div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-purple-300 font-medium">{ageCompatibility.sameAge.gap}</span>
          <span className="text-3xl font-bold text-purple-400">{ageCompatibility.sameAge.score}점</span>
        </div>
        <div className="h-3 bg-slate-700 rounded-full overflow-hidden mb-3">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            initial={{ width: 0 }}
            whileInView={{ width: `${ageCompatibility.sameAge.score}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
        </div>
        <p className="text-slate-300">{ageCompatibility.sameAge.advice}</p>
        <div className="mt-3 p-3 bg-purple-500/10 rounded-lg">
          <p className="text-purple-300 text-sm">
            <strong>장점:</strong> 공감대, 동등한 관계, 같은 시대 문화, 편안함
          </p>
        </div>
      </div>

      {/* 연하 배우자 */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingDown className="w-6 h-6 text-rose-400" />
          <h3 className="text-xl font-bold text-white">연하 배우자</h3>
        </div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-rose-300 font-medium">{ageCompatibility.youngerPartner.gap}</span>
          <span className="text-3xl font-bold text-rose-400">{ageCompatibility.youngerPartner.score}점</span>
        </div>
        <div className="h-3 bg-slate-700 rounded-full overflow-hidden mb-3">
          <motion.div
            className="h-full bg-gradient-to-r from-rose-500 to-pink-500"
            initial={{ width: 0 }}
            whileInView={{ width: `${ageCompatibility.youngerPartner.score}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
        </div>
        <p className="text-slate-300">{ageCompatibility.youngerPartner.advice}</p>
        <div className="mt-3 p-3 bg-rose-500/10 rounded-lg">
          <p className="text-rose-300 text-sm">
            <strong>장점:</strong> 활력, 존경받는 느낌, 리더십 발휘, 보호욕구 충족
          </p>
        </div>
      </div>
    </motion.div>
  );
}
