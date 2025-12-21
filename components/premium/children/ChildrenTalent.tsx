'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Sparkles, Music, Palette, BookOpen, Trophy, Lightbulb } from 'lucide-react';

interface ChildrenTalentProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function ChildrenTalent({ result, name }: ChildrenTalentProps) {
  const dayElement = result.day.stem.element;
  const { 식상, 인성, 관성, 비겁, 재성 } = result.tenGodsCount;

  // 오행별 재능 특성
  const getTalentsByElement = () => {
    switch (dayElement) {
      case '목':
        return {
          mainTalent: '창의성 & 예술',
          icon: '🎨',
          talents: [
            { name: '미술/디자인', score: 85, icon: Palette },
            { name: '음악/무용', score: 80, icon: Music },
            { name: '문학/글쓰기', score: 75, icon: BookOpen },
            { name: '스포츠', score: 70, icon: Trophy },
          ],
          description: '창의력과 표현력이 뛰어나며, 예술 분야에서 재능을 발휘할 수 있습니다.',
        };
      case '화':
        return {
          mainTalent: '리더십 & 표현',
          icon: '🎭',
          talents: [
            { name: '연기/공연', score: 90, icon: Sparkles },
            { name: '프레젠테이션', score: 85, icon: Lightbulb },
            { name: '스포츠', score: 80, icon: Trophy },
            { name: '음악', score: 75, icon: Music },
          ],
          description: '열정적이고 표현력이 뛰어나며, 사람들 앞에서 빛을 발합니다.',
        };
      case '토':
        return {
          mainTalent: '안정성 & 실용',
          icon: '🏗️',
          talents: [
            { name: '건축/공간', score: 85, icon: Trophy },
            { name: '요리/제빵', score: 80, icon: Sparkles },
            { name: '수학/과학', score: 75, icon: BookOpen },
            { name: '원예/농업', score: 70, icon: Palette },
          ],
          description: '실용적이고 체계적이며, 손으로 만들고 가꾸는 일에 재능이 있습니다.',
        };
      case '금':
        return {
          mainTalent: '논리 & 분석',
          icon: '🔬',
          talents: [
            { name: '수학/논리', score: 90, icon: BookOpen },
            { name: '과학/실험', score: 85, icon: Lightbulb },
            { name: '음악(이론)', score: 80, icon: Music },
            { name: '체스/전략', score: 75, icon: Trophy },
          ],
          description: '논리적이고 분석적이며, 체계적인 사고를 요구하는 분야에 강점이 있습니다.',
        };
      case '수':
        return {
          mainTalent: '지혜 & 창조',
          icon: '💡',
          talents: [
            { name: '문학/철학', score: 90, icon: BookOpen },
            { name: '외국어', score: 85, icon: Lightbulb },
            { name: '예술', score: 80, icon: Palette },
            { name: '수영/수상스포츠', score: 75, icon: Trophy },
          ],
          description: '지혜롭고 통찰력이 뛰어나며, 깊이 있는 사고와 표현에 재능이 있습니다.',
        };
      default:
        return {
          mainTalent: '다재다능',
          icon: '⭐',
          talents: [],
          description: '균형 잡힌 재능',
        };
    }
  };

  const elementTalents = getTalentsByElement();

  // 십신별 추가 재능
  const getTenGodTalents = () => {
    const talents = [];

    if (식상 >= 2) {
      talents.push({
        name: '예술적 표현',
        description: '식상이 강해 예술, 창작, 표현 분야에서 뛰어난 재능을 보입니다.',
        fields: ['그림 그리기', '음악 연주', '글쓰기', '디자인'],
        icon: '🎨',
      });
    }

    if (인성 >= 2) {
      talents.push({
        name: '학습 능력',
        description: '인성이 강해 학습 능력이 뛰어나고 지식 습득이 빠릅니다.',
        fields: ['독서', '언어', '연구', '학문'],
        icon: '📚',
      });
    }

    if (관성 >= 2) {
      talents.push({
        name: '리더십',
        description: '관성이 강해 조직력과 리더십이 뛰어납니다.',
        fields: ['학급 임원', '팀 스포츠', '조직 활동', '봉사'],
        icon: '👑',
      });
    }

    if (재성 >= 2) {
      talents.push({
        name: '경제 감각',
        description: '재성이 강해 현실 감각과 경제 개념이 발달합니다.',
        fields: ['수학', '경영 마인드', '절약', '투자 감각'],
        icon: '💰',
      });
    }

    if (비겁 >= 2) {
      talents.push({
        name: '신체 능력',
        description: '비겁이 강해 체력과 운동 능력이 뛰어납니다.',
        fields: ['스포츠', '무술', '댄스', '체육'],
        icon: '⚡',
      });
    }

    return talents;
  };

