'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Coins, Sparkles } from 'lucide-react';

export interface WealthFortuneFormData {
  name: string;
  year: number;
  month: number;
  day: number;
  gender: 'male' | 'female';
}

interface WealthFortuneFormProps {
  onSubmit: (data: WealthFortuneFormData) => void;
  onBack: () => void;
}

export default function WealthFortuneForm({ onSubmit, onBack }: WealthFortuneFormProps) {
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState<WealthFortuneFormData>({
    name: '',
    year: 1990,
    month: 1,
    day: 1,
    gender: 'male',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSubmit(formData);
    }
  };

  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 뒤로가기 */}
        <motion.button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>메뉴로</span>
        </motion.button>

        {/* 헤더 */}
        <div className="text-center mb-8">
          <motion.div
            className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center shadow-lg"
            animate={{
              boxShadow: [
                '0 0 20px rgba(234, 179, 8, 0.3)',
                '0 0 40px rgba(234, 179, 8, 0.5)',
                '0 0 20px rgba(234, 179, 8, 0.3)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Coins className="w-10 h-10 text-white" />
          </motion.div>
          <h1
            className="text-3xl font-bold gradient-text mb-2"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            대박 재물운
          </h1>
          <p className="text-slate-400">
            당신의 평생 재물 팔자를 확인하세요
          </p>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 이름 */}
          <div className="glass-strong rounded-2xl p-5">
            <label className="block text-slate-300 text-sm font-medium mb-3">
              이름
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="이름을 입력하세요"
              className="w-full bg-slate-800/50 border border-slate-600 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500 transition-colors"
              required
            />
          </div>

          {/* 성별 */}
          <div className="glass-strong rounded-2xl p-5">
            <label className="block text-slate-300 text-sm font-medium mb-3">
              성별
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, gender: 'male' })}
                className={`py-3 rounded-xl font-medium transition-all ${
                  formData.gender === 'male'
                    ? 'bg-yellow-500 text-black'
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                남성
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, gender: 'female' })}
                className={`py-3 rounded-xl font-medium transition-all ${
                  formData.gender === 'female'
                    ? 'bg-yellow-500 text-black'
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                여성
              </button>
            </div>
          </div>

          {/* 생년월일 */}
          <div className="glass-strong rounded-2xl p-5">
            <label className="block text-slate-300 text-sm font-medium mb-3">
              생년월일 (양력)
            </label>
            <div className="grid grid-cols-3 gap-3">
              <select
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                className="bg-slate-800/50 border border-slate-600 rounded-xl p-3 text-white focus:outline-none focus:border-yellow-500"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}년
                  </option>
                ))}
              </select>
              <select
                value={formData.month}
                onChange={(e) => setFormData({ ...formData, month: parseInt(e.target.value) })}
                className="bg-slate-800/50 border border-slate-600 rounded-xl p-3 text-white focus:outline-none focus:border-yellow-500"
              >
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}월
                  </option>
                ))}
              </select>
              <select
                value={formData.day}
                onChange={(e) => setFormData({ ...formData, day: parseInt(e.target.value) })}
                className="bg-slate-800/50 border border-slate-600 rounded-xl p-3 text-white focus:outline-none focus:border-yellow-500"
              >
                {days.map((day) => (
                  <option key={day} value={day}>
                    {day}일
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 제출 버튼 */}
          <motion.button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-2xl text-black font-bold text-lg shadow-lg flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Sparkles className="w-5 h-5" />
            재물운 확인하기
          </motion.button>
        </form>

        {/* 안내 */}
        <p className="text-center text-slate-500 text-xs mt-6">
          사주명리학의 재성(財星) 원리에 기반합니다
        </p>
      </motion.div>
    </div>
  );
}
