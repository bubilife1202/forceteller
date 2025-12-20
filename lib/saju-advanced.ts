/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HEAVENLY_STEMS, EARTHLY_BRANCHES, TWELVE_CYCLES_TABLE } from './saju-constants';
import type { Pillar } from './saju-calculator';

// 대운 (大運) 계산
export interface DaeunPillar {
  age: number;
  stem: typeof HEAVENLY_STEMS[number];
  branch: typeof EARTHLY_BRANCHES[number];
  cycle: string;
}

/**
 * 대운 계산 (정확한 절입일 기반)
 */
export function calculateDaeun(
  birthYear: number,
  birthMonth: number,
  birthDay: number,
  gender: 'male' | 'female',
  yearStem: string
): DaeunPillar[] {
  const daeuns: DaeunPillar[] = [];

  // 양남음녀: 남자 양년생, 여자 음년생은 순행
  // 음남양녀: 남자 음년생, 여자 양년생은 역행
  const yearStemIndex = HEAVENLY_STEMS.findIndex(s => s.ko === yearStem);
  const isYangYear = yearStemIndex % 2 === 0;
  const isForward = (gender === 'male' && isYangYear) || (gender === 'female' && !isYangYear);

  // 월주 기준으로 대운 계산 (오호둔법 적용)
  const yearStemStartMap: { [key: string]: number } = {
    '갑': 2, '기': 2,
    '을': 4, '경': 4,
    '병': 6, '신': 6,
    '정': 8, '임': 8,
    '무': 0, '계': 0,
  };

  const monthStartStem = yearStemStartMap[yearStem] ?? 0;
  const monthStemIndex = (monthStartStem + birthMonth - 1) % 10;
  const monthBranchIndex = (birthMonth + 1) % 12;

  // 대운 시작 나이 계산 (간략화: 평균 3세)
  const startAge = 3;

  // 10년 단위로 9개 대운 생성
  for (let i = 0; i < 9; i++) {
    const age = startAge + (i * 10);

    let stemIndex, branchIndex;
    if (isForward) {
      stemIndex = (monthStemIndex + i + 1) % 10;
      branchIndex = (monthBranchIndex + i + 1) % 12;
    } else {
      stemIndex = ((monthStemIndex - i - 1) % 10 + 10) % 10;
      branchIndex = ((monthBranchIndex - i - 1) % 12 + 12) % 12;
    }

    daeuns.push({
      age,
      stem: HEAVENLY_STEMS[stemIndex],
      branch: EARTHLY_BRANCHES[branchIndex],
      cycle: '대운',
    });
  }

  return daeuns;
}

/**
 * 12운성 계산
 */
export function getTwelveCycle(dayStem: string, branch: string): string {
  const cycleTable = TWELVE_CYCLES_TABLE[dayStem];
  if (!cycleTable) return '알 수 없음';

  const branchIndex = EARTHLY_BRANCHES.findIndex(b => b.ko === branch);
  if (branchIndex === -1) return '알 수 없음';

  const cycles = ['장생', '목욕', '관대', '건록', '제왕', '쇠', '병', '사', '묘', '절', '태', '양'];

  // 테이블에서 해당 지지의 위치를 찾아 운성 반환
  const cycleIndex = cycleTable.findIndex(b => b === branch);
  return cycleIndex !== -1 ? cycles[cycleIndex] : '알 수 없음';
}

// 신살 인터페이스
export interface Shinsal {
  name: string;
  type: 'good' | 'bad' | 'neutral';
  desc: string;
  category?: string; // 귀인, 살성, 신살 등
}

/**
 * 신살 계산 (확장 버전)
 * 천을귀인, 역마살, 도화살, 양인살, 공망, 문창귀인, 천덕귀인, 월덕귀인 등
 */
