'use client';

import { SajuResult } from '@/lib/saju-calculator';
import { motion } from 'framer-motion';
import { DollarSign, Clock, Lightbulb, Target, TrendingUp, AlertCircle } from 'lucide-react';

interface CareerSidejobProps {
  result: SajuResult;
  name: string;
  birthDate: Date;
}

const ELEMENT_SIDEJOB: Record<string, {
  aptitude: string;
  sidejobs: { name: string; income: string; difficulty: string }[];
  timeAdvice: string;
  energyTip: string;
  warning: string;
}> = {
  '목': {
    aptitude: '지식과 성장을 기반으로 한 부업에 강합니다. 교육과 콘텐츠 분야에서 수입을 얻을 수 있습니다.',
    sidejobs: [
      { name: '온라인 강의 제작', income: '월 50~200만원', difficulty: '중' },
      { name: '블로그/유튜브 운영', income: '월 30~500만원', difficulty: '상' },
      { name: '코칭/멘토링', income: '시간당 5~20만원', difficulty: '중' },
      { name: '전자책 출판', income: '월 10~100만원', difficulty: '하' },
      { name: '번역/통역', income: '월 50~150만원', difficulty: '중' }
    ],
    timeAdvice: '아침 시간이나 점심시간을 활용하는 것이 효과적입니다.',
    energyTip: '성장하는 느낌을 받을 수 있는 부업을 선택하면 지치지 않습니다.',
    warning: '너무 많은 프로젝트를 동시에 진행하면 본업에 지장이 생깁니다.'
  },
  '화': {
    aptitude: '표현력과 열정을 살린 부업에 적합합니다. 사람들과 교류하는 활동에서 수입을 얻습니다.',
    sidejobs: [
      { name: '라이브 커머스', income: '회당 10~50만원', difficulty: '중' },
      { name: 'SNS 마케팅 대행', income: '월 50~200만원', difficulty: '중' },
      { name: '프리랜서 MC/사회자', income: '회당 20~100만원', difficulty: '상' },
      { name: '인플루언서 활동', income: '월 100~1000만원', difficulty: '상' },
      { name: '강연/워크샵', income: '회당 30~100만원', difficulty: '중' }
    ],
    timeAdvice: '저녁 시간이나 주말을 활용해 사람들과 교류하는 활동을 하세요.',
    energyTip: '주목받고 인정받는 활동에서 에너지를 얻습니다.',
    warning: '번아웃을 조심하세요. 충분한 휴식이 필요합니다.'
  },
  '토': {
    aptitude: '안정적이고 꾸준한 수입을 주는 부업에 강합니다. 부동산과 재테크 관련 활동이 유리합니다.',
    sidejobs: [
      { name: '부동산 임대', income: '월 50~200만원', difficulty: '하' },
      { name: '중고 거래/리셀', income: '월 30~100만원', difficulty: '하' },
      { name: '배달/운송', income: '월 50~150만원', difficulty: '중' },
      { name: '투자 컨설팅', income: '월 100~300만원', difficulty: '상' },
      { name: '프랜차이즈 관리', income: '월 100~500만원', difficulty: '중' }
    ],
    timeAdvice: '본업에 지장이 없는 범위에서 꾸준히 하는 것이 좋습니다.',
    energyTip: '안정적인 수입이 들어오는 것을 확인하면 동기부여가 됩니다.',
    warning: '새로운 것에 도전하기보다 검증된 부업을 선택하세요.'
  },
  '금': {
    aptitude: '전문 기술과 정밀함을 요하는 부업에 강합니다. IT와 금융 관련 프리랜싱이 유리합니다.',
    sidejobs: [
      { name: '프리랜서 개발', income: '월 200~500만원', difficulty: '상' },
      { name: '재무/세무 상담', income: '월 50~200만원', difficulty: '중' },
      { name: '주식/암호화폐 투자', income: '변동', difficulty: '상' },
      { name: '번역/교정', income: '월 50~150만원', difficulty: '중' },
      { name: '품질 검수/테스트', income: '월 30~100만원', difficulty: '하' }
    ],
    timeAdvice: '체계적으로 시간을 정해놓고 부업에 할당하세요.',
    energyTip: '전문성이 인정받을 때 만족감을 느낍니다.',
    warning: '완벽주의로 인해 효율이 떨어지지 않도록 주의하세요.'
  },
  '수': {
    aptitude: '창의적이고 유연한 부업에 적합합니다. 아이디어와 기획력을 활용한 활동이 유리합니다.',
    sidejobs: [
      { name: '콘텐츠 기획/제작', income: '월 100~300만원', difficulty: '중' },
      { name: '해외 구매대행', income: '월 50~200만원', difficulty: '중' },
      { name: '브랜드 컨설팅', income: '프로젝트당 100~500만원', difficulty: '상' },
      { name: '글쓰기/작가', income: '월 50~200만원', difficulty: '중' },
      { name: '온라인 사업', income: '월 100~1000만원', difficulty: '상' }
    ],
    timeAdvice: '영감이 떠오를 때 집중적으로 작업하는 것이 효과적입니다.',
    energyTip: '다양한 경험과 새로운 시도에서 동기부여를 얻습니다.',
    warning: '방향을 자주 바꾸면 성과를 내기 어렵습니다. 하나에 집중하세요.'
  }
};

