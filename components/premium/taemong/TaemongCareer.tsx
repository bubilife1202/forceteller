'use client';

import { motion } from 'framer-motion';
import { Briefcase, TrendingUp, Award, Lightbulb } from 'lucide-react';
import { TaemongFormData } from '@/components/TaemongForm';

interface TaemongCareerProps {
  formData: TaemongFormData;
}

export default function TaemongCareer({ formData }: TaemongCareerProps) {
  // 적성 직업 분석
  const analyzeCareer = () => {
    const content = formData.dreamContent.toLowerCase();

    const careers: Array<{
      icon: string;
      title: string;
      jobs: string[];
      reason: string;
      success: number;
    }> = [];

    // 정치/행정
    if (content.includes('용') || content.includes('왕') || content.includes('황제')) {
      careers.push({
        icon: '👑',
        title: '정치/행정 분야',
        jobs: ['정치인', '고위공무원', '외교관', '대기업 임원', '국회의원'],
        reason:
          '리더십과 통솔력이 뛰어나 많은 사람을 이끌고 큰 조직을 운영하는 능력이 있습니다.',
        success: 95,
      });
    }

    // 법조계
    if (content.includes('호랑이') || content.includes('범') || content.includes('칼')) {
      careers.push({
        icon: '⚖️',
        title: '법조/군/경찰',
        jobs: ['판사', '검사', '변호사', '군인', '경찰관'],
        reason:
          '정의감이 강하고 용기가 있어 사회 정의를 실현하는 분야에서 큰 활약을 할 것입니다.',
        success: 92,
      });
    }

    // 예술/문화
    if (
      content.includes('꽃') ||
      content.includes('나비') ||
      content.includes('새') ||
      content.includes('음악')
    ) {
      careers.push({
        icon: '🎨',
        title: '예술/문화 분야',
        jobs: ['예술가', '음악가', '배우', '디자이너', '작가'],
        reason:
          '예술적 감각과 창의력이 뛰어나 문화예술 분야에서 특별한 재능을 발휘할 것입니다.',
        success: 90,
      });
    }

    // 학계/교육
    if (content.includes('책') || content.includes('뱀') || content.includes('올빼미')) {
      careers.push({
        icon: '📚',
        title: '학계/교육 분야',
        jobs: ['교수', '연구원', '교사', '학자', '컨설턴트'],
        reason:
          '지적 능력이 뛰어나고 탐구심이 강해 학문 연구나 교육 분야에서 성공할 것입니다.',
        success: 93,
      });
    }

    // 금융/경영
    if (
      content.includes('금') ||
      content.includes('돼지') ||
      content.includes('보석') ||
      content.includes('돈')
    ) {
      careers.push({
        icon: '💼',
        title: '금융/경영 분야',
        jobs: ['CEO', '금융인', '투자전문가', '회계사', '경영인'],
        reason:
          '재물을 다루는 감각이 뛰어나고 경영 능력이 있어 사업이나 금융 분야에서 성공합니다.',
        success: 88,
      });
    }

    // 의료/보건
    if (content.includes('치료') || content.includes('약') || content.includes('병원')) {
      careers.push({
        icon: '⚕️',
        title: '의료/보건 분야',
        jobs: ['의사', '한의사', '약사', '간호사', '의료연구원'],
        reason: '사람을 돕고 치유하는 능력이 있어 의료 분야에서 훌륭한 업적을 남길 것입니다.',
        success: 91,
      });
    }

    // IT/과학기술
    if (content.includes('별') || content.includes('빛') || content.includes('미래')) {
      careers.push({
        icon: '💻',
        title: 'IT/과학기술',
        jobs: ['과학자', '공학자', '개발자', 'AI 전문가', '우주항공'],
        reason:
          '첨단 기술과 미래 지향적 사고를 가지고 있어 과학기술 분야에서 혁신을 이끌 것입니다.',
        success: 89,
      });
    }

    // 언론/방송
    if (content.includes('말') || content.includes('소리') || content.includes('많은 사람')) {
      careers.push({
        icon: '📺',
        title: '언론/방송 분야',
        jobs: ['기자', '아나운서', 'PD', '유튜버', '방송인'],
        reason:
          '소통 능력이 뛰어나고 대중적 매력이 있어 미디어 분야에서 인기를 얻을 것입니다.',
        success: 87,
      });
    }

    // 기본 직업 (키워드가 없을 때)
    if (careers.length === 0) {
      careers.push({
        icon: '💡',
        title: '다재다능',
        jobs: ['전문직', '관리직', '창업', '프리랜서', '컨설턴트'],
        reason:
          '여러 분야에서 능력을 발휘할 수 있는 다재다능한 인재입니다. 본인의 관심사를 찾아 발전시키면 어느 분야에서든 성공할 수 있습니다.',
        success: 85,
      });
    }

    return careers.slice(0, 3); // 상위 3개
  };

  // 성공 요인
  const getSuccessFactors = () => {
    const content = formData.dreamContent.toLowerCase();
    const factors: string[] = [];

    if (content.includes('높은') || content.includes('산') || content.includes('위')) {
      factors.push('높은 목표를 설정하고 도전하는 정신');
    }
    if (content.includes('많은') || content.includes('군중')) {
      factors.push('뛰어난 대인관계 능력과 네트워킹');
    }
    if (content.includes('빛') || content.includes('밝은')) {
      factors.push('긍정적 마인드와 추진력');
    }
    if (content.includes('강한') || content.includes('힘')) {
      factors.push('강한 의지력과 결단력');
    }
    if (content.includes('아름다운') || content.includes('예쁜')) {
      factors.push('세련된 감각과 심미안');
    }

    if (factors.length === 0) {
      factors.push(
        '꾸준한 노력과 성실함',
        '창의적 문제 해결 능력',
        '배움에 대한 열정'
      );
    }

    return factors;
  };

  const careers = analyzeCareer();
  const successFactors = getSuccessFactors();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-10"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
          <Briefcase className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2
            className="text-2xl md:text-3xl font-bold text-white"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            진로와 직업운
          </h2>
          <p className="text-slate-400 text-sm">태몽이 암시하는 미래 직업</p>
        </div>
      </div>

      {/* 추천 직업 분야 */}
      <div className="space-y-6 mb-10">
        {careers.map((career, index) => (
          <motion.div
            key={career.title}
            className="glass rounded-2xl p-6"
            variants={itemVariants}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="text-5xl">{career.icon}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-white">{career.title}</h3>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-indigo-400" />
                    <span className="text-indigo-400 font-bold">{career.success}%</span>
                  </div>
                </div>
                <p className="text-slate-300 mb-4 leading-relaxed">{career.reason}</p>

                {/* 구체적 직업 */}
                <div>
                  <p className="text-slate-400 text-sm mb-2">추천 직업:</p>
                  <div className="flex flex-wrap gap-2">
                    {career.jobs.map((job) => (
                      <span
                        key={job}
                        className="px-3 py-1.5 bg-indigo-500/20 text-indigo-300 rounded-lg text-sm"
                      >
                        {job}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 성공 확률 바 */}
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-400"
                initial={{ width: 0 }}
                whileInView={{ width: `${career.success}%` }}
                transition={{ duration: 1, delay: 0.3 + index * 0.2 }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* 성공 요인 */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-6 h-6 text-yellow-400" />
          <h3 className="text-xl font-bold text-white">성공 요인</h3>
        </div>
        <div className="glass rounded-2xl p-6">
          <ul className="space-y-3">
            {successFactors.map((factor, index) => (
              <li key={index} className="flex items-start gap-3 text-slate-300">
                <span className="text-yellow-400 text-xl mt-0.5">✦</span>
                <span className="flex-1">{factor}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* 시기별 발전 */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-6 h-6 text-amber-400" />
          <h3 className="text-xl font-bold text-white">시기별 커리어 발전</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="glass rounded-xl p-5">
            <h4 className="font-bold text-emerald-400 mb-2">20대 - 기반 다지기</h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              학업과 자격증 취득에 집중하세요. 다양한 경험을 쌓으며 자신의 진로를 탐색하는
              시기입니다.
            </p>
          </div>
          <div className="glass rounded-xl p-5">
            <h4 className="font-bold text-blue-400 mb-2">30대 - 본격 성장</h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              전문성을 키우고 실력을 인정받는 시기입니다. 승진이나 독립의 기회가 찾아올
              것입니다.
            </p>
          </div>
          <div className="glass rounded-xl p-5">
            <h4 className="font-bold text-purple-400 mb-2">40대 이후 - 완성</h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              리더로서 후배를 양성하고 사회에 기여하는 시기입니다. 명예와 인정을 받을
              것입니다.
            </p>
          </div>
        </div>
      </motion.div>

      {/* 조언 */}
      <motion.div
        className="mt-8 p-6 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl border border-indigo-500/20"
        variants={itemVariants}
      >
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span className="text-2xl">💼</span>
          커리어 조언
        </h3>
        <p className="text-slate-200 leading-relaxed mb-2">
          어떤 분야를 선택하든 중요한 것은 열정과 노력입니다. 태몽이 보여주는 방향은 하나의
          가능성일 뿐, 본인의 관심사와 노력에 따라 얼마든지 다른 길로 갈 수 있습니다.
        </p>
        <p className="text-slate-300 text-sm">
          💡 다양한 경험을 통해 진정으로 좋아하는 일을 찾고, 그 분야에서 최선을 다한다면
          반드시 성공할 수 있습니다.
        </p>
      </motion.div>
    </motion.div>
  );
}
