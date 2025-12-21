'use client';

import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, PiggyBank, Sparkles } from 'lucide-react';
import { TaemongFormData } from '@/components/TaemongForm';

interface TaemongWealthProps {
  formData: TaemongFormData;
}

export default function TaemongWealth({ formData }: TaemongWealthProps) {
  // 재물운 분석
  const analyzeWealth = () => {
    const content = formData.dreamContent.toLowerCase();
    let score = 50;
    let grade = '보통';

    // 재물운 키워드 체크
    if (content.includes('금') || content.includes('황금')) score += 20;
    if (content.includes('돼지')) score += 18;
    if (content.includes('잉어') || content.includes('물고기')) score += 15;
    if (content.includes('보석') || content.includes('다이아') || content.includes('구슬'))
      score += 15;
    if (content.includes('용')) score += 12;
    if (content.includes('뱀')) score += 10;
    if (content.includes('곡식') || content.includes('쌀') || content.includes('곡물')) score += 10;
    if (content.includes('많은') || content.includes('가득')) score += 8;

    // 부정적 키워드
    if (content.includes('잃어버린') || content.includes('없어진')) score -= 15;
    if (content.includes('가난') || content.includes('궁핍')) score -= 10;

    score = Math.min(Math.max(score, 30), 100);

    if (score >= 80) grade = '대길';
    else if (score >= 65) grade = '길';
    else if (score >= 50) grade = '중길';
    else grade = '보통';

    return { score, grade };
  };

  // 재물 유형
  const getWealthTypes = () => {
    const content = formData.dreamContent.toLowerCase();
    const types: Array<{ icon: string; name: string; description: string }> = [];

    if (content.includes('금') || content.includes('황금') || content.includes('보석')) {
      types.push({
        icon: '💰',
        name: '정재(正財) - 근로소득',
        description:
          '성실한 노동과 업무를 통한 정당한 수입이 많습니다. 월급이나 사업 수익이 안정적으로 들어올 것입니다.',
      });
    }

    if (content.includes('돼지') || content.includes('복권') || content.includes('횡재')) {
      types.push({
        icon: '🎰',
        name: '편재(偏財) - 부수입',
        description:
          '예상치 못한 재물이 들어오는 횡재운이 있습니다. 투자, 부동산, 부업 등을 통한 수입이 기대됩니다.',
      });
    }

    if (content.includes('집') || content.includes('건물') || content.includes('땅')) {
      types.push({
        icon: '🏠',
        name: '부동산 재물',
        description:
          '부동산을 통한 재물운이 좋습니다. 집이나 땅을 사고파는 과정에서 이익을 볼 가능성이 높습니다.',
      });
    }

    if (content.includes('뱀') || content.includes('잉어')) {
      types.push({
        icon: '📈',
        name: '투자 재물',
        description:
          '주식, 펀드 등 투자를 통한 재물 증식 능력이 있습니다. 금융 감각이 뛰어나 재테크에 성공할 것입니다.',
      });
    }

    if (types.length === 0) {
      types.push({
        icon: '💵',
        name: '꾸준한 축적',
        description:
          '크게 벌지는 않지만 꾸준히 모으는 타입입니다. 성실한 저축으로 재산을 불릴 것입니다.',
      });
    }

    return types;
  };

  // 시기별 재물운
  const getWealthByAge = () => {
    const wealth = analyzeWealth();
    const base = wealth.score;

    return [
      {
        age: '20대',
        score: Math.min(base - 10, 100),
        description: '기반을 다지는 시기. 저축과 자기계발에 투자하세요.',
      },
      {
        age: '30대',
        score: Math.min(base + 5, 100),
        description: '수입이 늘어나는 시기. 본격적으로 재산을 축적합니다.',
      },
      {
        age: '40대',
        score: Math.min(base + 10, 100),
        description: '재물운이 절정. 큰 재산을 모을 수 있는 황금기입니다.',
      },
      {
        age: '50대 이후',
        score: Math.min(base + 15, 100),
        description: '안정적인 재정 상태. 노후 걱정 없이 풍족하게 살 것입니다.',
      },
    ];
  };

  const wealth = analyzeWealth();
  const wealthTypes = getWealthTypes();
  const wealthByAge = getWealthByAge();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
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
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center">
          <DollarSign className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2
            className="text-2xl md:text-3xl font-bold text-white"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            평생 재물운
          </h2>
          <p className="text-slate-400 text-sm">금전적 풍요와 번영</p>
        </div>
      </div>

      {/* 재물운 점수 */}
      <motion.div className="text-center mb-10" variants={itemVariants}>
        <div className="inline-block">
          <div className="relative mb-4">
            <svg width="180" height="180" className="transform -rotate-90">
              <circle
                cx="90"
                cy="90"
                r="80"
                stroke="currentColor"
                strokeWidth="10"
                fill="none"
                className="text-slate-700"
              />
              <motion.circle
                cx="90"
                cy="90"
                r="80"
                stroke="url(#wealthGradient)"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                initial={{ strokeDasharray: '0 502' }}
                whileInView={{ strokeDasharray: `${(wealth.score / 100) * 502} 502` }}
                transition={{ duration: 1.5, delay: 0.3 }}
              />
              <defs>
                <linearGradient id="wealthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-amber-400">{wealth.score}</span>
              <span className="text-slate-400 text-sm">점</span>
            </div>
          </div>
          <div className="px-6 py-2 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-full border border-yellow-500/30">
            <span className="text-xl font-bold text-amber-400">{wealth.grade}</span>
          </div>
        </div>
      </motion.div>

      {/* 재물 유형 */}
      <motion.div className="mb-8" variants={itemVariants}>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-yellow-400" />
          <h3 className="text-xl font-bold text-white">재물 유형</h3>
        </div>
        <div className="space-y-4">
          {wealthTypes.map((type) => (
            <div key={type.name} className="glass rounded-xl p-5">
              <div className="flex items-start gap-3">
                <span className="text-3xl">{type.icon}</span>
                <div className="flex-1">
                  <h4 className="font-bold text-amber-400 mb-2">{type.name}</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">{type.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 시기별 재물운 */}
      <motion.div className="mb-8" variants={itemVariants}>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-6 h-6 text-green-400" />
          <h3 className="text-xl font-bold text-white">시기별 재물운</h3>
        </div>
        <div className="space-y-4">
          {wealthByAge.map((period, index) => (
            <div key={period.age} className="glass rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-white">{period.age}</h4>
                <span className="text-amber-400 font-bold">{period.score}점</span>
              </div>
              <p className="text-slate-300 text-sm mb-3">{period.description}</p>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-yellow-500 to-amber-400"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${period.score}%` }}
                  transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 재물 증식 조언 */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-2 mb-4">
          <PiggyBank className="w-6 h-6 text-pink-400" />
          <h3 className="text-xl font-bold text-white">재물 증식 조언</h3>
        </div>
        <div className="glass rounded-2xl p-6">
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-slate-300">
              <span className="text-yellow-400 text-xl">💡</span>
              <span>
                젊을 때부터 저축 습관을 들이세요. 작은 돈이라도 꾸준히 모으면 큰 재산이 됩니다.
              </span>
            </li>
            <li className="flex items-start gap-3 text-slate-300">
              <span className="text-yellow-400 text-xl">💡</span>
              <span>
                재테크 공부를 게을리하지 마세요. 금융 지식은 평생의 자산이 됩니다.
              </span>
            </li>
            <li className="flex items-start gap-3 text-slate-300">
              <span className="text-yellow-400 text-xl">💡</span>
              <span>
                자기계발에 투자하세요. 능력을 키우면 수입도 자연스럽게 늘어납니다.
              </span>
            </li>
            <li className="flex items-start gap-3 text-slate-300">
              <span className="text-yellow-400 text-xl">💡</span>
              <span>
                소비와 저축의 균형을 맞추세요. 무조건 아끼기보다는 현명하게 쓰고 모으세요.
              </span>
            </li>
          </ul>
        </div>
      </motion.div>

      {/* 종합 평가 */}
      <motion.div
        className="mt-8 p-6 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 rounded-2xl border border-yellow-500/20"
        variants={itemVariants}
      >
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span className="text-2xl">🌟</span>
          재물운 종합
        </h3>
        <p className="text-slate-200 leading-relaxed">
          {formData.name}님은{' '}
          {wealth.score >= 80
            ? '평생 재물복이 풍성한 행운아입니다. 큰 부자가 될 가능성이 높습니다.'
            : wealth.score >= 65
            ? '재물복이 좋은 편입니다. 노력하면 넉넉하게 살 수 있습니다.'
            : '보통의 재물운을 타고났습니다. 성실하게 모으면 충분히 풍족하게 살 수 있습니다.'}
          {' '}
          재물은 타고난 운도 중요하지만, 현명한 관리와 부지런함이 더 중요합니다. 태몽이 보여주는
          방향을 참고하여 슬기로운 재테크를 하시기 바랍니다.
        </p>
      </motion.div>
    </motion.div>
  );
}
