'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Plane, Globe, GraduationCap, MapPin } from 'lucide-react';

interface StudyOverseasProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function StudyOverseas({ result, name }: StudyOverseasProps) {
  const dayElement = result.day.stem.element;
  const { 식상, 인성, 재성 } = result.tenGodsCount;

  // 유학운 점수
  const getOverseasScore = () => {
    let score = 50;

    if (식상 >= 2) score += 15; // 적응력, 해외 이동운
    else if (식상 >= 1) score += 8;

    if (인성 >= 2) score += 10; // 학습 능력
    if (재성 >= 1) score += 8; // 경제적 뒷받침

    if (dayElement === '수') score += 15; // 적응력, 언어
    if (dayElement === '목') score += 12; // 소통, 성장
    if (dayElement === '화') score += 10; // 도전정신

    return Math.min(Math.max(score, 30), 100);
  };

  const overseasScore = getOverseasScore();

  // 추천 유학 국가/지역
  const getRecommendedCountries = () => {
    return [
      {
        region: '북미 (미국/캐나다)',
        icon: Plane,
        score: 50 + (식상 * 12) + (dayElement === '화' ? 15 : 0),
        color: 'from-blue-500 to-indigo-600',
        textColor: 'text-blue-400',
        features: ['세계 최고 교육', '다양한 기회', '혁신 중심'],
        pros: '최고 수준 교육, 취업 기회',
        cons: '높은 비용, 경쟁 치열',
      },
      {
        region: '유럽 (영국/독일/프랑스)',
        icon: Globe,
        score: 50 + (인성 * 15) + (dayElement === '수' ? 15 : dayElement === '금' ? 12 : 0),
        color: 'from-purple-500 to-violet-600',
        textColor: 'text-purple-400',
        features: ['역사와 문화', '학문 전통', '합리적 학비'],
        pros: '깊이 있는 학문, 문화 체험',
        cons: '언어 장벽, 기후 적응',
      },
      {
        region: '아시아 (싱가포르/홍콩/일본)',
        icon: MapPin,
        score: 50 + (dayElement === '목' ? 15 : dayElement === '토' ? 12 : 0),
        color: 'from-green-500 to-emerald-600',
        textColor: 'text-green-400',
        features: ['지리적 근접', '아시아 허브', '안전'],
        pros: '가까운 거리, 낮은 문화 차이',
        cons: '제한적 기회',
      },
      {
        region: '오세아니아 (호주/뉴질랜드)',
        icon: GraduationCap,
        score: 50 + (식상 * 10) + (dayElement === '수' ? 12 : 0),
        color: 'from-yellow-500 to-amber-600',
        textColor: 'text-yellow-400',
        features: ['여유로운 환경', '우수한 교육', '이민 가능'],
        pros: '쾌적한 환경, 안전',
        cons: '먼 거리, 높은 생활비',
      },
    ].map(country => ({
      ...country,
      score: Math.min(Math.max(country.score, 30), 100),
    })).sort((a, b) => b.score - a.score);
  };

  const countries = getRecommendedCountries();
  const topCountry = countries[0];

  // 유학 단계별 준비
  const getPreparationPhases = () => {
    return [
      {
        phase: '1년 전',
        tasks: ['국가/학교 선정', '어학 시험 준비', '예산 계획'],
        priority: '높음',
      },
      {
        phase: '6개월 전',
        tasks: ['원서 작성', '추천서 준비', '에세이 작성'],
        priority: '높음',
      },
      {
        phase: '3개월 전',
        tasks: ['비자 신청', '기숙사 신청', '항공권 예약'],
        priority: '중간',
      },
      {
        phase: '출국 직전',
        tasks: ['짐 정리', '현지 정보 수집', '마음 준비'],
        priority: '중간',
      },
    ];
  };

  const preparationPhases = getPreparationPhases();

  // 유학 성공 요소
  const getSuccessFactors = () => {
    const factors = [];

    if (dayElement === '수') {
      factors.push({ factor: '언어 능력', importance: 95, tip: '어학 실력이 최우선' });
    }
    if (dayElement === '목') {
      factors.push({ factor: '소통 능력', importance: 90, tip: '적극적 교류' });
    }
    if (dayElement === '화') {
      factors.push({ factor: '도전 정신', importance: 85, tip: '새로운 것 두려워 말기' });
    }
    if (dayElement === '금') {
      factors.push({ factor: '체계적 준비', importance: 90, tip: '철저한 계획' });
    }
    if (dayElement === '토') {
      factors.push({ factor: '인내심', importance: 85, tip: '끈기 있게 적응' });
    }

    factors.push({ factor: '경제적 준비', importance: 90, tip: '충분한 자금 확보' });
    factors.push({ factor: '학업 능력', importance: 인성 >= 2 ? 95 : 80, tip: '기초 실력 다지기' });
    factors.push({ factor: '자립심', importance: 식상 >= 2 ? 90 : 75, tip: '독립적 생활 능력' });

    return factors.slice(0, 5).sort((a, b) => b.importance - a.importance);
  };

  const successFactors = getSuccessFactors();

