'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Calendar, Clock, TrendingUp, AlertCircle } from 'lucide-react';

interface MarriageTimingProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function MarriageTiming({ result, name, birthDate }: MarriageTimingProps) {
  const dayElement = result.day.stem.element;
  const { 재성, 관성 } = result.tenGodsCount;
  const currentYear = new Date().getFullYear();
  const birthYear = birthDate ? birthDate.getFullYear() : currentYear - 30;
  const currentAge = currentYear - birthYear + 1;

  // 결혼 적기 나이대 계산
  const getMarriageAgeRange = () => {
    if (dayElement === '목' || dayElement === '수') {
      return { early: '25-28세', prime: '29-33세', late: '34-38세' };
    }
    if (dayElement === '화') {
      return { early: '23-26세', prime: '27-31세', late: '32-36세' };
    }
    if (dayElement === '토' || dayElement === '금') {
      return { early: '27-30세', prime: '31-35세', late: '36-40세' };
    }
    return { early: '25-28세', prime: '29-33세', late: '34-38세' };
  };

  const ageRange = getMarriageAgeRange();

  // 올해부터 5년간 결혼운 예측
  const getYearlyFortune = () => {
    const years = [];
    for (let i = 0; i < 5; i++) {
      const year = currentYear + i;
      const age = currentAge + i;
      const score = calculateYearScore(year);
      years.push({
        year,
        age,
        score,
        level: score >= 80 ? 'excellent' : score >= 60 ? 'good' : score >= 40 ? 'normal' : 'low'
      });
    }
    return years;
  };

  const calculateYearScore = (year: number) => {
    let score = 50;

    // 년도별 기본 점수 (임의 계산)
    const yearMod = year % 12;
    if ([2, 6, 10].includes(yearMod)) score += 20; // 인연운 강한 해
    if ([4, 8].includes(yearMod)) score += 10;

    // 사주 기반 보정
    if (재성 >= 1 || 관성 >= 1) score += 15;

    return Math.min(Math.max(score, 30), 95);
  };

  const yearlyFortune = getYearlyFortune();

  // 계절별 결혼 운세
  const getSeasonalAdvice = () => {
    const seasons: Record<string, { season: string; advice: string; score: number }> = {
      목: { season: '봄(3-5월)', advice: '새로운 시작과 인연의 계절. 소개팅 적극 추천', score: 90 },
      화: { season: '여름(6-8월)', advice: '열정이 넘치는 계절. 야외 활동에서 인연 가능', score: 85 },
      토: { season: '환절기(4월, 10월)', advice: '안정을 찾는 시기. 진지한 만남 추천', score: 80 },
      금: { season: '가을(9-11월)', advice: '결실의 계절. 프로포즈 적기', score: 85 },
      수: { season: '겨울(12-2월)', advice: '차분히 관계를 다지는 시기. 깊은 대화 나누기', score: 75 }
    };
    return seasons[dayElement] || seasons['목'];
  };

  const seasonalAdvice = getSeasonalAdvice();

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
        ⏰ 결혼 적기 분석
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님에게 가장 좋은 결혼 타이밍
      </p>

      {/* 나이대별 결혼 적기 */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-bold text-white">나이대별 결혼운</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/30">
            <p className="text-blue-400 text-sm mb-1">조혼기</p>
            <p className="text-2xl font-bold text-white">{ageRange.early}</p>
            <p className="text-slate-400 text-xs mt-2">열정적 만남 가능</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl border-2 border-emerald-500">
            <p className="text-emerald-400 text-sm mb-1 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              최적기
            </p>
            <p className="text-2xl font-bold text-white">{ageRange.prime}</p>
            <p className="text-emerald-300 text-xs mt-2">최고의 결혼 타이밍</p>
          </div>
          <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/30">
            <p className="text-purple-400 text-sm mb-1">만혼기</p>
            <p className="text-2xl font-bold text-white">{ageRange.late}</p>
            <p className="text-slate-400 text-xs mt-2">성숙한 선택 가능</p>
          </div>
        </div>
      </div>

      {/* 향후 5년 결혼운 */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-6 h-6 text-cyan-400" />
          <h3 className="text-xl font-bold text-white">향후 5년 결혼운 예측</h3>
        </div>
        <div className="space-y-3">
          {yearlyFortune.map((item, index) => (
            <motion.div
              key={item.year}
              className={`p-4 rounded-xl ${
                item.level === 'excellent' ? 'bg-emerald-500/20 border border-emerald-500' :
                item.level === 'good' ? 'bg-blue-500/10 border border-blue-500/30' :
                item.level === 'normal' ? 'bg-slate-700/30' :
                'bg-slate-800/30'
              }`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="text-white font-bold">{item.year}년</span>
                  <span className="text-slate-400 text-sm ml-2">({item.age}세)</span>
                </div>
                <span className={`text-2xl font-bold ${
                  item.level === 'excellent' ? 'text-emerald-400' :
                  item.level === 'good' ? 'text-blue-400' :
                  item.level === 'normal' ? 'text-yellow-400' :
                  'text-slate-400'
                }`}>
                  {item.score}점
                </span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${
                    item.level === 'excellent' ? 'bg-gradient-to-r from-emerald-500 to-teal-500' :
                    item.level === 'good' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                    item.level === 'normal' ? 'bg-gradient-to-r from-yellow-500 to-amber-500' :
                    'bg-slate-600'
                  }`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.score}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                />
              </div>
              {item.level === 'excellent' && (
                <p className="text-emerald-400 text-sm mt-2">✨ 결혼하기 최적의 해!</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* 계절별 조언 */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-6 h-6 text-yellow-400" />
          <h3 className="text-xl font-bold text-white">계절별 결혼운</h3>
        </div>
        <div className="p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/30">
          <div className="flex justify-between items-center mb-2">
            <p className="text-yellow-300 font-bold">{seasonalAdvice.season}</p>
            <p className="text-2xl font-bold text-yellow-400">{seasonalAdvice.score}점</p>
          </div>
          <p className="text-slate-300">{seasonalAdvice.advice}</p>
        </div>
      </div>
    </motion.div>
  );
}
