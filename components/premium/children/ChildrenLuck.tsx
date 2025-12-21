'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Gift, Star, Heart, Sparkles } from 'lucide-react';

interface ChildrenLuckProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function ChildrenLuck({ result, name }: ChildrenLuckProps) {
  const dayElement = result.day.stem.element;
  const { 식상, 인성, 재성, 관성 } = result.tenGodsCount;

  // 자녀 복 점수
  const getChildrenBlessingScore = () => {
    let score = 60;

    // 식상 (자녀 복)
    if (식상 >= 3) score += 25;
    else if (식상 >= 2) score += 15;
    else if (식상 >= 1) score += 8;

    // 인성 (자녀 교육 복)
    if (인성 >= 2) score += 10;

    // 일간별 자녀 복
    if (dayElement === '수') score += 15; // 자녀 복 최고
    if (dayElement === '목') score += 12;
    if (dayElement === '토') score += 10;
    if (dayElement === '화') score += 8;
    if (dayElement === '금') score += 6;

    return Math.min(Math.max(score, 40), 100);
  };

  const blessingScore = getChildrenBlessingScore();

  const getGrade = () => {
    if (blessingScore >= 85) return { text: '큰 복', color: 'text-yellow-400', icon: '🌟' };
    if (blessingScore >= 70) return { text: '많은 복', color: 'text-green-400', icon: '✨' };
    if (blessingScore >= 60) return { text: '적당한 복', color: 'text-blue-400', icon: '💫' };
    return { text: '노력의 복', color: 'text-purple-400', icon: '⭐' };
  };

  const grade = getGrade();

  // 자녀로 인한 복
  const getBlessings = () => {
    const blessings = [];

    // 기본 복
    blessings.push({
      type: '기쁨과 행복',
      icon: '😊',
      description: '자녀는 부모에게 가장 큰 기쁨과 삶의 활력을 줍니다.',
      manifestation: [
        '순수한 웃음과 사랑',
        '성장하는 모습을 보는 기쁨',
        '가족으로서의 완성감',
        '무조건적인 사랑 경험',
      ],
    });

    if (식상 >= 2) {
      blessings.push({
        type: '명예와 자랑',
        icon: '🏆',
        description: '자녀의 성취와 성공이 부모에게 큰 명예와 자랑이 됩니다.',
        manifestation: [
          '자녀의 학업 성취',
          '재능과 특기 발휘',
          '사회적 성공',
          '효도와 존경',
        ],
      });
    }

    if (재성 >= 2) {
      blessings.push({
        type: '경제적 안정',
        icon: '💰',
        description: '자녀가 성장하여 경제적으로 부모를 돕게 될 것입니다.',
        manifestation: [
          '노후 경제적 지원',
          '성공한 자녀의 보답',
          '가업 계승',
          '재정적 안정감',
        ],
      });
    }

    if (인성 >= 2) {
      blessings.push({
        type: '지혜와 성숙',
        icon: '📚',
        description: '자녀를 키우며 부모 자신도 성장하고 성숙해집니다.',
        manifestation: [
          '인내심 발달',
          '무조건적 사랑 배움',
          '책임감 향상',
          '인생의 지혜',
        ],
      });
    }

    if (관성 >= 2) {
      blessings.push({
        type: '가문의 영광',
        icon: '👑',
        description: '자녀가 가문을 빛내고 대를 이을 것입니다.',
        manifestation: [
          '가문의 명예',
          '후손 번영',
          '전통 계승',
          '사회적 인정',
        ],
      });
    }

    blessings.push({
      type: '노후 보장',
      icon: '🏡',
      description: '자녀는 부모의 노후를 책임지고 돌볼 것입니다.',
      manifestation: [
        '효도와 봉양',
        '정서적 지지',
        '말벗과 동반자',
        '안정된 노년',
      ],
    });

    return blessings;
  };

  const blessings = getBlessings();

  // 자녀 복을 높이는 방법
  const enhancementMethods = [
    {
      category: '정성과 사랑',
      icon: '❤️',
      methods: [
        '무조건적 사랑 주기',
        '충분한 시간 함께하기',
        '긍정적 말 자주 하기',
        '스킨십과 포옹',
      ],
    },
    {
      category: '교육과 양육',
      icon: '📚',
      methods: [
        '좋은 교육 환경 제공',
        '재능 발견 지원',
        '인성 교육 중시',
        '롤모델 되기',
      ],
    },
    {
      category: '덕행 쌓기',
      icon: '🙏',
      methods: [
        '선행과 나눔 실천',
        '조상 공경',
        '감사하는 마음',
        '정직하고 성실한 삶',
      ],
    },
    {
      category: '환경 조성',
      icon: '🏠',
      methods: [
        '화목한 가정 분위기',
        '안정적 생활 환경',
        '긍정적 에너지',
        '건강한 생활 습관',
      ],
    },
  ];

  // 생애 주기별 자녀 복
  const lifeCycleBlessings = [
    {
      period: '영유아기',
      age: '0-6세',
      blessing: '순수한 사랑과 기쁨',
      description: '아이의 순수함과 웃음이 부모에게 가장 큰 행복을 줍니다.',
    },
    {
      period: '아동기',
      age: '7-12세',
      blessing: '성장의 보람',
      description: '아이가 배우고 성장하는 모습에서 큰 보람을 느낍니다.',
    },
    {
      period: '청소년기',
      age: '13-18세',
      blessing: '자립의 기쁨',
      description: '자녀의 독립과 성취가 부모의 자랑이 됩니다.',
    },
    {
      period: '성인기',
      age: '19세+',
      blessing: '효도와 보답',
      description: '성장한 자녀의 효도와 사랑이 노후의 큰 복이 됩니다.',
    },
  ];

