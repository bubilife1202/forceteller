'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { TreePine, Waves, Mountain, Building2, Sun } from 'lucide-react';

interface MovingEnvironmentProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function MovingEnvironment({ result, name }: MovingEnvironmentProps) {
  const dayElement = result.day.stem.element;

  // 주변 환경 요소별 분석
  const getEnvironmentFactors = () => {
    return [
      {
        name: '공원/녹지',
        element: '목',
        icon: TreePine,
        emoji: '🌳',
        color: 'from-green-500 to-emerald-600',
        textColor: 'text-green-400',
        getScore: () => {
          let score = 50;
          if (dayElement === '목') score += 20;
          if (dayElement === '화') score += 15; // 목생화
          if (dayElement === '수') score += 10; // 수생목
          if (dayElement === '금') score -= 10; // 금극목
          return Math.min(Math.max(score, 30), 100);
        },
        benefits: ['신선한 공기', '산책/운동 가능', '자연 치유', '아이 놀이터'],
        advice: '나무와 풀이 많은 환경은 심신 안정에 좋습니다',
      },
      {
        name: '하천/호수',
        element: '수',
        icon: Waves,
        emoji: '💧',
        color: 'from-blue-500 to-cyan-600',
        textColor: 'text-blue-400',
        getScore: () => {
          let score = 50;
          if (dayElement === '수') score += 20;
          if (dayElement === '목') score += 15; // 수생목
          if (dayElement === '금') score += 10; // 금생수
          if (dayElement === '토') score -= 10; // 토극수
          return Math.min(Math.max(score, 30), 100);
        },
        benefits: ['시원한 기운', '습도 조절', '수변 산책', '재물운 상승'],
        advice: '물 흐르는 소리는 마음을 진정시키고 재물을 불러옵니다',
      },
      {
        name: '산/언덕',
        element: '토',
        icon: Mountain,
        emoji: '⛰️',
        color: 'from-yellow-500 to-amber-600',
        textColor: 'text-yellow-400',
        getScore: () => {
          let score = 50;
          if (dayElement === '토') score += 20;
          if (dayElement === '금') score += 15; // 토생금
          if (dayElement === '화') score += 10; // 화생토
          if (dayElement === '목') score -= 10; // 목극토
          return Math.min(Math.max(score, 30), 100);
        },
        benefits: ['안정감', '배산임수', '건강한 공기', '풍수 길지'],
        advice: '뒤에 산을 두면 든든한 후원자를 얻습니다',
      },
      {
        name: '상업지구',
        element: '금',
        icon: Building2,
        emoji: '🏢',
        color: 'from-slate-400 to-gray-500',
        textColor: 'text-slate-300',
        getScore: () => {
          let score = 50;
          if (dayElement === '금') score += 20;
          if (dayElement === '수') score += 15; // 금생수
          if (dayElement === '토') score += 10; // 토생금
          if (dayElement === '화') score -= 10; // 화극금
          return Math.min(Math.max(score, 30), 100);
        },
        benefits: ['편의시설 많음', '재물 기운', '교통 편리', '생활 편의성'],
        advice: '번화한 곳은 재물과 인연의 기회가 많습니다',
      },
      {
        name: '학교/도서관',
        element: '목',
        icon: Sun,
        emoji: '📚',
        color: 'from-purple-500 to-pink-600',
        textColor: 'text-purple-400',
        getScore: () => {
          let score = 50;
          if (dayElement === '목') score += 15;
          if (dayElement === '화') score += 10; // 목생화
          if (result.tenGodsCount.인성 >= 2) score += 15;
          return Math.min(Math.max(score, 30), 100);
        },
        benefits: ['교육 환경', '조용한 분위기', '문화 시설', '자녀 교육'],
        advice: '학문과 지식의 기운은 자녀에게 좋은 영향을 줍니다',
      },
    ];
  };

  const environmentFactors = getEnvironmentFactors().map(factor => ({
    ...factor,
    score: factor.getScore(),
  }));

  const sortedFactors = [...environmentFactors].sort((a, b) => b.score - a.score);

  // 이상적인 주변 환경 조합
  const getIdealCombination = () => {
    if (dayElement === '목') {
      return {
        primary: '공원/녹지 인근',
        secondary: '하천이나 호수 근처',
        avoid: '공장 밀집 지역',
        desc: '자연 친화적 환경에서 건강과 성장운이 상승합니다',
      };
    } else if (dayElement === '화') {
      return {
        primary: '햇볕 잘 드는 남향',
        secondary: '공원과 상업지구 중간',
        avoid: '습하고 그늘진 곳',
        desc: '밝고 활기찬 환경에서 발전운이 높아집니다',
      };
    } else if (dayElement === '토') {
      return {
        primary: '산 기슭, 언덕',
        secondary: '넓은 광장이나 공터 근처',
        avoid: '물가 너무 가까운 곳',
        desc: '안정적이고 든든한 땅의 기운이 필요합니다',
      };
    } else if (dayElement === '금') {
      return {
        primary: '도심 상업지구',
        secondary: '교통 요지',
        avoid: '시끄럽고 혼잡한 공장지대',
        desc: '현대적이고 체계적인 환경이 재물운을 높입니다',
      };
    } else {
      return {
        primary: '하천/호수 근처',
        secondary: '조용한 주택가',
        avoid: '지나치게 번화한 곳',
        desc: '물의 기운과 조용한 환경이 지혜를 키웁니다',
      };
    }
  };

