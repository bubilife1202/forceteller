'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, User, ChevronLeft, ChevronRight, Sparkles, Home, Calendar, Clock } from 'lucide-react';

export interface PersonData {
  name: string;
  gender: 'male' | 'female';
  year: number;
  month: number;
  day: number;
  hour: number;
  timeUnknown: boolean;
}

export interface CompatibilityFormData {
  person1: PersonData;
  person2: PersonData;
  relationshipType: 'lover' | 'spouse' | 'friend' | 'business';
}

interface CompatibilityFormProps {
  onSubmit: (data: CompatibilityFormData) => void;
  onBack?: () => void;
}

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
const months = Array.from({ length: 12 }, (_, i) => i + 1);
const hours = Array.from({ length: 24 }, (_, i) => i);

const hourLabels: Record<number, string> = {
  0: '자시 (23:30~01:30)',
  1: '축시 (01:30~03:30)',
  3: '인시 (03:30~05:30)',
  5: '묘시 (05:30~07:30)',
  7: '진시 (07:30~09:30)',
  9: '사시 (09:30~11:30)',
  11: '오시 (11:30~13:30)',
  13: '미시 (13:30~15:30)',
  15: '신시 (15:30~17:30)',
  17: '유시 (17:30~19:30)',
  19: '술시 (19:30~21:30)',
  21: '해시 (21:30~23:30)',
};

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

