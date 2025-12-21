'use client';

import { SajuResult } from '@/lib/saju-calculator';
import { motion } from 'framer-motion';
import { RotateCcw, Download, Mail, Share2, ArrowLeft } from 'lucide-react';
import { downloadElementAsHtml } from '@/lib/utils/export-utils';
import { shareToKakao } from '@/lib/utils/kakao-share';
import EmailModal from './ui/EmailModal';
import { useState } from 'react';

// Study sub-components
import StudyOverview from './premium/study/StudyOverview';
import StudyStyle from './premium/study/StudyStyle';
import StudySubject from './premium/study/StudySubject';
import StudyConcentration from './premium/study/StudyConcentration';
import StudyTime from './premium/study/StudyTime';
import StudyMethod from './premium/study/StudyMethod';
import StudyExam from './premium/study/StudyExam';
import StudyCertification from './premium/study/StudyCertification';
import StudyLanguage from './premium/study/StudyLanguage';
import StudyMentor from './premium/study/StudyMentor';
import StudyCompetition from './premium/study/StudyCompetition';
import StudyOverseas from './premium/study/StudyOverseas';
import StudyGrowth from './premium/study/StudyGrowth';
import StudyCareer from './premium/study/StudyCareer';

interface StudyResultProps {
  result: SajuResult;
  name: string;
  gender: 'male' | 'female';
  birthDate: { year: number; month: number; day: number };
  onReset: () => void;
  onBack: () => void;
}

