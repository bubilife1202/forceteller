'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';
import Loading from '@/components/ui/Loading';
import RekindlingForm, { RekindlingFormData } from '@/components/RekindlingForm';

const RekindlingResult = dynamic(() => import('@/components/RekindlingResult'), {
  loading: () => <Loading />,
});

export default function RekindlingPage() {
  const [rekindlingData, setRekindlingData] = useState<RekindlingFormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: RekindlingFormData) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    setRekindlingData(formData);
    setIsLoading(false);

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setRekindlingData(null);
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
        {!rekindlingData ? (
          <RekindlingForm onSubmit={handleSubmit} onBack={handleBack} />
        ) : (
          <RekindlingResult
            formData={rekindlingData}
            onReset={handleReset}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
}
