'use client';

import { useState } from 'react';

export interface FormData {
  name: string;
  gender: 'male' | 'female';
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  city: string;
}

interface SajuFormProps {
  onSubmit: (data: FormData) => void;
}

export default function SajuForm({ onSubmit }: SajuFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    gender: 'male',
    year: 1990,
    month: 1,
    day: 1,
    hour: 12,
    minute: 0,
    city: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          모두를 위한 사주풀이
        </h1>
        <h2 className="text-xl text-gray-600">포스텔러 만세력</h2>
        <p className="text-sm text-gray-500 mt-3">
          정확한 시간 보정을 통해 사주 오행을 분석해보세요
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 이름 입력 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            이름
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="최대 12글자 이내로 입력하세요"
            maxLength={12}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            required
          />
        </div>

        {/* 성별 선택 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            성별
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, gender: 'female' })}
              className={`flex-1 py-3 rounded-lg font-medium transition ${
                formData.gender === 'female'
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              여자
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, gender: 'male' })}
              className={`flex-1 py-3 rounded-lg font-medium transition ${
                formData.gender === 'male'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              남자
            </button>
          </div>
        </div>

        {/* 생년월일 입력 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            생년월일
          </label>
          <div className="grid grid-cols-3 gap-3">
            <input
              type="number"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
              placeholder="년"
              min="1900"
              max="2100"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
            <input
              type="number"
              value={formData.month}
              onChange={(e) => setFormData({ ...formData, month: parseInt(e.target.value) })}
              placeholder="월"
              min="1"
              max="12"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
            <input
              type="number"
              value={formData.day}
              onChange={(e) => setFormData({ ...formData, day: parseInt(e.target.value) })}
              placeholder="일"
              min="1"
              max="31"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
          </div>
        </div>

        {/* 시간 입력 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            출생 시간
          </label>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              value={formData.hour}
              onChange={(e) => setFormData({ ...formData, hour: parseInt(e.target.value) })}
              placeholder="시"
              min="0"
              max="23"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
            <input
              type="number"
              value={formData.minute}
              onChange={(e) => setFormData({ ...formData, minute: parseInt(e.target.value) })}
              placeholder="분"
              min="0"
              max="59"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
          </div>
        </div>

        {/* 도시 입력 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            출생 도시
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="도시명을 입력하세요"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition shadow-lg"
        >
          사주 풀이 시작하기
        </button>
      </form>
    </div>
  );
}
