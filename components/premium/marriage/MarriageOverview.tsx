'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Heart, Sparkles, TrendingUp, Star } from 'lucide-react';

interface MarriageOverviewProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function MarriageOverview({ result, name }: MarriageOverviewProps) {
  const dayElement = result.day.stem.element;
  const { 재성, 관성, 식상, 인성 } = result.tenGodsCount;

  // 결혼운 점수 계산
  const getMarriageScore = () => {
    let score = 60;

    // 관성(남편)/재성(아내) 기준
    if (관성 >= 1) score += 15; // 배우자궁 있음
    if (재성 >= 1) score += 15;
    if (식상 >= 1) score += 5; // 로맨스 감각
    if (인성 >= 1) score += 5; // 인연운

    // 오행 균형
    if (dayElement === '목') score += 10;
    if (dayElement === '화') score += 8;
    if (dayElement === '수') score += 5;

    return Math.min(Math.max(score, 40), 100);
  };

  const marriageScore = getMarriageScore();

  // 결혼운 등급
  const getMarriageGrade = () => {
    if (marriageScore >= 80) return { grade: '최상', emoji: '💖', color: 'text-pink-400' };
    if (marriageScore >= 65) return { grade: '상', emoji: '❤️', color: 'text-rose-400' };
    if (marriageScore >= 50) return { grade: '중', emoji: '💗', color: 'text-purple-400' };
    return { grade: '노력필요', emoji: '💝', color: 'text-violet-400' };
  };

  const gradeInfo = getMarriageGrade();

  // 오행별 결혼운 특징
  const getMarriageCharacter = () => {
    const characters: Record<string, { title: string; desc: string; strength: string }> = {
      목: {
        title: '성장형 결혼운',
        desc: '서로 성장하고 발전하는 관계를 추구합니다. 지적이고 교양있는 배우자와 잘 맞으며, 함께 꿈을 키워가는 결혼생활이 어울립니다.',
        strength: '소통과 이해, 함께 배우는 즐거움'
      },
      화: {
        title: '열정형 결혼운',
        desc: '뜨겁고 열정적인 사랑을 원합니다. 활발하고 적극적인 배우자와 궁합이 좋으며, 드라마틱한 로맨스 끝에 결혼할 가능성이 높습니다.',
        strength: '열정과 낭만, 감동적인 순간들'
      },
      토: {
        title: '안정형 결혼운',
        desc: '든든하고 안정적인 가정을 꿈꿉니다. 현실적이고 책임감 있는 배우자를 선호하며, 차근차근 신뢰를 쌓아가는 결혼이 행복합니다.',
        strength: '신뢰와 안정, 평화로운 일상'
      },
      금: {
        title: '원칙형 결혼운',
        desc: '명확한 기준과 원칙이 있는 결혼을 원합니다. 단정하고 깔끔한 배우자와 잘 맞으며, 서로 존중하고 예의를 지키는 관계가 중요합니다.',
        strength: '상호존중, 품격있는 관계'
      },
      수: {
        title: '감성형 결혼운',
        desc: '깊은 감성과 교감을 나누는 결혼을 바랍니다. 지혜롭고 사려깊은 배우자와 궁합이 좋으며, 영혼의 단짝 같은 관계를 이룰 수 있습니다.',
        strength: '깊은 이해, 영혼의 교감'
      }
    };
    return characters[dayElement] || characters['목'];
  };

  const character = getMarriageCharacter();

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
        💕 결혼운 종합 개요
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님의 평생 결혼운과 배우자운
      </p>

      {/* 결혼운 점수 */}
      <div className="glass rounded-2xl p-6 mb-8 bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-500/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{gradeInfo.emoji}</span>
            <div>
              <p className="text-slate-400 text-sm">결혼운 종합 점수</p>
              <h3 className={`text-3xl font-bold ${gradeInfo.color}`}>{marriageScore}점</h3>
            </div>
          </div>
          <div className="text-right">
            <p className="text-slate-400 text-sm">등급</p>
            <p className={`text-xl font-bold ${gradeInfo.color}`}>{gradeInfo.grade}</p>
          </div>
        </div>

        {/* 점수 게이지 */}
        <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-500 to-rose-500"
            initial={{ width: 0 }}
            whileInView={{ width: `${marriageScore}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          />
        </div>
      </div>

      {/* 결혼운 유형 */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-6 h-6 text-pink-400" />
          <h3 className="text-xl font-bold text-white">{character.title}</h3>
        </div>
        <p className="text-slate-300 mb-4 leading-relaxed">{character.desc}</p>
        <div className="flex items-start gap-2 p-4 bg-pink-500/10 rounded-xl">
          <Sparkles className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-slate-400 mb-1">결혼생활의 강점</p>
            <p className="text-pink-300">{character.strength}</p>
          </div>
        </div>
      </div>

      {/* 사주 분석 */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="glass rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-5 h-5 text-yellow-400" />
            <h4 className="font-bold text-white">배우자궁 분석</h4>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm">관성(배우자)</span>
              <span className="text-white font-medium">{관성}개</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm">재성(배우자)</span>
              <span className="text-white font-medium">{재성}개</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm">식상(자녀/로맨스)</span>
              <span className="text-white font-medium">{식상}개</span>
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            <h4 className="font-bold text-white">결혼운 예측</h4>
          </div>
          <div className="space-y-2 text-sm">
            {marriageScore >= 70 && (
              <p className="text-emerald-400">✓ 좋은 배우자 인연을 만날 가능성이 높습니다</p>
            )}
            {관성 >= 1 || 재성 >= 1 ? (
              <p className="text-blue-400">✓ 배우자운이 사주에 명확히 있습니다</p>
            ) : (
              <p className="text-yellow-400">• 인연이 늦게 오거나 노력이 필요합니다</p>
            )}
            {식상 >= 1 && (
              <p className="text-purple-400">✓ 로맨틱한 연애 끝에 결혼 가능</p>
            )}
            {인성 >= 1 && (
              <p className="text-pink-400">✓ 인복이 있어 좋은 인연을 끌어당깁니다</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
