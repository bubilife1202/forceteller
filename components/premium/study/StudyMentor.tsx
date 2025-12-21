'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Users, Star, Heart, TrendingUp } from 'lucide-react';

interface StudyMentorProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function StudyMentor({ result, name }: StudyMentorProps) {
  const dayElement = result.day.stem.element;
  const { 인성, 관성, 비겁 } = result.tenGodsCount;

  // 스승운 점수
  const getMentorScore = () => {
    let score = 50;

    if (인성 >= 2) score += 25; // 스승의 은혜
    else if (인성 >= 1) score += 15;

    if (관성 >= 1) score += 10; // 선생님과의 관계

    if (dayElement === '수') score += 10; // 지혜 추구
    if (dayElement === '목') score += 15; // 성장, 배움

    return Math.min(Math.max(score, 30), 100);
  };

  const mentorScore = getMentorScore();

  // 이상적인 스승/멘토 유형
  const getIdealMentorType = () => {
    if (인성 >= 2) {
      return {
        type: '학문적 스승',
        icon: '📚',
        desc: '깊은 학문적 조예를 가진 전문가형 멘토',
        qualities: ['전문성', '체계적 가르침', '인내심'],
      };
    }
    if (비겁 >= 2) {
      return {
        type: '동료 멘토',
        icon: '🤝',
        desc: '함께 성장하는 또래 친구나 선배',
        qualities: ['공감능력', '동기부여', '실질적 조언'],
      };
    }
    if (관성 >= 2) {
      return {
        type: '엄격한 스승',
        icon: '⚖️',
        desc: '목표 달성을 위해 엄격하게 이끄는 멘토',
        qualities: ['목표 지향', '체계성', '책임감'],
      };
    }
    return {
      type: '온화한 스승',
      icon: '☀️',
      desc: '따뜻하게 격려하며 이끄는 멘토',
      qualities: ['격려', '이해심', '긍정적 피드백'],
    };
  };

  const idealMentor = getIdealMentorType();

  // 오행별 멘토 찾기
  const getMentorByElement = () => {
    const mentors = [
      {
        element: '목',
        personality: '성장형 멘토',
        color: 'from-green-500 to-emerald-600',
        textColor: 'text-green-400',
        characteristics: '창의적, 소통 능력, 성장 중시',
        compatibility: dayElement === '수' ? 95 : dayElement === '화' ? 90 : 70,
      },
      {
        element: '화',
        personality: '열정형 멘토',
        color: 'from-red-500 to-orange-600',
        textColor: 'text-red-400',
        characteristics: '열정적, 동기부여, 추진력',
        compatibility: dayElement === '목' ? 95 : dayElement === '토' ? 90 : 70,
      },
      {
        element: '토',
        personality: '안정형 멘토',
        color: 'from-yellow-500 to-amber-600',
        textColor: 'text-yellow-400',
        characteristics: '신뢰감, 인내심, 체계적',
        compatibility: dayElement === '화' ? 95 : dayElement === '금' ? 90 : 70,
      },
      {
        element: '금',
        personality: '원칙형 멘토',
        color: 'from-blue-500 to-indigo-600',
        textColor: 'text-blue-400',
        characteristics: '논리적, 체계적, 정확성',
        compatibility: dayElement === '토' ? 95 : dayElement === '수' ? 90 : 70,
      },
      {
        element: '수',
        personality: '지혜형 멘토',
        color: 'from-purple-500 to-violet-600',
        textColor: 'text-purple-400',
        characteristics: '지혜로움, 통찰력, 분석력',
        compatibility: dayElement === '금' ? 95 : dayElement === '목' ? 90 : 70,
      },
    ].sort((a, b) => b.compatibility - a.compatibility);

    return mentors;
  };

  const mentorTypes = getMentorByElement();
  const bestMentorType = mentorTypes[0];

  // 멘토 관계 활용법
  const getMentorRelationshipTips = () => {
    const tips = [];

    tips.push('정기적으로 조언 구하기');
    tips.push('배운 내용 실천하고 피드백 받기');

    if (인성 >= 2) {
      tips.push('깊이 있는 질문으로 배움 확장');
      tips.push('추천 도서나 자료 적극 활용');
    }

    if (비겁 >= 2) {
      tips.push('멘토와 동료들과 네트워크 형성');
      tips.push('스터디 그룹 활동');
    }

    if (관성 >= 1) {
      tips.push('멘토가 제시한 목표 달성하기');
      tips.push('성과 공유로 관계 강화');
    }

    return tips.slice(0, 6);
  };

  const relationshipTips = getMentorRelationshipTips();

