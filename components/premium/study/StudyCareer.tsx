'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Briefcase, TrendingUp, Target, Award } from 'lucide-react';

interface StudyCareerProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function StudyCareer({ result, name }: StudyCareerProps) {
  const dayElement = result.day.stem.element;
  const { 재성, 관성, 식상, 인성 } = result.tenGodsCount;

  // 학업-진로 연계 점수
  const getCareerLinkScore = () => {
    let score = 50;

    if (관성 >= 2) score += 15; // 목표 의식
    if (재성 >= 2) score += 12; // 실용성
    if (식상 >= 2) score += 12; // 창의적 진로
    if (인성 >= 2) score += 10; // 전문성

    if (dayElement === '금') score += 15; // 체계적 계획
    if (dayElement === '토') score += 12; // 안정적 진로
    if (dayElement === '수') score += 10; // 전략적 사고

    return Math.min(Math.max(score, 30), 100);
  };

  const careerLinkScore = getCareerLinkScore();

  // 학업과 연계된 진로 분야
  const getCareerFields = () => {
    return [
      {
        field: '전문직 (의사/변호사/회계사)',
        icon: Award,
        requiredStudy: '전문 대학원, 자격증',
        score: 50 + (인성 * 15) + (관성 * 12) + (dayElement === '금' ? 15 : 0),
        color: 'from-blue-500 to-indigo-600',
        textColor: 'text-blue-400',
        pathway: '학사 → 전문대학원 → 자격시험',
        timeline: '7-10년',
      },
      {
        field: '연구/학계 (교수/연구원)',
        icon: Briefcase,
        requiredStudy: '석사/박사 학위',
        score: 50 + (인성 * 20) + (dayElement === '수' ? 15 : 0),
        color: 'from-purple-500 to-violet-600',
        textColor: 'text-purple-400',
        pathway: '학사 → 석사 → 박사 → 연구직',
        timeline: '8-12년',
      },
      {
        field: '기업 (대기업/외국계)',
        icon: TrendingUp,
        requiredStudy: '학사 이상, 어학/자격증',
        score: 50 + (재성 * 15) + (관성 * 10) + (dayElement === '토' ? 12 : 0),
        color: 'from-green-500 to-emerald-600',
        textColor: 'text-green-400',
        pathway: '학사 → 인턴 → 신입 → 승진',
        timeline: '4-6년',
      },
      {
        field: '창업/프리랜서',
        icon: Target,
        requiredStudy: '실무 경험, 포트폴리오',
        score: 50 + (식상 * 20) + (dayElement === '화' ? 18 : 0),
        color: 'from-orange-500 to-amber-600',
        textColor: 'text-orange-400',
        pathway: '학습 → 실습 → 경력 → 독립',
        timeline: '3-5년',
      },
      {
        field: 'IT/기술 (개발자/엔지니어)',
        icon: Briefcase,
        requiredStudy: '학사, 실무 능력',
        score: 50 + (식상 * 15) + (dayElement === '금' ? 15 : dayElement === '수' ? 12 : 0),
        color: 'from-cyan-500 to-blue-600',
        textColor: 'text-cyan-400',
        pathway: '학사 → 프로젝트 → 개발자',
        timeline: '4-5년',
      },
      {
        field: '예술/창작 (디자이너/작가)',
        icon: Award,
        requiredStudy: '전문 교육, 포트폴리오',
        score: 50 + (식상 * 25) + (dayElement === '화' ? 20 : 0),
        color: 'from-pink-500 to-rose-600',
        textColor: 'text-pink-400',
        pathway: '학습 → 작품 활동 → 경력',
        timeline: '지속적',
      },
    ].map(field => ({
      ...field,
      score: Math.min(Math.max(field.score, 30), 100),
    })).sort((a, b) => b.score - a.score);
  };

  const careerFields = getCareerFields();
  const topField = careerFields[0];

  // 학년별 진로 준비
  const getGradePreparation = () => {
    return [
      {
        grade: '중학생',
        focus: '진로 탐색',
        tasks: [
          '다양한 분야 경험',
          '기초 학력 다지기',
          '흥미와 적성 발견',
          '독서와 체험 활동',
        ],
      },
      {
        grade: '고등학생',
        focus: '진로 구체화',
        tasks: [
          '희망 전공 결정',
          '내신/수능 관리',
          '관련 활동/수상',
          '자기소개서 준비',
        ],
      },
      {
        grade: '대학생',
        focus: '역량 개발',
        tasks: [
          '전공 심화 학습',
          '인턴/실습 경험',
          '자격증/어학',
          '포트폴리오 구축',
        ],
      },
      {
        grade: '취업 준비',
        focus: '실전 준비',
        tasks: [
          '구체적 목표 설정',
          '이력서/자소서',
          '면접 준비',
          '네트워킹',
        ],
      },
    ];
  };

  const gradePreparation = getGradePreparation();

  // 필수 역량
  const getEssentialSkills = () => {
    const skills = [];

    // 기본 역량
    skills.push({ skill: '전공 실력', importance: 95, desc: '전문 지식과 실력이 기본' });
    skills.push({ skill: '영어 능력', importance: 90, desc: '글로벌 시대 필수 역량' });

    // 성향별 역량
    if (재성 >= 2) {
      skills.push({ skill: '재무/경영 지식', importance: 85, desc: '실용적 경제 감각' });
    }
    if (식상 >= 2) {
      skills.push({ skill: '창의력/기획력', importance: 90, desc: '새로운 가치 창출' });
    }
    if (관성 >= 2) {
      skills.push({ skill: '리더십', importance: 85, desc: '조직 관리 능력' });
    }
    if (인성 >= 2) {
      skills.push({ skill: '전문성', importance: 95, desc: '깊이 있는 전문 지식' });
    }

    skills.push({ skill: '소통 능력', importance: 85, desc: '협업과 의사소통' });
    skills.push({ skill: '문제 해결', importance: 90, desc: '복잡한 문제 해결' });

    return skills.slice(0, 6).sort((a, b) => b.importance - a.importance);
  };

