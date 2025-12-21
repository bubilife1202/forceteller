'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Dumbbell, Bike, Wind, Timer, Zap } from 'lucide-react';

interface HealthExerciseProps {
  result: SajuResult;
  name: string;
}

export default function HealthExercise({ result, name }: HealthExerciseProps) {
  const dayElement = result.day.stem.element;

  // 체질별 운동 가이드
  const getExerciseGuide = () => {
    const guide: Record<
      string,
      {
        recommended: { name: string; intensity: string; duration: string; benefit: string }[];
        avoid: string[];
        bestTime: string[];
        tips: string[];
      }
    > = {
      목: {
        recommended: [
          {
            name: '요가 & 필라테스',
            intensity: '중',
            duration: '40-60분',
            benefit: '유연성 증진, 스트레스 해소, 간 기능 활성화',
          },
          {
            name: '조깅 & 러닝',
            intensity: '중-상',
            duration: '30-40분',
            benefit: '간 해독, 혈액순환, 스트레스 발산',
          },
          {
            name: '수영',
            intensity: '중',
            duration: '30-50분',
            benefit: '전신 근육 발달, 관절 부담 적음',
          },
          {
            name: '스트레칭',
            intensity: '하',
            duration: '15-20분',
            benefit: '근육과 인대 이완, 긴장 해소',
          },
        ],
        avoid: [
          '과도한 웨이트 트레이닝',
          '격투기 등 충격 강한 운동',
          '무리한 운동으로 인한 부상',
        ],
        bestTime: ['아침 6-8시 (간 기능 활성화)', '저녁 6-8시 (스트레스 해소)'],
        tips: [
          '운동 전후 충분한 스트레칭 필수',
          '과로하지 않는 선에서 규칙적으로',
          '야외 운동으로 스트레스 해소',
          '호흡에 집중하는 운동이 좋음',
        ],
      },
      화: {
        recommended: [
          {
            name: '걷기 & 산책',
            intensity: '하-중',
            duration: '30-60분',
            benefit: '심장 부담 적음, 마음 안정',
          },
          {
            name: '수영',
            intensity: '중',
            duration: '30-45분',
            benefit: '심장 강화, 체온 조절',
          },
          {
            name: '자전거',
            intensity: '중',
            duration: '30-50분',
            benefit: '유산소 운동, 순환 개선',
          },
          {
            name: '명상 & 호흡',
            intensity: '하',
            duration: '20-30분',
            benefit: '심신 안정, 스트레스 감소',
          },
        ],
        avoid: [
          '고강도 인터벌 트레이닝',
          '경쟁적이고 흥분되는 운동',
          '더운 환경에서의 운동',
        ],
        bestTime: ['아침 일찍 (시원할 때)', '저녁 늦게 (해 지고 나서)'],
        tips: [
          '충분한 수분 섭취 필수',
          '과열되지 않도록 주의',
          '편안한 페이스로 운동',
          '실내 시원한 곳에서 운동',
        ],
      },
      토: {
        recommended: [
          {
            name: '걷기 & 등산',
            intensity: '중',
            duration: '40-60분',
            benefit: '소화 촉진, 체력 증진',
          },
          {
            name: '웨이트 트레이닝',
            intensity: '중-상',
            duration: '40-50분',
            benefit: '근육량 증가, 대사 활성화',
          },
          {
            name: '댄스 & 에어로빅',
            intensity: '중',
            duration: '30-45분',
            benefit: '즐거움, 스트레스 해소',
          },
          {
            name: '태극권',
            intensity: '하-중',
            duration: '30-40분',
            benefit: '균형 감각, 소화 기능 개선',
          },
        ],
        avoid: [
          '식사 직후 운동',
          '지나치게 격렬한 운동',
          '공복 운동',
        ],
        bestTime: ['오전 10-12시 (소화 기능 좋을 때)', '오후 3-5시 (간식 후)'],
        tips: [
          '식사 2시간 후 운동',
          '꾸준하고 규칙적인 운동',
          '과식 후에는 가벼운 산책만',
          '즐거운 마음으로 운동',
        ],
      },
      금: {
        recommended: [
          {
            name: '호흡 운동',
            intensity: '하',
            duration: '15-30분',
            benefit: '폐활량 증가, 기운 순환',
          },
          {
            name: '조깅 & 달리기',
            intensity: '중-상',
            duration: '30-45분',
            benefit: '심폐 기능 강화',
          },
          {
            name: '등산',
            intensity: '중-상',
            duration: '60-120분',
            benefit: '호흡기 단련, 자연 치유',
          },
          {
            name: '태권도 & 무술',
            intensity: '중-상',
            duration: '40-60분',
            benefit: '폐 기능, 정신력 강화',
          },
        ],
        avoid: [
          '미세먼지 많은 날 야외 운동',
          '담배 연기 있는 곳',
          '건조한 환경에서 운동',
        ],
        bestTime: ['아침 일찍 (공기 맑을 때)', '오후 (햇빛 있을 때)'],
        tips: [
          '공기 좋은 곳에서 운동',
          '호흡에 집중하며 운동',
          '마스크 착용 고려',
          '충분한 수분 섭취',
        ],
      },
      수: {
        recommended: [
          {
            name: '수영',
            intensity: '중',
            duration: '30-50분',
            benefit: '전신 운동, 관절 보호',
          },
          {
            name: '요가 & 명상',
            intensity: '하-중',
            duration: '40-60분',
            benefit: '집중력, 정신 안정',
          },
          {
            name: '걷기 & 산책',
            intensity: '하-중',
            duration: '30-60분',
            benefit: '무릎 건강, 지구력',
          },
          {
            name: '자전거',
            intensity: '중',
            duration: '30-50분',
            benefit: '하체 강화, 관절 부담 적음',
          },
        ],
        avoid: [
          '과도한 고강도 운동',
          '장시간 서있는 운동',
          '추운 환경에서의 운동',
        ],
        bestTime: ['오전 10-12시 (따뜻할 때)', '오후 2-4시 (해가 있을 때)'],
        tips: [
          '따뜻하게 준비운동',
          '허리와 무릎 보호 중요',
          '과로하지 말고 적당히',
          '찬 바닥 피하기',
        ],
      },
    };

    return guide[dayElement] || guide['목'];
  };

  const exerciseGuide = getExerciseGuide();

  // 강도별 색상
  const getIntensityColor = (intensity: string) => {
    if (intensity.includes('상')) return 'text-red-400 bg-red-500/20';
    if (intensity.includes('중')) return 'text-yellow-400 bg-yellow-500/20';
    return 'text-green-400 bg-green-500/20';
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
        💪 체질별 맞춤 운동
      </h2>

      {/* 추천 운동 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
            <Dumbbell className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-blue-400">추천 운동 프로그램</h3>
            <p className="text-slate-400 text-sm">{name}님에게 최적화된 운동</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {exerciseGuide.recommended.map((exercise, index) => (
            <motion.div
              key={exercise.name}
              className="glass rounded-xl p-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between mb-4">
                <h4 className="text-lg font-bold text-white">{exercise.name}</h4>
                <span className={`px-3 py-1 rounded-full text-sm ${getIntensityColor(exercise.intensity)}`}>
                  {exercise.intensity}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Timer className="w-4 h-4 text-cyan-400" />
                  <span className="text-slate-300 text-sm">{exercise.duration}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300 text-sm">{exercise.benefit}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 피해야 할 운동 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-red-400 mb-4">⚠️ 주의해야 할 운동</h3>
        <div className="grid md:grid-cols-3 gap-3">
          {exerciseGuide.avoid.map((avoid, index) => (
            <motion.div
              key={avoid}
              className="bg-red-500/10 border border-red-500/30 rounded-lg p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <p className="text-red-300 text-sm text-center">{avoid}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 최적 운동 시간 */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
              <Wind className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-orange-400">최적 운동 시간</h3>
          </div>
          <div className="space-y-3">
            {exerciseGuide.bestTime.map((time, index) => (
              <motion.div
                key={time}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-orange-400">⏰</span>
                <span className="text-slate-300 text-sm">{time}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <Bike className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-purple-400">운동 팁</h3>
          </div>
          <div className="space-y-2">
            {exerciseGuide.tips.map((tip, index) => (
              <motion.div
                key={tip}
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-purple-400 mt-0.5">•</span>
                <span className="text-slate-300 text-sm">{tip}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 주간 운동 플랜 */}
      <div className="glass rounded-2xl p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30">
        <h3 className="text-xl font-bold text-green-400 mb-6">📅 주간 운동 플랜</h3>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['월', '화', '수', '목', '금', '토', '일'].map((day, index) => (
            <div key={day} className="text-center">
              <div className="text-slate-400 text-xs mb-2">{day}</div>
              <div className="bg-slate-800/50 rounded-lg p-2">
                <div className="text-white text-xs font-semibold">
                  {index < 5
                    ? exerciseGuide.recommended[index % exerciseGuide.recommended.length].name.split(' ')[0]
                    : index === 5
                    ? '가벼운 운동'
                    : '휴식'}
                </div>
                <div className="text-slate-400 text-xs mt-1">
                  {index < 5 ? '30-60분' : index === 5 ? '20-30분' : '-'}
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-slate-300 text-sm text-center">
          💡 주 5회 규칙적인 운동이 건강 유지의 핵심입니다
        </p>
      </div>
    </motion.div>
  );
}
