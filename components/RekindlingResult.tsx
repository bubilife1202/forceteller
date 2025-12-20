'use client';

import { motion } from 'framer-motion';
import { Heart, ArrowLeft, RefreshCw, Star, AlertTriangle, Sparkles, TrendingUp, Clock, MessageCircle, Lightbulb, Target, Shield, Flame, Moon, Sun, Calendar, Phone, MapPin, Coffee, Gift, Users, Zap, CheckCircle, XCircle, Eye, ThumbsUp, ThumbsDown, Download, Mail, Share2 } from 'lucide-react';
import { RekindlingFormData } from './RekindlingForm';
import { getDayPillar } from '@/lib/saju-calculator';
import { downloadElementAsHtml, sendByEmail } from '@/lib/utils/export-utils';
import { shareToKakao } from '@/lib/utils/kakao-share';

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

// 오행별 상세 궁합 해석
const ELEMENT_COMPATIBILITY_DETAIL: Record<string, Record<string, {
  title: string;
  chemistry: string;
  strength: string;
  weakness: string;
  advice: string;
  rekindlingTip: string;
}>> = {
  '목': {
    '목': {
      title: '🌲 나무와 나무의 만남',
      chemistry: '서로 비슷한 성향으로 이해가 빠르지만, 경쟁 관계가 될 수 있습니다.',
      strength: '서로의 꿈과 목표를 이해하고 응원할 수 있어요. 성장 지향적인 관계입니다.',
      weakness: '둘 다 자존심이 강해 양보가 어려울 수 있어요. 누가 먼저 손 내밀지 신경전이 될 수 있습니다.',
      advice: '경쟁보다 협력을 선택하세요. 함께 성장하는 파트너가 되면 최고의 궁합입니다.',
      rekindlingTip: '상대방의 성취를 진심으로 축하해주세요. 인정받고 싶은 마음은 서로 같습니다.',
    },
    '화': {
      title: '🌲🔥 나무가 불을 피우다',
      chemistry: '당신이 상대방에게 영감과 에너지를 주는 관계입니다. 헌신적이지만 소진될 수 있어요.',
      strength: '상대방을 빛나게 해주는 당신의 능력은 대단합니다. 상대는 당신 덕분에 성장했을 거예요.',
      weakness: '일방적인 헌신은 지칩니다. 받는 것 없이 주기만 했다면 이별의 원인이 될 수 있어요.',
      advice: '재회한다면 균형 잡힌 관계를 요구하세요. 당신도 받을 자격이 있습니다.',
      rekindlingTip: '이번에는 당신이 필요한 것을 명확히 전달하세요. 상대방도 주는 법을 배워야 합니다.',
    },
    '토': {
      title: '🌲🏔️ 나무가 땅을 정복하다',
      chemistry: '당신이 상대방을 이끄는 관계입니다. 주도권이 있지만 부담스러울 수 있어요.',
      strength: '안정적인 상대방 덕분에 당신의 야망이 실현될 수 있어요. 든든한 지원군입니다.',
      weakness: '상대방이 답답하게 느껴지거나, 상대방이 당신을 부담스러워할 수 있어요.',
      advice: '상대방의 속도를 존중하세요. 모든 사람이 당신처럼 빠르게 움직이지 않아도 괜찮습니다.',
      rekindlingTip: '상대방의 안정을 추구하는 성향을 이해하고 인정해주세요. 그것도 사랑입니다.',
    },
    '금': {
      title: '🌲🪓 도끼에 베이는 나무',
      chemistry: '상대방이 당신을 날카롭게 비판할 수 있는 관계입니다. 긴장감이 있어요.',
      strength: '상대방의 냉정한 조언이 당신을 성장시킬 수 있어요. 쓴소리도 약이 됩니다.',
      weakness: '상대방의 비판이 상처가 될 수 있어요. 존중받지 못한다는 느낌이 들 수 있습니다.',
      advice: '상대방의 의도를 이해하려 노력하세요. 비판은 미움이 아닌 관심일 수 있습니다.',
      rekindlingTip: '상대방에게 부드러운 표현을 요청하세요. 내용이 아닌 방식의 문제일 수 있습니다.',
    },
    '수': {
      title: '🌲💧 물을 마시는 나무',
      chemistry: '상대방이 당신에게 영양분을 주는 관계입니다. 보살핌을 받아요.',
      strength: '상대방의 지지와 사랑이 당신을 건강하게 키워줍니다. 이상적인 궁합이에요.',
      weakness: '너무 의존하게 될 수 있어요. 상대방도 지칠 수 있음을 기억하세요.',
      advice: '받은 만큼 감사를 표현하세요. 당연하게 여기면 관계가 틀어집니다.',
      rekindlingTip: '상대방이 해준 것들을 구체적으로 떠올리고 진심으로 감사를 전하세요.',
    },
  },
  '화': {
    '목': {
      title: '🔥🌲 나무의 도움을 받는 불',
      chemistry: '상대방이 당신을 빛나게 해주는 관계입니다. 든든한 지원군이에요.',
      strength: '상대방의 헌신 덕분에 당신이 성장할 수 있어요. 고마운 존재입니다.',
      weakness: '상대방의 헌신을 당연하게 여겼을 수 있어요. 돌아보세요.',
      advice: '상대방에게 더 많은 인정과 감사를 표현하세요. 그들도 빛나고 싶어합니다.',
      rekindlingTip: '상대방이 얼마나 많은 것을 해줬는지 진심으로 인정하고 표현하세요.',
    },
    '화': {
      title: '🔥🔥 두 개의 불꽃',
      chemistry: '열정적이지만 폭발적인 관계입니다. 뜨겁게 사랑하고 뜨겁게 싸워요.',
      strength: '서로의 열정을 이해하고 공감할 수 있어요. 지루할 틈이 없습니다.',
      weakness: '작은 불씨가 큰 화재가 될 수 있어요. 감정 조절이 어렵습니다.',
      advice: '열정은 유지하되, 분노를 조절하는 방법을 함께 배우세요.',
      rekindlingTip: '재회 전에 감정 조절 능력을 키우세요. 같은 패턴이 반복되면 안 됩니다.',
    },
    '토': {
      title: '🔥🏔️ 불이 재를 남기다',
      chemistry: '당신이 상대방에게 영향을 주는 관계입니다. 안정을 찾게 해줘요.',
      strength: '상대방의 차분함이 당신의 열정을 조절해줍니다. 좋은 밸런스에요.',
      weakness: '상대방이 재미없게 느껴질 수 있어요. 자극이 부족하다고 생각할 수 있습니다.',
      advice: '안정과 열정 사이의 균형을 찾으세요. 둘 다 필요합니다.',
      rekindlingTip: '상대방의 안정적인 사랑이 얼마나 소중한지 깨달았다면 표현하세요.',
    },
    '금': {
      title: '🔥🪙 불이 금을 녹이다',
      chemistry: '당신이 상대방을 변화시키는 강력한 관계입니다. 영향력이 커요.',
      strength: '상대방을 성장시키고 변화시킬 수 있는 힘이 있어요.',
      weakness: '상대방이 부담을 느끼거나 자신을 잃었다고 느낄 수 있어요.',
      advice: '변화를 강요하지 마세요. 상대방의 본질을 존중하는 것이 중요합니다.',
      rekindlingTip: '상대방이 원래의 자신을 찾을 수 있도록 공간을 주세요.',
    },
    '수': {
      title: '🔥💧 물에 꺼지는 불',
      chemistry: '상대방이 당신의 열정을 식히는 관계입니다. 갈등이 있을 수 있어요.',
      strength: '서로 다른 에너지가 균형을 만들 수 있어요. 보완 관계가 될 수 있습니다.',
      weakness: '근본적인 성향 차이로 갈등이 생길 수 있어요. 이해가 어렵습니다.',
      advice: '차이를 인정하고 존중하세요. 다르다고 해서 틀린 것이 아닙니다.',
      rekindlingTip: '서로의 다름을 약점이 아닌 강점으로 볼 수 있는지 생각해보세요.',
    },
  },
  '토': {
    '목': {
      title: '🏔️🌲 나무에 정복당하는 땅',
      chemistry: '상대방이 주도하는 관계입니다. 따라가는 입장이 될 수 있어요.',
      strength: '상대방의 추진력이 당신을 새로운 세계로 이끌어줍니다.',
      weakness: '자신의 목소리를 잃을 수 있어요. 휘둘리는 느낌이 들 수 있습니다.',
      advice: '당신의 의견도 중요합니다. 소통하고 자신의 뜻을 표현하세요.',
      rekindlingTip: '재회한다면 동등한 관계를 요구하세요. 당신도 주체가 되어야 합니다.',
    },
    '화': {
      title: '🏔️🔥 불의 에너지를 받는 땅',
      chemistry: '상대방의 열정이 당신을 비옥하게 해주는 관계입니다.',
      strength: '상대방의 에너지가 당신에게 활력을 줍니다. 좋은 영향을 받아요.',
      weakness: '상대방의 열정이 부담스러울 때도 있어요. 속도가 맞지 않을 수 있습니다.',
      advice: '상대방의 열정을 인정하면서도 당신의 페이스를 유지하세요.',
      rekindlingTip: '상대방의 에너지를 긍정적으로 받아들이되, 한계도 소통하세요.',
    },
    '토': {
      title: '🏔️🏔️ 두 개의 산',
      chemistry: '안정적이지만 움직임이 없는 관계입니다. 편하지만 지루할 수 있어요.',
      strength: '서로 이해하고 안정적인 관계를 만들 수 있어요. 편안합니다.',
      weakness: '자극이 부족하고 변화가 없어요. 매너리즘에 빠지기 쉽습니다.',
      advice: '함께 새로운 것을 시도하세요. 변화가 관계에 활력을 줍니다.',
      rekindlingTip: '이번에는 더 재미있고 새로운 것들을 함께 해보겠다고 제안하세요.',
    },
    '금': {
      title: '🏔️🪙 땅에서 금이 나오다',
      chemistry: '당신이 상대방을 키워주는 관계입니다. 지지자 역할을 해요.',
      strength: '상대방의 성장을 도울 수 있어요. 든든한 버팀목이 됩니다.',
      weakness: '일방적으로 주기만 할 수 있어요. 인정받지 못한다고 느낄 수 있습니다.',
      advice: '상대방에게도 당신을 위한 노력을 요청하세요. 균형이 필요합니다.',
      rekindlingTip: '상대방이 당신의 헌신을 알고 감사해하는지 확인하세요.',
    },
    '수': {
      title: '🏔️💧 물을 막는 땅',
      chemistry: '당신이 상대방을 통제하는 관계입니다. 주도권이 있어요.',
      strength: '관계의 안정을 유지하는 힘이 있어요. 흔들리지 않습니다.',
      weakness: '상대방이 억압받는다고 느낄 수 있어요. 숨이 막힐 수 있습니다.',
      advice: '통제를 줄이고 상대방의 자유를 존중하세요.',
      rekindlingTip: '상대방에게 더 많은 공간과 자유를 주겠다고 약속하세요.',
    },
  },
  '금': {
    '목': {
      title: '🪙🌲 나무를 자르는 금',
      chemistry: '당신이 상대방에게 날카로운 영향을 주는 관계입니다.',
      strength: '상대방을 성장시키고 다듬어줄 수 있어요. 좋은 멘토가 될 수 있습니다.',
      weakness: '비판이 상처가 될 수 있어요. 너무 냉정하게 보일 수 있습니다.',
      advice: '조언할 때 표현을 부드럽게 하세요. 내용보다 방식이 중요합니다.',
      rekindlingTip: '상대방에게 따뜻하게 대하겠다고 약속하고 실천하세요.',
    },
    '화': {
      title: '🪙🔥 불에 녹는 금',
      chemistry: '상대방이 당신을 변화시키는 관계입니다. 영향을 많이 받아요.',
      strength: '상대방의 열정이 당신의 차가움을 녹여줍니다. 부드러워져요.',
      weakness: '자신을 잃을 수 있다는 두려움이 있어요. 정체성의 혼란이 올 수 있습니다.',
      advice: '변화를 두려워하지 마세요. 성장의 기회일 수 있습니다.',
      rekindlingTip: '상대방 덕분에 어떻게 변화했는지 긍정적으로 표현하세요.',
    },
    '토': {
      title: '🪙🏔️ 땅에서 지지받는 금',
      chemistry: '상대방이 당신을 지지해주는 관계입니다. 든든한 후원자에요.',
      strength: '상대방의 안정적인 지지가 당신을 빛나게 해줍니다.',
      weakness: '상대방의 헌신을 당연하게 여길 수 있어요.',
      advice: '감사를 표현하고 상대방도 챙기세요. 일방통행은 안 됩니다.',
      rekindlingTip: '상대방이 해준 것들에 대한 진심 어린 감사를 전하세요.',
    },
    '금': {
      title: '🪙🪙 두 개의 금',
      chemistry: '서로 비슷한 성향으로 이해가 빠르지만, 날카로울 수 있어요.',
      strength: '서로의 원칙과 가치관을 존중할 수 있어요. 논리적인 대화가 가능합니다.',
      weakness: '둘 다 고집이 세서 양보가 어려워요. 차갑게 느껴질 수 있습니다.',
      advice: '때로는 논리보다 감정을 표현하세요. 따뜻함이 필요합니다.',
      rekindlingTip: '감정을 더 많이 표현하고 부드러운 모습을 보여주겠다고 하세요.',
    },
    '수': {
      title: '🪙💧 금이 물을 만들다',
      chemistry: '당신이 상대방에게 영감을 주는 관계입니다. 좋은 영향을 줘요.',
      strength: '상대방의 감성이 당신의 이성과 잘 어울립니다. 균형이 있어요.',
      weakness: '서로 다른 방식으로 인해 오해가 생길 수 있어요.',
      advice: '소통 방식의 차이를 이해하고 맞춰가세요.',
      rekindlingTip: '상대방의 감성적인 접근을 존중하고 이해하려 노력하세요.',
    },
  },
  '수': {
    '목': {
      title: '💧🌲 나무를 키우는 물',
      chemistry: '당신이 상대방을 키워주는 관계입니다. 헌신적이에요.',
      strength: '상대방의 성장을 도울 수 있어요. 보람을 느낍니다.',
      weakness: '일방적인 헌신으로 지칠 수 있어요. 받는 게 없을 수 있습니다.',
      advice: '균형 잡힌 주고받기를 요구하세요. 당신도 받을 자격이 있어요.',
      rekindlingTip: '이번에는 상대방도 당신을 위해 노력해야 함을 명확히 하세요.',
    },
    '화': {
      title: '💧🔥 불을 끄는 물',
      chemistry: '상대방과 충돌할 수 있는 관계입니다. 근본적인 차이가 있어요.',
      strength: '서로 다른 에너지가 균형을 이룰 수 있어요. 보완 관계가 될 수 있습니다.',
      weakness: '갈등이 잦을 수 있어요. 서로 이해하기 어렵습니다.',
      advice: '차이를 인정하고 존중하는 법을 배우세요.',
      rekindlingTip: '서로의 다름을 받아들일 준비가 되었는지 진지하게 생각해보세요.',
    },
    '토': {
      title: '💧🏔️ 땅에 막히는 물',
      chemistry: '상대방이 당신을 통제하는 관계입니다. 제약을 받아요.',
      strength: '상대방의 안정감이 당신에게 필요한 구조를 제공해줍니다.',
      weakness: '자유롭지 못하다고 느낄 수 있어요. 답답할 수 있습니다.',
      advice: '필요한 자유와 공간에 대해 솔직히 대화하세요.',
      rekindlingTip: '재회한다면 서로의 공간을 존중하는 규칙을 정하세요.',
    },
    '금': {
      title: '💧🪙 금에서 태어나는 물',
      chemistry: '상대방이 당신에게 영감을 주는 관계입니다. 좋은 영향을 받아요.',
      strength: '상대방의 논리적인 면이 당신에게 도움이 됩니다.',
      weakness: '상대방이 차갑게 느껴질 수 있어요. 감정적 교류가 부족할 수 있습니다.',
      advice: '감정적인 교류를 더 많이 요청하세요.',
      rekindlingTip: '상대방에게 따뜻한 표현을 더 해달라고 부탁하세요.',
    },
    '수': {
      title: '💧💧 두 개의 물',
      chemistry: '깊은 감성적 교류가 가능한 관계입니다. 서로를 이해해요.',
      strength: '감정적으로 깊이 연결될 수 있어요. 공감 능력이 뛰어납니다.',
      weakness: '둘 다 수동적이라 결정이 어려울 수 있어요. 흐르는 대로 가다 방향을 잃을 수 있습니다.',
      advice: '때로는 결단력 있게 행동하세요. 누군가는 결정을 내려야 합니다.',
      rekindlingTip: '이번에는 더 적극적으로 관계를 이끌어가겠다고 결심하세요.',
    },
  },
};

