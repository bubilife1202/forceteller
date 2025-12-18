'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';

export interface TarotFormData {
  question: string;
  category: 'general' | 'love' | 'money' | 'work' | 'health';
}

interface TarotFormProps {
  onSubmit: (data: TarotFormData) => void;
  onBack: () => void;
}

const categories = [
  { id: 'general', name: '오늘의 운세', emoji: '🔮', color: 'purple' },
  { id: 'love', name: '연애/애정', emoji: '💕', color: 'pink' },
  { id: 'money', name: '재물/금전', emoji: '💰', color: 'yellow' },
  { id: 'work', name: '직장/사업', emoji: '💼', color: 'blue' },
  { id: 'health', name: '건강/컨디션', emoji: '💪', color: 'green' },
];

export default function TarotForm({ onSubmit, onBack }: TarotFormProps) {
  const [step, setStep] = useState<'intro' | 'category' | 'focus'>('intro');
  const [category, setCategory] = useState<TarotFormData['category']>('general');
  const [question, setQuestion] = useState('');

  const handleCategorySelect = (cat: TarotFormData['category']) => {
    setCategory(cat);
    setStep('focus');
  };

  const handleSubmit = () => {
    onSubmit({ question, category });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <AnimatePresence mode="wait">
        {/* 인트로 화면 */}
        {step === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-md w-full text-center"
          >
            {/* 뒤로가기 */}
            <motion.button
              onClick={onBack}
              className="absolute top-6 left-6 p-2 rounded-full bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>

            <motion.div
              className="text-8xl mb-8"
              animate={{
                rotateY: [0, 180, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            >
              🃏
            </motion.div>

            <h1
              className="text-3xl font-bold text-white mb-4"
              style={{ fontFamily: "'Noto Serif KR', serif" }}
            >
              오늘의 타로
            </h1>

            <p className="text-slate-300 mb-8">
              22장의 메이저 아르카나 중<br />
              오늘 당신에게 전하는 카드 한 장
            </p>

            <div className="glass-strong rounded-2xl p-6 mb-8">
              <div className="flex justify-center gap-4 mb-4">
                {['🌟', '🔮', '⭐'].map((emoji, i) => (
                  <motion.span
                    key={i}
                    className="text-2xl"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                  >
                    {emoji}
                  </motion.span>
                ))}
              </div>
              <p className="text-slate-400 text-sm">
                타로는 당신의 무의식이 선택합니다.<br />
                마음을 가다듬고 시작하세요.
              </p>
            </div>

            <motion.button
              onClick={() => setStep('category')}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl text-white font-bold text-lg shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Sparkles className="w-5 h-5 inline mr-2" />
              타로 시작하기
            </motion.button>
          </motion.div>
        )}

        {/* 카테고리 선택 */}
        {step === 'category' && (
          <motion.div
            key="category"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-md w-full"
          >
            <motion.button
              onClick={() => setStep('intro')}
              className="mb-6 p-2 rounded-full bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>

            <h2
              className="text-2xl font-bold text-white mb-2 text-center"
              style={{ fontFamily: "'Noto Serif KR', serif" }}
            >
              어떤 주제로 볼까요?
            </h2>
            <p className="text-slate-400 text-center mb-8">
              궁금한 분야를 선택하세요
            </p>

            <div className="space-y-3">
              {categories.map((cat, index) => (
                <motion.button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id as TarotFormData['category'])}
                  className="w-full glass-strong rounded-2xl p-5 text-left flex items-center gap-4 hover:scale-[1.02] transition-transform"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ boxShadow: '0 0 30px rgba(139, 92, 246, 0.2)' }}
                >
                  <span className="text-3xl">{cat.emoji}</span>
                  <div>
                    <div className="text-white font-bold">{cat.name}</div>
                    <div className="text-slate-400 text-sm">
                      {cat.id === 'general' && '오늘 하루 전반적인 운세'}
                      {cat.id === 'love' && '연애, 결혼, 인간관계'}
                      {cat.id === 'money' && '재물, 투자, 금전운'}
                      {cat.id === 'work' && '취업, 승진, 사업운'}
                      {cat.id === 'health' && '건강, 컨디션, 에너지'}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* 마음 집중 */}
        {step === 'focus' && (
          <motion.div
            key="focus"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-md w-full text-center"
          >
            <motion.button
              onClick={() => setStep('category')}
              className="absolute top-6 left-6 p-2 rounded-full bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>

            <motion.div
              className="text-6xl mb-6"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.8, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {categories.find(c => c.id === category)?.emoji}
            </motion.div>

            <h2
              className="text-2xl font-bold text-white mb-2"
              style={{ fontFamily: "'Noto Serif KR', serif" }}
            >
              마음을 집중하세요
            </h2>
            <p className="text-slate-400 mb-8">
              {categories.find(c => c.id === category)?.name}에 대해<br />
              궁금한 것을 떠올려보세요
            </p>

            <div className="glass-strong rounded-2xl p-6 mb-6">
              <label className="block text-slate-300 text-sm mb-3 text-left">
                질문이나 고민 (선택사항)
              </label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="예: 이번 달 재물운이 어떨까요?"
                className="w-full bg-slate-800/50 border border-slate-600 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 resize-none"
                rows={3}
              />
              <p className="text-slate-500 text-xs mt-2 text-left">
                * 입력하지 않아도 됩니다
              </p>
            </div>

            <motion.button
              onClick={handleSubmit}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl text-white font-bold text-lg shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              🃏 카드 뽑기
            </motion.button>

            <p className="text-slate-500 text-xs mt-4">
              준비가 되면 버튼을 누르세요
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