export default function CareerSidejob({ result, name }: CareerSidejobProps) {
  const dayElement = result.day.stem.element;
  const sidejob = ELEMENT_SIDEJOB[dayElement] || ELEMENT_SIDEJOB['목'];

  // 부업 적합도 점수
  const calculateSidejobScore = () => {
    let score = 55;
    const { 식상, 재성, 비겁 } = result.tenGodsCount;

    if (식상 >= 1) score += 12;
    if (재성 >= 1) score += 10;
    if (비겁 >= 2) score += 5;
    if (dayElement === '화' || dayElement === '수') score += 8;

    return Math.min(Math.max(score, 40), 95);
  };

  const sidejobScore = calculateSidejobScore();

  return (
    <motion.section
      className="glass-strong rounded-3xl p-6 md:p-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20">
          <DollarSign className="w-7 h-7 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            부업/투잡 운세
          </h2>
          <p className="text-slate-400 text-sm">{name}님의 N잡 적성</p>
        </div>
      </div>

      {/* 부업 적합도 */}
      <div className="glass rounded-2xl p-6 mb-6 bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 mb-1">부업 적합도</p>
            <span className="text-4xl font-bold text-emerald-400">{sidejobScore}점</span>
          </div>
          <div className="text-right">
            <p className="text-slate-300 text-sm">일간: {result.day.stem.ko}({dayElement})</p>
          </div>
        </div>
      </div>

      {/* 부업 적성 */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 text-cyan-400 mb-3">
          <Target className="w-5 h-5" />
          <h3 className="font-semibold">부업 적성</h3>
        </div>
        <p className="text-slate-300 leading-relaxed">{sidejob.aptitude}</p>
      </div>

      {/* 추천 부업 */}
      <div className="glass rounded-2xl p-6 mb-6">
        <h3 className="font-bold text-white mb-4">💰 추천 부업</h3>
        <div className="space-y-3">
          {sidejob.sidejobs.map((job, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-slate-800/50 rounded-xl gap-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">💼</span>
                <span className="text-white font-medium">{job.name}</span>
              </div>
              <div className="flex gap-4 text-sm">
                <span className="text-emerald-400">{job.income}</span>
                <span className={`px-2 py-0.5 rounded ${
                  job.difficulty === '상' ? 'bg-rose-500/20 text-rose-400' :
                  job.difficulty === '중' ? 'bg-amber-500/20 text-amber-400' :
                  'bg-emerald-500/20 text-emerald-400'
                }`}>
                  난이도 {job.difficulty}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 시간 관리 & 에너지 팁 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 text-blue-400 mb-3">
            <Clock className="w-5 h-5" />
            <h3 className="font-semibold">시간 관리 팁</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{sidejob.timeAdvice}</p>
        </div>

        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 text-purple-400 mb-3">
            <TrendingUp className="w-5 h-5" />
            <h3 className="font-semibold">에너지 관리</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{sidejob.energyTip}</p>
        </div>
      </div>

      {/* 주의사항 */}
      <div className="glass rounded-2xl p-6 border border-amber-500/30">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-amber-300 mb-2">⚠️ 주의사항</h3>
            <p className="text-slate-300 leading-relaxed">{sidejob.warning}</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
