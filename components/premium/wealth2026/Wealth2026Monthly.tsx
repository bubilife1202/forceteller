'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Calendar, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Wealth2026MonthlyProps {
  result: SajuResult;
  name: string;
  baseScore: number;
}

export default function Wealth2026Monthly({ result, name, baseScore }: Wealth2026MonthlyProps) {
  const dayElement = result.day.stem.element;

  // 월별 재물운 계산
  const getMonthlyFortune = () => {
    // 각 월의 지지와 천간
    const months = [
      { month: 1, name: '1월', gan: '경', ji: '인', element: '금목' },
      { month: 2, name: '2월', gan: '신', ji: '묘', element: '금목' },
      { month: 3, name: '3월', gan: '임', ji: '진', element: '수토' },
      { month: 4, name: '4월', gan: '계', ji: '사', element: '수화' },
      { month: 5, name: '5월', gan: '갑', ji: '오', element: '목화' },
      { month: 6, name: '6월', gan: '을', ji: '미', element: '목토' },
      { month: 7, name: '7월', gan: '병', ji: '신', element: '화금' },
      { month: 8, name: '8월', gan: '정', ji: '유', element: '화금' },
      { month: 9, name: '9월', gan: '무', ji: '술', element: '토토' },
      { month: 10, name: '10월', gan: '기', ji: '해', element: '토수' },
      { month: 11, name: '11월', gan: '경', ji: '자', element: '금수' },
      { month: 12, name: '12월', gan: '신', ji: '축', element: '금토' },
    ];

    return months.map(m => {
      let score = baseScore;

      // 일간과 월 오행의 관계에 따른 점수 조정
      if (dayElement === '목') {
        if (m.element.includes('수')) score += 15; // 수생목
        if (m.element.includes('화')) score -= 5; // 목생화 (에너지 소모)
        if (m.element.includes('금')) score -= 10; // 금극목
      } else if (dayElement === '화') {
        if (m.element.includes('목')) score += 15; // 목생화
        if (m.element.includes('토')) score -= 5;
        if (m.element.includes('수')) score -= 10; // 수극화
      } else if (dayElement === '토') {
        if (m.element.includes('화')) score += 15; // 화생토
        if (m.element.includes('금')) score -= 5;
        if (m.element.includes('목')) score -= 10; // 목극토
      } else if (dayElement === '금') {
        if (m.element.includes('토')) score += 15; // 토생금
        if (m.element.includes('수')) score -= 5;
        if (m.element.includes('화')) score -= 15; // 화극금 (병오년이라 더 강함)
      } else if (dayElement === '수') {
        if (m.element.includes('금')) score += 15; // 금생수
        if (m.element.includes('목')) score -= 5;
        if (m.element.includes('토')) score -= 10; // 토극수
      }

      // 병오년(화화)과의 시너지
      if (m.element.includes('화')) {
        if (dayElement === '토') score += 10;
        if (dayElement === '금') score -= 10;
      }

      score = Math.min(Math.max(score, 30), 100);

      const trend = score >= 70 ? 'up' : score <= 45 ? 'down' : 'stable';
      const grade = score >= 80 ? '대박' : score >= 65 ? '상승' : score >= 50 ? '보통' : '주의';

      return {
        ...m,
        score,
        trend,
        grade,
      };
    });
  };

  const monthlyFortune = getMonthlyFortune();

  // 최고/최저 월
  const bestMonth = monthlyFortune.reduce((a, b) => a.score > b.score ? a : b);
  const worstMonth = monthlyFortune.reduce((a, b) => a.score < b.score ? a : b);

  // 분기별 평균
  const getQuarterlyAvg = () => {
    const q1 = Math.round((monthlyFortune[0].score + monthlyFortune[1].score + monthlyFortune[2].score) / 3);
    const q2 = Math.round((monthlyFortune[3].score + monthlyFortune[4].score + monthlyFortune[5].score) / 3);
    const q3 = Math.round((monthlyFortune[6].score + monthlyFortune[7].score + monthlyFortune[8].score) / 3);
    const q4 = Math.round((monthlyFortune[9].score + monthlyFortune[10].score + monthlyFortune[11].score) / 3);
    return [
      { name: '1분기', score: q1 },
      { name: '2분기', score: q2 },
      { name: '3분기', score: q3 },
      { name: '4분기', score: q4 },
    ];
  };

  const quarterly = getQuarterlyAvg();

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
        📅 월별 재물 캘린더
      </h2>
      <p className="text-center text-slate-400 mb-8">
        2026년 {name}님의 월별 재물운 흐름
      </p>

      {/* 분기별 요약 */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        {quarterly.map((q, index) => (
          <motion.div
            key={q.name}
            className="text-center glass rounded-xl p-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <p className="text-slate-400 text-sm mb-1">{q.name}</p>
            <p className={`text-2xl font-bold
              ${q.score >= 70 ? 'text-green-400' : q.score >= 50 ? 'text-yellow-400' : 'text-red-400'}
            `}>
              {q.score}점
            </p>
          </motion.div>
        ))}
      </div>

      {/* 최고/최저 월 하이라이트 */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="glass rounded-xl p-5 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-slate-400 text-sm">재물운 최고의 달</p>
              <p className="text-2xl font-bold text-green-400">{bestMonth.name}</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-3xl font-bold text-white">{bestMonth.score}점</p>
              <p className="text-green-400 text-sm">{bestMonth.grade}</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-5 bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/30">
          <div className="flex items-center gap-3">
            <TrendingDown className="w-8 h-8 text-red-400" />
            <div>
              <p className="text-slate-400 text-sm">주의가 필요한 달</p>
              <p className="text-2xl font-bold text-red-400">{worstMonth.name}</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-3xl font-bold text-white">{worstMonth.score}점</p>
              <p className="text-red-400 text-sm">{worstMonth.grade}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 월별 그래프 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-lg font-bold text-cyan-400 mb-6 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          월별 재물운 그래프
        </h3>
        <div className="flex items-end justify-between gap-2 h-48">
          {monthlyFortune.map((m, index) => (
            <motion.div
              key={m.month}
              className="flex-1 flex flex-col items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <motion.div
                className={`w-full rounded-t-lg
                  ${m.score >= 70 ? 'bg-gradient-to-t from-green-600 to-green-400' : ''}
                  ${m.score >= 50 && m.score < 70 ? 'bg-gradient-to-t from-yellow-600 to-yellow-400' : ''}
                  ${m.score < 50 ? 'bg-gradient-to-t from-red-600 to-red-400' : ''}
                `}
                initial={{ height: 0 }}
                whileInView={{ height: `${m.score * 1.5}px` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
              />
              <p className="text-xs text-slate-400 mt-2">{m.month}월</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 월별 상세 */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3">
        {monthlyFortune.map((m, index) => (
          <motion.div
            key={m.month}
            className="glass rounded-xl p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.03 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-bold text-white">{m.name}</span>
              {m.trend === 'up' && <TrendingUp className="w-5 h-5 text-green-400" />}
              {m.trend === 'down' && <TrendingDown className="w-5 h-5 text-red-400" />}
              {m.trend === 'stable' && <Minus className="w-5 h-5 text-yellow-400" />}
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-2xl font-bold
                ${m.score >= 70 ? 'text-green-400' : ''}
                ${m.score >= 50 && m.score < 70 ? 'text-yellow-400' : ''}
                ${m.score < 50 ? 'text-red-400' : ''}
              `}>
                {m.score}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full
                ${m.grade === '대박' ? 'bg-green-500/20 text-green-400' : ''}
                ${m.grade === '상승' ? 'bg-emerald-500/20 text-emerald-400' : ''}
                ${m.grade === '보통' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                ${m.grade === '주의' ? 'bg-red-500/20 text-red-400' : ''}
              `}>
                {m.grade}
              </span>
            </div>
            <div className="mt-2 h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className={`h-full
                  ${m.score >= 70 ? 'bg-green-500' : ''}
                  ${m.score >= 50 && m.score < 70 ? 'bg-yellow-500' : ''}
                  ${m.score < 50 ? 'bg-red-500' : ''}
                `}
                initial={{ width: 0 }}
                whileInView={{ width: `${m.score}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
