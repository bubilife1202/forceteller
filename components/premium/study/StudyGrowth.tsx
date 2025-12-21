'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { TrendingUp, Brain, Lightbulb, BookOpen } from 'lucide-react';

interface StudyGrowthProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function StudyGrowth({ result, name }: StudyGrowthProps) {
  const dayElement = result.day.stem.element;
  const { 인성, 식상, 관성 } = result.tenGodsCount;

  // 지적 성장 잠재력
  const getGrowthPotential = () => {
    let score = 50;

    if (인성 >= 2) score += 25; // 학습 능력
    else if (인성 >= 1) score += 15;

    if (식상 >= 2) score += 20; // 창의적 성장
    else if (식상 >= 1) score += 10;

    if (dayElement === '수') score += 15; // 지혜 성장
    if (dayElement === '목') score += 12; // 빠른 성장

    return Math.min(Math.max(score, 30), 100);
  };

  const growthPotential = getGrowthPotential();

  // 성장 영역
  const getGrowthAreas = () => {
    return [
      {
        area: '분석적 사고',
        icon: Brain,
        score: 50 + (dayElement === '수' ? 25 : 0) + (dayElement === '금' ? 20 : 0) + (인성 * 10),
        color: 'from-blue-500 to-indigo-600',
        textColor: 'text-blue-400',
        desc: '논리와 분석을 통한 문제 해결 능력',
        activities: ['수학', '코딩', '논리 퍼즐', '데이터 분석'],
      },
      {
        area: '창의적 사고',
        icon: Lightbulb,
        score: 50 + (dayElement === '화' ? 25 : 0) + (식상 * 15),
        color: 'from-pink-500 to-rose-600',
        textColor: 'text-pink-400',
        desc: '새로운 아이디어와 독창적 해결책 창출',
        activities: ['창작', '디자인', '브레인스토밍', '예술'],
      },
      {
        area: '비판적 사고',
        icon: BookOpen,
        score: 50 + (dayElement === '금' ? 20 : 0) + (관성 * 12) + (인성 * 10),
        color: 'from-purple-500 to-violet-600',
        textColor: 'text-purple-400',
        desc: '정보를 객관적으로 평가하고 판단하는 능력',
        activities: ['토론', '독서', '에세이', '비평'],
      },
      {
        area: '융합적 사고',
        icon: TrendingUp,
        score: 50 + (dayElement === '목' ? 20 : 0) + (식상 * 12) + (인성 * 8),
        color: 'from-green-500 to-emerald-600',
        textColor: 'text-green-400',
        desc: '다양한 분야를 연결하고 통합하는 능력',
        activities: ['학제간 연구', '프로젝트', '하이브리드 학습'],
      },
    ].map(area => ({
      ...area,
      score: Math.min(Math.max(area.score, 30), 100),
    })).sort((a, b) => b.score - a.score);
  };

  const growthAreas = getGrowthAreas();
  const topArea = growthAreas[0];

  // 성장 단계
  const getGrowthPhases = () => {
    return [
      {
        stage: '기초 다지기',
        period: '현재',
        focus: '기본 개념과 원리 이해',
        goals: ['기초 지식 습득', '학습 습관 형성', '흥미 발견'],
      },
      {
        stage: '실력 향상',
        period: '단기 (6개월-1년)',
        focus: '심화 학습과 응용',
        goals: ['심화 내용 학습', '문제 해결 능력', '실전 경험'],
      },
      {
        stage: '전문성 개발',
        period: '중기 (1-3년)',
        focus: '특정 분야 전문화',
        goals: ['전문 지식 축적', '연구/프로젝트', '차별화된 강점'],
      },
      {
        stage: '창조적 기여',
        period: '장기 (3년+)',
        focus: '새로운 가치 창출',
        goals: ['독창적 성과', '지식 기여', '리더십'],
      },
    ];
  };

  const growthPhases = getGrowthPhases();

  // 추천 성장 활동
  const getRecommendedActivities = () => {
    const activities = [];

    if (dayElement === '수') {
      activities.push('철학 입문서 읽기');
      activities.push('논리학 학습');
    } else if (dayElement === '화') {
      activities.push('창작 활동 (글쓰기, 그림 등)');
      activities.push('발표/프레젠테이션');
    } else if (dayElement === '목') {
      activities.push('독서 토론 모임');
      activities.push('다양한 분야 탐색');
    } else if (dayElement === '금') {
      activities.push('체계적 학습 계획');
      activities.push('정리/요약 훈련');
    } else if (dayElement === '토') {
      activities.push('꾸준한 복습');
      activities.push('기초 탄탄히');
    }

    if (인성 >= 2) activities.push('고전 명저 독서');
    if (식상 >= 2) activities.push('프로젝트 기반 학습');
    if (관성 >= 2) activities.push('목표 기반 챌린지');

    return activities.slice(0, 6);
  };

  const recommendedActivities = getRecommendedActivities();

