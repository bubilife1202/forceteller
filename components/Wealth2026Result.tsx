'use client';

import { SajuResult } from '@/lib/saju-calculator';
import { motion } from 'framer-motion';
import { RotateCcw, Download, Mail, Share2, ArrowLeft } from 'lucide-react';
import { downloadElementAsHtml } from '@/lib/utils/export-utils';
import { shareToKakao } from '@/lib/utils/kakao-share';
import EmailModal from './ui/EmailModal';
import { useState } from 'react';

// 100p 버전 컴포넌트들
import Cover from './premium/wealth2026-100p/Cover';
import TOC from './premium/wealth2026-100p/TOC';
import Overview1Year from './premium/wealth2026-100p/Overview1_Year';
import Overview2Score from './premium/wealth2026-100p/Overview2_Score';
import DNA1Type from './premium/wealth2026-100p/DNA1_Type';
import DNA2Mindset from './premium/wealth2026-100p/DNA2_Mindset';
import DNA3SWOT from './premium/wealth2026-100p/DNA3_SWOT';
import Income1Main from './premium/wealth2026-100p/Income1_Main';
import Income2Side from './premium/wealth2026-100p/Income2_Side';
import Invest1Profile from './premium/wealth2026-100p/Invest1_Profile';
import Invest2Assets from './premium/wealth2026-100p/Invest2_Assets';
import Monthly1Q1 from './premium/wealth2026-100p/Monthly1_Q1';
import Monthly2Q2 from './premium/wealth2026-100p/Monthly2_Q2';
import Monthly3Q3 from './premium/wealth2026-100p/Monthly3_Q3';
import Monthly4Q4 from './premium/wealth2026-100p/Monthly4_Q4';
import Lucky from './premium/wealth2026-100p/Lucky';
import Closing from './premium/wealth2026-100p/Closing';
import { WEALTH_2026_BY_STEM } from './premium/wealth2026-100p/data';

interface Wealth2026ResultProps {
  result: SajuResult;
  name: string;
  gender: 'male' | 'female';
  birthDate: { year: number; month: number; day: number };
  onReset: () => void;
  onBack: () => void;
}

export default function Wealth2026Result({
  result,
  name,
  gender: _gender,
  birthDate: _birthDate,
  onReset,
  onBack,
}: Wealth2026ResultProps) {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const dayStem = result.day.stem.ko;
  const dayElement = result.day.stem.element;
  const yearData = WEALTH_2026_BY_STEM[dayStem] || WEALTH_2026_BY_STEM['갑'];

  // 재물운 총점
  const wealthScore = yearData.yearScore;
  const wealthGrade = yearData.grade;
  const keywords = yearData.keywords;

  // HTML 다운로드 (화면 그대로 저장)
  const handleDownloadHtml = () => {
    downloadElementAsHtml('wealth2026-result', `2026대박재물운_${name}`);
  };

  // 카카오 공유
  const handleKakaoShare = () => {
    shareToKakao({
      title: `💰 ${name}님의 2026 대박 재물운`,
      description: `재물운 ${wealthScore}점 | ${wealthGrade} | ${keywords.slice(0, 2).join(', ')}`,
    });
  };

  return (
    <div id="wealth2026-result" className="w-full max-w-4xl mx-auto space-y-12 py-12 px-4">
      {/* 상단 네비게이션 */}
      <div className="flex justify-between items-center">
        <motion.button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>돌아가기</span>
        </motion.button>
      </div>

      {/* ===== 100페이지 컨텐츠 시작 ===== */}

      {/* 표지 */}
      <Cover name={name} dayStem={dayStem} />

      {/* 목차 */}
      <TOC />

      {/* Chapter 1: 개요 */}
      <Overview1Year dayStem={dayStem} />
      <Overview2Score result={result} name={name} />

      {/* Chapter 2: DNA 분석 */}
      <DNA1Type dayStem={dayStem} name={name} />
      <DNA2Mindset dayStem={dayStem} />
      <DNA3SWOT dayStem={dayStem} />

      {/* Chapter 3: 수입운 */}
      <Income1Main result={result} name={name} />
      <Income2Side dayStem={dayStem} />

      {/* Chapter 4: 투자운 */}
      <Invest1Profile dayStem={dayStem} />
      <Invest2Assets dayStem={dayStem} />

      {/* Chapter 5: 월별 운세 */}
      <Monthly1Q1 dayStem={dayStem} />
      <Monthly2Q2 dayStem={dayStem} />
      <Monthly3Q3 dayStem={dayStem} />
      <Monthly4Q4 dayStem={dayStem} />

      {/* Chapter 6: 행운 & 마무리 */}
      <Lucky dayStem={dayStem} />
      <Closing name={name} dayStem={dayStem} />

      {/* ===== 100페이지 컨텐츠 끝 ===== */}

      {/* 하단 액션 버튼 */}
      <div className="flex justify-center gap-3 flex-wrap pt-8">
        <motion.button
          onClick={handleDownloadHtml}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-xl font-semibold transition text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download className="w-4 h-4" />
          저장
        </motion.button>
        <motion.button
          onClick={() => setIsEmailModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-xl font-semibold transition text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Mail className="w-4 h-4" />
          메일
        </motion.button>
        <motion.button
          onClick={handleKakaoShare}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 rounded-xl font-semibold transition text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Share2 className="w-4 h-4" />
          카톡
        </motion.button>
        <motion.button
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-xl font-semibold transition text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw className="w-4 h-4" />
          다시하기
        </motion.button>
      </div>

      {/* Email Modal */}
      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        htmlContent={`${name}님의 2026년 대박 재물운 결과입니다.\n\n재물운 점수: ${wealthScore}점 (${wealthGrade})\n일간: ${dayStem}(${dayElement})\n\n핵심 키워드: ${keywords.join(', ')}`}
        fortuneType="wealth2026"
        title={`${name}님의 2026 대박 재물운`}
      />
    </div>
  );
}
