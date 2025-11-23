'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { SajuResult } from '@/lib/saju-calculator';
import { TrendingUp, Heart, Briefcase, Sparkles } from 'lucide-react';

interface DetailTabsEnhancedProps {
  result: SajuResult;
  birthYear: number;
}

type TabType = '총운' | '재물' | '애정' | '직업';

export default function DetailTabsEnhanced({ result, birthYear }: DetailTabsEnhancedProps) {
  const [activeTab, setActiveTab] = useState<TabType>('총운');

  const tabs = [
    { id: '총운' as const, label: '총운', icon: Sparkles, color: 'from-purple-500 to-purple-600' },
    { id: '재물' as const, label: '재물운', icon: TrendingUp, color: 'from-amber-500 to-amber-600' },
    { id: '애정' as const, label: '애정운', icon: Heart, color: 'from-pink-500 to-rose-600' },
    { id: '직업' as const, label: '직업운', icon: Briefcase, color: 'from-blue-500 to-indigo-600' },
  ];

  // 십성별 해석 함수
  const getTenGodInterpretation = (count: number, godName: string): string => {
    const interpretations: {[key: string]: {[key: number]: string}} = {
      '비겁': {
        0: '독불장군 스타일, 혼자 결정하고 추진합니다',
        1: '협업 가능하나 주도권을 선호합니다',
        2: '협업 가능하나 주도권을 선호합니다',
        3: '팀워크 강함, 동업/파트너십이 유리합니다'
      },
      '식상': {
        0: '말보다 행동, 실무형입니다',
        1: '적절한 표현력과 전문 기술을 보유했습니다',
        2: '적절한 표현력과 전문 기술을 보유했습니다',
        3: '말빨, 기획력 탁월한 크리에이터형입니다'
      },
      '재성': {
        0: '돈 욕심이 적고 정신적 가치를 중시합니다',
        1: '적정한 재물운으로 안정적 수입이 가능합니다',
        2: '적정한 재물운으로 안정적 수입이 가능합니다',
        3: '재물 복이 많아 돈 되는 일을 귀신같이 찾습니다'
      },
      '관성': {
        0: '자유로운 영혼, 프리랜서/창업이 적합합니다',
        1: '직장생활이 무난하며 안정을 추구합니다',
        2: '직장생활이 무난하며 안정을 추구합니다',
        3: '공직/대기업 적합, 명예욕이 강합니다'
      },
      '인성': {
        0: '실무파로 이론보다 경험을 중시합니다',
        1: '공부운 있음, 자격증/학위가 도움됩니다',
        2: '공부운 있음, 자격증/학위가 도움됩니다',
        3: '학자형, 교육/연구 분야에 유리합니다'
      }
    };

    const key = count >= 3 ? 3 : count;
    return interpretations[godName]?.[key] || '';
  };

  const getContent = (tab: TabType) => {
    const { 비겁, 식상, 재성, 관성, 인성 } = result.tenGodsCount;
    const currentAge = new Date().getFullYear() - birthYear + 1;

    switch (tab) {
      case '총운':
        return {
          title: '당신의 인생 청사진',
          sections: [
            {
              subtitle: '기본 성향',
              items: [
                {
                  label: `일간 ${result.day.stem.ko}${result.day.stem.cn}의 본성`,
                  content: result.dayPersonality.personality,
                  icon: '🌟',
                },
                {
                  label: '타고난 강점',
                  content: result.dayPersonality.strength,
                  icon: '💪',
                },
                {
                  label: '주의할 약점',
                  content: result.dayPersonality.weakness,
                  icon: '⚠️',
                },
              ],
            },
            {
              subtitle: '인생 시기별 운세',
              items: [
                {
                  label: '청소년기 (1-16세)',
                  content: `년주 ${result.year.stem.ko}${result.year.stem.cn}${result.year.branch.ko}${result.year.branch.cn} - 부모님의 영향을 많이 받으며 기초가 형성되는 시기입니다`,
                  icon: '🌱',
                },
                {
                  label: '청년기 (17-32세)',
                  content: `월주 ${result.month.stem.ko}${result.month.stem.cn}${result.month.branch.ko}${result.month.branch.cn} - 직업과 재물의 기반을 다지는 중요한 시기입니다`,
                  icon: '🚀',
                },
                {
                  label: '중장년기 (33-48세)',
                  content: `일주 ${result.day.stem.ko}${result.day.stem.cn}${result.day.branch.ko}${result.day.branch.cn} - 본인과 배우자 중심으로 인생이 안정되는 시기입니다`,
                  icon: '👔',
                },
                {
                  label: '노년기 (49세 이후)',
                  content: `시주 ${result.hour.stem.ko}${result.hour.stem.cn}${result.hour.branch.ko}${result.hour.branch.cn} - 자녀와의 관계, 말년 운이 드러나는 시기입니다`,
                  icon: '🏡',
                },
              ],
            },
            {
              subtitle: '2025년 을사년 운세',
              items: [
                {
                  label: '1분기 (1-3월)',
                  content: '새해를 맞아 목표를 설정하고 계획을 세우는 시기입니다. 2-3월에 중요한 결정을 내릴 기회가 옵니다.',
                  icon: '🎯',
                },
                {
                  label: '2분기 (4-6월)',
                  content: '본격적으로 일이 진행되는 시기입니다. 5월에 재물운이 강하니 계약이나 투자를 고려하세요.',
                  icon: '📈',
                },
                {
                  label: '3분기 (7-9월)',
                  content: '중간 점검과 조정의 시기입니다. 7월은 변동수가 있으니 신중하게 대처하세요.',
                  icon: '⚖️',
                },
                {
                  label: '4분기 (10-12월)',
                  content: '한 해를 마무리하고 내년을 준비하는 시기입니다. 10-11월에 성과가 나타납니다.',
                  icon: '🎉',
                },
              ],
            },
          ],
        };

      case '재물':
        const 재성위치 = [];
        if (result.tenGods.year.includes('재')) 재성위치.push('년주');
        if (result.tenGods.month.includes('재')) 재성위치.push('월주');
        if (result.tenGods.day.includes('재')) 재성위치.push('일주');
        if (result.tenGods.hour.includes('재')) 재성위치.push('시주');

        // 용신에서 오행만 추출
        const yongsinMatch = result.yongsin.match(/^(목|화|토|금|수)/);
        const yongsinElem = yongsinMatch ? yongsinMatch[1] : '';

        return {
          title: '돈이 들어오는 패턴',
          sections: [
            {
              subtitle: '재성 분석',
              items: [
                {
                  label: '재성 구성',
                  content: `재성이 ${재성}개 있습니다${재성위치.length > 0 ? ` (${재성위치.join(', ')}에 위치)` : ''}. ${getTenGodInterpretation(재성, '재성')}`,
                  icon: '💰',
                },
                {
                  label: '재물 유입 경로',
                  content: 식상 >= 2
                    ? '식상생재 구조로 재능과 기술로 돈을 버는 타입입니다. 전문직, 크리에이터에 유리합니다.'
                    : 관성 >= 2
                    ? '관성을 통한 재물로 직장, 공직에서 안정적인 수입을 올립니다.'
                    : '본인의 노력과 실력으로 직접 재물을 만들어가는 타입입니다.',
                  icon: '🔄',
                },
              ],
            },
            {
              subtitle: '재테크 전략',
              items: [
                {
                  label: '투자 성향',
                  content: result.strength === 'strong'
                    ? '신강 사주로 재물을 감당할 힘이 있습니다. 공격적 투자도 가능하나, 분산 투자를 권장합니다.'
                    : '신약 사주로 무리한 투자보다는 안정적인 적금, 예금 위주가 좋습니다.',
                  icon: '📊',
                },
                {
                  label: '유리한 투자처',
                  content: yongsinElem === '목'
                    ? '교육, 출판, 섬유 관련 투자'
                    : yongsinElem === '화'
                    ? '전기, IT, 에너지 관련 투자'
                    : yongsinElem === '토'
                    ? '부동산, 건설 관련 투자'
                    : yongsinElem === '금'
                    ? '금융, 귀금속, 기계 관련 투자'
                    : yongsinElem === '수'
                    ? '물류, 관광, 수산업 관련 투자'
                    : '다양한 분야 투자 가능',
                  icon: '💎',
                },
                {
                  label: '돈 쓰는 패턴',
                  content: result.elementBalance.excess.includes('토')
                    ? '과소비 경향이 있습니다. 충동구매를 자제하고 예산을 정해두세요.'
                    : result.elementBalance.excess.includes('금')
                    ? '원칙적이고 계획적으로 씁니다. 다만 가끔은 자신에게 투자하세요.'
                    : '균형있게 지출합니다. 현재 패턴을 유지하세요.',
                  icon: '💸',
                },
              ],
            },
            {
              subtitle: '2025년 재물운 타이밍',
              items: [
                {
                  label: '수입 증가 기회',
                  content: '5월과 10월에 재물수가 강합니다. 계약, 투자, 사업 확장 타이밍으로 활용하세요.',
                  icon: '📈',
                },
                {
                  label: '지출 관리 필요',
                  content: '7월은 비겁운으로 경조사비, 친구 빌려주는 일 등이 생길 수 있습니다. 예비비를 챙기세요.',
                  icon: '⚠️',
                },
                {
                  label: '구체적 조언',
                  content: `${yongsinElem}색 지갑을 사용하고, ${yongsinElem === '목' ? '동쪽' : yongsinElem === '화' ? '남쪽' : yongsinElem === '토' ? '중앙' : yongsinElem === '금' ? '서쪽' : '북쪽'} 방향으로 책상을 배치하세요.`,
                  icon: '💡',
                },
              ],
            },
          ],
        };

      case '애정':
        // 용신에서 오행만 추출
        const yongsinLoveMatch = result.yongsin.match(/^(목|화|토|금|수)/);
        const yongsinLoveElem = yongsinLoveMatch ? yongsinLoveMatch[1] : '';

        return {
          title: '당신의 사랑 운명',
          sections: [
            {
              subtitle: '이성관 분석',
              items: [
                {
                  label: `${result.day.stem.ko}${result.day.stem.cn}의 연애 스타일`,
                  content: result.day.stem.yinyang === '+'
                    ? '적극적이고 리더십있게 관계를 이끌어가는 스타일입니다.'
                    : '섬세하고 배려심 많으며 상대방을 먼저 생각하는 스타일입니다.',
                  icon: '💖',
                },
                {
                  label: '연애 패턴',
                  content: getTenGodInterpretation(관성 + 재성, '관성'),
                  icon: '👥',
                },
                {
                  label: '이상형',
                  content: yongsinLoveElem
                    ? `용신 ${yongsinLoveElem} 기운을 가진 사람과 좋은 인연이 될 수 있습니다. ${
                      yongsinLoveElem === '목' ? '활발하고 성장지향적인' :
                      yongsinLoveElem === '화' ? '열정적이고 밝은' :
                      yongsinLoveElem === '토' ? '차분하고 신뢰감 있는' :
                      yongsinLoveElem === '금' ? '깔끔하고 원칙있는' :
                      '지적이고 유연한'
                    } 사람에게 끌립니다.`
                    : '상대방의 장점을 존중하고 서로 보완하는 관계가 좋습니다.',
                  icon: '✨',
                },
              ],
            },
            {
              subtitle: '배우자운',
              items: [
                {
                  label: '만날 시기',
                  content: 관성 >= 1 || 재성 >= 1
                    ? `${Math.floor(currentAge / 10) * 10 + 5}세, ${Math.floor(currentAge / 10) * 10 + 8}세 전후에 인연수가 강합니다`
                    : '30대 초중반에 인연이 올 가능성이 높습니다',
                  icon: '🎯',
                },
                {
                  label: '배우자 성향',
                  content: 관성 >= 2
                    ? '책임감 있고 안정적인 직장인 또는 전문직 종사자일 가능성이 높습니다'
                    : 재성 >= 2
                    ? '경제관념이 뚜렷하고 실리적인 성향의 배우자를 만납니다'
                    : '성실하고 온화한 성격의 배우자와 인연이 있습니다',
                  icon: '💑',
                },
              ],
            },
            {
              subtitle: '2025년 애정운',
              items: [
                {
                  label: '인연수 강한 시기',
                  content: '3월, 6월, 9월에 새로운 만남의 기회가 많습니다. 소개팅, 모임에 적극 참여하세요.',
                  icon: '💫',
                },
                {
                  label: '관계 진전 적기',
                  content: '5월과 11월은 고백, 프러포즈 하기 좋은 시기입니다.',
                  icon: '💍',
                },
                {
                  label: '주의 사항',
                  content: '7-8월은 오해나 갈등이 생길 수 있으니 소통을 더 신경쓰세요.',
                  icon: '⚠️',
                },
              ],
            },
          ],
        };

      case '직업':
        const jobsByElement: {[key: string]: string[]} = {
          '목': ['교육', '출판', '문화예술', '섬유', '목재', '환경'],
          '화': ['전기', 'IT', '요식업', '홍보', '방송', '에너지'],
          '토': ['건설', '부동산', '농업', '세라믹', '인테리어'],
          '금': ['금융', '의료', '법률', '기계', '귀금속', '자동차'],
          '수': ['물류', '관광', '수산', '컨설팅', '음료', '화학'],
        };

        const jobsByTenGod = [];
        if (비겁 >= 2) jobsByTenGod.push('영업, 스포츠, 경쟁 직종');
        if (식상 >= 2) jobsByTenGod.push('기획, 크리에이터, 교육');
        if (재성 >= 2) jobsByTenGod.push('금융, 무역, 부동산');
        if (관성 >= 2) jobsByTenGod.push('공무원, 법조, 대기업');
        if (인성 >= 2) jobsByTenGod.push('연구, 학술, 교육');

        // 용신에서 오행만 추출 (예: "목(재성...)" → "목")
        const extractElement = (yongsin: string): string => {
          const match = yongsin.match(/^(목|화|토|금|수)/);
          return match ? match[1] : '목'; // 기본값은 목
        };

        const yongsinElement = extractElement(result.yongsin);
        const recommendedJobs = jobsByElement[yongsinElement] || ['교육', '출판', '문화'];

        // 방향 계산
        const getDirection = (element: string): string => {
          const directions: {[key: string]: string} = {
            '목': '동쪽', '화': '남쪽', '토': '중앙', '금': '서쪽', '수': '북쪽'
          };
          return directions[element] || '동쪽';
        };

        return {
          title: '천직을 찾는 나침반',
          sections: [
            {
              subtitle: '타고난 재능',
              items: [
                {
                  label: `일간 ${result.day.stem.ko}${result.day.stem.cn}의 능력`,
                  content: result.dayPersonality.strength,
                  icon: '⭐',
                },
                {
                  label: '십성으로 본 인재형',
                  content: jobsByTenGod.length > 0
                    ? `${jobsByTenGod.join(' / ')} 분야에 강점이 있습니다`
                    : result.dayPersonality.suitable,
                  icon: '🎯',
                },
              ],
            },
            {
              subtitle: '적합 직업 (구체적)',
              items: [
                {
                  label: 'TOP 추천 직업',
                  content: `${recommendedJobs.slice(0, 3).join(', ')} 관련 분야가 가장 유리합니다`,
                  icon: '💼',
                },
                {
                  label: '추가 유망 직종',
                  content: result.dayPersonality.suitable,
                  icon: '📋',
                },
                {
                  label: '직장 vs 사업',
                  content: 관성 >= 2
                    ? '직장 생활에 유리합니다. 조직 내에서 승진하는 것이 좋습니다.'
                    : 식상 >= 2 || 재성 >= 2
                    ? '프리랜서나 창업도 좋습니다. 자신의 능력을 펼칠 수 있습니다.'
                    : '안정적인 직장으로 시작해 경험을 쌓은 후 독립을 고려하세요.',
                  icon: '🏢',
                },
              ],
            },
            {
              subtitle: '커리어 로드맵',
              items: [
                {
                  label: '~30세',
                  content: `다양한 경험을 쌓는 시기입니다. ${recommendedJobs[0]} 분야로 진입하세요.`,
                  icon: '🌱',
                },
                {
                  label: '30~40세',
                  content: '전문성을 구축하는 시기입니다. 자격증, 학위 취득을 고려하세요.',
                  icon: '📚',
                },
                {
                  label: '40~50세',
                  content: '리더 역할을 맡거나 독립/창업을 본격적으로 고려할 시기입니다.',
                  icon: '👔',
                },
                {
                  label: '50세 이후',
                  content: '후배 멘토링, 안정적 운영에 집중하세요.',
                  icon: '🏆',
                },
              ],
            },
            {
              subtitle: '2025년 직업운',
              items: [
                {
                  label: '이직 타이밍',
                  content: '3월과 9월이 이직 적기입니다. 준비를 미리 하세요.',
                  icon: '🔄',
                },
                {
                  label: '승진/사업 확장',
                  content: '5월과 10-11월에 좋은 기회가 옵니다. 적극적으로 도전하세요.',
                  icon: '📈',
                },
                {
                  label: '구체적 조언',
                  content: `${getDirection(yongsinElement)} 방향으로 책상을 배치하고, ${yongsinElement}색 계열 명함/네임택을 사용하세요.`,
                  icon: '💡',
                },
              ],
            },
          ],
        };
    }
  };

  const content = getContent(activeTab);
  const currentTab = tabs.find((t) => t.id === activeTab);

  return (
    <motion.div
      className="glass-strong rounded-3xl p-6 md:p-8"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Tab Buttons */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                isActive
                  ? `bg-gradient-to-r ${tab.color} text-white scale-105 shadow-lg`
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
              }`}
              whileHover={{ scale: isActive ? 1.05 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </motion.button>
          );
        })}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3
          className={`text-3xl font-bold mb-8 bg-gradient-to-r ${currentTab?.color} bg-clip-text text-transparent`}
          style={{ fontFamily: "'Noto Serif KR', serif" }}
        >
          {content.title}
        </h3>

        <div className="space-y-8">
          {content.sections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h4 className="text-xl font-bold text-amber-400 mb-4">
                {section.subtitle}
              </h4>
              <div className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    className="glass rounded-2xl p-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: itemIndex * 0.05 }}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">{item.icon}</span>
                      <div className="flex-1">
                        <h5 className="font-semibold text-slate-200 mb-2">{item.label}</h5>
                        <p className="text-slate-300 leading-relaxed">{item.content}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
