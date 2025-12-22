'use client';

import { motion } from 'framer-motion';
import { Briefcase, ArrowLeft, RotateCcw, Download, Mail, Share2 } from 'lucide-react';
import { calculateSaju, SajuResult } from '@/lib/saju-calculator';
import { downloadElementAsHtml } from '@/lib/utils/export-utils';
import { shareToKakao } from '@/lib/utils/kakao-share';
import { CareerFormData } from './CareerForm';
import { useState } from 'react';
import EmailModal from './ui/EmailModal';

// Career premium sub-components
import CareerOverview from './premium/career/CareerOverview';
import CareerAptitude from './premium/career/CareerAptitude';
import CareerTiming from './premium/career/CareerTiming';
import CareerPromotion from './premium/career/CareerPromotion';
import CareerStartup from './premium/career/CareerStartup';
import CareerSidejob from './premium/career/CareerSidejob';
import CareerPartner from './premium/career/CareerPartner';
import CareerIndustry from './premium/career/CareerIndustry';
import CareerWorkStyle from './premium/career/CareerWorkStyle';
import CareerBoss from './premium/career/CareerBoss';
import CareerGrowth from './premium/career/CareerGrowth';
import CareerIncome from './premium/career/CareerIncome';
import CareerStress from './premium/career/CareerStress';
import CareerForecast from './premium/career/CareerForecast';

interface CareerResultProps {
  formData: CareerFormData;
  onReset: () => void;
  onBack: () => void;
}

