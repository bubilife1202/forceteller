'use client';

import { SajuResult } from '@/lib/saju-calculator';
import { motion } from 'framer-motion';
import { RotateCcw, Download, Mail, Share2, ArrowLeft } from 'lucide-react';
import { downloadElementAsHtml } from '@/lib/utils/export-utils';
import { shareToKakao } from '@/lib/utils/kakao-share';
import EmailModal from './ui/EmailModal';
import { useState } from 'react';

// Premium sub-components
import CharmHero from './premium/charm/CharmHero';
import CharmCoreTraits from './premium/charm/CharmCoreTraits';
import CharmExternal from './premium/charm/CharmExternal';
import CharmInternal from './premium/charm/CharmInternal';
import CharmSocial from './premium/charm/CharmSocial';
import CharmRomantic from './premium/charm/CharmRomantic';
import CharmCareer from './premium/charm/CharmCareer';
import CharmRadarChart from './premium/charm/CharmRadarChart';
import CharmUpgrade from './premium/charm/CharmUpgrade';
import CharmByAge from './premium/charm/CharmByAge';
import CharmCompatibility from './premium/charm/CharmCompatibility';
import CharmFirstImpression from './premium/charm/CharmFirstImpression';
import CharmHidden from './premium/charm/CharmHidden';
import CharmWeakness from './premium/charm/CharmWeakness';

interface CharmResultProps {
  result: SajuResult;
  name: string;
  gender: 'male' | 'female';
  birthDate: { year: number; month: number; day: number };
  onReset: () => void;
  onBack: () => void;
}

export default function CharmResult({
  result,
  name,
  gender,
  birthDate,
  onReset,
  onBack,
}: CharmResultProps) {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const dayElement = result.day.stem.element;

  // 매력 점수 계산 (0-100)
  const calculateCharmScore = () => {
    let score = 55; // 기본 점수
    const { 식상, 재성, 관성, 인성, 비겁 } = result.tenGodsCount;

    // 십성별 가점
    if (식상 >= 2) score += 10; // 표현력
    if (인성 >= 2) score += 8;  // 지혜
    if (재성 >= 1) score += 5;  // 실용성
    if (관성 >= 1) score += 5;  // 리더십
    if (비겁 >= 1) score += 5;  // 자신감

    // 오행별 조정
    if (dayElement === '화') score += 12; // 열정과 표현력
    if (dayElement === '목') score += 10; // 친화력
    if (dayElement === '수') score += 8;  // 지적 매력
    if (dayElement === '토') score += 8;  // 안정감
    if (dayElement === '금') score += 7;  // 세련미

    // 범위 제한 (45-95)
    return Math.min(Math.max(score, 45), 95);
  };

  // 매력 타입 판정 (8가지)
  const getCharmType = () => {
    const { 식상, 재성, 관성, 인성, 비겁 } = result.tenGodsCount;

    // 십성 조합으로 타입 결정
    if (관성 >= 2 || (dayElement === '금' && 관성 >= 1)) return '카리스마형';
    if (인성 >= 2 || dayElement === '수') return '지적매력형';
    if (식상 >= 2 || dayElement === '화') return '감성매력형';
    if (dayElement === '목' || 인성 >= 1) return '친화력형';
    if (식상 >= 1 && 비겁 >= 1) return '독창성형';
    if (재성 >= 2 || dayElement === '토') return '안정감형';
    if (비겁 >= 2) return '열정매력형';
    if (재성 >= 1) return '세련미형';

    return '친화력형'; // 기본값
  };

  // 한 줄 정의
  const getCharmOneLiner = () => {
    const oneLiners: { [key: string]: string } = {
      '카리스마형': '당당하게 빛나며 사람들을 이끄는 타고난 리더',
      '지적매력형': '깊이 있는 사고로 감동을 주는 지혜로운 사람',
      '감성매력형': '진심 어린 표현으로 마음을 움직이는 아티스트',
      '친화력형': '따뜻한 미소로 세상을 밝게 만드는 햇살 같은 존재',
      '독창성형': '남들과 다른 시각으로 새로운 가치를 만드는 크리에이터',
      '안정감형': '언제나 믿을 수 있는 든든한 버팀목',
      '열정매력형': '뜨거운 열정으로 불가능을 가능하게 만드는 도전자',
      '세련미형': '우아한 품격으로 어디서나 돋보이는 엘레강스',
    };
    return oneLiners[getCharmType()] || '특별한 매력을 가진 유일무이한 존재';
  };

  const charmScore = calculateCharmScore();
  const charmType = getCharmType();
  const charmOneLiner = getCharmOneLiner();

  // HTML 다운로드 (화면 그대로 저장)
  const handleDownloadHtml = () => {
    downloadElementAsHtml('charm-result', `내안의매력찾기_${name}`);
  };

  // 카카오 공유
  const handleKakaoShare = () => {
    shareToKakao({
      title: `💖 ${name}님의 매력 분석`,
      description: `매력 지수 ${charmScore}점 | ${charmType} | ${charmOneLiner}`,
    });
  };

  return (
    <div id="charm-result" className="w-full max-w-6xl mx-auto space-y-12 py-12 px-4">
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
      <CharmHero
        result={result}
        name={name}
        gender={gender}
        charmScore={charmScore}
        charmType={charmType}
        charmOneLiner={charmOneLiner}
      />

      {/* 5가지 핵심 매력 */}
      <CharmCoreTraits result={result} name={name} />

      {/* 외적 매력 */}
      <CharmExternal result={result} name={name} gender={gender} />

      {/* 내적 매력 */}
      <CharmInternal result={result} name={name} />

      {/* 사교적 매력 */}
      <CharmSocial result={result} name={name} gender={gender} />

      {/* 연애 매력 */}
      <CharmRomantic result={result} name={name} gender={gender} />

      {/* 직장 매력 */}
      <CharmCareer result={result} name={name} gender={gender} />

      {/* 매력 지수 레이더 차트 */}
      <CharmRadarChart result={result} name={name} />

      {/* 매력 업그레이드 가이드 */}
      <CharmUpgrade result={result} name={name} gender={gender} />

      {/* 나이대별 매력 변화 */}
      <CharmByAge result={result} name={name} gender={gender} />

      {/* 매력 궁합 */}
      <CharmCompatibility result={result} name={name} gender={gender} />

      {/* 첫인상 분석 */}
      <CharmFirstImpression result={result} name={name} gender={gender} />

      {/* 숨겨진 매력 */}
      <CharmHidden result={result} name={name} gender={gender} />

      {/* 매력 약점 */}
      <CharmWeakness result={result} name={name} gender={gender} />

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
        htmlContent={`<div style="font-family: sans-serif; padding: 20px;"><h1>✨ ${name}님의 매력 분석 결과</h1><p>매력 지수: ${charmScore}점</p><p>매력 타입: ${charmType}</p><p>일간: ${result.day.stem.ko}(${dayElement})</p><p style="font-style: italic;">"${charmOneLiner}"</p></div>`}
        fortuneType="charm"
        title={`[팔자왕] ${name}님의 매력 분석 결과`}
      />
    </div>
  );
}
