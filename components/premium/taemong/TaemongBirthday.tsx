'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, Sun, Moon } from 'lucide-react';
import { TaemongFormData } from '@/components/TaemongForm';

interface TaemongBirthdayProps {
  formData: TaemongFormData;
}

export default function TaemongBirthday({ formData }: TaemongBirthdayProps) {
  // 권장 출산 시기 (태몽 내용 기반)
  const getRecommendedMonths = () => {
    const content = formData.dreamContent.toLowerCase();
    const months: Array<{ month: string; reason: string; lucky: boolean }> = [];

    // 봄 (3-5월)
    if (
      content.includes('꽃') ||
      content.includes('봄') ||
      content.includes('새싹') ||
      content.includes('나비')
    ) {
      months.push({
        month: '3월 - 5월 (봄)',
        reason: '꽃과 새싹의 기운이 담긴 태몽입니다. 만물이 소생하는 봄에 태어나면 더욱 좋습니다.',
        lucky: true,
      });
    }

    // 여름 (6-8월)
    if (
      content.includes('해') ||
      content.includes('태양') ||
      content.includes('여름') ||
      content.includes('밝')
    ) {
      months.push({
        month: '6월 - 8월 (여름)',
        reason: '태양의 기운이 강한 태몽입니다. 뜨거운 여름의 양기가 아이에게 힘을 줄 것입니다.',
        lucky: true,
      });
    }

    // 가을 (9-11월)
    if (
      content.includes('곡식') ||
      content.includes('열매') ||
      content.includes('가을') ||
      content.includes('풍성')
    ) {
      months.push({
        month: '9월 - 11월 (가을)',
        reason: '수확과 풍요의 상징이 담긴 태몽입니다. 결실의 계절인 가을이 길합니다.',
        lucky: true,
      });
    }

    // 겨울 (12-2월)
    if (
      content.includes('눈') ||
      content.includes('겨울') ||
      content.includes('얼음') ||
      content.includes('차가')
    ) {
      months.push({
        month: '12월 - 2월 (겨울)',
        reason: '차분하고 고요한 기운의 태몽입니다. 내면의 힘을 기르는 겨울이 적합합니다.',
        lucky: true,
      });
    }

    // 특정 달
    if (content.includes('용')) {
      months.push({
        month: '2월, 5월, 8월, 11월',
        reason: '용의 달 (진술월)에 태어나면 용의 기운을 더욱 크게 받습니다.',
        lucky: true,
      });
    }

    if (months.length === 0) {
      months.push({
        month: '봄 또는 가을',
        reason: '온화한 계절에 태어나면 건강하고 평온한 성품을 가지게 됩니다.',
        lucky: true,
      });
    }

    return months;
  };

  // 권장 출산 시간
  const getRecommendedTimes = () => {
    const content = formData.dreamContent.toLowerCase();
    const times: Array<{ time: string; period: string; reason: string }> = [];

    if (content.includes('해') || content.includes('태양') || content.includes('밝')) {
      times.push({
        time: '오전 (06:00 - 12:00)',
        period: '해가 떠오르는 시간',
        reason: '양(陽)의 기운이 상승하는 시간으로, 밝고 활동적인 성격이 됩니다.',
      });
    }

    if (content.includes('달') || content.includes('밤') || content.includes('별')) {
      times.push({
        time: '밤 (21:00 - 03:00)',
        period: '달이 밝게 빛나는 시간',
        reason: '음(陰)의 기운이 깊은 시간으로, 지혜롭고 침착한 성품이 됩니다.',
      });
    }

    if (content.includes('용') || content.includes('호랑이')) {
      times.push({
        time: '새벽 (05:00 - 07:00)',
        period: '하루가 시작되는 시간',
        reason: '용과 호랑이의 시간(진시, 묘시)으로 강한 기운을 받습니다.',
      });
    }

    if (times.length === 0) {
      times.push({
        time: '오전 또는 오후',
        period: '해가 있는 동안',
        reason: '밝은 시간에 태어나면 건강하고 활기찬 아이가 됩니다.',
      });
    }

    return times;
  };

  // 피해야 할 날짜
  const getDatesToAvoid = () => {
    return [
      {
        date: '음력 상순 또는 하순',
        reason: '가능하면 음력 중순(11일-20일)이 안정적입니다.',
      },
      {
        date: '일진이 좋지 않은 날',
        reason: '만세력을 확인하여 좋은 날을 선택하시는 것이 좋습니다.',
      },
      {
        date: '엄마의 컨디션이 나쁜 날',
        reason: '무엇보다 산모의 건강이 가장 중요합니다.',
      },
    ];
  };

  const recommendedMonths = getRecommendedMonths();
  const recommendedTimes = getRecommendedTimes();
  const datesToAvoid = getDatesToAvoid();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-10"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
          <Calendar className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2
            className="text-2xl md:text-3xl font-bold text-white"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            출산 시기 안내
          </h2>
          <p className="text-slate-400 text-sm">태몽 기반 권장 출산일</p>
        </div>
      </div>

      {/* 중요 안내 */}
      <motion.div
        className="mb-8 p-5 bg-amber-500/10 border border-amber-500/30 rounded-2xl"
        variants={itemVariants}
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <p className="text-amber-400 font-semibold mb-1">참고 사항</p>
            <p className="text-slate-300 text-sm leading-relaxed">
              이는 전통 태몽 해석을 바탕으로 한 권장 사항입니다. 실제 출산일은 산모와 아기의
              건강을 최우선으로 하며, 의료진의 판단에 따라 결정하시기 바랍니다. 제왕절개 날짜
              선택 시에만 참고하세요.
            </p>
          </div>
        </div>
      </motion.div>

      {/* 권장 출산 달 */}
      <motion.div className="mb-8" variants={itemVariants}>
        <div className="flex items-center gap-2 mb-4">
          <Sun className="w-6 h-6 text-orange-400" />
          <h3 className="text-xl font-bold text-white">권장 출산 달</h3>
        </div>
        <div className="space-y-4">
          {recommendedMonths.map((item, index) => (
            <div
              key={item.month}
              className={`glass rounded-xl p-5 ${
                item.lucky ? 'border border-cyan-500/30' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                {item.lucky && <span className="text-3xl">🌟</span>}
                <div className="flex-1">
                  <h4 className="font-bold text-cyan-400 mb-2 text-lg">{item.month}</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">{item.reason}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 권장 출산 시간 */}
      <motion.div className="mb-8" variants={itemVariants}>
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-bold text-white">권장 출산 시간</h3>
        </div>
        <div className="space-y-4">
          {recommendedTimes.map((item, index) => (
            <div key={item.time} className="glass rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mb-2">
                    {item.time.includes('밤') || item.time.includes('새벽') ? (
                      <Moon className="w-8 h-8 text-white" />
                    ) : (
                      <Sun className="w-8 h-8 text-white" />
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-white mb-1">{item.time}</h4>
                  <p className="text-blue-400 text-sm mb-2">{item.period}</p>
                  <p className="text-slate-300 text-sm leading-relaxed">{item.reason}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 피해야 할 시기 */}
      <motion.div className="mb-8" variants={itemVariants}>
        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">⛔</span>
            피하면 좋은 시기
          </h3>
          <div className="space-y-3">
            {datesToAvoid.map((item, index) => (
              <div key={item.date} className="flex items-start gap-3">
                <span className="text-red-400 text-sm mt-1">•</span>
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm">{item.date}</p>
                  <p className="text-slate-400 text-sm">{item.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 사주 시간 선택 가이드 */}
      <motion.div variants={itemVariants}>
        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">🕐</span>
            시진별 특성 참고
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h4 className="text-cyan-400 font-semibold mb-1">자시 (23:00-01:00)</h4>
              <p className="text-slate-400 text-xs">지혜롭고 침착함</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h4 className="text-cyan-400 font-semibold mb-1">축시 (01:00-03:00)</h4>
              <p className="text-slate-400 text-xs">성실하고 근면함</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h4 className="text-cyan-400 font-semibold mb-1">인시 (03:00-05:00)</h4>
              <p className="text-slate-400 text-xs">용감하고 당당함</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h4 className="text-cyan-400 font-semibold mb-1">묘시 (05:00-07:00)</h4>
              <p className="text-slate-400 text-xs">섬세하고 친절함</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h4 className="text-cyan-400 font-semibold mb-1">진시 (07:00-09:00)</h4>
              <p className="text-slate-400 text-xs">리더십과 권위</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h4 className="text-cyan-400 font-semibold mb-1">사시 (09:00-11:00)</h4>
              <p className="text-slate-400 text-xs">지혜롭고 영리함</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h4 className="text-cyan-400 font-semibold mb-1">오시 (11:00-13:00)</h4>
              <p className="text-slate-400 text-xs">활동적이고 적극적</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h4 className="text-cyan-400 font-semibold mb-1">미시 (13:00-15:00)</h4>
              <p className="text-slate-400 text-xs">온화하고 배려심 많음</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h4 className="text-cyan-400 font-semibold mb-1">신시 (15:00-17:00)</h4>
              <p className="text-slate-400 text-xs">영리하고 재치있음</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h4 className="text-cyan-400 font-semibold mb-1">유시 (17:00-19:00)</h4>
              <p className="text-slate-400 text-xs">부지런하고 성실함</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h4 className="text-cyan-400 font-semibold mb-1">술시 (19:00-21:00)</h4>
              <p className="text-slate-400 text-xs">정직하고 충직함</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h4 className="text-cyan-400 font-semibold mb-1">해시 (21:00-23:00)</h4>
              <p className="text-slate-400 text-xs">재물복과 복덕</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 최종 조언 */}
      <motion.div
        className="mt-8 p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl border border-cyan-500/20"
        variants={itemVariants}
      >
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span className="text-2xl">💡</span>
          가장 중요한 것
        </h3>
        <p className="text-slate-200 leading-relaxed">
          아무리 좋은 날과 시간을 선택해도, 가장 중요한 것은 <strong className="text-cyan-400">산모와
          아기의 건강</strong>입니다. 자연분만이 어려운 상황에서만 날짜를 선택하시고, 반드시
          의료진과 상의하세요. 건강하게 태어나는 것이 무엇보다 큰 복입니다.
        </p>
      </motion.div>
    </motion.div>
  );
}
