'use client';

import { SajuResult } from '@/lib/saju-calculator';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, Star, Target, AlertCircle, Lightbulb } from 'lucide-react';

interface CareerForecastProps {
  result: SajuResult;
  name: string;
  birthDate: Date;
}

const STEMS = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
const TEN_GODS = ['비견', '겁재', '식신', '상관', '편재', '정재', '편관', '정관', '편인', '정인'];

const TEN_GOD_FORECAST_2026: Record<string, {
  overall: string;
  careerLuck: string;
  opportunity: string;
  challenge: string;
  keyMonths: { month: string; description: string }[];
  actionPlan: string;
  luckyDirection: string;
}> = {
  '비견': {
    overall: '2026년 병오(丙午)년은 경쟁이 치열해지는 해입니다. 동료와의 협력이 중요합니다.',
    careerLuck: '팀 프로젝트에서 리더십을 발휘하면 인정받을 수 있습니다. 개인보다 팀 성과에 집중하세요.',
    opportunity: '협업을 통한 시너지 창출, 팀 리더 포지션 기회',
    challenge: '경쟁자와의 갈등, 개인 성과 인정 부족',
    keyMonths: [
      { month: '3월', description: '팀 프로젝트 시작의 적기' },
      { month: '6월', description: '중요한 협업 기회' },
      { month: '9월', description: '성과 정리의 시기' }
    ],
    actionPlan: '동료와 좋은 관계를 유지하면서 자신만의 차별화 포인트를 만드세요.',
    luckyDirection: '동쪽, 남동쪽'
  },
  '겁재': {
    overall: '2026년은 변동성이 있는 해입니다. 신중한 판단과 리스크 관리가 필요합니다.',
    careerLuck: '예상치 못한 변화에 유연하게 대응해야 합니다. 충동적인 결정은 피하세요.',
    opportunity: '위기를 기회로 전환, 새로운 분야 도전',
    challenge: '불안정한 상황, 갈등 상황 관리',
    keyMonths: [
      { month: '2월', description: '신중한 판단 필요' },
      { month: '5월', description: '변화의 조짐' },
      { month: '10월', description: '안정화의 시기' }
    ],
    actionPlan: '감정적 대응을 자제하고 장기적 관점에서 결정하세요.',
    luckyDirection: '남쪽, 남서쪽'
  },
  '식신': {
    overall: '2026년은 창의력이 빛나는 해입니다. 아이디어가 인정받고 기회로 연결됩니다.',
    careerLuck: '새로운 프로젝트 제안이 받아들여질 확률이 높습니다. 적극적으로 아이디어를 내세요.',
    opportunity: '창의적 프로젝트 주도, 새로운 역할 기회',
    challenge: '실행력 부족, 너무 많은 아이디어 분산',
    keyMonths: [
      { month: '4월', description: '아이디어 제안 적기' },
      { month: '7월', description: '프로젝트 본격화' },
      { month: '11월', description: '성과 발표 시기' }
    ],
    actionPlan: '아이디어를 정리하고 실현 가능한 계획으로 발전시키세요.',
    luckyDirection: '동쪽, 남동쪽'
  },
  '상관': {
    overall: '2026년은 표현력이 극대화되는 해입니다. 자신감 있게 어필하되 과도한 주장은 조심하세요.',
    careerLuck: '프레젠테이션, 협상에서 좋은 결과를 얻을 수 있습니다. 때와 장소를 가려 표현하세요.',
    opportunity: '대외 활동, 발표 기회, 새로운 도전',
    challenge: '상사와의 마찰, 과도한 표현으로 인한 오해',
    keyMonths: [
      { month: '3월', description: '중요한 발표 기회' },
      { month: '8월', description: '갈등 주의 시기' },
      { month: '12월', description: '성과 정리' }
    ],
    actionPlan: '자신감과 겸손의 균형을 찾으세요. 상사의 체면을 세워주세요.',
    luckyDirection: '남쪽, 동쪽'
  },
  '편재': {
    overall: '2026년은 재물운이 활발한 해입니다. 다양한 수입원이 열리고 기회가 많습니다.',
    careerLuck: '성과 기반 직종에서 큰 성과를 낼 수 있습니다. 영업, 사업개발에 유리합니다.',
    opportunity: '새로운 수입원, 성과급 기회, 투자 수익',
    challenge: '지출 관리, 너무 많은 기회에 분산',
    keyMonths: [
      { month: '5월', description: '재물 유입의 시기' },
      { month: '9월', description: '투자 기회' },
      { month: '11월', description: '수확의 시기' }
    ],
    actionPlan: '기회를 잡되 리스크 관리를 철저히 하세요. 저축도 잊지 마세요.',
    luckyDirection: '서쪽, 북서쪽'
  },
  '정재': {
    overall: '2026년은 안정적인 성장의 해입니다. 꾸준한 노력이 결실을 맺습니다.',
    careerLuck: '조직 내 신뢰가 높아지고 안정적인 성장이 기대됩니다. 급하게 서두르지 마세요.',
    opportunity: '정기 승진, 안정적인 연봉 인상',
    challenge: '눈에 띄는 성과 부족, 기회 놓침',
    keyMonths: [
      { month: '6월', description: '인사 시즌' },
      { month: '9월', description: '성과 평가' },
      { month: '12월', description: '연말 정산' }
    ],
    actionPlan: '꾸준한 성과로 신뢰를 쌓고, 때때로 가시적인 성과도 만드세요.',
    luckyDirection: '서쪽, 남서쪽'
  },
  '편관': {
    overall: '2026년은 도전과 경쟁의 해입니다. 승부를 걸어볼 만한 기회가 있습니다.',
    careerLuck: '어려운 프로젝트를 맡아 성과를 내면 크게 인정받습니다. 도전을 두려워하지 마세요.',
    opportunity: '리더십 포지션, 도전적 프로젝트',
    challenge: '스트레스, 과도한 경쟁',
    keyMonths: [
      { month: '4월', description: '도전 기회' },
      { month: '7월', description: '경쟁의 정점' },
      { month: '10월', description: '결과 도출' }
    ],
    actionPlan: '건강 관리하면서 도전하세요. 무리하지 마세요.',
    luckyDirection: '남쪽, 동쪽'
  },
  '정관': {
    overall: '2026년은 가장 유리한 해입니다. 조직 내 인정과 승진 기회가 열립니다.',
    careerLuck: '상사의 신임을 얻고 승진할 가능성이 높습니다. 모범적인 모습을 보여주세요.',
    opportunity: '승진, 중요 역할 배정, 조직 내 인정',
    challenge: '책임 증가, 기대 관리',
    keyMonths: [
      { month: '3월', description: '인사 발표' },
      { month: '6월', description: '중요 프로젝트' },
      { month: '9월', description: '성과 인정' }
    ],
    actionPlan: '조직의 기대에 부응하면서 자신의 가치를 높이세요.',
    luckyDirection: '남쪽, 남동쪽'
  },
  '편인': {
    overall: '2026년은 학습과 성장의 해입니다. 역량 개발에 투자하는 것이 좋습니다.',
    careerLuck: '당장의 성과보다 장기적 역량 개발에 집중하세요. 자격증, 학위가 유리합니다.',
    opportunity: '학습 기회, 새로운 기술 습득',
    challenge: '당장의 성과 압박',
    keyMonths: [
      { month: '2월', description: '학습 시작' },
      { month: '5월', description: '자격증 도전' },
      { month: '10월', description: '역량 발휘' }
    ],
    actionPlan: '배운 것을 실무에 적용하는 연습을 하세요.',
    luckyDirection: '북쪽, 동쪽'
  },
  '정인': {
    overall: '2026년은 귀인의 도움이 있는 해입니다. 멘토나 후원자를 통해 기회가 열립니다.',
    careerLuck: '좋은 사람을 통해 기회가 옵니다. 인맥을 소중히 여기세요.',
    opportunity: '추천, 스카우트, 멘토 연결',
    challenge: '자립심 부족, 의존성',
    keyMonths: [
      { month: '4월', description: '귀인 만남' },
      { month: '8월', description: '중요한 추천' },
      { month: '11월', description: '기회 실현' }
    ],
    actionPlan: '도움을 받되 자신의 역량도 키우세요. 감사하는 마음을 표현하세요.',
    luckyDirection: '북쪽, 북서쪽'
  }
};

