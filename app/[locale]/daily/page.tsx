'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';
import Loading from '@/components/ui/Loading';
import DailyFortuneForm, { DailyFortuneFormData } from '@/components/DailyFortuneForm';

const DailyFortuneResult = dynamic(() => import('@/components/DailyFortuneResult'), {
  loading: () => <Loading />,
});

export default function DailyPage() {
  const [dailyData, setDailyData] = useState<DailyFortuneFormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: DailyFortuneFormData) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setDailyData(formData);
    setIsLoading(false);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setDailyData(null);
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
        {!dailyData ? (
          <DailyFortuneForm onSubmit={handleSubmit} onBack={handleBack} />
        ) : (
          <DailyFortuneResult
            formData={dailyData}
            onReset={handleReset}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
}
