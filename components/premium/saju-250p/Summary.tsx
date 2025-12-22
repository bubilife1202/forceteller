'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Star, CheckCircle2, Circle, TrendingUp } from 'lucide-react';

interface SummaryProps {
  dayStem: string;
  userName: string;
}

export default function Summary({ dayStem, userName }: SummaryProps) {
  const [checkedItems, setCheckedItems] = useState<boolean[]>([false, false, false, false, false]);

  const keyPoints = [
    {
      title: '성격적 강점',
      content: `${userName}님은 타고난 ${dayStem === '갑' || dayStem === '을' ? '리더십' : dayStem === '병' || dayStem === '정' ? '창의성' : dayStem === '무' || dayStem === '기' ? '안정성' : dayStem === '경' || dayStem === '신' ? '추진력' : '지혜'}을 가지고 있습니다`,
    },
    {
      title: '올해의 운세',
      content: '전체적으로 긍정적인 흐름이며, 특히 인간관계와 커리어 발전에 좋은 시기입니다',
    },
    {
      title: '재물운',
      content: '꾸준한 노력이 결실을 맺을 시기로, 계획적인 재테크가 중요합니다',
    },
    {
      title: '건강운',
      content: '전반적으로 양호하나, 스트레스 관리와 규칙적인 생활이 필요합니다',
    },
    {
      title: '대인관계',
      content: '새로운 인연이 찾아올 수 있으며, 기존 관계도 더욱 돈독해질 시기입니다',
    },
  ];

  const checklistItems = [
    '행운의 색상을 일상에 활용하기',
    '행운의 방향으로 중요한 일정 배치하기',
    '월 1회 이상 긍정적 마인드 점검하기',
    '목표를 구체적으로 세우고 실천하기',
    '감사 일기 작성하며 긍정 에너지 충전하기',
  ];

  const currentYear = new Date().getFullYear();
  const yearFortune = '변화와 성장의 해로, 새로운 도전을 두려워하지 말고 적극적으로 기회를 잡아가세요';

  const toggleCheck = (index: number) => {
    const newChecked = [...checkedItems];
    newChecked[index] = !newChecked[index];
    setCheckedItems(newChecked);
  };

  return (
    <div className="space-y-6 p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-slate-700">
      {/* 헤더 */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl">
          <FileText className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">요약 정리</h2>
          <p className="text-slate-400 text-sm">핵심만 빠르게 확인하세요</p>
        </div>
      </div>

      {/* 올해 운세 한줄평 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-rose-500/10 to-pink-500/10 rounded-xl p-6 border border-rose-500/30"
      >
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-5 h-5 text-rose-400" />
          <h3 className="text-lg font-bold text-white">{currentYear}년 운세</h3>
        </div>
        <p className="text-rose-100 text-lg leading-relaxed font-medium">
          &ldquo;{yearFortune}&rdquo;
        </p>
      </motion.div>

      {/* 핵심 포인트 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800/50 rounded-xl p-6 border border-slate-700"
      >
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-yellow-400" />
          <h3 className="text-lg font-bold text-white">핵심 포인트 5</h3>
        </div>

        <div className="space-y-3">
          {keyPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-rose-500 to-pink-500 rounded-lg flex-shrink-0">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold mb-1">{point.title}</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">{point.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 실천 체크리스트 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-slate-800/50 rounded-xl p-6 border border-slate-700"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <h3 className="text-lg font-bold text-white">실천 체크리스트</h3>
          </div>
          <span className="text-sm text-slate-400">
            {checkedItems.filter(Boolean).length} / {checklistItems.length}
          </span>
        </div>

        <div className="space-y-2">
          {checklistItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              onClick={() => toggleCheck(index)}
              className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-colors group"
            >
              <div className="flex-shrink-0">
                {checkedItems[index] ? (
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-500 group-hover:text-slate-400" />
                )}
              </div>
              <p
                className={`text-sm transition-all ${
                  checkedItems[index]
                    ? 'text-slate-400 line-through'
                    : 'text-slate-300'
                }`}
              >
                {item}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
          <p className="text-green-200 text-sm leading-relaxed">
            체크리스트를 하나씩 실천하며 더 나은 하루를 만들어가세요.
            작은 실천이 큰 변화를 만듭니다!
          </p>
        </div>
      </motion.div>
    </div>
  );
}
