'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { GraduationCap, Beaker, Calculator, Palette, Globe, Code } from 'lucide-react';

interface StudySubjectProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function StudySubject({ result, name }: StudySubjectProps) {
  const dayElement = result.day.stem.element;
  const { 식상, 인성, 재성, 관성 } = result.tenGodsCount;

  // 전공/과목별 적성 분석
  const getSubjectScores = () => {
    const subjects = [
      {
        name: '이과 (자연계)',
        icon: Beaker,
        color: 'from-green-500 to-emerald-600',
        textColor: 'text-green-400',
        fields: ['의학', '공학', '자연과학', '약학'],
        score: 50 + (dayElement === '금' ? 20 : 0) + (dayElement === '수' ? 15 : 0) + (인성 * 8),
      },
      {
        name: '문과 (인문계)',
        icon: GraduationCap,
        color: 'from-blue-500 to-indigo-600',
        textColor: 'text-blue-400',
        fields: ['문학', '역사', '철학', '언어'],
        score: 50 + (dayElement === '목' ? 20 : 0) + (dayElement === '수' ? 15 : 0) + (인성 * 10),
      },
      {
        name: '상경계',
        icon: Calculator,
        color: 'from-yellow-500 to-amber-600',
        textColor: 'text-yellow-400',
        fields: ['경영', '경제', '회계', '금융'],
        score: 50 + (dayElement === '토' ? 20 : 0) + (dayElement === '금' ? 15 : 0) + (재성 * 10),
      },
      {
        name: '예체능',
        icon: Palette,
        color: 'from-pink-500 to-rose-600',
        textColor: 'text-pink-400',
        fields: ['미술', '음악', '체육', '디자인'],
        score: 50 + (dayElement === '화' ? 25 : 0) + (dayElement === '목' ? 15 : 0) + (식상 * 12),
      },
      {
        name: '사회계',
        icon: Globe,
        color: 'from-purple-500 to-violet-600',
        textColor: 'text-purple-400',
        fields: ['사회학', '정치', '법학', '행정'],
        score: 50 + (dayElement === '토' ? 15 : 0) + (관성 * 12),
      },
      {
        name: 'IT/공학',
        icon: Code,
        color: 'from-cyan-500 to-blue-600',
        textColor: 'text-cyan-400',
        fields: ['컴퓨터', '정보통신', 'AI', '소프트웨어'],
        score: 50 + (dayElement === '금' ? 20 : 0) + (dayElement === '수' ? 18 : 0) + (식상 * 10),
      },
    ];

    return subjects.map(subject => ({
      ...subject,
      score: Math.min(Math.max(subject.score, 30), 100),
    })).sort((a, b) => b.score - a.score);
  };

  const subjects = getSubjectScores();
  const topSubject = subjects[0];

  // 세부 추천 전공
  const getDetailedMajors = () => {
    const majors = [];

    if (dayElement === '수') {
      majors.push('철학', '심리학', '수학', '물리학');
    } else if (dayElement === '화') {
      majors.push('예술', '디자인', '광고홍보', '공연예술');
    } else if (dayElement === '목') {
      majors.push('문학', '교육학', '환경공학', '생명과학');
    } else if (dayElement === '금') {
      majors.push('법학', '공학', '의학', '컴퓨터공학');
    } else if (dayElement === '토') {
      majors.push('경영학', '부동산학', '건축학', '회계학');
    }

    if (인성 >= 2) majors.push('교육학', '학문 연구');
    if (식상 >= 2) majors.push('예술', '창작', '콘텐츠');
    if (재성 >= 2) majors.push('경영', '금융', '무역');

    return [...new Set(majors)].slice(0, 6);
  };

  const detailedMajors = getDetailedMajors();

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
        🎓 적합한 전공/과목
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님의 사주에 맞는 학문 분야
      </p>

      {/* 최고 적성 분야 */}
      <div className="glass rounded-2xl p-6 mb-8 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${topSubject.color} flex items-center justify-center`}>
            <topSubject.icon className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-slate-400">최고 적성 분야</p>
            <h3 className="text-2xl font-bold text-indigo-400">{topSubject.name}</h3>
            <p className="text-3xl font-bold text-purple-400">{topSubject.score}점</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {topSubject.fields.map((field, index) => (
            <span key={index} className="px-3 py-1 bg-indigo-500/20 rounded-full text-sm text-indigo-300">
              {field}
            </span>
          ))}
        </div>
      </div>

      {/* 계열별 적성 점수 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {subjects.map((subject, index) => (
          <motion.div
            key={subject.name}
            className="glass rounded-xl p-5"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center`}>
                <subject.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white">{subject.name}</h4>
                <p className={`text-2xl font-bold ${subject.textColor}`}>{subject.score}점</p>
              </div>
            </div>

            {/* 점수 게이지 */}
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-3">
              <motion.div
                className={`h-full bg-gradient-to-r ${subject.color}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${subject.score}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </div>

            <div className="flex flex-wrap gap-1">
              {subject.fields.slice(0, 2).map((field, idx) => (
                <span key={idx} className="text-xs text-slate-400">
                  {field}{idx < 1 ? ',' : ''}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* 추천 세부 전공 */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold text-cyan-400 mb-4">
          📚 추천 세부 전공
        </h3>
        <div className="grid md:grid-cols-3 gap-3">
          {detailedMajors.map((major, index) => (
            <motion.div
              key={index}
              className="p-4 bg-slate-800/50 rounded-xl text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <p className="text-slate-300 font-semibold">{major}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
          <p className="text-slate-300 text-sm">
            <span className="text-blue-400 font-bold">💡 조언:</span>{' '}
            {dayElement === '수' ? '분석력과 통찰력을 활용할 수 있는 학문이 유리합니다.' :
             dayElement === '화' ? '창의성과 열정을 발휘할 수 있는 분야가 적합합니다.' :
             dayElement === '목' ? '성장과 발전 가능성이 큰 신생 학문이 좋습니다.' :
             dayElement === '금' ? '논리와 체계가 중요한 학문에서 두각을 나타냅니다.' :
             '안정적이고 실용적인 학문 분야에 강점이 있습니다.'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
