'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Globe, Languages, Headphones, BookOpen } from 'lucide-react';

interface StudyLanguageProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function StudyLanguage({ result, name }: StudyLanguageProps) {
  const dayElement = result.day.stem.element;
  const { 인성, 식상, 비겁 } = result.tenGodsCount;

  // 외국어 학습운 점수
  const getLanguageScore = () => {
    let score = 50;

    if (인성 >= 2) score += 20; // 학습 능력
    else if (인성 >= 1) score += 10;

    if (식상 >= 2) score += 15; // 표현력
    else if (식상 >= 1) score += 8;

    if (dayElement === '수') score += 15; // 분석, 암기력
    if (dayElement === '목') score += 12; // 소통 능력
    if (dayElement === '금') score += 10; // 체계적 학습

    return Math.min(Math.max(score, 30), 100);
  };

  const languageScore = getLanguageScore();

  // 언어별 적성
  const getLanguageAptitude = () => {
    return [
      {
        language: '영어',
        icon: Globe,
        difficulty: '필수',
        score: languageScore,
        color: 'from-blue-500 to-indigo-600',
        textColor: 'text-blue-400',
        features: ['글로벌 공용어', '학업/취업 필수', '자료 풍부'],
        recommendedLevel: languageScore >= 75 ? 'C1-C2 (고급)' : languageScore >= 55 ? 'B1-B2 (중급)' : 'A1-A2 (초급)',
      },
      {
        language: '중국어',
        icon: Languages,
        difficulty: '유용',
        score: Math.min(languageScore + (dayElement === '토' ? 10 : 0), 100),
        color: 'from-red-500 to-orange-600',
        textColor: 'text-red-400',
        features: ['경제 강국', '비즈니스 기회', '한자 문화'],
        recommendedLevel: languageScore >= 70 ? 'HSK 5-6급' : languageScore >= 50 ? 'HSK 3-4급' : 'HSK 1-2급',
      },
      {
        language: '일본어',
        icon: Languages,
        difficulty: '유용',
        score: Math.min(languageScore + (dayElement === '목' ? 10 : 0), 100),
        color: 'from-pink-500 to-rose-600',
        textColor: 'text-pink-400',
        features: ['한글과 유사', '문화 교류', '취업 유리'],
        recommendedLevel: languageScore >= 70 ? 'JLPT N1-N2' : languageScore >= 50 ? 'JLPT N3-N4' : 'JLPT N5',
      },
      {
        language: '기타 언어',
        icon: BookOpen,
        difficulty: '선택',
        score: Math.min(languageScore - 10 + (식상 * 5), 100),
        color: 'from-purple-500 to-violet-600',
        textColor: 'text-purple-400',
        features: ['스페인어', '프랑스어', '독일어', '베트남어'],
        recommendedLevel: '관심 분야 선택',
      },
    ];
  };

  const languages = getLanguageAptitude();

  // 학습 영역별 강점
  const getSkillStrengths = () => {
    return [
      {
        skill: '읽기 (Reading)',
        score: 50 + (인성 * 12) + (dayElement === '수' ? 15 : 0),
        color: 'from-blue-500 to-indigo-600',
        textColor: 'text-blue-400',
        tip: '독해력이 강점. 원서 읽기 추천',
      },
      {
        skill: '쓰기 (Writing)',
        score: 50 + (인성 * 10) + (dayElement === '금' ? 15 : 0),
        color: 'from-green-500 to-emerald-600',
        textColor: 'text-green-400',
        tip: '문법 체계 학습 후 작문 연습',
      },
      {
        skill: '듣기 (Listening)',
        score: 50 + (인성 * 8) + (dayElement === '수' ? 12 : dayElement === '목' ? 10 : 0),
        color: 'from-purple-500 to-violet-600',
        textColor: 'text-purple-400',
        tip: '반복 청취로 귀를 트세요',
      },
      {
        skill: '말하기 (Speaking)',
        score: 50 + (식상 * 15) + (비겁 * 10) + (dayElement === '목' ? 15 : 0),
        color: 'from-orange-500 to-amber-600',
        textColor: 'text-orange-400',
        tip: '실전 회화 연습이 중요',
      },
    ].map(skill => ({
      ...skill,
      score: Math.min(Math.max(skill.score, 30), 100),
    })).sort((a, b) => b.score - a.score);
  };

  const skills = getSkillStrengths();

  // 학습 방법 추천
  const getLearningMethods = () => {
    const methods = [];

    if (dayElement === '수') {
      methods.push('체계적 문법 학습');
      methods.push('어휘 암기 집중');
    } else if (dayElement === '화') {
      methods.push('회화 중심 학습');
      methods.push('실전 연습 우선');
    } else if (dayElement === '목') {
      methods.push('원어민 대화');
      methods.push('언어 교환');
    } else if (dayElement === '금') {
      methods.push('단계별 학습');
      methods.push('교재 완독');
    } else if (dayElement === '토') {
      methods.push('꾸준한 반복');
      methods.push('기초 다지기');
    }

    if (인성 >= 2) methods.push('독서로 실력 향상');
    if (식상 >= 2) methods.push('창작/작문 활동');
    if (비겁 >= 2) methods.push('스터디/그룹 활동');

    return methods.slice(0, 6);
  };

