'use client';

import { motion } from 'framer-motion';
import { Users, TrendingUp, Scale } from 'lucide-react';
import { TaemongFormData } from '@/components/TaemongForm';

interface TaemongGenderProps {
  formData: TaemongFormData;
}

export default function TaemongGender({ formData }: TaemongGenderProps) {
  // 성별 예측 (전통적인 태몽 해석 기준)
  const predictGender = () => {
    const content = formData.dreamContent.toLowerCase();
    let maleScore = 0;
    let femaleScore = 0;

    // 남아 암시
    const maleKeywords = [
      '용',
      '호랑이',
      '범',
      '해',
      '태양',
      '칼',
      '도끼',
      '말',
      '소',
      '독수리',
      '매',
      '큰',
      '강한',
      '용감',
      '힘',
    ];
    // 여아 암시
    const femaleKeywords = [
      '달',
      '꽃',
      '장미',
      '모란',
      '비단',
      '귀걸이',
      '반지',
      '진주',
      '구슬',
      '나비',
      '새',
      '작은',
      '아름다운',
      '예쁜',
    ];

    maleKeywords.forEach((keyword) => {
      if (content.includes(keyword)) maleScore += 1;
    });
    femaleKeywords.forEach((keyword) => {
      if (content.includes(keyword)) femaleScore += 1;
    });

    // 색상 분석
    if (content.includes('빨간') || content.includes('붉은')) maleScore += 0.5;
    if (content.includes('황금') || content.includes('금색')) maleScore += 0.5;
    if (content.includes('파란') || content.includes('푸른')) femaleScore += 0.5;
    if (content.includes('분홍') || content.includes('pink')) femaleScore += 1;

    // 카테고리 가중치
    if (formData.dreamCategory === 'animal') maleScore += 0.3;
    if (formData.dreamCategory === 'plant') femaleScore += 0.3;
    if (formData.dreamCategory === 'nature') maleScore += 0.2;
    if (formData.dreamCategory === 'object') femaleScore += 0.2;

    const total = maleScore + femaleScore;
    const malePercent = total > 0 ? Math.round((maleScore / total) * 100) : 50;
    const femalePercent = 100 - malePercent;

    let prediction = '중립';
    if (malePercent > 65) prediction = '남아';
    else if (femalePercent > 65) prediction = '여아';

    return {
      prediction,
      malePercent,
      femalePercent,
      confidence: Math.abs(malePercent - 50) * 2, // 0-100%
    };
  };

  const gender = predictGender();

  const getMaleReasons = () => {
    const content = formData.dreamContent.toLowerCase();
    const reasons: string[] = [];

    if (content.includes('용') || content.includes('룡')) {
      reasons.push('용은 황제를 상징하는 대표적인 남아 태몽입니다');
    }
    if (content.includes('호랑이') || content.includes('범')) {
      reasons.push('호랑이는 용맹한 남아를 암시합니다');
    }
    if (content.includes('해') || content.includes('태양')) {
      reasons.push('태양은 양(陽)의 기운으로 남아를 나타냅니다');
    }
    if (content.includes('빨간') || content.includes('붉은')) {
      reasons.push('붉은색은 강한 양의 기운을 상징합니다');
    }
    if (content.includes('칼') || content.includes('도끼')) {
      reasons.push('무기류는 남성적 기질을 암시합니다');
    }

    if (reasons.length === 0) {
      reasons.push('태몽의 전체적인 기운이 강하고 활동적입니다');
    }

    return reasons;
  };

  const getFemaleReasons = () => {
    const content = formData.dreamContent.toLowerCase();
    const reasons: string[] = [];

    if (content.includes('달')) {
      reasons.push('달은 음(陰)의 기운으로 여아를 나타냅니다');
    }
    if (content.includes('꽃') || content.includes('장미') || content.includes('모란')) {
      reasons.push('꽃은 아름다운 여아를 상징하는 대표 태몽입니다');
    }
    if (content.includes('비단') || content.includes('귀걸이') || content.includes('반지')) {
      reasons.push('장신구는 귀한 여아를 암시합니다');
    }
    if (content.includes('진주') || content.includes('구슬')) {
      reasons.push('진주나 구슬은 여아의 태몽으로 여겨집니다');
    }
    if (content.includes('나비') || content.includes('작은 새')) {
      reasons.push('나비나 작은 새는 여성적 섬세함을 상징합니다');
    }

    if (reasons.length === 0) {
      reasons.push('태몽의 전체적인 느낌이 부드럽고 아름답습니다');
    }

    return reasons;
  };

  const maleReasons = getMaleReasons();
  const femaleReasons = getFemaleReasons();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-10"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-pink-500 flex items-center justify-center">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2
            className="text-2xl md:text-3xl font-bold text-white"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            성별 예측
          </h2>
          <p className="text-slate-400 text-sm">전통 태몽 해석 기준</p>
        </div>
      </div>

      {/* 중요 안내 */}
      <motion.div
        className="mb-8 p-5 bg-amber-500/10 border border-amber-500/30 rounded-2xl"
        variants={itemVariants}
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <p className="text-amber-400 font-semibold mb-1">참고용 해석입니다</p>
            <p className="text-slate-300 text-sm leading-relaxed">
              전통적인 태몽 해석을 바탕으로 한 참고 자료일 뿐, 의학적 근거는 없습니다.
              정확한 성별은 산부인과 진료를 통해 확인하시기 바랍니다.
            </p>
          </div>
        </div>
      </motion.div>

      {/* 예측 결과 */}
      <motion.div className="text-center mb-10" variants={itemVariants}>
        <div className="inline-block mb-6">
          <div className="text-6xl mb-4">
            {gender.prediction === '남아' ? '👦' : gender.prediction === '여아' ? '👧' : '👶'}
          </div>
          <div
            className={`px-8 py-4 rounded-2xl font-bold text-2xl ${
              gender.prediction === '남아'
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                : gender.prediction === '여아'
                ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
                : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
            }`}
          >
            {gender.prediction === '남아' && '남아 가능성 높음'}
            {gender.prediction === '여아' && '여아 가능성 높음'}
            {gender.prediction === '중립' && '성별 특성이 중립적'}
          </div>
        </div>

        {gender.confidence > 30 && (
          <p className="text-slate-400">
            신뢰도: {Math.round(gender.confidence)}% (전통 해석 기준)
          </p>
        )}
      </motion.div>

      {/* 비율 시각화 */}
      <motion.div className="mb-8" variants={itemVariants}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👦</span>
            <span className="text-blue-400 font-semibold">남아</span>
          </div>
          <span className="text-blue-400 font-bold">{gender.malePercent}%</span>
        </div>
        <div className="h-4 bg-slate-800 rounded-full overflow-hidden mb-1">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
            initial={{ width: 0 }}
            whileInView={{ width: `${gender.malePercent}%` }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </div>

        <div className="flex items-center justify-between mb-3 mt-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👧</span>
            <span className="text-pink-400 font-semibold">여아</span>
          </div>
          <span className="text-pink-400 font-bold">{gender.femalePercent}%</span>
        </div>
        <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-500 to-pink-400"
            initial={{ width: 0 }}
            whileInView={{ width: `${gender.femalePercent}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </motion.div>

      {/* 남아 근거 */}
      {gender.malePercent > 35 && (
        <motion.div className="mb-6 glass rounded-2xl p-6" variants={itemVariants}>
          <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            남아 특성
          </h3>
          <ul className="space-y-2">
            {maleReasons.map((reason, index) => (
              <li key={index} className="flex items-start gap-2 text-slate-300">
                <span className="text-blue-400 mt-1">•</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* 여아 근거 */}
      {gender.femalePercent > 35 && (
        <motion.div className="mb-6 glass rounded-2xl p-6" variants={itemVariants}>
          <h3 className="text-lg font-bold text-pink-400 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            여아 특성
          </h3>
          <ul className="space-y-2">
            {femaleReasons.map((reason, index) => (
              <li key={index} className="flex items-start gap-2 text-slate-300">
                <span className="text-pink-400 mt-1">•</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* 중립적일 때 */}
      {gender.prediction === '중립' && (
        <motion.div className="glass rounded-2xl p-6" variants={itemVariants}>
          <div className="flex items-center gap-3 mb-3">
            <Scale className="w-6 h-6 text-purple-400" />
            <h3 className="text-lg font-bold text-purple-400">균형잡힌 태몽</h3>
          </div>
          <p className="text-slate-300 leading-relaxed">
            이 태몽은 남성적 특성과 여성적 특성이 조화롭게 나타나고 있습니다. 아이가 남아든
            여아든, 양성의 장점을 고루 갖춘 균형잡힌 성품을 가질 것으로 해석됩니다.
          </p>
        </motion.div>
      )}

      {/* 추가 안내 */}
      <motion.div
        className="mt-8 p-5 bg-slate-800/50 rounded-xl"
        variants={itemVariants}
      >
        <h4 className="font-semibold text-white mb-2">💡 알아두세요</h4>
        <ul className="text-slate-400 text-sm space-y-1">
          <li>• 태몽은 성별보다는 아이의 성품과 운명을 더 중요하게 봅니다</li>
          <li>• 같은 태몽이라도 해석은 다양할 수 있습니다</li>
          <li>• 가장 중요한 것은 건강한 아이를 낳는 것입니다</li>
        </ul>
      </motion.div>
    </motion.div>
  );
}