export default function CompatibilityForm({ onSubmit, onBack }: CompatibilityFormProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [relationshipType, setRelationshipType] = useState<'lover' | 'spouse' | 'friend' | 'business'>('lover');

  // 한글 입력을 위한 ref 사용
  const nameRef1 = useRef<HTMLInputElement>(null);
  const nameRef2 = useRef<HTMLInputElement>(null);

  const [person1, setPerson1] = useState<PersonData>({
    name: '',
    gender: 'male',
    year: 1990,
    month: 1,
    day: 1,
    hour: 12,
    timeUnknown: false,
  });

  const [person2, setPerson2] = useState<PersonData>({
    name: '',
    gender: 'female',
    year: 1990,
    month: 1,
    day: 1,
    hour: 12,
    timeUnknown: false,
  });

  const days1 = Array.from({ length: getDaysInMonth(person1.year, person1.month) }, (_, i) => i + 1);
  const days2 = Array.from({ length: getDaysInMonth(person2.year, person2.month) }, (_, i) => i + 1);

  const handleGoToStep2 = () => {
    if (nameRef1.current) {
      const name = nameRef1.current.value.trim();
      if (!name) return;
      setPerson1(prev => ({ ...prev, name }));
      setStep(2);
    }
  };

  const handleGoToStep3 = () => {
    if (nameRef2.current) {
      const name = nameRef2.current.value.trim();
      if (!name) return;
      setPerson2(prev => ({ ...prev, name }));
      setStep(3);
    }
  };

  const handleSubmit = () => {
    onSubmit({
      person1,
      person2,
      relationshipType,
    });
  };

  // 색상 클래스
  const blueClasses = { bg: 'bg-blue-500', text: 'text-blue-400', border: 'border-blue-500/30', ring: 'ring-blue-500' };
  const pinkClasses = { bg: 'bg-pink-500', text: 'text-pink-400', border: 'border-pink-500/30', ring: 'ring-pink-500' };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        className="w-full max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* 홈으로 버튼 */}
        {onBack && (
          <button
            onClick={onBack}
            className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>홈으로</span>
          </button>
        )}

        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-lg mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-100 mb-2">궁합 보기</h1>
          <p className="text-slate-400">두 사람의 정보를 입력해주세요</p>
        </div>

        {/* 진행 상태 */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-3 h-3 rounded-full transition-all ${
                s === step ? 'bg-pink-500 scale-125' : s < step ? 'bg-pink-500/50' : 'bg-slate-700'
              }`}
            />
          ))}
        </div>

        {/* 폼 */}
        <div className="glass-strong rounded-3xl p-6 md:p-8">
          <AnimatePresence mode="wait">
            {/* Step 1: 첫 번째 사람 */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-100">첫 번째 사람</h2>
                    <p className="text-slate-400 text-sm">본인 또는 궁합을 보고 싶은 첫 번째 사람</p>
                  </div>
                </div>

                {/* Person 1 Form - 인라인 */}
                <div className="space-y-6">
                  {/* 이름 */}
                  <div>
                    <label className={`block text-sm font-medium ${blueClasses.text} mb-2`}>
                      이름
                    </label>
                    <input
                      ref={nameRef1}
                      type="text"
                      defaultValue={person1.name}
                      placeholder="이름을 입력하세요"
                      className={`w-full px-4 py-3 bg-slate-800/50 border ${blueClasses.border} rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                    />
                  </div>

                  {/* 성별 */}
                  <div>
                    <label className={`block text-sm font-medium ${blueClasses.text} mb-2`}>
                      성별
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPerson1({ ...person1, gender: 'male' })}
                        className={`py-3 rounded-xl font-medium transition-all ${
                          person1.gender === 'male'
                            ? `${blueClasses.bg} text-white`
                            : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
                        }`}
                      >
                        남성
                      </button>
                      <button
                        type="button"
                        onClick={() => setPerson1({ ...person1, gender: 'female' })}
                        className={`py-3 rounded-xl font-medium transition-all ${
                          person1.gender === 'female'
                            ? `${blueClasses.bg} text-white`
                            : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
                        }`}
                      >
                        여성
                      </button>
                    </div>
                  </div>

                  {/* 생년월일 */}
                  <div>
                    <label className={`block text-sm font-medium ${blueClasses.text} mb-2`}>
                      <Calendar className="w-4 h-4 inline mr-1" />
                      생년월일
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <select
                        value={person1.year}
                        onChange={(e) => setPerson1({ ...person1, year: Number(e.target.value) })}
                        className={`px-3 py-3 bg-slate-800/50 border ${blueClasses.border} rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      >
                        {years.map((y) => (
                          <option key={y} value={y}>{y}년</option>
                        ))}
                      </select>
                      <select
                        value={person1.month}
                        onChange={(e) => setPerson1({ ...person1, month: Number(e.target.value) })}
                        className={`px-3 py-3 bg-slate-800/50 border ${blueClasses.border} rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      >
                        {months.map((m) => (
                          <option key={m} value={m}>{m}월</option>
                        ))}
                      </select>
                      <select
                        value={person1.day}
                        onChange={(e) => setPerson1({ ...person1, day: Number(e.target.value) })}
                        className={`px-3 py-3 bg-slate-800/50 border ${blueClasses.border} rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      >
                        {days1.map((d) => (
                          <option key={d} value={d}>{d}일</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* 태어난 시간 */}
                  <div>
                    <label className={`block text-sm font-medium ${blueClasses.text} mb-2`}>
                      <Clock className="w-4 h-4 inline mr-1" />
                      태어난 시간
                    </label>
                    <div className="space-y-2">
                      <select
                        value={person1.hour}
                        onChange={(e) => setPerson1({ ...person1, hour: Number(e.target.value) })}
                        disabled={person1.timeUnknown}
                        className={`w-full px-3 py-3 bg-slate-800/50 border ${blueClasses.border} rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50`}
                      >
                        {hours.map((h) => (
                          <option key={h} value={h}>
                            {h}시 {hourLabels[h] ? `(${hourLabels[h].split(' ')[0]})` : ''}
                          </option>
                        ))}
                      </select>
                      <label className="flex items-center gap-2 text-slate-400 text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          checked={person1.timeUnknown}
                          onChange={(e) => setPerson1({ ...person1, timeUnknown: e.target.checked })}
                          className="rounded border-slate-600"
                        />
                        시간을 모르겠어요
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleGoToStep2}
                  className="w-full mt-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl text-white font-bold hover:from-blue-600 hover:to-cyan-600 transition-all flex items-center justify-center gap-2"
                >
                  다음
                  <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {/* Step 2: 두 번째 사람 */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-100">두 번째 사람</h2>
                    <p className="text-slate-400 text-sm">궁합을 보고 싶은 상대방</p>
                  </div>
                </div>

                {/* Person 2 Form - 인라인 */}
                <div className="space-y-6">
                  {/* 이름 */}
                  <div>
                    <label className={`block text-sm font-medium ${pinkClasses.text} mb-2`}>
                      이름
                    </label>
                    <input
                      ref={nameRef2}
                      type="text"
                      defaultValue={person2.name}
                      placeholder="이름을 입력하세요"
                      className={`w-full px-4 py-3 bg-slate-800/50 border ${pinkClasses.border} rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all`}
                    />
                  </div>

                  {/* 성별 */}
                  <div>
                    <label className={`block text-sm font-medium ${pinkClasses.text} mb-2`}>
                      성별
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPerson2({ ...person2, gender: 'male' })}
                        className={`py-3 rounded-xl font-medium transition-all ${
                          person2.gender === 'male'
                            ? `${pinkClasses.bg} text-white`
                            : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
                        }`}
                      >
                        남성
                      </button>
                      <button
                        type="button"
                        onClick={() => setPerson2({ ...person2, gender: 'female' })}
                        className={`py-3 rounded-xl font-medium transition-all ${
                          person2.gender === 'female'
                            ? `${pinkClasses.bg} text-white`
                            : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
                        }`}
                      >
                        여성
                      </button>
                    </div>
                  </div>

                  {/* 생년월일 */}
                  <div>
                    <label className={`block text-sm font-medium ${pinkClasses.text} mb-2`}>
                      <Calendar className="w-4 h-4 inline mr-1" />
                      생년월일
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <select
                        value={person2.year}
                        onChange={(e) => setPerson2({ ...person2, year: Number(e.target.value) })}
                        className={`px-3 py-3 bg-slate-800/50 border ${pinkClasses.border} rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-500`}
                      >
                        {years.map((y) => (
                          <option key={y} value={y}>{y}년</option>
                        ))}
                      </select>
                      <select
                        value={person2.month}
                        onChange={(e) => setPerson2({ ...person2, month: Number(e.target.value) })}
                        className={`px-3 py-3 bg-slate-800/50 border ${pinkClasses.border} rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-500`}
                      >
                        {months.map((m) => (
                          <option key={m} value={m}>{m}월</option>
                        ))}
                      </select>
                      <select
                        value={person2.day}
                        onChange={(e) => setPerson2({ ...person2, day: Number(e.target.value) })}
                        className={`px-3 py-3 bg-slate-800/50 border ${pinkClasses.border} rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-500`}
                      >
                        {days2.map((d) => (
                          <option key={d} value={d}>{d}일</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* 태어난 시간 */}
                  <div>
                    <label className={`block text-sm font-medium ${pinkClasses.text} mb-2`}>
                      <Clock className="w-4 h-4 inline mr-1" />
                      태어난 시간
                    </label>
                    <div className="space-y-2">
                      <select
                        value={person2.hour}
                        onChange={(e) => setPerson2({ ...person2, hour: Number(e.target.value) })}
                        disabled={person2.timeUnknown}
                        className={`w-full px-3 py-3 bg-slate-800/50 border ${pinkClasses.border} rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50`}
                      >
                        {hours.map((h) => (
                          <option key={h} value={h}>
                            {h}시 {hourLabels[h] ? `(${hourLabels[h].split(' ')[0]})` : ''}
                          </option>
                        ))}
                      </select>
                      <label className="flex items-center gap-2 text-slate-400 text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          checked={person2.timeUnknown}
                          onChange={(e) => setPerson2({ ...person2, timeUnknown: e.target.checked })}
                          className="rounded border-slate-600"
                        />
                        시간을 모르겠어요
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-4 bg-slate-700/50 rounded-2xl text-slate-300 font-medium hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    이전
                  </button>
                  <button
                    onClick={handleGoToStep3}
                    className="flex-1 py-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl text-white font-bold hover:from-pink-600 hover:to-rose-600 transition-all flex items-center justify-center gap-2"
                  >
                    다음
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: 관계 유형 선택 */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <div className="text-center mb-6">
                  <h2 className="text-lg font-bold text-slate-100 mb-2">두 분의 관계는?</h2>
                  <p className="text-slate-400 text-sm">관계에 맞는 궁합 분석을 제공해드립니다</p>
                </div>

                {/* 관계 요약 */}
                <div className="flex items-center justify-center gap-4 mb-6 p-4 bg-slate-800/50 rounded-2xl">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center mb-1">
                      <span className="text-blue-400 font-bold">{person1.name.charAt(0) || '?'}</span>
                    </div>
                    <p className="text-sm text-slate-300">{person1.name || '첫 번째'}</p>
                  </div>
                  <Heart className="w-6 h-6 text-pink-400" />
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto rounded-full bg-pink-500/20 flex items-center justify-center mb-1">
                      <span className="text-pink-400 font-bold">{person2.name.charAt(0) || '?'}</span>
                    </div>
                    <p className="text-sm text-slate-300">{person2.name || '두 번째'}</p>
                  </div>
                </div>

                {/* 관계 유형 선택 */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { value: 'lover', label: '연인', icon: '💑', desc: '사귀는 중' },
                    { value: 'spouse', label: '부부', icon: '💍', desc: '결혼 예정/기혼' },
                    { value: 'friend', label: '친구', icon: '🤝', desc: '우정 궁합' },
                    { value: 'business', label: '사업', icon: '💼', desc: '동업/파트너' },
                  ].map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setRelationshipType(type.value as typeof relationshipType)}
                      className={`p-4 rounded-2xl text-left transition-all ${
                        relationshipType === type.value
                          ? 'bg-pink-500/20 border-2 border-pink-500'
                          : 'bg-slate-800/50 border-2 border-transparent hover:bg-slate-700/50'
                      }`}
                    >
                      <span className="text-2xl">{type.icon}</span>
                      <p className="font-bold text-slate-100 mt-2">{type.label}</p>
                      <p className="text-xs text-slate-400">{type.desc}</p>
                    </button>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 py-4 bg-slate-700/50 rounded-2xl text-slate-300 font-medium hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    이전
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 py-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl text-white font-bold hover:from-pink-600 hover:to-rose-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    궁합 분석하기
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
