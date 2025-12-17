'use client';

import { SajuResult as SajuResultType } from '@/lib/saju-calculator';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import CircularScore from './premium/CircularScore';
import ElementsRadarChart from './premium/ElementsRadarChart';
import DetailTabsEnhanced from './premium/DetailTabsEnhanced';
import SajuPillarTable from './premium/SajuPillarTable';
import TenGodsAnalysis from './premium/TenGodsAnalysis';
import HapchungAnalysis from './premium/HapchungAnalysis';
import ShinsalAnalysis from './premium/ShinsalAnalysis';
import HealthAdvice from './premium/HealthAdvice';
import DaeunTimeline from './premium/DaeunTimeline';
import MonthlyForecast2025 from './premium/MonthlyForecast2025';
import MonthlyForecast2026 from './premium/MonthlyForecast2026';
import { RotateCcw } from 'lucide-react';

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

  // 격국 판단
  const getGyeokguk = () => {
    const { 재성, 관성, 식상, 인성 } = result.tenGodsCount;
    if (재성 >= 2) return '재성격';
    if (관성 >= 2) return '관성격';
    if (식상 >= 2) return '식상격';
    if (인성 >= 2) return '인성격';
    return '보통격';
  };

  // 희신 판단 (용신을 생하는 오행)
  const getHeesin = () => {
    const elementCycle: { [key: string]: string } = {
      '목': '수', '화': '목', '토': '화', '금': '토', '수': '금'
    };
    return elementCycle[result.yongsin] || result.yongsin;
  };

  // 핵심 평가
  const getCoreEvaluation = () => {
    const { 재성, 관성, 식상 } = result.tenGodsCount;
    const parts = [];

    if (재성 >= 2) parts.push('재물 기운 왕성');
    if (관성 >= 2) parts.push('리더십 강함');
    if (식상 >= 2) parts.push('창의력 탁월');
    if (result.strength === 'strong') parts.push('의지력 강인');
    if (result.shinsals.some(s => s.type === 'good')) parts.push('귀인운 있음');

    return parts.length > 0 ? parts.join(', ') : '균형잡힌 사주';
  };

  const gyeokguk = getGyeokguk();
  const heesin = getHeesin();
  const coreEvaluation = getCoreEvaluation();

  return (
    <div id="saju-result-premium" className="w-full max-w-6xl mx-auto space-y-12 py-12 px-4 relative">
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
          <div className="flex items-center justify-center gap-3 flex-wrap text-sm mb-4">
            <span className="px-4 py-2 bg-slate-800/50 rounded-full text-amber-400">
              {t(`gender.${gender}`)}
            </span>
            <span className="px-4 py-2 bg-slate-800/50 rounded-full text-amber-400">
              {result.day.stem.ko}{result.day.stem.cn} 일간
            </span>
            <span className="px-4 py-2 bg-slate-800/50 rounded-full text-amber-400">
              {result.day.stem.element}{' '}
              {result.day.stem.yinyang === '+' ? t('yang') : t('yin')}
            </span>
            <span className="px-4 py-2 bg-purple-900/50 rounded-full text-purple-300 border border-purple-500/30">
              {gyeokguk}
            </span>
          </div>
          <div className="flex items-center justify-center gap-3 flex-wrap text-sm mb-3">
            <span className="px-4 py-2 bg-gradient-to-r from-blue-900/50 to-cyan-900/50 rounded-full text-cyan-300 border border-cyan-500/30">
              용신: {result.yongsin}
            </span>
            <span className="px-4 py-2 bg-gradient-to-r from-blue-900/50 to-cyan-900/50 rounded-full text-cyan-300 border border-cyan-500/30">
              희신: {heesin}
            </span>
          </div>
          <p className="text-slate-300 text-base font-medium mt-4">
            ✨ {coreEvaluation}
          </p>
        </div>

        {/* 용신/희신 설명 */}
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div className="glass rounded-xl p-5">
            <h4 className="font-bold text-cyan-400 mb-2 flex items-center gap-2">
              💎 용신(用神): {result.yongsin}
            </h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              사주에서 <strong className="text-amber-400">가장 필요한 오행</strong>입니다.
              {result.strength === 'strong' && ' 신강한 사주이므로 기운을 설기시키는 오행이 용신입니다.'}
              {result.strength === 'weak' && ' 신약한 사주이므로 나를 돕는 오행이 용신입니다.'}
              {result.strength === 'neutral' && ' 균형잡힌 사주지만 가장 부족한 오행을 보충하면 좋습니다.'}
            </p>
            <p className="text-slate-400 text-xs mt-2">
              💡 {result.yongsin} 오행의 색상, 방향, 직업이 도움이 됩니다.
            </p>
          </div>
          <div className="glass rounded-xl p-5">
            <h4 className="font-bold text-purple-400 mb-2 flex items-center gap-2">
              ✨ 희신(喜神): {heesin}
            </h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              <strong className="text-amber-400">용신을 생해주는 오행</strong>입니다.
              용신의 보조 역할로, 용신과 함께 활용하면 효과가 배가됩니다.
            </p>
            <p className="text-slate-400 text-xs mt-2">
              💡 {heesin}(희신) → {result.yongsin}(용신)을 생합니다.
            </p>
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

        {/* Action Button */}
        <div className="flex justify-center">
          <motion.button
            onClick={onReset}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-xl font-semibold transition"
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

      {/* Saju Pillar Table */}
      <SajuPillarTable result={result} birthYear={birthDate.year} />

      {/* Ten Gods Analysis */}
      <TenGodsAnalysis result={result} />

      {/* Hapchung Analysis */}
      <HapchungAnalysis result={result} />

      {/* Shinsal Analysis */}
      <ShinsalAnalysis result={result} />

      {/* Health Advice */}
      <HealthAdvice result={result} />

      {/* Detail Tabs */}
      <DetailTabsEnhanced result={result} birthYear={birthDate.year} />

      {/* Daeun Timeline */}
      <DaeunTimeline result={result} birthYear={birthDate.year} />

      {/* Monthly Forecast 2025 */}
      <MonthlyForecast2025 result={result} />

      {/* Monthly Forecast 2026 */}
      <MonthlyForecast2026 result={result} />

      {/* Footer - 면책 조항 */}
      <div className="glass rounded-2xl p-6 text-center space-y-3">
        <p className="text-slate-300 text-sm">
          ⚠️ 본 사주 풀이는 <strong className="text-amber-400">전통 명리학 이론과 전문가 자문</strong>을 바탕으로
          제작되었으며, 재미와 참고용으로 활용해 주세요.
        </p>
        <p className="text-slate-400 text-xs">
          실제 운세나 인생의 중요한 결정은 본인의 판단과 노력이 가장 중요합니다.
          <br />
          더 심층적인 상담을 원하시면 전문 역술인과 직접 상담하시기를 권장합니다.
        </p>
        <div className="pt-3 border-t border-slate-700/50">
          <p className="font-semibold text-amber-400 text-sm">{tCommon('version')}</p>
        </div>
      </div>
    </div>
  );
}
