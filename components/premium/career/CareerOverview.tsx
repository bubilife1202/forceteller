'use client';

import { SajuResult } from '@/lib/saju-calculator';
import { motion } from 'framer-motion';
import { Briefcase, Star, TrendingUp, AlertCircle, Lightbulb } from 'lucide-react';

interface CareerOverviewProps {
  result: SajuResult;
  name: string;
  birthDate: Date;
}

const DAY_STEM_CAREER: Record<string, {
  element: string;
  personality: string;
  coreStrength: string;
  workPhilosophy: string;
  careerPath: string;
  peakAge: string;
  luckyIndustry: string[];
}> = {
  '갑': {
    element: '목(木) - 양목',
    personality: '큰 나무처럼 곧고 강직한 성품으로, 리더십이 뛰어나고 새로운 분야를 개척하는 능력이 탁월합니다.',
    coreStrength: '선구자적 비전과 추진력',
    workPhilosophy: '정의로운 목표를 향해 흔들림 없이 나아가는 것',
    careerPath: '초년에는 기초를 다지고, 중년에 크게 성장하여 말년에 안정된 위치에 오릅니다.',
    peakAge: '40대 중반~50대',
    luckyIndustry: ['교육', '출판', '목재', '섬유', '환경', '바이오']
  },
  '을': {
    element: '목(木) - 음목',
    personality: '풀이나 덩굴처럼 유연하고 적응력이 뛰어나며, 협력과 조화를 중시하는 외교적 성품입니다.',
    coreStrength: '유연한 적응력과 협상 능력',
    workPhilosophy: '주변과 조화를 이루며 함께 성장하는 것',
    careerPath: '서서히 꾸준히 성장하여 중년 이후 안정적인 위치를 확보합니다.',
    peakAge: '35~45세',
    luckyIndustry: ['패션', '디자인', '화훼', '미용', '예술', '상담']
  },
  '병': {
    element: '화(火) - 양화',
    personality: '태양처럼 밝고 열정적이며, 주변을 환하게 비추는 영향력과 카리스마가 있습니다.',
    coreStrength: '강력한 추진력과 영향력',
    workPhilosophy: '열정으로 세상을 밝히고 영감을 주는 것',
    careerPath: '젊은 시절부터 두각을 나타내며, 화려한 커리어를 쌓습니다.',
    peakAge: '30대~40대 초반',
    luckyIndustry: ['방송', '엔터테인먼트', '마케팅', '광고', '에너지', 'IT']
  },
  '정': {
    element: '화(火) - 음화',
    personality: '촛불처럼 따뜻하고 섬세하며, 세심한 배려와 정교한 기술력을 갖추고 있습니다.',
    coreStrength: '섬세한 감각과 창의력',
    workPhilosophy: '따뜻함으로 주변을 밝히고 완성도를 높이는 것',
    careerPath: '꾸준히 실력을 쌓아 전문가로 인정받습니다.',
    peakAge: '35~50세',
    luckyIndustry: ['요리', '공예', '주얼리', '인테리어', '조명', '문화예술']
  },
  '무': {
    element: '토(土) - 양토',
    personality: '큰 산처럼 묵직하고 신뢰감 있으며, 중심을 잡고 사람들을 모으는 능력이 있습니다.',
    coreStrength: '안정감과 포용력',
    workPhilosophy: '흔들리지 않는 중심으로 조직을 이끄는 것',
    careerPath: '천천히 시작하여 중년 이후 크게 성공합니다.',
    peakAge: '45~55세',
    luckyIndustry: ['부동산', '건설', '농업', '금융', '행정', '중개업']
  },
  '기': {
    element: '토(土) - 음토',
    personality: '비옥한 땅처럼 다재다능하고 실용적이며, 다양한 분야에서 능력을 발휘합니다.',
    coreStrength: '다재다능함과 실무 능력',
    workPhilosophy: '실용적 가치를 창출하고 다양한 재능을 발휘하는 것',
    careerPath: '여러 분야를 경험하며 자신만의 영역을 구축합니다.',
    peakAge: '40~50세',
    luckyIndustry: ['서비스업', '유통', '식품', '요식업', '컨설팅', '교육']
  },
  '경': {
    element: '금(金) - 양금',
    personality: '강철처럼 단단하고 결단력이 있으며, 논리적이고 정의로운 성품입니다.',
    coreStrength: '결단력과 논리적 사고',
    workPhilosophy: '원칙을 지키며 정확하게 일을 처리하는 것',
    careerPath: '경쟁에서 두각을 나타내며 고위직까지 오릅니다.',
    peakAge: '40대 후반~50대',
    luckyIndustry: ['금융', '법조', '군/경찰', '기계', '자동차', '항공']
  },
  '신': {
    element: '금(金) - 음금',
    personality: '보석처럼 섬세하고 예리하며, 정교한 기술과 심미안을 갖추고 있습니다.',
    coreStrength: '정교함과 완벽주의',
    workPhilosophy: '최고의 품질과 완성도를 추구하는 것',
    careerPath: '전문 기술을 연마하여 장인 또는 전문가로 인정받습니다.',
    peakAge: '35~50세',
    luckyIndustry: ['IT', '의료', '정밀기계', '금융공학', '주얼리', '반도체']
  },
  '임': {
    element: '수(水) - 양수',
    personality: '큰 바다처럼 넓은 포용력과 지혜를 갖추고 있으며, 전략적 사고가 뛰어납니다.',
    coreStrength: '전략적 사고와 지혜',
    workPhilosophy: '흐름을 읽고 큰 그림을 그리는 것',
    careerPath: '다양한 경험을 축적하여 중년에 크게 성공합니다.',
    peakAge: '45~55세',
    luckyIndustry: ['무역', '물류', '해운', '관광', '수산', '주류']
  },
  '계': {
    element: '수(水) - 음수',
    personality: '샘물처럼 맑고 섬세하며, 직관력과 창의성이 뛰어난 지적 감수성을 갖추고 있습니다.',
    coreStrength: '직관력과 창의적 사고',
    workPhilosophy: '통찰력으로 숨겨진 가치를 발견하는 것',
    careerPath: '독창적인 아이디어로 자신만의 영역을 구축합니다.',
    peakAge: '30대 후반~40대',
    luckyIndustry: ['연구', '학문', '예술', '심리학', '마케팅', '콘텐츠']
  }
};

