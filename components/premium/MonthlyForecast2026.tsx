'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Calendar, Star, AlertTriangle, TrendingUp } from 'lucide-react';

interface MonthlyForecast2026Props {
  result: SajuResult;
}

export default function MonthlyForecast2026({ result }: MonthlyForecast2026Props) {
  // 2026년 월별 간지 데이터 (병오년)
  const months2026 = [
    { month: 1, name: '1월 (정월)', stemKo: '경', stemCn: '庚', branchKo: '인', branchCn: '寅', stemElem: '금', branchElem: '목' },
    { month: 2, name: '2월', stemKo: '신', stemCn: '辛', branchKo: '묘', branchCn: '卯', stemElem: '금', branchElem: '목' },
    { month: 3, name: '3월', stemKo: '임', stemCn: '壬', branchKo: '진', branchCn: '辰', stemElem: '수', branchElem: '토' },
    { month: 4, name: '4월', stemKo: '계', stemCn: '癸', branchKo: '사', branchCn: '巳', stemElem: '수', branchElem: '화' },
    { month: 5, name: '5월', stemKo: '갑', stemCn: '甲', branchKo: '오', branchCn: '午', stemElem: '목', branchElem: '화' },
    { month: 6, name: '6월', stemKo: '을', stemCn: '乙', branchKo: '미', branchCn: '未', stemElem: '목', branchElem: '토' },
    { month: 7, name: '7월', stemKo: '병', stemCn: '丙', branchKo: '신', branchCn: '申', stemElem: '화', branchElem: '금' },
    { month: 8, name: '8월', stemKo: '정', stemCn: '丁', branchKo: '유', branchCn: '酉', stemElem: '화', branchElem: '금' },
    { month: 9, name: '9월', stemKo: '무', stemCn: '戊', branchKo: '술', branchCn: '戌', stemElem: '토', branchElem: '토' },
    { month: 10, name: '10월', stemKo: '기', stemCn: '己', branchKo: '해', branchCn: '亥', stemElem: '토', branchElem: '수' },
    { month: 11, name: '11월', stemKo: '경', stemCn: '庚', branchKo: '자', branchCn: '子', stemElem: '금', branchElem: '수' },
    { month: 12, name: '12월', stemKo: '신', stemCn: '辛', branchKo: '축', branchCn: '丑', stemElem: '금', branchElem: '토' },
  ];

  // 용신 추출
  const yongsinMatch = result.yongsin.match(/^(목|화|토|금|수)/);
  const yongsinElem = yongsinMatch ? yongsinMatch[1] : '';

  // 일간 정보
  const dayStemElem = result.day.stem.element;
  const dayStemKo = result.day.stem.ko;
  const dayBranchKo = result.day.branch.ko;

  // 월별 운세 평가
  const evaluateMonth = (monthData: typeof months2026[0]) => {
    let score = 50; // 기본 점수
    const reasons: string[] = [];
    const warnings: string[] = [];
    const opportunities: string[] = [];

    // 1. 용신 일치
    if (monthData.stemElem === yongsinElem || monthData.branchElem === yongsinElem) {
      score += 25;
      reasons.push('용신 기운을 받아 운이 상승합니다');
      opportunities.push('중요한 결정이나 새로운 시작에 좋은 시기입니다');
    }

    // 2. 일간 생부 관계 (나를 돕는 오행)
    const helpRelations: Record<string, string[]> = {
      목: ['수', '목'],
      화: ['목', '화'],
      토: ['화', '토'],
      금: ['토', '금'],
      수: ['금', '수'],
    };

    if (helpRelations[dayStemElem]?.includes(monthData.stemElem)) {
      score += 15;
      reasons.push('월 천간이 일간을 돕습니다');
    }

    // 3. 천간합
    const hapPairs: Record<string, string> = {
      갑: '기', 기: '갑', 을: '경', 경: '을', 병: '신', 신: '병',
      정: '임', 임: '정', 무: '계', 계: '무',
    };

    if (hapPairs[dayStemKo] === monthData.stemKo) {
      score += 20;
      reasons.push('일간과 월간이 합을 이룹니다');
      opportunities.push('좋은 인연을 만나거나 협력 관계가 생깁니다');
    }

    // 4. 천간충 (극)
    const chungPairs: Record<string, string> = {
      갑: '경', 경: '갑', 을: '신', 신: '을', 병: '임', 임: '병',
      정: '계', 계: '정',
    };

    if (chungPairs[dayStemKo] === monthData.stemKo) {
      score -= 20;
      warnings.push('일간과 월간이 충돌합니다');
      warnings.push('의견 불일치나 결정의 어려움이 있을 수 있습니다');
    }

    // 5. 지지충
    const branchChungPairs: Record<string, string> = {
      자: '오', 오: '자', 축: '미', 미: '축', 인: '신', 신: '인',
      묘: '유', 유: '묘', 진: '술', 술: '진', 사: '해', 해: '사',
    };

    if (branchChungPairs[dayBranchKo] === monthData.branchKo) {
      score -= 25;
      warnings.push('일지와 월지가 충돌합니다');
      warnings.push('이동, 변화, 사고를 조심하세요');
    }

    // 6. 지지 육합
    const yukHapPairs: Record<string, string> = {
      자: '축', 축: '자', 인: '해', 해: '인', 묘: '술', 술: '묘',
      진: '유', 유: '진', 사: '신', 신: '사', 오: '미', 미: '오',
    };

    if (yukHapPairs[dayBranchKo] === monthData.branchKo) {
      score += 20;
      reasons.push('일지와 월지가 육합을 이룹니다');
      opportunities.push('작은 행운과 좋은 소식이 있습니다');
    }

    // 7. 특정 오행 과다/부족 체크
    if (result.elementBalance.deficiency.includes(monthData.stemElem)) {
      score += 10;
      reasons.push(`부족한 ${monthData.stemElem} 기운을 보충합니다`);
    }

    if (result.elementBalance.excess.includes(monthData.stemElem)) {
      score -= 10;
      warnings.push(`${monthData.stemElem} 기운이 과도해질 수 있습니다`);
    }

    // 평가 등급
    let rating: 'excellent' | 'good' | 'normal' | 'caution' | 'bad';
    if (score >= 80) rating = 'excellent';
    else if (score >= 65) rating = 'good';
    else if (score >= 40) rating = 'normal';
    else if (score >= 25) rating = 'caution';
    else rating = 'bad';

    return { score, rating, reasons, warnings, opportunities };
  };

  // 평가별 스타일
  const getRatingStyle = (rating: string) => {
    switch (rating) {
      case 'excellent':
        return {
          color: 'from-yellow-400 to-amber-500',
          bgColor: 'bg-yellow-500/10',
          borderColor: 'border-yellow-500/30',
          textColor: 'text-yellow-400',
          emoji: '🌟',
          label: '최상',
        };
      case 'good':
        return {
          color: 'from-green-400 to-emerald-500',
          bgColor: 'bg-green-500/10',
          borderColor: 'border-green-500/30',
          textColor: 'text-green-400',
          emoji: '✨',
          label: '좋음',
        };
      case 'normal':
        return {
          color: 'from-blue-400 to-cyan-500',
          bgColor: 'bg-blue-500/10',
          borderColor: 'border-blue-500/30',
          textColor: 'text-blue-400',
          emoji: '⭐',
          label: '보통',
        };
      case 'caution':
        return {
          color: 'from-orange-400 to-orange-600',
          bgColor: 'bg-orange-500/10',
          borderColor: 'border-orange-500/30',
          textColor: 'text-orange-400',
          emoji: '⚠️',
          label: '주의',
        };
      default: // bad
        return {
          color: 'from-red-500 to-red-700',
          bgColor: 'bg-red-500/10',
          borderColor: 'border-red-500/30',
          textColor: 'text-red-400',
          emoji: '🔴',
          label: '힘듦',
        };
    }
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
        className="text-3xl font-bold text-center mb-4 gradient-text"
        style={{ fontFamily: "'Noto Serif KR', serif" }}
      >
        🐴 2026년 병오년 월별 세운
      </h2>

      <p className="text-center text-amber-400 font-semibold mb-2">
        붉은 말의 해 (丙午年)
      </p>

      <p className="text-center text-slate-300 mb-12 leading-relaxed">
        2026년 병오년(丙午年)의 월별 운세를 상세히 분석합니다.
        <br />
        병화(丙火)와 오화(午火)가 만나 <strong className="text-red-400">화기(火氣)가 강한 해</strong>입니다.
      </p>

      {/* 월별 상세 분석 */}
      <div className="space-y-6">
        {months2026.map((monthData, index) => {
          const evaluation = evaluateMonth(monthData);
          const style = getRatingStyle(evaluation.rating);

          return (
            <motion.div
              key={monthData.month}
              className="glass rounded-2xl p-6 md:p-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-start gap-6">
                {/* 월 아이콘 */}
                <div
                  className={`flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br ${style.color} flex items-center justify-center text-3xl shadow-lg`}
                >
                  {style.emoji}
                </div>

                {/* 내용 */}
                <div className="flex-1">
                  {/* 헤더 */}
                  <div className="flex items-center gap-3 flex-wrap mb-3">
                    <h3 className="text-2xl font-bold text-slate-100">{monthData.name}</h3>
                    <div className="text-2xl font-bold text-amber-400">
                      {monthData.stemKo}{monthData.stemCn}{monthData.branchKo}{monthData.branchCn}
                    </div>
                    <span
                      className={`px-3 py-1 ${style.bgColor} ${style.textColor} text-sm font-semibold rounded-full border ${style.borderColor}`}
                    >
                      {style.label} ({evaluation.score}점)
                    </span>
                  </div>

                  {/* 간지 정보 */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-slate-400">
                    <span>
                      천간: <strong className="text-amber-300">{monthData.stemKo}{monthData.stemCn}</strong> ({monthData.stemElem})
                    </span>
                    <span>
                      지지: <strong className="text-cyan-300">{monthData.branchKo}{monthData.branchCn}</strong> ({monthData.branchElem})
                    </span>
                  </div>

                  {/* 긍정 요소 */}
                  {evaluation.reasons.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-green-400 mb-2 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        긍정 요소
                      </h4>
                      <ul className="space-y-1">
                        {evaluation.reasons.map((reason, i) => (
                          <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                            <span className="text-green-400 flex-shrink-0 mt-0.5">✓</span>
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 주의 사항 */}
                  {evaluation.warnings.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-red-400 mb-2 flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4" />
                        주의 사항
                      </h4>
                      <ul className="space-y-1">
                        {evaluation.warnings.map((warning, i) => (
                          <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                            <span className="text-red-400 flex-shrink-0 mt-0.5">!</span>
                            <span>{warning}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 기회 요소 */}
                  {evaluation.opportunities.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-amber-400 mb-2 flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        기회 요소
                      </h4>
                      <ul className="space-y-1">
                        {evaluation.opportunities.map((opportunity, i) => (
                          <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                            <span className="text-amber-400 flex-shrink-0 mt-0.5">★</span>
                            <span>{opportunity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 종합 조언 */}
                  <div className={`${style.bgColor} border ${style.borderColor} rounded-xl p-4`}>
                    <p className="text-sm text-slate-200">
                      <strong className={style.textColor}>💡 이달의 조언:</strong>{' '}
                      {evaluation.rating === 'excellent' && '최고의 달입니다! 하고 싶었던 일을 과감하게 시도하세요. 투자, 계약, 고백 등 중요한 결정을 하기 좋습니다.'}
                      {evaluation.rating === 'good' && '좋은 운이 함께합니다. 꾸준히 노력하면 성과를 거둘 수 있습니다. 새로운 인연도 기대해보세요.'}
                      {evaluation.rating === 'normal' && '평범한 달입니다. 특별한 행운도, 불운도 없으니 자신의 노력에 달려 있습니다. 꾸준함이 답입니다.'}
                      {evaluation.rating === 'caution' && '조심스러운 달입니다. 무리한 결정은 미루고, 안전과 건강을 우선으로 하세요. 말조심도 필요합니다.'}
                      {evaluation.rating === 'bad' && '힘든 달입니다. 큰 결정이나 투자는 피하고, 기존 일을 지키는 데 집중하세요. 건강관리와 감정 조절이 중요합니다.'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 2026년 종합 전략 */}
      <div className="mt-12 glass rounded-2xl p-6 border border-red-400/30">
        <h4 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          2026년 병오년 종합 전략
        </h4>
        <div className="space-y-3 text-slate-300 text-sm">
          <p className="flex items-start gap-2">
            <span className="text-red-400 flex-shrink-0">•</span>
            <span>
              <strong className="text-amber-400">최고의 달</strong>:{' '}
              {months2026
                .map((m, i) => ({ ...m, eval: evaluateMonth(m), index: i }))
                .filter((m) => m.eval.rating === 'excellent' || m.eval.rating === 'good')
                .slice(0, 3)
                .map((m) => `${m.month}월`)
                .join(', ') || '꾸준히 노력하면 좋은 결과가 있습니다'}
              {' '}- 이 시기에 중요한 결정이나 도전을 하세요.
            </span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-red-400 flex-shrink-0">•</span>
            <span>
              <strong className="text-orange-400">주의가 필요한 달</strong>:{' '}
              {months2026
                .map((m, i) => ({ ...m, eval: evaluateMonth(m), index: i }))
                .filter((m) => m.eval.rating === 'caution' || m.eval.rating === 'bad')
                .slice(0, 3)
                .map((m) => `${m.month}월`)
                .join(', ') || '특별히 조심할 달은 없습니다'}
              {' '}- 이 시기엔 무리하지 말고 안전 우선으로 행동하세요.
            </span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-red-400 flex-shrink-0">•</span>
            <span>
              2026년은 <strong className="text-red-400">병오년(丙午年)</strong>으로,
              병화(丙火)와 오화(午火)가 만나 <strong>화기(火氣)가 매우 강한 해</strong>입니다.
              {result.day.stem.element === '수' && ' 일간이 수(水)이므로 화기를 조절하는 역할을 하지만, 과도한 화기에 주의하세요.'}
              {result.day.stem.element === '화' && ' 일간이 화(火)이므로 같은 기운이 더해져 열정적이지만 과열에 주의하세요.'}
              {result.day.stem.element === '목' && ' 일간이 목(木)이므로 화기를 생하여 에너지가 소모될 수 있으니 컨디션 관리에 신경쓰세요.'}
              {result.day.stem.element === '금' && ' 일간이 금(金)이므로 화기의 극을 받아 힘든 상황이 있을 수 있습니다. 신중하게 행동하세요.'}
              {result.day.stem.element === '토' && ' 일간이 토(土)이므로 화기가 토를 생하여 비교적 편안한 해가 될 수 있습니다.'}
            </span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-red-400 flex-shrink-0">•</span>
            <span>
              화(火)의 기운이 강하므로 <strong className="text-cyan-400">수(水) 기운</strong>으로
              균형을 맞추는 것이 좋습니다. 파란색 계열 색상, 북쪽 방향, 물 관련 활동이 도움됩니다.
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
