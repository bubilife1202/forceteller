'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Heart, Sparkles, Calendar, TrendingUp } from 'lucide-react';

interface MarriageRomanceProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function MarriageRomance({ result, name }: MarriageRomanceProps) {
  const dayElement = result.day.stem.element;
  const { 식상, 재성, 관성 } = result.tenGodsCount;

  // 연애 스타일
  const getRomanceStyle = () => {
    const styles: Record<string, {
      type: string;
      approach: string;
      dateStyle: string[];
      loveLanguage: string;
      pace: string;
    }> = {
      목: {
        type: '지적 로맨스형',
        approach: '친구에서 시작해 서서히 깊어지는 사랑',
        dateStyle: ['카페에서 대화', '서점 데이트', '전시회 관람', '산책하며 이야기'],
        loveLanguage: '깊은 대화와 이해',
        pace: '느리고 신중함'
      },
      화: {
        type: '열정 로맨스형',
        approach: '첫눈에 반하는 뜨거운 사랑',
        dateStyle: ['액티비티 데이트', '파티와 모임', '여행', '맛집 탐방'],
        loveLanguage: '열정적 표현과 스킨십',
        pace: '빠르고 적극적'
      },
      토: {
        type: '안정 로맨스형',
        approach: '차근차근 신뢰를 쌓는 사랑',
        dateStyle: ['집에서 요리', '영화 감상', '공원 산책', '카페'],
        loveLanguage: '실질적 도움과 챙김',
        pace: '느리고 안정적'
      },
      금: {
        type: '품격 로맨스형',
        approach: '이상형에 부합하는 완벽한 사랑',
        dateStyle: ['고급 레스토랑', '콘서트', '호텔 라운지', '문화생활'],
        loveLanguage: '존중과 배려',
        pace: '신중하고 격식있게'
      },
      수: {
        type: '감성 로맨스형',
        approach: '영혼의 교감을 느끼는 사랑',
        dateStyle: ['바다 드라이브', '심야 대화', '영화/음악', '조용한 카페'],
        loveLanguage: '감성적 교감과 공감',
        pace: '유동적이고 신비로움'
      }
    };
    return styles[dayElement] || styles['목'];
  };

  const romanceStyle = getRomanceStyle();

  // 연애에서 결혼까지 기간
  const getDatingPeriod = () => {
    let months = 24; // 기본 2년

    if (식상 >= 2) months -= 6; // 로맨틱, 빨리 결정
    if (관성 >= 2) months += 6; // 신중함
    if (dayElement === '화') months -= 6; // 빠른 결정
    if (dayElement === '금' || dayElement === '수') months += 6; // 신중함

    return Math.max(12, Math.min(48, months)); // 최소 1년, 최대 4년
  };

  const datingMonths = getDatingPeriod();
  const datingYears = Math.floor(datingMonths / 12);
  const remainingMonths = datingMonths % 12;

  // 교제 단계별 조언
  const getStageAdvice = () => {
    return [
      {
        stage: '만남 ~ 3개월',
        title: '설렘의 시작',
        advice: dayElement === '화' ? '열정적으로 감정 표현하세요' :
                dayElement === '목' ? '깊은 대화로 서로를 알아가세요' :
                dayElement === '토' ? '차분히 신뢰를 쌓아가세요' :
                dayElement === '금' ? '품격있게 예의를 지키세요' :
                '감성적 교감을 나누세요',
        focus: '첫인상과 호감 형성'
      },
      {
        stage: '3개월 ~ 1년',
        title: '애정의 심화',
        advice: '서로의 일상을 공유하고 가치관을 확인하세요',
        focus: '진정한 모습 확인'
      },
      {
        stage: '1년 ~ 2년',
        title: '결혼 고민 시기',
        advice: '결혼 후 삶에 대해 구체적으로 이야기하세요',
        focus: '미래 계획 논의'
      },
      {
        stage: `${datingYears}년 ${remainingMonths}개월`,
        title: '결혼 결정',
        advice: '양가 상견례와 결혼 준비를 시작하세요',
        focus: '결혼 준비 단계'
      }
    ];
  };

  const stageAdvice = getStageAdvice();

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2
        className="text-3xl font-bold text-center mb-4 gradient-text"
        style={{ fontFamily: "'Noto Serif KR', serif" }}
      >
        💕 연애에서 결혼까지
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님의 로맨스 스타일과 결혼 여정
      </p>

      {/* 로맨스 유형 */}
      <div className="glass rounded-2xl p-6 mb-6 bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-500/30">
        <div className="flex items-center gap-3 mb-4">
          <Heart className="w-6 h-6 text-pink-400" />
          <h3 className="text-xl font-bold text-white">나의 연애 스타일</h3>
        </div>
        <p className="text-2xl font-bold text-pink-300 mb-3">{romanceStyle.type}</p>
        <p className="text-slate-300 mb-4">{romanceStyle.approach}</p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-3 bg-slate-800/50 rounded-xl">
            <p className="text-slate-400 text-sm mb-1">사랑의 언어</p>
            <p className="text-white">{romanceStyle.loveLanguage}</p>
          </div>
          <div className="p-3 bg-slate-800/50 rounded-xl">
            <p className="text-slate-400 text-sm mb-1">연애 템포</p>
            <p className="text-white">{romanceStyle.pace}</p>
          </div>
        </div>
      </div>

      {/* 선호하는 데이트 */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-yellow-400" />
          <h3 className="text-xl font-bold text-white">이상적인 데이트</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {romanceStyle.dateStyle.map((style, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-2xl">
                {index === 0 ? '☕' : index === 1 ? '📚' : index === 2 ? '🎨' : '🌸'}
              </div>
              <span className="text-white">{style}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 교제 기간 예측 */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-6 h-6 text-cyan-400" />
          <h3 className="text-xl font-bold text-white">연애 기간 예측</h3>
        </div>
        <div className="p-5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/30">
          <div className="text-center mb-3">
            <p className="text-slate-400 text-sm mb-2">만남부터 결혼까지</p>
            <p className="text-4xl font-bold text-cyan-300">
              {datingYears > 0 && `${datingYears}년 `}
              {remainingMonths > 0 && `${remainingMonths}개월`}
            </p>
          </div>
          <p className="text-slate-300 text-center text-sm">
            {datingMonths < 18 ? '빠른 결정형' :
             datingMonths < 30 ? '평균적인 교제 기간' :
             '신중한 결정형'}
          </p>
        </div>
      </div>

      {/* 단계별 조언 */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-bold text-white">교제 단계별 가이드</h3>
        </div>
        <div className="space-y-4">
          {stageAdvice.map((item, index) => (
            <motion.div
              key={index}
              className="p-5 glass rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-400 font-bold">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-purple-400 font-medium">{item.stage}</p>
                    <span className="text-slate-400 text-sm">{item.title}</span>
                  </div>
                  <p className="text-white mb-2">{item.advice}</p>
                  <p className="text-slate-400 text-sm">핵심: {item.focus}</p>
                </div>
              </div>
              {index < stageAdvice.length - 1 && (
                <div className="h-px bg-slate-700 mt-4" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
