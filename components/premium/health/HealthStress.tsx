'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Brain, Heart, Smile, Frown, Wind, Sparkles } from 'lucide-react';

interface HealthStressProps {
  result: SajuResult;
  name: string;
}

export default function HealthStress({ result, name }: HealthStressProps) {
  const dayElement = result.day.stem.element;

  // 스트레스 취약도 계산
  const calculateStressLevel = () => {
    let level = 50;
    const { 관성, 비겁, 인성 } = result.tenGodsCount;

    if (dayElement === '목') level += 20; // 목은 스트레스에 민감
    if (dayElement === '화') level += 15; // 화는 감정 기복이 큼
    if (관성 >= 3) level += 10; // 관성 많으면 압박감
    if (비겁 >= 3) level += 5; // 경쟁 스트레스
    if (인성 >= 2) level -= 10; // 인성은 스트레스 완화

    return Math.min(Math.max(level, 30), 90);
  };

  const stressLevel = calculateStressLevel();

  // 체질별 스트레스 관리법
  const getStressManagement = () => {
    const management: Record<
      string,
      {
        stressType: string;
        symptoms: string[];
        relief: { method: string; desc: string; benefit: string }[];
        mentalCare: string[];
      }
    > = {
      목: {
        stressType: '신경성 스트레스',
        symptoms: [
          '불면증과 두통',
          '눈의 피로와 시력 저하',
          '소화불량',
          '근육 긴장과 통증',
          '감정 기복',
        ],
        relief: [
          {
            method: '자연 속 산책',
            desc: '숲이나 공원에서 30분 이상 걷기',
            benefit: '간 기능 회복, 스트레스 호르몬 감소',
          },
          {
            method: '요가와 명상',
            desc: '호흡에 집중하는 명상과 스트레칭',
            benefit: '신경 안정, 근육 이완',
          },
          {
            method: '예술 활동',
            desc: '그림, 음악, 글쓰기 등 창의적 활동',
            benefit: '감정 표출, 마음의 평화',
          },
          {
            method: '충분한 수면',
            desc: '23시 이전 취침으로 간 회복',
            benefit: '신체 리듬 회복, 피로 해소',
          },
        ],
        mentalCare: [
          '완벽주의를 내려놓고 여유 갖기',
          '감정을 억누르지 말고 표현하기',
          '규칙적인 생활 패턴 유지',
          '신뢰할 수 있는 사람과 대화',
        ],
      },
      화: {
        stressType: '감정성 스트레스',
        symptoms: [
          '심계항진과 가슴 두근거림',
          '불안감과 초조함',
          '불면증',
          '화를 잘 냄',
          '집중력 저하',
        ],
        relief: [
          {
            method: '호흡 명상',
            desc: '깊고 느린 복식호흡 (4-7-8 호흡법)',
            benefit: '심박수 안정, 마음의 평정',
          },
          {
            method: '수영',
            desc: '물에서 하는 운동으로 열 식히기',
            benefit: '체온 조절, 심신 안정',
          },
          {
            method: '차 마시기',
            desc: '녹차, 국화차 등 시원한 차',
            benefit: '열 내림, 마음 진정',
          },
          {
            method: '음악 감상',
            desc: '잔잔하고 편안한 클래식 음악',
            benefit: '감정 조절, 심리적 안정',
          },
        ],
        mentalCare: [
          '화가 날 때 6초 멈추기 (심호흡)',
          '긍정적인 생각으로 전환하기',
          '경쟁보다는 협력하는 마음',
          '흥분되는 상황 피하기',
        ],
      },
      토: {
        stressType: '걱정형 스트레스',
        symptoms: [
          '위장 장애 (위염, 소화불량)',
          '과도한 걱정과 불안',
          '식욕 변화 (과식 또는 식욕 부진)',
          '만성 피로',
          '우울감',
        ],
        relief: [
          {
            method: '규칙적인 운동',
            desc: '걷기, 등산 등 꾸준한 유산소 운동',
            benefit: '소화 촉진, 우울감 해소',
          },
          {
            method: '복부 마사지',
            desc: '배를 시계 방향으로 부드럽게 마사지',
            benefit: '소화 기능 개선, 긴장 완화',
          },
          {
            method: '일기 쓰기',
            desc: '하루 감사한 일 3가지 적기',
            benefit: '긍정 사고, 걱정 감소',
          },
          {
            method: '따뜻한 차',
            desc: '생강차, 대추차로 비위 따뜻하게',
            benefit: '소화 기능 강화, 마음 안정',
          },
        ],
        mentalCare: [
          '걱정을 글로 적어 정리하기',
          '해결 가능한 것부터 하나씩',
          '완벽을 추구하지 않기',
          '긍정적인 사람들과 시간 보내기',
        ],
      },
      금: {
        stressType: '억압형 스트레스',
        symptoms: [
          '호흡기 문제 (가슴 답답함)',
          '피부 트러블',
          '감정 억제로 인한 우울',
          '대장 문제 (변비)',
          '슬픔과 무기력',
        ],
        relief: [
          {
            method: '심호흡 운동',
            desc: '신선한 공기 마시며 깊은 호흡',
            benefit: '폐 기능 강화, 기분 전환',
          },
          {
            method: '산 등산',
            desc: '높은 곳에 올라 경치 보기',
            benefit: '시야 확장, 마음 해방',
          },
          {
            method: '감정 표출',
            desc: '울고 싶을 때 울기, 감정 일기',
            benefit: '억눌린 감정 해소',
          },
          {
            method: '아로마 테라피',
            desc: '라벤더, 유칼립투스 향기',
            benefit: '호흡 편안, 심리 안정',
          },
        ],
        mentalCare: [
          '감정을 억누르지 말고 표현',
          '완벽주의에서 벗어나기',
          '자신에게 관대하기',
          '취미 생활로 스트레스 해소',
        ],
      },
      수: {
        stressType: '불안형 스트레스',
        symptoms: [
          '공포와 불안감',
          '허리 통증',
          '이명',
          '빈뇨와 야뇨',
          '의욕 상실',
        ],
        relief: [
          {
            method: '온천, 사우나',
            desc: '따뜻한 물에 몸 담그기',
            benefit: '체온 상승, 긴장 완화',
          },
          {
            method: '명상과 기도',
            desc: '정신적 안정을 위한 명상',
            benefit: '불안 감소, 마음의 평화',
          },
          {
            method: '족욕',
            desc: '40도 물에 20분 족욕',
            benefit: '혈액순환, 신장 기능 회복',
          },
          {
            method: '독서',
            desc: '편안한 책 읽기',
            benefit: '집중력 향상, 불안 해소',
          },
        ],
        mentalCare: [
          '두려움을 마주하고 직면하기',
          '작은 성공 경험 쌓기',
          '자신감 회복을 위한 노력',
          '안정된 환경 만들기',
        ],
      },
    };

    return management[dayElement] || management['목'];
  };

  const stressManagement = getStressManagement();

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
        🧠 스트레스 & 멘탈 관리
      </h2>

      {/* 스트레스 수준 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-purple-400">스트레스 취약도</h3>
            <p className="text-slate-400 text-sm">{stressManagement.stressType}</p>
          </div>
        </div>

        <div className="flex items-center gap-6 mb-4">
          <div className="flex-1">
            <div className="flex justify-between text-sm text-slate-400 mb-2">
              <span>취약도</span>
              <span>{stressLevel}점</span>
            </div>
            <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${
                  stressLevel >= 70
                    ? 'bg-red-500'
                    : stressLevel >= 50
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                }`}
                initial={{ width: 0 }}
                whileInView={{ width: `${stressLevel}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
          <div className="text-center">
            {stressLevel >= 70 ? (
              <Frown className="w-12 h-12 text-red-400" />
            ) : stressLevel >= 50 ? (
              <Heart className="w-12 h-12 text-yellow-400" />
            ) : (
              <Smile className="w-12 h-12 text-green-400" />
            )}
          </div>
        </div>

        <div className="glass rounded-xl p-5">
          <h4 className="font-bold text-orange-400 mb-3">주요 스트레스 증상</h4>
          <div className="grid md:grid-cols-2 gap-3">
            {stressManagement.symptoms.map((symptom, index) => (
              <motion.div
                key={symptom}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-orange-400">•</span>
                <span className="text-slate-300 text-sm">{symptom}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 스트레스 해소법 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
            <Wind className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-green-400">체질 맞춤 스트레스 해소법</h3>
            <p className="text-slate-400 text-sm">당신에게 효과적인 방법들입니다</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {stressManagement.relief.map((relief, index) => (
            <motion.div
              key={relief.method}
              className="glass rounded-xl p-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="text-lg font-bold text-white mb-3">{relief.method}</h4>
              <p className="text-slate-300 text-sm mb-3">{relief.desc}</p>
              <div className="flex items-start gap-2 bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                <Sparkles className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-green-300 text-sm">{relief.benefit}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 멘탈 케어 */}
      <div className="glass rounded-2xl p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30">
        <h3 className="text-xl font-bold text-blue-400 mb-6">💭 멘탈 케어 가이드</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {stressManagement.mentalCare.map((care, index) => (
            <motion.div
              key={care}
              className="glass rounded-xl p-4 flex items-start gap-3"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-blue-400 font-bold">{index + 1}</span>
              </div>
              <p className="text-slate-300 text-sm mt-1">{care}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
          <p className="text-slate-300 text-sm leading-relaxed">
            💡 <strong className="text-cyan-400">Tip:</strong> 스트레스는 완전히 없앨 수 없지만,
            관리할 수 있습니다. 자신에게 맞는 방법을 찾아 꾸준히 실천하는 것이 중요합니다.
            필요하다면 전문가의 도움을 받는 것도 좋습니다.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
