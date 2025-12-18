'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import AdSense from '@/components/AdSense';

export default function GuidePage() {
  const t = useTranslations('guide');
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 py-12 px-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            {t('title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {t('subtitle')}
          </p>
          <Link
            href={`/${locale}`}
            className="inline-block px-6 py-2 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition"
          >
            {t('../common.backToHome')}
          </Link>
        </div>

        {/* 용어 설명 섹션들 */}
        <div className="space-y-6">
          {/* 사주팔자 */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 card-hover">
            <h2 className="text-3xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">
              {t('sections.pillars.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              {t('sections.pillars.description')}
            </p>
            <div className="space-y-3">
              <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
                <h3 className="font-bold text-indigo-700 dark:text-indigo-300 mb-2">{t('sections.pillars.stem.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('sections.pillars.stem.description')}
                </p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <h3 className="font-bold text-purple-700 dark:text-purple-300 mb-2">{t('sections.pillars.branch.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('sections.pillars.branch.description')}
                </p>
              </div>
              <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-xl">
                <h3 className="font-bold text-pink-700 dark:text-pink-300 mb-2">{t('sections.pillars.tenGods.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('sections.pillars.tenGods.description')}
                </p>
              </div>
            </div>
          </div>

          {/* 오행분석 */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 card-hover">
            <h2 className="text-3xl font-bold mb-4 text-green-600 dark:text-green-400">
              {t('sections.elements.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              {t('sections.elements.description')}
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <h3 className="font-bold text-green-700 dark:text-green-300 mb-2">{t('sections.elements.wood.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('sections.elements.wood.description')}</p>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                <h3 className="font-bold text-red-700 dark:text-red-300 mb-2">{t('sections.elements.fire.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('sections.elements.fire.description')}</p>
              </div>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                <h3 className="font-bold text-yellow-700 dark:text-yellow-300 mb-2">{t('sections.elements.earth.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('sections.elements.earth.description')}</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <h3 className="font-bold text-gray-700 dark:text-gray-300 mb-2">{t('sections.elements.metal.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('sections.elements.metal.description')}</p>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2">{t('sections.elements.water.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('sections.elements.water.description')}</p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-xl">
              <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">{t('sections.elements.mutual.title')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('sections.elements.mutual.description')}
              </p>
            </div>
          </div>

          {/* 신강신약 */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 card-hover">
            <h2 className="text-3xl font-bold mb-4 text-orange-600 dark:text-orange-400">
              {t('sections.strength.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              {t('sections.strength.description')}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-5 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl border-2 border-red-200 dark:border-red-800">
                <h3 className="font-bold text-red-700 dark:text-red-300 mb-3 text-xl">{t('sections.strength.strong.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {t('sections.strength.strong.description')}
                </p>
                <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                  {t('sections.strength.strong.yongsin')}
                </p>
              </div>
              <div className="p-5 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-800">
                <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-3 text-xl">{t('sections.strength.weak.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {t('sections.strength.weak.description')}
                </p>
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  {t('sections.strength.weak.yongsin')}
                </p>
              </div>
            </div>
          </div>

          {/* 12운성 */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 card-hover">
            <h2 className="text-3xl font-bold mb-4 text-purple-600 dark:text-purple-400">
              {t('sections.twelveCycles.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              {t('sections.twelveCycles.description')}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                <p className="font-bold text-green-700 dark:text-green-300">{t('sections.twelveCycles.jangsaeng')}</p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                <p className="font-bold text-blue-700 dark:text-blue-300">{t('sections.twelveCycles.mokyok')}</p>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                <p className="font-bold text-purple-700 dark:text-purple-300">{t('sections.twelveCycles.gwandae')}</p>
              </div>
              <div className="p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg text-center">
                <p className="font-bold text-pink-700 dark:text-pink-300">{t('sections.twelveCycles.geonrok')}</p>
              </div>
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-center">
                <p className="font-bold text-red-700 dark:text-red-300">{t('sections.twelveCycles.jewang')}</p>
              </div>
              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-center">
                <p className="font-bold text-orange-700 dark:text-orange-300">{t('sections.twelveCycles.soe')}</p>
              </div>
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-center">
                <p className="font-bold text-yellow-700 dark:text-yellow-300">{t('sections.twelveCycles.byeong')}</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
                <p className="font-bold text-gray-700 dark:text-gray-300">{t('sections.twelveCycles.sa')}</p>
              </div>
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-center">
                <p className="font-bold text-indigo-700 dark:text-indigo-300">{t('sections.twelveCycles.myo')}</p>
              </div>
              <div className="p-3 bg-violet-50 dark:bg-violet-900/20 rounded-lg text-center">
                <p className="font-bold text-violet-700 dark:text-violet-300">{t('sections.twelveCycles.jeol')}</p>
              </div>
              <div className="p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg text-center">
                <p className="font-bold text-cyan-700 dark:text-cyan-300">{t('sections.twelveCycles.tae')}</p>
              </div>
              <div className="p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg text-center">
                <p className="font-bold text-teal-700 dark:text-teal-300">{t('sections.twelveCycles.yang')}</p>
              </div>
            </div>
          </div>

          {/* 대운 */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 card-hover">
            <h2 className="text-3xl font-bold mb-4 text-blue-600 dark:text-blue-400">
              {t('sections.daeun.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              {t('sections.daeun.description')}
            </p>
            <div className="space-y-3">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2">{t('sections.daeun.forward.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('sections.daeun.forward.description')}
                </p>
              </div>
              <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-xl">
                <h3 className="font-bold text-cyan-700 dark:text-cyan-300 mb-2">{t('sections.daeun.backward.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('sections.daeun.backward.description')}
                </p>
              </div>
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl">
                <h3 className="font-bold text-purple-700 dark:text-purple-300 mb-2">{t('sections.daeun.importance.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('sections.daeun.importance.description')}
                </p>
              </div>
            </div>
          </div>

          {/* 신살 */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 card-hover">
            <h2 className="text-3xl font-bold mb-4 text-yellow-600 dark:text-yellow-400">
              {t('sections.shinsals.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              {t('sections.shinsals.description')}
            </p>
            <div className="space-y-3">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border-l-4 border-green-500">
                <h3 className="font-bold text-green-700 dark:text-green-300 mb-2">{t('sections.shinsals.cheonul.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('sections.shinsals.cheonul.description')}
                </p>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-500">
                <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2">{t('sections.shinsals.yeokma.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('sections.shinsals.yeokma.description')}
                </p>
              </div>
              <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-xl border-l-4 border-pink-500">
                <h3 className="font-bold text-pink-700 dark:text-pink-300 mb-2">{t('sections.shinsals.dohwa.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('sections.shinsals.dohwa.description')}
                </p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border-l-4 border-purple-500">
                <h3 className="font-bold text-purple-700 dark:text-purple-300 mb-2">{t('sections.shinsals.munchang.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('sections.shinsals.munchang.description')}
                </p>
              </div>
            </div>
          </div>

          {/* 합충 */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 card-hover">
            <h2 className="text-3xl font-bold mb-4 text-pink-600 dark:text-pink-400">
              {t('sections.hapchung.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              {t('sections.hapchung.description')}
            </p>
            <div className="space-y-3">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2">{t('sections.hapchung.stemCombination.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {t('sections.hapchung.stemCombination.description')}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {t('sections.hapchung.stemCombination.example')}
                </p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <h3 className="font-bold text-green-700 dark:text-green-300 mb-2">{t('sections.hapchung.branchCombination.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {t('sections.hapchung.branchCombination.description')}
                </p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <h3 className="font-bold text-purple-700 dark:text-purple-300 mb-2">{t('sections.hapchung.tripleCombination.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {t('sections.hapchung.tripleCombination.description')}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {t('sections.hapchung.tripleCombination.example')}
                </p>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                <h3 className="font-bold text-red-700 dark:text-red-300 mb-2">{t('sections.hapchung.branchClash.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {t('sections.hapchung.branchClash.description')}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {t('sections.hapchung.branchClash.note')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 광고 */}
        <div className="my-8">
          <AdSense
            adSlot="9952740191"
            className="text-center"
          />
        </div>

        {/* 하단 안내 */}
        <div className="text-center mt-12 p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {t('footer.note')}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
            {t('footer.consult')}
          </p>
          <Link
            href={`/${locale}`}
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition shadow-lg"
          >
            {t('../common.goToHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}
