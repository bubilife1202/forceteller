'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Baby, Users, Calendar, Heart } from 'lucide-react';

interface MarriageChildrenProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function MarriageChildren({ result, name }: MarriageChildrenProps) {
  const dayElement = result.day.stem.element;
  const { 식상, 관성, 인성 } = result.tenGodsCount;

  // 자녀운 점수
  const getChildrenScore = () => {
    let score = 60;
    if (식상 >= 2) score += 25; // 식상은 자녀궁
    if (식상 >= 1) score += 10;
    if (인성 >= 1) score += 10; // 자녀 양육에 좋음
    if (관성 >= 1) score += 5;

    return Math.min(Math.max(score, 40), 100);
  };

  const childrenScore = getChildrenScore();

  // 자녀 수와 성별 예측
  const getChildrenPrediction = () => {
    const predictions: Record<string, {
      number: string;
      gender: string;
      timing: string;
      advice: string;
    }> = {
      목: {
        number: '2-3명',
        gender: '첫째 아들, 둘째 딸 가능성',
        timing: '결혼 후 2-3년 이내',
        advice: '교육열이 높아 자녀를 잘 키울 수 있습니다'
      },
      화: {
        number: '2명',
        gender: '아들딸 골고루',
        timing: '결혼 후 1-2년 이내',
        advice: '활발하고 건강한 자녀를 기대할 수 있습니다'
      },
      토: {
        number: '2-3명',
        gender: '딸 많을 가능성',
        timing: '결혼 후 2-4년 이내',
        advice: '포용력으로 자녀들을 잘 돌볼 수 있습니다'
      },
      금: {
        number: '1-2명',
        gender: '아들 가능성 높음',
        timing: '결혼 후 3-5년 이내',
        advice: '원칙 있게 자녀를 키울 수 있습니다'
      },
      수: {
        number: '1-2명',
        gender: '딸 가능성 높음',
        timing: '결혼 후 3-4년 이내',
        advice: '감성적으로 자녀와 교감할 수 있습니다'
      }
    };
    return predictions[dayElement] || predictions['목'];
  };

  const prediction = getChildrenPrediction();

  // 양육 스타일
  const getParentingStyle = () => {
    const styles: Record<string, { type: string; characteristics: string[]; strength: string }> = {
      목: {
        type: '교육형 부모',
        characteristics: ['책 많이 읽어주기', '다양한 경험 제공', '대화로 소통', '자율성 존중'],
        strength: '자녀의 잠재력을 키워주는 교육자형 부모'
      },
      화: {
        type: '친구형 부모',
        characteristics: ['함께 놀아주기', '활동적 양육', '칭찬 많이', '밝은 분위기'],
        strength: '자녀와 함께 즐겁게 성장하는 부모'
      },
      토: {
        type: '보호형 부모',
        characteristics: ['세심한 돌봄', '규칙적 생활', '건강 관리', '안정감 제공'],
        strength: '자녀에게 든든한 버팀목이 되는 부모'
      },
      금: {
        type: '원칙형 부모',
        characteristics: ['규칙 중시', '책임감 교육', '예의범절', '정직성 강조'],
        strength: '올바른 가치관을 심어주는 부모'
      },
      수: {
        type: '공감형 부모',
        characteristics: ['감정 교감', '창의성 격려', '자유로운 표현', '마음 읽어주기'],
        strength: '자녀의 내면을 이해하는 감성적 부모'
      }
    };
    return styles[dayElement] || styles['목'];
  };

  const parentingStyle = getParentingStyle();

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
        👶 자녀 계획 운세
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님의 자녀운과 양육 스타일
      </p>

      {/* 자녀운 점수 */}
      <div className="glass rounded-2xl p-6 mb-6 bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-500/30">
        <div className="flex items-center gap-3 mb-4">
          <Baby className="w-6 h-6 text-pink-400" />
          <h3 className="text-xl font-bold text-white">자녀운</h3>
        </div>
        <div className="flex justify-between items-center mb-3">
          <p className="text-slate-300">
            {childrenScore >= 80 ? '자녀복이 매우 좋습니다' :
             childrenScore >= 65 ? '건강한 자녀를 기대할 수 있습니다' :
             childrenScore >= 50 ? '평범한 자녀운입니다' :
             '자녀 계획은 신중하게 세우세요'}
          </p>
          <p className="text-4xl font-bold text-pink-400">{childrenScore}점</p>
        </div>
        <div className="h-3 bg-slate-700 rounded-full overflow-hidden mb-3">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-500 to-rose-500"
            initial={{ width: 0 }}
            whileInView={{ width: `${childrenScore}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />
        </div>
        <div className="text-sm text-slate-400">
          식상(자녀궁): {식상}개 {식상 >= 2 ? '- 자녀운 강함' : 식상 >= 1 ? '- 보통' : '- 약함'}
        </div>
      </div>

      {/* 자녀 예측 */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-bold text-white">자녀 예측</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
            <p className="text-purple-400 text-sm mb-1">예상 자녀 수</p>
            <p className="text-2xl font-bold text-white">{prediction.number}</p>
          </div>
          <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <p className="text-blue-400 text-sm mb-1">성별 예측</p>
            <p className="text-lg font-medium text-white">{prediction.gender}</p>
          </div>
        </div>
        <div className="p-4 bg-slate-800/50 rounded-xl mb-3">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-cyan-400" />
            <p className="text-cyan-400 font-medium">출산 시기</p>
          </div>
          <p className="text-white">{prediction.timing}</p>
        </div>
        <p className="text-slate-300 text-sm">{prediction.advice}</p>
      </div>

      {/* 양육 스타일 */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-6 h-6 text-rose-400" />
          <h3 className="text-xl font-bold text-white">나의 양육 스타일</h3>
        </div>
        <p className="text-2xl font-bold text-rose-300 mb-3">{parentingStyle.type}</p>
        <p className="text-slate-300 mb-4">{parentingStyle.strength}</p>
        <div className="grid md:grid-cols-2 gap-3">
          {parentingStyle.characteristics.map((char, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2 p-3 bg-rose-500/10 rounded-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-2 h-2 rounded-full bg-rose-400 flex-shrink-0" />
              <span className="text-slate-300">{char}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 자녀 교육 조언 */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">자녀 교육 조언</h3>
        <div className="space-y-3">
          <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl border border-emerald-500/20">
            <p className="text-emerald-400 font-medium mb-2">💚 부모로서의 강점</p>
            <p className="text-slate-300 text-sm">
              {dayElement === '목' && '자녀의 교육과 성장에 열정적입니다'}
              {dayElement === '화' && '자녀와 즐겁고 활기차게 지냅니다'}
              {dayElement === '토' && '자녀에게 안정감과 신뢰를 줍니다'}
              {dayElement === '금' && '자녀에게 바른 가치관을 심어줍니다'}
              {dayElement === '수' && '자녀의 마음을 잘 이해합니다'}
            </p>
          </div>
          <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
            <p className="text-yellow-400 font-medium mb-2">⚠️ 주의할 점</p>
            <p className="text-slate-300 text-sm">
              {dayElement === '목' && '너무 많은 것을 가르치려 하지 마세요'}
              {dayElement === '화' && '일관성 있는 훈육이 필요합니다'}
              {dayElement === '토' && '과잉보호를 조심하세요'}
              {dayElement === '금' && '너무 엄격하지 않게 주의하세요'}
              {dayElement === '수' && '감정에 휩쓸리지 않도록 하세요'}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
