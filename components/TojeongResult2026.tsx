'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { BookOpen, ArrowLeft, RefreshCw, Calendar, Star, Sun } from 'lucide-react';

interface TojeongResult2026Props {
  result: SajuResult;
  name: string;
  gender: 'male' | 'female';
  birthDate: { year: number; month: number; day: number };
  onReset: () => void;
  onBack: () => void;
}

// 토정비결 괘 계산
const calculateTojeongGwae = (year: number, month: number, day: number) => {
  // 상괘 (태세수) - 년도 기반
  const yearCycle = (year - 4) % 60; // 60갑자 순환
  const sangGwae = (yearCycle % 8) + 1;

  // 중괘 (월건수) - 월 기반
  const jungGwae = ((month + yearCycle) % 6) + 1;

  // 하괘 (일진수) - 일 기반
  const haGwae = ((day + month + yearCycle) % 8) + 1;

  return { sangGwae, jungGwae, haGwae };
};

// 괘별 기본 운세 해석
const gwaeInterpretations: Record<number, { name: string; meaning: string }> = {
  1: { name: '건(乾)', meaning: '하늘의 기운이 충만하니 크게 이룰 운' },
  2: { name: '태(兌)', meaning: '기쁨이 가득하니 화합의 운' },
  3: { name: '리(離)', meaning: '밝음이 비추니 명예가 오르는 운' },
  4: { name: '진(震)', meaning: '우레와 같이 크게 움직일 운' },
  5: { name: '손(巽)', meaning: '바람처럼 유연하게 나아갈 운' },
  6: { name: '감(坎)', meaning: '물처럼 지혜롭게 헤쳐나갈 운' },
  7: { name: '간(艮)', meaning: '산처럼 굳건히 지킬 운' },
  8: { name: '곤(坤)', meaning: '땅처럼 넓게 받아들일 운' },
};

