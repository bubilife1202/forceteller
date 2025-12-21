'use client';

import { motion } from 'framer-motion';
import { Moon, ArrowLeft, RefreshCw, Coins, Heart, Briefcase, Activity, Star, Compass, Palette, Sparkles, Clock, TrendingUp, AlertTriangle, CheckCircle, XCircle, Zap, Users, Sunrise, Sun, Download, Mail, Home, Share2 } from 'lucide-react';
import { getDayPillar, getTenGod } from '@/lib/saju-calculator';
import { TomorrowFortuneFormData } from './TomorrowFortuneForm';
import { downloadElementAsHtml, sendByEmail, createSectionHtml, createScoreBadgeHtml, createGridHtml, createCardHtml, createListHtml, createMessageBoxHtml } from '@/lib/utils/export-utils';
import {
  elementColors,
  elementNumbers,
  elementDirections,
  elementFoods,
  zodiacAnimals,
  tenGodFortunes,
  getPrediction,
  getElementRelation,
  getZodiacCompatibility,
} from '@/lib/data/daily-fortune-data';

interface TomorrowFortuneResultProps {
  formData: TomorrowFortuneFormData;
  onReset: () => void;
  onBack: () => void;
  onHome?: () => void;
}

export default function TomorrowFortuneResult({ formData, onReset, onBack, onHome }: TomorrowFortuneResultProps) {
  // 사용자의 일주 계산
  const userDayPillar = getDayPillar(formData.year, formData.month, formData.day);
  const userDayStem = userDayPillar.stem;
  const userElement = userDayStem.element;

  // 사용자 띠 계산
  const userZodiacIndex = (formData.year - 4) % 12;
  const userZodiac = zodiacAnimals[userZodiacIndex];

  // 내일의 일주 계산
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowPillar = getDayPillar(tomorrow.getFullYear(), tomorrow.getMonth() + 1, tomorrow.getDate());
  const tomorrowStem = tomorrowPillar.stem;
  const tomorrowElement = tomorrowStem.element;

  // 십성 계산
  const tenGod = getTenGod(userDayStem.ko, tomorrowStem.ko);
  const fortune = tenGodFortunes[tenGod] || tenGodFortunes['비견'];

  // 오행 관계
  const elementRelation = getElementRelation(userElement, tomorrowElement);

  // 최종 점수 계산
  const finalScore = Math.min(100, Math.max(0, fortune.score + elementRelation.modifier));

  // 띠 궁합
  const zodiacCompat = getZodiacCompatibility(formData.year);

  // 용신 (부족한 오행 보충)
  const yongsinElement = userElement === '목' ? '수' :
                         userElement === '화' ? '목' :
                         userElement === '토' ? '화' :
                         userElement === '금' ? '토' : '금';

  // 내일 날짜 포맷
  const tomorrowStr = `${tomorrow.getFullYear()}년 ${tomorrow.getMonth() + 1}월 ${tomorrow.getDate()}일`;
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = dayNames[tomorrow.getDay()];

  // 점수에 따른 등급
  const getGrade = (score: number) => {
    if (score >= 90) return { grade: '대길', emoji: '🌟', color: 'text-yellow-400', bgColor: 'from-yellow-500/20 to-amber-500/20', borderColor: 'border-yellow-500/30' };
    if (score >= 80) return { grade: '길', emoji: '✨', color: 'text-green-400', bgColor: 'from-green-500/20 to-emerald-500/20', borderColor: 'border-green-500/30' };
    if (score >= 70) return { grade: '소길', emoji: '🌙', color: 'text-blue-400', bgColor: 'from-blue-500/20 to-indigo-500/20', borderColor: 'border-blue-500/30' };
    if (score >= 60) return { grade: '평', emoji: '☁️', color: 'text-slate-400', bgColor: 'from-slate-500/20 to-gray-500/20', borderColor: 'border-slate-500/30' };
    return { grade: '주의', emoji: '⚡', color: 'text-orange-400', bgColor: 'from-orange-500/20 to-red-500/20', borderColor: 'border-orange-500/30' };
  };

  const gradeInfo = getGrade(finalScore);

  // 시간대별 운세 계산
  const getTimeBasedFortune = () => {
    const baseScore = finalScore;
    return {
      morning: { score: Math.min(100, baseScore + (tenGod === '정인' ? 15 : tenGod === '식신' ? -5 : 5)), time: '오전 6시~12시', icon: Sunrise },
      afternoon: { score: Math.min(100, baseScore + (tenGod === '편재' ? 15 : tenGod === '편관' ? -10 : 0)), time: '오후 12시~6시', icon: Sun },
      evening: { score: Math.min(100, baseScore + (tenGod === '편인' ? 15 : tenGod === '겁재' ? -5 : -3)), time: '오후 6시~12시', icon: Moon },
    };
  };

  const timeFortune = getTimeBasedFortune();

  // HTML 다운로드 함수 - 화면 그대로 저장
  const handleDownloadHtml = () => {
    downloadElementAsHtml('tomorrow-fortune-result', `내일의운세_${tomorrowStr.replace(/\s/g, '_')}_${userDayStem.ko}일간`);
  };

  // 이메일 전송 함수
  const handleSendEmail = () => {
    const subject = `[ForceTeller] ${tomorrowStr} 내일의 운세 - ${userDayStem.ko}일간`;
    const body = `
━━━━━━━━━━━━━━━━━━━━
🌙 ${tomorrowStr} 내일의 운세
${userZodiac}띠 • ${userDayStem.ko}일간 (${userElement} 오행)
━━━━━━━━━━━━━━━━━━━━

📊 종합 운세: ${finalScore}점 (${gradeInfo.grade})
키워드: #${fortune.keyword}

━━ 분야별 운세 ━━
💰 재물운: ${fortune.money.score}점
💕 애정운: ${fortune.love.score}점
💼 직장운: ${fortune.work.score}점
🏃 건강운: ${fortune.health.score}점
👥 대인운: ${fortune.social.score}점

━━ 내일 하면 좋은 일 ━━
${fortune.doList.map(item => `✓ ${item}`).join('\n')}

━━ 내일 피해야 할 일 ━━
${fortune.dontList.map(item => `✗ ${item}`).join('\n')}

━━ 행운 아이템 ━━
🎨 행운의 색: ${elementColors[yongsinElement]?.name}
🔢 행운의 숫자: ${elementNumbers[yongsinElement]?.join(', ')}
🧭 행운의 방향: ${elementDirections[yongsinElement]}
⏰ 행운의 시간: ${fortune.luckyTime}

━━ 내일의 메시지 ━━
${getPrediction(tenGod, formData.year, formData.month, formData.day)}

━━━━━━━━━━━━━━━━━━━━
ForceTeller - AI 운세 서비스
    `.trim();

    sendByEmail(subject, body);
  };

  // 카카오톡 공유 함수
  const handleKakaoShare = () => {
    const shareUrl = window.location.href;
    const shareText = `🌙 ${tomorrowStr} 내일의 운세\n\n${gradeInfo.grade} (${finalScore}점)\n#${fortune.keyword}\n\n나도 운세 보러가기 👉`;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const kakao = (window as any).Kakao;
    if (typeof window !== 'undefined' && kakao) {
      kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: `🌙 ${tomorrowStr} 내일의 운세`,
          description: `${gradeInfo.grade} (${finalScore}점) - ${fortune.keyword}`,
          imageUrl: 'https://forceteller.vercel.app/og-image.png',
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
        buttons: [
          {
            title: '나도 운세 보기',
            link: {
              mobileWebUrl: shareUrl,
              webUrl: shareUrl,
            },
          },
        ],
      });
    } else {
      if (navigator.share) {
        navigator.share({
          title: `🌙 ${tomorrowStr} 내일의 운세`,
          text: shareText,
          url: shareUrl,
        });
      } else {
        alert('카카오톡 공유 기능을 사용하려면 모바일 앱에서 접속해주세요.');
      }
    }
  };

  // 홈으로 이동
  const handleGoHome = () => {
    if (onHome) {
      onHome();
    } else {
      onBack();
    }
  };

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

  // 점수 바 컴포넌트
  const ScoreBar = ({ score, color }: { score: number; color: string }) => (
    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
      <motion.div
        className={`h-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${score}%` }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
    </div>
  );

  return (
    <motion.div
      id="tomorrow-fortune-result"
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
        <motion.div variants={itemVariants} className="text-center mb-6">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center shadow-lg mb-4">
            <Moon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            내일의 운세
          </h1>
          <p className="text-purple-400">{tomorrowStr} ({dayOfWeek}요일)</p>
          <p className="text-slate-500 text-sm mt-1">{userZodiac}띠 • {userDayStem.ko}일간</p>
        </motion.div>

        {/* 총운 점수 카드 */}
        <motion.div
          variants={itemVariants}
          className={`bg-gradient-to-br ${gradeInfo.bgColor} border ${gradeInfo.borderColor} rounded-3xl p-6 mb-4`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-5xl">{gradeInfo.emoji}</span>
              <div>
                <div className={`text-4xl font-bold ${gradeInfo.color}`}>
                  {finalScore}점
                </div>
                <div className={`text-xl font-medium ${gradeInfo.color}`}>
                  {gradeInfo.grade}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-slate-400 text-sm">내일의 키워드</div>
              <div className="text-2xl font-bold text-white">#{fortune.keyword}</div>
            </div>
          </div>

          {/* 일간 정보 */}
          <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-xl">
            <div className="text-center">
              <span className="text-slate-400 text-xs">내 일간</span>
              <div className={`text-lg font-bold ${elementColors[userElement]?.text}`}>
                {userDayStem.ko}({userElement})
              </div>
            </div>
            <div className="text-2xl text-slate-500">⟷</div>
            <div className="text-center">
              <span className="text-slate-400 text-xs">내일 일간</span>
              <div className={`text-lg font-bold ${elementColors[tomorrowElement]?.text}`}>
                {tomorrowStem.ko}({tomorrowElement})
              </div>
            </div>
            <div className="text-center">
              <span className="text-slate-400 text-xs">관계</span>
              <div className="text-lg font-bold text-purple-400">{tenGod}</div>
            </div>
          </div>

          <p className="text-slate-300 text-sm text-center mt-3">
            {elementRelation.description}
          </p>
        </motion.div>

        {/* 시간대별 운세 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-5 mb-4">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-400" />
            시간대별 운세
          </h2>

          <div className="space-y-3">
            {Object.entries(timeFortune).map(([key, data]) => {
              const Icon = data.icon;
              const timeGrade = getGrade(data.score);
              return (
                <div key={key} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl">
                  <Icon className={`w-6 h-6 ${key === 'morning' ? 'text-orange-400' : key === 'afternoon' ? 'text-yellow-400' : 'text-indigo-400'}`} />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-slate-300 text-sm">{data.time}</span>
                      <span className={`font-bold ${timeGrade.color}`}>{data.score}점</span>
                    </div>
                    <ScoreBar score={data.score} color={data.score >= 80 ? 'bg-green-500' : data.score >= 60 ? 'bg-amber-500' : 'bg-orange-500'} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 p-3 bg-emerald-500/10 rounded-xl">
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium mb-1">
              <CheckCircle className="w-4 h-4" />
              행운의 시간: {fortune.luckyTime}
            </div>
            <div className="flex items-center gap-2 text-orange-400 text-sm">
              <AlertTriangle className="w-4 h-4" />
              주의 시간: {fortune.unluckyTime}
            </div>
          </div>
        </motion.div>

        {/* 분야별 상세 운세 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-5 mb-4">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            분야별 상세 운세
          </h2>

          <div className="space-y-4">
            {/* 재물운 */}
            <div className="p-4 bg-slate-800/50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-400 font-medium">재물운</span>
                </div>
                <span className="text-yellow-400 font-bold">{fortune.money.score}점</span>
              </div>
              <ScoreBar score={fortune.money.score} color="bg-yellow-500" />
              <p className="text-slate-300 text-sm mt-2">{fortune.money.detail}</p>
              <div className="mt-2 flex items-center gap-2 text-amber-300 text-xs">
                <Zap className="w-3 h-3" />
                <span>TIP: {fortune.money.tip}</span>
              </div>
            </div>

            {/* 애정운 */}
            <div className="p-4 bg-slate-800/50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-pink-400" />
                  <span className="text-pink-400 font-medium">애정운</span>
                </div>
                <span className="text-pink-400 font-bold">{fortune.love.score}점</span>
              </div>
              <ScoreBar score={fortune.love.score} color="bg-pink-500" />
              <p className="text-slate-300 text-sm mt-2">{fortune.love.detail}</p>
              <div className="mt-2 flex items-center gap-2 text-pink-300 text-xs">
                <Zap className="w-3 h-3" />
                <span>TIP: {fortune.love.tip}</span>
              </div>
            </div>

            {/* 직장/학업운 */}
            <div className="p-4 bg-slate-800/50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-400" />
                  <span className="text-blue-400 font-medium">직장/학업운</span>
                </div>
                <span className="text-blue-400 font-bold">{fortune.work.score}점</span>
              </div>
              <ScoreBar score={fortune.work.score} color="bg-blue-500" />
              <p className="text-slate-300 text-sm mt-2">{fortune.work.detail}</p>
              <div className="mt-2 flex items-center gap-2 text-blue-300 text-xs">
                <Zap className="w-3 h-3" />
                <span>TIP: {fortune.work.tip}</span>
              </div>
            </div>

            {/* 건강운 */}
            <div className="p-4 bg-slate-800/50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-medium">건강운</span>
                </div>
                <span className="text-green-400 font-bold">{fortune.health.score}점</span>
              </div>
              <ScoreBar score={fortune.health.score} color="bg-green-500" />
              <p className="text-slate-300 text-sm mt-2">{fortune.health.detail}</p>
              <div className="mt-2 flex items-center gap-2 text-green-300 text-xs">
                <Zap className="w-3 h-3" />
                <span>TIP: {fortune.health.tip}</span>
              </div>
            </div>

            {/* 대인운 */}
            <div className="p-4 bg-slate-800/50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-400" />
                  <span className="text-purple-400 font-medium">대인운</span>
                </div>
                <span className="text-purple-400 font-bold">{fortune.social.score}점</span>
              </div>
              <ScoreBar score={fortune.social.score} color="bg-purple-500" />
              <p className="text-slate-300 text-sm mt-2">{fortune.social.detail}</p>
            </div>
          </div>
        </motion.div>

        {/* 내일 이것만은! */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-5 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 하면 좋은 일 */}
            <div className="bg-emerald-500/10 rounded-2xl p-4">
              <h3 className="text-emerald-400 font-bold mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                내일 하면 좋은 일
              </h3>
              <ul className="space-y-2">
                {fortune.doList.map((item, i) => (
                  <li key={i} className="text-slate-200 flex items-center gap-2">
                    <span className="text-emerald-400 flex-shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 피해야 할 일 */}
            <div className="bg-red-500/10 rounded-2xl p-4">
              <h3 className="text-red-400 font-bold mb-3 flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                내일 피해야 할 일
              </h3>
              <ul className="space-y-2">
                {fortune.dontList.map((item, i) => (
                  <li key={i} className="text-slate-200 flex items-center gap-2">
                    <span className="text-red-400 flex-shrink-0">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* 띠별 궁합 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-5 mb-4">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            🐲 내일의 띠별 궁합
          </h2>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-emerald-500/10 rounded-xl p-3">
              <div className="text-emerald-400 text-sm font-medium mb-2">잘 맞는 띠</div>
              <div className="flex gap-2">
                {zodiacCompat.good.map((animal, i) => (
                  <span key={i} className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-sm rounded-full">
                    {animal}띠
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-red-500/10 rounded-xl p-3">
              <div className="text-red-400 text-sm font-medium mb-2">조심할 띠</div>
              <div className="flex gap-2">
                {zodiacCompat.bad.map((animal, i) => (
                  <span key={i} className="px-3 py-1 bg-red-500/20 text-red-300 text-sm rounded-full">
                    {animal}띠
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 행운의 아이템 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-5 mb-4">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            내일의 행운 아이템
          </h2>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="text-center p-4 bg-slate-800/50 rounded-xl">
              <Palette className="w-6 h-6 mx-auto mb-2" style={{ color: elementColors[yongsinElement]?.hex }} />
              <div className="text-slate-400 text-xs">행운의 색</div>
              <div className={`font-bold ${elementColors[yongsinElement]?.text}`}>
                {elementColors[yongsinElement]?.name}
              </div>
            </div>

            <div className="text-center p-4 bg-slate-800/50 rounded-xl">
              <div className="text-2xl mb-2">🔢</div>
              <div className="text-slate-400 text-xs">행운의 숫자</div>
              <div className="text-purple-400 font-bold">
                {elementNumbers[yongsinElement]?.join(', ')}
              </div>
            </div>

            <div className="text-center p-4 bg-slate-800/50 rounded-xl">
              <Compass className="w-6 h-6 mx-auto text-cyan-400 mb-2" />
              <div className="text-slate-400 text-xs">행운의 방향</div>
              <div className="text-cyan-400 font-bold">
                {elementDirections[yongsinElement]}
              </div>
            </div>

            <div className="text-center p-4 bg-slate-800/50 rounded-xl">
              <div className="text-2xl mb-2">🍽️</div>
              <div className="text-slate-400 text-xs">행운의 음식</div>
              <div className="text-green-400 font-bold text-sm">
                {elementFoods[yongsinElement]?.[0]}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 내일의 메시지 */}
        <motion.div
          variants={itemVariants}
          className="relative overflow-hidden rounded-3xl p-6 mb-6"
          style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(168, 85, 247, 0.3) 50%, rgba(192, 132, 252, 0.2) 100%)',
            border: '2px solid rgba(168, 85, 247, 0.4)',
          }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-400/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <h2 className="text-lg font-bold text-purple-300 mb-3 flex items-center gap-2">
              <Star className="w-5 h-5" />
              내일의 메시지
            </h2>
            <p className="text-white text-xl leading-relaxed font-bold">
              {getPrediction(tenGod, formData.year, formData.month, formData.day)}
            </p>
          </div>
        </motion.div>

        {/* 내보내기 버튼 */}
        <motion.div variants={itemVariants} className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={handleDownloadHtml}
              className="flex items-center justify-center gap-2 py-3 px-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-white font-medium hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg"
            >
              <Download className="w-5 h-5" />
              <span>저장</span>
            </button>
            <button
              onClick={handleSendEmail}
              className="flex items-center justify-center gap-2 py-3 px-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white font-medium hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg"
            >
              <Mail className="w-5 h-5" />
              <span>메일</span>
            </button>
            <button
              onClick={handleKakaoShare}
              className="flex items-center justify-center gap-2 py-3 px-3 bg-yellow-500 rounded-xl text-black font-medium hover:bg-yellow-400 transition-colors shadow-lg"
            >
              <Share2 className="w-5 h-5" />
              <span>카톡</span>
            </button>
          </div>

          <button
            onClick={onReset}
            className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl text-white font-bold text-lg hover:from-indigo-600 hover:to-purple-700 transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <RefreshCw className="w-5 h-5" />
            다시 보기
          </button>

          <button
            onClick={handleGoHome}
            className="w-full py-3 bg-slate-700/50 rounded-2xl text-slate-300 font-medium hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            홈으로
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
