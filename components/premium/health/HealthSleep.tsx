'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Moon, Sun, Clock, BedDouble, Coffee } from 'lucide-react';

interface HealthSleepProps {
  result: SajuResult;
  name: string;
}

export default function HealthSleep({ result, name }: HealthSleepProps) {
  const dayElement = result.day.stem.element;

  // 체질별 수면 가이드
  const getSleepGuide = () => {
    const guide: Record<
      string,
      {
        idealSleep: string;
        bedTime: string;
        wakeTime: string;
        sleepQuality: string[];
        restTips: string[];
        avoid: string[];
      }
    > = {
      목: {
        idealSleep: '7-8시간',
        bedTime: '23:00',
        wakeTime: '06:00-07:00',
        sleepQuality: [
          '간 재생 시간(23:00-03:00) 반드시 수면',
          '수면 리듬이 불규칙하면 간 기능 저하',
          '스트레스로 인한 불면증 주의',
          '깊은 수면이 중요 (REM 수면 확보)',
        ],
        restTips: [
          '잠들기 2시간 전 스마트폰 사용 중단',
          '명상이나 가벼운 스트레칭으로 긴장 완화',
          '카모마일 차나 따뜻한 우유 한 잔',
          '조용하고 어두운 환경 조성',
          '규칙적인 수면 시간 유지',
        ],
        avoid: [
          '야식과 과식',
          '잠자리에서 스마트폰 보기',
          '카페인 (오후 3시 이후)',
          '술로 수면 유도',
        ],
      },
      화: {
        idealSleep: '6-7시간',
        bedTime: '22:00-23:00',
        wakeTime: '05:00-06:00',
        sleepQuality: [
          '심장 휴식 시간 확보 중요',
          '불면증 경향이 있어 수면 관리 필수',
          '흥분 상태에서 잠들면 수면의 질 저하',
          '짧아도 깊은 수면이 중요',
        ],
        restTips: [
          '저녁 시간 마음 안정에 집중',
          '호흡 명상으로 심신 이완',
          '시원한 실내 온도 유지 (18-20도)',
          '따뜻한 물로 샤워 후 체온 낮추기',
          '잠들기 전 가벼운 독서',
        ],
        avoid: [
          '자극적인 영상이나 뉴스',
          '격렬한 운동 (저녁 시간)',
          '과도한 흥분이나 스트레스',
          '뜨거운 음식이나 음료',
        ],
      },
      토: {
        idealSleep: '7-9시간',
        bedTime: '22:00-23:00',
        wakeTime: '06:00-08:00',
        sleepQuality: [
          '충분한 수면으로 소화 기능 회복',
          '걱정이 많아 수면 방해 가능',
          '편안한 잠자리 환경 중요',
          '규칙적인 수면 패턴 유지',
        ],
        restTips: [
          '저녁 식사는 가볍게 (소화 잘 되는 음식)',
          '식사 후 3시간 뒤 취침',
          '걱정거리는 일기로 정리',
          '편안한 침구와 베개 사용',
          '복부 마사지로 소화 촉진',
        ],
        avoid: [
          '과식과 야식',
          '찬 음식이나 음료',
          '잠들기 전 과도한 고민',
          '불편한 자세로 수면',
        ],
      },
      금: {
        idealSleep: '7-8시간',
        bedTime: '22:00-23:00',
        wakeTime: '05:00-06:00',
        sleepQuality: [
          '폐 재생 시간(03:00-05:00) 깊은 수면',
          '호흡이 수면의 질에 영향',
          '건조한 환경은 수면 방해',
          '새벽 기상이 체질에 맞음',
        ],
        restTips: [
          '실내 습도 50-60% 유지',
          '코 호흡 훈련 (입 다물고 자기)',
          '공기 정화 식물 배치',
          '깨끗하고 신선한 공기 순환',
          '심호흡으로 긴장 완화',
        ],
        avoid: [
          '건조한 환경',
          '먼지와 미세먼지',
          '코막힘 상태로 취침',
          '과도한 냉난방',
        ],
      },
      수: {
        idealSleep: '8-9시간',
        bedTime: '22:00',
        wakeTime: '06:00-07:00',
        sleepQuality: [
          '신장 회복을 위해 충분한 수면',
          '수면 부족 시 신장 기능 저하',
          '깊고 긴 수면이 필요',
          '따뜻한 환경에서 수면',
        ],
        restTips: [
          '잠들기 전 따뜻한 물로 족욕',
          '허리와 발 보온 (수면 양말)',
          '따뜻한 차 한 잔 (생강차, 대추차)',
          '아침에 자연광으로 기상',
          '충분한 수면 시간 확보',
        ],
        avoid: [
          '차가운 환경',
          '발이 차가운 상태로 취침',
          '과도한 수분 섭취 (자기 전)',
          '늦은 밤 활동',
        ],
      },
    };

    return guide[dayElement] || guide['목'];
  };

  const sleepGuide = getSleepGuide();

  // 시간대별 활동 가이드
  const timeGuide = [
    {
      time: '06:00-09:00',
      organ: '대장',
      activity: '기상 후 물 한 잔, 가벼운 스트레칭, 아침 식사',
    },
    {
      time: '09:00-11:00',
      organ: '비장',
      activity: '집중력 최고, 중요한 일 처리',
    },
    {
      time: '11:00-13:00',
      organ: '심장',
      activity: '활동 왕성, 점심 식사, 짧은 휴식',
    },
    {
      time: '13:00-15:00',
      organ: '소장',
      activity: '소화 시간, 가벼운 활동',
    },
    {
      time: '15:00-17:00',
      organ: '방광',
      activity: '수분 섭취, 오후 업무',
    },
    {
      time: '17:00-19:00',
      organ: '신장',
      activity: '저녁 운동, 휴식 시작',
    },
    {
      time: '19:00-21:00',
      organ: '심포',
      activity: '가벼운 저녁 식사, 가족 시간',
    },
    {
      time: '21:00-23:00',
      organ: '삼초',
      activity: '수면 준비, 이완 활동',
    },
    {
      time: '23:00-01:00',
      organ: '담',
      activity: '깊은 수면 (필수)',
    },
    {
      time: '01:00-03:00',
      organ: '간',
      activity: '간 해독 시간 (필수 수면)',
    },
    {
      time: '03:00-05:00',
      organ: '폐',
      activity: '폐 재생 시간 (깊은 수면)',
    },
    {
      time: '05:00-07:00',
      organ: '대장',
      activity: '배변 활동, 서서히 기상',
    },
  ];

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2
        className="text-3xl font-bold text-center mb-8 gradient-text"
        style={{ fontFamily: "'Noto Serif KR', serif" }}
      >
        😴 수면 & 휴식 가이드
      </h2>

      {/* 권장 수면 시간 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <BedDouble className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-indigo-400">{name}님의 최적 수면 시간</h3>
            <p className="text-slate-400 text-sm">체질에 맞는 수면 패턴을 유지하세요</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="glass rounded-xl p-5 text-center">
            <Moon className="w-10 h-10 text-purple-400 mx-auto mb-3" />
            <h4 className="font-bold text-purple-400 mb-2">취침 시간</h4>
            <p className="text-2xl font-bold text-white">{sleepGuide.bedTime}</p>
          </div>
          <div className="glass rounded-xl p-5 text-center">
            <Clock className="w-10 h-10 text-cyan-400 mx-auto mb-3" />
            <h4 className="font-bold text-cyan-400 mb-2">수면 시간</h4>
            <p className="text-2xl font-bold text-white">{sleepGuide.idealSleep}</p>
          </div>
          <div className="glass rounded-xl p-5 text-center">
            <Sun className="w-10 h-10 text-amber-400 mx-auto mb-3" />
            <h4 className="font-bold text-amber-400 mb-2">기상 시간</h4>
            <p className="text-2xl font-bold text-white">{sleepGuide.wakeTime}</p>
          </div>
        </div>

        <div className="glass rounded-xl p-5">
          <h4 className="font-bold text-blue-400 mb-3">수면의 질을 높이는 포인트</h4>
          <ul className="space-y-2">
            {sleepGuide.sleepQuality.map((tip, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-2 text-slate-300 text-sm"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-blue-400 mt-0.5">•</span>
                <span>{tip}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* 휴식 팁 */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2">
            ✓ 좋은 수면 습관
          </h3>
          <ul className="space-y-2">
            {sleepGuide.restTips.map((tip, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-2 text-slate-300 text-sm"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-green-400 mt-0.5">✓</span>
                <span>{tip}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="glass rounded-2xl p-6 bg-red-500/10 border border-red-500/30">
          <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
            <Coffee className="w-5 h-5" />
            피해야 할 습관
          </h3>
          <ul className="space-y-2">
            {sleepGuide.avoid.map((avoid, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-2 text-slate-300 text-sm"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-red-400 mt-0.5">✗</span>
                <span>{avoid}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* 생체 시계 (12 시진) */}
      <div className="glass rounded-2xl p-6 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/30">
        <h3 className="text-xl font-bold text-purple-400 mb-6">⏰ 생체 시계 (12시진)</h3>
        <p className="text-slate-300 text-sm mb-6">
          각 시간대마다 특정 장기의 기능이 활발해집니다. 이 리듬에 맞춰 생활하면 건강을 유지할 수 있습니다.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {timeGuide.map((time, index) => (
            <motion.div
              key={time.time}
              className="bg-slate-800/50 rounded-lg p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="text-purple-400 font-bold text-sm mb-1">{time.time}</div>
              <div className="text-white font-semibold mb-2">{time.organ}</div>
              <div className="text-slate-400 text-xs leading-relaxed">{time.activity}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
