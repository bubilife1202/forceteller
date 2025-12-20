'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export default function ChatGPTPromptPage() {
  const t = useTranslations('chatgpt');
  const locale = useLocale();

  const promptTemplate = t('promptTemplate');

  const handleCopy = () => {
    navigator.clipboard.writeText(promptTemplate);
    alert(t('copyAlert'));
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900"></div>

      <div className="relative z-10 py-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              {t('title')}
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
              {t('subtitle')}
            </p>
            <Link
              href={`/${locale}`}
              className="inline-block text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              {t('backToHome')}
            </Link>
          </div>

          {/* 사용 방법 */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              {t('howToUse.title')}
            </h2>
            <ol className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </span>
                <span dangerouslySetInnerHTML={{ __html: t('howToUse.step1') }} />
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </span>
                <span dangerouslySetInnerHTML={{ __html: t('howToUse.step2') }} />
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </span>
                <span dangerouslySetInnerHTML={{ __html: t('howToUse.step3') }} />
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  4
                </span>
                <span>{t('howToUse.step4')}</span>
              </li>
            </ol>
          </div>

          {/* 프롬프트 템플릿 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {t('template.title')}
              </h2>
              <button
                onClick={handleCopy}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition"
              >
                {t('template.copyButton')}
              </button>
            </div>

            <div className="bg-gray-900 text-gray-100 rounded-xl p-6 overflow-x-auto">
              <pre className="text-sm whitespace-pre-wrap font-mono leading-relaxed">
                {promptTemplate}
              </pre>
            </div>

            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <span dangerouslySetInnerHTML={{ __html: t('template.tip') }} />
              </p>
            </div>
          </div>

          {/* 분석 내용 미리보기 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              {t('analysis.title')}
            </h2>

            <div className="space-y-4">
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <h3 className="font-bold text-purple-700 dark:text-purple-300 mb-2">
                  {t('analysis.forecast.title')}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {t('analysis.forecast.description')}
                </p>
              </div>

              <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
                <h3 className="font-bold text-indigo-700 dark:text-indigo-300 mb-2">
                  {t('analysis.personality.title')}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {t('analysis.personality.description')}
                </p>
              </div>

              <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-xl">
                <h3 className="font-bold text-pink-700 dark:text-pink-300 mb-2">
                  {t('analysis.lifePatterns.title')}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {t('analysis.lifePatterns.description')}
                </p>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2">
                  {t('analysis.fourAreas.title')}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {t('analysis.fourAreas.description')}
                </p>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <h3 className="font-bold text-green-700 dark:text-green-300 mb-2">
                  {t('analysis.actionPoints.title')}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {t('analysis.actionPoints.description')}
                </p>
              </div>
            </div>
          </div>

          {/* 하단 정보 */}
          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>
              <Link href={`/${locale}`} className="text-indigo-600 dark:text-indigo-400 hover:underline">
                {t('footer.home')}
              </Link>
              {' · '}
              <Link href={`/${locale}/guide`} className="text-indigo-600 dark:text-indigo-400 hover:underline">
                {t('footer.guide')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
