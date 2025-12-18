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
  천덕귀인: string[];
  월덕귀인: string[];
}> = {
  '갑': { 천을귀인: ['축', '미'], 문창귀인: ['사'], 학당귀인: ['해'], 천덕귀인: ['미', '신'], 월덕귀인: ['인', '사'] },
  '을': { 천을귀인: ['자', '신'], 문창귀인: ['오'], 학당귀인: ['오'], 천덕귀인: ['신', '유'], 월덕귀인: ['묘', '오'] },
  '병': { 천을귀인: ['해', '유'], 문창귀인: ['신'], 학당귀인: ['인'], 천덕귀인: ['유', '술'], 월덕귀인: ['진', '미'] },
  '정': { 천을귀인: ['해', '유'], 문창귀인: ['유'], 학당귀인: ['유'], 천덕귀인: ['술', '해'], 월덕귀인: ['사', '신'] },
  '무': { 천을귀인: ['축', '미'], 문창귀인: ['신'], 학당귀인: ['신'], 천덕귀인: ['해', '자'], 월덕귀인: ['오', '유'] },
  '기': { 천을귀인: ['자', '신'], 문창귀인: ['유'], 학당귀인: ['유'], 천덕귀인: ['자', '축'], 월덕귀인: ['미', '술'] },
  '경': { 천을귀인: ['축', '미'], 문창귀인: ['해'], 학당귀인: ['사'], 천덕귀인: ['축', '인'], 월덕귀인: ['신', '해'] },
  '신': { 천을귀인: ['인', '오'], 문창귀인: ['자'], 학당귀인: ['자'], 천덕귀인: ['인', '묘'], 월덕귀인: ['유', '자'] },
  '임': { 천을귀인: ['묘', '사'], 문창귀인: ['인'], 학당귀인: ['인'], 천덕귀인: ['묘', '진'], 월덕귀인: ['술', '축'] },
  '계': { 천을귀인: ['묘', '사'], 문창귀인: ['묘'], 학당귀인: ['묘'], 천덕귀인: ['진', '사'], 월덕귀인: ['해', '인'] },
};

