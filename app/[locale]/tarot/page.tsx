'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';
import Loading from '@/components/ui/Loading';
import TarotForm, { TarotFormData } from '@/components/TarotForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const TarotResult = dynamic(() => import('@/components/TarotResult'), {
  loading: () => <Loading />,
});

export default function TarotPage() {
  const [tarotData, setTarotData] = useState<TarotFormData | null>(null);

  const handleSubmit = async (formData: TarotFormData) => {
    setTarotData(formData);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setTarotData(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="starry-bg" />

      <div className="relative z-10">
        {!tarotData ? (
          <TarotForm onSubmit={handleSubmit} onBack={handleBack} />
        ) : (
          <TarotResult
            formData={tarotData}
            onReset={handleReset}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
}
