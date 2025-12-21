'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Home, Compass, TrendingUp, AlertTriangle } from 'lucide-react';

interface MovingOverviewProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function MovingOverview({ result, name }: MovingOverviewProps) {
  const dayElement = result.day.stem.element;
  const { 재성, 관성, 인성, 비겁 } = result.tenGodsCount;

  // 이사운 종합 점수 계산
  const getMovingScore = () => {
    let score = 50;

    // 일간별 이사운
    if (dayElement === '토') score += 20; // 토는 부동산과 관련
    if (dayElement === '목') score += 15; // 목은 성장, 확장
    if (dayElement === '수') score += 10; // 수는 이동성
    if (dayElement === '금') score -= 5; // 금은 변화 싫어함
    if (dayElement === '화') score += 5; // 화는 활동적

    // 십성 분석
    if (재성 >= 2) score += 15; // 재성은 재물, 부동산
    if (관성 >= 2) score += 10; // 관성은 안정, 주거
    if (인성 >= 2) score += 5; // 인성은 보호, 안전
    if (비겁 >= 3) score -= 10; // 비겁 과다는 경쟁, 불안정

    // 용신 확인
    if (result.yongsin === dayElement) score += 10;

    return Math.min(Math.max(score, 20), 100);
  };

  const movingScore = getMovingScore();

  // 등급 판정
  const getGrade = () => {
    if (movingScore >= 80) return { text: '대길', color: 'text-emerald-400', emoji: '🌟' };
    if (movingScore >= 65) return { text: '길', color: 'text-green-400', emoji: '✨' };
    if (movingScore >= 50) return { text: '평길', color: 'text-yellow-400', emoji: '🔆' };
    return { text: '주의', color: 'text-orange-400', emoji: '⚠️' };
  };

  const grade = getGrade();

  // 이사 추천 방위
  const getDirections = () => {
    const directions = [];
    if (dayElement === '목') directions.push('동쪽', '남동쪽');
    if (dayElement === '화') directions.push('남쪽', '남동쪽');
    if (dayElement === '토') directions.push('남서쪽', '북동쪽');
    if (dayElement === '금') directions.push('서쪽', '북서쪽');
    if (dayElement === '수') directions.push('북쪽', '북서쪽');

    return directions.length > 0 ? directions : ['동쪽', '남쪽'];
  };

  const luckyDirections = getDirections();

  // 핵심 키워드
  const getKeywords = () => {
    const keywords = [];

    if (movingScore >= 70) keywords.push('이사 길일');
    if (dayElement === '토') keywords.push('부동산 매수 길');
    if (재성 >= 2) keywords.push('자산 증식');
    if (관성 >= 2) keywords.push('안정된 주거');
    if (dayElement === '수') keywords.push('빠른 이사');
    if (dayElement === '목') keywords.push('확장 이주');

    if (keywords.length < 3) {
      keywords.push('신중한 선택', '계획적 이사');
    }

    return keywords.slice(0, 4);
  };

  const keywords = getKeywords();

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2
        className="text-3xl md:text-4xl font-bold text-center mb-4 gradient-text"
        style={{ fontFamily: "'Noto Serif KR', serif" }}
      >
        🏠 이사운 종합 개요
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님의 이사/방위운 종합 분석
      </p>

      {/* 이사운 점수 */}
      <div className="glass rounded-2xl p-8 mb-8 text-center bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/30">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-5xl">{grade.emoji}</span>
          <div className="text-left">
            <p className="text-slate-400 text-sm">이사운 총점</p>
            <p className={`text-5xl font-bold ${grade.color}`}>{movingScore}점</p>
          </div>
        </div>
        <p className={`text-2xl font-bold ${grade.color} mb-2`}>{grade.text}</p>
        <p className="text-slate-300">
          {movingScore >= 80 ? '이사와 이주에 최고의 운입니다! 적극 추진하세요.' :
           movingScore >= 65 ? '이사운이 좋습니다. 좋은 기회를 잡으세요.' :
           movingScore >= 50 ? '안정적인 이사가 가능합니다. 신중하게 준비하세요.' :
           '이사 전 충분한 검토가 필요합니다. 서두르지 마세요.'}
        </p>
      </div>

      {/* 핵심 키워드 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6" />
          핵심 키워드
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {keywords.map((keyword, index) => (
            <motion.div
              key={keyword}
              className="glass-strong rounded-xl p-4 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <p className="text-emerald-400 font-bold">{keyword}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 길한 방위 간략 소개 */}
      <div className="glass rounded-2xl p-6 mb-6">
        <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
          <Compass className="w-6 h-6" />
          추천 이사 방위
        </h3>
        <div className="flex flex-wrap gap-3 justify-center">
          {luckyDirections.map((direction, index) => (
            <motion.div
              key={direction}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <p className="text-purple-300 font-bold text-lg">{direction}</p>
            </motion.div>
          ))}
        </div>
        <p className="text-slate-400 text-sm text-center mt-4">
          현재 거주지를 기준으로 위 방향으로의 이사가 길합니다
        </p>
      </div>

      {/* 사주 오행 분석 */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
          <Home className="w-6 h-6" />
          사주 이사운 분석
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
            <span className="text-slate-400">일간 오행</span>
            <span className="text-amber-400 font-bold">{dayElement}({result.day.stem.ko})</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
            <span className="text-slate-400">재성 (부동산운)</span>
            <span className="text-emerald-400 font-bold">{재성}개 - {재성 >= 2 ? '강함' : 재성 >= 1 ? '보통' : '약함'}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
            <span className="text-slate-400">관성 (안정운)</span>
            <span className="text-blue-400 font-bold">{관성}개 - {관성 >= 2 ? '강함' : 관성 >= 1 ? '보통' : '약함'}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
            <span className="text-slate-400">용신</span>
            <span className="text-purple-400 font-bold">{result.yongsin}</span>
          </div>
        </div>

        <div className="mt-4 p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl">
          <p className="text-slate-300 leading-relaxed">
            {dayElement === '토' ? '토(土) 일간은 부동산과 가장 밀접합니다. 이사와 주거 변화가 재물운 상승으로 이어질 수 있습니다.' :
             dayElement === '목' ? '목(木) 일간은 성장과 확장을 상징합니다. 더 넓고 좋은 환경으로의 이사가 길합니다.' :
             dayElement === '화' ? '화(火) 일간은 활동적입니다. 이사를 통해 새로운 기회와 인연을 만날 수 있습니다.' :
             dayElement === '금' ? '금(金) 일간은 안정을 추구합니다. 충분히 검토하고 계획적으로 이사하세요.' :
             '수(水) 일간은 유동적입니다. 빠른 이사 결정과 실행이 가능하나, 신중함도 필요합니다.'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
