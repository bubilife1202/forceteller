'use client';

import { motion } from 'framer-motion';
import { Heart, ArrowLeft, RefreshCw, Star, AlertTriangle, Sparkles, TrendingUp, Clock, MessageCircle, Lightbulb, Target, Shield, Flame, Moon, Sun } from 'lucide-react';
import { RekindlingFormData } from './RekindlingForm';
import { getDayPillar } from '@/lib/saju-calculator';
import { generateStyledHTML, downloadHTML } from '@/lib/html-download';
import DownloadButton from './ui/DownloadButton';

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

// 이별 사유별 분석
const SEPARATION_ANALYSIS: Record<string, {
  healing: string;
  chance: number;
  advice: string[];
  timeline: string;
}> = {
  'fight': {
    healing: '시간이 지나면 감정이 정리되어 대화가 가능해질 수 있습니다.',
    chance: 15,
    advice: ['먼저 자신의 행동을 돌아보세요', '사과할 부분이 있다면 진심을 담아 전하세요', '상대의 입장에서 생각해보세요'],
    timeline: '감정 정리에 2-3개월 정도 필요할 수 있습니다',
  },
  'distance': {
    healing: '물리적 거리는 마음까지 멀어지게 하지 않습니다.',
    chance: 20,
    advice: ['상황이 바뀔 수 있는지 확인해보세요', '원거리 연애의 방법을 함께 고민해보세요', '서로의 노력이 필요합니다'],
    timeline: '환경 변화가 생기면 기회가 올 수 있습니다',
  },
  'timing': {
    healing: '타이밍은 다시 찾아올 수 있습니다. 기다림도 사랑입니다.',
    chance: 25,
    advice: ['지금은 각자 성장할 시간이에요', '연락을 완전히 끊지는 마세요', '좋은 인연은 다시 만나게 됩니다'],
    timeline: '6개월~1년 후 상황이 나아질 수 있습니다',
  },
  'family': {
    healing: '가족의 반대는 시간이 지나면 변할 수 있습니다.',
    chance: 10,
    advice: ['상대 가족의 우려를 이해해보세요', '당신의 진심을 보여줄 방법을 찾으세요', '조급해하지 마세요'],
    timeline: '장기적인 관점에서 접근이 필요합니다',
  },
  'cheating': {
    healing: '신뢰가 깨진 관계는 회복이 어렵습니다.',
    chance: -20,
    advice: ['정말 다시 만나고 싶은지 신중히 생각하세요', '같은 실수가 반복되지 않을까요?', '새로운 시작도 고려해보세요'],
    timeline: '신뢰 회복에는 오랜 시간이 필요합니다',
  },
  'other': {
    healing: '이별의 진짜 이유를 먼저 파악해야 합니다.',
    chance: 0,
    advice: ['왜 헤어졌는지 정확히 알아야 해요', '상대의 진심을 확인해보세요', '막연한 기대보다 현실을 직시하세요'],
    timeline: '원인 파악 후 방향을 정하세요',
  },
};

// 현재 감정별 메시지
const FEELING_MESSAGES: Record<string, { title: string; message: string; advice: string }> = {
  'miss': {
    title: '그리움이 가득하시군요',
    message: '보고 싶다는 마음은 진심의 증거입니다. 하지만 그리움만으로는 재회가 이루어지지 않아요. 당신의 마음을 전하되, 상대방의 마음도 존중해주세요.',
    advice: '그리움을 담은 짧은 메시지를 보내보는 건 어떨까요?',
  },
  'regret': {
    title: '후회가 되시는군요',
    message: '후회는 성장의 시작입니다. 무엇이 잘못되었는지 알았다면, 그것을 고칠 준비가 되었다는 뜻이에요. 같은 실수를 반복하지 않겠다는 다짐이 중요합니다.',
    advice: '진심 어린 사과와 함께 변화된 모습을 보여주세요',
  },
  'confused': {
    title: '마음이 복잡하시군요',
    message: '혼란스러운 것은 자연스러운 감정이에요. 지금 당장 결론을 내리지 않아도 됩니다. 시간을 갖고 자신의 진짜 마음을 들여다보세요.',
    advice: '조급해하지 말고 천천히 마음을 정리하세요',
  },
  'hopeful': {
    title: '희망을 가지고 계시네요',
    message: '다시 만나고 싶다는 마음은 아름답습니다. 하지만 일방적인 희망보다는 상대의 마음도 확인해보세요. 서로 같은 마음이라면 가능성은 충분합니다.',
    advice: '적절한 타이밍에 용기 내어 연락해보세요',
  },
};

