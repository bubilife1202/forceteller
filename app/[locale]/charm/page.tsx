'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';
import Loading from '@/components/ui/Loading';
import SajuFormFunnel, { FormData } from '@/components/SajuFormFunnel';
import { calculateSaju, SajuResult as SajuResultType } from '@/lib/saju-calculator';

const CharmResult = dynamic(() => import('@/components/CharmResult'), {
  loading: () => <Loading />,
});

export default function CharmPage() {
  const [result, setResult] = useState<SajuResultType | null>(null);
  const [userData, setUserData] = useState<{
    name: string;
    gender: 'male' | 'female';
    birthDate: { year: number; month: number; day: number };
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2500));

    const sajuResult = calculateSaju({
      year: formData.year,
      month: formData.month,
      day: formData.day,
      hour: formData.timeUnknown ? 12 : formData.hour,
    }, formData.gender);

    setResult(sajuResult);
    setUserData({
      name: formData.name,
      gender: formData.gender,
      birthDate: {
        year: formData.year,
        month: formData.month,
        day: formData.day,
      },
    });
    setIsLoading(false);

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setResult(null);
    setUserData(null);
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
        {!result ? (
          <SajuFormFunnel onSubmit={handleSubmit} onBack={handleBack} />
        ) : userData && (
          <CharmResult
            result={result}
            name={userData.name}
            gender={userData.gender}
            birthDate={userData.birthDate}
            onReset={handleReset}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
}
