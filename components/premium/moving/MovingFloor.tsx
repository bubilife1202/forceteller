'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Layers, ArrowUp, ArrowDown, Hash } from 'lucide-react';

interface MovingFloorProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function MovingFloor({ result, name, birthDate }: MovingFloorProps) {
  const dayElement = result.day.stem.element;
  const yearBranch = result.year.branch;

  // 생년 마지막 숫자 계산
  const getBirthYearLastDigit = () => {
    if (!birthDate) return null;
    const year = birthDate.getFullYear();
    return year % 10;
  };

  const birthYearDigit = getBirthYearLastDigit();

  // 오행별 길한 층수
  const getLuckyFloors = () => {
    const floorsByElement: { [key: string]: number[] } = {
      '목': [3, 4, 8, 13, 14, 18, 23, 24, 28],
      '화': [2, 7, 12, 17, 22, 27],
      '토': [5, 10, 15, 20, 25, 30],
      '금': [4, 9, 14, 19, 24, 29],
      '수': [1, 6, 11, 16, 21, 26],
    };

    return floorsByElement[dayElement] || [];
  };

  const luckyFloors = getLuckyFloors();

  // 층수별 오행 분석
  const getFloorElementAnalysis = () => {
    return [
      {
        floors: '1층, 6층, 11층, 16층, 21층...',
        element: '수',
        emoji: '💧',
        color: 'from-blue-500 to-cyan-600',
        traits: '유동성, 지혜, 소통, 재물의 흐름',
        suitable: dayElement === '수' || dayElement === '목' ? '매우 적합' : dayElement === '금' ? '적합' : dayElement === '토' ? '부적합' : '보통',
      },
      {
        floors: '2층, 7층, 12층, 17층, 22층...',
        element: '화',
        emoji: '🔥',
        color: 'from-red-500 to-orange-600',
        traits: '열정, 활동성, 명예, 발전',
        suitable: dayElement === '화' || dayElement === '토' ? '매우 적합' : dayElement === '목' ? '적합' : dayElement === '수' ? '부적합' : '보통',
      },
      {
        floors: '3층, 8층, 13층, 18층, 23층...',
        element: '목',
        emoji: '🌳',
        color: 'from-green-500 to-emerald-600',
        traits: '성장, 발전, 인간관계, 확장',
        suitable: dayElement === '목' || dayElement === '화' ? '매우 적합' : dayElement === '수' ? '적합' : dayElement === '금' ? '부적합' : '보통',
      },
      {
        floors: '4층, 9층, 14층, 19층, 24층...',
        element: '금',
        emoji: '⚪',
        color: 'from-slate-400 to-gray-500',
        traits: '결단력, 재물, 권위, 완성',
        suitable: dayElement === '금' || dayElement === '수' ? '매우 적합' : dayElement === '토' ? '적합' : dayElement === '화' ? '부적합' : '보통',
      },
      {
        floors: '5층, 10층, 15층, 20층, 25층...',
        element: '토',
        emoji: '🏔️',
        color: 'from-yellow-500 to-amber-600',
        traits: '안정, 신뢰, 부동산, 기반',
        suitable: dayElement === '토' || dayElement === '금' ? '매우 적합' : dayElement === '화' ? '적합' : dayElement === '목' ? '부적합' : '보통',
      },
    ];
  };

  const floorAnalysis = getFloorElementAnalysis();

  // 호수 분석 (끝자리)
  const getLuckyNumbers = () => {
    const numbersByElement: { [key: string]: number[] } = {
      '목': [3, 4, 8],
      '화': [2, 7],
      '토': [5, 0],
      '금': [4, 9],
      '수': [1, 6],
    };

    return numbersByElement[dayElement] || [];
  };

  const luckyNumbers = getLuckyNumbers();

  // 층수 높이별 특성
  const getHeightCharacteristics = () => {
    return [
      {
        range: '저층 (1-5층)',
        icon: ArrowDown,
        pros: ['출입 편리', '재난 시 대피 용이', '땅 기운 가까움', '엘레베이터 고장 무관'],
        cons: ['습기 많음', '소음 많음', '일조권 부족', '벌레 출현'],
        suitable: dayElement === '토' || dayElement === '목' ? '추천' : '보통',
        color: 'from-emerald-500 to-green-600',
      },
      {
        range: '중층 (6-15층)',
        icon: Layers,
        pros: ['균형 잡힌 높이', '소음 적당', '일조권 양호', '전망 괜찮음'],
        cons: ['특별한 장점 부족', '층에 따라 차이'],
        suitable: '대부분 적합',
        color: 'from-blue-500 to-cyan-600',
      },
      {
        range: '고층 (16층 이상)',
        icon: ArrowUp,
        pros: ['전망 우수', '조용함', '일조권 최고', '프라이버시'],
        cons: ['바람 강함', '엘레베이터 의존', '재난 시 대피 어려움', '답답함'],
        suitable: dayElement === '화' || dayElement === '금' ? '추천' : '보통',
        color: 'from-purple-500 to-pink-600',
      },
    ];
  };

