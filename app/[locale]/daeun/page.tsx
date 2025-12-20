'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';
import Loading from '@/components/ui/Loading';
import DaeunForm, { DaeunFormData } from '@/components/DaeunForm';

const DaeunResult = dynamic(() => import('@/components/DaeunResult'), {
  loading: () => <Loading />,
});

export default function DaeunPage() {
  const [daeunData, setDaeunData] = useState<DaeunFormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: DaeunFormData) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    setDaeunData(formData);
    setIsLoading(false);

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setDaeunData(null);
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
        {!daeunData ? (
          <DaeunForm onSubmit={handleSubmit} onBack={handleBack} />
        ) : (
          <DaeunResult
            formData={daeunData}
            onReset={handleReset}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
}
