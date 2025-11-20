import { useTranslations } from 'next-intl';
import { SajuResult } from '@/lib/saju-calculator';
import { ELEMENTS } from '@/lib/saju-constants';
import SectionCard from '../ui/SectionCard';
import SectionHeader from '../ui/SectionHeader';
import Tooltip from '../ui/Tooltip';

interface PillarsSectionProps {
  result: SajuResult;
}

export default function PillarsSection({ result }: PillarsSectionProps) {
  const t = useTranslations('result');

  return (
    <SectionCard className="pdf-page-break-before pdf-avoid-break md:p-10">
      <SectionHeader
        title={t('sections.pillars.title')}
        gradient="bg-gradient-to-b from-indigo-600 to-purple-600"
        tooltip={<Tooltip content={t('tooltips.pillars')} />}
      />

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-600">
              <th className="border-2 border-gray-200 dark:border-gray-600 px-6 py-4 text-left font-bold text-gray-700 dark:text-gray-200">
                {t('sections.pillars.division')}
              </th>
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
    </SectionCard>
  );
}
