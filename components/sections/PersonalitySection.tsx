import { useTranslations } from 'next-intl';
import { SajuResult } from '@/lib/saju-calculator';
import { ELEMENTS } from '@/lib/saju-constants';
import SectionCard from '../ui/SectionCard';
import SectionHeader from '../ui/SectionHeader';
import InfoBox from '../ui/InfoBox';
import Tooltip from '../ui/Tooltip';

interface PersonalitySectionProps {
  result: SajuResult;
}

export default function PersonalitySection({ result }: PersonalitySectionProps) {
  const t = useTranslations('result');

  return (
    <SectionCard className="pdf-avoid-break">
      <SectionHeader
        title={t('sections.personality.title')}
        gradient="bg-gradient-to-b from-pink-500 to-rose-500"
        tooltip={<Tooltip content={t('tooltips.personality')} />}
      />

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <InfoBox variant="pink" className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20">
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
          </InfoBox>

          <InfoBox variant="green">
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <span>{t('sections.personality.strengths')}</span>
            </h4>
            <p className="text-gray-700 dark:text-gray-300">{result.dayPersonality.strength}</p>
          </InfoBox>

          <InfoBox variant="orange">
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <span>{t('sections.personality.weaknesses')}</span>
            </h4>
            <p className="text-gray-700 dark:text-gray-300">{result.dayPersonality.weakness}</p>
          </InfoBox>
        </div>

        <div className="space-y-4">
          <InfoBox variant="blue">
            <h4 className="font-bold mb-3 flex items-center gap-2">
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
          </InfoBox>

          <InfoBox variant="gradient">
            <h4 className="font-bold mb-3 flex items-center gap-2">
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
          </InfoBox>
        </div>
      </div>
    </SectionCard>
  );
}
