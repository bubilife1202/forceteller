'use client';

import { motion } from 'framer-motion';
import { Sun, ArrowLeft, RefreshCw, Coins, Heart, Briefcase, Activity, Star, Compass, Palette, Sparkles } from 'lucide-react';
import { getDayPillar, getTenGod } from '@/lib/saju-calculator';
import { DailyFortuneFormData } from './DailyFortuneForm';

interface DailyFortuneResultProps {
  formData: DailyFortuneFormData;
  onReset: () => void;
  onBack: () => void;
}

// 오행별 색상
const elementColors: Record<string, { bg: string; text: string; name: string }> = {
  '목': { bg: 'from-green-500 to-emerald-600', text: 'text-green-400', name: '초록색' },
  '화': { bg: 'from-red-500 to-rose-600', text: 'text-red-400', name: '빨간색' },
  '토': { bg: 'from-yellow-500 to-amber-600', text: 'text-yellow-400', name: '노란색' },
  '금': { bg: 'from-slate-300 to-gray-400', text: 'text-slate-300', name: '흰색/금색' },
  '수': { bg: 'from-blue-500 to-indigo-600', text: 'text-blue-400', name: '검정색/파란색' },
};

// 오행별 행운의 숫자
const elementNumbers: Record<string, number[]> = {
  '목': [3, 8],
  '화': [2, 7],
  '토': [5, 10],
  '금': [4, 9],
  '수': [1, 6],
};

// 오행별 방향
const elementDirections: Record<string, string> = {
  '목': '동쪽',
  '화': '남쪽',
  '토': '중앙',
  '금': '서쪽',
  '수': '북쪽',
};

// 십성별 운세 해석
const tenGodFortunes: Record<string, { score: number; money: string; love: string; work: string; health: string; advice: string }> = {
  '비견': {
    score: 70,
    money: '경쟁이 있지만 협력하면 이득',
    love: '친구 같은 관계, 편안함',
    work: '동료와 협력이 중요한 날',
    health: '적당한 운동이 좋음',
    advice: '나누면 더 커지는 날입니다',
  },
  '겁재': {
    score: 55,
    money: '지출 주의, 투자 보류',
    love: '삼각관계 조심',
    work: '경쟁자 출현 가능',
    health: '과로 주의',
    advice: '욕심을 버리면 평안해집니다',
  },
  '식신': {
    score: 85,
    money: '꾸준한 수입, 안정적',
    love: '즐거운 만남, 데이트 좋음',
    work: '창의력 발휘, 아이디어 좋음',
    health: '건강 양호, 식욕 좋음',
    advice: '여유롭게 즐기는 하루 되세요',
  },
  '상관': {
    score: 65,
    money: '변동 있음, 유흥비 주의',
    love: '솔직한 표현이 필요',
    work: '기존 틀을 깨는 시도 가능',
    health: '스트레스 관리 필요',
    advice: '말조심, 행동조심하세요',
  },
  '편재': {
    score: 80,
    money: '횡재수, 투자 기회',
    love: '새로운 인연 가능',
    work: '사업 확장 기회',
    health: '활력 넘침',
    advice: '기회를 놓치지 마세요',
  },
  '정재': {
    score: 90,
    money: '정당한 수입, 재테크 좋음',
    love: '안정적인 관계 발전',
    work: '승진, 성과 인정',
    health: '규칙적인 생활 유지',
    advice: '성실함이 보상받는 날입니다',
  },
  '편관': {
    score: 60,
    money: '예상치 못한 지출',
    love: '갈등 조심, 대화 필요',
    work: '상사와의 마찰 주의',
    health: '스트레스성 증상 주의',
    advice: '참고 인내하면 좋은 결과가',
  },
  '정관': {
    score: 75,
    money: '계획적 지출이 좋음',
    love: '책임감 있는 만남',
    work: '공식적인 일 처리 유리',
    health: '무난한 컨디션',
    advice: '원칙을 지키면 좋은 하루',
  },
  '편인': {
    score: 70,
    money: '학습 투자 좋음',
    love: '정신적 교감 중요',
    work: '새로운 배움의 기회',
    health: '정신 건강 챙기기',
    advice: '배움에 집중하는 하루 되세요',
  },
  '정인': {
    score: 85,
    money: '어른의 도움, 지원 가능',
    love: '따뜻한 관계, 위로',
    work: '멘토의 조언이 도움됨',
    health: '심신 안정',
    advice: '감사하는 마음이 복을 부릅니다',
  },
};