// 월별 토정비결 시(詩) - 괘 조합에 따른 변형
const getMonthlyVerse = (month: number, totalGwae: number) => {
  const verses: Record<number, { title: string; verse: string; interpretation: string; luck: number }[]> = {
    1: [
      { title: '새해 첫 달의 운', verse: '동풍이 불어 얼음을 녹이니\n새싹이 돋아날 조짐이로다', interpretation: '새로운 시작의 기운이 감돌고, 준비한 일이 서서히 결실을 맺기 시작합니다.', luck: 70 },
      { title: '정월의 운세', verse: '봄빛이 문 앞에 이르렀으니\n만물이 소생할 때로다', interpretation: '좋은 기회가 찾아오니 적극적으로 움직이십시오.', luck: 80 },
      { title: '첫달의 비결', verse: '매화가 눈 속에서 피어나니\n고난 속 희망을 보리라', interpretation: '어려움 속에서도 좋은 소식이 있을 것입니다.', luck: 65 },
    ],
    2: [
      { title: '이월의 운', verse: '꽃망울이 터지려 하니\n기다림이 곧 보람되리라', interpretation: '참고 기다린 일에 진전이 생깁니다. 서두르지 마십시오.', luck: 75 },
      { title: '경칩의 운세', verse: '개구리가 잠에서 깨어나듯\n숨은 기회가 나타나리라', interpretation: '뜻밖의 기회가 찾아올 수 있으니 준비하십시오.', luck: 72 },
      { title: '봄기운의 비결', verse: '버들가지에 새순이 돋으니\n희망찬 소식이 오리라', interpretation: '좋은 소식과 만남이 기다리고 있습니다.', luck: 78 },
    ],
    3: [
      { title: '삼월의 운', verse: '꽃이 만발하여 향기 가득하니\n귀인이 찾아올 때로다', interpretation: '귀인의 도움으로 일이 순조롭게 풀립니다.', luck: 85 },
      { title: '춘삼월 운세', verse: '제비가 돌아와 집을 짓듯\n기반이 다져지는 때로다', interpretation: '안정적인 기반을 다질 좋은 시기입니다.', luck: 80 },
      { title: '화창한 봄의 비결', verse: '봄비가 대지를 적시니\n만물이 자라날 때로다', interpretation: '노력한 만큼 성장과 발전이 있습니다.', luck: 82 },
    ],
    4: [
      { title: '사월의 운', verse: '백화가 다투어 피었으니\n선택의 기로에 서리라', interpretation: '여러 기회 중 현명한 선택이 필요한 때입니다.', luck: 73 },
      { title: '늦봄의 운세', verse: '꽃잎이 바람에 흩날리니\n변화에 대비하라', interpretation: '변화의 조짐이 있으니 유연하게 대처하십시오.', luck: 68 },
      { title: '곡우의 비결', verse: '농부가 씨를 뿌리듯\n정성을 다하면 결실을 보리라', interpretation: '지금 뿌린 씨앗이 나중에 큰 결실로 돌아옵니다.', luck: 76 },
    ],
    5: [
      { title: '오월의 운', verse: '녹음이 짙어지니\n하는 일마다 무르익으리라', interpretation: '일이 궤도에 오르고 순조롭게 진행됩니다.', luck: 83 },
      { title: '초여름 운세', verse: '보리가 익어가듯\n노력의 결실이 보이리라', interpretation: '그동안의 노력이 결실을 맺기 시작합니다.', luck: 85 },
      { title: '단오의 비결', verse: '해가 중천에 떠오르니\n기운이 왕성할 때로다', interpretation: '체력과 의욕이 충만하니 적극적으로 임하십시오.', luck: 80 },
    ],
    6: [
      { title: '유월의 운', verse: '여름비가 대지를 적시니\n시련 후에 복이 오리라', interpretation: '잠시 어려움이 있으나 곧 좋아집니다.', luck: 65 },
      { title: '한여름 운세', verse: '뙤약볕 아래 그늘을 찾듯\n휴식이 필요한 때로다', interpretation: '무리하지 말고 재충전의 시간을 가지십시오.', luck: 60 },
      { title: '하지의 비결', verse: '모내기가 끝나면 기다림뿐\n인내하면 복이 오리라', interpretation: '조급해하지 말고 때를 기다리십시오.', luck: 62 },
    ],
    7: [
      { title: '칠월의 운', verse: '은하수에 별이 빛나니\n소원이 이루어질 조짐', interpretation: '바라던 일이 이루어질 가능성이 높습니다.', luck: 78 },
      { title: '칠석의 운세', verse: '견우와 직녀가 만나듯\n좋은 인연이 찾아오리라', interpretation: '좋은 만남이나 협력의 기회가 옵니다.', luck: 80 },
      { title: '백중의 비결', verse: '과일이 영글어가니\n준비한 것이 빛을 보리라', interpretation: '그동안 준비한 일이 성과로 나타납니다.', luck: 77 },
    ],
    8: [
      { title: '팔월의 운', verse: '가을바람이 불기 시작하니\n새로운 전환의 때로다', interpretation: '변화와 전환의 시기, 새로운 계획을 세우십시오.', luck: 72 },
      { title: '처서의 운세', verse: '더위가 물러가듯\n근심도 사라지리라', interpretation: '걱정하던 일이 해결될 조짐입니다.', luck: 75 },
      { title: '한가위 비결', verse: '보름달이 환하게 비추니\n가정에 화목함이 가득', interpretation: '가정과 주변 관계가 화목해지는 때입니다.', luck: 82 },
    ],
    9: [
      { title: '구월의 운', verse: '국화가 피어 향기 그윽하니\n지혜로운 결단의 때로다', interpretation: '중요한 결정을 내리기 좋은 시기입니다.', luck: 79 },
      { title: '중양절 운세', verse: '단풍이 물들어가듯\n성숙해지는 때로다', interpretation: '내면적으로 성장하고 성숙해지는 시기입니다.', luck: 76 },
      { title: '가을의 비결', verse: '곡식을 거두어들이니\n풍요로움을 누리리라', interpretation: '그동안의 노력에 대한 보상이 있습니다.', luck: 84 },
    ],
    10: [
      { title: '시월의 운', verse: '서리가 내리기 전에\n거둘 것을 거두어라', interpretation: '마무리가 필요한 일을 서둘러 처리하십시오.', luck: 70 },
      { title: '상강의 운세', verse: '낙엽이 지니 새봄을 준비하듯\n미래를 도모하라', interpretation: '다가올 일을 위한 준비를 시작하십시오.', luck: 68 },
      { title: '늦가을 비결', verse: '기러기가 남으로 날아가듯\n순리를 따르면 길하리라', interpretation: '흐름에 순응하며 자연스럽게 나아가십시오.', luck: 71 },
    ],
    11: [
      { title: '동짓달의 운', verse: '밤이 가장 길 때이나\n새벽이 머지않았도다', interpretation: '어려움이 있으나 곧 희망의 빛이 보입니다.', luck: 63 },
      { title: '소설의 운세', verse: '눈이 내려 세상을 덮으니\n정결한 마음을 가져라', interpretation: '마음을 정리하고 새로운 각오를 다지십시오.', luck: 65 },
      { title: '입동의 비결', verse: '곰이 겨울잠에 들 듯\n내실을 다지는 때로다', interpretation: '외부 활동보다 내부를 다지는 데 집중하십시오.', luck: 60 },
    ],
    12: [
      { title: '섣달의 운', verse: '묵은해가 저물어가니\n새해의 희망을 품어라', interpretation: '한 해를 마무리하며 새로운 희망을 품으십시오.', luck: 72 },
      { title: '대설의 운세', verse: '흰 눈이 온 세상을 덮으니\n새로운 시작을 준비하라', interpretation: '과거를 정리하고 새출발을 준비하십시오.', luck: 70 },
      { title: '연말의 비결', verse: '북풍이 거세게 불어도\n봄은 반드시 오리라', interpretation: '어려움을 견디면 좋은 날이 반드시 옵니다.', luck: 68 },
    ],
  };

  const monthVerses = verses[month] || verses[1];
  const index = totalGwae % monthVerses.length;
  return monthVerses[index];
};

