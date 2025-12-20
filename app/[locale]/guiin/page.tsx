'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';
import Loading from '@/components/ui/Loading';
import GuiinForm, { GuiinFormData } from '@/components/GuiinForm';

const GuiinResult = dynamic(() => import('@/components/GuiinResult'), {
  loading: () => <Loading />,
});

export default function GuiinPage() {
  const [guiinData, setGuiinData] = useState<GuiinFormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: GuiinFormData) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    setGuiinData(formData);
    setIsLoading(false);

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setGuiinData(null);
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
        {!guiinData ? (
          <GuiinForm onSubmit={handleSubmit} onBack={handleBack} />
        ) : (
          <GuiinResult
            formData={guiinData}
            onReset={handleReset}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
}
