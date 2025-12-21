'use client';

import { SajuResult } from '@/lib/saju-calculator';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Compass, BookOpen, Award, Lightbulb } from 'lucide-react';

interface CareerGrowthProps {
  result: SajuResult;
  name: string;
  birthDate: Date;
}

const ELEMENT_CAREER_GROWTH: Record<string, {
  growthPath: string;
  shortTerm: string;
  midTerm: string;
  longTerm: string;
  skillsToDevelop: string[];
  networkingTip: string;
  brandingAdvice: string;
  pivotTiming: string;
}> = {
  '목': {
    growthPath: '지속적인 학습과 성장을 통해 전문가로 발전하는 경로가 적합합니다. 후배를 육성하는 멘토로 성장할 수 있습니다.',
    shortTerm: '1-3년: 기본기를 탄탄히 하고 전문 분야를 정하세요. 다양한 경험을 통해 자신에게 맞는 방향을 찾으세요.',
    midTerm: '3-7년: 전문성을 깊이 있게 쌓고 업계에서 인정받는 전문가로 성장하세요. 네트워크를 확장하세요.',
    longTerm: '7년 이상: 멘토, 교육자, 리더로서 후배를 양성하고 조직을 이끄는 역할로 발전하세요.',
    skillsToDevelop: ['리더십', '코칭 능력', '전문 지식 심화', '콘텐츠 제작', '강의 스킬'],
    networkingTip: '성장 지향적인 사람들과 교류하세요. 멘토를 찾고 스터디 그룹에 참여하세요.',
    brandingAdvice: '전문가 이미지를 구축하세요. 블로그, 강의, 책 출판 등으로 지식을 공유하세요.',
    pivotTiming: '성장이 멈췄다고 느낄 때가 전환의 신호입니다. 새로운 도전을 찾으세요.'
  },
  '화': {
    growthPath: '빠른 성장과 가시적인 성과를 통해 리더십 포지션으로 올라가는 경로가 적합합니다.',
    shortTerm: '1-3년: 눈에 띄는 성과를 만들고 조직 내 인지도를 높이세요. 영업, 마케팅 역량을 키우세요.',
    midTerm: '3-7년: 팀을 이끌거나 중요 프로젝트를 맡아 리더십을 증명하세요. 개인 브랜드를 구축하세요.',
    longTerm: '7년 이상: 사업가, 임원, 인플루언서로서 영향력을 발휘하세요. 자신만의 브랜드를 확립하세요.',
    skillsToDevelop: ['프레젠테이션', '퍼블릭 스피킹', '네트워킹', '브랜딩', '리더십'],
    networkingTip: '영향력 있는 사람들과 적극적으로 교류하세요. 업계 행사에 참여하고 발표하세요.',
    brandingAdvice: 'SNS와 미디어를 통해 적극적으로 자신을 알리세요. 열정적인 이미지를 구축하세요.',
    pivotTiming: '인정받지 못한다고 느끼거나 열정이 식을 때가 전환의 신호입니다.'
  },
  '토': {
    growthPath: '한 분야에서 꾸준히 경험을 쌓아 신뢰받는 전문가로 성장하는 경로가 적합합니다.',
    shortTerm: '1-3년: 맡은 업무에서 신뢰를 쌓고 안정적인 성과를 내세요. 조급해하지 마세요.',
    midTerm: '3-7년: 중간 관리자로 성장하며 조직 운영 경험을 쌓으세요. 안정적인 네트워크를 구축하세요.',
    longTerm: '7년 이상: 조직의 핵심 인력 또는 관리자로서 안정적인 위치를 확보하세요.',
    skillsToDevelop: ['조직 관리', '갈등 조정', '재무 지식', '인사 관리', '협상력'],
    networkingTip: '깊고 오래가는 관계를 구축하세요. 신뢰를 기반으로 한 네트워크가 중요합니다.',
    brandingAdvice: '신뢰할 수 있고 안정적인 이미지를 구축하세요. 꾸준함이 최고의 브랜딩입니다.',
    pivotTiming: '불안정하거나 비전이 없는 조직이라면 전환을 고려하세요. 단, 충분히 준비 후 움직이세요.'
  },
  '금': {
    growthPath: '전문 기술을 깊이 있게 연마하여 스페셜리스트로 성장하는 경로가 적합합니다.',
    shortTerm: '1-3년: 핵심 기술을 습득하고 자격증을 취득하세요. 체계적으로 역량을 쌓으세요.',
    midTerm: '3-7년: 업계에서 인정받는 전문가로 자리잡으세요. 깊이 있는 전문성을 구축하세요.',
    longTerm: '7년 이상: 컨설턴트, 전문 위원, 기술 리더로서 영향력을 발휘하세요.',
    skillsToDevelop: ['전문 기술 심화', '분석력', '시스템 설계', '품질 관리', '의사결정'],
    networkingTip: '같은 분야 전문가들과 교류하세요. 전문가 커뮤니티에 참여하세요.',
    brandingAdvice: '전문성과 품질에 대한 이미지를 구축하세요. 객관적인 실적과 자격으로 증명하세요.',
    pivotTiming: '기술이 진부해지거나 분야가 사양길에 접어들면 전환을 고려하세요.'
  },
  '수': {
    growthPath: '다양한 경험을 통해 넓은 시야를 갖추고 전략적 역할로 성장하는 경로가 적합합니다.',
    shortTerm: '1-3년: 다양한 분야를 경험하며 시야를 넓히세요. 여러 역할을 경험해보세요.',
    midTerm: '3-7년: 전략 기획이나 사업개발 역할로 이동하세요. 넓은 네트워크를 구축하세요.',
    longTerm: '7년 이상: 전략가, 자문역, 또는 독립 사업가로서 자유롭게 활동하세요.',
    skillsToDevelop: ['전략적 사고', '네트워킹', '마케팅', '협상력', '외국어'],
    networkingTip: '다양한 분야의 사람들과 교류하세요. 국경을 넘는 네트워크도 구축하세요.',
    brandingAdvice: '창의적이고 전략적인 이미지를 구축하세요. 다양한 경험을 자산으로 활용하세요.',
    pivotTiming: '답답하거나 갇힌 느낌이 들 때가 전환의 신호입니다. 새로운 도전을 찾으세요.'
  }
};

