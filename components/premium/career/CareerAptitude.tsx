'use client';

import { SajuResult } from '@/lib/saju-calculator';
import { motion } from 'framer-motion';
import { Target, Sparkles, Shield, Zap, Heart } from 'lucide-react';

interface CareerAptitudeProps {
  result: SajuResult;
  name: string;
  birthDate: Date;
}

const ELEMENT_APTITUDE: Record<string, {
  mainAptitude: string[];
  workEnvironment: string;
  leadership: string;
  teamRole: string;
  problemSolving: string;
  stressHandler: string;
  idealJobs: string[];
  avoidJobs: string[];
}> = {
  '목': {
    mainAptitude: ['창의적 기획', '교육/코칭', '신규 사업 개발', '환경/바이오', '성장 전략'],
    workEnvironment: '자유롭고 창의성을 발휘할 수 있는 환경에서 능력을 발휘합니다. 엄격한 규칙보다 유연한 분위기를 선호합니다.',
    leadership: '비전을 제시하고 팀원들에게 영감을 주는 리더 스타일입니다. 성장 가능성을 보고 사람을 키우는 능력이 있습니다.',
    teamRole: '팀의 방향을 제시하고 새로운 아이디어를 내는 역할을 맡으면 좋습니다.',
    problemSolving: '창의적이고 혁신적인 방법으로 문제에 접근합니다. 기존 틀을 깨는 해결책을 찾습니다.',
    stressHandler: '성장과 발전의 기회가 없으면 스트레스를 받습니다. 새로운 도전이 필요합니다.',
    idealJobs: ['교육자', '기획자', '스타트업 창업', '환경 전문가', '출판/미디어', '상담사', '건축가'],
    avoidJobs: ['단순 반복 업무', '엄격한 규율의 조직', '창의성이 필요 없는 직종']
  },
  '화': {
    mainAptitude: ['프레젠테이션', '영업/마케팅', '퍼포먼스', '홍보/PR', '네트워킹'],
    workEnvironment: '활기차고 역동적인 환경에서 빛을 발합니다. 사람들과 교류하며 에너지를 얻습니다.',
    leadership: '열정과 카리스마로 팀을 이끄는 스타일입니다. 강한 추진력으로 목표를 달성합니다.',
    teamRole: '팀의 에너지를 높이고 대외적인 역할을 맡으면 좋습니다.',
    problemSolving: '빠른 결단력과 추진력으로 문제를 돌파합니다. 행동으로 먼저 부딪히는 스타일입니다.',
    stressHandler: '인정받지 못하거나 주목받지 못하면 스트레스를 받습니다. 성과에 대한 인정이 필요합니다.',
    idealJobs: ['방송인', '마케터', '영업 전문가', '강사', '이벤트 기획', 'CEO', '아티스트'],
    avoidJobs: ['혼자 하는 업무', '조용하고 정적인 환경', '인정받기 어려운 직종']
  },
  '토': {
    mainAptitude: ['조직 관리', '재무/회계', '부동산', '중재/협상', '안정적 운영'],
    workEnvironment: '안정적이고 체계적인 조직에서 능력을 발휘합니다. 예측 가능한 환경을 선호합니다.',
    leadership: '신뢰와 안정감을 주는 리더 스타일입니다. 조직의 중심을 잡고 균형을 유지합니다.',
    teamRole: '팀의 균형을 맞추고 갈등을 조정하는 역할에 적합합니다.',
    problemSolving: '실용적이고 현실적인 방법으로 접근합니다. 안정적인 해결책을 선호합니다.',
    stressHandler: '급격한 변화나 불안정한 상황에 스트레스를 받습니다. 예측 가능성이 필요합니다.',
    idealJobs: ['공무원', '금융인', '부동산 전문가', 'HR 매니저', '농업 경영', '행정 관리자'],
    avoidJobs: ['급변하는 환경', '모험이 필요한 직종', '불안정한 스타트업']
  },
  '금': {
    mainAptitude: ['분석/평가', '품질 관리', '법률/규정', '정밀 기술', '의사결정'],
    workEnvironment: '명확한 규칙과 체계가 있는 조직에서 능력을 발휘합니다. 공정하고 논리적인 환경을 선호합니다.',
    leadership: '원칙과 논리로 팀을 이끄는 스타일입니다. 공정하고 객관적인 의사결정을 내립니다.',
    teamRole: '품질 관리와 의사결정에서 핵심적인 역할을 맡으면 좋습니다.',
    problemSolving: '논리적 분석과 체계적인 방법으로 접근합니다. 데이터와 근거를 중시합니다.',
    stressHandler: '불공정하거나 비논리적인 상황에 스트레스를 받습니다. 명확한 기준이 필요합니다.',
    idealJobs: ['법조인', '회계사', '엔지니어', '품질관리자', '분석가', '의사', '연구원'],
    avoidJobs: ['감정적 판단이 필요한 직종', '규칙이 모호한 환경', '예술적 감각이 필요한 분야']
  },
  '수': {
    mainAptitude: ['전략 기획', '연구/분석', '국제 비즈니스', '창의적 콘텐츠', '네트워킹'],
    workEnvironment: '지적 자극이 있고 자유로운 환경에서 능력을 발휘합니다. 다양한 경험을 할 수 있는 환경을 선호합니다.',
    leadership: '지혜와 통찰력으로 팀을 이끄는 스타일입니다. 큰 그림을 그리고 방향을 제시합니다.',
    teamRole: '전략 수립과 외부 네트워킹에서 중요한 역할을 맡으면 좋습니다.',
    problemSolving: '통찰력과 직관으로 접근합니다. 숨겨진 연결고리를 찾아냅니다.',
    stressHandler: '틀에 갇히거나 창의성이 막히면 스트레스를 받습니다. 자유로운 사고가 필요합니다.',
    idealJobs: ['연구원', '전략가', '무역업', '작가', '심리학자', '외교관', '마케팅 전략가'],
    avoidJobs: ['단조로운 업무', '창의성이 필요 없는 직종', '고정된 환경']
  }
};

