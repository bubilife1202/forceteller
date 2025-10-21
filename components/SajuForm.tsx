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
  timeUnknown: boolean;
  isLunar: boolean;
}

interface SajuFormProps {
  onSubmit: (data: FormData) => void;
}

// 12간지 시간표
const HOUR_BRANCHES = [
  { hour: 23, label: '자시(子時)', time: '23:00-01:00', branch: '쥐' },
  { hour: 1, label: '축시(丑時)', time: '01:00-03:00', branch: '소' },
  { hour: 3, label: '인시(寅時)', time: '03:00-05:00', branch: '호랑이' },
  { hour: 5, label: '묘시(卯時)', time: '05:00-07:00', branch: '토끼' },
  { hour: 7, label: '진시(辰時)', time: '07:00-09:00', branch: '용' },
  { hour: 9, label: '사시(巳時)', time: '09:00-11:00', branch: '뱀' },
  { hour: 11, label: '오시(午時)', time: '11:00-13:00', branch: '말' },
  { hour: 13, label: '미시(未時)', time: '13:00-15:00', branch: '양' },
  { hour: 15, label: '신시(申時)', time: '15:00-17:00', branch: '원숭이' },
  { hour: 17, label: '유시(酉時)', time: '17:00-19:00', branch: '닭' },
  { hour: 19, label: '술시(戌時)', time: '19:00-21:00', branch: '개' },
  { hour: 21, label: '해시(亥時)', time: '21:00-23:00', branch: '돼지' },
];

