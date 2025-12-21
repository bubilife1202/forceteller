'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Sparkles, Star, Calendar, MapPin, Clock, Gift, AlertTriangle } from 'lucide-react';

interface Wealth2026LotteryProps {
  result: SajuResult;
  name: string;
  baseScore: number;
}

export default function Wealth2026Lottery({ result, name, baseScore }: Wealth2026LotteryProps) {
  const dayElement = result.day.stem.element;
  const { 재성, 식상 } = result.tenGodsCount;

  // 횡재운 점수
  const getLotteryScore = () => {
    let score = 30;

    // 편재가 있으면 횡재운 있음
    if (재성 >= 2) score += 25;
    else if (재성 >= 1) score += 10;

    // 식상이 있으면 복권 감각
    if (식상 >= 2) score += 15;
    else if (식상 >= 1) score += 5;

    // 2026년 병오년과의 관계
    if (dayElement === '토') score += 15; // 화생토
    if (dayElement === '화') score += 10; // 비겁 - 경쟁에서 이김
    if (dayElement === '금') score -= 10; // 화극금

    // 기본 운세 반영
    if (baseScore >= 70) score += 10;

    return Math.min(Math.max(score, 15), 100);
  };

  const lotteryScore = getLotteryScore();

  // 행운의 숫자
  const getLuckyNumbers = () => {
    const baseNumbers: Record<string, number[]> = {
      목: [3, 8, 13, 23, 33, 38],
      화: [2, 7, 17, 22, 27, 32],
      토: [5, 10, 15, 25, 35, 45],
      금: [4, 9, 14, 24, 34, 44],
      수: [1, 6, 11, 16, 21, 26]
    };

    const primary = baseNumbers[dayElement] || [7, 14, 21, 28, 35, 42];

    // 2026년 병오년 보조 숫자 (화)
    const secondary = [2, 7, 12, 17, 27, 37];

    // 조합 추천
    const recommended = [...new Set([...primary.slice(0, 3), ...secondary.slice(0, 3)])].slice(0, 6);

    return { primary, secondary, recommended };
  };

  const luckyNumbers = getLuckyNumbers();

  // 행운의 날
  const getLuckyDays = () => {
    const days: Record<string, { dates: string[]; reason: string }> = {
      목: {
        dates: ['3일', '8일', '13일', '18일', '23일', '28일'],
        reason: '목(木) 기운의 날'
      },
      화: {
        dates: ['2일', '7일', '12일', '17일', '22일', '27일'],
        reason: '화(火) 기운의 날'
      },
      토: {
        dates: ['5일', '10일', '15일', '20일', '25일', '30일'],
        reason: '토(土) 기운의 날'
      },
      금: {
        dates: ['4일', '9일', '14일', '19일', '24일', '29일'],
        reason: '금(金) 기운의 날'
      },
      수: {
        dates: ['1일', '6일', '11일', '16일', '21일', '26일'],
        reason: '수(水) 기운의 날'
      }
    };

    return days[dayElement] || days['토'];
  };

  const luckyDays = getLuckyDays();

  // 행운의 시간
  const getLuckyHours = () => {
    const hours: Record<string, { time: string; description: string }[]> = {
      목: [
        { time: '05:00-07:00', description: '묘시(卯時) - 목 기운 왕성' },
        { time: '15:00-17:00', description: '신시(申時) - 목생화 시작' }
      ],
      화: [
        { time: '09:00-11:00', description: '사시(巳時) - 화 기운 왕성' },
        { time: '11:00-13:00', description: '오시(午時) - 화 기운 절정' }
      ],
      토: [
        { time: '07:00-09:00', description: '진시(辰時) - 토 기운 시작' },
        { time: '13:00-15:00', description: '미시(未時) - 토 기운 왕성' }
      ],
      금: [
        { time: '15:00-17:00', description: '신시(申時) - 금 기운 왕성' },
        { time: '17:00-19:00', description: '유시(酉時) - 금 기운 절정' }
      ],
      수: [
        { time: '21:00-23:00', description: '해시(亥時) - 수 기운 왕성' },
        { time: '23:00-01:00', description: '자시(子時) - 수 기운 절정' }
      ]
    };

    return hours[dayElement] || hours['토'];
  };

  const luckyHours = getLuckyHours();

  // 행운의 장소
  const getLuckyPlaces = () => {
    const places: Record<string, { place: string; direction: string }[]> = {
      목: [
        { place: '공원, 산, 숲 근처 판매점', direction: '동쪽 방향' },
        { place: '새로 오픈한 매장', direction: '집에서 동쪽' }
      ],
      화: [
        { place: '번화가, 불 밝은 곳', direction: '남쪽 방향' },
        { place: '주유소, 음식점 근처', direction: '집에서 남쪽' }
      ],
      토: [
        { place: '아파트 단지 내, 동네 매장', direction: '중앙 또는 집 근처' },
        { place: '오래된 전통 판매점', direction: '익숙한 장소' }
      ],
      금: [
        { place: '은행, 증권사 근처', direction: '서쪽 방향' },
        { place: '고급 주택가 매장', direction: '집에서 서쪽' }
      ],
      수: [
        { place: '강, 바다 근처', direction: '북쪽 방향' },
        { place: '지하철역, 유동인구 많은 곳', direction: '집에서 북쪽' }
      ]
    };

    return places[dayElement] || places['토'];
  };

  const luckyPlaces = getLuckyPlaces();

  // 2026년 대박 월
  const getJackpotMonths = () => {
    const months = [];

    if (dayElement === '토') {
      months.push({ month: '5월', score: 95, reason: '화생토 절정, 최고의 횡재운' });
      months.push({ month: '6월', score: 90, reason: '여름 화 기운으로 토 강화' });
    }
    if (dayElement === '화') {
      months.push({ month: '5-6월', score: 85, reason: '비겁운, 경쟁에서 이길 운' });
    }
    if (dayElement === '목') {
      months.push({ month: '3-4월', score: 80, reason: '목생화, 좋은 기운 생성' });
    }

    // 공통 행운의 달
    months.push({ month: '9월', score: 75, reason: '수확의 달, 결실의 기운' });
    months.push({ month: '12월', score: 70, reason: '연말 행운 상승' });

    return months.sort((a, b) => b.score - a.score).slice(0, 3);
  };

  const jackpotMonths = getJackpotMonths();

  // 복권 종류별 추천
  const getLotteryRecommendation = () => {
    const recommendations = [];

    if (재성 >= 2) {
      recommendations.push({
        type: '로또 6/45',
        suitability: '매우 적합',
        reason: '재성이 강해 큰 금액의 횡재 가능성',
        frequency: '주 1-2회',
        budget: '월 2-5만원'
      });
    }

    if (식상 >= 1) {
      recommendations.push({
        type: '스피또',
        suitability: '적합',
        reason: '직감이 좋아 즉석복권에 유리',
        frequency: '월 2-3회',
        budget: '월 1-2만원'
      });
    }

    recommendations.push({
      type: '연금복권',
      suitability: baseScore >= 60 ? '적합' : '보통',
      reason: '안정적인 당첨금, 장기적 행운',
      frequency: '주 1회',
      budget: '월 2만원'
    });

    if (lotteryScore >= 60) {
      recommendations.push({
        type: '파워볼/메가밀리언(해외)',
        suitability: '도전 가능',
        reason: '횡재운이 있어 큰 금액 도전 가치',
        frequency: '월 1-2회',
        budget: '월 1-2만원'
      });
    }

    return recommendations;
  };

  const lotteryReco = getLotteryRecommendation();

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
        🍀 2026년 복권/행운 운세
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님의 횡재운과 행운의 요소들
      </p>

      {/* 횡재운 점수 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-amber-400">횡재운 {lotteryScore}점</h3>
            <p className="text-slate-400">
              {lotteryScore >= 70 ? '대박 가능성 있음! 기회를 노려보세요' :
               lotteryScore >= 50 ? '소소한 행운이 기대됩니다' :
               lotteryScore >= 35 ? '가끔 행운이 찾아올 수 있어요' :
               '횡재보다 근로소득에 집중하세요'}
            </p>
          </div>
        </div>
        <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-500 to-amber-500"
            initial={{ width: 0 }}
            whileInView={{ width: `${lotteryScore}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="text-center p-2 glass rounded-lg">
            <p className="text-xs text-slate-500">편재 보유</p>
            <p className="font-bold text-amber-400">{재성 >= 2 ? '강함' : 재성 >= 1 ? '보통' : '약함'}</p>
          </div>
          <div className="text-center p-2 glass rounded-lg">
            <p className="text-xs text-slate-500">직감력</p>
            <p className="font-bold text-purple-400">{식상 >= 2 ? '높음' : 식상 >= 1 ? '보통' : '보통'}</p>
          </div>
          <div className="text-center p-2 glass rounded-lg">
            <p className="text-xs text-slate-500">병오년 관계</p>
            <p className="font-bold text-cyan-400">
              {dayElement === '토' ? '최고' : dayElement === '화' ? '좋음' : dayElement === '금' ? '주의' : '보통'}
            </p>
          </div>
        </div>
      </div>

      {/* 대박 월 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Star className="w-6 h-6 text-yellow-400" />
          <h3 className="text-xl font-bold text-yellow-400">2026년 대박 기대 월</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {jackpotMonths.map((month, idx) => (
            <motion.div
              key={idx}
              className={`rounded-xl p-5 text-center ${
                idx === 0 ? 'bg-gradient-to-br from-yellow-500/20 to-amber-600/20 border border-yellow-500/30' : 'glass'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              {idx === 0 && <span className="text-yellow-400 text-sm">👑 최고의 달</span>}
              <p className="text-2xl font-bold text-white mt-1">{month.month}</p>
              <div className="flex justify-center my-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={`text-lg ${i < Math.floor(month.score / 20) ? 'text-yellow-400' : 'text-slate-600'}`}>
                    ★
                  </span>
                ))}
              </div>
              <p className="text-slate-400 text-sm">{month.reason}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 행운의 숫자 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Gift className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-bold text-purple-400">행운의 숫자</h3>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-semibold text-slate-300 mb-3">🎯 추천 조합 (로또용)</h4>
          <div className="flex gap-2 justify-center flex-wrap">
            {luckyNumbers.recommended.map((num, idx) => (
              <motion.div
                key={idx}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-lg"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, type: 'spring' }}
              >
                {num}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="glass rounded-xl p-4">
            <h4 className="text-sm font-semibold text-cyan-400 mb-2">일간 기반 숫자 ({dayElement})</h4>
            <div className="flex gap-2 flex-wrap">
              {luckyNumbers.primary.map((num, idx) => (
                <span key={idx} className="px-3 py-1 bg-cyan-500/20 rounded-full text-cyan-400 text-sm">
                  {num}
                </span>
              ))}
            </div>
          </div>
          <div className="glass rounded-xl p-4">
            <h4 className="text-sm font-semibold text-orange-400 mb-2">2026년 운세 숫자 (화)</h4>
            <div className="flex gap-2 flex-wrap">
              {luckyNumbers.secondary.map((num, idx) => (
                <span key={idx} className="px-3 py-1 bg-orange-500/20 rounded-full text-orange-400 text-sm">
                  {num}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 행운의 날/시간/장소 */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="glass rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-green-400" />
            <h4 className="font-semibold text-green-400">행운의 날</h4>
          </div>
          <p className="text-slate-400 text-sm mb-2">{luckyDays.reason}</p>
          <div className="flex gap-1 flex-wrap">
            {luckyDays.dates.map((date, idx) => (
              <span key={idx} className="px-2 py-1 bg-green-500/20 rounded text-green-400 text-xs">
                {date}
              </span>
            ))}
          </div>
        </div>

        <div className="glass rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-blue-400" />
            <h4 className="font-semibold text-blue-400">행운의 시간</h4>
          </div>
          <div className="space-y-2">
            {luckyHours.map((hour, idx) => (
              <div key={idx}>
                <p className="text-white text-sm font-medium">{hour.time}</p>
                <p className="text-slate-500 text-xs">{hour.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-red-400" />
            <h4 className="font-semibold text-red-400">행운의 장소</h4>
          </div>
          <div className="space-y-2">
            {luckyPlaces.map((place, idx) => (
              <div key={idx}>
                <p className="text-white text-sm">{place.place}</p>
                <p className="text-slate-500 text-xs">{place.direction}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 복권 종류별 추천 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-amber-400 mb-6">복권 종류별 추천</h3>
        <div className="space-y-3">
          {lotteryReco.map((item, idx) => (
            <motion.div
              key={idx}
              className="glass rounded-xl p-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-white">{item.type}</h4>
                <span className={`px-3 py-1 rounded-full text-xs ${
                  item.suitability === '매우 적합' ? 'bg-green-500/20 text-green-400' :
                  item.suitability === '적합' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-slate-500/20 text-slate-400'
                }`}>
                  {item.suitability}
                </span>
              </div>
              <p className="text-slate-400 text-sm mb-2">{item.reason}</p>
              <div className="flex gap-4 text-xs text-slate-500">
                <span>빈도: {item.frequency}</span>
                <span>예산: {item.budget}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 주의사항 */}
      <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-red-400 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-red-400 mb-2">복권/도박 주의사항</h4>
            <ul className="space-y-1 text-slate-300 text-sm">
              <li>• 복권은 오락입니다. 생활비를 사용하지 마세요.</li>
              <li>• 월 복권 예산을 정하고 절대 초과하지 마세요.</li>
              <li>• 당첨을 기대하기보다 재미로 즐기세요.</li>
              <li>• 손실을 복구하려고 더 많이 사지 마세요.</li>
              <li>• 도박 중독은 인생을 망칩니다. 절제하세요.</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
