'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import AdSense from './AdSense';

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
  timeInputType: 'exact' | 'branch' | 'unknown';
}

interface SajuFormProps {
  onSubmit: (data: FormData) => void;
}

// 12간지 시간표
const HOUR_BRANCHES = [
  { hour: 23, key: 'ja', time: '23:00-01:00' },
  { hour: 1, key: 'chuk', time: '01:00-03:00' },
  { hour: 3, key: 'in', time: '03:00-05:00' },
  { hour: 5, key: 'myo', time: '05:00-07:00' },
  { hour: 7, key: 'jin', time: '07:00-09:00' },
  { hour: 9, key: 'sa', time: '09:00-11:00' },
  { hour: 11, key: 'o', time: '11:00-13:00' },
  { hour: 13, key: 'mi', time: '13:00-15:00' },
  { hour: 15, key: 'shin', time: '15:00-17:00' },
  { hour: 17, key: 'yu', time: '17:00-19:00' },
  { hour: 19, key: 'sul', time: '19:00-21:00' },
  { hour: 21, key: 'hae', time: '21:00-23:00' },
];

export default function SajuForm({ onSubmit }: SajuFormProps) {
  const t = useTranslations('form');
  const locale = useLocale();

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
    timeInputType: 'exact',
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
          {t('title')}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
          {t('subtitle')}
        </p>
        <p className="text-sm text-gray-500 mb-4">
          {t('accuracyNote')}
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href={`/${locale}/guide`}
            className="inline-block px-6 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full font-medium hover:bg-purple-200 dark:hover:bg-purple-900/50 transition"
          >
            {t('guideLink')}
          </Link>
          <Link
            href={`/${locale}/chatgpt-prompt`}
            className="inline-block px-6 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full font-medium hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition"
          >
            {t('chatgptLink')}
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 메인 카드 */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-10 card-hover">
          <div className="space-y-8">
            {/* 이름 입력 */}
            <div className="animate-slide-in">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                {t('name.label')}
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t('name.placeholder')}
                maxLength={12}
                className="w-full px-5 py-4 text-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900 focus:border-indigo-500 outline-none"
                required
              />
            </div>

            {/* 성별 선택 */}
            <div className="animate-slide-in" style={{ animationDelay: '0.1s' }}>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                {t('gender.label')}
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
                  {t('gender.female')}
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
                  {t('gender.male')}
                </button>
              </div>
            </div>

            {/* 생년월일 입력 */}
            <div className="animate-slide-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                  {t('birthDate.label')}
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
                    {t('birthDate.solar')}
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
                    {t('birthDate.lunar')}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                    className="w-full px-4 py-4 text-center text-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900 focus:border-indigo-500 outline-none appearance-none cursor-pointer"
                    required
                  >
                    {Array.from({ length: 201 }, (_, i) => 2100 - i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 text-center mt-2">{t('birthDate.year')}</p>
                </div>
                <div>
                  <select
                    value={formData.month}
                    onChange={(e) => setFormData({ ...formData, month: parseInt(e.target.value) })}
                    className="w-full px-4 py-4 text-center text-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900 focus:border-indigo-500 outline-none appearance-none cursor-pointer"
                    required
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                      <option key={month} value={month}>{month}{t('birthDate.month')}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 text-center mt-2">{t('birthDate.month')}</p>
                </div>
                <div>
                  <select
                    value={formData.day}
                    onChange={(e) => setFormData({ ...formData, day: parseInt(e.target.value) })}
                    className="w-full px-4 py-4 text-center text-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900 focus:border-indigo-500 outline-none appearance-none cursor-pointer"
                    required
                  >
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                      <option key={day} value={day}>{day}{t('birthDate.day')}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 text-center mt-2">{t('birthDate.day')}</p>
                </div>
              </div>
            </div>

            {/* 시간 입력 */}
            <div className="animate-slide-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                  {t('birthTime.label')}
                </label>
                <button
                  type="button"
                  onClick={() => setShowHourGuide(!showHourGuide)}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  {t('birthTime.hourGuide')} {showHourGuide ? t('birthTime.hide') : t('birthTime.show')}
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
                          {t(`hourBranches.${branch.key}`)}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">{branch.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {/* 시간 입력 방식 선택 */}
                <div className="grid grid-cols-1 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, timeInputType: 'exact', timeUnknown: false })}
                    className={`py-3 px-4 rounded-xl font-medium text-sm transition-all ${
                      formData.timeInputType === 'exact'
                        ? 'bg-indigo-600 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {t('birthTime.exact')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, timeInputType: 'branch', timeUnknown: false, hour: 12, minute: 0 })}
                    className={`py-3 px-4 rounded-xl font-medium text-sm transition-all ${
                      formData.timeInputType === 'branch'
                        ? 'bg-indigo-600 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {t('birthTime.branch')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, timeInputType: 'unknown', timeUnknown: true, hour: 12, minute: 0 })}
                    className={`py-3 px-4 rounded-xl font-medium text-sm transition-all ${
                      formData.timeInputType === 'unknown'
                        ? 'bg-indigo-600 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {t('birthTime.unknown')}
                  </button>
                </div>

                {/* 정확한 시간 입력 */}
                {formData.timeInputType === 'exact' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <select
                          value={formData.hour}
                          onChange={(e) => setFormData({ ...formData, hour: parseInt(e.target.value) })}
                          className="w-full px-4 py-4 text-center text-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900 focus:border-indigo-500 outline-none appearance-none cursor-pointer"
                          required
                        >
                          {Array.from({ length: 24 }, (_, i) => i).map(hour => (
                            <option key={hour} value={hour}>{hour}</option>
                          ))}
                        </select>
                        <p className="text-xs text-gray-500 text-center mt-2">{t('birthTime.hour')}</p>
                      </div>
                      <div>
                        <select
                          value={formData.minute}
                          onChange={(e) => setFormData({ ...formData, minute: parseInt(e.target.value) })}
                          className="w-full px-4 py-4 text-center text-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900 focus:border-indigo-500 outline-none appearance-none cursor-pointer"
                          required
                        >
                          {Array.from({ length: 60 }, (_, i) => i).map(minute => (
                            <option key={minute} value={minute}>{minute}</option>
                          ))}
                        </select>
                        <p className="text-xs text-gray-500 text-center mt-2">{t('birthTime.minute')}</p>
                      </div>
                    </div>

                    <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
                      <p className="text-sm text-purple-900 dark:text-purple-200">
                        <span className="font-semibold">{t(`hourBranches.${getCurrentHourBranch().key}`)}</span>
                        <span className="text-purple-700 dark:text-purple-300 ml-2">
                          ({getCurrentHourBranch().time})
                        </span>
                      </p>
                    </div>
                  </>
                )}

                {/* 12간지 시간 선택 */}
                {formData.timeInputType === 'branch' && (
                  <>
                    <div>
                      <select
                        value={formData.hour}
                        onChange={(e) => {
                          const selectedHour = parseInt(e.target.value);
                          setFormData({ ...formData, hour: selectedHour, minute: 0 });
                        }}
                        className="w-full px-4 py-4 text-center text-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900 focus:border-indigo-500 outline-none appearance-none cursor-pointer"
                        required
                      >
                        {HOUR_BRANCHES.map((branch, idx) => (
                          <option key={idx} value={branch.hour}>
                            {t(`hourBranches.${branch.key}`)} {branch.time}
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-gray-500 text-center mt-2">{t('birthTime.hourGuide')}</p>
                    </div>

                    <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
                      <p className="text-sm text-purple-900 dark:text-purple-200">
                        <span className="font-semibold">{t(`hourBranches.${getCurrentHourBranch().key}`)}</span> {t('birthTime.currentBranch')}
                        <span className="block text-xs text-purple-700 dark:text-purple-300 mt-1">
                          ({t('birthTime.middleTime')}: {formData.hour} {formData.minute})
                        </span>
                      </p>
                    </div>
                  </>
                )}

                {/* 시간을 모르는 경우 */}
                {formData.timeInputType === 'unknown' && (
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {t('birthTime.noonDefault')}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* 도시 입력 */}
            <div className="animate-slide-in" style={{ animationDelay: '0.4s' }}>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                {t('city.label')} <span className="text-xs text-gray-500">{t('city.optional')}</span>
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder={t('city.placeholder')}
                className="w-full px-5 py-4 text-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900 focus:border-indigo-500 outline-none"
              />
              <p className="text-xs text-gray-500 mt-2">
                {t('city.help')}
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
            {t('submit')}
          </button>
        </div>
      </form>

      {/* 광고 */}
      <div className="my-8">
        <AdSense
          adSlot="9952740191"
          className="text-center"
        />
      </div>

      {/* 안내 문구 */}
      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p className="font-semibold text-indigo-600 dark:text-indigo-400">{t('../common.version')}</p>
        <p className="mt-1">{t('footer.note')}</p>
      </div>
    </div>
  );
}
