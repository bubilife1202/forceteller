'use client';

import { motion } from 'framer-motion';
import { Users, ArrowLeft, RefreshCw, Star, Heart, AlertTriangle, Shield, Sparkles, UserCheck, UserX, Handshake, Crown, Target, Zap, Gift, Clock } from 'lucide-react';
import { calculateSaju } from '@/lib/saju-calculator';
import { GuiinFormData } from './GuiinForm';

interface GuiinResultProps {
  formData: GuiinFormData;
  onReset: () => void;
  onBack: () => void;
}

// 12지지 띠
const ZODIAC_ANIMALS: Record<string, {
  name: string;
  emoji: string;
  personality: string;
  compatible: string[];
  incompatible: string[];
}> = {
  '자': { name: '쥐띠', emoji: '🐀', personality: '영리하고 재치있는', compatible: ['진', '신', '축'], incompatible: ['오', '미', '묘'] },
  '축': { name: '소띠', emoji: '🐂', personality: '성실하고 끈기있는', compatible: ['사', '유', '자'], incompatible: ['미', '오', '술'] },
  '인': { name: '호랑이띠', emoji: '🐅', personality: '용감하고 자신감있는', compatible: ['오', '술', '해'], incompatible: ['신', '사', '미'] },
  '묘': { name: '토끼띠', emoji: '🐰', personality: '온화하고 세심한', compatible: ['미', '해', '술'], incompatible: ['유', '자', '진'] },
  '진': { name: '용띠', emoji: '🐲', personality: '카리스마있고 열정적인', compatible: ['자', '신', '유'], incompatible: ['술', '묘', '진'] },
  '사': { name: '뱀띠', emoji: '🐍', personality: '지혜롭고 직관적인', compatible: ['축', '유', '신'], incompatible: ['해', '인', '신'] },
  '오': { name: '말띠', emoji: '🐴', personality: '활발하고 자유로운', compatible: ['인', '술', '미'], incompatible: ['자', '축', '오'] },
  '미': { name: '양띠', emoji: '🐐', personality: '온순하고 예술적인', compatible: ['묘', '해', '오'], incompatible: ['축', '자', '술'] },
  '신': { name: '원숭이띠', emoji: '🐒', personality: '재치있고 창의적인', compatible: ['자', '진', '사'], incompatible: ['인', '해', '사'] },
  '유': { name: '닭띠', emoji: '🐔', personality: '부지런하고 자신감있는', compatible: ['축', '사', '진'], incompatible: ['묘', '술', '유'] },
  '술': { name: '개띠', emoji: '🐕', personality: '충직하고 정의로운', compatible: ['인', '오', '묘'], incompatible: ['진', '유', '축'] },
  '해': { name: '돼지띠', emoji: '🐖', personality: '순수하고 관대한', compatible: ['묘', '미', '인'], incompatible: ['사', '신', '해'] },
};

// 귀인 신살
const GUIIN_TYPES: Record<string, {
  name: string;
  description: string;
  howToFind: string;
  relationship: string;
}> = {
  '천을귀인': {
    name: '천을귀인(天乙貴人)',
    description: '하늘이 보내준 가장 큰 귀인입니다. 어려운 상황에서 구원의 손길을 내밀어주는 사람.',
    howToFind: '직장 상사, 선배, 사회적 지위가 높은 사람 중에서 만날 수 있습니다.',
    relationship: '당신을 진심으로 도와주고, 위기에서 구해주는 사람. 감사히 여기고 인연을 소중히 하세요.',
  },
  '문창귀인': {
    name: '문창귀인(文昌貴人)',
    description: '학문과 지혜의 귀인입니다. 공부, 시험, 자격증에 도움을 주는 사람.',
    howToFind: '선생님, 교수님, 학원 강사, 멘토 중에서 찾아보세요.',
    relationship: '지식과 지혜를 나눠주는 스승 같은 인연. 배움의 기회를 주는 사람입니다.',
  },
  '천덕귀인': {
    name: '천덕귀인(天德貴人)',
    description: '하늘의 덕을 가진 귀인입니다. 당신의 잘못을 덮어주고 보호해주는 사람.',
    howToFind: '부모님, 친척 어른, 종교인 중에서 찾을 수 있습니다.',
    relationship: '무조건적인 사랑과 용서를 베푸는 사람. 감사의 마음을 전하세요.',
  },
  '월덕귀인': {
    name: '월덕귀인(月德貴人)',
    description: '달의 덕을 가진 귀인입니다. 재물과 풍요를 가져다주는 사람.',
    howToFind: '사업 파트너, 투자자, 소개해주는 지인 중에서 만날 수 있습니다.',
    relationship: '금전적 도움이나 사업 기회를 주는 인연. 신뢰를 쌓아가세요.',
  },
};

