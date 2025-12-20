'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';
import Loading from '@/components/ui/Loading';
import CareerForm, { CareerFormData } from '@/components/CareerForm';

const CareerResult = dynamic(() => import('@/components/CareerResult'), {
  loading: () => <Loading />,
});

export default function CareerPage() {
  const [careerData, setCareerData] = useState<CareerFormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: CareerFormData) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    setCareerData(formData);
    setIsLoading(false);

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setCareerData(null);
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
        {!careerData ? (
          <CareerForm onSubmit={handleSubmit} onBack={handleBack} />
        ) : (
          <CareerResult
            formData={careerData}
            onReset={handleReset}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
}
