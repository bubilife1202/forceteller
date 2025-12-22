'use client';

import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const chapters = [
  { num: 1, title: '2026년 병오년 개요', pages: '4-7' },
  { num: 2, title: '나의 재물 DNA 분석', pages: '8-15' },
  { num: 3, title: '2026년 수입운 상세', pages: '16-23' },
  { num: 4, title: '투자운 심층 분석', pages: '24-35' },
  { num: 5, title: '부동산 & 주식 가이드', pages: '36-45' },
  { num: 6, title: '사업 & 직장운', pages: '46-55' },
  { num: 7, title: '부업 & 파트너십', pages: '56-63' },
  { num: 8, title: '횡재운 & 복권운', pages: '64-69' },
  { num: 9, title: '월별 재물 캘린더', pages: '70-85' },
  { num: 10, title: '재물 행운 아이템', pages: '86-91' },
  { num: 11, title: '주의사항 & 액션플랜', pages: '92-97' },
  { num: 12, title: '마무리 & 격언', pages: '98-100' },
];

export default function TOC() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 bg-slate-900/80 backdrop-blur-sm rounded-3xl border border-slate-800"
    >
      {/* 헤더 */}
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-700">
        <div className="p-3 bg-amber-500/20 rounded-xl">
          <BookOpen className="w-6 h-6 text-amber-400" />
        </div>
        <h2 className="text-2xl font-bold text-white">목차</h2>
      </div>

      {/* 목차 리스트 */}
      <div className="space-y-3">
        {chapters.map((chapter, idx) => (
          <motion.div
            key={chapter.num}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="flex items-center justify-between p-3 hover:bg-slate-800/50 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-4">
              <span className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg text-white font-bold text-sm">
                {chapter.num}
              </span>
              <span className="text-slate-200 font-medium">{chapter.title}</span>
            </div>
            <span className="text-slate-500 text-sm">{chapter.pages}p</span>
          </motion.div>
        ))}
      </div>

      {/* 하단 정보 */}
      <div className="mt-8 pt-4 border-t border-slate-700 text-center text-sm text-slate-500">
        <p>총 100페이지 | 프리미엄 재물 분석서</p>
      </div>
    </motion.div>
  );
}
