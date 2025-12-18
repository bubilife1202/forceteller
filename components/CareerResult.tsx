'use client';

import { motion } from 'framer-motion';
import { Briefcase, ArrowLeft, RefreshCw, Star, Target, TrendingUp, AlertTriangle, Clock, Zap, Award, Users, DollarSign, Lightbulb, Heart, Compass } from 'lucide-react';
import { calculateSaju } from '@/lib/saju-calculator';
import { CareerFormData } from './CareerForm';

interface CareerResultProps {
  formData: CareerFormData;
  onReset: () => void;
  onBack: () => void;
}

// 일간별 직업 적성 (확장판)
const DAY_STEM_CAREER: Record<string, {
  element: string;
  personality: string;
  strengths: string[];
  weaknesses: string[];
  idealJobs: string[];
  avoidJobs: string[];
  workStyle: string;
  leaderType: string;
  teamRole: string;
  salaryPotential?: string;
  careerPath?: string;
  networkingStyle?: string;
  stressManagement?: string;
  idealWorkEnvironment?: string;
  skillsToLearn?: string[];
  careerMilestones?: string;
  sideJobIdeas?: string[];
  investmentStyle?: string;
  retirementAdvice?: string;
}> = {
  '갑': {
    element: '목(木)',
    personality: '리더십과 추진력의 소유자. 마치 하늘 높이 뻗어가는 큰 나무처럼, 당신은 어떤 조직에서든 중심이 되어 성장을 이끄는 힘을 가지고 있습니다. 새로운 도전을 두려워하지 않고, 목표가 정해지면 흔들림 없이 전진하는 강인한 정신력의 소유자입니다.',
    strengths: ['강한 주도력으로 팀을 이끔', '명확한 목표 설정 능력', '끊임없는 성장 욕구', '정의로운 판단력', '위기 상황에서의 결단력', '새로운 분야 개척 능력', '카리스마 있는 리더십'],
    weaknesses: ['타인 의견 수용 부족', '융통성이 부족할 수 있음', '독단적 결정 경향', '참을성 부족으로 조급함', '완벽주의로 인한 스트레스'],
    idealJobs: ['대기업 CEO/임원', '스타트업 창업자', '변호사/검사/판사', '군 고위장교', '경찰 간부', '대학교수', '정치인/국회의원', '사회운동가', '투자회사 대표', '프로젝트 매니저', '건설회사 임원', '스포츠팀 감독'],
    avoidJobs: ['단순 반복 사무직', '하청/위탁업', '감정노동 서비스직', '보조적 역할의 업무', '창의성 없는 생산직'],
    workStyle: '목표를 세우고 앞으로 나아가는 진취적 스타일입니다. 새로운 프로젝트를 시작하고 팀을 이끄는 역할에서 빛납니다. 혼자 일하기보다는 팀을 진두지휘하며 성과를 내는 것을 선호합니다. 업무에 있어 명확한 목표와 방향이 있을 때 최고의 퍼포먼스를 발휘합니다.',
    leaderType: '카리스마형 리더 - 강한 비전을 제시하고 팀을 이끄는 타입. 어려운 상황에서도 흔들리지 않는 모습으로 팀원들에게 신뢰를 주며, 과감한 결단력으로 조직을 성공으로 이끕니다.',
    teamRole: '프로젝트 리더, 의사결정자, 방향 제시자',
    salaryPotential: '상위 10% 연봉을 목표로 하세요. 당신의 리더십은 고연봉 포지션과 잘 맞습니다. 30대 중반에 억대 연봉, 40대에 최고경영진 연봉을 목표로 커리어를 설계하세요.',
    careerPath: '20대: 실무 경험과 업계 이해 → 30대 초반: 팀장/매니저로 리더십 경험 → 30대 후반: 임원급 도전 → 40대: CEO/창업자로 독자적 영역 구축',
    networkingStyle: '업계 리더들과의 직접적인 교류를 선호합니다. 컨퍼런스, 세미나에서 적극적으로 발언하고, 자신의 비전을 공유하여 인맥을 확장하세요.',
    stressManagement: '운동, 특히 등산이나 마라톤 같은 도전적인 활동으로 스트레스를 해소하세요. 목표 달성의 성취감이 당신의 에너지원입니다.',
    idealWorkEnvironment: '성장하는 조직, 명확한 목표가 있는 환경, 자율성이 보장되는 직장, 실력으로 인정받는 문화',
    skillsToLearn: ['협상과 외교술', '감정 조절과 인내', '팀원 의견 경청법', '유연한 사고방식', '위임의 기술'],
    careerMilestones: '25세: 첫 프로젝트 리드 → 30세: 팀장 승진 → 35세: 부서장/이사 → 40세: 임원 또는 창업 → 50세: 업계 리더로 자리매김',
    sideJobIdeas: ['경영 컨설팅', '스타트업 멘토링', '강연/교육', '투자 자문', '비즈니스 코칭'],
    investmentStyle: '공격적 투자 성향. 성장주, 스타트업 투자, 부동산 개발 등 큰 수익을 노리는 투자가 맞습니다. 단, 분산 투자로 리스크 관리하세요.',
    retirementAdvice: '은퇴 후에도 멘토, 자문역으로 활동하며 영향력을 유지하세요. 완전한 은퇴보다는 후배 양성이나 사회공헌 활동이 어울립니다.',
  },
  '을': {
    element: '목(木)',
    personality: '유연함과 적응력의 달인. 바람에 흔들리는 풀이나 덩굴처럼, 어떤 환경에서도 유연하게 적응하며 자신만의 방식으로 성장해 나갑니다. 강한 것을 이기는 것은 부드러운 것이라는 진리를 몸소 보여주는 당신은 조직 내에서 갈등을 조율하고 사람들을 연결하는 핵심 인물입니다.',
    strengths: ['뛰어난 적응력과 상황 대처 능력', '섬세한 관찰력으로 디테일 포착', '끈기 있는 인내심', '협력적이고 조화로운 관계 구축', '경청하고 공감하는 소통 능력', '창의적인 문제 해결 접근', '사람들 사이의 가교 역할'],
    weaknesses: ['우유부단하여 결정이 늦어짐', '타인 의견에 지나치게 휩쓸림', '자기 주장이 약해 손해 봄', '과도한 눈치로 스트레스 축적', '거절을 못해 업무 과부하'],
    idealJobs: ['UX/UI 디자이너', '작가/소설가/시나리오작가', '심리상담사/코치', '외교관/국제기구 직원', '마케터/브랜드매니저', 'HR담당자/조직문화전문가', '예술치료사', '통역사/번역가', '큐레이터', '플로리스트/가든디자이너', 'SNS마케터', '고객경험(CX)전문가'],
    avoidJobs: ['초단기 성과 압박 영업직', '고압적 상하관계 조직', '단독 의사결정 필요 업무', '격렬한 경쟁 환경', '감정 소모 큰 클레임 업무'],
    workStyle: '유연하게 상황에 적응하며 조화를 중시합니다. 팀 내에서 갈등을 조율하고 분위기를 부드럽게 만드는 역할을 자연스럽게 수행합니다. 급격한 변화보다는 점진적인 개선을 추구하며, 사람들과의 관계 속에서 아이디어를 발전시킵니다.',
    leaderType: '서번트 리더 - 팀원을 섬기고 지원하는 스타일. 앞에 나서기보다 뒤에서 팀원들이 빛날 수 있도록 환경을 조성하고, 각자의 강점을 이끌어내는 능력이 탁월합니다.',
    teamRole: '중재자, 협력 촉진자, 팀 분위기 메이커',
    salaryPotential: '꾸준히 상승하는 연봉 곡선을 그립니다. 초반에는 느릴 수 있지만, 30대 후반부터 네트워크와 신뢰가 쌓이며 가파르게 올라갑니다. 협상보다는 인정받아 자연스럽게 오르는 타입입니다.',
    careerPath: '20대: 다양한 경험으로 적성 탐색 → 30대 초반: 전문 분야 확립 → 30대 후반: 팀 내 핵심 인물로 성장 → 40대: 조직의 조율자/중재자 역할로 필수 인력화',
    networkingStyle: '자연스러운 관계 형성을 선호합니다. 1:1 커피챗, 소규모 모임에서 깊은 관계를 만들어가세요. SNS를 통한 느슨한 연결도 당신에게 잘 맞습니다.',
    stressManagement: '자연 속 산책, 원예, 요가 등 자연과 함께하는 활동으로 에너지를 충전하세요. 혼자만의 시간도 중요합니다.',
    idealWorkEnvironment: '수평적 조직문화, 협력 중시 환경, 창의성 존중, 유연근무제, 자율적인 업무 방식',
    skillsToLearn: ['단호한 의사 표현', '우선순위 결정력', '자기 PR 능력', '협상 기술', '리더십 개발'],
    careerMilestones: '27세: 전문 분야 결정 → 32세: 팀 내 핵심 역할 → 37세: 매니저급 → 42세: 조직 문화 전문가 → 50세: 컨설턴트/멘토',
    sideJobIdeas: ['프리랜서 디자이너', '온라인 글쓰기', '상담/코칭', '번역', 'SNS 콘텐츠 제작'],
    investmentStyle: '안정 추구형. 적금, 채권, 배당주 중심의 안전한 투자가 맞습니다. 고위험 투자는 피하고, 장기적 관점에서 꾸준히 불려가세요.',
    retirementAdvice: '은퇴 후에도 사람들과 연결된 활동이 행복의 원천입니다. 커뮤니티 활동, 봉사, 취미 모임 운영 등을 통해 관계를 유지하세요.',
  },
  '병': {
    element: '화(火)',
    personality: '열정과 영향력의 아이콘. 태양처럼 뜨겁고 밝은 에너지를 가진 당신은 어디서든 주목받는 존재입니다. 사람들에게 희망과 에너지를 전파하고, 어두운 곳을 밝히는 힘을 타고났습니다. 무대 위에서 빛나고 대중을 사로잡는 것이 당신의 천부적 재능입니다.',
    strengths: ['누구도 따라올 수 없는 뜨거운 열정', '탁월한 표현력과 전달력', '사람들을 끌어당기는 영향력', '밝고 긍정적인 에너지', '자신감 있는 프레젠테이션', '네트워킹과 인맥 형성 능력', '아이디어를 현실로 만드는 추진력'],
    weaknesses: ['급한 성격으로 실수 유발', '꾸준함과 지속력 부족', '과시욕과 허영심', '비판에 예민하게 반응', '번아웃 위험이 높음'],
    idealJobs: ['배우/연예인', '유튜버/인플루언서/크리에이터', '홍보/PR전문가', '강연자/MC/사회자', 'B2B/B2C 영업 에이스', '마케팅 디렉터', '이벤트 플래너', '정치인/선거 캠프', '창업가/스타트업 대표', '패션/뷰티 업계', '광고 크리에이티브 디렉터', '엔터테인먼트 기획사'],
    avoidJobs: ['조용한 사무직', '단독 장기 연구', '뒤에서 지원하는 역할', '반복적인 관리 업무', '감정 억제 필요한 업무'],
    workStyle: '주목받고 영향력을 발휘하는 위치에서 능력을 발휘합니다. 사람들 앞에 서는 것을 즐기고 에너지를 전파하며, 팀의 사기를 올리는 역할을 합니다. 새로운 프로젝트를 시작하는 데 강하지만, 마무리까지 가려면 좋은 파트너가 필요합니다.',
    leaderType: '비전형 리더 - 열정으로 사람들에게 영감을 주는 타입. 말 한마디로 팀 전체를 움직이게 하고, 불가능을 가능으로 만드는 에너지를 가지고 있습니다.',
    teamRole: '무드메이커, 프레젠터, 스파크 플러그(동기부여자)',
    salaryPotential: '성과에 따라 연봉 편차가 큽니다. 스타가 되면 상위 1%도 가능하고, 자신을 알리는 데 성공하면 억대 연봉도 충분히 노릴 수 있습니다. 인센티브 구조가 있는 곳에서 유리합니다.',
    careerPath: '20대: 자신을 알리고 팬/고객 확보 → 30대 초반: 업계에서 이름을 떨침 → 30대 후반: 개인 브랜드 확립 → 40대: 해당 분야 대표 인물로 자리매김',
    networkingStyle: '파티, 컨퍼런스, 대규모 모임에서 빛납니다. 적극적으로 명함을 교환하고 SNS로 관계를 유지하세요. 당신의 밝은 에너지가 사람들을 끌어당깁니다.',
    stressManagement: '춤, 노래, 공연 관람 등 표현적인 활동으로 스트레스를 해소하세요. 여행이나 새로운 경험도 에너지 충전에 좋습니다.',
    idealWorkEnvironment: '자유로운 표현이 가능한 곳, 성과로 인정받는 문화, 활기찬 분위기, 미디어 노출 기회가 있는 환경',
    skillsToLearn: ['꾸준함과 지속력', '디테일 관리', '감정 조절', '팀원 배려', '경청의 기술'],
    careerMilestones: '25세: 첫 성공 경험 → 28세: 업계 주목 → 33세: 스타 포지션 → 38세: 개인 브랜드 확립 → 45세: 레전드로 기억됨',
    sideJobIdeas: ['유튜브/틱톡 크리에이터', '강연', '개인 브랜드 굿즈', 'MC/사회', '광고 모델'],
    investmentStyle: '대담한 투자 성향. 테마주, 엔터 관련 주식, 자신의 콘텐츠 사업에 투자하는 것이 맞습니다. 단, 충동 투자는 주의하세요.',
    retirementAdvice: '은퇴 후에도 무대에서 내려오기 어렵습니다. 강연, 멘토링, 유튜브 등을 통해 영향력을 유지하세요. 조용한 은퇴보다 활동적인 노년이 맞습니다.',
  },
  '정': {
    element: '화(火)',
    personality: '섬세함과 창의성의 결합. 촛불처럼 은은하면서도 따뜻한 빛을 내는 당신은 디테일의 마법사입니다. 작은 것 하나도 놓치지 않는 세심함과 예술적 감각이 결합되어, 어떤 분야에서든 완성도 높은 결과물을 만들어냅니다. 조용히 빛나며 사람들의 마음을 따뜻하게 만드는 힘이 있습니다.',
    strengths: ['섬세하고 세심한 배려', '뛰어난 예술적 감각과 미적 안목', '완벽을 추구하는 장인 정신', '꼼꼼한 작업 처리', '깊이 있는 전문성 구축', '집중력과 몰입 능력', '창의적 문제 해결'],
    weaknesses: ['과도한 걱정과 불안', '새로운 도전에 소심함', '스트레스에 취약하여 몸살기', '결정장애로 시간 지체', '비판에 상처받기 쉬움'],
    idealJobs: ['소설가/시인/작가', '프로그래머/개발자', '그래픽디자이너', '파티셰/요리사/푸드스타일리스트', '연구원/과학자', 'UX/UI 디자이너', '편집자/교정교열', '사진작가', '공예가/장인', '일러스트레이터', '보석 세공사', '정밀 기술자'],
    avoidJobs: ['대규모 영업/세일즈', '격렬한 협상', '즉흥적 결정 필요 업무', '불특정 다수 응대', '거친 현장 업무'],
    workStyle: '디테일에 강하고 완성도를 추구합니다. 조용히 집중해서 퀄리티 높은 결과물을 만들어내며, 자신만의 작업 공간과 시간이 보장될 때 최고의 성과를 냅니다. 급하게 재촉받으면 오히려 효율이 떨어지니, 충분한 시간이 필요합니다.',
    leaderType: '전문가형 리더 - 깊은 전문성으로 팀을 이끄는 타입. 말보다 결과물로 보여주며, 팀원들이 자연스럽게 따르게 됩니다. 카리스마보다 실력으로 존경받습니다.',
    teamRole: '품질 관리자, 전문가, 마지막 검토자',
    salaryPotential: '전문성에 따라 연봉이 결정됩니다. 장인급 실력을 갖추면 업계 최고 대우를 받을 수 있습니다. 초반에는 느리지만, 전문가로 인정받으면 가파르게 상승합니다.',
    careerPath: '20대: 기술/예술 기반 다지기 → 30대 초반: 전문 분야 심화 → 30대 후반: 업계 전문가로 인정 → 40대: 마스터/장인 레벨 도달',
    networkingStyle: '소수의 깊은 관계를 선호합니다. 같은 분야 전문가들과의 스터디, 작업 협업을 통해 자연스럽게 인맥을 쌓으세요. 온라인 커뮤니티도 좋습니다.',
    stressManagement: '혼자만의 창작 활동, 명상, 요리, 정원 가꾸기 등 집중할 수 있는 취미로 스트레스를 해소하세요. 자연 속 휴식도 효과적입니다.',
    idealWorkEnvironment: '조용하고 집중할 수 있는 환경, 전문성을 인정받는 문화, 충분한 작업 시간 보장, 재택근무 가능',
    skillsToLearn: ['자기 PR과 홍보', '빠른 의사결정', '완벽주의 조절', '협업 커뮤니케이션', '스트레스 관리'],
    careerMilestones: '25세: 기초 실력 완성 → 30세: 전문가 인정 → 35세: 업계 명성 획득 → 40세: 마스터급 → 50세: 거장으로 추앙',
    sideJobIdeas: ['프리랜서 디자인/개발', '온라인 클래스 운영', '핸드메이드 판매', '블로그/브런치 글쓰기', '작품 판매'],
    investmentStyle: '신중하고 보수적인 투자 성향. 충분히 분석하고 연구한 후 투자하세요. 잘 아는 분야에 집중 투자하는 것이 좋습니다.',
    retirementAdvice: '은퇴 후에도 창작 활동을 계속하세요. 취미로 시작한 것이 작품이 되고, 후배 양성이나 온라인 강의로 지식을 나눌 수 있습니다. 조용하지만 풍요로운 노년이 가능합니다.',
  },
  '무': {
    element: '토(土)',
    personality: '신뢰와 안정의 중심. 거대한 산처럼 묵직하고 흔들리지 않는 당신은 어떤 조직에서든 중심축이 됩니다. 사람들은 당신 곁에서 안정감을 느끼고, 당신의 판단을 믿습니다. 급변하는 세상 속에서도 변하지 않는 가치를 지키며, 사람들을 모으는 중력 같은 존재입니다.',
    strengths: ['누구나 믿고 의지하는 신뢰감', '흔들리지 않는 안정감', '다양한 사람을 품는 포용력', '맡은 일에 대한 강한 책임감', '위기 상황에서의 냉정함', '장기적 관점의 판단력', '조직을 하나로 모으는 구심력'],
    weaknesses: ['변화에 둔하고 적응이 느림', '한번 정한 것은 바꾸지 않는 고집', '지나치게 보수적인 성향', '새로운 시도에 대한 두려움', '유연성 부족'],
    idealJobs: ['고위 공무원/행정직', '은행 지점장/금융권 임원', '부동산 개발/투자', '대기업 인사/총무 임원', '조정/중재 전문가', '자산관리사/PB', '건설회사 임원', '농업법인 대표', '프랜차이즈 본사', '보험회사 임원', '학교장/교육 행정가', '지역 명망가/정치인'],
    avoidJobs: ['급변하는 IT 스타트업', '트렌드 변화 빠른 업종', '고위험 투자/투기', '프리랜서/1인 기업', '매일 새로운 환경'],
    workStyle: '안정적인 환경에서 꾸준히 성과를 내는 타입입니다. 조직의 중심이 되어 사람들을 모으고 신뢰를 쌓습니다. 급한 변화보다는 점진적 개선을 선호하며, 한 조직에서 오래 일하며 깊이를 더해갑니다.',
    leaderType: '안정형 리더 - 조직에 안정감을 주는 든든한 리더. 화려하지 않지만 팀원들이 믿고 따르며, 위기 상황에서도 흔들리지 않는 모습으로 조직을 지킵니다.',
    teamRole: '팀의 중심, 조정자, 기둥',
    salaryPotential: '안정적으로 상승하는 연봉 곡선입니다. 한 조직에서 오래 일하며 직급이 올라갈수록 연봉도 같이 상승합니다. 40대 이후 임원급에서 큰 도약이 있습니다.',
    careerPath: '20대: 조직 적응과 기반 마련 → 30대 초반: 중간관리자로 성장 → 30대 후반: 부서장급 → 40대: 임원/고위직 → 50대: 조직의 원로/자문역',
    networkingStyle: '공식적인 모임, 동문회, 업계 협회 등 전통적인 네트워킹을 선호합니다. 시간이 걸려도 깊고 오래가는 관계를 만드세요.',
    stressManagement: '등산, 골프, 낚시 등 자연과 함께하는 여유로운 활동으로 스트레스를 해소하세요. 가족과의 시간도 에너지 충전에 좋습니다.',
    idealWorkEnvironment: '안정적인 대기업/공기업, 명확한 체계와 규정, 장기 근속 보상, 연공서열 존중 문화',
    skillsToLearn: ['변화 수용력', '디지털 역량', '유연한 사고', '새로운 트렌드 이해', '세대 간 소통'],
    careerMilestones: '28세: 대리/주임 → 33세: 과장/팀원 핵심 → 38세: 차장/부서장 → 45세: 임원 → 55세: CEO/이사회',
    sideJobIdeas: ['부동산 투자', '프랜차이즈 오너', '임대 사업', '농장/과수원', '건물 관리'],
    investmentStyle: '안정 최우선. 예금, 채권, 부동산 등 안전 자산 중심으로 투자하세요. 고위험 투자는 피하고, 장기적 관점에서 꾸준히 자산을 불려가세요.',
    retirementAdvice: '은퇴 후에도 지역사회나 업계에서 원로로서 영향력을 유지하세요. 후배 멘토링, 자문위원, 동문회 활동 등으로 관계를 이어가는 것이 좋습니다.',
  },
  '기': {
    element: '토(土)',
    personality: '돌봄과 육성의 전문가. 비옥한 밭처럼 씨앗을 품고 키워내는 당신은 사람을 성장시키는 타고난 능력을 가지고 있습니다. 당신의 손길이 닿는 곳에서 생명이 자라고, 사람들이 성장합니다. 조용하지만 깊은 사랑으로 세상을 따뜻하게 만드는 존재입니다.',
    strengths: ['사람을 키워내는 양육 능력', '세심하고 따뜻한 배려심', '현실적이고 실용적인 접근', '꼼꼼하고 빈틈없는 관리', '무한한 인내심', '공감 능력과 경청 기술', '헌신적인 서비스 정신'],
    weaknesses: ['소극적이고 나서지 못함', '결단력이 부족해 기회 놓침', '과도한 자기희생', '타인 기준에 맞추느라 자기 소진', 'NO라고 말하지 못함'],
    idealJobs: ['초/중/고 교사', '유아교육 전문가', '간호사/조산사', '사회복지사/상담사', '원예치료사', '요양보호 전문가', '육아 전문가/베이비시터', '영양사/급식관리', '반려동물 관련업', '플로리스트', 'NGO/비영리단체', '호스피스 전문가'],
    avoidJobs: ['냉정한 결정 필요 업무', '고강도 경쟁 환경', '비정한 구조조정 담당', '공격적 영업', '감정 배제 분석 직종'],
    workStyle: '사람을 돌보고 성장시키는 역할에서 보람을 느낍니다. 조용히 팀을 서포트하며 필요한 것을 채워주고, 모두가 편하게 일할 수 있는 환경을 만듭니다. 뒤에서 묵묵히 일하며 팀의 버팀목이 됩니다.',
    leaderType: '양육형 리더 - 팀원의 성장을 돕는 멘토 스타일. 엄격함보다 따뜻함으로 이끌며, 팀원 한 명 한 명의 성장에 진심으로 관심을 가집니다.',
    teamRole: '서포터, 멘토, 팀의 어머니/아버지',
    salaryPotential: '물질적 보상보다 보람에서 만족을 찾는 타입입니다. 연봉은 안정적으로 상승하며, 교육/복지 분야에서 경력이 쌓이면 전문가로서 인정받습니다.',
    careerPath: '20대: 현장 경험과 자격 취득 → 30대 초반: 전문가로 성장 → 30대 후반: 팀장/관리자 → 40대: 기관장/센터장 → 50대: 분야 원로/멘토',
    networkingStyle: '동료와의 깊은 유대, 학부모/환자와의 신뢰 관계를 통해 자연스럽게 인맥이 형성됩니다. 봉사 활동, 종교 모임 등에서도 좋은 관계를 만듭니다.',
    stressManagement: '정원 가꾸기, 요리, 반려동물 돌보기 등 생명을 기르는 활동으로 에너지를 충전하세요. 가족과의 시간도 중요합니다.',
    idealWorkEnvironment: '협력적인 분위기, 사람 중심 가치, 워라밸 보장, 의미 있는 일, 감사받는 환경',
    skillsToLearn: ['자기 주장 기술', '거절하는 법', '자기 관리', '경계 설정', '리더십 개발'],
    careerMilestones: '25세: 현장 투입 → 30세: 전문 자격 취득 → 35세: 팀장급 → 40세: 기관 운영 → 50세: 분야 전문가/저자',
    sideJobIdeas: ['육아 컨설팅', '가드닝/원예', '반려동물 돌봄', '온라인 교육', '수공예/핸드메이드'],
    investmentStyle: '안전하고 윤리적인 투자를 선호합니다. ESG 펀드, 적금, 연금저축 등 안정적인 상품에 꾸준히 투자하세요.',
    retirementAdvice: '은퇴 후에도 돌봄의 손길을 멈추지 마세요. 손주 돌봄, 봉사 활동, 커뮤니티 가든 운영 등으로 따뜻한 노년을 보낼 수 있습니다.',
  },
  '경': {
    element: '금(金)',
    personality: '결단력과 정의의 화신. 날카로운 칼처럼 빠르고 정확한 판단을 내리는 당신은 어떤 상황에서도 흔들리지 않습니다. 옳고 그름을 명확히 구분하고, 원칙을 지키며, 공정함으로 존경받습니다. 어려운 결정도 망설이지 않고 내리는 강철 같은 의지의 소유자입니다.',
    strengths: ['빠르고 정확한 결단력', '정의롭고 공정한 판단', '원칙에 충실한 일관성', '단호하고 흔들리지 않는 태도', '문제의 핵심을 꿰뚫는 통찰력', '책임감 있는 실행력', '논리적이고 체계적인 사고'],
    weaknesses: ['융통성이 부족해 갈등 유발', '독선적으로 보일 수 있음', '타협이 어렵고 고집스러움', '감정적 교류에 서툴러 냉정하게 보임', '완벽주의로 자신과 타인을 힘들게 함'],
    idealJobs: ['판사/검사/변호사', '군 고위장교/지휘관', '경찰 간부/수사관', '외과의사/정형외과', 'CEO/기업 경영자', '토목/건축 엔지니어', '회계사/감사', '품질관리 책임자', '보안 전문가', '데이터 분석가', '금융 투자 전문가', '구조조정 전문가'],
    avoidJobs: ['고객 감정 응대', '타협 필수 협상직', '모호한 기준의 업무', '예술적 창작', '유연성 요구 스타트업'],
    workStyle: '명확한 원칙하에 단호하게 결정하고 실행합니다. 공정하고 정확한 판단이 필요한 곳에서 능력을 발휘하며, 복잡한 문제도 칼로 자르듯 해결합니다. 기준이 명확하고 예측 가능한 리더입니다.',
    leaderType: '결단형 리더 - 빠르고 단호한 결정으로 팀을 이끄는 타입. 위기 상황에서 결정적인 한 수를 던지며, 팀원들은 당신의 판단을 신뢰합니다.',
    teamRole: '의사결정자, 문제해결사, 최종 판단자',
    salaryPotential: '능력에 따라 고연봉 포지션을 차지합니다. 전문직, 임원급에서 높은 연봉을 받으며, 30대 후반부터 급상승합니다. 실력주의 환경에서 빠르게 성장합니다.',
    careerPath: '20대: 전문 지식/기술 습득 → 30대 초반: 핵심 실무자로 성장 → 30대 후반: 부서장/팀장 → 40대: 임원/고위직 → 50대: CEO/최고 전문가',
    networkingStyle: '동문회, 전문가 협회, 업계 리더 모임 등 공식적이고 격식 있는 네트워킹을 선호합니다. 실력으로 인정받아 자연스럽게 인맥이 형성됩니다.',
    stressManagement: '운동, 특히 격렬한 스포츠(복싱, 크로스핏, 마라톤)로 스트레스를 해소하세요. 명확한 승부가 있는 활동이 맞습니다.',
    idealWorkEnvironment: '실력주의, 명확한 기준과 평가, 공정한 보상, 전문성 존중, 위계가 분명한 조직',
    skillsToLearn: ['감정 지능(EQ)', '유연한 사고', '공감 능력', '협상과 타협', '부드러운 소통'],
    careerMilestones: '27세: 전문가 자격 취득 → 32세: 핵심 인력 → 37세: 부서장 → 42세: 임원 → 50세: CEO/최고 권위자',
    sideJobIdeas: ['법률/세무 자문', '기술 컨설팅', '보안 컨설팅', '감정/평가사', '투자 자문'],
    investmentStyle: '논리적이고 분석적인 투자. 데이터와 수치를 바탕으로 냉정하게 투자 결정을 내립니다. 가치투자, 우량주 중심의 포트폴리오가 맞습니다.',
    retirementAdvice: '은퇴 후에도 전문성을 활용한 자문, 심사, 감사 역할로 활동하세요. 완전한 은퇴보다는 영향력을 유지하며 후배를 양성하는 것이 좋습니다.',
  },
  '신': {
    element: '금(金)',
    personality: '예민함과 정교함의 조화. 다듬어진 보석처럼 섬세하고 아름다운 당신은 완벽을 추구하는 장인입니다. 남들이 보지 못하는 작은 디테일까지 놓치지 않고, 어떤 분야에서든 최고 수준의 퀄리티를 만들어냅니다. 날카로운 미적 감각과 비판적 시각이 당신의 무기입니다.',
    strengths: ['정교하고 정밀한 작업 능력', '완벽을 추구하는 장인 정신', '뛰어난 미적 감각과 안목', '섬세하고 디테일한 관찰력', '높은 품질 기준', '집중력과 끈기', '논리적이고 분석적인 사고'],
    weaknesses: ['지나치게 비판적이고 날카로움', '까다롭고 예민해서 주변을 피곤하게 함', '스트레스에 취약', '완벽주의로 마감 지연', '감정 표현이 서투름'],
    idealJobs: ['보석감정사/세공사', '금융분석가/퀀트', '시니어 프로그래머/아키텍트', '편집자/교정자', '품질관리(QA) 전문가', '미술품 감정사/큐레이터', '외과의사/치과의사', '시계공/정밀기술자', '고급 바리스타/소믈리에', '음향/영상 엔지니어', '패션 디자이너', '데이터 사이언티스트'],
    avoidJobs: ['대충 빠르게 처리해야 하는 업무', '시끄럽고 혼란스러운 환경', '대량 생산 공장', '감정 소모 큰 서비스직', '기준 없는 업무'],
    workStyle: '정교하고 섬세한 작업에서 진가를 발휘합니다. 완벽에 가까운 결과물을 만들어내는 장인 정신으로, 시간이 걸려도 최고의 퀄리티를 추구합니다. 혼자 집중할 수 있는 환경에서 최고의 성과를 냅니다.',
    leaderType: '장인형 리더 - 높은 기준으로 팀의 품질을 이끄는 타입. 말보다 결과물로 보여주며, 팀원들이 그 기준에 맞추려 노력하게 만듭니다.',
    teamRole: '품질 전문가, 세부 관리자, 최종 검수자',
    salaryPotential: '전문성에 따라 고연봉 가능. 희소한 기술을 가지면 업계 최고 대우를 받습니다. 장인급 실력을 인정받으면 연봉 협상에서 유리합니다.',
    careerPath: '20대: 기술/기능 숙련 → 30대 초반: 전문가 인정 → 30대 후반: 업계 명장/마스터 → 40대: 최고 전문가/자문역 → 50대: 거장/레전드',
    networkingStyle: '같은 분야 전문가들과의 깊은 교류를 선호합니다. 스터디 그룹, 전문 커뮤니티, 해외 컨퍼런스 등에서 실력으로 인정받아 인맥을 형성하세요.',
    stressManagement: '명상, 클래식 음악 감상, 고급 취미(와인, 커피, 미술관) 등 섬세한 감각을 자극하는 활동으로 스트레스를 해소하세요.',
    idealWorkEnvironment: '조용하고 깔끔한 환경, 품질 중시 문화, 전문성 존중, 충분한 작업 시간 보장, 자율성',
    skillsToLearn: ['융통성과 유연함', '팀 협업 기술', '비판 조절', '완급 조절', '감정 표현'],
    careerMilestones: '25세: 기술 기반 완성 → 30세: 전문가 인정 → 35세: 마스터급 → 40세: 업계 최고 → 50세: 레전드/거장',
    sideJobIdeas: ['프리랜서 전문 작업', '온라인 마스터클래스', '감정/평가 자문', '기술 블로그/유튜브', '핸드메이드 판매'],
    investmentStyle: '신중하고 분석적인 투자. 철저한 리서치 후에만 투자하며, 잘 모르는 분야에는 손대지 않습니다. 우량주, 채권 중심의 안정 투자가 맞습니다.',
    retirementAdvice: '은퇴 후에도 취미 수준의 장인 활동을 계속하세요. 후배 양성, 마스터클래스, 작품 활동 등으로 기술을 전수하며 보람을 느낄 수 있습니다.',
  },
  '임': {
    element: '수(水)',
    personality: '지혜와 포용의 바다. 광활한 바다처럼 모든 것을 품고 흘러가는 당신은 깊은 지혜와 포용력을 가지고 있습니다. 어떤 상황에서도 유연하게 적응하며, 큰 그림을 보는 통찰력으로 방향을 제시합니다. 물처럼 막힘없이 흘러가며 결국 바다에 도달하는 힘을 가진 존재입니다.',
    strengths: ['깊고 넓은 지혜', '모든 것을 품는 포용력', '어떤 환경에도 적응하는 유연함', '큰 그림을 보는 전략적 사고', '다양한 문화와 사람에 대한 이해', '변화를 두려워하지 않는 담대함', '흐름을 읽는 통찰력'],
    weaknesses: ['결정을 미루는 우유부단함', '감정 기복이 있어 예측 어려움', '현실보다 이상에 빠지는 몽상적 성향', '한 곳에 정착하기 어려움', '깊이보다 넓이를 추구해 전문성 부족'],
    idealJobs: ['철학자/인문학 교수', '작가/시인/에세이스트', '심리상담사/정신과의사', '싱크탱크 연구원', '외교관/국제기구', '여행작가/가이드', '무역/수출입', '통역사/번역가', '벤처캐피탈리스트', '글로벌 컨설턴트', '해양/항공 관련업', '유목민적 디지털노마드'],
    avoidJobs: ['정해진 틀의 반복 업무', '기계적이고 단조로운 일', '경직된 위계 조직', '좁은 공간에 갇힌 업무', '변화 없는 환경'],
    workStyle: '넓은 시야로 큰 그림을 보고 유연하게 대응합니다. 다양한 상황에 물처럼 적응하며 흘러가고, 정해진 틀보다는 자유로운 환경에서 창의성을 발휘합니다. 글로벌한 시각과 다양한 경험이 당신의 무기입니다.',
    leaderType: '지혜형 리더 - 통찰력으로 방향을 제시하는 타입. 당장의 문제보다 먼 미래를 보며, 팀에게 비전을 심어주고 영감을 줍니다.',
    teamRole: '전략가, 비전 제시자, 큰 그림 설계자',
    salaryPotential: '다양한 경험이 쌓이면 희소 가치가 생깁니다. 글로벌 역량, 다문화 이해, 전략적 사고로 고연봉 컨설턴트나 임원급으로 성장 가능합니다.',
    careerPath: '20대: 다양한 경험과 탐색(유학/여행) → 30대 초반: 전문 분야 확립 → 30대 후반: 글로벌 전문가 → 40대: 전략가/자문역 → 50대: 지혜로운 멘토/사상가',
    networkingStyle: '국경을 초월한 글로벌 네트워킹에 강합니다. 해외 컨퍼런스, 국제 커뮤니티, 온라인 플랫폼을 통해 다양한 배경의 사람들과 교류하세요.',
    stressManagement: '여행, 수영/서핑 등 물과 관련된 활동, 명상, 철학 서적 읽기 등으로 스트레스를 해소하세요. 새로운 환경으로의 탈출도 효과적입니다.',
    idealWorkEnvironment: '자유롭고 유연한 근무, 글로벌 환경, 창의성 존중, 원격근무 가능, 다양성이 있는 조직',
    skillsToLearn: ['결단력과 실행력', '한 분야 깊이 파기', '현실 감각', '마감 준수', '장기 집중력'],
    careerMilestones: '25세: 해외 경험/다양한 탐색 → 30세: 전문 분야 결정 → 35세: 글로벌 전문가 → 40세: 전략 자문역 → 50세: 지혜로운 현자',
    sideJobIdeas: ['여행 콘텐츠 제작', '번역/통역', '온라인 강의', '컨설팅', '글로벌 프리랜싱'],
    investmentStyle: '글로벌하고 다양한 투자. 해외 주식, 다양한 자산군에 분산 투자하는 것이 맞습니다. 한 곳에 집중하기보다 포트폴리오를 넓게 가져가세요.',
    retirementAdvice: '은퇴 후에도 여행하고 배우는 것을 멈추지 마세요. 디지털노마드처럼 세계를 돌아다니거나, 후배들에게 지혜를 나누는 강연/저술 활동이 어울립니다.',
  },
  '계': {
    element: '수(水)',
    personality: '직관과 감성의 소유자. 이슬이나 빗방울처럼 섬세하고 감성적인 당신은 보이지 않는 것을 느끼고 표현하는 특별한 능력을 가지고 있습니다. 영적인 통찰력과 예술적 감성으로 사람들의 마음을 움직이고, 세상에 없던 것을 창조해냅니다. 신비로운 매력의 소유자입니다.',
    strengths: ['뛰어난 직관력과 육감', '깊은 감성과 공감 능력', '독창적인 창의력', '영적/심리적 통찰력', '예술적 표현 능력', '사람의 마음을 읽는 능력', '신비로운 분위기와 매력'],
    weaknesses: ['현실 감각이 부족해 돈 관리 어려움', '기분에 따라 변덕스러움', '우울하거나 감정 기복이 심함', '너무 예민해서 상처받기 쉬움', '세상과 동떨어진 느낌'],
    idealJobs: ['타로/점술/운세 상담사', '화가/조각가/설치예술가', '싱어송라이터/음악가', '시인/소설가/극작가', '종교인/명상 지도자', '심리치료사/최면치료사', '영화감독/독립영화', '작곡가/사운드아티스트', '무용가/안무가', '향수 조향사', 'ASMR 크리에이터', '영매/채널러'],
    avoidJobs: ['숫자 중심의 회계/재무', '냉정한 논리 분석', '경쟁적 영업/세일즈', '기계적 반복 업무', '감정 억제 필요한 업무'],
    workStyle: '감성과 직관을 활용하는 창작 활동에서 능력을 발휘합니다. 보이지 않는 것을 느끼고 표현하며, 기존에 없던 것을 만들어냅니다. 영감이 올 때 집중적으로 작업하는 스타일로, 규칙적인 근무보다는 자유로운 환경이 맞습니다.',
    leaderType: '영감형 리더 - 직관으로 새로운 방향을 제시하는 타입. 논리보다 느낌으로 이끌며, 팀에게 영감과 창의성을 불어넣습니다.',
    teamRole: '아이디어 뱅크, 창작자, 영감의 원천',
    salaryPotential: '수입이 불규칙할 수 있지만, 예술적 성공이나 영적 분야에서 명성을 얻으면 높은 수입이 가능합니다. 일반적인 연봉보다는 프로젝트별/작품별 수입 구조가 맞습니다.',
    careerPath: '20대: 예술적/영적 탐구와 수련 → 30대 초반: 자신만의 스타일 확립 → 30대 후반: 작품/서비스로 인정받기 시작 → 40대: 해당 분야 명성 획득 → 50대: 거장/명인으로 추앙',
    networkingStyle: '영적/예술적 커뮤니티에서 자연스럽게 인맥이 형성됩니다. 전시회, 공연, 명상 모임, 온라인 창작 커뮤니티 등에서 같은 감성의 사람들을 만나세요.',
    stressManagement: '명상, 요가, 음악 감상, 자연 속 산책, 예술 활동 등으로 스트레스를 해소하세요. 물가(바다, 호수, 강)에서의 휴식이 특히 효과적입니다.',
    idealWorkEnvironment: '창의성 존중, 자유로운 근무 시간, 영감을 주는 공간, 감성적인 동료들, 예술적 가치 인정',
    skillsToLearn: ['현실적인 돈 관리', '일관성과 꾸준함', '감정 조절', '마케팅/자기 PR', '비즈니스 기초'],
    careerMilestones: '25세: 재능 발견/수련 → 30세: 첫 작품/서비스 런칭 → 35세: 팬층 확보 → 40세: 분야 내 명성 → 50세: 레전드/거장',
    sideJobIdeas: ['타로/운세 상담', '예술 작품 판매', '음악/글 창작', '명상/힐링 서비스', '온라인 창작 콘텐츠'],
    investmentStyle: '직관적 투자 성향이지만 위험합니다. 투자는 전문가에게 맡기거나 안전 자산 위주로 하세요. 예술품이나 자신의 창작 활동에 투자하는 것이 더 맞습니다.',
    retirementAdvice: '은퇴 후에도 창작 활동과 영적 탐구를 계속하세요. 작품 활동, 명상 지도, 후배 양성 등으로 영혼을 풍요롭게 하는 노년을 보낼 수 있습니다.',
  },
};

