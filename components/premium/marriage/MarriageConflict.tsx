'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { AlertTriangle, Shield, Heart, Lightbulb } from 'lucide-react';

interface MarriageConflictProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function MarriageConflict({ result, name }: MarriageConflictProps) {
  const dayElement = result.day.stem.element;
  const { 비겁, 관성, 인성 } = result.tenGodsCount;

  // 갈등 발생 확률
  const getConflictProbability = () => {
    let score = 50;
    if (비겁 >= 3) score += 20; // 자기주장 강함
    if (관성 >= 2) score -= 15; // 질서와 조화
    if (인성 >= 2) score -= 10; // 포용력

    return Math.min(Math.max(score, 20), 80);
  };

  const conflictProb = getConflictProbability();

  // 오행별 갈등 패턴
  const getConflictPattern = () => {
    const patterns: Record<string, {
      mainIssue: string;
      trigger: string[];
      frequency: string;
      intensity: string;
    }> = {
      목: {
        mainIssue: '소통 방식의 차이',
        trigger: ['설명이 길어질 때', '이해받지 못한다고 느낄 때', '대화가 막힐 때'],
        frequency: '보통 (월 2-3회)',
        intensity: '중간 (조용히 갈등)'
      },
      화: {
        mainIssue: '감정 표현의 차이',
        trigger: ['열정이 식었다고 느낄 때', '무시당한다고 느낄 때', '즉각 반응 없을 때'],
        frequency: '잦음 (주 1-2회)',
        intensity: '높음 (격렬한 말다툼)'
      },
      토: {
        mainIssue: '생활 방식의 차이',
        trigger: ['집안일 분담', '금전 문제', '안정성 위협받을 때'],
        frequency: '드묾 (월 1회 이하)',
        intensity: '낮음 (속으로 삭임)'
      },
      금: {
        mainIssue: '원칙과 기준의 차이',
        trigger: ['약속이 지켜지지 않을 때', '예의가 없다고 느낄 때', '기준이 다를 때'],
        frequency: '보통 (월 2회)',
        intensity: '중상 (냉정한 지적)'
      },
      수: {
        mainIssue: '감정적 교감 부족',
        trigger: ['이해받지 못할 때', '감정을 무시당할 때', '혼자라고 느낄 때'],
        frequency: '변동적 (주기적)',
        intensity: '중간 (우울감과 거리감)'
      }
    };
    return patterns[dayElement] || patterns['목'];
  };

  const pattern = getConflictPattern();

  // 오행별 해결 방법
  const getSolution = () => {
    const solutions: Record<string, {
      immediate: string[];
      longterm: string[];
      donts: string[];
    }> = {
      목: {
        immediate: ['충분한 대화 시간 갖기', '상대 말 끝까지 듣기', '산책하며 이야기하기'],
        longterm: ['정기적인 데이트로 소통', '서로의 관심사 존중', '함께 배우는 시간'],
        donts: ['대화 중단하기', '일방적 설득', '논리로만 해결']
      },
      화: {
        immediate: ['즉시 감정 표현하기', '포옹하기', '함께 운동이나 활동하기'],
        longterm: ['주기적 로맨틱 이벤트', '감정 일기 쓰기', '취미 함께 즐기기'],
        donts: ['감정 억누르기', '냉정하게 굴기', '오래 끌기']
      },
      토: {
        immediate: ['시간 갖고 진정하기', '현실적 해결책 찾기', '맛있는 음식 함께 먹기'],
        longterm: ['가계부 공동 관리', '집안일 명확한 역할 분담', '정기적 대화 시간'],
        donts: ['감정 폭발하기', '과거 문제 들추기', '급하게 결론내기']
      },
      금: {
        immediate: ['서로 사과하기', '잘못 인정하기', '대화 규칙 정하기'],
        longterm: ['부부 규칙 만들기', '서로 존중 표현', '정기적 평가 시간'],
        donts: ['인격 모독', '무시하는 태도', '자존심 세우기']
      },
      수: {
        immediate: ['진심 담아 위로하기', '스킨십하기', '공감 표현하기'],
        longterm: ['감정 교감 훈련', '취미 함께 하기', '여행으로 재충전'],
        donts: ['논리적 설득', '감정 무시', '혼자 두기']
      }
    };
    return solutions[dayElement] || solutions['목'];
  };

  const solution = getSolution();

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
        ⚡ 부부 갈등 패턴 & 해결법
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님의 갈등 유형과 현명한 대처법
      </p>

      {/* 갈등 발생 확률 */}
      <div className="glass rounded-2xl p-6 mb-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-orange-400" />
          <h3 className="text-xl font-bold text-white">갈등 발생 확률</h3>
        </div>
        <div className="flex justify-between items-center mb-3">
          <p className="text-slate-300">
            {conflictProb >= 60 ? '갈등이 잦을 수 있으니 대처법을 숙지하세요' :
             conflictProb >= 40 ? '평균적인 부부 갈등 수준입니다' :
             '비교적 평화로운 결혼생활이 예상됩니다'}
          </p>
          <p className="text-4xl font-bold text-orange-400">{conflictProb}%</p>
        </div>
        <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-500 to-red-500"
            initial={{ width: 0 }}
            whileInView={{ width: `${conflictProb}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>

      {/* 갈등 패턴 */}
      <div className="glass rounded-2xl p-6 mb-6">
        <h3 className="text-xl font-bold text-white mb-4">나의 갈등 패턴</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
            <p className="text-red-400 text-sm mb-1">주요 갈등 원인</p>
            <p className="text-white font-medium">{pattern.mainIssue}</p>
          </div>
          <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
            <p className="text-yellow-400 text-sm mb-1">갈등 빈도</p>
            <p className="text-white font-medium">{pattern.frequency}</p>
          </div>
        </div>
        <div className="p-4 bg-slate-800/50 rounded-xl mb-3">
          <p className="text-slate-400 text-sm mb-2">갈등이 시작되는 상황</p>
          <div className="space-y-2">
            {pattern.trigger.map((trigger, index) => (
              <div key={index} className="flex items-center gap-2 text-slate-300">
                <span className="text-red-400">•</span>
                <span>{trigger}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 bg-purple-500/10 rounded-xl">
          <p className="text-purple-400 text-sm mb-1">갈등 강도</p>
          <p className="text-white">{pattern.intensity}</p>
        </div>
      </div>

      {/* 즉각 해결법 */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-6 h-6 text-emerald-400" />
          <h3 className="text-xl font-bold text-white">즉각 해결법 (갈등 발생 시)</h3>
        </div>
        <div className="space-y-2">
          {solution.immediate.map((sol, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-emerald-400 font-bold">{index + 1}</span>
              </div>
              <span className="text-white">{sol}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 장기 해결법 */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-6 h-6 text-pink-400" />
          <h3 className="text-xl font-bold text-white">장기 해결법 (예방 전략)</h3>
        </div>
        <div className="space-y-2">
          {solution.longterm.map((sol, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 p-4 bg-pink-500/10 rounded-xl border border-pink-500/20"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-2 h-2 rounded-full bg-pink-400 flex-shrink-0" />
              <span className="text-white">{sol}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 절대 하지 말 것 */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-6 h-6 text-yellow-400" />
          <h3 className="text-xl font-bold text-white">절대 하지 말아야 할 것</h3>
        </div>
        <div className="space-y-2">
          {solution.donts.map((dont, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 p-4 bg-red-500/10 rounded-xl border border-red-500/30"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="text-2xl">❌</span>
              <span className="text-slate-300">{dont}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
