'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Compass, MapPin, Building2, Coffee, Users } from 'lucide-react';

interface MarriageLocationProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function MarriageLocation({ result, name }: MarriageLocationProps) {
  const dayElement = result.day.stem.element;

  // 오행별 인연의 방향
  const getDirectionInfo = () => {
    const directions: Record<string, { direction: string; degree: string; emoji: string }> = {
      목: { direction: '동쪽', degree: '90°', emoji: '🌅' },
      화: { direction: '남쪽', degree: '180°', emoji: '☀️' },
      토: { direction: '중앙/남서', degree: '225°', emoji: '🏔️' },
      금: { direction: '서쪽', degree: '270°', emoji: '🌆' },
      수: { direction: '북쪽', degree: '0°', emoji: '⭐' }
    };
    return directions[dayElement] || directions['목'];
  };

  // 오행별 만날 장소
  const getMeetingPlaces = () => {
    const places: Record<string, string[]> = {
      목: [
        '도서관, 서점',
        '공원, 숲길',
        '카페, 북카페',
        '문화센터, 강의실',
        '독서모임, 스터디',
        '전시회, 미술관'
      ],
      화: [
        '공연장, 콘서트',
        '클럽, 파티',
        '스포츠센터',
        '축제, 이벤트',
        '맛집 탐방',
        '여행지, 리조트'
      ],
      토: [
        '부동산 관련 모임',
        '등산, 산책로',
        '요가, 명상센터',
        '전통시장',
        '가족 모임',
        '성당, 사찰'
      ],
      금: [
        '세미나, 컨퍼런스',
        '고급 레스토랑',
        '호텔 라운지',
        '골프장',
        '음악회, 오페라',
        '백화점, 명품관'
      ],
      수: [
        '바다, 강가',
        '수영장, 스파',
        '술집, 바',
        '영화관',
        '심리상담소',
        '힐링 명소'
      ]
    };
    return places[dayElement] || places['목'];
  };

  // 만남의 경로
  const getMeetingPath = () => {
    const paths: Record<string, { method: string; probability: number; icon: React.ComponentType<{ className?: string }> }[]> = {
      목: [
        { method: '학교/학원 동문', probability: 85, icon: Building2 },
        { method: '독서모임/스터디', probability: 75, icon: Coffee },
        { method: '온라인 커뮤니티', probability: 70, icon: Users },
        { method: '직장 동료/선후배', probability: 65, icon: Building2 }
      ],
      화: [
        { method: '소개팅/미팅', probability: 90, icon: Users },
        { method: '모임/파티', probability: 85, icon: Users },
        { method: '여행/액티비티', probability: 75, icon: MapPin },
        { method: '동호회 활동', probability: 70, icon: Coffee }
      ],
      토: [
        { method: '가족/친척 소개', probability: 85, icon: Users },
        { method: '결혼정보회사', probability: 80, icon: Building2 },
        { method: '교회/성당', probability: 75, icon: MapPin },
        { method: '이웃/동네', probability: 65, icon: MapPin }
      ],
      금: [
        { method: '직장/업무 관계', probability: 85, icon: Building2 },
        { method: '전문가 모임', probability: 80, icon: Users },
        { method: '골프/고급 취미', probability: 70, icon: Coffee },
        { method: '고급 매칭 서비스', probability: 75, icon: Building2 }
      ],
      수: [
        { method: '온라인/앱 만남', probability: 90, icon: Users },
        { method: '친구 소개', probability: 80, icon: Users },
        { method: '술자리/모임', probability: 75, icon: Coffee },
        { method: '예술/문화 활동', probability: 70, icon: MapPin }
      ]
    };
    return paths[dayElement] || paths['목'];
  };

  const directionInfo = getDirectionInfo();
  const meetingPlaces = getMeetingPlaces();
  const meetingPath = getMeetingPath();

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
        🧭 인연이 오는 방향과 장소
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님의 배우자를 만날 확률이 높은 곳
      </p>

      {/* 인연의 방향 */}
      <div className="glass rounded-2xl p-6 mb-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30">
        <div className="flex items-center gap-3 mb-4">
          <Compass className="w-6 h-6 text-cyan-400" />
          <h3 className="text-xl font-bold text-white">인연의 방향</h3>
        </div>
        <div className="flex items-center justify-center gap-6 mb-4">
          <span className="text-6xl">{directionInfo.emoji}</span>
          <div>
            <p className="text-4xl font-bold text-cyan-300">{directionInfo.direction}</p>
            <p className="text-slate-400 mt-1">방위각 {directionInfo.degree}</p>
          </div>
        </div>
        <p className="text-slate-300 text-center">
          현재 거주지에서 {directionInfo.direction} 방향으로 이동하거나,
          {directionInfo.direction}에서 온 사람과 인연이 깊습니다
        </p>
      </div>

      {/* 만날 확률 높은 장소 */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-6 h-6 text-rose-400" />
          <h3 className="text-xl font-bold text-white">인연의 장소</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {meetingPlaces.map((place, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 p-4 bg-rose-500/10 rounded-xl border border-rose-500/20"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-rose-400 font-bold">{index + 1}</span>
              </div>
              <span className="text-white">{place}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 만남의 경로 */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-bold text-white">만남의 경로</h3>
        </div>
        <p className="text-slate-400 text-sm mb-4">확률이 높은 순서대로 나열</p>
        <div className="space-y-3">
          {meetingPath.map((path, index) => (
            <motion.div
              key={index}
              className="glass rounded-xl p-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <path.icon className="w-5 h-5 text-purple-400" />
                  <span className="text-white font-medium">{path.method}</span>
                </div>
                <span className="text-purple-400 font-bold">{path.probability}%</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${path.probability}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