// 십성별 직업운
const TEN_GOD_CAREER: Record<string, {
  type: string;
  career: string;
  promotion: string;
  change: string;
  startup: string;
}> = {
  '비견': {
    type: '협력과 경쟁',
    career: '동료와 협력하는 분야에서 능력 발휘. 동업이나 파트너십이 유리합니다.',
    promotion: '경쟁을 통해 성장하지만, 협력 관계 구축이 승진의 열쇠입니다.',
    change: '비슷한 업종으로 이직 시 적응 빠름. 완전 새 분야는 신중하게.',
    startup: '동업 형태가 좋으나 주도권 다툼 주의. 명확한 역할 분담 필요.',
  },
  '겁재': {
    type: '도전과 손실',
    career: '경쟁이 치열한 환경에서도 버티는 강인함. 단, 과욕은 금물.',
    promotion: '승진 과정에 경쟁자 多. 실력으로 입증해야 합니다.',
    change: '이직 시 조건을 꼼꼼히 확인. 급하게 결정하면 손해.',
    startup: '창업 시기를 신중하게. 무리한 투자나 확장은 위험합니다.',
  },
  '식신': {
    type: '창조와 풍요',
    career: '창의력과 표현력이 필요한 분야에서 성공. 먹거리/콘텐츠 관련 유리.',
    promotion: '실력을 인정받아 자연스럽게 상승. 급하게 서두르지 않아도 됨.',
    change: '좋은 기회가 찾아옴. 창작/기획 분야로의 이직 길조.',
    startup: '아이디어로 승부하는 사업 적합. 요식업, 콘텐츠 사업 유망.',
  },
  '상관': {
    type: '표현과 반항',
    career: '자유로운 환경, 창의적 업무에서 두각. 조직 생활 마찰 주의.',
    promotion: '기존 방식에 도전해 인정받기도 하지만, 윗사람과 충돌 주의.',
    change: '프리랜서, 1인 기업으로의 전환 고려. 조직 탈출 욕구 강함.',
    startup: '독창적 아이디어로 승부 가능. 단, 인간관계 관리 중요.',
  },
  '편재': {
    type: '횡재와 투자',
    career: '영업, 투자, 사업 분야에서 재능 발휘. 돈 냄새를 잘 맡습니다.',
    promotion: '성과로 승진. 영업 실적이나 투자 성공이 기회가 됩니다.',
    change: '더 나은 연봉, 조건으로 이직 가능. 적극적으로 기회 탐색.',
    startup: '사업 수완 있음. 투자나 부동산 관련 사업 유리.',
  },
  '정재': {
    type: '안정과 성실',
    career: '꾸준히 쌓아가는 타입. 안정적인 대기업, 공기업에 적합.',
    promotion: '성실함이 인정받아 착실히 승진. 급격한 상승보다 꾸준한 성장.',
    change: '안정성을 우선하면 좋은 이직. 연봉보다 복지를 보세요.',
    startup: '리스크 낮은 사업, 프랜차이즈 등이 적합. 무리한 투자 금지.',
  },
  '편관': {
    type: '시련과 권력',
    career: '권위 있는 조직, 공직에서 능력 발휘. 시련을 극복하며 성장.',
    promotion: '고난 뒤에 승진. 인내심이 필요하지만 결국 인정받습니다.',
    change: '이직 과정이 순탄치 않을 수 있음. 충분히 준비 후 실행.',
    startup: '창업보다는 조직 내 성공이 유리. 권력/권위 관련 사업은 고려.',
  },
  '정관': {
    type: '명예와 질서',
    career: '공직, 법조계, 대기업에서 빛나는 타입. 명예와 지위를 얻습니다.',
    promotion: '규칙을 따르고 실력을 쌓으면 승진 보장. 윗사람 인정 중요.',
    change: '공식적인 경로(헤드헌팅 등)로 이직 시 좋은 결과.',
    startup: '자격증/면허 필요 사업, 프랜차이즈 본사 등이 적합.',
  },
  '편인': {
    type: '학문과 사색',
    career: '연구, 학문, 기술 분야에서 전문가로 성장. 깊이를 추구.',
    promotion: '전문성이 승진의 열쇠. 자격증, 석박사가 도움됩니다.',
    change: '더 전문적인 분야로 이직 유리. 학습 기회 있는 곳 선택.',
    startup: '기술 기반 스타트업, 컨설팅, 교육 사업이 적합.',
  },
  '정인': {
    type: '귀인과 도움',
    career: '윗사람의 도움으로 성장. 교육, 학문 분야에서 성공.',
    promotion: '멘토나 선배의 추천으로 승진. 좋은 관계가 자산입니다.',
    change: '지인 소개로 이직 시 좋은 결과. 네트워킹이 중요.',
    startup: '부모/친척 도움으로 시작하거나, 프랜차이즈가 유리.',
  },
};

