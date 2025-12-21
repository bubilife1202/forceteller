'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Heart, Activity, Shield, AlertTriangle } from 'lucide-react';

interface ChildrenHealthProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function ChildrenHealth({ result, name }: ChildrenHealthProps) {
  const dayElement = result.day.stem.element;
  const { 식상, 인성, 관성 } = result.tenGodsCount;

  // 자녀 건강운 점수
  const getHealthScore = () => {
    let score = 70;

    // 일간별 건강 기운
    if (dayElement === '목') score += 10; // 생명력
    if (dayElement === '화') score += 5; // 활력
    if (dayElement === '토') score += 15; // 안정
    if (dayElement === '금') score += 8; // 면역
    if (dayElement === '수') score += 12; // 순환

    // 인성 (보호력)
    if (인성 >= 2) score += 10;

    // 식상 균형
    if (식상 >= 2 && 식상 <= 3) score += 5;
    if (식상 >= 4) score -= 5; // 과다

    return Math.min(Math.max(score, 50), 100);
  };

  const healthScore = getHealthScore();

  const getHealthGrade = () => {
    if (healthScore >= 85) return { text: '매우 건강', color: 'text-green-400', icon: '💚' };
    if (healthScore >= 70) return { text: '건강', color: 'text-blue-400', icon: '💙' };
    if (healthScore >= 60) return { text: '보통', color: 'text-yellow-400', icon: '💛' };
    return { text: '주의 필요', color: 'text-orange-400', icon: '🧡' };
  };

  const grade = getHealthGrade();

  // 오행별 건강 특징
  const getHealthCharacteristics = () => {
    switch (dayElement) {
      case '목':
        return {
          strength: '성장 발달이 빠르고 생명력이 강합니다. 활동적이고 회복력이 좋습니다.',
          weakness: '간, 담, 눈 계통 주의. 과도한 활동으로 인한 부상 조심.',
          advice: '충분한 수면과 영양 섭취가 중요합니다. 야외 활동을 권장합니다.',
        };
      case '화':
        return {
          strength: '활력이 넘치고 에너지가 강합니다. 밝고 긍정적인 기질.',
          weakness: '심장, 혈액 순환, 피부 계통 주의. 과열 주의.',
          advice: '흥분을 가라앉히는 활동이 좋습니다. 규칙적인 생활 리듬 유지.',
        };
      case '토':
        return {
          strength: '안정적이고 튼튼한 체질입니다. 소화 기능이 좋고 면역력이 강합니다.',
          weakness: '비장, 위장 계통 주의. 과식이나 편식 조심.',
          advice: '균형 잡힌 식단이 중요합니다. 꾸준한 운동으로 체력 관리.',
        };
      case '금':
        return {
          strength: '피부가 맑고 뼈가 튼튼합니다. 체계적인 건강 관리에 유리.',
          weakness: '폐, 호흡기, 피부 계통 주의. 건조함 주의.',
          advice: '호흡기 질환 예방이 중요합니다. 청결한 환경 유지.',
        };
      case '수':
        return {
          strength: '신진대사가 활발하고 적응력이 좋습니다. 유연한 체질.',
          weakness: '신장, 방광, 귀 계통 주의. 냉증 주의.',
          advice: '보온에 신경 쓰세요. 수분 섭취와 따뜻한 환경 유지.',
        };
      default:
        return {
          strength: '균형 잡힌 건강',
          weakness: '전반적인 주의',
          advice: '규칙적인 생활',
        };
    }
  };

  const characteristics = getHealthCharacteristics();

  // 나이대별 건강 관리
  const ageGroups = [
    {
      age: '0-3세',
      focus: '면역력 형성',
      tips: ['모유 수유', '예방 접종', '청결 관리', '충분한 수면'],
      icon: '👶',
    },
    {
      age: '4-7세',
      focus: '성장 발달',
      tips: ['균형 잡힌 영양', '야외 활동', '사회성 발달', '기본 습관'],
      icon: '🧒',
    },
    {
      age: '8-13세',
      focus: '체력 증진',
      tips: ['규칙적 운동', '학습 자세', '시력 관리', '정서 안정'],
      icon: '👦',
    },
    {
      age: '14-19세',
      focus: '청소년기 관리',
      tips: ['성장판 관리', '스트레스 해소', '식습관 교정', '수면 패턴'],
      icon: '👨',
    },
  ];