export function calculateShinsals(
  yearBranch: string,
  dayBranch: string,
  dayStem: string,
  hourBranch?: string,
  monthBranch?: string
): Shinsal[] {
  const shinsals: Shinsal[] = [];
  const allBranches = [yearBranch, dayBranch];
  if (hourBranch) allBranches.push(hourBranch);
  if (monthBranch) allBranches.push(monthBranch);

  // 1. 천을귀인 (天乙貴人) - 가장 좋은 귀인
  const cheonelTable: { [key: string]: string[] } = {
    '갑': ['축', '미'], '무': ['축', '미'],
    '을': ['자', '신'], '기': ['자', '신'],
    '병': ['해', '유'], '정': ['해', '유'],
    '경': ['축', '미'], '신': ['인', '오'],
    '임': ['묘', '사'], '계': ['묘', '사'],
  };

  if (cheonelTable[dayStem]) {
    for (const branch of allBranches) {
      if (cheonelTable[dayStem].includes(branch)) {
        shinsals.push({
          name: '천을귀인',
          type: 'good',
          desc: '하늘이 내린 최고의 귀인, 어려울 때 도움을 받음',
          category: '귀인',
        });
        break;
      }
    }
  }

  // 2. 천덕귀인 (天德貴人)
  const cheondukTable: { [key: string]: string } = {
    '인': '정', '묘': '신', '진': '임', '사': '신',
    '오': '갑', '미': '계', '신': '임', '유': '병',
    '술': '병', '해': '을', '자': '계', '축': '경',
  };

  for (const branch of allBranches) {
    if (cheondukTable[branch] === dayStem) {
      shinsals.push({
        name: '천덕귀인',
        type: 'good',
        desc: '하늘의 덕으로 재앙을 면하고 복을 받음',
        category: '귀인',
      });
      break;
    }
  }

  // 3. 월덕귀인 (月德貴人)
  const woldukTable: { [key: string]: string } = {
    '인': '병', '오': '병', '술': '병',
    '신': '임', '자': '임', '진': '임',
    '사': '경', '유': '경', '축': '경',
    '해': '갑', '묘': '갑', '미': '갑',
  };

  for (const branch of allBranches) {
    if (woldukTable[branch] === dayStem) {
      shinsals.push({
        name: '월덕귀인',
        type: 'good',
        desc: '달의 덕으로 길한 일이 있음',
        category: '귀인',
      });
      break;
    }
  }

  // 4. 문창귀인 (文昌貴人)
  const munchangTable: { [key: string]: string } = {
    '갑': '사', '을': '오', '병': '신', '정': '유',
    '무': '신', '기': '유', '경': '해', '신': '자',
    '임': '인', '계': '묘',
  };

  for (const branch of allBranches) {
    if (munchangTable[dayStem] === branch) {
      shinsals.push({
        name: '문창귀인',
        type: 'good',
        desc: '학문과 문재에 뛰어나고 시험운이 좋음',
        category: '귀인',
      });
      break;
    }
  }

  // 5. 역마살 (驛馬殺)
  const yeokmaTable: { [key: string]: string } = {
    '인': '신', '오': '신', '술': '신',
    '신': '인', '자': '인', '진': '인',
    '사': '해', '유': '해', '축': '해',
    '해': '사', '묘': '사', '미': '사',
  };

  for (const branch of allBranches) {
    if (yeokmaTable[yearBranch] === branch || yeokmaTable[dayBranch] === branch) {
      shinsals.push({
        name: '역마살',
        type: 'neutral',
        desc: '이동과 변화가 많고 활동적인 운명, 해외운 있음',
        category: '신살',
      });
      break;
    }
  }

  // 6. 도화살 (桃花殺)
  const dohwaTable: { [key: string]: string } = {
    '인': '묘', '오': '묘', '술': '묘',
    '신': '유', '자': '유', '진': '유',
    '사': '오', '유': '오', '축': '오',
    '해': '자', '묘': '자', '미': '자',
  };

  for (const branch of allBranches) {
    if (dohwaTable[yearBranch] === branch || dohwaTable[dayBranch] === branch) {
      shinsals.push({
        name: '도화살',
        type: 'neutral',
        desc: '매력이 넘치고 이성에게 인기가 많음',
        category: '신살',
      });
      break;
    }
  }

  // 7. 양인살 (羊刃殺)
  const yanginTable: { [key: string]: string } = {
    '갑': '묘', '을': '진', '병': '오', '정': '미',
    '무': '오', '기': '미', '경': '유', '신': '술',
    '임': '자', '계': '축',
  };

  if (yanginTable[dayStem]) {
    for (const branch of allBranches) {
      if (yanginTable[dayStem] === branch) {
        shinsals.push({
          name: '양인살',
          type: 'bad',
          desc: '성격이 강하고 날카로움, 결단력 있으나 사고 주의',
          category: '살성',
        });
        break;
      }
    }
  }

  // 8. 공망 (空亡) - 갑자순, 갑술순 등 10개 순에 따라 계산
  const gongmangTable: { [key: string]: string[] } = {
    '갑자': ['술', '해'], '갑술': ['신', '유'], '갑신': ['오', '미'],
    '갑오': ['진', '사'], '갑진': ['인', '묘'], '갑인': ['자', '축'],
  };

  // 일주의 간지로 해당 순 찾기
  const dayStemIndex = HEAVENLY_STEMS.findIndex(s => s.ko === dayStem);
  const dayBranchIndex = EARTHLY_BRANCHES.findIndex(b => b.ko === dayBranch);

  // 60갑자에서의 위치 계산
  const sexagenaryCycle = (dayStemIndex * 12 + dayBranchIndex) % 60;
  const xunIndex = Math.floor(sexagenaryCycle / 10);
  const xunKeys = ['갑자', '갑술', '갑신', '갑오', '갑진', '갑인'];
  const xunKey = xunKeys[xunIndex % 6];

  if (gongmangTable[xunKey]) {
    for (const branch of allBranches) {
      if (gongmangTable[xunKey].includes(branch)) {
        shinsals.push({
          name: '공망',
          type: 'bad',
          desc: '해당 지지의 기운이 비어있음, 노력해도 성과 어려움',
          category: '살성',
        });
        break;
      }
    }
  }

  // 9. 겁살 (劫殺)
  const geopsalTable: { [key: string]: string } = {
    '인': '해', '오': '해', '술': '해',
    '신': '사', '자': '사', '진': '사',
    '사': '인', '유': '인', '축': '인',
    '해': '신', '묘': '신', '미': '신',
  };

  for (const branch of allBranches) {
    if (geopsalTable[yearBranch] === branch || geopsalTable[dayBranch] === branch) {
      shinsals.push({
        name: '겁살',
        type: 'bad',
        desc: '재물 손실이나 도난에 주의',
        category: '살성',
      });
      break;
    }
  }

  // 10. 화개살 (華蓋殺)
  const hwagaeTable: { [key: string]: string } = {
    '인': '술', '오': '술', '술': '술',
    '신': '진', '자': '진', '진': '진',
    '사': '축', '유': '축', '축': '축',
    '해': '미', '묘': '미', '미': '미',
  };

  for (const branch of allBranches) {
    if (hwagaeTable[yearBranch] === branch || hwagaeTable[dayBranch] === branch) {
      shinsals.push({
        name: '화개살',
        type: 'neutral',
        desc: '예술적 재능이 뛰어나고 종교·철학에 관심',
        category: '신살',
      });
      break;
    }
  }

  // 11. 장성살 (將星殺) - 리더십, 권력
  const jangsungTable: { [key: string]: string } = {
    '인': '오', '오': '오', '술': '오',
    '신': '자', '자': '자', '진': '자',
    '사': '유', '유': '유', '축': '유',
    '해': '묘', '묘': '묘', '미': '묘',
  };

  for (const branch of allBranches) {
    if (jangsungTable[yearBranch] === branch) {
      shinsals.push({
        name: '장성',
        type: 'good',
        desc: '리더십이 강하고 권력을 얻을 수 있음',
        category: '귀인',
      });
      break;
    }
  }

  // 12. 학당귀인 (學堂貴人)
  const hakdangTable: { [key: string]: string } = {
    '갑': '해', '을': '해', '병': '인', '정': '인',
    '무': '인', '기': '사', '경': '사', '신': '신',
    '임': '신', '계': '해',
  };

  for (const branch of allBranches) {
    if (hakdangTable[dayStem] === branch) {
      shinsals.push({
        name: '학당귀인',
        type: 'good',
        desc: '학문에 뛰어나고 배움의 기회가 많음',
        category: '귀인',
      });
      break;
    }
  }

  // 13. 고신살/과숙살 (孤辰殺/寡宿殺)
  const gosinTable: { [key: string]: string } = {
    '인': '사', '묘': '사', '진': '사',
    '사': '신', '오': '신', '미': '신',
    '신': '해', '유': '해', '술': '해',
    '해': '인', '자': '인', '축': '인',
  };

  for (const branch of allBranches) {
    if (gosinTable[yearBranch] === branch) {
      shinsals.push({
        name: '고신살',
        type: 'bad',
        desc: '고독하거나 독립적인 성향',
        category: '살성',
      });
      break;
    }
  }

  // 14. 금여록 (金輿祿) - 배우자운
  const geumyeoTable: { [key: string]: string } = {
    '갑': '진', '을': '사', '병': '미', '정': '신',
    '무': '미', '기': '신', '경': '술', '신': '해',
    '임': '축', '계': '인',
  };

  for (const branch of allBranches) {
    if (geumyeoTable[dayStem] === branch) {
      shinsals.push({
        name: '금여록',
        type: 'good',
        desc: '배우자복이 있고 결혼운이 좋음',
        category: '귀인',
      });
      break;
    }
  }

  return shinsals;
}

