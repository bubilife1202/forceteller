'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Calendar, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface EmotionMonthlyProps {
  result: SajuResult;
  name: string;
}

export default function EmotionMonthly({ result, name }: EmotionMonthlyProps) {
  // 월별 감정 예측 (2026년)
  const getMonthlyForecast = () => {
    const { 목, 화, 토, 금, 수 } = result.elements;
    const dayElement = result.day.stem.element;

    // 2026년은 병오년 (火 기운)
    const months = [
      {
        month: '1월',
        element: '토(土)',
        emotionScore: 65,
        mainEmotion: '안정적',
        description: '새해를 맞아 차분하게 계획을 세우는 시기입니다',
        advice: '목표를 구체화하고 루틴을 만드세요',
        color: 'bg-yellow-500/20',
      },
      {
        month: '2월',
        element: '목(木)',
        emotionScore: 70,
        mainEmotion: '희망적',
        description: '봄을 준비하며 새로운 시작에 대한 기대감이 높아집니다',
        advice: '새로운 도전을 시작하기 좋은 때입니다',
        color: 'bg-green-500/20',
      },
      {
        month: '3월',
        element: '목(木)',
        emotionScore: 75,
        mainEmotion: '활기찬',
        description: '봄 기운으로 에너지가 상승하고 활동적이 됩니다',
        advice: '야외 활동과 사회적 교류를 늘리세요',
        color: 'bg-green-500/20',
      },
      {
        month: '4월',
        element: '화(火)',
        emotionScore: 80,
        mainEmotion: '열정적',
        description: '화 기운이 절정에 달하며 열정과 의욕이 넘칩니다',
        advice: '중요한 일을 추진하기 최적의 시기입니다',
        color: 'bg-red-500/20',
      },
      {
        month: '5월',
        element: '화(火)',
        emotionScore: 75,
        mainEmotion: '기쁨',
        description: '따뜻한 날씨와 함께 즐거움이 가득한 시기입니다',
        advice: '휴식과 여가를 즐기며 에너지를 보충하세요',
        color: 'bg-red-500/20',
      },
      {
        month: '6월',
        element: '화(火)',
        emotionScore: 65,
        mainEmotion: '소진 주의',
        description: '더위와 함께 에너지가 소모될 수 있습니다',
        advice: '과도한 활동을 자제하고 휴식을 취하세요',
        color: 'bg-orange-500/20',
      },
      {
        month: '7월',
        element: '토(土)',
        emotionScore: 60,
        mainEmotion: '무더위',
        description: '더위로 인한 짜증과 피로가 증가할 수 있습니다',
        advice: '시원한 곳에서 충분히 쉬고 수분을 보충하세요',
        color: 'bg-amber-500/20',
      },
      {
        month: '8월',
        element: '토(土)',
        emotionScore: 55,
        mainEmotion: '나른함',
        description: '여름 휴가 후 일상 복귀에 적응이 필요합니다',
        advice: '서서히 리듬을 되찾으며 무리하지 마세요',
        color: 'bg-amber-500/20',
      },
      {
        month: '9월',
        element: '금(金)',
        emotionScore: 70,
        mainEmotion: '차분함',
        description: '가을 기운으로 마음이 정리되고 차분해집니다',
        advice: '성찰과 정리의 시간을 가지세요',
        color: 'bg-slate-400/20',
      },
      {
        month: '10월',
        element: '금(金)',
        emotionScore: 75,
        mainEmotion: '안정적',
        description: '날씨도 좋고 마음도 편안한 최적의 시기입니다',
        advice: '중요한 결정을 내리기 좋은 때입니다',
        color: 'bg-slate-400/20',
      },
      {
        month: '11월',
        element: '수(水)',
        emotionScore: 60,
        mainEmotion: '내성적',
        description: '날씨가 추워지며 내면으로 향하는 시기입니다',
        advice: '혼자만의 시간으로 재충전하세요',
        color: 'bg-blue-500/20',
      },
      {
        month: '12월',
        element: '수(水)',
        emotionScore: 65,
        mainEmotion: '회고적',
        description: '한 해를 돌아보며 정리하는 시간입니다',
        advice: '성찰과 감사로 마무리하고 새해를 준비하세요',
        color: 'bg-blue-500/20',
      },
    ];

    // 일간에 따라 점수 조정
    return months.map(month => {
      let adjustedScore = month.emotionScore;

      if (dayElement === '화' && month.element.includes('火')) {
        adjustedScore += 10;
      } else if (dayElement === '수' && month.element.includes('水')) {
        adjustedScore += 10;
      } else if (dayElement === '목' && month.element.includes('木')) {
        adjustedScore += 10;
      } else if (dayElement === '금' && month.element.includes('金')) {
        adjustedScore += 10;
      } else if (dayElement === '토' && month.element.includes('土')) {
        adjustedScore += 10;
      }

      // 상극 관계 체크
      if (dayElement === '금' && month.element.includes('火')) {
        adjustedScore -= 10;
      } else if (dayElement === '수' && month.element.includes('土')) {
        adjustedScore -= 10;
      }

      return {
        ...month,
        emotionScore: Math.min(Math.max(adjustedScore, 30), 100),
      };
    });
  };

  const monthlyData = getMonthlyForecast();
  const averageScore = Math.round(monthlyData.reduce((sum, m) => sum + m.emotionScore, 0) / 12);

  // 최고/최저 월
  const bestMonth = monthlyData.reduce((best, month) =>
    month.emotionScore > best.emotionScore ? month : best
  );
  const worstMonth = monthlyData.reduce((worst, month) =>
    month.emotionScore < worst.emotionScore ? month : worst
  );

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold mb-8 gradient-text flex items-center gap-3">
        <Calendar className="w-8 h-8 text-cyan-400" />
        2026년 월별 감정 예보
      </h2>

      {/* 연간 요약 */}
      <div className="glass rounded-2xl p-6 mb-10">
        <h3 className="text-xl font-bold text-cyan-400 mb-5">연간 감정 요약</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="text-sm text-slate-400 mb-2">연평균 안정도</div>
            <div className="text-3xl font-bold text-cyan-400">{averageScore}점</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-2">최고의 달</div>
            <div className="text-2xl font-bold text-emerald-400">{bestMonth.month}</div>
            <div className="text-sm text-slate-500">{bestMonth.emotionScore}점</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-2">주의가 필요한 달</div>
            <div className="text-2xl font-bold text-amber-400">{worstMonth.month}</div>
            <div className="text-sm text-slate-500">{worstMonth.emotionScore}점</div>
          </div>
        </div>
      </div>

      {/* 감정 그래프 */}
      <div className="glass rounded-2xl p-6 mb-10">
        <h3 className="text-xl font-bold text-purple-400 mb-5">감정 안정도 추이</h3>
        <div className="relative h-64 flex items-end justify-between gap-1 md:gap-2">
          {/* Y축 레이블 */}
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-slate-500">
            <span>100</span>
            <span>75</span>
            <span>50</span>
            <span>25</span>
            <span>0</span>
          </div>

          {/* 막대 그래프 */}
          <div className="flex-1 flex items-end justify-between gap-1 md:gap-2 ml-8">
            {monthlyData.map((month, index) => (
              <motion.div
                key={month.month}
                className="flex-1 flex flex-col items-center"
                initial={{ height: 0 }}
                whileInView={{ height: 'auto' }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
              >
                <div className="w-full relative group">
                  <motion.div
                    className={`w-full rounded-t-lg ${month.color} border-t-2 ${
                      month.emotionScore >= 75 ? 'border-emerald-400' :
                      month.emotionScore >= 60 ? 'border-cyan-400' :
                      month.emotionScore >= 45 ? 'border-yellow-400' : 'border-orange-400'
                    }`}
                    style={{ height: `${(month.emotionScore / 100) * 16}rem` }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {/* 툴팁 */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                      <div className="glass-strong rounded-xl p-4 min-w-[200px] shadow-xl">
                        <div className="font-bold text-cyan-400 mb-1">{month.month}</div>
                        <div className="text-2xl font-bold text-white mb-1">{month.emotionScore}점</div>
                        <div className="text-sm text-slate-300 mb-2">{month.mainEmotion}</div>
                        <div className="text-xs text-slate-400 mb-2">{month.description}</div>
                        <div className="text-xs text-emerald-400 border-t border-slate-600 pt-2">
                          💡 {month.advice}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
                <div className="text-xs text-slate-400 mt-2 rotate-0 md:rotate-0">
                  {month.month.replace('월', '')}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 월별 상세 */}
      <div>
        <h3 className="text-xl font-bold text-emerald-400 mb-5">월별 상세 가이드</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {monthlyData.map((month, index) => (
            <motion.div
              key={month.month}
              className={`glass rounded-2xl p-5 hover:scale-[1.02] transition-transform ${month.color}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-bold text-lg text-white">{month.month}</h4>
                  <div className="text-sm text-slate-400">{month.element}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-cyan-400">{month.emotionScore}</span>
                  {month.emotionScore >= 70 ? (
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                  ) : month.emotionScore >= 55 ? (
                    <Minus className="w-5 h-5 text-yellow-400" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-orange-400" />
                  )}
                </div>
              </div>
              <div className="mb-3">
                <span className="px-3 py-1 bg-slate-800/50 rounded-full text-sm font-semibold text-white">
                  {month.mainEmotion}
                </span>
              </div>
              <p className="text-sm text-slate-300 mb-3">{month.description}</p>
              <div className="bg-slate-800/50 rounded-lg p-3">
                <div className="text-xs text-emerald-400 font-semibold mb-1">조언:</div>
                <div className="text-xs text-slate-300">{month.advice}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 연간 팁 */}
      <motion.div
        className="mt-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-6 border border-cyan-500/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <h4 className="font-bold text-cyan-400 mb-4 flex items-center gap-2">
          💡 2026년 감정 관리 전략
        </h4>
        <div className="space-y-2 text-sm text-slate-300">
          <p>• <strong>봄(3-5월):</strong> 에너지가 높은 시기이니 중요한 목표를 추진하세요</p>
          <p>• <strong>여름(6-8월):</strong> 더위로 인한 스트레스 관리가 중요합니다. 충분한 휴식을 취하세요</p>
          <p>• <strong>가을(9-11월):</strong> 차분하고 안정적인 시기입니다. 중요한 결정을 내리기 좋습니다</p>
          <p>• <strong>겨울(12-2월):</strong> 내면 성찰의 시간입니다. 한 해를 돌아보고 새해를 준비하세요</p>
        </div>
        <div className="mt-4 pt-4 border-t border-cyan-500/20 text-xs text-slate-400">
          ⭐ 점수가 낮은 달에는 무리한 도전보다는 안정과 회복에 집중하세요
        </div>
      </motion.div>
    </motion.div>
  );
}
