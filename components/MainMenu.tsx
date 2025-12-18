'use client';

import { motion } from 'framer-motion';
import { Sparkles, Heart, BookOpen } from 'lucide-react';

export type MenuOption = 'saju' | 'newyear2026' | 'compatibility' | 'tojeong2026';

interface MainMenuProps {
  onSelect: (option: MenuOption) => void;
}

export default function MainMenu({ onSelect }: MainMenuProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1
          className="text-4xl md:text-5xl font-bold mb-4 gradient-text"
          style={{ fontFamily: "'Noto Serif KR', serif" }}
        >
          운명을 읽다
        </h1>
        <p className="text-slate-300 text-lg">
          원하시는 서비스를 선택해주세요
        </p>
      </motion.div>

      {/* Menu Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full">
        {/* 만세력/사주 풀이 */}
        <motion.button
          onClick={() => onSelect('saju')}
          className="glass-strong rounded-3xl p-6 md:p-8 text-left group hover:scale-[1.02] transition-transform duration-300"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ boxShadow: '0 0 40px rgba(251, 191, 36, 0.2)' }}
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100">만세력</h2>
              <p className="text-amber-400 text-sm">사주 풀이</p>
            </div>
          </div>

          <p className="text-slate-300 text-sm mb-5 leading-relaxed">
            생년월일시를 기반으로 타고난 사주팔자를 분석합니다.
            오행의 균형, 용신, 대운까지 상세 풀이.
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            <span className="px-2 py-1 bg-amber-500/20 text-amber-300 text-xs rounded-full">사주팔자</span>
            <span className="px-2 py-1 bg-amber-500/20 text-amber-300 text-xs rounded-full">오행 분석</span>
            <span className="px-2 py-1 bg-amber-500/20 text-amber-300 text-xs rounded-full">대운/세운</span>
          </div>

          <div className="flex items-center text-amber-400 group-hover:translate-x-2 transition-transform">
            <span className="text-sm font-medium">시작하기</span>
            <span className="ml-2">→</span>
          </div>
        </motion.button>

        {/* 2026 신년운세 */}
        <motion.button
          onClick={() => onSelect('newyear2026')}
          className="glass-strong rounded-3xl p-6 md:p-8 text-left group hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ boxShadow: '0 0 40px rgba(239, 68, 68, 0.2)' }}
        >
          {/* NEW 뱃지 */}
          <div className="absolute top-4 right-4 px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
            NEW
          </div>

          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center shadow-lg">
              <span className="text-2xl">🐴</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100">2026 신년운세</h2>
              <p className="text-red-400 text-sm">병오년 (丙午年)</p>
            </div>
          </div>

          <p className="text-slate-300 text-sm mb-5 leading-relaxed">
            2026년 붉은 말의 해, 나에게 어떤 한 해가 될까요?
            월별 상세 운세와 맞춤 전략.
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            <span className="px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded-full">병오년</span>
            <span className="px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded-full">월별 운세</span>
            <span className="px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded-full">2026 전략</span>
          </div>

          <div className="flex items-center text-red-400 group-hover:translate-x-2 transition-transform">
            <span className="text-sm font-medium">2026년 운세 보기</span>
            <span className="ml-2">→</span>
          </div>
        </motion.button>

        {/* 궁합 보기 */}
        <motion.button
          onClick={() => onSelect('compatibility')}
          className="glass-strong rounded-3xl p-6 md:p-8 text-left group hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ boxShadow: '0 0 40px rgba(236, 72, 153, 0.2)' }}
        >
          {/* HOT 뱃지 */}
          <div className="absolute top-4 right-4 px-2 py-0.5 bg-pink-500 text-white text-xs font-bold rounded-full animate-pulse">
            HOT
          </div>

          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-lg">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100">궁합 보기</h2>
              <p className="text-pink-400 text-sm">사주 궁합 분석</p>
            </div>
          </div>

          <p className="text-slate-300 text-sm mb-5 leading-relaxed">
            두 사람의 사주를 비교 분석하여 궁합을 알려드립니다.
            연인, 부부, 친구 궁합 모두 OK!
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            <span className="px-2 py-1 bg-pink-500/20 text-pink-300 text-xs rounded-full">천간 궁합</span>
            <span className="px-2 py-1 bg-pink-500/20 text-pink-300 text-xs rounded-full">지지 궁합</span>
            <span className="px-2 py-1 bg-pink-500/20 text-pink-300 text-xs rounded-full">오행 조화</span>
          </div>

          <div className="flex items-center text-pink-400 group-hover:translate-x-2 transition-transform">
            <span className="text-sm font-medium">궁합 보러가기</span>
            <span className="ml-2">→</span>
          </div>
        </motion.button>

        {/* 2026 토정비결 */}
        <motion.button
          onClick={() => onSelect('tojeong2026')}
          className="glass-strong rounded-3xl p-6 md:p-8 text-left group hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          whileHover={{ boxShadow: '0 0 40px rgba(34, 197, 94, 0.2)' }}
        >
          {/* 전통 뱃지 */}
          <div className="absolute top-4 right-4 px-2 py-0.5 bg-emerald-600 text-white text-xs font-bold rounded-full">
            전통
          </div>

          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100">토정비결</h2>
              <p className="text-emerald-400 text-sm">2026 병오년</p>
            </div>
          </div>

          <p className="text-slate-300 text-sm mb-5 leading-relaxed">
            조선시대 토정 이지함 선생의 전통 비결서.
            월별 운세를 시(詩)로 풀어드립니다.
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-full">전통 비결</span>
            <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-full">월별 시(詩)</span>
            <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-full">2026 운세</span>
          </div>

          <div className="flex items-center text-emerald-400 group-hover:translate-x-2 transition-transform">
            <span className="text-sm font-medium">토정비결 보기</span>
            <span className="ml-2">→</span>
          </div>
        </motion.button>
      </div>

      {/* Footer hint */}
      <motion.p
        className="text-slate-500 text-sm mt-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        생년월일 정보를 바탕으로 운세를 분석합니다
      </motion.p>
    </div>
  );
}
