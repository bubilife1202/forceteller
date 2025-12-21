'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Palette, Compass, Hash, Utensils, Gem, MapPin } from 'lucide-react';

interface Wealth2026LuckyProps {
  result: SajuResult;
  name: string;
}

export default function Wealth2026Lucky({ result, name }: Wealth2026LuckyProps) {
  const dayElement = result.day.stem.element;

  // 행운의 색상
  const getLuckyColors = () => {
    const colors: Record<string, { main: string; sub: string; avoid: string; mainHex: string; subHex: string }> = {
      목: {
        main: '파란색',
        sub: '검정색',
        avoid: '흰색',
        mainHex: '#3B82F6',
        subHex: '#1F2937',
      },
      화: {
        main: '초록색',
        sub: '파란색',
        avoid: '빨간색',
        mainHex: '#22C55E',
        subHex: '#3B82F6',
      },
      토: {
        main: '빨간색',
        sub: '보라색',
        avoid: '초록색',
        mainHex: '#EF4444',
        subHex: '#A855F7',
      },
      금: {
        main: '노란색',
        sub: '갈색',
        avoid: '빨간색',
        mainHex: '#EAB308',
        subHex: '#92400E',
      },
      수: {
        main: '흰색',
        sub: '은색',
        avoid: '노란색',
        mainHex: '#F8FAFC',
        subHex: '#CBD5E1',
      },
    };
    return colors[dayElement] || colors['토'];
  };

  // 행운의 방향
  const getLuckyDirection = () => {
    const directions: Record<string, { main: string; sub: string; avoid: string; desc: string }> = {
      목: { main: '북쪽', sub: '동쪽', avoid: '서쪽', desc: '수(水)가 목을 생하는 북쪽이 유리합니다.' },
      화: { main: '동쪽', sub: '남쪽', avoid: '북쪽', desc: '목(木)이 화를 생하는 동쪽이 유리합니다.' },
      토: { main: '남쪽', sub: '중앙', avoid: '동쪽', desc: '화(火)가 토를 생하는 남쪽이 유리합니다.' },
      금: { main: '중앙', sub: '서쪽', avoid: '남쪽', desc: '토(土)가 금을 생하는 중앙이 유리합니다.' },
      수: { main: '서쪽', sub: '북쪽', avoid: '중앙', desc: '금(金)이 수를 생하는 서쪽이 유리합니다.' },
    };
    return directions[dayElement] || directions['토'];
  };

  // 행운의 숫자
  const getLuckyNumbers = () => {
    const numbers: Record<string, { main: number[]; desc: string }> = {
      목: { main: [3, 8, 13, 38, 83], desc: '3과 8은 목의 숫자입니다.' },
      화: { main: [2, 7, 12, 27, 72], desc: '2와 7은 화의 숫자입니다.' },
      토: { main: [5, 10, 15, 50, 55], desc: '5와 10은 토의 숫자입니다.' },
      금: { main: [4, 9, 14, 49, 94], desc: '4와 9는 금의 숫자입니다.' },
      수: { main: [1, 6, 11, 16, 61], desc: '1과 6은 수의 숫자입니다.' },
    };
    return numbers[dayElement] || numbers['토'];
  };

  // 행운의 음식
  const getLuckyFoods = () => {
    const foods: Record<string, { items: string[]; desc: string }> = {
      목: { items: ['해산물', '검은콩', '미역', '김', '흑미'], desc: '수(水) 기운의 검은색 음식이 좋습니다.' },
      화: { items: ['샐러드', '청과일', '녹차', '시금치', '브로콜리'], desc: '목(木) 기운의 초록색 음식이 좋습니다.' },
      토: { items: ['고추', '토마토', '사과', '홍삼', '대추'], desc: '화(火) 기운의 빨간색 음식이 좋습니다.' },
      금: { items: ['감자', '현미', '호박', '옥수수', '치즈'], desc: '토(土) 기운의 노란색 음식이 좋습니다.' },
      수: { items: ['우유', '두부', '콩나물', '양배추', '배'], desc: '금(金) 기운의 흰색 음식이 좋습니다.' },
    };
    return foods[dayElement] || foods['토'];
  };

  // 행운의 아이템
  const getLuckyItems = () => {
    const items: Record<string, { items: string[]; material: string }> = {
      목: { items: ['수정', '자수정', '유리 소품', '물병'], material: '유리/크리스탈' },
      화: { items: ['나무 악세서리', '식물', '녹색 지갑', '에메랄드'], material: '나무/녹색 보석' },
      토: { items: ['루비', '가넷', '빨간 지갑', '양초'], material: '붉은 보석' },
      금: { items: ['황금 악세서리', '토파즈', '도자기', '황토'], material: '황금/노란 보석' },
      수: { items: ['은 악세서리', '진주', '다이아몬드', '백금'], material: '은/흰색 보석' },
    };
    return items[dayElement] || items['토'];
  };

  const colors = getLuckyColors();
  const direction = getLuckyDirection();
  const numbers = getLuckyNumbers();
  const foods = getLuckyFoods();
  const items = getLuckyItems();

  const luckyCategories = [
    {
      icon: Palette,
      title: '행운의 색상',
      main: colors.main,
      sub: colors.sub,
      avoid: colors.avoid,
      gradient: `linear-gradient(135deg, ${colors.mainHex}, ${colors.subHex})`,
      desc: `${colors.main}과 ${colors.sub}을 자주 활용하세요.`,
    },
    {
      icon: Compass,
      title: '행운의 방향',
      main: direction.main,
      sub: direction.sub,
      avoid: direction.avoid,
      desc: direction.desc,
    },
    {
      icon: Hash,
      title: '행운의 숫자',
      main: numbers.main.slice(0, 3).join(', '),
      sub: numbers.main.slice(3).join(', '),
      desc: numbers.desc,
    },
    {
      icon: Utensils,
      title: '행운의 음식',
      main: foods.items.slice(0, 3).join(', '),
      sub: foods.items.slice(3).join(', '),
      desc: foods.desc,
    },
    {
      icon: Gem,
      title: '행운의 아이템',
      main: items.items.slice(0, 2).join(', '),
      sub: items.items.slice(2).join(', '),
      desc: `${items.material} 소재가 좋습니다.`,
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
        className="text-3xl font-bold text-center mb-4 gradient-text"
        style={{ fontFamily: "'Noto Serif KR', serif" }}
      >
        🍀 재물 행운 아이템
      </h2>
      <p className="text-center text-slate-400 mb-8">
        2026년 {name}님의 재물운을 높여주는 행운 요소
      </p>

      {/* 메인 색상 프리뷰 */}
      <motion.div
        className="glass rounded-2xl p-6 mb-8 text-center"
        initial={{ scale: 0.9 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
      >
        <h3 className="text-lg font-bold text-white mb-4">올해의 행운 컬러</h3>
        <div className="flex justify-center gap-4 mb-4">
          <div className="text-center">
            <div
              className="w-20 h-20 rounded-2xl shadow-lg mx-auto mb-2"
              style={{ backgroundColor: colors.mainHex }}
            />
            <p className="text-sm text-slate-300">{colors.main}</p>
            <p className="text-xs text-amber-400">메인</p>
          </div>
          <div className="text-center">
            <div
              className="w-20 h-20 rounded-2xl shadow-lg mx-auto mb-2"
              style={{ backgroundColor: colors.subHex }}
            />
            <p className="text-sm text-slate-300">{colors.sub}</p>
            <p className="text-xs text-cyan-400">서브</p>
          </div>
        </div>
        <p className="text-slate-400 text-sm">지갑, 핸드폰 케이스, 인테리어에 활용해보세요!</p>
      </motion.div>

      {/* 행운 카테고리 그리드 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {luckyCategories.map((cat, index) => (
          <motion.div
            key={cat.title}
            className="glass rounded-xl p-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center">
                <cat.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-white">{cat.title}</h4>
            </div>

            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded">추천</span>
                <span className="text-slate-300">{cat.main}</span>
              </div>
              {cat.sub && (
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 bg-cyan-500/20 text-cyan-400 rounded">좋음</span>
                  <span className="text-slate-300">{cat.sub}</span>
                </div>
              )}
              {cat.avoid && (
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 bg-red-500/20 text-red-400 rounded">피할것</span>
                  <span className="text-slate-400">{cat.avoid}</span>
                </div>
              )}
            </div>

            <p className="text-slate-500 text-xs">{cat.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* 재물운 부적 같은 특별 아이템 */}
      <div className="mt-8 glass rounded-2xl p-6 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/30">
        <h3 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
          <MapPin className="w-6 h-6" />
          2026년 재물운 특별 조언
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-white mb-2">💰 지갑 관리법</h4>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• 지갑 색상: {colors.main} 또는 {colors.sub}</li>
              <li>• 지폐는 깔끔하게 정리</li>
              <li>• 영수증은 즉시 정리</li>
              <li>• 황금색 참 장식 추가</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">🏠 재물 인테리어</h4>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• 현관에 금색/황금색 소품</li>
              <li>• {direction.main}에 금전수 배치</li>
              <li>• 거울은 현관 옆으로</li>
              <li>• 깨진 물건은 즉시 교체</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
