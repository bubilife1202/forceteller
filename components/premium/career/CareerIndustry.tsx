'use client';

import { SajuResult } from '@/lib/saju-calculator';
import { motion } from 'framer-motion';
import { Building2, Star, TrendingUp, Lightbulb, Target } from 'lucide-react';

interface CareerIndustryProps {
  result: SajuResult;
  name: string;
  birthDate: Date;
}

const ELEMENT_INDUSTRY: Record<string, {
  bestIndustries: { name: string; reason: string; jobs: string[] }[];
  risingIndustries: { name: string; reason: string }[];
  avoidIndustries: { name: string; reason: string }[];
  careerPath: string;
}> = {
  '목': {
    bestIndustries: [
      { name: '교육/에듀테크', reason: '성장과 발전을 추구하는 목의 성향과 일치합니다.', jobs: ['교사', '강사', '교육 콘텐츠 기획', '에듀테크 PM'] },
      { name: '미디어/콘텐츠', reason: '창의력과 표현력을 발휘할 수 있습니다.', jobs: ['PD', '작가', '콘텐츠 크리에이터', '편집자'] },
      { name: '환경/ESG', reason: '생명과 성장을 상징하는 목에게 어울립니다.', jobs: ['환경 컨설턴트', 'ESG 담당자', '친환경 사업 기획'] },
      { name: '헬스케어/바이오', reason: '생명력과 치유를 다루는 분야입니다.', jobs: ['의료인', '바이오 연구원', '헬스케어 마케터'] }
    ],
    risingIndustries: [
      { name: 'AI/에듀테크', reason: '교육과 기술의 융합 분야에서 기회가 열립니다.' },
      { name: '친환경 에너지', reason: 'ESG 트렌드와 목의 특성이 맞물립니다.' }
    ],
    avoidIndustries: [
      { name: '중공업/광업', reason: '금극목(金剋木)으로 목의 기운을 소모시킵니다.' },
      { name: '무기/파괴 관련', reason: '목의 생명 존중 성향과 맞지 않습니다.' }
    ],
    careerPath: '초기에는 실무 경험을 쌓고, 중기에 전문가로 성장하며, 후기에는 교육자나 멘토로 활동하는 경로가 좋습니다.'
  },
  '화': {
    bestIndustries: [
      { name: '엔터테인먼트', reason: '화려함과 주목을 받는 화의 성향에 맞습니다.', jobs: ['연예인', '매니저', '기획사', '이벤트 기획'] },
      { name: '마케팅/광고', reason: '표현력과 영향력을 발휘할 수 있습니다.', jobs: ['마케터', '광고 기획자', 'PR 전문가', 'SNS 마케터'] },
      { name: '요식업/F&B', reason: '화(火)가 조리와 연결되어 적합합니다.', jobs: ['셰프', '레스토랑 경영', 'F&B 기획', '푸드 컨설턴트'] },
      { name: 'IT/스타트업', reason: '빠른 변화와 혁신을 추구하는 환경입니다.', jobs: ['스타트업 CEO', 'BM 기획', '그로스 해커'] }
    ],
    risingIndustries: [
      { name: '라이브커머스/인플루언서', reason: '화의 표현력과 카리스마를 발휘할 수 있습니다.' },
      { name: '메타버스/XR', reason: '화려하고 시각적인 새로운 플랫폼입니다.' }
    ],
    avoidIndustries: [
      { name: '물류/냉동', reason: '수극화(水剋火)로 화의 기운이 꺼집니다.' },
      { name: '조용한 연구직', reason: '화의 열정적 성향과 맞지 않습니다.' }
    ],
    careerPath: '젊을 때 대중적인 분야에서 두각을 나타내고, 중년에는 자신만의 브랜드를 구축하는 것이 좋습니다.'
  },
  '토': {
    bestIndustries: [
      { name: '부동산/건설', reason: '토(土)가 직접적으로 관련된 분야입니다.', jobs: ['부동산 중개', '건설 관리', '부동산 투자', '인테리어'] },
      { name: '금융/보험', reason: '안정과 신뢰를 중시하는 토에게 맞습니다.', jobs: ['은행원', '보험설계사', '재무설계사', '펀드매니저'] },
      { name: '농업/식품', reason: '토가 생산과 연결됩니다.', jobs: ['농업 경영', '식품 제조', 'F&B 유통', '농산물 무역'] },
      { name: '공공/행정', reason: '안정성과 체계를 중시하는 환경입니다.', jobs: ['공무원', '공기업', '행정직', '정책 연구원'] }
    ],
    risingIndustries: [
      { name: '프롭테크', reason: '부동산과 기술의 융합으로 기회가 있습니다.' },
      { name: '식품테크/푸드테크', reason: '안정적인 식품 산업의 혁신 분야입니다.' }
    ],
    avoidIndustries: [
      { name: '급변하는 스타트업', reason: '토의 안정 추구 성향과 맞지 않습니다.' },
      { name: '모험적인 투자', reason: '리스크가 큰 환경에서 스트레스를 받습니다.' }
    ],
    careerPath: '한 분야에서 오래 경험을 쌓아 전문가로 인정받고, 안정적인 조직에서 관리직으로 성장하는 것이 좋습니다.'
  },
  '금': {
    bestIndustries: [
      { name: 'IT/기술', reason: '정밀하고 논리적인 금의 성향에 맞습니다.', jobs: ['개발자', '시스템 엔지니어', 'IT 컨설턴트', 'PM'] },
      { name: '금융/증권', reason: '숫자와 분석에 강한 금에게 유리합니다.', jobs: ['애널리스트', '트레이더', '퀀트', '리스크 관리'] },
      { name: '법률/규정', reason: '원칙과 논리를 중시하는 금에게 적합합니다.', jobs: ['변호사', '법무사', '규정 담당자', '컴플라이언스'] },
      { name: '제조/품질관리', reason: '정밀함과 품질을 추구합니다.', jobs: ['품질관리자', '생산관리', '공정 엔지니어'] }
    ],
    risingIndustries: [
      { name: '핀테크/블록체인', reason: '금융과 기술의 융합 분야입니다.' },
      { name: '반도체/첨단제조', reason: '정밀 기술을 요하는 분야입니다.' }
    ],
    avoidIndustries: [
      { name: '예술/감성 분야', reason: '논리적인 금의 성향과 맞지 않습니다.' },
      { name: '비정형 서비스', reason: '규칙과 체계가 없는 환경에서 불편합니다.' }
    ],
    careerPath: '전문 기술을 깊이 있게 쌓아 스페셜리스트로 성장하고, 관리직이나 컨설턴트로 발전하는 것이 좋습니다.'
  },
  '수': {
    bestIndustries: [
      { name: '무역/물류', reason: '수(水)의 흐름과 연결된 분야입니다.', jobs: ['무역상', '물류관리자', '해운', '항공물류'] },
      { name: '마케팅/전략', reason: '트렌드를 읽는 수의 능력을 발휘합니다.', jobs: ['전략기획', '마케팅전략', 'BM 기획', '사업개발'] },
      { name: '연구/학문', reason: '깊은 사고와 분석에 강합니다.', jobs: ['연구원', '교수', '싱크탱크', '정책연구'] },
      { name: '미디어/콘텐츠', reason: '창의적 사고를 발휘할 수 있습니다.', jobs: ['작가', '콘텐츠 기획', '저널리스트'] }
    ],
    risingIndustries: [
      { name: '글로벌 이커머스', reason: '국경을 넘는 수의 특성에 맞습니다.' },
      { name: 'AI/데이터', reason: '분석과 통찰이 필요한 분야입니다.' }
    ],
    avoidIndustries: [
      { name: '고정된 환경', reason: '변화를 추구하는 수의 성향과 맞지 않습니다.' },
      { name: '단순 반복 업무', reason: '수의 창의성을 억압합니다.' }
    ],
    careerPath: '다양한 경험을 통해 넓은 시야를 갖추고, 중년에 전략적 역할이나 자문 역할로 발전하는 것이 좋습니다.'
  }
};