// 합충 분석
export interface HapchungResult {
  type: '천간합' | '지지합' | '지지충' | '삼합' | '반합' | '지지형' | '지지파' | '지지해';
  name: string;
  desc: string;
  elements: string[];
  effect: 'positive' | 'negative' | 'neutral';
}

/**
 * 합충형파해 분석 (확장 버전)
 */
export function analyzeHapchung(pillars: {
  year: Pillar;
  month: Pillar;
  day: Pillar;
  hour: Pillar;
}): HapchungResult[] {
  const results: HapchungResult[] = [];

  const stems: string[] = [
    pillars.year.stem.ko,
    pillars.month.stem.ko,
    pillars.day.stem.ko,
    pillars.hour.stem.ko,
  ];

  const branches: string[] = [
    pillars.year.branch.ko,
    pillars.month.branch.ko,
    pillars.day.branch.ko,
    pillars.hour.branch.ko,
  ];

  // 1. 천간합 확인
  const tianganHaps: { [key: string]: { pair: string[]; result: string; name: string } } = {
    '갑기': { pair: ['갑', '기'], result: '토', name: '갑기합토' },
    '을경': { pair: ['을', '경'], result: '금', name: '을경합금' },
    '병신': { pair: ['병', '신'], result: '수', name: '병신합수' },
    '정임': { pair: ['정', '임'], result: '목', name: '정임합목' },
    '무계': { pair: ['무', '계'], result: '화', name: '무계합화' },
  };

  for (const [key, hap] of Object.entries(tianganHaps)) {
    if (stems.includes(hap.pair[0]) && stems.includes(hap.pair[1])) {
      results.push({
        type: '천간합',
        name: hap.name,
        desc: `${hap.pair[0]}과 ${hap.pair[1]}이 만나 ${hap.result}으로 변화`,
        elements: hap.pair,
        effect: 'positive',
      });
    }
  }

  // 2. 지지육합 확인
  const dizhiHaps: { [key: string]: { pair: string[]; result: string; name: string } } = {
    '자축': { pair: ['자', '축'], result: '토', name: '자축합토' },
    '인해': { pair: ['인', '해'], result: '목', name: '인해합목' },
    '묘술': { pair: ['묘', '술'], result: '화', name: '묘술합화' },
    '진유': { pair: ['진', '유'], result: '금', name: '진유합금' },
    '사신': { pair: ['사', '신'], result: '수', name: '사신합수' },
    '오미': { pair: ['오', '미'], result: '일태극', name: '오미합화' },
  };

  for (const [key, hap] of Object.entries(dizhiHaps)) {
    if (branches.includes(hap.pair[0]) && branches.includes(hap.pair[1])) {
      results.push({
        type: '지지합',
        name: hap.name,
        desc: `${hap.pair[0]}와 ${hap.pair[1]}이 합하여 ${hap.result} 기운 증가`,
        elements: hap.pair,
        effect: 'positive',
      });
    }
  }

  // 3. 삼합 확인
  const samhaps: { [key: string]: { branches: string[]; result: string; name: string } } = {
    '인오술': { branches: ['인', '오', '술'], result: '화', name: '인오술 화국' },
    '사유축': { branches: ['사', '유', '축'], result: '금', name: '사유축 금국' },
    '신자진': { branches: ['신', '자', '진'], result: '수', name: '신자진 수국' },
    '해묘미': { branches: ['해', '묘', '미'], result: '목', name: '해묘미 목국' },
  };

  for (const [key, samhap] of Object.entries(samhaps)) {
    const hasAll = samhap.branches.every(b => branches.includes(b));
    if (hasAll) {
      results.push({
        type: '삼합',
        name: samhap.name,
        desc: `${samhap.branches.join(', ')}이 삼합하여 ${samhap.result} 기운 대폭 증가`,
        elements: samhap.branches,
        effect: 'positive',
      });
    }
  }

  // 4. 반합 확인 (삼합의 두 개만 있는 경우)
  const banhaps: { [key: string]: { branches: string[]; result: string; name: string } } = {
    '인오': { branches: ['인', '오'], result: '화', name: '인오 반합' },
    '오술': { branches: ['오', '술'], result: '화', name: '오술 반합' },
    '사유': { branches: ['사', '유'], result: '금', name: '사유 반합' },
    '유축': { branches: ['유', '축'], result: '금', name: '유축 반합' },
    '신자': { branches: ['신', '자'], result: '수', name: '신자 반합' },
    '자진': { branches: ['자', '진'], result: '수', name: '자진 반합' },
    '해묘': { branches: ['해', '묘'], result: '목', name: '해묘 반합' },
    '묘미': { branches: ['묘', '미'], result: '목', name: '묘미 반합' },
  };

  for (const [key, banhap] of Object.entries(banhaps)) {
    const hasAll = banhap.branches.every(b => branches.includes(b));
    if (hasAll) {
      // 이미 삼합이 있으면 반합은 추가하지 않음
      const hasSamhap = results.some(r => r.type === '삼합');
      if (!hasSamhap) {
        results.push({
          type: '반합',
          name: banhap.name,
          desc: `${banhap.branches.join(', ')}이 반합하여 ${banhap.result} 기운 증가`,
          elements: banhap.branches,
          effect: 'positive',
        });
      }
    }
  }

  // 5. 지지충 확인
  const dizhiChungs: { [key: string]: { pair: string[]; desc: string } } = {
    '자오충': { pair: ['자', '오'], desc: '수화 충돌, 감정 기복' },
    '축미충': { pair: ['축', '미'], desc: '토토 충돌, 고집 충돌' },
    '인신충': { pair: ['인', '신'], desc: '목금 충돌, 역마충' },
    '묘유충': { pair: ['묘', '유'], desc: '목금 충돌, 도화충' },
    '진술충': { pair: ['진', '술'], desc: '토토 충돌, 창고충' },
    '사해충': { pair: ['사', '해'], desc: '화수 충돌, 역마충' },
  };

  for (const [name, chung] of Object.entries(dizhiChungs)) {
    if (branches.includes(chung.pair[0]) && branches.includes(chung.pair[1])) {
      results.push({
        type: '지지충',
        name,
        desc: chung.desc,
        elements: chung.pair,
        effect: 'negative',
      });
    }
  }

  // 6. 지지형 확인 (三刑)
  const dizhiXings: { [key: string]: { branches: string[]; desc: string } } = {
    '인사신형': { branches: ['인', '사', '신'], desc: '무은지형, 은혜를 원수로 갚음' },
    '축술미형': { branches: ['축', '술', '미'], desc: '무례지형, 예의 없고 막힘' },
    '자묘형': { branches: ['자', '묘'], desc: '무례지형' },
    '진진형': { branches: ['진', '진'], desc: '자형, 자기 갈등' },
    '오오형': { branches: ['오', '오'], desc: '자형, 자기 갈등' },
    '유유형': { branches: ['유', '유'], desc: '자형, 자기 갈등' },
    '해해형': { branches: ['해', '해'], desc: '자형, 자기 갈등' },
  };

  for (const [name, xing] of Object.entries(dizhiXings)) {
    const hasAll = xing.branches.every(b => branches.includes(b));
    // 자형은 같은 지지가 두 개 있어야 함
    const isSelfXing = xing.branches.length === 2 && xing.branches[0] === xing.branches[1];
    if (isSelfXing) {
      const count = branches.filter(b => b === xing.branches[0]).length;
      if (count >= 2) {
        results.push({
          type: '지지형',
          name,
          desc: xing.desc,
          elements: xing.branches,
          effect: 'negative',
        });
      }
    } else if (hasAll) {
      results.push({
        type: '지지형',
        name,
        desc: xing.desc,
        elements: xing.branches,
        effect: 'negative',
      });
    }
  }

  // 7. 지지파 확인
  const dizhiPos: { [key: string]: string[] } = {
    '자유파': ['자', '유'],
    '묘오파': ['묘', '오'],
    '진축파': ['진', '축'],
    '술미파': ['술', '미'],
    '인해파': ['인', '해'],
    '사신파': ['사', '신'],
  };

  for (const [name, pair] of Object.entries(dizhiPos)) {
    if (branches.includes(pair[0]) && branches.includes(pair[1])) {
      results.push({
        type: '지지파',
        name,
        desc: `${pair[0]}와 ${pair[1]}이 파하여 깨지고 흩어짐`,
        elements: pair,
        effect: 'negative',
      });
    }
  }

  // 8. 지지해 확인
  const dizhiHaes: { [key: string]: string[] } = {
    '자미해': ['자', '미'],
    '축오해': ['축', '오'],
    '인사해': ['인', '사'],
    '묘진해': ['묘', '진'],
    '신해해': ['신', '해'],
    '유술해': ['유', '술'],
  };

  for (const [name, pair] of Object.entries(dizhiHaes)) {
    if (branches.includes(pair[0]) && branches.includes(pair[1])) {
      results.push({
        type: '지지해',
        name,
        desc: `${pair[0]}와 ${pair[1]}이 해하여 서로 손상`,
        elements: pair,
        effect: 'negative',
      });
    }
  }

  return results;
}