// 오행 상생상극 관계
function getElementRelation(userElement: string, todayElement: string): { type: string; description: string; modifier: number } {
  const order = ['목', '화', '토', '금', '수'];
  const userIdx = order.indexOf(userElement);
  const todayIdx = order.indexOf(todayElement);

  if (userElement === todayElement) {
    return { type: '비화', description: '같은 기운으로 안정적', modifier: 0 };
  }

  // 오늘이 나를 생해주는 관계 (좋음)
  if ((todayIdx + 1) % 5 === userIdx) {
    return { type: '상생(받음)', description: '오늘의 기운이 나를 도움', modifier: 10 };
  }

  // 내가 오늘을 생해주는 관계 (소모)
  if ((userIdx + 1) % 5 === todayIdx) {
    return { type: '상생(줌)', description: '에너지 소모가 있음', modifier: -5 };
  }

  // 오늘이 나를 극하는 관계 (어려움)
  if ((todayIdx + 2) % 5 === userIdx) {
    return { type: '상극(받음)', description: '시련이 있을 수 있음', modifier: -10 };
  }

  // 내가 오늘을 극하는 관계 (노력 필요)
  if ((userIdx + 2) % 5 === todayIdx) {
    return { type: '상극(줌)', description: '노력하면 성과 있음', modifier: 5 };
  }

  return { type: '무관', description: '보통', modifier: 0 };
}

