'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Users, Heart, AlertCircle, Sparkles } from 'lucide-react';

interface ChildrenSiblingProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function ChildrenSibling({ result, name }: ChildrenSiblingProps) {
  const dayElement = result.day.stem.element;
  const { 비겁, 식상, 관성 } = result.tenGodsCount;

  // 형제자매 관계 점수
  const getSiblingScore = () => {
    let score = 65;

    // 비겁 (형제자매 신)
    if (비겁 >= 2) score += 15;
    else if (비겁 === 1) score += 8;

    // 식상 (화목)
    if (식상 >= 2) score += 10;

    // 일간별 형제 관계
    if (dayElement === '수' || dayElement === '토') score += 10; // 조화
    if (dayElement === '목' || dayElement === '화') score += 5;

    return Math.min(Math.max(score, 50), 100);
  };

  const siblingScore = getSiblingScore();

  const getGrade = () => {
    if (siblingScore >= 85) return { text: '매우 좋음', color: 'text-green-400', icon: '💚' };
    if (siblingScore >= 70) return { text: '좋음', color: 'text-blue-400', icon: '💙' };
    if (siblingScore >= 60) return { text: '보통', color: 'text-yellow-400', icon: '💛' };
    return { text: '노력 필요', color: 'text-orange-400', icon: '🧡' };
  };

  const grade = getGrade();

  // 형제자매 관계 특성
  const getRelationshipCharacteristics = () => {
    if (비겁 >= 3) {
      return {
        type: '경쟁적 관계',
        icon: '⚡',
        description: '형제자매 간 경쟁 의식이 있을 수 있지만, 이는 서로를 발전시키는 동력이 됩니다.',
        strengths: ['서로 자극', '성장 동기', '강한 유대감', '경쟁력 향상'],
        challenges: ['질투심', '비교', '갈등', '부모 관심 경쟁'],
        advice: [
          '각자의 개성과 강점을 인정하세요',
          '공정하게 대하고 비교하지 마세요',
          '경쟁이 아닌 협력을 강조하세요',
          '개별 시간을 충분히 가지세요',
        ],
      };
    }
    if (비겁 >= 2) {
      return {
        type: '우애적 관계',
        icon: '👫',
        description: '형제자매와 좋은 관계를 유지하며 서로 돕고 지내게 될 것입니다.',
        strengths: ['좋은 우애', '서로 돕기', '소통 원활', '균형 잡힌 관계'],
        challenges: ['가끔 의견 충돌', '역할 분담', '관심 분배'],
        advice: [
          '형제자매 간 유대감을 키워주세요',
          '함께하는 활동을 많이 만드세요',
          '서로 배려하는 법을 가르치세요',
          '개성을 존중하세요',
        ],
      };
    }
    if (비겁 === 1) {
      return {
        type: '평범한 관계',
        icon: '🤝',
        description: '일반적인 형제자매 관계를 맺습니다. 때로는 가깝고 때로는 독립적입니다.',
        strengths: ['독립성', '갈등 적음', '자기주장', '적당한 거리'],
        challenges: ['유대감 부족', '소원함', '관심 부족'],
        advice: [
          '형제애를 키울 수 있는 기회를 만드세요',
          '함께하는 추억을 쌓으세요',
          '어릴 때부터 유대감을 형성하세요',
          '서로의 중요성을 일깨워주세요',
        ],
      };
    }
    return {
      type: '독립적 관계',
      icon: '🌟',
      description: '각자 독립적인 성향이 강해 개별적으로 성장합니다.',
      strengths: ['독립심', '개성 강함', '자율성', '갈등 회피'],
      challenges: ['유대감 형성', '협력 부족', '정서적 거리'],
      advice: [
        '어릴 때부터 형제애를 강조하세요',
        '가족 활동을 자주 하세요',
        '서로에 대한 관심을 유도하세요',
        '협력의 중요성을 가르치세요',
      ],
    };
  };

  const characteristics = getRelationshipCharacteristics();