export default function CareerResult({ formData, onReset, onBack }: CareerResultProps) {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  // 사주 계산
  const result: SajuResult = calculateSaju({
    year: formData.year,
    month: formData.month,
    day: formData.day,
    hour: formData.timeUnknown ? 12 : formData.hour,
  }, formData.gender);

  const currentYear = new Date().getFullYear();
  const dayStem = result.day.stem.ko;
  const dayElement = result.day.stem.element;

  // 직업운 점수 계산
  const calculateCareerScore = () => {
    let score = 55;
    const { 재성, 관성, 식상, 인성, 비겁 } = result.tenGodsCount;
    const yearTenGod = result.tenGods.year;

    if (관성 >= 1) score += 12;
    if (재성 >= 1) score += 10;
    if (식상 >= 1) score += 8;
    if (인성 >= 2) score += 8;
    if (비겁 >= 3) score -= 8;

    if (['정관', '편재', '정재', '식신'].includes(yearTenGod)) score += 10;

    return Math.min(Math.max(score, 35), 98);
  };

  const careerScore = calculateCareerScore();

  // 키워드 생성
  const getKeywords = () => {
    const keywords = [];
    const { 관성, 재성, 식상, 인성 } = result.tenGodsCount;

    if (careerScore >= 75) keywords.push('유망한 직업운');
    if (관성 >= 1) keywords.push('승진 가능성');
    if (재성 >= 1) keywords.push('수입 증가');
    if (식상 >= 1) keywords.push('창의적 역량');
    if (인성 >= 1) keywords.push('학습 능력');
    if (dayElement === '목') keywords.push('성장형 리더');
    if (dayElement === '화') keywords.push('열정적 추진력');
    if (dayElement === '토') keywords.push('안정적 관리');
    if (dayElement === '금') keywords.push('논리적 분석');
    if (dayElement === '수') keywords.push('전략적 사고');

    return keywords.slice(0, 4);
  };

  const keywords = getKeywords();

  // 등급 판정
  const getCareerGrade = () => {
    if (careerScore >= 85) return '최상';
    if (careerScore >= 70) return '상';
    if (careerScore >= 55) return '중상';
    if (careerScore >= 40) return '중';
    return '노력필요';
  };

  const careerGrade = getCareerGrade();

  // HTML 다운로드
  const handleDownloadHtml = () => {
    const today = new Date().toISOString().split('T')[0];
    downloadElementAsHtml('career-result', `직업운_${formData.name}_${today}`);
  };

  // 카카오 공유
  const handleKakaoShare = () => {
    shareToKakao({
      title: `💼 ${formData.name}님의 직업운 분석`,
      description: `직업운 ${careerScore}점 | ${careerGrade} | ${keywords.slice(0, 2).join(', ')}`,
    });
  };

  const birthDateObj = new Date(formData.year, formData.month - 1, formData.day);

  return (
    <div id="career-result" className="w-full max-w-6xl mx-auto space-y-12 py-12 px-4">
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
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center shadow-2xl mb-6">
          <Briefcase className="w-12 h-12 text-white" />
        </div>
        <h1
          className="text-4xl md:text-5xl font-bold mb-4 gradient-text"
          style={{ fontFamily: "'Noto Serif KR', serif" }}
        >
          💼 직업운 종합 분석
        </h1>
        <p className="text-xl text-slate-300 mb-6">{formData.name}님의 커리어 성공 전략</p>

        <div className="inline-block glass rounded-2xl px-8 py-4 mb-6">
          <div className="flex items-center gap-6 justify-center flex-wrap">
            <div className="text-center">
              <p className="text-slate-400 text-sm">일간</p>
              <p className="text-2xl font-bold text-indigo-400">
                {dayStem} ({dayElement})
              </p>
            </div>
            <div className="text-center">
              <p className="text-slate-400 text-sm">직업운 점수</p>
              <p className="text-4xl font-bold gradient-text">{careerScore}점</p>
            </div>
            <div className="text-center">
              <p className="text-slate-400 text-sm">등급</p>
              <p className="text-2xl font-bold text-purple-400">{careerGrade}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          {keywords.map((keyword, index) => (
            <motion.span
              key={index}
              className="px-4 py-2 glass rounded-full text-slate-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {keyword}
            </motion.span>
          ))}
        </div>
      </motion.div>


      {/* 1. 직업운 종합 개요 */}
      <CareerOverview result={result} name={formData.name} birthDate={birthDateObj} />

      {/* 2. 타고난 직업 적성 */}
      <CareerAptitude result={result} name={formData.name} birthDate={birthDateObj} />

      {/* 3. 전직/이직 최적 시기 */}
      <CareerTiming result={result} name={formData.name} birthDate={birthDateObj} />

      {/* 4. 승진운 분석 */}
      <CareerPromotion result={result} name={formData.name} birthDate={birthDateObj} />

      {/* 5. 창업운 분석 */}
      <CareerStartup result={result} name={formData.name} birthDate={birthDateObj} />

      {/* 6. 부업/투잡 운세 */}
      <CareerSidejob result={result} name={formData.name} birthDate={birthDateObj} />

      {/* 7. 동업자 운세 */}
      <CareerPartner result={result} name={formData.name} birthDate={birthDateObj} />

      {/* 8. 유리한 산업군 */}
      <CareerIndustry result={result} name={formData.name} birthDate={birthDateObj} />

      {/* 9. 업무 스타일 & 팀 역할 */}
      <CareerWorkStyle result={result} name={formData.name} birthDate={birthDateObj} />

      {/* 10. 상사/직장인 관계 */}
      <CareerBoss result={result} name={formData.name} birthDate={birthDateObj} />

      {/* 11. 경력 성장 방향 */}
      <CareerGrowth result={result} name={formData.name} birthDate={birthDateObj} />

      {/* 12. 직장인 수입운 */}
      <CareerIncome result={result} name={formData.name} birthDate={birthDateObj} />

      {/* 13. 직장 스트레스 관리 */}
      <CareerStress result={result} name={formData.name} birthDate={birthDateObj} />

      {/* 14. 2026년 직업운 전망 */}
      <CareerForecast result={result} name={formData.name} birthDate={birthDateObj} />

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
        htmlContent={`${formData.name}님의 직업운 분석 결과입니다.\n\n직업운 점수: ${careerScore}점 (${careerGrade})\n일간: ${dayStem}(${dayElement})\n\n핵심 키워드: ${keywords.join(', ')}`}
        fortuneType="career"
        title={`${formData.name}님의 직업운`}
      />
    </div>
  );
}
