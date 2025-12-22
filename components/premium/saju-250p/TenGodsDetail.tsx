'use client';

import { motion } from 'framer-motion';
import { Users, Sparkles, DollarSign, Shield, BookOpen, ArrowRight, Star } from 'lucide-react';
import { SajuResult } from '@/lib/saju-calculator';

interface TenGodsDetailProps {
  result: SajuResult;
}

const TEN_GODS_DETAIL = {
  bijie: {
    name: '비겁(比劫)',
    icon: Users,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    fullMeaning: '형제자매, 친구, 동료, 경쟁자',
    positive: ['독립심 강함', '추진력 있음', '자기주장 뚜렷', '협동심 발달'],
    negative: ['고집이 셀 수 있음', '독단적일 수 있음'],
    influence: '자립적이고 독립적인 성향이 강하며, 협력과 경쟁을 통해 발전합니다.'
  },
  sikshang: {
    name: '식상(食傷)',
    icon: Sparkles,
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/30',
    fullMeaning: '표현력, 재능, 창의성, 자식',
    positive: ['표현력 우수', '창의적', '재능 발휘', '자유분방'],
    negative: ['산만할 수 있음', '끈기 부족 가능'],
    influence: '재능과 창의성을 발휘하며, 자유로운 표현과 활동을 통해 성장합니다.'
  },
  jaeseong: {
    name: '재성(財星)',
    icon: DollarSign,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    fullMeaning: '재물, 돈, 배우자(남성), 실리',
    positive: ['재물운 좋음', '현실감각 뛰어남', '경제관념 발달', '실리추구'],
    negative: ['물질적 가치 과중시', '인색할 수 있음'],
    influence: '재물과 경제적 안정을 중시하며, 현실적이고 실리적인 판단력이 뛰어납니다.'
  },
  gwanseong: {
    name: '관성(官星)',
    icon: Shield,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    fullMeaning: '명예, 지위, 배우자(여성), 책임',
    positive: ['책임감 강함', '명예 중시', '사회성 좋음', '질서 준수'],
    negative: ['권위적일 수 있음', '융통성 부족 가능'],
    influence: '명예와 지위를 중시하며, 책임감과 사회적 인정을 통해 발전합니다.'
  },
  inseong: {
    name: '인성(印星)',
    icon: BookOpen,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    fullMeaning: '학문, 지식, 어머니, 보호',
    positive: ['학습능력 우수', '사색적', '정신세계 중시', '인내심 강함'],
    negative: ['현실감각 부족', '의존적일 수 있음'],
    influence: '학문과 지식을 추구하며, 정신적 가치와 지적 성장을 중시합니다.'
  }
};

export default function TenGodsDetail({ result }: TenGodsDetailProps) {
  const extResult = result as SajuResult & {
    tenGodsDetail?: { primary: string; secondary: string; relationships: string[]; lifeImpact: string };
  };
  const detail = extResult.tenGodsDetail || {
    primary: 'bijie',
    secondary: 'jaeseong',
    relationships: ['비겁과 재성의 조화로 독립적인 재물 추구', '자립적 경제활동에 유리'],
    lifeImpact: '독립적이고 자주적인 성향이 강하며, 현실적인 재물 추구를 통해 안정을 이룹니다.'
  };

  const godKeys = Object.keys(TEN_GODS_DETAIL) as Array<keyof typeof TEN_GODS_DETAIL>;

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">십신 상세 분석</h2>
        <p className="text-gray-400">십신별 의미와 삶에 미치는 영향</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/30 rounded-xl p-5 mb-6"
      >
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-5 h-5 text-violet-400" />
          <h3 className="text-violet-400 font-semibold">인생 영향</h3>
        </div>
        <p className="text-white leading-relaxed mb-4">{detail.lifeImpact}</p>
        <div className="space-y-2">
          {detail.relationships.map((rel, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-fuchsia-400 mt-1 flex-shrink-0" />
              <span className="text-gray-300 text-sm">{rel}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="space-y-4">
        {godKeys.map((key, index) => {
          const god = TEN_GODS_DETAIL[key];
          const Icon = god.icon;

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${god.bgColor} border ${god.borderColor} rounded-xl p-5`}
            >
              <div className="flex items-center gap-3 mb-3">
                <Icon className={`w-5 h-5 ${god.color}`} />
                <div>
                  <h4 className={`font-bold ${god.color}`}>{god.name}</h4>
                  <p className="text-gray-400 text-xs">{god.fullMeaning}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <h5 className="text-green-400 text-sm font-semibold mb-2">긍정적 특성</h5>
                  <div className="space-y-1">
                    {god.positive.map((trait, idx) => (
                      <div key={idx} className="flex items-start gap-1">
                        <span className="text-green-400 text-xs mt-1">•</span>
                        <span className="text-gray-300 text-xs">{trait}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="text-orange-400 text-sm font-semibold mb-2">주의할 점</h5>
                  <div className="space-y-1">
                    {god.negative.map((trait, idx) => (
                      <div key={idx} className="flex items-start gap-1">
                        <span className="text-orange-400 text-xs mt-1">•</span>
                        <span className="text-gray-300 text-xs">{trait}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-gray-300 text-sm">{god.influence}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
