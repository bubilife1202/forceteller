'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Home, DollarSign, Calendar, FileText } from 'lucide-react';

interface MovingRentalProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function MovingRental({ result, name }: MovingRentalProps) {
  const dayElement = result.day.stem.element;
  const { 재성, 관성, 비겁, 식상 } = result.tenGodsCount;

  // 전세/월세 운세 점수
  const getRentalFortune = () => {
    let score = 50;

    // 십성 분석
    if (재성 >= 2) score += 15; // 재성은 재물 관리
    if (관성 >= 2) score += 10; // 관성은 계약, 안정
    if (비겁 >= 3) score -= 10; // 비겁 과다는 재물 유출

    // 일간별
    if (dayElement === '토') score += 15; // 토는 부동산
    if (dayElement === '금') score += 10; // 금은 재물 관리
    if (dayElement === '수') score += 5; // 수는 유동성
    if (dayElement === '화') score -= 5; // 화는 소비 성향

    return Math.min(Math.max(score, 30), 100);
  };

  const rentalScore = getRentalFortune();

  // 전세 vs 월세 분석
  const getJeonseVsWolse = () => {
    return {
      jeonse: {
        name: '전세',
        score: (() => {
          let score = 50;
          if (재성 >= 2) score += 20; // 큰 돈 관리 능력
          if (관성 >= 2) score += 15; // 안정적 계약
          if (dayElement === '토') score += 15; // 토는 부동산
          if (dayElement === '금') score += 10; // 금은 저축
          if (비겁 >= 3) score -= 15; // 재물 관리 어려움
          return Math.min(Math.max(score, 30), 100);
        })(),
        pros: ['월세 부담 없음', '장기 거주 유리', '보증금 돌려받음', '주거 안정성'],
        cons: ['목돈 필요', '이자 손실', '계약 갱신 부담', '전세 사기 위험'],
        suitable: '목돈 여유가 있고 장기 거주 계획이 있는 경우',
        emoji: '🏠',
        color: 'from-blue-500 to-cyan-600',
      },
      wolse: {
        name: '월세',
        score: (() => {
          let score = 50;
          if (식상 >= 2) score += 15; // 수입 관리
          if (dayElement === '수') score += 15; // 유동성
          if (dayElement === '화') score += 10; // 활동적
          if (재성 <= 1) score += 10; // 목돈 부족 시
          if (비겁 >= 2) score += 5; // 월 단위 관리
          return Math.min(Math.max(score, 30), 100);
        })(),
        pros: ['초기 비용 적음', '이동 자유로움', '투자 여력 확보', '리스크 분산'],
        cons: ['매월 부담', '장기적 손해', '집주인 변수', '세금 혜택 적음'],
        suitable: '초기 자금이 부족하거나 단기 거주 계획인 경우',
        emoji: '💰',
        color: 'from-green-500 to-emerald-600',
      },
    };
  };

  const comparison = getJeonseVsWolse();

  // 계약 시 주의사항
  const getContractWarnings = () => {
    return [
      {
        category: '계약 전 필수 확인',
        icon: '📋',
        color: 'from-red-500 to-orange-600',
        items: [
          '등기부등본 열람 (근저당, 가압류, 임차권)',
          '전입세대 열람 (선순위 임차인)',
          '건축물대장 확인 (불법 건축)',
          '집주인 신분증 확인',
          '실소유주 확인 (대리인 경우)',
        ],
      },
      {
        category: '계약서 작성 주의',
        icon: '✍️',
        color: 'from-purple-500 to-pink-600',
        items: [
          '특약 사항 꼼꼼히 확인',
          '계약금, 중도금, 잔금 일정',
          '수리 책임 명시',
          '중개수수료 확인',
          '원상복구 조건',
        ],
      },
      {
        category: '입주 전 체크',
        icon: '🔍',
        color: 'from-blue-500 to-cyan-600',
        items: [
          '전입신고 즉시 (확정일자)',
          '관리비 고지서 확인',
          '시설물 상태 사진 촬영',
          '하자 있으면 즉시 통보',
          '보험 가입 (화재, 배상)',
        ],
      },
      {
        category: '거주 중 관리',
        icon: '📝',
        color: 'from-green-500 to-emerald-600',
        items: [
          '월세는 자동이체 권장',
          '수리 요청은 문서로',
          '중요 연락은 기록 보관',
          '임대료 인상 한도 확인',
          '계약 갱신 청구권 숙지',
        ],
      },
    ];
  };

  const contractWarnings = getContractWarnings();

  // 전세 사기 예방법
  const getFraudPrevention = () => {
    return [
      {
        warning: '선순위 임차인 많음',
        check: '전입세대 열람으로 확인',
        action: '계약 금지 - 보증금 못 받을 위험',
      },
      {
        warning: '과도한 근저당',
        check: '등기부등본의 을구란 확인',
        action: '전세 보증금 < 집값 70% 확인',
      },
      {
        warning: '가압류/경매 진행',
        check: '등기부등본 갑구란',
        action: '절대 계약 금지',
      },
      {
        warning: '깡통전세',
        check: '시세 확인 (네이버 부동산)',
        action: '집값의 80% 이상 전세는 위험',
      },
      {
        warning: '신축/재건축',
        check: '준공 1년 이상 경과 확인',
        action: '미확인 시 전세보증보험 필수',
      },
    ];
  };

