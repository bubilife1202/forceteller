'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { SajuResult } from '@/lib/saju-calculator';
import { TrendingUp, Heart, Briefcase, Sparkles } from 'lucide-react';

interface DetailTabsProps {
  result: SajuResult;
}

type TabType = '총운' | '재물' | '애정' | '직업';

export default function DetailTabs({ result }: DetailTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('총운');

  const tabs = [
    { id: '총운' as const, label: '총운', icon: Sparkles, color: 'from-purple-500 to-purple-600' },
    { id: '재물' as const, label: '재물운', icon: TrendingUp, color: 'from-amber-500 to-amber-600' },
    { id: '애정' as const, label: '애정운', icon: Heart, color: 'from-pink-500 to-rose-600' },
    { id: '직업' as const, label: '직업운', icon: Briefcase, color: 'from-blue-500 to-indigo-600' },
  ];

  const getContent = (tab: TabType) => {
    const commonData = {
      personality: result.dayPersonality.personality,
      strength: result.dayPersonality.strength,
      weakness: result.dayPersonality.weakness,
      suitable: result.dayPersonality.suitable,
      yongsin: result.yongsin,
    };

    switch (tab) {
      case '총운':
        return {
          title: '2025년 전체 운세',
          items: [
            {
              label: '기본 성향',
              content: commonData.personality,
              icon: '🌟',
            },
            {
              label: '강점',
              content: commonData.strength,
              icon: '💪',
            },
            {
              label: '주의사항',
              content: commonData.weakness,
              icon: '⚠️',
            },
            {
              label: '용신 (필요한 기운)',
              content: `${commonData.yongsin} 기운을 보충하면 운이 좋아집니다`,
              icon: '✨',
            },
          ],
        };

      case '재물':
        return {
          title: '재물운 분석',
          items: [
            {
              label: '재성 분석',
              content: `재성이 ${result.tenGodsCount.재성}개 있습니다. ${
                result.tenGodsCount.재성 >= 2
                  ? '재물을 모을 기회가 많습니다.'
                  : '꾸준한 저축과 재테크가 필요합니다.'
              }`,
              icon: '💰',
            },
            {
              label: '재물 관리법',
              content:
                result.strength === 'strong'
                  ? '신강 사주로 재물을 감당할 힘이 있습니다. 적극적인 투자도 고려해보세요.'
                  : '신약 사주로 무리한 투자보다는 안정적인 재테크를 추천합니다.',
              icon: '📊',
            },
            {
              label: '수입원',
              content: commonData.suitable,
              icon: '💼',
            },
            {
              label: '주의 포인트',
              content:
                result.elementBalance.excess.includes('토')
                  ? '과소비 경향이 있을 수 있으니 계획적인 지출이 필요합니다.'
                  : '꾸준한 수입을 위해 안정적인 직장이나 사업이 좋습니다.',
              icon: '⚡',
            },
          ],
        };

      case '애정':
        return {
          title: '애정운 분석',
          items: [
            {
              label: '이성관',
              content:
                result.day.stem.yinyang === '+'
                  ? '적극적이고 리드하는 스타일입니다.'
                  : '섬세하고 배려심 많은 스타일입니다.',
              icon: '💖',
            },
            {
              label: '관계 패턴',
              content:
                result.tenGodsCount.관성 >= 2
                  ? '인연이 많은 편이지만, 신중한 선택이 필요합니다.'
                  : '깊이 있는 관계를 선호하는 스타일입니다.',
              icon: '👥',
            },
            {
              label: '궁합 포인트',
              content: `${result.yongsin} 기운을 가진 사람과 좋은 인연이 될 수 있습니다.`,
              icon: '🔮',
            },
            {
              label: '조언',
              content: commonData.strength.split(',')[0] + ' 능력을 발휘하면 좋은 인연을 만날 수 있습니다.',
              icon: '💡',
            },
          ],
        };

      case '직업':
        return {
          title: '직업운 분석',
          items: [
            {
              label: '적합한 직업',
              content: commonData.suitable,
              icon: '💼',
            },
            {
              label: '커리어 스타일',
              content: commonData.strength,
              icon: '🎯',
            },
            {
              label: '성공 전략',
              content: commonData.strength,
              icon: '🚀',
            },
            {
              label: '발전 방향',
              content: `${result.yongsin} 관련 분야로 진출하거나, 해당 기운을 보충하면 커리어 발전에 도움이 됩니다.`,
              icon: '📈',
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
          className={`text-2xl font-bold mb-6 bg-gradient-to-r ${currentTab?.color} bg-clip-text text-transparent`}
          style={{ fontFamily: "'Noto Serif KR', serif" }}
        >
          {content.title}
        </h3>

        <div className="space-y-4">
          {content.items.map((item, index) => (
            <motion.div
              key={index}
              className="glass rounded-2xl p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h4 className="font-semibold text-amber-400 mb-2">{item.label}</h4>
                  <p className="text-slate-300 leading-relaxed">{item.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
