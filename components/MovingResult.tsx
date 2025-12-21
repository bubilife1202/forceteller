'use client';

import { SajuResult } from '@/lib/saju-calculator';
import { motion } from 'framer-motion';
import { RotateCcw, Download, Mail, Share2, ArrowLeft } from 'lucide-react';
import { downloadAsHtml } from '@/lib/utils/export-utils';
import { shareToKakao } from '@/lib/utils/kakao-share';
import EmailModal from './ui/EmailModal';
import { useState } from 'react';

// Moving sub-components
import MovingOverview from './premium/moving/MovingOverview';
import MovingDirection from './premium/moving/MovingDirection';
import MovingTiming from './premium/moving/MovingTiming';
import MovingAvoid from './premium/moving/MovingAvoid';
import MovingHome from './premium/moving/MovingHome';
import MovingFloor from './premium/moving/MovingFloor';
import MovingEnvironment from './premium/moving/MovingEnvironment';
import MovingFengshui from './premium/moving/MovingFengshui';
import MovingColor from './premium/moving/MovingColor';
import MovingRoom from './premium/moving/MovingRoom';
import MovingEntrance from './premium/moving/MovingEntrance';
import MovingNeighbor from './premium/moving/MovingNeighbor';
import MovingRental from './premium/moving/MovingRental';
import MovingPurchase from './premium/moving/MovingPurchase';

interface MovingResultProps {
  result: SajuResult;
  name: string;
  gender: 'male' | 'female';
  birthDate: { year: number; month: number; day: number };
  onReset: () => void;
  onBack: () => void;
}