// 일간별 상세 인연 프로필
const DAY_STEM_RELATIONSHIP_PROFILE: Record<string, {
  relationshipStyle: string;
  attractionType: string;
  idealPartnerTraits: string[];
  warningPartnerTraits: string[];
  networkingStrength: string;
  networkingWeakness: string;
  trustBuildingTip: string;
  conflictResolutionStyle: string;
  benefactorAttraction: string;
  enemyAvoidance: string;
  luckyMeetingPlaces: string[];
  luckyMeetingTimes: string[];
  relationshipAdvice: string[];
}> = {
  '갑': {
    relationshipStyle: '리더십 중심의 관계 - 주도적으로 관계를 이끌어가며, 존경받고 싶어합니다. 대인관계에서 카리스마를 발휘합니다.',
    attractionType: '성장 잠재력이 있고, 자신의 비전을 이해해주는 사람에게 끌립니다.',
    idealPartnerTraits: ['지지해주는 성향', '야망과 목표의식', '독립적이면서 협력적', '정직함', '성장 지향적'],
    warningPartnerTraits: ['지나친 의존성', '비전 없음', '소극적 태도', '거짓말', '변화 거부'],
    networkingStrength: '영향력 있는 사람들과 빠르게 연결되는 능력이 있습니다.',
    networkingWeakness: '아랫사람이나 직위가 낮은 사람을 간과할 수 있습니다.',
    trustBuildingTip: '일관된 원칙과 약속 이행으로 신뢰를 쌓으세요.',
    conflictResolutionStyle: '직접적으로 문제를 제기하고 해결책을 찾으려 합니다.',
    benefactorAttraction: '당신의 비전과 추진력에 감동받는 귀인이 나타납니다.',
    enemyAvoidance: '권력 다툼이나 자존심 대결을 피하면 악연을 줄일 수 있습니다.',
    luckyMeetingPlaces: ['비즈니스 컨퍼런스', '리더십 세미나', '골프장', '고급 레스토랑', '동창회'],
    luckyMeetingTimes: ['봄철 (2-4월)', '월요일', '아침 시간', '새해 첫 주'],
    relationshipAdvice: ['겸손함을 유지하세요', '경청하는 습관을 기르세요', '작은 약속도 지키세요', '감사 표현을 자주 하세요', '후배를 돌보면 귀인이 됩니다']
  },
  '을': {
    relationshipStyle: '유연하고 조화로운 관계 - 갈등을 피하고 원만한 관계를 선호합니다. 적응력이 뛰어나 다양한 사람과 잘 어울립니다.',
    attractionType: '안정감을 주고, 함께 성장할 수 있는 사람에게 끌립니다.',
    idealPartnerTraits: ['배려심 깊은', '안정적인', '소통이 잘 되는', '따뜻한', '인내심 있는'],
    warningPartnerTraits: ['독단적인', '폭력적인', '무관심한', '변덕스러운', '이기적인'],
    networkingStrength: '자연스럽게 사람들을 연결시켜주는 능력이 있습니다.',
    networkingWeakness: '거절을 잘 못해서 부담스러운 관계에 휘말릴 수 있습니다.',
    trustBuildingTip: '꾸준한 연락과 작은 배려로 신뢰를 쌓으세요.',
    conflictResolutionStyle: '중재자 역할을 하며 타협점을 찾으려 합니다.',
    benefactorAttraction: '당신의 겸손함과 배려심에 감동받는 귀인이 나타납니다.',
    enemyAvoidance: '명확한 거절과 경계 설정으로 악연을 피할 수 있습니다.',
    luckyMeetingPlaces: ['카페', '문화센터', '봉사활동', '원예/꽃집', '친구 소개 자리'],
    luckyMeetingTimes: ['봄철 (3-5월)', '금요일', '오후 시간', '꽃 피는 계절'],
    relationshipAdvice: ['자기 의견을 명확히 표현하세요', '건강한 거절을 배우세요', '자기 시간을 확보하세요', '진심 어린 칭찬을 하세요', '연결고리가 되어주면 귀인이 늘어납니다']
  },
  '병': {
    relationshipStyle: '열정적이고 활발한 관계 - 에너지 넘치는 교류를 좋아하며, 다양한 인맥을 형성합니다.',
    attractionType: '자신의 열정을 이해하고, 함께 즐길 수 있는 사람에게 끌립니다.',
    idealPartnerTraits: ['긍정적인', '활발한', '모험심 있는', '지지해주는', '유머감각 있는'],
    warningPartnerTraits: ['부정적인', '에너지 흡수형', '질투심 강한', '제한적인', '보수적인'],
    networkingStrength: '첫인상이 좋아 빠르게 친해지는 능력이 있습니다.',
    networkingWeakness: '깊이보다 넓이를 추구해 피상적 관계가 될 수 있습니다.',
    trustBuildingTip: '진정성 있는 관심과 꾸준한 연락으로 신뢰를 쌓으세요.',
    conflictResolutionStyle: '감정을 표현하고 빨리 화해하려 합니다.',
    benefactorAttraction: '당신의 밝은 에너지와 열정에 감동받는 귀인이 나타납니다.',
    enemyAvoidance: '과도한 자기 PR을 줄이면 악연을 피할 수 있습니다.',
    luckyMeetingPlaces: ['파티', 'SNS/인스타그램', '운동 동호회', '페스티벌', '여행지'],
    luckyMeetingTimes: ['여름철 (5-7월)', '일요일', '점심~오후 시간', '화창한 날'],
    relationshipAdvice: ['깊이 있는 대화를 시도하세요', '약속 시간을 지키세요', '진정성 있는 관계를 유지하세요', '타인의 공간을 존중하세요', '나눔과 봉사로 귀인을 만나세요']
  },
  '정': {
    relationshipStyle: '섬세하고 깊이 있는 관계 - 소수의 사람과 깊은 유대감을 형성합니다. 진정성 있는 관계를 추구합니다.',
    attractionType: '내면의 아름다움과 지적 깊이가 있는 사람에게 끌립니다.',
    idealPartnerTraits: ['섬세한', '예술적인', '깊이 있는', '신뢰할 수 있는', '감성적인'],
    warningPartnerTraits: ['둔감한', '거칠거나 무례한', '얕은', '불성실한', '공감 능력 부족'],
    networkingStrength: '진심을 나누는 관계 형성 능력이 있습니다.',
    networkingWeakness: '새로운 만남에 소극적일 수 있습니다.',
    trustBuildingTip: '진심 어린 대화와 시간 투자로 신뢰를 쌓으세요.',
    conflictResolutionStyle: '시간을 두고 감정을 정리한 후 대화합니다.',
    benefactorAttraction: '당신의 진정성과 섬세함에 감동받는 귀인이 나타납니다.',
    enemyAvoidance: '완벽주의를 내려놓으면 악연을 줄일 수 있습니다.',
    luckyMeetingPlaces: ['미술관', '작은 모임', '독서 동호회', '카페', '예술 강좌'],
    luckyMeetingTimes: ['여름 저녁 (6-8월)', '토요일', '저녁 시간', '보름달 밤'],
    relationshipAdvice: ['먼저 다가가는 용기를 내세요', '완벽을 기대하지 마세요', '감정을 솔직히 표현하세요', '작은 선물과 편지로 마음을 전하세요', '예술 활동에서 귀인을 만나세요']
  },
  '무': {
    relationshipStyle: '신뢰와 안정 기반의 관계 - 한번 맺은 관계를 오래 유지하며, 책임감 있게 대합니다.',
    attractionType: '성실하고 믿음직한 사람에게 끌립니다.',
    idealPartnerTraits: ['성실한', '안정적인', '책임감 있는', '가정적인', '신뢰할 수 있는'],
    warningPartnerTraits: ['불성실한', '변덕스러운', '무책임한', '가벼운', '신뢰 못할'],
    networkingStrength: '오래된 관계를 잘 유지하는 능력이 있습니다.',
    networkingWeakness: '새로운 관계를 시작하는 데 느릴 수 있습니다.',
    trustBuildingTip: '일관된 행동과 약속 이행으로 신뢰를 쌓으세요.',
    conflictResolutionStyle: '시간을 두고 차분하게 해결하려 합니다.',
    benefactorAttraction: '당신의 신뢰성과 책임감에 감동받는 귀인이 나타납니다.',
    enemyAvoidance: '고집을 조금 내려놓으면 악연을 피할 수 있습니다.',
    luckyMeetingPlaces: ['고향', '가족 모임', '부동산 관련', '종교 행사', '동창회'],
    luckyMeetingTimes: ['환절기 (3,6,9,12월)', '수요일', '낮 시간', '명절'],
    relationshipAdvice: ['새로운 만남에 열린 마세요', '변화를 두려워하지 마세요', '감정 표현을 연습하세요', '유연성을 기르세요', '오래된 친구에게서 귀인을 소개받으세요']
  },
  '기': {
    relationshipStyle: '돌봄과 헌신의 관계 - 상대방을 챙기고 돌보는 것을 좋아합니다. 따뜻한 관계를 형성합니다.',
    attractionType: '감사할 줄 알고, 함께 성장하려는 사람에게 끌립니다.',
    idealPartnerTraits: ['감사할 줄 아는', '따뜻한', '성장 지향적', '배려심 있는', '가족 중시하는'],
    warningPartnerTraits: ['당연시하는', '차가운', '이용하려는', '이기적인', '감사 모르는'],
    networkingStrength: '사람들이 편하게 느끼는 분위기를 만드는 능력이 있습니다.',
    networkingWeakness: '자기 욕구를 무시하고 남을 돌보느라 지칠 수 있습니다.',
    trustBuildingTip: '꾸준한 돌봄과 관심으로 신뢰를 쌓으세요.',
    conflictResolutionStyle: '상대방 입장에서 먼저 이해하려 합니다.',
    benefactorAttraction: '당신의 따뜻함과 헌신에 감동받는 귀인이 나타납니다.',
    enemyAvoidance: '건강한 경계를 설정하면 악연을 줄일 수 있습니다.',
    luckyMeetingPlaces: ['학교/교육기관', '봉사활동', '요리 교실', '육아 모임', '동네 커뮤니티'],
    luckyMeetingTimes: ['환절기', '화요일', '오전 시간', '나눔 행사'],
    relationshipAdvice: ['자기 자신도 돌보세요', '거절하는 법을 배우세요', '주는 것과 받는 것의 균형', '감사 표현을 자주 하세요', '도움 주는 곳에서 귀인을 만나세요']
  },
  '경': {
    relationshipStyle: '명확하고 공정한 관계 - 원칙과 정의를 중시하며, 공정한 관계를 추구합니다.',
    attractionType: '실력 있고 자신감 있는 사람에게 끌립니다.',
    idealPartnerTraits: ['능력 있는', '정직한', '원칙 있는', '자신감 있는', '독립적인'],
    warningPartnerTraits: ['불공정한', '거짓된', '나약한', '의존적인', '비겁한'],
    networkingStrength: '전문가 네트워크를 구축하는 능력이 있습니다.',
    networkingWeakness: '감정적 친밀감보다 능력을 우선시해 차갑게 보일 수 있습니다.',
    trustBuildingTip: '공정한 대우와 약속 이행으로 신뢰를 쌓으세요.',
    conflictResolutionStyle: '논리적으로 문제를 분석하고 해결책을 제시합니다.',
    benefactorAttraction: '당신의 실력과 정직함에 감동받는 귀인이 나타납니다.',
    enemyAvoidance: '너무 날카로운 비판을 줄이면 악연을 피할 수 있습니다.',
    luckyMeetingPlaces: ['비즈니스 미팅', '법률/금융 관련', '스포츠 클럽', '전문가 모임', '투자 세미나'],
    luckyMeetingTimes: ['가을철 (8-10월)', '목요일', '업무 시간', '분기말'],
    relationshipAdvice: ['감정도 인정하세요', '타인의 약점에 관대하세요', '따뜻함을 표현하세요', '경쟁보다 협력을 선택하세요', '멘토링에서 귀인을 만나세요']
  },
  '신': {
    relationshipStyle: '정교하고 신중한 관계 - 사람을 쉽게 믿지 않지만, 한번 믿으면 깊이 신뢰합니다.',
    attractionType: '섬세하고 진정성 있는 사람에게 끌립니다.',
    idealPartnerTraits: ['섬세한', '신중한', '정직한', '품격 있는', '인내심 있는'],
    warningPartnerTraits: ['거친', '성급한', '거짓된', '천박한', '조급한'],
    networkingStrength: '깊이 있는 전문가 관계를 형성하는 능력이 있습니다.',
    networkingWeakness: '첫 만남에서 경계심이 강해 기회를 놓칠 수 있습니다.',
    trustBuildingTip: '시간을 두고 천천히 진정성을 보여주면서 신뢰를 쌓으세요.',
    conflictResolutionStyle: '분석하고 판단한 후 정확한 해결책을 제시합니다.',
    benefactorAttraction: '당신의 전문성과 정직함에 감동받는 귀인이 나타납니다.',
    enemyAvoidance: '예민함을 조절하면 악연을 줄일 수 있습니다.',
    luckyMeetingPlaces: ['전문 강좌', '기술 관련 모임', '품질 중시 환경', '보석/시계 관련', 'IT 커뮤니티'],
    luckyMeetingTimes: ['가을철 (8-10월)', '금요일', '저녁 시간', '마감 전'],
    relationshipAdvice: ['첫인상에 너무 얽매이지 마세요', '완벽주의를 내려놓으세요', '먼저 마음을 열어보세요', '작은 결점을 용서하세요', '전문 분야에서 귀인을 만나세요']
  },
  '임': {
    relationshipStyle: '자유롭고 개방적인 관계 - 다양한 배경의 사람들과 교류하며, 열린 마음으로 관계를 맺습니다.',
    attractionType: '지적이고 독창적인 사람에게 끌립니다.',
    idealPartnerTraits: ['지적인', '독립적인', '개방적인', '모험심 있는', '창의적인'],
    warningPartnerTraits: ['편협한', '의존적인', '폐쇄적인', '보수적인', '창의성 없는'],
    networkingStrength: '다양한 문화권의 사람들과 연결되는 능력이 있습니다.',
    networkingWeakness: '깊이보다 넓이를 추구해 관계가 지속되지 않을 수 있습니다.',
    trustBuildingTip: '꾸준한 연락과 약속 이행으로 신뢰를 쌓으세요.',
    conflictResolutionStyle: '큰 그림에서 문제를 바라보고 유연하게 해결합니다.',
    benefactorAttraction: '당신의 지혜와 포용력에 감동받는 귀인이 나타납니다.',
    enemyAvoidance: '약속을 철저히 지키면 악연을 피할 수 있습니다.',
    luckyMeetingPlaces: ['해외', '국제 행사', '여행지', '온라인 커뮤니티', '대학/연구소'],
    luckyMeetingTimes: ['겨울철 (11-1월)', '월요일', '밤 시간', '해외 출장 중'],
    relationshipAdvice: ['한 곳에 뿌리를 내려보세요', '오래된 친구를 소중히 하세요', '약속을 꼭 지키세요', '깊이 있는 대화를 시도하세요', '글로벌 네트워크에서 귀인을 만나세요']
  },
  '계': {
    relationshipStyle: '감성적이고 직관적인 관계 - 말보다 느낌으로 소통하며, 영적인 연결을 중시합니다.',
    attractionType: '영적 깊이가 있고 감성적인 사람에게 끌립니다.',
    idealPartnerTraits: ['감성적인', '직관적인', '영적인', '예술적인', '공감 능력 높은'],
    warningPartnerTraits: ['무감각한', '물질적인', '둔감한', '냉소적인', '공감 부족한'],
    networkingStrength: '영적/예술적 커뮤니티에서 깊은 인연을 만드는 능력이 있습니다.',
    networkingWeakness: '현실적 관계보다 이상적 관계를 추구해 어려움이 있을 수 있습니다.',
    trustBuildingTip: '진심 어린 공감과 영적 교류로 신뢰를 쌓으세요.',
    conflictResolutionStyle: '감정을 먼저 이해하고 치유를 추구합니다.',
    benefactorAttraction: '당신의 직관력과 영적 깊이에 감동받는 귀인이 나타납니다.',
    enemyAvoidance: '현실 감각을 유지하면 악연을 줄일 수 있습니다.',
    luckyMeetingPlaces: ['명상센터', '예술 관련', '영적 모임', '심리 상담', '음악/공연장'],
    luckyMeetingTimes: ['겨울 밤 (11-1월)', '토요일', '밤 시간', '명상 중'],
    relationshipAdvice: ['현실적인 기준도 가지세요', '경계를 명확히 하세요', '직관을 신뢰하되 검증하세요', '감정 정리 시간을 가지세요', '영적 모임에서 귀인을 만나세요']
  }
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

  // 일간별 인연 프로필
  const relationshipProfile = DAY_STEM_RELATIONSHIP_PROFILE[dayStem] || DAY_STEM_RELATIONSHIP_PROFILE['갑'];

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

            {/* 천덕귀인 */}
            <motion.div variants={itemVariants} className="glass rounded-3xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6 text-pink-400" />
                <h2 className="text-xl font-bold text-white">천덕귀인 (天德貴人)</h2>
              </div>
              <p className="text-slate-400 text-sm mb-4">{GUIIN_TYPES.천덕귀인.description}</p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {guiinInfo.천덕귀인.map((branch) => {
                  const zodiac = ZODIAC_ANIMALS[branch];
                  const years = getZodiacYears(branch);
                  return (
                    <div key={branch} className="p-4 bg-pink-500/10 rounded-xl border border-pink-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-3xl">{zodiac?.emoji}</span>
                        <span className="font-bold text-pink-400">{zodiac?.name}</span>
                      </div>
                      <div className="text-xs text-slate-400">
                        출생년도: {years.slice(0, 4).join(', ')}년생...
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="p-3 bg-slate-800/50 rounded-xl">
                <div className="text-sm text-slate-400">🙏 이렇게 찾아보세요</div>
                <div className="text-white text-sm">{GUIIN_TYPES.천덕귀인.howToFind}</div>
              </div>
            </motion.div>

            {/* 월덕귀인 */}
            <motion.div variants={itemVariants} className="glass rounded-3xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-6 h-6 text-cyan-400" />
                <h2 className="text-xl font-bold text-white">월덕귀인 (月德貴人)</h2>
              </div>
              <p className="text-slate-400 text-sm mb-4">{GUIIN_TYPES.월덕귀인.description}</p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {guiinInfo.월덕귀인.map((branch) => {
                  const zodiac = ZODIAC_ANIMALS[branch];
                  const years = getZodiacYears(branch);
                  return (
                    <div key={branch} className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-3xl">{zodiac?.emoji}</span>
                        <span className="font-bold text-cyan-400">{zodiac?.name}</span>
                      </div>
                      <div className="text-xs text-slate-400">
                        출생년도: {years.slice(0, 4).join(', ')}년생...
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="p-3 bg-slate-800/50 rounded-xl">
                <div className="text-sm text-slate-400">💰 이렇게 찾아보세요</div>
                <div className="text-white text-sm">{GUIIN_TYPES.월덕귀인.howToFind}</div>
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

            {/* 파살 */}
            <motion.div variants={itemVariants} className="glass rounded-3xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-bold text-white">파살 (破煞)</h2>
              </div>
              <p className="text-slate-400 text-sm mb-4">{AKYEON_TYPES.파살.description}</p>
              <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/30 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl">{ZODIAC_ANIMALS[akyeonInfo.파살]?.emoji}</span>
                  <span className="font-bold text-purple-400">{ZODIAC_ANIMALS[akyeonInfo.파살]?.name}</span>
                </div>
                <div className="text-xs text-slate-400">
                  출생년도: {getZodiacYears(akyeonInfo.파살).slice(0, 5).join(', ')}년생...
                </div>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-xl">
                <div className="text-sm text-purple-400 flex items-center gap-2">
                  <Shield className="w-4 h-4" /> 대처법
                </div>
                <div className="text-white text-sm">{AKYEON_TYPES.파살.howToHandle}</div>
              </div>
            </motion.div>

            {/* 해살 */}
            <motion.div variants={itemVariants} className="glass rounded-3xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-amber-400" />
                <h2 className="text-xl font-bold text-white">해살 (害煞)</h2>
              </div>
              <p className="text-slate-400 text-sm mb-4">{AKYEON_TYPES.해살.description}</p>
              <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/30 mb-4">
                <div className="text-amber-300 text-sm">{AKYEON_TYPES.해살.warning}</div>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-xl">
                <div className="text-sm text-amber-400 flex items-center gap-2">
                  <Shield className="w-4 h-4" /> 대처법
                </div>
                <div className="text-white text-sm">{AKYEON_TYPES.해살.howToHandle}</div>
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

        {/* ===== 일간별 상세 인연 프로필 시작 ===== */}

        {/* 나의 인연 스타일 */}
        <motion.div variants={itemVariants} className="glass rounded-3xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-violet-400" />
            <h2 className="text-xl font-bold text-white">{dayStem}일간 인연 스타일</h2>
          </div>
          <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl p-4 mb-4">
            <p className="text-violet-200 leading-relaxed">{relationshipProfile.relationshipStyle}</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4">
            <h3 className="text-sm font-medium text-slate-400 mb-2">💕 끌리는 타입</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{relationshipProfile.attractionType}</p>
          </div>
        </motion.div>

        {/* 이상적 vs 경계 파트너 */}
        <motion.div variants={itemVariants} className="glass rounded-3xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold text-white">이상적 파트너 vs 경계 파트너</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
              <h3 className="text-emerald-400 font-medium mb-3 flex items-center gap-2">
                <span>✅</span> 이상적인 파트너 특성
              </h3>
              <ul className="space-y-2">
                {relationshipProfile.idealPartnerTraits.map((trait, i) => (
                  <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    {trait}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
              <h3 className="text-red-400 font-medium mb-3 flex items-center gap-2">
                <span>⚠️</span> 경계해야 할 파트너 특성
              </h3>
              <ul className="space-y-2">
                {relationshipProfile.warningPartnerTraits.map((trait, i) => (
                  <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    {trait}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* 네트워킹 강점/약점 */}
        <motion.div variants={itemVariants} className="glass rounded-3xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Handshake className="w-6 h-6 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">네트워킹 능력</h2>
          </div>
          <div className="space-y-4">
            <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-4">
              <h3 className="text-indigo-400 font-medium mb-2">💪 네트워킹 강점</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{relationshipProfile.networkingStrength}</p>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
              <h3 className="text-orange-400 font-medium mb-2">🔧 개선할 점</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{relationshipProfile.networkingWeakness}</p>
            </div>
          </div>
        </motion.div>

        {/* 신뢰 구축 & 갈등 해결 */}
        <motion.div variants={itemVariants} className="glass rounded-3xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-teal-400" />
            <h2 className="text-xl font-bold text-white">관계 전략</h2>
          </div>
          <div className="space-y-4">
            <div className="bg-teal-500/10 border border-teal-500/30 rounded-xl p-4">
              <h3 className="text-teal-400 font-medium mb-2">🤝 신뢰 쌓는 법</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{relationshipProfile.trustBuildingTip}</p>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
              <h3 className="text-purple-400 font-medium mb-2">⚔️ 갈등 해결 스타일</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{relationshipProfile.conflictResolutionStyle}</p>
            </div>
          </div>
        </motion.div>

        {/* 귀인 끌어당기기 & 악연 피하기 */}
        <motion.div variants={itemVariants} className="glass rounded-3xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-bold text-white">귀인과 악연 관리</h2>
          </div>
          <div className="space-y-4">
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
              <h3 className="text-emerald-400 font-medium mb-2">✨ 귀인 끌어당기기</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{relationshipProfile.benefactorAttraction}</p>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
              <h3 className="text-red-400 font-medium mb-2">🛡️ 악연 피하기</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{relationshipProfile.enemyAvoidance}</p>
            </div>
          </div>
        </motion.div>

        {/* 행운의 만남 장소 & 시간 */}
        <motion.div variants={itemVariants} className="glass rounded-3xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-rose-400" />
            <h2 className="text-xl font-bold text-white">행운의 만남</h2>
          </div>
          <div className="space-y-4">
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4">
              <h3 className="text-rose-400 font-medium mb-3">📍 행운의 만남 장소</h3>
              <div className="flex flex-wrap gap-2">
                {relationshipProfile.luckyMeetingPlaces.map((place, i) => (
                  <span key={i} className="px-3 py-1 bg-rose-500/20 text-rose-300 rounded-full text-sm">
                    {place}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
              <h3 className="text-amber-400 font-medium mb-3">⏰ 행운의 만남 시간</h3>
              <div className="flex flex-wrap gap-2">
                {relationshipProfile.luckyMeetingTimes.map((time, i) => (
                  <span key={i} className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-sm">
                    {time}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 인연 핵심 조언 */}
        <motion.div variants={itemVariants} className="glass rounded-3xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Gift className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">인연 핵심 조언</h2>
          </div>
          <div className="space-y-3">
            {relationshipProfile.relationshipAdvice.map((advice, i) => (
              <div key={i} className="flex gap-3 items-start bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-3">
                <div className="w-6 h-6 rounded-full bg-cyan-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-cyan-400 text-sm font-bold">{i + 1}</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{advice}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ===== 일간별 상세 인연 프로필 끝 ===== */}

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
