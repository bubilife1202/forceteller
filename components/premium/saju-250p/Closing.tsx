'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ExternalLink, Copyright } from 'lucide-react';

interface ClosingProps {
  userName: string;
}

export default function Closing({ userName }: ClosingProps) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="space-y-6 p-8 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 rounded-2xl border border-purple-500/30">
      {/* 따뜻한 마무리 메시지 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex justify-center">
          <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl">
            <Heart className="w-8 h-8 text-white fill-white" />
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-white">
            {userName}님의 빛나는 미래를 응원합니다
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
            사주는 하늘이 준 가능성의 지도입니다.<br />
            그 길을 어떻게 걸어갈지는 오롯이 당신의 선택입니다.
          </p>
        </div>
      </motion.div>

      {/* 핵심 메시지 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/30"
      >
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
          <div className="space-y-2">
            <p className="text-purple-100 leading-relaxed">
              이 보고서가 {userName}님의 인생에 작은 나침반이 되기를 바랍니다.
              운명은 정해진 것이 아니라, 매 순간 당신이 만들어가는 것입니다.
            </p>
            <p className="text-purple-200/80 leading-relaxed">
              어려움이 있을 때는 이 보고서를 다시 펼쳐보세요.
              당신 안에 있는 강점과 가능성을 기억하게 해줄 것입니다.
            </p>
          </div>
        </div>
      </motion.div>

      {/* 실천 격려 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-slate-800/50 rounded-xl p-6 border border-slate-700"
      >
        <div className="space-y-3 text-center">
          <p className="text-white font-semibold text-lg">
            행운을 만드는 3가지 습관
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 bg-slate-700/30 rounded-lg">
              <div className="text-2xl mb-2">🌟</div>
              <p className="text-slate-300 text-sm">긍정적 마음가짐</p>
            </div>
            <div className="p-4 bg-slate-700/30 rounded-lg">
              <div className="text-2xl mb-2">🎯</div>
              <p className="text-slate-300 text-sm">구체적인 목표 설정</p>
            </div>
            <div className="p-4 bg-slate-700/30 rounded-lg">
              <div className="text-2xl mb-2">💪</div>
              <p className="text-slate-300 text-sm">꾸준한 실천</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 팔자왕 브랜딩 & Threads */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-indigo-500/10 to-blue-500/10 rounded-xl p-6 border border-indigo-500/30"
      >
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              팔자왕
            </h3>
            <p className="text-slate-300 text-sm">
              AI가 분석하는 프리미엄 사주 서비스
            </p>
          </div>

          <div className="flex justify-center">
            <a
              href="https://www.threads.net/@palzawang"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-full font-medium transition-all hover:scale-105 shadow-lg"
            >
              <span>@palzawang</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <p className="text-slate-400 text-sm">
            더 많은 운세 콘텐츠와 사주 이야기를 만나보세요
          </p>
        </div>
      </motion.div>

      {/* 저작권 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="pt-6 border-t border-slate-700"
      >
        <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
          <Copyright className="w-4 h-4" />
          <p>
            {currentYear} 팔자왕. All rights reserved.
          </p>
        </div>
        <p className="text-slate-600 text-xs text-center mt-2">
          본 보고서의 내용은 전통 사주명리학을 기반으로 AI가 분석한 결과입니다.
          참고용으로 활용하시기 바랍니다.
        </p>
      </motion.div>

      {/* 마지막 인사 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center py-4"
      >
        <p className="text-xl font-semibold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
          {userName}님의 모든 날이 행운으로 가득하길 바랍니다
        </p>
        <p className="text-slate-400 text-sm mt-2">
          감사합니다
        </p>
      </motion.div>
    </div>
  );
}
