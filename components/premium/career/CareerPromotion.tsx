'use client';

import { SajuResult } from '@/lib/saju-calculator';
import { motion } from 'framer-motion';
import { TrendingUp, Star, Target, Award, Users, Zap } from 'lucide-react';

interface CareerPromotionProps {
  result: SajuResult;
  name: string;
  birthDate: Date;
}

const TEN_GOD_PROMOTION: Record<string, {
  promotionLuck: string;
  strategy: string;
  advantage: string;
  challenge: string;
  tip: string;
}> = {
  '비견': {
    promotionLuck: '경쟁자가 많아 승진이 쉽지 않지만, 동료와의 협력으로 돌파구를 찾을 수 있습니다.',
    strategy: '팀 프로젝트에서 리더십을 발휘하고, 협력을 통해 성과를 내세요.',
    advantage: '팀워크 능력과 경쟁력을 동시에 어필할 수 있습니다.',
    challenge: '개인 성과보다 팀 성과로 평가받을 수 있습니다.',
    tip: '동료들과 좋은 관계를 유지하면서 차별화된 역량을 보여주세요.'
  },
  '겁재': {
    promotionLuck: '변동성이 있어 예상치 못한 경쟁에 직면할 수 있지만, 위기를 기회로 바꿀 수 있습니다.',
    strategy: '정치적 감각을 발휘하고, 결정적 순간에 존재감을 드러내세요.',
    advantage: '돌발 상황에서 두각을 나타낼 수 있습니다.',
    challenge: '동료와의 마찰이 승진에 영향을 줄 수 있습니다.',
    tip: '감정적 대응을 자제하고 전략적으로 움직이세요.'
  },
  '식신': {
    promotionLuck: '창의적 아이디어와 기획력으로 인정받아 승진 기회가 열립니다.',
    strategy: '새로운 프로젝트를 제안하고, 혁신적인 성과를 내세요.',
    advantage: '차별화된 역량으로 눈에 띄기 쉽습니다.',
    challenge: '안정적인 업무보다 새로운 시도를 원해 조직과 마찰이 생길 수 있습니다.',
    tip: '기존 질서를 존중하면서 혁신을 추구하세요.'
  },
  '상관': {
    promotionLuck: '표현력과 추진력이 돋보이지만, 상사와의 관계 관리가 중요합니다.',
    strategy: '자신감 있게 의견을 제시하되, 상사의 체면을 세워주세요.',
    advantage: '뛰어난 프레젠테이션 능력으로 어필할 수 있습니다.',
    challenge: '과도한 주장이 상사의 반감을 살 수 있습니다.',
    tip: '때로는 한 발 물러서 상황을 지켜보는 지혜가 필요합니다.'
  },
  '편재': {
    promotionLuck: '실적과 성과로 승진 기회가 열립니다. 재정 관련 역량이 인정받습니다.',
    strategy: '눈에 보이는 수치화된 성과를 만들어내세요.',
    advantage: '매출, 비용 절감 등 구체적인 실적으로 어필할 수 있습니다.',
    challenge: '단기 성과에 집중하다 장기적 관계를 놓칠 수 있습니다.',
    tip: '성과와 함께 조직 내 네트워킹도 중요합니다.'
  },
  '정재': {
    promotionLuck: '안정적이고 꾸준한 성과로 신뢰를 얻어 승진합니다.',
    strategy: '맡은 업무를 완벽하게 수행하고 신뢰를 쌓으세요.',
    advantage: '믿음직한 이미지로 상사의 신임을 얻습니다.',
    challenge: '눈에 띄는 성과가 없어 승진이 늦어질 수 있습니다.',
    tip: '안정적인 성과와 함께 가끔 특별한 성과도 필요합니다.'
  },
  '편관': {
    promotionLuck: '경쟁을 뚫고 실력으로 승부하는 시기입니다. 도전적인 업무에서 기회를 찾으세요.',
    strategy: '어려운 과제를 맡아 해결하며 리더십을 증명하세요.',
    advantage: '위기 상황에서 능력을 발휘할 수 있습니다.',
    challenge: '과도한 경쟁으로 스트레스가 심할 수 있습니다.',
    tip: '건강 관리와 스트레스 해소에 신경 쓰세요.'
  },
  '정관': {
    promotionLuck: '가장 유리한 승진 운입니다. 조직 내 인정을 받고 자연스럽게 승진합니다.',
    strategy: '규정을 준수하며 모범적인 모습을 보여주세요.',
    advantage: '상사의 인정과 조직의 신뢰를 동시에 얻습니다.',
    challenge: '너무 원칙적이면 유연성이 부족해 보일 수 있습니다.',
    tip: '원칙과 유연성의 균형을 찾으세요.'
  },
  '편인': {
    promotionLuck: '전문성 개발에 좋은 시기이나, 승진보다는 역량 축적에 집중하는 것이 좋습니다.',
    strategy: '새로운 기술이나 자격증을 취득하여 전문성을 강화하세요.',
    advantage: '깊은 전문 지식으로 차별화됩니다.',
    challenge: '현장 실무보다 이론에 치우칠 수 있습니다.',
    tip: '배운 것을 실무에 적용하는 연습을 하세요.'
  },
  '정인': {
    promotionLuck: '멘토나 상사의 도움으로 승진 기회가 열립니다.',
    strategy: '좋은 관계를 맺고 있는 윗사람의 조언을 따르세요.',
    advantage: '귀인의 도움으로 순탄하게 승진할 수 있습니다.',
    challenge: '자신의 능력보다 외부 도움에 의존할 수 있습니다.',
    tip: '도움받으면서도 자신의 역량을 키우세요.'
  }
};

