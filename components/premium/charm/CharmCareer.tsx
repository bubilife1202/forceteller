'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Briefcase, TrendingUp, Users, Crown } from 'lucide-react';

interface CharmCareerProps {
  result: SajuResult;
  name: string;
  gender: 'male' | 'female';
}

export default function CharmCareer({ result, name, gender }: CharmCareerProps) {
  const dayElement = result.day.stem.element;
  const { 식상, 재성, 관성, 인성, 비겁 } = result.tenGodsCount;

  // 직장에서 빛나는 강점
  const getWorkStrengths = () => {
    const strengths: { [key: string]: {
      title: string;
      core: string[];
      description: string;
    } } = {
      목: {
        title: '성장 촉진자',
        core: ['팀워크', '협력', '멘토링', '긍정 에너지'],
        description: '당신은 팀원들의 성장을 돕고, 함께 발전하는 문화를 만드는 데 탁월합니다. 후배나 동료를 격려하고 가르치는 능력이 뛰어나며, 조직 내에서 긍정적인 분위기를 조성합니다. 새로운 프로젝트나 변화에도 유연하게 대처하며, 성장 가능성을 발견하는 눈이 있습니다.',
      },
      화: {
        title: '열정 리더',
        core: ['추진력', '창의성', '열정', '영감'],
        description: '당신은 열정과 추진력으로 프로젝트를 이끌어갑니다. 창의적인 아이디어를 제시하고, 팀원들에게 동기를 부여하는 능력이 뛰어납니다. 프레젠테이션이나 대외 활동에서 특히 빛을 발하며, 조직에 활력을 불어넣는 존재입니다.',
      },
      토: {
        title: '신뢰의 중심',
        core: ['신뢰성', '책임감', '조율', '안정성'],
        description: '당신은 조직의 든든한 기둥입니다. 맡은 일을 끝까지 책임지고, 약속을 반드시 지킵니다. 갈등 상황에서 중재자 역할을 훌륭히 해내며, 팀의 안정성을 유지합니다. 실무 능력이 뛰어나고, 현실적인 해결책을 제시합니다.',
      },
      금: {
        title: '전문가 이미지',
        core: ['전문성', '정확성', '원칙', '효율성'],
        description: '당신은 전문가로서의 품격과 능력을 갖추었습니다. 업무를 정확하고 체계적으로 처리하며, 높은 퀄리티를 유지합니다. 명확한 기준과 원칙을 가지고 일하며, 복잡한 문제를 논리적으로 해결합니다. 결단력 있는 의사결정으로 신뢰를 얻습니다.',
      },
      수: {
        title: '전략가',
        core: ['통찰력', '분석력', '전략', '혁신'],
        description: '당신은 깊이 있는 사고와 통찰력으로 조직에 기여합니다. 복잡한 상황을 분석하고 본질을 파악하는 능력이 뛰어납니다. 장기적 전략을 수립하고, 남들이 보지 못하는 기회를 발견합니다. 혁신적인 아이디어로 조직을 발전시킵니다.',
      },
    };
    return strengths[dayElement] || strengths.목;
  };

  // 적합한 직업/역할
  const getSuitableJobs = () => {
    const jobs = [];

    if (식상 >= 2) {
      jobs.push({
        category: '창작/표현 분야',
        jobs: ['작가', '디자이너', '마케터', '콘텐츠 크리에이터', '예술가', '강사'],
        reason: '창의성과 표현력을 발휘할 수 있는 분야',
      });
    }

    if (재성 >= 2) {
      jobs.push({
        category: '비즈니스/재무 분야',
        jobs: ['세일즈', '경영기획', '재무설계사', '투자상담가', '사업가', '부동산'],
        reason: '실용적 가치를 창출하고 재물을 다루는 분야',
      });
    }

    if (관성 >= 2) {
      jobs.push({
        category: '관리/공공 분야',
        jobs: ['매니저', '공무원', '법조인', '행정가', 'HR 전문가', '컨설턴트'],
        reason: '조직을 관리하고 공정성을 유지하는 분야',
      });
    }

    if (인성 >= 2) {
      jobs.push({
        category: '교육/연구 분야',
        jobs: ['교수', '연구원', '교사', '상담사', '철학자', '작가'],
        reason: '지식을 탐구하고 전달하는 분야',
      });
    }

    if (비겁 >= 2) {
      jobs.push({
        category: '독립/경쟁 분야',
        jobs: ['프리랜서', '창업가', '운동선수', '개인사업', '트레이더', '예술가'],
        reason: '독립적으로 활동하고 경쟁하는 분야',
      });
    }

    // 오행별 기본 적성
    const elementJobs: { [key: string]: { category: string; jobs: string[]; reason: string } } = {
      목: {
        category: '성장/교육 분야',
        jobs: ['멘토', '코치', '교육자', '상담사', '인사담당', 'CSR'],
        reason: '사람의 성장과 발전을 돕는 분야',
      },
      화: {
        category: '홍보/미디어 분야',
        jobs: ['PR', '방송인', '연예인', '이벤트 기획', '광고', '인플루언서'],
        reason: '열정과 창의성을 발산하는 화려한 분야',
      },
      토: {
        category: '안정/서비스 분야',
        jobs: ['부동산', '요식업', '호텔리어', '서비스 매니저', '사회복지사'],
        reason: '안정적이고 사람을 돌보는 분야',
      },
      금: {
        category: '전문/기술 분야',
        jobs: ['의사', '변호사', '회계사', '엔지니어', '건축가', '금융전문가'],
        reason: '전문성과 정확성이 요구되는 분야',
      },
      수: {
        category: '연구/IT 분야',
        jobs: ['연구원', '개발자', '데이터 분석가', '전략기획', '철학자', '작가'],
        reason: '깊이 있는 사고와 분석이 필요한 분야',
      },
    };

    if (jobs.length === 0) {
      jobs.push(elementJobs[dayElement]);
    }

    return jobs.slice(0, 3);
  };

  // 리더십 스타일
  const getLeadershipStyle = () => {
    const styles: { [key: string]: {
      type: string;
      approach: string;
      strength: string;
      development: string;
    } } = {
      목: {
        type: '성장 지향 리더십',
        approach: '팀원들의 잠재력을 믿고, 성장할 수 있는 기회를 제공합니다. 실수를 배움의 기회로 보며, 격려와 지원을 아끼지 않습니다.',
        strength: '팀원들이 자발적으로 성장하고 발전하도록 동기를 부여합니다',
        development: '때로는 명확한 지시와 피드백도 필요합니다',
      },
      화: {
        type: '카리스마 리더십',
        approach: '열정과 비전으로 팀을 이끕니다. 앞장서서 솔선수범하며, 팀원들에게 영감을 줍니다. 도전적인 목표를 설정하고 추진합니다.',
        strength: '팀에 활력을 불어넣고, 높은 성과를 달성하도록 이끕니다',
        development: '팀원들의 페이스도 고려하고, 경청하는 시간을 가지세요',
      },
      토: {
        type: '서번트 리더십',
        approach: '팀원들을 지원하고 섬기는 리더십을 발휘합니다. 안정적인 환경을 조성하고, 갈등을 조율합니다. 현실적인 목표를 설정합니다.',
        strength: '팀의 화합과 안정성을 유지하며, 신뢰받는 리더가 됩니다',
        development: '변화가 필요할 때는 과감한 결정도 필요합니다',
      },
      금: {
        type: '원칙 중심 리더십',
        approach: '명확한 기준과 원칙을 가지고 이끕니다. 공정하게 평가하고, 체계적으로 관리합니다. 전문성을 중시하고 높은 기준을 유지합니다.',
        strength: '조직의 효율성을 높이고, 전문가 집단으로 만듭니다',
        development: '유연성과 감정적 교감도 리더십의 중요한 요소입니다',
      },
      수: {
        type: '전략적 리더십',
        approach: '장기적 비전을 가지고 전략적으로 이끕니다. 깊이 있게 분석하고, 혁신적인 방향을 제시합니다. 독립성을 존중합니다.',
        strength: '조직을 혁신하고, 경쟁력 있게 만듭니다',
        development: '실행 계획의 구체화와 팀원들과의 소통을 강화하세요',
      },
    };
    return styles[dayElement] || styles.목;
  };

  const workStrengths = getWorkStrengths();
  const suitableJobs = getSuitableJobs();
  const leadershipStyle = getLeadershipStyle();

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-10"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-8">
        <h2
          className="text-3xl md:text-4xl font-bold gradient-text mb-3"
          style={{ fontFamily: "'Noto Serif KR', serif" }}
        >
          직장 매력
        </h2>
        <p className="text-slate-300">
          업무 환경에서 빛나는 {name}님의 프로페셔널한 매력
        </p>
      </div>

      {/* Work Strengths */}
      <motion.div
        className="glass rounded-2xl p-6 mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20">
            <TrendingUp className="w-6 h-6 text-blue-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-blue-400 mb-2">직장에서 빛나는 강점</h3>
            <h4 className="text-lg font-semibold text-white mb-3">{workStrengths.title}</h4>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
              {workStrengths.core.map((strength, idx) => (
                <div
                  key={idx}
                  className="px-3 py-2 bg-blue-500/20 rounded-lg text-blue-300 text-sm text-center border border-blue-500/30"
                >
                  {strength}
                </div>
              ))}
            </div>

            <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20">
              <p className="text-slate-200 text-sm leading-relaxed">
                {workStrengths.description}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Suitable Jobs */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
          <Briefcase className="w-6 h-6" />
          적합한 직업 & 역할
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {suitableJobs.map((jobGroup, idx) => (
            <motion.div
              key={idx}
              className="glass rounded-xl p-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
            >
              <div className="text-center mb-3">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-emerald-400" />
                </div>
                <h4 className="font-bold text-white mb-3">{jobGroup.category}</h4>
              </div>

              <div className="space-y-1 mb-3">
                {jobGroup.jobs.map((job, jobIdx) => (
                  <div key={jobIdx} className="text-sm text-slate-300 text-center">
                    • {job}
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-emerald-300 text-xs text-center">
                  {jobGroup.reason}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Leadership Style */}
      <motion.div
        className="glass rounded-2xl p-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20">
            <Crown className="w-6 h-6 text-amber-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-amber-400 mb-2">리더십 스타일</h3>
            <h4 className="text-lg font-semibold text-white mb-4">{leadershipStyle.type}</h4>

            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-slate-800/50">
                <p className="text-slate-200 text-sm leading-relaxed mb-2">
                  <span className="font-semibold text-amber-400">접근 방식:</span>
                </p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {leadershipStyle.approach}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <p className="text-slate-200 text-sm leading-relaxed mb-1">
                  <span className="font-semibold text-amber-400">💪 리더십 강점:</span>
                </p>
                <p className="text-amber-200 text-sm">
                  {leadershipStyle.strength}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="text-slate-200 text-sm leading-relaxed mb-1">
                  <span className="font-semibold text-blue-400">📈 발전 방향:</span>
                </p>
                <p className="text-blue-200 text-sm">
                  {leadershipStyle.development}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Career Success Tips */}
      <motion.div
        className="mt-6 p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <h4 className="font-bold text-blue-400 mb-3 text-lg flex items-center gap-2">
          <Users className="w-5 h-5" />
          직장 매력 극대화 전략
        </h4>
        <div className="space-y-2 text-slate-200 text-sm leading-relaxed">
          <p>• 당신만의 강점을 명확히 인식하고, 그것을 발휘할 수 있는 역할을 찾으세요</p>
          <p>• 전문성을 지속적으로 개발하되, 소프트 스킬도 함께 키우세요</p>
          <p>• 동료들과의 관계를 소중히 하세요. 능력만큼 인간관계도 중요합니다</p>
          <p>• 자신의 성과를 적절히 알리되, 겸손함을 잃지 마세요</p>
          <p>• 장기적인 커리어 비전을 가지고, 단계적으로 성장하세요</p>
          <p>• 실패를 두려워하지 말고, 배움의 기회로 삼으세요</p>
          <p>• 일과 삶의 균형을 유지하세요. 지속 가능한 성과가 진짜 성공입니다</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