  const heightChars = getHeightCharacteristics();

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
        🔢 층수/호수 분석
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님에게 길한 층수와 호수 풀이
      </p>

      {/* 추천 층수 요약 */}
      <div className="glass rounded-2xl p-8 mb-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30">
        <h3 className="text-xl font-bold text-purple-400 mb-4 text-center">길한 층수</h3>
        <div className="flex flex-wrap gap-3 justify-center mb-4">
          {luckyFloors.slice(0, 9).map((floor, index) => (
            <motion.div
              key={floor}
              className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/40 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <span className="text-2xl font-bold text-emerald-400">{floor}</span>
            </motion.div>
          ))}
        </div>
        <p className="text-slate-300 text-center text-sm">
          {dayElement}({result.day.stem.ko}) 일간에게 가장 좋은 층수들입니다
        </p>
      </div>

      {/* 층수별 오행 분석 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
          <Layers className="w-6 h-6" />
          층수별 오행 특성
        </h3>
        <div className="space-y-4">
          {floorAnalysis.map((floor, index) => (
            <motion.div
              key={floor.element}
              className="glass-strong rounded-xl p-5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${floor.color} flex items-center justify-center text-3xl flex-shrink-0`}>
                  {floor.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-white">{floor.floors}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      floor.suitable === '매우 적합' ? 'bg-emerald-500/30 text-emerald-300' :
                      floor.suitable === '적합' ? 'bg-green-500/30 text-green-300' :
                      floor.suitable === '부적합' ? 'bg-red-500/30 text-red-300' :
                      'bg-slate-500/30 text-slate-300'
                    }`}>
                      {floor.suitable}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 mb-2">오행: {floor.element} / 특성: {floor.traits}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl">
          <p className="text-slate-300 text-sm leading-relaxed">
            💡 <span className="font-bold">층수 오행 계산:</span> 층수 끝자리로 오행을 판단합니다.
            예) 13층은 끝자리 3이므로 목(木), 27층은 끝자리 7이므로 화(火)입니다.
          </p>
        </div>
      </div>

      {/* 층수 높이별 특성 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-amber-400 mb-6 flex items-center gap-2">
          <ArrowUp className="w-6 h-6" />
          층수 높이별 특성
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {heightChars.map((char, index) => (
            <motion.div
              key={char.range}
              className="glass-strong rounded-xl p-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${char.color} flex items-center justify-center`}>
                  <char.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white">{char.range}</h4>
                  <p className="text-xs text-slate-400">{char.suitable}</p>
                </div>
              </div>

              <div className="mb-3">
                <p className="text-sm font-bold text-green-400 mb-1">장점</p>
                <ul className="space-y-1">
                  {char.pros.map((pro, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-1">
                      <span className="text-green-400">•</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {char.cons && (
                <div>
                  <p className="text-sm font-bold text-orange-400 mb-1">단점</p>
                  <ul className="space-y-1">
                    {char.cons.map((con, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start gap-1">
                        <span className="text-orange-400">•</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* 호수 끝자리 분석 */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
          <Hash className="w-6 h-6" />
          길한 호수 끝자리
        </h3>
        <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl text-center mb-4">
          <p className="text-slate-400 mb-3">추천 호수 끝자리</p>
          <div className="flex gap-4 justify-center">
            {luckyNumbers.map((num, index) => (
              <motion.div
                key={num}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 border-2 border-purple-400 flex items-center justify-center"
                initial={{ opacity: 0, rotate: -180 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-4xl font-bold text-purple-300">{num}</span>
              </motion.div>
            ))}
          </div>
          <p className="text-slate-300 text-sm mt-3">
            예) 101호, 506호, 1203호 등 끝자리가 위 숫자인 호수
          </p>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <div
              key={num}
              className={`p-3 rounded-lg text-center ${
                luckyNumbers.includes(num)
                  ? 'bg-purple-500/20 border border-purple-500/40'
                  : 'bg-slate-800/50 border border-slate-700'
              }`}
            >
              <p className={`text-xl font-bold ${
                luckyNumbers.includes(num) ? 'text-purple-400' : 'text-slate-500'
              }`}>{num}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl">
          <p className="text-slate-300 text-sm leading-relaxed">
            💡 <span className="font-bold">호수 선택 팁:</span> 층수와 호수를 함께 고려하되, 층수가 더 중요합니다.
            선택 가능하다면 층수를 먼저 맞추고 호수를 조정하세요.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