// 이별 사유별 분석
const SEPARATION_ANALYSIS: Record<string, {
  healing: string;
  chance: number;
  advice: string[];
  timeline: string;
  deepAnalysis: string;
  doList: string[];
  dontList: string[];
  contactStrategy: string;
  firstMeetingTip: string;
}> = {
  'fight': {
    healing: '시간이 지나면 감정이 정리되어 대화가 가능해질 수 있습니다.',
    chance: 15,
    advice: ['먼저 자신의 행동을 돌아보세요', '사과할 부분이 있다면 진심을 담아 전하세요', '상대의 입장에서 생각해보세요'],
    timeline: '감정 정리에 2-3개월 정도 필요할 수 있습니다',
    deepAnalysis: '싸움으로 인한 이별은 감정이 격해진 상태에서 내린 결정일 가능성이 높습니다. 핵심 문제가 해결되지 않은 채 감정만 폭발한 경우, 시간이 지나면 후회할 수 있어요. 하지만 반복적인 싸움이었다면, 근본적인 소통 방식의 차이를 해결해야 합니다. 같은 패턴이 반복되지 않으려면 둘 다 변화가 필요합니다.',
    doList: [
      '냉각기를 충분히 가지세요 (최소 2주~1개월)',
      '자신의 잘못을 구체적으로 인정하는 사과문을 준비하세요',
      '감정 조절 방법을 공부하고 연습하세요',
      '상대방의 입장에서 상황을 다시 바라보세요',
      '앞으로 어떻게 다르게 행동할지 구체적인 계획을 세우세요',
      '필요하다면 커플 상담을 제안할 준비를 하세요',
      '중요한 대화는 카페 같은 공공장소에서 하세요',
      '대화 중 다시 감정이 격해지면 잠시 멈추고 심호흡하세요',
    ],
    dontList: [
      '감정이 가라앉지 않은 상태에서 연락하지 마세요',
      '과거의 잘못을 반복해서 들추지 마세요',
      '상대방만 변하기를 요구하지 마세요',
      '술에 취한 상태로 연락하지 마세요',
      '공개적인 장소에서 장면을 만들지 마세요',
      '친구들 앞에서 상대방을 험담하지 마세요',
      '감정적인 메시지를 보내지 마세요',
      '협박이나 위협적인 말을 하지 마세요',
    ],
    contactStrategy: '첫 연락은 가벼운 안부로 시작하세요. "요즘 어떻게 지내?"정도가 좋아요. 바로 관계 이야기를 꺼내지 마세요. 몇 번의 가벼운 대화 후에 만남을 제안하고, 직접 만나서 진심 어린 대화를 나누세요.',
    firstMeetingTip: '편안하고 조용한 카페에서 만나세요. 감정이 격해질 수 있으니 공공장소가 좋습니다. 상대방의 이야기를 먼저 충분히 들어주세요. 방어적인 태도보다 열린 마음으로 경청하세요.',
  },
  'distance': {
    healing: '물리적 거리는 마음까지 멀어지게 하지 않습니다.',
    chance: 20,
    advice: ['상황이 바뀔 수 있는지 확인해보세요', '원거리 연애의 방법을 함께 고민해보세요', '서로의 노력이 필요합니다'],
    timeline: '환경 변화가 생기면 기회가 올 수 있습니다',
    deepAnalysis: '거리로 인한 이별은 감정보다 현실적인 문제가 원인입니다. 두 사람의 사랑은 여전히 살아있을 가능성이 높아요. 다만 장거리 관계를 유지할 의지와 방법이 없었던 것이 문제입니다. 거리 문제가 해결되거나, 장거리 관계를 유지할 새로운 방법을 찾으면 재회가 가능합니다.',
    doList: [
      '현재 거리 문제가 해결될 가능성이 있는지 파악하세요',
      '서로의 삶의 계획(직장, 학업 등)을 공유하세요',
      '만남 가능한 주기를 현실적으로 계산해보세요',
      '온라인으로 함께할 수 있는 활동을 찾아보세요',
      '정기적인 영상 통화 일정을 제안하세요',
      '서프라이즈 방문을 계획해보세요',
      '함께하는 목표(여행, 재회 날짜 등)를 정하세요',
      '불안함을 솔직하게 표현하세요',
    ],
    dontList: [
      '거리를 핑계로 연락을 소홀히 하지 마세요',
      '상대방의 새로운 인간관계를 의심하지 마세요',
      '너무 자주 연락해서 부담을 주지 마세요',
      '만날 수 없다고 불평만 하지 마세요',
      '혼자서만 희생하려 하지 마세요',
      '상대방이 이사를 오기만을 기대하지 마세요',
      '미래에 대한 논의를 피하지 마세요',
      '지금 당장의 만남에만 집착하지 마세요',
    ],
    contactStrategy: '가벼운 안부로 시작해서, 상대방의 근황을 물어보세요. 상대방의 생활에 관심을 보이되, 그리움을 적절히 표현하세요. 영상 통화를 제안해서 얼굴을 보며 대화하는 것이 효과적입니다.',
    firstMeetingTip: '서프라이즈로 찾아가는 것도 좋지만, 상대방의 일정을 먼저 확인하세요. 만났을 때 앞으로의 관계에 대해 솔직한 대화를 나누세요. 장거리를 유지할 구체적인 방법을 함께 계획하세요.',
  },
  'timing': {
    healing: '타이밍은 다시 찾아올 수 있습니다. 기다림도 사랑입니다.',
    chance: 25,
    advice: ['지금은 각자 성장할 시간이에요', '연락을 완전히 끊지는 마세요', '좋은 인연은 다시 만나게 됩니다'],
    timeline: '6개월~1년 후 상황이 나아질 수 있습니다',
    deepAnalysis: '타이밍 문제로 헤어진 경우, 두 사람 모두 마음은 있지만 현실이 따라주지 않은 것입니다. 이것은 오히려 좋은 신호예요. 사랑이 없어서가 아니라 상황 때문에 헤어진 것이니까요. 각자의 상황이 나아지고, 다시 만날 준비가 되었을 때 자연스럽게 재회할 수 있습니다.',
    doList: [
      '각자의 성장에 집중하세요',
      '느슨하게라도 연락을 유지하세요',
      '상대방의 현재 상황을 존중하세요',
      '자신의 상황도 개선하려 노력하세요',
      '중요한 소식은 서로 공유하세요',
      '재회 가능한 시점을 조심스럽게 탐색하세요',
      '상대방이 새로운 관계를 시작해도 담담하게 받아들이세요',
      '운명을 믿되, 노력도 하세요',
    ],
    dontList: [
      '무작정 기다리기만 하지 마세요',
      '상대방에게 압박을 주지 마세요',
      '자신의 삶을 멈추지 마세요',
      '다른 만남의 가능성을 완전히 닫지 마세요',
      '상대방의 결정을 탓하지 마세요',
      '타이밍을 핑계로 아무 노력도 하지 않지 마세요',
      '미래에 대해 너무 많은 약속을 요구하지 마세요',
      '집착하지 마세요',
    ],
    contactStrategy: '명절이나 생일 같은 자연스러운 계기로 연락하세요. 진심을 담은 짧은 메시지가 효과적입니다. 상대방의 성취나 좋은 소식에 진심으로 축하해주세요. 관계에 대한 압박 없이 우정처럼 가볍게 유지하세요.',
    firstMeetingTip: '상대방의 상황이 나아졌을 때, 가볍게 만남을 제안하세요. 재회 제안보다는 근황을 나누는 자리로 시작하세요. 대화 중에 상대방의 현재 마음을 조심스럽게 파악하세요.',
  },
  'family': {
    healing: '가족의 반대는 시간이 지나면 변할 수 있습니다.',
    chance: 10,
    advice: ['상대 가족의 우려를 이해해보세요', '당신의 진심을 보여줄 방법을 찾으세요', '조급해하지 마세요'],
    timeline: '장기적인 관점에서 접근이 필요합니다',
    deepAnalysis: '가족의 반대는 가장 힘든 이별 사유 중 하나입니다. 두 사람의 마음과 상관없이 외부 요인에 의해 결정되기 때문이죠. 가족의 우려가 합리적인지, 아니면 편견에 기반한 것인지 냉정하게 분석해보세요. 때로는 가족이 보는 문제점이 맞을 수도 있고, 때로는 시간이 지나면 마음을 바꾸기도 합니다.',
    doList: [
      '가족이 반대하는 구체적인 이유를 파악하세요',
      '그 우려가 타당한지 객관적으로 판단하세요',
      '개선할 수 있는 부분은 노력하세요',
      '상대방이 가족과 연인 사이에서 힘들어함을 이해하세요',
      '장기적인 관점에서 상황을 바라보세요',
      '자연스럽게 좋은 인상을 줄 기회를 만드세요',
      '상대방과 함께 해결책을 찾으세요',
      '필요하다면 전문가의 도움을 받으세요',
    ],
    dontList: [
      '상대 가족을 비난하지 마세요',
      '상대방에게 가족과 나 중에 선택하라고 하지 마세요',
      '가족을 설득하려고 무리하게 찾아가지 마세요',
      '상대방을 휘둘리는 사람이라고 비난하지 마세요',
      '화가 난 상태에서 결정을 내리지 마세요',
      '포기하기 전에 모든 방법을 시도해보세요',
      '상대방과 비밀 연애를 하려 하지 마세요',
      '가족 문제를 무시하고 결혼을 강행하지 마세요',
    ],
    contactStrategy: '상대방과의 연락은 유지하되, 가족 문제에 대한 압박은 줄이세요. 상대방이 어떤 결정을 내리든 존중한다는 것을 보여주세요. 상대방의 가족을 이해하려는 태도를 보여주세요.',
    firstMeetingTip: '가족 문제가 완전히 해결되지 않았다면, 일단 둘만의 시간을 가지세요. 앞으로 어떻게 할 것인지 현실적인 대화를 나누세요. 서로에게 무엇을 줄 수 있고 무엇을 기대하는지 명확히 하세요.',
  },
  'cheating': {
    healing: '신뢰가 깨진 관계는 회복이 어렵습니다.',
    chance: -20,
    advice: ['정말 다시 만나고 싶은지 신중히 생각하세요', '같은 실수가 반복되지 않을까요?', '새로운 시작도 고려해보세요'],
    timeline: '신뢰 회복에는 오랜 시간이 필요합니다',
    deepAnalysis: '배신으로 인한 이별은 가장 깊은 상처를 남깁니다. 신뢰가 한번 무너지면 회복하기가 매우 어렵습니다. 재회를 한다 해도 의심과 불안이 끊이지 않을 수 있어요. 정말 용서할 수 있는지, 같은 일이 반복되지 않을 거라 믿을 수 있는지 진지하게 생각해보세요. 때로는 새로운 시작이 더 건강한 선택일 수 있습니다.',
    doList: [
      '재회가 정말 원하는 것인지 충분히 생각하세요',
      '용서할 수 있는지 자신에게 솔직해지세요',
      '같은 일이 왜 일어났는지 근본 원인을 파악하세요',
      '전문 상담을 받는 것을 고려하세요',
      '재회한다면 완전한 투명성을 요구하세요',
      '신뢰 회복을 위한 구체적인 계획을 세우세요',
      '자신의 자존감을 지키세요',
      '새로운 시작의 가능성도 열어두세요',
    ],
    dontList: [
      '복수심으로 재회하지 마세요',
      '과거의 잘못을 반복해서 들추지 마세요',
      '의심으로 상대방을 지치게 하지 마세요',
      '죄책감 때문에 재회를 받아들이지 마세요',
      '주변 시선 때문에 결정하지 마세요',
      '완전히 용서하지 못하면서 재회하지 마세요',
      '같은 상황이 반복되면 그때는 떠나세요',
      '자존감을 버리면서까지 매달리지 마세요',
    ],
    contactStrategy: '상대방이 먼저 연락해올 때까지 기다리는 것이 좋습니다. 당신이 먼저 연락하면 쉽게 용서받을 것이라 생각할 수 있어요. 연락이 와도 바로 받아주지 말고, 상대방이 얼마나 노력하는지 지켜보세요.',
    firstMeetingTip: '공공장소에서 만나세요. 감정적으로 흔들리지 않도록 미리 할 말을 정리하세요. 상대방의 진심과 변화를 확인하세요. 너무 빠르게 용서하지 말고, 시간을 가지세요.',
  },
  'other': {
    healing: '이별의 진짜 이유를 먼저 파악해야 합니다.',
    chance: 0,
    advice: ['왜 헤어졌는지 정확히 알아야 해요', '상대의 진심을 확인해보세요', '막연한 기대보다 현실을 직시하세요'],
    timeline: '원인 파악 후 방향을 정하세요',
    deepAnalysis: '이별의 이유가 명확하지 않다면, 먼저 그것을 파악하는 것이 중요합니다. 상대방이 말하지 않은 이유가 있을 수 있어요. 혹은 여러 가지 이유가 복합적으로 작용했을 수도 있습니다. 원인을 알아야 해결책을 찾을 수 있어요.',
    doList: [
      '이별의 진짜 원인을 파악하세요',
      '공통 친구를 통해 상황을 파악해보세요',
      '자신의 행동을 돌아보세요',
      '상대방에게 솔직한 대화를 요청하세요',
      '원인이 파악되면 해결책을 찾으세요',
      '필요하다면 시간을 두고 지켜보세요',
      '자신의 감정을 정리하세요',
      '상황을 객관적으로 바라보려 노력하세요',
    ],
    dontList: [
      '원인도 모르면서 재회를 시도하지 마세요',
      '상대방을 추궁하듯 묻지 마세요',
      '상상으로 원인을 만들어내지 마세요',
      '친구들을 이용해 상대방을 압박하지 마세요',
      '원인을 알기 전에 변하겠다고 약속하지 마세요',
      'SNS 스토킹에 집착하지 마세요',
      '자책만 하지 말고 객관적으로 보세요',
      '너무 오래 원인 분석에만 매달리지 마세요',
    ],
    contactStrategy: '솔직하게 대화를 요청하세요. "우리가 왜 헤어지게 됐는지 이해하고 싶어"라고 말하세요. 비난이 아닌 이해의 목적임을 명확히 하세요. 상대방이 말할 준비가 될 때까지 기다려주세요.',
    firstMeetingTip: '편안한 분위기에서 만나세요. 이별의 원인에 대해 솔직하게 이야기해달라고 부탁하세요. 방어적이지 않게 경청하세요. 들은 내용을 바탕으로 재회 여부를 결정하세요.',
  },
};

