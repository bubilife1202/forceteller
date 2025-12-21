'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Calendar, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface HealthMonthlyProps {
  result: SajuResult;
  name: string;
}

export default function HealthMonthly({ result, name }: HealthMonthlyProps) {
  const dayElement = result.day.stem.element;

  // 월별 건강 운세 계산
  const getMonthlyHealth = () => {
    const elementCycle: Record<string, string[]> = {
      목: ['수', '목', '화', '토', '금'],
      화: ['목', '화', '토', '금', '수'],
      토: ['화', '토', '금', '수', '목'],
      금: ['토', '금', '수', '목', '화'],
      수: ['금', '수', '목', '화', '토'],
    };

    const monthElements = [
      '토', // 1월
      '목', // 2월
      '목', // 3월
      '토', // 4월
      '화', // 5월
      '화', // 6월
      '토', // 7월
      '금', // 8월
      '금', // 9월
      '토', // 10월
      '수', // 11월
      '수', // 12월
    ];

    const cycle = elementCycle[dayElement];

    return monthElements.map((monthElement, index) => {
      const cycleIndex = cycle.indexOf(monthElement);
      let score = 70;
      let status = '보통';
      let icon = Minus;

      if (monthElement === dayElement) {
        score = 85;
        status = '최상';
        icon = TrendingUp;
      } else if (cycleIndex === 0 || cycleIndex === 1) {
        score = 80;
        status = '좋음';
        icon = TrendingUp;
      } else if (cycleIndex === 4) {
        score = 55;
        status = '주의';
        icon = TrendingDown;
      } else if (cycleIndex === 3) {
        score = 60;
        status = '조심';
        icon = TrendingDown;
      }

      return {
        month: index + 1,
        element: monthElement,
        score,
        status,
        icon,
      };
    });
  };

  const monthlyHealth = getMonthlyHealth();

  // 체질별 월별 건강 조언
  const getMonthlyAdvice = (month: number, element: string, status: string) => {
    const advice: Record<string, Record<string, string>> = {
      목: {
        목: '간 기능이 왕성합니다. 새로운 건강 습관을 시작하기 좋은 때입니다.',
        화: '에너지가 소모되는 시기. 충분한 휴식과 영양 섭취가 필요합니다.',
        토: '소화에 신경 쓰고, 규칙적인 생활로 균형을 맞추세요.',
        금: '간 기능이 약해지는 시기. 무리하지 말고 충분히 쉬세요.',
        수: '기력 회복의 시기. 영양가 있는 음식으로 건강을 보충하세요.',
      },
      화: {
        목: '에너지가 상승하는 시기. 적극적인 운동과 활동을 시작하세요.',
        화: '심장 기능이 최고조. 과열에 주의하고 수분을 충분히 섭취하세요.',
        토: '안정을 찾는 시기. 편안한 마음으로 휴식을 취하세요.',
        금: '순환이 약해지는 시기. 무리한 활동은 피하고 보온에 신경 쓰세요.',
        수: '심장에 부담이 가는 시기. 따뜻하게 지내고 스트레스를 줄이세요.',
      },
      토: {
        목: '소화 기능에 주의. 규칙적인 식사와 스트레스 관리가 중요합니다.',
        화: '에너지를 받는 시기. 영양 섭취로 기력을 보충하세요.',
        토: '비위 기능이 왕성합니다. 건강한 식습관을 유지하세요.',
        금: '에너지를 주는 시기. 적당한 활동으로 대사를 활성화하세요.',
        수: '소화 기능 안정기. 따뜻한 음식으로 건강을 지키세요.',
      },
      금: {
        목: '호흡기에 부담. 알레르기와 감기 예방에 신경 쓰세요.',
        화: '폐 기능이 약해지는 시기. 충분한 휴식과 보습이 필요합니다.',
        토: '에너지를 받는 시기. 영양 섭취로 면역력을 높이세요.',
        금: '호흡기 기능이 최상. 호흡 운동으로 폐활량을 키우세요.',
        수: '기력 보충의 시기. 따뜻하게 지내며 건강을 회복하세요.',
      },
      수: {
        목: '에너지를 주는 시기. 적당한 영양 섭취가 필요합니다.',
        화: '신장에 부담이 가는 시기. 수분 섭취와 휴식을 충분히 하세요.',
        토: '균형을 잡는 시기. 규칙적인 생활로 건강을 유지하세요.',
        금: '에너지를 받는 시기. 영양 보충으로 기력을 회복하세요.',
        수: '신장 기능이 왕성합니다. 보온에 신경 쓰고 활력을 유지하세요.',
      },
    };

    return advice[dayElement]?.[element] || '건강 관리에 신경 쓰세요.';
  };

  // 상태별 색상
  const getStatusColor = (status: string) => {
    switch (status) {
      case '최상':
        return { bg: 'bg-green-500/20', border: 'border-green-500/50', text: 'text-green-400' };
      case '좋음':
        return { bg: 'bg-blue-500/20', border: 'border-blue-500/50', text: 'text-blue-400' };
      case '보통':
        return { bg: 'bg-yellow-500/20', border: 'border-yellow-500/50', text: 'text-yellow-400' };
      case '조심':
        return { bg: 'bg-orange-500/20', border: 'border-orange-500/50', text: 'text-orange-400' };
      case '주의':
        return { bg: 'bg-red-500/20', border: 'border-red-500/50', text: 'text-red-400' };
      default:
        return { bg: 'bg-slate-500/20', border: 'border-slate-500/50', text: 'text-slate-400' };
    }
  };

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2
        className="text-3xl font-bold text-center mb-8 gradient-text"
        style={{ fontFamily: "'Noto Serif KR', serif" }}
      >
        📅 월별 건강 캘린더
      </h2>

      <p className="text-slate-300 text-center mb-8">
        {name}님의 체질에 맞춘 월별 건강 운세와 관리 포인트입니다
      </p>

      {/* 월별 건강 운세 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {monthlyHealth.map((month, index) => {
          const StatusIcon = month.icon;
          const colors = getStatusColor(month.status);

          return (
            <motion.div
              key={month.month}
              className={`glass rounded-xl p-5 ${colors.bg} border ${colors.border}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-800/50 flex items-center justify-center">
                    <Calendar className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{month.month}월</h3>
                    <p className="text-slate-400 text-xs">{month.element}(오행)</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${colors.text}`}>{month.score}</div>
                  <div className={`text-sm ${colors.text} flex items-center gap-1`}>
                    <StatusIcon className="w-4 h-4" />
                    {month.status}
                  </div>
                </div>
              </div>

              <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-4">
                <motion.div
                  className={`h-full ${colors.text.replace('text-', 'bg-')}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${month.score}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.05 + 0.3 }}
                />
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                {getMonthlyAdvice(month.month, month.element, month.status)}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* 건강 관리 팁 */}
      <div className="glass rounded-2xl p-6 mt-8 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30">
        <h3 className="text-xl font-bold text-cyan-400 mb-4">💡 월별 건강 관리 팁</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-green-400">✓ 좋은 달에는</h4>
            <ul className="space-y-1 text-slate-300 text-sm">
              <li>• 새로운 운동이나 건강 습관 시작</li>
              <li>• 건강 검진 및 치료 계획</li>
              <li>• 적극적인 활동과 도전</li>
              <li>• 영양 보충과 체력 증진</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-orange-400">⚠️ 주의할 달에는</h4>
            <ul className="space-y-1 text-slate-300 text-sm">
              <li>• 무리한 활동 자제</li>
              <li>• 충분한 휴식과 수면</li>
              <li>• 건강 관리 강화</li>
              <li>• 스트레스 최소화</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
