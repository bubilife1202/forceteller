'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Cloud, Sun, Moon, Calendar, Coins, TrendingUp, Briefcase, Users, Lock } from 'lucide-react';

export type MenuOption = 'saju' | 'newyear2026' | 'compatibility' | 'dream' | 'daily' | 'tomorrow' | 'rekindling' | 'monthly' | 'tarot' | 'wealth' | 'daeun' | 'career' | 'guiin' | 'wealth2026' | 'charm' | 'emotion' | 'taemong' | 'health' | 'marriage' | 'study' | 'moving' | 'children';

// 호버 미리보기 데이터
const PREVIEW_DATA: Record<MenuOption, { line1: string; line2: string }> = {
  wealth: { line1: '당신의 평생 재물 점수는...', line2: '40대에 대박 기회가...' },
  daily: { line1: '오늘 당신의 총운 점수는...', line2: '오후 2시에 행운이 찾아와...' },
  tomorrow: { line1: '내일 당신의 총운 점수는...', line2: '내일 오전에 좋은 기운이...' },
  newyear2026: { line1: '2026년 당신의 운세 등급은...', line2: '3월과 9월에 큰 변화가...' },
  compatibility: { line1: '두 분의 궁합 점수는...', line2: '감정선에서 85% 일치하며...' },
  career: { line1: '당신의 이직 적기는...', line2: '2026년 상반기에 기회가...' },
  daeun: { line1: '당신의 전성기 시기는...', line2: '45~55세에 대운이 들어...' },
  guiin: { line1: '당신의 귀인 띠는...', line2: '토끼띠와 말띠가 귀인으로...' },
  rekindling: { line1: '재회 가능성 점수는...', line2: '6개월 내 연락이 올 확률...' },
  tarot: { line1: '오늘 당신에게 전하는 메시지는...', line2: '새로운 시작의 기운이...' },
  monthly: { line1: '이번달 최고의 날은...', line2: '15일에 재물운 상승...' },
  saju: { line1: '당신의 일간 (日干)은...', line2: '갑목(甲木)으로 리더형...' },
  dream: { line1: '꿈의 해석 결과는...', line2: '길몽! 재물이 들어오는...' },
  wealth2026: { line1: '2026년 재물운 점수는...', line2: '5월에 대박 기회가...' },
  charm: { line1: '당신의 매력 유형은...', line2: '감성 매력 85점으로...' },
  emotion: { line1: '감정 안정도 점수는...', line2: '스트레스 해소법은...' },
  taemong: { line1: '태몽 등급은 대길!', line2: '리더형 아이가...' },
  health: { line1: '당신의 건강 주의 장기는...', line2: '간 기능 관리에 주의가...' },
  marriage: { line1: '결혼 적기 시기는...', line2: '이상적 배우자 오행은...' },
  study: { line1: '당신의 학습 스타일은...', line2: '최적의 공부 시간대는...' },
  moving: { line1: '이사 길한 방위는...', line2: '동쪽으로 이동하면...' },
  children: { line1: '자녀 복 점수는...', line2: '첫째 아이 성격은...' },
};

// 메뉴 카드 컴포넌트
interface MenuCardProps {
  option: MenuOption;
  href: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  buttonText: string;
  gradient: string;
  textColor: string;
  tagBg: string;
  badge?: { text: string; color: string };
  delay: number;
  hoverGlow: string;
}

