'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Cloud, ArrowLeft, Search, Sparkles } from 'lucide-react';

export interface DreamFormData {
  category: string;
  keywords: string[];
  description: string;
}

interface DreamFormProps {
  onSubmit: (data: DreamFormData) => void;
  onBack: () => void;
}

// 꿈 카테고리
const dreamCategories = [
  { id: 'animal', name: '동물', icon: '🐾', examples: '뱀, 돼지, 호랑이, 개, 고양이' },
  { id: 'nature', name: '자연', icon: '🌿', examples: '물, 불, 산, 바다, 꽃, 나무' },
  { id: 'people', name: '사람', icon: '👥', examples: '돌아가신 분, 연인, 가족, 낯선 사람' },
  { id: 'action', name: '행동/상황', icon: '🏃', examples: '떨어지다, 쫓기다, 날다, 싸우다' },
  { id: 'object', name: '사물', icon: '💎', examples: '돈, 금, 보석, 옷, 차, 집' },
  { id: 'body', name: '신체', icon: '🦷', examples: '이빨, 머리카락, 손, 피, 임신' },
  { id: 'food', name: '음식', icon: '🍚', examples: '밥, 과일, 고기, 술, 물' },
  { id: 'other', name: '기타', icon: '✨', examples: '기타 꿈 내용' },
];

// 인기 키워드
const popularKeywords = [
  '뱀', '돼지', '호랑이', '물', '죽은 사람', '이빨 빠지는', '돈',
  '임신', '불', '쫓기는', '날아다니는', '결혼', '아기', '시험',
];

export default function DreamForm({ onSubmit, onBack }: DreamFormProps) {
  const [category, setCategory] = useState<string>('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [customKeyword, setCustomKeyword] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeywordToggle = (keyword: string) => {
    if (keywords.includes(keyword)) {
      setKeywords(keywords.filter(k => k !== keyword));
    } else if (keywords.length < 5) {
      setKeywords([...keywords, keyword]);
    }
  };

  const handleAddCustomKeyword = () => {
    const trimmed = customKeyword.trim();
    if (trimmed && !keywords.includes(trimmed) && keywords.length < 5) {
      setKeywords([...keywords, trimmed]);
      setCustomKeyword('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCustomKeyword();
    }
  };

  const handleSubmit = () => {
    if (keywords.length > 0) {
      onSubmit({
        category: category || 'other',
        keywords,
        description: keywords.join(', '),
      });
    }
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

  return (
    <motion.div
      className="min-h-screen py-8 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-2xl mx-auto">
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
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center shadow-lg mb-4">
            <Cloud className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            꿈해몽
          </h1>
          <p className="text-violet-400">간밤에 꾼 꿈을 풀어드립니다</p>
        </motion.div>

        {/* 카테고리 선택 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-xl">📂</span>
            꿈의 종류 (선택사항)
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {dreamCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(category === cat.id ? '' : cat.id)}
                className={`p-3 rounded-xl text-center transition-all ${
                  category === cat.id
                    ? 'bg-violet-500/30 border-2 border-violet-400'
                    : 'bg-slate-800/50 border-2 border-transparent hover:bg-slate-700/50'
                }`}
              >
                <div className="text-2xl mb-1">{cat.icon}</div>
                <div className="text-xs text-slate-300">{cat.name}</div>
              </button>
            ))}
          </div>
          {category && (
            <p className="text-slate-400 text-xs mt-3 text-center">
              예시: {dreamCategories.find(c => c.id === category)?.examples}
            </p>
          )}
        </motion.div>

        {/* 키워드 입력 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Search className="w-5 h-5 text-violet-400" />
            꿈에서 본 것 (키워드)
          </h2>

          <p className="text-slate-400 text-sm mb-4">
            꿈에서 기억나는 것들을 선택하거나 직접 입력하세요 (최대 5개)
          </p>

          {/* 인기 키워드 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {popularKeywords.map((keyword) => (
              <button
                key={keyword}
                onClick={() => handleKeywordToggle(keyword)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  keywords.includes(keyword)
                    ? 'bg-violet-500 text-white'
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
                }`}
              >
                {keyword}
              </button>
            ))}
          </div>

          {/* 직접 입력 */}
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={customKeyword}
              onChange={(e) => setCustomKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="직접 입력 (예: 검은 고양이)"
              className="flex-1 px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-400 transition-colors"
            />
            <button
              onClick={handleAddCustomKeyword}
              disabled={!customKeyword.trim() || keywords.length >= 5}
              className="px-4 py-3 bg-violet-500/20 text-violet-300 rounded-xl hover:bg-violet-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              추가
            </button>
          </div>

          {/* 선택된 키워드 */}
          {keywords.length > 0 && (
            <div className="mt-4 p-4 bg-slate-800/50 rounded-xl">
              <p className="text-slate-400 text-xs mb-2">선택된 키워드 ({keywords.length}/5)</p>
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="px-3 py-1.5 bg-violet-500/30 text-violet-300 rounded-full text-sm flex items-center gap-2"
                  >
                    {keyword}
                    <button
                      onClick={() => setKeywords(keywords.filter(k => k !== keyword))}
                      className="hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* 해몽 시작 버튼 */}
        <motion.div variants={itemVariants}>
          <button
            onClick={handleSubmit}
            disabled={keywords.length === 0}
            className="w-full py-4 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl text-white font-bold text-lg hover:from-violet-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
          >
            <Sparkles className="w-5 h-5" />
            꿈 풀이 시작
          </button>
          <p className="text-slate-500 text-xs text-center mt-3">
            전통 해몽서를 기반으로 꿈의 의미를 분석합니다
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