// 현재 감정별 메시지
const FEELING_MESSAGES: Record<string, { title: string; message: string; advice: string; healingProcess: string[]; positiveAffirmations: string[] }> = {
  'miss': {
    title: '그리움이 가득하시군요',
    message: '보고 싶다는 마음은 진심의 증거입니다. 하지만 그리움만으로는 재회가 이루어지지 않아요. 당신의 마음을 전하되, 상대방의 마음도 존중해주세요.',
    advice: '그리움을 담은 짧은 메시지를 보내보는 건 어떨까요?',
    healingProcess: [
      '그리움을 느끼는 것은 자연스러운 감정입니다',
      '그리움의 대상이 실제 상대인지, 추억인지 구분해보세요',
      '그리움을 일기나 편지로 표현해보세요 (보내지 않아도 됩니다)',
      '그리움이 너무 클 때는 친구와 대화하세요',
      '새로운 활동으로 생각을 환기시키세요',
    ],
    positiveAffirmations: [
      '내 마음은 소중하고 의미있습니다',
      '보고 싶다는 감정은 사랑했다는 증거입니다',
      '이 감정도 시간이 지나면 자연스럽게 변할 것입니다',
      '나는 사랑받을 자격이 있는 사람입니다',
      '어떤 결과가 오더라도 나는 괜찮을 것입니다',
    ],
  },
  'regret': {
    title: '후회가 되시는군요',
    message: '후회는 성장의 시작입니다. 무엇이 잘못되었는지 알았다면, 그것을 고칠 준비가 되었다는 뜻이에요. 같은 실수를 반복하지 않겠다는 다짐이 중요합니다.',
    advice: '진심 어린 사과와 함께 변화된 모습을 보여주세요',
    healingProcess: [
      '후회하는 구체적인 행동을 떠올려보세요',
      '왜 그렇게 행동했는지 이해하려 노력하세요',
      '앞으로 어떻게 달라질지 계획하세요',
      '자신을 너무 자책하지 마세요',
      '후회는 성장의 기회임을 기억하세요',
    ],
    positiveAffirmations: [
      '실수는 누구나 합니다. 중요한 것은 배우는 것입니다',
      '나는 더 나은 사람이 될 수 있습니다',
      '과거는 바꿀 수 없지만 미래는 만들어갈 수 있습니다',
      '후회할 줄 아는 것은 성숙함의 증거입니다',
      '나는 변화하고 성장하는 중입니다',
    ],
  },
  'confused': {
    title: '마음이 복잡하시군요',
    message: '혼란스러운 것은 자연스러운 감정이에요. 지금 당장 결론을 내리지 않아도 됩니다. 시간을 갖고 자신의 진짜 마음을 들여다보세요.',
    advice: '조급해하지 말고 천천히 마음을 정리하세요',
    healingProcess: [
      '복잡한 감정을 글로 써보세요',
      '각 감정을 분리해서 살펴보세요',
      '신뢰할 수 있는 사람과 이야기하세요',
      '조용한 곳에서 명상을 해보세요',
      '결정을 서두르지 마세요',
    ],
    positiveAffirmations: [
      '혼란은 성장의 신호입니다',
      '나는 천천히 내 마음을 알아갈 것입니다',
      '답을 몰라도 괜찮습니다. 시간이 알려줄 것입니다',
      '내 감정은 모두 타당합니다',
      '나는 내 감정을 이해하고 받아들일 것입니다',
    ],
  },
  'hopeful': {
    title: '희망을 가지고 계시네요',
    message: '다시 만나고 싶다는 마음은 아름답습니다. 하지만 일방적인 희망보다는 상대의 마음도 확인해보세요. 서로 같은 마음이라면 가능성은 충분합니다.',
    advice: '적절한 타이밍에 용기 내어 연락해보세요',
    healingProcess: [
      '희망을 가지되 현실도 직시하세요',
      '상대방의 신호를 잘 관찰하세요',
      '너무 큰 기대는 실망으로 이어질 수 있어요',
      '희망과 함께 자기 성장도 병행하세요',
      '어떤 결과든 받아들일 준비를 하세요',
    ],
    positiveAffirmations: [
      '희망은 좋은 에너지입니다',
      '나는 행복해질 자격이 있습니다',
      '좋은 일이 일어날 것입니다',
      '내 진심은 언젠가 통할 것입니다',
      '나는 사랑하고 사랑받을 준비가 되어있습니다',
    ],
  },
};

