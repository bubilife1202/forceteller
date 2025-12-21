'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Users, MessageCircle, UserPlus, Award, Sparkles } from 'lucide-react';

interface CharmSocialProps {
  result: SajuResult;
  name: string;
  gender: 'male' | 'female';
}

export default function CharmSocial({ result, name, gender }: CharmSocialProps) {
  const dayElement = result.day.stem.element;
  const { 식상, 재성, 관성, 인성, 비겁 } = result.tenGodsCount;

  // 커뮤니케이션 스타일
  const getCommunicationStyle = () => {
    const styles: { [key: string]: {
      type: string;
      characteristics: string[];
      strengths: string;
      tips: string;
    } } = {
      목: {
        type: '따뜻한 공감형',
        characteristics: [
          '상대방의 이야기를 경청하고 공감',
          '긍정적이고 격려하는 말을 자주 함',
          '부드럽고 친근한 어조',
          '상대방의 성장을 진심으로 응원',
        ],
        strengths: '사람들이 당신과 대화하면 위로받고 힘을 얻습니다. 판단하지 않고 받아들이는 태도가 신뢰를 형성합니다.',
        tips: '때로는 자신의 의견도 명확히 표현하는 것이 좋습니다. 너무 상대방에게만 맞추다 보면 본인의 색깔이 흐려질 수 있어요.',
      },
      화: {
        type: '열정적 표현형',
        characteristics: [
          '감정을 솔직하게 표현',
          '제스처와 표정이 풍부함',
          '재미있고 에너지 넘치는 대화',
          '직설적이고 명확한 의사 전달',
        ],
        strengths: '당신의 열정이 대화에 생기를 불어넣습니다. 진심이 전해져서 사람들이 마음을 열게 됩니다.',
        tips: '때로는 상대방이 말할 시간을 충분히 주세요. 듣는 것도 소통의 중요한 부분입니다.',
      },
      토: {
        type: '안정적 중재형',
        characteristics: [
          '차분하고 침착한 대화',
          '균형 잡힌 시각 제시',
          '갈등을 조정하고 화합 유도',
          '신중하고 깊이 있는 조언',
        ],
        strengths: '당신은 갈등 상황에서 중재자 역할을 훌륭히 해냅니다. 모두의 입장을 이해하고 조율하는 능력이 뛰어납니다.',
        tips: '자신의 생각을 좀 더 적극적으로 피력해도 좋습니다. 중립적인 것도 좋지만, 때로는 확실한 입장이 필요할 때가 있습니다.',
      },
      금: {
        type: '명확한 논리형',
        characteristics: [
          '체계적이고 논리적인 설명',
          '명확하고 간결한 표현',
          '원칙과 기준을 중시',
          '전문적이고 품격 있는 어조',
        ],
        strengths: '당신의 말에는 신뢰성과 전문성이 묻어납니다. 복잡한 내용도 명확하게 전달하는 능력이 있습니다.',
        tips: '논리만큼 감정적 교감도 중요합니다. 때로는 부드러운 표현이 관계를 더 깊게 만들어요.',
      },
      수: {
        type: '깊이 있는 통찰형',
        characteristics: [
          '깊이 있고 철학적인 대화',
          '본질을 꿰뚫는 질문',
          '은유와 비유를 활용한 표현',
          '경청하고 관찰하는 태도',
        ],
        strengths: '당신과의 대화는 생각할 거리를 줍니다. 남들이 보지 못하는 관점을 제시하고, 깊이 있는 통찰을 나눕니다.',
        tips: '때로는 가볍고 편안한 대화도 즐겨보세요. 모든 대화가 깊을 필요는 없답니다.',
      },
    };
    return styles[dayElement] || styles.목;
  };

  // 끌리는 사람 유형
  const getAttractedTypes = () => {
    const types = [];

    if (식상 >= 2) {
      types.push({
        type: '창의적이고 자유로운 영혼',
        reason: '당신의 표현력과 창의성에 공감하고, 함께 새로운 것을 만들어갈 수 있는 사람',
        chemistry: '서로의 아이디어를 발전시키며 시너지를 만듭니다',
      });
    }

    if (재성 >= 1 || dayElement === '금') {
      types.push({
        type: '현실적이고 안정적인 사람',
        reason: '실용적 가치를 이해하고, 목표를 함께 달성해 나갈 수 있는 파트너',
        chemistry: '서로 보완하며 균형잡힌 관계를 만듭니다',
      });
    }

    if (인성 >= 2 || dayElement === '수') {
      types.push({
        type: '지적이고 사려 깊은 사람',
        reason: '깊이 있는 대화를 나누고, 서로에게서 배울 수 있는 관계',
        chemistry: '정신적 교감이 깊고 서로를 성장시킵니다',
      });
    }

    if (관성 >= 1 || dayElement === '토') {
      types.push({
        type: '책임감 있고 신뢰할 수 있는 사람',
        reason: '서로를 존중하고, 약속을 지키는 성실한 관계',
        chemistry: '안정적이고 장기적인 관계를 만들어갑니다',
      });
    }

    if (비겁 >= 2 || dayElement === '화') {
      types.push({
        type: '열정적이고 활동적인 사람',
        reason: '함께 도전하고 경쟁하며 성장할 수 있는 동료',
        chemistry: '서로를 자극하며 더 높이 도약합니다',
      });
    }

    return types.slice(0, 3);
  };

  // 인간관계 강점
  const getRelationshipStrengths = () => {
    const strengths = [];

    if (식상 >= 2) {
      strengths.push('자신의 감정과 생각을 잘 표현하여 오해가 적음');
    }
    if (인성 >= 2) {
      strengths.push('상대방을 이해하고 공감하는 능력이 뛰어남');
    }
    if (재성 >= 1) {
      strengths.push('실질적인 도움을 주고 현실적인 조언을 제공');
    }
    if (관성 >= 1) {
      strengths.push('책임감 있고 신뢰할 수 있는 관계 유지');
    }
    if (비겁 >= 1) {
      strengths.push('독립적이면서도 필요할 때 함께하는 균형감');
    }

    // 오행별 기본 강점
    const elementStrengths: { [key: string]: string } = {
      목: '성장과 발전을 함께 추구하는 긍정적 영향력',
      화: '열정과 진심으로 관계에 생기를 불어넣음',
      토: '안정감을 주고 갈등을 조율하는 중재 능력',
      금: '명확한 경계와 원칙으로 건강한 관계 유지',
      수: '깊이 있는 대화로 정신적 유대감 형성',
    };
    strengths.push(elementStrengths[dayElement]);

    return strengths.slice(0, 5);
  };

  const communication = getCommunicationStyle();
  const attractedTypes = getAttractedTypes();
  const relationshipStrengths = getRelationshipStrengths();

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-10"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-8">
        <h2
          className="text-3xl md:text-4xl font-bold gradient-text mb-3"
          style={{ fontFamily: "'Noto Serif KR', serif" }}
        >
          사교적 매력
        </h2>
        <p className="text-slate-300">
          사람들과 관계 맺을 때 빛나는 {name}님의 매력
        </p>
      </div>

      {/* Communication Style */}
      <motion.div
        className="glass rounded-2xl p-6 mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20">
            <MessageCircle className="w-6 h-6 text-green-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-green-400 mb-2">커뮤니케이션 스타일</h3>
            <h4 className="text-lg font-semibold text-white mb-4">{communication.type}</h4>

            <div className="space-y-3 mb-4">
              {communication.characteristics.map((char, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-300">
                  <span className="text-green-400">✓</span>
                  <span className="text-sm">{char}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 mb-3">
              <p className="text-slate-200 text-sm leading-relaxed">
                <span className="font-semibold text-green-400">강점:</span> {communication.strengths}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-800/50">
              <p className="text-slate-300 text-sm leading-relaxed">
                <span className="font-semibold text-amber-400">💡 발전 팁:</span> {communication.tips}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Attracted Types */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
          <UserPlus className="w-6 h-6" />
          끌리는 사람 유형
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {attractedTypes.map((type, idx) => (
            <motion.div
              key={idx}
              className="glass rounded-xl p-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
            >
              <div className="text-center mb-3">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
                <h4 className="font-bold text-white mb-2">{type.type}</h4>
              </div>
              <p className="text-slate-300 text-sm mb-3 leading-relaxed">
                {type.reason}
              </p>
              <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <p className="text-purple-300 text-xs">
                  💫 {type.chemistry}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Relationship Strengths */}
      <motion.div
        className="glass rounded-2xl p-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20">
            <Award className="w-6 h-6 text-blue-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-blue-400 mb-4">인간관계 강점</h3>
            <div className="space-y-3">
              {relationshipStrengths.map((strength, idx) => (
                <motion.div
                  key={idx}
                  className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + idx * 0.05 }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-blue-400 font-bold">{idx + 1}</span>
                    <p className="text-slate-200 text-sm leading-relaxed flex-1">
                      {strength}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Social Charm Tips */}
      <motion.div
        className="mt-6 p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <h4 className="font-bold text-green-400 mb-3 text-lg flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          사교 매력 극대화 방법
        </h4>
        <div className="space-y-2 text-slate-200 text-sm leading-relaxed">
          <p>• 당신만의 커뮤니케이션 스타일을 믿고 자연스럽게 표현하세요</p>
          <p>• 상대방의 강점을 발견하고 진심으로 인정해주세요</p>
          <p>• 자신의 경계를 존중하면서도 열린 마음으로 사람들을 대하세요</p>
          <p>• 관계의 질이 양보다 중요합니다. 진심 어린 소수의 관계에 집중하세요</p>
          <p>• 갈등이 생겼을 때는 피하지 말고 건설적으로 해결하려 노력하세요</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
