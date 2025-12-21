'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Rocket, Store, Users, Lightbulb, BarChart3, Target, TrendingUp, AlertTriangle } from 'lucide-react';

interface Wealth2026BusinessProps {
  result: SajuResult;
  name: string;
  baseScore: number;
}

export default function Wealth2026Business({ result, name, baseScore }: Wealth2026BusinessProps) {
  const dayElement = result.day.stem.element;
  const { 재성, 관성, 식상, 비겁, 인성 } = result.tenGodsCount;

  // 창업 적합도
  const getStartupScore = () => {
    let score = baseScore - 10; // 창업은 기본적으로 위험
    if (dayElement === '화') score += 25; // 화는 추진력과 열정
    if (dayElement === '목') score += 20; // 목은 성장과 확장
    if (dayElement === '토') score += 10; // 토는 안정적 성장
    if (dayElement === '수') score += 5; // 수는 유연성
    if (식상 >= 2) score += 20; // 식상은 창의성과 실행력
    if (재성 >= 2) score += 15; // 재성은 재물운
    if (비겁 >= 3) score -= 10; // 비겁 많으면 동업 주의
    return Math.min(Math.max(score, 20), 100);
  };

  // 기존 사업 확장 점수
  const getExpansionScore = () => {
    let score = baseScore;
    if (dayElement === '목') score += 25; // 목은 확장 최적
    if (dayElement === '화') score += 20; // 화는 성장
    if (dayElement === '토') score += 10; // 토는 안정적 확장
    if (재성 >= 2) score += 20;
    if (식상 >= 2) score += 15;
    if (관성 >= 2) score += 10; // 관성은 체계
    return Math.min(Math.max(score, 30), 100);
  };

  // 프리랜서/1인 사업 점수
  const getFreelanceScore = () => {
    let score = baseScore + 10;
    if (dayElement === '수') score += 20; // 수는 유연성
    if (dayElement === '화') score += 15; // 화는 추진력
    if (식상 >= 2) score += 25; // 식상은 개인 사업 최적
    if (재성 >= 1) score += 15;
    if (비겁 <= 1) score += 10; // 비겁 적으면 혼자 일하기 좋음
    return Math.min(Math.max(score, 35), 100);
  };

  // 동업 적합도
  const getPartnershipScore = () => {
    let score = baseScore;
    if (dayElement === '토') score += 15; // 토는 조화
    if (dayElement === '목') score += 10; // 목은 협력
    if (dayElement === '금') score += 5;
    if (비겁 <= 2) score += 20; // 비겁 적으면 동업 좋음
    if (비겁 >= 3) score -= 25; // 비겁 많으면 동업 흉
    if (관성 >= 2) score += 10; // 관성은 협력
    return Math.min(Math.max(score, 15), 100);
  };

  const businessTypes = [
    {
      icon: Rocket,
      name: '신규 창업',
      score: getStartupScore(),
      color: 'from-red-500 to-orange-600',
      textColor: 'text-red-400',
      advice: getStartupScore() >= 70
        ? '창업에 매우 좋은 시기! 철저한 준비로 도전하세요.'
        : getStartupScore() >= 50
        ? '신중한 준비 후 창업 가능. 작게 시작하세요.'
        : '창업보다는 직장 생활이나 부업을 권장합니다.',
      timing: getStartupScore() >= 60 ? '상반기 시작' : '충분한 준비 후',
    },
    {
      icon: TrendingUp,
      name: '사업 확장',
      score: getExpansionScore(),
      color: 'from-green-500 to-emerald-600',
      textColor: 'text-green-400',
      advice: getExpansionScore() >= 70
        ? '사업 확장에 최적기입니다. 적극 추진하세요.'
        : getExpansionScore() >= 50
        ? '단계적 확장이 가능합니다. 리스크 관리하세요.'
        : '현 상태 유지에 집중하세요.',
      timing: getExpansionScore() >= 60 ? '2-3분기' : '관망',
    },
    {
      icon: Lightbulb,
      name: '프리랜서/1인 사업',
      score: getFreelanceScore(),
      color: 'from-purple-500 to-violet-600',
      textColor: 'text-purple-400',
      advice: getFreelanceScore() >= 70
        ? '1인 사업으로 큰 성과를 낼 수 있습니다.'
        : getFreelanceScore() >= 50
        ? '부업으로 시작해 본업으로 전환 고려하세요.'
        : '직장과 병행하는 것이 안전합니다.',
      timing: getFreelanceScore() >= 60 ? '연중 가능' : '점진적 전환',
    },
    {
      icon: Users,
      name: '동업',
      score: getPartnershipScore(),
      color: 'from-blue-500 to-cyan-600',
      textColor: 'text-blue-400',
      advice: getPartnershipScore() >= 70
        ? '동업으로 시너지를 낼 수 있습니다.'
        : getPartnershipScore() >= 50
        ? '신뢰할 수 있는 파트너와만 동업하세요.'
        : '동업은 피하고 단독 사업을 권장합니다.',
      timing: getPartnershipScore() >= 60 ? '상반기 파트너 물색' : '단독 사업 권장',
    },
  ];

  // 종합 사업 성향
  const getBusinessProfile = () => {
    const avgScore = (getStartupScore() + getExpansionScore() + getFreelanceScore()) / 3;

    if (avgScore >= 70) {
      return {
        type: '적극 도전형 사업가',
        emoji: '🚀',
        strategy: '사업으로 크게 성공할 수 있는 해입니다. 철저히 준비하고 과감히 도전하세요.',
        strengths: ['강한 추진력', '창의적 아이디어', '수익 창출 능력'],
        caution: '과도한 확장은 주의',
      };
    }
    if (avgScore >= 50) {
      return {
        type: '신중형 사업가',
        emoji: '🎯',
        strategy: '작은 규모부터 시작하여 안정적으로 키워가세요.',
        strengths: ['계획적 실행', '리스크 관리', '꾸준한 성장'],
        caution: '초기 자본 충분히 확보',
      };
    }
    return {
      type: '안정 추구형',
      emoji: '🛡️',
      strategy: '직장 생활을 유지하며 부업으로 시작하는 것이 좋습니다.',
      strengths: ['안정적 수입원', '리스크 최소화', '점진적 전환'],
      caution: '성급한 창업 금물',
    };
  };

  const profile = getBusinessProfile();

  // 업종별 적합도
  const industryFit = [
    {
      category: 'IT/디지털',
      industries: ['앱 개발', '웹 서비스', 'AI/빅데이터', '디지털 마케팅'],
      score: dayElement === '수' || 식상 >= 2 ? 85 : dayElement === '화' ? 75 : 60,
      element: '수/화',
      reason: '변화와 혁신이 빠른 분야',
    },
    {
      category: '제조/생산',
      industries: ['식품 제조', '공예품', '제품 생산', '수입/유통'],
      score: dayElement === '금' || 재성 >= 2 ? 85 : dayElement === '토' ? 75 : 60,
      element: '금/토',
      reason: '실물 자산과 재고 관리',
    },
    {
      category: '서비스업',
      industries: ['카페/음식점', '미용/뷰티', '교육/학원', '컨설팅'],
      score: dayElement === '화' || 식상 >= 2 ? 90 : dayElement === '목' ? 75 : 65,
      element: '화/목',
      reason: '사람과의 소통이 중요',
    },
    {
      category: '부동산/건설',
      industries: ['부동산 중개', '인테리어', '건축', '리모델링'],
      score: dayElement === '토' || 재성 >= 2 ? 90 : dayElement === '금' ? 75 : 55,
      element: '토',
      reason: '토지와 건물 관련',
    },
    {
      category: '교육/문화',
      industries: ['온라인 강의', '출판', '컨텐츠 제작', '예술'],
      score: dayElement === '목' || 인성 >= 2 || 식상 >= 2 ? 85 : 70,
      element: '목/수',
      reason: '지식과 창의성 활용',
    },
    {
      category: '헬스케어',
      industries: ['운동/피트니스', '건강식품', '요가/필라테스', '웰니스'],
      score: dayElement === '목' || dayElement === '화' ? 80 : 65,
      element: '목/화',
      reason: '성장과 활력의 분야',
    },
  ];

  // 월별 사업 전략
  const quarterlyStrategy = [
    {
      quarter: '1분기',
      period: '1-3월',
      focus: '준비 및 계획',
      actions: ['사업 계획서 작성', '시장 조사', '자금 확보', '인허가 준비'],
      priority: '기초 다지기',
    },
    {
      quarter: '2분기',
      period: '4-6월',
      focus: '실행 및 론칭',
      actions: ['사업자 등록', '공간 확보', '인력 채용', '마케팅 시작'],
      priority: '본격 시작',
    },
    {
      quarter: '3분기',
      period: '7-9월',
      focus: '성장 및 확장',
      actions: ['매출 확대', '서비스 개선', '고객 확보', '시스템 구축'],
      priority: '사업 안정화',
    },
    {
      quarter: '4분기',
      period: '10-12월',
      focus: '점검 및 조정',
      actions: ['연말 결산', '성과 분석', '내년 계획', '투자 유치'],
      priority: '내년 준비',
    },
  ];

  // 성공 요인 및 실패 위험
  const successFactors = [
    { factor: '차별화된 아이템', importance: 95, tip: '경쟁사 대비 확실한 강점 필요' },
    { factor: '충분한 초기 자본', importance: 90, tip: '최소 6개월 운영 자금 확보' },
    { factor: '시장 조사와 검증', importance: 85, tip: 'MVP로 시장 반응 테스트' },
    { factor: '실행력과 끈기', importance: 90, tip: '1년은 버틸 각오 필요' },
  ];

  const failureRisks = [
    { risk: '자금 부족', probability: '높음', prevention: '철저한 자금 계획, 여유 자금 확보' },
    { risk: '시장 검증 실패', probability: '중간', prevention: '작게 시작, 피드백 반영' },
    { risk: '무리한 확장', probability: '중간', prevention: '단계적 성장, 수익 재투자' },
    { risk: '동업자 갈등', probability: getPartnershipScore() < 50 ? '높음' : '낮음', prevention: '명확한 계약, 역할 분담' },
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
        💼 사업/창업운 상세 분석
      </h2>
      <p className="text-center text-slate-400 mb-8">
        2026년 {name}님의 사업 적합도와 성공 전략
      </p>

      {/* 사업 성향 프로필 */}
      <div className="glass rounded-2xl p-6 mb-8 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl">{profile.emoji}</span>
          <div>
            <p className="text-slate-400">2026년 사업 성향</p>
            <h3 className="text-2xl font-bold text-orange-400">{profile.type}</h3>
          </div>
        </div>
        <p className="text-slate-300 mb-4">{profile.strategy}</p>

        {/* 강점 및 주의점 */}
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-sm text-green-400 mb-2">💪 강점</p>
            <ul className="space-y-1">
              {profile.strengths.map((strength, index) => (
                <li key={index} className="text-slate-300 text-sm flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  {strength}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm text-amber-400 mb-2">⚠️ 주의점</p>
            <p className="text-slate-300 text-sm">{profile.caution}</p>
          </div>
        </div>
      </div>

      {/* 사업 유형별 점수 */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {businessTypes.map((type, index) => (
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
            <p className="text-slate-500 text-xs">⏰ {type.timing}</p>
          </motion.div>
        ))}
      </div>

      {/* 업종별 적합도 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
          <Store className="w-6 h-6" />
          업종별 적합도 분석
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {industryFit.map((industry, index) => (
            <motion.div
              key={industry.category}
              className="glass rounded-xl p-5 bg-slate-800/30"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-bold text-white">{industry.category}</h4>
                <span className={`text-2xl font-bold ${
                  industry.score >= 80 ? 'text-green-400' :
                  industry.score >= 65 ? 'text-blue-400' :
                  'text-slate-400'
                }`}>
                  {industry.score}점
                </span>
              </div>

              <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-3">
                <motion.div
                  className={`h-full ${
                    industry.score >= 80 ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                    industry.score >= 65 ? 'bg-gradient-to-r from-blue-500 to-cyan-600' :
                    'bg-gradient-to-r from-slate-500 to-slate-600'
                  }`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${industry.score}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                />
              </div>

              <div className="flex flex-wrap gap-1 mb-2">
                {industry.industries.map((item, idx) => (
                  <span key={idx} className="text-xs px-2 py-1 bg-slate-700/50 rounded-full text-slate-300">
                    {item}
                  </span>
                ))}
              </div>
              <p className="text-slate-400 text-xs mb-1">오행: {industry.element}</p>
              <p className="text-slate-500 text-xs">{industry.reason}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 분기별 사업 전략 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
          <Target className="w-6 h-6" />
          2026년 분기별 사업 전략
        </h3>
        <div className="space-y-4">
          {quarterlyStrategy.map((quarter, index) => (
            <motion.div
              key={quarter.quarter}
              className="glass rounded-xl p-5 bg-slate-800/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">{quarter.quarter}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-bold text-white">{quarter.focus}</h4>
                    <span className="text-sm text-slate-400">{quarter.period}</span>
                  </div>
                  <p className="text-purple-400 text-sm mb-2">🎯 {quarter.priority}</p>
                  <div className="flex flex-wrap gap-2">
                    {quarter.actions.map((action, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-purple-500/20 rounded-full text-purple-300">
                        {action}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 성공 요인 */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="glass rounded-2xl p-6">
          <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
            <BarChart3 className="w-6 h-6" />
            성공 핵심 요인
          </h3>
          <div className="space-y-3">
            {successFactors.map((item, index) => (
              <motion.div
                key={item.factor}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white font-bold text-sm">{item.factor}</span>
                  <span className="text-green-400 text-sm">{item.importance}%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-1">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.importance}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
                <p className="text-slate-400 text-xs">{item.tip}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            실패 위험 요인
          </h3>
          <div className="space-y-3">
            {failureRisks.map((item, index) => (
              <motion.div
                key={item.risk}
                className="p-3 bg-slate-800/30 rounded-xl"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-bold text-sm">{item.risk}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.probability === '높음' ? 'bg-red-500/20 text-red-400' :
                    item.probability === '중간' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {item.probability}
                  </span>
                </div>
                <p className="text-slate-400 text-xs">💡 {item.prevention}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 최종 조언 */}
      <div className="glass rounded-2xl p-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30">
        <h3 className="text-xl font-bold text-amber-400 mb-4">💡 2026년 사업 성공 전략</h3>
        <div className="space-y-3 text-slate-300">
          <p className="flex items-start gap-2">
            <span className="text-amber-400 flex-shrink-0">1.</span>
            <span>작게 시작하고 검증 후 확장하세요. 처음부터 큰 투자는 위험합니다.</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-amber-400 flex-shrink-0">2.</span>
            <span>최소 6개월치 운영 자금을 확보한 후 시작하세요.</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-amber-400 flex-shrink-0">3.</span>
            <span>당신의 일주 오행({dayElement})과 조화로운 업종을 선택하세요.</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-amber-400 flex-shrink-0">4.</span>
            <span>동업은 신중하게 결정하고, 명확한 계약서를 작성하세요.</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-amber-400 flex-shrink-0">5.</span>
            <span>직장과 병행하며 부업으로 시작하는 것도 좋은 전략입니다.</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