export default function DailyFortuneResult({ formData, onReset, onBack }: DailyFortuneResultProps) {
  // 사용자의 일주 계산
  const userDayPillar = getDayPillar(formData.year, formData.month, formData.day);
  const userDayStem = userDayPillar.stem;
  const userElement = userDayStem.element;

  // 오늘의 일주 계산
  const today = new Date();
  const todayPillar = getDayPillar(today.getFullYear(), today.getMonth() + 1, today.getDate());
  const todayStem = todayPillar.stem;
  const todayElement = todayStem.element;

  // 십성 계산
  const tenGod = getTenGod(userDayStem.ko, todayStem.ko);
  const fortune = tenGodFortunes[tenGod] || tenGodFortunes['비견'];

  // 오행 관계
  const elementRelation = getElementRelation(userElement, todayElement);

  // 최종 점수 계산
  const finalScore = Math.min(100, Math.max(0, fortune.score + elementRelation.modifier));

  // 용신 (부족한 오행 보충)
  const yongsinElement = userElement === '목' ? '수' :
                         userElement === '화' ? '목' :
                         userElement === '토' ? '화' :
                         userElement === '금' ? '토' : '금';

  // 오늘 날짜 포맷
  const todayStr = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

  // 점수에 따른 등급
  const getGrade = (score: number) => {
    if (score >= 90) return { grade: '대길', emoji: '🌟', color: 'text-yellow-400' };
    if (score >= 80) return { grade: '길', emoji: '✨', color: 'text-green-400' };
    if (score >= 70) return { grade: '소길', emoji: '🌙', color: 'text-blue-400' };
    if (score >= 60) return { grade: '평', emoji: '☁️', color: 'text-slate-400' };
    return { grade: '주의', emoji: '⚡', color: 'text-orange-400' };
  };

  const gradeInfo = getGrade(finalScore);

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
      <div className="max-w-md mx-auto">
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
        <motion.div variants={itemVariants} className="text-center mb-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg mb-3">
            <Sun className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            오늘의 운세
          </h1>
          <p className="text-amber-400 text-sm">{todayStr}</p>
        </motion.div>

        {/* 총운 점수 */}
        <motion.div
          variants={itemVariants}
          className="glass-strong rounded-3xl p-6 mb-4 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-4xl">{gradeInfo.emoji}</span>
            <div>
              <div className={`text-3xl font-bold ${gradeInfo.color}`}>
                {finalScore}점
              </div>
              <div className={`text-lg font-medium ${gradeInfo.color}`}>
                {gradeInfo.grade}
              </div>
            </div>
            <span className="text-4xl">{gradeInfo.emoji}</span>
          </div>

          {/* 일간 정보 */}
          <div className="flex justify-center gap-4 text-sm">
            <div className="px-3 py-1 bg-slate-700/50 rounded-full">
              <span className="text-slate-400">내 일간:</span>
              <span className={`ml-1 font-bold ${elementColors[userElement]?.text}`}>
                {userDayStem.ko}({userElement})
              </span>
            </div>
            <div className="px-3 py-1 bg-slate-700/50 rounded-full">
              <span className="text-slate-400">오늘:</span>
              <span className={`ml-1 font-bold ${elementColors[todayElement]?.text}`}>
                {todayStem.ko}({todayElement})
              </span>
            </div>
          </div>

          <p className="text-slate-400 text-sm mt-3">
            오늘은 <span className="text-amber-300 font-medium">{tenGod}</span>의 기운 • {elementRelation.description}
          </p>
        </motion.div>

        {/* 분야별 운세 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-5 mb-4">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-400" />
            분야별 운세
          </h2>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-xl">
              <Coins className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-yellow-400 text-sm font-medium">재물운</div>
                <div className="text-slate-300 text-sm">{fortune.money}</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-xl">
              <Heart className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-pink-400 text-sm font-medium">애정운</div>
                <div className="text-slate-300 text-sm">{fortune.love}</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-xl">
              <Briefcase className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-blue-400 text-sm font-medium">직장/학업운</div>
                <div className="text-slate-300 text-sm">{fortune.work}</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-xl">
              <Activity className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-green-400 text-sm font-medium">건강운</div>
                <div className="text-slate-300 text-sm">{fortune.health}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 행운의 아이템 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-5 mb-4">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            오늘의 행운
          </h2>

          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-slate-800/50 rounded-xl">
              <Palette className="w-5 h-5 mx-auto text-purple-400 mb-1" />
              <div className="text-slate-400 text-xs">행운의 색</div>
              <div className={`font-bold text-sm ${elementColors[yongsinElement]?.text}`}>
                {elementColors[yongsinElement]?.name}
              </div>
            </div>

            <div className="text-center p-3 bg-slate-800/50 rounded-xl">
              <div className="text-xl mb-1">🔢</div>
              <div className="text-slate-400 text-xs">행운의 숫자</div>
              <div className="text-amber-400 font-bold text-sm">
                {elementNumbers[yongsinElement]?.join(', ')}
              </div>
            </div>

            <div className="text-center p-3 bg-slate-800/50 rounded-xl">
              <Compass className="w-5 h-5 mx-auto text-cyan-400 mb-1" />
              <div className="text-slate-400 text-xs">행운의 방향</div>
              <div className="text-cyan-400 font-bold text-sm">
                {elementDirections[yongsinElement]}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 오늘의 조언 */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-3xl p-5 mb-6"
        >
          <h2 className="text-lg font-bold text-amber-300 mb-2 flex items-center gap-2">
            💬 오늘의 한마디
          </h2>
          <p className="text-white text-lg leading-relaxed">
            &ldquo;{fortune.advice}&rdquo;
          </p>
        </motion.div>

        {/* 버튼 */}
        <motion.div variants={itemVariants} className="flex gap-3">
          <button
            onClick={onReset}
            className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-white font-medium transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            다시 보기
          </button>
          <button
            onClick={onBack}
            className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl text-white font-medium hover:from-amber-600 hover:to-orange-700 transition-all"
          >
            다른 운세 보기
          </button>
        </motion.div>

        {/* 안내 */}
        <motion.p variants={itemVariants} className="text-slate-500 text-xs text-center mt-4">
          일간 오행과 오늘의 천간 관계를 기반으로 분석한 운세입니다
        </motion.p>
      </div>
    </motion.div>
  );
}