export default function SajuForm({ onSubmit }: SajuFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    gender: 'male',
    year: new Date().getFullYear() - 30,
    month: 1,
    day: 1,
    hour: 12,
    minute: 0,
    city: '',
    timeUnknown: false,
    isLunar: false,
  });

  const [showHourGuide, setShowHourGuide] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const getCurrentHourBranch = () => {
    const hour = formData.hour;
    if (hour === 23 || hour === 0) return HOUR_BRANCHES[0];
    const branch = HOUR_BRANCHES.find(b => {
      if (b.hour === 23) return hour === 23 || hour === 0;
      return hour >= b.hour && hour < b.hour + 2;
    });
    return branch || HOUR_BRANCHES[0];
  };

  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">
      {/* 헤더 */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
          포스텔러 만세력
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
          모두를 위한 사주풀이
        </p>
        <p className="text-sm text-gray-500 mb-4">
          서머타임은 물론 지역에 따른 1~2분의 미세 시차까지 보정합니다
        </p>
        <a
          href="/guide"
          className="inline-block px-6 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full font-medium hover:bg-purple-200 dark:hover:bg-purple-900/50 transition"
        >
          📖 사주 용어 설명 보기
        </a>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 메인 카드 */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-10 card-hover">
          <div className="space-y-8">
            {/* 이름 입력 */}
            <div className="animate-slide-in">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                이름
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="최대 12글자 이내로 입력하세요"
                maxLength={12}
                className="w-full px-5 py-4 text-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900 focus:border-indigo-500 outline-none"
                required
              />
            </div>

            {/* 성별 선택 */}
            <div className="animate-slide-in" style={{ animationDelay: '0.1s' }}>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                성별
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, gender: 'female' })}
                  className={`py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                    formData.gender === 'female'
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg scale-105'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  여자
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, gender: 'male' })}
                  className={`py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                    formData.gender === 'male'
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  남자
                </button>
              </div>
            </div>

            {/* 생년월일 입력 */}
            <div className="animate-slide-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                  생년월일
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, isLunar: false })}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                      !formData.isLunar
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    양력
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, isLunar: true })}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                      formData.isLunar
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    음력
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || new Date().getFullYear() })}
                    placeholder="년"
                    min="1900"
                    max="2100"
                    className="w-full px-4 py-4 text-center text-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900 focus:border-indigo-500 outline-none"
                    required
                  />
                  <p className="text-xs text-gray-500 text-center mt-2">년</p>
                </div>
                <div>
                  <input
                    type="number"
                    value={formData.month}
                    onChange={(e) => setFormData({ ...formData, month: parseInt(e.target.value) || 1 })}
                    placeholder="월"
                    min="1"
                    max="12"
                    className="w-full px-4 py-4 text-center text-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900 focus:border-indigo-500 outline-none"
                    required
                  />
                  <p className="text-xs text-gray-500 text-center mt-2">월</p>
                </div>
                <div>
                  <input
                    type="number"
                    value={formData.day}
                    onChange={(e) => setFormData({ ...formData, day: parseInt(e.target.value) || 1 })}
                    placeholder="일"
                    min="1"
                    max="31"
                    className="w-full px-4 py-4 text-center text-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900 focus:border-indigo-500 outline-none"
                    required
                  />
                  <p className="text-xs text-gray-500 text-center mt-2">일</p>
                </div>
              </div>
            </div>

            {/* 시간 입력 */}
            <div className="animate-slide-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                  출생 시간
                </label>
                <button
                  type="button"
                  onClick={() => setShowHourGuide(!showHourGuide)}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  12간지 시간표 {showHourGuide ? '숨기기' : '보기'}
                </button>
              </div>

              {showHourGuide && (
                <div className="mb-4 p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                    {HOUR_BRANCHES.map((branch, idx) => (
                      <div
                        key={idx}
                        className="p-2 bg-white dark:bg-gray-700 rounded-lg"
                      >
                        <div className="font-semibold text-indigo-600 dark:text-indigo-400">
                          {branch.label}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">{branch.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-3">
                  <input
                    type="checkbox"
                    id="timeUnknown"
                    checked={formData.timeUnknown}
                    onChange={(e) => setFormData({ ...formData, timeUnknown: e.target.checked })}
                    className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="timeUnknown" className="text-sm text-gray-700 dark:text-gray-300">
                    시간을 모름 (정오 12시로 계산)
                  </label>
                </div>

                {!formData.timeUnknown && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input
                          type="number"
                          value={formData.hour}
                          onChange={(e) => setFormData({ ...formData, hour: parseInt(e.target.value) || 0 })}
                          placeholder="시"
                          min="0"
                          max="23"
                          className="w-full px-4 py-4 text-center text-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900 focus:border-indigo-500 outline-none"
                          required
                        />
                        <p className="text-xs text-gray-500 text-center mt-2">시 (0-23)</p>
                      </div>
                      <div>
                        <input
                          type="number"
                          value={formData.minute}
                          onChange={(e) => setFormData({ ...formData, minute: parseInt(e.target.value) || 0 })}
                          placeholder="분"
                          min="0"
                          max="59"
                          className="w-full px-4 py-4 text-center text-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900 focus:border-indigo-500 outline-none"
                          required
                        />
                        <p className="text-xs text-gray-500 text-center mt-2">분 (0-59)</p>
                      </div>
                    </div>

                    <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
                      <p className="text-sm text-purple-900 dark:text-purple-200">
                        <span className="font-semibold">{getCurrentHourBranch().label}</span>
                        <span className="text-purple-700 dark:text-purple-300 ml-2">
                          ({getCurrentHourBranch().time})
                        </span>
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* 도시 입력 */}
            <div className="animate-slide-in" style={{ animationDelay: '0.4s' }}>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                출생 도시 <span className="text-xs text-gray-500">(선택사항)</span>
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="예: 서울특별시, 부산광역시"
                className="w-full px-5 py-4 text-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900 focus:border-indigo-500 outline-none"
              />
              <p className="text-xs text-gray-500 mt-2">
                정확한 지역 시차 보정을 위해 입력해주세요
              </p>
            </div>
          </div>
        </div>

        {/* 제출 버튼 */}
        <div className="animate-scale-in" style={{ animationDelay: '0.5s' }}>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-5 px-8 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 focus:ring-4 focus:ring-purple-300"
          >
            사주 풀이 시작하기
          </button>
        </div>
      </form>

      {/* 안내 문구 */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>포스텔러 만세력 v2.2</p>
        <p className="mt-1">정확한 사주 분석을 위해 정보를 정확히 입력해주세요</p>
      </div>
    </div>
  );
}
