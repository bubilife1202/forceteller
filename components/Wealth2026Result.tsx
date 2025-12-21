'use client';

import { SajuResult } from '@/lib/saju-calculator';
import { motion } from 'framer-motion';
import { RotateCcw, Download, Mail, Share2, ArrowLeft } from 'lucide-react';
import { downloadAsHtml } from '@/lib/utils/export-utils';
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

  // HTML 다운로드
  const handleDownloadHtml = () => {
    const htmlContent = `
      <div class="header">
        <h1>💰 2026 대박 재물운</h1>
        <p>丙午年 • 붉은 말의 해 • ${name}님</p>
        <p style="font-size: 0.9rem; color: #94a3b8; margin-top: 8px;">일간: ${dayElement}(${result.day.stem.ko}) | 재물운 점수: ${wealthScore}점</p>
      </div>

      <div class="section">
        <h2 class="section-title">📊 재물운 총괄</h2>
        <div class="score ${wealthScore >= 70 ? 'high' : wealthScore >= 50 ? 'medium' : 'low'}">${wealthScore}점 - ${wealthGrade}</div>
        <p style="text-align: center; margin-top: 16px; color: #fbbf24; font-weight: bold;">
          ${wealthGrade === '대박' ? '올해 큰 재물이 들어올 운입니다!' :
            wealthGrade === '상승' ? '꾸준히 재물이 늘어나는 해입니다.' :
            wealthGrade === '안정' ? '현상 유지하며 내실을 다지세요.' :
            '지출 관리에 신경 쓰세요.'}
        </p>
      </div>

      <div class="section">
        <h2 class="section-title">🎯 핵심 키워드</h2>
        <div class="grid">
          ${keywords.map(k => `<div class="card"><div class="card-value">${k}</div></div>`).join('')}
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">💎 사주 재성 분석</h2>
        <p>재성 보유: ${result.tenGodsCount.재성}개</p>
        <p>재성 강약: ${result.tenGodsCount.재성 >= 2 ? '강함' : result.tenGodsCount.재성 >= 1 ? '보통' : '약함'}</p>
        <p style="margin-top: 12px;">
          ${dayElement === '토' ? '화생토(火生土): 재물이 저절로 들어오는 최고의 해! 기회를 놓치지 마세요.' :
            dayElement === '화' ? '비겁운: 같은 화 기운이 만나 재물 경쟁이 치열할 수 있으나, 열정으로 승부하세요.' :
            dayElement === '목' ? '목생화(木生火): 당신의 노력이 재물로 변환되는 해입니다.' :
            dayElement === '금' ? '화극금(火克金): 재물 손실 주의. 보수적 투자와 저축에 집중하세요.' :
            '수극화(水克火): 재물을 통제하는 힘이 있습니다. 현명한 투자 결정이 가능합니다.'}
        </p>
      </div>

      <div class="section">
        <h2 class="section-title">🍀 재물 행운 아이템</h2>
        <div class="grid">
          <div class="card"><div class="card-title">행운의 색</div><div class="card-value">${
            dayElement === '목' ? '파란색' : dayElement === '화' ? '초록색' :
            dayElement === '토' ? '빨간색' : dayElement === '금' ? '노란색' : '흰색'
          }</div></div>
          <div class="card"><div class="card-title">행운의 방향</div><div class="card-value">${
            dayElement === '목' ? '북쪽' : dayElement === '화' ? '동쪽' :
            dayElement === '토' ? '남쪽' : dayElement === '금' ? '중앙' : '서쪽'
          }</div></div>
          <div class="card"><div class="card-title">행운의 숫자</div><div class="card-value">${
            dayElement === '목' ? '3, 8' : dayElement === '화' ? '2, 7' :
            dayElement === '토' ? '5, 10' : dayElement === '금' ? '4, 9' : '1, 6'
          }</div></div>
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">⚠️ 주의사항</h2>
        <ul style="margin-left: 20px;">
          <li>검증되지 않은 투자 제안 경계</li>
          <li>${dayElement === '금' ? '무리한 투자/사업 확장 금지' : '과욕은 금물'}</li>
          <li>보증/대출은 신중하게</li>
          <li>수입과 지출의 균형 유지</li>
        </ul>
      </div>
    `;
    downloadAsHtml(htmlContent, `2026대박재물운_${name}`);
  };

  // 카카오 공유
  const handleKakaoShare = () => {
    shareToKakao({
      title: `💰 ${name}님의 2026 대박 재물운`,
      description: `재물운 ${wealthScore}점 | ${wealthGrade} | ${keywords.slice(0, 2).join(', ')}`,
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
        htmlContent={`${name}님의 2026년 대박 재물운 결과입니다.\n\n재물운 점수: ${wealthScore}점 (${wealthGrade})\n일간: ${result.day.stem.ko}(${dayElement})\n\n핵심 키워드: ${keywords.join(', ')}`}
        fortuneType="wealth2026"
        title={`${name}님의 2026 대박 재물운`}
      />
    </div>
  );
}
