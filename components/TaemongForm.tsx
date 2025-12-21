'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Baby, Sparkles } from 'lucide-react';

export interface TaemongFormData {
  name: string;
  dreamContent: string;
  dreamCategory: string;
  dreamer: string;
}

interface TaemongFormProps {
  onSubmit: (data: TaemongFormData) => void;
  onBack: () => void;
}

// 태몽 카테고리
const dreamCategories = [
  { id: 'animal', name: '동물', icon: '🐉', examples: '용, 뱀, 호랑이, 돼지, 잉어' },
  { id: 'plant', name: '식물', icon: '🌸', examples: '꽃, 열매, 나무, 씨앗' },
  { id: 'nature', name: '자연현상', icon: '🌟', examples: '해, 달, 별, 무지개, 천둥' },
  { id: 'object', name: '물건', icon: '💎', examples: '보석, 금, 귀걸이, 비단' },
  { id: 'person', name: '사람', icon: '👤', examples: '신선, 스님, 아기, 조상' },
  { id: 'other', name: '기타', icon: '✨', examples: '기타 태몽 내용' },
];

// 꿈을 꾼 사람
const dreamers = [
  { id: 'self', name: '본인 (임신부)', icon: '🤰' },
  { id: 'spouse', name: '배우자', icon: '👨' },
  { id: 'parent', name: '부모님', icon: '👵' },
  { id: 'relative', name: '친척', icon: '👪' },
  { id: 'other', name: '기타', icon: '👥' },
];

export default function TaemongForm({ onSubmit, onBack }: TaemongFormProps) {
  const [name, setName] = useState('');
  const [dreamContent, setDreamContent] = useState('');
  const [dreamCategory, setDreamCategory] = useState('');
  const [dreamer, setDreamer] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = '이름을 입력해주세요';
    }

    if (!dreamContent.trim()) {
      newErrors.dreamContent = '태몽 내용을 입력해주세요';
    } else if (dreamContent.trim().length < 10) {
      newErrors.dreamContent = '태몽을 좀 더 자세히 설명해주세요 (최소 10자)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        name: name.trim(),
        dreamContent: dreamContent.trim(),
        dreamCategory: dreamCategory || 'other',
        dreamer: dreamer || 'self',
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
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center shadow-lg mb-4">
            <Baby className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            태몽해설
          </h1>
          <p className="text-pink-400">아기의 미래를 예측하는 신비로운 태몽 풀이</p>
        </motion.div>

        {/* 안내 메시지 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-6 mb-6">
          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span className="text-xl">🌟</span>
            태몽이란?
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-3">
            태몽(胎夢)은 임신과 출산을 예고하는 꿈으로, 아기의 성별, 성격, 재능, 미래 운명을
            암시한다고 전해집니다. 본인뿐만 아니라 가족이나 친척이 꾼 꿈도 태몽이 될 수 있습니다.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full">
              전통 태몽 해몽
            </span>
            <span className="text-xs px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full">
              성별 예측
            </span>
            <span className="text-xs px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full">
              미래 운명
            </span>
          </div>
        </motion.div>

        {/* 이름 입력 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-6 mb-6">
          <label className="block text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-xl">👶</span>
            태어날 아기 이름 (또는 태명)
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors({ ...errors, name: '' });
            }}
            placeholder="예: 민준, 서윤, 복동이"
            className={`w-full px-4 py-3 bg-slate-800/80 border ${
              errors.name ? 'border-red-400' : 'border-slate-600'
            } rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-pink-400 transition-colors`}
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-2">{errors.name}</p>
          )}
        </motion.div>

        {/* 태몽 내용 입력 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-6 mb-6">
          <label className="block text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-xl">💭</span>
            태몽 내용
          </label>
          <textarea
            value={dreamContent}
            onChange={(e) => {
              setDreamContent(e.target.value);
              if (errors.dreamContent) setErrors({ ...errors, dreamContent: '' });
            }}
            placeholder="꿈에서 본 것을 자세히 적어주세요. 예: 황금색 용이 하늘에서 내려와 제 품에 안겼어요. 용의 눈이 너무 인자하고 따뜻했습니다."
            rows={6}
            className={`w-full px-4 py-3 bg-slate-800/80 border ${
              errors.dreamContent ? 'border-red-400' : 'border-slate-600'
            } rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-pink-400 transition-colors resize-none`}
          />
          {errors.dreamContent && (
            <p className="text-red-400 text-sm mt-2">{errors.dreamContent}</p>
          )}
          <div className="flex justify-between mt-2">
            <p className="text-slate-500 text-xs">
              색깔, 느낌, 상황 등을 구체적으로 적어주세요
            </p>
            <p className={`text-xs ${dreamContent.length < 10 ? 'text-slate-500' : 'text-pink-400'}`}>
              {dreamContent.length}자
            </p>
          </div>
        </motion.div>

        {/* 태몽 카테고리 선택 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-xl">📂</span>
            태몽 종류 (선택사항)
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {dreamCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setDreamCategory(dreamCategory === cat.id ? '' : cat.id)}
                className={`p-4 rounded-xl text-center transition-all ${
                  dreamCategory === cat.id
                    ? 'bg-pink-500/30 border-2 border-pink-400'
                    : 'bg-slate-800/50 border-2 border-transparent hover:bg-slate-700/50'
                }`}
              >
                <div className="text-3xl mb-1">{cat.icon}</div>
                <div className="text-sm text-slate-300">{cat.name}</div>
              </button>
            ))}
          </div>
          {dreamCategory && (
            <p className="text-slate-400 text-xs mt-3 text-center">
              예시: {dreamCategories.find(c => c.id === dreamCategory)?.examples}
            </p>
          )}
        </motion.div>

        {/* 꿈을 꾼 사람 선택 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-xl">👥</span>
            누가 꾸었나요? (선택사항)
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {dreamers.map((person) => (
              <button
                key={person.id}
                onClick={() => setDreamer(dreamer === person.id ? '' : person.id)}
                className={`p-4 rounded-xl text-left flex items-center gap-3 transition-all ${
                  dreamer === person.id
                    ? 'bg-purple-500/30 border-2 border-purple-400'
                    : 'bg-slate-800/50 border-2 border-transparent hover:bg-slate-700/50'
                }`}
              >
                <span className="text-2xl">{person.icon}</span>
                <span className="text-sm text-slate-300">{person.name}</span>
              </button>
            ))}
          </div>
          <p className="text-slate-500 text-xs mt-3">
            * 가족이나 친척이 꾼 꿈도 태몽이 될 수 있습니다
          </p>
        </motion.div>

        {/* 해몽 시작 버튼 */}
        <motion.div variants={itemVariants}>
          <button
            onClick={handleSubmit}
            className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl text-white font-bold text-lg hover:from-pink-600 hover:to-purple-700 transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <Sparkles className="w-5 h-5" />
            태몽 풀이 시작
          </button>
          <p className="text-slate-500 text-xs text-center mt-3">
            전통 태몽 해몽서를 기반으로 아기의 미래를 예측합니다
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
