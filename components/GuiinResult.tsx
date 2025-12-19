'use client';

import { motion } from 'framer-motion';
import { Users, ArrowLeft, RefreshCw, Star, Heart, AlertTriangle, Shield, Sparkles, UserCheck, UserX, Handshake, Crown, Target, Zap, Gift, Clock, Download, Mail, MapPin, Calendar, TrendingUp, Lightbulb, Compass, Palette, Hash } from 'lucide-react';
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

// 귀인 유형별 상세 특징
const GUIIN_DETAILED_CHARACTERISTICS: Record<string, {
  appearance: string[];
  personality: string[];
  occupation: string[];
  meetingPlace: string[];
  meetingTiming: string[];
}> = {
  '천을귀인': {
    appearance: ['품격 있는 외모', '단정하고 깔끔한 스타일', '카리스마가 느껴지는 눈빛', '자신감 있는 자세', '고급스러운 옷차림'],
    personality: ['책임감이 강함', '결단력이 있음', '너그럽고 포용력이 있음', '정의로움', '리더십이 뛰어남'],
    occupation: ['경영진/임원', '정부 고위 공무원', '대학 교수', '의사/변호사', '성공한 사업가', '정치인', '종교 지도자'],
    meetingPlace: ['고급 레스토랑', '비즈니스 세미나', '골프장', '대학 행사', '동창회', '사회봉사 모임'],
    meetingTiming: ['중요한 프로젝트 시작 전', '위기 상황', '진로 결정 시기', '새로운 도전 앞에서', '승진/이직 전'],
  },
  '문창귀인': {
    appearance: ['지적인 인상', '안경을 낀 경우가 많음', '차분한 복장', '책이나 노트를 들고 있음', '단정한 헤어스타일'],
    personality: ['지식이 풍부함', '설명을 잘함', '인내심이 있음', '체계적임', '배움을 즐김'],
    occupation: ['교사/교수', '학원 강사', '작가/편집자', '연구원', '컨설턴트', '전문 강사', '출판 관계자'],
    meetingPlace: ['도서관', '서점', '교육기관', '학회/세미나', '스터디 카페', '온라인 강의', '학술 행사'],
    meetingTiming: ['시험 준비 중', '새로운 분야 공부 시작', '자격증 취득 준비', '논문/프로젝트 진행', '진로 고민 중'],
  },
  '천덕귀인': {
    appearance: ['따뜻한 미소', '부드러운 인상', '편안한 복장', '모성/부성적 느낌', '자연스러운 스타일'],
    personality: ['포용력이 크다', '용서를 잘함', '무조건적 사랑', '희생정신', '공감 능력이 뛰어남'],
    occupation: ['사회복지사', '상담사', '간호사', '보육교사', '종교인', '자원봉사자', '심리치료사'],
    meetingPlace: ['교회/사찰/성당', '봉사활동 현장', '상담센터', '커뮤니티 센터', '가족 모임', '명상원'],
    meetingTiming: ['큰 실수를 했을 때', '마음의 상처가 있을 때', '용서가 필요한 순간', '정서적 지지가 필요할 때', '재기가 필요한 시점'],
  },
  '월덕귀인': {
    appearance: ['성공한 사람의 기운', '명품 소지품', '여유로운 태도', '건강한 피부', '세련된 스타일'],
    personality: ['풍족함', '관대함', '사교적', '낙천적', '기회를 주는 성향'],
    occupation: ['투자자', '사업가', '부동산 전문가', '금융인', 'CEO', '마케터', '영업 전문가'],
    meetingPlace: ['투자 세미나', '네트워킹 행사', '비즈니스 클럽', '부동산 박람회', '창업 설명회', '고급 호텔 라운지'],
    meetingTiming: ['사업 시작 전', '투자 기회 모색', '재정적 어려움', '새로운 수입원 필요', '확장/성장 준비'],
  },
  '태을귀인': {
    appearance: ['신비로운 분위기', '독특한 스타일', '예술적 감각', '개성 있는 패션', '영적인 느낌'],
    personality: ['직관력이 뛰어남', '영적 깊이', '독창적', '신비주의', '초월적 시각'],
    occupation: ['역술인', '예술가', '영적 지도자', '대체의학 전문가', '심리학자', '철학자', '명상 강사'],
    meetingPlace: ['명상센터', '요가원', '예술 갤러리', '영적 모임', '대안 치유 센터', '철학 강좌'],
    meetingTiming: ['영적 각성 시기', '인생의 의미 찾을 때', '초월적 경험 후', '깊은 내면 탐구', '운명적 전환점'],
  },
};

