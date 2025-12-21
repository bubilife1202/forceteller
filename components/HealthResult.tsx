'use client';

import { SajuResult } from '@/lib/saju-calculator';
import { motion } from 'framer-motion';
import { RotateCcw, Download, Mail, Share2, ArrowLeft } from 'lucide-react';
import { downloadElementAsHtml } from '@/lib/utils/export-utils';
import { shareToKakao } from '@/lib/utils/kakao-share';
import EmailModal from './ui/EmailModal';
import { useState } from 'react';

// Premium sub-components
import HealthHero from './premium/health/HealthHero';
import HealthConstitution from './premium/health/HealthConstitution';
import HealthOrgans from './premium/health/HealthOrgans';
import HealthWeakness from './premium/health/HealthWeakness';
import HealthFood from './premium/health/HealthFood';
import HealthExercise from './premium/health/HealthExercise';
import HealthSeason from './premium/health/HealthSeason';
import HealthMonthly from './premium/health/HealthMonthly';
import HealthSleep from './premium/health/HealthSleep';
import HealthStress from './premium/health/HealthStress';
import HealthWeight from './premium/health/HealthWeight';
import HealthLongevity from './premium/health/HealthLongevity';
import HealthLucky from './premium/health/HealthLucky';
import HealthAdvice from './premium/health/HealthAdvice';

interface HealthResultProps {
  result: SajuResult;
  name: string;
  gender: 'male' | 'female';
  birthDate: { year: number; month: number; day: number };
  onReset: () => void;
  onBack: () => void;
}

export default function HealthResult({
  result,
  name,
  gender: _gender,
  birthDate: _birthDate,
  onReset,
  onBack,
}: HealthResultProps) {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const dayElement = result.day.stem.element;

  // 건강운 총점 계산
  const calculateHealthScore = () => {
    let score = 60;

    // 음양 균형
    const yinYang = result.yinYangBalance;
    const yinYangRatio = yinYang.yang; // yang 비율 (0-100)
    if (yinYangRatio >= 40 && yinYangRatio <= 60) score += 15;
    else if (yinYangRatio >= 30 && yinYangRatio <= 70) score += 5;

    // 오행 균형
    const elements = Object.values(result.elements);
    const max = Math.max(...elements);
    const min = Math.min(...elements);
    if (max - min < 30) score += 15;
    else if (max - min < 50) score += 5;

    // 십신 균형
    const { 재성, 관성, 인성, 식상, 비겁 } = result.tenGodsCount;
    const hasBalance = [재성, 관성, 인성, 식상, 비겁].filter(v => v > 0).length >= 3;
    if (hasBalance) score += 10;

    // 인성 가점 (건강운에 좋음)
    if (인성 >= 2) score += 5;

    return Math.min(Math.max(score, 40), 100);
  };

  const healthScore = calculateHealthScore();

  // 등급 판정
  const getHealthGrade = () => {
    if (healthScore >= 80) return '최상';
    if (healthScore >= 65) return '양호';
    if (healthScore >= 50) return '보통';
    return '주의';
  };

  // 키워드 생성
  const getKeywords = () => {
    const keywords = [];
    const { 인성 } = result.tenGodsCount;

    if (healthScore >= 70) keywords.push('건강 체질');
    if (dayElement === '목') keywords.push('간 건강 중요');
    if (dayElement === '화') keywords.push('심장 관리');
    if (dayElement === '토') keywords.push('소화 기능');
    if (dayElement === '금') keywords.push('호흡기 관리');
    if (dayElement === '수') keywords.push('신장 건강');
    if (인성 >= 2) keywords.push('장수 가능');

    if (keywords.length < 3) {
      keywords.push('규칙적인 생활', '예방 관리');
    }

    return keywords.slice(0, 4);
  };

  const healthGrade = getHealthGrade();
  const keywords = getKeywords();

  // HTML 다운로드 (화면 그대로 저장)
  const handleDownloadHtml = () => {
    downloadElementAsHtml('health-result', `건강운_${name}`);
  };

  // 카카오 공유
  const handleKakaoShare = () => {
    shareToKakao({
      title: `💚 ${name}님의 건강운`,
      description: `건강 점수 ${healthScore}점 | ${healthGrade} | ${keywords.slice(0, 2).join(', ')}`,
    });
  };

  return (
    <div id="health-result" className="w-full max-w-6xl mx-auto space-y-12 py-12 px-4">
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
      <HealthHero
        result={result}
        name={name}
        healthScore={healthScore}
        healthGrade={healthGrade}
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

      {/* 오행 체질 분석 */}
      <HealthConstitution result={result} name={name} />

      {/* 장기별 건강 */}
      <HealthOrgans result={result} name={name} />

      {/* 취약 부위 & 주의 질병 */}
      <HealthWeakness result={result} name={name} />

      {/* 체질별 음식 */}
      <HealthFood result={result} name={name} />

      {/* 맞춤 운동 */}
      <HealthExercise result={result} name={name} />

      {/* 계절별 건강 관리 */}
      <HealthSeason result={result} name={name} />

      {/* 월별 건강 캘린더 */}
      <HealthMonthly result={result} name={name} />

      {/* 수면 & 휴식 */}
      <HealthSleep result={result} name={name} />

      {/* 스트레스 & 멘탈 */}
      <HealthStress result={result} name={name} />

      {/* 체중 관리 */}
      <HealthWeight result={result} name={name} />

      {/* 장수 비결 */}
      <HealthLongevity result={result} name={name} />

      {/* 건강 행운 아이템 */}
      <HealthLucky result={result} name={name} />

      {/* 종합 건강 조언 */}
      <HealthAdvice result={result} name={name} healthScore={healthScore} />

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
        htmlContent={`${name}님의 건강운 결과입니다.\n\n건강 점수: ${healthScore}점 (${healthGrade})\n일간: ${result.day.stem.ko}(${dayElement})\n\n핵심 키워드: ${keywords.join(', ')}`}
        fortuneType="health"
        title={`${name}님의 건강운`}
      />
    </div>
  );
}