export default function RekindlingResult({ formData, onReset, onBack }: RekindlingResultProps) {
  // 두 사람의 일주 계산
  const myDayPillar = getDayPillar(formData.myYear, formData.myMonth, formData.myDay);
  const partnerDayPillar = getDayPillar(formData.partnerYear, formData.partnerMonth, formData.partnerDay);

  // 오늘 일주
  const today = new Date();
  const todayPillar = getDayPillar(today.getFullYear(), today.getMonth() + 1, today.getDate());

  // 오행 추출
  const myElement = myDayPillar.stem.element;
  const partnerElement = partnerDayPillar.stem.element;
  const todayElement = todayPillar.stem.element;

  // 관계 분석
  const myToPartner = ELEMENT_RELATIONS[myElement]?.[partnerElement] || '비화';
  const partnerToMe = ELEMENT_RELATIONS[partnerElement]?.[myElement] || '비화';
  const myTodayRelation = ELEMENT_RELATIONS[myElement]?.[todayElement] || '비화';

  // 이름 설정 (없으면 기본값)
  const myName = formData.myName || '나';
  const partnerName = formData.partnerName || '상대방';

  // 재회 가능성 점수 계산
  const calculateRekindlingScore = () => {
    let score = 50;

    // 궁합에 따른 점수
    if (myToPartner === '비화' || partnerToMe === '비화') score += 15;
    if (myToPartner === '인성' || partnerToMe === '인성') score += 20;
    if (myToPartner === '재성' && formData.myGender === 'male') score += 10;
    if (partnerToMe === '재성' && formData.myGender === 'female') score += 10;
    if (myToPartner === '관성' && formData.myGender === 'female') score += 10;
    if (partnerToMe === '관성' && formData.myGender === 'male') score += 10;
    if (myToPartner === '설기' || partnerToMe === '설기') score -= 10;

    // 오늘의 운
    if (myTodayRelation === '인성') score += 10;
    if (myTodayRelation === '비화') score += 5;
    if (myTodayRelation === '관성') score -= 5;

    // 헤어진 기간
    if (formData.separationMonths <= 3) score += 15;
    else if (formData.separationMonths <= 6) score += 10;
    else if (formData.separationMonths <= 12) score += 5;
    else if (formData.separationMonths >= 36) score -= 10;

    // 관계 유형
    if (formData.relationshipType === 'spouse') score += 10;
    if (formData.relationshipType === 'friend') score -= 5;

    // 이별 사유
    score += SEPARATION_ANALYSIS[formData.separationReason]?.chance || 0;

    return Math.min(95, Math.max(15, score));
  };

  const rekindlingScore = calculateRekindlingScore();
  const separationAnalysis = SEPARATION_ANALYSIS[formData.separationReason];
  const feelingMessage = FEELING_MESSAGES[formData.currentFeelings];

  // 점수에 따른 해석
  const getScoreInterpretation = (score: number) => {
    if (score >= 80) return { level: '매우 높음', color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/30', emoji: '💖', desc: '두 분의 인연은 아직 이어져 있습니다.' };
    if (score >= 65) return { level: '높음', color: 'text-emerald-400', bg: 'bg-emerald-500/20', border: 'border-emerald-500/30', emoji: '💕', desc: '재회의 가능성이 충분히 있습니다.' };
    if (score >= 50) return { level: '보통', color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/30', emoji: '💛', desc: '노력 여하에 따라 달라질 수 있습니다.' };
    if (score >= 35) return { level: '낮음', color: 'text-orange-400', bg: 'bg-orange-500/20', border: 'border-orange-500/30', emoji: '🧡', desc: '지금은 기다림이 필요한 시기입니다.' };
    return { level: '매우 낮음', color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/30', emoji: '❤️‍🩹', desc: '새로운 인연을 만날 준비를 해보세요.' };
  };

  const interpretation = getScoreInterpretation(rekindlingScore);

  // 궁합 상세 분석
  const getDetailedCompatibility = () => {
    const analysis = [];

    // 내가 상대를 어떻게 느끼는지
    if (myToPartner === '인성') {
      analysis.push({ icon: '🛡️', title: `${partnerName}님이 나에게 주는 느낌`, text: '편안하고 안정감을 주는 사람이에요. 함께 있으면 마음이 놓이는 존재입니다.' });
    } else if (myToPartner === '비화') {
      analysis.push({ icon: '🤝', title: `${partnerName}님이 나에게 주는 느낌`, text: '나와 비슷한 사람이에요. 서로를 잘 이해하고 공감할 수 있습니다.' });
    } else if (myToPartner === '재성') {
      analysis.push({ icon: '💎', title: `${partnerName}님이 나에게 주는 느낌`, text: '내가 가지고 싶은, 끌리는 매력이 있는 사람이에요.' });
    } else if (myToPartner === '관성') {
      analysis.push({ icon: '⚡', title: `${partnerName}님이 나에게 주는 느낌`, text: '나를 긴장하게 만드는 사람이에요. 쉽지 않지만 그만큼 마음을 사로잡습니다.' });
    } else if (myToPartner === '설기') {
      analysis.push({ icon: '💨', title: `${partnerName}님이 나에게 주는 느낌`, text: '함께 있으면 에너지가 소모되는 느낌이 들 수 있어요.' });
    }

    // 상대가 나를 어떻게 느끼는지
    if (partnerToMe === '인성') {
      analysis.push({ icon: '🏠', title: `${myName}님이 상대에게 주는 느낌`, text: '당신은 상대방에게 안식처 같은 존재입니다. 편안함을 줍니다.' });
    } else if (partnerToMe === '재성') {
      analysis.push({ icon: '✨', title: `${myName}님이 상대에게 주는 느낌`, text: '상대방은 당신에게 끌림을 느끼는 편이에요. 매력적으로 보입니다.' });
    } else if (partnerToMe === '관성') {
      analysis.push({ icon: '👑', title: `${myName}님이 상대에게 주는 느낌`, text: '당신은 상대방에게 영향력 있는 존재예요. 무시할 수 없는 사람입니다.' });
    }

    return analysis;
  };

  // 재회 타이밍 분석
  const getTimingAnalysis = () => {
    const timing = [];

    // 오늘의 운세
    if (myTodayRelation === '인성') {
      timing.push({ good: true, title: '오늘', desc: '마음이 편안해지는 날이에요. 연락하기 좋습니다.' });
    } else if (myTodayRelation === '설기') {
      timing.push({ good: true, title: '오늘', desc: '표현력이 좋은 날입니다. 진심을 전하세요.' });
    } else if (myTodayRelation === '관성') {
      timing.push({ good: false, title: '오늘', desc: '조금 긴장되는 날이에요. 신중하게 접근하세요.' });
    } else {
      timing.push({ good: null, title: '오늘', desc: '평온한 에너지의 날입니다.' });
    }

    // 기간별 조언
    if (formData.separationMonths <= 3) {
      timing.push({ good: true, title: '시기적 분석', desc: '아직 감정이 살아있을 때예요. 너무 늦지 않게 연락해보세요.' });
    } else if (formData.separationMonths <= 12) {
      timing.push({ good: null, title: '시기적 분석', desc: '적당한 거리를 둔 시간이 지났어요. 자연스럽게 연락해볼 수 있습니다.' });
    } else {
      timing.push({ good: false, title: '시기적 분석', desc: '시간이 많이 지났어요. 새 출발의 의미로 접근하세요.' });
    }

    return timing;
  };

  // 단계별 조언
  const getStepByStepAdvice = () => {
    const steps = [];

    // Step 1: 마음 정리
    steps.push({
      step: 1,
      title: '내 마음 정리하기',
      desc: '재회를 원하는 이유가 외로움인지, 진짜 사랑인지 구분하세요.',
      icon: Heart,
    });

    // Step 2: 준비
    if (formData.separationReason === 'fight') {
      steps.push({ step: 2, title: '변화 준비하기', desc: '같은 갈등이 반복되지 않도록 나의 문제점을 개선하세요.', icon: Lightbulb });
    } else if (formData.separationReason === 'distance') {
      steps.push({ step: 2, title: '현실적 방안 찾기', desc: '거리 문제를 해결할 수 있는 방법을 구체적으로 찾아보세요.', icon: Target });
    } else {
      steps.push({ step: 2, title: '자기 성장하기', desc: '더 나은 사람이 되어 다시 만났을 때 좋은 모습을 보여주세요.', icon: TrendingUp });
    }

    // Step 3: 연락
    steps.push({
      step: 3,
      title: '자연스럽게 연락하기',
      desc: '갑작스러운 연락보다는 가벼운 안부부터 시작하세요.',
      icon: MessageCircle,
    });

    // Step 4: 대화
    steps.push({
      step: 4,
      title: '솔직하게 대화하기',
      desc: '원했던 것, 아쉬웠던 것을 진심으로 이야기하세요.',
      icon: Sparkles,
    });

    return steps;
  };

  // HTML 다운로드 함수
  const handleDownload = async () => {
    await new Promise(resolve => setTimeout(resolve, 800));

    const compatibilityItems = getDetailedCompatibility();
    const stepItems = getStepByStepAdvice();

    const content = `
      <div class="section">
        <div class="score-box">
          <div style="font-size: 48px; margin-bottom: 8px;">${interpretation.emoji}</div>
          <div class="score-value">${rekindlingScore}%</div>
          <div class="score-label">재회 가능성: ${interpretation.level}</div>
        </div>
        <p style="text-align: center; color: white; font-size: 16px; margin-top: 16px;">${interpretation.desc}</p>
      </div>

      <div class="section">
        <div class="section-title"><span class="icon">👤</span> ${myName}님과 ${partnerName}님</div>
        <div class="grid-2">
          <div class="stat-card">
            <div class="stat-label">${myName}님의 일주</div>
            <div class="stat-value pink">${myDayPillar.stem.ko}${myDayPillar.branch.ko}</div>
            <div style="font-size: 12px; color: #94a3b8;">${myElement} 오행</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">${partnerName}님의 일주</div>
            <div class="stat-value purple">${partnerDayPillar.stem.ko}${partnerDayPillar.branch.ko}</div>
            <div style="font-size: 12px; color: #94a3b8;">${partnerElement} 오행</div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title"><span class="icon">💕</span> 두 사람의 궁합</div>
        ${compatibilityItems.map(item => `
          <div class="stat-card" style="margin-bottom: 8px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <span style="font-size: 20px;">${item.icon}</span>
              <span style="color: #ec4899; font-weight: 700;">${item.title}</span>
            </div>
            <p style="color: #e2e8f0; font-size: 14px;">${item.text}</p>
          </div>
        `).join('')}
      </div>

      <div class="section">
        <div class="section-title"><span class="icon">💔</span> 이별 원인 분석</div>
        <div class="stat-card">
          <p style="color: white; font-size: 16px; margin-bottom: 8px;">${separationAnalysis.healing}</p>
          <p style="color: #f97316; font-size: 12px;">${separationAnalysis.timeline}</p>
        </div>
      </div>

      <div class="section">
        <div class="section-title"><span class="icon">💭</span> ${feelingMessage.title}</div>
        <div class="advice-box" style="background: linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(219, 39, 119, 0.2)); border-color: rgba(236, 72, 153, 0.3);">
          <p style="color: white; margin-bottom: 8px;">${feelingMessage.message}</p>
          <p style="color: #f9a8d4; font-size: 14px;">💡 ${feelingMessage.advice}</p>
        </div>
      </div>

      <div class="section">
        <div class="section-title"><span class="icon">📋</span> 재회를 위한 단계별 조언</div>
        ${stepItems.map(step => `
          <div class="stat-card" style="margin-bottom: 8px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(236, 72, 153, 0.2); display: flex; align-items: center; justify-content: center; color: #ec4899; font-weight: 700;">${step.step}</div>
              <div>
                <div style="color: white; font-weight: 700;">${step.title}</div>
                <div style="color: #94a3b8; font-size: 12px;">${step.desc}</div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="section">
        <div class="section-title"><span class="icon">⚠️</span> 주의사항</div>
        ${separationAnalysis.advice.map(advice => `
          <div class="list-item"><span class="bullet" style="color: #f97316;">•</span> ${advice}</div>
        `).join('')}
      </div>
    `;

    const html = generateStyledHTML({
      title: `${myName}님과 ${partnerName}님의 재회 운세`,
      date: `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`,
      content,
      primaryColor: '#ec4899',
    });

    downloadHTML(`재회운세_${myName}_${partnerName}.html`, html);
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

  const compatibilityAnalysis = getDetailedCompatibility();
  const timingAnalysis = getTimingAnalysis();
  const stepByStepAdvice = getStepByStepAdvice();

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
          <span>메뉴로</span>
        </motion.button>

        {/* 헤더 */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-rose-400 to-pink-600 flex items-center justify-center shadow-lg mb-4">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            재회 운세
          </h1>
          <p className="text-pink-400">{myName}님 ❤️ {partnerName}님</p>
        </motion.div>

        {/* 메인 점수 카드 */}
        <motion.div
          variants={itemVariants}
          className={`${interpretation.bg} border ${interpretation.border} rounded-3xl p-6 mb-6 text-center`}
        >
          <div className="text-6xl mb-4">{interpretation.emoji}</div>

          <div className="relative w-44 h-44 mx-auto mb-4">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="88"
                cy="88"
                r="78"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                className="text-slate-700"
              />
              <motion.circle
                cx="88"
                cy="88"
                r="78"
                stroke="url(#gradient)"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                initial={{ strokeDasharray: `0 490` }}
                animate={{ strokeDasharray: `${rekindlingScore * 4.9} 490` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f472b6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold text-white">{rekindlingScore}</span>
              <span className="text-slate-400 text-sm">%</span>
            </div>
          </div>

          <div className={`inline-block px-4 py-2 rounded-full ${interpretation.bg} ${interpretation.color} font-bold mb-3`}>
            재회 가능성: {interpretation.level}
          </div>
          <p className="text-white text-lg">{interpretation.desc}</p>
        </motion.div>

        {/* 감정 분석 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-xl">💭</span>
            {feelingMessage.title}
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">{feelingMessage.message}</p>
          <div className="bg-pink-500/10 border border-pink-500/30 rounded-xl p-4">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
              <p className="text-pink-300 text-sm">{feelingMessage.advice}</p>
            </div>
          </div>
        </motion.div>

        {/* 두 사람의 사주 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-pink-400" />
            사주로 본 두 사람
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
              <p className="text-slate-400 text-sm mb-1">{myName}님</p>
              <p className="text-3xl font-bold text-pink-400">{myDayPillar.stem.ko}{myDayPillar.branch.ko}</p>
              <p className="text-slate-500 text-xs mt-1">{myElement} 오행</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
              <p className="text-slate-400 text-sm mb-1">{partnerName}님</p>
              <p className="text-3xl font-bold text-rose-400">{partnerDayPillar.stem.ko}{partnerDayPillar.branch.ko}</p>
              <p className="text-slate-500 text-xs mt-1">{partnerElement} 오행</p>
            </div>
          </div>

          {/* 궁합 상세 분석 */}
          <div className="space-y-3">
            {compatibilityAnalysis.map((item, i) => (
              <div key={i} className="bg-slate-800/50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-pink-400 font-medium">{item.title}</span>
                </div>
                <p className="text-slate-300 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 이별 원인 분석 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-xl">💔</span>
            이별 원인 분석
          </h2>

          <div className="bg-slate-800/50 rounded-xl p-4 mb-4">
            <p className="text-white text-lg mb-2">{separationAnalysis.healing}</p>
            <p className="text-amber-400 text-sm flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {separationAnalysis.timeline}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-slate-400 text-sm mb-2">이 상황에서의 조언:</p>
            {separationAnalysis.advice.map((advice, i) => (
              <div key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                <span className="text-orange-400">•</span>
                {advice}
              </div>
            ))}
          </div>
        </motion.div>

        {/* 타이밍 분석 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-400" />
            타이밍 분석
          </h2>

          <div className="space-y-3">
            {timingAnalysis.map((timing, i) => (
              <div key={i} className={`rounded-xl p-4 ${
                timing.good === true ? 'bg-green-500/10 border border-green-500/30' :
                timing.good === false ? 'bg-orange-500/10 border border-orange-500/30' :
                'bg-slate-800/50'
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  {timing.good === true && <Sun className="w-4 h-4 text-green-400" />}
                  {timing.good === false && <Moon className="w-4 h-4 text-orange-400" />}
                  {timing.good === null && <Star className="w-4 h-4 text-slate-400" />}
                  <span className={`font-medium ${
                    timing.good === true ? 'text-green-400' :
                    timing.good === false ? 'text-orange-400' : 'text-slate-300'
                  }`}>{timing.title}</span>
                </div>
                <p className="text-slate-300 text-sm">{timing.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 단계별 조언 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-400" />
            재회를 위한 단계별 가이드
          </h2>

          <div className="space-y-4">
            {stepByStepAdvice.map((step) => {
              const IconComponent = step.icon;
              return (
                <div key={step.step} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-pink-400 font-bold">{step.step}</span>
                  </div>
                  <div className="flex-1 bg-slate-800/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <IconComponent className="w-4 h-4 text-pink-400" />
                      <span className="text-white font-medium">{step.title}</span>
                    </div>
                    <p className="text-slate-400 text-sm">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* 주의사항 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-400" />
            꼭 기억하세요
          </h2>

          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-orange-500/10 rounded-xl p-3">
              <Shield className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-300 text-sm">재회는 두 사람 모두의 마음이 맞아야 합니다. 일방적인 집착은 자신을 더 힘들게 할 뿐이에요.</p>
            </div>
            <div className="flex items-start gap-3 bg-pink-500/10 rounded-xl p-3">
              <Flame className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-300 text-sm">같은 문제로 다시 헤어지지 않으려면, 서로 변화가 필요합니다. 사랑만으로는 부족해요.</p>
            </div>
            <div className="flex items-start gap-3 bg-emerald-500/10 rounded-xl p-3">
              <Heart className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-300 text-sm">설령 재회가 어렵더라도, 이 경험은 당신을 더 성장시킬 거예요. 더 좋은 사랑이 기다리고 있습니다.</p>
            </div>
          </div>
        </motion.div>

        {/* 응원 메시지 */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-pink-500/20 to-rose-500/20 border border-pink-500/30 rounded-3xl p-6 mb-6"
        >
          <p className="text-white text-center text-lg leading-relaxed">
            {myName}님, 어떤 결과가 되더라도<br />
            <span className="text-pink-400 font-bold">당신의 마음은 소중합니다.</span><br />
            진심으로 응원합니다. 💕
          </p>
        </motion.div>

        {/* 버튼 */}
        <motion.div variants={itemVariants} className="space-y-3">
          <button
            onClick={onReset}
            className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl text-white font-bold text-lg hover:from-pink-600 hover:to-rose-700 transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <RefreshCw className="w-5 h-5" />
            다시 보기
          </button>
          <DownloadButton onDownload={handleDownload} label="결과 저장하기" />
          <button
            onClick={onBack}
            className="w-full py-3 bg-slate-700/50 rounded-2xl text-slate-300 font-medium hover:bg-slate-700 transition-all"
          >
            메뉴로
          </button>
        </motion.div>

        {/* 면책 */}
        <motion.p variants={itemVariants} className="text-slate-600 text-xs text-center mt-6">
          본 운세는 재미와 참고용이며, 실제 결과와 다를 수 있습니다.<br />
          사주명리학의 오행 상생상극 원리에 기반합니다.
        </motion.p>
      </div>
    </motion.div>
  );
}
