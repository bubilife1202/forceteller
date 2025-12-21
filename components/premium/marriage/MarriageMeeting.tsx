'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Calendar, TrendingUp, Star, Sparkles } from 'lucide-react';

interface MarriageMeetingProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function MarriageMeeting({ result, name }: MarriageMeetingProps) {
  const dayElement = result.day.stem.element;
  const currentYear = new Date().getFullYear();

  // 년도별 만남운 계산
  const getYearlyMeetingFortune = () => {
    const years = [];
    for (let i = 0; i < 5; i++) {
      const year = currentYear + i;
      const score = calculateMeetingScore(year);
      years.push({
        year,
        score,
        level: score >= 85 ? 'excellent' : score >= 70 ? 'good' : score >= 50 ? 'normal' : 'low',
        advice: getYearAdvice(score)
      });
    }
    return years;
  };

  const calculateMeetingScore = (year: number) => {
    let score = 50;

    // 년도 기반 계산 (간단한 로직)
    const yearMod = year % 12;
    if ([2, 6, 10].includes(yearMod)) score += 30; // 인연운 최고
    if ([3, 7, 11].includes(yearMod)) score += 20;
    if ([4, 8].includes(yearMod)) score += 10;

    // 오행별 보정
    if (dayElement === '목' && [3, 8].includes(yearMod)) score += 10;
    if (dayElement === '화' && [2, 7].includes(yearMod)) score += 10;
    if (dayElement === '토' && [5, 10].includes(yearMod)) score += 10;
    if (dayElement === '금' && [4, 9].includes(yearMod)) score += 10;
    if (dayElement === '수' && [1, 6].includes(yearMod)) score += 10;

    return Math.min(Math.max(score, 30), 95);
  };

  const getYearAdvice = (score: number) => {
    if (score >= 85) return '운명적 만남이 기다립니다!';
    if (score >= 70) return '적극적으로 나서면 좋은 인연을 만납니다';
    if (score >= 50) return '꾸준히 노력하면 인연이 옵니다';
    return '인내심을 갖고 자기계발에 집중하세요';
  };

  const yearlyFortune = getYearlyMeetingFortune();

  // 월별 만남운 (올해)
  const getMonthlyFortune = () => {
    const months = [
      { month: 1, name: '1월', score: 60, activity: '새해 모임 참석' },
      { month: 2, name: '2월', score: 55, activity: '발렌타인 이벤트' },
      { month: 3, name: '3월', score: 75, activity: '봄 나들이' },
      { month: 4, name: '4월', score: 80, activity: '야외 활동 증가' },
      { month: 5, name: '5월', score: 70, activity: '가정의 달 모임' },
      { month: 6, name: '6월', score: 65, activity: '여름 시작' },
      { month: 7, name: '7월', score: 60, activity: '휴가철' },
      { month: 8, name: '8월', score: 55, activity: '여름 피서지' },
      { month: 9, name: '9월', score: 85, activity: '가을 시작, 문화행사' },
      { month: 10, name: '10월', score: 90, activity: '최고의 만남운!' },
      { month: 11, name: '11월', score: 75, activity: '연말 준비' },
      { month: 12, name: '12월', score: 70, activity: '송년 모임' }
    ];

    // 오행별 보정
    return months.map(m => {
      let adjustedScore = m.score;
      if (dayElement === '목' && [3, 4, 5].includes(m.month)) adjustedScore += 10;
      if (dayElement === '화' && [6, 7, 8].includes(m.month)) adjustedScore += 10;
      if (dayElement === '금' && [9, 10, 11].includes(m.month)) adjustedScore += 10;
      if (dayElement === '수' && [12, 1, 2].includes(m.month)) adjustedScore += 10;
      return { ...m, score: Math.min(adjustedScore, 95) };
    });
  };

  const monthlyFortune = getMonthlyFortune();
  const bestMonth = monthlyFortune.reduce((prev, current) =>
    prev.score > current.score ? prev : current
  );

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
        📅 만남의 시기 분석
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님이 배우자를 만날 가능성이 높은 시기
      </p>

      {/* 최고의 만남 시기 */}
      <div className="glass rounded-2xl p-6 mb-6 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30">
        <div className="flex items-center gap-3 mb-4">
          <Star className="w-6 h-6 text-emerald-400" />
          <h3 className="text-xl font-bold text-white">최고의 만남 시기</h3>
        </div>
        <div className="text-center">
          <p className="text-emerald-400 text-sm mb-2">올해 가장 좋은 달</p>
          <p className="text-4xl font-bold text-white mb-2">{bestMonth.name}</p>
          <p className="text-2xl font-bold text-emerald-300 mb-3">{bestMonth.score}점</p>
          <p className="text-slate-300">{bestMonth.activity}</p>
        </div>
      </div>

      {/* 년도별 만남운 */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-bold text-white">향후 5년 만남운</h3>
        </div>
        <div className="space-y-3">
          {yearlyFortune.map((item, index) => (
            <motion.div
              key={item.year}
              className={`p-5 rounded-xl ${
                item.level === 'excellent' ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500' :
                item.level === 'good' ? 'bg-blue-500/10 border border-blue-500/30' :
                item.level === 'normal' ? 'bg-slate-700/30' :
                'bg-slate-800/30'
              }`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-2xl font-bold text-white">{item.year}년</span>
                <span className={`text-3xl font-bold ${
                  item.level === 'excellent' ? 'text-emerald-400' :
                  item.level === 'good' ? 'text-blue-400' :
                  item.level === 'normal' ? 'text-yellow-400' :
                  'text-slate-400'
                }`}>
                  {item.score}점
                </span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-3">
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
              <p className={`text-sm ${
                item.level === 'excellent' ? 'text-emerald-300' :
                item.level === 'good' ? 'text-blue-300' :
                'text-slate-300'
              }`}>
                {item.advice}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 올해 월별 만남운 */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-bold text-white">{currentYear}년 월별 만남운</h3>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          {monthlyFortune.map((item, index) => (
            <motion.div
              key={item.month}
              className={`p-4 rounded-xl text-center ${
                item.score >= 80 ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-2 border-emerald-500' :
                item.score >= 70 ? 'bg-blue-500/10 border border-blue-500/30' :
                'bg-slate-800/50'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <p className="text-slate-400 text-sm mb-1">{item.name}</p>
              <p className={`text-2xl font-bold ${
                item.score >= 80 ? 'text-emerald-400' :
                item.score >= 70 ? 'text-blue-400' :
                item.score >= 60 ? 'text-yellow-400' :
                'text-slate-400'
              }`}>
                {item.score}
              </p>
              {item.score >= 80 && (
                <Sparkles className="w-5 h-5 text-emerald-400 mx-auto mt-2" />
              )}
            </motion.div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
          <p className="text-purple-400 font-medium mb-2">💡 활용 팁</p>
          <p className="text-slate-300 text-sm">
            점수가 높은 달에는 적극적으로 모임에 참석하고, 소개팅이나 만남의 기회를 만드세요.
            점수가 낮은 달에는 자기계발과 내면을 가꾸는 시간으로 활용하세요.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