  const learningMethods = getLearningMethods();

  // 목표 설정
  const getGoalSuggestion = () => {
    if (languageScore >= 75) {
      return {
        shortTerm: '6개월 내 중급 수준 달성',
        longTerm: '1-2년 내 고급 수준 달성',
        target: '비즈니스 레벨, 자격증 고득점',
      };
    } else if (languageScore >= 55) {
      return {
        shortTerm: '1년 내 중급 수준 달성',
        longTerm: '2-3년 내 고급 수준 도전',
        target: '일상 회화, 자격증 중급',
      };
    } else {
      return {
        shortTerm: '6개월 내 기초 완성',
        longTerm: '2년 내 중급 수준 달성',
        target: '기본 회화, 자격증 초급',
      };
    }
  };

  const goalSuggestion = getGoalSuggestion();

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
        🌍 외국어 학습운
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님의 언어 학습 잠재력과 추천 전략
      </p>

      {/* 외국어 학습운 총점 */}
      <div className="glass rounded-2xl p-6 mb-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30">
        <div className="text-center mb-6">
          <p className="text-slate-400 mb-2">외국어 학습운</p>
          <h3 className="text-5xl font-bold gradient-text">{languageScore}점</h3>

          <div className="h-4 bg-slate-700 rounded-full overflow-hidden mt-4 max-w-md mx-auto">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
              initial={{ width: 0 }}
              whileInView={{ width: `${languageScore}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            />
          </div>

          <p className="mt-4 text-slate-300">
            {languageScore >= 80 ? '🌟 뛰어난 언어 감각! 다중 언어 학습도 가능합니다.' :
             languageScore >= 65 ? '✨ 좋은 언어 적성! 꾸준히 노력하면 유창해집니다.' :
             languageScore >= 50 ? '💫 평균적인 적성. 체계적 학습으로 극복하세요.' :
             '🔥 기초부터 차근차근. 반복이 성공의 열쇠입니다.'}
          </p>
        </div>

        {/* 목표 설정 */}
        <div className="grid md:grid-cols-3 gap-3">
          <div className="text-center p-3 bg-blue-500/10 rounded-xl">
            <p className="text-slate-400 text-sm">단기 목표</p>
            <p className="text-sm font-semibold text-blue-400">{goalSuggestion.shortTerm}</p>
          </div>
          <div className="text-center p-3 bg-purple-500/10 rounded-xl">
            <p className="text-slate-400 text-sm">장기 목표</p>
            <p className="text-sm font-semibold text-purple-400">{goalSuggestion.longTerm}</p>
          </div>
          <div className="text-center p-3 bg-indigo-500/10 rounded-xl">
            <p className="text-slate-400 text-sm">목표 수준</p>
            <p className="text-sm font-semibold text-indigo-400">{goalSuggestion.target}</p>
          </div>
        </div>
      </div>

      {/* 언어별 적성 */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {languages.map((lang, index) => (
          <motion.div
            key={lang.language}
            className="glass rounded-xl p-5"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${lang.color} flex items-center justify-center`}>
                <lang.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white">{lang.language}</h4>
                <p className={`text-2xl font-bold ${lang.textColor}`}>{lang.score}점</p>
              </div>
            </div>

            <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-3">
              <motion.div
                className={`h-full bg-gradient-to-r ${lang.color}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${lang.score}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </div>

            <div className="mb-2">
              <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">{lang.difficulty}</span>
              <span className="ml-2 text-xs text-slate-500">추천: {lang.recommendedLevel}</span>
            </div>

            <div className="flex flex-wrap gap-1">
              {lang.features.map((feature, idx) => (
                <span key={idx} className="text-xs text-slate-400">
                  {feature}{idx < lang.features.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* 4대 영역 강점 분석 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
          <Headphones className="w-6 h-6" />
          4대 영역 강점 분석
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.skill}
              className="glass rounded-xl p-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-white">{skill.skill}</h4>
                <p className={`text-xl font-bold ${skill.textColor}`}>{skill.score}점</p>
              </div>

              <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-2">
                <motion.div
                  className={`h-full bg-gradient-to-r ${skill.color}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.score}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                />
              </div>

              <p className="text-slate-400 text-xs">{skill.tip}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 학습 방법 추천 */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold text-yellow-400 mb-4">
          💡 맞춤형 학습 전략
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {learningMethods.map((method, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="text-yellow-400 font-bold">✦</span>
              <p className="text-slate-300">{method}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
          <p className="text-slate-300 text-sm">
            <span className="text-blue-400 font-bold">🎯 핵심 TIP:</span>{' '}
            {dayElement === '수' ? '문법과 어휘 체계를 탄탄히 다진 후 실전에 도전하세요.' :
             dayElement === '화' ? '일단 시작하고 실수를 두려워하지 마세요. 실전이 최고의 학습입니다.' :
             dayElement === '목' ? '원어민과 대화하며 배우세요. 소통이 가장 빠른 성장 방법입니다.' :
             dayElement === '금' ? '체계적인 교재로 단계별 학습을 하세요. 기초가 탄탄해야 합니다.' :
             '매일 조금씩 꾸준히. 반복이 언어 학습의 왕도입니다.'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
