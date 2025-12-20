'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Send, Users, Mail, AlertCircle, CheckCircle, Loader2, FileText } from 'lucide-react';

interface CustomerData {
  name: string;
  year: number;
  month: number;
  day: number;
  hour: number | null;
  gender: 'male' | 'female';
  email: string;
}

interface SendResult {
  email: string;
  name: string;
  success: boolean;
  error?: string;
}

type FortuneType = 'newyear2026' | 'wealth' | 'daily' | 'compatibility' | 'career' | 'daeun';

const FORTUNE_TYPES: { value: FortuneType; label: string }[] = [
  { value: 'newyear2026', label: '2026 신년운세' },
  { value: 'wealth', label: '대박 재물운' },
  { value: 'daily', label: '오늘의 운세' },
  { value: 'career', label: '직업운' },
  { value: 'daeun', label: '대운 분석' },
];

export default function AdminBatchPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [customerText, setCustomerText] = useState('');
  const [fortuneType, setFortuneType] = useState<FortuneType>('newyear2026');
  const [brandName, setBrandName] = useState('팔자왕');
  const [brandContact, setBrandContact] = useState('');

  const [isSending, setIsSending] = useState(false);
  const [sendResults, setSendResults] = useState<SendResult[]>([]);
  const [parseError, setParseError] = useState('');

  // 비밀번호 확인
  const handleAuth = async () => {
    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
        setAuthError('');
      } else {
        setAuthError('비밀번호가 틀렸습니다.');
      }
    } catch {
      setAuthError('인증 오류가 발생했습니다.');
    }
  };

  // 고객 데이터 파싱
  const parseCustomers = (): CustomerData[] => {
    const lines = customerText.trim().split('\n').filter(line => line.trim());
    const customers: CustomerData[] = [];

    for (const line of lines) {
      const parts = line.split(',').map(p => p.trim());
      if (parts.length < 5) continue;

      const [name, birthDate, time, genderStr, email] = parts;

      // 생년월일 파싱 (YYYY-MM-DD 또는 YYYY.MM.DD)
      const dateMatch = birthDate.match(/(\d{4})[-./](\d{1,2})[-./](\d{1,2})/);
      if (!dateMatch) continue;

      const year = parseInt(dateMatch[1]);
      const month = parseInt(dateMatch[2]);
      const day = parseInt(dateMatch[3]);

      // 시간 파싱
      let hour: number | null = null;
      if (time && time !== '모름' && time !== '-') {
        const timeMatch = time.match(/(\d{1,2})/);
        if (timeMatch) hour = parseInt(timeMatch[1]);
      }

      // 성별 파싱
      const gender: 'male' | 'female' =
        genderStr.includes('여') || genderStr.toLowerCase() === 'f' ? 'female' : 'male';

      if (email && email.includes('@')) {
        customers.push({ name, year, month, day, hour, gender, email });
      }
    }

    return customers;
  };

  // 일괄 발송
  const handleBatchSend = async () => {
    setParseError('');
    setSendResults([]);

    const customers = parseCustomers();
    if (customers.length === 0) {
      setParseError('유효한 고객 데이터가 없습니다. 형식을 확인해주세요.');
      return;
    }

    setIsSending(true);
    const results: SendResult[] = [];

    for (const customer of customers) {
      try {
        const res = await fetch('/api/admin/send-fortune', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer,
            fortuneType,
            brandName,
            brandContact,
            password,
          }),
        });

        const data = await res.json();
        results.push({
          email: customer.email,
          name: customer.name,
          success: res.ok,
          error: data.error,
        });
      } catch (error) {
        results.push({
          email: customer.email,
          name: customer.name,
          success: false,
          error: '발송 실패',
        });
      }

      setSendResults([...results]);

      // 네이버 SMTP 제한 대응 - 1초 딜레이
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setIsSending(false);
  };

  // 비밀번호 입력 화면
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-3xl p-8 max-w-md w-full"
        >
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">관리자 전용</h1>
            <p className="text-slate-400">비밀번호를 입력하세요</p>
          </div>

          <div className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
              placeholder="관리자 비밀번호"
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />

            {authError && (
              <p className="text-red-400 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {authError}
              </p>
            )}

            <button
              onClick={handleAuth}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white font-medium hover:opacity-90 transition-opacity"
            >
              확인
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const customers = parseCustomers();

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* 헤더 */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">관리자 일괄 발송</h1>
            <p className="text-slate-400">고객 리스트를 입력하고 운세 결과를 이메일로 발송합니다</p>
          </div>

          {/* 브랜딩 설정 */}
          <div className="glass-strong rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-400" />
              브랜딩 설정
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 text-sm mb-2">브랜드명</label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="팔자왕"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-sm mb-2">연락처/SNS (선택)</label>
                <input
                  type="text"
                  value={brandContact}
                  onChange={(e) => setBrandContact(e.target.value)}
                  placeholder="@threads_id 또는 010-1234-5678"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          </div>

          {/* 운세 유형 선택 */}
          <div className="glass-strong rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-400" />
              운세 유형
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {FORTUNE_TYPES.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setFortuneType(type.value)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all ${
                    fortuneType === type.value
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white'
                      : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* 고객 리스트 입력 */}
          <div className="glass-strong rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-400" />
              고객 리스트
            </h2>
            <p className="text-slate-400 text-sm mb-3">
              형식: 이름, 생년월일, 시간, 성별, 이메일 (한 줄에 한 명)
            </p>
            <div className="bg-slate-800/30 rounded-lg p-3 mb-3 text-xs text-slate-500 font-mono">
              예시:<br/>
              홍길동, 1990-01-15, 14:00, 남, hong@email.com<br/>
              김영희, 1985-03-20, 모름, 여, kim@email.com
            </div>
            <textarea
              value={customerText}
              onChange={(e) => setCustomerText(e.target.value)}
              placeholder="고객 데이터를 입력하세요..."
              rows={8}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-mono text-sm"
            />

            {customers.length > 0 && (
              <p className="text-emerald-400 text-sm mt-2">
                ✓ {customers.length}명의 고객 데이터가 인식되었습니다
              </p>
            )}

            {parseError && (
              <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {parseError}
              </p>
            )}
          </div>

          {/* 발송 버튼 */}
          <button
            onClick={handleBatchSend}
            disabled={isSending || customers.length === 0}
            className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl text-white font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                발송 중... ({sendResults.length}/{customers.length})
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                {customers.length}명에게 일괄 발송
              </>
            )}
          </button>

          {/* 발송 결과 */}
          {sendResults.length > 0 && (
            <div className="glass-strong rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-4">발송 결과</h2>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {sendResults.map((result, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      result.success ? 'bg-emerald-500/10' : 'bg-red-500/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {result.success ? (
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-400" />
                      )}
                      <span className="text-white">{result.name}</span>
                      <span className="text-slate-400 text-sm">{result.email}</span>
                    </div>
                    {!result.success && (
                      <span className="text-red-400 text-sm">{result.error}</span>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-slate-700">
                <p className="text-slate-300">
                  성공: <span className="text-emerald-400 font-bold">{sendResults.filter(r => r.success).length}</span> /
                  실패: <span className="text-red-400 font-bold">{sendResults.filter(r => !r.success).length}</span>
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
