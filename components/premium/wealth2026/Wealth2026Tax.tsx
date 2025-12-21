'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Receipt, Calculator, PiggyBank, AlertCircle, CheckCircle, Calendar, FileText } from 'lucide-react';

interface Wealth2026TaxProps {
  result: SajuResult;
  name: string;
  baseScore: number;
}

export default function Wealth2026Tax({ result, name, baseScore }: Wealth2026TaxProps) {
  const dayElement = result.day.stem.element;
  const { 재성, 관성 } = result.tenGodsCount;

  // 절세 전략 점수
  const getTaxSavingPotential = () => {
    let score = 50;
    if (관성 >= 2) score += 15; // 직장인 공제 활용 유리
    if (재성 >= 2) score += 10; // 투자/사업 공제 활용
    if (dayElement === '금') score += 10; // 꼼꼼함
    return Math.min(score, 100);
  };

  const taxScore = getTaxSavingPotential();

  // 연말정산 필수 체크리스트
  const getDeductionChecklist = () => {
    return [
      {
        category: '소득공제',
        items: [
          { name: '신용카드/체크카드 사용액', limit: '소득의 25% 초과분', tip: '총급여 25%까지는 공제 안됨. 초과분만 공제' },
          { name: '전통시장 사용액', limit: '추가 10% 공제', tip: '전통시장에서 현금/카드 결제시 추가 공제' },
          { name: '대중교통 사용액', limit: '추가 40% 공제', tip: '대중교통 결제액은 높은 공제율 적용' },
          { name: '주택청약저축', limit: '연 240만원', tip: '무주택 세대주만 공제 가능' },
          { name: '주택담보대출 이자', limit: '연 300-1800만원', tip: '상환기간에 따라 한도 상이' }
        ]
      },
      {
        category: '세액공제',
        items: [
          { name: '연금저축', limit: '연 400만원 (16.5%)', tip: '총급여 5,500만원 이하시 16.5% 공제율' },
          { name: 'IRP (퇴직연금)', limit: '연 700만원', tip: '연금저축 포함 총 700만원 한도' },
          { name: '보험료', limit: '연 100만원', tip: '보장성 보험만 해당 (저축성 제외)' },
          { name: '의료비', limit: '총급여 3% 초과분', tip: '난임시술비, 미숙아 의료비는 전액 공제' },
          { name: '교육비', limit: '대학생 연 900만원', tip: '본인 교육비는 전액 공제' },
          { name: '기부금', limit: '종교단체 10%, 일반 30%', tip: '정치자금 기부금은 100% 공제' },
          { name: '월세 세액공제', limit: '연 750만원', tip: '무주택 세대주, 총급여 7천만원 이하' }
        ]
      }
    ];
  };

  const deductions = getDeductionChecklist();

  // 월별 절세 액션 플랜
  const getMonthlyTaxPlan = () => {
    return [
      { month: '1월', action: '연말정산 간소화 자료 확인', detail: '빠진 공제항목 없는지 체크' },
      { month: '2월', action: '추가 서류 제출', detail: '누락된 영수증, 기부금 증빙 제출' },
      { month: '3월', action: '환급금 확인', detail: '예상보다 적다면 원인 분석' },
      { month: '4-5월', action: '종합소득세 신고', detail: '프리랜서/부업 수입 있으면 5월 신고' },
      { month: '6월', action: '상반기 지출 점검', detail: '신용카드 사용액 체크, 부족하면 하반기 조절' },
      { month: '7-8월', action: '연금저축/IRP 납입 계획', detail: '하반기 남은 한도 확인' },
      { month: '9월', action: '기부금 납입 계획', detail: '연말까지 기부 계획 수립' },
      { month: '10월', action: '의료비/교육비 점검', detail: '큰 지출 있었다면 영수증 정리' },
      { month: '11월', action: '연금저축/IRP 마무리', detail: '한도까지 납입 완료' },
      { month: '12월', action: '최종 점검', detail: '모든 공제항목 챙기기' }
    ];
  };

  const monthlyPlan = getMonthlyTaxPlan();

  // 맞춤형 절세 팁
  const getPersonalizedTips = () => {
    const tips = [];

    if (관성 >= 2) {
      tips.push({
        title: '직장인 맞춤 전략',
        description: '관성이 강한 당신은 직장에서의 수입이 주력입니다. 연말정산을 철저히 준비하세요.',
        actions: [
          '연금저축/IRP 한도(700만원) 꽉 채우기',
          '신용카드보다 체크카드 사용 비중 높이기',
          '월세 살고 있다면 세액공제 신청'
        ]
      });
    }

    if (재성 >= 2) {
      tips.push({
        title: '투자 수익 절세 전략',
        description: '재성이 강한 당신은 투자 수익에 대한 세금 관리가 중요합니다.',
        actions: [
          'ISA 계좌 활용 (3년 보유시 200만원 비과세)',
          '해외주식은 250만원까지 비과세 (매년 활용)',
          '손실 난 종목은 연말에 정리해 손익통산'
        ]
      });
    }

    tips.push({
      title: '부업/프리랜서 수입 관리',
      description: '추가 수입이 있다면 종합소득세 신고가 필요합니다.',
      actions: [
        '수입 3,000만원 이하: 단순경비율 적용',
        '필요경비 영수증 꼼꼼히 모으기',
        '5월 종합소득세 신고 잊지 말기'
      ]
    });

    tips.push({
      title: '노후 대비 + 절세',
      description: '연금 상품은 절세와 노후 준비를 동시에 할 수 있습니다.',
      actions: [
        '연금저축 400만원 + IRP 300만원 = 연 115만원 환급',
        '55세 이후 연금 수령시 저율 과세 (3.3-5.5%)',
        '중도해지시 16.5% 기타소득세 부과 주의'
      ]
    });

    return tips;
  };

  const personalizedTips = getPersonalizedTips();

  // 예상 절세액 계산
  const getEstimatedSavings = () => {
    // 가정: 연봉 5000만원, 공제 최대 활용
    const savings = {
      pension: { amount: 700, savings: 115.5, description: '연금저축 + IRP' },
      insurance: { amount: 100, savings: 13.2, description: '보장성 보험' },
      card: { amount: 200, savings: 30, description: '카드 소득공제' },
      donation: { amount: 50, savings: 8.25, description: '기부금' },
      total: 166.95
    };
    return savings;
  };

  const savings = getEstimatedSavings();

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
        🧾 2026년 절세/세금 가이드
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님을 위한 스마트한 세금 관리 전략
      </p>

      {/* 절세 잠재력 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-teal-400">절세 잠재력 {taxScore}점</h3>
            <p className="text-slate-400">
              {taxScore >= 70 ? '적극적인 절세 전략이 큰 효과를 볼 수 있습니다' :
               taxScore >= 50 ? '기본 공제를 잘 챙기면 수십만원 환급 가능' :
               '간단한 공제 항목부터 시작하세요'}
            </p>
          </div>
        </div>
      </div>

      {/* 예상 절세액 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <PiggyBank className="w-6 h-6 text-green-400" />
          <h3 className="text-xl font-bold text-green-400">예상 연간 절세액 (최대 활용 시)</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center p-4 glass rounded-xl">
            <p className="text-slate-400 text-sm">{savings.pension.description}</p>
            <p className="text-xl font-bold text-green-400">{savings.pension.savings}만원</p>
          </div>
          <div className="text-center p-4 glass rounded-xl">
            <p className="text-slate-400 text-sm">{savings.insurance.description}</p>
            <p className="text-xl font-bold text-green-400">{savings.insurance.savings}만원</p>
          </div>
          <div className="text-center p-4 glass rounded-xl">
            <p className="text-slate-400 text-sm">{savings.card.description}</p>
            <p className="text-xl font-bold text-green-400">{savings.card.savings}만원</p>
          </div>
          <div className="text-center p-4 glass rounded-xl">
            <p className="text-slate-400 text-sm">{savings.donation.description}</p>
            <p className="text-xl font-bold text-green-400">{savings.donation.savings}만원</p>
          </div>
        </div>
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
          <p className="text-slate-300">최대 절세 예상액</p>
          <p className="text-3xl font-bold text-green-400">약 {savings.total}만원</p>
          <p className="text-slate-500 text-sm mt-1">* 연봉 5,000만원 기준, 실제 금액은 개인 상황에 따라 다름</p>
        </div>
      </div>

      {/* 연말정산 체크리스트 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-6 h-6 text-amber-400" />
          <h3 className="text-xl font-bold text-amber-400">연말정산 체크리스트</h3>
        </div>
        {deductions.map((category, catIdx) => (
          <div key={catIdx} className="mb-6 last:mb-0">
            <h4 className="text-lg font-semibold text-purple-400 mb-3">{category.category}</h4>
            <div className="space-y-2">
              {category.items.map((item, itemIdx) => (
                <motion.div
                  key={itemIdx}
                  className="glass rounded-xl p-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: itemIdx * 0.05 }}
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="font-medium text-white">{item.name}</span>
                        <span className="text-sm text-amber-400">{item.limit}</span>
                      </div>
                      <p className="text-slate-400 text-sm mt-1">💡 {item.tip}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 월별 절세 액션 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="w-6 h-6 text-cyan-400" />
          <h3 className="text-xl font-bold text-cyan-400">월별 절세 액션 플랜</h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {monthlyPlan.map((item, idx) => (
            <motion.div
              key={idx}
              className="glass rounded-xl p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.03 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 text-sm font-bold flex items-center justify-center">
                  {item.month.replace('월', '')}
                </span>
                <span className="font-medium text-white text-sm">{item.action}</span>
              </div>
              <p className="text-slate-400 text-xs">{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 맞춤형 절세 팁 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Receipt className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-bold text-purple-400">{name}님 맞춤 절세 전략</h3>
        </div>
        <div className="space-y-4">
          {personalizedTips.map((tip, idx) => (
            <motion.div
              key={idx}
              className="glass rounded-xl p-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <h4 className="text-lg font-bold text-white mb-2">{tip.title}</h4>
              <p className="text-slate-400 text-sm mb-3">{tip.description}</p>
              <div className="space-y-2">
                {tip.actions.map((action, actionIdx) => (
                  <div key={actionIdx} className="flex items-center gap-2">
                    <span className="text-green-400">→</span>
                    <span className="text-slate-300 text-sm">{action}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 주의사항 */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-amber-400 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-amber-400 mb-2">세금 관리 주의사항</h4>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>• 연금저축/IRP 중도해지시 16.5% 기타소득세 부과</li>
              <li>• 의료비 공제는 총급여의 3% 초과분만 해당</li>
              <li>• 월세 세액공제는 주민등록상 주소 일치 필요</li>
              <li>• 해외주식 양도소득세는 다음해 5월 신고 (연 250만원 이상 수익시)</li>
              <li>• 부업 수입 연 2,400만원 초과시 사업자등록 권장</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
