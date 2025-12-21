'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Users, Heart, Home, AlertTriangle } from 'lucide-react';

interface MarriageFamilyProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function MarriageFamily({ result, name }: MarriageFamilyProps) {
  const dayElement = result.day.stem.element;
  const { 인성, 관성, 비겁 } = result.tenGodsCount;

  // 시댁/처가 관계운
  const getInLawRelation = () => {
    let score = 60;
    if (인성 >= 2) score += 20; // 인성은 어른, 시댁/처가 복
    if (관성 >= 1) score += 10; // 예의와 질서
    if (비겁 >= 3) score -= 10; // 독립성 강해 갈등 가능

    // 오행별 보정
    if (dayElement === '토') score += 15; // 포용력
    if (dayElement === '금') score += 10; // 예의
    if (dayElement === '화') score -= 5; // 자기주장 강함

    return Math.min(Math.max(score, 40), 100);
  };

  const inLawScore = getInLawRelation();

  // 오행별 시댁/처가 관계 특징
  const getRelationshipStyle = () => {
    const styles: Record<string, {
      approach: string;
      strength: string[];
      caution: string[];
      advice: string;
    }> = {
      목: {
        approach: '공손하고 예의바른 태도',
        strength: ['대화를 잘 듣는다', '배려심이 깊다', '이해심이 많다'],
        caution: ['너무 맞추려다 스트레스', '자기 의견 표현 부족', '경계심 필요'],
        advice: '존중하되 당신의 의견도 분명히 표현하세요'
      },
      화: {
        approach: '밝고 적극적인 태도',
        strength: ['분위기를 잘 띄운다', '친근하게 다가간다', '열정적으로 돕는다'],
        caution: ['가끔 경솔해 보일 수 있음', '지나친 친근함 주의', '말 조심 필요'],
        advice: '적극성은 좋지만 때로는 신중함도 필요합니다'
      },
      토: {
        approach: '포용력 있고 안정적인 태도',
        strength: ['믿음직하다', '집안일을 잘한다', '갈등을 중재한다'],
        caution: ['의사 표현이 느릴 수 있음', '스트레스 내면에 쌓임', '과도한 희생 주의'],
        advice: '당신의 포용력이 큰 자산이지만 한계는 정하세요'
      },
      금: {
        approach: '단정하고 품격있는 태도',
        strength: ['예의가 바르다', '책임감이 강하다', '원칙을 지킨다'],
        caution: ['너무 형식적일 수 있음', '차가워 보일 수 있음', '융통성 부족'],
        advice: '원칙은 지키되 때로는 유연함도 보여주세요'
      },
      수: {
        approach: '지혜롭고 세심한 태도',
        strength: ['눈치가 빠르다', '적응력이 좋다', '감정을 잘 읽는다'],
        caution: ['과도한 눈치 보기', '스트레스 쌓임', '거리감 느껴질 수 있음'],
        advice: '적당한 거리를 유지하며 지혜롭게 대처하세요'
      }
    };
    return styles[dayElement] || styles['목'];
  };

  const relationStyle = getRelationshipStyle();

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
        👨‍👩‍👧‍👦 시댁/처가 관계운
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님의 배우자 가족과의 인연
      </p>

      {/* 관계운 점수 */}
      <div className="glass rounded-2xl p-6 mb-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30">
        <div className="flex items-center gap-3 mb-4">
          <Users className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-bold text-white">시댁/처가 관계운</h3>
        </div>
        <div className="flex justify-between items-center mb-3">
          <p className="text-slate-300">
            {inLawScore >= 80 ? '매우 원만한 관계가 예상됩니다' :
             inLawScore >= 65 ? '전반적으로 좋은 관계를 유지할 수 있습니다' :
             inLawScore >= 50 ? '노력하면 좋은 관계를 만들 수 있습니다' :
             '인내와 지혜가 필요한 관계입니다'}
          </p>
          <p className="text-4xl font-bold text-blue-400">{inLawScore}점</p>
        </div>
        <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
            initial={{ width: 0 }}
            whileInView={{ width: `${inLawScore}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>

      {/* 관계 접근법 */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Home className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-bold text-white">나의 관계 스타일</h3>
        </div>
        <p className="text-2xl font-bold text-purple-300 mb-3">{relationStyle.approach}</p>
        <p className="text-slate-400 text-sm mb-4">
          {name}님의 일간({dayElement}) 특성에 따른 시댁/처가 대응법
        </p>
      </div>

      {/* 강점 */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-6 h-6 text-emerald-400" />
          <h3 className="text-xl font-bold text-white">관계에서의 강점</h3>
        </div>
        <div className="space-y-2">
          {relationStyle.strength.map((strength, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 p-3 bg-emerald-500/10 rounded-xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
              <span className="text-slate-300">{strength}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 주의사항 */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-6 h-6 text-yellow-400" />
          <h3 className="text-xl font-bold text-white">조심할 점</h3>
        </div>
        <div className="space-y-2">
          {relationStyle.caution.map((caution, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="text-yellow-400 flex-shrink-0">⚠️</span>
              <span className="text-slate-300">{caution}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 조언 */}
      <div className="glass rounded-2xl p-6">
        <div className="p-5 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl border border-indigo-500/30">
          <p className="text-indigo-300 font-medium mb-2">💡 전문가 조언</p>
          <p className="text-white text-lg mb-3">{relationStyle.advice}</p>
          <div className="space-y-2 text-sm text-slate-300">
            <p>• 배우자와 사전에 충분히 소통하세요</p>
            <p>• 명절과 기념일은 미리 계획하고 준비하세요</p>
            <p>• 자주 연락하고 관심을 표현하세요</p>
            <p>• 갈등이 생겼을 때는 배우자와 먼저 이야기하세요</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
