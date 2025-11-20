'use client';

import { SajuResult as SajuResultType } from '@/lib/saju-calculator';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import CircularScore from './premium/CircularScore';
import ElementsRadarChart from './premium/ElementsRadarChart';
import DetailTabs from './premium/DetailTabs';
import AIPromptGenerator from './premium/AIPromptGenerator';
import { Download, Share2, RotateCcw } from 'lucide-react';

interface SajuResultPremiumProps {
  result: SajuResultType;
  name: string;
  gender: 'male' | 'female';
  birthDate: {
    year: number;
    month: number;
    day: number;
  };
  onReset: () => void;
}

export default function SajuResultPremium({
  result,
  name,
  gender,
  birthDate,
  onReset,
}: SajuResultPremiumProps) {
  const t = useTranslations('result');
  const tCommon = useTranslations('common');
  const [isSaving, setIsSaving] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  // 운세 점수 계산 (0-100)
  const calculateScore = () => {
    let score = 50; // 기본 점수

    // 신강/신약 균형 (+10/-10)
    if (result.strength === 'neutral') score += 15;
    else if (result.strength === 'strong') score += 5;

    // 오행 균형 (각 오행이 15-25% 사이면 +2점, 최대 10점)
    Object.values(result.elements).forEach((value) => {
      if (value >= 15 && value <= 25) score += 2;
    });

    // 십성 균형 (비겁, 식상, 재성, 관성, 인성이 골고루 있으면 가점)
    const tenGodsValues = Object.values(result.tenGodsCount);
    const nonZeroCount = tenGodsValues.filter((v) => v > 0).length;
    score += nonZeroCount * 3;

    // 합충이 적으면 가점
    if (result.hapchung.length === 0) score += 10;
    else if (result.hapchung.length === 1) score += 5;

    // 길신이 있으면 가점
    const goodShinsals = result.shinsals.filter((s) => s.type === 'good').length;
    score += goodShinsals * 5;

    // 흉신이 있으면 감점
    const badShinsals = result.shinsals.filter((s) => s.type === 'bad').length;
    score -= badShinsals * 5;

    // 0-100 범위로 제한
    return Math.max(0, Math.min(100, score));
  };

  const sajuScore = calculateScore();

  // 이미지 다운로드
  const handleDownload = async () => {
    setIsSaving(true);

    const element = document.getElementById('saju-result-premium');
    const buttons = element?.querySelectorAll('button');

    try {
      if (!element) {
        alert('저장할 내용을 찾을 수 없습니다.');
        return;
      }

      // 버튼 숨기기
      buttons?.forEach((btn) => ((btn as HTMLElement).style.display = 'none'));

      // DOM 업데이트 대기
      await new Promise((resolve) => setTimeout(resolve, 300));

      // 이미지 생성 (타임아웃 포함)
      const htmlToImage = await import('html-to-image');

      const dataUrl = await Promise.race([
        htmlToImage.toPng(element, {
          quality: 0.95,
          pixelRatio: 2,
          backgroundColor: '#0f172a',
          cacheBust: true,
        }),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('타임아웃')), 15000)
        )
      ]);

      // 다운로드
      const link = document.createElement('a');
      const today = new Date().toISOString().split('T')[0];
      link.download = `${name}_사주풀이_${today}.png`;
      link.href = dataUrl;
      link.click();

      alert('이미지가 다운로드되었습니다!');
    } catch (error) {
      console.error('이미지 생성 오류:', error);
      alert('이미지 생성 중 오류가 발생했습니다.\n' + (error instanceof Error ? error.message : '알 수 없는 오류'));
    } finally {
      // 항상 버튼 복구
      buttons?.forEach((btn) => ((btn as HTMLElement).style.display = ''));
      setIsSaving(false);
    }
  };

  // 공유하기
  const handleShare = async () => {
    setIsSharing(true);

    const element = document.getElementById('saju-result-premium');
    const buttons = element?.querySelectorAll('button');

    try {
      if (!element) {
        alert('공유할 내용을 찾을 수 없습니다.');
        return;
      }

      // 버튼 숨기기
      buttons?.forEach((btn) => ((btn as HTMLElement).style.display = 'none'));

      // DOM 업데이트 대기
      await new Promise((resolve) => setTimeout(resolve, 300));

      // 이미지 생성 (타임아웃 포함)
      const htmlToImage = await import('html-to-image');

      const blob = await Promise.race([
        htmlToImage.toBlob(element, {
          quality: 0.95,
          pixelRatio: 2,
          backgroundColor: '#0f172a',
          cacheBust: true,
        }),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('타임아웃')), 15000)
        )
      ]);

      if (!blob) {
        throw new Error('이미지 생성에 실패했습니다');
      }

      const today = new Date().toISOString().split('T')[0];
      const file = new File([blob], `${name}_사주풀이_${today}.png`, { type: 'image/png' });

      // Web Share API 사용 가능 여부 확인
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: `${name}님의 사주 풀이`,
          text: `${name}님의 사주 풀이 결과입니다`,
          files: [file],
        });
      } else {
        // Web Share API를 지원하지 않으면 다운로드
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `${name}_사주풀이_${today}.png`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        alert('이미지가 다운로드되었습니다!');
      }
    } catch (error) {
      console.error('공유 오류:', error);

      // AbortError는 사용자가 공유를 취소한 경우
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }

      alert('공유 중 오류가 발생했습니다.\n' + (error instanceof Error ? error.message : '알 수 없는 오류'));
    } finally {
      // 항상 버튼 복구
      buttons?.forEach((btn) => ((btn as HTMLElement).style.display = ''));
      setIsSharing(false);
    }
  };

  return (
    <div id="saju-result-premium" className="w-full max-w-6xl mx-auto space-y-12 py-12 px-4">
      {/* Hero Section */}
      <motion.div
        className="glass-strong rounded-3xl p-8 md:p-12 relative overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl -z-10" />

        <div className="text-center mb-8">
          <h1
            className="text-4xl md:text-5xl font-bold gradient-text mb-4"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            {name}님의 사주 풀이
          </h1>
          <div className="flex items-center justify-center gap-4 flex-wrap text-sm">
            <span className="px-4 py-2 bg-slate-800/50 rounded-full text-amber-400">
              {t(`gender.${gender}`)}
            </span>
            <span className="px-4 py-2 bg-slate-800/50 rounded-full text-amber-400">
              {result.day.stem.ko}
              {result.day.stem.cn} 일간
            </span>
            <span className="px-4 py-2 bg-slate-800/50 rounded-full text-amber-400">
              {result.day.stem.element}{' '}
              {result.day.stem.yinyang === '+' ? t('yang') : t('yin')}
            </span>
          </div>
        </div>

        {/* Score */}
        <div className="flex flex-col items-center my-12">
          <CircularScore score={sajuScore} size={220} strokeWidth={14} />
          <p className="text-slate-400 mt-6 text-center">
            {sajuScore >= 80
              ? '🌟 매우 좋은 사주입니다! 균형잡힌 오행과 길신이 함께합니다.'
              : sajuScore >= 60
              ? '✨ 좋은 사주입니다. 몇 가지 보완하면 더욱 좋아질 것입니다.'
              : sajuScore >= 40
              ? '💫 평범한 사주입니다. 노력에 따라 운이 달라질 수 있습니다.'
              : '🔮 어려움이 있을 수 있지만, 용신을 활용하면 개선됩니다.'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          <motion.button
            onClick={handleDownload}
            disabled={isSaving || isSharing}
            className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-semibold transition disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-4 h-4" />
            {isSaving ? '저장 중...' : '이미지 저장'}
          </motion.button>

          <motion.button
            onClick={handleShare}
            disabled={isSaving || isSharing}
            className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-semibold transition disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share2 className="w-4 h-4" />
            {isSharing ? '공유 준비중...' : '공유하기'}
          </motion.button>

          <motion.button
            onClick={onReset}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-xl font-semibold transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-4 h-4" />
            다시 입력하기
          </motion.button>
        </div>
      </motion.div>

      {/* Radar Chart Section */}
      <motion.div
        className="glass-strong rounded-3xl p-8 md:p-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      >
        <h2
          className="text-3xl font-bold text-center mb-8 gradient-text"
          style={{ fontFamily: "'Noto Serif KR', serif" }}
        >
          오행 에너지 분석
        </h2>
        <ElementsRadarChart elements={result.elements} />

        {/* Element Balance Info */}
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          {result.elementBalance.excess.length > 0 && (
            <div className="glass rounded-xl p-4">
              <h4 className="font-semibold text-red-400 mb-2">⚡ 과다한 기운</h4>
              <p className="text-slate-300">{result.elementBalance.excess.join(', ')}</p>
            </div>
          )}
          {result.elementBalance.deficiency.length > 0 && (
            <div className="glass rounded-xl p-4">
              <h4 className="font-semibold text-blue-400 mb-2">💧 부족한 기운</h4>
              <p className="text-slate-300">{result.elementBalance.deficiency.join(', ')}</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Detail Tabs */}
      <DetailTabs result={result} />

      {/* AI Prompt Generator */}
      <AIPromptGenerator
        result={result}
        name={name}
        gender={gender}
        birthDate={birthDate}
      />

      {/* Footer */}
      <div className="text-center text-slate-500 text-sm space-y-2">
        <p>이 사주 풀이는 전통 명리학을 기반으로 합니다</p>
        <p>더 정확한 해석을 원하시면 전문가와 상담하시기 바랍니다</p>
        <div className="pt-4">
          <p className="font-semibold text-amber-400">{tCommon('version')}</p>
        </div>
      </div>
    </div>
  );
}
