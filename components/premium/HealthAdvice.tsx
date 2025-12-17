'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Heart, Activity, Apple, Droplets } from 'lucide-react';

interface HealthAdviceProps {
  result: SajuResult;
}

export default function HealthAdvice({ result }: HealthAdviceProps) {
  // 오행별 신체 부위 및 건강 정보
  const elementHealth = {
    목: {
      organs: ['간', '담', '눈', '신경계', '근육'],
      excessSymptoms: ['화를 잘 냄', '두통', '눈 피로', '근육 경직', '스트레스'],
      deficiencySymptoms: ['피로', '우울', '눈 건조', '근력 약화', '결단력 부족'],
      goodFoods: ['녹색 채소', '시금치', '브로콜리', '오이', '녹차'],
      avoidFoods: ['기름진 음식', '술', '매운 음식'],
      exercise: '스트레칭, 요가, 산책 등 유연성 운동',
      color: 'from-green-500 to-emerald-600',
      icon: '🌳',
    },
    화: {
      organs: ['심장', '소장', '혈관', '혀', '정신'],
      excessSymptoms: ['불면증', '가슴 두근거림', '혈압 상승', '조급함', '흥분'],
      deficiencySymptoms: ['추위 타기', '소화 불량', '의욕 저하', '무기력', '혈액순환 장애'],
      goodFoods: ['붉은 과일', '토마토', '대추', '고구마', '당근'],
      avoidFoods: ['카페인', '자극적인 음식', '과도한 육류'],
      exercise: '유산소 운동, 조깅, 수영 등 심폐 기능 강화',
      color: 'from-red-500 to-orange-600',
      icon: '🔥',
    },
    토: {
      organs: ['위', '비장', '췌장', '입', '살'],
      excessSymptoms: ['소화 불량', '비만', '당뇨', '과식', '나태함'],
      deficiencySymptoms: ['식욕 부진', '마른 체형', '위장 허약', '영양 불균형', '빈혈'],
      goodFoods: ['곡물', '현미', '고구마', '호박', '바나나', '견과류'],
      avoidFoods: ['과식', '단 음식', '밀가루 과다'],
      exercise: '걷기, 등산, 가벼운 근력 운동',
      color: 'from-yellow-500 to-amber-600',
      icon: '⛰️',
    },
    금: {
      organs: ['폐', '대장', '피부', '코', '호흡기'],
      excessSymptoms: ['변비', '피부 건조', '기관지 문제', '냉정함', '고집'],
      deficiencySymptoms: ['감기 잦음', '호흡기 약함', '피부 민감', '알레르기', '면역력 저하'],
      goodFoods: ['흰색 음식', '무', '배', '도라지', '은행', '마늘'],
      avoidFoods: ['찬 음식', '날것', '기름진 음식'],
      exercise: '호흡 운동, 명상, 가벼운 산책',
      color: 'from-slate-400 to-gray-600',
      icon: '💎',
    },
    수: {
      organs: ['신장', '방광', '뼈', '귀', '생식기'],
      excessSymptoms: ['부종', '냉증', '요통', '관절 통증', '공포심'],
      deficiencySymptoms: ['갈증', '피로', '뼈 약함', '귀 먹먹함', '탈모', '노화'],
      goodFoods: ['검은콩', '흑미', '해조류', '검은깨', '미역', '생수'],
      avoidFoods: ['짠 음식', '차가운 음료', '술'],
      exercise: '수영, 아쿠아로빅, 스쿼트 등 하체 운동',
      color: 'from-blue-500 to-cyan-600',
      icon: '💧',
    },
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
        ❤️ 오행 건강 관리법
      </h2>

      <p className="text-center text-slate-300 mb-12 leading-relaxed">
        오행의 균형이 건강을 좌우합니다. 과다하거나 부족한 오행을 조절하면 건강이 좋아집니다.
        <br />
        당신의 오행 배치에 맞는 맞춤형 건강 관리법을 알려드립니다.
      </p>

      {/* 과다한 오행 */}
      {result.elementBalance.excess.length > 0 && (
        <div className="mb-12">
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-red-400">
              과다한 오행 - 조절이 필요합니다
            </h3>
          </motion.div>

          <div className="space-y-6">
            {result.elementBalance.excess.map((elem, index) => {
              const health = elementHealth[elem as keyof typeof elementHealth];

              return (
                <motion.div
                  key={elem}
                  className="glass rounded-2xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${health.color} rounded-xl flex items-center justify-center text-2xl`}
                    >
                      {health.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-slate-100 mb-2">
                        {elem} 오행 과다
                      </h4>
                      <p className="text-sm text-slate-400 mb-3">
                        주의 장기: {health.organs.join(', ')}
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                      <h5 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                        <Activity className="w-4 h-4" />
                        주의 증상
                      </h5>
                      <ul className="space-y-1">
                        {health.excessSymptoms.map((symptom, i) => (
                          <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                            <span className="text-red-400 flex-shrink-0">•</span>
                            {symptom}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                      <h5 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
                        <Apple className="w-4 h-4" />
                        조절 방법
                      </h5>
                      <p className="text-slate-300 text-sm mb-2">
                        <strong>피할 음식:</strong> {health.avoidFoods.join(', ')}
                      </p>
                      <p className="text-slate-300 text-sm">
                        <strong>추천 운동:</strong> {health.exercise}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* 부족한 오행 */}
      {result.elementBalance.deficiency.length > 0 && (
        <div className="mb-12">
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-blue-400">
              부족한 오행 - 보충이 필요합니다
            </h3>
          </motion.div>

          <div className="space-y-6">
            {result.elementBalance.deficiency.map((elem, index) => {
              const health = elementHealth[elem as keyof typeof elementHealth];

              return (
                <motion.div
                  key={elem}
                  className="glass rounded-2xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${health.color} rounded-xl flex items-center justify-center text-2xl`}
                    >
                      {health.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-slate-100 mb-2">
                        {elem} 오행 부족
                      </h4>
                      <p className="text-sm text-slate-400 mb-3">
                        취약 장기: {health.organs.join(', ')}
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                      <h5 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                        <Activity className="w-4 h-4" />
                        나타날 수 있는 증상
                      </h5>
                      <ul className="space-y-1">
                        {health.deficiencySymptoms.map((symptom, i) => (
                          <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                            <span className="text-blue-400 flex-shrink-0">•</span>
                            {symptom}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                      <h5 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                        <Apple className="w-4 h-4" />
                        보충 방법
                      </h5>
                      <p className="text-slate-300 text-sm mb-2">
                        <strong>좋은 음식:</strong> {health.goodFoods.join(', ')}
                      </p>
                      <p className="text-slate-300 text-sm">
                        <strong>추천 운동:</strong> {health.exercise}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* 균형잡힌 경우 */}
      {result.elementBalance.excess.length === 0 &&
        result.elementBalance.deficiency.length === 0 && (
          <div className="glass rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4">✨</div>
            <h3 className="text-xl font-bold text-green-400 mb-3">
              완벽한 오행 균형
            </h3>
            <p className="text-slate-300 leading-relaxed">
              당신의 오행은 잘 균형 잡혀 있습니다! 이는 매우 드문 행운입니다.
              <br />
              현재 상태를 유지하기 위해 규칙적인 생활 습관과 균형 잡힌 식사를 유지하세요.
              <br />
              정기적인 건강검진으로 건강을 관리하면 장수하실 수 있습니다.
            </p>
          </div>
        )}

      {/* 종합 건강 조언 */}
      <div className="mt-12 glass rounded-2xl p-6 border border-purple-400/30">
        <h4 className="text-lg font-bold text-purple-400 mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5" />
          종합 건강 관리 조언
        </h4>
        <div className="space-y-3 text-slate-300 text-sm">
          <p className="flex items-start gap-2">
            <span className="text-purple-400 flex-shrink-0">•</span>
            <span>
              오행 음식 요법은 <strong>3개월 이상</strong> 꾸준히 실천해야 효과가
              나타납니다. 즉효를 기대하지 말고 생활 습관으로 만드세요.
            </span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-purple-400 flex-shrink-0">•</span>
            <span>
              과다한 오행의 색깔은 피하고, 부족한 오행의 색깔을 옷이나 소품으로
              활용하세요. 색깔 치료도 효과가 있습니다.
            </span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-purple-400 flex-shrink-0">•</span>
            <span>
              대운이나 세운에서 약한 오행이 들어오는 시기에는 해당 장기 검진을 더
              자주 받으세요.
            </span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-purple-400 flex-shrink-0">•</span>
            <span>
              신강(힘이 강함) 사주는 <strong>활동적인 운동</strong>이 필요하고,
              신약(힘이 약함) 사주는 <strong>휴식과 영양</strong>이 우선입니다.
            </span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-purple-400 flex-shrink-0">•</span>
            <span>
              오행 요법은 참고용입니다. 심각한 건강 문제는 반드시{' '}
              <strong>전문 의료기관</strong>에서 진료받으세요.
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
