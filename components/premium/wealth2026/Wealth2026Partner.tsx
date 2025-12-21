'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Users, Handshake, AlertTriangle, Heart, TrendingUp, Shield, Target, UserCheck, Calendar } from 'lucide-react';

interface Wealth2026PartnerProps {
  result: SajuResult;
  name: string;
  baseScore: number;
}

export default function Wealth2026Partner({ result, name, baseScore }: Wealth2026PartnerProps) {
  const dayElement = result.day.stem.element;
  const { 재성, 관성, 식상, 비겁, 인성 } = result.tenGodsCount;

  // 동업 적합도
  const getBusinessPartnerScore = () => {
    let score = baseScore;
    if (dayElement === '토') score += 20; // 토는 조화
    if (dayElement === '목') score += 15; // 목은 협력
    if (dayElement === '금') score += 10; // 금은 의리
    if (dayElement === '수') score += 5; // 수는 유연성
    if (비겁 <= 1) score += 25; // 비겁 적으면 동업 좋음
    if (비겁 >= 3) score -= 30; // 비겁 많으면 동업 흉
    if (관성 >= 2) score += 15; // 관성은 협력
    if (식상 >= 2) score += 5;
    return Math.min(Math.max(score, 15), 100);
  };

  // 투자 파트너 적합도
  const getInvestmentPartnerScore = () => {
    let score = baseScore;
    if (dayElement === '금') score += 20; // 금은 신중함
    if (dayElement === '토') score += 15; // 토는 안정
    if (dayElement === '수') score += 10; // 수는 분석력
    if (재성 >= 2) score += 20; // 재성 있으면 재물 감각
    if (비겁 <= 2) score += 15; // 비겁 적으면 좋음
    if (비겁 >= 3) score -= 20; // 비겁 많으면 주의
    if (인성 >= 2) score += 10; // 인성은 학습
    return Math.min(Math.max(score, 20), 100);
  };

  // 금전 거래 신뢰도
  const getMoneyTrustScore = () => {
    let score = baseScore + 10;
    if (dayElement === '금') score += 25; // 금은 의리와 신용
    if (dayElement === '토') score += 20; // 토는 안정
    if (dayElement === '목') score += 15; // 목은 성실
    if (관성 >= 2) score += 20; // 관성은 책임감
    if (인성 >= 2) score += 10; // 인성은 신뢰
    if (비겁 >= 3) score -= 15; // 비겁 많으면 주의
    return Math.min(Math.max(score, 30), 100);
  };

  // 공동 사업 성공률
  const getJointVentureScore = () => {
    let score = baseScore - 10; // 공동 사업은 기본적으로 위험
    if (dayElement === '토') score += 25; // 토는 조화
    if (dayElement === '목') score += 20; // 목은 성장
    if (dayElement === '화') score += 10; // 화는 추진력
    if (비겁 <= 1) score += 30; // 비겁 적으면 최적
    if (비겁 >= 3) score -= 35; // 비겁 많으면 최악
    if (관성 >= 2) score += 15;
    if (재성 >= 2) score += 10;
    return Math.min(Math.max(score, 10), 100);
  };

  const partnerTypes = [
    {
      icon: Handshake,
      name: '동업 파트너',
      score: getBusinessPartnerScore(),
      color: 'from-blue-500 to-cyan-600',
      textColor: 'text-blue-400',
      advice: getBusinessPartnerScore() >= 70
        ? '동업으로 큰 시너지를 낼 수 있습니다.'
        : getBusinessPartnerScore() >= 50
        ? '신중하게 파트너를 선택하면 가능합니다.'
        : '동업은 피하고 단독 사업을 권장합니다.',
      caution: getBusinessPartnerScore() < 50 ? '비겁이 많아 갈등 가능성 높음' : '명확한 역할 분담 필수',
    },
    {
      icon: TrendingUp,
      name: '투자 파트너',
      score: getInvestmentPartnerScore(),
      color: 'from-green-500 to-emerald-600',
      textColor: 'text-green-400',
      advice: getInvestmentPartnerScore() >= 70
        ? '공동 투자로 수익을 낼 수 있습니다.'
        : getInvestmentPartnerScore() >= 50
        ? '소액 투자부터 시작하세요.'
        : '단독 투자가 더 안전합니다.',
      caution: getInvestmentPartnerScore() >= 60 ? '서면 계약 필수' : '투자금 회수 계획 명확히',
    },
    {
      icon: Shield,
      name: '금전 거래 신뢰도',
      score: getMoneyTrustScore(),
      color: 'from-purple-500 to-violet-600',
      textColor: 'text-purple-400',
      advice: getMoneyTrustScore() >= 70
        ? '금전 거래에서 신뢰를 얻을 수 있습니다.'
        : getMoneyTrustScore() >= 50
        ? '약속을 철저히 지키면 신뢰 구축 가능합니다.'
        : '금전 거래는 항상 서면으로 남기세요.',
      caution: '빌려준 돈은 못 받을 각오',
    },
    {
      icon: Users,
      name: '공동 사업',
      score: getJointVentureScore(),
      color: 'from-orange-500 to-amber-600',
      textColor: 'text-orange-400',
      advice: getJointVentureScore() >= 70
        ? '공동 사업으로 성공할 수 있습니다.'
        : getJointVentureScore() >= 50
        ? '작은 규모부터 시작하여 검증하세요.'
        : '공동 사업은 매우 위험합니다. 피하세요.',
      caution: getJointVentureScore() < 50 ? '심각한 갈등 우려, 절대 비추천' : '지분과 역할 명확히',
    },
  ];

  // 파트너 성향 분석
  const getPartnerProfile = () => {
    const avgScore = (getBusinessPartnerScore() + getInvestmentPartnerScore() + getJointVentureScore()) / 3;

    if (avgScore >= 70) {
      return {
        type: '협력형 파트너',
        emoji: '🤝',
        description: '파트너와의 협업으로 큰 성과를 낼 수 있는 사람입니다.',
        strength: '신뢰 관계 구축에 능함',
        weakness: '과도한 믿음은 금물',
      };
    }
    if (avgScore >= 50) {
      return {
        type: '신중형 파트너',
        emoji: '⚖️',
        description: '신중하게 파트너를 선택하면 협업이 가능합니다.',
        strength: '리스크 관리 능력',
        weakness: '명확한 계약 필수',
      };
    }
    return {
      type: '독립형 사업가',
      emoji: '🚀',
      description: '파트너 없이 혼자 하는 것이 더 적합합니다.',
      strength: '독립적 의사결정',
      weakness: '동업 시 갈등 가능성',
    };
  };

  const profile = getPartnerProfile();

  // 좋은 파트너 찾기 기준
  const goodPartnerCriteria = [
    {
      criteria: '보완적 오행',
      description: dayElement === '화' ? '수/금 일주 (견제와 균형)' :
                   dayElement === '토' ? '목/수 일주 (성장과 유연성)' :
                   dayElement === '금' ? '수/목 일주 (유연성과 성장)' :
                   dayElement === '수' ? '토/목 일주 (안정과 성장)' :
                   '금/토 일주 (안정과 재물)',
      importance: 90,
      icon: '🔄',
    },
    {
      criteria: '재성/식상 보유',
      description: '재물운과 수익 창출 능력이 있는 사람',
      importance: 85,
      icon: '💰',
    },
    {
      criteria: '관성 2개 이상',
      description: '책임감과 체계적 관리 능력',
      importance: 80,
      icon: '📊',
    },
    {
      criteria: '비겁 적음',
      description: '비겁 1개 이하인 사람 (갈등 최소화)',
      importance: 95,
      icon: '✅',
    },
  ];

  // 위험한 파트너 유형
  const dangerousPartners = [
    {
      type: '비겁 과다형',
      warning: '비겁 3개 이상',
      risk: '극심한 갈등, 금전 분쟁, 배신 가능성',
      level: '매우 위험',
      color: 'red',
    },
    {
      type: '충/극 관계',
      warning: dayElement === '화' ? '수 일주 (수극화)' :
               dayElement === '토' ? '목 일주 (목극토)' :
               dayElement === '금' ? '화 일주 (화극금)' :
               dayElement === '수' ? '토 일주 (토극수)' :
               '금 일주 (금극목)',
      risk: '근본적 가치관 충돌, 지속적 갈등',
      level: '위험',
      color: 'orange',
    },
    {
      type: '재성 없음',
      warning: '재성 0개',
      risk: '재물 감각 부족, 수익 창출 어려움',
      level: '주의',
      color: 'yellow',
    },
    {
      type: '관성 없음',
      warning: '관성 0개',
      risk: '무책임, 약속 불이행, 체계 부족',
      level: '주의',
      color: 'yellow',
    },
  ];

  // 파트너십 체크리스트
  const partnershipChecklist = [
    {
      category: '사전 검증',
      items: [
        '사주 궁합 확인 (비겁 개수, 오행 조화)',
        '과거 사업 이력 및 평판 조사',
        '재무 상태와 신용도 확인',
        '가치관과 목표 일치 여부',
      ],
    },
    {
      category: '계약 사항',
      items: [
        '지분율 명확히 (50:50 피하기)',
        '역할과 책임 구체적 명시',
        '의사결정 방식 규정',
        '탈퇴/해산 조건 사전 합의',
      ],
    },
    {
      category: '운영 원칙',
      items: [
        '정기 회의 및 보고 체계',
        '회계 투명성 확보',
        '주요 결정은 서면 기록',
        '갈등 해결 프로세스',
      ],
    },
    {
      category: '위기 대비',
      items: [
        '사업 실패 시나리오 대비',
        '개인 연대보증 최소화',
        '비상 자금 별도 확보',
        '정기적 관계 점검',
      ],
    },
  ];

  // 파트너십 유형별 조언
  const partnershipAdvice = [
    {
      type: '동업 (50:50)',
      suit: getBusinessPartnerScore() >= 70,
      pros: '권한 균등, 책임 공유',
      cons: '의사결정 교착 위험',
      tip: '결정권자 명확히 또는 51:49로 조정',
    },
    {
      type: '주동업자 (70:30)',
      suit: getBusinessPartnerScore() >= 60 || getJointVentureScore() >= 50,
      pros: '명확한 주도권, 효율적 의사결정',
      cons: '소수 파트너 불만 가능',
      tip: '역할로 보상 (기술/영업 등)',
    },
    {
      type: '투자자 관계',
      suit: getInvestmentPartnerScore() >= 60,
      pros: '자금 확보, 경영권 유지',
      cons: '투자 회수 압박',
      tip: '명확한 수익 배분 계약',
    },
    {
      type: '단독 운영',
      suit: getBusinessPartnerScore() < 50,
      pros: '독립적 결정, 갈등 없음',
      cons: '자금/업무 부담 큼',
      tip: '당신에게 가장 적합',
    },
  ];

  // 월별 파트너십 관리
  const monthlyManagement = [
    { period: '1-3월', focus: '파트너 물색', action: '인맥 활용, 사주 궁합 확인' },
    { period: '4-6월', focus: '계약 체결', action: '조건 협상, 법률 검토' },
    { period: '7-9월', focus: '초기 운영', action: '역할 조율, 시스템 구축' },
    { period: '10-12월', focus: '관계 점검', action: '성과 평가, 내년 계획' },
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
        🤝 금전 파트너운 분석
      </h2>
      <p className="text-center text-slate-400 mb-8">
        2026년 {name}님의 동업/투자 파트너 궁합
      </p>

      {/* 파트너 성향 프로필 */}
      <div className="glass rounded-2xl p-6 mb-8 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl">{profile.emoji}</span>
          <div>
            <p className="text-slate-400">2026년 파트너십 유형</p>
            <h3 className="text-2xl font-bold text-blue-400">{profile.type}</h3>
          </div>
        </div>
        <p className="text-slate-300 mb-4">{profile.description}</p>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="p-3 bg-green-500/10 rounded-xl">
            <p className="text-sm text-green-400 mb-1">💪 강점</p>
            <p className="text-white">{profile.strength}</p>
          </div>
          <div className="p-3 bg-amber-500/10 rounded-xl">
            <p className="text-sm text-amber-400 mb-1">⚠️ 약점</p>
            <p className="text-white">{profile.weakness}</p>
          </div>
        </div>
      </div>

      {/* 파트너 유형별 점수 */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {partnerTypes.map((type, index) => (
          <motion.div
            key={type.name}
            className="glass rounded-xl p-5"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center`}>
                <type.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white">{type.name}</h4>
                <p className={`text-2xl font-bold ${type.textColor}`}>{type.score}점</p>
              </div>
            </div>

            {/* 점수 게이지 */}
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-3">
              <motion.div
                className={`h-full bg-gradient-to-r ${type.color}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${type.score}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </div>

            <p className="text-slate-300 text-sm mb-2">{type.advice}</p>
            <p className="text-amber-400 text-xs">⚠️ {type.caution}</p>
          </motion.div>
        ))}
      </div>

      {/* 좋은 파트너 찾기 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
          <UserCheck className="w-6 h-6" />
          좋은 파트너 찾기 기준
        </h3>
        <div className="space-y-3">
          {goodPartnerCriteria.map((item, index) => (
            <motion.div
              key={item.criteria}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-3 p-4 bg-slate-800/30 rounded-xl">
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-white">{item.criteria}</h4>
                    <span className="text-green-400 text-sm">{item.importance}%</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-2">
                    <motion.div
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.importance}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                  <p className="text-slate-400 text-sm">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 위험한 파트너 유형 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6" />
          피해야 할 위험한 파트너
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {dangerousPartners.map((partner, index) => (
            <motion.div
              key={partner.type}
              className="glass rounded-xl p-5 bg-slate-800/30 border-2 border-red-500/30"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-white">{partner.type}</h4>
                <span className={`text-xs px-2 py-1 rounded-full bg-${partner.color}-500/20 text-${partner.color}-400`}>
                  {partner.level}
                </span>
              </div>
              <p className="text-red-400 text-sm mb-2">🚨 {partner.warning}</p>
              <p className="text-slate-400 text-xs">{partner.risk}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
          <p className="text-red-400 font-bold mb-2">💀 절대 금기</p>
          <p className="text-slate-300 text-sm">
            비겁이 3개 이상인 사람과는 절대 동업하지 마세요.
            {비겁 >= 3 && ' 특히 당신도 비겁이 많아 더욱 위험합니다!'}
          </p>
        </div>
      </div>

      {/* 파트너십 체크리스트 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
          <Target className="w-6 h-6" />
          파트너십 필수 체크리스트
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {partnershipChecklist.map((check, index) => (
            <motion.div
              key={check.category}
              className="glass rounded-xl p-5 bg-slate-800/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="font-bold text-purple-400 mb-3">{check.category}</h4>
              <ul className="space-y-2">
                {check.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
                    <span className="text-purple-400 flex-shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 파트너십 유형별 조언 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
          <Heart className="w-6 h-6" />
          파트너십 유형별 적합도
        </h3>
        <div className="space-y-3">
          {partnershipAdvice.map((advice, index) => (
            <motion.div
              key={advice.type}
              className={`p-4 rounded-xl ${
                advice.suit
                  ? 'bg-green-500/10 border border-green-500/30'
                  : 'bg-slate-800/30 border border-slate-700'
              }`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-white">{advice.type}</h4>
                {advice.suit ? (
                  <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                    추천
                  </span>
                ) : (
                  <span className="text-xs px-2 py-1 rounded-full bg-slate-500/20 text-slate-400">
                    신중
                  </span>
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-2 mb-2">
                <p className="text-green-400 text-xs">✅ {advice.pros}</p>
                <p className="text-orange-400 text-xs">⚠️ {advice.cons}</p>
              </div>
              <p className="text-cyan-400 text-sm">💡 {advice.tip}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 월별 파트너십 관리 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
          <Calendar className="w-6 h-6" />
          2026년 파트너십 관리 전략
        </h3>
        <div className="grid md:grid-cols-4 gap-4">
          {monthlyManagement.map((month, index) => (
            <motion.div
              key={month.period}
              className="text-center p-4 bg-slate-800/50 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <p className="text-slate-400 text-sm">{month.period}</p>
              <p className="text-lg font-bold text-amber-400 my-2">{month.focus}</p>
              <p className="text-slate-300 text-xs">{month.action}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 최종 조언 */}
      <div className="glass rounded-2xl p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30">
        <h3 className="text-xl font-bold text-blue-400 mb-4">💡 파트너십 성공 비법</h3>
        <div className="space-y-3 text-slate-300">
          <p className="flex items-start gap-2">
            <span className="text-blue-400 flex-shrink-0">1.</span>
            <span>반드시 사주 궁합을 확인하세요. 비겁 개수가 가장 중요합니다.</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-blue-400 flex-shrink-0">2.</span>
            <span>모든 합의는 서면으로 작성하고, 변호사 검토를 받으세요.</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-blue-400 flex-shrink-0">3.</span>
            <span>50:50 지분은 피하고, 최종 결정권자를 명확히 하세요.</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-blue-400 flex-shrink-0">4.</span>
            <span>작은 프로젝트로 먼저 협업해보고, 궁합을 확인한 후 본격적으로 시작하세요.</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-blue-400 flex-shrink-0">5.</span>
            <span>정기적으로 관계를 점검하고, 문제가 생기면 즉시 해결하세요.</span>
          </p>
          {비겁 >= 3 && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <p className="text-red-400 font-bold">⚠️ 당신에게는 단독 사업을 강력히 권장합니다!</p>
              <p className="text-slate-300 text-sm mt-1">
                비겁이 {비겁}개로 많아 파트너와의 갈등 가능성이 매우 높습니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
