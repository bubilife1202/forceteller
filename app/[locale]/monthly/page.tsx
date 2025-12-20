'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';
import Loading from '@/components/ui/Loading';
import MonthlyFortuneForm, { MonthlyFortuneFormData } from '@/components/MonthlyFortuneForm';

const MonthlyFortuneResult = dynamic(() => import('@/components/MonthlyFortuneResult'), {
  loading: () => <Loading />,
});

export default function MonthlyPage() {
  const [monthlyData, setMonthlyData] = useState<MonthlyFortuneFormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: MonthlyFortuneFormData) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setMonthlyData(formData);
    setIsLoading(false);

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setMonthlyData(null);
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
        {!monthlyData ? (
          <MonthlyFortuneForm onSubmit={handleSubmit} onBack={handleBack} />
        ) : (
          <MonthlyFortuneResult
            formData={monthlyData}
            onReset={handleReset}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
}
