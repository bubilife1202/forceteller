'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';

interface SajuPillarTableProps {
  result: SajuResult;
  birthYear: number;
}

export default function SajuPillarTable({ result, birthYear }: SajuPillarTableProps) {
  const currentAge = new Date().getFullYear() - birthYear + 1;

  // 기둥별 시기 정보
  const pillarMeanings = [
    {
      name: '년주 年柱',
      period: '1-16세',
      meaning: '조상, 부모, 청소년기',
      color: 'from-red-500 to-orange-500',
      desc: `조상과 부모로부터 물려받은 기질과 청소년기(1-16세)의 기본 성향을 나타냅니다. 가정환경과 초기 교육이 이 시기에 형성됩니다.`,
    },
    {
      name: '월주 月柱',
      period: '17-32세',
      meaning: '형제, 청년기, 직업/재물',
      color: 'from-yellow-500 to-amber-500',
      desc: `청년기(17-32세)의 운세로, 사회 진출과 직업의 기반이 됩니다. 재물과 직업운의 근본이 되는 가장 중요한 기둥입니다.`,
    },
    {
      name: '일주 日柱',
      period: '33-48세',
      meaning: '본인, 배우자, 중년기',
      color: 'from-green-500 to-emerald-500',
      desc: `본인의 핵심 성향과 배우자운을 나타내며, 중년기(33-48세)의 전성기를 의미합니다. 일간은 자신 그 자체입니다.`,
    },
    {
      name: '시주 時柱',
      period: '49세 이후',
      meaning: '자녀, 말년, 노년기',
      color: 'from-blue-500 to-indigo-500',
      desc: `자녀와의 관계, 말년 운세(49세 이후)를 나타냅니다. 인생의 결실과 노후 안정을 보여줍니다.`,
    },
  ];

  const pillars = [
    {
      stem: result.year.stem,
      branch: result.year.branch,
      tenGod: result.tenGods.year,
      cycle: result.twelveCycles.year,
    },
    {
      stem: result.month.stem,
      branch: result.month.branch,
      tenGod: result.tenGods.month,
      cycle: result.twelveCycles.month,
    },
    {
      stem: result.day.stem,
      branch: result.day.branch,
      tenGod: result.tenGods.day,
      cycle: result.twelveCycles.day,
    },
    {
      stem: result.hour.stem,
      branch: result.hour.branch,
      tenGod: result.tenGods.hour,
      cycle: result.twelveCycles.hour,
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
        📊 당신의 사주 DNA
      </h2>

      <p className="text-center text-slate-300 mb-8">
        사주 팔자는 태어난 년·월·일·시의 천간과 지지로 구성되며, 인생 전체의 청사진입니다
      </p>

      {/* 사주 팔자 표 */}
      <div className="overflow-x-auto mb-12">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-slate-600 bg-slate-800/50 px-4 py-3 text-slate-300 text-sm font-semibold">
                구분
              </th>
              {pillarMeanings.map((pillar, index) => (
                <th
                  key={index}
                  className="border border-slate-600 bg-slate-800/50 px-4 py-3 text-amber-400 font-bold"
                >
                  {pillar.name}
                  <div className="text-xs text-slate-400 font-normal mt-1">
                    ({pillar.period})
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* 십성 */}
            <tr>
              <td className="border border-slate-600 bg-slate-800/30 px-4 py-3 text-slate-300 text-sm font-semibold">
                십성 十星
              </td>
              {pillars.map((pillar, index) => (
                <td
                  key={index}
                  className="border border-slate-600 px-4 py-3 text-center text-purple-300 font-semibold"
                >
                  {pillar.tenGod || '-'}
                </td>
              ))}
            </tr>

            {/* 천간 */}
            <tr>
              <td className="border border-slate-600 bg-slate-800/30 px-4 py-3 text-slate-300 text-sm font-semibold">
                천간 天干
              </td>
              {pillars.map((pillar, index) => (
                <td
                  key={index}
                  className="border border-slate-600 px-4 py-4 text-center"
                >
                  <div className="text-2xl font-bold text-amber-400">
                    {pillar.stem.ko}{pillar.stem.cn}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {pillar.stem.element} {pillar.stem.yinyang === '+' ? '양' : '음'}
                  </div>
                </td>
              ))}
            </tr>

            {/* 지지 */}
            <tr>
              <td className="border border-slate-600 bg-slate-800/30 px-4 py-3 text-slate-300 text-sm font-semibold">
                지지 地支
              </td>
              {pillars.map((pillar, index) => (
                <td
                  key={index}
                  className="border border-slate-600 px-4 py-4 text-center"
                >
                  <div className="text-2xl font-bold text-cyan-400">
                    {pillar.branch.ko}{pillar.branch.cn}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {pillar.branch.element} / {pillar.branch.animal}
                  </div>
                </td>
              ))}
            </tr>

            {/* 십이운성 */}
            <tr>
              <td className="border border-slate-600 bg-slate-800/30 px-4 py-3 text-slate-300 text-sm font-semibold">
                십이운성
              </td>
              {pillars.map((pillar, index) => (
                <td
                  key={index}
                  className="border border-slate-600 px-4 py-3 text-center text-green-300"
                >
                  {pillar.cycle}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* 기둥별 상세 설명 */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-amber-400 mb-6">
          기둥별 의미 해석
        </h3>

        {pillarMeanings.map((pillarInfo, index) => {
          const pillar = pillars[index];
          const isCurrentPeriod =
            (index === 0 && currentAge <= 16) ||
            (index === 1 && currentAge >= 17 && currentAge <= 32) ||
            (index === 2 && currentAge >= 33 && currentAge <= 48) ||
            (index === 3 && currentAge >= 49);

          return (
            <motion.div
              key={index}
              className={`glass rounded-2xl p-6 ${
                isCurrentPeriod ? 'ring-2 ring-amber-400' : ''
              }`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${pillarInfo.color} flex items-center justify-center text-white font-bold text-xl`}
                >
                  {index === 0 ? '年' : index === 1 ? '月' : index === 2 ? '日' : '時'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-xl font-bold text-slate-200">
                      {pillarInfo.name}
                    </h4>
                    <span className="text-sm text-slate-400">
                      {pillarInfo.period}
                    </span>
                    {isCurrentPeriod && (
                      <span className="px-3 py-1 bg-amber-400/20 text-amber-400 text-xs rounded-full border border-amber-400/30">
                        현재 시기
                      </span>
                    )}
                  </div>

                  <p className="text-slate-300 mb-4 leading-relaxed">
                    {pillarInfo.desc}
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-800/30 rounded-lg p-4">
                      <div className="text-sm text-slate-400 mb-2">천간 (하늘)</div>
                      <div className="text-xl font-bold text-amber-400">
                        {pillar.stem.ko}{pillar.stem.cn} ({pillar.stem.element})
                      </div>
                      <div className="text-sm text-purple-300 mt-2">
                        십성: {pillar.tenGod || '일간'}
                      </div>
                    </div>

                    <div className="bg-slate-800/30 rounded-lg p-4">
                      <div className="text-sm text-slate-400 mb-2">지지 (땅)</div>
                      <div className="text-xl font-bold text-cyan-400">
                        {pillar.branch.ko}{pillar.branch.cn} ({pillar.branch.animal})
                      </div>
                      <div className="text-sm text-green-300 mt-2">
                        십이운성: {pillar.cycle}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 핵심 포인트 */}
      <div className="mt-8 glass rounded-2xl p-6 border border-amber-400/30">
        <h4 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
          <span>✨</span>
          <span>핵심 포인트</span>
        </h4>
        <ul className="space-y-2 text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-amber-400 flex-shrink-0">•</span>
            <span>
              <strong>일간 {result.day.stem.ko}{result.day.stem.cn}</strong>은 당신 자신을 나타내며,
              {result.day.stem.element} {result.day.stem.yinyang === '+' ? '양' : '음'}의 성질을 가집니다.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-400 flex-shrink-0">•</span>
            <span>
              월지 <strong>{result.month.branch.ko}{result.month.branch.cn}</strong>은 직업과 재물운의 근본이 되는 가장 중요한 위치입니다.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-400 flex-shrink-0">•</span>
            <span>
              현재 <strong>{currentAge}세</strong>로,{' '}
              {currentAge <= 16
                ? '년주(청소년기)'
                : currentAge <= 32
                ? '월주(청년기)'
                : currentAge <= 48
                ? '일주(중년기)'
                : '시주(노년기)'}
              의 영향을 받고 있습니다.
            </span>
          </li>
        </ul>
      </div>
    </motion.div>
  );
}