export default function CareerOverview({ result, name, birthDate }: CareerOverviewProps) {
  const dayStem = result.day.stem.ko;
  const profile = DAY_STEM_CAREER[dayStem] || DAY_STEM_CAREER['갑'];
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthDate.getFullYear() + 1;

  // 직업운 점수 계산
  const calculateCareerScore = () => {
    let score = 55;
    const { 재성, 관성, 식상, 인성, 비겁 } = result.tenGodsCount;

    if (관성 >= 1) score += 12; // 직장운
    if (재성 >= 1) score += 10; // 재물운
    if (식상 >= 1) score += 8; // 표현력
    if (인성 >= 2) score += 8; // 학습력
    if (비겁 >= 3) score -= 8; // 경쟁 과다

    // 대운 영향
    const currentDaeun = result.daeun.find(d => d.age <= age && age < d.age + 10);
    if (currentDaeun) {
      const daeunElement = currentDaeun.stem.element;
      if (daeunElement === '금' || daeunElement === '토') score += 10;
      if (daeunElement === result.yongsin) score += 15;
    }

    return Math.min(Math.max(score, 35), 98);
  };

  const careerScore = calculateCareerScore();

  const getGrade = () => {
    if (careerScore >= 85) return { grade: '최상', color: 'text-yellow-400', bgColor: 'from-yellow-500/20 to-amber-500/20' };
    if (careerScore >= 70) return { grade: '상', color: 'text-emerald-400', bgColor: 'from-emerald-500/20 to-teal-500/20' };
    if (careerScore >= 55) return { grade: '중상', color: 'text-blue-400', bgColor: 'from-blue-500/20 to-indigo-500/20' };
    if (careerScore >= 40) return { grade: '중', color: 'text-purple-400', bgColor: 'from-purple-500/20 to-violet-500/20' };
    return { grade: '노력필요', color: 'text-rose-400', bgColor: 'from-rose-500/20 to-pink-500/20' };
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
        <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
          <Briefcase className="w-7 h-7 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            직업운 종합 개요
          </h2>
          <p className="text-slate-400 text-sm">일간 {dayStem}({profile.element}) 기반 분석</p>
        </div>
      </div>

      {/* 점수 카드 */}
      <div className={`glass rounded-2xl p-6 mb-8 bg-gradient-to-br ${gradeInfo.bgColor}`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-slate-400 mb-1">직업운 종합 점수</p>
            <div className="flex items-end gap-2">
              <span className={`text-5xl font-bold ${gradeInfo.color}`}>{careerScore}</span>
              <span className="text-2xl text-slate-400 mb-1">점</span>
            </div>
            <p className={`text-lg font-medium ${gradeInfo.color} mt-1`}>{gradeInfo.grade}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.luckyIndustry.slice(0, 4).map((industry, idx) => (
              <span key={idx} className="px-4 py-2 glass rounded-full text-sm text-slate-300">
                {industry}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 핵심 정보 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 text-emerald-400 mb-3">
            <Star className="w-5 h-5" />
            <h3 className="font-semibold">타고난 직업 성향</h3>
          </div>
          <p className="text-slate-300 leading-relaxed">{profile.personality}</p>
        </div>

        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 text-blue-400 mb-3">
            <TrendingUp className="w-5 h-5" />
            <h3 className="font-semibold">핵심 강점</h3>
          </div>
          <p className="text-slate-300 leading-relaxed">{profile.coreStrength}</p>
          <p className="text-slate-400 text-sm mt-2">
            <span className="text-cyan-400">업무 철학:</span> {profile.workPhilosophy}
          </p>
        </div>

        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 text-purple-400 mb-3">
            <Lightbulb className="w-5 h-5" />
            <h3 className="font-semibold">커리어 경로</h3>
          </div>
          <p className="text-slate-300 leading-relaxed">{profile.careerPath}</p>
          <p className="text-amber-400 text-sm mt-2">
            전성기: {profile.peakAge}
          </p>
        </div>

        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 text-amber-400 mb-3">
            <AlertCircle className="w-5 h-5" />
            <h3 className="font-semibold">현재 나이 분석</h3>
          </div>
          <p className="text-slate-300">
            현재 {name}님은 만 {age}세로,{' '}
            {age < 30 && '커리어 초기 단계에서 기초를 다지는 시기입니다.'}
            {age >= 30 && age < 40 && '본격적으로 전문성을 쌓고 성장하는 시기입니다.'}
            {age >= 40 && age < 50 && '경험과 역량이 무르익어 성과를 내는 시기입니다.'}
            {age >= 50 && '축적된 경험으로 후배를 이끌고 안정을 누리는 시기입니다.'}
          </p>
        </div>
      </div>

      {/* 추천 산업 */}
      <div className="glass rounded-2xl p-6">
        <h3 className="font-bold text-white mb-4">💼 유리한 산업군</h3>
        <div className="flex flex-wrap gap-3">
          {profile.luckyIndustry.map((industry, idx) => (
            <motion.div
              key={idx}
              className="px-5 py-3 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl text-slate-200 border border-indigo-500/30"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              {industry}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
