'use client';

import { SajuResult as SajuResultType } from '@/lib/saju-calculator';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import OverviewSection from './sections/OverviewSection';
import PersonalitySection from './sections/PersonalitySection';
import PillarsSection from './sections/PillarsSection';
import ElementsSection from './sections/ElementsSection';
import SectionCard from './ui/SectionCard';
import SectionHeader from './ui/SectionHeader';
import InfoBox from './ui/InfoBox';
import Tooltip from './ui/Tooltip';

interface SajuResultProps {
  result: SajuResultType;
  name: string;
  gender: 'male' | 'female';
  onReset: () => void;
}

export default function SajuResultSimplified({ result, name, gender, onReset }: SajuResultProps) {
  const t = useTranslations('result');
  const tCommon = useTranslations('common');
  const [isSaving, setIsSaving] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  // 이미지로 공유하기 (Web Share API)
  const handleShare = async () => {
    setIsSharing(true);
    try {
      const htmlToImage = await import('html-to-image');
      const element = document.getElementById('saju-result');
      if (!element) {
        alert(t('alerts.shareNotFound'));
        setIsSharing(false);
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
        setIsSharing(false);
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
        // 공유 성공 (사용자가 공유 완료한 경우)
      } else {
        // Web Share API를 지원하지 않으면 다운로드
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `${name}_사주풀이_${today}.png`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        alert('이미지가 다운로드되었습니다. 다운로드 폴더를 확인해주세요.');
      }
      setIsSharing(false);
    } catch (error) {
      console.error('공유 오류:', error);
      const element = document.getElementById('saju-result');
      if (element) {
        const buttons = element.querySelectorAll('button');
        buttons.forEach(btn => (btn as HTMLElement).style.display = '');
      }
      setIsSharing(false);
      // AbortError는 사용자가 공유를 취소한 경우이므로 에러 메시지 표시 안 함
      if (error instanceof Error && error.name === 'AbortError') return;
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
                disabled={isSaving || isSharing}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl font-medium transition disabled:opacity-50"
                title={t('buttons.downloadTitle')}
              >
                📸 {isSaving ? t('buttons.imageSaving') : t('buttons.image')}
              </button>
              <button
                onClick={handleShare}
                disabled={isSaving || isSharing}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl font-medium transition disabled:opacity-50"
                title={t('buttons.shareTitle')}
              >
                📤 {isSharing ? '공유 준비중...' : t('buttons.share')}
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

      <OverviewSection result={result} />
      <PersonalitySection result={result} />
      <PillarsSection result={result} />
      <ElementsSection result={result} />

      {/* 신강/신약 & 12운성 */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* 신강/신약 판단 */}
        <SectionCard className="pdf-avoid-break">
          <SectionHeader
            title={t('sections.strength.title')}
            gradient="bg-gradient-to-b from-orange-500 to-red-500"
            tooltip={<Tooltip content={t('tooltips.strength')} />}
          />
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            <div className={`relative inline-flex items-center justify-center w-40 h-40 rounded-full text-3xl font-bold shadow-2xl ${
              result.strength === 'strong' ? 'bg-gradient-to-br from-red-400 to-orange-500 text-white' :
              result.strength === 'weak' ? 'bg-gradient-to-br from-blue-400 to-cyan-500 text-white' :
              'bg-gradient-to-br from-gray-400 to-gray-600 text-white'
            }`}>
              <div className="absolute inset-0 rounded-full bg-white opacity-20 animate-pulse"></div>
              <span className="relative z-10">{t(`sections.strength.${result.strength}`)}</span>
            </div>
            <div className="text-center space-y-3">
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                {t(`sections.strength.${result.strength}Desc`)}
              </p>
              <div className={`inline-block px-6 py-3 rounded-xl ${
                result.strength === 'strong' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' :
                result.strength === 'weak' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}>
                {t(`sections.strength.${result.strength}Yongsin`)}
              </div>
            </div>
          </div>
        </SectionCard>

        {/* 12운성 */}
        <SectionCard className="pdf-avoid-break">
          <SectionHeader
            title={t('sections.twelveCycles.title')}
            gradient="bg-gradient-to-b from-purple-500 to-pink-500"
            tooltip={<Tooltip content={t('tooltips.twelveCycles')} />}
          />
          <div className="grid grid-cols-2 gap-4">
            <InfoBox variant="purple">
              <p className="text-xs text-gray-500 mb-1">{t('sections.pillars.hour')}</p>
              <p className="font-bold">{result.twelveCycles.hour}</p>
            </InfoBox>
            <InfoBox variant="blue" className="bg-indigo-50 dark:bg-indigo-900/20">
              <p className="text-xs text-gray-500 mb-1">{t('sections.pillars.day')} {t('sections.pillars.self')}</p>
              <p className="font-bold text-indigo-700 dark:text-indigo-300">{result.twelveCycles.day}</p>
            </InfoBox>
            <InfoBox variant="purple">
              <p className="text-xs text-gray-500 mb-1">{t('sections.pillars.month')}</p>
              <p className="font-bold">{result.twelveCycles.month}</p>
            </InfoBox>
            <InfoBox variant="purple">
              <p className="text-xs text-gray-500 mb-1">{t('sections.pillars.year')}</p>
              <p className="font-bold">{result.twelveCycles.year}</p>
            </InfoBox>
          </div>
        </SectionCard>
      </div>

      {/* 대운 */}
      <SectionCard className="pdf-avoid-break">
        <SectionHeader
          title={t('sections.daeun.title')}
          gradient="bg-gradient-to-b from-blue-500 to-cyan-500"
          tooltip={<Tooltip content={t('tooltips.daeun')} />}
        />
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
      </SectionCard>

      {/* 신살 & 합충 */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* 신살 */}
        <SectionCard className="pdf-avoid-break">
          <SectionHeader
            title={t('sections.shinsals.title')}
            gradient="bg-gradient-to-b from-yellow-500 to-orange-500"
            tooltip={<Tooltip content={t('tooltips.shinsals')} />}
          />
          {result.shinsals.length > 0 ? (
            <div className="space-y-3">
              {result.shinsals.map((shinsal, idx) => (
                <div key={idx} className={`p-4 rounded-xl ${
                  shinsal.type === 'good' ? 'bg-green-50 dark:bg-green-900/20' :
                  shinsal.type === 'bad' ? 'bg-red-50 dark:bg-red-900/20' :
                  'bg-gray-50 dark:bg-gray-700'
                }`}>
                  <p className={`font-bold ${
                    shinsal.type === 'good' ? 'text-green-700 dark:text-green-300' :
                    shinsal.type === 'bad' ? 'text-red-700 dark:text-red-300' :
                    'text-gray-700 dark:text-gray-300'
                  }`}>{shinsal.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{shinsal.desc}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">{t('sections.shinsals.none')}</p>
          )}
        </SectionCard>

        {/* 합충 */}
        <SectionCard className="pdf-avoid-break">
          <SectionHeader
            title={t('sections.hapchung.title')}
            gradient="bg-gradient-to-b from-pink-500 to-rose-500"
            tooltip={<Tooltip content={t('tooltips.hapchung')} />}
          />
          {result.hapchung.length > 0 ? (
            <div className="space-y-3">
              {result.hapchung.map((hap, idx) => (
                <div key={idx} className={`p-4 rounded-xl ${
                  hap.type === '지지충' ? 'bg-red-50 dark:bg-red-900/20' : 'bg-blue-50 dark:bg-blue-900/20'
                }`}>
                  <p className={`font-bold ${
                    hap.type === '지지충' ? 'text-red-700 dark:text-red-300' : 'text-blue-700 dark:text-blue-300'
                  }`}>{hap.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{hap.desc}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">{t('sections.hapchung.none')}</p>
          )}
        </SectionCard>
      </div>

      {/* 하단 안내 */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400 space-y-2 pt-8">
        <p>{t('footer.note1')}</p>
        <p>{t('footer.note2')}</p>
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-6">
          <p className="font-semibold text-indigo-600 dark:text-indigo-400">{tCommon('version')}</p>
        </div>
      </div>
    </div>
  );
}
