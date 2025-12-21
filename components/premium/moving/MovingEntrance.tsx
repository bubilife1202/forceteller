'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { DoorOpen, Compass, Eye, Sparkles } from 'lucide-react';

interface MovingEntranceProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function MovingEntrance({ result, name }: MovingEntranceProps) {
  const dayElement = result.day.stem.element;

  // 현관 방향별 운세
  const getEntranceDirections = () => {
    return [
      {
        direction: '남향',
        element: '화',
        emoji: '☀️',
        color: 'from-red-500 to-orange-600',
        textColor: 'text-red-400',
        getScore: () => {
          let score = 70; // 기본적으로 선호도 높음
          if (dayElement === '화') score += 15;
          if (dayElement === '토') score += 20; // 화생토
          if (dayElement === '목') score += 10; // 목생화
          if (dayElement === '수') score -= 10; // 수극화
          return Math.min(Math.max(score, 40), 100);
        },
        pros: ['햇볕 최고', '겨울 따뜻', '명예운 상승', '밝은 기운'],
        cons: ['여름 더움', '가구 변색'],
        fortune: '명예와 발전운이 높아집니다. 사회적 성공 가능성이 큽니다.',
      },
      {
        direction: '남동향',
        element: '목',
        emoji: '🌅',
        color: 'from-emerald-500 to-green-600',
        textColor: 'text-emerald-400',
        getScore: () => {
          let score = 85; // 최고 인기
          if (dayElement === '목') score += 10;
          if (dayElement === '화') score += 10; // 목생화
          if (dayElement === '수') score += 5; // 수생목
          return Math.min(Math.max(score, 50), 100);
        },
        pros: ['아침 햇살', '재물운 좋음', '환기 양호', '최고 인기'],
        cons: ['오후엔 그늘', '가격 비쌈'],
        fortune: '재물운이 왕성합니다. 돈이 잘 들어오고 인연도 좋아집니다.',
      },
      {
        direction: '동향',
        element: '목',
        emoji: '🌄',
        color: 'from-green-500 to-teal-600',
        textColor: 'text-green-400',
        getScore: () => {
          let score = 75;
          if (dayElement === '목') score += 15;
          if (dayElement === '화') score += 10;
          if (dayElement === '수') score += 10;
          if (dayElement === '금') score -= 10;
          return Math.min(Math.max(score, 45), 100);
        },
        pros: ['아침 햇살', '건강운', '성장 발전', '상쾌한 기운'],
        cons: ['오후 그늘', '겨울 추움'],
        fortune: '건강과 성장운이 좋습니다. 자녀의 학업 성취에 유리합니다.',
      },
      {
        direction: '남서향',
        element: '토',
        emoji: '🌇',
        color: 'from-amber-500 to-yellow-600',
        textColor: 'text-amber-400',
        getScore: () => {
          let score = 65;
          if (dayElement === '토') score += 20;
          if (dayElement === '금') score += 15; // 토생금
          if (dayElement === '화') score += 10; // 화생토
          if (dayElement === '목') score -= 10; // 목극토
          return Math.min(Math.max(score, 40), 100);
        },
        pros: ['오후 햇살', '안정감', '주부 건강', '가정 화목'],
        cons: ['서향과 유사', '오전 어두움'],
        fortune: '가정의 안정과 평화. 주부의 건강과 행복이 높아집니다.',
      },
      {
        direction: '서향',
        element: '금',
        emoji: '🌆',
        color: 'from-slate-400 to-gray-500',
        textColor: 'text-slate-300',
        getScore: () => {
          let score = 55;
          if (dayElement === '금') score += 20;
          if (dayElement === '수') score += 15; // 금생수
          if (dayElement === '토') score += 10; // 토생금
          if (dayElement === '화') score -= 15; // 화극금
          return Math.min(Math.max(score, 35), 100);
        },
        pros: ['저녁 노을', '재물 저축', '오후 밝음', '가성비'],
        cons: ['여름 서향열', '오전 어두움', '가구 변색'],
        fortune: '재물 축적운. 저축과 안정적 수입이 늘어납니다.',
      },
      {
        direction: '북서향',
        element: '금',
        emoji: '🌃',
        color: 'from-gray-500 to-slate-600',
        textColor: 'text-gray-400',
        getScore: () => {
          let score = 60;
          if (dayElement === '금') score += 15;
          if (dayElement === '수') score += 10;
          if (dayElement === '토') score += 10;
          return Math.min(Math.max(score, 40), 100);
        },
        pros: ['가장 권위', '사업운', '안정적', '늦은 해'],
        cons: ['햇볕 부족', '약간 어두움'],
        fortune: '가장의 권위와 사업운 상승. 남성 가장에게 특히 좋습니다.',
      },
      {
        direction: '북향',
        element: '수',
        emoji: '🌌',
        color: 'from-blue-500 to-cyan-600',
        textColor: 'text-blue-400',
        getScore: () => {
          let score = 50;
          if (dayElement === '수') score += 20;
          if (dayElement === '목') score += 15; // 수생목
          if (dayElement === '금') score += 10; // 금생수
          if (dayElement === '토') score -= 10; // 토극수
          return Math.min(Math.max(score, 35), 100);
        },
        pros: ['조용함', '학업운', '여름 시원', '저렴한 가격'],
        cons: ['햇볕 부족', '겨울 추움', '습기'],
        fortune: '학문과 지혜의 운. 학생이나 연구직에 좋습니다.',
      },
      {
        direction: '북동향',
        element: '토',
        emoji: '🌠',
        color: 'from-yellow-500 to-orange-600',
        textColor: 'text-yellow-400',
        getScore: () => {
          let score = 60;
          if (dayElement === '토') score += 15;
          if (dayElement === '금') score += 10;
          if (dayElement === '화') score += 10;
          return Math.min(Math.max(score, 40), 100);
        },
        pros: ['변화 기회', '귀인운', '아침 햇살', '발전 가능'],
        cons: ['겨울 추움', '바람'],
        fortune: '귀인을 만나고 변화의 기회. 새로운 시작에 좋습니다.',
      },
    ];
  };

