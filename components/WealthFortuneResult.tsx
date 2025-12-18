'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, RefreshCw, Coins, TrendingUp, Calendar, Star, Sparkles, Target, Clock, Gift, Gem, Crown, DollarSign, PiggyBank, Wallet } from 'lucide-react';
import { WealthFortuneFormData } from './WealthFortuneForm';
import { getDayPillar, getTenGod } from '@/lib/saju-calculator';

// 일간별 상세 재물 운세
const DAY_STEM_WEALTH: Record<string, {
  wealthPersonality: string;
  moneyMindset: string;
  strengths: string[];
  weaknesses: string[];
  idealIncome: string[];
  avoidIncome: string[];
  savingStyle: string;
  spendingStyle: string;
  investmentProfile: string;
  wealthPeak: string;
  luckyBusiness: string[];
  luckyItems: string[];
  luckyColors: string[];
  wealthTips: string[];
  monthlyAdvice: { month: string; advice: string }[];
  lifetimeWealthPath: string;
  retirementStyle: string;
  wealthBlockers: string[];
  wealthBoosters: string[];
}> = {
  '갑': {
    wealthPersonality: '개척형 재물가 - 새로운 분야에서 부를 일구는 선구자 타입입니다. 남들이 가지 않은 길에서 큰 성공을 거둘 수 있으나, 초기 실패에 대한 인내가 필요합니다.',
    moneyMindset: '돈은 자유와 성장을 위한 도구라고 생각합니다. 안정보다는 성장 가능성에 투자하며, 큰 그림을 보는 시야가 있습니다.',
    strengths: ['새로운 사업 기회 포착 능력', '장기적 비전과 계획 수립', '결단력 있는 투자 결정', '리더십으로 팀 재물 운 상승', '성장 산업 예측력'],
    weaknesses: ['초기 자금 관리 미숙', '성급한 확장으로 인한 손실', '세부 사항 간과', '과도한 자신감으로 리스크 과소평가', '단기 수익 경시'],
    idealIncome: ['스타트업 창업', 'CEO/경영자', '부동산 개발', '벤처 투자', 'M&A 전문가', '프랜차이즈 사업', '대규모 무역'],
    avoidIncome: ['단순 반복 업무', '수수료 기반 영업', '프리랜서 불규칙 수입', '소규모 자영업'],
    savingStyle: '목표 지향적 저축 - 명확한 목표(사업 자금, 투자금)가 있을 때 강력하게 저축합니다. 막연한 저축은 오래 못 합니다.',
    spendingStyle: '자기 발전 소비형 - 교육, 네트워킹, 건강에 아끼지 않습니다. 브랜드보다 실용성 중시하지만 리더로서 품위 유지에도 신경 씁니다.',
    investmentProfile: '성장주 집중 투자자 - 배당보다 성장 가능성을 봅니다. ETF보다 개별 종목을 선호하고, 장기 보유 전략이 맞습니다. 손절이 늦을 수 있어 주의.',
    wealthPeak: '35-45세에 첫 번째 재물 피크, 50-60세에 두 번째 큰 성공 기회가 옵니다. 인내심을 갖고 기다리세요.',
    luckyBusiness: ['IT/테크 스타트업', '신재생 에너지', '바이오/헬스케어', '교육 사업', '친환경 사업'],
    luckyItems: ['푸른색 지갑', '나무 소재 액세서리', '동쪽 창문 식물', '대나무 문구류'],
    luckyColors: ['청록색', '녹색', '하늘색', '민트'],
    wealthTips: ['봄(2-4월)에 새로운 사업 시작하면 성공률 UP', '동쪽 방향의 사무실/점포가 유리', '매주 월요일 아침 재무 계획 수립', '나무 관련 사업에 투자 고려', '멘토/선배의 조언 적극 수용'],
    monthlyAdvice: [
      { month: '1월', advice: '새해 재무 계획 수립의 달. 큰 그림을 그리되 세부 실행 계획도 함께.' },
      { month: '2월', advice: '봄 기운이 시작되어 재물운 상승. 새로운 수입원 모색 적기.' },
      { month: '3월', advice: '적극적인 투자와 사업 확장에 유리한 달.' },
      { month: '4월', advice: '성장의 기운 최고조. 큰 결정을 내리기 좋은 시기.' },
      { month: '5월', advice: '수확의 시작. 그동안의 노력이 결실을 맺기 시작.' },
      { month: '6월', advice: '안정적 관리의 달. 확장보다 내실 다지기.' },
      { month: '7월', advice: '여름 더위처럼 재물 활동 활발. 네트워킹 수익 기대.' },
      { month: '8월', advice: '에너지 소모 주의. 건강 투자가 재물 투자.' },
      { month: '9월', advice: '가을 수확기 시작. 상반기 투자 회수 검토.' },
      { month: '10월', advice: '결실의 달. 매출과 수익 정점 기대.' },
      { month: '11월', advice: '내년 계획 수립 시작. 세금 절세 전략 점검.' },
      { month: '12월', advice: '정리와 반성의 달. 올해 재무 결산 및 내년 예산 수립.' }
    ],
    lifetimeWealthPath: '20대 기반 구축 → 30대 본격 성장 → 40대 안정과 확장 → 50대 수확과 재투자 → 60대 이후 후세 양성과 사회 환원',
    retirementStyle: '완전한 은퇴보다 멘토/자문 역할로 활동적 노후. 사회 공헌 사업에 관심. 시니어 창업도 고려.',
    wealthBlockers: ['성급함', '과도한 확장욕', '세부 관리 소홀', '과신'],
    wealthBoosters: ['인내심', '전문가 조언 수용', '단계적 성장', '체계적 관리']
  },
  '을': {
    wealthPersonality: '유연형 재물가 - 변화하는 환경에 적응하며 꾸준히 부를 쌓는 타입입니다. 큰 대박보다 안정적인 성장을 추구합니다.',
    moneyMindset: '돈은 안정과 평화를 위한 수단이라 생각합니다. 무리한 투자보다 확실한 수익을 선호합니다.',
    strengths: ['적응력 뛰어난 재테크', '인맥을 통한 기회 포착', '꾸준한 저축 습관', '위험 회피 능력', '협상과 조율 능력'],
    weaknesses: ['결단력 부족으로 기회 놓침', '너무 보수적인 투자', '남의 의견에 휘둘림', '우유부단함', '작은 수익에 만족'],
    idealIncome: ['프리랜서/컨설턴트', '중개업', '협력 사업', '디자인/예술', '서비스업', '교육/강의', '화훼/조경'],
    avoidIncome: ['고위험 투자', '대규모 제조업', '경쟁 치열한 시장', '독립적 의사결정 필요 업종'],
    savingStyle: '자동화 저축형 - 급여 들어오면 자동으로 저축되는 시스템이 최적. 의지력에 의존하면 흔들릴 수 있습니다.',
    spendingStyle: '감성 소비형 - 기분에 따라 소비가 달라집니다. 스트레스 받으면 쇼핑으로 해소하는 경향. 예산 앱 활용 권장.',
    investmentProfile: '안정형 분산 투자자 - 예금, 적금, 채권 중심의 안전 자산 선호. 주식은 배당주/우량주 위주로 소액 분산.',
    wealthPeak: '30-40세에 인맥 통한 기회로 성장, 45-55세에 안정적 고수익 시기.',
    luckyBusiness: ['플로리스트', '인테리어', 'SNS 마케팅', '부업/사이드잡', '협업 프로젝트'],
    luckyItems: ['연두색 지갑', '꽃무늬 소품', '화분', '실크 스카프'],
    luckyColors: ['연두색', '라벤더', '핑크', '베이지'],
    wealthTips: ['봄(3-5월)에 새로운 수입원 개척', '협력자/파트너와 함께 사업 추진', '매일 소액이라도 저축 습관화', '감정적 지출 통제 필요', '부업으로 수입 다각화'],
    monthlyAdvice: [
      { month: '1월', advice: '조용히 재무 상태 점검. 작년 지출 패턴 분석.' },
      { month: '2월', advice: '인맥 정리 및 네트워킹. 귀인을 만날 수 있는 달.' },
      { month: '3월', advice: '새로운 부업/수입원 시작하기 좋은 시기.' },
      { month: '4월', advice: '협력 사업 기회 도래. 파트너십 제안 긍정 검토.' },
      { month: '5월', advice: '안정적 수익 흐름 형성. 저축 비율 높이기.' },
      { month: '6월', advice: '중간 점검의 달. 상반기 재무 목표 달성도 확인.' },
      { month: '7월', advice: '여유 자금으로 소소한 투자 시작 고려.' },
      { month: '8월', advice: '휴식과 재충전. 무리한 재테크 활동 자제.' },
      { month: '9월', advice: '가을 수확기. 안정적 수익 실현 기대.' },
      { month: '10월', advice: '새로운 기술/자격 투자로 수입 상승 도모.' },
      { month: '11월', advice: '연말 보너스 계획 수립. 저축 vs 투자 비율 결정.' },
      { month: '12월', advice: '감사와 나눔의 달. 기부도 좋은 재물 순환.' }
    ],
    lifetimeWealthPath: '20대 스킬 구축 → 30대 인맥 확장 → 40대 안정 수입 → 50대 다각화 수입 → 60대 여유로운 노후',
    retirementStyle: '취미를 겸한 소규모 사업으로 활동적 노후. 정원 가꾸기, 플라워샵 등 좋아하는 일을 하며 수입 창출.',
    wealthBlockers: ['우유부단함', '감정적 지출', '기회 회피', '의존성'],
    wealthBoosters: ['자동화 시스템', '파트너십', '꾸준함', '적응력']
  },
  '병': {
    wealthPersonality: '확장형 재물가 - 열정과 에너지로 재물을 끌어당기는 타입입니다. 인맥과 영향력으로 큰 부를 이룰 수 있습니다.',
    moneyMindset: '돈은 영향력과 자유를 상징합니다. 돈으로 더 큰 일을 하고 싶어하며, 나눔에도 인색하지 않습니다.',
    strengths: ['강력한 추진력', '넓은 인맥 활용', '설득력과 영업력', '브랜드 구축 능력', '트렌드 선도'],
    weaknesses: ['과시적 소비', '충동적 투자', '장기 계획 부족', '지출 통제 어려움', '번아웃 위험'],
    idealIncome: ['인플루언서/크리에이터', '영업/마케팅', '연예/엔터테인먼트', '요식업', '이벤트/행사', '강연/코칭', '광고/홍보'],
    avoidIncome: ['조용한 사무직', '단독 작업', '장기 프로젝트', '세밀한 분석 업무'],
    savingStyle: '목표 보상형 저축 - 구체적인 보상(여행, 명품 등)을 목표로 할 때 저축 동기부여 최대화.',
    spendingStyle: '과시형 소비 - 품위 유지와 이미지 관리에 지출이 큽니다. VIP 멤버십, 프리미엄 서비스 선호.',
    investmentProfile: '적극적 투자자 - 고위험 고수익 상품 선호. 트렌드 따라 빠른 투자 결정. 손절 빠르게 할 것.',
    wealthPeak: '25-35세 화려한 성장기, 40-50세 안정화 및 제2의 도약.',
    luckyBusiness: ['유튜브/SNS', '요식업/카페', '화장품/뷰티', '패션', '공연/이벤트'],
    luckyItems: ['빨간 지갑', '크리스탈 액세서리', '양초', '조명 인테리어'],
    luckyColors: ['빨강', '오렌지', '골드', '보라'],
    wealthTips: ['여름(5-7월)에 마케팅/홍보 활동 집중', '남쪽 방향 사업장이 유리', 'SNS 브랜딩으로 수입 다각화', '번아웃 방지 위한 휴식 필수', '파트너에게 재무 관리 위임 고려'],
    monthlyAdvice: [
      { month: '1월', advice: '새해 목표 크게 세우기. 비전보드 작성으로 동기부여.' },
      { month: '2월', advice: '새로운 프로젝트 론칭에 좋은 달. 적극적 홍보.' },
      { month: '3월', advice: '네트워킹 활동 강화. 인맥이 곧 재물.' },
      { month: '4월', advice: '확장의 기운. 새로운 시장 진출 고려.' },
      { month: '5월', advice: '여름 시즌 준비. 매출 상승 기대.' },
      { month: '6월', advice: '최고의 재물운. 적극적인 영업과 마케팅.' },
      { month: '7월', advice: '열정 최고조. 하지만 체력 관리 필수.' },
      { month: '8월', advice: '충전의 달. 번아웃 방지 위해 휴식.' },
      { month: '9월', advice: '하반기 전략 재정비. 수익 구조 점검.' },
      { month: '10월', advice: '연말 대목 준비. 마케팅 예산 확보.' },
      { month: '11월', advice: '성과 수확의 달. 보너스와 인센티브 기대.' },
      { month: '12월', advice: '감사 이벤트로 고객 확보. 내년 예약 받기.' }
    ],
    lifetimeWealthPath: '20대 브랜드 구축 → 30대 확장과 성장 → 40대 안정과 다각화 → 50대 후배 양성 → 60대 사회 환원',
    retirementStyle: '강연, 자문, 미디어 출연으로 활발한 노후. 완전한 은퇴는 어울리지 않음. 사회적 영향력 유지.',
    wealthBlockers: ['과소비', '충동', '번아웃', '장기 계획 부족'],
    wealthBoosters: ['인맥', '브랜딩', '열정', '빠른 실행력']
  },
  '정': {
    wealthPersonality: '섬세형 재물가 - 디테일과 품질로 가치를 창출하는 타입입니다. 예술적 감각이 돈이 됩니다.',
    moneyMindset: '돈은 아름다움과 가치를 추구하는 도구입니다. 양보다 질을 중시하며, 의미 있는 곳에 투자합니다.',
    strengths: ['디테일 장악력', '창의적 아이디어', '품질 관리 능력', '예술적 가치 창출', '충성 고객 확보'],
    weaknesses: ['완벽주의로 속도 저하', '상업성 부족', '가격 책정 어려움', '확장 주저', '현실 타협 어려움'],
    idealIncome: ['디자이너', '예술가', '작가', '프로그래머', '공예가', '요리사/파티시에', '주얼리/악세서리', '맞춤 서비스'],
    avoidIncome: ['대량 생산', '빠른 턴오버 업종', '저가 경쟁 시장', '영업 중심 업무'],
    savingStyle: '가치 저축형 - 단순 금액보다 가치 있는 곳에 저축. 예술품, 와인, 한정판 등 가치 저장 선호.',
    spendingStyle: '품질 중시 소비 - 저렴한 것 여러 개보다 비싸도 좋은 것 하나. 취향 있는 소비를 합니다.',
    investmentProfile: '가치 투자자 - 실제 가치를 분석해 투자. 유행 따라가지 않음. 부동산, 예술품, 가치주 선호.',
    wealthPeak: '35-50세 전문성 인정받는 시기. 꾸준한 성장형으로 급격한 피크보다 점진적 상승.',
    luckyBusiness: ['디자인 스튜디오', '공방', '카페/베이커리', '출판/콘텐츠', '주문제작 서비스'],
    luckyItems: ['핑크/보라 지갑', '크리스탈', '향초', '수제 공예품'],
    luckyColors: ['핑크', '보라', '와인색', '코발트블루'],
    wealthTips: ['여름 저녁(6-8월)에 창작 활동 집중', '온라인 포트폴리오/샵 운영', '단가를 높여 품질로 승부', '협업 프로젝트로 인지도 상승', '정기 고객/구독 서비스 구축'],
    monthlyAdvice: [
      { month: '1월', advice: '새해 포트폴리오 정리. 작년 작업 아카이빙.' },
      { month: '2월', advice: '새로운 기술/트렌드 학습의 달.' },
      { month: '3월', advice: '봄 시즌 신작 준비. 창작 에너지 상승.' },
      { month: '4월', advice: '전시/론칭 적기. 세상에 작품 선보이기.' },
      { month: '5월', advice: '협업 기회 모색. 다른 분야와 콜라보.' },
      { month: '6월', advice: '여름 저녁 창작 시간 확보. 집중력 최고.' },
      { month: '7월', advice: '작품 가격 재검토. 가치에 맞는 단가 설정.' },
      { month: '8월', advice: '휴식과 영감 충전. 여행이나 전시 관람.' },
      { month: '9월', advice: '가을 시즌 신작 준비. 연말 대목 겨냥.' },
      { month: '10월', advice: '마케팅 강화. SNS 활동 및 고객 소통.' },
      { month: '11월', advice: '연말 선물 시즌 대비. 패키징과 서비스 강화.' },
      { month: '12월', advice: '한 해 정산. 베스트 작품 정리 및 내년 계획.' }
    ],
    lifetimeWealthPath: '20대 기술 연마 → 30대 스타일 확립 → 40대 명성 구축 → 50대 마스터 인정 → 60대 후배 양성',
    retirementStyle: '죽을 때까지 창작 활동. 은퇴 개념 없이 좋아하는 일을 계속하며 수입 창출. 제자 양성.',
    wealthBlockers: ['완벽주의', '가격 저평가', '마케팅 부족', '확장 두려움'],
    wealthBoosters: ['전문성', '품질', '스토리텔링', '충성 고객']
  },
  '무': {
    wealthPersonality: '안정형 재물가 - 든든하고 신뢰할 수 있는 재물 관리자 타입입니다. 부동산과 실물 자산에 강합니다.',
    moneyMindset: '돈은 안정과 신뢰의 기반입니다. 투기보다 투자, 변동보다 안정을 추구합니다.',
    strengths: ['부동산 투자 감각', '장기 보유 인내심', '신뢰 기반 비즈니스', '안정적 자산 관리', '위기 대응 능력'],
    weaknesses: ['변화 적응 느림', '기회 놓칠 수 있음', '보수적 사고', '신기술 도입 주저', '리스크 회피 과도'],
    idealIncome: ['공무원', '은행/금융기관', '부동산', '건설/건축', '농업/식품', '보험', '자산관리사'],
    avoidIncome: ['고위험 투자', '빠른 트렌드 사업', '불안정한 스타트업', '변동성 높은 업종'],
    savingStyle: '자동 정기형 저축 - 매달 정해진 날 정해진 금액 저축. 변동 없이 꾸준하게.',
    spendingStyle: '계획적 실용 소비 - 필요한 것만 구매. 충동구매 없음. 가성비 중시.',
    investmentProfile: '안전자산 투자자 - 예금, 적금, 채권, 부동산 중심. 원금 보장이 최우선.',
    wealthPeak: '40-55세 부동산과 자산 가치 상승으로 재물 피크. 늦지만 확실한 성공.',
    luckyBusiness: ['부동산 중개', '건설/인테리어', '요식업', '농산물 유통', '창고/물류'],
    luckyItems: ['노란/베이지 지갑', '세라믹 소품', '화분', '황토 제품'],
    luckyColors: ['노랑', '베이지', '황토색', '갈색'],
    wealthTips: ['환절기(3,6,9,12월)에 부동산 거래 유리', '중심부/고향 방향 투자 고려', '땅, 건물 등 실물 자산 선호', '장기 보유 전략 유지', '급하게 팔지 말 것'],
    monthlyAdvice: [
      { month: '1월', advice: '올해 부동산/자산 계획 수립. 시장 조사.' },
      { month: '2월', advice: '세금 신고 준비. 절세 전략 점검.' },
      { month: '3월', advice: '환절기 부동산 거래 적기. 매물 검토.' },
      { month: '4월', advice: '안정적 투자처 발굴. 정기예금 갱신.' },
      { month: '5월', advice: '가정의 달 가족 재무 회의. 장기 계획 공유.' },
      { month: '6월', advice: '환절기 거래 적기. 상반기 투자 정리.' },
      { month: '7월', advice: '여름 비수기 매물 탐색. 좋은 기회 포착.' },
      { month: '8월', advice: '휴가철 가족과 재무 상담. 상속/증여 계획.' },
      { month: '9월', advice: '가을 거래 시즌 시작. 적극적 투자 검토.' },
      { month: '10월', advice: '연말 대비 자산 정리. 포트폴리오 점검.' },
      { month: '11월', advice: '내년 예산 수립. 보험/연금 점검.' },
      { month: '12월', advice: '연말 세금 최적화. 기부금 공제 활용.' }
    ],
    lifetimeWealthPath: '20대 안정 직장 → 30대 종자돈 마련 → 40대 부동산 투자 → 50대 자산 불리기 → 60대 안정적 노후',
    retirementStyle: '월세 수입으로 안정적 노후. 부동산 관리하며 여유롭게. 가족에게 자산 이전 준비.',
    wealthBlockers: ['보수적 사고', '기회 놓침', '변화 거부', '과도한 안전 추구'],
    wealthBoosters: ['인내심', '신뢰', '실물 자산', '장기 보유']
  },
  '기': {
    wealthPersonality: '육성형 재물가 - 사람과 관계를 통해 재물을 불리는 타입입니다. 서비스업과 돌봄 산업에 적합합니다.',
    moneyMindset: '돈은 사람을 돕고 가치를 나누는 수단입니다. 이익보다 관계를, 단기보다 장기를 봅니다.',
    strengths: ['고객 관계 관리 탁월', '입소문 마케팅', '신뢰 기반 성장', '꾸준한 단골 확보', '서비스 정신'],
    weaknesses: ['단가 인상 어려움', '거절 못함', '과도한 서비스로 손해', '사업적 냉정함 부족', '자기 몫 챙기기 어려움'],
    idealIncome: ['교육/강사', '간호/요양', '상담/코칭', '카페/음식점', 'HR/인사', '사회복지', '보육/육아'],
    avoidIncome: ['고압적 영업', '비인간적 환경', '관계 단절 업무', '단기 수익 추구 업종'],
    savingStyle: '가족 목표 저축형 - 가족이나 소중한 사람을 위한 목표가 있을 때 저축 의지 강해짐.',
    spendingStyle: '관계 중심 소비 - 선물, 외식, 경조사비 지출이 큼. 나보다 남을 위해 쓰는 경향.',
    investmentProfile: '안정 배당 투자자 - 고위험 투자 부적합. 배당주, 채권, 적금 중심의 안전 운용.',
    wealthPeak: '40-55세 인맥과 신뢰가 쌓여 재물로 돌아오는 시기. 늦되 확실한 성공.',
    luckyBusiness: ['학원/교육', '카페/베이커리', '반려동물 사업', '케어 서비스', '농장/체험장'],
    luckyItems: ['베이지/황토 지갑', '도자기', '식물', '손수건'],
    luckyColors: ['베이지', '아이보리', '황토', '카키'],
    wealthTips: ['환절기에 새로운 서비스 론칭', '단골 고객 관리 프로그램 운영', '리뷰와 추천으로 신규 고객 확보', '가격보다 가치로 경쟁', '번아웃 방지 자기 케어'],
    monthlyAdvice: [
      { month: '1월', advice: '새해 고객 감사 이벤트. 관계 재확인.' },
      { month: '2월', advice: '발렌타인 시즌 마케팅. 선물 서비스 강화.' },
      { month: '3월', advice: '봄 신규 프로그램 론칭. 새학기 수요 공략.' },
      { month: '4월', advice: '고객 피드백 수집 및 서비스 개선.' },
      { month: '5월', advice: '가정의 달 프로모션. 가족 대상 서비스.' },
      { month: '6월', advice: '상반기 결산. 단골 고객 감사 행사.' },
      { month: '7월', advice: '여름 방학 특별 프로그램.' },
      { month: '8월', advice: '휴식과 재충전. 자기 케어 시간.' },
      { month: '9월', advice: '가을 신규 프로그램. 새학기 마케팅.' },
      { month: '10월', advice: '추석 감사 이벤트. VIP 고객 관리.' },
      { month: '11월', advice: '연말 예약 받기. 내년 계획 안내.' },
      { month: '12월', advice: '송년 감사. 고객에게 연하장/선물.' }
    ],
    lifetimeWealthPath: '20대 서비스 정신 배양 → 30대 전문성 구축 → 40대 신뢰 자산화 → 50대 확장 → 60대 후배 양성',
    retirementStyle: '봉사와 멘토링으로 보람 있는 노후. 작은 규모로 좋아하는 일 계속하며 사람들과 소통.',
    wealthBlockers: ['자기 몫 못 챙김', '거절 못함', '과잉 서비스', '가격 저평가'],
    wealthBoosters: ['신뢰', '입소문', '단골', '서비스 품질']
  },
  '경': {
    wealthPersonality: '결단형 재물가 - 명확한 판단과 실행력으로 큰 부를 이루는 타입입니다. 금융과 투자에 강합니다.',
    moneyMindset: '돈은 실력과 성과의 증거입니다. 공정한 경쟁에서 이기는 것에 자부심을 느낍니다.',
    strengths: ['빠른 의사결정', '투자 판단력', '협상력', '위기 관리 능력', '수익 극대화 전략'],
    weaknesses: ['손절 늦음 (자존심)', '타인 조언 무시', '독단적 판단', '관계보다 수익 우선', '융통성 부족'],
    idealIncome: ['금융/투자', '법조계', 'CEO/임원', '컨설턴트', '의사/전문직', '보석/귀금속', 'M&A전문가'],
    avoidIncome: ['팀워크 중심 업무', '감성적 서비스', '저수익 봉사직', '창의성 요구 업무'],
    savingStyle: '목표 달성형 저축 - 명확한 금액 목표 설정 후 달성. 게임처럼 목표 격파.',
    spendingStyle: '품격 소비형 - 저렴한 것은 사지 않음. 좋은 것에 투자하고 오래 쓰는 스타일.',
    investmentProfile: '적극적 가치 투자자 - 고수익 추구하되 분석 기반 투자. 주식, 선물, 부동산 등 다양한 포트폴리오.',
    wealthPeak: '35-50세 전문성과 판단력이 빛나는 시기. 큰 딜과 투자로 도약.',
    luckyBusiness: ['투자/자산관리', '법률/회계', '귀금속/보석', '자동차/기계', 'IT솔루션'],
    luckyItems: ['흰색/금색 지갑', '금속 액세서리', '시계', '만년필'],
    luckyColors: ['흰색', '금색', '은색', '회색'],
    wealthTips: ['가을(8-10월)에 투자 결정 유리', '서쪽 방향 사업장이 좋음', '금속/귀금속 투자 고려', '전문가 네트워크 구축', '손절 라인 미리 설정'],
    monthlyAdvice: [
      { month: '1월', advice: '연간 투자 전략 수립. 포트폴리오 리밸런싱.' },
      { month: '2월', advice: '시장 분석 및 트렌드 파악. 공부의 달.' },
      { month: '3월', advice: '1분기 성과 점검. 전략 수정.' },
      { month: '4월', advice: '새로운 투자처 발굴. 리서치 강화.' },
      { month: '5월', advice: '중간 점검. 수익 실현 고려.' },
      { month: '6월', advice: '상반기 결산. 포지션 정리.' },
      { month: '7월', advice: '여름 조정장 활용. 저점 매수 기회.' },
      { month: '8월', advice: '가을 투자 시즌 준비. 자금 확보.' },
      { month: '9월', advice: '투자 적기 도래. 과감한 결정.' },
      { month: '10월', advice: '수확의 달. 적정 수익 실현.' },
      { month: '11월', advice: '연말 세금 최적화. 손익 조절.' },
      { month: '12월', advice: '올해 성과 정리. 내년 전략 구상.' }
    ],
    lifetimeWealthPath: '20대 전문성 구축 → 30대 실전 경험 → 40대 큰 딜 성사 → 50대 자산 관리 → 60대 후배 멘토링',
    retirementStyle: '투자 수익으로 여유로운 노후. 사외이사, 자문 역할로 영향력 유지. 골프 등 품격 있는 취미.',
    wealthBlockers: ['자존심', '독단', '손절 지연', '융통성 부족'],
    wealthBoosters: ['결단력', '분석력', '전문성', '네트워크']
  },
  '신': {
    wealthPersonality: '정교형 재물가 - 세밀한 분석과 품질로 가치를 창출하는 타입입니다. 전문 기술과 품질 관리에 강합니다.',
    moneyMindset: '돈은 정확한 노력의 대가입니다. 품질과 정직함으로 신뢰를 얻고 그것이 수익으로 돌아온다고 믿습니다.',
    strengths: ['세밀한 분석력', '품질 관리 능력', '전문 기술 보유', '신뢰성 구축', '꼼꼼한 재무 관리'],
    weaknesses: ['결정 지연', '완벽주의 비용 증가', '확장 주저', '융통성 부족', '새로운 시도 거부'],
    idealIncome: ['보석감정사', '품질관리', '회계/세무', '의료/치과', 'IT개발', '시계/정밀기계', '감정평가'],
    avoidIncome: ['즉흥적 사업', '고객 접점 많은 업무', '창의성 위주 업무', '불확실성 높은 업종'],
    savingStyle: '체계적 분산 저축 - 여러 계좌에 목적별로 분리 저축. 스프레드시트로 관리.',
    spendingStyle: '가성비 분석 소비 - 구매 전 리뷰, 가격비교 철저. 충동구매 거의 없음.',
    investmentProfile: '분석형 투자자 - 데이터 기반 의사결정. 감정 배제. 분산 투자로 리스크 관리.',
    wealthPeak: '40-55세 전문성 인정받아 고수익 달성. 꾸준한 상승형.',
    luckyBusiness: ['감정/평가', '정밀 기계', 'IT/소프트웨어', '의료기기', '주얼리'],
    luckyItems: ['은색/회색 지갑', '금속 시계', '스틸 액세서리', '정밀 도구'],
    luckyColors: ['은색', '회색', '화이트', '라이트블루'],
    wealthTips: ['가을(8-10월)에 새 프로젝트 시작', '전문 자격증 취득으로 몸값 상승', '품질로 경쟁 (가격 경쟁 피하기)', '정기적 스킬 업데이트', '꼼꼼한 계약 검토'],
    monthlyAdvice: [
      { month: '1월', advice: '연간 재무 계획 수립. 세부 예산 편성.' },
      { month: '2월', advice: '스킬 업그레이드 계획. 자격증 준비.' },
      { month: '3월', advice: '1분기 점검. 계획 대비 실적 분석.' },
      { month: '4월', advice: '새로운 도구/기술 도입 검토.' },
      { month: '5월', advice: '중간 점검. 포트폴리오 리밸런싱.' },
      { month: '6월', advice: '상반기 결산. 세부 분석.' },
      { month: '7월', advice: '스킬 연마. 자기 개발 투자.' },
      { month: '8월', advice: '새 프로젝트 준비. 리서치.' },
      { month: '9월', advice: '전문성 발휘 시기. 적극적 활동.' },
      { month: '10월', advice: '성과 창출의 달. 결실 기대.' },
      { month: '11월', advice: '연말 정산 준비. 세금 최적화.' },
      { month: '12월', advice: '한 해 데이터 정리. 내년 전략 수립.' }
    ],
    lifetimeWealthPath: '20대 기술 습득 → 30대 전문가 인정 → 40대 고수익 달성 → 50대 확장 → 60대 후배 교육',
    retirementStyle: '전문 지식으로 자문/컨설팅. 취미로 정밀 공예. 체계적인 노후 자금 관리.',
    wealthBlockers: ['결정 지연', '완벽주의', '확장 거부', '융통성 부족'],
    wealthBoosters: ['전문성', '품질', '신뢰', '체계적 관리']
  },
  '임': {
    wealthPersonality: '지혜형 재물가 - 넓은 시야와 통찰력으로 기회를 포착하는 타입입니다. 무역과 글로벌 비즈니스에 강합니다.',
    moneyMindset: '돈은 흐름입니다. 막히면 썩고, 흘러야 불어납니다. 순환과 투자를 중시합니다.',
    strengths: ['글로벌 시야', '기회 포착력', '유연한 전략', '인맥 활용', '위기 대응 능력'],
    weaknesses: ['산만함', '깊이 부족', '변덕', '약속 불이행', '집중력 분산'],
    idealIncome: ['무역/수출입', '여행/관광', '물류/운송', '외교/국제기구', '철학/교수', '컨설팅', '미디어'],
    avoidIncome: ['단순 반복 업무', '좁은 분야 특화', '로컬 사업', '규칙 엄격한 업종'],
    savingStyle: '흐름 저축형 - 수입이 클 때 크게 저축, 작을 때 작게. 고정 금액보다 비율로.',
    spendingStyle: '경험 중심 소비 - 물건보다 여행, 교육, 경험에 투자. 소유보다 경험.',
    investmentProfile: '글로벌 분산 투자자 - 해외 주식, ETF, 외화 등 다양한 통화/지역 분산.',
    wealthPeak: '35-50세 글로벌 네트워크와 경험이 수익으로 연결되는 시기.',
    luckyBusiness: ['무역회사', '여행사', '온라인 글로벌 셀링', '교육 플랫폼', '컨설팅'],
    luckyItems: ['검정/남색 지갑', '글로브/지구본', '여권 케이스', '여행 가방'],
    luckyColors: ['검정', '남색', '다크블루', '차콜'],
    wealthTips: ['겨울(11-1월)에 해외 비즈니스 유리', '북쪽 방향 또는 해외 시장 공략', '외국어 능력 = 수입 상승', '글로벌 네트워크 구축', '한 곳에 올인하지 말 것'],
    monthlyAdvice: [
      { month: '1월', advice: '글로벌 트렌드 분석. 해외 시장 조사.' },
      { month: '2월', advice: '네트워킹 강화. 해외 파트너 접촉.' },
      { month: '3월', advice: '새로운 시장 진출 계획. 언어 공부.' },
      { month: '4월', advice: '해외 출장/미팅. 기회 탐색.' },
      { month: '5월', advice: '계약 협상. 파트너십 구축.' },
      { month: '6월', advice: '상반기 글로벌 사업 점검.' },
      { month: '7월', advice: '여름 휴가 겸 해외 리서치.' },
      { month: '8월', advice: '새로운 아이디어 구상. 브레인스토밍.' },
      { month: '9월', advice: '하반기 전략 실행. 해외 론칭.' },
      { month: '10월', advice: '파트너 관계 강화. 신뢰 구축.' },
      { month: '11월', advice: '겨울 비즈니스 적기. 적극적 활동.' },
      { month: '12월', advice: '연말 결산. 글로벌 성과 정리.' }
    ],
    lifetimeWealthPath: '20대 세계 경험 → 30대 글로벌 네트워크 → 40대 국제 비즈니스 → 50대 확장 → 60대 지혜 전수',
    retirementStyle: '세계 여행하며 자유로운 노후. 글로벌 자문/멘토링. 여러 나라에 거점.',
    wealthBlockers: ['산만함', '집중력 부족', '변덕', '깊이 부족'],
    wealthBoosters: ['글로벌 시야', '유연성', '네트워크', '통찰력']
  },
  '계': {
    wealthPersonality: '직관형 재물가 - 감각과 직관으로 기회를 잡는 타입입니다. 예술과 서비스, 무의식적 영역에 강합니다.',
    moneyMindset: '돈은 에너지입니다. 좋은 에너지를 쓰면 좋은 돈이 들어온다고 믿습니다. 영적/감성적 접근.',
    strengths: ['직관적 투자 감각', '트렌드 예측력', '예술적 가치 창출', '힐링/서비스 능력', '공감 능력'],
    weaknesses: ['비합리적 판단', '감정적 투자', '현실 감각 부족', '재무 관리 취약', '일관성 부족'],
    idealIncome: ['예술가', '타로/상담', '심리상담', '힐링/웰니스', '음악/공연', '영성 서비스', 'ASMR/명상 콘텐츠'],
    avoidIncome: ['데이터 분석', '정밀 계산 업무', '규칙적 사무직', '논리 중심 업무'],
    savingStyle: '직관 저축형 - 느낌 올 때 저축. 강제 저축 시스템이 필요. 자동이체 필수.',
    spendingStyle: '감성 소비형 - 기분에 따라 지출 변동 큼. 예산 앱으로 통제 필요.',
    investmentProfile: '직관형 투자자 - 느낌으로 투자. 가끔 대박이 나지만 리스크도 큼. 소액 분산 권장.',
    wealthPeak: '30-45세 직관력이 빛나는 시기. 예술/서비스로 인정받으면 큰 수익.',
    luckyBusiness: ['타로/사주', '명상센터', '아로마/힐링', '예술/음악', '심리상담'],
    luckyItems: ['보라/검정 지갑', '크리스탈', '달 모양 소품', '물 소리 분수'],
    luckyColors: ['보라', '검정', '은색', '달빛색'],
    wealthTips: ['겨울 밤(11-1월)에 직관 최고조', '물가/북쪽 방향이 좋은 기운', '명상으로 재물 직관 강화', '예술/힐링으로 수입 다각화', '감정적 투자 결정 24시간 대기'],
    monthlyAdvice: [
      { month: '1월', advice: '새해 비전 명상. 직관으로 목표 설정.' },
      { month: '2월', advice: '감성 콘텐츠 제작. 창작 활동.' },
      { month: '3월', advice: '봄 에너지로 새 프로젝트 시작.' },
      { month: '4월', advice: '협업 기회 탐색. 예술적 파트너십.' },
      { month: '5월', advice: '감사와 풍요 에너지. 나눔으로 복 받기.' },
      { month: '6월', advice: '중간 점검. 직관 vs 현실 균형.' },
      { month: '7월', advice: '여름 에너지 활용. 활발한 활동.' },
      { month: '8월', advice: '휴식과 명상. 내면의 소리 듣기.' },
      { month: '9월', advice: '가을 영감. 새로운 창작물.' },
      { month: '10월', advice: '수확의 에너지. 그동안의 결실.' },
      { month: '11월', advice: '직관력 최고조. 중요한 결정.' },
      { month: '12월', advice: '한 해 감사 정리. 내년 비전 명상.' }
    ],
    lifetimeWealthPath: '20대 감각 개발 → 30대 예술성 인정 → 40대 전문가 등극 → 50대 지혜 전수 → 60대 영적 성장',
    retirementStyle: '힐링과 예술로 풍요로운 노후. 명상, 요가, 창작 활동. 후배 양성과 영적 성장.',
    wealthBlockers: ['비합리적 판단', '감정적 투자', '현실 감각 부족', '일관성 부족'],
    wealthBoosters: ['직관', '예술성', '공감 능력', '영적 감각']
  }
};