  // 나이 차이에 따른 조언
  const ageGapAdvice = [
    {
      gap: '1-3세 차이',
      icon: '👶👶',
      characteristics: ['비슷한 관심사', '놀이 친구', '경쟁 가능'],
      parenting: [
        '공평하게 대하세요',
        '각자의 영역을 존중하세요',
        '협력 놀이를 권장하세요',
        '질투심 관리가 중요합니다',
      ],
    },
    {
      gap: '4-6세 차이',
      icon: '👦👶',
      characteristics: ['롤모델 역할', '돌봄 책임', '적당한 거리'],
      parenting: [
        '큰아이에게 과도한 책임 주지 마세요',
        '각자의 발달 단계를 고려하세요',
        '큰아이의 리더십을 격려하세요',
        '막내가 의존하지 않도록 주의하세요',
      ],
    },
    {
      gap: '7세 이상 차이',
      icon: '👨👶',
      characteristics: ['준부모 역할', '세대 차이', '독립적'],
      parenting: [
        '큰아이의 양육 참여는 자발적으로',
        '막내를 과보호하지 마세요',
        '각자의 인생을 존중하세요',
        '가족으로서의 유대감을 강조하세요',
      ],
    },
  ];

  // 형제 순서별 특성
  const birthOrderTraits = [
    {
      order: '첫째',
      icon: '👑',
      traits: ['책임감', '리더십', '완벽주의', '부모 기대'],
      support: ['부담 덜어주기', '실수 허용', '독립성 격려', '둘째와의 관계'],
    },
    {
      order: '중간',
      icon: '🤹',
      traits: ['중재자', '협상력', '유연성', '소외감 가능'],
      support: ['개별 관심 주기', '역할 인정', '자존감 키우기', '특별함 느끼게'],
    },
    {
      order: '막내',
      icon: '⭐',
      traits: ['사교적', '창의적', '의존적', '귀여움 받음'],
      support: ['독립심 키우기', '책임감 부여', '과보호 주의', '형제 존중'],
    },
    {
      order: '외동',
      icon: '💎',
      traits: ['독립적', '성숙함', '외로움', '자기중심적 가능'],
      support: ['사회성 키우기', '나눔 가르치기', '또래 관계', '협력 경험'],
    },
  ];

  // 형제 간 활동
  const bondingActivities = [
    '보드게임 함께하기',
    '역할극 놀이',
    '함께 요리하기',
    '스포츠/운동',
    '프로젝트 협력',
    '이야기 나누기',
    '여행 추억 만들기',
    '함께 책 읽기',
  ];

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
        👨‍👩‍👧‍👦 형제자매 관계
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님 자녀들의 형제자매 관계 분석
      </p>

