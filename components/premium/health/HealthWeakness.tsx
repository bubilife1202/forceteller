'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { AlertTriangle, Shield, Stethoscope, Pill } from 'lucide-react';

interface HealthWeaknessProps {
  result: SajuResult;
  name: string;
}

export default function HealthWeakness({ result, name }: HealthWeaknessProps) {
  const dayElement = result.day.stem.element;

  // 체질별 취약 부위 및 주의 질병
  const getWeaknessInfo = () => {
    const info: Record<
      string,
      {
        weakParts: string[];
        diseases: { name: string; risk: '상' | '중' | '하'; prevention: string }[];
        seasonalCaution: { season: string; caution: string }[];
      }
    > = {
      목: {
        weakParts: ['간', '담낭', '눈', '근육', '인대', '신경계'],
        diseases: [
          {
            name: '지방간/간염',
            risk: '상',
            prevention: '절주, 기름진 음식 제한, 규칙적인 생활',
          },
          {
            name: '안구건조증/시력 저하',
            risk: '중',
            prevention: '충분한 휴식, 눈 운동, 블루라이트 차단',
          },
          {
            name: '근육통/인대 손상',
            risk: '중',
            prevention: '준비운동, 스트레칭, 과로 피하기',
          },
          {
            name: '자율신경실조증',
            risk: '상',
            prevention: '스트레스 관리, 규칙적인 수면',
          },
        ],
        seasonalCaution: [
          { season: '봄', caution: '간 기능이 가장 활발한 시기. 과로와 스트레스 주의' },
          { season: '환절기', caution: '알레르기와 피로감 증가. 면역력 관리 필수' },
        ],
      },
      화: {
        weakParts: ['심장', '소장', '혀', '혈관', '정신'],
        diseases: [
          {
            name: '고혈압/심계항진',
            risk: '상',
            prevention: '규칙적인 운동, 염분 제한, 스트레스 관리',
          },
          {
            name: '부정맥/협심증',
            risk: '중',
            prevention: '과로 피하기, 정기 검진, 충분한 휴식',
          },
          {
            name: '불면증',
            risk: '상',
            prevention: '저녁 카페인 피하기, 이완 훈련, 규칙적 수면',
          },
          {
            name: '구내염/혀염증',
            risk: '하',
            prevention: '수분 섭취, 자극적 음식 피하기',
          },
        ],
        seasonalCaution: [
          { season: '여름', caution: '심장에 부담. 과열 주의, 충분한 수분 섭취' },
          { season: '한여름', caution: '열사병 위험. 무리한 활동 자제' },
        ],
      },
      토: {
        weakParts: ['비장', '위', '췌장', '입', '살결'],
        diseases: [
          {
            name: '위염/위궤양',
            risk: '상',
            prevention: '규칙적 식사, 천천히 먹기, 스트레스 관리',
          },
          {
            name: '소화불량/과민성대장',
            risk: '상',
            prevention: '자극적 음식 피하기, 유산균 섭취',
          },
          {
            name: '당뇨병/대사증후군',
            risk: '중',
            prevention: '체중 관리, 규칙적 운동, 정기 검진',
          },
          {
            name: '구강 질환',
            risk: '하',
            prevention: '구강 위생, 정기 치과 검진',
          },
        ],
        seasonalCaution: [
          { season: '환절기', caution: '소화기 약화. 찬 음식 피하고 따뜻하게' },
          { season: '장마철', caution: '습기로 인한 소화력 저하. 제습과 환기' },
        ],
      },
      금: {
        weakParts: ['폐', '대장', '피부', '코', '기관지'],
        diseases: [
          {
            name: '기관지염/천식',
            risk: '상',
            prevention: '미세먼지 차단, 금연, 호흡기 운동',
          },
          {
            name: '알레르기성 비염',
            risk: '중',
            prevention: '알레르기 원인 제거, 실내 환경 관리',
          },
          {
            name: '아토피/건선',
            risk: '중',
            prevention: '보습 관리, 자극 물질 피하기',
          },
          {
            name: '대장염/변비',
            risk: '상',
            prevention: '섬유질 섭취, 충분한 수분, 규칙적 배변',
          },
        ],
        seasonalCaution: [
          { season: '가을', caution: '호흡기 취약 시기. 건조 주의, 보습 필수' },
          { season: '겨울', caution: '차갑고 건조한 공기. 마스크 착용 권장' },
        ],
      },
      수: {
        weakParts: ['신장', '방광', '귀', '생식기', '뼈'],
        diseases: [
          {
            name: '신장염/방광염',
            risk: '상',
            prevention: '수분 섭취, 청결 관리, 과로 피하기',
          },
          {
            name: '요로결석',
            risk: '중',
            prevention: '물 많이 마시기, 염분 제한',
          },
          {
            name: '이명/난청',
            risk: '중',
            prevention: '큰 소음 피하기, 스트레스 관리',
          },
          {
            name: '골다공증/관절염',
            risk: '중',
            prevention: '칼슘 섭취, 적절한 운동, 체중 관리',
          },
        ],
        seasonalCaution: [
          { season: '겨울', caution: '신장 취약 시기. 따뜻하게 보온, 특히 허리와 발' },
          { season: '한겨울', caution: '냉증 악화. 보온에 각별히 신경' },
        ],
      },
    };

    return info[dayElement] || info['목'];
  };

  const weaknessInfo = getWeaknessInfo();

  // 위험도별 색상
  const getRiskColor = (risk: '상' | '중' | '하') => {
    switch (risk) {
      case '상':
        return { bg: 'bg-red-500/20', border: 'border-red-500/50', text: 'text-red-400' };
      case '중':
        return { bg: 'bg-yellow-500/20', border: 'border-yellow-500/50', text: 'text-yellow-400' };
      case '하':
        return { bg: 'bg-green-500/20', border: 'border-green-500/50', text: 'text-green-400' };
    }
  };

  // 건강 검진 추천
  const getCheckupRecommendations = () => {
    const checkups: Record<string, string[]> = {
      목: ['간 기능 검사', '안과 검진', '신경계 검사'],
      화: ['심전도 검사', '혈압 측정', '혈액 검사'],
      토: ['위내시경', '혈당 검사', '복부 초음파'],
      금: ['폐 기능 검사', '흉부 X-ray', '대장 내시경'],
      수: ['신장 기능 검사', '소변 검사', '골밀도 검사'],
    };
    return checkups[dayElement] || [];
  };

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
        ⚠️ 취약 부위 & 주의 질병
      </h2>

      {/* 취약 부위 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-orange-400">취약한 신체 부위</h3>
            <p className="text-slate-400 text-sm">평소 관리가 필요한 부분입니다</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {weaknessInfo.weakParts.map((part, index) => (
            <motion.div
              key={part}
              className="px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <span className="text-orange-300 font-medium">{part}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 주의 질병 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-red-400">주의해야 할 질병</h3>
            <p className="text-slate-400 text-sm">위험도별 예방법을 확인하세요</p>
          </div>
        </div>

        <div className="space-y-4">
          {weaknessInfo.diseases.map((disease, index) => {
            const riskColor = getRiskColor(disease.risk);
            return (
              <motion.div
                key={disease.name}
                className={`${riskColor.bg} border ${riskColor.border} rounded-xl p-5`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-lg font-bold text-white">{disease.name}</h4>
                  <span
                    className={`px-3 py-1 ${riskColor.text} bg-slate-900/50 rounded-full text-sm font-semibold`}
                  >
                    위험도: {disease.risk}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Shield className={`w-5 h-5 ${riskColor.text} mt-0.5 flex-shrink-0`} />
                  <p className="text-slate-200 text-sm leading-relaxed">
                    <strong>예방법:</strong> {disease.prevention}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 계절별 주의사항 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-cyan-400 mb-4">🌡️ 계절별 건강 주의사항</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {weaknessInfo.seasonalCaution.map((item, index) => (
            <motion.div
              key={item.season}
              className="glass rounded-xl p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="font-bold text-white mb-2">{item.season}</h4>
              <p className="text-slate-300 text-sm">{item.caution}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 건강 검진 추천 */}
      <div className="glass rounded-2xl p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
            <Pill className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-blue-400">정기 건강 검진 추천</h3>
            <p className="text-slate-400 text-sm">연 1-2회 정기 검진을 받으세요</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          {getCheckupRecommendations().map((checkup, index) => (
            <motion.div
              key={checkup}
              className="bg-blue-500/20 rounded-lg p-4 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <p className="text-blue-300 font-semibold">{checkup}</p>
            </motion.div>
          ))}
        </div>

        <p className="text-slate-300 text-sm mt-6 leading-relaxed">
          💡 <strong>Tip:</strong> 조기 발견이 가장 중요합니다. 취약 부위에 대한 정기 검진으로
          질병을 예방하고, 이상 증상이 있을 때는 즉시 전문의와 상담하세요.
        </p>
      </div>
    </motion.div>
  );
}