  // 유학 형태 추천
  const getStudyType = () => {
    if (overseasScore >= 75 && 인성 >= 2) {
      return {
        type: '정규 학위 과정',
        duration: '2-4년',
        desc: '학사/석사 학위 취득',
        recommend: true,
      };
    } else if (overseasScore >= 60) {
      return {
        type: '교환학생/어학연수',
        duration: '6개월-1년',
        desc: '단기 유학으로 경험 쌓기',
        recommend: true,
      };
    } else {
      return {
        type: '방학 단기 프로그램',
        duration: '4-8주',
        desc: '여름/겨울 방학 활용',
        recommend: true,
      };
    }
  };

  const studyType = getStudyType();

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
        ✈️ 유학운 분석
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님의 해외 학습 적성과 추천 국가
      </p>

      {/* 유학운 총점 */}
      <div className="glass rounded-2xl p-6 mb-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30">
        <div className="text-center mb-6">
          <p className="text-slate-400 mb-2">유학운 종합 점수</p>
          <h3 className="text-5xl font-bold gradient-text">{overseasScore}점</h3>

          <div className="h-4 bg-slate-700 rounded-full overflow-hidden mt-4 max-w-md mx-auto">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
              initial={{ width: 0 }}
              whileInView={{ width: `${overseasScore}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            />
          </div>

          <p className="mt-4 text-slate-300">
            {overseasScore >= 80 ? '🌟 탁월한 유학운! 장기 유학도 성공 가능합니다.' :
             overseasScore >= 65 ? '✨ 좋은 유학운! 철저히 준비하면 성공합니다.' :
             overseasScore >= 50 ? '💫 단기 유학부터 시작해보세요.' :
             '🔥 국내에서 먼저 실력을 다지세요.'}
          </p>
        </div>

        {/* 추천 유학 형태 */}
        <div className="grid md:grid-cols-3 gap-3">
          <div className="text-center p-3 bg-cyan-500/10 rounded-xl">
            <p className="text-slate-400 text-sm">추천 형태</p>
            <p className="text-lg font-bold text-cyan-400">{studyType.type}</p>
          </div>
          <div className="text-center p-3 bg-blue-500/10 rounded-xl">
            <p className="text-slate-400 text-sm">기간</p>
            <p className="text-lg font-bold text-blue-400">{studyType.duration}</p>
          </div>
          <div className="text-center p-3 bg-indigo-500/10 rounded-xl">
            <p className="text-slate-400 text-sm">목표</p>
            <p className="text-lg font-bold text-indigo-400">{studyType.desc}</p>
          </div>
        </div>
      </div>

      {/* 최고 추천 국가 */}
      <div className="glass rounded-2xl p-6 mb-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${topCountry.color} flex items-center justify-center`}>
            <topCountry.icon className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-slate-400">가장 적합한 지역</p>
            <h3 className="text-2xl font-bold text-purple-400">{topCountry.region}</h3>
            <p className="text-3xl font-bold text-pink-400">{topCountry.score}점</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-sm text-green-400 mb-2">✓ 장점</p>
            <p className="text-slate-300 text-sm">{topCountry.pros}</p>
          </div>
          <div>
            <p className="text-sm text-orange-400 mb-2">⚠ 단점</p>
            <p className="text-slate-300 text-sm">{topCountry.cons}</p>
          </div>
        </div>
      </div>

      {/* 국가/지역별 점수 */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {countries.map((country, index) => (
          <motion.div
            key={country.region}
            className="glass rounded-xl p-5"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${country.color} flex items-center justify-center`}>
                <country.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">{country.region}</h4>
                <p className={`text-xl font-bold ${country.textColor}`}>{country.score}점</p>
              </div>
            </div>

            <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-3">
              <motion.div
                className={`h-full bg-gradient-to-r ${country.color}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${country.score}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </div>

            <div className="flex flex-wrap gap-1 mb-2">
              {country.features.map((feature, idx) => (
                <span key={idx} className="text-xs text-slate-400">
                  {feature}{idx < country.features.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* 유학 준비 단계 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-yellow-400 mb-4">
          📋 단계별 준비 가이드
        </h3>
        <div className="space-y-3">
          {preparationPhases.map((phase, index) => (
            <motion.div
              key={index}
              className="glass rounded-xl p-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-white">{phase.phase}</h4>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  phase.priority === '높음' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'
                }`}>
                  우선순위: {phase.priority}
                </span>
              </div>
              <ul className="text-sm text-slate-300 space-y-1">
                {phase.tasks.map((task, idx) => (
                  <li key={idx}>• {task}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 성공 요소 */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold text-green-400 mb-4">
          🎯 유학 성공 핵심 요소
        </h3>
        <div className="space-y-3">
          {successFactors.map((factor, index) => (
            <motion.div
              key={index}
              className="glass rounded-xl p-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-white">{factor.factor}</h4>
                <span className="text-lg font-bold text-green-400">{factor.importance}%</span>
              </div>

              <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-2">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${factor.importance}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                />
              </div>

              <p className="text-slate-400 text-sm">{factor.tip}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
