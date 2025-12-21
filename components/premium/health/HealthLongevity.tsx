'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Award, TrendingUp, Star, Heart } from 'lucide-react';

interface HealthLongevityProps {
  result: SajuResult;
  name: string;
}

export default function HealthLongevity({ result, name }: HealthLongevityProps) {
  const dayElement = result.day.stem.element;

  // 장수 점수 계산
  const calculateLongevityScore = () => {
    let score = 70;

    // 음양 균형
    const yinYang = result.yinYangBalance;
    const yinYangRatio = yinYang.yang;
    if (yinYangRatio >= 40 && yinYangRatio <= 60) score += 15;
    else if (yinYangRatio >= 30 && yinYangRatio <= 70) score += 5;

    // 오행 균형
    const elements = Object.values(result.elements);
    const max = Math.max(...elements);
    const min = Math.min(...elements);
    if (max - min < 30) score += 15; // 균형 잡힘
    else if (max - min < 50) score += 5;

    // 십신 균형
    const { 재성, 관성, 인성, 식상, 비겁 } = result.tenGodsCount;
    const hasBalance = [재성, 관성, 인성, 식상, 비겁].filter(v => v > 0).length >= 3;
    if (hasBalance) score += 10;

    return Math.min(Math.max(score, 50), 100);
  };

  const longevityScore = calculateLongevityScore();

  // 장수 비결
  const getLongevitySecrets = () => {
    const secrets: Record<
      string,
      {
        keys: { title: string; desc: string }[];
        lifestyle: string[];
        mindset: string[];
        prevention: string[];
      }
    > = {
      목: {
        keys: [
          {
            title: '스트레스 관리',
            desc: '간 건강이 장수의 핵심. 마음의 평화를 유지하세요.',
          },
          {
            title: '규칙적인 생활',
            desc: '일정한 수면과 식사 시간이 생명력을 길게 합니다.',
          },
          {
            title: '자연과의 교감',
            desc: '숲과 자연에서 시간을 보내며 기운을 보충하세요.',
          },
        ],
        lifestyle: [
          '매일 30분 이상 걷기나 산책',
          '23시 이전 취침으로 간 재생',
          '신선한 채소와 과일 섭취',
          '명상이나 요가로 마음 안정',
          '취미 생활로 스트레스 해소',
        ],
        mindset: [
          '완벽주의를 내려놓기',
          '감정을 억누르지 말고 표현',
          '긍정적 사고 습관',
          '작은 일에 감사하기',
        ],
        prevention: [
          '간 기능 검사 (연 1회)',
          '눈 건강 관리',
          '과음과 과로 피하기',
        ],
      },
      화: {
        keys: [
          {
            title: '심장 건강',
            desc: '순환기 관리가 장수의 열쇠입니다.',
          },
          {
            title: '감정 조절',
            desc: '흥분과 분노를 다스리고 평온을 유지하세요.',
          },
          {
            title: '적절한 운동',
            desc: '과하지 않게, 꾸준히 운동하세요.',
          },
        ],
        lifestyle: [
          '하루 30분 중강도 운동',
          '충분한 수분 섭취 (2L 이상)',
          '과열 피하고 체온 조절',
          '시원한 채소와 과일 섭취',
          '명상으로 마음 진정',
        ],
        mindset: [
          '화를 내기 전 6초 멈추기',
          '경쟁보다 협력하는 마음',
          '여유롭게 살기',
          '용서하고 놓아주기',
        ],
        prevention: [
          '혈압 체크 (정기적)',
          '심전도 검사',
          '스트레스 관리',
        ],
      },
      토: {
        keys: [
          {
            title: '소화 기능',
            desc: '비위 건강이 곧 생명력입니다.',
          },
          {
            title: '체중 관리',
            desc: '적정 체중 유지가 장수의 비결입니다.',
          },
          {
            title: '마음의 평화',
            desc: '걱정을 줄이고 편안한 마음으로.',
          },
        ],
        lifestyle: [
          '규칙적인 식사 (하루 3끼)',
          '천천히 꼭꼭 씹어 먹기',
          '과식 피하고 8부만 먹기',
          '따뜻한 음식 위주',
          '매일 가벼운 운동',
        ],
        mindset: [
          '걱정을 내려놓기',
          '현재에 집중하기',
          '즐거운 마음으로 식사',
          '감사하는 습관',
        ],
        prevention: [
          '위내시경 (정기적)',
          '혈당 검사',
          '대사증후군 관리',
        ],
      },
      금: {
        keys: [
          {
            title: '호흡기 건강',
            desc: '폐 기능 유지가 장수의 핵심입니다.',
          },
          {
            title: '깨끗한 공기',
            desc: '좋은 환경에서 생활하세요.',
          },
          {
            title: '감정 표출',
            desc: '슬픔을 억누르지 말고 표현하세요.',
          },
        ],
        lifestyle: [
          '매일 호흡 운동과 명상',
          '공기 좋은 곳에서 운동',
          '실내 습도 50-60% 유지',
          '금연 필수',
          '신선한 공기 마시기',
        ],
        mindset: [
          '완벽주의 내려놓기',
          '감정을 자유롭게 표현',
          '자신에게 관대하기',
          '즐거운 활동 찾기',
        ],
        prevention: [
          '폐 기능 검사',
          '흉부 X-ray',
          '대장 내시경',
        ],
      },
      수: {
        keys: [
          {
            title: '신장 건강',
            desc: '신장 기능이 생명력의 근원입니다.',
          },
          {
            title: '체온 유지',
            desc: '따뜻하게 지내는 것이 중요합니다.',
          },
          {
            title: '지혜로운 삶',
            desc: '무리하지 않고 현명하게 살아가세요.',
          },
        ],
        lifestyle: [
          '충분한 수면 (8시간 이상)',
          '따뜻한 물 자주 마시기',
          '허리와 발 보온',
          '적당한 소금 섭취',
          '정기적인 운동',
        ],
        mindset: [
          '두려움을 극복하기',
          '자신감 갖기',
          '차분하고 침착하게',
          '지혜롭게 판단하기',
        ],
        prevention: [
          '신장 기능 검사',
          '소변 검사',
          '골밀도 검사',
        ],
      },
    };

    return secrets[dayElement] || secrets['목'];
  };

  const longevitySecrets = getLongevitySecrets();

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
        🌟 장수 비결
      </h2>

      {/* 장수 점수 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-amber-400">장수 가능성</h3>
            <p className="text-slate-400 text-sm">건강한 생활습관으로 더 오래 사세요</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex-1">
            <div className="flex justify-between text-sm text-slate-400 mb-2">
              <span>장수 점수</span>
              <span>{longevityScore}점</span>
            </div>
            <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${
                  longevityScore >= 80
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                    : longevityScore >= 65
                    ? 'bg-gradient-to-r from-blue-400 to-cyan-500'
                    : 'bg-gradient-to-r from-yellow-400 to-amber-500'
                }`}
                initial={{ width: 0 }}
                whileInView={{ width: `${longevityScore}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
              />
            </div>
          </div>
          <div className="text-center">
            <Star className="w-12 h-12 text-amber-400 mb-1" />
            <p className="text-slate-400 text-sm">
              {longevityScore >= 80
                ? '매우 높음'
                : longevityScore >= 65
                ? '높음'
                : '보통'}
            </p>
          </div>
        </div>
      </div>

      {/* 장수의 3대 핵심 */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {longevitySecrets.keys.map((key, index) => (
          <motion.div
            key={key.title}
            className="glass rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-lg font-bold text-green-400 text-center mb-2">{key.title}</h4>
            <p className="text-slate-300 text-sm text-center leading-relaxed">{key.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* 장수 생활 습관 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-blue-400 mb-6">💪 장수 생활 습관</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {longevitySecrets.lifestyle.map((habit, index) => (
            <motion.div
              key={habit}
              className="flex items-start gap-3 glass rounded-lg p-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-400 text-xs font-bold">{index + 1}</span>
              </div>
              <span className="text-slate-300 text-sm">{habit}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 장수 마인드셋 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-purple-400 mb-6 flex items-center gap-2">
          <Heart className="w-6 h-6" />
          장수 마인드셋
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {longevitySecrets.mindset.map((mind, index) => (
            <motion.div
              key={mind}
              className="flex items-center gap-3 bg-purple-500/10 border border-purple-500/30 rounded-lg p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="text-purple-400 text-xl">💭</span>
              <span className="text-slate-300 text-sm">{mind}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 질병 예방 */}
      <div className="glass rounded-2xl p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30">
        <h3 className="text-xl font-bold text-cyan-400 mb-4">🏥 질병 예방 관리</h3>
        <ul className="space-y-2">
          {longevitySecrets.prevention.map((prev, index) => (
            <motion.li
              key={prev}
              className="flex items-center gap-2 text-slate-300"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="text-cyan-400">✓</span>
              <span className="text-sm">{prev}</span>
            </motion.li>
          ))}
        </ul>
        <p className="text-slate-300 text-sm mt-6 leading-relaxed">
          💡 <strong className="text-cyan-400">장수의 비결:</strong> 건강한 생활습관 70% + 긍정적
          마음가짐 20% + 정기 검진 10% = 100년 인생! 지금부터 실천하세요.
        </p>
      </div>
    </motion.div>
  );
}
