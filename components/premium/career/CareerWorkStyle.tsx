'use client';

import { SajuResult } from '@/lib/saju-calculator';
import { motion } from 'framer-motion';
import { Users, Brain, Clock, MessageSquare, Target, Zap } from 'lucide-react';

interface CareerWorkStyleProps {
  result: SajuResult;
  name: string;
  birthDate: Date;
}

const ELEMENT_WORK_STYLE: Record<string, {
  overview: string;
  workPattern: string;
  communicationStyle: string;
  decisionMaking: string;
  teamRole: string;
  preferredEnvironment: string;
  productivityTip: string;
  stressPattern: string;
}> = {
  '목': {
    overview: '성장 지향적이고 창의적인 업무 스타일을 가지고 있습니다. 새로운 아이디어를 내고 발전시키는 것을 좋아합니다.',
    workPattern: '프로젝트 초기 기획 단계에서 강점을 발휘합니다. 반복적인 업무보다 새로운 도전을 선호하며, 장기적인 비전을 세우고 단계적으로 실행합니다.',
    communicationStyle: '비전과 가능성을 이야기하는 것을 좋아합니다. 긍정적이고 격려하는 말투를 사용하며, 팀원들에게 영감을 줍니다.',
    decisionMaking: '직관과 가능성을 기반으로 결정합니다. 빠른 결정보다는 성장 가능성을 고려해 신중하게 판단합니다.',
    teamRole: '팀의 방향을 제시하는 비저너리 역할에 적합합니다. 아이디어를 내고 팀원들을 성장시키는 멘토 역할도 잘합니다.',
    preferredEnvironment: '창의성을 발휘할 수 있고 성장 기회가 있는 환경. 자율적이고 유연한 조직 문화를 선호합니다.',
    productivityTip: '새로운 프로젝트나 학습 기회가 있을 때 가장 생산적입니다. 성장을 느낄 수 있는 환경을 만드세요.',
    stressPattern: '성장이 막히거나 틀에 갇힌 느낌이 들 때 스트레스를 받습니다.'
  },
  '화': {
    overview: '열정적이고 추진력 있는 업무 스타일을 가지고 있습니다. 빠른 실행과 결과를 중시합니다.',
    workPattern: '일을 빠르게 시작하고 추진하는 스타일입니다. 마감에 맞춰 집중력을 발휘하며, 동시에 여러 일을 처리할 수 있습니다.',
    communicationStyle: '직접적이고 열정적으로 소통합니다. 설득력이 있고 분위기를 이끄는 능력이 있습니다.',
    decisionMaking: '빠른 결정을 선호하며, 직감을 믿습니다. 때로는 성급할 수 있지만 추진력으로 보완합니다.',
    teamRole: '팀의 에너지를 높이는 동기부여자 역할에 적합합니다. 대외 활동과 프레젠테이션에서 강점을 발휘합니다.',
    preferredEnvironment: '활기차고 도전적인 환경. 성과를 인정받을 수 있는 조직을 선호합니다.',
    productivityTip: '인정받고 주목받을 때 가장 생산적입니다. 정기적인 피드백과 인정이 필요합니다.',
    stressPattern: '인정받지 못하거나 무시당한다고 느낄 때 스트레스를 받습니다.'
  },
  '토': {
    overview: '안정적이고 체계적인 업무 스타일을 가지고 있습니다. 신뢰할 수 있는 결과물을 만들어냅니다.',
    workPattern: '꾸준하고 안정적으로 일을 처리합니다. 계획에 따라 체계적으로 진행하며, 변화보다 일관성을 추구합니다.',
    communicationStyle: '진중하고 신뢰감 있게 소통합니다. 경청을 잘하며 갈등 조정 능력이 있습니다.',
    decisionMaking: '충분한 정보를 수집한 후 신중하게 결정합니다. 리스크를 최소화하려 합니다.',
    teamRole: '팀의 안정을 유지하는 조정자 역할에 적합합니다. 갈등을 중재하고 균형을 맞춥니다.',
    preferredEnvironment: '안정적이고 예측 가능한 환경. 체계가 잡힌 조직을 선호합니다.',
    productivityTip: '안정적인 환경에서 가장 생산적입니다. 급격한 변화를 피하고 점진적으로 개선하세요.',
    stressPattern: '급격한 변화나 불확실한 상황에서 스트레스를 받습니다.'
  },
  '금': {
    overview: '논리적이고 체계적인 업무 스타일을 가지고 있습니다. 품질과 완성도를 중시합니다.',
    workPattern: '논리적으로 분석하고 체계적으로 일을 처리합니다. 품질 기준이 높고 디테일에 강합니다.',
    communicationStyle: '명확하고 논리적으로 소통합니다. 사실에 기반한 대화를 선호합니다.',
    decisionMaking: '데이터와 논리에 기반해 결정합니다. 감정보다 이성적 판단을 중시합니다.',
    teamRole: '팀의 품질을 관리하는 분석가 역할에 적합합니다. 의사결정의 논리적 근거를 제공합니다.',
    preferredEnvironment: '명확한 규칙과 체계가 있는 환경. 공정하고 논리적인 조직을 선호합니다.',
    productivityTip: '명확한 목표와 기준이 있을 때 가장 생산적입니다. 모호함을 줄이세요.',
    stressPattern: '불공정하거나 비논리적인 상황에서 스트레스를 받습니다.'
  },
  '수': {
    overview: '유연하고 창의적인 업무 스타일을 가지고 있습니다. 변화에 잘 적응하고 새로운 관점을 제시합니다.',
    workPattern: '영감이 떠오를 때 집중적으로 일합니다. 다양한 관점에서 접근하며, 유연하게 방향을 조정합니다.',
    communicationStyle: '공감적이고 통찰력 있게 소통합니다. 상대방의 속마음을 읽는 능력이 있습니다.',
    decisionMaking: '직관과 통찰에 기반해 결정합니다. 숨겨진 연결고리를 찾아냅니다.',
    teamRole: '팀의 전략을 수립하는 기획자 역할에 적합합니다. 외부 네트워킹에도 강합니다.',
    preferredEnvironment: '자유롭고 창의적인 환경. 다양한 경험을 할 수 있는 조직을 선호합니다.',
    productivityTip: '자유로운 환경에서 가장 생산적입니다. 틀에 갇히지 않게 하세요.',
    stressPattern: '틀에 갇히거나 창의성이 억압될 때 스트레스를 받습니다.'
  }
};