export default function CareerForecast({ result, name, birthDate }: CareerForecastProps) {
  const dayStem = result.day.stem.ko;
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthDate.getFullYear() + 1;

  // 2026년 십성 계산 (병오년 - 병은 천간)
  const year2026Stem = '병';
  const dayIndex = STEMS.indexOf(dayStem);
  const yearIndex = STEMS.indexOf(year2026Stem);
  const diff = (yearIndex - dayIndex + 10) % 10;
  const tenGod2026 = TEN_GODS[diff];

  const forecast = TEN_GOD_FORECAST_2026[tenGod2026] || TEN_GOD_FORECAST_2026['비견'];

  return (
    <motion.section
      className="glass-strong rounded-3xl p-6 md:p-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20">
          <Calendar className="w-7 h-7 text-violet-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            2026년 직업운 전망
          </h2>
          <p className="text-slate-400 text-sm">{name}님의 병오년 직업운</p>
        </div>
      </div>

      {/* 운세 개요 */}
      <div className="glass rounded-2xl p-6 mb-6 bg-gradient-to-br from-violet-500/10 to-purple-500/10">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🐴</span>
          <span className="text-violet-400 font-semibold">2026년 병오(丙午)년</span>
          <span className="px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full text-sm ml-2">
            {tenGod2026}운
          </span>
        </div>
        <p className="text-slate-300 leading-relaxed">{forecast.overall}</p>
      </div>

      {/* 직업운 상세 */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 text-cyan-400 mb-3">
          <TrendingUp className="w-5 h-5" />
          <h3 className="font-semibold">2026년 직업운</h3>
        </div>
        <p className="text-slate-300 leading-relaxed">{forecast.careerLuck}</p>
      </div>

      {/* 기회 & 도전 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="glass rounded-2xl p-5 border border-emerald-500/30">
          <div className="flex items-center gap-2 text-emerald-400 mb-3">
            <Star className="w-5 h-5" />
            <h3 className="font-semibold">기회</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{forecast.opportunity}</p>
        </div>

        <div className="glass rounded-2xl p-5 border border-amber-500/30">
          <div className="flex items-center gap-2 text-amber-400 mb-3">
            <AlertCircle className="w-5 h-5" />
            <h3 className="font-semibold">도전</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{forecast.challenge}</p>
        </div>
      </div>

      {/* 핵심 시기 */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 text-purple-400 mb-4">
          <Calendar className="w-5 h-5" />
          <h3 className="font-semibold">2026년 핵심 시기</h3>
        </div>
        <div className="space-y-3">
          {forecast.keyMonths.map((item, idx) => (
            <motion.div
              key={idx}
              className="flex items-center gap-4 p-3 bg-purple-500/10 rounded-xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <span className="font-bold text-purple-400 min-w-[50px]">{item.month}</span>
              <span className="text-slate-300 text-sm">{item.description}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 실행 계획 & 행운의 방향 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-5 bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
          <div className="flex items-start gap-3">
            <Target className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-cyan-300 mb-2">📋 실행 계획</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{forecast.actionPlan}</p>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-5 bg-gradient-to-br from-violet-500/10 to-purple-500/10">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-violet-300 mb-2">🧭 행운의 방향</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{forecast.luckyDirection}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
