'use client';

import { motion } from 'framer-motion';
import { Sun, ArrowLeft, RefreshCw, Coins, Heart, Briefcase, Activity, Star, Compass, Palette, Sparkles, Clock, TrendingUp, AlertTriangle, CheckCircle, XCircle, Zap, Users, Moon, Sunrise } from 'lucide-react';
import { getDayPillar, getTenGod } from '@/lib/saju-calculator';
import { DailyFortuneFormData } from './DailyFortuneForm';
import { generateStyledHTML, downloadHTML } from '@/lib/html-download';
import DownloadButton from './ui/DownloadButton';

interface DailyFortuneResultProps {
  formData: DailyFortuneFormData;
  onReset: () => void;
  onBack: () => void;
}

// 오행별 색상
const elementColors: Record<string, { bg: string; text: string; name: string; hex: string }> = {
  '목': { bg: 'from-green-500 to-emerald-600', text: 'text-green-400', name: '초록색', hex: '#10b981' },
  '화': { bg: 'from-red-500 to-rose-600', text: 'text-red-400', name: '빨간색', hex: '#ef4444' },
  '토': { bg: 'from-yellow-500 to-amber-600', text: 'text-yellow-400', name: '노란색', hex: '#f59e0b' },
  '금': { bg: 'from-slate-300 to-gray-400', text: 'text-slate-300', name: '흰색/금색', hex: '#cbd5e1' },
  '수': { bg: 'from-blue-500 to-indigo-600', text: 'text-blue-400', name: '검정/파란색', hex: '#3b82f6' },
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

// 오행별 음식
const elementFoods: Record<string, string[]> = {
  '목': ['푸른 채소', '신맛 음식', '닭고기'],
  '화': ['쓴맛 음식', '양고기', '커피'],
  '토': ['단맛 음식', '소고기', '곡물'],
  '금': ['매운 음식', '생선', '무 요리'],
  '수': ['짠맛 음식', '돼지고기', '해산물'],
};

// 띠 정보
const zodiacAnimals = ['쥐', '소', '호랑이', '토끼', '용', '뱀', '말', '양', '원숭이', '닭', '개', '돼지'];

// 십성별 운세 해석 (더 상세하게)
const tenGodFortunes: Record<string, {
  score: number;
  money: { score: number; detail: string; tip: string };
  love: { score: number; detail: string; tip: string };
  work: { score: number; detail: string; tip: string };
  health: { score: number; detail: string; tip: string };
  social: { score: number; detail: string };
  advice: string;
  luckyTime: string;
  unluckyTime: string;
  doList: string[];
  dontList: string[];
  keyword: string;
}> = {
  '비견': {
    score: 70,
    money: { score: 65, detail: '경쟁 속에서도 기회가 있습니다. 동업이나 협력 투자가 유리하며, 혼자보다 함께할 때 이득이 큽니다.', tip: '공동 투자나 팀 프로젝트 참여' },
    love: { score: 75, detail: '친구 같은 편안한 관계가 이어집니다. 연인과 함께 취미 활동을 하면 좋습니다.', tip: '함께 운동이나 취미 활동하기' },
    work: { score: 70, detail: '동료와의 협력이 성과를 만듭니다. 경쟁보다는 시너지를 추구하세요.', tip: '팀워크 강화, 회의 참석' },
    health: { score: 70, detail: '적당한 운동으로 활력을 유지하세요. 친구와 함께 운동하면 더 효과적입니다.', tip: '그룹 운동, 산책' },
    social: { score: 80, detail: '같은 관심사를 가진 사람들과 좋은 교류가 있습니다.' },
    advice: '나누면 더 커지는 날입니다. 독식하려 하지 마세요.',
    luckyTime: '오전 9시~11시',
    unluckyTime: '오후 3시~5시',
    doList: ['친구와 식사하기', '팀 프로젝트 진행', '네트워킹 모임 참석'],
    dontList: ['혼자 중요한 결정', '경쟁적인 상황 만들기', '비교하며 우울해하기'],
    keyword: '협력',
  },
  '겁재': {
    score: 55,
    money: { score: 45, detail: '예상치 못한 지출이나 손실에 주의하세요. 투자는 보류하고 보수적으로 운영하세요.', tip: '지갑 단속, 충동구매 자제' },
    love: { score: 50, detail: '삼각관계나 오해가 생길 수 있습니다. 솔직한 대화로 풀어가세요.', tip: '명확한 의사표현, 의심 금물' },
    work: { score: 55, detail: '경쟁자의 출현이나 방해가 있을 수 있습니다. 자신의 페이스를 유지하세요.', tip: '본업에 집중, 소문 무시' },
    health: { score: 50, detail: '과로와 스트레스에 주의하세요. 무리한 운동도 피하세요.', tip: '충분한 휴식, 가벼운 스트레칭' },
    social: { score: 45, detail: '주변 사람들과 갈등이 생길 수 있으니 말을 아끼세요.' },
    advice: '욕심을 버리고 내 것을 지키는 데 집중하세요.',
    luckyTime: '오전 7시~9시',
    unluckyTime: '오후 1시~3시',
    doList: ['기존 일에 집중', '저축하기', '혼자만의 시간 갖기'],
    dontList: ['큰 돈 거래', '새로운 사업 시작', '남과 다투기'],
    keyword: '인내',
  },
  '식신': {
    score: 85,
    money: { score: 80, detail: '꾸준하고 안정적인 수입이 예상됩니다. 부업이나 창작 활동에서 수익이 생길 수 있습니다.', tip: '재능 기부의 보상, 부수입 기회' },
    love: { score: 90, detail: '즐거운 만남과 데이트가 기대됩니다. 맛집 탐방이나 여행 계획을 세워보세요.', tip: '로맨틱한 식사, 여행 계획' },
    work: { score: 85, detail: '창의력이 빛나는 날입니다. 아이디어 제안이나 기획 업무에 유리합니다.', tip: '브레인스토밍, 기획서 작성' },
    health: { score: 85, detail: '건강 상태 양호합니다. 맛있는 음식으로 기분 전환하세요.', tip: '영양가 있는 식사, 디저트' },
    social: { score: 90, detail: '사교 운이 좋습니다. 새로운 사람들과의 만남이 즐겁습니다.' },
    advice: '여유롭게 인생을 즐기는 하루입니다. 행복은 가까이 있어요.',
    luckyTime: '오후 12시~2시',
    unluckyTime: '오후 9시~11시',
    doList: ['맛집 가기', '창작 활동', '취미 생활', '소개팅'],
    dontList: ['다이어트 시작', '무리한 업무', '과식'],
    keyword: '즐거움',
  },
  '상관': {
    score: 65,
    money: { score: 60, detail: '변동이 있는 재물운입니다. 유흥비나 충동구매를 주의하세요.', tip: '예산 세우기, 카드 사용 자제' },
    love: { score: 65, detail: '솔직한 표현이 필요하지만, 지나치면 상처가 될 수 있습니다.', tip: '부드러운 표현 연습' },
    work: { score: 70, detail: '기존 틀을 깨는 혁신적인 시도가 가능합니다. 단, 상사와의 마찰에 주의.', tip: '새로운 방식 제안, 단 공손하게' },
    health: { score: 60, detail: '스트레스 관리가 필요합니다. 감정 조절에 신경 쓰세요.', tip: '명상, 깊은 호흡' },
    social: { score: 55, detail: '말실수에 주의하세요. 유머가 오해를 살 수 있습니다.' },
    advice: '말 한마디에 천 냥 빚을 갚기도 하고, 천 냥 빚을 지기도 합니다.',
    luckyTime: '오전 10시~12시',
    unluckyTime: '오후 6시~8시',
    doList: ['창의적 발상', '글쓰기', '예술 활동'],
    dontList: ['직설적인 비판', '윗사람과 논쟁', '음주'],
    keyword: '표현',
  },
  '편재': {
    score: 80,
    money: { score: 90, detail: '횡재수가 있습니다! 투자나 사업 기회를 놓치지 마세요. 적극적인 재테크가 유리합니다.', tip: '투자 기회 포착, 복권 구매' },
    love: { score: 75, detail: '새로운 인연이 생길 수 있습니다. 적극적으로 다가가세요.', tip: '소개팅, 미팅 참석' },
    work: { score: 85, detail: '사업 확장이나 새로운 프로젝트 시작에 좋은 날입니다.', tip: '계약 체결, 거래처 미팅' },
    health: { score: 75, detail: '활력이 넘칩니다. 에너지를 긍정적으로 사용하세요.', tip: '활동적인 취미, 스포츠' },
    social: { score: 85, detail: '사교 활동에서 좋은 기회를 만날 수 있습니다.' },
    advice: '기회는 준비된 자에게 옵니다. 오늘이 그 날일 수 있어요!',
    luckyTime: '오후 2시~4시',
    unluckyTime: '오전 6시~8시',
    doList: ['투자 결정', '사업 미팅', '새 인연 만들기'],
    dontList: ['도박성 투자', '무모한 지출', '과시'],
    keyword: '기회',
  },
  '정재': {
    score: 90,
    money: { score: 95, detail: '정당한 노력의 대가를 받는 날입니다. 월급, 보너스, 성과급 등 기대하세요.', tip: '재테크 점검, 저축 늘리기' },
    love: { score: 85, detail: '안정적인 관계가 더욱 발전합니다. 진지한 대화가 좋습니다.', tip: '미래 계획 논의, 프러포즈' },
    work: { score: 95, detail: '승진, 성과 인정, 계약 성사 등 좋은 소식이 있을 수 있습니다.', tip: '중요 보고, 프레젠테이션' },
    health: { score: 85, detail: '규칙적인 생활이 건강을 지켜줍니다. 루틴을 유지하세요.', tip: '정시 식사, 충분한 수면' },
    social: { score: 80, detail: '신뢰받는 인간관계가 강화됩니다.' },
    advice: '성실함이 보상받는 날입니다. 당신의 노력은 빛을 발합니다.',
    luckyTime: '오전 9시~11시',
    unluckyTime: '자정~새벽 2시',
    doList: ['중요 업무 처리', '계약 체결', '재무 정리'],
    dontList: ['게으름', '약속 어기기', '편법 사용'],
    keyword: '성실',
  },
  '편관': {
    score: 60,
    money: { score: 55, detail: '예상치 못한 지출이나 세금, 벌금 등에 주의하세요.', tip: '비상금 확보, 서류 점검' },
    love: { score: 50, detail: '갈등이나 오해가 생길 수 있습니다. 차분한 대화가 필요합니다.', tip: '인내심, 이해하려는 노력' },
    work: { score: 60, detail: '상사나 권위자와의 마찰에 주의하세요. 순응이 필요한 날입니다.', tip: '겸손한 태도, 보고 철저히' },
    health: { score: 55, detail: '스트레스성 증상에 주의하세요. 긴장을 풀어주세요.', tip: '마사지, 반신욕' },
    social: { score: 50, detail: '불필요한 갈등을 피하세요. 한 발 물러서는 지혜가 필요합니다.' },
    advice: '참고 인내하면 반드시 좋은 결과가 옵니다. 이 또한 지나갑니다.',
    luckyTime: '오후 4시~6시',
    unluckyTime: '오전 8시~10시',
    doList: ['서류 정리', '건강 검진', '명상'],
    dontList: ['윗사람과 다투기', '무리한 계획', '음주 운전'],
    keyword: '인내',
  },
  '정관': {
    score: 75,
    money: { score: 70, detail: '계획적인 지출이 좋습니다. 큰 결정은 신중하게.', tip: '예산 관리, 장기 플랜' },
    love: { score: 80, detail: '책임감 있는 태도가 호감을 줍니다. 약속을 지키세요.', tip: '진지한 만남, 부모님 인사' },
    work: { score: 85, detail: '공식적인 업무 처리에 유리합니다. 서류, 계약에 좋은 날.', tip: '공문서 처리, 법적 절차' },
    health: { score: 75, detail: '규칙적인 생활이 건강을 지켜줍니다.', tip: '정시 기상, 루틴 유지' },
    social: { score: 75, detail: '공식적인 자리에서 좋은 인상을 줄 수 있습니다.' },
    advice: '원칙을 지키면 좋은 하루가 됩니다. 정도를 걸으세요.',
    luckyTime: '오전 11시~오후 1시',
    unluckyTime: '오후 11시~새벽 1시',
    doList: ['공식 업무', '계약 검토', '면접'],
    dontList: ['편법', '무단 결근', '거짓말'],
    keyword: '원칙',
  },
  '편인': {
    score: 70,
    money: { score: 65, detail: '학습이나 자기계발 투자가 좋습니다. 당장의 수익보다 미래를 위해.', tip: '강의 수강, 책 구매' },
    love: { score: 70, detail: '정신적인 교감이 중요한 날입니다. 깊은 대화를 나눠보세요.', tip: '진솔한 대화, 공감' },
    work: { score: 75, detail: '새로운 배움의 기회가 있습니다. 연수나 교육에 적극적으로.', tip: '세미나 참석, 자격증 공부' },
    health: { score: 65, detail: '정신 건강에 신경 쓰세요. 생각이 많아질 수 있습니다.', tip: '독서, 명상, 산책' },
    social: { score: 70, detail: '지적인 모임이나 스터디에 참여하면 좋습니다.' },
    advice: '배움에 끝은 없습니다. 오늘 배운 것이 내일의 자산이 됩니다.',
    luckyTime: '오후 8시~10시',
    unluckyTime: '오후 2시~4시',
    doList: ['공부', '독서', '온라인 강의'],
    dontList: ['결정 미루기', '현실 도피', '몽상'],
    keyword: '배움',
  },
  '정인': {
    score: 85,
    money: { score: 75, detail: '어른이나 귀인의 도움으로 재물 운이 좋아집니다.', tip: '멘토 조언 구하기, 감사 표현' },
    love: { score: 85, detail: '따뜻하고 안정적인 관계가 이어집니다. 위로와 지지를 주고받으세요.', tip: '편안한 대화, 응원하기' },
    work: { score: 80, detail: '멘토나 선배의 조언이 큰 도움이 됩니다. 가르침을 겸허히 받으세요.', tip: '선배에게 질문, 피드백 요청' },
    health: { score: 85, detail: '심신이 안정되는 날입니다. 편안한 휴식을 취하세요.', tip: '충분한 수면, 따뜻한 차' },
    social: { score: 85, detail: '어머니, 은사님 등 어른과의 관계가 좋습니다.' },
    advice: '감사하는 마음이 복을 부릅니다. 받은 만큼 돌려주세요.',
    luckyTime: '오전 6시~8시',
    unluckyTime: '오후 5시~7시',
    doList: ['부모님 안부', '은사님 연락', '감사 편지'],
    dontList: ['배은망덕', '교만', '독선'],
    keyword: '감사',
  },
};

// 오행 상생상극 관계
function getElementRelation(userElement: string, todayElement: string): { type: string; description: string; modifier: number } {
  const order = ['목', '화', '토', '금', '수'];
  const userIdx = order.indexOf(userElement);
  const todayIdx = order.indexOf(todayElement);

  if (userElement === todayElement) {
    return { type: '비화', description: '같은 기운으로 안정적인 하루', modifier: 0 };
  }

  if ((todayIdx + 1) % 5 === userIdx) {
    return { type: '상생(받음)', description: '오늘의 기운이 나를 도와주는 날', modifier: 10 };
  }

  if ((userIdx + 1) % 5 === todayIdx) {
    return { type: '상생(줌)', description: '에너지 소모가 있지만 보람 있는 날', modifier: -5 };
  }

  if ((todayIdx + 2) % 5 === userIdx) {
    return { type: '상극(받음)', description: '시련이 있지만 성장의 기회', modifier: -10 };
  }

  if ((userIdx + 2) % 5 === todayIdx) {
    return { type: '상극(줌)', description: '노력하면 큰 성과를 얻을 수 있는 날', modifier: 5 };
  }

  return { type: '무관', description: '평온한 하루', modifier: 0 };
}

// 띠 궁합 계산
function getZodiacCompatibility(birthYear: number): { good: string[]; bad: string[] } {
  const zodiacIndex = (birthYear - 4) % 12;
  const goodIndices = [(zodiacIndex + 4) % 12, (zodiacIndex + 8) % 12];
  const badIndices = [(zodiacIndex + 6) % 12];

  return {
    good: goodIndices.map(i => zodiacAnimals[i]),
    bad: badIndices.map(i => zodiacAnimals[i]),
  };
}

export default function DailyFortuneResult({ formData, onReset, onBack }: DailyFortuneResultProps) {
  // 사용자의 일주 계산
  const userDayPillar = getDayPillar(formData.year, formData.month, formData.day);
  const userDayStem = userDayPillar.stem;
  const userElement = userDayStem.element;

  // 사용자 띠 계산
  const userZodiacIndex = (formData.year - 4) % 12;
  const userZodiac = zodiacAnimals[userZodiacIndex];

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

  // 띠 궁합
  const zodiacCompat = getZodiacCompatibility(formData.year);

  // 용신 (부족한 오행 보충)
  const yongsinElement = userElement === '목' ? '수' :
                         userElement === '화' ? '목' :
                         userElement === '토' ? '화' :
                         userElement === '금' ? '토' : '금';

  // 오늘 날짜 포맷
  const todayStr = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = dayNames[today.getDay()];

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

  // HTML 다운로드 함수
  const handleDownload = async () => {
    // 약간의 딜레이로 UX 향상
    await new Promise(resolve => setTimeout(resolve, 800));

    const content = `
      <div class="section">
        <div class="score-box">
          <div class="score-value">${finalScore}점</div>
          <div class="score-label">${gradeInfo.grade} • #${fortune.keyword}</div>
        </div>
        <div class="grid-2" style="margin-bottom: 16px;">
          <div class="stat-card">
            <div class="stat-label">내 일간</div>
            <div class="stat-value">${userDayStem.ko}(${userElement})</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">오늘 일간</div>
            <div class="stat-value">${todayStem.ko}(${todayElement})</div>
          </div>
        </div>
        <p style="text-align: center; color: #94a3b8;">${elementRelation.description}</p>
      </div>

      <div class="section">
        <div class="section-title"><span class="icon">📊</span> 분야별 운세</div>
        <div class="stat-card" style="margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span class="stat-label">💰 재물운</span>
            <span class="stat-value yellow">${fortune.money.score}점</span>
          </div>
          <div class="progress-bar"><div class="fill yellow" style="width: ${fortune.money.score}%"></div></div>
          <p style="font-size: 12px; color: #94a3b8; margin-top: 8px;">${fortune.money.detail}</p>
        </div>
        <div class="stat-card" style="margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span class="stat-label">💕 애정운</span>
            <span class="stat-value pink">${fortune.love.score}점</span>
          </div>
          <div class="progress-bar"><div class="fill pink" style="width: ${fortune.love.score}%"></div></div>
          <p style="font-size: 12px; color: #94a3b8; margin-top: 8px;">${fortune.love.detail}</p>
        </div>
        <div class="stat-card" style="margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span class="stat-label">💼 직장/학업운</span>
            <span class="stat-value blue">${fortune.work.score}점</span>
          </div>
          <div class="progress-bar"><div class="fill blue" style="width: ${fortune.work.score}%"></div></div>
          <p style="font-size: 12px; color: #94a3b8; margin-top: 8px;">${fortune.work.detail}</p>
        </div>
        <div class="stat-card">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span class="stat-label">💪 건강운</span>
            <span class="stat-value green">${fortune.health.score}점</span>
          </div>
          <div class="progress-bar"><div class="fill green" style="width: ${fortune.health.score}%"></div></div>
          <p style="font-size: 12px; color: #94a3b8; margin-top: 8px;">${fortune.health.detail}</p>
        </div>
      </div>

      <div class="section">
        <div class="section-title"><span class="icon">⏰</span> 시간대별 운세</div>
        <p style="color: #22c55e; margin-bottom: 8px;">✅ 행운의 시간: ${fortune.luckyTime}</p>
        <p style="color: #f97316;">⚠️ 주의 시간: ${fortune.unluckyTime}</p>
      </div>

      <div class="grid-2">
        <div class="section">
          <div class="section-title" style="color: #22c55e;"><span class="icon">✓</span> 하면 좋은 일</div>
          ${fortune.doList.map(item => `<div class="list-item"><span class="bullet" style="color: #22c55e;">✓</span> ${item}</div>`).join('')}
        </div>
        <div class="section">
          <div class="section-title" style="color: #ef4444;"><span class="icon">✗</span> 피해야 할 일</div>
          ${fortune.dontList.map(item => `<div class="list-item"><span class="bullet" style="color: #ef4444;">✗</span> ${item}</div>`).join('')}
        </div>
      </div>

      <div class="section">
        <div class="section-title"><span class="icon">🍀</span> 행운 아이템</div>
        <div class="grid-4">
          <div class="stat-card">
            <div class="stat-label">행운의 색</div>
            <div class="stat-value">${elementColors[yongsinElement]?.name}</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">행운의 숫자</div>
            <div class="stat-value yellow">${elementNumbers[yongsinElement]?.join(', ')}</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">행운의 방향</div>
            <div class="stat-value blue">${elementDirections[yongsinElement]}</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">행운의 음식</div>
            <div class="stat-value green">${elementFoods[yongsinElement]?.[0]}</div>
          </div>
        </div>
      </div>

      <div class="advice-box">
        <div class="advice-title">⭐ 오늘의 메시지</div>
        <div class="advice-text">"${fortune.advice}"</div>
      </div>
    `;

    const html = generateStyledHTML({
      title: '오늘의 운세',
      date: `${todayStr} (${dayOfWeek}요일) • ${userZodiac}띠 • ${userDayStem.ko}일간`,
      content,
      primaryColor: '#f59e0b',
    });

    downloadHTML(`오늘의운세_${todayStr.replace(/[년월일\s]/g, '')}.html`, html);
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
        <motion.div variants={itemVariants} className="text-center mb-6">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg mb-4">
            <Sun className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            오늘의 운세
          </h1>
          <p className="text-amber-400">{todayStr} ({dayOfWeek}요일)</p>
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
              <div className="text-slate-400 text-sm">오늘의 키워드</div>
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
              <span className="text-slate-400 text-xs">오늘 일간</span>
              <div className={`text-lg font-bold ${elementColors[todayElement]?.text}`}>
                {todayStem.ko}({todayElement})
              </div>
            </div>
            <div className="text-center">
              <span className="text-slate-400 text-xs">관계</span>
              <div className="text-lg font-bold text-amber-400">{tenGod}</div>
            </div>
          </div>

          <p className="text-slate-300 text-sm text-center mt-3">
            {elementRelation.description}
          </p>
        </motion.div>

        {/* 시간대별 운세 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-5 mb-4">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-400" />
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
            <TrendingUp className="w-5 h-5 text-amber-400" />
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

        {/* 오늘 이것만은! */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 mb-4">
          {/* 하면 좋은 일 */}
          <div className="glass-strong rounded-2xl p-4">
            <h3 className="text-emerald-400 font-bold text-sm mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              오늘 하면 좋은 일
            </h3>
            <ul className="space-y-2">
              {fortune.doList.map((item, i) => (
                <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 피해야 할 일 */}
          <div className="glass-strong rounded-2xl p-4">
            <h3 className="text-red-400 font-bold text-sm mb-3 flex items-center gap-2">
              <XCircle className="w-4 h-4" />
              오늘 피해야 할 일
            </h3>
            <ul className="space-y-2">
              {fortune.dontList.map((item, i) => (
                <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">✗</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* 띠별 궁합 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-5 mb-4">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            🐲 오늘의 띠별 궁합
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
            <Sparkles className="w-5 h-5 text-amber-400" />
            오늘의 행운 아이템
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
              <div className="text-amber-400 font-bold">
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

        {/* 오늘의 조언 */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-3xl p-6 mb-6"
        >
          <h2 className="text-lg font-bold text-amber-300 mb-3 flex items-center gap-2">
            <Star className="w-5 h-5" />
            오늘의 메시지
          </h2>
          <p className="text-white text-xl leading-relaxed font-medium">
            &ldquo;{fortune.advice}&rdquo;
          </p>
        </motion.div>

        {/* 버튼 */}
        <motion.div variants={itemVariants} className="space-y-3">
          <button
            onClick={onReset}
            className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl text-white font-bold text-lg hover:from-amber-600 hover:to-orange-700 transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <RefreshCw className="w-5 h-5" />
            다시 보기
          </button>
          <DownloadButton onDownload={handleDownload} label="결과 저장하기" />
          <button
            onClick={onBack}
            className="w-full py-3 bg-slate-700/50 rounded-2xl text-slate-300 font-medium hover:bg-slate-700 transition-all"
          >
            메인으로 돌아가기
          </button>
        </motion.div>

        {/* 안내 */}
        <motion.p variants={itemVariants} className="text-slate-500 text-xs text-center mt-6">
          본 운세는 사주명리학에 기반하여 일간 오행과 오늘의 천간 관계를 분석한 것입니다.<br />
          재미로 봐주시고, 좋은 하루 되세요!
        </motion.p>
      </div>
    </motion.div>
  );
}
