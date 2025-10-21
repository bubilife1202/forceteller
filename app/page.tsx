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
      hour: formData.hour,
    });

    setResult(sajuResult);
    setUserData({
      name: formData.name,
      gender: formData.gender,
    });
  };

  const handleReset = () => {
    setResult(null);
    setUserData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
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
      <footer className="mt-12 text-center text-sm text-gray-500">
        <p>포스텔러 만세력 MVP</p>
        <p className="mt-1">© 2024 Forceteller. All rights reserved.</p>
      </footer>
    </div>
  );
}
