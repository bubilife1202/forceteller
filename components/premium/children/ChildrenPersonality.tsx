'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Smile, Star, Zap, Heart } from 'lucide-react';

interface ChildrenPersonalityProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function ChildrenPersonality({ result, name }: ChildrenPersonalityProps) {
  const dayElement = result.day.stem.element;
  const { 식상, 비겁, 재성, 관성, 인성 } = result.tenGodsCount;

  // 오행별 성격 특성
  const getPersonalityTraits = () => {
    switch (dayElement) {
      case '목':
        return {
          element: '목(木)',
          emoji: '🌳',
          mainTraits: ['활발함', '호기심', '창의적', '성장 지향'],
          strengths: [
            '무한한 호기심으로 새로운 것을 배우길 좋아합니다',
            '상상력이 풍부하고 창의적인 아이디어가 많습니다',
            '친구들과 잘 어울리며 사교적입니다',
            '긍정적이고 밝은 에너지를 가지고 있습니다',
          ],
          challenges: [
            '집중력이 짧아 한 가지에 몰두하기 어려울 수 있습니다',
            '성급한 성격으로 인내심이 부족할 수 있습니다',
            '변덕스러워 보일 수 있습니다',
          ],
          parentingTips: [
            '다양한 경험을 제공하되, 한 가지를 끝까지 완수하는 습관을 길러주세요',
            '창의력을 마음껏 발휘할 수 있는 환경을 만들어주세요',
            '야외 활동과 자연 체험을 많이 시켜주세요',
          ],
        };
      case '화':
        return {
          element: '화(火)',
          emoji: '🔥',
          mainTraits: ['열정적', '적극적', '사교적', '리더십'],
          strengths: [
            '열정이 넘치고 에너지가 강합니다',
            '자신감이 있고 주도적으로 행동합니다',
            '사람들과 잘 어울리고 인기가 많습니다',
            '표현력이 뛰어나고 감정이 풍부합니다',
          ],
          challenges: [
            '감정 기복이 클 수 있습니다',
            '충동적으로 행동할 수 있습니다',
            '과도한 경쟁심을 보일 수 있습니다',
          ],
          parentingTips: [
            '감정을 조절하는 방법을 가르쳐주세요',
            '에너지를 발산할 수 있는 활동을 제공하세요',
            '타인을 배려하는 마음을 길러주세요',
          ],
        };
      case '토':
        return {
          element: '토(土)',
          emoji: '🏔️',
          mainTraits: ['안정적', '신중함', '책임감', '포용력'],
          strengths: [
            '믿음직하고 책임감이 강합니다',
            '신중하게 생각하고 행동합니다',
            '친구들을 잘 돌보고 포용력이 있습니다',
            '인내심이 강하고 끈기가 있습니다',
          ],
          challenges: [
            '변화에 적응하는 데 시간이 걸릴 수 있습니다',
            '소극적으로 보일 수 있습니다',
            '고집이 센 면이 있을 수 있습니다',
          ],
          parentingTips: [
            '충분한 시간을 주며 강요하지 마세요',
            '안정적인 환경을 제공하되 새로운 경험도 격려하세요',
            '자신감을 키워줄 수 있는 성공 경험을 만들어주세요',
          ],
        };
      case '금':
        return {
          element: '금(金)',
          emoji: '💎',
          mainTraits: ['원칙적', '분석적', '꼼꼼함', '완벽주의'],
          strengths: [
            '논리적이고 분석적으로 사고합니다',
            '계획적이고 체계적입니다',
            '규칙을 잘 지키고 책임감이 강합니다',
            '집중력이 뛰어나고 끈기가 있습니다',
          ],
          challenges: [
            '완벽주의로 인한 스트레스를 받을 수 있습니다',
            '융통성이 부족할 수 있습니다',
            '감정 표현이 서툴 수 있습니다',
          ],
          parentingTips: [
            '실패도 배움의 과정임을 알려주세요',
            '감정을 표현하는 방법을 가르쳐주세요',
            '때로는 규칙에서 벗어나도 괜찮음을 보여주세요',
          ],
        };
      case '수':
        return {
          element: '수(水)',
          emoji: '💧',
          mainTraits: ['지혜로움', '유연함', '관찰력', '사려깊음'],
          strengths: [
            '지혜롭고 통찰력이 있습니다',
            '상황에 유연하게 대처합니다',
            '관찰력이 뛰어나고 눈치가 빠릅니다',
            '깊이 있게 생각하고 공감 능력이 높습니다',
          ],
          challenges: [
            '우유부단할 수 있습니다',
            '지나치게 신중하여 기회를 놓칠 수 있습니다',
            '감정을 숨기고 혼자 고민할 수 있습니다',
          ],
          parentingTips: [
            '결단력을 키워줄 수 있는 기회를 주세요',
            '감정을 솔직하게 표현하도록 격려하세요',
            '자신감을 북돋아주세요',
          ],
        };
      default:
        return {
          element: '균형',
          emoji: '⚖️',
          mainTraits: ['균형', '조화', '다재다능'],
          strengths: ['다양한 재능', '적응력'],
          challenges: ['방향성 찾기'],
          parentingTips: ['다양한 경험 제공'],
        };
    }
  };

