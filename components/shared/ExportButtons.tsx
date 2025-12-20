'use client';

import { Download, Mail, Home, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExportButtonsProps {
  onDownloadHtml: () => void;
  onSendEmail: () => void;
  onHome: () => void;
  onReset?: () => void;
  resetLabel?: string;
}

export default function ExportButtons({
  onDownloadHtml,
  onSendEmail,
  onHome,
  onReset,
  resetLabel = '다시 보기'
}: ExportButtonsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3 mt-6"
    >
      {/* 다운로드 & 이메일 버튼 */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onDownloadHtml}
          className="flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-white font-medium hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg"
        >
          <Download className="w-5 h-5" />
          <span>결과 저장하기</span>
        </button>
        <button
          onClick={onSendEmail}
          className="flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white font-medium hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg"
        >
          <Mail className="w-5 h-5" />
          <span>메일 보내기</span>
        </button>
      </div>

      {/* 다시 보기 버튼 (선택적) */}
      {onReset && (
        <button
          onClick={onReset}
          className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl text-white font-bold text-lg hover:from-amber-600 hover:to-orange-700 transition-all flex items-center justify-center gap-2 shadow-lg"
        >
          <RotateCcw className="w-5 h-5" />
          {resetLabel}
        </button>
      )}

      {/* 홈으로 버튼 */}
      <button
        onClick={onHome}
        className="w-full py-3 bg-slate-700/50 hover:bg-slate-700 rounded-2xl text-slate-300 font-medium transition-all flex items-center justify-center gap-2"
      >
        <Home className="w-5 h-5" />
        홈으로
      </button>
    </motion.div>
  );
}
