'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Palette, Sparkles, Eye, Home } from 'lucide-react';

interface MovingColorProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

interface ColorInfo {
  name: string;
  hex: string;
  desc: string;
}

interface ElementColors {
  primary: ColorInfo[];
  secondary: ColorInfo[];
  avoid: ColorInfo[];
  rooms?: Record<string, ColorInfo[]>;
  mainColor: string;
  emoji: string;
}

export default function MovingColor({ result, name }: MovingColorProps) {
  const dayElement = result.day.stem.element;

  // 오행별 행운의 색상
  const getLuckyColors = () => {
    const colorsByElement: Record<string, ElementColors> = {
      '목': {
        primary: [
          { name: '초록', hex: '#10b981', desc: '성장과 안정의 색' },
          { name: '청록', hex: '#06b6d4', desc: '활력과 생명력' },
          { name: '연두', hex: '#84cc16', desc: '희망과 번영' },
        ],
        secondary: [
          { name: '하늘색', hex: '#38bdf8', desc: '수생목 - 도움받는 색' },
          { name: '네이비', hex: '#1e40af', desc: '깊이와 지혜' },
        ],
        avoid: [
          { name: '흰색', hex: '#ffffff', desc: '금극목 - 피할 색' },
          { name: '은색', hex: '#d1d5db', desc: '금속 계열' },
        ],
        mainColor: '초록 계열',
        emoji: '🌳',
      },
      '화': {
        primary: [
          { name: '빨강', hex: '#ef4444', desc: '열정과 에너지' },
          { name: '주황', hex: '#f97316', desc: '활기와 창의성' },
          { name: '핑크', hex: '#ec4899', desc: '따뜻함과 사랑' },
        ],
        secondary: [
          { name: '연두', hex: '#84cc16', desc: '목생화 - 도움받는 색' },
          { name: '초록', hex: '#10b981', desc: '목 기운' },
        ],
        avoid: [
          { name: '검정', hex: '#000000', desc: '수극화 - 피할 색' },
          { name: '진한 파랑', hex: '#1e3a8a', desc: '물 계열' },
        ],
        mainColor: '빨강/주황 계열',
        emoji: '🔥',
      },
      '토': {
        primary: [
          { name: '베이지', hex: '#d4a574', desc: '안정과 신뢰' },
          { name: '황토', hex: '#b8860b', desc: '대지의 기운' },
          { name: '갈색', hex: '#92400e', desc: '든든함' },
        ],
        secondary: [
          { name: '빨강', hex: '#dc2626', desc: '화생토 - 도움받는 색' },
          { name: '와인', hex: '#9f1239', desc: '화 기운' },
        ],
        avoid: [
          { name: '초록', hex: '#10b981', desc: '목극토 - 피할 색' },
          { name: '청록', hex: '#14b8a6', desc: '목 계열' },
        ],
        mainColor: '베이지/갈색 계열',
        emoji: '🏔️',
      },
      '금': {
        primary: [
          { name: '흰색', hex: '#ffffff', desc: '순수와 완성' },
          { name: '은색', hex: '#d1d5db', desc: '세련됨' },
          { name: '금색', hex: '#fbbf24', desc: '귀함과 가치' },
        ],
        secondary: [
          { name: '베이지', hex: '#d4a574', desc: '토생금 - 도움받는 색' },
          { name: '황토', hex: '#b8860b', desc: '토 기운' },
        ],
        avoid: [
          { name: '빨강', hex: '#dc2626', desc: '화극금 - 피할 색' },
          { name: '주황', hex: '#ea580c', desc: '화 계열' },
        ],
        mainColor: '흰색/금은색 계열',
        emoji: '⚪',
      },
      '수': {
        primary: [
          { name: '검정', hex: '#000000', desc: '깊이와 지혜' },
          { name: '남색', hex: '#1e3a8a', desc: '안정과 신뢰' },
          { name: '파랑', hex: '#3b82f6', desc: '유동성과 소통' },
        ],
        secondary: [
          { name: '흰색', hex: '#f3f4f6', desc: '금생수 - 도움받는 색' },
          { name: '은색', hex: '#d1d5db', desc: '금 기운' },
        ],
        avoid: [
          { name: '황토', hex: '#b8860b', desc: '토극수 - 피할 색' },
          { name: '갈색', hex: '#92400e', desc: '토 계열' },
        ],
        mainColor: '파랑/검정 계열',
        emoji: '💧',
      },
    };

    return colorsByElement[dayElement];
  };

  const luckyColors = getLuckyColors();

  // 공간별 색상 배치
  const getRoomColorGuide = () => {
    return [
      {
        room: '거실',
        purpose: '가족 화합, 손님 맞이',
        colors: '주색 30% + 보조색 60% + 포인트 10%',
        tips: [
          `벽: ${luckyColors.primary[0].name} 계열로 밝게`,
          `소파/커튼: 보조색으로 안정감`,
          `쿠션/소품: 포인트 컬러`,
          '너무 화려하지 않게 조화',
        ],
        icon: '🛋️',
      },
      {
        room: '침실',
        purpose: '휴식과 안정',
        colors: '차분한 톤 위주',
        tips: [
          '벽: 연한 베이지나 아이보리',
          `침구: ${luckyColors.primary[0].name} 계열 파스텔톤`,
          '조명: 따뜻한 색온도',
          '어두운 색은 소량만',
        ],
        icon: '🛏️',
      },
      {
        room: '주방',
        purpose: '재물과 건강',
        colors: '깨끗하고 밝은 톤',
        tips: [
          '벽: 흰색이나 연한 색',
          `액센트: ${luckyColors.primary[1]?.name || luckyColors.primary[0].name} 포인트`,
          '수납장: 목재 원색이나 화이트',
          '청결감이 최우선',
        ],
        icon: '🍳',
      },
      {
        room: '서재/공부방',
        purpose: '집중과 학습',
        colors: '차분하고 집중력 높이는 색',
        tips: [
          dayElement === '목' || dayElement === '수' ? '벽: 파스텔 블루/그린' : '벽: 아이보리/베이지',
          '책상: 원목이나 화이트',
          '의자: 편안한 중간톤',
          '형광색 피하기',
        ],
        icon: '📚',
      },
    ];
  };

  const roomColorGuide = getRoomColorGuide();

  // 색상 심리 효과
  const getColorPsychology = () => {
    return [
      {
        color: '빨강/주황',
        effect: '활력, 열정, 식욕 증진',
        suitable: '거실 포인트, 주방 액센트',
        caution: '침실 과다 사용 금지 (불면증)',
      },
      {
        color: '노랑/베이지',
        effect: '따뜻함, 안정, 집중력',
        suitable: '거실, 서재, 주방',
        caution: '지나치면 불안감',
      },
      {
        color: '초록',
        effect: '안정, 평화, 힐링',
        suitable: '모든 공간 무난',
        caution: '어두운 초록은 무거움',
      },
      {
        color: '파랑',
        effect: '차분함, 신뢰, 집중',
        suitable: '침실, 서재, 화장실',
        caution: '과다하면 우울감',
      },
      {
        color: '흰색/은색',
        effect: '깨끗함, 넓어보임, 세련됨',
        suitable: '모든 공간 베이스',
        caution: '차가워 보일 수 있음',
      },
      {
        color: '검정/회색',
        effect: '고급스러움, 안정감',
        suitable: '포인트, 가구',
        caution: '과다 사용 시 답답함',
      },
    ];
  };

  const colorPsychology = getColorPsychology();

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
        🎨 행운의 인테리어 색상
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님의 오행에 맞는 컬러 가이드
      </p>

      {/* 행운의 주요 색상 */}
      <div className="glass rounded-2xl p-8 mb-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30">
        <div className="text-center mb-6">
          <span className="text-6xl mb-3 block">{luckyColors.emoji}</span>
          <h3 className="text-2xl font-bold text-purple-400 mb-2">{luckyColors.mainColor}</h3>
          <p className="text-slate-300">{dayElement}({result.day.stem.ko}) 일간의 대표 행운색</p>
        </div>

        <div className="mb-6">
          <h4 className="font-bold text-emerald-400 mb-4 flex items-center gap-2 justify-center">
            <Sparkles className="w-5 h-5" />
            주요 행운색 (적극 활용)
          </h4>
          <div className="flex flex-wrap gap-3 justify-center">
            {luckyColors.primary.map((color: ColorInfo, index: number) => (
              <motion.div
                key={color.name}
                className="glass-strong rounded-xl p-4 text-center min-w-[120px]"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className="w-20 h-20 rounded-xl mx-auto mb-3 border-2 border-white/30"
                  style={{ backgroundColor: color.hex }}
                />
                <p className="font-bold text-white mb-1">{color.name}</p>
                <p className="text-xs text-slate-400">{color.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold text-blue-400 mb-3">보조 행운색 (함께 사용)</h4>
            <div className="space-y-2">
              {luckyColors.secondary.map((color: ColorInfo, idx: number) => (
                <div key={idx} className="flex items-center gap-3 p-2 bg-slate-800/50 rounded-lg">
                  <div
                    className="w-8 h-8 rounded-lg border border-white/30"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div>
                    <p className="text-sm font-bold text-white">{color.name}</p>
                    <p className="text-xs text-slate-400">{color.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-red-400 mb-3">피해야 할 색 (최소화)</h4>
            <div className="space-y-2">
              {luckyColors.avoid.map((color: ColorInfo, idx: number) => (
                <div key={idx} className="flex items-center gap-3 p-2 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <div
                    className="w-8 h-8 rounded-lg border border-red-500/50"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div>
                    <p className="text-sm font-bold text-white">{color.name}</p>
                    <p className="text-xs text-red-400">{color.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 공간별 색상 가이드 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
          <Home className="w-6 h-6" />
          공간별 색상 배치 가이드
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {roomColorGuide.map((room, index) => (
            <motion.div
              key={room.room}
              className="glass-strong rounded-xl p-5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{room.icon}</span>
                <div>
                  <h4 className="font-bold text-white">{room.room}</h4>
                  <p className="text-xs text-slate-400">{room.purpose}</p>
                </div>
              </div>
              <p className="text-sm text-amber-400 mb-3">{room.colors}</p>
              <ul className="space-y-1">
                {room.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-emerald-400 text-xs mt-0.5">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl">
          <p className="text-slate-300 text-sm leading-relaxed">
            💡 <span className="font-bold">색상 배치 원칙:</span> 70% 베이스 색상, 25% 보조색, 5% 포인트 컬러로 조화롭게 구성하세요.
            행운색은 포인트나 보조색으로 활용하면 효과적입니다.
          </p>
        </div>
      </div>

      {/* 색상 심리 효과 */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold text-amber-400 mb-6 flex items-center gap-2">
          <Eye className="w-6 h-6" />
          색상별 심리 효과
        </h3>
        <div className="space-y-3">
          {colorPsychology.map((item, index) => (
            <motion.div
              key={item.color}
              className="p-4 bg-slate-800/50 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div>
                  <h4 className="font-bold text-white mb-1">{item.color}</h4>
                  <p className="text-sm text-slate-400">{item.effect}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-green-400">✓ {item.suitable}</p>
                </div>
                <div>
                  <p className="text-sm text-orange-400">⚠️ {item.caution}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl">
          <p className="text-slate-300 text-sm leading-relaxed">
            💡 <span className="font-bold">컬러 테스트:</span> 페인트 칠하기 전에 작은 샘플로 테스트하세요.
            조명에 따라 색이 달라 보이므로 낮과 밤 모두 확인하는 것이 중요합니다.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
