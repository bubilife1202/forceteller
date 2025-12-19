'use client';

import { motion } from 'framer-motion';
import { Sun, ArrowLeft, RefreshCw, Coins, Heart, Briefcase, Activity, Star, Compass, Palette, Sparkles, Clock, TrendingUp, AlertTriangle, CheckCircle, XCircle, Zap, Users, Moon, Sunrise, Download, Mail, Home } from 'lucide-react';
import { getDayPillar, getTenGod } from '@/lib/saju-calculator';
import { DailyFortuneFormData } from './DailyFortuneForm';
import { downloadAsHtml, sendByEmail, createSectionHtml, createScoreBadgeHtml, createProgressBarHtml, createGridHtml, createCardHtml, createListHtml, createMessageBoxHtml } from '@/lib/utils/export-utils';

interface DailyFortuneResultProps {
  formData: DailyFortuneFormData;
  onReset: () => void;
  onBack: () => void;
  onHome?: () => void;
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

// 십성별 다양한 한마디 (날짜에 따라 다르게 선택) - 15개씩
const tenGodPredictions: Record<string, string[]> = {
  '비견': [
    '🤝 오늘 만난 동료가 미래의 귀인이 될 수 있습니다. 연락처를 교환해두세요!',
    '👥 오랜 친구에게서 좋은 소식이 올 수 있습니다. 연락해보세요!',
    '🎯 함께하면 두 배! 오늘 팀플레이가 대박을 부릅니다!',
    '🌟 같은 꿈을 가진 사람을 만날 수 있는 날입니다. 모임에 참석하세요!',
    '💪 경쟁자가 아니라 동반자! 오늘 만난 사람과 윈윈할 수 있습니다!',
    '🎪 동창회나 동호회 모임이 있다면 꼭 참석하세요. 인생이 바뀔 만남이 있습니다!',
    '🏃 형제자매나 친한 친구와 연락하면 좋은 정보를 얻을 수 있어요!',
    '💫 오늘 네트워킹 자리에서 비즈니스 파트너를 만날 수 있습니다!',
    '🤗 동료에게 먼저 다가가세요. 예상치 못한 협력 관계가 시작됩니다!',
    '🎯 오늘 시작한 공동 프로젝트가 큰 성공을 거둘 수 있어요!',
    '👫 친구가 소개해주는 사람을 주의 깊게 보세요. 귀인일 수 있습니다!',
    '💼 같은 업종 종사자와의 교류가 새 기회를 열어줍니다!',
    '🌈 우연히 만난 동창이 좋은 소식을 가져다줄 수 있어요!',
    '🔥 경쟁보다 협력! 오늘은 함께 갈 때 더 멀리 갑니다!',
    '✨ 비슷한 상황의 사람에게서 해결책을 찾을 수 있습니다!',
  ],
  '겁재': [
    '⚡ 지금 참으면 3일 안에 상황이 반전됩니다. 충동적인 결정은 금물!',
    '🛡️ 지갑을 꼭 잡으세요! 오늘 유혹이 많지만, 버티면 내일이 좋아집니다!',
    '⏳ 급할수록 돌아가세요. 오늘 서두르면 손해봅니다!',
    '🔒 내 것을 지키는 게 버는 것! 오늘은 수비가 최선의 공격입니다!',
    '💎 어려움 속에 숨은 보석이 있습니다. 포기하지 마세요!',
    '🎭 겉으로 좋아 보이는 제안, 오늘은 거절하는 게 이득입니다!',
    '💳 신용카드는 집에 두고 나가세요. 충동구매 위험일!',
    '🔐 보증 서거나 돈 빌려주는 일은 절대 금물입니다!',
    '⚖️ 오늘의 손해가 내일의 큰 이득을 막아줍니다. 인내하세요!',
    '🌊 감정적인 결정을 피하세요. 하루만 미루면 답이 보입니다!',
    '🏔️ 지금 힘들어도 이 시간이 지나면 한 단계 성장해 있을 거예요!',
    '🔍 주변의 달콤한 말에 속지 마세요. 본심을 확인하세요!',
    '⛔ 새로운 투자나 사업 시작은 오늘만 피하세요!',
    '🎯 현재 위치를 지키는 것이 최선입니다. 무리한 도전은 잠시 멈춤!',
    '💪 오늘의 참을성이 내일의 승리를 만듭니다!',
  ],
  '식신': [
    '🎁 뜻밖의 선물이나 대접을 받을 수 있습니다. 거절하지 말고 감사히 받으세요!',
    '🍀 먹으러 간 곳에서 행운이! 오늘 맛집에서 좋은 일이 생깁니다!',
    '✨ 당신의 매력이 빛나는 날! 누군가 당신을 눈여겨보고 있습니다!',
    '🎨 오늘 시작한 취미가 인생을 바꿀 수 있습니다! 관심 가는 것에 도전하세요!',
    '🎉 예상치 못한 즐거운 소식이 옵니다! 카톡을 확인하세요!',
    '🍽️ 오늘 점심/저녁 약속에서 좋은 인연을 만날 수 있어요!',
    '🎭 콘서트, 연극, 전시회 등 문화생활을 즐기면 영감을 얻습니다!',
    '🌸 여유를 가지세요. 바쁘게 보내지 않아도 되는 날입니다!',
    '👗 오늘 산 옷이나 물건이 행운을 불러옵니다!',
    '📸 SNS에 올린 사진이 예상치 못한 기회를 가져다줄 수 있어요!',
    '🎵 음악을 들으며 산책하면 좋은 아이디어가 떠오릅니다!',
    '🍰 달콤한 디저트가 오늘의 행운 아이템! 카페에 가보세요!',
    '🌈 평소 가보고 싶던 곳을 방문하면 좋은 일이 생깁니다!',
    '💕 연인이나 친구와 맛있는 음식을 나누면 행복이 두 배!',
    '🎪 축제나 이벤트가 있다면 참석하세요. 즐거운 만남이 기다립니다!',
  ],
  '상관': [
    '💡 오늘 떠오른 아이디어를 메모해두세요. 나중에 큰 돈이 될 수 있습니다!',
    '🎤 당신의 말 한마디가 누군가의 인생을 바꿉니다. 진심을 담아 말하세요!',
    '📝 글을 쓰거나 SNS에 올린 것이 대박 날 수 있습니다! 표현하세요!',
    '🎯 직감을 믿으세요! 오늘 떠오른 생각이 정답입니다!',
    '💬 오늘 한 말이 일주일 안에 현실이 됩니다. 긍정적인 말을 하세요!',
    '🎨 창작 활동에 몰입하면 예상치 못한 수익으로 이어질 수 있어요!',
    '📱 영상 콘텐츠나 게시물이 대박 날 수 있는 날! 업로드하세요!',
    '🎭 숨겨왔던 재능을 오늘 공개하면 주목받을 수 있습니다!',
    '🔊 회의에서 당신의 의견이 채택될 수 있어요. 적극적으로 발언하세요!',
    '📚 글쓰기, 블로그, 유튜브 시작하기 좋은 날입니다!',
    '💻 새로운 기술이나 트렌드를 배우면 미래에 큰 도움이 됩니다!',
    '🎬 스토리텔링이 중요한 날! 당신의 경험을 나누세요!',
    '🌟 비판보다 제안으로! 부드럽게 표현하면 받아들여집니다!',
    '🎓 강의나 발표 기회가 온다면 도전하세요. 성공합니다!',
    '✍️ 오늘 정리한 생각이 책이나 강연으로 이어질 수 있어요!',
  ],
  '편재': [
    '💰 예상치 못한 금전 소식이 올 수 있습니다! 로또나 복권 한 장 사보세요!',
    '🎰 횡재수 대박! 평소 안 하던 것을 시도하면 돈이 됩니다!',
    '📈 지금 투자하면 3개월 안에 결과가 나옵니다! 기회를 잡으세요!',
    '💵 생각지도 못한 곳에서 돈이 들어옵니다! 감사히 받으세요!',
    '🏆 당신이 하던 일이 드디어 돈이 됩니다! 조금만 더 밀어붙이세요!',
    '🎲 작은 도전이 큰 보상으로! 복권, 경품 응모에 행운이!',
    '💹 주식이나 코인에서 좋은 신호가 올 수 있어요! (단, 무리는 금물)',
    '🏠 부동산이나 재테크 관련 좋은 정보를 얻을 수 있습니다!',
    '💳 예상치 못한 환급금이나 캐시백이 들어올 수 있어요!',
    '🎁 경품 당첨, 이벤트 행운이 따르는 날입니다!',
    '📊 부업이나 투잡을 고려중이라면 오늘 시작하세요!',
    '💰 오래 잊고 있던 돈을 되찾을 수 있어요! 통장 확인하세요!',
    '🏦 새로운 저축 상품이나 금융 정보가 들어옵니다!',
    '🎯 사업 확장이나 투자 결정에 좋은 날입니다!',
    '✨ 돈 벌 아이디어가 떠오릅니다! 메모해두세요!',
  ],
  '정재': [
    '🏆 오늘 중요한 소식이 도착합니다! 승진, 합격, 계약 성사를 기대하세요!',
    '💼 노력의 결실! 기다리던 좋은 소식이 오늘 옵니다!',
    '📞 중요한 전화가 올 수 있습니다! 모르는 번호도 받아보세요!',
    '✅ 그동안 쌓아온 신뢰가 큰 기회로 돌아옵니다!',
    '🎖️ 당신의 성실함을 아는 사람이 좋은 제안을 합니다!',
    '📋 오래 준비한 프로젝트가 승인됩니다! 자신감을 가지세요!',
    '💵 월급이나 보너스 외에 추가 수입이 생길 수 있어요!',
    '🤝 계약 체결에 좋은 날! 서명하세요!',
    '📈 정당한 노력이 정당한 대가를 받습니다!',
    '🏛️ 관공서나 은행 업무가 순조롭게 진행됩니다!',
    '📝 서류 심사, 면접에서 좋은 결과가 있을 거예요!',
    '💎 오랫동안 노력해온 일이 마침내 결실을 맺습니다!',
    '🎓 자격증 시험, 승진 시험에 행운이 함께합니다!',
    '📊 실적이 인정받고 포상이나 인센티브가 옵니다!',
    '🌟 꾸준함이 빛나는 날! 성실함의 보상을 받으세요!',
  ],
  '편관': [
    '🛡️ 오늘의 시련은 다음 주 성공의 밑거름! 포기하지 마세요, 반전이 옵니다!',
    '⚔️ 힘든 하루지만, 이 고비만 넘기면 큰 성장이 있습니다!',
    '🔥 압박감 속에서 당신의 진가가 드러납니다! 당당하게 맞서세요!',
    '🌈 폭풍 전야입니다. 이 시련 뒤에 무지개가 기다립니다!',
    '💪 참는 자에게 복이 온다! 3일만 버티면 상황이 완전히 바뀝니다!',
    '🎯 윗사람의 기대에 부응하면 크게 인정받을 수 있어요!',
    '⚡ 예상치 못한 도전이 오지만, 이것이 당신을 강하게 만듭니다!',
    '🏔️ 산을 넘으면 더 넓은 세상이! 지금이 성장의 시간입니다!',
    '🔒 룰을 지키세요. 오늘 원칙을 어기면 나중에 문제가 됩니다!',
    '⏰ 마감이나 데드라인을 철저히 지키면 신뢰를 얻습니다!',
    '🌊 파도가 거세도 배는 전진합니다. 흔들리지 마세요!',
    '⚖️ 공정하게 행동하면 나중에 큰 보상이 옵니다!',
    '🛡️ 비판을 성장의 양분으로! 날카로운 피드백이 약이 됩니다!',
    '💼 상사나 윗사람에게 인정받을 기회입니다. 최선을 다하세요!',
    '🎖️ 이 시련을 통과하면 리더로 성장할 수 있습니다!',
  ],
  '정관': [
    '📋 오늘 처리하는 서류나 계약이 대박 기회로 연결됩니다! 꼼꼼히 확인하세요!',
    '👔 공식적인 자리에서 인정받습니다! 자신감을 가지세요!',
    '📜 오늘 사인하는 것이 미래를 결정합니다! 신중하게, 그러나 놓치지 마세요!',
    '🤵 윗사람의 눈에 들 수 있는 날! 예의 바르게 행동하세요!',
    '⭐ 원칙을 지키면 큰 보상이 옵니다! 유혹에 흔들리지 마세요!',
    '🏛️ 법적 절차, 공식 업무에서 좋은 결과가 있습니다!',
    '📝 중요한 서류를 꼼꼼히 검토하면 문제를 예방할 수 있어요!',
    '🤝 공식적인 모임에서 중요한 인연을 만날 수 있습니다!',
    '📊 보고서나 기획서가 상사에게 좋은 평가를 받습니다!',
    '🎓 면접이나 시험에서 좋은 결과가 있을 거예요!',
    '⚖️ 정정당당함이 빛나는 날! 정도를 걸으세요!',
    '🏆 성실한 이미지가 새로운 기회를 열어줍니다!',
    '📱 공식 채널로 오는 연락을 주의 깊게 확인하세요!',
    '🎖️ 규칙과 절차를 따르면 원하는 결과를 얻습니다!',
    '✅ 약속을 지키는 것이 신뢰를 쌓는 최고의 방법입니다!',
  ],
  '편인': [
    '📚 오늘 우연히 본 정보가 인생을 바꿀 수 있습니다! 눈과 귀를 열어두세요!',
    '🧠 직감적으로 끌리는 공부나 강의가 있다면 시작하세요! 행운의 시작입니다!',
    '💭 오늘 꾼 꿈에 힌트가 있습니다! 기억해두세요!',
    '🔮 예감이 맞습니다! 이상하게 끌리는 것을 따라가보세요!',
    '📖 누군가의 한마디가 깨달음을 줍니다! 조언에 귀 기울이세요!',
    '🌙 명상이나 조용한 시간이 영감을 줍니다!',
    '📱 우연히 본 영상이나 글이 해답을 줄 수 있어요!',
    '🎓 새로운 분야 공부를 시작하면 1년 안에 큰 변화가!',
    '🔍 호기심이 이끄는 대로 따라가보세요. 보물을 발견합니다!',
    '📚 서점이나 도서관에서 운명의 책을 만날 수 있어요!',
    '💡 평소 관심 없던 주제에서 뜻밖의 기회가!',
    '🧘 정신적인 성장에 좋은 날! 내면을 탐구하세요!',
    '🌟 직감을 따르면 좋은 선택을 하게 됩니다!',
    '📝 일기나 메모를 쓰면 생각이 정리됩니다!',
    '🎯 배움에 투자한 것이 10배로 돌아옵니다!',
  ],
  '정인': [
    '👼 귀인이 나타납니다! 오늘 만나는 나이 많은 분의 조언을 새겨들으세요!',
    '🙏 부모님이나 어른께 연락하면 좋은 일이 생깁니다!',
    '💝 은사님이나 선배에게 감사 인사를 하면 복이 돌아옵니다!',
    '🌸 따뜻한 위로가 필요한 날, 가족에게 연락하세요. 행운이 함께합니다!',
    '✨ 어른의 조언이 대박으로 연결됩니다! 겸손히 들으세요!',
    '🏠 가족과 함께하는 시간이 에너지를 충전해줍니다!',
    '👨‍👩‍👧 부모님 심부름을 하면 예상치 못한 행운이!',
    '📞 오래 연락 못한 선생님께 안부 인사를 드려보세요!',
    '🎁 어른에게 선물하면 몇 배로 돌아옵니다!',
    '🙏 감사 일기를 쓰면 더 많은 감사거리가 생깁니다!',
    '💐 부모님 건강을 살펴보세요. 당신의 효도가 복을 부릅니다!',
    '🧓 나이 드신 분의 경험담에 인생의 해답이 있어요!',
    '📚 어릴 때 배웠던 것이 지금 도움이 됩니다!',
    '🌳 전통과 역사에서 지혜를 얻을 수 있는 날입니다!',
    '💕 사랑받는 사람이 사랑을 나눌 수 있습니다. 먼저 베푸세요!',
  ],
};

// 날짜와 생년월일 기반으로 예언 선택
function getPrediction(tenGod: string, birthYear: number, birthMonth: number, birthDay: number): string {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate() + birthYear + birthMonth * 10 + birthDay;
  const predictions = tenGodPredictions[tenGod] || tenGodPredictions['비견'];
  const index = seed % predictions.length;
  return predictions[index];
}

// 십성별 운세 해석 (더 상세하게) - 확장된 버전
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
    money: { score: 65, detail: '경쟁 속에서도 기회가 있습니다. 동업이나 협력 투자가 유리하며, 혼자보다 함께할 때 이득이 큽니다. 친구나 동료와 정보를 공유하면 좋은 투자 기회를 얻을 수 있어요. 공동 구매나 그룹 할인을 활용하면 지출을 줄일 수 있습니다.', tip: '공동 투자, 팀 프로젝트, 정보 공유, 그룹 할인 활용' },
    love: { score: 75, detail: '친구 같은 편안한 관계가 이어집니다. 연인과 함께 취미 활동을 하면 좋습니다. 새로운 만남보다 기존 관계를 돈독히 하는 것이 좋은 날이에요. 솔로라면 동호회나 모임에서 좋은 인연을 만날 수 있습니다.', tip: '함께 운동/취미, 동호회 참석, 친구 소개 만남' },
    work: { score: 70, detail: '동료와의 협력이 성과를 만듭니다. 경쟁보다는 시너지를 추구하세요. 팀 프로젝트에서 당신의 역할이 빛날 수 있습니다. 회의에서 적극적으로 아이디어를 공유하고, 동료의 의견도 경청하세요.', tip: '팀워크, 회의 참석, 아이디어 공유, 협업 도구 활용' },
    health: { score: 70, detail: '적당한 운동으로 활력을 유지하세요. 친구와 함께 운동하면 더 효과적입니다. 그룹 피트니스, 조깅 모임, 등산 동호회 등이 좋습니다. 혼자보다 함께할 때 운동 효과가 배가됩니다.', tip: '그룹 운동, 함께 산책, 운동 파트너 구하기' },
    social: { score: 80, detail: '같은 관심사를 가진 사람들과 좋은 교류가 있습니다. 오늘 만난 사람이 미래의 귀인이 될 수 있으니 연락처를 교환해두세요.' },
    advice: '나누면 더 커지는 날입니다. 독식하려 하지 마세요. 협력의 힘을 믿으세요!',
    luckyTime: '오전 9시~11시',
    unluckyTime: '오후 3시~5시',
    doList: ['친구/동료와 식사하기', '팀 프로젝트 진행', '네트워킹 모임 참석', '동호회 활동', '공동 투자 검토', '정보 공유하기'],
    dontList: ['혼자 중요한 결정', '경쟁적인 상황 만들기', '비교하며 우울해하기', '독단적인 행동', '친구와 다투기'],
    keyword: '협력',
  },
  '겁재': {
    score: 55,
    money: { score: 45, detail: '예상치 못한 지출이나 손실에 주의하세요. 투자는 당분간 보류하고 보수적으로 운영하는 것이 안전합니다. 경쟁자나 주변 사람으로 인한 재물 손실 가능성이 있으니, 돈 거래는 신중하게 하세요. 충동구매나 과소비 유혹이 많지만 참으면 3일 안에 상황이 좋아집니다. 오늘은 쓰기보다 지키는 것에 집중하세요.', tip: '지갑 단속, 충동구매 자제, 대출 보증 금지, 계좌 확인, 비상금 확보' },
    love: { score: 50, detail: '삼각관계나 오해가 생길 수 있어 조심스러운 날입니다. 솔직하고 명확한 대화로 오해를 풀어가세요. 질투나 의심은 관계를 악화시키니 믿음을 가지세요. 연인이 있다면 차분하게 대화하고, 솔로라면 급하게 접근하지 말고 시간을 두고 천천히 알아가세요.', tip: '명확한 의사표현, 의심 금물, 차분한 대화, 감정 조절' },
    work: { score: 55, detail: '경쟁자의 출현이나 예상치 못한 방해가 있을 수 있습니다. 동요하지 말고 자신의 페이스를 유지하세요. 주변의 소문이나 잡음에 흔들리지 말고 본업에 집중하는 것이 최선입니다. 새로운 프로젝트보다는 기존 업무를 완성하는 데 힘쓰세요. 동료와의 불필요한 경쟁은 피하고 협력을 모색하세요.', tip: '본업에 집중, 소문 무시, 기존 업무 완성, 침착함 유지, 경쟁 피하기' },
    health: { score: 50, detail: '과로와 스트레스가 쌓이기 쉬운 날입니다. 몸과 마음에 무리가 가지 않도록 충분한 휴식을 취하세요. 무리한 운동이나 격한 활동은 피하고 가벼운 스트레칭으로 긴장을 풀어주세요. 음주나 과식은 건강을 해칠 수 있으니 절제하세요.', tip: '충분한 휴식, 가벼운 스트레칭, 음주 절제, 일찍 취침' },
    social: { score: 45, detail: '주변 사람들과 갈등이 생기거나 마찰이 있을 수 있으니 말을 아끼고 행동을 조심하세요. 오늘은 한 발 물러서는 지혜가 필요합니다.' },
    advice: '욕심을 버리고 내 것을 지키는 데 집중하세요. 참는 자에게 복이 옵니다.',
    luckyTime: '오전 7시~9시',
    unluckyTime: '오후 1시~3시',
    doList: ['기존 일에 집중하기', '꾸준히 저축하기', '혼자만의 시간 갖기', '일기 쓰며 성찰하기', '명상이나 요가하기', '독서로 마음 안정'],
    dontList: ['큰 돈 거래하기', '새로운 사업 시작', '남과 다투기', '보증 서주기', '충동구매하기'],
    keyword: '인내',
  },
  '식신': {
    score: 85,
    money: { score: 80, detail: '꾸준하고 안정적인 수입이 예상되는 좋은 날입니다. 부업이나 창작 활동, 재능 기부에서 예상치 못한 수익이 생길 수 있어요. 취미로 만든 작품이나 콘텐츠가 돈이 될 가능성이 높습니다. SNS나 온라인 플랫폼을 활용하면 부수입 기회를 발견할 수 있어요. 오늘은 즐기면서 돈을 버는 행운의 날입니다.', tip: '재능 기부의 보상, 부수입 기회, 창작물 판매, 온라인 활동, 취미 수익화' },
    love: { score: 90, detail: '즐겁고 로맨틱한 만남이 기대되는 날입니다. 맛집 탐방이나 여행 계획을 세우면 관계가 더욱 돈독해져요. 연인과 함께 문화생활이나 취미 활동을 즐기면 행복이 배가됩니다. 솔로라면 소개팅이나 모임에서 좋은 인연을 만날 수 있어요. 편안하고 여유로운 분위기에서 사랑이 싹틉니다.', tip: '로맨틱한 식사, 여행 계획, 문화생활, 소개팅 수락, 카페 데이트' },
    work: { score: 85, detail: '창의력과 아이디어가 빛나는 날입니다. 기획 업무나 새로운 제안을 하기에 최적의 타이밍이에요. 브레인스토밍에 적극적으로 참여하면 좋은 평가를 받을 수 있습니다. 예술적이거나 창작적인 업무에서 특히 능력을 발휘할 수 있어요. 여유를 가지고 일하면 더 좋은 결과가 나옵니다.', tip: '브레인스토밍, 기획서 작성, 창작 활동, 여유있게 일하기, 아이디어 공유' },
    health: { score: 85, detail: '전반적으로 건강 상태가 양호한 날입니다. 맛있는 음식을 즐기면서 기분 전환을 하세요. 영양가 있는 식사와 좋아하는 디저트로 몸과 마음을 충전하세요. 과식만 주의하면 완벽한 하루가 됩니다. 산책이나 가벼운 운동으로 소화를 돕는 것도 좋아요.', tip: '영양가 있는 식사, 디저트 즐기기, 과식 주의, 가벼운 산책' },
    social: { score: 90, detail: '사교운이 매우 좋은 날입니다. 새로운 사람들과의 만남이 즐겁고 유익합니다. 파티, 모임, 식사 자리에서 인기가 높아요.' },
    advice: '여유롭게 인생을 즐기는 하루입니다. 행복은 가까이 있어요.',
    luckyTime: '오후 12시~2시',
    unluckyTime: '오후 9시~11시',
    doList: ['맛집 탐방하기', '창작 활동 시작', '취미 생활 즐기기', '소개팅 나가기', '문화생활 즐기기', 'SNS 활동하기'],
    dontList: ['다이어트 시작', '무리한 업무', '과식하기', '스트레스 받기', '혼자 틀어박히기'],
    keyword: '즐거움',
  },
  '상관': {
    score: 65,
    money: { score: 60, detail: '변동이 있는 재물운입니다. 창작이나 콘텐츠 제작으로 수익이 생길 수 있지만, 유흥비나 충동구매 유혹이 많으니 주의하세요. 예산을 미리 세우고 계획적으로 지출하는 것이 중요합니다. SNS나 블로그 활동이 장기적으로 수익으로 이어질 수 있어요. 카드 사용은 자제하고 현금으로 관리하세요.', tip: '예산 세우기, 카드 사용 자제, 창작 수익화, 지출 기록, 현금 사용' },
    love: { score: 65, detail: '솔직한 표현이 필요하지만 말투와 방법이 중요한 날입니다. 직설적이고 날카로운 말은 상처가 될 수 있으니 부드럽게 표현하는 연습이 필요해요. 진심을 담되 상대방의 입장도 배려하세요. 연인과의 대화에서는 비판보다 칭찬을, 지적보다 격려를 먼저 하세요. 솔로라면 너무 솔직한 것도 부담이 될 수 있어요.', tip: '부드러운 표현 연습, 칭찬 먼저, 경청하기, 감정 배려' },
    work: { score: 70, detail: '기존 틀을 깨는 혁신적인 시도와 창의적인 아이디어가 빛나는 날입니다. 새로운 방식을 제안하면 주목받을 수 있어요. 단, 상사나 윗사람과의 마찰에 주의하고 공손하고 겸손한 태도로 접근하세요. 비판적인 의견도 건설적으로 포장하면 받아들여집니다. 글쓰기, 발표, 기획 업무에 강점을 발휘하세요.', tip: '새로운 방식 제안, 공손한 태도, 건설적 비판, 기획서 작성, 발표 준비' },
    health: { score: 60, detail: '스트레스와 감정 기복 관리가 필요한 날입니다. 신경이 예민해지기 쉬우니 감정 조절에 신경 쓰세요. 명상이나 깊은 호흡으로 마음을 안정시키세요. 과도한 음주는 감정을 더 불안정하게 만들 수 있으니 피하세요. 가벼운 산책이나 요가로 긴장을 풀어주세요.', tip: '명상, 깊은 호흡, 요가, 산책, 음주 자제' },
    social: { score: 55, detail: '말실수나 과도한 표현에 주의가 필요합니다. 재치있다고 생각한 유머가 오해를 살 수 있으니 조심하세요. 듣기보다 말하기가 많아지면 문제가 생길 수 있어요.' },
    advice: '말 한마디에 천 냥 빚을 갚기도 하고, 천 냥 빚을 지기도 합니다. 신중하게 표현하세요.',
    luckyTime: '오전 10시~12시',
    unluckyTime: '오후 6시~8시',
    doList: ['창의적 발상하기', '글쓰기/블로그', '예술 활동하기', '긍정적 표현', '경청 연습', 'SNS 콘텐츠 제작'],
    dontList: ['직설적인 비판', '윗사람과 논쟁', '음주하기', '말 많이 하기', '비꼬는 말투'],
    keyword: '표현',
  },
  '편재': {
    score: 80,
    money: { score: 90, detail: '횡재수가 있습니다! 투자나 사업 기회를 놓치지 마세요. 적극적인 재테크가 유리하며, 새로운 수익 모델이나 부업 기회가 찾아올 수 있어요. 주식, 부동산, 암호화폐 등 다양한 투자처에서 좋은 정보를 얻을 수 있으며, 평소 관심 없던 분야에서 의외의 돈벌이가 가능합니다. 복권이나 경품 응모도 좋지만, 과도한 투기는 피하고 분산 투자를 고려하세요.', tip: '투자 기회 포착, 복권 구매, 부업 시작, 재테크 정보 수집, 경품 응모' },
    love: { score: 75, detail: '새로운 인연이 생길 수 있습니다. 적극적으로 다가가세요. 소개팅이나 미팅에서 매력적인 사람을 만날 가능성이 높으며, 먼저 다가가면 좋은 반응을 얻을 수 있어요. 연인이 있다면 색다른 데이트나 깜짝 이벤트로 관계에 활력을 불어넣으세요. 과감한 고백이나 프러포즈도 성공 확률이 높은 날입니다.', tip: '소개팅 참석, 미팅 주선, 먼저 연락하기, 깜짝 이벤트 준비' },
    work: { score: 85, detail: '사업 확장이나 새로운 프로젝트 시작에 좋은 날입니다. 평소 구상만 하던 사업 아이템을 실행에 옮기기 좋으며, 투자자나 파트너를 만날 기회가 있을 수 있어요. 거래처 개척, 계약 체결, 신규 고객 유치에 유리하며, 영업이나 마케팅 활동에서 좋은 성과를 거둘 수 있습니다. 리스크를 감수하더라도 과감하게 도전하는 것이 유리합니다.', tip: '계약 체결, 거래처 미팅, 사업 계획 발표, 신규 고객 상담, 영업 활동' },
    health: { score: 75, detail: '활력이 넘칩니다. 에너지를 긍정적으로 사용하세요. 운동이나 스포츠 활동으로 넘치는 에너지를 발산하면 건강도 좋아지고 스트레스도 해소됩니다. 새로운 운동이나 액티비티에 도전해보는 것도 좋으며, 야외 활동이나 모험적인 레저를 즐기면 기분 전환에 도움이 됩니다. 단, 과도한 음주나 무리한 활동은 피하세요.', tip: '활동적인 취미, 스포츠 참여, 야외 활동, 새로운 운동 도전' },
    social: { score: 85, detail: '사교 활동에서 좋은 기회를 만날 수 있습니다. 네트워킹 모임이나 파티에서 중요한 인맥을 만들 수 있으며, 평소 알지 못하던 사람과의 만남이 사업이나 투자 기회로 이어질 수 있어요. 적극적으로 명함을 돌리고 SNS 연락처를 교환하세요.' },
    advice: '기회는 준비된 자에게 옵니다. 오늘이 그 날일 수 있어요!',
    luckyTime: '오후 2시~4시',
    unluckyTime: '오전 6시~8시',
    doList: ['투자 결정하기', '사업 미팅 참석', '새 인연 만들기', '부업 기회 탐색', '복권이나 경품 응모', '네트워킹 이벤트 참여'],
    dontList: ['도박성 투자', '무모한 지출', '과시하기', '충동적인 결정', '검증되지 않은 정보에 의존'],
    keyword: '기회',
  },
  '정재': {
    score: 90,
    money: { score: 95, detail: '정당한 노력의 대가를 받는 날입니다. 월급, 보너스, 성과급 등 기대하세요. 그동안 성실히 쌓아온 실적이 인정받으며, 예상치 못한 추가 수입이나 인센티브가 들어올 수 있어요. 안정적인 재테크나 저축 상품에 가입하기 좋은 날이며, 장기적인 재무 계획을 세우기에도 적합합니다. 재정 관리를 철저히 하면 재물이 꾸준히 쌓이는 것을 느낄 수 있습니다.', tip: '재테크 점검, 저축 늘리기, 재무 상담, 투자 상품 가입, 예산 계획' },
    love: { score: 85, detail: '안정적인 관계가 더욱 발전합니다. 진지한 대화가 좋습니다. 결혼이나 동거 등 미래를 함께할 구체적인 계획을 논의하기에 최적의 시기예요. 상대방과의 신뢰가 깊어지며, 책임감 있는 모습이 더욱 매력적으로 보입니다. 솔로라면 진지한 만남이나 선을 통해 좋은 인연을 만날 수 있어요. 부모님 인사나 가족 모임도 긍정적인 결과를 가져옵니다.', tip: '미래 계획 논의, 프러포즈, 진지한 대화, 가족 소개, 부모님 인사' },
    work: { score: 95, detail: '승진, 성과 인정, 계약 성사 등 좋은 소식이 있을 수 있습니다. 중요한 프레젠테이션이나 보고에서 높은 평가를 받으며, 윗사람의 신뢰를 얻을 수 있어요. 오랫동안 준비해온 프로젝트가 승인되거나, 새로운 직책을 제안받을 수 있습니다. 성실하게 일한 만큼 정당한 보상이 따르는 날이므로, 자신감을 가지고 능력을 발휘하세요.', tip: '중요 보고, 프레젠테이션, 승진 면담, 계약 진행, 업무 계획 수립' },
    health: { score: 85, detail: '규칙적인 생활이 건강을 지켜줍니다. 루틴을 유지하세요. 정시에 식사하고 충분한 수면을 취하면 컨디션이 최상으로 유지됩니다. 꾸준히 해온 운동이나 건강 관리가 효과를 발휘하는 시기예요. 건강 검진이나 치과 검진을 받기에도 좋으며, 장기적인 건강 계획을 세우기에 적합합니다. 무리하지 않고 꾸준함을 유지하는 것이 핵심입니다.', tip: '정시 식사, 충분한 수면, 규칙적인 운동, 건강 검진, 비타민 섭취' },
    social: { score: 80, detail: '신뢰받는 인간관계가 강화됩니다. 주변 사람들이 당신의 성실함과 책임감을 높이 평가하며, 중요한 자리에 추천하거나 소개해주려는 움직임이 있을 수 있어요. 공식적인 모임이나 업계 행사에서 좋은 인상을 남길 수 있습니다.' },
    advice: '성실함이 보상받는 날입니다. 당신의 노력은 빛을 발합니다.',
    luckyTime: '오전 9시~11시',
    unluckyTime: '자정~새벽 2시',
    doList: ['중요 업무 처리하기', '계약 체결하기', '재무 정리하기', '장기 계획 수립', '저축 시작하기', '건강 검진 받기'],
    dontList: ['게으름 피우기', '약속 어기기', '편법 사용하기', '무계획 지출', '불필요한 지각'],
    keyword: '성실',
  },
  '편관': {
    score: 60,
    money: { score: 55, detail: '예상치 못한 지출이나 세금, 벌금 등에 주의하세요. 법적 문제나 공과금 고지서를 미리 확인하고 대비하는 것이 좋습니다. 오늘은 큰 금액 거래를 자제하고, 계약서나 약관을 꼼꼼히 읽어보세요. 압박감을 느끼더라도 서두르지 말고 신중하게 결정하면 손실을 막을 수 있어요.', tip: '비상금 확보, 서류 점검, 공과금 확인, 계약서 재검토, 법률 상담' },
    love: { score: 50, detail: '갈등이나 오해가 생길 수 있습니다. 차분한 대화가 필요하며, 상대방의 입장을 이해하려는 노력이 중요해요. 감정적으로 대응하기보다는 이성적으로 풀어가세요. 조급하게 결론을 내리지 말고, 시간을 두고 서로의 마음을 확인하는 것이 좋습니다.', tip: '인내심, 이해하려는 노력, 감정 조절, 경청하기' },
    work: { score: 60, detail: '상사나 권위자와의 마찰에 주의하세요. 순응이 필요한 날이며, 자신의 주장을 내세우기보다는 겸손하게 받아들이는 자세가 필요합니다. 보고는 철저히 하고, 지시사항을 정확히 따르세요. 압박이 있어도 이를 성장의 기회로 삼으면 나중에 큰 인정을 받을 수 있어요.', tip: '겸손한 태도, 보고 철저히, 지시사항 준수, 규칙 엄수, 인내' },
    health: { score: 55, detail: '스트레스성 증상에 주의하세요. 긴장을 풀어주는 것이 중요하며, 두통이나 소화불량이 올 수 있습니다. 충분한 휴식과 심호흡, 스트레칭으로 몸의 긴장을 풀어주세요. 과로하지 말고 적절한 휴식 시간을 가지는 것이 건강 유지의 비결입니다.', tip: '마사지, 반신욕, 스트레칭, 충분한 휴식, 심호흡' },
    social: { score: 50, detail: '불필요한 갈등을 피하세요. 한 발 물러서는 지혜가 필요하며, 논쟁에 휘말리지 않도록 주의하세요. 오늘은 말을 아끼고 경청하는 것이 더 좋습니다.' },
    advice: '참고 인내하면 반드시 좋은 결과가 옵니다. 이 또한 지나갑니다.',
    luckyTime: '오후 4시~6시',
    unluckyTime: '오전 8시~10시',
    doList: ['서류 정리', '건강 검진', '명상', '윗사람께 보고', '규칙 준수', '스트레스 관리'],
    dontList: ['윗사람과 다투기', '무리한 계획', '음주 운전', '감정적 대응', '큰 결정 내리기'],
    keyword: '인내',
  },
  '정관': {
    score: 75,
    money: { score: 70, detail: '계획적인 지출이 좋습니다. 큰 결정은 신중하게 검토하고, 예산을 미리 세워서 지출하세요. 장기적인 재테크 플랜을 수립하기에 좋은 날이며, 정기적금이나 적립식 투자를 시작하면 좋습니다. 충동적인 소비보다는 계획된 지출이 재물운을 높여줍니다.', tip: '예산 관리, 장기 플랜, 정기 저축, 재무 설계 상담' },
    love: { score: 80, detail: '책임감 있는 태도가 호감을 줍니다. 약속을 지키고 진실되게 대하세요. 연애 관계에서 진지한 대화를 나누거나 미래 계획을 논의하기 좋은 날입니다. 부모님께 인사드리거나 공식적인 만남을 가지면 관계가 한 단계 발전할 수 있어요.', tip: '진지한 만남, 부모님 인사, 약속 지키기, 미래 계획 논의' },
    work: { score: 85, detail: '공식적인 업무 처리에 유리합니다. 서류 작업, 계약 체결, 공문서 처리에 좋은 날이에요. 법적 절차나 관공서 업무가 순조롭게 진행됩니다. 원칙과 규정을 따르면 상사나 고객에게 신뢰를 얻을 수 있습니다. 면접이나 중요한 발표도 좋은 결과가 기대됩니다.', tip: '공문서 처리, 법적 절차, 계약 체결, 면접 준비, 규정 준수' },
    health: { score: 75, detail: '규칙적인 생활이 건강을 지켜줍니다. 정해진 시간에 기상하고, 식사하고, 수면을 취하세요. 루틴을 유지하면 컨디션이 좋아집니다. 건강검진이나 정기검사를 받기에도 좋은 날입니다.', tip: '정시 기상, 루틴 유지, 규칙적인 식사, 정기 검진' },
    social: { score: 75, detail: '공식적인 자리에서 좋은 인상을 줄 수 있습니다. 예의 바르고 격식을 갖춘 행동이 신뢰를 쌓아줍니다. 비즈니스 미팅이나 공식 행사에 참석하면 좋은 기회를 얻을 수 있어요.' },
    advice: '원칙을 지키면 좋은 하루가 됩니다. 정도를 걸으세요.',
    luckyTime: '오전 11시~오후 1시',
    unluckyTime: '오후 11시~새벽 1시',
    doList: ['공식 업무', '계약 검토', '면접', '공문서 처리', '정기 검진', '규칙 준수'],
    dontList: ['편법', '무단 결근', '거짓말', '약속 어기기', '비공식 루트'],
    keyword: '원칙',
  },
  '편인': {
    score: 70,
    money: { score: 65, detail: '학습이나 자기계발 투자가 좋습니다. 당장의 수익보다 미래를 위한 투자가 길게 보면 이득이 됩니다. 책, 강의, 자격증 과정에 투자하면 나중에 큰 보상으로 돌아옵니다. 직감적으로 끌리는 분야가 있다면 과감하게 시작해보세요. 지식에 대한 투자는 절대 손해 보지 않습니다.', tip: '강의 수강, 책 구매, 자격증 준비, 세미나 등록, 멘토링 신청' },
    love: { score: 70, detail: '정신적인 교감이 중요한 날입니다. 깊은 대화를 나눠보고, 서로의 내면을 이해하려고 노력하세요. 피상적인 만남보다는 진솔한 대화가 관계를 더욱 돈독하게 만듭니다. 철학적이거나 심오한 주제로 이야기하면 서로를 더 잘 알게 될 수 있어요.', tip: '진솔한 대화, 공감, 깊은 주제 대화, 함께 배우기' },
    work: { score: 75, detail: '새로운 배움의 기회가 있습니다. 연수나 교육 프로그램에 적극적으로 참여하세요. 평소 관심 있던 기술이나 트렌드를 공부하면 업무 능력이 향상됩니다. 직감적으로 끌리는 프로젝트나 분야가 있다면 도전해보세요. 오늘 얻은 지식이 내일의 경쟁력이 됩니다.', tip: '세미나 참석, 자격증 공부, 신기술 학습, 업무 연수, 온라인 강의' },
    health: { score: 65, detail: '정신 건강에 신경 쓰세요. 생각이 많아질 수 있으니 명상이나 요가로 마음을 진정시키세요. 혼자만의 조용한 시간이 필요한 날입니다. 독서나 산책으로 내면을 돌아보면 좋습니다. 과도한 고민은 피하고, 적절한 휴식을 취하세요.', tip: '독서, 명상, 산책, 요가, 혼자만의 시간' },
    social: { score: 70, detail: '지적인 모임이나 스터디에 참여하면 좋습니다. 같은 관심사를 가진 사람들과 교류하면 새로운 영감을 얻을 수 있습니다. 배움을 주고받는 관계가 오늘은 특히 유익합니다.' },
    advice: '배움에 끝은 없습니다. 오늘 배운 것이 내일의 자산이 됩니다.',
    luckyTime: '오후 8시~10시',
    unluckyTime: '오후 2시~4시',
    doList: ['공부', '독서', '온라인 강의', '세미나 참석', '스터디 모임', '자격증 준비'],
    dontList: ['결정 미루기', '현실 도피', '몽상', '무계획', '배움 거부'],
    keyword: '배움',
  },
  '정인': {
    score: 85,
    money: { score: 75, detail: '어른이나 귀인의 도움으로 재물 운이 좋아집니다. 부모님이나 멘토의 조언을 구하면 좋은 정보를 얻을 수 있어요. 감사의 마음으로 선물하거나 효도하면 예상치 못한 복이 돌아옵니다. 전통적이고 안정적인 투자 방법이 유리하며, 어른들의 경험담에서 재테크 힌트를 얻을 수 있습니다.', tip: '멘토 조언 구하기, 감사 표현, 효도, 안정적 투자, 어른 경험 경청' },
    love: { score: 85, detail: '따뜻하고 안정적인 관계가 이어집니다. 위로와 지지를 주고받으며 서로를 응원하세요. 모성애나 부성애처럼 포근한 사랑이 느껴지는 날입니다. 연인에게 따뜻한 말 한마디를 건네거나, 편안한 분위기에서 대화하면 관계가 더욱 깊어집니다. 감사의 마음을 표현하세요.', tip: '편안한 대화, 응원하기, 위로하기, 감사 표현' },
    work: { score: 80, detail: '멘토나 선배의 조언이 큰 도움이 됩니다. 가르침을 겸허히 받고 적극적으로 질문하세요. 어려운 문제가 있다면 경험이 많은 사람에게 피드백을 요청하면 해결책을 찾을 수 있습니다. 배움의 자세로 임하면 업무 능력이 크게 향상됩니다. 오늘 받은 조언이 향후 커리어에 큰 도움이 될 거예요.', tip: '선배에게 질문, 피드백 요청, 멘토링 받기, 배움의 자세, 조언 메모' },
    health: { score: 85, detail: '심신이 안정되는 날입니다. 편안한 휴식을 취하고 충분히 수면하세요. 따뜻한 차를 마시며 여유를 가지면 마음이 평온해집니다. 가족과 함께 보내는 시간이 힐링이 되며, 포근한 환경에서 쉬면 피로가 빠르게 회복됩니다. 무리하지 말고 몸과 마음의 소리에 귀 기울이세요.', tip: '충분한 수면, 따뜻한 차, 가족과 시간, 편안한 휴식, 힐링' },
    social: { score: 85, detail: '어머니, 은사님 등 어른과의 관계가 좋습니다. 오랜만에 연락드리면 좋은 소식을 듣거나 귀한 조언을 받을 수 있어요. 나이 드신 분들과의 교류가 복을 불러옵니다.' },
    advice: '감사하는 마음이 복을 부릅니다. 받은 만큼 돌려주세요.',
    luckyTime: '오전 6시~8시',
    unluckyTime: '오후 5시~7시',
    doList: ['부모님 안부', '은사님 연락', '감사 편지', '효도하기', '어른께 상담', '가족과 시간'],
    dontList: ['배은망덕', '교만', '독선', '어른 무시', '불효'],
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

export default function DailyFortuneResult({ formData, onReset, onBack, onHome }: DailyFortuneResultProps) {
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

  // HTML 다운로드 함수 - 전체 내용 포함
  const handleDownloadHtml = () => {
    const headerHtml = `
      <div class="header">
        <h1>☀️ ${todayStr} (${dayOfWeek}요일) 오늘의 운세</h1>
        <p>${userZodiac}띠 • ${userDayStem.ko}일간 (${userElement} 오행)</p>
        <p style="font-size: 0.9rem; color: #94a3b8; margin-top: 8px;">오늘의 천간: ${todayStem.ko} (${todayElement}) | 십신: ${tenGod}</p>
      </div>
    `;

    const scoreHtml = createSectionHtml('종합 운세', `
      ${createScoreBadgeHtml(finalScore, gradeInfo.grade)}
      <p style="text-align: center; color: #a78bfa; margin-top: 12px;">오늘의 키워드: #${fortune.keyword}</p>
      <p style="text-align: center; margin-top: 8px;">${elementRelation.type} - ${elementRelation.description}</p>
      <p style="text-align: center; margin-top: 16px; font-size: 1.1rem; color: #fbbf24;">"${fortune.advice}"</p>
    `, gradeInfo.emoji);

    // 분야별 상세 운세
    const categoryDetailHtml = createSectionHtml('분야별 상세 운세', `
      <div style="margin-bottom: 24px;">
        <h3 style="color: #fbbf24; margin-bottom: 8px;">💰 재물운 (${fortune.money.score}점)</h3>
        <p style="margin-bottom: 8px;">${fortune.money.detail}</p>
        <p style="color: #4ade80; font-size: 0.9rem;">💡 팁: ${fortune.money.tip}</p>
      </div>
      <div style="margin-bottom: 24px;">
        <h3 style="color: #f472b6; margin-bottom: 8px;">💕 애정운 (${fortune.love.score}점)</h3>
        <p style="margin-bottom: 8px;">${fortune.love.detail}</p>
        <p style="color: #4ade80; font-size: 0.9rem;">💡 팁: ${fortune.love.tip}</p>
      </div>
      <div style="margin-bottom: 24px;">
        <h3 style="color: #60a5fa; margin-bottom: 8px;">💼 직장운 (${fortune.work.score}점)</h3>
        <p style="margin-bottom: 8px;">${fortune.work.detail}</p>
        <p style="color: #4ade80; font-size: 0.9rem;">💡 팁: ${fortune.work.tip}</p>
      </div>
      <div style="margin-bottom: 24px;">
        <h3 style="color: #4ade80; margin-bottom: 8px;">🏃 건강운 (${fortune.health.score}점)</h3>
        <p style="margin-bottom: 8px;">${fortune.health.detail}</p>
        <p style="color: #4ade80; font-size: 0.9rem;">💡 팁: ${fortune.health.tip}</p>
      </div>
      <div>
        <h3 style="color: #a78bfa; margin-bottom: 8px;">👥 사회운 (${fortune.social.score}점)</h3>
        <p>${fortune.social.detail}</p>
      </div>
    `, '📊');

    // 시간대별 운세
    const timeFortuneHtml = createSectionHtml('시간대별 운세', `
      <div class="grid">
        <div class="card">
          <div class="card-title">🌅 오전</div>
          <div class="card-value">${timeFortune.morning.score}점</div>
          <p style="font-size: 0.85rem; color: #94a3b8; margin-top: 4px;">${timeFortune.morning.time}</p>
        </div>
        <div class="card">
          <div class="card-title">☀️ 오후</div>
          <div class="card-value">${timeFortune.afternoon.score}점</div>
          <p style="font-size: 0.85rem; color: #94a3b8; margin-top: 4px;">${timeFortune.afternoon.time}</p>
        </div>
        <div class="card">
          <div class="card-title">🌙 저녁</div>
          <div class="card-value">${timeFortune.evening.score}점</div>
          <p style="font-size: 0.85rem; color: #94a3b8; margin-top: 4px;">${timeFortune.evening.time}</p>
        </div>
        <div class="card">
          <div class="card-title">⏰ 행운의 시간</div>
          <div class="card-value" style="color: #4ade80;">${fortune.luckyTime}</div>
          <p style="font-size: 0.85rem; color: #f87171; margin-top: 4px;">피할 시간: ${fortune.unluckyTime}</p>
        </div>
      </div>
    `, '⏰');

    const doHtml = createSectionHtml('오늘 하면 좋은 일', createListHtml(fortune.doList, 'check'), '✅');
    const dontHtml = createSectionHtml('오늘 피해야 할 일', createListHtml(fortune.dontList, 'cross'), '⚠️');

    const luckyHtml = createSectionHtml('행운 아이템', createGridHtml([
      createCardHtml('행운의 색', elementColors[yongsinElement]?.name || '-', '🎨'),
      createCardHtml('행운의 숫자', elementNumbers[yongsinElement]?.join(', ') || '-', '🔢'),
      createCardHtml('행운의 방향', elementDirections[yongsinElement] || '-', '🧭'),
      createCardHtml('행운의 음식', elementFoods[yongsinElement]?.join(', ') || '-', '🍽️'),
    ]), '✨');

    // 띠 궁합 정보
    const zodiacHtml = createSectionHtml('띠 궁합', `
      <div class="grid">
        <div class="card">
          <div class="card-title">💚 오늘 잘 맞는 띠</div>
          <div class="card-value" style="color: #4ade80;">${zodiacCompat.good.join(', ')}띠</div>
        </div>
        <div class="card">
          <div class="card-title">⚠️ 오늘 조심할 띠</div>
          <div class="card-value" style="color: #f87171;">${zodiacCompat.bad.join(', ')}띠</div>
        </div>
      </div>
    `, '🐾');

    // 오행 정보
    const elementHtml = createSectionHtml('오행 분석', `
      <div class="grid">
        <div class="card">
          <div class="card-title">나의 오행</div>
          <div class="card-value">${userElement} (${userDayStem.ko})</div>
        </div>
        <div class="card">
          <div class="card-title">오늘의 오행</div>
          <div class="card-value">${todayElement} (${todayStem.ko})</div>
        </div>
        <div class="card">
          <div class="card-title">오행 관계</div>
          <div class="card-value">${elementRelation.type}</div>
        </div>
        <div class="card">
          <div class="card-title">용신 오행</div>
          <div class="card-value" style="color: #fbbf24;">${yongsinElement}</div>
        </div>
      </div>
    `, '☯️');

    const messageHtml = createSectionHtml('오늘의 특별 메시지',
      createMessageBoxHtml(getPrediction(tenGod, formData.year, formData.month, formData.day)),
    '💫');

    const fullHtml = headerHtml + scoreHtml + categoryDetailHtml + timeFortuneHtml + doHtml + dontHtml + luckyHtml + zodiacHtml + elementHtml + messageHtml;
    downloadAsHtml(fullHtml, `오늘의운세_${todayStr.replace(/\s/g, '_')}_${userDayStem.ko}일간`);
  };

  // 이메일 전송 함수
  const handleSendEmail = () => {
    const subject = `[ForceTeller] ${todayStr} 오늘의 운세 - ${userDayStem.ko}일간`;
    const body = `
━━━━━━━━━━━━━━━━━━━━
☀️ ${todayStr} 오늘의 운세
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

━━ 오늘 하면 좋은 일 ━━
${fortune.doList.map(item => `✓ ${item}`).join('\n')}

━━ 오늘 피해야 할 일 ━━
${fortune.dontList.map(item => `✗ ${item}`).join('\n')}

━━ 행운 아이템 ━━
🎨 행운의 색: ${elementColors[yongsinElement]?.name}
🔢 행운의 숫자: ${elementNumbers[yongsinElement]?.join(', ')}
🧭 행운의 방향: ${elementDirections[yongsinElement]}
⏰ 행운의 시간: ${fortune.luckyTime}

━━ 오늘의 메시지 ━━
${getPrediction(tenGod, formData.year, formData.month, formData.day)}

━━━━━━━━━━━━━━━━━━━━
ForceTeller - AI 운세 서비스
    `.trim();

    sendByEmail(subject, body);
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
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-5 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 하면 좋은 일 */}
            <div className="bg-emerald-500/10 rounded-2xl p-4">
              <h3 className="text-emerald-400 font-bold mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                오늘 하면 좋은 일
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
                오늘 피해야 할 일
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

        {/* 오늘의 메시지 */}
        <motion.div
          variants={itemVariants}
          className="relative overflow-hidden rounded-3xl p-6 mb-6"
          style={{
            background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(245, 158, 11, 0.3) 50%, rgba(217, 119, 6, 0.2) 100%)',
            border: '2px solid rgba(251, 191, 36, 0.4)',
          }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <h2 className="text-lg font-bold text-amber-300 mb-3 flex items-center gap-2">
              <Star className="w-5 h-5" />
              오늘의 메시지
            </h2>
            <p className="text-white text-xl leading-relaxed font-bold">
              {getPrediction(tenGod, formData.year, formData.month, formData.day)}
            </p>
          </div>
        </motion.div>

        {/* 내보내기 버튼 */}
        <motion.div variants={itemVariants} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleDownloadHtml}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-white font-medium hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg"
            >
              <Download className="w-5 h-5" />
              <span>저장하기</span>
            </button>
            <button
              onClick={handleSendEmail}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white font-medium hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg"
            >
              <Mail className="w-5 h-5" />
              <span>메일 보내기</span>
            </button>
          </div>

          <button
            onClick={onReset}
            className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl text-white font-bold text-lg hover:from-amber-600 hover:to-orange-700 transition-all flex items-center justify-center gap-2 shadow-lg"
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
