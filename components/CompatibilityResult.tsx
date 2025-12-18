'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import {
  Heart, Users, Home, Wallet, AlertTriangle,
  ArrowLeft, ThumbsUp, Sun
} from 'lucide-react';
import { CompatibilityFormData } from './CompatibilityForm';

interface CompatibilityResultProps {
  result1: SajuResult;
  result2: SajuResult;
  formData: CompatibilityFormData;
  onReset: () => void;
  onBack: () => void;
}

export default function CompatibilityResult({
  result1,
  result2,
  formData,
  onReset,
  onBack
}: CompatibilityResultProps) {
  const { person1, person2, relationshipType } = formData;

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

  return (
    <div className="min-h-screen px-4 py-8 md:py-12">
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

        {/* 면책 조항 */}
        <div className="glass rounded-2xl p-6 text-center">
          <p className="text-slate-300 text-sm">
            ⚠️ 본 궁합 분석은 <strong className="text-amber-400">전통 명리학 이론</strong>을 바탕으로
            제작되었으며, 재미와 참고용으로 활용해 주세요.
          </p>
        </div>

        {/* 버튼 */}
        <div className="flex justify-center gap-4 pt-4">
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
            onClick={onReset}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl text-white font-medium hover:from-pink-600 hover:to-rose-600 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            다시 입력하기
          </motion.button>
        </div>
      </div>
    </div>
  );
}
