'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';
import Loading from '@/components/ui/Loading';
import CompatibilityForm, { CompatibilityFormData } from '@/components/CompatibilityForm';
import { calculateSaju, SajuResult as SajuResultType } from '@/lib/saju-calculator';

const CompatibilityResult = dynamic(() => import('@/components/CompatibilityResult'), {
  loading: () => <Loading />,
});

export default function CompatibilityPage() {
  const [compatibilityData, setCompatibilityData] = useState<{
    result1: SajuResultType;
    result2: SajuResultType;
    formData: CompatibilityFormData;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: CompatibilityFormData) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 3000));

    const result1 = calculateSaju({
      year: formData.person1.year,
      month: formData.person1.month,
      day: formData.person1.day,
      hour: formData.person1.timeUnknown ? 12 : formData.person1.hour,
    }, formData.person1.gender);

    const result2 = calculateSaju({
      year: formData.person2.year,
      month: formData.person2.month,
      day: formData.person2.day,
      hour: formData.person2.timeUnknown ? 12 : formData.person2.hour,
    }, formData.person2.gender);

    setCompatibilityData({ result1, result2, formData });
    setIsLoading(false);

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setCompatibilityData(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="starry-bg" />

      <AnimatePresence>
        {isLoading && <Loading />}
      </AnimatePresence>

      <div className="relative z-10">
        {!compatibilityData ? (
          <CompatibilityForm onSubmit={handleSubmit} onBack={handleBack} />
        ) : (
          <CompatibilityResult
            result1={compatibilityData.result1}
            result2={compatibilityData.result2}
            formData={compatibilityData.formData}
            onReset={handleReset}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
}
