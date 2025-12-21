'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Lightbulb, AlertCircle, CheckCircle, Target } from 'lucide-react';

interface HealthAdviceProps {
  result: SajuResult;
  name: string;
  healthScore: number;
}

export default function HealthAdvice({ result, name, healthScore }: HealthAdviceProps) {
  const dayElement = result.day.stem.element;

  // 종합 건강 조언
  const getComprehensiveAdvice = () => {
    const advice: Record<
      string,
      {
        priority: { title: string; desc: string }[];
        doList: string[];
        dontList: string[];
        emergency: string[];
      }
    > = {
      목: {
        priority: [
          {
            title: '스트레스 관리 최우선',
            desc: '목 체질의 가장 큰 적은 스트레스입니다. 마음의 평화가 건강의 시작입니다.',
          },
          {
            title: '규칙적인 수면',
            desc: '23시 이전 취침으로 간 재생 시간을 확보하세요. 수면이 곧 건강입니다.',
          },
          {
            title: '간 건강 관리',
            desc: '절주와 규칙적인 생활로 간을 보호하세요. 정기 검진도 잊지 마세요.',
          },
        ],
        doList: [
          '매일 30분 이상 산책하기',
          '신선한 채소와 과일 섭취',
          '충분한 수면 (7-8시간)',
          '명상이나 요가로 마음 안정',
          '정기적인 간 기능 검사',
          '취미 생활로 스트레스 해소',
        ],
        dontList: [
          '과도한 음주 (간에 치명적)',
          '야식과 불규칙한 식사',
          '과로와 수면 부족',
          '화를 억누르기 (감정 표현 중요)',
          '장시간 스크린 보기',
        ],
        emergency: [
          '심한 피로감이 지속될 때',
          '눈이 자주 충혈되거나 시력 저하',
          '소화불량이 반복될 때',
          '근육통이 심할 때',
        ],
      },
      화: {
        priority: [
          {
            title: '심장 건강 지키기',
            desc: '순환기 관리가 생명입니다. 과열되지 않도록 주의하세요.',
          },
          {
            title: '감정 조절',
            desc: '흥분과 분노를 다스리세요. 6초만 멈추면 달라집니다.',
          },
          {
            title: '충분한 수분',
            desc: '하루 2L 이상의 물로 체내 열을 조절하세요.',
          },
        ],
        doList: [
          '규칙적인 유산소 운동',
          '충분한 수분 섭취 (2L+)',
          '시원한 채소와 과일',
          '명상으로 마음 진정',
          '정기 혈압 체크',
          '충분한 휴식',
        ],
        dontList: [
          '과도한 흥분과 스트레스',
          '카페인 과다 섭취',
          '매운 음식 과다',
          '뜨거운 사우나 장시간',
          '수면 부족',
        ],
        emergency: [
          '가슴이 두근거리거나 답답할 때',
          '불면증이 심할 때',
          '혈압이 높게 나올 때',
          '얼굴이 자주 붉어질 때',
        ],
      },
      토: {
        priority: [
          {
            title: '소화 기능 최우선',
            desc: '비위 건강이 모든 건강의 기본입니다. 규칙적인 식사가 핵심입니다.',
          },
          {
            title: '체중 관리',
            desc: '적정 체중 유지가 장수의 비결입니다. 과식을 피하세요.',
          },
          {
            title: '걱정 줄이기',
            desc: '과도한 걱정이 소화 기능을 약화시킵니다. 긍정적 사고를 하세요.',
          },
        ],
        doList: [
          '규칙적인 식사 (하루 3끼)',
          '천천히 꼭꼭 씹기',
          '따뜻한 음식 섭취',
          '매일 가벼운 운동',
          '정기 위내시경 검사',
          '긍정적인 마음가짐',
        ],
        dontList: [
          '과식과 폭식 (절대 금지)',
          '차가운 음식',
          '불규칙한 식사',
          '과도한 걱정과 스트레스',
          '정크푸드',
        ],
        emergency: [
          '소화불량이 반복될 때',
          '속이 자주 쓰릴 때',
          '체중이 급격히 증가할 때',
          '식욕이 없을 때',
        ],
      },
      금: {
        priority: [
          {
            title: '호흡기 건강',
            desc: '폐 기능이 생명력의 핵심입니다. 깨끗한 공기가 중요합니다.',
          },
          {
            title: '보습 관리',
            desc: '건조함이 최대의 적입니다. 실내 습도를 유지하세요.',
          },
          {
            title: '감정 표출',
            desc: '슬픔을 억누르지 마세요. 감정 표현이 건강의 시작입니다.',
          },
        ],
        doList: [
          '매일 심호흡 운동',
          '공기 좋은 곳에서 운동',
          '실내 습도 50-60% 유지',
          '충분한 수분 섭취',
          '정기 폐 기능 검사',
          '감정을 자유롭게 표현',
        ],
        dontList: [
          '흡연 (절대 금지)',
          '미세먼지 환경 노출',
          '건조한 환경',
          '감정 억압',
          '급격한 온도 변화',
        ],
        emergency: [
          '숨이 자주 가쁠 때',
          '기침이 계속될 때',
          '피부가 심하게 건조할 때',
          '알레르기 증상이 심할 때',
        ],
      },
      수: {
        priority: [
          {
            title: '신장 건강 지키기',
            desc: '신장이 생명력의 근원입니다. 과로하지 마세요.',
          },
          {
            title: '체온 유지',
            desc: '따뜻하게 지내는 것이 건강의 비결입니다. 특히 허리와 발을 보온하세요.',
          },
          {
            title: '충분한 휴식',
            desc: '8시간 이상 수면으로 신장 기능을 회복하세요.',
          },
        ],
        doList: [
          '충분한 수면 (8시간+)',
          '따뜻한 물 자주 마시기',
          '허리와 발 보온',
          '규칙적인 운동',
          '정기 신장 기능 검사',
          '긍정적이고 자신감 있게',
        ],
        dontList: [
          '과도한 염분 섭취',
          '찬 음식과 환경',
          '과로와 수면 부족',
          '장시간 서 있기',
          '두려움에 압도되기',
        ],
        emergency: [
          '허리 통증이 심할 때',
          '소변 이상 (빈뇨, 혈뇨)',
          '부종이 심할 때',
          '이명이 지속될 때',
        ],
      },
    };

    return advice[dayElement] || advice['목'];
  };

  const comprehensiveAdvice = getComprehensiveAdvice();

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
        💡 종합 건강 조언
      </h2>

      {/* 건강 점수 요약 */}
      <div className="glass rounded-2xl p-6 mb-8 text-center">
        <p className="text-slate-300 text-lg mb-4">
          {name}님의 건강 점수: <span className="text-3xl font-bold text-green-400">{healthScore}</span>점
        </p>
        <p className="text-slate-400">
          {healthScore >= 80
            ? '매우 건강한 체질입니다! 현재의 생활습관을 잘 유지하세요.'
            : healthScore >= 65
            ? '건강한 편입니다. 아래 조언을 참고하여 더욱 건강해지세요.'
            : healthScore >= 50
            ? '평균 수준입니다. 생활습관 개선으로 더 건강해질 수 있습니다.'
            : '건강 관리가 필요합니다. 아래 조언을 실천하고 정기 검진을 받으세요.'}
        </p>
      </div>

      {/* 우선순위 관리 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-red-400">최우선 관리 사항</h3>
            <p className="text-slate-400 text-sm">이것만은 꼭 지키세요</p>
          </div>
        </div>

        <div className="space-y-4">
          {comprehensiveAdvice.priority.map((item, index) => (
            <motion.div
              key={item.title}
              className="glass rounded-xl p-5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-red-400 font-bold">{index + 1}</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-slate-300 text-sm">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 해야 할 것 / 하지 말아야 할 것 */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-green-400">꼭 실천하세요</h3>
          </div>

          <ul className="space-y-3">
            {comprehensiveAdvice.doList.map((item, index) => (
              <motion.li
                key={item}
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300 text-sm">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="glass rounded-2xl p-6 bg-red-500/10 border border-red-500/30">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-red-400">피해야 합니다</h3>
          </div>

          <ul className="space-y-3">
            {comprehensiveAdvice.dontList.map((item, index) => (
              <motion.li
                key={item}
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300 text-sm">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* 응급 상황 */}
      <div className="glass rounded-2xl p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-orange-400">이럴 때는 병원에 가세요</h3>
            <p className="text-slate-400 text-sm">조기 발견이 중요합니다</p>
          </div>
        </div>

        <ul className="grid md:grid-cols-2 gap-3">
          {comprehensiveAdvice.emergency.map((symptom, index) => (
            <motion.li
              key={symptom}
              className="flex items-start gap-2 bg-slate-800/50 rounded-lg p-3"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <span className="text-orange-400 mt-0.5">⚠️</span>
              <span className="text-slate-300 text-sm">{symptom}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* 마무리 조언 */}
      <div className="glass rounded-2xl p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30">
        <div className="flex items-center gap-3 mb-4">
          <Lightbulb className="w-8 h-8 text-cyan-400" />
          <h3 className="text-xl font-bold text-cyan-400">마지막 당부</h3>
        </div>

        <div className="space-y-4 text-slate-300 leading-relaxed">
          <p>
            <strong className="text-white">{name}님,</strong> 건강은 하루아침에 만들어지지 않습니다.
            작은 습관들이 모여 큰 건강을 만듭니다.
          </p>
          <p>
            오늘부터 하나씩 실천해보세요. 완벽하지 않아도 괜찮습니다. 꾸준함이 완벽함을 이깁니다.
          </p>
          <p>
            정기 검진을 통해 몸 상태를 확인하고, 이상 증상이 있을 때는 전문의와 상담하세요.
            예방이 최선의 치료입니다.
          </p>
          <p className="text-green-400 font-semibold">
            💚 {name}님의 건강한 100세 인생을 응원합니다!
          </p>
        </div>
      </div>
    </motion.div>
  );
}
