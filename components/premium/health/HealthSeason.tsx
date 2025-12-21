'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Sun, Cloud, Leaf, Snowflake } from 'lucide-react';

interface HealthSeasonProps {
  result: SajuResult;
  name: string;
}

export default function HealthSeason({ result, name }: HealthSeasonProps) {
  const dayElement = result.day.stem.element;

  // 계절별 건강 관리
  const getSeasonalCare = () => {
    const care: Record<
      string,
      {
        spring: { status: string; care: string[]; alert: string };
        summer: { status: string; care: string[]; alert: string };
        fall: { status: string; care: string[]; alert: string };
        winter: { status: string; care: string[]; alert: string };
      }
    > = {
      목: {
        spring: {
          status: '왕성기 - 에너지 최고조',
          care: [
            '간 기능이 가장 활발한 시기',
            '새로운 운동이나 다이어트 시작하기 좋음',
            '봄나물과 신선한 채소 섭취',
            '규칙적인 생활로 기운 조절',
          ],
          alert: '과로와 스트레스 주의. 알레르기성 질환 조심',
        },
        summer: {
          status: '소모기 - 에너지 분산',
          care: [
            '화(火)가 목(木)을 소모시킴',
            '충분한 수분과 휴식',
            '과열되지 않도록 주의',
            '시원한 녹색 채소 섭취',
          ],
          alert: '탈진과 피로 누적 주의',
        },
        fall: {
          status: '억제기 - 활동 조절',
          care: [
            '금(金)이 목(木)을 극함',
            '무리한 활동 자제',
            '충분한 수면과 휴식',
            '면역력 강화에 집중',
          ],
          alert: '간 기능 약화, 감기 조심',
        },
        winter: {
          status: '충전기 - 에너지 회복',
          care: [
            '수(水)가 목(木)을 생함',
            '영양 섭취로 기력 보충',
            '따뜻하게 보온',
            '내년을 위한 준비기',
          ],
          alert: '냉증 주의, 따뜻하게 유지',
        },
      },
      화: {
        spring: {
          status: '성장기 - 에너지 상승',
          care: [
            '목(木)이 화(火)를 생함',
            '활동량 점진적 증가',
            '신선한 과일과 채소',
            '적당한 운동으로 순환 촉진',
          ],
          alert: '급격한 활동 증가는 피할 것',
        },
        summer: {
          status: '왕성기 - 최고 활동',
          care: [
            '심장 기능 가장 활발',
            '충분한 수분 섭취 필수',
            '과열 방지',
            '시원한 환경 유지',
          ],
          alert: '심계항진, 열사병 주의',
        },
        fall: {
          status: '안정기 - 활동 감소',
          care: [
            '활동량 서서히 줄이기',
            '따뜻한 차 마시기',
            '심신 안정에 집중',
            '규칙적인 생활',
          ],
          alert: '급격한 온도 변화 주의',
        },
        winter: {
          status: '억제기 - 휴식 필요',
          care: [
            '수(水)가 화(火)를 극함',
            '무리한 활동 자제',
            '보온에 특히 신경',
            '따뜻한 음식 섭취',
          ],
          alert: '저체온, 순환 장애 주의',
        },
      },
      토: {
        spring: {
          status: '소모기 - 에너지 분산',
          care: [
            '목(木)이 토(土)를 극함',
            '소화 기능 관리 중요',
            '규칙적인 식사',
            '스트레스 관리',
          ],
          alert: '소화불량, 위염 주의',
        },
        summer: {
          status: '충전기 - 에너지 회복',
          care: [
            '화(火)가 토(土)를 생함',
            '영양 섭취로 기력 보충',
            '소화 잘 되는 음식',
            '적당한 활동',
          ],
          alert: '과식과 냉음식 주의',
        },
        fall: {
          status: '소모기 - 조절 필요',
          care: [
            '토(土)가 금(金)을 생함',
            '에너지 소모되는 시기',
            '충분한 영양 섭취',
            '규칙적인 생활',
          ],
          alert: '피로 누적, 면역력 저하',
        },
        winter: {
          status: '안정기 - 평온 유지',
          care: [
            '따뜻한 음식 위주',
            '소화 기능 유지',
            '적당한 운동',
            '체중 관리',
          ],
          alert: '과식으로 인한 체중 증가',
        },
      },
      금: {
        spring: {
          status: '억제기 - 활동 조절',
          care: [
            '목(木)에 극을 당함',
            '무리한 활동 피하기',
            '호흡기 건강 관리',
            '알레르기 주의',
          ],
          alert: '꽃가루 알레르기, 호흡기 질환',
        },
        summer: {
          status: '소모기 - 에너지 감소',
          care: [
            '화(火)가 금(金)을 극함',
            '충분한 휴식 필요',
            '시원한 환경 유지',
            '수분 섭취',
          ],
          alert: '폐 기능 약화, 피부 건조',
        },
        fall: {
          status: '왕성기 - 최고 컨디션',
          care: [
            '폐 기능 가장 활발',
            '호흡 운동 적극 실시',
            '건조 방지',
            '면역력 강화',
          ],
          alert: '건조로 인한 호흡기 질환',
        },
        winter: {
          status: '충전기 - 에너지 회복',
          care: [
            '토(土)가 금(金)을 생함',
            '영양 섭취로 기력 보충',
            '보온과 보습',
            '실내 습도 유지',
          ],
          alert: '건조와 추위에 약함',
        },
      },
      수: {
        spring: {
          status: '소모기 - 에너지 분산',
          care: [
            '목(木)을 생하며 에너지 소모',
            '영양 보충 중요',
            '따뜻하게 유지',
            '충분한 휴식',
          ],
          alert: '신장 기능 약화 주의',
        },
        summer: {
          status: '억제기 - 활동 제한',
          care: [
            '화(火)에 극을 당함',
            '무리한 활동 자제',
            '충분한 수분 섭취',
            '시원한 환경',
          ],
          alert: '탈수, 신장 부담 주의',
        },
        fall: {
          status: '충전기 - 에너지 회복',
          care: [
            '금(金)이 수(水)를 생함',
            '영양 섭취로 보충',
            '적당한 운동',
            '면역력 강화',
          ],
          alert: '환절기 감기 조심',
        },
        winter: {
          status: '왕성기 - 최고 활력',
          care: [
            '신장 기능 가장 활발',
            '보온 철저히',
            '영양가 높은 음식',
            '적절한 활동',
          ],
          alert: '냉증과 요통 주의',
        },
      },
    };

    return care[dayElement] || care['목'];
  };

  const seasonalCare = getSeasonalCare();

  const seasons = [
    {
      name: '봄 (3-5월)',
      icon: Leaf,
      color: 'from-green-500 to-emerald-600',
      data: seasonalCare.spring,
    },
    {
      name: '여름 (6-8월)',
      icon: Sun,
      color: 'from-red-500 to-orange-600',
      data: seasonalCare.summer,
    },
    {
      name: '가을 (9-11월)',
      icon: Cloud,
      color: 'from-yellow-500 to-amber-600',
      data: seasonalCare.fall,
    },
    {
      name: '겨울 (12-2월)',
      icon: Snowflake,
      color: 'from-blue-500 to-cyan-600',
      data: seasonalCare.winter,
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
        className="text-3xl font-bold text-center mb-8 gradient-text"
        style={{ fontFamily: "'Noto Serif KR', serif" }}
      >
        🌡️ 계절별 건강 관리
      </h2>

      <p className="text-slate-300 text-center mb-8 leading-relaxed">
        오행은 계절과 밀접한 관계가 있습니다. 계절에 맞는 건강 관리로 최상의 컨디션을 유지하세요.
      </p>

      <div className="space-y-6">
        {seasons.map((season, index) => {
          const Icon = season.icon;
          return (
            <motion.div
              key={season.name}
              className="glass rounded-2xl p-6"
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${season.color} flex items-center justify-center`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">{season.name}</h3>
                  <p className="text-slate-400">{season.data.status}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="glass rounded-xl p-5">
                  <h4 className="font-bold text-green-400 mb-3">✓ 관리 방법</h4>
                  <ul className="space-y-2">
                    {season.data.care.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                        <span className="text-green-400 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="glass rounded-xl p-5 bg-orange-500/10 border border-orange-500/30">
                  <h4 className="font-bold text-orange-400 mb-3">⚠️ 주의사항</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">{season.data.alert}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 오행 순환 설명 */}
      <div className="glass rounded-2xl p-6 mt-8 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/30">
        <h3 className="text-xl font-bold text-purple-400 mb-4">🔄 오행 계절 순환</h3>
        <div className="grid md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-2">
              <Leaf className="w-8 h-8 text-green-400" />
            </div>
            <div className="font-bold text-green-400">봄 - 목(木)</div>
            <div className="text-slate-400 text-xs">성장, 확장</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-red-500/20 flex items-center justify-center mb-2">
              <Sun className="w-8 h-8 text-red-400" />
            </div>
            <div className="font-bold text-red-400">여름 - 화(火)</div>
            <div className="text-slate-400 text-xs">활동, 열정</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-yellow-500/20 flex items-center justify-center mb-2">
              <Cloud className="w-8 h-8 text-yellow-400" />
            </div>
            <div className="font-bold text-yellow-400">환절기 - 토(土)</div>
            <div className="text-slate-400 text-xs">변화, 중용</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-slate-400/20 flex items-center justify-center mb-2">
              <Cloud className="w-8 h-8 text-slate-300" />
            </div>
            <div className="font-bold text-slate-300">가을 - 금(金)</div>
            <div className="text-slate-400 text-xs">수렴, 정리</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center mb-2">
              <Snowflake className="w-8 h-8 text-blue-400" />
            </div>
            <div className="font-bold text-blue-400">겨울 - 수(水)</div>
            <div className="text-slate-400 text-xs">휴식, 저장</div>
          </div>
        </div>
        <p className="text-slate-300 text-sm text-center mt-6">
          💡 계절의 흐름을 이해하고 자연의 리듬에 맞춰 생활하면 건강을 유지할 수 있습니다
        </p>
      </div>
    </motion.div>
  );
}
