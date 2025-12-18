'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import {
  Calendar, Star, Heart, Wallet,
  Briefcase, Activity, Sparkles, ArrowLeft,
  Sun, Compass, Gem, Users, GraduationCap,
  Home, Crown, Mail, TrendingUp, Truck,
  Plane, Scale
} from 'lucide-react';
import MonthlyForecast2026 from './premium/MonthlyForecast2026';
import EmailModal from './ui/EmailModal';

interface NewYearResult2026Props {
  result: SajuResult;
  name: string;
  gender: 'male' | 'female';
  birthDate: { year: number; month: number; day: number };
  onReset: () => void;
  onBack: () => void;
}

export default function NewYearResult2026({
  result,
  name,
  gender,
  birthDate,
  onReset,
  onBack
}: NewYearResult2026Props) {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const dayElement = result.day.stem.element;

  // 일간과 병오년(화화)의 관계 분석
  const getYearRelation = () => {
    const relations: Record<string, {
      relation: string;
      fortune: 'excellent' | 'good' | 'normal' | 'caution' | 'challenging';
      summary: string;
      detail: string;
    }> = {
      목: {
        relation: '목생화(木生火)',
        fortune: 'good',
        summary: '나의 에너지가 2026년을 밝히는 해',
        detail: `${name}님의 일간 목(木)은 2026년 병오년의 강한 화(火) 기운을 생(生)하는 관계입니다. 이는 마치 나무가 불을 피워 세상을 밝히는 것과 같습니다. 당신의 노력과 재능이 빛을 발하고 주변에 인정받는 한 해가 될 것입니다. 다만, 지나치게 화기를 생하다 보면 본인의 기력이 소진될 수 있으니, 충분한 휴식과 자기 관리가 필요합니다.`
      },
      화: {
        relation: '비겁운(比劫運)',
        fortune: 'excellent',
        summary: '같은 기운이 만나 열정이 폭발하는 해',
        detail: `${name}님의 일간 화(火)가 2026년 병오년의 화(火)를 만나니, 비겁(比劫)의 해입니다. 같은 기운이 만나 시너지가 폭발하고, 자신감과 추진력이 최고조에 달합니다. 사업 확장, 새로운 도전, 리더십 발휘에 최적의 시기입니다. 다만 과열과 충동적 결정을 주의하고, 화기를 다스릴 수(水)의 지혜가 필요합니다.`
      },
      토: {
        relation: '화생토(火生土)',
        fortune: 'excellent',
        summary: '풍요와 안정의 기운을 받는 해',
        detail: `${name}님의 일간 토(土)는 2026년 병오년의 화(火)로부터 생(生)을 받습니다. 화생토(火生土)의 원리로, 마치 뜨거운 태양 아래 대지가 비옥해지듯 모든 면에서 성장과 결실의 기운을 받습니다. 특히 재물운, 건강운, 인간관계 모두 상승하며, 새로운 시작보다는 기존의 것을 키우고 확장하는 데 유리한 해입니다.`
      },
      금: {
        relation: '화극금(火克金)',
        fortune: 'challenging',
        summary: '시련 속에서 단련되는 해',
        detail: `${name}님의 일간 금(金)은 2026년 병오년의 강한 화(火)의 극(克)을 받습니다. 이는 불이 쇠를 녹이는 것과 같아 힘든 상황이 예상됩니다. 하지만 대장장이가 쇠를 불에 달구어 명검을 만들듯, 이 시련을 통해 더욱 강해지고 정제될 수 있습니다. 무리한 확장보다 내실을 다지고, 수(水)의 기운으로 화를 제어하는 지혜가 필요합니다.`
      },
      수: {
        relation: '수극화(水克火)',
        fortune: 'good',
        summary: '내가 운을 제어하고 다스리는 해',
        detail: `${name}님의 일간 수(水)는 2026년 병오년의 화(火)를 극(克)하는 관계입니다. 물이 불을 끄듯, 당신이 2026년의 기운을 통제하고 조절할 수 있는 위치에 있습니다. 리더십을 발휘하고 중요한 결정을 내리기 좋은 해입니다. 다만 과도한 화기와의 충돌로 갈등이나 충돌 상황이 발생할 수 있으니, 유연함과 협력의 자세도 필요합니다.`
      }
    };
    return relations[dayElement] || relations['토'];
  };

  const yearRelation = getYearRelation();

  // 총운 점수 계산
  const calculateOverallScore = () => {
    let score = 60;
    if (result.yongsin.includes('화')) score += 25;
    if (result.elementBalance.deficiency.includes('화')) score += 15;
    if (result.elementBalance.excess.includes('화')) score -= 10;
    if (dayElement === '토') score += 15;
    if (dayElement === '화') score += 10;
    if (dayElement === '목') score += 5;
    if (dayElement === '금') score -= 15;
    return Math.min(Math.max(score, 30), 100);
  };

  const overallScore = calculateOverallScore();

  // 모든 운세 카테고리 점수 계산
  const getFortuneCategories = () => {
    const base = overallScore;

    const wealth = Math.min(Math.max(
      dayElement === '토' ? base + 15 :
      dayElement === '화' ? base + 10 :
      dayElement === '금' ? base - 10 : base
    , 30), 100);

    const love = Math.min(Math.max(
      dayElement === '화' ? base + 20 :
      dayElement === '목' ? base + 10 :
      dayElement === '수' ? base + 5 : base
    , 30), 100);

    const health = Math.min(Math.max(
      dayElement === '토' ? base + 10 :
      dayElement === '금' ? base - 15 :
      dayElement === '화' ? base - 5 : base
    , 30), 100);

    const career = Math.min(Math.max(
      dayElement === '화' ? base + 15 :
      dayElement === '토' ? base + 10 :
      dayElement === '수' ? base + 5 :
      dayElement === '금' ? base - 10 : base
    , 30), 100);

    const marriage = Math.min(Math.max(
      dayElement === '화' ? base + 15 :
      dayElement === '토' ? base + 12 :
      dayElement === '목' ? base + 8 :
      dayElement === '금' ? base - 5 : base
    , 30), 100);

    const study = Math.min(Math.max(
      dayElement === '수' ? base + 15 :
      dayElement === '목' ? base + 12 :
      dayElement === '토' ? base + 5 :
      dayElement === '화' ? base - 5 : base
    , 30), 100);

    const family = Math.min(Math.max(
      dayElement === '토' ? base + 18 :
      dayElement === '화' ? base + 8 :
      dayElement === '금' ? base - 8 : base
    , 30), 100);

    const social = Math.min(Math.max(
      dayElement === '화' ? base + 20 :
      dayElement === '목' ? base + 15 :
      dayElement === '수' ? base - 5 : base
    , 30), 100);

    // 새로운 카테고리 추가
    const investment = Math.min(Math.max(
      dayElement === '토' ? base + 12 :
      dayElement === '금' ? base - 15 :
      dayElement === '화' ? base + 8 :
      dayElement === '수' ? base + 5 : base
    , 30), 100);

    const moving = Math.min(Math.max(
      dayElement === '목' ? base + 15 :
      dayElement === '화' ? base + 10 :
      dayElement === '금' ? base - 12 :
      dayElement === '토' ? base - 5 : base
    , 30), 100);

    const travel = Math.min(Math.max(
      dayElement === '화' ? base + 18 :
      dayElement === '목' ? base + 12 :
      dayElement === '수' ? base + 8 :
      dayElement === '금' ? base - 10 : base
    , 30), 100);

    const legal = Math.min(Math.max(
      dayElement === '금' ? base + 10 :
      dayElement === '수' ? base + 15 :
      dayElement === '화' ? base - 10 :
      dayElement === '목' ? base - 5 : base
    , 30), 100);

    return { wealth, love, health, career, marriage, study, family, social, investment, moving, travel, legal };
  };

  const fortuneCategories = getFortuneCategories();

  // ===== 재물운 =====
  const getWealthFortune = () => {
    const score = fortuneCategories.wealth;
    if (score >= 80) {
      return {
        grade: '대길',
        summary: '재물 운이 크게 상승하는 해입니다.',
        detail: `2026년은 ${name}님에게 재물운이 활짝 열리는 시기입니다. 병오년의 화기는 활발한 경제활동과 사업 확장을 상징하므로, 적극적인 재테크와 새로운 수익원 개발을 고려해보세요. 특히 상반기에 예상치 못한 수입이나 투자 기회가 찾아올 수 있습니다. 부동산, 주식, 사업 투자 모두 긍정적으로 검토해볼 만합니다. 다만 충동적인 큰 지출이나 무리한 투기는 피하고, 꾸준히 저축하는 습관을 유지하는 것이 장기적 부를 쌓는 열쇠입니다. 금전 거래는 투명하게 하고, 빌려준 돈은 제때 회수하세요.`,
        advice: '투자와 사업 확장에 적극적으로 나서되, 자금의 30% 이상은 안전자산으로 유지하세요. 주식보다는 실물 자산에 주목하세요.',
        luckyMonths: '3월, 5월, 9월',
        unluckyMonths: '4월, 8월'
      };
    } else if (score >= 60) {
      return {
        grade: '평길',
        summary: '안정적인 재물 흐름이 예상됩니다.',
        detail: `2026년 ${name}님의 재물운은 큰 파동 없이 안정적으로 흘러갈 것으로 보입니다. 급격한 재산 증가보다는 꾸준한 수입과 지출의 균형을 유지하는 것이 중요합니다. 병오년의 화기가 강하므로 충동구매나 감정적 소비를 특히 주의해야 합니다. 본업에 충실하면서 부수입 기회를 천천히 모색하는 것이 바람직합니다. 대출이나 보증은 신중히 하고, 계약서는 꼼꼼히 확인하세요. 예기치 않은 지출에 대비해 비상금을 확보해두면 마음이 편안할 것입니다.`,
        advice: '무리한 투자보다 저축과 내실 다지기에 집중하세요. 하반기 10월 이후에 좋은 기회가 올 수 있으니 그때를 위해 자금을 준비해두세요.',
        luckyMonths: '6월, 10월, 12월',
        unluckyMonths: '2월, 7월'
      };
    } else {
      return {
        grade: '소흉',
        summary: '재물 관리에 신중함이 필요한 해입니다.',
        detail: `2026년은 ${name}님에게 재물 면에서 조심해야 할 해입니다. 병오년의 강한 화기가 금전적 손실이나 예상치 못한 지출을 암시합니다. 투자나 사업 확장보다는 현재 가진 것을 지키는 데 집중하세요. 보증이나 대출은 가급적 피하고, 비상금을 넉넉히 확보해두는 것이 좋습니다. 지인에게 돈을 빌려주는 것도 삼가세요. 도박이나 투기성 투자는 절대 금물입니다. 하지만 하반기로 갈수록 점차 안정되니 너무 걱정하지 마시고, 지출을 줄이고 절약하는 습관을 들이면 오히려 재정 상태가 건실해지는 계기가 될 수 있습니다.`,
        advice: '대출, 보증, 고위험 투자는 절대 피하세요. 월 소득의 20% 이상을 저축하고, 불필요한 지출을 과감히 줄이세요.',
        luckyMonths: '11월, 12월',
        unluckyMonths: '3월, 5월, 8월'
      };
    }
  };

  // ===== 연애운 =====
  const getLoveFortune = () => {
    const score = fortuneCategories.love;

    if (score >= 80) {
      return {
        grade: '대길',
        summary: '로맨스가 활짝 피어나는 해입니다.',
        detail: `2026년 병오년은 ${name}님에게 열정적인 사랑의 기운이 넘치는 해입니다. 병화(丙火)는 태양처럼 밝고 따뜻한 에너지로, 당신의 매력이 최고조로 상승하고 이성의 관심을 받기 쉬운 시기입니다. 싱글이라면 운명적인 만남이 기대되며, 특히 직장, 동호회, 친구의 소개로 좋은 인연을 만날 가능성이 높습니다. 커플이라면 관계가 한층 깊어지고 결혼까지 발전하는 계기가 있을 것입니다. 적극적으로 마음을 표현하면 좋은 결과를 얻을 수 있습니다. 단, 화기가 강해 다툼이나 감정 기복도 있을 수 있으니 상대방의 마음을 헤아리는 여유를 가지세요.`,
        advice: '적극적으로 사람들을 만나세요. 3월, 5월에 운명적인 인연이 있습니다. 소개팅, 미팅에 적극 참여하세요.',
        luckyMonths: '3월, 5월, 7월',
        unluckyMonths: '8월'
      };
    } else if (score >= 60) {
      return {
        grade: '평길',
        summary: '차분하고 안정적인 연애운입니다.',
        detail: `2026년 ${name}님의 연애운은 드라마틱한 변화보다는 잔잔한 흐름이 예상됩니다. 싱글이라면 급하게 인연을 찾기보다 자기 계발에 투자하면서 자연스러운 만남을 기다리는 것이 좋습니다. 운동, 취미 활동, 자기 계발 모임에서 좋은 인연을 만날 수 있습니다. 커플이라면 큰 변화 없이 현재의 관계를 유지하게 되며, 이 시기를 통해 서로를 더 깊이 이해하는 기회로 삼을 수 있습니다. 서로의 장단점을 알아가고 신뢰를 쌓는 시간이 될 것입니다. 하반기에 좋은 기회가 찾아올 수 있으니 조급해하지 마세요.`,
        advice: '외모와 내면 모두 가꾸세요. 자신을 사랑하면 자연스럽게 좋은 인연이 따라옵니다. 9월, 11월에 기회가 있습니다.',
        luckyMonths: '9월, 11월',
        unluckyMonths: '4월, 7월'
      };
    } else {
      return {
        grade: '소흉',
        summary: '감정 관리에 주의가 필요한 해입니다.',
        detail: `2026년은 ${name}님에게 연애 면에서 감정의 기복이 클 수 있는 해입니다. 병오년의 강한 화기가 열정적이지만 동시에 충돌과 갈등도 유발할 수 있습니다. 싱글이라면 외로움에 급하게 인연을 맺기보다 신중하게 상대를 선택하세요. 첫인상에 끌리더라도 시간을 두고 상대방을 파악하는 것이 좋습니다. 커플이라면 작은 오해가 큰 다툼으로 번지지 않도록 대화와 배려가 중요합니다. 감정에 휩쓸리지 말고 한 발 물러서서 상황을 바라보는 지혜가 필요합니다. 이별의 위기가 올 수 있으나, 진심 어린 대화로 극복할 수 있습니다.`,
        advice: '급한 결정은 피하고, 감정적일 때는 하루 이상 생각한 후 행동하세요. 상대방 탓보다 내 감정을 먼저 돌아보세요.',
        luckyMonths: '10월, 12월',
        unluckyMonths: '3월, 5월, 8월'
      };
    }
  };

  // ===== 결혼운 =====
  const getMarriageFortune = () => {
    const score = fortuneCategories.marriage;

    if (score >= 80) {
      return {
        grade: '대길',
        summary: '결혼의 기운이 무르익는 해입니다.',
        detail: `2026년은 ${name}님에게 결혼의 기회가 열리는 길한 해입니다. 병오년의 따뜻한 화기는 인연의 성숙과 가정의 형성을 상징합니다. 미혼이라면 결혼으로 이어질 수 있는 진지한 만남이 기대됩니다. 특히 ${gender === 'male' ? '여성에게 먼저 다가가는' : '남성의 적극적인 구애를 받는'} 상황이 올 수 있습니다. 연인이 있다면 프러포즈나 상견례 등 결혼을 향한 구체적인 진전이 있을 것입니다. 이미 약혼 중이라면 결혼식을 올리기에 좋은 해입니다. 가을(9-10월)이 결혼하기 가장 좋은 시기입니다. 결혼 후에도 화목한 가정을 이룰 수 있는 기운이 강합니다.`,
        advice: '적극적으로 결혼을 추진하세요. 중매나 소개에 열린 마음을 가지세요. 5월, 9월, 10월이 결혼 관련 중요한 달입니다.',
        luckyMonths: '5월, 9월, 10월',
        unluckyMonths: '2월, 7월'
      };
    } else if (score >= 60) {
      return {
        grade: '평길',
        summary: '결혼 준비를 차근차근 하기 좋은 해입니다.',
        detail: `2026년 ${name}님의 결혼운은 급진적인 진행보다 안정적인 준비가 어울리는 해입니다. 미혼이라면 결혼을 서두르기보다 진정한 배우자를 찾는 데 시간을 투자하세요. 조건보다 인성과 가치관이 맞는 사람을 찾는 것이 중요합니다. 연인이 있다면 서로를 더 알아가는 시간이 필요하며, 상대 가족과의 관계를 돈독히 하는 것이 좋습니다. 급하게 결혼을 결정하기보다 1-2년 정도 더 교제하며 서로를 확인하는 것을 권합니다. 결혼 자금을 모으거나 신혼집을 알아보는 등 실질적인 준비에 집중하세요.`,
        advice: '조급해하지 말고 천천히 준비하세요. 상대방과 충분한 대화를 나누고, 서로의 생활 습관을 파악하세요.',
        luckyMonths: '6월, 11월, 12월',
        unluckyMonths: '3월, 8월'
      };
    } else {
      return {
        grade: '소흉',
        summary: '결혼은 신중하게, 조급함은 금물입니다.',
        detail: `2026년은 ${name}님에게 결혼 면에서 신중함이 요구되는 해입니다. 병오년의 강한 화기가 결혼에 대한 조급함이나 주변의 압박을 유발할 수 있습니다. 하지만 이럴 때일수록 차분하게 상황을 판단해야 합니다. 미혼이라면 단순히 나이 때문에, 주변 눈치 때문에 결혼을 서두르지 마세요. 잘못된 선택은 평생의 후회가 됩니다. 연인이 있다면 서로 간의 갈등이나 가족 간의 반대가 있을 수 있습니다. 충분한 대화와 시간을 갖고 신중하게 결정하세요. 올해보다 내년이나 내후년에 결혼하는 것이 더 좋은 결과를 가져올 수 있습니다.`,
        advice: '결혼을 1-2년 미루는 것도 방법입니다. 상대방과의 문제를 먼저 해결하고, 확신이 설 때 진행하세요.',
        luckyMonths: '11월, 12월',
        unluckyMonths: '3월, 5월, 7월, 8월'
      };
    }
  };

  // ===== 건강운 =====
  const getHealthFortune = () => {
    const score = fortuneCategories.health;

    if (score >= 80) {
      return {
        grade: '양호',
        summary: '건강하고 활력 넘치는 한 해입니다.',
        detail: `2026년 ${name}님은 전반적으로 건강하고 활기찬 한 해를 보내실 수 있습니다. 병오년의 화기가 생명력과 활력을 상징하여, 체력이 좋아지고 면역력도 강해지는 시기입니다. 새로운 운동을 시작하거나 건강 습관을 만들기에 최적의 해입니다. 요가, 필라테스, 수영, 러닝 등 꾸준히 할 수 있는 운동을 시작해보세요. 다만 화기가 강하므로 열성 질환, 염증, 화상 등은 주의하시고, 충분한 수분 섭취와 휴식을 잊지 마세요. 여름철(6-8월)에는 더위를 피하고 시원하게 지내세요.`,
        advice: '규칙적인 운동과 하루 2리터 이상의 수분 섭취를 유지하세요. 새벽 운동보다 저녁 운동이 좋습니다.',
        caution: '열성 질환, 피부 트러블, 눈 건강, 두통',
        goodMonths: '3월, 9월, 11월',
        badMonths: '7월, 8월'
      };
    } else if (score >= 60) {
      return {
        grade: '보통',
        summary: '컨디션 관리에 신경 쓰면 무난합니다.',
        detail: `2026년 ${name}님의 건강운은 큰 문제는 없으나, 컨디션 기복이 있을 수 있는 해입니다. 병오년의 화기가 에너지 소모를 유발할 수 있어, 무리하게 일하거나 수면이 부족하면 쉽게 지칠 수 있습니다. 특히 상반기에 과로를 피하고, 꾸준한 운동과 균형 잡힌 식사로 체력을 유지하는 것이 중요합니다. 음주와 야식은 줄이고, 규칙적인 생활 패턴을 유지하세요. 정기적인 건강 검진으로 몸 상태를 체크하시기 바랍니다. 가벼운 스트레칭이나 산책으로 몸을 풀어주는 것이 좋습니다.`,
        advice: '무리하지 말고, 7-8시간 충분한 수면을 확보하세요. 상반기에 종합 건강검진을 받아두세요.',
        caution: '과로, 수면 부족, 소화기 질환, 스트레스성 질환',
        goodMonths: '4월, 10월, 12월',
        badMonths: '2월, 6월, 8월'
      };
    } else {
      return {
        grade: '주의',
        summary: '건강 관리에 각별한 주의가 필요합니다.',
        detail: `2026년은 ${name}님에게 건강 면에서 주의가 필요한 해입니다. 병오년의 강한 화기가 몸의 균형을 깨뜨릴 수 있어, 특히 심장, 혈압, 눈, 피부 관련 건강에 신경 써야 합니다. 스트레스 관리가 매우 중요하며, 과음, 과식, 수면 부족은 절대 피해야 합니다. 여름철에는 더위로 인한 탈진, 일사병에 특히 조심하세요. 상반기에 미리 건강 검진을 받아두시고, 작은 증상도 무시하지 말고 조기에 치료하세요. 수(水)의 기운을 보충하면 도움이 됩니다. 수영, 반신욕, 물을 자주 마시는 것이 좋습니다.`,
        advice: '정기 검진 필수, 스트레스 관리, 충분한 수면, 수영이나 물과 관련된 활동을 권장합니다. 담배와 술은 반드시 줄이세요.',
        caution: '심혈관, 혈압, 눈 건강, 피부 질환, 화상, 교통사고',
        goodMonths: '11월, 12월',
        badMonths: '5월, 7월, 8월'
      };
    }
  };

  // ===== 직업운 =====
  const getCareerFortune = () => {
    const score = fortuneCategories.career;

    if (score >= 80) {
      return {
        grade: '대길',
        summary: '승진과 성취의 기회가 열리는 해입니다.',
        detail: `2026년은 ${name}님에게 직업적으로 도약의 기회가 찾아오는 해입니다. 병오년의 화기는 열정, 리더십, 창의성을 상징하여, 당신의 능력이 빛을 발하고 인정받는 시기입니다. 승진, 이직, 새로운 프로젝트 등에서 좋은 결과를 기대할 수 있습니다. 특히 사람들 앞에 나서는 일, 발표, 영업, 마케팅 분야에서 두각을 나타낼 수 있습니다. 창업이나 사업 확장을 고려 중이라면 올해가 적기입니다. 상반기에 중요한 기회가 오니 놓치지 마세요. 자신감을 가지고 적극적으로 기회를 잡으세요. 동료들과의 협력도 좋은 결과를 가져옵니다.`,
        advice: '적극적으로 자신을 어필하세요. 상반기(3-5월)에 중요한 결정을 하면 좋습니다. 새로운 프로젝트에 적극 참여하세요.',
        luckyMonths: '3월, 5월, 9월',
        unluckyMonths: '7월, 8월'
      };
    } else if (score >= 60) {
      return {
        grade: '평길',
        summary: '꾸준한 노력이 결실을 맺는 해입니다.',
        detail: `2026년 ${name}님의 직업운은 극적인 변화보다는 꾸준한 성장이 예상됩니다. 병오년의 화기가 새로운 도전보다는 기존 업무의 완성도를 높이는 데 유리하게 작용합니다. 급격한 변화나 이직보다는 현재 위치에서 실력을 쌓고 내실을 다지는 것이 좋습니다. 자격증 취득, 업무 스킬 향상 등 자기 계발에 투자하세요. 직장 내 인간관계에 신경 쓰고, 상사나 동료와의 협력을 통해 성과를 내는 한 해가 될 것입니다. 묵묵히 노력하다 보면 하반기에 인정받는 기회가 올 것입니다.`,
        advice: '본업에 충실하고, 자기 계발에 투자하세요. 이직은 하반기 10월 이후에 검토하세요.',
        luckyMonths: '6월, 10월, 12월',
        unluckyMonths: '2월, 4월'
      };
    } else {
      return {
        grade: '소흉',
        summary: '직장 내 갈등에 주의가 필요한 해입니다.',
        detail: `2026년은 ${name}님에게 직업 면에서 도전적인 상황이 예상되는 해입니다. 병오년의 강한 화기가 직장 내 갈등, 경쟁, 스트레스를 유발할 수 있습니다. 상사나 동료와의 마찰을 피하고, 말과 행동을 신중히 하세요. 특히 감정적인 대응은 상황을 악화시킬 수 있으니 참을성을 가지세요. 급격한 이직이나 사업 시작보다는 현재 상황을 안정적으로 유지하는 데 집중하세요. 불합리한 상황이 있더라도 올해는 참고 때를 기다리세요. 하반기로 갈수록 점차 나아지니, 인내심을 가지고 때를 기다리는 것이 현명합니다.`,
        advice: '충동적인 이직이나 사업 시작은 피하세요. 현 위치에서 버티며 실력을 쌓으세요. 퇴사 결정은 11월 이후로 미루세요.',
        luckyMonths: '11월, 12월',
        unluckyMonths: '3월, 5월, 7월, 8월'
      };
    }
  };

  // ===== 학업운 =====
  const getStudyFortune = () => {
    const score = fortuneCategories.study;

    if (score >= 80) {
      return {
        grade: '대길',
        summary: '학업과 시험에 좋은 기운이 있는 해입니다.',
        detail: `2026년은 ${name}님에게 학업적으로 큰 성취가 기대되는 해입니다. 집중력과 이해력이 높아지고, 공부한 만큼 결과로 돌아오는 시기입니다. 각종 시험, 자격증, 승진 시험 등에서 좋은 결과를 기대할 수 있습니다. 특히 암기나 분석이 필요한 분야에서 능력을 발휘할 수 있습니다. 새로운 것을 배우거나 학위 취득을 고려하고 있다면 올해가 적기입니다. 상반기에 시험을 치르면 더 좋은 결과를 얻을 수 있습니다. 다만 과도한 스트레스나 수면 부족은 오히려 효율을 떨어뜨리니 적절한 휴식도 중요합니다.`,
        advice: '꾸준히 공부하면 반드시 좋은 결과가 있습니다. 3월, 5월, 9월에 시험을 치르면 유리합니다. 스터디 그룹 활동도 도움이 됩니다.',
        luckyMonths: '3월, 5월, 9월',
        unluckyMonths: '7월, 8월'
      };
    } else if (score >= 60) {
      return {
        grade: '평길',
        summary: '노력한 만큼 성과가 나는 해입니다.',
        detail: `2026년 ${name}님의 학업운은 특별히 좋거나 나쁘지 않은 평이한 흐름입니다. 타고난 운보다는 본인의 노력이 결과를 좌우합니다. 꾸준히 공부하면 원하는 결과를 얻을 수 있으나, 방심하면 기대에 못 미칠 수 있습니다. 시험이나 자격증 준비 시 체계적인 계획을 세우고 실천하는 것이 중요합니다. 하반기보다는 상반기에 집중해서 공부하는 것이 효율적입니다. 공부할 때는 조용하고 시원한 환경에서 하면 집중력이 높아집니다. 혼자 공부하기 어려우면 스터디 그룹이나 학원의 도움을 받으세요.`,
        advice: '계획적으로 공부하고, 규칙적인 학습 습관을 들이세요. 6월, 10월이 시험에 유리한 달입니다.',
        luckyMonths: '6월, 10월, 11월',
        unluckyMonths: '4월, 8월'
      };
    } else {
      return {
        grade: '소흉',
        summary: '학업에 어려움이 있을 수 있는 해입니다.',
        detail: `2026년은 ${name}님에게 학업 면에서 다소 어려운 해가 될 수 있습니다. 병오년의 화기가 집중력을 흩뜨리고 조급함을 유발할 수 있습니다. 시험에서 실수를 하거나, 예상보다 결과가 좋지 않을 수 있습니다. 중요한 시험이 있다면 평소보다 더 철저하게 준비해야 합니다. 벼락치기보다 꾸준히 공부하는 것이 중요하고, 긴장과 불안을 다스리는 연습도 필요합니다. 가능하다면 중요한 시험은 하반기 11-12월로 미루는 것이 좋습니다. 포기하지 말고 꾸준히 노력하면 내년에 좋은 결과가 있을 것입니다.`,
        advice: '조급해하지 말고 기본에 충실하세요. 시험 직전에 무리하지 말고, 컨디션 관리에 신경 쓰세요. 11월, 12월이 그나마 유리합니다.',
        luckyMonths: '11월, 12월',
        unluckyMonths: '3월, 5월, 7월'
      };
    }
  };

  // ===== 가족운 =====
  const getFamilyFortune = () => {
    const score = fortuneCategories.family;

    if (score >= 80) {
      return {
        grade: '대길',
        summary: '가정에 화목과 기쁜 일이 있는 해입니다.',
        detail: `2026년은 ${name}님의 가정에 화목과 기쁨이 가득한 해입니다. 가족 간의 유대가 깊어지고, 서로를 더 이해하고 아끼는 시간이 될 것입니다. 부모님과의 관계가 좋아지거나, 형제자매와 협력하여 좋은 일을 도모할 수 있습니다. 가족 중에 경사(결혼, 출산, 승진, 합격 등)가 있을 수 있습니다. 집안의 어르신들 건강이 좋아지거나, 오래된 가족 문제가 해결되는 계기가 있을 수 있습니다. 가족 여행이나 모임을 계획하면 좋은 추억을 만들 수 있습니다. 가정의 평화가 모든 운의 근본이 되니, 가족을 소중히 여기세요.`,
        advice: '가족과 함께하는 시간을 늘리세요. 명절이나 기념일에는 꼭 함께하고, 감사의 마음을 자주 표현하세요.',
        luckyMonths: '2월, 5월, 9월',
        unluckyMonths: '8월'
      };
    } else if (score >= 60) {
      return {
        grade: '평길',
        summary: '가정의 평화가 유지되는 해입니다.',
        detail: `2026년 ${name}님의 가족운은 큰 변화 없이 평온한 흐름이 예상됩니다. 특별한 기쁨이나 어려움 없이 일상이 유지되는 한 해입니다. 가족 간의 소통을 늘리고, 서로를 챙기는 작은 노력이 관계를 더 좋게 만들 수 있습니다. 부모님께 안부 전화를 자주 드리고, 형제자매와 가끔 만나 대화하세요. 집안일이나 재산 문제로 의견 충돌이 있을 수 있으나, 대화로 원만하게 해결될 것입니다. 가족의 건강에 관심을 갖고, 정기 검진을 권유하세요. 작은 정성이 가족의 행복으로 돌아옵니다.`,
        advice: '바쁘더라도 가족과 대화하는 시간을 만드세요. 부모님 건강 검진을 챙기고, 가족 모임을 주선하세요.',
        luckyMonths: '6월, 10월, 12월',
        unluckyMonths: '3월, 7월'
      };
    } else {
      return {
        grade: '소흉',
        summary: '가족 간 갈등에 주의가 필요한 해입니다.',
        detail: `2026년은 ${name}님에게 가족 관계에서 어려움이 있을 수 있는 해입니다. 병오년의 강한 화기가 가족 간의 갈등이나 오해를 유발할 수 있습니다. 특히 금전 문제, 상속 문제, 생활 방식의 차이로 인한 다툼이 있을 수 있습니다. 감정적으로 대응하면 상황이 악화되니, 차분하게 대화하려 노력하세요. 가족 중 건강이 안 좋아지는 분이 있을 수 있으니 미리 검진을 권하세요. 어려운 시기일수록 가족의 소중함을 잊지 말고, 갈등은 시간이 해결해줄 것이라 믿으세요. 양보와 이해가 가정의 평화를 지키는 열쇠입니다.`,
        advice: '가족과 금전 관계는 명확히 하고, 감정적 다툼은 피하세요. 가족의 건강을 챙기고, 어른들께 효도하세요.',
        luckyMonths: '11월, 12월',
        unluckyMonths: '3월, 5월, 8월'
      };
    }
  };

  // ===== 대인관계운 =====
  const getSocialFortune = () => {
    const score = fortuneCategories.social;

    if (score >= 80) {
      return {
        grade: '대길',
        summary: '귀인을 만나고 인맥이 넓어지는 해입니다.',
        detail: `2026년은 ${name}님에게 대인관계 면에서 최고의 해입니다. 병오년의 밝은 화기가 당신의 매력을 높이고, 새로운 인연을 끌어들입니다. 귀인의 도움으로 어려운 일이 해결되거나, 좋은 기회가 찾아올 수 있습니다. 직장, 사업, 개인적인 영역 모두에서 인맥이 넓어지고, 사람들의 신뢰를 얻게 됩니다. 모임이나 네트워킹에 적극적으로 참여하면 평생 도움이 될 인연을 만날 수 있습니다. 다만 모든 사람에게 열린 마음으로 대하되, 소수의 진정한 친구에게 더 시간과 정성을 투자하세요. 베푸는 만큼 돌아오는 한 해입니다.`,
        advice: '모임에 적극 참여하고, 먼저 연락하고 먼저 베푸세요. 3월, 5월에 중요한 인연이 있습니다. SNS 활동도 도움이 됩니다.',
        luckyMonths: '3월, 5월, 9월',
        unluckyMonths: '8월'
      };
    } else if (score >= 60) {
      return {
        grade: '평길',
        summary: '기존 인연이 유지되고 깊어지는 해입니다.',
        detail: `2026년 ${name}님의 대인관계운은 새로운 인연보다 기존 관계가 깊어지는 흐름입니다. 오래된 친구나 지인과의 관계가 더 돈독해지고, 서로에게 힘이 되는 한 해입니다. 새로운 사람을 많이 사귀기보다 소중한 사람들에게 집중하세요. 연락이 뜸했던 친구에게 먼저 연락하면 좋은 일이 있을 수 있습니다. 직장이나 비즈니스에서의 관계는 무난하나, 지나친 솔직함이나 농담이 오해를 부를 수 있으니 말을 조심하세요. 주변 사람들의 부탁에는 성의껏 응해주되, 무리한 요청은 정중히 거절하세요.`,
        advice: '오래된 친구와의 관계를 돈독히 하세요. 정기적인 모임을 갖고, 기념일을 챙기면 관계가 깊어집니다.',
        luckyMonths: '6월, 10월, 12월',
        unluckyMonths: '4월, 7월'
      };
    } else {
      return {
        grade: '소흉',
        summary: '인간관계에서 갈등에 주의해야 하는 해입니다.',
        detail: `2026년은 ${name}님에게 대인관계 면에서 주의가 필요한 해입니다. 병오년의 강한 화기가 오해, 구설, 다툼을 유발할 수 있습니다. 친한 사람과의 갈등, 직장 동료와의 마찰, 소문이나 험담에 휘말릴 수 있습니다. 말을 조심하고, 감정적인 대응을 피하세요. 뒷담화나 험담에 참여하지 말고, 중립을 지키세요. 금전 거래나 보증은 친한 사이라도 피하는 것이 좋습니다. 어려운 시기지만 진정한 친구는 오히려 이런 시기에 드러납니다. 고민이 있으면 믿을 수 있는 한 사람에게만 털어놓으세요.`,
        advice: '말조심, 행동조심이 최우선입니다. 새로운 사람보다 검증된 사람과 어울리고, 금전 관계는 피하세요.',
        luckyMonths: '11월, 12월',
        unluckyMonths: '3월, 5월, 7월, 8월'
      };
    }
  };

  // ===== 투자운 =====
  const getInvestmentFortune = () => {
    const score = fortuneCategories.investment;

    if (score >= 80) {
      return {
        grade: '대길',
        summary: '투자에 좋은 기운이 있는 해입니다.',
        detail: `2026년은 ${name}님에게 투자의 기회가 열리는 해입니다. 병오년의 활발한 화기가 재물의 증식과 사업 확장을 상징합니다. 부동산, 주식, 펀드 등 다양한 투자처에서 좋은 수익을 기대할 수 있습니다. 특히 상반기에 좋은 투자 기회가 찾아올 수 있으니 평소 관심 있던 분야를 주시하세요. 다만 화기가 강하므로 충동적인 투자나 한 곳에 모든 자금을 집중하는 것은 피하세요. 분산 투자와 장기적인 관점을 유지하면 안정적인 수익을 올릴 수 있습니다. 전문가의 조언을 참고하되 최종 결정은 본인이 충분히 공부한 후 내리세요.`,
        advice: '3월, 5월에 좋은 투자 기회가 있습니다. 자금의 50% 이상은 안전자산에 배분하고, 나머지로 적극 투자하세요.',
        luckyMonths: '3월, 5월, 9월',
        unluckyMonths: '7월, 8월'
      };
    } else if (score >= 60) {
      return {
        grade: '평길',
        summary: '신중한 투자가 필요한 해입니다.',
        detail: `2026년 ${name}님의 투자운은 큰 행운보다는 안정적인 흐름이 예상됩니다. 공격적인 투자보다는 원금 보전을 우선으로 하고, 안정적인 배당주나 적금, 예금 등 안전자산 위주로 포트폴리오를 구성하는 것이 좋습니다. 새로운 투자처보다 기존에 보유한 자산을 잘 관리하는 데 집중하세요. 지인의 투자 권유나 고수익을 미끼로 한 투자 제안은 신중히 검토하세요. 하반기 10월 이후에 좋은 기회가 올 수 있으니 그때를 위해 자금을 모아두는 것도 전략입니다. 투자 공부를 꾸준히 하면 내년에 좋은 결과로 이어집니다.`,
        advice: '안전자산 70%, 투자자산 30% 비율을 유지하세요. 10월 이후에 투자 기회를 노려보세요.',
        luckyMonths: '6월, 10월, 12월',
        unluckyMonths: '3월, 8월'
      };
    } else {
      return {
        grade: '소흉',
        summary: '투자에 신중을 기해야 하는 해입니다.',
        detail: `2026년은 ${name}님에게 투자 면에서 주의가 필요한 해입니다. 병오년의 강한 화기가 재물의 손실이나 투자 실패를 암시합니다. 올해는 새로운 투자를 시작하기보다 현재 자산을 지키는 데 집중하세요. 주식, 코인, 부동산 등 변동성이 큰 자산에 대한 투자는 최소화하고, 확실한 수익이 보장되는 안전자산 위주로 운용하세요. 지인에게 빌려주거나 보증을 서는 것도 피하세요. 고수익을 약속하는 투자 제안은 100% 사기라고 생각하고 거절하세요. 올해 투자하지 않는 것이 가장 좋은 투자 전략입니다.`,
        advice: '신규 투자는 전면 보류하세요. 원금 보전이 최우선입니다. 고수익 투자 제안은 모두 거절하세요.',
        luckyMonths: '11월, 12월',
        unluckyMonths: '3월, 5월, 7월'
      };
    }
  };

  // ===== 이사/이동운 =====
  const getMovingFortune = () => {
    const score = fortuneCategories.moving;

    if (score >= 80) {
      return {
        grade: '대길',
        summary: '이사와 변화에 좋은 기운이 있는 해입니다.',
        detail: `2026년은 ${name}님에게 이사나 거주지 변경에 좋은 해입니다. 병오년의 활발한 기운이 새로운 공간에서의 성공과 발전을 상징합니다. 더 좋은 집으로 이사하거나 독립, 분가를 계획하고 있다면 올해가 적기입니다. 특히 봄(3-5월)이나 가을(9-10월)에 이사하면 좋은 기운을 받을 수 있습니다. 새 집을 구할 때는 남향이나 동남향을 선택하면 화기와 조화를 이루어 길합니다. 직장 이동, 부서 이동도 긍정적인 결과를 가져올 수 있으니 적극적으로 고려해보세요.`,
        advice: '3월, 5월, 9월에 이사하면 길합니다. 남향이나 동남향 집을 선택하세요.',
        luckyMonths: '3월, 5월, 9월',
        unluckyMonths: '7월, 8월',
        luckyDirection: '남쪽, 동남쪽'
      };
    } else if (score >= 60) {
      return {
        grade: '평길',
        summary: '신중한 이사 계획이 필요합니다.',
        detail: `2026년 ${name}님의 이사운은 급격한 변화보다 신중한 계획이 필요한 흐름입니다. 꼭 이사해야 할 이유가 있다면 진행해도 무방하나, 단순히 기분 전환을 위한 이사는 미루는 것이 좋습니다. 이사를 결정했다면 충분한 시간을 두고 여러 매물을 비교하고, 계약 조건을 꼼꼼히 살펴보세요. 이사 날짜는 손 없는 날을 선택하고, 가능하면 전문가의 조언을 받으세요. 직장 내 부서 이동은 본인이 원하지 않는다면 굳이 나서지 마세요.`,
        advice: '급한 이사는 피하고, 6월이나 10월로 미루세요. 계약 전 꼼꼼히 확인하세요.',
        luckyMonths: '6월, 10월',
        unluckyMonths: '4월, 8월',
        luckyDirection: '동쪽, 북쪽'
      };
    } else {
      return {
        grade: '소흉',
        summary: '이사와 이동을 자제해야 하는 해입니다.',
        detail: `2026년은 ${name}님에게 이사나 큰 변화를 피해야 하는 해입니다. 병오년의 강한 화기가 이동과 변화에 부정적인 영향을 미칠 수 있습니다. 가능하다면 올해는 현재 거주지에서 안정을 취하고, 이사는 내년으로 미루세요. 부득이하게 이사해야 한다면 반드시 전문가의 조언을 받고, 날짜와 방향을 신중히 선택하세요. 직장 이동이나 전근도 가급적 피하는 것이 좋습니다. 현재 환경에서 최선을 다하다 보면 때가 올 것입니다.`,
        advice: '이사는 내년으로 미루세요. 불가피하면 11월, 12월에 진행하세요.',
        luckyMonths: '11월, 12월',
        unluckyMonths: '3월, 5월, 7월',
        luckyDirection: '북쪽'
      };
    }
  };

  // ===== 여행운 =====
  const getTravelFortune = () => {
    const score = fortuneCategories.travel;

    if (score >= 80) {
      return {
        grade: '대길',
        summary: '여행과 해외운이 좋은 해입니다.',
        detail: `2026년은 ${name}님에게 여행과 해외 활동에 최고의 해입니다. 병오년의 화기가 활발한 이동과 새로운 경험을 상징하여, 국내외 여행에서 좋은 기운을 받을 수 있습니다. 그동안 가고 싶었던 여행지가 있다면 올해 방문하세요. 해외여행, 유학, 어학연수, 해외 출장 등도 좋은 결과를 기대할 수 있습니다. 여행 중 좋은 인연을 만나거나 인생에 도움이 되는 깨달음을 얻을 수 있습니다. 특히 동남아시아, 호주 등 따뜻한 지역이 길방입니다.`,
        advice: '3월, 5월, 9월 여행이 최고입니다. 동남아시아나 따뜻한 지역으로 가세요.',
        luckyMonths: '3월, 5월, 9월',
        unluckyMonths: '7월',
        luckyDestination: '동남아시아, 호주, 제주도, 남쪽 방향'
      };
    } else if (score >= 60) {
      return {
        grade: '평길',
        summary: '가벼운 여행은 무난합니다.',
        detail: `2026년 ${name}님의 여행운은 무난한 흐름입니다. 가까운 국내 여행이나 짧은 휴가는 좋은 리프레시가 될 수 있습니다. 다만 무리한 장거리 여행이나 위험한 지역 방문은 피하세요. 해외여행을 계획한다면 안전한 지역 위주로 선택하고, 여행자 보험에 꼭 가입하세요. 출장이나 업무 목적의 여행은 좋은 성과를 거둘 수 있습니다. 혼자보다 가족이나 친구와 함께하는 여행이 더 즐거운 추억이 될 것입니다.`,
        advice: '국내 여행은 언제든 무난합니다. 해외는 6월, 10월에 가세요.',
        luckyMonths: '6월, 10월, 11월',
        unluckyMonths: '4월, 8월',
        luckyDestination: '국내 여행, 일본, 가까운 아시아 지역'
      };
    } else {
      return {
        grade: '소흉',
        summary: '여행에 주의가 필요한 해입니다.',
        detail: `2026년은 ${name}님에게 여행 면에서 주의가 필요한 해입니다. 특히 장거리 해외여행이나 위험 지역 방문은 피하는 것이 좋습니다. 여행 중 사고, 분실, 건강 문제가 발생할 수 있으니 각별히 조심하세요. 꼭 여행해야 한다면 안전을 최우선으로 하고, 무리한 일정은 피하세요. 여행자 보험은 필수이며, 현지 상황을 미리 파악하세요. 올해는 멀리 가기보다 가까운 곳에서 휴식을 취하는 것이 현명합니다.`,
        advice: '장거리 여행은 자제하세요. 필수라면 11월, 12월에 가세요. 보험 필수 가입.',
        luckyMonths: '11월, 12월',
        unluckyMonths: '3월, 5월, 7월, 8월',
        luckyDestination: '가까운 국내 여행, 익숙한 지역'
      };
    }
  };

  // ===== 소송/법률운 =====
  const getLegalFortune = () => {
    const score = fortuneCategories.legal;

    if (score >= 80) {
      return {
        grade: '대길',
        summary: '법적 문제에 유리한 해입니다.',
        detail: `2026년은 ${name}님에게 법적 분쟁이나 계약 문제에서 유리한 결과를 기대할 수 있는 해입니다. 진행 중인 소송이 있다면 올해 좋은 결과를 얻을 가능성이 높습니다. 억울한 일이 있었다면 법적 절차를 통해 해결하기 좋은 시기입니다. 중요한 계약(부동산, 사업, 고용 등)도 꼼꼼히 검토하고 진행하면 좋은 조건을 얻을 수 있습니다. 다만 본인이 정당하지 않은 경우에는 해당되지 않으니, 항상 정직하게 행동하세요.`,
        advice: '3월, 5월에 법적 문제 해결에 좋습니다. 계약 전 전문가 검토를 받으세요.',
        luckyMonths: '3월, 5월, 9월',
        unluckyMonths: '7월'
      };
    } else if (score >= 60) {
      return {
        grade: '평길',
        summary: '법적 문제는 신중하게 처리하세요.',
        detail: `2026년 ${name}님의 법률운은 큰 변화 없이 무난한 흐름입니다. 진행 중인 법적 문제가 있다면 시간이 걸리더라도 순리대로 처리하세요. 새로운 소송을 제기하거나 법적 분쟁에 휘말리는 것은 피하는 것이 좋습니다. 계약 시에는 모든 조항을 꼼꼼히 읽고, 불분명한 부분은 명확히 해두세요. 구두 약속보다 서면 계약을 원칙으로 하고, 중요한 결정은 전문가의 조언을 받으세요.`,
        advice: '새로운 소송은 피하고, 계약 시 서면으로 명확히 하세요.',
        luckyMonths: '6월, 10월, 12월',
        unluckyMonths: '4월, 8월'
      };
    } else {
      return {
        grade: '소흉',
        summary: '법적 분쟁에 휘말리지 않도록 주의하세요.',
        detail: `2026년은 ${name}님에게 법적 문제나 계약 분쟁에 주의가 필요한 해입니다. 가능하면 소송이나 법적 분쟁에 관여하지 않는 것이 최선입니다. 진행 중인 사건이 있다면 무리하게 밀어붙이기보다 합의나 중재를 모색하세요. 계약 체결 시에는 매우 신중해야 하며, 조금이라도 의심스러운 부분이 있으면 보류하세요. 보증이나 연대책임은 절대 지지 마세요. 분쟁의 소지가 있는 상황에서는 먼저 한 발 물러서는 지혜가 필요합니다.`,
        advice: '모든 법적 문제는 피하거나 미루세요. 보증은 절대 금물. 합의 위주로 해결하세요.',
        luckyMonths: '11월, 12월',
        unluckyMonths: '3월, 5월, 7월, 8월'
      };
    }
  };

  const wealthFortune = getWealthFortune();
  const loveFortune = getLoveFortune();
  const marriageFortune = getMarriageFortune();
  const healthFortune = getHealthFortune();
  const careerFortune = getCareerFortune();
  const studyFortune = getStudyFortune();
  const familyFortune = getFamilyFortune();
  const socialFortune = getSocialFortune();
  const investmentFortune = getInvestmentFortune();
  const movingFortune = getMovingFortune();
  const travelFortune = getTravelFortune();
  const legalFortune = getLegalFortune();

  // 행운 아이템
  const getLuckyItems = () => {
    const items = {
      color: dayElement === '금' || dayElement === '화' ? '파란색, 검은색, 회색' :
             dayElement === '수' ? '녹색, 청록색, 청색' :
             dayElement === '목' ? '빨간색, 주황색, 분홍색' :
             dayElement === '토' ? '흰색, 금색, 은색' : '노란색, 베이지색, 갈색',
      direction: dayElement === '금' ? '북쪽 (北)' :
                 dayElement === '화' ? '북쪽 (北)' :
                 dayElement === '수' ? '동쪽 (東)' :
                 dayElement === '목' ? '남쪽 (南)' :
                 '서쪽 (西)',
      number: dayElement === '금' ? '1, 6' :
              dayElement === '화' ? '1, 6' :
              dayElement === '수' ? '3, 8' :
              dayElement === '목' ? '2, 7' :
              '4, 9',
      item: dayElement === '금' ? '수정, 아쿠아마린, 파란색 액세서리, 물병' :
            dayElement === '화' ? '오팔, 물고기 장식, 분수, 시원한 인테리어' :
            dayElement === '수' ? '비취, 식물, 녹색 소품, 목재 가구' :
            dayElement === '목' ? '루비, 가넷, 촛불, 조명, 붉은색 소품' :
            '진주, 금반지, 금속 소품, 원형 액세서리'
    };
    return items;
  };

  const luckyItems = getLuckyItems();

  // 점수별 색상
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-blue-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-600';
    if (score >= 60) return 'from-blue-500 to-cyan-600';
    if (score >= 40) return 'from-orange-500 to-amber-600';
    return 'from-red-500 to-rose-600';
  };

  const getGradeStyle = (grade: string) => {
    if (grade === '대길' || grade === '양호') return 'bg-green-500/20 text-green-400';
    if (grade === '평길' || grade === '보통') return 'bg-blue-500/20 text-blue-400';
    return 'bg-orange-500/20 text-orange-400';
  };

  // 운세 카드 컴포넌트
  const FortuneCard = ({
    icon: Icon,
    iconColor,
    title,
    score,
    grade,
    summary,
    detail,
    advice,
    luckyMonths,
    unluckyMonths,
    caution,
    goodMonths,
    badMonths
  }: {
    icon: React.ElementType;
    iconColor: string;
    title: string;
    score: number;
    grade: string;
    summary: string;
    detail: string;
    advice: string;
    luckyMonths?: string;
    unluckyMonths?: string;
    caution?: string;
    goodMonths?: string;
    badMonths?: string;
  }) => (
    <motion.div
      className="glass rounded-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${iconColor} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-100">{title}</h3>
          <div className="flex items-center gap-2">
            <span className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}점</span>
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${getGradeStyle(grade)}`}>{grade}</span>
          </div>
        </div>
      </div>
      <p className="text-amber-400 font-medium mb-3">{summary}</p>
      <p className="text-slate-300 text-sm leading-relaxed mb-4">{detail}</p>
      <div className="bg-slate-800/50 rounded-xl p-4 space-y-2">
        <p className="text-sm text-slate-200">
          <span className="text-amber-400 font-medium">💡 조언:</span> {advice}
        </p>
        {(luckyMonths || goodMonths) && (
          <p className="text-xs text-green-400">✨ 좋은 달: {luckyMonths || goodMonths}</p>
        )}
        {(unluckyMonths || badMonths) && (
          <p className="text-xs text-orange-400">⚠️ 주의할 달: {unluckyMonths || badMonths}</p>
        )}
        {caution && (
          <p className="text-xs text-red-400">🏥 건강 주의: {caution}</p>
        )}
      </div>
    </motion.div>
  );

  // 이메일용 HTML 콘텐츠 생성
  const getEmailContent = () => {
    return `
      <div style="background: #1e293b; border-radius: 16px; padding: 24px; margin-bottom: 16px; text-align: center;">
        <h2 style="color: #fbbf24; font-size: 28px; margin: 0 0 8px 0;">🐴 2026 신년운세</h2>
        <p style="color: #f87171; margin: 0 0 16px 0;">丙午年 · 붉은 말의 해</p>
        <p style="color: white; font-size: 20px; margin: 0;">${name}님</p>
      </div>

      <div style="background: #1e293b; border-radius: 16px; padding: 24px; margin-bottom: 16px;">
        <h3 style="color: white; margin: 0 0 16px 0;">📊 2026년 총운</h3>
        <div style="text-align: center; margin-bottom: 16px;">
          <span style="color: #fbbf24; font-size: 48px; font-weight: bold;">${overallScore}점</span>
        </div>
        <p style="color: #94a3b8; margin: 0;">${yearRelation.summary}</p>
      </div>

      <div style="background: #1e293b; border-radius: 16px; padding: 24px; margin-bottom: 16px;">
        <h3 style="color: white; margin: 0 0 16px 0;">🎯 분야별 운세</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div style="background: #0f172a; padding: 12px; border-radius: 8px; text-align: center;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">💰 재물운</p>
            <p style="color: #fbbf24; font-size: 20px; font-weight: bold; margin: 4px 0 0 0;">${fortuneCategories.wealth}점</p>
          </div>
          <div style="background: #0f172a; padding: 12px; border-radius: 8px; text-align: center;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">💕 애정운</p>
            <p style="color: #ec4899; font-size: 20px; font-weight: bold; margin: 4px 0 0 0;">${fortuneCategories.love}점</p>
          </div>
          <div style="background: #0f172a; padding: 12px; border-radius: 8px; text-align: center;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">💼 직장운</p>
            <p style="color: #3b82f6; font-size: 20px; font-weight: bold; margin: 4px 0 0 0;">${fortuneCategories.career}점</p>
          </div>
          <div style="background: #0f172a; padding: 12px; border-radius: 8px; text-align: center;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">💪 건강운</p>
            <p style="color: #22c55e; font-size: 20px; font-weight: bold; margin: 4px 0 0 0;">${fortuneCategories.health}점</p>
          </div>
        </div>
      </div>

      <div style="background: linear-gradient(135deg, rgba(251, 191, 36, 0.3) 0%, rgba(245, 158, 11, 0.4) 100%); border: 2px solid rgba(251, 191, 36, 0.5); border-radius: 16px; padding: 24px;">
        <h3 style="color: #fcd34d; font-size: 16px; margin: 0 0 12px 0;">✨ 2026년 총평</h3>
        <p style="color: white; font-size: 16px; margin: 0; line-height: 1.6;">${yearRelation.detail.substring(0, 200)}...</p>
      </div>
    `;
  };

  return (
    <div className="min-h-screen px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* 헤더 */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-6xl mb-4">🐴</div>
          <h1
            className="text-3xl md:text-4xl font-bold mb-2 gradient-text"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            2026년 병오년 신년운세
          </h1>
          <p className="text-red-400 text-lg font-medium">丙午年 · 붉은 말의 해</p>
          <p className="text-slate-300 mt-2">{name}님의 2026년 상세 운세 분석</p>
        </motion.div>

        {/* 사주 정보 요약 */}
        <motion.div
          className="glass-strong rounded-3xl p-6 md:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-wrap items-center justify-center gap-4 text-center">
            <div className="px-4 py-2 bg-slate-800/50 rounded-xl">
              <span className="text-slate-400 text-sm">이름</span>
              <p className="text-lg font-bold text-amber-400">{name}</p>
            </div>
            <div className="px-4 py-2 bg-slate-800/50 rounded-xl">
              <span className="text-slate-400 text-sm">생년월일</span>
              <p className="text-lg font-bold text-slate-100">{birthDate.year}.{birthDate.month}.{birthDate.day}</p>
            </div>
            <div className="px-4 py-2 bg-slate-800/50 rounded-xl">
              <span className="text-slate-400 text-sm">일간</span>
              <p className="text-lg font-bold text-cyan-400">{result.day.stem.ko}({result.day.stem.cn}) · {dayElement}</p>
            </div>
            <div className="px-4 py-2 bg-slate-800/50 rounded-xl">
              <span className="text-slate-400 text-sm">용신</span>
              <p className="text-lg font-bold text-green-400">{result.yongsin}</p>
            </div>
          </div>
        </motion.div>

        {/* 총운 분석 */}
        <motion.div
          className="glass-strong rounded-3xl p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 gradient-text" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            🌟 2026년 총운 분석
          </h2>

          <div className="flex justify-center mb-8">
            <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${getScoreBg(overallScore)} flex items-center justify-center shadow-2xl`}>
              <div className="text-center">
                <span className="text-4xl font-bold text-white">{overallScore}</span>
                <span className="text-white/80 text-sm block">점</span>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Sun className="w-6 h-6 text-amber-400" />
              <h3 className="text-xl font-bold text-slate-100">{yearRelation.relation}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                yearRelation.fortune === 'excellent' ? 'bg-green-500/20 text-green-400' :
                yearRelation.fortune === 'good' ? 'bg-blue-500/20 text-blue-400' :
                yearRelation.fortune === 'challenging' ? 'bg-red-500/20 text-red-400' :
                'bg-slate-500/20 text-slate-400'
              }`}>
                {yearRelation.fortune === 'excellent' ? '대길' :
                 yearRelation.fortune === 'good' ? '길' :
                 yearRelation.fortune === 'challenging' ? '주의' : '평'}
              </span>
            </div>
            <p className="text-lg font-medium text-amber-400 mb-4">{yearRelation.summary}</p>
            <p className="text-slate-300 leading-relaxed">{yearRelation.detail}</p>
          </div>

          <div className="glass rounded-2xl p-6 border border-red-500/30">
            <h3 className="text-lg font-bold text-red-400 mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              2026년 병오년(丙午年)이란?
            </h3>
            <div className="text-slate-300 space-y-3 leading-relaxed">
              <p>
                2026년은 <strong className="text-red-400">병오년(丙午年)</strong>, 육십갑자 중 43번째 해입니다.
                천간 <strong className="text-amber-400">병(丙)</strong>은 태양을 상징하는 양(陽)의 불[火]이고,
                지지 <strong className="text-amber-400">오(午)</strong> 역시 정오의 태양, 말(馬)을 상징하는 불[火]입니다.
              </p>
              <p>
                천간과 지지 모두 화(火)이므로, <strong className="text-red-400">화기(火氣)가 매우 강한 해</strong>입니다.
                열정, 추진력, 활력이 넘치지만, 동시에 과열, 충돌, 급진적 변화의 기운도 있습니다.
              </p>
              <p>
                붉은 말의 해답게 <strong className="text-amber-400">빠른 변화와 역동적인 에너지</strong>가 특징이며,
                적극적이고 용감한 행동이 성공을 부르는 해입니다.
              </p>
            </div>
          </div>
        </motion.div>

        {/* 분야별 운세 */}
        <motion.div
          className="glass-strong rounded-3xl p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 gradient-text" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            📊 분야별 상세 운세
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <FortuneCard
              icon={Wallet}
              iconColor="from-yellow-400 to-amber-500"
              title="재물운"
              score={fortuneCategories.wealth}
              grade={wealthFortune.grade}
              summary={wealthFortune.summary}
              detail={wealthFortune.detail}
              advice={wealthFortune.advice}
              luckyMonths={wealthFortune.luckyMonths}
              unluckyMonths={wealthFortune.unluckyMonths}
            />

            <FortuneCard
              icon={Heart}
              iconColor="from-pink-400 to-rose-500"
              title="연애운"
              score={fortuneCategories.love}
              grade={loveFortune.grade}
              summary={loveFortune.summary}
              detail={loveFortune.detail}
              advice={loveFortune.advice}
              luckyMonths={loveFortune.luckyMonths}
              unluckyMonths={loveFortune.unluckyMonths}
            />

            <FortuneCard
              icon={Crown}
              iconColor="from-purple-400 to-violet-500"
              title="결혼운"
              score={fortuneCategories.marriage}
              grade={marriageFortune.grade}
              summary={marriageFortune.summary}
              detail={marriageFortune.detail}
              advice={marriageFortune.advice}
              luckyMonths={marriageFortune.luckyMonths}
              unluckyMonths={marriageFortune.unluckyMonths}
            />

            <FortuneCard
              icon={Activity}
              iconColor="from-green-400 to-emerald-500"
              title="건강운"
              score={fortuneCategories.health}
              grade={healthFortune.grade}
              summary={healthFortune.summary}
              detail={healthFortune.detail}
              advice={healthFortune.advice}
              goodMonths={healthFortune.goodMonths}
              badMonths={healthFortune.badMonths}
              caution={healthFortune.caution}
            />

            <FortuneCard
              icon={Briefcase}
              iconColor="from-blue-400 to-indigo-500"
              title="직업운"
              score={fortuneCategories.career}
              grade={careerFortune.grade}
              summary={careerFortune.summary}
              detail={careerFortune.detail}
              advice={careerFortune.advice}
              luckyMonths={careerFortune.luckyMonths}
              unluckyMonths={careerFortune.unluckyMonths}
            />

            <FortuneCard
              icon={GraduationCap}
              iconColor="from-cyan-400 to-teal-500"
              title="학업운"
              score={fortuneCategories.study}
              grade={studyFortune.grade}
              summary={studyFortune.summary}
              detail={studyFortune.detail}
              advice={studyFortune.advice}
              luckyMonths={studyFortune.luckyMonths}
              unluckyMonths={studyFortune.unluckyMonths}
            />

            <FortuneCard
              icon={Home}
              iconColor="from-orange-400 to-amber-500"
              title="가족운"
              score={fortuneCategories.family}
              grade={familyFortune.grade}
              summary={familyFortune.summary}
              detail={familyFortune.detail}
              advice={familyFortune.advice}
              luckyMonths={familyFortune.luckyMonths}
              unluckyMonths={familyFortune.unluckyMonths}
            />

            <FortuneCard
              icon={Users}
              iconColor="from-indigo-400 to-purple-500"
              title="대인관계운"
              score={fortuneCategories.social}
              grade={socialFortune.grade}
              summary={socialFortune.summary}
              detail={socialFortune.detail}
              advice={socialFortune.advice}
              luckyMonths={socialFortune.luckyMonths}
              unluckyMonths={socialFortune.unluckyMonths}
            />

            <FortuneCard
              icon={TrendingUp}
              iconColor="from-emerald-400 to-green-500"
              title="투자운"
              score={fortuneCategories.investment}
              grade={investmentFortune.grade}
              summary={investmentFortune.summary}
              detail={investmentFortune.detail}
              advice={investmentFortune.advice}
              luckyMonths={investmentFortune.luckyMonths}
              unluckyMonths={investmentFortune.unluckyMonths}
            />

            <FortuneCard
              icon={Truck}
              iconColor="from-slate-400 to-gray-500"
              title="이사/이동운"
              score={fortuneCategories.moving}
              grade={movingFortune.grade}
              summary={movingFortune.summary}
              detail={movingFortune.detail}
              advice={movingFortune.advice}
              luckyMonths={movingFortune.luckyMonths}
              unluckyMonths={movingFortune.unluckyMonths}
            />

            <FortuneCard
              icon={Plane}
              iconColor="from-sky-400 to-blue-500"
              title="여행운"
              score={fortuneCategories.travel}
              grade={travelFortune.grade}
              summary={travelFortune.summary}
              detail={travelFortune.detail}
              advice={travelFortune.advice}
              luckyMonths={travelFortune.luckyMonths}
              unluckyMonths={travelFortune.unluckyMonths}
            />

            <FortuneCard
              icon={Scale}
              iconColor="from-amber-400 to-yellow-500"
              title="소송/법률운"
              score={fortuneCategories.legal}
              grade={legalFortune.grade}
              summary={legalFortune.summary}
              detail={legalFortune.detail}
              advice={legalFortune.advice}
              luckyMonths={legalFortune.luckyMonths}
              unluckyMonths={legalFortune.unluckyMonths}
            />
          </div>
        </motion.div>

        {/* 행운 아이템 */}
        <motion.div
          className="glass-strong rounded-3xl p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 gradient-text" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            🍀 2026년 행운 아이템
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass rounded-2xl p-5 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center mb-3">
                <Gem className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-sm font-bold text-slate-400 mb-1">행운의 색</h3>
              <p className="text-lg font-bold text-slate-100">{luckyItems.color}</p>
            </div>

            <div className="glass rounded-2xl p-5 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mb-3">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-sm font-bold text-slate-400 mb-1">행운의 방향</h3>
              <p className="text-lg font-bold text-slate-100">{luckyItems.direction}</p>
            </div>

            <div className="glass rounded-2xl p-5 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-3">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-sm font-bold text-slate-400 mb-1">행운의 숫자</h3>
              <p className="text-lg font-bold text-slate-100">{luckyItems.number}</p>
            </div>

            <div className="glass rounded-2xl p-5 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mb-3">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-sm font-bold text-slate-400 mb-1">행운의 아이템</h3>
              <p className="text-sm font-medium text-slate-100">{luckyItems.item}</p>
            </div>
          </div>
        </motion.div>

        {/* 월별 운세 */}
        <MonthlyForecast2026 result={result} />

        {/* 분기별 상세 분석 */}
        <motion.div
          className="glass-strong rounded-3xl p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 gradient-text" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            📅 2026년 분기별 상세 분석
          </h2>

          <div className="space-y-6">
            {/* 1분기 */}
            <div className="glass rounded-2xl p-6 border border-green-500/30">
              <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                <span className="text-2xl">🌱</span> 1분기 (1월 ~ 3월) - 새로운 시작의 계절
              </h3>
              <div className="space-y-3 text-slate-300 leading-relaxed">
                <p>
                  2026년의 첫 분기는 <strong className="text-amber-400">{name}님</strong>에게 새로운 계획을 세우고 기반을 다지는 시기입니다.
                  {dayElement === '목' && ' 특히 목(木) 일간이신 분은 봄기운과 함께 활력이 넘치고, 새로운 프로젝트를 시작하기 좋습니다.'}
                  {dayElement === '화' && ' 화(火) 일간이신 분은 아직 화기가 약한 시기이므로 무리하지 말고 준비에 집중하세요.'}
                  {dayElement === '토' && ' 토(土) 일간이신 분은 안정적인 기반 위에서 계획을 세우기 좋은 시기입니다.'}
                  {dayElement === '금' && ' 금(金) 일간이신 분은 목기의 극을 받을 수 있으니 건강에 유의하세요.'}
                  {dayElement === '수' && ' 수(水) 일간이신 분은 목을 생하므로 에너지 소모가 있을 수 있습니다. 컨디션 관리가 중요합니다.'}
                </p>
                <p>
                  <strong className="text-green-400">핵심 포인트:</strong> 연초 계획 수립, 건강 관리 시작, 인간관계 정리
                </p>
                <p>
                  <strong className="text-amber-400">행운의 날:</strong> 1월 15일, 2월 8일, 3월 12일 (중요한 결정에 좋은 날)
                </p>
                <p>
                  <strong className="text-red-400">주의할 날:</strong> 1월 28일, 2월 22일, 3월 7일 (큰 결정 피하기)
                </p>
              </div>
            </div>

            {/* 2분기 */}
            <div className="glass rounded-2xl p-6 border border-yellow-500/30">
              <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                <span className="text-2xl">☀️</span> 2분기 (4월 ~ 6월) - 성장과 도약의 계절
              </h3>
              <div className="space-y-3 text-slate-300 leading-relaxed">
                <p>
                  병오년의 화기가 본격적으로 강해지는 시기입니다. <strong className="text-amber-400">{name}님</strong>에게는
                  {dayElement === '목' && ' 목생화(木生火)의 관계로 당신의 노력이 빛을 발하는 시기입니다. 적극적으로 도전하세요!'}
                  {dayElement === '화' && ' 비겁운이 강해지는 시기로, 열정이 폭발합니다. 하지만 과열에 주의하세요.'}
                  {dayElement === '토' && ' 화생토(火生土)로 풍요의 기운을 받습니다. 재물운과 건강운 모두 상승합니다.'}
                  {dayElement === '금' && ' 화극금(火克金)의 극을 받는 시기입니다. 무리하지 말고 안전을 최우선으로 하세요.'}
                  {dayElement === '수' && ' 수극화(水克火)로 상황을 제어할 수 있지만, 갈등도 생길 수 있습니다.'}
                </p>
                <p>
                  <strong className="text-green-400">핵심 포인트:</strong> 적극적인 도전, 승진/이직 기회, 연애운 상승
                </p>
                <p>
                  <strong className="text-amber-400">행운의 날:</strong> 4월 18일, 5월 5일, 6월 21일 (대길일)
                </p>
                <p>
                  <strong className="text-red-400">주의할 날:</strong> 4월 7일, 5월 20일, 6월 14일 (충돌 주의)
                </p>
              </div>
            </div>

            {/* 3분기 */}
            <div className="glass rounded-2xl p-6 border border-red-500/30">
              <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                <span className="text-2xl">🔥</span> 3분기 (7월 ~ 9월) - 화기가 정점에 달하는 계절
              </h3>
              <div className="space-y-3 text-slate-300 leading-relaxed">
                <p>
                  병오년의 화기가 가장 강해지는 시기입니다. 열정과 활력이 넘치지만, 과열과 충돌에도 주의해야 합니다.
                  <strong className="text-amber-400">{name}님</strong>은
                  {dayElement === '목' && ' 에너지 소모가 심할 수 있습니다. 충분한 휴식을 취하세요.'}
                  {dayElement === '화' && ' 가장 강한 시기이지만 과열에 주의! 감정 조절이 중요합니다.'}
                  {dayElement === '토' && ' 화생토로 가장 좋은 시기입니다. 중요한 결정을 내리기 좋습니다.'}
                  {dayElement === '금' && ' 가장 힘든 시기입니다. 건강과 안전에 각별히 유의하세요.'}
                  {dayElement === '수' && ' 화를 제어할 수 있지만 무리하면 역효과가 납니다.'}
                </p>
                <p>
                  <strong className="text-green-400">핵심 포인트:</strong> 건강 관리, 감정 조절, 중요 결정은 9월로 미루기
                </p>
                <p>
                  <strong className="text-amber-400">행운의 날:</strong> 7월 26일, 8월 15일, 9월 9일
                </p>
                <p>
                  <strong className="text-red-400">주의할 날:</strong> 7월 12일, 8월 3일, 8월 28일 (충 조심)
                </p>
              </div>
            </div>

            {/* 4분기 */}
            <div className="glass rounded-2xl p-6 border border-blue-500/30">
              <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                <span className="text-2xl">❄️</span> 4분기 (10월 ~ 12월) - 결실과 마무리의 계절
              </h3>
              <div className="space-y-3 text-slate-300 leading-relaxed">
                <p>
                  화기가 점차 약해지고 금수(金水)의 기운이 강해지는 시기입니다. 한 해를 정리하고 다음 해를 준비하는 시간입니다.
                  <strong className="text-amber-400">{name}님</strong>에게는
                  {dayElement === '목' && ' 금의 극을 받지만, 수의 생을 받아 균형을 이룹니다.'}
                  {dayElement === '화' && ' 화기가 약해지므로 무리하지 말고 정리에 집중하세요.'}
                  {dayElement === '토' && ' 안정적인 마무리가 가능합니다. 내년 계획을 세우세요.'}
                  {dayElement === '금' && ' 드디어 숨통이 트이는 시기! 하반기 결실을 거두세요.'}
                  {dayElement === '수' && ' 가장 편안한 시기입니다. 충전하고 재정비하세요.'}
                </p>
                <p>
                  <strong className="text-green-400">핵심 포인트:</strong> 한 해 마무리, 재정 정리, 내년 계획 수립
                </p>
                <p>
                  <strong className="text-amber-400">행운의 날:</strong> 10월 10일, 11월 11일, 12월 25일
                </p>
                <p>
                  <strong className="text-red-400">주의할 날:</strong> 10월 22일, 11월 5일, 12월 8일
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2026년 특별 길일/흉일 */}
        <motion.div
          className="glass-strong rounded-3xl p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 gradient-text" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            📆 2026년 특별한 날짜 추천
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* 대길일 */}
            <div className="glass rounded-2xl p-6 border border-green-500/30">
              <h3 className="text-lg font-bold text-green-400 mb-4">🌟 2026년 대길일 (중요한 일에 좋은 날)</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg">
                  <span className="text-2xl">💒</span>
                  <div>
                    <p className="font-bold text-slate-100">결혼/약혼</p>
                    <p className="text-sm text-green-400">3월 15일, 5월 18일, 9월 20일, 10월 11일</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg">
                  <span className="text-2xl">🏠</span>
                  <div>
                    <p className="font-bold text-slate-100">이사/입주</p>
                    <p className="text-sm text-green-400">2월 28일, 4월 12일, 6월 8일, 10월 15일</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg">
                  <span className="text-2xl">💼</span>
                  <div>
                    <p className="font-bold text-slate-100">개업/계약</p>
                    <p className="text-sm text-green-400">3월 8일, 5월 5일, 9월 9일, 11월 11일</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg">
                  <span className="text-2xl">📝</span>
                  <div>
                    <p className="font-bold text-slate-100">시험/면접</p>
                    <p className="text-sm text-green-400">2월 15일, 4월 22일, 6월 18일, 9월 12일</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 흉일 */}
            <div className="glass rounded-2xl p-6 border border-red-500/30">
              <h3 className="text-lg font-bold text-red-400 mb-4">⚠️ 2026년 주의해야 할 날</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-red-500/10 rounded-lg">
                  <span className="text-2xl">🔴</span>
                  <div>
                    <p className="font-bold text-slate-100">삼재일 (큰 결정 금지)</p>
                    <p className="text-sm text-red-400">1월 7일, 4월 15일, 7월 23일, 10월 31일</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-red-500/10 rounded-lg">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <p className="font-bold text-slate-100">천충일 (이동/여행 피하기)</p>
                    <p className="text-sm text-red-400">2월 13일, 5월 21일, 8월 29일, 11월 6일</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-red-500/10 rounded-lg">
                  <span className="text-2xl">💔</span>
                  <div>
                    <p className="font-bold text-slate-100">파일 (계약/약속 금지)</p>
                    <p className="text-sm text-red-400">3월 3일, 6월 11일, 9월 19일, 12월 27일</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-red-500/10 rounded-lg">
                  <span className="text-2xl">🌑</span>
                  <div>
                    <p className="font-bold text-slate-100">월파일 (재물 거래 피하기)</p>
                    <p className="text-sm text-red-400">1월 21일, 4월 29일, 8월 6일, 11월 14일</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-slate-800/50 rounded-xl text-center">
            <p className="text-sm text-slate-400">
              ※ 위 날짜는 일반적인 참고용이며, 개인의 사주에 따라 길흉이 다를 수 있습니다.
              중요한 결정 전에는 전문가와 상담하시기 바랍니다.
            </p>
          </div>
        </motion.div>

        {/* 종합 조언 */}
        <motion.div
          className="glass-strong rounded-3xl p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 gradient-text" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            📜 {name}님을 위한 2026년 종합 조언
          </h2>

          <div className="glass rounded-2xl p-6 border border-amber-500/30">
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                <strong className="text-amber-400">{name}님</strong>, 2026년 병오년은
                당신의 일간 <strong className="text-cyan-400">{dayElement}({result.day.stem.ko})</strong>과(와)
                병오년의 화기가 <strong className="text-red-400">{yearRelation.relation}</strong>의 관계를
                형성하는 한 해입니다.
              </p>

              {yearRelation.fortune === 'excellent' || yearRelation.fortune === 'good' ? (
                <p>
                  전반적으로 <strong className="text-green-400">운이 상승하는 해</strong>이므로,
                  평소 미뤄왔던 일이나 새로운 도전을 시작하기 좋습니다.
                  자신감을 가지고 적극적으로 행동하되, 병오년 특유의 과열과 충동은 경계하세요.
                </p>
              ) : yearRelation.fortune === 'challenging' ? (
                <p>
                  다소 <strong className="text-orange-400">도전적인 상황이 예상되는 해</strong>이지만,
                  이 시련을 통해 한층 성장할 수 있습니다. 무리한 확장보다 내실을 다지고,
                  건강과 인간관계를 소중히 여기며 한 해를 보내세요.
                </p>
              ) : (
                <p>
                  <strong className="text-blue-400">안정과 균형을 유지하는 것</strong>이 중요한 해입니다.
                  급격한 변화보다 꾸준한 노력으로 기반을 다지고,
                  하반기로 갈수록 점차 좋아지는 운의 흐름을 기대하세요.
                </p>
              )}

              <p>
                용신이 <strong className="text-green-400">{result.yongsin}</strong>이므로,
                해당 오행의 기운을 보충하는 것이 2026년을 현명하게 보내는 비결입니다.
              </p>

              <p className="text-amber-400 font-medium">
                2026년 병오년, 붉은 말처럼 힘차게 달려나가시되,
                때로는 멈춰서 주변을 살피는 지혜도 잊지 마세요.
                {name}님의 2026년이 행복과 성취로 가득하길 진심으로 기원합니다! 🐴✨
              </p>
            </div>
          </div>
        </motion.div>

        {/* 버튼 */}
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <motion.button
            onClick={onBack}
            className="px-6 py-3 glass rounded-2xl text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft className="w-4 h-4" />
            메뉴로
          </motion.button>
          <motion.button
            onClick={() => setIsEmailModalOpen(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl text-white font-medium hover:from-blue-600 hover:to-indigo-700 transition-all flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Mail className="w-4 h-4" />
            이메일로 받기
          </motion.button>
          <motion.button
            onClick={onReset}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl text-white font-medium hover:from-red-600 hover:to-orange-600 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            다시 입력하기
          </motion.button>
        </div>
      </div>

      {/* 이메일 모달 */}
      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        htmlContent={getEmailContent()}
        fortuneType="newyear"
        title={`[팔자왕] 2026 신년운세 - ${name}`}
      />
    </div>
  );
}