  const personality = getPersonalityTraits();

  // 십신 분석을 통한 추가 성격
  const getTenGodPersonality = () => {
    const traits = [];

    if (비겁 >= 2) traits.push({ name: '자기 주장이 강함', icon: '💪' });
    if (식상 >= 2) traits.push({ name: '표현력이 뛰어남', icon: '🎨' });
    if (재성 >= 2) traits.push({ name: '현실적이고 실용적', icon: '💰' });
    if (관성 >= 2) traits.push({ name: '규율을 잘 따름', icon: '📏' });
    if (인성 >= 2) traits.push({ name: '학습 능력이 뛰어남', icon: '📚' });

    return traits;
  };

  const additionalTraits = getTenGodPersonality();

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
        🎭 자녀 성격 예측
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님 자녀의 성격 특성 및 양육 가이드
      </p>

      {/* 기본 성격 */}
      <div className="glass rounded-2xl p-8 mb-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30">
        <div className="text-center mb-6">
          <span className="text-6xl mb-3 block">{personality.emoji}</span>
          <p className="text-2xl font-bold gradient-text mb-2">{personality.element} 성격</p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {personality.mainTraits.map((trait, index) => (
              <span
                key={index}
                className="glass px-4 py-2 rounded-full text-sm font-bold text-cyan-400"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 강점 */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
          <Star className="w-6 h-6" />
          성격 강점
        </h3>
        <div className="space-y-3">
          {personality.strengths.map((strength, index) => (
            <motion.div
              key={index}
              className="glass rounded-xl p-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <p className="text-slate-300 text-sm">✨ {strength}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 도전 과제 */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-orange-400 mb-4 flex items-center gap-2">
          <Zap className="w-6 h-6" />
          도전 과제 및 성장 포인트
        </h3>
        <div className="space-y-3">
          {personality.challenges.map((challenge, index) => (
            <motion.div
              key={index}
              className="glass rounded-xl p-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <p className="text-slate-300 text-sm">⚠️ {challenge}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 양육 팁 */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
          <Heart className="w-6 h-6" />
          맞춤형 양육 조언
        </h3>
        <div className="space-y-3">
          {personality.parentingTips.map((tip, index) => (
            <motion.div
              key={index}
              className="glass rounded-xl p-4 bg-blue-500/5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <p className="text-slate-300 text-sm">💡 {tip}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 추가 성격 특성 */}
      {additionalTraits.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-purple-400 mb-4">추가 성격 특성</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {additionalTraits.map((trait, index) => (
              <motion.div
                key={index}
                className="glass rounded-xl p-5"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{trait.icon}</span>
                  <p className="text-slate-300 font-bold">{trait.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* 종합 조언 */}
      <div className="glass rounded-2xl p-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30">
        <p className="text-indigo-300 font-bold mb-3">🌟 종합 양육 지침</p>
        <p className="text-slate-300 text-sm leading-relaxed">
          모든 아이는 고유한 성격과 재능을 가지고 태어납니다.
          사주는 아이의 기본 성향을 파악하는 도구일 뿐, 양육 환경과 부모의 사랑이 더 큰 영향을 미칩니다.
          아이의 강점은 적극적으로 칭찬하고 키워주며, 약점은 사랑으로 보완해주세요.
          가장 중요한 것은 아이를 있는 그대로 받아들이고 존중하는 것입니다.
        </p>
      </div>
    </motion.div>
  );
}
