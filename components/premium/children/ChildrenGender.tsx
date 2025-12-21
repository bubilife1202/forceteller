'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { User, Users, Star } from 'lucide-react';

interface ChildrenGenderProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function ChildrenGender({ result, name }: ChildrenGenderProps) {
  const dayElement = result.day.stem.element;
  const { 식상, 관성, 재성 } = result.tenGodsCount;

  // 성별 경향 분석 (참고용)
  const getGenderTendency = () => {
    let boyScore = 50;
    let girlScore = 50;

    // 일간 오행에 따른 경향
    if (dayElement === '목' || dayElement === '화') {
      boyScore += 10; // 양 기운
    } else if (dayElement === '금' || dayElement === '수') {
      girlScore += 10; // 음 기운
    }

    // 식상 분석
    if (식상 >= 2) {
      // 식상이 많으면 다양한 자녀
      boyScore += 5;
      girlScore += 5;
    }

    // 관성 분석
    if (관성 >= 2) {
      girlScore += 5; // 딸과 인연
    }

    // 재성 분석
    if (재성 >= 2) {
      boyScore += 5; // 아들과 인연
    }

    return {
      boy: Math.min(boyScore, 70),
      girl: Math.min(girlScore, 70),
      balanced: Math.abs(boyScore - girlScore) < 10,
    };
  };

  const tendency = getGenderTendency();

  const getBoyAdvice = () => {
    if (dayElement === '목' || dayElement === '화') {
      return {
        strength: '아들과의 기운이 잘 맞습니다. 활발하고 적극적인 성향의 아들을 잘 이끌 수 있습니다.',
        education: '체육이나 야외 활동을 권장하세요. 탐험과 도전을 격려해주면 좋습니다.',
        relationship: '아버지 역할이 중요합니다. 남성적 롤모델이 되어주세요.',
      };
    }
    if (dayElement === '토') {
      return {
        strength: '아들을 포용하고 안정적으로 키울 수 있습니다.',
        education: '인내심과 끈기를 가르치세요. 기초를 탄탄히 다지는 교육이 좋습니다.',
        relationship: '든든한 버팀목이 되어주세요. 신뢰를 중시하세요.',
      };
    }
    return {
      strength: '아들에게 지혜와 사고력을 키워줄 수 있습니다.',
      education: '독서와 사색을 장려하세요. 창의력을 발휘할 기회를 주세요.',
      relationship: '대화와 소통을 중시하세요. 친구 같은 부모가 되어주세요.',
    };
  };

  const getGirlAdvice = () => {
    if (dayElement === '금' || dayElement === '수') {
      return {
        strength: '딸과의 기운이 조화롭습니다. 섬세하고 감성적인 딸을 잘 이해할 수 있습니다.',
        education: '예술이나 음악 교육을 권장하세요. 감성을 표현할 기회를 주세요.',
        relationship: '어머니와의 유대가 깊습니다. 정서적 교감을 나누세요.',
      };
    }
    if (dayElement === '토') {
      return {
        strength: '딸을 따뜻하게 품어줄 수 있습니다.',
        education: '안정감을 주는 환경이 중요합니다. 자신감을 키워주세요.',
        relationship: '믿음과 신뢰를 바탕으로 관계를 쌓으세요.',
      };
    }
    return {
      strength: '딸에게 열정과 활력을 불어넣어 줄 수 있습니다.',
      education: '다양한 경험을 하게 해주세요. 도전 정신을 격려하세요.',
      relationship: '긍정적 에너지를 나누세요. 함께 즐기는 시간을 가지세요.',
    };
  };

  const boyAdvice = getBoyAdvice();
  const girlAdvice = getGirlAdvice();

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
        ⚖️ 성별 운세
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님의 자녀 성별 경향 (참고용)
      </p>

