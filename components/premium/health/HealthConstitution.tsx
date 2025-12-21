'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Leaf, Flame, Mountain, Coins, Droplets } from 'lucide-react';

interface HealthConstitutionProps {
  result: SajuResult;
  name: string;
}

export default function HealthConstitution({ result, name }: HealthConstitutionProps) {
  const dayElement = result.day.stem.element;

  // 오행별 아이콘
  const getElementIcon = (element: string) => {
    switch (element) {
      case '목': return <Leaf className="w-6 h-6" />;
      case '화': return <Flame className="w-6 h-6" />;
      case '토': return <Mountain className="w-6 h-6" />;
      case '금': return <Coins className="w-6 h-6" />;
      case '수': return <Droplets className="w-6 h-6" />;
      default: return null;
    }
  };

  // 오행별 색상
  const getElementColor = (element: string) => {
    switch (element) {
      case '목': return 'from-green-500 to-emerald-600';
      case '화': return 'from-red-500 to-rose-600';
      case '토': return 'from-yellow-500 to-amber-600';
      case '금': return 'from-slate-400 to-gray-500';
      case '수': return 'from-blue-500 to-cyan-600';
      default: return 'from-gray-500 to-slate-600';
    }
  };

  // 체질별 상세 설명
  const getConstitutionDetails = () => {
    switch (dayElement) {
      case '목':
        return {
          type: '목(木) 체질',
          emoji: '🌳',
          nature: '성장과 확장',
          characteristics: [
            '활동적이고 진취적인 성격',
            '감정 변화가 크고 예민함',
            '창의력과 추진력이 강함',
            '스트레스에 민감하게 반응',
          ],
          strengths: [
            '빠른 회복력과 재생 능력',
            '유연하고 적응력이 좋음',
            '신진대사가 활발함',
            '성장 발달이 양호함',
          ],
          weaknesses: [
            '간 기능 약화 가능성',
            '신경계 질환 주의',
            '스트레스성 질환',
            '근육과 인대 손상 주의',
          ],
          advice: '규칙적인 생활로 기운을 안정시키고, 과로와 스트레스를 피하세요. 간 건강에 특히 신경 쓰고, 충분한 수면과 휴식이 중요합니다.',
        };
      case '화':
        return {
          type: '화(火) 체질',
          emoji: '🔥',
          nature: '열정과 활동',
          characteristics: [
            '외향적이고 사교적인 성격',
            '열정적이고 추진력 강함',
            '감정 표현이 풍부함',
            '급하고 성급한 면이 있음',
          ],
          strengths: [
            '순환이 활발하고 혈색이 좋음',
            '면역력이 강한 편',
            '활동적이고 에너지가 넘침',
            '추위에 강함',
          ],
          weaknesses: [
            '심장 및 순환기 질환 주의',
            '고혈압, 심계항진',
            '불면증과 열성 질환',
            '피부 염증과 두드러기',
          ],
          advice: '과열되지 않도록 주의하고, 충분한 수분 섭취가 필요합니다. 심장 건강 관리가 중요하며, 흥분과 스트레스를 조절하세요.',
        };
      case '토':
        return {
          type: '토(土) 체질',
          emoji: '⛰️',
          nature: '안정과 중용',
          characteristics: [
            '온화하고 신중한 성격',
            '믿음직하고 책임감 강함',
            '변화보다 안정을 추구',
            '걱정이 많고 고민이 깊음',
          ],
          strengths: [
            '소화 흡수 능력이 좋음',
            '체력과 지구력이 우수함',
            '안정적인 건강 상태 유지',
            '회복력이 느리지만 꾸준함',
          ],
          weaknesses: [
            '비장과 위장 질환 주의',
            '소화불량, 위염, 위궤양',
            '대사증후군 위험',
            '근심과 걱정으로 인한 질환',
          ],
          advice: '규칙적인 식사와 소화 관리가 핵심입니다. 과식을 피하고, 걱정과 스트레스를 줄이세요. 적당한 운동으로 대사를 활성화하세요.',
        };
      case '금':
        return {
          type: '금(金) 체질',
          emoji: '⚪',
          nature: '정밀과 절제',
          characteristics: [
            '원칙적이고 깔끔한 성격',
            '결단력 있고 추진력 강함',
            '냉철하고 이성적임',
            '완벽주의 성향',
          ],
          strengths: [
            '호흡 기능이 우수함',
            '피부가 밝고 깨끗함',
            '면역 체계가 정밀함',
            '정리 정돈된 생활습관',
          ],
          weaknesses: [
            '폐와 호흡기 질환 주의',
            '천식, 알레르기',
            '피부 건조와 아토피',
            '대장 질환 주의',
          ],
          advice: '호흡기 건강과 피부 보습에 신경 쓰세요. 건조한 환경을 피하고, 실내 습도를 유지하세요. 감정을 적절히 표출하는 것이 중요합니다.',
        };
      case '수':
        return {
          type: '수(水) 체질',
          emoji: '💧',
          nature: '지혜와 유연',
          characteristics: [
            '침착하고 사려 깊은 성격',
            '지혜롭고 통찰력이 있음',
            '유연하고 적응력이 좋음',
            '내향적이고 조용한 편',
          ],
          strengths: [
            '수분 대사가 원활함',
            '신장 기능이 우수함',
            '집중력과 기억력이 좋음',
            '추위에 대한 적응력',
          ],
          weaknesses: [
            '신장과 방광 질환 주의',
            '요로 감염, 부종',
            '생식기 질환',
            '추위와 냉증에 약함',
          ],
          advice: '따뜻하게 지내고 체온 유지에 신경 쓰세요. 과도한 염분 섭취를 피하고, 신장 건강 관리가 중요합니다. 두려움과 불안을 조절하세요.',
        };
      default:
        return {
          type: '균형 체질',
          emoji: '⚖️',
          nature: '조화와 균형',
          characteristics: ['다양한 특성의 균형'],
          strengths: ['전반적으로 균형 잡힌 체질'],
          weaknesses: ['특별한 약점 없음'],
          advice: '균형 있는 생활습관을 유지하세요.',
        };
    }
  };

  const constitution = getConstitutionDetails();

  // 오행 분포 분석
  const elementDistribution = Object.entries(result.elements).sort((a, b) => b[1] - a[1]);

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2
        className="text-3xl font-bold text-center mb-8 gradient-text"
        style={{ fontFamily: "'Noto Serif KR', serif" }}
      >
        🧬 오행 체질 분석
      </h2>

      {/* 주 체질 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getElementColor(dayElement)} flex items-center justify-center text-4xl`}>
            {constitution.emoji}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">{name}님의 체질</h3>
            <p className="text-slate-300 text-lg">{constitution.type}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass rounded-xl p-5">
            <h4 className="font-bold text-green-400 mb-3 flex items-center gap-2">
              ✨ 기본 성질
            </h4>
            <p className="text-slate-300 text-lg mb-4">{constitution.nature}</p>
            <div className="space-y-2">
              {constitution.characteristics.map((char, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="text-green-400 mt-1">•</span>
                  <span className="text-slate-300 text-sm">{char}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="glass rounded-xl p-5">
            <h4 className="font-bold text-blue-400 mb-3 flex items-center gap-2">
              💪 체질 강점
            </h4>
            <div className="space-y-2">
              {constitution.strengths.map((strength, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="text-blue-400 mt-1">✓</span>
                  <span className="text-slate-300 text-sm">{strength}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="glass rounded-xl p-5">
            <h4 className="font-bold text-orange-400 mb-3 flex items-center gap-2">
              ⚠️ 취약 부분
            </h4>
            <div className="space-y-2">
              {constitution.weaknesses.map((weakness, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="text-orange-400 mt-1">!</span>
                  <span className="text-slate-300 text-sm">{weakness}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="glass rounded-xl p-5 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/30">
            <h4 className="font-bold text-purple-400 mb-3 flex items-center gap-2">
              💡 건강 조언
            </h4>
            <p className="text-slate-200 text-sm leading-relaxed">{constitution.advice}</p>
          </div>
        </div>
      </div>

      {/* 오행 분포 */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold text-cyan-400 mb-6">
          오행 에너지 분포
        </h3>
        <div className="space-y-4">
          {elementDistribution.map(([element, value], index) => (
            <motion.div
              key={element}
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getElementColor(element)} flex items-center justify-center text-white`}>
                    {getElementIcon(element)}
                  </div>
                  <span className="text-slate-200 font-medium">{element}</span>
                </div>
                <span className="text-slate-400">{value}%</span>
              </div>
              <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${getElementColor(element)}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 bg-slate-800/50 rounded-xl p-4">
          <p className="text-slate-300 text-sm leading-relaxed">
            <strong className="text-cyan-400">💡 Tip:</strong> 가장 높은 오행이 당신의 주된 체질 특성을 나타냅니다.
            균형 있는 오행 분포는 건강한 체질을 의미하며, 한쪽으로 치우친 경우 보완이 필요합니다.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