export default function CareerIndustry({ result, name }: CareerIndustryProps) {
  const dayElement = result.day.stem.element;
  const industry = ELEMENT_INDUSTRY[dayElement] || ELEMENT_INDUSTRY['목'];

  return (
    <motion.section
      className="glass-strong rounded-3xl p-6 md:p-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
          <Building2 className="w-7 h-7 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            유리한 산업군
          </h2>
          <p className="text-slate-400 text-sm">{name}님에게 맞는 업종</p>
        </div>
      </div>

      {/* 최적 산업 */}
      <div className="space-y-6 mb-8">
        <h3 className="font-bold text-white flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-400" />
          최적 산업군
        </h3>
        {industry.bestIndustries.map((ind, idx) => (
          <motion.div
            key={idx}
            className="glass rounded-2xl p-5"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <h4 className="font-semibold text-cyan-400 mb-2">{ind.name}</h4>
            <p className="text-slate-300 text-sm mb-3">{ind.reason}</p>
            <div className="flex flex-wrap gap-2">
              {ind.jobs.map((job, jdx) => (
                <span key={jdx} className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">
                  {job}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* 뜨는 산업 */}
      <div className="glass rounded-2xl p-6 mb-6">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          주목해야 할 뜨는 산업
        </h3>
        <div className="space-y-3">
          {industry.risingIndustries.map((ind, idx) => (
            <div key={idx} className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/30">
              <p className="font-medium text-emerald-400">{ind.name}</p>
              <p className="text-slate-300 text-sm mt-1">{ind.reason}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 피해야 할 산업 */}
      <div className="glass rounded-2xl p-6 mb-6 border border-rose-500/30">
        <h3 className="font-bold text-rose-400 mb-4">⚠️ 피해야 할 산업</h3>
        <div className="space-y-3">
          {industry.avoidIndustries.map((ind, idx) => (
            <div key={idx} className="p-4 bg-rose-500/10 rounded-xl">
              <p className="font-medium text-rose-300">{ind.name}</p>
              <p className="text-slate-400 text-sm mt-1">{ind.reason}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 커리어 경로 */}
      <div className="glass rounded-2xl p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-cyan-300 mb-2">💼 추천 커리어 경로</h3>
            <p className="text-slate-300 leading-relaxed">{industry.careerPath}</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