export default function CareerWorkStyle({ result, name }: CareerWorkStyleProps) {
  const dayElement = result.day.stem.element;
  const workStyle = ELEMENT_WORK_STYLE[dayElement] || ELEMENT_WORK_STYLE['목'];

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
          <Brain className="w-7 h-7 text-purple-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            업무 스타일 & 팀 역할
          </h2>
          <p className="text-slate-400 text-sm">{name}님의 일하는 방식</p>
        </div>
      </div>

      {/* 개요 */}
      <div className="glass rounded-2xl p-6 mb-6 bg-gradient-to-br from-purple-500/10 to-violet-500/10">
        <p className="text-slate-300 leading-relaxed">{workStyle.overview}</p>
      </div>

      {/* 세부 스타일 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 text-cyan-400 mb-3">
            <Clock className="w-5 h-5" />
            <h3 className="font-semibold">업무 패턴</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{workStyle.workPattern}</p>
        </div>

        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 text-emerald-400 mb-3">
            <MessageSquare className="w-5 h-5" />
            <h3 className="font-semibold">소통 스타일</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{workStyle.communicationStyle}</p>
        </div>

        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 text-amber-400 mb-3">
            <Target className="w-5 h-5" />
            <h3 className="font-semibold">의사결정 방식</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{workStyle.decisionMaking}</p>
        </div>

        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 text-blue-400 mb-3">
            <Users className="w-5 h-5" />
            <h3 className="font-semibold">팀 내 역할</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{workStyle.teamRole}</p>
        </div>
      </div>

      {/* 선호 환경 */}
      <div className="glass rounded-2xl p-6 mb-6">
        <h3 className="font-bold text-white mb-3">🏢 선호하는 업무 환경</h3>
        <p className="text-slate-300 leading-relaxed">{workStyle.preferredEnvironment}</p>
      </div>

      {/* 생산성 팁 & 스트레스 패턴 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-5 border border-emerald-500/30">
          <div className="flex items-center gap-2 text-emerald-400 mb-3">
            <Zap className="w-5 h-5" />
            <h3 className="font-semibold">생산성 팁</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{workStyle.productivityTip}</p>
        </div>

        <div className="glass rounded-2xl p-5 border border-rose-500/30">
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <Brain className="w-5 h-5" />
            <h3 className="font-semibold">스트레스 패턴</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{workStyle.stressPattern}</p>
        </div>
      </div>
    </motion.section>
  );
}