export default function CareerGrowth({ result, name, birthDate }: CareerGrowthProps) {
  const dayElement = result.day.stem.element;
  const growth = ELEMENT_CAREER_GROWTH[dayElement] || ELEMENT_CAREER_GROWTH['목'];
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthDate.getFullYear() + 1;

  // 현재 커리어 단계
  const getCareerStage = () => {
    if (age < 30) return { stage: '초기', color: 'text-emerald-400', description: '기초를 다지는 시기' };
    if (age < 40) return { stage: '성장기', color: 'text-blue-400', description: '전문성을 쌓는 시기' };
    if (age < 50) return { stage: '성숙기', color: 'text-purple-400', description: '성과를 내는 시기' };
    return { stage: '원숙기', color: 'text-amber-400', description: '경험을 나누는 시기' };
  };

  const stage = getCareerStage();

  return (
    <motion.section
      className="glass-strong rounded-3xl p-6 md:p-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20">
          <TrendingUp className="w-7 h-7 text-teal-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            경력 성장 방향
          </h2>
          <p className="text-slate-400 text-sm">{name}님의 커리어 로드맵</p>
        </div>
      </div>

      {/* 현재 단계 */}
      <div className="glass rounded-2xl p-6 mb-6 bg-gradient-to-br from-teal-500/10 to-cyan-500/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm">현재 커리어 단계</p>
            <p className={`text-2xl font-bold ${stage.color}`}>{stage.stage}</p>
          </div>
          <div className="text-right">
            <p className="text-slate-400 text-sm">나이: {age}세</p>
            <p className="text-slate-300 text-sm">{stage.description}</p>
          </div>
        </div>
      </div>

      {/* 성장 경로 */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 text-cyan-400 mb-3">
          <Compass className="w-5 h-5" />
          <h3 className="font-semibold">성장 경로</h3>
        </div>
        <p className="text-slate-300 leading-relaxed">{growth.growthPath}</p>
      </div>

      {/* 단기/중기/장기 계획 */}
      <div className="space-y-4 mb-6">
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 text-emerald-400 mb-2">
            <Target className="w-5 h-5" />
            <h3 className="font-semibold">단기 목표</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{growth.shortTerm}</p>
        </div>

        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 text-blue-400 mb-2">
            <Target className="w-5 h-5" />
            <h3 className="font-semibold">중기 목표</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{growth.midTerm}</p>
        </div>

        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 text-purple-400 mb-2">
            <Target className="w-5 h-5" />
            <h3 className="font-semibold">장기 목표</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{growth.longTerm}</p>
        </div>
      </div>

      {/* 개발해야 할 역량 */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 text-amber-400 mb-4">
          <BookOpen className="w-5 h-5" />
          <h3 className="font-semibold">개발해야 할 역량</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {growth.skillsToDevelop.map((skill, idx) => (
            <motion.span
              key={idx}
              className="px-4 py-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 rounded-xl border border-amber-500/30"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>

      {/* 네트워킹 & 브랜딩 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 text-cyan-400 mb-3">
            <Award className="w-5 h-5" />
            <h3 className="font-semibold">네트워킹 팁</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{growth.networkingTip}</p>
        </div>

        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 text-purple-400 mb-3">
            <Award className="w-5 h-5" />
            <h3 className="font-semibold">퍼스널 브랜딩</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{growth.brandingAdvice}</p>
        </div>
      </div>

      {/* 전환 시기 */}
      <div className="glass rounded-2xl p-6 bg-gradient-to-r from-teal-500/10 to-cyan-500/10">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-6 h-6 text-teal-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-teal-300 mb-2">🔄 커리어 전환 시기</h3>
            <p className="text-slate-300 leading-relaxed">{growth.pivotTiming}</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
