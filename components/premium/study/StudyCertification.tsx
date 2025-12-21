'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Award, ScrollText, Briefcase, TrendingUp } from 'lucide-react';

interface StudyCertificationProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function StudyCertification({ result, name }: StudyCertificationProps) {
  const dayElement = result.day.stem.element;
  const { 재성, 관성, 인성, 식상 } = result.tenGodsCount;

  // 자격증 취득운 점수
  const getCertificationScore = () => {
    let score = 50;

    if (관성 >= 2) score += 20; // 목표 달성력
    else if (관성 >= 1) score += 10;

    if (인성 >= 2) score += 15; // 학습 능력
    else if (인성 >= 1) score += 8;

    if (dayElement === '금') score += 15; // 체계적 준비
    if (dayElement === '토') score += 12; // 끈기
    if (dayElement === '수') score += 10; // 분석력

    return Math.min(Math.max(score, 30), 100);
  };

  const certScore = getCertificationScore();

  // 자격증 분야별 적성
  const getCertificationTypes = () => {
    return [
      {
        category: '전문 자격증',
        icon: Award,
        examples: ['변호사', '회계사', '세무사', '의사'],
        score: 50 + (관성 * 15) + (dayElement === '금' ? 20 : 0),
        color: 'from-blue-500 to-indigo-600',
        textColor: 'text-blue-400',
        period: '장기 (2-5년)',
      },
      {
        category: 'IT 자격증',
        icon: ScrollText,
        examples: ['정보처리기사', 'AWS', '네트워크관리사'],
        score: 50 + (식상 * 12) + (dayElement === '수' ? 20 : 0) + (dayElement === '금' ? 15 : 0),
        color: 'from-cyan-500 to-blue-600',
        textColor: 'text-cyan-400',
        period: '단기 (3-6개월)',
      },
      {
        category: '어학 자격증',
        icon: Briefcase,
        examples: ['TOEIC', 'TOEFL', 'JPT', 'HSK'],
        score: 50 + (인성 * 15) + (dayElement === '수' ? 15 : 0) + (dayElement === '목' ? 10 : 0),
        color: 'from-green-500 to-emerald-600',
        textColor: 'text-green-400',
        period: '중기 (6-12개월)',
      },
      {
        category: '금융 자격증',
        icon: TrendingUp,
        examples: ['펀드투자상담사', '증권투자상담사', 'CFA'],
        score: 50 + (재성 * 15) + (dayElement === '토' ? 20 : 0) + (dayElement === '금' ? 15 : 0),
        color: 'from-yellow-500 to-amber-600',
        textColor: 'text-yellow-400',
        period: '중기 (6-12개월)',
      },
      {
        category: '실무 자격증',
        icon: ScrollText,
        examples: ['컴퓨터활용능력', '운전면허', '한국사능력검정'],
        score: 50 + (식상 * 10) + (dayElement === '화' ? 15 : 0),
        color: 'from-orange-500 to-amber-600',
        textColor: 'text-orange-400',
        period: '단기 (1-3개월)',
      },
      {
        category: '창작/예술 자격증',
        icon: Award,
        examples: ['컬러리스트', '웹디자인기능사', '제과제빵사'],
        score: 50 + (식상 * 18) + (dayElement === '화' ? 20 : 0),
        color: 'from-pink-500 to-rose-600',
        textColor: 'text-pink-400',
        period: '중기 (3-9개월)',
      },
    ].map(type => ({
      ...type,
      score: Math.min(Math.max(type.score, 30), 100),
    })).sort((a, b) => b.score - a.score);
  };

  const certTypes = getCertificationTypes();
  const topCategory = certTypes[0];

  // 추천 자격증 우선순위
  const getRecommendedCerts = () => {
    const recommendations = [];

    if (재성 >= 2) {
      recommendations.push({ name: '재무 관련 자격증', reason: '재테크 능력 강화', priority: '높음' });
    }
    if (식상 >= 2) {
      recommendations.push({ name: '창작/디자인 자격증', reason: '창의력 활용', priority: '높음' });
    }
    if (인성 >= 2) {
      recommendations.push({ name: '전문 자격증', reason: '학습 능력 우수', priority: '높음' });
    }
    if (관성 >= 2) {
      recommendations.push({ name: '고난이도 자격증', reason: '목표 달성력 우수', priority: '높음' });
    }

    // 오행별 추천
    if (dayElement === '수') recommendations.push({ name: 'IT/데이터 자격증', reason: '분석력 강점', priority: '중간' });
    if (dayElement === '화') recommendations.push({ name: '실기/실무 자격증', reason: '실천력 강점', priority: '중간' });
    if (dayElement === '목') recommendations.push({ name: '어학/교육 자격증', reason: '커뮤니케이션 강점', priority: '중간' });
    if (dayElement === '금') recommendations.push({ name: '법률/회계 자격증', reason: '논리력 강점', priority: '중간' });
    if (dayElement === '토') recommendations.push({ name: '건축/부동산 자격증', reason: '안정성 강점', priority: '중간' });

    return recommendations.slice(0, 6);
  };

