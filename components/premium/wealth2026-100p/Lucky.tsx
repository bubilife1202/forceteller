'use client';

import { motion } from 'framer-motion';
import { Sparkles, MapPin, Palette, Clock, Diamond, Gem, Star } from 'lucide-react';
import { WEALTH_2026_BY_STEM, YEAR_RELATION } from './data';

interface LuckyProps {
  dayStem: string;
}

// 일간별 행운 아이템
const LUCKY_ITEMS: Record<string, { colors: string[]; directions: string[]; hours: string[]; items: string[] }> = {
  '갑': {
    colors: ['초록', '파랑', '검정'],
    directions: ['동쪽', '북쪽'],
    hours: ['03-05시', '07-09시', '21-23시'],
    items: ['나무 소품', '식물', '파란 지갑', '수정']
  },
  '을': {
    colors: ['연두', '하늘색', '검정'],
    directions: ['동쪽', '북쪽'],
    hours: ['03-05시', '09-11시', '21-23시'],
    items: ['꽃 장식', '녹색 지갑', '수정', '은 액세서리']
  },
  '병': {
    colors: ['빨강', '자주', '노랑'],
    directions: ['남쪽', '중앙'],
    hours: ['09-11시', '11-13시'],
    items: ['붉은 소품', '황금 장식', '태양 모양', '말 인형']
  },
  '정': {
    colors: ['분홍', '보라', '노랑'],
    directions: ['남쪽', '중앙'],
    hours: ['09-11시', '11-13시', '13-15시'],
    items: ['촛불', '보라색 소품', '별 모양', '크리스탈']
  },
  '무': {
    colors: ['노랑', '황금', '갈색'],
    directions: ['중앙', '남서쪽'],
    hours: ['07-09시', '13-15시', '19-21시'],
    items: ['황금 소품', '도자기', '돌 장식', '황토 제품']
  },
  '기': {
    colors: ['베이지', '황토색', '갈색'],
    directions: ['중앙', '남서쪽', '북동쪽'],
    hours: ['07-09시', '13-15시', '19-21시'],
    items: ['도자기', '흙 화분', '갈색 지갑', '나무 장식']
  },
  '경': {
    colors: ['흰색', '금색', '은색'],
    directions: ['서쪽', '북서쪽'],
    hours: ['15-17시', '17-19시'],
    items: ['금 장식', '시계', '금속 소품', '백색 지갑']
  },
  '신': {
    colors: ['은색', '흰색', '하늘색'],
    directions: ['서쪽', '북서쪽'],
    hours: ['15-17시', '17-19시'],
    items: ['은 액세서리', '보석', '칼 모양', '금속 펜']
  },
  '임': {
    colors: ['검정', '남색', '파랑'],
    directions: ['북쪽'],
    hours: ['21-23시', '23-01시'],
    items: ['검정 지갑', '물결 모양', '수정', '거북이 장식']
  },
  '계': {
    colors: ['검정', '회색', '파랑'],
    directions: ['북쪽'],
    hours: ['21-23시', '23-01시', '01-03시'],
    items: ['물방울 모양', '진주', '달 모양', '은색 지갑']
  }
};

export default function Lucky({ dayStem }: LuckyProps) {
  const yearData = WEALTH_2026_BY_STEM[dayStem] || WEALTH_2026_BY_STEM['갑'];
  const luckyData = LUCKY_ITEMS[dayStem] || LUCKY_ITEMS['갑'];
  const relation = YEAR_RELATION[dayStem] || YEAR_RELATION['갑'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* 챕터 헤더 */}
      <div className="flex items-center gap-4 pb-4 border-b border-slate-700">
        <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium">
          Chapter 6
        </span>
        <h2 className="text-2xl font-bold text-white">행운 아이템 & 풍수</h2>
      </div>

      {/* 병오년 특별 행운 */}
      <div className="p-6 bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-2xl border border-red-800/30">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-6 h-6 text-red-400" />
          <h3 className="text-xl font-bold text-white">2026 병오년 특별 행운</h3>
        </div>
        <p className="text-slate-300 mb-4">
          병오년(붉은 말의 해)에 {dayStem}일간은 <span className="text-amber-400 font-bold">{relation.relation}</span>이 작용합니다.
        </p>
        <p className="text-slate-300">{relation.desc}</p>
      </div>

      {/* 행운의 색상 */}
      <div className="p-6 bg-gradient-to-br from-pink-900/30 to-purple-900/30 rounded-2xl border border-pink-800/30">
        <div className="flex items-center gap-3 mb-6">
          <Palette className="w-6 h-6 text-pink-400" />
          <h3 className="text-xl font-bold text-white">2026년 행운의 색상</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {luckyData.colors.map((color, idx) => (
            <div key={idx} className="text-center p-4 bg-slate-800/50 rounded-xl">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full border-2 border-slate-600 flex items-center justify-center">
                <Diamond className="w-6 h-6 text-yellow-400" />
              </div>
              <span className="text-slate-200 font-medium">{color}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 행운의 방향 */}
      <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <MapPin className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-bold text-white">행운의 방향</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {luckyData.directions.map((dir, idx) => (
            <div key={idx} className="flex items-center gap-3 p-4 bg-blue-900/20 rounded-xl">
              <span className="w-8 h-8 bg-blue-500/30 text-blue-300 rounded-lg flex items-center justify-center text-sm">
                {idx + 1}
              </span>
              <span className="text-slate-200">{dir}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate-400">
          중요한 미팅이나 계약 시 이 방향에 앉거나, 이 방향으로 이동하세요.
        </p>
      </div>

      {/* 행운의 시간 */}
      <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-6 h-6 text-amber-400" />
          <h3 className="text-xl font-bold text-white">행운의 시간대</h3>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {luckyData.hours.map((hour, idx) => (
            <div key={idx} className="text-center p-3 bg-amber-900/20 rounded-xl">
              <span className="text-amber-300 font-bold">{hour}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate-400">
          중요한 결정이나 계약은 이 시간대에 진행하면 좋습니다.
        </p>
      </div>

      {/* 행운의 아이템 */}
      <div className="p-6 bg-gradient-to-br from-yellow-900/30 to-amber-900/30 rounded-2xl border border-yellow-800/30">
        <div className="flex items-center gap-3 mb-6">
          <Gem className="w-6 h-6 text-yellow-400" />
          <h3 className="text-xl font-bold text-white">2026년 필수 행운 아이템</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {luckyData.items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 p-4 bg-yellow-800/20 rounded-xl">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-slate-200 font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 풍수 팁 */}
      <div className="p-6 bg-emerald-900/20 rounded-2xl border border-emerald-800/30">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-6 h-6 text-emerald-400" />
          <h3 className="text-xl font-bold text-emerald-300">재물 풍수 팁</h3>
        </div>
        <div className="space-y-3">
          <div className="p-4 bg-emerald-800/20 rounded-xl">
            <p className="text-slate-300">💰 지갑은 {luckyData.colors[0]} 계열로 바꾸세요</p>
          </div>
          <div className="p-4 bg-emerald-800/20 rounded-xl">
            <p className="text-slate-300">🏠 집의 {luckyData.directions[0]}에 금전수나 황금색 소품을 두세요</p>
          </div>
          <div className="p-4 bg-emerald-800/20 rounded-xl">
            <p className="text-slate-300">📱 휴대폰 배경화면을 {luckyData.colors[0]} 계열로 설정하세요</p>
          </div>
          <div className="p-4 bg-emerald-800/20 rounded-xl">
            <p className="text-slate-300">🎁 {luckyData.items[0]}을(를) 책상이나 지갑에 가지고 다니세요</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
