'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Loading from '@/components/ui/Loading';
import WealthFortuneForm, { WealthFortuneFormData } from '@/components/WealthFortuneForm';

const WealthFortuneResult = dynamic(() => import('@/components/WealthFortuneResult'), {
  loading: () => <Loading />,
});

export default function WealthPage() {
  const [wealthData, setWealthData] = useState<WealthFortuneFormData | null>(null);

  const handleSubmit = async (formData: WealthFortuneFormData) => {
    setWealthData(formData);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setWealthData(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="starry-bg" />

      <div className="relative z-10">
        {!wealthData ? (
          <WealthFortuneForm onSubmit={handleSubmit} onBack={handleBack} />
        ) : (
          <WealthFortuneResult
            formData={wealthData}
            onReset={handleReset}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
}