  const entranceDirections = getEntranceDirections().map(dir => ({
    ...dir,
    score: dir.getScore(),
  }));

  const sortedDirections = [...entranceDirections].sort((a, b) => b.score - a.score);
  const bestDirection = sortedDirections[0];

  // 현관 풍수 포인트
  const getEntranceFengshui = () => {
    return [
      {
        category: '현관 필수 요소',
        icon: '✨',
        color: 'from-emerald-500 to-green-600',
        items: [
          '밝은 조명 (기운 유입)',
          '깨끗한 신발장 (정리정돈)',
          '생화나 식물 (생기)',
          '환영하는 매트 (초대)',
        ],
      },
      {
        category: '현관 금기 사항',
        icon: '⚠️',
        color: 'from-red-500 to-rose-600',
        items: [
          '거울이 문 정면 (기운 반사)',
          '어둡고 지저분함 (흉운)',
          '복잡한 신발 (막힌 기)',
          '화장실 직접 대면 (재물 유출)',
        ],
      },
      {
        category: '현관 장식 추천',
        icon: '🎨',
        color: 'from-purple-500 to-pink-600',
        items: [
          `${dayElement === '목' ? '녹색 식물' : dayElement === '화' ? '붉은 장식' : dayElement === '토' ? '황토색 소품' : dayElement === '금' ? '금속 장식' : '파란 그림'}`,
          '밝은 그림이나 액자',
          '행운을 상징하는 소품',
          '향기 나는 디퓨저',
        ],
      },
      {
        category: '현관 크기와 위치',
        icon: '📏',
        color: 'from-blue-500 to-cyan-600',
        items: [
          '너무 크지도 작지도 않게',
          '거실이 바로 보이지 않게',
          '창문과 일직선 피하기',
          '계단 정면 피하기',
        ],
      },
    ];
  };

  const entranceFengshui = getEntranceFengshui();

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
        🚪 현관 방향 운세
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님에게 길한 현관 방향과 풍수
      </p>

