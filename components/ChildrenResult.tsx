'use client';

import { SajuResult } from '@/lib/saju-calculator';
import { motion } from 'framer-motion';
import { RotateCcw, Download, Mail, Share2, ArrowLeft } from 'lucide-react';
import { downloadElementAsHtml } from '@/lib/utils/export-utils';
import { shareToKakao } from '@/lib/utils/kakao-share';
import EmailModal from './ui/EmailModal';
import { useState } from 'react';

// Premium sub-components
import ChildrenOverview from './premium/children/ChildrenOverview';
import ChildrenCount from './premium/children/ChildrenCount';
import ChildrenTiming from './premium/children/ChildrenTiming';
import ChildrenGender from './premium/children/ChildrenGender';
import ChildrenHealth from './premium/children/ChildrenHealth';
import ChildrenPersonality from './premium/children/ChildrenPersonality';
import ChildrenTalent from './premium/children/ChildrenTalent';
import ChildrenEducation from './premium/children/ChildrenEducation';
import ChildrenRelationship from './premium/children/ChildrenRelationship';
import ChildrenConflict from './premium/children/ChildrenConflict';
import ChildrenSupport from './premium/children/ChildrenSupport';
import ChildrenFuture from './premium/children/ChildrenFuture';
import ChildrenSibling from './premium/children/ChildrenSibling';
import ChildrenLuck from './premium/children/ChildrenLuck';

interface ChildrenResultProps {
  result: SajuResult;
  name: string;
  gender: 'male' | 'female';
  birthDate: { year: number; month: number; day: number };
  onReset: () => void;
  onBack: () => void;
}

export default function ChildrenResult({
  result,
  name,
  gender: _gender,
  birthDate,
  onReset,
  onBack,
}: ChildrenResultProps) {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const dayElement = result.day.stem.element;
  const { 식상, 인성, 재성 } = result.tenGodsCount;

  // 자녀운 총점 계산
  const calculateChildrenScore = () => {
    let score = 60;

    // 식상 (자녀궁)
    if (식상 >= 3) score += 25;
    else if (식상 >= 2) score += 15;
    else if (식상 >= 1) score += 8;

    // 일간별 자녀운
    if (dayElement === '수') score += 18;
    if (dayElement === '목') score += 15;
    if (dayElement === '토') score += 12;
    if (dayElement === '화') score += 10;
    if (dayElement === '금') score += 8;

    // 인성 가점
    if (인성 >= 2) score += 8;

    return Math.min(Math.max(score, 40), 100);
  };

  const childrenScore = calculateChildrenScore();

  // 등급 판정
  const getChildrenGrade = () => {
    if (childrenScore >= 85) return '최고';
    if (childrenScore >= 70) return '좋음';
    if (childrenScore >= 60) return '보통';
    return '노력';
  };

  // 키워드 생성
  const getKeywords = () => {
    const keywords = [];

    if (식상 >= 3) keywords.push('다자녀 복');
    else if (식상 >= 2) keywords.push('자녀 복');

    if (dayElement === '수' || dayElement === '목') keywords.push('재능 계발');
    if (인성 >= 2) keywords.push('교육열');
    if (재성 >= 2) keywords.push('경제 지원');
    if (식상 >= 2) keywords.push('창의성');

    if (keywords.length < 3) {
      keywords.push('사랑', '성장');
    }

    return keywords.slice(0, 4);
  };

  const childrenGrade = getChildrenGrade();
  const keywords = getKeywords();
  const birth = new Date(birthDate.year, birthDate.month - 1, birthDate.day);

  // HTML 다운로드 (화면 그대로 저장)
  const handleDownloadHtml = () => {
    downloadElementAsHtml('children-result', `자녀운_${name}`);
  };

  // 카카오 공유
  const handleKakaoShare = () => {
    shareToKakao({
      title: `👶 ${name}님의 자녀운`,
      description: `자녀운 ${childrenScore}점 | ${childrenGrade} | ${keywords.slice(0, 2).join(', ')}`,
    });
  };

  return (
    <div id="children-result" className="w-full max-w-6xl mx-auto space-y-12 py-12 px-4">
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
      <motion.div
        className="glass-strong rounded-3xl p-8 md:p-12 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-6">
          <span className="text-6xl mb-4 block">👶</span>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 gradient-text"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            자녀운 종합 분석
          </h1>
          <p className="text-xl text-slate-300 mb-2">{name}님의 자녀운</p>
          <p className="text-slate-400 text-sm">
            일간: {result.day.stem.ko}({dayElement}) | 식상: {식상}개
          </p>
        </div>

        <div className="glass rounded-2xl p-6 mb-6 inline-block">
          <p className="text-slate-400 text-sm mb-2">자녀운 총점</p>
          <div className="flex items-baseline gap-2 justify-center">
            <span className="text-5xl font-bold gradient-text">{childrenScore}</span>
            <span className="text-2xl text-slate-400">점</span>
          </div>
          <p className="text-xl font-bold text-cyan-400 mt-2">{childrenGrade}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {keywords.map((keyword, index) => (
            <motion.span
              key={index}
              className="glass px-4 py-2 rounded-full text-sm font-bold text-purple-400"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              {keyword}
            </motion.span>
          ))}
        </div>
      </motion.div>


      {/* 1. 자녀운 종합 개요 */}
      <ChildrenOverview result={result} name={name} birthDate={birth} />

      {/* 2. 자녀 수 예측 */}
      <ChildrenCount result={result} name={name} birthDate={birth} />

      {/* 3. 출산 적기 분석 */}
      <ChildrenTiming result={result} name={name} birthDate={birth} />

      {/* 4. 성별 운세 */}
      <ChildrenGender result={result} name={name} birthDate={birth} />

      {/* 5. 자녀 건강운 */}
      <ChildrenHealth result={result} name={name} birthDate={birth} />

      {/* 6. 자녀 성격 예측 */}
      <ChildrenPersonality result={result} name={name} birthDate={birth} />

      {/* 7. 자녀 재능 분석 */}
      <ChildrenTalent result={result} name={name} birthDate={birth} />

      {/* 8. 자녀 교육 방향 */}
      <ChildrenEducation result={result} name={name} birthDate={birth} />

      {/* 9. 부모-자녀 관계 */}
      <ChildrenRelationship result={result} name={name} birthDate={birth} />

      {/* 10. 자녀와의 갈등 패턴 */}
      <ChildrenConflict result={result} name={name} birthDate={birth} />

      {/* 11. 자녀 지원 방향 */}
      <ChildrenSupport result={result} name={name} birthDate={birth} />

      {/* 12. 자녀의 미래 전망 */}
      <ChildrenFuture result={result} name={name} birthDate={birth} />

      {/* 13. 형제자매 관계 */}
      <ChildrenSibling result={result} name={name} birthDate={birth} />

      {/* 14. 자녀로 인한 복 */}
      <ChildrenLuck result={result} name={name} birthDate={birth} />

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
        htmlContent={`${name}님의 자녀운 분석 결과입니다.\n\n자녀운 점수: ${childrenScore}점 (${childrenGrade})\n일간: ${result.day.stem.ko}(${dayElement})\n\n핵심 키워드: ${keywords.join(', ')}`}
        fortuneType="children"
        title={`${name}님의 자녀운`}
      />
    </div>
  );
}
