import { useTranslations } from 'next-intl';
import { SajuResult } from '@/lib/saju-calculator';
import { ELEMENTS } from '@/lib/saju-constants';
import SectionCard from '../ui/SectionCard';
import SectionHeader from '../ui/SectionHeader';
import Tooltip from '../ui/Tooltip';
import ElementsChart from '../ElementsChart';

interface ElementsSectionProps {
  result: SajuResult;
}

export default function ElementsSection({ result }: ElementsSectionProps) {
  const t = useTranslations('result');

  return (
    <SectionCard className="pdf-avoid-break">
      <SectionHeader
        title={t('sections.elements.title')}
        gradient="bg-gradient-to-b from-green-500 to-blue-500"
        tooltip={<Tooltip content={t('tooltips.elements')} />}
      />

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
    </SectionCard>
  );
}