  const tenGodTalents = getTenGodTalents();

  // 재능 발견 가이드
  const discoveryGuide = [
    {
      age: '3-6세',
      title: '탐색기',
      activities: ['다양한 놀이', '그림 그리기', '노래 부르기', '블록 놀이'],
      goal: '다양한 활동 경험',
    },
    {
      age: '7-10세',
      title: '발견기',
      activities: ['악기 배우기', '스포츠 체험', '과학 실험', '독서'],
      goal: '관심 분야 찾기',
    },
    {
      age: '11-14세',
      title: '개발기',
      activities: ['전문 레슨', '동아리 활동', '대회 참가', '프로젝트'],
      goal: '재능 집중 개발',
    },
    {
      age: '15-18세',
      title: '심화기',
      activities: ['전문 교육', '실전 경험', '포트폴리오', '진로 연계'],
      goal: '전문성 확립',
    },
  ];

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
        ✨ 자녀 재능 분석
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님 자녀의 타고난 재능과 개발 방향
      </p>

      {/* 주요 재능 영역 */}
      <div className="glass rounded-2xl p-8 mb-8 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/30">
        <div className="text-center mb-6">
          <span className="text-6xl mb-3 block">{elementTalents.icon}</span>
          <p className="text-2xl font-bold gradient-text mb-2">{elementTalents.mainTalent}</p>
          <p className="text-slate-300">{elementTalents.description}</p>
        </div>
      </div>

      {/* 재능 분야별 점수 */}
      {elementTalents.talents.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-cyan-400 mb-4">재능 적합도 분석</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {elementTalents.talents.map((talent, index) => (
              <motion.div
                key={index}
                className="glass rounded-xl p-5"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <talent.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-bold">{talent.name}</p>
                    <p className="text-2xl font-bold text-purple-400">{talent.score}점</p>
                  </div>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${talent.score}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* 십신별 추가 재능 */}
      {tenGodTalents.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-cyan-400 mb-4">사주로 본 특별 재능</h3>
          <div className="space-y-4">
            {tenGodTalents.map((talent, index) => (
              <motion.div
                key={index}
                className="glass rounded-xl p-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{talent.icon}</span>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-white mb-2">{talent.name}</h4>
                    <p className="text-slate-300 text-sm mb-3">{talent.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {talent.fields.map((field, i) => (
                        <span
                          key={i}
                          className="glass px-3 py-1 rounded-full text-xs font-bold text-cyan-400"
                        >
                          {field}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* 나이대별 재능 개발 가이드 */}
      <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
        <Sparkles className="w-6 h-6" />
        나이대별 재능 개발 로드맵
      </h3>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {discoveryGuide.map((stage, index) => (
          <motion.div
            key={index}
            className="glass rounded-xl p-5"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="mb-4">
              <p className="text-slate-400 text-sm">{stage.age}</p>
              <p className="text-xl font-bold text-white">{stage.title}</p>
              <p className="text-green-400 text-sm mt-1">🎯 {stage.goal}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-2">추천 활동</p>
              <div className="flex flex-wrap gap-2">
                {stage.activities.map((activity, i) => (
                  <span
                    key={i}
                    className="glass px-3 py-1 rounded-lg text-xs text-slate-300"
                  >
                    • {activity}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 재능 발굴 조언 */}
      <div className="glass rounded-2xl p-6 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/30">
        <p className="text-blue-300 font-bold mb-3">💡 재능 발굴 및 개발 조언</p>
        <ul className="text-slate-300 text-sm space-y-2 leading-relaxed">
          <li>• <strong>관찰</strong>: 아이가 무엇을 할 때 가장 즐거워하는지 관찰하세요</li>
          <li>• <strong>경험</strong>: 다양한 분야를 경험할 기회를 제공하세요</li>
          <li>• <strong>칭찬</strong>: 작은 성취도 크게 칭찬하여 자신감을 키워주세요</li>
          <li>• <strong>인내</strong>: 재능 발견에는 시간이 걸립니다. 조급해하지 마세요</li>
          <li>• <strong>즐거움</strong>: 결과보다 과정을 즐길 수 있도록 도와주세요</li>
          <li>• <strong>전문가</strong>: 재능이 발견되면 전문가의 도움을 받으세요</li>
        </ul>
      </div>
    </motion.div>
  );
}
