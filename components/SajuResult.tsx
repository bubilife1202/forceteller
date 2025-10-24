'use client';

import { SajuResult as SajuResultType } from '@/lib/saju-calculator';
import { ELEMENTS } from '@/lib/saju-constants';
import ElementsChart from './ElementsChart';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface SajuResultProps {
  result: SajuResultType;
  name: string;
  gender: 'male' | 'female';
  onReset: () => void;
}

export default function SajuResult({ result, name, gender, onReset }: SajuResultProps) {
  const t = useTranslations('result');
  const [isSaving, setIsSaving] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const Tooltip = ({ titleKey }: { titleKey: string }) => (
    <div className="relative inline-block">
      <button
        className="ml-2 w-5 h-5 rounded-full bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs flex items-center justify-center hover:bg-gray-400 dark:hover:bg-gray-500 transition"
        onMouseEnter={() => setShowTooltip(titleKey)}
        onMouseLeave={() => setShowTooltip(null)}
        onClick={(e) => {
          e.preventDefault();
          setShowTooltip(showTooltip === titleKey ? null : titleKey);
        }}
      >
        ?
      </button>
      {showTooltip === titleKey && (
        <div className="absolute left-0 top-8 z-50 w-72 p-4 bg-gray-900 text-white text-sm rounded-xl shadow-2xl">
          <div className="absolute -top-2 left-4 w-4 h-4 bg-gray-900 transform rotate-45"></div>
          {t(`tooltips.${titleKey}`)}
        </div>
      )}
    </div>
  );

  // 이미지로 공유하기 (Web Share API)
  const handleShare = async () => {
    try {
      const htmlToImage = await import('html-to-image');

      const element = document.getElementById('saju-result');
      if (!element) {
        alert(t('alerts.shareNotFound'));
        return;
      }

      const buttons = element.querySelectorAll('button');
      buttons.forEach(btn => (btn as HTMLElement).style.display = 'none');
      await new Promise(resolve => setTimeout(resolve, 500));

      const scrollWidth = element.scrollWidth;
      const scrollHeight = element.scrollHeight;

      const blob = await htmlToImage.toBlob(element, {
        quality: 1.0,
        pixelRatio: 3,
        backgroundColor: '#ffffff',
        cacheBust: true,
        width: scrollWidth,
        height: scrollHeight,
      });

      buttons.forEach(btn => (btn as HTMLElement).style.display = '');

      if (!blob) {
        alert(t('alerts.imageFailed'));
        return;
      }

      const today = new Date().toISOString().split('T')[0];
      const file = new File([blob], `${name}_사주풀이_${today}.png`, { type: 'image/png' });

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: t('title', { name }),
          text: t('title', { name }),
          files: [file]
        });
      } else {
        alert(t('alerts.browserNotSupported'));
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `${name}_사주풀이_${today}.png`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('공유 오류:', error);

      const element = document.getElementById('saju-result');
      if (element) {
        const buttons = element.querySelectorAll('button');
        buttons.forEach(btn => (btn as HTMLElement).style.display = '');
      }

      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }
      alert(t('alerts.shareFailed'));
    }
  };

  // 이미지 다운로드
  const handleDownloadPDF = async () => {
    setIsSaving(true);
    try {
      const htmlToImage = await import('html-to-image');

      const element = document.getElementById('saju-result');
      if (!element) {
        console.error('저장 대상 요소를 찾을 수 없습니다.');
        setIsSaving(false);
        return;
      }

      const buttons = element.querySelectorAll('button');
      buttons.forEach(btn => (btn as HTMLElement).style.display = 'none');
      await new Promise(resolve => setTimeout(resolve, 500));

      const scrollWidth = element.scrollWidth;
      const scrollHeight = element.scrollHeight;

      const dataUrl = await htmlToImage.toPng(element, {
        quality: 1.0,
        pixelRatio: 3,
        backgroundColor: '#ffffff',
        cacheBust: true,
        skipAutoScale: false,
        preferredFontFormat: 'woff2',
        width: scrollWidth,
        height: scrollHeight,
        style: {
          margin: '0',
          padding: '0',
        }
      });

      buttons.forEach(btn => (btn as HTMLElement).style.display = '');

      const link = document.createElement('a');
      const today = new Date().toISOString().split('T')[0];
      link.download = `${name}_사주풀이_${today}.png`;
      link.href = dataUrl;
      link.click();

      setIsSaving(false);
    } catch (error) {
      console.error('이미지 생성 오류:', error);

      const element = document.getElementById('saju-result');
      if (element) {
        const buttons = element.querySelectorAll('button');
        buttons.forEach(btn => (btn as HTMLElement).style.display = '');
      }

      if (error instanceof Error) {
        alert(t('alerts.imageError', { error: error.message }));
      } else {
        alert(t('alerts.imageErrorGeneric'));
      }
      setIsSaving(false);
    }
  };

  return (
    <div id="saju-result" className="w-full max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* 헤더 - 사용자 정보 */}
      <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white rounded-3xl shadow-2xl p-8 md:p-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-3">{t('title', { name })}</h2>
              <div className="flex items-center gap-4 text-lg flex-wrap">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                  {t(`gender.${gender}`)}
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                  {t('dayMaster', { stem: `${result.day.stem.ko}${result.day.stem.cn}` })}
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                  {t('element', {
                    element: result.day.stem.element,
                    yinyang: result.day.stem.yinyang === '+' ? t('yang') : t('yin')
                  })}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleDownloadPDF}
                disabled={isSaving}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl font-medium transition disabled:opacity-50"
                title={t('buttons.downloadTitle')}
              >
                📸 {isSaving ? t('buttons.imageSaving') : t('buttons.image')}
              </button>
              <button
                onClick={handleShare}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl font-medium transition"
                title={t('buttons.shareTitle')}
              >
                📤 {t('buttons.share')}
              </button>
              <button
                onClick={onReset}
                className="px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:bg-opacity-90 transition"
              >
                {t('buttons.reset')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 종합 평가 */}
      <div className="pdf-avoid-break bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 rounded-3xl shadow-xl p-8 border-2 border-amber-200 dark:border-amber-900">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
          <h3 className="text-3xl font-bold text-gray-800 dark:text-white">{t('sections.overview.title')}</h3>
          <Tooltip titleKey="overview" />
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t('sections.overview.dayCharacter')}</div>
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
              {result.dayPersonality.image}
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {result.dayPersonality.personality.split('. ')[0]}.
            </div>
          </div>

          <div className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t('sections.overview.strengthType')}</div>
            <div className={`text-2xl font-bold mb-2 ${
              result.strength === 'strong' ? 'text-red-600 dark:text-red-400' :
              result.strength === 'weak' ? 'text-blue-600 dark:text-blue-400' :
              'text-gray-600 dark:text-gray-400'
            }`}>
              {t(`sections.overview.${result.strength}`)}
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {t(`sections.overview.${result.strength}Desc`)}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t('sections.overview.yongsin')}</div>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {result.yongsin.split('(')[0]}
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('sections.overview.yongsinHelp')}
            </div>
          </div>
        </div>

        <div className="p-5 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl">
          <div className="flex items-start gap-3">
            <div className="text-3xl">💡</div>
            <div>
              <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">{t('sections.overview.keyPoint')}</h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>{result.day.stem.ko}{result.day.stem.cn} {t('dayMaster', { stem: '' })}</strong>
                {result.dayPersonality.image} {result.dayPersonality.strength.split(',')[0]}
                {t('sections.overview.keyPointDesc', {
                  stem: `${result.day.stem.ko}${result.day.stem.cn}`,
                  image: result.dayPersonality.image,
                  strength: result.dayPersonality.strength.split(',')[0],
                  bigub: result.tenGodsCount.비겁,
                  sigsang: result.tenGodsCount.식상,
                  jaesung: result.tenGodsCount.재성,
                  gwansung: result.tenGodsCount.관성,
                  insung: result.tenGodsCount.인성
                })}
                {result.elementBalance.excess.length > 0 && t('sections.overview.excessElements', { elements: result.elementBalance.excess.join('·') })}
                {result.elementBalance.deficiency.length > 0 && t('sections.overview.deficientElements', { elements: result.elementBalance.deficiency.join('·') })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 일간 성격 분석 */}
      <div className="pdf-avoid-break bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 card-hover">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-pink-500 to-rose-500 rounded-full"></div>
          <h3 className="text-3xl font-bold text-gray-800 dark:text-white">{t('sections.personality.title')}</h3>
          <Tooltip titleKey="personality" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-5 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-4xl font-bold" style={{ color: ELEMENTS[result.day.stem.element as keyof typeof ELEMENTS].color }}>
                  {result.day.stem.ko}{result.day.stem.cn}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {result.day.stem.element} {result.day.stem.yinyang === '+' ? t('yang') : t('yin')}
                </div>
              </div>
              <div className="text-2xl font-semibold text-pink-700 dark:text-pink-300 mb-3">
                {result.dayPersonality.image}
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {result.dayPersonality.personality}
              </p>
            </div>

            <div className="p-5 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <h4 className="font-bold text-green-700 dark:text-green-300 mb-2 flex items-center gap-2">
                <span>{t('sections.personality.strengths')}</span>
              </h4>
              <p className="text-gray-700 dark:text-gray-300">{result.dayPersonality.strength}</p>
            </div>

            <div className="p-5 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
              <h4 className="font-bold text-orange-700 dark:text-orange-300 mb-2 flex items-center gap-2">
                <span>{t('sections.personality.weaknesses')}</span>
              </h4>
              <p className="text-gray-700 dark:text-gray-300">{result.dayPersonality.weakness}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-5 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-3 flex items-center gap-2">
                <span>{t('sections.personality.suitableJobs')}</span>
              </h4>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{result.dayPersonality.suitable}</p>
              <div className="space-y-2">
                {result.dayPersonality.suitable.split(',').map((job, idx) => (
                  <div key={idx} className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm mr-2 mb-2">
                    {job.trim()}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl">
              <h4 className="font-bold text-purple-700 dark:text-purple-300 mb-3 flex items-center gap-2">
                <span>{t('sections.personality.successStrategy')}</span>
              </h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>{t('sections.personality.strategy1', { strength: result.dayPersonality.strength.split(',')[0] })}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>{t('sections.personality.strategy2', { weakness: result.dayPersonality.weakness.split(',')[0] })}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>{t('sections.personality.strategy3', { yongsin: result.yongsin.split('(')[0] })}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 사주 팔자 */}
      <div className="pdf-page-break-before pdf-avoid-break bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 md:p-10 card-hover">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-8 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"></div>
          <h3 className="text-3xl font-bold text-gray-800 dark:text-white">{t('sections.pillars.title')}</h3>
          <Tooltip titleKey="pillars" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-600">
                <th className="border-2 border-gray-200 dark:border-gray-600 px-6 py-4 text-left font-bold text-gray-700 dark:text-gray-200">{t('sections.pillars.division')}</th>
                <th className="border-2 border-gray-200 dark:border-gray-600 px-6 py-4 text-center font-bold text-gray-700 dark:text-gray-200">
                  {t('sections.pillars.hour')}<br/>
                  <span className="text-xs font-normal text-gray-500 dark:text-gray-400">{t('sections.pillars.pillar')}</span>
                </th>
                <th className="border-2 border-gray-200 dark:border-gray-600 px-6 py-4 text-center font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/30">
                  {t('sections.pillars.day')}<br/>
                  <span className="text-xs font-normal text-indigo-500 dark:text-indigo-400">{t('sections.pillars.self')}</span>
                </th>
                <th className="border-2 border-gray-200 dark:border-gray-600 px-6 py-4 text-center font-bold text-gray-700 dark:text-gray-200">
                  {t('sections.pillars.month')}<br/>
                  <span className="text-xs font-normal text-gray-500 dark:text-gray-400">{t('sections.pillars.pillar')}</span>
                </th>
                <th className="border-2 border-gray-200 dark:border-gray-600 px-6 py-4 text-center font-bold text-gray-700 dark:text-gray-200">
                  {t('sections.pillars.year')}<br/>
                  <span className="text-xs font-normal text-gray-500 dark:text-gray-400">{t('sections.pillars.pillar')}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-2 border-gray-200 dark:border-gray-600 px-6 py-4 font-bold bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                  {t('sections.pillars.stem')}<br/>
                  <span className="text-xs font-normal text-gray-500 dark:text-gray-400">{t('sections.pillars.heavenlyStem')}</span>
                </td>
                <td className="border-2 border-gray-200 dark:border-gray-600 px-6 py-5 text-center">
                  <div className="text-4xl font-bold mb-2" style={{ color: ELEMENTS[result.hour.stem.element as keyof typeof ELEMENTS].color }}>
                    {result.hour.stem.ko}<span className="text-2xl">{result.hour.stem.cn}</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{result.hour.stem.element} {result.hour.stem.yinyang}</div>
                </td>
                <td className="border-2 border-gray-200 dark:border-gray-600 px-6 py-5 text-center bg-indigo-50 dark:bg-indigo-900/20">
                  <div className="text-4xl font-bold mb-2" style={{ color: ELEMENTS[result.day.stem.element as keyof typeof ELEMENTS].color }}>
                    {result.day.stem.ko}<span className="text-2xl">{result.day.stem.cn}</span>
                  </div>
                  <div className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold">{t('sections.pillars.dayMasterNote')}</div>
                </td>
                <td className="border-2 border-gray-200 dark:border-gray-600 px-6 py-5 text-center">
                  <div className="text-4xl font-bold mb-2" style={{ color: ELEMENTS[result.month.stem.element as keyof typeof ELEMENTS].color }}>
                    {result.month.stem.ko}<span className="text-2xl">{result.month.stem.cn}</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{result.month.stem.element} {result.month.stem.yinyang}</div>
                </td>
                <td className="border-2 border-gray-200 dark:border-gray-600 px-6 py-5 text-center">
                  <div className="text-4xl font-bold mb-2" style={{ color: ELEMENTS[result.year.stem.element as keyof typeof ELEMENTS].color }}>
                    {result.year.stem.ko}<span className="text-2xl">{result.year.stem.cn}</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{result.year.stem.element} {result.year.stem.yinyang}</div>
                </td>
              </tr>
              <tr>
                <td className="border-2 border-gray-200 dark:border-gray-600 px-6 py-4 font-bold bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                  {t('sections.pillars.tenGod')}<br/>
                  <span className="text-xs font-normal text-gray-500 dark:text-gray-400">{t('sections.pillars.tenGods')}</span>
                </td>
                <td className="border-2 border-gray-200 dark:border-gray-600 px-6 py-3 text-center">
                  <span className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg font-semibold">
                    {result.tenGods.hour}
                  </span>
                </td>
                <td className="border-2 border-gray-200 dark:border-gray-600 px-6 py-3 text-center bg-indigo-50 dark:bg-indigo-900/20">
                  <span className="inline-block px-4 py-2 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-lg font-semibold">
                    {result.tenGods.day}
                  </span>
                </td>
                <td className="border-2 border-gray-200 dark:border-gray-600 px-6 py-3 text-center">
                  <span className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg font-semibold">
                    {result.tenGods.month}
                  </span>
                </td>
                <td className="border-2 border-gray-200 dark:border-gray-600 px-6 py-3 text-center">
                  <span className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg font-semibold">
                    {result.tenGods.year}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="border-2 border-gray-200 dark:border-gray-600 px-6 py-4 font-bold bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                  {t('sections.pillars.branch')}<br/>
                  <span className="text-xs font-normal text-gray-500 dark:text-gray-400">{t('sections.pillars.earthlyBranch')}</span>
                </td>
                <td className="border-2 border-gray-200 dark:border-gray-600 px-6 py-5 text-center">
                  <div className="text-4xl font-bold mb-2" style={{ color: ELEMENTS[result.hour.branch.element as keyof typeof ELEMENTS].color }}>
                    {result.hour.branch.ko}<span className="text-2xl">{result.hour.branch.cn}</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{result.hour.branch.element} · {result.hour.branch.animal}</div>
                </td>
                <td className="border-2 border-gray-200 dark:border-gray-600 px-6 py-5 text-center bg-indigo-50 dark:bg-indigo-900/20">
                  <div className="text-4xl font-bold mb-2" style={{ color: ELEMENTS[result.day.branch.element as keyof typeof ELEMENTS].color }}>
                    {result.day.branch.ko}<span className="text-2xl">{result.day.branch.cn}</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{result.day.branch.element} · {result.day.branch.animal}</div>
                </td>
                <td className="border-2 border-gray-200 dark:border-gray-600 px-6 py-5 text-center">
                  <div className="text-4xl font-bold mb-2" style={{ color: ELEMENTS[result.month.branch.element as keyof typeof ELEMENTS].color }}>
                    {result.month.branch.ko}<span className="text-2xl">{result.month.branch.cn}</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{result.month.branch.element} · {result.month.branch.animal}</div>
                </td>
                <td className="border-2 border-gray-200 dark:border-gray-600 px-6 py-5 text-center">
                  <div className="text-4xl font-bold mb-2" style={{ color: ELEMENTS[result.year.branch.element as keyof typeof ELEMENTS].color }}>
                    {result.year.branch.ko}<span className="text-2xl">{result.year.branch.cn}</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{result.year.branch.element} · {result.year.branch.animal}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 오행 분석 */}
      <div className="pdf-avoid-break bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 card-hover">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-blue-500 rounded-full"></div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{t('sections.elements.title')}</h3>
          <Tooltip titleKey="elements" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <ElementsChart elements={result.elements} />
          </div>

          <div className="space-y-6">
            {Object.entries(result.elements).map(([element, value]) => (
              <div key={element} className="space-y-2 animate-slide-in">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold" style={{ color: ELEMENTS[element as keyof typeof ELEMENTS].color }}>
                      {ELEMENTS[element as keyof typeof ELEMENTS].cn}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {t(`sections.elements.${element}`)}
                    </span>
                  </div>
                  <span className="text-xl font-bold text-gray-700 dark:text-gray-300">{value.toFixed(1)}%</span>
                </div>
                <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${value}%`,
                      background: `linear-gradient(90deg, ${ELEMENTS[element as keyof typeof ELEMENTS].color}, ${ELEMENTS[element as keyof typeof ELEMENTS].color}dd)`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* 신강/신약 판단 */}
        <div className="pdf-avoid-break bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 card-hover">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{t('sections.strength.title')}</h3>
            <Tooltip titleKey="strength" />
          </div>

          <div className="flex flex-col items-center justify-center h-full space-y-6">
            <div className={`relative inline-flex items-center justify-center w-40 h-40 rounded-full text-3xl font-bold shadow-2xl ${
              result.strength === 'strong'
                ? 'bg-gradient-to-br from-red-400 to-orange-500 text-white'
                : result.strength === 'weak'
                ? 'bg-gradient-to-br from-blue-400 to-cyan-500 text-white'
                : 'bg-gradient-to-br from-gray-400 to-gray-600 text-white'
            }`}>
              <div className="absolute inset-0 rounded-full bg-white opacity-20 animate-pulse"></div>
              <span className="relative z-10">
                {t(`sections.strength.${result.strength}`)}
              </span>
            </div>

            <div className="text-center space-y-3">
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                {t(`sections.strength.${result.strength}Desc`)}
              </p>
              <div className={`inline-block px-6 py-3 rounded-xl ${
                result.strength === 'strong'
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                  : result.strength === 'weak'
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}>
                {t(`sections.strength.${result.strength}Yongsin`)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 12운성 */}
      <div className="pdf-avoid-break bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 card-hover">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{t('sections.twelveCycles.title')}</h3>
          <Tooltip titleKey="twelveCycles" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
            <p className="text-xs text-gray-500 mb-1">{t('sections.pillars.hour')}</p>
            <p className="font-bold text-purple-700 dark:text-purple-300">{result.twelveCycles.hour}</p>
          </div>
          <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
            <p className="text-xs text-gray-500 mb-1">{t('sections.pillars.day')} {t('sections.pillars.self')}</p>
            <p className="font-bold text-indigo-700 dark:text-indigo-300">{result.twelveCycles.day}</p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
            <p className="text-xs text-gray-500 mb-1">{t('sections.pillars.month')}</p>
            <p className="font-bold text-purple-700 dark:text-purple-300">{result.twelveCycles.month}</p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
            <p className="text-xs text-gray-500 mb-1">{t('sections.pillars.year')}</p>
            <p className="font-bold text-purple-700 dark:text-purple-300">{result.twelveCycles.year}</p>
          </div>
        </div>
      </div>

      {/* 대운 */}
      <div className="pdf-avoid-break bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 card-hover">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{t('sections.daeun.title')}</h3>
          <Tooltip titleKey="daeun" />
        </div>

        <div className="overflow-x-auto">
          <div className="flex gap-2 min-w-max pb-2">
            {result.daeun.slice(0, 6).map((daeun, idx) => (
              <div key={idx} className="flex-shrink-0 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl min-w-[100px] text-center">
                <p className="text-xs text-gray-500 mb-2">{t('sections.daeun.age', { age: daeun.age })}</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {daeun.stem.ko}{daeun.stem.cn}
                </p>
                <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                  {daeun.branch.ko}{daeun.branch.cn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 신살 & 합충 */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* 신살 */}
        <div className="pdf-avoid-break bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 card-hover">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-yellow-500 to-orange-500 rounded-full"></div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{t('sections.shinsals.title')}</h3>
            <Tooltip titleKey="shinsals" />
          </div>

          {result.shinsals.length > 0 ? (
            <div className="space-y-3">
              {result.shinsals.map((shinsal, idx) => (
                <div key={idx} className={`p-4 rounded-xl ${
                  shinsal.type === 'good'
                    ? 'bg-green-50 dark:bg-green-900/20'
                    : shinsal.type === 'bad'
                    ? 'bg-red-50 dark:bg-red-900/20'
                    : 'bg-gray-50 dark:bg-gray-700'
                }`}>
                  <p className={`font-bold ${
                    shinsal.type === 'good'
                      ? 'text-green-700 dark:text-green-300'
                      : shinsal.type === 'bad'
                      ? 'text-red-700 dark:text-red-300'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}>{shinsal.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{shinsal.desc}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">{t('sections.shinsals.none')}</p>
          )}
        </div>

        {/* 합충 */}
        <div className="pdf-avoid-break bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 card-hover">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-pink-500 to-rose-500 rounded-full"></div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{t('sections.hapchung.title')}</h3>
            <Tooltip titleKey="hapchung" />
          </div>

          {result.hapchung.length > 0 ? (
            <div className="space-y-3">
              {result.hapchung.map((hap, idx) => (
                <div key={idx} className={`p-4 rounded-xl ${
                  hap.type === '지지충'
                    ? 'bg-red-50 dark:bg-red-900/20'
                    : 'bg-blue-50 dark:bg-blue-900/20'
                }`}>
                  <p className={`font-bold ${
                    hap.type === '지지충'
                      ? 'text-red-700 dark:text-red-300'
                      : 'text-blue-700 dark:text-blue-300'
                  }`}>{hap.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{hap.desc}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">{t('sections.hapchung.none')}</p>
          )}
        </div>
      </div>

      {/* 하단 안내 */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400 space-y-2 pt-8">
        <p>{t('footer.note1')}</p>
        <p>{t('footer.note2')}</p>
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-6">
          <p className="font-semibold text-indigo-600 dark:text-indigo-400">{t('../common.version')}</p>
        </div>
      </div>
    </div>
  );
}
