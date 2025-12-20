'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';
import Loading from '@/components/ui/Loading';
import DreamForm, { DreamFormData } from '@/components/DreamForm';

const DreamResult = dynamic(() => import('@/components/DreamResult'), {
  loading: () => <Loading />,
});

export default function DreamPage() {
  const [dreamData, setDreamData] = useState<DreamFormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: DreamFormData) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setDreamData(formData);
    setIsLoading(false);

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setDreamData(null);
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
        {!dreamData ? (
          <DreamForm onSubmit={handleSubmit} onBack={handleBack} />
        ) : (
          <DreamResult
            formData={dreamData}
            onReset={handleReset}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
}