      {/* 관계 점수 */}
      <div className="glass rounded-2xl p-8 mb-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30">
        <div className="text-center mb-6">
          <span className="text-5xl mb-3 block">{grade.icon}</span>
          <p className="text-slate-400 text-sm mb-2">형제자매 관계 점수</p>
          <div className="flex items-baseline justify-center gap-2 mb-4">
            <span className="text-5xl font-bold gradient-text">{siblingScore}</span>
            <span className="text-2xl text-slate-400">점</span>
          </div>
          <p className={`text-2xl font-bold mb-4 ${grade.color}`}>{grade.text}</p>
          <div className="h-3 bg-slate-700 rounded-full overflow-hidden max-w-md mx-auto">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: 0 }}
              whileInView={{ opacity: 1, width: `${siblingScore}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            />
          </div>
        </div>
      </div>

      {/* 관계 특성 */}
      <div className="glass rounded-2xl p-8 mb-8">
        <div className="text-center mb-6">
          <span className="text-5xl mb-3 block">{characteristics.icon}</span>
          <h3 className="text-2xl font-bold gradient-text mb-3">{characteristics.type}</h3>
          <p className="text-slate-300">{characteristics.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* 강점 */}
          <div className="glass rounded-xl p-5">
            <h4 className="text-green-400 font-bold mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              관계 강점
            </h4>
            <div className="space-y-2">
              {characteristics.strengths.map((strength, i) => (
                <p key={i} className="text-slate-300 text-sm">
                  ✓ {strength}
                </p>
              ))}
            </div>
          </div>

          {/* 도전 과제 */}
          <div className="glass rounded-xl p-5">
            <h4 className="text-orange-400 font-bold mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              주의사항
            </h4>
            <div className="space-y-2">
              {characteristics.challenges.map((challenge, i) => (
                <p key={i} className="text-slate-300 text-sm">
                  ⚠️ {challenge}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* 양육 조언 */}
        <div className="glass rounded-xl p-5 bg-blue-500/5">
          <h4 className="text-blue-400 font-bold mb-3 flex items-center gap-2">
            <Heart className="w-5 h-5" />
            부모의 역할
          </h4>
          <div className="grid md:grid-cols-2 gap-3">
            {characteristics.advice.map((tip, i) => (
              <p key={i} className="text-slate-300 text-sm">
                💡 {tip}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* 나이 차이별 조언 */}
      <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
        <Users className="w-6 h-6" />
        나이 차이별 양육 전략
      </h3>
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {ageGapAdvice.map((advice, index) => (
          <motion.div
            key={index}
            className="glass rounded-xl p-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="text-center mb-4">
              <span className="text-3xl mb-2 block">{advice.icon}</span>
              <p className="font-bold text-white">{advice.gap}</p>
            </div>
            <div className="mb-4">
              <p className="text-purple-400 text-sm font-bold mb-2">특징</p>
              <div className="space-y-1">
                {advice.characteristics.map((char, i) => (
                  <p key={i} className="text-slate-400 text-xs">
                    • {char}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <p className="text-blue-400 text-sm font-bold mb-2">양육 팁</p>
              <div className="space-y-1">
                {advice.parenting.map((tip, i) => (
                  <p key={i} className="text-slate-300 text-xs">
                    ✓ {tip}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 출생 순서별 특성 */}
      <h3 className="text-xl font-bold text-cyan-400 mb-4">출생 순서별 특성 & 지원</h3>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {birthOrderTraits.map((trait, index) => (
          <motion.div
            key={index}
            className="glass rounded-xl p-5"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{trait.icon}</span>
              <h4 className="font-bold text-white text-lg">{trait.order}</h4>
            </div>
            <div className="mb-4">
              <p className="text-yellow-400 text-sm font-bold mb-2">성향</p>
              <div className="flex flex-wrap gap-2">
                {trait.traits.map((t, i) => (
                  <span key={i} className="glass px-3 py-1 rounded-full text-xs text-slate-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-green-400 text-sm font-bold mb-2">필요한 지원</p>
              <div className="space-y-1">
                {trait.support.map((s, i) => (
                  <p key={i} className="text-slate-300 text-xs">
                    • {s}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 형제 간 유대감 활동 */}
      <h3 className="text-xl font-bold text-cyan-400 mb-4">형제 간 유대감 강화 활동</h3>
      <div className="glass rounded-xl p-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {bondingActivities.map((activity, index) => (
            <motion.div
              key={index}
              className="glass rounded-lg p-3 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <p className="text-sm text-cyan-400">{activity}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 화목한 형제 관계의 원칙 */}
      <div className="glass rounded-2xl p-6 bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/30">
        <p className="text-pink-300 font-bold mb-3">💖 화목한 형제 관계를 위한 5가지 원칙</p>
        <ul className="text-slate-300 text-sm space-y-2 leading-relaxed">
          <li>1. <strong>공평함</strong> - 모든 자녀를 동등하게 사랑하고 대하세요</li>
          <li>2. <strong>개성 존중</strong> - 각자의 강점과 개성을 인정하고 비교하지 마세요</li>
          <li>3. <strong>협력 강조</strong> - 경쟁보다 협력과 팀워크를 강조하세요</li>
          <li>4. <strong>갈등 관리</strong> - 싸움은 자연스러운 것, 해결 방법을 가르치세요</li>
          <li>5. <strong>함께 성장</strong> - 형제자매는 평생의 친구임을 알려주세요</li>
        </ul>
      </div>
    </motion.div>
  );
}