  // 멘토 찾는 방법
  const getHowToFindMentor = () => {
    return [
      {
        method: '학교/학원',
        description: '뛰어난 선생님께 적극적으로 질문',
        적합도: 90,
      },
      {
        method: '온라인 커뮤니티',
        description: '관심 분야 전문가들과 교류',
        적합도: 75,
      },
      {
        method: '선배/동문',
        description: '같은 길을 먼저 걸은 선배의 조언',
        적합도: 80,
      },
      {
        method: '전문 멘토링 프로그램',
        description: '체계적인 멘토링 서비스 이용',
        적합도: 85,
      },
    ];
  };

  const findMentorMethods = getHowToFindMentor();

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
        👨‍🏫 스승/멘토 운세
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님과 인연이 깊은 멘토 유형
      </p>

      {/* 스승운 총점 */}
      <div className="glass rounded-2xl p-6 mb-8 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30">
        <div className="text-center mb-6">
          <p className="text-slate-400 mb-2">스승/멘토 운세</p>
          <h3 className="text-5xl font-bold gradient-text">{mentorScore}점</h3>

          <div className="h-4 bg-slate-700 rounded-full overflow-hidden mt-4 max-w-md mx-auto">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
              initial={{ width: 0 }}
              whileInView={{ width: `${mentorScore}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            />
          </div>

          <p className="mt-4 text-slate-300">
            {mentorScore >= 80 ? '🌟 훌륭한 스승을 만날 운! 적극적으로 배움을 구하세요.' :
             mentorScore >= 65 ? '✨ 좋은 멘토와의 인연! 겸손하게 배우세요.' :
             mentorScore >= 50 ? '💫 스스로 멘토를 찾는 노력이 필요합니다.' :
             '🔥 독학도 훌륭한 방법. 다양한 자료로 배우세요.'}
          </p>
        </div>
      </div>

      {/* 이상적인 멘토 유형 */}
      <div className="glass rounded-2xl p-6 mb-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl">{idealMentor.icon}</span>
          <div>
            <p className="text-slate-400">이상적인 멘토 유형</p>
            <h3 className="text-2xl font-bold text-cyan-400">{idealMentor.type}</h3>
          </div>
        </div>
        <p className="text-slate-300 mb-4">{idealMentor.desc}</p>
        <div className="flex flex-wrap gap-2">
          {idealMentor.qualities.map((quality, idx) => (
            <span key={idx} className="px-3 py-1 bg-cyan-500/20 rounded-full text-sm text-cyan-300">
              {quality}
            </span>
          ))}
        </div>
      </div>

      {/* 오행별 멘토 궁합 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {mentorTypes.map((mentor, index) => (
          <motion.div
            key={mentor.element}
            className="glass rounded-xl p-5"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-white">{mentor.personality}</h4>
                <span className="text-xs text-slate-500">({mentor.element})</span>
              </div>
              <p className={`text-2xl font-bold ${mentor.textColor}`}>{mentor.compatibility}점</p>
            </div>

            <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-3">
              <motion.div
                className={`h-full bg-gradient-to-r ${mentor.color}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${mentor.compatibility}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </div>

            <p className="text-slate-400 text-xs">{mentor.characteristics}</p>
          </motion.div>
        ))}
      </div>

      {/* 최고 궁합 멘토 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Star className="w-6 h-6 text-yellow-400" />
          <h3 className="text-xl font-bold text-yellow-400">최고 궁합 멘토</h3>
        </div>
        <div className={`p-4 bg-gradient-to-r ${bestMentorType.color} bg-opacity-10 rounded-xl border border-opacity-30`}>
          <h4 className={`text-lg font-bold ${bestMentorType.textColor} mb-2`}>
            {bestMentorType.personality} ({bestMentorType.element})
          </h4>
          <p className="text-slate-300 mb-2">{bestMentorType.characteristics}</p>
          <p className="text-sm text-slate-400">
            궁합도: <span className={`font-bold ${bestMentorType.textColor}`}>{bestMentorType.compatibility}점</span>
          </p>
        </div>
      </div>

      {/* 멘토 관계 활용법 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
          <Heart className="w-6 h-6" />
          멘토 관계 활용법
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {relationshipTips.map((tip, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="text-green-400 font-bold">✓</span>
              <p className="text-slate-300">{tip}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 멘토 찾는 방법 */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
          <Users className="w-6 h-6" />
          멘토 찾는 방법
        </h3>
        <div className="space-y-3">
          {findMentorMethods.map((method, index) => (
            <motion.div
              key={index}
              className="glass rounded-xl p-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-white">{method.method}</h4>
                <span className="text-sm font-semibold text-purple-400">{method.적합도}%</span>
              </div>
              <p className="text-slate-400 text-sm">{method.description}</p>

              <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden mt-2">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-600"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${method.적합도}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