  // 자녀 복의 징조
  const blessingsSigns = [
    '자녀가 건강하게 성장합니다',
    '자녀가 밝고 긍정적입니다',
    '자녀가 부모를 공경합니다',
    '자녀가 학업/일에서 성실합니다',
    '자녀가 좋은 친구들과 어울립니다',
    '자녀가 재능을 발휘합니다',
    '자녀가 어려운 이웃을 돕습니다',
    '자녀가 감사할 줄 압니다',
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
        🎁 자녀로 인한 복
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님이 자녀로부터 받을 복과 기쁨
      </p>

      {/* 자녀 복 점수 */}
      <div className="glass rounded-2xl p-8 mb-8 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/30">
        <div className="text-center mb-6">
          <span className="text-6xl mb-3 block">{grade.icon}</span>
          <p className="text-slate-400 text-sm mb-2">자녀 복 지수</p>
          <div className="flex items-baseline justify-center gap-2 mb-4">
            <span className="text-5xl font-bold gradient-text">{blessingScore}</span>
            <span className="text-2xl text-slate-400">점</span>
          </div>
          <p className={`text-2xl font-bold mb-4 ${grade.color}`}>{grade.text}</p>
          <div className="h-3 bg-slate-700 rounded-full overflow-hidden max-w-md mx-auto mb-4">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500"
              initial={{ width: 0 }}
              whileInView={{ width: `${blessingScore}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            />
          </div>
          <p className="text-slate-300 text-sm">
            {blessingScore >= 85
              ? '자녀로 인한 복이 매우 큰 사주입니다!'
              : blessingScore >= 70
              ? '자녀를 통해 많은 기쁨과 복을 누릴 것입니다.'
              : '자녀와 함께 행복한 삶을 살아갈 것입니다.'}
          </p>
        </div>
      </div>

      {/* 받을 복 */}
      <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
        <Gift className="w-6 h-6" />
        자녀로부터 받을 복
      </h3>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {blessings.map((blessing, index) => (
          <motion.div
            key={index}
            className="glass rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-start gap-4 mb-4">
              <span className="text-4xl">{blessing.icon}</span>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-white mb-2">{blessing.type}</h4>
                <p className="text-slate-300 text-sm mb-3">{blessing.description}</p>
                <div className="glass rounded-lg p-3 bg-green-500/5">
                  <p className="text-green-400 text-xs font-bold mb-2">구체적 복:</p>
                  <div className="space-y-1">
                    {blessing.manifestation.map((item, i) => (
                      <p key={i} className="text-slate-300 text-xs">
                        ✨ {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 자녀 복을 높이는 방법 */}
      <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
        <Star className="w-6 h-6" />
        자녀 복을 더욱 키우는 방법
      </h3>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {enhancementMethods.map((method, index) => (
          <motion.div
            key={index}
            className="glass rounded-xl p-5"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{method.icon}</span>
              <h4 className="font-bold text-white">{method.category}</h4>
            </div>
            <div className="space-y-2">
              {method.methods.map((m, i) => (
                <div key={i} className="glass rounded-lg p-2">
                  <p className="text-slate-300 text-sm">• {m}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* 생애 주기별 복 */}
      <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
        <Heart className="w-6 h-6" />
        자녀 성장 단계별 받을 복
      </h3>
      <div className="space-y-3 mb-8">
        {lifeCycleBlessings.map((cycle, index) => (
          <motion.div
            key={index}
            className="glass rounded-xl p-5"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-bold text-white">{cycle.period}</h4>
                  <span className="text-sm text-slate-400">({cycle.age})</span>
                </div>
                <p className="text-purple-400 font-bold text-sm mb-2">💝 {cycle.blessing}</p>
                <p className="text-slate-300 text-sm">{cycle.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 자녀 복의 징조 */}
      <h3 className="text-xl font-bold text-cyan-400 mb-4">자녀 복이 있는 징조</h3>
      <div className="glass rounded-xl p-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {blessingsSigns.map((sign, index) => (
            <motion.div
              key={index}
              className="glass rounded-lg p-3 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <p className="text-sm text-green-400">✓ {sign}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 마무리 메시지 */}
      <div className="glass rounded-2xl p-6 bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/30">
        <div className="text-center">
          <p className="text-2xl mb-4">🌟</p>
          <p className="text-purple-300 font-bold mb-3">자녀는 하늘이 주신 가장 큰 선물</p>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            자녀로 인한 복은 사주에 정해진 것이 아니라, 부모의 사랑과 정성으로 만들어갑니다.
            자녀를 사랑으로 키우고, 좋은 본보기를 보이며, 함께 성장하는 것이 가장 큰 복을 부르는 길입니다.
          </p>
          <p className="text-yellow-400 font-bold text-sm">
            ✨ {name}님과 자녀 모두에게 행복과 복이 가득하기를 기원합니다 ✨
          </p>
        </div>
      </div>
    </motion.div>
  );
}