  const fraudPrevention = getFraudPrevention();

  // 월별 전세/월세 운
  const getMonthlyRentalLuck = () => {
    return [
      { month: '1-2월', luck: '저렴한 매물 많음', tip: '비수기로 협상 유리' },
      { month: '3-4월', luck: '이사철, 경쟁 치열', tip: '빠른 결정 필요' },
      { month: '5-6월', luck: '중간 시즌', tip: '보통 수준의 매물' },
      { month: '7-8월', luck: '여름 이사 시즌', tip: '학군 좋은 곳 경쟁' },
      { month: '9-10월', luck: '가을 이사 성수기', tip: '가격 약간 높음' },
      { month: '11-12월', luck: '비수기, 협상 가능', tip: '연말 할인 기대' },
    ];
  };

  const monthlyLuck = getMonthlyRentalLuck();

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
        🏘️ 전세/월세 운세
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님의 전월세 계약 운세 분석
      </p>

      {/* 전세/월세 운세 점수 */}
      <div className="glass rounded-2xl p-8 mb-8 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30">
        <div className="text-center mb-6">
          <p className="text-slate-400 mb-2">전월세 계약운</p>
          <p className="text-5xl font-bold text-cyan-400 mb-2">{rentalScore}점</p>
          <p className="text-slate-300">
            {rentalScore >= 70 ? '좋은 계약 기회가 많습니다. 신중하게 선택하세요.' :
             rentalScore >= 50 ? '무난한 계약이 가능합니다. 꼼꼼히 확인하세요.' :
             '계약 시 더욱 신중해야 합니다. 전문가 도움 받으세요.'}
          </p>
        </div>
      </div>

      {/* 전세 vs 월세 비교 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-purple-400 mb-6 flex items-center gap-2">
          <Home className="w-6 h-6" />
          전세 vs 월세 운세 비교
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {Object.values(comparison).map((type, index) => (
            <motion.div
              key={type.name}
              className="glass-strong rounded-xl p-6"
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center text-3xl`}>
                  {type.emoji}
                </div>
                <div>
                  <h4 className="font-bold text-white text-xl">{type.name}</h4>
                  <p className="text-2xl font-bold text-emerald-400">{type.score}점</p>
                </div>
              </div>

              <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-4">
                <motion.div
                  className={`h-full bg-gradient-to-r ${type.color}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${type.score}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                />
              </div>

              <div className="mb-4">
                <p className="text-sm font-bold text-green-400 mb-2">장점</p>
                <ul className="space-y-1">
                  {type.pros.map((pro, idx) => (
                    <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                      <span className="text-green-400">•</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <p className="text-sm font-bold text-orange-400 mb-2">단점</p>
                <ul className="space-y-1">
                  {type.cons.map((con, idx) => (
                    <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                      <span className="text-orange-400">•</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-xs text-amber-400 italic">{type.suitable}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 계약 시 주의사항 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-red-400 mb-6 flex items-center gap-2">
          <FileText className="w-6 h-6" />
          계약 시 필수 체크리스트
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {contractWarnings.map((section, index) => (
            <motion.div
              key={section.category}
              className="glass-strong rounded-xl p-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center text-2xl`}>
                  {section.icon}
                </div>
                <h4 className="font-bold text-white">{section.category}</h4>
              </div>
              <ul className="space-y-2">
                {section.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-emerald-400 text-xs mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 전세 사기 예방 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-orange-400 mb-6 flex items-center gap-2">
          <DollarSign className="w-6 h-6" />
          전세 사기 예방법 (필독!)
        </h3>
        <div className="space-y-3">
          {fraudPrevention.map((item, index) => (
            <motion.div
              key={item.warning}
              className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="grid md:grid-cols-3 gap-3">
                <div>
                  <p className="text-xs text-slate-400 mb-1">위험 신호</p>
                  <p className="text-sm font-bold text-red-400">{item.warning}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">확인 방법</p>
                  <p className="text-sm text-blue-400">{item.check}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">대처 방법</p>
                  <p className="text-sm text-emerald-400">{item.action}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/30 rounded-xl">
          <p className="text-slate-300 text-sm leading-relaxed">
            ⚠️ <span className="font-bold">전세보증보험 필수:</span> HUG(주택도시보증공사) 또는 SGI(서울보증)
            전세보증보험에 가입하세요. 만약 보험 가입이 거부되면 그 집은 위험합니다.
          </p>
        </div>
      </div>

      {/* 월별 전세/월세 운 */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
          <Calendar className="w-6 h-6" />
          월별 전월세 계약 타이밍
        </h3>
        <div className="grid md:grid-cols-3 gap-3">
          {monthlyLuck.map((item, index) => (
            <motion.div
              key={item.month}
              className="p-4 bg-slate-800/50 rounded-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <p className="font-bold text-white mb-2">{item.month}</p>
              <p className="text-sm text-emerald-400 mb-1">{item.luck}</p>
              <p className="text-xs text-slate-400">{item.tip}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl">
          <p className="text-slate-300 text-sm leading-relaxed">
            💡 <span className="font-bold">꿀팁:</span> 비수기(1-2월, 11-12월)에는 가격 협상이 유리합니다.
            성수기(3-4월, 9-10월)는 좋은 매물이 많지만 경쟁이 치열하니 빠른 결정이 필요합니다.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