// 연간 종합운
const getYearlyFortune = (sangGwae: number, jungGwae: number, haGwae: number) => {
  const totalScore = sangGwae + jungGwae + haGwae;

  if (totalScore >= 18) {
    return {
      title: '대길(大吉)',
      description: '하늘이 내린 복록이 가득한 해입니다. 하는 일마다 순풍에 돛 단 듯 순조롭고, 귀인의 도움이 끊이지 않습니다. 다만 겸손함을 잃지 마시고, 주변과 복을 나누면 더욱 크게 번창하리라.',
      color: 'from-yellow-400 to-amber-500',
    };
  } else if (totalScore >= 14) {
    return {
      title: '중길(中吉)',
      description: '전체적으로 좋은 운세입니다. 노력한 만큼의 결실을 얻을 수 있으며, 새로운 기회도 찾아옵니다. 급하게 서두르지 말고 차분히 진행하면 좋은 결과를 얻습니다.',
      color: 'from-emerald-400 to-teal-500',
    };
  } else if (totalScore >= 10) {
    return {
      title: '소길(小吉)',
      description: '평온한 한 해입니다. 큰 변화보다는 현재를 유지하며 내실을 다지기 좋습니다. 작은 것에 감사하고 꾸준히 노력하면 복이 쌓입니다.',
      color: 'from-blue-400 to-cyan-500',
    };
  } else {
    return {
      title: '보통(普通)',
      description: '기복이 있는 한 해입니다. 순탄하지만은 않으나 인내와 지혜로 헤쳐나갈 수 있습니다. 큰 모험은 피하고 안정을 추구하며, 건강에 특히 신경 쓰십시오.',
      color: 'from-slate-400 to-slate-500',
    };
  }
};