// 일간별 행운 요소
const DAY_STEM_LUCKY_ELEMENTS: Record<string, {
  colors: string[];
  directions: string[];
  numbers: number[];
  days: string[];
  seasons: string[];
  elements: string[];
}> = {
  '갑': {
    colors: ['초록색', '청록색', '연두색', '카키색'],
    directions: ['동쪽', '동남쪽'],
    numbers: [3, 8, 13, 18, 23, 28],
    days: ['목요일', '토요일'],
    seasons: ['봄'],
    elements: ['나무', '물']
  },
  '을': {
    colors: ['연두색', '민트색', '하늘색', '흰색'],
    directions: ['동쪽', '남동쪽'],
    numbers: [3, 8, 11, 16, 21, 26],
    days: ['금요일', '일요일'],
    seasons: ['봄', '여름 초'],
    elements: ['나무', '꽃']
  },
  '병': {
    colors: ['빨간색', '주황색', '분홍색', '자주색'],
    directions: ['남쪽', '동남쪽'],
    numbers: [2, 7, 12, 17, 22, 27],
    days: ['화요일', '일요일'],
    seasons: ['여름'],
    elements: ['불', '태양']
  },
  '정': {
    colors: ['연분홍', '보라색', '라벤더', '와인색'],
    directions: ['남쪽', '남서쪽'],
    numbers: [2, 7, 9, 14, 19, 24],
    days: ['화요일', '토요일'],
    seasons: ['여름', '가을 초'],
    elements: ['불', '별']
  },
  '무': {
    colors: ['갈색', '베이지', '황토색', '노란색'],
    directions: ['중앙', '남서쪽'],
    numbers: [5, 10, 15, 20, 25, 30],
    days: ['토요일', '수요일'],
    seasons: ['환절기', '늦여름'],
    elements: ['흙', '산']
  },
  '기': {
    colors: ['연노랑', '아이보리', '크림색', '살구색'],
    directions: ['중앙', '북동쪽'],
    numbers: [5, 10, 12, 17, 22, 27],
    days: ['토요일', '화요일'],
    seasons: ['환절기', '봄'],
    elements: ['흙', '밭']
  },
  '경': {
    colors: ['흰색', '은색', '회색', '금색'],
    directions: ['서쪽', '북서쪽'],
    numbers: [4, 9, 14, 19, 24, 29],
    days: ['금요일', '월요일'],
    seasons: ['가을'],
    elements: ['금속', '칼']
  },
  '신': {
    colors: ['백금색', '진주색', '밝은 회색', '크롬색'],
    directions: ['서쪽', '남서쪽'],
    numbers: [4, 9, 11, 16, 21, 26],
    days: ['금요일', '수요일'],
    seasons: ['가을', '늦가을'],
    elements: ['금속', '보석']
  },
  '임': {
    colors: ['검은색', '남색', '진청색', '짙은 회색'],
    directions: ['북쪽', '북서쪽'],
    numbers: [1, 6, 11, 16, 21, 26],
    days: ['월요일', '수요일'],
    seasons: ['겨울'],
    elements: ['물', '바다']
  },
  '계': {
    colors: ['하늘색', '물색', '연보라', '은회색'],
    directions: ['북쪽', '북동쪽'],
    numbers: [1, 6, 13, 18, 23, 28],
    days: ['월요일', '목요일'],
    seasons: ['겨울', '초봄'],
    elements: ['물', '비']
  },
};

// 월별 귀인운 (1-12월)
const MONTHLY_GUIIN_FORTUNE: Record<number, {
  title: string;
  description: string;
  advice: string;
  luckyDay: string;
}> = {
  1: {
    title: '새로운 시작의 귀인운',
    description: '새해를 맞아 중요한 귀인을 만날 가능성이 높습니다. 특히 직장 상사나 선배를 통한 기회가 찾아옵니다.',
    advice: '새해 인사와 함께 적극적으로 네트워킹하세요. 동창회나 신년 모임에 참석하면 좋습니다.',
    luckyDay: '1월 8일, 18일, 28일'
  },
  2: {
    title: '인맥 확장의 귀인운',
    description: '새로운 사람들을 만날 기회가 많습니다. SNS나 온라인을 통한 인연도 좋습니다.',
    advice: '모임이나 세미나에 적극 참여하세요. 명함을 많이 나눠주고 연락처를 교환하세요.',
    luckyDay: '2월 3일, 13일, 23일'
  },
  3: {
    title: '학업/교육 귀인운',
    description: '문창귀인을 만날 확률이 높습니다. 스승이나 멘토를 만나기 좋은 시기입니다.',
    advice: '배움의 기회를 놓치지 마세요. 강의나 교육 프로그램에 등록하면 좋은 인연을 만납니다.',
    luckyDay: '3월 5일, 15일, 25일'
  },
  4: {
    title: '성장 기회의 귀인운',
    description: '당신의 능력을 알아봐주는 귀인이 나타납니다. 승진이나 새로운 프로젝트 기회가 있습니다.',
    advice: '자신의 실력을 적극적으로 어필하세요. 포트폴리오나 성과를 정리해두세요.',
    luckyDay: '4월 7일, 17일, 27일'
  },
  5: {
    title: '재물 귀인운',
    description: '월덕귀인을 만날 가능성이 높습니다. 투자나 사업 파트너를 만날 수 있습니다.',
    advice: '금전적 기회를 신중하게 검토하세요. 신뢰할 수 있는 사람과 상의하세요.',
    luckyDay: '5월 9일, 19일, 29일'
  },
  6: {
    title: '협력의 귀인운',
    description: '팀워크와 협업을 통한 귀인운이 강합니다. 동료나 파트너가 큰 도움이 됩니다.',
    advice: '혼자보다 함께하세요. 협업 프로젝트나 공동 작업을 시작하기 좋습니다.',
    luckyDay: '6월 6일, 16일, 26일'
  },
  7: {
    title: '변화의 귀인운',
    description: '인생의 전환점에서 도와주는 귀인이 나타납니다. 이직이나 진로 변경 시 조언자를 만납니다.',
    advice: '변화를 두려워하지 마세요. 새로운 환경에서 귀인을 만날 수 있습니다.',
    luckyDay: '7월 3일, 13일, 23일'
  },
  8: {
    title: '실력 인정의 귀인운',
    description: '전문성을 인정받는 시기입니다. 같은 분야의 전문가나 선배가 도움을 줍니다.',
    advice: '전문성을 더욱 갈고닦으세요. 자격증이나 스킬 향상에 투자하면 좋습니다.',
    luckyDay: '8월 8일, 18일, 28일'
  },
  9: {
    title: '사회적 귀인운',
    description: '폭넓은 인맥을 통한 기회가 많습니다. 소개를 통한 좋은 만남이 있습니다.',
    advice: '사교 활동을 활발히 하세요. 친구의 소개를 적극 받아들이세요.',
    luckyDay: '9월 9일, 19일, 29일'
  },
  10: {
    title: '안정과 보호의 귀인운',
    description: '천덕귀인의 도움을 받기 좋은 시기입니다. 어려움에서 구해주는 사람이 나타납니다.',
    advice: '어려움을 숨기지 말고 도움을 요청하세요. 주변의 조언에 귀 기울이세요.',
    luckyDay: '10월 1일, 11일, 21일'
  },
  11: {
    title: '지혜의 귀인운',
    description: '인생의 지혜를 전해주는 어른이나 선배를 만납니다. 중요한 조언을 듣게 됩니다.',
    advice: '경험 많은 분들의 이야기를 경청하세요. 멘토링을 받으면 큰 도움이 됩니다.',
    luckyDay: '11월 6일, 16일, 26일'
  },
  12: {
    title: '마무리와 감사의 귀인운',
    description: '한 해를 정리하며 도움 받은 귀인들에게 감사하는 시기입니다. 인연이 더욱 깊어집니다.',
    advice: '감사 인사를 전하세요. 작은 선물이나 카드로 마음을 표현하면 좋습니다.',
    luckyDay: '12월 3일, 13일, 23일'
  },
};