export default function MovingResult({
  result,
  name,
  gender,
  birthDate,
  onReset,
  onBack,
}: MovingResultProps) {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const dayElement = result.day.stem.element;

  const birthDateObj = new Date(birthDate.year, birthDate.month - 1, birthDate.day);

  // 이사운 총점 계산
  const calculateMovingScore = () => {
    let score = 50;
    const { 재성, 관성, 인성 } = result.tenGodsCount;

    if (재성 >= 2) score += 15;
    else if (재성 >= 1) score += 8;

    if (관성 >= 2) score += 10;
    if (인성 >= 2) score += 5;

    if (dayElement === '토') score += 20;
    if (dayElement === '목') score += 15;
    if (dayElement === '수') score += 10;
    if (dayElement === '화') score += 5;

    if (result.yongsin === dayElement) score += 10;

    return Math.min(Math.max(score, 30), 100);
  };

  const movingScore = calculateMovingScore();

  const getMovingGrade = () => {
    if (movingScore >= 80) return '대길';
    if (movingScore >= 65) return '길';
    if (movingScore >= 50) return '평길';
    return '주의';
  };

  const getKeywords = () => {
    const keywords = [];
    const { 재성, 관성 } = result.tenGodsCount;

    if (movingScore >= 70) keywords.push('이사 대길');
    if (dayElement === '토') keywords.push('부동산 매수 길');
    if (재성 >= 2) keywords.push('재물운 상승');
    if (관성 >= 2) keywords.push('안정된 주거');
    if (dayElement === '목') keywords.push('확장 이주');

    if (keywords.length < 3) {
      keywords.push('신중한 선택', '계획적 이사');
    }

    return keywords.slice(0, 4);
  };

  const movingGrade = getMovingGrade();
  const keywords = getKeywords();

  const handleDownloadHtml = () => {
    const htmlContent = `
      <div class="header">
        <h1>🏠 이사/방위운 종합 분석</h1>
        <p>${name}님의 이사운 • 일간: ${dayElement}(${result.day.stem.ko})</p>
        <p style="font-size: 0.9rem; color: #94a3b8; margin-top: 8px;">이사운 점수: ${movingScore}점 - ${movingGrade}</p>
      </div>

      <div class="section">
        <h2 class="section-title">🎯 핵심 키워드</h2>
        <div class="grid">
          ${keywords.map(k => `<div class="card"><div class="card-value">${k}</div></div>`).join('')}
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">🧭 사주 이사운 분석</h2>
        <p>일간 오행: ${dayElement}(${result.day.stem.ko})</p>
        <p>재성 (부동산운): ${result.tenGodsCount.재성}개</p>
        <p>관성 (안정운): ${result.tenGodsCount.관성}개</p>
        <p>용신: ${result.yongsin}</p>
        <p style="margin-top: 12px;">
          ${dayElement === '토' ? '토(土) 일간은 부동산과 가장 밀접합니다. 이사와 주거 변화가 재물운 상승으로 이어질 수 있습니다.' :
            dayElement === '목' ? '목(木) 일간은 성장과 확장을 상징합니다. 더 넓고 좋은 환경으로의 이사가 길합니다.' :
            dayElement === '화' ? '화(火) 일간은 활동적입니다. 이사를 통해 새로운 기회와 인연을 만날 수 있습니다.' :
            dayElement === '금' ? '금(金) 일간은 안정을 추구합니다. 충분히 검토하고 계획적으로 이사하세요.' :
            '수(水) 일간은 유동적입니다. 빠른 이사 결정과 실행이 가능하나, 신중함도 필요합니다.'}
        </p>
      </div>

      <div class="section">
        <h2 class="section-title">🧭 추천 이사 방위</h2>
        <p>${dayElement === '목' ? '동쪽, 남동쪽' : dayElement === '화' ? '남쪽, 남동쪽' : dayElement === '토' ? '남서쪽, 북동쪽' : dayElement === '금' ? '서쪽, 북서쪽' : '북쪽, 북서쪽'}</p>
        <p style="margin-top: 8px; color: #94a3b8;">현재 거주지를 기준으로 위 방향으로의 이사가 길합니다</p>
      </div>

      <div class="section">
        <h2 class="section-title">🏡 추천 주거 형태</h2>
        <p>${dayElement === '토' || dayElement === '목' ? '단독주택, 아파트 (중대형)' : dayElement === '금' ? '아파트, 빌라' : '아파트, 빌라, 원룸'}</p>
        <p style="margin-top: 8px;">평수: ${dayElement === '토' || dayElement === '목' ? '30평 이상' : dayElement === '화' ? '20-30평' : '15-25평'}</p>
      </div>

      <div class="footer">
        <p>더 자세한 분석은 팔자왕닷컴에서 확인하세요</p>
        <p>palzawang.co.kr</p>
      </div>
    `;

    downloadAsHtml(htmlContent, `${name}_이사운_${new Date().getTime()}.html`);
  };

  const handleKakaoShare = () => {
    shareToKakao({
      title: `${name}님의 이사/방위운`,
      description: `이사운 ${movingScore}점 (${movingGrade}) | ${keywords.join(', ')}`,
      imageUrl: 'https://palzawang.co.kr/og-image.png',
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* 헤더 */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1
          className="text-4xl md:text-5xl font-bold mb-4 gradient-text"
          style={{ fontFamily: "'Noto Serif KR', serif" }}
        >
          🏠 이사/방위운
        </h1>
        <p className="text-xl text-slate-300 mb-2">{name}님의 종합 분석</p>
        <p className="text-slate-400">
          생년월일: {birthDate.year}년 {birthDate.month}월 {birthDate.day}일 ({gender === 'male' ? '남성' : '여성'})
        </p>
        <p className="text-slate-500 text-sm mt-2">
          일간: {dayElement}({result.day.stem.ko}) • 이사운: {movingScore}점 ({movingGrade})
        </p>
      </motion.div>

      {/* 버튼 그룹 */}
      <motion.div
        className="flex flex-wrap justify-center gap-4 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <button
          onClick={onBack}
          className="px-6 py-3 glass rounded-xl hover:glass-strong transition-all flex items-center gap-2 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>홈으로</span>
        </button>
        <button
          onClick={onReset}
          className="px-6 py-3 glass rounded-xl hover:glass-strong transition-all flex items-center gap-2 group"
        >
          <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform" />
          <span>다시 보기</span>
        </button>
        <button
          onClick={handleDownloadHtml}
          className="px-6 py-3 glass rounded-xl hover:glass-strong transition-all flex items-center gap-2 group"
        >
          <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          <span>HTML 저장</span>
        </button>
        <button
          onClick={() => setIsEmailModalOpen(true)}
          className="px-6 py-3 glass rounded-xl hover:glass-strong transition-all flex items-center gap-2 group"
        >
          <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span>이메일 전송</span>
        </button>
        <button
          onClick={handleKakaoShare}
          className="px-6 py-3 bg-yellow-400 text-gray-900 rounded-xl hover:bg-yellow-300 transition-all flex items-center gap-2 group font-bold"
        >
          <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span>카카오 공유</span>
        </button>
      </motion.div>

      {/* 모든 섹션 */}
      <div className="space-y-8">
        <MovingOverview result={result} name={name} birthDate={birthDateObj} />
        <MovingDirection result={result} name={name} birthDate={birthDateObj} />
        <MovingTiming result={result} name={name} birthDate={birthDateObj} />
        <MovingAvoid result={result} name={name} birthDate={birthDateObj} />
        <MovingHome result={result} name={name} birthDate={birthDateObj} />
        <MovingFloor result={result} name={name} birthDate={birthDateObj} />
        <MovingEnvironment result={result} name={name} birthDate={birthDateObj} />
        <MovingFengshui result={result} name={name} birthDate={birthDateObj} />
        <MovingColor result={result} name={name} birthDate={birthDateObj} />
        <MovingRoom result={result} name={name} birthDate={birthDateObj} />
        <MovingEntrance result={result} name={name} birthDate={birthDateObj} />
        <MovingNeighbor result={result} name={name} birthDate={birthDateObj} />
        <MovingRental result={result} name={name} birthDate={birthDateObj} />
        <MovingPurchase result={result} name={name} birthDate={birthDateObj} />
      </div>

      {/* 하단 버튼 */}
      <motion.div
        className="mt-12 flex flex-wrap justify-center gap-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <button
          onClick={onReset}
          className="px-8 py-4 glass rounded-xl hover:glass-strong transition-all flex items-center gap-2 group"
        >
          <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform" />
          <span>다시 보기</span>
        </button>
        <button
          onClick={onBack}
          className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all flex items-center gap-2 group font-bold"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>홈으로 돌아가기</span>
        </button>
      </motion.div>

      {/* 이메일 모달 */}
      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        htmlContent={`
          <h2>🏠 이사/방위운 종합 분석</h2>
          <p><strong>${name}님</strong>의 이사운 분석 결과입니다.</p>
          <p>이사운 점수: <strong>${movingScore}점 (${movingGrade})</strong></p>
          <p>일간: ${dayElement}(${result.day.stem.ko})</p>
          <hr />
          <p>자세한 내용은 첨부된 파일을 확인하세요.</p>
        `}
        fortuneType="이사/방위운"
        title={`${name}님의 이사/방위운 분석`}
      />
    </div>
  );
}
