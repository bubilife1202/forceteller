'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Briefcase, TrendingUp, Users2, Shield, Target, AlertTriangle } from 'lucide-react';

interface EmotionWorkProps {
  result: SajuResult;
  name: string;
}

interface WorkStressSource {
  type: string;
  description: string;
  intensity: number;
  color: string;
}

export default function EmotionWork({ result, name }: EmotionWorkProps) {
  // 업무 스트레스 분석
  const analyzeWorkStress = () => {
    const { 목, 화, 토, 금, 수 } = result.elements;
    const { 관성, 재성, 식상, 인성, 비겁 } = result.tenGodsCount;

    const stress = {
      sources: [] as WorkStressSource[],
      level: 50,
      burnoutRisk: 50
    };

    // 관성 - 권위 스트레스
    if (관성 >= 3) {
      stress.sources.push({
        type: '과도한 통제와 규제',
        description: '상사의 지시나 회사 규칙에 답답함을 느낌',
        intensity: 80,
        color: 'text-red-400'
      });
      stress.level += 20;
      stress.burnoutRisk += 15;
    } else if (관성 === 0) {
      stress.sources.push({
        type: '방향성 부족',
        description: '명확한 지침이나 체계 없이 불안함',
        intensity: 60,
        color: 'text-orange-400'
      });
      stress.level += 10;
    }

    // 재성 - 성과 압박
    if (재성 >= 3) {
      stress.sources.push({
        type: '성과와 목표 압박',
        description: '끊임없는 목표 달성과 성과 요구에 지침',
        intensity: 85,
        color: 'text-yellow-400'
      });
      stress.level += 25;
      stress.burnoutRisk += 20;
    } else if (재성 === 0) {
      stress.sources.push({
        type: '현실적 책임 회피',
        description: '업무 책임이나 실적에 부담을 느낌',
        intensity: 55,
        color: 'text-amber-400'
      });
      stress.level += 10;
    }

    // 식상 - 표현 억압
    if (식상 >= 3) {
      stress.sources.push({
        type: '의견 표현 억압',
        description: '자유로운 의견 개진이나 창의성 발휘가 어려움',
        intensity: 75,
        color: 'text-green-400'
      });
      stress.level += 15;
    } else if (식상 === 0) {
      stress.sources.push({
        type: '커뮤니케이션 어려움',
        description: '동료나 상사와의 소통이 버거움',
        intensity: 65,
        color: 'text-lime-400'
      });
      stress.level += 12;
    }

    // 비겁 - 경쟁과 자존심
    if (비겁 >= 3) {
      stress.sources.push({
        type: '과도한 경쟁 의식',
        description: '동료와의 비교나 경쟁에서 오는 스트레스',
        intensity: 70,
        color: 'text-purple-400'
      });
      stress.level += 15;
    } else if (비겁 === 0) {
      stress.sources.push({
        type: '자신감 부족',
        description: '업무 수행이나 의사결정에 자신이 없음',
        intensity: 60,
        color: 'text-pink-400'
      });
      stress.level += 12;
    }

    // 인성 - 과다 사고
    if (인성 >= 3) {
      stress.sources.push({
        type: '생각의 과부하',
        description: '업무를 과도하게 분석하고 고민함',
        intensity: 70,
        color: 'text-blue-400'
      });
      stress.level += 15;
      stress.burnoutRisk += 10;
    }

    // 오행 불균형
    const total = 목 + 화 + 토 + 금 + 수;
    const max = Math.max(목, 화, 토, 금, 수);
    const min = Math.min(목, 화, 토, 금, 수);
    if (max - min >= 3) {
      stress.burnoutRisk += 15;
    }

    stress.level = Math.min(stress.level, 100);
    stress.burnoutRisk = Math.min(stress.burnoutRisk, 100);

    return stress;
  };

  // 직장 내 관계 패턴
  const analyzeWorkRelationships = () => {
    const { 목, 화, 토, 금, 수 } = result.elements;
    const { 관성, 재성, 식상, 인성, 비겁 } = result.tenGodsCount;

    const relationships = {
      withBoss: {
        style: '',
        tips: [] as string[]
      },
      withColleagues: {
        style: '',
        tips: [] as string[]
      },
      withSubordinates: {
        style: '',
        tips: [] as string[]
      }
    };

    // 상사 관계 (관성)
    if (관성 >= 3) {
      relationships.withBoss.style = '긴장되고 부담스러운 관계';
      relationships.withBoss.tips = [
        '권위를 인정하되 자신의 의견도 적절히 표현',
        '업무 보고를 체계적으로 준비',
        '감정적 반응보다 논리적 대화',
        '상사도 사람임을 인식하고 공감하기'
      ];
    } else if (관성 === 0) {
      relationships.withBoss.style = '자유롭지만 때로 방향성 부족';
      relationships.withBoss.tips = [
        '정기적으로 방향성 확인하기',
        '스스로 목표와 계획 세우기',
        '적절한 보고와 소통 유지',
        '자율성을 책임감으로 보답'
      ];
    } else {
      relationships.withBoss.style = '적당히 균형잡힌 관계';
      relationships.withBoss.tips = [
        '상호 존중하는 관계 유지',
        '명확한 커뮤니케이션',
        '기대치 조율하기'
      ];
    }

    // 동료 관계 (비겁)
    if (비겁 >= 3) {
      relationships.withColleagues.style = '경쟁적이거나 거리를 두는 관계';
      relationships.withColleagues.tips = [
        '경쟁보다 협력의 마인드 기르기',
        '동료의 성공을 함께 기뻐하기',
        '자존심보다 팀워크 우선',
        '상호 도움을 주고받는 관계 만들기'
      ];
    } else if (비겁 === 0) {
      relationships.withColleagues.style = '의존적이거나 소극적인 관계';
      relationships.withColleagues.tips = [
        '자신의 의견을 명확히 전달하기',
        '도움을 구하되 주체성 잃지 않기',
        '자신감을 가지고 참여하기',
        '경계선을 명확히 하기'
      ];
    } else {
      relationships.withColleagues.style = '협력적이고 우호적인 관계';
      relationships.withColleagues.tips = [
        '긍정적인 관계 지속하기',
        '상호 지지하는 문화 만들기',
        '개방적 소통 유지'
      ];
    }

    // 부하 직원 관계 (식상)
    if (식상 >= 3) {
      relationships.withSubordinates.style = '표현이 직접적이고 솔직한 스타일';
      relationships.withSubordinates.tips = [
        '피드백 시 상대 감정 고려',
        '비판보다 건설적 제안',
        '경청하고 이해하려 노력',
        '긍정 피드백도 충분히'
      ];
    } else if (식상 === 0) {
      relationships.withSubordinates.style = '지시나 피드백이 부족할 수 있음';
      relationships.withSubordinates.tips = [
        '명확한 지침과 기대치 전달',
        '정기적인 1:1 미팅',
        '칭찬과 인정 표현하기',
        '개방적 소통 환경 조성'
      ];
    } else {
      relationships.withSubordinates.style = '균형잡힌 리더십';
      relationships.withSubordinates.tips = [
        '지지적이고 격려하는 리더',
        '명확하면서도 따뜻한 소통',
        '성장을 돕는 멘토 역할'
      ];
    }

    return relationships;
  };

  // 감정 관리 전략
  const getEmotionManagementStrategies = () => {
    const { 목, 화, 토, 금, 수 } = result.elements;
    const dayElement = result.day.stem.element;

    const strategies = [];

    // 일간별 맞춤 전략
    if (dayElement === '목') {
      strategies.push({
        title: '목(木) 일간 직장 감정 관리',
        immediate: [
          '잠깐 자리 떠나 걷기',
          '창밖 자연 바라보기',
          '스트레칭으로 몸 풀기',
          '깊은 호흡 3회'
        ],
        daily: [
          '출근 전 가벼운 운동',
          '점심시간 산책',
          '업무 중간 스트레칭',
          '퇴근 후 취미 활동'
        ],
        color: 'text-green-400'
      });
    } else if (dayElement === '화') {
      strategies.push({
        title: '화(火) 일간 직장 감정 관리',
        immediate: [
          '화장실 가서 심호흡',
          '차가운 물 마시기',
          '에너지 메모장에 쏟아내기',
          '10초 명상'
        ],
        daily: [
          '출근 전 격렬한 운동',
          '점심 후 짧은 명상',
          '열정 쏟을 프로젝트 만들기',
          '퇴근 후 에너지 발산'
        ],
        color: 'text-red-400'
      });
    } else if (dayElement === '토') {
      strategies.push({
        title: '토(土) 일간 직장 감정 관리',
        immediate: [
          '따뜻한 차 마시기',
          '편안한 자세 취하기',
          '좋아하는 음악 듣기',
          '안정감 주는 생각하기'
        ],
        daily: [
          '충분한 아침 식사',
          '편안한 업무 환경 조성',
          '정기적인 휴식 시간',
          '좋아하는 저녁 루틴'
        ],
        color: 'text-yellow-400'
      });
    } else if (dayElement === '금') {
      strategies.push({
        title: '금(金) 일간 직장 감정 관리',
        immediate: [
          '책상 정리하기',
          '할 일 리스트 작성',
          '우선순위 재정리',
          '품질 좋은 물건 사용'
        ],
        daily: [
          '아침 계획 세우기',
          '체계적인 업무 진행',
          '정리 정돈 시간',
          '완벽주의 내려놓기 연습'
        ],
        color: 'text-slate-300'
      });
    } else if (dayElement === '수') {
      strategies.push({
        title: '수(水) 일간 직장 감정 관리',
        immediate: [
          '물 충분히 마시기',
          '조용한 곳에서 혼자 시간',
          '메모로 생각 정리',
          '유연하게 받아들이기'
        ],
        daily: [
          '여유롭게 출근하기',
          '혼자만의 점심 시간',
          '흐름에 맡기는 연습',
          '독서나 사색의 시간'
        ],
        color: 'text-blue-400'
      });
    }

    // 보편적 전략
    strategies.push({
      title: '5분 긴급 감정 조절법',
      immediate: [
        '1분: 현재 감정 인식하기',
        '2분: 깊고 천천히 호흡하기',
        '3분: 상황을 객관적으로 보기',
        '4분: 대응 방법 선택하기'
      ],
      daily: [
        '아침 마음 준비 5분',
        '점심 후 리셋 5분',
        '오후 에너지 충전 5분',
        '퇴근 전 정리 5분'
      ],
      color: 'text-purple-400'
    });

    return strategies;
  };

  // 번아웃 예방법
  const getBurnoutPrevention = () => {
    return {
      signs: [
        '만성적인 피로감과 에너지 부족',
        '업무에 대한 냉소적 태도',
        '업무 성과와 집중력 저하',
        '두통, 불면증 등 신체 증상',
        '감정 조절 어려움 (짜증, 우울)',
        '대인 관계 회피',
        '의욕과 열정 상실',
        '작은 일에도 압도당하는 느낌'
      ],
      prevention: [
        {
          category: '업무 관리',
          tips: [
            '명확한 업무 경계 설정',
            '우선순위 정하고 집중',
            '완벽주의 내려놓기',
            '도움 요청하기',
            'No라고 말할 줄 알기'
          ]
        },
        {
          category: '휴식과 회복',
          tips: [
            '충분한 수면 (7-8시간)',
            '규칙적인 운동',
            '취미와 여가 시간',
            '휴가 적극 활용',
            '디지털 디톡스'
          ]
        },
        {
          category: '관계와 지지',
          tips: [
            '신뢰할 수 있는 사람과 대화',
            '직장 내 지지 그룹',
            '전문가 상담 고려',
            '가족, 친구와 시간',
            '커뮤니티 참여'
          ]
        },
        {
          category: '의미와 목적',
          tips: [
            '일의 의미 재발견',
            '작은 성취 인정하기',
            '장기 목표 설정',
            '성장 기회 찾기',
            '가치관 정렬 확인'
          ]
        }
      ]
    };
  };

  // 건강한 직장 생활 루틴
  const getHealthyWorkRoutine = () => {
    return {
      morning: [
        '여유롭게 기상 (출근 2시간 전)',
        '가벼운 운동이나 스트레칭',
        '영양가 있는 아침 식사',
        '오늘의 목표 3가지 설정',
        '긍정 선언이나 명상 5분'
      ],
      duringWork: [
        '90분 집중 - 15분 휴식 사이클',
        '2시간마다 일어나서 움직이기',
        '점심은 업무와 분리해서',
        '물 충분히 마시기 (1시간 1잔)',
        '오후 3시 에너지 충전 (간식, 스트레칭)'
      ],
      evening: [
        '퇴근 시간 지키기',
        '통근 시간을 전환 시간으로',
        '업무 생각 의식적으로 내려놓기',
        '좋아하는 활동으로 에너지 충전',
        '가족, 친구와 질 좋은 시간'
      ],
      beforeSleep: [
        '업무 관련 생각 정리하고 메모',
        '내일 준비 미리 하기',
        '디지털 기기 1시간 전 끄기',
        '이완 활동 (독서, 명상, 목욕)',
        '감사 일기 쓰기'
      ]
    };
  };

  // 어려운 상황 대처법
  const getDifficultSituationCoping = () => {
    return [
      {
        situation: '상사에게 불합리한 요구를 받았을 때',
        steps: [
          '1. 감정적 반응 억제하고 일단 들어주기',
          '2. 요구사항 명확히 확인 (오해 방지)',
          '3. 현실적 어려움을 객관적 근거로 설명',
          '4. 대안 제시하기',
          '5. 합의점 찾기 (윈-윈)'
        ],
        color: 'text-red-400'
      },
      {
        situation: '동료와 갈등이 생겼을 때',
        steps: [
          '1. 감정 가라앉히기 (하루 정도 시간 두기)',
          '2. 객관적으로 상황 파악하기',
          '3. 1:1 대화 요청하기',
          '4. "나"를 주어로 감정 표현 (비난 금지)',
          '5. 상대 입장 경청하고 타협점 찾기'
        ],
        color: 'text-orange-400'
      },
      {
        situation: '업무 과부하로 힘들 때',
        steps: [
          '1. 모든 업무 리스트업',
          '2. 중요도와 긴급도로 분류',
          '3. 상사에게 우선순위 확인',
          '4. 위임 가능한 업무 찾기',
          '5. 현실적 타임라인 재조정'
        ],
        color: 'text-yellow-400'
      },
      {
        situation: '실수나 실패를 했을 때',
        steps: [
          '1. 빨리 인정하고 보고하기',
          '2. 변명보다 해결책 제시',
          '3. 책임지고 수습하기',
          '4. 배운 점 정리하기',
          '5. 자기 비난에서 벗어나기'
        ],
        color: 'text-green-400'
      }
    ];
  };

  const workStress = analyzeWorkStress();
  const workRelationships = analyzeWorkRelationships();
  const emotionStrategies = getEmotionManagementStrategies();
  const burnoutPrevention = getBurnoutPrevention();
  const healthyRoutine = getHealthyWorkRoutine();
  const difficultSituations = getDifficultSituationCoping();

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold mb-8 gradient-text flex items-center gap-3">
        <Briefcase className="w-8 h-8 text-blue-400" />
        직장에서의 감정 관리
      </h2>

      {/* 업무 스트레스 분석 */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-orange-400 mb-5 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6" />
          업무 스트레스 분석
        </h3>
        <div className="glass rounded-2xl p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="text-sm text-slate-400 mb-2">스트레스 레벨</div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-3 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${workStress.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <span className="text-xl font-bold text-orange-400">{workStress.level}%</span>
              </div>
            </div>
            <div>
              <div className="text-sm text-slate-400 mb-2">번아웃 위험도</div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-3 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${workStress.burnoutRisk}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
                <span className="text-xl font-bold text-red-400">{workStress.burnoutRisk}%</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {workStress.sources.map((source, index) => (
              <motion.div
                key={source.type}
                className="bg-slate-800/50 rounded-xl p-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className={`font-bold ${source.color}`}>{source.type}</h4>
                  <span className={`text-lg font-bold ${source.color}`}>{source.intensity}%</span>
                </div>
                <p className="text-sm text-slate-300">{source.description}</p>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden mt-3">
                  <motion.div
                    className={`h-full bg-gradient-to-r from-${source.color.split('-')[1]}-400 to-${source.color.split('-')[1]}-600`}
                    style={{
                      background: `linear-gradient(to right, rgb(251, 146, 60), rgb(249, 115, 22))`
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${source.intensity}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 직장 내 관계 */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-blue-400 mb-5 flex items-center gap-2">
          <Users2 className="w-6 h-6" />
          직장 내 관계 패턴
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {Object.entries(workRelationships).map(([key, relation], index) => {
            const titles = {
              withBoss: '👔 상사와의 관계',
              withColleagues: '🤝 동료와의 관계',
              withSubordinates: '👥 부하와의 관계'
            };
            const colors = {
              withBoss: 'text-purple-400',
              withColleagues: 'text-cyan-400',
              withSubordinates: 'text-green-400'
            };
            return (
              <motion.div
                key={key}
                className="glass rounded-2xl p-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h4 className={`font-bold mb-3 ${colors[key as keyof typeof colors]}`}>
                  {titles[key as keyof typeof titles]}
                </h4>
                <p className="text-sm text-slate-300 mb-4">{relation.style}</p>
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="text-xs font-semibold text-emerald-400 mb-2">개선 팁:</div>
                  <div className="space-y-1">
                    {relation.tips.map((tip: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="text-emerald-400 mt-0.5">→</span>
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 감정 관리 전략 */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-purple-400 mb-5 flex items-center gap-2">
          <Shield className="w-6 h-6" />
          맞춤 감정 관리 전략
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {emotionStrategies.map((strategy, index) => (
            <motion.div
              key={strategy.title}
              className="glass rounded-2xl p-5 hover:scale-[1.02] transition-transform"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className={`font-bold text-lg mb-4 ${strategy.color}`}>{strategy.title}</h4>

              <div className="mb-4">
                <div className="text-sm font-semibold text-cyan-400 mb-2">⚡ 즉각 대응:</div>
                <div className="space-y-2">
                  {strategy.immediate.map((action, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-yellow-400 mt-0.5">→</span>
                      <span>{action}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-3">
                <div className="text-sm font-semibold text-purple-400 mb-2">📅 일상 관리:</div>
                <div className="space-y-2">
                  {strategy.daily.map((action, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-emerald-400 mt-0.5">✓</span>
                      <span>{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 번아웃 예방 */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-red-400 mb-5 flex items-center gap-2">
          <TrendingUp className="w-6 h-6" />
          번아웃 예방 가이드
        </h3>
        <div className="glass rounded-2xl p-6">
          <div className="mb-6">
            <h4 className="font-bold text-orange-400 mb-3">🚨 번아웃 경고 신호</h4>
            <div className="grid md:grid-cols-2 gap-3">
              {burnoutPrevention.signs.map((sign, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-red-400 mt-0.5">•</span>
                  <span>{sign}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {burnoutPrevention.prevention.map((category, index) => (
              <motion.div
                key={category.category}
                className="bg-slate-800/50 rounded-xl p-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h5 className="font-bold text-cyan-400 mb-3">{category.category}</h5>
                <div className="space-y-2">
                  {category.tips.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-emerald-400 mt-0.5">✓</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 건강한 직장 생활 루틴 */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-green-400 mb-5 flex items-center gap-2">
          <Target className="w-6 h-6" />
          건강한 직장 생활 루틴
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(healthyRoutine).map(([time, activities], index) => {
            const titles = {
              morning: '🌅 아침 루틴',
              duringWork: '💼 업무 중',
              evening: '🌆 저녁 루틴',
              beforeSleep: '🌙 취침 전'
            };
            const colors = {
              morning: 'text-yellow-400',
              duringWork: 'text-blue-400',
              evening: 'text-orange-400',
              beforeSleep: 'text-purple-400'
            };
            return (
              <motion.div
                key={time}
                className="glass rounded-2xl p-5"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h4 className={`font-bold mb-3 ${colors[time as keyof typeof colors]}`}>
                  {titles[time as keyof typeof titles]}
                </h4>
                <div className="space-y-2">
                  {(activities as string[]).map((activity, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-emerald-400 mt-0.5">✓</span>
                      <span>{activity}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 어려운 상황 대처법 */}
      <div>
        <h3 className="text-xl font-bold text-cyan-400 mb-5">💡 어려운 상황 대처법</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {difficultSituations.map((situation, index) => (
            <motion.div
              key={situation.situation}
              className="glass rounded-2xl p-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className={`font-bold mb-4 ${situation.color}`}>{situation.situation}</h4>
              <div className="space-y-2">
                {situation.steps.map((step, idx) => (
                  <div key={idx} className="text-sm text-slate-300">
                    {step}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 마음챙김 체크리스트 */}
      <motion.div
        className="mt-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-blue-500/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <h4 className="font-bold text-blue-400 mb-4">✅ 건강한 직장 생활 체크리스트</h4>
        <div className="grid md:grid-cols-2 gap-3 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <span>퇴근 시간 지키기</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <span>점심시간 충분히 쉬기</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <span>동료와 긍정적 대화 나누기</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <span>작은 성과 인정하기</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <span>스트레칭이나 걷기</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <span>업무 외 시간은 온전히 쉬기</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <span>도움 요청하거나 거절하기</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <span>긍정적 마인드 유지하기</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-blue-500/20 text-xs text-slate-400">
          💡 매일 6개 이상 체크되면 건강한 직장 생활을 하고 있습니다!
        </div>
      </motion.div>
    </motion.div>
  );
}
