'use client';

import { motion } from 'framer-motion';
import { Heart, ArrowLeft, RefreshCw, Star, Calendar, AlertTriangle, Sparkles, TrendingUp, Clock } from 'lucide-react';
import { RekindlingFormData } from './RekindlingForm';
import { getDayPillar } from '@/lib/saju-calculator';

interface RekindlingResultProps {
  formData: RekindlingFormData;
  onReset: () => void;
  onBack: () => void;
}

// 오행 관계표
const ELEMENT_RELATIONS: Record<string, Record<string, string>> = {
  '목': { '목': '비화', '화': '설기', '토': '재성', '금': '관성', '수': '인성' },
  '화': { '목': '인성', '화': '비화', '토': '설기', '금': '재성', '수': '관성' },
  '토': { '목': '관성', '화': '인성', '토': '비화', '금': '설기', '수': '재성' },
  '금': { '목': '재성', '화': '관성', '토': '인성', '금': '비화', '수': '설기' },
  '수': { '목': '설기', '화': '재성', '토': '관성', '금': '인성', '수': '비화' },
};

export default function RekindlingResult({ formData, onReset, onBack }: RekindlingResultProps) {
  // 두 사람의 일주 계산
  const myDayPillar = getDayPillar(formData.myYear, formData.myMonth, formData.myDay);
  const partnerDayPillar = getDayPillar(formData.partnerYear, formData.partnerMonth, formData.partnerDay);

  // 오늘 일주
  const today = new Date();
  const todayPillar = getDayPillar(today.getFullYear(), today.getMonth() + 1, today.getDate());

  // 오행 추출 (천간의 오행)
  const myElement = myDayPillar.stem.element;
  const partnerElement = partnerDayPillar.stem.element;
  const todayElement = todayPillar.stem.element;

  // 관계 분석
  const myToPartner = ELEMENT_RELATIONS[myElement]?.[partnerElement] || '비화';
  const partnerToMe = ELEMENT_RELATIONS[partnerElement]?.[myElement] || '비화';

  // 현재 운 분석
  const myTodayRelation = ELEMENT_RELATIONS[myElement]?.[todayElement] || '비화';

  // 재회 가능성 점수 계산 (0~100)
  const calculateRekindlingScore = () => {
    let score = 50; // 기본 점수

    // 궁합에 따른 점수
    if (myToPartner === '비화' || partnerToMe === '비화') score += 15; // 같은 오행 - 친밀함
    if (myToPartner === '인성' || partnerToMe === '인성') score += 20; // 보호받는 관계
    if (myToPartner === '재성' && formData.myGender === 'male') score += 10; // 남자가 여자를 재성으로
    if (partnerToMe === '재성' && formData.myGender === 'female') score += 10;
    if (myToPartner === '관성' && formData.myGender === 'female') score += 10; // 여자가 남자를 관성으로
    if (partnerToMe === '관성' && formData.myGender === 'male') score += 10;
    if (myToPartner === '설기' || partnerToMe === '설기') score -= 10; // 에너지 소모

    // 오늘의 운
    if (myTodayRelation === '인성') score += 10;
    if (myTodayRelation === '비화') score += 5;
    if (myTodayRelation === '관성') score -= 5;

    // 헤어진 기간에 따른 조정
    if (formData.separationMonths <= 3) score += 15;
    else if (formData.separationMonths <= 6) score += 10;
    else if (formData.separationMonths <= 12) score += 5;
    else if (formData.separationMonths >= 36) score -= 10;

    // 관계 유형
    if (formData.relationshipType === 'spouse') score += 10;
    if (formData.relationshipType === 'friend') score -= 5;

    return Math.min(95, Math.max(15, score));
  };

  const rekindlingScore = calculateRekindlingScore();

  // 점수에 따른 해석
  const getScoreInterpretation = (score: number) => {
    if (score >= 80) return { level: '매우 높음', color: 'text-green-400', bg: 'bg-green-500/20', desc: '재회의 가능성이 매우 높습니다. 적극적으로 다가가세요.' };
    if (score >= 65) return { level: '높음', color: 'text-emerald-400', bg: 'bg-emerald-500/20', desc: '좋은 기운이 있습니다. 자연스럽게 연락해보세요.' };
    if (score >= 50) return { level: '보통', color: 'text-yellow-400', bg: 'bg-yellow-500/20', desc: '가능성은 있지만 신중하게 접근하세요.' };
    if (score >= 35) return { level: '낮음', color: 'text-orange-400', bg: 'bg-orange-500/20', desc: '당분간은 거리를 두는 것이 좋겠습니다.' };
    return { level: '매우 낮음', color: 'text-red-400', bg: 'bg-red-500/20', desc: '새로운 인연을 찾아보는 것을 권합니다.' };
  };

  const interpretation = getScoreInterpretation(rekindlingScore);

  // 궁합 해석
  const getCompatibilityText = () => {
    const texts: string[] = [];

    if (myToPartner === '인성') texts.push('상대방은 당신을 편안하게 해주는 존재입니다.');
    if (myToPartner === '비화') texts.push('서로 비슷한 성향으로 친밀감을 느끼기 쉽습니다.');
    if (myToPartner === '재성') texts.push('당신이 상대를 리드하는 관계입니다.');
    if (myToPartner === '관성') texts.push('상대방이 당신에게 자극을 주는 관계입니다.');
    if (myToPartner === '설기') texts.push('함께 있으면 에너지가 소모되는 느낌일 수 있습니다.');

    if (partnerToMe === '인성') texts.push('당신은 상대방에게 안정감을 주는 사람입니다.');
    if (partnerToMe === '재성') texts.push('상대방은 당신에게 끌림을 느끼는 편입니다.');
    if (partnerToMe === '관성') texts.push('당신은 상대방에게 영향력 있는 존재입니다.');

    return texts.length > 0 ? texts : ['두 분의 기운이 서로 조화를 이루고 있습니다.'];
  };

  // 타이밍 조언
  const getTimingAdvice = () => {
    if (myTodayRelation === '인성') return '오늘은 마음이 편안해지는 날입니다. 연락하기 좋은 타이밍이에요.';
    if (myTodayRelation === '비화') return '오늘은 자신감이 있는 날입니다. 솔직하게 표현해보세요.';
    if (myTodayRelation === '설기') return '오늘은 표현력이 좋습니다. 진심을 전하기 좋아요.';
    if (myTodayRelation === '재성') return '오늘은 적극적으로 행동하기 좋은 날입니다.';
    if (myTodayRelation === '관성') return '오늘은 조심스럽게 접근하는 것이 좋겠습니다.';
    return '차분하게 상황을 지켜보세요.';
  };

  // 조언 생성
  const getAdvice = () => {
    const advice: string[] = [];

    if (rekindlingScore >= 65) {
      advice.push('두 분의 인연의 끈이 아직 이어져 있습니다.');
      if (formData.separationMonths <= 6) {
        advice.push('시간이 많이 지나지 않았으니 자연스럽게 연락해보세요.');
      }
      advice.push('과거의 문제점을 반복하지 않도록 노력하세요.');
    } else if (rekindlingScore >= 50) {
      advice.push('가능성은 있지만 서두르지 마세요.');
      advice.push('먼저 자신의 마음을 정리하는 시간이 필요합니다.');
      advice.push('상대방의 현재 상황을 파악해보세요.');
    } else {
      advice.push('지금은 재회보다 자기 성장에 집중하세요.');
      advice.push('더 좋은 인연이 기다리고 있을 수 있습니다.');
      advice.push('시간이 지나면 상황이 달라질 수 있어요.');
    }

    return advice;
  };

  // 주의사항
  const getWarnings = () => {
    const warnings: string[] = [];

    if (formData.separationMonths >= 24) {
      warnings.push('오랜 시간이 지나 서로 많이 변했을 수 있습니다.');
    }
    if (myToPartner === '관성') {
      warnings.push('상대방에게 집착하지 않도록 주의하세요.');
    }
    if (myToPartner === '설기') {
      warnings.push('감정적으로 지치지 않도록 자기 관리를 하세요.');
    }
    if (formData.relationshipType === 'spouse') {
      warnings.push('법적, 가족적 상황을 충분히 고려하세요.');
    }

    return warnings;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="min-h-screen py-8 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-lg mx-auto">
        {/* 뒤로가기 */}
        <motion.button
          variants={itemVariants}
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>메뉴로 돌아가기</span>
        </motion.button>

        {/* 헤더 */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-rose-400 to-pink-600 flex items-center justify-center shadow-lg mb-4">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            재회 운세 결과
          </h1>
          <p className="text-pink-400">두 분의 인연을 분석했습니다</p>
        </motion.div>

        {/* 점수 카드 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-6 mb-6 text-center">
          <h2 className="text-lg font-bold text-white mb-4">재회 가능성</h2>

          <div className="relative w-40 h-40 mx-auto mb-4">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                className="text-slate-700"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="url(#gradient)"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${rekindlingScore * 4.4} 440`}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f472b6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-white">{rekindlingScore}</span>
              <span className="text-slate-400 text-sm">/ 100</span>
            </div>
          </div>

          <div className={`inline-block px-4 py-2 rounded-full ${interpretation.bg} ${interpretation.color} font-bold mb-3`}>
            {interpretation.level}
          </div>
          <p className="text-slate-300 text-sm">{interpretation.desc}</p>
        </motion.div>

        {/* 일주 분석 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-pink-400" />
            사주 분석
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
              <p className="text-slate-400 text-sm mb-1">나의 일주</p>
              <p className="text-2xl font-bold text-pink-400">{myDayPillar.stem.ko}{myDayPillar.branch.ko}</p>
              <p className="text-slate-500 text-xs mt-1">{myElement}(木火土金水)</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
              <p className="text-slate-400 text-sm mb-1">상대 일주</p>
              <p className="text-2xl font-bold text-rose-400">{partnerDayPillar.stem.ko}{partnerDayPillar.branch.ko}</p>
              <p className="text-slate-500 text-xs mt-1">{partnerElement}(木火土金水)</p>
            </div>
          </div>

          <div className="space-y-2">
            {getCompatibilityText().map((text, i) => (
              <p key={i} className="text-slate-300 text-sm flex items-start gap-2">
                <Star className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
                {text}
              </p>
            ))}
          </div>
        </motion.div>

        {/* 오늘의 타이밍 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-400" />
            오늘의 타이밍
          </h2>

          <div className="bg-slate-800/50 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-amber-400 text-sm">오늘의 일주</p>
                <p className="text-xl font-bold text-white">{todayPillar.stem.ko}{todayPillar.branch.ko}</p>
              </div>
            </div>
          </div>

          <p className="text-slate-300 text-sm">{getTimingAdvice()}</p>
        </motion.div>

        {/* 조언 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            재회를 위한 조언
          </h2>

          <div className="space-y-3">
            {getAdvice().map((advice, i) => (
              <div key={i} className="flex items-start gap-3 bg-emerald-500/10 rounded-xl p-3">
                <span className="text-emerald-400 font-bold">{i + 1}</span>
                <p className="text-slate-300 text-sm">{advice}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 주의사항 */}
        {getWarnings().length > 0 && (
          <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-6 mb-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              주의사항
            </h2>

            <div className="space-y-2">
              {getWarnings().map((warning, i) => (
                <p key={i} className="text-slate-300 text-sm flex items-start gap-2">
                  <span className="text-orange-400">•</span>
                  {warning}
                </p>
              ))}
            </div>
          </motion.div>
        )}

        {/* 버튼 */}
        <motion.div variants={itemVariants} className="space-y-3">
          <button
            onClick={onReset}
            className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl text-white font-bold text-lg hover:from-pink-600 hover:to-rose-700 transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <RefreshCw className="w-5 h-5" />
            다시 보기
          </button>
          <button
            onClick={onBack}
            className="w-full py-3 bg-slate-700/50 rounded-2xl text-slate-300 font-medium hover:bg-slate-700 transition-all"
          >
            메인으로 돌아가기
          </button>
        </motion.div>

        {/* 면책 */}
        <motion.p variants={itemVariants} className="text-slate-600 text-xs text-center mt-6">
          본 운세는 재미와 참고용이며, 실제 결과와 다를 수 있습니다.
        </motion.p>
      </div>
    </motion.div>
  );
}
