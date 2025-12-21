'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import {
  Heart, Users, Home, Wallet, AlertTriangle,
  ArrowLeft, ThumbsUp, Sun, Calendar, MapPin, MessageCircle, Gift, Star, Coffee, Sparkles, Target, Shield, Flame, Clock, Download, Mail, Share2
} from 'lucide-react';
import { CompatibilityFormData } from './CompatibilityForm';
import { downloadElementAsHtml, sendByEmail } from '@/lib/utils/export-utils';
import { shareToKakao } from '@/lib/utils/kakao-share';

interface CompatibilityResultProps {
  result1: SajuResult;
  result2: SajuResult;
  formData: CompatibilityFormData;
  onReset: () => void;
  onBack: () => void;
  onHome?: () => void;
}

export default function CompatibilityResult({
  result1,
  result2,
  formData,
  onReset,
  onBack,
  onHome
}: CompatibilityResultProps) {
  const { person1, person2, relationshipType } = formData;

  // 홈으로 이동
  const handleGoHome = () => {
    if (onHome) {
      onHome();
    } else {
      onBack();
    }
  };

  // 천간 정보
  const stem1 = result1.day.stem;
  const stem2 = result2.day.stem;

  // 지지 정보
  const branch1 = result1.day.branch;
  const branch2 = result2.day.branch;

  // ===== 천간합 분석 =====
  const getStemHapAnalysis = () => {
    const hapPairs: Record<string, { partner: string; result: string; element: string }> = {
      갑: { partner: '기', result: '갑기합토', element: '토' },
      기: { partner: '갑', result: '갑기합토', element: '토' },
      을: { partner: '경', result: '을경합금', element: '금' },
      경: { partner: '을', result: '을경합금', element: '금' },
      병: { partner: '신', result: '병신합수', element: '수' },
      신: { partner: '병', result: '병신합수', element: '수' },
      정: { partner: '임', result: '정임합목', element: '목' },
      임: { partner: '정', result: '정임합목', element: '목' },
      무: { partner: '계', result: '무계합화', element: '화' },
      계: { partner: '무', result: '무계합화', element: '화' },
    };

    const hap = hapPairs[stem1.ko];
    if (hap && hap.partner === stem2.ko) {
      return {
        isHap: true,
        type: hap.result,
        element: hap.element,
        score: 95,
        description: `${person1.name}님의 일간 ${stem1.ko}(${stem1.cn})와 ${person2.name}님의 일간 ${stem2.ko}(${stem2.cn})가 천간합을 이룹니다! 천간합은 두 사람의 영혼이 서로를 끌어당기는 최고의 인연을 의미합니다. ${hap.result}(${hap.element} 기운 생성)으로, 함께 있으면 서로를 완성시키고 부족한 부분을 채워주는 환상의 조합입니다.`,
        detail: '천간합은 사주 궁합에서 가장 강력한 합으로, 운명적인 만남을 의미합니다. 처음 만났을 때부터 묘한 끌림을 느꼈을 가능성이 높고, 함께 있으면 편안하고 자연스러운 관계가 됩니다.'
      };
    }

    // 천간충 체크
    const chungPairs: Record<string, string> = {
      갑: '경', 경: '갑', 을: '신', 신: '을', 병: '임', 임: '병', 정: '계', 계: '정',
    };

    if (chungPairs[stem1.ko] === stem2.ko) {
      return {
        isHap: false,
        type: '천간충',
        element: '',
        score: 35,
        description: `${person1.name}님의 일간 ${stem1.ko}(${stem1.cn})와 ${person2.name}님의 일간 ${stem2.ko}(${stem2.cn})가 천간충 관계입니다. 서로의 의견이 대립하기 쉽고, 갈등이 발생할 수 있습니다.`,
        detail: '천간충은 서로 극하는 관계로, 충돌과 갈등이 잦을 수 있습니다. 하지만 이를 극복하면 오히려 강한 유대감을 형성할 수도 있습니다. 서로의 차이를 인정하고 존중하는 노력이 필요합니다.'
      };
    }

    // 같은 오행인 경우
    if (stem1.element === stem2.element) {
      return {
        isHap: false,
        type: '비겁관계',
        element: stem1.element,
        score: 70,
        description: `두 분 모두 일간이 ${stem1.element} 오행으로 같습니다. 비슷한 성향과 가치관을 가져 서로를 잘 이해하지만, 때로는 서로 양보하지 않아 충돌할 수 있습니다.`,
        detail: '같은 오행의 일간은 서로의 마음을 잘 이해하고 공감대가 넓습니다. 다만 비슷한 점이 많아 경쟁 의식이 생기거나, 서로 양보하지 않는 상황이 발생할 수 있습니다.'
      };
    }

    // 상생 관계
    const generateRelation: Record<string, string> = {
      목: '화', 화: '토', 토: '금', 금: '수', 수: '목'
    };

    if (generateRelation[stem1.element] === stem2.element) {
      return {
        isHap: false,
        type: '상생(나→상대)',
        element: '',
        score: 75,
        description: `${person1.name}님의 ${stem1.element}이(가) ${person2.name}님의 ${stem2.element}을(를) 생(生)해주는 관계입니다. ${person1.name}님이 ${person2.name}님을 도와주고 지원해주는 형태의 관계가 됩니다.`,
        detail: '상생 관계는 한 사람이 다른 사람에게 힘을 주는 관계입니다. 주는 쪽은 헌신적이 되기 쉽고, 받는 쪽은 감사함을 표현하는 것이 관계 유지에 중요합니다.'
      };
    }

    if (generateRelation[stem2.element] === stem1.element) {
      return {
        isHap: false,
        type: '상생(상대→나)',
        element: '',
        score: 75,
        description: `${person2.name}님의 ${stem2.element}이(가) ${person1.name}님의 ${stem1.element}을(를) 생(生)해주는 관계입니다. ${person2.name}님이 ${person1.name}님을 도와주고 지원해주는 형태의 관계가 됩니다.`,
        detail: '상생 관계는 조화롭고 안정적인 관계를 형성합니다. 서로의 역할이 명확해지면 더욱 좋은 파트너십을 발휘할 수 있습니다.'
      };
    }

    // 상극 관계
    const overcomeRelation: Record<string, string> = {
      목: '토', 토: '수', 수: '화', 화: '금', 금: '목'
    };

    if (overcomeRelation[stem1.element] === stem2.element) {
      return {
        isHap: false,
        type: '상극(나→상대)',
        element: '',
        score: 50,
        description: `${person1.name}님의 ${stem1.element}이(가) ${person2.name}님의 ${stem2.element}을(를) 극(克)하는 관계입니다. ${person1.name}님이 주도권을 가지기 쉬우나, ${person2.name}님이 억압받는 느낌을 받을 수 있습니다.`,
        detail: '상극 관계는 긴장과 갈등이 있을 수 있지만, 서로 자극을 주고 성장시키는 관계가 될 수도 있습니다. 존중과 배려가 특히 중요합니다.'
      };
    }

    return {
      isHap: false,
      type: '일반',
      element: '',
      score: 60,
      description: `두 분의 일간은 특별한 합이나 충 관계는 아닙니다. 서로 다른 개성을 가지고 있어, 노력에 따라 관계가 달라질 수 있습니다.`,
      detail: '특별한 합이나 충이 없다고 해서 나쁜 것은 아닙니다. 오히려 서로의 노력과 배려로 관계를 만들어갈 수 있는 여지가 큽니다.'
    };
  };

  // ===== 지지 궁합 분석 =====
  const getBranchAnalysis = () => {
    // 육합 (六合)
    const yukHapPairs: Record<string, { partner: string; result: string }> = {
      자: { partner: '축', result: '자축합토' },
      축: { partner: '자', result: '자축합토' },
      인: { partner: '해', result: '인해합목' },
      해: { partner: '인', result: '인해합목' },
      묘: { partner: '술', result: '묘술합화' },
      술: { partner: '묘', result: '묘술합화' },
      진: { partner: '유', result: '진유합금' },
      유: { partner: '진', result: '진유합금' },
      사: { partner: '신', result: '사신합수' },
      신: { partner: '사', result: '사신합수' },
      오: { partner: '미', result: '오미합' },
      미: { partner: '오', result: '오미합' },
    };

    const yukHap = yukHapPairs[branch1.ko];
    if (yukHap && yukHap.partner === branch2.ko) {
      return {
        type: '육합',
        score: 90,
        description: `${person1.name}님의 일지 ${branch1.ko}(${branch1.cn})와 ${person2.name}님의 일지 ${branch2.ko}(${branch2.cn})가 육합(六合)을 이룹니다! 육합은 두 사람이 함께 있으면 서로에게 힘이 되고, 일상에서 자연스럽게 조화를 이루는 최고의 궁합입니다.`,
        detail: '육합은 실생활에서 가장 좋은 궁합으로, 함께 살면서 서로 부족한 점을 채워주고, 갈등이 생겨도 쉽게 화해하는 관계입니다. 결혼 궁합으로 매우 좋습니다.'
      };
    }

    // 지지충 (六沖)
    const chungPairs: Record<string, string> = {
      자: '오', 오: '자', 축: '미', 미: '축', 인: '신', 신: '인',
      묘: '유', 유: '묘', 진: '술', 술: '진', 사: '해', 해: '사',
    };

    if (chungPairs[branch1.ko] === branch2.ko) {
      return {
        type: '지지충',
        score: 30,
        description: `${person1.name}님의 일지 ${branch1.ko}(${branch1.cn})와 ${person2.name}님의 일지 ${branch2.ko}(${branch2.cn})가 지지충(六沖) 관계입니다. 가치관, 생활 방식, 성격 면에서 충돌이 발생하기 쉽습니다.`,
        detail: '지지충은 서로 정반대의 성향을 가져 부딪히기 쉬운 관계입니다. 하지만 서로의 차이를 인정하고 배우려는 자세가 있다면, 오히려 서로를 성장시키는 관계가 될 수 있습니다. 큰 노력이 필요합니다.'
      };
    }

    // 삼합 체크
    const samHapGroups = [
      { branches: ['인', '오', '술'], element: '화' },
      { branches: ['신', '자', '진'], element: '수' },
      { branches: ['사', '유', '축'], element: '금' },
      { branches: ['해', '묘', '미'], element: '목' },
    ];

    for (const group of samHapGroups) {
      if (group.branches.includes(branch1.ko) && group.branches.includes(branch2.ko) && branch1.ko !== branch2.ko) {
        return {
          type: '삼합',
          score: 85,
          description: `두 분의 일지가 ${group.element}국 삼합(三合) 관계입니다. 삼합은 같은 목표를 향해 함께 나아가는 동반자적 관계로, 큰 일을 함께 도모하기에 좋습니다.`,
          detail: '삼합은 서로의 힘을 합쳐 더 큰 것을 이루는 관계입니다. 특히 사업이나 공동의 목표가 있을 때 시너지를 발휘합니다.'
        };
      }
    }

    // 형 (刑) 체크
    const hyungPairs: Record<string, string[]> = {
      인: ['사', '신'], 사: ['인', '신'], 신: ['인', '사'],
      축: ['술', '미'], 술: ['축', '미'], 미: ['축', '술'],
      자: ['묘'], 묘: ['자'],
    };

    if (hyungPairs[branch1.ko]?.includes(branch2.ko)) {
      return {
        type: '형',
        score: 40,
        description: `두 분의 일지가 형(刑) 관계입니다. 서로에게 상처를 주거나 갈등을 유발하기 쉬운 관계로, 말과 행동에 주의가 필요합니다.`,
        detail: '형 관계는 서로 아끼는 마음이 있어도 표현이 잘못되어 상처를 주기 쉽습니다. 의도와 다르게 말이 전달될 수 있으니, 대화 시 신중함이 필요합니다.'
      };
    }

    // 같은 지지인 경우
    if (branch1.ko === branch2.ko) {
      return {
        type: '복음',
        score: 65,
        description: `두 분의 일지가 같은 ${branch1.ko}(${branch1.cn})입니다. 비슷한 생활 방식과 가치관을 가지고 있어 이해하기 쉽지만, 비슷한 점이 오히려 갈등의 원인이 될 수도 있습니다.`,
        detail: '같은 지지는 편안함을 주지만, 서로 양보하지 않으면 평행선을 달리기도 합니다.'
      };
    }

    return {
      type: '일반',
      score: 55,
      description: `두 분의 일지는 특별한 합이나 충 관계는 아닙니다. 서로의 생활 방식을 존중하면서 조율해 나갈 수 있는 관계입니다.`,
      detail: '특별한 길흉이 없어 본인들의 노력으로 관계를 만들어갈 수 있습니다.'
    };
  };

  // ===== 오행 조화 분석 =====
  const getElementHarmony = () => {
    // 서로 부족한 오행을 채워주는지 확인
    const def1 = result1.elementBalance.deficiency;
    const def2 = result2.elementBalance.deficiency;
    const exc1 = result1.elementBalance.excess;
    const exc2 = result2.elementBalance.excess;

    let complementScore = 0;
    const complementDetails: string[] = [];

    // 상대의 과다한 오행이 나의 부족한 오행인 경우 (상호 보완)
    for (const elem of def1) {
      if (exc2.includes(elem)) {
        complementScore += 15;
        complementDetails.push(`${person2.name}님의 과다한 ${elem}이(가) ${person1.name}님의 부족한 ${elem}을(를) 보완`);
      }
    }

    for (const elem of def2) {
      if (exc1.includes(elem)) {
        complementScore += 15;
        complementDetails.push(`${person1.name}님의 과다한 ${elem}이(가) ${person2.name}님의 부족한 ${elem}을(를) 보완`);
      }
    }

    // 기본 점수
    let baseScore = 60;

    // 용신이 일치하거나 상생하는 경우
    if (result1.yongsin === result2.yongsin) {
      baseScore += 10;
      complementDetails.push('두 분의 용신이 같아 같은 방향을 바라봅니다');
    }

    const totalScore = Math.min(baseScore + complementScore, 100);

    return {
      score: totalScore,
      details: complementDetails,
      description: complementDetails.length > 0
        ? `두 분의 오행은 서로를 보완하는 좋은 조합입니다. ${complementDetails.join('. ')}.`
        : '두 분의 오행은 특별히 보완하거나 충돌하는 관계는 아닙니다. 서로의 개성을 존중하면서 함께 성장할 수 있습니다.'
    };
  };

  // ===== 관계 유형별 궁합 분석 =====
  const getRelationshipSpecificAnalysis = () => {
    const stemAnalysis = getStemHapAnalysis();
    const branchAnalysis = getBranchAnalysis();

    switch (relationshipType) {
      case 'lover':
        return {
          title: '연인 궁합',
          icon: Heart,
          color: 'pink',
          aspects: [
            {
              name: '첫 만남의 끌림',
              score: stemAnalysis.isHap ? 95 : stemAnalysis.score,
              description: stemAnalysis.isHap
                ? '운명적인 끌림을 느꼈을 가능성이 높습니다. 처음 만났을 때부터 서로에게 강한 인상을 남겼을 것입니다.'
                : '자연스러운 만남으로 시작된 관계입니다. 시간이 지나면서 서로의 매력을 발견해나갈 수 있습니다.'
            },
            {
              name: '연애 스타일 조화',
              score: branchAnalysis.score,
              description: branchAnalysis.type === '육합'
                ? '연애 스타일이 잘 맞아 함께 있으면 편안하고 즐겁습니다. 데이트도 취향이 비슷해 갈등이 적습니다.'
                : branchAnalysis.type === '지지충'
                  ? '연애 스타일이 달라 조율이 필요합니다. 서로의 방식을 존중하고 중간점을 찾아야 합니다.'
                  : '적당히 비슷하고 적당히 달라, 서로에게 새로움을 줄 수 있는 관계입니다.'
            },
            {
              name: '감정적 유대감',
              score: Math.round((stemAnalysis.score + branchAnalysis.score) / 2),
              description: '두 분의 감정적 교류와 공감 능력에 대한 분석입니다. 서로의 마음을 읽고 위로해줄 수 있는 관계인지 살펴봅니다.'
            },
            {
              name: '장기 연애 가능성',
              score: Math.round((stemAnalysis.score * 0.6 + branchAnalysis.score * 0.4)),
              description: stemAnalysis.isHap || branchAnalysis.type === '육합'
                ? '오래 연애해도 서로에게 질리지 않고, 관계가 깊어질 가능성이 높습니다.'
                : '꾸준한 노력과 대화로 관계를 유지해나가야 합니다. 서로를 위한 시간을 확보하세요.'
            }
          ]
        };

      case 'spouse':
        return {
          title: '부부/결혼 궁합',
          icon: Home,
          color: 'purple',
          aspects: [
            {
              name: '가정 운영 조화',
              score: branchAnalysis.type === '육합' ? 92 : branchAnalysis.score + 5,
              description: branchAnalysis.type === '육합'
                ? '함께 가정을 꾸리면 역할 분담이 자연스럽고, 갈등 없이 살림을 꾸려나갈 수 있습니다.'
                : '가사 분담과 생활 습관에서 조율이 필요할 수 있습니다. 미리 역할을 정해두면 좋습니다.'
            },
            {
              name: '경제관념 일치도',
              score: stem1.element === stem2.element ? 75 : (stemAnalysis.isHap ? 85 : 65),
              description: '돈에 대한 가치관과 소비 패턴에 대한 분석입니다. 결혼 생활에서 경제적 갈등은 큰 이슈가 될 수 있습니다.'
            },
            {
              name: '시댁/처가 관계',
              score: 60 + Math.floor(Math.random() * 20),
              description: '양가 어른들과의 관계 운입니다. 서로의 가족을 존중하고 배려하는 것이 중요합니다.'
            },
            {
              name: '자녀 복',
              score: branchAnalysis.type === '육합' || stemAnalysis.isHap ? 85 : 70,
              description: '자녀를 통해 행복을 느끼고, 좋은 부모가 될 수 있는 조합인지 살펴봅니다.'
            },
            {
              name: '노후 동반자 운',
              score: Math.round((stemAnalysis.score + branchAnalysis.score) / 2) + 5,
              description: '나이 들어서도 서로 의지하며 행복하게 살 수 있는 관계인지 분석합니다.'
            }
          ]
        };

      case 'friend':
        return {
          title: '우정 궁합',
          icon: Users,
          color: 'cyan',
          aspects: [
            {
              name: '대화 궁합',
              score: stem1.element === stem2.element ? 85 : stemAnalysis.score + 5,
              description: '대화가 잘 통하고, 서로의 말에 공감하며 즐거운 대화를 나눌 수 있는지 분석합니다.'
            },
            {
              name: '취미 공유 가능성',
              score: branchAnalysis.score + 10,
              description: '함께 즐길 수 있는 취미나 관심사가 있는지, 여가 시간을 함께 보내기 좋은지 분석합니다.'
            },
            {
              name: '신뢰와 비밀 유지',
              score: stemAnalysis.isHap ? 90 : 70,
              description: '서로의 비밀을 지켜주고, 어려울 때 의지할 수 있는 관계인지 살펴봅니다.'
            },
            {
              name: '우정 지속성',
              score: Math.round((stemAnalysis.score + branchAnalysis.score) / 2),
              description: '오랜 세월이 지나도 변치 않는 우정을 유지할 수 있는 조합인지 분석합니다.'
            }
          ]
        };

      case 'business':
        return {
          title: '사업/동업 궁합',
          icon: Wallet,
          color: 'amber',
          aspects: [
            {
              name: '업무 스타일 조화',
              score: branchAnalysis.type === '삼합' ? 90 : branchAnalysis.score,
              description: branchAnalysis.type === '삼합'
                ? '함께 일하면 시너지가 발생합니다. 큰 프로젝트를 함께 성공시킬 수 있는 조합입니다.'
                : '업무 방식에서 조율이 필요할 수 있습니다. 역할 분담을 명확히 하세요.'
            },
            {
              name: '의사결정 조화',
              score: stemAnalysis.score,
              description: '중요한 결정을 내릴 때 의견이 맞는지, 갈등 없이 합의에 도달할 수 있는지 분석합니다.'
            },
            {
              name: '재물 운 상승효과',
              score: stemAnalysis.isHap || branchAnalysis.type === '삼합' ? 85 : 65,
              description: '함께 사업을 하면 재물 운이 상승하는지, 서로에게 금전적 도움이 되는지 분석합니다.'
            },
            {
              name: '위기 대응 능력',
              score: 60 + (stem1.element !== stem2.element ? 15 : 0),
              description: '사업에 위기가 왔을 때 함께 극복할 수 있는 조합인지 살펴봅니다. 다양한 관점이 오히려 강점이 됩니다.'
            }
          ]
        };

      default:
        return null;
    }
  };

  // 계산
  const stemAnalysis = getStemHapAnalysis();
  const branchAnalysis = getBranchAnalysis();
  const elementHarmony = getElementHarmony();
  const relationshipAnalysis = getRelationshipSpecificAnalysis();

  // 총합 점수
  const overallScore = Math.round(
    stemAnalysis.score * 0.35 +
    branchAnalysis.score * 0.35 +
    elementHarmony.score * 0.3
  );

  // 점수별 색상
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 70) return 'text-blue-400';
    if (score >= 55) return 'text-amber-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 85) return 'from-green-500 to-emerald-600';
    if (score >= 70) return 'from-blue-500 to-cyan-600';
    if (score >= 55) return 'from-amber-500 to-yellow-600';
    if (score >= 40) return 'from-orange-500 to-amber-600';
    return 'from-red-500 to-rose-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return '천생연분';
    if (score >= 80) return '최상의 궁합';
    if (score >= 70) return '좋은 궁합';
    if (score >= 60) return '무난한 궁합';
    if (score >= 50) return '노력 필요';
    if (score >= 40) return '주의 필요';
    return '많은 노력 필요';
  };

  // 장점/단점 도출
  const getStrengthsAndWeaknesses = () => {
    const strengths: string[] = [];
    const weaknesses: string[] = [];

    if (stemAnalysis.isHap) {
      strengths.push('천간합으로 영혼의 파트너 - 서로 끌리고 이해하는 최고의 인연');
    }
    if (branchAnalysis.type === '육합') {
      strengths.push('육합으로 일상의 조화 - 함께 살면 서로에게 힘이 되는 관계');
    }
    if (branchAnalysis.type === '삼합') {
      strengths.push('삼합으로 공동 목표 달성 - 함께 큰 일을 이룰 수 있는 동반자');
    }
    if (elementHarmony.details.length > 0) {
      strengths.push('오행이 상호 보완 - 서로의 부족한 점을 채워주는 관계');
    }
    if (stem1.element === stem2.element) {
      strengths.push('같은 오행의 일간 - 서로를 깊이 이해하고 공감대가 넓음');
    }

    if (branchAnalysis.type === '지지충') {
      weaknesses.push('지지충으로 가치관 충돌 - 생활 방식과 습관이 달라 조율 필요');
    }
    if (branchAnalysis.type === '형') {
      weaknesses.push('형 관계로 말실수 주의 - 의도치 않게 상처를 주기 쉬움');
    }
    if (stemAnalysis.type === '천간충') {
      weaknesses.push('천간충으로 의견 대립 - 중요한 결정에서 갈등 가능');
    }
    if (stemAnalysis.type.includes('상극')) {
      weaknesses.push('상극 관계 - 한쪽이 주도하고 다른 쪽이 맞추는 형태 주의');
    }

    if (strengths.length === 0) {
      strengths.push('특별한 길흉이 없어 노력으로 관계를 만들어갈 여지가 큼');
    }
    if (weaknesses.length === 0) {
      weaknesses.push('특별히 주의할 점은 없으나, 꾸준한 소통과 배려가 필요');
    }

    return { strengths, weaknesses };
  };

  const { strengths, weaknesses } = getStrengthsAndWeaknesses();

  // 월별 커플 운세
  const getMonthlyCoupleFortune = () => {
    const currentMonth = new Date().getMonth() + 1;
    const fortunes = [
      { month: 1, title: '새해 첫 달', fortune: '새로운 시작의 에너지가 가득합니다. 함께 새해 목표를 세워보세요.', activity: '새해 계획 세우기, 소원 빌기', lucky: '흰색, 금색' },
      { month: 2, title: '사랑의 달', fortune: '로맨틱한 기운이 넘칩니다. 감정 표현에 적극적으로 임하세요.', activity: '발렌타인 데이트, 영화 관람', lucky: '빨간색, 분홍색' },
      { month: 3, title: '봄의 시작', fortune: '새로운 활동을 시작하기 좋습니다. 야외 데이트가 행운을 가져옵니다.', activity: '봄꽃 구경, 피크닉', lucky: '연두색, 노란색' },
      { month: 4, title: '성장의 달', fortune: '서로의 성장을 응원하세요. 배움을 함께하면 좋습니다.', activity: '전시회, 클래스 함께 듣기', lucky: '초록색, 하늘색' },
      { month: 5, title: '가정의 달', fortune: '가족을 소개하기 좋은 시기입니다. 진지한 대화가 필요합니다.', activity: '가족 모임, 집에서 요리', lucky: '보라색, 주황색' },
      { month: 6, title: '열정의 달', fortune: '에너지가 넘치는 시기입니다. 액티비티 데이트를 추천합니다.', activity: '수상 스포츠, 등산', lucky: '파란색, 흰색' },
      { month: 7, title: '휴식의 달', fortune: '함께 쉬는 시간이 필요합니다. 여행을 계획해보세요.', activity: '휴가 여행, 바다 데이트', lucky: '청록색, 은색' },
      { month: 8, title: '추억의 달', fortune: '특별한 추억을 만들기 좋습니다. 사진을 많이 찍어두세요.', activity: '포토존 방문, 축제 참여', lucky: '금색, 노란색' },
      { month: 9, title: '안정의 달', fortune: '관계가 안정되는 시기입니다. 미래를 함께 계획하세요.', activity: '가을 나들이, 단풍 구경', lucky: '갈색, 빨간색' },
      { month: 10, title: '수확의 달', fortune: '그동안의 노력이 결실을 맺습니다. 서로에게 감사를 표현하세요.', activity: '와인 데이트, 맛집 탐방', lucky: '주황색, 갈색' },
      { month: 11, title: '감사의 달', fortune: '서로에 대한 감사함을 느끼는 시기입니다. 작은 선물이 큰 기쁨을 줍니다.', activity: '카페 데이트, 선물 교환', lucky: '보라색, 분홍색' },
      { month: 12, title: '마무리의 달', fortune: '한 해를 함께 마무리하세요. 내년 계획을 세우기 좋습니다.', activity: '연말 파티, 크리스마스 데이트', lucky: '빨간색, 초록색' },
    ];
    return fortunes[currentMonth - 1];
  };

  // 데이트 장소 추천
  const getDateRecommendations = () => {
    const element1 = stem1.element;
    const element2 = stem2.element;

    const recommendations: { place: string; reason: string; icon: string }[] = [];

    if (element1 === '목' || element2 === '목') {
      recommendations.push({ place: '숲, 공원, 식물원', reason: '목 기운이 있어 자연 속에서 힐링되는 관계입니다.', icon: '🌲' });
    }
    if (element1 === '화' || element2 === '화') {
      recommendations.push({ place: '영화관, 공연장, 클럽', reason: '화 기운이 있어 열정적인 활동을 함께하면 좋습니다.', icon: '🔥' });
    }
    if (element1 === '토' || element2 === '토') {
      recommendations.push({ place: '카페, 맛집, 집', reason: '토 기운이 있어 편안하고 안정적인 공간이 잘 맞습니다.', icon: '🏠' });
    }
    if (element1 === '금' || element2 === '금') {
      recommendations.push({ place: '미술관, 쇼핑몰, 고급 레스토랑', reason: '금 기운이 있어 세련되고 품격 있는 장소가 어울립니다.', icon: '✨' });
    }
    if (element1 === '수' || element2 === '수') {
      recommendations.push({ place: '바다, 수족관, 스파', reason: '수 기운이 있어 물과 관련된 장소에서 좋은 기운을 받습니다.', icon: '💧' });
    }

    // 공통 추천
    recommendations.push({ place: '여행', reason: '새로운 경험을 함께 하면 관계가 더욱 깊어집니다.', icon: '✈️' });
    recommendations.push({ place: '요리 클래스', reason: '함께 무언가를 만드는 경험이 유대감을 높여줍니다.', icon: '👨‍🍳' });

    return recommendations;
  };

  // 관계 강화 비법
  const getRelationshipTips = () => {
    return [
      { icon: '💬', title: '매일 대화하기', desc: '하루에 최소 15분은 서로의 하루에 대해 이야기하세요. 작은 대화가 큰 신뢰를 쌓습니다.' },
      { icon: '🎁', title: '깜짝 선물하기', desc: '특별한 날이 아니어도 작은 선물이 큰 감동을 줍니다. 상대방이 좋아하는 것을 기억하세요.' },
      { icon: '🤗', title: '스킨십 유지하기', desc: '손잡기, 포옹 등 일상적인 스킨십이 친밀감을 높여줍니다.' },
      { icon: '👂', title: '경청하기', desc: '상대방의 이야기를 끝까지 듣고, 공감을 표현하세요. 조언보다 공감이 먼저입니다.' },
      { icon: '🙏', title: '감사 표현하기', desc: '당연하게 여기지 말고, 작은 것에도 감사를 표현하세요. "고마워"라는 말의 힘은 큽니다.' },
      { icon: '🎯', title: '공동 목표 세우기', desc: '함께 이루고 싶은 목표를 정하고 함께 노력하세요. 여행, 저축, 취미 등 무엇이든 좋습니다.' },
      { icon: '⏰', title: '데이트 정기화하기', desc: '바쁘더라도 정기적인 데이트 시간을 확보하세요. 일주일에 한 번은 꼭 만나세요.' },
      { icon: '🔄', title: '싸운 후 화해하기', desc: '갈등 후에는 반드시 대화로 해결하세요. 하루를 넘기지 마세요.' },
    ];
  };

  // 갈등 해결 방법
  const getConflictResolution = () => {
    const stemScore = stemAnalysis.score;
    const branchScore = branchAnalysis.score;

    const tips: string[] = [];

    if (stemScore < 60 || stemAnalysis.type === '천간충') {
      tips.push('의견이 다를 때는 바로 반박하지 말고, 먼저 상대방의 말을 요약해서 되물어보세요.');
      tips.push('중요한 결정은 감정이 격해졌을 때 하지 말고, 하루 정도 시간을 두고 다시 이야기하세요.');
    }
    if (branchScore < 50 || branchAnalysis.type === '지지충') {
      tips.push('생활 습관이 다를 수 있습니다. 서로의 방식을 존중하고, 타협점을 찾으세요.');
      tips.push('같은 문제로 반복해서 싸운다면, 근본적인 해결책을 함께 찾아보세요.');
    }
    if (branchAnalysis.type === '형') {
      tips.push('말이 의도와 다르게 전달될 수 있습니다. 중요한 이야기는 천천히, 명확하게 하세요.');
      tips.push('화가 났을 때는 바로 말하지 말고, 마음을 가라앉힌 후 대화하세요.');
    }

    // 공통 조언
    tips.push('싸움의 목적은 이기는 것이 아니라 문제를 해결하는 것임을 기억하세요.');
    tips.push('"항상", "절대" 같은 극단적인 표현은 피하세요.');
    tips.push('과거의 잘못을 반복해서 언급하지 마세요. 현재 문제에 집중하세요.');

    return tips.slice(0, 6);
  };

  // 종합 조언
  const getOverallAdvice = () => {
    if (overallScore >= 85) {
      return `${person1.name}님과 ${person2.name}님은 하늘이 맺어준 인연이라 해도 과언이 아닙니다. 서로에게 최고의 파트너가 될 수 있는 조합입니다. 이 좋은 인연을 소중히 여기고, 서로에 대한 감사함을 잊지 마세요. 가끔은 당연하게 여기기 쉬운 것들도 말로 표현해주면 관계가 더욱 깊어질 것입니다.`;
    }
    if (overallScore >= 70) {
      return `${person1.name}님과 ${person2.name}님은 좋은 궁합을 가지고 있습니다. 서로의 장점을 살리고 단점을 보완해주면 더욱 행복한 관계가 될 수 있습니다. 가끔 의견이 다를 때는 상대방의 입장에서 생각해보세요. 작은 배려가 큰 행복을 가져다줍니다.`;
    }
    if (overallScore >= 55) {
      return `${person1.name}님과 ${person2.name}님은 서로 다른 개성을 가진 조합입니다. 차이점을 갈등의 원인으로 보지 말고, 서로를 성장시키는 기회로 삼으세요. 정기적인 대화 시간을 갖고, 서로의 생각과 감정을 나누는 것이 관계 유지의 핵심입니다.`;
    }
    return `${person1.name}님과 ${person2.name}님의 관계는 많은 노력이 필요한 조합입니다. 하지만 사주는 참고일 뿐, 실제 관계는 두 분의 마음과 노력에 달려 있습니다. 서로를 존중하고 이해하려는 자세가 있다면, 어떤 궁합도 극복할 수 있습니다. 갈등이 생겼을 때는 감정적으로 대응하지 말고, 하루 정도 시간을 두고 대화하세요.`;
  };

  // ===== 추가 분석 함수들 =====

  // 성격 분석 (일간 기반)
  const getPersonalityAnalysis = () => {
    const personalities: Record<string, { trait: string; strength: string; weakness: string; love: string; money: string }> = {
      갑: { trait: '리더십이 강하고 진취적', strength: '결단력, 추진력, 정의감', weakness: '고집, 독선적', love: '주도적이고 보호하려 함', money: '큰 사업 선호' },
      을: { trait: '유연하고 적응력이 뛰어남', strength: '포용력, 협동심, 인내력', weakness: '우유부단, 의존적', love: '헌신적이고 맞춰주려 함', money: '안정적인 저축 선호' },
      병: { trait: '열정적이고 밝은 에너지', strength: '사교성, 낙천성, 표현력', weakness: '성급함, 충동적', love: '열렬하고 적극적 표현', money: '통 큰 소비, 기부' },
      정: { trait: '섬세하고 감성적', strength: '배려심, 예술성, 직관력', weakness: '예민함, 질투심', love: '로맨틱하고 감성적', money: '계획적 소비' },
      무: { trait: '듬직하고 신뢰감 있음', strength: '안정감, 포용력, 중재력', weakness: '둔함, 변화 거부', love: '믿음직하고 헌신적', money: '부동산 선호' },
      기: { trait: '꼼꼼하고 실용적', strength: '세심함, 실행력, 저축심', weakness: '소심함, 욕심', love: '현실적이고 실용적', money: '알뜰 저축형' },
      경: { trait: '강인하고 원칙적', strength: '정의감, 결단력, 의리', weakness: '냉정함, 융통성 부족', love: '책임감 강하고 진지', money: '투자 및 사업' },
      신: { trait: '예리하고 완벽주의적', strength: '분석력, 표현력, 미적 감각', weakness: '날카로움, 비판적', love: '표현 능력이 뛰어남', money: '투자 능력 좋음' },
      임: { trait: '지혜롭고 포용력 있음', strength: '통찰력, 적응력, 인내력', weakness: '우유부단, 방황', love: '깊이 있는 사랑', money: '유동적 자산 선호' },
      계: { trait: '섬세하고 직관적', strength: '감수성, 창의력, 순수함', weakness: '불안함, 변덕', love: '감정적이고 순수', money: '감각적 소비' },
    };
    return {
      person1: personalities[stem1.ko] || personalities['갑'],
      person2: personalities[stem2.ko] || personalities['갑'],
    };
  };

  // 애정표현 스타일 분석
  const getLoveExpressionStyle = () => {
    const styles: Record<string, { style: string; like: string; dislike: string; ideal: string }> = {
      목: { style: '성장과 발전을 함께하는 사랑', like: '함께 배우고 성장하기', dislike: '정체된 관계', ideal: '서로를 발전시켜주는 파트너' },
      화: { style: '열정적이고 표현이 풍부한 사랑', like: '스킨십, 이벤트, 서프라이즈', dislike: '차가운 반응, 무관심', ideal: '함께 열정을 나눌 파트너' },
      토: { style: '안정적이고 믿음직한 사랑', like: '편안한 일상, 함께하는 시간', dislike: '불안정함, 급격한 변화', ideal: '든든하게 의지할 파트너' },
      금: { style: '품격 있고 진지한 사랑', like: '약속 지키기, 진심어린 대화', dislike: '가벼움, 거짓말', ideal: '신뢰할 수 있는 파트너' },
      수: { style: '깊이 있고 지적인 사랑', like: '깊은 대화, 정신적 교감', dislike: '피상적인 관계', ideal: '영혼의 파트너' },
    };
    return {
      person1: styles[stem1.element] || styles['토'],
      person2: styles[stem2.element] || styles['토'],
      compatibility: stem1.element === stem2.element ?
        '같은 스타일로 서로를 잘 이해합니다.' :
        '다른 스타일이지만 서로에게 새로움을 줍니다.',
    };
  };

  // 금전 관리 궁합
  const getFinancialCompatibility = () => {
    const element1 = stem1.element;
    const element2 = stem2.element;

    let score = 65;
    let description = '';
    let tips: string[] = [];

    if (element1 === element2) {
      score = 75;
      description = '비슷한 금전관념을 가지고 있어 갈등이 적습니다.';
      tips = ['같은 성향이라 큰 틀에서는 맞지만, 세부 사항에서 조율이 필요할 수 있습니다.'];
    } else if ((element1 === '금' && element2 === '토') || (element1 === '토' && element2 === '금')) {
      score = 85;
      description = '재물 관리에 있어 최고의 조합입니다. 안정적인 자산 축적이 가능합니다.';
      tips = ['함께 부동산이나 안정적인 투자를 고려해보세요.'];
    } else if ((element1 === '수' && element2 === '화') || (element1 === '화' && element2 === '수')) {
      score = 55;
      description = '돈에 대한 관점이 달라 조율이 필요합니다.';
      tips = ['각자의 용돈을 정하고, 공동 자금은 합의 하에 사용하세요.', '큰 지출은 반드시 상의 후 결정하세요.'];
    }

    if (element1 === '화' || element2 === '화') {
      tips.push('화 기운은 통 큰 소비를 하므로, 예산 관리가 필요합니다.');
    }
    if (element1 === '수' || element2 === '수') {
      tips.push('수 기운은 유동적인 자산을 선호하므로, 현금 흐름 관리가 중요합니다.');
    }

    return { score, description, tips };
  };

  // 의사소통 스타일 분석
  const getCommunicationStyle = () => {
    const styles: Record<string, { speak: string; listen: string; conflict: string }> = {
      목: { speak: '논리적이고 설득력 있게', listen: '핵심을 빠르게 파악', conflict: '정면 돌파 선호' },
      화: { speak: '열정적이고 감정적으로', listen: '분위기와 감정 중시', conflict: '즉각적인 표현' },
      토: { speak: '신중하고 천천히', listen: '끝까지 경청', conflict: '참다가 폭발' },
      금: { speak: '간결하고 핵심적으로', listen: '비판적으로 분석', conflict: '차갑게 대응' },
      수: { speak: '우회적이고 깊이 있게', listen: '숨은 의미 파악', conflict: '피하거나 무시' },
    };
    return {
      person1: styles[stem1.element] || styles['토'],
      person2: styles[stem2.element] || styles['토'],
    };
  };

  // 라이프스타일 궁합
  const getLifestyleCompatibility = () => {
    const lifestyles: Record<string, { morning: string; weekend: string; vacation: string; home: string }> = {
      목: { morning: '일찍 일어나 활동적', weekend: '자기계발, 등산', vacation: '트레킹, 자연 여행', home: '식물, 원목 인테리어' },
      화: { morning: '에너지 넘치는 아침', weekend: '파티, 모임, 운동', vacation: '리조트, 축제', home: '밝고 화려한 인테리어' },
      토: { morning: '여유로운 아침 식사', weekend: '집에서 휴식', vacation: '편안한 호캉스', home: '아늑하고 편안한 공간' },
      금: { morning: '정돈된 루틴', weekend: '문화생활, 쇼핑', vacation: '고급 여행', home: '모던하고 깔끔한 인테리어' },
      수: { morning: '느긋한 시작', weekend: '독서, 영화 감상', vacation: '바다, 온천', home: '아쿠아리움, 블루톤' },
    };
    const ls1 = lifestyles[stem1.element] || lifestyles['토'];
    const ls2 = lifestyles[stem2.element] || lifestyles['토'];

    let matchScore = 65;
    if (stem1.element === stem2.element) matchScore = 85;
    else if (['목', '화'].includes(stem1.element) && ['목', '화'].includes(stem2.element)) matchScore = 80;
    else if (['토', '금', '수'].includes(stem1.element) && ['토', '금', '수'].includes(stem2.element)) matchScore = 75;

    return { person1: ls1, person2: ls2, score: matchScore };
  };

  // 띠 궁합 분석
  const getZodiacCompatibility = () => {
    const zodiacFromBranch: Record<string, { animal: string; traits: string }> = {
      자: { animal: '쥐', traits: '영리하고 민첩함' },
      축: { animal: '소', traits: '성실하고 우직함' },
      인: { animal: '호랑이', traits: '용감하고 리더십' },
      묘: { animal: '토끼', traits: '온순하고 감성적' },
      진: { animal: '용', traits: '카리스마와 야망' },
      사: { animal: '뱀', traits: '지혜롭고 신비로움' },
      오: { animal: '말', traits: '자유롭고 활동적' },
      미: { animal: '양', traits: '온화하고 예술적' },
      신: { animal: '원숭이', traits: '재치있고 영리함' },
      유: { animal: '닭', traits: '정직하고 부지런함' },
      술: { animal: '개', traits: '충성스럽고 정의로움' },
      해: { animal: '돼지', traits: '순수하고 관대함' },
    };

    const z1 = zodiacFromBranch[branch1.ko] || { animal: '알수없음', traits: '' };
    const z2 = zodiacFromBranch[branch2.ko] || { animal: '알수없음', traits: '' };

    // 삼합 띠 궁합
    const samhapGroups = [
      ['자', '진', '신'], // 수국
      ['축', '사', '유'], // 금국
      ['인', '오', '술'], // 화국
      ['묘', '미', '해'], // 목국
    ];

    let isSamhap = false;
    for (const group of samhapGroups) {
      if (group.includes(branch1.ko) && group.includes(branch2.ko)) {
        isSamhap = true;
        break;
      }
    }

    // 육합 체크
    const yukHapPairs: Record<string, string> = {
      자: '축', 축: '자', 인: '해', 해: '인', 묘: '술', 술: '묘',
      진: '유', 유: '진', 사: '신', 신: '사', 오: '미', 미: '오',
    };
    const isYukHap = yukHapPairs[branch1.ko] === branch2.ko;

    // 상충 체크
    const chungPairs: Record<string, string> = {
      자: '오', 오: '자', 축: '미', 미: '축', 인: '신', 신: '인',
      묘: '유', 유: '묘', 진: '술', 술: '진', 사: '해', 해: '사',
    };
    const isChung = chungPairs[branch1.ko] === branch2.ko;

    let score = 60;
    let comment = '';
    if (isYukHap) {
      score = 92;
      comment = `${z1.animal}띠와 ${z2.animal}띠는 육합 관계로 최고의 띠 궁합입니다!`;
    } else if (isSamhap) {
      score = 85;
      comment = `${z1.animal}띠와 ${z2.animal}띠는 삼합 관계로 함께하면 시너지가 납니다.`;
    } else if (isChung) {
      score = 35;
      comment = `${z1.animal}띠와 ${z2.animal}띠는 상충 관계로 노력이 필요합니다.`;
    } else {
      comment = `${z1.animal}띠와 ${z2.animal}띠는 무난한 관계입니다.`;
    }

    return { zodiac1: z1, zodiac2: z2, score, comment, isYukHap, isSamhap, isChung };
  };

  // 나이 궁합 분석
  const getAgeCompatibility = () => {
    const age1 = new Date().getFullYear() - person1.year;
    const age2 = new Date().getFullYear() - person2.year;
    const ageDiff = Math.abs(age1 - age2);
    const older = age1 > age2 ? person1.name : person2.name;
    const younger = age1 > age2 ? person2.name : person1.name;

    let score = 80;
    let comment = '';
    let tips: string[] = [];

    if (ageDiff === 0) {
      score = 85;
      comment = '동갑으로 친구 같은 편안한 관계가 될 수 있습니다.';
      tips = ['서로 존중하고 대등한 관계를 유지하세요.', '친구처럼 편하면서도 연인으로서의 설렘을 잃지 마세요.'];
    } else if (ageDiff <= 3) {
      score = 90;
      comment = '1~3살 차이는 가장 이상적인 나이 차이입니다.';
      tips = ['비슷한 세대로 문화적 공감대가 높습니다.', '자연스러운 호칭과 대화가 가능합니다.'];
    } else if (ageDiff <= 6) {
      score = 80;
      comment = '적당한 나이 차이로 서로 배울 점이 있습니다.';
      tips = [`${older}님은 ${younger}님의 신선함을 즐기세요.`, `${younger}님은 ${older}님의 경험을 배우세요.`];
    } else if (ageDiff <= 10) {
      score = 70;
      comment = '세대 차이가 있지만 서로 보완할 수 있습니다.';
      tips = ['세대 차이로 인한 문화적 갭을 인정하세요.', '서로의 세계를 존중하고 배워나가세요.'];
    } else {
      score = 60;
      comment = '큰 나이 차이지만 진정한 사랑 앞에 나이는 숫자일 뿐입니다.';
      tips = ['주변의 시선보다 두 사람의 마음이 중요합니다.', '각자의 생활 패턴을 존중해주세요.'];
    }

    return { age1, age2, ageDiff, older, younger, score, comment, tips };
  };

  // 연애/결혼 시기 분석
  const getTimingAnalysis = () => {
    const currentYear = new Date().getFullYear();
    const analyses = [];

    for (let year = currentYear; year <= currentYear + 3; year++) {
      const yearNum = year % 10;
      const stemMatch = (yearNum === 0 || yearNum === 1) ? '갑을' :
                       (yearNum === 2 || yearNum === 3) ? '병정' :
                       (yearNum === 4 || yearNum === 5) ? '무기' :
                       (yearNum === 6 || yearNum === 7) ? '경신' : '임계';

      let fortune = '';
      let score = 60;

      if (stemMatch.includes(stem1.ko) || stemMatch.includes(stem2.ko)) {
        fortune = '두 분 중 한 분에게 변화의 해입니다.';
        score = 75;
      }
      if ((year - 4) % 12 === 0 || (year - 5) % 12 === 0) { // 용띠, 뱀띠 해
        fortune += ' 결혼하기 좋은 해입니다.';
        score = 85;
      }

      analyses.push({ year, fortune: fortune || '평온한 한 해가 될 것입니다.', score });
    }

    return analyses;
  };

  // 연간 커플 운세 (12개월)
  const getFullYearCoupleFortune = () => {
    const fortunes = [
      { month: 1, title: '새해 첫 달', fortune: '새로운 시작의 에너지가 가득합니다. 함께 새해 목표를 세워보세요.', activity: '새해 계획 세우기, 소원 빌기', lucky: '흰색, 금색', score: 80 },
      { month: 2, title: '사랑의 달', fortune: '로맨틱한 기운이 넘칩니다. 감정 표현에 적극적으로 임하세요.', activity: '발렌타인 데이트, 영화 관람', lucky: '빨간색, 분홍색', score: 90 },
      { month: 3, title: '봄의 시작', fortune: '새로운 활동을 시작하기 좋습니다. 야외 데이트가 행운을 가져옵니다.', activity: '봄꽃 구경, 피크닉', lucky: '연두색, 노란색', score: 85 },
      { month: 4, title: '성장의 달', fortune: '서로의 성장을 응원하세요. 배움을 함께하면 좋습니다.', activity: '전시회, 클래스 함께 듣기', lucky: '초록색, 하늘색', score: 75 },
      { month: 5, title: '가정의 달', fortune: '가족을 소개하기 좋은 시기입니다. 진지한 대화가 필요합니다.', activity: '가족 모임, 집에서 요리', lucky: '보라색, 주황색', score: 70 },
      { month: 6, title: '열정의 달', fortune: '에너지가 넘치는 시기입니다. 액티비티 데이트를 추천합니다.', activity: '수상 스포츠, 등산', lucky: '파란색, 흰색', score: 85 },
      { month: 7, title: '휴식의 달', fortune: '함께 쉬는 시간이 필요합니다. 여행을 계획해보세요.', activity: '휴가 여행, 바다 데이트', lucky: '청록색, 은색', score: 80 },
      { month: 8, title: '추억의 달', fortune: '특별한 추억을 만들기 좋습니다. 사진을 많이 찍어두세요.', activity: '포토존 방문, 축제 참여', lucky: '금색, 노란색', score: 85 },
      { month: 9, title: '안정의 달', fortune: '관계가 안정되는 시기입니다. 미래를 함께 계획하세요.', activity: '가을 나들이, 단풍 구경', lucky: '갈색, 빨간색', score: 75 },
      { month: 10, title: '수확의 달', fortune: '그동안의 노력이 결실을 맺습니다. 서로에게 감사를 표현하세요.', activity: '와인 데이트, 맛집 탐방', lucky: '주황색, 갈색', score: 90 },
      { month: 11, title: '감사의 달', fortune: '서로에 대한 감사함을 느끼는 시기입니다. 작은 선물이 큰 기쁨을 줍니다.', activity: '카페 데이트, 선물 교환', lucky: '보라색, 분홍색', score: 80 },
      { month: 12, title: '마무리의 달', fortune: '한 해를 함께 마무리하세요. 내년 계획을 세우기 좋습니다.', activity: '연말 파티, 크리스마스 데이트', lucky: '빨간색, 초록색', score: 85 },
    ];
    return fortunes;
  };

  // 행운의 아이템/시간대
  const getLuckyItems = () => {
    const elements = [stem1.element, stem2.element];
    const items: { color: string; direction: string; number: string; time: string; food: string; place: string }[] = [];

    const luckyByElement: Record<string, { color: string; direction: string; number: string; time: string; food: string; place: string }> = {
      목: { color: '초록색, 청색', direction: '동쪽', number: '3, 8', time: '아침 5~9시', food: '채소, 신맛 음식', place: '공원, 숲' },
      화: { color: '빨간색, 보라색', direction: '남쪽', number: '2, 7', time: '낮 11~13시', food: '매운 음식, 고기', place: '카페, 레스토랑' },
      토: { color: '노란색, 갈색', direction: '중앙', number: '5, 10', time: '오후 13~17시', food: '단맛 음식, 곡류', place: '집, 카페' },
      금: { color: '흰색, 금색', direction: '서쪽', number: '4, 9', time: '저녁 17~21시', food: '매운맛, 흰색 음식', place: '미술관, 쇼핑몰' },
      수: { color: '검은색, 파란색', direction: '북쪽', number: '1, 6', time: '밤 21~1시', food: '짠맛 음식, 해산물', place: '바다, 수족관' },
    };

    elements.forEach(el => {
      if (luckyByElement[el]) items.push(luckyByElement[el]);
    });

    return items;
  };

  // 미래 예측 (1년, 5년, 10년)
  const getFuturePrediction = () => {
    const baseScore = overallScore;
    return {
      year1: {
        score: Math.min(100, baseScore + Math.floor(Math.random() * 10) - 3),
        prediction: baseScore >= 70
          ? '첫 해는 서로를 알아가는 시기입니다. 다양한 경험을 함께 하면서 관계가 더욱 깊어질 것입니다.'
          : '첫 해는 서로 적응하는 시기입니다. 작은 갈등이 있을 수 있지만, 이를 통해 서로를 더 잘 이해하게 됩니다.',
      },
      year5: {
        score: Math.min(100, baseScore + Math.floor(Math.random() * 15) - 5),
        prediction: baseScore >= 70
          ? '5년 후에는 안정적인 관계가 형성됩니다. 결혼이나 동거 등 큰 결정을 하기 좋은 시기입니다.'
          : '5년 후에는 많은 것이 변해있을 것입니다. 꾸준한 노력이 관계를 더욱 단단하게 만듭니다.',
      },
      year10: {
        score: Math.min(100, baseScore + Math.floor(Math.random() * 20) - 5),
        prediction: baseScore >= 70
          ? '10년 후에는 서로 없이는 상상할 수 없는 깊은 유대감을 형성하게 됩니다. 함께한 추억이 큰 자산이 됩니다.'
          : '10년의 세월 동안 함께 성장하고 변화합니다. 노력한 만큼 보람 있는 관계가 될 것입니다.',
      },
    };
  };

  // 계산된 추가 분석
  const personalityAnalysis = getPersonalityAnalysis();
  const loveExpression = getLoveExpressionStyle();
  const financialCompat = getFinancialCompatibility();
  const commStyle = getCommunicationStyle();
  const lifestyleCompat = getLifestyleCompatibility();
  const zodiacCompat = getZodiacCompatibility();
  const ageCompat = getAgeCompatibility();
  const timingAnalysis = getTimingAnalysis();
  const fullYearFortune = getFullYearCoupleFortune();
  const luckyItems = getLuckyItems();
  const futurePrediction = getFuturePrediction();

  // HTML 다운로드 함수 - 화면 그대로 저장
  const handleDownloadHtml = () => {
    downloadElementAsHtml('compatibility-result', `궁합분석_${person1.name}_${person2.name}`);
  };

  // 이메일 전송 함수
  const handleSendEmail = () => {
    const subject = `[ForceTeller] 사주 궁합 분석 - ${person1.name} ❤️ ${person2.name}`;
    const body = `
━━━━━━━━━━━━━━━━━━━━
💑 사주 궁합 분석
${person1.name}님 ❤️ ${person2.name}님
━━━━━━━━━━━━━━━━━━━━

❤️ 종합 궁합 점수: ${overallScore}점

━━ 분야별 궁합 ━━
• 천간 궁합: ${stemAnalysis.score}점 (${stemAnalysis.description})
• 지지 궁합: ${branchAnalysis.score}점 (${branchAnalysis.description})

━━ 종합 조언 ━━
${getOverallAdvice()}

━━━━━━━━━━━━━━━━━━━━
ForceTeller - AI 운세 서비스
    `.trim();
    sendByEmail(subject, body);
  };

  const handleKakaoShare = () => {
    shareToKakao({
      title: `💕 ${person1.name}님과 ${person2.name}님의 궁합 결과`,
      description: `사주 궁합 점수: ${overallScore}점 | ${getOverallAdvice()}`,
    });
  };

  return (
    <div id="compatibility-result" className="min-h-screen px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* 헤더 */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-5xl mb-4">💑</div>
          <h1
            className="text-3xl md:text-4xl font-bold mb-2 gradient-text"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            사주 궁합 분석
          </h1>
          <p className="text-slate-300 mt-2">
            {person1.name}님 ❤️ {person2.name}님
          </p>
        </motion.div>

        {/* 두 사람 정보 */}
        <motion.div
          className="glass-strong rounded-3xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-blue-400">{person1.name.charAt(0)}</span>
              </div>
              <p className="font-bold text-slate-100">{person1.name}</p>
              <p className="text-sm text-slate-400">{person1.year}년생 · {person1.gender === 'male' ? '남' : '여'}</p>
              <p className="text-sm text-blue-400 mt-1">
                일간: {stem1.ko}({stem1.cn}) {stem1.element}
              </p>
            </div>

            <div className="text-4xl">💕</div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-pink-500/20 flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-pink-400">{person2.name.charAt(0)}</span>
              </div>
              <p className="font-bold text-slate-100">{person2.name}</p>
              <p className="text-sm text-slate-400">{person2.year}년생 · {person2.gender === 'male' ? '남' : '여'}</p>
              <p className="text-sm text-pink-400 mt-1">
                일간: {stem2.ko}({stem2.cn}) {stem2.element}
              </p>
            </div>
          </div>
        </motion.div>

        {/* 종합 점수 */}
        <motion.div
          className="glass-strong rounded-3xl p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-center mb-8 gradient-text">
            종합 궁합 점수
          </h2>

          <div className="flex justify-center mb-6">
            <div className={`w-40 h-40 rounded-full bg-gradient-to-br ${getScoreBg(overallScore)} flex items-center justify-center shadow-2xl`}>
              <div className="text-center">
                <span className="text-5xl font-bold text-white">{overallScore}</span>
                <span className="text-white/80 text-lg block">점</span>
              </div>
            </div>
          </div>

          <p className={`text-center text-2xl font-bold mb-4 ${getScoreColor(overallScore)}`}>
            {getScoreLabel(overallScore)}
          </p>

          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="text-center p-4 bg-slate-800/50 rounded-2xl">
              <p className="text-slate-400 text-sm mb-1">천간 궁합</p>
              <p className={`text-2xl font-bold ${getScoreColor(stemAnalysis.score)}`}>{stemAnalysis.score}점</p>
              <p className="text-xs text-slate-500 mt-1">{stemAnalysis.type}</p>
            </div>
            <div className="text-center p-4 bg-slate-800/50 rounded-2xl">
              <p className="text-slate-400 text-sm mb-1">지지 궁합</p>
              <p className={`text-2xl font-bold ${getScoreColor(branchAnalysis.score)}`}>{branchAnalysis.score}점</p>
              <p className="text-xs text-slate-500 mt-1">{branchAnalysis.type}</p>
            </div>
            <div className="text-center p-4 bg-slate-800/50 rounded-2xl">
              <p className="text-slate-400 text-sm mb-1">오행 조화</p>
              <p className={`text-2xl font-bold ${getScoreColor(elementHarmony.score)}`}>{elementHarmony.score}점</p>
              <p className="text-xs text-slate-500 mt-1">상호보완</p>
            </div>
          </div>
        </motion.div>

        {/* 천간 궁합 상세 */}
        <motion.div
          className="glass-strong rounded-3xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <Sun className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-100">천간(天干) 궁합</h3>
              <p className="text-amber-400 text-sm">두 사람의 영혼과 정신적 교감</p>
            </div>
            <span className={`ml-auto text-2xl font-bold ${getScoreColor(stemAnalysis.score)}`}>
              {stemAnalysis.score}점
            </span>
          </div>

          <div className={`p-4 rounded-2xl mb-4 ${stemAnalysis.isHap ? 'bg-green-500/10 border border-green-500/30' : 'bg-slate-800/50'}`}>
            <p className="text-slate-200 leading-relaxed">{stemAnalysis.description}</p>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">{stemAnalysis.detail}</p>
        </motion.div>

        {/* 지지 궁합 상세 */}
        <motion.div
          className="glass-strong rounded-3xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-100">지지(地支) 궁합</h3>
              <p className="text-cyan-400 text-sm">실생활과 일상의 조화</p>
            </div>
            <span className={`ml-auto text-2xl font-bold ${getScoreColor(branchAnalysis.score)}`}>
              {branchAnalysis.score}점
            </span>
          </div>

          <div className={`p-4 rounded-2xl mb-4 ${branchAnalysis.type === '육합' ? 'bg-green-500/10 border border-green-500/30' : branchAnalysis.type === '지지충' ? 'bg-red-500/10 border border-red-500/30' : 'bg-slate-800/50'}`}>
            <p className="text-slate-200 leading-relaxed">{branchAnalysis.description}</p>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">{branchAnalysis.detail}</p>
        </motion.div>

        {/* 관계 유형별 상세 분석 */}
        {relationshipAnalysis && (
          <motion.div
            className="glass-strong rounded-3xl p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                relationshipAnalysis.color === 'pink' ? 'from-pink-400 to-rose-500' :
                relationshipAnalysis.color === 'purple' ? 'from-purple-400 to-violet-500' :
                relationshipAnalysis.color === 'cyan' ? 'from-cyan-400 to-blue-500' :
                'from-amber-400 to-orange-500'
              } flex items-center justify-center`}>
                <relationshipAnalysis.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-100">{relationshipAnalysis.title} 상세</h3>
            </div>

            <div className="space-y-4">
              {relationshipAnalysis.aspects.map((aspect, index) => (
                <div key={index} className="bg-slate-800/50 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-slate-200">{aspect.name}</span>
                    <span className={`font-bold ${getScoreColor(aspect.score)}`}>{aspect.score}점</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${getScoreBg(aspect.score)}`}
                      style={{ width: `${aspect.score}%` }}
                    />
                  </div>
                  <p className="text-slate-400 text-sm">{aspect.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 장점과 주의점 */}
        <motion.div
          className="grid md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <ThumbsUp className="w-5 h-5 text-green-400" />
              <h4 className="font-bold text-green-400">두 분의 장점</h4>
            </div>
            <ul className="space-y-3">
              {strengths.map((strength, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              <h4 className="font-bold text-orange-400">주의할 점</h4>
            </div>
            <ul className="space-y-3">
              {weaknesses.map((weakness, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                  <span className="text-orange-400 mt-1">!</span>
                  <span>{weakness}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* 종합 조언 */}
        <motion.div
          className="glass-strong rounded-3xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-center mb-6 gradient-text">
            💝 두 분을 위한 조언
          </h3>
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-pink-500/20">
            <p className="text-slate-200 leading-relaxed">{getOverallAdvice()}</p>
          </div>
        </motion.div>

        {/* 이달의 커플 운세 */}
        <motion.div
          className="glass-strong rounded-3xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-100">{new Date().getMonth() + 1}월 커플 운세</h3>
              <p className="text-purple-400 text-sm">{getMonthlyCoupleFortune().title}</p>
            </div>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-5 mb-4">
            <p className="text-slate-200 leading-relaxed mb-4">{getMonthlyCoupleFortune().fortune}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/50 rounded-xl p-3">
                <p className="text-slate-400 text-xs mb-1">추천 활동</p>
                <p className="text-purple-300 text-sm">{getMonthlyCoupleFortune().activity}</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-3">
                <p className="text-slate-400 text-xs mb-1">행운의 색</p>
                <p className="text-purple-300 text-sm">{getMonthlyCoupleFortune().lucky}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 데이트 장소 추천 */}
        <motion.div
          className="glass-strong rounded-3xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-400 to-orange-500 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-100">추천 데이트 장소</h3>
          </div>

          <div className="grid gap-3">
            {getDateRecommendations().slice(0, 5).map((rec, i) => (
              <div key={i} className="bg-slate-800/50 rounded-xl p-4 flex items-start gap-3">
                <span className="text-2xl">{rec.icon}</span>
                <div>
                  <p className="text-slate-100 font-medium">{rec.place}</p>
                  <p className="text-slate-400 text-sm">{rec.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 관계 강화 비법 */}
        <motion.div
          className="glass-strong rounded-3xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-100">관계 강화 비법</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            {getRelationshipTips().map((tip, i) => (
              <div key={i} className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{tip.icon}</span>
                  <span className="text-emerald-400 font-medium">{tip.title}</span>
                </div>
                <p className="text-slate-300 text-sm">{tip.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 갈등 해결 방법 */}
        <motion.div
          className="glass-strong rounded-3xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-100">갈등 해결 방법</h3>
          </div>

          <div className="space-y-3">
            {getConflictResolution().map((tip, i) => (
              <div key={i} className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3">
                <span className="text-amber-400 font-bold">{i + 1}</span>
                <p className="text-slate-300 text-sm">{tip}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 띠 궁합 분석 */}
        <motion.div
          className="glass-strong rounded-3xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-2xl">
              🐲
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-100">띠 궁합 분석</h3>
              <p className="text-orange-400 text-sm">{zodiacCompat.zodiac1.animal}띠 & {zodiacCompat.zodiac2.animal}띠</p>
            </div>
            <span className={`ml-auto text-2xl font-bold ${getScoreColor(zodiacCompat.score)}`}>
              {zodiacCompat.score}점
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
              <p className="text-blue-400 font-medium mb-2">{person1.name}님</p>
              <p className="text-2xl mb-1">{zodiacCompat.zodiac1.animal}띠</p>
              <p className="text-slate-400 text-sm">{zodiacCompat.zodiac1.traits}</p>
            </div>
            <div className="bg-pink-500/10 border border-pink-500/30 rounded-xl p-4">
              <p className="text-pink-400 font-medium mb-2">{person2.name}님</p>
              <p className="text-2xl mb-1">{zodiacCompat.zodiac2.animal}띠</p>
              <p className="text-slate-400 text-sm">{zodiacCompat.zodiac2.traits}</p>
            </div>
          </div>
          <div className={`p-4 rounded-2xl ${zodiacCompat.isYukHap ? 'bg-green-500/10 border border-green-500/30' : zodiacCompat.isChung ? 'bg-red-500/10 border border-red-500/30' : 'bg-slate-800/50'}`}>
            <p className="text-slate-200 leading-relaxed">{zodiacCompat.comment}</p>
          </div>
        </motion.div>

        {/* 성격 분석 */}
        <motion.div
          className="glass-strong rounded-3xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-100">성격 분석</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-5">
              <h4 className="text-blue-400 font-bold mb-3">{person1.name}님 ({stem1.ko}{stem1.cn})</h4>
              <div className="space-y-2 text-sm">
                <p><span className="text-slate-400">성격:</span> <span className="text-slate-200">{personalityAnalysis.person1.trait}</span></p>
                <p><span className="text-slate-400">장점:</span> <span className="text-green-400">{personalityAnalysis.person1.strength}</span></p>
                <p><span className="text-slate-400">단점:</span> <span className="text-orange-400">{personalityAnalysis.person1.weakness}</span></p>
                <p><span className="text-slate-400">연애:</span> <span className="text-pink-400">{personalityAnalysis.person1.love}</span></p>
                <p><span className="text-slate-400">금전:</span> <span className="text-amber-400">{personalityAnalysis.person1.money}</span></p>
              </div>
            </div>
            <div className="bg-pink-500/10 border border-pink-500/30 rounded-2xl p-5">
              <h4 className="text-pink-400 font-bold mb-3">{person2.name}님 ({stem2.ko}{stem2.cn})</h4>
              <div className="space-y-2 text-sm">
                <p><span className="text-slate-400">성격:</span> <span className="text-slate-200">{personalityAnalysis.person2.trait}</span></p>
                <p><span className="text-slate-400">장점:</span> <span className="text-green-400">{personalityAnalysis.person2.strength}</span></p>
                <p><span className="text-slate-400">단점:</span> <span className="text-orange-400">{personalityAnalysis.person2.weakness}</span></p>
                <p><span className="text-slate-400">연애:</span> <span className="text-pink-400">{personalityAnalysis.person2.love}</span></p>
                <p><span className="text-slate-400">금전:</span> <span className="text-amber-400">{personalityAnalysis.person2.money}</span></p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 애정표현 스타일 */}
        <motion.div
          className="glass-strong rounded-3xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-2xl">
              💕
            </div>
            <h3 className="text-xl font-bold text-slate-100">애정표현 스타일</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-4">
            <div className="bg-slate-800/50 rounded-2xl p-5">
              <h4 className="text-blue-400 font-bold mb-3">{person1.name}님</h4>
              <div className="space-y-2 text-sm">
                <p className="text-slate-200">{loveExpression.person1.style}</p>
                <p><span className="text-green-400">👍</span> {loveExpression.person1.like}</p>
                <p><span className="text-red-400">👎</span> {loveExpression.person1.dislike}</p>
                <p><span className="text-purple-400">💜</span> {loveExpression.person1.ideal}</p>
              </div>
            </div>
            <div className="bg-slate-800/50 rounded-2xl p-5">
              <h4 className="text-pink-400 font-bold mb-3">{person2.name}님</h4>
              <div className="space-y-2 text-sm">
                <p className="text-slate-200">{loveExpression.person2.style}</p>
                <p><span className="text-green-400">👍</span> {loveExpression.person2.like}</p>
                <p><span className="text-red-400">👎</span> {loveExpression.person2.dislike}</p>
                <p><span className="text-purple-400">💜</span> {loveExpression.person2.ideal}</p>
              </div>
            </div>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 text-center">
            <p className="text-purple-300">{loveExpression.compatibility}</p>
          </div>
        </motion.div>

        {/* 의사소통 스타일 */}
        <motion.div
          className="glass-strong rounded-3xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-2xl">
              💬
            </div>
            <h3 className="text-xl font-bold text-slate-100">의사소통 스타일</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 rounded-2xl p-5">
              <h4 className="text-blue-400 font-bold mb-3">{person1.name}님</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2"><span className="text-xl">🗣️</span><span className="text-slate-200">{commStyle.person1.speak}</span></div>
                <div className="flex items-center gap-2"><span className="text-xl">👂</span><span className="text-slate-200">{commStyle.person1.listen}</span></div>
                <div className="flex items-center gap-2"><span className="text-xl">⚡</span><span className="text-slate-200">{commStyle.person1.conflict}</span></div>
              </div>
            </div>
            <div className="bg-slate-800/50 rounded-2xl p-5">
              <h4 className="text-pink-400 font-bold mb-3">{person2.name}님</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2"><span className="text-xl">🗣️</span><span className="text-slate-200">{commStyle.person2.speak}</span></div>
                <div className="flex items-center gap-2"><span className="text-xl">👂</span><span className="text-slate-200">{commStyle.person2.listen}</span></div>
                <div className="flex items-center gap-2"><span className="text-xl">⚡</span><span className="text-slate-200">{commStyle.person2.conflict}</span></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 금전 관리 궁합 */}
        <motion.div
          className="glass-strong rounded-3xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-100">금전 관리 궁합</h3>
              <p className="text-amber-400 text-sm">재물 관리 스타일 비교</p>
            </div>
            <span className={`ml-auto text-2xl font-bold ${getScoreColor(financialCompat.score)}`}>
              {financialCompat.score}점
            </span>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 mb-4">
            <p className="text-slate-200 leading-relaxed">{financialCompat.description}</p>
          </div>
          <div className="space-y-2">
            {financialCompat.tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <span className="text-amber-400">💡</span>
                <span className="text-slate-300">{tip}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 라이프스타일 궁합 */}
        <motion.div
          className="glass-strong rounded-3xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-2xl">
              🏡
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-100">라이프스타일 궁합</h3>
              <p className="text-teal-400 text-sm">일상 생활 패턴 비교</p>
            </div>
            <span className={`ml-auto text-2xl font-bold ${getScoreColor(lifestyleCompat.score)}`}>
              {lifestyleCompat.score}점
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 rounded-2xl p-5">
              <h4 className="text-blue-400 font-bold mb-3">{person1.name}님</h4>
              <div className="space-y-2 text-sm">
                <p><span className="text-slate-400">🌅 아침:</span> <span className="text-slate-200">{lifestyleCompat.person1.morning}</span></p>
                <p><span className="text-slate-400">🗓️ 주말:</span> <span className="text-slate-200">{lifestyleCompat.person1.weekend}</span></p>
                <p><span className="text-slate-400">✈️ 휴가:</span> <span className="text-slate-200">{lifestyleCompat.person1.vacation}</span></p>
                <p><span className="text-slate-400">🏠 집:</span> <span className="text-slate-200">{lifestyleCompat.person1.home}</span></p>
              </div>
            </div>
            <div className="bg-slate-800/50 rounded-2xl p-5">
              <h4 className="text-pink-400 font-bold mb-3">{person2.name}님</h4>
              <div className="space-y-2 text-sm">
                <p><span className="text-slate-400">🌅 아침:</span> <span className="text-slate-200">{lifestyleCompat.person2.morning}</span></p>
                <p><span className="text-slate-400">🗓️ 주말:</span> <span className="text-slate-200">{lifestyleCompat.person2.weekend}</span></p>
                <p><span className="text-slate-400">✈️ 휴가:</span> <span className="text-slate-200">{lifestyleCompat.person2.vacation}</span></p>
                <p><span className="text-slate-400">🏠 집:</span> <span className="text-slate-200">{lifestyleCompat.person2.home}</span></p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 나이 궁합 */}
        <motion.div
          className="glass-strong rounded-3xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-2xl">
              📅
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-100">나이 궁합</h3>
              <p className="text-indigo-400 text-sm">{ageCompat.ageDiff}살 차이</p>
            </div>
            <span className={`ml-auto text-2xl font-bold ${getScoreColor(ageCompat.score)}`}>
              {ageCompat.score}점
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-blue-500/10 rounded-xl p-4 text-center">
              <p className="text-blue-400 text-sm">{person1.name}님</p>
              <p className="text-2xl font-bold text-slate-100">{ageCompat.age1}세</p>
            </div>
            <div className="bg-pink-500/10 rounded-xl p-4 text-center">
              <p className="text-pink-400 text-sm">{person2.name}님</p>
              <p className="text-2xl font-bold text-slate-100">{ageCompat.age2}세</p>
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-2xl p-5 mb-4">
            <p className="text-slate-200 leading-relaxed">{ageCompat.comment}</p>
          </div>
          <div className="space-y-2">
            {ageCompat.tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <span className="text-indigo-400">💡</span>
                <span className="text-slate-300">{tip}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 연애/결혼 시기 분석 */}
        <motion.div
          className="glass-strong rounded-3xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-2xl">
              💍
            </div>
            <h3 className="text-xl font-bold text-slate-100">연애/결혼 시기 분석</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {timingAnalysis.map((t, i) => (
              <div key={i} className="bg-slate-800/50 rounded-xl p-4 text-center">
                <p className="text-slate-400 text-sm mb-1">{t.year}년</p>
                <p className={`text-2xl font-bold ${getScoreColor(t.score)}`}>{t.score}점</p>
                <p className="text-slate-400 text-xs mt-2">{t.fortune}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 12개월 커플 운세 */}
        <motion.div
          className="glass-strong rounded-3xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-100">12개월 커플 운세</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {fullYearFortune.map((f, i) => {
              const isCurrentMonth = f.month === new Date().getMonth() + 1;
              return (
                <div key={i} className={`rounded-xl p-4 ${isCurrentMonth ? 'bg-pink-500/20 border-2 border-pink-500' : 'bg-slate-800/50'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-bold ${isCurrentMonth ? 'text-pink-400' : 'text-slate-300'}`}>{f.month}월</span>
                    <span className={`text-sm font-bold ${getScoreColor(f.score)}`}>{f.score}점</span>
                  </div>
                  <p className="text-slate-400 text-xs mb-1">{f.title}</p>
                  <p className="text-slate-300 text-xs line-clamp-2">{f.fortune}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* 미래 예측 */}
        <motion.div
          className="glass-strong rounded-3xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-fuchsia-500 flex items-center justify-center text-2xl">
              🔮
            </div>
            <h3 className="text-xl font-bold text-slate-100">미래 예측</h3>
          </div>
          <div className="space-y-4">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-400 font-bold">📅 1년 후</span>
                <span className={`font-bold ${getScoreColor(futurePrediction.year1.score)}`}>{futurePrediction.year1.score}점</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{futurePrediction.year1.prediction}</p>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-purple-400 font-bold">📅 5년 후</span>
                <span className={`font-bold ${getScoreColor(futurePrediction.year5.score)}`}>{futurePrediction.year5.score}점</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{futurePrediction.year5.prediction}</p>
            </div>
            <div className="bg-pink-500/10 border border-pink-500/30 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-pink-400 font-bold">📅 10년 후</span>
                <span className={`font-bold ${getScoreColor(futurePrediction.year10.score)}`}>{futurePrediction.year10.score}점</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{futurePrediction.year10.prediction}</p>
            </div>
          </div>
        </motion.div>

        {/* 행운의 아이템 */}
        <motion.div
          className="glass-strong rounded-3xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-2xl">
              🍀
            </div>
            <h3 className="text-xl font-bold text-slate-100">행운의 아이템</h3>
          </div>
          <div className="space-y-6">
            {luckyItems.map((item, i) => (
              <div key={i} className="bg-slate-800/50 rounded-2xl p-5">
                <h4 className={`font-bold mb-4 ${i === 0 ? 'text-blue-400' : 'text-pink-400'}`}>{i === 0 ? person1.name : person2.name}님의 행운</h4>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  <div className="text-center p-2 bg-slate-700/50 rounded-xl">
                    <span className="text-xl">🎨</span>
                    <p className="text-xs text-slate-400 mt-1">색상</p>
                    <p className="text-sm text-slate-200">{item.color}</p>
                  </div>
                  <div className="text-center p-2 bg-slate-700/50 rounded-xl">
                    <span className="text-xl">🧭</span>
                    <p className="text-xs text-slate-400 mt-1">방향</p>
                    <p className="text-sm text-slate-200">{item.direction}</p>
                  </div>
                  <div className="text-center p-2 bg-slate-700/50 rounded-xl">
                    <span className="text-xl">🔢</span>
                    <p className="text-xs text-slate-400 mt-1">숫자</p>
                    <p className="text-sm text-slate-200">{item.number}</p>
                  </div>
                  <div className="text-center p-2 bg-slate-700/50 rounded-xl">
                    <span className="text-xl">⏰</span>
                    <p className="text-xs text-slate-400 mt-1">시간</p>
                    <p className="text-sm text-slate-200">{item.time}</p>
                  </div>
                  <div className="text-center p-2 bg-slate-700/50 rounded-xl">
                    <span className="text-xl">🍽️</span>
                    <p className="text-xs text-slate-400 mt-1">음식</p>
                    <p className="text-sm text-slate-200">{item.food}</p>
                  </div>
                  <div className="text-center p-2 bg-slate-700/50 rounded-xl">
                    <span className="text-xl">📍</span>
                    <p className="text-xs text-slate-400 mt-1">장소</p>
                    <p className="text-sm text-slate-200">{item.place}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 응원 메시지 */}
        <motion.div
          className="bg-gradient-to-br from-pink-500/20 to-rose-500/20 border border-pink-500/30 rounded-3xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <Sparkles className="w-8 h-8 text-pink-400 mx-auto mb-4" />
            <p className="text-white text-lg leading-relaxed">
              {person1.name}님과 {person2.name}님,<br />
              <span className="text-pink-400 font-bold">사주는 참고일 뿐, 운명은 만들어가는 것입니다.</span><br />
              서로를 향한 진심이 가장 중요합니다. 💕
            </p>
          </div>
        </motion.div>

        {/* 내보내기 버튼 */}
        <div className="space-y-3 pt-4">
          <div className="grid grid-cols-3 gap-3">
            <motion.button
              onClick={handleDownloadHtml}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-white font-medium hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-5 h-5" />
              <span>저장</span>
            </motion.button>
            <motion.button
              onClick={handleSendEmail}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white font-medium hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Mail className="w-5 h-5" />
              <span>메일</span>
            </motion.button>
            <motion.button
              onClick={handleKakaoShare}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-xl text-white font-medium hover:from-yellow-600 hover:to-amber-700 transition-all shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Share2 className="w-5 h-5" />
              <span>카톡</span>
            </motion.button>
          </div>

          <motion.button
            onClick={onReset}
            className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl text-white font-bold text-lg hover:from-pink-600 hover:to-rose-600 transition-all flex items-center justify-center gap-2 shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            다시 입력하기
          </motion.button>

          <motion.button
            onClick={handleGoHome}
            className="w-full py-3 bg-slate-700/50 rounded-2xl text-slate-300 font-medium hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Home className="w-5 h-5" />
            홈으로
          </motion.button>
        </div>
      </div>
    </div>
  );
}