      {/* 면책 고지 */}
      <div className="glass rounded-2xl p-6 mb-8 bg-yellow-500/5 border border-yellow-500/20">
        <p className="text-yellow-300 font-bold mb-2">📢 중요 안내</p>
        <p className="text-slate-300 text-sm leading-relaxed">
          이 분석은 전통 사주학의 오행 이론에 기반한 <strong>참고 자료</strong>일 뿐입니다.
          실제 자녀의 성별은 과학적으로 결정되며, 성별과 관계없이 모든 자녀는 소중한 존재입니다.
          자녀의 성별보다는 건강한 출산과 행복한 양육이 더 중요합니다.
        </p>
      </div>

      {/* 경향 분석 */}
      {tendency.balanced ? (
        <div className="glass rounded-2xl p-8 mb-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30">
          <div className="text-center mb-4">
            <span className="text-5xl mb-4 block">👫</span>
            <p className="text-2xl font-bold gradient-text mb-2">균형잡힌 기운</p>
            <p className="text-slate-300 leading-relaxed">
              아들과 딸 모두와 좋은 인연이 있습니다. 성별에 관계없이 자녀를 사랑으로 키울 수 있는 사주입니다.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.div
            className="glass rounded-2xl p-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <User className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">아들 기운</p>
                <p className="text-2xl font-bold text-blue-400">{tendency.boy}%</p>
              </div>
            </div>
            <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
                initial={{ width: 0 }}
                whileInView={{ width: `${tendency.boy}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </motion.div>

          <motion.div
            className="glass rounded-2xl p-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                <User className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">딸 기운</p>
                <p className="text-2xl font-bold text-pink-400">{tendency.girl}%</p>
              </div>
            </div>
            <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-pink-500 to-rose-600"
                initial={{ width: 0 }}
                whileInView={{ width: `${tendency.girl}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </motion.div>
        </div>
      )}

      {/* 아들 양육 가이드 */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
          👦 아들 양육 가이드
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <motion.div
            className="glass rounded-xl p-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-blue-400 font-bold mb-2">💪 강점</p>
            <p className="text-slate-300 text-sm">{boyAdvice.strength}</p>
          </motion.div>
          <motion.div
            className="glass rounded-xl p-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-blue-400 font-bold mb-2">📚 교육 방향</p>
            <p className="text-slate-300 text-sm">{boyAdvice.education}</p>
          </motion.div>
          <motion.div
            className="glass rounded-xl p-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-blue-400 font-bold mb-2">❤️ 관계</p>
            <p className="text-slate-300 text-sm">{boyAdvice.relationship}</p>
          </motion.div>
        </div>
      </div>

      {/* 딸 양육 가이드 */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-pink-400 mb-4 flex items-center gap-2">
          👧 딸 양육 가이드
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <motion.div
            className="glass rounded-xl p-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-pink-400 font-bold mb-2">💪 강점</p>
            <p className="text-slate-300 text-sm">{girlAdvice.strength}</p>
          </motion.div>
          <motion.div
            className="glass rounded-xl p-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-pink-400 font-bold mb-2">📚 교육 방향</p>
            <p className="text-slate-300 text-sm">{girlAdvice.education}</p>
          </motion.div>
          <motion.div
            className="glass rounded-xl p-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-pink-400 font-bold mb-2">❤️ 관계</p>
            <p className="text-slate-300 text-sm">{girlAdvice.relationship}</p>
          </motion.div>
        </div>
      </div>

      {/* 균형 잡힌 양육 */}
      <div className="glass rounded-2xl p-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30">
        <div className="flex items-start gap-3">
          <Star className="w-6 h-6 text-indigo-400 flex-shrink-0 mt-1" />
          <div>
            <p className="text-indigo-300 font-bold mb-2">🌈 균형 잡힌 양육의 지혜</p>
            <p className="text-slate-300 text-sm leading-relaxed mb-2">
              성별에 관계없이 자녀 개개인의 성향과 재능을 존중하는 것이 가장 중요합니다.
            </p>
            <ul className="text-slate-400 text-sm space-y-1">
              <li>• 성별 고정관념을 강요하지 마세요</li>
              <li>• 아이가 좋아하는 것을 발견하도록 도와주세요</li>
              <li>• 다양한 경험의 기회를 제공하세요</li>
              <li>• 아들/딸 구분 없이 동등한 사랑을 주세요</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
