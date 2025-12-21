'use client';

import { SajuResult } from '@/lib/saju-calculator';
import { motion } from 'framer-motion';
import { RotateCcw, Download, Mail, Share2, ArrowLeft } from 'lucide-react';
import { downloadElementAsHtml } from '@/lib/utils/export-utils';
import { shareToKakao } from '@/lib/utils/kakao-share';
import EmailModal from './ui/EmailModal';
import { useState } from 'react';

// Premium sub-components
import Wealth2026Hero from './premium/wealth2026/Wealth2026Hero';
import Wealth2026Analysis from './premium/wealth2026/Wealth2026Analysis';
import Wealth2026Income from './premium/wealth2026/Wealth2026Income';
import Wealth2026Expense from './premium/wealth2026/Wealth2026Expense';
import Wealth2026Investment from './premium/wealth2026/Wealth2026Investment';
import Wealth2026Windfall from './premium/wealth2026/Wealth2026Windfall';
import Wealth2026Monthly from './premium/wealth2026/Wealth2026Monthly';
import Wealth2026Lucky from './premium/wealth2026/Wealth2026Lucky';
import Wealth2026Advice from './premium/wealth2026/Wealth2026Advice';
import Wealth2026Business from './premium/wealth2026/Wealth2026Business';
import Wealth2026Debt from './premium/wealth2026/Wealth2026Debt';
import Wealth2026Partner from './premium/wealth2026/Wealth2026Partner';
import Wealth2026RealEstate from './premium/wealth2026/Wealth2026RealEstate';
import Wealth2026Saving from './premium/wealth2026/Wealth2026Saving';
// 신규 추가 섹션
import Wealth2026ActionPlan from './premium/wealth2026/Wealth2026ActionPlan';
import Wealth2026Career from './premium/wealth2026/Wealth2026Career';
import Wealth2026SideHustle from './premium/wealth2026/Wealth2026SideHustle';
import Wealth2026Stock from './premium/wealth2026/Wealth2026Stock';
import Wealth2026Tax from './premium/wealth2026/Wealth2026Tax';
import Wealth2026Lottery from './premium/wealth2026/Wealth2026Lottery';
import Wealth2026Quarter from './premium/wealth2026/Wealth2026Quarter';
import Wealth2026Weakness from './premium/wealth2026/Wealth2026Weakness';

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
  const dayElement = result.day.stem.element;

  // 재물운 총점 계산
  const calculateWealthScore = () => {
    let score = 50;
    const { 재성, 식상, 관성: _관성, 비겁 } = result.tenGodsCount;

    // 재성 가점
    if (재성 >= 2) score += 15;
    else if (재성 >= 1) score += 8;

    // 식상 가점 (재성을 생함)
    if (식상 >= 2) score += 10;
    else if (식상 >= 1) score += 5;

    // 일간과 병오년 관계
    if (dayElement === '토') score += 20; // 화생토 - 최고
    if (dayElement === '화') score += 10; // 비겁운
    if (dayElement === '목') score += 5; // 목생화
    if (dayElement === '금') score -= 15; // 화극금
    if (dayElement === '수') score += 8; // 수극화 (통제)

    // 용신이 화이면 가점
    if (result.yongsin === '화') score += 15;

    // 비겁 과다 감점
    if (비겁 >= 3) score -= 10;

    // 범위 제한
    return Math.min(Math.max(score, 30), 100);
  };

  const wealthScore = calculateWealthScore();

  // 등급 판정
  const getWealthGrade = () => {
    if (wealthScore >= 80) return '대박';
    if (wealthScore >= 65) return '상승';
    if (wealthScore >= 50) return '안정';
    return '주의';
  };

  // 키워드 생성
  const getKeywords = () => {
    const keywords = [];
    const { 재성, 식상 } = result.tenGodsCount;

    if (wealthScore >= 70) keywords.push('재물복 상승');
    if (dayElement === '토') keywords.push('부동산 유리');
    if (재성 >= 2) keywords.push('투자 적기');
    if (식상 >= 2) keywords.push('부수입 기회');
    if (dayElement === '금') keywords.push('저축 권장');
    if (dayElement === '화') keywords.push('사업 확장');

    if (keywords.length < 3) {
      keywords.push('꾸준한 노력', '계획적 재테크');
    }

    return keywords.slice(0, 4);
  };

  const wealthGrade = getWealthGrade();
  const keywords = getKeywords();

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
    <div id="wealth2026-result" className="w-full max-w-6xl mx-auto space-y-12 py-12 px-4">
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

      {/* Hero Section */}
      <Wealth2026Hero
        result={result}
        name={name}
        wealthScore={wealthScore}
        wealthGrade={wealthGrade}
        keywords={keywords}
      />

      {/* Action Buttons */}
      <div className="flex justify-center gap-3 flex-wrap">
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

      {/* 사주 재성 분석 */}
      <Wealth2026Analysis result={result} name={name} />

      {/* 수입운 상세 */}
      <Wealth2026Income result={result} name={name} baseScore={wealthScore} />

      {/* 지출운 분석 */}
      <Wealth2026Expense result={result} name={name} baseScore={wealthScore} />

      {/* 투자운 상세 */}
      <Wealth2026Investment result={result} name={name} baseScore={wealthScore} />

      {/* 횡재운 */}
      <Wealth2026Windfall result={result} name={name} baseScore={wealthScore} />

      {/* 월별 재물 캘린더 */}
      <Wealth2026Monthly result={result} name={name} baseScore={wealthScore} />

      {/* 재물 행운 아이템 */}
      <Wealth2026Lucky result={result} name={name} />

      {/* 주의사항 & 조언 */}
      <Wealth2026Advice result={result} name={name} wealthScore={wealthScore} />

      {/* 사업운 분석 */}
      <Wealth2026Business result={result} name={name} baseScore={wealthScore} />

      {/* 부채/빚 관리운 */}
      <Wealth2026Debt result={result} name={name} baseScore={wealthScore} />

      {/* 동업/파트너십운 */}
      <Wealth2026Partner result={result} name={name} baseScore={wealthScore} />

      {/* 부동산운 */}
      <Wealth2026RealEstate result={result} name={name} baseScore={wealthScore} />

      {/* 저축/절약운 */}
      <Wealth2026Saving result={result} name={name} baseScore={wealthScore} />

      {/* 분기별 재물 전략 */}
      <Wealth2026Quarter result={result} name={name} baseScore={wealthScore} />

      {/* 월별 실행 계획 */}
      <Wealth2026ActionPlan result={result} name={name} baseScore={wealthScore} />

      {/* 직장/승진운 */}
      <Wealth2026Career result={result} name={name} baseScore={wealthScore} />

      {/* 부업/투잡 가이드 */}
      <Wealth2026SideHustle result={result} name={name} baseScore={wealthScore} />

      {/* 주식/펀드 투자 */}
      <Wealth2026Stock result={result} name={name} baseScore={wealthScore} />

      {/* 절세/세금 가이드 */}
      <Wealth2026Tax result={result} name={name} baseScore={wealthScore} />

      {/* 복권/행운 운세 */}
      <Wealth2026Lottery result={result} name={name} baseScore={wealthScore} />

      {/* 재물 약점 분석 */}
      <Wealth2026Weakness result={result} name={name} baseScore={wealthScore} />

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
        htmlContent={`${name}님의 2026년 대박 재물운 결과입니다.\n\n재물운 점수: ${wealthScore}점 (${wealthGrade})\n일간: ${result.day.stem.ko}(${dayElement})\n\n핵심 키워드: ${keywords.join(', ')}`}
        fortuneType="wealth2026"
        title={`${name}님의 2026 대박 재물운`}
      />
    </div>
  );
}
