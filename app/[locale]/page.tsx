'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import MainMenu, { MenuOption } from '@/components/MainMenu';
import SajuFormFunnel, { FormData } from '@/components/SajuFormFunnel';
import SajuResultPremium from '@/components/SajuResultPremium';
import NewYearResult2026 from '@/components/NewYearResult2026';
import TojeongResult2026 from '@/components/TojeongResult2026';
import CompatibilityForm, { CompatibilityFormData } from '@/components/CompatibilityForm';
import CompatibilityResult from '@/components/CompatibilityResult';
import DreamForm, { DreamFormData } from '@/components/DreamForm';
import DreamResult from '@/components/DreamResult';
import Loading from '@/components/ui/Loading';
import { calculateSaju, SajuResult as SajuResultType } from '@/lib/saju-calculator';

export default function Home() {
  const [menuSelection, setMenuSelection] = useState<MenuOption | null>(null);
  const [result, setResult] = useState<SajuResultType | null>(null);
  const [userData, setUserData] = useState<{
    name: string;
    gender: 'male' | 'female';
    birthDate: { year: number; month: number; day: number };
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 궁합 관련 상태
  const [compatibilityData, setCompatibilityData] = useState<{
    result1: SajuResultType;
    result2: SajuResultType;
    formData: CompatibilityFormData;
  } | null>(null);

  // 꿈해몽 관련 상태
  const [dreamData, setDreamData] = useState<DreamFormData | null>(null);

  const handleMenuSelect = (option: MenuOption) => {
    setMenuSelection(option);
  };

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
      birthDate: {
        year: formData.year,
        month: formData.month,
        day: formData.day,
      },
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
    setCompatibilityData(null);
    setDreamData(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToMenu = () => {
    setResult(null);
    setUserData(null);
    setCompatibilityData(null);
    setDreamData(null);
    setMenuSelection(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 꿈해몽 제출 핸들러
  const handleDreamSubmit = async (formData: DreamFormData) => {
    setIsLoading(true);

    // 신비로운 해몽 시간
    await new Promise(resolve => setTimeout(resolve, 2000));

    setDreamData(formData);
    setIsLoading(false);

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  // 궁합 제출 핸들러
  const handleCompatibilitySubmit = async (formData: CompatibilityFormData) => {
    setIsLoading(true);

    // 신비로운 계산 시간
    await new Promise(resolve => setTimeout(resolve, 3000));

    // 두 사람의 사주 계산
    const result1 = calculateSaju({
      year: formData.person1.year,
      month: formData.person1.month,
      day: formData.person1.day,
      hour: formData.person1.timeUnknown ? 12 : formData.person1.hour,
    }, formData.person1.gender);

    const result2 = calculateSaju({
      year: formData.person2.year,
      month: formData.person2.month,
      day: formData.person2.day,
      hour: formData.person2.timeUnknown ? 12 : formData.person2.hour,
    }, formData.person2.gender);

    setCompatibilityData({
      result1,
      result2,
      formData,
    });

    setIsLoading(false);

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
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
        {/* 메인 메뉴 */}
        {!menuSelection && !result && !compatibilityData && !dreamData && (
          <MainMenu onSelect={handleMenuSelect} />
        )}

        {/* 만세력/사주 풀이 플로우 */}
        {menuSelection === 'saju' && !result && (
          <SajuFormFunnel onSubmit={handleSubmit} />
        )}
        {menuSelection === 'saju' && result && userData && (
          <SajuResultPremium
            result={result}
            name={userData.name}
            gender={userData.gender}
            birthDate={userData.birthDate}
            onReset={handleReset}
          />
        )}

        {/* 2026 신년운세 플로우 */}
        {menuSelection === 'newyear2026' && !result && (
          <SajuFormFunnel onSubmit={handleSubmit} />
        )}
        {menuSelection === 'newyear2026' && result && userData && (
          <NewYearResult2026
            result={result}
            name={userData.name}
            gender={userData.gender}
            birthDate={userData.birthDate}
            onReset={handleReset}
            onBack={handleBackToMenu}
          />
        )}

        {/* 2026 토정비결 플로우 */}
        {menuSelection === 'tojeong2026' && !result && (
          <SajuFormFunnel onSubmit={handleSubmit} />
        )}
        {menuSelection === 'tojeong2026' && result && userData && (
          <TojeongResult2026
            result={result}
            name={userData.name}
            gender={userData.gender}
            birthDate={userData.birthDate}
            onReset={handleReset}
            onBack={handleBackToMenu}
          />
        )}

        {/* 궁합 보기 플로우 */}
        {menuSelection === 'compatibility' && !compatibilityData && (
          <CompatibilityForm onSubmit={handleCompatibilitySubmit} onBack={handleBackToMenu} />
        )}
        {menuSelection === 'compatibility' && compatibilityData && (
          <CompatibilityResult
            result1={compatibilityData.result1}
            result2={compatibilityData.result2}
            formData={compatibilityData.formData}
            onReset={handleReset}
            onBack={handleBackToMenu}
          />
        )}

        {/* 꿈해몽 플로우 */}
        {menuSelection === 'dream' && !dreamData && (
          <DreamForm onSubmit={handleDreamSubmit} onBack={handleBackToMenu} />
        )}
        {menuSelection === 'dream' && dreamData && (
          <DreamResult
            formData={dreamData}
            onReset={handleReset}
            onBack={handleBackToMenu}
          />
        )}

        {/* Footer */}
        {!result && !menuSelection && (
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
