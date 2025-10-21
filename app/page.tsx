'use client';

import { useState } from 'react';
import SajuForm, { FormData } from '@/components/SajuForm';
import SajuResult from '@/components/SajuResult';
import { calculateSaju, SajuResult as SajuResultType } from '@/lib/saju-calculator';

export default function Home() {
  const [result, setResult] = useState<SajuResultType | null>(null);
  const [userData, setUserData] = useState<{ name: string; gender: 'male' | 'female' } | null>(null);

  const handleSubmit = (formData: FormData) => {
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
      {/* 배경 그라데이션 */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900"></div>

      {/* 배경 장식 요소 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 dark:bg-purple-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-300 dark:bg-pink-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-300 dark:bg-blue-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

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
          <div className="inline-block px-6 py-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl shadow-lg">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">포스텔러 만세력 v2.2</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              © 2024 Forceteller. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