// 월별 재회 운세
const MONTHLY_REKINDLING_FORTUNE = [
  { month: 1, title: '새해의 시작', fortune: '새로운 시작의 에너지가 강해요. 연락을 시작하기 좋은 달입니다.', tip: '새해 인사를 구실로 연락해보세요.' },
  { month: 2, title: '사랑의 달', fortune: '로맨틱한 에너지가 가득해요. 솔직한 감정 표현이 효과적입니다.', tip: '발렌타인데이를 활용해보세요.' },
  { month: 3, title: '봄의 시작', fortune: '새로운 시작에 좋은 시기예요. 만남을 제안해보세요.', tip: '봄꽃 구경을 핑계로 만남을 제안하세요.' },
  { month: 4, title: '성장의 달', fortune: '서로의 성장을 확인할 수 있어요. 변화된 모습을 보여주세요.', tip: '봄 나들이로 자연스럽게 만나세요.' },
  { month: 5, title: '5월의 축복', fortune: '가족의 달이라 감정이 풍부해져요. 진심 어린 대화가 통합니다.', tip: '가정의 달에 따뜻한 메시지를 보내세요.' },
  { month: 6, title: '여름의 시작', fortune: '에너지가 높아지는 시기예요. 적극적인 행동이 좋습니다.', tip: '여름 휴가 계획을 핑계로 연락해보세요.' },
  { month: 7, title: '열정의 달', fortune: '뜨거운 감정이 살아날 수 있어요. 하지만 감정 조절은 필수입니다.', tip: '무더위에 상대방 건강을 걱정하는 연락을 해보세요.' },
  { month: 8, title: '결실의 준비', fortune: '오랜 노력이 결실을 맺을 수 있어요. 꾸준히 노력하세요.', tip: '피서지에서의 만남을 제안해보세요.' },
  { month: 9, title: '가을의 시작', fortune: '정서적으로 안정되는 시기예요. 차분한 대화가 효과적입니다.', tip: '추석 명절 인사로 연락해보세요.' },
  { month: 10, title: '수확의 달', fortune: '그동안의 노력이 빛을 발할 수 있어요. 희망을 가지세요.', tip: '단풍 구경을 핑계로 만남을 제안하세요.' },
  { month: 11, title: '11월의 차분함', fortune: '깊은 대화를 나누기 좋은 시기예요. 진솔한 마음을 전하세요.', tip: '날씨가 추워지니 따뜻한 음료를 함께 하자고 해보세요.' },
  { month: 12, title: '한 해의 마무리', fortune: '추억과 그리움이 강해지는 시기예요. 연말 모임을 활용하세요.', tip: '연말 분위기를 활용해 만남을 시도하세요.' },
];

