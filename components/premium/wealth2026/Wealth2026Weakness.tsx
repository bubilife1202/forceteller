'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { AlertTriangle, Shield, Target, Lightbulb, TrendingDown, ArrowRight, CheckCircle } from 'lucide-react';

interface Wealth2026WeaknessProps {
  result: SajuResult;
  name: string;
  baseScore: number;
}

type SeverityLevel = 'high' | 'medium' | 'low';

interface Weakness {
  type: string;
  severity: SeverityLevel;
  emoji: string;
  description: string;
  symptoms: string[];
  solutions: {
    solution: string;
    detail: string;
    priority: 'must' | 'recommend';
  }[];
}

export default function Wealth2026Weakness({ result, name, baseScore: _baseScore }: Wealth2026WeaknessProps) {
  const dayElement = result.day.stem.element;
  const { 재성, 식상, 관성, 인성, 비겁 } = result.tenGodsCount;

  // 재물 약점 분석
  const getWeaknesses = (): Weakness[] => {
    const weaknesses: Weakness[] = [];

    // 재성 부족
    if (재성 < 1) {
      weaknesses.push({
        type: '재성 부족',
        severity: 'high',
        emoji: '💸',
        description: '재성이 없어 돈을 모으고 관리하는 데 어려움이 있습니다.',
        symptoms: [
          '돈이 들어와도 금방 나가는 느낌',
          '저축하기 힘든 체질',
          '재테크에 관심이 적거나 어려움',
          '돈 관리 습관이 잘 안 잡힘'
        ],
        solutions: [
          {
            solution: '자동이체 저축 설정',
            detail: '급여일에 자동으로 저축되게 설정하세요. 의지력에 의존하지 마세요.',
            priority: 'must'
          },
          {
            solution: '가계부 앱 사용',
            detail: '뱅크샐러드, 토스 등으로 자동 지출 관리하세요.',
            priority: 'must'
          },
          {
            solution: '전문가 도움 받기',
            detail: '재무설계사 상담이나 재테크 강의를 들어보세요.',
            priority: 'recommend'
          }
        ]
      });
    }

    // 비겁 과다
    if (비겁 >= 3) {
      weaknesses.push({
        type: '비겁 과다',
        severity: 'high',
        emoji: '🤝',
        description: '주변 사람들에게 돈이 새어나가기 쉽습니다.',
        symptoms: [
          '지인에게 돈 빌려주고 못 받음',
          '동업에서 손해 보기 쉬움',
          '보증을 서다가 피해를 봄',
          '남의 부탁을 거절하기 어려움'
        ],
        solutions: [
          {
            solution: '절대 보증 안 서기',
            detail: '어떤 관계라도 보증은 안 됩니다. 이것만 지켜도 큰 손실을 막습니다.',
            priority: 'must'
          },
          {
            solution: '돈 빌려주지 않기',
            detail: '빌려줄 거면 줄 생각으로. 받을 기대 하지 마세요.',
            priority: 'must'
          },
          {
            solution: '동업 계약서 필수',
            detail: '친한 사이라도 반드시 서면 계약하세요.',
            priority: 'must'
          }
        ]
      });
    }

    // 식상 과다
    if (식상 >= 3) {
      weaknesses.push({
        type: '식상 과다',
        severity: 'medium',
        emoji: '🎨',
        description: '아이디어는 많지만 실행력이 부족하고 충동적 지출 경향이 있습니다.',
        symptoms: [
          '사고 싶은 것이 너무 많음',
          '충동구매를 자주 함',
          '창업 아이디어만 많고 실행 못 함',
          '돈 쓰는 것에 대한 죄책감이 적음'
        ],
        solutions: [
          {
            solution: '48시간 규칙',
            detail: '구매 전 48시간 고민하세요. 대부분 사고 싶은 마음이 사라집니다.',
            priority: 'must'
          },
          {
            solution: '위시리스트 작성',
            detail: '사고 싶은 것은 리스트에 적고, 한 달 후에 다시 검토하세요.',
            priority: 'recommend'
          },
          {
            solution: '아이디어 실행 파트너',
            detail: '실행력 있는 파트너를 찾아 협업하세요.',
            priority: 'recommend'
          }
        ]
      });
    }

    // 관성 과다
    if (관성 >= 3) {
      weaknesses.push({
        type: '관성 과다',
        severity: 'medium',
        emoji: '⚖️',
        description: '너무 보수적이어서 투자 기회를 놓치기 쉽습니다.',
        symptoms: [
          '투자가 무섭고 어려움',
          '예금/적금만 고집함',
          '새로운 재테크 방식에 거부감',
          '리스크를 지나치게 회피함'
        ],
        solutions: [
          {
            solution: '소액 투자 시작',
            detail: '월 5-10만원으로 ETF 투자를 시작해보세요. 경험이 자신감을 줍니다.',
            priority: 'recommend'
          },
          {
            solution: '투자 교육',
            detail: '투자에 대한 두려움은 무지에서 옵니다. 공부하면 자신감이 생깁니다.',
            priority: 'recommend'
          },
          {
            solution: '분산 투자 원칙',
            detail: '안전 자산과 투자 자산의 비율을 정하고 지키세요.',
            priority: 'must'
          }
        ]
      });
    }

    // 인성 과다
    if (인성 >= 3) {
      weaknesses.push({
        type: '인성 과다',
        severity: 'low',
        emoji: '📚',
        description: '이론에 치우쳐 실전 재테크 경험이 부족할 수 있습니다.',
        symptoms: [
          '재테크 책은 많이 읽지만 실행이 안 됨',
          '완벽한 타이밍을 기다리다 기회를 놓침',
          '분석만 하고 행동이 없음',
          '자격증/학위 취득에만 집중'
        ],
        solutions: [
          {
            solution: '일단 시작하기',
            detail: '완벽하지 않아도 작게 시작하세요. 행동이 가장 중요합니다.',
            priority: 'must'
          },
          {
            solution: '데드라인 설정',
            detail: '언제까지 투자를 시작하겠다는 마감일을 정하세요.',
            priority: 'recommend'
          },
          {
            solution: '지식의 수익화',
            detail: '공부한 내용을 강의, 컨설팅 등으로 수익화하세요.',
            priority: 'recommend'
          }
        ]
      });
    }

    // 일간별 약점
    if (dayElement === '화') {
      weaknesses.push({
        type: '성급한 결정',
        severity: 'medium',
        emoji: '🔥',
        description: '화(火) 일간은 열정적이지만 성급한 재정 결정을 내리기 쉽습니다.',
        symptoms: [
          '흥분 상태에서 투자 결정',
          '주변 정보에 쉽게 휩쓸림',
          '기다리는 것을 못 참음',
          '손절/익절 타이밍 놓침'
        ],
        solutions: [
          {
            solution: '냉각기 갖기',
            detail: '중요한 재정 결정 전 최소 24시간 생각하세요.',
            priority: 'must'
          },
          {
            solution: '투자 원칙 문서화',
            detail: '매수/매도 원칙을 미리 적어두고 기계적으로 따르세요.',
            priority: 'must'
          }
        ]
      });
    }

    if (dayElement === '금') {
      weaknesses.push({
        type: '과도한 절약',
        severity: 'low',
        emoji: '💰',
        description: '금(金) 일간은 지나친 절약으로 삶의 질이나 투자 기회를 놓칠 수 있습니다.',
        symptoms: [
          '돈 쓰는 것에 죄책감',
          '필요한 것도 안 사는 경향',
          '투자도 너무 보수적',
          '돈을 모으기만 하고 못 씀'
        ],
        solutions: [
          {
            solution: '용돈 계좌 만들기',
            detail: '매월 정해진 금액은 죄책감 없이 쓰세요.',
            priority: 'recommend'
          },
          {
            solution: '경험에 투자',
            detail: '물건보다 경험(여행, 교육)에 돈을 쓰세요.',
            priority: 'recommend'
          }
        ]
      });
    }

    // 기본 약점 (모두에게 해당)
    if (weaknesses.length < 2) {
      weaknesses.push({
        type: '재정 교육 부족',
        severity: 'medium',
        emoji: '📖',
        description: '체계적인 재정 교육 없이 감으로 돈을 관리하고 있을 수 있습니다.',
        symptoms: [
          '예산 관리를 안 함',
          '투자와 저축의 차이를 모름',
          '복리의 힘을 활용 못 함',
          '보험/연금 구조를 모름'
        ],
        solutions: [
          {
            solution: '재테크 기초 공부',
            detail: '"부자 아빠 가난한 아빠", "돈의 심리학" 등 기초서를 읽으세요.',
            priority: 'recommend'
          },
          {
            solution: '재무설계 상담',
            detail: '전문가와 1:1 상담을 받아보세요. 객관적인 현황 파악에 도움됩니다.',
            priority: 'recommend'
          }
        ]
      });
    }

    return weaknesses;
  };

  const weaknesses = getWeaknesses();

  // 약점 개선 로드맵
  const getImprovementRoadmap = () => {
    return [
      {
        phase: '1단계',
        period: '1-2개월',
        title: '현황 파악',
        tasks: [
          '지난 3개월 지출 내역 분석',
          '순자산(자산-부채) 계산',
          '월 저축률 확인',
          '약점 인식 및 인정'
        ]
      },
      {
        phase: '2단계',
        period: '3-4개월',
        title: '습관 개선',
        tasks: [
          '자동이체 저축 시작',
          '가계부 작성 습관',
          '불필요한 지출 1개 제거',
          '재테크 책 1권 읽기'
        ]
      },
      {
        phase: '3단계',
        period: '5-6개월',
        title: '투자 시작',
        tasks: [
          '비상금 1개월치 확보',
          '소액 투자 시작 (ETF)',
          '연금저축 가입',
          '보험 정리'
        ]
      },
      {
        phase: '4단계',
        period: '7-12개월',
        title: '시스템화',
        tasks: [
          '수입의 일정 비율 자동 투자',
          '연 2회 재정 점검 습관화',
          '추가 수입원 1개 확보',
          '다음 해 계획 수립'
        ]
      }
    ];
  };

  const roadmap = getImprovementRoadmap();

  const severityColors: Record<SeverityLevel, { bg: string; border: string; text: string }> = {
    high: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400' },
    medium: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400' },
    low: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' }
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
        className="text-3xl font-bold text-center mb-4 gradient-text"
        style={{ fontFamily: "'Noto Serif KR', serif" }}
      >
        🔍 재물 약점 분석 & 개선 방법
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님의 재정적 약점과 극복 전략
      </p>

      {/* 약점 분석 */}
      <div className="space-y-6 mb-8">
        {weaknesses.map((weakness, idx) => (
          <motion.div
            key={idx}
            className={`rounded-2xl ${severityColors[weakness.severity].bg} border ${severityColors[weakness.severity].border} overflow-hidden`}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            {/* 헤더 */}
            <div className="p-5 border-b border-white/5">
              <div className="flex items-center gap-4">
                <span className="text-4xl">{weakness.emoji}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className={`text-xl font-bold ${severityColors[weakness.severity].text}`}>
                      {weakness.type}
                    </h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${severityColors[weakness.severity].bg} ${severityColors[weakness.severity].text}`}>
                      {weakness.severity === 'high' ? '심각' : weakness.severity === 'medium' ? '보통' : '경미'}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mt-1">{weakness.description}</p>
                </div>
              </div>
            </div>

            {/* 증상 */}
            <div className="p-5 border-b border-white/5">
              <h4 className="font-semibold text-slate-300 mb-3 flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-red-400" /> 이런 증상이 있나요?
              </h4>
              <div className="grid md:grid-cols-2 gap-2">
                {weakness.symptoms.map((symptom, sIdx) => (
                  <div key={sIdx} className="flex items-center gap-2 text-sm text-slate-400">
                    <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>{symptom}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 해결책 */}
            <div className="p-5">
              <h4 className="font-semibold text-slate-300 mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-green-400" /> 개선 방법
              </h4>
              <div className="space-y-3">
                {weakness.solutions.map((sol, solIdx) => (
                  <div key={solIdx} className="glass rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        sol.priority === 'must' ? 'text-red-400' : 'text-green-400'
                      }`} />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white">{sol.solution}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            sol.priority === 'must' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                          }`}>
                            {sol.priority === 'must' ? '필수' : '권장'}
                          </span>
                        </div>
                        <p className="text-slate-400 text-sm mt-1">{sol.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 개선 로드맵 */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-bold text-purple-400">약점 개선 로드맵</h3>
        </div>

        <div className="relative">
          {/* 연결선 */}
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-green-500 via-amber-500 to-purple-500 hidden md:block" />

          <div className="space-y-4">
            {roadmap.map((phase, idx) => (
              <motion.div
                key={idx}
                className="md:pl-16 relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
              >
                {/* 단계 마커 */}
                <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold hidden md:flex">
                  {phase.phase.replace('단계', '')}
                </div>

                <div className="glass rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="md:hidden text-2xl font-bold text-purple-400">{phase.phase}</span>
                    <h4 className="text-lg font-bold text-white">{phase.title}</h4>
                    <span className="text-xs text-slate-500">{phase.period}</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-2">
                    {phase.tasks.map((task, tIdx) => (
                      <div key={tIdx} className="flex items-center gap-2 text-sm">
                        <ArrowRight className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-slate-300">{task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 격려 메시지 */}
      <div className="glass rounded-2xl p-6 mt-8 text-center">
        <Shield className="w-12 h-12 mx-auto text-amber-400 mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">약점을 인식하는 것이 첫걸음입니다</h3>
        <p className="text-slate-400">
          {name}님, 자신의 약점을 알고 있다는 것 자체가 강점입니다.<br />
          작은 개선부터 시작하면 1년 후 완전히 다른 재정 상태를 만들 수 있습니다.
        </p>
      </div>
    </motion.div>
  );
}