  const idealCombo = getIdealCombination();

  // 풍수 명당 조건
  const getFengshuiIdeal = () => {
    return [
      {
        condition: '배산임수 (背山臨水)',
        desc: '뒤에 산, 앞에 물',
        effect: '재물과 명예가 함께 오는 최고의 입지',
        emoji: '⛰️💧',
      },
      {
        condition: '좌청룡 우백호',
        desc: '좌우에 보호막처럼 산이나 건물',
        effect: '든든한 후원과 보호를 받는 형국',
        emoji: '🐉🐯',
      },
      {
        condition: '명당 (明堂)',
        desc: '앞이 탁 트인 넓은 공간',
        effect: '발전과 기회의 공간 확보',
        emoji: '🌅',
      },
      {
        condition: '생기복덕 (生氣福德)',
        desc: '햇볕과 바람이 잘 통함',
        effect: '건강과 행운의 기운 순환',
        emoji: '☀️🌬️',
      },
    ];
  };

  const fengshuiIdeal = getFengshuiIdeal();

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
        🌲 좋은 주변 환경
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님에게 이로운 주거 주변 환경 분석
      </p>

      {/* 이상적인 환경 조합 */}
      <div className="glass rounded-2xl p-8 mb-8 bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/30">
        <h3 className="text-xl font-bold text-emerald-400 mb-4 text-center">이상적인 주변 환경</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div className="p-4 bg-slate-800/50 rounded-xl">
            <p className="text-sm text-slate-400 mb-2">1순위</p>
            <p className="text-lg font-bold text-emerald-400">{idealCombo.primary}</p>
          </div>
          <div className="p-4 bg-slate-800/50 rounded-xl">
            <p className="text-sm text-slate-400 mb-2">2순위</p>
            <p className="text-lg font-bold text-green-400">{idealCombo.secondary}</p>
          </div>
          <div className="p-4 bg-slate-800/50 rounded-xl">
            <p className="text-sm text-slate-400 mb-2">피할 곳</p>
            <p className="text-lg font-bold text-red-400">{idealCombo.avoid}</p>
          </div>
        </div>
        <p className="text-slate-300 text-center">{idealCombo.desc}</p>
      </div>

      {/* 환경 요소별 점수 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
          <TreePine className="w-6 h-6" />
          주변 환경 요소별 분석
        </h3>
        <div className="space-y-4">
          {environmentFactors.map((factor, index) => (
            <motion.div
              key={factor.name}
              className="glass-strong rounded-xl p-5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${factor.color} flex items-center justify-center text-3xl`}>
                  {factor.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-white text-lg">{factor.name}</h4>
                    <span className={`text-xl font-bold ${factor.textColor}`}>{factor.score}점</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${factor.color}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${factor.score}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-400 mb-3">오행: {factor.element}</p>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-bold text-green-400 mb-2">주요 이점</p>
                  <ul className="space-y-1">
                    {factor.benefits.map((benefit, idx) => (
                      <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center">
                  <p className="text-sm text-slate-300 italic">{factor.advice}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 풍수 명당 조건 */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold text-amber-400 mb-6 flex items-center gap-2">
          <Mountain className="w-6 h-6" />
          풍수 명당의 조건
        </h3>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {fengshuiIdeal.map((item, index) => (
            <motion.div
              key={item.condition}
              className="glass-strong rounded-xl p-5"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{item.emoji}</span>
                <div>
                  <h4 className="font-bold text-white">{item.condition}</h4>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
              </div>
              <p className="text-sm text-emerald-400">{item.effect}</p>
            </motion.div>
          ))}
        </div>

        <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl">
          <h4 className="font-bold text-purple-400 mb-3">종합 환경 체크리스트</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-slate-300">
              <span className="text-green-400">✓</span>
              <span>남향 또는 남동향 (햇볕이 잘 듦)</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-300">
              <span className="text-green-400">✓</span>
              <span>도보 10분 내 공원이나 녹지</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-300">
              <span className="text-green-400">✓</span>
              <span>대중교통 접근성 양호</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-300">
              <span className="text-green-400">✓</span>
              <span>병원, 마트 등 생활 인프라 근접</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-300">
              <span className="text-green-400">✓</span>
              <span>소음이 적고 공기가 맑음</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-300">
              <span className="text-green-400">✓</span>
              <span>주변에 흉한 건물이 없음</span>
            </li>
          </ul>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl">
          <p className="text-slate-300 text-sm leading-relaxed">
            💡 <span className="font-bold">실사 팁:</span> 직접 방문하여 낮과 밤, 평일과 주말의 분위기를 확인하세요.
            주변 환경은 삶의 질에 큰 영향을 미치므로 꼼꼼히 체크하는 것이 중요합니다.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
