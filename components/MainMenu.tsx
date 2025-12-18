'use client';

import { motion } from 'framer-motion';
import { Sparkles, Heart, BookOpen, Cloud, Sun, Calendar, Coins } from 'lucide-react';

export type MenuOption = 'saju' | 'newyear2026' | 'compatibility' | 'tojeong2026' | 'dream' | 'daily' | 'rekindling' | 'monthly' | 'tarot' | 'wealth';

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

      {/* Menu Cards - 인기순 정렬 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl w-full">

        {/* 0. 타로 한장 (바이럴 최고) */}
        <motion.button
          onClick={() => onSelect('tarot')}
          className="glass-strong rounded-3xl p-6 md:p-8 text-left group hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          whileHover={{ boxShadow: '0 0 40px rgba(168, 85, 247, 0.3)' }}
        >
          {/* 바이럴 뱃지 */}
          <div className="absolute top-4 right-4 px-2 py-0.5 bg-purple-500 text-white text-xs font-bold rounded-full animate-pulse">
            🔥 바이럴
          </div>

          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center shadow-lg">
              <span className="text-2xl">🃏</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100">오늘의 타로</h2>
              <p className="text-purple-400 text-sm">카드 한장 뽑기</p>
            </div>
          </div>

          <p className="text-slate-300 text-sm mb-5 leading-relaxed">
            22장의 메이저 아르카나 중 오늘 당신에게 전하는 카드 한 장.
            직관으로 선택하세요!
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">연애운</span>
            <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">재물운</span>
            <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">직장운</span>
          </div>

          <div className="flex items-center text-purple-400 group-hover:translate-x-2 transition-transform">
            <span className="text-sm font-medium">타로 뽑기</span>
            <span className="ml-2">→</span>
          </div>
        </motion.button>

        {/* 1. 대박 재물운 (NEW) */}
        <motion.button
          onClick={() => onSelect('wealth')}
          className="glass-strong rounded-3xl p-6 md:p-8 text-left group hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ boxShadow: '0 0 40px rgba(234, 179, 8, 0.3)' }}
        >
          {/* NEW 뱃지 */}
          <div className="absolute top-4 right-4 px-2 py-0.5 bg-yellow-500 text-black text-xs font-bold rounded-full animate-pulse">
            💰 NEW
          </div>

          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center shadow-lg">
              <Coins className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100">대박 재물운</h2>
              <p className="text-yellow-400 text-sm">평생 재물 팔자</p>
            </div>
          </div>

          <p className="text-slate-300 text-sm mb-5 leading-relaxed">
            당신은 평생 얼마를 벌 팔자인가?
            투자하기 좋은 날, 로또 행운 번호까지!
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full">재물 팔자</span>
            <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full">투자 길일</span>
            <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full">행운 번호</span>
          </div>

          <div className="flex items-center text-yellow-400 group-hover:translate-x-2 transition-transform">
            <span className="text-sm font-medium">재물운 확인하기</span>
            <span className="ml-2">→</span>
          </div>
        </motion.button>

        {/* 2. 오늘의 운세 (가장 인기) */}
        <motion.button
          onClick={() => onSelect('daily')}
          className="glass-strong rounded-3xl p-6 md:p-8 text-left group hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          whileHover={{ boxShadow: '0 0 40px rgba(251, 146, 60, 0.2)' }}
        >
          {/* 인기 뱃지 */}
          <div className="absolute top-4 right-4 px-2 py-0.5 bg-orange-500 text-white text-xs font-bold rounded-full animate-pulse">
            인기
          </div>

          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg">
              <Sun className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100">오늘의 운세</h2>
              <p className="text-orange-400 text-sm">30초만에 확인</p>
            </div>
          </div>

          <p className="text-slate-300 text-sm mb-5 leading-relaxed">
            생년월일만 입력하면 오늘 하루의 운세를 알려드립니다.
            매일매일 변하는 나의 운세!
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            <span className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-full">재물운</span>
            <span className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-full">애정운</span>
            <span className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-full">행운 아이템</span>
          </div>

          <div className="flex items-center text-orange-400 group-hover:translate-x-2 transition-transform">
            <span className="text-sm font-medium">오늘의 운세 보기</span>
            <span className="ml-2">→</span>
          </div>
        </motion.button>

        {/* 2. 궁합 보기 (2번째 인기) */}
        <motion.button
          onClick={() => onSelect('compatibility')}
          className="glass-strong rounded-3xl p-6 md:p-8 text-left group hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
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

        {/* 3. 재회 운세 */}
        <motion.button
          onClick={() => onSelect('rekindling')}
          className="glass-strong rounded-3xl p-6 md:p-8 text-left group hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ boxShadow: '0 0 40px rgba(244, 63, 94, 0.2)' }}
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-400 to-pink-600 flex items-center justify-center shadow-lg">
              <span className="text-2xl">💔</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100">재회 운세</h2>
              <p className="text-rose-400 text-sm">다시 만날 수 있을까?</p>
            </div>
          </div>

          <p className="text-slate-300 text-sm mb-5 leading-relaxed">
            헤어진 연인과의 재회 가능성을 사주로 분석합니다.
            인연의 끈이 아직 이어져 있는지 알아보세요.
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            <span className="px-2 py-1 bg-rose-500/20 text-rose-300 text-xs rounded-full">재회 가능성</span>
            <span className="px-2 py-1 bg-rose-500/20 text-rose-300 text-xs rounded-full">타이밍 분석</span>
            <span className="px-2 py-1 bg-rose-500/20 text-rose-300 text-xs rounded-full">인연 해석</span>
          </div>

          <div className="flex items-center text-rose-400 group-hover:translate-x-2 transition-transform">
            <span className="text-sm font-medium">재회 운세 보기</span>
            <span className="ml-2">→</span>
          </div>
        </motion.button>

        {/* 4. 꿈해몽 */}
        <motion.button
          onClick={() => onSelect('dream')}
          className="glass-strong rounded-3xl p-6 md:p-8 text-left group hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          whileHover={{ boxShadow: '0 0 40px rgba(139, 92, 246, 0.2)' }}
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center shadow-lg">
              <Cloud className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100">꿈해몽</h2>
              <p className="text-violet-400 text-sm">꿈 풀이</p>
            </div>
          </div>

          <p className="text-slate-300 text-sm mb-5 leading-relaxed">
            간밤에 꾼 꿈이 궁금하신가요?
            전통 해몽으로 꿈의 의미를 알려드립니다.
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            <span className="px-2 py-1 bg-violet-500/20 text-violet-300 text-xs rounded-full">길몽/흉몽</span>
            <span className="px-2 py-1 bg-violet-500/20 text-violet-300 text-xs rounded-full">상징 해석</span>
            <span className="px-2 py-1 bg-violet-500/20 text-violet-300 text-xs rounded-full">행운 예측</span>
          </div>

          <div className="flex items-center text-violet-400 group-hover:translate-x-2 transition-transform">
            <span className="text-sm font-medium">꿈 풀이하기</span>
            <span className="ml-2">→</span>
          </div>
        </motion.button>

        {/* 5. 월별 운세 (NEW) */}
        <motion.button
          onClick={() => onSelect('monthly')}
          className="glass-strong rounded-3xl p-6 md:p-8 text-left group hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ boxShadow: '0 0 40px rgba(99, 102, 241, 0.2)' }}
        >
          {/* NEW 뱃지 */}
          <div className="absolute top-4 right-4 px-2 py-0.5 bg-indigo-500 text-white text-xs font-bold rounded-full animate-pulse">
            NEW
          </div>

          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center shadow-lg">
              <Calendar className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100">월별 운세</h2>
              <p className="text-indigo-400 text-sm">12개월 상세 분석</p>
            </div>
          </div>

          <p className="text-slate-300 text-sm mb-5 leading-relaxed">
            2025년 12개월의 운세를 한눈에 확인하세요.
            최고의 달, 주의할 달을 미리 알아보세요.
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            <span className="px-2 py-1 bg-indigo-500/20 text-indigo-300 text-xs rounded-full">월별 점수</span>
            <span className="px-2 py-1 bg-indigo-500/20 text-indigo-300 text-xs rounded-full">분야별 운세</span>
            <span className="px-2 py-1 bg-indigo-500/20 text-indigo-300 text-xs rounded-full">맞춤 조언</span>
          </div>

          <div className="flex items-center text-indigo-400 group-hover:translate-x-2 transition-transform">
            <span className="text-sm font-medium">월별 운세 보기</span>
            <span className="ml-2">→</span>
          </div>
        </motion.button>

        {/* 6. 2026 신년운세 */}
        <motion.button
          onClick={() => onSelect('newyear2026')}
          className="glass-strong rounded-3xl p-6 md:p-8 text-left group hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          whileHover={{ boxShadow: '0 0 40px rgba(239, 68, 68, 0.2)' }}
        >
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

        {/* 7. 만세력/사주 풀이 */}
        <motion.button
          onClick={() => onSelect('saju')}
          className="glass-strong rounded-3xl p-6 md:p-8 text-left group hover:scale-[1.02] transition-transform duration-300"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
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

        {/* 8. 토정비결 */}
        <motion.button
          onClick={() => onSelect('tojeong2026')}
          className="glass-strong rounded-3xl p-6 md:p-8 text-left group hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
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
      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p className="text-slate-500 text-sm">
          팔자왕 - 전통 명리학 기반 종합 운세 서비스
        </p>
        <p className="text-slate-600 text-xs mt-2">
          © 2025 Paljawang. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}
