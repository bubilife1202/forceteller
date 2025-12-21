'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Home, Building2, Building, TreePine, Castle } from 'lucide-react';

interface MovingHomeProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function MovingHome({ result, name }: MovingHomeProps) {
  const dayElement = result.day.stem.element;
  const { 재성, 관성, 인성, 식상 } = result.tenGodsCount;

  // 주거 형태별 적합도 분석
  const getHousingTypes = () => {
    return [
      {
        type: '아파트',
        icon: Building2,
        emoji: '🏢',
        color: 'from-blue-500 to-cyan-600',
        textColor: 'text-blue-400',
        getScore: () => {
          let score = 50;
          if (dayElement === '금') score += 20; // 금은 현대적, 규칙적
          if (dayElement === '토') score += 15; // 토는 안정, 높은 건물
          if (dayElement === '수') score += 10; // 수는 편리함
          if (관성 >= 2) score += 10; // 관성은 조직, 규칙
          if (재성 >= 2) score += 5; // 재산 가치
          return Math.min(Math.max(score, 30), 100);
        },
        pros: ['재산 가치 안정', '관리 편리', '보안 양호', '커뮤니티 시설'],
        cons: ['획일적', '관리비 부담', '층간소음'],
      },
      {
        type: '빌라/연립',
        icon: Building,
        emoji: '🏘️',
        color: 'from-green-500 to-emerald-600',
        textColor: 'text-green-400',
        getScore: () => {
          let score = 50;
          if (dayElement === '목') score += 15; // 목은 중간 규모
          if (dayElement === '화') score += 10; // 화는 활동적
          if (dayElement === '수') score += 10; // 수는 유연함
          if (식상 >= 2) score += 10; // 식상은 자유로움
          if (재성 >= 1) score += 5;
          return Math.min(Math.max(score, 30), 100);
        },
        pros: ['가성비 좋음', '층수 낮아 편리', '독립성 유지', '관리비 적음'],
        cons: ['재산 가치 상승 제한', '노후화 빠름', '보안 취약'],
      },
      {
        type: '단독주택',
        icon: Home,
        emoji: '🏠',
        color: 'from-amber-500 to-yellow-600',
        textColor: 'text-amber-400',
        getScore: () => {
          let score = 50;
          if (dayElement === '토') score += 25; // 토는 땅과 밀접
          if (dayElement === '목') score += 20; // 목은 자연 친화
          if (dayElement === '화') score += 10; // 화는 독립성
          if (인성 >= 2) score += 15; // 인성은 전통, 안정
          if (재성 >= 2) score += 10; // 부동산 자산
          return Math.min(Math.max(score, 30), 100);
        },
        pros: ['프라이버시 최고', '정원 활용', '증축 가능', '층간소음 無'],
        cons: ['관리 부담', '보안 신경', '비용 많이 듦', '접근성'],
      },
      {
        type: '다세대/원룸',
        icon: Building,
        emoji: '🏚️',
        color: 'from-purple-500 to-pink-600',
        textColor: 'text-purple-400',
        getScore: () => {
          let score = 50;
          if (dayElement === '수') score += 15; // 수는 유동적, 간편
          if (dayElement === '화') score += 10; // 화는 활동적
          if (식상 >= 2) score += 10; // 식상은 자유
          if (재성 <= 1) score += 5; // 초기 자산 부족 시
          return Math.min(Math.max(score, 30), 100);
        },
        pros: ['저렴한 가격', '이동 편리', '관리 간단', '도심 접근성'],
        cons: ['공간 협소', '프라이버시 부족', '자산 가치 낮음'],
      },
      {
        type: '전원주택',
        icon: TreePine,
        emoji: '🌲',
        color: 'from-emerald-500 to-green-600',
        textColor: 'text-emerald-400',
        getScore: () => {
          let score = 50;
          if (dayElement === '목') score += 25; // 목은 자연과 밀접
          if (dayElement === '토') score += 20; // 토는 땅
          if (dayElement === '수') score += 10; // 수는 물, 자연
          if (인성 >= 2) score += 15; // 인성은 휴식, 힐링
          if (관성 <= 1) score += 5; // 규칙 싫어함
          return Math.min(Math.max(score, 20), 100);
        },
        pros: ['자연 친화', '공기 좋음', '넓은 공간', '스트레스 해소'],
        cons: ['교통 불편', '생활 인프라 부족', '관리 힘듦', '겨울 추움'],
      },
    ];
  };