  // 지적 호기심 영역
  const getCuriosityAreas = () => {
    const areas = [];

    if (dayElement === '수') areas.push('철학', '심리학', '천문학');
    if (dayElement === '화') areas.push('예술', '디자인', '미디어');
    if (dayElement === '목') areas.push('생명과학', '환경', '사회학');
    if (dayElement === '금') areas.push('공학', '수학', '법학');
    if (dayElement === '토') areas.push('지리학', '건축', '경영');

    if (인성 >= 2) areas.push('역사', '문학', '언어학');
    if (식상 >= 2) areas.push('예술', '창작', '혁신');

    return [...new Set(areas)].slice(0, 8);
  };

  const curiosityAreas = getCuriosityAreas();

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
        🌱 지적 성장 방향
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님의 지적 잠재력과 성장 로드맵
      </p>

      {/* 성장 잠재력 */}
      <div className="glass rounded-2xl p-6 mb-8 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30">
        <div className="text-center mb-6">
          <p className="text-slate-400 mb-2">지적 성장 잠재력</p>
          <h3 className="text-5xl font-bold gradient-text">{growthPotential}점</h3>

          <div className="h-4 bg-slate-700 rounded-full overflow-hidden mt-4 max-w-md mx-auto">
            <motion.div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
              initial={{ width: 0 }}
              whileInView={{ width: `${growthPotential}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            />
          </div>

          <p className="mt-4 text-slate-300">
            {growthPotential >= 80 ? '🌟 무한한 성장 가능성! 꾸준히 도전하세요.' :
             growthPotential >= 65 ? '✨ 뛰어난 성장 잠재력! 체계적으로 계발하세요.' :
             growthPotential >= 50 ? '💫 좋은 기반! 관심 분야를 깊이 파고들어 보세요.' :
             '🔥 기초부터 착실히 쌓아가세요.'}
          </p>
        </div>
      </div>

      {/* 최고 성장 영역 */}
      <div className="glass rounded-2xl p-6 mb-8 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${topArea.color} flex items-center justify-center`}>
            <topArea.icon className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-slate-400">최고 성장 영역</p>
            <h3 className="text-2xl font-bold text-indigo-400">{topArea.area}</h3>
            <p className="text-3xl font-bold text-purple-400">{topArea.score}점</p>
          </div>
        </div>
        <p className="text-slate-300 mb-4">{topArea.desc}</p>
        <div>
          <p className="text-sm text-slate-400 mb-2">추천 활동</p>
          <div className="flex flex-wrap gap-2">
            {topArea.activities.map((activity, idx) => (
              <span key={idx} className="px-3 py-1 bg-indigo-500/20 rounded-full text-sm text-indigo-300">
                {activity}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 사고력 영역별 분석 */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {growthAreas.map((area, index) => (
          <motion.div
            key={area.area}
            className="glass rounded-xl p-5"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${area.color} flex items-center justify-center`}>
                <area.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">{area.area}</h4>
                <p className={`text-xl font-bold ${area.textColor}`}>{area.score}점</p>
              </div>
            </div>

            <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-3">
              <motion.div
                className={`h-full bg-gradient-to-r ${area.color}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${area.score}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </div>

            <p className="text-slate-400 text-xs mb-2">{area.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* 성장 로드맵 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-cyan-400 mb-4">
          🗺️ 성장 로드맵
        </h3>
        <div className="space-y-3">
          {growthPhases.map((phase, index) => (
            <motion.div
              key={index}
              className="glass rounded-xl p-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-bold text-white">{phase.stage}</h4>
                  <p className="text-sm text-slate-400">{phase.period}</p>
                </div>
                <span className="px-3 py-1 bg-cyan-500/20 rounded-full text-xs text-cyan-400">
                  {phase.focus}
                </span>
              </div>
              <ul className="text-sm text-slate-300 space-y-1 mt-2">
                {phase.goals.map((goal, idx) => (
                  <li key={idx}>• {goal}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 추천 성장 활동 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-yellow-400 mb-4">
          💡 추천 성장 활동
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {recommendedActivities.map((activity, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="text-yellow-400 font-bold">✦</span>
              <p className="text-slate-300">{activity}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 지적 호기심 영역 */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold text-purple-400 mb-4">
          🔍 탐구하면 좋을 분야
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {curiosityAreas.map((area, index) => (
            <motion.div
              key={index}
              className="p-3 bg-purple-500/10 rounded-xl text-center border border-purple-500/20"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <p className="text-purple-300 font-semibold">{area}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
          <p className="text-slate-300 text-sm">
            <span className="text-green-400 font-bold">🌱 성장 TIP:</span>{' '}
            {dayElement === '수' ? '깊이 있게 생각하는 시간을 충분히 가지세요. 표면적 이해에 만족하지 마세요.' :
             dayElement === '화' ? '새로운 것을 시도하는 것을 두려워하지 마세요. 실패도 성장의 일부입니다.' :
             dayElement === '목' ? '다양한 분야를 접하며 시야를 넓히세요. 융합적 사고가 강점입니다.' :
             dayElement === '금' ? '체계적으로 학습하며 단계별로 성장하세요. 기초가 탄탄해야 합니다.' :
             '꾸준함이 가장 중요합니다. 매일 조금씩 쌓아가는 것이 성공의 비결입니다.'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
