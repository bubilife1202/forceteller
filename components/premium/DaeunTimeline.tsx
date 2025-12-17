'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { TrendingUp, TrendingDown, Minus, Crown } from 'lucide-react';

interface DaeunTimelineProps {
  result: SajuResult;
  birthYear: number;
}

export default function DaeunTimeline({ result, birthYear }: DaeunTimelineProps) {
  const currentAge = new Date().getFullYear() - birthYear + 1;

  // 대운별 강약 판단 (간단 버전)
  const evaluateDaeun = (daeun: typeof result.daeun[0]) => {
    // 일간과 대운 천간의 관계로 간단히 판단
    const stemElement = daeun.stem.element;
    const dayElement = result.day.stem.element;

    // 용신과 일치하는지 확인
    const yongsinMatch = result.yongsin.match(/^(목|화|토|금|수)/);
    const yongsinElem = yongsinMatch ? yongsinMatch[1] : '';

    if (stemElement === yongsinElem) {
      return { rating: 'excellent', icon: Crown, color: 'from-yellow-400 to-amber-500' };
    }

    // 생부(生扶) - 나를 돕는 경우
    const helpRelations: Record<string, string[]> = {
      목: ['수', '목'],
      화: ['목', '화'],
      토: ['화', '토'],
      금: ['토', '금'],
      수: ['금', '수'],
    };

    if (helpRelations[dayElement]?.includes(stemElement)) {
      return { rating: 'good', icon: TrendingUp, color: 'from-green-400 to-emerald-500' };
    }

    // 극설(剋洩) - 나를 약화시키는 경우
    const weakenRelations: Record<string, string[]> = {
      목: ['금', '화'],
      화: ['수', '토'],
      토: ['목', '금'],
      금: ['화', '수'],
      수: ['토', '목'],
    };

    if (weakenRelations[dayElement]?.includes(stemElement)) {
      return { rating: 'bad', icon: TrendingDown, color: 'from-red-500 to-orange-600' };
    }

    return { rating: 'neutral', icon: Minus, color: 'from-slate-500 to-gray-600' };
  };

  // 대운 설명 생성
  const getDaeunDescription = (
    daeun: typeof result.daeun[0],
    rating: string,
    isCurrentDaeun: boolean
  ) => {
    const ageRange = `${daeun.age}~${daeun.age + 9}세`;
    const pillar = `${daeun.stem.ko}${daeun.stem.cn}${daeun.branch.ko}${daeun.branch.cn}`;

    let desc = '';
    let advice = '';

    switch (rating) {
      case 'excellent':
        desc = `${ageRange}은 <strong class="text-yellow-400">최고의 대운</strong>입니다. 용신 기운을 받아 모든 일이 술술 풀립니다. 하고 싶었던 일을 과감하게 시도하세요.`;
        advice = '투자, 창업, 결혼, 승진 등 중요한 결정을 하기 좋은 시기입니다.';
        break;
      case 'good':
        desc = `${ageRange}은 <strong class="text-green-400">좋은 대운</strong>입니다. 힘을 받아 안정적으로 발전합니다. 꾸준히 노력하면 성과를 거둘 수 있습니다.`;
        advice = '새로운 도전보다는 기존 일을 확장하는 것이 좋습니다.';
        break;
      case 'bad':
        desc = `${ageRange}은 <strong class="text-red-400">힘든 대운</strong>입니다. 시련과 장애물이 많을 수 있습니다. 무리하지 말고 조심스럽게 행동하세요.`;
        advice = '큰 결정은 미루고, 실력을 쌓고 인내하는 시기로 삼으세요.';
        break;
      default:
        desc = `${ageRange}은 <strong class="text-slate-300">평범한 대운</strong>입니다. 크게 좋지도 나쁘지도 않은 시기입니다.`;
        advice = '자신의 노력에 따라 결과가 달라집니다.';
    }

    if (isCurrentDaeun) {
      desc = `<strong class="text-amber-400">현재 대운</strong> - ${desc}`;
    }

    return { desc, advice, pillar, ageRange };
  };

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
    >
      <h2
        className="text-3xl font-bold text-center mb-8 gradient-text"
        style={{ fontFamily: "'Noto Serif KR', serif" }}
      >
        🔮 평생 대운 타임라인
      </h2>

      <p className="text-center text-slate-300 mb-12 leading-relaxed">
        대운(大運)은 10년마다 바뀌는 큰 운의 흐름입니다.
        <br />
        인생의 상승기와 하강기를 미리 알고 준비하면 성공 확률이 높아집니다.
      </p>

      {/* 대운 타임라인 */}
      <div className="space-y-6">
        {result.daeun.map((daeun, index) => {
          const isCurrentDaeun = currentAge >= daeun.age && currentAge < daeun.age + 10;
          const evaluation = evaluateDaeun(daeun);
          const Icon = evaluation.icon;
          const info = getDaeunDescription(daeun, evaluation.rating, isCurrentDaeun);

          return (
            <motion.div
              key={index}
              className={`glass rounded-2xl p-6 md:p-8 relative overflow-hidden ${
                isCurrentDaeun ? 'ring-2 ring-amber-400 shadow-lg shadow-amber-400/20' : ''
              }`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              {/* 현재 대운 배지 */}
              {isCurrentDaeun && (
                <div className="absolute top-4 right-4">
                  <span className="px-4 py-1 bg-amber-400 text-slate-950 text-xs font-bold rounded-full">
                    현재
                  </span>
                </div>
              )}

              <div className="flex items-start gap-6">
                {/* 아이콘 */}
                <div
                  className={`flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br ${evaluation.color} flex items-center justify-center shadow-lg`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* 내용 */}
                <div className="flex-1">
                  {/* 헤더 */}
                  <div className="flex items-center gap-3 flex-wrap mb-3">
                    <h3 className="text-2xl font-bold text-slate-100">{info.ageRange}</h3>
                    <div className="text-3xl font-bold text-amber-400">{info.pillar}</div>
                  </div>

                  {/* 오행 정보 */}
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <span className="text-slate-400">
                      천간: <strong className="text-amber-300">{daeun.stem.ko}{daeun.stem.cn}</strong> (
                      {daeun.stem.element} {daeun.stem.yinyang === '+' ? '양' : '음'})
                    </span>
                    <span className="text-slate-400">
                      지지: <strong className="text-cyan-300">{daeun.branch.ko}{daeun.branch.cn}</strong> (
                      {daeun.branch.element} / {daeun.branch.animal})
                    </span>
                  </div>

                  {/* 설명 */}
                  <p
                    className="text-slate-300 leading-relaxed mb-4"
                    dangerouslySetInnerHTML={{ __html: info.desc }}
                  />

                  {/* 조언 */}
                  <div
                    className={`bg-gradient-to-r ${evaluation.color} bg-opacity-10 border border-opacity-30 rounded-xl p-4`}
                    style={{
                      borderColor: `rgba(${
                        evaluation.rating === 'excellent'
                          ? '251, 191, 36'
                          : evaluation.rating === 'good'
                          ? '52, 211, 153'
                          : evaluation.rating === 'bad'
                          ? '239, 68, 68'
                          : '148, 163, 184'
                      }, 0.3)`,
                    }}
                  >
                    <p className="text-sm text-slate-200">
                      <strong
                        className={
                          evaluation.rating === 'excellent'
                            ? 'text-yellow-400'
                            : evaluation.rating === 'good'
                            ? 'text-green-400'
                            : evaluation.rating === 'bad'
                            ? 'text-red-400'
                            : 'text-slate-400'
                        }
                      >
                        💡 조언:
                      </strong>{' '}
                      {info.advice}
                    </p>
                  </div>

                  {/* 원국과의 상호작용 힌트 */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {/* 천간 관계 */}
                    {(() => {
                      const dayKo = result.day.stem.ko;
                      const daeunKo = daeun.stem.ko;

                      // 천간합
                      const hapPairs: Record<string, string> = {
                        갑: '기',
                        기: '갑',
                        을: '경',
                        경: '을',
                        병: '신',
                        신: '병',
                        정: '임',
                        임: '정',
                        무: '계',
                        계: '무',
                      };

                      if (hapPairs[dayKo] === daeunKo) {
                        return (
                          <span className="px-3 py-1 bg-pink-500/20 text-pink-300 text-xs rounded-full border border-pink-500/30">
                            💕 일간과 천간합
                          </span>
                        );
                      }

                      // 천간충 (극)
                      const chungPairs: Record<string, string> = {
                        갑: '경',
                        경: '갑',
                        을: '신',
                        신: '을',
                        병: '임',
                        임: '병',
                        정: '계',
                        계: '정',
                      };

                      if (chungPairs[dayKo] === daeunKo) {
                        return (
                          <span className="px-3 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-full border border-orange-500/30">
                            ⚡ 일간과 천간충
                          </span>
                        );
                      }

                      return null;
                    })()}

                    {/* 지지 관계 */}
                    {(() => {
                      const dayBranchKo = result.day.branch.ko;
                      const daeunBranchKo = daeun.branch.ko;

                      // 지지충
                      const chungPairs: Record<string, string> = {
                        자: '오',
                        오: '자',
                        축: '미',
                        미: '축',
                        인: '신',
                        신: '인',
                        묘: '유',
                        유: '묘',
                        진: '술',
                        술: '진',
                        사: '해',
                        해: '사',
                      };

                      if (chungPairs[dayBranchKo] === daeunBranchKo) {
                        return (
                          <span className="px-3 py-1 bg-red-500/20 text-red-300 text-xs rounded-full border border-red-500/30">
                            ⚡ 일지와 지지충
                          </span>
                        );
                      }

                      // 육합
                      const yukHapPairs: Record<string, string> = {
                        자: '축',
                        축: '자',
                        인: '해',
                        해: '인',
                        묘: '술',
                        술: '묘',
                        진: '유',
                        유: '진',
                        사: '신',
                        신: '사',
                        오: '미',
                        미: '오',
                      };

                      if (yukHapPairs[dayBranchKo] === daeunBranchKo) {
                        return (
                          <span className="px-3 py-1 bg-green-500/20 text-green-300 text-xs rounded-full border border-green-500/30">
                            💚 일지와 육합
                          </span>
                        );
                      }

                      return null;
                    })()}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 종합 인사이트 */}
      <div className="mt-12 glass rounded-2xl p-6 border border-purple-400/30">
        <h4 className="text-lg font-bold text-purple-400 mb-4 flex items-center gap-2">
          <span>🎯</span>
          <span>대운 활용 전략</span>
        </h4>
        <div className="space-y-3 text-slate-300 text-sm">
          <p className="flex items-start gap-2">
            <span className="text-purple-400 flex-shrink-0">•</span>
            <span>
              <strong className="text-amber-400">현재 {currentAge}세</strong>로,{' '}
              {result.daeun.find((d) => currentAge >= d.age && currentAge < d.age + 10)?.age}
              ~
              {(result.daeun.find((d) => currentAge >= d.age && currentAge < d.age + 10)?.age || 0) +
                9}
              세 대운에 있습니다. 이 10년의 흐름을 파악하고 계획을 세우세요.
            </span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-purple-400 flex-shrink-0">•</span>
            <span>
              <strong>좋은 대운</strong>이 오면 그때를 놓치지 말고 적극적으로 도전하세요.
              투자, 창업, 이직 등 중요한 결정을 하기 좋습니다.
            </span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-purple-400 flex-shrink-0">•</span>
            <span>
              <strong>힘든 대운</strong>이 오면 무리하지 말고 실력을 쌓는 시기로 삼으세요.
              건강관리와 재물 관리를 철저히 하고, 큰 변화는 피하세요.
            </span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-purple-400 flex-shrink-0">•</span>
            <span>
              대운의 <strong>첫 5년(천간 운)</strong>과 <strong>뒷 5년(지지 운)</strong>의
              흐름이 다를 수 있습니다. 세밀하게 분석하려면 전문가 상담을 받으세요.
            </span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-purple-400 flex-shrink-0">•</span>
            <span>
              대운은 10년 흐름이고, <strong>세운(연운)</strong>은 1년 흐름입니다. 대운이
              좋아도 세운이 나쁘면 그 해는 주의하고, 대운이 나빠도 세운이 좋으면 그
              해는 기회가 될 수 있습니다.
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
