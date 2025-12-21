'use client';

import { SajuResult } from '@/lib/saju-calculator';
import { motion } from 'framer-motion';
import { RotateCcw, Download, Mail, Share2, ArrowLeft } from 'lucide-react';
import { downloadAsHtml } from '@/lib/utils/export-utils';
import { shareToKakao } from '@/lib/utils/kakao-share';
import EmailModal from './ui/EmailModal';
import { useState } from 'react';

// Premium sub-components
import EmotionHero from './premium/emotion/EmotionHero';
import EmotionPattern from './premium/emotion/EmotionPattern';
import EmotionAnger from './premium/emotion/EmotionAnger';
import EmotionSadness from './premium/emotion/EmotionSadness';
import EmotionAnxiety from './premium/emotion/EmotionAnxiety';
import EmotionStress from './premium/emotion/EmotionStress';
import EmotionPositive from './premium/emotion/EmotionPositive';
import EmotionMonthly from './premium/emotion/EmotionMonthly';
import EmotionHealing from './premium/emotion/EmotionHealing';

interface EmotionResultProps {
  result: SajuResult;
  name: string;
  gender: 'male' | 'female';
  birthDate: { year: number; month: number; day: number };
  onReset: () => void;
  onBack: () => void;
}

export default function EmotionResult({
  result,
  name,
  gender: _gender,
  birthDate: _birthDate,
  onReset,
  onBack,
}: EmotionResultProps) {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const _dayElement = result.day.stem.element;

  // 감정 안정도 점수 계산
  const calculateEmotionScore = () => {
    let score = 50;
    const { 목, 화, 토, 금, 수 } = result.elements;
    const total = 목 + 화 + 토 + 금 + 수;

    // 오행 균형도 계산 (균형이 좋을수록 감정이 안정적)
    const elementArray = [목, 화, 토, 금, 수];
    const average = total / 5;
    const variance = elementArray.reduce((sum, count) => {
      return sum + Math.pow(count - average, 2);
    }, 0) / 5;
    const standardDeviation = Math.sqrt(variance);

    // 표준편차가 낮을수록 균형적 (감정 안정)
    if (standardDeviation < 0.8) score += 25;
    else if (standardDeviation < 1.2) score += 15;
    else if (standardDeviation < 1.6) score += 5;
    else score -= 10;

    // 수(水) - 감정의 유연성
    if (수 >= 2) score += 10;
    else if (수 === 0) score -= 15;

    // 토(土) - 감정의 안정성
    if (토 >= 2) score += 15;
    else if (토 === 0) score -= 10;

    // 화(火) - 열정과 감정 표현
    if (화 >= 3) score -= 10; // 과도한 화는 충동적
    else if (화 >= 1) score += 5;

    // 목(木) - 성장과 희망
    if (목 >= 2) score += 8;

    // 금(金) - 감정 통제
    if (금 >= 2) score += 8;

    // 음양 균형
    const { yang, yin } = result.yinYangBalance;
    const yinYangRatio = Math.min(yang, yin) / Math.max(yang, yin, 1);
    if (yinYangRatio > 0.7) score += 10;
    else if (yinYangRatio < 0.4) score -= 10;

    return Math.min(Math.max(score, 20), 100);
  };

  const emotionScore = calculateEmotionScore();

  // 감정 유형 판정
  const getEmotionType = () => {
    const { 목, 화, 토, 금, 수 } = result.elements;
    const dominant = Math.max(목, 화, 토, 금, 수);

    if (목 === dominant) return '성장형';
    if (화 === dominant) return '열정형';
    if (토 === dominant) return '안정형';
    if (금 === dominant) return '절제형';
    if (수 === dominant) return '유연형';
    return '조화형';
  };

  // 키워드 생성
  const getKeywords = () => {
    const keywords = [];
    const { 목, 화, 토, 금, 수 } = result.elements;

    if (emotionScore >= 75) keywords.push('감정 안정');
    if (토 >= 2) keywords.push('마음의 중심');
    if (수 >= 2) keywords.push('감정 유연성');
    if (목 >= 2) keywords.push('긍정 성장');
    if (금 >= 2) keywords.push('자기 통제');
    if (화 >= 2) keywords.push('열정 표현');

    if (keywords.length < 3) {
      keywords.push('감정 탐색', '마음 케어');
    }

    return keywords.slice(0, 4);
  };

  const emotionType = getEmotionType();
  const keywords = getKeywords();

  // HTML 다운로드
  const handleDownloadHtml = () => {
    const htmlContent = `
      <div class="header">
        <h1>🧘 감정 관리</h1>
        <p>사주로 보는 감정 패턴 분석 • ${name}님</p>
        <p style="font-size: 0.9rem; color: #94a3b8; margin-top: 8px;">감정 유형: ${emotionType} | 안정도: ${emotionScore}점</p>
      </div>

      <div class="section">
        <h2 class="section-title">📊 감정 안정도</h2>
        <div class="score ${emotionScore >= 70 ? 'high' : emotionScore >= 50 ? 'medium' : 'low'}">${emotionScore}점</div>
        <p style="text-align: center; margin-top: 16px; color: #fbbf24; font-weight: bold;">
          ${emotionScore >= 80 ? '매우 안정적인 감정 상태입니다!' :
            emotionScore >= 60 ? '대체로 균형잡힌 감정을 가지고 있습니다.' :
            emotionScore >= 40 ? '감정 관리 연습이 필요합니다.' :
            '전문가의 도움을 받는 것을 권장합니다.'}
        </p>
      </div>

      <div class="section">
        <h2 class="section-title">🎯 감정 유형</h2>
        <div class="card">
          <div class="card-value">${emotionType}</div>
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">💫 핵심 키워드</h2>
        <div class="grid">
          ${keywords.map(k => `<div class="card"><div class="card-value">${k}</div></div>`).join('')}
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">🌿 감정 관리 팁</h2>
        <ul style="margin-left: 20px;">
          <li>매일 5분 명상으로 마음 안정 찾기</li>
          <li>감정 일기 작성으로 패턴 파악</li>
          <li>규칙적인 운동으로 스트레스 해소</li>
          <li>긍정적인 관계 유지하기</li>
        </ul>
      </div>
    `;
    downloadAsHtml(htmlContent, `감정관리_${name}`);
  };

  // 카카오 공유
  const handleKakaoShare = () => {
    shareToKakao({
      title: `🧘 ${name}님의 감정 관리`,
      description: `감정 안정도 ${emotionScore}점 | ${emotionType} | ${keywords.slice(0, 2).join(', ')}`,
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
      <EmotionHero
        result={result}
        name={name}
        emotionScore={emotionScore}
        emotionType={emotionType}
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

      {/* 감정 패턴 분석 */}
      <EmotionPattern result={result} name={name} emotionScore={emotionScore} />

      {/* 분노 관리 */}
      <EmotionAnger result={result} name={name} />

      {/* 우울감 관리 */}
      <EmotionSadness result={result} name={name} />

      {/* 불안/걱정 관리 */}
      <EmotionAnxiety result={result} name={name} />

      {/* 스트레스 대응 */}
      <EmotionStress result={result} name={name} />

      {/* 긍정 에너지 */}
      <EmotionPositive result={result} name={name} />

      {/* 월별 감정 예보 */}
      <EmotionMonthly result={result} name={name} />

      {/* 힐링 가이드 */}
      <EmotionHealing result={result} name={name} emotionType={emotionType} />

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
        htmlContent={`${name}님의 감정 관리 분석 결과입니다.\n\n감정 안정도: ${emotionScore}점\n감정 유형: ${emotionType}\n\n핵심 키워드: ${keywords.join(', ')}`}
        fortuneType="emotion"
        title={`${name}님의 감정 관리 분석`}
      />
    </div>
  );
}
