'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Heart, Star, Shield, Sparkles } from 'lucide-react';

interface MarriageLongevityProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function MarriageLongevity({ result, name }: MarriageLongevityProps) {
  const dayElement = result.day.stem.element;
  const { 인성, 관성, 재성, 식상 } = result.tenGodsCount;

  // 백년해로 점수
  const getLongevityScore = () => {
    let score = 65;
    if (인성 >= 2) score += 15; // 인내심과 포용력
    if (관성 >= 1) score += 10; // 책임감
    if (재성 >= 1 && 식상 >= 1) score += 10; // 균형잡힌 사주

    // 오행별 보정
    if (dayElement === '토') score += 10; // 안정성
    if (dayElement === '금') score += 5; // 원칙

    return Math.min(Math.max(score, 50), 100);
  };

  const longevityScore = getLongevityScore();

  // 오행별 장수 비결
  const getLongevitySecret = () => {
    const secrets: Record<string, {
      key: string;
      habits: string[];
      danger: string;
      renewal: string;
    }> = {
      목: {
        key: '함께 성장하기',
        habits: ['매일 대화 시간 갖기', '함께 책 읽기', '새로운 배움 공유', '서로의 꿈 응원'],
        danger: '대화 단절, 성장 정체',
        renewal: '함께 공부하거나 새로운 취미 시작'
      },
      화: {
        key: '열정 유지하기',
        habits: ['정기적 데이트', '기념일 챙기기', '여행 자주 다니기', '스킨십 유지'],
        danger: '권태기, 열정 식음',
        renewal: '짜릿한 경험 함께하기, 이벤트 만들기'
      },
      토: {
        key: '신뢰와 안정',
        habits: ['규칙적 생활', '함께 식사', '집안 가꾸기', '경제적 안정 추구'],
        danger: '지루함, 무기력',
        renewal: '작은 변화 주기, 새로운 공간 만들기'
      },
      금: {
        key: '상호 존중',
        habits: ['예의 지키기', '약속 지키기', '품격 유지', '서로 존중 표현'],
        danger: '권위적 태도, 차가움',
        renewal: '솔직한 감정 표현, 부드러움 연습'
      },
      수: {
        key: '깊은 교감',
        habits: ['감정 공유하기', '공감 표현', '취미 함께하기', '진심 대화'],
        danger: '감정 단절, 외로움',
        renewal: '깊은 대화 시간, 감성 충전 여행'
      }
    };
    return secrets[dayElement] || secrets['목'];
  };

  const secret = getLongevitySecret();

  // 결혼 생활 시기별 예측
  const getMarriagePhases = () => {
    return [
      {
        period: '신혼 (1-3년)',
        score: 90,
        status: '행복지수 최고',
        advice: '이 시기의 설렘을 기억하세요'
      },
      {
        period: '정착기 (4-7년)',
        score: 75,
        status: '현실 직시',
        advice: '차이를 인정하고 조율하는 시기'
      },
      {
        period: '자녀양육기 (8-15년)',
        score: 65,
        status: '시련의 시기',
        advice: '부부 시간을 꼭 확보하세요'
      },
      {
        period: '성숙기 (16-25년)',
        score: 80,
        status: '안정과 이해',
        advice: '서로를 깊이 이해하는 시기'
      },
      {
        period: '황혼기 (26년~)',
        score: 85,
        status: '평온한 동반자',
        advice: '인생의 동반자로 함께'
      }
    ];
  };

  const phases = getMarriagePhases();

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
        👴👵 백년해로 운세
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님의 평생 결혼 생활 전망
      </p>

      {/* 백년해로 점수 */}
      <div className="glass rounded-2xl p-6 mb-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30">
        <div className="flex items-center gap-3 mb-4">
          <Heart className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-bold text-white">백년해로 가능성</h3>
        </div>
        <div className="flex justify-between items-center mb-3">
          <p className="text-slate-300">
            {longevityScore >= 85 ? '모범적인 부부가 될 운명입니다' :
             longevityScore >= 70 ? '오래도록 행복한 결혼 생활이 예상됩니다' :
             longevityScore >= 60 ? '노력으로 행복한 결혼을 만들 수 있습니다' :
             '서로를 위한 지속적인 노력이 필요합니다'}
          </p>
          <p className="text-4xl font-bold text-purple-400">{longevityScore}점</p>
        </div>
        <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            initial={{ width: 0 }}
            whileInView={{ width: `${longevityScore}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          />
        </div>
      </div>

      {/* 장수 비결 */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-6 h-6 text-yellow-400" />
          <h3 className="text-xl font-bold text-white">행복한 결혼의 비결</h3>
        </div>
        <p className="text-2xl font-bold text-yellow-300 mb-4">{secret.key}</p>
        <div className="space-y-2 mb-4">
          {secret.habits.map((habit, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 p-3 bg-yellow-500/10 rounded-xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0" />
              <span className="text-slate-300">{habit}</span>
            </motion.div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
            <p className="text-red-400 text-sm mb-1">⚠️ 위기 신호</p>
            <p className="text-white">{secret.danger}</p>
          </div>
          <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
            <p className="text-emerald-400 text-sm mb-1">💡 관계 리프레시</p>
            <p className="text-white">{secret.renewal}</p>
          </div>
        </div>
      </div>

      {/* 결혼 생활 시기별 */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-6 h-6 text-cyan-400" />
          <h3 className="text-xl font-bold text-white">결혼 생활 시기별 예측</h3>
        </div>
        <div className="space-y-3">
          {phases.map((phase, index) => (
            <motion.div
              key={index}
              className="p-4 glass rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-white font-bold">{phase.period}</p>
                  <p className="text-slate-400 text-sm">{phase.status}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-cyan-400">{phase.score}점</p>
                </div>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-2">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${phase.score}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                />
              </div>
              <p className="text-slate-300 text-sm">{phase.advice}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 행복 유지 팁 */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-pink-400" />
          <h3 className="text-xl font-bold text-white">평생 행복 유지 팁</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-xl border border-pink-500/20">
            <p className="text-pink-400 font-medium mb-2">💖 감정 계좌 채우기</p>
            <p className="text-slate-300 text-sm">
              칭찬, 감사, 사랑한다는 말을 매일 하세요
            </p>
          </div>
          <div className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20">
            <p className="text-blue-400 font-medium mb-2">🗣️ 대화의 기술</p>
            <p className="text-slate-300 text-sm">
              하루 30분은 진심 대화 시간으로 확보
            </p>
          </div>
          <div className="p-4 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-xl border border-purple-500/20">
            <p className="text-purple-400 font-medium mb-2">🎁 특별한 순간</p>
            <p className="text-slate-300 text-sm">
              기념일과 이벤트로 설렘 유지하기
            </p>
          </div>
          <div className="p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-xl border border-emerald-500/20">
            <p className="text-emerald-400 font-medium mb-2">🤝 팀워크</p>
            <p className="text-slate-300 text-sm">
              함께 목표를 세우고 이루는 즐거움
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
