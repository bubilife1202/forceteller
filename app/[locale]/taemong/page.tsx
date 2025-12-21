'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';
import Loading from '@/components/ui/Loading';
import TaemongForm, { TaemongFormData } from '@/components/TaemongForm';

const TaemongResult = dynamic(() => import('@/components/TaemongResult'), {
  loading: () => <Loading />,
});

export default function TaemongPage() {
  const [taemongData, setTaemongData] = useState<TaemongFormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: TaemongFormData) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    setTaemongData(formData);
    setIsLoading(false);

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setTaemongData(null);
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
        {!taemongData ? (
          <TaemongForm onSubmit={handleSubmit} onBack={handleBack} />
        ) : (
          <TaemongResult
            formData={taemongData}
            onReset={handleReset}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
}
