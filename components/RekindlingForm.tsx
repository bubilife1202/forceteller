'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowLeft, Sparkles, Users } from 'lucide-react';

export interface RekindlingFormData {
  // 본인 정보
  myName: string;
  myYear: number;
  myMonth: number;
  myDay: number;
  myGender: 'male' | 'female';
  // 상대방 정보
  partnerName: string;
  partnerYear: number;
  partnerMonth: number;
  partnerDay: number;
  partnerGender: 'male' | 'female';
  // 관계 정보
  relationshipType: 'lover' | 'spouse' | 'friend';
  separationMonths: number;
  separationReason: 'fight' | 'distance' | 'timing' | 'family' | 'cheating' | 'other';
  currentFeelings: 'miss' | 'regret' | 'confused' | 'hopeful';
}

interface RekindlingFormProps {
  onSubmit: (data: RekindlingFormData) => void;
  onBack: () => void;
}

export default function RekindlingForm({ onSubmit, onBack }: RekindlingFormProps) {
  const currentYear = new Date().getFullYear();
  const [step, setStep] = useState<'my' | 'partner' | 'relation'>('my');
  const [formData, setFormData] = useState<RekindlingFormData>({
    myName: '',
    myYear: 1990,
    myMonth: 1,
    myDay: 1,
    myGender: 'female',
    partnerName: '',
    partnerYear: 1990,
    partnerMonth: 1,
    partnerDay: 1,
    partnerGender: 'male',
    relationshipType: 'lover',
    separationMonths: 6,
    separationReason: 'fight',
    currentFeelings: 'miss',
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

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const myDaysInMonth = getDaysInMonth(formData.myYear, formData.myMonth);
  const partnerDaysInMonth = getDaysInMonth(formData.partnerYear, formData.partnerMonth);

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
          onClick={step === 'my' ? onBack : () => setStep(step === 'relation' ? 'partner' : 'my')}
          className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{step === 'my' ? '메뉴로 돌아가기' : '이전 단계'}</span>
        </motion.button>

        {/* 헤더 */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-rose-400 to-pink-600 flex items-center justify-center shadow-lg mb-4">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            재회 운세
          </h1>
          <p className="text-pink-400">다시 만날 수 있을까요?</p>
        </motion.div>

        {/* 진행 표시 */}
        <motion.div variants={itemVariants} className="flex justify-center gap-2 mb-6">
          {['my', 'partner', 'relation'].map((s, i) => (
            <div
              key={s}
              className={`w-3 h-3 rounded-full transition-colors ${
                s === step ? 'bg-pink-500' :
                (['my', 'partner', 'relation'].indexOf(step) > i ? 'bg-pink-500/50' : 'bg-slate-600')
              }`}
            />
          ))}
        </motion.div>

        {/* Step 1: 내 정보 */}
        {step === 'my' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-6 mb-6">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-xl">👤</span>
                내 정보
              </h2>

              <div className="space-y-4">
                {/* 이름 */}
                <div>
                  <label className="block text-slate-300 text-sm mb-2">이름 (닉네임)</label>
                  <input
                    type="text"
                    placeholder="이름을 입력하세요"
                    value={formData.myName}
                    onChange={(e) => setFormData({ ...formData, myName: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-pink-400 transition-colors"
                    maxLength={10}
                  />
                </div>

                {/* 성별 */}
                <div>
                  <label className="block text-slate-300 text-sm mb-2">성별</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'female', label: '여성', emoji: '👩' },
                      { value: 'male', label: '남성', emoji: '👨' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setFormData({ ...formData, myGender: option.value as 'male' | 'female' })}
                        className={`px-4 py-3 rounded-xl border transition-all flex items-center justify-center gap-2 ${
                          formData.myGender === option.value
                            ? 'bg-pink-500/30 border-pink-400 text-pink-300'
                            : 'bg-slate-800/50 border-slate-600 text-slate-300 hover:border-slate-500'
                        }`}
                      >
                        <span>{option.emoji}</span>
                        <span>{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 년도 */}
                <div>
                  <label className="block text-slate-300 text-sm mb-2">생년</label>
                  <select
                    value={formData.myYear}
                    onChange={(e) => setFormData({ ...formData, myYear: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-pink-400 transition-colors"
                  >
                    {Array.from({ length: 80 }, (_, i) => currentYear - 15 - i).map((year) => (
                      <option key={year} value={year}>{year}년</option>
                    ))}
                  </select>
                </div>

                {/* 월, 일 */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 text-sm mb-2">월</label>
                    <select
                      value={formData.myMonth}
                      onChange={(e) => setFormData({ ...formData, myMonth: parseInt(e.target.value), myDay: 1 })}
                      className="w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-pink-400 transition-colors"
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                        <option key={month} value={month}>{month}월</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 text-sm mb-2">일</label>
                    <select
                      value={formData.myDay}
                      onChange={(e) => setFormData({ ...formData, myDay: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-pink-400 transition-colors"
                    >
                      {Array.from({ length: myDaysInMonth }, (_, i) => i + 1).map((day) => (
                        <option key={day} value={day}>{day}일</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <button
                onClick={() => setStep('partner')}
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl text-white font-bold text-lg hover:from-pink-600 hover:to-rose-700 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                다음 단계
                <span>→</span>
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Step 2: 상대방 정보 */}
        {step === 'partner' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-6 mb-6">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-xl">💕</span>
                상대방 정보
              </h2>

              <div className="space-y-4">
                {/* 이름 */}
                <div>
                  <label className="block text-slate-300 text-sm mb-2">상대방 이름 (닉네임)</label>
                  <input
                    type="text"
                    placeholder="상대방 이름을 입력하세요"
                    value={formData.partnerName}
                    onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-pink-400 transition-colors"
                    maxLength={10}
                  />
                </div>

                {/* 성별 */}
                <div>
                  <label className="block text-slate-300 text-sm mb-2">성별</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'male', label: '남성', emoji: '👨' },
                      { value: 'female', label: '여성', emoji: '👩' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setFormData({ ...formData, partnerGender: option.value as 'male' | 'female' })}
                        className={`px-4 py-3 rounded-xl border transition-all flex items-center justify-center gap-2 ${
                          formData.partnerGender === option.value
                            ? 'bg-pink-500/30 border-pink-400 text-pink-300'
                            : 'bg-slate-800/50 border-slate-600 text-slate-300 hover:border-slate-500'
                        }`}
                      >
                        <span>{option.emoji}</span>
                        <span>{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 년도 */}
                <div>
                  <label className="block text-slate-300 text-sm mb-2">생년</label>
                  <select
                    value={formData.partnerYear}
                    onChange={(e) => setFormData({ ...formData, partnerYear: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-pink-400 transition-colors"
                  >
                    {Array.from({ length: 80 }, (_, i) => currentYear - 15 - i).map((year) => (
                      <option key={year} value={year}>{year}년</option>
                    ))}
                  </select>
                </div>

                {/* 월, 일 */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 text-sm mb-2">월</label>
                    <select
                      value={formData.partnerMonth}
                      onChange={(e) => setFormData({ ...formData, partnerMonth: parseInt(e.target.value), partnerDay: 1 })}
                      className="w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-pink-400 transition-colors"
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                        <option key={month} value={month}>{month}월</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 text-sm mb-2">일</label>
                    <select
                      value={formData.partnerDay}
                      onChange={(e) => setFormData({ ...formData, partnerDay: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-pink-400 transition-colors"
                    >
                      {Array.from({ length: partnerDaysInMonth }, (_, i) => i + 1).map((day) => (
                        <option key={day} value={day}>{day}일</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <button
                onClick={() => setStep('relation')}
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl text-white font-bold text-lg hover:from-pink-600 hover:to-rose-700 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                다음 단계
                <span>→</span>
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Step 3: 관계 정보 */}
        {step === 'relation' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-6 mb-6">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                관계 정보
              </h2>

              <div className="space-y-4">
                {/* 관계 유형 */}
                <div>
                  <label className="block text-slate-300 text-sm mb-2">어떤 관계였나요?</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'lover', label: '연인', emoji: '💑' },
                      { value: 'spouse', label: '부부', emoji: '💍' },
                      { value: 'friend', label: '썸/친구', emoji: '🤝' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setFormData({ ...formData, relationshipType: option.value as 'lover' | 'spouse' | 'friend' })}
                        className={`px-3 py-3 rounded-xl border transition-all flex flex-col items-center gap-1 ${
                          formData.relationshipType === option.value
                            ? 'bg-pink-500/30 border-pink-400 text-pink-300'
                            : 'bg-slate-800/50 border-slate-600 text-slate-300 hover:border-slate-500'
                        }`}
                      >
                        <span className="text-xl">{option.emoji}</span>
                        <span className="text-sm">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 헤어진 기간 */}
                <div>
                  <label className="block text-slate-300 text-sm mb-2">헤어진 지 얼마나 되었나요?</label>
                  <select
                    value={formData.separationMonths}
                    onChange={(e) => setFormData({ ...formData, separationMonths: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-pink-400 transition-colors"
                  >
                    <option value={1}>1개월 미만</option>
                    <option value={3}>1~3개월</option>
                    <option value={6}>3~6개월</option>
                    <option value={12}>6개월~1년</option>
                    <option value={24}>1~2년</option>
                    <option value={36}>2~3년</option>
                    <option value={60}>3년 이상</option>
                  </select>
                </div>

                {/* 이별 사유 */}
                <div>
                  <label className="block text-slate-300 text-sm mb-2">이별의 주된 이유는?</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'fight', label: '성격 차이/다툼', emoji: '💔' },
                      { value: 'distance', label: '거리/시간 부족', emoji: '🌍' },
                      { value: 'timing', label: '타이밍이 안맞음', emoji: '⏰' },
                      { value: 'family', label: '가족/주변 반대', emoji: '👨‍👩‍👧' },
                      { value: 'cheating', label: '외도/신뢰 문제', emoji: '😢' },
                      { value: 'other', label: '기타/잘 모름', emoji: '❓' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setFormData({ ...formData, separationReason: option.value as typeof formData.separationReason })}
                        className={`px-3 py-2 rounded-xl border transition-all text-left ${
                          formData.separationReason === option.value
                            ? 'bg-pink-500/30 border-pink-400 text-pink-300'
                            : 'bg-slate-800/50 border-slate-600 text-slate-300 hover:border-slate-500'
                        }`}
                      >
                        <span className="text-sm">{option.emoji} {option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 현재 마음 */}
                <div>
                  <label className="block text-slate-300 text-sm mb-2">지금 어떤 마음인가요?</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'miss', label: '너무 보고싶어요', emoji: '😭' },
                      { value: 'regret', label: '후회가 돼요', emoji: '😔' },
                      { value: 'confused', label: '혼란스러워요', emoji: '😵' },
                      { value: 'hopeful', label: '다시 만나고 싶어요', emoji: '🥺' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setFormData({ ...formData, currentFeelings: option.value as typeof formData.currentFeelings })}
                        className={`px-3 py-2 rounded-xl border transition-all text-left ${
                          formData.currentFeelings === option.value
                            ? 'bg-pink-500/30 border-pink-400 text-pink-300'
                            : 'bg-slate-800/50 border-slate-600 text-slate-300 hover:border-slate-500'
                        }`}
                      >
                        <span className="text-sm">{option.emoji} {option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <button
                onClick={handleSubmit}
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl text-white font-bold text-lg hover:from-pink-600 hover:to-rose-700 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Sparkles className="w-5 h-5" />
                재회 운세 보기
              </button>
              <p className="text-slate-500 text-xs text-center mt-3">
                두 사람의 사주 궁합과 현재 운의 흐름을 분석합니다
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
