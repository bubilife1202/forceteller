'use client';

import { SajuResult } from '@/lib/saju-calculator';
import { motion } from 'framer-motion';
import { RotateCcw, Download, Mail, Share2, ArrowLeft } from 'lucide-react';
import { downloadAsHtml } from '@/lib/utils/export-utils';
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

  // HTML 다운로드
  const handleDownloadHtml = () => {
    const htmlContent = `
      <div class="header">
        <h1>💖 ${name}님의 매력 분석</h1>
        <p>내 안의 매력 찾기 • ${birthDate.year}.${birthDate.month}.${birthDate.day}</p>
        <p style="font-size: 0.9rem; color: #94a3b8; margin-top: 8px;">일간: ${dayElement}(${result.day.stem.ko}) | 매력 지수: ${charmScore}점</p>
      </div>

      <div class="section">
        <h2 class="section-title">✨ 매력 총점</h2>
        <div class="score ${charmScore >= 80 ? 'high' : charmScore >= 60 ? 'medium' : 'low'}">${charmScore}점</div>
        <p style="text-align: center; margin-top: 16px; color: #ec4899; font-weight: bold; font-size: 1.1rem;">
          ${charmType}
        </p>
        <p style="text-align: center; margin-top: 8px; color: #cbd5e1; font-style: italic;">
          "${charmOneLiner}"
        </p>
      </div>

      <div class="section">
        <h2 class="section-title">💎 매력 타입</h2>
        <p>${charmType}은 ${
          charmType === '카리스마형' ? '당당한 리더십과 강한 존재감으로 사람들을 이끄는 매력을 가지고 있습니다.' :
          charmType === '지적매력형' ? '깊이 있는 사고와 통찰력으로 사람들에게 감동을 주는 매력을 가지고 있습니다.' :
          charmType === '감성매력형' ? '풍부한 감성과 진솔한 표현으로 마음을 움직이는 매력을 가지고 있습니다.' :
          charmType === '친화력형' ? '따뜻하고 친근한 분위기로 사람들을 편안하게 만드는 매력을 가지고 있습니다.' :
          charmType === '독창성형' ? '남들과 다른 독특한 시각으로 새로운 가치를 만드는 매력을 가지고 있습니다.' :
          charmType === '안정감형' ? '든든하고 신뢰할 수 있는 모습으로 안정감을 주는 매력을 가지고 있습니다.' :
          charmType === '열정매력형' ? '뜨거운 열정과 에너지로 주변을 활기차게 만드는 매력을 가지고 있습니다.' :
          '세련되고 우아한 품격으로 어디서나 돋보이는 매력을 가지고 있습니다.'
        }</p>
      </div>

      <div class="section">
        <h2 class="section-title">🌟 핵심 매력 포인트</h2>
        <div class="grid">
          <div class="card">
            <div class="card-title">외적 매력</div>
            <div class="card-value">${
              dayElement === '목' ? '생기발랄함' : dayElement === '화' ? '화려한 존재감' :
              dayElement === '토' ? '안정적 분위기' : dayElement === '금' ? '세련된 품격' : '신비로운 아우라'
            }</div>
          </div>
          <div class="card">
            <div class="card-title">내적 매력</div>
            <div class="card-value">${
              dayElement === '목' ? '성장 의지' : dayElement === '화' ? '진솔한 열정' :
              dayElement === '토' ? '깊은 신뢰감' : dayElement === '금' ? '명확한 원칙' : '깊은 통찰력'
            }</div>
          </div>
          <div class="card">
            <div class="card-title">사교 매력</div>
            <div class="card-value">${
              dayElement === '목' ? '따뜻한 공감' : dayElement === '화' ? '열정적 표현' :
              dayElement === '토' ? '안정적 중재' : dayElement === '금' ? '명확한 논리' : '깊이 있는 대화'
            }</div>
          </div>
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">💝 매력 발휘 방법</h2>
        <ul style="margin-left: 20px;">
          <li>자신의 강점을 인식하고 자연스럽게 표현하세요</li>
          <li>있는 그대로의 모습에 자신감을 가지세요</li>
          <li>다른 사람의 장점도 발견하고 인정해주세요</li>
          <li>지속적인 자기 개발로 내면을 가꾸세요</li>
          <li>진심을 담아 소통하고 관계를 맺으세요</li>
        </ul>
      </div>

      <div class="section">
        <h2 class="section-title">✨ 한 마디</h2>
        <p style="text-align: center; font-size: 1.1rem; line-height: 1.8; color: #f1f5f9;">
          ${name}님은 이미 충분히 매력적인 사람입니다.<br>
          자신을 사랑하고 있는 그대로를 인정할 때,<br>
          당신의 진정한 매력이 가장 빛을 발합니다. 💖
        </p>
      </div>
    `;
    downloadAsHtml(htmlContent, `내안의매력찾기_${name}`);
  };

  // 카카오 공유
  const handleKakaoShare = () => {
    shareToKakao({
      title: `💖 ${name}님의 매력 분석`,
      description: `매력 지수 ${charmScore}점 | ${charmType} | ${charmOneLiner}`,
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-12 py-12 px-4">
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
        htmlContent={`<div style="font-family: sans-serif; padding: 20px;"><h1>✨ ${name}님의 매력 분석 결과</h1><p>매력 지수: ${charmScore}점</p><p>매력 타입: ${charmType}</p><p>일간: ${result.day.stem.ko}(${dayElement})</p><p style="font-style: italic;">"${charmOneLiner}"</p></div>`}
        fortuneType="charm"
        title={`[팔자왕] ${name}님의 매력 분석 결과`}
      />
    </div>
  );
}
