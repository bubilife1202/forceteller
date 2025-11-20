'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SajuForm, { FormData } from '@/components/SajuForm';
import SajuResult from '@/components/SajuResult';
import Loading from '@/components/ui/Loading';
import { calculateSaju, SajuResult as SajuResultType } from '@/lib/saju-calculator';

export default function Home() {
  const [result, setResult] = useState<SajuResultType | null>(null);
  const [userData, setUserData] = useState<{ name: string; gender: 'male' | 'female' } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);

    // Simulate calculation time for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));

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
      {/* 배경 그라데이션 - 새로운 다크 테마 */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-muted to-background">
        {/* 별 효과 */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
      </div>

      {/* 배경 장식 요소 - 신비로운 보라/금색 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-primary/30 rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full filter blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute bottom-0 left-1/2 w-96 h-96 bg-accent/20 rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </div>

      {/* Loading Animation */}
      <AnimatePresence>
        {isLoading && <Loading />}
      </AnimatePresence>

      {/* 컨텐츠 */}
      <div className="relative z-10 py-12 px-4 md:px-6 lg:px-8">
        {!result ? (
          <SajuForm onSubmit={handleSubmit} />
        ) : (
          userData && (
            <SajuResult
              result={result}
              name={userData.name}
              gender={userData.gender}
              onReset={handleReset}
            />
          )
        )}

        {/* Footer */}
        <footer className="mt-16 text-center">
          <div className="inline-block px-6 py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl shadow-lg">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              © 2025 Forceteller. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
