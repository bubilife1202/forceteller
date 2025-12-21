'use client';

import { SajuResult } from '@/lib/saju-calculator';
import { motion } from 'framer-motion';
import { RotateCcw, Download, Mail, Share2, ArrowLeft } from 'lucide-react';
import { downloadElementAsHtml } from '@/lib/utils/export-utils';
import { shareToKakao } from '@/lib/utils/kakao-share';
import EmailModal from './ui/EmailModal';
import { useState } from 'react';

// Marriage premium sub-components
import MarriageOverview from './premium/marriage/MarriageOverview';
import MarriageIdealPartner from './premium/marriage/MarriageIdealPartner';
import MarriageTiming from './premium/marriage/MarriageTiming';
import MarriageCompatibility from './premium/marriage/MarriageCompatibility';
import MarriageLocation from './premium/marriage/MarriageLocation';
import MarriageAge from './premium/marriage/MarriageAge';
import MarriageOccupation from './premium/marriage/MarriageOccupation';
import MarriageWealth from './premium/marriage/MarriageWealth';
import MarriageFamily from './premium/marriage/MarriageFamily';
import MarriageChildren from './premium/marriage/MarriageChildren';
import MarriageConflict from './premium/marriage/MarriageConflict';
import MarriageRomance from './premium/marriage/MarriageRomance';
import MarriageLongevity from './premium/marriage/MarriageLongevity';
import MarriageMeeting from './premium/marriage/MarriageMeeting';

interface MarriageResultProps {
  result: SajuResult;
  name: string;
  gender: 'male' | 'female';
  birthDate: { year: number; month: number; day: number };
  onReset: () => void;
  onBack: () => void;
}

export default function MarriageResult({
  result,
  name,
  gender: _gender,
  birthDate,
  onReset,
  onBack,
}: MarriageResultProps) {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const dayElement = result.day.stem.element;

  // 결혼운 총점 계산
  const calculateMarriageScore = () => {
    let score = 60;
    const { 재성, 관성, 식상, 인성 } = result.tenGodsCount;

    // 배우자궁 확인
    if (관성 >= 1) score += 15;
    if (재성 >= 1) score += 15;
    if (식상 >= 1) score += 5;
    if (인성 >= 1) score += 5;

    // 오행 균형
    const elements = Object.values(result.elements);
    const max = Math.max(...elements);
    const min = Math.min(...elements);
    if (max - min < 30) score += 10;

    return Math.min(Math.max(score, 40), 100);
  };

  const marriageScore = calculateMarriageScore();

  // 등급 판정
  const getMarriageGrade = () => {
    if (marriageScore >= 80) return '최상';
    if (marriageScore >= 65) return '상';
    if (marriageScore >= 50) return '중';
    return '노력 필요';
  };

  // 키워드 생성
  const getKeywords = () => {
    const keywords = [];
    const { 재성, 관성, 식상 } = result.tenGodsCount;

    if (marriageScore >= 75) keywords.push('좋은 배우자운');
    if (관성 >= 1 || 재성 >= 1) keywords.push('배우자궁 있음');
    if (식상 >= 1) keywords.push('로맨틱');
    if (dayElement === '목') keywords.push('성장형 결혼');
    if (dayElement === '화') keywords.push('열정적 사랑');
    if (dayElement === '토') keywords.push('안정적 가정');
    if (dayElement === '금') keywords.push('품격있는 관계');
    if (dayElement === '수') keywords.push('깊은 교감');

    return keywords.slice(0, 4);
  };

  const marriageGrade = getMarriageGrade();
  const keywords = getKeywords();

  // HTML 다운로드 (화면 그대로 저장)
  const handleDownloadHtml = () => {
    downloadElementAsHtml('marriage-result', `결혼운_${name}`);
  };

  // 카카오 공유
  const handleKakaoShare = () => {
    shareToKakao({
      title: `💕 ${name}님의 결혼/배우자운`,
      description: `결혼운 ${marriageScore}점 | ${marriageGrade} | ${keywords.slice(0, 2).join(', ')}`,
    });
  };

  const birthDateObj = new Date(birthDate.year, birthDate.month - 1, birthDate.day);

  return (
    <div id="marriage-result" className="w-full max-w-6xl mx-auto space-y-12 py-12 px-4">
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

      {/* Hero Section - 타이틀 */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-pink-400 to-rose-600 flex items-center justify-center shadow-2xl mb-6">
          <span className="text-5xl">💕</span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: "'Noto Serif KR', serif" }}>
          {name}님의 결혼/배우자운
        </h1>
        <p className="text-rose-400 text-lg mb-2">
          일간: {result.day.stem.ko}({dayElement}) | 결혼운 {marriageScore}점
        </p>
        <div className="flex justify-center gap-2 flex-wrap">
          {keywords.map((keyword, idx) => (
            <span key={idx} className="px-4 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm">
              {keyword}
            </span>
          ))}
        </div>
      </motion.div>

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

      {/* 1. 결혼운 종합 개요 */}
      <MarriageOverview result={result} name={name} birthDate={birthDateObj} />

      {/* 2. 이상적인 배우자상 */}
      <MarriageIdealPartner result={result} name={name} birthDate={birthDateObj} />

      {/* 3. 결혼 적기 분석 */}
      <MarriageTiming result={result} name={name} birthDate={birthDateObj} />

      {/* 4. 배우자 오행 궁합 */}
      <MarriageCompatibility result={result} name={name} birthDate={birthDateObj} />

      {/* 5. 인연이 오는 방향/장소 */}
      <MarriageLocation result={result} name={name} birthDate={birthDateObj} />

      {/* 6. 배우자 나이차 운세 */}
      <MarriageAge result={result} name={name} birthDate={birthDateObj} />

      {/* 7. 배우자 직업운 */}
      <MarriageOccupation result={result} name={name} birthDate={birthDateObj} />

      {/* 8. 배우자 재물운 */}
      <MarriageWealth result={result} name={name} birthDate={birthDateObj} />

      {/* 9. 시댁/처가 관계운 */}
      <MarriageFamily result={result} name={name} birthDate={birthDateObj} />

      {/* 10. 자녀 계획 운세 */}
      <MarriageChildren result={result} name={name} birthDate={birthDateObj} />

      {/* 11. 부부 갈등 패턴 & 해결법 */}
      <MarriageConflict result={result} name={name} birthDate={birthDateObj} />

      {/* 12. 연애에서 결혼까지 */}
      <MarriageRomance result={result} name={name} birthDate={birthDateObj} />

      {/* 13. 백년해로 운세 */}
      <MarriageLongevity result={result} name={name} birthDate={birthDateObj} />

      {/* 14. 만남의 시기 분석 */}
      <MarriageMeeting result={result} name={name} birthDate={birthDateObj} />

      {/* 하단 액션 버튼 */}
      <div className="flex justify-center gap-3 flex-wrap pt-8">
        <motion.button
          onClick={handleDownloadHtml}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-xl font-semibold transition text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download className="w-4 h-4" />
          결과 저장
        </motion.button>
        <motion.button
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-xl font-semibold transition text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw className="w-4 h-4" />
          다시 보기
        </motion.button>
      </div>

      {/* Email Modal */}
      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        htmlContent={`${name}님의 결혼/배우자운 결과입니다.\n\n결혼운 점수: ${marriageScore}점 (${marriageGrade})\n일간: ${result.day.stem.ko}(${dayElement})\n\n핵심 키워드: ${keywords.join(', ')}`}
        fortuneType="marriage"
        title={`${name}님의 결혼/배우자운`}
      />
    </div>
  );
}