// 재회 성공 행동 리스트
const SUCCESS_BEHAVIORS = [
  { icon: '💬', title: '진심 어린 사과하기', desc: '구체적으로 무엇이 잘못되었는지 인정하고 사과하세요.' },
  { icon: '🌱', title: '자기 성장 보여주기', desc: '변화된 모습을 말이 아닌 행동으로 증명하세요.' },
  { icon: '👂', title: '상대방 말 경청하기', desc: '변명하지 말고 상대방의 이야기를 끝까지 들어주세요.' },
  { icon: '⏰', title: '충분한 시간 주기', desc: '재회를 서두르지 말고 상대방의 속도에 맞추세요.' },
  { icon: '🎯', title: '일관된 모습 유지하기', desc: '잠깐 잘하다가 원래대로 돌아가면 안 됩니다.' },
  { icon: '💝', title: '작은 것부터 표현하기', desc: '큰 선물보다 작은 관심과 배려가 효과적입니다.' },
  { icon: '🙏', title: '겸손한 태도 보이기', desc: '자존심을 세우기보다 진심을 전하세요.' },
  { icon: '📱', title: '적절한 연락 유지하기', desc: '너무 많지도, 너무 적지도 않게 연락하세요.' },
  { icon: '🎭', title: '감정 조절하기', desc: '불안하고 조급해도 감정적으로 행동하지 마세요.' },
  { icon: '🤝', title: '동등한 관계 만들기', desc: '매달리는 것이 아닌 함께하는 파트너가 되세요.' },
];