// 분야별 운세
const getCategoryFortunes = (sangGwae: number, jungGwae: number, haGwae: number, gender: 'male' | 'female') => {
  const total = sangGwae + jungGwae + haGwae;
  const wealthBase = (sangGwae * 2 + haGwae) % 5;
  const healthBase = (jungGwae * 2 + sangGwae) % 5;
  const careerBase = (sangGwae + jungGwae) % 5;
  const loveBase = (haGwae * 2 + jungGwae) % 5;
  const studyBase = (sangGwae + haGwae) % 5;
  const familyBase = (jungGwae + haGwae) % 5;
  const investmentBase = (sangGwae * 2 + jungGwae) % 5;
  const movingBase = (haGwae + sangGwae) % 5;
  const travelBase = (jungGwae * 2 + haGwae) % 5;
  const legalBase = (sangGwae + jungGwae + haGwae) % 5;

  return {
    wealth: {
      title: '재물운 (財物運)',
      icon: '💰',
      score: Math.min(95, 55 + wealthBase * 8 + (total > 15 ? 10 : 0)),
      verses: [
        { condition: total >= 18, verse: '금은보화가 창고에 쌓이니\n구하지 않아도 재물이 모이리라', detail: '올해는 재물운이 크게 열리는 해입니다. 투자나 사업에서 큰 수익을 기대할 수 있으며, 뜻밖의 횡재수도 있습니다. 다만 과욕을 부리면 오히려 손해를 볼 수 있으니, 분수에 맞게 행동하십시오.' },
        { condition: total >= 14, verse: '물이 흘러 바다에 이르듯\n꾸준히 모으면 부를 이루리라', detail: '재물이 조금씩 들어오는 운세입니다. 큰 한 방보다는 꾸준한 축적이 중요합니다. 불필요한 지출을 줄이고 저축에 힘쓰면 연말에는 상당한 자산을 모을 수 있습니다.' },
        { condition: total >= 10, verse: '우물을 파되 한 곳을 파라\n여기저기 손대면 모두 놓치리라', detail: '재물운이 평이합니다. 여러 곳에 투자하기보다 한 곳에 집중하는 것이 좋습니다. 보증이나 빚은 피하시고, 무리한 사업 확장은 삼가십시오.' },
        { condition: true, verse: '주머니에 구멍이 났으니\n새는 곳을 먼저 막으라', detail: '지출이 늘어나기 쉬운 해입니다. 계획에 없던 지출이 생기거나, 예상치 못한 손실이 있을 수 있습니다. 보수적인 재정 운영이 필요하며, 투기는 절대 금물입니다.' },
      ],
    },
    health: {
      title: '건강운 (健康運)',
      icon: '💪',
      score: Math.min(95, 55 + healthBase * 8 + (total > 12 ? 10 : 0)),
      verses: [
        { condition: total >= 18, verse: '송학이 천년을 살 듯\n건강하여 병이 침범치 못하리라', detail: '건강운이 매우 좋습니다. 활력이 넘치고 면역력도 강해집니다. 다만 과신하여 무리하면 탈이 날 수 있으니, 규칙적인 생활 습관을 유지하십시오.' },
        { condition: total >= 14, verse: '산에 오르면 땀이 나듯\n운동으로 기운을 북돋우라', detail: '전반적으로 건강한 해이나, 관리가 필요합니다. 특히 환절기에 감기 조심하시고, 적당한 운동과 휴식의 균형을 맞추십시오. 정기 건강검진을 권합니다.' },
        { condition: total >= 10, verse: '작은 병을 가볍게 여기지 말라\n싹이 작을 때 뽑아야 하느니라', detail: '소소한 건강 문제가 생길 수 있습니다. 증상이 가벼워도 무시하지 말고 조기에 치료하십시오. 과로를 피하고, 스트레스 관리에 신경 쓰십시오.' },
        { condition: true, verse: '몸이 천냥이면 마음이 구백냥\n마음 편히 하면 병도 물러가리라', detail: '건강에 주의가 필요한 해입니다. 특히 소화기 계통과 호흡기에 유의하시고, 과음과 과식을 삼가십시오. 정신적 스트레스가 신체 증상으로 나타날 수 있으니 마음의 평화를 찾으십시오.' },
      ],
    },
    career: {
      title: '직장/사업운 (事業運)',
      icon: '💼',
      score: Math.min(95, 55 + careerBase * 8 + (total > 14 ? 10 : 0)),
      verses: [
        { condition: total >= 18, verse: '용이 구름을 타고 하늘에 오르니\n뜻한 바를 이루리라', detail: '직장인은 승진과 인정을 받을 가능성이 높고, 사업자는 사업이 크게 번창합니다. 새로운 프로젝트나 도전도 성공 가능성이 높으니 적극적으로 기회를 잡으십시오.' },
        { condition: total >= 14, verse: '때를 만난 배가 순풍을 받으니\n순조롭게 목적지에 다다르리라', detail: '안정적인 직장 운입니다. 큰 성과는 아니더라도 꾸준히 인정받으며, 동료들과의 관계도 원만합니다. 사업자는 무리한 확장보다 내실을 다지는 것이 좋습니다.' },
        { condition: total >= 10, verse: '농부가 밭을 가는 것처럼\n묵묵히 본업에 충실하라', detail: '현상 유지에 힘쓰는 것이 좋습니다. 이직이나 창업은 신중히 결정하시고, 지금 맡은 일에 최선을 다하십시오. 인내하면 다음 해에 기회가 옵니다.' },
        { condition: true, verse: '바람 앞의 등불이니\n중심을 잘 잡아야 하리라', detail: '직장에서 어려움이 있을 수 있습니다. 인간관계에 신경 쓰시고, 구설수에 오르지 않도록 말조심하십시오. 사업자는 무리한 투자를 피하고 현금 흐름에 유의하십시오.' },
      ],
    },
    love: {
      title: gender === 'male' ? '애정운 (愛情運)' : '애정운 (愛情運)',
      icon: '💕',
      score: Math.min(95, 55 + loveBase * 8 + (total > 13 ? 10 : 0)),
      verses: [
        { condition: total >= 18, verse: '오작교에 까치가 모여들 듯\n좋은 인연이 찾아오리라', detail: gender === 'male'
          ? '이성운이 매우 좋습니다. 미혼이라면 좋은 배필을 만날 가능성이 높고, 기혼자는 가정에 화목함이 가득합니다. 상대방을 배려하면 더욱 깊은 사랑을 나눌 수 있습니다.'
          : '애정운이 매우 좋습니다. 미혼이라면 운명적인 만남이 기다리고 있고, 기혼자는 부부 금실이 좋아집니다. 예쁜 말 한마디가 사랑을 더욱 깊게 합니다.' },
        { condition: total >= 14, verse: '꽃이 피면 나비가 찾아오듯\n자연스럽게 인연이 맺어지리라', detail: gender === 'male'
          ? '좋은 만남의 기회가 있습니다. 억지로 찾지 않아도 자연스럽게 인연이 다가옵니다. 기혼자는 배우자와의 소통에 힘쓰면 관계가 더욱 돈독해집니다.'
          : '연애운이 상승세입니다. 주변에서 소개를 받거나 자연스러운 만남이 있을 수 있습니다. 기혼자는 가정에 더 많은 관심을 기울이면 행복이 배가 됩니다.' },
        { condition: total >= 10, verse: '물이 너무 급하면 흘러넘치나니\n천천히 다가가면 마음을 얻으리라', detail: gender === 'male'
          ? '연애에 급하면 오히려 멀어집니다. 천천히 신뢰를 쌓아가면 좋은 결과가 있습니다. 기혼자는 작은 다툼에 주의하시고, 대화로 풀어가십시오.'
          : '조급함을 버리면 좋은 인연이 옵니다. 외모보다 내면을 가꾸면 더 좋은 만남이 기다립니다. 기혼자는 가정 내 사소한 갈등에 지혜롭게 대처하십시오.' },
        { condition: true, verse: '달이 구름에 가려도\n밝은 빛은 결국 드러나리라', detail: gender === 'male'
          ? '애정운이 다소 부진합니다. 조급해하지 말고 자기계발에 힘쓰면 좋은 인연이 다가옵니다. 기혼자는 배우자와의 갈등을 대화로 풀어가십시오.'
          : '인연이 늦게 올 수 있으나 걱정하지 마십시오. 진정한 사랑은 때가 되면 찾아옵니다. 기혼자는 서로에 대한 이해와 양보가 필요한 때입니다.' },
      ],
    },
    benefactor: {
      title: '귀인운 (貴人運)',
      icon: '🤝',
      score: Math.min(95, 55 + ((sangGwae + jungGwae + haGwae) % 5) * 8 + (total > 14 ? 10 : 0)),
      verses: [
        { condition: total >= 18, verse: '귀한 손님이 문을 두드리니\n맞이하면 복이 따르리라', detail: '귀인운이 매우 강합니다. 어려울 때 도와주는 사람이 나타나고, 좋은 조언을 해주는 멘토를 만날 수 있습니다. 인맥을 넓히고 인연을 소중히 하십시오.' },
        { condition: total >= 14, verse: '구슬이 서말이라도 꿰어야 보배\n사람을 모으면 일이 이루어지리라', detail: '주변에서 도움을 받을 수 있습니다. 혼자 해결하려 하지 말고 주위 사람들의 조언을 구하십시오. 인간관계를 잘 유지하면 생각지 못한 도움을 받습니다.' },
        { condition: total >= 10, verse: '나무에 새가 깃들 듯\n덕을 쌓으면 귀인이 모이리라', detail: '귀인운이 약하니 스스로 해결해야 할 일이 많습니다. 남에게 베푸는 것이 먼저이니, 어려운 사람을 도우면 나중에 큰 도움으로 돌아옵니다.' },
        { condition: true, verse: '소인을 멀리하고 군자를 가까이하라\n가려 사귀면 화를 면하리라', detail: '나쁜 인연에 주의해야 합니다. 달콤한 말로 접근하는 사람을 경계하시고, 오래 알고 신뢰할 수 있는 사람의 조언을 따르십시오.' },
      ],
    },
    study: {
      title: '학업/시험운 (學業運)',
      icon: '📚',
      score: Math.min(95, 55 + studyBase * 8 + (total > 13 ? 10 : 0)),
      verses: [
        { condition: total >= 18, verse: '등불 아래 글을 읽으니\n과거에 급제할 운이로다', detail: '학업운이 매우 좋습니다. 집중력이 높아지고 이해력도 좋아져, 시험이나 자격증 취득에 좋은 결과를 기대할 수 있습니다. 새로운 것을 배우기에도 최적의 시기입니다.' },
        { condition: total >= 14, verse: '열 번 찍어 안 넘어가는 나무 없으니\n꾸준히 하면 이루리라', detail: '노력한 만큼 성과가 있습니다. 천재가 아니어도 꾸준히 공부하면 원하는 결과를 얻을 수 있습니다. 포기하지 말고 끝까지 최선을 다하십시오.' },
        { condition: total >= 10, verse: '한 우물을 파야 물을 얻으리니\n이것저것 손대지 말라', detail: '집중이 필요합니다. 여러 가지를 한꺼번에 하려다 모두 놓칠 수 있으니, 한 가지에 집중하십시오. 스터디 그룹이나 멘토의 도움을 받으면 효과적입니다.' },
        { condition: true, verse: '서두르면 넘어지나니\n차근차근 기초부터 다지라', detail: '학업에 어려움이 있을 수 있습니다. 조급해하지 말고 기본기부터 다시 점검하십시오. 무리한 계획보다 실현 가능한 목표를 세우고 차근차근 나아가십시오.' },
      ],
    },
    family: {
      title: '가족운 (家族運)',
      icon: '👨‍👩‍👧‍👦',
      score: Math.min(95, 55 + familyBase * 8 + (total > 14 ? 10 : 0)),
      verses: [
        { condition: total >= 18, verse: '집안에 웃음꽃이 피어나니\n화목함이 넘치리라', detail: '가족운이 매우 좋습니다. 가정에 기쁜 일이 생기고, 가족 간의 화목함이 깊어집니다. 가족 여행이나 모임을 계획하면 좋은 추억을 만들 수 있습니다.' },
        { condition: total >= 14, verse: '형제가 화합하면 못 이룰 일 없으니\n서로 돕고 의지하라', detail: '가족의 지지를 받을 수 있는 해입니다. 형제자매나 부모님과의 관계가 돈독해지고, 어려운 일이 있어도 가족이 함께 해결해 나갈 수 있습니다.' },
        { condition: total >= 10, verse: '작은 불씨가 큰불이 되나니\n사소한 다툼을 경계하라', detail: '가족 간에 의견 충돌이 있을 수 있습니다. 작은 오해가 큰 다툼으로 번지지 않도록 대화와 양보가 필요합니다. 어른들 건강에도 관심을 기울이십시오.' },
        { condition: true, verse: '멀리 있어도 마음은 가까우니\n연락을 소홀히 하지 말라', detail: '가족과 소원해지기 쉬운 해입니다. 바쁘더라도 가족에게 연락하고 안부를 묻는 것을 잊지 마십시오. 부모님께 효도하면 복이 돌아옵니다.' },
      ],
    },
    investment: {
      title: '투자운 (投資運)',
      icon: '📈',
      score: Math.min(95, 55 + investmentBase * 8 + (total > 15 ? 10 : 0)),
      verses: [
        { condition: total >= 18, verse: '봄에 심은 씨앗이 가을에 결실하듯\n투자하면 이익을 보리라', detail: '투자운이 좋습니다. 신중하게 검토한 투자는 좋은 수익을 가져올 수 있습니다. 다만 과욕을 부리지 말고 분산 투자를 원칙으로 하십시오.' },
        { condition: total >= 14, verse: '돌다리도 두드려 보고 건너라\n신중하면 손해 없으리라', detail: '보수적인 투자가 좋습니다. 고위험 고수익보다는 안정적인 투자처를 선택하십시오. 전문가의 조언을 참고하되 최종 결정은 본인이 하십시오.' },
        { condition: total >= 10, verse: '움켜쥐면 모래가 빠져나가듯\n욕심을 버려야 얻으리라', detail: '투자에 신중해야 합니다. 큰 수익을 노리다 손해볼 수 있으니, 원금 보전을 우선으로 하십시오. 확실하지 않은 투자는 피하십시오.' },
        { condition: true, verse: '허공에 누각을 세우지 말라\n올해는 지킴이 상책이로다', detail: '투자를 삼가는 것이 좋습니다. 새로운 투자보다 현재 자산을 지키는 데 집중하십시오. 남의 말에 휘둘려 투자하면 낭패를 볼 수 있습니다.' },
      ],
    },
    moving: {
      title: '이사/이동운 (移動運)',
      icon: '🏠',
      score: Math.min(95, 55 + movingBase * 8 + (total > 14 ? 10 : 0)),
      verses: [
        { condition: total >= 18, verse: '용이 물을 만난 격이니\n움직이면 크게 발복하리라', detail: '이사나 이동에 좋은 해입니다. 더 좋은 환경으로 옮기면 운이 상승합니다. 직장 이동이나 새로운 곳에서의 시작도 길합니다.' },
        { condition: total >= 14, verse: '물이 낮은 곳으로 흐르듯\n순리대로 움직이면 길하리라', detail: '계획된 이사나 이동은 무방합니다. 충분히 준비하고 좋은 날을 택하여 움직이십시오. 남향이나 동향 집이 좋습니다.' },
        { condition: total >= 10, verse: '뿌리 깊은 나무가 바람에 흔들리지 않으니\n머물러 기반을 다지라', detail: '이사를 서두르지 마십시오. 현재 위치에서 안정을 찾는 것이 좋습니다. 꼭 이사해야 한다면 하반기로 미루십시오.' },
        { condition: true, verse: '흐르는 물도 고여야 맑아지나니\n제자리에서 때를 기다리라', detail: '이사나 이동은 내년으로 미루십시오. 무리하게 움직이면 손해가 따릅니다. 현재 상황에서 최선을 다하며 기회를 기다리십시오.' },
      ],
    },
    travel: {
      title: '여행운 (旅行運)',
      icon: '✈️',
      score: Math.min(95, 55 + travelBase * 8 + (total > 13 ? 10 : 0)),
      verses: [
        { condition: total >= 18, verse: '천리 길도 한 걸음부터\n떠나면 좋은 인연과 복록이 따르리라', detail: '여행운이 매우 좋습니다. 국내외 여행에서 좋은 기운을 받고, 귀한 인연을 만날 수도 있습니다. 새로운 곳에서 영감을 얻고 재충전하십시오.' },
        { condition: total >= 14, verse: '산 넘어 산이로되\n경치를 즐기며 가면 힘들지 않으리라', detail: '여행에 무난한 해입니다. 가까운 곳으로의 여행이나 휴가는 좋은 휴식이 됩니다. 무리한 일정보다 여유로운 여행을 계획하십시오.' },
        { condition: total >= 10, verse: '집 떠나면 고생이라 하였으니\n꼭 필요한 여행만 가라', detail: '여행 중 불편함이 있을 수 있습니다. 먼 거리 여행보다 가까운 곳이 좋고, 건강에 유의하며 안전한 여행을 하십시오.' },
        { condition: true, verse: '편한 잠자리가 상팔자라 하였으니\n멀리 나가지 말고 쉬어라', detail: '여행보다 휴식이 필요한 해입니다. 굳이 멀리 떠나기보다 가까운 곳에서 편안히 쉬는 것이 좋습니다. 해외여행은 특히 조심하십시오.' },
      ],
    },
    legal: {
      title: '소송/계약운 (訴訟運)',
      icon: '⚖️',
      score: Math.min(95, 55 + legalBase * 8 + (total > 14 ? 10 : 0)),
      verses: [
        { condition: total >= 18, verse: '송사에 이기고 원한을 풀리니\n정의가 편에 서리라', detail: '법적 문제에 유리한 해입니다. 진행 중인 소송이 있다면 좋은 결과를 기대할 수 있습니다. 계약 체결도 순조로우니 좋은 조건을 얻을 수 있습니다.' },
        { condition: total >= 14, verse: '말 한마디에 천냥 빚을 갚으니\n합의가 상책이로다', detail: '법적 분쟁은 합의로 해결하는 것이 좋습니다. 시간과 비용을 아끼고 원만한 관계를 유지할 수 있습니다. 계약 전 조항을 꼼꼼히 확인하십시오.' },
        { condition: total >= 10, verse: '이긴다 해도 얻는 것 없으니\n소송은 피함이 상책이라', detail: '법적 분쟁은 피하는 것이 좋습니다. 승소해도 손해가 더 클 수 있으니, 합의나 조정을 먼저 시도하십시오. 새로운 계약은 신중히 하십시오.' },
        { condition: true, verse: '일을 만들지 말고 조용히 지내라\n말 한마디가 화근이 되리라', detail: '법적 문제에 휘말리기 쉬운 해입니다. 분쟁의 소지가 있는 상황을 피하고, 계약이나 보증은 하지 마십시오. 말조심 특히 중요합니다.' },
      ],
    },
  };
};

