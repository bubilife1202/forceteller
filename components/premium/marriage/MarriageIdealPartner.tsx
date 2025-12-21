'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { User, Sparkles, Heart, Award } from 'lucide-react';

interface MarriageIdealPartnerProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function MarriageIdealPartner({ result, name }: MarriageIdealPartnerProps) {
  const dayElement = result.day.stem.element;

  // 오행별 이상적인 배우자 특징
  const getIdealPartner = () => {
    const partners: Record<string, {
      element: string;
      personality: string[];
      appearance: string[];
      values: string[];
      occupation: string[];
    }> = {
      목: {
        element: '화(火) 또는 수(水) 오행',
        personality: ['지적이고 교양있는', '대화를 즐기는', '성장 지향적', '인내심 있는'],
        appearance: ['날씬하고 키가 큰', '청순하고 단정한', '지적인 인상', '부드러운 미소'],
        values: ['배움과 성장', '자유와 독립', '소통과 이해', '문화생활'],
        occupation: ['교육자', '작가/저널리스트', '기획자', '연구원', '상담사']
      },
      화: {
        element: '목(木) 또는 토(土) 오행',
        personality: ['열정적이고 적극적', '밝고 긍정적', '사교적이고 활발한', '솔직담백한'],
        appearance: ['화사하고 밝은', '활기찬 표정', '건강미 넘치는', '패션 센스 좋은'],
        values: ['열정과 도전', '즐거움과 행복', '사회적 성공', '활동적 라이프'],
        occupation: ['마케터', '영업/세일즈', '연예인', '디자이너', '이벤트 기획자']
      },
      토: {
        element: '화(火) 또는 금(金) 오행',
        personality: ['성실하고 책임감 있는', '현실적이고 안정적', '포용력 있는', '차분하고 든든한'],
        appearance: ['부드럽고 푸근한', '안정감 주는', '건강한 체격', '따뜻한 인상'],
        values: ['가족과 안정', '신뢰와 책임', '물질적 풍요', '평화로운 일상'],
        occupation: ['공무원', '회계사', '부동산 전문가', '요식업', '금융인']
      },
      금: {
        element: '토(土) 또는 수(水) 오행',
        personality: ['원칙을 지키는', '깔끔하고 단정한', '냉철하고 이성적', '품격있는'],
        appearance: ['단정하고 깔끔한', '세련된 스타일', '고급스러운', '절제된 우아함'],
        values: ['품격과 원칙', '정직과 정의', '전문성', '질서와 규칙'],
        occupation: ['법조인', '의사', '엔지니어', '건축가', '금융 전문가']
      },
      수: {
        element: '금(金) 또는 목(木) 오행',
        personality: ['지혜롭고 사려깊은', '감성적이고 섬세한', '유연하고 적응력 좋은', '신비로운 매력'],
        appearance: ['신비로운 인상', '부드러운 곡선미', '맑은 눈빛', '우아한 몸가짐'],
        values: ['지혜와 통찰', '감성과 예술', '자유로움', '정신적 교감'],
        occupation: ['예술가', '심리상담사', '작가', '의료인', '연구원']
      }
    };
    return partners[dayElement] || partners['목'];
  };

  const ideal = getIdealPartner();

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
        ✨ 이상적인 배우자상
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님과 궁합이 좋은 배우자 유형
      </p>

      {/* 오행 궁합 */}
      <div className="glass rounded-2xl p-6 mb-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30">
        <div className="flex items-center gap-3 mb-3">
          <User className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-bold text-white">최적의 배우자 오행</h3>
        </div>
        <p className="text-2xl font-bold text-purple-300 mb-2">{ideal.element}</p>
        <p className="text-slate-400 text-sm">
          {name}님의 일간({dayElement})과 조화를 이루는 오행입니다
        </p>
      </div>

      {/* 성격 특징 */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-6 h-6 text-rose-400" />
          <h3 className="text-xl font-bold text-white">성격 특징</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {ideal.personality.map((trait, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2 p-3 bg-rose-500/10 rounded-xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-2 h-2 rounded-full bg-rose-400" />
              <span className="text-slate-300">{trait}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 외모 스타일 */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-cyan-400" />
          <h3 className="text-xl font-bold text-white">외모와 스타일</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {ideal.appearance.map((style, index) => (
            <motion.span
              key={index}
              className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-full text-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {style}
            </motion.span>
          ))}
        </div>
      </div>

      {/* 가치관 */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-6 h-6 text-yellow-400" />
          <h3 className="text-xl font-bold text-white">중요시하는 가치관</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {ideal.values.map((value, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-xl"
            >
              <span className="text-yellow-400">•</span>
              <span className="text-slate-300">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 추천 직업 */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">궁합 좋은 배우자 직업</h3>
        <div className="flex flex-wrap gap-2">
          {ideal.occupation.map((job, index) => (
            <motion.div
              key={index}
              className="px-4 py-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-xl"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <span className="text-indigo-300">{job}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
