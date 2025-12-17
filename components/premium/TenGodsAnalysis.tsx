'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Users, Sparkles, TrendingUp, Shield, BookOpen } from 'lucide-react';

interface TenGodsAnalysisProps {
  result: SajuResult;
}

export default function TenGodsAnalysis({ result }: TenGodsAnalysisProps) {
  // 십성별 위치 분석
  const getTenGodLocations = (godName: string) => {
    const locations: string[] = [];
    const shortName = godName.slice(0, 2); // "비겁", "식상" 등

    if (result.tenGods.year.includes(shortName)) locations.push('년주');
    if (result.tenGods.month.includes(shortName)) locations.push('월주');
    if (result.tenGods.day.includes(shortName)) locations.push('일주');
    if (result.tenGods.hour.includes(shortName)) locations.push('시주');

    return locations;
  };

  // 십성별 상세 정보
  const tenGodsData = [
    {
      category: '비겁',
      fullName: '비견·겁재 (比肩·劫財)',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      emoji: '👥',
      count: result.tenGodsCount.비겁 || 0,
      locations: getTenGodLocations('비겁'),
      meaning: {
        symbol: '형제자매, 동료, 경쟁자',
        nature: '나와 같은 오행. 힘을 나누는 존재.',
        keyword: '협력과 경쟁, 자존심, 독립심',
      },
      interpretation: {
        none: {
          title: '비겁이 없는 사주',
          content: [
            '독립적이고 자기 주도적인 성향이 강합니다',
            '동업이나 파트너십보다는 혼자 일하는 것을 선호합니다',
            '남에게 의지하지 않고 스스로 해결하려는 경향이 있습니다',
            '친구나 동료보다는 멘토나 스승에게서 도움을 받습니다',
          ],
          advice: '때로는 협력과 위임도 필요합니다. 신뢰할 수 있는 파트너를 찾아보세요.',
        },
        moderate: {
          title: '비겁이 1-2개인 사주',
          content: [
            '적당한 협력과 경쟁 관계를 유지합니다',
            '친구나 동료와의 관계가 대체로 원만합니다',
            '필요할 때 도움을 주고받을 수 있는 인맥이 있습니다',
            '재물을 나누는 것도, 혼자 벌어가는 것도 가능합니다',
          ],
          advice: result.tenGodsCount.비겁 === 1
            ? '년주나 시주에 있다면 형제운이 좋고, 월주에 있다면 사회적 협력이 중요합니다.'
            : '비겁이 2개면 동업이나 팀워크가 유리할 수 있습니다.',
        },
        excessive: {
          title: '비겁이 3개 이상인 사주',
          content: [
            '경쟁 상황에 자주 놓이거나, 재물을 나눠야 하는 일이 많습니다',
            '형제자매나 친구 관계에서 갈등이나 금전 문제가 생길 수 있습니다',
            '자존심이 강하고 양보하기 어려울 수 있습니다',
            '재성(재물)이 약하면 돈을 벌어도 새는 경우가 많습니다',
          ],
          advice: '비겁이 많으면 식상(표현력)이나 재성(재물)을 강화해야 합니다. 혼자 하는 사업보다는 전문직이 유리합니다.',
        },
      },
    },
    {
      category: '식상',
      fullName: '식신·상관 (食神·傷官)',
      icon: Sparkles,
      color: 'from-purple-500 to-pink-500',
      emoji: '✨',
      count: result.tenGodsCount.식상 || 0,
      locations: getTenGodLocations('식상'),
      meaning: {
        symbol: '표현력, 재능, 자녀',
        nature: '내가 생(生)하는 오행. 나를 통해 나오는 창조물.',
        keyword: '끼, 말재주, 예술성, 자유로움',
      },
      interpretation: {
        none: {
          title: '식상이 없는 사주',
          content: [
            '표현력보다는 내실과 안정을 중시합니다',
            '창작이나 자유직업보다는 조직생활이 잘 맞습니다',
            '말이 적고 신중하며, 감정 표현이 절제되어 있습니다',
            '자녀운이 약하거나 늦을 수 있습니다',
          ],
          advice: '식상이 없으면 관성(직장)이나 인성(학습)을 통해 발전하세요. 말보다는 실력으로 인정받습니다.',
        },
        moderate: {
          title: '식상이 1-2개인 사주',
          content: [
            '적당한 표현력과 창의성을 가지고 있습니다',
            '말과 글, 예술적 감각이 있습니다',
            '재성을 생하므로 돈을 버는 수단이 됩니다',
            '자녀운이 있고, 자녀와의 관계도 원만합니다',
          ],
          advice: result.tenGodsCount.식상 === 1
            ? '식상이 1개면 적절한 표현력으로 인정받습니다. 월지에 있으면 직업으로 활용 가능합니다.'
            : '식상이 2개면 말과 행동이 적극적입니다. 창작, 강의, 상담 분야가 유리합니다.',
        },
        excessive: {
          title: '식상이 3개 이상인 사주',
          content: [
            '표현력이 넘치고 끼가 많지만, 말이 지나쳐 실수할 수 있습니다',
            '관성(직장, 상사)과 충돌하기 쉽습니다',
            '자유로운 성향이 강해 조직생활에 답답함을 느낍니다',
            '체력 소모가 크고, 산만해질 수 있습니다',
          ],
          advice: '식상이 과다하면 재성(실용)이나 인성(절제)으로 조절해야 합니다. 프리랜서, 예술가, 강사 등이 유리합니다.',
        },
      },
    },
    {
      category: '재성',
      fullName: '정재·편재 (正財·偏財)',
      icon: TrendingUp,
      color: 'from-amber-500 to-yellow-500',
      emoji: '💰',
      count: result.tenGodsCount.재성 || 0,
      locations: getTenGodLocations('재성'),
      meaning: {
        symbol: '재물, 아버지, 배우자(남자)',
        nature: '내가 극(剋)하는 오행. 내가 통제하고 얻는 것.',
        keyword: '돈, 현실, 물질, 실용성',
      },
      interpretation: {
        none: {
          title: '재성이 없는 사주',
          content: [
            '돈보다는 명예, 권력, 학식을 중시합니다',
            '재물에 집착하지 않아 담백한 삶을 삽니다',
            '아버지 덕이 약하거나, 아버지와 연이 얇을 수 있습니다',
            '(남자) 배우자운이 약하거나 늦을 수 있습니다',
          ],
          advice: '재성이 없으면 식상(수입원)이나 관성(직장)을 통해 재물을 얻으세요. 전문직이나 공직이 유리합니다.',
        },
        moderate: {
          title: '재성이 1-2개인 사주',
          content: [
            '적당한 재물운이 있습니다',
            '돈을 버는 감각이 있고, 현실적입니다',
            '저축하거나 재테크할 능력이 있습니다',
            '(남자) 배우자운이 좋고, 결혼 생활이 안정적입니다',
          ],
          advice: result.tenGodsCount.재성 === 1
            ? '재성이 1개면 월지에 있을 때 가장 좋습니다. 직업을 통한 수입이 안정적입니다.'
            : '재성이 2개면 주 수입과 부수입이 모두 가능합니다. 투자와 사업도 고려해보세요.',
        },
        excessive: {
          title: '재성이 3개 이상인 사주',
          content: [
            '재물 욕심이 크고, 돈에 대한 집착이 있을 수 있습니다',
            '신약(힘이 약함)이면 재물이 오히려 부담이 됩니다',
            '여러 가지 일을 벌이거나, 과소비 경향이 있습니다',
            '(남자) 여자 문제로 복잡해질 수 있습니다',
          ],
          advice: '재성이 과다하면 비겁(동료)이나 인성(명예)으로 균형을 맞춰야 합니다. 체력 관리가 중요합니다.',
        },
      },
    },
    {
      category: '관성',
      fullName: '정관·편관 (正官·偏官)',
      icon: Shield,
      color: 'from-red-500 to-rose-600',
      emoji: '🛡️',
      count: result.tenGodsCount.관성 || 0,
      locations: getTenGodLocations('관성'),
      meaning: {
        symbol: '직장, 명예, 배우자(여자)',
        nature: '나를 극(剋)하는 오행. 나를 통제하고 책임지게 하는 것.',
        keyword: '규율, 책임감, 사회성, 권위',
      },
      interpretation: {
        none: {
          title: '관성이 없는 사주',
          content: [
            '자유로운 영혼이며, 규율이나 제약을 싫어합니다',
            '직장생활보다는 자영업이나 프리랜서가 잘 맞습니다',
            '상사나 권위에 대한 반항심이 있을 수 있습니다',
            '(여자) 배우자운이 약하거나, 늦을 수 있습니다',
          ],
          advice: '관성이 없으면 식상(자유)이나 재성(실리)을 활용하세요. 자기 사업이나 창작 분야가 유리합니다.',
        },
        moderate: {
          title: '관성이 1-2개인 사주',
          content: [
            '책임감 있고 사회성이 좋습니다',
            '직장생활이나 조직에서 인정받습니다',
            '명예와 지위를 얻을 수 있는 운이 있습니다',
            '(여자) 배우자운이 좋고, 남편 덕을 볼 수 있습니다',
          ],
          advice: result.tenGodsCount.관성 === 1
            ? '관성이 1개면 월지에 있을 때 최고입니다. 공무원, 대기업, 전문직이 유리합니다.'
            : '관성이 2개면 승진운이 있습니다. 정관과 편관이 섞이면 이직이 잦을 수 있습니다.',
        },
        excessive: {
          title: '관성이 3개 이상인 사주',
          content: [
            '책임과 부담이 너무 많아 스트레스를 받습니다',
            '신약(힘이 약함)이면 직장이나 상사에게 눌려 힘듭니다',
            '규율에 얽매여 자유로운 활동이 어렵습니다',
            '(여자) 남자 문제로 복잡하거나, 배우자 선택이 어려울 수 있습니다',
          ],
          advice: '관성이 과다하면 식상(반항)이나 인성(완충)으로 풀어야 합니다. 전문성을 키워 권위를 인정받으세요.',
        },
      },
    },
    {
      category: '인성',
      fullName: '정인·편인 (正印·偏印)',
      icon: BookOpen,
      color: 'from-green-500 to-emerald-600',
      emoji: '📚',
      count: result.tenGodsCount.인성 || 0,
      locations: getTenGodLocations('인성'),
      meaning: {
        symbol: '학문, 어머니, 문서',
        nature: '나를 생(生)하는 오행. 나를 도와주고 키워주는 것.',
        keyword: '지혜, 학습, 보호, 종교',
      },
      interpretation: {
        none: {
          title: '인성이 없는 사주',
          content: [
            '학문보다는 실전과 경험을 중시합니다',
            '이론보다는 감각과 직관으로 일합니다',
            '어머니 덕이 약하거나, 어머니와 연이 얇을 수 있습니다',
            '자격증이나 학력보다는 실력으로 승부합니다',
          ],
          advice: '인성이 없으면 식상(창의력)이나 재성(실용성)을 키우세요. 현장 경험이 자산이 됩니다.',
        },
        moderate: {
          title: '인성이 1-2개인 사주',
          content: [
            '학습 능력이 좋고 지혜롭습니다',
            '문서, 자격증, 학력이 도움이 됩니다',
            '어머니 덕이 있고, 귀인의 도움을 받습니다',
            '종교나 철학, 예술에 관심이 있습니다',
          ],
          advice: result.tenGodsCount.인성 === 1
            ? '인성이 1개면 월지에 있을 때 최고입니다. 교수, 연구원, 전문가가 유리합니다.'
            : '인성이 2개면 학문이나 예술 분야에서 두각을 나타냅니다. 평생학습이 도움됩니다.',
        },
        excessive: {
          title: '인성이 3개 이상인 사주',
          content: [
            '생각이 너무 많아 실행력이 부족할 수 있습니다',
            '의존적이거나, 현실감각이 떨어질 수 있습니다',
            '어머니의 간섭이나 영향이 과도할 수 있습니다',
            '식상(표현)이 극을 받아 자녀운이나 재물운이 약해질 수 있습니다',
          ],
          advice: '인성이 과다하면 식상(표현)이나 재성(실용)으로 조절해야 합니다. 이론을 실전으로 연결하세요.',
        },
      },
    },
  ];

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
    >
      <h2
        className="text-3xl font-bold text-center mb-8 gradient-text"
        style={{ fontFamily: "'Noto Serif KR', serif" }}
      >
        🔍 십성 배치 완전 분석
      </h2>

      <p className="text-center text-slate-300 mb-12 leading-relaxed">
        십성(十星)은 일간(나)을 중심으로 다른 천간·지지가 어떤 역할을 하는지 나타냅니다.
        <br />
        각 십성의 개수와 위치로 성격, 재물, 직업, 인간관계를 심층 분석할 수 있습니다.
      </p>

      {/* 십성별 상세 분석 */}
      <div className="space-y-8">
        {tenGodsData.map((godData, index) => {
          const Icon = godData.icon;
          const count = godData.count;

          // 개수에 따른 해석 선택
          let interpretation;
          if (count === 0) {
            interpretation = godData.interpretation.none;
          } else if (count <= 2) {
            interpretation = godData.interpretation.moderate;
          } else {
            interpretation = godData.interpretation.excessive;
          }

          return (
            <motion.div
              key={godData.category}
              className="glass rounded-3xl p-6 md:p-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {/* 헤더 */}
              <div className="flex items-start gap-4 mb-6">
                <div
                  className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${godData.color} flex items-center justify-center shadow-lg`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-2xl font-bold text-slate-100">
                      {godData.emoji} {godData.fullName}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${godData.color} text-white`}
                    >
                      {count}개
                    </span>
                    {godData.locations.length > 0 && (
                      <span className="text-sm text-slate-400">
                        ({godData.locations.join(', ')})
                      </span>
                    )}
                  </div>
                  <div className="mt-3 space-y-1 text-sm text-slate-300">
                    <p>
                      <strong className="text-amber-400">상징:</strong>{' '}
                      {godData.meaning.symbol}
                    </p>
                    <p>
                      <strong className="text-amber-400">본질:</strong>{' '}
                      {godData.meaning.nature}
                    </p>
                    <p>
                      <strong className="text-amber-400">키워드:</strong>{' '}
                      {godData.meaning.keyword}
                    </p>
                  </div>
                </div>
              </div>

              {/* 해석 내용 */}
              <div className="bg-slate-800/30 rounded-2xl p-6">
                <h4 className="text-lg font-bold text-amber-400 mb-4">
                  {interpretation.title}
                </h4>
                <ul className="space-y-2 mb-4">
                  {interpretation.content.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-300">
                      <span className="text-amber-400 flex-shrink-0 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-4">
                  <p className="text-amber-300 text-sm leading-relaxed">
                    <strong className="text-amber-400">💡 조언:</strong>{' '}
                    {interpretation.advice}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 종합 포인트 */}
      <div className="mt-8 glass rounded-2xl p-6 border border-purple-400/30">
        <h4 className="text-lg font-bold text-purple-400 mb-4 flex items-center gap-2">
          <span>⚡</span>
          <span>십성 균형 체크</span>
        </h4>
        <div className="space-y-3 text-slate-300">
          <p className="flex items-start gap-2">
            <span className="text-purple-400 flex-shrink-0">•</span>
            <span>
              <strong>비겁 {result.tenGodsCount.비겁}개</strong> -{' '}
              {result.tenGodsCount.비겁 === 0
                ? '독립형'
                : result.tenGodsCount.비겁 <= 2
                ? '협력형'
                : '경쟁 과다형'}
            </span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-purple-400 flex-shrink-0">•</span>
            <span>
              <strong>식상 {result.tenGodsCount.식상}개</strong> -{' '}
              {result.tenGodsCount.식상 === 0
                ? '절제형'
                : result.tenGodsCount.식상 <= 2
                ? '표현 적절형'
                : '표현 과다형'}
            </span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-purple-400 flex-shrink-0">•</span>
            <span>
              <strong>재성 {result.tenGodsCount.재성}개</strong> -{' '}
              {result.tenGodsCount.재성 === 0
                ? '청빈형'
                : result.tenGodsCount.재성 <= 2
                ? '재물 안정형'
                : '재물욕 과다형'}
            </span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-purple-400 flex-shrink-0">•</span>
            <span>
              <strong>관성 {result.tenGodsCount.관성}개</strong> -{' '}
              {result.tenGodsCount.관성 === 0
                ? '자유형'
                : result.tenGodsCount.관성 <= 2
                ? '조직 적합형'
                : '책임 과다형'}
            </span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-purple-400 flex-shrink-0">•</span>
            <span>
              <strong>인성 {result.tenGodsCount.인성}개</strong> -{' '}
              {result.tenGodsCount.인성 === 0
                ? '실전형'
                : result.tenGodsCount.인성 <= 2
                ? '학습 적절형'
                : '이론 과다형'}
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
