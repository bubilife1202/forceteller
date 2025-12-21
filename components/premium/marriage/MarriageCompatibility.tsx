'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Flame, Droplet, TreeDeciduous, Mountain, Gem } from 'lucide-react';

interface MarriageCompatibilityProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function MarriageCompatibility({ result, name }: MarriageCompatibilityProps) {
  const dayElement = result.day.stem.element;

  // 오행별 궁합표
  const getCompatibilityMap = () => {
    const compatibilityData: Record<string, {
      best: { element: string; score: number; reason: string }[];
      good: { element: string; score: number; reason: string }[];
      neutral: { element: string; score: number; reason: string }[];
      caution: { element: string; score: number; reason: string }[];
    }> = {
      목: {
        best: [
          { element: '수(水)', score: 95, reason: '수생목 - 배우자가 나를 키워주는 최고의 궁합' },
          { element: '화(火)', score: 90, reason: '목생화 - 서로 발전시키는 상생 관계' }
        ],
        good: [
          { element: '목(木)', score: 75, reason: '비견 - 비슷한 성향으로 서로 이해가 잘 됨' }
        ],
        neutral: [
          { element: '토(土)', score: 60, reason: '목극토 - 주도권을 잡지만 균형 필요' }
        ],
        caution: [
          { element: '금(金)', score: 40, reason: '금극목 - 갈등 가능성, 서로 이해와 양보 필수' }
        ]
      },
      화: {
        best: [
          { element: '목(木)', score: 95, reason: '목생화 - 나를 지지해주는 든든한 배우자' },
          { element: '토(土)', score: 90, reason: '화생토 - 내가 배우자를 풍요롭게 하는 관계' }
        ],
        good: [
          { element: '화(火)', score: 75, reason: '비견 - 열정적이고 활발한 부부' }
        ],
        neutral: [
          { element: '금(金)', score: 60, reason: '화극금 - 주도권을 잡지만 배려 필요' }
        ],
        caution: [
          { element: '수(水)', score: 40, reason: '수극화 - 갈등 주의, 상호 존중 중요' }
        ]
      },
      토: {
        best: [
          { element: '화(火)', score: 95, reason: '화생토 - 나를 풍요롭게 하는 완벽한 배우자' },
          { element: '금(金)', score: 90, reason: '토생금 - 내가 베푸는 아름다운 관계' }
        ],
        good: [
          { element: '토(土)', score: 75, reason: '비견 - 안정적이고 평화로운 가정' }
        ],
        neutral: [
          { element: '수(水)', score: 60, reason: '토극수 - 주도하는 위치, 소통 중요' }
        ],
        caution: [
          { element: '목(木)', score: 40, reason: '목극토 - 이해와 타협이 필요한 관계' }
        ]
      },
      금: {
        best: [
          { element: '토(土)', score: 95, reason: '토생금 - 배우자의 헌신적 사랑을 받는 궁합' },
          { element: '수(水)', score: 90, reason: '금생수 - 내가 주는 사랑이 넘치는 관계' }
        ],
        good: [
          { element: '금(金)', score: 75, reason: '비견 - 원칙과 품격을 지키는 부부' }
        ],
        neutral: [
          { element: '목(木)', score: 60, reason: '금극목 - 주도권 있지만 권위적이지 않게' }
        ],
        caution: [
          { element: '화(火)', score: 40, reason: '화극금 - 갈등 조심, 서로의 차이 인정 필요' }
        ]
      },
      수: {
        best: [
          { element: '금(金)', score: 95, reason: '금생수 - 나를 채워주는 이상적 배우자' },
          { element: '목(木)', score: 90, reason: '수생목 - 내가 키워주는 보람찬 결혼' }
        ],
        good: [
          { element: '수(水)', score: 75, reason: '비견 - 지적이고 감성적인 교감' }
        ],
        neutral: [
          { element: '화(火)', score: 60, reason: '수극화 - 통제력 있지만 과하지 않게' }
        ],
        caution: [
          { element: '토(土)', score: 40, reason: '토극수 - 어려움 예상, 극복 노력 필요' }
        ]
      }
    };
    return compatibilityData[dayElement] || compatibilityData['목'];
  };

