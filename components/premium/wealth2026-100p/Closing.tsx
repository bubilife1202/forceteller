'use client';

import { motion } from 'framer-motion';
import { Heart, Calendar, Target, CheckCircle, Sparkles } from 'lucide-react';
import { WEALTH_2026_BY_STEM } from './data';

interface ClosingProps {
  dayStem: string;
  userName?: string;
}

export default function Closing({ dayStem, userName = '회원' }: ClosingProps) {
  const yearData = WEALTH_2026_BY_STEM[dayStem] || WEALTH_2026_BY_STEM['갑'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* 챕터 헤더 */}
      <div className="flex items-center gap-4 pb-4 border-b border-slate-700">
        <span className="px-3 py-1 bg-rose-500/20 text-rose-400 rounded-full text-sm font-medium">
          Closing
        </span>
        <h2 className="text-2xl font-bold text-white">2026년 재물운 총정리</h2>
      </div>

      {/* 핵심 요약 */}
      <div className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-cyan-400" />
          {userName}님의 2026년 핵심 포인트
        </h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
            <div>
              <span className="text-white font-medium">총 재물운 점수: </span>
              <span className="text-yellow-400 font-bold">{yearData.yearScore}점</span>
              <span className="text-slate-400 ml-2">({yearData.grade})</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
            <div>
              <span className="text-white font-medium">행운의 달: </span>
              <span className="text-green-400">{yearData.luckyMonths.map(m => `${m}월`).join(', ')}</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
            <div>
              <span className="text-white font-medium">주의할 달: </span>
              <span className="text-red-400">{yearData.cautionMonths.map(m => `${m}월`).join(', ')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 실천 체크리스트 */}
      <div className="p-6 bg-blue-900/20 rounded-2xl border border-blue-800/30">
        <h3 className="text-xl font-bold text-blue-300 mb-6 flex items-center gap-2">
          <Calendar className="w-6 h-6" />
          2026년 실천 체크리스트
        </h3>
        <div className="space-y-3">
          {[
            '1월: 연간 재정 계획 수립하기',
            `${yearData.luckyMonths[0]}월: 적극적인 투자/사업 확장`,
            '6월: 상반기 점검 및 조정',
            `${yearData.cautionMonths[0]}월: 보수적 운용, 큰 지출 자제`,
            '12월: 연말 절세 전략 실행',
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-blue-800/20 rounded-xl">
              <span className="w-6 h-6 bg-blue-500/30 text-blue-300 rounded flex items-center justify-center text-sm">
                {idx + 1}
              </span>
              <span className="text-slate-300">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 마무리 메시지 */}
      <div className="p-8 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl border border-purple-800/30 text-center">
        <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-4">
          {userName}님의 2026년이<br />풍요로운 한 해가 되길 바랍니다
        </h3>
        <p className="text-slate-300 mb-6 max-w-lg mx-auto">
          사주는 가능성을 보여줄 뿐, 결과는 본인의 노력에 달려있습니다.
          행운의 시기를 잘 활용하고, 주의가 필요한 시기를 현명하게 대비하세요.
        </p>
        <div className="flex items-center justify-center gap-2 text-pink-300">
          <Heart className="w-5 h-5" />
          <span>ForceTeller가 응원합니다</span>
          <Heart className="w-5 h-5" />
        </div>
      </div>

      {/* 저작권 */}
      <div className="text-center py-6 border-t border-slate-700">
        <p className="text-slate-500 text-sm">
          © 2026 ForceTeller Premium Report
        </p>
        <p className="text-slate-600 text-xs mt-1">
          본 리포트는 {userName}님 전용으로 제작되었습니다.
        </p>
      </div>
    </motion.div>
  );
}
