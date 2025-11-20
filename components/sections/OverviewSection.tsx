import { useTranslations } from 'next-intl';
import { SajuResult } from '@/lib/saju-calculator';
import SectionCard from '../ui/SectionCard';
import SectionHeader from '../ui/SectionHeader';
import Tooltip from '../ui/Tooltip';

interface OverviewSectionProps {
  result: SajuResult;
}

export default function OverviewSection({ result }: OverviewSectionProps) {
  const t = useTranslations('result');

  return (
    <SectionCard className="pdf-avoid-break bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 border-2 border-amber-200 dark:border-amber-900">
      <SectionHeader
        title={t('sections.overview.title')}
        gradient="bg-gradient-to-b from-amber-500 to-orange-500"
        tooltip={<Tooltip content={t('tooltips.overview')} />}
      />

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-lg">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {t('sections.overview.dayCharacter')}
          </div>
          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
            {result.dayPersonality.image}
          </div>
          <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {result.dayPersonality.personality.split('. ')[0]}.
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-lg">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {t('sections.overview.strengthType')}
          </div>
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
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {t('sections.overview.yongsin')}
          </div>
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
            <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">
              {t('sections.overview.keyPoint')}
            </h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
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
    </SectionCard>
  );
}
