'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from './ui/glass-card';
import { Sparkles, User, Calendar, Clock } from 'lucide-react';

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

interface SajuFormFunnelProps {
  onSubmit: (data: FormData) => void;
}

const pageVariants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 }
};

const pageTransition = {
  type: 'tween' as const,
  ease: 'anticipate' as const,
  duration: 0.5
};

export default function SajuFormFunnel({ onSubmit }: SajuFormFunnelProps) {
  const [step, setStep] = useState(0); // 0: intro, 1: name, 2: birth, 3: time
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

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  // 한글 입력 처리 - useRef로 composition 상태 추적 (리렌더링 방지)
  const isComposingRef = useRef(false);

  const handleCompositionStart = () => {
    isComposingRef.current = true;
  };

  const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
    isComposingRef.current = false;
    setFormData({ ...formData, name: e.currentTarget.value });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // IME 입력 중이 아닐 때만 상태 업데이트 (영문/숫자 등)
    if (!isComposingRef.current) {
      setFormData({ ...formData, name: e.target.value });
    }
  };

  // Step 0: 인트로 화면
  const IntroStep = () => (
    <motion.div
      key="intro"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="flex flex-col items-center justify-center min-h-[70vh] text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="mb-8"
      >
        <Sparkles className="w-24 h-24 text-amber-400 animate-pulse" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-5xl md:text-7xl font-bold mb-6 gradient-text"
        style={{ fontFamily: "'Noto Serif KR', serif" }}
      >
        당신의 운명을<br />읽어드립니다
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-xl text-slate-300 mb-12 max-w-md"
      >
        별들의 배치와 시간의 흐름 속에서<br />
        당신만의 이야기를 찾아보세요
      </motion.p>

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleNext}
        className="px-12 py-5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 rounded-2xl font-bold text-xl btn-glow glow-gold"
      >
        시작하기
      </motion.button>
    </motion.div>
  );

  // Step 1: 이름 입력
  const NameStep = () => (
    <motion.div
      key="name"
      initial={{ opacity: 1, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={pageTransition}
      className="max-w-md mx-auto"
    >
      <GlassCard variant="strong" glow="purple" animate={false}>
        <div className="text-center mb-8">
          <User className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            성함을 알려주세요
          </h2>
          <p className="text-slate-400">당신의 운명을 불러올 이름입니다</p>
        </div>

        <div className="space-y-6">
          <div>
            <input
              type="text"
              value={formData.name}
              onChange={handleNameChange}
              onCompositionStart={handleCompositionStart}
              onCompositionEnd={handleCompositionEnd}
              placeholder="이름을 입력하세요"
              maxLength={12}
              className="w-full px-6 py-4 text-lg bg-slate-800/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition text-center"
              autoFocus
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleBack}
              className="flex-1 px-6 py-4 bg-slate-800 hover:bg-slate-700 rounded-xl font-semibold transition"
            >
              이전
            </button>
            <button
              onClick={handleNext}
              disabled={!formData.name}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              다음
            </button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );

  // Step 2: 생년월일 & 성별
  const BirthStep = () => (
    <motion.div
      key="birth"
      initial={{ opacity: 1, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={pageTransition}
      className="max-w-2xl mx-auto"
    >
      <GlassCard variant="strong" glow="gold" animate={false}>
        <div className="text-center mb-8">
          <Calendar className="w-16 h-16 text-amber-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            태어나신 날을 알려주세요
          </h2>
          <p className="text-slate-400">별들의 위치를 계산하겠습니다</p>
        </div>

        <div className="space-y-6">
          {/* 성별 선택 */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-3">성별</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, gender: 'female' })}
                className={`py-4 px-6 rounded-xl font-semibold text-lg transition-all ${
                  formData.gender === 'female'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white scale-105 glow-purple'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                👩 여성
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, gender: 'male' })}
                className={`py-4 px-6 rounded-xl font-semibold text-lg transition-all ${
                  formData.gender === 'male'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white scale-105 glow-purple'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                👨 남성
              </button>
            </div>
          </div>

          {/* 음력/양력 선택 */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-3">생년월일 구분</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, isLunar: false })}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition ${
                  !formData.isLunar
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                양력
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, isLunar: true })}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition ${
                  formData.isLunar
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                음력
              </button>
            </div>
          </div>

          {/* 생년월일 입력 */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-2 text-center">연도</label>
              <select
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                className="w-full px-4 py-3 text-center text-lg bg-slate-800/70 border border-slate-600 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none appearance-none cursor-pointer"
              >
                {Array.from({ length: 201 }, (_, i) => 2100 - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-2 text-center">월</label>
              <select
                value={formData.month}
                onChange={(e) => setFormData({ ...formData, month: parseInt(e.target.value) })}
                className="w-full px-4 py-3 text-center text-lg bg-slate-800/70 border border-slate-600 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none appearance-none cursor-pointer"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                  <option key={month} value={month}>{month}월</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-2 text-center">일</label>
              <select
                value={formData.day}
                onChange={(e) => setFormData({ ...formData, day: parseInt(e.target.value) })}
                className="w-full px-4 py-3 text-center text-lg bg-slate-800/70 border border-slate-600 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none appearance-none cursor-pointer"
              >
                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                  <option key={day} value={day}>{day}일</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleBack}
              className="flex-1 px-6 py-4 bg-slate-800 hover:bg-slate-700 rounded-xl font-semibold transition"
            >
              이전
            </button>
            <button
              onClick={handleNext}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 rounded-xl font-semibold transition"
            >
              다음
            </button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );

  // Step 3: 태어난 시간
  const TimeStep = () => (
    <motion.div
      key="time"
      initial={{ opacity: 1, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={pageTransition}
      className="max-w-2xl mx-auto"
    >
      <GlassCard variant="strong" glow="purple" animate={false}>
        <div className="text-center mb-8">
          <Clock className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            태어난 시간을 알려주세요
          </h2>
          <p className="text-slate-400">더 정확한 운명 분석을 위해 필요합니다</p>
        </div>

        <div className="space-y-6">
          {/* 시간 입력 방식 선택 */}
          <div className="grid grid-cols-1 gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, timeInputType: 'exact', timeUnknown: false })}
              className={`py-3 px-4 rounded-xl font-medium text-sm transition-all ${
                formData.timeInputType === 'exact'
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white scale-105'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              ⏰ 정확한 시간을 알고 있어요
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, timeInputType: 'branch', timeUnknown: false, hour: 12, minute: 0 })}
              className={`py-3 px-4 rounded-xl font-medium text-sm transition-all ${
                formData.timeInputType === 'branch'
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white scale-105'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              🕐 대략적인 시간대는 알아요
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, timeInputType: 'unknown', timeUnknown: true, hour: 12, minute: 0 })}
              className={`py-3 px-4 rounded-xl font-medium text-sm transition-all ${
                formData.timeInputType === 'unknown'
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white scale-105'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              ❓ 시간을 모르겠어요 (정오로 계산)
            </button>
          </div>

          {/* 정확한 시간 입력 */}
          {formData.timeInputType === 'exact' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-2 text-center">시</label>
                <select
                  value={formData.hour}
                  onChange={(e) => setFormData({ ...formData, hour: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 text-center text-lg bg-slate-800/70 border border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none appearance-none cursor-pointer"
                >
                  {Array.from({ length: 24 }, (_, i) => i).map(hour => (
                    <option key={hour} value={hour}>{hour}시</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-2 text-center">분</label>
                <select
                  value={formData.minute}
                  onChange={(e) => setFormData({ ...formData, minute: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 text-center text-lg bg-slate-800/70 border border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none appearance-none cursor-pointer"
                >
                  {Array.from({ length: 60 }, (_, i) => i).map(minute => (
                    <option key={minute} value={minute}>{minute}분</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <button
              onClick={handleBack}
              className="flex-1 px-6 py-4 bg-slate-800 hover:bg-slate-700 rounded-xl font-semibold transition"
            >
              이전
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 rounded-xl font-bold text-lg btn-glow glow-gold transition"
            >
              운명 확인하기 ✨
            </button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4">
      {/* Progress Indicator */}
      {step > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md mb-8"
        >
          <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
            <span>단계 {step}/3</span>
            <span>{Math.round((step / 3) * 100)}%</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-amber-400"
              initial={{ width: 0 }}
              animate={{ width: `${(step / 3) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {step === 0 && <IntroStep />}
        {step === 1 && <NameStep />}
        {step === 2 && <BirthStep />}
        {step === 3 && <TimeStep />}
      </AnimatePresence>
    </div>
  );
}
