'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Users, Baby, Heart } from 'lucide-react';

interface ChildrenCountProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function ChildrenCount({ result, name }: ChildrenCountProps) {
  const dayElement = result.day.stem.element;
  const { 식상, 재성, 관성 } = result.tenGodsCount;

  // 자녀 수 예측
  const getPredictedCount = () => {
    // 기본 예측
    if (식상 >= 3) return { min: 2, max: 3, ideal: 3 };
    if (식상 === 2) return { min: 2, max: 3, ideal: 2 };
    if (식상 === 1) return { min: 1, max: 2, ideal: 2 };
    return { min: 1, max: 2, ideal: 1 };
  };

  const count = getPredictedCount();

  const getCountMessage = () => {
    if (식상 >= 3) {
      return '다자녀에 적합한 사주입니다. 3명 이상의 자녀와도 잘 맞으며, 자녀들과의 관계가 화목할 것입니다.';
    }
    if (식상 === 2) {
      return '2~3명의 자녀가 적당합니다. 여러 자녀를 키우면서도 균형 있게 사랑을 나눌 수 있습니다.';
    }
    if (식상 === 1) {
      return '1~2명의 자녀가 이상적입니다. 소수의 자녀에게 집중적인 관심과 사랑을 줄 수 있습니다.';
    }
    return '1명의 자녀에게 온전히 집중하는 것이 좋습니다. 깊이 있는 관계를 형성할 수 있습니다.';
  };

  const getElementAdvice = () => {
    switch (dayElement) {
      case '목':
        return '목 기운은 성장과 확장을 의미합니다. 여러 자녀를 키우며 에너지를 잘 분산할 수 있습니다.';
      case '화':
        return '화 기운은 열정과 활력을 줍니다. 자녀들에게 따뜻한 사랑을 고루 나눌 수 있습니다.';
      case '토':
        return '토 기운은 안정과 포용을 상징합니다. 여러 자녀를 품을 수 있는 넓은 마음이 있습니다.';
      case '금':
        return '금 기운은 집중과 완성을 뜻합니다. 소수의 자녀에게 심혈을 기울이는 것이 좋습니다.';
      case '수':
        return '수 기운은 유연하고 지혜롭습니다. 자녀 수에 관계없이 잘 적응할 수 있습니다.';
      default:
        return '';
    }
  };

  const scenarios = [
    {
      count: 1,
      title: '한 자녀',
      icon: Baby,
      color: 'from-pink-500 to-rose-600',
      pros: ['집중적 교육', '경제적 여유', '깊은 유대감'],
      cons: ['외로움 가능', '과잉보호 주의'],
      suitable: 식상 <= 1,
    },
    {
      count: 2,
      title: '두 자녀',
      icon: Users,
      color: 'from-blue-500 to-indigo-600',
      pros: ['형제 간 우애', '균형 잡힌 양육', '사회성 발달'],
      cons: ['경제적 부담', '시간 분배'],
      suitable: 식상 >= 1 && 식상 <= 2,
    },
    {
      count: 3,
      title: '다자녀',
      icon: Heart,
      color: 'from-purple-500 to-violet-600',
      pros: ['풍성한 가정', '다양한 관계 경험', '서로 돕는 문화'],
      cons: ['양육 부담 증가', '개별 관심 필요'],
      suitable: 식상 >= 3,
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
        👨‍👩‍👧‍👦 자녀 수 예측
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님의 사주로 본 이상적인 자녀 수
      </p>

      {/* 예측 결과 */}
      <div className="glass rounded-2xl p-8 mb-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30">
        <div className="text-center mb-6">
          <p className="text-slate-400 mb-2">이상적인 자녀 수</p>
          <div className="flex items-center justify-center gap-4">
            <span className="text-6xl font-bold gradient-text">{count.ideal}</span>
            <span className="text-2xl text-slate-400">명</span>
          </div>
          <p className="text-slate-400 mt-3">
            (추천 범위: {count.min}~{count.max}명)
          </p>
        </div>

        <div className="glass rounded-xl p-6 mb-4">
          <p className="text-slate-300 leading-relaxed mb-4">
            {getCountMessage()}
          </p>
          <p className="text-slate-400 text-sm">
            💫 {getElementAdvice()}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-3 text-center text-sm">
          <div className="glass rounded-lg p-3">
            <p className="text-slate-400">식상(자녀궁)</p>
            <p className="text-xl font-bold text-pink-400">{식상}개</p>
          </div>
          <div className="glass rounded-lg p-3">
            <p className="text-slate-400">일간 오행</p>
            <p className="text-xl font-bold text-blue-400">{dayElement}</p>
          </div>
          <div className="glass rounded-lg p-3">
            <p className="text-slate-400">적합도</p>
            <p className="text-xl font-bold text-green-400">
              {식상 >= 3 ? '다자녀' : 식상 >= 2 ? '2~3명' : '1~2명'}
            </p>
          </div>
        </div>
      </div>

      {/* 시나리오별 분석 */}
      <h3 className="text-xl font-bold text-cyan-400 mb-4">자녀 수별 장단점 분석</h3>
      <div className="grid md:grid-cols-3 gap-4">
        {scenarios.map((scenario, index) => (
          <motion.div
            key={index}
            className={`glass rounded-xl p-6 ${scenario.suitable ? 'border-2 border-green-500/50' : ''}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${scenario.color} flex items-center justify-center`}>
                <scenario.icon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white text-lg">{scenario.title}</h4>
                {scenario.suitable && (
                  <span className="text-green-400 text-xs font-bold">✓ 추천</span>
                )}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-emerald-400 text-sm font-bold mb-2">👍 장점</p>
              <ul className="text-slate-300 text-sm space-y-1">
                {scenario.pros.map((pro, i) => (
                  <li key={i}>• {pro}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-orange-400 text-sm font-bold mb-2">⚠️ 고려사항</p>
              <ul className="text-slate-400 text-sm space-y-1">
                {scenario.cons.map((con, i) => (
                  <li key={i}>• {con}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 조언 */}
      <div className="glass rounded-2xl p-6 mt-8 bg-blue-500/5 border border-blue-500/20">
        <p className="text-blue-300 font-bold mb-3">💡 전문가 조언</p>
        <p className="text-slate-300 text-sm leading-relaxed">
          자녀 수는 개인의 상황, 경제력, 건강, 가치관에 따라 달라집니다.
          사주는 참고 자료일 뿐이며, 부부가 함께 충분히 상의하여 결정하시기 바랍니다.
          중요한 것은 자녀의 수가 아니라 얼마나 사랑으로 키우느냐입니다.
        </p>
      </div>
    </motion.div>
  );
}