// 귀인 활성화 방법
const GUIIN_ACTIVATION_METHODS = [
  {
    title: '매일 감사 일기 쓰기',
    description: '매일 자신에게 도움을 준 사람들을 떠올리며 감사 일기를 작성합니다.',
    effect: '감사의 에너지가 더 많은 귀인을 끌어당깁니다.',
    howTo: '하루 3명, 그들이 준 도움을 구체적으로 적고 감사한 마음을 느껴보세요.',
    icon: '📝'
  },
  {
    title: '먼저 베푸는 사람 되기',
    description: '귀인을 만나려면 먼저 남에게 귀인이 되어주어야 합니다.',
    effect: '선한 영향력이 순환하여 귀인운이 증가합니다.',
    howTo: '일주일에 한 번, 누군가에게 작은 도움을 주는 실천을 하세요.',
    icon: '🤲'
  },
  {
    title: '귀인 띠 컬러 활용',
    description: '귀인 띠와 연관된 색상을 생활에 활용합니다.',
    effect: '무의식적으로 귀인 에너지를 끌어당깁니다.',
    howTo: '귀인 띠 색상의 소품, 옷, 액세서리를 착용하세요.',
    icon: '🎨'
  },
  {
    title: '행운의 방향 활용',
    description: '중요한 미팅이나 면접 시 행운의 방향에서 오거나 그 방향을 향해 앉습니다.',
    effect: '좋은 기운을 받아 귀인을 만날 확률이 높아집니다.',
    howTo: '나침반 앱으로 방향을 확인하고 의식적으로 활용하세요.',
    icon: '🧭'
  },
  {
    title: '네트워킹 적극 참여',
    description: '모임, 세미나, 동호회 등에 꾸준히 참석합니다.',
    effect: '만남의 기회가 많아질수록 귀인을 만날 확률도 높아집니다.',
    howTo: '월 2회 이상 새로운 사람을 만날 수 있는 활동에 참여하세요.',
    icon: '👥'
  },
  {
    title: '명함과 연락처 정리',
    description: '만난 사람들의 정보를 체계적으로 관리하고 주기적으로 연락합니다.',
    effect: '잠재적 귀인과의 인연을 유지하고 강화할 수 있습니다.',
    howTo: '분기마다 연락처를 정리하고 간단한 안부 메시지를 보내세요.',
    icon: '📇'
  },
  {
    title: '긍정적 태도 유지',
    description: '밝고 긍정적인 에너지는 사람들을 끌어당깁니다.',
    effect: '좋은 사람들이 자연스럽게 주변에 모이게 됩니다.',
    howTo: '매일 아침 긍정 확언을 하고, 불평보다 감사를 표현하세요.',
    icon: '😊'
  },
  {
    title: '전문성 향상',
    description: '자신의 분야에서 실력을 갖춘 사람에게 귀인이 모입니다.',
    effect: '능력 있는 사람들이 당신을 주목하고 도와주려 합니다.',
    howTo: '매달 새로운 것을 배우고, 자격증이나 스킬을 쌓으세요.',
    icon: '📚'
  },
  {
    title: '약속과 신뢰 지키기',
    description: '작은 약속도 철저히 지키며 신뢰를 쌓습니다.',
    effect: '신뢰받는 사람에게 귀인들이 자연스럽게 모입니다.',
    howTo: '시간 약속, 금전 약속, 비밀 지키기 등을 철저히 실천하세요.',
    icon: '🤝'
  },
  {
    title: '귀인 명상과 시각화',
    description: '귀인을 만나는 모습을 상상하며 명상합니다.',
    effect: '무의식이 귀인을 알아보고 끌어당기는 능력이 향상됩니다.',
    howTo: '자기 전 5분, 도움을 주는 사람을 만나는 장면을 상상하세요.',
    icon: '🧘'
  }
];

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

  // 연도별 귀인운 계산 (향후 3년)
  const getYearlyFortune = () => {
    const currentYear = new Date().getFullYear();
    const yearlyFortune = [];

    for (let i = 0; i < 3; i++) {
      const targetYear = currentYear + i;
      const yearIndex = (targetYear - 4) % 12;
      const branches = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];
      const yearBranch = branches[yearIndex];
      const yearZodiac = ZODIAC_ANIMALS[yearBranch];

      // 이 해가 귀인띠인지 확인
      const isGuiinYear = guiinInfo.천을귀인.includes(yearBranch) ||
                          guiinInfo.문창귀인.includes(yearBranch) ||
                          guiinInfo.천덕귀인.includes(yearBranch) ||
                          guiinInfo.월덕귀인.includes(yearBranch);

      // 잘 맞는 띠인지 확인
      const isCompatibleYear = myZodiac.compatible.includes(yearBranch);

      // 악연띠인지 확인
      const isAkyeonYear = akyeonInfo.겁살 === yearBranch ||
                           akyeonInfo.원진살.includes(yearBranch) ||
                           akyeonInfo.파살 === yearBranch;

      let rating = '보통';
      let description = '';
      let advice = '';

      if (isGuiinYear) {
        rating = '매우 좋음';
        description = `${yearZodiac?.name}해는 귀인을 만날 확률이 매우 높은 해입니다. 중요한 사람과의 인연이 시작되거나 기존 귀인의 도움이 커집니다.`;
        advice = '적극적으로 네트워킹하고, 새로운 기회를 찾아보세요. 중요한 결정을 내리기 좋은 시기입니다.';
      } else if (isCompatibleYear) {
        rating = '좋음';
        description = `${yearZodiac?.name}해는 인간관계가 원만하고 좋은 만남이 많은 해입니다. 협력과 파트너십이 잘 형성됩니다.`;
        advice = '팀워크와 협업에 집중하세요. 함께하는 프로젝트에서 좋은 결과가 나옵니다.';
      } else if (isAkyeonYear) {
        rating = '주의';
        description = `${yearZodiac?.name}해는 인간관계에서 신중해야 하는 해입니다. 새로운 인연보다는 기존 관계를 다지는 것이 좋습니다.`;
        advice = '중요한 계약이나 동업은 신중하게 검토하세요. 기존의 신뢰할 수 있는 사람들과 함께하세요.';
      } else {
        rating = '보통';
        description = `${yearZodiac?.name}해는 특별히 좋거나 나쁘지 않은 해입니다. 자신의 노력에 따라 인연운이 결정됩니다.`;
        advice = '꾸준히 관계를 관리하고, 진정성 있게 사람을 대하세요. 평범한 만남도 소중히 여기세요.';
      }

      yearlyFortune.push({
        year: targetYear,
        yearBranch,
        yearZodiac,
        rating,
        description,
        advice,
        isGuiinYear,
        isCompatibleYear,
        isAkyeonYear
      });
    }

    return yearlyFortune;
  };

  const yearlyFortune = getYearlyFortune();

  // 행운 요소 가져오기
  const luckyElements = DAY_STEM_LUCKY_ELEMENTS[dayStem] || DAY_STEM_LUCKY_ELEMENTS['갑'];

  // HTML 다운로드 함수
  const handleDownloadHtml = () => {
    const htmlContent = `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${formData.name}님의 귀인 분석 결과</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Malgun Gothic', sans-serif;
      background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
      color: #e2e8f0;
      padding: 40px 20px;
      line-height: 1.6;
    }
    .container { max-width: 800px; margin: 0 auto; }
    .header {
      text-align: center;
      background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);
      padding: 40px;
      border-radius: 20px;
      margin-bottom: 30px;
    }
    .header h1 { font-size: 32px; margin-bottom: 10px; color: white; }
    .header p { font-size: 18px; color: #d1fae5; }
    .section {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      padding: 30px;
      margin-bottom: 20px;
    }
    .section-title {
      font-size: 24px;
      margin-bottom: 20px;
      color: #10b981;
      border-bottom: 2px solid #10b981;
      padding-bottom: 10px;
    }
    .guiin-card {
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.3);
      border-radius: 15px;
      padding: 20px;
      margin-bottom: 15px;
    }
    .guiin-type { font-size: 20px; font-weight: bold; color: #34d399; margin-bottom: 10px; }
    .zodiac-item {
      display: inline-block;
      background: rgba(16, 185, 129, 0.2);
      padding: 10px 15px;
      border-radius: 10px;
      margin: 5px;
    }
    .list-item {
      padding: 10px;
      margin: 5px 0;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
    }
    .warning-box {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      border-radius: 10px;
      padding: 15px;
      margin: 10px 0;
    }
    .info-box {
      background: rgba(59, 130, 246, 0.1);
      border: 1px solid rgba(59, 130, 246, 0.3);
      border-radius: 10px;
      padding: 15px;
      margin: 10px 0;
    }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; }
    .tag {
      display: inline-block;
      padding: 5px 12px;
      border-radius: 20px;
      margin: 3px;
      font-size: 14px;
    }
    .tag-color { background: rgba(147, 51, 234, 0.2); color: #c084fc; }
    .tag-direction { background: rgba(234, 179, 8, 0.2); color: #fbbf24; }
    .tag-number { background: rgba(59, 130, 246, 0.2); color: #60a5fa; }
    .month-card {
      background: rgba(168, 85, 247, 0.1);
      border: 1px solid rgba(168, 85, 247, 0.3);
      border-radius: 10px;
      padding: 15px;
      margin-bottom: 10px;
    }
    .year-card {
      background: rgba(14, 165, 233, 0.1);
      border: 1px solid rgba(14, 165, 233, 0.3);
      border-radius: 10px;
      padding: 20px;
      margin-bottom: 15px;
    }
    .rating-good { color: #34d399; font-weight: bold; }
    .rating-warning { color: #fbbf24; font-weight: bold; }
    .rating-bad { color: #f87171; font-weight: bold; }
    .footer {
      text-align: center;
      padding: 30px;
      color: #94a3b8;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${formData.name}님의 귀인 분석</h1>
      <p>일간: ${dayStem} | 띠: ${myZodiac.emoji} ${myZodiac.name}</p>
      <p>${formData.year}년 ${formData.month}월 ${formData.day}일 ${formData.timeUnknown ? '(시간 미상)' : formData.hour + '시'} 출생</p>
    </div>

    <!-- 천을귀인 -->
    <div class="section">
      <h2 class="section-title">👑 천을귀인 (天乙貴人)</h2>
      <p>${GUIIN_TYPES.천을귀인.description}</p>
      <div style="margin-top: 15px;">
        ${guiinInfo.천을귀인.map(branch => {
          const zodiac = ZODIAC_ANIMALS[branch];
          const years = getZodiacYears(branch);
          return `<div class="zodiac-item">${zodiac?.emoji} ${zodiac?.name} (${years.slice(0, 3).join(', ')}년생...)</div>`;
        }).join('')}
      </div>
      <div class="info-box">
        <strong>💡 찾는 방법:</strong> ${GUIIN_TYPES.천을귀인.howToFind}
      </div>
    </div>

    <!-- 문창귀인 -->
    <div class="section">
      <h2 class="section-title">✨ 문창귀인 (文昌貴人)</h2>
      <p>${GUIIN_TYPES.문창귀인.description}</p>
      <div style="margin-top: 15px;">
        ${guiinInfo.문창귀인.map(branch => {
          const zodiac = ZODIAC_ANIMALS[branch];
          const years = getZodiacYears(branch);
          return `<div class="zodiac-item">${zodiac?.emoji} ${zodiac?.name} (${years.slice(0, 3).join(', ')}년생...)</div>`;
        }).join('')}
      </div>
    </div>

    <!-- 천덕귀인 -->
    <div class="section">
      <h2 class="section-title">💖 천덕귀인 (天德貴人)</h2>
      <p>${GUIIN_TYPES.천덕귀인.description}</p>
      <div style="margin-top: 15px;">
        ${guiinInfo.천덕귀인.map(branch => {
          const zodiac = ZODIAC_ANIMALS[branch];
          const years = getZodiacYears(branch);
          return `<div class="zodiac-item">${zodiac?.emoji} ${zodiac?.name} (${years.slice(0, 3).join(', ')}년생...)</div>`;
        }).join('')}
      </div>
    </div>

    <!-- 월덕귀인 -->
    <div class="section">
      <h2 class="section-title">⭐ 월덕귀인 (月德貴人)</h2>
      <p>${GUIIN_TYPES.월덕귀인.description}</p>
      <div style="margin-top: 15px;">
        ${guiinInfo.월덕귀인.map(branch => {
          const zodiac = ZODIAC_ANIMALS[branch];
          const years = getZodiacYears(branch);
          return `<div class="zodiac-item">${zodiac?.emoji} ${zodiac?.name} (${years.slice(0, 3).join(', ')}년생...)</div>`;
        }).join('')}
      </div>
    </div>

    <!-- 귀인 유형별 상세 특징 -->
    <div class="section">
      <h2 class="section-title">🔍 귀인 유형별 상세 특징</h2>
      ${Object.entries(GUIIN_DETAILED_CHARACTERISTICS).map(([type, char]) => `
        <div class="guiin-card">
          <div class="guiin-type">${GUIIN_TYPES[type]?.name || type}</div>
          <div style="margin: 10px 0;">
            <strong>외모 특징:</strong><br>
            ${char.appearance.map(item => `<span class="tag tag-color">${item}</span>`).join('')}
          </div>
          <div style="margin: 10px 0;">
            <strong>성격:</strong><br>
            ${char.personality.map(item => `<span class="tag tag-color">${item}</span>`).join('')}
          </div>
          <div style="margin: 10px 0;">
            <strong>주요 직업:</strong><br>
            ${char.occupation.map(item => `<span class="tag tag-direction">${item}</span>`).join('')}
          </div>
          <div style="margin: 10px 0;">
            <strong>만날 수 있는 장소:</strong><br>
            ${char.meetingPlace.map(item => `<span class="tag tag-number">${item}</span>`).join('')}
          </div>
        </div>
      `).join('')}
    </div>

    <!-- 행운 요소 -->
    <div class="section">
      <h2 class="section-title">🍀 귀인 찾기 행운 요소</h2>
      <div class="info-box">
        <strong>🎨 행운의 색상:</strong><br>
        ${luckyElements.colors.map(color => `<span class="tag tag-color">${color}</span>`).join('')}
      </div>
      <div class="info-box">
        <strong>🧭 행운의 방향:</strong><br>
        ${luckyElements.directions.map(dir => `<span class="tag tag-direction">${dir}</span>`).join('')}
      </div>
      <div class="info-box">
        <strong>🔢 행운의 숫자:</strong><br>
        ${luckyElements.numbers.map(num => `<span class="tag tag-number">${num}</span>`).join('')}
      </div>
      <div class="info-box">
        <strong>📅 행운의 요일:</strong><br>
        ${luckyElements.days.map(day => `<span class="tag tag-color">${day}</span>`).join('')}
      </div>
    </div>

    <!-- 월별 귀인운 -->
    <div class="section">
      <h2 class="section-title">📅 월별 귀인운</h2>
      ${Object.entries(MONTHLY_GUIIN_FORTUNE).map(([month, fortune]) => `
        <div class="month-card">
          <h3>${month}월 - ${fortune.title}</h3>
          <p style="margin: 10px 0;">${fortune.description}</p>
          <p style="color: #34d399;"><strong>조언:</strong> ${fortune.advice}</p>
          <p style="color: #fbbf24; font-size: 14px; margin-top: 5px;">🌟 특히 좋은 날: ${fortune.luckyDay}</p>
        </div>
      `).join('')}
    </div>

    <!-- 연도별 귀인운 -->
    <div class="section">
      <h2 class="section-title">📊 향후 3년 귀인운</h2>
      ${yearlyFortune.map(yf => `
        <div class="year-card">
          <h3>${yf.year}년 ${yf.yearZodiac?.emoji} ${yf.yearZodiac?.name}해 -
            <span class="${yf.rating === '매우 좋음' || yf.rating === '좋음' ? 'rating-good' : yf.rating === '주의' ? 'rating-bad' : 'rating-warning'}">${yf.rating}</span>
          </h3>
          <p style="margin: 10px 0;">${yf.description}</p>
          <p style="color: #60a5fa;"><strong>조언:</strong> ${yf.advice}</p>
        </div>
      `).join('')}
    </div>

    <!-- 귀인 활성화 방법 -->
    <div class="section">
      <h2 class="section-title">💡 귀인 활성화 방법</h2>
      ${GUIIN_ACTIVATION_METHODS.map((method, idx) => `
        <div class="list-item">
          <strong>${method.icon} ${idx + 1}. ${method.title}</strong>
          <p>${method.description}</p>
          <p style="color: #34d399; font-size: 14px;">효과: ${method.effect}</p>
          <p style="color: #60a5fa; font-size: 14px;">실천 방법: ${method.howTo}</p>
        </div>
      `).join('')}
    </div>

    <!-- 인연 스타일 -->
    <div class="section">
      <h2 class="section-title">💫 ${dayStem}일간 인연 스타일</h2>
      <div class="info-box">
        <p>${relationshipProfile.relationshipStyle}</p>
      </div>
      <div class="info-box">
        <strong>💕 끌리는 타입:</strong>
        <p>${relationshipProfile.attractionType}</p>
      </div>
      <div class="guiin-card">
        <strong>✅ 이상적인 파트너 특성:</strong><br>
        ${relationshipProfile.idealPartnerTraits.map(trait => `<span class="tag tag-color">${trait}</span>`).join('')}
      </div>
      <div class="warning-box">
        <strong>⚠️ 경계해야 할 파트너 특성:</strong><br>
        ${relationshipProfile.warningPartnerTraits.map(trait => `<span class="tag">${trait}</span>`).join('')}
      </div>
    </div>

    <!-- 악연 정보 -->
    <div class="section">
      <h2 class="section-title">⚠️ 주의해야 할 악연</h2>
      <div class="warning-box">
        <h3>겁살 (劫煞): ${ZODIAC_ANIMALS[akyeonInfo.겁살]?.emoji} ${ZODIAC_ANIMALS[akyeonInfo.겁살]?.name}</h3>
        <p>${AKYEON_TYPES.겁살.warning}</p>
      </div>
      <div class="warning-box">
        <h3>원진살 (怨嗔煞): ${akyeonInfo.원진살.map(b => ZODIAC_ANIMALS[b]?.emoji + ' ' + ZODIAC_ANIMALS[b]?.name).join(', ')}</h3>
        <p>${AKYEON_TYPES.원진살.warning}</p>
      </div>
      <div class="warning-box">
        <h3>파살 (破煞): ${ZODIAC_ANIMALS[akyeonInfo.파살]?.emoji} ${ZODIAC_ANIMALS[akyeonInfo.파살]?.name}</h3>
        <p>${AKYEON_TYPES.파살.warning}</p>
      </div>
    </div>

    <div class="footer">
      <p>이 분석은 ${new Date().toLocaleDateString('ko-KR')}에 생성되었습니다.</p>
      <p>포스텔러 - 당신의 운명을 밝히다</p>
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `귀인분석_${formData.name}_${new Date().getTime()}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
          <div className="flex gap-2">
            <button
              onClick={handleDownloadHtml}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>내보내기</span>
            </button>
            <button onClick={onReset} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <RefreshCw className="w-5 h-5" />
              <span>다시하기</span>
            </button>
          </div>
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

        {/* ===== 새로운 섹션 시작 ===== */}

        {/* 1. 귀인 유형별 상세 분석 */}
        {showGuiin && (
          <motion.div variants={itemVariants} className="glass rounded-3xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="w-6 h-6 text-emerald-400" />
              <h2 className="text-xl font-bold text-white">귀인 유형별 상세 특징</h2>
            </div>
            <p className="text-slate-400 text-sm mb-6">각 귀인 유형의 외모, 성격, 직업 특성을 알면 귀인을 더 쉽게 알아볼 수 있습니다.</p>

            <div className="space-y-4">
              {Object.entries(GUIIN_DETAILED_CHARACTERISTICS).map(([type, characteristics]) => (
                <div key={type} className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-xl p-5">
                  <h3 className="text-lg font-bold text-emerald-400 mb-3">
                    {GUIIN_TYPES[type]?.name || type}
                  </h3>

                  <div className="space-y-3">
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <div className="text-sm font-medium text-purple-400 mb-2">👤 외모 특징</div>
                      <div className="flex flex-wrap gap-2">
                        {characteristics.appearance.map((item, i) => (
                          <span key={i} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <div className="text-sm font-medium text-blue-400 mb-2">💭 성격 특성</div>
                      <div className="flex flex-wrap gap-2">
                        {characteristics.personality.map((item, i) => (
                          <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <div className="text-sm font-medium text-amber-400 mb-2">💼 주요 직업</div>
                      <div className="flex flex-wrap gap-2">
                        {characteristics.occupation.map((item, i) => (
                          <span key={i} className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 2. 귀인 만날 장소 및 시기 */}
        {showGuiin && (
          <motion.div variants={itemVariants} className="glass rounded-3xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-pink-400" />
              <h2 className="text-xl font-bold text-white">귀인 만날 장소 및 시기</h2>
            </div>
            <p className="text-slate-400 text-sm mb-6">귀인은 특정 장소와 시기에 만날 확률이 높습니다.</p>

            <div className="space-y-4">
              {Object.entries(GUIIN_DETAILED_CHARACTERISTICS).map(([type, characteristics]) => (
                <div key={type} className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-500/30 rounded-xl p-5">
                  <h3 className="text-lg font-bold text-pink-400 mb-3">
                    {GUIIN_TYPES[type]?.name || type}
                  </h3>

                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <div className="text-sm font-medium text-cyan-400 mb-2 flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> 만날 수 있는 장소
                      </div>
                      <ul className="space-y-1">
                        {characteristics.meetingPlace.map((place, i) => (
                          <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                            <span className="text-cyan-400 mt-1">•</span>
                            {place}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <div className="text-sm font-medium text-rose-400 mb-2 flex items-center gap-1">
                        <Clock className="w-4 h-4" /> 만날 가능성 높은 시기
                      </div>
                      <ul className="space-y-1">
                        {characteristics.meetingTiming.map((timing, i) => (
                          <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                            <span className="text-rose-400 mt-1">•</span>
                            {timing}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 3. 귀인과의 관계 발전 팁 */}
        {showGuiin && (
          <motion.div variants={itemVariants} className="glass rounded-3xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Handshake className="w-6 h-6 text-violet-400" />
              <h2 className="text-xl font-bold text-white">귀인과의 관계 발전 팁</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl p-4">
                <h3 className="text-violet-400 font-medium mb-3">1️⃣ 첫 만남에서 좋은 인상 남기기</h3>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li className="flex items-start gap-2"><span className="text-violet-400">•</span>진정성 있게 대화하고 경청하세요</li>
                  <li className="flex items-start gap-2"><span className="text-violet-400">•</span>적절한 질문으로 상대방에 대한 관심을 표현하세요</li>
                  <li className="flex items-start gap-2"><span className="text-violet-400">•</span>자신의 강점을 자연스럽게 어필하세요</li>
                </ul>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <h3 className="text-blue-400 font-medium mb-3">2️⃣ 지속적인 관계 유지</h3>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li className="flex items-start gap-2"><span className="text-blue-400">•</span>정기적으로 안부를 묻고 근황을 공유하세요</li>
                  <li className="flex items-start gap-2"><span className="text-blue-400">•</span>특별한 날(생일, 명절)에 축하 메시지를 보내세요</li>
                  <li className="flex items-start gap-2"><span className="text-blue-400">•</span>유용한 정보나 기회를 공유하세요</li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
                <h3 className="text-emerald-400 font-medium mb-3">3️⃣ 신뢰 쌓기</h3>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li className="flex items-start gap-2"><span className="text-emerald-400">•</span>약속을 철저히 지키세요</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-400">•</span>비밀을 지키고 신중하게 행동하세요</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-400">•</span>어려울 때 도움을 청하고, 도움받으면 꼭 감사를 표현하세요</li>
                </ul>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                <h3 className="text-amber-400 font-medium mb-3">4️⃣ 호혜적 관계 만들기</h3>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li className="flex items-start gap-2"><span className="text-amber-400">•</span>일방적으로 받기만 하지 말고, 당신도 도움을 주세요</li>
                  <li className="flex items-start gap-2"><span className="text-amber-400">•</span>상대방의 관심사와 목표를 파악하고 지원하세요</li>
                  <li className="flex items-start gap-2"><span className="text-amber-400">•</span>작은 도움이라도 진심으로 감사하세요</li>
                </ul>
              </div>

              <div className="bg-pink-500/10 border border-pink-500/30 rounded-xl p-4">
                <h3 className="text-pink-400 font-medium mb-3">5️⃣ 장기적 인연으로 발전시키기</h3>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li className="flex items-start gap-2"><span className="text-pink-400">•</span>상대방의 성공을 진심으로 축하하세요</li>
                  <li className="flex items-start gap-2"><span className="text-pink-400">•</span>어려울 때도 연락을 끊지 마세요</li>
                  <li className="flex items-start gap-2"><span className="text-pink-400">•</span>함께 성장할 수 있는 기회를 만드세요</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {/* 4. 행운 요소 (색상, 방향, 숫자, 요일) */}
        {showGuiin && (
          <motion.div variants={itemVariants} className="glass rounded-3xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Palette className="w-6 h-6 text-fuchsia-400" />
              <h2 className="text-xl font-bold text-white">귀인 찾기 행운 요소</h2>
            </div>
            <p className="text-slate-400 text-sm mb-6">{dayStem}일간의 행운 요소를 활용하면 귀인을 만날 확률이 높아집니다.</p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Palette className="w-5 h-5 text-purple-400" />
                  <h3 className="text-lg font-bold text-purple-400">행운의 색상</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {luckyElements.colors.map((color, i) => (
                    <span key={i} className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-lg text-sm font-medium">
                      {color}
                    </span>
                  ))}
                </div>
                <p className="text-slate-400 text-xs mt-3">
                  이 색상의 옷, 소품, 액세서리를 착용하면 좋습니다.
                </p>
              </div>

              <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Compass className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg font-bold text-amber-400">행운의 방향</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {luckyElements.directions.map((dir, i) => (
                    <span key={i} className="px-4 py-2 bg-amber-500/20 text-amber-300 rounded-lg text-sm font-medium">
                      {dir}
                    </span>
                  ))}
                </div>
                <p className="text-slate-400 text-xs mt-3">
                  중요한 미팅 시 이 방향에서 오거나 이 방향을 향해 앉으세요.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Hash className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-bold text-blue-400">행운의 숫자</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {luckyElements.numbers.map((num, i) => (
                    <span key={i} className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg text-sm font-medium">
                      {num}
                    </span>
                  ))}
                </div>
                <p className="text-slate-400 text-xs mt-3">
                  전화번호, 차량번호, 회의실 번호 등에 활용하세요.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-5 h-5 text-green-400" />
                  <h3 className="text-lg font-bold text-green-400">행운의 요일</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {luckyElements.days.map((day, i) => (
                    <span key={i} className="px-4 py-2 bg-green-500/20 text-green-300 rounded-lg text-sm font-medium">
                      {day}
                    </span>
                  ))}
                </div>
                <p className="text-slate-400 text-xs mt-3">
                  중요한 약속이나 면접은 이 요일에 잡으세요.
                </p>
              </div>
            </div>

            <div className="mt-4 bg-slate-800/50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium text-yellow-400">행운의 계절 & 요소</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {luckyElements.seasons.map((season, i) => (
                  <span key={i} className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs">
                    {season}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {luckyElements.elements.map((element, i) => (
                  <span key={i} className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs">
                    {element}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* 5. 월별 귀인운 */}
        {showGuiin && (
          <motion.div variants={itemVariants} className="glass rounded-3xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-6 h-6 text-indigo-400" />
              <h2 className="text-xl font-bold text-white">월별 귀인운 (12개월)</h2>
            </div>
            <p className="text-slate-400 text-sm mb-6">각 달마다 귀인운이 다르게 흐릅니다. 월별 전략을 참고하세요.</p>

            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(MONTHLY_GUIIN_FORTUNE).map(([month, fortune]) => (
                <div key={month} className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-indigo-400">{month}월</h3>
                    <span className="text-xs text-slate-400">{fortune.luckyDay}</span>
                  </div>
                  <h4 className="text-white font-medium mb-2">{fortune.title}</h4>
                  <p className="text-slate-300 text-sm mb-3">{fortune.description}</p>
                  <div className="bg-slate-800/50 rounded-lg p-2">
                    <div className="text-xs text-indigo-400 font-medium mb-1">💡 이달의 조언</div>
                    <p className="text-slate-300 text-xs">{fortune.advice}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 6. 연도별 귀인운 (향후 3년) */}
        {showGuiin && (
          <motion.div variants={itemVariants} className="glass rounded-3xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-sky-400" />
              <h2 className="text-xl font-bold text-white">향후 3년 귀인운</h2>
            </div>
            <p className="text-slate-400 text-sm mb-6">앞으로 3년간의 귀인운을 미리 확인하고 준비하세요.</p>

            <div className="space-y-4">
              {yearlyFortune.map((yf) => (
                <div key={yf.year} className={`rounded-xl p-5 border ${
                  yf.isGuiinYear ? 'bg-emerald-500/10 border-emerald-500/30' :
                  yf.isCompatibleYear ? 'bg-blue-500/10 border-blue-500/30' :
                  yf.isAkyeonYear ? 'bg-red-500/10 border-red-500/30' :
                  'bg-slate-500/10 border-slate-500/30'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{yf.yearZodiac?.emoji}</span>
                      <div>
                        <h3 className="text-xl font-bold text-white">{yf.year}년 {yf.yearZodiac?.name}해</h3>
                        <span className={`text-sm font-medium ${
                          yf.rating === '매우 좋음' ? 'text-emerald-400' :
                          yf.rating === '좋음' ? 'text-blue-400' :
                          yf.rating === '주의' ? 'text-red-400' :
                          'text-slate-400'
                        }`}>
                          {yf.rating === '매우 좋음' && '⭐⭐⭐ '}
                          {yf.rating === '좋음' && '⭐⭐ '}
                          {yf.rating === '주의' && '⚠️ '}
                          {yf.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-300 mb-3">{yf.description}</p>
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="text-sm font-medium text-sky-400 mb-1">📋 전략 및 조언</div>
                    <p className="text-slate-300 text-sm">{yf.advice}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 7. 귀인 유형별 특성 매트릭스 */}
        {showGuiin && (
          <motion.div variants={itemVariants} className="glass rounded-3xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-orange-400" />
              <h2 className="text-xl font-bold text-white">귀인 유형별 특성 매트릭스</h2>
            </div>
            <p className="text-slate-400 text-sm mb-6">각 귀인 유형의 특징을 한눈에 비교해보세요.</p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left p-3 text-slate-400 font-medium">귀인 유형</th>
                    <th className="text-left p-3 text-slate-400 font-medium">주요 도움</th>
                    <th className="text-left p-3 text-slate-400 font-medium">직업군</th>
                    <th className="text-left p-3 text-slate-400 font-medium">만나는 방법</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-800 hover:bg-yellow-500/5">
                    <td className="p-3 text-yellow-400 font-medium">천을귀인</td>
                    <td className="p-3 text-slate-300">위기 극복, 승진</td>
                    <td className="p-3 text-slate-300">경영진, 정치인</td>
                    <td className="p-3 text-slate-300">고급 모임, 세미나</td>
                  </tr>
                  <tr className="border-b border-slate-800 hover:bg-purple-500/5">
                    <td className="p-3 text-purple-400 font-medium">문창귀인</td>
                    <td className="p-3 text-slate-300">학업, 시험, 자격증</td>
                    <td className="p-3 text-slate-300">교사, 강사, 작가</td>
                    <td className="p-3 text-slate-300">교육기관, 서점</td>
                  </tr>
                  <tr className="border-b border-slate-800 hover:bg-pink-500/5">
                    <td className="p-3 text-pink-400 font-medium">천덕귀인</td>
                    <td className="p-3 text-slate-300">용서, 보호, 재기</td>
                    <td className="p-3 text-slate-300">종교인, 상담사</td>
                    <td className="p-3 text-slate-300">교회, 봉사활동</td>
                  </tr>
                  <tr className="border-b border-slate-800 hover:bg-cyan-500/5">
                    <td className="p-3 text-cyan-400 font-medium">월덕귀인</td>
                    <td className="p-3 text-slate-300">재물, 사업 기회</td>
                    <td className="p-3 text-slate-300">투자자, 사업가</td>
                    <td className="p-3 text-slate-300">투자 세미나, 클럽</td>
                  </tr>
                  <tr className="hover:bg-indigo-500/5">
                    <td className="p-3 text-indigo-400 font-medium">태을귀인</td>
                    <td className="p-3 text-slate-300">영적 성장, 직관</td>
                    <td className="p-3 text-slate-300">역술인, 예술가</td>
                    <td className="p-3 text-slate-300">명상센터, 갤러리</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 grid md:grid-cols-2 gap-3">
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
                <div className="text-sm font-medium text-emerald-400 mb-2">💎 최고 귀인 우선순위</div>
                <p className="text-slate-300 text-xs">천을귀인 → 월덕귀인 → 문창귀인 → 천덕귀인 → 태을귀인</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                <div className="text-sm font-medium text-blue-400 mb-2">🎯 실생활 활용법</div>
                <p className="text-slate-300 text-xs">현재 필요한 도움에 따라 우선적으로 찾아야 할 귀인이 다릅니다</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* 8. 귀인 활성화 방법 */}
        {showGuiin && (
          <motion.div variants={itemVariants} className="glass rounded-3xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-6 h-6 text-yellow-400" />
              <h2 className="text-xl font-bold text-white">귀인 활성화 방법</h2>
            </div>
            <p className="text-slate-400 text-sm mb-6">귀인운을 높이는 실천 가능한 10가지 방법입니다.</p>

            <div className="grid md:grid-cols-2 gap-4">
              {GUIIN_ACTIVATION_METHODS.map((method, index) => (
                <div key={index} className="bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border border-yellow-500/30 rounded-xl p-4 hover:border-yellow-500/50 transition-all">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-3xl">{method.icon}</span>
                    <div className="flex-1">
                      <h3 className="text-white font-bold mb-1">{method.title}</h3>
                      <p className="text-slate-300 text-sm mb-2">{method.description}</p>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3 space-y-2">
                    <div>
                      <span className="text-xs text-emerald-400 font-medium">✨ 효과:</span>
                      <p className="text-xs text-slate-300 mt-1">{method.effect}</p>
                    </div>
                    <div>
                      <span className="text-xs text-blue-400 font-medium">📝 실천 방법:</span>
                      <p className="text-xs text-slate-300 mt-1">{method.howTo}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 rounded-xl p-5">
              <h3 className="text-emerald-400 font-bold mb-3 flex items-center gap-2">
                <Crown className="w-5 h-5" />
                귀인 활성화 핵심 원칙
              </h3>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">1.</span>
                  <span><strong>일관성</strong>: 한두 번의 실천보다 꾸준한 실천이 중요합니다</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">2.</span>
                  <span><strong>진정성</strong>: 계산적이지 않고 진심으로 사람을 대하세요</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">3.</span>
                  <span><strong>호혜성</strong>: 받기만 하지 말고 먼저 베푸는 사람이 되세요</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">4.</span>
                  <span><strong>감사</strong>: 작은 도움에도 진심으로 감사하는 마음을 가지세요</span>
                </li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* ===== 새로운 섹션 끝 ===== */}

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