// 현재 시기 직업운
const YEAR_FORTUNE: Record<string, {
  overall: string;
  promotion: string;
  change: string;
  startup: string;
  advice: string;
}> = {
  '비견': {
    overall: '협력과 경쟁이 공존하는 해입니다. 동료와의 관계가 중요합니다.',
    promotion: '경쟁자가 많지만 협력하면 함께 성장할 수 있습니다.',
    change: '급하게 옮기지 말고 충분히 알아보세요. 동종 업계가 유리.',
    startup: '동업은 신중하게. 파트너 선택이 성패를 좌우합니다.',
    advice: '경쟁보다 협력을 선택하면 더 큰 성과를 얻습니다.',
  },
  '겁재': {
    overall: '변동이 많고 예상치 못한 상황이 생길 수 있습니다. 신중함 필요.',
    promotion: '무리하게 승진을 노리면 역효과. 실력 쌓기에 집중.',
    change: '충동적 이직은 금물. 최소 6개월은 고민하세요.',
    startup: '창업 시기가 아닙니다. 준비만 하고 실행은 미루세요.',
    advice: '손실을 줄이는 것이 이익을 늘리는 것보다 중요한 해.',
  },
  '식신': {
    overall: '재능을 발휘하고 인정받는 시기입니다. 창작/기획에 좋은 해.',
    promotion: '자연스럽게 기회가 옵니다. 욕심내지 않아도 됩니다.',
    change: '좋은 조건의 이직 기회가 있습니다. 적극 탐색하세요.',
    startup: '아이디어로 승부하는 사업 시작에 좋은 타이밍.',
    advice: '즐기면서 하는 일이 성공합니다. 스트레스 받지 마세요.',
  },
  '상관': {
    overall: '자기표현이 강해지는 시기. 조직 내 마찰에 주의하세요.',
    promotion: '아이디어는 좋지만 표현 방식에 신경 쓰세요. 윗사람 기분 관리.',
    change: '프리랜서나 독립을 진지하게 고려해볼 시기입니다.',
    startup: '창의적 사업 가능하지만, 파트너십 관리에 주의.',
    advice: '말 한마디가 천 냥 빚을 갚기도 하고 만들기도 합니다.',
  },
  '편재': {
    overall: '재물운이 좋고 투자 기회가 많은 해입니다. 눈을 크게 뜨세요.',
    promotion: '성과를 올리면 보상이 따릅니다. 적극적으로 성과 어필.',
    change: '연봉 협상에 유리한 시기. 더 좋은 조건 요구 가능.',
    startup: '사업 시작에 좋은 해. 투자나 영업 관련 사업 유망.',
    advice: '기회를 잡되, 과욕은 금물. 적정선에서 만족하세요.',
  },
  '정재': {
    overall: '안정적인 수입과 성장이 기대되는 해입니다.',
    promotion: '성실함이 인정받아 승진 기회가 옵니다.',
    change: '안정적인 회사로의 이직 유리. 스타트업보다 대기업.',
    startup: '리스크 낮은 사업 추천. 검증된 모델로 시작하세요.',
    advice: '급하지 않게 착실히 쌓아가면 좋은 결과가 있습니다.',
  },
  '편관': {
    overall: '시련과 도전이 있지만 성장의 기회이기도 합니다.',
    promotion: '고난 뒤에 승진. 힘들지만 버티면 보상이 옵니다.',
    change: '쉽게 결정하지 마세요. 신중하게 여러 옵션 비교.',
    startup: '창업보다 조직 내 안정을 추천. 리스크 회피.',
    advice: '어려움 속에서 내공이 쌓입니다. 포기하지 마세요.',
  },
  '정관': {
    overall: '공식적인 인정과 명예가 따르는 해입니다.',
    promotion: '승진/자격 취득에 좋은 해. 노력한 만큼 보상받습니다.',
    change: '공식적인 경로(헤드헌터, 추천 등)로 이직 추천.',
    startup: '자격/면허 관련 사업, 컨설팅 시작에 좋은 시기.',
    advice: '원칙을 지키면 신뢰를 얻고 기회가 옵니다.',
  },
  '편인': {
    overall: '공부와 자기계발의 해입니다. 실력을 쌓으세요.',
    promotion: '자격증, 학위가 승진에 도움됩니다. 투자하세요.',
    change: '더 배울 수 있는 곳으로 이직 고려. 성장 가능성 중시.',
    startup: '교육, 컨설팅, 기술 사업 시작에 좋은 시기.',
    advice: '당장의 이익보다 미래를 위한 공부에 투자하세요.',
  },
  '정인': {
    overall: '귀인의 도움을 받는 해입니다. 좋은 인연을 만나세요.',
    promotion: '멘토/선배의 추천으로 좋은 기회가 옵니다.',
    change: '지인 소개 이직이 좋은 결과. 인맥 활용하세요.',
    startup: '경험자의 조언을 받아 시작하면 성공 확률 UP.',
    advice: '혼자 힘으로 하려 하지 말고 도움을 구하세요.',
  },
};

