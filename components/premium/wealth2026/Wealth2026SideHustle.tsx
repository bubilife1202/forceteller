'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Rocket, DollarSign, Clock, Star, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface Wealth2026SideHustleProps {
  result: SajuResult;
  name: string;
  baseScore: number;
}

export default function Wealth2026SideHustle({ result, name, baseScore }: Wealth2026SideHustleProps) {
  const dayElement = result.day.stem.element;
  const { 식상, 재성, 인성, 비겁 } = result.tenGodsCount;

  // 부업 적성 점수
  const getSideHustleScore = () => {
    let score = 40;
    if (식상 >= 2) score += 25; // 창작/표현 능력
    if (재성 >= 2) score += 20; // 돈 버는 감각
    if (인성 >= 1) score += 10; // 전문성
    if (비겁 >= 2) score += 5; // 협력 능력

    // 2026년 운세 보너스
    if (baseScore >= 70) score += 10;

    return Math.min(score, 100);
  };

  const sideHustleScore = getSideHustleScore();

  // 추천 부업 목록
  const getRecommendedSideHustles = () => {
    const hustles = [];

    // 식상이 강한 경우 - 창작/콘텐츠
    if (식상 >= 2) {
      hustles.push({
        category: '콘텐츠 크리에이터',
        options: [
          {
            name: '유튜브/틱톡 크리에이터',
            difficulty: '중',
            startupCost: '50-100만원',
            monthlyPotential: '0-500만원+',
            timeNeeded: '주 10-20시간',
            description: '관심 분야의 영상 콘텐츠를 제작하여 광고 수익, 스폰서십, 협찬을 받습니다.',
            steps: ['콘텐츠 주제 선정', '장비 구입 (스마트폰으로 시작 가능)', '채널 개설 및 브랜딩', '주 2-3회 꾸준한 업로드', '수익화 조건 달성 (구독자 1000명, 시청시간 4000시간)'],
            pros: ['높은 수익 잠재력', '자산화 가능', '재미있음'],
            cons: ['성과까지 시간 소요', '꾸준함 필요', '초기 무수익 기간']
          },
          {
            name: '블로그/뉴스레터',
            difficulty: '하',
            startupCost: '0-10만원',
            monthlyPotential: '10-200만원',
            timeNeeded: '주 5-10시간',
            description: '전문 분야나 관심사에 대한 글을 써서 광고 수익, 유료 구독, 제휴 마케팅 수익을 올립니다.',
            steps: ['플랫폼 선택 (네이버, 티스토리, 브런치)', '주제/니치 선정', '주 2-3회 포스팅', 'SEO 최적화', '광고 및 제휴 연결'],
            pros: ['초기 비용 거의 없음', '장기 자산화', '시간/장소 자유'],
            cons: ['성과까지 6개월-1년', '글쓰기 능력 필요', '꾸준함 필수']
          }
        ]
      });
    }

    // 인성이 강한 경우 - 지식/교육
    if (인성 >= 2) {
      hustles.push({
        category: '지식 판매/교육',
        options: [
          {
            name: '온라인 강의',
            difficulty: '중',
            startupCost: '30-100만원',
            monthlyPotential: '50-300만원',
            timeNeeded: '초기 집중 + 주 5시간',
            description: '전문 지식을 온라인 강의로 만들어 클래스101, 탈잉, 유데미 등에서 판매합니다.',
            steps: ['강의 주제 선정', '커리큘럼 기획', '영상 촬영 및 편집', '플랫폼 업로드', '마케팅 및 후기 관리'],
            pros: ['한 번 만들면 반복 수익', '전문가 브랜딩', '높은 단가'],
            cons: ['초기 제작 노력 큼', '플랫폼 수수료', '경쟁 치열']
          },
          {
            name: '과외/컨설팅',
            difficulty: '하',
            startupCost: '0원',
            monthlyPotential: '50-200만원',
            timeNeeded: '주 5-15시간',
            description: '1:1 또는 소그룹 과외, 전문 분야 컨설팅을 제공합니다.',
            steps: ['전문 분야 정리', '시간당 요금 설정', '홍보 (숨고, 탈잉, 지인 소개)', '첫 수업 진행', '후기 및 레퍼런스 확보'],
            pros: ['즉시 수익 가능', '초기 비용 없음', '유연한 시간'],
            cons: ['시간 투입 필요', '1:1 한계', '체력 소모']
          }
        ]
      });
    }

    // 재성이 강한 경우 - 투자/거래
    if (재성 >= 2) {
      hustles.push({
        category: '투자/거래',
        options: [
          {
            name: '중고 거래/리셀',
            difficulty: '중',
            startupCost: '50-200만원',
            monthlyPotential: '30-150만원',
            timeNeeded: '주 10-20시간',
            description: '한정판 제품, 중고 물품을 사서 마진을 붙여 판매합니다.',
            steps: ['시장 조사 (인기 품목 파악)', '소량으로 시작', '번개장터/당근마켓 활용', '물류 시스템 구축', '단골 확보'],
            pros: ['빠른 현금화', '트렌드 감각 활용', '재미있음'],
            cons: ['재고 리스크', '시간 투입', '경쟁 치열']
          },
          {
            name: '스마트스토어/쇼핑몰',
            difficulty: '상',
            startupCost: '100-500만원',
            monthlyPotential: '100-1000만원+',
            timeNeeded: '주 20시간 이상',
            description: '네이버 스마트스토어나 자체 쇼핑몰을 운영하여 상품을 판매합니다.',
            steps: ['상품 선정 (위탁/사입)', '스토어 개설', '상품 등록 및 상세페이지 제작', '마케팅 (광고, SNS)', 'CS 및 물류 관리'],
            pros: ['높은 수익 잠재력', '시스템화 가능', '사업 확장 가능'],
            cons: ['초기 투자 필요', '경쟁 치열', '많은 시간 투입']
          }
        ]
      });
    }

    // 비겁이 강한 경우 - 협력/대리
    if (비겁 >= 2) {
      hustles.push({
        category: '협력/대리 서비스',
        options: [
          {
            name: '배달/대리운전',
            difficulty: '하',
            startupCost: '0-50만원',
            monthlyPotential: '100-250만원',
            timeNeeded: '원하는 만큼',
            description: '배달 앱이나 대리운전 앱을 통해 원하는 시간에 일합니다.',
            steps: ['앱 가입 및 심사', '오토바이/차량 준비', '효율적인 시간대 파악', '꾸준히 활동'],
            pros: ['즉시 수익', '시간 자유', '체력 관리'],
            cons: ['체력 소모', '사고 위험', '수익 한계']
          },
          {
            name: '공동구매 진행',
            difficulty: '중',
            startupCost: '0-30만원',
            monthlyPotential: '30-100만원',
            timeNeeded: '주 5-10시간',
            description: '인기 상품의 공동구매를 진행하고 수수료를 받습니다.',
            steps: ['커뮤니티/SNS 구축', '공구 상품 선정', '제조사/도매상 협상', '공구 진행', '배송 및 정산'],
            pros: ['재고 부담 적음', '인맥 활용', '트렌드 파악'],
            cons: ['신뢰 구축 필요', 'CS 부담', '규모 한계']
          }
        ]
      });
    }

    // 기본 추천
    hustles.push({
      category: '누구나 가능한 부업',
      options: [
        {
          name: '프리랜서 플랫폼',
          difficulty: '중',
          startupCost: '0원',
          monthlyPotential: '50-300만원',
          timeNeeded: '주 10-20시간',
          description: '크몽, 숨고, 탈잉 등에서 본인의 스킬로 서비스를 제공합니다.',
          steps: ['강점 스킬 파악', '플랫폼 가입', '프로필/포트폴리오 작성', '첫 의뢰 저가 수주', '후기 확보 후 단가 인상'],
          pros: ['다양한 스킬 활용', '시간 자유', '경험 축적'],
          cons: ['경쟁 치열', '플랫폼 수수료', '불규칙 수입']
        },
        {
          name: '설문조사/앱테크',
          difficulty: '하',
          startupCost: '0원',
          monthlyPotential: '5-30만원',
          timeNeeded: '자투리 시간',
          description: '설문조사, 리뷰 작성, 앱 설치 등으로 소소하게 수익을 올립니다.',
          steps: ['앱 설치 (캐시슬라이드, 토스 등)', '매일 꾸준히 참여', '고수익 설문 우선 참여'],
          pros: ['시간 제약 없음', '노력 대비 간편', '무자본'],
          cons: ['수익 한계', '시간 대비 효율 낮음', '지속성 어려움']
        }
      ]
    });

    return hustles;
  };

  const sideHustles = getRecommendedSideHustles();

  // 시작하기 좋은 달
  const getBestMonths = () => {
    const months = [];
    if (dayElement === '화' || dayElement === '목') {
      months.push({ month: '3월', reason: '새로운 시작에 좋은 에너지' });
      months.push({ month: '5월', reason: '실행력이 높아지는 시기' });
    }
    if (dayElement === '토' || dayElement === '금') {
      months.push({ month: '4월', reason: '안정적으로 시작하기 좋은 시기' });
      months.push({ month: '9월', reason: '수확의 계절, 결과가 나오는 시기' });
    }
    if (dayElement === '수') {
      months.push({ month: '1월', reason: '새해 에너지로 시작하기 좋음' });
      months.push({ month: '6월', reason: '상반기 마무리, 점검 시기' });
    }
    if (months.length < 2) {
      months.push({ month: '3월', reason: '새 학기/분기 시작 시즌' });
      months.push({ month: '9월', reason: '하반기 본격 시작' });
    }
    return months;
  };

  const bestMonths = getBestMonths();

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
        🚀 2026년 부업/투잡 가이드
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님의 추가 수입원 발굴 전략
      </p>

      {/* 부업 적성 점수 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
            <Rocket className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-orange-400">부업 적성 {sideHustleScore}점</h3>
            <p className="text-slate-400">
              {sideHustleScore >= 80 ? '부업 잠재력 매우 높음! 적극 도전하세요' :
               sideHustleScore >= 60 ? '부업으로 성공할 가능성이 높습니다' :
               sideHustleScore >= 40 ? '적합한 부업을 잘 선택하면 성공 가능' :
               '본업에 집중하며 소규모로 시작하세요'}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="text-center p-3 glass rounded-lg">
            <p className="text-xs text-slate-400">창작력</p>
            <p className="text-lg font-bold text-purple-400">{식상 >= 2 ? '높음' : 식상 >= 1 ? '보통' : '낮음'}</p>
          </div>
          <div className="text-center p-3 glass rounded-lg">
            <p className="text-xs text-slate-400">돈감각</p>
            <p className="text-lg font-bold text-green-400">{재성 >= 2 ? '높음' : 재성 >= 1 ? '보통' : '낮음'}</p>
          </div>
          <div className="text-center p-3 glass rounded-lg">
            <p className="text-xs text-slate-400">전문성</p>
            <p className="text-lg font-bold text-blue-400">{인성 >= 2 ? '높음' : 인성 >= 1 ? '보통' : '낮음'}</p>
          </div>
          <div className="text-center p-3 glass rounded-lg">
            <p className="text-xs text-slate-400">협력성</p>
            <p className="text-lg font-bold text-cyan-400">{비겁 >= 2 ? '높음' : 비겁 >= 1 ? '보통' : '낮음'}</p>
          </div>
        </div>
      </div>

      {/* 시작 추천 시기 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
          <Clock className="w-6 h-6" />
          부업 시작 추천 시기
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {bestMonths.map((item, idx) => (
            <div key={idx} className="glass rounded-xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Star className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <p className="font-bold text-white">{item.month}</p>
                <p className="text-slate-400 text-sm">{item.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 카테고리별 부업 추천 */}
      <div className="space-y-6">
        {sideHustles.map((category, catIdx) => (
          <motion.div
            key={catIdx}
            className="glass rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: catIdx * 0.1 }}
          >
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 border-b border-purple-500/20">
              <h3 className="text-xl font-bold text-purple-400">{category.category}</h3>
            </div>

            <div className="p-4 space-y-4">
              {category.options.map((option, optIdx) => (
                <div key={optIdx} className="glass rounded-xl p-5">
                  {/* 헤더 */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1">{option.name}</h4>
                      <p className="text-slate-400 text-sm">{option.description}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      option.difficulty === '하' ? 'bg-green-500/20 text-green-400' :
                      option.difficulty === '중' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      난이도 {option.difficulty}
                    </span>
                  </div>

                  {/* 수익 정보 */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                      <p className="text-xs text-slate-500">초기 비용</p>
                      <p className="text-sm font-semibold text-slate-300">{option.startupCost}</p>
                    </div>
                    <div className="text-center p-3 bg-green-500/10 rounded-lg">
                      <p className="text-xs text-slate-500">월 예상 수익</p>
                      <p className="text-sm font-semibold text-green-400">{option.monthlyPotential}</p>
                    </div>
                    <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                      <p className="text-xs text-slate-500">필요 시간</p>
                      <p className="text-sm font-semibold text-slate-300">{option.timeNeeded}</p>
                    </div>
                  </div>

                  {/* 시작 단계 */}
                  <div className="mb-4">
                    <h5 className="text-sm font-semibold text-cyan-400 mb-2 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" /> 시작하는 방법
                    </h5>
                    <div className="space-y-2">
                      {option.steps.map((step, stepIdx) => (
                        <div key={stepIdx} className="flex items-center gap-2 text-sm">
                          <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center flex-shrink-0">
                            {stepIdx + 1}
                          </span>
                          <span className="text-slate-400">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 장단점 */}
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-green-500/10 rounded-lg p-3">
                      <h5 className="text-xs font-semibold text-green-400 mb-2 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> 장점
                      </h5>
                      <ul className="space-y-1">
                        {option.pros.map((pro, proIdx) => (
                          <li key={proIdx} className="text-xs text-slate-400">• {pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-red-500/10 rounded-lg p-3">
                      <h5 className="text-xs font-semibold text-red-400 mb-2 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> 단점
                      </h5>
                      <ul className="space-y-1">
                        {option.cons.map((con, conIdx) => (
                          <li key={conIdx} className="text-xs text-slate-400">• {con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* 부업 성공 팁 */}
      <div className="glass rounded-2xl p-6 mt-8">
        <h3 className="text-xl font-bold text-amber-400 mb-4">💡 부업 성공을 위한 핵심 조언</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { title: '본업 우선', desc: '부업 때문에 본업에 지장이 생기면 안 됩니다. 균형을 유지하세요.' },
            { title: '작게 시작', desc: '처음부터 큰 투자를 하지 마세요. 검증 후 확장하세요.' },
            { title: '시간 관리', desc: '부업에 투입할 시간을 미리 정하고, 그 안에서만 활동하세요.' },
            { title: '세금 준비', desc: '부업 수입도 세금 신고 대상입니다. 미리 준비하세요.' },
            { title: '포기 시점', desc: '3-6개월 해보고 성과가 없으면 다른 것으로 전환하세요.' },
            { title: '자동화 추구', desc: '시간을 팔지 말고, 시스템을 만들어 수익을 자동화하세요.' }
          ].map((tip, idx) => (
            <div key={idx} className="glass rounded-xl p-4">
              <h4 className="font-semibold text-white mb-1">{tip.title}</h4>
              <p className="text-slate-400 text-sm">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