      {/* 최고 길한 현관 방향 */}
      <div className="glass rounded-2xl p-8 mb-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="text-6xl">{bestDirection.emoji}</span>
          <div className="text-center">
            <p className="text-slate-400 mb-1">가장 길한 현관 방향</p>
            <h3 className="text-3xl font-bold text-purple-400">{bestDirection.direction}</h3>
            <p className="text-xl font-bold text-emerald-400 mt-2">{bestDirection.score}점</p>
          </div>
        </div>
        <p className="text-slate-300 text-center mb-4">{bestDirection.fortune}</p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
            <p className="text-sm font-bold text-emerald-400 mb-2">장점</p>
            <ul className="space-y-1">
              {bestDirection.pros.map((pro, idx) => (
                <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                  <span className="text-emerald-400">•</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-3 bg-orange-500/10 border border-orange-500/30 rounded-xl">
            <p className="text-sm font-bold text-orange-400 mb-2">단점</p>
            <ul className="space-y-1">
              {bestDirection.cons.map((con, idx) => (
                <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                  <span className="text-orange-400">•</span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 방향별 상세 운세 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
          <Compass className="w-6 h-6" />
          현관 방향별 운세 분석
        </h3>
        <div className="space-y-3">
          {entranceDirections.map((dir, index) => (
            <motion.div
              key={dir.direction}
              className="glass-strong rounded-xl p-5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${dir.color} flex items-center justify-center text-3xl`}>
                  {dir.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-white text-lg">{dir.direction}</h4>
                    <span className={`text-xl font-bold ${dir.textColor}`}>{dir.score}점</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${dir.color}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${dir.score}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-400 mb-3">오행: {dir.element}</p>
              <p className="text-sm text-emerald-400 mb-3 italic">{dir.fortune}</p>

              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-green-400 mb-1">장점</p>
                  <ul className="space-y-0.5">
                    {dir.pros.slice(0, 2).map((pro, idx) => (
                      <li key={idx} className="text-xs text-slate-300">• {pro}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs text-orange-400 mb-1">단점</p>
                  <ul className="space-y-0.5">
                    {dir.cons.slice(0, 2).map((con, idx) => (
                      <li key={idx} className="text-xs text-slate-300">• {con}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 현관 풍수 가이드 */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold text-amber-400 mb-6 flex items-center gap-2">
          <DoorOpen className="w-6 h-6" />
          현관 풍수 완벽 가이드
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {entranceFengshui.map((section, index) => (
            <motion.div
              key={section.category}
              className="glass-strong rounded-xl p-5"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center text-2xl`}>
                  {section.icon}
                </div>
                <h4 className="font-bold text-white">{section.category}</h4>
              </div>
              <ul className="space-y-2">
                {section.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className={section.category.includes('금기') ? 'text-red-400' : 'text-emerald-400'}>
                      {section.category.includes('금기') ? '✗' : '✓'}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl">
          <h4 className="font-bold text-purple-400 mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            현관 개운 비법
          </h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-slate-300">
              <span className="text-yellow-400">⭐</span>
              <span>입주 첫날 소금물로 현관 닦기 (정화)</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-300">
              <span className="text-yellow-400">⭐</span>
              <span>현관에 쌀 한 줌, 소금 한 줌 두기 (재물과 액막이)</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-300">
              <span className="text-yellow-400">⭐</span>
              <span>매일 아침 현관 환기시키기 (좋은 기운 유입)</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-300">
              <span className="text-yellow-400">⭐</span>
              <span>현관 조명은 항상 밝게 유지 (밤에도 은은한 불빛)</span>
            </li>
          </ul>
        </div>

        <div className="mt-4 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl">
          <p className="text-slate-300 text-sm leading-relaxed">
            💡 <span className="font-bold">중요:</span> 현관은 집의 얼굴이자 기가 들어오는 입구입니다.
            항상 깨끗하고 밝게 유지하는 것이 가장 중요한 풍수입니다. 방향도 중요하지만 관리가 더 중요합니다.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