// 사계절 운세
const getSeasonalFortune = (totalGwae: number) => {
  return {
    spring: {
      name: '봄 (1~3월)',
      fortune: totalGwae >= 16 ? '새 출발에 좋은 시기. 씨앗을 뿌리면 결실을 보리라.' : totalGwae >= 12 ? '서서히 운이 트이니 인내하라.' : '아직 때가 아니니 준비에 힘쓰라.',
      score: Math.min(90, 50 + (totalGwae % 5) * 8),
    },
    summer: {
      name: '여름 (4~6월)',
      fortune: totalGwae >= 15 ? '열정을 쏟으면 크게 이루리라. 기회를 놓치지 말라.' : totalGwae >= 11 ? '무더위 속 그늘을 찾듯, 휴식도 필요하다.' : '과로를 피하고 건강 관리에 힘쓰라.',
      score: Math.min(90, 55 + (totalGwae % 4) * 8),
    },
    autumn: {
      name: '가을 (7~9월)',
      fortune: totalGwae >= 17 ? '풍성한 수확의 계절. 그동안의 노력이 빛을 보리라.' : totalGwae >= 13 ? '거둘 것을 거두되, 겸손함을 잃지 말라.' : '욕심을 버리면 마음이 편안해지리라.',
      score: Math.min(90, 60 + (totalGwae % 4) * 7),
    },
    winter: {
      name: '겨울 (10~12월)',
      fortune: totalGwae >= 16 ? '한 해를 아름답게 마무리하라. 새해의 기쁨이 기다린다.' : totalGwae >= 12 ? '내실을 다지며 다음 해를 준비하라.' : '인내하면 봄이 오리니, 희망을 잃지 말라.',
      score: Math.min(90, 50 + (totalGwae % 5) * 8),
    },
  };
};

