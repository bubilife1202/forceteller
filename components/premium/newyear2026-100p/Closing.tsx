'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Heart, Sparkles, Star, Target, TrendingUp, Calendar } from 'lucide-react';
import { NEWYEAR_2026_DATA, YEAR_RELATION } from './data';

interface ClosingProps {
  dayStem: string;
  userName?: string;
}

export default function Closing({ dayStem, userName = '회원' }: ClosingProps) {
  const yearData = NEWYEAR_2026_DATA[dayStem] || NEWYEAR_2026_DATA['갑'];
  const relation = YEAR_RELATION[dayStem] || YEAR_RELATION['갑'];

  // 핵심 요약 포인트 생성
  const summaryPoints = [
    `2026년 총운 점수: ${yearData.totalScore}점 (${yearData.grade})`,
    `올해의 키워드: ${yearData.yearKeywords.join(', ')}`,
    `재물운: ${yearData.wealthScore}점 - ${yearData.wealthSummary}`,
    `연애운: ${yearData.loveScore}점 - ${yearData.loveSummary}`,
    `건강운: ${yearData.healthScore}점 - ${yearData.healthSummary}`,
  ];

  // 체크리스트 생성
  const checklist = [
    yearData.yearAdvice,
    yearData.wealthAdvice,
    yearData.loveAdvice,
    yearData.careerAdvice,
    yearData.healthAdvice,
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/30 to-slate-900 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-purple-400 to-pink-500 mb-4">
            2026년 총정리
          </h2>
          <div className="flex items-center justify-center gap-2">
            <Star className="w-6 h-6 text-amber-400" />
            <p className="text-xl text-gray-300">{userName}님의 한 해를 위한 특별한 안내</p>
            <Star className="w-6 h-6 text-amber-400" />
          </div>
        </motion.div>

        {/* 올해 운세 유형 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-gradient-to-br from-red-900/30 to-orange-900/30 backdrop-blur-sm border border-red-500/30 rounded-2xl p-8 mb-8"
        >
          <h3 className="text-2xl font-bold text-red-300 mb-4 flex items-center gap-3">
            <Target className="w-6 h-6" />
            {userName}님의 2026년 운세 유형
          </h3>
          <div className="text-center py-4">
            <p className="text-4xl font-bold text-amber-400 mb-2">{relation.relation}</p>
            <p className="text-xl text-gray-300">{relation.element}</p>
            <p className="text-lg text-gray-400 mt-4">{relation.description}</p>
          </div>
        </motion.div>

        {/* Key Summary Points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-slate-800/70 to-purple-900/30 backdrop-blur-sm border border-amber-500/30 rounded-2xl p-8 mb-8"
        >
          <h3 className="text-2xl font-bold text-amber-300 mb-6 flex items-center gap-3">
            <Sparkles className="w-6 h-6" />
            핵심 요약
          </h3>
          <div className="space-y-4">
            {summaryPoints.map((point, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="flex items-start gap-3 p-4 bg-slate-800/50 rounded-lg border border-purple-500/20"
              >
                <Star className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                <p className="text-lg text-gray-200">{point}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 월별 하이라이트 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8 mb-8"
        >
          <h3 className="text-2xl font-bold text-blue-300 mb-6 flex items-center gap-3">
            <Calendar className="w-6 h-6" />
            2026년 월별 하이라이트
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-900/30 rounded-xl border border-green-500/30">
              <p className="text-green-400 font-bold mb-2">🍀 행운의 달</p>
              <p className="text-gray-300">
                재물: {yearData.wealthLuckyMonths.map(m => `${m}월`).join(', ')}
              </p>
              <p className="text-gray-300">
                연애: {yearData.loveLuckyMonths.map(m => `${m}월`).join(', ')}
              </p>
            </div>
            <div className="p-4 bg-red-900/30 rounded-xl border border-red-500/30">
              <p className="text-red-400 font-bold mb-2">⚠️ 주의할 달</p>
              <p className="text-gray-300">
                재물: {yearData.wealthCautionMonths.map(m => `${m}월`).join(', ')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Year Checklist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-br from-purple-900/30 to-slate-800/70 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 mb-8"
        >
          <h3 className="text-2xl font-bold text-purple-300 mb-6 flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6" />
            2026년 실천 체크리스트
          </h3>
          <ul className="space-y-3">
            {checklist.map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + idx * 0.1 }}
                className="flex items-start gap-3 text-lg text-gray-200 p-3 bg-slate-800/30 rounded-lg"
              >
                <CheckCircle2 className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Closing Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
          className="bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm border-2 border-amber-400/40 rounded-2xl p-8 mb-8 text-center"
        >
          <Heart className="w-12 h-12 text-pink-400 mx-auto mb-4" />
          <p className="text-2xl font-bold text-amber-300 mb-4">
            {userName}님의 2026년이 행복과 성공으로 가득하길 바랍니다!
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            {yearData.yearSummary}
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-medium">
              2026년 총운 점수: {yearData.totalScore}점
            </span>
          </div>
        </motion.div>

        {/* 팔자왕 Branding */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center py-8 border-t border-purple-500/30"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-8 h-8 text-amber-400" />
            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-purple-500">
              팔자왕
            </h3>
            <Sparkles className="w-8 h-8 text-amber-400" />
          </div>
          <p className="text-gray-400 text-lg">2026년, 당신의 운명을 함께합니다</p>
          <a
            href="https://www.threads.com/@palzawang"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full text-gray-300 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 192 192" fill="currentColor">
              <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3175 35.2355 52.0339 45.7381 38.683C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C120.004 17.1113 137.552 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z" />
            </svg>
            @palzawang
          </a>
          <p className="text-gray-500 text-sm mt-3">© 2026 팔자왕. All rights reserved.</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
