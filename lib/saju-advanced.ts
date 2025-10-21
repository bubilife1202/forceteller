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

  // 월주 기준으로 대운 계산
  const monthStemIndex = Math.floor((birthMonth - 1) / 2) % 10;
  const monthBranchIndex = (birthMonth + 1) % 12;

  // 10년 단위로 9개 대운 생성
  for (let i = 0; i < 9; i++) {
    const startAge = i * 10 + 2; // 대운은 보통 2세부터 시작

    let stemIndex, branchIndex;
    if (isForward) {
      stemIndex = (monthStemIndex + i + 1) % 10;
      branchIndex = (monthBranchIndex + i + 1) % 12;
    } else {
      stemIndex = (monthStemIndex - i - 1 + 100) % 10;
      branchIndex = (monthBranchIndex - i - 1 + 120) % 12;
    }

    daeuns.push({
      age: startAge,
      stem: HEAVENLY_STEMS[stemIndex],
      branch: EARTHLY_BRANCHES[branchIndex],
      cycle: '대운',
    });
  }

  return daeuns;
}

// 12운성 계산
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

// 신살 계산 (간단 버전)
export interface Shinsal {
  name: string;
  type: 'good' | 'bad' | 'neutral';
  desc: string;
}

export function calculateShinsals(
  yearBranch: string,
  dayBranch: string,
  dayStem: string
): Shinsal[] {
  const shinsals: Shinsal[] = [];

  // 역마살 계산 (인오술 = 신, 신자진 = 인, 사유축 = 해, 해묘미 = 사)
  const yeokmaBranches: { [key: string]: string[] } = {
    '신': ['인', '오', '술'],
    '인': ['신', '자', '진'],
    '해': ['사', '유', '축'],
    '사': ['해', '묘', '미'],
  };

  for (const [yeokma, branches] of Object.entries(yeokmaBranches)) {
    if (branches.includes(yearBranch) || branches.includes(dayBranch)) {
      shinsals.push({
        name: '역마살',
        type: 'neutral',
        desc: '이동수가 많고 변화가 많은 운명',
      });
      break;
    }
  }

  // 도화살 계산 (자오묘유)
  const dohwaBranches = ['자', '오', '묘', '유'];
  if (dohwaBranches.includes(yearBranch) || dohwaBranches.includes(dayBranch)) {
    shinsals.push({
      name: '도화살',
      type: 'neutral',
      desc: '인기가 많고 이성운이 좋음',
    });
  }

  // 문창귀인 (간단 계산)
  const munchangStems: { [key: string]: string } = {
    '갑': '사', '을': '오', '병': '신', '정': '유',
    '무': '신', '기': '유', '경': '해', '신': '자',
    '임': '인', '계': '묘',
  };

  if (munchangStems[dayStem] === dayBranch) {
    shinsals.push({
      name: '문창귀인',
      type: 'good',
      desc: '학문과 문재에 뛰어남',
    });
  }

  return shinsals;
}

// 합충 분석
export interface HapchungResult {
  type: '천간합' | '지지합' | '지지충' | '삼합';
  name: string;
  desc: string;
  elements: string[];
}

export function analyzeHapchung(pillars: {
  year: Pillar;
  month: Pillar;
  day: Pillar;
  hour: Pillar;
}): HapchungResult[] {
  const results: HapchungResult[] = [];

  const stems = [
    pillars.year.stem.ko,
    pillars.month.stem.ko,
    pillars.day.stem.ko,
    pillars.hour.stem.ko,
  ];

  const branches = [
    pillars.year.branch.ko,
    pillars.month.branch.ko,
    pillars.day.branch.ko,
    pillars.hour.branch.ko,
  ];

  // 천간합 확인
  const tianganHaps: { [key: string]: { pair: string[]; result: string; name: string } } = {
    '갑기': { pair: ['갑', '기'], result: '토', name: '갑기합토' },
    '을경': { pair: ['을', '경'], result: '금', name: '을경합금' },
    '병신': { pair: ['병', '신'], result: '수', name: '병신합수' },
    '정임': { pair: ['정', '임'], result: '목', name: '정임합목' },
    '무계': { pair: ['무', '계'], result: '화', name: '무계합화' },
  };

  for (const [key, hap] of Object.entries(tianganHaps)) {
    if (stems.includes(hap.pair[0] as any) && stems.includes(hap.pair[1] as any)) {
      results.push({
        type: '천간합',
        name: hap.name,
        desc: `${hap.pair[0]}과 ${hap.pair[1]}이 만나 ${hap.result}으로 변화`,
        elements: hap.pair,
      });
    }
  }

  // 지지합 확인
  const dizhiHaps: { [key: string]: { pair: string[]; result: string; name: string } } = {
    '자축': { pair: ['자', '축'], result: '토', name: '자축합' },
    '인해': { pair: ['인', '해'], result: '목', name: '인해합' },
    '묘술': { pair: ['묘', '술'], result: '화', name: '묘술합' },
    '진유': { pair: ['진', '유'], result: '금', name: '진유합' },
    '사신': { pair: ['사', '신'], result: '수', name: '사신합' },
    '오미': { pair: ['오', '미'], result: '화', name: '오미합' },
  };

  for (const [key, hap] of Object.entries(dizhiHaps)) {
    if (branches.includes(hap.pair[0] as any) && branches.includes(hap.pair[1] as any)) {
      results.push({
        type: '지지합',
        name: hap.name,
        desc: `${hap.pair[0]}와 ${hap.pair[1]}이 합하여 ${hap.result} 기운 증가`,
        elements: hap.pair,
      });
    }
  }

  // 지지충 확인
  const dizhiChungs: { [key: string]: string[] } = {
    '자오충': ['자', '오'],
    '축미충': ['축', '미'],
    '인신충': ['인', '신'],
    '묘유충': ['묘', '유'],
    '진술충': ['진', '술'],
    '사해충': ['사', '해'],
  };

  for (const [name, pair] of Object.entries(dizhiChungs)) {
    if (branches.includes(pair[0] as any) && branches.includes(pair[1] as any)) {
      results.push({
        type: '지지충',
        name,
        desc: `${pair[0]}와 ${pair[1]}이 충돌하여 변동과 변화`,
        elements: pair,
      });
    }
  }

  // 삼합 확인
  const samhaps: { [key: string]: { branches: string[]; result: string; name: string } } = {
    '인오술': { branches: ['인', '오', '술'], result: '화', name: '인오술 화국' },
    '사유축': { branches: ['사', '유', '축'], result: '금', name: '사유축 금국' },
    '신자진': { branches: ['신', '자', '진'], result: '수', name: '신자진 수국' },
    '해묘미': { branches: ['해', '묘', '미'], result: '목', name: '해묘미 목국' },
  };

  for (const [key, samhap] of Object.entries(samhaps)) {
    const hasAll = samhap.branches.every(b => branches.includes(b as any));
    if (hasAll) {
      results.push({
        type: '삼합',
        name: samhap.name,
        desc: `${samhap.branches.join(', ')}이 삼합하여 ${samhap.result} 기운 대폭 증가`,
        elements: samhap.branches,
      });
    }
  }

  return results;
}
