'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';
import Loading from '@/components/ui/Loading';
import TomorrowFortuneForm, { TomorrowFortuneFormData } from '@/components/TomorrowFortuneForm';

const TomorrowFortuneResult = dynamic(() => import('@/components/TomorrowFortuneResult'), {
  loading: () => <Loading />,
});

export default function TomorrowPage() {
  const [tomorrowData, setTomorrowData] = useState<TomorrowFortuneFormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: TomorrowFortuneFormData) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setTomorrowData(formData);
    setIsLoading(false);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setTomorrowData(null);
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
        {!tomorrowData ? (
          <TomorrowFortuneForm onSubmit={handleSubmit} onBack={handleBack} />
        ) : (
          <TomorrowFortuneResult
            formData={tomorrowData}
            onReset={handleReset}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
}