function MenuCard({
  option, href, icon, title, subtitle, description, tags, buttonText,
  gradient, textColor, tagBg, badge, delay, hoverGlow
}: MenuCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const preview = PREVIEW_DATA[option];

  return (
    <Link href={href}>
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="glass-strong rounded-3xl p-6 md:p-8 text-left group hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden cursor-pointer h-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        whileHover={{ boxShadow: hoverGlow }}
      >
        {badge && (
          <div className={`absolute top-4 right-4 px-2 py-0.5 ${badge.color} text-white text-xs font-bold rounded-full animate-pulse`}>
            {badge.text}
          </div>
        )}

        {/* 기본 콘텐츠 */}
        <motion.div
          animate={{ opacity: isHovered ? 0 : 1, y: isHovered ? -10 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-4 mb-5">
            <div className={`w-14 h-14 rounded-2xl ${gradient} flex items-center justify-center shadow-lg`}>
              {icon}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100">{title}</h2>
              <p className={`${textColor} text-sm`}>{subtitle}</p>
            </div>
          </div>

          <p className="text-slate-300 text-sm mb-5 leading-relaxed">
            {description}
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            {tags.map((tag, i) => (
              <span key={i} className={`px-2 py-1 ${tagBg} text-xs rounded-full`}>{tag}</span>
            ))}
          </div>

          <div className={`flex items-center ${textColor} group-hover:translate-x-2 transition-transform`}>
            <span className="text-sm font-medium">{buttonText}</span>
            <span className="ml-2">→</span>
          </div>
        </motion.div>

        {/* 호버 미리보기 */}
        <motion.div
          className="absolute inset-0 p-6 md:p-8 flex flex-col justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
        >
          <div className="space-y-3">
            <p className={`text-lg font-bold ${textColor}`}>
              {preview.line1}
            </p>
            <p className="text-slate-400 blur-[2px]">
              {preview.line2}
            </p>
          </div>
          <div className="mt-6 flex items-center gap-2 text-slate-500">
            <Lock className="w-4 h-4" />
            <span className="text-sm">클릭하여 전체 내용 보기</span>
          </div>
        </motion.div>
      </motion.div>
    </Link>
  );
}

export default function MainMenu() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1
          className="text-4xl md:text-5xl font-bold mb-4 gradient-text"
          style={{ fontFamily: "'Noto Serif KR', serif" }}
        >
          운명을 읽다
        </h1>
        <p className="text-slate-300 text-lg">
          원하시는 서비스를 선택해주세요
        </p>
      </motion.div>

      {/* Menu Cards - 12개 (3x4) 돈 버는 순서 배치 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl w-full">

        {/* Row 1: 시선 집중 */}

        {/* 1. 오늘의 타로 (바이럴 미끼) - 맨 위 */}
        <MenuCard
          option="tarot"
          href="/tarot"
          icon={<span className="text-2xl">🃏</span>}
          title="오늘의 타로"
          subtitle="카드 한장 뽑기"
          description="22장의 메이저 아르카나 중 오늘 당신에게 전하는 카드 한 장. 직관으로 선택하세요!"
          tags={['연애운', '재물운', '직장운']}
          buttonText="타로 뽑기"
          gradient="bg-gradient-to-br from-purple-400 to-indigo-600"
          textColor="text-purple-400"
          tagBg="bg-purple-500/20 text-purple-300"
          badge={{ text: '🔥 인기', color: 'bg-purple-500' }}
          delay={0.15}
          hoverGlow="0 0 40px rgba(168, 85, 247, 0.3)"
        />

        {/* 2. 오늘의 운세 */}
        <MenuCard
          option="daily"
          href="/daily"
          icon={<Sun className="w-7 h-7 text-white" />}
          title="오늘의 운세"
          subtitle="30초만에 확인"
          description="생년월일만 입력하면 오늘 하루의 운세를 알려드립니다. 매일매일 변하는 나의 운세!"
          tags={['재물운', '애정운', '행운 아이템']}
          buttonText="오늘의 운세 보기"
          gradient="bg-gradient-to-br from-amber-400 to-orange-600"
          textColor="text-orange-400"
          tagBg="bg-orange-500/20 text-orange-300"
          badge={{ text: '인기', color: 'bg-orange-500' }}
          delay={0.2}
          hoverGlow="0 0 40px rgba(251, 146, 60, 0.2)"
        />

        {/* 3. 내일의 운세 */}
        <MenuCard
          option="tomorrow"
          href="/tomorrow"
          icon={<Moon className="w-7 h-7 text-white" />}
          title="내일의 운세"
          subtitle="내일을 미리 준비"
          description="내일의 운세를 미리 확인하고 하루를 준비하세요. 행운의 시간과 주의할 점을 알려드립니다!"
          tags={['재물운', '애정운', '시간대별 운세']}
          buttonText="내일의 운세 보기"
          gradient="bg-gradient-to-br from-indigo-400 to-purple-600"
          textColor="text-purple-400"
          tagBg="bg-purple-500/20 text-purple-300"
          badge={{ text: 'NEW', color: 'bg-indigo-500' }}
          delay={0.22}
          hoverGlow="0 0 40px rgba(139, 92, 246, 0.2)"
        />

        {/* Row 2: 프리미엄 운세 (만세력, 재물운, 신년운세) */}

        {/* 4. 만세력 (250페이지 프리미엄) */}
        <MenuCard
          option="saju"
          href="/saju"
          icon={<Sparkles className="w-7 h-7 text-white" />}
          title="만세력"
          subtitle="250페이지 상세 사주풀이"
          description="생년월일시로 보는 완벽한 사주팔자 분석. 오행, 용신, 대운, 평생 운세까지 상세 풀이!"
          tags={['사주팔자', '오행 분석', '대운/세운']}
          buttonText="만세력 보기"
          gradient="bg-gradient-to-br from-amber-400 to-orange-500"
          textColor="text-amber-400"
          tagBg="bg-amber-500/20 text-amber-300"
          badge={{ text: '⭐ 추천', color: 'bg-amber-500 text-black' }}
          delay={0.25}
          hoverGlow="0 0 40px rgba(251, 191, 36, 0.3)"
        />

        {/* 5. 2026 대박 재물운 */}
        <MenuCard
          option="wealth2026"
          href="/wealth2026"
          icon={<span className="text-2xl">💎</span>}
          title="2026 대박 재물운"
          subtitle="100페이지 재물 분석"
          description="2026년 나의 재물운은? 월별 재물 흐름, 투자 적기, 횡재운까지 상세 분석!"
          tags={['월별 재물운', '투자 타이밍', '횡재운']}
          buttonText="재물운 분석하기"
          gradient="bg-gradient-to-br from-amber-400 to-yellow-600"
          textColor="text-amber-400"
          tagBg="bg-amber-500/20 text-amber-300"
          badge={{ text: '💰 인기', color: 'bg-amber-500 text-black' }}
          delay={0.28}
          hoverGlow="0 0 40px rgba(245, 158, 11, 0.3)"
        />

        {/* 6. 2026 신년운세 */}
        <MenuCard
          option="newyear2026"
          href="/newyear2026"
          icon={<span className="text-2xl">🐴</span>}
          title="2026 신년운세"
          subtitle="100페이지 신년운세"
          description="2026년 붉은 말의 해, 나에게 어떤 한 해가 될까요? 월별 상세 운세와 맞춤 전략."
          tags={['병오년', '월별 운세', '전통 비결']}
          buttonText="2026년 운세 보기"
          gradient="bg-gradient-to-br from-red-400 to-red-600"
          textColor="text-red-400"
          tagBg="bg-red-500/20 text-red-300"
          badge={{ text: '🐴 2026', color: 'bg-red-500' }}
          delay={0.3}
          hoverGlow="0 0 40px rgba(239, 68, 68, 0.2)"
        />

        {/* Row 3: 재물/연애 */}

        {/* 7. 대박 재물운 (평생) */}
        <MenuCard
          option="wealth"
          href="/wealth"
          icon={<Coins className="w-7 h-7 text-white" />}
          title="대박 재물운"
          subtitle="평생 재물 팔자"
          description="당신은 평생 얼마를 벌 팔자인가? 투자하기 좋은 날, 로또 행운 번호까지!"
          tags={['재물 팔자', '투자 길일', '행운 번호']}
          buttonText="재물운 확인하기"
          gradient="bg-gradient-to-br from-yellow-400 to-amber-600"
          textColor="text-yellow-400"
          tagBg="bg-yellow-500/20 text-yellow-300"
          badge={{ text: '💰 추천', color: 'bg-yellow-500 text-black' }}
          delay={0.32}
          hoverGlow="0 0 40px rgba(234, 179, 8, 0.3)"
        />

        {/* Row 4: 핵심 */}

        {/* 4. 궁합 보기 (HOT) */}
        <MenuCard
          option="compatibility"
          href="/compatibility"
          icon={<Heart className="w-7 h-7 text-white" />}
          title="궁합 보기"
          subtitle="사주 궁합 분석"
          description="두 사람의 사주를 비교 분석하여 궁합을 알려드립니다. 연인, 부부, 친구 궁합 모두 OK!"
          tags={['천간 궁합', '지지 궁합', '오행 조화']}
          buttonText="궁합 보러가기"
          gradient="bg-gradient-to-br from-pink-400 to-rose-500"
          textColor="text-pink-400"
          tagBg="bg-pink-500/20 text-pink-300"
          badge={{ text: 'HOT', color: 'bg-pink-500' }}
          delay={0.3}
          hoverGlow="0 0 40px rgba(236, 72, 153, 0.2)"
        />

        {/* 5. 퇴사/이직 타이밍 (2030 필수) */}
        <MenuCard
          option="career"
          href="/career"
          icon={<Briefcase className="w-7 h-7 text-white" />}
          title="퇴사/이직 타이밍"
          subtitle="직업운 컨설팅"
          description="언제 퇴사하면 좋을까? 이직하면 연봉이 오를까? 사주로 보는 직장 생활 전략."
          tags={['이직 타이밍', '적성 분석', '승진운']}
          buttonText="직업운 보기"
          gradient="bg-gradient-to-br from-blue-400 to-indigo-600"
          textColor="text-blue-400"
          tagBg="bg-blue-500/20 text-blue-300"
          badge={{ text: '💼 NEW', color: 'bg-blue-500' }}
          delay={0.35}
          hoverGlow="0 0 40px rgba(59, 130, 246, 0.3)"
        />

        {/* 6. 인생 전성기 (고단가 유도) */}
        <MenuCard
          option="daeun"
          href="/daeun"
          icon={<TrendingUp className="w-7 h-7 text-white" />}
          title="인생 전성기"
          subtitle="10년 대운 분석"
          description="내 인생 언제 피나요? 10년 단위 대운 분석으로 전성기 시기와 인생 그래프를 확인하세요."
          tags={['전성기 분석', '인생 그래프', '대운 흐름']}
          buttonText="전성기 확인하기"
          gradient="bg-gradient-to-br from-cyan-400 to-blue-600"
          textColor="text-cyan-400"
          tagBg="bg-cyan-500/20 text-cyan-300"
          badge={{ text: '📈 NEW', color: 'bg-cyan-500' }}
          delay={0.4}
          hoverGlow="0 0 40px rgba(6, 182, 212, 0.3)"
        />

        {/* Row 3: 흥미/인기 */}

        {/* 7. 귀인/악연 찾기 (흥미) */}
        <MenuCard
          option="guiin"
          href="/guiin"
          icon={<Users className="w-7 h-7 text-white" />}
          title="귀인/악연 찾기"
          subtitle="인간관계 처방전"
          description="누가 내 편인가요? 피해야 할 사람은? 사주로 알아보는 귀인과 악연 분석."
          tags={['귀인 분석', '악연 경고', '인간관계']}
          buttonText="귀인 찾기"
          gradient="bg-gradient-to-br from-violet-400 to-purple-600"
          textColor="text-violet-400"
          tagBg="bg-violet-500/20 text-violet-300"
          badge={{ text: '🕵️ NEW', color: 'bg-violet-500' }}
          delay={0.45}
          hoverGlow="0 0 40px rgba(168, 85, 247, 0.3)"
        />

        {/* 8. 재회 운세 (니즈 확실) */}
        <MenuCard
          option="rekindling"
          href="/rekindling"
          icon={<span className="text-2xl">💔</span>}
          title="재회 운세"
          subtitle="다시 만날 수 있을까?"
          description="헤어진 연인과의 재회 가능성을 사주로 분석합니다. 인연의 끈이 아직 이어져 있는지 알아보세요."
          tags={['재회 가능성', '타이밍 분석', '인연 해석']}
          buttonText="재회 운세 보기"
          gradient="bg-gradient-to-br from-rose-400 to-pink-600"
          textColor="text-rose-400"
          tagBg="bg-rose-500/20 text-rose-300"
          delay={0.5}
          hoverGlow="0 0 40px rgba(244, 63, 94, 0.2)"
        />

        {/* Row 4: 기본 기능 */}

        {/* 9. 월별 운세 */}
        <MenuCard
          option="monthly"
          href="/monthly"
          icon={<Calendar className="w-7 h-7 text-white" />}
          title="월별 운세"
          subtitle="12개월 상세 분석"
          description="2025년 12개월의 운세를 한눈에 확인하세요. 최고의 달, 주의할 달을 미리 알아보세요."
          tags={['월별 점수', '분야별 운세', '맞춤 조언']}
          buttonText="월별 운세 보기"
          gradient="bg-gradient-to-br from-indigo-400 to-purple-600"
          textColor="text-indigo-400"
          tagBg="bg-indigo-500/20 text-indigo-300"
          delay={0.6}
          hoverGlow="0 0 40px rgba(99, 102, 241, 0.2)"
        />

        {/* 11. 만세력 (기본 기능) */}
        <MenuCard
          option="saju"
          href="/saju"
          icon={<Sparkles className="w-7 h-7 text-white" />}
          title="만세력"
          subtitle="사주 풀이"
          description="생년월일시를 기반으로 타고난 사주팔자를 분석합니다. 오행의 균형, 용신, 대운까지 상세 풀이."
          tags={['사주팔자', '오행 분석', '대운/세운']}
          buttonText="시작하기"
          gradient="bg-gradient-to-br from-amber-400 to-orange-500"
          textColor="text-amber-400"
          tagBg="bg-amber-500/20 text-amber-300"
          delay={0.65}
          hoverGlow="0 0 40px rgba(251, 191, 36, 0.2)"
        />

        {/* 12. 꿈해몽 (서비스) */}
        <MenuCard
          option="dream"
          href="/dream"
          icon={<Cloud className="w-7 h-7 text-white" />}
          title="꿈해몽"
          subtitle="꿈 풀이"
          description="간밤에 꾼 꿈이 궁금하신가요? 전통 해몽으로 꿈의 의미를 알려드립니다."
          tags={['길몽/흉몽', '상징 해석', '행운 예측']}
          buttonText="꿈 풀이하기"
          gradient="bg-gradient-to-br from-violet-400 to-purple-600"
          textColor="text-violet-400"
          tagBg="bg-violet-500/20 text-violet-300"
          delay={0.7}
          hoverGlow="0 0 40px rgba(139, 92, 246, 0.2)"
        />

        {/* 13. 2026 대박 재물운 (NEW) */}
        <MenuCard
          option="wealth2026"
          href="/wealth2026"
          icon={<span className="text-2xl">💎</span>}
          title="2026 대박 재물운"
          subtitle="병오년 재물 분석"
          description="2026년 나의 재물운은? 월별 재물 흐름, 투자 적기, 횡재운까지 상세 분석!"
          tags={['월별 재물운', '투자 타이밍', '횡재운']}
          buttonText="재물운 분석하기"
          gradient="bg-gradient-to-br from-amber-400 to-yellow-600"
          textColor="text-amber-400"
          tagBg="bg-amber-500/20 text-amber-300"
          badge={{ text: '💰 NEW', color: 'bg-amber-500 text-black' }}
          delay={0.75}
          hoverGlow="0 0 40px rgba(245, 158, 11, 0.3)"
        />

        {/* 14. 내 안의 매력찾기 (NEW) */}
        <MenuCard
          option="charm"
          href="/charm"
          icon={<span className="text-2xl">✨</span>}
          title="내 안의 매력찾기"
          subtitle="숨은 매력 발굴"
          description="나도 몰랐던 나의 매력! 사주로 알아보는 외적/내적/연애/직업 매력 총정리."
          tags={['매력 유형', '강점 분석', '매력 업그레이드']}
          buttonText="매력 찾기"
          gradient="bg-gradient-to-br from-pink-400 to-rose-500"
          textColor="text-pink-400"
          tagBg="bg-pink-500/20 text-pink-300"
          badge={{ text: '💖 NEW', color: 'bg-pink-500' }}
          delay={0.8}
          hoverGlow="0 0 40px rgba(236, 72, 153, 0.3)"
        />

        {/* 15. 감정 관리 (NEW) */}
        <MenuCard
          option="emotion"
          href="/emotion"
          icon={<span className="text-2xl">🧘</span>}
          title="감정 관리"
          subtitle="마음 처방전"
          description="나의 감정 패턴을 이해하고 맞춤 힐링법을 찾아보세요. 스트레스 해소부터 월별 감정 예보까지!"
          tags={['감정 유형', '힐링 가이드', '월별 예보']}
          buttonText="감정 분석하기"
          gradient="bg-gradient-to-br from-teal-400 to-cyan-600"
          textColor="text-teal-400"
          tagBg="bg-teal-500/20 text-teal-300"
          badge={{ text: '🌿 NEW', color: 'bg-teal-500' }}
          delay={0.85}
          hoverGlow="0 0 40px rgba(20, 184, 166, 0.3)"
        />

        {/* 16. 태몽해설 (NEW) */}
        <MenuCard
          option="taemong"
          href="/taemong"
          icon={<span className="text-2xl">🌙</span>}
          title="태몽해설"
          subtitle="아이의 미래 예측"
          description="태몽으로 알아보는 아이의 성격, 재능, 진로! 전통 태몽 해석과 태교 가이드."
          tags={['태몽 분석', '성격 예측', '태교 가이드']}
          buttonText="태몽 풀이하기"
          gradient="bg-gradient-to-br from-purple-400 to-indigo-600"
          textColor="text-purple-400"
          tagBg="bg-purple-500/20 text-purple-300"
          badge={{ text: '👶 NEW', color: 'bg-purple-500' }}
          delay={0.9}
          hoverGlow="0 0 40px rgba(168, 85, 247, 0.3)"
        />

        {/* 17. 건강운 (NEW) */}
        <MenuCard
          option="health"
          href="/health"
          icon={<span className="text-2xl">💪</span>}
          title="건강운"
          subtitle="체질과 건강 분석"
          description="오행으로 알아보는 나의 체질! 주의해야 할 장기, 질병 예방법, 건강 관리 가이드."
          tags={['체질 분석', '장기 건강', '건강 관리법']}
          buttonText="건강운 보기"
          gradient="bg-gradient-to-br from-green-400 to-emerald-600"
          textColor="text-green-400"
          tagBg="bg-green-500/20 text-green-300"
          badge={{ text: '🏥 NEW', color: 'bg-green-500' }}
          delay={0.95}
          hoverGlow="0 0 40px rgba(34, 197, 94, 0.3)"
        />

        {/* 18. 결혼/배우자운 (NEW) */}
        <MenuCard
          option="marriage"
          href="/marriage"
          icon={<span className="text-2xl">💍</span>}
          title="결혼/배우자운"
          subtitle="혼인운 분석"
          description="나의 결혼 적기는? 이상적인 배우자상, 시댁/처가 관계, 백년해로 운세까지!"
          tags={['결혼 적기', '이상적 배우자', '시댁/처가']}
          buttonText="결혼운 보기"
          gradient="bg-gradient-to-br from-rose-400 to-pink-600"
          textColor="text-rose-400"
          tagBg="bg-rose-500/20 text-rose-300"
          badge={{ text: '💒 NEW', color: 'bg-rose-500' }}
          delay={1.0}
          hoverGlow="0 0 40px rgba(251, 113, 133, 0.3)"
        />

        {/* 19. 학업운 (NEW) */}
        <MenuCard
          option="study"
          href="/study"
          icon={<span className="text-2xl">📚</span>}
          title="학업운"
          subtitle="학습 스타일 분석"
          description="나에게 맞는 학습법은? 시험운, 자격증 운, 유학운까지 학업 전체를 분석!"
          tags={['학습 스타일', '시험운', '유학운']}
          buttonText="학업운 보기"
          gradient="bg-gradient-to-br from-blue-400 to-indigo-600"
          textColor="text-blue-400"
          tagBg="bg-blue-500/20 text-blue-300"
          badge={{ text: '📖 NEW', color: 'bg-blue-500' }}
          delay={1.05}
          hoverGlow="0 0 40px rgba(59, 130, 246, 0.3)"
        />

        {/* 20. 이사/방위운 (NEW) */}
        <MenuCard
          option="moving"
          href="/moving"
          icon={<span className="text-2xl">🏠</span>}
          title="이사/방위운"
          subtitle="풍수 이사 분석"
          description="이사 가기 좋은 방위와 시기! 풍수 인테리어, 행운의 층수/호수까지 상세 분석."
          tags={['길한 방위', '이사 시기', '풍수 인테리어']}
          buttonText="이사운 보기"
          gradient="bg-gradient-to-br from-orange-400 to-amber-600"
          textColor="text-orange-400"
          tagBg="bg-orange-500/20 text-orange-300"
          badge={{ text: '🧭 NEW', color: 'bg-orange-500' }}
          delay={1.1}
          hoverGlow="0 0 40px rgba(251, 146, 60, 0.3)"
        />

        {/* 21. 자녀운 (NEW) */}
        <MenuCard
          option="children"
          href="/children"
          icon={<span className="text-2xl">👶</span>}
          title="자녀운"
          subtitle="자녀 복 분석"
          description="자녀 수 예측, 출산 적기, 자녀 재능과 교육 방향까지! 자녀로 인한 복을 분석합니다."
          tags={['자녀 수', '출산 시기', '자녀 교육']}
          buttonText="자녀운 보기"
          gradient="bg-gradient-to-br from-cyan-400 to-teal-600"
          textColor="text-cyan-400"
          tagBg="bg-cyan-500/20 text-cyan-300"
          badge={{ text: '👨‍👩‍👧 NEW', color: 'bg-cyan-500' }}
          delay={1.15}
          hoverGlow="0 0 40px rgba(6, 182, 212, 0.3)"
        />
      </div>

      {/* Footer hint */}
      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p className="text-slate-500 text-sm">
          팔자왕 - 전통 명리학 기반 종합 운세 서비스
        </p>
        <p className="text-slate-600 text-xs mt-2">
          © 2025 Paljawang. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}