  const recommendations = getRecommendedCerts();

  // 학습 전략
  const getStudyStrategy = () => {
    if (certScore >= 75) {
      return {
        approach: '적극적 도전',
        timeline: '어려운 자격증도 도전 가능',
        method: '장기 계획 수립, 단계별 학습',
      };
    } else if (certScore >= 55) {
      return {
        approach: '단계적 준비',
        timeline: '중급 난이도부터 시작',
        method: '기초 다지기 후 심화',
      };
    } else {
      return {
        approach: '기초 다지기',
        timeline: '쉬운 자격증부터 도전',
        method: '충분한 준비 기간 확보',
      };
    }
  };

  const strategy = getStudyStrategy();

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
        🏅 자격증 취득운
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님의 자격증 합격 가능성과 추천 분야
      </p>

      {/* 자격증 취득운 총점 */}
      <div className="glass rounded-2xl p-6 mb-8 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/30">
        <div className="text-center mb-6">
          <p className="text-slate-400 mb-2">자격증 취득운</p>
          <h3 className="text-5xl font-bold gradient-text">{certScore}점</h3>

          <div className="h-4 bg-slate-700 rounded-full overflow-hidden mt-4 max-w-md mx-auto">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-600"
              initial={{ width: 0 }}
              whileInView={{ width: `${certScore}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            />
          </div>

          <p className="mt-4 text-slate-300">
            {certScore >= 80 ? '🌟 자격증 취득에 최적의 운세! 어려운 시험도 도전하세요.' :
             certScore >= 65 ? '✨ 좋은 합격운! 계획적으로 준비하면 성공합니다.' :
             certScore >= 50 ? '💫 평균적인 운세. 충분한 준비로 극복 가능합니다.' :
             '🔥 쉬운 자격증부터 차근차근 도전하세요.'}
          </p>
        </div>

        {/* 학습 전략 */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="text-center p-3 bg-purple-500/10 rounded-xl">
            <p className="text-slate-400 text-sm">접근 방식</p>
            <p className="text-lg font-bold text-purple-400">{strategy.approach}</p>
          </div>
          <div className="text-center p-3 bg-indigo-500/10 rounded-xl">
            <p className="text-slate-400 text-sm">난이도</p>
            <p className="text-lg font-bold text-indigo-400">{strategy.timeline}</p>
          </div>
          <div className="text-center p-3 bg-blue-500/10 rounded-xl">
            <p className="text-slate-400 text-sm">학습법</p>
            <p className="text-lg font-bold text-blue-400">{strategy.method}</p>
          </div>
        </div>
      </div>

      {/* 최고 적성 분야 */}
      <div className="glass rounded-2xl p-6 mb-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${topCategory.color} flex items-center justify-center`}>
            <topCategory.icon className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-slate-400">가장 유리한 분야</p>
            <h3 className="text-2xl font-bold text-cyan-400">{topCategory.category}</h3>
            <p className="text-3xl font-bold text-blue-400">{topCategory.score}점</p>
          </div>
        </div>
        <div className="mb-3">
          <p className="text-sm text-slate-400 mb-2">추천 자격증</p>
          <div className="flex flex-wrap gap-2">
            {topCategory.examples.map((example, idx) => (
              <span key={idx} className="px-3 py-1 bg-cyan-500/20 rounded-full text-sm text-cyan-300">
                {example}
              </span>
            ))}
          </div>
        </div>
        <p className="text-sm text-slate-500">
          <span className="text-cyan-400">준비 기간:</span> {topCategory.period}
        </p>
      </div>

      {/* 분야별 적성 점수 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {certTypes.map((type, index) => (
          <motion.div
            key={type.category}
            className="glass rounded-xl p-5"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center`}>
                <type.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">{type.category}</h4>
                <p className={`text-xl font-bold ${type.textColor}`}>{type.score}점</p>
              </div>
            </div>

            <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-2">
              <motion.div
                className={`h-full bg-gradient-to-r ${type.color}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${type.score}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </div>

            <p className="text-slate-500 text-xs">{type.period}</p>
          </motion.div>
        ))}
      </div>

      {/* 추천 자격증 */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold text-yellow-400 mb-4">
          🎯 맞춤형 자격증 추천
        </h3>
        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <motion.div
              key={index}
              className="glass rounded-xl p-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-white">{rec.name}</h4>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  rec.priority === '높음' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'
                }`}>
                  우선순위 {rec.priority}
                </span>
              </div>
              <p className="text-slate-400 text-sm">{rec.reason}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