export default function StudyResult({
  result,
  name,
  gender: _gender,
  birthDate,
  onReset,
  onBack,
}: StudyResultProps) {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const dayElement = result.day.stem.element;

  // 학업운 총점 계산
  const calculateStudyScore = () => {
    let score = 50;
    const { 인성, 식상, 관성, 비겁 } = result.tenGodsCount;

    // 인성 가점 (학습력)
    if (인성 >= 2) score += 20;
    else if (인성 >= 1) score += 12;

    // 식상 가점 (창의력)
    if (식상 >= 2) score += 15;
    else if (식상 >= 1) score += 8;

    // 관성 가점 (집중력)
    if (관성 >= 2) score += 12;
    else if (관성 >= 1) score += 6;

    // 일간과 학업운 관계
    if (dayElement === '수') score += 15; // 지혜, 분석력
    if (dayElement === '금') score += 12; // 논리, 체계
    if (dayElement === '목') score += 10; // 창의, 성장
    if (dayElement === '토') score += 8; // 암기, 안정
    if (dayElement === '화') score += 5; // 열정, 순발력

    // 용신이 수/금이면 가점
    if (result.yongsin === '수' || result.yongsin === '금') score += 10;

    // 비겁 과다 감점
    if (비겁 >= 3) score -= 8;

    // 범위 제한
    return Math.min(Math.max(score, 30), 100);
  };

  const studyScore = calculateStudyScore();

  // 등급 판정
  const getStudyGrade = () => {
    if (studyScore >= 85) return '탁월';
    if (studyScore >= 70) return '우수';
    if (studyScore >= 55) return '양호';
    if (studyScore >= 40) return '보통';
    return '노력필요';
  };

  // 키워드 생성
  const getKeywords = () => {
    const keywords = [];
    const { 인성, 식상, 관성 } = result.tenGodsCount;

    if (studyScore >= 75) keywords.push('학업성취');
    if (dayElement === '수') keywords.push('분석적 사고');
    if (인성 >= 2) keywords.push('뛰어난 학습력');
    if (식상 >= 2) keywords.push('창의적 문제해결');
    if (관성 >= 2) keywords.push('강한 집중력');
    if (dayElement === '금') keywords.push('논리적 체계');
    if (dayElement === '목') keywords.push('빠른 이해력');

    if (keywords.length < 3) {
      keywords.push('꾸준한 노력', '목표 달성');
    }

    return keywords.slice(0, 4);
  };

  const studyGrade = getStudyGrade();
  const keywords = getKeywords();

  // HTML 다운로드 (화면 그대로 저장)
  const handleDownloadHtml = () => {
    downloadElementAsHtml('study-result', `학업운_${name}`);
  };

  // 카카오 공유
  const handleKakaoShare = () => {
    shareToKakao({
      title: `📚 ${name}님의 학업운 분석`,
      description: `학업운 ${studyScore}점 | ${studyGrade} | ${keywords.slice(0, 2).join(', ')}`,
    });
  };

  const birthDateObj = new Date(birthDate.year, birthDate.month - 1, birthDate.day);

  return (
    <div id="study-result" className="w-full max-w-6xl mx-auto space-y-12 py-12 px-4">
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
        <h1
          className="text-4xl md:text-5xl font-bold mb-4 gradient-text"
          style={{ fontFamily: "'Noto Serif KR', serif" }}
        >
          📚 학업운 종합 분석
        </h1>
        <p className="text-xl text-slate-300 mb-6">{name}님의 학습 잠재력과 성공 전략</p>

        <div className="inline-block glass rounded-2xl px-8 py-4 mb-6">
          <div className="flex items-center gap-6 justify-center flex-wrap">
            <div className="text-center">
              <p className="text-slate-400 text-sm">일간</p>
              <p className="text-2xl font-bold text-cyan-400">
                {result.day.stem.ko} ({dayElement})
              </p>
            </div>
            <div className="text-center">
              <p className="text-slate-400 text-sm">학업운 점수</p>
              <p className="text-4xl font-bold gradient-text">{studyScore}점</p>
            </div>
            <div className="text-center">
              <p className="text-slate-400 text-sm">등급</p>
              <p className="text-2xl font-bold text-yellow-400">{studyGrade}</p>
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

      {/* 1. 학업운 종합 개요 */}
      <StudyOverview result={result} name={name} birthDate={birthDateObj} />

      {/* 2. 학습 스타일 분석 */}
      <StudyStyle result={result} name={name} birthDate={birthDateObj} />

      {/* 3. 적합한 전공/과목 */}
      <StudySubject result={result} name={name} birthDate={birthDateObj} />

      {/* 4. 집중력 패턴 분석 */}
      <StudyConcentration result={result} name={name} birthDate={birthDateObj} />

      {/* 5. 최적의 학습 시간대 */}
      <StudyTime result={result} name={name} birthDate={birthDateObj} />

      {/* 6. 효과적인 학습법 */}
      <StudyMethod result={result} name={name} birthDate={birthDateObj} />

      {/* 7. 시험운 분석 */}
      <StudyExam result={result} name={name} birthDate={birthDateObj} />

      {/* 8. 자격증 취득운 */}
      <StudyCertification result={result} name={name} birthDate={birthDateObj} />

      {/* 9. 외국어 학습운 */}
      <StudyLanguage result={result} name={name} birthDate={birthDateObj} />

      {/* 10. 스승/멘토 운세 */}
      <StudyMentor result={result} name={name} birthDate={birthDateObj} />

      {/* 11. 경쟁/대회 운세 */}
      <StudyCompetition result={result} name={name} birthDate={birthDateObj} />

      {/* 12. 유학운 분석 */}
      <StudyOverseas result={result} name={name} birthDate={birthDateObj} />

      {/* 13. 지적 성장 방향 */}
      <StudyGrowth result={result} name={name} birthDate={birthDateObj} />

      {/* 14. 학업과 진로 연결 */}
      <StudyCareer result={result} name={name} birthDate={birthDateObj} />

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
        htmlContent={`${name}님의 학업운 분석 결과입니다.\n\n학업운 점수: ${studyScore}점 (${studyGrade})\n일간: ${result.day.stem.ko}(${dayElement})\n\n핵심 키워드: ${keywords.join(', ')}`}
        fortuneType="study"
        title={`${name}님의 학업운`}
      />
    </div>
  );
}
