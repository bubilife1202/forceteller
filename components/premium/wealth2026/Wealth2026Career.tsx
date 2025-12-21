'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Briefcase, TrendingUp, Award, Users, Target, Lightbulb, Clock, Shield } from 'lucide-react';

interface Wealth2026CareerProps {
  result: SajuResult;
  name: string;
  baseScore: number;
}

export default function Wealth2026Career({ result, name, baseScore }: Wealth2026CareerProps) {
  const dayElement = result.day.stem.element;
  const { 관성, 인성, 식상, 재성, 비겁 } = result.tenGodsCount;

  // 직장운 분석
  const getCareerAnalysis = () => {
    let score = 50;

    // 관성이 강하면 직장 생활 유리
    if (관성 >= 2) score += 20;
    else if (관성 >= 1) score += 10;

    // 인성이 있으면 인정받음
    if (인성 >= 1) score += 10;

    // 2026년 병오년과의 관계
    if (dayElement === '토') score += 15; // 화생토
    if (dayElement === '금') score -= 10; // 화극금

    return Math.min(Math.max(score, 30), 100);
  };

  const careerScore = getCareerAnalysis();

  // 승진 가능성
  const getPromotionChance = () => {
    if (관성 >= 2 && careerScore >= 70) {
      return { level: '매우 높음', percentage: '70%', advice: '적극적으로 성과를 어필하세요. 승진 심사에서 좋은 결과가 기대됩니다.' };
    }
    if (관성 >= 1 && careerScore >= 60) {
      return { level: '높음', percentage: '55%', advice: '꾸준한 노력이 인정받을 시기입니다. 상사와의 관계를 잘 유지하세요.' };
    }
    if (careerScore >= 50) {
      return { level: '보통', percentage: '40%', advice: '실력 향상에 집중하세요. 자격증 취득이나 성과 개선이 필요합니다.' };
    }
    return { level: '낮음', percentage: '25%', advice: '올해는 기반을 다지는 시기입니다. 다음 기회를 준비하세요.' };
  };

  const promotion = getPromotionChance();

  // 연봉 협상 전략
  const getSalaryStrategy = () => {
    const strategies = [];

    if (재성 >= 2) {
      strategies.push({
        title: '성과 기반 협상',
        detail: '숫자로 증명할 수 있는 성과를 정리하세요. 매출 기여도, 비용 절감, 프로젝트 성공 등 구체적인 수치가 중요합니다.',
        timing: '상반기 성과 평가 후 (6-7월)',
        expectedIncrease: '10-15%'
      });
    }

    if (관성 >= 2) {
      strategies.push({
        title: '직급/직책 협상',
        detail: '연봉 인상과 함께 직급 상향이나 팀장 승격을 요청하세요. 책임 증가에 따른 보상을 요구할 수 있습니다.',
        timing: '연말 인사 시즌 (11-12월)',
        expectedIncrease: '15-20%'
      });
    }

    if (식상 >= 2) {
      strategies.push({
        title: '역할 확대 협상',
        detail: '새로운 프로젝트나 업무 영역 확대를 제안하고, 그에 맞는 보상을 요청하세요.',
        timing: '신규 프로젝트 시작 시',
        expectedIncrease: '8-12%'
      });
    }

    if (인성 >= 2) {
      strategies.push({
        title: '전문성 기반 협상',
        detail: '자격증 취득, 교육 이수 등 전문성 향상을 근거로 협상하세요. 희소 스킬의 가치를 강조하세요.',
        timing: '자격증 취득 직후',
        expectedIncrease: '8-15%'
      });
    }

    if (strategies.length === 0) {
      strategies.push({
        title: '시장 가치 협상',
        detail: '동종 업계 연봉 데이터를 조사하고, 본인의 시장 가치를 객관적으로 제시하세요.',
        timing: '연봉 협상 시즌 (1-2월)',
        expectedIncrease: '5-10%'
      });
    }

    return strategies;
  };

  const salaryStrategies = getSalaryStrategy();

  // 직업별 조언
  const getJobTypeAdvice = () => {
    if (관성 >= 2) {
      return {
        type: '관리직/임원형',
        emoji: '👔',
        current: '조직 내 리더십을 발휘하기 좋은 해입니다.',
        focus: ['팀 성과 관리', '상위 직급과의 관계', '전략적 사고력'],
        avoid: ['독단적 결정', '팀원과의 갈등', '정치적 실수']
      };
    }
    if (인성 >= 2) {
      return {
        type: '전문직/연구직형',
        emoji: '🎓',
        current: '전문성이 인정받는 해입니다. 논문, 특허, 발표 등에 좋습니다.',
        focus: ['깊이 있는 연구', '지식 축적', '후배 양성'],
        avoid: ['얕은 지식', '트렌드만 따라가기', '자만심']
      };
    }
    if (식상 >= 2) {
      return {
        type: '크리에이티브/기획형',
        emoji: '💡',
        current: '창의적인 아이디어가 빛나는 해입니다. 새로운 프로젝트를 제안하세요.',
        focus: ['혁신적 아이디어', '기획력', '프레젠테이션'],
        avoid: ['실행력 부족', '너무 앞서가는 아이디어', '현실 무시']
      };
    }
    if (재성 >= 2) {
      return {
        type: '영업/사업개발형',
        emoji: '📈',
        current: '거래와 계약에 유리한 해입니다. 새로운 고객이나 파트너를 확보하세요.',
        focus: ['신규 거래처 발굴', '매출 증대', '네트워킹'],
        avoid: ['무리한 약속', '신뢰 훼손', '단기 이익만 추구']
      };
    }
    return {
      type: '균형형',
      emoji: '⚖️',
      current: '다양한 역할을 수행하기 좋은 해입니다.',
      focus: ['역할 다양화', '적응력', '팀워크'],
      avoid: ['한 분야만 고집', '변화 거부', '고립']
    };
  };

  const jobAdvice = getJobTypeAdvice();

  // 이직/전직 분석
  const getCareerChangeAnalysis = () => {
    const isGoodTiming = (관성 >= 1 && 재성 >= 1) || (careerScore >= 65);

    return {
      recommendation: isGoodTiming ? '이직 고려 가능' : '현 직장 유지 권장',
      timing: isGoodTiming ?
        ['3-4월 (상반기 채용 시즌)', '9-10월 (하반기 채용 시즌)'] :
        ['현 직장에서 성과를 더 쌓은 후'],
      preparation: [
        '이력서/포트폴리오 업데이트',
        '링크드인 프로필 정비',
        '업계 네트워크 확대',
        '관심 기업 리서치',
        '면접 준비'
      ],
      caution: isGoodTiming ?
        '무조건 이직보다 조건을 꼼꼼히 비교하세요. 연봉 20% 이상 상승이 아니면 신중하게 판단하세요.' :
        '성급한 이직은 경력에 악영향을 줄 수 있습니다. 2-3년 이상 재직 후 이동을 고려하세요.'
    };
  };

  const careerChange = getCareerChangeAnalysis();

  // 월별 직장운
  const getMonthlyCareerFortune = () => {
    return [
      { month: '1월', fortune: '새해 목표 설정', action: '연간 업무 목표를 상사와 공유하세요', star: 3 },
      { month: '2월', fortune: '실력 발휘 시작', action: '중요 프로젝트에 자원하세요', star: 4 },
      { month: '3월', fortune: '성과 가시화', action: '결과물을 정리하고 보고하세요', star: 4 },
      { month: '4월', fortune: '협업 기회', action: '다른 팀과의 협력 프로젝트가 좋습니다', star: 3 },
      { month: '5월', fortune: '인정받는 시기', action: '상사에게 성과를 어필하세요', star: 5 },
      { month: '6월', fortune: '상반기 마무리', action: '상반기 성과 평가를 준비하세요', star: 4 },
      { month: '7월', fortune: '휴식과 재충전', action: '번아웃 방지, 적절한 휴가를 가세요', star: 3 },
      { month: '8월', fortune: '역량 개발', action: '교육/자격증 취득에 집중하세요', star: 3 },
      { month: '9월', fortune: '기회 포착', action: '새로운 업무 기회를 잡으세요', star: 4 },
      { month: '10월', fortune: '결실의 시기', action: '올해 주요 프로젝트를 마무리하세요', star: 5 },
      { month: '11월', fortune: '평가 시즌', action: '연말 인사고과를 대비하세요', star: 4 },
      { month: '12월', fortune: '내년 준비', action: '내년 목표와 계획을 세우세요', star: 3 }
    ];
  };

  const monthlyCareer = getMonthlyCareerFortune();

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
        💼 2026년 직장/승진운
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님의 커리어 성장과 연봉 상승 전략
      </p>

      {/* 직장운 점수 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-blue-400">직장운 {careerScore}점</h3>
            <p className="text-slate-400">
              {careerScore >= 80 ? '최고의 해! 승진과 인정이 기대됩니다' :
               careerScore >= 65 ? '좋은 해! 성과를 낼 수 있습니다' :
               careerScore >= 50 ? '보통의 해! 꾸준함이 필요합니다' :
               '도전의 해! 내실을 다지세요'}
            </p>
          </div>
        </div>
        <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
            initial={{ width: 0 }}
            whileInView={{ width: `${careerScore}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>

      {/* 승진 가능성 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-6 h-6 text-green-400" />
          <h3 className="text-xl font-bold text-green-400">승진 가능성 분석</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div className="text-center p-4 glass rounded-xl">
            <p className="text-slate-400 text-sm">승진 가능성</p>
            <p className="text-2xl font-bold text-green-400">{promotion.level}</p>
          </div>
          <div className="text-center p-4 glass rounded-xl">
            <p className="text-slate-400 text-sm">예상 확률</p>
            <p className="text-2xl font-bold text-amber-400">{promotion.percentage}</p>
          </div>
          <div className="text-center p-4 glass rounded-xl">
            <p className="text-slate-400 text-sm">관성 보유</p>
            <p className="text-2xl font-bold text-purple-400">{관성}개</p>
          </div>
        </div>
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
          <p className="text-green-300">💡 <strong>조언:</strong> {promotion.advice}</p>
        </div>
      </div>

      {/* 직업 유형 분석 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-3xl">
            {jobAdvice.emoji}
          </div>
          <div>
            <h3 className="text-xl font-bold text-purple-400">{name}님의 직업 유형</h3>
            <p className="text-white text-lg font-semibold">{jobAdvice.type}</p>
          </div>
        </div>
        <p className="text-slate-300 mb-4">{jobAdvice.current}</p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="glass rounded-xl p-4">
            <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
              <Target className="w-4 h-4" /> 집중해야 할 영역
            </h4>
            <ul className="space-y-2">
              {jobAdvice.focus.map((item, idx) => (
                <li key={idx} className="text-slate-300 text-sm flex items-center gap-2">
                  <span className="text-green-400">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-xl p-4">
            <h4 className="font-semibold text-red-400 mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4" /> 피해야 할 것
            </h4>
            <ul className="space-y-2">
              {jobAdvice.avoid.map((item, idx) => (
                <li key={idx} className="text-slate-300 text-sm flex items-center gap-2">
                  <span className="text-red-400">✗</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 연봉 협상 전략 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Award className="w-6 h-6 text-amber-400" />
          <h3 className="text-xl font-bold text-amber-400">연봉 협상 전략</h3>
        </div>
        <div className="space-y-4">
          {salaryStrategies.map((strategy, idx) => (
            <motion.div
              key={idx}
              className="glass rounded-xl p-5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-semibold text-white text-lg">{strategy.title}</h4>
                <span className="text-amber-400 font-bold">+{strategy.expectedIncrease}</span>
              </div>
              <p className="text-slate-300 text-sm mb-3 leading-relaxed">{strategy.detail}</p>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Clock className="w-4 h-4" />
                <span>최적 시기: {strategy.timing}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 이직/전직 분석 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Users className="w-6 h-6 text-cyan-400" />
          <h3 className="text-xl font-bold text-cyan-400">이직/전직 분석</h3>
        </div>

        <div className={`p-4 rounded-xl mb-4 ${
          careerChange.recommendation.includes('가능')
            ? 'bg-green-500/10 border border-green-500/30'
            : 'bg-yellow-500/10 border border-yellow-500/30'
        }`}>
          <p className={`font-bold text-lg ${
            careerChange.recommendation.includes('가능') ? 'text-green-400' : 'text-yellow-400'
          }`}>
            📊 {careerChange.recommendation}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="glass rounded-xl p-4">
            <h4 className="font-semibold text-slate-300 mb-3">추천 이직 시기</h4>
            <ul className="space-y-2">
              {careerChange.timing.map((time, idx) => (
                <li key={idx} className="text-slate-400 text-sm flex items-center gap-2">
                  <span className="text-cyan-400">•</span> {time}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-xl p-4">
            <h4 className="font-semibold text-slate-300 mb-3">이직 준비 체크리스트</h4>
            <ul className="space-y-2">
              {careerChange.preparation.map((prep, idx) => (
                <li key={idx} className="text-slate-400 text-sm flex items-center gap-2">
                  <span className="w-4 h-4 border border-slate-600 rounded flex-shrink-0" />
                  {prep}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
          <p className="text-amber-300 text-sm">⚠️ <strong>주의:</strong> {careerChange.caution}</p>
        </div>
      </div>

      {/* 월별 직장운 */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Lightbulb className="w-6 h-6 text-yellow-400" />
          <h3 className="text-xl font-bold text-yellow-400">월별 직장운 캘린더</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {monthlyCareer.map((month, idx) => (
            <motion.div
              key={idx}
              className="glass rounded-xl p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-white">{month.month}</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-xs ${i < month.star ? 'text-yellow-400' : 'text-slate-600'}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-amber-400 text-sm font-medium mb-1">{month.fortune}</p>
              <p className="text-slate-400 text-xs">{month.action}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