// 재회 실패 행동 리스트
const FAILURE_BEHAVIORS = [
  { icon: '🚫', title: '집착하는 행동', desc: '하루에 수십 번 연락하거나 스토킹하지 마세요.' },
  { icon: '😤', title: '감정적인 연락', desc: '술에 취해 연락하거나 감정적인 메시지를 보내지 마세요.' },
  { icon: '🎭', title: '가식적인 태도', desc: '잠깐만 잘하고 돌아서면 원래대로 하지 마세요.' },
  { icon: '⚖️', title: '비교하는 말', desc: '다른 사람과 비교하거나 질투심을 자극하지 마세요.' },
  { icon: '🔙', title: '과거 들추기', desc: '이미 지나간 잘못을 반복해서 언급하지 마세요.' },
  { icon: '👥', title: '친구 동원하기', desc: '주변 사람들을 이용해 압박하지 마세요.' },
  { icon: '💣', title: '협박하기', desc: '재회 안 하면 어쩌겠다는 식의 협박은 금물입니다.' },
  { icon: '🎪', title: '장면 만들기', desc: '공개적인 장소에서 대판 싸우지 마세요.' },
  { icon: '😢', title: '동정심 유발', desc: '불쌍한 척해서 재회하면 그 관계는 건강하지 않습니다.' },
  { icon: '🏃', title: '조급하게 굴기', desc: '상대방이 아직 준비 안 됐는데 서두르지 마세요.' },
];

