'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, ArrowLeft, Sparkles } from 'lucide-react';

export interface DailyFortuneFormData {
  year: number;
  month: number;
  day: number;
}

interface DailyFortuneFormProps {
  onSubmit: (data: DailyFortuneFormData) => void;
  onBack: () => void;
}

export default function DailyFortuneForm({ onSubmit, onBack }: DailyFortuneFormProps) {
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState({
    year: 1990,
    month: 1,
    day: 1,
  });

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // 해당 월의 일수 계산
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(formData.year, formData.month);

  // 오늘 날짜 포맷
  const today = new Date();
  const todayStr = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

  return (
    <motion.div
      className="min-h-screen py-8 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-md mx-auto">
        {/* 뒤로가기 */}
        <motion.button
          variants={itemVariants}
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>메뉴로 돌아가기</span>
        </motion.button>

        {/* 헤더 */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg mb-4">
            <Sun className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            오늘의 운세
          </h1>
          <p className="text-amber-400">{todayStr}</p>
        </motion.div>

        {/* 생년월일 입력 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-xl">🎂</span>
            생년월일을 입력하세요
          </h2>

          <p className="text-slate-400 text-sm mb-4">
            태어난 날짜만 알면 오늘의 운세를 볼 수 있어요
          </p>

          <div className="space-y-4">
            {/* 년도 */}
            <div>
              <label className="block text-slate-300 text-sm mb-2">년도</label>
              <select
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-amber-400 transition-colors"
              >
                {Array.from({ length: 100 }, (_, i) => currentYear - i).map((year) => (
                  <option key={year} value={year}>{year}년</option>
                ))}
              </select>
            </div>

            {/* 월, 일 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 text-sm mb-2">월</label>
                <select
                  value={formData.month}
                  onChange={(e) => setFormData({ ...formData, month: parseInt(e.target.value), day: 1 })}
                  className="w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-amber-400 transition-colors"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <option key={month} value={month}>{month}월</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-slate-300 text-sm mb-2">일</label>
                <select
                  value={formData.day}
                  onChange={(e) => setFormData({ ...formData, day: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-amber-400 transition-colors"
                >
                  {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
                    <option key={day} value={day}>{day}일</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 운세 보기 버튼 */}
        <motion.div variants={itemVariants}>
          <button
            onClick={handleSubmit}
            className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl text-white font-bold text-lg hover:from-amber-600 hover:to-orange-700 transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <Sparkles className="w-5 h-5" />
            오늘의 운세 보기
          </button>
          <p className="text-slate-500 text-xs text-center mt-3">
            일간 오행과 오늘의 기운을 분석합니다
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
