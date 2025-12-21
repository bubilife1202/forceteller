'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Heart, Leaf, Mountain, Coins, Droplets, Activity } from 'lucide-react';

interface HealthOrgansProps {
  result: SajuResult;
  name: string;
}

export default function HealthOrgans({ result, name }: HealthOrgansProps) {
  // 오행과 장기 매핑
  const organMapping = {
    목: { name: '간(肝)', emoji: '🫀', icon: Leaf, desc: '해독, 혈액 저장, 대사 기능' },
    화: { name: '심장(心)', emoji: '❤️', icon: Heart, desc: '혈액 순환, 정신 활동' },
    토: { name: '비장(脾)', emoji: '🟡', icon: Mountain, desc: '소화, 면역, 혈액 생성' },
    금: { name: '폐(肺)', emoji: '🫁', icon: Coins, desc: '호흡, 기운 조절, 면역' },
    수: { name: '신장(腎)', emoji: '🔵', icon: Droplets, desc: '수분 대사, 생식, 뼈 건강' },
  };

  // 각 장기별 건강 점수 계산
  const calculateOrganHealth = (element: string) => {
    const elementValue = result.elements[element as keyof typeof result.elements] || 0;
    let score = elementValue;

    // 일간과의 관계
    if (result.day.stem.element === element) {
      score += 15; // 일간과 같은 오행은 강함
    }

    // 상생 관계 (생해주는 오행이 있으면 가점)
    const shengRelation: Record<string, string> = {
      목: '수',
      화: '목',
      토: '화',
      금: '토',
      수: '금',
    };
    const shengElement = shengRelation[element] as keyof typeof result.elements;
    if (result.elements[shengElement] > 20) {
      score += 10;
    }

    // 상극 관계 (극하는 오행이 너무 많으면 감점)
    const keRelation: Record<string, string> = {
      목: '금',
      화: '수',
      토: '목',
      금: '화',
      수: '토',
    };
    const keElement = keRelation[element] as keyof typeof result.elements;
    if (result.elements[keElement] > 30) {
      score -= 15;
    }

    return Math.min(Math.max(score, 30), 100);
  };

  const organs = Object.keys(organMapping).map((element) => ({
    element,
    ...organMapping[element as keyof typeof organMapping],
    score: calculateOrganHealth(element),
    percentage: result.elements[element as keyof typeof result.elements] || 0,
  }));

  // 점수에 따른 건강 상태
  const getHealthStatus = (score: number) => {
    if (score >= 80) return { status: '매우 좋음', color: 'text-green-400', bgColor: 'bg-green-500' };
    if (score >= 60) return { status: '양호', color: 'text-blue-400', bgColor: 'bg-blue-500' };
    if (score >= 40) return { status: '보통', color: 'text-yellow-400', bgColor: 'bg-yellow-500' };
    return { status: '주의 필요', color: 'text-red-400', bgColor: 'bg-red-500' };
  };

  // 장기별 관리 방법
  const getOrganCare = (element: string) => {
    const care: Record<string, { good: string[]; avoid: string[] }> = {
      목: {
        good: [
          '신선한 채소와 과일 섭취',
          '규칙적인 수면 (23:00-03:00)',
          '스트레스 해소 활동',
          '적당한 음주 (과음 금지)',
        ],
        avoid: [
          '과도한 음주와 기름진 음식',
          '야식과 불규칙한 식사',
          '지나친 분노와 스트레스',
          '장시간 컴퓨터/스마트폰 사용',
        ],
      },
      화: {
        good: [
          '규칙적인 유산소 운동',
          '충분한 수분 섭취',
          '명상과 이완 훈련',
          '적정 체중 유지',
        ],
        avoid: [
          '과도한 흥분과 스트레스',
          '카페인 과다 섭취',
          '극심한 추위나 더위',
          '급격한 운동',
        ],
      },
      토: {
        good: [
          '규칙적이고 천천히 먹기',
          '소화 잘 되는 음식 위주',
          '적당한 운동으로 소화 촉진',
          '긍정적인 마음가짐',
        ],
        avoid: [
          '과식과 폭식',
          '차가운 음식과 음료',
          '과도한 걱정과 고민',
          '식사 후 바로 눕기',
        ],
      },
      금: {
        good: [
          '심호흡과 호흡 운동',
          '실내 환기와 적정 습도 유지',
          '따뜻한 물 자주 마시기',
          '피부 보습 관리',
        ],
        avoid: [
          '담배와 미세먼지',
          '건조한 환경',
          '과도한 냉방',
          '급격한 온도 변화',
        ],
      },
      수: {
        good: [
          '충분한 수분 섭취',
          '따뜻하게 유지 (특히 허리와 발)',
          '적당한 소금 섭취',
          '규칙적인 배뇨 습관',
        ],
        avoid: [
          '과도한 염분 섭취',
          '장시간 서있기',
          '과로와 수면 부족',
          '냉증과 찬 곳에 오래 있기',
        ],
      },
    };
    return care[element];
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
        🫀 오행별 장기 건강
      </h2>

      <p className="text-slate-300 text-center mb-8 leading-relaxed">
        한의학에서는 오행과 오장육부가 서로 연결되어 있다고 봅니다.
        <br />
        목=간, 화=심장, 토=비장, 금=폐, 수=신장으로 대응됩니다.
      </p>

      {/* 장기별 건강 상태 */}
      <div className="space-y-6 mb-8">
        {organs.map((organ, index) => {
          const status = getHealthStatus(organ.score);
          const Icon = organ.icon;

          return (
            <motion.div
              key={organ.element}
              className="glass rounded-2xl p-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-3xl">
                    {organ.emoji}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{organ.name}</h3>
                    <p className="text-slate-400 text-sm">{organ.desc}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${status.color}`}>{organ.score}</div>
                  <div className={`text-sm ${status.color}`}>{status.status}</div>
                </div>
              </div>

              {/* 건강 점수 바 */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-slate-400 mb-2">
                  <span>건강 지수</span>
                  <span>{organ.percentage}% (오행 비율)</span>
                </div>
                <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${status.bgColor}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${organ.score}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                  />
                </div>
              </div>

              {/* 관리 방법 */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                  <h4 className="font-bold text-green-400 mb-2 flex items-center gap-2">
                    ✓ 좋은 습관
                  </h4>
                  <ul className="space-y-1">
                    {getOrganCare(organ.element).good.map((item, i) => (
                      <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                        <span className="text-green-400 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                  <h4 className="font-bold text-red-400 mb-2 flex items-center gap-2">
                    ✗ 피해야 할 것
                  </h4>
                  <ul className="space-y-1">
                    {getOrganCare(organ.element).avoid.map((item, i) => (
                      <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                        <span className="text-red-400 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 전체 요약 */}
      <div className="glass rounded-2xl p-6 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/30">
        <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
          <Activity className="w-6 h-6" />
          {name}님의 장기 건강 종합
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-green-400 mb-2">💪 강한 장기</h4>
            <p className="text-slate-300 text-sm">
              {organs
                .filter((o) => o.score >= 70)
                .map((o) => o.name)
                .join(', ') || '균형 잡힌 상태입니다'}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-orange-400 mb-2">⚠️ 주의 필요</h4>
            <p className="text-slate-300 text-sm">
              {organs
                .filter((o) => o.score < 50)
                .map((o) => o.name)
                .join(', ') || '특별히 취약한 장기가 없습니다'}
            </p>
          </div>
        </div>
        <p className="text-slate-300 text-sm mt-4 leading-relaxed">
          💡 <strong>Tip:</strong> 취약한 장기는 평소 관리가 더욱 중요합니다.
          정기 검진과 예방 차원의 건강관리를 실천하세요.
        </p>
      </div>
    </motion.div>
  );
}
