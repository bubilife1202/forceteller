'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Heart, Users, MessageCircle, Sparkles } from 'lucide-react';

interface ChildrenRelationshipProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function ChildrenRelationship({ result, name }: ChildrenRelationshipProps) {
  const dayElement = result.day.stem.element;
  const { 식상, 인성, 관성, 비겁 } = result.tenGodsCount;

  // 부모-자녀 관계 점수
  const getRelationshipScore = () => {
    let score = 70;

    // 식상 (자녀궁)
    if (식상 >= 2) score += 15;
    else if (식상 === 1) score += 8;

    // 인성 (보호, 양육)
    if (인성 >= 2) score += 10;

    // 일간별 관계성
    if (dayElement === '수' || dayElement === '목') score += 10; // 유연성
    if (dayElement === '토') score += 12; // 포용력
    if (dayElement === '화') score += 5; // 열정

    return Math.min(Math.max(score, 50), 100);
  };

  const relationshipScore = getRelationshipScore();

  // 오행별 양육 스타일
  const getParentingStyle = () => {
    switch (dayElement) {
      case '목':
        return {
          style: '성장 지향형 부모',
          icon: '🌱',
          strengths: [
            '자녀의 성장과 발전을 적극 지원합니다',
            '창의성과 자율성을 존중합니다',
            '열린 대화와 소통을 중시합니다',
            '긍정적이고 희망적인 분위기를 만듭니다',
          ],
          challenges: [
            '때로 일관성이 부족할 수 있습니다',
            '규칙 설정이 느슨할 수 있습니다',
            '과도한 자율성 부여 가능',
          ],
          tips: [
            '기본 규칙은 명확히 설정하세요',
            '약속은 반드시 지키세요',
            '체계적인 계획을 세우세요',
          ],
        };
      case '화':
        return {
          style: '열정형 부모',
          icon: '🔥',
          strengths: [
            '자녀와 함께 열정적으로 활동합니다',
            '자녀의 꿈을 적극 응원합니다',
            '따뜻하고 사랑이 넘칩니다',
            '에너지 넘치는 가정 분위기',
          ],
          challenges: [
            '감정 기복이 자녀에게 영향을 줄 수 있습니다',
            '과도한 기대를 할 수 있습니다',
            '인내심이 부족할 수 있습니다',
          ],
          tips: [
            '감정을 조절하는 연습을 하세요',
            '자녀의 속도를 존중하세요',
            '침착하게 대화하세요',
          ],
        };
      case '토':
        return {
          style: '안정 추구형 부모',
          icon: '🏔️',
          strengths: [
            '든든하고 믿음직한 부모입니다',
            '자녀에게 안정감을 제공합니다',
            '인내심이 강하고 포용력이 있습니다',
            '꾸준하고 일관된 양육을 합니다',
          ],
          challenges: [
            '변화에 소극적일 수 있습니다',
            '과보호 경향이 있을 수 있습니다',
            '새로운 시도를 주저할 수 있습니다',
          ],
          tips: [
            '새로운 경험도 적극 제공하세요',
            '자녀의 독립성을 키워주세요',
            '도전을 격려하세요',
          ],
        };
      case '금':
        return {
          style: '원칙형 부모',
          icon: '💎',
          strengths: [
            '체계적이고 계획적으로 양육합니다',
            '명확한 규칙과 원칙을 제시합니다',
            '자녀 교육에 심혈을 기울입니다',
            '책임감 있는 양육을 합니다',
          ],
          challenges: [
            '완벽주의로 자녀에게 압박을 줄 수 있습니다',
            '융통성이 부족할 수 있습니다',
            '감정 표현이 서툴 수 있습니다',
          ],
          tips: [
            '실수를 허용하는 분위기를 만드세요',
            '감정을 자주 표현하세요',
            '유연하게 대처하세요',
          ],
        };
      case '수':
        return {
          style: '지혜형 부모',
          icon: '💧',
          strengths: [
            '자녀를 깊이 이해하고 공감합니다',
            '지혜롭게 문제를 해결합니다',
            '유연하고 적응력이 뛰어납니다',
            '대화와 소통을 중시합니다',
          ],
          challenges: [
            '우유부단할 수 있습니다',
            '과도하게 분석적일 수 있습니다',
            '결정을 미룰 수 있습니다',
          ],
          tips: [
            '명확한 입장을 전달하세요',
            '때로는 단호함이 필요합니다',
            '즉각적인 대응도 중요합니다',
          ],
        };
      default:
        return {
          style: '균형형',
          icon: '⚖️',
          strengths: [],
          challenges: [],
          tips: [],
        };
    }
  };

  const parentingStyle = getParentingStyle();

  // 소통 방법
  const communicationMethods = [
    {
      age: '영유아 (0-5세)',
      icon: '👶',
      methods: [
        '스킨십과 눈맞춤',
        '부드러운 목소리',
        '반복적 표현',
        '놀이를 통한 소통',
      ],
    },
    {
      age: '아동기 (6-12세)',
      icon: '🧒',
      methods: [
        '경청하고 공감하기',
        '질문 격려하기',
        '함께 활동하기',
        '감정 표현 가르치기',
      ],
    },
    {
      age: '청소년기 (13-18세)',
      icon: '👨',
      methods: [
        '존중하는 대화',
        '독립성 인정',
        '조언보다 경청',
        '신뢰 관계 유지',
      ],
    },
  ];

