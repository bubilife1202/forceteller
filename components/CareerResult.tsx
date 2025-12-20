'use client';

import { motion } from 'framer-motion';
import { Briefcase, ArrowLeft, RefreshCw, Star, Target, TrendingUp, AlertTriangle, Clock, Zap, Award, Users, DollarSign, Lightbulb, Heart, Compass, Download } from 'lucide-react';
import { calculateSaju } from '@/lib/saju-calculator';
import { downloadElementAsHtml } from '@/lib/utils/export-utils';
import { CareerFormData } from './CareerForm';
import { DAY_STEM_CAREER, TEN_GOD_CAREER, YEAR_FORTUNE, STEMS, TEN_GODS } from '@/lib/data/career-data';

interface CareerResultProps {
  formData: CareerFormData;
  onReset: () => void;
  onBack: () => void;
}

const calculateTenGod = (dayStem: string, targetStem: string): string => {
  const dayIndex = STEMS.indexOf(dayStem);
  const targetIndex = STEMS.indexOf(targetStem);
  if (dayIndex === -1 || targetIndex === -1) return '비견';
  const diff = (targetIndex - dayIndex + 10) % 10;
  return TEN_GODS[diff];
};

export default function CareerResult({ formData, onReset, onBack }: CareerResultProps) {
  // 사주 계산
  const result = calculateSaju({
    year: formData.year,
    month: formData.month,
    day: formData.day,
    hour: formData.timeUnknown ? 12 : formData.hour,
  }, formData.gender);

  const currentYear = new Date().getFullYear();
  const dayStem = result.day.stem.ko;
  const careerProfile = DAY_STEM_CAREER[dayStem] || DAY_STEM_CAREER['갑'];

  // 올해 운세 계산 (년주 기준)
  const yearTenGod = result.tenGods.year;
  const yearFortune = YEAR_FORTUNE[yearTenGod] || YEAR_FORTUNE['비견'];
  const tenGodCareer = TEN_GOD_CAREER[yearTenGod] || TEN_GOD_CAREER['비견'];

  // 대운 분석
  const currentAge = currentYear - formData.year + 1;
  const currentDaeun = result.daeun.find(d => d.age <= currentAge && currentAge < d.age + 10);
  const daeunTenGod = currentDaeun ? calculateTenGod(dayStem, currentDaeun.stem.ko) : '비견';
  const daeunCareer = TEN_GOD_CAREER[daeunTenGod] || TEN_GOD_CAREER['비견'];

  // 직업 적합도 점수
  const calculateJobScore = () => {
    let score = 60;
    if (['식신', '편재', '정재', '정인'].includes(yearTenGod)) score += 15;
    if (['식신', '편재', '정인'].includes(daeunTenGod)) score += 10;
    if (['겁재', '편관'].includes(yearTenGod)) score -= 10;
    return Math.min(95, Math.max(35, score + (currentAge % 10)));
  };

  const jobScore = calculateJobScore();

  const getScoreColor = (score: number) => {
    if (score >= 80) return { text: 'text-emerald-400', bg: 'bg-emerald-500/20', border: 'border-emerald-500' };
    if (score >= 60) return { text: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500' };
    if (score >= 40) return { text: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500' };
    return { text: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500' };
  };

  const scoreColor = getScoreColor(jobScore);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // 고민별 콘텐츠
  const getConcernContent = () => {
    switch (formData.concern) {
      case 'job_fit':
        return {
          title: '나에게 맞는 직업은?',
          icon: <Target className="w-6 h-6" />,
          content: (
            <div className="space-y-4">
              <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/30">
                <h4 className="font-medium text-purple-300 mb-2">타고난 직업 적성</h4>
                <p className="text-white">{careerProfile.personality}</p>
                <p className="text-slate-400 mt-2">원소: {careerProfile.element}</p>
              </div>
              <div>
                <h4 className="font-medium text-emerald-400 mb-2 flex items-center gap-2">
                  <Star className="w-4 h-4" /> 추천 직업군
                </h4>
                <div className="flex flex-wrap gap-2">
                  {careerProfile.idealJobs.map((job, i) => (
                    <span key={i} className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm">{job}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-red-400 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> 피해야 할 직업
                </h4>
                <div className="flex flex-wrap gap-2">
                  {careerProfile.avoidJobs.map((job, i) => (
                    <span key={i} className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm">{job}</span>
                  ))}
                </div>
              </div>
            </div>
          ),
        };
      case 'promotion':
        return {
          title: '승진/성공 시기',
          icon: <TrendingUp className="w-6 h-6" />,
          content: (
            <div className="space-y-4">
              <div className={`p-4 rounded-xl border ${scoreColor.border} ${scoreColor.bg}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-400">올해 승진운</span>
                  <span className={`text-2xl font-bold ${scoreColor.text}`}>{jobScore}점</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div className={`h-3 rounded-full ${scoreColor.text.replace('text-', 'bg-')}`} style={{ width: `${jobScore}%` }} />
                </div>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-xl">
                <h4 className="font-medium text-blue-400 mb-2">올해의 승진운</h4>
                <p className="text-slate-300">{yearFortune.promotion}</p>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-xl">
                <h4 className="font-medium text-purple-400 mb-2">현재 대운의 흐름</h4>
                <p className="text-slate-300">{daeunCareer.promotion}</p>
              </div>
            </div>
          ),
        };
      case 'change':
        return {
          title: '이직 타이밍',
          icon: <Compass className="w-6 h-6" />,
          content: (
            <div className="space-y-4">
              <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/30">
                <h4 className="font-medium text-indigo-300 mb-2">현재 이직 적합도</h4>
                <p className="text-slate-300">{yearFortune.change}</p>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-xl">
                <h4 className="font-medium text-cyan-400 mb-2">대운으로 본 이직운</h4>
                <p className="text-slate-300">{daeunCareer.change}</p>
              </div>
              <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/30">
                <h4 className="font-medium text-yellow-400 mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" /> 이직 조언
                </h4>
                <p className="text-slate-300">{tenGodCareer.change}</p>
              </div>
            </div>
          ),
        };
      case 'startup':
        return {
          title: '창업 적성과 시기',
          icon: <Zap className="w-6 h-6" />,
          content: (
            <div className="space-y-4">
              <div className="p-4 bg-orange-500/10 rounded-xl border border-orange-500/30">
                <h4 className="font-medium text-orange-300 mb-2">창업 적성</h4>
                <p className="text-slate-300">{tenGodCareer.startup}</p>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-xl">
                <h4 className="font-medium text-emerald-400 mb-2">올해 창업 타이밍</h4>
                <p className="text-slate-300">{yearFortune.startup}</p>
              </div>
              <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/30">
                <h4 className="font-medium text-purple-400 mb-2">대운으로 본 사업운</h4>
                <p className="text-slate-300">{daeunCareer.startup}</p>
              </div>
            </div>
          ),
        };
      case 'sidejob':
        return {
          title: '부업/투잡 운세',
          icon: <DollarSign className="w-6 h-6" />,
          content: (
            <div className="space-y-4">
              <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/30">
                <h4 className="font-medium text-cyan-300 mb-2">부업 적성</h4>
                <p className="text-slate-300">
                  {careerProfile.element.includes('목') && '콘텐츠 제작, 교육, 컨설팅 부업이 적합합니다.'}
                  {careerProfile.element.includes('화') && '온라인 강의, 인플루언서, 공연 관련 부업이 유리합니다.'}
                  {careerProfile.element.includes('토') && '부동산, 중개, 재테크 관련 부업을 추천합니다.'}
                  {careerProfile.element.includes('금') && '기술 프리랜싱, 컨설팅, 품질 관리 부업이 맞습니다.'}
                  {careerProfile.element.includes('수') && '온라인 사업, 해외 거래, 창작 부업이 어울립니다.'}
                </p>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-xl">
                <h4 className="font-medium text-yellow-400 mb-2">추천 N잡</h4>
                <div className="flex flex-wrap gap-2">
                  {careerProfile.idealJobs.slice(0, 4).map((job, i) => (
                    <span key={i} className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">{job} 프리랜서</span>
                  ))}
                </div>
              </div>
            </div>
          ),
        };
    }
  };

  const concernContent = getConcernContent();

  const handleDownloadHtml = () => {
    const today = new Date().toISOString().split('T')[0];
    downloadElementAsHtml('career-result', `${formData.name}_직업운_${today}`);
  };

  return (
    <motion.div
      className="min-h-screen px-4 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div id="career-result" className="max-w-2xl mx-auto">
        {/* 헤더 */}
        <motion.div variants={itemVariants} className="flex justify-between items-center mb-6">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>메뉴로</span>
          </button>
          <button onClick={onReset} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <RefreshCw className="w-5 h-5" />
            <span>다시하기</span>
          </button>
        </motion.div>

        {/* 타이틀 */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center shadow-lg mb-4">
            <Briefcase className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            {formData.name}님의 직업운
          </h1>
          <p className="text-purple-400">일간: {dayStem} ({careerProfile.element})</p>
        </motion.div>

        {/* 메인 고민 콘텐츠 */}
        <motion.div variants={itemVariants} className="glass rounded-3xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4 text-purple-400">
            {concernContent?.icon}
            <h2 className="text-xl font-bold text-white">{concernContent?.title}</h2>
          </div>
          {concernContent?.content}
        </motion.div>

        {/* 강점과 약점 */}
        <motion.div variants={itemVariants} className="glass rounded-3xl p-6 mb-6">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-400" />
            업무 강점과 약점
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm text-emerald-400 mb-2">강점</h4>
              <div className="space-y-1">
                {careerProfile.strengths.map((s, i) => (
                  <div key={i} className="text-sm text-slate-300">• {s}</div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm text-red-400 mb-2">약점</h4>
              <div className="space-y-1">
                {careerProfile.weaknesses.map((w, i) => (
                  <div key={i} className="text-sm text-slate-300">• {w}</div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 업무 스타일 */}
        <motion.div variants={itemVariants} className="glass rounded-3xl p-6 mb-6">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" />
            팀에서의 역할
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-slate-800/50 rounded-xl">
              <div className="text-sm text-slate-400">업무 스타일</div>
              <div className="text-white">{careerProfile.workStyle}</div>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-xl">
              <div className="text-sm text-slate-400">리더십 유형</div>
              <div className="text-white">{careerProfile.leaderType}</div>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-xl">
              <div className="text-sm text-slate-400">팀 내 역할</div>
              <div className="text-white">{careerProfile.teamRole}</div>
            </div>
          </div>
        </motion.div>

        {/* 올해의 조언 */}
        <motion.div variants={itemVariants} className="glass rounded-3xl p-6 mb-6">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            {currentYear}년 직업운 총평
          </h3>
          <div className="p-4 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-xl border border-purple-500/20">
            <p className="text-slate-300 mb-3">{yearFortune.overall}</p>
            <div className="flex items-start gap-2 p-3 bg-yellow-500/10 rounded-lg">
              <Heart className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <p className="text-yellow-300 text-sm"><strong>핵심 조언:</strong> {yearFortune.advice}</p>
            </div>
          </div>
        </motion.div>

        {/* 하단 버튼 */}
        <motion.div variants={itemVariants} className="space-y-3">
          <button
            onClick={handleDownloadHtml}
            className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl text-white font-bold text-lg hover:from-amber-600 hover:to-amber-700 transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <Download className="w-5 h-5" />
            결과 저장하기
          </button>
          <div className="flex gap-3">
            <button
              onClick={onBack}
              className="flex-1 py-4 bg-slate-700 hover:bg-slate-600 rounded-2xl text-white font-medium transition-colors"
            >
              다른 메뉴 보기
            </button>
            <button
              onClick={onReset}
              className="flex-1 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl text-white font-medium hover:from-indigo-600 hover:to-purple-600 transition-all"
            >
              다른 고민 분석
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
