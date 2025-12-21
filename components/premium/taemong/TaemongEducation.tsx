'use client';

import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Lightbulb, Target, Brain, Star } from 'lucide-react';
import { TaemongFormData } from '@/components/TaemongForm';

interface TaemongEducationProps {
  formData: TaemongFormData;
}

export default function TaemongEducation({ formData }: TaemongEducationProps) {
  // 학습 스타일 분석
  const analyzeLearningStyle = () => {
    const content = formData.dreamContent.toLowerCase();

    if (
      content.includes('책') ||
      content.includes('글') ||
      content.includes('쓰') ||
      content.includes('펜')
    ) {
      return {
        type: '언어-논리 학습형',
        icon: '📚',
        description:
          '읽기와 쓰기를 통한 학습이 가장 효과적입니다. 논리적 사고력이 뛰어나고 언어 능력이 탁월합니다.',
        strengths: [
          '독서를 통한 지식 습득이 빠름',
          '글쓰기와 표현력이 뛰어남',
          '논리적 분석 능력이 우수',
          '언어 학습에 재능이 있음',
        ],
        color: 'from-blue-500 to-indigo-500',
        percentage: 95,
      };
    } else if (
      content.includes('그림') ||
      content.includes('색') ||
      content.includes('아름다운') ||
      content.includes('보')
    ) {
      return {
        type: '시각-공간 학습형',
        icon: '🎨',
        description:
          '그림, 도표, 영상 등 시각 자료를 활용한 학습이 효과적입니다. 공간 지각력과 예술적 감각이 뛰어납니다.',
        strengths: [
          '시각 자료를 통한 이해가 빠름',
          '그림과 도표 활용 능력이 우수',
          '공간 지각력이 뛰어남',
          '디자인과 예술 분야에 재능',
        ],
        color: 'from-pink-500 to-purple-500',
        percentage: 92,
      };
    } else if (
      content.includes('음악') ||
      content.includes('소리') ||
      content.includes('노래') ||
      content.includes('들')
    ) {
      return {
        type: '청각-음악 학습형',
        icon: '🎵',
        description:
          '듣기를 통한 학습이 가장 효과적입니다. 청각적 기억력이 우수하고 음악적 재능이 있습니다.',
        strengths: [
          '듣기를 통한 학습이 효과적',
          '음악적 리듬감이 있음',
          '언어 청취 능력이 뛰어남',
          '암송과 구술 학습에 강함',
        ],
        color: 'from-purple-500 to-pink-500',
        percentage: 90,
      };
    } else if (
      content.includes('움직') ||
      content.includes('뛰') ||
      content.includes('만지') ||
      content.includes('손')
    ) {
      return {
        type: '신체-운동 학습형',
        icon: '🏃',
        description:
          '직접 체험하고 실습하는 학습이 효과적입니다. 운동 능력이 뛰어나고 손으로 만들며 배우는 것을 좋아합니다.',
        strengths: [
          '실습과 체험 학습이 효과적',
          '운동 능력이 뛰어남',
          '손을 사용한 학습이 좋음',
          '활동적인 수업을 선호',
        ],
        color: 'from-green-500 to-emerald-500',
        percentage: 88,
      };
    } else if (
      content.includes('친구') ||
      content.includes('사람') ||
      content.includes('많은') ||
      content.includes('함께')
    ) {
      return {
        type: '대인관계 학습형',
        icon: '👥',
        description:
          '그룹 활동과 토론을 통한 학습이 효과적입니다. 협동 학습과 사회적 상호작용을 통해 잘 배웁니다.',
        strengths: [
          '그룹 활동과 팀 프로젝트에 강함',
          '토론과 대화를 통한 학습 효과적',
          '리더십과 협동심이 뛰어남',
          '사회성 발달이 빠름',
        ],
        color: 'from-orange-500 to-red-500',
        percentage: 90,
      };
    }

    return {
      type: '통합형 학습',
      icon: '🌟',
      description:
        '다양한 학습 방법을 골고루 활용할 수 있는 균형잡힌 학습 스타일입니다. 상황에 따라 적절한 방법을 선택할 수 있습니다.',
      strengths: [
        '다양한 학습 방법에 적응 가능',
        '유연한 사고력',
        '통합적 이해 능력',
        '창의적 문제 해결 능력',
      ],
      color: 'from-cyan-500 to-blue-500',
      percentage: 85,
    };
  };

  // 과목별 적성 분석
  const analyzeSubjectAptitude = () => {
    const content = formData.dreamContent.toLowerCase();
    const subjects: Array<{
      name: string;
      icon: string;
      aptitude: number;
      description: string;
    }> = [];

    // 수학/과학
    if (
      content.includes('별') ||
      content.includes('숫자') ||
      content.includes('계산') ||
      content.includes('뱀')
    ) {
      subjects.push({
        name: '수학/과학',
        icon: '🔢',
        aptitude: 95,
        description: '논리적 사고와 분석 능력이 뛰어나 수학과 과학 분야에서 탁월한 성과를 낼 것입니다.',
      });
    }

    // 언어/문학
    if (
      content.includes('책') ||
      content.includes('글') ||
      content.includes('말') ||
      content.includes('이야기')
    ) {
      subjects.push({
        name: '언어/문학',
        icon: '📖',
        aptitude: 92,
        description: '언어 감각이 뛰어나고 표현력이 풍부하여 국어와 외국어 학습에 강점을 보입니다.',
      });
    }

    // 예술/음악
    if (
      content.includes('꽃') ||
      content.includes('아름다운') ||
      content.includes('음악') ||
      content.includes('그림')
    ) {
      subjects.push({
        name: '예술/음악',
        icon: '🎨',
        aptitude: 94,
        description: '예술적 감각과 창의력이 뛰어나 미술, 음악 등 예체능 분야에서 두각을 나타냅니다.',
      });
    }

    // 체육
    if (
      content.includes('호랑이') ||
      content.includes('뛰') ||
      content.includes('빠른') ||
      content.includes('힘')
    ) {
      subjects.push({
        name: '체육',
        icon: '⚽',
        aptitude: 90,
        description: '신체 능력이 뛰어나고 운동 신경이 발달하여 체육 활동에서 우수한 성과를 냅니다.',
      });
    }

    // 사회/역사
    if (
      content.includes('사람') ||
      content.includes('왕') ||
      content.includes('용') ||
      content.includes('옛')
    ) {
      subjects.push({
        name: '사회/역사',
        icon: '🌍',
        aptitude: 88,
        description: '사회 현상에 대한 이해력과 역사적 통찰력이 있어 인문사회 분야에 강점이 있습니다.',
      });
    }

    if (subjects.length === 0) {
      subjects.push(
        {
          name: '종합 학업',
          icon: '📚',
          aptitude: 85,
          description: '전반적으로 균형잡힌 학업 능력을 보이며, 노력에 따라 모든 과목에서 좋은 성과를 낼 수 있습니다.',
        }
      );
    }

    return subjects.slice(0, 4);
  };

  // 최적 교육 방법
  const getEducationMethods = () => {
    const content = formData.dreamContent.toLowerCase();
    const methods: Array<{
      category: string;
      icon: string;
      methods: string[];
    }> = [];

    // 동기 부여 방법
    const motivationMethods: string[] = [];
    if (content.includes('상') || content.includes('금') || content.includes('보석')) {
      motivationMethods.push('구체적인 보상과 목표 설정이 효과적');
      motivationMethods.push('성취감을 느낄 수 있는 단계별 목표 제시');
      motivationMethods.push('칭찬과 격려를 통한 동기 부여');
    } else if (content.includes('친구') || content.includes('사람') || content.includes('많은')) {
      motivationMethods.push('친구들과의 경쟁과 협력이 동기 부여');
      motivationMethods.push('그룹 활동과 팀 프로젝트 활용');
      motivationMethods.push('사회적 인정과 칭찬이 효과적');
    } else {
      motivationMethods.push('아이의 관심사와 연결된 학습');
      motivationMethods.push('성공 경험을 통한 자신감 향상');
      motivationMethods.push('긍정적 피드백과 격려');
    }
    methods.push({
      category: '동기 부여',
      icon: '🎯',
      methods: motivationMethods,
    });

    // 학습 환경
    const environmentMethods: string[] = [];
    if (content.includes('조용한') || content.includes('달') || content.includes('밤')) {
      environmentMethods.push('조용하고 차분한 학습 공간 조성');
      environmentMethods.push('집중할 수 있는 독립적인 공간 제공');
      environmentMethods.push('산만하지 않은 정돈된 환경');
    } else if (content.includes('밝은') || content.includes('태양') || content.includes('빛')) {
      environmentMethods.push('밝고 활기찬 학습 환경');
      environmentMethods.push('다양한 시각 자료 활용');
      environmentMethods.push('활동적인 학습 공간');
    } else {
      environmentMethods.push('쾌적하고 집중하기 좋은 환경');
      environmentMethods.push('적절한 조명과 온도 유지');
      environmentMethods.push('학습 도구를 쉽게 접근할 수 있는 공간');
    }
    methods.push({
      category: '학습 환경',
      icon: '🏠',
      methods: environmentMethods,
    });

    // 교수 방법
    methods.push({
      category: '교수 방법',
      icon: '👨‍🏫',
      methods: [
        '아이의 학습 속도를 존중하고 기다려주기',
        '질문을 장려하고 호기심 유발',
        '실생활과 연결된 학습 내용',
        '반복보다는 이해 중심의 학습',
      ],
    });

    // 시간 관리
    const timeMethods: string[] = [];
    if (
      content.includes('빠른') ||
      content.includes('뛰') ||
      content.includes('호랑이') ||
      content.includes('용')
    ) {
      timeMethods.push('짧고 집중적인 학습 시간 활용');
      timeMethods.push('활동적인 휴식 시간 제공');
      timeMethods.push('다양한 과목을 번갈아 학습');
    } else if (content.includes('느린') || content.includes('소') || content.includes('거북')) {
      timeMethods.push('충분한 시간을 두고 천천히 학습');
      timeMethods.push('반복 학습과 복습 시간 확보');
      timeMethods.push('여유있는 학습 계획');
    } else {
      timeMethods.push('규칙적인 학습 시간 설정');
      timeMethods.push('적절한 휴식 시간 배분');
      timeMethods.push('집중력에 맞는 시간 조절');
    }
    methods.push({
      category: '시간 관리',
      icon: '⏰',
      methods: timeMethods,
    });

    return methods;
  };

  // 교육 방향 제안
  const getEducationDirection = () => {
    const content = formData.dreamContent.toLowerCase();

    // 조기 교육
    let earlyEducation = '';
    if (content.includes('책') || content.includes('글') || content.includes('뱀')) {
      earlyEducation = '독서와 언어 교육을 일찍 시작하면 좋습니다. 다양한 책을 접하게 하고 글쓰기를 장려하세요.';
    } else if (content.includes('음악') || content.includes('노래') || content.includes('소리')) {
      earlyEducation = '음악 교육을 조기에 시작하면 효과적입니다. 다양한 악기를 경험하게 해주세요.';
    } else if (content.includes('그림') || content.includes('색') || content.includes('꽃')) {
      earlyEducation = '미술과 예술 교육이 적합합니다. 다양한 재료로 자유롭게 표현할 기회를 주세요.';
    } else {
      earlyEducation = '다양한 분야를 경험하게 하며 아이의 관심사를 찾아주세요. 강요보다는 자연스러운 노출이 중요합니다.';
    }

    // 특별 활동
    const specialActivities: string[] = [];
    if (content.includes('물') || content.includes('헤엄') || content.includes('바다')) {
      specialActivities.push('수영이나 수상 스포츠');
    }
    if (content.includes('높은') || content.includes('하늘') || content.includes('날')) {
      specialActivities.push('등산이나 클라이밍');
    }
    if (content.includes('사람') || content.includes('많은') || content.includes('친구')) {
      specialActivities.push('단체 활동이나 동아리');
    }
    if (specialActivities.length === 0) {
      specialActivities.push('아이의 흥미에 맞는 다양한 체험 활동');
    }

    return {
      earlyEducation,
      specialActivities,
      focusAreas: [
        '창의성과 사고력 개발',
        '자기주도 학습 습관 형성',
        '사회성과 정서 발달',
        '신체 발달과 건강 관리',
      ],
    };
  };

  const learningStyle = analyzeLearningStyle();
  const subjectAptitude = analyzeSubjectAptitude();
  const educationMethods = getEducationMethods();
  const educationDirection = getEducationDirection();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2
            className="text-2xl md:text-3xl font-bold text-white"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            학업 및 교육 방향
          </h2>
          <p className="text-slate-400 text-sm">아이에게 맞는 학습법과 교육 방향</p>
        </div>
      </div>

      {/* 학습 스타일 */}
      <motion.div className="glass rounded-2xl p-6 mb-6" variants={itemVariants}>
        <div className="flex items-start gap-4 mb-4">
          <div className="text-5xl">{learningStyle.icon}</div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-2">{learningStyle.type}</h3>
            <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${learningStyle.color} text-white text-sm font-semibold mb-3`}>
              주요 학습 스타일
            </div>
            <p className="text-slate-300 leading-relaxed mb-4">{learningStyle.description}</p>

            {/* 진행 바 */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-400 text-sm">학습 효과성</span>
                <span className="text-blue-400 font-semibold">{learningStyle.percentage}%</span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${learningStyle.color}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${learningStyle.percentage}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-2">
              {learningStyle.strengths.map((strength, index) => (
                <div key={index} className="flex items-center gap-2 text-slate-300 text-sm">
                  <Star className="w-4 h-4 text-blue-400" />
                  <span>{strength}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* 과목별 적성 */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-6 h-6 text-indigo-400" />
          <h3 className="text-xl font-bold text-white">과목별 적성</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {subjectAptitude.map((subject, index) => (
            <motion.div
              key={subject.name}
              className="glass rounded-xl p-5"
              variants={itemVariants}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{subject.icon}</span>
                  <h4 className="font-bold text-white">{subject.name}</h4>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(subject.aptitude / 20)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-slate-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-slate-300 text-sm mb-3">{subject.description}</p>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 to-blue-400"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${subject.aptitude}%` }}
                  transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 최적 교육 방법 */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-6 h-6 text-yellow-400" />
          <h3 className="text-xl font-bold text-white">최적 교육 방법</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {educationMethods.map((method, index) => (
            <motion.div
              key={method.category}
              className="glass rounded-xl p-5"
              variants={itemVariants}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{method.icon}</span>
                <h4 className="font-bold text-white">{method.category}</h4>
              </div>
              <ul className="space-y-2">
                {method.methods.map((m, mIndex) => (
                  <li key={mIndex} className="flex items-start gap-2 text-slate-300 text-sm">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 교육 방향 제안 */}
      <motion.div className="glass rounded-2xl p-6 mb-6" variants={itemVariants}>
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-6 h-6 text-emerald-400" />
          <h3 className="text-xl font-bold text-white">교육 방향 제안</h3>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-800/50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-5 h-5 text-blue-400" />
              <h4 className="font-semibold text-blue-400">조기 교육</h4>
            </div>
            <p className="text-slate-300 text-sm">{educationDirection.earlyEducation}</p>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-purple-400" />
              <h4 className="font-semibold text-purple-400">추천 특별 활동</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {educationDirection.specialActivities.map((activity, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                >
                  {activity}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-emerald-400" />
              <h4 className="font-semibold text-emerald-400">교육 중점 영역</h4>
            </div>
            <div className="grid md:grid-cols-2 gap-2">
              {educationDirection.focusAreas.map((area, index) => (
                <div key={index} className="flex items-center gap-2 text-slate-300 text-sm">
                  <span className="text-emerald-400">✓</span>
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* 종합 교육 조언 */}
      <motion.div
        className="p-6 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-2xl border border-blue-500/20"
        variants={itemVariants}
      >
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span className="text-2xl">🎓</span>
          종합 교육 조언
        </h3>
        <p className="text-slate-200 leading-relaxed mb-3">
          {formData.name}님은 {learningStyle.type}으로, 타고난 학습 능력이 뛰어납니다.
          아이의 학습 스타일에 맞춘 교육 방법을 적용하고, 강점 과목을 더욱 발전시키면서
          약점 과목도 균형있게 학습한다면 전체적으로 우수한 학업 성과를 거둘 것입니다.
        </p>
        <p className="text-slate-300 text-sm">
          💡 가장 중요한 것은 아이의 흥미와 자발성을 존중하는 것입니다.
          강요보다는 격려로, 비교보다는 칭찬으로 아이의 학습 동기를 높여주세요.
        </p>
      </motion.div>
    </motion.div>
  );
}
