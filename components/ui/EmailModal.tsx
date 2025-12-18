'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  htmlContent: string;
  fortuneType: string;
  title?: string;
}

export default function EmailModal({
  isOpen,
  onClose,
  htmlContent,
  fortuneType,
  title,
}: EmailModalProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 이메일 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setMessage('유효한 이메일 주소를 입력해주세요.');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email,
          subject: title,
          htmlContent,
          fortuneType,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('이메일이 발송되었습니다!');
        setTimeout(() => {
          onClose();
          setStatus('idle');
          setEmail('');
        }, 2000);
      } else {
        setStatus('error');
        setMessage(data.error || '이메일 발송에 실패했습니다.');
      }
    } catch {
      setStatus('error');
      setMessage('네트워크 오류가 발생했습니다.');
    }
  };

  const handleClose = () => {
    if (status !== 'loading') {
      onClose();
      setStatus('idle');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* 배경 오버레이 */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* 모달 */}
          <motion.div
            className="relative w-full max-w-md bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-700"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* 닫기 버튼 */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-slate-800"
              disabled={status === 'loading'}
            >
              <X className="w-5 h-5" />
            </button>

            {/* 아이콘 */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                <Mail className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* 제목 */}
            <h2 className="text-xl font-bold text-white text-center mb-2">
              결과를 이메일로 받기
            </h2>
            <p className="text-slate-400 text-sm text-center mb-6">
              운세 결과를 이메일로 보내드립니다
            </p>

            {/* 폼 */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-slate-300 text-sm mb-2">
                  이메일 주소
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                  disabled={status === 'loading' || status === 'success'}
                  autoFocus
                />
              </div>

              {/* 상태 메시지 */}
              {message && (
                <motion.div
                  className={`flex items-center gap-2 p-3 rounded-xl mb-4 ${
                    status === 'success'
                      ? 'bg-green-500/20 text-green-400'
                      : status === 'error'
                      ? 'bg-red-500/20 text-red-400'
                      : ''
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {status === 'success' ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                  <span className="text-sm">{message}</span>
                </motion.div>
              )}

              {/* 버튼 */}
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                  status === 'loading' || status === 'success'
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg'
                }`}
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    발송 중...
                  </>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    발송 완료!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    이메일 보내기
                  </>
                )}
              </button>
            </form>

            {/* 안내 */}
            <p className="text-slate-500 text-xs text-center mt-4">
              결과가 HTML 형식으로 발송됩니다
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
