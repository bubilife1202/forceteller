'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Clock, Sun, Sunset, Moon, Sunrise } from 'lucide-react';

interface StudyTimeProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function StudyTime({ result, name }: StudyTimeProps) {
  const dayElement = result.day.stem.element;
  const hourElement = result.hour.stem.element;

  // 시간대별 학습 효율 계산
  const getTimeSlotEfficiency = () => {
    const timeSlots = [
      {
        name: '새벽 (05-07시)',
        icon: Sunrise,
        period: '寅卯時',
        element: '목',
        color: 'from-green-500 to-emerald-600',
        textColor: 'text-green-400',
      },
      {
        name: '오전 (09-12시)',
        icon: Sun,
        period: '巳午時',
        element: '화',
        color: 'from-red-500 to-orange-600',
        textColor: 'text-red-400',
      },
      {
        name: '오후 (13-17시)',
        icon: Sunset,
        period: '未申時',
        element: '토금',
        color: 'from-yellow-500 to-amber-600',
        textColor: 'text-yellow-400',
      },
      {
        name: '저녁 (18-21시)',
        icon: Sunset,
        period: '戌時',
        element: '토',
        color: 'from-orange-500 to-amber-700',
        textColor: 'text-orange-400',
      },
      {
        name: '심야 (22-02시)',
        icon: Moon,
        period: '子時',
        element: '수',
        color: 'from-blue-500 to-indigo-600',
        textColor: 'text-blue-400',
      },
    ];

    return timeSlots.map(slot => {
      let score = 50;

      // 일간과 시간대 원소 상생상극
      if (dayElement === '목' && slot.element.includes('수')) score += 20; // 수생목
      if (dayElement === '화' && slot.element.includes('목')) score += 20; // 목생화
      if (dayElement === '토' && slot.element.includes('화')) score += 20; // 화생토
      if (dayElement === '금' && slot.element.includes('토')) score += 20; // 토생금
      if (dayElement === '수' && slot.element.includes('금')) score += 20; // 금생수

      // 같은 원소 조화
      if (dayElement === slot.element || slot.element.includes(dayElement)) score += 10;

      // 시주와 맞으면 가점
      if (hourElement === slot.element || slot.element.includes(hourElement)) score += 15;

      // 특별 보너스
      if (dayElement === '수' && slot.name.includes('심야')) score += 15;
      if (dayElement === '화' && slot.name.includes('오전')) score += 15;
      if (dayElement === '목' && slot.name.includes('새벽')) score += 15;

      return {
        ...slot,
        score: Math.min(Math.max(score, 30), 100),
      };
    }).sort((a, b) => b.score - a.score);
  };

  const timeSlots = getTimeSlotEfficiency();
  const bestTime = timeSlots[0];

  // 주간/야간 선호도
  const getDayNightPreference = () => {
    const dayScore = timeSlots.filter(t => !t.name.includes('심야')).reduce((sum, t) => sum + t.score, 0) / 4;
    const nightScore = timeSlots.find(t => t.name.includes('심야'))?.score || 50;

    if (nightScore > dayScore + 10) {
      return { type: '야행성', icon: '🦉', advice: '밤에 더 집중이 잘 됩니다. 단, 건강 관리에 유의하세요.' };
    } else if (dayScore > nightScore + 10) {
      return { type: '주간형', icon: '🌞', advice: '낮 시간을 최대한 활용하세요. 아침 일찍 시작하는 것이 좋습니다.' };
    } else {
      return { type: '유연형', icon: '🔄', advice: '낮과 밤 모두 학습 가능합니다. 상황에 맞춰 조절하세요.' };
    }
  };

  const preference = getDayNightPreference();

  // 요일별 학습 추천
  const getWeeklySchedule = () => {
    return [
      { day: '월요일', focus: '새로운 시작', activity: '주간 계획 수립, 새 단원 시작', energy: 85 },
      { day: '화요일', focus: '집중 학습', activity: '어려운 과목, 심화 학습', energy: 90 },
      { day: '수요일', focus: '중간 점검', activity: '복습, 이해도 확인', energy: 75 },
      { day: '목요일', focus: '응용 학습', activity: '문제 풀이, 실습', energy: 80 },
      { day: '금요일', focus: '마무리', activity: '주간 복습, 정리', energy: 70 },
      { day: '토요일', focus: '자유 학습', activity: '관심 분야 탐구', energy: 65 },
      { day: '일요일', focus: '휴식과 정비', activity: '가벼운 독서, 다음 주 준비', energy: 60 },
    ];
  };

  const weeklySchedule = getWeeklySchedule();

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
        ⏰ 최적의 학습 시간대
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님의 오행에 맞는 황금 학습 시간
      </p>

      {/* 최적 학습 시간대 */}
      <div className="glass rounded-2xl p-6 mb-8 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${bestTime.color} flex items-center justify-center`}>
            <bestTime.icon className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-slate-400">최고 효율 시간대</p>
            <h3 className="text-2xl font-bold text-amber-400">{bestTime.name}</h3>
            <p className="text-3xl font-bold text-orange-400">{bestTime.score}점</p>
          </div>
        </div>
        <p className="text-slate-300">
          이 시간대에 가장 중요한 학습을 배치하세요. 이해력과 기억력이 최고조에 달합니다.
        </p>
      </div>

      {/* 시간대별 효율 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {timeSlots.map((slot, index) => (
          <motion.div
            key={slot.name}
            className="glass rounded-xl p-5"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${slot.color} flex items-center justify-center`}>
                <slot.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white">{slot.name}</h4>
                <p className={`text-2xl font-bold ${slot.textColor}`}>{slot.score}점</p>
              </div>
            </div>

            <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-2">
              <motion.div
                className={`h-full bg-gradient-to-r ${slot.color}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${slot.score}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </div>

            <p className="text-slate-500 text-xs">{slot.period}</p>
          </motion.div>
        ))}
      </div>

      {/* 주야간 선호도 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl">{preference.icon}</span>
          <div>
            <p className="text-slate-400">학습 리듬</p>
            <h3 className="text-2xl font-bold text-purple-400">{preference.type}</h3>
          </div>
        </div>
        <p className="text-slate-300">{preference.advice}</p>
      </div>

      {/* 요일별 학습 전략 */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
          <Clock className="w-6 h-6" />
          주간 학습 플랜
        </h3>
        <div className="space-y-3">
          {weeklySchedule.map((schedule, index) => (
            <motion.div
              key={schedule.day}
              className="glass rounded-xl p-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-indigo-400">{schedule.day}</span>
                  <span className="text-sm text-slate-400">{schedule.focus}</span>
                </div>
                <span className="text-sm font-semibold text-cyan-400">{schedule.energy}%</span>
              </div>
              <p className="text-slate-300 text-sm">{schedule.activity}</p>

              <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden mt-2">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${schedule.energy}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