// 힐링 명언
const HEALING_QUOTES = [
  { quote: '가장 어두운 밤도 끝나고 해는 뜬다.', author: '빅토르 위고' },
  { quote: '사랑은 한 번 실패했다고 끝나는 것이 아니다.', author: '헬렌 켈러' },
  { quote: '당신이 변하면 세상이 변한다.', author: '간디' },
  { quote: '모든 성공은 인내와 함께 온다.', author: '에머슨' },
  { quote: '진정한 사랑은 시간이 지나도 변하지 않는다.', author: '셰익스피어' },
  { quote: '오늘 할 수 있는 일에 최선을 다하라.', author: '벤자민 프랭클린' },
];

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

  // 오행 궁합 상세
  const elementCompatibility = ELEMENT_COMPATIBILITY_DETAIL[myElement]?.[partnerElement];

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
  const currentMonth = today.getMonth() + 1;
  const monthlyFortune = MONTHLY_REKINDLING_FORTUNE[currentMonth - 1];
  const randomQuote = HEALING_QUOTES[Math.floor(Math.random() * HEALING_QUOTES.length)];

  // 점수에 따른 해석
  const getScoreInterpretation = (score: number) => {
    if (score >= 80) return { level: '매우 높음', color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/30', emoji: '💖', desc: '두 분의 인연은 아직 이어져 있습니다.' };
    if (score >= 65) return { level: '높음', color: 'text-emerald-400', bg: 'bg-emerald-500/20', border: 'border-emerald-500/30', emoji: '💕', desc: '재회의 가능성이 충분히 있습니다.' };
    if (score >= 50) return { level: '보통', color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/30', emoji: '💛', desc: '노력 여하에 따라 달라질 수 있습니다.' };
    if (score >= 35) return { level: '낮음', color: 'text-orange-400', bg: 'bg-orange-500/20', border: 'border-orange-500/30', emoji: '🧡', desc: '지금은 기다림이 필요한 시기입니다.' };
    return { level: '매우 낮음', color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/30', emoji: '❤️‍🩹', desc: '새로운 인연을 만날 준비를 해보세요.' };
  };

  const interpretation = getScoreInterpretation(rekindlingScore);

  // HTML 다운로드 함수
  const handleDownloadHtml = () => {
    const today = new Date().toISOString().split('T')[0];
    downloadElementAsHtml('rekindling-result', `재회운세_${myName}_${partnerName}_${today}`);
  };

  // 이메일 전송 함수
  const handleSendEmail = () => {
    const subject = `[ForceTeller] 재회 운세 결과 - ${myName}님 ❤️ ${partnerName}님`;
    const body = `
━━━━━━━━━━━━━━━━━━━━
💕 재회 운세 결과
${myName}님 ❤️ ${partnerName}님
━━━━━━━━━━━━━━━━━━━━

📊 재회 가능성: ${rekindlingScore}% (${interpretation.level})
${interpretation.desc}

━━ 두 사람의 일주 ━━
◆ ${myName}님: ${myDayPillar.stem.ko}${myDayPillar.branch.ko} (${myElement} 오행)
◆ ${partnerName}님: ${partnerDayPillar.stem.ko}${partnerDayPillar.branch.ko} (${partnerElement} 오행)

━━ 감정 분석 ━━
${feelingMessage.title}
${feelingMessage.message}

💡 조언: ${feelingMessage.advice}

${elementCompatibility ? `
━━ 오행 궁합 ━━
${elementCompatibility.title}
${elementCompatibility.chemistry}

강점: ${elementCompatibility.strength}
주의점: ${elementCompatibility.weakness}
조언: ${elementCompatibility.advice}
재회 팁: ${elementCompatibility.rekindlingTip}
` : ''}

━━ 이별 원인 분석 ━━
${separationAnalysis.healing}
예상 회복 시간: ${separationAnalysis.timeline}

✅ 해야 할 것들:
${separationAnalysis.doList.map(item => `  ✓ ${item}`).join('\n')}

❌ 하면 안 되는 것들:
${separationAnalysis.dontList.map(item => `  ✗ ${item}`).join('\n')}

📱 연락 전략:
${separationAnalysis.contactStrategy}

━━ ${currentMonth}월 재회 운세 ━━
${monthlyFortune.title}
${monthlyFortune.fortune}
💡 ${monthlyFortune.tip}

━━ 힐링 명언 ━━
"${randomQuote.quote}" - ${randomQuote.author}

━━━━━━━━━━━━━━━━━━━━
${myName}님, 어떤 결과가 되더라도
당신의 마음은 소중합니다.
진심으로 응원합니다. 💕

ForceTeller - AI 운세 서비스
    `.trim();
    sendByEmail(subject, body);
  };

  const handleKakaoShare = () => {
    shareToKakao({
      title: `💔 ${myName}님과 ${partnerName}님의 재회 운세 결과`,
      description: `재회 가능성: ${rekindlingScore}% (${interpretation.level}) | ${interpretation.desc}`,
    });
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

  return (
    <motion.div
      className="min-h-screen py-8 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div id="rekindling-result" className="max-w-lg mx-auto">
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
          <div className="bg-pink-500/10 border border-pink-500/30 rounded-xl p-4 mb-4">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
              <p className="text-pink-300 text-sm">{feelingMessage.advice}</p>
            </div>
          </div>

          {/* 힐링 프로세스 */}
          <div className="bg-slate-800/50 rounded-xl p-4 mb-4">
            <h3 className="text-white font-medium mb-3 flex items-center gap-2">
              <Heart className="w-4 h-4 text-pink-400" />
              마음 치유 단계
            </h3>
            <div className="space-y-2">
              {feelingMessage.healingProcess.map((step, i) => (
                <div key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                  <span className="text-pink-400 font-medium">{i + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 긍정 확언 */}
          <div className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-xl p-4">
            <h3 className="text-white font-medium mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-400" />
              오늘의 긍정 확언
            </h3>
            <div className="space-y-2">
              {feelingMessage.positiveAffirmations.slice(0, 3).map((affirmation, i) => (
                <p key={i} className="text-pink-300 text-sm italic">&ldquo;{affirmation}&rdquo;</p>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 오행 궁합 상세 분석 */}
        {elementCompatibility && (
          <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-6 mb-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-pink-400" />
              오행으로 본 두 사람의 관계
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

            <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-xl p-4 mb-4">
              <h3 className="text-xl font-bold text-pink-400 mb-2">{elementCompatibility.title}</h3>
              <p className="text-white mb-3">{elementCompatibility.chemistry}</p>
            </div>

            <div className="space-y-3">
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                <h4 className="text-green-400 font-medium mb-2 flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4" />
                  이 관계의 강점
                </h4>
                <p className="text-slate-300 text-sm">{elementCompatibility.strength}</p>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
                <h4 className="text-orange-400 font-medium mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  주의할 점
                </h4>
                <p className="text-slate-300 text-sm">{elementCompatibility.weakness}</p>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <h4 className="text-blue-400 font-medium mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  관계 개선 조언
                </h4>
                <p className="text-slate-300 text-sm">{elementCompatibility.advice}</p>
              </div>

              <div className="bg-pink-500/10 border border-pink-500/30 rounded-xl p-4">
                <h4 className="text-pink-400 font-medium mb-2 flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  재회 성공 팁
                </h4>
                <p className="text-slate-300 text-sm">{elementCompatibility.rekindlingTip}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* 이별 원인 심층 분석 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-xl">💔</span>
            이별 원인 심층 분석
          </h2>

          <div className="bg-slate-800/50 rounded-xl p-4 mb-4">
            <p className="text-white text-lg mb-2">{separationAnalysis.healing}</p>
            <p className="text-amber-400 text-sm flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4" />
              {separationAnalysis.timeline}
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">{separationAnalysis.deepAnalysis}</p>
          </div>

          {/* 해야 할 것 */}
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-4">
            <h3 className="text-green-400 font-medium mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              꼭 해야 할 것들
            </h3>
            <div className="space-y-2">
              {separationAnalysis.doList.map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                  <span className="text-green-400">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* 하면 안 되는 것 */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-4">
            <h3 className="text-red-400 font-medium mb-3 flex items-center gap-2">
              <XCircle className="w-5 h-5" />
              절대 하면 안 되는 것들
            </h3>
            <div className="space-y-2">
              {separationAnalysis.dontList.map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                  <span className="text-red-400">✗</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* 연락 전략 */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-4">
            <h3 className="text-blue-400 font-medium mb-2 flex items-center gap-2">
              <Phone className="w-5 h-5" />
              연락 전략
            </h3>
            <p className="text-slate-300 text-sm">{separationAnalysis.contactStrategy}</p>
          </div>

          {/* 첫 만남 팁 */}
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
            <h3 className="text-purple-400 font-medium mb-2 flex items-center gap-2">
              <Coffee className="w-5 h-5" />
              첫 만남 조언
            </h3>
            <p className="text-slate-300 text-sm">{separationAnalysis.firstMeetingTip}</p>
          </div>
        </motion.div>

        {/* 월별 재회 운세 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-400" />
            {currentMonth}월 재회 운세
          </h2>

          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
            <h3 className="text-amber-400 font-medium mb-2">{monthlyFortune.title}</h3>
            <p className="text-white mb-2">{monthlyFortune.fortune}</p>
            <p className="text-slate-300 text-sm flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              {monthlyFortune.tip}
            </p>
          </div>
        </motion.div>

        {/* 재회 성공 행동 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <ThumbsUp className="w-5 h-5 text-green-400" />
            재회 성공률 높이는 행동
          </h2>

          <div className="grid grid-cols-1 gap-3">
            {SUCCESS_BEHAVIORS.slice(0, 6).map((behavior, i) => (
              <div key={i} className="bg-green-500/10 border border-green-500/30 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{behavior.icon}</span>
                  <span className="text-green-400 font-medium">{behavior.title}</span>
                </div>
                <p className="text-slate-300 text-sm">{behavior.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 재회 실패 행동 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <ThumbsDown className="w-5 h-5 text-red-400" />
            절대 하면 안 되는 행동
          </h2>

          <div className="grid grid-cols-1 gap-3">
            {FAILURE_BEHAVIORS.slice(0, 6).map((behavior, i) => (
              <div key={i} className="bg-red-500/10 border border-red-500/30 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{behavior.icon}</span>
                  <span className="text-red-400 font-medium">{behavior.title}</span>
                </div>
                <p className="text-slate-300 text-sm">{behavior.desc}</p>
              </div>
            ))}
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
            <div className="flex items-start gap-3 bg-blue-500/10 rounded-xl p-3">
              <Eye className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-300 text-sm">상대방의 행동을 잘 관찰하세요. 말보다 행동이 진심을 보여줍니다.</p>
            </div>
            <div className="flex items-start gap-3 bg-purple-500/10 rounded-xl p-3">
              <Users className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-300 text-sm">힘들 때는 주변의 도움을 받으세요. 혼자 모든 것을 해결하려 하지 마세요.</p>
            </div>
          </div>
        </motion.div>

        {/* 힐링 명언 */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-3xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-5 h-5 text-indigo-400" />
            <span className="text-indigo-400 font-medium">오늘의 힐링 명언</span>
          </div>
          <p className="text-white text-lg italic mb-2">&ldquo;{randomQuote.quote}&rdquo;</p>
          <p className="text-slate-400 text-sm text-right">- {randomQuote.author}</p>
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

        {/* 내보내기 버튼 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Download className="w-5 h-5 text-pink-400" />
            결과 내보내기
          </h2>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={handleDownloadHtml}
              className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-pink-500/20 to-rose-500/20 border border-pink-500/30 rounded-xl text-pink-300 font-medium hover:from-pink-500/30 hover:to-rose-500/30 transition-all"
            >
              <Download className="w-4 h-4" />
              저장
            </button>
            <button
              onClick={handleSendEmail}
              className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-500/30 rounded-xl text-violet-300 font-medium hover:from-violet-500/30 hover:to-purple-500/30 transition-all"
            >
              <Mail className="w-4 h-4" />
              메일
            </button>
            <button
              onClick={handleKakaoShare}
              className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 rounded-xl text-yellow-300 font-medium hover:from-yellow-500/30 hover:to-amber-500/30 transition-all"
            >
              <Share2 className="w-4 h-4" />
              카톡
            </button>
          </div>
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
          <button
            onClick={onBack}
            className="w-full py-3 bg-slate-700/50 rounded-2xl text-slate-300 font-medium hover:bg-slate-700 transition-all"
          >
            메뉴로
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
