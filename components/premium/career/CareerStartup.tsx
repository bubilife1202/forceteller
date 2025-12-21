'use client';

import { SajuResult } from '@/lib/saju-calculator';
import { motion } from 'framer-motion';
import { Rocket, Target, AlertTriangle, Users, Lightbulb, TrendingUp } from 'lucide-react';

interface CareerStartupProps {
  result: SajuResult;
  name: string;
  birthDate: Date;
}

const ELEMENT_STARTUP: Record<string, {
  aptitude: string;
  businessType: string[];
  strength: string;
  weakness: string;
  partnerElement: string;
  timing: string;
  advice: string;
}> = {
  '목': {
    aptitude: '새로운 분야를 개척하고 성장시키는 능력이 뛰어납니다. 교육, 콘텐츠, 바이오 분야에서 창업 적성이 높습니다.',
    businessType: ['교육 플랫폼', '콘텐츠 제작', '친환경 사업', '출판', '헬스케어', '코칭/컨설팅'],
    strength: '비전 제시와 성장 전략 수립에 강합니다. 사람을 키우고 조직을 성장시키는 능력이 있습니다.',
    weakness: '실무와 재정 관리에 소홀할 수 있습니다. 너무 이상적인 목표를 세울 수 있습니다.',
    partnerElement: '금(金) 또는 토(土) 성향의 파트너가 부족한 부분을 보완해줍니다.',
    timing: '30대 중반~40대 초반이 창업 적기입니다. 충분한 경험과 네트워크를 쌓은 후 시작하세요.',
    advice: '초기에는 작게 시작하되, 명확한 성장 로드맵을 갖고 시작하세요.'
  },
  '화': {
    aptitude: '열정과 카리스마로 사업을 이끄는 능력이 탁월합니다. 마케팅, 엔터테인먼트, 요식업에서 두각을 나타냅니다.',
    businessType: ['마케팅 에이전시', '엔터테인먼트', '레스토랑/카페', '패션', 'SNS 마케팅', '이벤트 기획'],
    strength: '사람들에게 영감을 주고 빠른 추진력으로 사업을 성장시킵니다.',
    weakness: '지속적인 관리와 세부 사항에 소홀할 수 있습니다. 번아웃 위험이 있습니다.',
    partnerElement: '수(水) 또는 금(金) 성향의 파트너가 냉정한 판단을 도와줍니다.',
    timing: '20대 후반~30대 초반에 창업 도전이 좋습니다. 열정이 넘칠 때 시작하세요.',
    advice: '열정을 유지하면서도 재정과 운영을 관리할 시스템을 갖추세요.'
  },
  '토': {
    aptitude: '안정적이고 신뢰할 수 있는 사업을 운영하는 능력이 있습니다. 부동산, 금융, 요식업에 적합합니다.',
    businessType: ['부동산 중개', '프랜차이즈', '금융 서비스', '농업/식품', '컨설팅', '안정적인 B2B'],
    strength: '신뢰를 쌓고 장기적인 관계를 구축하는 능력이 탁월합니다.',
    weakness: '변화에 느리게 대응하고, 새로운 기회를 놓칠 수 있습니다.',
    partnerElement: '목(木) 또는 화(火) 성향의 파트너가 활력과 혁신을 더해줍니다.',
    timing: '40대 이후 안정적인 자본과 네트워크를 확보한 후 시작하는 것이 좋습니다.',
    advice: '급하게 성장하려 하지 말고, 신뢰를 바탕으로 천천히 성장하세요.'
  },
  '금': {
    aptitude: '체계적이고 효율적인 사업 운영 능력이 뛰어납니다. 기술, 금융, 정밀 서비스에 적합합니다.',
    businessType: ['IT 서비스', '금융 컨설팅', '법률 서비스', '정밀 제조', '품질 관리', 'B2B 솔루션'],
    strength: '효율적인 시스템 구축과 품질 관리에 강합니다. 논리적인 의사결정을 내립니다.',
    weakness: '너무 완벽을 추구해 시작이 늦어질 수 있습니다. 융통성이 부족할 수 있습니다.',
    partnerElement: '화(火) 또는 목(木) 성향의 파트너가 추진력과 창의성을 더해줍니다.',
    timing: '35~45세에 충분한 전문성과 자본을 갖추고 시작하는 것이 좋습니다.',
    advice: '완벽한 준비보다 빠른 실행과 개선을 반복하는 전략이 필요합니다.'
  },
  '수': {
    aptitude: '트렌드를 읽고 새로운 기회를 포착하는 능력이 탁월합니다. 무역, 마케팅, 창작 분야에 적합합니다.',
    businessType: ['무역업', '디지털 마케팅', '콘텐츠 크리에이터', '컨설팅', '교육', '해외 사업'],
    strength: '변화를 읽고 유연하게 대응하는 능력이 있습니다. 네트워킹에 강합니다.',
    weakness: '방향을 자주 바꿔 일관성이 부족할 수 있습니다. 실행력이 분산될 수 있습니다.',
    partnerElement: '토(土) 또는 금(金) 성향의 파트너가 안정성과 체계를 더해줍니다.',
    timing: '경험과 네트워크가 풍부해지는 30대 후반~40대 초반이 좋습니다.',
    advice: '하나의 방향에 집중하고, 안정적인 파트너와 함께 시작하세요.'
  }
};

