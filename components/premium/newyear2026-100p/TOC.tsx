'use client';

import { motion } from 'framer-motion';
import {
  BookOpen, Star, Wallet, Heart, Briefcase,
  Activity, Home, Calendar, Sparkles
} from 'lucide-react';

const chapters = [
  { num: '01', title: '2026년 총운', icon: Star, color: 'text-amber-400', desc: '병오년 운세 개요' },
  { num: '02', title: '사주 분석', icon: BookOpen, color: 'text-purple-400', desc: '나의 사주와 성격' },
  { num: '03', title: '재물운', icon: Wallet, color: 'text-yellow-400', desc: '재물, 투자, 수입' },
  { num: '04', title: '연애 & 결혼운', icon: Heart, color: 'text-pink-400', desc: '사랑과 인연' },
  { num: '05', title: '직장 & 사업운', icon: Briefcase, color: 'text-blue-400', desc: '커리어와 성공' },
  { num: '06', title: '건강운', icon: Activity, color: 'text-emerald-400', desc: '건강과 웰빙' },
  { num: '07', title: '가정 & 대인운', icon: Home, color: 'text-orange-400', desc: '가족과 인간관계' },
  { num: '08', title: '월별 운세', icon: Calendar, color: 'text-cyan-400', desc: '1~12월 상세' },
  { num: '09', title: '행운 아이템', icon: Sparkles, color: 'text-amber-400', desc: '색상, 방향, 아이템' },
];

export default function TOC() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 bg-slate-800/50 rounded-3xl border border-slate-700"
    >
      <div className="flex items-center gap-4 mb-8 pb-4 border-b border-slate-700">
        <div className="p-3 bg-amber-500/20 rounded-xl">
          <BookOpen className="w-6 h-6 text-amber-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">목차</h2>
          <p className="text-slate-400 text-sm">Table of Contents</p>
        </div>
      </div>

      <div className="space-y-3">
        {chapters.map((chapter, index) => (
          <motion.div
            key={chapter.num}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4 p-4 bg-slate-700/30 hover:bg-slate-700/50 rounded-xl transition group"
          >
            <span className="text-2xl font-bold text-slate-600 group-hover:text-slate-500 transition w-12">
              {chapter.num}
            </span>
            <div className="p-2 bg-slate-800 rounded-lg">
              <chapter.icon className={`w-5 h-5 ${chapter.color}`} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white group-hover:text-amber-400 transition">
                {chapter.title}
              </h3>
              <p className="text-sm text-slate-500">{chapter.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 pt-4 border-t border-slate-700 text-center">
        <p className="text-slate-500 text-sm">총 100페이지 프리미엄 운세 리포트</p>
      </div>
    </motion.div>
  );
}
