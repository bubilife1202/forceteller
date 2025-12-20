'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, Share2, RotateCcw, Heart, Briefcase, Wallet, Activity, Star, Download, Mail, Home } from 'lucide-react';
import { TarotFormData } from './TarotForm';
import { downloadAsHtml, sendByEmail } from '@/lib/utils/export-utils';
import { majorArcana, type TarotCard } from '@/lib/data/tarot-data';

interface TarotResultProps {
  formData: TarotFormData;
  onReset: () => void;
  onBack: () => void;
  onHome?: () => void;
}

export default function TarotResult({ formData, onReset, onBack, onHome }: TarotResultProps) {
  const [stage, setStage] = useState<'shuffling' | 'picking' | 'revealing' | 'result'>('shuffling');
  const [selectedCard, setSelectedCard] = useState<typeof majorArcana[0] | null>(null);
  const [isReversed, setIsReversed] = useState(false);
  const [displayedCards, setDisplayedCards] = useState<number[]>([]);

  // 홈으로 이동
  const handleGoHome = () => {
    if (onHome) {
      onHome();
    } else {
      onBack();
    }
  };

  // HTML 다운로드 함수
  const handleDownloadHtml = () => {
    if (!selectedCard) return;
    const today = new Date();
    const dateStr = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

    const htmlContent = `
      <div class="header">
        <h1>🃏 오늘의 타로 리딩</h1>
        <p>${dateStr} • ${selectedCard.name}${isReversed ? ' (역방향)' : ' (정방향)'}</p>
      </div>

      <div class="section">
        <h2 class="section-title">${selectedCard.emoji} ${selectedCard.name}</h2>
        <p style="text-align: center; color: #a78bfa; margin-bottom: 16px; font-size: 1.1rem;">
          ✨ 키워드: ${selectedCard.keywords.join(' • ')}
        </p>
        <div style="background: rgba(251,191,36,0.1); padding: 20px; border-radius: 12px; text-align: center; margin-top: 16px;">
          <p style="color: #fbbf24; font-size: 1.2rem; font-weight: bold;">"${selectedCard.advice}"</p>
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">🔮 종합 메시지</h2>
        <p style="line-height: 1.8;">${selectedCard.meaning.general}</p>
      </div>

      <div class="section">
        <h2 class="section-title">💕 연애운</h2>
        <p style="line-height: 1.8;">${selectedCard.meaning.love}</p>
      </div>

      <div class="section">
        <h2 class="section-title">💰 재물운</h2>
        <p style="line-height: 1.8;">${selectedCard.meaning.money}</p>
      </div>

      <div class="section">
        <h2 class="section-title">💼 직장/사업운</h2>
        <p style="line-height: 1.8;">${selectedCard.meaning.work}</p>
      </div>

      <div class="section">
        <h2 class="section-title">🏃 건강운</h2>
        <p style="line-height: 1.8;">${selectedCard.meaning.health}</p>
      </div>

      ${isReversed ? `
      <div class="section" style="border: 2px solid rgba(239,68,68,0.3); background: rgba(239,68,68,0.1);">
        <h2 class="section-title" style="color: #f87171;">🔄 역방향 특별 메시지</h2>
        <p style="line-height: 1.8;">${selectedCard.reversed}</p>
        <p style="margin-top: 12px; color: #94a3b8; font-size: 0.9rem;">역방향 카드는 에너지의 막힘이나 내면으로 향한 에너지를 의미합니다. 이 메시지에 특별히 귀 기울여 주세요.</p>
      </div>
      ` : ''}

      <div class="section">
        <h2 class="section-title">📝 오늘의 실천 포인트</h2>
        <ul>
          <li><span class="check">✓</span><span>카드의 핵심 키워드 "${selectedCard.keywords[0]}"을(를) 하루 동안 의식하기</span></li>
          <li><span class="check">✓</span><span>조언 메시지를 메모해두고 수시로 되새기기</span></li>
          <li><span class="check">✓</span><span>오늘 중요한 결정이 있다면 카드의 메시지 참고하기</span></li>
        </ul>
      </div>
    `;
    downloadAsHtml(htmlContent, `타로리딩_${dateStr.replace(/\s/g, '_')}_${selectedCard.name.replace(/[()]/g, '').replace(/\s/g, '')}`);
  };

  // 이메일 전송 함수
  const handleSendEmail = () => {
    if (!selectedCard) return;
    const subject = `[ForceTeller] 오늘의 타로 - ${selectedCard.name}`;
    const body = `
━━━━━━━━━━━━━━━━━━━━
🃏 오늘의 타로
${selectedCard.name}${isReversed ? ' (역방향)' : ''}
━━━━━━━━━━━━━━━━━━━━

${selectedCard.emoji} 키워드: ${selectedCard.keywords.join(', ')}

🔮 메시지:
${selectedCard.meaning.general}

💡 조언:
${selectedCard.advice}

${isReversed ? `🔄 역방향 메시지:
${selectedCard.reversed}` : ''}

━━━━━━━━━━━━━━━━━━━━
ForceTeller - AI 운세 서비스
    `.trim();
    sendByEmail(subject, body);
  };

  // 카드 섞기 애니메이션
  useEffect(() => {
    // 3개의 랜덤 카드 선택 (사용자에게 선택권 제공)
    const shuffled = [...Array(22).keys()].sort(() => Math.random() - 0.5).slice(0, 3);

    const timer = setTimeout(() => {
      setDisplayedCards(shuffled);
      setStage('picking');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // 카드 선택 핸들러
  const handleCardPick = (cardIndex: number) => {
    const card = majorArcana[cardIndex];
    const reversed = Math.random() < 0.3; // 30% 확률로 역방향

    setSelectedCard(card);
    setIsReversed(reversed);
    setStage('revealing');

    setTimeout(() => {
      setStage('result');
    }, 1500);
  };

  // 카테고리에 따른 메시지 가져오기
  const getCategoryMessage = () => {
    if (!selectedCard) return '';
    switch (formData.category) {
      case 'love': return selectedCard.meaning.love;
      case 'money': return selectedCard.meaning.money;
      case 'work': return selectedCard.meaning.work;
      case 'health': return selectedCard.meaning.health;
      default: return selectedCard.meaning.general;
    }
  };

  const getCategoryIcon = () => {
    switch (formData.category) {
      case 'love': return <Heart className="w-5 h-5" />;
      case 'money': return <Wallet className="w-5 h-5" />;
      case 'work': return <Briefcase className="w-5 h-5" />;
      case 'health': return <Activity className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  const getCategoryName = () => {
    switch (formData.category) {
      case 'love': return '연애/애정운';
      case 'money': return '재물/금전운';
      case 'work': return '직장/사업운';
      case 'health': return '건강/컨디션';
      default: return '오늘의 운세';
    }
  };

  // 카카오톡 공유 함수
  const handleKakaoShare = () => {
    if (!selectedCard) return;

    const shareUrl = window.location.href;
    const shareText = `🃏 오늘의 타로: ${selectedCard.name}\n\n"${selectedCard.advice}"\n\n나도 타로 보러가기 👉`;

    // 카카오톡 공유 링크 생성
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const kakao = (window as any).Kakao;
    if (typeof window !== 'undefined' && kakao) {
      kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: `🃏 오늘의 타로: ${selectedCard.name}`,
          description: selectedCard.advice,
          imageUrl: 'https://forceteller.vercel.app/og-image.png',
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
        buttons: [
          {
            title: '나도 타로 보기',
            link: {
              mobileWebUrl: shareUrl,
              webUrl: shareUrl,
            },
          },
        ],
      });
    } else {
      // 카카오톡 SDK가 없으면 일반 공유
      if (navigator.share) {
        navigator.share({
          title: `🃏 오늘의 타로: ${selectedCard.name}`,
          text: shareText,
          url: shareUrl,
        });
      } else {
        alert('카카오톡 공유 기능을 사용하려면 모바일 앱에서 접속해주세요.');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <AnimatePresence mode="wait">
        {/* 카드 섞는 중 */}
        {stage === 'shuffling' && (
          <motion.div
            key="shuffling"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <motion.div
              className="text-8xl mb-8"
              animate={{
                rotateY: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              🃏
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "'Noto Serif KR', serif" }}>
              카드를 섞고 있습니다...
            </h2>
            <p className="text-slate-400">
              마음을 집중하고 잠시 기다려주세요
            </p>
            <div className="flex justify-center gap-2 mt-6">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 rounded-full bg-purple-500"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.2,
                    repeat: Infinity
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* 카드 선택 */}
        {stage === 'picking' && (
          <motion.div
            key="picking"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center w-full max-w-lg"
          >
            <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Noto Serif KR', serif" }}>
              카드를 선택하세요
            </h2>
            <p className="text-slate-400 mb-8">
              끌리는 카드 한 장을 터치하세요
            </p>

            <div className="flex justify-center gap-4">
              {displayedCards.map((cardIndex, i) => (
                <motion.button
                  key={cardIndex}
                  onClick={() => handleCardPick(cardIndex)}
                  className="w-24 h-36 md:w-32 md:h-48 rounded-xl bg-gradient-to-br from-indigo-900 to-purple-900 border-2 border-purple-500/50 shadow-xl flex items-center justify-center cursor-pointer"
                  initial={{ opacity: 0, y: 50, rotateY: 180 }}
                  animate={{ opacity: 1, y: 0, rotateY: 180 }}
                  transition={{ delay: i * 0.2 }}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: '0 0 30px rgba(139, 92, 246, 0.5)',
                    y: -10
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="text-4xl"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ✨
                  </motion.div>
                </motion.button>
              ))}
            </div>

            <p className="text-slate-500 text-sm mt-6">
              직감을 믿으세요. 첫 번째로 끌리는 카드가 당신의 카드입니다.
            </p>
          </motion.div>
        )}

        {/* 카드 공개 중 */}
        {stage === 'revealing' && selectedCard && (
          <motion.div
            key="revealing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <motion.div
              className="w-40 h-56 md:w-48 md:h-72 mx-auto rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-2xl flex items-center justify-center"
              initial={{ rotateY: 180, scale: 0.8 }}
              animate={{ rotateY: 0, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ transform: isReversed ? 'rotate(180deg)' : 'none' }}
            >
              <span className="text-6xl">{selectedCard.emoji}</span>
            </motion.div>
            <motion.p
              className="text-slate-400 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              카드가 공개됩니다...
            </motion.p>
          </motion.div>
        )}

        {/* 결과 화면 */}
        {stage === 'result' && selectedCard && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-2xl"
          >
            {/* 헤더 */}
            <div className="flex justify-between items-center mb-6">
              <motion.button
                onClick={onBack}
                className="p-2 rounded-full bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.button>

              <div className="flex gap-2">
                <motion.button
                  onClick={handleKakaoShare}
                  className="p-2 rounded-full bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Share2 className="w-5 h-5" />
                </motion.button>
                <motion.button
                  onClick={onReset}
                  className="p-2 rounded-full bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <RotateCcw className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* 오늘의 타로 헤더 */}
            <motion.div
              className="text-center mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h1
                className="text-3xl md:text-4xl font-bold gradient-text mb-2"
                style={{ fontFamily: "'Noto Serif KR', serif" }}
              >
                🃏 오늘의 타로
              </h1>
              <p className="text-slate-400">
                22장의 메이저 아르카나가 전하는 오늘의 메시지
              </p>
            </motion.div>

            {/* 카드 정보 */}
            <motion.div
              className="glass-strong rounded-3xl p-6 md:p-8 text-center mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex justify-center mb-4">
                <motion.div
                  className={`w-32 h-44 md:w-40 md:h-56 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-2xl flex items-center justify-center ${isReversed ? 'rotate-180' : ''}`}
                  animate={{ boxShadow: ['0 0 30px rgba(251, 191, 36, 0.3)', '0 0 50px rgba(251, 191, 36, 0.5)', '0 0 30px rgba(251, 191, 36, 0.3)'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className={`text-5xl ${isReversed ? 'rotate-180' : ''}`}>{selectedCard.emoji}</span>
                </motion.div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                {selectedCard.name}
              </h2>
              {isReversed && (
                <span className="inline-block px-3 py-1 bg-red-500/20 text-red-400 text-sm rounded-full mb-3">
                  역방향
                </span>
              )}

              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {selectedCard.keywords.map((keyword, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* 선택한 카테고리 결과 - 강조 */}
            <motion.div
              className="glass-strong rounded-3xl p-6 md:p-8 mb-6 border-2 border-purple-500/50 relative overflow-hidden"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {/* 배경 글로우 효과 */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -z-10" />

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                  {getCategoryIcon()}
                </div>
                <div>
                  <span className="text-purple-400 text-xs font-medium">선택한 분야</span>
                  <h2 className="text-xl font-bold text-white">{getCategoryName()}</h2>
                </div>
              </div>
              <p className="text-slate-200 leading-relaxed text-lg">
                {isReversed ? selectedCard.reversed : getCategoryMessage()}
              </p>
            </motion.div>

            {/* 조언 */}
            <motion.div
              className="glass-strong rounded-3xl p-6 md:p-8 mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">타로가 전하는 메시지</h2>
              </div>
              <p className="text-slate-300 leading-relaxed italic">
                &ldquo;{selectedCard.advice}&rdquo;
              </p>
            </motion.div>

            {/* 전체 해석 섹션 */}
            <motion.div
              className="glass-strong rounded-3xl p-6 md:p-8 mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-xl font-bold text-white mb-6 text-center" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                📖 분야별 상세 해석
              </h2>

              <div className="space-y-6">
                {/* 종합 운세 */}
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="text-lg font-bold text-purple-400 mb-2 flex items-center gap-2">
                    <Star className="w-4 h-4" /> 종합 운세
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {selectedCard.meaning.general}
                  </p>
                </div>

                {/* 연애운 */}
                <div className="border-l-4 border-pink-500 pl-4">
                  <h3 className="text-lg font-bold text-pink-400 mb-2 flex items-center gap-2">
                    <Heart className="w-4 h-4" /> 연애/애정운
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {selectedCard.meaning.love}
                  </p>
                </div>

                {/* 재물운 */}
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h3 className="text-lg font-bold text-yellow-400 mb-2 flex items-center gap-2">
                    <Wallet className="w-4 h-4" /> 재물/금전운
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {selectedCard.meaning.money}
                  </p>
                </div>

                {/* 직장운 */}
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-lg font-bold text-blue-400 mb-2 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> 직장/사업운
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {selectedCard.meaning.work}
                  </p>
                </div>

                {/* 건강운 */}
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-lg font-bold text-green-400 mb-2 flex items-center gap-2">
                    <Activity className="w-4 h-4" /> 건강/컨디션
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {selectedCard.meaning.health}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* 역방향 해석 (해당 시) */}
            {isReversed && (
              <motion.div
                className="glass-strong rounded-3xl p-6 md:p-8 mb-6 border-2 border-red-500/30"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <h2 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                  🔄 역방향 특별 메시지
                </h2>
                <p className="text-slate-300 leading-relaxed">
                  {selectedCard.reversed}
                </p>
                <p className="text-slate-400 text-sm mt-4">
                  역방향 카드는 해당 에너지가 막혀있거나 과잉되어 있음을 의미합니다.
                  위의 메시지를 참고하여 균형을 찾아보세요.
                </p>
              </motion.div>
            )}

            {/* 내보내기 버튼 */}
            <motion.div
              className="space-y-3"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleDownloadHtml}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-white font-medium hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg"
                >
                  <Download className="w-5 h-5" />
                  <span>결과 저장하기</span>
                </button>
                <button
                  onClick={handleSendEmail}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white font-medium hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg"
                >
                  <Mail className="w-5 h-5" />
                  <span>메일 보내기</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleKakaoShare}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-yellow-500 rounded-xl text-black font-medium hover:bg-yellow-400 transition-colors shadow-lg"
                >
                  <Share2 className="w-5 h-5" />
                  <span>카톡 공유</span>
                </button>
                <button
                  onClick={onReset}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white font-medium hover:opacity-90 transition-opacity shadow-lg"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>다시 뽑기</span>
                </button>
              </div>

              <button
                onClick={handleGoHome}
                className="w-full py-3 bg-slate-700/50 rounded-2xl text-slate-300 font-medium hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                홈으로
              </button>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
