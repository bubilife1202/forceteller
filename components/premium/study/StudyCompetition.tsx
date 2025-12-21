'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Trophy, Target, Zap, Award } from 'lucide-react';

interface StudyCompetitionProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function StudyCompetition({ result, name }: StudyCompetitionProps) {
  const dayElement = result.day.stem.element;
  const { 관성, 식상, 비겁, 인성 } = result.tenGodsCount;

  // 경쟁/대회 운세 점수
  const getCompetitionScore = () => {
    let score = 50;

    if (관성 >= 2) score += 20; // 목표 달성력
    else if (관성 >= 1) score += 10;

    if (식상 >= 2) score += 15; // 창의력, 표현력
    else if (식상 >= 1) score += 8;

    if (비겁 >= 2) score += 10; // 경쟁심

    if (dayElement === '화') score += 15; // 승부욕
    if (dayElement === '금') score += 12; // 체계적 준비
    if (dayElement === '수') score += 10; // 전략적 사고

    return Math.min(Math.max(score, 30), 100);
  };

  const competitionScore = getCompetitionScore();

  // 대회 유형별 적성
  const getCompetitionTypes = () => {
    return [
      {
        type: '학술 경시대회',
        icon: Trophy,
        examples: ['수학올림피아드', '과학경시대회', '퀴즈대회'],
        score: 50 + (인성 * 15) + (관성 * 10) + (dayElement === '금' ? 15 : 0),
        color: 'from-blue-500 to-indigo-600',
        textColor: 'text-blue-400',
        strength: '논리력, 지식',
      },
      {
        type: '창작 대회',
        icon: Award,
        examples: ['글쓰기', '발명', '디자인', 'UCC'],
        score: 50 + (식상 * 20) + (dayElement === '화' ? 20 : 0),
        color: 'from-pink-500 to-rose-600',
        textColor: 'text-pink-400',
        strength: '창의력, 표현력',
      },
      {
        type: '토론/발표 대회',
        icon: Target,
        examples: ['토론대회', '스피치', '프레젠테이션'],
        score: 50 + (식상 * 15) + (비겁 * 12) + (dayElement === '목' ? 15 : 0),
        color: 'from-green-500 to-emerald-600',
        textColor: 'text-green-400',
        strength: '소통력, 설득력',
      },
      {
        type: '팀 프로젝트',
        icon: Zap,
        examples: ['해커톤', '팀 과제', '그룹 연구'],
        score: 50 + (비겁 * 15) + (식상 * 10) + (dayElement === '목' ? 12 : 0),
        color: 'from-purple-500 to-violet-600',
        textColor: 'text-purple-400',
        strength: '협업, 리더십',
      },
      {
        type: '기능 경기',
        icon: Trophy,
        examples: ['코딩대회', '실기대회', '기능올림픽'],
        score: 50 + (식상 * 18) + (dayElement === '금' ? 15 : dayElement === '화' ? 12 : 0),
        color: 'from-orange-500 to-amber-600',
        textColor: 'text-orange-400',
        strength: '실력, 숙련도',
      },
      {
        type: '예체능 대회',
        icon: Award,
        examples: ['음악콩쿠르', '미술대회', '체육대회'],
        score: 50 + (식상 * 20) + (dayElement === '화' ? 18 : 0),
        color: 'from-yellow-500 to-amber-600',
        textColor: 'text-yellow-400',
        strength: '재능, 표현력',
      },
    ].map(type => ({
      ...type,
      score: Math.min(Math.max(type.score, 30), 100),
    })).sort((a, b) => b.score - a.score);
  };

  const competitionTypes = getCompetitionTypes();
  const topType = competitionTypes[0];

  // 승부처 타이밍
  const getWinningTiming = () => {
    const timings = [];

    if (dayElement === '화' || 비겁 >= 2) {
      timings.push({ phase: '초반', strategy: '강하게 시작, 주도권 장악', score: 85 });
      timings.push({ phase: '중반', strategy: '페이스 유지', score: 70 });
      timings.push({ phase: '후반', strategy: '집중력 관리 필요', score: 65 });
    } else if (dayElement === '수' || dayElement === '금') {
      timings.push({ phase: '초반', strategy: '차분하게 시작', score: 70 });
      timings.push({ phase: '중반', strategy: '전략적 접근', score: 80 });
      timings.push({ phase: '후반', strategy: '마무리 승부', score: 85 });
    } else {
      timings.push({ phase: '초반', strategy: '안정적 시작', score: 75 });
      timings.push({ phase: '중반', strategy: '실력 발휘', score: 80 });
      timings.push({ phase: '후반', strategy: '끈기로 완주', score: 75 });
    }

    return timings;
  };

  const winningTimings = getWinningTiming();

