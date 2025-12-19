'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, ArrowLeft, User, Calendar, Clock, Search } from 'lucide-react';

export interface GuiinFormData {
  name: string;
  gender: 'male' | 'female';
  year: number;
  month: number;
  day: number;
  hour: number;
  timeUnknown: boolean;
  searchType: 'guiin' | 'akyeon' | 'both' | 'specific';
  specificYear?: number;
  specificMonth?: number;
  specificDay?: number;
}

interface GuiinFormProps {
  onSubmit: (data: GuiinFormData) => void;
  onBack: () => void;
}

const SEARCH_TYPES = [
  { value: 'guiin', label: '내 주변 귀인 찾기', desc: '나를 도와줄 귀인의 띠와 특징' },
  { value: 'akyeon', label: '피해야 할 사람', desc: '주의해야 할 악연의 띠와 특징' },
  { value: 'both', label: '귀인과 악연 모두', desc: '전체 인연 분석' },
  { value: 'specific', label: '특정 사람과의 인연', desc: '그 사람과의 관계 분석' },
] as const;

export default function GuiinForm({ onSubmit, onBack }: GuiinFormProps) {
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState<GuiinFormData>({
    name: '',
    gender: 'male',
    year: 1990,
    month: 1,
    day: 1,
    hour: 12,
    timeUnknown: false,
    searchType: 'both',
    specificYear: 1990,
    specificMonth: 1,
    specificDay: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('이름을 입력해주세요.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-full max-w-md">
        {/* 뒤로가기 */}
        <motion.button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>메뉴로</span>
        </motion.button>

        {/* 헤더 */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg mb-4">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            내 주변 귀인 찾기
          </h1>
          <p className="text-emerald-400">사주로 분석하는 인연의 비밀</p>
        </motion.div>

        {/* 폼 */}
        <motion.form
          onSubmit={handleSubmit}
          className="glass rounded-3xl p-6 space-y-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* 이름 */}
          <div>
            <label className="text-slate-300 text-sm mb-2 flex items-center gap-2">
              <User className="w-4 h-4" />
              이름
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="홍길동"
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          {/* 성별 */}
          <div>
            <label className="text-slate-300 text-sm mb-2 block">성별</label>
            <div className="grid grid-cols-2 gap-3">
              {(['male', 'female'] as const).map((gender) => (
                <button
                  key={gender}
                  type="button"
                  onClick={() => setFormData({ ...formData, gender })}
                  className={`py-3 rounded-xl font-medium transition-all ${
                    formData.gender === gender
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {gender === 'male' ? '남성' : '여성'}
                </button>
              ))}
            </div>
          </div>

          {/* 생년월일 */}
          <div>
            <label className="text-slate-300 text-sm mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              생년월일 (양력)
            </label>
            <div className="grid grid-cols-3 gap-2">
              <select
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                className="px-3 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
              >
                {Array.from({ length: 80 }, (_, i) => currentYear - 10 - i).map((year) => (
                  <option key={year} value={year}>{year}년</option>
                ))}
              </select>
              <select
                value={formData.month}
                onChange={(e) => setFormData({ ...formData, month: Number(e.target.value) })}
                className="px-3 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <option key={month} value={month}>{month}월</option>
                ))}
              </select>
              <select
                value={formData.day}
                onChange={(e) => setFormData({ ...formData, day: Number(e.target.value) })}
                className="px-3 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
              >
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <option key={day} value={day}>{day}일</option>
                ))}
              </select>
            </div>
          </div>

          {/* 태어난 시간 */}
          <div>
            <label className="text-slate-300 text-sm mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              태어난 시간
            </label>
            <div className="space-y-2">
              <select
                value={formData.hour}
                onChange={(e) => setFormData({ ...formData, hour: Number(e.target.value) })}
                disabled={formData.timeUnknown}
                className="w-full px-3 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:border-emerald-500 focus:outline-none disabled:opacity-50"
              >
                {[
                  { value: 0, label: '00시~01시 (자시 子時)' },
                  { value: 1, label: '01시~03시 (축시 丑時)' },
                  { value: 3, label: '03시~05시 (인시 寅時)' },
                  { value: 5, label: '05시~07시 (묘시 卯時)' },
                  { value: 7, label: '07시~09시 (진시 辰時)' },
                  { value: 9, label: '09시~11시 (사시 巳時)' },
                  { value: 11, label: '11시~13시 (오시 午時)' },
                  { value: 13, label: '13시~15시 (미시 未時)' },
                  { value: 15, label: '15시~17시 (신시 申時)' },
                  { value: 17, label: '17시~19시 (유시 酉時)' },
                  { value: 19, label: '19시~21시 (술시 戌時)' },
                  { value: 21, label: '21시~23시 (해시 亥時)' },
                  { value: 23, label: '23시~24시 (자시 子時)' },
                ].map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              <label className="flex items-center gap-2 text-slate-400 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.timeUnknown}
                  onChange={(e) => setFormData({ ...formData, timeUnknown: e.target.checked })}
                  className="rounded border-slate-700 bg-slate-800"
                />
                태어난 시간을 모르겠어요
              </label>
            </div>
          </div>

          {/* 검색 유형 */}
          <div>
            <label className="text-slate-300 text-sm mb-2 flex items-center gap-2">
              <Search className="w-4 h-4" />
              무엇을 알고 싶나요?
            </label>
            <div className="space-y-2">
              {SEARCH_TYPES.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, searchType: type.value })}
                  className={`w-full p-3 rounded-xl text-left transition-all ${
                    formData.searchType === type.value
                      ? 'bg-emerald-500/30 border-2 border-emerald-500'
                      : 'bg-slate-800/50 border border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="font-medium text-white">{type.label}</div>
                  <div className="text-sm text-slate-400">{type.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 특정 사람 생년월일 (searchType이 specific일 때만) */}
          {formData.searchType === 'specific' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <label className="text-slate-300 text-sm mb-2 block">상대방 생년월일</label>
              <div className="grid grid-cols-3 gap-2">
                <select
                  value={formData.specificYear}
                  onChange={(e) => setFormData({ ...formData, specificYear: Number(e.target.value) })}
                  className="px-3 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                >
                  {Array.from({ length: 80 }, (_, i) => currentYear - 10 - i).map((year) => (
                    <option key={year} value={year}>{year}년</option>
                  ))}
                </select>
                <select
                  value={formData.specificMonth}
                  onChange={(e) => setFormData({ ...formData, specificMonth: Number(e.target.value) })}
                  className="px-3 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <option key={month} value={month}>{month}월</option>
                  ))}
                </select>
                <select
                  value={formData.specificDay}
                  onChange={(e) => setFormData({ ...formData, specificDay: Number(e.target.value) })}
                  className="px-3 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                >
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <option key={day} value={day}>{day}일</option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}

          {/* 안내 */}
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
            <p className="text-emerald-300 text-sm">
              <strong>귀인(貴人)</strong>이란?<br />
              내 인생에 도움을 주는 소중한 인연입니다.
              사주의 신살(神煞)로 어떤 띠의 사람이 나의 귀인인지 알 수 있어요.
            </p>
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl text-white font-bold text-lg hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg"
          >
            내 귀인/악연 분석하기
          </button>
        </motion.form>
      </div>
    </motion.div>
  );
}