  const housingTypes = getHousingTypes().map(type => ({
    ...type,
    score: type.getScore(),
  }));

  const sortedTypes = [...housingTypes].sort((a, b) => b.score - a.score);
  const bestType = sortedTypes[0];
  const secondBest = sortedTypes[1];

  // 평수 추천
  const getRecommendedSize = () => {
    let size = '';
    let reason = '';

    if (dayElement === '토' || dayElement === '목') {
      size = '중대형 (30평 이상)';
      reason = '넓은 공간에서 기운이 안정되고 발전합니다';
    } else if (dayElement === '화') {
      size = '중형 (20-30평)';
      reason = '활동적인 성향에 적당한 공간이 좋습니다';
    } else {
      size = '소중형 (15-25평)';
      reason = '효율적이고 관리하기 편한 크기가 유리합니다';
    }

    return { size, reason };
  };

  const recommendedSize = getRecommendedSize();

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
        🏡 적합한 주거 형태
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님의 사주에 맞는 주택 유형 분석
      </p>

      {/* 최고 추천 주거 형태 */}
      <div className="glass rounded-2xl p-8 mb-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="text-6xl">{bestType.emoji}</span>
          <div className="text-center">
            <p className="text-slate-400 mb-1">가장 적합한 주거 형태</p>
            <h3 className="text-3xl font-bold text-purple-400">{bestType.type}</h3>
            <p className="text-xl font-bold text-emerald-400 mt-2">{bestType.score}점</p>
          </div>
        </div>
        <p className="text-slate-300 text-center mb-4">
          {dayElement}({result.day.stem.ko}) 일간에게 가장 좋은 주거 형태입니다
        </p>
        <div className="flex justify-center gap-2">
          <span className="px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-bold">1순위</span>
          <span className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 text-sm font-bold">{secondBest.type} (2순위)</span>
        </div>
      </div>

      {/* 주거 형태별 상세 분석 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
          <Castle className="w-6 h-6" />
          주거 형태별 적합도
        </h3>
        <div className="space-y-4">
          {housingTypes.map((type, index) => (
            <motion.div
              key={type.type}
              className="glass-strong rounded-xl p-5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center`}>
                  <type.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-white text-lg">{type.type}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${type.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${type.score}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>
                    <span className={`text-lg font-bold ${type.textColor}`}>{type.score}점</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-bold text-green-400 mb-2">👍 장점</p>
                  <ul className="space-y-1">
                    {type.pros.map((pro, idx) => (
                      <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-bold text-orange-400 mb-2">👎 단점</p>
                  <ul className="space-y-1">
                    {type.cons.map((con, idx) => (
                      <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                        <span className="text-orange-400">•</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 추천 평수 */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
          <Home className="w-6 h-6" />
          추천 평수 및 규모
        </h3>
        <div className="p-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl text-center">
          <p className="text-3xl font-bold text-amber-400 mb-2">{recommendedSize.size}</p>
          <p className="text-slate-300">{recommendedSize.reason}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-slate-800/50 rounded-xl text-center">
            <p className="text-slate-400 text-sm mb-1">일간 오행</p>
            <p className="text-lg font-bold text-purple-400">{dayElement}</p>
          </div>
          <div className="p-4 bg-slate-800/50 rounded-xl text-center">
            <p className="text-slate-400 text-sm mb-1">재성 (자산운)</p>
            <p className="text-lg font-bold text-emerald-400">{재성}개</p>
          </div>
          <div className="p-4 bg-slate-800/50 rounded-xl text-center">
            <p className="text-slate-400 text-sm mb-1">인성 (안정성)</p>
            <p className="text-lg font-bold text-blue-400">{인성}개</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl">
          <p className="text-slate-300 text-sm leading-relaxed">
            💡 <span className="font-bold">선택 가이드:</span> 주거 형태는 현재 생활 패턴, 가족 구성원, 예산을 종합적으로 고려하세요.
            사주 적합도가 높은 형태일수록 거주 만족도와 운이 상승할 가능성이 높습니다.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