  // 성공 전략
  const getSuccessStrategies = () => {
    const strategies = [];

    if (관성 >= 2) {
      strategies.push('명확한 목표 설정과 체계적 준비');
    }
    if (식상 >= 2) {
      strategies.push('창의적 아이디어로 차별화');
    }
    if (비겁 >= 2) {
      strategies.push('경쟁자 분석과 나만의 강점 살리기');
    }
    if (인성 >= 2) {
      strategies.push('철저한 사전 학습과 지식 확보');
    }

    // 오행별 전략
    if (dayElement === '화') strategies.push('열정과 추진력으로 압도');
    if (dayElement === '수') strategies.push('냉철한 전략과 분석');
    if (dayElement === '목') strategies.push('유연한 대처와 성장');
    if (dayElement === '금') strategies.push('정확성과 완성도');
    if (dayElement === '토') strategies.push('끈기와 안정적 실력');

    return strategies.slice(0, 6);
  };

  const successStrategies = getSuccessStrategies();

  // 주의사항
  const getWarnings = () => {
    const warnings = [];

    if (비겁 >= 3) warnings.push('과도한 경쟁심 조절 필요');
    if (dayElement === '화') warnings.push('초반 페이스 조절 중요');
    if (competitionScore < 60) warnings.push('충분한 준비 기간 확보');

    warnings.push('실패도 경험. 도전을 두려워하지 말 것');
    warnings.push('결과보다 과정에서 배우기');

    return warnings;
  };

  const warnings = getWarnings();

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
        🏆 경쟁/대회 운세
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님의 승부운과 대회 적성
      </p>

      {/* 경쟁운 총점 */}
      <div className="glass rounded-2xl p-6 mb-8 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30">
        <div className="text-center mb-6">
          <p className="text-slate-400 mb-2">경쟁/대회 운세</p>
          <h3 className="text-5xl font-bold gradient-text">{competitionScore}점</h3>

          <div className="h-4 bg-slate-700 rounded-full overflow-hidden mt-4 max-w-md mx-auto">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-500 to-orange-600"
              initial={{ width: 0 }}
              whileInView={{ width: `${competitionScore}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            />
          </div>

          <p className="mt-4 text-slate-300">
            {competitionScore >= 80 ? '🌟 탁월한 승부운! 어려운 대회도 도전하세요.' :
             competitionScore >= 65 ? '✨ 좋은 경쟁력! 철저한 준비로 성공하세요.' :
             competitionScore >= 50 ? '💫 평균적인 운세. 전략적 접근이 필요합니다.' :
             '🔥 작은 대회부터 경험을 쌓으세요.'}
          </p>
        </div>
      </div>

      {/* 최고 적성 대회 */}
      <div className="glass rounded-2xl p-6 mb-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${topType.color} flex items-center justify-center`}>
            <topType.icon className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-slate-400">가장 유리한 대회</p>
            <h3 className="text-2xl font-bold text-purple-400">{topType.type}</h3>
            <p className="text-3xl font-bold text-pink-400">{topType.score}점</p>
          </div>
        </div>
        <div className="mb-3">
          <p className="text-sm text-slate-400 mb-2">추천 대회</p>
          <div className="flex flex-wrap gap-2">
            {topType.examples.map((example, idx) => (
              <span key={idx} className="px-3 py-1 bg-purple-500/20 rounded-full text-sm text-purple-300">
                {example}
              </span>
            ))}
          </div>
        </div>
        <p className="text-sm text-slate-500">
          <span className="text-purple-400">핵심 강점:</span> {topType.strength}
        </p>
      </div>

      {/* 대회 유형별 점수 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {competitionTypes.map((type, index) => (
          <motion.div
            key={type.type}
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
                <h4 className="font-bold text-white text-sm">{type.type}</h4>
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

            <p className="text-slate-500 text-xs">{type.strength}</p>
          </motion.div>
        ))}
      </div>

      {/* 승부처 타이밍 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
          <Zap className="w-6 h-6" />
          승부처 타이밍
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {winningTimings.map((timing, index) => (
            <motion.div
              key={timing.phase}
              className="glass rounded-xl p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-center mb-3">
                <h4 className="text-lg font-bold text-cyan-400 mb-1">{timing.phase}</h4>
                <p className="text-2xl font-bold text-white">{timing.score}점</p>
              </div>

              <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-2">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${timing.score}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                />
              </div>

              <p className="text-slate-400 text-sm text-center">{timing.strategy}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 성공 전략 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-green-400 mb-4">
          🎯 승리 전략
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {successStrategies.map((strategy, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 p-3 bg-green-500/10 rounded-xl border border-green-500/20"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="text-green-400 font-bold text-lg">✓</span>
              <p className="text-slate-300">{strategy}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 주의사항 */}
      <div className="glass rounded-2xl p-6 bg-orange-500/10 border border-orange-500/30">
        <h3 className="text-xl font-bold text-orange-400 mb-4">
          ⚠️ 주의사항
        </h3>
        <div className="space-y-2">
          {warnings.map((warning, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 text-slate-300"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="text-orange-400">⚠</span>
              <p>{warning}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