export default function CareerAptitude({ result, name }: CareerAptitudeProps) {
  const dayElement = result.day.stem.element;
  const aptitude = ELEMENT_APTITUDE[dayElement] || ELEMENT_APTITUDE['목'];

  return (
    <motion.section
      className="glass-strong rounded-3xl p-6 md:p-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20">
          <Target className="w-7 h-7 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            타고난 직업 적성
          </h2>
          <p className="text-slate-400 text-sm">{name}님의 본연의 능력</p>
        </div>
      </div>

      {/* 핵심 적성 */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 text-cyan-400 mb-4">
          <Sparkles className="w-5 h-5" />
          <h3 className="font-semibold">핵심 직무 적성</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {aptitude.mainAptitude.map((apt, idx) => (
            <motion.span
              key={idx}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 rounded-xl border border-cyan-500/30"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              {apt}
            </motion.span>
          ))}
        </div>
      </div>

      {/* 업무 환경 & 리더십 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 text-blue-400 mb-3">
            <Shield className="w-5 h-5" />
            <h3 className="font-semibold">선호하는 업무 환경</h3>
          </div>
          <p className="text-slate-300 leading-relaxed text-sm">{aptitude.workEnvironment}</p>
        </div>

        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 text-purple-400 mb-3">
            <Zap className="w-5 h-5" />
            <h3 className="font-semibold">리더십 스타일</h3>
          </div>
          <p className="text-slate-300 leading-relaxed text-sm">{aptitude.leadership}</p>
        </div>

        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 text-amber-400 mb-3">
            <Target className="w-5 h-5" />
            <h3 className="font-semibold">팀 내 역할</h3>
          </div>
          <p className="text-slate-300 leading-relaxed text-sm">{aptitude.teamRole}</p>
        </div>

        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <Heart className="w-5 h-5" />
            <h3 className="font-semibold">스트레스 요인</h3>
          </div>
          <p className="text-slate-300 leading-relaxed text-sm">{aptitude.stressHandler}</p>
        </div>
      </div>

      {/* 문제해결 스타일 */}
      <div className="glass rounded-2xl p-6 mb-6">
        <h3 className="font-bold text-white mb-3">🧩 문제해결 스타일</h3>
        <p className="text-slate-300 leading-relaxed">{aptitude.problemSolving}</p>
      </div>

      {/* 추천 & 비추천 직업 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-5 border border-emerald-500/30">
          <h3 className="font-bold text-emerald-400 mb-4">✅ 추천 직업</h3>
          <div className="flex flex-wrap gap-2">
            {aptitude.idealJobs.map((job, idx) => (
              <span key={idx} className="px-3 py-1.5 bg-emerald-500/20 text-emerald-300 rounded-lg text-sm">
                {job}
              </span>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-5 border border-rose-500/30">
          <h3 className="font-bold text-rose-400 mb-4">⚠️ 주의할 직업</h3>
          <div className="flex flex-wrap gap-2">
            {aptitude.avoidJobs.map((job, idx) => (
              <span key={idx} className="px-3 py-1.5 bg-rose-500/20 text-rose-300 rounded-lg text-sm">
                {job}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