// 천간 목록
const STEMS = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
const TEN_GODS = ['비견', '겁재', '식신', '상관', '편재', '정재', '편관', '정관', '편인', '정인'];

const calculateTenGod = (dayStem: string, targetStem: string): string => {
  const dayIndex = STEMS.indexOf(dayStem);
  const targetIndex = STEMS.indexOf(targetStem);
  if (dayIndex === -1 || targetIndex === -1) return '비견';
  const diff = (targetIndex - dayIndex + 10) % 10;
  return TEN_GODS[diff];
};

export default function CareerResult({ formData, onReset, onBack }: CareerResultProps) {
  // 사주 계산
  const result = calculateSaju({
    year: formData.year,
    month: formData.month,
    day: formData.day,
    hour: formData.timeUnknown ? 12 : formData.hour,
  }, formData.gender);

  const currentYear = new Date().getFullYear();
  const dayStem = result.day.stem.ko;
  const careerProfile = DAY_STEM_CAREER[dayStem] || DAY_STEM_CAREER['갑'];

  // 올해 운세 계산 (년주 기준)
  const yearTenGod = result.tenGods.year;
  const yearFortune = YEAR_FORTUNE[yearTenGod] || YEAR_FORTUNE['비견'];
  const tenGodCareer = TEN_GOD_CAREER[yearTenGod] || TEN_GOD_CAREER['비견'];

  // 대운 분석
  const currentAge = currentYear - formData.year + 1;
  const currentDaeun = result.daeun.find(d => d.age <= currentAge && currentAge < d.age + 10);
  const daeunTenGod = currentDaeun ? calculateTenGod(dayStem, currentDaeun.stem.ko) : '비견';
  const daeunCareer = TEN_GOD_CAREER[daeunTenGod] || TEN_GOD_CAREER['비견'];

  // 직업 적합도 점수
  const calculateJobScore = () => {
    let score = 60;
    if (['식신', '편재', '정재', '정인'].includes(yearTenGod)) score += 15;
    if (['식신', '편재', '정인'].includes(daeunTenGod)) score += 10;
    if (['겁재', '편관'].includes(yearTenGod)) score -= 10;
    return Math.min(95, Math.max(35, score + (currentAge % 10)));
  };

  const jobScore = calculateJobScore();

  const getScoreColor = (score: number) => {
    if (score >= 80) return { text: 'text-emerald-400', bg: 'bg-emerald-500/20', border: 'border-emerald-500' };
    if (score >= 60) return { text: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500' };
    if (score >= 40) return { text: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500' };
    return { text: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500' };
  };

  const scoreColor = getScoreColor(jobScore);

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

  // 고민별 콘텐츠
  const getConcernContent = () => {
    switch (formData.concern) {
      case 'job_fit':
        return {
          title: '나에게 맞는 직업은?',
          icon: <Target className="w-6 h-6" />,
          content: (
            <div className="space-y-4">
              <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/30">
                <h4 className="font-medium text-purple-300 mb-2">타고난 직업 적성</h4>
                <p className="text-white">{careerProfile.personality}</p>
                <p className="text-slate-400 mt-2">원소: {careerProfile.element}</p>
              </div>
              <div>
                <h4 className="font-medium text-emerald-400 mb-2 flex items-center gap-2">
                  <Star className="w-4 h-4" /> 추천 직업군
                </h4>
                <div className="flex flex-wrap gap-2">
                  {careerProfile.idealJobs.map((job, i) => (
                    <span key={i} className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm">{job}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-red-400 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> 피해야 할 직업
                </h4>
                <div className="flex flex-wrap gap-2">
                  {careerProfile.avoidJobs.map((job, i) => (
                    <span key={i} className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm">{job}</span>
                  ))}
                </div>
              </div>
            </div>
          ),
        };
      case 'promotion':
        return {
          title: '승진/성공 시기',
          icon: <TrendingUp className="w-6 h-6" />,
          content: (
            <div className="space-y-4">
              <div className={`p-4 rounded-xl border ${scoreColor.border} ${scoreColor.bg}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-400">올해 승진운</span>
                  <span className={`text-2xl font-bold ${scoreColor.text}`}>{jobScore}점</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div className={`h-3 rounded-full ${scoreColor.text.replace('text-', 'bg-')}`} style={{ width: `${jobScore}%` }} />
                </div>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-xl">
                <h4 className="font-medium text-blue-400 mb-2">올해의 승진운</h4>
                <p className="text-slate-300">{yearFortune.promotion}</p>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-xl">
                <h4 className="font-medium text-purple-400 mb-2">현재 대운의 흐름</h4>
                <p className="text-slate-300">{daeunCareer.promotion}</p>
              </div>
            </div>
          ),
        };
      case 'change':
        return {
          title: '이직 타이밍',
          icon: <Compass className="w-6 h-6" />,
          content: (
            <div className="space-y-4">
              <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/30">
                <h4 className="font-medium text-indigo-300 mb-2">현재 이직 적합도</h4>
                <p className="text-slate-300">{yearFortune.change}</p>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-xl">
                <h4 className="font-medium text-cyan-400 mb-2">대운으로 본 이직운</h4>
                <p className="text-slate-300">{daeunCareer.change}</p>
              </div>
              <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/30">
                <h4 className="font-medium text-yellow-400 mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" /> 이직 조언
                </h4>
                <p className="text-slate-300">{tenGodCareer.change}</p>
              </div>
            </div>
          ),
        };
      case 'startup':
        return {
          title: '창업 적성과 시기',
          icon: <Zap className="w-6 h-6" />,
          content: (
            <div className="space-y-4">
              <div className="p-4 bg-orange-500/10 rounded-xl border border-orange-500/30">
                <h4 className="font-medium text-orange-300 mb-2">창업 적성</h4>
                <p className="text-slate-300">{tenGodCareer.startup}</p>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-xl">
                <h4 className="font-medium text-emerald-400 mb-2">올해 창업 타이밍</h4>
                <p className="text-slate-300">{yearFortune.startup}</p>
              </div>
              <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/30">
                <h4 className="font-medium text-purple-400 mb-2">대운으로 본 사업운</h4>
                <p className="text-slate-300">{daeunCareer.startup}</p>
              </div>
            </div>
          ),
        };
      case 'sidejob':
        return {
          title: '부업/투잡 운세',
          icon: <DollarSign className="w-6 h-6" />,
          content: (
            <div className="space-y-4">
              <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/30">
                <h4 className="font-medium text-cyan-300 mb-2">부업 적성</h4>
                <p className="text-slate-300">
                  {careerProfile.element.includes('목') && '콘텐츠 제작, 교육, 컨설팅 부업이 적합합니다.'}
                  {careerProfile.element.includes('화') && '온라인 강의, 인플루언서, 공연 관련 부업이 유리합니다.'}
                  {careerProfile.element.includes('토') && '부동산, 중개, 재테크 관련 부업을 추천합니다.'}
                  {careerProfile.element.includes('금') && '기술 프리랜싱, 컨설팅, 품질 관리 부업이 맞습니다.'}
                  {careerProfile.element.includes('수') && '온라인 사업, 해외 거래, 창작 부업이 어울립니다.'}
                </p>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-xl">
                <h4 className="font-medium text-yellow-400 mb-2">추천 N잡</h4>
                <div className="flex flex-wrap gap-2">
                  {careerProfile.idealJobs.slice(0, 4).map((job, i) => (
                    <span key={i} className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">{job} 프리랜서</span>
                  ))}
                </div>
              </div>
            </div>
          ),
        };
    }
  };

  const concernContent = getConcernContent();

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
          <button onClick={onReset} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <RefreshCw className="w-5 h-5" />
            <span>다시하기</span>
          </button>
        </motion.div>

        {/* 타이틀 */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center shadow-lg mb-4">
            <Briefcase className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            {formData.name}님의 직업운
          </h1>
          <p className="text-purple-400">일간: {dayStem} ({careerProfile.element})</p>
        </motion.div>

        {/* 메인 고민 콘텐츠 */}
        <motion.div variants={itemVariants} className="glass rounded-3xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4 text-purple-400">
            {concernContent?.icon}
            <h2 className="text-xl font-bold text-white">{concernContent?.title}</h2>
          </div>
          {concernContent?.content}
        </motion.div>

        {/* 강점과 약점 */}
        <motion.div variants={itemVariants} className="glass rounded-3xl p-6 mb-6">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-400" />
            업무 강점과 약점
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm text-emerald-400 mb-2">강점</h4>
              <div className="space-y-1">
                {careerProfile.strengths.map((s, i) => (
                  <div key={i} className="text-sm text-slate-300">• {s}</div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm text-red-400 mb-2">약점</h4>
              <div className="space-y-1">
                {careerProfile.weaknesses.map((w, i) => (
                  <div key={i} className="text-sm text-slate-300">• {w}</div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 업무 스타일 */}
        <motion.div variants={itemVariants} className="glass rounded-3xl p-6 mb-6">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" />
            팀에서의 역할
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-slate-800/50 rounded-xl">
              <div className="text-sm text-slate-400">업무 스타일</div>
              <div className="text-white">{careerProfile.workStyle}</div>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-xl">
              <div className="text-sm text-slate-400">리더십 유형</div>
              <div className="text-white">{careerProfile.leaderType}</div>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-xl">
              <div className="text-sm text-slate-400">팀 내 역할</div>
              <div className="text-white">{careerProfile.teamRole}</div>
            </div>
          </div>
        </motion.div>

        {/* 올해의 조언 */}
        <motion.div variants={itemVariants} className="glass rounded-3xl p-6 mb-6">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            {currentYear}년 직업운 총평
          </h3>
          <div className="p-4 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-xl border border-purple-500/20">
            <p className="text-slate-300 mb-3">{yearFortune.overall}</p>
            <div className="flex items-start gap-2 p-3 bg-yellow-500/10 rounded-lg">
              <Heart className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <p className="text-yellow-300 text-sm"><strong>핵심 조언:</strong> {yearFortune.advice}</p>
            </div>
          </div>
        </motion.div>

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
            className="flex-1 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl text-white font-medium hover:from-indigo-600 hover:to-purple-600 transition-all"
          >
            다른 고민 분석
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