  const compatibility = getCompatibilityMap();

  const getIcon = (element: string) => {
    if (element.includes('목')) return <TreeDeciduous className="w-5 h-5" />;
    if (element.includes('화')) return <Flame className="w-5 h-5" />;
    if (element.includes('토')) return <Mountain className="w-5 h-5" />;
    if (element.includes('금')) return <Gem className="w-5 h-5" />;
    if (element.includes('수')) return <Droplet className="w-5 h-5" />;
    return <Gem className="w-5 h-5" />;
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
        className="text-3xl font-bold text-center mb-4 gradient-text"
        style={{ fontFamily: "'Noto Serif KR', serif" }}
      >
        ☯️ 배우자 오행 궁합
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님({dayElement})과 배우자 오행의 조화
      </p>

      {/* 최고 궁합 */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-emerald-400 mb-3 flex items-center gap-2">
          <span className="text-2xl">💚</span>
          천생연분 (최고 궁합)
        </h3>
        <div className="space-y-3">
          {compatibility.best.map((item, index) => (
            <motion.div
              key={index}
              className="glass rounded-2xl p-5 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="text-emerald-400">{getIcon(item.element)}</div>
                  <span className="text-xl font-bold text-white">{item.element}</span>
                </div>
                <span className="text-2xl font-bold text-emerald-400">{item.score}점</span>
              </div>
              <p className="text-slate-300 pl-8">{item.reason}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 좋은 궁합 */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-blue-400 mb-3 flex items-center gap-2">
          <span className="text-2xl">💙</span>
          좋은 궁합
        </h3>
        <div className="space-y-3">
          {compatibility.good.map((item, index) => (
            <motion.div
              key={index}
              className="glass rounded-2xl p-5 bg-blue-500/10 border border-blue-500/30"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="text-blue-400">{getIcon(item.element)}</div>
                  <span className="text-xl font-bold text-white">{item.element}</span>
                </div>
                <span className="text-2xl font-bold text-blue-400">{item.score}점</span>
              </div>
              <p className="text-slate-300 pl-8">{item.reason}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 보통 궁합 */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-yellow-400 mb-3 flex items-center gap-2">
          <span className="text-2xl">💛</span>
          노력이 필요한 궁합
        </h3>
        <div className="space-y-3">
          {compatibility.neutral.map((item, index) => (
            <motion.div
              key={index}
              className="glass rounded-2xl p-5 bg-yellow-500/10 border border-yellow-500/30"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="text-yellow-400">{getIcon(item.element)}</div>
                  <span className="text-xl font-bold text-white">{item.element}</span>
                </div>
                <span className="text-2xl font-bold text-yellow-400">{item.score}점</span>
              </div>
              <p className="text-slate-300 pl-8">{item.reason}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 주의 궁합 */}
      <div>
        <h3 className="text-lg font-bold text-red-400 mb-3 flex items-center gap-2">
          <span className="text-2xl">⚠️</span>
          극복 노력 필요 (주의 궁합)
        </h3>
        <div className="space-y-3">
          {compatibility.caution.map((item, index) => (
            <motion.div
              key={index}
              className="glass rounded-2xl p-5 bg-red-500/10 border border-red-500/30"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="text-red-400">{getIcon(item.element)}</div>
                  <span className="text-xl font-bold text-white">{item.element}</span>
                </div>
                <span className="text-2xl font-bold text-red-400">{item.score}점</span>
              </div>
              <p className="text-slate-300 pl-8">{item.reason}</p>
              <p className="text-red-300 text-sm mt-2 pl-8">
                💡 TIP: 충분한 대화와 서로에 대한 이해가 행복의 열쇠입니다
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
