'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Sparkles, Palette, MapPin, Hash, Clock } from 'lucide-react';

interface HealthLuckyProps {
  result: SajuResult;
  name: string;
}

export default function HealthLucky({ result, name }: HealthLuckyProps) {
  const dayElement = result.day.stem.element;

  // 체질별 행운 아이템
  const getLuckyItems = () => {
    const items: Record<
      string,
      {
        colors: string[];
        directions: string[];
        numbers: number[];
        times: string[];
        foods: string[];
        stones: string[];
        activities: string[];
      }
    > = {
      목: {
        colors: ['초록색', '청록색', '연두색', '하늘색'],
        directions: ['동쪽', '동남쪽'],
        numbers: [3, 8],
        times: ['03:00-07:00 (간담 경락 시간)', '아침 일찍'],
        foods: ['시금치', '브로콜리', '셀러리', '녹차'],
        stones: ['에메랄드', '비취', '그린 아벤츄린', '말라카이트'],
        activities: ['산책', '요가', '명상', '숲 치유'],
      },
      화: {
        colors: ['빨간색', '주황색', '분홍색', '자주색'],
        directions: ['남쪽', '남동쪽'],
        numbers: [2, 7],
        times: ['11:00-13:00 (심장 경락 시간)', '한낮'],
        foods: ['토마토', '딸기', '비트', '홍삼'],
        stones: ['루비', '가넷', '카넬리안', '레드 재스퍼'],
        activities: ['명상', '요가', '태극권', '수영'],
      },
      토: {
        colors: ['노란색', '갈색', '베이지', '황토색'],
        directions: ['중앙', '남서쪽', '북동쪽'],
        numbers: [5, 10],
        times: ['07:00-09:00 (위 경락 시간)', '식사 시간'],
        foods: ['고구마', '호박', '감자', '밤'],
        stones: ['황수정', '호박석', '타이거 아이', '재스퍼'],
        activities: ['걷기', '등산', '요리', '원예'],
      },
      금: {
        colors: ['흰색', '은색', '회색', '금색'],
        directions: ['서쪽', '북서쪽'],
        numbers: [4, 9],
        times: ['05:00-07:00 (폐 경락 시간)', '이른 아침'],
        foods: ['무', '도라지', '배', '은행'],
        stones: ['수정', '문스톤', '진주', '하울라이트'],
        activities: ['호흡 운동', '명상', '등산', '태극권'],
      },
      수: {
        colors: ['검정색', '남색', '진한 파란색', '자주색'],
        directions: ['북쪽', '북동쪽'],
        numbers: [1, 6],
        times: ['15:00-19:00 (방광/신장 시간)', '저녁'],
        foods: ['검은콩', '흑미', '검은깨', '미역'],
        stones: ['흑요석', '오닉스', '블랙 투어말린', '사파이어'],
        activities: ['명상', '독서', '족욕', '온천'],
      },
    };

    return items[dayElement] || items['목'];
  };

  const luckyItems = getLuckyItems();

  // 색상 코드 매핑
  const colorCodes: Record<string, string> = {
    초록색: 'bg-green-500',
    청록색: 'bg-teal-500',
    연두색: 'bg-lime-500',
    하늘색: 'bg-sky-500',
    빨간색: 'bg-red-500',
    주황색: 'bg-orange-500',
    분홍색: 'bg-pink-500',
    자주색: 'bg-purple-500',
    노란색: 'bg-yellow-500',
    갈색: 'bg-amber-700',
    베이지: 'bg-amber-200',
    황토색: 'bg-yellow-600',
    흰색: 'bg-white',
    은색: 'bg-gray-300',
    회색: 'bg-gray-500',
    금색: 'bg-yellow-400',
    검정색: 'bg-black',
    남색: 'bg-blue-900',
    '진한 파란색': 'bg-blue-700',
  };

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
        ✨ 건강 행운 아이템
      </h2>

      <p className="text-slate-300 text-center mb-8">
        {name}님의 체질에 맞는 행운의 색상, 방향, 숫자를 활용하여 건강 기운을 높이세요
      </p>

      {/* 행운의 색상 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
            <Palette className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-pink-400">행운의 색상</h3>
            <p className="text-slate-400 text-sm">의류, 소품, 인테리어에 활용하세요</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {luckyItems.colors.map((color, index) => (
            <motion.div
              key={color}
              className="flex items-center gap-3 glass rounded-lg p-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                className={`w-12 h-12 rounded-full ${colorCodes[color] || 'bg-slate-500'} ${
                  color === '흰색' || color === '은색' || color === '베이지'
                    ? 'border-2 border-slate-600'
                    : ''
                }`}
              />
              <span className="text-slate-200 font-medium">{color}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 행운의 방향 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-cyan-400">행운의 방향</h3>
            <p className="text-slate-400 text-sm">운동, 여행, 침대 방향 설정 시 참고</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {luckyItems.directions.map((direction, index) => (
            <motion.div
              key={direction}
              className="bg-cyan-500/20 border border-cyan-500/30 rounded-lg p-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <MapPin className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <p className="text-cyan-300 font-semibold">{direction}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 행운의 숫자 & 시간 */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <Hash className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-purple-400">행운의 숫자</h3>
          </div>
          <div className="flex gap-4 justify-center">
            {luckyItems.numbers.map((number, index) => (
              <motion.div
                key={number}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, type: 'spring' }}
              >
                <span className="text-3xl font-bold text-white">{number}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-amber-400">행운의 시간</h3>
          </div>
          <div className="space-y-2">
            {luckyItems.times.map((time, index) => (
              <motion.div
                key={time}
                className="bg-amber-500/20 border border-amber-500/30 rounded-lg p-3 text-center"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <p className="text-amber-300 text-sm">{time}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 건강 음식 & 파워스톤 */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-bold text-green-400 mb-4">🥗 건강 음식</h3>
          <div className="space-y-2">
            {luckyItems.foods.map((food, index) => (
              <motion.div
                key={food}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-green-400">✓</span>
                <span className="text-slate-300">{food}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-bold text-blue-400 mb-4">💎 파워스톤</h3>
          <div className="space-y-2">
            {luckyItems.stones.map((stone, index) => (
              <motion.div
                key={stone}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-slate-300">{stone}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 건강 활동 */}
      <div className="glass rounded-2xl p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30">
        <h3 className="text-xl font-bold text-green-400 mb-6">🌿 추천 건강 활동</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {luckyItems.activities.map((activity, index) => (
            <motion.div
              key={activity}
              className="flex items-center gap-3 glass rounded-lg p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-green-400" />
              </div>
              <span className="text-slate-300">{activity}</span>
            </motion.div>
          ))}
        </div>

        <p className="text-slate-300 text-sm mt-6 leading-relaxed">
          💡 <strong className="text-green-400">Tip:</strong> 이러한 행운 아이템들을 일상에서
          자주 접하면 심리적 안정감과 함께 건강 기운이 상승합니다. 믿음이 건강을 만듭니다!
        </p>
      </div>
    </motion.div>
  );
}