  // 주의해야 할 질병
  const getHealthWarnings = () => {
    const warnings = [];

    if (dayElement === '목') {
      warnings.push({ issue: '눈 건강', prevention: '스마트폰/TV 시청 시간 제한' });
      warnings.push({ issue: '부상 방지', prevention: '안전 장비 착용' });
    } else if (dayElement === '화') {
      warnings.push({ issue: '아토피/피부염', prevention: '자극 최소화, 보습 관리' });
      warnings.push({ issue: '과잉 행동', prevention: '충분한 활동 시간 제공' });
    } else if (dayElement === '토') {
      warnings.push({ issue: '소화 불량', prevention: '천천히 먹기, 소화 잘되는 음식' });
      warnings.push({ issue: '비만', prevention: '적절한 운동, 간식 조절' });
    } else if (dayElement === '금') {
      warnings.push({ issue: '호흡기 질환', prevention: '공기 청정, 환기' });
      warnings.push({ issue: '알레르기', prevention: '알레르기 유발 물질 차단' });
    } else {
      warnings.push({ issue: '체온 조절', prevention: '적절한 의복, 난방' });
      warnings.push({ issue: '감기', prevention: '손 씻기, 수분 섭취' });
    }

    return warnings;
  };

  const warnings = getHealthWarnings();

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
        🏥 자녀 건강운
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님 자녀의 건강 운세 및 관리법
      </p>

      {/* 건강운 총점 */}
      <div className="glass rounded-2xl p-8 mb-8 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30">
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="text-5xl">{grade.icon}</span>
          <div className="text-center">
            <p className="text-slate-400 text-sm mb-1">건강운 점수</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold gradient-text">{healthScore}</span>
              <span className="text-2xl text-slate-400">점</span>
            </div>
            <p className={`text-xl font-bold mt-1 ${grade.color}`}>{grade.text}</p>
          </div>
        </div>

        <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
            initial={{ width: 0 }}
            whileInView={{ width: `${healthScore}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          />
        </div>
      </div>

      {/* 체질 특성 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
          <Heart className="w-6 h-6" />
          {dayElement} 오행 체질 특성
        </h3>
        <div className="space-y-4">
          <div className="glass rounded-xl p-4 bg-green-500/5">
            <p className="text-green-400 font-bold mb-2">💪 강점</p>
            <p className="text-slate-300 text-sm">{characteristics.strength}</p>
          </div>
          <div className="glass rounded-xl p-4 bg-orange-500/5">
            <p className="text-orange-400 font-bold mb-2">⚠️ 주의사항</p>
            <p className="text-slate-300 text-sm">{characteristics.weakness}</p>
          </div>
          <div className="glass rounded-xl p-4 bg-blue-500/5">
            <p className="text-blue-400 font-bold mb-2">💡 조언</p>
            <p className="text-slate-300 text-sm">{characteristics.advice}</p>
          </div>
        </div>
      </div>

      {/* 나이대별 건강 관리 */}
      <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
        <Activity className="w-6 h-6" />
        나이대별 건강 관리 포인트
      </h3>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {ageGroups.map((group, index) => (
          <motion.div
            key={index}
            className="glass rounded-xl p-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{group.icon}</span>
              <div>
                <p className="text-white font-bold">{group.age}</p>
                <p className="text-slate-400 text-sm">{group.focus}</p>
              </div>
            </div>
            <ul className="space-y-1">
              {group.tips.map((tip, i) => (
                <li key={i} className="text-slate-300 text-sm">
                  ✓ {tip}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* 건강 주의사항 */}
      <h3 className="text-xl font-bold text-orange-400 mb-4 flex items-center gap-2">
        <AlertTriangle className="w-6 h-6" />
        특별히 주의할 건강 이슈
      </h3>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {warnings.map((warning, index) => (
          <motion.div
            key={index}
            className="glass rounded-xl p-5"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <p className="text-orange-400 font-bold mb-2">⚠️ {warning.issue}</p>
            <p className="text-slate-300 text-sm">
              <span className="text-green-400 font-bold">예방법:</span> {warning.prevention}
            </p>
          </motion.div>
        ))}
      </div>

      {/* 건강 생활 수칙 */}
      <div className="glass rounded-2xl p-6 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/30">
        <div className="flex items-start gap-3">
          <Shield className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
          <div>
            <p className="text-blue-300 font-bold mb-3">🛡️ 건강한 자녀로 키우는 5가지 원칙</p>
            <ul className="text-slate-300 text-sm space-y-2 leading-relaxed">
              <li>1. 규칙적인 생활 리듬 - 일정한 시간에 식사와 수면</li>
              <li>2. 균형 잡힌 영양 - 다양한 식품군 골고루 섭취</li>
              <li>3. 충분한 신체 활동 - 하루 1시간 이상 운동</li>
              <li>4. 정기 건강 검진 - 성장 발달 모니터링</li>
              <li>5. 정서적 안정 - 스트레스 관리와 충분한 사랑</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
