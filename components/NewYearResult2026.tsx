'use client';

import { SajuResult } from '@/lib/saju-calculator';
import { motion } from 'framer-motion';
import { RotateCcw, Download, Mail, Share2, ArrowLeft } from 'lucide-react';
import { downloadElementAsHtml } from '@/lib/utils/export-utils';
import { shareToKakao } from '@/lib/utils/kakao-share';
import EmailModal from './ui/EmailModal';
import { useState } from 'react';

// 100p 버전 컴포넌트들
import Cover from './premium/newyear2026-100p/Cover';
import TOC from './premium/newyear2026-100p/TOC';
import Overview from './premium/newyear2026-100p/Overview';
import SajuAnalysis from './premium/newyear2026-100p/SajuAnalysis';
import YearRelation from './premium/newyear2026-100p/YearRelation';
import Personality from './premium/newyear2026-100p/Personality';
import WealthMain from './premium/newyear2026-100p/WealthMain';
import WealthInvest from './premium/newyear2026-100p/WealthInvest';
import LoveMain from './premium/newyear2026-100p/LoveMain';
import Marriage from './premium/newyear2026-100p/Marriage';
import CareerMain from './premium/newyear2026-100p/CareerMain';
import Business from './premium/newyear2026-100p/Business';
import HealthMain from './premium/newyear2026-100p/HealthMain';
import HealthDetail from './premium/newyear2026-100p/HealthDetail';
import FamilyMain from './premium/newyear2026-100p/FamilyMain';
import SocialMain from './premium/newyear2026-100p/SocialMain';
import Monthly_Q1 from './premium/newyear2026-100p/Monthly_Q1';
import Monthly_Q2 from './premium/newyear2026-100p/Monthly_Q2';
import Monthly_Q3 from './premium/newyear2026-100p/Monthly_Q3';
import Monthly_Q4 from './premium/newyear2026-100p/Monthly_Q4';
import Lucky from './premium/newyear2026-100p/Lucky';
import Closing from './premium/newyear2026-100p/Closing';
import { NEWYEAR_2026_DATA } from './premium/newyear2026-100p/data';

interface NewYearResult2026Props {
  result: SajuResult;
  name: string;
  gender: 'male' | 'female';
  birthDate: { year: number; month: number; day: number };
  onReset: () => void;
  onBack: () => void;
  onHome?: () => void;
}

export default function NewYearResult2026({
  result,
  name,
  gender: _gender,
  birthDate: _birthDate,
  onReset,
  onBack,
  onHome,
}: NewYearResult2026Props) {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const dayStem = result.day.stem.ko;
  const dayElement = result.day.stem.element;

  // 총운 데이터
  const yearData = NEWYEAR_2026_DATA[dayStem] || NEWYEAR_2026_DATA['갑'];

  // HTML 다운로드 (화면 그대로 저장)
  const handleDownloadHtml = () => {
    downloadElementAsHtml('newyear2026-result', `2026신년운세_${name}`);
  };

  // 카카오 공유
  const handleKakaoShare = () => {
    shareToKakao({
      title: `🐴 ${name}님의 2026 신년운세`,
      description: `2026 병오년 신년운세 | ${yearData.yearKeywords?.slice(0, 2).join(', ') || '병오년 운세'}`,
    });
  };

  // 홈으로 이동
  const handleGoHome = () => {
    if (onHome) {
      onHome();
    } else {
      onBack();
    }
  };

  return (
    <div id="newyear2026-result" className="w-full max-w-4xl mx-auto space-y-12 py-12 px-4">
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

      {/* Chapter 1: 총운 */}
      <Overview dayStem={dayStem} userName={name} />

      {/* Chapter 2: 사주 분석 */}
      <SajuAnalysis dayStem={dayStem} />
      <YearRelation dayStem={dayStem} />
      <Personality dayStem={dayStem} />

      {/* Chapter 3: 재물운 */}
      <WealthMain dayStem={dayStem} />
      <WealthInvest dayStem={dayStem} />

      {/* Chapter 4: 연애 & 결혼운 */}
      <LoveMain dayStem={dayStem} />
      <Marriage dayStem={dayStem} />

      {/* Chapter 5: 직장 & 사업운 */}
      <CareerMain dayStem={dayStem} />
      <Business dayStem={dayStem} />

      {/* Chapter 6: 건강운 */}
      <HealthMain dayStem={dayStem} />
      <HealthDetail dayStem={dayStem} />

      {/* Chapter 7: 가정 & 대인운 */}
      <FamilyMain dayStem={dayStem} />
      <SocialMain dayStem={dayStem} />

      {/* Chapter 8: 월별 운세 */}
      <Monthly_Q1 dayStem={dayStem} />
      <Monthly_Q2 dayStem={dayStem} />
      <Monthly_Q3 dayStem={dayStem} />
      <Monthly_Q4 dayStem={dayStem} />

      {/* Chapter 9: 행운 & 마무리 */}
      <Lucky dayStem={dayStem} />
      <Closing userName={name} dayStem={dayStem} />

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
        htmlContent={`${name}님의 2026년 신년운세 결과입니다.\n\n일간: ${dayStem}(${dayElement})\n\n핵심 키워드: ${yearData.yearKeywords?.join(', ') || '2026 병오년 신년운세'}`}
        fortuneType="newyear"
        title={`${name}님의 2026 신년운세`}
      />
    </div>
  );
}