// 악연 신살
const AKYEON_TYPES: Record<string, {
  name: string;
  description: string;
  warning: string;
  howToHandle: string;
}> = {
  '겁살': {
    name: '겁살(劫煞)',
    description: '재물 손실과 다툼을 가져오는 악연입니다.',
    warning: '이 띠의 사람과 금전 거래, 동업, 보증은 절대 피하세요.',
    howToHandle: '적당한 거리를 유지하고, 깊은 관계를 맺지 않는 것이 좋습니다.',
  },
  '원진살': {
    name: '원진살(怨嗔煞)',
    description: '이유 없이 미움과 반감을 불러일으키는 악연입니다.',
    warning: '처음엔 괜찮다가도 시간이 지날수록 갈등이 생깁니다.',
    howToHandle: '너무 가까워지지 말고, 이해하려 노력하되 기대는 줄이세요.',
  },
  '파살': {
    name: '파살(破煞)',
    description: '관계가 깨지고 불화를 일으키는 악연입니다.',
    warning: '함께 일하거나 동거하면 결국 싸우게 됩니다.',
    howToHandle: '비즈니스 파트너나 룸메이트로는 피하는 것이 좋습니다.',
  },
  '해살': {
    name: '해살(害煞)',
    description: '서로에게 해가 되는 악연입니다.',
    warning: '좋은 의도로 시작해도 결과적으로 손해를 입습니다.',
    howToHandle: '의존하지 말고 독립적인 관계를 유지하세요.',
  },
};

// 일간별 귀인띠 계산
const DAY_STEM_GUIIN: Record<string, {
  천을귀인: string[];
  문창귀인: string[];
  학당귀인: string[];
}> = {
  '갑': { 천을귀인: ['축', '미'], 문창귀인: ['사'], 학당귀인: ['해'] },
  '을': { 천을귀인: ['자', '신'], 문창귀인: ['오'], 학당귀인: ['오'] },
  '병': { 천을귀인: ['해', '유'], 문창귀인: ['신'], 학당귀인: ['인'] },
  '정': { 천을귀인: ['해', '유'], 문창귀인: ['유'], 학당귀인: ['유'] },
  '무': { 천을귀인: ['축', '미'], 문창귀인: ['신'], 학당귀인: ['신'] },
  '기': { 천을귀인: ['자', '신'], 문창귀인: ['유'], 학당귀인: ['유'] },
  '경': { 천을귀인: ['축', '미'], 문창귀인: ['해'], 학당귀인: ['사'] },
  '신': { 천을귀인: ['인', '오'], 문창귀인: ['자'], 학당귀인: ['자'] },
  '임': { 천을귀인: ['묘', '사'], 문창귀인: ['인'], 학당귀인: ['인'] },
  '계': { 천을귀인: ['묘', '사'], 문창귀인: ['묘'], 학당귀인: ['묘'] },
};

// 일간별 악연띠 계산
const DAY_STEM_AKYEON: Record<string, {
  겁살: string;
  원진살: string[];
  파살: string;
}> = {
  '갑': { 겁살: '신', 원진살: ['유', '술'], 파살: '해' },
  '을': { 겁살: '유', 원진살: ['술', '신'], 파살: '자' },
  '병': { 겁살: '자', 원진살: ['해', '자'], 파살: '축' },
  '정': { 겁살: '축', 원진살: ['자', '해'], 파살: '인' },
  '무': { 겁살: '인', 원진살: ['축', '묘'], 파살: '묘' },
  '기': { 겁살: '묘', 원진살: ['인', '축'], 파살: '진' },
  '경': { 겁살: '진', 원진살: ['묘', '사'], 파살: '사' },
  '신': { 겁살: '사', 원진살: ['진', '묘'], 파살: '오' },
  '임': { 겁살: '오', 원진살: ['사', '미'], 파살: '미' },
  '계': { 겁살: '미', 원진살: ['오', '사'], 파살: '신' },
};

// 띠로 나이 계산
const getZodiacYears = (zodiac: string): number[] => {
  const currentYear = new Date().getFullYear();
  const zodiacOrder = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];
  const baseYear = 2020; // 자년(쥐띠)
  const zodiacIndex = zodiacOrder.indexOf(zodiac);
  const years: number[] = [];

  for (let year = baseYear + zodiacIndex; year >= currentYear - 80; year -= 12) {
    if (year <= currentYear && year >= currentYear - 80) {
      years.push(year);
    }
  }
  for (let year = baseYear + zodiacIndex + 12; year <= currentYear; year += 12) {
    if (!years.includes(year)) {
      years.push(year);
    }
  }

  return years.sort((a, b) => b - a).slice(0, 7);
};