interface WealthFortuneResultProps {
  formData: WealthFortuneFormData;
  onReset: () => void;
  onBack: () => void;
}

export default function WealthFortuneResult({ formData, onReset, onBack }: WealthFortuneResultProps) {
  const { name, year, month, day, gender } = formData;

  // 일주 계산
  const dayPillar = getDayPillar(year, month, day);
  const dayStem = dayPillar.stem;
  const dayBranch = dayPillar.branch;
  const userElement = dayStem.element;

  // 오늘 날짜
  const today = new Date();
  const todayPillar = getDayPillar(today.getFullYear(), today.getMonth() + 1, today.getDate());
  const tenGod = getTenGod(dayStem.ko, todayPillar.stem.ko);

  // 시드값 생성 (고정된 결과를 위해)
  const seed = year * 10000 + month * 100 + day;
  const seededRandom = (offset: number) => {
    const x = Math.sin(seed + offset) * 10000;
    return x - Math.floor(x);
  };

  // 재물 팔자 점수 계산 (40-95)
  const calculateWealthScore = () => {
    let score = 60;

    // 일간별 기본 재물운
    const elementScores: { [key: string]: number } = {
      '목': 65, '화': 60, '토': 75, '금': 80, '수': 70
    };
    score = elementScores[userElement] || 65;

    // 십성에 따른 가감
    if (tenGod === '정재' || tenGod === '편재') score += 15;
    else if (tenGod === '식신' || tenGod === '상관') score += 10;
    else if (tenGod === '정관' || tenGod === '편관') score += 5;
    else if (tenGod === '겁재' || tenGod === '비견') score -= 5;

    // 성별 보정
    if (gender === 'male' && tenGod === '정재') score += 5;
    if (gender === 'female' && tenGod === '편재') score += 5;

    // 지지(띠)별 재물운
    const branchScores: { [key: string]: number } = {
      '자': 70, '축': 80, '인': 65, '묘': 60,
      '진': 85, '사': 75, '오': 65, '미': 70,
      '신': 80, '유': 85, '술': 75, '해': 70
    };
    score += (branchScores[dayBranch.ko] || 70) - 70;

    return Math.max(40, Math.min(95, score));
  };

  const wealthScore = calculateWealthScore();

  // 재물 등급 판정
  const getWealthGrade = () => {
    if (wealthScore >= 85) return { grade: '대박 재물상', emoji: '💎', color: 'text-purple-400', desc: '평생 돈 걱정 없는 대부호의 팔자입니다!' };
    if (wealthScore >= 75) return { grade: '상위 재물상', emoji: '👑', color: 'text-yellow-400', desc: '꾸준히 재물이 쌓이는 복 많은 팔자입니다.' };
    if (wealthScore >= 65) return { grade: '안정 재물상', emoji: '💰', color: 'text-green-400', desc: '안정적인 수입으로 풍요로운 삶을 살 팔자입니다.' };
    if (wealthScore >= 55) return { grade: '성장 재물상', emoji: '📈', color: 'text-blue-400', desc: '노력에 따라 재물이 늘어나는 팔자입니다.' };
    return { grade: '실속 재물상', emoji: '🌱', color: 'text-emerald-400', desc: '알뜰하게 모으면 부를 이룰 수 있는 팔자입니다.' };
  };

  const gradeInfo = getWealthGrade();

  // 평생 예상 수입 계산 (재미용)
  const getLifetimeEarnings = () => {
    const base = wealthScore * 100000000; // 기본 100억 기준
    const variation = seededRandom(1) * 50000000000;
    const total = base + variation;

    if (total >= 10000000000) return `${Math.floor(total / 100000000)}억원+`;
    return `${Math.floor(total / 100000000)}억원`;
  };

  // 재물 성향 분석
  const getWealthType = () => {
    const types: { [key: string]: { type: string; desc: string; icon: typeof Coins } } = {
      '목': { type: '성장형 재물', desc: '사업이나 창업으로 재물을 불려나가는 타입입니다. 초기에는 힘들어도 점점 성장합니다.', icon: TrendingUp },
      '화': { type: '활동형 재물', desc: '적극적인 활동과 인맥으로 돈을 버는 타입입니다. 영업, 마케팅에 강합니다.', icon: Star },
      '토': { type: '안정형 재물', desc: '부동산이나 안정적인 투자로 재물을 모으는 타입입니다. 꾸준함이 강점입니다.', icon: PiggyBank },
      '금': { type: '투자형 재물', desc: '금융, 투자에 뛰어난 감각을 가진 타입입니다. 주식, 코인에서 수익을 낼 수 있습니다.', icon: DollarSign },
      '수': { type: '지혜형 재물', desc: '전문성이나 지식으로 돈을 버는 타입입니다. 기술직, 전문직에서 성공합니다.', icon: Gem },
    };
    return types[userElement] || types['토'];
  };

  const wealthType = getWealthType();

  // 투자 적기 계산
  const getInvestmentDays = () => {
    const currentMonth = today.getMonth() + 1;
    const days: string[] = [];

    // 각 월의 좋은 날 계산 (간단한 로직)
    for (let i = 0; i < 3; i++) {
      const targetMonth = ((currentMonth + i - 1) % 12) + 1;
      const luckyDays = [
        Math.floor(seededRandom(targetMonth) * 10) + 1,
        Math.floor(seededRandom(targetMonth + 100) * 10) + 11,
        Math.floor(seededRandom(targetMonth + 200) * 8) + 21,
      ];
      days.push(`${targetMonth}월 ${luckyDays.join('일, ')}일`);
    }

    return days;
  };

  // 로또 행운 번호 생성
  const getLuckyNumbers = () => {
    const numbers: number[] = [];
    const elementBonus: { [key: string]: number[] } = {
      '목': [3, 8, 13, 18, 23, 28, 33, 38],
      '화': [2, 7, 12, 17, 22, 27, 32, 37],
      '토': [5, 10, 15, 20, 25, 30, 35, 40],
      '금': [4, 9, 14, 19, 24, 29, 34, 39],
      '수': [1, 6, 11, 16, 21, 26, 31, 36],
    };

    const bonus = elementBonus[userElement] || elementBonus['토'];

    // 6개 번호 선택
    while (numbers.length < 6) {
      let num: number;
      if (numbers.length < 2) {
        // 처음 2개는 오행에 맞는 번호
        num = bonus[Math.floor(seededRandom(numbers.length + 300) * bonus.length)];
      } else {
        // 나머지는 랜덤
        num = Math.floor(seededRandom(numbers.length + 400) * 45) + 1;
      }
      if (!numbers.includes(num) && num >= 1 && num <= 45) {
        numbers.push(num);
      }
    }

    return numbers.sort((a, b) => a - b);
  };

  // 재물 조언
  const getWealthAdvice = () => {
    const advice: { [key: string]: string[] } = {
      '목': [
        '봄철(2-4월)에 새로운 사업이나 투자를 시작하면 좋습니다.',
        '동쪽 방향의 부동산이나 사업장이 재물을 불러옵니다.',
        '녹색 계열의 지갑이나 소품이 금전운을 높여줍니다.',
        '나무와 관련된 사업(가구, 인테리어, 농업)에 기회가 있습니다.',
      ],
      '화': [
        '여름철(5-7월)에 적극적인 재테크 활동이 효과적입니다.',
        '남쪽 방향이 재물을 끌어당기는 방위입니다.',
        '빨간색이나 보라색 소품이 금전운을 활성화합니다.',
        'IT, 전기, 미디어 관련 분야에서 수익 기회가 많습니다.',
      ],
      '토': [
        '환절기(3, 6, 9, 12월)에 재물운이 상승합니다.',
        '중앙 또는 고향 방향의 투자가 안정적입니다.',
        '노란색, 베이지색 지갑이 재물을 지켜줍니다.',
        '부동산, 건설, 식품업에서 좋은 기회를 찾을 수 있습니다.',
      ],
      '금': [
        '가을철(8-10월)에 투자 수익률이 높아집니다.',
        '서쪽 방향의 금융기관이나 사업장이 유리합니다.',
        '흰색, 금색 계열의 소품이 금전운을 높입니다.',
        '금융, 귀금속, 기계 관련 분야에 적성이 맞습니다.',
      ],
      '수': [
        '겨울철(11-1월)에 큰 거래나 계약이 성사됩니다.',
        '북쪽 방향에서 재물의 기운이 들어옵니다.',
        '검정색, 파란색 소품이 재물을 끌어당깁니다.',
        '물류, 유통, 서비스업에서 성공 확률이 높습니다.',
      ],
    };
    return advice[userElement] || advice['토'];
  };

  // 올해 재물운 예측
  const getYearlyForecast = () => {
    const forecasts = [
      { month: '1-3월', score: Math.floor(seededRandom(500) * 30 + 50), desc: '새해 계획을 세우기 좋은 시기' },
      { month: '4-6월', score: Math.floor(seededRandom(600) * 30 + 55), desc: '적극적인 투자 활동의 시기' },
      { month: '7-9월', score: Math.floor(seededRandom(700) * 30 + 50), desc: '안정적인 수익 관리 시기' },
      { month: '10-12월', score: Math.floor(seededRandom(800) * 30 + 60), desc: '결실을 맺는 수확의 시기' },
    ];
    return forecasts;
  };

  const luckyNumbers = getLuckyNumbers();
  const investmentDays = getInvestmentDays();
  const wealthAdvice = getWealthAdvice();
  const yearlyForecast = getYearlyForecast();

  // 일간별 상세 재물 프로필 가져오기
  const wealthProfile = DAY_STEM_WEALTH[dayStem.ko] || DAY_STEM_WEALTH['갑'];

  // 현재 월 조언 가져오기
  const currentMonth = today.getMonth() + 1;
  const currentMonthAdvice = wealthProfile.monthlyAdvice.find(
    m => m.month === `${currentMonth}월`
  ) || wealthProfile.monthlyAdvice[0];

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
      <div className="max-w-2xl mx-auto">
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
        <motion.div
          variants={itemVariants}
          className="glass-strong rounded-3xl p-6 md:p-8 text-center mb-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/20 rounded-full blur-3xl -z-10" />

          <h1
            className="text-2xl md:text-3xl font-bold gradient-text mb-2"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            {name}님의 재물 팔자
          </h1>
          <p className="text-slate-400 mb-6">
            {dayStem.ko}({dayStem.cn}) 일간 · {dayBranch.ko}({dayBranch.cn}) 일지
          </p>

          {/* 재물 점수 */}
          <div className="relative w-40 h-40 mx-auto mb-6">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="12"
              />
              <motion.circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="url(#goldGradient)"
                strokeWidth="12"
                strokeLinecap="round"
                initial={{ strokeDasharray: '0 440' }}
                animate={{ strokeDasharray: `${(wealthScore / 100) * 440} 440` }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl mb-1">{gradeInfo.emoji}</span>
              <span className="text-3xl font-bold text-yellow-400">{wealthScore}점</span>
            </div>
          </div>

          <div className={`text-xl font-bold ${gradeInfo.color} mb-2`}>
            {gradeInfo.grade}
          </div>
          <p className="text-slate-300">{gradeInfo.desc}</p>
        </motion.div>

        {/* 평생 예상 수입 */}
        <motion.div
          variants={itemVariants}
          className="glass-strong rounded-3xl p-6 mb-6 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Crown className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-bold text-white">평생 예상 수입</h2>
          </div>
          <motion.div
            className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {getLifetimeEarnings()}
          </motion.div>
          <p className="text-slate-400 text-sm">
            * 사주팔자 기반 재미용 예측입니다
          </p>
        </motion.div>

        {/* 재물 성향 */}
        <motion.div
          variants={itemVariants}
          className="glass-strong rounded-3xl p-6 mb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center">
              <wealthType.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{wealthType.type}</h2>
              <p className="text-yellow-400 text-sm">{userElement} 오행 기반</p>
            </div>
          </div>
          <p className="text-slate-300 leading-relaxed">{wealthType.desc}</p>
        </motion.div>

        {/* 분기별 재물운 */}
        <motion.div
          variants={itemVariants}
          className="glass-strong rounded-3xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-yellow-400" />
            <h2 className="text-lg font-bold text-white">2025년 분기별 재물운</h2>
          </div>
          <div className="space-y-4">
            {yearlyForecast.map((period, i) => (
              <div key={i} className="bg-slate-800/50 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-300 font-medium">{period.month}</span>
                  <span className="text-yellow-400 font-bold">{period.score}점</span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden mb-2">
                  <motion.div
                    className="h-full bg-gradient-to-r from-yellow-500 to-amber-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${period.score}%` }}
                    transition={{ duration: 0.8, delay: i * 0.2 }}
                  />
                </div>
                <p className="text-slate-400 text-sm">{period.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 투자 적기 */}
        <motion.div
          variants={itemVariants}
          className="glass-strong rounded-3xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <h2 className="text-lg font-bold text-white">투자하기 좋은 날</h2>
          </div>
          <div className="grid gap-3">
            {investmentDays.map((dayInfo, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-xl p-4"
              >
                <Clock className="w-5 h-5 text-green-400" />
                <span className="text-green-300 font-medium">{dayInfo}</span>
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-xs mt-3">
            * 주식, 코인, 부동산 등 투자 결정 시 참고하세요
          </p>
        </motion.div>

        {/* 로또 행운 번호 */}
        <motion.div
          variants={itemVariants}
          className="glass-strong rounded-3xl p-6 mb-6 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gift className="w-5 h-5 text-pink-400" />
            <h2 className="text-lg font-bold text-white">로또 행운 번호</h2>
          </div>
          <div className="flex justify-center gap-3 mb-4">
            {luckyNumbers.map((num, i) => (
              <motion.div
                key={i}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-black font-bold text-lg shadow-lg"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.8 + i * 0.1, type: 'spring' }}
              >
                {num}
              </motion.div>
            ))}
          </div>
          <p className="text-slate-400 text-sm">
            {userElement} 오행 기반 행운의 숫자입니다
          </p>
        </motion.div>

        {/* 재물 조언 */}
        <motion.div
          variants={itemVariants}
          className="glass-strong rounded-3xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <h2 className="text-lg font-bold text-white">재물운 높이는 방법</h2>
          </div>
          <div className="space-y-3">
            {wealthAdvice.map((advice, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-yellow-400 text-sm font-bold">{i + 1}</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{advice}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ===== 일간별 상세 재물 프로필 시작 ===== */}

        {/* 재물 성격 상세 */}
        <motion.div
          variants={itemVariants}
          className="glass-strong rounded-3xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Crown className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-bold text-white">{dayStem.ko}일간 재물 성격</h2>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 mb-4">
            <p className="text-purple-200 leading-relaxed">{wealthProfile.wealthPersonality}</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4">
            <h3 className="text-sm font-medium text-slate-400 mb-2">💰 돈에 대한 마인드셋</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{wealthProfile.moneyMindset}</p>
          </div>
        </motion.div>

        {/* 재물 강점 & 약점 */}
        <motion.div
          variants={itemVariants}
          className="glass-strong rounded-3xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-bold text-white">재물 강점 & 약점</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
              <h3 className="text-emerald-400 font-medium mb-3 flex items-center gap-2">
                <span>✅</span> 재물 강점
              </h3>
              <ul className="space-y-2">
                {wealthProfile.strengths.map((s, i) => (
                  <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
              <h3 className="text-red-400 font-medium mb-3 flex items-center gap-2">
                <span>⚠️</span> 재물 약점
              </h3>
              <ul className="space-y-2">
                {wealthProfile.weaknesses.map((w, i) => (
                  <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* 이상적인 수입원 */}
        <motion.div
          variants={itemVariants}
          className="glass-strong rounded-3xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-5 h-5 text-green-400" />
            <h2 className="text-lg font-bold text-white">이상적인 수입원</h2>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-4">
            <h3 className="text-green-400 font-medium mb-3">💼 추천 직업/사업</h3>
            <div className="flex flex-wrap gap-2">
              {wealthProfile.idealIncome.map((job, i) => (
                <span key={i} className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                  {job}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
            <h3 className="text-orange-400 font-medium mb-3">🚫 피해야 할 분야</h3>
            <div className="flex flex-wrap gap-2">
              {wealthProfile.avoidIncome.map((job, i) => (
                <span key={i} className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm">
                  {job}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 저축 & 소비 스타일 */}
        <motion.div
          variants={itemVariants}
          className="glass-strong rounded-3xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <PiggyBank className="w-5 h-5 text-pink-400" />
            <h2 className="text-lg font-bold text-white">저축 & 소비 스타일</h2>
          </div>
          <div className="space-y-4">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
              <h3 className="text-blue-400 font-medium mb-2">🏦 저축 스타일</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{wealthProfile.savingStyle}</p>
            </div>
            <div className="bg-pink-500/10 border border-pink-500/30 rounded-xl p-4">
              <h3 className="text-pink-400 font-medium mb-2">🛍️ 소비 스타일</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{wealthProfile.spendingStyle}</p>
            </div>
          </div>
        </motion.div>

        {/* 투자 성향 */}
        <motion.div
          variants={itemVariants}
          className="glass-strong rounded-3xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">투자 성향 프로필</h2>
          </div>
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 mb-4">
            <p className="text-cyan-200 leading-relaxed">{wealthProfile.investmentProfile}</p>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
            <h3 className="text-yellow-400 font-medium mb-2">⏰ 재물 전성기</h3>
            <p className="text-slate-300 text-sm">{wealthProfile.wealthPeak}</p>
          </div>
        </motion.div>

        {/* 행운의 사업/아이템/컬러 */}
        <motion.div
          variants={itemVariants}
          className="glass-strong rounded-3xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Gem className="w-5 h-5 text-violet-400" />
            <h2 className="text-lg font-bold text-white">행운의 재물 아이템</h2>
          </div>
          <div className="space-y-4">
            <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl p-4">
              <h3 className="text-violet-400 font-medium mb-3">🏪 행운의 사업 분야</h3>
              <div className="flex flex-wrap gap-2">
                {wealthProfile.luckyBusiness.map((biz, i) => (
                  <span key={i} className="px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full text-sm">
                    {biz}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
              <h3 className="text-amber-400 font-medium mb-3">🎁 행운의 아이템</h3>
              <div className="flex flex-wrap gap-2">
                {wealthProfile.luckyItems.map((item, i) => (
                  <span key={i} className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4">
              <h3 className="text-rose-400 font-medium mb-3">🎨 행운의 컬러</h3>
              <div className="flex flex-wrap gap-2">
                {wealthProfile.luckyColors.map((color, i) => (
                  <span key={i} className="px-3 py-1 bg-rose-500/20 text-rose-300 rounded-full text-sm">
                    {color}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 월별 재물 조언 */}
        <motion.div
          variants={itemVariants}
          className="glass-strong rounded-3xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">월별 재물 조언</h2>
          </div>

          {/* 이번 달 하이라이트 */}
          <div className="bg-indigo-500/20 border border-indigo-500/40 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-indigo-500 text-white text-xs rounded-full">이번 달</span>
              <span className="text-indigo-300 font-medium">{currentMonthAdvice.month}</span>
            </div>
            <p className="text-white">{currentMonthAdvice.advice}</p>
          </div>

          {/* 전체 월별 조언 */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {wealthProfile.monthlyAdvice.map((m, i) => (
              <div
                key={i}
                className={`rounded-xl p-3 ${
                  m.month === `${currentMonth}월`
                    ? 'bg-indigo-500/30 border border-indigo-500/50'
                    : 'bg-slate-800/50'
                }`}
              >
                <div className="text-slate-400 text-xs mb-1">{m.month}</div>
                <p className="text-slate-300 text-xs leading-relaxed">{m.advice}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 재물 핵심 조언 */}
        <motion.div
          variants={itemVariants}
          className="glass-strong rounded-3xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Wallet className="w-5 h-5 text-teal-400" />
            <h2 className="text-lg font-bold text-white">재물 핵심 조언</h2>
          </div>
          <div className="space-y-3">
            {wealthProfile.wealthTips.map((tip, i) => (
              <div key={i} className="flex gap-3 items-start bg-teal-500/10 border border-teal-500/30 rounded-xl p-3">
                <div className="w-6 h-6 rounded-full bg-teal-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-teal-400 text-sm font-bold">{i + 1}</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 평생 재물 여정 */}
        <motion.div
          variants={itemVariants}
          className="glass-strong rounded-3xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-orange-400" />
            <h2 className="text-lg font-bold text-white">평생 재물 여정</h2>
          </div>
          <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/30 rounded-xl p-4 mb-4">
            <p className="text-orange-200 text-sm leading-relaxed">{wealthProfile.lifetimeWealthPath}</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4">
            <h3 className="text-slate-400 font-medium mb-2">🏖️ 은퇴 후 재물 스타일</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{wealthProfile.retirementStyle}</p>
          </div>
        </motion.div>

        {/* 재물 방해요소 & 증폭요소 */}
        <motion.div
          variants={itemVariants}
          className="glass-strong rounded-3xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-lime-400" />
            <h2 className="text-lg font-bold text-white">재물 방해요소 & 증폭요소</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
              <h3 className="text-red-400 font-medium mb-3">🚧 재물 방해요소</h3>
              <div className="flex flex-wrap gap-2">
                {wealthProfile.wealthBlockers.map((b, i) => (
                  <span key={i} className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm">
                    {b}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-lime-500/10 border border-lime-500/30 rounded-xl p-4">
              <h3 className="text-lime-400 font-medium mb-3">🚀 재물 증폭요소</h3>
              <div className="flex flex-wrap gap-2">
                {wealthProfile.wealthBoosters.map((b, i) => (
                  <span key={i} className="px-3 py-1 bg-lime-500/20 text-lime-300 rounded-full text-sm">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ===== 일간별 상세 재물 프로필 끝 ===== */}

        {/* 버튼 */}
        <motion.div variants={itemVariants} className="space-y-3">
          <button
            onClick={onReset}
            className="w-full py-4 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-2xl text-black font-bold text-lg hover:from-yellow-600 hover:to-amber-700 transition-all flex items-center justify-center gap-2 shadow-lg"
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