  const essentialSkills = getEssentialSkills();

  // 성공 전략
  const getSuccessStrategy = () => {
    if (careerLinkScore >= 75) {
      return {
        approach: '적극적 도전',
        description: '명확한 목표를 세우고 체계적으로 준비하세요.',
        tips: ['높은 목표 설정', '단계적 실행', '지속적 학습'],
      };
    } else if (careerLinkScore >= 55) {
      return {
        approach: '균형적 준비',
        description: '학업과 실무를 병행하며 준비하세요.',
        tips: ['폭넓은 경험', '기회 포착', '유연한 계획'],
      };
    } else {
      return {
        approach: '기초 다지기',
        description: '먼저 기본 실력을 탄탄히 다지세요.',
        tips: ['기초 학습', '소규모 목표', '점진적 성장'],
      };
    }
  };

  const strategy = getSuccessStrategy();

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
        💼 학업과 진로 연결
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님의 학업이 이끄는 미래 진로
      </p>

      {/* 학업-진로 연계도 */}
      <div className="glass rounded-2xl p-6 mb-8 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30">
        <div className="text-center mb-6">
          <p className="text-slate-400 mb-2">학업-진로 연계도</p>
          <h3 className="text-5xl font-bold gradient-text">{careerLinkScore}점</h3>

          <div className="h-4 bg-slate-700 rounded-full overflow-hidden mt-4 max-w-md mx-auto">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
              initial={{ width: 0 }}
              whileInView={{ width: `${careerLinkScore}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            />
          </div>

          <p className="mt-4 text-slate-300">
            {careerLinkScore >= 75 ? '🌟 명확한 진로 방향! 목표를 향해 달려가세요.' :
             careerLinkScore >= 60 ? '✨ 좋은 연계성! 구체적인 계획을 세우세요.' :
             careerLinkScore >= 45 ? '💫 다양한 가능성! 폭넓게 탐색하세요.' :
             '🔥 천천히 진로를 찾아가세요.'}
          </p>
        </div>

        {/* 전략 */}
        <div className="grid md:grid-cols-3 gap-3">
          <div className="text-center p-3 bg-indigo-500/10 rounded-xl">
            <p className="text-slate-400 text-sm">접근 방식</p>
            <p className="text-lg font-bold text-indigo-400">{strategy.approach}</p>
          </div>
          <div className="text-center p-3 bg-purple-500/10 rounded-xl col-span-2">
            <p className="text-slate-400 text-sm">전략</p>
            <p className="text-sm font-semibold text-purple-400">{strategy.description}</p>
          </div>
        </div>
      </div>

      {/* 최적 진로 분야 */}
      <div className="glass rounded-2xl p-6 mb-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${topField.color} flex items-center justify-center`}>
            <topField.icon className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-slate-400">가장 적합한 진로</p>
            <h3 className="text-2xl font-bold text-cyan-400">{topField.field}</h3>
            <p className="text-3xl font-bold text-blue-400">{topField.score}점</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-3 mb-3">
          <div>
            <p className="text-sm text-slate-400">필요 학습</p>
            <p className="text-slate-300">{topField.requiredStudy}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">준비 기간</p>
            <p className="text-slate-300">{topField.timeline}</p>
          </div>
        </div>
        <div className="p-3 bg-cyan-500/10 rounded-xl">
          <p className="text-sm text-slate-400 mb-1">진로 경로</p>
          <p className="text-cyan-300 font-semibold">{topField.pathway}</p>
        </div>
      </div>

      {/* 진로 분야별 적성 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {careerFields.map((field, index) => (
          <motion.div
            key={field.field}
            className="glass rounded-xl p-5"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${field.color} flex items-center justify-center`}>
                <field.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white text-xs">{field.field}</h4>
                <p className={`text-xl font-bold ${field.textColor}`}>{field.score}점</p>
              </div>
            </div>

            <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-2">
              <motion.div
                className={`h-full bg-gradient-to-r ${field.color}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${field.score}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </div>

            <p className="text-slate-500 text-xs">{field.timeline}</p>
          </motion.div>
        ))}
      </div>

      {/* 단계별 준비 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-yellow-400 mb-4">
          📅 단계별 진로 준비
        </h3>
        <div className="space-y-3">
          {gradePreparation.map((grade, index) => (
            <motion.div
              key={index}
              className="glass rounded-xl p-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-white">{grade.grade}</h4>
                <span className="px-3 py-1 bg-yellow-500/20 rounded-full text-xs text-yellow-400">
                  {grade.focus}
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-2">
                {grade.tasks.map((task, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="text-yellow-400">•</span>
                    {task}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 필수 역량 */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold text-green-400 mb-4">
          🎯 개발해야 할 핵심 역량
        </h3>
        <div className="space-y-3">
          {essentialSkills.map((skill, index) => (
            <motion.div
              key={index}
              className="glass rounded-xl p-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-white">{skill.skill}</h4>
                <span className="text-lg font-bold text-green-400">{skill.importance}%</span>
              </div>

              <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-2">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.importance}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                />
              </div>

              <p className="text-slate-400 text-sm">{skill.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
