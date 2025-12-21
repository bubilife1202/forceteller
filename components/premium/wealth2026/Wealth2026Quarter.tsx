'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Target, TrendingUp, Shield, Zap, CheckCircle, ArrowRight } from 'lucide-react';

interface Wealth2026QuarterProps {
  result: SajuResult;
  name: string;
  baseScore: number;
}

export default function Wealth2026Quarter({ result, name, baseScore }: Wealth2026QuarterProps) {
  const dayElement = result.day.stem.element;
  const { 재성, 식상, 관성, 인성, 비겁 } = result.tenGodsCount;

  // 분기별 상세 전략
  const getQuarterlyStrategy = () => {
    return [
      {
        quarter: 'Q1',
        period: '1-3월',
        theme: '기반 구축',
        emoji: '🌱',
        overallScore: dayElement === '목' ? 85 : baseScore >= 60 ? 75 : 65,
        mainFocus: '재정 기반 점검 및 목표 수립',
        description: '새해의 시작, 모든 재정 계획의 기초를 다지는 시기입니다. 지난해를 돌아보고 올해의 구체적인 목표를 세우세요.',
        keyActions: [
          {
            action: '연간 재정 목표 수립',
            detail: '저축 목표, 투자 계획, 지출 절감 목표를 구체적인 숫자로 설정',
            priority: 'critical',
            week: '1월 1주'
          },
          {
            action: '연말정산 마무리',
            detail: '빠진 공제항목 확인, 추가 서류 제출, 환급금 확인',
            priority: 'high',
            week: '1-2월'
          },
          {
            action: '보험/구독 서비스 정리',
            detail: '불필요한 고정비 정리, 중복 보험 해지, 구독 서비스 점검',
            priority: 'medium',
            week: '2월'
          },
          {
            action: '비상금 점검',
            detail: '최소 3개월 생활비 확보, 부족시 저축 계획 수립',
            priority: 'high',
            week: '3월'
          }
        ],
        income: {
          strategy: 관성 >= 2 ? '직장 내 성과 어필 시작' : '부업 가능성 탐색',
          target: '전년 대비 +5% 수입 기반 마련'
        },
        expense: {
          strategy: '고정비 10% 절감 도전',
          target: '불필요한 구독/보험 정리'
        },
        investment: {
          strategy: 재성 >= 2 ? '투자 포트폴리오 점검 및 리밸런싱' : '투자 공부 시작',
          target: '상반기 투자 계획 수립'
        },
        risk: {
          level: '낮음',
          caution: '너무 공격적인 투자는 피하세요. 기반 다지기에 집중하세요.'
        }
      },
      {
        quarter: 'Q2',
        period: '4-6월',
        theme: '성장 가속',
        emoji: '🚀',
        overallScore: dayElement === '화' || dayElement === '토' ? 90 : baseScore >= 60 ? 80 : 70,
        mainFocus: '적극적인 수입 확대 및 투자 실행',
        description: '봄의 기운을 받아 활발하게 움직여야 할 시기입니다. 1분기에 세운 계획을 실행에 옮기세요.',
        keyActions: [
          {
            action: '부업/사이드프로젝트 시작',
            detail: '1분기에 조사한 부업을 본격적으로 시작',
            priority: 'high',
            week: '4월'
          },
          {
            action: '투자 실행',
            detail: '분할 매수로 관심 종목/ETF 매수 시작',
            priority: 'high',
            week: '4-5월'
          },
          {
            action: '연봉 협상 준비',
            detail: '상반기 성과 정리, 협상 자료 준비',
            priority: 'medium',
            week: '5월'
          },
          {
            action: '상반기 중간 점검',
            detail: '목표 대비 진행률 확인, 필요시 계획 수정',
            priority: 'critical',
            week: '6월'
          }
        ],
        income: {
          strategy: 식상 >= 2 ? '창작 활동으로 수익화' : '본업 성과 극대화',
          target: '부업으로 월 30-50만원 추가 수입'
        },
        expense: {
          strategy: '지출 다이어리 작성, 낭비 요소 제거',
          target: '월 지출 전월 대비 5% 감소'
        },
        investment: {
          strategy: '적립식 투자 본격화',
          target: '월 투자금의 50% 집행 완료'
        },
        risk: {
          level: '중간',
          caution: dayElement === '화' ? '과열 주의. 너무 욕심내지 마세요.' : '기회를 놓치지 마세요.'
        }
      },
      {
        quarter: 'Q3',
        period: '7-9월',
        theme: '안정화',
        emoji: '🏔️',
        overallScore: dayElement === '금' ? 75 : dayElement === '토' ? 85 : 70,
        mainFocus: '성과 점검 및 리스크 관리',
        description: '상반기 성과를 점검하고 안정화하는 시기입니다. 무리한 확장보다는 내실을 다지세요.',
        keyActions: [
          {
            action: '포트폴리오 리밸런싱',
            detail: '투자 성과 점검, 비중 조정, 손절/익절 검토',
            priority: 'high',
            week: '7월'
          },
          {
            action: '부업 성과 분석',
            detail: '수익 대비 시간 효율 분석, 비효율적인 활동 정리',
            priority: 'medium',
            week: '7-8월'
          },
          {
            action: '자기계발 투자',
            detail: '하반기 역량 강화를 위한 교육/자격증 준비',
            priority: 'high',
            week: '8월'
          },
          {
            action: '하반기 전략 수립',
            detail: '남은 기간 목표 재설정, 실행 계획 수정',
            priority: 'critical',
            week: '9월'
          }
        ],
        income: {
          strategy: 인성 >= 2 ? '전문성 강화로 가치 상승' : '기존 수입원 안정화',
          target: '상반기 대비 수입 유지 또는 +10%'
        },
        expense: {
          strategy: '휴가 비용 관리, 계획적 지출',
          target: '예상 외 지출 최소화'
        },
        investment: {
          strategy: '보수적 접근, 현금 비중 확대',
          target: '리스크 자산 비중 축소 검토'
        },
        risk: {
          level: '중높음',
          caution: '여름 시장 변동성 주의. 욕심내지 말고 수익 일부 확정하세요.'
        }
      },
      {
        quarter: 'Q4',
        period: '10-12월',
        theme: '수확',
        emoji: '🏆',
        overallScore: dayElement === '금' || dayElement === '수' ? 85 : baseScore >= 60 ? 80 : 75,
        mainFocus: '성과 실현 및 내년 준비',
        description: '한 해의 결실을 거두는 시기입니다. 목표 달성 여부를 확인하고 내년을 준비하세요.',
        keyActions: [
          {
            action: '투자 성과 실현',
            detail: '목표 수익률 달성 종목 익절, 세금 고려 매도 계획',
            priority: 'high',
            week: '10월'
          },
          {
            action: '연말정산 사전 준비',
            detail: '연금저축/IRP 한도 채우기, 기부금 정리',
            priority: 'critical',
            week: '11월'
          },
          {
            action: '연간 결산',
            detail: '수입/지출/저축/투자 총 정리, 목표 달성률 계산',
            priority: 'high',
            week: '12월 초'
          },
          {
            action: '2027년 계획 수립',
            detail: '내년 재정 목표 설정, 투자 전략 수립',
            priority: 'high',
            week: '12월 말'
          }
        ],
        income: {
          strategy: '보너스/성과급 극대화',
          target: '연말 보너스 활용 계획 수립'
        },
        expense: {
          strategy: '연말 지출 절제, 충동구매 방지',
          target: '연말 추가 지출 예산 내 관리'
        },
        investment: {
          strategy: '세금 최적화 매도, 내년 투자 준비',
          target: '포트폴리오 정리 및 현금 확보'
        },
        risk: {
          level: '낮음',
          caution: '연말 분위기에 휩쓸려 과소비하지 마세요.'
        }
      }
    ];
  };

  const quarters = getQuarterlyStrategy();

  // 분기별 KPI
  const getQuarterlyKPI = () => {
    return {
      Q1: {
        savingsRate: baseScore >= 70 ? '20%' : '15%',
        investmentStart: 재성 >= 2 ? '30%' : '20%',
        expenseReduction: '10%'
      },
      Q2: {
        savingsRate: baseScore >= 70 ? '25%' : '20%',
        investmentAccum: 재성 >= 2 ? '50%' : '40%',
        sideIncome: 식상 >= 2 ? '월 50만' : '월 30만'
      },
      Q3: {
        savingsRate: baseScore >= 70 ? '20%' : '15%',
        investmentAccum: 재성 >= 2 ? '75%' : '60%',
        skillUp: 인성 >= 2 ? '자격증 1개' : '온라인 강의 완료'
      },
      Q4: {
        savingsRate: baseScore >= 70 ? '25%' : '20%',
        investmentAccum: '100%',
        yearlyGoal: '달성률 90% 이상'
      }
    };
  };

  const kpi = getQuarterlyKPI();

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
        📊 2026년 분기별 재물 전략
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님의 분기별 맞춤 재정 로드맵
      </p>

      {/* 분기별 상세 전략 */}
      <div className="space-y-8">
        {quarters.map((q, qIdx) => (
          <motion.div
            key={q.quarter}
            className="glass rounded-2xl overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: qIdx * 0.1 }}
          >
            {/* 헤더 */}
            <div className={`p-6 ${
              q.quarter === 'Q1' ? 'bg-gradient-to-r from-green-500/20 to-emerald-600/20' :
              q.quarter === 'Q2' ? 'bg-gradient-to-r from-orange-500/20 to-red-600/20' :
              q.quarter === 'Q3' ? 'bg-gradient-to-r from-blue-500/20 to-indigo-600/20' :
              'bg-gradient-to-r from-purple-500/20 to-pink-600/20'
            }`}>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{q.emoji}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{q.quarter}: {q.theme}</h3>
                    <p className="text-slate-400">{q.period}</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-400">{q.overallScore}점</div>
                  <p className="text-xs text-slate-500">분기 운세</p>
                </div>
              </div>
              <p className="mt-4 text-slate-300">{q.description}</p>
            </div>

            {/* 본문 */}
            <div className="p-6 space-y-6">
              {/* 핵심 액션 */}
              <div>
                <h4 className="font-bold text-lg text-amber-400 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5" /> 핵심 액션
                </h4>
                <div className="space-y-3">
                  {q.keyActions.map((action, aIdx) => (
                    <div
                      key={aIdx}
                      className={`glass rounded-xl p-4 ${
                        action.priority === 'critical' ? 'border border-red-500/30' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                          action.priority === 'critical' ? 'text-red-400' :
                          action.priority === 'high' ? 'text-amber-400' : 'text-green-400'
                        }`} />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-white">{action.action}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              action.priority === 'critical' ? 'bg-red-500/20 text-red-400' :
                              action.priority === 'high' ? 'bg-amber-500/20 text-amber-400' :
                              'bg-green-500/20 text-green-400'
                            }`}>
                              {action.priority === 'critical' ? '필수' : action.priority === 'high' ? '중요' : '권장'}
                            </span>
                            <span className="text-xs text-slate-500">{action.week}</span>
                          </div>
                          <p className="text-slate-400 text-sm mt-1">{action.detail}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 수입/지출/투자 전략 */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="glass rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <h5 className="font-semibold text-green-400">수입 전략</h5>
                  </div>
                  <p className="text-slate-300 text-sm mb-2">{q.income.strategy}</p>
                  <p className="text-slate-500 text-xs">목표: {q.income.target}</p>
                </div>
                <div className="glass rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-blue-400" />
                    <h5 className="font-semibold text-blue-400">지출 전략</h5>
                  </div>
                  <p className="text-slate-300 text-sm mb-2">{q.expense.strategy}</p>
                  <p className="text-slate-500 text-xs">목표: {q.expense.target}</p>
                </div>
                <div className="glass rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-purple-400" />
                    <h5 className="font-semibold text-purple-400">투자 전략</h5>
                  </div>
                  <p className="text-slate-300 text-sm mb-2">{q.investment.strategy}</p>
                  <p className="text-slate-500 text-xs">목표: {q.investment.target}</p>
                </div>
              </div>

              {/* 리스크 경고 */}
              <div className={`rounded-xl p-4 ${
                q.risk.level === '높음' || q.risk.level === '중높음' ? 'bg-red-500/10 border border-red-500/30' :
                q.risk.level === '중간' ? 'bg-yellow-500/10 border border-yellow-500/30' :
                'bg-green-500/10 border border-green-500/30'
              }`}>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-semibold ${
                    q.risk.level === '높음' || q.risk.level === '중높음' ? 'text-red-400' :
                    q.risk.level === '중간' ? 'text-yellow-400' : 'text-green-400'
                  }`}>
                    ⚠️ 리스크 수준: {q.risk.level}
                  </span>
                </div>
                <p className="text-slate-400 text-sm mt-1">{q.risk.caution}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 연간 로드맵 요약 */}
      <div className="glass rounded-2xl p-6 mt-8">
        <h3 className="text-xl font-bold text-amber-400 mb-6 flex items-center gap-2">
          <ArrowRight className="w-6 h-6" /> 연간 로드맵 요약
        </h3>
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-4">
          {quarters.map((q, idx) => (
            <div key={idx} className="flex items-center">
              <div className="text-center min-w-24">
                <span className="text-2xl">{q.emoji}</span>
                <p className="font-bold text-white mt-1">{q.quarter}</p>
                <p className="text-xs text-slate-500">{q.theme}</p>
                <div className="mt-2 text-amber-400 font-bold">{q.overallScore}점</div>
              </div>
              {idx < quarters.length - 1 && (
                <ArrowRight className="w-6 h-6 text-slate-600 mx-2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
