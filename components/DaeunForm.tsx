'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowLeft, User, Calendar, Clock } from 'lucide-react';

export interface DaeunFormData {
  name: string;
  gender: 'male' | 'female';
  year: number;
  month: number;
  day: number;
  hour: number;
  timeUnknown: boolean;
}

interface DaeunFormProps {
  onSubmit: (data: DaeunFormData) => void;
  onBack: () => void;
}

export default function DaeunForm({ onSubmit, onBack }: DaeunFormProps) {
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState<DaeunFormData>({
    name: '',
    gender: 'male',
    year: 1990,
    month: 1,
    day: 1,
    hour: 12,
    timeUnknown: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('이름을 입력해주세요.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-full max-w-md">
        {/* 뒤로가기 */}
        <motion.button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>메뉴로</span>
        </motion.button>

        {/* 헤더 */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-600 flex items-center justify-center shadow-lg mb-4">
            <TrendingUp className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            인생 전성기 그래프
          </h1>
          <p className="text-cyan-400">10년 대운으로 보는 내 인생 흐름</p>
        </motion.div>

        {/* 폼 */}
        <motion.form
          onSubmit={handleSubmit}
          className="glass rounded-3xl p-6 space-y-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* 이름 */}
          <div>
            <label className="text-slate-300 text-sm mb-2 flex items-center gap-2">
              <User className="w-4 h-4" />
              이름
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="홍길동"
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* 성별 */}
          <div>
            <label className="text-slate-300 text-sm mb-2 block">성별</label>
            <div className="grid grid-cols-2 gap-3">
              {(['male', 'female'] as const).map((gender) => (
                <button
                  key={gender}
                  type="button"
                  onClick={() => setFormData({ ...formData, gender })}
                  className={`py-3 rounded-xl font-medium transition-all ${
                    formData.gender === gender
                      ? 'bg-cyan-500 text-white'
                      : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {gender === 'male' ? '남성' : '여성'}
                </button>
              ))}
            </div>
          </div>

          {/* 생년월일 */}
          <div>
            <label className="text-slate-300 text-sm mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              생년월일 (양력)
            </label>
            <div className="grid grid-cols-3 gap-2">
              <select
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                className="px-3 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
              >
                {Array.from({ length: 80 }, (_, i) => currentYear - 10 - i).map((year) => (
                  <option key={year} value={year}>{year}년</option>
                ))}
              </select>
              <select
                value={formData.month}
                onChange={(e) => setFormData({ ...formData, month: Number(e.target.value) })}
                className="px-3 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <option key={month} value={month}>{month}월</option>
                ))}
              </select>
              <select
                value={formData.day}
                onChange={(e) => setFormData({ ...formData, day: Number(e.target.value) })}
                className="px-3 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
              >
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <option key={day} value={day}>{day}일</option>
                ))}
              </select>
            </div>
          </div>

          {/* 태어난 시간 */}
          <div>
            <label className="text-slate-300 text-sm mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              태어난 시간
            </label>
            <div className="space-y-2">
              <select
                value={formData.hour}
                onChange={(e) => setFormData({ ...formData, hour: Number(e.target.value) })}
                disabled={formData.timeUnknown}
                className="w-full px-3 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:border-cyan-500 focus:outline-none disabled:opacity-50"
              >
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={i}>{i}시 ({Math.floor(i/2) % 12 === 0 ? 12 : Math.floor(i/2) % 12}시 {i % 2 === 0 ? '정각~' : '30분~'})</option>
                ))}
              </select>
              <label className="flex items-center gap-2 text-slate-400 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.timeUnknown}
                  onChange={(e) => setFormData({ ...formData, timeUnknown: e.target.checked })}
                  className="rounded border-slate-700 bg-slate-800"
                />
                태어난 시간을 모르겠어요
              </label>
            </div>
          </div>

          {/* 안내 */}
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
            <p className="text-cyan-300 text-sm">
              <strong>대운(大運)</strong>이란?<br />
              10년 단위로 바뀌는 인생의 큰 흐름입니다.
              언제 전성기가 오는지, 언제 조심해야 하는지 알 수 있어요.
            </p>
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl text-white font-bold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg"
          >
            내 인생 그래프 보기
          </button>
        </motion.form>
      </div>
    </motion.div>
  );
}