export default function CareerPromotion({ result, name, birthDate }: CareerPromotionProps) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthDate.getFullYear() + 1;
  const yearTenGod = result.tenGods.year;
  const promotion = TEN_GOD_PROMOTION[yearTenGod] || TEN_GOD_PROMOTION['비견'];

  // 승진 점수 계산
  const calculatePromotionScore = () => {
    let score = 50;
    const { 관성, 재성, 인성, 비겁 } = result.tenGodsCount;

    if (['정관', '편관'].includes(yearTenGod)) score += 20;
    if (['정재', '편재'].includes(yearTenGod)) score += 12;
    if (관성 >= 1) score += 10;
    if (인성 >= 1) score += 8;
    if (재성 >= 1) score += 5;
    if (비겁 >= 3) score -= 10;

    // 나이에 따른 조정
    if (age >= 35 && age <= 50) score += 10;

    return Math.min(Math.max(score, 25), 95);
  };

  const promotionScore = calculatePromotionScore();

  const getScoreGrade = () => {
    if (promotionScore >= 80) return { grade: '최상', color: 'text-yellow-400', bg: 'from-yellow-500/20 to-amber-500/20' };
    if (promotionScore >= 65) return { grade: '상', color: 'text-emerald-400', bg: 'from-emerald-500/20 to-teal-500/20' };
    if (promotionScore >= 50) return { grade: '중', color: 'text-blue-400', bg: 'from-blue-500/20 to-indigo-500/20' };
    return { grade: '노력필요', color: 'text-rose-400', bg: 'from-rose-500/20 to-pink-500/20' };
  };

  const gradeInfo = getScoreGrade();

  // 승진 적기 년도 계산
  const promotionYears = [];
  const goodTenGods = ['정관', '편재', '정재', '식신'];
  for (let i = 0; i < 5; i++) {
    const yearStem = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'][(currentYear + i + 6) % 10];
    const dayIndex = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'].indexOf(result.day.stem.ko);
    const targetIndex = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'].indexOf(yearStem);
    const diff = (targetIndex - dayIndex + 10) % 10;
    const tenGod = ['비견', '겁재', '식신', '상관', '편재', '정재', '편관', '정관', '편인', '정인'][diff];
    if (goodTenGods.includes(tenGod)) {
      promotionYears.push({ year: currentYear + i, tenGod });
    }
  }

  return (
    <motion.section
      className="glass-strong rounded-3xl p-6 md:p-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500/20 to-violet-500/20">
          <TrendingUp className="w-7 h-7 text-purple-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            승진운 분석
          </h2>
          <p className="text-slate-400 text-sm">{currentYear}년 {name}님의 승진 전망</p>
        </div>
      </div>

      {/* 승진 점수 */}
      <div className={`glass rounded-2xl p-6 mb-6 bg-gradient-to-br ${gradeInfo.bg}`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-slate-400 mb-1">승진운 점수</p>
            <div className="flex items-end gap-2">
              <span className={`text-5xl font-bold ${gradeInfo.color}`}>{promotionScore}</span>
              <span className="text-xl text-slate-400 mb-1">점</span>
            </div>
            <p className={`font-medium ${gradeInfo.color} mt-1`}>{gradeInfo.grade}</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-slate-400 text-sm">올해 운: {yearTenGod}</p>
            <p className="text-slate-400 text-sm">현재 나이: {age}세</p>
          </div>
        </div>
      </div>

      {/* 승진 운세 상세 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 text-cyan-400 mb-3">
            <Star className="w-5 h-5" />
            <h3 className="font-semibold">승진 운세</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{promotion.promotionLuck}</p>
        </div>

        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 text-emerald-400 mb-3">
            <Target className="w-5 h-5" />
            <h3 className="font-semibold">승진 전략</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{promotion.strategy}</p>
        </div>

        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 text-amber-400 mb-3">
            <Award className="w-5 h-5" />
            <h3 className="font-semibold">강점</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{promotion.advantage}</p>
        </div>

        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <Users className="w-5 h-5" />
            <h3 className="font-semibold">주의점</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{promotion.challenge}</p>
        </div>
      </div>

      {/* 승진 팁 */}
      <div className="glass rounded-2xl p-6 mb-6 bg-gradient-to-r from-purple-500/10 to-violet-500/10">
        <div className="flex items-start gap-3">
          <Zap className="w-6 h-6 text-purple-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-purple-300 mb-2">💡 핵심 승진 팁</h3>
            <p className="text-slate-300 leading-relaxed">{promotion.tip}</p>
          </div>
        </div>
      </div>

      {/* 승진 적기 년도 */}
      {promotionYears.length > 0 && (
        <div className="glass rounded-2xl p-6">
          <h3 className="font-bold text-white mb-4">📈 향후 승진에 유리한 해</h3>
          <div className="flex flex-wrap gap-3">
            {promotionYears.map((item, idx) => (
              <motion.div
                key={idx}
                className="px-5 py-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl border border-emerald-500/30"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <p className="font-bold text-emerald-400">{item.year}년</p>
                <p className="text-sm text-slate-400">{item.tenGod}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.section>
  );
}
