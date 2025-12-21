'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Scale, TrendingUp, TrendingDown, Target } from 'lucide-react';

interface HealthWeightProps {
  result: SajuResult;
  name: string;
}

export default function HealthWeight({ result, name }: HealthWeightProps) {
  const dayElement = result.day.stem.element;

  // 체중 관리 운세 계산
  const calculateWeightTendency = () => {
    const { 토 } = result.elements;
    let tendency = '유지';
    let score = 70;

    if (토 >= 40) {
      tendency = '증가';
      score = 55;
    } else if (토 <= 15) {
      tendency = '감소';
      score = 60;
    }

    if (dayElement === '토') {
      tendency = '증가';
      score = 50;
    } else if (dayElement === '목') {
      tendency = '유지';
      score = 75;
    }

    return { tendency, score };
  };

  const weightInfo = calculateWeightTendency();

  // 체질별 체중 관리 가이드
  const getWeightGuide = () => {
    const guide: Record<
      string,
      {
        bodyType: string;
        characteristics: string[];
        weightLoss: { title: string; methods: string[] };
        weightGain: { title: string; methods: string[] };
        diet: string[];
        exercise: string[];
        caution: string[];
      }
    > = {
      목: {
        bodyType: '날씬하고 긴 체형',
        characteristics: [
          '신진대사가 빨라 살이 잘 안 찜',
          '근육보다 지방이 적음',
          '스트레스로 체중 변화 큼',
          '불규칙한 생활로 변동 많음',
        ],
        weightLoss: {
          title: '다이어트 (필요시)',
          methods: [
            '규칙적인 식사로 폭식 방지',
            '유산소 운동 (조깅, 수영)',
            '스트레스 관리가 핵심',
            '충분한 수면 (23:00 이전 취침)',
          ],
        },
        weightGain: {
          title: '체중 증가 (필요시)',
          methods: [
            '단백질 섭취 늘리기',
            '근력 운동으로 근육 만들기',
            '규칙적인 식사와 간식',
            '스트레스 줄이고 안정적 생활',
          ],
        },
        diet: [
          '신선한 채소와 과일',
          '지방이 적은 단백질',
          '통곡물과 견과류',
          '규칙적인 물 섭취',
        ],
        exercise: [
          '요가, 필라테스 (유연성)',
          '가벼운 조깅',
          '수영',
          '스트레칭',
        ],
        caution: [
          '과도한 다이어트 금지',
          '스트레스성 폭식 주의',
          '불규칙한 식사 피하기',
        ],
      },
      화: {
        bodyType: '활동적이고 근육질 체형',
        characteristics: [
          '에너지 소모가 많음',
          '활동량에 따라 체중 변화',
          '감정 기복으로 식욕 변화',
          '대사가 빨라 체중 관리 용이',
        ],
        weightLoss: {
          title: '다이어트',
          methods: [
            '고강도 유산소 운동',
            '매운 음식 적당히 섭취',
            '충분한 수분 섭취',
            '스트레스 관리',
          ],
        },
        weightGain: {
          title: '체중 증가',
          methods: [
            '고단백 고칼로리 식사',
            '근력 운동 병행',
            '충분한 휴식',
            '규칙적인 식사',
          ],
        },
        diet: [
          '시원한 채소와 과일',
          '붉은 살코기 적당히',
          '잡곡밥',
          '녹차, 보리차',
        ],
        exercise: [
          '달리기, 사이클',
          '수영',
          '격투기 (적당히)',
          '명상으로 마무리',
        ],
        caution: [
          '과식 주의',
          '자극적 음식 제한',
          '급격한 체중 변화 피하기',
        ],
      },
      토: {
        bodyType: '살이 잘 찌는 체형',
        characteristics: [
          '소화 흡수가 잘됨',
          '대사가 느려 살이 잘 찜',
          '근심 걱정으로 폭식 경향',
          '체중 감량이 어려움',
        ],
        weightLoss: {
          title: '다이어트 (중요)',
          methods: [
            '규칙적인 운동 필수 (주 5회)',
            '저칼로리 고영양 식단',
            '천천히 꼭꼭 씹어 먹기',
            '간식과 야식 절제',
          ],
        },
        weightGain: {
          title: '체중 증가 (주의)',
          methods: [
            '이미 살이 잘 찌므로 주의',
            '근육량 늘리기 위한 운동',
            '단백질 위주 식사',
          ],
        },
        diet: [
          '저칼로리 채소 많이',
          '통곡물과 잡곡',
          '저지방 단백질',
          '과일 적당량',
        ],
        exercise: [
          '걷기, 등산 (매일)',
          '웨이트 트레이닝',
          '수영',
          '댄스 (즐겁게)',
        ],
        caution: [
          '과식과 폭식 절대 금지',
          '감정적 식사 조절',
          '정크푸드 피하기',
        ],
      },
      금: {
        bodyType: '균형 잡힌 체형',
        characteristics: [
          '체중 관리가 비교적 용이',
          '규칙적인 생활로 안정',
          '스트레스로 식욕 변화',
          '체형 유지 능력 좋음',
        ],
        weightLoss: {
          title: '다이어트',
          methods: [
            '유산소와 무산소 병행',
            '균형 잡힌 식단',
            '규칙적인 생활 패턴',
            '충분한 수분',
          ],
        },
        weightGain: {
          title: '체중 증가',
          methods: [
            '고단백 식단',
            '근력 운동 집중',
            '칼로리 섭취 늘리기',
            '규칙적인 식사',
          ],
        },
        diet: [
          '흰색 음식 (무, 도라지)',
          '단백질 충분히',
          '신선한 과일',
          '물 자주 마시기',
        ],
        exercise: [
          '조깅, 달리기',
          '등산',
          '웨이트 트레이닝',
          '호흡 운동',
        ],
        caution: [
          '건조한 환경 피하기',
          '규칙적인 운동 유지',
          '과도한 제한 금지',
        ],
      },
      수: {
        bodyType: '부종이 생기기 쉬운 체형',
        characteristics: [
          '수분 대사가 중요',
          '부종으로 체중 증가 느낌',
          '추위에 약해 활동 감소',
          '겨울철 체중 증가 경향',
        ],
        weightLoss: {
          title: '다이어트',
          methods: [
            '부종 제거가 우선',
            '염분 섭취 줄이기',
            '따뜻한 물 자주 마시기',
            '규칙적인 운동으로 순환',
          ],
        },
        weightGain: {
          title: '체중 증가',
          methods: [
            '고단백 고칼로리',
            '따뜻한 음식 위주',
            '근력 운동',
            '충분한 휴식',
          ],
        },
        diet: [
          '부종 완화 음식 (팥, 옥수수수염)',
          '검은콩, 흑미',
          '저염식',
          '따뜻한 차',
        ],
        exercise: [
          '수영 (순환 촉진)',
          '요가, 스트레칭',
          '걷기',
          '족욕 (운동 후)',
        ],
        caution: [
          '과도한 염분 섭취',
          '찬 음식 피하기',
          '장시간 앉아있기 금지',
        ],
      },
    };

    return guide[dayElement] || guide['목'];
  };

  const weightGuide = getWeightGuide();

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
        ⚖️ 체중 관리 & 다이어트
      </h2>

      {/* 체중 경향 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
            <Scale className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-purple-400">체중 관리 운세</h3>
            <p className="text-slate-400 text-sm">{weightGuide.bodyType}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="glass rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-white">체중 경향</h4>
              {weightInfo.tendency === '증가' ? (
                <TrendingUp className="w-6 h-6 text-red-400" />
              ) : weightInfo.tendency === '감소' ? (
                <TrendingDown className="w-6 h-6 text-blue-400" />
              ) : (
                <Target className="w-6 h-6 text-green-400" />
              )}
            </div>
            <p className="text-3xl font-bold text-white mb-2">{weightInfo.tendency}</p>
            <p className="text-slate-400 text-sm">관리 필요도: {100 - weightInfo.score}%</p>
          </div>

          <div className="glass rounded-xl p-5">
            <h4 className="font-bold text-cyan-400 mb-3">체질 특성</h4>
            <ul className="space-y-1">
              {weightGuide.characteristics.slice(0, 3).map((char, index) => (
                <li key={index} className="flex items-start gap-2 text-slate-300 text-sm">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span>{char}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 체중 감량/증가 방법 */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2">
            <TrendingDown className="w-5 h-5" />
            {weightGuide.weightLoss.title}
          </h3>
          <ul className="space-y-3">
            {weightGuide.weightLoss.methods.map((method, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-green-400 mt-1">✓</span>
                <span className="text-slate-300 text-sm">{method}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            {weightGuide.weightGain.title}
          </h3>
          <ul className="space-y-3">
            {weightGuide.weightGain.methods.map((method, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-blue-400 mt-1">✓</span>
                <span className="text-slate-300 text-sm">{method}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* 식단 & 운동 */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-bold text-amber-400 mb-4">🍽️ 추천 식단</h3>
          <ul className="space-y-2">
            {weightGuide.diet.map((food, index) => (
              <motion.li
                key={index}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-amber-400">•</span>
                <span className="text-slate-300 text-sm">{food}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-bold text-cyan-400 mb-4">🏃 추천 운동</h3>
          <ul className="space-y-2">
            {weightGuide.exercise.map((ex, index) => (
              <motion.li
                key={index}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-cyan-400">•</span>
                <span className="text-slate-300 text-sm">{ex}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* 주의사항 */}
      <div className="glass rounded-2xl p-6 bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30">
        <h3 className="text-xl font-bold text-red-400 mb-4">⚠️ 주의사항</h3>
        <ul className="space-y-2">
          {weightGuide.caution.map((caution, index) => (
            <motion.li
              key={index}
              className="flex items-start gap-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="text-red-400 mt-0.5">!</span>
              <span className="text-slate-300 text-sm">{caution}</span>
            </motion.li>
          ))}
        </ul>
        <p className="text-slate-300 text-sm mt-4">
          💡 급격한 체중 변화는 건강에 해롭습니다. 천천히 꾸준히 관리하는 것이 가장 중요합니다.
        </p>
      </div>
    </motion.div>
  );
}