export default function CareerStartup({ result, name, birthDate }: CareerStartupProps) {
  const dayElement = result.day.stem.element;
  const startup = ELEMENT_STARTUP[dayElement] || ELEMENT_STARTUP['목'];
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthDate.getFullYear() + 1;

  // 창업 적합도 점수 계산
  const calculateStartupScore = () => {
    let score = 50;
    const { 식상, 재성, 비겁, 인성 } = result.tenGodsCount;

    if (식상 >= 2) score += 15; // 창의력
    if (재성 >= 1) score += 12; // 재물 감각
    if (비겁 >= 1 && 비겁 <= 2) score += 8; // 적당한 경쟁심
    if (인성 >= 2) score += 5; // 학습 능력

    // 나이에 따른 조정
    if (age >= 30 && age <= 45) score += 10;
    if (age < 25) score -= 5;
    if (age > 55) score -= 8;

    // 오행별 조정
    if (dayElement === '화' || dayElement === '목') score += 8;
    if (dayElement === '토') score += 5;

    return Math.min(Math.max(score, 30), 95);
  };

  const startupScore = calculateStartupScore();

  const getGrade = () => {
    if (startupScore >= 80) return { grade: '탁월', color: 'text-yellow-400', advice: '창업에 매우 유리한 사주입니다.' };
    if (startupScore >= 65) return { grade: '우수', color: 'text-emerald-400', advice: '충분한 준비 후 도전하면 성공 가능성이 높습니다.' };
    if (startupScore >= 50) return { grade: '보통', color: 'text-blue-400', advice: '파트너와 함께라면 성공할 수 있습니다.' };
    return { grade: '신중', color: 'text-rose-400', advice: '직장 생활이 더 맞을 수 있습니다. 부업으로 시작하세요.' };
  };

  const gradeInfo = getGrade();

  return (
    <motion.section
      className="glass-strong rounded-3xl p-6 md:p-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20">
          <Rocket className="w-7 h-7 text-orange-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            창업운 분석
          </h2>
          <p className="text-slate-400 text-sm">{name}님의 사업가 적성</p>
        </div>
      </div>

      {/* 창업 적합도 점수 */}
      <div className="glass rounded-2xl p-6 mb-6 bg-gradient-to-br from-orange-500/10 to-red-500/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-slate-400 mb-1">창업 적합도</p>
            <div className="flex items-end gap-2">
              <span className={`text-5xl font-bold ${gradeInfo.color}`}>{startupScore}</span>
              <span className="text-xl text-slate-400 mb-1">점</span>
            </div>
            <p className={`font-medium ${gradeInfo.color} mt-1`}>{gradeInfo.grade}</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-slate-300 text-sm">{gradeInfo.advice}</p>
          </div>
        </div>
      </div>

      {/* 창업 적성 */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 text-cyan-400 mb-3">
          <Target className="w-5 h-5" />
          <h3 className="font-semibold">창업 적성</h3>
        </div>
        <p className="text-slate-300 leading-relaxed">{startup.aptitude}</p>
      </div>

      {/* 추천 사업 분야 */}
      <div className="glass rounded-2xl p-6 mb-6">
        <h3 className="font-bold text-white mb-4">💼 추천 사업 분야</h3>
        <div className="flex flex-wrap gap-3">
          {startup.businessType.map((type, idx) => (
            <motion.span
              key={idx}
              className="px-4 py-2 bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-amber-300 rounded-xl border border-amber-500/30"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              {type}
            </motion.span>
          ))}
        </div>
      </div>

      {/* 강점과 약점 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="glass rounded-2xl p-5 border border-emerald-500/30">
          <div className="flex items-center gap-2 text-emerald-400 mb-3">
            <TrendingUp className="w-5 h-5" />
            <h3 className="font-semibold">창업 강점</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{startup.strength}</p>
        </div>

        <div className="glass rounded-2xl p-5 border border-rose-500/30">
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-semibold">주의할 점</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{startup.weakness}</p>
        </div>
      </div>

      {/* 파트너 & 시기 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 text-purple-400 mb-3">
            <Users className="w-5 h-5" />
            <h3 className="font-semibold">이상적인 동업자</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{startup.partnerElement}</p>
        </div>

        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 text-blue-400 mb-3">
            <Lightbulb className="w-5 h-5" />
            <h3 className="font-semibold">창업 적기</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{startup.timing}</p>
        </div>
      </div>

      {/* 핵심 조언 */}
      <div className="glass rounded-2xl p-6 bg-gradient-to-r from-orange-500/10 to-red-500/10">
        <div className="flex items-start gap-3">
          <Rocket className="w-6 h-6 text-orange-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-orange-300 mb-2">🚀 핵심 창업 조언</h3>
            <p className="text-slate-300 leading-relaxed">{startup.advice}</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
