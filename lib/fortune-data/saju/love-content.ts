// 연애운 콘텐츠 데이터 - 일간별 상세 연애 분석

export interface LoveContent {
  loveType: string;
  lovePersonality: string;
  loveStyle: string;
  attractionType: string;
  idealPartnerTraits: string[];
  avoidPartnerTraits: string[];
  relationshipStrengths: string[];
  relationshipWeaknesses: string[];
  marriageAdvice: { idealAge: string; partnerElement: string; cautionPoints: string[] };
  romanticPeaks: { period: string; description: string }[];
  loveCompatibility: { bestMatches: string[]; goodMatches: string[]; challengingMatches: string[] };
  datingTips: string[];
  breakupPattern: string;
  reconciliationAdvice: string;
}

export const LOVE_BY_DAY_STEM: Record<string, LoveContent> = {
  '갑': {
    loveType: '책임감 있는 보호자형 - 묵직한 사랑을 주는 큰 나무',
    lovePersonality: '갑목 일간은 한번 마음을 주면 끝까지 지키는 타입입니다. 연인을 보호하고 책임지려 하며, 가정을 중요시합니다. 표현은 서툴지만 행동으로 사랑을 보여줍니다.',
    loveStyle: '진지하고 책임감 있는 연애를 합니다. 가볍게 만나는 것을 좋아하지 않으며, 결혼을 전제로 한 진지한 교제를 선호합니다. 무뚝뚝해 보이지만 속마음은 따뜻합니다.',
    attractionType: '듬직하고 신뢰감 있는 모습에 끌립니다. 말보다 행동으로 보여주는 사람, 약속을 지키는 사람에게 매력을 느낍니다.',
    idealPartnerTraits: ['지적이고 교양 있는 사람', '독립적이면서도 가정적인 사람', '자신의 일에 열정이 있는 사람', '안정적이고 신뢰할 수 있는 사람', '자신을 존경해주는 사람'],
    avoidPartnerTraits: ['가벼운 만남을 좋아하는 사람', '약속을 잘 안 지키는 사람', '의존적이기만 한 사람', '감정 기복이 심한 사람', '불성실한 사람'],
    relationshipStrengths: ['강한 책임감', '변치 않는 사랑', '신뢰성', '보호 본능', '가정적'],
    relationshipWeaknesses: ['표현 부족', '융통성 없음', '일에 몰두', '감정 표현 서툼'],
    marriageAdvice: {
      idealAge: '30대 초중반',
      partnerElement: '을목, 임수, 계수 일간과 궁합이 좋습니다',
      cautionPoints: ['배우자의 의견도 존중하세요', '일과 가정의 균형을 맞추세요', '표현을 더 하세요', '융통성을 발휘하세요']
    },
    romanticPeaks: [
      { period: '20대 후반~30대 초반', description: '사회적으로 안정되면서 좋은 인연을 만날 확률이 높습니다.' },
      { period: '35~38세', description: '결혼 적기입니다. 진지한 만남이 결실을 맺습니다.' }
    ],
    loveCompatibility: {
      bestMatches: ['을목 - 서로 보완하는 관계', '임수 - 물이 나무를 키우듯', '기토 - 안정적인 지지'],
      goodMatches: ['계수 - 부드러운 조화', '정화 - 열정과 안정', '무토 - 든든한 파트너'],
      challengingMatches: ['경금 - 갈등 가능성', '신금 - 예민한 관계', '병화 - 에너지 충돌']
    },
    datingTips: ['첫 데이트에 진지한 모습을 보여주세요', '말보다 행동으로 표현하세요', '약속은 반드시 지키세요', '가족 얘기를 자연스럽게 하세요'],
    breakupPattern: '쉽게 마음을 주지 않지만, 한번 끝내면 깔끔하게 정리합니다. 미련은 있지만 티내지 않습니다.',
    reconciliationAdvice: '시간이 필요합니다. 급하게 재회를 시도하지 말고, 진정성 있는 변화를 보여주세요.'
  },
  '을': {
    loveType: '유연한 동반자형 - 어디서든 함께 자라는 덩굴',
    lovePersonality: '을목 일간은 상대에게 맞추며 함께 성장하는 타입입니다. 로맨틱하고 섬세하며, 분위기와 감성을 중요시합니다. 상대의 마음을 잘 읽고 배려합니다.',
    loveStyle: '로맨틱하고 섬세한 연애를 합니다. 분위기를 중요시하며, 감성적인 대화와 스킨십을 좋아합니다. 상대에게 맞추는 것을 잘하지만, 자신도 돌봐야 합니다.',
    attractionType: '강인하면서도 부드러운 사람에게 끌립니다. 자신을 지지해주고 성장시켜주는 사람에게 매력을 느낍니다.',
    idealPartnerTraits: ['자신을 존중해주는 사람', '경제적으로 안정된 사람', '섬세함을 이해하는 사람', '리더십 있는 사람', '표현을 잘하는 사람'],
    avoidPartnerTraits: ['강압적인 사람', '무례한 사람', '감정을 무시하는 사람', '불안정한 사람', '예술적 감각 없는 사람'],
    relationshipStrengths: ['배려심', '적응력', '로맨틱함', '섬세함', '공감 능력'],
    relationshipWeaknesses: ['우유부단함', '지나친 맞춤', '자기 희생', '의존적 경향'],
    marriageAdvice: {
      idealAge: '20대 후반~30대 초반',
      partnerElement: '갑목, 경금 일간과 궁합이 좋습니다',
      cautionPoints: ['자신의 의견도 표현하세요', '너무 맞추다 지치지 마세요', '존중받는 관계인지 확인하세요', '독립성도 유지하세요']
    },
    romanticPeaks: [
      { period: '25~30세', description: '가장 매력적인 시기입니다. 좋은 인연이 많이 찾아옵니다.' },
      { period: '33~35세', description: '결혼 적기입니다. 안정적인 인연을 만납니다.' }
    ],
    loveCompatibility: {
      bestMatches: ['갑목 - 든든한 보호자', '경금 - 강인한 지지', '무토 - 안정적 기반'],
      goodMatches: ['병화 - 열정적 만남', '임수 - 깊은 교감', '기토 - 따뜻한 돌봄'],
      challengingMatches: ['신금 - 예민한 갈등', '을목 - 결단력 부족', '계수 - 지나친 감성']
    },
    datingTips: ['분위기 있는 장소를 선택하세요', '섬세한 배려를 보여주세요', '감성적인 대화를 나누세요', '꽃이나 작은 선물을 준비하세요'],
    breakupPattern: '상처를 많이 받고 오래 앓습니다. 미련이 많고 쉽게 정리하지 못합니다.',
    reconciliationAdvice: '재회 가능성이 있습니다. 진심 어린 사과와 변화를 보여주면 마음이 움직입니다.'
  },
  '병': {
    loveType: '열정적인 태양형 - 뜨겁게 사랑하는 불꽃',
    lovePersonality: '병화 일간은 열정적이고 직접적인 사랑을 합니다. 마음에 들면 적극적으로 다가가고, 숨김없이 표현합니다. 연애할 때 온 세상이 밝아지는 타입입니다.',
    loveStyle: '불같은 열정적 사랑을 합니다. 표현이 직접적이고 숨김이 없습니다. 연인에게 모든 것을 주고 싶어하며, 함께하는 시간을 즐깁니다.',
    attractionType: '당당하고 매력적인 사람에게 끌립니다. 자신만의 빛이 있는 독립적인 사람에게 매력을 느낍니다.',
    idealPartnerTraits: ['자신의 열정을 이해하는 사람', '함께 빛날 수 있는 사람', '독립적이고 당당한 사람', '활동적인 사람', '솔직한 사람'],
    avoidPartnerTraits: ['소극적인 사람', '숨기는 게 많은 사람', '의존적인 사람', '부정적인 사람', '재미없는 사람'],
    relationshipStrengths: ['열정', '솔직함', '적극성', '재미', '에너지'],
    relationshipWeaknesses: ['질투', '독점욕', '변덕', '지나친 열정', '식는 것도 빠름'],
    marriageAdvice: {
      idealAge: '20대 후반~30대 초반',
      partnerElement: '임수, 신금 일간과 궁합이 좋습니다',
      cautionPoints: ['상대의 영역을 존중하세요', '질투를 조절하세요', '열정이 식어도 책임지세요', '배우자의 빛도 인정하세요']
    },
    romanticPeaks: [
      { period: '20대', description: '가장 많은 인연을 만나는 시기입니다. 인기가 많습니다.' },
      { period: '30대 초반', description: '진지한 사랑을 만나 결실을 맺습니다.' }
    ],
    loveCompatibility: {
      bestMatches: ['임수 - 열정을 식혀주는 물', '신금 - 빛나는 보석', '을목 - 함께 타오르는 불'],
      goodMatches: ['무토 - 열정을 받아주는 땅', '경금 - 강렬한 만남', '갑목 - 불을 키우는 나무'],
      challengingMatches: ['병화 - 과열 위험', '계수 - 꺼질 위험', '기토 - 열정 둔화']
    },
    datingTips: ['적극적으로 다가가세요', '재미있는 데이트를 계획하세요', '솔직하게 표현하세요', '에너지 넘치는 모습을 보여주세요'],
    breakupPattern: '이별을 하면 크게 상처받지만 빨리 회복합니다. 새로운 사랑을 찾아 나섭니다.',
    reconciliationAdvice: '식어버린 열정은 다시 데우기 어렵습니다. 재회보다 새 시작을 권합니다.'
  },
  '정': {
    loveType: '깊은 감성형 - 은은하게 빛나는 촛불',
    lovePersonality: '정화 일간은 깊고 진한 사랑을 합니다. 한번 마음을 주면 변치 않으며, 상대를 깊이 이해하려 합니다. 표면적인 만남보다 영혼이 교감하는 관계를 원합니다.',
    loveStyle: '깊고 진한 사랑을 합니다. 표현은 은은하지만 마음은 뜨겁습니다. 상대의 내면을 들여다보고 진정한 교감을 나눕니다.',
    attractionType: '지적이고 깊이 있는 사람에게 끌립니다. 겉모습보다 내면의 아름다움을 보는 사람에게 매력을 느낍니다.',
    idealPartnerTraits: ['지적이고 깊이 있는 사람', '대화가 통하는 사람', '자신의 내면을 이해하는 사람', '안정적인 사람', '예술적 감각이 있는 사람'],
    avoidPartnerTraits: ['피상적인 사람', '깊이 없는 대화를 하는 사람', '감정을 무시하는 사람', '바람기 있는 사람', '성급한 사람'],
    relationshipStrengths: ['깊은 교감', '변치 않는 마음', '통찰력', '섬세함', '헌신'],
    relationshipWeaknesses: ['표현 부족', '신중 과다', '폐쇄적', '질투'],
    marriageAdvice: {
      idealAge: '30대',
      partnerElement: '임수, 갑목 일간과 궁합이 좋습니다',
      cautionPoints: ['마음을 표현하세요', '너무 신중하다 놓치지 마세요', '상대도 완벽할 수 없습니다', '열린 마음을 가지세요']
    },
    romanticPeaks: [
      { period: '28~33세', description: '깊은 인연을 만날 시기입니다.' },
      { period: '35~40세', description: '영혼의 동반자를 만나 결혼합니다.' }
    ],
    loveCompatibility: {
      bestMatches: ['임수 - 깊은 교감', '갑목 - 함께 성장', '무토 - 안정적 기반'],
      goodMatches: ['계수 - 감성 공유', '을목 - 섬세한 이해', '기토 - 따뜻한 돌봄'],
      challengingMatches: ['병화 - 과열', '경금 - 갈등', '신금 - 예민']
    },
    datingTips: ['깊은 대화를 나누세요', '조용한 장소를 선택하세요', '예술이나 문화 활동을 함께하세요', '진심을 전달하세요'],
    breakupPattern: '이별 후 오랫동안 아픕니다. 쉽게 잊지 못하고 내면에 간직합니다.',
    reconciliationAdvice: '시간이 필요합니다. 진정성 있는 변화를 보여주면 재회 가능성이 있습니다.'
  },
  '무': {
    loveType: '듬직한 산형 - 변함없이 지켜주는 큰 산',
    lovePersonality: '무토 일간은 변하지 않는 사랑을 줍니다. 한결같이 곁에 있어주고, 묵묵히 지켜봅니다. 표현은 서툴지만 행동으로 보여주는 타입입니다.',
    loveStyle: '표현은 서툴지만 진심으로 지켜줍니다. 한결같은 사랑을 하며, 연인에게 안정감을 줍니다. 말보다 행동으로 사랑을 표현합니다.',
    attractionType: '안정적이고 신뢰할 수 있는 사람에게 끌립니다. 밝고 활기차게 자신을 이끌어주는 사람에게 매력을 느낍니다.',
    idealPartnerTraits: ['밝고 활기찬 사람', '자신을 이해하는 사람', '가정적인 사람', '안정적인 사람', '표현을 잘하는 사람'],
    avoidPartnerTraits: ['변덕스러운 사람', '불안정한 사람', '가벼운 사람', '약속을 안 지키는 사람', '거짓말하는 사람'],
    relationshipStrengths: ['안정감', '한결같음', '책임감', '신뢰성', '보호본능'],
    relationshipWeaknesses: ['표현 부족', '변화 거부', '둔감함', '고집'],
    marriageAdvice: {
      idealAge: '30대 중반',
      partnerElement: '병화, 계수 일간과 궁합이 좋습니다',
      cautionPoints: ['표현을 더 하세요', '변화도 받아들이세요', '배우자 의견을 존중하세요', '둔감함을 고치세요']
    },
    romanticPeaks: [
      { period: '30~35세', description: '안정적인 인연을 만나는 시기입니다.' },
      { period: '35~40세', description: '결혼하기 가장 좋은 시기입니다.' }
    ],
    loveCompatibility: {
      bestMatches: ['병화 - 밝게 비춰주는 태양', '계수 - 부드러운 물', '갑목 - 함께 성장'],
      goodMatches: ['정화 - 따뜻함', '을목 - 유연함', '임수 - 깊은 교감'],
      challengingMatches: ['경금 - 갈등', '무토 - 답답함', '기토 - 정체']
    },
    datingTips: ['안정감을 주세요', '약속을 꼭 지키세요', '표현 연습을 하세요', '꾸준함을 보여주세요'],
    breakupPattern: '쉽게 이별하지 않습니다. 끝까지 지키려 하지만, 끝나면 묵묵히 받아들입니다.',
    reconciliationAdvice: '재회 가능성이 있습니다. 시간이 지나도 마음에 남아있습니다.'
  },
  '기': {
    loveType: '헌신적인 정원사형 - 사랑으로 가꾸는 비옥한 땅',
    lovePersonality: '기토 일간은 헌신적인 사랑을 합니다. 상대를 돌보고 키우듯 사랑하며, 가정을 중요시합니다. 따뜻하고 포근한 사랑을 줍니다.',
    loveStyle: '헌신적이고 따뜻한 사랑을 합니다. 상대방을 위해 희생하며, 가정적인 관계를 추구합니다. 편안함과 안정감을 줍니다.',
    attractionType: '자신을 필요로 하는 사람에게 끌립니다. 야망이 있고 자신의 도움으로 성장하는 사람에게 매력을 느낍니다.',
    idealPartnerTraits: ['자신을 존중하는 사람', '성장 의지가 있는 사람', '감사할 줄 아는 사람', '가정적인 사람', '따뜻한 사람'],
    avoidPartnerTraits: ['이기적인 사람', '감사할 줄 모르는 사람', '배려 없는 사람', '폭력적인 사람', '냉정한 사람'],
    relationshipStrengths: ['헌신', '배려', '따뜻함', '가정적', '안정감'],
    relationshipWeaknesses: ['과도한 희생', '자기 무시', '거절 못함', '의존적 관계 형성'],
    marriageAdvice: {
      idealAge: '20대 후반~30대 초반',
      partnerElement: '갑목, 병화 일간과 궁합이 좋습니다',
      cautionPoints: ['자신도 돌보세요', '일방적 희생은 안 됩니다', '존중받는지 확인하세요', '거절할 줄 알아야 합니다']
    },
    romanticPeaks: [
      { period: '25~30세', description: '좋은 인연을 만나는 시기입니다.' },
      { period: '30~35세', description: '결혼하고 가정을 이루는 시기입니다.' }
    ],
    loveCompatibility: {
      bestMatches: ['갑목 - 함께 성장', '병화 - 따뜻함 공유', '경금 - 강인한 지지'],
      goodMatches: ['을목 - 유연한 관계', '정화 - 깊은 교감', '임수 - 조화'],
      challengingMatches: ['기토 - 희생 경쟁', '무토 - 정체', '계수 - 지나친 감성']
    },
    datingTips: ['따뜻한 배려를 보여주세요', '맛있는 음식을 대접하세요', '가정적인 면을 어필하세요', '편안한 분위기를 만드세요'],
    breakupPattern: '상처를 많이 받고 자책합니다. 회복에 시간이 오래 걸립니다.',
    reconciliationAdvice: '다시 받아줄 가능성이 높습니다. 단, 같은 실수를 반복하면 안 됩니다.'
  },
  '경': {
    loveType: '진지한 전사형 - 사랑도 승부처럼 진지한 검',
    lovePersonality: '경금 일간은 진지하고 책임감 있는 사랑을 합니다. 한번 마음 주면 끝까지 가며, 연인을 지키기 위해 싸웁니다. 강해 보이지만 내면은 따뜻합니다.',
    loveStyle: '진지하고 책임감 있는 연애를 합니다. 장난스러운 연애보다 진지한 만남을 선호합니다. 한번 마음을 주면 변치 않습니다.',
    attractionType: '강인하면서도 부드러운 사람에게 끌립니다. 자신과 함께 싸워나갈 파트너에게 매력을 느낍니다.',
    idealPartnerTraits: ['강인하면서도 부드러운 사람', '자신의 강함을 받아줄 사람', '독립적인 사람', '솔직한 사람', '의지가 있는 사람'],
    avoidPartnerTraits: ['나약한 사람', '거짓말하는 사람', '우유부단한 사람', '의존적인 사람', '감정 기복 심한 사람'],
    relationshipStrengths: ['책임감', '보호본능', '충성심', '결단력', '신뢰성'],
    relationshipWeaknesses: ['무뚝뚝함', '표현 부족', '완고함', '너무 강함'],
    marriageAdvice: {
      idealAge: '20대 후반~30대 초반',
      partnerElement: '을목, 정화 일간과 궁합이 좋습니다',
      cautionPoints: ['부드럽게 표현하세요', '상대를 상처주지 마세요', '융통성을 발휘하세요', '여유를 가지세요']
    },
    romanticPeaks: [
      { period: '25~30세', description: '운명적인 만남이 있을 시기입니다.' },
      { period: '32~35세', description: '결혼 적기입니다.' }
    ],
    loveCompatibility: {
      bestMatches: ['을목 - 부드러운 조화', '정화 - 열정', '기토 - 따뜻함'],
      goodMatches: ['계수 - 감성 보완', '무토 - 안정', '갑목 - 동반 성장'],
      challengingMatches: ['경금 - 충돌', '신금 - 예민', '병화 - 과열']
    },
    datingTips: ['진지한 모습을 보여주세요', '보호해주겠다는 의지를 표현하세요', '부드러운 면도 보여주세요', '약속을 꼭 지키세요'],
    breakupPattern: '이별하면 깔끔하게 정리합니다. 미련이 있어도 티내지 않습니다.',
    reconciliationAdvice: '한번 끝나면 다시 시작하기 어렵습니다. 재회보다 앞으로 나아가세요.'
  },
  '신': {
    loveType: '까다로운 보석형 - 진정한 가치를 아는 반짝이는 보석',
    lovePersonality: '신금 일간은 이상이 높고 선택이 까다롭습니다. 쉽게 마음을 열지 않지만, 한번 마음을 주면 진심을 다합니다. 품격 있는 사랑을 추구합니다.',
    loveStyle: '이상이 높고 선택이 까다롭습니다. 외모와 내면 모두 수준 높은 사람을 원합니다. 품격 있는 연애를 추구합니다.',
    attractionType: '세련되고 품격 있는 사람에게 끌립니다. 지적이고 아름다운 사람에게 매력을 느낍니다.',
    idealPartnerTraits: ['세련되고 품격 있는 사람', '지적이고 교양 있는 사람', '자신을 존중하는 사람', '성공한 사람', '미적 감각이 있는 사람'],
    avoidPartnerTraits: ['조잡한 사람', '무례한 사람', '기준 없는 사람', '지저분한 사람', '감각 없는 사람'],
    relationshipStrengths: ['품격', '섬세함', '충성심', '헌신', '심미안'],
    relationshipWeaknesses: ['까다로움', '비판적', '완벽주의', '예민함'],
    marriageAdvice: {
      idealAge: '30대',
      partnerElement: '병화, 임수 일간과 궁합이 좋습니다',
      cautionPoints: ['완벽한 사람은 없습니다', '기대를 조금 낮추세요', '비판을 줄이세요', '있는 그대로를 사랑하세요']
    },
    romanticPeaks: [
      { period: '28~33세', description: '좋은 인연을 만나는 시기입니다.' },
      { period: '35~38세', description: '결혼 적기입니다.' }
    ],
    loveCompatibility: {
      bestMatches: ['병화 - 빛나게 해줌', '임수 - 깊은 교감', '무토 - 안정'],
      goodMatches: ['정화 - 섬세함', '갑목 - 성장', '기토 - 따뜻함'],
      challengingMatches: ['신금 - 경쟁', '경금 - 갈등', '을목 - 예민']
    },
    datingTips: ['품격 있는 장소를 선택하세요', '세련된 모습을 보여주세요', '예술이나 문화 활동을 함께하세요', '칭찬을 아끼지 마세요'],
    breakupPattern: '이별하면 차갑게 정리합니다. 상처받았지만 티내지 않습니다.',
    reconciliationAdvice: '자존심 때문에 먼저 연락하기 어렵습니다. 상대가 먼저 다가와야 합니다.'
  },
  '임': {
    loveType: '포용하는 바다형 - 모든 것을 받아주는 깊은 바다',
    lovePersonality: '임수 일간은 깊고 포용적인 사랑을 합니다. 상대를 있는 그대로 수용하며, 지혜로운 사랑을 합니다. 자유로우면서도 깊은 관계를 원합니다.',
    loveStyle: '깊고 포용적인 사랑을 합니다. 상대를 있는 그대로 수용하며, 자유와 연결 사이에서 균형을 찾습니다.',
    attractionType: '지적이고 깊이 있는 사람에게 끌립니다. 자신의 자유를 존중하면서도 함께 성장할 수 있는 사람에게 매력을 느낍니다.',
    idealPartnerTraits: ['지적이고 깊이 있는 사람', '자유를 인정하는 사람', '함께 성장할 수 있는 사람', '대화가 통하는 사람', '포용력 있는 사람'],
    avoidPartnerTraits: ['구속하는 사람', '얕은 사람', '변화를 두려워하는 사람', '좁은 시야', '경직된 사람'],
    relationshipStrengths: ['포용력', '지혜', '깊이', '자유로움', '이해력'],
    relationshipWeaknesses: ['구속 거부', '너무 자유로움', '우유부단', '깊은 감정 숨김'],
    marriageAdvice: {
      idealAge: '30대',
      partnerElement: '정화, 을목 일간과 궁합이 좋습니다',
      cautionPoints: ['적절한 구속도 필요합니다', '마음을 열어주세요', '결정을 미루지 마세요', '깊은 감정도 표현하세요']
    },
    romanticPeaks: [
      { period: '28~35세', description: '깊은 인연을 만나는 시기입니다.' },
      { period: '35~40세', description: '영혼의 동반자를 만납니다.' }
    ],
    loveCompatibility: {
      bestMatches: ['정화 - 깊은 교감', '을목 - 함께 성장', '병화 - 열정적 조화'],
      goodMatches: ['무토 - 안정', '갑목 - 성장 지원', '기토 - 따뜻함'],
      challengingMatches: ['계수 - 너무 유사', '경금 - 갈등', '신금 - 예민']
    },
    datingTips: ['깊은 대화를 나누세요', '지적인 활동을 함께하세요', '여행을 제안하세요', '자유로운 분위기를 만드세요'],
    breakupPattern: '이별해도 마음에 남겨둡니다. 완전히 끊지 않고 인연을 유지하려 합니다.',
    reconciliationAdvice: '재회 가능성이 있습니다. 서로 성장한 후 다시 만날 수 있습니다.'
  },
  '계': {
    loveType: '순수한 이슬형 - 맑고 순수한 사랑의 이슬',
    lovePersonality: '계수 일간은 순수하고 감성적인 사랑을 합니다. 영혼이 교감하는 관계를 원하며, 헌신적으로 사랑합니다. 직관적으로 상대의 마음을 읽습니다.',
    loveStyle: '순수하고 헌신적인 사랑을 합니다. 영혼의 동반자를 찾으며, 깊은 정신적 교감을 원합니다.',
    attractionType: '영적이고 깊이 있는 사람에게 끌립니다. 자신의 섬세함을 이해하는 따뜻한 사람에게 매력을 느낍니다.',
    idealPartnerTraits: ['영적이고 깊이 있는 사람', '따뜻하고 이해심 많은 사람', '순수한 사람', '대화가 통하는 사람', '예술적 감각이 있는 사람'],
    avoidPartnerTraits: ['거칠고 무례한 사람', '물질주의적인 사람', '감성 없는 사람', '이기적인 사람', '폭력적인 사람'],
    relationshipStrengths: ['순수함', '헌신', '직관력', '감성', '영성'],
    relationshipWeaknesses: ['현실 감각 부족', '예민함', '상처받기 쉬움', '의존적'],
    marriageAdvice: {
      idealAge: '20대 후반~30대 초반',
      partnerElement: '무토, 병화 일간과 궁합이 좋습니다',
      cautionPoints: ['현실도 중요합니다', '상처에 예민하지 마세요', '의존하지 마세요', '자신감을 가지세요']
    },
    romanticPeaks: [
      { period: '25~30세', description: '운명적인 만남이 있을 시기입니다.' },
      { period: '33~36세', description: '영혼의 동반자를 만납니다.' }
    ],
    loveCompatibility: {
      bestMatches: ['무토 - 안정적 기반', '병화 - 따뜻함', '갑목 - 함께 성장'],
      goodMatches: ['정화 - 깊은 교감', '을목 - 감성 공유', '경금 - 보호'],
      challengingMatches: ['계수 - 너무 유사', '임수 - 정체', '신금 - 예민']
    },
    datingTips: ['감성적인 분위기를 만드세요', '영화나 음악 데이트가 좋습니다', '진심을 표현하세요', '섬세한 배려를 보여주세요'],
    breakupPattern: '상처가 깊고 오래갑니다. 회복에 시간이 많이 걸립니다.',
    reconciliationAdvice: '재회 가능성이 높습니다. 진심 어린 사과에 마음이 녹습니다.'
  }
};

export default LOVE_BY_DAY_STEM;
