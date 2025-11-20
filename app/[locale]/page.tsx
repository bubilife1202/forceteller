'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SajuFormFunnel, { FormData } from '@/components/SajuFormFunnel';
import SajuResult from '@/components/SajuResult';
import Loading from '@/components/ui/Loading';
import { calculateSaju, SajuResult as SajuResultType } from '@/lib/saju-calculator';

export default function Home() {
  const [result, setResult] = useState<SajuResultType | null>(null);
  const [userData, setUserData] = useState<{ name: string; gender: 'male' | 'female' } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);

    // Simulate mystical calculation time (2.5 seconds for premium feel)
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
    });
    setIsLoading(false);

    // 결과 화면으로 스크롤
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setResult(null);
    setUserData(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Starry Night Background */}
      <div className="starry-bg" />

      {/* Loading Animation */}
      <AnimatePresence>
        {isLoading && <Loading />}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10">
        {!result ? (
          <SajuFormFunnel onSubmit={handleSubmit} />
        ) : (
          userData && (
            <div className="py-12 px-4 md:px-6 lg:px-8">
              <SajuResult
                result={result}
                name={userData.name}
                gender={userData.gender}
                onReset={handleReset}
              />
            </div>
          )
        )}

        {/* Footer */}
        {!result && (
          <footer className="text-center pb-12">
            <div className="inline-block px-6 py-3 glass rounded-2xl">
              <p className="text-xs text-slate-400">
                © 2025 Forceteller. All rights reserved.
              </p>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}