export default function GuiinResult({ formData, onReset, onBack }: GuiinResultProps) {
  // 사주 계산
  const result = calculateSaju({
    year: formData.year,
    month: formData.month,
    day: formData.day,
    hour: formData.timeUnknown ? 12 : formData.hour,
  }, formData.gender);

  const dayStem = result.day.stem.ko;
  const yearBranch = result.year.branch.ko;

  // 귀인 정보
  const guiinInfo = DAY_STEM_GUIIN[dayStem] || DAY_STEM_GUIIN['갑'];
  const akyeonInfo = DAY_STEM_AKYEON[dayStem] || DAY_STEM_AKYEON['갑'];

  // 내 띠
  const myZodiac = ZODIAC_ANIMALS[yearBranch] || ZODIAC_ANIMALS['자'];

  // 특정 사람 분석 (searchType === 'specific'인 경우)
  const analyzeSpecificPerson = () => {
    if (!formData.specificYear) return null;

    const specificYear = formData.specificYear;
    const yearIndex = (specificYear - 4) % 12;
    const branches = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];
    const specificBranch = branches[yearIndex];
    const specificZodiac = ZODIAC_ANIMALS[specificBranch];

    // 귀인인지 확인
    const isGuiin = guiinInfo.천을귀인.includes(specificBranch) ||
                    guiinInfo.문창귀인.includes(specificBranch) ||
                    guiinInfo.학당귀인.includes(specificBranch);

    // 악연인지 확인
    const isAkyeon = akyeonInfo.겁살 === specificBranch ||
                     akyeonInfo.원진살.includes(specificBranch) ||
                     akyeonInfo.파살 === specificBranch;

    // 호환성 확인
    const isCompatible = ZODIAC_ANIMALS[yearBranch]?.compatible.includes(specificBranch);
    const isIncompatible = ZODIAC_ANIMALS[yearBranch]?.incompatible.includes(specificBranch);

    let relationshipType = 'neutral';
    let description = '';

    if (isGuiin) {
      relationshipType = 'guiin';
      description = `${specificZodiac?.name}인 이 분은 당신에게 귀인입니다! 어려울 때 도움을 주고, 좋은 영향을 미치는 소중한 인연이에요.`;
    } else if (isAkyeon) {
      relationshipType = 'akyeon';
      description = `${specificZodiac?.name}인 이 분과는 조심해야 합니다. 깊은 관계보다는 적당한 거리를 유지하는 것이 좋아요.`;
    } else if (isCompatible) {
      relationshipType = 'compatible';
      description = `${specificZodiac?.name}인 이 분과는 잘 맞는 인연입니다. 함께 하면 시너지가 나는 좋은 관계예요.`;
    } else if (isIncompatible) {
      relationshipType = 'incompatible';
      description = `${specificZodiac?.name}인 이 분과는 부딪힐 수 있어요. 서로 이해하려는 노력이 필요한 관계입니다.`;
    } else {
      relationshipType = 'neutral';
      description = `${specificZodiac?.name}인 이 분과는 특별히 좋거나 나쁜 인연은 아닙니다. 서로의 노력에 따라 관계가 결정됩니다.`;
    }

    return { specificZodiac, relationshipType, description, isGuiin, isAkyeon, isCompatible };
  };

  const specificAnalysis = formData.searchType === 'specific' ? analyzeSpecificPerson() : null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const showGuiin = formData.searchType === 'guiin' || formData.searchType === 'both';
  const showAkyeon = formData.searchType === 'akyeon' || formData.searchType === 'both';

  return (
    <motion.div
      className="min-h-screen px-4 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-2xl mx-auto">
        {/* 헤더 */}
        <motion.div variants={itemVariants} className="flex justify-between items-center mb-6">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>메뉴로</span>
          </button>
          <button onClick={onReset} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <RefreshCw className="w-5 h-5" />
            <span>다시하기</span>
          </button>
        </motion.div>

        {/* 타이틀 */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg mb-4">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            {formData.name}님의 인연 분석
          </h1>
          <p className="text-emerald-400">
            일간: {dayStem} | 띠: {myZodiac.emoji} {myZodiac.name}
          </p>
        </motion.div>

        {/* 특정 사람 분석 결과 */}
        {formData.searchType === 'specific' && specificAnalysis && (
          <motion.div variants={itemVariants} className="glass rounded-3xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-bold text-white">그 사람과의 인연</h2>
            </div>
            <div className={`p-4 rounded-xl border ${
              specificAnalysis.relationshipType === 'guiin' ? 'bg-emerald-500/10 border-emerald-500/30' :
              specificAnalysis.relationshipType === 'akyeon' ? 'bg-red-500/10 border-red-500/30' :
              specificAnalysis.relationshipType === 'compatible' ? 'bg-blue-500/10 border-blue-500/30' :
              specificAnalysis.relationshipType === 'incompatible' ? 'bg-orange-500/10 border-orange-500/30' :
              'bg-slate-500/10 border-slate-500/30'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{specificAnalysis.specificZodiac?.emoji}</span>
                <div>
                  <div className="font-bold text-white">{specificAnalysis.specificZodiac?.name}</div>
                  <div className={`text-sm ${
                    specificAnalysis.relationshipType === 'guiin' ? 'text-emerald-400' :
                    specificAnalysis.relationshipType === 'akyeon' ? 'text-red-400' :
                    specificAnalysis.relationshipType === 'compatible' ? 'text-blue-400' :
                    specificAnalysis.relationshipType === 'incompatible' ? 'text-orange-400' :
                    'text-slate-400'
                  }`}>
                    {specificAnalysis.relationshipType === 'guiin' && '💎 귀인 관계'}
                    {specificAnalysis.relationshipType === 'akyeon' && '⚠️ 악연 관계'}
                    {specificAnalysis.relationshipType === 'compatible' && '💙 호환 관계'}
                    {specificAnalysis.relationshipType === 'incompatible' && '🔥 상충 관계'}
                    {specificAnalysis.relationshipType === 'neutral' && '⚖️ 보통 관계'}
                  </div>
                </div>
              </div>
              <p className="text-slate-300">{specificAnalysis.description}</p>
            </div>
          </motion.div>
        )}

        {/* 귀인 분석 */}
        {showGuiin && (
          <>
            {/* 천을귀인 */}
            <motion.div variants={itemVariants} className="glass rounded-3xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Crown className="w-6 h-6 text-yellow-400" />
                <h2 className="text-xl font-bold text-white">천을귀인 (天乙貴人)</h2>
              </div>
              <p className="text-slate-400 text-sm mb-4">{GUIIN_TYPES.천을귀인.description}</p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {guiinInfo.천을귀인.map((branch) => {
                  const zodiac = ZODIAC_ANIMALS[branch];
                  const years = getZodiacYears(branch);
                  return (
                    <div key={branch} className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-3xl">{zodiac?.emoji}</span>
                        <span className="font-bold text-yellow-400">{zodiac?.name}</span>
                      </div>
                      <div className="text-xs text-slate-400">
                        출생년도: {years.slice(0, 4).join(', ')}년생...
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="p-3 bg-slate-800/50 rounded-xl">
                <div className="text-sm text-slate-400">💡 이렇게 찾아보세요</div>
                <div className="text-white text-sm">{GUIIN_TYPES.천을귀인.howToFind}</div>
              </div>
            </motion.div>

            {/* 문창귀인 */}
            <motion.div variants={itemVariants} className="glass rounded-3xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-bold text-white">문창귀인 (文昌貴人)</h2>
              </div>
              <p className="text-slate-400 text-sm mb-4">{GUIIN_TYPES.문창귀인.description}</p>
              <div className="grid grid-cols-1 gap-3 mb-4">
                {guiinInfo.문창귀인.map((branch) => {
                  const zodiac = ZODIAC_ANIMALS[branch];
                  const years = getZodiacYears(branch);
                  return (
                    <div key={branch} className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-3xl">{zodiac?.emoji}</span>
                        <span className="font-bold text-purple-400">{zodiac?.name}</span>
                      </div>
                      <div className="text-xs text-slate-400">
                        출생년도: {years.slice(0, 5).join(', ')}년생...
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="p-3 bg-slate-800/50 rounded-xl">
                <div className="text-sm text-slate-400">📚 이런 분야에서 도움</div>
                <div className="text-white text-sm">학업, 시험, 자격증, 취업, 승진에 도움을 주는 귀인입니다.</div>
              </div>
            </motion.div>

            {/* 잘 맞는 띠 */}
            <motion.div variants={itemVariants} className="glass rounded-3xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Handshake className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl font-bold text-white">잘 맞는 띠</h2>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {myZodiac.compatible.map((branch) => {
                  const zodiac = ZODIAC_ANIMALS[branch];
                  return (
                    <div key={branch} className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/30 text-center">
                      <span className="text-2xl">{zodiac?.emoji}</span>
                      <div className="text-sm text-blue-400 mt-1">{zodiac?.name}</div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}

        {/* 악연 분석 */}
        {showAkyeon && (
          <>
            {/* 겁살 */}
            <motion.div variants={itemVariants} className="glass rounded-3xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                <h2 className="text-xl font-bold text-white">겁살 (劫煞) - 주의 필요</h2>
              </div>
              <p className="text-slate-400 text-sm mb-4">{AKYEON_TYPES.겁살.description}</p>
              <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/30 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl">{ZODIAC_ANIMALS[akyeonInfo.겁살]?.emoji}</span>
                  <span className="font-bold text-red-400">{ZODIAC_ANIMALS[akyeonInfo.겁살]?.name}</span>
                </div>
                <div className="text-xs text-slate-400">
                  출생년도: {getZodiacYears(akyeonInfo.겁살).slice(0, 5).join(', ')}년생...
                </div>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-xl">
                <div className="text-sm text-red-400 flex items-center gap-2">
                  <Shield className="w-4 h-4" /> 조심하세요
                </div>
                <div className="text-white text-sm">{AKYEON_TYPES.겁살.warning}</div>
              </div>
            </motion.div>

            {/* 원진살 */}
            <motion.div variants={itemVariants} className="glass rounded-3xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <UserX className="w-6 h-6 text-orange-400" />
                <h2 className="text-xl font-bold text-white">원진살 (怨嗔煞)</h2>
              </div>
              <p className="text-slate-400 text-sm mb-4">{AKYEON_TYPES.원진살.description}</p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {akyeonInfo.원진살.map((branch) => {
                  const zodiac = ZODIAC_ANIMALS[branch];
                  return (
                    <div key={branch} className="p-4 bg-orange-500/10 rounded-xl border border-orange-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{zodiac?.emoji}</span>
                        <span className="font-bold text-orange-400">{zodiac?.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="p-3 bg-slate-800/50 rounded-xl">
                <div className="text-sm text-slate-400">⚖️ 대처법</div>
                <div className="text-white text-sm">{AKYEON_TYPES.원진살.howToHandle}</div>
              </div>
            </motion.div>

            {/* 안 맞는 띠 */}
            <motion.div variants={itemVariants} className="glass rounded-3xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-yellow-500" />
                <h2 className="text-xl font-bold text-white">상충하는 띠</h2>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {myZodiac.incompatible.map((branch) => {
                  const zodiac = ZODIAC_ANIMALS[branch];
                  return (
                    <div key={branch} className="p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/30 text-center">
                      <span className="text-2xl">{zodiac?.emoji}</span>
                      <div className="text-sm text-yellow-400 mt-1">{zodiac?.name}</div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}

        {/* 인연 활용 팁 */}
        <motion.div variants={itemVariants} className="glass rounded-3xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Gift className="w-6 h-6 text-pink-400" />
            <h2 className="text-xl font-bold text-white">인연 활용 팁</h2>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-emerald-500/10 rounded-xl">
              <div className="text-sm text-emerald-400 flex items-center gap-2">
                <UserCheck className="w-4 h-4" /> 귀인 만나는 법
              </div>
              <div className="text-white text-sm">
                귀인띠의 사람이 많이 있는 모임, 동호회, 직장을 찾아보세요.
                먼저 다가가고 진심으로 대하면 귀인의 도움을 받을 수 있습니다.
              </div>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <div className="text-sm text-blue-400 flex items-center gap-2">
                <Clock className="w-4 h-4" /> 귀인 운이 강한 시기
              </div>
              <div className="text-white text-sm">
                귀인띠의 해(年), 월(月)에 좋은 만남이 있을 확률이 높습니다.
                중요한 미팅이나 면접은 이 시기에 잡으면 좋습니다.
              </div>
            </div>
            <div className="p-3 bg-orange-500/10 rounded-xl">
              <div className="text-sm text-orange-400 flex items-center gap-2">
                <Shield className="w-4 h-4" /> 악연 피하는 법
              </div>
              <div className="text-white text-sm">
                악연띠의 사람과는 깊은 금전 거래, 동업, 보증을 피하세요.
                적당한 거리를 유지하고, 감정적으로 휘말리지 않는 것이 좋습니다.
              </div>
            </div>
          </div>
        </motion.div>

        {/* 하단 버튼 */}
        <motion.div variants={itemVariants} className="flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 py-4 bg-slate-700 hover:bg-slate-600 rounded-2xl text-white font-medium transition-colors"
          >
            다른 메뉴 보기
          </button>
          <button
            onClick={onReset}
            className="flex-1 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl text-white font-medium hover:from-emerald-600 hover:to-teal-600 transition-all"
          >
            다시 분석하기
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