  // 관계 강화 활동
  const bondingActivities = [
    {
      type: '일상 루틴',
      icon: '🏠',
      activities: ['함께 식사하기', '취침 전 대화', '주말 외출', '집안일 분담'],
      benefit: '안정감과 소속감',
    },
    {
      type: '특별한 시간',
      icon: '⭐',
      activities: ['1:1 데이트', '생일 축하', '성취 축하', '여행'],
      benefit: '특별함을 느낌',
    },
    {
      type: '공동 활동',
      icon: '🎮',
      activities: ['보드게임', '운동', '요리', '영화 감상'],
      benefit: '유대감 형성',
    },
    {
      type: '성장 지원',
      icon: '📚',
      activities: ['숙제 도움', '진로 상담', '고민 상담', '응원'],
      benefit: '신뢰와 존중',
    },
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
        👨‍👩‍👧‍👦 부모-자녀 관계
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님의 양육 스타일과 관계 개선 방법
      </p>

      {/* 관계 점수 */}
      <div className="glass rounded-2xl p-8 mb-8 bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/30">
        <div className="text-center mb-6">
          <p className="text-slate-400 text-sm mb-2">부모-자녀 관계 점수</p>
          <div className="flex items-baseline justify-center gap-2 mb-4">
            <span className="text-5xl font-bold gradient-text">{relationshipScore}</span>
            <span className="text-2xl text-slate-400">점</span>
          </div>
          <div className="h-3 bg-slate-700 rounded-full overflow-hidden max-w-md mx-auto">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
              initial={{ width: 0 }}
              whileInView={{ width: `${relationshipScore}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            />
          </div>
        </div>
      </div>

      {/* 양육 스타일 */}
      <div className="mb-8">
        <div className="text-center mb-6">
          <span className="text-6xl mb-3 block">{parentingStyle.icon}</span>
          <p className="text-2xl font-bold gradient-text">{parentingStyle.style}</p>
        </div>

        <div className="space-y-6">
          {/* 강점 */}
          <div>
            <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
              <Heart className="w-6 h-6" />
              양육 강점
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {parentingStyle.strengths.map((strength, index) => (
                <motion.div
                  key={index}
                  className="glass rounded-xl p-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <p className="text-slate-300 text-sm">✓ {strength}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 주의사항 */}
          <div>
            <h3 className="text-xl font-bold text-orange-400 mb-4 flex items-center gap-2">
              <Sparkles className="w-6 h-6" />
              주의할 점
            </h3>
            <div className="grid md:grid-cols-3 gap-3">
              {parentingStyle.challenges.map((challenge, index) => (
                <motion.div
                  key={index}
                  className="glass rounded-xl p-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <p className="text-slate-300 text-sm">⚠️ {challenge}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 개선 팁 */}
          <div>
            <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
              <MessageCircle className="w-6 h-6" />
              개선 방법
            </h3>
            <div className="grid md:grid-cols-3 gap-3">
              {parentingStyle.tips.map((tip, index) => (
                <motion.div
                  key={index}
                  className="glass rounded-xl p-4 bg-blue-500/5"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <p className="text-slate-300 text-sm">💡 {tip}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 나이별 소통 방법 */}
      <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
        <MessageCircle className="w-6 h-6" />
        나이별 소통 방법
      </h3>
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {communicationMethods.map((method, index) => (
          <motion.div
            key={index}
            className="glass rounded-xl p-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{method.icon}</span>
              <p className="font-bold text-white">{method.age}</p>
            </div>
            <ul className="space-y-2">
              {method.methods.map((m, i) => (
                <li key={i} className="text-slate-300 text-sm">
                  • {m}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* 관계 강화 활동 */}
      <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
        <Users className="w-6 h-6" />
        관계 강화 활동
      </h3>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {bondingActivities.map((activity, index) => (
          <motion.div
            key={index}
            className="glass rounded-xl p-5"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-start gap-4 mb-3">
              <span className="text-3xl">{activity.icon}</span>
              <div>
                <h4 className="font-bold text-white mb-1">{activity.type}</h4>
                <p className="text-green-400 text-sm">→ {activity.benefit}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {activity.activities.map((act, i) => (
                <span
                  key={i}
                  className="glass px-3 py-1 rounded-full text-xs text-slate-300"
                >
                  {act}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* 좋은 관계의 원칙 */}
      <div className="glass rounded-2xl p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30">
        <p className="text-purple-300 font-bold mb-3">❤️ 좋은 부모-자녀 관계의 5가지 원칙</p>
        <ul className="text-slate-300 text-sm space-y-2 leading-relaxed">
          <li>1. <strong>무조건적 사랑</strong> - 조건 없이 있는 그대로 사랑하세요</li>
          <li>2. <strong>존중과 신뢰</strong> - 자녀를 하나의 인격체로 존중하세요</li>
          <li>3. <strong>경청과 공감</strong> - 먼저 들어주고 공감해주세요</li>
          <li>4. <strong>일관성</strong> - 말과 행동을 일치시키고 약속을 지키세요</li>
          <li>5. <strong>함께하는 시간</strong> - 양보다 질 높은 시간을 보내세요</li>
        </ul>
      </div>
    </motion.div>
  );
}