export default function TojeongResult2026({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  result,
  name,
  gender,
  birthDate,
  onReset,
  onBack,
}: TojeongResult2026Props) {
  const { sangGwae, jungGwae, haGwae } = calculateTojeongGwae(birthDate.year, birthDate.month, birthDate.day);
  const totalGwae = sangGwae + jungGwae + haGwae;
  const yearlyFortune = getYearlyFortune(sangGwae, jungGwae, haGwae);
  const categoryFortunes = getCategoryFortunes(sangGwae, jungGwae, haGwae, gender);
  const seasonalFortune = getSeasonalFortune(totalGwae);

  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  // 분야별 운세에서 해당하는 verse 가져오기
  const getMatchingVerse = (category: typeof categoryFortunes.wealth) => {
    return category.verses.find(v => v.condition)!;
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

  const getLuckColor = (luck: number) => {
    if (luck >= 80) return 'text-yellow-400';
    if (luck >= 70) return 'text-emerald-400';
    if (luck >= 60) return 'text-blue-400';
    return 'text-slate-400';
  };

  const getLuckBg = (luck: number) => {
    if (luck >= 80) return 'bg-yellow-500/20';
    if (luck >= 70) return 'bg-emerald-500/20';
    if (luck >= 60) return 'bg-blue-500/20';
    return 'bg-slate-500/20';
  };

  return (
    <motion.div
      className="min-h-screen py-8 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-4xl mx-auto">
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
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg mb-4">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            2026 토정비결
          </h1>
          <p className="text-emerald-400">병오년(丙午年) {name}님의 한 해 운세</p>
        </motion.div>

        {/* 괘 정보 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-emerald-400" />
            나의 토정비결 괘(卦)
          </h2>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-slate-800/50 rounded-xl">
              <div className="text-emerald-400 text-sm mb-1">상괘 (태세)</div>
              <div className="text-2xl font-bold text-white">{gwaeInterpretations[sangGwae]?.name}</div>
              <div className="text-xs text-slate-400 mt-1">{sangGwae}수</div>
            </div>
            <div className="text-center p-4 bg-slate-800/50 rounded-xl">
              <div className="text-emerald-400 text-sm mb-1">중괘 (월건)</div>
              <div className="text-2xl font-bold text-white">{gwaeInterpretations[jungGwae]?.name}</div>
              <div className="text-xs text-slate-400 mt-1">{jungGwae}수</div>
            </div>
            <div className="text-center p-4 bg-slate-800/50 rounded-xl">
              <div className="text-emerald-400 text-sm mb-1">하괘 (일진)</div>
              <div className="text-2xl font-bold text-white">{gwaeInterpretations[haGwae]?.name}</div>
              <div className="text-xs text-slate-400 mt-1">{haGwae}수</div>
            </div>
          </div>

          <div className="text-center text-slate-300 text-sm">
            <p>{gwaeInterpretations[sangGwae]?.meaning}</p>
          </div>
        </motion.div>

        {/* 연간 종합운 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-6 mb-6 overflow-hidden relative">
          <div className={`absolute inset-0 bg-gradient-to-br ${yearlyFortune.color} opacity-10`} />
          <div className="relative z-10">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Sun className="w-5 h-5 text-yellow-400" />
              2026년 종합운세
            </h2>

            <div className="text-center mb-4">
              <span className={`text-3xl font-bold bg-gradient-to-r ${yearlyFortune.color} bg-clip-text text-transparent`}>
                {yearlyFortune.title}
              </span>
            </div>

            <p className="text-slate-300 leading-relaxed text-center" style={{ fontFamily: "'Noto Serif KR', serif" }}>
              {yearlyFortune.description}
            </p>
          </div>
        </motion.div>

        {/* 분야별 운세 */}
        <motion.div variants={itemVariants} className="mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-purple-400" />
            분야별 상세 운세
          </h2>

          <div className="space-y-4">
            {Object.entries(categoryFortunes).map(([key, category]) => {
              const matchedVerse = getMatchingVerse(category);
              return (
                <motion.div
                  key={key}
                  variants={itemVariants}
                  className="glass rounded-2xl p-5"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-bold flex items-center gap-2">
                      <span className="text-2xl">{category.icon}</span>
                      {category.title}
                    </h3>
                    <div className={`px-3 py-1 rounded-full text-sm font-bold ${getLuckBg(category.score)} ${getLuckColor(category.score)}`}>
                      {category.score}점
                    </div>
                  </div>

                  <div className="bg-slate-800/50 rounded-xl p-4 mb-4">
                    <p className="text-emerald-300 text-sm whitespace-pre-line leading-relaxed text-center" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                      {matchedVerse.verse}
                    </p>
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed">
                    {matchedVerse.detail}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* 사계절 운세 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-cyan-400" />
            사계절 운세 흐름
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(seasonalFortune).map(([key, season]) => (
              <div key={key} className="text-center p-4 bg-slate-800/50 rounded-xl">
                <div className="text-2xl mb-2">
                  {key === 'spring' ? '🌸' : key === 'summer' ? '☀️' : key === 'autumn' ? '🍂' : '❄️'}
                </div>
                <div className="text-emerald-400 text-sm font-medium mb-1">{season.name}</div>
                <div className={`text-lg font-bold mb-2 ${getLuckColor(season.score)}`}>{season.score}점</div>
                <p className="text-slate-400 text-xs leading-relaxed">{season.fortune}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 월별 운세 */}
        <motion.div variants={itemVariants} className="mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-400" />
            월별 토정비결
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {months.map((month) => {
              const verse = getMonthlyVerse(month, totalGwae + month);
              return (
                <motion.div
                  key={month}
                  variants={itemVariants}
                  className="glass rounded-2xl p-5"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-emerald-400 font-bold">{month}월</span>
                      <h3 className="text-white font-medium">{verse.title}</h3>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-bold ${getLuckBg(verse.luck)} ${getLuckColor(verse.luck)}`}>
                      {verse.luck}점
                    </div>
                  </div>

                  <div className="bg-slate-800/50 rounded-xl p-3 mb-3">
                    <p className="text-slate-300 text-sm whitespace-pre-line leading-relaxed" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                      {verse.verse}
                    </p>
                  </div>

                  <p className="text-slate-400 text-sm">
                    {verse.interpretation}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* 2026년 괘별 특별 길일 */}
        <motion.div variants={itemVariants} className="glass-strong rounded-3xl p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-400" />
            2026년 괘(卦)에 따른 특별한 날
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {/* 대길일 */}
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
              <h3 className="text-emerald-400 font-bold mb-3">🌟 대길일 (중요한 일에 좋은 날)</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">결혼/약혼</span>
                  <span className="text-emerald-300">3월 15일, 5월 18일, 10월 11일</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">이사/입주</span>
                  <span className="text-emerald-300">4월 12일, 6월 8일, 9월 20일</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">개업/계약</span>
                  <span className="text-emerald-300">3월 8일, 5월 5일, 11월 11일</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">시험/면접</span>
                  <span className="text-emerald-300">2월 15일, 6월 18일, 9월 12일</span>
                </div>
              </div>
            </div>

            {/* 주의일 */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
              <h3 className="text-red-400 font-bold mb-3">⚠️ 주의가 필요한 날</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">손 없는 날</span>
                  <span className="text-red-300">매월 9, 10, 19, 20, 29, 30일</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">삼재일</span>
                  <span className="text-red-300">1월 7일, 4월 15일, 7월 23일</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">천충일</span>
                  <span className="text-red-300">2월 13일, 5월 21일, 8월 29일</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">파일</span>
                  <span className="text-red-300">3월 3일, 6월 11일, 9월 19일</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-slate-800/50 rounded-lg">
            <p className="text-slate-400 text-xs text-center">
              ※ 위 날짜는 {name}님의 괘(상괘 {gwaeInterpretations[sangGwae]?.name}, 중괘 {gwaeInterpretations[jungGwae]?.name}, 하괘 {gwaeInterpretations[haGwae]?.name})를
              기반으로 한 일반적 참고 날짜입니다.
            </p>
          </div>
        </motion.div>

        {/* 토정 선생의 가르침 */}
        <motion.div variants={itemVariants} className="glass rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            토정 이지함 선생의 가르침
          </h2>

          <div className="space-y-4">
            <div className="bg-slate-800/50 rounded-xl p-4">
              <p className="text-emerald-300 text-center mb-2" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                &ldquo;운명은 정해진 것이 아니라 스스로 만들어가는 것이니,<br />
                좋은 운에 안주하지 말고, 나쁜 운에 좌절하지 말라.&rdquo;
              </p>
              <p className="text-slate-400 text-sm text-center">- 토정비결 서문 中</p>
            </div>

            <div className="grid md:grid-cols-3 gap-3">
              <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                <span className="text-2xl mb-2 block">🙏</span>
                <p className="text-slate-300 text-sm">덕을 쌓으면<br />복이 따른다</p>
              </div>
              <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                <span className="text-2xl mb-2 block">⚖️</span>
                <p className="text-slate-300 text-sm">중용을 지키면<br />화를 면한다</p>
              </div>
              <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                <span className="text-2xl mb-2 block">🌱</span>
                <p className="text-slate-300 text-sm">인내하면<br />때가 온다</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 주의사항 */}
        <motion.div variants={itemVariants} className="glass rounded-2xl p-4 mb-6">
          <p className="text-slate-400 text-xs text-center">
            ※ 토정비결은 조선시대 토정 이지함 선생의 점술서를 현대적으로 재해석한 것입니다.
            재미로 참고하시고, 인생의 중요한 결정은 신중하게 내리시기 바랍니다.
          </p>
        </motion.div>

        {/* 버튼 */}
        <motion.div variants={itemVariants} className="flex gap-4">
          <button
            onClick={onBack}
            className="flex-1 py-4 bg-slate-700/50 rounded-2xl text-slate-300 font-medium hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            메뉴로
          </button>
          <button
            onClick={onReset}
            className="flex-1 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl text-white font-bold hover:from-emerald-600 hover:to-teal-600 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            다시 보기
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
