'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Calendar, Target, CheckCircle2, AlertCircle, TrendingUp, Wallet, PiggyBank, Briefcase } from 'lucide-react';

interface Wealth2026ActionPlanProps {
  result: SajuResult;
  name: string;
  baseScore: number;
}

type ImportanceLevel = 'high' | 'medium' | 'low';

interface ActionItem {
  task: string;
  detail: string;
  deadline: string;
  importance: ImportanceLevel;
}

export default function Wealth2026ActionPlan({ result, name, baseScore }: Wealth2026ActionPlanProps) {
  const dayElement = result.day.stem.element;
  const { 재성, 식상, 관성, 비겁, 인성 } = result.tenGodsCount;

  // 월별 상세 실행 계획 생성
  const getMonthlyActionPlan = () => {
    const plans = [
      {
        month: 1,
        title: '1월: 재정 점검의 달',
        theme: '새해 재정 계획 수립',
        priority: baseScore >= 70 ? '공격적 투자 검토' : '안정적 저축 우선',
        actions: [
          {
            task: '지난해 수입/지출 분석',
            detail: '지난 1년간의 금융 거래 내역을 정리하고, 카테고리별 지출 비율을 파악하세요. 특히 고정비와 변동비를 구분하여 절약 가능한 부분을 찾으세요.',
            deadline: '1월 첫째 주',
            importance: 'high'
          },
          {
            task: '연간 재정 목표 설정',
            detail: `${name}님의 2026년 목표 저축액과 투자 수익률을 구체적인 숫자로 정하세요. SMART 원칙(구체적, 측정가능, 달성가능, 관련성, 기한)에 맞춰 설정하세요.`,
            deadline: '1월 둘째 주',
            importance: 'high'
          },
          {
            task: '자동이체 및 적금 재설정',
            detail: '월급일에 맞춰 자동이체를 설정하고, 저축액을 최소 10% 이상으로 늘려보세요. 비상금 계좌와 투자 계좌를 분리하세요.',
            deadline: '1월 셋째 주',
            importance: 'medium'
          },
          {
            task: '보험 및 구독 서비스 점검',
            detail: '불필요한 보험이나 구독 서비스를 정리하세요. 중복된 보장이나 사용하지 않는 서비스가 있다면 해지하여 고정비를 줄이세요.',
            deadline: '1월 넷째 주',
            importance: 'medium'
          }
        ],
        tip: dayElement === '화' ? '새해 열정이 넘치는 시기, 너무 과한 목표보다 현실적인 계획을 세우세요.' :
             dayElement === '토' ? '안정을 추구하는 당신에게 1월은 기반을 다지기 좋은 시기입니다.' :
             '연초의 결심을 문서화하고 매월 점검하세요.'
      },
      {
        month: 2,
        title: '2월: 투자 준비의 달',
        theme: '투자 공부 및 시장 분석',
        priority: 재성 >= 2 ? '적극적 투자 포트폴리오 구성' : '소액 분산 투자 시작',
        actions: [
          {
            task: '투자 성향 테스트',
            detail: '각 금융사에서 제공하는 투자 성향 테스트를 받아보세요. 본인의 위험 감수 성향을 객관적으로 파악하는 것이 중요합니다.',
            deadline: '2월 첫째 주',
            importance: 'high'
          },
          {
            task: '투자 관련 책 1권 읽기',
            detail: '투자 입문서나 재테크 책을 한 권 읽으세요. 추천: "부의 추월차선", "돈의 심리학", "주식투자 무작정 따라하기" 등',
            deadline: '2월 둘째 주',
            importance: 'medium'
          },
          {
            task: '증권 계좌 개설/정비',
            detail: '아직 계좌가 없다면 비대면으로 증권 계좌를 개설하세요. 이미 있다면 수수료 체계를 확인하고 필요시 이벤트 혜택이 좋은 곳으로 이전하세요.',
            deadline: '2월 셋째 주',
            importance: 'medium'
          },
          {
            task: '관심 종목/펀드 5개 선정',
            detail: '투자할 관심 종목이나 ETF를 5개 정도 선정하고, 각각의 과거 실적과 전망을 분석해보세요.',
            deadline: '2월 넷째 주',
            importance: 'medium'
          }
        ],
        tip: 비겁 >= 2 ? '주변 사람들의 투자 조언에 귀 기울이되, 최종 판단은 본인이 하세요.' :
             식상 >= 2 ? '창의적인 투자 아이디어가 떠오를 수 있어요. 기록해두세요.' :
             '서두르지 말고 충분히 공부한 후 투자하세요.'
      },
      {
        month: 3,
        title: '3월: 수입 확대의 달',
        theme: '추가 수입원 발굴',
        priority: 관성 >= 2 ? '직장 내 성과 극대화' : '부업/사이드 프로젝트 시작',
        actions: [
          {
            task: '본업 역량 강화 계획',
            detail: `${name}님의 직장에서 인정받을 수 있는 스킬을 파악하고 개발하세요. 승진이나 연봉 협상에 도움이 될 자격증이나 교육을 알아보세요.`,
            deadline: '3월 첫째 주',
            importance: 'high'
          },
          {
            task: '부업 가능성 탐색',
            detail: '본인의 재능이나 취미를 활용한 부업을 찾아보세요. 프리랜서 플랫폼(크몽, 숨고, 탈잉 등)에서 할 수 있는 일을 검색해보세요.',
            deadline: '3월 둘째 주',
            importance: 'high'
          },
          {
            task: '온라인 수익 모델 연구',
            detail: '블로그, 유튜브, 스마트스토어 등 온라인으로 수익을 창출하는 방법을 알아보세요. 시간 대비 수익률을 계산해보세요.',
            deadline: '3월 셋째 주',
            importance: 'medium'
          },
          {
            task: '네트워킹 이벤트 참석',
            detail: '업계 모임이나 세미나에 참석하여 인맥을 넓히세요. 새로운 기회는 사람을 통해 옵니다.',
            deadline: '3월 넷째 주',
            importance: 'medium'
          }
        ],
        tip: 식상 >= 2 ? '창작 활동으로 수익을 낼 수 있는 시기입니다. 콘텐츠 제작을 시작해보세요.' :
             인성 >= 2 ? '지식을 공유하는 활동(강의, 컨설팅)이 수익이 될 수 있습니다.' :
             '다양한 수입원을 만들어 리스크를 분산하세요.'
      },
      {
        month: 4,
        title: '4월: 지출 최적화의 달',
        theme: '불필요한 지출 제거',
        priority: '고정비 10% 절감 도전',
        actions: [
          {
            task: '지출 다이어리 작성',
            detail: '4월 한 달간 모든 지출을 기록하세요. 앱(뱅크샐러드, 토스 등)을 활용하면 편리합니다. 카테고리별로 분류하세요.',
            deadline: '4월 내내',
            importance: 'high'
          },
          {
            task: '통신비 절감',
            detail: '휴대폰 요금제를 점검하세요. 알뜰폰으로 바꾸면 월 3-5만원 절약 가능합니다. 인터넷+TV 결합 상품도 비교해보세요.',
            deadline: '4월 첫째 주',
            importance: 'medium'
          },
          {
            task: '식비 관리 시작',
            detail: '주간 식단을 미리 계획하고 장을 보세요. 배달앱 사용을 줄이고, 도시락을 싸면 월 20-30만원 절약 가능합니다.',
            deadline: '4월 둘째 주',
            importance: 'high'
          },
          {
            task: '에너지 비용 절감',
            detail: '전기, 가스, 수도 사용량을 점검하세요. LED 조명 교체, 대기전력 차단 등 작은 습관이 연간 수십만원을 절약합니다.',
            deadline: '4월 셋째 주',
            importance: 'low'
          },
          {
            task: '쇼핑 습관 개선',
            detail: '충동구매를 줄이세요. 48시간 규칙(구매 전 48시간 고민)을 적용하고, 필요한 것만 리스트에 적어 구매하세요.',
            deadline: '4월 넷째 주',
            importance: 'medium'
          }
        ],
        tip: dayElement === '금' ? '꼼꼼한 성격을 살려 지출 관리에서 큰 성과를 낼 수 있습니다.' :
             dayElement === '수' ? '유연하게 지출 패턴을 바꿔보세요. 새로운 절약법을 시도해보세요.' :
             '작은 절약이 모여 큰 자산이 됩니다.'
      },
      {
        month: 5,
        title: '5월: 재테크 실행의 달',
        theme: '계획한 투자 시작',
        priority: baseScore >= 65 ? '투자 비중 확대' : '소액으로 경험 쌓기',
        actions: [
          {
            task: '첫 투자 실행',
            detail: '2월에 선정한 종목/펀드에 소액으로 첫 투자를 시작하세요. 처음에는 전체 투자금의 10-20%만 투입하세요.',
            deadline: '5월 첫째 주',
            importance: 'high'
          },
          {
            task: '적립식 투자 시작',
            detail: '매월 일정 금액을 자동으로 투자하는 적립식 펀드나 ETF를 설정하세요. 시장 타이밍보다 꾸준함이 중요합니다.',
            deadline: '5월 둘째 주',
            importance: 'high'
          },
          {
            task: '리스크 관리 원칙 수립',
            detail: '손절매 기준(예: -10%)과 익절 기준(예: +20%)을 미리 정하세요. 감정적 판단을 방지합니다.',
            deadline: '5월 셋째 주',
            importance: 'medium'
          },
          {
            task: '투자 일지 작성 시작',
            detail: '왜 이 종목을 샀는지, 현재 상황은 어떤지 기록하세요. 나중에 좋은 공부 자료가 됩니다.',
            deadline: '5월 넷째 주',
            importance: 'medium'
          }
        ],
        tip: 재성 >= 2 ? '재물을 다루는 감각이 있으니 조금 더 적극적으로 투자해도 됩니다.' :
             '처음에는 작게 시작하고, 경험이 쌓이면 점진적으로 늘리세요.'
      },
      {
        month: 6,
        title: '6월: 중간 점검의 달',
        theme: '상반기 재정 리뷰',
        priority: '목표 대비 진행률 체크',
        actions: [
          {
            task: '상반기 재정 결산',
            detail: '1월에 세운 목표 대비 현재 진행률을 계산하세요. 저축 목표, 투자 수익률, 지출 감소 등 각 항목별로 점검하세요.',
            deadline: '6월 첫째 주',
            importance: 'high'
          },
          {
            task: '투자 포트폴리오 리밸런싱',
            detail: '투자 자산의 비중이 처음 계획과 달라졌다면 조정하세요. 특정 종목에 치우치지 않게 분산하세요.',
            deadline: '6월 둘째 주',
            importance: 'medium'
          },
          {
            task: '하반기 계획 수정',
            detail: '상반기 결과를 바탕으로 하반기 계획을 현실적으로 수정하세요. 너무 높거나 낮은 목표는 조정하세요.',
            deadline: '6월 셋째 주',
            importance: 'high'
          },
          {
            task: '세금 중간 점검',
            detail: '연말정산을 대비해 세액공제 항목을 확인하세요. 연금저축, IRP, 기부금 등 남은 기간 활용 계획을 세우세요.',
            deadline: '6월 넷째 주',
            importance: 'medium'
          }
        ],
        tip: '중간 점검은 필수입니다. 방향이 잘못되었다면 지금 바로잡아야 합니다.'
      },
      {
        month: 7,
        title: '7월: 기회 포착의 달',
        theme: '여름 시즌 특수 활용',
        priority: 식상 >= 2 ? '창업/부업 본격화' : '저축 가속화',
        actions: [
          {
            task: '시즌 특수 수익 기회',
            detail: '여름 휴가철 특수를 활용하세요. 에어비앤비 호스팅, 여행 가이드, 계절 아르바이트 등의 기회가 있습니다.',
            deadline: '7월 첫째 주',
            importance: 'medium'
          },
          {
            task: '휴가 예산 관리',
            detail: '휴가 비용을 미리 예산화하세요. 예상 금액의 120%를 준비하고, 알뜰 여행 방법을 찾아보세요.',
            deadline: '7월 둘째 주',
            importance: 'high'
          },
          {
            task: '여름 세일 현명하게 활용',
            detail: '필요한 물건만 리스트업하고, 세일 기간에 구매하세요. 충동구매 주의!',
            deadline: '7월 셋째 주',
            importance: 'low'
          },
          {
            task: '하반기 대비 현금 확보',
            detail: '비상금을 점검하고, 필요시 추가 저축하세요. 하반기 큰 지출에 대비하세요.',
            deadline: '7월 넷째 주',
            importance: 'medium'
          }
        ],
        tip: dayElement === '화' ? '여름은 화 기운이 강한 계절, 당신에게 유리한 시기입니다.' :
             '더위에 지치지 말고 꾸준히 재정 관리를 계속하세요.'
      },
      {
        month: 8,
        title: '8월: 성장 투자의 달',
        theme: '자기계발 및 역량 강화',
        priority: 인성 >= 2 ? '학습 및 자격증 취득' : '실무 스킬 향상',
        actions: [
          {
            task: '온라인 강좌 수강',
            detail: `${name}님의 커리어에 도움이 될 온라인 강좌를 수강하세요. 클래스101, 패스트캠퍼스, 유데미 등에서 찾아보세요.`,
            deadline: '8월 첫째 주',
            importance: 'high'
          },
          {
            task: '자격증 취득 계획',
            detail: '연봉 향상에 도움이 될 자격증을 알아보세요. 시험 일정과 준비 기간을 확인하고 계획을 세우세요.',
            deadline: '8월 둘째 주',
            importance: 'medium'
          },
          {
            task: '멘토 찾기',
            detail: '재정적으로 성공한 사람이나 업계 선배에게 조언을 구하세요. 책이나 유튜브를 통해서도 멘토를 찾을 수 있습니다.',
            deadline: '8월 셋째 주',
            importance: 'medium'
          },
          {
            task: '건강 검진 예약',
            detail: '건강이 가장 큰 자산입니다. 연례 건강검진을 예약하고, 건강한 생활습관을 점검하세요.',
            deadline: '8월 넷째 주',
            importance: 'high'
          }
        ],
        tip: '자기 자신에 대한 투자가 가장 높은 수익률을 가져옵니다.'
      },
      {
        month: 9,
        title: '9월: 자산 증식의 달',
        theme: '투자 확대 및 다각화',
        priority: baseScore >= 60 ? '공격적 포트폴리오 확대' : '안정적 자산 비중 증가',
        actions: [
          {
            task: '대체 투자 검토',
            detail: '주식 외 부동산(리츠), 금, 채권 등 다양한 자산을 검토하세요. 분산 투자로 리스크를 줄이세요.',
            deadline: '9월 첫째 주',
            importance: 'medium'
          },
          {
            task: '연금저축 납입 계획',
            detail: '연말까지 연금저축 한도(400만원)를 채울 계획을 세우세요. 세액공제 혜택을 최대로 활용하세요.',
            deadline: '9월 둘째 주',
            importance: 'high'
          },
          {
            task: '해외 투자 고려',
            detail: '미국 주식이나 글로벌 ETF를 고려해보세요. 환율과 세금을 이해하고 투자하세요.',
            deadline: '9월 셋째 주',
            importance: 'medium'
          },
          {
            task: '부동산 시장 분석',
            detail: '부동산 투자 계획이 있다면 시장 동향을 분석하세요. 청약 일정, 분양 정보를 확인하세요.',
            deadline: '9월 넷째 주',
            importance: 'low'
          }
        ],
        tip: dayElement === '토' ? '부동산과 실물 자산에서 특히 좋은 기회가 있을 수 있습니다.' :
             '투자는 분산이 원칙입니다. 한 곳에 몰빵하지 마세요.'
      },
      {
        month: 10,
        title: '10월: 수확의 달',
        theme: '성과 확인 및 수익 실현',
        priority: '투자 수익 일부 실현',
        actions: [
          {
            task: '투자 성과 분석',
            detail: '올해 투자한 종목들의 성과를 분석하세요. 목표 수익률을 달성했다면 일부 익절을 고려하세요.',
            deadline: '10월 첫째 주',
            importance: 'high'
          },
          {
            task: '손실 종목 정리',
            detail: '회복 가능성이 낮은 손실 종목은 과감히 정리하세요. 손절의 아픔보다 기회비용이 더 큽니다.',
            deadline: '10월 둘째 주',
            importance: 'medium'
          },
          {
            task: '연간 수익/손실 계산',
            detail: '세금 신고를 위해 연간 투자 수익과 손실을 정리하세요. 양도소득세 대상 여부를 확인하세요.',
            deadline: '10월 셋째 주',
            importance: 'high'
          },
          {
            task: '내년 투자 전략 초안',
            detail: '올해의 경험을 바탕으로 내년 투자 전략을 미리 구상해보세요.',
            deadline: '10월 넷째 주',
            importance: 'medium'
          }
        ],
        tip: '가을은 수확의 계절입니다. 올해 노력의 결실을 확인할 시간입니다.'
      },
      {
        month: 11,
        title: '11월: 정리의 달',
        theme: '연말 재정 준비',
        priority: '세금 최적화 및 정리',
        actions: [
          {
            task: '연말정산 사전 준비',
            detail: '연말정산 미리보기로 예상 환급액을 확인하세요. 부족한 공제 항목이 있다면 지금 채우세요.',
            deadline: '11월 첫째 주',
            importance: 'high'
          },
          {
            task: '기부금 영수증 정리',
            detail: '올해 기부한 내역의 영수증을 모으세요. 추가 기부로 공제 한도를 채우는 것도 고려하세요.',
            deadline: '11월 둘째 주',
            importance: 'medium'
          },
          {
            task: '연간 지출 결산',
            detail: '올해 총 지출을 카테고리별로 정리하세요. 예상보다 많이 쓴 항목을 파악하세요.',
            deadline: '11월 셋째 주',
            importance: 'high'
          },
          {
            task: '연말 보너스 활용 계획',
            detail: '보너스가 있다면 사용 계획을 미리 세우세요. 저축/투자/소비 비율을 정하세요.',
            deadline: '11월 넷째 주',
            importance: 'medium'
          }
        ],
        tip: '11월에 정리를 잘 해두면 12월이 편해집니다.'
      },
      {
        month: 12,
        title: '12월: 마무리의 달',
        theme: '연간 결산 및 내년 준비',
        priority: '2026년 마무리 & 2027년 준비',
        actions: [
          {
            task: '2026년 재정 최종 결산',
            detail: '올해의 총 수입, 지출, 저축, 투자 성과를 정리하세요. 연초 목표 대비 달성률을 계산하세요.',
            deadline: '12월 첫째 주',
            importance: 'high'
          },
          {
            task: '잘한 점/못한 점 분석',
            detail: '올해 재정 관리에서 잘한 점과 개선할 점을 기록하세요. 내년에 반복/개선할 사항을 정하세요.',
            deadline: '12월 둘째 주',
            importance: 'high'
          },
          {
            task: '2027년 재정 목표 초안',
            detail: '내년 재정 목표를 미리 세우세요. 저축액, 투자 수익률, 소득 증가 등 구체적인 수치로 정하세요.',
            deadline: '12월 셋째 주',
            importance: 'medium'
          },
          {
            task: '감사와 축하',
            detail: `${name}님, 1년간 수고하셨습니다! 성과가 크든 작든 꾸준히 노력한 자신을 축하해주세요.`,
            deadline: '12월 넷째 주',
            importance: 'high'
          }
        ],
        tip: '한 해를 잘 마무리하면 새해를 더 잘 시작할 수 있습니다.'
      }
    ];

    return plans;
  };

  const monthlyPlans = getMonthlyActionPlan();

  const importanceColors: Record<ImportanceLevel, string> = {
    high: 'bg-red-500/20 text-red-400 border-red-500/30',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    low: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
  };

  const importanceLabels: Record<ImportanceLevel, string> = {
    high: '필수',
    medium: '권장',
    low: '선택'
  };

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2
        className="text-3xl font-bold text-center mb-4 gradient-text"
        style={{ fontFamily: "'Noto Serif KR', serif" }}
      >
        📋 2026년 월별 실행 계획
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님을 위한 12개월 재정 로드맵
      </p>

      {/* 연간 목표 요약 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center p-4">
            <Target className="w-8 h-8 mx-auto text-amber-400 mb-2" />
            <p className="text-slate-400 text-sm">목표 저축률</p>
            <p className="text-2xl font-bold text-white">{baseScore >= 70 ? '30%' : baseScore >= 50 ? '20%' : '15%'}</p>
          </div>
          <div className="text-center p-4">
            <TrendingUp className="w-8 h-8 mx-auto text-green-400 mb-2" />
            <p className="text-slate-400 text-sm">목표 투자수익</p>
            <p className="text-2xl font-bold text-white">{재성 >= 2 ? '15%' : '8%'}</p>
          </div>
          <div className="text-center p-4">
            <Wallet className="w-8 h-8 mx-auto text-purple-400 mb-2" />
            <p className="text-slate-400 text-sm">지출 절감</p>
            <p className="text-2xl font-bold text-white">10%</p>
          </div>
          <div className="text-center p-4">
            <Briefcase className="w-8 h-8 mx-auto text-cyan-400 mb-2" />
            <p className="text-slate-400 text-sm">추가 수입</p>
            <p className="text-2xl font-bold text-white">{식상 >= 2 ? '월 50만' : '월 30만'}</p>
          </div>
        </div>
      </div>

      {/* 월별 상세 계획 */}
      <div className="space-y-6">
        {monthlyPlans.map((plan, idx) => (
          <motion.div
            key={plan.month}
            className="glass rounded-2xl overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
          >
            {/* 월 헤더 */}
            <div className="bg-gradient-to-r from-amber-500/20 to-yellow-600/20 p-4 border-b border-amber-500/20">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-amber-400" />
                  <h3 className="text-xl font-bold text-amber-400">{plan.title}</h3>
                </div>
                <span className="text-sm px-3 py-1 bg-amber-500/20 rounded-full text-amber-300">
                  {plan.priority}
                </span>
              </div>
              <p className="text-slate-300 mt-2">{plan.theme}</p>
            </div>

            {/* 액션 아이템들 */}
            <div className="p-4 space-y-4">
              {(plan.actions as ActionItem[]).map((action, actionIdx) => (
                <div key={actionIdx} className="glass rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <h4 className="font-semibold text-white">{action.task}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${importanceColors[action.importance]}`}>
                          {importanceLabels[action.importance]}
                        </span>
                        <span className="text-xs text-slate-500">~ {action.deadline}</span>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed">{action.detail}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* 월별 팁 */}
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 mt-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <p className="text-purple-300 text-sm">💡 <strong>이 달의 팁:</strong> {plan.tip}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 연간 체크리스트 */}
      <div className="glass rounded-2xl p-6 mt-8">
        <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
          <PiggyBank className="w-6 h-6" />
          2026년 필수 체크리스트
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            '연간 재정 목표 수립',
            '비상금 3개월치 확보',
            '연금저축 400만원 납입',
            'IRP 300만원 납입',
            '투자 포트폴리오 구성',
            '부업/추가 수입원 확보',
            '보험 및 고정비 정리',
            '연말정산 최적화'
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 p-3 glass rounded-lg">
              <div className="w-5 h-5 border-2 border-slate-600 rounded flex-shrink-0" />
              <span className="text-slate-300 text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
